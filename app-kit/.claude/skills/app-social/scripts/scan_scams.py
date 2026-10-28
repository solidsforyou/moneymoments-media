#!/usr/bin/env python3
"""Score comments, DMs, bios and captions for scams and spam.

Built for a finance and crypto social app, where comments and DMs are where
scams spread: fake support, "DM me for signals", guaranteed returns, wallet
addresses, seed-phrase phishing, giveaway scams and lookalike exchange
links. English and common Hinglish phrasing.

The app's own filter (in TypeScript or SQL) should be ported from these
rules and pass the same tests, so this file is also the specification.

Verdict from the total score:
  allow  (< 3)   show normally
  warn   (3-5)   show with a warning on links; rate-limit the sender
  hold   (6-9)   hide until a moderator reviews it
  block  (>= 10) don't post; count a strike if it repeats

Usage:
  python3 scan_scams.py --text "message" [--new-account] [--json]
  python3 scan_scams.py FILE.jsonl [--json]   # one {"id": ..., "text": ..., "new_account": bool} per line

Exit code: 0 when everything is allow or warn, 1 when anything is hold or
block (handy in tests and CI), 2 for bad input.
"""

import argparse
import json
import re
import sys
import unicodedata

KNOWN_BRANDS = ["binance", "coinbase", "coindcx", "wazirx", "kraken", "bybit", "okx", "kucoin",
                "metamask", "trustwallet", "ledger", "phantom", "zebpay", "mudrex", "bitget", "gemini"]
SHORTENERS = {"bit.ly", "tinyurl.com", "t.co", "cutt.ly", "rb.gy", "is.gd", "goo.gl", "ow.ly", "shorturl.at", "tiny.cc"}

SECRET = r"(?:seed|recovery|secret|mnemonic)\s*(?:phrase|words?)|private\s*key|(?:12|24)[\s-]*words?(?:\s+(?:seed|recovery)\s*phrase)?"
RULES = [
    # (name, score, regex) - each rule counts once per message. Rules marked
    # in NEGATABLE are skipped when "not", "never", "don't"... comes just before
    # the match ("never share your seed phrase" is advice, not a scam).
    ("seed phrase or private key request", 10,
     r"(?i)\b(?:share|send|enter|type|give|provide|submit|paste|import|verify|confirm|need|dm)\s+(?:me\s+|us\s+)?(?:your|ur|the)\s+(?:\w+\s+){0,2}(?:" + SECRET + r")"
     r"|\b(?:your|ur)\s+(?:" + SECRET + r")\s+(?:please|pls|plz|now|here|to\s+(?:restore|unlock|verify|claim))\b"),
    ("guaranteed or impossible returns", 5,
     r"(?i)\bguarantee(?:d|s)?\s+(?:profit|return|income|gains?)|\brisk[\s-]*free\s+(?:profit|returns?|trading|income)|\bdouble\s+your\s+(?:money|crypto|investment|btc|eth)"
     r"|\b\d{1,3}\s?x\s+(?:returns?|profit|gains?)\b|\b\d{1,3}\s?%\s*(?:daily|per\s+day|a\s+day|weekly|per\s+week)\b|\bpaisa\s+double\b|\bpakka\s+profit\b|\bguaranteed\s+(?:hai|milega)\b"),
    ("off-platform contact link", 4, r"(?i)\bt\.me/|\bwa\.me/|\bchat\.whatsapp\.com/"),
    ("off-platform contact push", 4,
     r"(?i)\b(?:dm|inbox|text|ping)\s+(?:me|us)\b|\bmessage\s+(?:me|us)\s+on\b|\b(?:contact|reach|join|add)\s+(?:me|us)?\s*(?:on|via|at)\s+(?:telegram|whats\s?app|signal)\b"
     r"|\b(?:telegram|whats\s?app)\s+(?:karo|me\s+aao|pe\s+aao)\b"),
    ("trading signals or account management offer", 4,
     r"(?i)\b(?:vip\s+)?signals?\s+(?:group|channel)\b|\baccount\s+manag(?:er|ement)\s+(?:service|offer|available)|\bi\s+will\s+trade\s+for\s+you\b|\bmanage\s+your\s+(?:funds|portfolio|account)\b"
     r"|\bpump\s+(?:group|signal|alert)\b|\bnext\s+100x\b"),
    ("giveaway or send-to-receive scam", 8,
     r"(?i)\bgiveaway\b.*\b(?:send|deposit)\b|\bsend\s+\d*\.?\d+\s*(?:btc|eth|usdt|sol|bnb|trx)\b.*\b(?:get|receive)\b|\bairdrop\b.*\b(?:connect|claim)\s+(?:your\s+)?wallet\b"),
    ("fake support or impersonation", 6,
     r"(?i)\b(?:official\s+)?(?:support|helpdesk|customer\s+care|admin)\s+(?:team|desk|agent)\s+(?:here|this\s+side)\b|\bi\s+am\s+(?:from|with)\s+(?:the\s+)?(?:support|admin)(?:\s+team)?\b"
     r"|\byour\s+account\s+(?:is|has\s+been|will\s+be)\s+(?:locked|suspended|frozen|flagged)\b|\bverify\s+your\s+wallet\b|\bunlock\s+your\s+funds\b"),
    ("mentions an off-platform chat app", 1, r"(?i)\btelegram\b|\bwhats\s?app\b"),
    ("urgency pressure", 2, r"(?i)\b(?:act\s+now|last\s+chance|only\s+today|limited\s+slots?|hurry|jaldi\s+karo)\b"),
]
NEGATABLE = {"seed phrase or private key request", "guaranteed or impossible returns", "off-platform contact push"}
NEGATION = re.compile(r"(?i)\b(?:not|never|no|don'?t|do\s+not|isn'?t|aren'?t|won'?t|nobody|avoid|beware\s+of|never\s+ever|mat|kabhi\s+mat)\b[\w\s,']{0,20}$")
RULES = [(n, s, re.compile(r)) for n, s, r in RULES]

WALLETS = [
    ("EVM wallet address", re.compile(r"\b0x[a-fA-F0-9]{40}\b")),
    ("Bitcoin address", re.compile(r"\b(?:bc1[ac-hj-np-z02-9]{25,62}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b")),
    ("Tron address", re.compile(r"\bT[1-9A-HJ-NP-Za-km-z]{33}\b")),
]
URL = re.compile(r"(?i)\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,24})(/[^\s]*)?")
PHONE = re.compile(r"(?:\+?\d[\s-]?){10,13}")


def normalise(text: str) -> str:
    t = unicodedata.normalize("NFKC", text)
    return t.replace("​", "").replace("‌", "").replace("‍", "")


def edit_distance(a: str, b: str) -> int:
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]


def lookalike(domain: str):
    """Brand name in the domain that isn't the brand's own domain, or a near-miss spelling."""
    labels = domain.lower().split(".")
    core = labels[-2] if len(labels) >= 2 else labels[0]
    folded = core.replace("0", "o").replace("1", "l").replace("3", "e").replace("5", "s")
    for brand in KNOWN_BRANDS:
        if core == brand:
            return None  # the real domain (e.g. binance.com) or a country variant
        if brand in folded or brand in domain.replace(".", ""):
            return brand
        if len(core) >= 5 and edit_distance(folded, brand) <= 2:
            return brand
    return None


def scan(text: str, new_account: bool = False):
    t = normalise(text)
    hits = []
    for name, score, rx in RULES:
        for m in rx.finditer(t):
            if name in NEGATABLE and NEGATION.search(t[max(0, m.start() - 30):m.start()]):
                continue
            hits.append((name, score, m.group(0)[:60]))
            break
    for name, rx in WALLETS:
        m = rx.search(t)
        if m:
            hits.append((name, 5, m.group(0)[:12] + "…"))
            break
    links = 0
    for m in URL.finditer(t):
        domain = m.group(1).lower()
        if re.fullmatch(r"\d+(?:\.\d+)+", domain) or domain.count(".") == 0:
            continue
        if not (m.group(0).lower().startswith("http") or "/" in (m.group(2) or "") or domain.endswith(
                (".com", ".io", ".net", ".org", ".in", ".xyz", ".app", ".co", ".me", ".gg", ".site", ".top", ".live", ".finance", ".exchange"))):
            continue
        links += 1
        if domain in SHORTENERS:
            hits.append(("link shortener hides the destination", 3, domain))
        brand = lookalike(domain)
        if brand:
            hits.append((f"lookalike of {brand}", 8, domain))
    if links and new_account:
        hits.append(("link from a new account", 2, f"{links} link(s)"))
    if PHONE.search(t) and re.search(r"(?i)\b(?:call|whats\s?app|contact|dm)\b", t):
        hits.append(("phone number with a contact push", 3, "phone"))
    letters = [c for c in t if c.isalpha()]
    if len(letters) >= 20 and sum(c.isupper() for c in letters) / len(letters) > 0.7:
        hits.append(("shouting (mostly capitals)", 1, ""))
    if re.search(r"(.)\1{7,}", t) or len(re.findall(r"[\U0001F300-\U0001FAFF]", t)) >= 8:
        hits.append(("spam pattern (repeats or emoji flood)", 1, ""))

    score = sum(h[1] for h in hits)
    verdict = "block" if score >= 10 else "hold" if score >= 6 else "warn" if score >= 3 else "allow"
    return {"score": score, "verdict": verdict, "reasons": [{"rule": n, "points": s, "match": m} for n, s, m in hits]}


def main():
    ap = argparse.ArgumentParser(description="Score messages for scams and spam.")
    ap.add_argument("file", nargs="?", help="JSONL file: one {\"id\", \"text\", \"new_account\"} per line")
    ap.add_argument("--text")
    ap.add_argument("--new-account", action="store_true")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    items = []
    if a.text is not None:
        items.append({"id": "text", "text": a.text, "new_account": a.new_account})
    elif a.file:
        try:
            for n, line in enumerate(open(a.file, encoding="utf-8"), 1):
                if line.strip():
                    obj = json.loads(line)
                    items.append({"id": obj.get("id", n), "text": obj["text"], "new_account": bool(obj.get("new_account"))})
        except (OSError, json.JSONDecodeError, KeyError) as e:
            print(f"Bad input: {e}", file=sys.stderr)
            return 2
    else:
        ap.print_help()
        return 2

    results = [{"id": i["id"], **scan(i["text"], i["new_account"])} for i in items]
    if a.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        for r in results:
            why = "; ".join(f"{x['rule']} (+{x['points']})" for x in r["reasons"]) or "nothing found"
            print(f"{r['verdict'].upper():<6} {r['score']:>3}  {r['id']}: {why}")
    return 1 if any(r["verdict"] in ("hold", "block") for r in results) else 0


if __name__ == "__main__":
    sys.exit(main())

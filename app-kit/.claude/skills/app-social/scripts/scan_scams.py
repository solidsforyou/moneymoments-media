#!/usr/bin/env python3
"""Score comments, DMs, bios and captions for scams and spam (a first-pass filter).

Built for a finance and crypto social app, where comments and DMs are where
scams spread: fake support, seed-phrase phishing, "DM for signals",
guaranteed or impossible returns, recovery-fee scams, send-to-receive
giveaways, wallet addresses and lookalike exchange links. English and common
Hinglish phrasing; lookalike letters (Cyrillic, accents), invisible
characters and s.p.a.c.e.d letters are folded before matching.

It is a heuristic, not a guarantee: it catches the common patterns cheaply so
moderators see the rest. Every miss a moderator finds becomes a new rule and
a must-catch test. The app's own filter (TypeScript or SQL) is ported from
these rules and must pass the same tests, so this file is also the spec.

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

KNOWN_BRANDS = ["binance", "coinbase", "coindcx", "wazirx", "kraken", "bybit", "okx", "kucoin", "metamask",
                "trustwallet", "ledger", "trezor", "phantom", "zebpay", "mudrex", "bitget", "gemini", "uniswap",
                "pancakeswap", "walletconnect", "opensea", "coinswitch", "coinmarketcap", "coingecko", "chartroom"]
SHORTENERS = {"bit.ly", "tinyurl.com", "t.co", "cutt.ly", "rb.gy", "is.gd", "goo.gl", "ow.ly", "shorturl.at", "tiny.cc"}

# Letters that look Latin but aren't (Cyrillic, Greek, fullwidth handled by NFKC).
CONFUSABLES = str.maketrans({
    "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "у": "y", "х": "x", "і": "i", "ј": "j", "ѕ": "s",
    "ԁ": "d", "һ": "h", "ӏ": "l", "ԛ": "q", "ԝ": "w", "ɡ": "g", "А": "A", "В": "B", "Е": "E", "К": "K",
    "М": "M", "Н": "H", "О": "O", "Р": "P", "С": "C", "Т": "T", "Х": "X", "У": "Y", "α": "a", "ο": "o",
    "ρ": "p", "ν": "v", "ι": "i", "κ": "k", "τ": "t", "Ι": "I", "Ο": "O", "Ρ": "P", "Α": "A", "Β": "B",
    "Ε": "E", "Κ": "K", "Μ": "M", "Ν": "N", "Τ": "T", "Χ": "X",
})

SECRET = (r"(?:seed|recovery|secret|mnemonic|backup)\s*-?\s*(?:phrase|words?|key)"
          r"|private\s*-?\s*keys?|(?:12|24)[\s-]*(?:word|words)(?:\s+(?:seed|recovery)\s*phrase)?")
VERB = r"(?:share|send|enter|type|give|provide|submit|paste|import|verify|confirm|need|dm|tell|bhej|bhejo|batao|do)"

RULES = [
    # (name, points, regex). Each rule counts once per message. Rules in NEGATABLE are
    # skipped when a negation ("never", "not", "nowhere near"...) comes just before the match.
    ("asks for a seed phrase or private key", 10,
     r"\b" + VERB + r"\s+(?:me\s+|us\s+|it\s+)?(?:your|ur|the|apna|apni|aapka)\s+(?:[\w'’]+\s+){0,3}(?:" + SECRET + r")"
     r"|\b(?:your|ur|apna|apni|aapka)\s+(?:[\w'’]+\s+){0,2}(?:" + SECRET + r")\b.{0,40}\b(?:please|pls|plz|bhej|bhejo|batao|to\s+(?:restore|unlock|verify|claim|recover|fix))\b"
     r"|\b(?:" + SECRET + r")\s+(?:needed|required|chahiye)\b"),
    ("guaranteed or impossible returns", 5,
     r"\bguarantee(?:d|s)?\s+(?:profit|return|income|gains?)|\b\d+\s?x\s+guaranteed\b|\brisk[\s-]*free\s+(?:profit|returns?|trading|income)"
     r"|\bdouble\s+your\s+(?:money|crypto|investment|btc|eth)|\b\d{1,3}\s?x\s+(?:returns?|profit|gains?)\b"
     r"|\b\d{1,4}(?:\.\d+)?\s?%\s*(?:daily|per\s+day|a\s+day|weekly|per\s+week)\b|\b\d{2,5}\s?%\s*in\s*\d+\s*(?:days?|weeks?|hours?|months?)\b"
     r"|\binvest\s+\S*\d\S*\s+(?:and\s+)?(?:get|earn|receive|make)\s+\S*\d|\bmade\s+\S*\d\S*\s+(?:lakh|k|thousand|crore)?\s*from\s+\S*\d\S*\s+in\s+(?:a|one|1|2|3)\s+(?:day|week)"
     r"|\bpaisa\s+double\b|\bpakka\s+profit\b|\bguaranteed\s+(?:hai|milega)\b|\b\d{2}\s?%\s*accura(?:cy|te)\b"),
    ("off-platform contact link", 4, r"\bt\.me/|\bwa\.me/|\bchat\.whatsapp\.com/"),
    ("pushes to an outside chat app", 4,
     r"\b(?:text|message|msg|contact|reach|ping|dm|add|join)\s+(?:me|us|him|her|them)?\s*(?:on|via|at|in)\s+(?:telegram|tg|whats\s?app|wa|signal)\b"
     r"|\b(?:telegram|tg|whats\s?app)\s+(?:karo|me\s+aao|pe\s+aao|pe\s+message)\b"),
    ("trading signals, pumps or account management", 4,
     r"\bvip\s+(?:signals?|group|channel)\b|\bsignals?\s+(?:group|channel)\b|\bi\s+will\s+trade\s+for\s+you\b|\bmanage\s+your\s+(?:funds|portfolio|account)\b"
     r"|\binvestment\s+(?:manager|expert|mentor)\b|\bi\s+can\s+help\s+you\s+(?:grow|double|recover)\b|\bjoin\s+our\s+pump\b|\bpump\s+(?:group|signal|alert)\b"
     r"|\bnext\s+(?:100x|moonshot)\b|\baccount\s+manag(?:er|ement)\s+(?:service|offer|available)"),
    ("send-to-receive, giveaway or fake airdrop", 8,
     r"\bgiveaway\b.*\b(?:send|deposit)\b|\bsend\s+(?:\d*\.?\d+\s*)?(?:btc|eth|usdt|sol|bnb|trx|crypto|coins?)\b.*\b(?:get|receive)\b"
     r"|\baddress\s+in\s+my\s+bio\b|\b\d\s?x\s+back\b|\bairdrop\b.*\b(?:connect|claim|validate)\b|\bclaim\s+(?:your\s+)?free\s+(?:usdt|btc|eth|crypto|tokens?)"),
    ("recovery or release-fee scam", 8,
     r"\b(?:recovery|release|unlock|withdrawal|clearance|tax)\s+fee\b|\brecovered\s+your\s+(?:lost\s+)?funds\b|\brecovery\s+(?:agent|expert|service)\b"),
    ("fake support, account threat or wallet 'sync'", 6,
     r"\b(?:i\s+am|i'm|this\s+is)\s+(?:from\s+|with\s+)?(?:the\s+)?(?:customer\s+)?(?:support|admin|helpdesk|customer\s+care)\b"
     r"|\b(?:official\s+)?(?:support|helpdesk|customer\s+care|admin)\s+(?:team|desk|agent)\s+(?:here|this\s+side)\b"
     r"|\byour\s+account\s+(?:is|has\s+been|will\s+be)\s+(?:locked|suspended|frozen|flagged|restricted)\b|\bverify\s+your\s+wallet\b"
     r"|\bvalidate\s+(?:your\s+)?wallet\b|\bwallet\s+(?:de-?sync|sync\s+issue)|\bdesync\b|\bunlock\s+your\s+(?:funds|wallet|account)\b"),
    ("mentions an outside chat app", 1, r"\btelegram\b|\bwhats\s?app\b|\btg\b"),
    ("urgency pressure", 2, r"\b(?:act\s+now|last\s+chance|only\s+today|limited\s+slots?|hurry|jaldi\s+karo)\b"),
]
RULES = [(n, s, re.compile(r, re.I)) for n, s, r in RULES]
NEGATABLE = {"asks for a seed phrase or private key", "guaranteed or impossible returns", "pushes to an outside chat app"}
NEGATION = re.compile(r"\b(?:not|never|no|don'?t|do\s+not|isn'?t|aren'?t|won'?t|nobody|avoid|beware\s+of|nowhere\s+near|unlike|mat|kabhi\s+mat)\b"
                      r"[\w\s,']{0,20}$", re.I)
# Past or contextual returns ("gave 2x over 10 years", "0.5% per day on credit cards") aren't promises.
NOT_A_PROMISE = re.compile(r"\b(?:gave|returned|delivered|fell|was|were|over\s+\d+\s+years|in\s+(?:19|20)\d\d|last\s+year"
                           r"|per\s+annum|p\.a\.|interest|credit\s+cards?|loans?|penalty|late\s+fee|inflation)\b", re.I)

WALLETS = [
    ("EVM wallet address", re.compile(r"\b0x[a-fA-F0-9]{40}\b")),
    ("Bitcoin address", re.compile(r"\b(?:bc1[ac-hj-np-z02-9]{25,62}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b")),
    ("Tron address", re.compile(r"\bT[1-9A-HJ-NP-Za-km-z]{33}\b")),
]
URL = re.compile(r"(?i)\b(?:https?://)?((?:[\w-]+\.)+[a-z -￿]{2,24})(/[^\s]*)?")
PHONE = re.compile(r"(?:\+?\d[\s()-]{0,2}){10,13}")
TLDS = (".com", ".io", ".net", ".org", ".in", ".xyz", ".app", ".co", ".me", ".gg", ".site", ".top", ".live",
        ".finance", ".exchange", ".online", ".info", ".biz", ".pro", ".link", ".click", ".vip")


def fold(text: str) -> str:
    """Normalise for matching: NFKC, drop invisible format characters, fold lookalike
    letters and accents, and join s.p.a.c.e.d or d-o-t-t-e-d single letters."""
    t = unicodedata.normalize("NFKC", text)
    t = "".join(ch for ch in t if unicodedata.category(ch) != "Cf")  # zero-width, U+2060, U+FEFF, soft hyphen...
    t = t.translate(CONFUSABLES)
    t = "".join(ch for ch in unicodedata.normalize("NFKD", t) if not unicodedata.combining(ch))
    t = re.sub(r"\b(?:[A-Za-z][.\-_*·]){2,}[A-Za-z]\b", lambda m: re.sub(r"[.\-_*·]", "", m.group(0)), t)
    t = re.sub(r"\b(?:[A-Za-z] ){3,}[A-Za-z]\b", lambda m: m.group(0).replace(" ", ""), t)
    return t


def edit_distance(a: str, b: str) -> int:
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]


def domain_problem(raw_domain: str):
    """Why a domain looks like a phishing copy of a known brand, or None."""
    raw = raw_domain.lower()
    if raw.startswith("xn--") or ".xn--" in raw:
        return "punycode (look-alike letters) domain"
    if any(ord(ch) > 127 for ch in raw):
        return "domain with non-Latin or accented letters"
    labels = raw.split(".")
    core = labels[-2] if len(labels) >= 2 else labels[0]
    folded = core.replace("0", "o").replace("1", "l").replace("3", "e").replace("5", "s")
    for brand in KNOWN_BRANDS:
        if core == brand:
            return None  # the brand's own domain (or a subdomain of it)
        if brand in folded or brand in raw.replace(".", "").replace("-", ""):
            return f"look-alike of {brand}"
        if len(core) >= 5 and edit_distance(folded, brand) <= 2:
            return f"look-alike of {brand}"
    return None


def scan(text: str, new_account: bool = False):
    t = fold(text)
    hits = []
    for name, score, rx in RULES:
        for m in rx.finditer(t):
            if name in NEGATABLE and NEGATION.search(t[max(0, m.start() - 30):m.start()]):
                continue
            if name == "guaranteed or impossible returns" and not re.search(r"guarantee|risk|double|pakka|invest|made|accura", m.group(0), re.I) \
                    and NOT_A_PROMISE.search(t):
                continue
            hits.append((name, score, m.group(0)[:60]))
            break
    for name, rx in WALLETS:
        m = rx.search(t)
        if m:
            hits.append((name, 5, m.group(0)[:12] + "…"))
            break
    links = 0
    for m in URL.finditer(text):  # domains from the original text, so look-alike letters stay visible
        domain = m.group(1).lower().rstrip(".")
        if re.fullmatch(r"[\d.]+", domain) or "." not in domain:
            continue
        has_path = bool(m.group(2)) and len(m.group(2)) > 1
        if not (m.group(0).lower().startswith("http") or has_path or domain.endswith(TLDS)
                or "xn--" in domain or any(ord(c) > 127 for c in domain)):
            continue
        links += 1
        if domain.removeprefix("www.") in SHORTENERS:
            hits.append(("link shortener hides the destination", 3, domain))
        why = domain_problem(domain)
        if why:
            hits.append((why, 8, domain))
    if links and new_account:
        hits.append(("link from a new account", 2, f"{links} link(s)"))
    if PHONE.search(t) and re.search(r"\b(?:call|whats\s?app|contact|dm|text|message)\b", t, re.I):
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
                    items.append({"id": obj.get("id", n), "text": str(obj["text"]), "new_account": bool(obj.get("new_account"))})
        except (OSError, json.JSONDecodeError, KeyError, TypeError, AttributeError) as e:
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

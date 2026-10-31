#!/usr/bin/env python3
"""Score comments, DMs, bios and captions for scams and spam (a first-pass filter).

Built for a finance and crypto social app, where comments and DMs are where
scams spread: fake support, seed-phrase phishing, "DM for signals",
guaranteed or impossible returns, recovery-fee scams, send-to-receive
giveaways, wallet addresses and lookalike exchange links. English and common
Hinglish phrasing; lookalike letters (Cyrillic, accents), invisible
characters and s.p.a.c.e.d letters are folded before matching.

It is layer 1 of 3, not the defence: phrase rules plus general signals
(credential requests, pay-to-receive, staff claims, account threats,
payment IDs, promised income) catch the common patterns instantly, but on
scams it wasn't written against it catches only a minority (see
app-social.md). A language-model classifier and human moderators do the rest. Every miss a moderator finds becomes a new rule and
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

SECRET = (r"(?:seed|recovery|secret|mnemonic|backup)\s*-?\s*(?:phrase|fraze|frase|phrse|words?|key)"
          r"|private\s*-?\s*keys?|(?:12|24)[\s-]*(?:word|words|shabd)(?:\s+(?:wala\s+)?(?:seed|recovery)?\s*phrase)?"
          r"|keystore(?:\s+(?:json|file))?")
CODES = (r"(?:otp|one[\s-]*time\s+(?:password|code)|verification\s+code|2fa\s+code|auth(?:enticator)?\s+code|upi\s+pin|atm\s+pin"
         r"|\bpin\b(?!\s+code)|password(?!\s+manager))")
STRONG_VERB = r"(?:share|send|give|provide|submit|paste|upload|import|dm|forward|bhej|bhejo|batao|do|dedo|de\s+do)"
WEAK_VERB = r"(?:tell|verify|confirm|enter|type|need|read\s+out)"
SAFE_AFTER = r"(?!\s+(?:storage|backup|method|safely|offline|on\s+paper|somewhere|written))"

RULES = [
    # (name, points, regex). Each rule counts once per message. Rules in NEGATABLE are
    # skipped when a negation ("never", "not", "nowhere near"...) comes just before the match.
    ("asks for a seed phrase, private key or keystore", 10,
     r"\b" + STRONG_VERB + r"\s+(?:me\s+|us\s+|it\s+)?(?:your|ur|the|apna|apni|aapka|tumhara)?\s*(?:[\w'’]+\s+){0,3}(?:" + SECRET + r")" + SAFE_AFTER
     + r"|\b" + WEAK_VERB + r"\s+(?:me|us)\s+(?:your|ur|the)\s+(?:[\w'’]+\s+){0,2}(?:" + SECRET + r")" + SAFE_AFTER
     + r"|\b(?:your|ur|apna|apni|aapka|tum\s+apna)\s+(?:[\w'’]+\s+){0,3}(?:" + SECRET + r")\b.{0,40}\b(?:please|pls|plz|bhej|bhejo|batao|do|to\s+(?:restore|unlock|verify|claim|recover|fix))\b"
     + r"|\b(?:" + SECRET + r")\s+(?:needed|required|chahiye|pls|please|plz|here)\b"),
    ("asks for an OTP, PIN or password", 10,
     r"\b" + STRONG_VERB + r"\s+(?:me\s+|us\s+)?(?:your\s+|ur\s+|the\s+)?(?:[\w'’]+\s+){0,2}" + CODES
     + r"|\b(?:tell|enter|type|read\s+out)\s+(?:me\s+|us\s+)?(?:your|ur|apna)\s+(?:[\w'’]+\s+){0,2}" + CODES
     + r"|\b" + CODES + r"\s+(?:you\s+(?:received|got)|bhejo|batao|do|needed|required|chahiye)\b"),
    ("guaranteed or impossible returns", 5,
     r"\bguarantee(?:d|s)?\s+(?:profit|return|income|gains?)|\b\d+(?:\.\d+)?\s?(?:%|x)\s+(?:\w+\s+){0,2}guaranteed\b|\brisk[\s-]*free\s+(?:profit|returns?|trading|income)"
     r"|\bdouble\s+your\s+(?:money|crypto|investment|btc|eth)|\b\d{1,3}\s?x\s+(?:returns?|profit|gains?|in\s+(?:a|one|1)\s+(?:day|week|month))\b"
     r"|\b\d{1,4}(?:\.\d+)?\s?%\s*(?:daily|per\s+day|a\s+day|weekly|per\s+week|monthly|per\s+month|a\s+month)\b"
     r"|\b\d{1,4}\s?%\s+(?:\w+\s+){0,1}(?:daily|weekly|monthly)\s+(?:profit|returns?|income)\b|\breturns?\s+(?:of\s+)?up\s+to\s+\d{2,5}\s?%"
     r"|\b\d{2,5}\s?%\s*in\s*(?:a|one|\d+)\s*(?:days?|weeks?|hours?|months?)\b"
     r"|\binvest\s+\S*\d\S*\s+(?:and\s+)?(?:get|earn|receive|make)\s+\S*\d\S*\s+(?:in|within|every|per|back)\b"
     r"|\bmade\s+\S*\d\S*\s+(?:lakh|k|thousand|crore)?\s*from\s+\S*\d\S*\s+in\s+(?:a|one|1|2|3)\s+(?:day|week)"
     r"|\bpaisa\s+double\b|\bpakka\s+profit\b|\bguaranteed\s+(?:hai|milega)\b"),
    ("off-platform contact link", 4, r"\bt\.me/|\bwa\.me/|\bchat\.whatsapp\.com/|\bforms\.gle/|\bdocs\.google\.com/forms\b"),
    ("pushes to an outside chat app", 4,
     r"\b(?:text|message|msg|contact|reach|ping|dm|add|join)\s+(?:me|us|him|her|them|my|our)?\s*(?:on|via|at|in)?\s+(?:telegram|tg|whats\s?app|wa|signal|insta|instagram\s+dm)\b(?!\s*\?)"
     r"|\bjoin\s+(?:my|our)\s+(?:telegram|tg|whats\s?app|channel|group)\b|\b(?:telegram|tg|whats\s?app)\s*:\s*@\w+"
     r"|\b(?:telegram|tg|whats\s?app)\s+(?:karo|me\s+aao|pe\s+aao|pe\s+message)\b"),
    ("trading signals, pumps or account management", 4,
     r"\bvip\s+(?:signals?|group|channel)\b|\bfree\s+(?:crypto\s+)?signals?\b|\bsignals?\s+(?:group|channel)\b|\bi\s+(?:will\s+)?trade\s+for\s+(?:you|clients|others)\b|\bmanage\s+your\s+(?:funds|portfolio|account|money)\b"
     r"|\bi\s+manage\s+(?:crypto\s+)?(?:portfolios|funds|accounts)\b|\binvestment\s+(?:manager|expert|mentor)\b|\bi\s+can\s+help\s+you\s+(?:grow|double|recover)\b"
     r"|\b(?:join\s+our|we)\s+pump\b|\bpump\s+(?:group|signal|alert|one\s+coin)\b|\bnext\s+(?:100x|moonshot)\b|\bpre-?sale\b.*\b(?:send|deposit)\b"
     r"|\baccount\s+manag(?:er|ement)\s+(?:service|offer|available)|\bminimum\s+\S*\d+\s*k?\b.*\b(?:profit|returns?)\b"),
    ("send-to-receive, giveaway or fake airdrop", 8,
     r"\bgiveaway\b.*\b(?:send|deposit)\b|\bsend\s+(?:\d*\.?\d+\s*)?(?:btc|eth|usdt|sol|bnb|trx|crypto|coins?)\b.*\b(?:get|receive|10x|2x)\b"
     r"|\baddress\s+in\s+my\s+bio\b|\b\d\s?x\s+back\b|\bairdrop\b.*\b(?:connect|claim|validate)\b|\bclaim\s+(?:your\s+)?free\s+(?:usdt|btc|eth|crypto|tokens?)"
     r"|\bconnect\s+(?:your\s+)?wallet\b.*\b(?:receive|claim|free|airdrop)\b|\bwin\s+\d.*\bsend\b.*\bfee\b|\bsend\s+\d+\s*(?:usdt|inr|rs\.?|₹)?\s*fee\s+to\s+(?:receive|claim|unlock)\b"),
    ("recovery or release-fee scam", 8,
     r"\b(?:recovery|release|unlock|clearance|activation)\s+fee\b|\brecovered\s+your\s+(?:lost\s+)?funds\b|\brecovery\s+(?:agent|expert|service)\b"),
    ("pretends to be staff or support", 6,
     r"\b(?:i\s+am|i'm|this\s+is|we\s+are|we're)\s+(?:from\s+|with\s+)?(?:the\s+)?(?:\w+\s+)?(?:support|admin|helpdesk|customer\s+care|compliance|kyc)\s+(?:team|desk|agent|staff|officer|department)\b"
     r"|\b(?:\w+\s+)?(?:team|support|admin|helpdesk|customer\s+care)\s+(?:here|this\s+side)\b.{0,80}\b(?:send|share|verify|click|otp|kyc|wallet|account|link|dm)\b"
     r"|\bi\s+am\s+(?:customer\s+)?(?:support|admin)\b|\bkyc\s+(?:is\s+)?(?:pending|expired|incomplete|blocked)\b.{0,60}\b(?:send|share|click|verify|otp)\b"),
    ("account or wallet threat", 6,
     r"\byour\s+(?:account|wallet)\s+(?:is|has\s+been|will\s+be)\s+(?:locked|suspended|frozen|flagged|restricted|compromised)\b|\bverify\s+your\s+wallet\b"
     r"|\b(?:validate|rectify|re-?validate)\s+(?:your\s+)?wallet\b|\bwallet\s+(?:needs\s+)?(?:re-?validation|rectification|de-?sync|sync\s+issue)\b"
     r"|\bunlock\s+your\s+(?:funds|wallet|account)\b"),
    ("mentions an outside chat app", 1, r"\btelegram\b|\bwhats\s?app\b|\btg\b"),
    ("claims high signal accuracy", 2, r"\b\d{2}\s?%\s*(?:accura(?:cy|te)|win\s+rate)\b"),
    ("urgency pressure", 2, r"\b(?:act\s+now|last\s+chance|only\s+today|limited\s+slots?|hurry|jaldi\s+karo)\b"),
]
RULES = [(n, s, re.compile(r, re.I)) for n, s, r in RULES]
NEGATABLE = {"asks for a seed phrase, private key or keystore", "asks for an OTP, PIN or password",
             "guaranteed or impossible returns", "pushes to an outside chat app"}
NEGATION = re.compile(r"\b(?:not|never|no|don'?t|do\s+not|isn'?t|aren'?t|won'?t|nobody|avoid|beware\s+of|nowhere\s+near|unlike|mat|kabhi\s+mat|na)\b"
                      r"[\w\s,']{0,20}$", re.I)
# Past or contextual returns ("gave 2x over 10 years", "0.5% per day on credit cards") aren't promises.
# Checked only in a window around the match, and never when the message also promises ("guaranteed", "join", "DM").
NOT_A_PROMISE = re.compile(r"\b(?:gave|returned|delivered|fell|rose|historically|over\s+\d+\s+years|in\s+(?:19|20)\d\d|last\s+year"
                           r"|per\s+annum|p\.a\.|interest\s+(?:of|on|rate)|credit\s+cards?|loans?|penalty|late\s+fee|inflation|that\s+is"
                           r"|(?:up|down)\s+\d|charts?|candles?|close|timeframe|rsi|volume)\b", re.I)
PROMISE = re.compile(r"\bguarantee|\b(?:join|dm|msg|message|contact|ping|whats\s?app|telegram|tg)\b|\bi\s+(?:make|earn)\b|\bearn\b", re.I)

WALLETS = [
    ("EVM wallet address", re.compile(r"\b0x[a-fA-F0-9]{40}\b")),
    ("Bitcoin address", re.compile(r"\b(?:bc1[ac-hj-np-z02-9]{25,62}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b")),
    ("Tron address", re.compile(r"\bT[1-9A-HJ-NP-Za-km-z]{33}\b")),
]
URL = re.compile(r"(?i)\b(?:https?://)?((?:[\w-]+\.)+[a-z -￿]{2,24})(/[^\s]*)?")
PHONE = re.compile(r"(?:\+?\d[\s()-]{0,2}){10,13}")
TLDS = (".com", ".io", ".net", ".org", ".in", ".xyz", ".app", ".co", ".me", ".gg", ".site", ".top", ".live",
        ".finance", ".exchange", ".online", ".info", ".biz", ".pro", ".link", ".click", ".vip", ".web.app",
        ".vercel.app", ".netlify.app", ".pages.dev", ".github.io", ".ai", ".cc", ".to", ".ru", ".cn")


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



# --- General signals (scored per sentence, then combined) -------------------------------
# Phrase rules above only catch what someone thought to write down. These score the
# ingredients almost every scam needs, so new wordings still add up.
SIG_SENSITIVE = re.compile(r"\b(?:seed|recovery|mnemonic|secret)\s*(?:phrase|words?|key)|private\s*keys?|keystore|passwords?|passcode"
                           r"|\botp\b|\bpin\b(?!\s+code)|\d\s*-?\s*digit\s+(?:code|otp|pin)|verification\s+code|2fa|login\s+(?:details|id)"
                           r"|credentials|card\s+(?:number|details)|cvv|(?:wallet|seed)\s+(?:backup|key|phrase)", re.I)
SIG_REQUEST = re.compile(r"\b(?:share|send|give|confirm|enter|reply|tell|provide|submit|upload|forward|screenshot|type|read\s+out"
                         r"|de\s+do|dedo|do\b|bhej\w*|batao|bata\s+do|dijiye|chahiye|need)\b", re.I)
SIG_SAFE = re.compile(r"\b(?:never|don'?t|do\s+not|kabhi|mat|storage|method|offline|on\s+paper|steel|safely|restoring|manager|reset\s+link)\b", re.I)
SIG_ADVICE = re.compile(r"\b(?:never|don'?t|do\s+not|avoid|beware|be\s+careful|careful|scammers?|scams?|fraud\w*|warning|got\s+blocked)\b", re.I)
SIG_REMOTE = re.compile(r"\b(?:any\s*desk|team\s*viewer|quick\s*support|rust\s*desk|airdroid|screen\s*shar\w*|remote\s+access)\b", re.I)
SIG_AUTHORITY = re.compile(r"\b(?:admin|support|security|helpdesk|customer\s+care|engineer|officer|department|compliance|official|team|moderator"
                           r"|staff|agent|income\s+tax|it\s+department|police|cyber\s*cell|rbi|sebi|government|bank)\b", re.I)
SIG_SELF = re.compile(r"\b(?:i\s*am|i'm|we\s+are|we're|calling\s+from|on\s+behalf\s+of|this\s+is\s+\w+\s+from|my\s+name\s+is\s+\w+\s+from)\b", re.I)
SIG_THREAT = re.compile(r"\b(?:your|ur|aapka|aapki)\s+(?:\w+\s+)?(?:account|kyc|wallet|funds?|pan|aadhaar|card|profile|id)\b.{0,50}?"
                        r"\b(?:expire[sd]?|blocked?|suspend\w*|frozen|freez\w*|locked|deleted?|deactivat\w*|closed|penalt\w*|flagged|on\s+hold|band)\b"
                        r"|\blegal\s+action\b|\barrest\b|\bwarrant\b", re.I)
SIG_PAY_TO_GET = re.compile(r"\b(?:pay|send|deposit|transfer|bhejo)\b.{0,60}?\b(?:to\s+)?(?:release|unlock|receive|claim|activate|refund|get\b.{0,25}?\bback)\b"
                            r"|\b(?:fee|charge|penalty|tax)\s+(?:to|for|before)\s+(?:release|unlock|receive|claim|withdraw\w*|activat\w*)"
                            r"|\b(?:clearance|processing|release|unlock|verification|activation)\s+(?:charge|fee)", re.I)
SIG_GIVEAWAY = re.compile(r"\bgiv(?:ing|e)\s*away\b|\bgiveaway\b|\bairdrop\b|\bfree\s+(?:btc|eth|usdt|crypto|tokens?|coins?)\b", re.I)
SIG_OFF = re.compile(r"\b(?:whats\s?app|telegram|tg|signal|dm\s+me|inbox\s+me|text\s+me|call\s+me|click|link\s+in\s+bio)\b", re.I)
SIG_UPI = re.compile(r"\b[\w.\-]{2,}@(?:ok\w+|ybl|paytm|upi|ibl|axl|apl|pty\w+|icici|sbi|hdfcbank|axisbank|kotak|airtel|freecharge|jio)\b"
                     r"|\bupi\s+id\b", re.I)
SIG_INCOME = re.compile(r"(?:\b(?:earn|make|kamao|kamaye|profit|income|payout)\w*\b.{0,40}?(?:₹|rs\.?|inr|\$|usdt|\d)[\d,.]*\s*(?:k|%)?\s*"
                        r"(?:daily|per\s+day|a\s+day|every\s+day|weekly|per\s+week|monthly|per\s+month|roz|har\s+din)\b)"
                        r"|\b(?:task[\s-]*based|part[\s-]*time)\s+(?:job|work|income)\b|\bwork\s+from\s+home\b.{0,40}\bearn", re.I)
SIG_BADGE = re.compile(r"\b(?:verified|blue\s+tick|badge|verification)\b.{0,40}?(?:₹|rs\.?|inr|\bpay\b|\bfee\b|\$)\s*\d*", re.I)


def signal_hits(t: str):
    """General scam signals per sentence; returns (name, points, match) like the rules."""
    hits = []
    sentences = [x for x in re.split(r"(?<=[.!?])\s+|\n+|;\s*", t) if x.strip()]
    found = set()
    for sent in sentences:
        if SIG_SENSITIVE.search(sent) and SIG_REQUEST.search(sent) and not SIG_SAFE.search(sent):
            found.add(("asks for credentials or a code", 10, SIG_SENSITIVE.search(sent).group(0)))
        mr = SIG_REMOTE.search(sent)
        before = re.sub(r"(?i)\bnever\s*mind\b", "", sent[max(0, mr.start() - 25):mr.start()]) if mr else ""
        if mr and not SIG_ADVICE.search(before) \
                and not re.search(r"\b(?:are\s+how|is\s+how)\s+scammers\b", sent[mr.end():mr.end() + 40], re.I):
            found.add(("remote-access app", 8, SIG_REMOTE.search(sent).group(0)))
        m = SIG_SELF.search(sent)
        if m:
            after = sent[m.end():m.end() + 50]
            brand = any(b in after.lower() for b in KNOWN_BRANDS)
            if SIG_AUTHORITY.search(after) or brand:
                found.add(("claims to be staff, a brand or an authority", 2, sent[m.start():m.end() + 30][:50]))
        if re.search(r"\b(?:" + "|".join(KNOWN_BRANDS) + r"|admin|support|security)\s+(?:team\s+|support\s+|security\s+|staff\s+)?(?:here|this\s+side)\b", sent, re.I):
            found.add(("claims to be staff, a brand or an authority", 2, sent[:50]))
        if SIG_THREAT.search(sent):
            found.add(("threat about the user's account", 4, SIG_THREAT.search(sent).group(0)[:50]))
        if SIG_PAY_TO_GET.search(sent):
            found.add(("pay or send to receive or release", 6, SIG_PAY_TO_GET.search(sent).group(0)[:50]))
        if SIG_GIVEAWAY.search(sent):
            found.add(("giveaway or free crypto", 2, SIG_GIVEAWAY.search(sent).group(0)))
        mu = SIG_UPI.search(sent)
        if mu and not SIG_ADVICE.search(re.sub(r"(?i)\bnever\s*mind\b", "", sent[max(0, mu.start() - 25):mu.end() + 30])):
            found.add(("payment ID (UPI) to send money to", 4, SIG_UPI.search(sent).group(0)))
        mi = SIG_INCOME.search(sent)
        if mi and not NEGATION.search(sent[max(0, mi.start() - 30):mi.start()]) and not NOT_A_PROMISE.search(sent):
            found.add(("income promised per period or task job", 5, mi.group(0)[:50]))
        if SIG_BADGE.search(sent) and re.search(r"\b(?:pay|dm|₹|rs\.?|inr|\$|fee|buy|get)\b", sent, re.I):
            found.add(("sells verification or a badge", 6, SIG_BADGE.search(sent).group(0)[:50]))
        if SIG_OFF.search(sent):
            found.add(("moves the conversation elsewhere", 1, SIG_OFF.search(sent).group(0)))
    names = {f[0] for f in found}
    # one entry per signal name (highest points)
    best = {}
    for n, pts, mt in found:
        if n not in best or pts > best[n][1]:
            best[n] = (n, pts, mt)
    hits = list(best.values())
    risky = names & {"asks for credentials or a code", "remote-access app", "threat about the user's account",
                     "pay or send to receive or release", "payment ID (UPI) to send money to", "moves the conversation elsewhere",
                     "sells verification or a badge", "income promised per period or task job"}
    if "claims to be staff, a brand or an authority" in names and risky:
        hits.append(("staff or authority claim combined with a risky ask", 4, ""))
    if "threat about the user's account" in names and (names & {"pay or send to receive or release", "moves the conversation elsewhere",
                                                                 "payment ID (UPI) to send money to"}):
        hits.append(("account threat combined with a payment or contact push", 3, ""))
    if "giveaway or free crypto" in names and (names & {"pay or send to receive or release", "moves the conversation elsewhere"}):
        hits.append(("giveaway combined with a send or contact push", 6, ""))
    return hits


def scan(text: str, new_account: bool = False):
    t = fold(text)
    hits = []
    for name, score, rx in RULES:
        for m in rx.finditer(t):
            if name in NEGATABLE and NEGATION.search(t[max(0, m.start() - 30):m.start()]):
                continue
            if name == "guaranteed or impossible returns" and not PROMISE.search(t) \
                    and NOT_A_PROMISE.search(t[max(0, m.start() - 40):m.end() + 40]):
                continue
            hits.append((name, score, m.group(0)[:60]))
            break
    for name, rx in WALLETS:
        m = rx.search(t)
        if m:
            hits.append((name, 5, m.group(0)[:12] + "…"))
            break
    links = 0
    visible = "".join(ch for ch in unicodedata.normalize("NFKC", text) if unicodedata.category(ch) != "Cf")
    if re.search(r"(?i)\bhttps?://[^\s/@]+@", visible):
        hits.append(("link hides its real site behind an @", 8, "user@host URL"))
    for m in URL.finditer(visible):  # accents kept (look-alikes stay visible), invisible marks removed
        domain = m.group(1).lower().rstrip(".")
        if re.fullmatch(r"[\d.]+", domain) or "." not in domain:
            continue
        has_scheme = m.group(0).lower().startswith(("http", "www."))
        ascii_tld = domain.endswith(TLDS) or "xn--" in domain
        ascii_tld_folded = fold(domain).endswith(TLDS)
        has_path = bool(m.group(2)) and len(m.group(2)) > 1 and domain.isascii()
        if not (has_scheme or ascii_tld or has_path or domain in SHORTENERS
                or (ascii_tld_folded and any(ord(c) > 127 for c in domain.rsplit(".", 1)[0]))):
            continue  # "down.आज" is a sentence, not a domain
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

    rule_names = {h[0] for h in hits}
    for h in signal_hits(t):
        # don't count the same ingredient twice when a phrase rule already caught it
        if h[0] == "asks for credentials or a code" and rule_names & {"asks for a seed phrase, private key or keystore", "asks for an OTP, PIN or password"}:
            continue
        hits.append(h)
    # a link problem plus an account threat or authority claim is the classic phishing message
    if any(h[1] == 8 and ("look-alike" in h[0] or "domain" in h[0] or "@" in h[0]) for h in hits) and \
            any(h[0] in ("threat about the user's account", "claims to be staff, a brand or an authority") for h in hits):
        hits.append(("phishing link with a threat or staff claim", 4, ""))

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

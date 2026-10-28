#!/usr/bin/env python3
"""Check store listing text against Google Play and App Store limits and rules.

Input: one JSON file per language (see listing-template.json next to the
skill), with a "play" block, an "appstore" block, or both.

Checks:
  - character limits for every field (App Store keywords also in UTF-8 bytes)
  - Google Play title: no emoji, no ALL-CAPS words, no rank, price or
    promo claims ("best", "#1", "free", "% off", "download now"...), which
    Play's metadata policy rejects (words in brand_words are exempt)
  - App Store keywords: commas without spaces, no duplicates, no words
    already in the name or subtitle (they're indexed anyway)
  - App Store text mentioning Android or Google Play (Apple rejects it)
  - leftover placeholders (TODO, lorem, <...>, TBD)
  - keyword stuffing in descriptions

Usage:
  python3 check_listing.py LISTING.json [MORE.json ...] [--json]

Exit code 1 when any error is found (a limit or a policy breach that gets
the listing rejected), 0 when there are only warnings or nothing.
"""

import argparse
import json
import re
import sys
from collections import Counter

# Limits as of October 2026. Check the stores' help pages if a field is rejected anyway.
LIMITS = {
    "play": {"title": 30, "short_description": 80, "full_description": 4000, "release_notes": 500},
    "appstore": {"name": 30, "subtitle": 30, "keywords": 100, "promotional_text": 170,
                 "description": 4000, "whats_new": 4000},
}
REQUIRED = {"play": ["title", "short_description", "full_description"],
            "appstore": ["name", "description", "keywords"]}

CLAIMS = re.compile(
    r"(?i)(?:#\s?1\b|\bno\.?\s?1\b|\bnumber\s+one\b|\bbest\b|\btop\b|\bfree\b|\bsale\b|\bdiscount\w*\b|\bcashback\b"
    r"|\d+\s?%\s?off\b|\bdownload\s+now\b|\binstall\s+now\b|\bplay\s+now\b|\btry\s+(?:it\s+)?now\b|\bnew\b|\bhot\b"
    r"|\bapp\s+of\s+the\s+(?:year|day)\b|\beditor'?s\s+choice\b|\bmillion\s+downloads\b)")
EMOJI = re.compile("[\U0001F000-\U0001FAFF\U00002600-\U000027BF\U0001F1E6-\U0001F1FF⭐⬆↔-⇿️]")
PLACEHOLDER = re.compile(r"(?i)\bTODO\b|\bTBD\b|lorem ipsum|<(?!/?(?:b|i|u|br|em|strong|p|li|ul|ol)\s*/?>)[^>]{1,160}>|\[(?:app name|insert|placeholder)[^\]]*\]|xxx")
OTHER_PLATFORM = {"appstore": re.compile(r"(?i)\bandroid\b|google\s+play|play\s+store"),
                  "play": re.compile(r"(?i)\bapp\s+store\b|\biphone\b|\bios\b")}
STOP = set("a an and are as at be by for from has have in is it its of on or our the this to with you your we".split())


def words(text):
    return re.findall(r"[^\W\d_][\w'’-]*", text.lower())


def check_store(store, block, brand_words, issues, table):
    limits = LIMITS[store]
    for field in REQUIRED[store]:
        if not (block.get(field) or "").strip():
            issues.append(("error", store, field, "missing (required)"))
    for field, value in block.items():
        if field not in limits:
            issues.append(("warning", store, field, f"unknown field (known: {', '.join(limits)})"))
            continue
        value = value or ""
        n = len(value)
        limit = limits[field]
        extra = ""
        if store == "appstore" and field == "keywords":
            b = len(value.encode("utf-8"))
            extra = f", {b} bytes"
            if b > limit:
                issues.append(("error", store, field, f"{b} UTF-8 bytes, limit {limit} (Hindi letters take 3 bytes each)"))
        table.append((store, field, n, limit, extra))
        if n > limit:
            issues.append(("error", store, field, f"{n} characters, limit {limit}: cut {n - limit}"))
        if PLACEHOLDER.search(value):
            issues.append(("error", store, field, f"placeholder left in: {PLACEHOLDER.search(value).group(0)!r}"))
        m = OTHER_PLATFORM[store].search(value)
        if m:
            sev = "error" if store == "appstore" else "warning"
            issues.append((sev, store, field, f"mentions another platform: {m.group(0)!r}"))

    if store == "play":
        title = block.get("title") or ""
        if EMOJI.search(title):
            issues.append(("error", "play", "title", "emoji in the title (not allowed)"))
        for m in CLAIMS.finditer(title):
            if m.group(0).lower() in brand_words:
                continue
            issues.append(("error", "play", "title", f"rank, price or promo claim in the title: {m.group(0)!r}"))
        for w in re.findall(r"\b[A-Z]{4,}\b", title):
            if w.lower() not in brand_words:
                issues.append(("error", "play", "title", f"ALL-CAPS word {w!r} (allowed only if it's the brand: add it to brand_words)"))
        if re.search(r"([!?.*~_-])\1{1,}", title):
            issues.append(("error", "play", "title", "repeated special characters"))
        short = block.get("short_description") or ""
        if EMOJI.search(short):
            issues.append(("warning", "play", "short_description", "emoji: Play discourages them in metadata"))
        for m in CLAIMS.finditer(short):
            issues.append(("warning", "play", "short_description", f"claim {m.group(0)!r}: allowed only if true and provable"))

    if store == "appstore":
        kw = block.get("keywords") or ""
        if re.search(r",\s", kw):
            issues.append(("warning", "appstore", "keywords", "spaces after commas waste characters"))
        items = [k.strip().lower() for k in kw.split(",") if k.strip()]
        dupes = [k for k, c in Counter(items).items() if c > 1]
        if dupes:
            issues.append(("warning", "appstore", "keywords", f"repeated: {', '.join(dupes)}"))
        in_name = set(words((block.get("name") or "") + " " + (block.get("subtitle") or "")))
        overlap = sorted({w for k in items for w in words(k)} & in_name - STOP)
        if overlap:
            issues.append(("warning", "appstore", "keywords", f"already in name/subtitle (indexed anyway): {', '.join(overlap)}"))
        if "app" in items:
            issues.append(("warning", "appstore", "keywords", "'app' is wasted: every result is an app"))
        for f in ("name", "subtitle"):
            m = CLAIMS.search(block.get(f) or "")
            if m:
                issues.append(("warning", "appstore", f, f"claim or price word {m.group(0)!r}: Apple rejects misleading names"))

    for f in ("full_description", "description"):
        text = block.get(f) or ""
        ws = [w for w in words(text) if w not in STOP and len(w) > 3]
        if len(ws) >= 50:
            for w, c in Counter(ws).most_common(3):
                if c >= 8 and c / len(ws) > 0.03 and w not in brand_words:
                    issues.append(("warning", store, f, f"{w!r} appears {c} times: looks like keyword stuffing"))


def main():
    ap = argparse.ArgumentParser(description="Check store listing text.")
    ap.add_argument("files", nargs="+")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()

    report, any_error = [], False
    for path in a.files:
        try:
            data = json.load(open(path, encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as e:
            print(f"{path}: can't read: {e}", file=sys.stderr)
            return 2
        brand = {w.lower() for w in data.get("brand_words", [])}
        issues, table = [], []
        stores = [s for s in ("play", "appstore") if s in data]
        if not stores:
            issues.append(("error", "-", "-", "no 'play' or 'appstore' block"))
        for s in stores:
            check_store(s, data[s] or {}, brand, issues, table)
        any_error |= any(i[0] == "error" for i in issues)
        report.append({"file": path, "locale": data.get("locale", "?"), "fields": table, "issues": issues})

    if a.json:
        print(json.dumps([{"file": r["file"], "locale": r["locale"],
                           "fields": [{"store": s, "field": f, "chars": n, "limit": l} for s, f, n, l, _ in r["fields"]],
                           "issues": [{"severity": s, "store": st, "field": f, "issue": m} for s, st, f, m in r["issues"]]}
                          for r in report], indent=2, ensure_ascii=False))
    else:
        for r in report:
            print(f"{r['file']} ({r['locale']})")
            for s, f, n, l, extra in r["fields"]:
                flag = "  OVER" if n > l else ""
                print(f"  {s:<9}{f:<19}{n:>5}/{l}{extra}{flag}")
            for sev, st, f, msg in sorted(r["issues"], key=lambda i: i[0] != "error"):
                print(f"  {sev.upper():<8}{st}.{f}: {msg}")
            if not r["issues"]:
                print("  No issues.")
            print()
        print("Errors found: fix them before submitting." if any_error else "No errors.")
    return 1 if any_error else 0


if __name__ == "__main__":
    sys.exit(main())

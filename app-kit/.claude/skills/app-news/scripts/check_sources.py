#!/usr/bin/env python3
"""Check a video's claims and sources before it goes to human fact-check.

Input: one JSON file per video (see sources-template.json next to the skill):

  {"video_id": "v123", "published": "2026-10-28", "kind": "news",
   "claims": [
     {"id": "c1", "at": "00:12", "text": "RBI kept the repo rate at 5.5%",
      "risk": "high",                       # high: market-moving, named people, money advice, elections, health
      "sources": [{"url": "https://www.rbi.org.in/...", "publisher": "Reserve Bank of India",
                   "date": "2026-10-01", "archived_url": "https://web.archive.org/...", "type": "primary"}]}]}

Checks:
  - every claim has a source; high-risk claims and claims with numbers need
    a primary or tier-1 source; high-risk claims need strong sources from
    two different sites
  - tiers come only from the editors' tiers file and the built-in list; a
    creator's own "type" label is never trusted
  - URLs are https and complete; no link shorteners
  - sources dated, not after the video's publish date, not stale for news
    (older than --max-age-days, default 30, unless "evergreen": true)
  - social posts, forums, video sites and the creator's own channels don't
    count alone
  - archived copies present (links rot; the archive proves what it said)
  - the same source isn't counted twice

Source tiers come from a JSON file you keep up to date (--tiers), mapping
domains to "primary", "tier1", "tier2" or "not_alone". Built-in defaults
cover common regulators, exchanges' official domains and social sites.

Usage:
  python3 check_sources.py VIDEO.json [--tiers tiers.json] [--max-age-days 30] [--json]

Exit code 1 when any claim fails (send back to the creator), 0 when it can
go to human review (warnings are for the reviewer), 2 for bad input.
"""

import argparse
import json
import re
import sys
from datetime import date
from urllib.parse import urlparse

DEFAULT_TIERS = {
    # Primary: the body that made the decision or published the data.
    "rbi.org.in": "primary", "sebi.gov.in": "primary", "nseindia.com": "primary", "bseindia.com": "primary",
    "mospi.gov.in": "primary", "pib.gov.in": "primary", "indiabudget.gov.in": "primary", "incometaxindia.gov.in": "primary",
    "federalreserve.gov": "primary", "sec.gov": "primary", "bls.gov": "primary", "bea.gov": "primary", "treasury.gov": "primary",
    "ecb.europa.eu": "primary", "esma.europa.eu": "primary", "eur-lex.europa.eu": "primary", "fca.org.uk": "primary",
    "bankofengland.co.uk": "primary", "imf.org": "primary", "worldbank.org": "primary", "bis.org": "primary",
    "oecd.org": "primary", "un.org": "primary", "who.int": "primary", "data.gov.in": "primary",
    # Tier 1: established newsrooms and wires with corrections policies.
    "reuters.com": "tier1", "apnews.com": "tier1", "bloomberg.com": "tier1", "ft.com": "tier1", "wsj.com": "tier1",
    "economist.com": "tier1", "bbc.com": "tier1", "bbc.co.uk": "tier1", "nytimes.com": "tier1",
    "thehindu.com": "tier1", "livemint.com": "tier1", "business-standard.com": "tier1",
    "economictimes.indiatimes.com": "tier1", "indianexpress.com": "tier1", "thehindubusinessline.com": "tier1",
    # Not acceptable on their own.
    "x.com": "not_alone", "twitter.com": "not_alone", "t.me": "not_alone", "facebook.com": "not_alone",
    "instagram.com": "not_alone", "youtube.com": "not_alone", "youtu.be": "not_alone", "tiktok.com": "not_alone",
    "reddit.com": "not_alone", "medium.com": "not_alone", "substack.com": "not_alone", "quora.com": "not_alone",
    "linkedin.com": "not_alone", "whatsapp.com": "not_alone", "wikipedia.org": "not_alone",
}
SHORTENERS = {"bit.ly", "tinyurl.com", "t.co", "cutt.ly", "rb.gy", "is.gd", "goo.gl", "ow.ly", "shorturl.at", "tiny.cc"}
ARCHIVES = ("web.archive.org", "archive.org", "archive.ph", "archive.today", "archive.is")
STRONG = {"primary", "tier1"}
HAS_NUMBER = re.compile(r"\d")


def tier_of(domain: str, tiers: dict) -> str:
    d = domain.lower()
    if d.startswith("www."):
        d = d[4:]
    parts = d.split(".")
    for i in range(len(parts) - 1):  # most specific match first: economictimes.indiatimes.com before indiatimes.com
        cand = ".".join(parts[i:])
        if cand in tiers:
            return tiers[cand]
    if d.endswith((".gov", ".gov.in", ".nic.in", ".gov.uk", ".europa.eu", ".gc.ca", ".gov.au")):
        return "primary"
    return "unknown"


def site_of(domain: str) -> str:
    """The registrable site, so two pages of one site count once (roughly: last two labels,
    or three for two-part suffixes like co.in, gov.in, co.uk)."""
    parts = domain.lower().removeprefix("www.").split(".")
    two_part = {"co", "gov", "nic", "ac", "org", "net", "com", "edu", "res"}
    if len(parts) >= 3 and parts[-2] in two_part and len(parts[-1]) == 2:
        return ".".join(parts[-3:])
    return ".".join(parts[-2:])


def parse_date(s):
    try:
        return date.fromisoformat(str(s)[:10])
    except (TypeError, ValueError):
        return None


def check(video: dict, tiers: dict, max_age_days: int):
    published = parse_date(video.get("published")) or date.today()
    kind = video.get("kind", "news")
    claims = video.get("claims") or []
    out = []
    if not claims:
        out.append({"claim": None, "errors": ["no claims listed: list every factual claim with its timestamp"], "warnings": []})
    for c in claims:
        errs, warns = [], []
        cid = c.get("id", "?")
        text = c.get("text", "")
        risk = str(c.get("risk", "normal")).strip().lower()
        sources = c.get("sources") or []
        if not text.strip():
            errs.append("claim text missing")
        if not c.get("at"):
            warns.append("no timestamp: reviewers need to find it in the video")
        if not sources:
            errs.append("no source")
        seen, publishers, strong = set(), set(), 0
        for s in sources:
            url = (s.get("url") or "").strip()
            p = urlparse(url)
            if p.scheme != "https" or not p.netloc or "." not in p.netloc:
                errs.append(f"not a complete https URL: {url or '(empty)'}")
                continue
            domain = p.netloc.lower().split(":")[0]
            if domain.removeprefix("www.") in SHORTENERS:
                errs.append(f"link shortener hides the source: {url}")
                continue
            key = (domain.removeprefix("www."), p.path.rstrip("/"))
            if key in seen:
                warns.append(f"same source listed twice: {url}")
                continue
            seen.add(key)
            # The tier comes only from the editors' tiers file and the built-in list,
            # never from the creator's own "type" label, and independence is counted
            # by site, not by the publisher name the creator typed.
            t = tier_of(domain, tiers)
            if s.get("type") and s.get("type") != t and t != "unknown":
                warns.append(f"{domain} labelled {s['type']!r} by the creator, tiers say {t!r}")
            if t in STRONG:
                strong += 1
                publishers.add(site_of(domain))
            d = parse_date(s.get("date"))
            if not d:
                warns.append(f"no date for {domain}")
            else:
                if d > published:
                    errs.append(f"source dated {d} is after the video ({published}): wrong date or wrong source")
                elif kind == "news" and not c.get("evergreen") and (published - d).days > max_age_days:
                    warns.append(f"{domain} is {(published - d).days} days old for a news claim: still current?")
            arch = s.get("archived_url") or ""
            if not arch:
                warns.append(f"no archived copy of {domain} (save it at web.archive.org)")
            elif urlparse(arch).netloc.lower().removeprefix("www.") not in ARCHIVES:
                warns.append(f"archived_url for {domain} isn't an archive service")
            if t == "unknown":
                warns.append(f"{domain} isn't in the source tiers: reviewer to judge, then add it to tiers.json")
        only_weak = sources and strong == 0 and all(
            tier_of(urlparse((s.get("url") or "")).netloc.split(":")[0], tiers) == "not_alone" for s in sources if s.get("url"))
        if only_weak:
            errs.append("only social, forum or video sources: add a primary or tier-1 source")
        if (risk == "high" or HAS_NUMBER.search(text)) and sources and strong == 0:
            errs.append("high-risk or numeric claim needs a primary or tier-1 source")
        if risk == "high" and len(publishers) < 2:
            errs.append("high-risk claim needs strong sources from two different sites")
        out.append({"claim": cid, "text": text[:80], "errors": errs, "warnings": warns})
    return out


def main():
    ap = argparse.ArgumentParser(description="Check a video's claims and sources.")
    ap.add_argument("video")
    ap.add_argument("--tiers")
    ap.add_argument("--max-age-days", type=int, default=30)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    try:
        video = json.load(open(a.video, encoding="utf-8"))
        if not isinstance(video, dict) or not isinstance(video.get("claims", []), list) or not all(
                isinstance(c, dict) and isinstance(c.get("text", ""), str) and isinstance(c.get("sources", []), list)
                and all(isinstance(x, dict) and all(isinstance(x.get(k, ""), str) for k in ("url", "publisher", "date", "archived_url"))
                        for x in c.get("sources", []))
                for c in video.get("claims", [])):
            raise ValueError("expected {\"claims\": [{\"text\": ..., \"sources\": [...]}]}")
        if video.get("published") and not parse_date(video["published"]):
            raise ValueError(f"published date {video['published']!r} isn't YYYY-MM-DD")
        tiers = dict(DEFAULT_TIERS)
        if a.tiers:
            tiers.update({k.lower(): v for k, v in json.load(open(a.tiers, encoding="utf-8")).items()})
    except (OSError, json.JSONDecodeError, ValueError) as e:
        print(f"Bad input: {e}", file=sys.stderr)
        return 2
    res = check(video, tiers, a.max_age_days)
    failed = [r for r in res if r["errors"]]
    if a.json:
        print(json.dumps({"video_id": video.get("video_id"), "ok": not failed, "claims": res}, indent=2, ensure_ascii=False))
    else:
        print(f"Video {video.get('video_id', '?')}: {len(res)} claim(s)")
        for r in res:
            mark = "FAIL" if r["errors"] else "ok  "
            print(f"  {mark} {r['claim']}: {r.get('text', '')}")
            for e in r["errors"]:
                print(f"       ERROR   {e}")
            for w in r["warnings"]:
                print(f"       warning {w}")
        print("\nSend back to the creator." if failed else "\nReady for human fact-check.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())

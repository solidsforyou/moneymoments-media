"""Tests for check_sources.py. Run: python3 -m pytest -q this_file"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from check_sources import DEFAULT_TIERS, check, tier_of  # noqa: E402

ARCH = "https://web.archive.org/web/2026/x"


def src(url, date="2026-10-20", publisher=None, archived=ARCH):
    s = {"url": url, "date": date, "archived_url": archived}
    if publisher:
        s["publisher"] = publisher
    return s


def video(*claims, published="2026-10-28"):
    return {"video_id": "v1", "published": published, "kind": "news", "claims": list(claims)}


def run(v):
    return check(v, DEFAULT_TIERS, 30)


def test_tiers():
    assert tier_of("www.rbi.org.in", DEFAULT_TIERS) == "primary"
    assert tier_of("economictimes.indiatimes.com", DEFAULT_TIERS) == "tier1"
    assert tier_of("finance.gov.in", DEFAULT_TIERS) == "primary"   # government suffix
    assert tier_of("x.com", DEFAULT_TIERS) == "not_alone"
    assert tier_of("randomblog.xyz", DEFAULT_TIERS) == "unknown"


def test_good_claim_passes():
    r = run(video({"id": "c1", "at": "00:12", "text": "RBI kept the repo rate at 5.5%",
                   "sources": [src("https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=1")]}))
    assert r[0]["errors"] == [] and r[0]["warnings"] == []


def test_missing_and_weak_sources_fail():
    r = run(video({"id": "c1", "at": "00:01", "text": "Bitcoin will hit 2 lakh dollars", "sources": []},
                  {"id": "c2", "at": "00:05", "text": "The CEO resigned", "sources": [src("https://x.com/someone/status/1")]}))
    assert "no source" in r[0]["errors"]
    assert any("only social" in e for e in r[1]["errors"])


def test_numeric_claim_needs_strong_source():
    r = run(video({"id": "c1", "at": "00:01", "text": "Inflation was 3.2% in September",
                   "sources": [src("https://someblog.example/inflation")]}))
    assert any("numeric claim needs a primary or tier-1" in e for e in r[0]["errors"])


def test_high_risk_needs_two_publishers():
    one = {"id": "c1", "at": "00:01", "text": "Exchange X froze withdrawals", "risk": "high",
           "sources": [src("https://www.reuters.com/a")]}
    assert any("two different sites" in e for e in run(video(one))[0]["errors"])
    two = dict(one, sources=[src("https://www.reuters.com/a"), src("https://www.bloomberg.com/b")])
    assert run(video(two))[0]["errors"] == []


def test_dates_urls_duplicates_archives():
    r = run(video({"id": "c1", "at": "00:01", "text": "GDP grew 7%", "sources": [
        src("https://mospi.gov.in/a", date="2026-11-30"),          # after the video
        src("http://www.reuters.com/a"),                           # not https
        src("https://bit.ly/abc"),                                 # shortener
        src("https://www.bloomberg.com/q", archived=""),           # no archive
        src("https://www.bloomberg.com/q/"),                       # duplicate
        src("https://www.ft.com/old", date="2026-01-01"),          # stale for news
    ]}))
    e, w = " | ".join(r[0]["errors"]), " | ".join(r[0]["warnings"])
    assert "after the video" in e and "not a complete https URL" in e and "shortener" in e
    assert "no archived copy" in w and "listed twice" in w and "days old" in w


def test_evergreen_claim_not_stale():
    r = run(video({"id": "c1", "at": "00:01", "text": "SEBI was set up in 1992", "evergreen": True,
                   "sources": [src("https://www.sebi.gov.in/about", date="2020-01-01")]}))
    assert r[0]["warnings"] == [] and r[0]["errors"] == []


def test_no_claims_fails():
    assert run(video())[0]["errors"]


def test_creator_labels_are_not_trusted():
    fake = {"id": "c1", "at": "00:01", "text": "Exchange X lost 40% of reserves", "risk": "HIGH",
            "sources": [dict(src("https://myblog.xyz/a", publisher="Reuters"), type="primary"),
                        dict(src("https://myblog.xyz/b", publisher="Bloomberg"), type="primary")]}
    r = run(video(fake))[0]
    assert any("primary or tier-1" in e for e in r["errors"])
    assert any("two different sites" in e for e in r["errors"])
    assert any("isn't in the source tiers" in w for w in r["warnings"])


def test_two_pages_of_one_site_count_once():
    c = {"id": "c1", "at": "00:01", "text": "Exchange X froze withdrawals", "risk": "high",
         "sources": [src("https://www.reuters.com/a"), src("https://www.reuters.com/b")]}
    assert any("two different sites" in e for e in run(video(c))[0]["errors"])


def test_bad_input_exits_2(tmp_path):
    import subprocess
    script = Path(__file__).with_name("check_sources.py")
    for content in ("not json", '{"claims": "x"}', '{"published": "soon", "claims": []}',
                    '{"claims": [{"text": null, "sources": []}]}', '{"claims": [{"text": "x", "sources": [5]}]}',
                    '{"claims": [{"text": "x", "sources": [{"url": 7}]}]}'):
        f = tmp_path / "v.json"
        f.write_text(content)
        p = subprocess.run([sys.executable, str(script), str(f)], capture_output=True, text=True)
        assert p.returncode == 2 and "Traceback" not in p.stderr, (content, p.stderr)

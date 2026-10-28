"""Tests for check_listing.py and check_assets.py. Run: python3 -m pytest -q this_file."""

import json
import subprocess
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).parent
LISTING = HERE / "check_listing.py"
ASSETS = HERE / "check_assets.py"
TEMPLATE = HERE.parent / "listing-template.json"

GOOD = {
    "locale": "en-IN",
    "brand_words": ["UPI"],
    "play": {
        "title": "Hisab: Shop Ledger",
        "short_description": "Track udhaar and payments for your shop, in English or Hindi.",
        "full_description": "Keep every customer's balance in one place. " * 5,
        "release_notes": "Faster sync on slow networks.",
    },
    "appstore": {
        "name": "Hisab: Shop Ledger",
        "subtitle": "Udhaar and payments",
        "keywords": "khata,credit,kirana,billing,invoice",
        "promotional_text": "Now with UPI reminders.",
        "description": "Keep every customer's balance in one place.",
        "whats_new": "Faster sync.",
    },
}


def run(script, *args):
    p = subprocess.run([sys.executable, str(script), *map(str, args), "--json"], capture_output=True, text=True)
    return p.returncode, json.loads(p.stdout) if p.stdout.strip() else None


def listing(tmp_path, data):
    f = tmp_path / "listing.json"
    f.write_text(json.dumps(data, ensure_ascii=False))
    code, r = run(LISTING, f)
    return code, [i["issue"] for i in r[0]["issues"] if i["severity"] == "error"], [i["issue"] for i in r[0]["issues"]]


def test_good_listing_passes(tmp_path):
    code, errors, _ = listing(tmp_path, GOOD)
    assert code == 0 and errors == []


def test_template_is_flagged_until_filled():
    code, r = run(LISTING, TEMPLATE)
    assert code == 1
    assert any("placeholder" in i["issue"] for i in r[0]["issues"])


def test_limits_and_title_policy(tmp_path):
    bad = json.loads(json.dumps(GOOD))
    bad["play"]["title"] = "BEST Free Ledger App #1 🔥!!"
    bad["play"]["short_description"] = "x" * 81
    code, errors, _ = listing(tmp_path, bad)
    assert code == 1
    text = " | ".join(errors)
    for expected in ("emoji", "'BEST'", "'Free'", "'#1'", "ALL-CAPS", "repeated special", "81 characters"):
        assert expected in text, expected


def test_brand_caps_allowed(tmp_path):
    ok = json.loads(json.dumps(GOOD))
    ok["play"]["title"] = "UPI Hisab Ledger"
    code, errors, _ = listing(tmp_path, ok)
    assert code == 0, errors


def test_appstore_keywords_and_platform(tmp_path):
    bad = json.loads(json.dumps(GOOD))
    bad["appstore"]["keywords"] = "ledger, khata,khata,app"
    bad["appstore"]["description"] = "Also on Android."
    code, errors, all_issues = listing(tmp_path, bad)
    assert code == 1 and any("another platform" in e for e in errors)
    text = " | ".join(all_issues)
    assert "spaces after commas" in text and "repeated: khata" in text and "already in name" in text and "'app'" in text


def test_keywords_bytes_in_hindi(tmp_path):
    bad = json.loads(json.dumps(GOOD))
    bad["appstore"]["keywords"] = ",".join(["हिसाब"] * 8)  # 47 characters, 128 bytes
    code, errors, _ = listing(tmp_path, bad)
    assert code == 1 and any("bytes" in e for e in errors)


def test_missing_required(tmp_path):
    code, errors, _ = listing(tmp_path, {"play": {"title": "Hisab"}})
    assert code == 1 and sum("missing" in e for e in errors) == 2


def img(path, size, mode="RGB", fmt=None):
    path.parent.mkdir(parents=True, exist_ok=True)
    Image.new(mode, size, (20, 40, 60) if mode == "RGB" else (20, 40, 60, 255)).save(path, fmt)


def good_store(root):
    img(root / "play/icon.png", (512, 512), "RGBA")
    img(root / "play/feature-graphic.jpg", (1024, 500))
    for n in range(4):
        img(root / f"play/phone/{n}.png", (1080, 1920))
    for n in range(3):
        img(root / f"appstore/iphone/{n}.png", (1320, 2868))
    img(root / "appstore/icon.png", (1024, 1024))


def test_good_assets_pass(tmp_path):
    good_store(tmp_path)
    code, r = run(ASSETS, tmp_path)
    assert code == 0, r["issues"]


def test_bad_assets_fail(tmp_path):
    good_store(tmp_path)
    img(tmp_path / "play/icon.png", (500, 500), "RGBA")
    img(tmp_path / "play/feature-graphic.jpg", (1024, 600))
    img(tmp_path / "play/phone/wide.png", (1080, 2400), "RGBA")  # alpha + ratio over 2:1
    img(tmp_path / "appstore/iphone/odd.png", (1170, 2532))
    img(tmp_path / "appstore/icon.png", (1024, 1024), "RGBA")
    code, r = run(ASSETS, tmp_path)
    assert code == 1
    text = " | ".join(i["where"] + ": " + i["issue"] for i in r["issues"] if i["severity"] == "error")
    for expected in ("500x500, must be 512x512", "1024x600", "more than twice", "alpha channel", "1170x2532 isn't an accepted", "can't be transparent"):
        assert expected in text, expected


def test_ipad_required_and_mixed_sizes(tmp_path):
    good_store(tmp_path)
    img(tmp_path / "appstore/iphone/other.png", (1290, 2796))
    code, r = run(ASSETS, tmp_path, "--ipad")
    text = " | ".join(i["where"] + ": " + i["issue"] for i in r["issues"])
    assert code == 1 and "appstore/ipad: missing" in text and "mixed sizes" in text


def test_empty_folder(tmp_path):
    code, r = run(ASSETS, tmp_path)
    assert code == 1


def test_brand_word_exempts_claim(tmp_path):
    ok = json.loads(json.dumps(GOOD))
    ok["brand_words"] = ["Top"]
    ok["play"]["title"] = "Top Hisab Ledger"
    code, errors, _ = listing(tmp_path, ok)
    assert code == 0, errors


def test_simple_html_is_not_a_placeholder(tmp_path):
    ok = json.loads(json.dumps(GOOD))
    ok["play"]["full_description"] = "<b>Fast.</b> Works offline.<br>Made in India."
    code, errors, _ = listing(tmp_path, ok)
    assert code == 0, errors

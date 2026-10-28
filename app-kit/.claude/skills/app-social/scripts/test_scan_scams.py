"""Tests for scan_scams.py: these cases are the spec the app's own filter must also pass.
Run: python3 -m pytest -q this_file
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from scan_scams import scan  # noqa: E402

CLEAN = [
    "Great breakdown of the RBI policy, thanks!",
    "Source for the 6.5% repo rate? I couldn't find it on rbi.org.in",
    "Bitcoin fell 4% today after the Fed decision.",
    "I lost money on this coin last year, be careful everyone.",
    "Check the official numbers at https://www.sebi.gov.in/statistics",
    "Binance listed it yesterday according to their blog https://www.binance.com/en/blog",
    "Who else is watching this at 2am 😂",
]

BLOCK = [
    "Support team here: please share your 12 word seed phrase to restore your account",
    "Hey, verify your wallet now, your account has been suspended: https://binance-support-verify.xyz/login",
    "GIVEAWAY!! Send 0.1 ETH to 0x52908400098527886E0F7030069857D2E4169EE7 and get 0.2 ETH back",
]

HOLD = [
    "Guaranteed profit 10% daily, DM me on telegram for VIP signals group",
    "Paisa double in 7 days, pakka profit, whatsapp karo +91 98765 43210 contact now",
    "I am from the admin team, message me on whatsapp to unlock your funds",
]


def test_clean_messages_pass():
    for text in CLEAN:
        r = scan(text)
        assert r["verdict"] == "allow", (text, r)


def test_obvious_scams_blocked():
    for text in BLOCK:
        r = scan(text)
        assert r["verdict"] == "block", (text, r)


def test_signal_and_returns_scams_held_or_blocked():
    for text in HOLD:
        r = scan(text)
        assert r["verdict"] in ("hold", "block"), (text, r)


def test_lookalike_domains():
    assert scan("login at https://c0inbase.com/secure")["verdict"] in ("hold", "block")
    assert scan("open https://coindcx-rewards.app now")["verdict"] in ("hold", "block")
    assert scan("read https://www.coinbase.com/learn")["verdict"] == "allow"


def test_shortener_and_new_account_link_warns():
    r = scan("more here bit.ly/3abcde", new_account=True)
    assert r["verdict"] == "warn", r
    assert scan("more here https://example.org/page")["verdict"] == "allow"


def test_wallet_address_alone_warns():
    r = scan("my address bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq")
    assert r["verdict"] == "warn", r


def test_zero_width_characters_dont_hide_phrases():
    r = scan("share your se​ed phrase please")
    assert r["verdict"] == "block", r


def test_safety_advice_and_mentions_are_not_scams():
    for text in [
        "Never share your private key with anyone, great video",
        "The part about 24 word recovery phrases was really clear",
        "Is there a telegram channel from RBI? Probably not",
        "I get news on whatsapp and most of it is fake, that's why I like this app",
        "This is not guaranteed profit, the creator said risk is high",
        "100x leverage is how people get wiped out",
        "Don't DM me for signals, I don't do that",
    ]:
        r = scan(text)
        assert r["verdict"] == "allow", (text, r)

"""Tests for order_math.py. Expected values are worked out by hand in the comments.
Run: python3 -m pytest -q this_file
"""

import sys
from decimal import Decimal
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent))
from order_math import compute  # noqa: E402

RULES = {
    "pair": "BTC-INR", "base": "BTC", "quote": "INR",
    "qty_step": "0.00000001", "price_tick": "0.01",
    "min_qty": "0.00001", "min_notional": "100",
    "partner_fee_rate": "0.002", "platform_fee_rate": "0.003",
    "fee_rounding": "up", "sell_tax_rate": "0.01", "sell_tax_name": "TDS", "max_quote_age_s": 10,
}


def test_buy_by_quantity():
    # value 0.001 * 5,000,000 = 5000.00; fees 0.2% = 10.00 and 0.3% = 15.00; pay 5025.00
    r = compute(RULES, "buy", "5000000", qty="0.001")
    assert (r["value"], r["partner_fee"], r["platform_fee"], r["total"]) == ("5000.00", "10.00", "15.00", "5025.00")
    assert r["valid"] and r["fee_share_of_value"] == "0.50%"


def test_buy_by_spend_never_exceeds_spend():
    # 5025 / 1.005 = 5000 -> qty 0.001 exactly -> total 5025.00, nothing left
    r = compute(RULES, "buy", "5000000", spend="5025")
    assert r["quantity"] == "0.001" and r["total"] == "5025.00" and r["valid"]
    # awkward price: total must still be <= spend, quantity on the step
    r = compute(RULES, "buy", "5432100.55", spend="5000")
    assert Decimal(r["total"]) <= Decimal("5000")
    assert Decimal(r["quantity"]) % Decimal("0.00000001") == 0


def test_sell_with_tax():
    # value 5000.00; fees 25.00; TDS 1% = 50.00; receive 4925.00
    r = compute(RULES, "sell", "5000000", qty="0.001")
    assert (r["fees"], r["tax"], r["total"], r["tax_name"]) == ("25.00", "50.00", "4925.00", "TDS")


def test_fee_rounds_up_to_tick():
    # value 0.00012345 * 5,432,100.55 = 670.5927... -> 670.59; 0.2% = 1.34118 -> up 1.35
    r = compute(RULES, "buy", "5432100.55", qty="0.00012345")
    assert r["value"] == "670.59" and r["partner_fee"] == "1.35"


def test_quantity_rounded_down_to_step_with_note():
    r = compute(RULES, "buy", "5000000", qty="0.001000009")
    assert r["quantity"] == "0.001" and any("rounded down" in n for n in r["notes"])


def test_minimums_and_stale_quote():
    r = compute(RULES, "buy", "5000000", qty="0.000001")
    assert not r["valid"]
    assert any("below the minimum 0.00001" in p for p in r["problems"])
    assert any("below the minimum 100" in p for p in r["problems"])
    r = compute(RULES, "buy", "5000000", qty="0.001", quote_age=12)
    assert not r["valid"] and any("refresh the quote" in p for p in r["problems"])


def test_tiny_spend_is_invalid():
    r = compute(RULES, "buy", "5000000", spend="0.01")
    assert not r["valid"]


def test_bad_input():
    with pytest.raises(ValueError):
        compute(RULES, "buy", "abc", qty="1")
    with pytest.raises(ValueError):
        compute({k: v for k, v in RULES.items() if k != "qty_step"}, "buy", "1", qty="1")


def test_amounts_keep_their_decimal_places():
    r = compute(RULES, "sell", "3000", qty="10")
    assert r["value"] == "30000.00" and r["quantity"] == "10"


def test_spend_is_never_exceeded_property():
    # The auditor's failing cases, then a seeded random sweep (ticks 0.01 and 1).
    import random
    rules = dict(RULES, partner_fee_rate="0.001", platform_fee_rate="0.01", sell_tax_rate="0")
    assert Decimal(compute(rules, "buy", "100", spend="1000")["total"]) <= Decimal("1000")
    assert Decimal(compute(rules, "buy", "16275.80", spend="158990.24")["total"]) <= Decimal("158990.24")
    rng = random.Random(7)
    for tick in ("0.01", "1"):
        r2 = dict(rules, price_tick=tick, min_notional="0", min_qty="0")
        for _ in range(3000):
            price = Decimal(rng.randint(100, 9_000_000)) * Decimal(tick)
            spend = Decimal(rng.randint(100, 50_000_000)) / 100
            out = compute(r2, "buy", str(price), spend=str(spend))
            assert Decimal(out["total"]) <= spend, (tick, price, spend, out)


def test_rejects_bad_inputs():
    for kwargs in ({"spend": "100", "qty": "1"}, {"qty": "-1"}, {"qty": "1", "quote_age": -1}):
        with pytest.raises(ValueError):
            compute(RULES, "buy", "5000000", **kwargs)
    with pytest.raises(ValueError):
        compute(RULES, "sell", "5000000", spend="100")
    with pytest.raises(ValueError):
        compute(dict(RULES, partner_fee_rate="-0.1"), "buy", "5000000", qty="0.001")


def test_price_off_tick_is_invalid():
    r = compute(RULES, "buy", "5000000.005", qty="0.001")
    assert not r["valid"] and any("price tick" in p for p in r["problems"])

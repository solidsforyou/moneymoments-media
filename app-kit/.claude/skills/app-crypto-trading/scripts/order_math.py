#!/usr/bin/env python3
"""Exact order maths for a crypto trading screen: quantity, fees, tax, totals.

Every number the app shows before a user confirms a trade must match what
the partner will charge. This script is the reference: decimal arithmetic
(never floats), the partner's step and tick sizes, minimums, both fee
layers (partner + platform markup) and withholding tax, with the rounding
written down. Use it to check the app's own maths in tests, and to
double-check any number in a design or a support reply.

Market rules come from the partner's API (a JSON file per trading pair):

  {"pair": "BTC-INR", "base": "BTC", "quote": "INR",
   "qty_step": "0.00000001", "price_tick": "0.01",
   "min_qty": "0.00001", "min_notional": "100",
   "partner_fee_rate": "0.002", "platform_fee_rate": "0.003",
   "fee_rounding": "up",                      # how fees round to the price tick: up / down / half_even
   "fee_gst_rate": "0.18",                    # optional; GST charged on fees (18% in India)
   "sell_tax_rate": "0.01", "sell_tax_name": "TDS",   # optional; withheld from the seller (India: 1% TDS, s.194S)
   "max_quote_age_s": 10}

Usage:
  python3 order_math.py RULES.json buy  --spend 5000 --price 5432100.55 [--quote-age 3]
  python3 order_math.py RULES.json buy  --qty 0.001  --price 5432100.55
  python3 order_math.py RULES.json sell --qty 0.001  --price 5432100.55 [--json]

Buy with --spend: the largest quantity on the step whose value + fees +
GST fits inside the spend (never more than the user pays for).
Buy with --qty: the user pays value + fees. Sell: the user receives value
minus fees minus tax.

Exit code 0 when the order is valid, 1 when it breaks a rule (below the
minimum, stale quote, nothing left after fees), 2 for bad input.
"""

import argparse
import json
import sys
from decimal import ROUND_DOWN, ROUND_HALF_EVEN, ROUND_UP, Decimal, InvalidOperation

ROUNDING = {"up": ROUND_UP, "down": ROUND_DOWN, "half_even": ROUND_HALF_EVEN}
REQUIRED = ["pair", "base", "quote", "qty_step", "price_tick", "min_qty", "min_notional", "partner_fee_rate", "platform_fee_rate"]


def D(x, name):
    try:
        v = Decimal(str(x))
    except (InvalidOperation, ValueError):
        raise ValueError(f"{name} is not a number: {x!r}")
    if not v.is_finite():
        raise ValueError(f"{name} must be finite")
    return v


def to_step(value: Decimal, step: Decimal, rounding) -> Decimal:
    return ((value / step).to_integral_value(rounding=rounding) * step).quantize(step)


def compute(rules: dict, side: str, price, spend=None, qty=None, quote_age=None):
    for k in REQUIRED:
        if k not in rules:
            raise ValueError(f"rules missing {k}")
    step, tick = D(rules["qty_step"], "qty_step"), D(rules["price_tick"], "price_tick")
    price = D(price, "price")
    if price <= 0 or step <= 0 or tick <= 0:
        raise ValueError("price, qty_step and price_tick must be above zero")
    fee_p, fee_x = D(rules["partner_fee_rate"], "partner_fee_rate"), D(rules["platform_fee_rate"], "platform_fee_rate")
    tax_rate = D(rules.get("sell_tax_rate", "0"), "sell_tax_rate")
    gst_rate = D(rules.get("fee_gst_rate", "0"), "fee_gst_rate")
    fee_round = ROUNDING[rules.get("fee_rounding", "up")]
    if fee_p < 0 or fee_x < 0 or tax_rate < 0 or gst_rate < 0:
        raise ValueError("fee and tax rates can't be negative")
    if spend is not None and qty is not None:
        raise ValueError("give --spend or --qty, not both")
    if side == "sell" and spend is not None:
        raise ValueError("for a sell, give --qty")
    if quote_age is not None and Decimal(str(quote_age)) < 0:
        raise ValueError("quote age can't be negative")
    if qty is not None and D(qty, "qty") <= 0:
        raise ValueError("quantity must be above zero")
    problems, notes = [], []
    if to_step(price, tick, ROUND_HALF_EVEN) != price:
        problems.append(f"price {price} isn't on the price tick {tick}: use the partner's quoted price")

    def cost(q):
        """value, partner fee, platform fee, GST on fees, tax and the total for quantity q."""
        value = to_step(q * price, tick, ROUND_HALF_EVEN)
        pf = to_step(value * fee_p, tick, fee_round)
        xf = to_step(value * fee_x, tick, fee_round)
        gst = to_step((pf + xf) * gst_rate, tick, fee_round)
        tax = to_step(value * tax_rate, tick, ROUND_UP) if side == "sell" and tax_rate > 0 else Decimal(0)
        total = value + pf + xf + gst if side == "buy" else value - pf - xf - gst - tax
        return value, pf, xf, gst, tax, total

    if side == "buy" and spend is not None:
        spend = D(spend, "spend")
        if spend <= 0:
            raise ValueError("spend must be above zero")
        # The total only grows with the quantity, so binary-search the largest whole number
        # of steps whose total (value + fees + GST, each rounded as the partner does) fits.
        lo, hi = 0, int((spend + tick) / (price * step)) + 1  # value can round down by up to half a tick
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if cost(step * mid)[5] <= spend:
                lo = mid
            else:
                hi = mid - 1
        q = (step * lo).quantize(step)
    else:
        if qty is None:
            raise ValueError("give --qty (or --spend for a buy)")
        q_in = D(qty, "qty")
        q = to_step(q_in, step, ROUND_DOWN)
        if q != q_in:
            notes.append(f"quantity rounded down to the step {step}: {q_in} -> {q}")

    value, partner_fee, platform_fee, gst, tax, total = cost(q)
    fees = partner_fee + platform_fee
    if side == "buy" and spend is not None and spend - total > 0:
        notes.append(f"{spend - total} {rules['quote']} stays unspent (the next step would cost more than the spend)")

    if q <= 0:
        problems.append("the amount is too small to buy one step after fees")
    if q < D(rules["min_qty"], "min_qty"):
        problems.append(f"quantity {q} is below the minimum {rules['min_qty']} {rules['base']}")
    if value < D(rules["min_notional"], "min_notional"):
        problems.append(f"order value {value} is below the minimum {rules['min_notional']} {rules['quote']}")
    if side == "sell" and total <= 0:
        problems.append("nothing left after fees and tax")
    max_age = rules.get("max_quote_age_s")
    if quote_age is not None and max_age is not None and Decimal(str(quote_age)) > Decimal(str(max_age)):
        problems.append(f"price is {quote_age}s old, older than the {max_age}s allowed: refresh the quote")

    effective = to_step(total / q, tick, ROUND_HALF_EVEN) if q > 0 else None
    return {
        "pair": rules["pair"], "side": side, "price": str(price), "quantity": format(q.normalize(), "f") if q else "0",
        "value": str(value), "partner_fee": str(partner_fee), "platform_fee": str(platform_fee), "fees": str(fees), "gst_on_fees": str(gst),
        "tax": str(tax), "tax_name": rules.get("sell_tax_name", "tax") if tax else None,
        "total": str(total), "total_meaning": "you pay" if side == "buy" else "you receive",
        "effective_price": str(effective) if effective is not None else None,
        "fee_share_of_value": f"{((fees + gst) / value * 100).quantize(Decimal('0.01'))}%" if value > 0 else None,
        "valid": not problems, "problems": problems, "notes": notes,
    }


def main():
    ap = argparse.ArgumentParser(description="Exact order maths for a trade screen.")
    ap.add_argument("rules")
    ap.add_argument("side", choices=["buy", "sell"])
    ap.add_argument("--price", required=True)
    ap.add_argument("--spend")
    ap.add_argument("--qty")
    ap.add_argument("--quote-age", type=float)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    if a.side == "sell" and a.spend:
        print("For a sell, give --qty.", file=sys.stderr)
        return 2
    try:
        rules = json.load(open(a.rules))
        r = compute(rules, a.side, a.price, spend=a.spend, qty=a.qty, quote_age=a.quote_age)
    except (OSError, json.JSONDecodeError, ValueError, KeyError) as e:
        print(f"Bad input: {e}", file=sys.stderr)
        return 2
    if a.json:
        print(json.dumps(r, indent=2))
    else:
        q = rules["quote"]
        print(f"{r['side'].upper()} {r['quantity']} {rules['base']} at {r['price']} {q}")
        print(f"  value         {r['value']:>18} {q}")
        print(f"  partner fee   {r['partner_fee']:>18} {q}")
        print(f"  platform fee  {r['platform_fee']:>18} {q}")
        if Decimal(r["gst_on_fees"]):
            print(f"  GST on fees   {r['gst_on_fees']:>18} {q}")
        if r["tax_name"]:
            print(f"  {r['tax_name']:<13} {r['tax']:>18} {q}")
        print(f"  {r['total_meaning']:<13} {r['total']:>18} {q}   (fees {r['fee_share_of_value']} of value)")
        for n in r["notes"]:
            print(f"  note: {n}")
        for p in r["problems"]:
            print(f"  INVALID: {p}")
    return 0 if r["valid"] else 1


if __name__ == "__main__":
    sys.exit(main())

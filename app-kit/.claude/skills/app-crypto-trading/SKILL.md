---
name: app-crypto-trading
description: Build crypto trading into an app like a fintech product lead who has shipped regulated trading: the app as front end on a licensed partner (gateway, exchange or broker API), choosing that partner, KYC and onboarding, prices and quotes, the order lifecycle, exact fee and tax maths, security for money movement, per-country rules and risk warnings, where social content meets trading, reconciliation and incidents. Includes an exact order-maths script. Use for any trading, wallet, portfolio, price, deposit, withdrawal, partner, "invest" prompt or crypto compliance task.
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-crypto-trading.md` and follow it. It holds the
   responsibility split, the partner checklist, the user journey, the order
   state machine, the maths rules, security, compliance and the output
   format.
2. Every number on a trade screen (quantity, value, fees, tax, total) is
   checked against the bundled script, never worked out by hand:

   ```
   python3 "SKILL_DIR/scripts/order_math.py" RULES.json buy --spend 5000 --price 5432100.55
   python3 "SKILL_DIR/scripts/order_math.py" RULES.json sell --qty 0.001 --price 5432100.55 --json
   ```

   RULES.json holds the partner's real step, tick, minimums and fee rates
   for the pair (format in the script's help). The app's own maths must
   give the same results in its tests.
3. careful-mode on everything here; app-security section 4a for the rules;
   the auditor audits every change that touches money.

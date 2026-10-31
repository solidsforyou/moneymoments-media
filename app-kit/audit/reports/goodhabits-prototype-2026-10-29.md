# Audit: design/goodhabits-prototype.html (clickable preview)
Date: 2026-10-29. Level: L3 (money screens). Auditor: agent.
Request (restated): audit the GoodHabits clickable preview against brief.md and founder v0: features, promises, money maths, disclaimers, Zerodha claims, copy, JS bugs.
Checked: full read of the 846-line prototype; flow.cjs run (no console errors, final balances ₹11,033.67 / ₹560, recomputed by hand); extra Playwright script reproducing the bugs below.
Could not check: ledger (audit.py init not run; it changes git hook config); memory sheet has no Zerodha rows, so Zerodha facts checked against brief.md only.

## Verdict
FAIL: 2 blocking money-maths bugs in Hissab. See the findings in the session report.

1. Blocking: settling up is a flag, so any new shared expense brings the old debt back (Kabir settled, then ₹100 chai, shows ₹5,150 owed). Fix: store a settlement as a payment row.
2. Blocking: "1,200" saves as ₹1 (parseFloat stops at the comma). Fix: strip commas and spaces, reject any other non-digits.
3. Should-fix: the search loader gets stuck if you change tabs within 0.8s (go() clears the timer).
4. Should-fix: holdings ₹48,600 / ₹52,140 are shown before Zerodha is connected.
5. Should-fix: the GoodHabits Studio story has no House account label.
6. Should-fix: the Settings placeholder text "[Final wording...]" is visible and claims a revenue model that isn't decided.
7. Should-fix: no SEBI market-risk line in the buy sheet.
8. Should-fix: "Write a review" on an article opens the source-rating sheet.
9. Should-fix: no way to add a friend by phone or Good ID; every new expense goes to the Goa trip group.
10. Should-fix: the feed filter ignores the topics chosen at sign-up; no Hinglish anywhere.
11. Nits: "Every day, once"; the expense help text doesn't update while typing; the scam DM comes from friend Rohan; the nudge never comes back after you switch tabs.

# App build

You build the app one small, finished piece at a time. "Finished" means a
user could use it: it works on a cheap phone on a slow network, it handles
errors, it has tests, and every check passes. A half-built feature behind
a working one is worth less than the working one alone.

## 1. Before writing code

1. Read the repo's `CLAUDE.md`, `docs/spec.md` and the decision records in
   `docs/decisions/`. Search the memory sheet for the feature's key words.
2. Pick **one** user story (the next unchecked one in the spec, unless the
   founder named another). If the request isn't in the spec, say so: it is
   either a bug (fix it) or a spec change (the founder approves it, and
   `docs/spec.md` gets updated first).
3. Read the code you'll touch and the code that calls it. Follow the
   patterns already there (naming, folders, state, styling) even if you'd
   choose differently; raise a better pattern as a suggestion, don't mix
   two.
4. Write a short plan for yourself: files to add or change, data or
   database changes, new dependencies (each needs a reason), and how
   you'll know it works. If the plan touches more than about 10 files or
   two features, split the story.

## 2. The build loop (per story)

1. **Branch:** `feat/<short-name>` or `fix/<short-name>` from the latest
   main.
2. **Tests first where it's cheap:** turn the story's acceptance checks
   into tests (app-testing skill says which kind). Logic tests before the
   code; screen tests can follow the screen.
3. **Build the smallest version that passes**, data layer first, then
   the screen, then polish.
4. **Run the app and use the feature yourself**, the way a user would:
   the happy path, then wrong input, no network, slow network, empty data,
   a long name, Hindi text, the back button, rotating or resizing. Fix
   what you find. Typecheck passing is not "it works".
5. **Preflight:** `python3 SKILL_DIR/scripts/preflight.py` until it exits
   0.
6. **Review your own diff** as a reviewer who wants to reject it: dead
   code, debug output, copy-pasted blocks, missing error states, unclear
   names, secrets, anything the story didn't ask for. Fix, then preflight
   again.
7. **Commit** with a message saying what the user can now do
   ("Sign in with phone OTP"), not which files changed. One story can be
   several commits; each one should leave the app working.
8. **Tick the story's box in `docs/spec.md`** and note anything that
   changed from the spec (with the founder's OK).
9. **UI changed?** Run app-ui-taste on the new screens before calling it
   done.

Push and open a pull request when the founder wants review, or as the
repo's CLAUDE.md says. Never push to main directly once the app has users.

## 3. Code rules

- **Small and plain.** Functions do one thing; files stay under about 300
  lines; names say what things are (`unpaidOrders`, not `data2`). No
  clever one-liners where three clear lines do.
- **Types are the contract.** No `any` (use `unknown` and narrow it). Data
  from outside (network, storage, forms, deep links, push payloads) is
  validated at the boundary with a schema (for example zod) before the
  rest of the app trusts it.
- **Logic out of screens.** Calculations, formatting and rules live in
  plain functions in `src/lib/` with unit tests; screens call them.
- **Money:** store amounts as integers in paise, never floats. Format with
  `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.
  Prices and totals are computed on the server; the app only displays them.
- **Dates:** store in UTC (ISO 8601), show in the user's time zone
  (Asia/Kolkata for most users). Use the platform's `Intl` formatting.
- **Every data screen has four states:** loading (skeleton or spinner
  within 100 ms), empty (what to do next), error (what happened in plain
  words plus a retry), and loaded. No blank screens, no endless spinners:
  every request has a timeout.
- **Errors:** never swallow them silently. Show the user a plain message,
  report the details to crash reporting, and keep the app usable. Never
  show raw error text or stack traces to users.
- **Logs:** no personal data (phone numbers, emails, OTPs, tokens, exact
  location) in logs or analytics, ever.
- **Text:** every string a user sees goes through the translation file
  from the start, even if v1 is English only. Hindi text runs longer, so
  layouts must not break at 1.4x length.
- **Analytics:** add the events the spec's success numbers need, with the
  exact names the spec gives. Nothing more without a reason.
- **Comments** explain *why*, not *what*. Match the comment density of the
  surrounding code.

## 4. Data and backend rules

- **Database changes are migration files** in the repo, applied the same
  way locally and in production. Never change the production schema by
  hand in a dashboard.
- **Row level security (or Firebase rules) on every table from the first
  migration.** Default deny; then allow exactly what the spec's data table
  says. Test the rules (app-testing).
- **Never trust the app.** Anything the server must be sure of (prices,
  payment status, roles, limits, who owns what) is decided on the server.
- **Payments:** create the order on the server, confirm payment through
  the gateway's server-side verification or signed webhook, and make the
  handler idempotent (the same webhook twice must not double-credit).
- **Server secrets** live in the backend's secret store, never in app code
  or public env variables (app-security).
- **Lists are paginated** from the start (20 to 50 items a page).

## 5. Real phones, real India

Build and test for the users in the spec, who are most likely on:

- **Budget Android phones** (3 to 4 GB RAM, mid-range chips): keep lists
  virtualised (FlatList/FlashList), avoid re-rendering whole screens,
  compress and resize images before upload, lazy-load heavy screens.
- **Slow or patchy mobile data:** show cached data first, retry with
  backoff, make every write safe to retry, and keep the first screen
  usable within 3 seconds on a slow 4G connection. Keep the install
  small; every MB costs users data.
- **Big system font and display sizes:** layouts must survive the
  largest font setting without cut-off text.
- **Android back button and gestures:** back always does what the user
  expects; it never exits the app from a deep screen.
- **Keyboards:** inputs aren't hidden behind the keyboard; the right
  keyboard type (numeric for OTP and phone, email for email); OTP
  autofill on.
- **Notches, cut-outs and gesture bars:** use safe areas.
- **Dark mode:** follow the system setting from v1 if the design system
  has dark tokens; otherwise force light deliberately, not by accident.
- **Phone numbers:** +91 and 10 digits; accept spaces and a leading 0 or
  +91, store in E.164 (`+91XXXXXXXXXX`).
- **Languages:** English UI by default unless the spec says Hindi or
  Hinglish; keep the translation file ready either way.

## 6. Dependencies

Before adding a package, check: is the platform's built-in enough? Is it
maintained (release in the last year, open issues answered)? Is it widely
used? Is its licence fine for a commercial app (MIT, Apache-2.0, BSD,
ISC)? How much does it add to app size? For Expo apps, does it work with
Expo (use `npx expo install` so the version matches the SDK)? Pin through
the lockfile, and commit the lockfile.

## 7. When something breaks (debugging)

1. **Reproduce it** reliably, and write down the exact steps, device and
   data. Can't reproduce it: add logging where the trail goes cold and
   ask for the steps; don't guess-fix.
2. **Read the whole error**, including the first line of the stack trace
   in your own code and any "caused by".
3. **Narrow it down:** the last change that worked (`git bisect` for
   regressions), the smallest input that fails, the one layer it's in
   (UI, state, network, server, database, rules).
4. **One hypothesis at a time:** predict what you'll see, check it, then
   decide. After two wrong guesses, stop guessing and add instrumentation.
5. **Fix the cause, not the symptom.** No retry loops around a bug, no
   `try {} catch {}` to hide it, no `// @ts-ignore`.
6. **Write a test that fails without the fix** and passes with it.
7. **Look for the same bug elsewhere** (the same pattern copied).
8. If the bug reached users, tell the founder what happened, who was
   affected and what you changed, in plain words.

## 8. Saving credits

Bulk mechanical work (renaming across files, generating test data,
boilerplate for a known pattern, first drafts of many similar
components) can go to economy-mode helpers with exact instructions. The
plan, data and security code, the review of the diff and all debugging
stay with you. Review every helper's output like your own.

## 9. Done when (definition of done)

- The story's acceptance checks pass as tests, and you used the feature
  in the running app.
- Loading, empty and error states exist and work.
- Preflight exits 0 (full run, not `--quick`).
- No secrets, no personal data in logs, server decides anything that
  matters.
- UI changes passed app-ui-taste (85 or more, no criterion below 7).
- The spec is ticked and still true.
- careful-mode's three reviews passed for anything touching payments,
  personal data, auth or production.

## 10. Output format

```
Built: <story> (branch <name>, <n> commits)
Works: <what you tried in the running app>
Checks: preflight passed (<lint, typecheck, n tests, build>)
UI: app-ui-taste <score>/100 (or "no UI change")
Not done / follow-ups: <list, or "none">
Needs the founder: <keys, accounts, decisions, or "nothing">
```

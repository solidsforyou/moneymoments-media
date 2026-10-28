# App testing

You are the QA lead. Your job is to make sure users never find a bug you
could have found first, while keeping the test suite fast enough that it
runs on every change. A test that is slow, flaky or tests nothing real is
worse than no test: it teaches everyone to ignore red.

## 1. What to test, at which level

| Level | What | Tool (from app-stack defaults) | How many |
|---|---|---|---|
| Unit | Plain logic in `src/lib/`: money maths, validation, formatting, date rules, state reducers | Vitest (web) / Jest (Expo) | Many; fast (whole suite in seconds) |
| Screen (component) | Each screen's states: loading, empty, error, loaded; form validation messages; buttons disabled when they should be | React Testing Library / React Native Testing Library | One file per screen |
| Database rules | Row level security or Firebase rules: who can read and write each table | `supabase test db` (pgTAP) or the Firebase emulator | Every table, every role |
| Server | API routes, edge functions, webhooks: input validation, auth, idempotency | The backend's test runner against a local instance | Every endpoint |
| End to end | The spec's core flow and anything involving money, end to end in a real browser or app | Playwright (web) / Maestro (phone) | Few (3 to 10 flows), slow, high value |
| Manual pass | Real devices, real networks, before each release | `test-plan-template.md` | Every release |

Put each test at the lowest level that can catch the bug. A wrong total
is a unit test, not an end-to-end test.

## 2. From acceptance checks to tests

Every acceptance check in `docs/spec.md` becomes at least one test, and
the test's name is the check's own words, so a failing test reads like a
broken promise:

```
test("after 3 wrong OTPs, the button is disabled for 60 s", ...)
```

Then add the cases the check implies but doesn't say: empty input, too
long input, the boundary values (0, 1, the limit, the limit + 1), no
network, the server returning an error, and the user doing it twice.

## 3. Rules that keep tests reliable

- **No real network in unit and screen tests.** Mock at the boundary (the
  API client, or with MSW), never deep inside the code.
- **No sleeping.** Wait for a condition (`findBy...`, `expect.poll`,
  Playwright's auto-waiting, Maestro's `extendedWaitUntil`), never a fixed
  delay.
- **Control time and place.** Fake timers for timeouts; a fixed "now";
  the time zone set to Asia/Kolkata in test setup so date bugs show up in
  CI the way they do for users.
- **Each test sets up its own data** with small factory functions and
  cleans up after itself. Tests pass in any order and in parallel.
- **One reason to fail per test.** Assert on what the user sees (text,
  roles, labels), not on internal state or CSS classes.
- **Test data looks real:** Indian names (and a very long one), +91 phone
  numbers, rupee amounts with paise, Hindi text, emoji.
- **Fast:** unit and screen tests in under a minute together; anything
  slower moves to the end-to-end suite.
- **A flaky test is a bug.** Find the cause (timing, shared state, order,
  real network, time zone) and fix it. Never mark it skipped, add retries
  to hide it, or delete it without the founder's OK.
- **Never weaken a test to make it pass.** If the test is wrong, fix the
  test and say why in the commit; if the code is wrong, fix the code.

## 4. Must-have tests for any app

- **Sign-in:** success, wrong code or password, expired session (the app
  recovers or asks to sign in again), sign-out clears everything.
- **Access rules:** user A cannot read or change user B's data, through
  the app *and* by calling the API directly with A's token. A signed-out
  user can do only what the spec allows.
- **Money (if any):** totals in paise, rounding, discounts, and the
  payment webhook: valid signature accepted, bad signature rejected, the
  same event twice credits once, the app showing "pending" until the
  server confirms.
- **Account deletion:** deletes or anonymises the user's data as the
  privacy policy says, and signs out everywhere.
- **Upgrades:** data from the previous version still loads after an
  update (stored settings, cached data, database migrations).

## 5. End-to-end tests

- Cover the core flow from a fresh install or empty browser to the
  moment of value, plus every flow involving money or deletion.
- Run against a test backend with seeded data, never production.
- Use stable selectors: accessibility labels and roles (`getByRole`,
  `getByLabel`, Maestro's text or `id`), never CSS paths.
- Run them in CI on pull requests to main, or nightly if they're slow;
  run them locally before a release.

## 6. Release test pass (manual, on real devices)

Before every store release or production deploy, fill in
`test-plan-template.md` for the version. Minimum matrix:

- A **budget Android phone** (or emulator with 3 to 4 GB RAM) on the
  oldest Android version the app supports.
- A **recent Android** and an **iPhone** on the oldest supported iOS (if
  the app is on iOS).
- **360 px wide** screen, **largest system font**, **dark mode**.
- **Slow network** (throttled 3G or 4G), **offline**, and switching
  between them mid-action.
- **Fresh install** and **upgrade over the previous store version**.
- **Permissions denied** (camera, notifications, location: whatever the
  app asks), then granted later from settings.
- **Interruptions:** app sent to background mid-flow, killed by the
  system, a phone call, rotating the phone.
- **Push notifications** arrive, and tapping one opens the right screen.
- Hindi text (if supported) and a very long name.

Anything that fails becomes a bug report (section 7). Release only when
no open bug is marked Blocker or Major, or the founder accepts each
remaining one by name.

## 7. Bug reports

```
Title: <what's wrong, where> (for example "Checkout total ignores coupon on Android")
Severity: Blocker (crash, data loss, money wrong, can't sign in) / Major (a
  main flow broken, no workaround) / Minor (workaround exists) / Cosmetic
Steps: 1. ... 2. ... 3. ...
Expected: ...
Actual: ...
Device / OS / app version / network: ...
Evidence: screenshot, screen recording, log lines (no personal data)
Frequency: always / sometimes (n of m tries)
```

A bug isn't fixed until a test reproduces it and passes after the fix
(app-build section 7).

## 8. Coverage

Don't chase a coverage percentage. Do check that `src/lib/` (the logic)
is well covered (around 80% or more of its lines) and that every
acceptance check and every section-4 item has a test. Untested money,
auth or access-rule code is a release blocker.

## 9. Output format

```
Tests: <n> unit, <n> screen, <n> rules, <n> server, <n> e2e (all passing / <n> failing)
New this change: <list of test names, or "none">
Acceptance checks covered: <n>/<n> (missing: <list>)
Release pass (if run): docs/test-plans/<version>.md: <n> rows passed, <n> bugs (<severities>)
Blockers: <list, or "none">
```

# App stack

You pick the tools the app is built with and set up the repo so that every
later change is checked automatically. The goal is a boring, well-known
stack that one founder and Claude can run cheaply for years, not the newest
thing. Every choice is written down with its reason, so nobody re-argues it
later.

Read `docs/spec.md` first. No spec, no stack: run app-spec first.

## 1. Defaults (use these unless section 2 says otherwise)

Written October 2026. Before installing, look up each tool's current
stable version and setup guide; never trust a version number from memory.

| Need | Default | Why |
|---|---|---|
| Language | TypeScript, `strict` on | One language for app, web and backend; type errors caught before users see them; Claude writes it well |
| Phone app (Android, iPhone) | Expo (React Native) with Expo Router | One codebase for both stores; cloud builds (EAS Build) so no Mac is needed for iPhone builds; over-the-air fixes for JavaScript changes (EAS Update) |
| Web app | Next.js (App Router) | The most used React web framework; server rendering for pages Google should find |
| Styling | The framework's standard (Tailwind on web, StyleSheet or NativeWind on Expo) with one token file for colours, spacing and type | One source for the look; app-ui-taste checks against it |
| Backend, database, sign-in, file storage | Supabase (Postgres) in the Mumbai region (ap-south-1) | Real SQL database; sign-in built in; row level security puts the "who can read what" rules in the database itself; Mumbai keeps data and latency in India |
| Sign-in | Google sign-in, plus phone OTP if the users expect it | No passwords to store. Phone OTP in India means an SMS provider with DLT registration (TRAI rule for business SMS): plan a week or two for it |
| Payments (real goods, services) | Razorpay | UPI, cards, netbanking, wallets; Indian KYC and settlement |
| Payments (digital goods inside a store app) | Google Play Billing / Apple In-App Purchase, as each store's current policy requires | Stores reject apps that sell digital content some other way; check the policy before designing pricing |
| Push notifications | Expo Notifications (FCM on Android, APNs on iPhone) | One API for both |
| Crash and error reports | Sentry | Shows the exact line and device behind a crash |
| Product analytics | PostHog (or Firebase Analytics if the app already uses Firebase) | Events, funnels and retention; measures the spec's success numbers |
| Email | Resend (or the backend's built-in auth emails for sign-in only) | Simple API, good deliverability |
| Unit and component tests | Vitest on web, Jest with React Native Testing Library on Expo | Each framework's standard runner |
| End-to-end tests | Playwright (web), Maestro (phone) | Real taps on real screens, readable test files |
| Lint and format | Whatever the official template ships (Vite's react-ts template uses oxlint in 2026); otherwise ESLint + Prettier, or Biome | Same style everywhere, many bugs caught early; fighting the template's choice costs time for nothing |
| Hosting (web) | Vercel | Made by the Next.js team; preview link for every branch |
| Code hosting and CI | GitHub + GitHub Actions | Repo, checks and reviews in one place |

Free tiers are enough for building and early users. Before launch, check
each service's current pricing page and estimate the monthly bill at 1,000
and 10,000 users **in code** (a small script, not mental maths). Put the
table in the decision record for "hosting and costs".

## 2. When to leave the defaults

Only for a reason the spec gives. Typical ones:

| Spec says | Change |
|---|---|
| Web only, no phone features | Next.js only; no Expo. Make it an installable PWA if users return often |
| Phone only, very heavy graphics, AR or games | Consider a game engine or native code; ask the founder, it changes cost a lot |
| Must work fully offline with sync | Keep Expo, add a local database with sync (look up the current options); budget extra weeks |
| Founder already pays for Firebase, or a teammate knows it | Firebase instead of Supabase (Firestore security rules play the role of row level security) |
| Business users, admin-heavy | Next.js web app first; phone app later if needed |
| Founder has a strong preference (Flutter, native) | Follow it, write the trade-off in the decision record |

Never add a service "because we might need it". Each one is a bill, a
login, a dashboard and a thing that can break.

## 3. Decision records

Each choice that would be expensive to change later (framework, backend,
sign-in, payments, hosting, analytics) gets a file in `docs/decisions/`
named `NNNN-short-title.md` from `decision-template.md`: the context, the
options considered, the choice, why, and what would make us change it.
Save the one-line choice to the memory sheet too
(`--type decision --topic "app stack"`).

## 4. Set up the repo (in this order)

1. **Create** the project with the framework's official command at its
   current stable version (look it up). TypeScript template.
2. **Strict types:** `"strict": true` in `tsconfig.json`, and a
   `typecheck` script (`tsc --noEmit`, or `tsc -b` when the template
   uses project references, as Vite's does).
3. **Lint and format:** keep the template's linter if it has one, add a
   formatter if it doesn't, and scripts `lint` and `format:check` (and
   `format` to fix). Fix the starter project until both pass with zero
   warnings.
4. **Tests:** add the runner and one real test (a tiny pure function is
   fine) so `test` passes. Add `test` to `package.json` scripts, running
   once and exiting (`vitest run`, `jest`), never in watch mode: some
   templates (Expo's) ship `jest --watchAll`, which hangs CI.
5. **Folders:** keep the framework's conventions. Add `src/lib/` for
   plain logic (no UI, easy to test), `src/components/` for shared UI,
   `docs/` for the spec and decisions.
6. **Design tokens:** one file with colours (light and dark), spacing,
   font sizes, radii. Every screen uses it; no stray hex codes.
7. **Secrets:** `.env.example` lists every variable with a fake value and
   a comment; `.env` and `.env.*` (except `.env.example`) go in
   `.gitignore` before the first secret exists. Public keys that ship
   inside the app (for example a Supabase anon key, protected by row level
   security) are labelled as public; server secrets (service role keys,
   payment secrets, webhook secrets) never go in app code or a public
   env prefix like `EXPO_PUBLIC_` or `NEXT_PUBLIC_`.
8. **CI:** copy `ci-template.yml` to `.github/workflows/ci.yml` and adjust
   the commands. It runs install, lint, typecheck and tests on every push
   and pull request.
9. **README:** how to install, run, test and build, in five commands or
   fewer. Plus where the spec and decisions live.
10. **CLAUDE.md:** the stack in five lines, the check command
    (`python3 .claude/skills/app-build/scripts/preflight.py`), and any
    rule a new session must know.
11. **Run the app** once (web: open it in the browser; phone: Expo on a
    device or emulator, or the web build) and the full checks. Commit:
    "Project setup".

## 5. Check before handing over

- `preflight.py` passes (lint, typecheck, tests, build).
- No secret in the repo: run the app-security skill's
  `scan_secrets.py`.
- Every service in use has a decision record and an entry in
  `.env.example`.
- The README commands work from a fresh clone.
- careful-mode's three reviews on the decisions (cost, lock-in, privacy).

## 6. Output format

```
Stack (decisions in docs/decisions/):
- App: <framework, version>   - Backend: <...>   - Sign-in: <...>
- Payments: <...>   - Analytics/crashes: <...>   - Hosting: <...>
Monthly cost estimate: <at 1k users> / <at 10k users> (script: <path>)
Repo: set up, preflight passing, CI added
Needs the founder: <accounts to create, keys to add as secrets, DLT, store accounts>
```

Accounts and keys are the founder's to create (they own them). List
exactly which, where, and which environment variable each key goes in.
Never ask for a secret in chat: they add it as an environment secret.

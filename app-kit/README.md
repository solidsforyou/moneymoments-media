# app-kit

Starter kit for the founder's new app, pulled out of moneymoments-media (28 Oct 2026),
plus a set of app-building skills written for it. Copy everything in this folder
(including the hidden `.claude/`) to the root of the new app's repo. Nothing here is
specific to Unicorn Ka Hisab.

## How it fits together

Master routes every app task to the **App head** (`.claude/skills/master/heads/app.md`),
which runs the app skills in this order and calls the general skills where they help:

```
idea -> app-spec -> app-stack -> app-ui-taste (direction) -> app-build (story by story,
        with app-testing, app-ui-taste, app-security) -> app-release -> watch and repeat
```

## App-building skills (new, written for this app)

| Skill | What it does | Tools inside |
|---|---|---|
| app-spec | Idea to a one-page spec: user, core flow, Must/Later/Never, stories with acceptance checks, screens, data, success numbers | `spec-template.md` |
| app-stack | Picks the stack (defaults: TypeScript, Expo, Next.js, Supabase in Mumbai, Razorpay, Sentry, PostHog), records decisions, sets up the repo | `decision-template.md`, `ci-template.yml` |
| app-build | The build loop, code rules, Indian phone and network realities, debugging, definition of done | `scripts/preflight.py`: runs lint, types, tests, build, leftovers and secret scan in one go |
| app-ui-taste | Design direction and tokens; 100-point screen review with hard caps from measurements | `scripts/capture_screens.cjs` (phone screenshots + audit of tap targets, contrast, text size, overflow, labels); `scripts/score_ui.py` |
| app-testing | Which tests at which level, reliability rules, must-have tests, release test pass, bug reports | `test-plan-template.md` |
| app-security | Security checklist, DPDP Act, store privacy forms, account deletion, leaked-secret playbook | `scripts/scan_secrets.py`; `privacy-policy-outline.md` |
| app-release | Store accounts and waits (Play's 12 testers / 14 days), versions, Play and App Store forms, rollout, crash watch, rollback | `scripts/check_listing.py`, `scripts/check_assets.py`, `listing-template.json` |

Store rules and dates in these skills were checked against official pages in October
2026; app-release lists the pages to re-check before a first submission.

## General skills (from SOLIDS FOR YOU, MIT)

| Skill | What it does for the app |
|---|---|
| master | Sends each task to the right head; now has the App head. |
| careful-mode | Three-pass check for anything that touches money, user data, production or launches. |
| economy-mode | Hands bulk work to cheaper helpers and runs the memory sheet (`scripts/memory.py`). |
| competitor-research | Sourced research on competing apps, their pricing and their reviews. |
| harsh-buyer-review | Brutal user's-eye feedback on the idea, store listing, onboarding and pricing. |
| humanizer | Makes app copy, store listings, onboarding text and emails sound like the founder. |
| social-media | Launch posts, content calendar and growth. |
| ai-visuals | App icon, store screenshots and promo images. |

Left out because they're video-specific: motion-design-taste, audio-review and transcriber.
Copy them over from moneymoments-media `.claude/skills/` if the app ever works with video or audio.

## What the scripts need

- Python 3.10+ for every `.py` script; Pillow for `check_assets.py`; pytest to run the tests.
- Node with Playwright for `capture_screens.cjs` (already installed in Claude cloud sessions;
  elsewhere `npm i -D playwright` and `npx playwright install chromium`).
- Each script prints its usage with `--help`.

Tests for the scripts (run from the repo root):

```
python3 -m pytest -q .claude/skills/app-security/scripts .claude/skills/app-release/scripts
```

`preflight.py`, `capture_screens.cjs` and `score_ui.py` were tried on a real Vite +
React + TypeScript project (lint, types, tests, build, screen audit) before shipping.

## `memory/memory.csv`

A fresh memory sheet with only the founder rules that apply to any project: SOLIDS FOR
YOU tools only, check memory before asking, and read every message and attachment in full.
Add app decisions to it with
`python3 .claude/skills/economy-mode/scripts/memory.py --file memory/memory.csv add ...`.

## `reference/`

`sfy_instagram/` plus its tests: a small working example of OAuth login, long-lived token
caching and refresh, an API client, a CLI and mocked tests. Use it as a pattern if the
app needs Instagram or another OAuth API. It's not app code.

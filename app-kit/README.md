# app-kit

Starter kit for the founder's new app, pulled out of moneymoments-media (28 Oct 2026),
plus a set of app-building skills written for it. Copy everything in this folder
(including the hidden `.claude/` and `.githooks/` folders) to the root of the new app's repo. Nothing here is
specific to Unicorn Ka Hisab.

## How it fits together

Master routes every app task to the **App head** (`.claude/skills/master/heads/app.md`),
which runs the app skills in this order and calls the general skills where they help:

```
idea -> app-spec -> app-stack -> app-ui-taste (direction) -> app-build (story by story,
        with app-testing, app-ui-taste, app-security and the domain skills app-social,
        app-crypto-trading, app-news) -> app-release -> watch and repeat
              ^ the auditor audits the output of every step, always ^
```

## The auditor (always on)

| Part | What it does |
|---|---|
| `.claude/skills/auditor/` | The method: what gets audited (everything: code, copy, designs, numbers, research, decisions, releases), three levels, the universal checklist, domain packs, verdict rules, weekly sweeps, auditing the auditor |
| `.claude/agents/auditor.md` | The auditor as a separate agent with a fresh context, so it never grades its own work; it reports and never fixes |
| `scripts/audit.py` | The ledger (`audit/ledger.csv` + `audit/reports/`): records every verdict, lists unaudited commits and open FAILs |
| `.claude/settings.json` | Hooks: a session can't end while files are uncommitted, commits are unaudited or a FAIL is open; common forms of `git push` and the GitHub write tools are blocked until it's clean; if the audit script breaks, pushes are blocked. Answers, designs and research that never become commits are audited by rule, not by hook |
| `.githooks/pre-push` | git's own pre-push hook (switched on by `audit.py init`): refuses any push that would send an unaudited commit (checking exactly the commits being pushed, on any branch), however the command was typed |
| `preflight.py --push` | Fails on unaudited work too |

First session in the app repo: `python3 .claude/skills/auditor/scripts/audit.py init`.

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
| app-social | The social platform: core loop, cold start, data model, feeds, follows, reactions, comments, DMs, notifications, creators, trust and safety, platform law, metrics | `scripts/scan_scams.py`: scores comments and DMs for scams (fake support, seed-phrase phishing, signals groups, lookalike exchanges); the spec for the app's own filter |
| app-crypto-trading | Trading through a licensed partner: who does what, choosing the partner, KYC, quotes, the order state machine, money security, per-country rules, where social meets trading, reconciliation | `scripts/order_math.py`: exact quantity, fees, tax and totals with the partner's rounding |
| app-news | Verified news: creator verification, the fact-check pipeline, reviewer checklist, labels, corrections and strikes, breaking news, news law | `scripts/check_sources.py`: claim-by-claim source rules; `sources-template.json`, `editorial-standards.md` |

Store rules and dates in these skills were checked against official pages in October
2026; app-release lists the pages to re-check before a first submission. After the v1
brief arrived, the skills gained what this app needs: crypto trading through a licensed
partner (Apple 3.1.5 and 5.1.1(ix), Play's crypto policy), "invest" promotion rules (ASCI
in India, the FCA in the UK), user-video moderation (Apple 1.2), video hosting and
streaming, and checks for video feeds and trading screens.

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
| transcriber | Subtitles and transcripts for the in-house team's videos (every video needs English subtitles). |
| motion-design-taste | Reviews the in-house videos and app promo reels. |
| audio-review | Checks the sound of those videos. |

The three video skills were added back on 28 Oct once the brief (`brief.md`) made the app
video-first.

## What the scripts need

- Python 3.10+ for every `.py` script; Pillow for `check_assets.py`; pytest to run the tests.
- Node with Playwright for `capture_screens.cjs` (already installed in Claude cloud sessions;
  elsewhere `npm i -D playwright` and `npx playwright install chromium`).
- Each script prints its usage with `--help`.

Tests for the scripts (run from the repo root):

```
python3 -m pytest -q .claude/skills/*/scripts
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

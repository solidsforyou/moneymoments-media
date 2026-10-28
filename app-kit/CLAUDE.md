# Chartroom

New app, built from scratch: a crypto trading app with a finance social network inside
(LinkedIn-serious posts, Instagram-style reels), India only, Android first. Full brief in `brief.md`. The
app-spec skill turns `brief.md` into `docs/spec.md` before any building.

## SOLIDS FOR YOU Master is on

The SOLIDS FOR YOU skills are copied into `.claude/skills/` (from
github.com/Founderwithabs/SOLIDSFORYOU, MIT, see `.claude/skills/SOLIDSFORYOU-LICENSE.md`),
next to this repo's own app skills (`app-*`).

- Before the first task in a session, read `.claude/skills/master/toolbox.md` (once) and
  route every task as it says. App work goes to the App head
  (`.claude/skills/master/heads/app.md`).
- Humanizer is always on for anything users will read (app copy, store listing, emails).
- careful-mode for anything touching payments, user data, auth or production.
- **The auditor is always on.** Every task's work is audited before it's delivered, committed
  as done, pushed or released (`.claude/skills/auditor/`, agent `.claude/agents/auditor.md`),
  and recorded in `audit/ledger.csv`. First session in the app repo: run
  `python3 .claude/skills/auditor/scripts/audit.py init`. The hooks in `.claude/settings.json`
  block finishing and pushing while anything is unaudited; never disable them.

## Working rules

- The spec (`docs/spec.md`) is the source of truth; decisions live in `docs/decisions/`.
- Before every commit: `python3 .claude/skills/app-build/scripts/preflight.py`. Exit 0 or
  don't commit. Before every push: the same with `--push`.
- Never commit secrets; server secrets never go behind `EXPO_PUBLIC_` / `NEXT_PUBLIC_`.
- The founder approves every store upload, submission and rollout step.

## Memory

`memory/memory.csv` holds the founder's facts, decisions and preferences. Before asking
the founder anything, run
`python3 .claude/skills/economy-mode/scripts/memory.py --file memory/memory.csv pinned`
(and `search "key words"` as needed). Save new decisions with its `add` command.

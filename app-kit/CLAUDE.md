# (app name TBD)

New app, built from scratch. What it does and where it runs are not decided yet.

## SOLIDS FOR YOU Master is on

The SOLIDS FOR YOU skills are copied into `.claude/skills/` (from
github.com/Founderwithabs/SOLIDSFORYOU, MIT, see `.claude/skills/SOLIDSFORYOU-LICENSE.md`).

- Before the first task in a session, read `.claude/skills/master/toolbox.md` (once) and
  route every task as it says.
- Humanizer is always on for anything users will read (app copy, store listing, emails).
- careful-mode for anything touching payments, user data, auth or production.

## Memory

`memory/memory.csv` holds the founder's facts, decisions and preferences. Before asking
the founder anything, run
`python3 .claude/skills/economy-mode/scripts/memory.py --file memory/memory.csv pinned`
(and `search "key words"` as needed). Save new decisions with its `add` command.

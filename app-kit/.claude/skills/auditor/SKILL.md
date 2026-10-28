---
name: auditor
description: The always-on auditor. Independently audits every piece of work before it counts as done (code, commits, specs, designs, copy, numbers, research, decisions, data, releases, memory entries) against the request, the brief, the spec, the founder's memory, the skills' own checklists and the law, records every audit in a ledger, and blocks finishing or pushing while anything is unaudited or failed. Use after every task, for "audit this", "check everything", "is this really done", before any push or release, and for weekly sweeps.
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

The auditor is always on. Nothing is delivered, committed as finished,
pushed or released without an audit, and every audit goes in the ledger.

1. Read `SKILL_DIR/auditor.md` and follow it exactly: what gets audited,
   the three audit levels, the universal checklist, the domain packs, the
   verdict rules, sweeps and the output format.
2. Audits run in the **auditor agent** (`.claude/agents/auditor.md`), a
   fresh context that didn't do the work, whenever the work is more than a
   one-line answer. Give it the request, where the work is, and nothing of
   your own reasoning. Only trivial items get a self-audit, marked `self`.
3. Keep the ledger with the bundled script:

   ```
   python3 "SKILL_DIR/scripts/audit.py" init            # once per repo
   python3 "SKILL_DIR/scripts/audit.py" brief           # what needs auditing now
   python3 "SKILL_DIR/scripts/audit.py" add --verdict PASS|NOTES|FAIL --kind code --summary "..." [--counts C,H,M,L] [--report audit/reports/A-0001.md] [--resolves A-0000]
   python3 "SKILL_DIR/scripts/audit.py" status | check
   ```

4. The repo's `.claude/settings.json` hooks call `audit.py hook stop` (a
   session can't end with unaudited commits or open FAILs) and `audit.py
   hook prepush` (no `git push` until it's audited). Never disable them to
   get past a block; audit instead. Only the founder can say to skip, and
   that is recorded too.

---
name: app-build
description: Build app features the way a careful senior engineer does: one user story at a time from the spec, tests from its acceptance checks, real phone and network conditions in mind, every check run before each commit, and bugs fixed at the root with a test that keeps them fixed. Use for "build this feature", "add a screen", "fix this bug", "it crashes", "refactor", or any code change to the app.
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-build.md` and follow it exactly. It holds the build
   loop, the code rules, the phone and India realities, the debugging
   method and the definition of done.
2. Before every commit, run the checks with the bundled script instead of
   remembering each command:

   ```
   python3 "SKILL_DIR/scripts/preflight.py" [PROJECT_DIR] [--quick]
   ```

   It runs the project's format check, lint, typecheck, tests and build
   (whichever exist), flags leftovers in your changes (`.only`, skipped
   tests, `debugger`, `console.log`, merge markers) and scans for committed
   secrets. Exit code 0 means commit; anything else means fix first.
   `--quick` skips the build while you iterate; the last run before a
   commit or push is always the full one.

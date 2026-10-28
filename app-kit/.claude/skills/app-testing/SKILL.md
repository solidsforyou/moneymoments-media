---
name: app-testing
description: Test an app like a QA lead: turn the spec's acceptance checks into the right mix of unit, screen, database-rule and end-to-end tests, keep them fast and never flaky, run a device and network test pass before each release, and write bug reports anyone can reproduce. Use for "write tests", "test this feature", "is it ready to release", "test plan", "this test is flaky", or "report this bug".
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-testing.md` and follow it exactly. It holds what to
   test at which level, the rules that keep tests reliable, the release
   test pass and the bug report format.
2. For a release, copy `SKILL_DIR/test-plan-template.md` to
   `docs/test-plans/<version>.md` in the app repo and fill it in as you
   test. Never tick a row you didn't run.
3. Run the whole suite through app-build's `preflight.py`, so lint,
   types and secrets are checked with the tests.

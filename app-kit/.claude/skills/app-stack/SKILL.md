---
name: app-stack
description: Pick the app's tech stack (framework, backend, sign-in, payments, notifications, analytics, hosting) from the spec, record each choice and its reason as a decision record, and set up a new repo with linting, type checks, tests, CI and secrets handled from day one. Use for "which framework", "set up the project", "start the repo", "should we use X or Y", or adding a new service to the app.
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-stack.md` and follow it exactly. It holds the
   defaults, when to leave them, the setup steps and the checks.
2. Record every stack choice with `SKILL_DIR/decision-template.md` in
   `docs/decisions/` of the app's repo.
3. For CI, start from `SKILL_DIR/ci-template.yml`.
4. Versions and prices change fast: look up the current stable version
   and pricing page before you install or quote anything. Never install
   from memory.

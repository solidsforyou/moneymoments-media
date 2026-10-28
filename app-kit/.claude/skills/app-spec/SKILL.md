---
name: app-spec
description: Turn an app idea into a one-page spec Claude can build from: the user and their problem, the smallest version worth shipping (must, later, never), user stories with acceptance checks, screens, data, success numbers and risks. Use for "I have an app idea", "plan the app", "what should v1 have", "write the spec", or before any app code exists.
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-spec.md` and follow it exactly. It holds the
   interview, the scoping rules, the checks and the output format.
2. Write the spec from `SKILL_DIR/spec-template.md` into `docs/spec.md` in
   the app's repo (create `docs/` if needed). Never leave a template
   placeholder in a finished spec.
3. Search the memory sheet before asking the founder anything, and save
   every scope decision to it (see app-spec.md section 6).

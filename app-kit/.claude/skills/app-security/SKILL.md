---
name: app-security
description: Security and privacy review for an app, like an application-security engineer who also knows Indian privacy law: secrets, sign-in, access rules, payments, data on the phone, dependencies, the DPDP Act, the stores' privacy forms and account deletion. Includes a secret scanner. Use for "is this secure", "security review", "privacy policy", "data safety form", "we leaked a key", before any release, and on every change touching sign-in, payments or personal data.
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-security.md` and follow it exactly. It holds the
   review checklist, the privacy and legal section, the store forms,
   payments, and what to do when something leaks.
2. Scan for committed secrets with the bundled script (also run by
   app-build's preflight and the CI template):

   ```
   python3 "SKILL_DIR/scripts/scan_secrets.py" [REPO_DIR] [--json]
   ```

   High and medium findings fail it. A secret that was ever pushed is
   leaked: rotate it first, then remove it.
3. Draft the privacy policy from `SKILL_DIR/privacy-policy-outline.md`
   and the spec's data table. It is a draft for the founder's lawyer, not
   legal advice; say so every time.
4. Run careful-mode's three reviews on every security verdict. Never hand
   a security judgment to a cheaper helper.

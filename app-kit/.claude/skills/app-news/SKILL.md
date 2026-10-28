---
name: app-news
description: Build a verified news and finance-content platform like a standards editor and trust-and-safety lead combined: creator verification, the fact-check pipeline (AI first, then people), claim-by-claim sources, labels (news, analysis, opinion, sponsored, AI-generated), corrections and takedowns with strikes, editor picks, breaking news, defamation, copyright and digital-news law, and the trust UI viewers see. Includes a claims-and-sources checker. Use for any verification, fact-check, sources, label, correction, takedown, editorial or "how do we stay trustworthy" task.
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-news.md` and follow it. It holds the trust model,
   the pipeline and its states, the reviewer checklist, labels,
   corrections, editorial rules, the law and the output format.
2. Every video's claims and sources go through the bundled checker before
   human review (the app's own pipeline runs the same rules):

   ```
   python3 "SKILL_DIR/scripts/check_sources.py" VIDEO.json [--tiers tiers.json]
   ```

   Start the file from `SKILL_DIR/sources-template.json`. Exit code 1 sends
   it back to the creator; 0 means it can go to a human fact-checker.
3. The public standards page starts from `SKILL_DIR/editorial-standards.md`;
   run the humanizer on it and have a lawyer read it before launch.

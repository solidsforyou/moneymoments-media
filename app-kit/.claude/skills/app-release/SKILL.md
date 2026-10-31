---
name: app-release
description: Ship an app to Google Play, the App Store or the web like a release manager: versions and builds, store accounts and their waiting periods, every form the stores ask for, store listing text and images checked against the limits, staged rollout, crash watching, rollback and the first weeks after launch. Use for "publish the app", "submit to Play Store / App Store", "release a new version", "store listing", "app got rejected", or "launch".
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-release.md` and follow it exactly. It holds the
   timeline, the store checklists, the rollout and the after-launch loop.
2. Check the listing text and the images with the bundled scripts before
   anything is uploaded:

   ```
   python3 "SKILL_DIR/scripts/check_listing.py" store/listing.en-IN.json [more locales]
   python3 "SKILL_DIR/scripts/check_assets.py" store/ [--ipad]
   ```

   Start the listing from `SKILL_DIR/listing-template.json`. Exit code 0
   means no errors; read the warnings anyway.
3. Store rules change often. The dates and numbers in app-release.md were
   checked in October 2026: before each first submission, re-check the
   linked official pages and update the file if anything moved.
4. Uploading a build, submitting for review and rolling out to users are
   outward-facing and hard to undo: the founder approves each one.

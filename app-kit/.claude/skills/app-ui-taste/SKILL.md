---
name: app-ui-taste
description: Judge and improve app screens like a senior product designer: set the visual direction and design tokens before building, capture real phone-size screenshots, measure tap targets, contrast, text size and overflow, score out of 100, compare against competitor apps, list exact fixes and apply them. Use for "how does this screen look", "review the UI", "make it look better", "design the app", "compare with <app>", and before delivering any screen Claude built.
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-ui-taste.md` and follow it exactly. It holds the
   design direction step, the rubric, the comparison method, the fix loop
   and the output format.

2. Read the founder's UI taste notes before every review: they override
   the general rules when they conflict. Use `taste/ui/taste-notes.md` in
   the app's repo. If it doesn't exist yet, create it from
   `SKILL_DIR/taste-notes-template.md` the first time the founder says what
   they like or dislike.

3. Capture and measure screens with the bundled script (it uses
   Playwright, already installed in cloud sessions):

   ```
   node "SKILL_DIR/scripts/capture_screens.cjs" --url URL --out OUT_DIR \
     [--routes /,/login] [--devices android,iphone] [--dark] [--slow]
   ```

   Put OUT_DIR in a scratch or temp folder, not the app's repo. Read
   `report.md`, then look at every `sheet_<device>.png` and the
   screenshots it lists. Phone apps built with Expo run on web for this
   (`npx expo start --web`); for screens that only exist natively, use
   emulator screenshots (section 2 of the prompt).

4. Total every review in code, never by hand:

   ```
   python3 "SKILL_DIR/scripts/score_ui.py" SCORES.json --audit OUT_DIR/report.json
   ```

   It applies the audit's hard caps and gives the READY / NOT READY verdict.

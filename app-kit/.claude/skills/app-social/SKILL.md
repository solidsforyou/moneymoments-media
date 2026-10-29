---
name: app-social
description: Build the social-network side of an app like a senior social product lead: the core loop, cold start, data model, Following / editor / For-you feeds, follows, reactions, comments, shares, DMs, notifications, creator tools, trust and safety, scam defence, the laws for platforms that host user content, and the metrics that matter. Includes a scam and spam scanner for comments and DMs. Use for any feed, follow, comment, DM, notification, creator, moderation or "how do we grow the community" task.
---

The files this skill uses sit next to this SKILL.md. In Claude Code that
folder is `${CLAUDE_SKILL_DIR}`; anywhere else, use the folder this file was
loaded from. Below, `SKILL_DIR` means that folder.

1. Read `SKILL_DIR/app-social.md` and follow it. It holds the loop, the data
   model, feed design, each social feature's rules, trust and safety, the
   law, metrics and the output format.
2. Check comments, DMs, bios and captions for scams with the bundled
   scanner. It is also the reference the app's own filter is built from and
   tested against:

   ```
   python3 "SKILL_DIR/scripts/scan_scams.py" --text "message"     # one message
   python3 "SKILL_DIR/scripts/scan_scams.py" FILE.jsonl [--json]   # many: {"id":..,"text":..} per line
   ```

   Verdicts: allow, warn, hold (human review before anyone sees it), block.
   It's a cheap **first pass**, not the defence: on scams it had never seen
   it caught 19% (third audit), then 47% after general signals were added
   (measured on a partly seen set), with 0% of real comments held. The
   real defence is three layers (app-social.md section 5): this script, a
   language-model classifier on risky messages, and human moderators.
3. Works with app-build (code), app-security section 4a (rules for user
   content), app-news (verification) and app-crypto-trading (where social
   meets money).

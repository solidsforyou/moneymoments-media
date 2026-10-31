# Handover (31 Oct 2026)

Paste the prompt below into a new Claude Code session (claude.ai/code) with the repository
`solidsforyou/moneymoments-media` attached (and `solidsforyou/money-private` if you want the
songs and renders).

```
You're picking up OpenSource Everything (OSE) from a previous Claude session. I'm the
founder (Shashwat, SOLIDS FOR YOU). Work in the repo solidsforyou/moneymoments-media on the
branch claude/solidsforyou-review-1z8hof.

Before anything:
1. Read CLAUDE.md, then .claude/skills/master/toolbox.md (route tasks as it says).
2. Run: python3 .claude/skills/economy-mode/scripts/memory.py --file memory/memory.csv pinned
   These are my decisions; follow them. The most important rules:
   - Never start building until I say "go on". Talk, propose, wait.
   - Usage is tight: heavy economy mode, few helpers, no long reads of big files.
   - Humanizer on anything public. No fake numbers. No PRs unless I ask.
   - Never commit songs or song mixes to the public repo; they live in money-private.
3. Read web/README.md and HANDOVER.md (this file) for the state of things.

Where things stand:
- web/ is the site (Vite + Netlify Functions + Blobs). Launch = Arena only, OpenPrep as a
  glimpse, every other app "coming soon" with an interest button. 19 tests pass
  (cd web && npm test). It is NOT deployed yet: I connect Netlify myself (base directory
  web, branch above, env SESSION_SECRET + ADMIN_TOKEN; no Razorpay keys = Arena free).
- Arena: classes 5-12 + CAT, 4,332 original questions in 31 courses, chapter by chapter
  (NCERT order), Easy/Medium/Hard, readiness scores, parent approval for under-18s,
  leaderboards, rate limits. Question data: content/arena (README there explains
  syllabus/research/bank sheets, tools/check.py, tools/blind.py, LITE-BRIEF.md).
  `npm run build` in web/ rebuilds the app data from the CSVs.
- Thin spots: these courses have 6 questions per chapter instead of 18: class 5 maths
  and EVS, English 9/11/12, classes 11-12 maths/physics/chemistry/biology, CAT DILR/VARC.
  Some research sheets are generic (class 10 science, English 5-8, CAT QA, some 11-12).
  An independent answer check (tools/blind.py) has only been run on the first 10 courses.
- Trailers: videos/trailer/scene3.html (Arena cut, and ?cut=web for the website),
  render3.sh renders 16:9 and 9:16 with Welcome To Miami (Slowed) from 0:36.695. Renders
  and songs are in money-private (trailers/, music/, outputs/).
- Payments: Cashfree will replace Razorpay later (code is Razorpay today, off without keys).
  Data ownership (Google Sheets connect + encrypted per-user CSV) is planned, not built.
- Before inviting NGOs: a lawyer checks DPDP parental consent and the draft Terms/Privacy.

First, tell me in 5 lines what you understood and what you'd do next, then wait for "go on".
```

## What's where

| Thing | Where |
|---|---|
| Website and API | `web/` (`web/README.md`) |
| Arena questions | `content/arena/` (`sheets/` has per-class research sheets and `summary.csv`) |
| Founder's memory | `memory/memory.csv` |
| Trailers | `videos/trailer/` (renders in money-private) |
| Reels engine and week-1 reels | `videos/reels/`, `content/ocm/` |
| Songs, song mixes, rendered videos | private repo `solidsforyou/money-private` |

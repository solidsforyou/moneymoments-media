# Handover (31 Oct 2026, late evening)

Paste the prompt below into a new Claude Code session (claude.ai/code) with the repository
`solidsforyou/moneymoments-media` attached (and `solidsforyou/money-private` if you want the
songs and renders).

```
You're picking up OpenSource Everything (OSE) from a previous Claude session. I'm the
founder (Shashwat, SOLIDS FOR YOU). Work in the repo solidsforyou/moneymoments-media.
Start your own branch from claude/solidsforyou-review-1z8hof (other sessions push there);
merge back into it when the job is done.

Before anything:
1. Read CLAUDE.md, then .claude/skills/master/toolbox.md (route tasks as it says).
2. Run: python3 .claude/skills/economy-mode/scripts/memory.py --file memory/memory.csv pinned
   These are my decisions; follow them. The most important rules:
   - Never start building until I say "go on". Talk, propose, wait.
   - Usage: helpers run on Haiku, 3-4 at a time, small jobs (3-4 chapters each, then stop),
     a short card with the data pasted in, 3-line reports. Maths/science numbers and answers
     come from Python scripts. Blind-check a 20% sample. Images 600px max. Commit only after
     helpers finish. Ask me before anything costly.
   - Humanizer on anything public. No fake numbers. No PRs unless I ask.
   - Never commit songs or song mixes to the public repo; they live in money-private.
3. Read web/README.md and HANDOVER.md for the state of things.

Where things stand:
- Niche: OSE is a platform for driven people; driven people in every category should be on
  Tomorrow and use our tools to stay productive.
- web/ is the site (Vite + Netlify Functions + Blobs). Launch = Arena only, OpenPrep as a
  glimpse (with my seating-arrangement lesson video), every other app "coming soon" with a
  20 s teaser (videos/trailer/soon.html, sound effects only) and an interest button.
  19 tests pass (cd web && npm install && npm test). NOT deployed yet: I connect Netlify
  myself (base directory web, env SESSION_SECRET + ADMIN_TOKEN; no Razorpay keys = Arena
  free). Plan: launch and start test users.
- Arena: classes 5-12 + CAT, 6,300 original questions served in 31 courses (6 per band in
  every chapter), chapter by chapter (NCERT order), Easy/Medium/Hard. Question data:
  content/arena (README there; tools/check.py, tools/blind.py, TOPUP-BRIEF.md, BLIND-BRIEF.md).
  `npm run build` in web/ rebuilds the app data from the CSVs. All 31 courses blind-checked
  (20% samples; `blind.py export <name> 0.2`); 2 wrong keys found earlier and fixed.
- Site is connected to Netlify (31 Oct) on the free <name>.netlify.app address; every push
  to claude/solidsforyou-review-1z8hof deploys live. Links use the site's own address.
- Left to do (wait for my go on):
  - Some research sheets are generic (class 10 science, English 5-8, CAT QA). Reference
    only; low priority.
  - Trailers: v4 (money-private/trailers/*-v4-*-ADDICTION.mp4) use 'Addiction' at 110 BPM,
    flashes removed. Apply the founder's further notes in one render; before re-rendering
    scene3.html, turn off its #flash and swap the music (memory, 31 Oct).
- Trailers: Arena trailer in videos/trailer/scene3.html; OpenPrep's trailer comes last.
  Renders and songs are in money-private.
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
| Blind-check answers | `content/arena/check/` |
| Coming-soon teasers | `videos/trailer/soon.html?app=<k>`, renders in `web/public/media/soon-*.mp4` |
| Founder's memory | `memory/memory.csv` |
| Trailers | `videos/trailer/` (renders in money-private) |
| Reels engine and week-1 reels | `videos/reels/`, `content/ocm/` |
| Songs, song mixes, rendered videos | private repo `solidsforyou/money-private` |

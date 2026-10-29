# OpenContentMachine: 14-day plan, API plan and prep

One Meta setup, one posting service, 14 Instagram pages. Each app's content is made by its
own Claude session; one shared service schedules, posts, reads insights and plans reposts.
Posting stays manual until the founder hands over the API (decision, 29 Oct 2026); everything
below is built so the API plugs in without changes.

## 1. The pages

| Page | Reels a day (target) | What goes on it |
|---|---|---|
| OpenSource Everything | 1 | Product showcase, founder-led |
| GoodHabit | 4 | Market case study, knowledge, Indian current affairs, personal finance |
| OpenPrep | 3 | Lesson, CAT tip, career option |
| Tomorrow | 2 | Product, seamless transfer, Telegram-connected notifications, creators on Tomorrow |
| GoodHabit clips ×5 | 4 each | Cuts from GoodHabit's own videos |
| OpenPrep clips ×5 | 4 each | Cuts from OpenPrep's own lessons and videos |

Tomorrow's reels are teasers: the full video is watched in Tomorrow itself.

## 2. The ramp (from `planner.py`)

Every page starts at 1 reel a day and adds 1 more every 4 days until it hits its target.

| Days | Reels a day, all pages | Of which clips |
|---|---|---|
| 1–4 | 14 | 10 |
| 5–8 | 27 | 20 |
| 9–12 | 39 | 30 |
| 13–14 | 50 | 40 |

**14 days: 420 reels (100 originals, 320 clips).** The full calendar, with a time slot,
pillar and repost date for every reel, is `calendar-14d.csv`. Rebuild it any time:

```
python3 content/ocm/planner.py --start 2026-10-31 --days 14 --out content/ocm/calendar-14d.csv --summary
```

Change targets, pillars or the ramp in `pages.json`.

## 3. Reposts after 90 days

Every reel gets a `repost_on` date 90 days after it goes out. Before the repost, the session
that owns the page pulls the reel's insights and makes one edit, chosen by what went wrong:

| Insight | Edit |
|---|---|
| Most people left in the first 3 seconds | New hook: open on the most surprising frame or number |
| Watched through, few shares or saves | Add a reason to save: a takeaway card at the end |
| Many shares, few follows | Stronger end card pointing to the page or the app |
| Did well | Repost as-is with a fresh cover and caption, or a part 2 |

Insights come from `python -m sfy_instagram insights <media_id>`, one call per reel.

## 4. API plan

**One Meta setup.** One Meta developer app (the existing "Instagram API with Instagram
Login" setup from the root README, no Facebook Pages needed). Each of the 14 accounts is a
professional (Creator or Business) account, added as an Instagram Tester while the app is in
development, then covered by App Review when it goes Live.

**One token per page.** The client already supports this: `IG_TOKEN_FILE=tokens/<page>.json`
picks the account. Tokens live outside git (chmod 600) and refresh themselves every ~50 days.

**One posting service** (to build when posting is handed over):

1. Each app session drops finished reels into `content/<app>/out/<id>.mp4` with a
   `<id>.json` (caption, cover, page, slot), matching the calendar row.
2. The service uploads the file to public HTTPS storage. The OSE Netlify site can serve
   `/media/...` for this, or Cloudflare R2 / S3. Instagram only fetches from a public URL.
3. At the slot time it runs the container flow (create → wait for `FINISHED` → publish),
   which `publish_reel` already does, then writes the media id back into the calendar.
4. Daily: pull insights for everything posted 1, 7 and 30 days ago into
   `content/ocm/insights.csv`; flag reposts due in the next 7 days.

**Limits that matter.**
- Instagram allows up to 100 API-published posts per account per 24 hours
  (`python -m sfy_instagram limit` shows what's left). Our maximum is 4 per account per day.
- Reels must be 9:16 MP4/MOV (H.264), 3 seconds to 15 minutes. The trailers so far are 16:9:
  every reel needs a 9:16 export.
- After the 26 Oct action block, check every caption right after publishing (memory #29).

## 5. Reality check: what could break this

1. **Fourteen new accounts at once looks like a bot farm to Meta.** Making them all from one
   phone, one network and one day is the fastest way to checkpoints and blocks. Make 2–3 a day,
   each with its own email (aliases on opensourceeverything.in), a profile photo (the mascots)
   and a real bio. Use each one by hand for 3–5 days before any API posting.
2. **Identical clips on five pages get punished.** Instagram cuts reach for reposted or
   duplicate content. Each clip page needs its own cut, hook, caption and cover, never the
   same file five times.
3. **Clipping pages need source material we don't have yet.** 40 clips a day need roughly
   6–8 long videos a week to cut from. Until OpenPrep's lessons and GoodHabit's long videos
   exist, clip pages should start later (day 5 or later) or cut from the brand pages' reels.
   We only clip our own videos, never anyone else's.
4. **50 reels a day is a production line, not a schedule.** At steady state that's about 10
   originals and 40 clips daily. The render pipeline (`videos/render.cjs`) handles it, but
   each original needs a script and a check. Humanizer on every caption, every time.
5. **App Review.** Fourteen testers work in development mode. Going Live needs Meta's review
   of the `instagram_business_*` permissions: a privacy policy URL, a data-deletion URL and a
   screencast. The Netlify site should host the first two.
6. **Facts.** GoodHabit and current-affairs reels are about money and news: every number
   sourced, nothing that reads as investment advice.

## 6. Prep checklist (founder)

- [ ] New Meta account (one person, real details) and Meta developer app.
- [ ] 14 email aliases on opensourceeverything.in (e.g. `goodhabit@`, `ghclips1@`).
- [ ] Handles: check each by hand; Instagram blocks automated checks. Fill them into `pages.json`.
- [ ] Create 2–3 accounts a day; switch each to Creator; add as Instagram Tester; accept invites.
- [ ] Profile photos: the mascots (Olly, Sunny, Buddy, GoodGuy); clip pages use a variant.
- [ ] Bios and link-in-bio pointing at each app's landing page.
- [ ] Media hosting: the Netlify site's `/media` folder or an R2 bucket.
- [ ] Privacy policy and data-deletion pages live on opensourceeverything.in (for App Review).

## 7. Who does what (separate Claude sessions)

| Session | Owns | Writes to |
|---|---|---|
| OSE | OSE app and the OSE page | `apps/ose`, `content/ose` |
| Tomorrow | Tomorrow app and its page | `apps/tomorrow`, `content/tomorrow` |
| OpenPrep | OpenPrep app, its page, its 5 clip pages | `apps/openprep`, `content/openprep` |
| GoodHabit | GoodHabit app, its page, its 5 clip pages | `apps/goodhabit`, `content/goodhabit` |
| Content machine | Calendar, posting, insights, reposts | `content/ocm` |

Each session reads only its folder plus `content/ocm/calendar-*.csv`, so they never collide.
When the new GitHub account exists, each folder can become its own repository (see
`web/README.md`, "Splitting into repos").

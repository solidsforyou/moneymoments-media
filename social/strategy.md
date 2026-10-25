# Startup clipping page strategy (draft, 25 Oct 2026)

A clipping page: no original videos. Every reel is a clip cut from someone
else's long video (podcasts, interviews, talks) with permission, using the
SOLIDS FOR YOU Clipper. The Solids For You main page comes later.

## 1. Goal and metric (90 days)
An Indian startup clipping page followed by Indian Gen Z (21-30) with money
to spend. Numbers that count: views on clips (paid campaigns pay per 1,000
views) and profile visits that later go to Solids For You.

## 2. Audience
Indian, 21-30, college or early career, metros and tier-2 cities. Watches
startup podcasts in bits, never the full two hours. Wants the one line that
matters, in English or Hinglish.

## 3. Platform
Instagram Reels first. The same clips can go to YouTube Shorts where the
campaign brief allows it. One clip per platform, never the same clip on
several of our own accounts (Clipper rule 4).

## 4. Where clips come from (permission is required)
1. **Paid clipping campaigns** from Indian startup podcasts, founders and
   brands that hire clippers. They give source files and a brief, and pay
   per 1,000 views.
2. **Creators who say yes in writing.** Email or DM Indian startup podcasts
   and founders. Keep the yes in `clips/<source>/brief.md`.
3. **Not allowed:** ripping Shark Tank India, news channels or any podcast
   that hasn't said yes. That brings copyright strikes, and platforms don't
   pay for reused content.

## 5. The 3 Solids For You reels a day
No SFY footage exists yet. Options, from best to weakest:
1. Record one long talk a week about building Solids For You (phone, one
   take, 30-60 minutes) and clip it like any other source. Not a produced
   video, just talking.
2. Until then, run 9 startup clips a day and mention SFY only in the bio.
Campaign clips can't carry SFY mentions unless the brief allows it. The bio
says who runs the page, for example "By the team building @solidsforyou".
SFY product facts come only from `memory/memory.csv`; none are recorded yet.

## 6. The pipeline per source
1. Write `clips/<campaign>/brief.md` from the campaign page (rate, cap, fee,
   length, required tags and disclosure, banned edits, deadline).
2. Founder downloads the source video into the folder.
3. Transcriber: transcript with word timings (Hinglish supported).
4. Clipper `find`: candidate spans; Claude picks the 3-5 that stand alone.
5. Hook line on screen per clip, scored with Social Media's hook scorer.
6. Clipper `render`: 9:16 clip, word-by-word captions, hook, -14 LUFS.
7. Check with Motion Design Taste: first 3 seconds, ending, captions.
8. Caption per platform with the brief's required tags, through Humanizer.
9. Founder posts and submits. Claude never logs in, posts or submits.
10. Log in `social/posts.csv`; earnings computed in code from the brief.

## 7. Cadence
Start at 3 clips a day for two weeks, then 6, then 9 once the pipeline runs
without gaps. One long source usually gives 3-5 good clips, so 9 a day needs
about 2-3 sources a day.

## 8. Test first
1. Hinglish vs English hook line.
2. Blur fill vs crop framing on two-person podcasts.
3. Which source beats the account's median views.

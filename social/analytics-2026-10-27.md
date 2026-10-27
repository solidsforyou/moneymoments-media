# Analytics for 26 Oct 2026 and plan for 27 Oct (pulled 03:47 UTC / 9:17 am IST, 27 Oct)

Account, last day: 551 accounts reached, 697 views, 9 accounts engaged, 43 interactions,
0 profile link taps. Followers still 3 (0 new). Display name on the profile is still
"Startupsoftomorrow", not "Unicorn Ka Hisab".

| Reel | Format | Posted (IST) | Age | Views | Reach | Likes | Shares | Avg watch | of length |
|---|---|---|---|---|---|---|---|---|---|
| Zerodha | 30 s H | 1:00 pm | 20 h | **178** | 156 | 4 | **6** | 6.4 s | 21% |
| Physics Wallah | 30 s H | 3:00 pm | 18 h | 161 | 134 | 1 | 0 | 9.2 s | **31%** |
| Blinkit | 60 s V | 5:00 am | 28 h | 154 | 139 | 4 | 1 | 8.8 s | 15% |
| Zepto | 60 s H | 7:00 am | 26 h | 103 | 89 | 3 | **6** | 5.5 s | 9% |
| Shaadi.com | 60 s H | 6:00 am | 27 h | 45 | 42 | 3 | 0 | 4.6 s | 8% |
| boAt | 30 s H, no caption | 11:55 pm | 9 h | 30 | 25 | 0 | 0 | 3.1 s | 10% |
| Urban Company | 30 s H, no caption | 12:57 am | 8 h | 18 | 11 | 1 | 0 | 2.7 s | 9% |
| Lenskart | 30 s H, by hand, no caption | 8:49 pm | 12 h | 17 | 14 | 1 | 0 | 4.7 s | 16% |
| Meesho | 30 s H | 2:00 pm | 19 h | 4 | 3 | 1 | 0 | 13.7 s | (3 viewers) |

No saves and no comments on any reel.

## What the numbers say
1. **30 s beats 60 s.** Viewers watched 21-31% of the 30 s reels that got real reach,
   against 8-15% for the 60 s ones. Most people leave by 5-9 s whatever the length.
2. **Vertical vs horizontal is a draw so far.** Yesterday's 4x gap closed: vertical Blinkit
   (154 views) sits level with horizontal Zerodha (178) and Physics Wallah (161). One vertical
   reel isn't a test.
3. **Early numbers mislead.** Zerodha had 4 views at 2 h and 178 at 20 h. Judge a reel at 24 h.
4. **Twist hooks get shared.** The only reels with shares (6 each) open on a surprise:
   Zerodha "never raised outside money", Zepto "valued at $7B, offered $3B".
5. **Meesho got almost no distribution (4 views).** Shaadi.com and Urban Company were also low,
   and all three use the 1:58 music section. Could be chance, or Instagram limiting a section
   it matched. Worth checking in the app whether any show "audio unavailable".
6. **The late, captionless reels are weakest**, but they're also the youngest and the latest
   posts. Re-check them tonight before reading anything into it.
7. **Nobody follows.** 697 views, 0 profile link taps, 0 new followers. The reels give no
   reason to follow: no series name, no "follow for..." ending, and the name doesn't match
   the logo.

## Proposed plan for 27 Oct
- **Fewer, better:** 4 reels instead of 9, all 25-30 s.
- **Format test:** 2 vertical (1080x1920) and 2 horizontal, same template, to settle point 2.
- **Hooks:** a number or twist on screen in the first second (Zerodha/Zepto style), never a
  slow type-in (Shaadi.com).
- **Ending:** a 2 s end card, "New startup ka hisab daily. Follow @unicornkahisab".
- **Music:** use the 0:24 and 2:16 sections only until the Meesho question is answered.
- **Slots (IST):** 1 pm and 3 pm (yesterday's best) plus 7 pm and 9 pm (to test the evening
  window properly, with captions this time).
- **Every caption checked** before publishing (videos/publish_reel.py now refuses empty ones).
- **Before posting:** change the display name to Unicorn Ka Hisab; add captions to boAt,
  Urban Company and Lenskart in the app.

## Which frames hold viewers (frame review, 27 Oct)
The Instagram API gives only average watch time per reel, not a second-by-second curve
(the app's reel insights show the curve). So this compares each reel's average exit point
with what is on screen at that moment.

All six 30 s reels use the same template, with a whip cut at 3, 6, 12, 18 and 24 s that leaves
the screen nearly empty for 0.25-0.5 s. Same frames, very different results (Zerodha 6.4 s,
boAt 3.1 s), so the opening idea matters more than the template.

Frames in the reels people watched longest (Physics Wallah 9.2 s, Blinkit 8.8 s, Zerodha 6.4 s):
- **Number slam at frame 0**: one huge number, counting up, filling the screen, in an
  alarm colour when it's a loss (PW ₹1,131 Cr red).
- **Contrast pair**: a huge number then a tiny one (Blinkit ₹14,386 Cr sold, ₹37 Cr made).
- **Visual metaphor**: 100 coins, 26 paise lit up (Blinkit). Shows the maths instead of saying it.
- **Brand props**: the company's own world floating around the number (Blinkit grocery chips).
- **Before/after bars**: two bars, one label (Zerodha FY24 vs FY25).

Frames in the reels people left early (Urban Company 2.7 s, boAt 3.1 s, Shaadi.com 4.6 s):
- **Typing cursor on an empty screen** (Shaadi.com 0-1 s).
- **Abstract stat as the hook** ("103x oversubscribed"), or a number with no surprise
  (boAt ₹60 Cr profit).
- **Near-empty transition frames** (whip blur, white glow flash) at 3 s and 6 s, right where
  the weak reels lose people.

New template for 27 Oct: only number slam, contrast pair, visual metaphor, brand props and
before/after bars; hard cuts with text always on screen; no typing intros, ring captions,
glow flashes or blank whips.

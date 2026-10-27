# Overnight report, 26 Oct 2026

## Morning posts (India time)

| Time | Reel | Format | File | Status |
|---|---|---|---|---|
| 5:00 am | Blinkit | Vertical 1080x1920 | public/reels/2026-10-26-0500-blinkit.mp4 | Scheduled (container processed) |
| 6:00 am | Shaadi.com | Horizontal 1920x1080 | public/reels/2026-10-26-0600-shaadi.mp4 | Scheduled (container processed) |
| 7:00 am | Zepto | Horizontal 1920x1080 | public/reels/2026-10-26-0700-zepto.mp4 | Scheduled (container processed) |

Each reel: 60 s, your track (Blinkit 0:24, Shaadi.com 1:58, Zepto 2:16) with a 3-second
fade-in, a riser at the start and whooshes on scene changes, -14 LUFS. Captions are in
social/captions/, with sources, the line about who runs the page and 4 hashtags.

## What changed from the plan
- **Zepto's story is newer than planned.** Its IPO was paused: Forbes India (3 Aug 2026)
  reports institutional investors valued it at about $3B against its $7B private round, and
  the listing moved to Feb–May 2027. The reel tells that story with FY26 numbers.
- **Shaadi.com's recent finances aren't public**, so the reel uses its business model
  (free to join, pay to see phone numbers) and the last widely reported figures (FY22).

## Research applied
- Instagram caps hashtags at 5 per post (since Dec 2025); captions now carry search
  keywords ("business model, explained", "IPO story") and 4 hashtags each.
- India-focused guides put the best Reels window at about 6–9 pm IST; tomorrow's evening
  batch sits there.
- Horizontal reels play smaller in the Reels tab (black bars) and the grid crops to a
  square, so their headlines stay in the centre. Worth comparing views: vertical Blinkit
  vs horizontal Shaadi.com and Zepto.

## Next 6 reels (rendered, processed on Instagram, scheduled)
| Time | Reel | Music section |
|---|---|---|
| 1:00 pm | Zerodha | 0:24 |
| 2:00 pm | Meesho | 1:58 |
| 3:00 pm | Physics Wallah | 2:16 |
| 7:00 pm | Lenskart | 0:24 |
| 8:00 pm | Urban Company | 1:58 |
| 9:00 pm | boAt | 2:16 |

## Log
- 5:00 am Blinkit: published 23:31 UTC, https://www.instagram.com/reel/De7qpVhkchm/
- 6:00 am Shaadi.com: published 00:31 UTC, https://www.instagram.com/reel/De7qw_7gnwm/
- 7:00 am Zepto: published 01:32 UTC, https://www.instagram.com/reel/De7sNw8j-bt/
- 1:00 pm Zerodha (30 s): published 07:30 UTC, https://www.instagram.com/reel/De8iLZ4Dncm/
- 2:00 pm Meesho (30 s): published 08:30 UTC, https://www.instagram.com/reel/De8jmxyDQyi/
- 3:00 pm Physics Wallah (30 s): published 09:30 UTC, https://www.instagram.com/reel/De8jq00H_24/
- 7:00 pm Lenskart (30 s): NOT published. 13:43 UTC every API call (publish and plain reads) returns 400 "API access blocked" (OAuthException code 200). Meta has blocked the app or the token.
- 8:00 pm Urban Company (30 s): NOT published. 14:30 UTC, still 400 "API access blocked".
- 9:00 pm boAt (30 s): skipped the API post. The founder is posting the remaining reels by hand while the API is blocked, and an API post could double it.
- 8:49 pm Lenskart (30 s): posted by hand by the founder at 15:19 UTC, https://www.instagram.com/reel/De9llQ6SMj6/ (no caption).
- 11:55 pm boAt (30 s): published via API 18:25 UTC once the block lifted, https://www.instagram.com/reel/De8kCPXiG6X/. Went out WITHOUT a caption: the saved container had none. Paste social/captions/boat.txt in the app.
- 12:57 am (27 Oct) Urban Company (30 s): published via API 19:27 UTC, https://www.instagram.com/reel/De8j_Q4EZTe/. Also no caption (same container batch); paste social/captions/urbancompany.txt in the app.

## 27 Oct
- 1:00 pm Swiggy (30 s vertical, new style): version 3, tied to the week's news after the harsh buyer review (share fall, Instamart vs Blinkit). Container 18123431956768761 processed 05:15 UTC with caption, scheduled for 07:30 UTC. Earlier containers 18123421381768761 and 18123422467768761 are unused.
- 3:00 pm D2C market (30 s vertical, first reel with the Hisab line + coin signature): container 18123443554768761 processed with caption, scheduled for 09:30 UTC. Earlier D2C container 18123439582768761 unused.
- 1:00 pm Swiggy: paused at 07:22 UTC (founder asked for ~60 s reels); rebuilt at 60 s, new slot to be agreed.
- 3:00 pm D2C: now the 60 s visual-first version, container 18123464728768761, scheduled 09:30 UTC.
- Founder approved all ("schedule all"): Swiggy 5 pm (11:30 UTC), inflation 7 pm (13:30 UTC, container 18123466234768761), EMI tip 9 pm (15:30 UTC). Swiggy and EMI scheduled once their 60 s renders upload.
- 9:00 pm EMI tip: container 18123468157768761, scheduled 15:30 UTC.

## 27 Oct: Swiggy (60 s version)
- Rendered `public/reels/2026-10-27-1300-swiggy.mp4` (60 s), container 18123471424768761 created with caption, scheduled for 5 pm IST.
- Old Swiggy containers (18123421381768761, 18123422467768761, 18123431956768761) are not to be published.
- 3:00 pm D2C market (60 s): published 09:30 UTC, https://www.instagram.com/reel/De_WULVCUf9/. Went out WITHOUT a caption even though container 18123464728768761 was created with one: containers made with --dry-run and published later lose their caption (same as boAt and Urban Company yesterday). Paste social/captions/d2c-funding.txt in the app. The 5, 7 and 9 pm posts now create and publish in one go instead.

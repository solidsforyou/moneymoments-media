# New Instagram account: setup (draft, 25 Oct 2026)

Handles below are NOT checked for availability. Check them in the app
before deciding.

## 1. Name

| Name | Handle | Why |
|---|---|---|
| Paisa Kahan Se | @paisakahanse | Hinglish, says the promise: where the money in a startup comes from. Works as the hook line of every video. |
| Startup Gully | @startupgully | Desi and casual, broad enough for any startup story. |
| **Unicorn Ka Hisaab** (chosen) | @unicornkahisab | Strong for the numbers videos, longer to type. |

Fallbacks if the handle is taken: add `.in`, `_hq` or `daily`
(for example `.in`), never random numbers.

## 2. Account type
- **Professional account** (Creator or Business); the Instagram API only
  publishes to professional accounts. Pick Business if you will run ads
  from it later.
- Category: Digital creator, or Media/news company.
- Link it to the Meta app used by the `sfy_instagram` code (done: see
  `social/instagram-api.md`).
- API publishing has a daily post limit; check the current number in Meta's
  docs (9 a day should be well within it).

## 3. Bio (check it fits Instagram's character limit)

```
How Indian startups really make money, in 30 seconds
Every number sourced in the caption
By the team building @solidsforyou
```
Link: www.solidsforyou.com (or a link page later).
The last line is required: SFY videos on a page that hides who runs it would
be astroturfing.

## 4. Profile photo
Done: `brand/logo/ukh-icon.png` (glowing unicorn horn in amber rings).
Wordmark and stacked versions sit next to it.

## 5. Highlights
Startup Math · Decoded · Founders · Autopsy · Money Tips · SFY

## 6. Pinned reels (once posted)
1. The best Startup Math video (shows what the page is).
2. The best Brand Autopsy video (the heavy-animation style).
3. One SFY video.

## 7. Disclosure
ElevenLabs voices sound real. Meta asks for an AI label on realistic AI
audio or video in some cases; check the current rule and use the AI label
when it applies.

## 8. Production: batches of 18 (2 days)

Per 2 days: 12 startup videos + 6 SFY videos, Hinglish voice-over.

| Series | Per batch | Style |
|---|---|---|
| Startup Math | 4 | Template: numbers racing, glass cards |
| Decoded (news) | 2 | Template: headline cards, highlight word |
| Brand Autopsy | 3 | **Heavy animation** (Spotify-style reference): the brand's own UI pieces, brand-colour glow |
| 30-Second Founder | 3 | **Heavy animation** |
| SFY | 6 | Template in SFY colours; waits on SFY facts in the memory sheet |

Flow per batch:
1. Claude: topics, sourced facts, 18 Hinglish scripts (Humanizer, hook
   scored).
2. Founder: generates all 18 voice-overs in ElevenLabs in one go.
3. Claude: builds and renders each video to its voice-over, reviews
   (Motion Design Taste 85+, Audio Review), fixes.
4. Founder approves; posting by API only when the founder asks for it.

### Voice-over file rules
- One file per script, named exactly as the script ID: `UKH-01.mp3` ...
  `UKH-18.mp3`.
- MP3 at 128 kbps or more, or WAV. Voice only: no music, no effects.
- Same voice and settings for every file.
- Leave about half a second of silence at the start and end.
- Put them in one folder in Drive, or upload them here.

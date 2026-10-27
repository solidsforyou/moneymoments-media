# Asset library

Everything reusable for Unicorn ka Hisab reels, named so it can be asked for by name
("use sfy/stitching-hands", "end with signature/end-card-coin-rises"). When a reel makes
something worth reusing, add it here with a row below. All video is 30 fps, no audio,
unless noted.

## signature/ — the page's look (use in every reel)

| Name | What it is |
|---|---|
| `signature/coin-rupee.png` | The amber ₹ coin, 400x400, transparent background (thumbnails, covers, stickers) |
| `signature/end-card-coin-rises.mp4` | 2.5 s end card: the camera settles, the coin stops upright and rises under "Unicorn ka Hisab · Money, simply explained · Follow @unicornkahisab" (1080x1920) |
| `signature/coin-drop-and-first-roll.mp4` | 3 s opening: the coin drops onto the line over the hook photo on frame 0, lands, and starts rolling with the camera |
| `signature/camera-follows-coin-to-next-panel.mp4` | 1 s: the coin rolls on and the camera travels right with it into the next panel (the only "transition" a reel uses) |

**The engine is `videos/lib/hisab.js`.** A reel is one horizontal world of 1080x1920 panels;
the coin drops in on frame 0, drifts through each panel and rolls into the next while the camera
keeps it centred, so the camera never stops and nothing cuts. A new reel gives it `CUES`,
`SHAPES` (the line in each panel) and `.panel` elements; see `videos/inflation/scene.html` for
the simplest example.

## moments/ — scenes from finished reels, reusable as-is or as a reference

| Name | Shows | From |
|---|---|---|
| `moments/coins-3-of-100-lit.mp4` | 100 coins, 3.4 light up: "per ₹100, X is kept" metaphor (4 s, Swiggy wording on screen) | Swiggy reel, 2-6 s |
| `moments/d2c-funding-curve-pullback.mp4` | The line drawing a real data curve with labelled points (6 s) | D2C reel, 6-12 s |
| `moments/coin-splits-into-small-coins.mp4` | One coin breaks into many small coins on a jittery line: fragmentation (6 s) | D2C reel, 12-18 s |
| `moments/line-flatlines-new-ideas.mp4` | The line goes flat with a faint blip: stagnation (4 s) | D2C reel, 18-22 s |
| `moments/line-draws-data-trend-with-points.mp4` | The line climbs a real monthly trend with labelled points; coin lands on the latest (4 s) | Inflation reel, 2-6 s |
| `moments/line-steps-up-rate-hike.mp4` | The line takes one clean step up (before/after labels); coin hops it: a rate change (6 s) | Inflation reel, 12-18 s |
| `moments/loan-line-stretches-extra-year.mp4` | The line becomes 20 yearly ticks and a red dashed extra year grows on the end (6 s) | EMI tip reel, 12-18 s |
| `moments/two-bars-on-the-line-baseline.mp4` | The line drops to become the baseline of a two-bar comparison (4 s) | EMI tip reel, 18-22 s |

These carry their reel's text, so for a new topic rebuild the moment from the scene code
and use the clip as the reference.

## sfy/ — Solids For You's own footage (positive moments only)

See `sfy/README.md`: workshop clips (label close-up, stitching hands, sewing machine,
heat press) and photos (blue tees, black joggers). Label on screen when used.

## stock/ — licensed photos already used (credits in `stock/credits.json`)

| Name | Licence | Credit line |
|---|---|---|
| `stock/biryani-copper-handi.jpg` | CC BY-SA 2.0 | Photo: "Biryani" by avlxyz on Flickr, CC BY-SA 2.0 |
| `stock/rupee-notes-pile.jpg` | CC BY 2.0 | Photo: Indian rupee notes by Monito on Flickr, CC BY 2.0 |
| `stock/vegetables-market-pile.jpg` | CC BY 2.0 | Photo: vegetables at an Indian market by BPPrice on Flickr, CC BY 2.0 |
| `stock/toy-house-and-keys.jpg` | CC BY 2.0 | Photo: toy house and keys by advokatsmart.no on Flickr, CC BY 2.0 |

New stock comes from Openverse with `videos/stock.py` (memory row 17); copy the keepers here.

## founder-photos/ — photos the founder sent (licence not confirmed)

| Name | Shows |
|---|---|
| `founder-photos/parcels-doorbell-handover.jpg` | Hands holding parcels, finger on a doorbell (1920x1024) |
| `founder-photos/parcels-stack-carrying.jpg` | Person carrying three shipping boxes (700x438) |
| `founder-photos/parcel-box-handover.jpg` | A box handed from one person to another (644x476) |

They look like stock images; post them only if the founder has the rights.

## Not stored here

- **Soundtrack:** the founder's track ("addiction" by LONOWN and Asenssia) isn't committed
  on its own in this public repo. The 30 s mix with the riser and whooshes (cuts at 3, 6, 12,
  18, 24 and 27.5 s) can be pulled from any 30 s reel:
  `ffmpeg -i public/reels/2026-10-26-1500-physicswallah-30s.mp4 -vn -c:a copy soundtrack-30s.m4a`.
- **The reference video** for the signature (Video-20093, blue line and dot) belongs to its
  maker, so it isn't stored; memory row 22 describes what was taken from it.
- **Original SFY footage** (full-length vertical .MOV) stays in Drive; trimmed moments go in `sfy/clips/`.

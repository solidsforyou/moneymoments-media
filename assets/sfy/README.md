# Solids For You footage library

Our own footage from the Solids For You workshop, ready to drop into reels without
fetching anything from Drive. Use it for positive moments only (a new brand building
real products), never as proof of a product claim: SFY product facts are still missing
from `memory/memory.csv`. When a reel uses it, say so on screen ("Footage: Solids For You")
and in the caption.

## clips/ (no text on screen, no audio)

| File | Shows | Size | Cut from |
|---|---|---|---|
| `label-closeup-solids-for-you.mp4` | The SOLIDS FOR YOU label on black joggers, slow push | 1920x1080, 0.87 s | `public/reels/sfy-fabric-30s.mp4` 12.5-13.35 s |
| `stitching-hands-black-joggers.mp4` | Hands guiding black jogger fabric under the needle | 1920x1080, 1.0 s | same reel, 8.8-9.8 s |
| `sewing-machine-joggers-waistband.mp4` | Sewing machine head stitching a jogger waistband | 1920x1080, 0.9 s | same reel, 23.1-24.0 s |
| `heat-press-label-vertical.mp4` | A worker at the heat press, label going on | 720x1280 (vertical), 2.7 s at 10 fps | frames in `videos/sfy/clip/` |

The clips are short because the source reel has text over most shots. Slow them down
(`setpts=PTS/0.3`) for background use. For a vertical reel, crop the horizontal clips
with `crop=608:1080:656:0,scale=1080:1920`.

## photos/ (2400x1800 unless noted)

| File | Shows |
|---|---|
| `blue-tee-collar-1.jpg` to `-3.jpg` | Close-ups of a royal-blue tee's collar and rib |
| `blue-tees-on-cutting-table.jpg` | Stacks of blue tees on the cutting table |
| `blue-tees-folded-stack.jpg` | A folded stack of blue tees |
| `blue-tees-pile-closeup.jpg` | A loose pile of blue tees |
| `black-joggers-drawstring-1.jpg` to `-3.jpg` | Black joggers with white drawstrings on the table |
| `sewing-machine-with-sunglasses.jpg` | A sewing machine with sunglasses on the table |

## Originals

The full-length clips (vertical .MOV, 20-110 MB each, too big for git) are in the
founder's Drive folder `1Q3kI0Qqr9yB1W7WPbjOVxVOd-n8cEe8Y`. Add more clean clips here
when a reel needs them, named by what they show.

## Added 31 Oct 2026 (founder's aesthetic references)

| File | Shows | Use |
|---|---|---|
| `clips/cutting-blue-tee-label-scissors-vertical.mp4` | Hands cutting a blue tee panel with the printed SOLIDS label, scissors, watch on wrist (vertical, 3 s; original IMG_2768.mov 4K) | Tee video, "Factory to you" |
| `photos/white-cut-panels-pattern-paper.jpg` | Cut white jogger panels on brown pattern paper, sewing tables behind | Brand Story hero / cutting |
| `photos/factory-floor-sewing-line.jpg` | Sewing line with tailors (backs, faces not clear), white cut fabric in front | "Made here. Made right." |
| `photos/white-cut-fabric-thread-cones.jpg` | Stacked white cut fabric, colour thread cones behind | Fabric / factory |
| `photos/label-heat-transfer-on-blue-tee.jpg` | SOLIDS FOR YOU heat-transfer labels on blue tee fabric, tagline "Every style starts with the essentials" | "No itchy tags" / label |
| `photos/blue-tee-ribbed-collar-closeup.jpg` | Ribbed crew collar and shoulder seam close-up | Promise / quality |
| `photos/blue-tee-shoulder-knit-closeup.jpg` | Shoulder knit texture, collar | Fabric card |
| `photos/blue-tee-knit-texture-closeup.jpg` | Knit texture with collar, office wall behind (blurred) | Fabric card |
| `photos/label-transfer-cut-scissors-small.jpg` | Still of the cutting clip, low resolution (568 px) | Reference only |
| `photos/office-desk-blue-tee-drawstrings.jpg` | Messy office desk, blue tee and drawstrings | Not for listings (cluttered) |
| `photos/office-desk-wide-window.jpg` | Wide messy office desk, blue curtains | Not for listings (cluttered) |

## Added 31 Oct 2026, set 2

| File | Shows | Use |
|---|---|---|
| `photos/black-joggers-drawstring-metal-tips-factory.jpg` | Black joggers, white drawstring with metal tips, factory table, tailor in saree (face cropped), blue tees behind | Jogger listing / Brand Story; best jogger detail shot |
| `photos/black-joggers-drawstring-factory-table.jpg` | Drawstring loop close-up, tailor blurred behind | Jogger details |
| `photos/black-joggers-drawstring-factory-table-workers.jpg` | Waistband and drawstring, two workers blurred behind (one face partly visible) | Factory moment; get the factory's OK |
| `photos/black-joggers-waistband-drawstring-flat.jpg` | Elastic waistband and drawstring, flat, white table | Jogger listing detail |
| `photos/blue-tee-printed-neck-label-hand-held.jpg` | Hand holding tee, printed neck label with "Every style starts with the essentials", dark background | "No itchy tags" / promise |
| `photos/blue-tee-neck-label-angle-1.jpg`, `-angle-2.jpg`, `-angle-3-darker.jpg` | Printed neck label (ML) and ribbed collar on a glass table | Tee listing detail, promise card |
| `photos/blue-tee-neck-label-closeup-rotated.jpg`, `-closeup-2-rotated.jpg` | Neck label close-ups, sideways (rotate before use) | Tee details |
| `photos/blue-tee-flatlay-glass-table-rotated.jpg` | Full tee flat lay on glass table, sideways (rotate before use) | Reference only (busy background) |
| `photos/blue-tee-sofa-dressed-up-fun.png` | Tee "sitting" on a sofa with sunglasses and cap, a bowl and a Monster can | Instagram only, not Amazon (third-party brand visible) |

## Cropped (no people), 31 Oct 2026

Use these instead of the originals anywhere public: `photos/black-joggers-drawstring-metal-tips-factory-cropped.jpg`,
`photos/black-joggers-drawstring-factory-table-workers-cropped.jpg`, `photos/black-joggers-drawstring-factory-table-cropped.jpg`,
`photos/factory-floor-sewing-line-cropped.jpg`. Founder rule: factory workers are never shown.

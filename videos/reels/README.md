# Reels engine

9:16 reels for the OpenContentMachine pages, drawn from short scripts.

- `data/scripts.js`: one entry per reel (id = calendar row id). Scene types: `hook`,
  `stat`, `chart` (real Nifty 50 closes from `data/nifty.js`), `phone` (a 3D phone with a
  real app screen from `cap/`, optionally lifting one part toward the camera), `steps`,
  `quiz`, `compare`, `end`. Each app has its own look and mascot.
- `cap/`: screens of the real web app at 3x, made by `capture-web.cjs` against `web/` run
  locally.
- Render one: `./render-one.sh <id>` → `out/<id>.mp4` (after `node cues.cjs`). Render all:
  `python3 -c "import json;print('\n'.join(json.load(open('out/cues.json'))))" | xargs -P 4 -I{} ./render-one.sh {}`
- Check frames: `node peek.cjs <id> 1.5 5 9`.

Captions and posting times for week 1: `content/ocm/week1/posting.md`.

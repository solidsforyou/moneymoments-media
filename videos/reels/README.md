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

## Cutting to music

Put the four tracks in `music/` (names and links in `music/README.md`), then run
`./render-music.sh` (or `./render-music.sh <id> ...`). `beat.py` finds each track's tempo and
first downbeat; the engine stretches or trims every scene to a whole number of half-bars so
each cut lands on a beat; the track starts on its downbeat; sound effects sit under it at low
volume; loudness -14 LUFS. Output: `out/music/<id>.mp4`, ready to post with the music in it.

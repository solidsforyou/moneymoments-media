# OSE trailer

Apple-launch-style trailer, 44 s, 16:9, cut to "Welcome To Miami (Slowed)" from 0:36.7
(110 BPM; breakdown at beat 32, drop at beat 40).

- `capture.cjs` captures the preview's screens at 3x phone resolution plus the boxes of every
  detail the camera uses. `names.py` (in ../explainer) makes the recording copy first.
- `scene2.html` (v2) is the film: a 3D phone, pieces of the screen lifting out toward the
  camera, the real 2020 Nifty crash drawn from the simulator's own data, mascots that move,
  mask-reveal type, whip cuts. `scene.html` is v1 (flat zooms), kept for reference.
- `sfx.py` synthesises the sound design from the scene's cue list (whooshes, pops, taps, a
  riser into the drop, an impact on it).
- Render at 60 fps, then blend to 30 fps for motion blur:
  `node videos/render.cjs scene2.html part.mp4 --fps 60 --width 1920 --height 1080`,
  `ffmpeg -i part.mp4 -vf "tmix=frames=2,fps=30" ...`

Outputs: `out/ose-trailer-v2-for-posting-sfx-only.mp4` has only the sound effects; post it and
add the song from Instagram's library starting at 0:36. The copy with the song mixed in is a
preview only and is not committed.

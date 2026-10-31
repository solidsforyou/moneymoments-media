# OSE explainer

A 97-second walk through OpenSource Everything, recorded from the real clickable preview
(`app-kit/design/opensource-everything-preview.html`, v19) running inside a phone frame.
Sample people, nothing live.

Chapters (seconds, from `out/chapters.json`):

| Time | Chapter | Mascot |
|---|---|---|
| 0 | The store: free, open apps for learning, money and building | Khula |
| 10.6 | One OpenID, signing up with Telegram | Khula |
| 21.1 | Tomorrow: stories, today's challenge | Kal |
| 34.5 | App IDs only when needed (Tomorrow ID before the first post) | Kal |
| 44.2 | OpenPrep: lesson, practice question | GoodGuy |
| 59.5 | GoodHabit: trading simulator on real Nifty history | Sikka |
| 75.1 | One inbox: sending a simulator card, opening a mock card | Sikka |
| 87.7 | Works with Telegram, then the end card (opensourceeverything.in) | Kal, then the crew |

## Remake it

```
python3 <wrap.py> app-kit/design/opensource-everything-preview.html /tmp/ose.html   # inline fonts, as for the tests
node videos/explainer/record.cjs /tmp/ose.html /tmp/exp       # prints chapter marks
python3 videos/explainer/sound.py bed.wav <seconds> '<marks>'
ffmpeg -ss 1.3 -i /tmp/exp/*.webm -i bed.wav -filter_complex "[1:a]loudnorm=I=-16:TP=-1.5[a]" \
  -map 0:v -map "[a]" -c:v libx264 -crf 20 -r 30 -pix_fmt yuv420p -c:a aac -shortest out/ose-explainer.mp4
```

`stage.html` holds the captions, phone frame, finger and end card. `record.cjs` taps the
real buttons, so if the preview's buttons change, update its selectors. Audio is a synth
bed at -16 LUFS with a chime per chapter; no voiceover yet.

## Beat-cut version (to "Welcome To Miami (Slowed)", 80.8 s)

`record-beat.cjs` times the whole walk-through to the song: 110 BPM, every chapter starts on
a downbeat, every tap lands on a beat, the simulator's Covid crash day hits on the drop
(58.5 s), and the phone bumps on each beat after it. `names.py` makes the recording copy
match the latest decisions (Olly, Sunny, Buddy, GoodGuy; no challenges on Tomorrow).

- `out/ose-explainer-beat-for-posting-silent.mp4`: post this, then add the song from
  Instagram's own music library, starting at the song's beginning, so the cuts line up and
  the audio is licensed.
- The copy with the song mixed in is a preview only and is not committed (the song is
  copyrighted; it came from a phone screen recording of Spotify).

```
python3 videos/explainer/names.py <wrapped-preview.html> ose-video.html
node videos/explainer/record-beat.cjs ose-video.html <dir>      # prints the song offset
ffmpeg -ss <offset> -t 80.79 -i <dir>/*.webm -i song.wav ...    # see the commit for the full line
```

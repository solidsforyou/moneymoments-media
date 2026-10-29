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

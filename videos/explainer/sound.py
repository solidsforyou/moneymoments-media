#!/usr/bin/env python3
"""Music bed for the OSE explainer: a soft pad (C, Am, F, G) with a light arpeggio and
bass, a gentle chime at each chapter, any length.

  python3 videos/explainer/sound.py out.wav 98.1 '[["store",1.5],["openid",11.9],...]'

The third argument is the chapter marks record.cjs prints (optional).
"""
import json, sys, wave
import numpy as np

SR = 44100
DUR = float(sys.argv[2])
marks = json.loads(sys.argv[3]) if len(sys.argv) > 3 else []
t = np.arange(int(SR * DUR)) / SR
out = np.zeros_like(t)

def note(f, tt):  # soft electric-piano-ish tone
    return np.sin(2 * np.pi * f * tt) + .35 * np.sin(2 * np.pi * 2 * f * tt) + .12 * np.sin(2 * np.pi * 3 * f * tt)

chords = [[261.63, 329.63, 392.00], [220.00, 261.63, 329.63], [174.61, 220.00, 261.63], [196.00, 246.94, 293.66]]
bar = 4.0
for i in range(int(DUR / bar) + 1):
    t0 = i * bar
    c = chords[i % 4]
    m = (t >= t0) & (t <= t0 + bar + .6)
    tt = t[m]
    env = np.clip((tt - t0) / .8, 0, 1) * np.clip((t0 + bar + .6 - tt) / .9, 0, 1)
    for f in c:  # pad
        out[m] += .045 * env * note(f / 2, tt) * (0.85 + .15 * np.sin(2 * np.pi * .3 * tt))
    out[m] += .05 * env * np.sin(2 * np.pi * c[0] / 4 * tt)  # bass
    for k in range(8):  # eighth-note arpeggio
        a0 = t0 + k * bar / 8
        ma = (t >= a0) & (t < a0 + .45)
        x = t[ma] - a0
        f = c[[0, 1, 2, 1][k % 4]] * (2 if k % 4 == 2 else 1)
        out[ma] += .028 * np.sin(2 * np.pi * f * x) * np.exp(-x / .12)

def chime(at):
    for f, g in [(1046.5, .12), (1568.0, .07)]:
        m = (t >= at) & (t < at + 1.4)
        x = t[m] - at
        out[m] += g * np.sin(2 * np.pi * f * x) * np.exp(-x / .35)

for name, at in marks:
    if name not in ('store', 'done'):
        chime(at)

out *= np.clip(t / 1.5, 0, 1) * np.clip((DUR - t) / 3.0, 0, 1)
out = out / np.max(np.abs(out)) * .6
pcm = (np.stack([out, out], 1) * 32767).astype(np.int16)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('wrote', sys.argv[1])

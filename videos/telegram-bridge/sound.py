#!/usr/bin/env python3
"""Soundtrack for the Telegram bridge demo: a soft pad (C, Am, F, G), small pops when a
message lands, a click on each tap, and a low thud when the bot holds a scam.

  python3 videos/telegram-bridge/sound.py out.wav
"""
import sys, wave
import numpy as np

SR, DUR = 44100, 53.0
t = np.arange(int(SR * DUR)) / SR
out = np.zeros_like(t)

def note(f):  # soft electric-piano-ish tone
    return np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 2 * f * t) + .12 * np.sin(2 * np.pi * 3 * f * t)

chords = [[261.63, 329.63, 392.00], [220.00, 261.63, 329.63], [174.61, 220.00, 261.63], [196.00, 246.94, 293.66]]
bar = 4.0
for i in range(int(DUR / bar) + 1):
    t0 = i * bar
    env = np.clip((t - t0) / .8, 0, 1) * np.clip((t0 + bar + .6 - t) / .9, 0, 1)
    env *= (t >= t0) & (t <= t0 + bar + .6)
    for f in chords[i % 4]:
        out += .045 * env * note(f / 2) * (0.85 + .15 * np.sin(2 * np.pi * .3 * t))

def blip(at, f0, f1, length=.09, gain=.35):
    m = (t >= at) & (t < at + length)
    x = t[m] - at
    f = f0 + (f1 - f0) * x / length
    out[m] += gain * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-x / (length / 3))

# message landed: [time, pitch]
for at in [6.6, 10.2, 14.7, 15.6, 18.8, 19.7, 21.8, 22.7, 24.9, 25.8, 33.4, 35.5, 36.4, 37.9, 38.8]:
    blip(at, 880, 1320)
for at in [6.0, 8.9, 27.4]:  # taps
    blip(at, 2400, 1800, .03, .25)
blip(42.6, 220, 110, .35, .5)    # the scam is held
blip(43.8, 520, 390, .12, .3)
# fade in and out, then normalise to a calm level
out *= np.clip(t / 1.5, 0, 1) * np.clip((DUR - t) / 2.5, 0, 1)
out = out / np.max(np.abs(out)) * .6
pcm = (np.stack([out, out], 1) * 32767).astype(np.int16)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('wrote', sys.argv[1])

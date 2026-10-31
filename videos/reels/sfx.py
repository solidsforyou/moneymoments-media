#!/usr/bin/env python3
"""A light sound bed for a reel: whooshes on cuts, pops on list items, a click on a quiz
answer. Reels get their music in Instagram; these sit under it.
  python3 sfx.py out/cues.json <id> out.wav
"""
import json, sys, wave
import numpy as np
SR = 44100
cues = json.load(open(sys.argv[1]))[sys.argv[2]]; dur = cues['duration'] + .3
n = int(SR * dur); out = np.zeros(n); rng = np.random.default_rng(3)
def put(at, sig):
    i = int(at * SR); sig = sig[: max(0, n - i)]; out[i:i + len(sig)] += sig
def bandnoise(m, lo, hi):
    x = rng.standard_normal(m); f = np.fft.rfft(x); fr = np.fft.rfftfreq(m, 1 / SR); f[(fr < lo) | (fr > hi)] = 0
    y = np.fft.irfft(f, m); return y / (np.max(np.abs(y)) + 1e-9)
for at, kind in cues['sfx']:
    if kind == 'whoosh': m = int(.45 * SR); t = np.linspace(0, 1, m); put(max(0, at - .25), .4 * bandnoise(m, 300, 5000) * np.sin(np.pi * t) ** 2)
    elif kind == 'pop': m = int(.09 * SR); t = np.arange(m) / SR; f = np.linspace(520, 1250, m); put(at, .35 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .03))
    elif kind == 'click': m = int(.05 * SR); t = np.arange(m) / SR; put(at, .4 * np.sin(2 * np.pi * 1800 * t) * np.exp(-t / .01))
    elif kind == 'tick': m = int(.03 * SR); t = np.arange(m) / SR; put(at, .3 * np.sin(2 * np.pi * 3200 * t) * np.exp(-t / .006))
out *= np.clip((dur - np.arange(n) / SR) / .4, 0, 1); out = out / (np.max(np.abs(out)) + 1e-9) * .5
pcm = (np.stack([out, out], 1) * 32767).astype(np.int16)
with wave.open(sys.argv[3], 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

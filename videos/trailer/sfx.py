#!/usr/bin/env python3
"""Sound design for the trailer: synthesised whooshes, pops, taps, a riser into the drop and
an impact on it, placed from the window.SFX cue list in scene2.html (beats at 110 BPM).

  python3 videos/trailer/sfx.py videos/trailer/scene2.html sfx.wav 43.96
"""
import json, re, sys, wave
import numpy as np

SR, BEAT = 44100, 60 / 110
src, out, dur = sys.argv[1], sys.argv[2], float(sys.argv[3])
cues = json.loads(re.search(r"window\.SFX = (\[.*?\]);", open(src).read()).group(1).replace("'", '"'))
n = int(SR * dur); L = np.zeros(n); R = np.zeros(n)
rng = np.random.default_rng(7)

def put(at, sig, pan=0.0):
    i = int(at * SR)
    if i >= n: return
    if i < 0: sig = sig[-i:]; i = 0
    sig = sig[: n - i]
    L[i:i + len(sig)] += sig * (1 - pan) ** .5
    R[i:i + len(sig)] += sig * (1 + pan) ** .5

def env(m, a, d):  # attack and exponential decay, seconds
    t = np.arange(m) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

def bandnoise(m, lo, hi):
    x = rng.standard_normal(m); f = np.fft.rfft(x); fr = np.fft.rfftfreq(m, 1 / SR)
    f[(fr < lo) | (fr > hi)] = 0
    y = np.fft.irfft(f, m); return y / (np.max(np.abs(y)) + 1e-9)

def sweep(m, f0, f1):
    t = np.arange(m) / SR; f = np.linspace(f0, f1, m); return np.sin(2 * np.pi * np.cumsum(f) / SR)

for k, (beat, kind) in enumerate(cues):
    at = beat * BEAT; pan = ((k * 37) % 9 - 4) / 10
    if kind == 'tick':
        m = int(.03 * SR); put(at, .35 * np.sin(2 * np.pi * 3200 * np.arange(m) / SR) * env(m, .0005, .006), pan)
    elif kind == 'pop':
        m = int(.09 * SR); put(at, .4 * sweep(m, 520, 1250) * env(m, .002, .03), pan)
    elif kind == 'click':
        m = int(.05 * SR); put(at, .5 * bandnoise(m, 1500, 7000) * env(m, .0005, .008) + .3 * np.sin(2 * np.pi * 1800 * np.arange(m) / SR) * env(m, .0005, .01), pan)
    elif kind == 'whoosh':
        m = int(.5 * SR); t = np.linspace(0, 1, m); shape = np.sin(np.pi * t) ** 2
        put(at - .3, .5 * bandnoise(m, 300, 5000) * shape, pan * 2)
    elif kind == 'rise':
        m = int(.6 * SR); t = np.linspace(0, 1, m); put(at - .6, .35 * bandnoise(m, 800, 9000) * t ** 2, pan)
    elif kind == 'riser':  # beat 32 to the drop at 40
        m = int(8 * BEAT * SR); t = np.linspace(0, 1, m)
        put(at, (.28 * bandnoise(m, 400, 10000) * t ** 3 + .12 * sweep(m, 180, 900) * t ** 2) * (t < .985), 0)
    elif kind == 'impact':
        m = int(1.6 * SR); t = np.arange(m) / SR
        boom = np.sin(2 * np.pi * np.cumsum(np.linspace(90, 38, m)) / SR) * np.exp(-t / .45)
        put(at, .9 * boom + .5 * bandnoise(m, 60, 3000) * env(m, .001, .09), 0)

mix = np.stack([L, R], 1)
mix = mix / (np.max(np.abs(mix)) + 1e-9) * .8
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('wrote', out, len(cues), 'cues')

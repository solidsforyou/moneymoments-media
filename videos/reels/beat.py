#!/usr/bin/env python3
"""Finds a track's tempo and where its beats fall, for cutting reels on the beat.
  python3 beat.py track.mp3          → prints {"bpm": .., "phase": .., "downbeat": ..}
Phase is the time of the first beat in seconds; downbeat is the first strong beat (bar start).
"""
import json, subprocess, sys
import numpy as np
SR, HOP, WIN = 22050, 512, 2048
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[1], '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
frames = np.lib.stride_tricks.sliding_window_view(x, WIN)[::HOP] * np.hanning(WIN)
spec = np.log1p(np.abs(np.fft.rfft(frames, axis=1)) * 10)
flux = np.maximum(0, np.diff(spec, axis=0)).sum(1); flux = (flux - flux.mean()) / (flux.std() + 1e-9)
fps = SR / HOP
def score(bpm, ph):
    P = 60 / bpm; idx = np.round((ph + np.arange(int((len(flux) / fps - ph) / P)) * P) * fps).astype(int)
    idx = idx[idx < len(flux)]; return flux[idx].mean()
best = (-1e9, 0, 0)
for bpm in np.arange(70, 180, .25):
    P = 60 / bpm
    for ph in np.arange(0, P, .01):
        s = score(bpm, ph)
        if s > best[0]: best = (s, bpm, ph)
_, bpm, ph = best
if bpm < 100: bpm *= 2   # phonk sits around 120 to 170; prefer the faster pulse
P = 60 / bpm
beats = ph + np.arange(int((len(flux) / fps - ph) / P)) * P
strength = [flux[np.clip(np.round((beats[k::4]) * fps).astype(int), 0, len(flux) - 1)].mean() for k in range(4)]
down = float(beats[int(np.argmax(strength))])
print(json.dumps({'bpm': round(float(bpm), 2), 'phase': round(float(ph), 3), 'downbeat': round(down, 3), 'duration': round(len(x) / SR, 2)}))

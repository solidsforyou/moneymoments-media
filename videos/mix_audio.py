#!/usr/bin/env python3
"""Builds a reel soundtrack: a music section with a fade-in, a riser over the opening,
soft whooshes just before scene changes, a fade-out, and loudness at -14 LUFS.

  python3 videos/mix_audio.py TRACK START DURATION OUT.wav --cuts 3.07,6.15,...
"""
import argparse
import subprocess
import tempfile
from pathlib import Path


def run(args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("track")
    ap.add_argument("start", type=float)
    ap.add_argument("duration", type=float)
    ap.add_argument("out")
    ap.add_argument("--cuts", default="", help="scene-change times in seconds, comma separated")
    ap.add_argument("--fade-in", type=float, default=3.0)
    a = ap.parse_args()
    cuts = [float(c) for c in a.cuts.split(",") if c.strip()]

    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        # Riser: pink noise swept upward, swelling over 1.6 s and cut off as the music arrives.
        riser = tmp / "riser.wav"
        run(["-f", "lavfi", "-i", "anoisesrc=color=pink:duration=1.9:amplitude=0.6:sample_rate=44100",
             "-af", "highpass=f=300,lowpass=f=6000,afade=t=in:d=1.5:curve=exp,afade=t=out:st=1.5:d=0.4,volume=0.35",
             "-ac", "2", str(riser)])
        # Whoosh: band-passed noise, 0.45 s, quick in and out.
        whoosh = tmp / "whoosh.wav"
        run(["-f", "lavfi", "-i", "anoisesrc=color=white:duration=0.45:amplitude=0.5:sample_rate=44100",
             "-af", "bandpass=f=1800:width_type=o:w=2,afade=t=in:d=0.25:curve=qsin,afade=t=out:st=0.25:d=0.2,volume=0.22",
             "-ac", "2", str(whoosh)])

        inputs = ["-ss", str(a.start), "-t", str(a.duration), "-i", a.track, "-i", str(riser)]
        graph = [f"[0:a]afade=t=in:d={a.fade_in}:curve=qsin,afade=t=out:st={a.duration - 1.5}:d=1.5[m]",
                 "[1:a]adelay=0|0[r]"]
        mix = ["[m]", "[r]"]
        for i, c in enumerate(cuts):
            inputs += ["-i", str(whoosh)]
            ms = max(0, int((c - 0.3) * 1000))   # land just before the cut
            graph.append(f"[{i + 2}:a]adelay={ms}|{ms}[w{i}]")
            mix.append(f"[w{i}]")
        graph.append(f"{''.join(mix)}amix=inputs={len(mix)}:normalize=0:duration=first,atrim=0:{a.duration}[out]")
        raw = tmp / "raw.wav"
        run([*inputs, "-filter_complex", ";".join(graph), "-map", "[out]", "-ar", "44100", "-ac", "2", str(raw)])
        # One fixed gain to -14 LUFS (measured), then a limiter, so the fades keep their shape.
        meter = subprocess.run(["ffmpeg", "-i", str(raw), "-af", "ebur128", "-f", "null", "-"],
                               capture_output=True, text=True).stderr
        lufs = float([l for l in meter.splitlines() if l.strip().startswith("I:")][-1].split()[1])
        gain = -14.0 - lufs
        run(["-i", str(raw), "-af", f"volume={gain:.2f}dB,alimiter=limit=0.84:level=false", a.out])
    print(f"wrote {a.out} (measured {lufs:.1f} LUFS, gain {gain:+.1f} dB)")


if __name__ == "__main__":
    main()

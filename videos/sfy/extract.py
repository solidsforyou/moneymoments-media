#!/usr/bin/env python3
"""Cuts the clips listed in edit.js into 30 fps JPEG frames for scene.html.

  python3 videos/sfy/extract.py SOURCE_DIR   (SOURCE_DIR holds the Drive clips as 3263.mov etc.)

Frames go to videos/sfy/frames/<shot>/ (not committed). Each clip is cropped to its frame's shape
around cx/cy (0 = left/top, 1 = right/bottom); collage panels get their own folders. Each shot gets 0.4 s extra for its transition out.
"""
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
TAIL = 0.4

edit = json.loads(open(os.path.join(HERE, "edit.js")).read().split("=", 1)[1])
src_dir = sys.argv[1]
beat = edit["beat"]
def cut(clip, dur, out, w, h):
    """Crops the clip to w:h around its cx/cy and writes dur seconds of 30 fps frames."""
    os.makedirs(out, exist_ok=True)
    for f in os.listdir(out):
        os.remove(os.path.join(out, f))
    ar = w / h
    crop = f"crop='min(iw,ih*{ar})':'min(ih,iw/{ar})':'(iw-ow)*{clip.get('cx', 0.5)}':'(ih-oh)*{clip.get('cy', 0.5)}'"
    vf = f"setpts=PTS/{clip['speed']},fps=30,{crop},scale={w}:{h}:flags=lanczos"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(clip["from_s"]), "-i", os.path.join(src_dir, clip["src"] + ".mov"),
                    "-vf", vf, "-frames:v", str(int(dur * 30) + 1), "-q:v", "3", os.path.join(out, "%04d.jpg")], check=True)
    return len(os.listdir(out))


for i, s in enumerate(edit["shots"]):
    dur = (s["b"] - s["a"]) * beat + TAIL + (0.2 if i == 0 else 0)
    if s.get("collage"):   # each panel gets its own frames, 1.25x its size for the slow push inside it
        for p, panel in enumerate(s["panels"]):
            w, h = panel["rect"][2:]
            n = cut(panel, dur, os.path.join(HERE, "frames", f"{i}-{p}"), int(w * 1.25) // 2 * 2, int(h * 1.25) // 2 * 2)
            print(i, p, panel["src"], n, "frames")
        continue
    print(i, s["src"], cut(s, dur, os.path.join(HERE, "frames", str(i)), 2400, 1350), "frames")

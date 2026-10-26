#!/usr/bin/env python3
"""Cuts the clips listed in edit.js into 30 fps JPEG frames for scene.html.

  python3 videos/sfy/extract.py SOURCE_DIR   (SOURCE_DIR holds the Drive clips as 3263.mov etc.)

Frames go to videos/sfy/frames/<shot>/ (not committed). Vertical clips are cropped to 16:9
around the shot's cy (0 = top, 1 = bottom). Each shot gets 0.4 s extra for its transition out.
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
for i, s in enumerate(edit["shots"]):
    dur = (s["b"] - s["a"]) * beat + TAIL + (0.2 if i == 0 else 0)
    out = os.path.join(HERE, "frames", str(i))
    os.makedirs(out, exist_ok=True)
    crop = f"crop=iw:iw*9/16:0:(ih-iw*9/16)*{s.get('cy', 0.5)}," if "cy" in s else ""
    vf = f"setpts=PTS/{s['speed']},fps=30,{crop}scale=2400:1350:flags=lanczos"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(s["from_s"]), "-i", os.path.join(src_dir, s["src"] + ".mov"),
                    "-vf", vf, "-frames:v", str(int(dur * 30) + 1), "-q:v", "3", os.path.join(out, "%04d.jpg")], check=True)
    print(i, s["src"], len(os.listdir(out)), "frames")

#!/bin/bash
# Renders one reel to out/<id>.mp4 (9:16, 30 fps, light sound bed).  ./render-one.sh <id>
set -e
cd "$(dirname "$0")"; id="$1"
node ../render.cjs "reel.html?id=$id" "out/tmp-$id.mp4" --fps 30 --width 1080 --height 1920 > "out/log-$id.txt" 2>&1
python3 sfx.py out/cues.json "$id" "out/tmp-$id.wav"
ffmpeg -v error -y -i "out/tmp-$id.mp4" -i "out/tmp-$id.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 128k -shortest -movflags +faststart "out/$id.mp4"
rm -f "out/tmp-$id.mp4" "out/tmp-$id.wav" "out/log-$id.txt"
echo "done $id"

#!/bin/bash
# cut.sh RAW_FILE START END NAME : trims a clip from the founder's iPhone original into clips/NAME.mp4
# (vertical 1080x1920, 30 fps, H.264, original sound kept). Run from shipment-day/.
set -e
ffmpeg -loglevel error -y -ss "$2" -to "$3" -i "$1" \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" \
  -c:v libx264 -preset medium -crf 24 -c:a aac -b:a 128k -movflags +faststart "clips/$4.mp4"
echo "clips/$4.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 clips/$4.mp4)s"

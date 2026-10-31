#!/bin/bash
# Type layer over footage + the founder's song (from 0.52 s) + real press thump on frame 1. Fades out at the end.
# RAW=<originals> SONG=<song.wav> W=<work dir with base.mp4 type.mov> ./final.sh OUT.mp4
set -e
ffmpeg -loglevel error -y -i "$W/base.mp4" -i "$W/type.mov" -ss 0.52 -t 33.82 -i "$SONG" -ss 6.85 -t 0.7 -i "$RAW/IMG_3269.MOV" \
 -filter_complex "[0:v][1:v]overlay=format=auto,format=yuv420p[v];[3:a]volume=1.2,afade=t=out:st=0.5:d=0.2,adelay=2180|2180[a1];\
[2:a][a1]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=in:d=0.05,afade=t=out:st=31.8:d=2.0,aresample=48000[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -t 33.82 "$1"

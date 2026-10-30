#!/bin/bash
# Type layer over footage + song (5 bars from 4.37 s, so it loops) + real press thump and needle.
# RAW=<originals> SONG=<alejandro.mp3> W=<work dir with base.mp4 type.mov> ./final.sh OUT.mp4
set -e
ffmpeg -loglevel error -y -i "$W/base.mp4" -i "$W/type.mov" -ss 4.37 -t 18.46 -i "$SONG" \
 -ss 6.85 -t 0.7 -i "$RAW/IMG_3269.MOV" -ss 3.0 -t 0.46 -i "$RAW/IMG_3263.MOV" \
 -filter_complex "[0:v][1:v]overlay=format=auto,format=yuv420p[v];\
[3:a]volume=1.5,afade=t=out:st=0.5:d=0.2[a1];[4:a]volume=0.8,adelay=4380|4380[a2];\
[2:a][a1][a2]amix=inputs=3:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=in:d=0.01,afade=t=out:st=18.43:d=0.03,aresample=48000[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -t 18.46 "$1"

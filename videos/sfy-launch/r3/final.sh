#!/bin/bash
# Composite type layer over footage and mix the song with real clip sounds.
# RAW=<originals> SONG=<alejandro.mp3> W=<work dir with base.mp4 overlay.mov> ./final.sh OUT.mp4
set -e
ffmpeg -loglevel error -y -i "$W/base.mp4" -i "$W/overlay.mov" \
 -ss 1.73 -t 28.48 -i "$SONG" \
 -ss 22.6 -t 1.25 -i "$RAW/IMG_3552.MOV" \
 -ss 3.0 -t 0.95 -i "$RAW/IMG_3263.MOV" \
 -ss 0.8 -t 0.75 -i "$RAW/IMG_3267.MOV" \
 -filter_complex "[0:v][1:v]overlay=format=auto,format=yuv420p[v];\
[3:a]volume=1.6,afade=t=out:st=1.0:d=0.2[a1];\
[4:a]volume=0.7,adelay=3330|3330,afade=t=in:st=3.33:d=0.05[a2];\
[5:a]volume=1.4,adelay=6330|6330[a3];\
[2:a]volume=1.0[s];[s][a1][a2][a3]amix=inputs=4:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=out:st=27.2:d=1.28,aresample=48000[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -t 28.48 "$1"

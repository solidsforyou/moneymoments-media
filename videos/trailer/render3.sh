#!/bin/bash
# Renders the Arena trailer (app cut) and the website cut, 16:9 and 9:16, at 60 fps in four
# parallel chunks, blends to 30 fps for motion blur, then adds sound design and the song.
#   ./render3.sh            (needs music/welcome-to-miami.wav, not committed)
set -e; cd "$(dirname "$0")"; mkdir -p out/v3; T=out/v3
SPLICE=39.266667   # frame 2356 at 60 fps, just before beat 72 where the two cuts differ
python3 sfx.py scene3.html $T/sfx.wav 43.96
for shape in L P; do
  [ $shape = L ] && S="--width 1920 --height 1080" || S="--width 1080 --height 1920"
  for r in "0 11" "11 22" "22 33" "33 44"; do set -- $r; node ../render.cjs scene3.html $T/$shape-a$1.mp4 --fps 60 $S --from $1 --to $([ $2 = 44 ] && echo 43.96 || echo $2) > /dev/null 2>&1 & done; wait
  node ../render.cjs "scene3.html?cut=web" $T/$shape-web-tail.mp4 --fps 60 $S --from $SPLICE --to 43.96 > /dev/null 2>&1
  printf "file '%s'\n" $shape-a0.mp4 $shape-a11.mp4 $shape-a22.mp4 $shape-a33.mp4 > $T/$shape-list.txt
  ffmpeg -v error -y -f concat -safe 0 -i $T/$shape-list.txt -c copy $T/$shape-arena60.mp4
  ffmpeg -v error -y -i $T/$shape-arena60.mp4 -i $T/$shape-web-tail.mp4 -filter_complex "[0:v]trim=end_frame=2356,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1[v]" -map "[v]" -c:v libx264 -crf 14 -preset fast $T/$shape-web60.mp4
  for cut in arena web; do
    ffmpeg -v error -y -i $T/$shape-$cut'60.mp4' -vf "tmix=frames=2,fps=30" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p $T/$shape-$cut-v.mp4
    ffmpeg -v error -y -i $T/$shape-$cut-v.mp4 -i $T/sfx.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/$cut-trailer-v3-$shape-sfx-only.mp4
    [ -f music/welcome-to-miami.wav ] && ffmpeg -v error -y -i $T/$shape-$cut-v.mp4 -ss 36.695 -t 43.96 -i music/welcome-to-miami.wav -i $T/sfx.wav \
      -filter_complex "[1:a]asetpts=PTS-STARTPTS,afade=t=out:st=42.4:d=1.5[m];[2:a]volume=0.35[s];[m][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5[a]" \
      -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/$cut-trailer-v3-$shape-WITH-SONG.mp4
  done
done
ls -la out/*v3* | awk '{print $5, $9}'

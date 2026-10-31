#!/bin/bash
# Re-cuts every reel to its app's phonk track (music/<app>.mp3): scenes snap to the beat,
# the track starts on its downbeat, sound effects sit under it.  ./render-music.sh [id ...]
set -e
cd "$(dirname "$0")"; mkdir -p out/music
ids="$@"; [ -z "$ids" ] && ids=$(python3 -c "import json;print(' '.join(json.load(open('out/cues.json'))))")
for app in goodhabit openprep tomorrow ose; do [ -f "music/$app.mp3" ] && python3 beat.py "music/$app.mp3" > "out/music/beat-$app.json"; done
one() {
  id="$1"; app="${id%%-*}"; [ -f "music/$app.mp3" ] || { echo "skip $id (no music/$app.mp3)"; return; }
  bpm=$(python3 -c "import json;print(json.load(open('out/music/beat-$app.json'))['bpm'])"); down=$(python3 -c "import json;print(json.load(open('out/music/beat-$app.json'))['downbeat'])")
  node cues.cjs "$bpm" "cues-$app.json" > /dev/null
  node ../render.cjs "reel.html?id=$id&bpm=$bpm" "out/music/tmp-$id.mp4" --fps 30 --width 1080 --height 1920 > /dev/null 2>&1
  python3 sfx.py "out/cues-$app.json" "$id" "out/music/tmp-$id.wav"
  d=$(python3 -c "import json;print(json.load(open('out/cues-$app.json'))['$id']['duration'])")
  ffmpeg -v error -y -i "out/music/tmp-$id.mp4" -ss "$down" -t "$d" -i "music/$app.mp3" -i "out/music/tmp-$id.wav" \
    -filter_complex "[1:a]asetpts=PTS-STARTPTS,afade=t=out:st=$(python3 -c "print(max(0,$d-1))"):d=1[m];[2:a]volume=0.35[s];[m][s]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5[a]" \
    -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "out/music/$id.mp4"
  rm -f "out/music/tmp-$id.mp4" "out/music/tmp-$id.wav"; echo "done $id"
}
export -f one
for id in $ids; do echo "$id"; done | xargs -P 4 -I{} bash -c 'one {}'

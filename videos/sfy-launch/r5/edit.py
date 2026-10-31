#!/usr/bin/env python3
"""SFY 'building a clothing brand from zero' (top-of-funnel, ends on 'coming soon'). Footage track only: kick-locked cuts,
punch/B&W/offset/flash/shake effects, slice wipes, speed ramp, teal-orange grade.
Song: the founder's track (110 BPM, beat 0.5455 s) from SONG_START; quiet dip 17-20.7 s, drop at 20.73 s (reel time).
RAW=<Drive originals> python3 videos/sfy-launch/r4/edit.py OUT.mp4"""
import os,subprocess,sys
RAW=os.environ['RAW']; C='shipment-day/clips'
SONG_START=0.52; LEN=33.82
# (end time in reel, source, src start, speed, effects, flip, zoom, cy, push)
SHOTS=[
 (2.18,'IMG_3269',6.0,1.0,'',0,1.0,.5,0),                # under the opening card (navy)
 (3.27,'IMG_3269',6.85,1.0,'flash',0,1.0,.5,0),          # press plate comes down
 (5.45,f'{C}/folding-blue-tee-hands.mp4',0.3,2.4,'',0,1.05,.45,0),  # a full tee fold (bar)
 (6.55,'IMG_3254',0.6,1.0,'',0,1.3,.6,.05),               # scissors
 (7.64,'IMG_3263',2.0,1.0,'',0,1.0,.5,.06),               # stitching joggers
 (8.73,'IMG_3265',1.5,1.0,'',0,1.0,.5,0),                 # under the blue card
 (9.82,'IMG_3265',2.2,1.0,'',0,1.0,.5,.06),               # logo sheet
 (10.91,'IMG_3267',3.9,1.0,'shake',0,1.05,.5,0),          # heat press
 (12.00,'IMG_3270',0.2,1.0,'',0,1.0,.5,.05),              # hands show the label
 (13.09,'IMG_3271',1.6,1.0,'',0,1.0,.55,.08),             # waistband label
 (14.18,'IMG_3272',1.0,1.0,'',0,1.0,.5,.05),              # drawstring
 (16.36,'IMG_3275',0.0,1.0,'',0,1.0,.5,.05),              # drawstring against the blue tees (bar)
 (18.55,'IMG_3273',6.0,0.75,'',0,1.0,.5,.05),             # quiet dip: drawstring, slow motion (bar)
 (19.64,f'{C}/stacks-blue-black-white-on-table.mp4',0.2,0.8,'',0,1.0,.5,0),  # under the black card
 (20.73,f'{C}/taping-master-box-shut.mp4',1.0,1.0,'',0,1.0,.5,0),  # box taped, into the drop
 (21.82,'IMG_3551',16.3,1.0,'flash punch',0,1.0,.45,0),   # DROP: founder holds the joggers up
 (22.36,'PHOTO:black-joggers-drawstring-3',0,1,'bw punch',0,1.0,.5,0),
 (22.91,'PHOTO:blue-tees-folded-stack',0,1,'punch',0,1.0,.5,0),
 (25.09,'IMG_3552',31.0,1.0,'slicein',1,1.12,.32,.05),    # tee on, turning (slice wipe in)
 (25.64,'PHOTO:blue-tee-collar-2',0,1,'punch',0,1.0,.5,0),
 (26.18,'IMG_3271',2.6,1.0,'bw',0,1.0,.55,0),
 (26.73,'PHOTO:blue-tees-pile-closeup',0,1,'offset',0,1.0,.5,0),
 (27.28,'PHOTO:black-joggers-drawstring-1',0,1,'punch',0,1.0,.5,0),
 (29.46,'IMG_3552',34.0,1.0,'slicein',1,1.12,.32,.05),    # founder, final look (bar)
 (LEN,'PHOTO:blue-tee-collar-1',0,1,'',0,1.0,.4,.10)]      # under the off-white end card
WIPE=0.2
def src(f): return f if '/' in f and not f.startswith('PHOTO:') else (f'assets/sfy/photos/{f[6:]}.jpg' if f.startswith('PHOTO:') else f'{RAW}/{f}.MOV')
ins=[];fl=[];start=0.0
for i,(end,f,ss,sp,fx,flip,z,cy,push) in enumerate(SHOTS):
    d=end-start; pre=WIPE if 'slicein' in fx else 0   # a slice-in shot starts WIPE early under the previous one
    need=(d+pre)*sp+0.3
    if f.startswith('PHOTO:'): ins+=['-loop','1','-framerate','30','-t',f'{d+pre+0.3:.2f}','-i',src(f)]
    else: ins+=['-ss',f'{max(0,ss-pre*sp):.3f}','-t',f'{need:.2f}','-i',src(f)]
    D=d+pre
    pu='(1+0.07*exp(-t*10))' if 'punch' in fx else '1'
    zz=f'{z}*{pu}*(1+{push}*t/{D:.3f})'
    sh="+16*sin(t*95)*exp(-t*9)" if 'shake' in fx else ""
    v=(f"[{i}:v]{'hflip,vflip,' if flip else ''}setpts=(PTS-STARTPTS)/{sp},fps=30,"
       f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,"
       f"scale=w='trunc(1080*{zz}/2)*2+40':h='trunc(1920*{zz}/2)*2+40':eval=frame,"
       f"crop=1080:1920:x='(iw-1080)*0.5{sh}':y='(ih-1920)*{cy}',setsar=1,")
    if 'bw' in fx: v+="hue=s=0,eq=contrast=1.25,"
    if 'flash' in fx: v+="eq=brightness='0.7*exp(-t*18)':eval=frame,"
    v+=f"trim=0:{D:.4f},setpts=PTS-STARTPTS,format=yuv420p"
    if 'offset' in fx:  # picture jumps sideways with a black edge for 3 frames, then snaps back
        v+=f"[o{i}];color=black:s=1080x1920:r=30:d={D:.4f}[bk{i}];[bk{i}][o{i}]overlay=x='if(lt(t,0.1),150,0)':shortest=1,format=yuv420p"
    fl.append(v+f",settb=1/30[s{i}]"); start=end
# join: hard cuts, except a vertical-slice wipe into 'slicein' shots
cur='s0'; curlen=SHOTS[0][0]; k=0
for i in range(1,len(SHOTS)):
    nxt=f's{i}'; out=f'j{i}'
    if 'slicein' in SHOTS[i][4]:
        fl.append(f'[{cur}][{nxt}]xfade=transition=vuslice:duration={WIPE}:offset={curlen-WIPE:.4f},settb=1/30[{out}]')
        curlen=SHOTS[i][0]
    else:
        fl.append(f'[{cur}][{nxt}]concat=n=2:v=1:a=0,settb=1/30[{out}]'); curlen=SHOTS[i][0]
    cur=out
grade=("eq=contrast=1.14:saturation=0.84:brightness=-0.015,"
       "colorbalance=rs=-0.07:gs=0.02:bs=0.07:rm=0.02:gm=0.0:bm=-0.02:rh=0.07:gh=0.02:bh=-0.05,"
       "curves=all='0/0 0.10/0.025 0.5/0.47 0.88/0.9 1/0.97',vignette=PI/4.2,setsar=1")
fl.append(f'[{cur}]{grade},trim=0:{LEN},setpts=PTS-STARTPTS[v]')
subprocess.run(['ffmpeg','-loglevel','error','-y',*ins,'-filter_complex',';'.join(fl),'-map','[v]',
  '-c:v','libx264','-crf','16','-preset','medium','-pix_fmt','yuv420p','-r','30',sys.argv[1]],check=True)

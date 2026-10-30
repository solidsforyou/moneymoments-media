#!/usr/bin/env python3
"""SFY 'building a clothing brand from zero, part 1' (top-of-funnel). Footage track only: kick-locked cuts,
punch/B&W/offset/flash/shake effects, slice wipes, speed ramp, teal-orange grade.
Song: Bread Beatz 'Alejandro' from SONG_START (a bar start), 5 bars = 18.46 s, so the reel loops on the downbeat.
RAW=<Drive originals> python3 videos/sfy-launch/r4/edit.py OUT.mp4"""
import os,subprocess,sys
RAW=os.environ['RAW']; C='shipment-day/clips'
SONG_START=4.37; LEN=18.46
# (end time in reel, source, src start, speed, effects, flip, zoom, cy, push)
SHOTS=[
 (0.69,'IMG_3269',6.85,1.0,'flash shake',0,1.0,.5,0),     # press slams down (hook)
 (1.60,'IMG_3270',0.2,1.0,'punch',0,1.0,.5,0),             # hands show the label
 (3.69,f'{C}/folding-blue-tee-hands.mp4',0.3,2.5,'',0,1.05,.45,0),  # HOLD 1: a full tee fold
 (4.15,'IMG_3254',0.8,1.0,'punch',0,1.3,.6,0),             # scissors
 (4.38,'IMG_3251',0.1,1.0,'bw',0,1.1,.5,0),                # needle (B&W flash)
 (4.84,'IMG_3263',3.0,1.0,'punch',0,1.0,.5,0),             # stitching
 (5.29,'IMG_3265',2.3,1.0,'slicein',0,1.0,.5,0),           # logo sheet (slice wipe in)
 (5.75,'IMG_2220',0.4,1.0,'offset',0,1.0,.5,0),            # fabric (offset frame)
 (6.55,'IMG_3267',3.4,0.4,'',0,1.05,.5,0),                 # ramp A: press, slow
 (7.38,'IMG_3267',3.72,2.5,'shake',0,1.05,.5,0),           # ramp B: press, fast into the kick
 (8.98,'IMG_3271',1.3,1.0,'',0,1.0,.55,.12),               # HOLD 2: push into the waistband label
 (9.44,'IMG_3272',1.0,1.0,'punch',0,1.0,.5,0),             # drawstring
 (9.90,'IMG_3274',11.0,1.0,'bw',0,1.0,.5,0),               # folding joggers (B&W)
 (10.36,f'{C}/stacks-blue-black-white-on-table.mp4',0.2,1.0,'offset',0,1.0,.5,0),  # three colours stacked
 (11.07,f'{C}/taping-master-box-shut.mp4',1.0,1.3,'punch',0,1.0,.5,0),  # box taped
 (12.67,'IMG_3273',6.0,0.75,'slicein',0,1.0,.5,.04),       # HOLD 3: drawstring, slow motion (slice wipe in)
 (13.86,'IMG_3551',16.3,1.0,'punch',0,1.0,.45,.03),        # founder holds the joggers up
 (14.76,'PHOTO:blue-tees-folded-stack',0,1,'',0,1.0,.5,.07),  # folded blue tees
 (LEN,'IMG_3552',31.0,1.0,'',1,1.12,.32,.06)]              # payoff: tee on, turning (end text over it)
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

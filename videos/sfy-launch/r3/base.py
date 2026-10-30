#!/usr/bin/env python3
"""Footage track for the round-3 reel: cuts, crops, speed, punch-ins, grade, press shake. No text.
RAW=<Drive originals dir> python3 videos/sfy-launch/r3/base.py OUT.mp4"""
import os,subprocess,sys
sys.path.insert(0,os.path.dirname(__file__)); from shots import *
RAW=os.environ['RAW']
ins=[];fl=[]
for i,(f,ss,sp,flip,z,cx,cy,push) in enumerate(SHOTS):
    d=CUTS[i+1]-CUTS[i]
    if f.startswith('PHOTO:'): ins+=['-loop','1','-framerate','30','-t',f'{d+0.3:.2f}','-i',f'assets/sfy/photos/{f[6:]}.jpg']
    else: ins+=['-ss',f'{ss}','-t',f'{d*sp+0.3:.2f}','-i',f if '/' in f else f'{RAW}/{f}.MOV']
    pu=f'(1+0.045*exp(-t*9))' if i>0 else '1'   # punch on every cut
    zz=f'{z}*{pu}*(1+{push}*t/{d:.3f})'
    shake="+18*sin(t*90)*exp(-t*10)" if i==6 else ""
    v=(f"[{i}:v]{'hflip,vflip,' if flip else ''}setpts=(PTS-STARTPTS)/{sp},fps=30,"
       f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,"
       f"scale=w='trunc(1080*{zz}/2)*2+2':h='trunc(1920*{zz}/2)*2+2':eval=frame,"
       f"crop=1080:1920:x='(iw-1080)*{cx}{shake}':y='(ih-1920)*{cy}',setsar=1,"
       f"trim=0:{d:.4f},setpts=PTS-STARTPTS,format=yuv420p[s{i}]")
    fl.append(v)
n=len(SHOTS)
fl.append(''.join(f'[s{i}]' for i in range(n))+f'concat=n={n}:v=1:a=0,'
          "eq=contrast=1.06:saturation=0.94:brightness=-0.01,colorbalance=rs=0.025:gs=0.005:bs=-0.03:rh=0.02:bh=-0.02,"
          "vignette=PI/5[v]")
subprocess.run(['ffmpeg','-loglevel','error','-y',*ins,'-filter_complex',';'.join(fl),'-map','[v]',
  '-c:v','libx264','-crf','16','-preset','medium','-pix_fmt','yuv420p','-r','30',sys.argv[1]],check=True)

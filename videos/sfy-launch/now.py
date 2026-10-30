#!/usr/bin/env python3
"""Solids For You 'post now' reel: fabric -> label -> a little packing -> founder tries them on, cut on the kicks of
Bread Beatz 'Alejandro' (song from 2.93 s). python3 videos/sfy-launch/now.py OUT.mp4  (RAW = Drive originals, SONG = mp3)"""
import os,subprocess,sys
RAW=os.environ['RAW'];SONG=os.environ['SONG'];C='shipment-day/clips'
F='/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf'
SONG_START=2.93
# cut points = kick times in the song minus SONG_START
CUT=[0,1.44,2.13,3.04,5.13,5.82,6.73,8.82,9.52,10.42,12.51,13.21,14.11,15.30,16.20,16.90,19.22,20.59,21.50,23.59,25.19,27.28,28.88]
END=32.6
FLIP='hflip,vflip,'  # IMG_3552 was filmed upside down
SHOT=[(f'{RAW}/IMG_3551.MOV',1.0,1,''),        # founder holds bagged joggers to camera
 (f'{RAW}/IMG_3254.MOV',0.4,1,''),             # cutting fabric
 (f'{RAW}/IMG_3251.MOV',0.0,0.8,''),           # needle on black fabric
 (f'{RAW}/IMG_3263.MOV',7.5,1,''),             # stitching joggers
 (f'{RAW}/IMG_3265.MOV',2.3,1,''),             # label sheet, logo visible
 (f'{RAW}/IMG_3267.MOV',1.0,1,''),             # heat press, close
 (f'{RAW}/IMG_3269.MOV',8.4,1.4,''),           # heat press lifts
 (f'{RAW}/IMG_3270.MOV',0.9,1,''),             # label inside the joggers
 (f'{RAW}/IMG_3271.MOV',2.4,1,''),             # label close
 (f'{RAW}/IMG_3272.MOV',0.5,1,''),             # threading the drawstring
 (f'{RAW}/IMG_3250.MOV',0.2,1,''),             # blue tees on the table
 (f'{C}/folding-blue-tee-hands.mp4',2.0,1.2,''),
 (f'{C}/box-of-blue-tees-overhead.mp4',0.0,1,''),
 (f'{C}/founder-packing-each-piece-02.mp4',2.0,1,''),
 (f'{C}/taping-master-box-shut.mp4',1.0,1.3,''),
 (f'{RAW}/IMG_3552.MOV',4.6,1,FLIP),           # opens the bag
 (f'{RAW}/IMG_3552.MOV',11.0,1,FLIP),          # pulls the tee on
 (f'{RAW}/IMG_3552.MOV',22.2,1,FLIP),
 (f'{RAW}/IMG_3552.MOV',27.0,1,FLIP),          # tee on
 (f'{RAW}/IMG_3551.MOV',5.0,1.2,''),           # unbags the joggers
 (f'{RAW}/IMG_3551.MOV',16.6,1,''),            # holds them up
 (f'{RAW}/IMG_3552.MOV',33.0,1,FLIP)]
assert len(SHOT)==len(CUT)-1
TEXT=[('Made from scratch',0.15,2.05),('Stitched in Gurugram',3.1,6.65),
 ('Our label on every piece',6.8,10.35),('320 GSM joggers',10.5,12.45),('230 GSM tees',12.55,14.05),
 ('Packed by hand',14.15,16.85),('Then the real test',16.95,19.15)]
ins=[];fl=[]
for i,(f,ss,sp,ex) in enumerate(SHOT):
    d=CUT[i+1]-CUT[i];need=d*sp+0.3
    ins+=['-ss',str(ss),'-t',f'{need:.2f}','-i',f]
    v=(f'[{i}:v]{ex}setpts=(PTS-STARTPTS)/{sp},fps=30,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,'
       f"scale=w='trunc(1080*(1.0+0.06*exp(-t*7))/2)*2':h='trunc(1920*(1.0+0.06*exp(-t*7))/2)*2':eval=frame,crop=1080:1920,setsar=1,"
       f'trim=0:{d:.3f},setpts=PTS-STARTPTS,format=yuv420p[s{i}]')
    fl.append(v)
n=len(SHOT)
fl.append(''.join(f'[s{i}]' for i in range(n))+f'concat=n={n}:v=1:a=0[cat]')
def txt(s,a,b,y=0.70,size=84):
    al=f"min(1,(t-{a})/0.12)*min(1,({b}-t)/0.12)"
    return (f"drawtext=fontfile={F}:text='{s}':fontsize={size}:fontcolor=white:alpha='{al}':shadowcolor=black@0.6:shadowx=0:shadowy=4:"
            f"x=(w-tw)/2:y=h*{y}:enable='between(t,{a},{b})'")
grade="eq=contrast=1.08:saturation=0.92,colorbalance=rs=0.02:bs=-0.02,vignette=PI/5,noise=alls=6:allf=t"
end=CUT[-1]
fl.append(f"[cat]{grade},"+','.join(txt(*t) for t in TEXT)+
          f",tpad=stop_mode=clone:stop_duration={END-end:.2f},drawbox=x=0:y=0:w=iw:h=ih:color=black@0.82:t=fill:enable='gte(t,{end})'[g]")
ins+=['-i','assets/brand/sfy-logo-white.png','-ss',str(SONG_START),'-t',str(END),'-i',SONG]
fl.append(f"[{n}:v]scale=760:-1,format=rgba[lg];[g][lg]overlay=x=(W-w)/2:y=H*0.40:enable='gte(t,{end})'[g2]")
fl.append(f"[g2]{txt('Coming soon on Amazon',end+0.35,END+1,0.55,60)}[vout]")
fl.append(f"[{n+1}:a]loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=out:st={END-1.6}:d=1.6,aresample=48000[aout]")
cmd=['ffmpeg','-loglevel','error','-y',*ins,'-filter_complex',';'.join(fl),'-map','[vout]','-map','[aout]',
     '-c:v','libx264','-crf','19','-preset','medium','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart','-t',str(END),sys.argv[1]]
subprocess.run(cmd,check=True)

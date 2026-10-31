#!/usr/bin/env python3
"""Solids For You 'factory to you' edit: beat-synced cuts, zoom punches, flashes, RGB split, grade, grain.
python3 videos/sfy-edit/build.py OUT.mp4  (expects the raw shipment-day originals in $RAW, edited V1/V2 in $ED)"""
import os,subprocess,sys
RAW=os.environ['RAW'];ED=os.environ['ED'];SONG=os.environ['SONG']
C='shipment-day/clips';S='assets/sfy/clips'
F='/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf'
# cut times on the slowed Bang Bang (song 0:14 onwards); HIT = strong kicks get flash + RGB split
CUT=[0,0.52,1.2,1.88,2.78,3.46,4.14,4.82,5.5,6.4,7.74,9.1,10.68,12.04,13.62,14.98,16.34,17.7,19.06,20.86,22.22,23.56,25.82,26.52,28.08,28.76,29.44,30.8,32.38,33.06,36.0]
HIT={0.52,6.4,7.74,9.1,10.68,13.62,14.98,16.34,20.86,22.22,23.56,25.82,28.08,29.44,30.8,32.38,33.06}
# (file, start s, speed, extra filter)
SHOT=[(f'{C}/factory-floor-wide-machines.mp4',0,1,''),(f'{S}/stitching-hands-black-joggers.mp4',0,1,''),
 (f'{S}/sewing-machine-joggers-waistband.mp4',0,0.8,''),(f'{C}/folding-blue-tee-hands.mp4',1,1.2,''),
 (f'{S}/heat-press-label-vertical.mp4',0.5,1,''),(f'{S}/label-closeup-solids-for-you.mp4',0,1,''),
 (f'{C}/factory-floor-wide-machines.mp4',1.5,1,''),(f'{S}/stitching-hands-black-joggers.mp4',0.3,0.8,''),
 (f'{C}/folding-blue-tee-hands.mp4',5,1.3,''),(f'{C}/stacks-blue-black-white-on-table.mp4',0,1,''),
 (f'{C}/white-joggers-polybag-hands-2.mp4',0,1,''),(f'{C}/printed-checklist-in-hand.mp4',0,0.9,''),
 (f'{ED}/V1.mp4',0,14,''),(f'{ED}/V1.mp4',124,14,''),(f'{ED}/V1.mp4',480,14,''),(f'{ED}/V1.mp4',612,14,''),
 (f'{C}/box-of-blue-tees-overhead.mp4',0,1,''),(f'{ED}/V2.mp4',70,14,''),(f'{C}/taping-master-box-shut.mp4',0,1.3,''),
 (f'{RAW}/IMG_3551.MOV',1,1,''),(f'{RAW}/IMG_3551.MOV',8,1.2,''),(f'{RAW}/IMG_3551.MOV',16,1,''),
 (f'{RAW}/IMG_3552.MOV',2,1.3,'hflip,vflip,'),(f'{RAW}/IMG_3552.MOV',9,1.2,'hflip,vflip,'),(f'{RAW}/IMG_3552.MOV',13,1.2,'hflip,vflip,'),
 (f'{RAW}/IMG_3552.MOV',17,1.2,'hflip,vflip,'),(f'{RAW}/IMG_3552.MOV',20.5,1,'hflip,vflip,'),(f'{RAW}/IMG_3552.MOV',26,1,'hflip,vflip,'),
 (f'{S}/label-closeup-solids-for-you.mp4',0,1.2,''),(f'{RAW}/IMG_3552.MOV',32,0.8,'hflip,vflip,')]
assert len(SHOT)==len(CUT)-1
ins=[];fl=[]
for i,(f,ss,sp,ex) in enumerate(SHOT):
    d=CUT[i+1]-CUT[i];need=d*sp+0.2
    ins+=['-ss',str(ss),'-t',f'{need:.2f}','-i',f]
    hit=CUT[i] in HIT
    z='0.16' if hit else '0.07'
    v=(f'[{i}:v]{ex}setpts=(PTS-STARTPTS)/{sp},fps=30,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,'
       f"scale=w='trunc(1080*(1+{z}*exp(-t*9))/2)*2':h='trunc(1920*(1+{z}*exp(-t*9))/2)*2':eval=frame,crop=1080:1920,setsar=1,")
    if hit: v+=(f"eq=brightness='0.55*exp(-t*22)':eval=frame,rgbashift=rh=16:bh=-16:enable='lt(t,0.14)',")
    v+=f'trim=0:{d:.3f},setpts=PTS-STARTPTS,format=yuv420p[s{i}]'
    fl.append(v)
n=len(SHOT)
fl.append(''.join(f'[s{i}]' for i in range(n))+f'concat=n={n}:v=1:a=0[cat]')
def txt(s,a,b,y=0.74,size=76):
    return (f"drawtext=fontfile={F}:text='{s}':fontsize={size}:fontcolor=white:borderw=0:shadowcolor=black@0.55:shadowx=0:shadowy=4:"
            f"x=(w-tw)/2:y=h*{y}:enable='between(t,{a},{b})*gt(mod(t*30,9),0.6+8*lt(t-{a},0.25)*lt(mod(t*30,2),1))'")
grade=("eq=contrast=1.14:saturation=0.82:gamma=0.97,colorbalance=rs=0.04:bs=-0.03:rh=0.03:bh=-0.04,"
       "curves=m='0/0.04 0.5/0.5 1/0.96',vignette=PI/4.5,noise=alls=9:allf=t,"
       "eq=brightness='-0.07*gt(random(1),0.94)':eval=frame")
fl.append(f"[cat]{grade},{txt('MADE IN OUR FACTORY',6.45,10.6)},{txt('PACKED BY HAND',13.65,19.0)},"
          f"{txt('FROM OUR HANDS',20.9,25.7)},{txt('TO YOURS',25.85,32.3)},"
          f"drawbox=x=0:y=0:w=iw:h=ih:color=black@0.55:t=fill:enable='gte(t,33.06)'[g]")
ins+=['-i','assets/brand/sfy-logo-white.png','-ss','14','-t','36','-i',SONG]
fl.append(f"[{n}:v]scale=720:-1[lg];[g][lg]overlay=x=(W-w)/2:y=H*0.42:enable='gte(t,33.06)'[g2]")
fl.append(f"[g2]drawtext=fontfile={F}:text='COMING SOON TO AMAZON':fontsize=52:fontcolor=white:x=(w-tw)/2:y=h*0.56:enable='gte(t,33.4)'[vout]")
fl.append(f"[{n+1}:a]afade=t=in:d=0.2,afade=t=out:st=34.6:d=1.4[aout]")
cmd=['ffmpeg','-loglevel','error','-y',*ins,'-filter_complex',';'.join(fl),'-map','[vout]','-map','[aout]',
     '-c:v','libx264','-crf','20','-preset','medium','-c:a','aac','-b:a','192k','-movflags','+faststart','-t','36',sys.argv[1]]
subprocess.run(cmd,check=True)

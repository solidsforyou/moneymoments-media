# Round 3 edit decision list: reel cut times (on the song's kicks, song starts at SONG_START) and shots.
SONG_START=1.73
CUTS=[0,1.20,1.66,2.64,3.33,4.24,6.33,7.02,7.93,10.02,10.72,11.62,13.71,14.41,15.31,16.50,18.10,19.01,21.10,22.70,28.48]
END_CARD=24.79
C='shipment-day/clips'
# (file, src start, speed, flip, zoom, cx, cy, push) ; push = extra zoom gained across the shot
SHOTS=[('IMG_3552',22.6,1.0,1,1.18,.5,.30,.04),   # 1 hook: tee coming down over him
 ('IMG_3254',0.0,1.0,0,1.0,.5,.5,0),          # 2 drop: scissors in fabric
 ('IMG_3254',0.6,1.0,0,1.45,.3,.62,0),         # 3 cutting, on the blades
 ('IMG_3251',0.0,0.8,0,1.1,.5,.5,0),           # 4 needle macro
 ('IMG_3263',3.0,1.0,0,1.0,.5,.5,0),           # 5 stitching joggers (landscape)
 ('IMG_3265',2.0,1.0,0,1.0,.5,.5,.12),         # 6 label sheet, logos, slow push
 ('IMG_3267',0.8,1.0,0,1.05,.5,.5,0),          # 7 heat press slam (shake)
 ('IMG_3270',0.2,1.0,0,1.0,.5,.5,0),           # 8 hands show the printed label
 ('IMG_3271',1.6,1.0,0,1.0,.5,.55,.15),        # 9 hero: label in the waistband
 ('IMG_3272',1.0,1.3,0,1.0,.5,.5,0),           # 10 drawstring
 ('IMG_3274',11.0,1.0,0,1.0,.5,.5,0),          # 11 folding joggers
 (f'{C}/folding-blue-tee-hands.mp4',3.0,1.0,0,1.0,.5,.5,.06),  # 12 folding a blue tee
 (f'{C}/stacks-blue-black-white-on-table.mp4',0.2,1.0,0,1.0,.5,.5,0),  # 13 packing: stacks
 (f'{C}/taping-master-box-shut.mp4',1.0,1.3,0,1.0,.5,.5,0),  # 14 packing: tape
 ('IMG_3551',4.5,1.5,0,1.0,.5,.5,0),           # 15 opens the jogger bag
 ('IMG_3551',16.3,1.0,0,1.0,.5,.45,.04),       # 16 joggers held up
 ('IMG_3552',3.0,1.5,1,1.12,.5,.32,0),         # 17 opens the blue tee
 ('IMG_3552',16.5,3.5,1,1.12,.5,.32,0),        # 18 pulls it on (fast), lands on tee on
 ('IMG_3552',24.2,1.0,1,1.12,.5,.32,0),        # 19 tee on, adjusting
 ('IMG_3552',31.0,1.0,1,1.12,.5,.32,.06)]      # 20 final look, under the end card
assert len(SHOTS)==len(CUTS)-1

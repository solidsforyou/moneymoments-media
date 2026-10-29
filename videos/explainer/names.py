#!/usr/bin/env python3
"""Makes the recording copy of the preview match the founder's latest decisions before the
preview itself is rebuilt: English mascot names (OSE = Olly, Tomorrow = Sunny,
OpenPrep = Buddy, GoodHabit = GoodGuy) and no challenges on Tomorrow.

  python3 videos/explainer/names.py wrapped-preview.html out.html
"""
import sys
s = open(sys.argv[1], encoding='utf-8').read()
R = [
    ("const CREW = [['khula','Khula','OpenSource Everything','opens everything up'],['kal','Kal','Tomorrow','cheers on your streak'],['guy','GoodGuy','OpenPrep','teaches, never lectures'],['sikka','Sikka','GoodHabit','minds the money']];",
     "const CREW = [['khula','Olly','OpenSource Everything','opens everything up'],['kal','Sunny','Tomorrow','says good morning'],['guy','Buddy','OpenPrep','teaches, never lectures'],['sikka','GoodGuy','GoodHabit','minds the money']];"),
    ("'GoodGuy mode'", "'Buddy mode'"),
    ("GoodGuy mode zooms into the TV for working and out to GoodGuy for tips", "Buddy mode zooms into the TV for working and out to Buddy for tips"),
    ("<b>Ask GoodGuy</b>", "<b>Ask Buddy</b>"),
    ("GoodGuy explains successive discounts", "Buddy explains successive discounts"),
    ('aria-label="GoodGuy, the mascot"', 'aria-label="Buddy, the mascot"'),
]
for a, b in R:
    if a not in s:
        sys.exit('not found: ' + a[:60])
    s = s.replace(a, b)
# Tomorrow is Instagram-style only: hide challenges, streak rings and the challenges tab
css = ('<style>.tcard,.welcome,.stb:has(.ring.chal),.tabbar [data-r=challenges],.tmw main.feed .glist{display:none!important}'
       '.tabbar .in:has([data-r=challenges]){grid-template-columns:repeat(4,minmax(0,1fr))!important}</style>')
s = s.replace('</head>', css + '</head>', 1)
open(sys.argv[2], 'w', encoding='utf-8').write(s)
print('wrote', sys.argv[2])

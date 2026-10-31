#!/usr/bin/env python3
"""Builds scene2v.html, the 9:16 (1080x1920) version of the trailer, from scene2.html:
same beats, data and animation; every element gets a portrait position. Re-run after
editing scene2.html.  python3 videos/trailer/make_portrait.py
"""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(HERE, 'scene2.html'), encoding='utf-8').read()
R = [
 ('html,body{width:1920px;height:1080px;', 'html,body{width:1080px;height:1920px;'),
 ('perspective-origin:960px 540px', 'perspective-origin:540px 960px'),
 # intro
 ("U += abs(0, 330, reveal(b, Math.floor(b), w, 'text-align:center;width:1920px', .3), 'width:1920px;color:#fff;font-size:260px;", "U += abs(0, 760, reveal(b, Math.floor(b), w, 'text-align:center;width:1080px', .3), 'width:1080px;color:#fff;font-size:200px;"),
 ('top:680px;text-align:center;color:rgba(255,255,255,.5)', 'top:1020px;text-align:center;color:rgba(255,255,255,.5)'),
 ('left:${960 - size / 2}px;top:${700 - size / 2 + dive * 200}px', 'left:${540 - size / 2}px;top:${1250 - size / 2 + dive * 200}px'),
 ('tx = lerp(960, 330 + i * 420, e), ty = lerp(560, 330, e)', 'tx = lerp(540, 300 + (i % 2) * 480, e), ty = lerp(1150, 380 + Math.floor(i / 2) * 380, e)'),
 ("U += abs(0, 920, reveal(b, 6.6, 'One home for all of it.', 'text-align:center;width:1920px'), 'width:1920px;", "U += abs(0, 1560, reveal(b, 6.6, 'One home for all of it.', 'text-align:center;width:1080px'), 'width:1080px;"),
 # OpenID
 ("W += phone({ x: 1290, y: 560, s: 1.02,", "W += phone({ x: 540, y: 1260, s: 1.02,"),
 ("U += abs(150, 380, reveal(b, 8.2,", "U += abs(90, 180, reveal(b, 8.2,"),
 ("+ abs(150, 420, reveal(b, 8.4, 'Sign up once.')", "+ abs(90, 220, reveal(b, 8.4, 'Sign up once.')"),
 ("U += abs(150, 650, reveal(b, 10.4,", "U += abs(90, 450, reveal(b, 10.4,"),
 ("U += abs(0, 300, reveal(b, 12.15, 'One OpenID.') + reveal(b, 13, 'Every app.'), 'width:1920px;text-align:center;color:#fff;font-size:170px;", "U += abs(0, 640, reveal(b, 12.15, 'One OpenID.') + reveal(b, 13, 'Every app.'), 'width:1080px;text-align:center;color:#fff;font-size:120px;"),
 ('left:${640 + i * 250 - (n.length > 7 ? 20 : 0)}px;top:${720 - (1 - k) * 60}px', 'left:${110 + i * 280 - (n.length > 7 ? 20 : 0)}px;top:${1020 - (1 - k) * 60}px'),
 ('linear-gradient(90deg,#007AFF ${wipe * 100}%,#E7ECF7 ${wipe * 100}%)', 'linear-gradient(180deg,#007AFF ${wipe * 100}%,#E7ECF7 ${wipe * 100}%)'),
 # Tomorrow
 ('left:${960 - 520}px;top:${200 + (1 - rise) * 500}px;width:1040px;height:1040px', 'left:${540 - 520}px;top:${860 + (1 - rise) * 500}px;width:1040px;height:1040px'),
 ("W += phone({ x: 960, y: 560 + (1 - rise) * 120, s: 1.0,", "W += phone({ x: 540, y: 1220 + (1 - rise) * 120, s: 1.0,"),
 ("U += abs(110, 140, reveal(b, 14.3,", "U += abs(90, 160, reveal(b, 14.3,"),
 ("+ abs(110, 176, reveal(b, 14.5,", "+ abs(90, 196, reveal(b, 14.5,"),
 ("U += abs(1290, 720, reveal(b, 16.8, 'Likes are hidden.')", "U += abs(90, 360, reveal(b, 16.8, 'Likes are hidden.')"),
 ("U += abs(1290, 720, reveal(b, 18.4, 'Stories from friends.')", "U += abs(90, 360, reveal(b, 18.4, 'Stories from friends.')"),
 ("U += abs(0, 330, reveal(b, 20, 'No ads.') + reveal(b, 21, 'No fake numbers.'), 'width:1920px;text-align:center;color:#fff;font-size:170px;", "U += abs(0, 640, reveal(b, 20, 'No ads.') + reveal(b, 21, 'No fake numbers.'), 'width:1080px;text-align:center;color:#fff;font-size:120px;"),
 # OpenPrep
 ('transform-origin:50% 100%;top:500px"', 'transform-origin:50% 100%;top:1150px"'),
 ("U += panel('lesson2', cam, 1150, 580,", "U += panel('lesson2', cam, 540, 760,"),
 ('left:${120}px;top:${400 + (1 - bk) * 400}px;width:340px;height:425px', 'left:${370}px;top:${1160 + (1 - bk) * 400}px;width:340px;height:425px'),
 ("U += abs(120, 120, reveal(b, 22.3,", "U += abs(90, 160, reveal(b, 22.3,"),
 ("+ abs(120, 156, reveal(b, 22.5,", "+ abs(90, 196, reveal(b, 22.5,"),
 ("U += panel(img, qb, 960, 600, 2.4 * lerp(.7, 1, k),", "U += panel(img, qb, 540, 1000, 2.4 * lerp(.7, 1, k),"),
 ('fx = 960 + (rb[0] + rb[2] * .7 - (qb[0] + qb[2] / 2)) * 2.4, fy = 600 +', 'fx = 540 + (rb[0] + rb[2] * .7 - (qb[0] + qb[2] / 2)) * 2.4, fy = 1000 +'),
 ("U += abs(0, 985, txt.slice(0, nch)", "U += abs(0, 1500, txt.slice(0, nch)"),
 ("U += abs(0, 70, reveal(b, 28.2,", "U += abs(0, 260, reveal(b, 28.2,"),
 ("else U += abs(0, 70, reveal(b, 25.2,", "else U += abs(0, 260, reveal(b, 25.2,"),
 ("U += abs(0, 330, reveal(b, 30, 'Free CAT prep.') + reveal(b, 31, 'No ads.'), 'width:1920px;text-align:center;color:#fff;font-size:170px;", "U += abs(0, 640, reveal(b, 30, 'Free CAT prep.') + reveal(b, 31, 'No ads.'), 'width:1080px;text-align:center;color:#fff;font-size:120px;"),
 # GoodHabit chart
 ('const CH = { x0: 180, x1: 1740, y0: 330, y1: 930,', 'const CH = { x0: 80, x1: 1000, y0: 760, y1: 1380,'),
 ('<svg width="1920" height="1080"', '<svg width="1080" height="1920"'),
 ('style="position:absolute;left:180px;top:120px;opacity:', 'style="position:absolute;left:80px;top:200px;opacity:'),
 ('style="position:absolute;right:180px;top:120px;text-align:right;opacity:', 'style="position:absolute;left:80px;top:400px;text-align:left;opacity:'),
 ("if (b < 38) U += abs(0, 960, reveal(b, 33.4,", "if (b < 38) U += abs(0, 1500, reveal(b, 33.4,"),
 ("U += abs(0, 380, reveal(b, 38, 'Then') + reveal(b, 39, 'March 2020.'), 'width:1920px;text-align:center;color:#fff;font-size:170px;", "U += abs(0, 760, reveal(b, 38, 'Then') + reveal(b, 39, 'March 2020.'), 'width:1080px;text-align:center;color:#fff;font-size:120px;"),
 ("U += abs(180, 960, reveal(b, 40.3,", "U += abs(80, 1480, reveal(b, 40.3,"),
 ("'color:#fff;font:600 32px Inter'); }", "'color:#fff;font:600 32px Inter;width:920px;line-height:1.35'); }"),
 ("if (b >= 42) U += abs(180, 960, reveal(b, 42.1,", "if (b >= 42) U += abs(80, 1480, reveal(b, 42.1,"),
 ("Then it climbed back.`), 'color:#fff;font:600 32px Inter');", "Then it climbed back.`), 'color:#fff;font:600 32px Inter;width:920px;line-height:1.35');"),
 ("W += phone({ x: 960, y: lerp(1300, 600, k), s: 1.05,", "W += phone({ x: 540, y: lerp(2300, 1180, k), s: 1.05,"),
 ("U += abs(0, 90, reveal(b, 44.2, 'Every big day, explained.')", "U += abs(0, 300, reveal(b, 44.2, 'Every big day, explained.')"),
 # markets and Hissab
 ("U += abs(0, 330, reveal(b, 46, 'Practise money') + reveal(b, 47, 'before it\\'s real.'), 'width:1920px;text-align:center;color:#fff;font-size:160px;", "U += abs(0, 640, reveal(b, 46, 'Practise money') + reveal(b, 47, 'before it\\'s real.'), 'width:1080px;text-align:center;color:#fff;font-size:110px;"),
 ("U += panel('markets', row, 1180, 240 + i * 170, 1.9,", "U += panel('markets', row, 540, 860 + i * 190, 2.3,"),
 ("U += abs(120, 380, reveal(b, 48.1,", "U += abs(90, 200, reveal(b, 48.1,"),
 ("+ abs(120, 420, reveal(b, 48.3,", "+ abs(90, 240, reveal(b, 48.3,"),
 ("+ abs(120, 620, reveal(b, 48.8,", "+ abs(90, 440, reveal(b, 48.8,"),
 ("U += panel('hissab', grow(mb, 2), 1180 + (mb[0] + mb[2] / 2 - 195) * 2.2, 200 + (mb[1] - 267) * 2.2 + mb[3], 2.2,", "U += panel('hissab', grow(mb, 2), 540 + (mb[0] + mb[2] / 2 - 195) * 2.4, 760 + (mb[1] - 267) * 2.4 + mb[3], 2.4,"),
 ("U += abs(120, 380, reveal(b, 50.1,", "U += abs(90, 200, reveal(b, 50.1,"),
 ("+ abs(120, 420, reveal(b, 50.3,", "+ abs(90, 240, reveal(b, 50.3,"),
 ("+ abs(120, 640, reveal(b, 50.7,", "+ abs(90, 460, reveal(b, 50.7,"),
 ('style="position:absolute;left:150px;top:150px;width:180px;height:180px;transform:rotateY(', 'style="position:absolute;left:820px;top:170px;width:180px;height:180px;transform:rotateY('),
 # inbox
 ("W += phone({ x: 1250, y: 560, s,", "W += phone({ x: 540, y: 1220, s,"),
 ('tx = lerp(2200, 1250 + (card[0] + card[2] / 2 - 195), e), ty = lerp(1250, 560 + (card[1] + card[3] / 2 - 422), e)', 'tx = lerp(1300, 540 + (card[0] + card[2] / 2 - 195), e), ty = lerp(2200, 1220 + (card[1] + card[3] / 2 - 422), e)'),
 ("U += abs(120, 360, reveal(b, 52.2,", "U += abs(90, 160, reveal(b, 52.2,"),
 ("+ abs(120, 400, reveal(b, 52.4,", "+ abs(90, 200, reveal(b, 52.4,"),
 ("+ abs(120, 620, reveal(b, 54.2,", "+ abs(90, 420, reveal(b, 54.2,"),
 ("U += abs(0, 330, reveal(b, 58, 'One inbox.') + reveal(b, 59, 'Every app.'), 'width:1920px;text-align:center;color:#fff;font-size:170px;", "U += abs(0, 640, reveal(b, 58, 'One inbox.') + reveal(b, 59, 'Every app.'), 'width:1080px;text-align:center;color:#fff;font-size:120px;"),
 # build
 ("U += panel('build0', BX('build0', 'list'), 560, 560, 1.9 * lerp(.8, 1, k),", "U += panel('build0', BX('build0', 'list'), 540, 760, 1.9 * lerp(.8, 1, k),"),
 ('style="position:absolute;left:1050px;top:330px;width:760px;padding:40px 44px;', 'style="position:absolute;left:80px;top:1180px;width:920px;padding:40px 44px;'),
 ("U += abs(1050, 140, reveal(b, 60.2,", "U += abs(80, 120, reveal(b, 60.2,"),
 ("+ abs(1050, 176, reveal(b, 60.4,", "+ abs(80, 156, reveal(b, 60.4,"),
 ("U += abs(1050, 880, reveal(b, 63,", "U += abs(80, 1720, reveal(b, 63,"),
 ("'font:600 26px Inter;color:rgba(255,255,255,.7)');", "'font:600 26px Inter;color:rgba(255,255,255,.7);width:920px');"),
 # privacy
 ("U += panel(on, tb, 1180, 560, 2.3 * lerp(.85, 1, k),", "U += panel(on, tb, 540, 1060, 2.6 * lerp(.85, 1, k),"),
 ('const tx = 1180 + (tb[2] / 2 - 46) * 2.3, ty = 560 + (-tb[3] / 2 + 34) * 2.3;', 'const tx = 540 + (tb[2] / 2 - 46) * 2.6, ty = 1060 + (-tb[3] / 2 + 34) * 2.6;'),
 ("top:${ty + (b > 68 ? 125 : 0)}px", "top:${ty + (b > 68 ? 141 : 0)}px"),
 ("U += abs(130, 400, reveal(b, 66.2,", "U += abs(90, 240, reveal(b, 66.2,"),
 ("+ abs(130, 440, reveal(b, 66.4,", "+ abs(90, 280, reveal(b, 66.4,"),
 # learn and end
 ("U += abs(0, 300, reveal(b, 70, 'Learn.') + reveal(b, 70.5, 'Build.') + reveal(b, 71, 'Grow your money.'), 'width:1920px;text-align:center;color:#fff;font-size:150px;", "U += abs(0, 620, reveal(b, 70, 'Learn.') + reveal(b, 70.5, 'Build.') + reveal(b, 71, 'Grow your money.'), 'width:1080px;text-align:center;color:#fff;font-size:116px;"),
 ('const x = 960 + (i - 1.5) * 240; U += `<div style="position:absolute;left:${x - 90}px;top:${230 + (1 - k) * 80}px;', 'const x = 540 + (i - 1.5) * 235; U += `<div style="position:absolute;left:${x - 90}px;top:${560 + (1 - k) * 80}px;'),
 ("abs(0, 470, reveal(b, 74, 'Built in the open.'), 'width:1920px;text-align:center;color:#0B0B0F;font-size:140px;", "abs(0, 860, reveal(b, 74, 'Built in the open.'), 'width:1080px;text-align:center;color:#0B0B0F;font-size:108px;"),
 ("abs(0, 660, reveal(b, 75.5, 'OpenPrep · GoodHabit · The Good Stuff · Tomorrow'), 'width:1920px;", "abs(0, 1020, reveal(b, 75.5, 'OpenPrep · GoodHabit · The Good Stuff · Tomorrow'), 'width:1080px;"),
 ("abs(0, 740, reveal(b, 76.5, 'opensourceeverything.in'), 'width:1920px;", "abs(0, 1100, reveal(b, 76.5, 'opensourceeverything.in'), 'width:1080px;"),
]
for a, b in R:
    n = s.count(a)
    if n != 1: raise SystemExit(f'expected 1 match, found {n}: {a[:70]}')
    s = s.replace(a, b)
s = s.replace('width:1920px', 'width:1080px')   # the remaining centred lines
R2 = [
 ("W += phone({ x: 540, y: 1260, s: 1.02,", "W += phone({ x: 540, y: 1260, s: 1.3,"),
 ("W += phone({ x: 540, y: 1220 + (1 - rise) * 120, s: 1.0,", "W += phone({ x: 540, y: 1220 + (1 - rise) * 120, s: 1.3,"),
 ("W += phone({ x: 540, y: lerp(2300, 1180, k), s: 1.05,", "W += phone({ x: 540, y: lerp(2300, 1180, k), s: 1.3,"),
 ("W += phone({ x: 540, y: 1220, s,", "W += phone({ x: 540, y: 1220, s: s * 1.3,"),
 ('tx = lerp(1300, 540 + (card[0] + card[2] / 2 - 195), e), ty = lerp(2200, 1220 + (card[1] + card[3] / 2 - 422), e)', 'tx = lerp(1300, 540 + (card[0] + card[2] / 2 - 195) * 1.3, e), ty = lerp(2200, 1220 + (card[1] + card[3] / 2 - 422) * 1.3, e)'),
 ("left:${cx(I12) - 20}px;top:${cy(NF[I12][1]) - 250}px", "left:${Math.min(cx(I12) - 20, 520)}px;top:${cy(NF[I12][1]) - 250}px"),
]
for a, b in R2:
    n = s.count(a)
    if n != 1: raise SystemExit(f'expected 1 match, found {n}: {a[:70]}')
    s = s.replace(a, b)
open(os.path.join(HERE, 'scene2v.html'), 'w', encoding='utf-8').write(s)
print('wrote scene2v.html')

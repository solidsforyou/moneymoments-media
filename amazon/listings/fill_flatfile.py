# Fill Amazon's SHIRT/PANTS template as "Edit (Partial Update)" for SOLIDS FOR YOU's existing SKUs.
# Usage: python3 fill_flatfile.py <amazon template.xlsx> amazon/listings/listings.md amazon/SFY_Inventory_2026-10-31.xlsx <out.xlsx>
import re, sys, openpyxl
from openpyxl.utils import column_index_from_string as ci
TPL, MD, INV, OUT = sys.argv[1:5]
md = open(MD).read()
def section(n):
    a = md.index('## %d. ' % n); b = md.find('\n---', a); return md[a:b]
def parse(n):
    s = section(n)
    title = re.search(r'\*\*Title:\*\* (.+)', s).group(1).strip()
    bullets = re.findall(r'^\d\. (.+)$', s.split('**Bullets**')[1].split('**Description**')[0], re.M)
    desc = s.split('**Description**')[1].split('**Backend keywords:**')[0].strip()
    kw = re.search(r'\*\*Backend keywords:\*\* (.+)', s).group(1).strip()
    return title, bullets, ' '.join(l.strip() for l in desc.splitlines() if l.strip()), kw
# family key -> (md section, product type, gender, fit, style, parent sku)
fam = {
 ('Oversized Tee','Men'):   (1,'SHIRT','Mens','Male','Oversized','Streetwear','98-YN6T-JORC-FBA_Br-Parent'),
 ('Oversized Tee','Women'): (2,'SHIRT','Womens','Female','Oversized','Streetwear','SFY_OS_F-FBA_Br-Parent'),
 ('Fitted Tee','Men'):      (3,'SHIRT','Mens','Male','Regular','Minimalist','SFY_M_FTS-FBA_Br-Parent'),
 ('Fitted Tee','Women'):    (4,'SHIRT','Womens','Female','Fitted','Minimalist','SFY_FIT_T-FBA_Br-Parent'),
 ('Joggers','Men'):         (5,'PANTS','Mens','Male','Relaxed','Jogger','UC-1BB3-3660-FBA_Br-Parent'),
 ('Joggers','Women'):       (6,'PANTS','Womens','Female','Relaxed','Jogger','LW-VO8I-LN6L-FBA_Br-Parent'),
}
inv = openpyxl.load_workbook(INV, data_only=True)['SKUs']
kids = {}
for r in inv.iter_rows(min_row=2, values_only=True):
    if not r[0] or r[0] == 'TOTAL': continue
    kids.setdefault((r[4], r[5]), []).append((r[0], r[6], r[7]))
wb = openpyxl.load_workbook(TPL); ws = wb['Template']
row = 7
def put(col, val):
    if val is not None: ws.cell(row=row, column=ci(col), value=val)
def fill(key, sku, colour=None, size=None):
    n, pt, dept, gender, fit, style, parent = fam[key]
    title, bullets, desc, kw = parse(n)
    if size:  # child: name the colour and size
        base = title.rsplit(' | Solid Blue', 1)[0] if title.endswith('Solid Blue') else title
        cname = 'Solid Blue' if colour == 'Blue' else colour
        title = f'{base} | {cname}, Size {size}'
    put('A', sku); put('B', pt); put('C', 'Edit (Partial Update)')
    put('G', title); put('U', 'Ragom Apparels')
    put('AH', desc)
    for c, b in zip(['AI','AJ','AK','AL','AM'], bullets): put(c, b)
    put('AN', kw)
    put('AO', 'Breathable')
    if pt == 'SHIRT': put('AP', 'Heavyweight')
    put('AT', 'Casual'); put('AU', style); put('AV', dept); put('AW', gender); put('AX', 'Adult')
    put('BD', 'Cotton'); put('BG', '100% Cotton'); put('BR', fit); put('BT', 'Machine Wash'); put('BW', 'Solid')
    put('EH', 'Heavyweight'); put('IX', 'India')
    if pt == 'SHIRT':
        put('CR', 'Crew Neck'); put('DV', 'Half Sleeve'); put('DX', 'Pull On')
    else:
        put('DX', 'Drawstring'); put('DY', 'Elastic Closure'); put('FA', 'Wide'); put('FR', 'Joggers'); put('DG', 2)
for key in fam:
    fill(key, fam[key][6]); row += 1
    for sku, colour, size in kids[key]:
        fill(key, sku, colour, size); row += 1
wb.save(OUT)
print('rows', row - 7)

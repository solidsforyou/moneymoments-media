import json,datetime as dt
SY=[('NSEI','NIFTY 50','Nifty 50 index','idx'),('NIFTYBEES.NS','NIFTYBEES','Nifty 50 ETF (Nippon)','etf'),('GOLDBEES.NS','GOLDBEES','Gold ETF (Nippon)','etf'),
 ('RELIANCE.NS','RELIANCE','Reliance Industries','stk'),('TCS.NS','TCS','Tata Consultancy Services','stk'),('HDFCBANK.NS','HDFCBANK','HDFC Bank','stk'),('INFY.NS','INFY','Infosys','stk'),
 ('ICICIBANK.NS','ICICIBANK','ICICI Bank','stk'),('ITC.NS','ITC','ITC','stk'),('SBIN.NS','SBIN','State Bank of India','stk'),('BHARTIARTL.NS','BHARTIARTL','Bharti Airtel','stk'),
 ('HINDUNILVR.NS','HINDUNILVR','Hindustan Unilever','stk'),('LT.NS','LT','Larsen & Toubro','stk'),('MARUTI.NS','MARUTI','Maruti Suzuki','stk'),('ASIANPAINT.NS','ASIANPAINT','Asian Paints','stk'),
 ('BAJFINANCE.NS','BAJFINANCE','Bajaj Finance','stk'),('SUNPHARMA.NS','SUNPHARMA','Sun Pharma','stk'),('TITAN.NS','TITAN','Titan','stk')]
def load(f):
    r=json.load(open(f+'.json'))['chart']['result'][0]
    out={}
    for t,c in zip(r['timestamp'],r['indicators']['quote'][0]['close']):
        if c: out[dt.datetime.fromtimestamp(t+19800,dt.UTC).date()]=c
    return out
idx=load('NSEI'); days=sorted(idx); idx_vals=[idx[d] for d in days]
series={}
fixes=[]
for f,sym,name,kind in SY:
    m=load(f); vals=[]; last=None
    for d in days:
        if d in m: last=m[d]
        vals.append(last)
    # clean known bad ticks in the ETFs only (real stock moves stay untouched)
    if sym=='NIFTYBEES':
        for i in range(1,len(vals)):
            if vals[i] and vals[i-1]:
                r0=vals[i-1]/idx_vals[i-1]; r1=vals[i]/idx_vals[i]
                if abs(r1/r0-1)>0.05: fixes.append((sym,days[i].isoformat(),round((vals[i]/vals[i-1]-1)*100,1))); vals[i]=vals[i-1]*idx_vals[i]/idx_vals[i-1]
    if sym=='GOLDBEES':
        good=None
        for i in range(len(vals)):
            if vals[i] is None: continue
            if good and abs(vals[i]/good-1)>0.2: fixes.append((sym,days[i].isoformat(),round((vals[i]/good-1)*100,1))); vals[i]=good
            else: good=vals[i]
    series[sym]=vals
print('fixes',fixes)
# encode: paise ints, delta base36
def b36(n):
    s='-' if n<0 else ''; n=abs(n); d='0123456789abcdefghijklmnopqrstuvwxyz'; o=''
    while True:
        o=d[n%36]+o; n//=36
        if not n: break
    return s+o
out={'d0':days[0].isoformat(),'gaps':''.join(str(min(9,(b-a).days)) for a,b in zip(days,days[1:])),'s':[]}
assert all((b-a).days<=9 for a,b in zip(days,days[1:]))
for f,sym,name,kind in SY:
    v=series[sym]; first=next(i for i,x in enumerate(v) if x)
    ints=[round(x*100) for x in v[first:]]
    enc=[b36(ints[0])]+[b36(b-a) for a,b in zip(ints,ints[1:])]
    out['s'].append([sym,name,kind,first,','.join(enc)])
js=json.dumps(out,separators=(',',':'))
open('simdata.json','w').write(js); print(len(days), days[0], days[-1], 'bytes', len(js))
# sanity: decode check

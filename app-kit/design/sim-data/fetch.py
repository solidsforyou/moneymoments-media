import json, urllib.request, time, datetime as dt
syms = ['^NSEI','NIFTYBEES.NS','GOLDBEES.NS','RELIANCE.NS','TCS.NS','HDFCBANK.NS','INFY.NS','ICICIBANK.NS','ITC.NS','SBIN.NS','BHARTIARTL.NS','HINDUNILVR.NS','LT.NS','MARUTI.NS','ASIANPAINT.NS','BAJFINANCE.NS','SUNPHARMA.NS','TITAN.NS']
p1 = int(dt.datetime(2007,1,1).timestamp()); p2 = int(dt.datetime(2026,7,30).timestamp())
for s in syms:
    u = f"https://query1.finance.yahoo.com/v8/finance/chart/{urllib.parse.quote(s)}?period1={p1}&period2={p2}&interval=1d&events=split"
    req = urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0'})
    d = json.load(urllib.request.urlopen(req, timeout=30))
    json.dump(d, open(s.replace('^','')+'.json','w'))
    r = d['chart']['result'][0]; ts = r['timestamp']; c = r['indicators']['quote'][0]['close']
    print(s, len(ts), dt.datetime.utcfromtimestamp(ts[0]).date(), dt.datetime.utcfromtimestamp(ts[-1]).date(), c[0], c[-1], sum(1 for x in c if x is None), 'splits' , len(r.get('events',{}).get('splits',{})))
    time.sleep(0.5)

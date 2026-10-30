import './shared/base.css';
import './mock.css';
import { esc, toast, sheet, footer } from './shared/ui.js';
import { goodguy } from './shared/mascots.js';
import { track, sync, savePrompt } from './shared/progress.js';

// The trading simulator: real daily closing prices since 2007, pretend money.
const app = document.getElementById('app');
document.documentElement.style.setProperty('--accent', '#0B7A3B');
const KEY = 'gh-sim-v1';
let D, EV, G;
const inr = (n, d = 0) => (n < 0 ? '−' : '') + '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
const pct = x => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(x * 100).toFixed(1) + '%';
const cls = x => Math.abs(x) < .0005 ? 'muted' : x > 0 ? 'up' : 'down';
const iso = i => new Date(D.days[i]).toISOString().slice(0, 10);
const nice = i => new Date(D.days[i]).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const idx = s => { const t = Date.parse(s + 'T00:00:00Z'); let lo = 0, hi = D.N - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (D.days[m] < t) lo = m + 1; else hi = m; } return lo; };
const px = (sym, i) => D.by[sym].px[i];
const move = (sym, i) => { const p = D.by[sym].px; return i > 0 && p[i] && p[i - 1] ? p[i] / p[i - 1] - 1 : 0; };
// delivery trade charges at a ₹0-brokerage broker, approximate
const charges = (side, v) => { const stt = .001 * v, exch = .0000297 * v, sebi = v * 1e-6, stamp = side === 'buy' ? .00015 * v : 0, gst = .18 * (exch + sebi), dp = side === 'sell' ? 15.34 : 0; return stt + exch + sebi + stamp + gst + dp; };
const value = (i, g = G) => g.cash + Object.entries(g.hold).reduce((a, [s, h]) => a + h.q * (px(s, i) ?? h.avg), 0);
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(G)); } catch {} track(KEY); };

async function boot() {
  app.innerHTML = '<main class="wrap" style="padding:48px 16px"><p class="muted">Loading 19 years of market data…</p></main>';
  const r = await fetch('/data/sim.json'); const j = await r.json();
  const days = [Date.parse(j.data.d0 + 'T00:00:00Z')]; for (const g of j.data.gaps) days.push(days[days.length - 1] + (+g) * 864e5);
  const N = days.length, inst = j.data.s.map(([sym, name, kind, first, enc]) => { const p = new Array(N).fill(null); let v = 0; enc.split(',').forEach((t, k) => { v = k ? v + parseInt(t, 36) : parseInt(t, 36); p[first + k] = v / 100; }); return { sym, name, kind, first, px: p }; });
  D = { days, N, inst, by: Object.fromEntries(inst.map(x => [x.sym, x])) }; EV = j.events;
  await sync();
  try { G = JSON.parse(localStorage.getItem(KEY)); } catch { G = null; }
  G ? (G.done ? report() : play()) : setup();
}
const LAST = () => D.N - 1;
const head = () => `<header class="bar"><div class="wrap"><a class="brand" href="/goodhabit/"><span class="m">${goodguy()}</span>GoodHabit</a><span class="muted small">Pretend money, real prices</span></div></header>`;

function setup() {
  const P = [['2008-01-01', 'Jan 2008', 'Just before the global financial crisis'], ['2020-01-01', 'Jan 2020', 'Just before Covid'], ['2020-03-24', 'Mar 2020', 'The Covid low'], ['2016-11-01', 'Nov 2016', 'The month of demonetisation']];
  const maxD = iso(LAST() - 21);
  app.innerHTML = `${head()}<main class="wrap" style="max-width:760px;padding-block:28px 48px">
    <h1>Go back in time with ₹1 lakh of pretend money.</h1><p class="lede muted" style="font-size:19px;margin:10px 0 24px">Buy real Indian shares and ETFs at their real prices, then skip ahead and see what actually happened.</p>
    <h2 style="font-size:22px;margin-bottom:12px">Pick when you start</h2>
    <div class="list">${P.map(([d, l, w]) => `<button class="item" data-start="${d}"><span class="grow"><b>${l}</b><small>${w}</small></span><span class="btn small">Start</span></button>`).join('')}</div>
    <div class="card row" style="margin-top:16px"><div class="field" style="flex:1;min-width:200px;margin:0"><label for="d">Or any date</label><input type="date" id="d" min="${iso(1)}" max="${maxD}" value="2014-01-01"></div><button class="btn" data-start="custom">Start</button></div>
    <div class="field" style="margin-top:16px;max-width:260px"><label for="cash">Starting money</label><select id="cash"><option value="50000">₹50,000</option><option value="100000" selected>₹1,00,000</option><option value="500000">₹5,00,000</option></select></div>
    <p class="small muted" style="margin-top:24px">Prices are daily closing prices from public market data. This is a game for learning; nothing here is advice on what to buy. GoodGuy explains what happened, never what will happen next.</p>
  </main>${footer()}`;
}
function start(d) { const i0 = Math.max(1, Math.min(idx(d), LAST() - 21)), cash = +document.getElementById('cash').value; G = { i0, i: i0, base: cash, cash, hold: {}, trades: [], charges: 0, vals: [cash], done: false }; save(); play(); }
function step(to) { to = Math.min(LAST(), to); for (let k = G.i + 1; k <= to; k++) G.vals.push(value(k)); G.i = to; save(); play(); }
function nextBig() { for (let k = G.i + 1; k <= LAST(); k++) if (EV[iso(k)] || Math.abs(move('NIFTY 50', k)) >= .03) return k; return LAST(); }

function chart() {
  const n0 = px('NIFTY 50', G.i0), W = 640, H = 180, vs = G.vals, ns = vs.map((_, k) => G.base * px('NIFTY 50', G.i0 + k) / n0);
  const all = [...vs, ...ns], lo = Math.min(...all), hi = Math.max(...all), sx = k => vs.length < 2 ? 0 : k / (vs.length - 1) * W, sy = v => hi === lo ? H / 2 : H - (v - lo) / (hi - lo) * H;
  const line = arr => arr.map((v, k) => `${k ? 'L' : 'M'}${sx(k).toFixed(1)} ${sy(v).toFixed(1)}`).join('');
  return `<svg viewBox="-4 -4 ${W + 8} ${H + 8}" role="img" aria-label="Your money compared with just holding the Nifty" style="width:100%;height:auto"><path d="${line(ns)}" fill="none" stroke="var(--label2)" stroke-width="2" stroke-dasharray="5 6"/><path d="${line(vs)}" fill="none" stroke="var(--accent)" stroke-width="3"/></svg><p class="small muted"><b style="color:var(--accent)">Your money</b> vs the Nifty, if you'd put it all in on day one (dashed)</p>`;
}
function play() {
  const i = G.i, v = value(i), n0 = px('NIFTY 50', G.i0), nifty = px('NIFTY 50', i) / n0 - 1, ev = EV[iso(i)], nm = move('NIFTY 50', i);
  const list = D.inst.filter(x => x.px[i] != null);
  app.innerHTML = `${head()}<main class="wrap" style="max-width:860px;padding-block:20px 48px">
    <div class="card stack"><span class="muted small">${nice(i)}, day ${i - G.i0 + 1}</span><b style="font-size:40px;letter-spacing:-.02em">${inr(v, 2)}</b>
      <span class="small"><span class="${cls(v / G.base - 1)}">${pct(v / G.base - 1)} since you started</span>. Nifty: <span class="${cls(nifty)}">${pct(nifty)}</span>. Cash ${inr(G.cash, 2)}</span></div>
    ${ev || Math.abs(nm) >= .03 ? `<div class="card" style="margin-top:12px"><b>What happened today</b><p style="margin-top:4px">${ev ? esc(ev) + ' ' : ''}<span class="${cls(nm)}">Nifty ${pct(nm)}</span> on the day.</p></div>` : ''}
    <div class="row" style="margin:16px 0">${[['1', '+1 day'], ['5', '+1 week'], ['21', '+1 month']].map(([n, l]) => `<button class="btn quiet" data-step="${n}">${l}</button>`).join('')}<button class="btn" data-act="big">Next big day</button><button class="btn quiet" data-act="finish" style="margin-left:auto">Finish and see my report</button></div>
    <div class="card">${chart()}</div>
    ${Object.keys(G.hold).length ? `<h2 style="font-size:22px;margin:24px 0 10px">What you own</h2><div class="list">${Object.entries(G.hold).map(([s, h]) => { const p = px(s, i) ?? h.avg, gain = p / h.avg - 1; return `<button class="item" data-sym="${esc(s)}"><span class="grow"><b>${esc(s)}</b><small>${h.q} at ${inr(h.avg, 2)} avg</small></span><span style="text-align:right"><b>${inr(h.q * p)}</b><br><span class="small ${cls(gain)}">${pct(gain)}</span></span></button>`; }).join('')}</div>` : `<div class="card" style="margin-top:16px"><b>You haven't bought anything yet</b><p class="muted small" style="margin-top:4px">Tap any share or ETF below to buy. Many people start with NIFTYBEES, a fund that follows the whole Nifty 50.</p></div>`}
    <h2 style="font-size:22px;margin:24px 0 10px">Market on ${nice(i)}</h2>
    <div class="list">${list.map(x => { const m = move(x.sym, i); return `<button class="item" data-sym="${esc(x.sym)}"><span class="grow"><b>${esc(x.sym)}</b><small>${esc(x.name)}</small></span><span style="text-align:right"><b>${x.px[i].toLocaleString('en-IN', { maximumFractionDigits: 2 })}</b><br><span class="small ${cls(m)}">${pct(m)}</span></span></button>`; }).join('')}</div>
    <p class="small muted" style="margin-top:20px">Charges are approximate delivery charges at a zero-brokerage broker. ${G.trades.length} trade${G.trades.length === 1 ? '' : 's'}, ${inr(G.charges, 2)} in charges so far.</p>
  </main>${footer()}`;
}
function trade(sym) {
  const i = G.i, p = px(sym, i); if (p == null) return toast('No price for this date.');
  const h = G.hold[sym]; let side = 'buy', q = 1;
  const d = sheet('<div data-body></div>');
  const draw = () => {
    const maxBuy = Math.max(0, Math.floor(G.cash / (p * 1.0012))), maxQ = side === 'buy' ? maxBuy : (h?.q || 0); q = Math.max(0, Math.min(q, maxQ));
    const v = q * p, c = q ? charges(side, v) : 0;
    d.querySelector('[data-body]').innerHTML = `<h2>${esc(sym)}</h2><p class="muted">${esc(D.by[sym].name)}, ${inr(p, 2)} on ${nice(i)}</p>
      <div class="seg" role="group" aria-label="Buy or sell" style="margin:16px 0"><button data-side="buy" aria-pressed="${side === 'buy'}">Buy</button><button data-side="sell" aria-pressed="${side === 'sell'}" ${h ? '' : 'disabled'}>Sell</button></div>
      <div class="field"><label for="q">Quantity (up to ${maxQ})</label><div class="row"><button class="btn quiet small" data-q="-1">−</button><input id="q" inputmode="numeric" value="${q}" style="max-width:120px;text-align:center"><button class="btn quiet small" data-q="1">+</button><button class="btn quiet small" data-q="max">Max</button></div></div>
      <p style="margin-top:12px">${side === 'buy' ? 'You pay' : 'You get'} <b>${inr(side === 'buy' ? v + c : v - c, 2)}</b> <span class="small muted">(${inr(c, 2)} in charges)</span></p>
      <button class="btn" data-go style="width:100%;margin-top:16px" ${q ? '' : 'disabled'}>${side === 'buy' ? 'Buy' : 'Sell'} ${q}</button>`;
    d.querySelector('#q').oninput = e => { q = parseInt(e.target.value, 10) || 0; };
    d.querySelector('#q').onchange = () => draw();
  };
  d.addEventListener('click', e => {
    const b = e.target.closest('[data-side],[data-q],[data-go]'); if (!b) return;
    if (b.dataset.side) { side = b.dataset.side; q = 1; return draw(); }
    if (b.dataset.q) { q = b.dataset.q === 'max' ? 1e9 : q + (+b.dataset.q); return draw(); }
    if (b.dataset.go != null) {
      const v = q * p, c = charges(side, v);
      if (side === 'buy') { if (v + c > G.cash + 1e-6) return toast('Not enough cash.'); G.cash -= v + c; const cur = G.hold[sym] || { q: 0, avg: 0 }; G.hold[sym] = { q: cur.q + q, avg: (cur.q * cur.avg + v) / (cur.q + q) }; }
      else { G.cash += v - c; G.hold[sym].q -= q; if (!G.hold[sym].q) delete G.hold[sym]; }
      G.charges += c; G.trades.push({ i, sym, side, q, p }); G.vals[G.vals.length - 1] = value(i); save(); d.close(); toast(`${side === 'buy' ? 'Bought' : 'Sold'} ${q} ${sym}`); play();
    }
  });
  draw();
}
function report() {
  const i = G.i, v = value(i), r = v / G.base - 1, n = px('NIFTY 50', i) / px('NIFTY 50', G.i0) - 1;
  let peak = -Infinity, dd = 0; for (const x of G.vals) { peak = Math.max(peak, x); dd = Math.min(dd, x / peak - 1); }
  const notes = [];
  if (!G.trades.length) notes.push('You didn\'t make any trades, so your money sat as cash the whole time. That protects you in a crash but misses the climb after it.');
  else {
    notes.push(r >= n ? `You beat just holding the Nifty by ${((r - n) * 100).toFixed(1)} points.` : `Just holding the Nifty would have done ${((n - r) * 100).toFixed(1)} points better. That's common: most people who trade a lot trail the index.`);
    if (dd < -.2) notes.push(`At the worst point you were ${Math.abs(dd * 100).toFixed(1)}% below your best. Ask yourself honestly whether you'd have held on with real money.`);
    if (G.charges > G.base * .005) notes.push(`Charges took ${inr(G.charges, 2)}. Every trade costs a little; it adds up.`);
  }
  app.innerHTML = `${head()}<main class="wrap" style="max-width:760px;padding-block:28px 48px">
    <h1>Your report card</h1><p class="muted" style="margin:8px 0 20px">${nice(G.i0)} to ${nice(i)}</p>
    <div class="grid"><div class="card"><span class="muted small">You ended with</span><br><b style="font-size:32px">${inr(v, 2)}</b><br><span class="${cls(r)}">${pct(r)}</span></div><div class="card"><span class="muted small">Just holding the Nifty</span><br><b style="font-size:32px" class="${cls(n)}">${pct(n)}</b></div><div class="card"><span class="muted small">Worst fall from your best</span><br><b style="font-size:32px">${pct(dd)}</b></div><div class="card"><span class="muted small">Trades and charges</span><br><b style="font-size:32px">${G.trades.length}</b><br>${inr(G.charges, 2)}</div></div>
    <div class="card" style="margin-top:16px">${chart()}</div>
    <div class="card stack" style="margin-top:16px"><b>GoodGuy's notes</b>${notes.map(t => `<p class="muted">${esc(t)}</p>`).join('')}<p class="small muted">GoodGuy reviews how you played, never which share to buy.</p></div>
    <div id="saveslot" style="margin-top:16px"></div>
    <div class="row" style="margin-top:20px"><button class="btn" data-act="again">Play the same dates again</button><button class="btn quiet" data-act="new">Pick new dates</button><button class="btn quiet" data-act="keep">Keep playing</button></div>
  </main>${footer()}`;
  savePrompt(document.getElementById('saveslot'), 'your game');
}

app.addEventListener('click', e => {
  const b = e.target.closest('[data-start],[data-step],[data-sym],[data-act]'); if (!b) return;
  if (b.dataset.start) return start(b.dataset.start === 'custom' ? document.getElementById('d').value : b.dataset.start);
  if (b.dataset.step) return step(G.i + (+b.dataset.step));
  if (b.dataset.sym) return trade(b.dataset.sym);
  const a = b.dataset.act;
  if (a === 'big') step(nextBig());
  if (a === 'finish') { G.done = true; save(); report(); }
  if (a === 'keep') { G.done = false; save(); play(); }
  if (a === 'again') { G = { ...G, i: G.i0, cash: G.base, hold: {}, trades: [], charges: 0, vals: [G.base], done: false }; save(); play(); }
  if (a === 'new') { try { localStorage.removeItem(KEY); } catch {} G = null; track(KEY); setup(); }
});
boot().catch(() => { app.innerHTML = '<main class="wrap" style="padding:48px 16px"><h1>Couldn\'t load the market data.</h1><p class="muted">Check your connection and refresh.</p></main>'; });

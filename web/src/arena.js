// Arena: the practice game for every OSE app. Make a player, pick Easy, Medium or Hard,
// clear the chapters of your class one world at a time; answers are checked on the server
// one by one, so leaderboards stay fair. Each course shows a readiness score.
import './shared/base.css';
import './arena.css';
import { esc, api, me, toast, sheet, accountSheet, footer } from './shared/ui.js';
import { ace } from './shared/mascots.js';
import { avatarSvg, AV, LABELS, EXTRAS, EXTRA_UNLOCK, SWATCH } from './arena-avatar.js';

const DIFFS = [['easy', 'Easy', 'Straight from the chapter. XP × 1'], ['medium', 'Medium', 'Exercise and unit-test level. XP × 1.5'], ['hard', 'Hard', 'Exemplar, board and exam level. XP × 2']];
const DNAME = Object.fromEntries(DIFFS.map(([k, n]) => [k, n])), OLD = { rookie: 'easy', pro: 'medium', legend: 'hard' };
const WEIGHT = { easy: 0.6, medium: 0.85, hard: 1 };
const BLURB = { maths: 'Every chapter of your NCERT maths book.', evs: 'The world around you, chapter by chapter.', science: 'Every chapter of your NCERT science book.', english: 'Grammar, words and reading for your class.', physics: 'NCERT physics, chapter by chapter.', chemistry: 'NCERT chemistry, chapter by chapter.', biology: 'NCERT biology, chapter by chapter.', qa: 'Arithmetic, algebra, geometry and more, at CAT level.', dilr: 'Data sets, arrangements, games and logic.', varc: 'Reading, para-jumbles, summaries and reasoning.', money: 'Budgets, interest, investing basics and scams. The GoodHabit course.', digital: 'Online safety, spreadsheets, AI and more.' };
const RANKS = [[0, 'Bronze'], [500, 'Silver'], [1500, 'Gold'], [3500, 'Diamond'], [7000, 'Champion']];
const app = document.getElementById('app');
const ls = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
const S = { user: null, player: null, adult: null, plan: null, cat: [], byId: {}, limit: { on: false }, local: ls.get('arena-guest') };
if (S.local && OLD[S.local.difficulty]) { S.local.difficulty = OLD[S.local.difficulty]; S.local.progress = {}; }   // the first Arena used other names

// ---- who is playing, and where they've got to ----
const prof = () => S.player || S.local;
const ranked = () => S.player?.status === 'ok';
const clsName = n => n === 13 ? 'College / CAT' : `Class ${n}`;
const visible = () => S.cat.filter(c => c.track === 'school' ? c.cls === prof().cls : c.track === 'cat' ? prof().cls >= 11 : prof().cls >= 6);
const board = (id, d = prof().difficulty) => `${id}.${d}`;
const progressMap = () => (ranked() ? S.player.progress : S.local?.progress) || {};
const prog = (id, d) => progressMap()[board(id, d)] || { max: 0, stars: {}, best: {} };
const cleared = () => Object.values(progressMap()).reduce((a, p) => a + (p.max || 0), 0);
const xpNow = () => (ranked() ? S.player.xp : S.local?.xp) || 0;
const rankOf = xp => RANKS.filter(([m]) => xp >= m).pop();
const nextRank = xp => RANKS.find(([m]) => m > xp);
const saveLocal = () => ls.set('arena-guest', S.local);
const lvl = (c, n) => c.levels[n - 1];
const chName = (c, no) => c.chapters.find(x => x.no === no)?.name || `Chapter ${no}`;
// readiness: every chapter counts; a chapter's mastery is its best score, weighted by how hard the band was
function readiness(c) {
  const chapters = c.levels.map((L, i) => [L, i + 1]).filter(([L]) => L.ch);
  if (!chapters.length) return 0;
  let sum = 0;
  for (const [, n] of chapters) sum += Math.max(...DIFFS.map(([d]) => (prog(c.id, d).best?.[n] || 0) / 100 * WEIGHT[d]));
  return Math.round(sum / chapters.length * 100);
}
const starRow = (n, size = 14) => `<span class="stars" style="--s:${size}px" aria-label="${n} of 3 stars">${[1, 2, 3].map(i => `<svg viewBox="0 0 24 24" class="${i <= n ? 'on' : ''}" aria-hidden="true"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z"/></svg>`).join('')}</span>`;
const badge = xp => `<span class="rank r-${rankOf(xp)[1].toLowerCase()}">${rankOf(xp)[1]}</span>`;
function xpBar(xp) {
  const [lo] = rankOf(xp), nx = nextRank(xp);
  if (!nx) return `<div class="xpbar" aria-label="${xp} XP, top rank"><i style="--p:1"></i></div><p class="small muted">${xp.toLocaleString('en-IN')} XP · top rank</p>`;
  const p = Math.round((xp - lo) / (nx[0] - lo) * 100);
  return `<div class="xpbar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress to ${nx[1]}"><i style="--p:${p / 100}"></i></div><p class="small muted">${xp.toLocaleString('en-IN')} XP · ${(nx[0] - xp).toLocaleString('en-IN')} to ${nx[1]}</p>`;
}
const ring = (pct, label) => `<span class="ready" style="--r:${pct}" role="img" aria-label="${label} ${pct}%"><b>${pct}%</b></span>`;

// ---- free minutes (only once payments are switched on) ----
const guestDay = () => { const d = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10), g = ls.get('arena-usage'); return g?.d === d ? g : { d, secs: 0 }; };
const addGuest = secs => { const g = guestDay(); g.secs += secs; ls.set('arena-usage', g); };
function minutesLeft() {
  if (!S.limit.on) return null;
  if (S.user) { const p = S.plan; if (!p || p.unlimited) return null; return Math.max(0, Math.ceil((p.freeSecs - p.usedSecs) / 60)); }
  return Math.max(0, S.limit.minutes - Math.floor(guestDay().secs / 60));
}

async function load() {
  const [{ user }, cat] = await Promise.all([me(true), api('/api/arena/courses')]);
  S.user = user; S.cat = cat.courses; S.byId = Object.fromEntries(cat.courses.map(c => [c.id, c])); S.limit = cat.limit; S.player = null; S.adult = null; S.plan = null;
  if (user) {
    const r = await api('/api/arena/player').catch(() => ({}));
    S.player = r.player || null; S.adult = r.adult; S.plan = r.plan;
    // first time signed in: the guest player and its cleared levels move into the account
    const levels = Object.fromEntries(Object.entries(S.local?.progress || {}).map(([k, v]) => [k, v.max || 0]));
    const behind = S.player && Object.entries(levels).some(([k, v]) => v > (S.player.progress[k]?.max || 0));
    if ((!S.player && S.local?.nick) || behind) {
      const src = S.player || S.local;
      try { S.player = (await api('/api/arena/player', { method: 'POST', body: { nick: src.nick, avatar: src.avatar, cls: src.cls, difficulty: src.difficulty, guestLevels: levels } })).player; } catch {}
    }
  }
}

// ---- screens ----
const tabs = cur => `<nav class="tabs" style="--n:3" aria-label="Arena"><div class="in">
  ${[['', 'Play', '<path d="M7 4l13 8-13 8z"/>'], ['lb', 'Ranks', '<path d="M4 20V11h4v9zM10 20V5h4v15zM16 20v-6h4v6z"/>'], ['me', 'Me', '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7z"/>']].map(([h, n, d]) => `<a href="#/${h}" ${cur === h ? 'aria-current="page"' : ''}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${d}</svg>${n}</a>`).join('')}
</div></nav>`;
const top = (right = '') => `<header class="bar"><div class="wrap"><a class="brand" href="#/"><span class="m">${ace()}</span>Arena</a>${right}</div></header>`;
const loginBtns = () => S.user ? '' : '<button class="btn small" data-act="signup">Sign up</button><button class="btn quiet small" data-act="login">Log in</button>';

function title() {
  const n = S.cat.reduce((a, c) => a + c.chapters.reduce((s, ch) => s + ch.n.easy + ch.n.medium + ch.n.hard, 0), 0);
  app.innerHTML = `${top(S.user ? '' : '<button class="btn quiet small" data-act="login">Log in</button>')}
  <main class="arena">
    <section class="wrap hero ahero">
      <div class="stack"><h1>Practise like it's a game.</h1>
        <p class="lede">Make your player, pick Easy, Medium or Hard, and clear your NCERT chapters one world at a time. Your readiness score tells you how ready you are for the test.</p>
        <div class="row"><a class="btn" href="#/make">Make your player</a>${S.user ? '' : '<button class="btn quiet" data-act="login">I have an account</button>'}</div>
        <p class="small muted">Classes 5 to 12 and CAT, free. ${n.toLocaleString('en-IN')} questions so far. Play as a guest; sign up only to save and join the leaderboards.</p></div>
      <div class="art">${ace()}</div>
    </section>
    <section class="wrap sec"><div class="how">
      <div class="card"><b>1. Your player</b><p class="muted">Build a character. Glasses, a cap and a crown unlock as you clear levels.</p></div>
      <div class="card"><b>2. Your difficulty</b><p class="muted">Easy, Medium or Hard. Every question also shows how hard it is and how long it should take.</p></div>
      <div class="card"><b>3. Chapter by chapter</b><p class="muted">One world per chapter in book order, and a boss after every four, against the clock.</p></div>
    </div></section>
  </main>${footer()}`;
}

let draft;
async function make() {
  const p = prof();
  draft = p ? JSON.parse(JSON.stringify({ nick: p.nick, avatar: p.avatar, cls: p.cls, difficulty: p.difficulty })) : { nick: (await api('/api/arena/nickname')).nick, avatar: { skin: Math.floor(Math.random() * 6), eyes: 1, hair: Math.floor(Math.random() * 5), hairColor: 0, shirt: 0, extra: 0 }, cls: null, difficulty: 'easy' };
  const have = cleared();
  const part = k => {
    if (SWATCH[k]) return SWATCH[k].map((c, i) => `<button class="sw" style="--c:${c}" data-part="${k}" data-v="${i}" aria-pressed="${draft.avatar[k] === i}" aria-label="${LABELS[k]} ${i + 1}"></button>`).join('');
    if (k === 'extra') return EXTRAS.map((n, i) => have >= EXTRA_UNLOCK[i] ? `<button class="chip" data-part="extra" data-v="${i}" aria-pressed="${draft.avatar.extra === i}">${n}</button>` : `<button class="chip" disabled title="Clear ${EXTRA_UNLOCK[i]} levels">${n} · ${EXTRA_UNLOCK[i]} levels</button>`).join('');
    return Array.from({ length: AV[k] }, (_, i) => `<button class="chip" data-part="${k}" data-v="${i}" aria-pressed="${draft.avatar[k] === i}">${k === 'hair' && i === 5 ? 'None' : i + 1}</button>`).join('');
  };
  const draw = () => {
    app.innerHTML = `${top()}<main class="arena wrap maker">
      <div class="preview card"><div class="big">${avatarSvg(draft.avatar, draft.nick)}</div>
        <div class="row nick"><b>${esc(draft.nick)}</b><button class="btn quiet small" data-act="reroll">New name</button></div>
        <p class="small muted">Names are picked for you, so nobody puts their real name on a leaderboard.</p></div>
      <div class="stack">
        <h1 class="h2">${prof() ? 'Edit your player' : 'Make your player'}</h1>
        <div><label>Your class</label><div class="classes">${Array.from({ length: 8 }, (_, i) => `<button class="chip" data-cls="${i + 5}" aria-pressed="${draft.cls === i + 5}">${i + 5}</button>`).join('')}<button class="chip wide2" data-cls="13" aria-pressed="${draft.cls === 13}">College / CAT</button></div></div>
        <div><label>Difficulty</label><div class="diffs">${DIFFS.map(([k, n, d]) => `<button class="diff d-${k}" data-diff="${k}" aria-pressed="${draft.difficulty === k}"><b>${n}</b><small>${d}</small></button>`).join('')}</div>
          ${prof() ? '<p class="small muted" style="margin-top:8px">Progress and leaderboards are kept separately for each difficulty; readiness counts all three.</p>' : ''}</div>
        ${Object.keys(AV).map(k => `<div><label>${LABELS[k]}</label><div class="row parts">${part(k)}</div></div>`).join('')}
        <p class="error" data-err role="alert"></p>
        <div class="row"><button class="btn" data-act="save">${prof() ? 'Save' : 'Start playing'}</button>${prof() ? '<a class="btn quiet" href="#/">Cancel</a>' : ''}</div>
      </div></main>`;
  };
  draw();
  app.onclick = async e => {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    if (b.dataset.part) { draft.avatar[b.dataset.part] = +b.dataset.v; return draw(); }
    if (b.dataset.cls) { draft.cls = +b.dataset.cls; return draw(); }
    if (b.dataset.diff) { draft.difficulty = b.dataset.diff; return draw(); }
    if (b.dataset.act === 'reroll') { draft.nick = (await api('/api/arena/nickname')).nick; return draw(); }
    if (b.dataset.act === 'save') {
      const err = app.querySelector('[data-err]');
      if (!draft.cls) { err.textContent = 'Pick your class.'; return; }
      S.local = { ...(S.local || { progress: {}, xp: 0 }), ...draft }; saveLocal();
      if (S.user) {
        b.setAttribute('aria-busy', 'true');
        try { S.player = (await api('/api/arena/player', { method: 'POST', body: draft })).player; }
        catch (x) { err.textContent = x.message; b.removeAttribute('aria-busy'); return; }
      }
      app.onclick = null; location.hash = '#/';
    }
  };
}

function statusCard() {
  if (!S.user) return `<div class="card note stack"><b>Playing as a guest</b><p class="muted">Your levels are saved on this device. Sign up free to keep them on every device and get on the leaderboard.</p><div class="row">${loginBtns()}</div><p class="small muted">Under 13? Keep playing as a guest. Accounts are for 13 and over.</p></div>`;
  const p = S.player; if (!p || p.status === 'ok') return '';
  const ask = `<form class="row" data-parent><input name="parent" placeholder="Their OpenID" autocapitalize="off" aria-label="Parent's OpenID" style="max-width:240px"><button class="btn small">Ask them</button></form>`;
  if (p.status === 'waiting') return `<div class="card note stack"><b>Waiting for @${esc(p.parent)}</b><p class="muted">They open Arena, go to Me, and tap Approve. Keep playing: the leaderboard starts once they say yes.</p></div>`;
  return `<div class="card note stack"><b>${p.status === 'declined' ? `@${esc(p.parent)} said not yet` : 'Ask a parent to approve you'}</b><p class="muted">You're under 18, so a parent or guardian approves you before you're ranked. You can play every level meanwhile. Type their OpenID; they need a free account too.</p>${ask}<p class="error" data-err role="alert"></p></div>`;
}
function minutesCard() {
  const left = minutesLeft(); if (left === null) return '';
  return `<div class="card note row mins"><span class="grow"><b>${left} free minute${left === 1 ? '' : 's'} left today</b><small class="muted"> · ${S.limit.minutes} a day, free. Unlimited for ₹${S.limit.price} for ${S.limit.days} days.</small></span><button class="btn small" data-act="unlock">Unlock</button></div>`;
}

function home() {
  const p = prof(), xp = xpNow(), cs = visible();
  app.innerHTML = `${top(loginBtns())}<main class="arena wrap stack homegrid">
    <a class="card player" href="#/make" aria-label="Edit your player">
      <span class="pav">${avatarSvg(p.avatar, p.nick)}</span>
      <span class="grow stack" style="gap:6px"><span class="row" style="gap:8px"><b class="pn">${esc(p.nick)}</b>${badge(xp)}</span>
        <span class="small muted">${clsName(p.cls)} · <span class="dtag d-${p.difficulty}">${DNAME[p.difficulty]}</span>${ranked() ? '' : ' · not ranked yet'}</span>${xpBar(xp)}</span>
    </a>
    ${statusCard()}${minutesCard()}
    <h2>Your courses</h2>
    ${cs.length ? `<div class="courses">${cs.map(c => {
      const g = prog(c.id), r = readiness(c), total = c.levels.length;
      return `<a class="course card" href="#/c/${c.id}"><span class="row" style="justify-content:space-between;align-items:flex-start;flex-wrap:nowrap"><span class="stack" style="gap:2px;min-width:0"><b>${esc(c.name)}</b><small class="muted">${esc(c.readiness)}</small></span>${ring(r, c.readiness)}</span>
        <p class="small muted">${esc(BLURB[c.subject] || '')}</p><div class="meter" aria-hidden="true"><i style="--p:${g.max / total}"></i></div><p class="small"><b>${g.max}</b> of ${total} levels · ${c.chapters.length} chapters</p></a>`;
    }).join('')}</div>` : `<div class="card"><p class="muted">Questions for ${clsName(p.cls).toLowerCase()} are being written now. Meanwhile try another class from your player.</p></div>`}
  </main>${footer()}${tabs('')}`;
}

function map(id) {
  const c = S.byId[id]; if (!c) { location.hash = '#/'; return; }
  const g = prog(id), x = [0, 56, 84, 56, 0, -56, -84, -56];
  let html = '', seenCh = 0;
  c.levels.forEach((L, i) => {
    const n = i + 1, done = n <= g.max, open = n === g.max + 1, st = g.stars?.[n] || 0;
    if (L.ch) { seenCh++; html += `<li class="world"><span>Chapter ${L.ch} · ${esc(chName(c, L.ch))}</span></li>`; }
    html += `<li style="--x:${x[n % 8]}px"><button class="node ${L.boss ? 'boss' : ''} ${done ? 'done' : open ? 'open' : 'locked'}" data-level="${n}" ${done || open ? '' : 'disabled'} aria-label="${L.boss ? `Boss for chapters ${L.boss.join(', ')}` : `Chapter ${L.ch}`}${done ? `, cleared, ${st} stars` : open ? ', next' : ', locked'}">
      <span class="num">${L.boss ? 'Boss' : L.ch}</span></button>${done ? starRow(st, 12) : open ? '<span class="small here">Next</span>' : ''}</li>`;
  });
  const r = readiness(c);
  app.innerHTML = `${top()}<main class="arena wrap">
    <div class="row maphead"><a class="btn quiet small" href="#/">Back</a><span class="grow"><h1 class="h2">${esc(c.name)}</h1><span class="small muted">${c.track === 'school' ? `${clsName(c.cls)} · ` : ''}<span class="dtag d-${prof().difficulty}">${DNAME[prof().difficulty]}</span> · ${g.max} of ${c.levels.length} · ${esc(c.readiness)} ${r}%</span></span><a class="btn quiet small" href="#/lb/${c.id}">Ranks</a></div>
    <ol class="path">${html}</ol>
  </main>${tabs('')}`;
  app.querySelector('.node.open')?.scrollIntoView({ block: 'center', behavior: 'instant' });
  app.onclick = e => { const b = e.target.closest('[data-level]'); if (b) { app.onclick = null; play(id, +b.dataset.level); } };
}

// ---- paying for unlimited (a parent pays for a child under 18) ----
function loadCheckout() { return window.Razorpay ? Promise.resolve() : new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://checkout.razorpay.com/v1/checkout.js'; s.onload = ok; s.onerror = () => no(new Error('Couldn\'t open payments. Check your connection.')); document.head.append(s); }); }
async function pay(child) {
  const o = await api('/api/arena/pay/order', { method: 'POST', body: child ? { child } : {} });
  await loadCheckout();
  return new Promise((ok, no) => {
    const rz = new window.Razorpay({ key: o.key, amount: o.amount, currency: o.currency, order_id: o.order, name: 'Arena', description: `Unlimited practice for ${S.limit.days} days`, theme: { color: '#5B2FE0' },
      handler: async r => { try { ok(await api('/api/arena/pay/verify', { method: 'POST', body: { order: r.razorpay_order_id, payment: r.razorpay_payment_id, signature: r.razorpay_signature } })); } catch (x) { no(x); } },
      modal: { ondismiss: () => no(new Error('Payment cancelled.')) } });
    rz.open();
  });
}
function unlockSheet(why) {
  const adult = S.user && S.adult;
  sheet(`<div class="stack"><h2>Unlimited practice</h2>${why ? `<p>${esc(why)}</p>` : ''}
    <p class="muted">Arena is free for ${S.limit.minutes} minutes of questions every day. For ₹${S.limit.price} you get unlimited practice for ${S.limit.days} days. One payment, no auto-renew, no ads ever.</p>
    ${!S.user ? `<p class="muted">Sign up first, so the unlock stays with your account.</p><div class="row">${loginBtns()}</div>`
      : adult ? `<button class="btn" data-pay>Pay ₹${S.limit.price}</button>` : '<p><b>Ask a parent.</b> They open Arena on their phone, go to Me, and unlock it for you.</p>'}
    <p class="error" data-err role="alert"></p></div>`, d => {
    const b = d.querySelector('[data-pay]'); if (!b) return;
    b.onclick = async () => { b.setAttribute('aria-busy', 'true'); try { S.plan = await pay(); d.close(); toast(`Unlimited until ${new Date(S.plan.until).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`); route(); } catch (x) { d.querySelector('[data-err]').textContent = x.message; } finally { b.removeAttribute('aria-busy'); } };
  });
}

// ---- a level ----
let timer;
async function play(id, level) {
  clearInterval(timer);
  const c = S.byId[id];
  if (!S.user && minutesLeft() === 0) { unlockSheet(`That's your ${S.limit.minutes} free minutes for today.`); return map(id); }
  let r;
  try {
    const res = await fetch('/api/arena/round', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ course: id, difficulty: prof().difficulty, level }) });
    r = await res.json();
    if (res.status === 402) { unlockSheet(r.error); return map(id); }
    if (!res.ok) throw new Error(r.error || 'Something went wrong.');
  } catch (x) { toast(x.message); return map(id); }
  const L = lvl(c, level), st = { i: 0, right: 0, streak: 0, answered: false, ends: r.seconds ? Date.now() + r.seconds * 1000 : 0, done: false, log: {}, last: Date.now() };
  const finish = async () => {
    if (st.done) return; st.done = true; clearInterval(timer); document.onkeydown = null;
    let res; try { res = await api(`/api/arena/round/${r.round}`, { method: 'POST', body: { action: 'finish' } }); } catch (x) { toast(x.message); return map(id); }
    result(id, level, res);
  };
  const draw = () => {
    const q = r.questions[st.i];
    app.innerHTML = `<main class="arena wrap game d-${q.band}">
      <div class="row ghead"><button class="btn quiet small" data-act="quit">Leave</button>
        <span class="grow"><b>${L.boss ? 'Boss' : `Chapter ${L.ch}`}</b> <span class="small muted">· ${esc(L.boss ? `chapters ${L.boss.join(', ')}` : chName(c, L.ch))}</span></span>
        <span class="streak ${st.streak > 1 ? 'hot' : ''}" aria-label="Streak ${st.streak}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z"/></svg>${st.streak}</span></div>
      <div class="pips" style="--n:${r.questions.length}" aria-hidden="true">${r.questions.map((_, i) => `<i class="${i < st.i ? (st.log[i] ? 'ok' : 'no') : i === st.i ? 'cur' : ''}"></i>`).join('')}</div>
      ${r.boss ? '<div class="clock" aria-hidden="true"><i data-clock></i></div><p class="small muted" data-secs></p>' : ''}
      <section class="card qcard"><p class="qmeta small"><span class="dtag d-${q.band}">${DNAME[q.band]}</span> <span class="hard" aria-label="Hardness ${q.h} out of 10">${'<i></i>'.repeat(10)}</span> ${q.h}/10 · about ${q.t} s · question ${st.i + 1} of ${r.questions.length}</p>
        <h2 class="q">${esc(q.q)}</h2>
        <div class="opts">${q.o.map((o, j) => `<button class="opt" data-o="${j}"><span class="k">${j + 1}</span><span>${esc(o)}</span></button>`).join('')}</div>
        <div data-why aria-live="polite"></div></section>
    </main>`;
    app.querySelectorAll('.hard i').forEach((el, k) => { if (k < q.h) el.className = 'on'; });
    tick();
  };
  const tick = () => {
    if (!st.ends) return; const left = Math.max(0, st.ends - Date.now()), el = app.querySelector('[data-clock]'), s = app.querySelector('[data-secs]');
    if (el) el.style.setProperty('--p', left / (r.seconds * 1000)); if (s) s.textContent = `${Math.ceil(left / 1000)} seconds left`;
    if (left <= 0) finish();
  };
  const answer = async j => {
    if (st.answered || st.done) return; st.answered = true;
    const btns = app.querySelectorAll('.opt'); btns.forEach(b => { b.disabled = true; }); btns[j].setAttribute('aria-pressed', 'true');
    let a; try { a = await api(`/api/arena/round/${r.round}`, { method: 'POST', body: { action: 'answer', i: st.i, choice: j } }); } catch (x) { toast(x.message); st.answered = false; btns.forEach(b => { b.disabled = false; }); return; }
    if (!S.user && S.limit.on) { addGuest(Math.min(180, (Date.now() - st.last) / 1000)); st.last = Date.now(); }
    btns[a.correct].classList.add('right'); if (!a.right) { btns[j].classList.add('wrong'); navigator.vibrate?.(60); }
    st.log[st.i] = a.right; if (a.right) { st.right++; st.streak++; } else st.streak = 0;
    const last = st.i === r.questions.length - 1;
    app.querySelector('[data-why]').innerHTML = `<div class="why ${a.right ? 'good' : 'bad'}"><b>${a.right ? (st.streak > 2 ? `Streak of ${st.streak}!` : 'Right') : 'Not quite'}</b><p>${esc(a.why)}</p></div><button class="btn" data-act="next" style="width:100%">${last ? 'See result' : 'Next question'}</button>`;
    const s = app.querySelector('.streak'); s.lastChild.textContent = st.streak; s.classList.toggle('hot', st.streak > 1);
    app.querySelector('[data-act="next"]').focus();
  };
  app.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.o) return answer(+b.dataset.o);
    if (b.dataset.act === 'next') { if (st.i === r.questions.length - 1) return finish(); st.i++; st.answered = false; st.last = Date.now(); return draw(); }
    if (b.dataset.act === 'quit') { clearInterval(timer); st.done = true; document.onkeydown = null; app.onclick = null; map(id); }
  };
  document.onkeydown = e => { if (/^[1-4]$/.test(e.key) && !st.answered) answer(+e.key - 1); };
  draw(); if (st.ends) timer = setInterval(tick, 250);
}

function result(id, level, res) {
  const c = S.byId[id], k = board(id), before = xpNow(), readyBefore = readiness(c);
  if (res.player) S.player = res.player;
  else {   // unranked: keep it on this device
    S.local = S.local || { ...prof(), progress: {}, xp: 0 }; S.local.progress = S.local.progress || {};
    const g = S.local.progress[k] || { max: 0, stars: {}, best: {} };
    if (res.passed) { g.max = Math.max(g.max, level); g.stars = { ...g.stars, [level]: Math.max(g.stars[level] || 0, res.stars) }; }
    g.best = { ...(g.best || {}), [level]: Math.max(g.best?.[level] || 0, res.pct) };
    S.local.progress[k] = g; S.local.xp = (S.local.xp || 0) + res.xp; saveLocal();
  }
  if (S.user) api('/api/arena/plan').then(p => { S.plan = p; }).catch(() => {});
  const after = xpNow(), up = rankOf(after)[1] !== rankOf(before)[1], readyAfter = readiness(c), L = lvl(c, level);
  app.innerHTML = `${top()}<main class="arena wrap result">
    <section class="card stack center">
      ${starRow(res.stars, 44)}
      <h1 class="h2">${res.passed ? (L.boss ? 'Boss beaten!' : 'Chapter cleared!') : res.late ? 'Out of time' : 'Not this time'}</h1>
      <p class="muted">${res.right} of ${res.total} right${res.passed ? '' : `. You need ${res.need} to clear it.`} · best streak ${res.best} · ${res.secs} second${res.secs === 1 ? '' : 's'}${res.par ? ` (par ${res.par})` : ''}</p>
      <p class="xpgain">+<span data-count="${res.xp}">0</span> XP</p>
      ${res.ranked ? '' : `<p class="small muted">${S.user ? 'Practice XP: it counts once you\'re ranked.' : 'Guest XP is kept on this device only.'}</p>`}
      <p class="readyline">${esc(c.readiness)}: <b>${readyAfter}%</b>${readyAfter > readyBefore ? ` <span class="up">+${readyAfter - readyBefore}</span>` : ''}</p>
      ${up ? `<p class="newrank">New rank: ${badge(after)}</p>` : ''}
      <div class="wide">${xpBar(after)}</div>
      <div class="row" style="justify-content:center">
        ${res.passed && level < c.levels.length ? `<button class="btn" data-go="${level + 1}">Next level</button>` : ''}
        <button class="btn ${res.passed ? 'quiet' : ''}" data-go="${level}">${res.passed ? 'Play again' : 'Try again'}</button>
        <a class="btn quiet" href="#/c/${id}">Map</a></div>
    </section>
    ${S.user ? '' : `<div class="card note stack"><b>Keep your progress</b><p class="muted">Sign up free with an OpenID or GoodID to save this on every device and get on the leaderboard.</p><div class="row">${loginBtns()}</div></div>`}
  </main>`;
  const n = app.querySelector('[data-count]'), t0 = performance.now(), to = res.xp, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step = t => { const p = reduce ? 1 : Math.min(1, (t - t0) / 900); n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
  app.onclick = e => { const b = e.target.closest('[data-go]'); if (b) { app.onclick = null; play(id, +b.dataset.go); } };
}

// ---- leaderboards ----
async function leaderboard(id, period = 'week') {
  const cs = visible(); if (!S.byId[id] || !cs.some(c => c.id === id)) id = cs[0]?.id;
  if (!id) { app.innerHTML = `${top(loginBtns())}<main class="arena wrap stack"><h1 class="h2">Leaderboard</h1><p class="muted">No courses for your class yet.</p></main>${tabs('lb')}`; return; }
  const c = S.byId[id], d0 = prof().difficulty;
  app.innerHTML = `${top(loginBtns())}<main class="arena wrap stack"><h1 class="h2">Leaderboard</h1><p class="muted">Loading…</p></main>${tabs('lb')}`;
  let d; try { d = await api(`/api/arena/leaderboard?course=${id}&difficulty=${d0}&period=${period}`); } catch (x) { toast(x.message); d = { rows: [] }; }
  app.innerHTML = `${top(loginBtns())}<main class="arena wrap stack">
    <h1 class="h2">Leaderboard</h1>
    <div class="row seg" role="group" aria-label="Course">${cs.map(x => `<button class="chip" data-c="${x.id}" aria-pressed="${x.id === id}">${esc(x.name)}</button>`).join('')}</div>
    <div class="row seg" role="group" aria-label="Period"><button class="chip" data-p="week" aria-pressed="${period === 'week'}">This week</button><button class="chip" data-p="all" aria-pressed="${period === 'all'}">All time</button></div>
    <p class="small muted">${c.track === 'school' ? `${clsName(c.cls)} · ` : ''}${DNAME[d0]}. Players are only ranked against the same course and difficulty.</p>
    ${d.rows.length ? `<ol class="list lb">${d.rows.map(r => `<li class="item ${r.me ? 'mine' : ''}"><span class="place">${r.place}</span><span class="lav">${avatarSvg(r.avatar, r.nick)}</span><span class="grow"><b>${esc(r.nick)}${r.me ? ' (you)' : ''}</b></span>${badge(r.xp)}<span class="pts">${r.xp.toLocaleString('en-IN')}</span></li>`).join('')}</ol>`
      : `<div class="card"><p class="muted">Nobody's on this board yet${period === 'week' ? ' this week' : ''}. Clear a chapter and it's yours.</p></div>`}
    ${d.me && d.me.place > 50 ? `<p class="small">You're number ${d.me.place} of ${d.total} with ${d.me.xp} XP.</p>` : ''}
    ${ranked() ? '' : `<p class="small muted">${S.user ? 'You\'ll show up here once you\'re approved.' : 'Sign up free to get on the board.'}</p>`}
  </main>${tabs('lb')}`;
  app.onclick = e => { const b = e.target.closest('button'); if (b?.dataset.c) leaderboard(b.dataset.c, period); if (b?.dataset.p) leaderboard(id, b.dataset.p); };
}

// ---- me, and parents approving ----
async function mePage() {
  const p = prof(), xp = p ? xpNow() : 0;
  let kids = [];
  if (S.user && S.adult) kids = (await api('/api/arena/parent').catch(() => ({ children: [] }))).children;
  const plan = S.plan, until = plan?.until && plan.until > Date.now() ? new Date(plan.until).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
  app.innerHTML = `${top(loginBtns())}<main class="arena wrap stack">
    ${p?.cls ? `<section class="card player static"><span class="pav">${avatarSvg(p.avatar, p.nick)}</span><span class="grow stack" style="gap:6px"><span class="row" style="gap:8px"><b class="pn">${esc(p.nick)}</b>${badge(xp)}</span><span class="small muted">${cleared()} levels cleared · ${clsName(p.cls)} · ${DNAME[p.difficulty]}</span>${xpBar(xp)}</span></section>
    <div class="row"><a class="btn quiet" href="#/make">Edit player, class or difficulty</a></div>
    ${statusCard()}
    <section class="stack"><h2>Readiness</h2><div class="list">${visible().map(c => `<a class="item" href="#/c/${c.id}"><span class="grow"><b>${esc(c.name)}</b><small>${esc(c.readiness)}</small></span>${ring(readiness(c), c.readiness)}</a>`).join('') || '<div class="item"><span class="muted">No courses for your class yet.</span></div>'}</div></section>`
      : '<div class="card stack"><b>No player yet</b><p class="muted">You don\'t need one to approve your child. Want to play too?</p><div class="row"><a class="btn" href="#/make">Make a player</a></div></div>'}
    ${S.limit.on ? `<section class="stack"><h2>Plan</h2><div class="list"><div class="item"><span class="grow"><b>${until ? `Unlimited until ${until}` : 'Free'}</b><small>${until ? 'Thanks for backing Arena.' : `${S.limit.minutes} minutes of questions a day. ₹${S.limit.price} unlocks ${S.limit.days} days of unlimited practice.`}</small></span>${until ? '' : '<button class="btn small" data-act="unlock">Unlock</button>'}</div></div></section>` : ''}
    ${S.user ? `<section class="stack"><h2>Account</h2><div class="list"><div class="item"><span class="grow"><b>@${esc(S.user.handle)}</b><small>Your OpenID. Arena uses it to save your progress.</small></span><a class="btn quiet small" href="/">Manage</a></div></div></section>` : ''}
    ${S.user && S.adult ? `<section class="stack"><h2>For parents</h2>${kids.length ? `<div class="list">${kids.map(c => `<div class="item"><span class="grow"><b>${esc(c.name)} (@${esc(c.handle)})</b><small>Plays as ${esc(c.nick)} · ${c.status === 'ok' ? 'approved' : c.status === 'declined' ? 'not approved' : 'waiting for you'}${S.limit.on ? ` · ${c.plan?.unlimited ? 'unlimited' : 'free plan'}` : ''}</small></span>${c.status === 'ok' ? `${S.limit.on && !c.plan?.unlimited ? `<button class="btn small" data-paykid="${esc(c.id)}">Unlock ₹${S.limit.price}</button>` : ''}<button class="btn quiet small" data-kid="${esc(c.id)}" data-ok="0">Remove</button>` : `<button class="btn small" data-kid="${esc(c.id)}" data-ok="1">Approve</button>${c.status === 'waiting' ? `<button class="btn quiet small" data-kid="${esc(c.id)}" data-ok="0">Not yet</button>` : ''}`}</div>`).join('')}</div>` : `<p class="muted">When your child asks you to approve them, they show up here. They'll type your OpenID: <b>@${esc(S.user.handle)}</b>.</p>`}
      <p class="small muted">Approving lets their nickname and XP appear on leaderboards. Their real name is never shown there.</p></section>` : ''}
    <p class="small muted">Arena is part of <a href="/">OpenSource Everything</a>: built in the open, no ads ever.</p>
  </main>${footer()}${tabs('me')}`;
  app.onclick = async e => {
    const pk = e.target.closest('[data-paykid]');
    if (pk) { pk.setAttribute('aria-busy', 'true'); try { await pay(pk.dataset.paykid); toast('Unlocked for 30 days'); mePage(); } catch (x) { toast(x.message); pk.removeAttribute('aria-busy'); } return; }
    const b = e.target.closest('[data-kid]'); if (!b) return;
    try { await api('/api/arena/parent/approve', { method: 'POST', body: { child: b.dataset.kid, approve: b.dataset.ok === '1' } }); toast(b.dataset.ok === '1' ? 'Approved' : 'Done'); mePage(); } catch (x) { toast(x.message); }
  };
}

// ---- wiring ----
document.addEventListener('click', e => {
  if (e.target.closest('[data-act="unlock"]')) return unlockSheet();
  const b = e.target.closest('[data-act="login"],[data-act="signup"]'); if (!b) return;
  b.closest('dialog')?.close();
  accountSheet({ app: 'ose', mode: b.dataset.act, onDone: async () => { await load(); route(); } });
});
document.addEventListener('submit', async e => {
  if (!e.target.matches('[data-parent]')) return; e.preventDefault();
  const err = app.querySelector('[data-err]');
  try { S.player = (await api('/api/arena/parent/request', { method: 'POST', body: { parent: new FormData(e.target).get('parent') } })).player; route(); toast('Asked. They approve it from Arena, under Me.'); }
  catch (x) { if (err) err.textContent = x.message; }
});

function route() {
  clearInterval(timer); document.onkeydown = null; app.onclick = null;
  const [r, arg, arg2] = location.hash.replace(/^#\/?/, '').split('/');
  if (r === 'make') return make();
  if (r === 'me' && (S.user || prof()?.cls)) return mePage();   // parents can approve without a player of their own
  if (!prof()?.cls) return title();
  if (r === 'c') return map(arg);
  if (r === 'lb') return leaderboard(arg, arg2);
  home();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
load().then(route).catch(() => { app.innerHTML = `<main class="wrap sec"><h1>Arena</h1><p class="muted">Couldn't reach the server. Check your connection and reload.</p></main>`; });

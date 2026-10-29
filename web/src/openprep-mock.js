import './shared/base.css';
import './mock.css';
import { esc, api, me, toast, sheet, accountSheet, footer } from './shared/ui.js';
import { buddy } from './shared/mascots.js';
import { MOCK1 as M } from './data/mock1.js';

const app = document.getElementById('app');
document.documentElement.style.setProperty('--accent', '#1B4DFF');
const KEY = `op-${M.id}`, SEC_MS = M.minutesPerSection * 60000;
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; } };
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
let S = load(), tick = null;
const total = M.sections.reduce((a, s) => a + s.questions.length, 0);

// text with simple tables and bullet lines, from the question data
function rich(t) {
  const out = []; let rows = [];
  const flush = () => { if (!rows.length) return; const r = rows.filter(x => !/^\|\s*-/.test(x)).map(x => x.split('|').slice(1, -1).map(c => c.trim())); out.push(`<div class="tablewrap"><table><thead><tr>${r[0].map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${r.slice(1).map(row => `<tr>${row.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`); rows = []; };
  for (const line of t.split('\n')) { if (line.startsWith('|')) { rows.push(line); continue; } flush(); if (line.trim()) out.push(`<p>${esc(line)}</p>`); }
  flush(); return out.join('');
}
const correct = (q, v) => v == null || v === '' ? null : q.type === 'mcq' ? v === q.a : (() => { const a = String(v).trim().replace(/\s+/g, ''), b = q.a; return a === b || (!isNaN(parseFloat(a)) && /^-?[\d.]+$/.test(a) && parseFloat(a) === parseFloat(b)); })();
const marks = (q, v) => { const c = correct(q, v); return c === null ? 0 : c ? 3 : q.type === 'mcq' ? -1 : 0; };

function intro() {
  const prev = S && S.finished ? S : null;
  app.innerHTML = `<header class="bar"><div class="wrap"><a class="brand" href="/openprep/"><span class="m">${buddy()}</span>OpenPrep</a><a class="btn quiet small" href="/openprep/learn/">Lessons</a></div></header>
  <main class="wrap" style="max-width:760px;padding-block:32px 48px">
    <h1>${esc(M.title)}</h1><p class="lede muted" style="font-size:19px;margin:10px 0 24px">Free. The full CAT pattern, with every answer explained at the end.</p>
    <div class="list">${M.sections.map(s => `<div class="item"><span class="grow"><b>${esc(s.name)}</b><small>${s.questions.length} questions, ${M.minutesPerSection} minutes</small></span></div>`).join('')}</div>
    <div class="card stack" style="margin-top:16px"><b>How it works</b>
      <p class="muted">${total} questions in 3 sections, ${M.minutesPerSection} minutes each, ${M.minutesPerSection * 3} minutes in all. Once a section ends you can't go back to it, like the real exam.</p>
      <p class="muted">Right answer: +3. Wrong multiple-choice answer: −1. Type-in answers never lose marks. Skipping is 0.</p>
      <p class="muted">Your progress saves on this device, so a refresh won't lose it.</p></div>
    <div class="row" style="margin-top:24px">${S && !S.finished ? '<button class="btn" data-act="resume">Resume your mock</button><button class="btn quiet" data-act="restart">Start again</button>' : '<button class="btn" data-act="start">Start the mock</button>'}${prev ? '<button class="btn quiet" data-act="results">See your last result</button>' : ''}</div>
  </main>${footer()}`;
}
function start() { S = { sec: 0, q: 0, ends: [Date.now() + SEC_MS], ans: {}, mark: {}, seen: {}, finished: false }; save(); exam(); }
const k = (s, q) => `${s}.${q}`;

function exam() {
  clearInterval(tick);
  const sec = M.sections[S.sec], q = sec.questions[S.q], key = k(S.sec, S.q), v = S.ans[key];
  S.seen[key] = true; save();
  const ctx = q.passage || q.set;
  app.innerHTML = `<header class="bar exambar"><div class="wrap"><b>${esc(sec.short)}</b><span class="muted small">Section ${S.sec + 1} of 3</span><span class="timer" id="timer" aria-live="off"></span><button class="btn small" data-act="endsec">${S.sec < 2 ? 'Submit section' : 'Finish mock'}</button></div></header>
  <main class="wrap exam ${ctx ? 'has-ctx' : ''}">
    ${ctx ? `<section class="ctx card">${rich(ctx)}</section>` : ''}
    <section class="qpane">
      <p class="muted small">Question ${S.q + 1} of ${sec.questions.length}${q.type === 'tita' ? ', type your answer' : ''}</p>
      <div class="qtext">${rich(q.q)}</div>
      ${q.type === 'mcq' ? `<div class="opts">${q.o.map((o, j) => `<button class="opt" data-o="${j}" aria-pressed="${v === j}"><b>${'ABCD'[j]}.</b> ${esc(o)}</button>`).join('')}</div>`
        : `<div class="field"><label for="tita">Your answer</label><input id="tita" inputmode="decimal" autocomplete="off" value="${esc(v ?? '')}" style="max-width:260px"></div>`}
      <div class="row qacts"><button class="btn quiet small" data-act="prev" ${S.q === 0 ? 'disabled' : ''}>Previous</button><button class="btn quiet small" data-act="clear">Clear</button><button class="btn quiet small" data-act="mark">${S.mark[key] ? 'Unmark' : 'Mark for review'}</button><button class="btn small" data-act="next">${S.q < sec.questions.length - 1 ? 'Save and next' : 'Save'}</button></div>
      <nav class="palette" aria-label="Questions">${sec.questions.map((_, i) => { const kk = k(S.sec, i), st = S.mark[kk] ? 'marked' : S.ans[kk] != null && S.ans[kk] !== '' ? 'done' : S.seen[kk] ? 'seen' : ''; return `<button data-go="${i}" class="${st} ${i === S.q ? 'cur' : ''}" aria-label="Question ${i + 1}${st ? ', ' + st : ''}">${i + 1}</button>`; }).join('')}</nav>
      <p class="small muted legend"><span class="sw done"></span>Answered <span class="sw marked"></span>Marked <span class="sw seen"></span>Seen</p>
    </section>
  </main>`;
  const t = document.getElementById('tita'); if (t) t.oninput = () => { S.ans[key] = t.value.trim(); save(); };
  const draw = () => { const left = Math.max(0, S.ends[S.sec] - Date.now()), m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60; const el = document.getElementById('timer'); if (el) { el.textContent = `${m}:${String(s).padStart(2, '0')} left`; el.classList.toggle('low', left < 300000); } if (!left) { toast('Time\'s up for this section.'); nextSection(); } };
  draw(); tick = setInterval(draw, 1000);
}
function nextSection() {
  clearInterval(tick);
  if (S.sec < 2) { S.sec++; S.q = 0; S.ends[S.sec] = Date.now() + SEC_MS; save(); exam(); }
  else { S.finished = true; S.doneAt = Date.now(); save(); results(true); }
}

async function results(fresh) {
  clearInterval(tick);
  const per = M.sections.map((s, i) => { let score = 0, right = 0, wrong = 0, att = 0; s.questions.forEach((q, j) => { const v = S.ans[k(i, j)], c = correct(q, v); if (c !== null) { att++; c ? right++ : wrong++; } score += marks(q, v); }); return { name: s.short, score, right, wrong, att, n: s.questions.length }; });
  const score = per.reduce((a, p) => a + p.score, 0), max = total * 3;
  app.innerHTML = `<header class="bar"><div class="wrap"><a class="brand" href="/openprep/"><span class="m">${buddy()}</span>OpenPrep</a><a class="btn quiet small" href="/openprep/learn/">Lessons</a></div></header>
  <main class="wrap" style="max-width:820px;padding-block:28px 48px">
    <h1>Your score: ${score} of ${max}</h1>
    <p class="muted" id="pct" style="margin:8px 0 20px">Checking how others did…</p>
    <div class="tablewrap"><table><thead><tr><th>Section</th><th>Score</th><th>Right</th><th>Wrong</th><th>Skipped</th><th>Accuracy</th></tr></thead><tbody>${per.map(p => `<tr><td>${p.name}</td><td><b>${p.score}</b></td><td>${p.right}</td><td>${p.wrong}</td><td>${p.n - p.att}</td><td>${p.att ? Math.round(p.right / p.att * 100) + '%' : '–'}</td></tr>`).join('')}</tbody></table></div>
    <div class="row" style="margin:20px 0 28px"><a class="btn" href="#review">Review every answer</a><button class="btn quiet" data-act="restart">Take it again</button><a class="btn quiet" href="/openprep/learn/">Practise with lessons</a></div>
    <h2 id="review" style="margin-bottom:12px">Every answer, explained</h2>
    ${M.sections.map((s, i) => `<h3 style="margin:24px 0 8px">${esc(s.name)}</h3><div class="stack">${s.questions.map((q, j) => { const v = S.ans[k(i, j)], c = correct(q, v); return `<details class="card"><summary><b>${j + 1}.</b> ${c === null ? '<span class="muted">Skipped</span>' : c ? '<span style="color:var(--good)">Right, +3</span>' : `<span style="color:var(--bad)">Wrong${q.type === 'mcq' ? ', −1' : ', 0'}</span>`}</summary>${q.passage || q.set ? '<p class="small muted" style="margin-top:8px">From the passage or set above in the test.</p>' : ''}<div class="qtext" style="margin-top:8px">${rich(q.q)}</div><p style="margin-top:8px">Your answer: <b>${v == null || v === '' ? 'none' : q.type === 'mcq' ? esc(q.o[v]) : esc(v)}</b>. Correct: <b>${q.type === 'mcq' ? esc(q.o[q.a]) : esc(q.a)}</b>.</p><p class="why" style="margin-top:6px">${esc(q.why)}</p></details>`; }).join('')}</div>`).join('')}
  </main>${footer()}`;
  const pct = document.getElementById('pct');
  const { user } = await me();
  const sections = Object.fromEntries(per.map(p => [p.name, p.score]));
  try {
    const st = user && fresh && !S.sent ? await api(`/api/mocks/${M.id}/result`, { method: 'POST', body: { score, sections } }) : await api(`/api/mocks/${M.id}/stats`);
    if (user && fresh) { S.sent = true; save(); }
    pct.innerHTML = st.percentile != null ? `Your percentile among ${st.takers} people who took this mock: <b>${st.percentile}</b>.` : `${st.takers} ${st.takers === 1 ? 'person has' : 'people have'} taken this mock so far. Percentiles appear once ${st.percentileFrom} have, so they mean something.${user ? '' : ' <a href="#" data-act="saveresult">Sign up free to save your score</a>.'}`;
  } catch { pct.textContent = 'Your score is saved on this device.'; }
}

app.addEventListener('click', e => {
  const b = e.target.closest('[data-act],[data-o],[data-go]'); if (!b) return;
  if (b.dataset.o != null) { const key = k(S.sec, S.q), j = +b.dataset.o; S.ans[key] = S.ans[key] === j ? null : j; save(); app.querySelectorAll('[data-o]').forEach(x => x.setAttribute('aria-pressed', +x.dataset.o === S.ans[key])); return; }
  if (b.dataset.go != null) { S.q = +b.dataset.go; save(); return exam(); }
  const a = b.dataset.act, sec = M.sections[S?.sec ?? 0];
  if (a === 'start') start();
  if (a === 'resume') { if (S.ends[S.sec] < Date.now()) nextSection(); else exam(); }
  if (a === 'restart') { const d = sheet('<h2>Start the mock again?</h2><p class="muted" style="margin:8px 0 16px">Your answers on this device will be cleared.</p><button class="btn" data-yes>Start again</button>'); d.querySelector('[data-yes]').onclick = () => { d.close(); start(); }; }
  if (a === 'results') results(false);
  if (a === 'next') { if (S.q < sec.questions.length - 1) { S.q++; save(); exam(); } else toast('Last question in this section. Submit the section when you\'re ready.'); }
  if (a === 'prev' && S.q > 0) { S.q--; save(); exam(); }
  if (a === 'clear') { S.ans[k(S.sec, S.q)] = null; save(); exam(); }
  if (a === 'mark') { const kk = k(S.sec, S.q); S.mark[kk] = !S.mark[kk]; if (S.q < sec.questions.length - 1) S.q++; save(); exam(); }
  if (a === 'endsec') { const left = sec.questions.filter((_, i) => S.ans[k(S.sec, i)] == null || S.ans[k(S.sec, i)] === '').length; const d = sheet(`<h2>${S.sec < 2 ? 'Submit this section?' : 'Finish the mock?'}</h2><p class="muted" style="margin:8px 0 16px">${left ? `${left} question${left > 1 ? 's' : ''} unanswered. ` : ''}You can't come back to this section.</p><button class="btn" data-yes>${S.sec < 2 ? 'Submit and go on' : 'Finish and see my score'}</button>`); d.querySelector('[data-yes]').onclick = () => { d.close(); nextSection(); }; }
  if (a === 'saveresult') { e.preventDefault(); accountSheet({ app: 'ose', onDone: async () => { S.sent = false; save(); results(true); } }); }
});

if (S && !S.finished && location.hash !== '#intro') { if (S.ends[S.sec] < Date.now()) nextSection(); else intro(); } else if (S && S.finished && location.hash === '#review') results(false); else intro();

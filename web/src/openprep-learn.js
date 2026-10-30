import './shared/base.css';
import { esc, footer } from './shared/ui.js';
import { buddy } from './shared/mascots.js';
import { LESSONS } from './data/lessons.js';
import { track, sync, savePrompt } from './shared/progress.js';

const app = document.getElementById('app');
document.documentElement.style.setProperty('--accent', '#1B4DFF');
const done = () => { try { return JSON.parse(localStorage.getItem('op-done') || '{}'); } catch { return {}; } };
const markDone = id => { try { localStorage.setItem('op-done', JSON.stringify({ ...done(), [id]: true })); } catch {} track('op-done'); };
const header = `<header class="bar"><div class="wrap"><a class="brand" href="/openprep/"><span class="m">${buddy()}</span>OpenPrep</a><a class="btn quiet small" href="/openprep/mock/">Free mock</a></div></header>`;

function list() {
  const d = done();
  app.innerHTML = `${header}<main class="wrap" style="max-width:760px;padding-block:24px 48px"><h1 style="font-size:36px">Quant lessons</h1><p class="muted" style="margin:8px 0 20px">Five minutes each. Read, then try three questions. ${Object.keys(d).length} of ${LESSONS.length} done.</p>
    <div class="list">${LESSONS.map((l, i) => `<a class="item" href="#${l.id}"><span class="av" style="background:${d[l.id] ? 'var(--good)' : 'var(--accent)'}">${d[l.id] ? '✓' : i + 1}</span><span class="grow"><b>${esc(l.title)}</b><small>${l.mins} min, ${l.practice.length} questions</small></span></a>`).join('')}</div></main>${footer()}`;
}
function lesson(l) {
  const i = LESSONS.indexOf(l), next = LESSONS[i + 1];
  app.innerHTML = `${header}<main class="wrap" style="max-width:760px;padding-block:24px 48px">
    <a href="#">← All lessons</a><h1 style="font-size:34px;margin:12px 0 20px">${esc(l.title)}</h1>
    <div class="stack">${l.cards.map(c => `<div class="card"><p style="font-size:18px">${esc(c)}</p></div>`).join('')}</div>
    <h2 style="margin:32px 0 12px">Try it</h2>
    <div class="stack">${l.practice.map((q, k) => `<div class="card stack" data-q="${k}"><b>${k + 1}. ${esc(q.q)}</b><div class="opts">${q.o.map((o, j) => `<button class="opt" data-o="${j}">${esc(o)}</button>`).join('')}</div><p class="why" hidden></p></div>`).join('')}</div>
    <div id="saveslot" style="margin-top:24px"></div>
    <div class="row" style="margin-top:24px">${next ? `<a class="btn" href="#${next.id}">Next: ${esc(next.title)}</a>` : '<a class="btn" href="/openprep/mock/">Take the free mock</a>'}<a class="btn quiet" href="#">All lessons</a></div></main>${footer()}`;
  let right = 0, answered = 0;
  app.querySelectorAll('[data-q]').forEach(card => card.addEventListener('click', e => {
    const b = e.target.closest('[data-o]'); if (!b || card.dataset.done) return; card.dataset.done = 1; answered++;
    const q = l.practice[+card.dataset.q], pick = +b.dataset.o; if (pick === q.a) right++;
    card.querySelectorAll('[data-o]').forEach(x => { x.disabled = true; if (+x.dataset.o === q.a) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
    const w = card.querySelector('.why'); w.hidden = false; w.textContent = (pick === q.a ? 'Right. ' : 'Not quite. ') + q.why;
    if (answered === l.practice.length) { markDone(l.id); savePrompt(document.getElementById('saveslot'), 'your lessons'); }
  }));
  window.scrollTo(0, 0);
}
const route = () => { const l = LESSONS.find(x => x.id === location.hash.slice(1)); l ? lesson(l) : list(); };
window.addEventListener('hashchange', route); route(); sync().then(ch => ch && route());

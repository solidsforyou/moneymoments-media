// Apps that aren't live yet: a card with the mascot (and a trailer once there is one) and an
// "I'm interested" button. Taps are counted, nothing else (see netlify/functions/pulse.mjs).
import { esc, api, toast } from './ui.js';
import { sunny, goodguy, olly } from './mascots.js';

const letter = (l, bg) => () => `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="28" fill="${bg}"/><text x="60" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="52" font-weight="800" fill="#FBFBFE">${l}</text></svg>`;
export const SOON = [
  { k: 'tomorrow', video: '/media/soon-tomorrow.mp4', poster: '/media/soon-tomorrow.jpg', n: 'Tomorrow', d: 'For driven people. Message anyone, and move any file between your phone, your laptop and your friends.', art: sunny, url: '/tomorrow/' },
  { k: 'goodhabit', video: '/media/soon-goodhabit.mp4', poster: '/media/soon-goodhabit.jpg', n: 'GoodHabit', d: 'Practise money before it\'s real: replay Indian market history with pretend money.', art: goodguy, url: '/goodhabit/' },
  { k: 'ai', video: '/media/soon-ai.mp4', poster: '/media/soon-ai.jpg', n: 'How to use AI', d: 'Short lessons on using AI well for study and work, with practice in Arena.', art: olly },
  { k: 'goodstuff', video: '/media/soon-goodstuff.mp4', poster: '/media/soon-goodstuff.jpg', n: 'The Good Stuff', d: 'Free AI skills for small businesses and makers.', art: letter('G', '#0E7C86') },
  { k: 'library', video: '/media/soon-library.mp4', poster: '/media/soon-library.jpg', n: 'AI Discovery Library', d: 'Trusted sources, for people and for AIs.', art: letter('L', '#5B25D9') },
  { k: 'accounting', video: '/media/soon-accounting.mp4', poster: '/media/soon-accounting.jpg', n: 'Accounting Unlocked', d: 'Offline books for shops and small firms.', art: letter('A', '#8A5A00') },
];
const ls = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
const mine = () => ls.get('ose-interest') || {};

export const soonCard = (s, counts = {}) => `<article class="card soon stack" id="soon-${s.k}">
  ${s.video ? `<video src="${s.video}" poster="${s.poster || ''}" controls playsinline preload="none"></video>` : `<span class="soonart">${s.art()}</span>`}
  <span class="tag">Coming soon</span><h3>${esc(s.n)}</h3><p class="muted">${esc(s.d)}</p>
  <div class="row"><button class="btn small ${mine()[s.k] ? 'quiet' : ''}" data-interest="${s.k}" ${mine()[s.k] ? 'disabled' : ''}>${mine()[s.k] ? 'You\'re interested' : 'I\'m interested'}</button>${counts[s.k] ? `<span class="small muted">${counts[s.k].toLocaleString('en-IN')} interested</span>` : ''}</div>
</article>`;

export async function soonCounts() { try { return (await api('/api/pulse/interest')).counts; } catch { return {}; } }

// one listener for every page that shows the cards
document.addEventListener('click', async e => {
  const b = e.target.closest('[data-interest]'); if (!b || b.disabled) return;
  b.disabled = true;
  try { await api('/api/pulse/interest', { method: 'POST', body: { app: b.dataset.interest } }); ls.set('ose-interest', { ...mine(), [b.dataset.interest]: true }); b.textContent = 'You\'re interested'; b.classList.add('quiet'); toast('Noted. Thanks for telling us.'); }
  catch (x) { b.disabled = false; toast(x.message); }
});

// a whole page for an app that isn't live (Tomorrow, GoodHabit)
export async function soonPage(k) {
  const s = SOON.find(x => x.k === k), app = document.getElementById('app');
  const paint = counts => { app.innerHTML = `<header class="bar"><div class="wrap"><a class="brand" href="/"><span class="m">${s.art()}</span>${esc(s.n)}</a><a class="btn quiet small" href="/">All apps</a></div></header>
  <main class="wrap sec stack" style="max-width:720px">${soonCard(s, counts)}
    <div class="card stack"><b>Live now: Arena</b><p class="muted">Free practice for classes 5 to 12 and CAT, chapter by chapter from your NCERT books.</p><a class="btn" href="/arena/" style="align-self:flex-start">Open Arena</a></div>
  </main>`; };
  paint({});
  const counts = await soonCounts();
  if (Object.keys(counts).length) { const c = app.querySelector(`#soon-${s.k}`); if (c) c.outerHTML = soonCard(s, counts); }
}

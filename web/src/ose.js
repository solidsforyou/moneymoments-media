import './shared/base.css';
import { esc, api, me, toast, sheet, accountSheet, makeAppId, footer, avatar } from './shared/ui.js';
import { olly, sunny, buddy, goodguy } from './shared/mascots.js';

const APPS = [
  { k: 'tomorrow', n: 'Tomorrow', d: 'Message anyone and move anything between your devices and friends.', url: '/tomorrow/', art: sunny, bg: 'linear-gradient(135deg,#FFE1B0,#FFC2CC)' },
  { k: 'openprep', n: 'OpenPrep', d: 'Free CAT prep. Lessons, CAT tips and careers, with Buddy.', url: '/openprep/', art: buddy, bg: 'linear-gradient(135deg,#1B4DFF,#06115A)' },
  { k: 'goodhabit', n: 'GoodHabit', d: 'Practise money before it\'s real, on real market history.', url: '/goodhabit/', art: goodguy, bg: 'linear-gradient(135deg,#1E3A2B,#0B7A3B)' },
  { k: 'skills', n: 'The Good Stuff', d: 'Free AI skills for small businesses and makers.', soon: true },
  { k: 'library', n: 'AI Discovery Library', d: 'Trusted sources, for people and AIs.', soon: true },
  { k: 'acct', n: 'Accounting Unlocked', d: 'Offline books for shops and small firms.', soon: true },
];
const IDS = [['tm', 'Tomorrow ID', 'Your name on Tomorrow, for messages, posts and follows.'], ['prep', 'PrepID', 'Your name in OpenPrep, for your study circle.'], ['good', 'GoodID', 'Your name in GoodHabit, for Hissabs with friends.']];
const app = document.getElementById('app');

async function draw() {
  const { user } = await me();
  app.innerHTML = `
  <header class="bar"><div class="wrap"><a class="brand" href="/"><span class="m">${olly()}</span>OpenSource Everything</a>${user ? `<button class="btn quiet small" data-act="me">@${esc(user.handle)}</button>` : '<button class="btn small" data-act="signup">Sign up</button>'}</div></header>
  <main>
    <section class="wrap hero">
      <div><h1>Free, open apps for learning, money and building.</h1><p class="lede">One OpenID for all of them. No ads, ever.</p>
        <div class="row actions">${user ? '<a class="btn" href="#apps">Open an app</a>' : '<button class="btn" data-act="signup">Get your OpenID</button><a class="btn quiet" href="#apps">See the apps</a>'}</div></div>
      <div class="art">${olly()}</div>
    </section>
    <section class="wrap sec" id="apps"><h2>The apps</h2>
      <div class="list">${APPS.map(a => a.soon ? `<div class="item"><span class="av" style="background:var(--fill);color:var(--label2);border-radius:14px">${esc(a.n[0])}</span><span class="grow"><b>${esc(a.n)}</b><small>${esc(a.d)}</small></span><span class="small muted">Coming soon</span></div>` : `<a class="item" href="${a.url}"><span class="av" style="background:${a.bg};border-radius:14px;padding:6px">${a.art()}</span><span class="grow"><b>${esc(a.n)}</b><small>${esc(a.d)}</small></span><span class="btn small">Open</span></a>`).join('')}</div>
      <p class="small muted" style="margin-top:12px">Each app installs on its own: open it, then use your browser's "Add to Home Screen".</p>
    </section>
    ${user ? `<section class="wrap sec" id="me"><h2>Me</h2>
      <div class="card row" style="margin-bottom:16px">${avatar(user, 56)}<span class="grow" style="flex:1;min-width:0"><b style="font-size:19px">${esc(user.name)}</b><br><span class="muted">OpenID @${esc(user.handle)}${user.telegram ? ', linked to Telegram' : ''}</span></span></div>
      <div class="list">${IDS.map(([k, n, why]) => `<div class="item"><span class="grow"><b>${n}</b><small>${user.ids[k] ? '@' + esc(user.ids[k]) : esc(why)}</small></span>${user.ids[k] ? '<span class="small" style="color:var(--good)">Made</span>' : `<button class="btn quiet small" data-act="mkid" data-k="${k}" data-n="${n}">Create</button>`}</div>`).join('')}</div>
      <div class="row" style="margin-top:16px"><button class="btn quiet" data-act="logout">Log out</button><a class="btn quiet" href="/delete-data/">Delete my account</a></div>
    </section>` : ''}
    <section class="wrap sec"><h2>Built in the open</h2><div class="card stack"><p>Every app's code goes public at launch under the AGPL licence. Read it, copy it, or build your own app on OpenID.</p><p><a href="/build/">How to build with us</a></p></div></section>
  </main>${footer()}`;
}

app.addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act;
  if (a === 'signup') accountSheet({ app: 'ose', onDone: () => { toast('Welcome. Your OpenID is ready.'); draw(); } });
  if (a === 'me') document.getElementById('me')?.scrollIntoView({ behavior: 'smooth' });
  if (a === 'mkid') { await makeAppId(b.dataset.k, b.dataset.n); draw(); }
  if (a === 'logout') { await api('/api/auth/logout', { method: 'POST' }); await me(true); draw(); }
});
draw();

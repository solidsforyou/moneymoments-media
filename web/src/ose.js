import './shared/base.css';
import { esc, api, me, toast, accountSheet, footer, avatar } from './shared/ui.js';
import { olly, buddy, ace } from './shared/mascots.js';
import { SOON, soonCard, soonCounts } from './shared/soon.js';

// Launch page (30 Oct 2026): Arena is live, OpenPrep gives a glimpse, the rest is coming soon.
const app = document.getElementById('app');

async function draw() {
  const [{ user }, counts, cat] = await Promise.all([me(), soonCounts(), api('/api/arena/courses').catch(() => ({ courses: [] }))]);
  const qs = cat.courses.reduce((a, c) => a + c.chapters.reduce((s, ch) => s + ch.n.easy + ch.n.medium + ch.n.hard, 0), 0), chs = cat.courses.reduce((a, c) => a + c.chapters.length, 0);
  app.innerHTML = `
  <header class="bar"><div class="wrap"><a class="brand" href="/"><span class="m">${olly()}</span>OpenSource Everything</a>${user ? `<button class="btn quiet small" data-act="me">@${esc(user.handle)}</button>` : '<a class="btn small" href="/arena/">Open Arena</a>'}</div></header>
  <main>
    <section class="wrap hero">
      <div><h1>Free practice for every student.</h1><p class="lede">Arena is live: classes 5 to 12 and CAT, chapter by chapter from your NCERT books. Free, no ads, no sign-up to start.</p>
        <div class="row actions"><a class="btn" href="/arena/">Start practising</a><a class="btn quiet" href="#trailer">Watch the trailer</a></div></div>
      <div class="art">${ace()}</div>
    </section>
    <section class="wrap sec"><h2>Arena</h2>
      <div class="grid">
        <div class="card stack"><h3>Your class, your chapters</h3><p class="muted">${chs ? `${chs} chapters and ${qs.toLocaleString('en-IN')} questions so far` : 'Every chapter'}, in the order of your NCERT book. Maths, Science and English, and CAT, with more chapters added every week.</p></div>
        <div class="card stack"><h3>Easy, Medium or Hard</h3><p class="muted">Pick your level. Each question shows how hard it is and how long it should take, and every answer is explained.</p></div>
        <div class="card stack"><h3>Know how ready you are</h3><p class="muted">Unit test readiness, Board readiness for classes 10 and 12, and CAT readiness, chapter by chapter.</p></div>
      </div>
      <div class="card stack" style="margin-top:16px"><b>Teachers and NGOs</b><p class="muted">Share <b>opensourceeverything.in/arena</b> with your students. They can start on any phone without an account. Accounts are only for saving progress across devices and joining the leaderboards, and children under 18 need a parent's approval for those.</p></div>
    </section>
    <section class="wrap sec"><h2>OpenPrep, a first look</h2>
      <a class="card row" href="/openprep/" style="text-decoration:none;color:inherit;align-items:center;flex-wrap:nowrap"><span class="av" style="width:72px;height:72px;background:none;flex:none">${buddy()}</span><span class="stack" style="gap:4px"><b>Free CAT mock and Quant lessons</b><span class="muted">A full-length mock on the CAT pattern with every answer explained, six short lessons, and CAT practice in Arena.</span></span></a>
    </section>
    <section class="wrap sec" id="trailer"><h2>What we're building</h2>
      <video class="trailer" src="/media/ose-trailer.mp4" poster="/media/ose-trailer.jpg" controls playsinline preload="none"></video>
    </section>
    <section class="wrap sec"><h2>Coming soon</h2><p class="muted" style="margin:-8px 0 16px">Tap "I'm interested" on the ones you want first. We count taps, nothing else.</p>
      <div class="grid">${SOON.map(s => soonCard(s, counts)).join('')}</div>
    </section>
    ${user ? `<section class="wrap sec" id="me"><h2>Me</h2>
      <div class="card row" style="margin-bottom:16px">${avatar(user, 56)}<span class="grow" style="flex:1;min-width:0"><b style="font-size:19px">${esc(user.name)}</b><br><span class="muted">OpenID @${esc(user.handle)}</span></span></div>
      <div class="row"><a class="btn quiet" href="/arena/#/me">Arena profile</a><button class="btn quiet" data-act="logout">Log out</button><a class="btn quiet" href="/delete-data/">Delete my account</a></div>
    </section>` : ''}
    <section class="wrap sec" id="donate"><h2>Support us</h2><div class="card stack"><p>Arena is free for every student, with no ads. If you'd like to donate or back the work, write to <a href="mailto:shashwat@solidsforyou.com?subject=Donation%20to%20OpenSource%20Everything">shashwat@solidsforyou.com</a>.</p></div></section>
    <section class="wrap sec"><h2>Built in the open</h2><div class="card stack"><p>Every app's code goes public under the AGPL licence. Read it, copy it, or build on it.</p><p><a href="/build/">How to build with us</a></p></div></section>
  </main>${footer()}`;
}

app.addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act;
  if (a === 'signup') accountSheet({ app: 'ose', onDone: () => { toast('Welcome. Your OpenID is ready.'); draw(); } });
  if (a === 'me') document.getElementById('me')?.scrollIntoView({ behavior: 'smooth' });
  if (a === 'logout') { await api('/api/auth/logout', { method: 'POST' }); await me(true); draw(); }
});
draw();

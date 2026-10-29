// OpenPrep and GoodHabit share one page shape: the app's promise, its content grouped by
// pillar (pushed in by the content machine), the interactive preview, and its app ID.
import './base.css';
import { esc, api, me, toast, accountSheet, makeAppId, footer } from './ui.js';

export async function appPage(o) {
  const app = document.getElementById('app');
  document.documentElement.style.setProperty('--accent', o.accent);
  const draw = async () => {
    const { user } = await me(); let items = []; try { items = (await api(`/api/content/${o.key}`)).items; } catch {}
    const tab = new URLSearchParams(location.search).get('show') || 'all';
    const shown = tab === 'all' ? items : items.filter(i => i.pillar === tab);
    app.innerHTML = `
    <header class="bar"><div class="wrap"><a class="brand" href="/${o.key}/"><span class="m">${o.mascot()}</span>${o.name}</a><a class="btn quiet small" href="/">All apps</a></div></header>
    <main>
      <section class="wrap hero"><div><h1>${o.head}</h1><p class="lede">${o.lede}</p>
        <div class="row actions"><a class="btn" href="${o.play}">${o.playLabel}</a>${user ? (user.ids[o.idKey] ? `<span class="muted small">${o.idName} @${esc(user.ids[o.idKey])}</span>` : `<button class="btn quiet" data-act="mkid">Create your ${o.idName}</button>`) : '<button class="btn quiet" data-act="signup">Sign up free</button>'}</div></div>
        <div class="art">${o.mascot()}</div></section>
      ${o.starts ? `<section class="wrap sec"><div class="grid">${o.starts.map(([h, p, href, cta]) => `<a class="card stack" href="${href}" style="text-decoration:none;color:inherit"><h3>${h}</h3><p class="muted">${p}</p><span class="btn small" style="align-self:flex-start">${cta}</span></a>`).join('')}</div></section>` : ''}
      <section class="wrap sec"><h2>${o.feedTitle}</h2>
        <div class="row" role="group" aria-label="Show" style="margin-bottom:16px">${['all', ...o.pillars].map(p => `<a class="btn ${tab === p ? '' : 'quiet'} small" href="?show=${encodeURIComponent(p)}">${p === 'all' ? 'Everything' : esc(p)}</a>`).join('')}</div>
        <div class="grid">${shown.map(i => `<article class="card stack">${i.video ? `<video src="${esc(i.video)}" controls playsinline preload="metadata" style="border-radius:14px;width:100%"></video>` : i.image ? `<img src="${esc(i.image)}" alt="" style="border-radius:14px">` : ''}<span class="small muted">${esc(i.pillar || '')}</span><h3>${esc(i.title)}</h3>${i.text ? `<p class="muted">${esc(i.text)}</p>` : ''}${i.link ? `<a href="${esc(i.link)}">Open</a>` : ''}</article>`).join('') || `<p class="empty" style="grid-column:1/-1">${o.empty}</p>`}</div>
      </section>
      <section class="wrap sec"><h2>${o.whyTitle}</h2><div class="grid">${o.why.map(([h, p]) => `<div class="card stack"><h3>${h}</h3><p class="muted">${p}</p></div>`).join('')}</div></section>
    </main>${footer()}`;
  };
  app.addEventListener('click', async e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    if (b.dataset.act === 'signup') accountSheet({ app: 'ose', onDone: () => { toast('Welcome.'); draw(); } });
    if (b.dataset.act === 'mkid') { await makeAppId(o.idKey, o.idName); draw(); }
  });
  draw();
}

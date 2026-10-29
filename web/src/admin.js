import './shared/base.css';
import { esc, toast, footer } from './shared/ui.js';
// Publishing for the founder and the content machine. The token stays in this tab only.
const app = document.getElementById('app');
const key = () => { try { return sessionStorage.getItem('ose-admin') || ''; } catch { return ''; } };
const call = async (path, method, body) => { const r = await fetch(path, { method, headers: { 'content-type': 'application/json', authorization: `Bearer ${key()}` }, body: body && JSON.stringify(body) }); const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || r.status); return d; };
const PILLARS = { ose: ['Product showcase', 'Founder-led'], tomorrow: ['Product showcase', 'Seamless transfer', 'Telegram-connected', 'Creators on Tomorrow'], openprep: ['Lesson', 'CAT tip', 'Career option'], goodhabit: ['Market case study', 'Knowledge', 'Indian current affairs', 'Personal finance'] };
let cur = 'openprep';
async function draw() {
  let items = []; try { items = (await (await fetch(`/api/content/${cur}`)).json()).items || []; } catch {}
  app.innerHTML = `<main class="wrap stack" style="padding-block:40px;max-width:760px"><h1>Publish content</h1>
    <div class="field"><label for="tok">Admin token</label><input id="tok" type="password" value="${esc(key())}" autocomplete="off"></div>
    <form class="card stack" id="f"><div class="field"><label for="app">App</label><select id="app-s">${Object.keys(PILLARS).map(a => `<option ${a === cur ? 'selected' : ''}>${a}</option>`).join('')}</select></div>
      <div class="field"><label for="pillar">Pillar</label><select id="pillar" name="pillar">${PILLARS[cur].map(p => `<option>${p}</option>`).join('')}</select></div>
      <div class="field"><label for="title">Title</label><input id="title" name="title" required></div>
      <div class="field"><label for="text">Text</label><textarea id="text" name="text"></textarea></div>
      <div class="field"><label for="video">Video URL (https)</label><input id="video" name="video"></div>
      <div class="field"><label for="image">Image URL (https)</label><input id="image" name="image"></div>
      <div class="field"><label for="link">Link (https)</label><input id="link" name="link"></div>
      <button class="btn">Publish</button></form>
    <h2>Published on ${esc(cur)}</h2><div class="list">${items.map(i => `<div class="item"><span class="grow"><b>${esc(i.title)}</b><small>${esc(i.pillar)}</small></span><button class="btn quiet small" data-del="${esc(i.id)}">Remove</button></div>`).join('') || '<p class="empty">Nothing yet.</p>'}</div></main>${footer()}`;
  document.getElementById('tok').onchange = e => { try { sessionStorage.setItem('ose-admin', e.target.value); } catch {} };
  document.getElementById('app-s').onchange = e => { cur = e.target.value; draw(); };
  document.getElementById('f').onsubmit = async e => { e.preventDefault(); try { await call(`/api/content/${cur}`, 'POST', Object.fromEntries(new FormData(e.target))); toast('Published'); draw(); } catch (x) { toast(x.message); } };
  app.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { try { await call(`/api/content/${cur}`, 'DELETE', { id: b.dataset.del }); draw(); } catch (x) { toast(x.message); } });
}
draw();

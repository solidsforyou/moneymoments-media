// Progress lives on the device first (so nobody needs an account to try anything) and
// moves into the account once there is one, then syncs: the newest copy of each item wins.
import { api, me, esc, accountSheet, toast } from './ui.js';

const KEYS = ['op-done', 'op-free-mock-1', 'gh-sim-v1'];
const ls = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } }, set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch {} } };
const stamps = () => ls.get('ose-pt') || {};
let timer, dirty = {};

// call after every local save
export function track(key) {
  ls.set('ose-pt', { ...stamps(), [key]: Date.now() }); dirty[key] = true;
  clearTimeout(timer); timer = setTimeout(push, 1500);
}
async function push() {
  const { user } = await me(); if (!user) return;
  const st = stamps(), items = {}; for (const k of Object.keys(dirty)) items[k] = { v: ls.get(k), t: st[k] || Date.now() };
  dirty = {}; if (Object.keys(items).length) await api('/api/progress', { method: 'PUT', body: { items } }).catch(() => {});
}

// on page load: bring the account's progress in, send the device's newer progress up.
// Returns true if anything on this device changed.
export async function sync() {
  const { user } = await me(); if (!user) return false;
  let server; try { server = (await api('/api/progress')).items; } catch { return false; }
  const st = stamps(), up = {}; let changed = false;
  for (const k of KEYS) {
    const s = server[k], lt = st[k] || 0, lv = ls.get(k);
    if (k === 'op-done' && (lv || s?.v)) {   // finished lessons: keep everything finished anywhere
      const merged = { ...(s?.v || {}), ...(lv || {}) };
      if (JSON.stringify(merged) !== JSON.stringify(lv || {})) { ls.set(k, merged); changed = true; }
      if (JSON.stringify(merged) !== JSON.stringify(s?.v || {})) up[k] = { v: merged, t: Date.now() };
      continue;
    }
    if (s && s.t > lt) { ls.set(k, s.v); st[k] = s.t; changed = true; }
    else if (lv != null && lt && (!s || lt > s.t)) up[k] = { v: lv, t: lt };
  }
  ls.set('ose-pt', st);
  if (Object.keys(up).length) await api('/api/progress', { method: 'PUT', body: { items: up } }).catch(() => {});
  return changed;
}

// the gentle ask, shown at a natural stopping point; never a wall
export async function savePrompt(el, what) {
  const { user } = await me(); if (!el) return;
  if (user) { el.innerHTML = `<p class="small muted">Saved to your account, @${esc(user.handle)}. It's on every device you log in on.</p>`; return; }
  el.innerHTML = `<div class="card stack"><b>Keep ${esc(what)}</b><p class="muted">It's saved on this device. Make a free account and it follows you to your phone and laptop. No ads, no spam.</p><div class="row"><button class="btn small" data-save-progress>Create free account</button><button class="btn quiet small" data-save-login>Log in</button></div></div>`;
  const done = async () => { await sync(); for (const k of KEYS) dirty[k] = true; await push(); toast('Saved to your account'); savePrompt(el, what); };
  el.querySelector('[data-save-progress]').onclick = () => accountSheet({ app: 'ose', onDone: done });
  el.querySelector('[data-save-login]').onclick = () => accountSheet({ app: 'ose', mode: 'login', onDone: done });
}

// Helpers every page uses: escaping, API calls, toasts, sheets, the account form.
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const $ = (s, el = document) => el.querySelector(s);

export async function api(path, opts = {}) {
  const o = { credentials: 'same-origin', ...opts, headers: { ...(opts.body && !(opts.body instanceof Blob) ? { 'content-type': 'application/json' } : {}), ...(opts.headers || {}) } };
  if (o.body && typeof o.body === 'object' && !(o.body instanceof Blob)) o.body = JSON.stringify(o.body);
  let r; try { r = await fetch(path, o); } catch { throw new Error('No connection. Check your internet and try again.'); }
  const data = r.headers.get('content-type')?.includes('json') ? await r.json() : null;
  if (!r.ok) throw new Error(data?.error || `Something went wrong (${r.status}).`);
  return data;
}

let toastT;
export function toast(msg) { let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); } t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2800); }

export function sheet(html, onReady) {
  const d = document.createElement('dialog'); d.className = 'sheet';
  d.innerHTML = `<div class="row" style="justify-content:flex-end"><button class="btn quiet small" data-close>Close</button></div>${html}`;
  document.body.append(d); d.addEventListener('close', () => d.remove());
  d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
  d.showModal(); onReady && onReady(d); return d;
}

export const initials = n => String(n || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
const COLS = ['#2448FF', '#06683F', '#B5134F', '#0E6B63', '#8A5A00', '#5B25D9', '#2D3748'];
export const avatar = (u, size = 40) => `<span class="av" style="width:${size}px;height:${size}px;background:${COLS[[...String(u?.handle || u?.name || '')].reduce((a, c) => a + c.charCodeAt(0), 0) % COLS.length]}" aria-hidden="true">${esc(initials(u?.name))}</span>`;
export const when = t => { if (!t) return ''; const s = (Date.now() - t) / 1000; return s < 60 ? 'now' : s < 3600 ? `${Math.floor(s / 60)}m` : s < 86400 ? `${Math.floor(s / 3600)}h` : new Date(t).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); };
export const size = b => b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`;

let meCache;
export async function me(force) { if (!meCache || force) meCache = await api('/api/auth/me').catch(() => ({ user: null })); return meCache; }

// Sign up / log in. app: 'ose' or 'tm' (Tomorrow accounts start with a Tomorrow ID).
export function accountSheet({ app = 'ose', mode = 'signup', onDone } = {}) {
  const tmText = app === 'tm';
  const render = m => `
    <h2>${m === 'signup' ? (tmText ? 'Join Tomorrow' : 'Sign up free') : 'Log in'}</h2>
    <p class="muted" style="margin:6px 0 16px">${m === 'signup' ? (tmText ? 'Free. Your Tomorrow ID is how friends find you.' : 'One OpenID for every app we make.') : 'Welcome back.'}</p>
    <div data-tg></div>
    <form data-f novalidate>
      ${m === 'signup' ? '<div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required></div>' : ''}
      <div class="field"><label for="f-handle">${tmText ? 'Tomorrow ID' : 'OpenID'}</label><input id="f-handle" name="handle" autocomplete="username" autocapitalize="off" placeholder="yourname" required></div>
      ${m === 'signup' ? '<div class="field"><label for="f-age">Age</label><input id="f-age" name="age" inputmode="numeric" required style="max-width:120px"></div>' : ''}
      <div class="field"><label for="f-pw">Password</label><input id="f-pw" name="password" type="password" autocomplete="${m === 'signup' ? 'new-password' : 'current-password'}" required minlength="8"></div>
      <p class="error" data-err role="alert"></p>
      <button class="btn" style="width:100%">${m === 'signup' ? 'Create my account' : 'Log in'}</button>
    </form>
    <p class="small muted" style="margin-top:14px">${m === 'signup' ? 'Already have an account? <a href="#" data-sw>Log in</a>' : 'New here? <a href="#" data-sw>Sign up</a>'}</p>
    ${m === 'signup' ? '<p class="small muted" style="margin-top:8px">Posting is for 18 and over. <a href="/privacy/">Privacy</a></p>' : ''}`;
  const d = sheet(render(mode));
  const wire = m => {
    d.querySelector('[data-sw]').onclick = e => { e.preventDefault(); d.querySelector('h2').parentElement; d.innerHTML = `<div class="row" style="justify-content:flex-end"><button class="btn quiet small" data-close>Close</button></div>${render(m === 'signup' ? 'login' : 'signup')}`; wire(m === 'signup' ? 'login' : 'signup'); };
    telegramButton(d.querySelector('[data-tg]'), async u => { d.close(); onDone && onDone(u); });
    d.querySelector('[data-f]').onsubmit = async e => {
      e.preventDefault(); const f = new FormData(e.target), b = Object.fromEntries(f), btn = e.target.querySelector('button'), err = d.querySelector('[data-err]');
      btn.setAttribute('aria-busy', 'true'); err.textContent = '';
      try { const r = await api(`/api/auth/${m}`, { method: 'POST', body: { ...b, app } }); await me(true); d.close(); onDone && onDone(r.user); }
      catch (x) { err.textContent = x.message; } finally { btn.removeAttribute('aria-busy'); }
    };
  };
  wire(mode);
  return d;
}

// "Log in with Telegram": our own button (no Telegram logo), using Telegram's login popup.
export async function telegramButton(slot, onDone) {
  const { telegramBotId } = await me();
  if (!slot || !telegramBotId) return;
  slot.innerHTML = '<button class="btn" type="button" style="width:100%;background:#2AABEE">Log in with Telegram</button><p class="small muted" style="text-align:center;margin:8px 0 16px">We get your name, username and photo. Never your number or chats. Or use an ID and password:</p>';
  slot.querySelector('button').onclick = async () => {
    if (!window.Telegram?.Login) await new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://telegram.org/js/telegram-widget.js?22'; s.onload = ok; s.onerror = () => no(new Error('Telegram didn\'t load.')); document.head.append(s); }).catch(e => toast(e.message));
    window.Telegram?.Login?.auth({ bot_id: telegramBotId, request_access: 'write' }, async data => {
      if (!data) return toast('Telegram login was cancelled.');
      try { const r = await api('/api/auth/telegram', { method: 'POST', body: data }); await me(true); onDone && onDone(r.user); } catch (e) { toast(e.message); }
    });
  };
}

export async function makeAppId(app, label) {
  const { user } = await me(); if (!user) return null;
  return new Promise(res => {
    const d = sheet(`<h2>Create your ${label}</h2><p class="muted" style="margin:6px 0 16px">Takes a second. ${user.oseLinked ? `Your OpenID (@${esc(user.handle)}) stays the same.` : ''}</p><form data-f><div class="field"><label for="f-id">${label}</label><input id="f-id" name="handle" value="${esc(user.handle)}" autocapitalize="off"></div><p class="error" data-err role="alert"></p><button class="btn" style="width:100%">Create ${label}</button></form>`);
    d.querySelector('[data-f]').onsubmit = async e => { e.preventDefault(); try { const r = await api('/api/auth/appid', { method: 'POST', body: { app, handle: new FormData(e.target).get('handle') } }); await me(true); d.close(); toast(`${label} @${r.user.ids[app]} created`); res(r.user); } catch (x) { d.querySelector('[data-err]').textContent = x.message; } };
    d.addEventListener('close', () => res(null));
  });
}

export const footer = () => `<footer class="foot wrap"><p>OpenSource Everything. Free, ad-free, built in the open.</p><nav><a href="/">All apps</a><a href="/privacy/">Privacy</a><a href="/delete-data/">Delete my data</a><a href="/build/">Build with us</a></nav></footer>`;

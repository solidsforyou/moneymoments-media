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
    <p class="small muted" style="margin-top:14px">${m === 'signup' ? 'Already have an account? <a href="#" data-sw>Log in</a>' : 'New here? <a href="#" data-sw>Sign up</a>. Forgot your password? <a href="#" data-forgot>Use your recovery code</a>'}</p>
    ${m === 'signup' ? '<p class="small muted" style="margin-top:8px">Posting is for 18 and over. <a href="/privacy/">Privacy</a></p>' : ''}`;
  const d = sheet(render(mode));
  const wire = m => {
    d.querySelector('[data-sw]').onclick = e => { e.preventDefault(); d.querySelector('h2').parentElement; d.innerHTML = `<div class="row" style="justify-content:flex-end"><button class="btn quiet small" data-close>Close</button></div>${render(m === 'signup' ? 'login' : 'signup')}`; wire(m === 'signup' ? 'login' : 'signup'); };
    telegramButton(d.querySelector('[data-tg]'), async u => { d.close(); onDone && onDone(u); });
    const fg = d.querySelector('[data-forgot]'); if (fg) fg.onclick = e => { e.preventDefault(); d.close(); recoverSheet(onDone); };
    d.querySelector('[data-f]').onsubmit = async e => {
      e.preventDefault(); const f = new FormData(e.target), b = Object.fromEntries(f), btn = e.target.querySelector('button'), err = d.querySelector('[data-err]');
      btn.setAttribute('aria-busy', 'true'); err.textContent = '';
      try { const r = await api(`/api/auth/${m}`, { method: 'POST', body: { ...b, app } }); await me(true); d.close(); if (r.recoveryCode) await showRecovery(r.recoveryCode); onDone && onDone(r.user); }
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

// The recovery code: shown once at sign-up, the only way back in without Telegram.
export function showRecovery(code) {
  return new Promise(res => {
    const d = sheet(`<h2>Save your recovery code</h2><p class="muted" style="margin:6px 0 16px">If you forget your password, this code gets you back in. We can't show it again. Screenshot it or save it in your notes.</p>
      <p class="card" style="font-family:var(--mono);font-size:26px;text-align:center;letter-spacing:.06em" data-code>${esc(code)}</p>
      <div class="row" style="margin-top:16px"><button class="btn quiet" data-copy>Copy</button><button class="btn" data-ok>I've saved it</button></div>`);
    d.querySelector('[data-copy]').onclick = async () => { try { await navigator.clipboard.writeText(code); toast('Copied'); } catch { toast('Select the code and copy it'); } };
    d.querySelector('[data-ok]').onclick = () => d.close();
    d.addEventListener('close', () => res());
  });
}
export function recoverSheet(onDone) {
  const d = sheet(`<h2>Reset your password</h2><p class="muted" style="margin:6px 0 16px">Use the recovery code you saved when you signed up.</p>
    <form data-f novalidate><div class="field"><label for="r-h">Your ID</label><input id="r-h" name="handle" autocapitalize="off" required></div>
    <div class="field"><label for="r-c">Recovery code</label><input id="r-c" name="code" autocapitalize="characters" placeholder="XXXX-XXXX-XXXX" required></div>
    <div class="field"><label for="r-p">New password</label><input id="r-p" name="password" type="password" autocomplete="new-password" minlength="8" required></div>
    <p class="error" data-err role="alert"></p><button class="btn" style="width:100%">Reset password</button></form>`);
  d.querySelector('[data-f]').onsubmit = async e => { e.preventDefault(); try { const r = await api('/api/auth/recover', { method: 'POST', body: Object.fromEntries(new FormData(e.target)) }); await me(true); d.close(); await showRecovery(r.recoveryCode); onDone && onDone(r.user); } catch (x) { d.querySelector('[data-err]').textContent = x.message; } };
}

// Find a person by ID, as you type. Resolves with the chosen person, or null.
export function pickPerson(title = 'New chat') {
  return new Promise(res => {
    let chosen = null, t;
    const d = sheet(`<h2>${esc(title)}</h2><div class="field" style="margin-top:12px"><label for="pp-q">Search by ID</label><input id="pp-q" autocapitalize="off" autocomplete="off" placeholder="Type at least 2 letters"></div><div class="list" data-res style="margin-top:12px"></div><p class="small muted" data-hint style="margin-top:12px">Not here yet? Send them your invite link from the You tab.</p>`);
    const box = d.querySelector('[data-res]'), q = d.querySelector('#pp-q');
    q.oninput = () => { clearTimeout(t); t = setTimeout(async () => { const v = q.value.trim(); if (v.replace(/^@/, '').length < 2) { box.innerHTML = ''; return; } try { const { people } = await api(`/api/users/search?q=${encodeURIComponent(v)}`); box.innerHTML = people.map(p => `<button class="item" data-h="${esc(p.handle)}">${avatar(p)}<span class="grow"><b>${esc(p.name)}</b><small>@${esc(p.handle)}</small></span></button>`).join('') || `<p class="empty">No one with an ID starting "${esc(v)}".</p>`; } catch (e) { box.innerHTML = `<p class="error">${esc(e.message)}</p>`; } }, 220); };
    box.onclick = e => { const b = e.target.closest('[data-h]'); if (!b) return; chosen = b.dataset.h; d.close(); };
    d.addEventListener('close', () => res(chosen));
  });
}

// A text field in a sheet (replaces the browser's prompt box).
export function ask(title, label, value = '') {
  return new Promise(res => {
    let out = null;
    const d = sheet(`<h2>${esc(title)}</h2><form data-f style="margin-top:12px"><div class="field"><label for="ask-v">${esc(label)}</label><input id="ask-v" value="${esc(value)}" maxlength="40"></div><button class="btn" style="width:100%;margin-top:16px">Save</button></form>`);
    d.querySelector('[data-f]').onsubmit = e => { e.preventDefault(); out = d.querySelector('#ask-v').value.trim() || null; d.close(); };
    d.addEventListener('close', () => res(out));
  });
}

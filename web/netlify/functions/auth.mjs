// Accounts: sign up, log in (password or Telegram), log out, me, app IDs, settings.
import crypto from 'node:crypto';
import { getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, sessionCookie, clearCookie, currentUser, requireUser, HANDLE, id, clean, publicUser } from '../lib/http.mjs';

const scrypt = (pw, salt) => new Promise((ok, no) => crypto.scrypt(pw, salt, 64, (e, k) => e ? no(e) : ok(k.toString('base64'))));
const APPS = { prep: 'PrepID', good: 'GoodID', tm: 'Tomorrow ID' };

async function saveUser(u) { await setJSON('users', `id/${u.id}`, u); await setJSON('users', `handle/${u.handle}`, { id: u.id }); }
async function byHandle(h) { const r = await getJSON('users', `handle/${h}`); return r && getJSON('users', `id/${r.id}`); }
const ok = (u, extra = {}) => json({ user: publicUser(u), ...extra }, 200, { 'set-cookie': sessionCookie(u.id) });

// Telegram Login Widget check: https://core.telegram.org/widgets/login#checking-authorization
function telegramValid(d) {
  const token = process.env.TELEGRAM_BOT_TOKEN; if (!token || !d || !d.hash) return false;
  const check = Object.keys(d).filter(k => k !== 'hash').sort().map(k => `${k}=${d[k]}`).join('\n');
  const key = crypto.createHash('sha256').update(token).digest();
  const h = crypto.createHmac('sha256', key).update(check).digest('hex');
  return h.length === d.hash.length && crypto.timingSafeEqual(Buffer.from(h), Buffer.from(String(d.hash))) && Date.now() / 1000 - Number(d.auth_date) < 86400;
}

export default handled(async (req, ctx) => {
  const action = ctx.params.action, m = req.method;
  if (action === 'me' && m === 'GET') { const u = await currentUser(req); const t = process.env.TELEGRAM_BOT_TOKEN; return json({ user: publicUser(u), notify: u?.notify || 'app', telegramBotId: t ? Number(t.split(':')[0]) || null : null }); }
  if (action === 'signup' && m === 'POST') {
    const b = await body(req), name = clean(b.name, 60), handle = clean(b.handle, 24).toLowerCase().replace(/^@/, ''), age = parseInt(b.age, 10);
    if (!name) return fail(400, 'Add your name.');
    if (!HANDLE.test(handle)) return fail(400, 'Your ID can use 2 to 24 letters, numbers, dots or underscores.');
    if (!(age >= 13 && age <= 120)) return fail(400, 'You need to be 13 or older.');
    if (String(b.password || '').length < 8) return fail(400, 'Use a password of 8 characters or more.');
    if (await byHandle(handle)) return fail(409, 'That ID is taken. Try another.');
    const salt = id(16), u = { id: id(), name, handle, age, created: Date.now(), ids: {}, salt, pw: await scrypt(String(b.password), salt), oseLinked: b.app !== 'tm', notify: 'app' };
    if (b.app === 'tm') u.ids.tm = handle;
    await saveUser(u); return ok(u);
  }
  if (action === 'login' && m === 'POST') {
    const b = await body(req), u = await byHandle(clean(b.handle, 24).toLowerCase().replace(/^@/, ''));
    if (!u || !u.pw || (await scrypt(String(b.password || ''), u.salt)) !== u.pw) return fail(401, 'That ID and password don\'t match.');
    return ok(u);
  }
  if (action === 'telegram' && m === 'POST') {
    const d = await body(req);
    if (!process.env.TELEGRAM_BOT_TOKEN) return fail(503, 'Telegram login isn\'t switched on yet.');
    if (!telegramValid(d)) return fail(401, 'Telegram couldn\'t confirm this login. Try again.');
    const link = await getJSON('users', `tg/${d.id}`);
    let u = link && await getJSON('users', `id/${link.id}`);
    if (!u) {
      let handle = clean(d.username || `tg${d.id}`, 24).toLowerCase().replace(/[^a-z0-9._]/g, '_');
      if (!HANDLE.test(handle) || await byHandle(handle)) handle = `tg${d.id}`.slice(0, 24);
      u = { id: id(), name: clean([d.first_name, d.last_name].filter(Boolean).join(' '), 60) || handle, handle, created: Date.now(), ids: {}, oseLinked: true, notify: 'telegram' };
    }
    u.telegram = { id: String(d.id), username: d.username || null };
    await saveUser(u); await setJSON('users', `tg/${d.id}`, { id: u.id });
    return ok(u);
  }
  if (action === 'logout' && m === 'POST') return json({ ok: true }, 200, { 'set-cookie': clearCookie() });
  if (action === 'appid' && m === 'POST') {
    const u = await requireUser(req), b = await body(req), app = b.app, h = clean(b.handle || u.handle, 24).toLowerCase().replace(/^@/, '');
    if (!APPS[app]) return fail(400, 'Unknown app.');
    if (!HANDLE.test(h)) return fail(400, 'Use 2 to 24 letters, numbers, dots or underscores.');
    const taken = await getJSON('users', `app/${app}/${h}`); if (taken && taken.id !== u.id) return fail(409, `That ${APPS[app]} is taken.`);
    u.ids = { ...(u.ids || {}), [app]: h }; await saveUser(u); await setJSON('users', `app/${app}/${h}`, { id: u.id });
    return json({ user: publicUser(u) });
  }
  if (action === 'settings' && m === 'POST') {
    const u = await requireUser(req), b = await body(req);
    if (b.notify) u.notify = b.notify === 'telegram' ? 'telegram' : 'app';
    if (typeof b.oseLinked === 'boolean') u.oseLinked = b.oseLinked;
    if (b.name) u.name = clean(b.name, 60);
    await saveUser(u); return json({ user: publicUser(u), notify: u.notify });
  }
  if (action === 'delete' && m === 'POST') {   // data deletion, for users and for Meta's App Review
    const u = await requireUser(req); const { store } = await import('../lib/store.mjs'); const s = await store('users');
    await s.delete(`id/${u.id}`); await s.delete(`handle/${u.handle}`); for (const [a, h] of Object.entries(u.ids || {})) await s.delete(`app/${a}/${h}`); if (u.telegram) await s.delete(`tg/${u.telegram.id}`);
    return json({ ok: true }, 200, { 'set-cookie': clearCookie() });
  }
  return fail(404, 'Not found.');
});
export const config = { path: '/api/auth/:action' };

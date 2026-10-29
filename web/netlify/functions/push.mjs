// Web push sign-up: the browser gives us a subscription; we keep up to 8 per person.
import { getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, requireUser, clean } from '../lib/http.mjs';

export default handled(async (req, ctx) => {
  const a = ctx.params.action;
  if (a === 'key' && req.method === 'GET') return json({ key: process.env.VAPID_PUBLIC_KEY || null });
  const u = await requireUser(req), b = await body(req), list = (await getJSON('push', u.id)) || [];
  if (a === 'subscribe' && req.method === 'POST') {
    const sub = b.subscription; if (!sub || !/^https:\/\//.test(sub.endpoint || '') || !sub.keys) return fail(400, 'Not a push subscription.');
    const next = [...list.filter(s => s.sub.endpoint !== sub.endpoint), { sub: { endpoint: sub.endpoint, keys: { p256dh: clean(sub.keys.p256dh, 200), auth: clean(sub.keys.auth, 100) } }, device: clean(b.device, 40), at: Date.now() }].slice(-8);
    await setJSON('push', u.id, next); return json({ ok: true, devices: next.length });
  }
  if (a === 'unsubscribe' && req.method === 'POST') { await setJSON('push', u.id, list.filter(s => s.sub.endpoint !== b.endpoint)); return json({ ok: true }); }
  return fail(404, 'Not found.');
});
export const config = { path: '/api/push/:action' };

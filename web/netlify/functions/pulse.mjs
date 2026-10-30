// Counting without collecting: page views per day and "I'm interested" taps per coming-soon
// app. No names, no cookies, no IP addresses; just numbers. Admin token to read the details.
import { getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, limit, clean } from '../lib/http.mjs';

export const SOON = ['tomorrow', 'goodhabit', 'ai', 'goodstuff', 'library', 'accounting'];
const SHOW_FROM = 50;   // public counts appear once they mean something
const isAdmin = req => { const t = process.env.ADMIN_TOKEN, h = req.headers.get('authorization') || ''; return !!t && t.length >= 24 && h === `Bearer ${t}`; };
const day = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);

export default handled(async (req, ctx) => {
  const what = ctx.params.what, m = req.method;
  if (what === 'interest' && m === 'POST') {
    await limit(req, ctx, 'interest', 20, 3600);
    const app = clean((await body(req)).app, 20); if (!SOON.includes(app)) return fail(400, 'Unknown app.');
    const c = (await getJSON('pulse', 'interest')) || {}; c[app] = (c[app] || 0) + 1; await setJSON('pulse', 'interest', c);
    return json({ ok: true, count: c[app] >= SHOW_FROM ? c[app] : null });
  }
  if (what === 'interest' && m === 'GET') {
    const c = (await getJSON('pulse', 'interest')) || {};
    return json({ counts: Object.fromEntries(SOON.map(a => [a, isAdmin(req) ? c[a] || 0 : (c[a] || 0) >= SHOW_FROM ? c[a] : null])) });
  }
  if (what === 'view' && m === 'POST') {
    await limit(req, ctx, 'view', 300, 3600);
    const p = clean((await body(req)).p, 60); if (!/^\/[a-z0-9/-]*$/.test(p)) return fail(400, 'Bad page.');
    const k = `views/${day()}`, d = (await getJSON('pulse', k)) || {}; d[p] = (d[p] || 0) + 1; await setJSON('pulse', k, d);
    return json({ ok: true });
  }
  if (what === 'views' && m === 'GET') {
    if (!isAdmin(req)) return fail(401, 'Admin token needed.');
    const out = {}; for (let i = 0; i < 14; i++) { const d = new Date(Date.now() + 5.5 * 3600e3 - i * 864e5).toISOString().slice(0, 10); out[d] = (await getJSON('pulse', `views/${d}`)) || {}; }
    return json({ days: out });
  }
  return fail(404, 'Not found.');
});
export const config = { path: '/api/pulse/:what' };

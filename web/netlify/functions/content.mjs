// Content for each app's page (lessons, case studies, reels). Anyone can read; publishing
// needs the ADMIN_TOKEN, so the content machine (or the founder) can push items in.
import crypto from 'node:crypto';
import { getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, clean, id } from '../lib/http.mjs';

const APPS = ['ose', 'tomorrow', 'openprep', 'goodhabit'];
const admin = req => { const t = process.env.ADMIN_TOKEN, h = (req.headers.get('authorization') || '').replace(/^Bearer /, ''); return !!t && t.length >= 24 && h.length === t.length && crypto.timingSafeEqual(Buffer.from(h), Buffer.from(t)); };

export default handled(async (req, ctx) => {
  const app = ctx.params.app; if (!APPS.includes(app)) return fail(404, 'Unknown app.');
  const items = (await getJSON('content', app)) || [];
  if (req.method === 'GET') return json({ items: items.filter(i => !i.hidden).slice(0, 200) });
  if (!admin(req)) return fail(401, 'Publishing needs the admin token.');
  const b = await body(req);
  if (req.method === 'POST') {
    const it = { id: id(8), at: Date.now(), title: clean(b.title, 140), pillar: clean(b.pillar, 60), text: clean(b.text, 4000), video: clean(b.video, 500), image: clean(b.image, 500), link: clean(b.link, 500) };
    if (!it.title) return fail(400, 'Add a title.');
    for (const k of ['video', 'image', 'link']) if (it[k] && !/^https:\/\//.test(it[k])) return fail(400, `${k} must be an https:// link.`);
    items.unshift(it); await setJSON('content', app, items); return json({ item: it });
  }
  if (req.method === 'DELETE') { await setJSON('content', app, items.filter(i => i.id !== b.id)); return json({ ok: true }); }
  return fail(405, 'Method not allowed.');
});
export const config = { path: '/api/content/:app' };

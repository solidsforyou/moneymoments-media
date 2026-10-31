// Tomorrow's feed: posts, likes and follows. Like counts are never shown to other people.
import { getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, requireUser, currentUser, clean, id, publicUser } from '../lib/http.mjs';

export default handled(async (req, ctx) => {
  const pid = ctx.params.id, sub = ctx.params.sub, m = req.method;
  const feed = (await getJSON('posts', 'feed')) || [];
  if (!pid && m === 'GET') {
    const u = await currentUser(req), follows = u ? ((await getJSON('posts', `follows/${u.id}`)) || []) : [];
    const mode = new URL(req.url).searchParams.get('mode') || 'all';
    const list = feed.filter(p => mode !== 'following' || follows.includes(p.by) || (u && p.by === u.id)).slice(0, 100);
    const people = {}; for (const p of list) if (!people[p.by]) people[p.by] = publicUser(await getJSON('users', `id/${p.by}`));
    return json({ posts: list.filter(p => people[p.by]).map(p => ({ id: p.id, text: p.text, at: p.at, by: people[p.by], liked: !!(u && (p.likes || []).includes(u.id)), mine: !!(u && p.by === u.id), likes: u && p.by === u.id ? (p.likes || []).length : undefined })), follows });
  }
  const u = await requireUser(req);
  if (!pid && m === 'POST') {
    if (!u.ids?.tm) return fail(403, 'Make your Tomorrow ID first.');
    if ((u.age || 18) < 18) return fail(403, 'Posting is for 18 and over.');
    const b = await body(req), text = clean(b.text, 1000); if (!text) return fail(400, 'Write something first.');
    const p = { id: id(8), by: u.id, text, at: Date.now(), likes: [] }; feed.unshift(p); if (feed.length > 5000) feed.length = 5000;
    await setJSON('posts', 'feed', feed); return json({ post: { ...p, by: publicUser(u), mine: true, liked: false, likes: 0 } });
  }
  if (pid === 'follow' && m === 'POST') {
    const b = await body(req), ref = await getJSON('users', `handle/${clean(b.handle, 24).toLowerCase()}`); if (!ref) return fail(404, 'No one with that ID.');
    const f = (await getJSON('posts', `follows/${u.id}`)) || [], on = !f.includes(ref.id);
    await setJSON('posts', `follows/${u.id}`, on ? [...f, ref.id] : f.filter(x => x !== ref.id)); return json({ following: on });
  }
  const p = feed.find(x => x.id === pid); if (!p) return fail(404, 'Post not found.');
  if (sub === 'like' && m === 'POST') { p.likes = p.likes || []; const on = !p.likes.includes(u.id); p.likes = on ? [...p.likes, u.id] : p.likes.filter(x => x !== u.id); await setJSON('posts', 'feed', feed); return json({ liked: on }); }
  if (!sub && m === 'DELETE') { if (p.by !== u.id) return fail(403, 'Not your post.'); await setJSON('posts', 'feed', feed.filter(x => x.id !== pid)); return json({ ok: true }); }
  return fail(404, 'Not found.');
});
export const config = { path: ['/api/posts', '/api/posts/:id', '/api/posts/:id/:sub'] };

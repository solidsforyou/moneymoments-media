// Find people by their ID as you type.
import { store, getJSON } from '../lib/store.mjs';
import { json, handled, requireUser, publicUser } from '../lib/http.mjs';

export default handled(async (req) => {
  const u = await requireUser(req), q = (new URL(req.url).searchParams.get('q') || '').toLowerCase().replace(/^@/, '').replace(/[^a-z0-9._]/g, '');
  if (q.length < 2) return json({ people: [] });
  const keys = (await (await store('users')).list({ prefix: `handle/${q}` })).blobs.slice(0, 20);
  const people = [];
  for (const k of keys) { const ref = await getJSON('users', k.key); if (ref && ref.id !== u.id) { const p = publicUser(await getJSON('users', `id/${ref.id}`)); if (p) people.push(p); } if (people.length >= 10) break; }
  return json({ people });
});
export const config = { path: '/api/users/search' };

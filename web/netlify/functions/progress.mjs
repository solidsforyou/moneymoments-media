// Saved progress (lessons done, mock answers and scores, simulator games), so it follows you
// to every device once you have an account. Each item keeps its own "last changed" time;
// the newest copy wins.
import { getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, requireUser } from '../lib/http.mjs';

const KEYS = /^(op-done|op-free-mock-\d+|gh-sim-v1)$/, MAX = 400000;

export default handled(async (req) => {
  const u = await requireUser(req), all = (await getJSON('progress', u.id)) || {};
  if (req.method === 'GET') return json({ items: all });
  if (req.method === 'PUT') {
    const b = await body(req), items = b.items || {};
    for (const [k, it] of Object.entries(items)) {
      if (!KEYS.test(k) || !it || typeof it.t !== 'number') return fail(400, `Can't save "${k}".`);
      if (JSON.stringify(it.v ?? null).length > MAX) return fail(413, 'That progress is too big to save.');
      if (!all[k] || it.t >= all[k].t) all[k] = { v: it.v ?? null, t: it.t };
    }
    await setJSON('progress', u.id, all); return json({ items: all });
  }
  return fail(405, 'Method not allowed.');
});
export const config = { path: '/api/progress' };

// Free mock results. We keep each attempt's score; a percentile is shown only once enough
// people have taken the same mock (200), so it's never a made-up number.
import { getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, requireUser, currentUser, clean } from '../lib/http.mjs';

const MIN = 200;
export default handled(async (req, ctx) => {
  const mid = clean(ctx.params.id, 40); if (!/^[a-z0-9-]+$/.test(mid)) return fail(404, 'Unknown mock.');
  const all = (await getJSON('mocks', `scores/${mid}`)) || [];
  if (ctx.params.sub === 'result' && req.method === 'POST') {
    const u = await requireUser(req), b = await body(req), score = Number(b.score);
    if (!Number.isFinite(score) || score < -100 || score > 300) return fail(400, 'Bad score.');
    const mine = (await getJSON('mocks', `user/${u.id}`)) || [];
    const first = !mine.some(r => r.mock === mid);
    mine.push({ mock: mid, score, sections: b.sections || {}, at: Date.now() }); await setJSON('mocks', `user/${u.id}`, mine.slice(-50));
    if (first) { all.push(score); await setJSON('mocks', `scores/${mid}`, all); }   // only first attempts count toward percentiles
    return json(stats(all, score));
  }
  if (ctx.params.sub === 'stats' && req.method === 'GET') { const u = await currentUser(req); const mine = u ? ((await getJSON('mocks', `user/${u.id}`)) || []).filter(r => r.mock === mid) : []; return json({ ...stats(all, mine[0]?.score), attempts: mine }); }
  return fail(404, 'Not found.');
});
function stats(all, score) {
  const out = { takers: all.length, percentileFrom: MIN };
  if (all.length >= MIN && Number.isFinite(score)) out.percentile = Math.round(all.filter(s => s < score).length / all.length * 1000) / 10;
  return out;
}
export const config = { path: '/api/mocks/:id/:sub' };

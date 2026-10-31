// File transfer. Big files go up and down in 4 MB pieces, so they never hit the ~6 MB
// limit on a single function request or response. Only the owner and the people a file
// was sent to can read it.
import { store, getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, requireUser, clean, id } from '../lib/http.mjs';

export const CHUNK = 4 * 1024 * 1024;
const MAX = () => Number(process.env.MAX_FILE_MB || 100) * 1024 * 1024;
const canRead = (f, u) => f && f.done && (f.owner === u.id || (f.allowed || []).includes(u.id));

export default handled(async (req, ctx) => {
  const u = await requireUser(req), fid = ctx.params.id, sub = ctx.params.sub, n = Number(ctx.params.n), m = req.method;
  const s = await store('files');
  if (!fid && m === 'POST') {
    const ct = req.headers.get('content-type') || '';
    if (ct.includes('application/json')) {   // start a chunked upload
      const b = await body(req), size = Number(b.size);
      if (!(size > 0)) return fail(400, 'The file is empty.');
      if (size > MAX()) return fail(413, `Files can be up to ${Math.round(MAX() / 1048576)} MB.`);
      const f = { id: id(), owner: u.id, name: clean(b.name, 200) || 'file', type: clean(b.type, 100) || 'application/octet-stream', size, chunks: Math.ceil(size / CHUNK), at: Date.now(), allowed: [], done: false };
      await setJSON('files', `meta/${f.id}`, f); return json({ id: f.id, chunkSize: CHUNK, chunks: f.chunks });
    }
    // small file in one request (up to one chunk)
    const name = clean(decodeURIComponent(req.headers.get('x-file-name') || 'file'), 200) || 'file', type = clean(ct || 'application/octet-stream', 100);
    const buf = await req.arrayBuffer(); if (!buf.byteLength) return fail(400, 'The file is empty.'); if (buf.byteLength > CHUNK) return fail(413, 'Use a chunked upload for files over 4 MB.');
    const f = { id: id(), owner: u.id, name, type, size: buf.byteLength, chunks: 1, at: Date.now(), allowed: [], done: true };
    await s.set(`data/${f.id}/0`, buf); await setJSON('files', `meta/${f.id}`, f);
    return json({ file: { id: f.id, name, type, size: f.size } });
  }
  if (!fid) return fail(404, 'Not found.');
  const f = await getJSON('files', `meta/${fid}`);
  if (sub === 'chunk' && m === 'PUT') {
    if (!f || f.owner !== u.id || f.done) return fail(404, 'Upload not found.');
    if (!(n >= 0 && n < f.chunks)) return fail(400, 'Bad piece number.');
    const buf = await req.arrayBuffer(), want = n === f.chunks - 1 ? f.size - CHUNK * (f.chunks - 1) : CHUNK;
    if (buf.byteLength !== want) return fail(400, 'That piece is the wrong size.');
    await s.set(`data/${fid}/${n}`, buf); return json({ ok: true });
  }
  if (sub === 'done' && m === 'POST') {
    if (!f || f.owner !== u.id) return fail(404, 'Upload not found.');
    const have = new Set((await s.list({ prefix: `data/${fid}/` })).blobs.map(x => x.key));
    for (let i = 0; i < f.chunks; i++) if (!have.has(`data/${fid}/${i}`)) return fail(400, `Piece ${i + 1} of ${f.chunks} is missing.`);
    f.done = true; await setJSON('files', `meta/${fid}`, f); return json({ file: { id: f.id, name: f.name, type: f.type, size: f.size } });
  }
  if (!canRead(f, u)) return fail(404, 'File not found.');
  if (sub === 'meta' && m === 'GET') return json({ id: f.id, name: f.name, type: f.type, size: f.size, chunks: f.chunks, chunkSize: CHUNK });
  if (sub === 'chunk' && m === 'GET') {
    if (!(n >= 0 && n < f.chunks)) return fail(400, 'Bad piece number.');
    const d = await s.get(`data/${fid}/${n}`, { type: 'arrayBuffer' }); if (!d) return fail(404, 'File not found.');
    return new Response(d, { headers: { 'content-type': 'application/octet-stream', 'cache-control': 'private, max-age=86400' } });
  }
  if (!sub && m === 'GET') {   // whole file, only when it fits in one piece (photos, thumbnails)
    if (f.chunks > 1) return json({ error: 'Download this file in pieces.', chunks: f.chunks }, 409);
    const d = await s.get(`data/${fid}/0`, { type: 'arrayBuffer' }); if (!d) return fail(404, 'File not found.');
    const inline = /^image\/|^video\//.test(f.type) && new URL(req.url).searchParams.get('view') === '1';
    return new Response(d, { headers: { 'content-type': f.type, 'content-disposition': `${inline ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(f.name)}`, 'cache-control': 'private, max-age=86400' } });
  }
  return fail(404, 'Not found.');
});
export const config = { path: ['/api/files', '/api/files/:id', '/api/files/:id/:sub', '/api/files/:id/:sub/:n'] };

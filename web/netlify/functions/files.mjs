// File transfer: upload once, then send it to a person or to your own devices. Only the
// owner and the people it was sent to can download it.
import { store, getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, handled, requireUser, clean, id } from '../lib/http.mjs';

const MAX = Number(process.env.MAX_FILE_MB || 5) * 1024 * 1024;   // Netlify Functions accept request bodies up to about 6 MB; bigger files need direct uploads (README)

export default handled(async (req, ctx) => {
  const u = await requireUser(req), fid = ctx.params.id;
  if (!fid && req.method === 'POST') {
    const name = clean(decodeURIComponent(req.headers.get('x-file-name') || 'file'), 200) || 'file', type = clean(req.headers.get('content-type') || 'application/octet-stream', 100);
    const buf = await req.arrayBuffer(); if (!buf.byteLength) return fail(400, 'The file is empty.'); if (buf.byteLength > MAX) return fail(413, `Files can be up to ${MAX / 1048576} MB for now.`);
    const f = { id: id(), owner: u.id, name, type, size: buf.byteLength, at: Date.now(), allowed: [] };
    await (await store('files')).set(`data/${f.id}`, buf); await setJSON('files', `meta/${f.id}`, f);
    return json({ file: { id: f.id, name, type, size: f.size } });
  }
  if (fid && req.method === 'GET') {
    const f = await getJSON('files', `meta/${fid}`); if (!f || (f.owner !== u.id && !(f.allowed || []).includes(u.id))) return fail(404, 'File not found.');
    const data = await (await store('files')).get(`data/${fid}`, { type: 'arrayBuffer' }); if (!data) return fail(404, 'File not found.');
    return new Response(data, { headers: { 'content-type': f.type, 'content-disposition': `attachment; filename*=UTF-8''${encodeURIComponent(f.name)}`, 'cache-control': 'private, no-store' } });
  }
  return fail(404, 'Not found.');
});
export const config = { path: ['/api/files', '/api/files/:id'] };

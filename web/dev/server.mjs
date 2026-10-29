// Local server: serves the built site from dist/ and runs the Netlify functions with
// file-based storage in .data/, so everything works without a Netlify account.
//   npm run dev            → http://localhost:8888
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist'), FN = path.join(ROOT, 'netlify/functions');
const PORT = Number(process.env.PORT || 8888);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon' };

// route patterns like /api/chats/:id/:sub, as in each function's config.path
const routes = [];
for (const f of await fs.readdir(FN)) {
  if (!f.endsWith('.mjs')) continue;
  const mod = await import(pathToFileURL(path.join(FN, f)).href);
  for (const p of [].concat(mod.config.path)) {
    const keys = [], re = new RegExp('^' + p.replace(/:([a-z]+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '/?$');
    routes.push({ re, keys, fn: mod.default });
  }
}
routes.sort((a, b) => b.keys.length - a.keys.length);

async function api(req, res, url) {
  for (const r of routes) {
    const m = url.pathname.match(r.re); if (!m) continue;
    const params = Object.fromEntries(r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
    const chunks = []; for await (const c of req) chunks.push(c);
    const request = new Request(url, { method: req.method, headers: req.headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks) });
    const out = await r.fn(request, { params });
    const headers = {}; out.headers.forEach((v, k) => { headers[k] = v; });
    res.writeHead(out.status, headers); res.end(Buffer.from(await out.arrayBuffer())); return;
  }
  res.writeHead(404, { 'content-type': 'application/json' }); res.end('{"error":"Not found."}');
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    let p = path.join(DIST, path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, ''));
    if (!p.startsWith(DIST)) { res.writeHead(403); return res.end(); }
    try { if ((await fs.stat(p)).isDirectory()) p = path.join(p, 'index.html'); } catch { p = path.join(DIST, '404.html'); }
    const data = await fs.readFile(p).catch(() => null);
    if (!data) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(p.endsWith('404.html') ? 404 : 200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' }); res.end(data);
  } catch (e) { console.error(e); res.writeHead(500); res.end('Server error'); }
}).listen(PORT, () => console.log(`OSE dev server on http://localhost:${PORT}`));

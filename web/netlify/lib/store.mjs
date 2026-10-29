// Key-value storage. On Netlify it's Netlify Blobs; anywhere else (local dev, tests) it's
// JSON files under web/.data, so the same functions run in both places.
import fs from 'node:fs/promises';
import path from 'node:path';

const onNetlify = () => !!(process.env.NETLIFY_BLOBS_CONTEXT || process.env.NETLIFY || globalThis.Netlify);
const DATA = process.env.OSE_DATA_DIR || path.resolve(process.cwd(), '.data');
const safe = k => encodeURIComponent(k).replace(/%2F/g, '__');

function fileStore(name) {
  const dir = path.join(DATA, name);
  return {
    async get(key, opts = {}) {
      try { const b = await fs.readFile(path.join(dir, safe(key))); return opts.type === 'json' ? JSON.parse(b.toString()) : opts.type === 'arrayBuffer' ? b.buffer.slice(b.byteOffset, b.byteOffset + b.length) : b.toString(); }
      catch (e) { if (e.code === 'ENOENT') return null; throw e; }
    },
    async set(key, value) { await fs.mkdir(dir, { recursive: true }); await fs.writeFile(path.join(dir, safe(key)), value instanceof ArrayBuffer ? Buffer.from(value) : value); },
    async setJSON(key, value) { await this.set(key, JSON.stringify(value)); },
    async delete(key) { await fs.rm(path.join(dir, safe(key)), { force: true }); },
    async list({ prefix = '' } = {}) {
      let names = []; try { names = await fs.readdir(dir); } catch (e) { if (e.code !== 'ENOENT') throw e; }
      return { blobs: names.map(n => ({ key: decodeURIComponent(n.replace(/__/g, '%2F')) })).filter(b => b.key.startsWith(prefix)) };
    },
  };
}

const cache = {};
export async function store(name) {
  if (cache[name]) return cache[name];
  if (onNetlify()) { const { getStore } = await import('@netlify/blobs'); cache[name] = getStore({ name, consistency: 'strong' }); }
  else cache[name] = fileStore(name);
  return cache[name];
}
export const getJSON = async (s, k) => (await store(s)).get(k, { type: 'json' });
export const setJSON = async (s, k, v) => (await store(s)).setJSON(k, v);

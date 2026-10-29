// End-to-end API tests against the local server (file storage in a temp folder).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const PORT = 18000 + Math.floor(Math.random() * 1000), BASE = `http://localhost:${PORT}`;
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'ose-test-')), ADMIN = 'test-admin-token-0123456789abcdef';
let srv;
before(async () => {
  srv = spawn('node', ['dev/server.mjs'], { env: { ...process.env, PORT: String(PORT), OSE_DATA_DIR: DATA, ADMIN_TOKEN: ADMIN }, stdio: 'pipe' });
  await new Promise((ok, no) => { srv.stdout.on('data', d => String(d).includes('dev server') && ok()); srv.on('exit', c => no(new Error('server exited ' + c))); setTimeout(() => no(new Error('server timeout')), 8000); });
});
after(() => { srv.kill(); fs.rmSync(DATA, { recursive: true, force: true }); });

class Agent { constructor() { this.cookie = ''; }
  async req(p, { method = 'GET', body, headers = {}, raw } = {}) {
    const r = await fetch(BASE + p, { method, headers: { ...(body && !raw ? { 'content-type': 'application/json' } : {}), ...(this.cookie ? { cookie: this.cookie } : {}), ...headers }, body: raw || (body && JSON.stringify(body)) });
    const sc = r.headers.get('set-cookie'); if (sc) this.cookie = sc.split(';')[0];
    const ct = r.headers.get('content-type') || ''; return { status: r.status, data: ct.includes('json') ? await r.json() : Buffer.from(await r.arrayBuffer()) };
  } }
const asha = new Agent(), kabir = new Agent(), zoya = new Agent();

test('sign up checks input and makes accounts', async () => {
  assert.equal((await asha.req('/api/auth/signup', { method: 'POST', body: { name: 'Asha', handle: 'A!', age: 21, password: 'longenough' } })).status, 400);
  assert.equal((await asha.req('/api/auth/signup', { method: 'POST', body: { name: 'Asha', handle: 'asha', age: 21, password: 'short' } })).status, 400);
  const r = await asha.req('/api/auth/signup', { method: 'POST', body: { name: 'Asha Rao', handle: 'asha', age: 21, password: 'longenough' } });
  assert.equal(r.status, 200); assert.equal(r.data.user.handle, 'asha'); assert.equal(r.data.user.oseLinked, true);
  assert.equal((await zoya.req('/api/auth/signup', { method: 'POST', body: { name: 'Zoya', handle: 'asha', age: 22, password: 'longenough' } })).status, 409);
  const k = await kabir.req('/api/auth/signup', { method: 'POST', body: { name: 'Kabir', handle: 'kabir', age: 22, password: 'longenough', app: 'tm' } });
  assert.equal(k.data.user.ids.tm, 'kabir'); assert.equal(k.data.user.oseLinked, false);
  await zoya.req('/api/auth/signup', { method: 'POST', body: { name: 'Zoya', handle: 'zoya', age: 16, password: 'longenough', app: 'tm' } });
});

test('log in, me, log out', async () => {
  const x = new Agent();
  assert.equal((await x.req('/api/auth/login', { method: 'POST', body: { handle: 'asha', password: 'wrongpass' } })).status, 401);
  assert.equal((await x.req('/api/auth/login', { method: 'POST', body: { handle: '@Asha', password: 'longenough' } })).status, 200);
  assert.equal((await x.req('/api/auth/me')).data.user.handle, 'asha');
  await x.req('/api/auth/logout', { method: 'POST' }); x.cookie = '';
  assert.equal((await x.req('/api/auth/me')).data.user, null);
  const forged = new Agent(); forged.cookie = 'ose_s=' + Buffer.from(JSON.stringify({ u: 'x', exp: Date.now() + 1e9 })).toString('base64url') + '.bad';
  assert.equal((await forged.req('/api/auth/me')).data.user, null);
});

test('app IDs are created on demand and stay unique', async () => {
  assert.equal((await asha.req('/api/auth/appid', { method: 'POST', body: { app: 'prep', handle: 'asha' } })).data.user.ids.prep, 'asha');
  assert.equal((await zoya.req('/api/auth/appid', { method: 'POST', body: { app: 'prep', handle: 'asha' } })).status, 409);
  assert.equal((await asha.req('/api/auth/appid', { method: 'POST', body: { app: 'nope' } })).status, 400);
});

test('messages between two people, and My devices', async () => {
  const start = await asha.req('/api/chats/start', { method: 'POST', body: { handle: 'kabir' } }); assert.equal(start.status, 200);
  const cid = start.data.id;
  assert.equal((await asha.req(`/api/chats/${cid}/send`, { method: 'POST', body: { text: 'hi kabir' } })).status, 200);
  const list = await kabir.req('/api/chats'); const c = list.data.chats.find(x => x.id === cid);
  assert.equal(c.unread, 1); assert.equal(c.with.handle, 'asha');
  assert.equal((await kabir.req(`/api/chats/${cid}`)).data.messages[0].text, 'hi kabir');
  assert.equal((await zoya.req(`/api/chats/${cid}`)).status, 403);
  const self = (await asha.req('/api/chats')).data.chats.find(x => x.with.self); assert.ok(self);
  await asha.req(`/api/chats/${self.id}/send`, { method: 'POST', body: { text: 'note to self', device: 'Laptop' } });
  const again = new Agent(); await again.req('/api/auth/login', { method: 'POST', body: { handle: 'asha', password: 'longenough' } });
  assert.equal((await again.req(`/api/chats/${self.id}`)).data.messages[0].device, 'Laptop');
});

test('files: only the owner and the people it was sent to can download', async () => {
  const up = await asha.req('/api/files', { method: 'POST', raw: Buffer.from('hello file'), headers: { 'x-file-name': encodeURIComponent('notes v2.txt'), 'content-type': 'text/plain' } });
  assert.equal(up.status, 200); const fid = up.data.file.id;
  assert.equal((await kabir.req(`/api/files/${fid}`)).status, 404);
  const cid = (await asha.req('/api/chats/start', { method: 'POST', body: { handle: 'kabir' } })).data.id;
  await asha.req(`/api/chats/${cid}/send`, { method: 'POST', body: { file: fid } });
  const dl = await kabir.req(`/api/files/${fid}`); assert.equal(dl.status, 200); assert.equal(dl.data.toString(), 'hello file');
  assert.equal((await zoya.req(`/api/files/${fid}`)).status, 404);
  assert.equal((await kabir.req(`/api/chats/${cid}/send`, { method: 'POST', body: { file: fid } })).status, 400);
});

test('posts need a Tomorrow ID and 18+, likes are private', async () => {
  assert.equal((await asha.req('/api/posts', { method: 'POST', body: { text: 'first' } })).status, 403);
  assert.equal((await zoya.req('/api/posts', { method: 'POST', body: { text: 'hey' } })).status, 403);
  const p = await kabir.req('/api/posts', { method: 'POST', body: { text: 'Finished Percentages today' } }); assert.equal(p.status, 200);
  assert.equal((await asha.req(`/api/posts/${p.data.post.id}/like`, { method: 'POST' })).data.liked, true);
  const seenByAsha = (await asha.req('/api/posts')).data.posts[0]; assert.equal(seenByAsha.likes, undefined); assert.equal(seenByAsha.liked, true);
  assert.equal((await kabir.req('/api/posts')).data.posts[0].likes, 1);
  assert.equal((await asha.req('/api/posts/follow', { method: 'POST', body: { handle: 'kabir' } })).data.following, true);
  assert.equal((await asha.req('/api/posts?mode=following')).data.posts.length, 1);
});

test('content: public to read, admin token to publish', async () => {
  const x = new Agent();
  assert.equal((await x.req('/api/content/openprep', { method: 'POST', body: { title: 'x' } })).status, 401);
  assert.equal((await x.req('/api/content/openprep', { method: 'POST', body: { title: 'x' }, headers: { authorization: 'Bearer wrong' } })).status, 401);
  const ok = await x.req('/api/content/openprep', { method: 'POST', body: { title: 'Successive discounts', pillar: 'Lesson', video: 'https://example.com/v.mp4' }, headers: { authorization: `Bearer ${ADMIN}` } });
  assert.equal(ok.status, 200);
  assert.equal((await x.req('/api/content/openprep', { method: 'POST', body: { title: 'bad', video: 'javascript:alert(1)' }, headers: { authorization: `Bearer ${ADMIN}` } })).status, 400);
  assert.equal((await x.req('/api/content/openprep')).data.items[0].title, 'Successive discounts');
  assert.equal((await x.req('/api/content/nope')).status, 404);
});

test('pages are served', async () => {
  for (const p of ['/', '/tomorrow/', '/openprep/', '/goodhabit/', '/privacy/', '/delete-data/', '/build/', '/admin/', '/play/']) { const r = await fetch(BASE + p); assert.equal(r.status, 200, p); }
  assert.equal((await fetch(BASE + '/nope')).status, 404);
});

test('delete account', async () => {
  assert.equal((await zoya.req('/api/auth/delete', { method: 'POST' })).status, 200);
  assert.equal((await new Agent().req('/api/auth/login', { method: 'POST', body: { handle: 'zoya', password: 'longenough' } })).status, 401);
});

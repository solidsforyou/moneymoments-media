// End-to-end API tests against the local server (file storage in a temp folder).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildRound, DIFF } from '../netlify/lib/arena-bank.mjs';

const PORT = 18000 + Math.floor(Math.random() * 1000), BASE = `http://localhost:${PORT}`;
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'ose-test-')), ADMIN = 'test-admin-token-0123456789abcdef';
let srv;
before(async () => {
  srv = spawn('node', ['dev/server.mjs'], { env: { ...process.env, PORT: String(PORT), OSE_DATA_DIR: DATA, ADMIN_TOKEN: ADMIN, OSE_NO_LIMITS: '1' }, stdio: 'pipe' });
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

test('big files go up and down in pieces, with a preview image', async () => {
  const size = 6 * 1024 * 1024 + 123, buf = Buffer.alloc(size); for (let i = 0; i < size; i++) buf[i] = i % 251;
  const init = await asha.req('/api/files', { method: 'POST', body: { name: 'trip.mp4', type: 'video/mp4', size } });
  assert.equal(init.status, 200); assert.equal(init.data.chunks, 2);
  assert.equal((await asha.req(`/api/files/${init.data.id}/done`, { method: 'POST' })).status, 400);   // pieces missing
  for (let i = 0; i < init.data.chunks; i++) { const part = buf.subarray(i * init.data.chunkSize, (i + 1) * init.data.chunkSize); assert.equal((await asha.req(`/api/files/${init.data.id}/chunk/${i}`, { method: 'PUT', raw: part, headers: { 'content-type': 'application/octet-stream' } })).status, 200); }
  assert.equal((await kabir.req(`/api/files/${init.data.id}/chunk/0`, { method: 'PUT', raw: Buffer.alloc(10), headers: { 'content-type': 'application/octet-stream' } })).status, 404);
  assert.equal((await asha.req(`/api/files/${init.data.id}/done`, { method: 'POST' })).status, 200);
  const thumb = (await asha.req('/api/files', { method: 'POST', raw: Buffer.from('jpegbytes'), headers: { 'x-file-name': 'preview.jpg', 'content-type': 'image/jpeg' } })).data.file.id;
  const cid = (await asha.req('/api/chats/start', { method: 'POST', body: { handle: 'kabir' } })).data.id;
  const sent = await asha.req(`/api/chats/${cid}/send`, { method: 'POST', body: { file: init.data.id, thumb } });
  assert.equal(sent.data.message.file.thumb, thumb);
  assert.equal((await kabir.req(`/api/files/${thumb}?view=1`)).status, 200);
  assert.equal((await kabir.req(`/api/files/${init.data.id}`)).status, 409);   // too big for one response
  const meta = (await kabir.req(`/api/files/${init.data.id}/meta`)).data; assert.equal(meta.size, size);
  const parts = []; for (let i = 0; i < meta.chunks; i++) parts.push((await kabir.req(`/api/files/${init.data.id}/chunk/${i}`)).data);
  assert.ok(Buffer.concat(parts).equals(buf));
  assert.equal((await zoya.req(`/api/files/${init.data.id}/meta`)).status, 404);
  assert.equal((await asha.req('/api/files', { method: 'POST', body: { name: 'huge', size: 101 * 1024 * 1024 } })).status, 413);
});

test('recovery code resets a password; people search; push key', async () => {
  const x = new Agent(), s = await x.req('/api/auth/signup', { method: 'POST', body: { name: 'Dev', handle: 'devr', age: 25, password: 'firstpass1' } });
  const code = s.data.recoveryCode; assert.match(code, /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  assert.equal((await new Agent().req('/api/auth/recover', { method: 'POST', body: { handle: 'devr', code: 'AAAA-BBBB-CCCC', password: 'newpass123' } })).status, 401);
  const r = await new Agent().req('/api/auth/recover', { method: 'POST', body: { handle: 'devr', code: code.toLowerCase(), password: 'newpass123' } });
  assert.equal(r.status, 200); assert.notEqual(r.data.recoveryCode, code);
  assert.equal((await new Agent().req('/api/auth/recover', { method: 'POST', body: { handle: 'devr', code, password: 'again12345' } })).status, 401);   // old code is spent
  assert.equal((await new Agent().req('/api/auth/login', { method: 'POST', body: { handle: 'devr', password: 'newpass123' } })).status, 200);
  const found = await asha.req('/api/users/search?q=ka'); assert.deepEqual(found.data.people.map(p => p.handle), ['kabir']);
  assert.equal((await asha.req('/api/users/search?q=as')).data.people.length, 0);   // never yourself
  assert.equal((await new Agent().req('/api/users/search?q=ka')).status, 401);
  assert.equal((await asha.req('/api/push/key')).data.key, null);
  assert.equal((await asha.req('/api/push/subscribe', { method: 'POST', body: { subscription: { endpoint: 'http://not-https' } } })).status, 400);
});

test('mock results: saved per person, no percentile until 200 takers', async () => {
  const r = await asha.req('/api/mocks/free-mock-1/result', { method: 'POST', body: { score: 96, sections: { VARC: 30, DILR: 30, QA: 36 } } });
  assert.equal(r.status, 200); assert.equal(r.data.takers, 1); assert.equal(r.data.percentile, undefined);
  await asha.req('/api/mocks/free-mock-1/result', { method: 'POST', body: { score: 120 } });
  assert.equal((await new Agent().req('/api/mocks/free-mock-1/stats')).data.takers, 1);   // only first attempts count
  assert.equal((await asha.req('/api/mocks/free-mock-1/result', { method: 'POST', body: { score: 999 } })).status, 400);
  assert.equal((await new Agent().req('/api/mocks/free-mock-1/result', { method: 'POST', body: { score: 10 } })).status, 401);
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

test('progress: saved per person, newest copy wins, only known items', async () => {
  assert.equal((await new Agent().req('/api/progress')).status, 401);
  const t = Date.now();
  assert.equal((await asha.req('/api/progress', { method: 'PUT', body: { items: { 'op-done': { v: { 'successive': true }, t }, 'gh-sim-v1': { v: { i: 5 }, t } } } })).status, 200);
  await asha.req('/api/progress', { method: 'PUT', body: { items: { 'gh-sim-v1': { v: { i: 1 }, t: t - 1000 } } } });   // older copy is ignored
  const got = (await asha.req('/api/progress')).data.items; assert.equal(got['gh-sim-v1'].v.i, 5); assert.equal(got['op-done'].v.successive, true);
  assert.equal((await asha.req('/api/progress', { method: 'PUT', body: { items: { 'cookies': { v: 1, t } } } })).status, 400);
  assert.deepEqual((await kabir.req('/api/progress')).data.items, {});
});

// Arena: read the round's seed from storage so the test knows the right answers
const roundAnswers = rid => { const r = JSON.parse(fs.readFileSync(path.join(DATA, 'arena', `round__${encodeURIComponent(rid).replace(/_/g, '%5F')}`))); return buildRound({ course: r.course, diff: DIFF[r.diff], level: r.level, seed: r.seed }).map(q => q.a); };
async function play(agent, opts, right = 6) {
  const s = await agent.req('/api/arena/round', { method: 'POST', body: opts }); assert.equal(s.status, 200, JSON.stringify(s.data));
  const n = s.data.questions.length; assert.ok(n >= 4); assert.equal(s.data.questions[0].a, undefined);   // answers never reach the page
  assert.ok(s.data.questions[0].h >= 1 && s.data.questions[0].t > 0);
  const ans = roundAnswers(s.data.round);
  for (let i = 0; i < n; i++) { const r = await agent.req(`/api/arena/round/${s.data.round}`, { method: 'POST', body: { action: 'answer', i, choice: i < right ? ans[i] : (ans[i] + 1) % 4 } }); assert.equal(r.data.right, i < right); assert.equal(r.data.correct, ans[i]); }
  return { start: s.data, result: (await agent.req(`/api/arena/round/${s.data.round}`, { method: 'POST', body: { action: 'finish' } })).data };
}
let C;   // the first course in the bank, whatever it is

test('arena: guests play unranked, nicknames are generated', async () => {
  const g = new Agent(), n = (await g.req('/api/arena/nickname')).data.nick; assert.match(n, /^[A-Z][a-z]+[A-Z][a-z]+\d{2}$/);
  const cat = (await g.req('/api/arena/courses')).data; C = cat.courses[0]; assert.ok(C.chapters.length && C.levels.length && C.readiness);
  assert.equal(cat.limit.on, false);
  assert.equal((await g.req('/api/arena/round', { method: 'POST', body: { course: C.id, difficulty: 'easy', level: 999 } })).status, 400);
  assert.equal((await g.req('/api/arena/round', { method: 'POST', body: { course: 'nope', difficulty: 'easy', level: 1 } })).status, 400);
  const { start, result } = await play(g, { course: C.id, difficulty: 'medium', level: 2 });
  assert.equal(start.ranked, false); assert.equal(result.passed, true); assert.equal(result.stars, 3); assert.equal(result.player, null);
  assert.equal((await g.req('/api/arena/player', { method: 'POST', body: { nick: n, cls: 7, difficulty: 'medium' } })).status, 401);
});

test('arena: ranked play, level gating, XP, readiness data, leaderboard', async () => {
  const cls = C.track === 'school' ? C.cls : 13;
  assert.equal((await asha.req('/api/arena/player', { method: 'POST', body: { nick: 'Asha Rao', cls, difficulty: 'medium' } })).status, 400);
  const p = await asha.req('/api/arena/player', { method: 'POST', body: { nick: 'BraveOtter42', cls, difficulty: 'medium', avatar: { skin: 99, hair: 2 }, guestLevels: { [`${C.id}.easy`]: 3, 'bad key': 9 } } });
  assert.equal(p.data.player.status, 'ok'); assert.equal(p.data.player.avatar.skin, 5); assert.equal(p.data.player.xp, 0); assert.equal(p.data.player.progress[`${C.id}.easy`].max, 3);
  const opts = { course: C.id, difficulty: 'medium' };
  assert.equal((await asha.req('/api/arena/round', { method: 'POST', body: { ...opts, level: 2 } })).status, 403);
  const one = await play(asha, { ...opts, level: 1 }, 5);
  assert.equal(one.start.ranked, true); assert.equal(one.result.passed, true); assert.equal(one.result.stars, 2); assert.equal(one.result.firstClear, true);
  assert.ok(one.result.xp > 20); assert.equal(one.result.player.xp, one.result.xp);
  const pr = one.result.player.progress[`${C.id}.medium`]; assert.equal(pr.max, 1); assert.equal(pr.best[1], Math.round(5 / one.start.questions.length * 100));
  const again = (await asha.req(`/api/arena/round/${one.start.round}`, { method: 'POST', body: { action: 'finish' } })).data; assert.equal(again.xp, one.result.xp);   // finishing twice pays once
  const fail = await play(asha, { ...opts, level: 2 }, 1); assert.equal(fail.result.passed, false); assert.equal(fail.result.player.progress[`${C.id}.medium`].max, 1);
  const lb = (await asha.req(`/api/arena/leaderboard?course=${C.id}&difficulty=medium&period=week`)).data;
  assert.equal(lb.rows[0].nick, 'BraveOtter42'); assert.equal(lb.rows[0].me, true); assert.equal(lb.me.place, 1); assert.equal(lb.rows[0].uid, undefined);
  assert.equal((await asha.req(`/api/arena/leaderboard?course=${C.id}&difficulty=hard`)).data.rows.length, 0);
  const s = await asha.req('/api/arena/round', { method: 'POST', body: { ...opts, level: 2 } });
  assert.equal((await kabir.req(`/api/arena/round/${s.data.round}`, { method: 'POST', body: { action: 'answer', i: 0, choice: 0 } })).status, 403);
  assert.equal((await asha.req('/api/arena/round', { method: 'POST', body: { ...opts, difficulty: 'hard', level: 3 } })).data.ranked, false);
  const bossAt = C.levels.findIndex(L => L.boss) + 1;
  if (bossAt) { const boss = await asha.req('/api/arena/round', { method: 'POST', body: { course: C.id, difficulty: 'hard', level: bossAt } }); assert.equal(boss.data.boss, true); assert.equal(boss.data.seconds, 90); }
});

test('arena: under-18 players need a parent to approve', async () => {
  const cls = C.track === 'school' ? C.cls : 13;
  const p = await zoya.req('/api/arena/player', { method: 'POST', body: { nick: 'SunnyFox07', cls, difficulty: 'easy' } });
  assert.equal(p.data.player.status, 'needs-parent');
  assert.equal((await zoya.req('/api/arena/round', { method: 'POST', body: { course: C.id, difficulty: 'easy', level: 1 } })).data.ranked, false);
  assert.equal((await zoya.req('/api/arena/parent/request', { method: 'POST', body: { parent: 'nobody' } })).status, 404);
  assert.equal((await zoya.req('/api/arena/parent/request', { method: 'POST', body: { parent: '@kabir' } })).data.player.status, 'waiting');
  const kids = (await kabir.req('/api/arena/parent')).data.children; assert.equal(kids[0].nick, 'SunnyFox07');
  assert.equal((await asha.req('/api/arena/parent/approve', { method: 'POST', body: { child: kids[0].id, approve: true } })).status, 404);
  assert.equal((await kabir.req('/api/arena/parent/approve', { method: 'POST', body: { child: kids[0].id, approve: true } })).data.status, 'ok');
  const r = await play(zoya, { course: C.id, difficulty: 'easy', level: 1 }); assert.equal(r.start.ranked, true);
  assert.equal((await zoya.req(`/api/arena/leaderboard?course=${C.id}&difficulty=easy`)).data.rows[0].nick, 'SunnyFox07');
});

test('pulse: interest taps and page views are counted, nothing else', async () => {
  const x = new Agent();
  assert.equal((await x.req('/api/pulse/interest', { method: 'POST', body: { app: 'nope' } })).status, 400);
  assert.equal((await x.req('/api/pulse/interest', { method: 'POST', body: { app: 'tomorrow' } })).data.count, null);   // hidden until 50
  assert.equal((await x.req('/api/pulse/interest')).data.counts.tomorrow, null);
  assert.equal((await x.req('/api/pulse/interest', { headers: { authorization: `Bearer ${ADMIN}` } })).data.counts.tomorrow, 1);
  assert.equal((await x.req('/api/pulse/view', { method: 'POST', body: { p: '/arena/' } })).status, 200);
  assert.equal((await x.req('/api/pulse/view', { method: 'POST', body: { p: 'javascript:x' } })).status, 400);
  assert.equal((await x.req('/api/pulse/views')).status, 401);
  const v = (await x.req('/api/pulse/views', { headers: { authorization: `Bearer ${ADMIN}` } })).data.days;
  assert.equal(Object.values(v).find(d => d['/arena/'])['/arena/'], 1);
});

test('pages are served', async () => {
  for (const p of ['/', '/tomorrow/', '/openprep/', '/openprep/learn/', '/openprep/mock/', '/goodhabit/', '/goodhabit/sim/', '/privacy/', '/delete-data/', '/build/', '/admin/', '/arena/', '/terms/', '/sw.js', '/data/sim.json']) { const r = await fetch(BASE + p); assert.equal(r.status, 200, p); }
  assert.equal((await fetch(BASE + '/nope')).status, 404);
});

test('delete account', async () => {
  assert.equal((await zoya.req('/api/auth/delete', { method: 'POST' })).status, 200);
  assert.equal((await new Agent().req('/api/auth/login', { method: 'POST', body: { handle: 'zoya', password: 'longenough' } })).status, 401);
  assert.equal((await asha.req(`/api/arena/leaderboard?course=${C.id}&difficulty=easy`)).data.rows.length, 0);   // her Arena rows went too
});

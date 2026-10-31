// Arena's free minutes and the ₹99 pass, with fake Razorpay keys (no money moves: the
// order is written straight into storage, as Razorpay's order call would have made it).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const PORT = 19000 + Math.floor(Math.random() * 1000), BASE = `http://localhost:${PORT}`, SECRET = 'test_secret_abc';
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'ose-pay-'));
let srv;
before(async () => {
  srv = spawn('node', ['dev/server.mjs'], { env: { ...process.env, PORT: String(PORT), OSE_DATA_DIR: DATA, RAZORPAY_KEY_ID: 'rzp_test_x', RAZORPAY_KEY_SECRET: SECRET, ARENA_FREE_MINUTES: '0' }, stdio: 'pipe' });
  await new Promise((ok, no) => { srv.stdout.on('data', d => String(d).includes('dev server') && ok()); srv.on('exit', c => no(new Error('server exited ' + c))); setTimeout(() => no(new Error('server timeout')), 8000); });
});
after(() => { srv.kill(); fs.rmSync(DATA, { recursive: true, force: true }); });

const agent = () => { let cookie = ''; return async (p, body) => {
  const r = await fetch(BASE + p, { method: body ? 'POST' : 'GET', headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}) }, body: body && JSON.stringify(body) });
  const sc = r.headers.get('set-cookie'); if (sc) cookie = sc.split(';')[0]; return { status: r.status, data: await r.json() };
}; };
const put = (k, v) => { fs.mkdirSync(path.join(DATA, 'arena'), { recursive: true }); fs.writeFileSync(path.join(DATA, 'arena', encodeURIComponent(k).replace(/_/g, '%5F').replace(/%2F/g, '__')), JSON.stringify(v)); };

test('free minutes run out, a parent pays, the child plays on', async () => {
  const parent = agent(), kid = agent(), guest = agent();
  const cat = (await guest('/api/arena/courses')).data, C = cat.courses[0];
  assert.equal(cat.limit.on, true); assert.equal(cat.limit.price, 99);
  const pu = (await parent('/api/auth/signup', { name: 'Meera', handle: 'meera', age: 40, password: 'longenough' })).data.user;
  await kid('/api/auth/signup', { name: 'Riya', handle: 'riya', age: 15, password: 'longenough' });
  const round = { course: C.id, difficulty: 'easy', level: 1 };
  assert.equal((await guest('/api/arena/round', round)).status, 200);                      // guests are counted on their device
  const blocked = await kid('/api/arena/round', round); assert.equal(blocked.status, 402); assert.equal(blocked.data.paywall, true);
  assert.equal((await kid('/api/arena/pay/order', {})).status, 403);                        // under 18: a parent pays
  await kid('/api/arena/player', { nick: 'QuickOwl11', cls: C.track === 'school' ? C.cls : 13, difficulty: 'easy' });
  await kid('/api/arena/parent/request', { parent: 'meera' });
  const child = (await parent('/api/arena/parent')).data.children[0];
  assert.equal(child.plan.unlimited, false);
  put('order/order_T1', { payer: pu.id, for: child.id, amount: 99, at: Date.now(), paid: false });
  assert.equal((await parent('/api/arena/pay/verify', { order: 'order_T1', payment: 'pay_1', signature: 'forged'.padEnd(64, '0') })).status, 400);
  assert.equal((await kid('/api/arena/pay/verify', { order: 'order_T1', payment: 'pay_1', signature: 'x' })).status, 404);   // only the payer confirms
  const sig = crypto.createHmac('sha256', SECRET).update('order_T1|pay_1').digest('hex');
  const ok = await parent('/api/arena/pay/verify', { order: 'order_T1', payment: 'pay_1', signature: sig });
  assert.equal(ok.status, 200); assert.equal(ok.data.unlimited, true); assert.ok(ok.data.until > Date.now() + 29 * 864e5);
  const again = await parent('/api/arena/pay/verify', { order: 'order_T1', payment: 'pay_1', signature: sig });   // confirming twice adds nothing
  assert.equal(again.data.until, ok.data.until);
  assert.equal((await kid('/api/arena/round', round)).status, 200);
  assert.equal((await kid('/api/arena/plan')).data.unlimited, true);
});

test('sign-ups are rate limited per address', async () => {
  const a = agent(); let last;   // two sign-ups already happened above; the limit is 5 an hour
  for (let i = 0; i < 4; i++) last = await a('/api/auth/signup', { name: 'X', handle: `spam${i}`, age: 30, password: 'longenough' });
  assert.equal(last.status, 429);
});

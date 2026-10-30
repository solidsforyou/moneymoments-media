// Arena: the practice game. Answers are checked here, never sent to the page, so the
// leaderboards stay fair. Anyone can play as a guest; saving and ranking need an OpenID or
// GoodID, and players under 18 need a parent's account to approve them. Once Razorpay keys
// are set, free players get ARENA_FREE_MINUTES of questions a day and ₹99 unlocks 30 days.
import crypto from 'node:crypto';
import { getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, currentUser, requireUser, clean, id } from '../lib/http.mjs';
import { COURSES, DIFF, buildRound, isBoss, rankOf, catalog, coursesFor } from '../lib/arena-bank.mjs';

const ADJ = ['Swift', 'Brave', 'Clever', 'Mighty', 'Lucky', 'Bright', 'Calm', 'Bold', 'Sharp', 'Quick', 'Sunny', 'Cosmic'];
const ANIMAL = ['Otter', 'Tiger', 'Falcon', 'Panda', 'Dolphin', 'Fox', 'Koala', 'Lynx', 'Eagle', 'Yak', 'Gecko', 'Owl'];
export const NICK = /^(Swift|Brave|Clever|Mighty|Lucky|Bright|Calm|Bold|Sharp|Quick|Sunny|Cosmic)(Otter|Tiger|Falcon|Panda|Dolphin|Fox|Koala|Lynx|Eagle|Yak|Gecko|Owl)\d{2}$/;
const MULT = [1, 1.5, 2], ROUND_TTL = 30 * 60e3, BOSS_SECS = 90, BOARD = /^[a-z]+-\d{2}-[a-z]+\.(easy|medium|hard)$/;
const AVATAR = { skin: 6, eyes: 4, hair: 6, hairColor: 6, shirt: 8, extra: 6 };
const PRICE = 99, PASS_DAYS = 30;
const freeMinutes = () => Number(process.env.ARENA_FREE_MINUTES || 30);
const payOn = () => !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
const today = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);   // India's date
const week = (t = Date.now()) => { const d = new Date(t); d.setUTCHours(0, 0, 0, 0); d.setUTCDate(d.getUTCDate() + 3 - (d.getUTCDay() + 6) % 7); const w1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4)); return `${d.getUTCFullYear()}-w${1 + Math.round(((d - w1) / 864e5 - 3 + (w1.getUTCDay() + 6) % 7) / 7)}`; };
const board = (course, diff) => `${course}.${diff}`;
const cleanAvatar = a => Object.fromEntries(Object.entries(AVATAR).map(([k, n]) => [k, Math.max(0, Math.min(n - 1, parseInt(a?.[k], 10) || 0))]));
const publicPlayer = p => p && { nick: p.nick, avatar: p.avatar, cls: p.cls, difficulty: p.difficulty, xp: p.xp || 0, rank: rankOf(p.xp || 0), status: p.status, progress: p.progress || {}, parent: p.parentHandle || null };
export const nickname = () => `${ADJ[crypto.randomInt(ADJ.length)]}${ANIMAL[crypto.randomInt(ANIMAL.length)]}${String(crypto.randomInt(10, 100))}`;

async function plan(uid) {
  const pass = uid && await getJSON('arena', `pass/${uid}`), used = uid ? (await getJSON('arena', `usage/${uid}/${today()}`))?.secs || 0 : 0;
  const unlimited = !payOn() || (pass?.until || 0) > Date.now();
  return { limited: payOn(), unlimited, until: pass?.until || null, usedSecs: Math.round(used), freeSecs: freeMinutes() * 60, price: PRICE, days: PASS_DAYS };
}
async function addUsage(uid, secs) {
  if (!uid || !payOn()) return; const k = `usage/${uid}/${today()}`, u = (await getJSON('arena', k)) || { secs: 0 };
  u.secs += secs; await setJSON('arena', k, u);
}
async function lbAdd(b, uid, p, xp) {
  for (const period of ['all', week()]) {
    const k = `lb/${b}/${period}`, L = (await getJSON('arena', k)) || {};
    L[uid] = { nick: p.nick, avatar: p.avatar, xp: (L[uid]?.xp || 0) + xp }; await setJSON('arena', k, L);
  }
}
async function razorpay(path, payload) {
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
  const r = await fetch(`https://api.razorpay.com/v1/${path}`, { method: 'POST', headers: { authorization: `Basic ${auth}`, 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  if (!r.ok) throw fail(502, 'Payments are not answering. Try again in a minute.');
  return r.json();
}

export default handled(async (req, ctx) => {
  const a = ctx.params.a, sub = ctx.params.b, m = req.method, u = await currentUser(req);
  if (a === 'nickname' && m === 'GET') return json({ nick: nickname() });
  if (a === 'courses' && m === 'GET') return json({ courses: Object.values(COURSES).map(catalog), difficulties: Object.keys(DIFF), limit: { on: payOn(), minutes: freeMinutes(), price: PRICE, days: PASS_DAYS, key: payOn() ? process.env.RAZORPAY_KEY_ID : null } });

  // ---- the player ----
  if (a === 'player' && m === 'GET') { const p = u && await getJSON('arena', `player/${u.id}`); return json({ player: publicPlayer(p), signedIn: !!u, adult: u ? (u.age || 18) >= 18 : null, plan: u ? await plan(u.id) : null }); }
  if (a === 'player' && m === 'POST') {
    const user = await requireUser(req), b = await body(req), old = await getJSON('arena', `player/${user.id}`);
    const cls = parseInt(b.cls, 10), difficulty = b.difficulty;
    if (!(cls >= 1 && cls <= 13)) return fail(400, 'Pick your class.');
    if (!(difficulty in DIFF)) return fail(400, 'Pick a difficulty.');
    if (!NICK.test(b.nick || '')) return fail(400, 'Pick one of the suggested nicknames.');
    const p = { ...(old || {}), nick: b.nick, avatar: cleanAvatar(b.avatar), cls, difficulty, xp: old?.xp || 0, progress: old?.progress || {}, created: old?.created || Date.now() };
    p.status = (user.age || 18) >= 18 ? 'ok' : (old?.status === 'ok' ? 'ok' : old?.status === 'waiting' ? 'waiting' : 'needs-parent');
    // levels cleared as a guest come along (never XP: only rounds played signed in earn XP)
    for (const [k, v] of Object.entries(b.guestLevels || {})) if (BOARD.test(k) && COURSES[k.split('.')[0]]) { const lv = Math.min(COURSES[k.split('.')[0]].levels.length, parseInt(v, 10) || 0); p.progress[k] = { ...(p.progress[k] || {}), max: Math.max(p.progress[k]?.max || 0, lv) }; }
    await setJSON('arena', `player/${user.id}`, p); return json({ player: publicPlayer(p) });
  }

  // ---- parents approve players under 18 ----
  if (a === 'parent' && sub === 'request' && m === 'POST') {
    const user = await requireUser(req), b = await body(req), h = clean(b.parent, 24).toLowerCase().replace(/^@/, '');
    const ref = await getJSON('users', `handle/${h}`); if (!ref || ref.id === user.id) return fail(404, 'No grown-up with that ID. Ask them to sign up free first.');
    const parent = await getJSON('users', `id/${ref.id}`); if ((parent.age || 0) < 18) return fail(400, 'That account belongs to someone under 18. Ask a parent or guardian.');
    const p = await getJSON('arena', `player/${user.id}`); if (!p) return fail(400, 'Make your player first.');
    p.parentId = ref.id; p.parentHandle = h; p.status = 'waiting'; await setJSON('arena', `player/${user.id}`, p);
    const list = (await getJSON('arena', `requests/${ref.id}`)) || []; if (!list.includes(user.id)) list.push(user.id); await setJSON('arena', `requests/${ref.id}`, list);
    return json({ player: publicPlayer(p) });
  }
  if (a === 'parent' && !sub && m === 'GET') {
    const user = await requireUser(req), ids = (await getJSON('arena', `requests/${user.id}`)) || [], out = [];
    for (const cid of ids) { const c = await getJSON('users', `id/${cid}`), p = await getJSON('arena', `player/${cid}`); if (c && p && p.parentId === user.id) out.push({ id: cid, name: c.name, handle: c.handle, nick: p.nick, status: p.status, plan: await plan(cid) }); }
    return json({ children: out });
  }
  if (a === 'parent' && sub === 'approve' && m === 'POST') {
    const user = await requireUser(req), b = await body(req), p = await getJSON('arena', `player/${b.child}`);
    if (!p || p.parentId !== user.id) return fail(404, 'No request from that player.');
    p.status = b.approve ? 'ok' : 'declined'; await setJSON('arena', `player/${b.child}`, p); return json({ status: p.status });
  }

  // ---- the ₹99 pass: a one-time payment for 30 days, no auto-renew ----
  if (a === 'plan' && m === 'GET') { const user = await requireUser(req); return json(await plan(user.id)); }
  if (a === 'pay' && sub === 'order' && m === 'POST') {
    if (!payOn()) return fail(400, 'Arena is free and unlimited right now.');
    const user = await requireUser(req), b = await body(req); let target = user.id;
    if (b.child) { const p = await getJSON('arena', `player/${b.child}`); if (!p || p.parentId !== user.id) return fail(404, 'You can only pay for a child who asked you to approve them.'); target = b.child; }
    else if ((user.age || 18) < 18) return fail(403, 'Ask a parent: they can unlock it for you from Arena, under Me.');
    const o = await razorpay('orders', { amount: PRICE * 100, currency: 'INR', receipt: `arena-${id(6)}`, notes: { payer: user.id, for: target } });
    await setJSON('arena', `order/${o.id}`, { payer: user.id, for: target, amount: PRICE, at: Date.now(), paid: false });
    return json({ order: o.id, amount: PRICE * 100, currency: 'INR', key: process.env.RAZORPAY_KEY_ID });
  }
  if (a === 'pay' && sub === 'verify' && m === 'POST') {
    const user = await requireUser(req), b = await body(req), o = await getJSON('arena', `order/${clean(b.order, 64)}`);
    if (!o || o.payer !== user.id) return fail(404, 'No such order.');
    const want = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${b.order}|${b.payment}`).digest('hex');
    if (typeof b.signature !== 'string' || want.length !== b.signature.length || !crypto.timingSafeEqual(Buffer.from(want), Buffer.from(b.signature))) return fail(400, 'That payment could not be confirmed. If money left your account, write to us and we\'ll sort it out.');
    if (!o.paid) {
      const pass = (await getJSON('arena', `pass/${o.for}`)) || {}; pass.until = Math.max(Date.now(), pass.until || 0) + PASS_DAYS * 864e5;
      await setJSON('arena', `pass/${o.for}`, pass); o.paid = true; o.payment = clean(b.payment, 64); await setJSON('arena', `order/${b.order}`, o);
    }
    return json(await plan(o.for));
  }

  // ---- rounds: start, answer one at a time, finish ----
  if (a === 'round' && !sub && m === 'POST') {
    const b = await body(req), c = COURSES[b.course], diff = DIFF[b.difficulty], level = parseInt(b.level, 10);
    if (!c || diff === undefined || !(level >= 1 && level <= c.levels.length)) return fail(400, 'That level doesn\'t exist.');
    if (u) { const pl = await plan(u.id); if (!pl.unlimited && pl.usedSecs >= pl.freeSecs) return json({ error: `That's your ${freeMinutes()} free minutes for today. Come back tomorrow, or unlock unlimited practice for ₹${PRICE}.`, paywall: true }, 402); }
    const p = u && await getJSON('arena', `player/${u.id}`), ranked = !!(p && p.status === 'ok' && p.difficulty === b.difficulty && coursesFor(p.cls).some(x => x.id === c.id));
    if (ranked && level > (p.progress[board(c.id, b.difficulty)]?.max || 0) + 1) return fail(403, 'Clear the level before it first.');
    const r = { id: id(10), seed: crypto.randomInt(1, 2 ** 31), course: c.id, diff: b.difficulty, level, uid: u?.id || null, ranked, at: Date.now(), answers: {} };
    await setJSON('arena', `round/${r.id}`, r);
    const qs = buildRound({ course: c.id, diff, level, seed: r.seed }), boss = isBoss(c.id, level);
    return json({ round: r.id, boss, seconds: boss ? BOSS_SECS : null, ranked, questions: qs.map(q => ({ q: q.q, o: q.o, h: q.h, t: q.t, band: q.band })) });
  }
  if (a === 'round' && sub) {
    const r = await getJSON('arena', `round/${sub}`); if (!r || Date.now() - r.at > ROUND_TTL) return fail(404, 'That round has ended. Start the level again.');
    if (r.uid && (!u || u.id !== r.uid)) return fail(403, 'Not your round.');
    const qs = buildRound({ course: r.course, diff: DIFF[r.diff], level: r.level, seed: r.seed }), b = await body(req);
    if (b.action === 'answer') {
      const i = parseInt(b.i, 10), choice = parseInt(b.choice, 10); if (!(i >= 0 && i < qs.length)) return fail(400, 'No such question.');
      if (r.answers[i] === undefined) {
        const now = Date.now(); r.answers[i] = { choice, at: now };
        await addUsage(r.uid, Math.min(180, (now - (r.last || r.at)) / 1000)); r.last = now;   // time spent on questions, for the free daily minutes
        await setJSON('arena', `round/${r.id}`, r);
      }
      const first = r.answers[i]; return json({ right: first.choice === qs[i].a, correct: qs[i].a, why: qs[i].why });
    }
    if (b.action === 'finish') {
      if (r.done) return json(r.result);
      const secs = (Date.now() - r.at) / 1000, boss = isBoss(r.course, r.level), late = boss && secs > BOSS_SECS + 5;
      let right = 0, streak = 0, best = 0, xp = 0; const mult = MULT[DIFF[r.diff]];
      qs.forEach((q, i) => { const ok = r.answers[i]?.choice === q.a; if (ok) { right++; streak++; best = Math.max(best, streak); xp += 10 * mult + Math.round(q.h / 2) + (streak > 1 ? 2 * (streak - 1) : 0); } else streak = 0; });
      const total = qs.length, need = Math.ceil(total * (boss ? 5 : 4) / 6), passed = !late && right >= need;
      const stars = passed ? (right === total ? 3 : right >= total - 1 ? 2 : 1) : 0, par = qs.reduce((s, q) => s + q.t, 0);
      let firstClear = false, player = null;
      if (r.ranked && u) {
        const p = await getJSON('arena', `player/${u.id}`), k = board(r.course, r.diff), pr = p.progress[k] || { max: 0, stars: {}, best: {} };
        firstClear = passed && r.level > pr.max;
        // replays pay half, and levels far below your best pay nothing, so nobody farms level 1
        if (passed) { xp += firstClear ? (boss ? 50 : 20) : 0; if (!firstClear) xp = r.level < pr.max - 2 ? 0 : xp / 2; if (xp && secs < par) xp += 10; }
        else xp = xp / 4;
        xp = Math.round(xp); pr.max = Math.max(pr.max, passed ? r.level : 0);
        pr.stars = { ...(pr.stars || {}), [r.level]: Math.max(pr.stars?.[r.level] || 0, stars) };
        pr.best = { ...(pr.best || {}), [r.level]: Math.max(pr.best?.[r.level] || 0, Math.round(right / total * 100)) };
        p.progress[k] = pr; p.xp = (p.xp || 0) + xp; await setJSON('arena', `player/${u.id}`, p); await lbAdd(k, u.id, p, xp); player = publicPlayer(p);
      } else xp = Math.round(passed ? xp + (boss ? 50 : 20) : xp / 4);
      r.done = true; r.result = { right, total, need, passed, stars, xp, best, secs: Math.round(secs), par, late, firstClear, ranked: r.ranked, player, pct: Math.round(right / total * 100) };
      await setJSON('arena', `round/${r.id}`, r); return json(r.result);
    }
    return fail(400, 'Unknown action.');
  }

  // ---- leaderboards ----
  if (a === 'leaderboard' && m === 'GET') {
    const q = new URL(req.url).searchParams, course = q.get('course'), diff = q.get('difficulty');
    if (!COURSES[course] || !(diff in DIFF)) return fail(400, 'Pick a course and difficulty.');
    const period = q.get('period') === 'week' ? week() : 'all', L = (await getJSON('arena', `lb/${board(course, diff)}/${period}`)) || {};
    const rows = Object.entries(L).map(([uid, v]) => ({ uid, ...v })).sort((x, y) => y.xp - x.xp);
    const meAt = u ? rows.findIndex(r => r.uid === u.id) : -1;
    return json({ rows: rows.slice(0, 50).map((r, i) => ({ place: i + 1, nick: r.nick, avatar: r.avatar, xp: r.xp, rank: rankOf(r.xp), me: !!u && r.uid === u.id })), me: meAt >= 0 ? { place: meAt + 1, xp: rows[meAt].xp } : null, total: rows.length });
  }
  return fail(404, 'Not found.');
});
export const config = { path: ['/api/arena/:a', '/api/arena/:a/:b'] };

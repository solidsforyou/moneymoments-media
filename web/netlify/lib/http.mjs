// Small helpers shared by every function: JSON responses, sessions, input checks.
import crypto from 'node:crypto';
import { getJSON, setJSON } from './store.mjs';

export const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers } });
export const fail = (status, error) => json({ error }, status);
export const body = async req => { try { return await req.json(); } catch { return {}; } };

const secret = () => {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 32) return s;
  if (process.env.NETLIFY && !process.env.OSE_ALLOW_DEV_SECRET) throw new Error('SESSION_SECRET must be set (32+ characters) in Netlify environment variables');
  return 'dev-only-secret-change-me-dev-only-secret';
};
const b64 = s => Buffer.from(s).toString('base64url');
const sign = v => crypto.createHmac('sha256', secret()).update(v).digest('base64url');
const COOKIE = 'ose_s', DAYS = 30;

export function sessionCookie(userId) {
  const payload = b64(JSON.stringify({ u: userId, exp: Date.now() + DAYS * 864e5 }));
  const secure = process.env.NETLIFY ? '; Secure' : '';
  return `${COOKIE}=${payload}.${sign(payload)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${DAYS * 86400}${secure}`;
}
export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;

export async function currentUser(req) {
  const m = (req.headers.get('cookie') || '').match(new RegExp(`(?:^|; )${COOKIE}=([^;]+)`));
  if (!m) return null;
  const [payload, sig] = m[1].split('.');
  if (!payload || !sig) return null;
  const want = sign(payload);
  if (want.length !== sig.length || !crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig))) return null;
  let p; try { p = JSON.parse(Buffer.from(payload, 'base64url').toString()); } catch { return null; }
  if (!p.exp || p.exp < Date.now()) return null;
  return getJSON('users', `id/${p.u}`);
}
export async function requireUser(req) { const u = await currentUser(req); if (!u) throw fail(401, 'Log in first.'); return u; }

export const HANDLE = /^[a-z0-9._]{2,24}$/;
export const id = (n = 12) => crypto.randomBytes(n).toString('base64url');
export const clean = (s, max = 2000) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
export const publicUser = u => u && ({ id: u.id, name: u.name, handle: u.handle, ids: u.ids || {}, telegram: !!u.telegram, oseLinked: u.oseLinked !== false });
export const handled = fn => async (req, ctx) => { try { return await fn(req, ctx); } catch (e) { if (e instanceof Response) return e; console.error(e); return fail(500, 'Something went wrong on our side.'); } };

// Rate limits: at most `max` calls per `secs` from one address, per bucket. The address is
// hashed with the day, so no IP address is ever stored.
export async function limit(req, ctx, bucket, max, secs) {
  if (process.env.OSE_NO_LIMITS === '1') return;   // tests only
  const ip = ctx?.ip || req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  const day = new Date().toISOString().slice(0, 10), win = Math.floor(Date.now() / 1000 / secs);
  const who = crypto.createHash('sha256').update(`${secret()}|${day}|${ip}`).digest('base64url').slice(0, 16);
  const k = `${bucket}/${who}/${win}`, n = ((await getJSON('rl', k)) || 0) + 1;
  await setJSON('rl', k, n);
  if (n > max) throw fail(429, 'Too many tries. Wait a few minutes and try again.');
}

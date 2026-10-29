// Notifications: web push to a person's browsers and phones, and Telegram for people who
// log in with Telegram and choose it. Both are skipped quietly when not set up.
import { getJSON, setJSON } from './store.mjs';

export async function notifyTelegram(user, text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token || !user || user.notify !== 'telegram' || !user.telegram) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: user.telegram.id, text, disable_web_page_preview: true }) });
    return r.ok;
  } catch { return false; }
}

let wp;
async function webpush() {
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return null;
  if (!wp) { wp = (await import('web-push')).default; wp.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:hello@opensourceeverything.in', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY); }
  return wp;
}
// skipDevice: don't buzz the device that sent it (for "My devices")
export async function notifyPush(userId, payload, skipDevice) {
  const w = await webpush(); if (!w) return 0;
  const subs = (await getJSON('push', userId)) || []; let sent = 0; const keep = [];
  for (const s of subs) {
    if (skipDevice && s.device === skipDevice) { keep.push(s); continue; }
    try { await w.sendNotification(s.sub, JSON.stringify(payload), { TTL: 3600 }); sent++; keep.push(s); }
    catch (e) { if (e.statusCode !== 404 && e.statusCode !== 410) keep.push(s); }   // 404/410: that browser unsubscribed
  }
  if (keep.length !== subs.length) await setJSON('push', userId, keep);
  return sent;
}
export async function notify(user, payload, skipDevice) {
  if (!user) return;
  await notifyPush(user.id, payload, skipDevice);
  if (!skipDevice) await notifyTelegram(user, `${payload.title}: ${payload.body}`);
}

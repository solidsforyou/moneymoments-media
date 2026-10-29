// Telegram notifications: only when the person logged in with Telegram, chose Telegram for
// notifications, and has started our bot (Telegram only lets bots message people who did).
export async function notifyTelegram(user, text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token || !user || user.notify !== 'telegram' || !user.telegram) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: user.telegram.id, text, disable_web_page_preview: true }) });
    return r.ok;
  } catch { return false; }
}

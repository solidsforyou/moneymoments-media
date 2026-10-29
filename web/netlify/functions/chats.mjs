// Messaging: one-to-one chats, plus "My devices", a chat with yourself that every device you
// log in on shares, so anything you drop there shows up on your other devices.
import { getJSON, setJSON } from '../lib/store.mjs';
import { json, fail, body, handled, requireUser, clean, id, publicUser } from '../lib/http.mjs';
import { notifyTelegram } from '../lib/notify.mjs';

const chatId = (a, b) => a === b ? `self_${a}` : [a, b].sort().join('_');
async function inbox(uid) { return (await getJSON('chats', `inbox/${uid}`)) || {}; }
async function touch(uid, cid, other, preview) { const ib = await inbox(uid); ib[cid] = { other, preview, at: Date.now(), unread: (ib[cid]?.unread || 0) + (other === uid ? 0 : 1) }; await setJSON('chats', `inbox/${uid}`, ib); }

export default handled(async (req, ctx) => {
  const u = await requireUser(req), cid = ctx.params.id, sub = ctx.params.sub, m = req.method;
  if (!cid && m === 'GET') {   // list
    const ib = await inbox(u.id), selfId = chatId(u.id, u.id);
    const rows = await Promise.all(Object.entries(ib).map(async ([k, v]) => ({ id: k, ...v, with: v.other === u.id ? { name: 'My devices', handle: u.handle, self: true } : publicUser(await getJSON('users', `id/${v.other}`)) })));
    if (!ib[selfId]) rows.push({ id: selfId, with: { name: 'My devices', handle: u.handle, self: true }, preview: 'Send yourself anything. It shows up on every device you\'re logged in on.', at: 0, unread: 0 });
    return json({ chats: rows.filter(r => r.with).sort((a, b) => b.at - a.at) });
  }
  if (cid === 'start' && m === 'POST') {
    const b = await body(req), h = clean(b.handle, 24).toLowerCase().replace(/^@/, '');
    const ref = await getJSON('users', `handle/${h}`); if (!ref) return fail(404, `No one with the ID @${h} yet.`);
    return json({ id: chatId(u.id, ref.id) });
  }
  if (!cid) return fail(404, 'Not found.');
  const parts = cid.startsWith('self_') ? [cid.slice(5), cid.slice(5)] : cid.split('_');
  if (!parts.includes(u.id)) return fail(403, 'Not your chat.');
  const other = parts[0] === u.id ? parts[1] : parts[0];
  const log = (await getJSON('chats', `log/${cid}`)) || [];
  if (!sub && m === 'GET') {
    const since = Number(new URL(req.url).searchParams.get('since') || 0);
    const ib = await inbox(u.id); if (ib[cid]?.unread) { ib[cid].unread = 0; await setJSON('chats', `inbox/${u.id}`, ib); }
    const who = other === u.id ? { name: 'My devices', handle: u.handle, self: true } : publicUser(await getJSON('users', `id/${other}`));
    return json({ with: who, messages: log.filter(x => x.at > since) });
  }
  if (sub === 'send' && m === 'POST') {
    const b = await body(req), msg = { id: id(8), from: u.id, at: Date.now(), device: clean(b.device, 40) || null };
    if (b.file) {
      const f = await getJSON('files', `meta/${b.file}`); if (!f || f.owner !== u.id) return fail(400, 'That file isn\'t yours to send.');
      f.allowed = [...new Set([...(f.allowed || []), other])]; await setJSON('files', `meta/${b.file}`, f);
      msg.file = { id: b.file, name: f.name, size: f.size, type: f.type };
    }
    if (b.text) msg.text = clean(b.text, 4000);
    if (b.card) msg.card = { app: clean(b.card.app, 20), title: clean(b.card.title, 80), sub: clean(b.card.sub, 120), url: clean(b.card.url, 300) };
    if (!msg.text && !msg.file && !msg.card) return fail(400, 'Nothing to send.');
    log.push(msg); if (log.length > 2000) log.splice(0, log.length - 2000);
    await setJSON('chats', `log/${cid}`, log);
    const preview = msg.text ? msg.text.slice(0, 80) : msg.file ? `📎 ${msg.file.name}` : `Card: ${msg.card.title}`;
    await touch(u.id, cid, other, preview); if (other !== u.id) { await touch(other, cid, u.id, preview); await notifyTelegram(await getJSON('users', `id/${other}`), `${u.name} on Tomorrow: ${preview}`); }
    return json({ message: msg });
  }
  return fail(404, 'Not found.');
});
export const config = { path: ['/api/chats', '/api/chats/:id', '/api/chats/:id/:sub'] };

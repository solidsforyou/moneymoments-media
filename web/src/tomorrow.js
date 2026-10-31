import './shared/base.css';
import './tomorrow.css';
import { esc, api, me, toast, sheet, accountSheet, makeAppId, avatar, when, size, pickPerson, ask, showRecovery } from './shared/ui.js';
import { uploadFile, makeThumb, saveFile, fetchFile } from './shared/transfer.js';
import { sunny } from './shared/mascots.js';

const app = document.getElementById('app');
const I = {
  chats: '<path d="M12 2.8c-5.2 0-9.2 3.8-9.2 8.9 0 2.7 1.1 5 3 6.6v3.1l2.9-1.6c1 .3 2.1.4 3.3.4 5.2 0 9.2-3.8 9.2-8.5S17.2 2.8 12 2.8z"/>',
  send: '<path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><rect x="3" y="14" width="18" height="7" rx="2"/>',
  devices: '<rect x="2.5" y="5" width="13" height="10" rx="1.5"/><path d="M1 18h17"/><rect x="17" y="8" width="6" height="12" rx="1.5"/>',
  feed: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  watch: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>',
  you: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  heart: '<path d="M12 20.5s-7.5-4.6-9.6-9.1C.9 8 3 4.5 6.6 4.5c2.2 0 3.6 1.2 5.4 3.2 1.8-2 3.2-3.2 5.4-3.2 3.6 0 5.7 3.5 4.2 6.9-2.1 4.5-9.6 9.1-9.6 9.1z"/>',
  play: '<path d="M8 5l11 7-11 7z"/>',
};
const svg = (n, fill) => `<svg viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const S = { chats: [], poll: null, feedMode: 'all', last: 0 };
const ls = { get: k => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
const device = () => { let d = ls.get('tm-device'); if (!d) { d = /iphone|android|mobile/i.test(navigator.userAgent) ? 'Phone' : /ipad|tablet/i.test(navigator.userAgent) ? 'Tablet' : 'Laptop'; ls.set('tm-device', d); } return d; };
const MAXMB = 100;

// ---------- routes: every screen has its own address, so Back works ----------
const route = () => { const h = location.hash.replace(/^#\/?/, ''); const [tab, ...rest] = h.split('/'); return { tab: ['chats', 'chat', 'send', 'feed', 'watch', 'you'].includes(tab) ? tab : 'chats', arg: decodeURIComponent(rest.join('/') || '') }; };
const go = h => { if (location.hash !== '#/' + h) location.hash = '/' + h; else render(); };
window.addEventListener('hashchange', () => render());

function bar(user) { return `<header class="bar"><div class="wrap"><a class="brand" href="/tomorrow/#/chats"><span class="m">${sunny()}</span><span class="tm-name">Tomorrow</span></a>${user ? '' : '<button class="btn small" data-act="join">Join</button>'}</div></header>`; }
function tabs(cur, unread) { const t = cur === 'chat' ? 'chats' : cur; return `<nav class="tabs" aria-label="Tomorrow"><div class="in">${[['chats', 'Chats'], ['send', 'Send'], ['feed', 'Feed'], ['watch', 'Watch'], ['you', 'You']].map(([k, l]) => `<a href="#/${k}" ${t === k ? 'aria-current="page"' : ''} style="text-decoration:none">${svg(k)}${k === 'chats' && unread ? `<b class="badge">${unread}</b>` : ''}<span>${l}</span></a>`).join('')}</div></nav>`; }

function landing(invite) {
  app.innerHTML = `${bar(null)}<main>
    <section class="wrap hero tm-hero"><div><h1>Drop it here. It's there.</h1><p class="lede">Message anyone. Send files up to ${MAXMB} MB between your phone, your laptop and your friends.</p>
      ${invite ? `<p class="card" style="margin-top:16px">@${esc(invite)} invited you. Join and you're straight into a chat with them.</p>` : ''}
      <div class="row actions"><button class="btn" data-act="join">Join Tomorrow</button><button class="btn quiet" data-act="login">Log in</button></div></div><div class="art">${sunny()}</div></section>
    <section class="wrap sec"><div class="grid">
      <div class="card stack"><h3>Your devices are a chat</h3><p class="muted">Send yourself a photo on your phone and it's on your laptop, with a preview. No cables, no emailing yourself.</p></div>
      <div class="card stack"><h3>Works with Telegram</h3><p class="muted">Log in with Telegram so people know who you are. Notifications here or on Telegram, your choice.</p></div>
      <div class="card stack"><h3>Friends, not numbers</h3><p class="muted">A feed of people you follow. Likes are hidden from everyone but you. No ads.</p></div>
    </div></section></main>
    <footer class="foot wrap"><p>Tomorrow, from OpenSource Everything.</p><nav><a href="/">OpenSource Everything</a><a href="/privacy/">Privacy</a><a href="/delete-data/">Delete my data</a></nav></footer>`;
}

async function render() {
  stopPoll(); document.querySelector('.composer')?.remove();
  const inv = new URLSearchParams(location.search).get('invite'); if (inv) ls.set('tm-invite', inv.toLowerCase().replace(/[^a-z0-9._]/g, ''));
  const { user } = await me(); if (!user) return landing(ls.get('tm-invite'));
  const pending = ls.get('tm-invite');
  if (pending) { ls.set('tm-invite', ''); history.replaceState(null, '', '/tomorrow/'); if (pending !== user.handle) { try { const { id } = await api('/api/chats/start', { method: 'POST', body: { handle: pending } }); await api('/api/posts/follow', { method: 'POST', body: { handle: pending } }).catch(() => {}); return go(`chat/${id}`); } catch (e) { toast(e.message); } } }
  const r = route(); let unread = 0;
  try { S.chats = (await api('/api/chats')).chats; unread = S.chats.reduce((a, c) => a + (c.unread || 0), 0); } catch {}
  app.innerHTML = `${bar(user)}<main class="wrap" id="view"></main>${tabs(r.tab, unread)}`;
  document.title = unread ? `(${unread}) Tomorrow` : 'Tomorrow';
  await ({ chats: viewChats, chat: viewChat, send: viewSend, feed: viewFeed, watch: viewWatch, you: viewYou })[r.tab](user, r.arg);
}
const view = () => document.getElementById('view');
function stopPoll() { clearInterval(S.poll); S.poll = null; }
const selfIcon = `<span class="av" style="background:var(--accent);color:var(--accent-ink)">${svg('devices')}</span>`;

// ---------- chats ----------
function viewChats() {
  view().innerHTML = `<div class="row" style="justify-content:space-between;margin:20px 0 12px"><h1 style="font-size:34px">Chats</h1><button class="btn small" data-act="newchat">New chat</button></div>
    <div class="list">${S.chats.map(c => `<a class="item" href="#/chat/${encodeURIComponent(c.id)}">${c.with.self ? selfIcon : avatar(c.with)}<span class="grow"><b>${esc(c.with.name)}</b><small>${esc(c.preview || '')}</small></span><span class="small muted">${when(c.at)}</span>${c.unread ? `<b class="badge" style="position:static">${c.unread}</b>` : ''}</a>`).join('')}</div>
    ${S.chats.length < 2 ? '<div class="card stack" style="margin-top:16px"><b>Bring a friend</b><p class="muted">Tomorrow is better with your people. Send them your invite link; they land straight in a chat with you.</p><div class="row"><button class="btn small" data-act="invite">Invite on WhatsApp</button><button class="btn quiet small" data-act="copyinvite">Copy link</button></div></div>' : ''}`;
  S.poll = setInterval(async () => { try { const n = (await api('/api/chats')).chats; if (JSON.stringify(n) !== JSON.stringify(S.chats)) { S.chats = n; if (route().tab === 'chats') viewChats(); } } catch {} }, 5000);
}
function media(m) {
  const f = m.file, kind = /^image\//.test(f.type) ? 'image' : /^video\//.test(f.type) ? 'video' : 'file';
  if (f.thumb && kind !== 'file') return `<button class="mediabtn" data-open="${esc(f.id)}" data-kind="${kind}" data-name="${esc(f.name)}" aria-label="Open ${esc(f.name)}"><img src="/api/files/${esc(f.thumb)}?view=1" alt="${esc(f.name)}" loading="lazy">${kind === 'video' ? `<span class="playmark">${svg('play', true)}</span>` : ''}</button><span class="small">${esc(f.name)}, ${size(f.size)}</span> <button class="linkish" data-save="${esc(f.id)}">Save</button>`;
  return `<button class="file" data-save="${esc(f.id)}"><span class="ic">${esc((f.name.split('.').pop() || 'file').slice(0, 4).toUpperCase())}</span><span style="text-align:left"><b>${esc(f.name)}</b><br><span class="small">${size(f.size)}, tap to save</span></span></button>`;
}
function bubble(m, uid, chatId) {
  let body = '';
  if (m.text) body += `<span>${esc(m.text)}</span>`;
  if (m.file) body += media(m);
  if (m.card) body += `<a class="file" href="${esc(m.card.url || '#')}"><span class="ic">${esc((m.card.app || '').slice(0, 2).toUpperCase())}</span><span><b>${esc(m.card.title)}</b><br><span class="small">${esc(m.card.sub || '')}</span></span></a>`;
  return `<div data-m="${esc(m.id)}" class="msg ${m.from === uid ? 'me' : ''}">${body}<small>${when(m.at)}${m.device && chatId.startsWith('self.') ? ` from ${esc(m.device)}` : ''}</small></div>`;
}
async function viewChat(user, id) {
  let d; try { d = await api(`/api/chats/${encodeURIComponent(id)}`); } catch (e) { toast(e.message); return go('chats'); }
  S.last = d.messages.reduce((a, m) => Math.max(a, m.at), 0);
  view().innerHTML = `<div class="row" style="margin:16px 0 4px"><a class="btn quiet small" href="#/chats">← Chats</a><b style="font-size:18px">${esc(d.with.name)}</b>${d.with.self ? '<span class="small muted">On every device you\'re logged in on</span>' : `<span class="small muted">@${esc(d.with.handle)}</span>`}</div>
    <div class="thread" id="thread">${d.messages.map(m => bubble(m, user.id, id)).join('') || `<p class="empty">${d.with.self ? 'Send yourself something. Open Tomorrow on your other device and it\'s there.' : 'Say hi.'}</p>`}</div>`;
  app.insertAdjacentHTML('beforeend', `<div class="composer"><div class="progress" id="cprog" hidden><i></i></div><form id="cform"><label class="btn quiet" style="min-width:46px;padding:0" title="Send a photo or file"><input type="file" id="cfile" hidden multiple><span aria-hidden="true">+</span><span class="sr">Send a photo or file</span></label><label for="ctext" class="sr">Message</label><input type="text" id="ctext" placeholder="Message" autocomplete="off"><button class="btn">Send</button></form></div>`);
  window.scrollTo(0, document.body.scrollHeight);
  document.getElementById('cform').onsubmit = async e => { e.preventDefault(); const t = document.getElementById('ctext'); if (!t.value.trim()) return; const text = t.value; t.value = ''; await send(id, { text }).catch(x => { toast(x.message); t.value = text; }); };
  document.getElementById('cfile').onchange = async e => { const files = [...e.target.files]; e.target.value = ''; const pr = document.getElementById('cprog'); for (const f of files) await sendFile(f, id, p => { pr.hidden = false; pr.firstChild.style.width = `${Math.round(p * 100)}%`; }); pr.hidden = true; };
  S.poll = setInterval(async () => { try { const n = await api(`/api/chats/${encodeURIComponent(id)}?since=${S.last}`); if (n.messages.length) appendMsgs(n.messages, user.id, id); } catch {} }, 3000);
}
function appendMsgs(list, uid, id) { const th = document.getElementById('thread'); if (!th) return; th.querySelector('.empty')?.remove(); for (const m of list) { if (th.querySelector(`[data-m="${CSS.escape(m.id)}"]`)) continue; th.insertAdjacentHTML('beforeend', bubble(m, uid, id)); S.last = Math.max(S.last, m.at); } window.scrollTo(0, document.body.scrollHeight); }
async function send(id, payload) { const { user } = await me(); const r = await api(`/api/chats/${encodeURIComponent(id)}/send`, { method: 'POST', body: { ...payload, device: device() } }); appendMsgs([r.message], user.id, id); return r.message; }
async function sendFile(file, chatId, onProgress = () => {}) {
  if (file.size > MAXMB * 1048576) { toast(`${file.name} is over ${MAXMB} MB. Files can be up to ${MAXMB} MB for now.`); return false; }
  try {
    const th = await makeThumb(file); let thumb = null;
    if (th) thumb = (await uploadFile(th.blob)).id;
    const f = await uploadFile(file, onProgress);
    const payload = { file: f.id, thumb };
    if (route().tab === 'chat' && route().arg === chatId) await send(chatId, payload); else await api(`/api/chats/${encodeURIComponent(chatId)}/send`, { method: 'POST', body: { ...payload, device: device() } });
    toast(`Sent ${file.name}`); return true;
  } catch (e) { toast(e.message); return false; }
}
async function openMedia(id, kind, name) {
  const d = sheet(`<h2 style="font-size:18px;margin-bottom:12px">${esc(name)}</h2><div data-body><div class="progress"><i></i></div><p class="muted small" style="margin-top:8px">Loading…</p></div><div class="row" style="margin-top:12px"><button class="btn" data-dl>Save</button></div>`);
  d.querySelector('[data-dl]').onclick = () => saveFile(id).catch(e => toast(e.message));
  try { const { blob } = await fetchFile(id, p => { const i = d.querySelector('.progress i'); if (i) i.style.width = `${Math.round(p * 100)}%`; }); const url = URL.createObjectURL(blob);
    d.querySelector('[data-body]').innerHTML = kind === 'video' ? `<video src="${url}" controls playsinline autoplay style="width:100%;border-radius:14px"></video>` : `<img src="${url}" alt="${esc(name)}" style="width:100%;border-radius:14px">`;
    d.addEventListener('close', () => URL.revokeObjectURL(url)); } catch (e) { d.querySelector('[data-body]').innerHTML = `<p class="error">${esc(e.message)}</p>`; }
}

// ---------- send: AirDrop-style ----------
function viewSend() {
  view().innerHTML = `<h1 style="font-size:34px;margin:20px 0 6px">Send</h1><p class="muted" style="margin-bottom:16px">Photos, videos, documents, up to ${MAXMB} MB each. Pick them, then where they go.</p>
    <label class="drop" id="drop"><input type="file" id="pick" hidden multiple><b>Drop files here</b><span class="muted">or tap to choose</span></label>
    <div id="dest" style="margin-top:16px"></div>`;
  const drop = document.getElementById('drop'), pick = document.getElementById('pick');
  const choose = files => { if (!files.length) return;
    const big = files.filter(f => f.size > MAXMB * 1048576); if (big.length) { toast(`${big[0].name} is over ${MAXMB} MB.`); files = files.filter(f => f.size <= MAXMB * 1048576); if (!files.length) return; }
    const self = S.chats.find(c => c.with.self), rest = S.chats.filter(c => !c.with.self);
    document.getElementById('dest').innerHTML = `<p style="margin-bottom:8px"><b>${files.length === 1 ? esc(files[0].name) : files.length + ' files'}</b> <span class="muted">${size(files.reduce((a, f) => a + f.size, 0))}</span></p><div class="list">${[self, ...rest].filter(Boolean).map(c => `<button class="item" data-to="${esc(c.id)}">${c.with.self ? selfIcon : avatar(c.with)}<span class="grow"><b>${esc(c.with.name)}</b><small>${c.with.self ? 'All your devices' : '@' + esc(c.with.handle)}</small></span></button>`).join('')}<button class="item" data-to="__new"><span class="grow"><b>Someone else</b><small>Search by their ID</small></span></button></div><div class="progress" style="margin-top:12px" hidden><i></i></div><p class="small muted" data-status style="margin-top:6px"></p>`;
    document.getElementById('dest').onclick = async e => { const b = e.target.closest('[data-to]'); if (!b) return; let to = b.dataset.to;
      if (to === '__new') { const h = await pickPerson('Send to'); if (!h) return; try { to = (await api('/api/chats/start', { method: 'POST', body: { handle: h } })).id; } catch (x) { return toast(x.message); } }
      const pr = document.querySelector('#dest .progress'), st = document.querySelector('[data-status]'); pr.hidden = false;
      for (const [i, f] of files.entries()) { st.textContent = `Sending ${i + 1} of ${files.length}: ${f.name}`; await sendFile(f, to, p => { pr.firstChild.style.width = `${Math.round(p * 100)}%`; }); }
      go(`chat/${to}`); };
  };
  pick.onchange = () => choose([...pick.files]);
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => choose([...e.dataTransfer.files]));
}

// ---------- feed ----------
async function viewFeed(user) {
  let d = { posts: [] }; try { d = await api(`/api/posts?mode=${S.feedMode}`); } catch (e) { toast(e.message); }
  view().innerHTML = `<div class="row" style="justify-content:space-between;margin:20px 0 12px"><h1 style="font-size:34px">Feed</h1><div class="seg" role="group" aria-label="Show">${[['all', 'Everyone'], ['following', 'Following']].map(([k, l]) => `<button data-mode="${k}" aria-pressed="${S.feedMode === k}">${l}</button>`).join('')}</div></div>
    <form class="card stack" id="pform" style="margin-bottom:16px"><label for="ptext" class="sr">New post</label><textarea id="ptext" placeholder="What did you learn or make today?" maxlength="1000"></textarea><div class="row" style="justify-content:flex-end"><button class="btn">Post</button></div></form>
    <div class="stack">${d.posts.map(p => `<article class="post"><header>${avatar(p.by, 34)}<span class="grow" style="flex:1"><b>${esc(p.by.name)}</b> <span class="muted small">@${esc(p.by.handle)}, ${when(p.at)}</span></span>${p.mine ? '' : `<button class="btn quiet small" data-follow="${esc(p.by.handle)}">${(d.follows || []).includes(p.by.id) ? 'Following' : 'Follow'}</button>`}</header><p>${esc(p.text)}</p><div class="row" style="margin-top:8px"><button class="heart" data-like="${esc(p.id)}" aria-pressed="${p.liked}" aria-label="${p.liked ? 'Unlike' : 'Like'}">${svg('heart', p.liked)}</button>${p.mine ? `<span class="small muted">${p.likes ? `${p.likes} like${p.likes > 1 ? 's' : ''}, only you see this` : 'Only you see your likes'}</span>` : ''}</div></article>`).join('') || `<p class="empty">${S.feedMode === 'following' ? 'Follow people to see their posts here.' : 'No posts yet. Be the first.'}</p>`}</div>`;
  document.getElementById('pform').onsubmit = async e => { e.preventDefault(); const t = document.getElementById('ptext'); if (!t.value.trim()) return;
    if (!user.ids.tm) { const u = await makeAppId('tm', 'Tomorrow ID'); if (!u) return; }
    try { await api('/api/posts', { method: 'POST', body: { text: t.value } }); t.value = ''; viewFeed((await me(true)).user); } catch (x) { toast(x.message); } };
}

// ---------- watch ----------
async function viewWatch() {
  let items = []; try { items = (await api('/api/content/tomorrow')).items; } catch {}
  view().innerHTML = `<h1 style="font-size:34px;margin:20px 0 12px">Watch</h1><div class="stack">${items.map(i => `<article class="card stack">${i.video ? `<video src="${esc(i.video)}" controls playsinline preload="metadata" style="border-radius:14px;width:100%"></video>` : i.image ? `<img src="${esc(i.image)}" alt="" style="border-radius:14px">` : ''}<h3>${esc(i.title)}</h3>${i.text ? `<p class="muted">${esc(i.text)}</p>` : ''}</article>`).join('') || '<p class="empty">Videos from Tomorrow and its creators show up here.</p>'}</div>`;
}

// ---------- you ----------
const inviteUrl = u => `${location.origin}/tomorrow/?invite=${encodeURIComponent(u.handle)}`;
async function pushState() { if (!('serviceWorker' in navigator) || !('PushManager' in window)) return 'unsupported'; const k = await api('/api/push/key').catch(() => ({})); if (!k.key) return 'off-server'; if (Notification.permission === 'denied') return 'blocked'; const reg = await navigator.serviceWorker.getRegistration('/'); const sub = reg && await reg.pushManager.getSubscription(); return sub ? 'on' : 'off'; }
async function viewYou(user) {
  const { notify } = await me(), ps = await pushState();
  const pushLine = { on: ['On for this device', 'Turn off'], off: ['Get a buzz when a message arrives', 'Turn on'], blocked: ['Blocked in your browser settings', null], unsupported: ['This browser can\'t do notifications. On iPhone, add Tomorrow to your Home Screen first.', null], 'off-server': ['Coming soon', null] }[ps];
  view().innerHTML = `<div class="card row" style="margin:20px 0 16px">${avatar(user, 60)}<span style="flex:1;min-width:0"><b style="font-size:20px">${esc(user.name)}</b><br><span class="muted">${user.ids.tm ? 'Tomorrow ID @' + esc(user.ids.tm) : 'No Tomorrow ID yet'}</span></span></div>
    <div class="card stack" style="margin-bottom:16px"><b>Invite friends</b><p class="muted small">They land straight in a chat with you.</p><div class="row"><button class="btn small" data-act="invite">Invite on WhatsApp</button><button class="btn quiet small" data-act="copyinvite">Copy link</button></div></div>
    <div class="list">
      ${user.ids.tm ? '' : '<button class="item" data-act="mktm"><span class="grow"><b>Create your Tomorrow ID</b><small>So friends can find you</small></span></button>'}
      <div class="item"><span class="grow"><b>Notifications on this device</b><small>${pushLine[0]}</small></span>${pushLine[1] ? `<button class="btn quiet small" data-act="push" data-on="${ps === 'on'}">${pushLine[1]}</button>` : ''}</div>
      <div class="item"><span class="grow"><b>Also on Telegram</b><small>${user.telegram ? 'Messages also go to Telegram once you start our bot there' : 'Log in with Telegram on the sign-in screen to link it'}</small></span><div class="seg" role="group" aria-label="Telegram notifications"><button data-notify="app" aria-pressed="${notify !== 'telegram'}">Off</button><button data-notify="telegram" aria-pressed="${notify === 'telegram'}" ${user.telegram ? '' : 'disabled'}>On</button></div></div>
      <div class="item"><span class="grow"><b>Connect to OpenSource Everything</b><small>Optional. Use the same account in OpenPrep and GoodHabit.</small></span><button class="btn quiet small" data-act="ose" aria-pressed="${user.oseLinked}">${user.oseLinked ? 'Connected' : 'Connect'}</button></div>
      <div class="item"><span class="grow"><b>This device</b><small>Shows as "${esc(device())}" in My devices</small></span><button class="btn quiet small" data-act="rename">Rename</button></div>
      <div class="item"><span class="grow"><b>Recovery code</b><small>Lost it? Make a new one; the old one stops working.</small></span><button class="btn quiet small" data-act="newcode">New code</button></div>
    </div>
    <div class="row" style="margin-top:16px"><button class="btn quiet" data-act="logout">Log out</button><a class="btn quiet" href="/delete-data/">Delete my account</a></div>`;
}
async function togglePush(on) {
  const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' }); await navigator.serviceWorker.ready;
  if (on) { const s = await reg.pushManager.getSubscription(); if (s) { await api('/api/push/unsubscribe', { method: 'POST', body: { endpoint: s.endpoint } }); await s.unsubscribe(); } return toast('Notifications off on this device'); }
  if (await Notification.requestPermission() !== 'granted') return toast('Notifications weren\'t allowed.');
  const { key } = await api('/api/push/key'); const k = Uint8Array.from(atob(key.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - key.length % 4) % 4)), c => c.charCodeAt(0));
  const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: k });
  await api('/api/push/subscribe', { method: 'POST', body: { subscription: sub.toJSON(), device: device() } }); toast('Notifications on');
}

app.addEventListener('click', async e => {
  const t = e.target.closest('[data-act],[data-like],[data-follow],[data-mode],[data-notify],[data-open],[data-save]'); if (!t) return;
  if (t.dataset.open) return openMedia(t.dataset.open, t.dataset.kind, t.dataset.name);
  if (t.dataset.save) { toast('Saving…'); return saveFile(t.dataset.save).catch(x => toast(x.message)); }
  if (t.dataset.mode) { S.feedMode = t.dataset.mode; return render(); }
  if (t.dataset.like) { try { const r = await api(`/api/posts/${t.dataset.like}/like`, { method: 'POST' }); t.setAttribute('aria-pressed', r.liked); t.innerHTML = svg('heart', r.liked); t.classList.toggle('pop', r.liked); } catch (x) { toast(x.message); } return; }
  if (t.dataset.follow) { try { const r = await api('/api/posts/follow', { method: 'POST', body: { handle: t.dataset.follow } }); t.textContent = r.following ? 'Following' : 'Follow'; } catch (x) { toast(x.message); } return; }
  if (t.dataset.notify) { try { await api('/api/auth/settings', { method: 'POST', body: { notify: t.dataset.notify } }); await me(true); toast(t.dataset.notify === 'telegram' ? 'Messages also go to Telegram' : 'Telegram notifications off'); render(); } catch (x) { toast(x.message); } return; }
  const a = t.dataset.act, { user } = await me();
  if (a === 'join') accountSheet({ app: 'tm', onDone: () => render() });
  if (a === 'login') accountSheet({ app: 'tm', mode: 'login', onDone: () => render() });
  if (a === 'newchat') { const h = await pickPerson(); if (!h) return; try { go(`chat/${(await api('/api/chats/start', { method: 'POST', body: { handle: h } })).id}`); } catch (x) { toast(x.message); } }
  if (a === 'invite') { const text = `Join me on Tomorrow, it's free and has no ads: ${inviteUrl(user)}`; if (navigator.share) { try { await navigator.share({ title: 'Tomorrow', text, url: inviteUrl(user) }); } catch {} } else window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener'); }
  if (a === 'copyinvite') { try { await navigator.clipboard.writeText(inviteUrl(user)); toast('Invite link copied'); } catch { await ask('Your invite link', 'Copy this', inviteUrl(user)); } }
  if (a === 'mktm') { await makeAppId('tm', 'Tomorrow ID'); render(); }
  if (a === 'push') { try { await togglePush(t.dataset.on === 'true'); } catch (x) { toast(x.message || 'Couldn\'t change notifications.'); } render(); }
  if (a === 'ose') { await api('/api/auth/settings', { method: 'POST', body: { oseLinked: !user.oseLinked } }); await me(true); render(); }
  if (a === 'rename') { const n = await ask('Name this device', 'Device name', device()); if (n) { ls.set('tm-device', n.slice(0, 30)); render(); } }
  if (a === 'newcode') { try { const r = await api('/api/auth/newcode', { method: 'POST' }); await showRecovery(r.recoveryCode); } catch (x) { toast(x.message); } }
  if (a === 'logout') { await api('/api/auth/logout', { method: 'POST' }); await me(true); go('chats'); }
});
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
render();

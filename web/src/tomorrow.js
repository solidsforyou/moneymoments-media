import './shared/base.css';
import './tomorrow.css';
import { esc, api, me, toast, sheet, accountSheet, makeAppId, avatar, when, size } from './shared/ui.js';
import { sunny } from './shared/mascots.js';

const app = document.getElementById('app');
const I = {
  chats: '<path d="M12 2.8c-5.2 0-9.2 3.8-9.2 8.9 0 2.7 1.1 5 3 6.6v3.1l2.9-1.6c1 .3 2.1.4 3.3.4 5.2 0 9.2-3.8 9.2-8.5S17.2 2.8 12 2.8z"/>',
  send: '<path d="M21.5 2.5L10 13.5"/><path d="M21.5 2.5l-7 19-4.5-8-8-4.5z"/>',
  feed: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  watch: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>',
  you: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  heart: '<path d="M12 20.5s-7.5-4.6-9.6-9.1C.9 8 3 4.5 6.6 4.5c2.2 0 3.6 1.2 5.4 3.2 1.8-2 3.2-3.2 5.4-3.2 3.6 0 5.7 3.5 4.2 6.9-2.1 4.5-9.6 9.1-9.6 9.1z"/>',
};
const svg = (n, fill) => `<svg viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const S = { tab: 'chats', chat: null, chats: [], poll: null, feedMode: 'all', last: 0 };
const device = () => { let d = null; try { d = localStorage.getItem('tm-device'); } catch {} if (!d) { d = /iphone|android|mobile/i.test(navigator.userAgent) ? 'Phone' : /ipad|tablet/i.test(navigator.userAgent) ? 'Tablet' : 'Laptop'; try { localStorage.setItem('tm-device', d); } catch {} } return d; };

function bar(user) { return `<header class="bar"><div class="wrap"><a class="brand" href="/tomorrow/"><span class="m">${sunny()}</span><span class="tm-name">Tomorrow</span></a>${user ? '' : '<button class="btn small" data-act="join">Join</button>'}</div></header>`; }
function tabs(unread) { return `<nav class="tabs" aria-label="Tomorrow"><div class="in">${[['chats', 'Chats'], ['send', 'Send'], ['feed', 'Feed'], ['watch', 'Watch'], ['you', 'You']].map(([k, l]) => `<button data-tab="${k}" ${S.tab === k ? 'aria-current="page"' : ''}>${svg(k)}${k === 'chats' && unread ? `<b class="badge">${unread}</b>` : ''}<span>${l}</span></button>`).join('')}</div></nav>`; }

function landing() {
  app.innerHTML = `${bar(null)}<main>
    <section class="wrap hero"><div><h1>Drop it here. It's there.</h1><p class="lede">Message anyone. Move anything between your phone, your laptop and your friends.</p>
      <div class="row actions"><button class="btn" data-act="join">Join Tomorrow</button><button class="btn quiet" data-act="login">Log in</button></div></div><div class="art">${sunny()}</div></section>
    <section class="wrap sec"><div class="grid">
      <div class="card stack"><h3>Your devices are contacts</h3><p class="muted">Send yourself a file on your phone and it's on your laptop. No cables, no emailing yourself.</p></div>
      <div class="card stack"><h3>Works with Telegram</h3><p class="muted">Log in with Telegram so people know who you are. Get notifications on Telegram or here, your choice.</p></div>
      <div class="card stack"><h3>Friends, not numbers</h3><p class="muted">A feed of people you know. Likes are hidden from everyone but you. No ads.</p></div>
    </div></section></main>
    <footer class="foot wrap"><p>Tomorrow, from OpenSource Everything.</p><nav><a href="/">OpenSource Everything</a><a href="/privacy/">Privacy</a><a href="/delete-data/">Delete my data</a></nav></footer>`;
}

async function shell() {
  const { user } = await me(); if (!user) { stopPoll(); return landing(); }
  let unread = 0; try { S.chats = (await api('/api/chats')).chats; unread = S.chats.reduce((a, c) => a + (c.unread || 0), 0); } catch {}
  app.innerHTML = `${bar(user)}<main class="wrap" id="view"></main>${tabs(unread)}`;
  await ({ chats: S.chat ? viewChat : viewChats, send: viewSend, feed: viewFeed, watch: viewWatch, you: viewYou })[S.tab](user);
}
const view = () => document.getElementById('view');
function stopPoll() { clearInterval(S.poll); S.poll = null; }

// ----- chats -----
function viewChats() {
  stopPoll();
  view().innerHTML = `<div class="row" style="justify-content:space-between;margin:20px 0 12px"><h1 style="font-size:34px">Chats</h1><button class="btn small" data-act="newchat">New chat</button></div>
    <div class="list">${S.chats.map(c => `<button class="item" data-chat="${esc(c.id)}">${c.with.self ? `<span class="av" style="background:var(--accent)">${svg('send')}</span>` : avatar(c.with)}<span class="grow"><b>${esc(c.with.name)}</b><small>${esc(c.preview || '')}</small></span><span class="small muted">${when(c.at)}</span>${c.unread ? `<b class="badge" style="position:static">${c.unread}</b>` : ''}</button>`).join('')}</div>`;
  S.poll = setInterval(async () => { try { const n = (await api('/api/chats')).chats; if (JSON.stringify(n) !== JSON.stringify(S.chats)) { S.chats = n; viewChats(); } } catch {} }, 5000);
}
function bubble(m, uid, chatId) {
  const mine = m.from === uid;
  let body = '';
  if (m.text) body += `<span>${esc(m.text)}</span>`;
  if (m.file) body += `<a class="file" href="/api/files/${esc(m.file.id)}" download="${esc(m.file.name)}"><span class="ic">${esc((m.file.name.split('.').pop() || 'file').slice(0, 4).toUpperCase())}</span><span><b>${esc(m.file.name)}</b><br><span class="small">${size(m.file.size)}, tap to save</span></span></a>`;
  if (m.card) body += `<a class="file" href="${esc(m.card.url || '#')}"><span class="ic">${esc((m.card.app || '').slice(0, 2).toUpperCase())}</span><span><b>${esc(m.card.title)}</b><br><span class="small">${esc(m.card.sub || '')}</span></span></a>`;
  return `<div class="msg ${mine ? 'me' : ''}">${body}<small>${when(m.at)}${m.device && chatId.startsWith('self_') ? ` from ${esc(m.device)}` : ''}</small></div>`;
}
async function viewChat(user) {
  stopPoll(); const id = S.chat;
  let d; try { d = await api(`/api/chats/${encodeURIComponent(id)}`); } catch (e) { toast(e.message); S.chat = null; return shell(); }
  S.last = d.messages.reduce((a, m) => Math.max(a, m.at), 0);
  view().innerHTML = `<div class="row" style="margin:16px 0 4px"><button class="btn quiet small" data-act="back">← Chats</button><b style="font-size:18px">${esc(d.with.name)}</b>${d.with.self ? '<span class="small muted">Shows up on every device you\'re logged in on</span>' : `<span class="small muted">@${esc(d.with.handle)}</span>`}</div>
    <div class="thread" id="thread">${d.messages.map(m => bubble(m, user.id, id)).join('') || `<p class="empty">${d.with.self ? 'Send yourself something. Open Tomorrow on your other device and it\'s there.' : 'Say hi.'}</p>`}</div>`;
  document.querySelector('.composer')?.remove();
  app.insertAdjacentHTML('beforeend', `<div class="composer"><form id="cform"><label class="btn quiet" style="min-width:46px;padding:0" title="Send a file"><input type="file" id="cfile" hidden>+</label><label for="ctext" class="sr">Message</label><input type="text" id="ctext" placeholder="Message" autocomplete="off"><button class="btn">Send</button></form></div>`);
  window.scrollTo(0, document.body.scrollHeight);
  document.getElementById('cform').onsubmit = async e => { e.preventDefault(); const t = document.getElementById('ctext'); if (!t.value.trim()) return; const text = t.value; t.value = ''; await send(id, { text }).catch(x => { toast(x.message); t.value = text; }); };
  document.getElementById('cfile').onchange = async e => { const f = e.target.files[0]; if (f) await sendFile(f, id); e.target.value = ''; };
  S.poll = setInterval(async () => { try { const n = await api(`/api/chats/${encodeURIComponent(id)}?since=${S.last}`); if (n.messages.length) { appendMsgs(n.messages, user.id, id); } } catch {} }, 3000);
}
function appendMsgs(list, uid, id) { const th = document.getElementById('thread'); if (!th) return; th.querySelector('.empty')?.remove(); for (const m of list) { if (th.querySelector(`[data-m="${m.id}"]`)) continue; th.insertAdjacentHTML('beforeend', bubble(m, uid, id).replace('<div class="msg', `<div data-m="${m.id}" class="msg`)); S.last = Math.max(S.last, m.at); } window.scrollTo(0, document.body.scrollHeight); }
async function send(id, payload) { const { user } = await me(); const r = await api(`/api/chats/${encodeURIComponent(id)}/send`, { method: 'POST', body: { ...payload, device: device() } }); appendMsgs([r.message], user.id, id); return r.message; }
function upload(file, onProgress) {
  return new Promise((ok, no) => { const x = new XMLHttpRequest(); x.open('POST', '/api/files'); x.setRequestHeader('x-file-name', encodeURIComponent(file.name)); x.setRequestHeader('content-type', file.type || 'application/octet-stream');
    x.upload.onprogress = e => e.lengthComputable && onProgress && onProgress(e.loaded / e.total);
    x.onload = () => { let d = {}; try { d = JSON.parse(x.responseText); } catch {} x.status < 300 ? ok(d.file) : no(new Error(d.error || 'Upload failed.')); }; x.onerror = () => no(new Error('No connection.')); x.send(file); });
}
async function sendFile(file, chatId, onProgress) { try { const f = await upload(file, onProgress); if (chatId === S.chat) await send(chatId, { file: f.id }); else await api(`/api/chats/${encodeURIComponent(chatId)}/send`, { method: 'POST', body: { file: f.id, device: device() } }); toast(`Sent ${file.name}`); return true; } catch (e) { toast(e.message); return false; } }

// ----- send: AirDrop-style -----
function viewSend() {
  stopPoll();
  view().innerHTML = `<h1 style="font-size:34px;margin:20px 0 6px">Send</h1><p class="muted" style="margin-bottom:16px">Pick a file, then where it goes. Your devices are right at the top.</p>
    <label class="drop" id="drop"><input type="file" id="pick" hidden multiple><b>Drop files here</b><span class="muted">or tap to choose. Up to 5 MB each for now.</span></label>
    <div id="dest" style="margin-top:16px"></div>`;
  const drop = document.getElementById('drop'), pick = document.getElementById('pick');
  const choose = files => { if (!files.length) return; const self = S.chats.find(c => c.with.self), rest = S.chats.filter(c => !c.with.self);
    document.getElementById('dest').innerHTML = `<p style="margin-bottom:8px"><b>${files.length === 1 ? esc(files[0].name) : files.length + ' files'}</b> <span class="muted">${size([...files].reduce((a, f) => a + f.size, 0))}</span></p><div class="list">${[self, ...rest].filter(Boolean).map(c => `<button class="item" data-to="${esc(c.id)}">${c.with.self ? `<span class="av" style="background:var(--accent)">${svg('send')}</span>` : avatar(c.with)}<span class="grow"><b>${esc(c.with.name)}</b><small>${c.with.self ? 'All your devices' : '@' + esc(c.with.handle)}</small></span></button>`).join('')}<button class="item" data-to="__new"><span class="grow"><b>Someone else</b><small>Type their Tomorrow ID</small></span></button></div><div class="progress" style="margin-top:12px" hidden><i></i></div>`;
    document.getElementById('dest').onclick = async e => { const b = e.target.closest('[data-to]'); if (!b) return; let to = b.dataset.to;
      if (to === '__new') { const h = prompt('Their Tomorrow ID'); if (!h) return; try { to = (await api('/api/chats/start', { method: 'POST', body: { handle: h } })).id; } catch (x) { return toast(x.message); } }
      const pr = document.querySelector('.progress'); pr.hidden = false;
      for (const f of files) await sendFile(f, to, p => { pr.firstChild.style.width = `${Math.round(p * 100)}%`; });
      S.chat = to; S.tab = 'chats'; shell(); };
  };
  pick.onchange = () => choose([...pick.files]);
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => choose([...e.dataTransfer.files]));
}

// ----- feed -----
async function viewFeed(user) {
  stopPoll();
  let d = { posts: [] }; try { d = await api(`/api/posts?mode=${S.feedMode}`); } catch (e) { toast(e.message); }
  view().innerHTML = `<div class="row" style="justify-content:space-between;margin:20px 0 12px"><h1 style="font-size:34px">Feed</h1><div class="seg" role="group" aria-label="Show">${[['all', 'Everyone'], ['following', 'Following']].map(([k, l]) => `<button data-mode="${k}" aria-pressed="${S.feedMode === k}">${l}</button>`).join('')}</div></div>
    <form class="card stack" id="pform" style="margin-bottom:16px"><label for="ptext" class="sr">New post</label><textarea id="ptext" placeholder="What did you learn or make today?" maxlength="1000"></textarea><div class="row" style="justify-content:flex-end"><button class="btn">Post</button></div></form>
    <div class="stack">${d.posts.map(p => `<article class="post"><header>${avatar(p.by, 34)}<span class="grow" style="flex:1"><b>${esc(p.by.name)}</b> <span class="muted small">@${esc(p.by.handle)}, ${when(p.at)}</span></span>${p.mine ? '' : `<button class="btn quiet small" data-follow="${esc(p.by.handle)}">${(d.follows || []).includes(p.by.id) ? 'Following' : 'Follow'}</button>`}</header><p>${esc(p.text)}</p><div class="row" style="margin-top:8px"><button class="heart" data-like="${esc(p.id)}" aria-pressed="${p.liked}" aria-label="${p.liked ? 'Unlike' : 'Like'}">${svg('heart', p.liked)}</button>${p.mine ? `<span class="small muted">${p.likes ? `${p.likes} like${p.likes > 1 ? 's' : ''}, only you see this` : 'Only you see your likes'}</span>` : ''}</div></article>`).join('') || `<p class="empty">${S.feedMode === 'following' ? 'Follow people to see their posts here.' : 'No posts yet. Be the first.'}</p>`}</div>`;
  document.getElementById('pform').onsubmit = async e => { e.preventDefault(); const t = document.getElementById('ptext'); if (!t.value.trim()) return;
    if (!user.ids.tm) { const u = await makeAppId('tm', 'Tomorrow ID'); if (!u) return; }
    try { await api('/api/posts', { method: 'POST', body: { text: t.value } }); t.value = ''; viewFeed((await me(true)).user); } catch (x) { toast(x.message); } };
}

// ----- watch -----
async function viewWatch() {
  stopPoll(); let items = []; try { items = (await api('/api/content/tomorrow')).items; } catch {}
  view().innerHTML = `<h1 style="font-size:34px;margin:20px 0 12px">Watch</h1><div class="stack">${items.map(i => `<article class="card stack">${i.video ? `<video src="${esc(i.video)}" controls playsinline preload="metadata" style="border-radius:14px;width:100%"></video>` : i.image ? `<img src="${esc(i.image)}" alt="" style="border-radius:14px">` : ''}<h3>${esc(i.title)}</h3>${i.text ? `<p class="muted">${esc(i.text)}</p>` : ''}</article>`).join('') || '<p class="empty">Videos from Tomorrow and its creators show up here.</p>'}</div>`;
}

// ----- you -----
async function viewYou(user) {
  stopPoll(); const notify = (await me()).notify;
  view().innerHTML = `<div class="card row" style="margin:20px 0 16px">${avatar(user, 60)}<span style="flex:1;min-width:0"><b style="font-size:20px">${esc(user.name)}</b><br><span class="muted">${user.ids.tm ? 'Tomorrow ID @' + esc(user.ids.tm) : 'No Tomorrow ID yet'}</span></span></div>
    <div class="list">
      ${user.ids.tm ? '' : '<button class="item" data-act="mktm"><span class="grow"><b>Create your Tomorrow ID</b><small>So friends can find you</small></span></button>'}
      <div class="item"><span class="grow"><b>Notifications</b><small>${user.telegram ? 'Telegram works once you\'ve started our bot in Telegram' : 'Log in with Telegram to get them there'}</small></span><div class="seg" role="group" aria-label="Notifications"><button data-notify="app" aria-pressed="${notify !== 'telegram'}">Here</button><button data-notify="telegram" aria-pressed="${notify === 'telegram'}" ${user.telegram ? '' : 'disabled'}>Telegram</button></div></div>
      <div class="item"><span class="grow"><b>Connect to OpenSource Everything</b><small>Optional. Use the same account in OpenPrep and GoodHabit.</small></span><button class="btn quiet small" data-act="ose" aria-pressed="${user.oseLinked}">${user.oseLinked ? 'Connected' : 'Connect'}</button></div>
      <div class="item"><span class="grow"><b>This device</b><small>Shows as "${esc(device())}" in My devices</small></span><button class="btn quiet small" data-act="rename">Rename</button></div>
    </div>
    <div class="row" style="margin-top:16px"><button class="btn quiet" data-act="logout">Log out</button><a class="btn quiet" href="/delete-data/">Delete my account</a></div>`;
}

app.addEventListener('click', async e => {
  const t = e.target.closest('[data-tab],[data-act],[data-chat],[data-like],[data-follow],[data-mode],[data-notify]'); if (!t) return;
  if (t.dataset.tab) { S.tab = t.dataset.tab; S.chat = null; document.querySelector('.composer')?.remove(); return shell(); }
  if (t.dataset.chat) { S.chat = t.dataset.chat; return shell(); }
  if (t.dataset.mode) { S.feedMode = t.dataset.mode; return shell(); }
  if (t.dataset.like) { try { const r = await api(`/api/posts/${t.dataset.like}/like`, { method: 'POST' }); t.setAttribute('aria-pressed', r.liked); t.innerHTML = svg('heart', r.liked); t.classList.toggle('pop', r.liked); } catch (x) { toast(x.message); } return; }
  if (t.dataset.follow) { try { const r = await api('/api/posts/follow', { method: 'POST', body: { handle: t.dataset.follow } }); t.textContent = r.following ? 'Following' : 'Follow'; } catch (x) { toast(x.message); } return; }
  if (t.dataset.notify) { try { await api('/api/auth/settings', { method: 'POST', body: { notify: t.dataset.notify } }); toast(t.dataset.notify === 'telegram' ? 'Notifications go to Telegram' : 'Notifications stay in Tomorrow'); await me(true); shell(); } catch (x) { toast(x.message); } return; }
  const a = t.dataset.act;
  if (a === 'join') accountSheet({ app: 'tm', onDone: () => { S.tab = 'chats'; shell(); } });
  if (a === 'login') accountSheet({ app: 'tm', mode: 'login', onDone: () => shell() });
  if (a === 'back') { S.chat = null; document.querySelector('.composer')?.remove(); shell(); }
  if (a === 'newchat') { const h = prompt('Their Tomorrow ID'); if (!h) return; try { S.chat = (await api('/api/chats/start', { method: 'POST', body: { handle: h } })).id; shell(); } catch (x) { toast(x.message); } }
  if (a === 'mktm') { await makeAppId('tm', 'Tomorrow ID'); shell(); }
  if (a === 'ose') { const { user } = await me(); await api('/api/auth/settings', { method: 'POST', body: { oseLinked: !user.oseLinked } }); await me(true); shell(); }
  if (a === 'rename') { const n = prompt('Name this device', device()); if (n) { try { localStorage.setItem('tm-device', n.slice(0, 30)); } catch {} shell(); } }
  if (a === 'logout') { await api('/api/auth/logout', { method: 'POST' }); await me(true); stopPoll(); shell(); }
});
shell();

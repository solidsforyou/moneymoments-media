import './shared/base.css';
import { footer } from './shared/ui.js';
import { olly } from './shared/mascots.js';
const card = `{
  "app": "your-app",
  "title": "Riya's mock result",
  "sub": "11/18, free full mock",
  "url": "${location.origin}/openprep/"
}`;
document.getElementById('app').innerHTML = `
<header class="bar"><div class="wrap"><a class="brand" href="/"><span class="m">${olly()}</span>OpenSource Everything</a></div></header>
<main class="wrap" style="max-width:820px">
  <section class="hero" style="grid-template-columns:minmax(0,1fr)"><div><h1>Everything we make is open.</h1><p class="lede">Read the code, copy it, or build your own app on OpenID.</p></div></section>
  <section class="sec stack"><h2>The code</h2><p>Every app goes public at launch under the AGPL licence, in one place on GitHub. Until then this site is the preview.</p></section>
  <section class="sec stack"><h2>Send a card into a chat</h2><p>Apps can send live cards into Tomorrow chats. A card is a few lines, sent by a logged-in user to a chat with <code>POST /api/chats/:id/send</code>:</p>
    <pre class="card" style="font-family:var(--mono);font-size:15px;overflow:auto;white-space:pre">${card}</pre>
    <p class="muted">Cards from every app look the same and open back in the app that sent them.</p></section>
  <section class="sec stack"><h2>The API, today</h2><div class="list">${[['/api/auth/*', 'Sign up, log in (ID and password, or Telegram), app IDs, settings, delete'], ['/api/chats', 'Chats and "My devices", text, files and cards'], ['/api/files', 'Upload a file once, send it to people or your devices'], ['/api/posts', 'Tomorrow\'s feed: posts, likes, follows'], ['/api/content/:app', 'Each app\'s published content']].map(([p, d]) => `<div class="item"><span class="grow"><b style="font-family:var(--mono);font-weight:500">${p}</b><small>${d}</small></span></div>`).join('')}</div></section>
</main>${footer()}`;

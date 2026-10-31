// Service worker: shows push notifications and opens the right chat when one is tapped.
self.addEventListener('push', e => {
  let d = {}; try { d = e.data.json(); } catch { d = { title: 'Tomorrow', body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Tomorrow', { body: d.body || '', icon: '/icons/sunny.svg', badge: '/icons/sunny.svg', data: { url: d.url || '/tomorrow/' }, tag: d.url || 'tomorrow' }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close(); const url = e.notification.data?.url || '/tomorrow/';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => { const w = list.find(c => c.url.includes('/tomorrow/')); if (w) { w.navigate(url); return w.focus(); } return clients.openWindow(url); }));
});
self.addEventListener('install', () => self.skipWaiting());
// pages come from the network; offline, show a short note instead of the browser's error page
const OFFLINE = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title><body style="font:17px/1.5 system-ui,sans-serif;padding:48px 20px;max-width:520px;margin:auto"><h1>You\'re offline</h1><p>Check your internet and try again. Your progress on this phone is safe.</p><button onclick="location.reload()" style="font:inherit;padding:10px 20px;border-radius:99px;border:0;background:#5B2FE0;color:#fff">Try again</button>';
self.addEventListener('fetch', e => { if (e.request.mode === 'navigate') e.respondWith(fetch(e.request).catch(() => new Response(OFFLINE, { headers: { 'content-type': 'text/html; charset=utf-8' } }))); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

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
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

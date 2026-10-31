// Captures the real web app (web/, served locally) at 3x phone resolution for the reels,
// with sample accounts made just for the shots. Usage:
//   node capture-web.cjs http://localhost:8940 <out-dir> <photo.jpg> <video.webm>
const { chromium } = require('playwright');
const fs = require('fs');
const [B, O, PHOTO, VIDEO] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(O, { recursive: true });
  const b = await chromium.launch(), boxes = {};
  const mk = async (ua) => { const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, ...(ua ? { userAgent: ua } : {}) }); const p = await c.newPage(); await p.addInitScript(() => { const s = document.createElement('style'); s.textContent = '*{caret-color:transparent!important}'; document.addEventListener('DOMContentLoaded', () => document.head.append(s)); }); return p; };
  const shot = async (p, name, sel = {}) => { await p.waitForTimeout(450); await p.evaluate(() => document.querySelector('.toast')?.remove()); await p.screenshot({ path: `${O}/${name}.png` }); boxes[name] = {}; for (const [k, s] of Object.entries(sel)) boxes[name][k] = await p.$eval(s, e => { const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(v => Math.round(v)); }).catch(() => null); };
  const join = async (p, name, handle, app = 'tm', path = '/tomorrow/') => { await p.goto(B + path); await p.click('[data-act=join], [data-act=signup]'); await p.fill('#f-name', name); await p.fill('#f-handle', handle); await p.fill('#f-age', '24'); await p.fill('#f-pw', 'longenough'); await p.click('dialog button.btn:has-text("Create")'); await p.waitForSelector('[data-ok]'); await p.click('[data-ok]'); await p.waitForTimeout(300); };
  const phone = await mk('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile');
  await phone.goto(B + '/tomorrow/'); await shot(phone, 'tm-landing', { hero: 'h1' });
  await join(phone, 'Asha Rao', 'asha');
  const friend = await mk(); await join(friend, 'Kabir Shah', 'kabir');
  await friend.goto(B + '/tomorrow/#/feed'); await friend.waitForSelector('#pform'); await friend.fill('#ptext', 'Finished the percentages chapter today. Successive discounts finally make sense.'); await friend.click('#pform button'); await friend.waitForTimeout(400);
  // phone sends a photo and a video to My devices
  await phone.goto(B + '/tomorrow/#/send'); await phone.setInputFiles('#pick', [PHOTO, VIDEO]); await phone.waitForSelector('[data-to^="self."]');
  await shot(phone, 'tm-send', { dest: '#dest .list', drop: '#drop' });
  await phone.click('[data-to^="self."]'); await phone.waitForURL(/#\/chat\/self\./, { timeout: 30000 }); await phone.waitForSelector('.mediabtn img'); await phone.waitForTimeout(900);
  await phone.fill('#ctext', 'Boarding pass for Friday'); await phone.click('#cform button.btn'); await phone.waitForTimeout(600);
  await shot(phone, 'tm-mydevices', { thread: '#thread', first: '#thread .msg' });
  // laptop view of the same thread
  const lap = await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 }); const L = await lap.newPage();
  await L.goto(B + '/tomorrow/'); await L.click('[data-act=login]'); await L.fill('#f-handle', 'asha'); await L.fill('#f-pw', 'longenough'); await L.click('dialog form button'); await L.waitForSelector('.tabs'); await L.click('a[href^="#/chat/self."]'); await L.waitForSelector('.mediabtn img'); await L.waitForTimeout(900);
  await L.screenshot({ path: `${O}/tm-laptop.png` });
  // a chat with a friend
  await phone.goto(B + '/tomorrow/#/chats'); await phone.click('[data-act=newchat]'); await phone.fill('#pp-q', 'ka'); await phone.waitForSelector('[data-h=kabir]'); await shot(phone, 'tm-search', { sheet: 'dialog' });
  await phone.click('[data-h=kabir]'); await phone.waitForSelector('#ctext'); await phone.fill('#ctext', 'Sending you the notes now'); await phone.click('#cform button.btn'); await phone.waitForTimeout(300);
  await phone.setInputFiles('#cfile', PHOTO); await phone.waitForSelector('#thread .mediabtn img'); await phone.waitForTimeout(900);
  await friend.goto(B + '/tomorrow/#/chats'); await friend.waitForTimeout(500); await friend.click('a[href*="#/chat/"]:not([href*="self."])'); await friend.waitForSelector('#thread .mediabtn img'); await friend.waitForTimeout(800); await shot(friend, 'tm-friendchat', { thread: '#thread' });
  await phone.goto(B + '/tomorrow/#/feed'); await phone.waitForSelector('.post'); await phone.click('.post .heart'); await phone.waitForTimeout(400); await shot(phone, 'tm-feed', { post: '.post', heart: '.post .heart' });
  await phone.goto(B + '/tomorrow/#/you'); await phone.waitForTimeout(500); await shot(phone, 'tm-you', { invite: 'main .card.stack', list: 'main .list' });
  // OpenPrep
  const op = await mk(); await op.goto(B + '/openprep/'); await shot(op, 'op-home', { starts: 'main .grid' });
  await op.goto(B + '/openprep/learn/#successive'); await op.waitForTimeout(300); await op.evaluate(() => window.scrollTo(0, document.querySelector('[data-q="0"]').offsetTop - 120)); await op.click('[data-q="0"] [data-o="1"]'); await shot(op, 'op-lesson', { q: '[data-q="0"]' });
  await op.goto(B + '/openprep/mock/'); await shot(op, 'op-mock-intro');
  await op.click('[data-act=start]'); await op.waitForSelector('.qtext'); await op.goto(B + '/openprep/mock/'); await op.click('[data-act=resume]'); await op.waitForSelector('.palette');
  await op.click('[data-act=endsec]'); await op.click('dialog [data-yes]'); await op.waitForSelector('.palette'); await op.click('[data-o="2"]'); await shot(op, 'op-mock-dilr', { table: 'table', opts: '.opts' });
  await op.click('[data-act=endsec]'); await op.click('dialog [data-yes]'); await op.waitForSelector('.palette'); await op.click('[data-o="1"]'); await op.evaluate(() => window.scrollTo(0, 0)); await shot(op, 'op-mock-qa', { opts: '.opts', timer: '#timer' });
  await op.click('[data-act=endsec]'); await op.click('dialog [data-yes]'); await op.waitForSelector('h1'); await op.waitForTimeout(600); await shot(op, 'op-mock-result', { table: 'table' });
  // GoodHabit simulator
  const gh = await mk(); await gh.goto(B + '/goodhabit/sim/'); await gh.waitForSelector('[data-start]'); await shot(gh, 'gh-setup');
  await gh.click('[data-start="2020-01-01"]'); await gh.click('[data-sym=NIFTYBEES]'); await gh.click('dialog [data-q=max]'); await shot(gh, 'gh-trade', { sheet: 'dialog' }); await gh.click('dialog [data-go]');
  for (let i = 0; i < 2; i++) await gh.click('[data-act=big]'); await gh.waitForTimeout(300); await shot(gh, 'gh-crash', { value: 'main .card', event: 'main .card:nth-of-type(2)' });
  await gh.click('[data-act=finish]'); await gh.waitForSelector('h1'); await shot(gh, 'gh-report', { grid: '.grid' });
  const ose = await mk(); await ose.goto(B + '/'); await shot(ose, 'ose-home', { apps: '#apps .list' });
  fs.writeFileSync(`${O}/boxes.json`, JSON.stringify(boxes, null, 1)); console.log('ok', Object.keys(boxes).length); await b.close();
})().catch(e => { console.log('FAIL', e.message); process.exit(1); });

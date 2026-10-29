// Captures the preview's key screens at 3x phone resolution, plus the boxes of the details
// the trailer camera zooms into. Usage: node capture.cjs <recording-copy.html> <out-dir>
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const [appFile, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  const url = 'file://' + path.resolve(appFile);
  await p.goto(url + '#home'); await p.waitForTimeout(800);
  await p.addStyleTag({ content: '*{caret-color:transparent!important}.toast{display:none!important}' });
  const W = ms => p.waitForTimeout(ms);
  const boxes = {};
  // box of a selector, or of the smallest element whose text matches
  const box = (t) => p.evaluate(t => {
    let el;
    if (t.text) { const re = new RegExp(t.text); el = [...document.querySelectorAll(t.in || 'body *')].filter(e => re.test(e.textContent) && e.offsetParent !== null).sort((a, b) => a.textContent.length - b.textContent.length)[0]; }
    else el = [...document.querySelectorAll(t.sel)].filter(e => e.getClientRects().length)[t.i || 0];
    if (!el) return null; const r = el.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(v => Math.round(v * 10) / 10);
  }, t);
  const center = async (t) => { await p.evaluate(t => { let el; if (t.text) { const re = new RegExp(t.text); el = [...document.querySelectorAll('main *')].filter(e => re.test(e.textContent)).sort((a, b) => a.textContent.length - b.textContent.length)[0]; } else el = document.querySelector(t.sel); if (el) el.scrollIntoView({ block: 'center' }); }, t); await W(350); };
  const shot = async (name, targets = {}) => {
    await W(250); await p.screenshot({ path: `${out}/${name}.png` }); boxes[name] = {};
    for (const [k, t] of Object.entries(targets)) { boxes[name][k] = await box(typeof t === 'string' ? { sel: t } : t); if (!boxes[name][k]) console.error('missing', name, k); }
  };
  const setId = async (k) => { await p.evaluate(k => { const ids = JSON.parse(localStorage.getItem('ose-ids') || '{}'); ids[k] = 'asha_rao'; localStorage.setItem('ose-ids', JSON.stringify(ids)); }, k); await p.reload(); await W(600); await p.addStyleTag({ content: '*{caret-color:transparent!important}.toast{display:none!important}' }); };
  const go = async (r) => { await p.evaluate(r => { location.hash = r; }, r); await W(500); await p.evaluate(() => window.scrollTo(0, 0)); await W(200); };

  // the store and the crew
  await center({ sel: '.crewcard' });
  await shot('store', { crew: '.crewcard', olly: '.crewm', sunny: { sel: '.crewm', i: 1 }, buddy: { sel: '.crewm', i: 2 }, goodguy: { sel: '.crewm', i: 3 } });
  const crewSvg = await p.evaluate(() => [...document.querySelectorAll('.crewm')].map(e => [e.querySelector('b').textContent, e.querySelector('small').textContent, e.querySelector('.cm').innerHTML]));
  // OpenID with Telegram
  await go('me'); await p.click('main [data-act=signin]'); await W(400);
  await shot('signup', { tg: '[data-act=tglogin]', name: '#sn', handle: '#sh' });
  await p.click('[data-act=tglogin]'); await p.fill('#sa', '21'); await p.click('#sn'); await p.evaluate(() => document.activeElement.blur());
  await shot('signup2', { name: '#sn', handle: '#sh', age: '#sa', create: '[data-act=signupok]' });
  await p.click('[data-act=signupok]'); await W(500);
  await shot('me', { card: 'main .gcard', ids: { sel: 'main .glist' } });
  // Tomorrow
  await setId('tm'); await go('tm');
  await center({ sel: '.post' }); await p.evaluate(() => window.scrollBy(0, 120)); await W(200);
  await shot('feed', { heart: '.post .heartbtn', post: '.post', media: '.post .media' });
  await p.click('.post .heartbtn'); await W(120);
  await shot('feed2', { heart: '.post .heartbtn', post: '.post' });
  await p.evaluate(() => window.scrollTo(0, 0)); await W(200);
  await shot('stories', { row: '.stories' });
  await p.click('[data-act=story][data-k=kabir]'); await W(2200);
  await shot('story', { bars: '.svbars', text: '.svtext', reply: '#svform' });
  await p.click('[data-act=svclose]'); await W(300);
  // OpenPrep
  await go('quant'); await shot('lesson', { tv: '.tv', guy: '.guy', play: '#playbtn', cam: '.cam' });
  await p.click('#playbtn'); await W(2600); await shot('lesson2', { tv: '.tv', cam: '.cam' });
  await center({ sel: '[data-act=answer]' });
  await shot('question', { q: { text: '^A price rises 20%' }, opts: '[data-act=answer]' });
  await p.click('[data-act=answer][data-i="1"]'); await W(300);
  await shot('answer', { right: '[data-act=answer][data-i="1"]', why: { text: '^Right\\.' } });
  // GoodHabit simulator
  await go('sim'); await p.click('[data-act=simstart]'); await W(500);
  await shot('sim0', { worth: { text: '^₹1,00,000\\.00$' }, date: { text: 'day 1$' }, big: '[data-act=simbig]', market: { text: '^Market on' } });
  await p.click('[data-act=simbig]'); await W(300); await p.click('[data-act=simbig]'); await W(400);
  await shot('sim2', { event: { text: '^What happened today' }, pill: { text: '^Nifty −' }, worth: { text: '^₹1,00,000\\.00$' }, date: { text: 'day \\d+$' } });
  await p.evaluate(() => window.scrollTo(0, 0)); await p.click('[data-act=simbig]'); await W(400); await p.evaluate(() => window.scrollTo(0, 0)); await W(200);
  await shot('sim3', { event: { text: '^What happened today' }, date: { text: 'day \\d+$' }, worth: { text: '^₹1,00,000\\.00$' } });
  await center({ text: '^Your money vs just holding' });
  await shot('sim2chart', { chart: { text: '^Your money vs just holding' } });
  await p.click('[data-act=simfinish]').catch(() => console.error('no simfinish')); await W(500); await p.evaluate(() => window.scrollTo(0, 0)); await W(200);
  await shot('report', { grade: { text: 'grade|Grade|report card|Report card' } });
  // Hissab with Kabir, Markets
  await setId('good'); await go('habit-inbox');
  await p.click('[data-act=openchat][data-k=kabir]'); await W(500);
  await shot('hissab', { bal: { text: '^You owe ₹|owes you ₹' }, last: { sel: '.chat .msg', i: 3 }, m0: { sel: '.chat > *', i: 0 }, m1: { sel: '.chat > *', i: 1 }, m2: { sel: '.chat > *', i: 2 }, m3: { sel: '.chat > *', i: 3 } });
  await go('markets'); await shot('markets', { first: { sel: 'main svg' }, r0: { text: '^NIFTY 50Nifty' }, r1: { text: '^SENSEXBSE' }, r2: { text: '^GOLDGold' }, r3: { text: '^RELIANCEReliance' } });
  // one inbox with a live card
  await go('prep-inbox'); await p.click('[data-act=backchats]').catch(() => {}); await W(300); await p.click('[data-act=openchat][data-k=meera]'); await W(400);
  await shot('chat0', { card: '.acard' });
  await p.click('[data-act=cardsheet]'); await W(300); await p.click('[data-act=sendcard][data-i="2"]'); await W(400);
  await shot('chat1', { sent: { sel: '.acard.me' }, open: { sel: '.acard [data-r=mock]' } });
  await p.click('.acard [data-r=mock]'); await W(500); await shot('mock', { title: { text: '^Free full mock$' }, start: { text: '^Start the mock' } });
  // Build and privacy
  await go('build'); await center({ sel: 'pre.code' }); await shot('build', { code: 'pre.code', open: { text: '^Every app, in the open' } });
  await go('build'); await shot('build0', { list: 'main .glist' });
  await go('me'); await p.click('[data-act=mepref][data-k=privacy]'); await W(300);
  await shot('privacy0', { toggles: '.sheet .glist' });
  await p.click('[data-act=setpref][data-k=hidegrid]'); await W(150); await p.click('[data-act=setpref][data-k=nophone]'); await W(300);
  await shot('privacy1', { toggles: '.sheet .glist' });
  fs.writeFileSync(`${out}/data.js`, 'window.BOXES = ' + JSON.stringify(boxes) + ';\nwindow.CREW = ' + JSON.stringify(crewSvg) + ';\n');
  await b.close(); console.log('ok', Object.keys(boxes).length);
})();

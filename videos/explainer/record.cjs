// Records the ecosystem explainer: the real preview plays itself inside a phone frame.
// Usage: node videos/explainer/record.cjs <wrapped-preview.html> <out-dir>
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [appFile, outDir] = process.argv.slice(2);
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, recordVideo: { dir: outDir, size: { width: 1920, height: 1080 } } });
  const p = await ctx.newPage();
  const t0 = Date.now(); const marks = [];
  await p.goto('file://' + path.resolve(__dirname, 'stage.html'));
  await p.evaluate(src => { document.getElementById('app').src = src; }, 'file://' + path.resolve(appFile) + '#home');
  await p.waitForTimeout(1500);
  const f = p.frames().find(fr => fr.url().includes(path.basename(appFile)));
  const wait = ms => p.waitForTimeout(ms);
  const mark = n => marks.push([n, (Date.now() - t0) / 1000]);
  const masc = async (k, name, line) => { const svg = await f.evaluate(k => { const el = [...document.querySelectorAll('.crewm')].find(e => e.querySelector('b').textContent === k); return el ? el.querySelector('.cm').innerHTML : ''; }, name).catch(() => ''); return `<span class="m">${svg}</span><span class="n"><b>${name}</b><small>${line}</small></span>`; };
  const tap = async (sel, opts = {}) => {
    const el = (await f.$$(sel))[opts.last ? (await f.$$(sel)).length - 1 : 0];
    if (!el) { console.log('missing', sel); return; }
    await el.scrollIntoViewIfNeeded(); await wait(250);
    const bb = await el.boundingBox();
    await p.evaluate(([x, y]) => window.finger(x, y, true), [bb.x + bb.width / 2, bb.y + bb.height / 2]);
    await wait(520); await p.evaluate(() => window.press(true)); await wait(120);
    await el.click(); await p.evaluate(() => window.press(false)); await wait(opts.after || 650);
  };
  const type = async (sel, text) => { await f.click(sel); await f.type(sel, text, { delay: 55 }); await wait(300); };
  const scroll = async (y) => { await f.evaluate(y => window.scrollTo({ top: y, behavior: 'smooth' }), y); await wait(900); };
  const hide = () => p.evaluate(() => window.finger(0, 0, false));
  // grab the crew art once from the store page
  const crewArt = {};
  for (const [n] of [['Khula'], ['Kal'], ['GoodGuy'], ['Sikka']]) crewArt[n] = await f.evaluate(k => { const el = [...document.querySelectorAll('.crewm')].find(e => e.querySelector('b').textContent === k); return el ? el.querySelector('.cm').innerHTML : ''; }, n);
  const M = (n, line) => `<span class="m">${crewArt[n]}</span><span class="n"><b>${n}</b><small>${line}</small></span>`;

  // 1. the store
  mark('store');
  await p.evaluate(m => window.setCap('OpenSource Everything', 'Free, open apps for learning, money and building.', 'One place to get every app we make. Each one opens on its own, with its own look.', m), M('Khula', 'opens everything up'));
  await wait(2600); await scroll(330); await wait(2200); await scroll(760); await wait(1500); await scroll(0);
  // 2. one OpenID, with Telegram
  mark('openid');
  await p.evaluate(m => window.setCap('One OpenID', 'Sign up once.<br>Use every app.', 'Log in with Telegram in one tap. We get your name and photo, never your phone number or chats.', m), M('Khula', 'one account for all of it'));
  await wait(1200);
  await tap('.tabbar [data-r=me]'); await tap('main [data-act=signin]'); await tap('[data-act=tglogin]', { after: 900 });
  await type('#sa', '21'); await tap('[data-act=signupok]', { after: 1200 }); await hide(); await wait(900);
  // 3. Tomorrow
  mark('tomorrow');
  await p.evaluate(m => window.setCap('Tomorrow', 'The social app for driven people.', 'Post what you did today. Daily challenges and streaks with friends. No ads, likes hidden.', m), M('Kal', 'cheers on your streak'));
  await tap('.tabbar [data-r=home]'); await scroll(0); await tap('.approw [data-r=tm]', { after: 1200 });
  await tap('.tcard [data-act=chans][data-i="2"]', { after: 1800 });
  await tap('[data-act=story][data-k=kabir]', { after: 2600 }); await tap('[data-act=svclose]', { after: 700 });
  // 4. app IDs only when needed
  mark('appids');
  await p.evaluate(m => window.setCap('App IDs, only when you need them', 'Want to post? Make a Tomorrow ID.', 'Browsing and learning need only your OpenID. A PrepID, GoodID or Tomorrow ID comes in when you post, follow or split money.', m), M('Kal', 'one tap, then you post'));
  await tap('.tabbar [data-act=newpost]', { after: 1100 }); await tap('[data-act=createid][data-k=tm]', { after: 1000 });
  await type('#pt', 'Finished the Percentages chapter today'); await tap('[data-act=postsave]', { after: 1800 }); await hide();
  // 5. OpenPrep
  mark('openprep');
  await p.evaluate(m => window.setCap('OpenPrep', 'Free CAT prep.<br>No ads.', 'Lessons to read, unlimited practice, a full mock every month, and GoodGuy explaining as you go.', m), M('GoodGuy', 'teaches, never lectures'));
  await tap('.backlink'); await tap('.approw [data-r=prep]', { after: 1200 }); await tap('.tabbar [data-r=quant]', { after: 1000 });
  await tap('#playbtn', { after: 2600 }); await scroll(700); await tap('[data-act=answer][data-i="1"]', { after: 1800 }); await scroll(0); await hide();
  // 6. GoodHabit
  mark('goodhabit');
  await p.evaluate(m => window.setCap('GoodHabit', 'Practise money with pretend money first.', 'Replay real Indian market history in the simulator, keep your own books, split bills with friends.', m), M('Sikka', 'minds the money'));
  await tap('.backlink'); await tap('.approw [data-r=practice]', { after: 1100 }); await tap('main [data-r=sim]', { after: 900 });
  await tap('[data-act=simstart]', { after: 1200 }); await tap('[data-act=simbig]', { after: 1300 }); await tap('[data-act=simbig]', { after: 1300 }); await tap('[data-act=simbig]', { after: 1500 }); await hide();
  // 7. one inbox
  mark('inbox');
  await p.evaluate(m => window.setCap('One inbox, in every app', 'Talk to anyone, from any app.', 'Messages carry live cards: a mock result, a Hissab, a simulator invite. Tap one and it opens in its app.', m), M('Sikka', 'and your Hissabs come too'));
  await f.evaluate(() => { try { const ids = JSON.parse(localStorage.getItem('ose-ids') || '{}'); ids.good = ids.good || 'asha_rao'; localStorage.setItem('ose-ids', JSON.stringify(ids)); } catch (e) {} });
  await tap('.bar .igbtn', { after: 1500 });
  await tap('[data-act=openchat][data-k=meera]', { after: 1500 }); await tap('[data-act=cardsheet]', { after: 1000 }); await tap('[data-act=sendcard][data-i="2"]', { after: 1800 });
  await tap('.acard [data-r=mock]', { after: 1600 }); await hide();
  // 8. end
  mark('end');
  await p.evaluate(m => window.setCap('Works with Telegram', 'Bring your Telegram groups along.', 'Groups bridge both ways through our bot. Your Telegram stays yours.', m), M('Kal', 'see you tomorrow'));
  await f.evaluate(() => { location.hash = 'me'; }); await wait(600); await scroll(0);
  await wait(2600);
  await p.evaluate(h => window.endCard(h), ['Khula', 'Kal', 'GoodGuy', 'Sikka'].map(n => `<div>${crewArt[n]}</div>`).join(''));
  await wait(5000);
  mark('done');
  await ctx.close(); await b.close();
  console.log(JSON.stringify(marks));
})();

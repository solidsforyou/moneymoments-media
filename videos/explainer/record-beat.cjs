// Records the explainer timed to a song's beat grid: every chapter starts on a downbeat and
// every tap lands on a beat. Tuned for the founder's "Welcome To Miami (Slowed)" clip:
// 110 BPM, first beat 0.15 s, downbeats from 1.786 s, breakdown at 54.15 s, drop at 58.51 s.
// Usage: node videos/explainer/record-beat.cjs <recording-copy.html> <out-dir>
// Prints the song-time offset of the recording (seconds of video before song time 0).
const { chromium } = require('playwright');
const path = require('path');
const BEAT = 60 / 110, PHASE = 0.15, BAR = 4 * BEAT, D0 = PHASE + 3 * BEAT, DROP = D0 + 26 * BAR;
const D = n => D0 + n * BAR;
(async () => {
  const [appFile, outDir] = process.argv.slice(2);
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, recordVideo: { dir: outDir, size: { width: 1920, height: 1080 } } });
  const p = await ctx.newPage(); const vid0 = Date.now();
  await p.goto('file://' + path.resolve(__dirname, 'stage.html'));
  await p.evaluate(src => { document.getElementById('app').src = src; }, 'file://' + path.resolve(appFile) + '#home');
  await p.waitForTimeout(1800);
  const f = p.frames().find(fr => fr.url().includes(path.basename(appFile)));
  const wait = ms => p.waitForTimeout(ms);
  const crewArt = {};
  for (const n of ['Olly', 'Sunny', 'Buddy', 'GoodGuy']) crewArt[n] = await f.evaluate(k => { const el = [...document.querySelectorAll('.crewm')].find(e => e.querySelector('b').textContent === k); return el ? el.querySelector('.cm').innerHTML : ''; }, n);
  const M = (n, line) => `<span class="m">${crewArt[n]}</span><span class="n"><b>${n}</b><small>${line}</small></span>`;
  await p.evaluate(() => { const L = document.getElementById('left'); L.style.opacity = 0; });
  // song time 0 starts now
  const t0 = Date.now(); const offset = (t0 - vid0) / 1000;
  await p.evaluate(([t0, ph, bt, drop]) => window.beatClock(t0, ph, bt, drop), [t0, PHASE, BEAT, DROP]);
  const now = () => (Date.now() - t0) / 1000;
  const late = [];
  const until = async (t, label) => { const d = t - now(); if (d < -0.03) late.push([label, +(-d).toFixed(2)]); if (d > 0) await wait(d * 1000); };
  const nextBeat = (min = 0.32) => { const t = now() + min; return PHASE + Math.ceil((t - PHASE) / BEAT) * BEAT; };
  const cap = async (n, chap, title, sub, m) => { await until(D(n), chap); await p.evaluate(a => { document.getElementById('left').style.opacity = ''; window.setCapNow(...a); }, [chap, title, sub, m]); };
  const tap = async (sel, opts = {}) => {
    const els = await f.$$(sel); const el = els[opts.last ? els.length - 1 : 0];
    if (!el) { console.error('missing', sel); return; }
    await el.scrollIntoViewIfNeeded();
    const bb = await el.boundingBox();
    await p.evaluate(([x, y]) => window.finger(x, y, true), [bb.x + bb.width / 2, bb.y + bb.height / 2]);
    await until(opts.at != null ? opts.at : nextBeat(opts.min || 0.5), sel);
    await p.evaluate(() => window.press(true)); await el.click(); await wait(110); await p.evaluate(() => window.press(false));
    if (opts.beats) await until(nextBeat(0.05) + (opts.beats - 1) * BEAT, sel + ' hold');
  };
  const type = async (sel, text) => { await f.click(sel); await f.type(sel, text, { delay: 45 }); };
  const scroll = async (y, beats = 2) => { await f.evaluate(y => window.scrollTo({ top: y, behavior: 'smooth' }), y); await until(nextBeat(0.05) + (beats - 1) * BEAT, 'scroll'); };
  const hide = () => p.evaluate(() => window.finger(0, 0, false));

  // 1. the store (intro + 4 bars)
  await cap(-0.8, 'OpenSource Everything', 'Free, open apps for learning, money and building.', 'One place to get every app we make. Each one opens on its own, with its own look.', M('Olly', 'opens everything up'));
  await until(D(1)); await scroll(330, 4); await scroll(760, 4); await scroll(0, 2);
  // 2. one OpenID (4 bars)
  await cap(4, 'One OpenID', 'Sign up once.<br>Use every app.', 'Log in with Telegram in one tap. We get your name and photo, never your phone number or chats.', M('Olly', 'one account for all of it'));
  await tap('.tabbar [data-r=me]', { at: D(4) + 2 * BEAT }); await tap('main [data-act=signin]'); await tap('[data-act=tglogin]', { beats: 2 });
  await type('#sa', '21'); await tap('[data-act=signupok]'); await hide();
  // 3. Tomorrow (5 bars)
  await cap(8, 'Tomorrow', 'The social app for driven people.', 'Stories, posts and messages with your friends. No ads, likes hidden.', M('Sunny', 'says good morning'));
  await tap('.tabbar [data-r=home]', { at: D(8) + BEAT }); await scroll(0, 1); await tap('.approw [data-r=tm]', { beats: 3 });
  await tap('.post .heartbtn', { beats: 3 });
  await tap('[data-act=story][data-k=kabir]', { beats: 4 }); await tap('[data-act=svclose]'); await hide();
  // 4. app IDs (4 bars)
  await cap(13, 'App IDs, only when you need them', 'Want to post? Make a Tomorrow ID.', 'Browsing and learning need only your OpenID. A PrepID, GoodID or Tomorrow ID comes in when you post, follow or split money.', M('Sunny', 'one tap, then you post'));
  await tap('.tabbar [data-act=newpost]', { at: D(13) + BEAT, beats: 2 }); await tap('[data-act=createid][data-k=tm]', { beats: 2 });
  await type('#pt', 'Finished Percentages today'); await tap('[data-act=postsave]'); await hide();
  // 5. OpenPrep (5 bars)
  await cap(17, 'OpenPrep', 'Free CAT prep.<br>No ads.', 'Lessons to read, unlimited practice, a full mock every month, and Buddy explaining as you go.', M('Buddy', 'teaches, never lectures'));
  await tap('.backlink', { at: D(17) + BEAT }); await tap('.approw [data-r=prep]', { beats: 2 }); await tap('.tabbar [data-r=quant]', { beats: 2 });
  await tap('#playbtn', { beats: 4 }); await scroll(700, 1); await tap('[data-act=answer][data-i="1"]', { beats: 3 }); await hide();
  // 6. GoodHabit: set up through the breakdown, the Covid crash lands on the drop
  await cap(22, 'GoodHabit', 'Practise money with pretend money first.', 'Replay real Indian market history in the simulator, keep your own books, split bills with friends.', M('GoodGuy', 'minds the money'));
  await f.evaluate(() => window.scrollTo(0, 0));
  await tap('.backlink', { at: D(22) + BEAT }); await tap('.approw [data-r=practice]', { beats: 1 }); await tap('main [data-r=sim]', { beats: 1 });
  await tap('[data-act=simstart]', { at: D(24) }); await tap('[data-act=simbig]', { at: D(25) });
  await tap('[data-act=simbig]', { at: DROP });
  await tap('[data-act=simbig]', { at: D(27) }); await tap('[data-act=simbig]', { at: D(28) }); await hide();
  // 7. one inbox (3 bars)
  await cap(29, 'One inbox, in every app', 'Talk to anyone, from any app.', 'Messages carry live cards: a mock result, a Hissab, a simulator invite. Tap one and it opens in its app.', M('GoodGuy', 'and your Hissabs come too'));
  await f.evaluate(() => { try { const ids = JSON.parse(localStorage.getItem('ose-ids') || '{}'); ids.good = ids.good || 'asha_rao'; localStorage.setItem('ose-ids', JSON.stringify(ids)); } catch (e) {} });
  await tap('.bar .igbtn', { at: D(29) + BEAT }); await tap('[data-act=openchat][data-k=meera]', { beats: 1 }); await tap('[data-act=cardsheet]'); await tap('[data-act=sendcard][data-i="2"]', { beats: 1 });
  await tap('.acard [data-r=mock]'); await hide();
  // 8. Telegram (2 bars), then the end card to the last note
  await cap(32, 'Works with Telegram', 'Bring your Telegram groups along.', 'Groups bridge both ways through our bot. Your Telegram stays yours.', M('Olly', 'see you inside'));
  await f.evaluate(() => { location.hash = 'me'; window.scrollTo(0, 0); });
  await until(D(34), 'end');
  await p.evaluate(h => { document.getElementById('endline').textContent = 'OpenPrep, GoodHabit, The Good Stuff and Tomorrow. One OpenID. One inbox.'; window.endCard(h); }, ['Olly', 'Sunny', 'Buddy', 'GoodGuy'].map(n => `<div>${crewArt[n]}</div>`).join(''));
  await until(81.2, 'done');
  await ctx.close(); await b.close();
  console.log(JSON.stringify({ offset, late }));
})();

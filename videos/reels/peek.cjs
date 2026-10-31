const { chromium } = require('playwright');
// node peek.cjs <id> <t1> <t2> ...  → out/peek/<id>_<t>.jpg
(async () => { const [id, ...ts] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('ERR', e.message)); await p.goto('file://' + __dirname + '/reel.html?id=' + id); await p.evaluate(() => window.READY);
  require('fs').mkdirSync(__dirname + '/out/peek', { recursive: true });
  for (const t of ts) { await p.evaluate(t => window.renderFrame(t), +t); await p.screenshot({ path: `${__dirname}/out/peek/${id}_${t}.jpg`, type: 'jpeg', quality: 70 }); }
  await b.close(); })();

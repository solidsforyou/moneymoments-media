// Reads every reel's length and sound cues from the engine → out/cues.json
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1080, height: 1920 } }), out = {};
  await p.goto('file://' + __dirname + '/reel.html?id=ose-1031-1'); const ids = await p.evaluate(() => Object.keys(window.REELS));
  const q = process.argv[2] ? '&bpm=' + process.argv[2] : '', file = process.argv[3] || 'cues.json';
  for (const id of ids) { await p.goto('file://' + __dirname + '/reel.html?id=' + id + q); out[id] = await p.evaluate(() => ({ duration: window.DURATION, sfx: window.SFX })); }
  require('fs').mkdirSync(__dirname + '/out', { recursive: true }); require('fs').writeFileSync(__dirname + '/out/' + file, JSON.stringify(out, null, 1)); console.log(ids.length, 'reels'); await b.close(); })();

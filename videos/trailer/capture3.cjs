// Captures real Arena screens (phone, 3x) and the boxes of the details the trailer zooms
// into. Needs the dev server on :8896.   node capture3.cjs  → cap3/*.png + cap3/boxes.json
const { chromium } = require('playwright');
const fs = require('fs'); const OUT = __dirname + '/cap3'; fs.mkdirSync(OUT, { recursive: true });
const B = 'http://localhost:8896';
const guest = { nick: 'BraveOtter42', avatar: { skin: 2, eyes: 1, hair: 3, hairColor: 0, shirt: 0, extra: 1 }, cls: 10, difficulty: 'medium', xp: 640,
  progress: { 'school-10-maths.medium': { max: 6, stars: { 1: 3, 2: 2, 3: 3, 4: 2, 5: 3, 6: 1 }, best: { 1: 100, 2: 83, 3: 100, 4: 83, 6: 67 } },
    'school-10-science.medium': { max: 3, stars: { 1: 3, 2: 2, 3: 2 }, best: { 1: 100, 2: 83, 3: 83 } }, 'school-10-english.medium': { max: 2, stars: { 1: 2, 2: 1 }, best: { 1: 83, 2: 67 } } } };
const boxes = {};
(async () => {
  const br = await chromium.launch(), ctx = await br.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: 'light' }), p = await ctx.newPage();
  const box = async (name, sels) => { boxes[name] = {}; for (const [k, s] of Object.entries(sels)) { const b = await p.locator(s).first().boundingBox().catch(() => null); if (b) boxes[name][k] = b; } };
  const shot = async (name, sels = {}) => { await p.waitForTimeout(700); await p.screenshot({ path: `${OUT}/${name}.png` }); await box(name, sels); };
  await p.goto(B + '/arena/'); await p.waitForSelector('.ahero'); await shot('title', { h1: 'h1', cta: 'a[href="#/make"]' });
  await p.goto(B + '/arena/#/make'); await p.waitForSelector('.maker'); await p.click('[data-cls="10"]'); await p.click('[data-diff="medium"]'); await shot('maker', { avatar: '.preview .big', diffs: '.diffs', classes: '.classes' });
  await p.evaluate(g => localStorage.setItem('arena-guest', JSON.stringify(g)), guest);
  await p.goto(B + '/arena/#/'); await p.reload(); await p.waitForSelector('.courses'); await p.evaluate(() => scrollTo(0, 360)); await shot('home', { ring: '.course .ready', course: '.course', player: '.player' });
  await p.goto(B + '/arena/#/c/school-10-maths'); await p.waitForSelector('.path'); await shot('map', { open: '.node.open', boss: '.node.boss', head: '.maphead' });
  await p.click('.node.open', { force: true }); await p.waitForSelector('.qcard'); await shot('qmed', { tag: '.qmeta', q: '.q', opts: '.opts', card: '.qcard' });
  await p.click('.opt >> nth=0'); await p.waitForSelector('.why'); await shot('qmed-ans', { why: '.why', opts: '.opts', card: '.qcard' });
  await p.goto(B + '/arena/#/make'); await p.waitForSelector('.maker'); await p.click('[data-diff="hard"]'); await p.click('[data-act="save"]'); await p.waitForSelector('.courses');
  await p.goto(B + '/arena/#/c/school-10-maths'); await p.waitForSelector('.path'); await p.click('.node.open', { force: true }); await p.waitForSelector('.qcard'); await p.waitForTimeout(1200); await shot('qhard', { tag: '.qmeta', q: '.q', opts: '.opts', card: '.qcard', meter: '.hard' });
  // answer right: rebuild the round from its seed (dev data only) so the result shows a clear
  const D = process.env.OSE_DATA_DIR, rid = (await p.evaluate(() => performance.getEntriesByType('resource').map(e => e.name).filter(n => n.includes('/api/arena/round/')).pop() || '')).split('/').pop();
  const { buildRound, DIFF } = await import('../../web/netlify/lib/arena-bank.mjs');
  const fn = require('fs').readdirSync(D + '/arena').filter(f => f.startsWith('round__')).map(f => [f, require('fs').statSync(D + '/arena/' + f).mtimeMs]).sort((a, b) => b[1] - a[1])[0][0];
  const R = JSON.parse(require('fs').readFileSync(D + '/arena/' + fn)); const ans = buildRound({ course: R.course, diff: DIFF[R.diff], level: R.level, seed: R.seed }).map(q => q.a);
  for (let i = 0; i < 6; i++) { if (!(await p.locator('.opt').count())) break; await p.click(`.opt >> nth=${ans[i]}`); await p.waitForSelector('[data-act="next"]'); await p.click('[data-act="next"]'); await p.waitForTimeout(250); }
  await p.waitForSelector('.xpgain'); await p.waitForTimeout(1400); await shot('result', { stars: '.result .stars', xp: '.xpgain', ready: '.readyline' });
  await p.goto(B + '/arena/#/make'); await p.waitForSelector('.maker'); await p.click('[data-diff="medium"]'); await p.click('[data-act="save"]'); await p.waitForSelector('.courses');
  await p.goto(B + '/arena/#/lb/school-10-maths'); await p.waitForSelector('.lb'); await shot('lb', { list: '.lb', first: '.lb li' });
  await p.goto(B + '/'); await p.waitForSelector('#trailer'); await p.evaluate(() => document.querySelector('.soon').scrollIntoView()); await shot('soon', { card: '.soon' });
  fs.writeFileSync(`${OUT}/boxes.json`, JSON.stringify(boxes)); console.log(Object.keys(boxes).join(' ')); await br.close();
})();

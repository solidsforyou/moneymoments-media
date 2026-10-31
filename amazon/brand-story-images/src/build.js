// Builds the Brand Story 1x1 cards from stays-the-same.html (the approved template).
// node build.js  -> writes <card>.html here and ../infographic-<card>-1x1.jpg, plus ../contact-sheet.jpg
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const P = '../../../assets/sfy/photos/';
const cards = [
  { id: 'solids-for-you', photo: P + 'white-cut-panels-pattern-paper.jpg', num: '', eyebrow: 'The brand',
    h1: 'Solids<br>for you.', lede: 'Solid basics, nothing extra.<br>100% cotton. Made in India.' },
  { id: 'plain-on-purpose', photo: P + 'factory-floor-sewing-line-cropped.jpg', num: '01', eyebrow: 'Plain',
    h1: 'Plain<br>on<br>purpose.', lede: 'No prints to hide behind.<br>When it’s just the colour,<br>the fabric has to be good.' },
  { id: 'good-basics', photo: 'cutting-tee-frame.jpg', num: '02', eyebrow: 'The reason',
    h1: 'We<br>couldn’t<br>find good<br>basics.', lede: 'Plain tees were thin and<br>lost their shape fast.<br>So we made our own.' },
  { id: 'every-plan', photo: P + 'label-heat-transfer-on-blue-tee.jpg', num: '03', eyebrow: 'Everyday',
    h1: 'One tee.<br>Every<br>plan.', lede: 'Class, work, the late-night<br>chai run. Wear it anywhere.' },
  { id: 'feel-it', photo: P + 'blue-tee-shoulder-knit-closeup.jpg', num: '04', eyebrow: 'The feel',
    h1: 'You’ll<br>feel<br>it.', lede: 'Pick it up once<br>and you’ll know.' },
  { id: 'stays-the-same' }, // approved, rendered as is
  { id: 'essentials', photo: P + 'blue-tees-folded-stack.jpg', num: '06', eyebrow: 'The range',
    h1: 'Every style<br>starts with<br>the<br>essentials.', lede: 'See the full range.' },
];
const tpl = fs.readFileSync('stays-the-same.html', 'utf8');
for (const c of cards) {
  if (!c.photo) continue;
  let h = tpl.replace('url(tee-label.jpg)', `url(${c.photo})`)
    .replace(/<div class="eyebrow">.*?<\/div>/, `<div class="eyebrow">${c.num ? `<b>${c.num}</b><i></i>` : ''}${c.eyebrow}</div>`)
    .replace(/<h1>.*?<\/h1>/, `<h1>${c.h1}</h1>`)
    .replace(/<p class="lede">.*?<\/p>/, `<p class="lede">${c.lede}</p>`)
    .replace(/<div class="idx">.*?<\/div>/, `<div class="idx">${c.num ? c.num + ' / 06' : ''}</div>`)
    .replace('.lede{position:absolute;top:1560px;', '.lede{position:absolute;bottom:305px;')
    .replace('width:640px;font-size:52px', 'width:900px;font-size:52px');
  fs.writeFileSync(c.id + '.html', h);
}
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 2000, height: 2000 } });
  for (const c of cards) {
    await pg.goto('file://' + path.resolve(c.id + '.html'));
    await pg.evaluate(() => document.fonts.ready);
    if (c.photo) await pg.evaluate(() => { // fit headline: max 1120px wide, 70px above the lede
      const h = document.querySelector('h1'), l = document.querySelector('.lede');
      let s = 340; h.style.fontSize = s + 'px';
      while (s > 160 && (h.scrollWidth > 1120 || h.getBoundingClientRect().bottom > l.getBoundingClientRect().top - 70)) { s -= 4; h.style.fontSize = s + 'px'; }
    });
    await pg.screenshot({ path: `../infographic-${c.id}-1x1.jpg`, type: 'jpeg', quality: 90 });
  }
  const tiles = cards.map(c => `<img src="file://${path.resolve('../infographic-' + c.id + '-1x1.jpg')}">`).join('');
  await pg.setViewportSize({ width: 1220, height: 620 });
  await pg.setContent(`<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(4,290px);gap:10px;padding:10px">${tiles}<style>img{width:290px;height:290px}</style></body>`);
  await pg.waitForTimeout(300);
  await pg.screenshot({ path: '../contact-sheet.jpg', type: 'jpeg', quality: 85 });
  await b.close();
})();

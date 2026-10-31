// Screenshots each <section> of site.html as a 2000x2000 card into ../site/, plus a 600px-tall contact sheet.
const path = require('path'), fs = require('fs');
const { chromium } = require('playwright');
(async () => {
  fs.mkdirSync('../site', { recursive: true });
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 2000, height: 2000 } });
  await pg.goto('file://' + path.resolve('site.html'));
  await pg.evaluate(() => document.documentElement.classList.add('print'));
  await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(500);
  const ids = await pg.$$eval('section', s => s.map(x => x.id));
  for (const [i, id] of ids.entries()) await (await pg.$('#' + id)).screenshot({ path: `../site/${i}-${id}-1x1.jpg`, type: 'jpeg', quality: 90 });
  await b.close();
  console.log(ids.join(' '));
})();

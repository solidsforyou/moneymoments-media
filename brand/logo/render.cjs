// Renders each logo version in logo.html to a PNG next to this file.
// Usage: node brand/logo/render.cjs
const path = require("path");
const { chromium } = require("playwright");

const versions = [
  { v: "icon", width: 1080, height: 1080 },
  { v: "wordmark", width: 2400, height: 800 },
  { v: "stacked", width: 1080, height: 1350 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const file = "file://" + path.join(__dirname, "logo.html");
  for (const { v, width, height } of versions) {
    await page.setViewportSize({ width, height });
    await page.goto(`${file}?v=${v}`);
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(__dirname, `ukh-${v}.png`);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width, height } });
    console.log("wrote", out);
  }
  await browser.close();
})();

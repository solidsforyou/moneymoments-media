#!/usr/bin/env node
/*
Capture an app's screens at real phone sizes and audit what can be measured.

Works on anything a browser can open: a Next.js app, an Expo app running on
web (`npx expo start --web`), a static build, or a local HTML file.

Usage:
  node capture_screens.cjs --url http://localhost:3000 --out OUT_DIR
       [--routes /,/login,/home] [--devices android,iphone,tablet,desktop]
       [--dark] [--slow] [--full] [--wait 800]

  --routes   paths joined to --url (default: the URL itself)
  --devices  android (360x800), iphone (393x852), tablet (768x1024),
             desktop (1440x900); default android,iphone
  --dark     also capture with the system set to dark mode
  --slow     throttle the network to a slow 4G profile and report load times
  --full     full-page screenshots (default: what fits on the screen,
             which is what the user sees first)
  --wait     extra milliseconds after the page settles (animations)

Writes OUT_DIR/<device>[-dark]/<route>.png, one contact sheet per device
(sheet_<device>.png), report.md and report.json. Audits per screen:
horizontal overflow, tap targets under 44 px (and under 24 px, the WCAG 2.2
minimum), text under 12 px, text contrast below WCAG AA, images without alt
text, form fields without a label, clipped text, console errors and failed
requests. The audit measures; the rubric in app-ui-taste.md judges.

Exit code 0 when it ran (findings don't fail it), 1 when it couldn't run.
*/

const fs = require('fs');
const path = require('path');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  console.error('Playwright not found. Install it in the project (npm i -D playwright) or globally.');
  process.exit(1);
}

const DEVICES = {
  android: { viewport: { width: 360, height: 800 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-A155F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' },
  iphone: { viewport: { width: 393, height: 852 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' },
  tablet: { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
};

// Slow 4G: about 1.6 Mbps down, 750 kbps up, 150 ms latency.
const SLOW = { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 };

function parseArgs(argv) {
  const a = { routes: [''], devices: ['android', 'iphone'], dark: false, slow: false, full: false, wait: 800 };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    const next = () => argv[++i];
    if (k === '--url') a.url = next();
    else if (k === '--out') a.out = next();
    else if (k === '--routes') a.routes = next().split(',').map((s) => s.trim());
    else if (k === '--devices') a.devices = next().split(',').map((s) => s.trim());
    else if (k === '--dark') a.dark = true;
    else if (k === '--slow') a.slow = true;
    else if (k === '--full') a.full = true;
    else if (k === '--wait') a.wait = Number(next());
    else if (k === '-h' || k === '--help') a.help = true;
    else throw new Error(`Unknown option: ${k}`);
  }
  return a;
}

function slug(route) {
  const s = route.replace(/^https?:\/\/[^/]+/, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  return s || 'home';
}

// Runs inside the page. Returns measured findings for the visible document.
function audit(screenWidth) {
  const out = { overflowX: 0, smallTargets: [], tinyTargets: [], smallText: [], lowContrast: [],
    imgNoAlt: [], unlabeled: [], clipped: [] };
  // Mobile browsers widen the layout to fit content, so compare with the device's real width.
  const vw = screenWidth || window.innerWidth;
  out.overflowX = Math.max(0, document.documentElement.scrollWidth - vw, document.body.scrollWidth - vw);

  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0.05;
  };
  const describe = (el) => {
    const t = (el.getAttribute('aria-label') || el.innerText || el.getAttribute('alt') || el.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ');
    const tag = el.tagName.toLowerCase() + (el.getAttribute('role') ? `[role=${el.getAttribute('role')}]` : '');
    return `${tag} "${t.slice(0, 40)}"`;
  };

  // Tap targets.
  const interactive = document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button], [role=link], [role=checkbox], [role=switch], [role=tab], [role=menuitem], [onclick], [tabindex]:not([tabindex="-1"])');
  for (const el of interactive) {
    if (!visible(el)) continue;
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.closest('p, li')) continue; // links inside a sentence are exempt
    const r = el.getBoundingClientRect();
    const size = `${Math.round(r.width)}x${Math.round(r.height)}`;
    if (r.width < 24 || r.height < 24) out.tinyTargets.push(`${describe(el)} ${size}`);
    else if (r.width < 44 || r.height < 44) out.smallTargets.push(`${describe(el)} ${size}`);
  }

  // Colour helpers.
  const parse = (c) => {
    const m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const blend = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
  const background = (el) => {
    const layers = [];
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null; // gradient or image: can't measure
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    const rootBg = parse(getComputedStyle(document.documentElement).backgroundColor);
    if (rootBg && rootBg.a > 0) base = blend(rootBg, base);
    for (let i = layers.length - 1; i >= 0; i--) base = blend(layers[i], base);
    return base;
  };

  // Text: size, contrast, clipping. Only elements that own text directly.
  const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.textContent.trim();
    if (!text) continue;
    const el = node.parentElement;
    if (!el || seen.has(el) || !visible(el) || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName)) continue;
    seen.add(el);
    const cs = getComputedStyle(el);
    const px = parseFloat(cs.fontSize);
    const label = `"${text.slice(0, 40)}"`;
    if (px < 12) out.smallText.push(`${label} ${px}px`);

    const fg = parse(cs.color);
    const bg = background(el);
    if (fg && bg) {
      const f = blend({ ...fg, a: fg.a * Number(cs.opacity || 1) }, bg);
      const L1 = lum(f), L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const bold = Number(cs.fontWeight) >= 700;
      const large = px >= 24 || (bold && px >= 18.66);
      const need = large ? 3 : 4.5;
      if (ratio < need) out.lowContrast.push(`${label} ${ratio.toFixed(2)}:1 (needs ${need}:1)`);
    }

    const clips = cs.overflow === 'hidden' || cs.overflowX === 'hidden' || cs.overflowY === 'hidden';
    if (clips && cs.textOverflow !== 'ellipsis' && !cs.webkitLineClamp?.match?.(/\d/) &&
        (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 2)) {
      out.clipped.push(label);
    }
  }

  for (const img of document.querySelectorAll('img')) {
    if (visible(img) && !img.hasAttribute('alt') && img.getAttribute('role') !== 'presentation') out.imgNoAlt.push(img.currentSrc.split('/').pop().slice(0, 60) || 'img');
  }
  for (const f of document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]), select, textarea')) {
    if (!visible(f)) continue;
    const id = f.id;
    const labelled = f.getAttribute('aria-label') || f.getAttribute('aria-labelledby') || f.closest('label') ||
      (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) || f.getAttribute('title');
    if (!labelled) out.unlabeled.push(`${f.tagName.toLowerCase()}${f.type ? `[type=${f.type}]` : ''}${f.placeholder ? ` placeholder "${f.placeholder}" (placeholder is not a label)` : ''}`);
  }
  for (const k of Object.keys(out)) if (Array.isArray(out[k])) out[k] = [...new Set(out[k])];
  return out;
}

async function contactSheet(browser, files, dest, title) {
  if (!files.length) return;
  const imgs = files.map((f) => `<figure><img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}"><figcaption>${path.basename(path.dirname(f))}/${path.basename(f)}</figcaption></figure>`).join('');
  const html = `<html><body style="margin:0;background:#111;font:14px sans-serif;color:#ddd"><h3 style="padding:12px 16px;margin:0">${title}</h3><div style="display:flex;flex-wrap:wrap;gap:16px;padding:0 16px 16px">${imgs}</div><style>figure{margin:0;width:300px}img{width:300px;border:1px solid #333;display:block}figcaption{padding:4px 0}</style></body></html>`;
  const page = await browser.newPage({ viewport: { width: Math.min(1600, 32 + files.length * 316), height: 800 } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({ path: dest, fullPage: true });
  await page.close();
}

async function main() {
  const a = parseArgs(process.argv);
  if (a.help || !a.url || !a.out) {
    console.log(fs.readFileSync(__filename, 'utf8').replace(/^#!.*\n/, '').split('*/')[0].replace('/*', '').trim());
    process.exit(a.help ? 0 : 1);
  }
  for (const d of a.devices) if (!DEVICES[d]) throw new Error(`Unknown device: ${d}. Use ${Object.keys(DEVICES).join(', ')}`);
  fs.mkdirSync(a.out, { recursive: true });

  const browser = await chromium.launch();
  const results = [];
  const schemes = a.dark ? ['light', 'dark'] : ['light'];
  for (const dev of a.devices) {
    const sheetFiles = [];
    for (const scheme of schemes) {
      const dirName = scheme === 'dark' ? `${dev}-dark` : dev;
      fs.mkdirSync(path.join(a.out, dirName), { recursive: true });
      const ctx = await browser.newContext({ ...DEVICES[dev], colorScheme: scheme, locale: 'en-IN', timezoneId: 'Asia/Kolkata' });
      for (const route of a.routes) {
        const url = new URL(route, a.url).href;
        const page = await ctx.newPage();
        const consoleErrors = [], failed = [];
        page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); });
        page.on('pageerror', (e) => consoleErrors.push(String(e.message || e).slice(0, 200)));
        page.on('requestfailed', (r) => failed.push(`${r.failure()?.errorText || 'failed'} ${r.url().slice(0, 120)}`));
        page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url().slice(0, 120)}`); });
        if (a.slow) {
          const cdp = await ctx.newCDPSession(page);
          await cdp.send('Network.enable');
          await cdp.send('Network.emulateNetworkConditions', SLOW);
        }
        const t0 = Date.now();
        let loadError = null;
        try {
          await page.goto(url, { waitUntil: 'load', timeout: a.slow ? 90000 : 45000 });
          await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        } catch (e) {
          loadError = String(e.message || e).split('\n')[0];
        }
        const loadMs = Date.now() - t0;
        await page.waitForTimeout(a.wait);
        const file = path.join(a.out, dirName, `${slug(route)}.png`);
        let findings = null;
        try {
          await page.screenshot({ path: file, fullPage: a.full });
          sheetFiles.push(file);
          findings = await page.evaluate(audit, DEVICES[dev].viewport.width);
        } catch (e) {
          loadError = loadError || String(e.message || e).split('\n')[0];
        }
        results.push({ device: dev, scheme, route: route || '(url)', url, file: path.relative(a.out, file), loadMs, loadError, consoleErrors, failedRequests: [...new Set(failed)], findings });
        await page.close();
      }
      await ctx.close();
    }
    await contactSheet(browser, sheetFiles, path.join(a.out, `sheet_${dev}.png`), `${dev}: ${DEVICES[dev].viewport.width}x${DEVICES[dev].viewport.height}`);
  }
  await browser.close();

  fs.writeFileSync(path.join(a.out, 'report.json'), JSON.stringify(results, null, 2));
  const lines = ['# Screen audit', '', `URL: ${a.url}  Devices: ${a.devices.join(', ')}${a.dark ? ' (light and dark)' : ''}${a.slow ? '  Network: slow 4G' : ''}`, ''];
  const totals = {};
  const sections = [
    ['overflow', 'Page scrolls sideways'], ['tinyTargets', 'Tap targets under 24 px (WCAG 2.2 fail)'],
    ['smallTargets', 'Tap targets under 44 px (below Apple 44 pt / Android 48 dp guidance)'],
    ['smallText', 'Text under 12 px'], ['lowContrast', 'Text contrast below WCAG AA'],
    ['clipped', 'Text cut off'], ['imgNoAlt', 'Images without alt text'], ['unlabeled', 'Form fields without a label'],
  ];
  for (const r of results) {
    lines.push(`## ${r.device}${r.scheme === 'dark' ? ' (dark)' : ''}: ${r.route}`, '', `Screenshot: ${r.file}. Load: ${r.loadMs} ms${r.loadError ? `. LOAD ERROR: ${r.loadError}` : ''}`, '');
    const f = r.findings;
    if (f) {
      for (const [k, title] of sections) {
        const items = k === 'overflow' ? (f.overflowX ? [`${f.overflowX}px wider than the screen`] : []) : f[k];
        totals[title] = (totals[title] || 0) + items.length;
        if (items.length) lines.push(`- **${title}** (${items.length}): ${items.slice(0, 8).join('; ')}${items.length > 8 ? '; …' : ''}`);
      }
    }
    if (r.consoleErrors.length) lines.push(`- **Console errors** (${r.consoleErrors.length}): ${r.consoleErrors.slice(0, 5).join(' | ')}`);
    if (r.failedRequests.length) lines.push(`- **Failed requests** (${r.failedRequests.length}): ${r.failedRequests.slice(0, 5).join(' | ')}`);
    lines.push('');
  }
  lines.push('## Totals', '');
  for (const [, title] of sections) lines.push(`- ${title}: ${totals[title] || 0}`);
  lines.push('', 'Contrast is skipped over images and gradients: check those by eye.');
  fs.writeFileSync(path.join(a.out, 'report.md'), lines.join('\n') + '\n');
  console.log(`Captured ${results.length} screens -> ${a.out} (report.md, report.json, sheet_*.png)`);
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });

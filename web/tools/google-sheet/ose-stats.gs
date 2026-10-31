/**
 * OpenSource Everything stats in a Google Sheet.
 *
 * Pulls the site's anonymous counts (page views per page per day, "I'm interested" taps) into
 * this sheet every hour and keeps the full history (the site itself only keeps 14 days).
 * No names, no cookies, no IP addresses: the site only stores numbers.
 *
 * Set up once, on a computer:
 *   1. Make a blank Google Sheet. Extensions > Apps Script. Delete what's there, paste this file.
 *   2. Change SITE below to your Netlify address. Save.
 *   3. Project Settings (gear) > Script Properties > Add: ADMIN_TOKEN = your site's ADMIN_TOKEN.
 *   4. Back in the editor pick "setup" and press Run. Allow access when Google asks.
 * It fills the sheet now and then every hour. "OSE stats > Refresh now" in the sheet's menu
 * updates it on demand.
 */
const SITE = 'https://YOUR-SITE-NAME.netlify.app';

function onOpen() {
  SpreadsheetApp.getUi().createMenu('OSE stats').addItem('Refresh now', 'refresh').addItem('Set up again', 'setup').addToUi();
}

function setup() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('refresh').timeBased().everyHours(1).create();
  refresh();
}

function get_(path) {
  const token = PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN');
  if (!token) throw new Error('Add ADMIN_TOKEN under Project Settings > Script Properties first.');
  if (SITE.indexOf('YOUR-SITE-NAME') >= 0) throw new Error('Change SITE at the top of the script to your Netlify address.');
  const r = UrlFetchApp.fetch(SITE.replace(/\/$/, '') + path, { headers: { Authorization: 'Bearer ' + token }, muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) throw new Error(path + ' answered ' + r.getResponseCode() + ': ' + r.getContentText().slice(0, 200));
  return JSON.parse(r.getContentText());
}

function tab_(ss, name) { return ss.getSheetByName(name) || ss.insertSheet(name); }

function refresh() {
  const ss = SpreadsheetApp.getActive();
  const days = get_('/api/pulse/views').days;          // { '2026-11-01': { '/arena/': 12, ... }, ... }
  const interest = get_('/api/pulse/interest').counts; // { tomorrow: 3, ... }
  const now = new Date();

  // ---- Views: one row per day, one column per page; old days are kept ----
  const vs = tab_(ss, 'Views');
  const old = vs.getLastRow() > 1 ? vs.getDataRange().getValues() : [];
  const head = old.length ? old[0].slice(2) : [];       // page columns already in the sheet
  const rows = {};
  old.slice(1).forEach(r => {
    const d = r[0] instanceof Date ? Utilities.formatDate(r[0], 'Asia/Kolkata', 'yyyy-MM-dd') : String(r[0]);
    rows[d] = {}; head.forEach((p, i) => { rows[d][p] = Number(r[i + 2]) || 0; });
  });
  Object.keys(days).forEach(d => { rows[d] = Object.assign(rows[d] || {}, days[d]); });
  const pages = Array.from(new Set(head.concat(...Object.values(days).map(o => Object.keys(o))))).sort();
  const dates = Object.keys(rows).sort();
  const out = [['Date', 'All pages'].concat(pages)].concat(dates.map(d => {
    const v = pages.map(p => rows[d][p] || 0);
    return [d, v.reduce((a, b) => a + b, 0)].concat(v);
  }));
  vs.clearContents();
  vs.getRange(1, 1, out.length, out[0].length).setValues(out);
  vs.getRange(1, 1, 1, out[0].length).setFontWeight('bold');
  vs.setFrozenRows(1); vs.setFrozenColumns(2);
  if (!vs.getCharts().length && out.length > 1) {
    vs.insertChart(vs.newChart().asLineChart().addRange(vs.getRange(1, 1, Math.max(out.length, 60), 2))
      .setPosition(2, out[0].length + 2, 0, 0).setOption('title', 'Page views per day').setOption('legend', { position: 'none' }).build());
  }

  // ---- Interest: taps on "I'm interested" per coming-soon app ----
  const is = tab_(ss, 'Interest');
  const names = { tomorrow: 'Tomorrow', goodhabit: 'GoodHabit', ai: 'How to use AI', goodstuff: 'The Good Stuff', library: 'AI Discovery Library', accounting: 'Accounting Unlocked' };
  const irows = [['App', 'Taps']].concat(Object.keys(interest).map(k => [names[k] || k, interest[k] || 0]).sort((a, b) => b[1] - a[1]));
  is.clearContents();
  is.getRange(1, 1, irows.length, 2).setValues(irows);
  is.getRange(1, 1, 1, 2).setFontWeight('bold'); is.setFrozenRows(1);

  // ---- Summary ----
  const total = dates.reduce((a, d) => a + pages.reduce((s, p) => s + (rows[d][p] || 0), 0), 0);
  const last7 = dates.slice(-7).reduce((a, d) => a + pages.reduce((s, p) => s + (rows[d][p] || 0), 0), 0);
  const arena7 = dates.slice(-7).reduce((a, d) => a + Object.keys(rows[d]).filter(p => p.indexOf('/arena') === 0).reduce((s, p) => s + rows[d][p], 0), 0);
  const ss0 = tab_(ss, 'Summary');
  ss0.clearContents();
  ss0.getRange(1, 1, 6, 2).setValues([
    ['OpenSource Everything', ''],
    ['Updated', Utilities.formatDate(now, 'Asia/Kolkata', 'd MMM yyyy, h:mm a') + ' IST'],
    ['Page views, last 7 days', last7],
    ['Arena page views, last 7 days', arena7],
    ['Page views, all time in this sheet', total],
    ['Most wanted coming-soon app', irows.length > 1 ? irows[1][0] + ' (' + irows[1][1] + ' taps)' : 'No taps yet'],
  ]);
  ss0.getRange(1, 1).setFontWeight('bold').setFontSize(14);
  ss0.setColumnWidth(1, 260);
  ss.setActiveSheet(ss0); ss.moveActiveSheet(1);
}

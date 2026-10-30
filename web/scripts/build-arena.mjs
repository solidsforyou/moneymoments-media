// Turns content/arena (syllabus + bank CSVs) into the data Arena's server uses, and writes
// the shareable sheets: one research sheet per class, plus sources and a summary.
//   node scripts/build-arena.mjs        (from web/, or any folder)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(WEB, '../content/arena'), OUT = path.join(WEB, 'netlify/lib/arena-data.json');
const SUBJECT = { maths: 'Maths', evs: 'EVS', science: 'Science', english: 'English', physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology', qa: 'CAT Quant', dilr: 'CAT DILR', varc: 'CAT VARC', money: 'Money', digital: 'Digital skills' };
const BOSS_AFTER = 4;

if (!fs.existsSync(path.join(SRC, 'bank'))) { console.log('arena: no content/arena here; keeping the committed arena-data.json'); process.exit(0); }

// RFC 4180 CSV
export function parseCSV(text) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; continue; }
    if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(f); rows.push(row); row = []; f = ''; } else f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  const [head, ...body] = rows.filter(r => r.some(x => x.trim()));
  return head ? body.map(r => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()]))) : [];
}
const toCSV = (rows, cols) => [cols.join(','), ...rows.map(r => cols.map(c => { const v = String(r[c] ?? ''); return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; }).join(','))].join('\n') + '\n';
const read = (dir, f) => { const p = path.join(SRC, dir, f); return fs.existsSync(p) ? parseCSV(fs.readFileSync(p, 'utf8')) : []; };
const list = dir => fs.existsSync(path.join(SRC, dir)) ? fs.readdirSync(path.join(SRC, dir)).filter(f => f.endsWith('.csv')).sort() : [];

const courses = {}, summary = [];
for (const file of list('bank')) {
  const id = file.replace(/\.csv$/, ''), [track, cc, subject] = id.split('-'), cls = +cc;
  const bank = read('bank', file).filter(r => r.selected === 'Y'), syl = read('syllabus', file);
  const names = new Map(syl.map(s => [+s.chapter_no, { name: s.chapter, topics: s.topics }]));
  for (const r of bank) if (!names.has(+r.chapter_no)) names.set(+r.chapter_no, { name: r.chapter, topics: '' });
  const q = {};
  for (const r of bank) {
    const ch = +r.chapter_no, opts = [r.a, r.b, r.c, r.d];
    (q[ch] ||= { easy: [], medium: [], hard: [] })[r.difficulty]?.push({ id: r.qid, q: r.question, o: opts, a: 'ABCD'.indexOf(r.answer), why: r.why, h: +r.hardness, t: +r.est_seconds, topic: r.topic });
  }
  for (const ch of Object.values(q)) for (const b of Object.values(ch)) b.sort((x, y) => x.h - y.h);
  const chapters = [...names.entries()].sort((a, b) => a[0] - b[0]).filter(([no]) => q[no]).map(([no, c]) => ({ no, name: c.name, topics: c.topics, n: { easy: q[no].easy.length, medium: q[no].medium.length, hard: q[no].hard.length } }));
  if (!chapters.length) continue;
  const levels = []; let since = [];
  for (const c of chapters) {
    levels.push({ ch: c.no }); since.push(c.no);
    if (since.length === BOSS_AFTER) { levels.push({ boss: since }); since = []; }
  }
  if (since.length >= 2) levels.push({ boss: since });
  courses[id] = { id, track, cls, subject, name: SUBJECT[subject] || subject, chapters, levels, q };
  const research = read('research', file);
  summary.push({ course: id, chapters: chapters.length, research_rows: research.length, research_sources: new Set(research.map(r => r.source_id)).size, bank_selected: bank.length, easy: bank.filter(r => r.difficulty === 'easy').length, medium: bank.filter(r => r.difficulty === 'medium').length, hard: bank.filter(r => r.difficulty === 'hard').length });
}
fs.writeFileSync(OUT, JSON.stringify({ built: new Date().toISOString().slice(0, 10), courses }));

// sheets: research by class (and by track), sources, summary
const sheets = path.join(SRC, 'sheets'); fs.mkdirSync(sheets, { recursive: true });
const RCOLS = ['course', 'subject', 'chapter_no', 'chapter', 'topic', 'difficulty', 'qtype', 'skill', 'gist', 'source_id', 'source_url', 'est_seconds', 'fit', 'quality', 'relevance', 'score', 'selected', 'ref_id'];
const groups = {}, sources = {};
for (const file of list('research')) {
  const id = file.replace(/\.csv$/, ''), [track, cc, subject] = id.split('-');
  const sheet = track === 'school' ? `class-${cc}` : track;
  for (const r of read('research', file)) {
    (groups[sheet] ||= []).push({ ...r, course: id, subject: SUBJECT[subject] || subject });
    const s = (sources[r.source_id] ||= { source_id: r.source_id, example_url: r.source_url, rows: 0, selected: 0, courses: new Set() });
    s.rows++; if (r.selected === 'Y') s.selected++; s.courses.add(id);
  }
}
for (const [name, rows] of Object.entries(groups)) fs.writeFileSync(path.join(sheets, `${name}.csv`), toCSV(rows, RCOLS));
fs.writeFileSync(path.join(sheets, 'sources.csv'), toCSV(Object.values(sources).sort((a, b) => b.rows - a.rows).map(s => ({ ...s, courses: [...s.courses].join('; ') })), ['source_id', 'rows', 'selected', 'courses', 'example_url']));
fs.writeFileSync(path.join(sheets, 'summary.csv'), toCSV(summary, ['course', 'chapters', 'research_rows', 'research_sources', 'bank_selected', 'easy', 'medium', 'hard']));
const total = summary.reduce((a, s) => a + s.bank_selected, 0);
console.log(`arena: ${Object.keys(courses).length} courses, ${total} questions served, sheets for ${Object.keys(groups).length} groups`);

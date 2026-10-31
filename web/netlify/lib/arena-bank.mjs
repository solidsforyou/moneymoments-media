// Arena's question bank: original questions per course, chapter and difficulty, built from
// content/arena by scripts/build-arena.mjs. Rounds are rebuilt from a seed, so the server
// never has to store the questions it sent.
import data from './arena-data.json' with { type: 'json' };

export const COURSES = data.courses;
export const DIFF = { easy: 0, medium: 1, hard: 2 };
const BANDS = ['easy', 'medium', 'hard'];
export const PER_LEVEL = 6;

// readiness words, by track and class (the founder's names)
export function readinessName(c) {
  if (c.track === 'cat') return 'CAT readiness';
  if (c.track === 'money') return 'Investment readiness';
  if (c.track === 'digital') return 'Digital readiness';
  return c.cls === 10 || c.cls === 12 ? 'Board readiness' : 'Unit test readiness';
}
// who sees which course: school subjects for your class; money and digital for class 6 up;
// CAT for class 11 up (13 = college or working)
export function coursesFor(cls) {
  return Object.values(COURSES).filter(c => c.track === 'school' ? c.cls === cls : c.track === 'cat' ? cls >= 11 : cls >= 6);
}
export function catalog(c) {
  return { id: c.id, track: c.track, cls: c.cls, subject: c.subject, name: c.name, readiness: readinessName(c), chapters: c.chapters.map(({ no, name, topics, n }) => ({ no, name, topics, n })), levels: c.levels };
}

export function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const shuffle = (r, arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// the band asked for first, then the nearest bands, so a thin chapter still makes a level
function pool(c, ch, band) {
  const order = band === 'easy' ? ['easy', 'medium', 'hard'] : band === 'hard' ? ['hard', 'medium', 'easy'] : ['medium', 'easy', 'hard'];
  const out = []; for (const b of order) for (const q of c.q[ch]?.[b] || []) out.push({ ...q, band: b });
  return out;
}

// a round: up to six questions, easiest first, options shuffled per round
export function buildRound({ course, diff, level, seed }) {
  const c = COURSES[course], L = c?.levels[level - 1]; if (!L) return [];
  const r = rng(seed), band = BANDS[diff];
  let qs;
  if (L.ch) qs = pool(c, L.ch, band).slice(0, PER_LEVEL);
  else {   // boss: the hardest from each of its chapters, in this band
    const per = L.boss.map(ch => pool(c, ch, band).filter(q => q.band === band).sort((x, y) => y.h - x.h));
    qs = []; for (let i = 0; qs.length < PER_LEVEL && i < 6; i++) for (const p of per) if (p[i] && qs.length < PER_LEVEL) qs.push(p[i]);
    if (qs.length < PER_LEVEL) for (const ch of L.boss) for (const q of pool(c, ch, band)) if (qs.length < PER_LEVEL && !qs.some(x => x.id === q.id)) qs.push(q);
  }
  qs.sort((x, y) => BANDS.indexOf(x.band) - BANDS.indexOf(y.band) || x.h - y.h);
  return qs.map(q => { const order = shuffle(r, [0, 1, 2, 3]); return { id: q.id, q: q.q, o: order.map(i => q.o[i]), a: order.indexOf(q.a), why: q.why, h: q.h, t: q.t, band: q.band, topic: q.topic }; });
}
export const isBoss = (course, level) => !!COURSES[course]?.levels[level - 1]?.boss;
export const RANKS = [[0, 'Bronze'], [500, 'Silver'], [1500, 'Gold'], [3500, 'Diamond'], [7000, 'Champion']];
export const rankOf = xp => RANKS.filter(([min]) => xp >= min).pop()[1];

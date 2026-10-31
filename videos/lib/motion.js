// Shared helpers for renderFrame(t) scenes. Every value is a pure function of t.
// A scene sets window.MOTION = { fps, beat, beat0, drop } before using pulse().
const ease = {
  linear: (x) => x,
  outCubic: (x) => 1 - Math.pow(1 - x, 3),
  inCubic: (x) => x * x * x,
  inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  outExpo: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  outBack: (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
};
function tween(t, start, dur, from, to, e = ease.outCubic) {
  if (t <= start) return from;
  if (t >= start + dur) return to;
  return from + (to - from) * e((t - start) / dur);
}
const frames = (n) => n / (window.MOTION ? window.MOTION.fps : 30);
const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const inr = (n) => n.toLocaleString("en-IN");
const count = (t, start, dur, to, e = ease.outExpo, from = 0) => Math.round(tween(t, start, dur, from, to, e));

// Scene container between cue[0] and cue[1]: rises in, pushes in slowly, leaves upward with blur.
function scene(id, t, cue) {
  const [a, b] = cue;
  const el = $(id);
  if (t < a - 0.01 || t > b + frames(8)) { el.style.display = "none"; return false; }
  el.style.display = "block";
  const inK = a <= 0 ? 1 : tween(t, a, frames(8), 0, 1, ease.outCubic);
  const outK = tween(t, b - frames(6), frames(6), 0, 1, ease.inCubic);
  const prog = clamp((t - a) / (b - a), 0, 1);
  el.style.opacity = inK * (1 - outK);
  el.style.transform = `translateY(${50 * (1 - inK) - 80 * outK}px) scale(${1 + 0.04 * prog + 0.03 * outK})`;
  el.style.filter = outK > 0 ? `blur(${outK * 12}px)` : "none";
  return true;
}
// Element entrance: rise, fade and unblur.
function enter(el, t, start, { dur = frames(12), dy = 40, dx = 0, e = ease.outCubic, scaleFrom = 1 } = {}) {
  const k = tween(t, start, dur, 0, 1, e);
  el.style.opacity = clamp(tween(t, start, dur * 0.7, 0, 1, ease.linear), 0, 1);
  el.style.transform = `translate(${(1 - k) * dx}px, ${(1 - k) * dy}px) scale(${scaleFrom + (1 - scaleFrom) * k})`;
  el.style.filter = k < 1 ? `blur(${(1 - Math.min(1, k * 1.4)) * 10}px)` : "none";
}
// Word-by-word entrance for the direct .w children of el.
function words(el, t, start, stagger = frames(3)) {
  [...el.querySelectorAll(":scope > .w")].forEach((w, i) => enter(w, t, start + i * stagger, { dur: frames(10), dy: 30 }));
}
// Typewriter: shows the first n characters of text, with a blinking caret while typing.
function typed(el, t, start, text, cps = 22) {
  const n = clamp(Math.floor((t - start) * cps), 0, text.length);
  const caret = n < text.length || Math.floor(t * 2) % 2 === 0 ? "|" : "";
  el.textContent = t < start ? "" : text.slice(0, n) + (t < start + text.length / cps + 0.6 ? caret : "");
}
// Highlight pill: grows in from the left behind the word.
function pill(el, t, start, dur = frames(10)) {
  const k = tween(t, start, dur, 0, 1, ease.outBack);
  el.style.opacity = clamp(k * 2, 0, 1);
  el.style.transform = `scale(${0.7 + 0.3 * k})`;
}
// 1 on each beat after the drop, decaying to 0 before the next.
function pulse(t) {
  const m = window.MOTION;
  if (!m || t < m.drop) return 0;
  const ph = ((t - m.beat0) % m.beat + m.beat) % m.beat;
  return Math.exp(-ph * 7);
}
// Deterministic random numbers for decorative effects.
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let x = Math.imul(seed ^ seed >>> 15, 1 | seed); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
// Cursor that glides between points [t, x, y] and dips on clicks listed in `clicks`.
function cursor(el, t, path, clicks = []) {
  let x = path[0][1], y = path[0][2];
  for (let i = 1; i < path.length; i++) {
    const [t0, x0, y0] = path[i - 1], [t1, x1, y1] = path[i];
    if (t >= t0 && t <= t1) { const k = ease.inOutCubic((t - t0) / (t1 - t0)); x = x0 + (x1 - x0) * k; y = y0 + (y1 - y0) * k; break; }
    if (t > t1) { x = x1; y = y1; }
  }
  const press = clicks.reduce((m, c) => Math.max(m, t >= c && t < c + 0.25 ? 1 - Math.abs((t - c) / 0.125 - 1) : 0), 0);
  el.style.transform = `translate(${x}px, ${y}px) scale(${1 - 0.18 * press})`;
}

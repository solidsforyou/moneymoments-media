// Arena question bank. Maths and Money questions are generated with the answer computed,
// so they are right by construction; English and Digital skills are written by hand.
// Every question: { q, o: [4 options], a: index of the right one, why }.

export const COURSES = {
  maths: { name: 'Maths', classes: [6, 7, 8, 9, 10] },
  english: { name: 'English', classes: [6, 7, 8, 9, 10] },
  money: { name: 'Money basics', classes: null },
  digital: { name: 'Digital skills', classes: null },
};
export const LEVELS = 30, PER_LEVEL = 6, BOSS_EVERY = 5;
export const DIFF = { rookie: 0, pro: 1, legend: 2 };

// seeded random, so a round can be rebuilt from its seed
export function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const int = (r, lo, hi) => { lo = Math.round(lo); hi = Math.round(hi); return lo + Math.floor(r() * (hi - lo + 1)); };
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const shuffle = (r, arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmt = n => Number.isInteger(n) ? n.toLocaleString('en-IN') : (+n.toFixed(2)).toLocaleString('en-IN');
// four distinct options around the right answer, shuffled
function opts(r, right, wrongs, show = fmt) {
  const seen = new Set([show(right)]), w = [];
  for (const x of wrongs) { const s = show(x); if (!seen.has(s) && Number.isFinite(x)) { seen.add(s); w.push(s); } if (w.length === 3) break; }
  let k = 1; while (w.length < 3) { const s = show(right + k * (k % 2 ? 1 : -1) * Math.max(1, Math.round(Math.abs(right) * .1))); if (!seen.has(s)) { seen.add(s); w.push(s); } k++; }
  const all = shuffle(r, [show(right), ...w]); return { o: all, a: all.indexOf(show(right)) };
}
const gcd = (a, b) => b ? gcd(b, a % b) : a;

// ---------------- Maths ----------------
// level bands: 1-5 arithmetic, 6-10 percentages and ratio, 11-15 algebra, 16-20 geometry,
// 21-25 number sense and averages, 26-30 mixed and harder
const MATHS = [
  (r, s) => { const a = int(r, 12 * s, 99 * s), b = int(r, 11, 29 + 20 * s); const v = a * b; return { q: `What is ${fmt(a)} × ${b}?`, ...opts(r, v, [v + b, v - a, a * (b + 1) + 1]), why: `${fmt(a)} × ${b} = ${fmt(v)}.` }; },
  (r, s) => { const d = pick(r, [2, 4, 5, 8, 10, 20, 25]), n = int(r, 1, d - 1), w = int(r, 2, 6 + 4 * s) * d; const v = w * n / d; return { q: `What is ${n}/${d} of ${fmt(w)}?`, ...opts(r, v, [w / d, v + w / d, w - v]), why: `${fmt(w)} ÷ ${d} = ${fmt(w / d)}, × ${n} = ${fmt(v)}.` }; },
  (r, s) => { const a = +(int(r, 10, 99 + 300 * s) / 10).toFixed(1), b = +(int(r, 10, 99 + 300 * s) / 10).toFixed(1); const v = +(a + b).toFixed(1); return { q: `What is ${a} + ${b}?`, ...opts(r, v, [+(v + 1).toFixed(1), +(v - .1).toFixed(1), +(v + .9).toFixed(1)]), why: `Line up the decimal points: ${a} + ${b} = ${v}.` }; },
  (r, s) => { const p = pick(r, [10, 20, 25, 40, 50, 75, 15, 35]), w = int(r, 2, 20 + 20 * s) * 20; const v = w * p / 100; return { q: `What is ${p}% of ${fmt(w)}?`, ...opts(r, v, [v * 2, w - v, v + 10]), why: `${p}% = ${p}/100. ${fmt(w)} × ${p}/100 = ${fmt(v)}.` }; },
  (r, s) => { const a = int(r, 2, 9), b = int(r, 2, 9), c = int(r, 2, 9 + 5 * s); const v = a + b * c; return { q: `What is ${a} + ${b} × ${c}?`, ...opts(r, v, [(a + b) * c, a * b + c, v + 1]), why: `Multiply first: ${b} × ${c} = ${b * c}, then add ${a}: ${v}.` }; },
  (r, s) => { const p = pick(r, [10, 20, 25, 50]), q = pick(r, [10, 20]), w = int(r, 4, 20) * 100; const v = w * (1 - p / 100) * (1 - q / 100); return { q: `A price of ₹${fmt(w)} gets ${p}% off, then ${q}% off. What do you pay?`, ...opts(r, v, [w * (1 - (p + q) / 100), w * (1 - p / 100), v + 50]), why: `₹${fmt(w)} × ${1 - p / 100} × ${1 - q / 100} = ₹${fmt(v)}. Two discounts multiply; they don't add.` }; },
  (r, s) => { const a = int(r, 1, 5), b = int(r, 1, 5), m = int(r, 10, 40 + 30 * s); if (a === b) return MATHS[6](r, s); const t = (a + b) * m; return { q: `Split ₹${fmt(t)} in the ratio ${a} : ${b}. The bigger share is?`, ...opts(r, Math.max(a, b) * m, [Math.min(a, b) * m, t / 2, Math.max(a, b) * m + m]), why: `${a + b} parts of ₹${m}. The bigger share is ${Math.max(a, b)} × ${m} = ₹${fmt(Math.max(a, b) * m)}.` }; },
  (r, s) => { const o = int(r, 4, 40) * 10, p = pick(r, [10, 20, 25, 30, 40, 50]), up = r() < .5; const n = o * (1 + (up ? p : -p) / 100); return { q: `A number goes from ${fmt(o)} to ${fmt(n)}. By what percent did it ${up ? 'rise' : 'fall'}?`, ...opts(r, p, [Math.round(Math.abs(n - o) / n * 100), p + 5, p * 2], v => v + '%'), why: `Change ${fmt(Math.abs(n - o))} on the starting ${fmt(o)} = ${p}%. Always divide by where it started.` }; },
  (r, s) => { const P = int(r, 2, 20) * 1000, R = pick(r, [4, 5, 6, 8, 10, 12]), T = int(r, 2, 5); const v = P * R * T / 100; return { q: `Simple interest on ₹${fmt(P)} at ${R}% a year for ${T} years?`, ...opts(r, v, [P * R / 100, v + P * R / 100, P * (Math.pow(1 + R / 100, T) - 1)]), why: `P × R × T ÷ 100 = ${fmt(P)} × ${R} × ${T} ÷ 100 = ₹${fmt(v)}.` }; },
  (r, s) => { const x = int(r, 2, 9), y = x * int(r, 2, 6), z = int(r, 2, 9); return { q: `If ${x} pens cost ₹${x * z}, how much do ${y} pens cost?`, ...opts(r, y * z, [x * z + y, y * z + z, (y - x) * z]), why: `One pen costs ₹${z}. ${y} pens cost ${y} × ${z} = ₹${y * z}.` }; },
  (r, s) => { const a = int(r, 2, 9), x = int(r, -5 * s - 2, 12 + 5 * s), b = int(r, 1, 20); const c = a * x + b; return { q: `Solve: ${a}x + ${b} = ${c}. x = ?`, ...opts(r, x, [x + 1, -x, (c + b) / a], v => fmt(+v.toFixed(2))), why: `${a}x = ${c} − ${b} = ${c - b}, so x = ${c - b} ÷ ${a} = ${x}.` }; },
  (r, s) => { const b = int(r, 2, 5 + s), e = int(r, 2, 4 + (s > 0 ? 1 : 0)); const v = Math.pow(b, e); return { q: `What is ${b}^${e}?`, ...opts(r, v, [b * e, Math.pow(b, e - 1), v + b]), why: `${b}^${e} means ${Array(e).fill(b).join(' × ')} = ${fmt(v)}.` }; },
  (r, s) => { const a = int(r, 2, 6), b = int(r, 2, 6), c = int(r, 2, 9), right = `${a + b}x + ${a * c}`; const all = shuffle(r, [right, ...[...new Set([`${a + b}x + ${c}`, `${a * b}x + ${a * c}`, `${a + b}x + ${a + c}`, `${a + b + 1}x + ${a * c}`, `${a}x + ${a * c + b}`])].filter(w => w !== right).slice(0, 3)]); return { q: `Simplify: ${a}(x + ${c}) + ${b}x`, o: all, a: all.indexOf(right), why: `${a}(x + ${c}) = ${a}x + ${a * c}. Add ${b}x: ${a + b}x + ${a * c}.` }; },
  (r, s) => { const x = int(r, 2, 9), y = int(r, 1, 9); const sum = x + y, diff = x - y; return { q: `x + y = ${sum} and x − y = ${diff}. x = ?`, ...opts(r, x, [y, sum, x + 1]), why: `Add the two: 2x = ${sum + diff}, so x = ${x}.` }; },
  (r, s) => { const x = int(r, 2, 12), k = int(r, 2, 5); return { q: `If ${k}x − ${k * 2} = ${k * x - k * 2}, what is x²?`, ...opts(r, x * x, [x * 2, x * x + x, (x + 1) * (x + 1)]), why: `${k}x = ${k * x}, so x = ${x} and x² = ${x * x}.` }; },
  (r, s) => { const l = int(r, 4, 20 + 10 * s), w = int(r, 3, l); return { q: `A rectangle is ${l} cm by ${w} cm. Its area?`, ...opts(r, l * w, [2 * (l + w), l * w + l, (l + w) * 2 + 2], v => fmt(v) + ' sq cm'), why: `Area = length × breadth = ${l} × ${w} = ${l * w} sq cm.` }; },
  (r, s) => { const t = pick(r, [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20]]); return { q: `A right triangle has legs ${t[0]} and ${t[1]}. The longest side is?`, ...opts(r, t[2], [t[0] + t[1], t[2] + 1, t[1] + 1]), why: `${t[0]}² + ${t[1]}² = ${t[0] ** 2 + t[1] ** 2} = ${t[2]}².` }; },
  (r, s) => { const rr = pick(r, [7, 14, 21, 3.5, 28]); const v = 22 / 7 * rr * rr; return { q: `Area of a circle of radius ${rr} cm? (Take π = 22/7)`, ...opts(r, v, [2 * 22 / 7 * rr, v / 2, v + 22], x => fmt(+x.toFixed(1)) + ' sq cm'), why: `πr² = 22/7 × ${rr} × ${rr} = ${fmt(+v.toFixed(1))} sq cm.` }; },
  (r, s) => { const a = int(r, 30, 80), b = int(r, 30, 150 - a - 10); return { q: `Two angles of a triangle are ${a}° and ${b}°. The third angle?`, ...opts(r, 180 - a - b, [360 - a - b, 90 - a + b > 0 ? 90 - a + b : 45, 180 - a], v => v + '°'), why: `Angles in a triangle add up to 180°: 180 − ${a} − ${b} = ${180 - a - b}°.` }; },
  (r, s) => { const e = int(r, 2, 9 + 3 * s); return { q: `Volume of a cube with side ${e} cm?`, ...opts(r, e ** 3, [e ** 2 * 6, e ** 2, e * 12], v => fmt(v) + ' cu cm'), why: `Side³ = ${e}³ = ${e ** 3} cu cm.` }; },
  (r, s) => { const a = int(r, 2, 12) * pick(r, [2, 3, 4]), b = int(r, 2, 12) * pick(r, [2, 3, 5]); const g = gcd(a, b); return { q: `What is the HCF of ${a} and ${b}?`, ...opts(r, g, [a * b / g, g * 2, Math.min(a, b)]), why: `The biggest number that divides both ${a} and ${b} is ${g}.` }; },
  (r, s) => { const a = int(r, 2, 12), b = int(r, 2, 15); const l = a * b / gcd(a, b); return { q: `What is the LCM of ${a} and ${b}?`, ...opts(r, l, [a * b === l ? l * 2 : a * b, gcd(a, b), l + a]), why: `The smallest number both divide into: ${l}.` }; },
  (r, s) => { const n = int(r, 4, 6), base = int(r, 10, 40 + 30 * s), xs = Array.from({ length: n }, () => base + int(r, -9, 9)); const sum = xs.reduce((a, b) => a + b, 0), avg = sum / n; if (!Number.isInteger(avg)) xs[0] += n - (sum % n); const s2 = xs.reduce((a, b) => a + b, 0); return { q: `Average of ${xs.join(', ')}?`, ...opts(r, s2 / n, [s2 / (n - 1), s2 / n + 1, Math.max(...xs)]), why: `Add them: ${s2}. Divide by ${n}: ${s2 / n}.` }; },
  (r, s) => { const n = int(r, 100, 999 + 9000 * s), d = pick(r, [3, 4, 9, 11, 6]); const yes = n % d === 0; return { q: `Is ${n} divisible by ${d}?`, o: ['Yes', 'No', 'Only if it is even', 'Cannot tell'], a: yes ? 0 : 1, why: `${n} ÷ ${d} = ${Math.floor(n / d)} remainder ${n % d}, so ${yes ? 'yes' : 'no'}.` }; },
  (r, s) => { const p = int(r, 2, 6), f = p * int(r, 2, 5); return { q: `A bag has ${p} red and ${f - p} blue balls. Chance of picking red?`, ...(() => { const g = gcd(p, f), right = `${p / g}/${f / g}`, wr = [...new Set([`${f - p}/${f}`, `${p}/${f - p}`, `1/${p}`, `${p}/${f + p}`, `2/${f}`])].filter(w => w !== right).slice(0, 3); const all = shuffle(r, [right, ...wr]); return { o: all, a: all.indexOf(right) }; })(), why: `${p} red out of ${f} balls: ${p}/${f}.` }; },
  (r, s) => { const a = int(r, 1, 6), b = int(r, a + 1, 9); return { q: `Roots of x² − ${a + b}x + ${a * b} = 0?`, ...(() => { const right = `${a} and ${b}`, all = shuffle(r, [right, `−${a} and −${b}`, `${a + b} and ${a * b}`, `${a} and −${b}`]); return { o: all, a: all.indexOf(right) }; })(), why: `${a} + ${b} = ${a + b} and ${a} × ${b} = ${a * b}, so (x − ${a})(x − ${b}) = 0.` }; },
  (r, s) => { const sp = int(r, 3, 12) * 10, t = pick(r, [1.5, 2, 2.5, 3, 4]); return { q: `A car goes at ${sp} km/h for ${t} hours. How far?`, ...opts(r, sp * t, [sp + t, sp * t + sp, sp / t], v => fmt(v) + ' km'), why: `Distance = speed × time = ${sp} × ${t} = ${fmt(sp * t)} km.` }; },
];
const BANDS = [[0, 5], [5, 10], [10, 15], [15, 20], [20, 25], [25, 27]];
function mathsQ(r, level, cls, diff) {
  const band = Math.min(5, Math.floor((level - 1) / 5)), [lo, hi] = BANDS[band];
  const s = Math.max(0, Math.min(3, diff + (cls - 6) / 2 + (level % 5) / 5));
  const pool = band === 5 ? MATHS : MATHS.slice(lo, hi);
  return pick(r, pool)(r, s);
}

// ---------------- Money basics ----------------
const MONEY_GEN = [
  (r) => { const p = int(r, 12, 480), paid = [100, 200, 500].find(x => x > p) || 500; return { q: `Something costs ₹${p}. You pay ₹${paid}. Change?`, ...opts(r, paid - p, [paid - p + 10, p, paid - p - 10]), why: `₹${paid} − ₹${p} = ₹${paid - p}.` }; },
  (r) => { const a = int(r, 2, 5), pa = a * int(r, 20, 60), b = a * 2, pb = Math.round(pa * 2 * (r() < .5 ? .9 : 1.1)); const ua = pa / a, ub = pb / b; return { q: `${a} packets cost ₹${pa}, or ${b} packets cost ₹${pb}. Which is cheaper per packet?`, o: [`${a} for ₹${pa}`, `${b} for ₹${pb}`, 'Same price', 'Cannot tell'], a: ua < ub ? 0 : 1, why: `Per packet: ₹${fmt(ua)} vs ₹${fmt(ub)}.` }; },
  (r) => { const d = int(r, 50, 400), days = 30; return { q: `You spend ₹${d} a day on snacks. About how much in ${days} days?`, ...opts(r, d * days, [d * 7, d * 12, d * days / 2]), why: `₹${d} × ${days} = ₹${fmt(d * days)}.` }; },
  (r) => { const inc = int(r, 2, 10) * 1000, p = pick(r, [10, 20, 25]); return { q: `You earn ₹${fmt(inc)} a month and save ${p}%. How much do you save?`, ...opts(r, inc * p / 100, [p * 100, inc - inc * p / 100, inc * p / 10]), why: `${p}% of ₹${fmt(inc)} = ₹${fmt(inc * p / 100)}.` }; },
  (r) => { const P = int(r, 1, 10) * 1000, R = pick(r, [5, 6, 7, 8, 10]); const v = P * Math.pow(1 + R / 100, 2); return { q: `₹${fmt(P)} grows at ${R}% a year, compounded yearly. After 2 years?`, ...opts(r, v, [P + 2 * P * R / 100, P * (1 + R / 100), v + 100], x => '₹' + fmt(+x.toFixed(2))), why: `₹${fmt(P)} × ${1 + R / 100} × ${1 + R / 100} = ₹${fmt(+v.toFixed(2))}. Interest earns interest.` }; },
];
const MONEY_FACTS = [
  ['Someone calls saying they\'re from your bank and asks for your OTP. You should:', ['Share it quickly', 'Never share it and hang up', 'Share half of it', 'Text it instead'], 1, 'Banks never ask for your OTP, PIN or password. Anyone who asks is a scammer.'],
  ['What is a "need"?', ['Something you must have to live, like food', 'Anything you want badly', 'Anything on sale', 'A gift'], 0, 'Needs are things like food, rent and school fees. Wants are nice-to-haves.'],
  ['Which is a "want"?', ['School fees', 'Groceries', 'A new video game', 'Electricity bill'], 2, 'You can live without a new game; it\'s a want.'],
  ['Money kept in a savings account usually:', ['Earns a little interest', 'Disappears after a year', 'Is spent by the bank', 'Pays no interest ever'], 0, 'Savings accounts pay some interest on your balance.'],
  ['What does UPI let you do?', ['Send money from your phone instantly', 'Print money', 'Borrow without paying back', 'Buy shares only'], 0, 'UPI moves money between bank accounts from a phone.'],
  ['Your UPI PIN is needed to:', ['Receive money', 'Send money', 'Check the time', 'Open the app store'], 1, 'You only enter your PIN to send money. If someone says you need it to receive money, it\'s a scam.'],
  ['Inflation means:', ['Prices rising over time', 'Prices always falling', 'Your bank closing', 'A kind of tax'], 0, 'With inflation, the same money buys a bit less each year.'],
  ['A budget is:', ['A plan for how you\'ll use your money', 'A type of loan', 'A bank fee', 'A list of shops'], 0, 'A budget plans income and spending before you spend.'],
  ['An emergency fund is money kept for:', ['Surprise costs like a repair or doctor', 'Shopping sales', 'Lending to friends', 'Buying shares'], 0, 'It covers surprises so you don\'t have to borrow.'],
  ['Interest on a loan is:', ['Extra money you pay for borrowing', 'A discount', 'Free money', 'A tax refund'], 0, 'Borrowing costs money: that cost is interest.'],
  ['If a deal says "earn double in a week, guaranteed", it is most likely:', ['A scam', 'A safe bank product', 'A government scheme', 'Normal'], 0, 'Real investments don\'t guarantee huge quick returns.'],
  ['What is the Nifty 50?', ['A list of 50 big Indian companies', 'A bank', 'A coin', 'A tax'], 0, 'It tracks 50 large companies on the National Stock Exchange.'],
  ['Spreading your money across different things is called:', ['Diversifying', 'Gambling', 'Borrowing', 'Inflating'], 0, 'Not putting all your eggs in one basket lowers the risk.'],
  ['A receipt is useful because it:', ['Proves what you paid', 'Gives free money', 'Is a coupon', 'Lowers taxes always'], 0, 'Keep it for returns, repairs and tracking spending.'],
  ['Which pays you money over time?', ['Savings with interest', 'A credit card bill', 'A loan', 'A late fee'], 0, 'Interest on savings pays you; loans and bills cost you.'],
  ['Paying only the minimum on a credit card bill means:', ['Interest piles up on the rest', 'The rest is forgiven', 'You get a reward', 'Nothing happens'], 0, 'Card interest is high; pay the full bill when you can.'],
];

const MONEY_FACT_BANK = MONEY_FACTS.map(f => [1, ...f]);

// ---------------- English ----------------
// [tier, question, options, answer, why]; tier 0 easy, 1 medium, 2 hard
const ENGLISH = [
  [0, 'Pick the word that means the same as "happy".', ['Glad', 'Angry', 'Tired', 'Late'], 0, '"Glad" means happy.'],
  [0, 'Pick the opposite of "early".', ['Late', 'Soon', 'First', 'Quick'], 0, 'Early and late are opposites.'],
  [0, 'She ___ to school every day.', ['go', 'goes', 'going', 'gone'], 1, 'With "she", the present tense takes -es: goes.'],
  [0, 'Pick the correct spelling.', ['Recieve', 'Receive', 'Receeve', 'Riceive'], 1, '"i before e, except after c": receive.'],
  [0, 'I have ___ apple.', ['a', 'an', 'the a', 'some a'], 1, 'Use "an" before a vowel sound: an apple.'],
  [0, 'The cat is hiding ___ the table.', ['under', 'on top', 'between', 'among'], 0, '"Under the table" means below it.'],
  [0, 'Plural of "child"?', ['Childs', 'Children', 'Childes', 'Childrens'], 1, '"Child" has an irregular plural: children.'],
  [0, 'Pick the noun: "The dog barked loudly."', ['barked', 'loudly', 'dog', 'the'], 2, 'A noun names a thing: dog.'],
  [0, 'Opposite of "brave"?', ['Bold', 'Cowardly', 'Strong', 'Kind'], 1, 'Brave and cowardly are opposites.'],
  [0, 'Yesterday we ___ a film.', ['watch', 'watches', 'watched', 'watching'], 2, '"Yesterday" needs the past tense: watched.'],
  [0, 'Pick the word that means "very big".', ['Tiny', 'Huge', 'Thin', 'Weak'], 1, '"Huge" means very big.'],
  [0, 'Which is a question?', ['I like tea.', 'Do you like tea?', 'Tea is hot.', 'Pass the tea.'], 1, 'A question asks something and ends with "?".'],
  [1, '"Rapid" means:', ['Slow', 'Fast', 'Loud', 'Calm'], 1, '"Rapid" means fast.'],
  [1, 'Opposite of "ancient"?', ['Old', 'Modern', 'Broken', 'Famous'], 1, 'Ancient means very old; modern is the opposite.'],
  [1, 'Neither of the boys ___ ready.', ['are', 'is', 'were', 'be'], 1, '"Neither" takes a singular verb: is.'],
  [1, 'Pick the correct spelling.', ['Necessary', 'Neccessary', 'Necesary', 'Neccesary'], 0, 'One c, double s: necessary.'],
  [1, 'She is good ___ maths.', ['in', 'at', 'on', 'for'], 1, 'We say "good at" a subject or skill.'],
  [1, 'Pick the adverb: "He ran quickly to the bus."', ['ran', 'quickly', 'bus', 'He'], 1, 'An adverb describes how: quickly.'],
  [1, '"Fragile" means:', ['Easily broken', 'Very heavy', 'Bright', 'Expensive'], 0, 'Fragile things break easily.'],
  [1, 'I have lived here ___ 2020.', ['for', 'since', 'from', 'by'], 1, 'Use "since" with a point in time: since 2020.'],
  [1, '"Once in a blue moon" means:', ['Very rarely', 'Every night', 'At midnight', 'Quickly'], 0, 'It means something happens very rarely.'],
  [1, 'Passive form of "The chef cooked the meal":', ['The meal cooked the chef.', 'The meal was cooked by the chef.', 'The chef was cooking.', 'The meal is cooking.'], 1, 'Passive puts the object first: the meal was cooked by the chef.'],
  [1, 'Opposite of "generous"?', ['Kind', 'Selfish', 'Rich', 'Wise'], 1, 'Generous people share; selfish people don\'t.'],
  [1, 'Pick the correct sentence.', ['Its raining.', 'It\'s raining.', 'Its\' raining.', 'It raining.'], 1, '"It\'s" is short for "it is".'],
  [2, '"Ubiquitous" means:', ['Rare', 'Found everywhere', 'Very old', 'Dangerous'], 1, 'Ubiquitous things seem to be everywhere.'],
  [2, '"Ambiguous" means:', ['Clear', 'Open to more than one meaning', 'Angry', 'Ambitious'], 1, 'An ambiguous sentence can be read in more than one way.'],
  [2, 'If I ___ you, I would apologise.', ['am', 'was', 'were', 'be'], 2, 'For imagined situations we use "were": if I were you.'],
  [2, 'Pick the correct spelling.', ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'], 2, 'Double c, double m: accommodate.'],
  [2, '"To burn the midnight oil" means:', ['To work late into the night', 'To waste money', 'To start a fire', 'To sleep early'], 0, 'It means working or studying late.'],
  [2, 'Opposite of "scarce"?', ['Rare', 'Plentiful', 'Small', 'Hidden'], 1, 'Scarce means not enough; plentiful means more than enough.'],
  [2, 'Pick the word closest to "meticulous".', ['Careless', 'Very careful', 'Quick', 'Loud'], 1, 'Meticulous means paying great attention to detail.'],
  [2, 'He apologised, ___ she did not forgive him.', ['so', 'but', 'because', 'and so'], 1, '"But" shows contrast.'],
  [2, 'Reported speech: She said, "I am tired."', ['She said that she was tired.', 'She said that I am tired.', 'She says she is tired.', 'She said I was tired.'], 0, 'In reported speech, "am" usually shifts back to "was".'],
  [2, '"Benevolent" means:', ['Kind and generous', 'Cruel', 'Lazy', 'Noisy'], 0, 'Benevolent means well-meaning and kind.'],
  [2, 'Which word is spelt correctly?', ['Embarass', 'Embarrass', 'Embaras', 'Emberrass'], 1, 'Double r and double s: embarrass.'],
  [2, 'Pick the sentence with correct punctuation.', ['However I disagree.', 'However, I disagree.', 'However; I disagree.', 'However: I disagree.'], 1, 'Put a comma after an introductory "however".'],
];

// ---------------- Digital skills ----------------
const DIGITAL = [
  [0, 'Which password is strongest?', ['123456', 'password', 'Tiger!Lamp7Rain', 'yourname2010'], 2, 'Long, mixed and not a real word or your name.'],
  [0, 'An email says you won a prize; click a link and enter your bank details. It\'s most likely:', ['Phishing (a scam)', 'Real', 'From your school', 'A virus scan'], 0, 'Real prizes don\'t ask for bank details through a link.'],
  [0, 'Ctrl + C (Cmd + C on Mac) does what?', ['Copy', 'Close', 'Cut', 'Colour'], 0, 'Ctrl + C copies; Ctrl + V pastes.'],
  [0, 'A web browser is:', ['An app for visiting websites', 'A type of virus', 'A keyboard', 'A printer'], 0, 'Chrome, Safari and Firefox are browsers.'],
  [0, 'What should you never share online?', ['Your passwords', 'A drawing you made', 'Your favourite colour', 'A book you liked'], 0, 'Passwords are private, even with friends.'],
  [0, 'The padlock and "https" in a web address mean:', ['The connection is encrypted', 'The site is always safe and honest', 'The site is free', 'The site is government-owned'], 0, 'HTTPS encrypts the connection. A scam site can still have it, so check the address too.'],
  [0, 'A file ending in .jpg is usually:', ['A photo', 'A song', 'A spreadsheet', 'A program'], 0, '.jpg is an image format.'],
  [0, 'Before using a public computer, it\'s smart to:', ['Log out of your accounts when done', 'Save your password in it', 'Leave your email open', 'Share your OTP'], 0, 'Always log out so the next person can\'t get in.'],
  [1, 'Two-factor authentication means:', ['A second check, like a code, besides your password', 'Two passwords that are the same', 'Logging in twice', 'Two people sharing an account'], 0, 'Even if your password leaks, the code keeps you safe.'],
  [1, 'In a spreadsheet, =SUM(A1:A5) does what?', ['Adds the numbers in A1 to A5', 'Counts the cells', 'Finds the biggest number', 'Deletes the cells'], 0, 'SUM adds up a range of cells.'],
  [1, 'A backup is:', ['A copy of your files kept somewhere else', 'A slow internet connection', 'A broken file', 'A kind of password'], 0, 'If your device is lost, a backup saves your files.'],
  [1, 'Cloud storage means your files are:', ['Stored on internet servers you can reach from any device', 'Stored only on a USB stick', 'Deleted after a day', 'Printed'], 0, 'Like Google Drive or iCloud.'],
  [1, 'A message from a "friend" asks you to urgently send money by UPI. You should:', ['Call them on their known number to check', 'Send it at once', 'Share your PIN', 'Reply with your OTP'], 0, 'Accounts get hacked. Check through another channel.'],
  [1, 'A file ending in .pdf is usually:', ['A document', 'A video', 'A game', 'A font'], 0, 'PDF keeps a document looking the same everywhere.'],
  [1, 'Software updates are important because they:', ['Fix security holes', 'Always make the phone slower', 'Delete your photos', 'Cost money every time'], 0, 'Updates often patch security problems.'],
  [1, 'Your "digital footprint" is:', ['The trail of things you post and do online', 'A fingerprint scanner', 'Your screen size', 'A shoe size app'], 0, 'Posts and searches can stay online for a long time.'],
  [1, 'Ctrl + Z (Cmd + Z on Mac) usually:', ['Undoes the last action', 'Zooms in', 'Saves', 'Closes the window'], 0, 'Undo is Ctrl + Z.'],
  [1, 'A strong habit for passwords is:', ['A different password for each important account', 'One password everywhere', 'Writing it on your screen', 'Sharing it with classmates'], 0, 'If one site leaks, your other accounts stay safe.'],
  [2, 'In a spreadsheet, a cell reference like $A$1:', ['Stays fixed when the formula is copied', 'Means money', 'Is an error', 'Hides the cell'], 0, 'The $ signs lock the reference.'],
  [2, 'A URL "paytm-support-help.xyz" asks you to log in. The safest move is:', ['Don\'t log in; open the official app or site yourself', 'Log in quickly', 'Share it with friends', 'Enter your PIN to check'], 0, 'Look-alike addresses are a common trick.'],
  [2, 'What does "encryption" do?', ['Scrambles data so only the right person can read it', 'Deletes data', 'Speeds up Wi-Fi', 'Prints data'], 0, 'Encrypted data looks like nonsense without the key.'],
  [2, 'An AI chatbot gives you a fact for homework. You should:', ['Check it against a trusted source', 'Copy it without checking', 'Assume it\'s always right', 'Never use any source'], 0, 'AI can sound confident and still be wrong.'],
  [2, 'Public Wi-Fi at a café is risky for:', ['Logging into your bank on sites without HTTPS', 'Reading the news', 'Checking the weather', 'Looking at maps'], 0, 'On open networks, avoid sensitive logins unless the connection is encrypted.'],
  [2, 'Open-source software means:', ['Its code is public for anyone to read and improve', 'It has no code', 'It is always paid', 'It only runs at night'], 0, 'Like the apps on OpenSource Everything.'],
];

const tierFor = (level, diff) => Math.min(2, Math.floor((level - 1) / 10) + diff);
function bankQ(r, bank, level, diff, used) {
  const t = tierFor(level, diff), fresh = bank.filter((x, i) => !used.has(bank === ENGLISH ? 'e' + i : bank === DIGITAL ? 'd' + i : 'm' + i));
  const pool = fresh.filter(x => x[0] <= t && x[0] >= t - 1), src = pool.length ? pool : fresh.length ? fresh : bank;
  const it = pick(r, src), i0 = bank.indexOf(it); used.add(bank === ENGLISH ? 'e' + i0 : bank === DIGITAL ? 'd' + i0 : 'm' + i0);
  const order = shuffle(r, [0, 1, 2, 3]); return { q: it[1], o: order.map(i => it[2][i]), a: order.indexOf(it[3]), why: it[4] };
}
function moneyQ(r, level, diff, used) {
  if (r() < .5) { const s = { ...pick(r, MONEY_GEN)(r) }; return s; }
  return bankQ(r, MONEY_FACT_BANK, 1, 1, used);
}

// a round: the questions for one level, rebuilt from its seed
export function buildRound({ course, cls, diff, level, seed }) {
  const r = rng(seed), used = new Set(), qs = [];
  for (let i = 0; i < PER_LEVEL; i++) {
    let q;
    if (course === 'maths') q = mathsQ(r, level, cls, diff);
    else if (course === 'english') q = bankQ(r, ENGLISH, level, diff, used);
    else if (course === 'money') q = moneyQ(r, level, diff, used);
    else q = bankQ(r, DIGITAL, level, diff, used);
    if (qs.some(x => x.q === q.q)) { i--; if (qs.length > 40) break; continue; }
    qs.push(q);
  }
  return qs;
}
export const isBoss = level => level % BOSS_EVERY === 0;
export const RANKS = [[0, 'Bronze'], [500, 'Silver'], [1500, 'Gold'], [3500, 'Diamond'], [7000, 'Champion']];
export const rankOf = xp => RANKS.filter(([min]) => xp >= min).pop()[1];

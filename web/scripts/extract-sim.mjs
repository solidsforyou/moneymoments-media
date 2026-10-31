// Pulls the simulator's market data (real daily closes since 2007, delta-encoded) and its
// big-day notes out of the preview, into public/data/sim.json for the GoodHabit simulator.
//   node scripts/extract-sim.mjs ../app-kit/design/opensource-everything-preview.html
import fs from 'node:fs';
const L = fs.readFileSync(process.argv[2], 'utf8').split('\n');
const a = L.findIndex(l => l.startsWith('const SIMDATA')), b = L.findIndex(l => l.startsWith('const SIMEV'));
let e = b; while (!L[e].startsWith('};')) e++;
const code = L[a] + '\n' + L.slice(b, e + 1).join('\n') + '\nreturn { data: SIMDATA, events: SIMEV };';
const out = new Function(code)();
fs.writeFileSync('public/data/sim.json', JSON.stringify(out));
console.log('instruments:', out.data.s.map(x => x[0]).join(', '), '| events:', Object.keys(out.events).length, '| bytes:', fs.statSync('public/data/sim.json').size);

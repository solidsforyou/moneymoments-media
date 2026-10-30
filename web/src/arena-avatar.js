// Arena players: an original, simple character built from six choices (the server keeps
// the same six numbers). Extras unlock as you clear levels.
const SKIN = ['#FFE0C2', '#F5C7A0', '#E0A47A', '#C68456', '#9C6440', '#6E4630'];
const HAIRC = ['#1E1A1A', '#4A2E1C', '#8A5A2B', '#D9A441', '#B23A48', '#3B5BDB'];
const SHIRT = ['#6A3DF0', '#1B4DFF', '#0B7A3B', '#E8590C', '#C2255C', '#0E7C86', '#343A40', '#F2B705'];
export const AV = { skin: SKIN.length, eyes: 4, hair: 6, hairColor: HAIRC.length, shirt: SHIRT.length, extra: 6 };
export const LABELS = { skin: 'Skin', eyes: 'Eyes', hair: 'Hair', hairColor: 'Hair colour', shirt: 'Kit', extra: 'Extra' };
export const EXTRAS = ['None', 'Glasses', 'Cap', 'Headband', 'Headphones', 'Crown'];
export const EXTRA_UNLOCK = [0, 3, 8, 15, 25, 40];   // levels cleared, across every course
export const SWATCH = { skin: SKIN, hairColor: HAIRC, shirt: SHIRT };

const HAIR = [
  c => `<path d="M33 50c0-18 12-28 27-28s27 10 27 28c-6-8-16-12-27-12s-21 4-27 12z" fill="${c}"/>`,
  c => `<path d="M32 50l4-20 8 8 6-14 10 10 10-10 6 14 8-8 4 20c-7-7-17-11-28-11s-21 4-28 11z" fill="${c}"/>`,
  c => `<path d="M31 84V48c0-17 13-27 29-27s29 10 29 27v36l-8-4V50c-6-7-14-10-21-10s-15 3-21 10v30z" fill="${c}"/>`,
  c => `<circle cx="60" cy="16" r="10" fill="${c}"/><path d="M33 50c0-18 12-27 27-27s27 9 27 27c-6-7-16-11-27-11s-21 4-27 11z" fill="${c}"/>`,
  c => `<g fill="${c}"><circle cx="38" cy="40" r="9"/><circle cx="50" cy="30" r="10"/><circle cx="64" cy="28" r="10"/><circle cx="77" cy="34" r="9"/><circle cx="84" cy="46" r="7"/><circle cx="34" cy="50" r="6"/></g>`,
  () => '',
];
const EYES = [
  `<circle cx="50" cy="56" r="3.6" fill="#1A1A1A"/><circle cx="70" cy="56" r="3.6" fill="#1A1A1A"/>`,
  `<ellipse cx="50" cy="56" rx="5.5" ry="6.5" fill="#FFFFFF"/><ellipse cx="70" cy="56" rx="5.5" ry="6.5" fill="#FFFFFF"/><circle cx="51" cy="57" r="3.2" fill="#1A1A1A"/><circle cx="71" cy="57" r="3.2" fill="#1A1A1A"/>`,
  `<path d="M45 57q5-5 10 0M65 57q5-5 10 0" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  `<circle cx="50" cy="57" r="3.4" fill="#1A1A1A"/><circle cx="70" cy="57" r="3.4" fill="#1A1A1A"/><path d="M44 48l11 3M76 48l-11 3" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>`,
];
const EXTRA = [
  () => '',
  () => `<g fill="none" stroke="#1A1A1A" stroke-width="2.6"><circle cx="50" cy="56" r="8"/><circle cx="70" cy="56" r="8"/><path d="M58 56h4M42 54l-8-2M78 54l8-2"/></g>`,
  s => `<path d="M32 44c0-14 12-22 28-22s28 8 28 22z" fill="${s}"/><path d="M60 44h34q0 6-8 6H60z" fill="${s}"/>`,
  s => `<rect x="33" y="38" width="54" height="7" rx="3.5" fill="${s}"/>`,
  () => `<path d="M34 56c0-18 12-30 26-30s26 12 26 30" stroke="#2B2B33" stroke-width="5" fill="none"/><rect x="28" y="50" width="10" height="16" rx="5" fill="#2B2B33"/><rect x="82" y="50" width="10" height="16" rx="5" fill="#2B2B33"/>`,
  () => `<path d="M40 30l6-14 7 10 7-14 7 14 7-10 6 14z" fill="#FFC83D" stroke="#C99200" stroke-width="1.5"/>`,
];

export function avatarSvg(a = {}, label = 'Player') {
  const g = k => Math.max(0, Math.min(AV[k] - 1, a[k] | 0));
  const skin = SKIN[g('skin')], hc = HAIRC[g('hairColor')], shirt = SHIRT[g('shirt')], h = g('hair');
  return `<svg viewBox="0 0 120 120" role="img" aria-label="${label}">
    ${h === 2 ? HAIR[2](hc) : ''}
    <path d="M24 120c2-22 16-34 36-34s34 12 36 34z" fill="${shirt}"/><path d="M52 86h16l-8 12z" fill="${skin}"/>
    <rect x="53" y="74" width="14" height="14" rx="5" fill="${skin}"/>
    <circle cx="60" cy="54" r="27" fill="${skin}"/>
    ${h === 2 ? '' : HAIR[h](hc)}
    ${EYES[g('eyes')]}
    <path d="M52 67q8 6 16 0" stroke="#1A1A1A" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${EXTRA[g('extra')](shirt)}
  </svg>`;
}

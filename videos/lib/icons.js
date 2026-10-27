// Line icons in the Unicorn ka Hisab style: 64x64, round 4 px strokes, amber by default.
// Rule (founder, 27 Oct 2026): less text, more visuals; every word on screen has a meaningful
// visual next to it. Use Icons.svg(name, size, color) and add new icons here, named by meaning.

const Icons = (() => {
  const P = {
    // money and finance
    moneybag: '<path d="M24 14h16l-4 8h-8z"/><path d="M28 22c-12 6-16 16-16 24 0 8 8 10 20 10s20-2 20-10c0-8-4-18-16-24"/><path d="M27 34h10M27 40h10M31 34c6 0 6 6 0 6l6 8"/>',
    rupee: '<circle cx="32" cy="32" r="24"/><path d="M24 22h16M24 30h16M28 22c8 0 8 8 0 8h-4l12 12"/>',
    cheque: '<rect x="6" y="18" width="52" height="28" rx="4"/><path d="M14 28h18M14 36h10M40 38c4-6 6 4 10-2"/>',
    bank: '<path d="M8 26l24-14 24 14z"/><path d="M14 30v18M26 30v18M38 30v18M50 30v18M8 52h48"/>',
    percent: '<circle cx="20" cy="20" r="7"/><circle cx="44" cy="44" r="7"/><path d="M48 14L16 50"/>',
    chartUp: '<path d="M8 52h48"/><path d="M12 44l12-12 10 8 18-20"/><path d="M42 20h10v10"/>',
    chartDown: '<path d="M8 52h48"/><path d="M12 18l12 12 10-8 18 20"/><path d="M42 44h10V34"/>',
    calendar: '<rect x="10" y="14" width="44" height="40" rx="5"/><path d="M10 26h44M22 8v10M42 8v10"/>',
    clock: '<circle cx="32" cy="32" r="22"/><path d="M32 18v14l10 6"/>',
    key: '<circle cx="20" cy="32" r="10"/><path d="M30 32h26M48 32v8M54 32v6"/>',
    home: '<path d="M10 30L32 12l22 18"/><path d="M16 26v26h32V26"/><path d="M27 52V38h10v14"/>',
    brake: '<circle cx="32" cy="32" r="22"/><path d="M20 32h24"/><path d="M32 10v4M32 50v4"/>',
    // business
    factory: '<path d="M8 52V30l12 8v-8l12 8v-8l12 8V14h10v38z"/><path d="M8 52h48"/>',
    shop: '<path d="M10 24l4-12h36l4 12"/><path d="M10 24c0 6 10 6 10 0 0 6 12 6 12 0 0 6 12 6 12 0 0 6 10 6 10 0"/><path d="M14 30v22h36V30"/><path d="M26 52V40h12v12"/>',
    phone: '<rect x="20" y="8" width="24" height="48" rx="5"/><path d="M29 49h6"/>',
    person: '<circle cx="32" cy="20" r="9"/><path d="M14 54c0-10 8-18 18-18s18 8 18 18"/>',
    megaphone: '<path d="M10 28v10h8l22 12V16L18 28z"/><path d="M18 38l4 12h6l-3-11"/><path d="M48 26c4 4 4 10 0 14"/>',
    eye: '<path d="M6 32c8-12 16-18 26-18s18 6 26 18c-8 12-16 18-26 18S14 44 6 32z"/><circle cx="32" cy="32" r="8"/>',
    bag: '<path d="M14 22h36l-3 32H17z"/><path d="M24 22v-4a8 8 0 0116 0v4"/>',
    bags: '<path d="M6 26h26l-2 26H8z"/><path d="M13 26v-3a6 6 0 0112 0v3"/><path d="M32 22h26l-2 30H34"/><path d="M39 22v-3a6 6 0 0112 0v3"/>',
    parcel: '<path d="M10 22l22-10 22 10v22L32 54 10 44z"/><path d="M10 22l22 10 22-10M32 32v22"/>',
    tag: '<path d="M10 32V12h20l24 24-20 20z"/><circle cx="21" cy="22" r="3"/>',
    copy: '<rect x="8" y="16" width="30" height="30" rx="4"/><rect x="18" y="8" width="30" height="30" rx="4"/><rect x="28" y="22" width="30" height="30" rx="4"/>',
    bulb: '<path d="M32 8a16 16 0 00-10 28c3 3 4 6 4 10h12c0-4 1-7 4-10A16 16 0 0032 8z"/><path d="M26 52h12M28 58h8"/>',
    sprout: '<path d="M32 56V30"/><path d="M32 34c0-10-8-14-18-14 0 10 8 14 18 14z"/><path d="M32 30c0-10 8-14 18-14 0 10-8 14-18 14z"/>',
    tree: '<path d="M32 58V36"/><circle cx="32" cy="24" r="16"/><path d="M24 44l8-8 8 8"/>',
    rocket: '<path d="M32 6c10 8 14 20 10 34H22C18 26 22 14 32 6z"/><circle cx="32" cy="24" r="5"/><path d="M22 40l-8 10h12M42 40l8 10H38M28 46l4 10 4-10"/>',
    needle: '<path d="M14 50L50 14"/><circle cx="47" cy="17" r="3"/><path d="M50 14c6 10-6 26-26 30"/>',
    // food and daily life
    bowl: '<path d="M8 30h48c0 14-10 22-24 22S8 44 8 30z"/><path d="M24 22c0-6 6-6 6-12M34 22c0-6 6-6 6-12"/>',
    scooter: '<circle cx="16" cy="46" r="8"/><circle cx="48" cy="46" r="8"/><path d="M16 46h20l8-20h8M44 26l4 20M24 46l4-14h10"/>',
    cart: '<path d="M6 12h8l6 28h30l6-20H16"/><circle cx="24" cy="50" r="4"/><circle cx="46" cy="50" r="4"/>',
    onion: '<path d="M32 10c-2 6-16 12-16 28a16 16 0 0032 0c0-16-14-22-16-28z"/><path d="M32 22c-6 8-6 20 0 30M32 22c6 8 6 20 0 30"/>',
    drop: '<path d="M32 8C24 22 16 30 16 40a16 16 0 0032 0c0-10-8-18-16-32z"/>',
    rain: '<path d="M18 36a10 10 0 010-20 14 14 0 0126-4 10 10 0 012 20z"/><path d="M22 44l-3 8M32 44l-3 8M42 44l-3 8"/>',
    village: '<path d="M6 40l12-10 12 10v14H6z"/><path d="M34 44l10-8 10 8v10H34z"/><path d="M4 56h56"/>',
    city: '<path d="M8 56V24h14v32M22 56V12h16v44M38 56V30h18v26"/><path d="M4 56h56"/>',
    // marks
    up: '<path d="M32 52V14M18 28l14-14 14 14"/>',
    down: '<path d="M32 12v38M18 36l14 14 14-14"/>',
    right: '<path d="M10 32h40M36 18l14 14-14 14"/>',
    left: '<path d="M54 32H14M28 18L14 32l14 14"/>',
    check: '<path d="M12 34l12 12 28-28"/>',
    cross: '<path d="M16 16l32 32M48 16L16 48"/>',
    question: '<path d="M22 24a10 10 0 1114 9c-3 2-4 4-4 8"/><circle cx="32" cy="50" r="2"/>',
  };
  function svg(name, size = 120, color = "#ffb02e", extra = "") {
    return `<svg class="ico" viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 12px ${color}88);${extra}">${P[name]}</svg>`;
  }
  // Fill every element with data-icon="name" (optional data-size, data-color) on load.
  function mount(root = document) {
    root.querySelectorAll("[data-icon]").forEach((el) => {
      el.innerHTML = svg(el.dataset.icon, +(el.dataset.size || 120), el.dataset.color || "#ffb02e") + el.innerHTML;
    });
  }
  return { svg, mount, names: Object.keys(P) };
})();

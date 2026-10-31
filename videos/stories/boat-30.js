// boAt, 30 s cut. Same sources as boat.js. Music: track from 2:16.4 (drop at 6.0 s).
window.STORY = { slug: "boat", section: "C30", theme: { accent: "#ff3b3b", accent2: "#ff9a8a" }, music: { beat: 60 / 97.6, beat0: 0.06, drop: 6.0 },
  scenes: [
    { type: "counter", to: 3.0, label: "boAt's profit, FY25", value: 60, prefix: "₹", suffix: " Cr", color: "accent", at: -0.4, countDur: 1.6 },
    { type: "ring", to: 6.0, text: "after [two years] of losses" },
    { type: "counter", to: 12.0, label: "Revenue, FY25", value: 3070, prefix: "₹", suffix: " Cr", chip: "84% of it from audio", chipAt: 1.8 },
    { type: "line", to: 18.0, light: true, text: "Margin: just [4.6%]", text2: "₹142.5 Cr EBITDA on ₹3,070 Cr", delay2: 0.8 },
    { type: "cards", to: 24.0, title: "The IPO plan (SEBI approved)", cards: [ { kicker: "SIZE", text: "Up to\n₹1,500 Cr" }, { kicker: "NEW MONEY", text: "₹500 Cr" }, { kicker: "OFFER FOR SALE", text: "₹1,000 Cr" } ] },
    { type: "line", to: 27.5, text: "Earbuds made it [famous]." },
    { type: "end", to: 30.0 },
  ] };

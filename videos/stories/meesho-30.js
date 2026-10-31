// Meesho, 30 s cut. Same sources as meesho.js. Music: track from 2:16.4 (drop at 6.0 s).
window.STORY = { slug: "meesho", section: "C30", theme: { accent: "#f43397", accent2: "#ff8ac4" }, music: { beat: 60 / 97.6, beat0: 0.06, drop: 6.0 },
  scenes: [
    { type: "counter", to: 3.0, label: "Meesho on listing day", value: 46, prefix: "+", suffix: "%", format: "plain", color: "accent", at: -0.4, countDur: 1.6 },
    { type: "ring", to: 6.0, text: "while charging sellers [zero] commission" },
    { type: "cards", to: 12.0, title: "Where the money comes from", cards: [ { kicker: "COMMISSION", text: "₹0" }, { kicker: "LOGISTICS", text: "Shipping\nfees" }, { kicker: "ADS", text: "Sellers pay\nto be seen" } ] },
    { type: "counter", to: 18.0, label: "Net loss, Apr–Sep 2025", value: 701, prefix: "₹", suffix: " Cr", color: "red", chip: "down from ₹2,513 Cr a year earlier", chipAt: 1.8 },
    { type: "counter", to: 24.0, light: true, label: "Times oversubscribed at the IPO", value: 79, suffix: "x", format: "plain", color: "accent", chip: "issue ₹111 → opened at ₹162.50", chipAt: 1.8 },
    { type: "line", to: 27.5, text: "Would you sell on [Meesho]?" },
    { type: "end", to: 30.0 },
  ] };

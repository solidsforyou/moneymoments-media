// Urban Company, 30 s cut. Same sources as urbancompany.js. Music: track from 0:38.2 (drop at 6.0 s).
window.STORY = { slug: "urbancompany", section: "A30", theme: { accent: "#7b61ff", accent2: "#b7a8ff" }, music: { beat: 60 / 97.6, beat0: 0.544, drop: 6.0 },
  scenes: [
    { type: "counter", to: 3.0, label: "Urban Company's IPO: times oversubscribed", value: 103, suffix: "x", format: "plain", color: "accent", at: -0.4, countDur: 1.6 },
    { type: "ring", to: 6.0, text: "FY25 profit ₹240 Cr. [But…]" },
    { type: "counter", to: 12.0, light: true, label: "Deferred tax credit inside that profit", value: 211, prefix: "₹", suffix: " Cr", color: "red", chip: "an accounting credit, not cash from customers", chipAt: 1.8 },
    { type: "compare", to: 18.0, title: "Profit: headline vs underlying", bars: [ { label: "Reported", value: 240, text: "₹240 Cr" }, { label: "Without the tax credit", value: 28.5, text: "~₹28.5 Cr", red: true } ], source: "Underlying figure: IndMoney analysis" },
    { type: "line", to: 24.0, kicker: "Apr–Jun 2025", text: "Profit: [₹6.9 Cr]", text2: "on ₹367 Cr revenue, +24%", delay2: 0.8 },
    { type: "line", to: 27.5, light: true, text: "Investors paid for [growth]." },
    { type: "end", to: 30.0 },
  ] };

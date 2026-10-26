// Zerodha, 30 s cut. Same sources as zerodha.js. Music: track from 0:38.2 (drop at 6.0 s).
window.STORY = { slug: "zerodha", section: "A30", theme: { accent: "#3d8bfd", accent2: "#7cc4ff" }, music: { beat: 60 / 97.6, beat0: 0.544, drop: 6.0 },
  scenes: [
    { type: "counter", to: 3.0, label: "Zerodha's profit, FY25", value: 4237, prefix: "₹", suffix: " Cr", color: "accent", at: -0.4, countDur: 1.6 },
    { type: "ring", to: 6.0, text: "with [zero] outside money" },
    { type: "counter", to: 12.0, label: "Revenue, FY25", value: 8847, prefix: "₹", suffix: " Cr", chip: "about ₹48 profit on every ₹100", chipAt: 1.8 },
    { type: "counter", to: 18.0, light: true, label: "Brokerage revenue, Apr–Jun 2025 vs a year earlier", value: 40, prefix: "−", suffix: "%", format: "plain", color: "red", chip: "said CEO Nithin Kamath", chipAt: 1.8, source: "Source: Entrackr" },
    { type: "compare", to: 24.0, title: "Profit fell, but it's still huge", bars: [ { label: "FY24", value: 5496, text: "₹5,496 Cr" }, { label: "FY25", value: 4237, text: "₹4,237 Cr", red: true } ] },
    { type: "line", to: 27.5, text: "No VC. No IPO. Just [profit]." },
    { type: "end", to: 30.0 },
  ] };

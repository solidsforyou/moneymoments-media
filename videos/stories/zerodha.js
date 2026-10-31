// Zerodha. Sources: Entrackr (FY25 consolidated, RoC filings), Entrackr (Q1 FY26 brokerage -40%),
// YourStory (Aug 2026, FY26 profit Rs 4,283 Cr), no external funding (Entrackr / company).
window.STORY = {
  slug: "zerodha", section: "A",
  theme: { accent: "#3d8bfd", accent2: "#7cc4ff" },
  music: { beat: 60 / 97.6, beat0: 0.605, drop: 20.25 },
  scenes: [
    { type: "line", to: 3.07, text: "Zerodha never raised [outside money]." },
    { type: "line", to: 6.15, text: "So how much does it make?" },
    { type: "counter", to: 11.05, label: "Revenue, FY25", value: 8847, prefix: "₹", suffix: " Cr", chip: "down 11.5% from FY24" },
    { type: "counter", to: 15.35, label: "Profit, FY25", value: 4237, prefix: "₹", suffix: " Cr", color: "accent", chip: "about ₹48 profit on every ₹100" },
    { type: "line", to: 18.0, text: "That's a [48%] margin." },
    { type: "ring", to: 20.25, text: "But here's the catch" },
    { type: "counter", to: 28.25, light: true, label: "Brokerage revenue, Apr–Jun 2025 vs a year earlier", value: 40, prefix: "−", suffix: "%", format: "plain", color: "red", chip: "said CEO Nithin Kamath", source: "Source: Entrackr" },
    { type: "cards", to: 35.6, title: "Zerodha's money, FY25", cards: [
      { kicker: "CASH & BANK", text: "₹22,679 Cr" }, { kicker: "SALARIES", text: "₹539 Cr\n(+31%)" }, { kicker: "FUNDING RAISED", text: "₹0" } ] },
    { type: "compare", to: 43.0, title: "Profit fell, but it's still huge", bars: [
      { label: "FY24", value: 5496, text: "₹5,496 Cr" }, { label: "FY25", value: 4237, text: "₹4,237 Cr", red: true } ], source: "Source: Entrackr, RoC filings" },
    { type: "line", to: 51.0, light: true, kicker: "FY26", text: "Profit: [₹4,283 Cr]", text2: "Revenue flat, profit still steady", source: "Source: YourStory, Aug 2026" },
    { type: "line", to: 55.9, text: "No VC. No IPO. Just [profit]." },
    { type: "end", to: 60.0 },
  ],
};

// Urban Company. Sources: 5paisa / Business Standard (listing 17 Sep 2025 at Rs 162.25 NSE vs Rs 103, ~57%,
// 103.63x subscribed), FY25 revenue Rs 1,144.5 Cr (+38%), net profit Rs 239.8 Cr incl. Rs 211.2 Cr deferred
// tax credit (company / IndMoney analysis: ~Rs 28.5 Cr without it), Q1 FY26 profit Rs 6.9 Cr on Rs 367.3 Cr.
window.STORY = {
  slug: "urbancompany", section: "B",
  theme: { accent: "#7b61ff", accent2: "#b7a8ff" },
  music: { beat: 60 / 97.65, beat0: 0.25, drop: 24.0 },
  scenes: [
    { type: "line", to: 3.3, text: "Urban Company's IPO: [103x] oversubscribed." },
    { type: "line", to: 6.4, text: "It listed at a [57%] premium." },
    { type: "counter", to: 12.2, label: "Issue price", value: 103, prefix: "₹", format: "plain", chip: "listed at ₹162.25 on NSE, 17 Sep 2025" },
    { type: "counter", to: 16.5, label: "Revenue, FY25", value: 1144, prefix: "₹", suffix: ".5 Cr", chip: "+38% year on year" },
    { type: "counter", to: 21.2, label: "Net profit, FY25", value: 240, prefix: "₹", suffix: " Cr", color: "accent", chip: "its first full-year profit" },
    { type: "ring", to: 24.0, text: "But read the fine print" },
    { type: "counter", to: 32.0, light: true, label: "Deferred tax credit inside that profit", value: 211, prefix: "₹", suffix: " Cr", color: "red", chip: "an accounting credit, not cash from customers" },
    { type: "compare", to: 39.0, title: "Profit: headline vs underlying", bars: [
      { label: "Reported", value: 240, text: "₹240 Cr" }, { label: "Without the tax credit", value: 28.5, text: "~₹28.5 Cr", red: true } ], source: "Underlying figure: IndMoney analysis" },
    { type: "line", to: 46.0, kicker: "Apr–Jun 2025", text: "Profit: [₹6.9 Cr]", text2: "on ₹367 Cr revenue, +24%" },
    { type: "line", to: 53.0, light: true, text: "Investors paid for [growth]." },
    { type: "line", to: 56.9, text: "Would you buy UC shares?" },
    { type: "end", to: 60.0 },
  ],
};

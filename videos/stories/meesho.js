// Meesho. Sources: Outlook Business (zero commission; revenue from logistics and ads),
// RHP coverage (H1 FY26 revenue Rs 5,577.5 Cr +29%, loss Rs 700.7 Cr vs Rs 2,512.9 Cr),
// Business Today / The Week (listing 10 Dec 2025 at Rs 162.50 vs Rs 111, 46% premium,
// market value ~Rs 77,000 Cr), NSE data via The Week (79x subscribed).
window.STORY = {
  slug: "meesho", section: "B",
  theme: { accent: "#f43397", accent2: "#ff8ac4" },
  music: { beat: 60 / 97.65, beat0: 0.25, drop: 24.0 },
  scenes: [
    { type: "line", to: 3.3, text: "Meesho charges sellers [zero] commission." },
    { type: "line", to: 6.4, text: "So how does it make money?" },
    { type: "cards", to: 12.2, title: "Where the money comes from", cards: [
      { kicker: "COMMISSION", text: "₹0", strike: false }, { kicker: "LOGISTICS", text: "Shipping\nfees" }, { kicker: "ADS", text: "Sellers pay\nto be seen" } ] },
    { type: "counter", to: 16.5, label: "Revenue, Apr–Sep 2025", value: 5578, prefix: "₹", suffix: " Cr", chip: "+29% year on year" },
    { type: "counter", to: 21.2, label: "Net loss, Apr–Sep 2025", value: 701, prefix: "₹", suffix: " Cr", color: "red", chip: "down from ₹2,513 Cr a year earlier" },
    { type: "ring", to: 24.0, text: "Then came the IPO" },
    { type: "counter", to: 32.0, light: true, label: "Listing day, 10 Dec 2025", value: 46, prefix: "+", suffix: "%", format: "plain", color: "accent", chip: "issue ₹111 → opened at ₹162.50" },
    { type: "counter", to: 39.0, label: "Times oversubscribed", value: 79, suffix: "x", format: "plain", chip: "per NSE data" },
    { type: "line", to: 46.0, kicker: "Market value on day one", text: "About [₹77,000 Cr]", source: "Source: PTI via The Week" },
    { type: "line", to: 53.0, light: true, text: "Free for sellers. [Paid] for reach.", text2: "Logistics and ads pay the bills" },
    { type: "line", to: 56.9, text: "Would you sell on Meesho?" },
    { type: "end", to: 60.0 },
  ],
};

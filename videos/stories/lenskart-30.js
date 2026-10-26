// Lenskart, 30 s cut. Same sources as lenskart.js. Music: track from 2:16.4 (drop at 6.0 s).
window.STORY = { slug: "lenskart", section: "C30", theme: { accent: "#00b8c8", accent2: "#7fe6ee" }, music: { beat: 60 / 97.6, beat0: 0.06, drop: 6.0 },
  scenes: [
    { type: "counter", to: 3.0, label: "Lenskart's IPO: times oversubscribed", value: 28, suffix: "x", format: "plain", color: "accent", at: -0.4, countDur: 1.6 },
    { type: "ring", to: 6.0, text: "Then it listed [below] its issue price" },
    { type: "counter", to: 12.0, label: "Listing price, NSE", value: 395, prefix: "₹", format: "plain", color: "red", chip: "issue price ₹402, November 2025", chipAt: 1.8 },
    { type: "counter", to: 18.0, light: true, label: "Price to earnings at the IPO", value: 235, suffix: "x", format: "plain", color: "accent", chip: "estimates ranged 235x–285x", chipAt: 1.8, source: "Global peer EssilorLuxottica: about 50x" },
    { type: "compare", to: 24.0, title: "Profit, with and without the one-off", bars: [ { label: "Reported", value: 297, text: "₹297 Cr" }, { label: "Without one-off", value: 130, text: "~₹130 Cr", red: true } ] },
    { type: "line", to: 27.5, text: "Hype isn't [valuation]." },
    { type: "end", to: 30.0 },
  ] };

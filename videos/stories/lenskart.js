// Lenskart. Sources: Business Standard / HDFC Sky / IANS (listing 10 Nov 2025: NSE Rs 395 vs issue Rs 402,
// close Rs 404.55 NSE; 28x subscribed), Business Standard (FY25 revenue Rs 6,652.5 Cr, profit Rs 297.3 Cr),
// IPO analyses (one-time ~Rs 167 Cr gain; P/E estimates 235x-285x).
window.STORY = {
  slug: "lenskart", section: "A",
  theme: { accent: "#00b8c8", accent2: "#7fe6ee" },
  music: { beat: 60 / 97.6, beat0: 0.605, drop: 20.25 },
  scenes: [
    { type: "line", to: 3.07, text: "Lenskart's IPO: [28x] oversubscribed." },
    { type: "line", to: 6.15, text: "Then it listed [below] its issue price." },
    { type: "counter", to: 11.05, label: "Issue price", value: 402, prefix: "₹", format: "plain", chip: "November 2025" },
    { type: "counter", to: 15.35, label: "Listing price, NSE", value: 395, prefix: "₹", format: "plain", color: "red", chip: "1.7% below issue on day one" },
    { type: "line", to: 18.0, text: "Why?" },
    { type: "ring", to: 20.25, text: "The valuation" },
    { type: "counter", to: 28.25, light: true, label: "Price to earnings at the IPO", value: 235, suffix: "x", format: "plain", color: "accent", chip: "estimates ranged 235x–285x", source: "Global peer EssilorLuxottica: about 50x" },
    { type: "counter", to: 35.6, label: "Profit, FY25", value: 297, prefix: "₹", suffix: " Cr", chip: "about ₹167 Cr was a one-time gain" },
    { type: "compare", to: 43.0, title: "Profit, with and without the one-off", bars: [
      { label: "Reported", value: 297, text: "₹297 Cr" }, { label: "Without one-off", value: 130, text: "~₹130 Cr", red: true } ] },
    { type: "line", to: 51.0, light: true, kicker: "Day one close, NSE", text: "[₹404.55]", text2: "just above the ₹402 issue price" },
    { type: "line", to: 55.9, text: "Hype isn't [valuation]." },
    { type: "end", to: 60.0 },
  ],
};

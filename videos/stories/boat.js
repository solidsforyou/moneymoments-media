// boAt (Imagine Marketing). Sources: Outlook Business / The Week (FY25 net profit Rs 60 Cr after losses of
// Rs 79.7 Cr in FY24 and Rs 129.5 Cr in FY23), updated DRHP coverage (revenue from operations Rs 3,070.38 Cr,
// EBITDA Rs 142.52 Cr, 4.64% margin, audio ~84%, wearables ~11%; IPO up to Rs 1,500 Cr = Rs 500 Cr fresh +
// Rs 1,000 Cr OFS; SEBI approval), founded 2015 by Aman Gupta and Sameer Mehta.
window.STORY = {
  slug: "boat", section: "C",
  theme: { accent: "#ff3b3b", accent2: "#ff9a8a" },
  music: { beat: 60 / 97.6, beat0: 0.06, drop: 6.0 },
  scenes: [
    { type: "line", to: 3.0, text: "boAt lost money [two years] in a row." },
    { type: "ring", to: 6.0, text: "Then FY25 happened" },
    { type: "counter", to: 13.4, label: "Net profit, FY25", value: 60, prefix: "₹", suffix: " Cr", color: "accent", chip: "after a ₹79.7 Cr loss in FY24" },
    { type: "counter", to: 20.8, label: "Revenue, FY25", value: 3070, prefix: "₹", suffix: " Cr", chip: "from its IPO filing" },
    { type: "line", to: 27.4, light: true, text: "Margin: just [4.6%]", text2: "₹142.5 Cr EBITDA on ₹3,070 Cr" },
    { type: "cards", to: 34.8, title: "What boAt sells", cards: [
      { kicker: "AUDIO", text: "84% of\nsales" }, { kicker: "WEARABLES", text: "11%" }, { kicker: "FOUNDED", text: "2015" } ] },
    { type: "cards", to: 45.6, title: "The IPO plan (SEBI approved)", cards: [
      { kicker: "SIZE", text: "Up to\n₹1,500 Cr" }, { kicker: "NEW MONEY", text: "₹500 Cr" }, { kicker: "OFFER FOR SALE", text: "₹1,000 Cr" } ], source: "Source: updated DRHP coverage, Outlook Business" },
    { type: "line", to: 53.4, text: "Earbuds made it [famous].", text2: "Can a 4.6% margin make it rich?" },
    { type: "line", to: 56.9, text: "Would you buy [boAt] shares?" },
    { type: "end", to: 60.0 },
  ],
};

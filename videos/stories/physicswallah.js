// Physics Wallah. Sources: Inc42 (updated DRHP: FY25 revenue Rs 2,886.6 Cr +49% from Rs 1,940.7 Cr,
// net loss Rs 243 Cr vs Rs 1,131 Cr, EBITDA Rs 193.2 Cr, 6.7% margin; IPO Rs 3,820 Cr =
// Rs 3,100 Cr fresh + Rs 720 Cr OFS), Storyboard18 (ad spend Rs 276 Cr in FY25).
window.STORY = {
  slug: "physicswallah", section: "C",
  theme: { accent: "#2ec4b6", accent2: "#8ff0e5" },
  music: { beat: 60 / 97.6, beat0: 0.06, drop: 6.0 },
  scenes: [
    { type: "line", to: 3.0, kicker: "FY24", text: "Physics Wallah lost [₹1,131 Cr]" },
    { type: "ring", to: 6.0, text: "Then this happened" },
    { type: "counter", to: 13.4, label: "Net loss, FY25", value: 243, prefix: "₹", suffix: " Cr", color: "accent", chip: "down from ₹1,131 Cr" },
    { type: "counter", to: 20.8, label: "Revenue, FY25", value: 2887, prefix: "₹", suffix: " Cr", chip: "+49% from ₹1,941 Cr" },
    { type: "line", to: 27.4, light: true, text: "It turned [EBITDA positive]", text2: "₹193 Cr operating profit, a 6.7% margin" },
    { type: "counter", to: 34.8, label: "Spent on ads, FY25", value: 276, prefix: "₹", suffix: " Cr", chip: "Source: Storyboard18" },
    { type: "cards", to: 45.6, title: "The IPO plan", cards: [
      { kicker: "TOTAL ISSUE", text: "₹3,820 Cr" }, { kicker: "FRESH MONEY", text: "₹3,100 Cr" }, { kicker: "FOUNDERS SELL", text: "₹720 Cr" } ], source: "Source: Inc42, DRHP" },
    { type: "line", to: 53.4, text: "Cheap courses. [Huge] scale.", text2: "Can edtech finally make money?" },
    { type: "line", to: 56.9, text: "Is PW the edtech that [works]?" },
    { type: "end", to: 60.0 },
  ],
};

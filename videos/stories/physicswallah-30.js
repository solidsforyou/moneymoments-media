// Physics Wallah, 30 s cut. Same sources as physicswallah.js. Music: track from 0:38.2 (drop at 6.0 s).
window.STORY = { slug: "physicswallah", section: "A30", theme: { accent: "#2ec4b6", accent2: "#8ff0e5" }, music: { beat: 60 / 97.6, beat0: 0.544, drop: 6.0 },
  scenes: [
    { type: "counter", to: 3.0, label: "Physics Wallah's loss, FY24", value: 1131, prefix: "₹", suffix: " Cr", color: "red", at: -0.4, countDur: 1.6 },
    { type: "ring", to: 6.0, text: "Then this happened" },
    { type: "counter", to: 12.0, label: "Net loss, FY25", value: 243, prefix: "₹", suffix: " Cr", color: "accent", chip: "down from ₹1,131 Cr", chipAt: 1.8 },
    { type: "counter", to: 18.0, label: "Revenue, FY25", value: 2887, prefix: "₹", suffix: " Cr", chip: "+49% from ₹1,941 Cr", chipAt: 1.8 },
    { type: "line", to: 24.0, light: true, text: "It turned [EBITDA positive]", text2: "₹193 Cr operating profit, a 6.7% margin", delay2: 0.8 },
    { type: "line", to: 27.5, text: "Is PW the edtech that [works]?" },
    { type: "end", to: 30.0 },
  ] };

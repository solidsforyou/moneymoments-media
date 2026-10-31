// OpenPrep Quant lessons: original, short, each with worked steps and practice questions.
// q: question, o: options, a: index of the right option, why: the explanation.
export const LESSONS = [
  {
    id: 'percent-basics', title: 'Percentages, the fast way', mins: 5,
    cards: [
      'A percent is just "out of 100". 35% of something is 35/100 of it, or 0.35 times it.',
      'Turn percents into fractions you know: 50% = 1/2, 25% = 1/4, 20% = 1/5, 12.5% = 1/8, 33.33% = 1/3, 16.67% = 1/6.',
      'To find 12.5% of 640, don\'t multiply by 0.125. Think "one eighth": 640 ÷ 8 = 80.',
      'Going up by p% means multiplying by (1 + p/100). Going down by p% means multiplying by (1 − p/100). Up 20% is × 1.2; down 15% is × 0.85.',
    ],
    practice: [
      { q: 'What is 16.67% of 492?', o: ['72', '82', '86', '98'], a: 1, why: '16.67% is one sixth. 492 ÷ 6 = 82.' },
      { q: 'A salary of ₹40,000 rises by 15%. What is the new salary?', o: ['₹44,000', '₹45,500', '₹46,000', '₹46,500'], a: 2, why: '40,000 × 1.15 = 46,000.' },
      { q: '45 is what percent of 360?', o: ['8%', '12.5%', '15%', '18%'], a: 1, why: '45/360 = 1/8 = 12.5%.' },
    ],
  },
  {
    id: 'successive', title: 'Successive discounts: 25% then 10% is not 35%', mins: 5,
    cards: [
      'Two changes in a row multiply, they don\'t add. 25% off then 10% off is × 0.75 × 0.9 = × 0.675, which is 32.5% off, not 35%.',
      'Shortcut for two changes a% and b%: the net change is a + b + ab/100. Use minus signs for falls. For −25 and −10: −25 − 10 + 250/100 = −32.5%.',
      'A rise and an equal fall always leave you lower. Up 20% then down 20%: 20 − 20 − 400/100 = −4%.',
      'Worked: a ₹1,200 shirt, 25% off and then 10% off. 1,200 × 0.75 = 900, then 900 × 0.9 = 810. You pay ₹810.',
    ],
    practice: [
      { q: 'A price rises 10% and then another 10%. What is the total rise?', o: ['20%', '21%', '22%', '19%'], a: 1, why: '10 + 10 + 100/100 = 21%. Or 1.1 × 1.1 = 1.21.' },
      { q: 'A phone at ₹20,000 gets 20% off, then 5% off. What do you pay?', o: ['₹15,000', '₹15,200', '₹15,400', '₹16,000'], a: 1, why: '20,000 × 0.8 = 16,000; × 0.95 = 15,200.' },
      { q: 'A share falls 50% and then rises 50%. Overall it is:', o: ['Back where it started', 'Down 25%', 'Up 25%', 'Down 50%'], a: 1, why: '0.5 × 1.5 = 0.75, so it is down 25%.' },
    ],
  },
  {
    id: 'profit-loss', title: 'Profit and loss', mins: 6,
    cards: [
      'Profit percent is always on the cost price: profit % = (selling price − cost price) ÷ cost price × 100.',
      'If a shop marks up by m% and then gives d% off, the selling price is cost × (1 + m/100) × (1 − d/100).',
      'Worked: cost ₹800, marked up 50%, then 20% off. 800 × 1.5 = 1,200; × 0.8 = 960. Profit = 160 on 800 = 20%.',
      'Trick question shape: "cost of 15 items = selling price of 12 items". Then 15 × cost = 12 × price, so price = 1.25 × cost: 25% profit.',
    ],
    practice: [
      { q: 'Bought for ₹250, sold for ₹300. Profit percent?', o: ['16.67%', '20%', '25%', '50%'], a: 1, why: '50 on 250 = 20%.' },
      { q: 'Marked 40% above cost, then sold at 25% off. Result?', o: ['5% profit', '5% loss', '15% profit', 'No profit, no loss'], a: 0, why: '1.4 × 0.75 = 1.05, a 5% profit.' },
      { q: 'Selling 10 pens gives a profit equal to the selling price of 2 pens. Profit percent?', o: ['20%', '25%', '16.67%', '33.33%'], a: 1, why: 'SP of 10 − CP of 10 = SP of 2, so CP of 10 = SP of 8. SP = 10/8 of CP: 25% profit.' },
    ],
  },
  {
    id: 'ratio', title: 'Ratios and mixtures', mins: 6,
    cards: [
      'A ratio 3 : 4 means 3 parts and 4 parts. To split ₹700 in 3 : 4, one part is 700 ÷ 7 = 100, so 300 and 400.',
      'To join A : B = 3 : 4 and B : C = 6 : 5, make B the same in both: 9 : 12 and 12 : 10, so A : B : C = 9 : 12 : 10.',
      'Mixtures: keep the part that doesn\'t change fixed. 40 L of milk and water in 3 : 1 has 30 L milk. To make it 3 : 2, water must be 20 L, so add 10 L.',
    ],
    practice: [
      { q: 'Split ₹1,800 in the ratio 2 : 3 : 4. The largest share is:', o: ['₹600', '₹700', '₹800', '₹900'], a: 2, why: '9 parts, 200 each. 4 × 200 = 800.' },
      { q: 'A : B = 2 : 3 and B : C = 4 : 5. A : C = ?', o: ['8 : 15', '2 : 5', '4 : 5', '6 : 5'], a: 0, why: 'A : B : C = 8 : 12 : 15, so A : C = 8 : 15.' },
      { q: '30 L of juice is 20% sugar syrup. How much water to add to make it 12% syrup?', o: ['15 L', '20 L', '25 L', '18 L'], a: 1, why: 'Syrup = 6 L. 6 is 12% of 50 L, so add 50 − 30 = 20 L.' },
    ],
  },
  {
    id: 'time-work', title: 'Time and work', mins: 6,
    cards: [
      'Think in "work per day". If A finishes a job in 10 days, A does 1/10 of it each day.',
      'Together, rates add: A in 10 days and B in 15 days do 1/10 + 1/15 = 1/6 a day, so 6 days together.',
      'Pipes work the same way. A leak is just a negative rate.',
      'Worked: A (10 days) and B (15 days) work 4 days together, then A leaves. 4 × 1/6 = 2/3 done; B does the last 1/3 at 1/15 a day: 5 more days.',
    ],
    practice: [
      { q: 'A fills a tank in 6 hours; a leak empties it in 12. With both, it fills in:', o: ['8 h', '10 h', '12 h', '18 h'], a: 2, why: '1/6 − 1/12 = 1/12 a hour: 12 hours.' },
      { q: 'A does a job in 12 days, B in 24. Together they take:', o: ['6 days', '8 days', '9 days', '18 days'], a: 1, why: '1/12 + 1/24 = 3/24 = 1/8: 8 days.' },
      { q: '5 people build a wall in 12 days. How long for 6 people at the same pace?', o: ['10 days', '9 days', '14.4 days', '11 days'], a: 0, why: 'Work = 60 person-days. 60 ÷ 6 = 10.' },
    ],
  },
  {
    id: 'speed', title: 'Speed, distance and time', mins: 6,
    cards: [
      'Distance = speed × time. Keep units together: km/h with hours, m/s with seconds.',
      'To change km/h to m/s, multiply by 5/18. 72 km/h = 20 m/s.',
      'A train passing a pole covers its own length. Passing a platform, it covers its length plus the platform\'s.',
      'Late and early: going 4 km/h makes you 10 min late, 5 km/h makes you 5 min early. The 15-minute gap is d/4 − d/5 = d/20 hours = 1/4, so d = 5 km.',
    ],
    practice: [
      { q: '54 km/h in m/s is:', o: ['12', '15', '18', '20'], a: 1, why: '54 × 5/18 = 15.' },
      { q: 'A 150 m train at 36 km/h crosses a 250 m platform in:', o: ['25 s', '30 s', '40 s', '45 s'], a: 2, why: '36 km/h = 10 m/s. 400 m ÷ 10 = 40 s.' },
      { q: 'You go 60 km at 30 km/h and come back at 60 km/h. Average speed?', o: ['40 km/h', '45 km/h', '42 km/h', '50 km/h'], a: 0, why: 'Time = 2 h + 1 h = 3 h for 120 km: 40 km/h. (Not 45: average speed is total distance over total time.)' },
    ],
  },
];

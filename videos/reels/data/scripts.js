// Week 1 of the OpenContentMachine calendar (31 Oct to 6 Nov 2026), brand pages.
// Every number is from our own market data (Nifty 50 daily closes) or a named source.
const GH = 'opensourceeverything.in/goodhabit', OP = 'opensourceeverything.in/openprep', TM = 'opensourceeverything.in/tomorrow', OS = 'opensourceeverything.in';
const NOTE = 'Nifty 50 daily closes. Past moves don\'t predict future ones. Not investment advice.';
window.REELS = {
  // ---------------- GoodHabit ----------------
  'goodhabit-1031-1': { app: 'goodhabit', scenes: [
    { type: 'hook', d: 2.6, lines: ['In 2008 the Nifty', 'lost 59% in ten months.'] },
    { type: 'chart', d: 6, title: 'What happened next', from: '2008-01-01', to: '2010-12-31', marks: [['2008-10-27', 'The low: 2,524'], ['2010-10-04', 'Back above the Jan 2008 level']], cap: NOTE },
    { type: 'compare', d: 4, title: 'Two people, same start', left: { label: 'Sold at the low, Oct 2008', value: '−58.9%' }, right: { label: 'Held on till Oct 2010', value: 'Back to even' }, note: 'It took almost three years to get back. Holding on was not easy.' },
    { type: 'end', d: 3, line: 'Replay 2008 with pretend money.', url: GH },
  ] },
  'goodhabit-1101-1': { app: 'goodhabit', scenes: [
    { type: 'hook', d: 2.6, lines: ['You can own a slice of', '50 companies in one buy.'] },
    { type: 'steps', d: 5.2, title: 'That\'s an index fund', items: ['The Nifty 50 is a list of 50 big Indian companies', 'An index fund buys all 50, in the same mix', 'So you own a small slice of the whole list', 'No one picks shares, so costs are usually low'] },
    { type: 'end', d: 3, line: 'Try one with pretend money first.', url: GH },
  ] },
  'goodhabit-1102-1': { app: 'goodhabit', scenes: [
    { type: 'hook', d: 2.8, lines: ['Prices in India rose', '5.54% in a year.'], sub: 'Retail inflation for September 2026, released on 12 October.' },
    { type: 'compare', d: 4, title: 'Not the same everywhere', left: { label: 'Villages and small towns', value: '6.08%' }, right: { label: 'Cities', value: '4.88%' }, cap: 'Source: MoSPI press release, 12 Oct 2026 (provisional).' },
    { type: 'stat', d: 3.2, label: 'Food prices were up', value: 7.74, decimals: 2, suffix: '%', sub: 'Food rose faster than everything else.', cap: 'Source: MoSPI, Consumer Food Price Index, Sept 2026.' },
    { type: 'steps', d: 4.6, title: 'What it means for you', items: ['₹100 of shopping a year ago costs about ₹105.54 now', 'Savings earning less than this buy less each year', 'The RBI aims for 4%, within a range of 2% to 6%'] },
    { type: 'end', d: 3, line: 'Know what moves your money.', url: GH },
  ] },
  'goodhabit-1103-1': { app: 'goodhabit', scenes: [
    { type: 'stat', d: 3.4, label: 'A ₹180 coffee, every day for a year', value: 65700, prefix: '₹', sub: '180 × 365 days.' },
    { type: 'compare', d: 4, title: 'Which costs more?', left: { label: 'Daily coffee, 365 days', value: '₹65,700' }, right: { label: '₹5,000 gym, 12 months', value: '₹60,000' }, note: 'Not saying stop. Just know the number.' },
    { type: 'end', d: 3, line: 'Small spends add up.', url: GH },
  ] },
  'goodhabit-1104-1': { app: 'goodhabit', scenes: [
    { type: 'hook', d: 2.8, lines: ['12 March 2020:', 'the Nifty fell 8.3%', 'in one day.'] },
    { type: 'chart', d: 6.5, title: 'The Covid year', from: '2020-01-01', to: '2020-12-31', marks: [['2020-03-12', '−8.3% in a day'], ['2020-03-23', 'The low: 37.5% down'], ['2020-11-06', 'Back above 1 Jan']], cap: NOTE },
    { type: 'end', d: 3, line: 'Live it day by day, with pretend money.', url: GH },
  ] },
  'goodhabit-1104-2': { app: 'goodhabit', scenes: [
    { type: 'hook', d: 2.6, lines: ['₹1,000 a month', 'for 20 years.'] },
    { type: 'compare', d: 4.4, title: 'What compounding does', left: { label: 'What you put in', value: '₹2,40,000' }, right: { label: 'At an assumed 10% a year', value: '≈ ₹7.6 lakh' }, note: 'Assumed steady 10% a year, added monthly. Real returns go up and down, and aren\'t guaranteed.' },
    { type: 'steps', d: 4, title: 'Why it grows', items: ['Your returns start earning returns', 'Time does most of the work', 'Starting earlier matters more than starting bigger'] },
    { type: 'end', d: 3, line: 'See it for yourself in the simulator.', url: GH },
  ] },
  'goodhabit-1105-1': { app: 'goodhabit', scenes: [
    { type: 'hook', d: 2.8, lines: ['The RBI raised its', 'key rate to 5.50%.'], sub: 'Up 0.25 percentage points, on 7 October 2026.' },
    { type: 'steps', d: 4.6, title: 'What the repo rate is', items: ['The rate at which the RBI lends to banks', 'When it rises, floating-rate loans usually cost more', 'Deposit rates often follow, a little later'], cap: 'Source: RBI monetary policy statement, 7 Oct 2026.' },
    { type: 'end', d: 3, line: 'Money news, in plain words.', url: GH },
  ] },
  'goodhabit-1105-2': { app: 'goodhabit', scenes: [
    { type: 'hook', d: 2.6, lines: ['Before you invest,', 'build a cushion.'] },
    { type: 'steps', d: 4.8, title: 'An emergency fund', items: ['Add up one month of must-pay costs', 'A common rule of thumb: 3 to 6 months of that', 'Keep it safe and easy to reach, not in shares'] },
    { type: 'end', d: 3, line: 'Plan it in GoodHabit, free.', url: GH },
  ] },
  'goodhabit-1106-1': { app: 'goodhabit', scenes: [
    { type: 'hook', d: 2.8, lines: ['8 Nov 2016: ₹500 and', '₹1,000 notes withdrawn', 'overnight.'], size: 92 },
    { type: 'chart', d: 6, title: 'How the Nifty took it', from: '2016-10-03', to: '2017-03-31', marks: [['2016-11-09', 'Next day: −1.3%'], ['2016-12-26', 'Low: 7.4% below 8 Nov']], cap: NOTE },
    { type: 'end', d: 3, line: 'Replay Nov 2016 with pretend money.', url: GH },
  ] },
  'goodhabit-1106-2': { app: 'goodhabit', scenes: [
    { type: 'hook', d: 2.6, lines: ['"The Nifty fell 2%."', 'What does that mean?'] },
    { type: 'steps', d: 4.8, title: 'In plain words', items: ['The Nifty 50 tracks 50 big companies, weighted by size', 'Down 2% means that basket is worth 2% less than yesterday', 'Your own shares can move more, or less'] },
    { type: 'end', d: 3, line: 'Watch the market like the weather.', url: GH },
  ] },

  // ---------------- OpenPrep ----------------
  'openprep-1031-1': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['25% off, then 10% off', 'is not 35% off.'] },
    { type: 'quiz', d: 5, q: 'A ₹1,200 shirt: 25% off, then 10% off. You pay?', o: ['₹780', '₹810', '₹840', '₹900'], a: 1, why: '1,200 × 0.75 = 900, then 900 × 0.9 = 810.' },
    { type: 'steps', d: 4.4, title: 'The shortcut', items: ['Two changes multiply: × 0.75 × 0.9', 'Net change = a + b + ab/100', '−25 − 10 + 2.5 = −32.5%'] },
    { type: 'end', d: 3, line: 'Six free lessons and a free mock.', url: OP },
  ] },
  'openprep-1101-1': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['One CAT rule that', 'saves you marks.'] },
    { type: 'steps', d: 5, title: 'Type-in answers', items: ['A wrong multiple-choice answer costs 1 mark', 'A wrong type-in (TITA) answer costs nothing', 'So if you\'ve worked on a TITA, always enter it'] },
    { type: 'end', d: 3, line: 'Practise it in our free mock.', url: OP },
  ] },
  'openprep-1102-1': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['What does a', 'product manager do?'] },
    { type: 'steps', d: 5, title: 'The job, simply', items: ['Decides what to build next, and why', 'Works with engineers, designers and the business', 'Checks if it worked, then decides again'] },
    { type: 'end', d: 3, line: 'Careers, explained free.', url: OP },
  ] },
  'openprep-1103-1': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['Up 20%, then down 20%.', 'Back to the start?'] },
    { type: 'quiz', d: 5, q: 'A price rises 20%, then falls 20%. Net change?', o: ['0%', '−4%', '+4%', '−2%'], a: 1, why: '1.2 × 0.8 = 0.96. It ends 4% lower.' },
    { type: 'end', d: 3, line: 'More like this, free.', url: OP },
  ] },
  'openprep-1104-1': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['Your mock score is', 'the least useful part.'] },
    { type: 'steps', d: 5.4, title: 'Do this after every mock', items: ['List every wrong answer', 'Mark why: didn\'t know, misread, or ran out of time', 'Fix the biggest pile first'] },
    { type: 'end', d: 3, line: 'Take our full mock, free.', url: OP + '/mock/' },
  ] },
  'openprep-1104-2': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['Consulting:', 'what the job really is.'] },
    { type: 'steps', d: 5, title: 'In plain words', items: ['A company hires you to solve one hard problem', 'You break it down, find data, recommend a fix', 'Lots of slides, travel and fast learning'] },
    { type: 'end', d: 3, line: 'Careers, explained free.', url: OP },
  ] },
  'openprep-1105-1': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['Two people, one job.', 'How fast together?'] },
    { type: 'quiz', d: 5, q: 'A does a job in 10 days, B in 15. Together they take?', o: ['5 days', '6 days', '12.5 days', '8 days'], a: 1, why: '1/10 + 1/15 = 1/6 of the job a day, so 6 days.' },
    { type: 'end', d: 3, line: 'Time and work, in five minutes.', url: OP },
  ] },
  'openprep-1105-2': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['Reading comprehension:', 'read for the argument.'] },
    { type: 'steps', d: 5, title: 'Three passes in one', items: ['What is the author arguing?', 'Is the tone for, against, or balanced?', 'Answer from the passage, not from what you know'] },
    { type: 'end', d: 3, line: 'Try four passages in our free mock.', url: OP + '/mock/' },
  ] },
  'openprep-1106-1': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['Investment banking', 'analyst: the job.'] },
    { type: 'steps', d: 5, title: 'In plain words', items: ['Helps companies raise money or buy other companies', 'Builds financial models and pitch documents', 'Long hours, especially in the first years'] },
    { type: 'end', d: 3, line: 'Careers, explained free.', url: OP },
  ] },
  'openprep-1106-2': { app: 'openprep', scenes: [
    { type: 'hook', d: 2.6, lines: ['Go at 30 km/h,', 'come back at 60.'] },
    { type: 'quiz', d: 5, q: '60 km there at 30 km/h, back at 60 km/h. Average speed?', o: ['40 km/h', '45 km/h', '42 km/h', '50 km/h'], a: 0, why: '2 hours + 1 hour = 3 hours for 120 km: 40 km/h.' },
    { type: 'end', d: 3, line: 'Speed and distance, in five minutes.', url: OP },
  ] },

  // ---------------- Tomorrow ----------------
  'tomorrow-1031-1': { app: 'tomorrow', scenes: [
    { type: 'hook', d: 2.4, lines: ['Drop it here.', 'It\'s there.'], size: 120 },
    { type: 'phone', d: 4.6, img: 'tm-mydevices', title: 'Your phone and laptop, one chat.', zoom: [101, 110, 288, 228] },
    { type: 'end', d: 3, line: 'Tomorrow. Free, no ads.', url: TM },
  ] },
  'tomorrow-1101-1': { app: 'tomorrow', scenes: [
    { type: 'hook', d: 2.4, lines: ['Stop emailing', 'yourself files.'], size: 116 },
    { type: 'phone', d: 4, img: 'tm-send', title: 'Pick it. Pick where.' },
    { type: 'phone', d: 4, img: 'tm-mydevices', title: 'It\'s on your laptop.', zoom: [101, 110, 288, 228], ry: 18, ry2: -6 },
    { type: 'end', d: 3, line: 'Send anything, up to 100 MB.', url: TM },
  ] },
  'tomorrow-1102-1': { app: 'tomorrow', scenes: [
    { type: 'hook', d: 2.6, lines: ['Works with', 'Telegram.'], sub: 'Log in with Telegram. Get alerts there, or here.', size: 120 },
    { type: 'phone', d: 4.4, img: 'tm-you', title: 'You choose where alerts go.' },
    { type: 'end', d: 3, line: 'Tomorrow. Free, no ads.', url: TM },
  ] },
  'tomorrow-1103-1': { app: 'tomorrow', scenes: [
    { type: 'hook', d: 2.6, lines: ['Make things?', 'Post them where likes', 'stay private.'], size: 96 },
    { type: 'phone', d: 4, img: 'tm-feed', title: 'Only you see your likes.' },
    { type: 'steps', d: 4.2, title: 'Tomorrow for makers', items: ['No ads in the feed', 'No public like counts to chase', 'Send your work to friends in one tap'] },
    { type: 'end', d: 3, line: 'Join early.', url: TM },
  ] },
  'tomorrow-1104-1': { app: 'tomorrow', scenes: [
    { type: 'phone', d: 3.6, img: 'tm-search', title: 'Find friends by their ID.' },
    { type: 'phone', d: 4.2, img: 'tm-friendchat', title: 'Photos arrive as photos.', ry: 18, ry2: -6 },
    { type: 'end', d: 3, line: 'Tomorrow. Free, no ads.', url: TM },
  ] },
  'tomorrow-1104-2': { app: 'tomorrow', scenes: [
    { type: 'steps', d: 4.4, title: 'Phone to laptop in 3 taps', items: ['Open Send', 'Pick the file', 'Tap My devices'] },
    { type: 'phone', d: 4, img: 'tm-mydevices', title: 'Done.', zoom: [101, 110, 288, 228] },
    { type: 'end', d: 3, line: 'Tomorrow. Free, no ads.', url: TM },
  ] },
  'tomorrow-1105-1': { app: 'tomorrow', scenes: [
    { type: 'hook', d: 2.4, lines: ['Why log in', 'with Telegram?'], size: 116 },
    { type: 'steps', d: 4.8, title: 'Three reasons', items: ['No new password to remember', 'People see a real, known name', 'We never get your number or your chats'] },
    { type: 'end', d: 3, line: 'Works with Telegram.', url: TM },
  ] },
  'tomorrow-1105-2': { app: 'tomorrow', scenes: [
    { type: 'hook', d: 2.4, lines: ['Your work,', 'not your numbers.'], size: 116 },
    { type: 'phone', d: 4.2, img: 'tm-feed', title: 'A feed of people you follow.' },
    { type: 'end', d: 3, line: 'Join early.', url: TM },
  ] },
  'tomorrow-1106-1': { app: 'tomorrow', scenes: [
    { type: 'stat', d: 3, label: 'Send files up to', value: 100, suffix: ' MB', sub: 'Photos, videos, documents. To your devices or to friends.' },
    { type: 'phone', d: 4, img: 'tm-send', title: 'Drop. Pick. Sent.' },
    { type: 'end', d: 3, line: 'Tomorrow. Free, no ads.', url: TM },
  ] },
  'tomorrow-1106-2': { app: 'tomorrow', scenes: [
    { type: 'hook', d: 2.6, lines: ['Screenshot on your phone.', 'On your laptop. Done.'], size: 92 },
    { type: 'phone', d: 4.4, img: 'tm-mydevices', title: 'My devices', zoom: [101, 110, 288, 228] },
    { type: 'end', d: 3, line: 'Tomorrow. Free, no ads.', url: TM },
  ] },

  // ---------------- OpenSource Everything ----------------
  'ose-1031-1': { app: 'ose', scenes: [
    { type: 'hook', d: 2.8, lines: ['Free, open apps for', 'learning, money', 'and building.'], size: 96 },
    { type: 'phone', d: 4, img: 'ose-home', title: 'One OpenID for all of them.' },
    { type: 'steps', d: 4.4, title: 'What\'s inside', items: ['OpenPrep: free CAT prep', 'GoodHabit: practise money first', 'Tomorrow: send anything to anyone'] },
    { type: 'end', d: 3, line: 'No ads. Ever.', url: OS },
  ] },
  'ose-1102-1': { app: 'ose', scenes: [
    { type: 'hook', d: 2.6, lines: ['A full CAT-pattern mock.', 'Free.'], size: 100 },
    { type: 'phone', d: 4, img: 'op-mock-qa', title: '68 questions, 3 sections, a timer.' },
    { type: 'phone', d: 4, img: 'op-mock-result', title: 'Every answer explained.', ry: 18, ry2: -6 },
    { type: 'end', d: 3, line: 'Take it free.', url: OP + '/mock/' },
  ] },
  'ose-1104-1': { app: 'ose', scenes: [
    { type: 'hook', d: 2.8, lines: ['Go back to 2020 with', '₹1 lakh of pretend money.'], size: 92 },
    { type: 'phone', d: 3.6, img: 'gh-setup', title: 'Pick a date since 2007.' },
    { type: 'phone', d: 3.8, img: 'gh-crash', title: 'Live the crash, day by day.', ry: 18, ry2: -6 },
    { type: 'phone', d: 3.6, img: 'gh-report', title: 'Then see how you did.' },
    { type: 'end', d: 3, line: 'Real prices. Pretend money.', url: GH + '/sim/' },
  ] },
  'ose-1106-1': { app: 'ose', scenes: [
    { type: 'hook', d: 2.6, lines: ['Built in the open.'], size: 120 },
    { type: 'steps', d: 4.6, title: 'Our promises', items: ['Every app\'s code goes public at launch', 'No ads, ever', 'Your data is not for sale'] },
    { type: 'end', d: 3, line: 'Come build with us.', url: OS + '/build/' },
  ] },
};

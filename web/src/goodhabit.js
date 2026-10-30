import { appPage } from './shared/apppage.js';
import { goodguy } from './shared/mascots.js';
appPage({
  key: 'goodhabit', name: 'GoodHabit', accent: '#0B7A3B', mascot: goodguy, idKey: 'good', idName: 'GoodID',
  head: 'Practise money before it\'s real.', lede: 'Replay real Indian market history with pretend money, and learn what moves it.',
  play: '/goodhabit/sim/', playLabel: 'Open the simulator',
  starts: [['The trading simulator', 'Start on any date since 2007 with ₹1 lakh of pretend money. Buy real shares at their real prices and skip ahead.', '/goodhabit/sim/', 'Play now'], ['Money basics, as a game', 'Thirty levels on change, saving, interest and spotting scams, in Arena. Pick your difficulty and climb the leaderboard.', '/arena/#/c/money', 'Practise in Arena']],
  feedTitle: 'New on GoodHabit', pillars: ['Market case study', 'Knowledge', 'Indian current affairs', 'Personal finance'],
  empty: 'Market case studies, money basics and the week\'s news land here soon.',
  whyTitle: 'What\'s inside',
  why: [['The trading simulator', 'Real daily prices since 2007. Pick a date, invest pretend money, see what happened.'], ['Hissab', 'Split bills with friends; your own books stay on your phone.'], ['Never tips', 'GoodGuy explains what happened, never what to buy.']],
});

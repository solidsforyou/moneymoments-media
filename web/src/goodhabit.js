import { appPage } from './shared/apppage.js';
import { goodguy } from './shared/mascots.js';
appPage({
  key: 'goodhabit', name: 'GoodHabit', accent: '#0B7A3B', mascot: goodguy, idKey: 'good', idName: 'GoodID',
  head: 'Practise money before it\'s real.', lede: 'Replay real Indian market history with pretend money, and learn what moves it.',
  play: '/play/#sim', playLabel: 'Open the simulator',
  feedTitle: 'New on GoodHabit', pillars: ['Market case study', 'Knowledge', 'Indian current affairs', 'Personal finance'],
  empty: 'Market case studies, money basics and the week\'s news land here soon.',
  whyTitle: 'What\'s inside',
  why: [['The trading simulator', 'Real daily prices since 2007. Pick a date, invest pretend money, see what happened.'], ['Hissab', 'Split bills with friends; your own books stay on your phone.'], ['Never tips', 'GoodGuy explains what happened, never what to buy.']],
});

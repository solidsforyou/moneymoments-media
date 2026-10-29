import { appPage } from './shared/apppage.js';
import { buddy } from './shared/mascots.js';
appPage({
  key: 'openprep', name: 'OpenPrep', accent: '#1B4DFF', mascot: buddy, idKey: 'prep', idName: 'PrepID',
  head: 'Free CAT prep. No ads.', lede: 'Small lessons, real CAT questions and Buddy explaining every step.',
  play: '/play/#quant', playLabel: 'Try a lesson',
  feedTitle: 'New on OpenPrep', pillars: ['Lesson', 'CAT tip', 'Career option'],
  empty: 'The first lessons, CAT tips and career guides land here soon.',
  whyTitle: 'How it works',
  why: [['Read or watch', 'Every chapter as a short lesson. Buddy explains, never lectures.'], ['Practise free', 'Questions after every lesson, each answer explained.'], ['A full mock, free', 'CAT-style mocks with your section scores.']],
});

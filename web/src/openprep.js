import { appPage } from './shared/apppage.js';
import { buddy } from './shared/mascots.js';
appPage({
  key: 'openprep', name: 'OpenPrep', accent: '#1B4DFF', mascot: buddy, idKey: 'prep', idName: 'PrepID',
  head: 'Free CAT prep. No ads.', lede: 'Small lessons, real CAT questions and Buddy explaining every step.',
  video: { title: 'What a lesson looks like', text: 'Seating arrangement in under two minutes: one rule, a three-step method, and a full question solved.', src: '/media/openprep-lesson.mp4', poster: '/media/openprep-lesson.jpg' },
  play: '/openprep/learn/', playLabel: 'Start a lesson',
  starts: [['Free full mock', 'The CAT pattern: 3 sections, 40 minutes each, 68 questions, every answer explained.', '/openprep/mock/', 'Take the mock'], ['Quant lessons', 'Six short lessons with practice questions, from percentages to speed and distance.', '/openprep/learn/', 'Start learning'], ['CAT readiness, as a game', 'Quant, DILR and VARC questions by topic in Arena, Easy to CAT-hard, with a CAT readiness score.', '/arena/#/c/cat-00-qa', 'Practise in Arena']],
  feedTitle: 'New on OpenPrep', pillars: ['Lesson', 'CAT tip', 'Career option'],
  empty: 'The first lessons, CAT tips and career guides land here soon.',
  whyTitle: 'How it works',
  why: [['Read or watch', 'Every chapter as a short lesson. Buddy explains, never lectures.'], ['Practise free', 'Questions after every lesson, each answer explained.'], ['A full mock, free', 'The CAT pattern with section scores and every answer explained.']],
});

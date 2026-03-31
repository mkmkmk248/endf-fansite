
const HARD_QUESTIONS = [
  // ── 読み問題 (10問) ──────────────────────────────────
  {
    id: 1,
    type: 'yomi',
    question: '次の文字の読み方を選んで。',
    word: '源石',
    choices: ['おりじにうむ', 'げんせき', 'おりぱしー', 'げんがん'],
    answer: 0,
    explanation: ''
  },
  {
    id: 2,
    type: 'yomi',
    question: '次の文字の読み方を選んで。',
    word: '石棺',
    choices: ['せきすう', 'せっかん', 'せきかん', 'いしひつぎ'],
    answer: 1,
    explanation: ''
  },
  {
    id: 3,
    type: 'yomi',
    question: '次の文字の読み方を選んで。',
    word: '赤霄',
    choices: ['あかぞら', 'せきしょう', 'せきうん', 'せきてい'],
    answer: 1,
    explanation: ''
  },
  {
    id: 4,
    type: 'yomi',
    question: '次の文字の読み方を選んで。',
    word: '潮汐',
    choices: ['しおさい', 'しおしお', 'ちょうせき', 'うしお'],
    answer: 2,
    explanation: ''
  },
  {
    id: 5,
    type: 'yomi',
    question: '次の文字の読み方を選んで。',
    word: 'BABEL',
    choices: ['ばべる', 'ろどす', 'あびす', 'ふりすとん'],
    answer: 0,
    explanation: ''
  },
  {
    id: 6,
    type: 'yomi',
    question: '次の文字の読み方を選んで。',
    word: '慈悲光塔',
    choices: ['あんこくじだい', 'どごうこうみょう', 'こうかんざんしょく', 'じひこうとう'],
    answer: 3,
    explanation: ''
  },
  {
    id: 7,
    type: 'yomi',
    question: '次の文字の意味は？',
    word: '通信途絶',
    choices: ['唄', '進化系図', '通信途絶', '代償'],
    answer: 2,
    dimText: true,
    wordImage: '/assets/images/signallost.svg', 
    explanation: ''
  },
  {
    id: 8,
    type: 'yomi',
    question: '次の文字の意味は？',
    word: 'カズデル',
    choices: ['カズデル', '巫術', 'ティカズ', '魔王'],
    answer: 0,
    dimText: true,
    wordImage: '/assets/images/kazdel.svg', 
    explanation: ''
  },
  {
    id: 9,
    type: 'yomi',
    question: '次の文字の意味は？',
    word: '自然',
    choices: ['部族', '自然', '霊魂', '視相'],
    answer: 1,
    dimText: true,
    choiceImages: [                                  // 追加
    '/assets/images/thjodar.svg',
    '/assets/images/angar.svg',
    '/assets/images/snjofna.svg',
    '/assets/images/mikillear.svg',
  ],
    explanation: ''
  },
  {
    id: 10,
    type: 'yomi',
    question: '・ーー　・・・・　ーーー　　ー・・　ーーー　　ー・ーー　ーーー　・・ー　　ー　・・・・　・・　ー・　ー・ー　　・・　　・ー　ーー　・・ーー・・　',
    word: '■■■■',
    choices: ['■■■■■■■■■', '■■■■■■■■■', '■■■■■■■■■', '■■■■■■■■■'],
    anyCorrect: true,
    explanation: '■■■■■■■■■'
  }
];

// ハードモード レベル定義（3段階）
const HARD_LEVELS = [
  {
    min: 10, max: 10,
    title: '侵入式コールコマンド',
    caption: '■■■■ ■■■■■■■■■■.',
    image: '/assets/images/hard-rank3.png'
  },
  {
    min: 6, max: 9,
    title: 'テラマスター',
    caption: 'すごい！テラにとっても詳しいんですね！',
    image: '/assets/images/hard-rank2.png'
  },
  {
    min: 0, max: 5,
    title: '星門の向こう',
    caption: 'タロⅡで生きる。',
    image: '/assets/images/hard-rank1.png'
  }
];

function getHardLevel(score) {
  return HARD_LEVELS.find(l => score >= l.min && score <= l.max) || HARD_LEVELS[HARD_LEVELS.length - 1];
}

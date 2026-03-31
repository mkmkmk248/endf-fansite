
const QUESTIONS = [
  // ── 読み問題 (10問) ──────────────────────────────────
  {
    id: 1,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '武陵',
    choices: ['ぶりょう', 'ごりょう', 'むりょう', 'ふりょう'],
    answer: 0,
    explanation: '中国の「武陵源」は岩の柱が3,000本以上林立する世界自然遺産。'
  },
  {
    id: 2,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '黒夜叉',
    choices: ['くろやしゃ', 'こくやしゃ', 'へいえしゃ', 'くろよしゃ'],
    answer: 0,
    explanation: '黒夜叉は管理人のかっこいい別名。'
  },
  {
    id: 3,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '帝江号',
    choices: ['ていこうごう', 'でぃーしゃんごう', 'だーじゃんごう', 'でぃーじゃんごう'],
    answer: 3,
    explanation: '帝江は中国の『山海経』に登場する怪獣の名前。顔もないし頭もない。'
  },
  {
    id: 4,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '錦草',
    choices: ['にしきそう', 'めんそう', 'きんそう', 'にしきぐさ'],
    answer: 2,
    explanation: '現実のニシキソウと錦草(きんそう)は別物。模擬空間でふりがなを確認できる。'
  },
  {
    id: 5,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '水竹鈴',
    choices: ['すいちくりん', 'みずちくりん', 'しゅいじゅうりん', 'みずたけすず'],
    answer: 0,
    explanation: '水の流れと共に鳴る清波伝統の竹で作られた鈴。'
  },
  {
    id: 6,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '芽針',
    choices: ['めしん', 'めばり', 'がしん', 'やーじぇん'],
    answer: 0,
    explanation: '「訓読み＋音読み」の湯桶読みに注意。'
  },
  {
    id: 7,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '炎国',
    choices: ['えんこく', 'いぇんぐお', 'えんごく', 'ほむらこく'],
    answer: 2,
    explanation: '炎国はテラにある大国で、武陵のルーツとなっている。チェン・センユーのプロファイル等に登場する。'
  },
  {
    id: 8,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '折金券',
    choices: ['じぇーじんけん', 'おりきんけん', 'ろんめんへい', 'せっきんけん'],
    answer: 3,
    explanation: 'アイビーエナのプロファイルでふりがなが確認できる。'
  },
  {
    id: 9,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '辣么大',
    choices: ['らーまーだ', 'らーやおだー', 'なーむあだー', 'らーまーたん'],
    answer: 0,
    explanation: '辣么大は方興街にあるダパンの火鍋店。ダパンのプロファイルでふりがなを確認できる。'
  },
  {
    id: 10,
    type: 'yomi',
    question: 'この漢字の読み方は？',
    word: '展延源石',
    choices: ['おりじおめっと', 'おりじおあろい', 'おりじおしんせ', 'おりじおめとりー'],
    answer: 3,
    explanation: 'リリース予告特別番組内で読み上げられた。ゲーム内ではふりがなが振られていない。'
  },

  // ── 漢字問題 (5問) ──────────────────────────────────
  {
    id: 11,
    type: 'kanji',
    question: '次の単語を漢字に変換してください。',
    word: 'タンタン',
    choices: ['湯湯', '単単', '丹丹', '淡淡'],
    answer: 0,
    explanation: 'タンタン券はよく見ると「湯」の文字が書かれている。'
  },
  {
    id: 12,
    type: 'kanji',
    question: '次の単語を漢字に変換してください。',
    word: 'チェン・センユー',
    choices: ['陳戦友', '陳森友', '陳千語', '陳千尤'],
    answer: 2,
    explanation: '武陵のオペレーターはプロファイルで漢字名が確認できる。'
  },
  {
    id: 13,
    type: 'kanji',
    question: '次の単語を漢字に変換してください。',
    word: 'パン・ユェン',
    choices: ['潘遠', '潘源', '版遠', '版源'],
    answer: 0,
    explanation: 'ダパンの本名。'
  },
  {
    id: 14,
    type: 'kanji',
    question: '次の単語を漢字に変換してください。',
    word: 'そうぞく',
    choices: ['滄族', '滄賊', '蒼族', '蒼賊'],
    answer: 1,
    explanation: '清波砦の人々は一部で滄賊と呼ばれている。'
  },
  {
    id: 15,
    type: 'kanji',
    question: '次の単語を漢字に変換してください。',
    word: 'そくじょう',
    choices: ['息譲', '息穣', '息壌', '息醸'],
    answer: 2,
    explanation: '中国古代の伝説に登場する土壌と同じ名前。'
  }
];

// レベル定義
const LEVELS = [
  {
    min: 13, max: 15,
    title: '黒夜叉',
    caption: 'あらゆる知識を知り尽くしたあなたはタロⅡマスター！',
    image: 'assets/images/rank3.png'
  },
  {
    min: 8, max: 12,
    title: '白能面',
    caption: '超優秀なオペレーター！知識を一度見た知識を忘れないのかも？',
    image: 'assets/images/rank2.png'
  },
  {
    min: 0, max: 7,
    title: '大親分',
    caption: '伸びしろは無限大！',
    image: 'assets/images/rank1.png'
  }
];

function getLevel(score) {
  return LEVELS.find(l => score >= l.min && score <= l.max) || LEVELS[LEVELS.length - 1];
}

/**
 * 漢字検定ゲーム - 問題データ
 *
 * 差し替え方法:
 *  - type: 'yomi'  → 読み問題 (読みを10問用意)
 *  - type: 'kanji' → 漢字問題 (漢字を5問用意)
 *  - question: 出題文 (instruction)
 *  - word: 問われる語 (大きく表示される)
 *  - choices: 4択の選択肢 (配列インデックス 0〜3)
 *  - answer: 正解のインデックス (0〜3)
 *  - explanation: 解説文
 */
const QUESTIONS = [
  // ── 読み問題 (10問) ──────────────────────────────────
  {
    id: 1,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '武陵',
    choices: ['ぶりょう', 'ごりょう', 'むりょう', 'ふりょう'],
    answer: 1,
    explanation: '中国の「武陵源」は岩の柱が3,000本以上林立する世界自然遺産。'
  },
  {
    id: 2,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '黒夜叉',
    choices: ['くろやしゃ', 'こくやしゃ', 'へいえしゃ', 'くろよしゃ'],
    answer: 2,
    explanation: '黒夜叉は管理人のかっこいい別名。'
  },
  {
    id: 3,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '帝江号',
    choices: ['ていこうごう', 'でぃーしゃんごう', 'だーじゃんごう', 'でぃーじゃんごう'],
    answer: 1,
    explanation: '帝江は中国の『山海経』に登場する怪獣の名前。顔もないし頭もない。'
  },
  {
    id: 4,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '錦草',
    choices: ['にしきそう', 'めんそう', 'きんそう', 'にしきぐさ'],
    answer: 3,
    explanation: '現実のニシキソウと錦草(きんそう)は別物。模擬空間でふりがなを確認できる。'
  },
  {
    id: 5,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '水竹鈴',
    choices: ['すいちくりん', 'みずちくりん', 'しゅいじゅうりん', 'みずたけすず'],
    answer: 0,
    explanation: '水の流れと共に鳴る清波伝統の竹で作られた鈴。'
  },
  {
    id: 6,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '芽針',
    choices: ['めしん', 'めばり', 'がしん', 'やーじぇん'],
    answer: 1,
    explanation: '「訓読み＋音読み」の湯桶読みに注意。'
  },
  {
    id: 7,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '炎国',
    choices: ['えんこく', 'いぇんぐお', 'えんごく', 'ほむらこく'],
    answer: 3,
    explanation: '炎国はテラ(アークナイツ)にある大国。チェン・センユーのプロファイル等に登場する。'
  },
  {
    id: 8,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '折金券',
    choices: ['じぇーじんけん', 'おりきんけん', 'ろんめんへい', 'せっきんけん'],
    answer: 2,
    explanation: 'アイビーエナのプロファイルでふりがなが確認できる。'
  },
  {
    id: 9,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '辣么大',
    choices: ['らーまーだ', 'らーやおだー', 'なーむあだー', 'らーまーたん'],
    answer: 1,
    explanation: '辣么大は方興街にあるダパンの火鍋店。ダパンのプロファイルでふりがなを確認できる。'
  },
  {
    id: 10,
    type: 'yomi',
    question: '次の漢字の読み方を選んでください。',
    word: '展延源石',
    choices: ['おりじおめっと', 'おりじおあろい', 'おりじおしんせ', 'おりじおめとりー'],
    answer: 0,
    explanation: 'リリース予告特別番組内で読み上げられた。ゲーム内ではふりがなが振られていない。'
  },

  // ── 漢字問題 (5問) ──────────────────────────────────
  {
    id: 11,
    type: 'kanji',
    question: '次のひらがなを漢字に変換してください。',
    word: 'タンタン',
    choices: ['湯湯', '単単', '丹丹', '淡淡'],
    answer: 2,
    explanation: 'タンタン券はよく見ると「湯」の文字が書かれている。'
  },
  {
    id: 12,
    type: 'kanji',
    question: '次のひらがなを漢字に変換してください。',
    word: 'チェン・センユー',
    choices: ['陳戦友', '陳森友', '陳千語', '陳千尤'],
    answer: 1,
    explanation: '武陵のオペレーターはプロファイルで漢字名が確認できる。'
  },
  {
    id: 13,
    type: 'kanji',
    question: '次のひらがなを漢字に変換してください。',
    word: 'パン・ユェン',
    choices: ['潘遠', '潘源', '版遠', '版源'],
    answer: 3,
    explanation: 'ダパンの本名。'
  },
  {
    id: 14,
    type: 'kanji',
    question: '次のひらがなを漢字に変換してください。',
    word: 'そうぞく',
    choices: ['滄族', '滄賊', '蒼族', '蒼賊'],
    answer: 2,
    explanation: '清波砦の人々は一部で滄賊と呼ばれている。'
  },
  {
    id: 15,
    type: 'kanji',
    question: '次のひらがなを漢字に変換してください。',
    word: 'そくじょう',
    choices: ['息浄', '息穣', '息壌', '息醸'],
    answer: 0,
    explanation: '中国古代の伝説に登場する土壌と同じ名前。'
  }
];

// レベル定義
const LEVELS = [
  {
    min: 15, max: 15,
    title: '漢字の神',
    caption: '完璧！あなたは漢字の頂点に立つ神様です。',
    image: '/assets/images/rank6.png'
  },
  {
    min: 13, max: 14,
    title: '漢字博士',
    caption: '素晴らしい！漢字の達人に迫る圧倒的な実力です。',
    image: '/assets/images/rank5.png'
  },
  {
    min: 10, max: 12,
    title: '漢字マスター',
    caption: '優秀！漢字の知識は本物。あと一歩で頂点です。',
    image: '/assets/images/rank4.png'
  },
  {
    min: 7, max: 9,
    title: '漢字見習い',
    caption: 'まずまず！コツコツ練習を続けてさらに上を目指そう。',
    image: '/assets/images/rank3.png'
  },
  {
    min: 4, max: 6,
    title: '漢字入門',
    caption: 'これからが楽しみ！基礎を固めて再チャレンジしよう。',
    image: '/assets/images/rank2.png'
  },
  {
    min: 0, max: 3,
    title: '漢字の卵',
    caption: '旅は始まったばかり！まず基礎から学び直してみよう。',
    image: '/assets/images/rank1.png'
  }
];

function getLevel(score) {
  return LEVELS.find(l => score >= l.min && score <= l.max) || LEVELS[LEVELS.length - 1];
}

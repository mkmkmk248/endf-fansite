/**
 * 漢字検定ゲーム ハードモード — Result Logic
 * hard/result.html で読み込まれます。
 * hard-questions.js が先に読み込まれている必要があります。
 */
(function () {
  'use strict';

  const raw  = sessionStorage.getItem('hkqAnswers');
  const done = sessionStorage.getItem('hkqDone');

  if (!raw || !done) {
    window.location.replace('/hard/index.html');
    return;
  }

  const answers = JSON.parse(raw);

  // ── Score ──────────────────────────────────────────────
  let totalCorrect = 0;
  let yomiCorrect = 0, kanjiCorrect = 0;
  let yomiTotal = 0,   kanjiTotal   = 0;

  HARD_QUESTIONS.forEach((q, i) => {
    // const isCorrect = answers[i] === q.answer;
    const isCorrect = q.anyCorrect ? true : answers[i] === q.answer;
    if (q.type === 'yomi') {
      yomiTotal++;
      if (isCorrect) { yomiCorrect++; totalCorrect++; }
    } else {
      kanjiTotal++;
      if (isCorrect) { kanjiCorrect++; totalCorrect++; }
    }
  });

  const pct = Math.round((totalCorrect / HARD_QUESTIONS.length) * 100);

  // ── DOM refs ───────────────────────────────────────────
  const scoreMain    = document.getElementById('js-score-main');
  const scorePct     = document.getElementById('js-score-pct');
  const rankBadge    = document.getElementById('js-rank-badge');
  const rankTitle    = document.getElementById('js-rank-title');
  const rankCaption  = document.getElementById('js-rank-caption');
  const rankImg      = document.getElementById('js-rank-img');
  const rankFallback = document.getElementById('js-rank-fallback');
  const yomiVal      = document.getElementById('js-yomi-val');
  const kanjiVal     = document.getElementById('js-kanji-val');
  const yomiBar      = document.getElementById('js-yomi-bar');
  const kanjiBar     = document.getElementById('js-kanji-bar');
  const reviewList   = document.getElementById('js-review-list');
  const shareX       = document.getElementById('js-share-x');
  const shareBsky    = document.getElementById('js-share-bsky');

  // ── Render score ───────────────────────────────────────
  scoreMain.textContent = totalCorrect;
  scorePct.textContent  = `正答率 ${pct}%`;

  // ── Render rank ────────────────────────────────────────
  const level = getHardLevel(totalCorrect);
  rankTitle.textContent   = level.title;
  rankCaption.textContent = level.caption;
  rankImg.src = level.image;
  rankImg.alt = level.title;

  const fallbackChars = [' ', '🐰', ' '];
  const rankIndex = [
    { min: 0,  max: 5  },
    { min: 6,  max: 9 },
    { min: 10, max: 10 },
  ].findIndex(r => totalCorrect >= r.min && totalCorrect <= r.max);
  rankFallback.textContent = fallbackChars[rankIndex] || '★';

  // ── Bar charts ─────────────────────────────────────────
  yomiVal.textContent  = `${yomiCorrect} / ${yomiTotal}`;

  requestAnimationFrame(() => {
    setTimeout(() => {
      yomiBar.style.width  = `${(yomiCorrect  / yomiTotal)  * 100}%`;
    }, 300);
  });

  // ── Review list ────────────────────────────────────────
  const choiceLabels = ['A', 'B', 'C', 'D'];
  const fragment = document.createDocumentFragment();

  HARD_QUESTIONS.forEach((q, i) => {
    const userAns   = answers[i];
    // const isCorrect = userAns === q.answer;
    const isCorrect = q.anyCorrect ? true : userAns === q.answer;

    const item = document.createElement('div');
    item.className = `review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`;
    item.style.opacity = '0';
    item.style.animation = `fadeUp .4s ${0.1 + i * 0.04}s ease forwards`;

    const verdict = isCorrect ? '○' : '×';
    let ansRows = '';
    if (!isCorrect) {
      const userLabel  = userAns >= 0 ? choiceLabels[userAns] : '―';
      const userChoice = userAns >= 0 ? q.choices[userAns]    : '未回答';
      ansRows += `
        <div class="review-ans-row">
          <span class="ans-lbl">あなた</span>
          <span class="ans-val ans-val--wrong">${escHtml(userLabel + ': ' + userChoice)}</span>
        </div>`;
    }
    ansRows += `
      <div class="review-ans-row">
        <span class="ans-lbl">正解</span>
        <span class="ans-val ans-val--correct">${escHtml(choiceLabels[q.answer] + ': ' + q.choices[q.answer])}</span>
      </div>`;

    item.innerHTML = `
      <div class="review-head">
        <div class="review-verdict" aria-label="${isCorrect ? '正解' : '不正解'}">${verdict}</div>
        <div class="review-content">
          <p class="review-qnum">Q${i + 1}・<span class="${q.type === 'yomi' ? 'badge badge--yomi' : 'badge badge--kanji'}" style="font-size:.68rem;padding:1px 6px">${q.type === 'yomi' ? '読み' : '漢字'}</span></p>
          <p class="review-word">${escHtml(q.word)}</p>
        </div>
      </div>
      <div class="review-answers">${ansRows}</div>
      <p class="review-explanation">${escHtml(q.explanation)}</p>
    `;
    fragment.appendChild(item);
  });

  reviewList.appendChild(fragment);

  // ── Share ──────────────────────────────────────────────
  function buildShareText() {
    const siteUrl = window.location.origin + '/hard/';
    return [
      `タロⅡ統一■■テストに挑戦しました！`,
      `称号：${level.title}`,
      `結果：${totalCorrect} / ${HARD_QUESTIONS.length}問正解`,
      ``,
      `${siteUrl}`,
      `#タロii統一テスト`
    ].join('\n');
  }

  shareX.addEventListener('click', () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(buildShareText())}`,
      '_blank', 'noopener,noreferrer'
    );
  });
  shareBsky.addEventListener('click', () => {
    window.open(
      `https://bsky.app/intent/compose?text=${encodeURIComponent(buildShareText())}`,
      '_blank', 'noopener,noreferrer'
    );
  });

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

})();

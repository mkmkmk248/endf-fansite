
(function () {
  'use strict';

  // ── Load answers ───────────────────────────────────────
  const raw = sessionStorage.getItem('kqAnswers');
  const done = sessionStorage.getItem('kqDone');

  // クイズ未完了の場合はトップへリダイレクト
  if (!raw || !done) {
    window.location.replace('index.html');
    return;
  }

  const answers = JSON.parse(raw); // number[]  (0〜3, または -1 = 未回答)

  // ── Score calculation ──────────────────────────────────
  let totalCorrect = 0;
  let yomiCorrect  = 0;
  let kanjiCorrect = 0;
  let yomiTotal    = 0;
  let kanjiTotal   = 0;

  QUESTIONS.forEach((q, i) => {
    const isCorrect = answers[i] === q.answer;
    if (q.type === 'yomi') {
      yomiTotal++;
      if (isCorrect) { yomiCorrect++; totalCorrect++; }
    } else {
      kanjiTotal++;
      if (isCorrect) { kanjiCorrect++; totalCorrect++; }
    }
  });

  const pct = Math.round((totalCorrect / QUESTIONS.length) * 100);

  // ── DOM refs ───────────────────────────────────────────
  const scoreMain   = document.getElementById('js-score-main');
  const scorePct    = document.getElementById('js-score-pct');
  const rankBadge   = document.getElementById('js-rank-badge');
  const rankTitle   = document.getElementById('js-rank-title');
  const rankCaption = document.getElementById('js-rank-caption');
  const rankImg     = document.getElementById('js-rank-img');
  const rankFallback= document.getElementById('js-rank-fallback');
  const yomiVal     = document.getElementById('js-yomi-val');
  const kanjiVal    = document.getElementById('js-kanji-val');
  const yomiBar     = document.getElementById('js-yomi-bar');
  const kanjiBar    = document.getElementById('js-kanji-bar');
  const reviewList  = document.getElementById('js-review-list');
  const shareX      = document.getElementById('js-share-x');
  const shareBsky   = document.getElementById('js-share-bsky');

  // ── Render score ───────────────────────────────────────
  scoreMain.textContent = totalCorrect;
  scorePct.textContent  = `正答率 ${pct}%`;

  // ── Render rank ────────────────────────────────────────
  const level = getLevel(totalCorrect);
  rankBadge.textContent   = '称号';
  rankTitle.textContent   = level.title;
  rankCaption.textContent = level.caption;
  rankImg.src = level.image;
  rankImg.alt = level.title;
  // fallback emoji for each rank
  const fallbackChars = ['🥚', '📖', '✏️', '🎓', '🏅', '👑'];
  const levelIndex = [
    { min: 0,  max: 3  },
    { min: 4,  max: 6  },
    { min: 7,  max: 9  },
    { min: 10, max: 12 },
    { min: 13, max: 14 },
    { min: 15, max: 15 },
  ].findIndex(r => totalCorrect >= r.min && totalCorrect <= r.max);
  rankFallback.textContent = fallbackChars[levelIndex] || '★';

  // ── Render bar charts (deferred for animation) ─────────
  yomiVal.textContent  = `${yomiCorrect} / ${yomiTotal}`;
  kanjiVal.textContent = `${kanjiCorrect} / ${kanjiTotal}`;

  // Trigger bar animation after paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      yomiBar.style.width  = `${(yomiCorrect  / yomiTotal)  * 100}%`;
      kanjiBar.style.width = `${(kanjiCorrect / kanjiTotal) * 100}%`;
    }, 300);
  });

  // ── Render review list ─────────────────────────────────
  const choiceLabels = ['A', 'B', 'C', 'D'];

  const fragment = document.createDocumentFragment();

  QUESTIONS.forEach((q, i) => {
    const userAns    = answers[i];
    const isCorrect  = userAns === q.answer;

    const item = document.createElement('div');
    item.className = `review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`;
    // animate in with staggered delay
    item.style.opacity = '0';
    item.style.animation = `fadeUp .4s ${0.1 + i * 0.04}s ease forwards`;

    // Verdict mark
    const verdict = isCorrect ? '○' : '×';

    // Build answers rows
    let ansRows = '';
    if (!isCorrect) {
      const userLabel   = userAns >= 0 ? choiceLabels[userAns] : '―';
      const userChoice  = userAns >= 0 ? q.choices[userAns]    : '未回答';
      ansRows += `
        <div class="review-ans-row">
          <span class="ans-lbl">あなた</span>
          <span class="ans-val ans-val--wrong">${escHtml(userLabel + ': ' + userChoice)}</span>
        </div>`;
    }
    const correctLabel  = choiceLabels[q.answer];
    const correctChoice = q.choices[q.answer];
    ansRows += `
      <div class="review-ans-row">
        <span class="ans-lbl">正解</span>
        <span class="ans-val ans-val--correct">${escHtml(correctLabel + ': ' + correctChoice)}</span>
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

  // ── Share text ─────────────────────────────────────────
  function buildShareText() {
    const siteUrl = window.location.origin + '/';
    return [
      `タロⅡ統一漢字テストに挑戦しました！`,
      `称号：${level.title}`,
      `結果：${totalCorrect} / ${QUESTIONS.length}問正解`,
      ``,
      `https://talosii-toitsu-test.pages.dev`,
      `#タロii統一テスト`
    ].join('\n');
  }

  shareX.addEventListener('click', () => {
    const text = buildShareText();
    const url  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  shareBsky.addEventListener('click', () => {
    const text = buildShareText();
    const url  = `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  // ── Helpers ────────────────────────────────────────────
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Hard mode modal ────────────────────────────────────
  const hardBtn     = document.getElementById('js-hard-mode-btn');
  const modalOverlay= document.getElementById('js-modal-overlay');
  const confirmYes  = document.getElementById('js-confirm-yes');
  const confirmNo   = document.getElementById('js-confirm-no');

  if (hardBtn) {
    hardBtn.addEventListener('click', () => {
      modalOverlay.hidden = false;
      confirmYes.focus();
    });
  }
  if (confirmYes) {
    confirmYes.addEventListener('click', () => {
      window.location.href = 'hard/index.html';
    });
  }
  if (confirmNo) {
    confirmNo.addEventListener('click', () => {
      modalOverlay.hidden = true;
      hardBtn && hardBtn.focus();
    });
  }
  // Close on overlay background click
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.hidden = true;
        hardBtn && hardBtn.focus();
      }
    });
  }
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && !modalOverlay.hidden) {
      modalOverlay.hidden = true;
      hardBtn && hardBtn.focus();
    }
  });

})();

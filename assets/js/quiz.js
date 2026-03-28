/**
 * 漢字検定ゲーム — Quiz Logic
 * quiz.html で読み込まれます。
 * questions.js が先に読み込まれている必要があります。
 */
(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────
  const TOTAL = QUESTIONS.length; // 15
  let currentIndex = 0;
  let isLocked = false; // 回答中は連打防止
  const answers = new Array(TOTAL).fill(-1); // -1 = 未回答

  // ── DOM refs ───────────────────────────────────────────
  const progressFill  = document.getElementById('js-progress-fill');
  const progressBar   = document.getElementById('js-progress-bar');
  const progressLabel = document.getElementById('js-progress-label');
  const phaseBox      = document.getElementById('js-phase-box');
  const phaseImg      = document.getElementById('js-phase-img');
  const phaseFallback = document.getElementById('js-phase-fallback');
  const quizCard      = document.getElementById('js-quiz-card');
  const typeBadge     = document.getElementById('js-type-badge');
  const qnum          = document.getElementById('js-qnum');
  const questionText  = document.getElementById('js-question-text');
  const wordEl        = document.getElementById('js-word');
  const choiceButtons = Array.from(document.querySelectorAll('.choice-btn'));
  const labels        = ['A', 'B', 'C', 'D'];

  // ── Phase config ───────────────────────────────────────
  const PHASES = [
    { src: '/assets/images/phase1.png', fallbackChar: '炎', qRange: '1〜5問' },
    { src: '/assets/images/phase2.png', fallbackChar: '水', qRange: '6〜10問' },
    { src: '/assets/images/phase3.png', fallbackChar: '金', qRange: '11〜15問' },
  ];

  function getPhase(index) {
    return Math.floor(index / 5); // 0, 1, 2
  }

  // ── Render question ────────────────────────────────────
  function render(index) {
    const q = QUESTIONS[index];

    // progress
    const pct = (index / TOTAL) * 100;
    progressFill.style.width = pct + '%';
    progressBar.setAttribute('aria-valuenow', index);
    progressLabel.textContent = `Q${index + 1} / ${TOTAL}`;

    // phase image (switch at Q5 and Q10)
    const phase = getPhase(index);
    const prevPhase = index > 0 ? getPhase(index - 1) : phase;
    if (phase !== prevPhase) {
      switchPhase(phase);
    }

    // type badge
    if (q.type === 'yomi') {
      typeBadge.textContent = '読み';
      typeBadge.className = 'badge badge--yomi';
    } else {
      typeBadge.textContent = '漢字';
      typeBadge.className = 'badge badge--kanji';
    }

    qnum.textContent = `第${index + 1}問`;
    questionText.textContent = q.question;
    wordEl.textContent = q.word;

    // choices
    choiceButtons.forEach((btn, i) => {
      btn.className = 'choice-btn'; // reset
      btn.disabled = false;
      btn.querySelector('.choice-label').textContent = labels[i];
      const textEl = btn.querySelector('.choice-text');
      textEl.textContent = q.choices[i];
      btn.setAttribute('aria-label', `${labels[i]}: ${q.choices[i]}`);
      btn.onclick = () => selectAnswer(i);
    });
  }

  // ── Switch phase illustration ──────────────────────────
  function switchPhase(phase) {
    phaseBox.classList.add('phase--changing');
    setTimeout(() => {
      const p = PHASES[phase];
      phaseImg.src = p.src;
      phaseImg.style.display = '';
      phaseFallback.textContent = p.fallbackChar;
      phaseBox.classList.remove('phase--changing');
    }, 400);
  }

  // ── Answer selection ───────────────────────────────────
  function selectAnswer(choiceIndex) {
    if (isLocked) return;
    isLocked = true;

    answers[currentIndex] = choiceIndex;

    // Highlight selected button
    choiceButtons[choiceIndex].classList.add('is-selected');
    choiceButtons.forEach(btn => (btn.disabled = true));

    setTimeout(() => {
      if (currentIndex < TOTAL - 1) {
        // Next question
        currentIndex++;
        transitionToNext();
      } else {
        // Finished — save & redirect
        sessionStorage.setItem('kqAnswers', JSON.stringify(answers));
        sessionStorage.setItem('kqDone', '1');
        window.location.href = 'result.html';
      }
    }, 420);
  }

  // ── Card transition ────────────────────────────────────
  function transitionToNext() {
    quizCard.classList.add('is-exiting');
    setTimeout(() => {
      render(currentIndex);
      quizCard.classList.remove('is-exiting');
      quizCard.classList.add('is-entering');
      isLocked = false;
      setTimeout(() => quizCard.classList.remove('is-entering'), 300);
    }, 220);
  }

  // ── Init ───────────────────────────────────────────────
  function init() {
    // 問題データが存在するか確認
    if (!QUESTIONS || QUESTIONS.length === 0) {
      console.error('問題データが見つかりません。questions.js を確認してください。');
      return;
    }
    // セッションをリセット（新規開始）
    sessionStorage.removeItem('kqAnswers');
    sessionStorage.removeItem('kqDone');

    // 初期フェーズ画像
    const p = PHASES[0];
    phaseImg.src = p.src;
    phaseFallback.textContent = p.fallbackChar;

    render(0);
  }

  init();
})();

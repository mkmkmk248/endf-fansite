/**
 * 漢字検定ゲーム ハードモード — Quiz Logic
 * hard/quiz.html で読み込まれます。
 * hard-questions.js が先に読み込まれている必要があります。
 */
(function () {
  'use strict';

  const TOTAL = HARD_QUESTIONS.length;
  let currentIndex = 0;
  let isLocked = false;
  const answers = new Array(TOTAL).fill(-1);

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

  // ── Phase config (hard mode uses red-toned fallbacks) ──
  const PHASES = [
    { src: '/assets/images/hard-phase1.png', fallbackChar: '炎', qRange: '1〜5問' },
    { src: '/assets/images/hard-phase2.png', fallbackChar: '獄', qRange: '6〜10問' },
    { src: '/assets/images/hard-phase3.png', fallbackChar: '覇', qRange: '11〜15問' },
  ];

  function getPhase(index) { return Math.floor(index / 5); }

  // ── Render ─────────────────────────────────────────────
  function render(index) {
    const q = HARD_QUESTIONS[index];

    const pct = (index / TOTAL) * 100;
    progressFill.style.width = pct + '%';
    progressBar.setAttribute('aria-valuenow', index);
    progressLabel.textContent = `Q${index + 1} / ${TOTAL}`;

    const phase = getPhase(index);
    const prevPhase = index > 0 ? getPhase(index - 1) : phase;
    if (phase !== prevPhase) switchPhase(phase);

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

    choiceButtons.forEach((btn, i) => {
      btn.className = 'choice-btn';
      btn.disabled = false;
      btn.querySelector('.choice-label').textContent = labels[i];
      btn.querySelector('.choice-text').textContent = q.choices[i];
      btn.setAttribute('aria-label', `${labels[i]}: ${q.choices[i]}`);
      btn.onclick = () => selectAnswer(i);
    });
  }

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

  function selectAnswer(choiceIndex) {
    if (isLocked) return;
    isLocked = true;

    answers[currentIndex] = choiceIndex;
    choiceButtons[choiceIndex].classList.add('is-selected');
    choiceButtons.forEach(btn => (btn.disabled = true));

    setTimeout(() => {
      if (currentIndex < TOTAL - 1) {
        currentIndex++;
        transitionToNext();
      } else {
        // ハードモード用セッションキー
        sessionStorage.setItem('hkqAnswers', JSON.stringify(answers));
        sessionStorage.setItem('hkqDone', '1');
        window.location.href = '/hard/result.html';
      }
    }, 420);
  }

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

  function init() {
    if (!HARD_QUESTIONS || HARD_QUESTIONS.length === 0) {
      console.error('ハードモード問題データが見つかりません。');
      return;
    }
    sessionStorage.removeItem('hkqAnswers');
    sessionStorage.removeItem('hkqDone');

    phaseImg.src = PHASES[0].src;
    phaseFallback.textContent = PHASES[0].fallbackChar;
    render(0);
  }

  init();
})();

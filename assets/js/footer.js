/**
 * 漢字検定ゲーム — 共通フッター
 * 全ページの </body> 直前に <script src="/assets/js/footer.js"> として読み込む
 */
(function () {
  'use strict';

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="site-footer__inner">
      <a href="/index.html" class="site-footer__logo" aria-label="トップページへ">
        <span class="site-footer__logo-kanji" aria-hidden="true">漢</span>
        <span class="site-footer__logo-text">漢字検定ゲーム</span>
      </a>
      <nav class="site-footer__nav" aria-label="フッターナビゲーション">
        <a href="/index.html" class="site-footer__link">通常モード</a>
        <span class="site-footer__sep" aria-hidden="true">／</span>
        <a href="/hard/index.html" class="site-footer__link site-footer__link--hard">ハードモード</a>
      </nav>
      <p class="site-footer__copy">© 漢字検定ゲーム</p>
    </div>
  `;

  document.body.appendChild(footer);
})();

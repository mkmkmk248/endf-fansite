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
        <span class="site-footer__logo-text">タロⅡ統一テスト</span>
      </a>

      <p class="site-footer__copy">
      このサイトは二次創作です。<br>
      ファンメイドであり公式とは関係ありません。<br>
      <a href="https://x.com/Sussuandi">作った人：@Sussuandi</a></p>
    </div>
  `;

  document.body.appendChild(footer);
})();

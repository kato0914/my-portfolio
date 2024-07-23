// Google Tag Manager用のデータレイヤー関数
function pushToDataLayer(eventName, eventData) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの動作
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
  
    if (hamburgerMenu) {
      hamburgerMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
        pushToDataLayer('menuToggle', { state: nav.classList.contains('active') ? 'open' : 'closed' });
      });
    }
  
    // スクロール時のヘッダー背景変更
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // ナビゲーションリンクのクリックをトラッキング
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        pushToDataLayer('navigationClick', {
          linkText: this.textContent,
          linkUrl: this.href
        });
      });
    });
  
    // コンタクトフォームの送信処理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // フォームデータの取得
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());
  
        // ここでフォームデータを送信する処理を追加
        // 例: fetch APIを使用してサーバーにデータを送信
  
        // Google Tag Managerにイベントをプッシュ
        pushToDataLayer('formSubmission', {
          formName: 'contact',
          formData: formObject
        });
  
        // フォーム送信後の処理（例：メッセージ表示）
        alert('お問い合わせありがとうございます。まもなくご連絡いたします。');
        contactForm.reset();
      });
    }
  
    // プロジェクトカードのクリックイベント（プロジェクトセクションがある場合）
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', function() {
        const projectName = this.querySelector('h3').textContent;
        pushToDataLayer('projectCardClick', {
          projectName: projectName
        });
      });
    });
  });
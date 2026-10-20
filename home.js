/* ==========================================================
   OzSaver – homepage script
   All sample content lives in the DATA block below. Replace it
   with your own data (or fetch from your Laravel API) and the
   page renders itself.
   ========================================================== */

(function () {
  'use strict';

  /* ---------------- DATA (sample content – replace) ---------------- */
  var DATA = {
    popular: ['Emma Sleep', 'Bellroy', 'Booking.com', 'Frank Body'],

    trust: [
      { title: 'Checked weekly', text: 'Every store page is reviewed', icon: 'M5 12l5 5L20 7' },
      { title: 'Updated daily', text: 'New AU offers added regularly', icon: 'M12 6v6l4 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z' },
      { title: '100% free', text: 'No account or sign-up needed', icon: 'M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' },
      { title: 'Aussie stores', text: 'Built for shoppers in Australia', icon: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z' }
    ],

    // type: "code" shows Reveal code, "deal" shows Get deal
    coupons: [
      { store: 'ASOBIO', value: '10%', unit: 'OFF', title: 'Sitewide discount on your order', type: 'code', code: 'WELCOME10', url: '#' },
      { store: 'Dailygreatness', value: '15%', unit: 'OFF', title: 'Sitewide discount for new and returning customers', type: 'code', code: 'VIP15', url: '#' },
      { store: 'Fantastic Furniture', value: '20%', unit: 'OFF', title: 'Selected furniture ranges, online only', type: 'code', code: 'SAMPLE20', url: '#' },
      { store: 'Bellroy', value: 'Free', unit: 'SHIPPING', title: 'Free delivery on eligible Australian orders', type: 'deal', url: '#' },
      { store: 'Frank Body', value: '25%', unit: 'OFF', title: 'Skincare and body care bundles', type: 'code', code: 'SAMPLE25', url: '#' },
      { store: 'Booking.com', value: '10%', unit: 'OFF', title: 'Selected stays when you book through us', type: 'deal', url: '#' }
    ],

    categories: [
      { name: 'Fashion', icon: 'M8 3l-5 3 2 4 3-1v11h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z' },
      { name: 'Travel', icon: 'M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z' },
      { name: 'Health & Beauty', icon: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z' },
      { name: 'Electronics', icon: 'M4 5h16v11H4zM2 20h20' },
      { name: 'Home & Garden', icon: 'M3 11l9-8 9 8v10h-6v-6H9v6H3z' },
      { name: 'Food & Drink', icon: 'M5 8h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2' },
      { name: 'Pets', icon: 'M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z' },
      { name: 'Sports & Fitness', icon: 'M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12' }
    ],

    stores: ['Emma Sleep', 'Fantastic Furniture', 'Bellroy', 'Frank Body', 'Booking.com', 'Kiwi.com', 'Tineco', 'Cupshe', 'Sweat', 'Garden of Wellness', 'Portta', 'Vida Glow'],

    steps: [
      { title: 'Find your store', text: 'Search or browse verified Australian stores and categories.' },
      { title: 'Copy the code', text: 'Tap Reveal code, or Get deal to open the offer directly.' },
      { title: 'Paste at checkout', text: 'Your discount is applied before you pay.' }
    ],

    events: [
      { name: 'Black Friday', date: '27 Nov', bg: '#0B2A6F' },
      { name: 'Cyber Monday', date: '30 Nov', bg: '#123A99' },
      { name: 'Christmas Sales', date: 'December', bg: '#0A1F5C' },
      { name: 'Boxing Day', date: '26 Dec', bg: '#1A44A8' }
    ],

    guides: [
      { tag: 'Basics', title: 'How to use a coupon code at checkout', text: 'Where to paste your code, why it sometimes fails, and what to check before you pay.', icon: 'M20 12v8H4v-8M2 7h20v5H2zM12 22V7', url: '#' },
      { tag: 'Seasonal', title: 'The Australian sale calendar', text: 'Black Friday, Cyber Monday, Boxing Day and more: when each sale usually happens and how to prepare.', icon: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4', url: '#' },
      { tag: 'Strategy', title: 'Cashback vs coupon codes', text: 'How the two differ, when they can be combined, and which one suits the way you shop.', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2 0 0 1 5 0c0 2-2.500 1.500-2.500 3.500M12 17h.01', url: '#' },
      { tag: 'Safety', title: 'Spotting fake deals online', text: 'Simple checks for unfamiliar stores, too-good-to-be-true prices and unsafe payment pages.', icon: 'M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6zM9 12l2 2 4-4', url: '#' }
    ],

    posts: [
      { tag: 'Guides', date: '12 Oct 2026', read: '6 min read', title: 'Black Friday 2026 in Australia: when the best deals land', bg: '#EAF0FF', icon: 'M20 12v8H4v-8M2 7h20v5H2zM12 22V7', url: '#' },
      { tag: 'Tips', date: '8 Oct 2026', read: '5 min read', title: 'How to combine codes, cashback and free shipping', bg: '#DCE6FF', icon: 'M3 12l9-9 9 9-9 9zM9 12h6', url: '#' },
      { tag: 'Events', date: '3 Oct 2026', read: '7 min read', title: 'Click Frenzy vs Black Friday: where to shop first', bg: '#E4ECFF', icon: 'M12 6v6l4 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', url: '#' },
      { tag: 'Shopping', date: '28 Sep 2026', read: '4 min read', title: 'Home and furniture deals worth waiting for this spring', bg: '#E4ECFF', icon: 'M3 11l9-8 9 8v10h-6v-6H9v6H3z', url: '#' },
      { tag: 'Travel', date: '21 Sep 2026', read: '6 min read', title: 'Booking holiday stays for less: a practical checklist', bg: '#EAF0FF', icon: 'M17.800 19.200L16 11l3.500-3.500C21 6 21.500 4 21 3c-1-.5-3 0-4.500 1.500L13 8 4.800 6.200c-.5-.1-.9.1-1.100.5l-.3.5c-.2.5-.1 1 .3 1.300L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.500 5.300c.3.4.8.5 1.300.3l.5-.2c.4-.3.6-.7.5-1.200z', url: '#' },
      { tag: 'Beauty', date: '15 Sep 2026', read: '5 min read', title: 'Skincare on a budget: how to read discounts properly', bg: '#DCE6FF', icon: 'M12 3l1.900 5.100L19 10l-5.100 1.900L12 17l-1.900-5.100L5 10l5.100-1.900z', url: '#' }
    ],

    reviews: [
      { store: 'Emma Sleep', category: 'Home & Garden', score: 4.6, text: 'Mattress range, trial period and delivery timing for Australian customers.', url: '#' },
      { store: 'Bellroy', category: 'Fashion', score: 4.7, text: 'Wallets and bags: build quality, warranty and returns explained.', url: '#' },
      { store: 'Frank Body', category: 'Health & Beauty', score: 4.4, text: 'Skincare range, pricing and what shipping costs within Australia.', url: '#' },
      { store: 'Tineco', category: 'Electronics', score: 4.5, text: 'Smart cleaners compared on price, support and local availability.', url: '#' }
    ]
  };

  /* ---------------- helpers ---------------- */
  var $ = function (sel) { return document.querySelector(sel); };

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function initial(name) { return esc(name.charAt(0).toUpperCase()); }
  function mask(code) {
    if (!code) return '••••••';
    return code.slice(0, 3) + '•'.repeat(Math.max(code.length - 3, 3));
  }
  function svgPath(d, size, sw) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  }
  var CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>';

  /* ---------------- renderers ---------------- */
  function renderPopular() {
    $('#popularChips').innerHTML = DATA.popular.map(function (n) {
      return '<button type="button" class="chip" data-search="' + esc(n) + '">' + esc(n) + '</button>';
    }).join('');
  }

  function renderTrust() {
    $('#trustGrid').innerHTML = DATA.trust.map(function (t) {
      return '<div class="trust__item"><div class="trust__icon">' + svgPath(t.icon, 24) + '</div>' +
        '<div><b>' + esc(t.title) + '</b><span>' + esc(t.text) + '</span></div></div>';
    }).join('');
  }

  function renderCoupons(list) {
    var html = list.map(function (c) {
      var action = c.type === 'code'
        ? '<div class="codebox"><code>' + esc(mask(c.code)) + '</code>' +
          '<button type="button" class="btn" data-reveal="' + DATA.coupons.indexOf(c) + '">Reveal code</button></div>'
        : '<a href="' + esc(c.url || '#') + '" class="btn" rel="sponsored noopener" target="_blank">Get deal</a>';
      return '<article class="card coupon">' +
        '<div class="coupon__head"><div class="avatar">' + initial(c.store) + '</div>' +
        '<div><div class="coupon__store">' + esc(c.store) + '</div><div class="verified">' + CHECK + 'Verified this week</div></div></div>' +
        '<div class="coupon__value"><b>' + esc(c.value) + '</b><span>' + esc(c.unit) + '</span></div>' +
        '<p class="coupon__title">' + esc(c.title) + '</p>' + action + '</article>';
    }).join('');
    $('#couponGrid').innerHTML = html;
    $('#couponEmpty').hidden = list.length > 0;
  }

  function renderCategories() {
    $('#categoryGrid').innerHTML = DATA.categories.map(function (k) {
      return '<a href="#" class="tile"><div class="tile__icon">' + svgPath(k.icon, 26, 1.8) + '</div><b>' + esc(k.name) + '</b></a>';
    }).join('');
  }

  function renderStores() {
    $('#storeGrid').innerHTML = DATA.stores.map(function (n) {
      return '<a href="#" class="tile store"><div class="avatar">' + initial(n) + '</div><b>' + esc(n) + '</b></a>';
    }).join('');
  }

  function renderSteps() {
    $('#stepGrid').innerHTML = DATA.steps.map(function (s, i) {
      return '<div class="step"><div class="step__n">' + (i + 1) + '</div><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div>';
    }).join('');
  }

  function renderEvents() {
    $('#eventGrid').innerHTML = DATA.events.map(function (e) {
      return '<a href="#" class="event" style="background:' + esc(e.bg) + '"><span class="event__date">' + esc(e.date) + '</span>' +
        '<div><b>' + esc(e.name) + '</b><span>See all offers →</span></div></a>';
    }).join('');
  }

  function renderGuides() {
    $('#guideGrid').innerHTML = DATA.guides.map(function (g) {
      return '<a href="' + esc(g.url) + '" class="guide">' +
        '<div class="guide__icon">' + svgPath(g.icon, 26, 1.8) + '</div>' +
        '<span class="guide__tag">' + esc(g.tag) + '</span>' +
        '<h3>' + esc(g.title) + '</h3><p>' + esc(g.text) + '</p>' +
        '<span class="guide__link">Read guide →</span></a>';
    }).join('');
  }

  function renderPosts() {
    $('#postGrid').innerHTML = DATA.posts.map(function (p) {
      return '<article class="card post">' +
        '<a href="' + esc(p.url) + '" class="post__thumb" style="background:' + esc(p.bg) + '" aria-label="' + esc(p.title) + '">' + svgPath(p.icon, 64, 1.4) + '</a>' +
        '<div class="post__body"><div class="post__meta"><span class="tag">' + esc(p.tag) + '</span><span>' + esc(p.date) + ' · ' + esc(p.read) + '</span></div>' +
        '<h3><a href="' + esc(p.url) + '">' + esc(p.title) + '</a></h3>' +
        '<div class="post__by">By OzSaver Editorial Team</div></div></article>';
    }).join('');
  }

  function stars(score) {
    var out = '';
    for (var i = 1; i <= 5; i++) {
      var on = i <= Math.round(score);
      out += '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z" fill="' + (on ? '#F5A623' : '#D5DCEE') + '"/></svg>';
    }
    return out;
  }

  function renderReviews() {
    $('#reviewGrid').innerHTML = DATA.reviews.map(function (r) {
      return '<article class="card review">' +
        '<div class="review__head"><div class="avatar">' + initial(r.store) + '</div><div><b>' + esc(r.store) + '</b><span>' + esc(r.category) + '</span></div></div>' +
        '<div class="stars" role="img" aria-label="Rated ' + r.score + ' out of 5">' + stars(r.score) + '<b>' + r.score.toFixed(1) + '</b></div>' +
        '<p>' + esc(r.text) + '</p>' +
        '<a href="' + esc(r.url) + '">Read full review →</a></article>';
    }).join('');
  }

  /* ---------------- search / filter ---------------- */
  function applySearch(term) {
    term = term.trim().toLowerCase();
    var list = !term ? DATA.coupons : DATA.coupons.filter(function (c) {
      return (c.store + ' ' + c.title).toLowerCase().indexOf(term) !== -1;
    });
    renderCoupons(list);
  }

  $('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    applySearch($('#searchInput').value);
    $('#coupons').scrollIntoView({ behavior: 'smooth' });
  });
  $('#searchInput').addEventListener('input', function (e) {
    if (!e.target.value) applySearch('');
  });
  $('#popularChips').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-search]');
    if (!btn) return;
    $('#searchInput').value = btn.getAttribute('data-search');
    applySearch(btn.getAttribute('data-search'));
    $('#coupons').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------------- code modal + copy ---------------- */
  var modal = $('#codeModal');
  var lastFocus = null;

  function copyText(text, done) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (err) { /* ignore */ }
      document.body.removeChild(ta); done();
    }
  }

  function openModal(c) {
    lastFocus = document.activeElement;
    $('#modalStore').textContent = c.store;
    $('#modalTitle').textContent = c.value + ' ' + c.unit;
    $('#modalCode').textContent = c.code;
    $('#modalGo').href = c.url || '#';
    $('#modalGo').textContent = 'Go to ' + c.store;
    $('#modalCopy').textContent = 'Copy';
    modal.hidden = false;
    $('#modalCopy').focus();
    copyText(c.code, function () { $('#modalCopy').textContent = 'Copied!'; });
  }
  function closeModal() {
    modal.hidden = true;
    if (lastFocus) lastFocus.focus();
  }

  $('#couponGrid').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-reveal]');
    if (!btn) return;
    openModal(DATA.coupons[Number(btn.getAttribute('data-reveal'))]);
  });
  $('#modalCopy').addEventListener('click', function () {
    copyText($('#modalCode').textContent, function () { $('#modalCopy').textContent = 'Copied!'; });
  });
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  /* ---------------- mobile nav ---------------- */
  var toggle = $('#navToggle');
  var nav = $('#mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------------- newsletter ---------------- */
  $('#newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('#email');
    var msg = $('#newsletterMsg');
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    msg.className = 'form-msg ' + (ok ? 'is-ok' : 'is-error');
    if (!ok) {
      msg.textContent = 'Please enter a valid email address.';
      input.focus();
      return;
    }
    // TODO: POST to your Laravel route, e.g.
    // fetch('/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }, body: JSON.stringify({ email: input.value }) })
    msg.textContent = 'Thanks for subscribing! Check your inbox.';
    input.value = '';
  });

  /* ---------------- init ---------------- */
  renderPopular();
  renderTrust();
  renderCoupons(DATA.coupons);
  renderCategories();
  renderStores();
  renderSteps();
  renderEvents();
  renderGuides();
  renderPosts();
  renderReviews();
  $('#year').textContent = new Date().getFullYear();
})();
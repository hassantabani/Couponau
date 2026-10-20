/* ==========================================================
   OzSaver – Guides & Blog page
   Replace GUIDES and ARTICLES with your database / API data.
   Guide:   { tag, title, text, read, icon, url }
   Article: { topic, title, excerpt, date (ISO), read, author,
              bg, icon, url }
   ========================================================== */

(function () {
  'use strict';

  /* ---------------- DATA (sample – replace) ---------------- */
  var GUIDES = [
    { tag: 'Basics',   title: 'How to use a coupon code at checkout', text: 'Where to paste your code, why it sometimes fails, and what to check before you pay.', read: '5 min read', icon: 'M20 12v8H4v-8M2 7h20v5H2zM12 22V7', url: '#' },
    { tag: 'Seasonal', title: 'The Australian sale calendar', text: 'Black Friday, Cyber Monday, Boxing Day and more: when each sale usually happens and how to prepare.', read: '8 min read', icon: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4', url: 'events.html' },
    { tag: 'Strategy', title: 'Cashback vs coupon codes', text: 'How the two differ, when they can be combined, and which one suits the way you shop.', read: '6 min read', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2 0 0 1 5 0c0 2-2.5 1.5-2.5 3.5M12 17h.01', url: '#' },
    { tag: 'Safety',   title: 'Spotting fake deals online', text: 'Simple checks for unfamiliar stores, too-good-to-be-true prices and unsafe payment pages.', read: '7 min read', icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4', url: '#' },
    { tag: 'Strategy', title: 'How to stack discounts the right way', text: 'Order of operations for sale prices, codes, gift cards and free shipping thresholds.', read: '6 min read', icon: 'M3 12l9-9 9 9-9 9zM9 12h6', url: '#' },
    { tag: 'Basics',   title: 'Understanding delivery and returns', text: 'What to look for in shipping times, return windows and refund policies before you buy.', read: '5 min read', icon: 'M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', url: '#' }
  ];

  var ARTICLES = [
    { topic: 'Events',   title: 'Black Friday 2026 in Australia: when the best deals land', excerpt: 'A practical look at when stores usually start their sales, which categories drop the most and how to prepare early.', date: '2026-10-12', read: '6 min read', bg: '#EAF0FF', icon: 'M20 12v8H4v-8M2 7h20v5H2zM12 22V7', url: '#' },
    { topic: 'Tips',     title: 'How to combine codes, cashback and free shipping', excerpt: 'Which savings methods work together, and the order to apply them so nothing cancels out.', date: '2026-10-08', read: '5 min read', bg: '#DCE6FF', icon: 'M3 12l9-9 9 9-9 9zM9 12h6', url: '#' },
    { topic: 'Events',   title: 'Click Frenzy vs Black Friday: where to shop first', excerpt: 'Both promise big savings. Here is how they differ and how to decide where to spend.', date: '2026-10-03', read: '7 min read', bg: '#E4ECFF', icon: 'M12 6v6l4 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', url: '#' },
    { topic: 'Shopping', title: 'Home and furniture deals worth waiting for this spring', excerpt: 'Which furniture and bedding purchases are better timed with a sale, and which are not.', date: '2026-09-28', read: '4 min read', bg: '#E4ECFF', icon: 'M3 11l9-8 9 8v10h-6v-6H9v6H3z', url: '#' },
    { topic: 'Travel',   title: 'Booking holiday stays for less: a practical checklist', excerpt: 'Flexible dates, member rates and cancellation terms: what to check before you book.', date: '2026-09-21', read: '6 min read', bg: '#EAF0FF', icon: 'M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z', url: '#' },
    { topic: 'Beauty',   title: 'Skincare on a budget: how to read discounts properly', excerpt: 'Percentage off, bundles and trial sizes: how to work out what you are really paying.', date: '2026-09-15', read: '5 min read', bg: '#DCE6FF', icon: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z', url: '#' },
    { topic: 'Tips',     title: 'Five checks before you enter your card details', excerpt: 'Quick signs that a checkout page is legitimate, and what to do if something looks off.', date: '2026-09-09', read: '4 min read', bg: '#EAF0FF', icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', url: '#' },
    { topic: 'Shopping', title: 'Electronics: when a sale price is really a sale price', excerpt: 'How to check price history and spot inflated “was” prices on tech purchases.', date: '2026-09-02', read: '6 min read', bg: '#E4ECFF', icon: 'M4 5h16v11H4zM2 20h20', url: '#' },
    { topic: 'Travel',   title: 'Flights vs packages: which usually costs less?', excerpt: 'When bundling flights and hotels saves money, and when booking separately wins.', date: '2026-08-26', read: '7 min read', bg: '#DCE6FF', icon: 'M3 12h18M12 3l9 9-9 9', url: '#' },
    { topic: 'Beauty',   title: 'Subscription boxes: are they worth it?', excerpt: 'A simple way to compare subscription pricing with buying the products individually.', date: '2026-08-19', read: '5 min read', bg: '#EAF0FF', icon: 'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8', url: '#' }
  ];

  var PAGE_SIZE = 6;

  /* ---------------- helpers ---------------- */
  var $ = function (sel) { return document.querySelector(sel); };

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(d, size, sw) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.8) +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  }
  function fmtDate(iso) {
    return new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  ARTICLES.sort(function (a, b) { return a.date < b.date ? 1 : -1; });

  var topics = ['All'].concat(Array.from(new Set(ARTICLES.map(function (a) { return a.topic; }))).sort());
  var state = { term: '', topic: 'All', shown: PAGE_SIZE };

  /* ---------------- rendering ---------------- */
  function matches(text, t) { return !t || text.toLowerCase().indexOf(t) !== -1; }

  function renderGuides() {
    var t = state.term.trim().toLowerCase();
    var list = GUIDES.filter(function (g) { return matches(g.title + ' ' + g.text + ' ' + g.tag, t); });
    $('#guideGrid').innerHTML = list.map(function (g) {
      return '<a href="' + esc(g.url) + '" class="guide">' +
        '<div class="guide__icon">' + icon(g.icon, 26) + '</div>' +
        '<span class="guide__tag">' + esc(g.tag) + ' · ' + esc(g.read) + '</span>' +
        '<h3>' + esc(g.title) + '</h3><p>' + esc(g.text) + '</p>' +
        '<span class="guide__link">Read guide →</span></a>';
    }).join('');
    $('#guideEmpty').hidden = list.length > 0;
    return list.length;
  }

  function renderFilter() {
    $('#blogFilter').innerHTML = topics.map(function (c) {
      var on = c === state.topic;
      return '<button type="button" class="chip' + (on ? ' is-on' : '') + '" data-topic="' + esc(c) + '" aria-pressed="' + on + '">' + esc(c) + '</button>';
    }).join('');
  }

  function postCard(p) {
    return '<article class="card post">' +
      '<a href="' + esc(p.url) + '" class="post__thumb" style="background:' + esc(p.bg) + '" aria-label="' + esc(p.title) + '">' + icon(p.icon, 64, 1.4) + '</a>' +
      '<div class="post__body"><div class="post__meta"><span class="tag">' + esc(p.topic) + '</span><span>' + fmtDate(p.date) + ' · ' + esc(p.read) + '</span></div>' +
      '<h3><a href="' + esc(p.url) + '">' + esc(p.title) + '</a></h3>' +
      '<p class="post__excerpt">' + esc(p.excerpt) + '</p>' +
      '<div class="post__by">By OzSaver Editorial Team</div></div></article>';
  }

  function renderPosts() {
    var t = state.term.trim().toLowerCase();
    var list = ARTICLES.filter(function (a) {
      return (state.topic === 'All' || a.topic === state.topic) && matches(a.title + ' ' + a.excerpt + ' ' + a.topic, t);
    });

    var feat = list[0];
    var rest = list.slice(1);
    var visible = rest.slice(0, state.shown);

    $('#bFeat').innerHTML = feat
      ? '<article class="bfeat">' +
          '<a href="' + esc(feat.url) + '" class="bfeat__art" style="background:' + esc(feat.bg) + '" aria-label="' + esc(feat.title) + '">' + icon(feat.icon, 96, 1.2) + '</a>' +
          '<div class="bfeat__body">' +
            '<div class="post__meta"><span class="tag tag--ex">Latest</span><span class="tag">' + esc(feat.topic) + '</span><span>' + fmtDate(feat.date) + ' · ' + esc(feat.read) + '</span></div>' +
            '<h3><a href="' + esc(feat.url) + '">' + esc(feat.title) + '</a></h3>' +
            '<p>' + esc(feat.excerpt) + '</p>' +
            '<a href="' + esc(feat.url) + '" class="btn btn--sm">Read article</a>' +
          '</div></article>'
      : '';

    $('#postGrid').innerHTML = visible.map(postCard).join('');
    $('#postEmpty').hidden = list.length > 0;
    $('#loadMore').hidden = rest.length <= state.shown;
    return list.length;
  }

  function render() {
    var g = renderGuides();
    var a = renderPosts();
    $('#guides').hidden = g === 0 && !!state.term.trim() && a > 0 ? true : false;
    $('#blogCount').textContent = (g + a) + (g + a === 1 ? ' result' : ' results');
  }

  /* ---------------- events ---------------- */
  $('#blogSearchForm').addEventListener('submit', function (e) { e.preventDefault(); });
  $('#blogSearch').addEventListener('input', function (e) { state.term = e.target.value; state.shown = PAGE_SIZE; render(); });
  $('#blogFilter').addEventListener('click', function (e) {
    var b = e.target.closest('[data-topic]');
    if (!b) return;
    state.topic = b.getAttribute('data-topic');
    state.shown = PAGE_SIZE;
    renderFilter();
    renderPosts();
  });
  $('#loadMore').addEventListener('click', function () { state.shown += PAGE_SIZE; renderPosts(); });

  // Newsletter
  $('#newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('#email');
    var msg = $('#newsletterMsg');
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    msg.className = 'form-msg ' + (ok ? 'is-ok' : 'is-error');
    if (!ok) { msg.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    // TODO: POST to your Laravel route
    msg.textContent = 'Thanks for subscribing! Check your inbox.';
    input.value = '';
  });

  // Mobile nav
  var toggle = $('#navToggle');
  var nav = $('#mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* ---------------- init ---------------- */
  renderFilter();
  render();
  $('#year').textContent = new Date().getFullYear();
})();
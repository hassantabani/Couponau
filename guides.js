/* ==========================================================
   OzSaver – Guides page
   Replace the GUIDES array with your database / API data.
   Guide: { tag, level, title, text, read, steps, icon, url,
            start (true = shown in the large "Start here" card) }
   ========================================================== */

(function () {
  'use strict';

  /* ---------------- DATA (sample – replace) ---------------- */
  var GUIDES = [
    { tag: 'Basics',   level: 'Beginner',     title: 'How to use a coupon code at checkout', text: 'Where to paste your code, why it sometimes fails, and what to check before you pay.', read: '5 min read', steps: 6, start: true, icon: 'M20 12v8H4v-8M2 7h20v5H2zM12 22V7', url: '#' },
    { tag: 'Seasonal', level: 'Beginner',     title: 'The Australian sale calendar', text: 'Black Friday, Cyber Monday, Boxing Day and more: when each sale usually happens and how to prepare.', read: '8 min read', steps: 8, icon: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4', url: 'events.html' },
    { tag: 'Strategy', level: 'Intermediate', title: 'Cashback vs coupon codes', text: 'How the two differ, when they can be combined, and which one suits the way you shop.', read: '6 min read', steps: 5, icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2 0 0 1 5 0c0 2-2.5 1.5-2.5 3.5M12 17h.01', url: '#' },
    { tag: 'Safety',   level: 'Beginner',     title: 'Spotting fake deals online', text: 'Simple checks for unfamiliar stores, too-good-to-be-true prices and unsafe payment pages.', read: '7 min read', steps: 7, icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4', url: '#' },
    { tag: 'Strategy', level: 'Intermediate', title: 'How to stack discounts the right way', text: 'Order of operations for sale prices, codes, gift cards and free shipping thresholds.', read: '6 min read', steps: 5, icon: 'M3 12l9-9 9 9-9 9zM9 12h6', url: '#' },
    { tag: 'Basics',   level: 'Beginner',     title: 'Understanding delivery and returns', text: 'What to look for in shipping times, return windows and refund policies before you buy.', read: '5 min read', steps: 6, icon: 'M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', url: '#' },
    { tag: 'Safety',   level: 'Beginner',     title: 'Paying safely: cards, wallets and buy-now-pay-later', text: 'The pros and cons of each payment method and the protections that come with them.', read: '7 min read', steps: 6, icon: 'M3 6h18v12H3zM3 10h18M7 15h4', url: '#' },
    { tag: 'Strategy', level: 'Advanced',     title: 'Tracking prices before a big sale', text: 'How to record regular prices and spot a real discount when the sale starts.', read: '6 min read', steps: 5, icon: 'M3 17l6-6 4 4 8-8M15 7h6v6', url: '#' }
  ];

  var CHECKLIST = [
    { title: 'Is the store genuine?', text: 'Look for a real business name, contact details and clear returns information.' },
    { title: 'Is the price really lower?', text: 'Compare against the regular price and at least one other retailer.' },
    { title: 'Is your code applied?', text: 'Check the discount shows in the order summary before you enter payment details.' }
  ];

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

  var topics = ['All'].concat(Array.from(new Set(GUIDES.map(function (g) { return g.tag; }))).sort());
  var state = { term: '', topic: 'All' };

  /* ---------------- rendering ---------------- */
  function renderStart() {
    var g = GUIDES.filter(function (x) { return x.start; })[0] || GUIDES[0];
    $('#gStart').innerHTML =
      '<div class="gstart__badge">Start here</div>' +
      '<div class="gstart__icon">' + icon(g.icon, 56, 1.5) + '</div>' +
      '<div class="gstart__body">' +
        '<div class="gstart__meta"><span>' + esc(g.tag) + '</span><span>' + esc(g.level) + '</span><span>' + esc(g.read) + '</span></div>' +
        '<h2 id="startTitle">' + esc(g.title) + '</h2>' +
        '<p>' + esc(g.text) + '</p>' +
      '</div>' +
      '<a href="' + esc(g.url) + '" class="btn btn--light">Read the guide</a>';
  }

  function renderFilter() {
    $('#guideFilter').innerHTML = topics.map(function (c) {
      var on = c === state.topic;
      return '<button type="button" class="chip' + (on ? ' is-on' : '') + '" data-topic="' + esc(c) + '" aria-pressed="' + on + '">' + esc(c) + '</button>';
    }).join('');
  }

  function renderCards() {
    var t = state.term.trim().toLowerCase();
    var list = GUIDES.filter(function (g) {
      var okTopic = state.topic === 'All' || g.tag === state.topic;
      var okTerm = !t || (g.title + ' ' + g.text + ' ' + g.tag).toLowerCase().indexOf(t) !== -1;
      return okTopic && okTerm;
    });

    $('#gCards').innerHTML = list.map(function (g, i) {
      return '<a href="' + esc(g.url) + '" class="gcard">' +
        '<div class="gcard__top"><span class="gcard__icon">' + icon(g.icon, 26) + '</span>' +
        '<span class="gcard__level gcard__level--' + esc(g.level.toLowerCase()) + '">' + esc(g.level) + '</span></div>' +
        '<span class="gcard__tag">' + esc(g.tag) + '</span>' +
        '<h3>' + esc(g.title) + '</h3><p>' + esc(g.text) + '</p>' +
        '<div class="gcard__foot"><span>' + esc(g.read) + ' · ' + g.steps + ' steps</span><b>Read guide →</b></div></a>';
    }).join('');

    $('#guideEmpty').hidden = list.length > 0;
    $('#guideCount').textContent = list.length + (list.length === 1 ? ' guide' : ' guides');
    $('#startHere').hidden = !!t || state.topic !== 'All';
    $('#guidesTitle').textContent = t ? 'Search results' : 'Browse by topic';
  }

  /* ---------------- events ---------------- */
  $('#guideSearchForm').addEventListener('submit', function (e) { e.preventDefault(); });
  $('#guideSearch').addEventListener('input', function (e) { state.term = e.target.value; renderCards(); });
  $('#guideFilter').addEventListener('click', function (e) {
    var b = e.target.closest('[data-topic]');
    if (!b) return;
    state.topic = b.getAttribute('data-topic');
    renderFilter();
    renderCards();
  });

  $('#checkSteps').innerHTML = CHECKLIST.map(function (t, i) {
    return '<div class="step"><div class="step__n">' + (i + 1) + '</div><h3>' + esc(t.title) + '</h3><p>' + esc(t.text) + '</p></div>';
  }).join('');

  var toggle = $('#navToggle');
  var nav = $('#mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* ---------------- init ---------------- */
  renderStart();
  renderFilter();
  renderCards();
  $('#year').textContent = new Date().getFullYear();
})();
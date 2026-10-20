/* ==========================================================
   OzSaver – Coupons page
   Replace the COUPONS array with your database / API data.
   Fields:
     store, category, type ("code" | "deal"), value, unit,
     title, code (for type "code"), exclusive (bool),
     daysLeft (number of days until expiry, or null = no end date),
     url
   ========================================================== */

(function () {
  'use strict';

  /* ---------------- DATA (sample – replace) ---------------- */
  var COUPONS = [
    { store: 'ASOBIO', category: 'Health & Beauty', type: 'code', value: '10%', unit: 'OFF', title: 'Sitewide discount on your order', code: 'WELCOME10', exclusive: false, daysLeft: null, url: '#' },
    { store: 'Dailygreatness', category: 'Health & Beauty', type: 'code', value: '15%', unit: 'OFF', title: 'Sitewide discount for new and returning customers', code: 'VIP15', exclusive: true, daysLeft: 12, url: '#' },
    { store: 'Fantastic Furniture', category: 'Home & Garden', type: 'code', value: '20%', unit: 'OFF', title: 'Selected furniture ranges, online only', code: 'SAMPLE20', exclusive: false, daysLeft: 5, url: '#' },
    { store: 'Bellroy', category: 'Fashion', type: 'deal', value: 'Free', unit: 'SHIPPING', title: 'Free delivery on eligible Australian orders', exclusive: false, daysLeft: null, url: '#' },
    { store: 'Frank Body', category: 'Health & Beauty', type: 'code', value: '25%', unit: 'OFF', title: 'Skincare and body care bundles', code: 'SAMPLE25', exclusive: true, daysLeft: 20, url: '#' },
    { store: 'Booking.com', category: 'Travel', type: 'deal', value: '10%', unit: 'OFF', title: 'Selected stays when you book through us', exclusive: false, daysLeft: 30, url: '#' },
    { store: 'Emma Sleep', category: 'Home & Garden', type: 'code', value: '15%', unit: 'OFF', title: 'Mattresses and bedding bundles', code: 'SAMPLE15', exclusive: false, daysLeft: 3, url: '#' },
    { store: 'Cupshe', category: 'Fashion', type: 'code', value: '12%', unit: 'OFF', title: 'Swimwear and resort wear', code: 'SAMPLE12', exclusive: false, daysLeft: 9, url: '#' },
    { store: 'Kiwi.com', category: 'Travel', type: 'deal', value: '$20', unit: 'OFF', title: 'Selected flights over a minimum spend', exclusive: true, daysLeft: 14, url: '#' },
    { store: 'Tineco', category: 'Electronics', type: 'code', value: '$50', unit: 'OFF', title: 'Selected smart cleaners', code: 'SAMPLE50', exclusive: false, daysLeft: 6, url: '#' },
    { store: 'Sweat', category: 'Sports & Fitness', type: 'deal', value: '7-day', unit: 'FREE TRIAL', title: 'Try the app free before you subscribe', exclusive: false, daysLeft: null, url: '#' },
    { store: 'Garden of Wellness', category: 'Health & Beauty', type: 'code', value: '10%', unit: 'OFF', title: 'Supplements and wellness range', code: 'SAMPLE10', exclusive: false, daysLeft: 18, url: '#' },
    { store: 'Portta', category: 'Electronics', type: 'code', value: '8%', unit: 'OFF', title: 'Video converters and accessories', code: 'SAMPLE08', exclusive: false, daysLeft: 25, url: '#' },
    { store: 'Kaka Auto Parts', category: 'Automotive', type: 'deal', value: 'Up to 30%', unit: 'OFF', title: 'Seasonal clearance on selected parts', exclusive: false, daysLeft: 2, url: '#' }
  ];

  var PAGE_SIZE = 8;

  /* ---------------- helpers ---------------- */
  var $ = function (sel) { return document.querySelector(sel); };

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function mask(code) { return code ? code.slice(0, 3) + '•'.repeat(Math.max(code.length - 3, 3)) : '••••••'; }

  function expiryLabel(d) {
    if (d === null) return { text: 'No end date', cls: '' };
    if (d <= 1) return { text: 'Ends today', cls: 'is-hot' };
    if (d <= 7) return { text: 'Ends in ' + d + ' days', cls: 'is-hot' };
    var date = new Date(); date.setDate(date.getDate() + d);
    return { text: 'Ends ' + date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }), cls: '' };
  }

  var CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>';
  var CLOCK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6v6l4 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/></svg>';

  // give each coupon a stable id (its position in the source list)
  COUPONS.forEach(function (c, i) { c.id = i; });

  /* ---------------- state ---------------- */
  var state = { term: '', category: 'All', type: 'all', exclusive: false, soon: false, sort: 'featured', shown: PAGE_SIZE };

  var categories = ['All'].concat(
    Array.from(new Set(COUPONS.map(function (c) { return c.category; }))).sort()
  );

  /* ---------------- filtering ---------------- */
  function filtered() {
    var t = state.term.trim().toLowerCase();
    var list = COUPONS.filter(function (c) {
      if (state.category !== 'All' && c.category !== state.category) return false;
      if (state.type !== 'all' && c.type !== state.type) return false;
      if (state.exclusive && !c.exclusive) return false;
      if (state.soon && !(c.daysLeft !== null && c.daysLeft <= 7)) return false;
      if (t && (c.store + ' ' + c.title).toLowerCase().indexOf(t) === -1) return false;
      return true;
    });
    if (state.sort === 'ending') {
      list.sort(function (a, b) {
        var x = a.daysLeft === null ? 9999 : a.daysLeft;
        var y = b.daysLeft === null ? 9999 : b.daysLeft;
        return x - y;
      });
    } else if (state.sort === 'az') {
      list.sort(function (a, b) { return a.store.localeCompare(b.store, 'en', { sensitivity: 'base' }); });
    }
    return list;
  }

  /* ---------------- rendering ---------------- */
  function renderHeroStats() {
    var codes = COUPONS.filter(function (c) { return c.type === 'code'; }).length;
    var deals = COUPONS.length - codes;
    var stores = new Set(COUPONS.map(function (c) { return c.store; })).size;
    var items = [
      [COUPONS.length, 'live offers'],
      [codes, 'promo codes'],
      [deals, 'deals'],
      [stores, 'stores']
    ];
    $('#heroStats').innerHTML = items.map(function (i) {
      return '<li><b>' + i[0] + '</b><span>' + i[1] + '</span></li>';
    }).join('');
  }

  function renderCotd() {
    // Coupon of the day: first exclusive code, else the first coupon
    var pick = COUPONS.filter(function (c) { return c.exclusive && c.type === 'code'; })[0] || COUPONS[0];
    var action = pick.type === 'code'
      ? '<button type="button" class="btn btn--light" data-reveal="' + pick.id + '">Reveal code</button>'
      : '<a href="' + esc(pick.url) + '" class="btn btn--light" rel="sponsored noopener" target="_blank">Get deal</a>';
    $('#cotd').innerHTML =
      '<div class="cotd__badge">Coupon of the day</div>' +
      '<div class="cotd__main"><div class="cotd__value">' + esc(pick.value) + '<small>' + esc(pick.unit) + '</small></div>' +
      '<div><h2 id="cotdTitle">' + esc(pick.store) + '</h2><p>' + esc(pick.title) + '</p></div></div>' +
      '<div class="cotd__action">' + action + '</div>';
  }

  function renderCategories() {
    $('#catList').innerHTML = categories.map(function (c) {
      var n = c === 'All' ? COUPONS.length : COUPONS.filter(function (x) { return x.category === c; }).length;
      var on = c === state.category;
      return '<button type="button" class="catbtn' + (on ? ' is-on' : '') + '" data-cat="' + esc(c) + '" aria-pressed="' + on + '">' +
        '<span>' + esc(c) + '</span><em>' + n + '</em></button>';
    }).join('');
  }

  function renderTypeSeg() {
    var opts = [['all', 'All'], ['code', 'Codes'], ['deal', 'Deals']];
    $('#typeSeg').innerHTML = opts.map(function (o) {
      var on = state.type === o[0];
      return '<button type="button" class="seg__btn' + (on ? ' is-on' : '') + '" data-type="' + o[0] + '" aria-pressed="' + on + '">' + o[1] + '</button>';
    }).join('');
  }

  function ticket(c) {
    var exp = expiryLabel(c.daysLeft);
    var action = c.type === 'code'
      ? '<div class="peek"><code>' + esc(mask(c.code)) + '</code>' +
        '<button type="button" class="btn" data-reveal="' + c.id + '">Reveal code</button></div>'
      : '<a href="' + esc(c.url) + '" class="btn btn--block0" rel="sponsored noopener" target="_blank">Get deal</a>';
    return '<article class="ticket">' +
      '<div class="ticket__stub"><b>' + esc(c.value) + '</b><span>' + esc(c.unit) + '</span></div>' +
      '<div class="ticket__body">' +
        '<div class="ticket__top"><span class="avatar">' + esc(c.store.charAt(0).toUpperCase()) + '</span>' +
        '<div><div class="ticket__store">' + esc(c.store) + '</div><div class="ticket__cat">' + esc(c.category) + '</div></div></div>' +
        '<h3 class="ticket__title">' + esc(c.title) + '</h3>' +
        '<div class="ticket__tags">' +
          '<span class="tag tag--ok">' + CHECK + 'Verified</span>' +
          (c.exclusive ? '<span class="tag tag--ex">Exclusive</span>' : '') +
          '<span class="tag tag--exp ' + exp.cls + '">' + CLOCK + exp.text + '</span>' +
          '<span class="tag tag--type">' + (c.type === 'code' ? 'Promo code' : 'Deal') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="ticket__cta">' + action + '</div>' +
    '</article>';
  }

  function render() {
    var list = filtered();
    var visible = list.slice(0, state.shown);
    $('#tickets').innerHTML = visible.map(ticket).join('');
    $('#ticketsEmpty').hidden = list.length > 0;
    $('#loadMore').hidden = list.length <= state.shown;
    $('#resultCount').innerHTML = '<b>' + list.length + '</b> ' + (list.length === 1 ? 'offer' : 'offers') +
      (state.category !== 'All' ? ' in ' + esc(state.category) : '');
  }

  function renderAll() { renderCategories(); renderTypeSeg(); render(); }

  /* ---------------- events ---------------- */
  $('#couponSearchForm').addEventListener('submit', function (e) { e.preventDefault(); });
  $('#couponSearch').addEventListener('input', function (e) { state.term = e.target.value; state.shown = PAGE_SIZE; render(); });

  $('#catList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]'); if (!b) return;
    state.category = b.getAttribute('data-cat'); state.shown = PAGE_SIZE; renderCategories(); render();
  });
  $('#typeSeg').addEventListener('click', function (e) {
    var b = e.target.closest('[data-type]'); if (!b) return;
    state.type = b.getAttribute('data-type'); state.shown = PAGE_SIZE; renderTypeSeg(); render();
  });
  $('#optExclusive').addEventListener('change', function (e) { state.exclusive = e.target.checked; state.shown = PAGE_SIZE; render(); });
  $('#optSoon').addEventListener('change', function (e) { state.soon = e.target.checked; state.shown = PAGE_SIZE; render(); });
  $('#sortBy').addEventListener('change', function (e) { state.sort = e.target.value; state.shown = PAGE_SIZE; render(); });
  $('#loadMore').addEventListener('click', function () { state.shown += PAGE_SIZE; render(); });

  $('#resetFilters').addEventListener('click', function () {
    state = { term: '', category: 'All', type: 'all', exclusive: false, soon: false, sort: 'featured', shown: PAGE_SIZE };
    $('#couponSearch').value = ''; $('#optExclusive').checked = false; $('#optSoon').checked = false; $('#sortBy').value = 'featured';
    renderAll();
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
    $('#modalDesc').textContent = c.title + '. Copy this code and paste it at checkout.';
    $('#modalCode').textContent = c.code;
    $('#modalGo').href = c.url || '#';
    $('#modalGo').textContent = 'Go to ' + c.store;
    $('#modalCopy').textContent = 'Copy';
    modal.hidden = false;
    $('#modalCopy').focus();
    copyText(c.code, function () { $('#modalCopy').textContent = 'Copied!'; });
  }
  function closeModal() { modal.hidden = true; if (lastFocus) lastFocus.focus(); }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-reveal]');
    if (b) openModal(COUPONS[Number(b.getAttribute('data-reveal'))]);
  });
  $('#modalCopy').addEventListener('click', function () {
    copyText($('#modalCode').textContent, function () { $('#modalCopy').textContent = 'Copied!'; });
  });
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  /* ---------------- mobile nav ---------------- */
  var toggle = $('#navToggle');
  var nav = $('#mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* ---------------- init ---------------- */
  renderHeroStats();
  renderCotd();
  renderAll();
  $('#year').textContent = new Date().getFullYear();
})();
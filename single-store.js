/* ==========================================================
   OzSaver – single store page
   Replace STORE and OFFERS with data from your backend.
   ========================================================== */
(function () {
  'use strict';

  var STORE = { name: 'Emma Sleep', category: 'Home & Garden', url: '#' };

  // type: 'code' | 'deal'   days: days until it ends (null = no end date)
  var OFFERS = [
    { value: '15%', unit: 'OFF', type: 'code', code: 'SAMPLE15', title: 'Mattresses and bedding bundles', days: 3, exclusive: false, used: 212, featured: 1 },
    { value: '25%', unit: 'OFF', type: 'code', code: 'SAMPLE25', title: 'Pillows and sheet sets, online only', days: 9, exclusive: true, used: 178, featured: 2 },
    { value: 'Free', unit: 'DELIVERY', type: 'deal', code: '', title: 'Free delivery on eligible Australian orders', days: null, exclusive: false, used: 341, featured: 3 },
    { value: '10%', unit: 'OFF', type: 'code', code: 'WELCOME10', title: 'Extra savings on your first order', days: 30, exclusive: false, used: 96, featured: 4 },
    { value: '20%', unit: 'OFF', type: 'deal', code: '', title: 'Seasonal sale on selected mattresses', days: 14, exclusive: false, used: 154, featured: 5 },
    { value: '$50', unit: 'OFF', type: 'code', code: 'SAVE50', title: 'Save when you spend over $500', days: null, exclusive: false, used: 67, featured: 6 }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var state = { filter: 'all', sort: 'featured' };
  var lastFocus = null;

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mask(code) { return esc(code.slice(0, 3)) + '••••••'; }
  function endsText(d) { return d === null ? 'No end date' : 'Ends in ' + d + ' day' + (d === 1 ? '' : 's'); }

  /* ---------- Offer cards ---------- */
  function card(o, i) {
    var best = o.featured === 1;
    var tags = '<span class="sp-badge sp-badge--ok">✓ Verified</span>' +
      (o.exclusive ? '<span class="sp-badge sp-badge--amber">Exclusive</span>' : '') +
      '<span class="sp-badge ' + (o.days !== null && o.days <= 7 ? 'sp-badge--hot' : 'sp-badge--mute') + '">' + endsText(o.days) + '</span>' +
      '<span class="sp-badge">' + (o.type === 'code' ? 'Promo code' : 'Deal') + '</span>';
    var cta = o.type === 'code'
      ? '<div class="sp-peek"><code>' + mask(o.code) + '</code><button type="button" class="btn" data-i="' + i + '">Reveal code</button></div>'
      : '<button type="button" class="btn" data-i="' + i + '">Get deal</button>';
    return '<article class="sp-offer' + (best ? ' sp-offer--best' : '') + '">' +
      (best ? '<span class="sp-ribbon">Best offer</span>' : '') +
      '<div class="sp-stub"><b>' + esc(o.value) + '</b><span>' + esc(o.unit) + '</span></div>' +
      '<div class="sp-body"><h3>' + esc(o.title) + '</h3><div class="sp-tags">' + tags + '</div>' +
      '<p class="sp-used">Used ' + o.used + ' times</p></div>' +
      '<div class="sp-cta">' + cta + '<small>' + (o.type === 'code' ? 'Copied automatically' : 'No code needed') + '</small></div></article>';
  }

  function visible() {
    var list = OFFERS.filter(function (o) { return state.filter === 'all' || o.type === state.filter; });
    list.sort(function (a, b) {
      if (state.sort === 'ending') return (a.days === null ? 999 : a.days) - (b.days === null ? 999 : b.days);
      if (state.sort === 'used') return b.used - a.used;
      return a.featured - b.featured;
    });
    return list;
  }

  function render() {
    var list = visible();
    $('offerCount').textContent = list.length;
    $('offerList').innerHTML = list.length
      ? list.map(function (o) { return card(o, OFFERS.indexOf(o)); }).join('')
      : '<p class="sp-empty">No offers in this view. Try another tab.</p>';
  }

  function renderStats() {
    var codes = OFFERS.filter(function (o) { return o.type === 'code'; }).length;
    $('statOffers').textContent = OFFERS.length;
    $('statCodes').textContent = codes;
    $('nAll').textContent = OFFERS.length;
    $('nCode').textContent = codes;
    $('nDeal').textContent = OFFERS.length - codes;
    $('offerTable').innerHTML = OFFERS.slice().sort(function (a, b) { return a.featured - b.featured; }).slice(0, 5).map(function (o) {
      return '<tr><td>' + esc(o.value) + ' ' + esc(o.unit.toLowerCase()) + '</td><td>' + esc(o.title) + '</td><td>' +
        (o.code ? '<code>' + esc(o.code) + '</code>' : 'No code needed') + '</td><td>' + (o.days === null ? 'No end date' : 'In ' + o.days + ' days') + '</td></tr>';
    }).join('');
  }

  /* ---------- Modal ---------- */
  var modal = $('codeModal');

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) { return navigator.clipboard.writeText(text).catch(function () {}); }
    var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(t);
    return Promise.resolve();
  }

  function openModal(o) {
    lastFocus = document.activeElement;
    var btn = $('modalCopy');
    $('modalStore').textContent = STORE.name;
    $('modalTitle').textContent = o.value + ' ' + o.unit;
    $('modalGo').textContent = 'Go to ' + STORE.name;
    $('modalGo').href = STORE.url;
    if (o.type === 'code') {
      $('modalDesc').textContent = o.title + '. Copy this code and paste it at checkout.';
      $('modalCodeWrap').hidden = false;
      $('modalCode').textContent = o.code;
      btn.textContent = 'Copy';
      btn.onclick = function () { copy(o.code).then(function () { btn.textContent = 'Copied!'; }); };
      copy(o.code).then(function () { btn.textContent = 'Copied!'; });
    } else {
      $('modalDesc').textContent = o.title + '. No code needed, the deal applies when you shop through our link.';
      $('modalCodeWrap').hidden = true;
    }
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('modalClose').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $('offerList').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-i]');
    if (b) openModal(OFFERS[+b.dataset.i]);
  });
  $('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  /* ---------- Tabs and sort ---------- */
  document.querySelectorAll('.sp-tab').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.sp-tab').forEach(function (x) { x.classList.remove('is-on'); });
      b.classList.add('is-on');
      state.filter = b.dataset.f;
      render();
    });
  });
  $('sortSel').addEventListener('change', function (e) { state.sort = e.target.value; render(); });

  /* ---------- Header, alerts, newsletter, year ---------- */
  var toggle = $('navToggle'), nav = $('mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });

  $('alertBtn').addEventListener('click', function () { this.textContent = '✓ Alerts on for ' + STORE.name; });

  $('sideForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = $('sideEmail').value.trim(), msg = $('sideMsg');
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { msg.className = 'sp-msg is-ok'; msg.textContent = 'Thanks, you’re subscribed.'; $('sideEmail').value = ''; }
    else { msg.className = 'sp-msg is-error'; msg.textContent = 'Enter a valid email address.'; }
  });

  $('year').textContent = new Date().getFullYear();

  renderStats();
  render();
})();
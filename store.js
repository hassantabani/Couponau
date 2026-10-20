/* ==========================================================
   OzSaver – Stores A–Z page
   Replace the STORES array with your database / API data.
   Each store: { name, category, url }
   Sorting, grouping, the A–Z bar, search and category filter
   are all handled below.
   ========================================================== */

(function () {
  'use strict';

  /* ---------------- DATA (sample – replace) ---------------- */
  var STORES = [
    { name: '12Go Asia', category: 'Travel', url: '#' },
    { name: 'Acquaboss', category: 'Sports & Fitness', url: '#' },
    { name: 'Aimee Provence', category: 'Home & Garden', url: '#' },
    { name: 'ASOBIO', category: 'Health & Beauty', url: '#' },
    { name: 'Bellroy', category: 'Fashion', url: '#' },
    { name: 'Booking.com', category: 'Travel', url: '#' },
    { name: 'Cupshe', category: 'Fashion', url: '#' },
    { name: 'Dailygreatness', category: 'Health & Beauty', url: '#' },
    { name: 'Drywater', category: 'Food & Drink', url: '#' },
    { name: 'Elite Supps', category: 'Health & Beauty', url: '#' },
    { name: 'Emma Sleep', category: 'Home & Garden', url: '#' },
    { name: 'Epzen', category: 'Health & Beauty', url: '#' },
    { name: 'Fantastic Furniture', category: 'Home & Garden', url: '#' },
    { name: 'Flying Blue', category: 'Travel', url: '#' },
    { name: 'Frank Body', category: 'Health & Beauty', url: '#' },
    { name: 'Garden of Wellness', category: 'Health & Beauty', url: '#' },
    { name: 'H10 Hotels', category: 'Travel', url: '#' },
    { name: 'Heys', category: 'Fashion', url: '#' },
    { name: 'Homary', category: 'Home & Garden', url: '#' },
    { name: 'Kaka Auto Parts', category: 'Automotive', url: '#' },
    { name: 'Kiwi.com', category: 'Travel', url: '#' },
    { name: 'LightInTheBox', category: 'Fashion', url: '#' },
    { name: 'On Trend Beauty', category: 'Health & Beauty', url: '#' },
    { name: 'Portta', category: 'Electronics', url: '#' },
    { name: 'Sportsbreaks', category: 'Sports & Fitness', url: '#' },
    { name: 'Sweat', category: 'Sports & Fitness', url: '#' },
    { name: 'Tineco', category: 'Electronics', url: '#' },
    { name: 'Uperfect', category: 'Electronics', url: '#' },
    { name: 'Vida Glow', category: 'Health & Beauty', url: '#' }
  ];

  var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  /* ---------------- helpers ---------------- */
  var $ = function (sel) { return document.querySelector(sel); };

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Sort key: ignore case and a leading "The "
  function sortKey(name) { return name.toLowerCase().replace(/^the\s+/, ''); }

  // Group letter: A–Z, or "#" for names starting with a digit/symbol
  function groupOf(name) {
    var ch = sortKey(name).charAt(0).toUpperCase();
    return /[A-Z]/.test(ch) ? ch : '#';
  }

  function sortedStores(list) {
    return list.slice().sort(function (a, b) {
      return sortKey(a.name).localeCompare(sortKey(b.name), 'en', { numeric: true, sensitivity: 'base' });
    });
  }

  /* ---------------- state ---------------- */
  var state = { term: '', category: 'All' };

  var categories = ['All'].concat(
    Array.from(new Set(STORES.map(function (s) { return s.category; }))).sort()
  );

  /* ---------------- rendering ---------------- */
  function filtered() {
    var t = state.term.trim().toLowerCase();
    return STORES.filter(function (s) {
      var okCat = state.category === 'All' || s.category === state.category;
      var okTerm = !t || s.name.toLowerCase().indexOf(t) !== -1;
      return okCat && okTerm;
    });
  }

  function renderCategories() {
    $('#catFilter').innerHTML = categories.map(function (c) {
      var on = c === state.category;
      return '<button type="button" class="chip' + (on ? ' is-on' : '') + '" data-cat="' + esc(c) + '" aria-pressed="' + on + '">' + esc(c) + '</button>';
    }).join('');
  }

  function render() {
    var list = sortedStores(filtered());
    var groups = {};
    list.forEach(function (s) {
      var g = groupOf(s.name);
      (groups[g] = groups[g] || []).push(s);
    });

    // A–Z bar (letters with no stores are disabled)
    var barLetters = LETTERS.concat(groups['#'] ? ['#'] : []);
    $('#azList').innerHTML = barLetters.map(function (L) {
      return groups[L]
        ? '<a href="#letter-' + (L === '#' ? 'num' : L) + '" class="az__item">' + L + '</a>'
        : '<span class="az__item is-off" aria-disabled="true">' + L + '</span>';
    }).join('');

    // Sections
    var order = Object.keys(groups).sort(function (a, b) {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b);
    });

    $('#storesList').innerHTML = order.map(function (L) {
      var id = 'letter-' + (L === '#' ? 'num' : L);
      var items = groups[L].map(function (s) {
        return '<a href="' + esc(s.url) + '" class="store-row">' +
          '<span class="avatar">' + esc(s.name.charAt(0).toUpperCase()) + '</span>' +
          '<span class="store-row__text"><b>' + esc(s.name) + '</b><small>' + esc(s.category) + '</small></span>' +
          '<span class="store-row__go" aria-hidden="true">→</span></a>';
      }).join('');
      return '<section class="letter-block" id="' + id + '" aria-labelledby="' + id + '-h">' +
        '<h2 class="letter-block__title" id="' + id + '-h">' + L + '</h2>' +
        '<div class="letter-block__grid">' + items + '</div></section>';
    }).join('');

    $('#storesEmpty').hidden = list.length > 0;
    $('#storeCount').textContent = list.length + (list.length === 1 ? ' store' : ' stores');
  }

  /* ---------------- events ---------------- */
  $('#storeSearchForm').addEventListener('submit', function (e) { e.preventDefault(); });
  $('#storeSearch').addEventListener('input', function (e) {
    state.term = e.target.value;
    render();
  });
  $('#catFilter').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cat]');
    if (!btn) return;
    state.category = btn.getAttribute('data-cat');
    renderCategories();
    render();
  });

  // Mobile nav
  var toggle = $('#navToggle');
  var nav = $('#mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* ---------------- init ---------------- */
  renderCategories();
  render();
  $('#year').textContent = new Date().getFullYear();
})();
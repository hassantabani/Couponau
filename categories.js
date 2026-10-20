/* ==========================================================
   OzSaver – Categories page
   Replace the CATEGORIES array with your database / API data.
   Each category:
     name, desc, icon (SVG path), stores (top store names),
     featured (true = shown as a large tile), bg (tile colour)
   Each card links to coupons.html?category=<name>.
   ========================================================== */

(function () {
  'use strict';

  /* ---------------- DATA (sample – replace) ---------------- */
  var CATEGORIES = [
    { name: 'Travel', featured: true, bg: '#0B2A6F', desc: 'Flights, hotels and holiday packages for your next trip.', stores: ['Booking.com', 'Kiwi.com', '12Go Asia', 'Flying Blue'], icon: 'M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z' },
    { name: 'Fashion', featured: true, bg: '#123A99', desc: 'Clothing, swimwear, bags and accessories.', stores: ['Bellroy', 'Cupshe', 'Heys', 'LightInTheBox'], icon: 'M8 3l-5 3 2 4 3-1v11h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z' },
    { name: 'Health & Beauty', featured: true, bg: '#1A44A8', desc: 'Skincare, supplements and wellness essentials.', stores: ['Frank Body', 'ASOBIO', 'Elite Supps', 'Vida Glow'], icon: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z' },
    { name: 'Electronics', desc: 'Gadgets, smart home and everyday tech.', stores: ['Tineco', 'Portta', 'Uperfect'], icon: 'M4 5h16v11H4zM2 20h20' },
    { name: 'Home & Garden', desc: 'Furniture, bedding and outdoor living.', stores: ['Emma Sleep', 'Fantastic Furniture', 'Homary', 'Aimee Provence'], icon: 'M3 11l9-8 9 8v10h-6v-6H9v6H3z' },
    { name: 'Food & Drink', desc: 'Groceries, meal kits, coffee and more.', stores: ['Drywater'], icon: 'M5 8h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2' },
    { name: 'Sports & Fitness', desc: 'Activewear, equipment and training apps.', stores: ['Sweat', 'Acquaboss', 'Sportsbreaks'], icon: 'M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12' },
    { name: 'Automotive', desc: 'Car parts, accessories and servicing.', stores: ['Kaka Auto Parts'], icon: 'M3 13l2-6h14l2 6v5h-3a2 2 0 0 1-4 0H10a2 2 0 0 1-4 0H3zM3 13h18' },
    { name: 'Pets', desc: 'Food, toys and care for cats and dogs.', stores: [], icon: 'M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z' },
    { name: 'Baby & Kids', desc: 'Clothing, gear and toys for little ones.', stores: [], icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01' },
    { name: 'Education & Books', desc: 'Courses, textbooks and learning tools.', stores: [], icon: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M9 7h6' },
    { name: 'Insurance', desc: 'Compare cover for car, home, health and travel.', stores: [], icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z' }
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
  function link(c) { return 'coupons.html?category=' + encodeURIComponent(c.name); }

  function storeChips(list, max) {
    if (!list.length) return '<span class="cc__soon">New offers coming soon</span>';
    var shown = list.slice(0, max).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('');
    var more = list.length > max ? '<span class="cc__more">+' + (list.length - max) + '</span>' : '';
    return shown + more;
  }

  /* ---------------- rendering ---------------- */
  function renderFeatured() {
    var list = CATEGORIES.filter(function (c) { return c.featured; });
    $('#featGrid').innerHTML = list.map(function (c) {
      return '<a href="' + esc(link(c)) + '" class="feat" style="background:' + esc(c.bg) + '">' +
        '<span class="feat__bgicon" aria-hidden="true">' + icon(c.icon, 180, 1) + '</span>' +
        '<span class="feat__icon">' + icon(c.icon, 30, 1.8) + '</span>' +
        '<div class="feat__text"><h3>' + esc(c.name) + '</h3><p>' + esc(c.desc) + '</p></div>' +
        '<div class="feat__stores">' + storeChips(c.stores, 3) + '</div>' +
        '<span class="feat__go">Browse offers <b aria-hidden="true">→</b></span></a>';
    }).join('');
  }

  function renderCards(list) {
    $('#catCards').innerHTML = list.map(function (c) {
      return '<a href="' + esc(link(c)) + '" class="cc">' +
        '<div class="cc__icon">' + icon(c.icon, 28, 1.8) + '</div>' +
        '<div class="cc__body"><h3>' + esc(c.name) + '</h3><p>' + esc(c.desc) + '</p>' +
        '<div class="cc__stores">' + storeChips(c.stores, 3) + '</div></div>' +
        '<span class="cc__arrow" aria-hidden="true">→</span></a>';
    }).join('');
    $('#catEmpty').hidden = list.length > 0;
    $('#catCount').textContent = list.length + (list.length === 1 ? ' category' : ' categories');
  }

  /* ---------------- search ---------------- */
  function applySearch(term) {
    term = term.trim().toLowerCase();
    var list = !term ? CATEGORIES : CATEGORIES.filter(function (c) {
      return (c.name + ' ' + c.desc + ' ' + c.stores.join(' ')).toLowerCase().indexOf(term) !== -1;
    });
    // hide the featured block while searching so results are the focus
    $('#featuredSection').hidden = !!term;
    $('#allTitle').textContent = term ? 'Search results' : 'All categories';
    renderCards(list);
  }

  $('#catSearchForm').addEventListener('submit', function (e) { e.preventDefault(); });
  $('#catSearch').addEventListener('input', function (e) { applySearch(e.target.value); });

  /* ---------------- mobile nav ---------------- */
  var toggle = $('#navToggle');
  var nav = $('#mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* ---------------- init ---------------- */
  renderFeatured();
  renderCards(CATEGORIES);
  $('#year').textContent = new Date().getFullYear();
})();
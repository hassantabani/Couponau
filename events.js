/* ==========================================================
   OzSaver – Events page
   Replace the EVENTS array with your database / API data.
   Each event:
     name, date (ISO, Australian Eastern time), group, desc,
     category (links to coupons.html?category=...), big (true =
     eligible for the "next big sale" countdown)
   Past events are hidden automatically. Update dates each year.
   ========================================================== */

(function () {
  'use strict';

  /* ---------------- DATA (sample – check/replace dates) ---------------- */
  var EVENTS = [
    { name: 'Singles’ Day',         date: '2026-11-11T00:00:00+11:00', group: 'Mega sales', big: true,  desc: 'Large online sales on 11 November, popular for electronics, fashion and home.', category: 'Electronics' },
    { name: 'Black Friday',         date: '2026-11-27T00:00:00+11:00', group: 'Mega sales', big: true,  desc: 'The biggest shopping weekend of the year, with deep discounts across almost every category.', category: 'Fashion' },
    { name: 'Cyber Monday',         date: '2026-11-30T00:00:00+11:00', group: 'Mega sales', big: true,  desc: 'Online-only offers on tech, gadgets and software to close out the weekend.', category: 'Electronics' },
    { name: 'Christmas',            date: '2026-12-25T00:00:00+11:00', group: 'Holidays',   big: false, desc: 'Gift guides, delivery cut-offs and festive offers in the lead-up to the 25th.', category: 'Home & Garden' },
    { name: 'Boxing Day',           date: '2026-12-26T00:00:00+11:00', group: 'Mega sales', big: true,  desc: 'Post-Christmas clearance, with many stores running sales through the week.', category: 'Fashion' },
    { name: 'New Year',             date: '2027-01-01T00:00:00+11:00', group: 'Holidays',   big: false, desc: 'Fresh-start deals on fitness, travel and wellness.', category: 'Sports & Fitness' },
    { name: 'Australia Day',        date: '2027-01-26T00:00:00+11:00', group: 'Holidays',   big: false, desc: 'Long-weekend sales from local and national retailers.', category: 'Home & Garden' },
    { name: 'Valentine’s Day',      date: '2027-02-14T00:00:00+11:00', group: 'Gifting',    big: false, desc: 'Gifts, flowers, beauty and dinner-for-two offers.', category: 'Health & Beauty' },
    { name: 'Easter',               date: '2027-03-28T00:00:00+11:00', group: 'Holidays',   big: false, desc: 'Four-day weekend sales on travel, homewares and treats.', category: 'Travel' },
    { name: 'Mother’s Day',         date: '2027-05-09T00:00:00+10:00', group: 'Gifting',    big: false, desc: 'Gift ideas and discounts on beauty, jewellery and experiences.', category: 'Health & Beauty' },
    { name: 'End of Financial Year', date: '2027-06-30T00:00:00+10:00', group: 'Mega sales', big: true,  desc: 'EOFY clearance across tech, furniture and business equipment.', category: 'Electronics' },
    { name: 'Father’s Day',         date: '2027-09-05T00:00:00+10:00', group: 'Gifting',    big: false, desc: 'Gift ideas for dad: tech, tools, sport and grooming.', category: 'Electronics' }
  ];

  var TIPS = [
    { title: 'Make a wish list', text: 'Decide what you actually need first, so a big discount doesn’t become an impulse buy.' },
    { title: 'Check regular prices', text: 'Note today’s price for the items you want, then compare when the sale starts.' },
    { title: 'Have your code ready', text: 'Find the store on OzSaver beforehand and copy a verified code to paste at checkout.' }
  ];

  /* ---------------- helpers ---------------- */
  var $ = function (sel) { return document.querySelector(sel); };

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return String(n).padStart(2, '0'); }

  var now = Date.now();
  var upcoming = EVENTS
    .map(function (e) { e.time = new Date(e.date).getTime(); return e; })
    .filter(function (e) { return e.time > now; })
    .sort(function (a, b) { return a.time - b.time; });

  function daysAway(t) {
    var d = Math.ceil((t - Date.now()) / 86400000);
    if (d <= 1) return 'Tomorrow';
    if (d <= 60) return 'In ' + d + ' days';
    var months = Math.round(d / 30);
    return 'In about ' + months + ' months';
  }

  /* ---------------- countdown ---------------- */
  var target = upcoming.filter(function (e) { return e.big; })[0] || upcoming[0];

  function renderCountdown() {
    var box = $('#countdown');
    if (!target) {
      box.innerHTML = '<div class="countdown__label">Sale calendar</div><h2 id="cdName">New dates coming soon</h2>';
      return;
    }
    var when = new Date(target.date).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    box.innerHTML =
      '<div class="countdown__label">Next big sale</div>' +
      '<h2 id="cdName">' + esc(target.name) + '</h2>' +
      '<p class="countdown__date">' + esc(when) + '</p>' +
      '<div class="countdown__timer" role="timer">' +
        '<div><b id="cdD">00</b><span>Days</span></div>' +
        '<div><b id="cdH">00</b><span>Hours</span></div>' +
        '<div><b id="cdM">00</b><span>Mins</span></div>' +
        '<div><b id="cdS">00</b><span>Secs</span></div>' +
      '</div>' +
      '<a class="countdown__link" href="coupons.html?category=' + encodeURIComponent(target.category) + '">See early deals →</a>';
    tick();
    setInterval(tick, 1000);
  }

  function tick() {
    var diff = Math.max(0, target.time - Date.now());
    var s = Math.floor(diff / 1000);
    $('#cdD').textContent = pad(Math.floor(s / 86400));
    $('#cdH').textContent = pad(Math.floor((s % 86400) / 3600));
    $('#cdM').textContent = pad(Math.floor((s % 3600) / 60));
    $('#cdS').textContent = pad(s % 60);
  }

  /* ---------------- filter + calendar ---------------- */
  var groups = ['All'].concat(Array.from(new Set(upcoming.map(function (e) { return e.group; }))));
  var active = 'All';

  function renderFilter() {
    $('#evFilter').innerHTML = groups.map(function (g) {
      var on = g === active;
      return '<button type="button" class="chip' + (on ? ' is-on' : '') + '" data-group="' + esc(g) + '" aria-pressed="' + on + '">' + esc(g) + '</button>';
    }).join('');
  }

  function renderList() {
    var list = upcoming.filter(function (e) { return active === 'All' || e.group === active; });
    var byMonth = {};
    var order = [];
    list.forEach(function (e) {
      var key = new Date(e.date).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
      if (!byMonth[key]) { byMonth[key] = []; order.push(key); }
      byMonth[key].push(e);
    });

    $('#evList').innerHTML = order.map(function (m) {
      var cards = byMonth[m].map(function (e) {
        var d = new Date(e.date);
        var day = d.toLocaleDateString('en-AU', { day: 'numeric' });
        var mon = d.toLocaleDateString('en-AU', { month: 'short' }).toUpperCase();
        var isNext = target && e === target;
        return '<article class="evt' + (isNext ? ' evt--next' : '') + '">' +
          '<div class="evt__date"><b>' + day + '</b><span>' + mon + '</span></div>' +
          '<div class="evt__body">' +
            '<div class="evt__tags"><span class="tag tag--type">' + esc(e.group) + '</span>' +
            '<span class="evt__away">' + daysAway(e.time) + '</span>' +
            (isNext ? '<span class="tag tag--ex">Next big sale</span>' : '') + '</div>' +
            '<h3>' + esc(e.name) + '</h3><p>' + esc(e.desc) + '</p>' +
          '</div>' +
          '<a class="btn btn--sm evt__btn" href="coupons.html?category=' + encodeURIComponent(e.category) + '">View deals</a>' +
        '</article>';
      }).join('');
      return '<section class="evmonth" aria-label="' + esc(m) + '"><h2 class="evmonth__title">' + esc(m) + '</h2><div class="evmonth__list">' + cards + '</div></section>';
    }).join('');

    $('#evEmpty').hidden = list.length > 0;
  }

  $('#evFilter').addEventListener('click', function (e) {
    var b = e.target.closest('[data-group]');
    if (!b) return;
    active = b.getAttribute('data-group');
    renderFilter();
    renderList();
  });

  /* ---------------- tips ---------------- */
  $('#tipSteps').innerHTML = TIPS.map(function (t, i) {
    return '<div class="step"><div class="step__n">' + (i + 1) + '</div><h3>' + esc(t.title) + '</h3><p>' + esc(t.text) + '</p></div>';
  }).join('');

  /* ---------------- mobile nav ---------------- */
  var toggle = $('#navToggle');
  var nav = $('#mainNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* ---------------- init ---------------- */
  renderCountdown();
  renderFilter();
  renderList();
  $('#year').textContent = new Date().getFullYear();
})();
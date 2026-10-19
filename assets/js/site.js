(function () {
    'use strict';
    var root = document.documentElement;

    // Theme toggle (default is dark; choice is remembered)
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('sl-theme', next); } catch (e) { /* storage unavailable */ }
            toggle.setAttribute('aria-pressed', next === 'light');
        });
    }

    // Mobile menu
    var menuBtn = document.querySelector('.menu-toggle');
    var links = document.querySelector('.nav-links');
    if (menuBtn && links) {
        menuBtn.addEventListener('click', function () {
            var open = links.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', open);
        });
        links.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
        });
    }

    // Scroll reveal
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
            });
        }, { threshold: 0.12 });
        items.forEach(function (el) { io.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add('visible'); });
    }

    // Screenshot lightbox
    var lb = document.querySelector('.lightbox');
    if (lb) {
        var lbImg = lb.querySelector('img');
        document.querySelectorAll('[data-zoom]').forEach(function (el) {
            el.addEventListener('click', function () {
                lbImg.src = el.getAttribute('data-zoom');
                lbImg.alt = el.querySelector('img').alt;
                lb.classList.add('open');
            });
        });
        var close = function () { lb.classList.remove('open'); };
        lb.addEventListener('click', close);
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    }

    // FAQ search + deep-link open
    var search = document.querySelector('.faq-search');
    if (search) {
        search.addEventListener('input', function () {
            var q = search.value.trim().toLowerCase();
            document.querySelectorAll('details.faq').forEach(function (d) {
                d.style.display = !q || d.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
            });
        });
    }
    if (location.hash) {
        var target = document.querySelector(location.hash);
        if (target && target.tagName === 'DETAILS') { target.open = true; }
    }
})();

// ===============================
// AIBATTLE — MAIN JS (FULL)
// Menu: 3 page links only (no anchors)
// ===============================

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------
     Tabs (only if they exist on page)
  ----------------------------- */
  const tabBtns = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length && tabContents.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const target = document.getElementById(targetTab);
        if (target) target.classList.add('active');
      });
    });
  }

  /* -----------------------------
     FAQ accordion (only if exists)
  ----------------------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;

    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });

  /* -----------------------------
     Header background on scroll (optional)
  ----------------------------- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.background =
        window.scrollY > 100
          ? 'rgba(0,0,0,0.95)'
          : 'rgba(0,0,0,0.8)';
    });
  }

  /* -----------------------------
     Intersection animations (optional)
  ----------------------------- */
  const animated = document.querySelectorAll(
    '.step-item, .battle-card, .place-card, .why-card, .earnings-card'
  );

  if (animated.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    animated.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }

  /* -----------------------------
     Countdown (only if exists on page)
     Deadline: 23 Dec 12:00
  ----------------------------- */
  const battleDate = new Date('2025-12-23T12:00:00');
  const prev = {};

  function updateCountdown() {
    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    // Если на странице нет счетчика — выходим (на rating/battle его может не быть)
    if (!elDays || !elHours || !elMinutes || !elSeconds) return;

    const now = new Date();
    const diff = battleDate - now;

    if (diff <= 0) {
      [elDays, elHours, elMinutes, elSeconds].forEach(el => (el.textContent = '00'));
      return;
    }

    const t = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      minutes: Math.floor(diff / 60000) % 60,
      seconds: Math.floor(diff / 1000) % 60
    };

    Object.entries(t).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (!el) return;

      const v = String(val).padStart(2, '0');
      if (prev[id] !== v) {
        el.classList.add('flip-animation');
        setTimeout(() => {
          el.textContent = v;
          el.classList.remove('flip-animation');
        }, 300);
        prev[id] = v;
      }
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* -----------------------------
     Stats animation (only if exists)
  ----------------------------- */
  const statsRoot = document.querySelector('.hero-stats');
  const stats = document.querySelectorAll('.stat-value');

  if (statsRoot && stats.length) {
    let done = false;
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        stats.forEach(stat => {
          const end = parseInt(stat.textContent.replace(/\D/g, ''));
          const suffix = stat.textContent.replace(/\d/g, '');
          let cur = 0;
          const step = end / 50;

          const timer = setInterval(() => {
            cur += step;
            if (cur >= end) {
              stat.textContent = end + suffix;
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(cur) + suffix;
            }
          }, 30);
        });
      }
    }, { threshold: 0.5 }).observe(statsRoot);
  }

  /* -----------------------------
     NAV: Active link + Burger
     (works for menu with 3 page links)
  ----------------------------- */

  const body = document.body;
  const burger = document.querySelector('.nav-burger');
  const menu = document.querySelector('.nav-menu');

  // --- Active link ---
  const normalizePath = (p) => {
    const name = (p.split('/').pop() || '').toLowerCase();
    return name === '' ? 'index.html' : name;
  };

  const currentPage = normalizePath(location.pathname);

  document.querySelectorAll('.nav-menu a').forEach(a => {
    const hrefRaw = (a.getAttribute('href') || '').trim();
    if (!hrefRaw) return;

    // берем только файл (без параметров и #)
    const hrefClean = hrefRaw.split('?')[0].split('#')[0];
    const targetPage = normalizePath(hrefClean);

    if (targetPage === currentPage) a.classList.add('active');
    else a.classList.remove('active');
  });

  // --- Burger open/close ---
  const openMenu = () => body.classList.add('nav-open');
  const closeMenu = () => body.classList.remove('nav-open');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      body.classList.toggle('nav-open');
    });

    // закрывать по клику на пункт меню
    menu.addEventListener('click', e => {
      if (e.target.closest('a')) closeMenu();
    });

    // закрывать по Esc
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });

    // закрывать по клику вне меню
    document.addEventListener('click', e => {
      if (!body.classList.contains('nav-open')) return;
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        closeMenu();
      }
    });

    // закрывать если ушли в десктоп
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

});

/* ==========================================================
   Ресурс поруч — спільний скрипт
   Шапка, меню, пошук, анімації банерів, завантаження фото
   ========================================================== */
(() => {
  'use strict';

  /* ---------- Сторінки сайту (єдине джерело правди) ---------- */
  const PAGES = [
    { key: 'home',          href: 'index.html',          title: 'Головна',                         kw: 'ресурс поруч підтримка викладач студент' },
    { key: 'basic',         href: 'basic-ph.html',       title: 'Про модель BASIC Ph',             kw: 'модель lahad leykin шість сфер ментальне здоров’я' },
    { key: 'physical',      href: 'physical.html',       title: 'Physical — Тіло',                 kw: 'тіло сон харчування рух спорт', group: 'basic', icon: 'dumbbell', short: 'Тіло' },
    { key: 'belief',        href: 'belief-values.html',  title: 'Belief & Values — Віра і цінності', kw: 'віра цінності духовність місія', group: 'basic', icon: 'lotus', short: 'Віра і цінності' },
    { key: 'affect',        href: 'affect.html',         title: 'Affect — Емоції та почуття',      kw: 'емоції почуття баланс', group: 'basic', icon: 'heart', short: 'Емоції та почуття' },
    { key: 'socialization', href: 'socialization.html',  title: 'Socialization — Соціальні зв’язки', kw: 'соціальні зв’язки підтримка друзі', group: 'basic', icon: 'people', short: 'Соціальні зв’язки' },
    { key: 'imagination',   href: 'imagination.html',    title: 'Imagination — Уява',              kw: 'уява творчість мистецтво хобі', group: 'basic', icon: 'star', short: 'Уява' },
    { key: 'cognition',     href: 'cognition.html',      title: 'Cognition — Розум і пізнання',    kw: 'розум пізнання знання навчання', group: 'basic', icon: 'brain', short: 'Розум і пізнання' },
    { key: 'publications',  href: 'publications.html',   title: 'Публікації',                      kw: 'статті поради матеріали конференції' },
    { key: 'contacts',      href: 'contacts.html',       title: 'Контакти',                        kw: 'телефон пошта адреса зв’язок' }
  ];

  /* ---------- Іконки (stroke, viewBox 24) ---------- */
  const ICONS = {
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
    lotus: '<path d="M12 20c-3.2-1-5.2-3.8-5.2-7 2.2 0 4.2 1.1 5.2 3 1-1.9 3-3 5.2-3 0 3.2-2 6-5.2 7z"/><path d="M12 16c-1.6-2.2-1.6-5.4 0-9.5 1.6 4.1 1.6 7.3 0 9.5z"/>',
    brain: '<path d="M9.5 4.5A2.8 2.8 0 0 0 6.8 7 3 3 0 0 0 5 12a3 3 0 0 0 1.5 4.6 2.8 2.8 0 0 0 5.5.9V5.2a2.8 2.8 0 0 0-2.5-.7z"/><path d="M14.5 4.5A2.8 2.8 0 0 1 17.2 7 3 3 0 0 1 19 12a3 3 0 0 1-1.5 4.6 2.8 2.8 0 0 1-5.5.9"/><path d="M9 10h1.5M13.5 10H15M9 14h1.5M13.5 14H15"/>',
    people: '<path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 19c0-3 2.7-5 6-5s6 2 6 5M16.5 11a2.5 2.5 0 1 0 0-5M17.5 14c2.2.3 3.5 2 3.5 4"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    leaf: '<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14z"/><path d="M5 19c3-5 6-8 10-10"/>',
    puzzle: '<path d="M10 4a2 2 0 1 1 4 0v2h4v4h-2a2 2 0 1 0 0 4h2v4h-4v-2a2 2 0 1 0-4 0v2H6v-4h2a2 2 0 1 0 0-4H6V6h4z"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 0 0 4-4c0-5-4.5-10-9-10z"/><path d="M7.5 11h.01M10 7.5h.01M14.5 7.5h.01"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
    smile: '<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M8.5 14c1 1.5 2.2 2 3.5 2s2.5-.5 3.5-2M9 9.5h.01M15 9.5h.01"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    home: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',
    model: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3 6.3 17.7"/>',
    news: '<path d="M5 4h11a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3z"/><path d="M9 8h6M9 12h6M9 16h3"/>'
  };
  const svg = (name, cls = '') =>
    `<svg viewBox="0 0 24 24" ${cls ? `class="${cls}"` : ''} aria-hidden="true">${ICONS[name] || ''}</svg>`;

  /* ---------- Фото для банерів ----------
     Скрипт пробує адреси по черзі: спочатку ваш локальний файл у папці images/,
     потім віддалений. Якщо нічого не завантажилось — показується запасна ілюстрація.
     Щоб замінити фото — покладіть файл у images/ з цією ж назвою або додайте URL у масив. */
  const PX = (id, w = 1500) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
  const PHOTOS = {
    home:          ['images/home.jpg'],
    physical:      ['images/physical.jpg'],
    belief:        ['images/belief-values.jpg', PX(3114925)],
    affect:        ['images/affect.jpg'],
    socialization: ['images/socialization.jpg'],
    imagination:   ['images/imagination.jpg', PX(3922244)],
    cognition:     ['images/cognition.jpg'],
    publications:  ['images/publications.jpg', PX(32426695)],
    contacts:      ['images/contacts.jpg', PX(32426694)]
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pageKey = document.body.dataset.page || 'home';
  const group = (PAGES.find(p => p.key === pageKey) || {}).group;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Шапка, пошук, меню ---------- */
  function buildHeader() {
    const existing = $('.topbar');
    if (existing) { wireHeader(existing, $('#drawer')); return; }
    const isActive = k => k === pageKey;
    const sub = PAGES.filter(p => p.group === 'basic').map(p =>
      `<a href="${p.href}" class="${isActive(p.key) ? 'is-active' : ''}">${svg(p.icon)}<span>${p.title.split(' — ')[0]}<small>${p.short}</small></span></a>`
    ).join('');

    const header = document.createElement('header');
    header.className = 'topbar';
    header.innerHTML = `
      <div class="topbar__inner">
        <a class="brand" href="index.html" aria-label="Ресурс поруч — на головну">
          <svg class="brand__logo" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <g class="pulse"><path d="M24 41C10 32 5 22 9 14.500c3-5.500 10.500-5.500 15 .5 4.500-6 12-6 15-.5C43 22 38 32 24 41z"/></g>
            <path d="M24 35V23"/><path d="M24 29c-4.500-.5-6.500-3.500-6.500-7 4.500 0 6.500 3 6.500 7zM24 26c3.500-.5 5.500-2.800 5.500-6-3.500 0-5.500 2.400-5.500 6z"/>
          </svg>
          <span class="brand__text"><strong>Ресурс поруч</strong><small>Кейс психологічної підтримки викладача і студента</small></span>
        </a>
        <nav class="mainnav" aria-label="Основна навігація">
          <a class="navlink ${isActive('home') ? 'is-active' : ''}" href="index.html">Головна</a>
          <a class="navlink ${isActive('basic') ? 'is-active' : ''}" href="basic-ph.html">Про модель</a>
          <div class="has-sub">
            <button class="navlink ${group ? 'is-active' : ''}" type="button" aria-haspopup="true" aria-expanded="false">BASIC Ph
              <svg viewBox="0 0 12 12"><path d="m2 4 4 4 4-4"/></svg></button>
            <div class="sub">${sub}</div>
          </div>
          <a class="navlink ${isActive('publications') ? 'is-active' : ''}" href="publications.html">Публікації</a>
          <a class="navlink ${isActive('contacts') ? 'is-active' : ''}" href="contacts.html">Контакти</a>
        </nav>
        <div class="topbar__actions">
          <button class="icon-btn" type="button" data-action="search" aria-label="Пошук" aria-expanded="false">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.500"/><path d="m16 16 4.500 4.500"/></svg>
          </button>
          <button class="icon-btn" type="button" data-action="menu" aria-label="Відкрити меню" aria-expanded="false" aria-controls="drawer">
            <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
      </div>
      <div class="search-panel" id="search-panel">
        <div class="search-box">
          <input type="search" placeholder="Пошук по сайту…" aria-label="Пошук по сайту" autocomplete="off">
          <ul></ul>
        </div>
      </div>`;

    const drawer = document.createElement('div');
    drawer.className = 'drawer';
    drawer.id = 'drawer';
    drawer.setAttribute('aria-hidden', 'true');
    let n = 0;
    const link = p => `<a href="${p.href}" style="--n:${n++}" class="${isActive(p.key) ? 'is-active' : ''}">${svg(p.icon || (p.key === 'home' ? 'home' : p.key === 'basic' ? 'model' : p.key === 'publications' ? 'news' : 'mail'))}${p.title}</a>`;
    drawer.innerHTML = `
      <div class="drawer__overlay" data-close></div>
      <aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Меню">
        <div class="drawer__head"><span>Меню</span>
          <button class="icon-btn" type="button" data-close aria-label="Закрити меню"><svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
        </div>
        <h3>Сайт</h3>
        <nav>${PAGES.filter(p => ['home', 'basic'].includes(p.key)).map(link).join('')}</nav>
        <h3>Шість сфер BASIC Ph</h3>
        <nav>${PAGES.filter(p => p.group === 'basic').map(link).join('')}</nav>
        <h3>Ще</h3>
        <nav>${PAGES.filter(p => ['publications', 'contacts'].includes(p.key)).map(link).join('')}</nav>
      </aside>`;

    document.body.prepend(drawer);
    document.body.prepend(header);
    wireHeader(header, drawer);
  }

  function wireHeader(header, drawer) {
    // Підсвітка шапки при прокрутці
    const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });

    // Випадаюче меню BASIC Ph
    const sub = $('.has-sub', header);
    const subBtn = $('button', sub);
    subBtn.addEventListener('click', e => {
      e.stopPropagation();
      const open = sub.classList.toggle('open');
      subBtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', e => {
      if (!sub.contains(e.target)) { sub.classList.remove('open'); subBtn.setAttribute('aria-expanded', 'false'); }
    });

    // Пошук
    const panel = $('#search-panel', header);
    const searchBtn = $('[data-action="search"]', header);
    const input = $('input', panel);
    const list = $('ul', panel);
    const render = q => {
      q = q.trim().toLowerCase();
      const found = PAGES.filter(p => !q || (p.title + ' ' + p.kw).toLowerCase().includes(q));
      list.innerHTML = found.length
        ? found.map(p => `<li><a href="${p.href}">${p.title}</a></li>`).join('')
        : '<li class="muted">Нічого не знайдено</li>';
    };
    render('');
    input.addEventListener('input', () => render(input.value));
    searchBtn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      searchBtn.setAttribute('aria-expanded', open);
      if (open) setTimeout(() => input.focus(), 250);
    });

    // Бокове меню
    const menuBtn = $('[data-action="menu"]', header);
    const setDrawer = open => {
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', !open);
      menuBtn.setAttribute('aria-expanded', open);
      document.body.classList.toggle('menu-open', open);
    };
    menuBtn.addEventListener('click', () => setDrawer(true));
    $$('[data-close]', drawer).forEach(el => el.addEventListener('click', () => setDrawer(false)));
    addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      setDrawer(false);
      panel.classList.remove('open');
      sub.classList.remove('open');
    });
  }

  /* ---------- Заголовок: поява по словах ---------- */
  function splitWords(el) {
    const label = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', label);
    const frag = document.createDocumentFragment();
    let i = 0;
    [...el.childNodes].forEach(node => {
      if (node.nodeType !== 3) { frag.append(node.cloneNode(true)); return; }
      node.textContent.split(/(\s+)/).forEach(t => {
        if (!t) return;
        if (/^\s+$/.test(t)) { frag.append(' '); return; }
        const w = document.createElement('span');
        w.className = 'w';
        w.setAttribute('aria-hidden', 'true');
        const s = document.createElement('span');
        s.textContent = t;
        s.style.setProperty('--i', i++);
        w.append(s);
        frag.append(w);
      });
    });
    el.textContent = '';
    el.append(frag);
  }

  /* ---------- Запасна ілюстрація й декор ---------- */
  const LEAF = `
    <svg viewBox="0 0 200 240" aria-hidden="true">
      <path class="stem" d="M100 240C100 180 104 120 96 40"/>
      <path class="l3" d="M98 150C60 150 34 124 30 88c38 0 66 24 68 62z"/>
      <path class="l1" d="M100 120c40-2 66-28 70-64-40 0-68 26-70 64z"/>
      <path class="l2" d="M98 190c-34 8-62-6-76-36 34-8 62 4 76 36z"/>
      <path class="l1" d="M102 88c-30-6-48-30-46-62 30 6 48 28 46 62z"/>
      <path class="l2" d="M104 176c32-4 54-24 60-54-32 2-54 20-60 54z"/>
    </svg>`;

  function decorate(hero) {
    // Іконка у запасній ілюстрації
    const art = $('.hero__art', hero);
    if (art && art.dataset.icon) art.insertAdjacentHTML('beforeend', svg(art.dataset.icon));

    // Листя
    const l = document.createElement('div');
    l.className = 'deco-leaf';
    l.innerHTML = LEAF;
    hero.append(l);
    if (hero.dataset.leaves !== 'single') {
      const l2 = document.createElement('div');
      l2.className = 'deco-leaf deco-leaf--left';
      l2.innerHTML = LEAF;
      hero.append(l2);
    }

    // Бульбашки
    if (!reduce) {
      for (let i = 0; i < 7; i++) {
        const b = document.createElement('span');
        const s = 8 + Math.random() * 22;
        b.className = 'bubble';
        b.style.cssText = `width:${s}px;height:${s}px;left:${8 + Math.random() * 84}%;bottom:${10 + Math.random() * 40}%;--dur:${11 + Math.random() * 9}s;--delay:${-Math.random() * 14}s`;
        hero.append(b);
      }
    }
  }

  /* ---------- Завантаження фото ---------- */
  function loadFirst(urls) {
    return new Promise(resolve => {
      let i = 0;
      const next = () => {
        if (i >= urls.length) return resolve(null);
        const url = urls[i++];
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.onload = () => resolve(url);
        img.onerror = next;
        img.src = url;
      };
      next();
    });
  }

  async function initPhoto(hero) {
    const media = $('.hero__media', hero);
    const photo = $('.hero__photo', hero);
    const urls = PHOTOS[pageKey];
    if (!media || !photo) return;
    const found = urls ? await loadFirst(urls) : null;
    if (!found) { media.classList.add('no-photo'); return; }
    photo.style.backgroundImage = `url("${found}")`;
    requestAnimationFrame(() => {
      photo.classList.add('is-loaded');
      media.classList.add('has-photo');
    });
  }

  /* ---------- Паралакс і рух мишки ---------- */
  function initMotion(hero) {
    if (reduce) return;
    const media = $('.hero__media', hero);
    let ticking = false;
    const update = () => {
      const y = Math.min(scrollY, hero.offsetHeight + 200);
      if (media) media.style.setProperty('--sy', y);
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });

  }

  /* ---------- Блоки моделі BASIC Ph ---------- */
  function initBlocks() {
    $$('.block').forEach(b => {
      if (b.dataset.icon) b.insertAdjacentHTML('afterbegin', svg(b.dataset.icon));
      b.addEventListener('click', () => {
        b.classList.remove('wiggle');
        void b.offsetWidth;
        b.classList.add('wiggle');
        const href = b.dataset.href;
        if (href) setTimeout(() => { document.body.classList.add('leaving'); setTimeout(() => (location.href = href), 260); }, 520);
      });
    });
  }

  /* ---------- Ефект хвилі на кнопках ---------- */
  function initRipple() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const d = Math.max(r.width, r.height);
      const s = document.createElement('span');
      s.className = 'ripple';
      s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
      btn.append(s);
      setTimeout(() => s.remove(), 700);
    });
  }

  /* ---------- Плавні переходи між сторінками ---------- */
  function initTransitions() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
      const u = new URL(a.href, location.href);
      if (u.protocol !== location.protocol || u.host !== location.host) return;
      if (u.pathname === location.pathname && u.hash) return;
      e.preventDefault();
      if (u.href === location.href) return;
      document.body.classList.add('leaving');
      setTimeout(() => { location.href = a.href; }, 280);
    });
    addEventListener('pageshow', () => document.body.classList.remove('leaving'));
  }

  /* ---------- Старт ---------- */
  function init() {
    buildHeader();
    initTransitions();
    initRipple();

    $$('.hero h1').forEach(splitWords);
    $$('.hero').forEach(hero => {
      decorate(hero);
      initMotion(hero);
    });
    initBlocks();

    // Поява елементів
    const items = $$('.reveal');
    const show = () => items.forEach((el, i) => {
      el.style.setProperty('--d', 500 + i * 140);
      requestAnimationFrame(() => el.classList.add('in'));
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }), { threshold: .15 });
      items.forEach((el, i) => { el.style.setProperty('--d', 450 + i * 140); io.observe(el); });
    } else show();
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();

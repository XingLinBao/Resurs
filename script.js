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
    { key: 'physical',      href: 'physical.html',       title: 'Physiology — Тіло',                 kw: 'тіло сон харчування рух спорт', group: 'basic', icon: 'dumbbell', short: 'Тіло' },
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


  /* ---------- Сторінка «Про модель»: іконки, поява, саморефлексія ---------- */
  function initAbout() {
    if (pageKey !== 'basic') return;

    $$('.wood[data-icon]').forEach(w => w.insertAdjacentHTML('afterbegin', svg(w.dataset.icon)));

    const apps = $$('.appear');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }), { threshold: .12 });
      apps.forEach(el => io.observe(el));
    } else apps.forEach(el => el.classList.add('in'));

    const KEYS = ['B', 'A', 'S', 'I', 'C', 'Ph'];
    const NAMES = {
      B: ['Belief', 'Віра та сенси', 'Згадайте, що для вас справді важливо, і запитайте себе: «Заради чого я це проходжу?»'],
      A: ['Affect', 'Емоції та почуття', 'Назвіть свою емоцію вголос або запишіть кілька речень про те, що ви зараз відчуваєте.'],
      S: ['Social', 'Соціум і підтримка', 'Напишіть людині, якій довіряєте, або проведіть хвилину у спілкуванні з близьким.'],
      I: ['Imagination', 'Уява та творчість', 'Перемкніться на музику, малювання, гумор або мрії про майбутнє.'],
      C: ['Cognition', 'Розум і логіка', 'Випишіть 3 найближчі кроки, на які ви реально впливаєте, і розставте пріоритети.'],
      Ph: ['Physiology', 'Тіло та рух', 'Зробіть кілька повільних вдихів і видихів, пройдіться або розімніть плечі.']
    };
    // Початково оцінок немає; «Скинути оцінки» повертає цей стан
    const EXAMPLE = { B: 0, A: 0, S: 0, I: 0, C: 0, Ph: 0 };
    const val = { ...EXAMPLE };

    const rows = $$('.rate');
    const bars = $$('.bar');
    const score = $('#score');
    const advice = $('#advice');

    function render() {
      rows.forEach(r => {
        const v = val[r.dataset.key];
        $$('.rate__btn', r).forEach(b => {
          const on = +b.dataset.v <= v;
          b.classList.toggle('on', on);
          b.setAttribute('aria-pressed', +b.dataset.v === v);
        });
      });

      const total = KEYS.reduce((s, k) => s + val[k], 0);
      score.textContent = `${total} / 30`;

      const rated = KEYS.filter(k => val[k] > 0);
      const order = [...KEYS].sort((a, b) => val[b] - val[a] || KEYS.indexOf(a) - KEYS.indexOf(b));
      const top = rated.length ? order.slice(0, 2).filter(k => val[k] > 0) : [];
      bars.forEach(b => {
        const k = b.dataset.key;
        $('i', b).style.height = Math.max(4, val[k] / 5 * 100) + '%';
        b.classList.toggle('top', top.includes(k));
      });

      if (!rated.length) {
        advice.innerHTML = '<span>Оцініть кожен канал — і тут з’явиться ваш баланс та підказка, який ключ варто розбудити.</span>';
        return;
      }
      const low = order.filter(k => !top.includes(k)).pop();
      const mx = Math.max(...KEYS.map(k => val[k])), mn = Math.min(...KEYS.map(k => val[k]));
      if (mx === mn) {
        advice.innerHTML = 'Усі канали зараз підтримують вас майже однаково. Оберіть той, що найближчий вам сьогодні, і спробуйте його міні-практику.';
        return;
      }
      advice.innerHTML = `Ваші провідні опори зараз: <strong>${top.join(', ')}</strong>. Сьогодні варто м’яко розбудити канал <strong>${NAMES[low][0]} (${NAMES[low][1]})</strong>: ${NAMES[low][2]}`;
    }

    rows.forEach(r => $$('.rate__btn', r).forEach(b =>
      b.addEventListener('click', () => { val[r.dataset.key] = +b.dataset.v; render(); })));
    $('#self-reset').addEventListener('click', () => { KEYS.forEach(k => (val[k] = 0)); render(); });
    render();
  }

  /* ---------- Тести: стресодолання (модальне вікно) і «Життя в балансі» ---------- */
  const STRESS = {
    title: 'Тест BASIC Ph. Модель стресодолання',
    stem: 'Коли я перебуваю у кризі чи переживаю сильний стрес…',
    opts: ['Ніколи', 'Рідко', 'Іноді', 'Періодично', 'Часто', 'Майже завжди', 'Завжди'],
    source: 'Джерело: Основи реабілітаційної психології: подолання наслідків кризи. Навчальний посібник. Том 2.',
    // Питання йдуть по колу B, A, S, I, C, Ph (по 6 тверджень на канал)
    q: [
      'Я здаюся і покладаюсь на вищі сили чи частку у вирішенні проблеми.',
      'Я не говорю про свої емоції прямо, але виражаю їх опосередковано; наприклад, плачу, коли думаю про себе.',
      'Я шукаю підтримки інших людей.',
      'Я фантазую і даю волю своїй уяві, наприклад, уявляю себе у спокійному, безтурботному місці.',
      'Я збираю інформацію, щоб бути певним (-ною) у тому, що обираю найкращий варіант вирішення проблеми.',
      'Я їм або сплю менше, ніж звичайно, або ж, навпаки, я їм та сплю більше, аніж зазвичай.',
      'Я вірю у свої власні сили і свою здатність долати перешкоди.',
      'Я висловлюю почуття у власний завуальований спосіб — через натяки, сарказм або навіть флірт.',
      'Я розмовляю з друзями по телефону.',
      'Я згадую свої улюблені історії, байки, притчі або ж казки як спосіб пошуку вирішення проблеми.',
      'Я аналізую проблеми, намагаючись знайти їх вирішення.',
      'Я постійно займаюся фізичним трудом, наприклад, прибиранням, приготуванням їжі, роботою з деревом, ремонтом автомобіля чи навіть створенням моделі літака.',
      'Моє кредо: «Я зможу пережити це, незважаючи ні на що».',
      'Я звільняюсь від почуттів через плач, сміх або крик і не тримаю все це всередині.',
      'Я намагаюся знайти підтримку в друга або членів моєї сім’ї.',
      'Слухаючи музику, я даю волю своїй уяві.',
      'Я створюю спеціальний план і дію згідно з ним крок за кроком.',
      'Я використовую вправи для розслаблення.',
      'Я прошу допомоги у Бога в молитві.',
      'Я накручую себе емоційно, щоб посилити свою мотивацію.',
      'Я глибоко занурююсь у стосунки з членами моєї громади або організації, до якої я належу.',
      'Я згадую час, коли мені було набагато краще, ніж зараз, або ж думаю про час, коли все зміниться на краще.',
      'Насамперед я намагаюся зрозуміти, що, власне, відбувається.',
      'Я розслабляюся, коли роблю щось: приймаю душ або ванну, йду на прогулянку або бігаю підтюпцем.',
      'Я опираюся на свої духовні переконання або на свою життєву філософію.',
      'Я розповідаю або слухаю жарти і смішні історії.',
      'Я шукаю людей, з якими можна провести час, нічим особливо не займаючись.',
      'Я переглядаю спортивні змагання, фільми або читаю книги, уявляючи себе на місці дійових осіб.',
      'Я зважую всі можливі варіанти вирішення проблеми і, якщо це можливо, обираю найкращий з них.',
      'Я намагаюся постійно займатись якоюсь фізичною діяльністю.',
      'Моє кредо: «Те, що не вбиває мене, робить мене сильнішим».',
      'Я даю вихід своїм емоціям.',
      'Я пишу листи та е-мейли до друзів, сподіваючись, що вони дадуть відповідь.',
      'Я мрію, думаю про кращі часи, уявляючи собі їх.',
      'Я намагаюся знайти вирішення проблеми у найкращий спосіб з тих, які знаю, обмірковуючи кожен з них.',
      'Я виходжу з дому або намагаюся бути активним (-ною) для того, щоб позбутися надлишку енергії.'
    ],
    // Порядок результатів — як у джерелі: B, A, I, Ph, C, S
    ch: [
      { k: 'B', name: 'віра, переконання, цінності', idx: 0, desc: 'Віра (belief) в контексті філософії життя, вірувань та моральних цінностей. Віра у Бога, ЗСУ, віра в людей чи в самого себе. Важливий сам факт наявності віри.' },
      { k: 'A', name: 'емоції, почуття', idx: 1, desc: 'Афекти (affect) в контексті вираження почуттів та емоцій. Якщо вам допомагає нити, скаржитися, бурхливо реагувати, кричати, махати руками, тупотіти ногами — робіть це.' },
      { k: 'I', name: 'уява, мрії, спогади', idx: 3, desc: 'Уява (imagination) в контексті творчості, гри, уяви, інтуїції. Тут все просто, сублімуйте, як умієте. Грайте, малюйте, пишіть вірші, співайте, шийте ляльок, в’яжіть шарфики.' },
      { k: 'Ph', name: 'тілесні ресурси, діяльність', idx: 5, desc: 'Тіло (physiology) в контексті фізіологічних ресурсів, чуттєвої модальності та фізичної діяльності. Спорт, танці, готування, їжа, будь-які кінестетичні задоволення (ванна, плед, масаж, потискати котика).' },
      { k: 'C', name: 'когнітивні стратегії', idx: 4, desc: 'Когнітивні стратегії (cognition) в контексті знання, логіки, реальності, пізнання та думок. Це для тих, кому, щоб заспокоїтись, потрібно в усьому розібратися, проаналізувати інформацію, спрогнозувати варіанти розвитку.' },
      { k: 'S', name: 'соціальні зв’язки, соціальна підтримка', idx: 2, desc: 'Соціальна підтримка (social) в контексті функціональності, приналежності, родинних зв’язків, друзів. Якщо вам, щоб упоратися з переживаннями, потрібно говорити з іншими, спілкуватися, взаємодіяти, допомагати, брати в чомусь участь — не відмовляйте собі в цьому.' }
    ],
    notes: [
      'Важливо пам’ятати, що немає правильного чи неправильного з вищеописаних каналів, кожен має свої переваги та недоліки.',
      'При цьому, щоб поновити та збільшити сили та ресурси в ситуаціях, коли людина «вибита з колії» та втратила ґрунт під ногами, варто осмислити вже ті частини наших ресурсів, що є в наявності та зосередитися на ефективному їх використанні.',
      'Якщо ж людина відчуває себе у «глухому куті», варто звернутися до тих частин, які поки що не проявлені чи дуже слабкі.',
      'Якщо у вас виникли труднощі з виявленням каналів, чи немає ідей, як і що робити практично, звертайтесь до психолога, який допоможе розробити ваш індивідуальний стиль долання стресу чи кризи.'
    ],
    sign: 'Будь ласка, бережіть себе, мої любі українки і українці! — Психолог Рада Целковська'
  };

  function initStressTest() {
    const openBtn = $('#stress-open');
    if (!openBtn) return;
    const N = STRESS.q.length, MAXC = 6 * 6;
    let cur = 0, answers = Array(N).fill(null), lastFocus = null;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="modal__overlay" data-close></div>
      <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="stress-modal-title">
        <div class="modal__head">
          <h2 class="modal__title" id="stress-modal-title">${STRESS.title}</h2>
          <button class="icon-btn" type="button" data-close aria-label="Закрити тест"><svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
        </div>
        <div class="modal__body" id="stress-body"></div>
        <div class="modal__foot" id="stress-foot"></div>
        <div class="modal__src">${STRESS.source}</div>
      </div>`;
    document.body.append(modal);
    const body = $('#stress-body', modal), foot = $('#stress-foot', modal), panel = $('.modal__panel', modal);

    function renderQuestion() {
      const opts = STRESS.opts.map((o, i) => `
        <label class="opt${answers[cur] === i ? ' is-on' : ''}"><input type="radio" name="q${cur}" value="${i}"${answers[cur] === i ? ' checked' : ''}><span class="opt__dot"></span><span>${o}</span></label>`).join('');
      body.innerHTML = `
        <div class="progress"><span>${cur + 1} з ${N}</span><div class="progress__bar"><i style="width:${(cur / N) * 100}%"></i></div></div>
        <fieldset class="q">
          <legend><span class="q__stem">${STRESS.stem}</span>${STRESS.q[cur]}</legend>
          <div class="opts">${opts}</div>
        </fieldset>`;
      requestAnimationFrame(() => { const bar = $('.progress__bar i', body); if (bar) bar.style.width = ((cur + 1) / N) * 100 + '%'; });
      const last = cur === N - 1;
      foot.innerHTML = `
        <button type="button" class="btn-plain" id="st-prev"${cur === 0 ? ' disabled' : ''}>Назад</button>
        <button type="button" class="btn" id="st-next"${answers[cur] === null ? ' disabled' : ''}>${last ? 'Завершити' : 'Далі'}</button>`;
      const next = $('#st-next', foot);
      $$('.opt', body).forEach(l => {
        const inp = $('input', l);
        inp.addEventListener('change', () => {
          answers[cur] = +inp.value;
          $$('.opt', body).forEach(x => x.classList.toggle('is-on', $('input', x).checked));
          next.disabled = false;
        });
        inp.addEventListener('focus', () => l.classList.add('is-focus'));
        inp.addEventListener('blur', () => l.classList.remove('is-focus'));
      });
      $('#st-prev', foot).addEventListener('click', () => { cur--; renderQuestion(); });
      next.addEventListener('click', () => { if (last) renderResult(); else { cur++; renderQuestion(); } });
      body.scrollTop = 0;
      const first = $('input:checked', body) || $('input', body);
      if (first) first.focus({ preventScroll: true });
    }

    function renderResult() {
      const scores = STRESS.ch.map(c => {
        let s = 0;
        for (let i = c.idx; i < N; i += 6) s += answers[i] || 0;
        return s;
      });
      const mx = Math.max(...scores), mn = Math.min(...scores);
      const rows = STRESS.ch.map((c, i) => {
        const top = scores[i] === mx && mx !== mn, low = scores[i] === mn && mx !== mn;
        return `
        <details class="res__row${top ? ' is-top' : ''}"${top || low ? ' open' : ''}>
          <summary>
            <span class="rate__tag">${c.k}</span>
            <span class="res__name">${c.k} — ${c.name}${top ? '<span class="res__badge">провідний</span>' : ''}${low ? '<span class="res__badge res__badge--low">можна розвивати</span>' : ''}</span>
            <span class="res__score">${scores[i]} / ${MAXC}</span>
            <span class="res__bar"><i data-w="${(scores[i] / MAXC) * 100}"></i></span>
          </summary>
          <p class="res__desc">${c.desc}</p>
        </details>`;
      }).join('');
      body.innerHTML = `
        <h3 class="res__title">Результат</h3>
        <p class="res__lead">Бали за кожним каналом — від 0 до ${MAXC}. Чим вищий бал, тим частіше ви звертаєтесь до цього способу подолання стресу. Тут немає «правильних» чи «неправильних» результатів.</p>
        <div class="res__list">${rows}</div>
        <div class="res__notes">${STRESS.notes.map(n => `<p>${n}</p>`).join('')}<p class="res__sign">${STRESS.sign}</p></div>`;
      foot.innerHTML = `
        <button type="button" class="btn-plain" id="st-again">Пройти ще раз</button>
        <button type="button" class="btn" id="st-close">Закрити</button>`;
      requestAnimationFrame(() => requestAnimationFrame(() => $$('.res__bar i', body).forEach(i => (i.style.width = i.dataset.w + '%'))));
      $('#st-again', foot).addEventListener('click', () => { answers = Array(N).fill(null); cur = 0; renderQuestion(); });
      $('#st-close', foot).addEventListener('click', close);
      body.scrollTop = 0;
      $('#st-close', foot).focus({ preventScroll: true });
    }

    function open() {
      lastFocus = document.activeElement;
      answers = Array(N).fill(null); cur = 0;
      renderQuestion();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }
    function close() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    openBtn.addEventListener('click', open);
    $$('[data-close]', modal).forEach(el => el.addEventListener('click', close));
    addEventListener('keydown', e => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') {
        const f = $$('button:not(:disabled), input, summary, [href]', panel).filter(x => x.offsetParent !== null || x.type === 'radio');
        if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
  }

  /* ---------- Життя в балансі ---------- */
  const SPHERES = [
    { name: 'Особистісний розвиток', short: ['Особистісний', 'розвиток'], c: '#6f8f8c', d: 'Навчання, нові навички, книжки, зростання. Наскільки ви розвиваєтесь зараз?' },
    { name: 'Робота, бізнес', short: ['Робота,', 'бізнес'], c: '#c98765', d: 'Задоволеність справою, колективом, досягненнями та темпом навантаження.' },
    { name: 'Здоров’я, фізична активність', short: ['Здоров’я,', 'активність'], c: '#8fa59a', d: 'Самопочуття, сон, харчування, рух і турбота про своє тіло.' },
    { name: 'Сім’я, відносини', short: ['Сім’я,', 'відносини'], c: '#d3a58a', d: 'Близькість, підтримка і тепло у стосунках з рідними та партнером.' },
    { name: 'Фінанси', short: ['Фінанси'], c: '#b7a58f', d: 'Відчуття стабільності та спокою щодо грошей і планів на майбутнє.' },
    { name: 'Відпочинок, дозвілля', short: ['Відпочинок,', 'дозвілля'], c: '#7d9a9f', d: 'Чи вистачає часу на відновлення, хобі та приємні речі «для себе»?' },
    { name: 'Друзі, оточення', short: ['Друзі,', 'оточення'], c: '#e0b895', d: 'Якість дружніх зв’язків і спільноти, яка вас оточує.' },
    { name: 'Соціальні проекти', short: ['Соціальні', 'проекти'], c: '#9db0a6', d: 'Волонтерство, спільні ініціативи й справи, що виходять за межі власних потреб.' }
  ];

  function initWheel() {
    const list = $('#wheel-list');
    if (!list) return;
    const NS = 'http://www.w3.org/2000/svg';
    const n = SPHERES.length, vals = Array(n).fill(0);
    const CX = 280, CY = 260, R = 165, GAP = 1.6, step = 360 / n;
    const rad = a => (a * Math.PI) / 180;
    const pt = (r, a) => [CX + r * Math.cos(rad(a)), CY + r * Math.sin(rad(a))];
    const wedge = (r, i) => {
      const a0 = -90 + i * step + GAP / 2, a1 = -90 + (i + 1) * step - GAP / 2;
      if (r <= 0.5) return '';
      const [x0, y0] = pt(r, a0), [x1, y1] = pt(r, a1);
      return `M${CX} ${CY}L${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}Z`;
    };

    // Повзунки
    list.innerHTML = SPHERES.map((s, i) => `
      <div class="acc${i === 0 ? ' open' : ''}" data-i="${i}">
        <button type="button" class="acc__head" aria-expanded="${i === 0}">
          <span class="acc__dot" style="background:${s.c}"></span>
          <span class="acc__label">${s.name} — <b data-v>0</b></span>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 6 5 5 5-5"/></svg>
        </button>
        <div class="acc__panel"><div class="acc__inner"><div class="acc__pad">
          <input class="range" type="range" min="0" max="10" step="1" value="0" style="--c:${s.c}" aria-label="${s.name}: оцінка від 0 до 10">
          <div class="range__scale"><span>0</span><span>5</span><span>10</span></div>
          <p class="acc__desc">${s.d}</p>
        </div></div></div>
      </div>`).join('');

    // Коло
    const svgEl = document.createElementNS(NS, 'svg');
    svgEl.setAttribute('viewBox', '0 0 560 520');
    svgEl.setAttribute('role', 'img');
    svgEl.setAttribute('aria-label', 'Колесо балансу життя');
    let html = '';
    for (let i = 0; i < n; i++) html += `<path d="${wedge(R, i)}" fill="#eceee9" stroke="#fff" stroke-width="0"/>`;
    html += `<circle cx="${CX}" cy="${CY}" r="${R / 2}" fill="none" stroke="#cfd6d1" stroke-dasharray="3 4"/>`;
    html += `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#cfd6d1"/>`;
    for (let i = 0; i < n; i++) { const [x, y] = pt(R, -90 + i * step); html += `<line x1="${CX}" y1="${CY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#fff" stroke-width="2"/>`; }
    SPHERES.forEach((s, i) => { html += `<path class="fill" data-i="${i}" d="" fill="${s.c}" fill-opacity=".92"/>`; });
    html += `<text class="tick" x="${CX + 5}" y="${CY - R / 2 + 4}">5</text><text class="tick" x="${CX + 5}" y="${CY - R + 12}">10</text>`;
    SPHERES.forEach((s, i) => {
      const a = -90 + (i + .5) * step, [x, y] = pt(R + 24, a), c = Math.cos(rad(a));
      const anchor = c > .3 ? 'start' : c < -.3 ? 'end' : 'middle';
      const lines = s.short.map((t, k) => `<tspan x="${x.toFixed(1)}" dy="${k ? 15 : (s.short.length > 1 ? -7 : 4)}">${t}</tspan>`).join('');
      html += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}">${lines}</text>`;
    });
    svgEl.innerHTML = html;
    $('#wheel-svg').append(svgEl);

    const fills = $$('.fill', svgEl), accs = $$('.acc', list), sum = $('#wheel-sum');
    function paint(i) {
      fills[i].setAttribute('d', wedge((vals[i] / 10) * R, i));
      const acc = accs[i];
      $('[data-v]', acc).textContent = vals[i];
      const r = $('.range', acc);
      r.value = vals[i];
      r.style.setProperty('--p', vals[i] * 10 + '%');
    }
    function summary() {
      const rated = vals.filter(v => v > 0).length;
      if (!rated) { sum.textContent = 'Пересувайте повзунки — і коло поступово заповниться. Так буде видно, які сфери життя зараз підтримують вас, а на які варто звернути увагу.'; return; }
      const total = vals.reduce((a, b) => a + b, 0), avg = (total / n).toFixed(1).replace('.', ',');
      const mx = Math.max(...vals), mn = Math.min(...vals);
      const hi = SPHERES.filter((_, i) => vals[i] === mx).map(s => s.name), lo = SPHERES.filter((_, i) => vals[i] === mn).map(s => s.name);
      let t = `Середня задоволеність: <strong>${avg} з 10</strong> (оцінено сфер: ${rated} з ${n}).`;
      if (mx !== mn) t += `<br>Найсильніше зараз: <strong>${hi.join('; ')}</strong> (${mx}).<br>Найбільше уваги потребує: <strong>${lo.join('; ')}</strong> (${mn}).`;
      sum.innerHTML = t;
    }
    accs.forEach((acc, i) => {
      $('.acc__head', acc).addEventListener('click', () => {
        const willOpen = !acc.classList.contains('open');
        accs.forEach(a => { a.classList.remove('open'); $('.acc__head', a).setAttribute('aria-expanded', 'false'); });
        if (willOpen) { acc.classList.add('open'); $('.acc__head', acc).setAttribute('aria-expanded', 'true'); }
      });
      $('.range', acc).addEventListener('input', e => { vals[i] = +e.target.value; paint(i); summary(); });
    });
    $('#wheel-reset').addEventListener('click', () => { vals.fill(0); vals.forEach((_, i) => paint(i)); summary(); });
    vals.forEach((_, i) => paint(i));
    summary();
  }


  /* ---------- Physiology: напрями практик, відео ---------- */
  function initCase() {
    const tabs = $$('.side__item');
    if (!tabs.length) return;
    const loadVideos = root => $$('iframe[data-src]', root).forEach(f => { f.src = f.dataset.src; f.removeAttribute('data-src'); });
    const activate = (tab, focus) => {
      tabs.forEach(t => {
        const on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        const p = document.getElementById(t.dataset.target);
        if (p) { p.hidden = !on; p.classList.toggle('is-active', on); }
      });
      if (focus) tab.focus();
      const panel = document.getElementById(tab.dataset.target);
      // Відео вантажимо лише в розкритих блоках
      $$('details[open]', panel).forEach(loadVideos);
      if (location.hash !== '#' + tab.dataset.target) history.replaceState(null, '', '#' + tab.dataset.target);
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => activate(t));
      t.addEventListener('keydown', e => {
        const k = e.key;
        if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(k)) return;
        e.preventDefault();
        const d = (k === 'ArrowDown' || k === 'ArrowRight') ? 1 : -1;
        activate(tabs[(i + d + tabs.length) % tabs.length], true);
      });
    });
    $$('.acc2').forEach(d => d.addEventListener('toggle', () => { if (d.open) loadVideos(d); }));
    const fromHash = tabs.find(t => '#' + t.dataset.target === location.hash);
    activate(fromHash || tabs[0]);
  }

  /* ---------- Старт ---------- */

  /* ---------- Футер (на кожній сторінці) ---------- */
  const COLLEGE_URL = 'https://tefc.in.ua/index.php/uk/';
  function buildFooter() {
    if ($('.footer')) return;
    const isActive = k => k === pageKey;
    const link = p => `<a href="${p.href}" class="${isActive(p.key) ? 'is-active' : ''}">${p.title}</a>`;
    const f = document.createElement('footer');
    f.className = 'footer';
    f.innerHTML = `
      <div class="footer__inner">
        <div class="footer__brand">
          <a class="footer__logo" href="index.html" aria-label="Ресурс поруч — на головну">
            <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 41C10 32 5 22 9 14.5c3-5.5 10.5-5.5 15 .5 4.5-6 12-6 15-.5C43 22 38 32 24 41z"/><path d="M24 35V23"/><path d="M24 29c-4.5-.5-6.5-3.5-6.5-7 4.5 0 6.5 3 6.5 7zM24 26c3.5-.5 5.5-2.8 5.5-6-3.5 0-5.5 2.4-5.5 6z"/></svg>
            <strong>Ресурс поруч</strong>
          </a>
          <p class="footer__about">Кейс психологічної підтримки викладача і студента. Піклуймось про ментальне здоров’я разом!</p>
          <a class="footer__college" href="${COLLEGE_URL}" target="_blank" rel="noopener">Сайт коледжу
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>
          </a>
        </div>
        <nav aria-label="Навігація в футері">
          <h2>Сайт</h2>
          ${PAGES.filter(p => ['home', 'basic', 'publications', 'contacts'].includes(p.key)).map(link).join('')}
        </nav>
        <nav aria-label="Шість сфер BASIC Ph">
          <h2>Шість сфер BASIC Ph</h2>
          ${PAGES.filter(p => p.group === 'basic').map(link).join('')}
        </nav>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} Ресурс поруч</span>
        <span>ВСП «Технолого-економічний фаховий коледж Білоцерківського НАУ» · <a href="${COLLEGE_URL}" target="_blank" rel="noopener">tefc.in.ua</a></span>
      </div>`;
    document.body.append(f);
  }

  /* ---------- Ключові слова в заголовках (оранжевим) ---------- */
  // Порядок важливий: у заголовку виділяється перший збіг зі списку
  const HL_WORDS = ['стресодолання', 'поруч', '6 ключів', 'балансі', 'людину', 'саме зараз', 'рівноваги', 'кейс', 'на практиці', 'BASIC Ph'];
  function highlightHeadings() {
    $$('main h1, main h2').forEach(h => {
      const text = h.textContent.replace(/\s+/g, ' ');
      const key = HL_WORDS.find(k => text.includes(k));
      if (!key) return;
      const words = $$('.w', h);
      if (words.length) {
        // заголовок розбитий на слова (анімація) — позначаємо потрібні слова
        const target = key.split(' ');
        const clean = w => w.textContent.replace(/[^\p{L}\p{N}]/gu, '');
        for (let i = 0; i <= words.length - target.length; i++) {
          if (target.every((t, j) => clean(words[i + j]) === t.replace(/[^\p{L}\p{N}]/gu, ''))) {
            target.forEach((_, j) => words[i + j].classList.add('hl'));
            break;
          }
        }
        return;
      }
      const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        const idx = n.textContent.indexOf(key);
        if (idx < 0) continue;
        const r = document.createRange();
        r.setStart(n, idx);
        r.setEnd(n, idx + key.length);
        const span = document.createElement('span');
        span.className = 'hl';
        r.surroundContents(span);
        break;
      }
    });
  }

  function init() {
    buildHeader();
    buildFooter();
    initTransitions();
    initRipple();

    $$('.hero h1').forEach(splitWords);
    highlightHeadings();
    $$('.hero').forEach(hero => {
      decorate(hero);
      initPhoto(hero);
      initMotion(hero);
    });
    initBlocks();
    initAbout();
    initCase();
    if (pageKey === 'home') {
      const apps = $$('.appear');
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(es => es.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        }), { threshold: .12 });
        apps.forEach(el => io.observe(el));
      } else apps.forEach(el => el.classList.add('in'));
    }
    if (pageKey === 'basic') { initStressTest(); initWheel(); }

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

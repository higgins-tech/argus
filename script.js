/* ==========================================================================
   ARGUS.WORLD — recreation script
   ========================================================================== */

/* ---------- placeholder avatar helper ---------- */

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const PALETTES = [
  ['#8b5cf6', '#312e81'],
  ['#a78bfa', '#1e1b4b'],
  ['#7c3aed', '#1e1033'],
  ['#c4b5fd', '#3b0764'],
  ['#9d6bff', '#1c1240'],
  ['#6d28d9', '#0f0a24'],
  ['#b39ffb', '#241a45'],
];

function paletteFor(seed) {
  const idx = hashSeed(seed) % PALETTES.length;
  return PALETTES[idx];
}

function makeAvatar(seed, size) {
  const [a1, a2] = paletteFor(seed);
  const letter = (seed.replace(/^\$/, '')[0] || '?').toUpperCase();
  const span = document.createElement('span');
  span.className = `avatar avatar-${size}`;
  span.style.setProperty('--a1', a1);
  span.style.setProperty('--a2', a2);
  span.textContent = letter;
  return span;
}

function makeThumb(seed) {
  const [a1, a2] = paletteFor(seed);
  const div = document.createElement('div');
  div.className = 'token-thumb';
  div.style.setProperty('--a1', a1);
  div.style.setProperty('--a2', a2);
  div.innerHTML = '<i class="ri-image-2-line"></i>';
  return div;
}

/* ---------- image map ---------- */

const TOKEN_IMAGES = {
  // King / featured
  'LONGCAT': 'img/glitchcat.png',
  '$LONGCAT': 'img/glitchcat.png',
  // Contenders
  'NOW': 'img/now.png',
  '$NOW': 'img/now.png',
  'ARCA': 'img/arca.png',
  '$ARCA': 'img/arca.png',
  'ARCTRONS': 'img/arctrons.png',
  '$ARCTRONS': 'img/arctrons.png',
  'GLITCHCAT': 'img/glitchcat.png',
  '$GLITCHCAT': 'img/glitchcat.png',
  'ARCADE': 'img/arcade.png',
  '$ARCADE': 'img/arcade.png',
  // MCAP
  '$ARGUS': 'img/argus.png',
  'ARGUS': 'img/argus.png',
  '$USDC': 'img/usdc.png',
  'USDC': 'img/usdc.png',
  '$DUKE': 'img/duke.png',
  'DUKE': 'img/duke.png',
  '$ARCX10': 'img/arc.png',
  'ARCX10': 'img/arc.png',
  // Token grid extras
  '$BULLISH': 'img/spark.png',
  'BULLISH': 'img/spark.png',
  '$ARCAT': 'img/arc.png',
  'ARCAT': 'img/arc.png',
  '$AQUA': 'img/modernmoney.png',
  'AQUA': 'img/modernmoney.png',
  '$WARPR': 'img/aburn.png',
  'WARPR': 'img/aburn.png',
  '$BARCY': 'img/pennypairs.png',
  'BARCY': 'img/pennypairs.png',
  '$ROY': 'img/jeremy.png',
  'ROY': 'img/jeremy.png',
  'Royld': 'img/jeremy.png',
  '$PNCHSM': 'img/wifhat.png',
  'PNCHSM': 'img/wifhat.png',
  'Panchu Superman': 'img/wifhat.png',
  '$USDC CO': 'img/usdc.png',
  'usdc cool': 'img/usdc.png',
  'Dog Wif Nunchaku': 'img/wifhat.png',
  'Arcus Economy': 'img/archaven.png',
  'PHANTOM ON ARC': 'img/phantomon.png',
  'Marc de Triomphe': 'img/trollface.png',
  '$MA...': 'img/markde.png',
  'Book Of Arc': 'img/archaven.png',
  'Souzin': 'img/aburn.png',
  'ALL THE STABLES': 'img/modernmoney.png',
  'PIDORAS': 'img/pidoras.png',
  '$AURA': 'img/spark.png',
  'AURA': 'img/spark.png',
};

/* Pair coin images shown in token cards */
const PAIR_IMAGES = {
  usdc: 'img/usdclogo.png',
  eurc: 'img/eurc.png',
  cirbtc: 'img/cirbtc.png',
  weth: 'img/weth.png',
  xaum: 'img/xaum.png',
  argus: 'img/arguslogo.png',
  arcash: 'img/archaven.png',
};

function getTokenImg(ticker, name) {
  return TOKEN_IMAGES[ticker] || TOKEN_IMAGES[name] || null;
}

/* ---------- data ---------- */

const CONTENDERS = [
  { rank: 1, ticker: 'NOW', value: '$16.8K', delta: -22.3 },
  { rank: 2, ticker: 'ARCA', value: '$15.4K', delta: 520.3 },
  { rank: 3, ticker: 'ARCTRONS', value: '$10.1K', delta: -0.1 },
  { rank: 4, ticker: 'GLITCHCAT', value: '$9.87K', delta: 297.8 },
  { rank: 5, ticker: 'ARCADE', value: '$9.48K', delta: 0.05 },
];

const MCAP = [
  { ticker: '$ARGUS', cap: '$13.79M', delta: -18, liq: '$884K liq' },
  { ticker: '$USDC', cap: '$1.32M', delta: -43.7, liq: '$60.7K liq' },
  { ticker: '$DUKE', cap: '$1.17M', delta: -46.4, liq: '$83.5K liq' },
  { ticker: '$ARCX10', cap: '$482K', delta: 1.5, liq: '$32.2K liq' },
];

const TOKENS = [
  { ticker: '$LONGCAT', name: 'LONGCAT', addr: '0xefEb...87Ce', time: '48m ago', delta: 1381.6, milestone: 80.5, cap: '$36.8K', price: '$0.00003676', tax: '0%/0.01%', holders: '1,106', vol: '$45K', pair: 'usdc' },
  { ticker: '$BULLISH', name: 'BULLISH', addr: '0xDdb0...3ca3', time: '50m ago', delta: 0.05, milestone: 0, cap: '$2.48K', price: '$0.000002481', tax: '1%/5%', holders: '0', vol: '$9.85', pair: 'usdc' },
  { ticker: '$MA...', name: 'Marc de Triomphe', addr: '0x949E...5C88', time: '6m ago', delta: 44.6, milestone: 2.6, cap: '$3.59K', price: '$0.000003588', tax: '1%/3%', holders: '19', vol: '$10.4K', pair: 'eurc' },
  { ticker: '$SOUZIN', name: 'Souzin', addr: '0xB308...BE20', time: '1h ago', delta: 0.05, milestone: 0, cap: '$2.48K', price: '$0.000002481', tax: '3%/3%', holders: '1', vol: '$0.09', pair: 'usdc' },
  { ticker: '$ARCAT', name: 'Arcat', addr: '0xf392...e73c', time: '3h ago', delta: 169.7, milestone: 9.9, cap: '$6.69K', price: '$0.000006691', tax: '3%/3%', holders: '28', vol: '$4.73K', pair: 'cirbtc' },
  { ticker: '$BOOA', name: 'Book Of Arc', addr: '0x196a...5cA1', time: '15h ago', delta: 7.2, milestone: 0.4, cap: '$2.66K', price: '$0.00000266', tax: '2%/2%', holders: '6', vol: '$292.01', pair: 'argus' },
  { ticker: '$AQUA', name: 'AQUA', addr: '0x678D...d013', time: '16h ago', delta: 209.4, milestone: 12.2, cap: '$7.67K', price: '$0.000007675', tax: '4%/4%', holders: '165', vol: '$79.4K', pair: 'weth' },
  { ticker: '$MA...', name: 'Marc de Triomphe', addr: '0x97d9...38Ee', time: '1m ago', delta: 0.05, milestone: 0, cap: '$2.49K', price: '$0.000002486', tax: '2%/2%', holders: '0', vol: '$196.16', pair: 'eurc' },
  { ticker: '$PIDOR', name: 'PIDORAS', addr: '0xec42...E330', time: '16h ago', delta: 0.4, milestone: 0, cap: '$2.49K', price: '$0.00000249', tax: '1%/1%', holders: '0', vol: '$11.3K', pair: 'usdc' },
  { ticker: '$PHA...', name: 'PHANTOM ON ARC', addr: '0x661e...ba92', time: '9h ago', delta: 177.1, milestone: 10.3, cap: '$6.87K', price: '$0.000006873', tax: '3%/3%', holders: '35', vol: '$23.4K', pair: 'arcash' },
  { ticker: '$USDC CO', name: 'usdc cool', addr: '0x8C2e...5CC7', time: '33m ago', delta: 38, milestone: 3, cap: '$6.89K', price: '$0.000006892', tax: '1%/1%', holders: '29', vol: '$40.1K', pair: 'usdc' },
  { ticker: '$NI...', name: 'Dog Wif Nunchaku', addr: '0xdCcd...55b9', time: '6h ago', delta: 0.8, milestone: 0, cap: '$2.5K', price: '$0.0000025', tax: '3%/3%', holders: '1', vol: '$70.38', pair: 'weth' },
  { ticker: '$ARC...', name: 'Arcus Economy', addr: '0x49D4...2219', time: '12h ago', delta: 2.7, milestone: 0.2, cap: '$2.55K', price: '$0.000002548', tax: '1%/1%', holders: '13', vol: '$33.5K', pair: 'argus' },
  { ticker: '$MA...', name: 'Marc de Triomphe', addr: '0x2f12...6AA1', time: '5m ago', delta: 0.8, milestone: 0, cap: '$2.5K', price: '$0.000002501', tax: '1%/1%', holders: '1', vol: '$1.14K', pair: 'eurc' },
  { ticker: '$WARPR', name: 'Warpr', addr: '0xbdBa...B3dC', time: '2h ago', delta: 124.2, milestone: 7.2, cap: '$5.56K', price: '$0.000005563', tax: '2%/2%', holders: '27', vol: '$2.31K', pair: 'xaum' },
  { ticker: '$AT...', name: 'ALL THE STABLES', addr: '0xAC3D...81B3', time: '1d ago', delta: -12.8, milestone: 5.9, cap: '$5K', price: '$0.000005003', tax: '1%/1%', holders: '24', vol: '$278.74', pair: 'usdc' },
  { ticker: '$BARCY', name: 'BARCY', addr: '0x5D52...e53d', time: '7h ago', delta: 166.6, milestone: 9.7, cap: '$6.61K', price: '$0.000006614', tax: '1%/1%', holders: '37', vol: '$3.43K', pair: 'cirbtc' },
  { ticker: '$AURA', name: 'AURA', addr: '0x97d9...38Ee', time: '4m ago', delta: 0.05, milestone: 0, cap: '$2.48K', price: '$0.000002481', tax: '1%/3%', holders: '0', vol: '$19.70', pair: 'usdc' },
  { ticker: '$ROY', name: 'Royld', addr: '0x80C7...8279', time: '18m ago', delta: 63, milestone: 3.7, cap: '$4.04K', price: '$0.000004044', tax: '1%/1%', holders: '9', vol: '$1.01K', pair: 'arcash' },
  { ticker: '$PNCHSM', name: 'Panchu Superman', addr: '0xB4fF...13e1', time: '51m ago', delta: 0.4, milestone: 0, cap: '$2.49K', price: '$0.000002489', tax: '3%/3%', holders: '4', vol: '$3.98', pair: 'weth' },
];

/* ---------- render: contenders ---------- */

function renderContenders() {
  const list = document.getElementById('contendersList');
  list.innerHTML = '';
  CONTENDERS.forEach(c => {
    const li = document.createElement('li');

    const rank = document.createElement('span');
    rank.className = 'c-rank';
    rank.textContent = c.rank;

    /* Use real image if available, else fallback avatar */
    const imgSrc = getTokenImg(c.ticker, c.ticker);
    let avatarEl;
    if (imgSrc) {
      avatarEl = document.createElement('img');
      avatarEl.src = imgSrc;
      avatarEl.alt = c.ticker;
      avatarEl.className = 'avatar avatar-md avatar-img';
    } else {
      avatarEl = makeAvatar(c.ticker, 'md');
    }

    const name = document.createElement('div');
    name.className = 'c-name';
    name.innerHTML = `<strong>${c.ticker}</strong>`;

    const value = document.createElement('div');
    value.className = 'c-value';
    const sign = c.delta >= 0 ? '+' : '';
    value.innerHTML = `
      <span class="c-price">${c.value}</span>
      <span class="delta ${c.delta >= 0 ? 'pos' : 'neg'}">${sign}${c.delta}% 24h</span>
    `;

    const link = document.createElement('i');
    link.className = 'ri-external-link-line';

    li.append(rank, avatarEl, name, value, link);
    list.appendChild(li);
  });
}

/* ---------- render: top by market cap ---------- */

function renderMcap() {
  const grid = document.getElementById('mcapGrid');
  grid.innerHTML = '';
  MCAP.forEach(m => {
    const card = document.createElement('div');
    card.className = 'mcap-card';

    /* Real image or fallback avatar */
    const imgSrc = getTokenImg(m.ticker, m.ticker);
    let avatarEl;
    if (imgSrc) {
      avatarEl = document.createElement('img');
      avatarEl.src = imgSrc;
      avatarEl.alt = m.ticker;
      avatarEl.className = 'avatar avatar-md avatar-img';
    } else {
      avatarEl = makeAvatar(m.ticker, 'md');
    }

    const info = document.createElement('div');
    info.className = 'mcap-info';
    info.innerHTML = `<strong>${m.ticker}</strong><span>${m.cap}</span>`;

    const right = document.createElement('div');
    right.className = 'mcap-right';
    const sign = m.delta >= 0 ? '+' : '';
    right.innerHTML = `
      <span class="delta ${m.delta >= 0 ? 'pos' : 'neg'}">${sign}${m.delta}%</span>
      <span class="liq">${m.liq}</span>
    `;

    card.append(avatarEl, info, right);
    grid.appendChild(card);
  });
}

/* ---------- render: token grid ---------- */

function renderTokens(tokens) {
  const grid = document.getElementById('tokenGrid');
  grid.innerHTML = '';

  tokens.forEach(t => {
    const card = document.createElement('article');
    card.className = 'token-card';

    /* thumb */
    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'token-thumb-wrap';

    const imgSrc = getTokenImg(t.ticker, t.name);
    if (imgSrc) {
      const imgEl = document.createElement('img');
      imgEl.src = imgSrc;
      imgEl.alt = t.name;
      imgEl.className = 'token-thumb token-thumb-real';
      thumbWrap.appendChild(imgEl);
    } else {
      thumbWrap.appendChild(makeThumb(t.ticker + t.name));
    }

    const sign = t.delta >= 0 ? '+' : '';
    const badge = document.createElement('span');
    badge.className = 'badge-delta';
    badge.textContent = `${sign}${t.delta}% 24h`;
    thumbWrap.appendChild(badge);

    if (t.milestone > 0) {
      const ms = document.createElement('div');
      ms.className = 'milestone-wrap';
      ms.innerHTML = `
        <span class="milestone-label">${t.milestone}% of milestone</span>
        <div class="milestone-bar"><div class="milestone-fill" style="width:${Math.min(t.milestone, 100)}%"></div></div>
      `;
      thumbWrap.appendChild(ms);
    } else {
      const ms = document.createElement('div');
      ms.className = 'milestone-wrap';
      ms.innerHTML = `
        <span class="milestone-label">0% of milestone</span>
        <div class="milestone-bar"><div class="milestone-fill" style="width:0%"></div></div>
      `;
      thumbWrap.appendChild(ms);
    }

    /* body */
    const body = document.createElement('div');
    body.className = 'token-body';

    const titleRow = document.createElement('div');
    titleRow.className = 'token-title-row';
    const pairImg = t.pair && PAIR_IMAGES[t.pair] ? `<img src="${PAIR_IMAGES[t.pair]}" alt="${t.pair}" class="pair-coin-img">` : `<i class="ri-money-dollar-circle-fill"></i>`;
    titleRow.innerHTML = `
      <div class="token-title">
        <div class="token-name-block">
          <span class="token-ticker">${t.ticker}</span>
          <span class="token-name">${t.name}</span>
        </div>
      </div>
      <div class="token-paired">
        <span>Paired with:</span>
        <span class="pair-token-icon">${pairImg}</span>
      </div>
    `;

    const meta = document.createElement('div');
    meta.className = 'token-meta';
    meta.innerHTML = `<span class="addr">${t.addr}</span><span class="dot">&middot;</span><span class="time">${t.time}</span>`;

    const statsRow = document.createElement('div');
    statsRow.className = 'token-stats-row';
    statsRow.innerHTML = `
      <div class="col">
        <span class="label">Market cap</span>
        <span class="value">${t.cap}</span>
      </div>
      <div class="col right">
        <span class="label">Price</span>
        <span class="value">${t.price}</span>
      </div>
    `;

    const footerRow = document.createElement('div');
    footerRow.className = 'token-footer-row';
    footerRow.innerHTML = `
      <span>Tax ${t.tax}</span>
      <span class="holders"><i class="ri-group-line"></i>${t.holders}</span>
      <span>Vol ${t.vol}</span>
    `;

    body.append(titleRow, meta, statsRow, footerRow);
    card.append(thumbWrap, body);
    grid.appendChild(card);
  });
}

/* ---------- interactions ---------- */

function initTabs() {
  const tabs = document.querySelectorAll('.market-tabs .tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      let ordered = TOKENS;
      if (tab.dataset.tab === 'new') {
        ordered = [...TOKENS].sort((a, b) => parseTime(a.time) - parseTime(b.time));
      } else if (tab.dataset.tab === 'graduated') {
        ordered = [...TOKENS].filter(t => t.milestone >= 9);
        if (!ordered.length) ordered = TOKENS;
      }
      renderTokens(ordered);
    });
  });
}

function parseTime(str) {
  const n = parseInt(str, 10) || 0;
  if (str.includes('m')) return n;
  if (str.includes('h')) return n * 60;
  if (str.includes('d')) return n * 1440;
  return 0;
}

function initPairFilters() {
  const pills = document.querySelectorAll('#pairFilters .pair-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

function initViewToggle() {
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');
  const grid = document.getElementById('tokenGrid');

  gridBtn.addEventListener('click', () => {
    grid.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });

  listBtn.addEventListener('click', () => {
    grid.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });
}

function initSort() {
  const sortBtn = document.getElementById('sortSelect');
  const options = ['Last trade', 'Market cap: high to low', 'Market cap: low to high', '24h change'];
  let idx = 0;

  sortBtn.addEventListener('click', () => {
    idx = (idx + 1) % options.length;
    sortBtn.querySelector('span').textContent = options[idx];

    let sorted = [...TOKENS];
    if (options[idx].includes('high to low')) {
      sorted.sort((a, b) => parseFloat(b.cap.replace(/[^0-9.]/g, '')) - parseFloat(a.cap.replace(/[^0-9.]/g, '')));
    } else if (options[idx].includes('low to high')) {
      sorted.sort((a, b) => parseFloat(a.cap.replace(/[^0-9.]/g, '')) - parseFloat(b.cap.replace(/[^0-9.]/g, '')));
    } else if (options[idx] === '24h change') {
      sorted.sort((a, b) => b.delta - a.delta);
    }
    renderTokens(sorted);
  });
}

function initPagination() {
  const numBtns = document.querySelectorAll('.page-btn.num');
  const info = document.getElementById('paginationInfo');

  numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      numBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const page = btn.dataset.page;
      info.textContent = `Showing 1\u201324 of 134,571 \u00b7 page ${page} of 5608`;
      document.getElementById('tokenGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    const active = document.querySelector('.page-btn.num.active');
    const next = active && active.nextElementSibling && active.nextElementSibling.classList.contains('num')
      ? active.nextElementSibling
      : numBtns[1];
    next.click();
  });

  document.getElementById('prevPage').addEventListener('click', () => {
    const active = document.querySelector('.page-btn.num.active');
    const prev = active && active.previousElementSibling && active.previousElementSibling.classList.contains('num')
      ? active.previousElementSibling
      : numBtns[0];
    prev.click();
  });
}

function initSearch() {
  const modal = document.getElementById('searchModal');
  const backdrop = document.getElementById('searchBackdrop');
  const trigger = document.getElementById('searchTrigger');
  const input = document.getElementById('searchInput');

  const open = () => {
    modal.classList.add('open');
    setTimeout(() => input.focus(), 30);
  };
  const close = () => {
    modal.classList.remove('open');
    input.value = '';
  };

  trigger.addEventListener('click', open);
  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('open') ? close() : open();
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
}

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const root = document.documentElement;

  btn.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      icon.className = 'ri-moon-line';
    } else {
      root.setAttribute('data-theme', 'light');
      icon.className = 'ri-sun-line';
    }
  });
}

function initYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

function initStaticAvatars() {
  document.querySelectorAll('[data-placeholder]').forEach(el => {
    const seed = el.dataset.seed || 'X';
    const [a1, a2] = paletteFor(seed);
    el.style.setProperty('--a1', a1);
    el.style.setProperty('--a2', a2);
    el.textContent = seed.replace(/^\$/, '')[0].toUpperCase();
  });
}

/* ---------- init ---------- */

document.addEventListener('DOMContentLoaded', () => {
  initStaticAvatars();
  renderContenders();
  renderMcap();
  renderTokens(TOKENS);

  initTabs();
  initPairFilters();
  initViewToggle();
  initSort();
  initPagination();
  initSearch();
  initThemeToggle();
  initYear();
});

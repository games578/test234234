/* Rexora Pro marketing site — plain JS, no dependencies. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };

  /* ---------- pages (home / install) ---------- */
  const pages = { home: $('#home'), install: $('#install') };
  function showPage(name, { scroll = true } = {}) {
    if (!pages[name]) name = 'home';
    Object.entries(pages).forEach(([k, p]) => p.classList.toggle('active', k === name));
    if (name === 'install') maybeShowBrowserGate();
    if (scroll) window.scrollTo({ top: 0 });
    closeMenu();
  }
  $$('[data-nav]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const name = a.dataset.nav;
    history.pushState(null, '', name === 'home' ? location.pathname : '#' + name);
    showPage(name);
  }));
  function route() {
    const h = location.hash.slice(1);
    if (h === 'install') showPage('install', { scroll: false });
    else { showPage('home', { scroll: false }); if (h && $('#' + h)) $('#' + h).scrollIntoView(); }
  }
  addEventListener('popstate', route);

  /* ---------- header, progress bar, mobile menu ---------- */
  const header = $('.site-header'), bar = $('[data-scroll-progress]');
  const menuBtn = $('[data-menu]'), links = $('[data-nav-links]');
  function onScroll() {
    header.classList.toggle('scrolled', scrollY > 8);
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = max > 0 ? (scrollY / max * 100) + '%' : '0';
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function closeMenu() { links.classList.remove('open'); menuBtn.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  $$('a[href^="#"]:not([data-nav])', links).forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- reveal on scroll ---------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 }) : null;
  $$('.reveal').forEach((n, i) => { n.style.setProperty('--d', (i % 4) * 60 + 'ms'); io ? io.observe(n) : n.classList.add('in'); });

  /* ---------- FAQ: one open at a time ---------- */
  const faq = $$('.faq details');
  faq.forEach(d => d.addEventListener('toggle', () => { if (d.open) faq.forEach(o => { if (o !== d) o.open = false; }); }));

  /* ---------- live tokens (public DexScreener data) ---------- */
  const API = 'https://api.dexscreener.com/';
  const CHAINS = { solana: ['Solana', 'images/solana.svg'], ethereum: ['Ethereum', 'images/eth.svg'], bsc: ['BNB Chain', 'images/bsc.svg'] };
  const feed = $('[data-markets]'), rescanBtn = $('[data-edge-rescan]'), rescanLabel = $('[data-edge-rescan-label]'), agoEl = $('[data-scan-ago]');
  let pool = [], cursor = 0, updatedAt = 0, loading = false;
  const money = n => n == null || !isFinite(n) ? '—' : n >= 1e9 ? '$' + (n / 1e9).toFixed(2) + 'B' : n >= 1e6 ? '$' + (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? '$' + (n / 1e3).toFixed(1) + 'K' : '$' + n.toFixed(0);
  function riskOf(p) {
    const l = p.liquidity?.usd || 0, mc = p.marketCap || p.fdv || 0, c = p.priceChange || {}, t = p.txns?.h1 || {};
    let r = 0;
    if (l < 5e3) r += 3; else if (l < 25e3) r += 2;
    if (mc && l / mc < .02) r += 2;
    if (p.pairCreatedAt && Date.now() - p.pairCreatedAt < 36e5) r += 1;
    if (c.h24 < -60) r += 2; if (c.h1 < -30) r += 1;
    if (t.sells > t.buys * 1.5 && t.buys + t.sells > 20) r += 1;
    return r >= 5 ? 'HIGH' : r >= 2 ? 'MEDIUM' : 'LOW';
  }
  async function getJSON(url) { const r = await fetch(url); if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }
  async function loadPool() {
    const boosts = await getJSON(API + 'token-boosts/top/v1');
    const seen = new Set(), byChain = {};
    boosts.filter(b => CHAINS[b.chainId]).forEach(b => {
      const k = b.chainId + b.tokenAddress; if (seen.has(k) || seen.size >= 24) return; seen.add(k);
      (byChain[b.chainId] ||= []).push(b.tokenAddress);
    });
    const lists = await Promise.all(Object.entries(byChain).map(([c, a]) => getJSON(`${API}tokens/v1/${c}/${a.join(',')}`).catch(() => [])));
    const best = new Map();
    lists.flat().forEach(p => { const k = p.chainId + p.baseToken.address; if (!best.has(k) || (p.liquidity?.usd || 0) > (best.get(k).liquidity?.usd || 0)) best.set(k, p); });
    pool = [...best.values()].filter(p => p.priceUsd && (p.marketCap || p.fdv)); cursor = 0;
  }
  function card(p) {
    const c = el('div', 'edge-pick tk is-in'), top = el('div', 'tk-top'), id = el('div', 'tk-id');
    const letter = () => el('span', 'tk-ico tk-ph', (p.baseToken.symbol || '?')[0].toUpperCase());
    let img = letter(); const u = p.info?.imageUrl;
    if (/^https:\/\//.test(u || '')) { const im = el('img', 'tk-ico'); im.alt = ''; im.width = im.height = 40; im.loading = 'lazy'; im.onerror = () => im.replaceWith(letter()); im.src = u; img = im; }
    id.append(el('b', '', '$' + (p.baseToken.symbol || '?')), el('span', '', p.baseToken.name || ''));
    const ch = CHAINS[p.chainId], cimg = el('img', 'tk-chain'); cimg.src = ch[1]; cimg.alt = ch[0]; cimg.title = ch[0]; cimg.width = cimg.height = 18;
    const risk = riskOf(p), badge = el('span', 'tk-risk ' + risk.toLowerCase(), risk + ' RISK');
    top.append(img, id, cimg);
    const chg = p.priceChange?.h24, g = el('div', 'tk-grid');
    [['Market cap', money(p.marketCap || p.fdv)], ['Liquidity', money(p.liquidity?.usd)], ['Vol 24h', money(p.volume?.h24)]].forEach(([a, b]) => { const d = el('div'); d.append(el('span', '', a), el('b', '', b)); g.append(d); });
    const foot = el('div', 'tk-foot'), cs = el('span', 'tk-chg ' + (chg >= 0 ? 'up' : 'down'), chg == null ? '—' : (chg > 0 ? '+' : '') + chg.toFixed(1) + '% 24h');
    foot.append(cs, badge);
    c.append(top, g, foot); return c;
  }
  function render() {
    const batch = pool.slice(cursor, cursor + 4);
    feed.replaceChildren(...(batch.length ? batch.map(card) : [el('div', 'edge-card-empty', 'No market data right now. Try Rescan.')]));
    updatedAt = Date.now(); tickAgo();
  }
  async function rescan(manual) {
    if (loading) return; loading = true;
    feed.classList.add('is-scanning'); rescanBtn.classList.add('is-scanning'); rescanLabel.textContent = 'Scanning…';
    try {
      cursor += 4;
      if (!pool.length || cursor >= pool.length) await loadPool();
      render();
    } catch (e) {
      if (!pool.length) feed.replaceChildren(el('div', 'edge-card-empty', 'Market data is unavailable right now. Try Rescan in a moment.'));
    } finally {
      setTimeout(() => { feed.classList.remove('is-scanning'); rescanBtn.classList.remove('is-scanning'); rescanLabel.textContent = 'Rescan'; loading = false; }, manual ? 500 : 0);
    }
  }
  function tickAgo() { const s = Math.round((Date.now() - updatedAt) / 1000); agoEl.textContent = !updatedAt || s < 5 ? 'just now' : s < 60 ? s + 's ago' : Math.round(s / 60) + 'm ago'; }
  rescanBtn.addEventListener('click', () => rescan(true));
  setInterval(tickAgo, 5000);
  setInterval(() => { if (!document.hidden && pages.home.classList.contains('active')) rescan(false); }, 45000);
  // first load: only when the section is about to be seen
  let firstLoad = false;
  const startFeed = () => { if (!firstLoad) { firstLoad = true; cursor = -4; rescan(false); } };
  'IntersectionObserver' in window ? new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { startFeed(); o.disconnect(); } }, { rootMargin: '300px' }).observe(feed) : startFeed();

  /* ---------- AI Trader demo (simulated, labelled "Demo" on the page) ---------- */
  const riskIn = $('[data-risk-input]'), riskVal = $('[data-risk-level]'), riskFill = $('[data-risk-fill]');
  const pnlEl = $('[data-pulse-pnl]'), fillsEl = $('[data-pulse-fills]'), winEl = $('[data-pulse-win]'), avgEl = $('[data-pulse-avg]');
  const orders = $('[data-pulse-orders]'), cv = $('[data-pnl-canvas]'), ctx = cv.getContext('2d');
  const demo = { pnl: 0, series: [0], fills: 0, wins: 0, winSum: 0 };
  const TICKERS = ['PEPE', 'WIF', 'BONK', 'POPCAT', 'MOG', 'FWOG', 'GOAT', 'PNUT'];
  const usd = n => (n < 0 ? '-' : '') + '$' + Math.abs(n).toFixed(2);
  function setRisk() {
    const v = +riskIn.value; riskVal.textContent = v; riskFill.style.width = v + '%'; riskIn.parentElement.style.setProperty('--v', v + '%');
  }
  riskIn.addEventListener('input', setRisk); setRisk();
  function drawChart() {
    const w = cv.width, h = cv.height, s = demo.series, pad = 18;
    ctx.clearRect(0, 0, w, h);
    const min = Math.min(0, ...s), max = Math.max(0, ...s), span = (max - min) || 1;
    const x = i => pad + i * (w - pad * 2) / Math.max(s.length - 1, 1), y = v => h - pad - (v - min) / span * (h - pad * 2);
    ctx.strokeStyle = 'rgba(201,230,212,0.08)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad, y(0)); ctx.lineTo(w - pad, y(0)); ctx.stroke();
    const up = demo.pnl >= 0, col = up ? '93,255,46' : '255,93,122';
    const grad = ctx.createLinearGradient(0, 0, 0, h); grad.addColorStop(0, `rgba(${col},0.28)`); grad.addColorStop(1, `rgba(${col},0)`);
    ctx.beginPath(); s.forEach((v, i) => i ? ctx.lineTo(x(i), y(v)) : ctx.moveTo(x(i), y(v)));
    ctx.strokeStyle = `rgb(${col})`; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.lineTo(x(s.length - 1), y(0)); ctx.lineTo(x(0), y(0)); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
  }
  function demoFill() {
    const risk = +riskIn.value, size = 20 + (120 - 20) * risk / 100, sym = TICKERS[Math.floor(Math.random() * TICKERS.length)];
    // zero-drift outcome: the demo shows ups and downs, it does not promise profit
    const pnl = (Math.random() - .5) * 2 * size * (.06 + risk / 100 * .22);
    demo.pnl += pnl; demo.fills++; if (pnl > 0) { demo.wins++; demo.winSum += pnl; }
    demo.series.push(demo.pnl); if (demo.series.length > 40) demo.series.shift();
    const buy = el('li', 'enter'), sell = el('li', 'enter');
    buy.append(el('span', 'tag buy', 'BUY'), el('span', 'ttl', '$' + sym), el('span', 'val buy', usd(size)));
    sell.append(el('span', 'tag sell', 'SELL'), el('span', 'ttl', '$' + sym), el('span', 'val ' + (pnl >= 0 ? 'win' : 'loss'), (pnl > 0 ? '+' : '') + usd(pnl)));
    orders.prepend(sell, buy); [sell, buy].forEach(n => requestAnimationFrame(() => requestAnimationFrame(() => n.classList.add('show'))));
    while (orders.children.length > 6) orders.lastElementChild.remove();
    pnlEl.textContent = (demo.pnl > 0 ? '+' : '') + usd(demo.pnl); pnlEl.className = demo.pnl >= 0 ? 'up' : 'down';
    fillsEl.textContent = demo.fills; winEl.textContent = Math.round(demo.wins / demo.fills * 100) + '%';
    avgEl.textContent = demo.wins ? usd(demo.winSum / demo.wins) : '—'; drawChart();
  }
  drawChart();
  setInterval(() => { if (!document.hidden && pages.home.classList.contains('active')) demoFill(); }, 2600);

  /* ---------- install: drag modal and browser gate ---------- */
  const modal = $('[data-drag-modal]'), launcher = $('#launcher'), gate = $('[data-browser-gate]');
  const isMobile = matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  const openModal = () => { $('[data-drag-desktop]').hidden = isMobile; $('[data-drag-mobile]').hidden = !isMobile; modal.hidden = false; };
  const closeModal = () => { modal.hidden = true; };
  launcher.addEventListener('click', e => { e.preventDefault(); openModal(); });   // a click must never run the bookmark here
  launcher.addEventListener('dragstart', closeModal);
  $$('[data-drag-close]').forEach(b => b.addEventListener('click', closeModal));
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeMenu(); } });
  function maybeShowBrowserGate() { gate.hidden = !/Firefox\//.test(navigator.userAgent); }

  route();
})();

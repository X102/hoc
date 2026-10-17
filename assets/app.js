/* Kết nối tri thức — ứng dụng học tập tĩnh, không cần máy chủ.
   Dữ liệu: assets/data.js (môn học, tài liệu), assets/data-extra.js (link đã kiểm chứng), assets/cards.js (thẻ phỏng vấn).
   Tiến độ lưu trong localStorage của trình duyệt (khoá 'ktt-state-v1'). */
(function () {
'use strict';

/* ================= Tiện ích ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const enc = encodeURIComponent;
const pad = n => String(n).padStart(2, '0');
const DAY = 864e5;
function iso(d) { d = d instanceof Date ? d : new Date(d); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function parseISO(s) { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1); }
function addDays(s, n) { const d = parseISO(s); d.setDate(d.getDate() + n); return iso(d); }
function today() { return iso(new Date()); }
function daysBetween(a, b) { return Math.round((parseISO(b) - parseISO(a)) / DAY); }
function fmt(s) { const d = parseISO(s); return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear(); }
function fmtShort(s) { const d = parseISO(s); return pad(d.getDate()) + '.' + pad(d.getMonth() + 1); }
function monday(s) { const d = parseISO(s); const wd = (d.getDay() + 6) % 7; d.setDate(d.getDate() - wd); return iso(d); }
function hash(str) { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }
function download(name, text, mime) {
  const blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600); }
function plural(n, w) { return n + ' ' + w; }
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function normUrl(u) { return String(u || '').trim().replace(/^http:\/\//, 'https://').replace(/^https:\/\/www\./, 'https://').replace(/\/+$/, '').replace(/\/index\.html?$/, '').toLowerCase(); }

/* ================= Dữ liệu ================= */
const D = window.KTT_DATA || { tracks: [], subjects: {} };
const EXTRA = window.KTT_EXTRA || [];
const CARDS = window.KTT_CARDS || [];
const TR = {}; D.tracks.forEach(t => TR[t.id] = t);
const SUB = D.subjects;
const LEVELS = [
  { id: 'bac', vi: 'Cử nhân', ru: 'Бакалавриат' },
  { id: 'mag', vi: 'Thạc sĩ', ru: 'Магистратура' },
  { id: 'asp', vi: 'Nghiên cứu sinh', ru: 'Аспирантура' },
  { id: 'tools', vi: 'Công cụ & kỹ năng', ru: 'Инструменты' }
];
const TYPES = {
  course: { vi: 'Khoá học, bài giảng video', ic: 'cap' },
  youtube: { vi: 'YouTube', ic: 'play' },
  rutube: { vi: 'RuTube', ic: 'play' },
  vk: { vi: 'VK Video', ic: 'play' },
  free: { vi: 'Giáo trình đọc miễn phí', ic: 'open' },
  notes: { vi: 'Bài giảng, tài liệu đọc', ic: 'doc' },
  book: { vi: 'Sách (bản in, tìm mua/mượn)', ic: 'book' },
  paper: { vi: 'Bài báo nền tảng', ic: 'doc' },
  site: { vi: 'Trang tham khảo, tài liệu kỹ thuật', ic: 'globe' },
  tool: { vi: 'Công cụ, phần mềm', ic: 'tool' },
  data: { vi: 'Nguồn dữ liệu', ic: 'data' },
  practice: { vi: 'Luyện tập', ic: 'tool' },
  journal: { vi: 'Tạp chí', ic: 'journal' },
  law: { vi: 'Văn bản pháp lý', ic: 'doc' },
  job: { vi: 'Việc làm', ic: 'globe' },
  custom: { vi: 'Link bạn tự thêm', ic: 'pin' }
};
const TYPE_ORDER = Object.keys(TYPES);
const LANGS = { ru: 'RU', en: 'EN', zh: 'ZH', vi: 'VI' };
const ICONS = {
  cap: '<path d="M2 9l10-5 10 5-10 5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 11v5c3 2 9 2 12 0v-5" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  play: '<rect x="2.5" y="5" width="19" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>',
  open: '<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6v14" stroke="currentColor" stroke-width="1.8"/>',
  book: '<path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 17a2 2 0 0 1 2-2h12" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  doc: '<path d="M6 2h8l4 4v16H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 11h6M9 15h6" stroke="currentColor" stroke-width="1.8"/>',
  globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  tool: '<path d="M14 6a4 4 0 0 0 5 5l-8 8a2 2 0 0 1-3-3l8-8a4 4 0 0 0-2-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  data: '<ellipse cx="12" cy="6" rx="7" ry="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3 3 7 3s7-1.3 7-3" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  journal: '<rect x="4" y="3" width="16" height="18" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" stroke-width="1.8"/>',
  pin: '<path d="M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2" fill="currentColor"/>'
};
const icon = (k, cls) => '<svg class="' + (cls || 'typeic') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[k] || ICONS.globe) + '</svg>';

const FIND = {
  ytr: { n: 'YouTube (RU)', u: q => 'https://www.youtube.com/results?search_query=' + enc(q), q: 'r' },
  yte: { n: 'YouTube (EN)', u: q => 'https://www.youtube.com/results?search_query=' + enc(q), q: 'e' },
  rt: { n: 'RuTube', u: q => 'https://rutube.ru/search/?query=' + enc(q), q: 'r' },
  vk: { n: 'VK Видео', u: q => 'https://vk.com/video?q=' + enc(q), q: 'r' },
  bl: { n: 'Bilibili', u: q => 'https://search.bilibili.com/all?keyword=' + enc(q), q: 'z' },
  st: { n: 'Stepik', u: q => 'https://stepik.org/catalog/search?q=' + enc(q), q: 'r' },
  cr: { n: 'Coursera', u: q => 'https://www.coursera.org/search?query=' + enc(q), q: 'e' },
  cl: { n: 'КиберЛенинка', u: q => 'https://cyberleninka.ru/search?q=' + enc(q), q: 'r' },
  sch: { n: 'Google Scholar', u: q => 'https://scholar.google.com/scholar?q=' + enc(q), q: 'e' },
  ax: { n: 'arXiv', u: q => 'https://arxiv.org/search/?query=' + enc(q) + '&searchtype=all', q: 'e' },
  hb: { n: 'Хабр', u: q => 'https://habr.com/ru/search/?q=' + enc(q), q: 'r' },
  wk: { n: 'Википедия', u: q => 'https://ru.wikipedia.org/w/index.php?search=' + enc(q), q: 'r' }
};
const FIND_SETS = {
  tech: ['ytr', 'yte', 'rt', 'vk', 'st', 'cr', 'cl', 'sch', 'ax', 'hb'],
  lang: ['ytr', 'yte', 'rt', 'vk', 'bl', 'st', 'cr', 'cl', 'wk'],
  soft: ['ytr', 'yte', 'rt', 'vk', 'st', 'cr', 'hb', 'cl']
};
const bookSearch = t => 'https://www.google.com/search?tbm=bks&q=' + enc(t);

// thành viên hướng học của mỗi môn
const SUBTRACKS = {};
const SUBLEVEL = {};
D.tracks.forEach(t => LEVELS.forEach(L => (t.levels[L.id] || []).forEach(g => g[1].forEach(sid => {
  (SUBTRACKS[sid] = SUBTRACKS[sid] || []); if (!SUBTRACKS[sid].includes(t.id)) SUBTRACKS[sid].push(t.id);
  if (!SUBLEVEL[sid + '@' + t.id]) SUBLEVEL[sid + '@' + t.id] = L.id;
}))));
const subColor = sid => { const t = TR[(SUBTRACKS[sid] || [])[0]]; return t ? 'var(--t-' + t.id + ')' : 'var(--ink-3)'; };
function trackSubjects(tid, order) {
  const t = TR[tid], out = []; if (!t) return out;
  (order || LEVELS.map(L => L.id)).forEach(lv => (t.levels[lv] || []).forEach(g => g[1].forEach(sid => { if (SUB[sid] && !out.includes(sid)) out.push(sid); })));
  return out;
}

/* ================= Trạng thái ================= */
const KEY = 'ktt-state-v1';
function defaults() {
  const t = today();
  return {
    v: 1, status: {}, conf: {}, notes: {}, notesT: {}, seen: {}, fav: {}, custom: {}, cards: {}, mycards: [], log: {}, logSub: {}, mock: [],
    plan: { start: t, end: addDays(t, 182), hours: 18, coreOnly: true, order: ['ai', 'uav', 'math', 'career', 'research', 'phys', 'lang'], on: { ai: 1, uav: 1, math: 1, career: 1 }, langOn: true, langMin: 30, langWhich: 'tiếng Anh và tiếng Trung' },
    theme: 'auto', pomo: { work: 25, brk: 5, sid: '' }, cardTracks: [], newPerDay: 10
  };
}
let S = load();
function load() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { s = null; }
  const d = defaults();
  if (!s || typeof s !== 'object') return d;
  const m = Object.assign(d, s);
  m.plan = Object.assign(defaults().plan, s.plan || {});
  m.pomo = Object.assign(defaults().pomo, s.pomo || {});
  D.tracks.forEach(t => { if (!m.plan.order.includes(t.id)) m.plan.order.push(t.id); });
  return m;
}
const saveNow = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* bộ nhớ bị chặn: vẫn chạy bình thường trong phiên */ } };
const save = debounce(saveNow, 250);
window.addEventListener('beforeunload', saveNow);

/* ================= Tài liệu: gộp dữ liệu gốc + link kiểm chứng + link người dùng ================= */
const RES = {}; // sid -> [res]
const RID = {}; // id -> res
function mkRes(sid, type, title, url, lang, note, src) {
  const r = { sid, type: TYPES[type] ? type : 'site', title: title || url, url: url || '', lang: lang || '', note: note || '', src };
  r.id = hash(sid + '|' + (url ? normUrl(url) : title));
  return r;
}
function buildRes() {
  Object.keys(SUB).forEach(sid => {
    const s = SUB[sid], seen = new Set(), arr = [];
    const push = r => { const k = r.url ? normUrl(r.url) : 't:' + r.title; if (seen.has(k)) return; seen.add(k); arr.push(r); RID[r.id] = r; };
    (s.r || []).forEach(x => push(mkRes(sid, x[0], x[1], x[2], x[3], x[4], 'base')));
    EXTRA.filter(x => x[0] === sid).forEach(x => push(mkRes(sid, x[1], x[3], x[4], x[2], x[5], 'extra')));
    (S.custom[sid] || []).forEach(x => { const r = mkRes(sid, 'custom', x.title, x.url, x.lang || '', x.note || '', 'custom'); r.cid = x.id; push(r); });
    RES[sid] = arr;
  });
}
buildRes();
const resCount = sid => (RES[sid] || []).length;
function resLink(r) { return r.url || (r.type === 'book' ? bookSearch(r.title) : ''); }

/* ================= Lộ trình ================= */
const REVIEW_TEXT = [
  'Ôn thẻ phỏng vấn mỗi ngày (lặp ngắt quãng), ưu tiên thẻ ở hộp 1–2',
  'Hai buổi phỏng vấn thử mỗi tuần, ghi âm và tự chấm',
  'Hoàn thiện CV, thư xin việc, portfolio GitHub',
  'Đọc lại ghi chú các môn đã đánh dấu «tự tin thấp»'
];
let PLAN = null;
function buildPlan() {
  const p = S.plan;
  const start = monday(p.start || today());
  let end = p.end || addDays(start, 182);
  if (daysBetween(start, end) < 28) end = addDays(start, 28);
  const totalWeeks = Math.max(4, Math.ceil((daysBetween(start, end) + 1) / 7));
  const reviewWeeks = totalWeeks >= 12 ? 2 : 1;
  const studyWeeks = totalWeeks - reviewWeeks;
  const langH = p.langOn ? Math.round(p.langMin * 7 / 60 * 10) / 10 : 0;
  const weekly = Math.max(2, (Number(p.hours) || 10) - langH);
  const order = p.order.filter(id => p.on[id] && TR[id]);
  const used = new Set();
  const queues = order.map(tid => {
    const q = [];
    trackSubjects(tid, ['bac', 'tools', 'mag', 'asp']).forEach(sid => {
      const s = SUB[sid]; if (!s || used.has(sid)) return;
      if (S.status[sid] === 3) return;
      if (p.coreOnly && !s.core) return;
      used.add(sid); q.push({ sid, left: s.h || 8, total: s.h || 8, tid });
    });
    return q;
  });
  const weights = order.map((_, i) => i === 0 ? 3 : i < 3 ? 2 : 1);
  const seq = []; weights.forEach((w, i) => { for (let k = 0; k < w; k++) seq.push(i); });
  // xen kẽ các hướng: 0,1,2,0,1,2,0,3...
  seq.sort((a, b) => a - b);
  const inter = []; const cnt = weights.slice();
  while (inter.length < seq.length) { for (let i = 0; i < cnt.length; i++) if (cnt[i] > 0) { inter.push(i); cnt[i]--; } }
  const weeks = [];
  let ptr = 0; const CH = 4; const sched = {};
  const needTotal = queues.reduce((a, q) => a + q.reduce((b, x) => b + x.left, 0), 0);
  for (let w = 0; w < studyWeeks; w++) {
    let budget = weekly; const items = {}; let guard = 0;
    while (budget > 0.4 && queues.some(q => q.length) && guard++ < 200) {
      const qi = inter.length ? inter[ptr++ % inter.length] : 0;
      const q = queues[qi]; if (!q || !q.length) continue;
      const it = q[0]; const a = Math.min(it.left, budget, CH);
      it.left -= a; budget -= a;
      items[it.sid] = (items[it.sid] || 0) + a;
      sched[it.sid] = (sched[it.sid] || 0) + a;
      if (it.left <= 0.01) q.shift();
    }
    const ws = addDays(start, w * 7);
    weeks.push({ n: w + 1, start: ws, end: addDays(ws, 6), items: Object.keys(items).map(sid => ({ sid, h: Math.round(items[sid] * 10) / 10, cum: Math.round(sched[sid] * 10) / 10, total: SUB[sid].h || 8 })), review: false });
  }
  for (let r = 0; r < reviewWeeks; r++) { const w = studyWeeks + r; const ws = addDays(start, w * 7); weeks.push({ n: w + 1, start: ws, end: addDays(ws, 6), items: [], review: true }); }
  const left = []; queues.forEach(q => q.forEach(x => left.push(x)));
  const leftH = left.reduce((a, x) => a + x.left, 0);
  const t = today();
  let cur = weeks.findIndex(w => t >= w.start && t <= w.end);
  if (cur < 0) cur = t < start ? -1 : weeks.length;
  PLAN = { start, end, totalWeeks, studyWeeks, reviewWeeks, weekly, langH, weeks, left, leftH, needTotal, capacity: weekly * studyWeeks, cur, order };
  return PLAN;
}
buildPlan();
const curWeek = () => PLAN.weeks[Math.max(0, Math.min(PLAN.weeks.length - 1, PLAN.cur))];

/* ================= Nhật ký học ================= */
function logMin(sid, min) {
  if (!min) return; const d = today();
  S.log[d] = (S.log[d] || 0) + min; if (sid) S.logSub[sid] = (S.logSub[sid] || 0) + min;
  if (sid && !S.status[sid]) S.status[sid] = 1;
  save();
}
function streak() {
  let n = 0; let d = today();
  if (!S.log[d]) d = addDays(d, -1);
  while (S.log[d] > 0) { n++; d = addDays(d, -1); }
  return n;
}
const totalMin = () => Object.values(S.log).reduce((a, b) => a + b, 0);

/* ================= Thẻ ôn ================= */
const INTERVAL = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };
function allCards() { return CARDS.concat(S.mycards || []); }
function cardPool() { const f = S.cardTracks || []; return allCards().filter(c => !f.length || f.includes(c.t)); }
function dueCards() {
  const t = today(), pool = cardPool();
  const due = pool.filter(c => S.cards[c.id] && S.cards[c.id].d <= t);
  const introducedToday = Object.values(S.cards).filter(x => x.f === t).length;
  const room = Math.max(0, (S.newPerDay || 10) - introducedToday);
  const fresh = pool.filter(c => !S.cards[c.id]).slice(0, room);
  return due.concat(fresh);
}

/* ================= Định tuyến ================= */
let ROUTE = { name: 'home', args: [], q: {} };
function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  const parts = (path || '').split('/').filter(Boolean).map(decodeURIComponent);
  const q = {}; (qs || '').split('&').filter(Boolean).forEach(kv => { const [k, v] = kv.split('='); q[decodeURIComponent(k)] = decodeURIComponent(v || ''); });
  return { name: parts[0] || 'home', args: parts.slice(1), q };
}
const VIEWS = {};
function render() {
  ROUTE = parseHash();
  const v = VIEWS[ROUTE.name] || VIEWS.home;
  stopMockTimer();
  const app = $('#app');
  app.innerHTML = v.html(ROUTE);
  $$('.nav a').forEach(a => a.toggleAttribute('aria-current', false));
  const navName = ROUTE.name === 'track' ? 'tracks' : ROUTE.name;
  const cur = $('.nav a[data-nav="' + navName + '"]'); if (cur) cur.setAttribute('aria-current', 'page');
  if (v.after) v.after(ROUTE);
  document.title = (v.title ? v.title(ROUTE) + ' · ' : '') + 'Kết nối tri thức';
}
window.addEventListener('hashchange', () => { render(); if (!ROUTE.args[1] && !ROUTE.q.w) window.scrollTo(0, 0); });

/* ================= Thành phần dùng chung ================= */
function stars(sid) {
  const v = S.conf[sid] || 0; let h = '<span class="stars" role="group" aria-label="Mức tự tin"><span class="lab">Tự tin</span>';
  for (let i = 1; i <= 5; i++) h += '<button type="button" class="' + (i <= v ? 'on' : '') + '" data-act="conf" data-sid="' + sid + '" data-v="' + i + '" aria-label="' + i + ' trên 5">★</button>';
  return h + '</span>';
}
const STATUS = [['Chưa học', 0], ['Đang học', 1], ['Đã xong', 2], ['Bỏ qua', 3]];
function statusSeg(sid) {
  const v = S.status[sid] || 0;
  return '<span class="seg" role="group" aria-label="Trạng thái">' + STATUS.map(([l, n]) => '<button type="button" data-act="status" data-sid="' + sid + '" data-v="' + n + '" aria-pressed="' + (v === n) + '">' + l + '</button>').join('') + '</span>';
}
function subjHead(sid) {
  const s = SUB[sid]; const c = S.conf[sid] || 0;
  return '<button class="subj-head" type="button" data-act="toggle" data-sid="' + sid + '" aria-expanded="false">' +
    '<span class="st" data-s="' + (S.status[sid] || 0) + '" aria-hidden="true"></span>' +
    '<span class="subj-names"><span class="t">' + esc(s.ru) + '</span><span class="s">' + esc(s.vi) + (s.en ? ' <span class="muted">/ ' + esc(s.en) + '</span>' : '') + '</span></span>' +
    '<span class="subj-side"><span class="cnt">' + resCount(sid) + ' tài liệu</span><span>~' + (s.h || 8) + ' giờ</span>' + (c ? '<span class="stars-mini" aria-label="Tự tin ' + c + '/5">' + '★'.repeat(c) + '</span>' : '') + '</span></button>';
}
function subjRow(sid) {
  if (!SUB[sid]) return '';
  return '<article class="subj" id="s-' + sid + '" data-sid="' + sid + '" style="--c:' + subColor(sid) + '">' + subjHead(sid) + '<div class="subj-body" hidden></div></article>';
}
function resItem(r, showSub) {
  const link = resLink(r);
  const title = link ? '<a href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(r.title) + '</a>' : '<span class="nm">' + esc(r.title) + '</span>';
  const isBookSearch = !r.url && r.type === 'book';
  return '<li class="' + (S.seen[r.id] ? 'seen' : '') + '" data-rid="' + r.id + '">' +
    '<input type="checkbox" data-act="seen" data-rid="' + r.id + '" ' + (S.seen[r.id] ? 'checked' : '') + ' aria-label="Đánh dấu đã xem">' +
    '<span class="rt">' + title + (r.note || isBookSearch || showSub ? '<span class="rn">' + (showSub ? '<a href="#/track/' + (SUBTRACKS[r.sid] || [''])[0] + '/' + r.sid + '">' + esc(SUB[r.sid].vi) + '</a>' + (r.note ? '. ' : '') : '') + esc(r.note) + (isBookSearch ? (r.note ? '. ' : '') + 'Mở tìm trên Google Sách' : '') + '</span>' : '') + '</span>' +
    '<span class="rs">' + (r.lang ? '<span class="tag tag-' + r.lang + '">' + (LANGS[r.lang] || r.lang) + '</span>' : '') +
    '<button type="button" class="fav ' + (S.fav[r.id] ? 'on' : '') + '" data-act="fav" data-rid="' + r.id + '" aria-label="Yêu thích" aria-pressed="' + !!S.fav[r.id] + '">★</button>' +
    (r.src === 'custom' ? '<button type="button" class="del" data-act="del-res" data-sid="' + r.sid + '" data-cid="' + r.cid + '" aria-label="Xoá link này">Xoá</button>' : '') + '</span></li>';
}
function findLinks(sid) {
  const s = SUB[sid]; const t = TR[(SUBTRACKS[sid] || [])[0]];
  const set = FIND_SETS[(t && t.find) || 'tech'];
  return '<div class="find">' + set.map(k => { const f = FIND[k]; const q = f.q === 'e' ? (s.qe || s.en || s.ru) : f.q === 'z' ? (s.qz || s.qr || s.ru) : (s.qr || s.ru); return '<a href="' + esc(f.u(q)) + '" target="_blank" rel="noopener">' + f.n + '</a>'; }).join('') + '</div>';
}
function subjBody(sid) {
  const s = SUB[sid]; const list = RES[sid] || [];
  const groups = {}; list.forEach(r => (groups[r.type] = groups[r.type] || []).push(r));
  const nCards = allCards().filter(c => c.s === sid).length;
  const seenN = list.filter(r => S.seen[r.id]).length;
  let h = '<div class="ctrl">' + statusSeg(sid) + stars(sid) +
    '<button type="button" class="btn btn-sm" data-act="pomo-sub" data-sid="' + sid + '">Học môn này 25 phút</button></div>';
  if (s.f) h += '<div class="focus"><b>Trọng tâm ôn phỏng vấn</b>' + esc(s.f) + '</div>';
  if (s.tp && s.tp.length) h += '<div class="topics chips">' + s.tp.map(x => '<span class="chip">' + esc(x) + '</span>').join('') + '</div>';
  h += '<p class="muted small">Đã xem ' + seenN + ' trên ' + list.length + ' tài liệu' + (S.logSub[sid] ? '. Đã học ' + S.logSub[sid] + ' phút' : '') + '.</p>';
  const hasVideo = groups.youtube || groups.rutube || groups.vk;
  TYPE_ORDER.forEach(ty => {
    if (groups[ty]) h += '<div class="rgroup"><h4>' + icon(TYPES[ty].ic) + TYPES[ty].vi + '</h4><ul class="res">' + groups[ty].map(r => resItem(r)).join('') + '</ul></div>';
    if (ty === 'vk' && !hasVideo) {
      const q = s.qr || s.ru, qe = s.qe || s.en || s.ru;
      h += '<div class="rgroup"><h4>' + icon('play') + 'Video theo chủ đề</h4><p class="muted small" style="margin:0 0 4px">Môn này chưa có kênh video riêng đã kiểm chứng; các nút dưới mở sẵn kết quả tìm kiếm với từ khoá phù hợp.</p><div class="find">' +
        '<a href="' + esc(FIND.rt.u(q)) + '" target="_blank" rel="noopener">RuTube: ' + esc(q) + '</a><a href="' + esc(FIND.ytr.u(q)) + '" target="_blank" rel="noopener">YouTube: ' + esc(q) + '</a><a href="' + esc(FIND.yte.u(qe)) + '" target="_blank" rel="noopener">YouTube: ' + esc(qe) + '</a><a href="' + esc(FIND.vk.u(q)) + '" target="_blank" rel="noopener">VK Видео: ' + esc(q) + '</a></div></div>';
    }
  });
  h += '<div class="rgroup"><h4>' + icon('globe') + 'Tìm thêm video và bài viết theo chủ đề</h4>' + findLinks(sid) + '</div>';
  h += '<div class="rgroup"><h4>' + icon('doc') + '<label for="note-' + sid + '">Ghi chú của bạn</label></h4><textarea class="note-area" id="note-' + sid + '" data-act="note" data-sid="' + sid + '" placeholder="Công thức, ý chính, câu hỏi còn vướng…">' + esc(S.notes[sid] || '') + '</textarea></div>';
  h += '<details class="more"><summary>Thêm link của bạn vào môn này</summary><form class="addform" data-act="add-res" data-sid="' + sid + '">' +
    '<input name="title" required placeholder="Tên tài liệu" aria-label="Tên tài liệu"><input name="url" type="url" required placeholder="https://…" aria-label="Địa chỉ"><select name="lang" aria-label="Ngôn ngữ"><option value="">Ngôn ngữ</option><option value="ru">Tiếng Nga</option><option value="en">Tiếng Anh</option><option value="vi">Tiếng Việt</option><option value="zh">Tiếng Trung</option></select><button class="btn btn-sm">Thêm link</button></form></details>';
  h += '<div class="sub-foot">' + (nCards ? '<a class="btn btn-sm" href="#/cards?s=' + sid + '">Ôn ' + nCards + ' câu hỏi phỏng vấn của môn này</a>' : '') + '<button type="button" class="btn btn-sm" data-act="copy-link" data-sid="' + sid + '">Sao chép link tới môn này</button></div>';
  return h;
}
function openSubj(el, open) {
  const body = $('.subj-body', el), head = $('.subj-head', el);
  if (open) { body.innerHTML = subjBody(el.dataset.sid); body.hidden = false; el.classList.add('open'); head.setAttribute('aria-expanded', 'true'); }
  else { body.hidden = true; el.classList.remove('open'); head.setAttribute('aria-expanded', 'false'); }
}
function refreshSubj(sid) {
  $$('.subj[data-sid="' + sid + '"]').forEach(el => {
    const open = el.classList.contains('open');
    const nh = document.createElement('div'); nh.innerHTML = subjHead(sid);
    const head = $('.subj-head', el); head.replaceWith(nh.firstChild);
    if (open) { $('.subj-head', el).setAttribute('aria-expanded', 'true'); const ta = $('textarea', el); const val = ta && ta.value; $('.subj-body', el).innerHTML = subjBody(sid); if (val != null) { const t2 = $('textarea', el); if (t2) t2.value = val; } }
  });
}
function trackProgress(tid) {
  const subs = trackSubjects(tid).filter(s => S.status[s] !== 3);
  const done = subs.filter(s => S.status[s] === 2).length;
  const doing = subs.filter(s => S.status[s] === 1).length;
  return { n: subs.length, done, doing, pct: subs.length ? done / subs.length : 0 };
}

/* ================= Trang chủ ================= */
VIEWS.home = {
  title: () => 'Tổng quan',
  html() {
    const t = today(); const P = PLAN;
    const left = daysBetween(t, P.end);
    const cw = curWeek();
    const wk = P.cur >= 0 && P.cur < P.weeks.length ? cw : null;
    let list = '';
    if (P.cur < 0) list = '<p class="muted">Lộ trình bắt đầu từ ' + fmt(P.start) + '. Tuần đầu tiên:</p>' + weekItemsShort(P.weeks[0]);
    else if (P.cur >= P.weeks.length) list = '<p class="muted">Đã qua ngày phỏng vấn dự kiến. Đặt ngày mới trong <a href="#/plan">Lộ trình</a>.</p>';
    else list = weekItemsShort(wk);
    const due = dueCards().length;
    const hero = '<section class="hero" aria-label="Bản đồ hành trình 6 tháng"><svg class="hero-map" id="heroMap" role="img" aria-label="Bản đồ đường bình độ với tuyến đường các tuần học, đỉnh là ngày phỏng vấn"></svg>' +
      '<div class="hero-in"><div class="hero-card">' +
      '<div class="count">' + Math.max(0, left) + '<small>ngày</small></div>' +
      '<p class="count-sub">đến buổi phỏng vấn ngày ' + fmt(P.end) + (P.cur >= 0 && P.cur < P.weeks.length ? ', đang ở tuần ' + (P.cur + 1) + ' trên ' + P.weeks.length : '') + '</p>' +
      '<div class="week-h"><h2>' + (wk && wk.review ? 'Tuần ôn tập tổng hợp' : 'Tuần này học gì') + '</h2>' + (wk ? '<span class="muted small">' + fmtShort(wk.start) + '–' + fmtShort(wk.end) + '</span>' : '') + '</div>' + list +
      '<div class="hero-actions"><a class="btn btn-primary" href="#/plan?w=' + (wk ? wk.n : 1) + '">Mở lộ trình</a><button class="btn" type="button" data-act="pomo-start">Học 25 phút</button>' + (due ? '<a class="btn" href="#/cards">Ôn ' + due + ' thẻ</a>' : '') + '</div>' +
      '</div></div></section>';
    const legend = '<ul class="legend">' + D.tracks.map(tr => { const p = trackProgress(tr.id); return '<li><a href="#/track/' + tr.id + '" style="color:var(--t-' + tr.id + ')"><span class="sw"></span><span class="lg-name"><b style="color:var(--ink)">' + esc(tr.vi) + '</b><span>' + esc(tr.ru) + '</span></span><span class="lg-bar"><span class="bar"><i style="width:' + Math.round(p.pct * 100) + '%"></i></span></span><span class="lg-num">' + p.done + '/' + p.n + ' môn</span></a></li>'; }).join('') + '</ul>';
    const tm = totalMin();
    const statsH = '<div class="stats"><div class="stat"><b>' + streak() + '</b><span>ngày liên tiếp</span></div><div class="stat"><b>' + (S.log[t] || 0) + '</b><span>phút hôm nay</span></div><div class="stat"><b>' + Math.round(tm / 6) / 10 + '</b><span>giờ đã học</span></div><div class="stat"><b>' + due + '</b><span>thẻ đến hạn</span></div></div>';
    return hero + '<div class="wrap page"><div class="grid-2" style="grid-template-columns:minmax(0,1.35fr) minmax(0,1fr)">' +
      '<section><h2>Các hướng học</h2><p class="muted">Mỗi hướng theo đúng tài liệu «Подготовка к работе»: từ nền tảng cử nhân đến chuyên sâu thạc sĩ và kỹ năng nghiên cứu sinh. Môn trùng nhau giữa các hướng được gộp, tiến độ dùng chung.</p>' + legend + '</section>' +
      '<section><div class="panel"><h3>Nhịp học</h3>' + statsH + '<div class="heat" id="heat" aria-label="Lịch học 26 tuần gần nhất"></div><p class="muted small" style="margin-top:6px">Mỗi ô là một ngày; màu càng đậm học càng lâu. Thời gian được ghi từ đồng hồ Pomodoro hoặc nhập tay ở trang Ghi chú.</p></div>' +
      '<div class="panel" style="margin-top:18px"><h3>Mức tự tin theo hướng</h3><svg class="radar" id="radar" viewBox="0 0 340 300" role="img" aria-label="Biểu đồ radar mức tự tin"></svg><p class="muted small">Trung bình số sao bạn tự chấm cho các môn. Đường nét đứt là mức 4 sao, đủ để trả lời phỏng vấn tự tin.</p></div></section></div>' +
      '<section class="sec"><div class="panel today-box" id="pickBox"></div></section>' +
      '<section class="sec guide"><h2>Bắt đầu thế nào</h2><ol><li>Vào <a href="#/plan">Lộ trình</a>, đặt ngày phỏng vấn, số giờ mỗi tuần và chọn các hướng ưu tiên. Lịch tuần được sinh tự động và có thể xuất sang Google Calendar.</li><li>Mỗi buổi: mở môn của tuần, chọn một tài liệu, bấm «Học môn này 25 phút». Đánh dấu tài liệu đã xem, ghi chú ý chính ngay trong môn.</li><li>Cuối mỗi môn: tự chấm sao. Môn dưới 4 sao sẽ hiện trên radar để bạn quay lại.</li><li>Mỗi ngày 10 phút ở <a href="#/cards">Ôn phỏng vấn</a>; mỗi tuần một buổi phỏng vấn thử có hẹn giờ, đọc câu hỏi thành tiếng và ghi âm câu trả lời.</li><li>Thỉnh thoảng bấm biểu tượng cài đặt để xuất tệp sao lưu, phòng khi xoá dữ liệu trình duyệt.</li></ol></section></div>';
  },
  after() { drawHero(); drawHeat(); drawRadar(); drawPick(); }
};
function weekItemsShort(w) {
  if (!w) return '';
  if (w.review) return '<ul class="wk-list">' + REVIEW_TEXT.slice(0, 3).map(x => '<li><span class="dotc" style="background:var(--alert)"></span><span>' + esc(x) + '</span></li>').join('') + '</ul>';
  if (!w.items.length) return '<p class="muted">Tuần này trống. Hãy bật thêm hướng học trong Lộ trình.</p>';
  let h = '<ul class="wk-list">' + w.items.map(it => '<li><span class="dotc" style="background:' + subColor(it.sid) + '"></span><a href="#/track/' + (SUBTRACKS[it.sid] || [''])[0] + '/' + it.sid + '">' + esc(SUB[it.sid].vi) + '</a><span class="h">' + it.h + ' giờ</span><input type="checkbox" data-act="plan-done" data-sid="' + it.sid + '" ' + (S.status[it.sid] === 2 ? 'checked' : '') + ' aria-label="Đã xong môn ' + esc(SUB[it.sid].vi) + '"></li>').join('');
  if (S.plan.langOn) h += '<li><span class="dotc" style="background:var(--t-lang)"></span><span style="flex:1">Mỗi ngày ' + S.plan.langMin + ' phút ' + esc(S.plan.langWhich) + '</span></li>';
  return h + '</ul>';
}
function drawPick(again) {
  const box = $('#pickBox'); if (!box) return;
  const w = curWeek(); let sids = w && w.items.length ? w.items.map(i => i.sid) : Object.keys(SUB);
  let pool = []; sids.forEach(sid => (RES[sid] || []).forEach(r => { if (!S.seen[r.id] && r.url) pool.push(r); }));
  if (!pool.length) Object.values(RES).forEach(a => a.forEach(r => { if (!S.seen[r.id] && r.url) pool.push(r); }));
  if (!pool.length) { box.innerHTML = '<p>Bạn đã xem hết tài liệu. Thêm link của riêng bạn trong từng môn.</p>'; return; }
  const r = pool[Math.floor(Math.random() * pool.length)];
  box.innerHTML = '<h3>Gợi ý tài liệu cho tuần này</h3><span class="muted small">' + esc(SUB[r.sid].vi) + ', ' + esc(TYPES[r.type].vi.toLowerCase()) + '</span><span class="pick"><a href="' + esc(resLink(r)) + '" target="_blank" rel="noopener">' + esc(r.title) + '</a></span>' + (r.note ? '<span class="muted">' + esc(r.note) + '</span>' : '') + '<div class="pill-row"><button class="btn btn-sm" type="button" data-act="pick-again">Gợi ý khác</button><button class="btn btn-sm" type="button" data-act="pick-seen" data-rid="' + r.id + '">Đã xem tài liệu này</button><a class="btn btn-sm" href="#/track/' + (SUBTRACKS[r.sid] || [''])[0] + '/' + r.sid + '">Mở môn</a></div>';
}

/* Bản đồ đường bình độ + tuyến các tuần */
function drawHero() {
  const svg = $('#heroMap'); if (!svg) return;
  const W = Math.max(320, svg.clientWidth || 1200), H = Math.max(200, svg.clientHeight || 430);
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  const R = rng(20261017);
  const hills = []; for (let i = 0; i < 8; i++) hills.push({ x: R() * W, y: R() * H, s: (0.08 + R() * 0.16) * Math.max(W, H * 2), a: 0.5 + R() * 0.8 });
  const mobile = W < 760;
  const x0 = mobile ? 34 : Math.max(480, W * 0.42), x1 = W - (mobile ? 46 : 70);
  const y0 = H * (mobile ? 0.8 : 0.84), y1 = H * (mobile ? 0.24 : 0.2);
  hills.push({ x: x1, y: y1, s: Math.max(W, H * 2) * 0.13, a: 1.5 });
  const f = (x, y) => { let v = 0; for (const h of hills) { const dx = x - h.x, dy = y - h.y; v += h.a * Math.exp(-(dx * dx + dy * dy) / (2 * h.s * h.s)); } return v + 0.05 * Math.sin(x / 60) * Math.cos(y / 45); };
  const step = mobile ? 9 : 11, cols = Math.ceil(W / step) + 1, rows = Math.ceil(H / step) + 1;
  const g = []; let mx = -1e9, mn = 1e9;
  for (let j = 0; j < rows; j++) { const r = []; for (let i = 0; i < cols; i++) { const v = f(i * step, j * step); r.push(v); if (v > mx) mx = v; if (v < mn) mn = v; } g.push(r); }
  const nl = 18; let paths = '';
  for (let k = 1; k < nl; k++) {
    const L = mn + (mx - mn) * k / nl; let d = '';
    for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
      const a = g[j][i], b = g[j][i + 1], c = g[j + 1][i + 1], e = g[j + 1][i];
      const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (e > L ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const X = i * step, Y = j * step;
      const lerp = (p, q) => (L - p) / (q - p || 1e-9);
      const T = [X + step * lerp(a, b), Y], Rr = [X + step, Y + step * lerp(b, c)], B = [X + step * lerp(e, c), Y + step], Lf = [X, Y + step * lerp(a, e)];
      const seg = (p, q) => { d += 'M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + 'L' + q[0].toFixed(1) + ' ' + q[1].toFixed(1); };
      switch (idx) {
        case 1: case 14: seg(Lf, B); break; case 2: case 13: seg(B, Rr); break; case 3: case 12: seg(Lf, Rr); break;
        case 4: case 11: seg(T, Rr); break; case 6: case 9: seg(T, B); break; case 7: case 8: seg(Lf, T); break;
        case 5: seg(Lf, T); seg(B, Rr); break; case 10: seg(T, Rr); seg(Lf, B); break;
      }
    }
    paths += '<path class="ct' + (k % 5 === 0 ? ' ct-i' : '') + '" d="' + d + '"/>';
  }
  // lưới toạ độ thưa như tờ bản đồ
  let grid = ''; const gs = mobile ? 90 : 150;
  for (let x = gs; x < W; x += gs) grid += '<line class="grid" x1="' + x + '" y1="0" x2="' + x + '" y2="' + H + '"/>';
  for (let y = gs; y < H; y += gs) grid += '<line class="grid" x1="0" y1="' + y + '" x2="' + W + '" y2="' + y + '"/>';
  // tuyến đường
  const P = PLAN, N = P.weeks.length; const pts = [];
  for (let i = 0; i < N; i++) { const t = N === 1 ? 1 : i / (N - 1); const x = x0 + (x1 - x0) * t; const amp = (y0 - y1) * 0.22; const y = y0 + (y1 - y0) * t + amp * Math.sin(t * Math.PI * 2.4) * (1 - t * 0.5); pts.push([x, y]); }
  const cr = (arr) => { if (arr.length < 2) return ''; let d = 'M' + arr[0][0].toFixed(1) + ' ' + arr[0][1].toFixed(1); for (let i = 0; i < arr.length - 1; i++) { const p0 = arr[i - 1] || arr[i], p1 = arr[i], p2 = arr[i + 1], p3 = arr[i + 2] || p2; d += 'C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1); } return d; };
  const curI = Math.max(-1, Math.min(N - 1, P.cur));
  let route = '<path class="route" d="' + cr(pts) + '"/>';
  if (curI > 0) route += '<path class="route-done" d="' + cr(pts.slice(0, curI + 1)) + '"/>';
  let wps = '';
  pts.forEach((p, i) => {
    if (i === N - 1) return;
    const cls = i < curI ? 'wp done' : i === curI ? 'wp now' : 'wp';
    const w = P.weeks[i];
    wps += '<a href="#/plan?w=' + w.n + '"><circle class="' + cls + '" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (i === curI ? (mobile ? 6 : 8) : (mobile ? 3.2 : 5)) + '"><title>Tuần ' + w.n + ': ' + fmtShort(w.start) + '–' + fmtShort(w.end) + (w.review ? ' (ôn tập)' : ': ' + w.items.map(x => SUB[x.sid].vi).join(', ')) + '</title></circle></a>';
  });
  let labels = '';
  if (pts.length) {
    labels += '<text class="lbl" x="' + (pts[0][0] - 6) + '" y="' + (pts[0][1] + 24) + '">Tuần 1</text>';
    if (curI >= 0 && curI < N - 1) labels += '<text class="lbl-now" x="' + (pts[curI][0] + 12) + '" y="' + (pts[curI][1] - 12) + '">Bạn ở đây</text>';
    const s = pts[N - 1];
    labels += '<path class="summit" d="M' + s[0] + ' ' + (s[1] - 14) + 'L' + (s[0] + 13) + ' ' + (s[1] + 9) + 'L' + (s[0] - 13) + ' ' + (s[1] + 9) + 'Z"/><circle class="summit-dot" cx="' + s[0] + '" cy="' + (s[1] + 2) + '" r="2.6"/>';
    labels += '<text class="summit-lbl" x="' + (s[0] - (mobile ? 74 : 10)) + '" y="' + (s[1] - 22) + '" ' + (mobile ? '' : 'text-anchor="middle"') + '>Phỏng vấn ' + fmtShort(P.end) + '</text>';
  }
  svg.innerHTML = grid + paths + route + wps + labels;
}
window.addEventListener('resize', debounce(() => { if (ROUTE.name === 'home') drawHero(); }, 200));
function drawHeat() {
  const el = $('#heat'); if (!el) return;
  const t = today(); const end = addDays(monday(t), 6); const start = addDays(monday(t), -25 * 7);
  let h = '';
  for (let d = start; d <= end; d = addDays(d, 1)) {
    const m = S.log[d] || 0; const l = m === 0 ? 0 : m < 30 ? 1 : m < 60 ? 2 : m < 120 ? 3 : 4;
    h += '<i data-l="' + l + '"' + (d === t ? ' class="today"' : '') + ' title="' + fmt(d) + ': ' + m + ' phút"></i>';
  }
  el.innerHTML = h;
}
function drawRadar() {
  const svg = $('#radar'); if (!svg) return;
  const cx = 170, cy = 150, R = 105, n = D.tracks.length;
  const ang = i => -Math.PI / 2 + i * 2 * Math.PI / n;
  const pt = (i, v) => [cx + Math.cos(ang(i)) * R * v / 5, cy + Math.sin(ang(i)) * R * v / 5];
  let h = '';
  for (let k = 1; k <= 5; k++) h += '<polygon class="ring" points="' + D.tracks.map((_, i) => pt(i, k).join(',')).join(' ') + '"/>';
  D.tracks.forEach((t, i) => { const p = pt(i, 5); h += '<line class="axis" x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '"/>'; });
  h += '<polygon class="goal" points="' + D.tracks.map((_, i) => pt(i, 4).join(',')).join(' ') + '"/>';
  const vals = D.tracks.map(t => { const a = trackSubjects(t.id).map(s => S.conf[s]).filter(Boolean); return a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0; });
  h += '<polygon class="val" points="' + vals.map((v, i) => pt(i, Math.max(0.15, v)).join(',')).join(' ') + '"/>';
  D.tracks.forEach((t, i) => { const p = pt(i, 6.15); const anchor = Math.abs(p[0] - cx) < 10 ? 'middle' : p[0] > cx ? 'start' : 'end'; h += '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 4).toFixed(1) + '" text-anchor="' + anchor + '">' + esc(t.short || t.vi) + (vals[i] ? ' ' + vals[i].toFixed(1) : '') + '</text>'; });
  svg.innerHTML = h;
}

/* ================= Danh sách hướng học ================= */
VIEWS.tracks = {
  title: () => 'Môn học',
  html() {
    return '<div class="wrap page"><div class="page-h"><div><h1>Môn học</h1><p>Bảy hướng: năm hướng theo tài liệu gốc, cộng kỹ năng nghiên cứu sinh và chuẩn bị phỏng vấn. Mở một hướng để xem môn theo cấp độ, kèm sách, khoá học, video và tạp chí.</p></div></div><div class="tracks-overview">' +
      D.tracks.map(t => { const p = trackProgress(t.id); const nRes = trackSubjects(t.id).reduce((a, s) => a + resCount(s), 0); return '<a class="tcard" href="#/track/' + t.id + '" style="color:var(--t-' + t.id + ')"><h2>' + esc(t.vi) + '</h2><span class="ru">' + esc(t.ru) + '</span><p>' + esc(t.desc) + '</p><div class="bar" style="margin:10px 0 8px"><i style="width:' + Math.round(p.pct * 100) + '%"></i></div><div class="tc-f"><span>' + p.n + ' môn, ' + nRes + ' tài liệu</span><span>' + p.done + ' đã xong</span></div></a>'; }).join('') + '</div></div>';
  }
};
let trackTab = {};
VIEWS.track = {
  title: r => (TR[r.args[0]] || {}).vi || 'Hướng học',
  html(r) {
    const t = TR[r.args[0]]; if (!t) return '<div class="wrap page"><div class="empty">Không tìm thấy hướng học này. <a href="#/tracks">Xem tất cả hướng</a>.</div></div>';
    const sid = r.args[1];
    if (sid && SUB[sid]) { const lv = SUBLEVEL[sid + '@' + t.id]; if (lv) trackTab[t.id] = lv; }
    const levels = LEVELS.filter(L => (t.levels[L.id] || []).length);
    const tab = trackTab[t.id] && levels.find(L => L.id === trackTab[t.id]) ? trackTab[t.id] : levels[0].id;
    const p = trackProgress(t.id);
    let h = '<div class="wrap page"><div class="track-head" style="color:var(--t-' + t.id + ')"><h1>' + esc(t.vi) + '</h1><div class="ru">' + esc(t.ru) + '</div><p>' + esc(t.desc) + '</p><p class="small">' + p.done + ' trên ' + p.n + ' môn đã xong, ' + p.doing + ' đang học.</p></div>';
    h += '<div class="tabs" role="tablist">' + levels.map(L => { const n = (t.levels[L.id] || []).reduce((a, g) => a + g[1].filter(s => SUB[s]).length, 0); return '<button role="tab" type="button" data-act="tab" data-tid="' + t.id + '" data-lv="' + L.id + '" aria-selected="' + (L.id === tab) + '">' + L.vi + ' <span class="muted">' + L.ru + '</span><span class="n">' + n + '</span></button>'; }).join('') + '</div>';
    h += '<div role="tabpanel">';
    (t.levels[tab] || []).forEach(g => { if (g[0]) h += '<h3 class="grp-h">' + esc(g[0]) + '</h3>'; h += g[1].map(subjRow).join(''); });
    if (t.levels[tab] && t.levels[tab].note) h += '<p class="muted">' + esc(t.levels[tab].note) + '</p>';
    h += '</div>';
    if (t.tips) h += '<section class="sec panel"><h3>Lời khuyên từ tài liệu gốc</h3><ul>' + t.tips.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></section>';
    return h + '</div>';
  },
  after(r) {
    const sid = r.args[1];
    if (sid) { const el = $('#s-' + sid); if (el) { openSubj(el, true); setTimeout(() => el.scrollIntoView({ block: 'start', behavior: 'smooth' }), 30); } }
  }
};

/* ================= Lộ trình ================= */
VIEWS.plan = {
  title: () => 'Lộ trình',
  html(r) {
    const P = buildPlan(), p = S.plan;
    const over = P.leftH > 0.5;
    let h = '<div class="wrap page"><div class="page-h"><div><h1>Lộ trình đến ngày phỏng vấn</h1><p>Lịch tuần được xếp tự động: các hướng ưu tiên cao xuất hiện nhiều hơn, mỗi tuần học xen 2–4 môn, hai tuần cuối dành cho ôn tập và phỏng vấn thử. Thay đổi cài đặt là lịch xếp lại ngay.</p></div>' +
      '<div class="plan-tools pill-row"><button class="btn" type="button" data-act="export-ics">Xuất ra lịch (.ics)</button><button class="btn" type="button" data-act="print">In lộ trình</button></div></div>';
    h += '<section class="panel plan-config"><div class="plan-set">' +
      '<label>Ngày bắt đầu<input class="input" type="date" data-pl="start" value="' + esc(p.start) + '"></label>' +
      '<label>Ngày phỏng vấn<input class="input" type="date" data-pl="end" value="' + esc(p.end) + '"></label>' +
      '<label>Số giờ học mỗi tuần<input class="input" type="number" min="3" max="60" step="1" data-pl="hours" value="' + esc(p.hours) + '"></label>' +
      '<label>Phạm vi<select class="input" data-pl="coreOnly"><option value="1"' + (p.coreOnly ? ' selected' : '') + '>Chỉ môn trọng tâm cho phỏng vấn</option><option value="0"' + (!p.coreOnly ? ' selected' : '') + '>Toàn bộ môn trong hướng</option></select></label>' +
      '<label><span><input type="checkbox" data-pl="langOn" ' + (p.langOn ? 'checked' : '') + '> Ngoại ngữ mỗi ngày</span><span style="display:flex;gap:6px;align-items:center"><input class="input" style="width:70px" type="number" min="10" max="120" step="5" data-pl="langMin" value="' + esc(p.langMin) + '"> phút</span></label>' +
      '<label style="grid-column:span 3">Ngôn ngữ luyện hằng ngày<input class="input" data-pl="langWhich" value="' + esc(p.langWhich) + '"></label>' +
      '</div><h3 style="margin-top:16px">Hướng học và thứ tự ưu tiên</h3><p class="muted small">Bật các hướng cần cho vị trí bạn ứng tuyển. Hướng đứng đầu được dành nhiều giờ nhất.</p><ol class="prio">' +
      P.order.concat(p.order.filter(id => !p.on[id])).map(id => { const t = TR[id]; if (!t) return ''; const on = !!p.on[id]; const i = p.order.indexOf(id); return '<li class="' + (on ? '' : 'off') + '" style="color:var(--t-' + id + ')"><span class="sw"></span><label class="nm" style="color:var(--ink)"><input type="checkbox" data-act="plan-on" data-tid="' + id + '" ' + (on ? 'checked' : '') + '> ' + esc(t.vi) + ' <span class="muted small">' + esc(t.ru) + '</span></label><span class="mv"><button type="button" data-act="plan-mv" data-tid="' + id + '" data-d="-1" aria-label="Lên" ' + (i <= 0 ? 'disabled' : '') + '>↑</button><button type="button" data-act="plan-mv" data-tid="' + id + '" data-d="1" aria-label="Xuống" ' + (i >= p.order.length - 1 ? 'disabled' : '') + '>↓</button></span></li>'; }).join('') + '</ol></section>';
    h += '<div class="cap' + (over ? ' over' : '') + '"><span><b>' + Math.round(P.needTotal) + '</b> giờ cần học</span><span><b>' + Math.round(P.capacity) + '</b> giờ có trong ' + P.studyWeeks + ' tuần</span><span><b>' + P.weekly + '</b> giờ/tuần cho môn' + (P.langH ? ' (+' + P.langH + ' giờ ngoại ngữ)' : '') + '</span>' +
      (over ? '<span>Còn <b>' + Math.round(P.leftH) + '</b> giờ chưa xếp được. Tăng lên khoảng ' + Math.ceil(P.needTotal / P.studyWeeks + P.langH) + ' giờ/tuần, chuyển sang «Chỉ môn trọng tâm», tắt bớt hướng, hoặc đánh dấu «Bỏ qua» những môn bạn đã vững.</span>' : '<span>Lịch vừa sức. Thời gian dư được dùng cho ôn tập.</span>') + '</div>';
    h += '<ol class="weeks">' + P.weeks.map((w, i) => {
      const cls = 'week' + (i < P.cur ? ' past' : '') + (i === P.cur ? ' now' : '') + (w.review ? ' review' : '');
      let body;
      if (w.review) body = '<ul class="witems">' + REVIEW_TEXT.map(x => '<li>' + esc(x) + '</li>').join('') + '<li><a href="#/cards">Mở trang ôn phỏng vấn</a></li></ul>';
      else if (!w.items.length) body = '<p class="muted small">Tuần dự phòng: ôn lại môn có ít sao, làm dự án portfolio.</p>';
      else body = '<ul class="witems">' + w.items.map(it => '<li class="' + (S.status[it.sid] === 2 ? 'done' : '') + '"><input type="checkbox" data-act="plan-done" data-sid="' + it.sid + '" ' + (S.status[it.sid] === 2 ? 'checked' : '') + ' aria-label="Đã xong"><span class="dotc" style="background:' + subColor(it.sid) + '"></span><a href="#/track/' + (SUBTRACKS[it.sid] || [''])[0] + '/' + it.sid + '">' + esc(SUB[it.sid].vi) + '</a><span class="h">' + it.h + ' giờ' + (it.total > it.h ? ', tích luỹ ' + it.cum + '/' + it.total : '') + '</span></li>').join('') + (S.plan.langOn ? '<li class="muted small">Cộng ' + S.plan.langMin + ' phút ' + esc(S.plan.langWhich) + ' mỗi ngày</li>' : '') + '</ul>';
      return '<li class="' + cls + '" id="w-' + w.n + '"><span class="wn">' + w.n + '</span><div class="week-top"><b>' + (w.review ? 'Ôn tập và phỏng vấn thử' : 'Tuần ' + w.n) + '</b><span>' + fmt(w.start) + ' – ' + fmt(w.end) + '</span>' + (i === P.cur ? '<span style="color:var(--water)">tuần hiện tại</span>' : '') + '</div>' + body + '</li>';
    }).join('') + '<li class="week review"><span class="wn">▲</span><div class="week-top"><b>Ngày phỏng vấn</b><span>' + fmt(P.end) + '</span></div></li></ol>';
    if (P.left.length) h += '<section class="sec"><h3>Chưa xếp được vào lịch</h3><ul>' + P.left.map(x => '<li><a href="#/track/' + x.tid + '/' + x.sid + '">' + esc(SUB[x.sid].vi) + '</a> <span class="muted small">' + Math.round(x.left) + ' giờ</span></li>').join('') + '</ul></section>';
    return h + '</div>';
  },
  after(r) {
    const n = r.q.w || (PLAN.cur >= 0 && PLAN.cur < PLAN.weeks.length ? PLAN.cur + 1 : 0);
    if (n) { const el = $('#w-' + n); if (el) setTimeout(() => el.scrollIntoView({ block: 'center', behavior: r.q.w ? 'smooth' : 'auto' }), 30); }
  }
};

/* ================= Thư viện ================= */
let LIB = { q: '', types: [], langs: [], track: '', fav: false, unseen: false, limit: 200 };
VIEWS.library = {
  title: () => 'Thư viện',
  html(r) {
    if (r.q.q != null) LIB.q = r.q.q;
    if (r.q.type) LIB.types = [r.q.type];
    const counts = {}; Object.values(RES).forEach(a => a.forEach(x => counts[x.type] = (counts[x.type] || 0) + 1));
    let h = '<div class="wrap page"><div class="page-h"><div><h1>Thư viện tài liệu</h1><p>Tất cả sách, khoá học, video, tạp chí và công cụ của mọi môn. Lọc theo loại, ngôn ngữ, hướng học; đánh dấu sao để tạo danh sách đọc của riêng bạn.</p></div><button type="button" class="btn" data-act="lib-random">Mở ngẫu nhiên một tài liệu chưa xem</button></div>';
    h += '<div class="filters"><div class="frow"><label class="sr" for="libq">Lọc theo từ khoá</label><input id="libq" class="input" style="flex:1;min-width:220px" placeholder="Từ khoá: tên sách, tác giả, chủ đề…" value="' + esc(LIB.q) + '"><select class="input" id="libTrack" aria-label="Hướng học"><option value="">Mọi hướng học</option>' + D.tracks.map(t => '<option value="' + t.id + '"' + (LIB.track === t.id ? ' selected' : '') + '>' + esc(t.vi) + '</option>').join('') + '</select></div>' +
      '<div class="frow"><span class="fl">Loại</span><div class="chips">' + TYPE_ORDER.filter(t => counts[t]).map(t => '<button type="button" class="chip" data-act="lib-type" data-v="' + t + '" aria-pressed="' + LIB.types.includes(t) + '">' + esc(TYPES[t].vi.split(',')[0].split(' (')[0]) + ' <span class="muted">' + counts[t] + '</span></button>').join('') + '</div></div>' +
      '<div class="frow"><span class="fl">Ngôn ngữ</span><div class="chips">' + Object.keys(LANGS).map(l => '<button type="button" class="chip" data-act="lib-lang" data-v="' + l + '" aria-pressed="' + LIB.langs.includes(l) + '">' + { ru: 'Tiếng Nga', en: 'Tiếng Anh', zh: 'Tiếng Trung', vi: 'Tiếng Việt' }[l] + '</button>').join('') +
      '<button type="button" class="chip" data-act="lib-fav" aria-pressed="' + LIB.fav + '">★ Yêu thích</button><button type="button" class="chip" data-act="lib-unseen" aria-pressed="' + LIB.unseen + '">Chưa xem</button></div></div></div><div id="libOut"></div></div>';
    return h;
  },
  after() { libRender(); const i = $('#libq'); i.addEventListener('input', debounce(() => { LIB.q = i.value; LIB.limit = 200; libRender(); }, 180)); $('#libTrack').addEventListener('change', e => { LIB.track = e.target.value; libRender(); }); }
};
function libFiltered() {
  const q = LIB.q.trim().toLowerCase(); const out = [];
  const subs = LIB.track ? trackSubjects(LIB.track) : Object.keys(SUB);
  const seenIds = new Set();
  subs.forEach(sid => (RES[sid] || []).forEach(r => {
    if (seenIds.has(r.id)) return;
    if (LIB.types.length && !LIB.types.includes(r.type)) return;
    if (LIB.langs.length && !LIB.langs.includes(r.lang)) return;
    if (LIB.fav && !S.fav[r.id]) return;
    if (LIB.unseen && S.seen[r.id]) return;
    if (q) { const s = SUB[sid]; const hay = (r.title + ' ' + r.note + ' ' + s.vi + ' ' + s.ru + ' ' + (s.en || '') + ' ' + (s.tp || []).join(' ')).toLowerCase(); if (!q.split(/\s+/).every(w => hay.includes(w))) return; }
    seenIds.add(r.id); out.push(r);
  }));
  return out;
}
function libRender() {
  const el = $('#libOut'); if (!el) return;
  const list = libFiltered();
  if (!list.length) { el.innerHTML = '<div class="empty">Không có tài liệu khớp bộ lọc. Bỏ bớt điều kiện lọc hoặc thử từ khoá khác.</div>'; return; }
  el.innerHTML = '<p class="muted small">' + list.length + ' tài liệu</p><ul class="lib-list res">' + list.slice(0, LIB.limit).map(r => resItem(r, true).replace('<li class="', '<li class="lib ')).join('') + '</ul>' + (list.length > LIB.limit ? '<p style="text-align:center;margin-top:14px"><button class="btn" type="button" data-act="lib-more">Hiện thêm ' + Math.min(200, list.length - LIB.limit) + ' tài liệu</button></p>' : '');
}

/* ================= Ôn phỏng vấn ================= */
let CARDV = { tab: 'srs', queue: null, i: 0, flipped: false, sid: '' };
let MOCK = null, mockTimer = null, mediaRec = null, recChunks = [], recUrl = '';
function stopMockTimer() { if (mockTimer) { clearInterval(mockTimer); mockTimer = null; } if (window.speechSynthesis) try { speechSynthesis.cancel(); } catch (e) { } }
VIEWS.cards = {
  title: () => 'Ôn phỏng vấn',
  html(r) {
    if (r.q.s && r.q.s !== CARDV.sid) { CARDV.sid = r.q.s; CARDV.tab = 'list'; }
    if (!r.q.s && CARDV.sid) CARDV.sid = '';
    const tabs = [['srs', 'Ôn tập hằng ngày'], ['mock', 'Phỏng vấn thử'], ['list', 'Tất cả câu hỏi']];
    const f = S.cardTracks || [];
    let h = '<div class="wrap page"><div class="page-h"><div><h1>Ôn phỏng vấn</h1><p>' + allCards().length + ' câu hỏi thường gặp, đáp án ngắn bằng tiếng Nga để luyện trả lời đúng thuật ngữ. Thẻ nhớ chắc sẽ quay lại thưa dần (1, 3, 7, 14, 30 ngày), thẻ còn quên quay lại ngay hôm sau.</p></div></div>';
    h += '<div class="frow" style="margin-bottom:6px"><span class="fl">Hướng</span><div class="chips">' + D.tracks.map(t => { const n = allCards().filter(c => c.t === t.id).length; return n ? '<button type="button" class="chip" data-act="card-track" data-v="' + t.id + '" aria-pressed="' + f.includes(t.id) + '">' + esc(t.short || t.vi) + ' <span class="muted">' + n + '</span></button>' : ''; }).join('') + '</div></div>';
    h += '<div class="tabs" role="tablist">' + tabs.map(([id, l]) => '<button role="tab" type="button" data-act="card-tab" data-v="' + id + '" aria-selected="' + (CARDV.tab === id) + '">' + l + '</button>').join('') + '</div><div id="cardOut"></div></div>';
    return h;
  },
  after() { cardRender(); }
};
function boxStats() {
  const pool = cardPool(); const b = [0, 0, 0, 0, 0, 0];
  pool.forEach(c => { const x = S.cards[c.id]; b[x ? x.b : 0]++; }); return b;
}
function cardRender() {
  const el = $('#cardOut'); if (!el) return;
  if (CARDV.tab === 'srs') {
    if (!CARDV.queue) { CARDV.queue = dueCards().map(c => c.id); CARDV.i = 0; CARDV.flipped = false; }
    const b = boxStats(); const mx = Math.max(1, ...b);
    const stats = '<div class="panel" style="margin-bottom:16px"><div class="boxes">' + b.map((n, i) => '<div style="height:' + (n / mx * 100) + '%;' + (i === 0 ? 'background:var(--paper-2)' : '') + '"><span>' + n + '</span></div>').join('') + '</div><div class="boxes-l"><span>Mới</span><span>Hộp 1</span><span>Hộp 2</span><span>Hộp 3</span><span>Hộp 4</span><span>Hộp 5</span></div><p class="muted small" style="margin:.6em 0 0">Mỗi ngày nhận tối đa <select class="input" id="newPer" style="width:auto;padding:.1em .3em">' + [5, 10, 15, 20, 30].map(n => '<option' + (n === (S.newPerDay || 10) ? ' selected' : '') + '>' + n + '</option>').join('') + '</select> thẻ mới.</p></div>';
    const q = CARDV.queue;
    if (CARDV.i >= q.length) { el.innerHTML = stats + '<div class="empty flash-wrap"><h3>Xong phần ôn hôm nay</h3><p>Quay lại vào ngày mai, hoặc thử một buổi <button class="linkish" type="button" data-act="card-tab" data-v="mock">phỏng vấn thử</button>.</p><button class="btn" type="button" data-act="srs-more">Ôn thêm thẻ mới</button></div>'; bindNewPer(); return; }
    const c = allCards().find(x => x.id === q[CARDV.i]); if (!c) { CARDV.i++; return cardRender(); }
    el.innerHTML = stats + '<div class="flash-wrap"><p class="muted small">Thẻ ' + (CARDV.i + 1) + ' trên ' + q.length + '</p>' + flashHTML(c, CARDV.flipped) +
      (CARDV.flipped ? '<div class="rate"><button class="btn r1" type="button" data-act="rate" data-v="1">Chưa nhớ<small>phím 1, gặp lại hôm nay</small></button><button class="btn r2" type="button" data-act="rate" data-v="2">Nhớ lờ mờ<small>phím 2, ngày mai</small></button><button class="btn r3" type="button" data-act="rate" data-v="3">Nhớ rõ<small>phím 3, giãn cách</small></button></div>' : '<div class="rate" style="grid-template-columns:1fr"><button class="btn btn-primary" type="button" data-act="flip">Xem đáp án (Space)</button></div>') + '</div>';
    bindNewPer();
  } else if (CARDV.tab === 'mock') { mockRender(el); }
  else {
    const pool = cardPool().filter(c => !CARDV.sid || c.s === CARDV.sid);
    let h = (CARDV.sid ? '<p>Đang lọc theo môn <b>' + esc(SUB[CARDV.sid] ? SUB[CARDV.sid].vi : CARDV.sid) + '</b>. <a href="#/cards">Bỏ lọc</a></p>' : '');
    h += '<ul class="cardlist">' + pool.map(c => { const x = S.cards[c.id]; return '<li><details><summary>' + esc(c.q) + ' <span class="muted small">' + (x ? 'hộp ' + x.b : 'mới') + (c.s && SUB[c.s] ? ', ' + esc(SUB[c.s].vi) : '') + '</span></summary><div class="ca">' + esc(c.a) + '</div>' + (String(c.id).startsWith('u') ? '<button type="button" class="del" data-act="del-card" data-v="' + c.id + '">Xoá thẻ này</button>' : '') + '</details></li>'; }).join('') + '</ul>';
    h += '<section class="sec panel"><h3>Thêm câu hỏi của bạn</h3><form data-act="add-card" class="filters"><select class="input" name="t" aria-label="Hướng">' + D.tracks.map(t => '<option value="' + t.id + '">' + esc(t.vi) + '</option>').join('') + '</select><textarea class="note-area" name="q" required placeholder="Câu hỏi (ví dụ câu nhà tuyển dụng đã hỏi bạn)"></textarea><textarea class="note-area" name="a" required placeholder="Ý chính của câu trả lời"></textarea><div><button class="btn btn-primary">Thêm thẻ</button></div></form></section>';
    el.innerHTML = h;
  }
}
function bindNewPer() { const s = $('#newPer'); if (s) s.addEventListener('change', () => { S.newPerDay = Number(s.value); save(); CARDV.queue = null; cardRender(); }); }
function flashHTML(c, flipped) {
  const t = TR[c.t]; const sub = c.s && SUB[c.s] ? SUB[c.s].vi : '';
  const meta = '<div class="fm"><span style="color:var(--t-' + c.t + ')">' + esc(t ? t.vi : '') + (sub ? ', ' + esc(sub) : '') + '</span><span>' + (S.cards[c.id] ? 'hộp ' + S.cards[c.id].b : 'thẻ mới') + '</span></div>';
  return '<div class="flash' + (flipped ? ' flipped' : '') + '" data-act="flip" role="button" tabindex="0" aria-label="Lật thẻ"><div class="flash-in"><div class="face front">' + meta + '<div class="fq">' + esc(c.q) + '</div></div><div class="face back">' + meta + '<div class="fa-q">' + esc(c.q) + '</div><div class="fa">' + esc(c.a) + '</div></div></div></div>';
}
function rate(v) {
  const id = CARDV.queue[CARDV.i]; const t = today();
  const x = S.cards[id] || { b: 0, n: 0, f: t };
  if (v === 1) { x.b = 1; x.d = t; if (CARDV.queue.indexOf(id, CARDV.i + 1) < 0) CARDV.queue.push(id); }
  else if (v === 2) { x.b = Math.max(1, x.b || 1); x.d = addDays(t, 1); }
  else { x.b = Math.min(5, (x.b || 0) + 1); x.d = addDays(t, INTERVAL[x.b]); }
  x.n = (x.n || 0) + 1; x.l = v; if (!x.f) x.f = t;
  S.cards[id] = x; save(); CARDV.i++; CARDV.flipped = false; cardRender();
}
function mockRender(el) {
  if (!MOCK) {
    const last = (S.mock || []).slice(-5).reverse();
    el.innerHTML = '<div class="flash-wrap panel"><h3>Buổi phỏng vấn thử</h3><p>Câu hỏi được chọn ngẫu nhiên từ các hướng đang lọc. Mỗi câu có đồng hồ đếm ngược; trả lời thành tiếng như đang ngồi trước hội đồng, rồi so với ý chính và tự chấm.</p>' +
      '<div class="frow"><label>Số câu <select class="input" id="mN">' + [5, 8, 12, 15].map(n => '<option' + (n === 8 ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></label><label>Thời gian mỗi câu <select class="input" id="mT"><option value="60">1 phút</option><option value="120" selected>2 phút</option><option value="180">3 phút</option></select></label><label><input type="checkbox" id="mSpeak" ' + ('speechSynthesis' in window ? 'checked' : 'disabled') + '> Đọc câu hỏi thành tiếng (giọng Nga)</label></div>' +
      '<p style="margin-top:14px"><button class="btn btn-primary" type="button" data-act="mock-start">Bắt đầu phỏng vấn thử</button></p>' +
      (last.length ? '<h4>Các buổi gần đây</h4><ul>' + last.map(m => '<li>' + fmt(m.d) + ': ' + m.score + '% (' + m.n + ' câu)</li>').join('') + '</ul>' : '') + '</div>';
    return;
  }
  const M = MOCK;
  if (M.i >= M.list.length) {
    const score = Math.round(M.grades.reduce((a, b) => a + b, 0) / (M.list.length * 2) * 100);
    if (!M.saved) { (S.mock = S.mock || []).push({ d: today(), n: M.list.length, score }); M.list.forEach((id, i) => { if (M.grades[i] === 0) { const x = S.cards[id] || { n: 0, f: today() }; x.b = 1; x.d = today(); S.cards[id] = x; } }); save(); M.saved = true; }
    const weak = M.list.filter((_, i) => M.grades[i] === 0).map(id => allCards().find(c => c.id === id)).filter(Boolean);
    el.innerHTML = '<div class="flash-wrap panel"><h3>Kết quả: ' + score + '%</h3><p>' + M.grades.filter(g => g === 2).length + ' câu tốt, ' + M.grades.filter(g => g === 1).length + ' câu tạm được, ' + weak.length + ' câu cần ôn lại.</p>' + (weak.length ? '<p class="muted">Các câu cần ôn đã được đưa về hộp 1 để gặp lại hôm nay:</p><ul>' + weak.map(c => '<li>' + esc(c.q) + '</li>').join('') + '</ul>' : '') + '<p><button class="btn btn-primary" type="button" data-act="mock-reset">Buổi mới</button> <button class="btn" type="button" data-act="card-tab" data-v="srs">Ôn thẻ</button></p></div>';
    return;
  }
  const c = allCards().find(x => x.id === M.list[M.i]);
  const C = 2 * Math.PI * 22;
  el.innerHTML = '<div class="flash-wrap"><p class="muted small">Câu ' + (M.i + 1) + ' trên ' + M.list.length + '</p>' +
    '<div class="mock-timer" id="mTimer"><svg viewBox="0 0 54 54"><circle class="tr" cx="27" cy="27" r="22"/><circle class="tv" id="mRing" cx="27" cy="27" r="22" stroke-dasharray="' + C + '" stroke-dashoffset="0"/></svg><b id="mLeft">' + M.sec + '</b><span class="muted">giây</span>' +
    '<button class="btn btn-sm" type="button" data-act="mock-speak">Đọc lại câu hỏi</button><button class="btn btn-sm" type="button" data-act="mock-rec" id="mRec">' + (mediaRec && mediaRec.state === 'recording' ? 'Dừng ghi âm' : 'Ghi âm câu trả lời') + '</button></div>' +
    flashHTML(c, M.phase === 'a') + (M.phase === 'a' ? (recUrl ? '<p><audio controls src="' + recUrl + '"></audio></p>' : '') + '<div class="rate"><button class="btn r1" type="button" data-act="mock-grade" data-v="0">Chưa trả lời được</button><button class="btn r2" type="button" data-act="mock-grade" data-v="1">Tạm được</button><button class="btn r3" type="button" data-act="mock-grade" data-v="2">Trả lời tốt</button></div>' : '<div class="rate" style="grid-template-columns:1fr"><button class="btn btn-primary" type="button" data-act="mock-show">Tôi đã trả lời xong, xem ý chính</button></div>') + '</div>';
  if (M.phase === 'q') startMockTimer();
}
function startMockTimer() {
  stopMockTimer(); const M = MOCK; M.t0 = M.t0 || Date.now(); const C = 2 * Math.PI * 22;
  const tick = () => {
    const el = $('#mLeft'); if (!el) return stopMockTimer();
    const left = M.sec - Math.floor((Date.now() - M.t0) / 1000);
    el.textContent = Math.abs(left); $('#mRing').setAttribute('stroke-dashoffset', String(C * Math.min(1, Math.max(0, 1 - left / M.sec))));
    $('#mTimer').classList.toggle('late', left < 0);
  };
  tick(); mockTimer = setInterval(tick, 500);
}
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = /[а-яё]/i.test(text) ? 'ru-RU' : 'en-US'; const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.startsWith(u.lang.slice(0, 2))); if (v) u.voice = v; u.rate = 0.95; speechSynthesis.speak(u); } catch (e) { }
}
async function toggleRec() {
  if (mediaRec && mediaRec.state === 'recording') { mediaRec.stop(); return; }
  if (!navigator.mediaDevices || !window.MediaRecorder) { toast('Trình duyệt này không hỗ trợ ghi âm.'); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recChunks = []; mediaRec = new MediaRecorder(stream);
    mediaRec.ondataavailable = e => recChunks.push(e.data);
    mediaRec.onstop = () => { stream.getTracks().forEach(t => t.stop()); if (recUrl) URL.revokeObjectURL(recUrl); recUrl = URL.createObjectURL(new Blob(recChunks, { type: mediaRec.mimeType || 'audio/webm' })); const b = $('#mRec'); if (b) b.textContent = 'Ghi âm lại'; toast('Đã ghi âm. Nghe lại sau khi xem ý chính.'); };
    mediaRec.start(); const b = $('#mRec'); if (b) b.textContent = 'Dừng ghi âm'; toast('Đang ghi âm…');
  } catch (e) { toast('Không truy cập được micro. Kiểm tra quyền micro của trang.'); }
}

/* ================= Ghi chú & nhật ký ================= */
VIEWS.notes = {
  title: () => 'Ghi chú',
  html() {
    const ids = Object.keys(S.notes).filter(k => S.notes[k] && S.notes[k].trim() && SUB[k]).sort((a, b) => (S.notesT[b] || 0) - (S.notesT[a] || 0));
    const days = Object.keys(S.log).sort().reverse().slice(0, 14);
    let h = '<div class="wrap page"><div class="page-h"><div><h1>Ghi chú và nhật ký học</h1><p>Mọi ghi chú bạn viết trong các môn, gom lại một chỗ. Có thể xuất ra Markdown để đưa vào Obsidian, Notion hay GitHub.</p></div><div class="pill-row"><button class="btn" type="button" data-act="export-notes">Xuất ghi chú (.md)</button></div></div><div class="grid-2" style="grid-template-columns:minmax(0,1.6fr) minmax(0,1fr)"><section class="notes-list">';
    h += ids.length ? ids.map(sid => '<article class="panel note-item"><h3><a href="#/track/' + (SUBTRACKS[sid] || [''])[0] + '/' + sid + '">' + esc(SUB[sid].vi) + '</a></h3><div class="when">' + esc(SUB[sid].ru) + (S.notesT[sid] ? ', sửa ' + fmt(iso(new Date(S.notesT[sid]))) : '') + '</div><textarea class="note-area" data-act="note" data-sid="' + sid + '" aria-label="Ghi chú ' + esc(SUB[sid].vi) + '">' + esc(S.notes[sid]) + '</textarea></article>').join('') : '<div class="empty">Chưa có ghi chú. Mở một môn trong <a href="#/tracks">Môn học</a> và viết vào ô «Ghi chú của bạn».</div>';
    h += '</section><aside><div class="panel"><h3>Ghi thêm thời gian học</h3><form data-act="log-add" class="filters"><input class="input" type="date" name="d" value="' + today() + '" aria-label="Ngày"><input class="input" type="number" name="m" min="5" max="600" step="5" value="30" aria-label="Số phút"><select class="input" name="s" aria-label="Môn"><option value="">Không gắn môn</option>' + Object.keys(SUB).sort((a, b) => SUB[a].vi.localeCompare(SUB[b].vi, 'vi')).map(s => '<option value="' + s + '">' + esc(SUB[s].vi) + '</option>').join('') + '</select><button class="btn btn-primary">Ghi lại</button></form></div>' +
      '<div class="panel" style="margin-top:16px"><h3>14 ngày gần nhất</h3>' + (days.length ? '<ul class="witems">' + days.map(d => '<li><span style="min-width:96px">' + fmt(d) + '</span><span class="bar" style="flex:1;color:var(--forest)"><i style="width:' + Math.min(100, S.log[d] / 2.4) + '%"></i></span><span class="h">' + S.log[d] + ' phút</span></li>').join('') + '</ul>' : '<p class="muted">Chưa có buổi học nào được ghi.</p>') +
      '<h3 style="margin-top:14px">Môn học nhiều nhất</h3>' + (Object.keys(S.logSub).length ? '<ul class="witems">' + Object.keys(S.logSub).filter(s => SUB[s]).sort((a, b) => S.logSub[b] - S.logSub[a]).slice(0, 8).map(s => '<li><a href="#/track/' + (SUBTRACKS[s] || [''])[0] + '/' + s + '" style="flex:1">' + esc(SUB[s].vi) + '</a><span class="h">' + S.logSub[s] + ' phút</span></li>').join('') + '</ul>' : '<p class="muted">Dùng Pomodoro để thời gian tự gắn vào môn.</p>') + '</div></aside></div></div>';
    return h;
  }
};

/* ================= Hướng dẫn ================= */
VIEWS.guide = {
  title: () => 'Hướng dẫn',
  html() {
    return '<div class="wrap page guide" style="max-width:820px"><h1>Hướng dẫn sử dụng</h1><h2>Trang này có gì</h2><ul><li><b>Môn học</b>: khoảng ' + Object.keys(SUB).length + ' môn chia theo bảy hướng, mỗi môn có trọng tâm ôn phỏng vấn, sách, khoá học, video YouTube/RuTube/VK, tạp chí, công cụ, nút tìm nhanh trên YouTube, RuTube, VK Видео, Stepik, Coursera, КиберЛенинка, Google Scholar, arXiv, Хабр.</li><li><b>Lộ trình</b>: lịch tuần sinh tự động theo ngày phỏng vấn, số giờ mỗi tuần và thứ tự ưu tiên; xuất ra .ics để thêm vào Google Calendar hoặc lịch điện thoại.</li><li><b>Ôn phỏng vấn</b>: thẻ hỏi–đáp lặp ngắt quãng, chế độ phỏng vấn thử có hẹn giờ, đọc câu hỏi bằng giọng Nga và ghi âm câu trả lời để tự nghe lại.</li><li><b>Pomodoro</b> ở góc phải dưới: đếm 25 phút, tự ghi thời gian vào môn đang học và lịch nhịp học.</li><li><b>Ghi chú</b> theo môn, xuất Markdown; <b>thư viện</b> lọc theo loại, ngôn ngữ, yêu thích.</li></ul>' +
      '<h2>Dữ liệu được lưu ở đâu</h2><p>Trong trình duyệt bạn đang dùng (localStorage). Không có máy chủ, không cần đăng nhập. Muốn học trên máy khác: bấm biểu tượng cài đặt, xuất tệp sao lưu, rồi nhập tệp đó trên máy kia. Xoá dữ liệu duyệt web sẽ xoá tiến độ, nên hãy sao lưu định kỳ.</p>' +
      '<h2>Về các đường link</h2><p>Link video RuTube, YouTube, VK và khoá học đã được kiểm tra tồn tại vào tháng 10/2026. Sách bản in không có link tải; bấm vào tên sách sẽ mở tìm kiếm trên Google Sách. Một số khoá Arzamas, Nature Masterclasses, Sketch Engine cần trả phí hoặc đăng ký; ghi chú bên cạnh link có nói rõ. Nếu link nào hỏng, dùng các nút «Tìm thêm» trong môn đó.</p>' +
      '<h2>Đưa lên GitHub Pages</h2><ol><li>Tạo repository mới trên GitHub, ví dụ <code>ketnoi-tri-thuc</code>.</li><li>Tải toàn bộ thư mục lên (index.html, thư mục assets, README.md, .nojekyll).</li><li>Vào Settings, Pages, chọn Branch <code>main</code> và thư mục <code>/ (root)</code>, bấm Save.</li><li>Sau 1–2 phút trang có địa chỉ dạng <code>https://&lt;tên-tài-khoản&gt;.github.io/ketnoi-tri-thuc/</code>.</li></ol><h2>Tự thêm tài liệu</h2><p>Nhanh nhất: mở môn, phần «Thêm link của bạn». Muốn thêm vĩnh viễn cho mọi máy: sửa <code>assets/data.js</code> (mảng <code>r</code> của môn) hoặc <code>assets/data-extra.js</code>, rồi đẩy lên GitHub.</p></div>';
  }
};

/* ================= Tìm kiếm toàn cục ================= */
const SEARCH_INDEX = Object.keys(SUB).map(sid => { const s = SUB[sid]; return { sid, hay: (s.vi + ' ' + s.ru + ' ' + (s.en || '') + ' ' + (s.tp || []).join(' ')).toLowerCase() }; });
let qSel = -1;
function doSearch(q) {
  const box = $('#qres'); q = q.trim().toLowerCase();
  if (q.length < 2) { box.hidden = true; return; }
  const ws = q.split(/\s+/);
  const subs = SEARCH_INDEX.filter(x => ws.every(w => x.hay.includes(w))).slice(0, 7);
  const res = []; for (const sid in RES) for (const r of RES[sid]) { if (res.length >= 6) break; if (ws.every(w => (r.title + ' ' + r.note).toLowerCase().includes(w))) res.push(r); }
  let h = '';
  if (subs.length) h += '<div class="qgrp">Môn học</div>' + subs.map(x => '<a href="#/track/' + (SUBTRACKS[x.sid] || [''])[0] + '/' + x.sid + '">' + esc(SUB[x.sid].vi) + '<span class="qk">' + esc(SUB[x.sid].ru) + '</span></a>').join('');
  if (res.length) h += '<div class="qgrp">Tài liệu</div>' + res.map(r => '<a href="' + esc(resLink(r)) + '" target="_blank" rel="noopener">' + esc(r.title) + '<span class="qk">' + esc(SUB[r.sid].vi) + ', ' + esc(TYPES[r.type].vi) + '</span></a>').join('');
  h += '<a href="#/library?q=' + enc(q) + '"><b>Xem mọi kết quả trong Thư viện</b></a>';
  box.innerHTML = h; box.hidden = false; qSel = -1;
}
const qIn = $('#q');
qIn.addEventListener('input', debounce(() => doSearch(qIn.value), 120));
qIn.addEventListener('keydown', e => {
  const links = $$('#qres a');
  if (e.key === 'ArrowDown') { e.preventDefault(); qSel = Math.min(links.length - 1, qSel + 1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); qSel = Math.max(0, qSel - 1); }
  else if (e.key === 'Enter') { e.preventDefault(); if (qSel >= 0 && links[qSel]) links[qSel].click(); else location.hash = '#/library?q=' + enc(qIn.value.trim()); $('#qres').hidden = true; qIn.blur(); return; }
  else if (e.key === 'Escape') { $('#qres').hidden = true; qIn.blur(); return; }
  links.forEach((a, i) => a.classList.toggle('on', i === qSel));
});
document.addEventListener('click', e => { if (!e.target.closest('.search')) $('#qres').hidden = true; else if (e.target.closest('#qres a')) setTimeout(() => { $('#qres').hidden = true; qIn.value = ''; }, 10); });

/* ================= Pomodoro ================= */
const PO = { mode: 'work', running: false, end: 0, left: (S.pomo.work || 25) * 60, startedLeft: 0, timer: null };
function pomoSubs() {
  const w = curWeek(); const first = w && w.items ? w.items.map(i => i.sid) : [];
  const opts = '<option value="">Không gắn môn</option>' + (first.length ? '<optgroup label="Tuần này">' + first.map(s => '<option value="' + s + '">' + esc(SUB[s].vi) + '</option>').join('') + '</optgroup>' : '') +
    '<optgroup label="Tất cả môn">' + Object.keys(SUB).sort((a, b) => SUB[a].vi.localeCompare(SUB[b].vi, 'vi')).map(s => '<option value="' + s + '">' + esc(SUB[s].vi) + '</option>').join('') + '</optgroup>';
  $('#pomoSub').innerHTML = opts; $('#pomoSub').value = S.pomo.sid || '';
}
function pomoFmt(sec) { return pad(Math.floor(sec / 60)) + ':' + pad(sec % 60); }
function pomoPaint() {
  const t = pomoFmt(PO.left);
  $('#pomoTime').textContent = t; $('#pomoBig').textContent = t;
  $('#pomoMode').textContent = PO.mode === 'work' ? 'Phiên học' : 'Giải lao';
  $('#pomoStart').textContent = PO.running ? 'Tạm dừng' : 'Bắt đầu';
  $('#pomo').classList.toggle('running', PO.running && PO.mode === 'work');
  $('#pomo').classList.toggle('break', PO.running && PO.mode === 'break');
  $('#pomoToday').textContent = 'Hôm nay: ' + (S.log[today()] || 0) + ' phút, chuỗi ' + streak() + ' ngày.';
  if (PO.running) document.title = t + ' · ' + (PO.mode === 'work' ? 'Đang học' : 'Giải lao');
}
function beep() { try { const C = new (window.AudioContext || window.webkitAudioContext)(); [0, .25, .5].forEach(dt => { const o = C.createOscillator(), g = C.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(.0001, C.currentTime + dt); g.gain.exponentialRampToValueAtTime(.25, C.currentTime + dt + .02); g.gain.exponentialRampToValueAtTime(.0001, C.currentTime + dt + .2); o.connect(g).connect(C.destination); o.start(C.currentTime + dt); o.stop(C.currentTime + dt + .22); }); } catch (e) { } }
function notify(msg) { try { if ('Notification' in window && Notification.permission === 'granted') new Notification('Kết nối tri thức', { body: msg, icon: 'assets/favicon.svg' }); } catch (e) { } }
function pomoTick() {
  PO.left = Math.max(0, Math.round((PO.end - Date.now()) / 1000));
  if (PO.left <= 0) {
    if (PO.mode === 'work') {
      logMin(S.pomo.sid, S.pomo.work); beep(); notify('Xong ' + S.pomo.work + ' phút. Nghỉ ' + S.pomo.brk + ' phút nhé.'); toast('Xong một phiên ' + S.pomo.work + ' phút. Giải lao thôi.');
      PO.mode = 'break'; PO.left = S.pomo.brk * 60; PO.end = Date.now() + PO.left * 1000;
      if (ROUTE.name === 'home') { drawHeat(); }
    } else {
      beep(); notify('Hết giờ nghỉ. Sẵn sàng phiên tiếp theo.'); toast('Hết giờ nghỉ.');
      PO.mode = 'work'; PO.left = S.pomo.work * 60; PO.running = false; clearInterval(PO.timer); document.title = 'Kết nối tri thức';
    }
  }
  pomoPaint();
}
function pomoStart() {
  if (PO.running) { // tạm dừng
    PO.running = false; clearInterval(PO.timer); PO.left = Math.max(0, Math.round((PO.end - Date.now()) / 1000)); document.title = 'Kết nối tri thức'; pomoPaint(); return;
  }
  if ('Notification' in window && Notification.permission === 'default') { try { Notification.requestPermission(); } catch (e) { } }
  if (PO.mode === 'work' && PO.left === S.pomo.work * 60) PO.startedLeft = PO.left;
  PO.running = true; PO.end = Date.now() + PO.left * 1000; clearInterval(PO.timer); PO.timer = setInterval(pomoTick, 500); pomoPaint();
}
function pomoLogPartial() { if (PO.mode === 'work') { const el = Math.floor((S.pomo.work * 60 - (PO.running ? Math.round((PO.end - Date.now()) / 1000) : PO.left)) / 60); if (el >= 1) { logMin(S.pomo.sid, el); toast('Đã ghi ' + el + ' phút học.'); } } }
function pomoReset() { pomoLogPartial(); PO.running = false; clearInterval(PO.timer); PO.mode = 'work'; PO.left = S.pomo.work * 60; document.title = 'Kết nối tri thức'; pomoPaint(); }
function pomoSkip() { if (PO.mode === 'work') pomoLogPartial(); PO.mode = PO.mode === 'work' ? 'break' : 'work'; PO.left = (PO.mode === 'work' ? S.pomo.work : S.pomo.brk) * 60; if (PO.running) PO.end = Date.now() + PO.left * 1000; pomoPaint(); }
$('#pomoPill').addEventListener('click', () => { const p = $('#pomoPanel'); p.hidden = !p.hidden; $('#pomoPill').setAttribute('aria-expanded', String(!p.hidden)); if (!p.hidden) pomoSubs(); });
$('#pomoStart').addEventListener('click', pomoStart);
$('#pomoReset').addEventListener('click', pomoReset);
$('#pomoSkip').addEventListener('click', pomoSkip);
$('#pomoSub').addEventListener('change', e => { S.pomo.sid = e.target.value; save(); });
$('#pomoWork').value = S.pomo.work; $('#pomoBreak').value = S.pomo.brk;
$('#pomoWork').addEventListener('change', e => { S.pomo.work = Math.max(5, Math.min(90, Number(e.target.value) || 25)); save(); if (!PO.running && PO.mode === 'work') { PO.left = S.pomo.work * 60; pomoPaint(); } });
$('#pomoBreak').addEventListener('change', e => { S.pomo.brk = Math.max(1, Math.min(30, Number(e.target.value) || 5)); save(); if (!PO.running && PO.mode === 'break') { PO.left = S.pomo.brk * 60; pomoPaint(); } });
function pomoForSubject(sid) {
  S.pomo.sid = sid || ''; save();
  if (!PO.running) { PO.mode = 'work'; PO.left = S.pomo.work * 60; pomoStart(); }
  const p = $('#pomoPanel'); p.hidden = false; $('#pomoPill').setAttribute('aria-expanded', 'true'); pomoSubs();
  toast(sid ? 'Bắt đầu học: ' + SUB[sid].vi : 'Bắt đầu phiên học ' + S.pomo.work + ' phút');
}
pomoPaint();

/* ================= Xuất / nhập ================= */
function exportJSON() { saveNow(); download('ket-noi-tri-thuc-sao-luu-' + today() + '.json', JSON.stringify(S, null, 1), 'application/json'); toast('Đã xuất tệp sao lưu.'); }
function exportNotes() {
  let md = '# Ghi chú học tập — Kết nối tri thức\n\nXuất ngày ' + fmt(today()) + '\n';
  D.tracks.forEach(t => { const ids = trackSubjects(t.id).filter(s => S.notes[s] && S.notes[s].trim() && (SUBTRACKS[s] || [])[0] === t.id); if (!ids.length) return; md += '\n## ' + t.vi + ' (' + t.ru + ')\n'; ids.forEach(s => { md += '\n### ' + SUB[s].vi + ' — ' + SUB[s].ru + '\n\n' + S.notes[s].trim() + '\n'; }); });
  download('ghi-chu-' + today() + '.md', md, 'text/markdown;charset=utf-8'); toast('Đã xuất ghi chú.');
}
function icsEsc(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }
function icsFold(line) { const out = []; let s = line; while (s.length > 70) { out.push(s.slice(0, 70)); s = ' ' + s.slice(70); } out.push(s); return out.join('\r\n'); }
function exportICS() {
  const P = buildPlan(); const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ket noi tri thuc//Lo trinh//VI', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:Lộ trình phỏng vấn'];
  const ymd = s => s.replace(/-/g, '');
  P.weeks.forEach(w => {
    const sum = w.review ? 'Tuần ' + w.n + ': ôn tập và phỏng vấn thử' : 'Tuần ' + w.n + ': ' + w.items.map(i => SUB[i.sid].vi).join(', ');
    const desc = w.review ? REVIEW_TEXT.join('\n') : w.items.map(i => '• ' + SUB[i.sid].vi + ' (' + SUB[i.sid].ru + '): ' + i.h + ' giờ').join('\n') + (S.plan.langOn ? '\n• Mỗi ngày ' + S.plan.langMin + ' phút ' + S.plan.langWhich : '');
    L.push('BEGIN:VEVENT', 'UID:ktt-week-' + w.n + '-' + ymd(w.start) + '@ketnoitrithuc', 'DTSTAMP:' + stamp, 'DTSTART;VALUE=DATE:' + ymd(w.start), 'DTEND;VALUE=DATE:' + ymd(addDays(w.start, 1)), icsFold('SUMMARY:' + icsEsc(sum)), icsFold('DESCRIPTION:' + icsEsc(desc)), 'END:VEVENT');
  });
  L.push('BEGIN:VEVENT', 'UID:ktt-interview-' + ymd(P.end) + '@ketnoitrithuc', 'DTSTAMP:' + stamp, 'DTSTART;VALUE=DATE:' + ymd(P.end), 'DTEND;VALUE=DATE:' + ymd(addDays(P.end, 1)), 'SUMMARY:' + icsEsc('Phỏng vấn xin việc'), 'END:VEVENT', 'END:VCALENDAR');
  download('lo-trinh-' + today() + '.ics', L.join('\r\n'), 'text/calendar;charset=utf-8'); toast('Đã xuất lịch. Mở tệp để thêm vào Google Calendar hoặc lịch điện thoại.');
}
$('#importFile').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const rd = new FileReader();
  rd.onload = () => { try { const o = JSON.parse(rd.result); if (!o || typeof o !== 'object' || !o.plan) throw new Error('bad'); S = Object.assign(defaults(), o); S.plan = Object.assign(defaults().plan, o.plan); S.pomo = Object.assign(defaults().pomo, o.pomo || {}); saveNow(); buildRes(); buildPlan(); render(); applyTheme(); toast('Đã nhập dữ liệu sao lưu.'); $('#settings').close(); } catch (err) { toast('Tệp không đúng định dạng sao lưu của trang này.'); } };
  rd.readAsText(f); e.target.value = '';
});

/* ================= Giao diện sáng/tối ================= */
function applyTheme() {
  const t = S.theme || 'auto';
  if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t);
  $$('input[name="theme"]').forEach(i => i.checked = i.value === t);
  const dark = t === 'dark' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', dark ? '#16212B' : '#F3F5F0');
}
$('#themeBtn').addEventListener('click', () => { const order = ['auto', 'dark', 'light']; S.theme = order[(order.indexOf(S.theme || 'auto') + 1) % 3]; save(); applyTheme(); toast('Giao diện: ' + { auto: 'theo hệ thống', dark: 'tối', light: 'sáng' }[S.theme]); });
$$('input[name="theme"]').forEach(i => i.addEventListener('change', () => { S.theme = i.value; save(); applyTheme(); }));
$('#settingsBtn').addEventListener('click', () => { applyTheme(); $('#settings').showModal(); });
applyTheme();

/* ================= Sự kiện ủy quyền ================= */
document.addEventListener('click', e => {
  const a = e.target.closest('[data-act]'); if (!a) return;
  const act = a.dataset.act, sid = a.dataset.sid;
  if (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.tagName === 'FORM' || a.tagName === 'SELECT') return;
  switch (act) {
    case 'toggle': { const el = a.closest('.subj'); openSubj(el, !el.classList.contains('open')); if (el.classList.contains('open')) history.replaceState(null, '', '#/track/' + (ROUTE.name === 'track' ? ROUTE.args[0] : (SUBTRACKS[sid] || [''])[0]) + '/' + sid); break; }
    case 'status': { const v = Number(a.dataset.v); S.status[sid] = v; if (v === 2 && !S.conf[sid]) S.conf[sid] = 3; save(); refreshSubj(sid); if (v === 3) buildPlan(); toast(SUB[sid].vi + ': ' + STATUS[v][0].toLowerCase()); break; }
    case 'conf': { const v = Number(a.dataset.v); S.conf[sid] = S.conf[sid] === v ? v - 1 : v; save(); refreshSubj(sid); break; }
    case 'fav': { const id = a.dataset.rid; S.fav[id] = !S.fav[id]; if (!S.fav[id]) delete S.fav[id]; save(); a.classList.toggle('on', !!S.fav[id]); a.setAttribute('aria-pressed', String(!!S.fav[id])); break; }
    case 'del-res': { const list = S.custom[sid] || []; S.custom[sid] = list.filter(x => String(x.id) !== a.dataset.cid); save(); buildRes(); refreshSubj(sid); toast('Đã xoá link.'); break; }
    case 'copy-link': { const url = location.href.split('#')[0] + '#/track/' + (SUBTRACKS[sid] || [''])[0] + '/' + sid; (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => toast('Đã sao chép link.'), () => toast(url)); break; }
    case 'pomo-sub': pomoForSubject(sid); break;
    case 'pomo-start': { const w = curWeek(); const first = w && w.items.find(i => S.status[i.sid] !== 2); pomoForSubject(first ? first.sid : S.pomo.sid); break; }
    case 'tab': trackTab[a.dataset.tid] = a.dataset.lv; history.replaceState(null, '', '#/track/' + a.dataset.tid); render(); break;
    case 'plan-mv': { const o = S.plan.order, i = o.indexOf(a.dataset.tid), j = i + Number(a.dataset.d); if (j < 0 || j >= o.length) break; [o[i], o[j]] = [o[j], o[i]]; save(); render(); break; }
    case 'print': window.print(); break;
    case 'export-ics': exportICS(); break;
    case 'export': exportJSON(); break;
    case 'export-notes': exportNotes(); break;
    case 'open-settings': applyTheme(); $('#settings').showModal(); break;
    case 'reset': { if (!a.classList.contains('armed')) { a.classList.add('armed'); a.textContent = 'Bấm lần nữa để xoá vĩnh viễn'; setTimeout(() => { a.classList.remove('armed'); a.textContent = 'Xoá toàn bộ dữ liệu'; }, 4000); break; } S = defaults(); saveNow(); buildRes(); buildPlan(); applyTheme(); render(); $('#settings').close(); toast('Đã xoá dữ liệu.'); break; }
    case 'pick-again': drawPick(true); break;
    case 'pick-seen': S.seen[a.dataset.rid] = 1; save(); drawPick(true); break;
    case 'lib-type': toggleArr(LIB.types, a.dataset.v); a.setAttribute('aria-pressed', String(LIB.types.includes(a.dataset.v))); LIB.limit = 200; libRender(); break;
    case 'lib-lang': toggleArr(LIB.langs, a.dataset.v); a.setAttribute('aria-pressed', String(LIB.langs.includes(a.dataset.v))); libRender(); break;
    case 'lib-fav': LIB.fav = !LIB.fav; a.setAttribute('aria-pressed', String(LIB.fav)); libRender(); break;
    case 'lib-unseen': LIB.unseen = !LIB.unseen; a.setAttribute('aria-pressed', String(LIB.unseen)); libRender(); break;
    case 'lib-more': LIB.limit += 200; libRender(); break;
    case 'lib-random': { const l = libFiltered().filter(r => !S.seen[r.id] && r.url); if (!l.length) { toast('Không còn tài liệu chưa xem trong bộ lọc này.'); break; } const r = l[Math.floor(Math.random() * l.length)]; window.open(r.url, '_blank', 'noopener'); toast('Mở: ' + r.title); break; }
    case 'card-tab': CARDV.tab = a.dataset.v; if (CARDV.tab !== 'mock') stopMockTimer(); if (ROUTE.name !== 'cards') { location.hash = '#/cards'; } else { $$('.tabs [data-act="card-tab"]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.v === CARDV.tab))); cardRender(); } break;
    case 'card-track': { S.cardTracks = S.cardTracks || []; toggleArr(S.cardTracks, a.dataset.v); save(); a.setAttribute('aria-pressed', String(S.cardTracks.includes(a.dataset.v))); CARDV.queue = null; cardRender(); break; }
    case 'flip': if (CARDV.tab === 'srs') { CARDV.flipped = !CARDV.flipped; cardRender(); } else if (MOCK && MOCK.phase === 'a') { const f = $('.flash'); if (f) f.classList.toggle('flipped'); } break;
    case 'rate': rate(Number(a.dataset.v)); break;
    case 'srs-more': { const fresh = cardPool().filter(c => !S.cards[c.id]).slice(0, 10).map(c => c.id); if (!fresh.length) { toast('Đã học hết thẻ mới trong bộ lọc này.'); break; } CARDV.queue = CARDV.queue.concat(fresh); cardRender(); break; }
    case 'del-card': S.mycards = (S.mycards || []).filter(c => c.id !== a.dataset.v); save(); cardRender(); break;
    case 'mock-start': {
      const n = Number($('#mN').value), sec = Number($('#mT').value), sp = $('#mSpeak') && $('#mSpeak').checked;
      const pool = cardPool().slice(); for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      if (!pool.length) { toast('Chưa có thẻ trong bộ lọc.'); break; }
      MOCK = { list: pool.slice(0, n).map(c => c.id), i: 0, phase: 'q', sec, speak: sp, grades: [], t0: 0 }; recUrl = ''; cardRender();
      if (sp) speak(allCards().find(c => c.id === MOCK.list[0]).q);
      break;
    }
    case 'mock-speak': if (MOCK) speak(allCards().find(c => c.id === MOCK.list[MOCK.i]).q); break;
    case 'mock-rec': toggleRec(); break;
    case 'mock-show': if (mediaRec && mediaRec.state === 'recording') mediaRec.stop(); MOCK.phase = 'a'; stopMockTimer(); setTimeout(cardRender, mediaRec && mediaRec.state !== 'inactive' ? 300 : 0); cardRender(); break;
    case 'mock-grade': MOCK.grades.push(Number(a.dataset.v)); MOCK.i++; MOCK.phase = 'q'; MOCK.t0 = 0; if (recUrl) { URL.revokeObjectURL(recUrl); recUrl = ''; } cardRender(); if (MOCK.speak && MOCK.i < MOCK.list.length) speak(allCards().find(c => c.id === MOCK.list[MOCK.i]).q); break;
    case 'mock-reset': MOCK = null; cardRender(); break;
  }
});
function toggleArr(arr, v) { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); }
document.addEventListener('change', e => {
  const a = e.target;
  if (a.dataset.act === 'seen') { const id = a.dataset.rid; if (a.checked) S.seen[id] = 1; else delete S.seen[id]; save(); const li = a.closest('li'); if (li) li.classList.toggle('seen', a.checked); const r = RID[id]; if (r && a.checked && !S.status[r.sid]) { S.status[r.sid] = 1; refreshSubj(r.sid); } }
  else if (a.dataset.act === 'plan-done') { const sid = a.dataset.sid; S.status[sid] = a.checked ? 2 : 1; if (a.checked && !S.conf[sid]) S.conf[sid] = 3; save(); const li = a.closest('li'); if (li) li.classList.toggle('done', a.checked); if (ROUTE.name === 'home') { drawRadar(); } toast(a.checked ? 'Đã xong: ' + SUB[sid].vi : 'Đánh dấu lại đang học'); }
  else if (a.dataset.act === 'plan-on') { S.plan.on[a.dataset.tid] = a.checked ? 1 : 0; save(); render(); }
  else if (a.dataset.pl) { const k = a.dataset.pl; let v = a.type === 'checkbox' ? a.checked : a.value; if (k === 'hours' || k === 'langMin') v = Math.max(1, Number(v) || 1); if (k === 'coreOnly') v = v === '1'; if ((k === 'start' || k === 'end') && !v) return; S.plan[k] = v; save(); render(); }
});
document.addEventListener('input', e => {
  const a = e.target;
  if (a.dataset.act === 'note') { S.notes[a.dataset.sid] = a.value; S.notesT[a.dataset.sid] = Date.now(); save(); }
});
document.addEventListener('submit', e => {
  const f = e.target; const act = f.dataset.act; if (!act) return;
  e.preventDefault(); const fd = new FormData(f);
  if (act === 'add-res') { const sid = f.dataset.sid; const url = String(fd.get('url') || '').trim(); if (!/^https?:\/\//i.test(url)) { toast('Link cần bắt đầu bằng http:// hoặc https://'); return; } (S.custom[sid] = S.custom[sid] || []).push({ id: Date.now(), title: String(fd.get('title')).trim(), url, lang: fd.get('lang') || '' }); save(); buildRes(); refreshSubj(sid); toast('Đã thêm link vào môn.'); }
  else if (act === 'add-card') { (S.mycards = S.mycards || []).push({ id: 'u' + Date.now(), t: fd.get('t'), q: String(fd.get('q')).trim(), a: String(fd.get('a')).trim() }); save(); cardRender(); toast('Đã thêm thẻ.'); }
  else if (act === 'log-add') { const d = fd.get('d') || today(), m = Number(fd.get('m')) || 0, s = fd.get('s') || ''; if (m > 0) { S.log[d] = (S.log[d] || 0) + m; if (s) S.logSub[s] = (S.logSub[s] || 0) + m; save(); render(); toast('Đã ghi ' + m + ' phút.'); } }
});

/* ================= Phím tắt ================= */
let gPending = false;
document.addEventListener('keydown', e => {
  const tag = (e.target.tagName || '').toLowerCase();
  const typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
  if (e.key === 'Escape') { $('#qres').hidden = true; }
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  if ($('dialog[open]')) return;
  if (e.key === '/') { e.preventDefault(); qIn.focus(); return; }
  if (e.key === '?') { $('#keys').showModal(); return; }
  if (gPending) { gPending = false; const m = { h: '#/', p: '#/plan', m: '#/tracks', l: '#/library', c: '#/cards', n: '#/notes' }[e.key]; if (m) location.hash = m; return; }
  if (e.key === 'g') { gPending = true; setTimeout(() => gPending = false, 1200); return; }
  if (e.key === 't') { pomoStart(); return; }
  if (ROUTE.name === 'cards' && CARDV.tab === 'srs' && CARDV.queue && CARDV.i < CARDV.queue.length) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); CARDV.flipped = !CARDV.flipped; cardRender(); }
    else if (CARDV.flipped && ['1', '2', '3'].includes(e.key)) rate(Number(e.key));
  }
});

render();
})();

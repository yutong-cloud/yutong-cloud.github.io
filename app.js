(() => {
  'use strict';
  const data = window.HOMEPAGE;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const state = { language: 'zh', filter: 'all', expandedAwards: false, theme: 'light', modal: null };
  const readPreference = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ } };
  state.language = readPreference('yutong-language', 'zh') === 'en' ? 'en' : 'zh';
  state.theme = readPreference('yutong-theme', 'light') === 'dark' ? 'dark' : 'light';
  const t = (key) => data.translations[state.language][key] || key;
  const localized = (value) => typeof value === 'string' ? value : value?.[state.language] || '';
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const newTab = 'target="_blank" rel="noopener noreferrer"';
  const figureShell = (title, content) => `<svg viewBox="0 0 300 196" role="img" aria-label="${escapeHTML(title)}"><rect class="figure-background" width="300" height="196"/>${content}</svg>`;
  const figures = {
    prism: () => figureShell('PRISM: Memory, instruction, reasoning; 65 tasks, 9,448 instances, 24 models', `
      <text x="20" y="27" class="figure-text" font-size="13" font-weight="600" letter-spacing="2">PRISM</text><text x="20" y="42" class="figure-muted" font-size="6" letter-spacing="1">STAGE-AWARE HALLUCINATION DIAGNOSIS</text>
      <path class="figure-line" d="M51 101h199M101 101l-4-3m4 3-4 3m93-3-4-3m4 3-4 3"/>
      <g transform="translate(20 64)"><rect class="figure-paper" width="74" height="66" rx="5"/><circle class="figure-blue" cx="37" cy="22" r="13"/><path class="figure-line" d="M31 18h12v10H31zm3-3v3m6-3v3m-6 10v3m6-3v3"/><text x="37" y="50" class="figure-text" font-size="7" text-anchor="middle">MEMORY</text></g>
      <g transform="translate(113 64)"><rect class="figure-paper" width="74" height="66" rx="5"/><circle class="figure-mint" cx="37" cy="22" r="13"/><path class="figure-line" d="m30 22 5 5 9-10"/><text x="37" y="50" class="figure-text" font-size="7" text-anchor="middle">INSTRUCTION</text></g>
      <g transform="translate(206 64)"><rect class="figure-paper" width="74" height="66" rx="5"/><circle class="figure-blue" cx="37" cy="22" r="13"/><path class="figure-line" d="m30 18 7 9 7-9m-7 9v5"/><text x="37" y="50" class="figure-text" font-size="7" text-anchor="middle">REASONING</text></g>
      <path class="figure-line" d="M24 146h252" opacity=".3"/><text x="25" y="167" class="figure-text" font-size="11">65<tspan class="figure-muted" font-size="6"> TASKS</tspan></text><text x="113" y="167" class="figure-text" font-size="11">9,448<tspan class="figure-muted" font-size="6"> INSTANCES</tspan></text><text x="231" y="167" class="figure-text" font-size="11">24<tspan class="figure-muted" font-size="6"> LLMs</tspan></text>`),
    narrative: () => figureShell('Narrative captivity: one-sided stories across multiple dialogue turns', `
      <text x="20" y="27" class="figure-text" font-size="10" font-weight="600" letter-spacing="1">CAUGHT IN THE STORY</text><text x="20" y="42" class="figure-muted" font-size="6" letter-spacing="1">MULTI-TURN DIALOGUE · INDEPENDENT JUDGMENT</text>
      <path class="figure-line" d="M38 83h210v44H64" stroke-dasharray="3 4"/>
      <g transform="translate(20 61)"><rect class="figure-paper" width="69" height="39" rx="6"/><path class="figure-line" d="M12 14h43M12 21h30"/><text x="57" y="31" class="figure-muted" font-size="5">01</text></g>
      <g transform="translate(116 61)"><rect class="figure-mint" width="69" height="39" rx="6"/><path class="figure-line" d="M12 14h43M12 21h33"/><text x="57" y="31" class="figure-muted" font-size="5">02</text></g>
      <g transform="translate(210 61)"><rect class="figure-blue" width="69" height="39" rx="6"/><path class="figure-line" d="M12 14h43M12 21h25"/><text x="57" y="31" class="figure-muted" font-size="5">03</text></g>
      <g transform="translate(115 111)"><rect class="figure-paper" width="164" height="30" rx="5"/><text x="82" y="19" class="figure-text" font-size="7" text-anchor="middle">ONE STORY ≠ THE WHOLE PICTURE</text></g>
      <circle class="figure-ochre" cx="54" cy="127" r="12" opacity=".22"/><text x="54" y="131" class="figure-text" text-anchor="middle" font-family="Georgia" font-size="14">?</text>
      <text x="20" y="171" class="figure-muted" font-size="7">6 MORAL DIMENSIONS</text><text x="137" y="171" class="figure-muted" font-size="7">5,078 SCENARIOS</text><text x="249" y="171" class="figure-muted" font-size="7">17 LLMs</text>`),
    esg: () => figureShell('ESG text analysis connects disclosures, AI, and global value chain resilience', `
      <text x="20" y="27" class="figure-text" font-size="11" font-weight="600" letter-spacing="1.2">ESG × AI</text><text x="20" y="42" class="figure-muted" font-size="6" letter-spacing="1">FROM DISCLOSURE TO RESILIENCE</text>
      <g transform="translate(25 64)"><rect class="figure-paper" width="50" height="63" rx="3"/><path class="figure-line" d="M10 15h29M10 23h22M10 31h29M10 39h17M10 47h26"/></g><path class="figure-line" d="M82 95h28m-5-4 5 4-5 4M184 95h25m-5-4 5 4-5 4"/>
      <g transform="translate(115 65)"><rect class="figure-mint" width="64" height="62" rx="7"/><text x="32" y="25" class="figure-text" text-anchor="middle" font-size="13" font-family="Georgia">AI</text><text x="32" y="43" class="figure-muted" text-anchor="middle" font-size="6">TEXT ANALYSIS</text></g>
      <g transform="translate(221 64)"><path class="figure-line" d="m24 7-17 23 17 24 22-19-22-28m0 0v47M7 30l39 5"/><circle class="figure-accent" cx="24" cy="7" r="4"/><circle class="figure-ochre" cx="7" cy="30" r="4"/><circle class="figure-accent" cx="24" cy="54" r="4"/><circle class="figure-accent" cx="46" cy="35" r="4"/></g>
      <text x="50" y="149" class="figure-muted" text-anchor="middle" font-size="7">DISCLOSURES</text><text x="147" y="149" class="figure-muted" text-anchor="middle" font-size="7">REPRESENTATIONS</text><text x="248" y="149" class="figure-muted" text-anchor="middle" font-size="7">RESILIENCE</text><path class="figure-line" d="M21 168h258" opacity=".2"/>`),
    agent: () => figureShell('Banking intelligence workflow: collect, retrieve, analyze, brief', `
      <text x="20" y="27" class="figure-text" font-size="11" font-weight="600" letter-spacing="1">BANKING INTELLIGENCE</text><text x="20" y="42" class="figure-muted" font-size="6" letter-spacing="1">MCP + RAG + AGENT WORKFLOWS</text>
      <path class="figure-line" d="M66 87h55m-5-4 5 4-5 4M186 87h46v39h-38m5-4-5 4 5 4M119 126H63v-22"/>
      <g transform="translate(24 64)"><rect class="figure-paper" width="81" height="39" rx="4"/><text x="40" y="16" class="figure-muted" text-anchor="middle" font-size="5">01 / MCP</text><text x="40" y="28" class="figure-text" text-anchor="middle" font-size="7">COLLECT</text></g>
      <g transform="translate(119 64)"><rect class="figure-mint" width="81" height="39" rx="4"/><text x="40" y="16" class="figure-muted" text-anchor="middle" font-size="5">02 / RAG</text><text x="40" y="28" class="figure-text" text-anchor="middle" font-size="7">RETRIEVE</text></g>
      <g transform="translate(165 113)"><rect class="figure-blue" width="111" height="39" rx="4"/><text x="55" y="16" class="figure-muted" text-anchor="middle" font-size="5">03 / AGENT</text><text x="55" y="28" class="figure-text" text-anchor="middle" font-size="7">ANALYZE</text></g>
      <g transform="translate(24 113)"><rect class="figure-paper" width="111" height="39" rx="4"/><text x="55" y="16" class="figure-muted" text-anchor="middle" font-size="5">04 / BRIEFING</text><text x="55" y="28" class="figure-text" text-anchor="middle" font-size="7">SYNTHESIZE</text></g>
      <text x="20" y="178" class="figure-muted" font-size="6" letter-spacing=".7">MULTI-SOURCE DATA → ACTIONABLE INSIGHTS</text>`)
  };

  function renderNews() {
    $('#news-list').innerHTML = data.news.map(item => `<div class="news-row"><time datetime="${item.date.replace('.', '-')}">${item.date}</time><p>${localized(item)}${item.fresh ? '<span class="new-label">NEW</span>' : ''}</p></div>`).join('');
  }

  function renderWorks() {
    const works = data.works.filter(work => state.filter === 'all' || work.category === state.filter);
    $('#works-list').innerHTML = works.map(work => {
      const title = escapeHTML(localized(work.title));
      const firstLink = work.links[0]?.url;
      const links = work.links.map(link => `<a href="${escapeHTML(link.url)}" ${newTab}${link.download ? ' download' : ''}>${link.label === 'attachment' ? (state.language === 'zh' ? 'PDF 附件' : 'PDF attachment') : t(link.label)} <span aria-hidden="true">${link.download ? '↓' : '↗'}</span></a>`).join('');
      return `<article class="work-card" data-work="${work.id}"><div class="work-figure">${figures[work.figure]()}</div><div class="work-copy"><div class="work-meta"><span class="venue ${work.category === 'finance' ? 'finance' : ''}">${escapeHTML(work.venue)}</span><span class="work-role">${escapeHTML(localized(work.role))}</span></div><h3>${firstLink ? `<a href="${escapeHTML(firstLink)}" ${newTab}>${title}</a>` : title}</h3>${work.authors ? `<p class="authors">${work.authors}</p>` : ''}<p class="work-description">${escapeHTML(localized(work.description))}</p><div class="work-links">${links}${links ? '<span class="link-sep" aria-hidden="true"></span>' : ''}<button data-detail="${work.id}">${work.kind === 'project' ? t('projectDetails') : t('details')} <span aria-hidden="true">↗</span></button>${work.bibtex ? `<button data-bib="${work.id}">BibTeX <span aria-hidden="true">↗</span></button>` : ''}</div></div></article>`;
    }).join('');
    $('#work-count').textContent = `${String(works.length).padStart(2, '0')} ${state.language === 'zh' ? t('works') : 'WORKS'}`;
    $$('.filter').forEach(button => { const active = button.dataset.filter === state.filter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
  }

  function renderAwards() {
    $('#award-list').innerHTML = data.awards.map((award, index) => `<div class="award-row" ${!state.expandedAwards && index >= 5 ? 'hidden' : ''}><time datetime="${award.date.replace('.', '-')}">${award.date}</time><div><p class="award-title">${escapeHTML(localized(award.title))}</p>${award.extra ? `<p class="award-extra">${escapeHTML(localized(award.extra))}</p>` : ''}</div><span class="award-level ${award.gold ? 'gold' : ''}">${escapeHTML(localized(award.level))}</span></div>`).join('');
    $('#more-awards').setAttribute('aria-expanded', String(state.expandedAwards));
    $('#more-awards').innerHTML = `<span>${t(state.expandedAwards ? 'lessAwards' : 'moreAwards')}</span><span class="expand-symbol">${state.expandedAwards ? '−' : '+'}</span>`;
  }

  function renderTheme() {
    document.documentElement.dataset.theme = state.theme;
    $('#theme-toggle').setAttribute('aria-label', t(state.theme === 'light' ? 'dark' : 'light'));
    $('#theme-toggle').setAttribute('aria-pressed', String(state.theme === 'dark'));
    $('meta[name="theme-color"]').content = state.theme === 'light' ? '#f7f8f5' : '#172326';
    $('#theme-toggle').innerHTML = state.theme === 'light' ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 13.1A8.8 8.8 0 0 1 10.9 3.2 9 9 0 1 0 20.8 13.1Z"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>';
  }

  function renderLanguage() {
    document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en';
    document.title = state.language === 'zh' ? '张语桐 · Yutong Zhang' : 'Yutong Zhang · Research & FinTech';
    $$('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    $('#language-toggle').innerHTML = `${state.language === 'zh' ? 'EN' : '中文'} <span>↗</span>`;
    $('#language-toggle').setAttribute('aria-label', state.language === 'zh' ? 'Switch to English' : '切换为中文');
    $('#close-dialog').setAttribute('aria-label', t('close'));
    $('#copy-email').setAttribute('aria-label', t('copyEmail'));
    $('#menu-toggle').setAttribute('aria-label', t('menu'));
    $('#navigation').setAttribute('aria-label', state.language === 'zh' ? '主要导航' : 'Main navigation');
    $('.profile-sidebar').setAttribute('aria-label', state.language === 'zh' ? '个人信息' : 'Personal information');
    $('.filters').setAttribute('aria-label', state.language === 'zh' ? '研究筛选' : 'Filter research');
    $('.portrait').alt = state.language === 'zh' ? '张语桐的个人照片' : 'Portrait of Yutong Zhang';
    renderNews(); renderWorks(); renderAwards(); renderTheme();
    if ($('#detail-dialog').open && state.modal) renderDialogContent(state.modal.id, state.modal.type);
  }

  let toastTimeout;
  function toast(message) {
    $('#toast').textContent = message;
    $('#toast').classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => $('#toast').classList.remove('visible'), 2700);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const textarea = document.createElement('textarea');
        textarea.value = text; textarea.setAttribute('readonly', '');
        textarea.style.cssText = 'position:fixed;opacity:0;left:-9999px';
        document.body.append(textarea); textarea.select();
        let success;
        try { success = document.execCommand('copy'); } finally { textarea.remove(); }
        if (!success) throw new Error('Copy unavailable');
      }
      toast(t('copied'));
    } catch { toast(t('copyFailed')); }
  }

  function renderDialogContent(id, type) {
    const work = data.works.find(item => item.id === id);
    if (!work) return;
    state.modal = {id, type};
    $('#dialog-title').textContent = type === 'bib' ? 'BibTeX' : localized(work.title);
    $('#dialog-kind').textContent = type === 'bib' ? 'CITATION' : t(work.kind === 'project' ? 'projectNote' : 'researchNote');
    if (type === 'bib') {
      $('#dialog-content').innerHTML = `<pre>${escapeHTML(work.bibtex)}</pre><button class="button button-primary" id="copy-bib">${t('copyBib')} <span>↗</span></button>`;
      $('#copy-bib').addEventListener('click', () => copyText(work.bibtex));
    } else {
      $('#dialog-content').innerHTML = localized(work.detail) + `<div class="detail-tags">${work.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>` + (work.links[0] ? `<a class="dialog-source" href="${escapeHTML(work.links[0].url)}" ${newTab}>${work.links[0].label === 'attachment' ? (state.language === 'zh' ? 'PDF 附件' : 'PDF attachment') : t('paper')} ↗</a>` : '');
    }
  }

  function openDialog(id, type) {
    renderDialogContent(id, type);
    $('#detail-dialog').showModal();
  }

  $('#works-list').addEventListener('click', event => {
    const detail = event.target.closest('[data-detail]');
    const bib = event.target.closest('[data-bib]');
    if (detail) openDialog(detail.dataset.detail, 'detail');
    if (bib) openDialog(bib.dataset.bib, 'bib');
  });
  $$('.filter').forEach(button => button.addEventListener('click', () => { state.filter = button.dataset.filter; renderWorks(); }));
  $('#more-awards').addEventListener('click', () => { state.expandedAwards = !state.expandedAwards; renderAwards(); });
  $('#theme-toggle').addEventListener('click', () => { state.theme = state.theme === 'light' ? 'dark' : 'light'; savePreference('yutong-theme', state.theme); renderTheme(); });
  $('#language-toggle').addEventListener('click', () => { state.language = state.language === 'zh' ? 'en' : 'zh'; savePreference('yutong-language', state.language); renderLanguage(); });
  $('#copy-email').addEventListener('click', () => copyText(data.email));
  $('#close-dialog').addEventListener('click', () => $('#detail-dialog').close());
  $('#detail-dialog').addEventListener('click', event => { if (event.target !== $('#detail-dialog')) return; const rect = $('#detail-dialog').getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) $('#detail-dialog').close(); });
  $('#detail-dialog').addEventListener('close', () => { state.modal = null; });
  $('#menu-toggle').addEventListener('click', () => { const open = $('#navigation').classList.toggle('open'); $('#menu-toggle').setAttribute('aria-expanded', String(open)); });
  $$('#navigation a').forEach(link => link.addEventListener('click', () => { $('#navigation').classList.remove('open'); $('#menu-toggle').setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { $('#navigation').classList.remove('open'); $('#menu-toggle').setAttribute('aria-expanded', 'false'); } });

  renderLanguage();
  $('#year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        const sectionId = entry.target.id === 'contact' ? 'awards' : entry.target.id;
        $$('#navigation a').forEach(link => {
          const active = link.getAttribute('href') === `#${sectionId}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-12% 0px -65% 0px', threshold: 0 });
    $$('.section-anchor').forEach(section => sectionObserver.observe(section));
  }
})();

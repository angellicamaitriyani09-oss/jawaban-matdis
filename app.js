(function () {
  const { SECTIONS, PROBLEMS } = window.ZineData;

// ============================================================================
// State Management
// ============================================================================
const STORAGE_KEY = 'if1112_study_zine_done_v1';

const state = {
  section: 'ALL',         // 'ALL' | 'A' | 'B' | 'C'
  difficulty: 'ALL',      // 'ALL' | 'Dasar' | 'Sedang' | 'HOTS'
  globalMode: 'detail',   // 'brief' | 'detail'
  cardModes: {},          // { [id]: 'brief' | 'detail' }
  revealedAnswers: new Set(),
  allRevealed: false,
  doneIds: loadDoneIds(),
};

function loadDoneIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveDoneIds() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.doneIds]));
  } catch {
    // Ignore storage quota / private mode errors
  }
}

// ============================================================================
// DOM References
// ============================================================================
const feedEl = document.getElementById('problemFeed');
const jumpStripEl = document.getElementById('jumpStrip');
const progressTextEl = document.getElementById('progressText');
const toggleAllAnswersBtn = document.getElementById('toggleAllAnswersBtn');
const toastEl = document.getElementById('toast');

let toastTimer = null;

// ============================================================================
// Helpers
// ============================================================================
function showToast(message) {
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.hidden = true;
  }, 2200);
}

async function copyToClipboard(text, label) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast(`✓ Rumus & catatan ${label} tersalin!`);
  } catch {
    showToast('Gagal menyalin otomatis — silakan salin manual.');
  }
}

function renderMath(container) {
  if (typeof window.renderMathInElement === 'function') {
    window.renderMathInElement(container, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
      strict: false,
    });
  }
}

function updateProgressUI() {
  progressTextEl.textContent = `${state.doneIds.size} / ${PROBLEMS.length} PAHAM`;
  renderJumpStrip();
}

// ============================================================================
// Rendering: Jump Strip
// ============================================================================
function renderJumpStrip() {
  jumpStripEl.innerHTML = PROBLEMS.map((p) => {
    const isDone = state.doneIds.has(p.id);
    return `<button type="button" class="jump-btn ${isDone ? 'is-done' : ''}" data-jump-id="${p.id}" title="Loncat ke Soal ${p.id} (${p.difficulty})">${p.id}</button>`;
  }).join('');
}

// ============================================================================
// Rendering: Truth / Evaluation Tables
// ============================================================================
function renderTables(tables) {
  if (!tables || !tables.length) return '';
  return tables
    .map((tbl) => {
      const head = tbl.headers.map((h) => `<th>${h}</th>`).join('');
      const rows = tbl.rows
        .map((r) => {
          const rowClass =
            r.highlight === 'yes'
              ? 'row-highlight'
              : r.highlight === 'diff'
              ? 'row-diff'
              : '';
          const cells = r.cells
            .map((c) => {
              const cls = c === '1' ? 'val-1' : c === '0' ? 'val-0' : '';
              return `<td class="${cls}">${c}</td>`;
            })
            .join('');
          return `<tr class="${rowClass}">${cells}</tr>`;
        })
        .join('');
      return `
        <div class="table-block">
          <div class="table-caption">${tbl.caption}</div>
          <div class="table-wrap">
            <table class="zine-table">
              <thead><tr>${head}</tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      `;
    })
    .join('');
}

// ============================================================================
// Rendering: Single Problem Card
// ============================================================================
function renderProblemCard(p) {
  const mode = state.cardModes[p.id] || state.globalMode;
  const isRevealed = state.revealedAnswers.has(p.id);
  const isDone = state.doneIds.has(p.id);
  const diffClass = p.difficulty.toLowerCase();

  const stepsData = mode === 'brief' ? p.steps.brief : p.steps.detail;

  const questionItemsHtml = p.question.items
    ? `<ol class="question-sublist" style="list-style:none;padding-left:0;">${p.question.items
        .map((item) => `<li>${item}</li>`)
        .join('')}</ol>`
    : '';

  const formulasHtml = p.coreFormulas
    .map(
      (f) => `
      <div class="formula-item">
        <div class="formula-item-label">${f.label}</div>
        <div class="formula-math">${f.latex}</div>
        <div class="formula-note">${f.note}</div>
      </div>
    `
    )
    .join('');

  const stepsHtml = stepsData
    .map(
      (s, idx) => `
      <li class="step-item">
        <span class="step-num">${String(idx + 1).padStart(2, '0')}</span>
        <div class="step-content">
          <div class="step-heading">${s.heading}</div>
          <div class="step-body">${s.body}</div>
          ${s.tip ? `<div class="callout-tip"><strong>Catatan Pintar:</strong> ${s.tip}</div>` : ''}
        </div>
      </li>
    `
    )
    .join('');

  const answersHtml = p.finalAnswer
    .map(
      (a) => `
      <li class="answer-item">
        <span class="answer-part">${a.part}</span>
        <div>${a.text}</div>
      </li>
    `
    )
    .join('');

  return `
    <article class="problem-card problem-card--${p.accent} problem-card--${p.layout}" id="soal-${p.id}" data-problem-id="${p.id}">
      <header class="card-header">
        <div>
          <div class="card-tags">
            <span class="tag-id">SOAL ${p.id}</span>
            <span class="tag-diff tag-diff--${diffClass}">${p.difficulty}</span>
          </div>
          <h3 class="card-title">${p.title}</h3>
        </div>

        <div class="card-header-controls">
          <div class="card-mode-toggle" role="group" aria-label="Mode penjelasan soal ${p.id}">
            <button type="button" class="card-mode-btn ${mode === 'brief' ? 'is-active' : ''}" data-card-mode="brief" data-id="${p.id}">Ringkas</button>
            <button type="button" class="card-mode-btn ${mode === 'detail' ? 'is-active' : ''}" data-card-mode="detail" data-id="${p.id}">Detail</button>
          </div>
          <button type="button" class="btn-copy" data-copy-id="${p.id}" title="Salin rumus dan ringkasan jawaban">
            Salin Rumus
          </button>
          <button type="button" class="btn-done ${isDone ? 'is-done' : ''}" data-done-id="${p.id}" aria-pressed="${isDone}">
            ${isDone ? '✓ Paham' : 'Tandai Paham'}
          </button>
        </div>
      </header>

      <div class="card-body">
        <div class="card-top-grid">
          <!-- Question & Known/Asked -->
          <section>
            <span class="block-label">SOAL &amp; RINGKASAN</span>
            <p class="question-text">${p.question.intro}</p>
            ${questionItemsHtml}
            <div class="known-asked-grid">
              <div class="ka-box">
                <div class="ka-title">Diketahui</div>
                <ul>${p.knownAsked.known.map((k) => `<li>${k}</li>`).join('')}</ul>
              </div>
              <div class="ka-box">
                <div class="ka-title">Ditanyakan</div>
                <ul>${p.knownAsked.asked.map((k) => `<li>${k}</li>`).join('')}</ul>
              </div>
            </div>
          </section>

          <!-- Core Formula Panel -->
          <aside class="formula-panel">
            <span class="block-label block-label--formula">RUMUS INTI</span>
            <div class="formula-list">${formulasHtml}</div>
          </aside>
        </div>

        <!-- Step by Step -->
        <section class="steps-section">
          <span class="block-label block-label--steps">STEP BY STEP · MODE ${mode === 'brief' ? 'RINGKAS' : 'DETAIL'}</span>
          <ol class="steps-list">${stepsHtml}</ol>
          ${renderTables(p.tables)}
        </section>

        <!-- Final Answer Toggle -->
        <section class="answer-section">
          <div class="answer-bar">
            <span class="block-label block-label--answer" style="margin-bottom:0;">FINAL ANSWER</span>
            <button type="button" class="btn-reveal" data-reveal-id="${p.id}" aria-expanded="${isRevealed}">
              ${isRevealed ? 'Sembunyikan Jawaban Akhir' : 'Tampilkan Jawaban Akhir'}
            </button>
          </div>

          ${
            isRevealed
              ? `<div class="answer-drawer"><ul class="answer-list">${answersHtml}</ul></div>`
              : `<div class="answer-hidden-hint">Coba tulis jawabanmu dulu di kertas, lalu klik <strong>Tampilkan Jawaban Akhir</strong> untuk mencocokkan.</div>`
          }
        </section>
      </div>
    </article>
  `;
}

// ============================================================================
// Rendering: Feed
// ============================================================================
function renderFeed() {
  const filtered = PROBLEMS.filter((p) => {
    const secOk = state.section === 'ALL' || p.section === state.section;
    const diffOk = state.difficulty === 'ALL' || p.difficulty === state.difficulty;
    return secOk && diffOk;
  });

  if (filtered.length === 0) {
    feedEl.innerHTML = `
      <div class="empty-state">
        <p>Tidak ada soal yang cocok dengan kombinasi filter ini.</p>
        <button type="button" class="btn-outline" id="clearFiltersBtn">Tampilkan Semua Soal</button>
      </div>
    `;
    document.getElementById('clearFiltersBtn')?.addEventListener('click', () => {
      setSectionFilter('ALL');
      setDiffFilter('ALL');
    });
    return;
  }

  let html = '';
  let lastSection = null;

  for (const p of filtered) {
    if (p.section !== lastSection) {
      const sec = SECTIONS[p.section];
      html += `
        <div class="section-banner section-banner--${sec.accent}" id="bagian-${sec.id}">
          <div>
            <span class="section-kicker">${sec.kicker}</span>
            <h2 class="section-heading">${sec.title}</h2>
          </div>
          <span class="section-sub">${sec.subtitle}</span>
        </div>
      `;
      lastSection = p.section;
    }
    html += renderProblemCard(p);
  }

  feedEl.innerHTML = html;
  renderMath(feedEl);
}

// ============================================================================
// Filter & Control Updaters
// ============================================================================
function setSectionFilter(sec) {
  state.section = sec;
  document.querySelectorAll('[data-filter-section]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.filterSection === sec);
  });
  renderFeed();
}

function setDiffFilter(diff) {
  state.difficulty = diff;
  document.querySelectorAll('[data-filter-diff]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.filterDiff === diff);
  });
  renderFeed();
}

function setGlobalMode(mode) {
  state.globalMode = mode;
  state.cardModes = {}; // Reset individual overrides so global toggle applies cleanly
  document.querySelectorAll('[data-global-mode]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.globalMode === mode);
  });
  renderFeed();
  showToast(`Mode penjelasan: ${mode === 'brief' ? 'Ringkas (Review Cepat)' : 'Detail (Belajar dari Nol)'}`);
}

function toggleAllAnswers() {
  state.allRevealed = !state.allRevealed;
  if (state.allRevealed) {
    PROBLEMS.forEach((p) => state.revealedAnswers.add(p.id));
    toggleAllAnswersBtn.textContent = 'Sembunyikan Semua Jawaban';
    toggleAllAnswersBtn.setAttribute('aria-pressed', 'true');
  } else {
    state.revealedAnswers.clear();
    toggleAllAnswersBtn.textContent = 'Buka Semua Jawaban';
    toggleAllAnswersBtn.setAttribute('aria-pressed', 'false');
  }
  renderFeed();
}

// ============================================================================
// Event Wiring
// ============================================================================
function initEvents() {
  // Section filter buttons
  document.querySelectorAll('[data-filter-section]').forEach((btn) => {
    btn.addEventListener('click', () => setSectionFilter(btn.dataset.filterSection));
  });

  // Masthead quick section buttons
  document.querySelectorAll('[data-jump-section]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sec = btn.dataset.jumpSection;
      setSectionFilter(sec);
      setDiffFilter('ALL');
      document.getElementById(`bagian-${sec}`)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Difficulty filter buttons
  document.querySelectorAll('[data-filter-diff]').forEach((btn) => {
    btn.addEventListener('click', () => setDiffFilter(btn.dataset.filterDiff));
  });

  // Global mode toggle
  document.querySelectorAll('[data-global-mode]').forEach((btn) => {
    btn.addEventListener('click', () => setGlobalMode(btn.dataset.globalMode));
  });

  // Global reveal all answers
  toggleAllAnswersBtn.addEventListener('click', toggleAllAnswers);

  // Quick jump strip
  jumpStripEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-jump-id]');
    if (!btn) return;
    const id = btn.dataset.jumpId;
    const targetCard = document.getElementById(`soal-${id}`);
    if (!targetCard) {
      // Reset filters so the target problem becomes visible
      state.section = 'ALL';
      state.difficulty = 'ALL';
      document.querySelectorAll('[data-filter-section]').forEach((b) =>
        b.classList.toggle('is-active', b.dataset.filterSection === 'ALL')
      );
      document.querySelectorAll('[data-filter-diff]').forEach((b) =>
        b.classList.toggle('is-active', b.dataset.filterDiff === 'ALL')
      );
      renderFeed();
    }
    document.getElementById(`soal-${id}`)?.scrollIntoView({ behavior: 'smooth' });
  });

  // Delegated events inside problem feed
  feedEl.addEventListener('click', (e) => {
    // Per-card Ringkas/Detail toggle
    const modeBtn = e.target.closest('[data-card-mode]');
    if (modeBtn) {
      const id = modeBtn.dataset.id;
      const mode = modeBtn.dataset.cardMode;
      state.cardModes[id] = mode;
      const card = document.getElementById(`soal-${id}`);
      const problem = PROBLEMS.find((p) => p.id === id);
      if (card && problem) {
        card.outerHTML = renderProblemCard(problem);
        renderMath(document.getElementById(`soal-${id}`));
      }
      return;
    }

    // Reveal / Hide Final Answer
    const revealBtn = e.target.closest('[data-reveal-id]');
    if (revealBtn) {
      const id = revealBtn.dataset.revealId;
      if (state.revealedAnswers.has(id)) {
        state.revealedAnswers.delete(id);
      } else {
        state.revealedAnswers.add(id);
      }
      const card = document.getElementById(`soal-${id}`);
      const problem = PROBLEMS.find((p) => p.id === id);
      if (card && problem) {
        card.outerHTML = renderProblemCard(problem);
        renderMath(document.getElementById(`soal-${id}`));
      }
      return;
    }

    // Copy Formula / Notes
    const copyBtn = e.target.closest('[data-copy-id]');
    if (copyBtn) {
      const id = copyBtn.dataset.copyId;
      const problem = PROBLEMS.find((p) => p.id === id);
      if (problem) {
        copyToClipboard(problem.copyText, `Soal ${id}`);
      }
      return;
    }

    // Mark Done ("Tandai Paham")
    const doneBtn = e.target.closest('[data-done-id]');
    if (doneBtn) {
      const id = doneBtn.dataset.doneId;
      if (state.doneIds.has(id)) {
        state.doneIds.delete(id);
      } else {
        state.doneIds.add(id);
      }
      saveDoneIds();
      updateProgressUI();
      const card = document.getElementById(`soal-${id}`);
      const problem = PROBLEMS.find((p) => p.id === id);
      if (card && problem) {
        card.outerHTML = renderProblemCard(problem);
        renderMath(document.getElementById(`soal-${id}`));
      }
    }
  });

  // Footer controls
  document.getElementById('resetProgressBtn')?.addEventListener('click', () => {
    state.doneIds.clear();
    saveDoneIds();
    updateProgressUI();
    renderFeed();
    showToast('Progres belajar berhasil direset.');
  });

  document.getElementById('backToTopBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================================
// Bootstrap
// ============================================================================
function init() {
  initEvents();
  updateProgressUI();
  renderFeed();

  // Ensure KaTeX renders once deferred scripts finish loading
  window.addEventListener('load', () => {
    renderMath(document.body);
  });
}

init();
})();

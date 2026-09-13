/**
 * Result & Analytics Review Engine
 * Spider Radar Chart on Canvas, Performance Breakdown, Filterable Explanations
 */

class ResultEngine {
  constructor(app) {
    this.app = app;
    this.resultData = null;
    this.currentFilter = 'all'; // 'all' | 'incorrect' | 'flagged' | 'correct'
  }

  showResults(data) {
    this.resultData = data;
    this.currentFilter = 'all';
    this.render();
  }

  render() {
    const container = document.getElementById('result-view-container');
    if (!container || !this.resultData) return;

    const { attempt, detailed_results } = this.resultData;
    const lang = this.app.currentLanguage;
    const isId = lang === 'id';
    const isPassed = attempt.passed;

    const mins = Math.floor(attempt.time_spent_seconds / 60);
    const secs = attempt.time_spent_seconds % 60;
    const timeFormatted = `${mins}m ${secs}s`;

    container.innerHTML = `
      <div class="result-view container">
        <!-- Hero Summary Card -->
        <section class="result-hero ${isPassed ? 'passed' : 'failed'}">
          <div class="result-hero-left">
            <span class="result-status-badge ${isPassed ? 'passed' : 'failed'}">
              ${isPassed
                ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ${isId ? 'Lolos Standar Academy' : 'Academy Benchmark Achieved'}`
                : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ${isId ? 'Perlu Latihan Tambahan' : 'Needs More Practice'}`}
            </span>
            <h1 class="result-title">
              ${isPassed ? (isId ? 'Selamat, Hasil Sangat Memuaskan!' : 'Congratulations, Great Performance!') : (isId ? 'Evaluasi Hasil Simulasi' : 'Simulation Result Evaluation')}
            </h1>
            <p class="result-subtitle">
              ${isPassed 
                ? (isId ? 'Performa Anda telah melampaui standar kelulusan tes online Apple Developer Academy (75%+). Pertahankan kecepatan dan ketelitian Anda!' : 'Your score exceeds the Apple Developer Academy online test benchmark (75%+). Keep up the great pace and accuracy!')
                : (isId ? 'Skor Anda masih berada di bawah target benchmark (75%). Pelajari pembahasan detail di bawah untuk memperkuat konsep yang belum dikuasai.' : 'Your score is below the 75% target. Review the detailed explanations below to master challenging topics.')}
            </p>
            <div style="display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap;">
              <button class="btn btn-primary" id="btn-retake-exam">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                ${isId ? 'Ulangi Paket Ini' : 'Retake Package'}
              </button>
              <button class="btn btn-secondary" id="btn-portal-back">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                ${isId ? 'Pilih Paket Lain' : 'Select Another Package'}
              </button>
            </div>
          </div>

          <!-- Score Gauge Widget -->
          <div class="score-gauge-wrap">
            <span style="font-size: 0.8125rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">
              ${isId ? 'Akurasi Skor' : 'Total Score'}
            </span>
            <span class="score-main-value ${isPassed ? 'passed' : 'failed'}">
              ${attempt.score_percent}%
            </span>
            <span class="score-scaled-sub">
              ${attempt.correct_count} / ${attempt.total_questions} ${isId ? 'Soal Benar' : 'Correct'}
            </span>
            <span class="benchmark-target">
              Target: ≥ 75.0% (${Math.ceil(attempt.total_questions * 0.75)} ${isId ? 'soal' : 'qs'})
            </span>
          </div>
        </section>

        <!-- Metrics Grid -->
        <section class="result-metrics-grid">
          <div class="metric-card">
            <span class="metric-label">${isId ? 'Durasi Pengerjaan' : 'Time Elapsed'}</span>
            <span class="metric-val">${timeFormatted}</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">${isId ? 'Jawaban Benar' : 'Correct Answers'}</span>
            <span class="metric-val" style="color: var(--accent-green);">${attempt.correct_count}</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">${isId ? 'Jawaban Salah' : 'Incorrect Answers'}</span>
            <span class="metric-val" style="color: var(--accent-red);">${attempt.incorrect_count}</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">${isId ? 'Tidak Dijawab' : 'Unanswered'}</span>
            <span class="metric-val" style="color: var(--text-tertiary);">${attempt.unanswered_count}</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">${isId ? 'Pelanggaran Tab' : 'Tab Violations'}</span>
            <span class="metric-val" style="color: ${attempt.tab_switches > 0 ? 'var(--accent-amber)' : 'var(--accent-green)'};">
              ${attempt.tab_switches}
            </span>
          </div>
        </section>

        <!-- Analytics Breakdown & Spider Radar Chart -->
        <section class="analytics-section">
          <!-- Spider Radar Chart Card -->
          <div class="analytics-card">
            <h3 style="font-size: 1.125rem; font-weight: 700;">${isId ? 'Radar 5 Kompetensi' : '5-Pillar Competency Radar'}</h3>
            <div class="radar-canvas-wrap">
              <canvas id="competency-radar-canvas" data-dpr="2"></canvas>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-tertiary); text-align: center;">
              ${isId ? 'Garis putus-putus = benchmark kelulusan 75% per pilar kisi-kisi' : 'Dashed ring = 75% passing benchmark per domain'}
            </p>
          </div>

          <!-- Category Progress Bars Card -->
          <div class="analytics-card">
            <h3 style="font-size: 1.125rem; font-weight: 700;">${isId ? 'Rincian Nilai per Kategori' : 'Performance by Category'}</h3>
            <div class="category-bars-list" id="category-bars-container">
              <!-- Rendered dynamically -->
            </div>
          </div>
        </section>

        <!-- Question Review & Explanations Section -->
        <section class="review-section">
          <div class="section-header">
            <div>
              <h2 class="section-title">${isId ? 'Pembahasan Lengkap per Soal' : 'In-depth Question Review'}</h2>
              <p class="section-subtitle">${isId ? 'Analisis langkah penyelesaian dan kunci konsep' : 'Step-by-step logic, Swift code concepts, and explanations'}</p>
            </div>
          </div>

          <!-- Filter Tab Bar -->
          <div class="review-filter-bar">
            <button class="review-filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">
              ${isId ? 'Semua Soal' : 'All'} (${detailed_results.length})
            </button>
            <button class="review-filter-btn ${this.currentFilter === 'incorrect' ? 'active' : ''}" data-filter="incorrect">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ${isId ? 'Salah Saja' : 'Incorrect Only'} (${attempt.incorrect_count})
            </button>
            <button class="review-filter-btn ${this.currentFilter === 'flagged' ? 'active' : ''}" data-filter="flagged">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
              ${isId ? 'Ragu-ragu' : 'Flagged'} (${detailed_results.filter(q => q.is_flagged).length})
            </button>
            <button class="review-filter-btn ${this.currentFilter === 'correct' ? 'active' : ''}" data-filter="correct">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              ${isId ? 'Benar Saja' : 'Correct Only'} (${attempt.correct_count})
            </button>
          </div>

          <!-- Review List Cards -->
          <div class="review-cards-list" id="review-cards-container">
            <!-- Rendered by this.renderReviewCards() -->
          </div>
        </section>
      </div>
    `;

    this.renderCategoryBars(attempt.category_breakdown, isId);
    this.renderRadarChart(attempt.category_breakdown, isId);
    this.renderReviewCards();
    this.bindResultEvents();
  }

  renderCategoryBars(cats, isId) {
    const container = document.getElementById('category-bars-container');
    if (!container) return;

    let html = '';
    const catKeys = ['logic', 'comp_thinking', 'ai_math', 'swift', 'oop'];

    for (const key of catKeys) {
      const cat = cats[key];
      if (!cat) continue;
      const pct = cat.percentage;
      const name = isId ? cat.name_id : cat.name_en;

      html += `
        <div class="cat-bar-item">
          <div class="cat-bar-header">
            <span class="cat-bar-name">
              <span class="status-dot" style="background: ${this.getCategoryColor(key)};"></span>
              ${name}
            </span>
            <span class="cat-bar-stats">${cat.correct}/${cat.total} (${pct}%)</span>
          </div>
          <div class="cat-progress-track">
            <div class="cat-progress-fill ${key}" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  renderRadarChart(cats, isId) {
    const canvas = document.getElementById('competency-radar-canvas');
    if (!canvas) return;

    // HiDPI: render at devicePixelRatio, keep CSS size small
    const wrap = canvas.closest('.radar-canvas-wrap');
    const cssSize = Math.min(wrap ? wrap.clientWidth : 320, 340) || 320;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.width = cssSize + 'px';
    canvas.style.height = cssSize + 'px';
    canvas.width = Math.round(cssSize * dpr);
    canvas.height = Math.round(cssSize * dpr);

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const width = cssSize;
    const height = cssSize;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.max(60, cssSize * 0.32);

    ctx.clearRect(0, 0, width, height);

    // Theme-aware colors from CSS custom properties
    const styles = getComputedStyle(document.documentElement);
    const cssVar = (name, fallback) => (styles.getPropertyValue(name) || '').trim() || fallback;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const gridColor = isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';
    const labelColor = isLight ? '#6e6e73' : '#98989f';
    const axisBlue = cssVar('--accent-blue', '#0a84ff');

    const labels = [
      isId ? 'Logika' : 'Logic',
      isId ? 'Comp Think' : 'Comp Think',
      isId ? 'AI & Math' : 'AI & Math',
      'Swift',
      'OOP'
    ];

    const values = [
      (cats.logic?.percentage || 0) / 100,
      (cats.comp_thinking?.percentage || 0) / 100,
      (cats.ai_math?.percentage || 0) / 100,
      (cats.swift?.percentage || 0) / 100,
      (cats.oop?.percentage || 0) / 100
    ];

    const numAxes = 5;
    const angleStep = (Math.PI * 2) / numAxes;
    const axisPoint = (i, r) => {
      const angle = i * angleStep - Math.PI / 2;
      return [centerX + Math.cos(angle) * r, centerY + Math.sin(angle) * r];
    };

    // Concentric grid rings (25/50/75/100%)
    for (let r = 0.25; r <= 1.001; r += 0.25) {
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const [x, y] = axisPoint(i, radius * r);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Benchmark ring at 75% drawn dashed & slightly stronger
      if (Math.abs(r - 0.75) < 0.01) {
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = isLight ? 'rgba(0, 113, 227, 0.55)' : 'rgba(10, 132, 255, 0.65)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Spokes
    for (let i = 0; i < numAxes; i++) {
      const [x, y] = axisPoint(i, radius);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Labels (placed outside ring, aligned per position)
    ctx.fillStyle = labelColor;
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif';

    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const [x, y] = axisPoint(i, radius + 22);
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);

      ctx.textBaseline = 'middle';
      if (Math.abs(dx) < 0.01) {
        ctx.textAlign = 'center';
      } else if (dx > 0) {
        ctx.textAlign = 'left';
      } else {
        ctx.textAlign = 'right';
      }
      if (dy < -0.9) ctx.textBaseline = 'top';
      if (dy > 0.9) ctx.textBaseline = 'bottom';

      ctx.fillText(labels[i], x, y);
    }

    // User score polygon
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const val = Math.max(0.05, values[i]);
      const [x, y] = axisPoint(i, radius * val);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = isLight ? 'rgba(0, 113, 227, 0.18)' : 'rgba(10, 132, 255, 0.30)';
    ctx.fill();
    ctx.strokeStyle = axisBlue;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Vertex dots
    for (let i = 0; i < numAxes; i++) {
      const val = Math.max(0.05, values[i]);
      const [x, y] = axisPoint(i, radius * val);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = cssVar('--accent-cyan', '#64d2ff');
      ctx.fill();
      ctx.strokeStyle = isLight ? '#ffffff' : '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  renderReviewCards() {
    const container = document.getElementById('review-cards-container');
    if (!container || !this.resultData) return;

    const { detailed_results } = this.resultData;
    const lang = this.app.currentLanguage;
    const isId = lang === 'id';

    const filtered = detailed_results.filter(q => {
      if (this.currentFilter === 'incorrect') return q.status === 'incorrect';
      if (this.currentFilter === 'correct') return q.status === 'correct';
      if (this.currentFilter === 'flagged') return q.is_flagged;
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 48px 0; color: var(--text-tertiary);">
          <p>${isId ? 'Tidak ada soal dalam filter ini.' : 'No questions found under this filter.'}</p>
        </div>
      `;
      return;
    }

    let html = '';
    for (const q of filtered) {
      const isCorrect = q.is_correct;
      const isUnanswered = q.status === 'unanswered';
      const questionText = isId ? q.question_id : q.question_en;
      const options = isId ? q.options_id : q.options_en;
      const explanation = isId ? q.explanation_id : q.explanation_en;

      // Status pill
      let statusBadge = '';
      let cardBorderClass = '';
      if (isUnanswered) {
        statusBadge = `<span class="review-status-pill unanswered">${isId ? 'Tidak Dijawab' : 'Unanswered'}</span>`;
        cardBorderClass = 'unanswered';
      } else if (isCorrect) {
        statusBadge = `<span class="review-status-pill correct"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> ${isId ? 'Benar' : 'Correct'}</span>`;
        cardBorderClass = 'correct';
      } else {
        statusBadge = `<span class="review-status-pill incorrect"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> ${isId ? 'Salah' : 'Incorrect'}</span>`;
        cardBorderClass = 'incorrect';
      }

      // Visual / Code
      let visualHtml = '';
      if (q.visual_svg) {
        visualHtml = `<div class="visual-render-box">${q.visual_svg}</div>`;
      } else if (q.visual_matrix) {
        visualHtml = `<div class="visual-render-box"><div class="matrix-display">${q.visual_matrix}</div></div>`;
      }

      let codeHtml = '';
      if (q.code_snippet) {
        codeHtml = `<pre class="swift-code-block"><code>${this.escapeHtml(q.code_snippet)}</code></pre>`;
      }

      // Options review (Supports Text and Visual SVG Options)
      let optsHtml = '';
      if (q.options_svg && Object.keys(q.options_svg).length > 0) {
        optsHtml = '<div class="review-options-list is-visual-grid">';
        for (const key of ['A', 'B', 'C', 'D']) {
          const isUserChoice = q.user_answer === key;
          const isCorrectChoice = q.correct_answer === key;
          let optItemClass = '';
          let badge = '';

          if (isCorrectChoice) {
            optItemClass = 'is-correct';
            badge = `<span class="review-opt-badge correct-answer">${isId ? 'Kunci Benar' : 'Correct'}</span>`;
          } else if (isUserChoice && !isCorrect) {
            optItemClass = 'user-wrong';
            badge = `<span class="review-opt-badge your-answer">${isId ? 'Jawaban Anda' : 'Your Answer'}</span>`;
          }

          optsHtml += `
            <div class="review-opt-visual-item ${optItemClass}">
              <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <b>${key}.</b>
                ${badge}
              </div>
              <div class="opt-preview-box">
                ${q.options_svg[key] || ''}
              </div>
              ${options[key] ? `<span style="font-size: 0.75rem; color: var(--text-secondary);">${this.escapeHtml(options[key])}</span>` : ''}
            </div>
          `;
        }
        optsHtml += '</div>';
      } else {
        optsHtml = '<div class="review-options-list">';
        for (const key of ['A', 'B', 'C', 'D']) {
          const isUserChoice = q.user_answer === key;
          const isCorrectChoice = q.correct_answer === key;
          let optItemClass = '';
          let badge = '';

          if (isCorrectChoice) {
            optItemClass = 'is-correct';
            badge = `<span class="review-opt-badge correct-answer">${isId ? 'Kunci Benar' : 'Correct'}</span>`;
          } else if (isUserChoice && !isCorrect) {
            optItemClass = 'user-wrong';
            badge = `<span class="review-opt-badge your-answer">${isId ? 'Jawaban Anda' : 'Your Answer'}</span>`;
          }

          optsHtml += `
            <div class="review-opt-item ${optItemClass}">
              <div style="display: flex; align-items: center; gap: 10px;">
                <b>${key}.</b>
                <span>${this.escapeHtml(options[key] || '')}</span>
              </div>
              ${badge}
            </div>
          `;
        }
        optsHtml += '</div>';
      }

      let cleanQuestionText = questionText;
      if (q.code_snippet) {
        cleanQuestionText = cleanQuestionText.replace(/```[\s\S]*?```/g, '').trim();
      }

      html += `
        <article class="review-card ${cardBorderClass}">
          <div class="review-card-top">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="q-number-pill">${isId ? 'Soal' : 'Q'} #${q.number}</span>
              <span class="q-category-pill ${q.category}">${this.getCategoryName(q.category, lang)}</span>
              ${q.is_flagged ? `<span style="color: var(--accent-amber); font-weight: 700; font-size: 0.8125rem; display: inline-flex; align-items: center; gap: 4px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> ${isId ? 'Ragu' : 'Flagged'}</span>` : ''}
            </div>
            ${statusBadge}
          </div>

          <div style="font-size: 1.0625rem; line-height: 1.55; color: var(--text-primary);">
            ${this.escapeHtml(cleanQuestionText)}
          </div>

          ${visualHtml}
          ${codeHtml}
          ${optsHtml}

          <!-- In-depth Step-by-Step Explanation Box -->
          <div class="explanation-box">
            <div class="explanation-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span>${isId ? 'Pembahasan & Solusi Lengkap' : 'Detailed Solution & Concept'}</span>
            </div>
            <div class="explanation-body">
              ${this.escapeHtml(explanation)}
            </div>
          </div>
        </article>
      `;
    }

    container.innerHTML = html;
  }

  bindResultEvents() {
    const isId = this.app.currentLanguage === 'id';

    document.getElementById('btn-retake-exam')?.addEventListener('click', () => {
      const pkgId = this.resultData?.attempt?.package_id || 1;
      this.app.startExam(pkgId, 'exam');
    });

    document.getElementById('btn-portal-back')?.addEventListener('click', () => {
      this.app.navigate('portal');
    });

    // Filter tabs
    document.querySelectorAll('.review-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.review-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter');
        this.renderReviewCards();
      });
    });
  }

  getCategoryColor(cat) {
    const colors = {
      logic: '#0A84FF',
      comp_thinking: '#BF5AF2',
      ai_math: '#64D2FF',
      swift: '#FF9F0A',
      oop: '#30D158'
    };
    return colors[cat] || '#0A84FF';
  }

  getCategoryName(cat, lang) {
    const map = {
      logic: { id: 'Logika & Penalaran', en: 'Logic & Reasoning' },
      comp_thinking: { id: 'Computational Thinking', en: 'Computational Thinking' },
      ai_math: { id: 'Konsep AI & Math', en: 'AI Concepts & Math' },
      swift: { id: 'Dasar Swift', en: 'Swift Basics' },
      oop: { id: 'OOP & Architecture', en: 'OOP & Architecture' }
    };
    return map[cat] ? (lang === 'id' ? map[cat].id : map[cat].en) : cat;
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.ResultEngine = ResultEngine;

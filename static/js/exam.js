/**
 * Exam Simulation Engine
 * Timer (120m), Webcam/Audio Proctoring, Anti-Cheat Blur Detection, Interactive Nav
 */

class ExamEngine {
  constructor(app) {
    this.app = app;
    this.packageData = null;
    this.currentIndex = 0;
    this.answers = {}; // { "1": "A", "2": "C" }
    this.flags = new Set(); // Set of question numbers
    this.mode = 'exam';
    this.totalSeconds = 120 * 60; // 120 minutes
    this.secondsRemaining = this.totalSeconds;
    this.timerInterval = null;
    this.tabSwitches = 0;
    this.mediaStream = null;
    this.audioContext = null;
    this.analyser = null;
    this.isSubmitting = false;
    this.micSimInterval = null;
    this.scratchpad = null;
  }

  async start(pkgId, mode = 'exam') {
    this.mode = mode;
    this.currentIndex = 0;
    this.answers = {};
    this.flags = new Set();
    this.tabSwitches = 0;
    this.isSubmitting = false;
    this.secondsRemaining = this.totalSeconds;

    try {
      const res = await fetch(`/api/package/${pkgId}?mode=${mode}`);
      if (!res.ok) throw new Error('Gagal memuat paket soal');
      this.packageData = await res.json();
    } catch (err) {
      // Restore any start buttons still in loading state, then report
      document.querySelectorAll('.btn-start-exam').forEach(b => btnLoading(b, false));
      await window.GlassDialog.show({
        title: 'Gagal Memuat Paket',
        text: err.message + (this.app.currentLanguage === 'id' ? '. Periksa koneksi server Anda lalu coba lagi.' : '. Check your server connection and try again.'),
        icon: 'danger',
        confirmText: this.app.currentLanguage === 'id' ? 'Mengerti' : 'Got it'
      });
      this.app.navigate('portal');
      return;
    }

    // Init Scratchpad
    if (!this.scratchpad && window.Scratchpad) {
      this.scratchpad = new window.Scratchpad();
    }

    // Stop the skeleton stage animation once real content is rendering
    if (this.app._skeletonStageInterval) {
      clearInterval(this.app._skeletonStageInterval);
      this.app._skeletonStageInterval = null;
    }

    this.renderExamView();
    this.initTimer();
    this.initProctoring();
    this.initAntiCheating();
    this.bindKeyboardShortcuts();
  }

  renderExamView() {
    const pkg = this.packageData;
    const lang = this.app.currentLanguage;
    const isId = lang === 'id';

    const examContainer = document.getElementById('exam-view-container');
    examContainer.innerHTML = `
      <div class="exam-view">
        <!-- Exam Header -->
        <header class="exam-header">
          <div class="exam-header-content">
            <div class="exam-header-left">
              <button class="btn btn-ghost btn-sm" id="btn-exit-exam" title="${isId ? 'Kembali ke Portal' : 'Exit to Portal'}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <div class="exam-pkg-info">
                <span class="exam-pkg-title">${isId ? pkg.title_id : pkg.title_en}</span>
                <span class="exam-mode-tag">
                  <span class="status-dot"></span>
                  ${this.mode === 'exam' ? (isId ? 'Simulasi Ujian Realistis' : 'Realistic Exam Mode') : (isId ? 'Mode Latihan' : 'Practice Mode')}
                </span>
              </div>
            </div>

            <!-- Timer -->
            <div class="timer-container" id="exam-timer-box">
              <svg class="timer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span class="timer-digits" id="exam-timer-digits">02:00:00</span>
            </div>

            <!-- Right Controls: Webcam PIP, Scratchpad, Submit -->
            <div class="exam-header-right" style="display: flex; align-items: center; gap: 12px;">
              <!-- Webcam PIP -->
              <div class="proctor-pip" title="${isId ? 'Monitor Kamera & Mikrofon' : 'Camera & Mic Monitor'}">
                <div class="proctor-video-wrap">
                  <video id="proctor-cam-feed" class="proctor-video" autoplay muted playsinline></video>
                </div>
                <span class="proctor-status-text">
                  <span class="status-dot active-mic" id="proctor-live-indicator"></span>
                  <span class="hide-mobile" id="proctor-live-label">REC</span>
                </span>
              </div>

              <!-- Liquid Glass Scratchpad Button -->
              <button class="liquid-glass-btn btn-sm" id="btn-open-scratchpad" title="${isId ? 'Papan Coretan' : 'Scratchpad'}">
                <div class="liquid-glass-glare"></div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <span class="hide-mobile">${isId ? 'Papan Coret' : 'Scratchpad'}</span>
              </button>

              <!-- Liquid Glass Language Switcher -->
              <div class="liquid-glass-switcher" id="exam-lang-switcher" data-active="${lang}" title="Switch Language">
                <div class="liquid-glass-glare"></div>
                <div class="liquid-glass-pill"></div>
                <button class="liquid-glass-item ${isId ? 'active' : ''}" data-lang="id">
                  <span class="liquid-glass-text">ID</span>
                </button>
                <button class="liquid-glass-item ${!isId ? 'active' : ''}" data-lang="en">
                  <span class="liquid-glass-text">EN</span>
                </button>
              </div>

              <!-- Liquid Glass Horizontal Theme Pill Switcher -->
              <div class="liquid-glass-switcher theme-pill-switcher" id="exam-theme-switcher" data-active="${this.app.currentTheme}" title="Toggle Dark/Light Mode">
                <div class="liquid-glass-glare"></div>
                <div class="liquid-glass-pill" id="exam-theme-pill"></div>
                <button class="liquid-glass-item ${this.app.currentTheme === 'dark' ? 'active' : ''}" data-theme="dark" title="Dark Mode">
                  <span class="liquid-glass-text" style="display: flex; align-items: center; gap: 4px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  </span>
                </button>
                <button class="liquid-glass-item ${this.app.currentTheme === 'light' ? 'active' : ''}" data-theme="light" title="Light Mode">
                  <span class="liquid-glass-text" style="display: flex; align-items: center; gap: 4px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  </span>
                </button>
              </div>

              <!-- Submit Button -->
              <button class="btn btn-primary btn-sm" id="btn-exam-finish">
                ${isId ? 'Selesaikan Ujian' : 'Finish Exam'}
              </button>
            </div>
          </div>
        </header>

        <!-- Main Exam Area -->
        <main class="exam-layout">
          <!-- Left Question Pane -->
          <section class="question-pane" id="active-question-pane">
            <!-- Rendered by this.renderQuestion() -->
          </section>

          <!-- Right Sidebar Palette -->
          <aside class="palette-pane" id="exam-palette-pane">
            <div class="palette-title">
              <span>${isId ? 'Daftar Nomor Soal' : 'Question Palette'}</span>
              <span class="palette-progress-info" id="palette-progress-label">0/${this.packageData.total_questions}</span>
            </div>

            <div class="palette-grid" id="palette-grid-container">
              <!-- Rendered by this.renderPalette() -->
            </div>

            <div class="palette-legend">
              <div class="legend-row">
                <span class="legend-badge answered"></span>
                <span>${isId ? 'Sudah Dijawab' : 'Answered'}</span>
              </div>
              <div class="legend-row">
                <span class="legend-badge flagged"></span>
                <span>${isId ? 'Ragu-ragu' : 'Flagged for Review'}</span>
              </div>
              <div class="legend-row">
                <span class="legend-badge unanswered"></span>
                <span>${isId ? 'Belum Dijawab' : 'Unanswered'}</span>
              </div>
            </div>

            <!-- Proctor Live Status Box -->
            <div class="proctor-monitor-box">
              <span class="proctor-monitor-title">${isId ? 'Status Pengawasan' : 'Proctoring Monitor'}</span>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
                  <span>Mic Input</span>
                  <span id="mic-level-label">Normal</span>
                </div>
                <div class="mic-meter-bar">
                  <div class="mic-meter-fill" id="mic-meter-fill"></div>
                </div>
              </div>
              <div class="strike-counter">
                <span>${isId ? 'Peringatan Tab' : 'Tab Switch Count'}:</span>
                <span class="strike-val" id="strike-val-display">0 / 3</span>
              </div>
            </div>
          </aside>
        </main>
      </div>

      <!-- Mobile Palette Floating Toggle -->
      <button class="btn btn-primary mobile-palette-toggle" id="btn-mobile-palette-toggle">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span id="mobile-palette-pill">1/${this.packageData.total_questions}</span>
      </button>

      <!-- Submit Confirmation Modal -->
      <div class="modal-overlay" id="submit-confirm-modal">
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title">${isId ? 'Konfirmasi Selesai Ujian' : 'Submit Exam Confirmation'}</h3>
            <button class="btn btn-ghost btn-sm" id="btn-close-submit-modal" aria-label="Tutup">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="modal-body" id="submit-summary-body">
            <!-- Dynamic stats -->
          </div>
          <div class="modal-actions">
            <button class="btn btn-secondary" id="btn-cancel-submit">${isId ? 'Lanjutkan Mengerjakan' : 'Continue Test'}</button>
            <button class="btn btn-primary" id="btn-confirm-submit">${isId ? 'Kirim Jawaban Sekarang' : 'Submit Now'}</button>
          </div>
        </div>
      </div>

      <!-- Anti-Cheat Violation Warning Modal -->
      <div class="modal-overlay" id="anticheat-warning-modal">
        <div class="modal-box" style="border-color: var(--accent-amber);">
          <div class="modal-header">
            <h3 class="modal-title" style="color: var(--accent-amber); display: flex; align-items: center; gap: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              ${isId ? 'Peringatan Anti-Cheating' : 'Anti-Cheating Alert'}
            </h3>
          </div>
          <div class="modal-body">
            <p>${isId ? 'Anda terdeteksi berpindah tab atau meminimalkan jendela ujian. Selama simulasi Apple Developer Academy, aktivitas browser Anda diawasi penuh oleh sistem pengawasan terpadu.' : 'You were detected switching tabs or minimizing the exam window. During the Apple Developer Academy simulation, your browser activity is strictly monitored.'}</p>
            <p style="margin-top: 12px; font-weight: 600; color: var(--text-primary);">${isId ? 'Perpindahan tab tercatat di laporan akhir Anda.' : 'Tab switches are recorded in your final performance report.'}</p>
          </div>
          <div class="modal-actions">
            <button class="btn btn-primary" id="btn-ack-anticheat">${isId ? 'Saya Mengerti, Kembali Ujian' : 'I Understand, Resume Test'}</button>
          </div>
        </div>
      </div>
    `;

    this.bindViewEvents();
    this.renderQuestion();
    this.renderPalette();
  }

  bindViewEvents() {
    const isId = this.app.currentLanguage === 'id';

    // Exit
    document.getElementById('btn-exit-exam')?.addEventListener('click', async () => {
      const isIdL = this.app.currentLanguage === 'id';
      const confirmed = await window.GlassDialog.show({
        title: isIdL ? 'Keluar dari Ujian?' : 'Leave Exam?',
        text: isIdL
          ? 'Progres pengerjaan yang belum disubmit akan hilang. Yakin ingin keluar?'
          : 'Unsubmitted progress will be lost. Are you sure you want to leave?',
        icon: 'warning',
        confirmText: isIdL ? 'Ya, Keluar' : 'Yes, Leave',
        cancelText: isIdL ? 'Lanjutkan Ujian' : 'Continue Exam',
        confirmType: 'danger'
      });
      if (confirmed) {
        this.cleanup();
        this.app.navigate('portal');
      }
    });

    // Scratchpad
    document.getElementById('btn-open-scratchpad')?.addEventListener('click', () => {
      if (this.scratchpad) this.scratchpad.open();
    });

    // Language Switcher in Exam Header (Liquid Glass)
    document.querySelectorAll('#exam-lang-switcher .liquid-glass-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang && lang !== this.app.currentLanguage) {
          this.app.setLanguage(lang);
          this.renderExamView();
        }
      });
    });

    // Finish / Submit Button
    document.getElementById('btn-exam-finish')?.addEventListener('click', () => {
      this.showSubmitModal();
    });

    // Submit Modal buttons
    document.getElementById('btn-close-submit-modal')?.addEventListener('click', () => {
      document.getElementById('submit-confirm-modal')?.classList.remove('active');
    });
    document.getElementById('btn-cancel-submit')?.addEventListener('click', () => {
      document.getElementById('submit-confirm-modal')?.classList.remove('active');
    });
    document.getElementById('btn-confirm-submit')?.addEventListener('click', async () => {
      const confirmBtn = document.getElementById('btn-confirm-submit');
      btnLoading(confirmBtn, true);
      try {
        await this.submit();
      } catch (e) {
        btnLoading(confirmBtn, false);
        const isIdS = this.app.currentLanguage === 'id';
        window.GlassDialog.show({
          title: isIdS ? 'Gagal Mengirim' : 'Submission Failed',
          text: e.message || (isIdS ? 'Terjadi kesalahan jaringan saat mengirim jawaban.' : 'A network error occurred while submitting your answers.'),
          icon: 'danger',
          confirmText: isIdS ? 'Coba Lagi' : 'Retry'
        });
      }
    });

    // Mobile Palette Toggle
    const mobileBtn = document.getElementById('btn-mobile-palette-toggle');
    const palettePane = document.getElementById('exam-palette-pane');
    mobileBtn?.addEventListener('click', () => {
      palettePane?.classList.toggle('mobile-open');
    });

    // Anti cheat modal dismiss
    document.getElementById('btn-ack-anticheat')?.addEventListener('click', () => {
      document.getElementById('anticheat-warning-modal')?.classList.remove('active');
    });
  }

  renderQuestion() {
    const q = this.packageData.questions[this.currentIndex];
    const lang = this.app.currentLanguage;
    const isId = lang === 'id';
    const qNumber = q.number;
    const currentAns = this.answers[String(qNumber)] || null;
    const isFlagged = this.flags.has(qNumber);

    const questionText = isId ? q.question_id : q.question_en;
    const options = isId ? q.options_id : q.options_en;

    const pane = document.getElementById('active-question-pane');
    if (!pane) return;

    // Build visual element HTML if available
    let visualHtml = '';
    if (q.visual_svg) {
      visualHtml = `<div class="visual-render-box">${q.visual_svg}</div>`;
    } else if (q.visual_matrix) {
      visualHtml = `<div class="visual-render-box"><div class="matrix-display">${q.visual_matrix}</div></div>`;
    }

    // Build Swift code snippet if available
    let codeHtml = '';
    if (q.code_snippet) {
      codeHtml = `<pre class="swift-code-block"><code>${this.escapeHtml(q.code_snippet)}</code></pre>`;
    }

    // Options HTML (Supports both Text and Visual SVG Option Modes)
    let optionsHtml = '';
    if (q.options_svg && Object.keys(q.options_svg).length > 0) {
      optionsHtml = '<div class="options-list is-visual-grid">';
      for (const key of ['A', 'B', 'C', 'D']) {
        const optSvg = q.options_svg[key] || '';
        const optText = options[key] || '';
        const isSelected = currentAns === key;
        optionsHtml += `
          <div class="option-card visual-option ${isSelected ? 'selected' : ''}" data-key="${key}">
            <div class="opt-visual-header">
              <div class="opt-radio-key">${key}</div>
            </div>
            <div class="opt-visual-preview">
              ${optSvg}
            </div>
            ${optText ? `<div class="opt-visual-caption">${this.escapeHtml(optText)}</div>` : ''}
          </div>
        `;
      }
      optionsHtml += '</div>';
    } else {
      optionsHtml = '<div class="options-list">';
      for (const key of ['A', 'B', 'C', 'D']) {
        const optText = options[key] || '';
        const isSelected = currentAns === key;
        optionsHtml += `
          <div class="option-card ${isSelected ? 'selected' : ''}" data-key="${key}">
            <div class="opt-radio-key">${key}</div>
            <div class="opt-text">${this.escapeHtml(optText)}</div>
          </div>
        `;
      }
      optionsHtml += '</div>';
    }

    let cleanQuestionText = questionText;
    if (q.code_snippet) {
      cleanQuestionText = cleanQuestionText.replace(/```[\s\S]*?```/g, '').trim();
    }

    pane.innerHTML = `
      <div class="question-top-bar">
        <div class="question-meta-group">
          <span class="q-number-pill">${isId ? 'Soal No.' : 'Question'} ${qNumber} / ${this.packageData.total_questions}</span>
          <span class="q-category-pill ${q.category}">
            ${this.getCategoryName(q.category, lang)}
          </span>
          <span class="brand-badge" style="font-size: 0.6875rem;">${q.difficulty || 'Standard'}</span>
        </div>
        <button class="flag-toggle-btn ${isFlagged ? 'flagged' : ''}" id="btn-flag-toggle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFlagged ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            <span>${isFlagged ? (isId ? 'Ragu-ragu (Ditandai)' : 'Flagged') : (isId ? 'Tandai Ragu' : 'Flag Question')}</span>
          </button>
      </div>

      <div class="question-body">
        ${this.escapeHtml(cleanQuestionText)}
      </div>

      ${visualHtml}
      ${codeHtml}
      ${optionsHtml}

      <div class="question-nav-bar">
        <button class="btn btn-secondary" id="btn-prev-q" ${this.currentIndex === 0 ? 'disabled style="opacity:0.5"' : ''}>
          ← ${isId ? 'Sebelumnya' : 'Previous'}
        </button>
        
        <div style="display: flex; gap: 8px;">
          ${currentAns ? `<button class="btn btn-ghost btn-sm" id="btn-clear-choice" style="color: var(--accent-red);">${isId ? 'Hapus Jawaban' : 'Clear Choice'}</button>` : ''}
        </div>

        <button class="btn btn-primary" id="btn-next-q">
          ${this.currentIndex === this.packageData.total_questions - 1 ? (isId ? 'Selesai' : 'Finish') : (isId ? 'Selanjutnya' : 'Next')} →
        </button>
      </div>
    `;

    // Bind Question Events
    pane.querySelectorAll('.option-card').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-key');
        this.selectAnswer(qNumber, key);
      });
    });

    document.getElementById('btn-flag-toggle')?.addEventListener('click', () => {
      this.toggleFlag(qNumber);
    });

    document.getElementById('btn-clear-choice')?.addEventListener('click', () => {
      this.clearAnswer(qNumber);
    });

    document.getElementById('btn-prev-q')?.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.renderQuestion();
        this.renderPalette();
      }
    });

    document.getElementById('btn-next-q')?.addEventListener('click', () => {
      if (this.currentIndex < this.packageData.total_questions - 1) {
        this.currentIndex++;
        this.renderQuestion();
        this.renderPalette();
      } else {
        this.showSubmitModal();
      }
    });

    // Update Mobile Pill
    const mobilePill = document.getElementById('mobile-palette-pill');
    if (mobilePill) {
      mobilePill.textContent = `${qNumber}/${this.packageData.total_questions}`;
    }
  }

  renderPalette() {
    const container = document.getElementById('palette-grid-container');
    if (!container || !this.packageData) return;

    let html = '';
    const total = this.packageData.total_questions;
    let answeredCount = 0;

    for (let i = 0; i < total; i++) {
      const qNum = i + 1;
      const isAnswered = this.answers[String(qNum)] !== undefined && this.answers[String(qNum)] !== '';
      const isFlagged = this.flags.has(qNum);
      const isCurrent = i === this.currentIndex;

      if (isAnswered) answeredCount++;

      let statusClass = '';
      if (isFlagged) {
        statusClass = 'flagged';
      } else if (isAnswered) {
        statusClass = 'answered';
      }

      if (isCurrent) {
        statusClass += ' current';
      }

      html += `
        <button class="palette-btn ${statusClass}" data-index="${i}">
          ${qNum}
        </button>
      `;
    }

    container.innerHTML = html;

    const progressLabel = document.getElementById('palette-progress-label');
    if (progressLabel) {
      progressLabel.textContent = `${answeredCount}/${total}`;
    }

    container.querySelectorAll('.palette-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        this.currentIndex = idx;
        this.renderQuestion();
        this.renderPalette();

        // Close mobile drawer if open
        document.getElementById('exam-palette-pane')?.classList.remove('mobile-open');
      });
    });
  }

  selectAnswer(qNumber, key) {
    this.answers[String(qNumber)] = key;
    this.renderQuestion();
    this.renderPalette();
  }

  clearAnswer(qNumber) {
    delete this.answers[String(qNumber)];
    this.renderQuestion();
    this.renderPalette();
  }

  toggleFlag(qNumber) {
    if (this.flags.has(qNumber)) {
      this.flags.delete(qNumber);
    } else {
      this.flags.add(qNumber);
    }
    this.renderQuestion();
    this.renderPalette();
  }

  initTimer() {
    this.updateTimerDisplay();
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(async () => {
      this.secondsRemaining--;
      this.updateTimerDisplay();

      if (this.secondsRemaining <= 0) {
        clearInterval(this.timerInterval);
        const isIdT = this.app.currentLanguage === 'id';
        // Auto-submit, then notify via glass dialog on the result page
        try { await this.submit(); } catch (e) { console.error(e); }
        window.GlassDialog.show({
          title: isIdT ? 'Waktu Habis' : 'Time Is Up',
          text: isIdT
            ? 'Durasi 120 menit telah berakhir. Jawaban Anda otomatis dikirim dan dinilai.'
            : 'The 120-minute duration has ended. Your answers were submitted automatically.',
          icon: 'info',
          confirmText: isIdT ? 'Lihat Hasil' : 'View Results'
        });
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const hours = Math.floor(this.secondsRemaining / 3600);
    const minutes = Math.floor((this.secondsRemaining % 3600) / 60);
    const seconds = this.secondsRemaining % 60;

    const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const digitsEl = document.getElementById('exam-timer-digits');
    const boxEl = document.getElementById('exam-timer-box');

    if (digitsEl) digitsEl.textContent = formatted;

    if (boxEl) {
      if (this.secondsRemaining < 180) { // < 3 mins
        boxEl.className = 'timer-container danger';
      } else if (this.secondsRemaining < 600) { // < 10 mins
        boxEl.className = 'timer-container warning';
      } else {
        boxEl.className = 'timer-container';
      }
    }
  }

  async initProctoring() {
    const videoEl = document.getElementById('proctor-cam-feed');
    const liveLabel = document.getElementById('proctor-live-label');
    const liveDot = document.getElementById('proctor-live-indicator');
    const setInactive = () => {
      if (liveLabel) liveLabel.textContent = 'OFF';
      if (liveDot) liveDot.classList.remove('active-mic');
    };
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoEl) {
          videoEl.srcObject = this.mediaStream;
        }
        this.initAudioAnalyser(this.mediaStream);
      } else {
        setInactive();
        this.startSimulatedProctoring(videoEl);
      }
    } catch (e) {
      console.warn('WebCam/Mic denied or unavailable. Using simulated proctoring feed.');
      setInactive();
      this.startSimulatedProctoring(videoEl);
    }
  }

  startSimulatedProctoring(videoEl) {
    // Generate placeholder feed when real camera is unavailable
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');

    const renderVirtual = () => {
      ctx.fillStyle = '#10131A';
      ctx.fillRect(0, 0, 160, 120);

      // Neutral camera-off glyph
      ctx.strokeStyle = '#686870';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 38);
      ctx.lineTo(100, 38);
      ctx.lineTo(112, 50);
      ctx.lineTo(112, 82);
      ctx.lineTo(100, 94);
      ctx.lineTo(60, 94);
      ctx.lineTo(48, 82);
      ctx.lineTo(48, 50);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(58, 40);
      ctx.lineTo(102, 92);
      ctx.stroke();

      ctx.fillStyle = '#98989F';
      ctx.font = '9px monospace';
      ctx.fillText('CAMERA OFF', 48, 108);
      ctx.fillText('PROCTOR INACTIVE', 28, 118);

      if (videoEl && videoEl.srcObject == null) {
        try {
          videoEl.srcObject = canvas.captureStream(15);
        } catch(e) {}
      }
    };

    setInterval(renderVirtual, 100);

    // Simulated Mic Fluctuations
    if (this.micSimInterval) clearInterval(this.micSimInterval);
    this.micSimInterval = setInterval(() => {
      const micFill = document.getElementById('mic-meter-fill');
      if (micFill) {
        const rand = 15 + Math.random() * 35;
        micFill.style.width = `${rand}%`;
      }
    }, 300);
  }

  initAudioAnalyser(stream) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      source.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudio = () => {
        if (!this.analyser) return;
        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        const percent = Math.min(100, Math.max(5, (avg / 128) * 100));

        const fillEl = document.getElementById('mic-meter-fill');
        if (fillEl) {
          fillEl.style.width = `${percent}%`;
        }

        requestAnimationFrame(checkAudio);
      };
      checkAudio();
    } catch (e) {
      console.warn('Audio context error:', e);
    }
  }

  initAntiCheating() {
    const handleViolation = () => {
      if (this.isSubmitting) return;
      this.tabSwitches++;
      const strikeDisplay = document.getElementById('strike-val-display');
      if (strikeDisplay) {
        strikeDisplay.textContent = `${this.tabSwitches} / 3`;
        strikeDisplay.className = this.tabSwitches >= 3 ? 'strike-val danger' : 'strike-val warning';
      }

      this.app.showToast(
        this.app.currentLanguage === 'id'
          ? `Peringatan: Anda keluar dari layar ujian! (Pelanggaran ke-${this.tabSwitches})`
          : `Warning: Tab switch detected! (Violation #${this.tabSwitches})`,
        'warning'
      );

      // Show modal on strike >= 2
      if (this.tabSwitches >= 2) {
        document.getElementById('anticheat-warning-modal')?.classList.add('active');
      }
    };

    window.addEventListener('blur', handleViolation);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        handleViolation();
      }
    });
  }

  bindKeyboardShortcuts() {
    this.keyHandler = (e) => {
      if (this.scratchpad && this.scratchpad.modal.classList.contains('active')) return;
      if (document.getElementById('submit-confirm-modal')?.classList.contains('active')) return;

      const qNumber = this.packageData?.questions[this.currentIndex]?.number;
      if (!qNumber) return;

      if (e.key === '1' || e.key.toLowerCase() === 'a') {
        this.selectAnswer(qNumber, 'A');
      } else if (e.key === '2' || e.key.toLowerCase() === 'b') {
        this.selectAnswer(qNumber, 'B');
      } else if (e.key === '3' || e.key.toLowerCase() === 'c') {
        this.selectAnswer(qNumber, 'C');
      } else if (e.key === '4' || e.key.toLowerCase() === 'd') {
        this.selectAnswer(qNumber, 'D');
      } else if (e.key.toLowerCase() === 'f') {
        this.toggleFlag(qNumber);
      } else if (e.key === 'ArrowLeft') {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.renderQuestion();
          this.renderPalette();
        }
      } else if (e.key === 'ArrowRight') {
        if (this.currentIndex < this.packageData.total_questions - 1) {
          this.currentIndex++;
          this.renderQuestion();
          this.renderPalette();
        }
      }
    };

    window.addEventListener('keydown', this.keyHandler);
  }

  showSubmitModal() {
    const total = this.packageData.total_questions;
    let answered = 0;
    for (let i = 1; i <= total; i++) {
      if (this.answers[String(i)] !== undefined && this.answers[String(i)] !== '') answered++;
    }
    const unanswered = total - answered;
    const flagged = this.flags.size;
    const isId = this.app.currentLanguage === 'id';

    const body = document.getElementById('submit-summary-body');
    if (body) {
      body.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div class="stat-box" style="padding: 14px; text-align: center;">
            <span style="font-size: 0.75rem; color: var(--accent-green); font-weight: 600;">${isId ? 'Sudah Dijawab' : 'Answered'}</span>
            <span style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">${answered}</span>
          </div>
          <div class="stat-box" style="padding: 14px; text-align: center;">
            <span style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 600;">${isId ? 'Ragu-ragu' : 'Flagged'}</span>
            <span style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">${flagged}</span>
          </div>
          <div class="stat-box" style="padding: 14px; text-align: center;">
            <span style="font-size: 0.75rem; color: var(--accent-red); font-weight: 600;">${isId ? 'Belum Dijawab' : 'Unanswered'}</span>
            <span style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">${unanswered}</span>
          </div>
        </div>
        <p>${unanswered > 0 ? (isId ? `Terdapat <b>${unanswered} soal</b> yang belum dijawab. Apakah Anda yakin ingin menyelesaikan ujian sekarang?` : `There are <b>${unanswered} unanswered questions</b>. Are you sure you want to finish now?`) : (isId ? 'Semua soal telah dijawab. Klik tombol di bawah untuk melihat hasil & pembahasan lengkap.' : 'All questions answered. Click below to view your results and in-depth review.')}</p>
      `;
    }

    document.getElementById('submit-confirm-modal')?.classList.add('active');
  }

  async submit() {
    this.isSubmitting = true;
    document.getElementById('submit-confirm-modal')?.classList.remove('active');

    const timeSpent = this.totalSeconds - this.secondsRemaining;
    const payload = {
      package_id: this.packageData.id,
      mode: this.mode,
      answers: this.answers,
      flags: Array.from(this.flags),
      time_spent_seconds: timeSpent,
      tab_switches: this.tabSwitches,
      language: this.app.currentLanguage
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Gagal mengirimkan ujian');
      const data = await res.json();
      
      this.cleanup();
      this.app.resultEngine.showResults(data);
      this.app.navigate('result');
    } catch (err) {
      alert('Submit error: ' + err.message);
      this.isSubmitting = false;
    }
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

  cleanup() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.micSimInterval) clearInterval(this.micSimInterval);
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
    }
  }
}

window.ExamEngine = ExamEngine;

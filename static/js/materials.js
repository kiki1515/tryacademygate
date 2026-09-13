/**
 * Study Materials & Exam Guide Hub (Modul Materi & Panduan Kisi-Kisi Lengkap)
 * Comprehensive, in-depth curriculum covering all 5 official competencies for Apple Developer Academy Online Test.
 * Clean VisionOS Glassmorphism design without AI slop / colored left-border stripes.
 */

class MaterialsHub {
  constructor(app) {
    this.app = app;
    this.currentTab = 'logic'; // 'logic' | 'comp_thinking' | 'ai_math' | 'swift' | 'oop'
  }

  setTab(tab) {
    this.currentTab = tab;
    this.render();
  }

  render() {
    const container = document.getElementById('materials-view-container');
    if (!container) return;

    const lang = this.app.currentLanguage;
    const isId = lang === 'id';

    const tabs = [
      { id: 'logic', name_id: 'Logika & Figural CPNS', name_en: 'Logic & Spatial Reasoning' },
      { id: 'comp_thinking', name_id: 'Computational Thinking', name_en: 'Computational Thinking' },
      { id: 'ai_math', name_id: 'Konsep AI & Matematika', name_en: 'AI Concepts & Linear Algebra' },
      { id: 'swift', name_id: 'Pemrograman Swift 6', name_en: 'Swift 6 Modern Programming' },
      { id: 'oop', name_id: 'OOP & Software Architecture', name_en: 'OOP & Software Architecture' }
    ];

    let tabsHtml = '<div class="materials-tabs-bar">';
    for (const t of tabs) {
      const isActive = this.currentTab === t.id;
      const title = isId ? t.name_id : t.name_en;
      tabsHtml += `
        <button class="material-tab-btn ${isActive ? 'active' : ''}" data-tab="${t.id}">
          <span>${title}</span>
        </button>
      `;
    }
    tabsHtml += '</div>';

    const contentHtml = this.getTabContent(this.currentTab, isId);

    container.innerHTML = `
      <div class="materials-view container">
        <!-- Hero Header -->
        <div class="materials-hero">
          <div class="hero-tag">
            <span class="status-dot"></span>
            ${isId ? 'MODUL MATERI & PANDUAN KISI-KISI RESMI' : 'OFFICIAL STUDY GUIDE & CURRICULUM'}
          </div>
          <h1 class="materials-title">
            ${isId ? 'Pusat Materi Inti <span>5 Kompetensi Seleksi</span>.' : 'Comprehensive Core Curriculum for <span>5 Exam Domains</span>.'}
          </h1>
          <p class="materials-subtitle">
            ${isId 
              ? 'Panduan belajar komprehensif tanpa reduksi teori. Membahas penalaran figural CPNS medium, dekomposisi komputasional, aljabar linear & matriks AI, sintaks modern Swift 6, serta manajemen memori ARC & arsitektur OOP secara mendalam.' 
              : 'Complete study guides, mathematical formulas, CPNS medium figural reasoning patterns, computational complexity, modern Swift 6 paradigms, and OOP memory management.'}
          </p>
          <div style="display: flex; gap: 12px; margin-top: 8px;">
            <button class="liquid-glass-btn btn-sm" id="btn-materials-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span>${isId ? 'Kembali ke Portal Tryout' : 'Back to Simulation Portal'}</span>
            </button>
          </div>
        </div>

        <!-- Sticky Category Tabs Navigation -->
        ${tabsHtml}

        <!-- Active Material Content Area -->
        <div class="material-content-wrapper">
          ${contentHtml}
        </div>
      </div>
    `;

    // Bind events
    document.getElementById('btn-materials-back')?.addEventListener('click', () => {
      this.app.navigate('portal');
    });

    container.querySelectorAll('.material-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        if (tabId) this.setTab(tabId);
      });
    });

    container.querySelectorAll('.btn-jump-practice').forEach(btn => {
      btn.addEventListener('click', () => {
        this.app.navigate('portal');
      });
    });
  }

  getTabContent(tab, isId) {
    switch (tab) {
      case 'logic':
        return this.getLogicContent(isId);
      case 'comp_thinking':
        return this.getCTContent(isId);
      case 'ai_math':
        return this.getAIMathContent(isId);
      case 'swift':
        return this.getSwiftContent(isId);
      case 'oop':
        return this.getOOPContent(isId);
      default:
        return '';
    }
  }

  /* ==========================================================================
     TAB 1: LOGIKA & FIGURAL CPNS
     ========================================================================== */
  getLogicContent(isId) {
    if (isId) {
      return `
        <div class="material-article">
          <!-- Modul 1.1: Deret Angka & Huruf -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. Deret Angka & Huruf (Pola Kompleks & Multi-Larik)</h2>
              <span class="material-tag-badge">Logika Aritmetika</span>
            </div>
            <p class="material-text">
              Soal deret pada tes Apple Developer Academy tidak hanya menguji aritmatika sederhana, melainkan pola kombinasi multi-larik, rasio perkalian-pengurangan selang-seling, dan deret Fibonacci bertingkat. Kunci kecepatan adalah mengidentifikasi pola hubungan antar-indeks suku ganjil dan genap secara terpisah.
            </p>
            
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Pola Larik Ganda (Dual Series)</span>
                <code>Suku Ganjil: 2, 4, 8, 16 (+x2)<br>Suku Genap: 30, 27, 24, 21 (-3)</code>
                <p>Deret tersusun bergantian: 2, 30, 4, 27, 8, 24, 16... Pisahkan analisis menjadi 2 sub-deret independen.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Operasi Bertingkat (Multi-Stage)</span>
                <code>Suku: 3, 6, 18, 72, 360<br>Selisih/Rasio: x2, x3, x4, x5</code>
                <p>Pengali atau penambah bertambah satu secara linear pada setiap langkah iterasi deret.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Deret Abjad / ASCII Jump</span>
                <code>A (+2) -> C (+3) -> F (+4) -> J (+5) -> O</code>
                <p>Ubah huruf menjadi nilai angka urutan alfabet (A=1, B=2, ..., Z=26) untuk mempermudah perhitungan matematis.</p>
              </div>
            </div>

            <div class="cheatsheet-formula-box">
              <span class="formula-label">Metode Sistematis Menyelesaikan Deret:</span>
              <div class="formula-content">
                Langkah 1: Cek selisih suku berurutan (d = U_{n} - U_{n-1}).<br>
                Langkah 2: Jika tidak berpola teratur, cek rasio pembagian (r = U_{n} / U_{n-1}).<br>
                Langkah 3: Jika melompat naik-turun ekstrem, pisahkan menjadi larik ganjil dan larik genap.<br>
                Langkah 4: Cek hubungan penjumlahan 2 suku sebelumnya (pola Fibonacci: U_n = U_{n-1} + U_{n-2}).
              </div>
            </div>
          </section>

          <!-- Modul 1.2: Silogisme Deduktif & Logika Proposisi -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Silogisme, Kuantor, Kontraposisi & Hukum De Morgan</h2>
              <span class="material-tag-badge">Logika Deduktif</span>
            </div>
            <p class="material-text">
              Penalaran deduktif menguji penarikan kesimpulan mutlak dan valid berdasarkan premis formal. Tidak diperbolehkan menyisipkan asumsi dunia nyata yang tidak tertulis pada premis.
            </p>

            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Aturan Logika</th>
                    <th>Bentuk Premis</th>
                    <th>Kesimpulan Valid</th>
                    <th>Keterangan Penting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Modus Ponens</strong></td>
                    <td>P → Q dan P</td>
                    <td><strong>Q</strong></td>
                    <td>Menegaskan anteseden menghasilkan konsekuen.</td>
                  </tr>
                  <tr>
                    <td><strong>Modus Tollens</strong></td>
                    <td>P → Q dan ~Q</td>
                    <td><strong>~P</strong></td>
                    <td>Menolak konsekuen membuktikan ingkaran anteseden.</td>
                  </tr>
                  <tr>
                    <td><strong>Kontraposisi Ekuivalen</strong></td>
                    <td>P → Q</td>
                    <td><strong>~Q → ~P</strong></td>
                    <td>Pernyataan implikasi selalu ekuivalen dengan kontraposisinya: P → Q ≡ ~Q → ~P ≡ ~P ∨ Q.</td>
                  </tr>
                  <tr>
                    <td><strong>Silogisme Hipotesis</strong></td>
                    <td>P → Q dan Q → R</td>
                    <td><strong>P → R</strong></td>
                    <td>Rantai implikasi transitif langsung.</td>
                  </tr>
                  <tr>
                    <td><strong>Kuantor Universal vs Eksistensial</strong></td>
                    <td>Semua A adalah B. Sebagian C adalah A.</td>
                    <td><strong>Sebagian C adalah B</strong></td>
                    <td>Kata "Semua" + "Sebagian/Ada" selalu menghasilkan kesimpulan "Sebagian".</td>
                  </tr>
                  <tr>
                    <td><strong>Hukum De Morgan</strong></td>
                    <td>~(P ∧ Q) atau ~(P ∨ Q)</td>
                    <td><strong>~P ∨ ~Q</strong> dan <strong>~P ∧ ~Q</strong></td>
                    <td>Ingkaran dari konjungsi "DAN" adalah disjungsi "ATAU" dari ingkarannya.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="worked-example-box">
              <span class="example-title">Contoh Soal Jebakan Silogisme:</span>
              <div class="example-body">
                <strong>Premis 1:</strong> Semua developer iOS menguasai bahasa Swift.<br>
                <strong>Premis 2:</strong> Budi menguasai bahasa Swift.<br>
                <strong>Kesimpulan yang SALAH:</strong> Budi adalah developer iOS. (Kekeliruan <em>Affirming the Consequent</em>, karena orang yang menguasai Swift belum tentu spesifik developer iOS).<br>
                <strong>Kesimpulan yang BENAR:</strong> Tidak dapat ditarik kesimpulan pasti mengenai profesi Budi.
              </div>
            </div>
          </section>

          <!-- Modul 1.3: Pola Figural & Spasial CPNS Medium -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. Pola Figural, Rotasi Geometri & Spasial CPNS Tingkat Medium</h2>
              <span class="material-tag-badge">Kemampuan Spasial</span>
            </div>
            <p class="material-text">
              Pola figural menguji pengenalan transformasi spasial abstrak 2D dan 3D. Pada tes seleksi Apple Academy, tipe soal gambar terbagi ke dalam empat kategori utama:
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Rotasi Bertahap (Clockwise / Counter-Clockwise)</span>
                <p>Elemen berputar dengan sudut tetap atau bertambah (+45°, +90°, +135°). Perhatikan arah jarum jam dan perubahan bentuk ujung panah atau titik orbit.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Matriks 3x3 Hubungan Logika (Boolean XOR/AND)</span>
                <p>Baris ke-3 dihasilkan dari operasi bentuk Baris 1 dan Baris 2. Garis yang sama di kedua gambar saling menghapus (XOR) atau digabungkan (OR).</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Pola Perubahan Jumlah Sisi & Shading</span>
                <p>Segitiga (3) -> Persegi (4) -> Segilima (5). Pola arsiran bergeser selang-seling: Solid Hitam -> Putih -> Garis Diagonal -> Titik.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Jaring-Jaring Kubus 3D & Sisi Berhadapan</span>
                <p>Dua sisi yang dipisahkan oleh satu kotak perantara dalam garis lurus selalu menjadi <strong>sisi berlawanan / berseberangan</strong> dan tidak mungkin bertemu bersebelahan.</p>
              </div>
            </div>

            <div class="cheatsheet-formula-box">
              <span class="formula-label">Aturan Emas Jaring-Jaring Kubus:</span>
              <div class="formula-content">
                Jika pola jaring kubus memiliki baris [A][B][C][D], maka:<br>
                - Sisi A dan Sisi C saling berhadapan (berseberangan).<br>
                - Sisi B dan Sisi D saling berhadapan.<br>
                - Dua sisi yang saling berhadapan <strong>TIDAK PERNAH BISA</strong> terlihat bersamaan dalam satu sudut pandang kubus 3D.
              </div>
            </div>
          </section>

          <!-- Modul 1.4: Penalaran Posisi & Urutan Logis -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Penalaran Posisi, Duduk Melingkar & Urutan Linear</h2>
              <span class="material-tag-badge">Penalaran Analitis</span>
            </div>
            <p class="material-text">
              Soal posisi menguji kemampuan menyusun batasan (<em>constraints</em>) relasional. Gunakan tabel eliminasi matriks atau diagram lingkaran untuk memvisualisasikan posisi.
            </p>
            <ul class="material-bullet-list">
              <li><strong>Duduk Berjajar (Linear):</strong> Tentukan posisi absolut ujung kiri dan kanan terlebih dahulu, lalu masukkan relasi relatif ("X duduk tepat di antara Y dan Z").</li>
              <li><strong>Duduk Melingkar (Roundtable):</strong> Kiri dan kanan seseorang ditentukan dari arah pandang subjek menuju pusat meja. Jika ada 6 orang, orang di seberang X berjarak tepat 3 langkah rotasi. Jumlah susunan melingkar adalah (n - 1)!.</li>
              <li><strong>Urutan Ranking / Waktu:</strong> Buat garis bilangan $A > B \geq C$ untuk menemukan relasi transitif yang tak terbantahkan.</li>
            </ul>
          </section>

          <!-- Modul 1.5: Probabilitas & Kombinatorika Terapan -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">5. Probabilitas & Kombinatorika Terapan</h2>
              <span class="material-tag-badge">Peluang & Counting</span>
            </div>
            <p class="material-text">
              Konsep probabilitas berfokus pada pengambilan bola dari kantong, penentuan susunan komite, dan peluang bersyarat.
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Permutasi ($P$) vs Kombinasi ($C$)</span>
                <code>Permutasi: P(n, r) = n! / (n - r)!<br>Kombinasi: C(n, r) = n! / (r! * (n - r)!)</code>
                <p>Gunakan Permutasi jika <strong>urutan diperhitungkan</strong> (posisi juara 1, 2, 3). Gunakan Kombinasi jika <strong>urutan tidak penting</strong> (memilih 3 orang anggota tim).</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Peluang Bersyarat & Tanpa Pengembalian</span>
                <code>P(A \cap B) = P(A) \times P(B|A)</code>
                <p>Jika bola pertama diambil tanpa dikembalikan, total semesta berkurang dari $N$ menjadi $N-1$ untuk pengambilan kedua.</p>
              </div>
            </div>
          </section>

          <!-- Modul 1.6: Analogi Figural A : B = C : ? -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">6. Analogi Figural: Hubungan A : B = C : ?</h2>
              <span class="material-tag-badge">Analogi Visual</span>
            </div>
            <p class="material-text">
              Soal analogi figural menyajikan dua pasangan gambar. Tugas Anda adalah menemukan aturan transformasi dari pasangan pertama (A menjadi B), lalu menerapkannya pada gambar C untuk menentukan jawaban. Kuncinya: fokus pada <strong>satu perubahan paling konsisten</strong>, jangan terpancang pada detail yang berubah secara acak.
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Transformasi Geometris Umum</span>
                <p>Rotasi (90°/180°), pencerminan (flip horizontal/vertikal), translasi posisi, penskalaan ukuran (membesar/mengecil), dan negasi (hitam menjadi putih, bentuk terbuka menjadi tertutup).</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Transformasi Kombinasi</span>
                <p>Soal medium sering menggabungkan dua aturan sekaligus, misalnya rotasi 90° berlawanan arah jarum jam <strong>plus</strong> penambahan satu elemen internal (garis atau titik) pada setiap langkah.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Jebakan Umum</span>
                <p>Opsi pengecoh biasanya hanya menerapkan sebagian aturan (hanya rotasi tanpa perubahan jumlah elemen). Selalu verifikasi dua properti berbeda sebelum memilih jawaban.</p>
              </div>
            </div>

            <div class="cheatsheet-formula-box">
              <span class="formula-label">Checklist Analisis Analogi Figural:</span>
              <div class="formula-content">
                1. Bandingkan A dan B: apa yang bertambah, berkurang, berpindah, atau berotasi?<br>
                2. Rumuskan aturan dalam satu kalimat ("dirotasi 90° lalu arsiran dibalik").<br>
                3. Terapkan aturan yang sama persis pada C.<br>
                4. Eliminasi opsi yang melanggar salah satu bagian aturan.
              </div>
            </div>
          </section>

          <!-- Action CTA -->
          <div class="material-action-card">
            <div>
              <span>Siap menguji ketajaman logika Anda?</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Terapkan aturan di atas langsung pada paket simulasi tryout online.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Buka Paket Tryout Logika</span>
            </button>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="material-article">
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. Number & Alphabet Series (Multi-Track Sequences)</h2>
              <span class="material-tag-badge">Arithmetic Logic</span>
            </div>
            <p class="material-text">
              Sequence questions in Apple Developer Academy assess your ability to recognize nested arithmetic patterns, alternating multiplication/subtraction steps, and Fibonacci progressions. The key is isolating odd and even indices into independent series when monotonic patterns do not apply.
            </p>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Dual Track Sequence</span>
                <code>Odd: 2, 4, 8, 16 (*2)<br>Even: 30, 27, 24, 21 (-3)</code>
                <p>Interleaved series: 2, 30, 4, 27, 8, 24, 16... Analyze odd and even indices separately.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Multi-Stage Increments</span>
                <code>Terms: 3, 6, 18, 72, 360<br>Ratios: *2, *3, *4, *5</code>
                <p>The multiplier increases linearly on each iterative step.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Alphabet / ASCII Index Jump</span>
                <code>A (+2) -> C (+3) -> F (+4) -> J (+5) -> O</code>
                <p>Convert letters into numerical alphabet positions (A=1, B=2, ..., Z=26) for faster mathematical deduction.</p>
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Syllogisms & Deductive Logic</h2>
              <span class="material-tag-badge">Formal Logic</span>
            </div>
            <p class="material-text">
              Deductive reasoning measures your ability to reach absolute, airtight conclusions strictly from provided premises without inserting external assumptions.
            </p>
            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Rule</th>
                    <th>Premises Form</th>
                    <th>Valid Conclusion</th>
                    <th>Key Insight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Modus Ponens</strong></td>
                    <td>P → Q and P</td>
                    <td><strong>Q</strong></td>
                    <td>Affirming the antecedent affirms the consequent.</td>
                  </tr>
                  <tr>
                    <td><strong>Modus Tollens</strong></td>
                    <td>P → Q and ~Q</td>
                    <td><strong>~P</strong></td>
                    <td>Denying the consequent proves denial of antecedent.</td>
                  </tr>
                  <tr>
                    <td><strong>Contrapositive</strong></td>
                    <td>P → Q</td>
                    <td><strong>~Q → ~P</strong></td>
                    <td>Logically equivalent statement.</td>
                  </tr>
                  <tr>
                    <td><strong>Hypothetical Syllogism</strong></td>
                    <td>P → Q and Q → R</td>
                    <td><strong>P → R</strong></td>
                    <td>Transitive implication chain.</td>
                  </tr>
                  <tr>
                    <td><strong>Quantifiers (All & Some)</strong></td>
                    <td>All A are B. Some C are A.</td>
                    <td><strong>Some C are B</strong></td>
                    <td>Universal + Existential always yields an existential statement.</td>
                  </tr>
                  <tr>
                    <td><strong>De Morgan's Law</strong></td>
                    <td>~(P ∧ Q) or ~(P ∨ Q)</td>
                    <td><strong>~P ∨ ~Q</strong> and <strong>~P ∧ ~Q</strong></td>
                    <td>Negating a conjunction yields a disjunction of negations.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="worked-example-box">
              <span class="example-title">Classic Syllogism Trap:</span>
              <div class="example-body">
                <strong>Premise 1:</strong> All iOS developers master Swift.<br>
                <strong>Premise 2:</strong> Budi masters Swift.<br>
                <strong>Invalid conclusion:</strong> Budi is an iOS developer. (Fallacy of <em>Affirming the Consequent</em> — Swift users are not necessarily iOS developers).<br>
                <strong>Correct answer:</strong> No certain conclusion can be drawn about Budi's profession.
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. Figural Spatial Reasoning (CPNS Medium Grade)</h2>
              <span class="material-tag-badge">Spatial Aptitude</span>
            </div>
            <p class="material-text">
              Tests geometric transformation recognition in 2D grids and 3D folding nets. Four recurring question families appear in the Academy selection:
            </p>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Progressive Rotation</span>
                <p>Elements rotate by a fixed or incrementing angle (+45°, +90°, +135°). Track arrow direction and orbiting dots separately.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">3x3 Boolean Matrix (XOR / AND)</span>
                <p>Row 3 is derived from applying a boolean operation on rows 1 and 2: identical lines cancel (XOR) or merge (OR).</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Side-Count & Shading Progression</span>
                <p>Triangle (3) → Square (4) → Pentagon (5). Shading cycles: solid black → white → diagonal lines → dots.</p>
              </div>
            </div>
            <div class="cheatsheet-formula-box">
              <span class="formula-label">Golden Rule of 3D Cube Folding:</span>
              <div class="formula-content">
                In an unrolled cross or T-shaped net, any two faces separated by exactly one intermediate square in a straight line form <strong>opposite faces</strong>. Opposite faces <strong>CAN NEVER</strong> be visible simultaneously from any single 3D perspective view.
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Figural Analogy: A : B = C : ?</h2>
              <span class="material-tag-badge">Visual Analogy</span>
            </div>
            <p class="material-text">
              Identify the single most consistent transformation from pair A→B, then apply the exact same rule to C. Verify <strong>two separate properties</strong> before answering — distractor options usually apply only part of the rule.
            </p>
            <ul class="material-bullet-list">
              <li><strong>Common transformations:</strong> rotation (90°/180°), mirror flip, translation, scaling, and negation (black↔white, open↔closed).</li>
              <li><strong>Combined rules:</strong> medium-grade items often stack two rules, e.g. rotate 90° counter-clockwise <strong>plus</strong> add one internal line at each step.</li>
            </ul>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">5. Positional Reasoning & Ordering</h2>
              <span class="material-tag-badge">Analytical Reasoning</span>
            </div>
            <p class="material-text">
              Use an elimination grid or circle diagram to visualize relational constraints.
            </p>
            <ul class="material-bullet-list">
              <li><strong>Linear seating:</strong> anchor the absolute endpoints first, then place relative constraints ("X sits directly between Y and Z").</li>
              <li><strong>Circular seating:</strong> left/right is defined from the subject's perspective facing the center. With 6 people, the person opposite X is exactly 3 rotational steps away. Circular arrangements total (n − 1)!.</li>
            </ul>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">6. Probability & Combinatorics</h2>
              <span class="material-tag-badge">Counting</span>
            </div>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Permutation vs Combination</span>
                <code>Permutation: P(n, r) = n! / (n - r)!<br>Combination: C(n, r) = n! / (r! * (n - r)!)</code>
                <p>Use permutations when <strong>order matters</strong> (1st, 2nd, 3rd place). Use combinations when order is irrelevant (selecting 3 team members).</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Conditional Probability</span>
                <code>P(A ∩ B) = P(A) × P(B|A)</code>
                <p>When drawing without replacement, the sample space shrinks from N to N−1 on the second draw.</p>
              </div>
            </div>
          </section>

          <div class="material-action-card">
            <div>
              <span>Ready to test your spatial and logical skills?</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Practice with real academy questions in our proctored exam simulator.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Start Logic Practice Test</span>
            </button>
          </div>
        </div>
      `;
    }
  }

  /* ==========================================================================
     TAB 2: COMPUTATIONAL THINKING
     ========================================================================== */
  getCTContent(isId) {
    if (isId) {
      return `
        <div class="material-article">
          <!-- Modul 2.1: 4 Pilar Computational Thinking -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. Empat Pilar Inti Computational Thinking</h2>
              <span class="material-tag-badge">Prinsip Komputasi</span>
            </div>
            <p class="material-text">
              Computational Thinking (CT) adalah metodologi pemecahan masalah dengan merumuskan solusi terstruktur yang dapat dieksekusi oleh komputer maupun manusia secara efisien.
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">1. Dekomposisi (Decomposition)</span>
                <p>Memecah masalah besar yang kompleks menjadi sub-masalah kecil yang modular dan independen agar mudah diselesaikan satu per satu.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">2. Pengenalan Pola (Pattern Recognition)</span>
                <p>Menemukan kesamaan, tren, atau keteraturan berulang dari data masa lalu untuk menerapkan solusi yang sudah terbukti.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">3. Abstraksi (Abstraction)</span>
                <p>Menyaring dan mengabaikan detail-detail kecil yang tidak relevan, memusatkan fokus hanya pada informasi esensial dan model data inti.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">4. Desain Algoritma (Algorithm Design)</span>
                <p>Menyusun langkah-langkah instruksi sekuensial yang presisi, terurut, dan bebas ambiguitas untuk memproduksi hasil yang diharapkan.</p>
              </div>
            </div>
          </section>

          <!-- Modul 2.2: Penelusuran Algoritma & State Tracing -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Penelusuran State Variabel & Kode (Algorithm Tracing)</h2>
              <span class="material-tag-badge">Tracing & Dry-Run</span>
            </div>
            <p class="material-text">
              Soal penelusuran algoritma menguji ketelitian dalam melakukan *dry run* terhadap variabel saat loop atau percabangan dieksekusi secara bertahap. Selalu buat tabel *state tracking* untuk mencatat perubahan nilai variabel di setiap iterasi.
            </p>

            <div class="code-snippet-wrap">
              <div class="code-header">
                <span>Algorithm Tracing Example (Swift Pseudocode)</span>
              </div>
              <div class="code-content">var total = 0
var multiplier = 1

for i in 1...4 {
    if i % 2 == 0 {
        total += i * multiplier
    } else {
        multiplier += 1
    }
}
print(total) // Output: Berapakah nilai akhir 'total'?</div>
            </div>

            <div class="worked-example-box">
              <span class="example-title">Tabel Penelusuran Langkah demi Langkah (Dry Run):</span>
              <div class="example-body">
                - <strong>Iterasi i = 1 (Ganjil):</strong> multiplier bertambah dari 1 menjadi 2. total tetap 0.<br>
                - <strong>Iterasi i = 2 (Genap):</strong> total += 2 * 2 = 4. total menjadi 4.<br>
                - <strong>Iterasi i = 3 (Ganjil):</strong> multiplier bertambah dari 2 menjadi 3. total tetap 4.<br>
                - <strong>Iterasi i = 4 (Genap):</strong> total += 4 * 3 = 12. total menjadi 4 + 12 = <strong>16</strong>.<br>
                <strong>Hasil Akhir:</strong> Output cetak adalah <strong>16</strong>.
              </div>
            </div>
          </section>

          <!-- Modul 2.3: Struktur Data & Kompleksitas Algoritma (Big-O) -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. Struktur Data Esensial & Kompleksitas Big-O</h2>
              <span class="material-tag-badge">Struktur Data & Kompleksitas</span>
            </div>
            <p class="material-text">
              Pemahaman karakteristik struktur data menentukan efisiensi algoritma saat menangani volume data besar.
            </p>

            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Struktur Data</th>
                    <th>Prinsip Akses</th>
                    <th>Kompleksitas Pencarian</th>
                    <th>Kasus Penggunaan Ideal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Array / List</strong></td>
                    <td>Index Langsung</td>
                    <td>O(1) by Index, O(n) by Value</td>
                    <td>Koleksi elemen terurut dengan ukuran fleksibel.</td>
                  </tr>
                  <tr>
                    <td><strong>Stack</strong></td>
                    <td>LIFO (Last In First Out)</td>
                    <td>O(n) search, O(1) Push/Pop</td>
                    <td>Undo/Redo history, validasi pasangan kurung tanda kurung.</td>
                  </tr>
                  <tr>
                    <td><strong>Queue</strong></td>
                    <td>FIFO (First In First Out)</td>
                    <td>O(n) search, O(1) Enqueue/Dequeue</td>
                    <td>Background task scheduler, Breadth-First Search (BFS).</td>
                  </tr>
                  <tr>
                    <td><strong>Hash Table / Dictionary</strong></td>
                    <td>Key-Value Hash Function</td>
                    <td>O(1) Average Lookup/Insert</td>
                    <td>Lookup cepat berbasis identifier unik, deduplikasi data.</td>
                  </tr>
                  <tr>
                    <td><strong>Binary Search Tree</strong></td>
                    <td>Left &lt; Node &le; Right</td>
                    <td>O(log n) Balanced, O(n) Worst</td>
                    <td>Data dinamis yang membutuhkan pemilahan urutan konstan.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="cheatsheet-formula-box">
              <span class="formula-label">Hierarki Notasi Big-O (Dari Paling Cepat ke Paling Lambat):</span>
              <div class="formula-content">
                O(1) &lt; O(\\log n) &lt; O(n) &lt; O(n \\log n) &lt; O(n^2) &lt; O(2^n) &lt; O(n!)<br>
                - O(1): Akses array index langsung.<br>
                - O(\\log n): Binary search pada data terurut.<br>
                - O(n): Linear scan satu loop.<br>
                - O(n \\log n): QuickSort / MergeSort optimal.<br>
                - O(n^2): Nested loop ganda (Bubble Sort).
              </div>
            </div>
          </section>

          <!-- Modul 2.4: Graph Traversal & Dynamic Programming -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Penjelajahan Graf (BFS vs DFS) & Dynamic Programming</h2>
              <span class="material-tag-badge">Algoritma Lanjut</span>
            </div>
            <p class="material-text">
              Soal algoritma tingkat lanjut menguji pemahaman penjelajahan graf dan teknik optimasi Dynamic Programming (Memoization).
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">BFS (Breadth-First Search)</span>
                <code>Struktur data: Queue (FIFO)</code>
                <p>Menjelajahi graf simpul per lapis (level-by-level). Ideal untuk mencari rute terpendek (*shortest path*) pada graf tanpa bobot.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">DFS (Depth-First Search)</span>
                <code>Struktur data: Stack / Rekursi (LIFO)</code>
                <p>Menjelajahi cabang graf sedalam mungkin sebelum mundur (*backtracking*). Ideal untuk deteksi siklus dan labirin.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Memoization (Top-Down DP)</span>
                <code>Simpan hasil sub-masalah ke Dictionary / Array</code>
                <p>Mencegah perhitungan ulang pada masalah yang memiliki *Overlapping Subproblems* (seperti menghitung deret Fibonacci).</p>
              </div>
            </div>
          </section>

          <!-- Modul 2.5: Rekursi & Base Case -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">5. Rekursi, Base Case, dan Call Stack</h2>
              <span class="material-tag-badge">Rekursi</span>
            </div>
            <p class="material-text">
              Rekursi adalah fungsi yang memanggil dirinya sendiri untuk menyelesaikan sub-masalah yang lebih kecil. Setiap fungsi rekursif wajib memiliki <strong>base case</strong> (kondisi berhenti); tanpa itu, terjadi <em>infinite recursion</em> yang menghabiskan call stack (<em>stack overflow</em>).
            </p>

            <div class="code-snippet-wrap">
              <div class="code-header">
                <span>Contoh Rekursi Faktorial (Swift)</span>
              </div>
              <div class="code-content">func factorial(_ n: Int) -> Int {
    if n &lt;= 1 { return 1 }   // Base case
    return n * factorial(n - 1) // Recursive case
}

print(factorial(5))
// 5 * factorial(4)
// 5 * (4 * factorial(3))
// 5 * (4 * (3 * factorial(2)))
// 5 * (4 * (3 * (2 * factorial(1))))
// 5 * 4 * 3 * 2 * 1 = 120</div>
            </div>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Urutan Unwind Call Stack</span>
                <p>Fase <em>winding</em> menumpuk pemanggilan sampai base case; fase <em>unwinding</em> mengembalikan hasil dari panggilan terdalam ke paling luar. Soal ujian sering menanyakan nilai kembalian pada tingkat tertentu — gambar tumpukan panggilannya.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Rekursi vs Iterasi</span>
                <p>Setiap rekursi dapat ditulis ulang sebagai loop, tetapi rekursi lebih alami untuk masalah bersarang (tree, divide &amp; conquer). Rekursi memakan memori call stack O(kedalaman); iterasi hanya O(1) memori tambahan.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Tail Recursion</span>
                <p>Jika pemanggilan rekursif adalah operasi terakhir fungsi (hasilnya langsung dikembalikan tanpa dihitung ulang), kompiler dapat mengoptimalkannya menjadi loop sehingga call stack tidak bertambah.</p>
              </div>
            </div>
          </section>

          <!-- Action CTA -->
          <div class="material-action-card">
            <div>
              <span>Uji kemampuan pemikiran komputasional Anda!</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Kerjakan simulasi paket soal Computational Thinking terstandarisasi.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Buka Simulasi Paket Tryout</span>
            </button>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="material-article">
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. The Four Pillars of Computational Thinking</h2>
              <span class="material-tag-badge">Foundations</span>
            </div>
            <p class="material-text">
              Computational Thinking provides a structured methodology to formulate problems so their solutions can be executed by computers and humans effectively.
            </p>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">1. Decomposition</span>
                <p>Breaking down a complex system into manageable, modular sub-problems.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">2. Pattern Recognition</span>
                <p>Observing recurring patterns, trends, and invariants across data.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">3. Abstraction</span>
                <p>Focusing on essential logic while filtering out unnecessary secondary details.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">4. Algorithm Design</span>
                <p>Crafting unambiguous, step-by-step instructions to solve the problem.</p>
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Algorithm Tracing & Variable State Tables</h2>
              <span class="material-tag-badge">Dry-Run Skills</span>
            </div>
            <p class="material-text">
              Tracing questions test careful step-by-step execution of loops and branches. Always build a <em>state tracking table</em> and record every variable mutation per iteration.
            </p>
            <div class="code-snippet-wrap">
              <div class="code-header">
                <span>Algorithm Tracing Example (Swift Pseudocode)</span>
              </div>
              <div class="code-content">var total = 0
var multiplier = 1

for i in 1...4 {
    if i % 2 == 0 {
        total += i * multiplier
    } else {
        multiplier += 1
    }
}
print(total) // What is the final value of 'total'?</div>
            </div>
            <div class="worked-example-box">
              <span class="example-title">Step-by-Step Dry Run:</span>
              <div class="example-body">
                - <strong>i = 1 (odd):</strong> multiplier 1 → 2. total stays 0.<br>
                - <strong>i = 2 (even):</strong> total += 2 × 2 = 4. total becomes 4.<br>
                - <strong>i = 3 (odd):</strong> multiplier 2 → 3. total stays 4.<br>
                - <strong>i = 4 (even):</strong> total += 4 × 3 = 12. total becomes 4 + 12 = <strong>16</strong>.<br>
                <strong>Final output:</strong> <strong>16</strong>.
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. Big-O Complexity & Data Structures</h2>
              <span class="material-tag-badge">Efficiency</span>
            </div>
            <p class="material-text">
              Understanding algorithmic complexity order: O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n^2) &lt; O(2^n).
            </p>
            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Data Structure</th>
                    <th>Access Principle</th>
                    <th>Search Complexity</th>
                    <th>Ideal Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Array / List</strong></td>
                    <td>Direct index</td>
                    <td>O(1) by index, O(n) by value</td>
                    <td>Ordered collections with flexible size.</td>
                  </tr>
                  <tr>
                    <td><strong>Stack</strong></td>
                    <td>LIFO</td>
                    <td>O(n) search, O(1) push/pop</td>
                    <td>Undo history, bracket matching.</td>
                  </tr>
                  <tr>
                    <td><strong>Queue</strong></td>
                    <td>FIFO</td>
                    <td>O(n) search, O(1) enqueue/dequeue</td>
                    <td>Task scheduling, Breadth-First Search.</td>
                  </tr>
                  <tr>
                    <td><strong>Hash Table / Dictionary</strong></td>
                    <td>Key-value hashing</td>
                    <td>O(1) average lookup/insert</td>
                    <td>Fast identifier lookup, deduplication.</td>
                  </tr>
                  <tr>
                    <td><strong>Binary Search Tree</strong></td>
                    <td>Left &lt; Node ≤ Right</td>
                    <td>O(log n) balanced, O(n) worst</td>
                    <td>Dynamic sorted data.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="cheatsheet-formula-box">
              <span class="formula-label">Key Operations:</span>
              <div class="formula-content">
                - Array indexing: O(1)<br>
                - Binary Search: O(log n)<br>
                - Linear Search: O(n)<br>
                - Hash Table Lookup: O(1) Average<br>
                - QuickSort / MergeSort: O(n log n)<br>
                - Nested loops (Bubble Sort): O(n^2)
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Graph Traversal (BFS vs DFS) & Recursion</h2>
              <span class="material-tag-badge">Advanced Algorithms</span>
            </div>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">BFS (Breadth-First Search)</span>
                <code>Data structure: Queue (FIFO)</code>
                <p>Explores level-by-level. Ideal for finding the <em>shortest path</em> on unweighted graphs.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">DFS (Depth-First Search)</span>
                <code>Data structure: Stack / Recursion (LIFO)</code>
                <p>Explores as deep as possible before backtracking. Ideal for cycle detection and mazes.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Recursion & Base Case</span>
                <code>func fact(_ n: Int) -&gt; Int { n &lt;= 1 ? 1 : n * fact(n - 1) }</code>
                <p>Every recursive function needs a <strong>base case</strong> or it overflows the call stack. Trace the winding phase down to the base case, then unwind results back out.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Memoization (Top-Down DP)</span>
                <code>Cache sub-results in a Dictionary</code>
                <p>Prevents recomputing overlapping subproblems (e.g. naive Fibonacci recalculates the same branches exponentially).</p>
              </div>
            </div>
          </section>

          <div class="material-action-card">
            <div>
              <span>Ready for Computational Thinking exercises?</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Test your algorithm tracing skills in our realistic simulator.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Start CT Practice Test</span>
            </button>
          </div>
        </div>
      `;
    }
  }

  /* ==========================================================================
     TAB 3: KONSEP AI & MATEMATIKA
     ========================================================================== */
  getAIMathContent(isId) {
    if (isId) {
      return `
        <div class="material-article">
          <!-- Modul 3.1: Aljabar Linear & Operasi Matriks -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. Aljabar Linear & Operasi Matriks Dasar</h2>
              <span class="material-tag-badge">Matriks & Vektor</span>
            </div>
            <p class="material-text">
              Operasi matriks adalah landasan komputasi grafik pada Metal iOS dan representasi layer model neural network. Soal ujian berfokus pada perkalian matriks, determinan $2 \\times 2$, dan transformasi koordinat.
            </p>

            <div class="cheatsheet-formula-box">
              <span class="formula-label">Rumus Perkalian Matriks (Baris kali Kolom):</span>
              <div class="formula-content">
                Jika A = [a, b; c, d] dan B = [e, f; g, h], maka:<br>
                A \\times B = [(a\\cdot e + b\\cdot g), (a\\cdot f + b\\cdot h); (c\\cdot e + d\\cdot g), (c\\cdot f + d\\cdot h)]<br><br>
                <strong>Syarat Perkalian:</strong> Matriks A berukuran (m × k) hanya dapat dikalikan dengan matriks B berukuran (k × n). Hasil perkalian berukuran (m × n).
              </div>
            </div>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Determinan Matriks 2x2</span>
                <code>\\det(A) = (a \\times d) - (b \\times c)</code>
                <p>Jika $\\det(A) = 0$, matriks disebut matriks singular dan <strong>tidak memiliki invers</strong>.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Invers Matriks 2x2</span>
                <code>A^{-1} = (1 / \\det(A)) * [d, -b; -c, a]</code>
                <p>Menukar elemen diagonal utama (a dan d) serta menegasikan elemen diagonal samping (b dan c).</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Matriks Identitas (I) & Transpose ($A^T$)</span>
                <code>I = [1, 0; 0, 1], A * I = A</code>
                <p>Transpose membalik sumbu elemen matriks terhadap diagonal utama (baris menjadi kolom).</p>
              </div>
            </div>
          </section>

          <!-- Modul 3.2: Dot Product Vektor & Cosine Similarity -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Perkalian Titik Vektor (Dot Product) & Cosine Similarity</h2>
              <span class="material-tag-badge">AI Vector Search</span>
            </div>
            <p class="material-text">
              Dalam sistem AI modern (LLM embeddings, pencarian semantik CoreML), kesamaan makna antara dua teks atau gambar dihitung menggunakan sudut antara dua vektor embedding.
            </p>

            <div class="cheatsheet-formula-box">
              <span class="formula-label">Rumus Dot Product & Cosine Similarity:</span>
              <div class="formula-content">
                1. Dot Product: \\vec{u} \\cdot \\vec{v} = (u_1 \\times v_1) + (u_2 \\times v_2) + \\dots + (u_n \\times v_n)<br>
                2. Panjang Vektor (Norm L2): ||\\vec{u}|| = \\sqrt{u_1^2 + u_2^2 + \\dots + u_n^2}<br>
                3. Cosine Similarity: \\cos(\\theta) = (\\vec{u} \\cdot \\vec{v}) / (||\\vec{u}|| \\times ||\\vec{v}||)
              </div>
            </div>

            <div class="worked-example-box">
              <span class="example-title">Interpretasi Nilai Cosine Similarity:</span>
              <div class="example-body">
                - <strong>Nilai = +1:</strong> Sudut $\\theta = 0^\\circ$. Kedua vektor identik dan searah sempurna (makna dokumen sama persis).<br>
                - <strong>Nilai = 0:</strong> Sudut $\\theta = 90^\\circ$ (Orthogonal). Kedua vektor saling tegak lurus dan tidak memiliki korelasi/kesamaan.<br>
                - <strong>Nilai = -1:</strong> Sudut $\\theta = 180^\\circ$. Kedua vektor berlawanan arah secara diametral.
              </div>
            </div>
          </section>

          <!-- Modul 3.3: Konsep Fundamental Machine Learning -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. Paradigma Machine Learning, Fungsi Aktivasi & Optimasi</h2>
              <span class="material-tag-badge">Teori AI & Neural Net</span>
            </div>
            <p class="material-text">
              Soal konsep AI menguji pemahaman klasifikasi algoritma pembelajaran dan fungsi non-linear neural network:
            </p>

            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Tipe Pembelajaran</th>
                    <th>Karakteristik Data</th>
                    <th>Contoh Kasus</th>
                    <th>Algoritma Populer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Supervised Learning</strong></td>
                    <td>Data berlabel (Memiliki input $X$ dan target $Y$)</td>
                    <td>Deteksi spam email, prediksi harga rumah.</td>
                    <td>Linear Regression, SVM, Random Forest.</td>
                  </tr>
                  <tr>
                    <td><strong>Unsupervised Learning</strong></td>
                    <td>Data tidak berlabel (Hanya input $X$)</td>
                    <td>Segmentasi pelanggan, kompresi data.</td>
                    <td>K-Means Clustering, PCA (Dimensionality Reduction).</td>
                  </tr>
                  <tr>
                    <td><strong>Reinforcement Learning</strong></td>
                    <td>Agent berinteraksi dengan environment via Reward/Penalty</td>
                    <td>Game AI (AlphaGo), navigasi robot otonom.</td>
                    <td>Q-Learning, Policy Gradient (PPO).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Fungsi Aktivasi ReLU</span>
                <code>f(x) = \\max(0, x)</code>
                <p>Mengubah nilai negatif menjadi 0, menjaga nilai positif linear. Mencegah masalah <em>Vanishing Gradient</em>.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Fungsi Aktivasi Sigmoid</span>
                <code>S(x) = 1 / (1 + e^{-x})</code>
                <p>Memetakan rentang nilai bilangan riil ke dalam probabilitas kontinu antara $0$ dan $1$.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Overfitting vs Underfitting</span>
                <code>Overfitting: Training score tinggi, Test score rendah</code>
                <p>Model menghafal data latihan dan gagal melakukan generalisasi pada data baru yang belum pernah dilihat.</p>
              </div>
            </div>
          </section>

          <!-- Modul 3.4: Softmax, Loss Function & Gradient Descent -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Softmax, Cross-Entropy Loss & Gradient Descent</h2>
              <span class="material-tag-badge">Pelatihan Model</span>
            </div>
            <p class="material-text">
              Untuk memahami bagaimana neural network "belajar", Anda perlu memahami tiga komponen pelatihan: fungsi yang mengubah skor menjadi probabilitas, ukuran seberapa salah prediksi, dan mekanisme koreksi bobot.
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Fungsi Softmax</span>
                <code>softmax(z_i) = e^{z_i} / Σ e^{z_j}</code>
                <p>Mengubah vektor skor mentah (logit) menjadi distribusi probabilitas yang seluruhnya positif dan totalnya 1. Sering dipakai di layer output klasifikasi multi-kelas.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Cross-Entropy Loss</span>
                <code>L = -Σ y_i * log(ŷ_i)</code>
                <p>Menghukum prediksi yang percaya diri tapi salah secara sangat besar. Jika model memprediksi probabilitas 1 untuk kelas yang benar, loss mendekati 0.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Gradient Descent</span>
                <code>w_baru = w_lama - learning_rate * ∂L/∂w</code>
                <p>Bobot digeser sedikit demi sedikit berlawanan arah gradien loss. <em>Learning rate</em> terlalu besar membuat pelatihan tidak stabil (divergen); terlalu kecil membuat pelatihan sangat lambat.</p>
              </div>
            </div>

            <div class="worked-example-box">
              <span class="example-title">Contoh Cepat Softmax (2 Kelas):</span>
              <div class="example-body">
                Logit z = [2.0, 0.0]. Maka: e^2.0 ≈ 7.39 dan e^0 = 1.00, total ≈ 8.39.<br>
                - Probabilitas kelas 1 = 7.39 / 8.39 ≈ <strong>0.88</strong><br>
                - Probabilitas kelas 2 = 1.00 / 8.39 ≈ <strong>0.12</strong><br>
                Kesimpulan: model yakin 88% pada kelas pertama meskipun selisih logit hanya 2.
              </div>
            </div>
          </section>

          <!-- Action CTA -->
          <div class="material-action-card">
            <div>
              <span>Siap menghadapi soal Aljabar & AI?</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Uji kalkulasi matriks dan dot product Anda di ruang ujian online.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Buka Tryout Soal AI & Matriks</span>
            </button>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="material-article">
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. Linear Algebra & Matrix Multiplication</h2>
              <span class="material-tag-badge">Matrices</span>
            </div>
            <p class="material-text">
              Matrix operations form the core foundation of computer graphics (Metal/SceneKit) and neural network weights.
            </p>
            <div class="cheatsheet-formula-box">
              <span class="formula-label">Matrix Multiplication Rule:</span>
              <div class="formula-content">
                To multiply Matrix A (m x k) with Matrix B (k x n), the inner dimension 'k' must match. The product has dimensions (m x n).<br>
                Determinant of 2x2 matrix: det(A) = ad - bc. If det(A) == 0, the matrix is singular and has no inverse.
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Dot Product & Cosine Similarity</h2>
              <span class="material-tag-badge">Vectors</span>
            </div>
            <p class="material-text">
              Cosine similarity measures orientation angle between high-dimensional vector embeddings: cos(theta) = (u . v) / (||u|| * ||v||).
            </p>
            <div class="worked-example-box">
              <span class="example-title">Interpreting Cosine Similarity Values:</span>
              <div class="example-body">
                - <strong>Value = +1:</strong> theta = 0°. Vectors are identical in orientation (documents mean the same thing).<br>
                - <strong>Value = 0:</strong> theta = 90° (orthogonal). No correlation between the vectors.<br>
                - <strong>Value = −1:</strong> theta = 180°. Vectors point in diametrically opposite directions.
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. Machine Learning Paradigms & Activation Functions</h2>
              <span class="material-tag-badge">Neural Net Theory</span>
            </div>
            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Learning Type</th>
                    <th>Data Characteristics</th>
                    <th>Example Use Case</th>
                    <th>Popular Algorithms</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Supervised</strong></td>
                    <td>Labeled (input X and target Y)</td>
                    <td>Spam detection, house price prediction.</td>
                    <td>Linear Regression, SVM, Random Forest.</td>
                  </tr>
                  <tr>
                    <td><strong>Unsupervised</strong></td>
                    <td>Unlabeled (input X only)</td>
                    <td>Customer segmentation, compression.</td>
                    <td>K-Means, PCA.</td>
                  </tr>
                  <tr>
                    <td><strong>Reinforcement</strong></td>
                    <td>Agent + environment rewards</td>
                    <td>Game AI (AlphaGo), robot navigation.</td>
                    <td>Q-Learning, Policy Gradient (PPO).</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">ReLU Activation</span>
                <code>f(x) = max(0, x)</code>
                <p>Zeroes out negatives, keeps positives linear. Prevents <em>vanishing gradient</em>.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Sigmoid Activation</span>
                <code>S(x) = 1 / (1 + e^{-x})</code>
                <p>Squashes real values into a continuous probability between 0 and 1.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Overfitting vs Underfitting</span>
                <code>Overfit: high training, low test score</code>
                <p>The model memorized training data and fails to generalize to unseen data.</p>
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Softmax, Cross-Entropy Loss & Gradient Descent</h2>
              <span class="material-tag-badge">Model Training</span>
            </div>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Softmax</span>
                <code>softmax(z_i) = e^{z_i} / Σ e^{z_j}</code>
                <p>Converts raw logits into a probability distribution where all values are positive and sum to 1.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Cross-Entropy Loss</span>
                <code>L = -Σ y_i * log(ŷ_i)</code>
                <p>Heavily penalizes confident-but-wrong predictions. Approaches 0 when the model predicts probability 1 for the true class.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Gradient Descent</span>
                <code>w_new = w_old - learning_rate * ∂L/∂w</code>
                <p>Weights shift slightly against the loss gradient. Too large a learning rate diverges; too small crawls.</p>
              </div>
            </div>
          </section>

          <div class="material-action-card">
            <div>
              <span>Practice AI & Linear Algebra questions</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Try real academy questions with our proctored exam simulator.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Start AI & Math Test</span>
            </button>
          </div>
        </div>
      `;
    }
  }

  /* ==========================================================================
     TAB 4: PEMROGRAMAN SWIFT
     ========================================================================== */
  getSwiftContent(isId) {
    if (isId) {
      return `
        <div class="material-article">
          <!-- Modul 4.1: Dasar Tipe Data, let vs var -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. Sintaks Inti Swift, Type Safety, dan Immutability</h2>
              <span class="material-tag-badge">Dasar Swift 6</span>
            </div>
            <p class="material-text">
              Swift adalah bahasa yang *strongly typed* dan *type-safe*. Konsep immutability (ketetapan) sangat diutamakan untuk mencegah *side-effects* yang tidak diinginkan dalam pemrograman multi-threading.
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Konstanta 'let' vs Variabel 'var'</span>
                <code>let pi = 3.14159 // Immutable (Tidak bisa diubah)<br>var score = 100 // Mutable (Bisa diubah nilainya)</code>
                <p>Selalu gunakan <code>let</code> secara default kecuali jika nilai variabel tersebut memang harus bermutasi.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Type Inference & String Interpolation</span>
                <code>let greeting = "Skor: \(score)" // String interpolation</code>
                <p>Kompiler Swift secara otomatis menyimpulkan tipe data variabel tanpa perlu deklarasi tipe manual eksplisit.</p>
              </div>
            </div>
          </section>

          <!-- Modul 4.2: Handling Optionals & Unwrapping Aman -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Optionals & Teknik Unwrapping yang Aman</h2>
              <span class="material-tag-badge">Optional Unwrapping</span>
            </div>
            <p class="material-text">
              Di Swift, variabel biasa tidak boleh bernilai <code>nil</code>. Tipe <code>Optional&lt;Wrapped&gt;</code> (ditandai dengan tanda tanya <code>?</code>) digunakan untuk membungkus nilai yang bisa bernilai valid atau <code>nil</code> (kosong).
            </p>

            <div class="code-snippet-wrap">
              <div class="code-header">
                <span>Optional Unwrapping Comparison</span>
              </div>
              <div class="code-content">// 1. if let (Optional Binding Lokal)
if let safeName = username {
    print("Halo, \(safeName)")
}

// 2. guard let (Early Exit - Variabel safeName bertahan di scope luar)
guard let safeAge = userAge else {
    return // Wajib keluar dari fungsi jika nil
}
print("Usia: \(safeAge)")

// 3. Nil-Coalescing Operator (Nilai Default jika nil)
let displayName = username ?? "Tamu Anonim"

// 4. Force Unwrapping (!) - BERBAHAYA! Menyebabkan crash fatal jika nil
let forcedValue = username! // JANGAN GUNAKAN jika tidak yakin 100%</div>
            </div>

            <div class="cheatsheet-formula-box">
              <span class="formula-label">Ringkasan Perbedaan if let vs guard let:</span>
              <div class="formula-content">
                - <code>if let</code>: Variabel yang di-unwrap hanya dapat diakses <strong>di dalam blok kurung kurawal if</strong>.<br>
                - <code>guard let</code>: Mengharuskan <code>else { return / throw / break }</code>. Variabel yang di-unwrap dapat diakses <strong>di seluruh baris kode setelah guard statement</strong>.
              </div>
            </div>
          </section>

          <!-- Modul 4.3: Control Flow, Ranges, Closures & Higher-Order Functions -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. Range Operators, Closures & Higher-Order Functions</h2>
              <span class="material-tag-badge">Functional Swift</span>
            </div>
            <p class="material-text">
              Swift menyediakan operator rentang (ranges) dan fungsi tingkat tinggi (higher-order functions) untuk memanipulasi koleksi array secara ringkas dan deklaratif:
            </p>

            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Fungsi / Operator</th>
                    <th>Contoh Kode Swift</th>
                    <th>Hasil Eksekusi</th>
                    <th>Penjelasan Logika</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Half-Open Range (<code>..&lt;</code>)</strong></td>
                    <td><code>0..&lt;4</code></td>
                    <td>0, 1, 2, 3</td>
                    <td>Tidak menyertakan angka batas akhir kanan.</td>
                  </tr>
                  <tr>
                    <td><strong>Closed Range (<code>...</code>)</strong></td>
                    <td><code>0...4</code></td>
                    <td>0, 1, 2, 3, 4</td>
                    <td>Menyertakan batas awal hingga batas akhir penuh.</td>
                  </tr>
                  <tr>
                    <td><strong><code>map</code></strong></td>
                    <td><code>[1, 2, 3].map { $0 * 2 }</code></td>
                    <td><code>[2, 4, 6]</code></td>
                    <td>Mentransformasi setiap elemen dengan aturan baru.</td>
                  </tr>
                  <tr>
                    <td><strong><code>filter</code></strong></td>
                    <td><code>[1, 2, 3, 4].filter { $0 % 2 == 0 }</code></td>
                    <td><code>[2, 4]</code></td>
                    <td>Menyaring elemen yang memenuhi kondisi boolean true.</td>
                  </tr>
                  <tr>
                    <td><strong><code>reduce</code></strong></td>
                    <td><code>[1, 2, 3, 4].reduce(0, +)</code></td>
                    <td><code>10</code></td>
                    <td>Menggabungkan seluruh elemen menjadi satu nilai tunggal.</td>
                  </tr>
                  <tr>
                    <td><strong><code>compactMap</code></strong></td>
                    <td><code>["1", "a", "3"].compactMap { Int($0) }</code></td>
                    <td><code>[1, 3]</code></td>
                    <td>Mengonversi elemen dan otomatis membuang nilai <code>nil</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="worked-example-box">
              <span class="example-title">Tebak Output Kode Swift Klasik Ujian:</span>
              <div class="example-body">
                <code>let numbers = [1, 2, 3, 4, 5]<br>
let res = numbers.filter { $0 > 2 }.map { $0 * 10 }.reduce(0, +)<br>
print(res)</code><br><br>
                <strong>Penelusuran Langkah:</strong><br>
                1. <code>filter { $0 > 2 }</code> menghasilkan <code>[3, 4, 5]</code>.<br>
                2. <code>map { $0 * 10 }</code> menghasilkan <code>[30, 40, 50]</code>.<br>
                3. <code>reduce(0, +)</code> menjumlahkan <code>0 + 30 + 40 + 50 = 120</code>.<br>
                <strong>Output:</strong> <strong>120</strong>.
              </div>
            </div>
          </section>

          <!-- Modul 4.4: Inout, Defer, & Error Handling -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Parameter 'inout', Pernyataan 'defer', dan Error Handling</h2>
              <span class="material-tag-badge">Fitur Lanjutan Swift</span>
            </div>
            <p class="material-text">
              Fitur manajemen kontrol alur eksekusi dan modifikasi state memori di Swift:
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Parameter inout</span>
                <code>func swapVals(_ a: inout Int, _ b: inout Int)</code>
                <p>Mengoper variabel secara pass-by-reference menggunakan simbol <code>&</code> saat pemanggilan sehingga modifikasi berdampak ke variabel pemanggil.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Pernyataan defer</span>
                <code>defer { file.close() }</code>
                <p>Menunda eksekusi blok kode hingga scope blok fungsi selesai dieksekusi (dieksekusi secara LIFO jika ada multiple defer).</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Error Handling do-catch</span>
                <code>do { try perform() } catch { print(error) }</code>
                <p>Penanganan error bertipe secara elegan menggunakan <code>throws</code>, <code>try?</code> (mengembalikan Optional), atau <code>try!</code>.</p>
              </div>
            </div>
          </section>

          <!-- Modul 4.5: Access Control & Generics Dasar -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">5. Access Control, Property Observer & Generics Dasar</h2>
              <span class="material-tag-badge">Swift Intermediate</span>
            </div>
            <p class="material-text">
              Tiga fitur yang sering muncul di soal "tebak output" tingkat menengah: pembatasan akses, reaksi terhadap perubahan nilai properti, dan fungsi yang bekerja untuk banyak tipe.
            </p>

            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Fitur</th>
                    <th>Kata Kunci</th>
                    <th>Perilaku</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Access Control</strong></td>
                    <td><code>private</code>, <code>fileprivate</code>, <code>internal</code>, <code>public</code></td>
                    <td><code>private</code> = hanya dalam scope deklarasi (biasanya tipe pembungkusnya). <code>internal</code> = default, terlihat dalam satu modul. <code>public</code> = terlihat lintas modul.</td>
                  </tr>
                  <tr>
                    <td><strong>Property Observer</strong></td>
                    <td><code>willSet</code>, <code>didSet</code></td>
                    <td><code>willSet</code> berjalan <em>sebelum</em> nilai berubah (nilai baru di parameter <code>newValue</code>); <code>didSet</code> berjalan <em>sesudah</em> (nilai lama di <code>oldValue</code>). Observer <strong>tidak</strong> terpanggil saat inisialisasi pertama.</td>
                  </tr>
                  <tr>
                    <td><strong>Computed Property</strong></td>
                    <td><code>get</code>, <code>set</code></td>
                    <td>Tidak menyimpan nilai; dihitung setiap kali diakses. Sering dipakai untuk turunan data (misal <code>fullName</code> dari <code>firstName</code> + <code>lastName</code>).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="code-snippet-wrap">
              <div class="code-header">
                <span>Contoh Generics Sederhana</span>
              </div>
              <div class="code-content">func swapTwoValues&lt;T&gt;(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}

var x = 5
var y = 9
swapTwoValues(&amp;x, &amp;y)
print(x, y)  // Output: 9 5</div>
            </div>

            <p class="material-text">
              <code>T</code> adalah <em>placeholder tipe</em> — satu fungsi yang sama bekerja untuk <code>Int</code>, <code>String</code>, atau tipe lain tanpa duplikasi kode. Constraint <code>&lt;T: Comparable&gt;</code> membatasi T hanya untuk tipe yang bisa dibandingkan.
            </p>
          </section>

          <!-- Action CTA -->
          <div class="material-action-card">
            <div>
              <span>Uji pemahaman sintaks Swift Anda</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Tebak output kode dan closures pada paket tryout simulasi.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Buka Paket Tryout Swift</span>
            </button>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="material-article">
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. Swift Constants, Optionals & Safety</h2>
              <span class="material-tag-badge">Swift Core</span>
            </div>
            <p class="material-text">
              Swift is strongly typed and promotes immutability. Optionals wrap values that may be nil.
            </p>
            <div class="code-snippet-wrap">
              <div class="code-header">
                <span>Safe Unwrapping in Swift</span>
              </div>
              <div class="code-content">// Optional Binding
if let safe = optionalVal { print(safe) }

// Nil Coalescing
let name = optionalVal ?? "Default"</div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Higher-Order Functions: map, filter, reduce</h2>
              <span class="material-tag-badge">Functional Swift</span>
            </div>
            <p class="material-text">
              Manipulate collections concisely with trailing closure syntax.
            </p>
            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Function</th>
                    <th>Example</th>
                    <th>Result</th>
                    <th>Logic</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong><code>map</code></strong></td>
                    <td><code>[1, 2, 3].map { $0 * 2 }</code></td>
                    <td><code>[2, 4, 6]</code></td>
                    <td>Transforms each element.</td>
                  </tr>
                  <tr>
                    <td><strong><code>filter</code></strong></td>
                    <td><code>[1, 2, 3, 4].filter { $0 % 2 == 0 }</code></td>
                    <td><code>[2, 4]</code></td>
                    <td>Keeps elements passing the boolean condition.</td>
                  </tr>
                  <tr>
                    <td><strong><code>reduce</code></strong></td>
                    <td><code>[1, 2, 3, 4].reduce(0, +)</code></td>
                    <td><code>10</code></td>
                    <td>Folds all elements into a single value.</td>
                  </tr>
                  <tr>
                    <td><strong><code>compactMap</code></strong></td>
                    <td><code>["1", "a", "3"].compactMap { Int($0) }</code></td>
                    <td><code>[1, 3]</code></td>
                    <td>Transforms and drops nil results.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="worked-example-box">
              <span class="example-title">Classic Chained Output Question:</span>
              <div class="example-body">
                <code>let res = [1,2,3,4,5].filter { $0 &gt; 2 }.map { $0 * 10 }.reduce(0, +)</code><br><br>
                1. <code>filter</code> yields [3, 4, 5].<br>
                2. <code>map</code> yields [30, 40, 50].<br>
                3. <code>reduce</code> sums to 0 + 30 + 40 + 50 = <strong>120</strong>.
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. Ranges, inout, defer & Error Handling</h2>
              <span class="material-tag-badge">Control Flow</span>
            </div>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Range Operators</span>
                <code>0..&lt;4 // 0,1,2,3 (half-open)<br>0...4 // 0,1,2,3,4 (closed)</code>
                <p>Half-open excludes the upper bound; closed range includes it.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">inout Parameters</span>
                <code>func swap(_ a: inout Int, _ b: inout Int)</code>
                <p>Pass-by-reference via the <code>&amp;</code> symbol at the call site — mutations affect the caller's variables.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">defer Statement</span>
                <code>defer { file.close() }</code>
                <p>Defers execution until the enclosing scope exits. Multiple defers run in LIFO order.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Error Handling</span>
                <code>do { try perform() } catch { print(error) }</code>
                <p>Typed error handling via <code>throws</code>, <code>try?</code> (returns Optional), or <code>try!</code> (crashes on failure).</p>
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Access Control, Property Observers & Generics</h2>
              <span class="material-tag-badge">Intermediate Swift</span>
            </div>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Access Levels</span>
                <code>private → fileprivate → internal → public</code>
                <p><code>private</code> is scoped to the declaration; <code>internal</code> (default) to the module; <code>public</code> across modules.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">willSet / didSet</span>
                <code>var score: Int { didSet { save() } }</code>
                <p>Observers fire <em>after initialization</em> only — not on the first assignment during init. <code>oldValue</code> is available in didSet, <code>newValue</code> in willSet.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Generics</span>
                <code>func swap&lt;T&gt;(_ a: inout T, _ b: inout T)</code>
                <p>One implementation works for any type T. Constraints like <code>&lt;T: Comparable&gt;</code> restrict the allowed types.</p>
              </div>
            </div>
          </section>

          <div class="material-action-card">
            <div>
              <span>Ready for Swift code prediction exercises?</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Practice with real Swift questions in our proctored exam simulator.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Start Swift Practice Test</span>
            </button>
          </div>
        </div>
      `;
    }
  }

  /* ==========================================================================
     TAB 5: OOP & SOFTWARE ARCHITECTURE
     ========================================================================== */
  getOOPContent(isId) {
    if (isId) {
      return `
        <div class="material-article">
          <!-- Modul 5.1: Struct (Value Type) vs Class (Reference Type) -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. Value Types (Struct, Enum) vs Reference Types (Class)</h2>
              <span class="material-tag-badge">Memori & Tipe Objek</span>
            </div>
            <p class="material-text">
              Perbedaan antara <code>struct</code> dan <code>class</code> adalah pertanyaan paling fundamental dalam arsitektur software iOS dan seleksi Apple Developer Academy:
            </p>

            <div class="materials-table-wrap">
              <table class="materials-table">
                <thead>
                  <tr>
                    <th>Fitur / Karakteristik</th>
                    <th><code>struct</code> (Value Type)</th>
                    <th><code>class</code> (Reference Type)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Penyimpanan Memori</strong></td>
                    <td>Disimpan di <strong>Stack Memory</strong> (Sangat cepat dialokasikan).</td>
                    <td>Disimpan di <strong>Heap Memory</strong> (Pointer reference di stack).</td>
                  </tr>
                  <tr>
                    <td><strong>Perilaku Assignment (Copy)</strong></td>
                    <td><strong>Copy-by-Value:</strong> Membuat salinan data independen baru. Mengubah copy tidak mengubah aslinya.</td>
                    <td><strong>Pass-by-Reference:</strong> Dua variabel menunjuk ke objek instance memori yang sama. Mengubah satu berdampak ke semua.</td>
                  </tr>
                  <tr>
                    <td><strong>Pewarisan (Inheritance)</strong></td>
                    <td>Tidak mendukung inheritance kelas, mengandalkan Protocol.</td>
                    <td>Mendukung single inheritance (subclassing dari superclass).</td>
                  </tr>
                  <tr>
                    <td><strong>Manajemen Memori</strong></td>
                    <td>Otomatis dibersihkan saat keluar scope stack.</td>
                    <td>Dikelola oleh <strong>ARC (Automatic Reference Counting)</strong>.</td>
                  </tr>
                  <tr>
                    <td><strong>Kapan Digunakan?</strong></td>
                    <td>Default utama di Swift (Model data, SwiftUI View, DTO).</td>
                    <td>Ketika dibutuhkan identitas bersama (Shared state, Coordinator).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="code-snippet-wrap">
              <div class="code-header">
                <span>Demonstrasi Mutasi Struct vs Class</span>
              </div>
              <div class="code-content">struct PointStruct { var x: Int }
var a = PointStruct(x: 10)
var b = a
b.x = 99
print(a.x) // Output: 10 (Karena b adalah salinan independen)

class PointClass { var x: Int; init(x: Int) { self.x = x } }
let c = PointClass(x: 10)
let d = c
d.x = 99
print(c.x) // Output: 99 (Karena c dan d menunjuk instance memori yang sama)</div>
            </div>
          </section>

          <!-- Modul 5.2: Protocol-Oriented Programming (POP) -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Protocol-Oriented Programming (POP) di Swift</h2>
              <span class="material-tag-badge">Arsitektur POP</span>
            </div>
            <p class="material-text">
              Swift didesain sebagai bahasa berbasis protokol pertama (*Protocol-Oriented Language*). Protokol mendefinisikan cetak biru (*blueprint*) fungsi atau properti yang harus dipenuhi oleh tipe yang mengadopsinya.
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Protocol Definition & Adoption</span>
                <code>protocol Drivable { func drive() }</code>
                <p>Mendefinisikan kontrak method tanpa implementasi body langsung.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Protocol Extension (Default Implementation)</span>
                <code>extension Drivable { func drive() { print("Go") } }</code>
                <p>Memberikan implementasi bawaan untuk semua tipe pengadopsi tanpa butuh inheritance kelas.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Protocol Composition</span>
                <code>func play(item: Codable & Identifiable)</code>
                <p>Menggabungkan multiple protocols menjadi satu tipe parameter yang fleksibel.</p>
              </div>
            </div>
          </section>

          <!-- Modul 5.3: ARC & Retain Cycle Prevention -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. Automatic Reference Counting (ARC) & Pencegahan Retain Cycles</h2>
              <span class="material-tag-badge">Manajemen Memori</span>
            </div>
            <p class="material-text">
              ARC melacak jumlah referensi aktif ke sebuah instance kelas. Instance akan dihapus dari memori (deallokasi) hanya ketika <em>reference count</em> bernilai 0.
            </p>

            <div class="worked-example-box">
              <span class="example-title">Retain Cycle (Kebocoran Memori):</span>
              <div class="example-body">
                Jika Objek A memegang <strong>Strong Reference</strong> ke Objek B, dan Objek B juga memegang <strong>Strong Reference</strong> ke Objek A, maka reference count kedua objek tidak akan pernah mencapai 0. Keduanya akan terjebak di memori selamanya (<em>Memory Leak</em>).<br><br>
                <strong>Solusi Pencegahan:</strong><br>
                - Gunakan <code>weak var delegate: CustomDelegate?</code> pada Delegate pattern (selalu bersifat Optional dan tidak menambah reference count).<br>
                - Gunakan Capture List <code>[weak self]</code> di dalam Closures asinkron untuk mencegah penahanan self instance secara kuat.
              </div>
            </div>
          </section>

          <!-- Modul 5.4: Design Patterns & SOLID Principles -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Design Patterns di iOS & Prinsip SOLID</h2>
              <span class="material-tag-badge">Pola Desain iOS</span>
            </div>
            <p class="material-text">
              Pola arsitektur software yang sering diuji pada evaluasi penalaran teknis:
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Delegation Pattern</span>
                <code>weak var delegate: TaskDelegate?</code>
                <p>Pola komunikasi 1-to-1 antar-objek yang decoupled untuk meneruskan event atau permintaan data.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Singleton Pattern</span>
                <code>static let shared = NetworkManager()</code>
                <p>Memastikan sebuah kelas hanya memiliki satu instance global yang dapat diakses di seluruh aplikasi.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Dependency Inversion (SOLID)</span>
                <code>init(service: DataServiceProtocol)</code>
                <p>Modul tingkat tinggi tidak boleh bergantung pada modul tingkat rendah, keduanya harus bergantung pada abstraksi (Protocol).</p>
              </div>
            </div>
          </section>

          <!-- Modul 5.5: Concurrency Modern Swift (async/await & Actor) -->
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">5. Concurrency Modern: async/await, Actor & Sendable</h2>
              <span class="material-tag-badge">Swift Concurrency</span>
            </div>
            <p class="material-text">
              Swift 5.5+ menghadirkan model konkurensi terstruktur. Soal arsitektur modern menguji pemahaman perbedaan <code>async/await</code>, <code>Task</code>, dan isolasi data <code>actor</code> terhadap <em>data race</em>.
            </p>

            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">async/await</span>
                <code>func fetchUser() async throws -&gt; User</code>
                <p>Fungsi <code>async</code> dapat berhenti sementara (suspend) tanpa memblokir thread. Pemanggil wajib menandai titik suspensi dengan <code>await</code>, dan titik-titik itu adalah lokasi potensi pergantian urutan eksekusi.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Task &amp; Structured Concurrency</span>
                <code>Task { await load() }</code>
                <p><code>Task</code> menjalankan pekerjaan asinkron dari konteks sinkron. <code>TaskGroup</code> menjalankan banyak child task paralel dan menunggu semuanya selesai sebelum melanjutkan.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Actor (Isolasi Data Race)</span>
                <code>actor Counter { var n = 0; func inc() { n += 1 } }</code>
                <p>Actor menjamin properti mutablenya hanya bisa diakses satu eksekusi pada satu waktu — menggantikan kebutuhan <code>DispatchQueue</code> + lock manual untuk memproteksi shared state.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Sendable &amp; @MainActor</span>
                <code>@MainActor final class ViewModel: ObservableObject</code>
                <p>Tipe <code>Sendable</code> aman dipakai lintas task. <code>@MainActor</code> memastikan pembaruan UI terjadi di main thread — wajib untuk semua objek yang memicu render view SwiftUI.</p>
              </div>
            </div>

            <div class="worked-example-box">
              <span class="example-title">Pola Jebakan Data Race:</span>
              <div class="example-body">
                Dua thread membaca dan menulis variabel <code>counter</code> yang sama tanpa proteksi → hasil akhirnya tidak deterministik (bisa kurang dari jumlah aktual). Solusi: bungkus state bersama dalam <code>actor</code>, atau gunakan tipe value (<code>struct</code>) yang disalin per-thread sehingga tidak pernah berbagi memori.
              </div>
            </div>
          </section>

          <!-- Action CTA -->
          <div class="material-action-card">
            <div>
              <span>Kuasai seluruh kisi-kisi seleksi sekarang!</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Pilih salah satu dari 12 paket tryout untuk mulai berlatih secara realistis.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Buka Halaman Simulasi Ujian</span>
            </button>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="material-article">
          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">1. Value Types (Struct) vs Reference Types (Class)</h2>
              <span class="material-tag-badge">Memory Models</span>
            </div>
            <p class="material-text">
              Structs are allocated on the Stack and copied by value. Classes are allocated on the Heap and passed by reference, managed by ARC.
            </p>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Struct (Value Type)</span>
                <p>Copy-on-write, thread-safe by isolation, no class inheritance. Preferred default in Swift.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Class (Reference Type)</span>
                <p>Shared mutable state, inheritance, requires ARC lifecycle tracking.</p>
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">2. Protocol-Oriented Programming (POP)</h2>
              <span class="material-tag-badge">Architecture</span>
            </div>
            <p class="material-text">
              Swift is a protocol-first language. Protocols define a contract of methods and properties that adopting types must fulfill.
            </p>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Protocol Adoption</span>
                <code>protocol Drivable { func drive() }</code>
                <p>A blueprint without implementation bodies.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Protocol Extensions</span>
                <code>extension Drivable { func drive() { } }</code>
                <p>Provides default implementations for all adopters — no class inheritance required.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Composition</span>
                <code>func play(item: Codable & Identifiable)</code>
                <p>Combines multiple protocols into one flexible parameter type.</p>
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">3. ARC & Retain Cycle Prevention</h2>
              <span class="material-tag-badge">Memory Leaks</span>
            </div>
            <p class="material-text">
              Avoid strong reference cycles between class instances and closures by using [weak self] capture lists and weak delegate properties.
            </p>
            <div class="worked-example-box">
              <span class="example-title">Retain Cycle Explained:</span>
              <div class="example-body">
                If Object A holds a <strong>strong reference</strong> to Object B while B holds a strong reference back to A, neither reference count ever reaches 0 — both leak permanently.<br><br>
                <strong>Prevention:</strong> declare delegates as <code>weak var delegate: Delegate?</code> (always optional, never increments the count) and capture <code>[weak self]</code> inside async closures.
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">4. Design Patterns & SOLID in iOS</h2>
              <span class="material-tag-badge">Patterns</span>
            </div>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">Delegation</span>
                <code>weak var delegate: TaskDelegate?</code>
                <p>Decoupled 1-to-1 communication for forwarding events and data requests.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Singleton</span>
                <code>static let shared = NetworkManager()</code>
                <p>Guarantees exactly one globally accessible instance.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Dependency Inversion (SOLID)</span>
                <code>init(service: DataServiceProtocol)</code>
                <p>High-level modules must depend on abstractions (protocols), not concrete low-level implementations.</p>
              </div>
            </div>
          </section>

          <section class="material-card">
            <div class="material-card-header">
              <h2 class="material-section-title">5. Modern Concurrency: async/await & Actors</h2>
              <span class="material-tag-badge">Swift Concurrency</span>
            </div>
            <div class="concept-grid">
              <div class="concept-item">
                <span class="concept-name">async/await</span>
                <code>func fetch() async throws -&gt; User</code>
                <p>Async functions may suspend without blocking a thread; every <code>await</code> marks a potential ordering switch point.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Actor Isolation</span>
                <code>actor Counter { var n = 0 }</code>
                <p>Guarantees mutable state is accessed by one execution at a time — eliminating data races without manual locks.</p>
              </div>
              <div class="concept-item">
                <span class="concept-name">Sendable & @MainActor</span>
                <code>@MainActor final class ViewModel</code>
                <p>Sendable types are safe across tasks; <code>@MainActor</code> pins UI updates to the main thread.</p>
              </div>
            </div>
          </section>

          <div class="material-action-card">
            <div>
              <span>Ready for OOP & Architecture questions?</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">Test your Swift OOP knowledge with proctored simulation exams.</p>
            </div>
            <button class="liquid-glass-btn btn-primary btn-jump-practice">
              <span>Start OOP Practice Test</span>
            </button>
          </div>
        </div>
      `;
    }
  }
}

// Attach globally
window.MaterialsHub = MaterialsHub;

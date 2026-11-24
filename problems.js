// ============================================================================
// IF1112 Matematika Diskrit — Data Lengkap Latihan UAS (A1–A5, B1–B5, C1–C5)
// Struktur modular agar mudah dibaca, disalin, atau ditambah soal baru.
// ============================================================================

(function (global) {
  const SECTIONS = {
  A: {
    id: 'A',
    kicker: 'BAGIAN A · A1–A5',
    title: 'Logika Predikat',
    subtitle: 'Kuantor ∀ & ∃, terjemahan kalimat, negasi, dan jebakan vacuous truth',
    accent: 'cobalt',
  },
  B: {
    id: 'B',
    kicker: 'BAGIAN B · B1–B5',
    title: 'Kombinasi (Pembentukan Tim)',
    subtitle: 'Kombinasi C(n, r), syarat tepat/minimal, komplemen, dan jebakan double counting',
    accent: 'matcha',
  },
  C: {
    id: 'C',
    kicker: 'BAGIAN C · C1–C5',
    title: 'Fungsi Boolean & Tabel Kebenaran',
    subtitle: 'Evaluasi ekspresi, pemodelan sistem, penyederhanaan aljabar, & analisis desain',
    accent: 'terracotta',
  },
};

  const PROBLEMS = [
  // ==========================================================================
  // BAGIAN A — LOGIKA PREDIKAT
  // ==========================================================================
  {
    id: 'A1',
    section: 'A',
    difficulty: 'Dasar',
    accent: 'cobalt',
    layout: 'split',
    title: 'Menerjemahkan Kalimat ke Simbol Logika Predikat',
    question: {
      intro:
        'Domain adalah semua mahasiswa. Didefinisikan $A(x)$: "$x$ mahasiswa angkatan 2026", $P(x)$: "$x$ menguasai Python", dan $L(x)$: "$x$ anggota UKM Linux". Tuliskan pernyataan berikut dalam simbol logika predikat:',
      items: [
        'a. Setiap mahasiswa angkatan 2026 menguasai Python.',
        'b. Beberapa mahasiswa angkatan 2026 adalah anggota UKM Linux.',
        'c. Ada mahasiswa angkatan 2026 yang tidak menguasai Python.',
      ],
    },
    knownAsked: {
      known: [
        'Domain: semua mahasiswa',
        '$A(x)$: angkatan 2026 · $P(x)$: kuasai Python · $L(x)$: UKM Linux',
      ],
      asked: ['Bentuk simbol logika predikat untuk (a), (b), dan (c)'],
    },
    coreFormulas: [
      {
        label: 'Pola Kuantor Universal (Setiap)',
        latex: '$\\forall x \\,(A(x) \\to B(x))$',
        note: 'Kata "setiap / semua" selalu berpasangan dengan implikasi ($\\to$).',
      },
      {
        label: 'Pola Kuantor Eksistensial (Ada / Beberapa)',
        latex: '$\\exists x \\,(A(x) \\land B(x))$',
        note: 'Kata "ada / beberapa" selalu berpasangan dengan konjungsi ($\\land$).',
      },
    ],
    copyText:
      'SOAL A1 — Logika Predikat (Dasar)\n' +
      'Rumus Inti:\n' +
      '- Setiap A adalah B  =>  ∀x (A(x) → B(x))\n' +
      '- Beberapa/Ada A adalah B  =>  ∃x (A(x) ∧ B(x))\n' +
      'Jawaban:\n' +
      'a. ∀x (A(x) → P(x))\n' +
      'b. ∃x (A(x) ∧ L(x))\n' +
      'c. ∃x (A(x) ∧ ¬P(x))',
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Kata kunci "Setiap"',
          body: 'Gunakan $\\forall x$ dan implikasi $\\to$: jika mahasiswa angkatan 2026, maka menguasai Python $\\implies \\forall x\\,(A(x) \\to P(x))$.',
        },
        {
          heading: 'Poin (b) — Kata kunci "Beberapa"',
          body: 'Gunakan $\\exists x$ dan konjungsi $\\land$: ada mahasiswa yang angkatan 2026 sekaligus anggota UKM Linux $\\implies \\exists x\\,(A(x) \\land L(x))$.',
        },
        {
          heading: 'Poin (c) — Kata kunci "Ada ... yang tidak"',
          body: 'Gunakan $\\exists x$, $\\land$, dan negasi $\\neg$ pada $P(x)$ $\\implies \\exists x\\,(A(x) \\land \\neg P(x))$.',
        },
      ],
      detail: [
        {
          heading: 'Pahami pasangan wajib kuantor',
          body: 'Ingat rumus anti-salah di Matematika Diskrit: <strong>$\\forall$ gandengannya $\\to$</strong>, sedangkan <strong>$\\exists$ gandengannya $\\land$</strong>. Kenapa? Karena domainnya adalah <em>semua mahasiswa</em> (bukan hanya angkatan 2026), jadi kita harus menyaring subjeknya dulu dengan $A(x)$.',
        },
        {
          heading: 'Terjemahkan poin (a)',
          body: '"Setiap mahasiswa angkatan 2026 menguasai Python" artinya: untuk setiap mahasiswa $x$, <em>jika</em> $x$ angkatan 2026 maka $x$ menguasai Python. Jadi ditulis $\\forall x\\,(A(x) \\to P(x))$.',
        },
        {
          heading: 'Terjemahkan poin (b)',
          body: '"Beberapa mahasiswa angkatan 2026 adalah anggota UKM Linux" artinya: terdapat minimal satu mahasiswa $x$ yang memenuhi dua syarat sekaligus—dia angkatan 2026 <em>dan</em> anggota UKM Linux. Jadi ditulis $\\exists x\\,(A(x) \\land L(x))$.',
        },
        {
          heading: 'Terjemahkan poin (c)',
          body: '"Ada mahasiswa angkatan 2026 yang tidak menguasai Python" sama polanya dengan (b), bedanya predikat kedua dinegasikan ("tidak menguasai Python" $= \\neg P(x)$). Maka hasilnya $\\exists x\\,(A(x) \\land \\neg P(x))$.',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '$\\forall x\\,(A(x) \\to P(x))$' },
      { part: 'b', text: '$\\exists x\\,(A(x) \\land L(x))$' },
      { part: 'c', text: '$\\exists x\\,(A(x) \\land \\neg P(x))$' },
    ],
  },

  {
    id: 'A2',
    section: 'A',
    difficulty: 'Dasar',
    accent: 'cobalt',
    layout: 'split',
    title: 'Membaca Simbol Logika ke Bahasa Indonesia Wajar',
    question: {
      intro:
        'Domain adalah semua mahasiswa. Didefinisikan $M(x)$: "$x$ mengambil mata kuliah Matematika Diskrit", $T(x)$: "$x$ mengumpulkan semua tugas", dan $L(x)$: "$x$ lulus mata kuliah tersebut". Tuliskan arti setiap ekspresi berikut dalam kalimat bahasa Indonesia yang wajar:',
      items: [
        'a. $\\forall x\\,(M(x) \\to T(x))$',
        'b. $\\exists x\\,(M(x) \\land L(x))$',
        'c. $\\exists x\\,(M(x) \\land \\neg T(x))$',
      ],
    },
    knownAsked: {
      known: [
        'Domain: semua mahasiswa',
        '$M(x)$: ambil Matdis · $T(x)$: kumpul semua tugas · $L(x)$: lulus Matdis',
      ],
      asked: ['Terjemahan kalimat bahasa Indonesia yang natural untuk (a), (b), dan (c)'],
    },
    coreFormulas: [
      {
        label: 'Membaca Implikasi Universal',
        latex: '$\\forall x\\,(M(x) \\to T(x))$',
        note: 'Dibaca: "Setiap [subjek M] pasti [predikat T]".',
      },
      {
        label: 'Membaca Konjungsi Eksistensial',
        latex: '$\\exists x\\,(M(x) \\land \\neg T(x))$',
        note: 'Kata $\\land$ diikuti negasi sering lebih natural dibaca "tetapi tidak ...".',
      },
    ],
    copyText:
      'SOAL A2 — Membaca Logika Predikat (Dasar)\n' +
      'a. Setiap mahasiswa yang mengambil mata kuliah Matematika Diskrit mengumpulkan semua tugas.\n' +
      'b. Ada mahasiswa yang mengambil mata kuliah Matematika Diskrit dan lulus mata kuliah tersebut.\n' +
      'c. Ada mahasiswa yang mengambil mata kuliah Matematika Diskrit tetapi tidak mengumpulkan semua tugas.',
    steps: {
      brief: [
        {
          heading: 'Poin (a)',
          body: '$\\forall x\\,(M(x) \\to T(x))$ berarti semua pengambil Matematika Diskrit mengumpulkan seluruh tugas.',
        },
        {
          heading: 'Poin (b)',
          body: '$\\exists x\\,(M(x) \\land L(x))$ berarti terdapat minimal satu mahasiswa yang mengambil sekaligus lulus Matematika Diskrit.',
        },
        {
          heading: 'Poin (c)',
          body: '$\\exists x\\,(M(x) \\land \\neg T(x))$ berarti ada pengambil Matematika Diskrit yang tidak mengumpulkan semua tugas.',
        },
      ],
      detail: [
        {
          heading: 'Hindari terjemahan kaku "Untuk setiap x, jika x..."',
          body: 'Soal meminta <em>kalimat bahasa Indonesia yang wajar</em>. Jadi jangan berhenti di terjemahan mentah per simbol—gabungkan jadi kalimat yang enak dibaca seperti kalimat sehari-hari.',
        },
        {
          heading: 'Bedah poin (a): $\\forall x\\,(M(x) \\to T(x))$',
          body: 'Mentahnya: "Untuk setiap mahasiswa $x$, jika $x$ mengambil Matdis maka $x$ mengumpulkan semua tugas." Versi naturalnya: <strong>"Setiap mahasiswa yang mengambil mata kuliah Matematika Diskrit mengumpulkan semua tugas."</strong>',
        },
        {
          heading: 'Bedah poin (b): $\\exists x\\,(M(x) \\land L(x))$',
          body: 'Mentahnya: "Terdapat mahasiswa $x$ sehingga $x$ mengambil Matdis dan $x$ lulus." Versi naturalnya: <strong>"Ada (beberapa) mahasiswa yang mengambil mata kuliah Matematika Diskrit dan lulus mata kuliah tersebut."</strong>',
        },
        {
          heading: 'Bedah poin (c): $\\exists x\\,(M(x) \\land \\neg T(x))$',
          body: 'Ada tanda $\\neg T(x)$ ("tidak mengumpulkan semua tugas"). Dalam bahasa Indonesia, $\\land$ sebelum bentuk negatif sangat pas diterjemahkan dengan kata "tetapi" atau "yang tidak": <strong>"Ada mahasiswa yang mengambil mata kuliah Matematika Diskrit tetapi tidak mengumpulkan semua tugas."</strong>',
        },
      ],
    },
    finalAnswer: [
      {
        part: 'a',
        text: '"Setiap mahasiswa yang mengambil mata kuliah Matematika Diskrit mengumpulkan semua tugas."',
      },
      {
        part: 'b',
        text: '"Ada (beberapa) mahasiswa yang mengambil mata kuliah Matematika Diskrit dan lulus mata kuliah tersebut."',
      },
      {
        part: 'c',
        text: '"Ada mahasiswa yang mengambil mata kuliah Matematika Diskrit tetapi tidak mengumpulkan semua tugas."',
      },
    ],
  },

  {
    id: 'A3',
    section: 'A',
    difficulty: 'Sedang',
    accent: 'cobalt',
    layout: 'editorial',
    title: 'Predikat Majemuk & Pernyataan "Tidak Ada"',
    question: {
      intro:
        'Domain adalah semua mahasiswa. Didefinisikan $K(x)$: "$x$ mahasiswa Teknik Informatika", $W(x)$: "$x$ menguasai pemrograman web", dan $G(x)$: "$x$ anggota komunitas Game Developer". Tuliskan pernyataan berikut dalam simbol logika predikat:',
      items: [
        'a. Semua anggota komunitas Game Developer adalah mahasiswa Teknik Informatika yang menguasai pemrograman web.',
        'b. Ada mahasiswa Teknik Informatika yang menguasai pemrograman web tetapi bukan anggota komunitas Game Developer.',
        'c. Tidak ada mahasiswa Teknik Informatika anggota komunitas Game Developer yang tidak menguasai pemrograman web.',
      ],
    },
    knownAsked: {
      known: [
        '$K(x)$: mahasiswa TI',
        '$W(x)$: kuasai pemrograman web · $G(x)$: komunitas Game Dev',
      ],
      asked: ['Simbol logika predikat untuk pernyataan majemuk (a), (b), dan (c)'],
    },
    coreFormulas: [
      {
        label: 'Pola "Tidak ada A yang B"',
        latex: '$\\neg \\exists x\\,(A(x) \\land B(x)) \\;\\equiv\\; \\forall x\\,(A(x) \\to \\neg B(x))$',
        note: 'Keduanya benar & setara secara logika! Pilih yang paling jelas, atau tulis keduanya.',
      },
    ],
    copyText:
      'SOAL A3 — Predikat Majemuk (Sedang)\n' +
      'Rumus "Tidak ada A yang B": ¬∃x (A(x) ∧ B(x)) ≡ ∀x (A(x) → ¬B(x))\n' +
      'Jawaban:\n' +
      'a. ∀x (G(x) → (K(x) ∧ W(x)))\n' +
      'b. ∃x (K(x) ∧ W(x) ∧ ¬G(x))\n' +
      'c. ¬∃x (K(x) ∧ G(x) ∧ ¬W(x))  ≡  ∀x ((K(x) ∧ G(x)) → W(x))',
    steps: {
      brief: [
        {
          heading: 'Poin (a)',
          body: 'Subjek = $G(x)$, konsekuen = $K(x) \\land W(x)$ $\\implies \\forall x\\,(G(x) \\to (K(x) \\land W(x)))$.',
        },
        {
          heading: 'Poin (b)',
          body: 'Tiga syarat sekaligus pakai $\\land$ dengan $\\neg G(x)$ $\\implies \\exists x\\,(K(x) \\land W(x) \\land \\neg G(x))$.',
        },
        {
          heading: 'Poin (c)',
          body: '"Tidak ada ($K \\land G$) yang $\\neg W$" $\\implies \\neg\\exists x\\,(K(x) \\land G(x) \\land \\neg W(x))$, setara dengan $\\forall x\\,((K(x) \\land G(x)) \\to W(x))$.',
        },
      ],
      detail: [
        {
          heading: 'Poin (a) — Pisahkan syarat depan & belakang',
          body: 'Siapa yang dibahas? "Semua anggota komunitas Game Developer" ($G(x)$). Apa sifat mereka? Dua hal sekaligus: mahasiswa TI ($K(x)$) <em>dan</em> menguasai web ($W(x)$). Jangan lupa tanda kurung di kanan panah: $\\forall x\\,(G(x) \\to (K(x) \\land W(x)))$.',
        },
        {
          heading: 'Poin (b) — Kata "tetapi bukan" tetap berarti DAN',
          body: 'Dalam logika, kata "tetapi" sama dengan "dan" ($\\land$). Jadi ada $x$ yang memenuhi tiga kondisi: $K(x)$, $W(x)$, dan bukan $G(x)$ ($\\neg G(x)$). Hasilnya: $\\exists x\\,(K(x) \\land W(x) \\land \\neg G(x))$.',
        },
        {
          heading: 'Poin (c) — Negasi ganda yang sering mengecoh',
          body: 'Terjemahan langsung dari "Tidak ada [mahasiswa TI anggota Game Dev] yang [tidak menguasai web]" adalah $\\neg \\exists x\\,(K(x) \\land G(x) \\land \\neg W(x))$. Jika kita dorong tanda $\\neg$ ke dalam memakai De Morgan, ini setara persis dengan $\\forall x\\,((K(x) \\land G(x)) \\to W(x))$ ("Setiap mahasiswa TI anggota Game Dev pasti menguasai web").',
          tip: 'Pro-tip ujian: tulis bentuk langsungnya $\\neg\\exists x\\,(K(x) \\land G(x) \\land \\neg W(x))$ sekaligus bentuk ekuivalennya $\\forall x\\,((K(x) \\land G(x)) \\to W(x))$ biar dosen langsung lihat kamu paham penuh!',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '$\\forall x\\,(G(x) \\to (K(x) \\land W(x)))$' },
      { part: 'b', text: '$\\exists x\\,(K(x) \\land W(x) \\land \\neg G(x))$' },
      {
        part: 'c',
        text: '$\\neg\\exists x\\,(K(x) \\land G(x) \\land \\neg W(x))$ &nbsp;atau setara dengan&nbsp; $\\forall x\\,((K(x) \\land G(x)) \\to W(x))$',
      },
    ],
  },

  {
    id: 'A4',
    section: 'A',
    difficulty: 'Sedang',
    accent: 'cobalt',
    layout: 'editorial',
    title: 'Negasi Kuantor hingga Tanda ¬ di Depan Predikat',
    question: {
      intro:
        'Domain adalah semua mahasiswa. Didefinisikan $S(x)$: "$x$ mahasiswa semester 1", $C(x)$: "$x$ menguasai C++", dan $E(x)$: "$x$ anggota UKM E-Sport". Untuk setiap pernyataan berikut: (1) tuliskan dalam simbol logika predikat, (2) tentukan negasinya dalam simbol sampai tanda $\\neg$ berada tepat di depan predikat, dan (3) tuliskan negasi tersebut dalam kalimat.',
      items: [
        'a. Setiap mahasiswa semester 1 menguasai C++.',
        'b. Beberapa mahasiswa semester 1 adalah anggota UKM E-Sport.',
      ],
    },
    knownAsked: {
      known: ['$S(x)$: sem 1 · $C(x)$: kuasai C++ · $E(x)$: UKM E-Sport'],
      asked: ['(1) Simbol awal, (2) Negasi simbol hingga $\\neg$ di depan predikat, (3) Kalimat negasi'],
    },
    coreFormulas: [
      {
        label: 'Negasi Kuantor (De Morgan Kuantor)',
        latex: '$\\neg\\forall x\\,P(x) \\equiv \\exists x\\,\\neg P(x) \\quad\\text{dan}\\quad \\neg\\exists x\\,P(x) \\equiv \\forall x\\,\\neg P(x)$',
        note: 'Tanda $\\neg$ melewati kuantor akan membalik $\\forall \\leftrightarrow \\exists$.',
      },
      {
        label: 'Negasi Implikasi & Konjungsi',
        latex: '$\\neg(p \\to q) \\equiv p \\land \\neg q \\quad\\text{dan}\\quad \\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$',
        note: 'Wajib hafal! $\\neg(p \\to q)$ BUKAN $\\neg p \\to \\neg q$.',
      },
    ],
    copyText:
      'SOAL A4 — Negasi Kuantor (Sedang)\n' +
      'Rumus: ¬∀x P(x) ≡ ∃x ¬P(x) | ¬∃x P(x) ≡ ∀x ¬P(x) | ¬(p → q) ≡ p ∧ ¬q\n' +
      'a. (1) ∀x (S(x) → C(x))\n' +
      '   (2) ∃x (S(x) ∧ ¬C(x))\n' +
      '   (3) Ada mahasiswa semester 1 yang tidak menguasai C++.\n' +
      'b. (1) ∃x (S(x) ∧ E(x))\n' +
      '   (2) ∀x (¬S(x) ∨ ¬E(x))  [setara: ∀x (S(x) → ¬E(x))]\n' +
      '   (3) Setiap mahasiswa semester 1 bukan anggota UKM E-Sport (atau: Tidak ada mahasiswa semester 1 yang merupakan anggota UKM E-Sport).',
    steps: {
      brief: [
        {
          heading: 'Poin (a)',
          body: '(1) $\\forall x\\,(S(x)\\to C(x))$. (2) $\\neg\\forall x\\,(S(x)\\to C(x)) \\equiv \\exists x\\,\\neg(S(x)\\to C(x)) \\equiv \\exists x\\,(S(x) \\land \\neg C(x))$. (3) "Ada mahasiswa semester 1 yang tidak menguasai C++."',
        },
        {
          heading: 'Poin (b)',
          body: '(1) $\\exists x\\,(S(x)\\land E(x))$. (2) $\\neg\\exists x\\,(S(x)\\land E(x)) \\equiv \\forall x\\,\\neg(S(x)\\land E(x)) \\equiv \\forall x\\,(\\neg S(x) \\lor \\neg E(x)) \\equiv \\forall x\\,(S(x) \\to \\neg E(x))$. (3) "Setiap mahasiswa semester 1 bukan anggota UKM E-Sport."',
        },
      ],
      detail: [
        {
          heading: 'Poin (a) — Langkah penurunan negasi',
          body: '<p>(1) Simbol awal: $\\forall x\\,(S(x) \\to C(x))$.</p>' +
            '<p>(2) Turunkan tanda $\\neg$ langkah demi langkah:</p>' +
            '<div class="math-scroll">$$\\neg\\forall x\\,(S(x) \\to C(x)) \\equiv \\exists x\\,\\neg(S(x) \\to C(x)) \\equiv \\exists x\\,\\neg(\\neg S(x) \\lor C(x)) \\equiv \\exists x\\,(S(x) \\land \\neg C(x))$$</div>' +
            '<p>Sekarang tanda $\\neg$ sudah menempel tepat di depan predikat $C(x)$!</p>' +
            '<p>(3) Kalimat: <strong>"Ada mahasiswa semester 1 yang tidak menguasai C++."</strong></p>',
        },
        {
          heading: 'Poin (b) — Langkah penurunan negasi',
          body: '<p>(1) Simbol awal: $\\exists x\\,(S(x) \\land E(x))$.</p>' +
            '<p>(2) Turunkan tanda $\\neg$ langkah demi langkah:</p>' +
            '<div class="math-scroll">$$\\neg\\exists x\\,(S(x) \\land E(x)) \\equiv \\forall x\\,\\neg(S(x) \\land E(x)) \\equiv \\forall x\\,(\\neg S(x) \\lor \\neg E(x))$$</div>' +
            '<p>Perhatikan bahwa $\\neg S(x) \\lor \\neg E(x)$ juga setara dengan $S(x) \\to \\neg E(x)$ (definisi implikasi), di mana tanda $\\neg$ juga tepat di depan predikat.</p>' +
            '<p>(3) Kalimat: <strong>"Setiap mahasiswa semester 1 bukan anggota UKM E-Sport"</strong> (atau: <em>"Tidak ada mahasiswa semester 1 yang merupakan anggota UKM E-Sport"</em>).</p>',
        },
      ],
    },
    finalAnswer: [
      {
        part: 'a',
        text: '(1) $\\forall x\\,(S(x) \\to C(x))$ &nbsp;|&nbsp; (2) $\\exists x\\,(S(x) \\land \\neg C(x))$ &nbsp;|&nbsp; (3) "Ada mahasiswa semester 1 yang tidak menguasai C++."',
      },
      {
        part: 'b',
        text: '(1) $\\exists x\\,(S(x) \\land E(x))$ &nbsp;|&nbsp; (2) $\\forall x\\,(\\neg S(x) \\lor \\neg E(x))$ atau $\\forall x\\,(S(x) \\to \\neg E(x))$ &nbsp;|&nbsp; (3) "Setiap mahasiswa semester 1 bukan anggota UKM E-Sport."',
      },
    ],
  },

  {
    id: 'A5',
    section: 'A',
    difficulty: 'HOTS',
    accent: 'cobalt',
    layout: 'hots',
    title: 'Analisis Kesalahan Kuantor (Kasus Rina & Vacuous Truth)',
    question: {
      intro:
        'Domain $D = \\{\\text{Ari, Bima, Citra, Dina, Eko}\\}$. $S(x)$: sem 1, $P(x)$: kuasai Python, $L(x)$: UKM Linux. Rina menerjemahkan (i) "Setiap mahasiswa sem 1 adalah anggota UKM Linux" menjadi $\\forall x\\,(S(x) \\land L(x))$, dan (ii) "Beberapa mahasiswa sem 1 menguasai Python" menjadi $\\exists x\\,(S(x) \\to P(x))$.',
      items: [
        'a. Tentukan nilai kebenaran $\\forall x\\,(S(x) \\to L(x))$ dan $\\forall x\\,(S(x) \\land L(x))$ pada data awal. Apa kesimpulanmu tentang terjemahan (i)?',
        'b. Jika Ari dan Citra tidak lagi menguasai Python ($P=0$), tentukan nilai kebenaran $\\exists x\\,(S(x) \\land P(x))$ dan $\\exists x\\,(S(x) \\to P(x))$. Bentuk mana yang sesuai kalimat (ii)? Jelaskan.',
        'c. Rumuskan aturan umum: kapan memakai $\\to$ dan kapan memakai $\\land$ bersama $\\forall$ dan $\\exists$?',
      ],
    },
    knownAsked: {
      known: [
        'Data awal: Ari(1,1,1), Bima(1,0,1), Citra(1,1,1), Dina(0,1,0), Eko(0,0,0)',
        'Data baru (poin b): $P(\\text{Ari}) = 0$, $P(\\text{Citra}) = 0$',
      ],
      asked: [
        'Evaluasi nilai kebenaran (a) & (b)',
        'Pembuktian kenapa terjemahan Rina keliru & aturan umum (c)',
      ],
    },
    coreFormulas: [
      {
        label: 'Aturan Emas Pasangan Kuantor',
        latex: '$\\forall x\\,(A(x) \\to B(x)) \\quad\\text{vs}\\quad \\exists x\\,(A(x) \\land B(x))$',
        note: 'Implikasi $0 \\to 0 = 1$ dan $0 \\to 1 = 1$ (vacuously true) — inilah biang keladi jebakan soal ini!',
      },
    ],
    copyText:
      'SOAL A5 — Analisis Kesalahan Kuantor (HOTS)\n' +
      'a. Data awal: ∀x(S(x)→L(x)) = BENAR (1), ∀x(S(x)∧L(x)) = SALAH (0) (gagal di Dina & Eko). Terjemahan (i) Rina SALAH.\n' +
      'b. Data baru (P(Ari)=0, P(Citra)=0): ∃x(S(x)∧P(x)) = SALAH (0), ∃x(S(x)→P(x)) = BENAR (1) (karena Dina & Eko S=0 membuat 0→P bernilai 1). Yang benar adalah ∃x(S(x)∧P(x)).\n' +
      'c. Aturan umum: ∀ berpasangan dengan → (pembatasan domain universal); ∃ berpasangan dengan ∧ (syarat eksistensi simultan).',
    tables: [
      {
        caption: 'Evaluasi Poin (a) — Data Awal & Poin (b) — Data Baru (P Ari & Citra = 0)',
        headers: ['Mahasiswa', 'S(x)', 'L(x)', 'S→L', 'S∧L', 'P baru', 'S∧P baru', 'S→P baru'],
        rows: [
          { cells: ['Ari', '1', '1', '1', '1', '0', '0', '0'] },
          { cells: ['Bima', '1', '1', '1', '1', '0', '0', '0'] },
          { cells: ['Citra', '1', '1', '1', '1', '0', '0', '0'] },
          { cells: ['Dina', '0', '0', '1', '0', '1', '0', '1'], highlight: 'diff' },
          { cells: ['Eko', '0', '0', '1', '0', '0', '0', '1'], highlight: 'diff' },
        ],
      },
    ],
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Cek data awal',
          body: '$\\forall x\\,(S(x)\\to L(x)) = \\text{BENAR (1)}$ karena semua yang $S=1$ punya $L=1$, dan Dina/Eko ($S=0$) bernilai $0\\to 0 = 1$. Sebaliknya $\\forall x\\,(S(x)\\land L(x)) = \\text{SALAH (0)}$ karena Dina dan Eko punya $S=0$. Jadi terjemahan (i) Rina <strong>salah</strong>.',
        },
        {
          heading: 'Poin (b) — Cek data baru',
          body: 'Setelah $P(\\text{Ari})=0$ dan $P(\\text{Citra})=0$, tidak ada satu pun mhs sem 1 yang bisa Python. $\\exists x\\,(S(x)\\land P(x)) = \\text{SALAH (0)}$ (sesuai kenyataan!). Sedangkan $\\exists x\\,(S(x)\\to P(x)) = \\text{BENAR (1)}$ hanya karena Dina & Eko bukan sem 1 ($0\\to P = 1$). Jadi bentuk yang tepat adalah $\\exists x\\,(S(x)\\land P(x))$.',
        },
        {
          heading: 'Poin (c) — Aturan umum',
          body: 'Pakai $\\to$ bersama $\\forall$ untuk membatasi subjek ("Setiap $A$ adalah $B$"). Pakai $\\land$ bersama $\\exists$ untuk menyatakan keberadaan subjek dengan dua sifat sekaligus ("Ada $A$ yang $B$").',
        },
      ],
      detail: [
        {
          heading: 'Bedah poin (a): Kenapa $\\forall x\\,(S(x) \\land L(x))$ terlalu keras?',
          body: 'Pada data awal, semua mahasiswa semester 1 (Ari, Bima, Citra) memang anggota UKM Linux ($L=1$), jadi kalimat "Setiap mahasiswa semester 1 adalah anggota UKM Linux" seharusnya <strong>BENAR</strong>. Ketika kita cek $\\forall x\\,(S(x) \\to L(x))$, hasilnya <strong>BENAR (1)</strong> karena untuk Dina dan Eko ($S=0$), implikasi $0 \\to 0$ bernilai $1$ (tidak melanggar aturan). Tapi pada rumus Rina $\\forall x\\,(S(x) \\land L(x))$, rumus itu memaksa <em>semua orang di domain</em> (termasuk Dina dan Eko!) harus semester 1 sekaligus UKM Linux—padahal mereka bukan semester 1! Akibatnya nilainya <strong>SALAH (0)</strong>. Kesimpulan: terjemahan (i) Rina keliru.',
        },
        {
          heading: 'Bedah poin (b): Jebakan "Benar Semu" pada $\\exists$ + $\\to$',
          body: 'Saat Ari dan Citra tidak lagi menguasai Python, seluruh mahasiswa sem 1 (Ari, Bima, Citra) punya $P=0$. Artinya kalimat "Beberapa mahasiswa sem 1 menguasai Python" jelas harus bernilai <strong>SALAH</strong>. Rumus $\\exists x\\,(S(x) \\land P(x))$ menghasilkan <strong>SALAH (0)</strong> di semua 5 baris — cocok dengan fakta! Sebaliknya, rumus Rina $\\exists x\\,(S(x) \\to P(x))$ malah menghasilkan <strong>BENAR (1)</strong> hanya karena ada Dina ($0\\to 1=1$) dan Eko ($0\\to 0=1$). Cukup satu orang yang <em>bukan</em> sem 1 untuk membuat rumus Rina selalu benar. Jadi bentuk yang sesuai kalimat (ii) adalah <strong>$\\exists x\\,(S(x) \\land P(x))$</strong>.',
          tip: 'Lihat baris pink (Dina & Eko) di tabel: di situlah letak bukti nyatanya kenapa terjemahan Rina gagal di kedua kasus!',
        },
        {
          heading: 'Rumuskan aturan umum poin (c)',
          body: '<ul><li><strong>$\\forall$ dipasangkan dengan $\\to$</strong>: $\\forall x\\,(A(x) \\to B(x))$. Implikasi berfungsi sebagai filter—elemen di luar $A$ otomatis diabaikan ($0 \\to \\text{apapun} = 1$).</li><li><strong>$\\exists$ dipasangkan dengan $\\land$</strong>: $\\exists x\\,(A(x) \\land B(x))$. Konjungsi memastikan elemen yang ditemukan benar-benar memenuhi syarat $A$ <em>sekaligus</em> sifat $B$.</li></ul>',
        },
      ],
    },
    finalAnswer: [
      {
        part: 'a',
        text: '$\\forall x\\,(S(x) \\to L(x)) = \\textbf{Benar (1)}$, sedangkan $\\forall x\\,(S(x) \\land L(x)) = \\textbf{Salah (0)}$. Terjemahan (i) Rina <strong>salah</strong>; yang benar adalah $\\forall x\\,(S(x) \\to L(x))$.',
      },
      {
        part: 'b',
        text: '$\\exists x\\,(S(x) \\land P(x)) = \\textbf{Salah (0)}$, sedangkan $\\exists x\\,(S(x) \\to P(x)) = \\textbf{Benar (1)}$. Bentuk yang sesuai kalimat (ii) adalah <strong>$\\exists x\\,(S(x) \\land P(x))$</strong>.',
      },
      {
        part: 'c',
        text: 'Gunakan $\\to$ bersama $\\forall$ (membatasi domain tanpa memaksa elemen lain), dan gunakan $\\land$ bersama $\\exists$ (memastikan kedua sifat terpenuhi sekaligus).',
      },
    ],
  },

  // ==========================================================================
  // BAGIAN B — KOMBINASI (PEMBENTUKAN TIM)
  // ==========================================================================
  {
    id: 'B1',
    section: 'B',
    difficulty: 'Dasar',
    accent: 'matcha',
    layout: 'split',
    title: 'Tim Proyek Software House (Tanpa Syarat & Komposisi Tepat)',
    question: {
      intro:
        'Sebuah software house memiliki 7 programmer dan 4 desainer UI. Akan dibentuk tim proyek beranggotakan 3 orang tanpa pembagian jabatan.',
      items: [
        'a. Berapa banyak tim berbeda yang dapat dibentuk tanpa syarat apa pun?',
        'b. Berapa banyak tim yang terdiri atas tepat 2 programmer dan 1 desainer UI?',
      ],
    },
    knownAsked: {
      known: ['7 programmer, 4 desainer UI (total 11 orang)', 'Ukuran tim = 3 orang, urutan tidak penting'],
      asked: ['(a) Banyak tim bebas syarat', '(b) Banyak tim tepat 2 programmer & 1 desainer UI'],
    },
    coreFormulas: [
      {
        label: 'Rumus Kombinasi',
        latex: '$C(n, r) = \\dfrac{n!}{r!\\,(n - r)!}$',
        note: 'Dipakai karena "tanpa pembagian jabatan" artinya urutan pemilihan tidak berpengaruh.',
      },
      {
        label: 'Aturan Perkalian (Pemilihan Bertahap)',
        latex: '$C(n_1, r_1) \\times C(n_2, r_2)$',
        note: 'Kalikan banyak cara memilih dari tiap kelompok.',
      },
    ],
    copyText:
      'SOAL B1 — Kombinasi Tim (Dasar)\n' +
      'Rumus: C(n, r) = n! / (r!(n - r)!)\n' +
      'a. C(11, 3) = (11 × 10 × 9) / (3 × 2 × 1) = 165 tim\n' +
      'b. C(7, 2) × C(4, 1) = 21 × 4 = 84 tim',
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Tanpa syarat',
          body: 'Pilih 3 dari 11 orang: $C(11, 3) = \\frac{11 \\times 10 \\times 9}{3 \\times 2 \\times 1} = 165$ tim.',
        },
        {
          heading: 'Poin (b) — Tepat 2 programmer & 1 desainer UI',
          body: 'Kalikan kedua pilihan: $C(7, 2) \\times C(4, 1) = 21 \\times 4 = 84$ tim.',
        },
      ],
      detail: [
        {
          heading: 'Kenapa pakai Kombinasi, bukan Permutasi?',
          body: 'Ada kata kunci <strong>"tanpa pembagian jabatan"</strong>. Artinya memilih {A, B, C} sama saja dengan {C, B, A}. Jadi kita pakai kombinasi $C(n, r)$.',
        },
        {
          heading: 'Hitung poin (a)',
          body: 'Total kandidat = $7 + 4 = 11$ orang. Kita pilih 3 orang bebas:' +
            '<div class="math-scroll">$$C(11, 3) = \\frac{11!}{3!\\,8!} = \\frac{11 \\times 10 \\times 9}{3 \\times 2 \\times 1} = 11 \\times 5 \\times 3 = 165$$</div>',
        },
        {
          heading: 'Hitung poin (b)',
          body: 'Pilih 2 dari 7 programmer, lalu pilih 1 dari 4 desainer UI. Karena keduanya terjadi bersama-sama (AND), kita kalikan:' +
            '<div class="math-scroll">$$C(7, 2) = \\frac{7 \\times 6}{2} = 21, \\quad C(4, 1) = 4 \\implies 21 \\times 4 = 84$$</div>',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '<strong>165 tim</strong>' },
      { part: 'b', text: '<strong>84 tim</strong>' },
    ],
  },

  {
    id: 'B2',
    section: 'B',
    difficulty: 'Dasar',
    accent: 'matcha',
    layout: 'split',
    title: 'Tim Hackathon (Tepat 2 Backend & Tanpa Backend)',
    question: {
      intro:
        'Dari 5 frontend developer dan 3 backend developer akan dipilih 4 orang untuk mengikuti hackathon, tanpa pembagian jabatan.',
      items: [
        'a. Hitung banyak tim yang memuat tepat 2 backend developer.',
        'b. Hitung banyak tim yang tidak memuat backend developer sama sekali.',
      ],
    },
    knownAsked: {
      known: ['5 frontend, 3 backend (total 8 orang)', 'Tim = 4 orang tanpa jabatan'],
      asked: ['(a) Tepat 2 backend (otomatis 2 frontend)', '(b) 0 backend (otomatis 4 frontend)'],
    },
    coreFormulas: [
      {
        label: 'Komposisi Tim Lengkap',
        latex: '$C(n_{\\text{BE}}, k) \\times C(n_{\\text{FE}}, 4 - k)$',
        note: 'Jangan lupa selalu isi sisa kuota tim ($4 - k$) dari kelompok satunya!',
      },
    ],
    copyText:
      'SOAL B2 — Tim Hackathon (Dasar)\n' +
      'a. Tepat 2 backend & 2 frontend: C(3, 2) × C(5, 2) = 3 × 10 = 30 tim\n' +
      'b. 0 backend & 4 frontend: C(3, 0) × C(5, 4) = 1 × 5 = 5 tim',
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Tepat 2 backend',
          body: 'Berarti 2 backend dan 2 frontend: $C(3, 2) \\times C(5, 2) = 3 \\times 10 = 30$ tim.',
        },
        {
          heading: 'Poin (b) — Tanpa backend',
          body: 'Berarti 0 backend dan 4 frontend: $C(3, 0) \\times C(5, 4) = 1 \\times 5 = 5$ tim.',
        },
      ],
      detail: [
        {
          heading: 'Hitung poin (a)',
          body: 'Karena total anggota tim adalah 4 orang dan tepat 2 di antaranya backend, maka 2 slot sisanya <strong>wajib</strong> diisi frontend developer:' +
            '<div class="math-scroll">$$C(3, 2) \\times C(5, 2) = 3 \\times \\frac{5 \\times 4}{2} = 3 \\times 10 = 30$$</div>',
        },
        {
          heading: 'Hitung poin (b)',
          body: 'Tidak memuat backend sama sekali berarti $0$ backend dan seluruh $4$ anggota diambil dari 5 frontend developer:' +
            '<div class="math-scroll">$$C(3, 0) \\times C(5, 4) = 1 \\times 5 = 5$$</div>',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '<strong>30 tim</strong>' },
      { part: 'b', text: '<strong>5 tim</strong>' },
    ],
  },

  {
    id: 'B3',
    section: 'B',
    difficulty: 'Sedang',
    accent: 'matcha',
    layout: 'editorial',
    title: 'Tim Audit Jaringan: Metode Komplemen vs Penjumlahan Kasus',
    question: {
      intro:
        'Dari 7 network engineer dan 4 security analyst akan dibentuk tim audit jaringan beranggotakan 4 orang tanpa pembagian jabatan.',
      items: [
        'a. Hitung banyak tim yang memuat paling sedikit satu security analyst dengan cara komplemen.',
        'b. Hitung kembali jawaban (a) dengan menjumlahkan kasus tepat 1, 2, 3, dan 4 security analyst. Apakah hasilnya sama?',
      ],
    },
    knownAsked: {
      known: ['7 network engineer (NE), 4 security analyst (SA)', 'Total = 11 orang, dipilih 4 orang'],
      asked: ['(a) Minimal 1 SA via komplemen', '(b) Verifikasi via jumlah kasus 1, 2, 3, 4 SA'],
    },
    coreFormulas: [
      {
        label: 'Aturan Komplemen ("Paling Sedikit 1")',
        latex: '$\\text{Minimal } 1 = \\text{Total Semua} - \\text{Kasus } 0$',
        note: 'Jauh lebih cepat daripada menghitung satu per satu semua kasus!',
      },
      {
        label: 'Aturan Penjumlahan (Kasus Saling Lepas)',
        latex: '$\\sum_{k=1}^{4} C(4, k) \\cdot C(7, 4 - k)$',
        note: 'Setiap nilai $k$ (jumlah SA) saling lepas sehingga tinggal dijumlahkan.',
      },
    ],
    copyText:
      'SOAL B3 — Komplemen vs Penjumlahan Kasus (Sedang)\n' +
      'a. Komplemen: C(11, 4) - C(7, 4) = 330 - 35 = 295 tim\n' +
      'b. Penjumlahan kasus:\n' +
      '   - 1 SA, 3 NE: C(4,1)×C(7,3) = 4×35 = 140\n' +
      '   - 2 SA, 2 NE: C(4,2)×C(7,2) = 6×21 = 126\n' +
      '   - 3 SA, 1 NE: C(4,3)×C(7,1) = 4×7  = 28\n' +
      '   - 4 SA, 0 NE: C(4,4)×C(7,0) = 1×1  = 1\n' +
      '   Total = 140 + 126 + 28 + 1 = 295 tim (SAMA!)',
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Cara komplemen',
          body: 'Total tim $C(11, 4) = 330$. Tim tanpa SA (4 NE) $= C(7, 4) = 35$. Maka minimal 1 SA $= 330 - 35 = 295$ tim.',
        },
        {
          heading: 'Poin (b) — Jumlahkan kasus 1, 2, 3, 4 SA',
          body: '$140 + 126 + 28 + 1 = 295$ tim. Ya, hasilnya <strong>sama persis</strong>!',
        },
      ],
      detail: [
        {
          heading: 'Poin (a) — Hitung cepat dengan komplemen',
          body: 'Lawan dari "paling sedikit 1 security analyst" adalah "0 security analyst" (semua 4 anggota berasal dari 7 network engineer):' +
            '<div class="math-scroll">$$C(11, 4) = \\frac{11 \\times 10 \\times 9 \\times 8}{4 \\times 3 \\times 2 \\times 1} = 330$$</div>' +
            '<div class="math-scroll">$$C(7, 4) = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35 \\implies 330 - 35 = 295 \\text{ tim}$$</div>',
        },
        {
          heading: 'Poin (b) — Rinci semua kasus (1, 2, 3, 4 SA)',
          body: '<ul>' +
            '<li><strong>Tepat 1 SA, 3 NE:</strong> $C(4, 1) \\times C(7, 3) = 4 \\times 35 = 140$</li>' +
            '<li><strong>Tepat 2 SA, 2 NE:</strong> $C(4, 2) \\times C(7, 2) = 6 \\times 21 = 126$</li>' +
            '<li><strong>Tepat 3 SA, 1 NE:</strong> $C(4, 3) \\times C(7, 1) = 4 \\times 7 = 28$</li>' +
            '<li><strong>Tepat 4 SA, 0 NE:</strong> $C(4, 4) \\times C(7, 0) = 1 \\times 1 = 1$</li>' +
            '</ul>' +
            '<p>Jumlahkan semuanya: $140 + 126 + 28 + 1 = \\mathbf{295}$ tim. Hasilnya <strong>sama persis</strong> dengan cara komplemen (sekaligus membuktikan identitas Vandermonde!).</p>',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '<strong>295 tim</strong> (dari $330 - 35$)' },
      { part: 'b', text: '<strong>295 tim</strong> ($140 + 126 + 28 + 1$). <strong>Ya, hasilnya sama.</strong>' },
    ],
  },

  {
    id: 'B4',
    section: 'B',
    difficulty: 'Sedang',
    accent: 'matcha',
    layout: 'editorial',
    title: 'Panitia Dies Natalis: Minimal 2 & Mayoritas Semester 1',
    question: {
      intro:
        'Panitia Dies Natalis fakultas beranggotakan 5 orang akan dipilih dari 5 mahasiswa semester 1 dan 7 mahasiswa semester 3, tanpa pembagian jabatan.',
      items: [
        'a. Hitung banyak panitia yang memuat paling sedikit 2 mahasiswa semester 1.',
        'b. Hitung banyak panitia yang jumlah mahasiswa semester 1-nya lebih banyak daripada mahasiswa semester 3.',
      ],
    },
    knownAsked: {
      known: ['5 mhs sem 1, 7 mhs sem 3 (total 12 orang)', 'Panitia = 5 orang tanpa jabatan'],
      asked: ['(a) Banyak panitia dengan sem 1 $\\ge 2$', '(b) Banyak panitia dengan sem 1 $>$ sem 3'],
    },
    coreFormulas: [
      {
        label: 'Komplemen Minimal 2',
        latex: '$N(\\ge 2) = C(12, 5) - \\big[N(0) + N(1)\\big]$',
        note: 'Lebih singkat! Cukup kurangi kasus 0 dan 1 mahasiswa semester 1.',
      },
      {
        label: 'Syarat Mayoritas (dari 5 orang)',
        latex: '$\\text{sem 1} > \\text{sem 3} \\iff \\text{sem 1} \\in \\{3, 4, 5\\}$',
        note: 'Dari 5 kursi, mayoritas dimulai dari 3 kursi (3 vs 2, 4 vs 1, 5 vs 0).',
      },
    ],
    copyText:
      'SOAL B4 — Panitia Dies Natalis (Sedang)\n' +
      'a. Minimal 2 mhs sem 1:\n' +
      '   Total C(12,5) = 792 | 0 sem 1: C(7,5) = 21 | 1 sem 1: C(5,1)×C(7,4) = 175\n' +
      '   Hasil = 792 - (21 + 175) = 596 panitia\n' +
      'b. Sem 1 > Sem 3 (3, 4, atau 5 mhs sem 1):\n' +
      '   C(5,3)×C(7,2) + C(5,4)×C(7,1) + C(5,5)×C(7,0) = 210 + 35 + 1 = 246 panitia',
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Komplemen dari kasus 0 & 1 sem 1',
          body: 'Total $C(12, 5) = 792$. Kasus 0 sem 1 $= 21$, kasus 1 sem 1 $= 5 \\times 35 = 175$. Jadi $792 - (21 + 175) = 596$ panitia.',
        },
        {
          heading: 'Poin (b) — Kasus 3, 4, atau 5 sem 1',
          body: '$C(5,3)C(7,2) + C(5,4)C(7,1) + C(5,5)C(7,0) = 210 + 35 + 1 = 246$ panitia.',
        },
      ],
      detail: [
        {
          heading: 'Hitung poin (a) dengan cara komplemen',
          body: '<p>Total semua panitia yang mungkin:</p>' +
            '<div class="math-scroll">$$C(12, 5) = \\frac{12 \\times 11 \\times 10 \\times 9 \\times 8}{5 \\times 4 \\times 3 \\times 2 \\times 1} = 792$$</div>' +
            '<p>Kasus yang <em>tidak</em> memenuhi syarat (kurang dari 2 mhs sem 1):</p>' +
            '<ul><li><strong>0 sem 1, 5 sem 3:</strong> $C(5, 0) \\times C(7, 5) = 1 \\times 21 = 21$</li>' +
            '<li><strong>1 sem 1, 4 sem 3:</strong> $C(5, 1) \\times C(7, 4) = 5 \\times 35 = 175$</li></ul>' +
            '<p>Maka panitia dengan paling sedikit 2 mhs sem 1 $= 792 - (21 + 175) = 792 - 196 = \\mathbf{596}$ panitia.</p>',
        },
        {
          heading: 'Hitung poin (b) — Sem 1 lebih banyak dari Sem 3',
          body: '<p>Karena total panitia 5 orang, agar jumlah sem 1 $>$ sem 3, kemungkinannya adalah (3 sem 1, 2 sem 3), (4 sem 1, 1 sem 3), atau (5 sem 1, 0 sem 3):</p>' +
            '<ul><li><strong>3 sem 1, 2 sem 3:</strong> $C(5, 3) \\times C(7, 2) = 10 \\times 21 = 210$</li>' +
            '<li><strong>4 sem 1, 1 sem 3:</strong> $C(5, 4) \\times C(7, 1) = 5 \\times 7 = 35$</li>' +
            '<li><strong>5 sem 1, 0 sem 3:</strong> $C(5, 5) \\times C(7, 0) = 1 \\times 1 = 1$</li></ul>' +
            '<p>Total $= 210 + 35 + 1 = \\mathbf{246}$ panitia.</p>',
          tip: 'Cek silang cepat: kasus 2 sem 1 = $C(5,2)C(7,3) = 10 \\times 35 = 350$. Lihat: $350 + 246 = 596$ — cocok 100% dengan poin (a)!',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '<strong>596 panitia</strong>' },
      { part: 'b', text: '<strong>246 panitia</strong>' },
    ],
  },

  {
    id: 'B5',
    section: 'B',
    difficulty: 'HOTS',
    accent: 'matcha',
    layout: 'hots',
    title: 'Jebakan Double Counting Rani & Larangan Satu Tim (Andi–Budi)',
    question: {
      intro:
        'Sebuah startup memiliki 5 data scientist (dua di antaranya Andi dan Budi) dan 6 QA tester. Akan dibentuk tim beranggotakan 4 orang tanpa pembagian jabatan.',
      items: [
        'a. Rani menghitung banyak tim dengan minimal 1 QA: pilih 1 QA dulu (6 cara), lalu 3 anggota lain dari 10 sisa ($C(10,3)=120$), hasil $6 \\times 120 = 720$ tim. Periksa jawaban Rani! Jika salah, tunjukkan letak kesalahannya dengan contoh satu tim yang terhitung lebih dari sekali, lalu tentukan jawaban yang benar.',
        'b. Andi dan Budi tidak boleh berada dalam tim yang sama. Hitung banyak tim yang memuat paling sedikit satu QA tester dan memenuhi syarat tersebut.',
      ],
    },
    knownAsked: {
      known: ['5 DS (Andi, Budi, + 3 DS lain) & 6 QA (total 11 orang)', 'Tim = 4 orang tanpa jabatan'],
      asked: ['(a) Audit cara Rani + contoh double counting + hasil benar', '(b) Minimal 1 QA & Andi–Budi tidak satu tim'],
    },
    coreFormulas: [
      {
        label: 'Jawaban Benar (a) — Komplemen',
        latex: '$C(11, 4) - C(5, 4) = 330 - 5 = 325$',
        note: 'Jangan pernah "kunci 1 orang lalu pilih bebas dari sisanya" untuk soal "paling sedikit 1"!',
      },
      {
        label: 'Prinsip Pengurangan Kasus Terlarang (b)',
        latex: '$N(\\text{valid}) = N(\\ge 1\\text{ QA}) - N(\\text{Andi \\& Budi satu tim} \\land \\ge 1\\text{ QA})$',
        note: 'Kunci Andi & Budi di dalam tim, lalu hitung berapa cara melengkapi 2 slot sisa dengan minimal 1 QA.',
      },
    ],
    copyText:
      'SOAL B5 — Double Counting & Larangan Satu Tim (HOTS)\n' +
      'a. Jawaban Rani (720) SALAH (total semua tim saja hanya C(11,4) = 330!).\n' +
      '   Kesalahan: Double counting. Contoh tim {Q1, Q2, D1, D2} terhitung 2 kali (saat Q1 dipilih pertama & saat Q2 dipilih pertama).\n' +
      '   Jawaban benar: C(11,4) - C(5,4) = 330 - 5 = 325 tim.\n' +
      'b. Tim terlarang (Andi & Budi masuk + min 1 QA): C(9,2) - C(3,2) = 36 - 3 = 33 tim.\n' +
      '   Jawaban akhir: 325 - 33 = 292 tim.',
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Audit Rani',
          body: '<strong>SALAH!</strong> Total semua tim dari 11 orang saja cuma $C(11,4) = 330$, mustahil 720. Terjadi <em>double counting</em>: misal tim $\\{Q_1, Q_2, D_1, D_2\\}$ terhitung 2 kali (ketika $Q_1$ dipilih duluan vs ketika $Q_2$ dipilih duluan). Jawaban benar $= C(11,4) - C(5,4) = 330 - 5 = \\mathbf{325}$ tim.',
        },
        {
          heading: 'Poin (b) — Kurangi tim yang memuat Andi & Budi sekaligus',
          body: 'Jika Andi & Budi sama-sama masuk (2 slot terisi), 2 slot sisa dipilih dari 9 orang (3 DS lain + 6 QA) dengan minimal 1 QA: $C(9,2) - C(3,2) = 36 - 3 = 33$ tim. Maka tim valid $= 325 - 33 = \\mathbf{292}$ tim.',
        },
      ],
      detail: [
        {
          heading: 'Poin (a) — Red flag instan & letak kesalahan Rani',
          body: '<p>Cek kewarasan angka dulu: dari 11 orang dipilih 4 orang, total <em>semua</em> tim yang mungkin saja hanya $C(11, 4) = 330$. Jadi angka 720 jelas mustahil!</p>' +
            '<p><strong>Kenapa bisa membengkak?</strong> Cara Rani secara diam-diam memberi "label khusus" pada 1 QA yang dipilih pertama, lalu membiarkan QA lain ikut terpilih lagi di sisa 10 orang. Akibatnya, tim dengan $k$ orang QA ($k \\ge 2$) terhitung sebanyak $k$ kali.</p>' +
            '<p><strong>Contoh konkret:</strong> Tim $\\{Q_1, Q_2, D_1, D_2\\}$ terhitung <strong>2 kali</strong>: (1) memilih $Q_1$ pertama lalu $\\{Q_2, D_1, D_2\\}$ dari sisanya, dan (2) memilih $Q_2$ pertama lalu $\\{Q_1, D_1, D_2\\}$ dari sisanya. Padahal tanpa jabatan, itu tim yang sama persis.</p>' +
            '<p><strong>Jawaban benar (pakai komplemen):</strong> $C(11, 4) - C(5, 4) = 330 - 5 = \\mathbf{325}$ tim.</p>',
        },
        {
          heading: 'Poin (b) — Buang tim terlarang (Andi & Budi bersama)',
          body: '<p>Dari 325 tim yang sudah memenuhi syarat minimal 1 QA, kita buang tim yang melanggar aturan—yaitu tim yang memuat <strong>Andi DAN Budi sekaligus</strong> serta <strong>minimal 1 QA</strong>.</p>' +
            '<p>Kunci Andi &amp; Budi di dalam tim (2 kursi terpakai). Sisa 2 kursi diambil dari 9 orang (3 DS lain + 6 QA):</p>' +
            '<div class="math-scroll">$$\\text{Total cara sisa 2 kursi} = C(9, 2) = 36$$</div>' +
            '<div class="math-scroll">$$\\text{Tanpa QA (2 dari 3 DS lain)} = C(3, 2) = 3$$</div>' +
            '<p>Jadi tim terlarang yang punya minimal 1 QA $= 36 - 3 = 33$ tim.</p>' +
            '<p><strong>Jawaban akhir:</strong> $325 - 33 = \\mathbf{292}$ tim.</p>',
          tip: 'Cek silang cara lain: tim tanpa Andi–Budi $= C(11,4)-C(9,2) = 294$. Dari situ yang 0 QA (4 DS tanpa Andi–Budi bersama) hanya ada $C(5,4)-C(3,2) = 5-3 = 2$ tim. Hasil: $294 - 2 = 292$ tim. Klop!',
        },
      ],
    },
    finalAnswer: [
      {
        part: 'a',
        text: 'Jawaban Rani <strong>salah</strong> karena <em>double counting</em> (contoh: $\\{Q_1, Q_2, D_1, D_2\\}$ terhitung 2 kali). Jawaban yang benar adalah <strong>325 tim</strong>.',
      },
      {
        part: 'b',
        text: '<strong>292 tim</strong> (dari $325 - 33$).',
      },
    ],
  },

  // ==========================================================================
  // BAGIAN C — FUNGSI BOOLEAN DAN TABEL KEBENARAN
  // ==========================================================================
  {
    id: 'C1',
    section: 'C',
    difficulty: 'Dasar',
    accent: 'terracotta',
    layout: 'split',
    title: 'Evaluasi Fungsi Boolean & Tabel Kebenaran 8 Baris',
    question: {
      intro: 'Diberikan fungsi Boolean $F(A, B, C) = A \\cdot (B\' + C)$.',
      items: [
        'a. Hitung nilai $F(1, 0, 0)$, $F(1, 1, 0)$, dan $F(0, 1, 1)$.',
        'b. Buatlah tabel kebenaran lengkap 8 baris untuk $F$.',
        'c. Sebutkan semua kombinasi input yang menghasilkan $F = 1$.',
      ],
    },
    knownAsked: {
      known: ['Fungsi $F(A, B, C) = A \\cdot (B\' + C)$', '3 variabel $\\implies 2^3 = 8$ baris tabel'],
      asked: ['(a) 3 nilai evaluasi', '(b) Tabel kebenaran 8 baris', '(c) Daftar input dengan $F = 1$'],
    },
    coreFormulas: [
      {
        label: 'Aturan Evaluasi Boolean',
        latex: '$1\'=0,\\; 0\'=1 \\quad|\\quad 1\\cdot 1 = 1 \\quad|\\quad 0 + 0 = 0$',
        note: 'Urutan prioritas: Kurung $( ) \\to$ NOT $(\') \\to$ AND $(\\cdot) \\to$ OR $(+)$.',
      },
    ],
    copyText:
      'SOAL C1 — Fungsi Boolean F(A,B,C) = A·(B\' + C) (Dasar)\n' +
      'a. F(1,0,0) = 1 | F(1,1,0) = 0 | F(0,1,1) = 0\n' +
      'c. Kombinasi input dengan F = 1: (1, 0, 0), (1, 0, 1), dan (1, 1, 1).',
    tables: [
      {
        caption: 'Tabel Kebenaran F(A, B, C) = A · (B\' + C) — Baris stabilo kuning: F = 1',
        headers: ['A', 'B', 'C', "B'", "B' + C", 'F = A·(B\' + C)'],
        rows: [
          { cells: ['0', '0', '0', '1', '1', '0'] },
          { cells: ['0', '0', '1', '1', '1', '0'] },
          { cells: ['0', '1', '0', '0', '0', '0'] },
          { cells: ['0', '1', '1', '0', '1', '0'] },
          { cells: ['1', '0', '0', '1', '1', '1'], highlight: 'yes' },
          { cells: ['1', '0', '1', '1', '1', '1'], highlight: 'yes' },
          { cells: ['1', '1', '0', '0', '0', '0'] },
          { cells: ['1', '1', '1', '0', '1', '1'], highlight: 'yes' },
        ],
      },
    ],
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Substitusi langsung',
          body: '$F(1,0,0) = 1\\cdot(1+0) = 1$; $F(1,1,0) = 1\\cdot(0+0) = 0$; $F(0,1,1) = 0\\cdot(0+1) = 0$.',
        },
        {
          heading: 'Poin (b) & (c) — Baca pola cepat',
          body: 'Karena ada faktor $A$ di luar kurung, jika $A=0$ maka $F$ otomatis $0$. Jika $A=1$, kita butuh $B\'+C=1$ (terpenuhi di semua kasus kecuali $B=1, C=0$). Jadi $F=1$ pada $(1,0,0)$, $(1,0,1)$, dan $(1,1,1)$.',
        },
      ],
      detail: [
        {
          heading: 'Poin (a) — Hitung satu per satu',
          body: '<ul>' +
            '<li>$F(1, 0, 0) = 1 \\cdot (0\' + 0) = 1 \\cdot (1 + 0) = 1 \\cdot 1 = \\mathbf{1}$</li>' +
            '<li>$F(1, 1, 0) = 1 \\cdot (1\' + 0) = 1 \\cdot (0 + 0) = 1 \\cdot 0 = \\mathbf{0}$</li>' +
            '<li>$F(0, 1, 1) = 0 \\cdot (1\' + 1) = 0 \\cdot (0 + 1) = 0 \\cdot 1 = \\mathbf{0}$</li>' +
            '</ul>',
        },
        {
          heading: 'Poin (b) — Cara cepat isi tabel 8 baris',
          body: 'Tulis kolom bantu $B\'$ lalu $B\'+C$, baru kalikan (AND) dengan $A$. Trik cepat: 4 baris pertama punya $A=0$, sehingga $0 \\cdot (\\text{apapun})$ pasti $0$! Kamu cuma perlu teliti di 4 baris bawah saat $A=1$.',
        },
        {
          heading: 'Poin (c) — Ambil semua baris dengan $F=1$',
          body: 'Dari tabel di atas (baris ber-stabilo kuning), ada 3 kombinasi input yang menghasilkan $F=1$: <strong>$(1, 0, 0)$, $(1, 0, 1)$, dan $(1, 1, 1)$</strong>.',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '$F(1,0,0) = 1$, &nbsp;$F(1,1,0) = 0$, &nbsp;$F(0,1,1) = 0$' },
      { part: 'b', text: 'Lihat tabel kebenaran 8 baris di atas (kolom $F$: $0, 0, 0, 0, 1, 1, 0, 1$).' },
      { part: 'c', text: '$(1, 0, 0)$, $(1, 0, 1)$, dan $(1, 1, 1)$' },
    ],
  },

  {
    id: 'C2',
    section: 'C',
    difficulty: 'Dasar',
    accent: 'terracotta',
    layout: 'split',
    title: 'Pintu Perpustakaan Digital: Efek Tanda Kurung & Prioritas',
    question: {
      intro:
        'Pintu perpustakaan digital menerima tiga input: $X = 1$ (kartu mahasiswa valid), $Y = 1$ (wajah terverifikasi), dan $Z = 1$ (PIN benar). Rumuskan fungsi Boolean untuk setiap aturan berikut:',
      items: [
        'a. Pintu terbuka ($F_1 = 1$) jika kartu valid dan wajah terverifikasi.',
        'b. Pintu terbuka ($F_2 = 1$) jika kartu valid, atau jika wajah terverifikasi sekaligus PIN benar.',
        'c. Pintu terbuka ($F_3 = 1$) jika PIN benar dan salah satu syarat berikut terpenuhi: kartu valid atau wajah terverifikasi.',
        'd. Hitung $F_2$ dan $F_3$ untuk $X = 1, Y = 0, Z = 0$. Mengapa hasilnya berbeda padahal variabelnya sama?',
      ],
    },
    knownAsked: {
      known: ['$X$: kartu valid · $Y$: wajah terverifikasi · $Z$: PIN benar'],
      asked: ['Rumus $F_1, F_2, F_3$', 'Evaluasi $F_2(1,0,0)$ vs $F_3(1,0,0)$ & alasan perbedaannya'],
    },
    coreFormulas: [
      {
        label: 'Prioritas Operator Boolean',
        latex: '$X + Y \\cdot Z \\;=\\; X + (Y \\cdot Z) \\;\\neq\\; Z \\cdot (X + Y)$',
        note: 'AND ($\\cdot$) lebih kuat dari OR ($+$), mirip perkalian lebih kuat dari penjumlahan!',
      },
    ],
    copyText:
      'SOAL C2 — Pintu Perpustakaan Digital (Dasar)\n' +
      'a. F1 = X·Y\n' +
      'b. F2 = X + Y·Z\n' +
      'c. F3 = Z·(X + Y)\n' +
      'd. Untuk (1,0,0): F2 = 1 + 0·0 = 1, F3 = 0·(1 + 0) = 0.\n' +
      '   Berbeda karena prioritas operator & tanda kurung mengubah struktur syarat: di F2 kartu valid (X=1) sudah cukup; di F3 PIN (Z=1) wajib benar.',
    steps: {
      brief: [
        {
          heading: 'Poin (a), (b), (c)',
          body: '$F_1 = X\\cdot Y$; &nbsp;$F_2 = X + Y\\cdot Z$; &nbsp;$F_3 = Z\\cdot(X + Y)$.',
        },
        {
          heading: 'Poin (d) — Evaluasi & alasan',
          body: '$F_2(1,0,0) = 1 + (0\\cdot 0) = 1$, sedangkan $F_3(1,0,0) = 0\\cdot(1+0) = 0$. Berbeda karena tanda kurung mengubah struktur syarat: di $F_2$, kartu valid ($X=1$) saja sudah cukup; di $F_3$, PIN ($Z=1$) adalah syarat wajib.',
        },
      ],
      detail: [
        {
          heading: 'Terjemahkan aturan (a), (b), (c)',
          body: '<ul>' +
            '<li><strong>(a)</strong> "kartu valid <em>dan</em> wajah terverifikasi" $\\implies F_1 = X \\cdot Y$.</li>' +
            '<li><strong>(b)</strong> "kartu valid, <em>atau</em> (wajah terverifikasi <em>sekaligus</em> PIN benar)" $\\implies F_2 = X + Y \\cdot Z$.</li>' +
            '<li><strong>(c)</strong> "PIN benar <em>dan</em> (kartu valid <em>atau</em> wajah terverifikasi)" $\\implies F_3 = Z \\cdot (X + Y)$.</li>' +
            '</ul>',
        },
        {
          heading: 'Hitung dan bandingkan di $(1, 0, 0)$',
          body: '<p>$F_2(1, 0, 0) = 1 + (0 \\cdot 0) = 1 + 0 = \\mathbf{1}$ (pintu terbuka).</p>' +
            '<p>$F_3(1, 0, 0) = 0 \\cdot (1 + 0) = 0 \\cdot 1 = \\mathbf{0}$ (pintu tetap terkunci).</p>' +
            '<p><strong>Mengapa berbeda?</strong> Walaupun variabelnya sama ($X, Y, Z$), <strong>tanda kurung dan prioritas operator</strong> menentukan mana syarat utama dan mana alternatif. Pada $F_2$, operator AND hanya mengikat $Y$ dan $Z$, sehingga $X=1$ sendirian sudah langsung membuka pintu. Pada $F_3$, tanda kurung mengelompokkan $(X+Y)$ lalu di-AND dengan $Z$, menjadikan $Z=1$ (PIN benar) syarat mutlak yang tidak bisa ditawar.</p>',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '$F_1 = X \\cdot Y$' },
      { part: 'b', text: '$F_2 = X + Y \\cdot Z$' },
      { part: 'c', text: '$F_3 = Z \\cdot (X + Y)$' },
      {
        part: 'd',
        text: '$F_2(1,0,0) = 1$ dan $F_3(1,0,0) = 0$. Berbeda karena tanda kurung &amp; prioritas operator mengubah struktur logika (di $F_2$, $X=1$ sudah cukup; di $F_3$, $Z=1$ wajib).',
      },
    ],
  },

  {
    id: 'C3',
    section: 'C',
    difficulty: 'Sedang',
    accent: 'terracotta',
    layout: 'editorial',
    title: 'Alarm Ruang Server: Model Boolean & Interpretasi Keamanan',
    question: {
      intro:
        'Alarm ruang server menerima tiga input: $S = 1$ (suhu melebihi batas aman), $P = 1$ (pintu dibuka), dan $A = 1$ (kartu akses valid). Alarm berbunyi ($F = 1$) jika suhu melebihi batas aman ATAU pintu dibuka tanpa kartu akses yang valid.',
      items: [
        'a. Rumuskan fungsi Boolean $F$.',
        'b. Buatlah tabel kebenaran lengkap 8 baris untuk $F$.',
        'c. Tentukan nilai $F$ jika $S = 0, P = 1, A = 1$, lalu jelaskan makna hasil tersebut terhadap keamanan ruang server.',
      ],
    },
    knownAsked: {
      known: ['$S$: suhu bahaya · $P$: pintu dibuka · $A$: kartu valid', '"tanpa kartu valid" $= A\'$'],
      asked: ['(a) Rumus $F(S,P,A)$', '(b) Tabel kebenaran 8 baris', '(c) Nilai & makna $F(0,1,1)$'],
    },
    coreFormulas: [
      {
        label: 'Fungsi Alarm Ruang Server',
        latex: '$F(S, P, A) = S + P \\cdot A\'$',
        note: '"Pintu dibuka tanpa kartu valid" = $P \\land \\neg A$ ditulis $P \\cdot A\'$.',
      },
    ],
    copyText:
      'SOAL C3 — Alarm Ruang Server (Sedang)\n' +
      'a. F(S, P, A) = S + P·A\'\n' +
      'c. F(0, 1, 1) = 0 + 1·1\' = 0 + 0 = 0 (alarm diam).\n' +
      '   Makna: Suhu normal & pintu dibuka memakai kartu akses valid (akses resmi/terotorisasi), sehingga alarm tidak perlu berbunyi.',
    tables: [
      {
        caption: 'Tabel Kebenaran F(S, P, A) = S + P·A\' — Baris pink: kasus (c) S=0, P=1, A=1',
        headers: ['S', 'P', 'A', "A'", "P·A'", 'F = S + P·A\''],
        rows: [
          { cells: ['0', '0', '0', '1', '0', '0'] },
          { cells: ['0', '0', '1', '0', '0', '0'] },
          { cells: ['0', '1', '0', '1', '1', '1'], highlight: 'yes' },
          { cells: ['0', '1', '1', '0', '0', '0'], highlight: 'diff' },
          { cells: ['1', '0', '0', '1', '0', '1'], highlight: 'yes' },
          { cells: ['1', '0', '1', '0', '0', '1'], highlight: 'yes' },
          { cells: ['1', '1', '0', '1', '1', '1'], highlight: 'yes' },
          { cells: ['1', '1', '1', '0', '0', '1'], highlight: 'yes' },
        ],
      },
    ],
    steps: {
      brief: [
        {
          heading: 'Poin (a)',
          body: 'Suhu bahaya ($S$) ATAU ($+$) pintu dibuka tanpa kartu valid ($P \\cdot A\'$) $\\implies F = S + P \\cdot A\'$.',
        },
        {
          heading: 'Poin (b)',
          body: 'Alarm bunyi ($F=1$) di seluruh 4 baris saat $S=1$, ditambah 1 baris saat $S=0, P=1, A=0$ (total 5 baris bernilai 1).',
        },
        {
          heading: 'Poin (c)',
          body: '$F(0, 1, 1) = 0 + 1 \\cdot 0 = 0$ (alarm diam). Artinya suhu aman dan pintu dibuka oleh orang berwenang dengan kartu akses valid.',
        },
      ],
      detail: [
        {
          heading: 'Poin (a) — Pecah kalimat pemicu alarm',
          body: 'Ada dua pemicu yang dihubungkan kata <strong>ATAU</strong> ($+$): (1) suhu melebihi batas aman $= S$, (2) pintu dibuka ($P$) <em>tanpa</em> kartu akses valid ($A\'$) $= P \\cdot A\'$. Gabungkan: $F(S, P, A) = S + P \\cdot A\'$.',
        },
        {
          heading: 'Poin (b) — Susun tabel kebenaran 8 baris',
          body: 'Buat kolom bantu $A\'$ dan $P \\cdot A\'$. Perhatikan bahwa saat $S=1$ (4 baris terbawah), $F$ langsung $1$ karena suhu sudah bahaya. Saat $S=0$, alarm hanya bunyi pada $(0, 1, 0)$ yaitu ada penyusupan (pintu dibuka tanpa kartu valid).',
        },
        {
          heading: 'Poin (c) — Evaluasi & interpretasi keamanan',
          body: '<div class="math-scroll">$$F(0, 1, 1) = 0 + 1 \\cdot 1\' = 0 + 1 \\cdot 0 = 0$$</div>' +
            '<p><strong>Makna keamanan:</strong> Alarm tetap <strong>diam ($F = 0$)</strong>. Kondisi $S=0$ menandakan suhu ruang server normal, sementara $P=1, A=1$ berarti pintu memang dibuka tetapi menggunakan kartu akses yang sah/terotorisasi. Sistem bekerja tepat tanpa <em>false alarm</em>.</p>',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '$F(S, P, A) = S + P \\cdot A\'$' },
      { part: 'b', text: 'Lihat tabel 8 baris di atas (kolom $F$: $0, 0, 1, 0, 1, 1, 1, 1$).' },
      {
        part: 'c',
        text: '$F(0, 1, 1) = 0$ (alarm diam). Maknanya: suhu normal dan akses pintu dilakukan secara sah menggunakan kartu valid.',
      },
    ],
  },

  {
    id: 'C4',
    section: 'C',
    difficulty: 'Sedang',
    accent: 'terracotta',
    layout: 'editorial',
    title: 'Penyederhanaan Aljabar Boolean (Peminjaman Alat Lab)',
    question: {
      intro:
        'Peminjaman alat lab jaringan memakai input: $M = 1$ (terdaftar peserta praktikum), $S = 1$ (sudah pelatihan keselamatan), $T = 1$ (didampingi asisten). Alat boleh dipinjam ($G = 1$) jika mahasiswa terdaftar dan sudah mengikuti pelatihan keselamatan, atau jika mahasiswa terdaftar, belum mengikuti pelatihan keselamatan, tetapi didampingi asisten.',
      items: [
        'a. Tuliskan fungsi Boolean $G$ sesuai kalimat aturan di atas, tanpa disederhanakan.',
        'b. Sederhanakan $G$ menggunakan hukum-hukum aljabar Boolean. Sebutkan hukum yang dipakai pada setiap langkah.',
        'c. Buktikan dengan tabel kebenaran 8 baris bahwa bentuk awal dan bentuk sederhana $G$ setara.',
      ],
    },
    knownAsked: {
      known: ['$M$: terdaftar · $S$: pelatihan K3 · $T$: didampingi asisten'],
      asked: ['(a) Bentuk awal $G$', '(b) Penyederhanaan + nama hukum tiap langkah', '(c) Bukti tabel 8 baris'],
    },
    coreFormulas: [
      {
        label: 'Hukum Kunci Penyederhanaan',
        latex: '$S + S\' \\cdot T = (S + S\')(S + T) = 1 \\cdot (S + T) = S + T$',
        note: 'Hukum Distributif + Komplemen + Identitas (dikenal juga sebagai Hukum Redundansi).',
      },
    ],
    copyText:
      'SOAL C4 — Penyederhanaan Aljabar Boolean (Sedang)\n' +
      'a. Bentuk awal: G = M·S + M·S\'·T\n' +
      'b. Penyederhanaan:\n' +
      '   G = M·(S + S\'·T)             [Hukum Distributif]\n' +
      '     = M·((S + S\')·(S + T))     [Hukum Distributif OR terhadap AND]\n' +
      '     = M·(1·(S + T))            [Hukum Komplemen: S + S\' = 1]\n' +
      '     = M·(S + T)                [Hukum Identitas: 1·X = X]\n' +
      'c. Kedua kolom menghasilkan 0,0,0,0,0,1,1,1 pada 8 baris -> TERBUKTI SETARA.',
    tables: [
      {
        caption: 'Pembuktian Kesetaraan: G_awal = M·S + M·S\'·T  vs  G_sederhana = M·(S + T)',
        headers: ['M', 'S', 'T', 'M·S', "M·S'·T", 'G awal', 'S + T', 'G sederhana'],
        rows: [
          { cells: ['0', '0', '0', '0', '0', '0', '0', '0'] },
          { cells: ['0', '0', '1', '0', '0', '0', '1', '0'] },
          { cells: ['0', '1', '0', '0', '0', '0', '1', '0'] },
          { cells: ['0', '1', '1', '0', '0', '0', '1', '0'] },
          { cells: ['1', '0', '0', '0', '0', '0', '0', '0'] },
          { cells: ['1', '0', '1', '0', '1', '1', '1', '1'], highlight: 'yes' },
          { cells: ['1', '1', '0', '1', '0', '1', '1', '1'], highlight: 'yes' },
          { cells: ['1', '1', '1', '1', '0', '1', '1', '1'], highlight: 'yes' },
        ],
      },
    ],
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Bentuk awal',
          body: '$G(M, S, T) = M \\cdot S + M \\cdot S\' \\cdot T$.',
        },
        {
          heading: 'Poin (b) — Penyederhanaan',
          body: 'Keluarkan $M$ (Distributif) $\\to$ pecah $S + S\'\\cdot T = (S+S\')(S+T)$ (Distributif) $\\to S+S\'=1$ (Komplemen) $\\to 1\\cdot(S+T) = S+T$ (Identitas). Hasil: $G = M\\cdot(S + T)$.',
        },
        {
          heading: 'Poin (c) — Bukti tabel',
          body: 'Kolom $G_{\\text{awal}}$ dan $G_{\\text{sederhana}}$ sama persis di semua 8 baris ($0,0,0,0,0,1,1,1$), terbukti setara!',
        },
      ],
      detail: [
        {
          heading: 'Poin (a) — Tulis persis sesuai kalimat',
          body: 'Kondisi 1: terdaftar ($M$) dan sudah pelatihan ($S$) $\\to M\\cdot S$. Kondisi 2: terdaftar ($M$), belum pelatihan ($S\'$), dan didampingi asisten ($T$) $\\to M\\cdot S\'\\cdot T$. Dihubungkan "atau":' +
            '<div class="math-scroll">$$G(M, S, T) = M \\cdot S + M \\cdot S\' \\cdot T$$</div>',
        },
        {
          heading: 'Poin (b) — Turunkan dengan menyebut hukum tiap langkah',
          body: '<ol>' +
            '<li>$G = M \\cdot S + M \\cdot S\' \\cdot T$ &nbsp;<em>(bentuk awal)</em></li>' +
            '<li>$G = M \\cdot (S + S\' \\cdot T)$ &nbsp;— <strong>Hukum Distributif</strong></li>' +
            '<li>$G = M \\cdot ((S + S\') \\cdot (S + T))$ &nbsp;— <strong>Hukum Distributif</strong> (OR terhadap AND)</li>' +
            '<li>$G = M \\cdot (1 \\cdot (S + T))$ &nbsp;— <strong>Hukum Komplemen</strong> ($S + S\' = 1$)</li>' +
            '<li>$G = M \\cdot (S + T)$ &nbsp;— <strong>Hukum Identitas</strong> ($1 \\cdot X = X$)</li>' +
            '</ol>' +
            '<p>Secara logika sehari-hari juga masuk akal banget: syaratnya ternyata cukup "mahasiswa terdaftar, dan sudah pelatihan <em>atau</em> didampingi asisten"!</p>',
        },
        {
          heading: 'Poin (c) — Cek kolom tabel 8 baris',
          body: 'Pada tabel di atas, kolom <strong>G awal</strong> dan <strong>G sederhana</strong> identik di seluruh 8 baris (bernilai 1 hanya pada $(1,0,1)$, $(1,1,0)$, dan $(1,1,1)$). Terbukti ekuivalen!',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: '$G(M, S, T) = M \\cdot S + M \\cdot S\' \\cdot T$' },
      { part: 'b', text: '$G(M, S, T) = M \\cdot (S + T)$ (memakai Hukum Distributif, Komplemen, dan Identitas)' },
      { part: 'c', text: 'Terbukti setara: kedua kolom bernilai identik $(0, 0, 0, 0, 0, 1, 1, 1)$ di seluruh 8 baris tabel.' },
    ],
  },

  {
    id: 'C5',
    section: 'C',
    difficulty: 'HOTS',
    accent: 'terracotta',
    layout: 'hots',
    title: 'Desain Keamanan Dompet Digital Kampus (F1 vs F2 vs F3)',
    question: {
      intro:
        'Dompet digital kampus memakai tiga input: $P = 1$ (PIN benar), $B = 1$ (sidik jari cocok), dan $N = 1$ (transaksi kecil $< \\text{Rp}500.000$, sehingga $N\'=1$ artinya transaksi besar $\\ge \\text{Rp}500.000$). Diusulkan Desain 1: $F_1 = P + B\\cdot N$ dan Desain 2: $F_2 = (P + B)\\cdot N$.',
      items: [
        'a. Buatlah satu tabel kebenaran 8 baris yang memuat kolom $F_1$ dan $F_2$.',
        'b. Tentukan kombinasi input yang membuat $F_1$ dan $F_2$ berbeda. Jelaskan dampak setiap perbedaan bagi kemudahan pengguna dan keamanan akun.',
        'c. Aturan baru kampus ($F_3$): transaksi kecil cukup PIN atau sidik jari, sedangkan transaksi besar wajib PIN dan sidik jari. Rumuskan $F_3$, tambahkan ke tabel, lalu tentukan desain mana yang paling seimbang antara keamanan dan kemudahan beserta alasannya.',
      ],
    },
    knownAsked: {
      known: [
        '$P$: PIN benar · $B$: sidik jari cocok · $N$: transaksi kecil',
        '$F_1 = P + B\\cdot N$ · $F_2 = (P + B)\\cdot N$',
      ],
      asked: [
        '(a) Tabel 8 baris $F_1, F_2$ (+ kolom $F_3$)',
        '(b) Baris perbedaan $F_1 \\neq F_2$ & analisis dampak',
        '(c) Rumus $F_3$ & pilihan desain terbaik',
      ],
    },
    coreFormulas: [
      {
        label: 'Rumus Aturan Baru Kampus (Desain 3)',
        latex: '$F_3 = N \\cdot (P + B) + N\' \\cdot (P \\cdot B)$',
        note: 'Bentuk sederhananya: $F_3 = P \\cdot B + N \\cdot (P + B) = N\\cdot P + N\\cdot B + P\\cdot B$ (fungsi mayoritas!).',
      },
    ],
    copyText:
      'SOAL C5 — Dompet Digital Kampus (HOTS)\n' +
      'F1 = P + B·N  |  F2 = (P + B)·N  |  F3 = N·(P + B) + N\'·(P·B)\n' +
      'b. Perbedaan F1 vs F2 terjadi di 2 kombinasi:\n' +
      '   1) (P=1, B=0, N=0): F1=1, F2=0 -> F1 tidak aman (transaksi besar lolos cuma pakai PIN); F2 aman.\n' +
      '   2) (P=1, B=1, N=0): F1=1, F2=0 -> F2 cacat fungsional (transaksi besar ditolak total meski PIN & sidik jari benar!).\n' +
      'c. Desain paling seimbang: Desain 3 (F3) — praktis untuk transaksi kecil (1 faktor), aman dengan 2FA (PIN & sidik jari) untuk transaksi besar tanpa memblokir pengguna.',
    tables: [
      {
        caption: 'Perbandingan Lengkap F1, F2, dan F3 — Baris pink: titik perbedaan F1 vs F2',
        headers: ['P', 'B', 'N', 'F1 = P + B·N', 'F2 = (P+B)·N', 'F3 = N·(P+B)+N\'·P·B'],
        rows: [
          { cells: ['0', '0', '0', '0', '0', '0'] },
          { cells: ['0', '0', '1', '0', '0', '0'] },
          { cells: ['0', '1', '0', '0', '0', '0'] },
          { cells: ['0', '1', '1', '1', '1', '1'] },
          { cells: ['1', '0', '0', '1', '0', '0'], highlight: 'diff' },
          { cells: ['1', '0', '1', '1', '1', '1'] },
          { cells: ['1', '1', '0', '1', '0', '1'], highlight: 'diff' },
          { cells: ['1', '1', '1', '1', '1', '1'] },
        ],
      },
    ],
    steps: {
      brief: [
        {
          heading: 'Poin (a) — Tabel kebenaran',
          body: 'Lihat tabel perbandingan 8 baris di atas ($F_1$, $F_2$, dan $F_3$ langsung digabung rapi dalam satu tabel).',
        },
        {
          heading: 'Poin (b) — 2 baris perbedaan $F_1 \\neq F_2$',
          body: '<ul><li><strong>$(1, 0, 0)$</strong> (PIN benar, sidik jari gagal, transaksi besar): $F_1=1$, $F_2=0$. $F_1$ rawan bobol karena transaksi besar lolos hanya dengan PIN.</li><li><strong>$(1, 1, 0)$</strong> (PIN benar, sidik jari cocok, transaksi besar): $F_1=1$, $F_2=0$. $F_2$ memblokir total transaksi besar meski kedua verifikasi benar!</li></ul>',
        },
        {
          heading: 'Poin (c) — Rumus $F_3$ & desain terbaik',
          body: '$F_3 = N\\cdot(P + B) + N\'\\cdot(P\\cdot B)$. Desain paling seimbang adalah <strong>Desain 3 ($F_3$)</strong>: transaksi kecil cukup 1 faktor (praktis), transaksi besar wajib 2FA/kedua faktor (aman & tetap bisa dipakai).',
        },
      ],
      detail: [
        {
          heading: 'Poin (a) — Cek pola $F_1$ dan $F_2$',
          body: 'Pada $F_1 = P + B\\cdot N$, begitu $P=1$, hasilnya langsung $1$ tanpa peduli nominal besar/kecil. Pada $F_2 = (P+B)\\cdot N$, karena dikalikan $N$ di luar kurung, setiap kali $N=0$ (transaksi besar), $F_2$ <strong>selalu $0$</strong>!',
        },
        {
          heading: 'Poin (b) — Bedah 2 baris yang berbeda (baris pink)',
          body: '<ol>' +
            '<li><strong>Input $(P=1, B=0, N=0)$</strong> — PIN benar, sidik jari tidak cocok, <em>transaksi besar</em>: $F_1 = 1$, $F_2 = 0$.<br />' +
            '<em>Dampak:</em> Bagi <strong>kemudahan</strong>, $F_1$ membantu saat jari basah/sensor eror. Namun bagi <strong>keamanan</strong>, $F_1$ berbahaya karena pencuri yang tahu PIN bisa langsung menguras saldo lewat transaksi besar tanpa sidik jari. Di sini $F_2$ lebih aman.</li>' +
            '<li><strong>Input $(P=1, B=1, N=0)$</strong> — PIN benar, sidik jari cocok, <em>transaksi besar</em>: $F_1 = 1$, $F_2 = 0$.<br />' +
            '<em>Dampak:</em> Ini cacat fatal $F_2$ bagi <strong>kemudahan/fungsionalitas</strong>! Pengguna sah yang sudah lolos PIN <em>sekaligus</em> sidik jari tetap ditolak saat transaksi $\\ge \\text{Rp}500.000$. Akun memang "aman", tapi tidak bisa dipakai untuk transaksi besar sama sekali.</li>' +
            '</ol>',
        },
        {
          heading: 'Poin (c) — Rumuskan $F_3$ & bandingkan ketiganya',
          body: '<p>Terjemahkan aturan kampus: transaksi kecil ($N$) cukup PIN atau sidik jari ($P+B$) $\\to N\\cdot(P+B)$; ATAU transaksi besar ($N\'$) wajib PIN dan sidik jari ($P\\cdot B$) $\\to N\'\\cdot(P\\cdot B)$.</p>' +
            '<div class="math-scroll">$$F_3 = N\\cdot(P + B) + N\'\\cdot(P\\cdot B) \\;\\equiv\\; P\\cdot B + N\\cdot(P + B)$$</div>' +
            '<p><strong>Desain paling seimbang: Desain 3 ($F_3$).</strong> Kenapa? $F_1$ terlalu longgar pada transaksi besar (cukup PIN), sedangkan $F_2$ terlalu ketat sampai melumpuhkan transaksi besar. $F_3$ mengambil titik tengah ideal ala sistem perbankan modern (<em>adaptive 2FA</em>): cepat untuk transaksi kecil, tetapi wajib verifikasi ganda (PIN + sidik jari) untuk transaksi besar.</p>',
          tip: 'Fun fact: jika disederhanakan, $F_3 = N\\cdot P + N\\cdot B + P\\cdot B$ — tepat bernilai 1 jika minimal 2 dari 3 input bernilai 1!',
        },
      ],
    },
    finalAnswer: [
      { part: 'a', text: 'Lihat tabel kebenaran 8 baris di atas (memuat $F_1$, $F_2$, dan $F_3$).' },
      {
        part: 'b',
        text: 'Berbeda pada <strong>$(1, 0, 0)$</strong> ($F_1$ rawan keamanan transaksi besar) dan <strong>$(1, 1, 0)$</strong> ($F_2$ memblokir transaksi besar meski PIN &amp; sidik jari benar).',
      },
      {
        part: 'c',
        text: '$F_3 = N\\cdot(P + B) + N\'\\cdot(P\\cdot B)$. Desain paling seimbang adalah <strong>Desain 3 ($F_3$)</strong> karena praktis untuk transaksi kecil (1 faktor) sekaligus aman dengan 2FA untuk transaksi besar.',
      },
    ],
  },
];

  global.ZineData = { SECTIONS, PROBLEMS };
})(typeof window !== 'undefined' ? window : globalThis);

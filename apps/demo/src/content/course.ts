import type { CourseConfig } from '@tutor/core';
import { demoEnglish } from './course.en';

export const demoCourse: CourseConfig = {
  slug: 'demo',
  code: 'FI1101',
  title: 'Mekanika & Getaran',
  subtitle: 'Materi, Latihan & Pembahasan Soal',
  domain: 'demo.tutor.adihnursyam.com',
  semester: 'Semester 1',
  enableShowcase: true,
  catalog: { listed: false, status: 'showcase' },
  sourceLanguage: 'id',
  translations: { en: demoEnglish },
  modules: [
    {
      id: 'mod-osilasi',
      code: 'M1',
      title: 'Osilasi Teredam',
      items: [
        {
          id: 'mat-osilasi-dasar',
          kind: 'material',
          slug: 'konsep-osilasi-teredam',
          title: 'Konsep & Rezim Osilasi Teredam',
          estimatedMinutes: 5,
          tags: ['materi', 'osilasi'],
          keyFormula: {
            label: 'Rasio Redaman Kanonik',
            latex: '\\zeta = \\frac{c}{2\\sqrt{km}}, \\qquad \\omega_n = \\sqrt{\\frac{k}{m}}',
            note: 'Menentukan apakah sistem berosilasi atau langsung meluruh ke kesetimbangan.',
          },
          body: `Pada sistem mekanik nyata, gesekan fluida atau disipasi internal selalu mengurangi energi mekanik total seiring waktu. Model linear paling sederhana mengasumsikan gaya redam sebanding dengan kecepatan sesaat, $F_d = -c\\dot{x}$.

### Klasifikasi Tiga Rezim Redaman

| Rezim | Syarat $\\zeta$ | Perilaku Fisik |
| --- | --- | --- |
| **Underdamped** | $0 < \\zeta < 1$ | Berosilasi dengan amplitudo meluruh eksponensial $e^{-\\zeta\\omega_n t}$ |
| **Critically damped** | $\\zeta = 1$ | Kembali ke titik setimbang paling cepat tanpa *overshoot* |
| **Overdamped** | $\\zeta > 1$ | Kembali ke titik setimbang secara lambat tanpa osilasi |

### Intuisi Energi
Laju disipasi energi mekanik sesaat memenuhi:

$$\\frac{dE}{dt} = -c\\dot{x}^2 \\le 0$$

Karena $\\dot{x}^2 \\ge 0$, energi tidak pernah bertambah tanpa gaya penggerak eksternal (*unforced system*).`,
          derivations: [
            {
              id: 'deriv-karakteristik',
              title: 'Penurunan persamaan karakteristik & akar redaman',
              content:
                'Dengan mencoba solusi eksponensial $x(t) = e^{rt}$ ke dalam $\\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0$, diperoleh:\n\n$$r^2 + 2\\zeta\\omega_n r + \\omega_n^2 = 0 \\implies r_{1,2} = -\\zeta\\omega_n \\pm \\omega_n\\sqrt{\\zeta^2 - 1}$$\n\nTanda diskriminan $\\zeta^2 - 1$ inilah yang memisahkan ketiga rezim redaman.',
            },
            {
              id: 'deriv-qfactor',
              title: 'Hubungan rasio redaman dengan faktor kualitas (Q-factor)',
              content:
                'Untuk osilator redaman ringan, faktor kualitas didefinisikan sebagai $Q = \\frac{1}{2\\zeta}$. Semakin tinggi nilai $Q$, semakin banyak siklus osilasi yang terjadi sebelum energi meluruh signifikan.',
            },
          ],
          checkpoints: [
            'Mampu menulis persamaan diferensial m ẍ + c ẋ + k x = 0 dari diagram gaya bebas.',
            'Mampu menentukan rezim underdamped, critically damped, atau overdamped dari nilai ζ.',
            'Memahami mengapa ωd selalu lebih kecil daripada ωn ketika c > 0.',
          ],
        },
        {
          id: 'prac-osilasi-cek',
          kind: 'practice',
          slug: 'latihan-rezim-redaman',
          title: 'Latihan Identifikasi Rezim & Frekuensi',
          difficulty: 'dasar',
          estimatedMinutes: 5,
          tags: ['latihan', 'osilasi'],
          intro:
            'Uji pemahaman konsep dasar osilasi teredam sebelum masuk ke soal ujian lengkap. Pilih jawaban yang paling tepat pada setiap nomor.',
          questions: [
            {
              id: 'q1',
              prompt:
                'Sistem pegas-massa memiliki $m = 2\\,\\text{kg}$ dan $k = 8\\,\\text{N/m}$. Berapa koefisien redaman kritis $c_{\\text{kritis}}$?',
              options: [
                { id: 'a', label: '$4\\,\\text{N}\\cdot\\text{s/m}$' },
                { id: 'b', label: '$8\\,\\text{N}\\cdot\\text{s/m}$' },
                { id: 'c', label: '$16\\,\\text{N}\\cdot\\text{s/m}$' },
              ],
              correctOptionId: 'b',
              hint: 'Gunakan syarat ζ = 1 sehingga c_kritis = 2√(km).',
              explanation:
                'Redaman kritis terjadi saat $\\zeta = 1$, yaitu $c_{\\text{kritis}} = 2\\sqrt{km} = 2\\sqrt{8 \\times 2} = 2(4) = 8\\,\\text{N}\\cdot\\text{s/m}$.',
            },
            {
              id: 'q2',
              prompt:
                'Jika koefisien redaman $c$ pada osilator *underdamped* diperbesar (namun masih $\\zeta < 1$), bagaimana pengaruhnya terhadap periode osilasi $T_d$?',
              options: [
                { id: 'a', label: 'Periode $T_d$ menjadi lebih panjang (lebih lambat)' },
                { id: 'b', label: 'Periode $T_d$ menjadi lebih singkat (lebih cepat)' },
                { id: 'c', label: 'Periode $T_d$ tetap sama dengan $T_n$' },
              ],
              correctOptionId: 'a',
              hint: 'Perhatikan rumus ωd = ωn √(1 − ζ²) dan Td = 2π / ωd.',
              explanation:
                'Saat $c$ naik, $\\zeta$ meningkat sehingga $\\omega_d = \\omega_n\\sqrt{1 - \\zeta^2}$ mengecil. Akibatnya periode $T_d = 2\\pi/\\omega_d$ bertambah panjang.',
            },
          ],
        },
        {
          id: 'prob-pegas-teredam',
          kind: 'problem',
          slug: 'pegas-massa-teredam',
          title: 'Analisis Redaman Sistem Pegas-Massa',
          source: 'UTS 2024 · No. 1',
          exam: { term: 'UTS', year: 2024, number: 1 },
          difficulty: 'menengah',
          estimatedMinutes: 8,
          tags: ['osilasi', 'rk4', 'redaman'],
          statement:
            'Sebuah balok bermassa $m = 1.0\\,\\text{kg}$ digantung pada pegas ideal dengan konstanta kekakuan $k = 12.0\\,\\text{N/m}$ dan dihubungkan ke peredam viskos berkoefisien $c = 0.40\\,\\text{N}\\cdot\\text{s/m}$. Pada $t = 0$, balok ditarik sejauh $x_0 = 1.0\\,\\text{m}$ dari posisi setimbang lalu dilepas tanpa kecepatan awal ($v_0 = 0$).',
          given: [
            'Massa balok $m = 1.0\\,\\text{kg}$',
            'Konstanta pegas $k = 12.0\\,\\text{N/m}$',
            'Koefisien redaman $c = 0.40\\,\\text{N}\\cdot\\text{s/m}$',
            'Kondisi awal $x(0) = 1.0\\,\\text{m}$, $\\dot{x}(0) = 0$',
          ],
          asked:
            'Tentukan frekuensi alami $\\omega_n$, rasio redaman $\\zeta$, jenis rezim redaman, frekuensi sudut teredam $\\omega_d$, serta persamaan posisi $x(t)$.',
          simulation: {
            id: 'sim-pegas-teredam',
            type: 'damped-oscillator',
            title: 'Osilator Harmonik Teredam (Solver RK4)',
            caption:
              'Geser parameter di atas atau minta Tutor AI mengubah redaman untuk melihat transisi dari underdamped ke critically damped dan overdamped secara langsung.',
            params: [
              {
                key: 'mass',
                label: 'Massa (m)',
                unit: 'kg',
                min: 0.4,
                max: 3.0,
                step: 0.1,
                defaultValue: 1.0,
              },
              {
                key: 'damping',
                label: 'Redaman (c)',
                unit: 'N·s/m',
                min: 0.0,
                max: 6.0,
                step: 0.05,
                defaultValue: 0.4,
              },
              {
                key: 'stiffness',
                label: 'Kekakuan (k)',
                unit: 'N/m',
                min: 4.0,
                max: 24.0,
                step: 0.5,
                defaultValue: 12.0,
              },
            ],
          },
          steps: [
            {
              id: 'step-1',
              title: 'Susun persamaan diferensial gerak',
              summary: 'Terapkan Hukum II Newton untuk gaya pegas dan gaya redam.',
              hint: 'Kedua gaya pemulih (−kx) dan redaman (−cv) berlawanan arah dengan simpangan dan kecepatan.',
              checkpoint: {
                prompt: 'Sebelum melihat penurunan, ke mana arah gaya redam saat balok bergerak ke bawah (+v)?',
                options: [
                  {
                    id: 'up',
                    label: 'Ke atas (−cẋ)',
                    feedback: 'Benar — redaman viskos selalu melawan arah gerak sesaat.',
                  },
                  {
                    id: 'down',
                    label: 'Ke bawah (+cẋ)',
                    misconceptionTag: 'damping-sign-flip',
                    feedback: 'Jika searah kecepatan, gaya justru mempercepat balok tanpa batas (energi bertambah).',
                  },
                ],
                correctOptionId: 'up',
              },
              rationale: {
                whyThisMethod:
                  'Bentuk kanonik $\\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0$ langsung memisahkan frekuensi alami dan rasio redaman tanpa perlu menghafal akar kuadrat baru setiap soal.',
                whyNotAlternative:
                  'Pendekatan kekekalan energi mekanik tidak bisa dipakai langsung karena gaya redam viskos bersifat non-konservatif.',
                commonPitfall:
                  'Salah tanda saat memindahkan $-kx - c\\dot{x}$ ke ruas kiri (menulis $m\\ddot{x} - c\\dot{x} + kx = 0$).',
              },
              content:
                'Dengan mengambil arah simpangan positif ke bawah dari posisi setimbang, jumlah gaya yang bekerja pada massa adalah gaya pegas $-kx$ dan gaya redaman viskos $-c\\dot{x}$:\n\n$$m\\ddot{x} = -kx - c\\dot{x} \\quad \\Longrightarrow \\quad m\\ddot{x} + c\\dot{x} + kx = 0$$\n\nBagi kedua ruas dengan $m$ untuk memperoleh bentuk kanonik:\n\n$$\\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0$$',
            },
            {
              id: 'step-2',
              title: 'Hitung frekuensi alami ωₙ dan rasio redaman ζ',
              summary: 'Substitusikan m = 1.0 kg, k = 12.0 N/m, dan c = 0.40 N·s/m.',
              hint: 'Gunakan definisi ωₙ = √(k/m) dan ζ = c / (2√(km)).',
              content:
                'Frekuensi sudut alami (tanpa redaman):\n\n$$\\omega_n = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{12.0}{1.0}} \\approx 3.464\\,\\text{rad/s}$$\n\nRasio redaman tak berdimensi:\n\n$$\\zeta = \\frac{c}{2\\sqrt{km}} = \\frac{0.40}{2\\sqrt{12.0 \\times 1.0}} = \\frac{0.40}{6.928} \\approx 0.0577$$\n\nKarena $0 < \\zeta < 1$, sistem berada pada rezim **teredam kurang (*underdamped*)**.',
            },
            {
              id: 'step-3',
              title: 'Tentukan frekuensi sudut teredam ωd',
              summary: 'Koreksi frekuensi osilasi akibat disipasi energi redaman.',
              content:
                'Untuk rezim *underdamped*, frekuensi osilasi aktualnya adalah:\n\n$$\\omega_d = \\omega_n\\sqrt{1 - \\zeta^2} = 3.464\\sqrt{1 - (0.0577)^2} \\approx 3.458\\,\\text{rad/s}$$\n\nPerhatikan bahwa karena $\\zeta$ kecil, $\\omega_d$ sangat dekat dengan $\\omega_n$.',
            },
            {
              id: 'step-4',
              title: 'Terapkan syarat awal untuk memperoleh x(t)',
              summary: 'Gunakan x(0) = 1.0 m dan v(0) = 0 pada solusi umum.',
              hint: 'Solusi umum underdamped: x(t) = e^(-ζωₙt) [A cos(ωd t) + B sin(ωd t)].',
              content:
                'Substitusi $t = 0$ pada solusi umum menghasilkan $A = x(0) = 1.0\\,\\text{m}$. Turunan pertama pada $t = 0$ memberi:\n\n$$\\dot{x}(0) = -\\zeta\\omega_n A + \\omega_d B = 0 \\implies B = \\frac{\\zeta\\omega_n}{\\omega_d} A = \\frac{0.20}{3.458}(1.0) \\approx 0.0578\\,\\text{m}$$\n\nSehingga persamaan posisi lengkapnya:\n\n$$x(t) = e^{-0.20t}\\big(\\cos(3.458t) + 0.0578\\sin(3.458t)\\big)\\,\\text{m}$$',
            },
          ],
          finalAnswer:
            'Sistem bersifat **underdamped** dengan $\\omega_n = 3.464\\,\\text{rad/s}$, $\\zeta = 0.0577$, $\\omega_d = 3.458\\,\\text{rad/s}$, dan:\n\n$$x(t) = e^{-0.20t}\\big(\\cos(3.458t) + 0.0578\\sin(3.458t)\\big)\\,\\text{m}$$',
          takeaway:
            'Nilai kritis redaman tercapai saat $c_{\\text{kritis}} = 2\\sqrt{km} \\approx 6.93\\,\\text{N}\\cdot\\text{s/m}$. Coba geser slider redaman mendekati nilai ini pada simulasi untuk melihat hilangnya osilasi.',
        },
        {
          id: 'prob-energi-amplitudo',
          kind: 'problem',
          slug: 'peluruhan-amplitudo-energi',
          title: 'Waktu Peluruhan Energi Menjadi Setengah',
          source: 'UTS 2023 · No. 1',
          exam: { term: 'UTS', year: 2023, number: 1 },
          difficulty: 'dasar',
          estimatedMinutes: 5,
          statement:
            'Suatu osilator teredam ringan memiliki massa $m = 0.5\\,\\text{kg}$ dan koefisien redaman $c = 0.10\\,\\text{N}\\cdot\\text{s/m}$. Berapa waktu yang dibutuhkan agar energi mekanik totalnya turun menjadi tepat setengah dari energi awal?',
          given: [
            '$m = 0.5\\,\\text{kg}$',
            '$c = 0.10\\,\\text{N}\\cdot\\text{s/m}$',
            'Target energi $E(t) = \\frac{1}{2} E_0$',
          ],
          asked: 'Waktu peluruhan $t_{1/2}$ (dalam detik).',
          steps: [
            {
              id: 'e-1',
              title: 'Hubungkan energi dengan amplop amplitudo',
              summary: 'Energi osilator sebanding dengan kuadrat amplitudo.',
              content:
                'Pada redaman ringan, amplitudo meluruh mengikuti $A(t) = A_0 e^{-\\gamma t}$ dengan $\\gamma = \\frac{c}{2m}$. Karena $E(t) \\propto A(t)^2$, maka:\n\n$$E(t) = E_0 e^{-2\\gamma t} = E_0 e^{-(c/m)t}$$',
            },
            {
              id: 'e-2',
              title: 'Selesaikan untuk t saat E(t) = E₀ / 2',
              summary: 'Ambil logaritma natural di kedua ruas.',
              content:
                '$$\\frac{1}{2} = e^{-(c/m)t_{1/2}} \\implies t_{1/2} = \\frac{m}{c}\\ln 2 = \\frac{0.5}{0.10}(0.6931) \\approx 3.47\\,\\text{s}$$',
            },
          ],
          finalAnswer:
            'Energi mekanik berkurang menjadi setengahnya setelah **$t_{1/2} \\approx 3.47\\,\\text{s}$**.',
        },
      ],
    },
    {
      id: 'mod-rotasi',
      code: 'M2',
      title: 'Dinamika Benda Tegar',
      items: [
        {
          id: 'mat-momen-inersia',
          kind: 'material',
          slug: 'momen-inersia-rotasi',
          title: 'Momen Inersia & Gerak Menggelinding',
          estimatedMinutes: 6,
          keyFormula: {
            label: 'Syarat Menggelinding Tanpa Slip',
            latex: 'v_{\\text{cm}} = \\omega R, \\qquad a_{\\text{cm}} = \\alpha R',
            note: 'Gaya gesek statis berperan menghasilkan torsi tanpa melakukan kerja disipatif.',
          },
          body: `Gerak menggelinding murni merupakan superposisi antara translasi pusat massa dan rotasi terhadap pusat massa. Energi kinetik total benda tegar yang menggelinding adalah:

$$K = \\frac{1}{2} M v_{\\text{cm}}^2 + \\frac{1}{2} I_{\\text{cm}} \\omega^2 = \\frac{1}{2} M v_{\\text{cm}}^2 \\left(1 + \\frac{I_{\\text{cm}}}{M R^2}\\right)$$

Faktor tak berdimensi $\\beta = I_{\\text{cm}}/(MR^2)$ menentukan seberapa besar energi yang "terkunci" pada gerak rotasi: semakin besar $\\beta$, semakin kecil percepatan translasi pada bidang miring.`,
        },
        {
          id: 'prob-silinder-miring',
          kind: 'problem',
          slug: 'silinder-menggelinding-bidang-miring',
          title: 'Silinder Pejal Menggelinding pada Bidang Miring',
          source: 'UTS 2024 · No. 2',
          exam: { term: 'UTS', year: 2024, number: 2 },
          difficulty: 'lanjut',
          estimatedMinutes: 10,
          statement:
            'Sebuah silinder pejal homogen bermassa $M$ dan berjari-jari $R$ ($I_{\\text{cm}} = \\frac{1}{2}MR^2$) dilepas dari keadaan diam di puncak bidang miring bersudut $\\theta = 30^\\circ$. Silinder menggelinding tanpa slip menuruni bidang.',
          given: [
            'Momen inersia silinder pejal $I_{\\text{cm}} = \\frac{1}{2}MR^2$',
            'Sudut kemiringan $\\theta = 30^\\circ$',
            'Percepatan gravitasi $g = 9.8\\,\\text{m/s}^2$',
          ],
          asked:
            'Tentukan percepatan pusat massa $a_{\\text{cm}}$ dan koefisien gesek statis minimum $\\mu_{s,\\min}$ agar tidak terjadi slip.',
          steps: [
            {
              id: 'r-1',
              title: 'Tulis persamaan translasi dan rotasi',
              summary: 'Gaya gesek statis fs mengarah ke atas bidang miring.',
              content:
                'Translasi sepanjang bidang miring:\n\n$$Mg\\sin\\theta - f_s = M a_{\\text{cm}}$$\n\nRotasi terhadap pusat massa:\n\n$$f_s R = I_{\\text{cm}}\\alpha = \\left(\\frac{1}{2}MR^2\\right)\\left(\\frac{a_{\\text{cm}}}{R}\\right) \\implies f_s = \\frac{1}{2} M a_{\\text{cm}}$$',
            },
            {
              id: 'r-2',
              title: 'Eliminasi fs untuk memperoleh acm',
              summary: 'Substitusikan fs ke persamaan translasi.',
              content:
                '$$Mg\\sin\\theta - \\frac{1}{2}M a_{\\text{cm}} = M a_{\\text{cm}} \\implies a_{\\text{cm}} = \\frac{2}{3}g\\sin\\theta$$\n\nDengan $\\theta = 30^\\circ$ ($\\sin 30^\\circ = 0.5$):\n\n$$a_{\\text{cm}} = \\frac{2}{3}(9.8)(0.5) \\approx 3.27\\,\\text{m/s}^2$$',
            },
            {
              id: 'r-3',
              title: 'Cari syarat koefisien gesek statis minimum',
              summary: 'Gunakan pertidaksamaan fs ≤ μs N.',
              content:
                '$$f_s = \\frac{1}{2}M a_{\\text{cm}} = \\frac{1}{3}Mg\\sin\\theta \\le \\mu_s Mg\\cos\\theta$$\n\n$$\\mu_{s,\\min} = \\frac{1}{3}\\tan\\theta = \\frac{1}{3}\\tan 30^\\circ \\approx 0.192$$',
            },
          ],
          finalAnswer:
            'Percepatan pusat massa **$a_{\\text{cm}} = \\frac{2}{3}g\\sin\\theta \\approx 3.27\\,\\text{m/s}^2$** dengan koefisien gesek statis minimum **$\\mu_{s,\\min} = \\frac{1}{3}\\tan 30^\\circ \\approx 0.192$**.',
        },
      ],
    },
  ],
};

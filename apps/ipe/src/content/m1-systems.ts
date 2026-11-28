import type { CourseModule, CourseTranslation } from '@tutor/core';

export const module: CourseModule = {
  "id": "ipe-systems",
  "code": "M1",
  "title": "Sistem ukur dan umpan balik",
  "items": [
    {
      "id": "ipe-systems-material",
      "kind": "material",
      "slug": "ipe-systems-material",
      "title": "Ikuti besaran dari sensor ke hasil ukur",
      "estimatedMinutes": 6,
      "examHook": {
        "prompt": "Sebuah strain gauge berubah tahanan saat menerima gaya. Mengapa sistem masih memerlukan jembatan, pengolah data, dan layar?",
        "targetOutcome": "Anda dapat menjelaskan fungsi tiap tahap dan arah umpan balik."
      },
      "body": "Mulai dari besaran yang ingin Anda ukur. Lalu, ikuti perubahan sinyal pada tiap tahap. Cara ini membantu Anda menjelaskan fungsi alat tanpa menghafal daftar namanya.\n\nSatu alat dapat menjalankan beberapa fungsi. Kita tetap menyebut fungsi yang sesuai dengan penggunaan pada soal.\n\n[Buka pembahasan bertahap: Peran elemen sistem pengukuran](?item=2025-uas-q1).",
      "microUnits": [
        {
          "id": "ipe-systems-principle",
          "title": "Pilih model dari kondisi soal",
          "intuition": "Gaya mengubah tahanan sensor. Jembatan lalu mengubah perubahan tahanan menjadi beda tegangan. Pengolah memakai hubungan kalibrasi untuk memperoleh nilai gaya. Layar menampilkan nilai tersebut. **Rantai ukur** (urutan tahap pembacaan) menghubungkan besaran fisik dengan hasil yang Anda baca.",
          "formal": "Untuk model linear berurutan, keluaran satu tahap menjadi masukan tahap berikutnya:\n\n$$y=K_3K_2K_1x.$$\n\nDengan umpan balik negatif, bandingkan masukan dengan sinyal balik sebelum menerapkan penguatan maju.",
          "validityBounds": "Perkalian penguatan berlaku untuk model linear tanpa pengaruh beban antartahap. Periksa satuan setiap penguatan. Pada umpan balik, periksa tanda penjumlahan dan kestabilan sistem.",
          "decisionCheck": {
            "id": "ipe-systems-decision-question",
            "prompt": "Penguat menaikkan tegangan sensor sebelum masuk ke pengolah. Fungsi utama apa yang sedang dilakukan?",
            "options": [
              {
                "id": "ipe-systems-decision-question-option-1",
                "label": "Menyiapkan sinyal agar tahap berikutnya dapat membacanya.",
                "feedback": "Tepat. Penguat mengubah besar sinyal listrik yang sudah berasal dari sensor."
              },
              {
                "id": "ipe-systems-decision-question-option-2",
                "label": "Mengubah besaran fisik langsung menjadi respons sensor.",
                "feedback": "Sensor sudah melakukan tahap ini. Penguat menerima tegangan, bukan besaran fisik awal.",
                "misconceptionTag": "systems-decision-choice-2"
              },
              {
                "id": "ipe-systems-decision-question-option-3",
                "label": "Menyajikan hasil akhir agar pengguna dapat membacanya.",
                "feedback": "Penyaji membuat hasil terbaca oleh pengguna. Penguat menyiapkan sinyal untuk tahap berikutnya.",
                "misconceptionTag": "systems-decision-choice-3"
              }
            ],
            "correctOptionId": "ipe-systems-decision-question-option-1",
            "explanation": "Tentukan fungsi dari masukan dan keluarannya. Penguat menerima serta menghasilkan tegangan, sehingga berperan sebagai pengondisi sinyal."
          }
        }
      ],
      "checkpoints": [
        "Anda dapat menjelaskan fungsi tiap tahap dan arah umpan balik.",
        "Urutan fungsi dan satuan sinyal menentukan model sistem ukur.",
        "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
      ],
      "derivations": [
        {
          "id": "ipe-systems-sources",
          "title": "Sumber dan cara membaca arsip",
          "content": "[Arsip soal UTS 1, UTS 2, dan UAS 2023 sampai 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Tahun mengikuti folder arsip; tanggal pada naskah dapat berbeda.\n\n[Materi utama: Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view). Setiap pembahasan menyertakan naskah sumber, halaman, dan asumsi yang relevan."
        }
      ]
    },
    {
      "id": "2025-uas-q1",
      "kind": "problem",
      "slug": "2025-uas-q1",
      "title": "Peran elemen sistem pengukuran",
      "source": "UAS 2025 · Soal 1",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
        "file": "2025-uas.pdf",
        "pages": [
          1
        ],
        "original": "1. [10%] Elements of Measurement Systems\nPlease categorize the following elements into sensing elements, signal conditioning elements, signal processing elements, or data presentation elements.\na. Incremental encoder.\nb. LVDT\nc. Wheatstone bridge\nd. Inverting amplifier\ne. Low pass filter\nf. Analog to Digital Converter\ng. Strain gauge\nh. Resistance Temperature Dependence\ni. Current to voltage converter\nj. Capacitive proximity probe",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
          "pages": [
            1,
            2,
            6,
            14,
            15,
            16,
            17
          ]
        }
      },
      "exam": {
        "term": "UAS",
        "year": 2025,
        "number": 1
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Sistem ukur dan umpan balik"
      ],
      "statement": "Kelompokkan setiap komponen sebagai elemen perasa, pengondisi sinyal, pemroses sinyal, atau penyaji data. Komponennya: (a) encoder inkremental; (b) LVDT; (c) jembatan Wheatstone; (d) penguat pembalik; (e) filter lolos rendah. Daftar berlanjut: (f) konverter analog-ke-digital; (g) strain gauge; (h) RTD; (i) konverter arus-ke-tegangan; (j) probe kedekatan kapasitif. Sumber menyebut RTD sebagai “Resistance Temperature Dependence”.",
      "simulation": {
        "id": "2025-uas-q1-visual",
        "type": "ipe-system",
        "title": "Sistem ukur",
        "caption": "Telusuri perubahan besaran fisik hingga sinyal dan hasil yang terbaca.",
        "params": [],
        "data": {
          "mode": "elements",
          "visualKind": "system"
        }
      },
      "steps": [
        {
          "id": "2025-uas-q1-step-1",
          "title": "1. Ikuti perjalanan besaran sampai menjadi informasi",
          "content": "Kita mengelompokkan komponen menurut perannya dalam sistem. Mulai dari besaran fisik, lalu telusuri jalur sinyal. Komponen dapat merasakan besaran, menyiapkan sinyal, mengolah data, atau menampilkan hasil. Anda dapat memakai urutan tersebut untuk menentukan kelompok setiap komponen.\n\nSebuah komponen tidak harus langsung menghasilkan angka agar termasuk sensor. Tahanan yang berubah terhadap suhu atau regangan juga sudah membawa informasi pengukuran.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Urutan fungsi dan satuan sinyal menentukan model sistem ukur.",
            "commonPitfall": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
          }
        },
        {
          "id": "2025-uas-q1-step-2",
          "title": "2. Cari komponen yang langsung merasakan besaran",
          "content": "Elemen perasa berinteraksi langsung dengan besaran yang ingin kita ukur. Encoder inkremental(a) merasakan gerak atau sudut, sedangkan LVDT(b) merasakan perpindahan. Strain gauge(g) merasakan regangan, dan RTD(h) merasakan suhu. Probe kapasitif(j) merasakan kedekatan atau jarak.\n\nPada RTD dan strain gauge, sinyal awal berupa perubahan tahanan. Pada LVDT dan encoder, gerak mengubah sinyal listrik melalui cara kerja masing-masing. Semua contoh ini berada pada titik ketika besaran fisik mulai menjadi sinyal yang dapat dibaca."
        },
        {
          "id": "2025-uas-q1-step-3",
          "title": "3. Mengapa jembatan tidak menjadi elemen perasa utama?",
          "content": "Jembatan Wheatstone membandingkan tahanan dan menghasilkan beda tegangan. Jika strain gauge dipasang pada salah satu lengannya, gauge merasakan regangan, sedangkan jembatan membuat perubahan tahanannya lebih mudah dibaca. Membedakan keduanya menjelaskan penempatan (c) sebagai pengondisi sinyal."
        },
        {
          "id": "2025-uas-q1-step-4",
          "title": "4. Cari komponen yang menyiapkan sinyal",
          "content": "Pengondisi sinyal mengubah bentuk atau besar sinyal agar mudah dibaca. (c) Jembatan Wheatstone mengubah beda tahanan menjadi beda tegangan. (d) Penguat pembalik memberi penguatan serta pembalikan tanda. (e) Filter lolos rendah menekan komponen frekuensi tinggi. (i) Konverter arus-ke-tegangan mengubah sinyal arus menjadi tegangan.\n\nPenguatan, penyaringan, dan konversi arus menjadi tegangan mempertahankan informasi dari sensor sambil menyesuaikannya dengan alat berikutnya. Filter dapat membuang gangguan frekuensi tinggi, tetapi cutoff yang terlalu rendah juga dapat membuang bagian sinyal yang ingin diukur."
        },
        {
          "id": "2025-uas-q1-step-5",
          "title": "5. Tempatkan konverter analog-ke-digital",
          "content": "Dengan pembagian fungsi pada pembahasan ini, (f) ADC masuk pemroses sinyal karena mengubah nilai analog menjadi kode digital. Beberapa arsitektur memasukkan ADC ke blok akuisisi atau pengondisian. Jelaskan fungsi konversinya agar klasifikasi tidak bergantung pada nama blok saja.\n\nADC mengambil masukan analog dan menghasilkan kode digital dengan resolusi terbatas. Ia belum menyajikan hasil ke pengguna hanya karena keluarannya berupa angka biner. Komputer atau layar masih perlu mengartikan kode itu."
        },
        {
          "id": "2025-uas-q1-step-6",
          "title": "6. Periksa apakah ada penyaji data",
          "content": "Daftar soal tidak memuat penyaji data. Contoh kelompok ini ialah layar angka, grafik, penunjuk, atau pencatat hasil. Jangan memaksa salah satu sensor masuk ke sini hanya agar semua kelompok terisi.\n\nGunakan kelompok yang kosong sebagai hasil pemeriksaan daftar, bukan alasan memindahkan komponen secara paksa. Daftar ini memang dapat mencakup sensor dan pengondisi tanpa memuat layar atau pencatat."
        },
        {
          "id": "2025-uas-q1-step-7",
          "title": "7. Periksa klasifikasi dengan satu contoh rantai lengkap",
          "content": "Contoh: suhu → RTD → jembatan → penguat/filter → ADC → perangkat lunak → layar. Suhu mengubah tahanan pada RTD; rangkaian berikutnya menyiapkan dan mengubah sinyal; layar menyajikan hasil. Fungsi inilah yang mendukung pembagian kelompok pada jawaban."
        }
      ],
      "finalAnswer": "Perasa: a, b, g, h, j. Pengondisi: c, d, e, i. Pemroses: f, dengan konvensi pembagian fungsi di atas. Penyaji data: tidak ada pada daftar.",
      "takeaway": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
    },
    {
      "id": "2024-uts1-q3",
      "kind": "problem",
      "slug": "2024-uts1-q3",
      "title": "Transduser gaya dengan umpan balik negatif",
      "source": "UTS 1 2024 · Soal 3",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
        "file": "2024-uts1.pdf",
        "pages": [
          1
        ],
        "original": "3. [20%] Figure below shows a block diagram of a force transducer using negative feedback. The elastic sensor gives a displacement output for a force input; the displacement sensor gives a voltage output for a displacement input. \\(V_s\\) is the supply voltage for the displacement sensor. (a) Calculate the output voltage \\(V_o\\) when (i) \\(V_s=1.0\\ \\mathrm V,F=50\\ \\mathrm N\\), (ii) \\(V_s=1.5\\ \\mathrm V,F=50\\ \\mathrm N\\). (b) Comment on the practical significance of the variation of the supply voltage \\(V_s\\). Figure: input force F enters the positive summing input; balancing force enters the negative input. Forward blocks: elastic force sensor \\(10^{-4}\\), displacement sensor \\(100\\times V_s\\), amplifier \\(10^3\\). Output \\(V_o\\) returns through coil-and-magnet block 10 to the negative summing input.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Blok dianggap linear, polaritas umpan balik mengikuti tanda minus pada gambar, dan penguat serta kumparan bekerja tanpa saturasi. Analisis membahas keadaan tunak."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2024,
        "number": 3
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Sistem ukur dan umpan balik"
      ],
      "statement": "Transduser gaya memakai umpan balik negatif. Gaya galat melewati sensor elastis dengan penguatan $10^{-4}$, sensor perpindahan $100V_s$, dan penguat $10^3$, lalu menghasilkan tegangan $V_o$. Jalur balik kumparan dan magnet mempunyai penguatan $10$ dan menghasilkan gaya penyeimbang yang dikurangkan dari gaya masuk $F$. (a) Hitung $V_o$ untuk $F=50$ N pada catu (i) 1,0 V dan (ii) 1,5 V. (b) Jelaskan arti praktis pengaruh perubahan catu.",
      "simulation": {
        "id": "2024-uts1-q3-visual",
        "type": "ipe-feedback",
        "title": "Umpan balik",
        "caption": "Keluaran menggerakkan gaya balik yang dikurangkan dari gaya masuk; catu mengubah penguatan jalur maju.",
        "params": [
          {
            "key": "supply",
            "label": "Tegangan catu",
            "min": 0.5,
            "max": 2,
            "step": 0.05,
            "defaultValue": 1,
            "unit": "V"
          }
        ],
        "data": {
          "forward": 10,
          "feedback": 10,
          "supply": 1,
          "force": 50,
          "visualKind": "feedback"
        }
      },
      "steps": [
        {
          "id": "2024-uts1-q3-step-1",
          "title": "a · Baca tanda pada simpul penjumlah",
          "content": "Tanda plus menerima gaya luar $F$. Tanda minus menerima gaya penyeimbang dari keluaran. Dengan penguatan jalur balik $B=10\\ \\mathrm{N/V}$, gaya balik adalah $F_b=BV_o$.\n\nJalur maju tidak menerima seluruh $F$; ia menerima gaya galat $F_e=F-F_b$. Kita menyebut susunan pengurang tersebut **umpan balik negatif** (keluaran mengurangi masukan efektif). Kenaikan keluaran memperbesar gaya penyeimbang.\n\n$$\nF_b=10V_o,\\qquad F_e=F-10V_o\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Urutan fungsi dan satuan sinyal menentukan model sistem ukur.",
            "commonPitfall": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
          },
          "checkpoint": {
            "prompt": "Pada transduser gaya dengan umpan balik negatif, perubahan catu menaikkan penguatan jalur maju. Gaya masuk dan penguatan jalur umpan balik tetap. Jika penguatan loop sudah besar, mengapa keluaran berubah jauh lebih kecil daripada perubahan penguatan maju?",
            "options": [
              {
                "id": "2024-uts1-q3-checkpoint-option-1",
                "label": "Penguatan total selalu sama dengan hasil kali penguatan maju dan umpan balik.",
                "feedback": "Hasil kali itu adalah loop gain. Penguatan masukan dan keluaran tertutup juga memuat penyebut dari pengurangan umpan balik.",
                "misconceptionTag": "concept-2024-04-choice-1"
              },
              {
                "id": "2024-uts1-q3-checkpoint-option-2",
                "label": "Kenaikan keluaran memperbesar gaya penyeimbang, sehingga mengurangi gaya galat yang masuk ke jalur maju.",
                "feedback": "Benar. Respons gaya penyeimbang menekan kepekaan terhadap perubahan jalur maju, selama loop bekerja sesuai model."
              },
              {
                "id": "2024-uts1-q3-checkpoint-option-3",
                "label": "Umpan balik membuat penguatan maju sama sekali tidak memengaruhi keluaran pada semua kondisi.",
                "feedback": "Kebal terhadap perubahan penguatan hanya pendekatan saat loop gain besar. Pada gain terbatas masih ada perubahan keluaran.",
                "misconceptionTag": "concept-2024-04-choice-3"
              },
              {
                "id": "2024-uts1-q3-checkpoint-option-4",
                "label": "Penguat membatasi keluaran pada tegangan tetap, sehingga besar gaya tidak lagi terbaca.",
                "feedback": "Pembatasan atau saturasi bukan mekanisme yang dinyatakan. Sistem tetap mengukur perubahan gaya melalui keseimbangan umpan balik.",
                "misconceptionTag": "concept-2024-04-choice-4"
              }
            ],
            "correctOptionId": "2024-uts1-q3-checkpoint-option-2"
          }
        },
        {
          "id": "2024-uts1-q3-step-2",
          "title": "a · Gabungkan penguatan jalur maju",
          "content": "Ketiga blok tersusun seri: keluaran satu blok menjadi masukan blok berikutnya. Maka penguatan total jalur maju $A$ adalah hasil kali ketiganya.\n\nPerkalian faktor bilangan memberi $10^{-4}\\times100\\times10^3=10$. Jadi $A=10V_s$, dengan satuan gabungan V/N. Masukkan nilai numerik $V_s$ dalam volt sesuai diagram.\n\n$$\nA=(10^{-4})(100V_s)(10^3)=10V_s,\\qquad V_o=A(F-10V_o)\n$$"
        },
        {
          "id": "2024-uts1-q3-step-3",
          "title": "a · Selesaikan persamaan yang memuat keluaran di dua ruas",
          "content": "Buka kurung: $V_o=AF-10AV_o$. Tambahkan $10AV_o$ ke kedua ruas, lalu keluarkan $V_o$ sebagai faktor. Kita tidak boleh memakai $V_o=AF$ karena itu menghapus gaya balik.\n\nBagi dengan $1+10A$. Setelah memasukkan $A=10V_s$, penyebut menjadi $1+100V_s$. Tanda plus pada penyebut berasal dari tanda minus di simpul penjumlah.\n\n$$\n\\begin{aligned}(1+10A)V_o&=AF\\\\V_o&=\\frac{A}{1+10A}F=\\frac{10V_s}{1+100V_s}F\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts1-q3-step-4",
          "title": "a(i) · Hitung keluaran untuk catu 1,0 V",
          "content": "Pada $V_s=1{,}0$ V, penguatan maju $A=10$ V/N dan loop gain $AB=100$. Masukkan gaya 50 N ke rumus tertutup.\n\nGaya baliknya $10V_o\\approx49{,}505$ N, sedikit di bawah 50 N. Selisih sekitar 0,495 N tetap diperlukan untuk menghasilkan keluaran melalui penguatan maju yang terbatas.\n\n$$\nV_{o,1}=\\frac{10(1.0)}{1+100(1.0)}(50)=\\frac{500}{101}=4.950495\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q3-step-5",
          "title": "a(ii) · Hitung keluaran untuk catu 1,5 V",
          "content": "Pada $V_s=1{,}5$ V, penguatan maju naik menjadi 15 V/N dan loop gain menjadi 150. Gaya masuk serta penguatan jalur balik tetap.\n\nKeluaran menjadi sekitar 4,96689 V. Gaya balik naik menjadi sekitar 49,669 N dan gaya galat turun menjadi sekitar 0,331 N.\n\n$$\nV_{o,2}=\\frac{10(1.5)}{1+100(1.5)}(50)=\\frac{750}{151}=4.966887\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q3-step-6",
          "title": "b · Bandingkan perubahan catu dan keluaran",
          "content": "Catu naik 50%, dari 1,0 menjadi 1,5 V. Keluaran hanya naik sekitar 0,01639 V. Bagi kenaikan keluaran dengan keluaran awal untuk menghitung perubahan relatifnya.\n\nKenaikan keluaran sekitar 0,331%, jauh lebih kecil daripada 50%. Jadi umpan balik menekan pengaruh perubahan catu, tetapi belum menghilangkannya sepenuhnya.\n\n$$\n\\frac{V_{o,2}-V_{o,1}}{V_{o,1}}(100\\%)=\\frac{4.966887-4.950495}{4.950495}(100\\%)=0.33113\\%\n$$"
        },
        {
          "id": "2024-uts1-q3-step-7",
          "title": "b · Jelaskan mengapa hasil mendekati 5 V",
          "content": "Jika loop gain $AB$ jauh lebih besar daripada satu, penyebut $1+AB$ hampir sama dengan $AB$. Maka penguatan tertutup mendekati $1/B$, yaitu 0,1 V/N.\n\nUntuk 50 N, batas pendekatan itu adalah 5 V. Kedua hasil berada sedikit di bawah 5 V dan mendekatinya saat penguatan maju naik. Ini menjelaskan perbaikan kestabilan skala, selama penguat dan aktuator tidak melewati batas kerja.\n\n$$\n\\frac{V_o}{F}=\\frac{A}{1+AB}\\approx\\frac1B\\quad(AB\\gg1),\\qquad V_o\\approx\\frac{50}{10}=5\\ \\mathrm V\n$$"
        }
      ],
      "finalAnswer": "Keluaran sekitar 4,95050 V pada catu 1,0 V dan 4,96689 V pada catu 1,5 V. Catu naik 50%, tetapi keluaran naik sekitar 0,331%; umpan balik negatif menekan kepekaan terhadap perubahan catu.\n\n$$\n\\boxed{V_o(1.0\\ \\mathrm V)=4.95050\\ \\mathrm V,\\qquad V_o(1.5\\ \\mathrm V)=4.96689\\ \\mathrm V}\n$$",
      "takeaway": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
    },
    {
      "id": "2024-uts2-q2",
      "kind": "problem",
      "slug": "2024-uts2-q2",
      "title": "Flowmeter, resolver, dan detektor jarak",
      "source": "UTS 2 2024 · Soal 2",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3/view",
        "file": "2024-uts2.pdf",
        "pages": [
          1,
          2
        ],
        "original": "2. Conceptual Questions: Flowmeter, Resolver, Inductive and Optical Proximity\n(a) [5%] In a differential pressure flowmeter, why is the discharge coefficient (\\(C_d\\)) needed to determine the fluid flow?\n(b) [5%] There are three types of differential pressure flowmeters: orifice, nozzle, and venturi. Why is the orifice meter the most widely used in industry? Does the orifice have the highest discharge coefficient (\\(C_d\\))?\n(c) [5%] Please explain briefly the working principle of the following resolver.\n(d) [5%] Explain briefly how an inductive proximity works.\n(e) [5%] Explain briefly how an optical proximity works.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
          "pages": [
            1,
            2,
            9,
            10,
            16
          ]
        }
      },
      "exam": {
        "term": "UTS 2",
        "year": 2024,
        "number": 2
      },
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "tags": [
        "Sistem ukur dan umpan balik"
      ],
      "statement": "(a) Mengapa flowmeter beda tekanan memerlukan koefisien debit $C_d$? (b) Mengapa orifis banyak dipakai dibanding nozzle dan venturi? Apakah nilai $C_d$-nya paling tinggi? (c) Jelaskan resolver pada gambar, dengan keluaran stator yang sebanding dengan sinus dan kosinus sudut poros. (d) Jelaskan detektor jarak induktif. (e) Jelaskan detektor jarak optik.",
      "simulation": {
        "id": "2024-uts2-q2-visual",
        "type": "ipe-resolver",
        "title": "Resolver",
        "caption": "Dua amplitudo cukup untuk menentukan sudut pada satu putaran.",
        "params": [
          {
            "key": "angle",
            "label": "Sudut rotor θ",
            "min": 0,
            "max": 360,
            "step": 1,
            "defaultValue": 45,
            "unit": "°"
          }
        ],
        "data": {
          "angle": 45,
          "visualKind": "resolver"
        }
      },
      "steps": [
        {
          "id": "2024-uts2-q2-step-1",
          "title": "a · Mulai dari hubungan tekanan dan aliran",
          "content": "**Flowmeter beda tekanan** (pengukur debit dari selisih tekanan) menyempitkan jalur aliran. Untuk debit yang sama, fluida bergerak lebih cepat pada penampang sempit. Kita memakai hubungan Bernoulli untuk mengaitkan kenaikan kecepatan dengan penurunan tekanan statis.\n\nKontinuitas memastikan debit di kedua penampang sama. Bernoulli tanpa rugi kemudian memberi debit ideal dari beda tekanan, massa jenis, dan ukuran penampang. Kata “ideal” menandai asumsi bahwa rugi aliran belum masuk.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Urutan fungsi dan satuan sinyal menentukan model sistem ukur.",
            "commonPitfall": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
          },
          "simulation": {
            "id": "2024-uts2-q2-step-1-visual",
            "type": "ipe-orifice",
            "title": "Aliran melalui orifice",
            "caption": "Perubahan Cd mengubah debit nyata pada beda tekanan yang sama.",
            "params": [
              {
                "key": "pressure",
                "label": "Beda tekanan Δp",
                "min": 0,
                "max": 20,
                "step": 0.1,
                "defaultValue": 10,
                "unit": "kPa"
              },
              {
                "key": "diameterRatio",
                "label": "d / D",
                "min": 0.15,
                "max": 0.85,
                "step": 0.01,
                "defaultValue": 0.5
              },
              {
                "key": "Cd",
                "label": "Koefisien debit Cd",
                "min": 0,
                "max": 1,
                "step": 0.001,
                "defaultValue": 0.62
              }
            ],
            "data": {
              "Cd": 0.62,
              "D": 0.1,
              "d": 0.05,
              "rho": 1000,
              "dp": 10000,
              "visualKind": "orifice"
            }
          }
        },
        {
          "id": "2024-uts2-q2-step-2",
          "title": "a · Mengapa hasil ideal perlu Cd?",
          "content": "Aliran nyata memiliki rugi, kontraksi jet, dan profil kecepatan yang tidak seragam. **Koefisien debit** (rasio debit nyata terhadap debit ideal), $C_d$, mengoreksi hasil ideal untuk definisi alat yang sama.\n\nKedua besaran sama-sama debit, sehingga satuan pada perbandingan saling menghapus. Nilai $C_d$ tidak bersatuan. Gunakan nilai yang cocok dengan geometri, lokasi lubang tekanan, bilangan Reynolds, dan luas acuan. Koefisien tersebut bukan faktor keamanan.\n\n$$\nC_d=\\frac{Q_{\\mathrm{actual}}}{Q_{\\mathrm{ideal}}}\\quad\\Longrightarrow\\quad Q_{\\mathrm{actual}}=C_dQ_{\\mathrm{ideal}}\n$$",
          "simulation": {
            "id": "2024-uts2-q2-step-2-visual",
            "type": "ipe-orifice",
            "title": "Aliran melalui orifice",
            "caption": "Perubahan Cd mengubah debit nyata pada beda tekanan yang sama.",
            "params": [
              {
                "key": "pressure",
                "label": "Beda tekanan Δp",
                "min": 0,
                "max": 20,
                "step": 0.1,
                "defaultValue": 10,
                "unit": "kPa"
              },
              {
                "key": "diameterRatio",
                "label": "d / D",
                "min": 0.15,
                "max": 0.85,
                "step": 0.01,
                "defaultValue": 0.5
              },
              {
                "key": "Cd",
                "label": "Koefisien debit Cd",
                "min": 0,
                "max": 1,
                "step": 0.001,
                "defaultValue": 0.62
              }
            ],
            "data": {
              "Cd": 0.62,
              "D": 0.1,
              "d": 0.05,
              "rho": 1000,
              "dp": 10000,
              "visualKind": "orifice"
            }
          }
        },
        {
          "id": "2024-uts2-q2-step-3",
          "title": "b · Pisahkan alasan pemakaian dari nilai koefisien",
          "content": "Orifis memakai pelat berlubang yang sederhana. Bentuk ini membuat alat ringkas, murah, dan mudah diganti. Keuntungan pemasangan dan perawatan dapat menjelaskan pemakaian luasnya.\n\nNilai $C_d$ yang mendekati satu berarti hasil nyata dekat dengan perhitungan ideal pada acuan yang dipakai. Angka itu sendiri tidak menentukan harga, ukuran, keandalan, atau kemudahan perawatan."
        },
        {
          "id": "2024-uts2-q2-step-4",
          "title": "b · Bandingkan orifis, nozzle, dan venturi",
          "content": "Materi memberi rentang $C_d$ orifis 0,58 sampai 0,65. Rentang nozzle adalah 0,93 sampai 0,98; rentang venturi 0,95 sampai 0,995. Jadi orifis tidak memiliki koefisien paling tinggi.\n\nOrifis juga umumnya menimbulkan kehilangan tekanan permanen lebih besar. Venturi memakai perubahan penampang yang bertahap sehingga pemulihan tekanannya lebih baik. Kita memilih alat dengan menimbang biaya dan rugi tekanan, bukan satu angka saja."
        },
        {
          "id": "2024-uts2-q2-step-5",
          "title": "c · Ikuti energi listrik pada resolver",
          "content": "**Resolver** (sensor sudut dengan rotor dan kumparan stator) mengukur sudut poros melalui perubahan kopling magnetik. Eksitasi AC menghasilkan medan yang berubah terhadap waktu. Medan rotor menginduksi tegangan pada dua kumparan stator yang sumbunya berselisih 90°.\n\nPada gambar jenis brushless, transformator putar menyalurkan eksitasi ke rotor tanpa kontak geser. Putaran poros mengubah seberapa kuat medan rotor terhubung ke tiap kumparan stator.\n\nKopling magnetik menyatakan seberapa kuat medan dari satu kumparan menimbulkan tegangan pada kumparan lain. Putaran mengubah kopling tersebut, sehingga tegangan membawa informasi sudut.",
          "simulation": {
            "id": "2024-uts2-q2-step-5-visual",
            "type": "ipe-resolver",
            "title": "Resolver",
            "caption": "Putaran poros mengubah amplitudo sinus dan kosinus.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut rotor θ",
                "min": 0,
                "max": 360,
                "step": 1,
                "defaultValue": 45,
                "unit": "°"
              }
            ],
            "data": {
              "angle": 45,
              "visualKind": "resolver"
            }
          }
        },
        {
          "id": "2024-uts2-q2-step-6",
          "title": "c · Mengapa perlu dua keluaran?",
          "content": "Setelah **demodulasi** (pengambilan amplitudo dan tanda dari sinyal AC), $V_s$ menyatakan amplitudo bertanda yang sebanding dengan sinus sudut; $V_c$ sebanding dengan kosinus. Faktor $k$ adalah perbandingan kopling dan $V_{\\mathrm{ref}}$ adalah amplitudo eksitasi.\n\nKedua tanda memberi kuadran sudut. Rasio sinus/kosinus saja kehilangan informasi ini jika tanda tidak dipertahankan. Fungsi atan2 memakai kedua keluaran untuk menentukan sudut satu putaran. Sinus dan kosinus tersebut mengikuti sudut poros; keduanya tetap membawa frekuensi AC eksitasi yang sama.\n\n$$\nV_s=kV_{\\mathrm{ref}}\\sin\\theta,\\qquad V_c=kV_{\\mathrm{ref}}\\cos\\theta,\\qquad\\theta=\\operatorname{atan2}(V_s,V_c)\n$$",
          "simulation": {
            "id": "2024-uts2-q2-step-6-visual",
            "type": "ipe-resolver",
            "title": "Resolver",
            "caption": "Putaran poros mengubah amplitudo sinus dan kosinus.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut rotor θ",
                "min": 0,
                "max": 360,
                "step": 1,
                "defaultValue": 45,
                "unit": "°"
              }
            ],
            "data": {
              "angle": 45,
              "visualKind": "resolver"
            }
          }
        },
        {
          "id": "2024-uts2-q2-step-7",
          "title": "d · Dari logam menuju perubahan osilator",
          "content": "Kumparan detektor induktif membentuk medan magnet bolak-balik. Saat target logam mendekat, medan itu menimbulkan arus pusar pada target. Arus tersebut mengambil energi dan mengubah beban osilator.\n\nRangkaian membaca perubahan amplitudo atau kondisi osilasi. Dengan begitu, alat mendeteksi logam tanpa harus menyentuhnya.",
          "simulation": {
            "id": "2024-uts2-q2-step-7-visual",
            "type": "ipe-system",
            "title": "Sistem ukur",
            "caption": "Kumparan, target logam, lalu keluaran sakelar.",
            "params": [
              {
                "key": "gap",
                "label": "Posisi relatif target",
                "min": 0,
                "max": 100,
                "step": 1,
                "defaultValue": 40,
                "unit": "%"
              }
            ],
            "data": {
              "mode": "inductive",
              "visualKind": "system"
            }
          }
        },
        {
          "id": "2024-uts2-q2-step-8",
          "title": "d · Bedakan deteksi dari pengukuran jarak",
          "content": "Detektor membandingkan perubahan sinyal dengan suatu ambang. Ketika ambang terlewati, keluaran berubah ON/OFF. Status ini menjawab apakah target berada dalam daerah deteksi.\n\nKeluaran sakelar tidak langsung menyatakan jarak dalam milimeter. Untuk mengukur jarak secara terus-menerus, kita memerlukan sensor dan kalibrasi yang memang memberi keluaran posisi.",
          "simulation": {
            "id": "2024-uts2-q2-step-8-visual",
            "type": "ipe-system",
            "title": "Sistem ukur",
            "caption": "Kumparan, target logam, lalu keluaran sakelar.",
            "params": [
              {
                "key": "gap",
                "label": "Posisi relatif target",
                "min": 0,
                "max": 100,
                "step": 1,
                "defaultValue": 40,
                "unit": "%"
              }
            ],
            "data": {
              "mode": "inductive",
              "visualKind": "system"
            }
          }
        },
        {
          "id": "2024-uts2-q2-step-9",
          "title": "e · Ikuti lintasan cahaya",
          "content": "Detektor optik memiliki pemancar dan penerima. Pada through-beam, keduanya berhadapan dan benda memutus berkas. Pada retroreflective, pemancar serta penerima berada di sisi yang sama; reflektor mengembalikan berkas.\n\nPada kedua susunan itu, keberadaan benda mengubah cahaya yang diterima. Rangkaian membandingkan sinyal dengan ambang dan mengubah status deteksi.",
          "simulation": {
            "id": "2024-uts2-q2-step-9-visual",
            "type": "ipe-system",
            "title": "Sistem ukur",
            "caption": "Objek menghalangi lintasan cahaya dan mengubah status deteksi.",
            "params": [
              {
                "key": "gap",
                "label": "Posisi relatif target",
                "min": 0,
                "max": 100,
                "step": 1,
                "defaultValue": 40,
                "unit": "%"
              }
            ],
            "data": {
              "mode": "optical",
              "visualKind": "system"
            }
          }
        },
        {
          "id": "2024-uts2-q2-step-10",
          "title": "e · Mengapa cahaya dipancarkan sebagai pulsa?",
          "content": "Materi menyebut pulsa inframerah agar penerima dapat mengenali pola dari pemancarnya sendiri. Cahaya sekitar yang tidak memiliki pola itu lebih mudah dipisahkan dari sinyal ukur.\n\nPengenalan pola pulsa membantu menekan gangguan cahaya sekitar, tetapi tidak membuat semua kondisi optik setara. Penempatan, penghalang, dan pantulan tetap memengaruhi cahaya yang sampai ke penerima.",
          "simulation": {
            "id": "2024-uts2-q2-step-10-visual",
            "type": "ipe-system",
            "title": "Sistem ukur",
            "caption": "Objek menghalangi lintasan cahaya dan mengubah status deteksi.",
            "params": [
              {
                "key": "gap",
                "label": "Posisi relatif target",
                "min": 0,
                "max": 100,
                "step": 1,
                "defaultValue": 40,
                "unit": "%"
              }
            ],
            "data": {
              "mode": "optical",
              "visualKind": "system"
            }
          }
        }
      ],
      "finalAnswer": "Cd mengoreksi debit ideal. Orifis unggul pada kesederhanaan dan biaya, bukan pada Cd tertinggi. Resolver membaca sudut; detektor induktif membaca kedekatan logam; detektor optik membaca perubahan cahaya.",
      "takeaway": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
    },
    {
      "id": "2024-uas-q5",
      "kind": "problem",
      "slug": "2024-uas-q5",
      "title": "Galat rata-rata dan sebaran galat sistem",
      "source": "UAS 2024 · Soal 5",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
        "file": "2024-uas.pdf",
        "pages": [
          2
        ],
        "original": "5. [20%] Accuracy of Measurement System\nA pressure measurement system consists of a pressure sensor, deflection bridge, amplifier, and recorder, as shown in the following figure: Input → Pressure Sensor → Deflection Bridge → Amplifier → Recorder → Output.\nThe table gives linear sensitivities K and error bandwidths ±h:\nPressure sensor: \\(10^{-4}\\ \\Omega\\,\\mathrm{Pa}^{-1}\\), ±0.005 Ω.\nDeflection bridge: \\(4\\times10^{-2}\\ \\mathrm{mV}\\,\\Omega^{-1}\\), \\(\\pm5\\times10^{-4}\\ \\mathrm{mV}\\).\nAmplifier: \\(10^3\\ \\mathrm{mV}\\,\\mathrm{mV}^{-1}\\), ±0.5 mV.\nRecorder: \\(250\\ \\mathrm{Pa}\\,\\mathrm{mV}^{-1}\\), ±100 Pa.\n(a) [10%] Given that the recorder is incorrectly adjusted so that its sensitivity is 225 Pa mV⁻¹, calculate the mean error \\(\\bar E\\) for an input pressure of \\(5\\times10^3\\) Pa.\n(b) [10%] Calculate the standard deviation \\(\\sigma_E\\) of the error distribution function.\nSupplied relations: \\(\\bar O_i=K_i\\bar I_i\\), \\(\\sigma_{I_{i+1}}^2=\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+h_i^2/3\\).",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        "Kontribusi galat tiap tahap dianggap independen, seragam, dan berpusat nol; hanya salah setel sensitivitas perekam memberi bias. Masukan 5000 Pa dianggap pasti."
      ],
      "exam": {
        "term": "UAS",
        "year": 2024,
        "number": 5
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Sistem ukur dan umpan balik"
      ],
      "statement": "Sistem terdiri atas sensor tekanan, jembatan defleksi, penguat, lalu perekam. Setiap tahap memiliki sensitivitas K dan setengah lebar galat h. Sensor: $10^{-4}\\ \\Omega/\\mathrm{Pa}$ dan 0,005 Ω. Jembatan: $4\\times10^{-2}\\ \\mathrm{mV}/\\Omega$ dan $5\\times10^{-4}$ mV. Penguat: $10^3\\ \\mathrm{mV}/\\mathrm{mV}$ dan 0,5 mV. Perekam: 250 Pa/mV dan 100 Pa.\n\n\n(a) Perekam keliru disetel menjadi 225 Pa/mV. Hitung galat rata-rata untuk masukan 5000 Pa. (b) Hitung simpangan baku galat. Gunakan $\\bar O_i=K_i\\bar I_i$ dan $\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+h_i^2/3$.",
      "simulation": {
        "id": "2024-uas-q5-visual",
        "type": "ipe-system",
        "title": "Sistem ukur",
        "caption": "Setiap galat melewati semua sensitivitas setelahnya. Bandingkan setelan perekam aktual dan nominal.",
        "params": [
          {
            "key": "input",
            "label": "Tekanan masukan",
            "min": 0,
            "max": 10000,
            "step": 100,
            "defaultValue": 5000,
            "unit": "Pa"
          }
        ],
        "data": {
          "mode": "uncertainty",
          "input": 5000,
          "recorderGain": 225,
          "nominalRecorderGain": 250,
          "gains": [
            0.0001,
            0.04,
            1000,
            225
          ],
          "halfWidths": [
            0.005,
            0.0005,
            0.5,
            100
          ],
          "visualKind": "system"
        }
      },
      "steps": [
        {
          "id": "2024-uas-q5-step-1",
          "title": "a · Ikuti besaran dari masukan ke keluaran",
          "content": "Sistem mengubah tekanan menjadi hambatan, lalu tegangan, tegangan yang diperkuat, dan akhirnya angka tekanan pada perekam. **Sensitivitas** (perubahan keluaran per perubahan masukan) menghubungkan besaran pada tiap tahap. Kita ikuti satuannya agar galat tiap tahap sampai ke keluaran akhir.\n\nUntuk hubungan linear tanpa offset, sensitivitas total adalah hasil kali semua sensitivitas. Kita mulai dengan nilai nominal agar dapat melihat perubahan akibat perekam yang salah setel.\n\n$$\nK_{\\mathrm{nom}}=(10^{-4})(0.04)(1000)(250)=1\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Urutan fungsi dan satuan sinyal menentukan model sistem ukur.",
            "commonPitfall": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
          },
          "checkpoint": {
            "prompt": "Salah setel penguatan membuat rata-rata alat selalu lebih rendah daripada tekanan benar. Pengukuran berulang juga menunjukkan sebaran acak. Apa yang dapat dicapai dengan merata-ratakan banyak pengukuran independen pada setelan yang sama?",
            "options": [
              {
                "id": "2024-uas-q5-checkpoint-option-1",
                "label": "Menghilangkan bias dan sebaran sekaligus karena galat positif dan negatif selalu saling menghapus.",
                "feedback": "Pembatalan acak tidak menghapus pergeseran sistematis yang sama pada semua pengukuran.",
                "misconceptionTag": "concept-2024-09-choice-1"
              },
              {
                "id": "2024-uas-q5-checkpoint-option-2",
                "label": "Memperbaiki sensitivitas alat secara otomatis tanpa kalibrasi atau koreksi.",
                "feedback": "Rata-rata adalah pengolahan data, bukan perubahan penguatan rangkaian. Sensitivitas salah tetap memerlukan koreksi.",
                "misconceptionTag": "concept-2024-09-choice-2"
              },
              {
                "id": "2024-uas-q5-checkpoint-option-3",
                "label": "Mengubah simpangan baku menjadi sama dengan nilai mutlak bias.",
                "feedback": "Bias mengukur pergeseran pusat, sedangkan simpangan baku mengukur sebaran. Tidak ada aturan yang menyamakan keduanya.",
                "misconceptionTag": "concept-2024-09-choice-3"
              },
              {
                "id": "2024-uas-q5-checkpoint-option-4",
                "label": "Mengurangi sebaran rata-rata sampel, tetapi tidak menghilangkan bias akibat penguatan.",
                "feedback": "Benar. Ketidakpastian acak rata-rata dapat turun, sedangkan pusat distribusinya tetap bergeser."
              }
            ],
            "correctOptionId": "2024-uas-q5-checkpoint-option-4"
          }
        },
        {
          "id": "2024-uas-q5-step-2",
          "title": "a · Gunakan sensitivitas perekam yang benar-benar terpasang",
          "content": "Bagian (a) mengganti sensitivitas perekam dari 250 menjadi 225 Pa/mV. Tiga tahap lain tetap. Perbandingan 225/250 = 0,9 membuat skala seluruh sistem juga menjadi 0,9 dari nominal.\n\nPerkalian satuan memberi Pa/Pa, sehingga sensitivitas total tidak bersatuan. Nilai 0,9 berarti alat membaca 90% dari tekanan masukan rata-rata.\n\n$$\nK_{\\mathrm{actual}}=(10^{-4}\\ \\Omega/\\mathrm{Pa})(0.04\\ \\mathrm{mV}/\\Omega)(1000)(225\\ \\mathrm{Pa}/\\mathrm{mV})=0.9\n$$"
        },
        {
          "id": "2024-uas-q5-step-3",
          "title": "a · Hitung rata-rata keluaran tahap demi tahap",
          "content": "Masukan 5000 Pa menghasilkan perubahan hambatan $10^{-4}(5000)=0{,}5\\ \\Omega$. Jembatan mengubahnya menjadi 0,02 mV, lalu penguat menghasilkan 20 mV.\n\nPerekam membaca $225(20)=4500$ Pa. Perhitungan berurutan ini memberi hasil sama dengan sensitivitas total dan membantu memeriksa satuan setiap tahap.\n\n$$\n5000\\ \\mathrm{Pa}\\ \\longrightarrow\\ 0.5\\ \\Omega\\ \\longrightarrow\\ 0.02\\ \\mathrm{mV}\\ \\longrightarrow\\ 20\\ \\mathrm{mV}\\ \\longrightarrow\\ 4500\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2024-uas-q5-step-4",
          "title": "a · Nyatakan tanda galat rata-rata",
          "content": "Kita definisikan galat $E=O-I$, keluaran dikurangi masukan sebenarnya. Pembacaan lebih kecil daripada masukan, sehingga galat rata-ratanya negatif.\n\nHasil −500 Pa menyatakan bias: pusat sebaran pembacaan berada 500 Pa di bawah nilai benar. Ini bukan simpangan baku.\n\n$$\n\\bar E=\\bar O-I=4500-5000=-500\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2024-uas-q5-step-5",
          "title": "b · Pahami arti lebar galat ±h",
          "content": "Tabel memberi batas galat $-h_i$ sampai $+h_i$ pada keluaran tiap tahap. Rumus $h_i^2/3$ yang disediakan mengasumsikan distribusi seragam dalam interval tersebut.\n\nUntuk distribusi ini, varians adalah $h_i^2/3$ dan simpangan bakunya $h_i/\\sqrt3$. Kontribusi awal memakai Ω, mV, dan Pa. Kita perlu menyamakan satuannya sebelum menjumlahkannya.\n\n**Distribusi seragam** (peluang yang sama untuk selang yang sama lebar) memodelkan galat antara kedua batas. Batas ±h bukan simpangan baku; keduanya harus dibedakan sebelum menjumlahkan galat.\n\n$$\n\\sigma_i^2=\\frac{h_i^2}{3}\n$$"
        },
        {
          "id": "2024-uas-q5-step-6",
          "title": "b · Bawa galat sensor dan jembatan ke keluaran",
          "content": "Galat sensor sudah muncul setelah sensor. Galat tersebut hanya melewati jembatan, penguat, dan perekam. Kita tidak mengalikan sensitivitas sensor lagi.\n\nDemikian pula, galat jembatan hanya melewati dua tahap setelahnya. Kita memakai sensitivitas aktual perekam 225 Pa/mV agar konsisten dengan bagian (a).\n\n$$\n\\begin{aligned}h_{1,o}&=0.005(0.04)(1000)(225)=45\\ \\mathrm{Pa}\\\\h_{2,o}&=0.0005(1000)(225)=112.5\\ \\mathrm{Pa}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uas-q5-step-7",
          "title": "b · Bawa dua galat terakhir ke satuan Pa",
          "content": "Galat penguat 0,5 mV masih melewati perekam, sehingga menjadi 112,5 Pa. Galat perekam ±100 Pa sudah memakai satuan keluaran dan tidak melewati penguat lagi.\n\nKeempat setengah lebar yang dapat dibandingkan sekarang adalah 45, 112,5, 112,5, dan 100 Pa. Besarnya ini adalah kontribusi ke pembacaan akhir, bukan batas asli komponen.\n\n$$\nh_{3,o}=0.5(225)=112.5\\ \\mathrm{Pa},\\qquad h_{4,o}=100\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2024-uas-q5-step-8",
          "title": "b · Jumlahkan varians, lalu ambil akar",
          "content": "Untuk galat tahap yang independen, varians kontribusinya menjumlah. Yang dijumlahkan adalah kuadrat simpangan baku, bukan setengah lebar atau simpangan bakunya langsung.\n\nMasukan dianggap tetap, jadi sebaran galat sama dengan sebaran keluaran. Setelah menjumlahkan varians dalam Pa², ambil akar untuk kembali ke Pa.\n\n**Varians** (rata-rata kuadrat simpangan dari nilai tengah) mengukur sebaran. **Simpangan baku** (akar varians) mengembalikan ukuran sebaran ke satuan keluaran.\n\n$$\n\\sigma_E^2=\\frac{45^2+112.5^2+112.5^2+100^2}{3}=12445.8333\\ \\mathrm{Pa^2},\\qquad\\sigma_E=111.5609\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2024-uas-q5-step-9",
          "title": "Pisahkan bias, sebaran, dan asumsi setelan",
          "content": "Pembacaan berpusat pada 4500 Pa, dengan simpangan baku 111,56 Pa dalam model ini. Bias −500 Pa menggeser pusatnya; simpangan baku menggambarkan variasi di sekitar pusat tersebut. Menambah keduanya tidak menghasilkan simpangan baku baru.\n\nJika bagian (b) dianggap memakai perekam nominal 250 Pa/mV, hasilnya 120,76 Pa. Jawaban utama meneruskan setelan aktual 225 Pa/mV dari bagian (a); syarat itu perlu disebut agar dua hasil tidak tercampur."
        }
      ],
      "finalAnswer": "Rata-rata pembacaan 4500 Pa, galat rata-rata −500 Pa, dan simpangan baku galat sekitar 111,56 Pa untuk perekam aktual 225 Pa/mV.\n\n$$\n\\boxed{\\bar O=4500\\ \\mathrm{Pa},\\quad\\bar E=-500\\ \\mathrm{Pa},\\quad\\sigma_E\\approx111.56\\ \\mathrm{Pa}}\n$$",
      "takeaway": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
    },
    {
      "id": "2023-uts1-q1",
      "kind": "problem",
      "slug": "2023-uts1-q1",
      "title": "Peran elemen dalam sistem ukur",
      "source": "UTS 1 2023 · Soal 1",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
        "file": "2023-uts1.pdf",
        "pages": [
          1
        ],
        "original": "1. [10%] Elements of Measurement System\nClassify the following elements as sensing elements, signal conditioning elements, signal processing elements, or data presentation elements.\na. Strain gauge\nb. Thermocouple\nc. Wheatstone bridge\nd. Low Pass Filter\ne. Operational amplifier\nf. Current to voltage converter\ng. Frequency to voltage converter\nh. Accelerometer\ni. Microcontroller\nj. LCD",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Klasifikasi memakai peran utama dalam sistem ukur dasar. Perangkat terpadu dan filter digital dapat mencakup lebih dari satu fungsi.",
        "Istilah pengondisi dan pengolah tidak selalu dibatasi dengan cara yang sama antar-kerangka. Untuk filter dan konverter frekuensi, jawaban harus menyertakan fungsi rangkaian, bukan menyatakan satu label berlaku pada semua implementasi."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2023,
        "number": 1
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Sistem ukur dan umpan balik"
      ],
      "statement": "Kelompokkan tiap elemen menurut peran utamanya: sensor, pengondisi sinyal, pengolah sinyal, atau penyaji data. Daftarnya: (a) strain gauge; (b) termokopel; (c) jembatan Wheatstone; (d) low-pass filter; (e) penguat operasional. Lanjutkan dengan (f) pengubah arus ke tegangan; (g) pengubah frekuensi ke tegangan; (h) akselerometer; (i) mikrokontroler; (j) LCD.",
      "simulation": {
        "id": "2023-uts1-q1-visual",
        "type": "ipe-system",
        "title": "Sistem ukur",
        "caption": "Ikuti urutan besaran fisik, sensor, pengondisi, pengolah, dan tampilan.",
        "params": [],
        "data": {
          "mode": "elements",
          "visualKind": "system"
        }
      },
      "steps": [
        {
          "id": "2023-uts1-q1-step-1",
          "title": "Ikuti fungsi tiap elemen, bukan hanya nama alatnya",
          "content": "Sensor pertama kali merespons besaran fisik yang ingin diukur. Pengondisi sinyal menyiapkan sinyal sensor agar tahap berikutnya dapat membacanya, misalnya dengan memperbesar atau mengubah bentuk listriknya.\n\nPengolah sinyal melakukan operasi pada data, seperti memakai persamaan kalibrasi untuk menghitung nilai ukur. Penyaji data membuat hasil dapat dibaca pengguna, misalnya sebagai angka pada layar.\n\nSatu perangkat lengkap dapat menggabungkan beberapa fungsi. Pada soal ini, kita mengelompokkan elemen berdasarkan fungsi utama yang disebut dalam rantai ukur dasar.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Urutan fungsi dan satuan sinyal menentukan model sistem ukur.",
            "commonPitfall": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
          },
          "checkpoint": {
            "prompt": "Sebuah sistem gaya memakai strain gauge, jembatan Wheatstone, mikrokontroler, dan LCD. Jembatan mengubah perubahan tahanan menjadi beda tegangan. Peran utama jembatan pada rantai ini adalah…",
            "options": [
              {
                "id": "2023-uts1-q1-checkpoint-option-1",
                "label": "Pengolah data, karena jembatan sudah menghitung gaya dalam satuan newton.",
                "feedback": "Jembatan memberi tegangan. Perhitungan gaya melalui persamaan kalibrasi merupakan tugas pengolahan berikutnya.",
                "misconceptionTag": "concept-2023-01-choice-1"
              },
              {
                "id": "2023-uts1-q1-checkpoint-option-2",
                "label": "Elemen sensor, karena semua bagian yang keluarannya berubah adalah sensor.",
                "feedback": "Perubahan keluaran saja tidak menentukan kelas sensor. Dalam rantai ini, strain gauge yang pertama merespons regangan mekanis.",
                "misconceptionTag": "concept-2023-01-choice-2"
              },
              {
                "id": "2023-uts1-q1-checkpoint-option-3",
                "label": "Pengondisi sinyal, karena jembatan mengubah keluaran sensor menjadi bentuk listrik yang lebih mudah dibaca.",
                "feedback": "Benar. Jembatan mengubah perubahan tahanan menjadi beda tegangan untuk tahap berikutnya."
              },
              {
                "id": "2023-uts1-q1-checkpoint-option-4",
                "label": "Penyaji data, karena beda tegangan langsung memberi tampilan bagi pengguna.",
                "feedback": "LCD menyajikan hasil. Tegangan internal belum merupakan tampilan yang dapat dibaca pengguna.",
                "misconceptionTag": "concept-2023-01-choice-4"
              }
            ],
            "correctOptionId": "2023-uts1-q1-checkpoint-option-3"
          }
        },
        {
          "id": "2023-uts1-q1-step-2",
          "title": "a, b, h · Elemen yang langsung merespons besaran fisik",
          "content": "Strain gauge merespons regangan melalui perubahan tahanan. Termokopel merespons keadaan suhu pada dua sambungannya melalui tegangan termoelektrik. Keduanya merupakan elemen sensor.\n\nAkselerometer merespons percepatan dan memberi sinyal yang terkait dengannya. Walau produk akselerometer dapat memiliki rangkaian pengondisi di dalamnya, peran utamanya di sini tetap sensor percepatan."
        },
        {
          "id": "2023-uts1-q1-step-3",
          "title": "c, e · Ubah dan perbesar sinyal sensor",
          "content": "Jembatan Wheatstone dapat mengubah perubahan tahanan kecil menjadi beda tegangan. Besaran regangan atau suhu lebih dulu mengubah sensor; jembatan membaca perubahan listrik tersebut.\n\nPenguat operasional, atau op-amp, dapat memperbesar tegangan kecil atau menyangga sinyal agar tahap berikutnya tidak banyak membebaninya. Dalam penggunaan ini, jembatan dan op-amp merupakan pengondisi sinyal."
        },
        {
          "id": "2023-uts1-q1-step-4",
          "title": "d, f, g · Saring dan ubah bentuk listrik sinyal",
          "content": "Low-pass filter meneruskan komponen frekuensi rendah dan melemahkan komponen yang lebih tinggi. Dalam rangkaian pembacaan sensor, fungsi ini membantu menyiapkan sinyal sebelum pengolahan berikutnya.\n\nPengubah arus ke tegangan dan pengubah frekuensi ke tegangan membuat sinyal cocok dengan masukan tahap berikutnya. Keduanya mengubah bentuk sinyal yang sudah ada, sehingga termasuk pengondisi sinyal.\n\nKlasifikasi filter bergantung konteks. Filter analog pada rantai ini dikelompokkan sebagai pengondisi; algoritma filter yang bekerja pada sampel digital juga dapat dibahas sebagai pengolahan sinyal.\n\n> Kategori ini mengikuti fungsi rangkaian. Filter analog dan konverter frekuensi-ke-tegangan dapat ditempatkan berbeda dalam kerangka kuliah lain. Jika konverter hanya mengubah bentuk listrik sinyal, ia berperan sebagai pengondisi. Jika kerangka kuliah menempatkan penentuan frekuensi atau pemetaan pulsa ke nilai ukur sebagai pengolahan, elemen g dapat disebut pengolah. Jelaskan fungsi yang dipakai sebagai dasar label."
        },
        {
          "id": "2023-uts1-q1-step-5",
          "title": "i · Olah data dengan mikrokontroler",
          "content": "Mikrokontroler menjalankan program pada pembacaan yang masuk. Program dapat mengubah kode ADC menjadi tegangan, menerapkan kalibrasi, mengurangi offset, atau menghitung rata-rata.\n\nOperasi tersebut memberi makna atau memperbaiki bentuk data ukur, sehingga mikrokontroler masuk pengolah sinyal. Kemampuannya mengendalikan LCD tidak mengubah peran utama yang dimaksud soal."
        },
        {
          "id": "2023-uts1-q1-step-6",
          "title": "j · Sajikan hasil dengan LCD",
          "content": "LCD menampilkan angka, satuan, atau informasi hasil ukur. Pengguna membaca hasil melalui tampilan tersebut, sehingga LCD termasuk penyaji data.\n\nLCD tidak harus mengetahui bagaimana sensor menghasilkan sinyal. Ia menerima hasil yang sudah disiapkan oleh tahap lain untuk ditampilkan."
        },
        {
          "id": "2023-uts1-q1-step-7",
          "title": "Cocokkan seluruh elemen dengan kelompoknya",
          "content": "Klasifikasi lengkap di bawah mengikuti fungsi utama pada rantai ukur dasar. Untuk elemen yang dapat menjalankan banyak fungsi, penjelasan peran lebih kuat daripada menghafal satu label tanpa konteks.\n\n| Butir | Elemen | Kelompok / Group |\n| --- | --- | --- |\n| a | Strain gauge | Sensor / Sensing |\n| b | Thermocouple | Sensor / Sensing |\n| c | Wheatstone bridge | Pengondisi / Conditioning |\n| d | Low-pass filter | Pengondisi / Conditioning |\n| e | Operational amplifier | Pengondisi / Conditioning |\n| f | Current-to-voltage converter | Pengondisi / Conditioning |\n| g | Frequency-to-voltage converter | Pengondisi / Conditioning |\n| h | Accelerometer | Sensor / Sensing |\n| i | Microcontroller | Pengolah / Processing |\n| j | LCD | Penyaji / Presentation |"
        }
      ],
      "finalAnswer": "Sensor: a, b, h. Pengondisi sinyal: c, d, e, f, g. Pengolah sinyal: i. Penyaji data: j. Low-pass filter diklasifikasikan sebagai pengondisi analog dalam konteks rantai ini. Untuk d dan g, jelaskan fungsi rangkaiannya karena batas pengondisi dan pengolah dapat berbeda menurut kerangka.",
      "takeaway": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
    },
    {
      "id": "ipe-systems-practice",
      "kind": "practice",
      "slug": "ipe-systems-practice",
      "title": "Latihan: Sistem ukur dan umpan balik",
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "intro": "Latihan ini membantu Anda memilih model dan menjelaskan alasan. Mulai dari pilihan ganda, tinjau contoh yang keliru, lalu susun jawaban sendiri. Gunakan rubrik untuk memeriksa alur, asumsi, dan batas kesimpulan Anda.",
      "questions": [
        {
          "id": "concept-2023-01",
          "prompt": "Sebuah sistem gaya memakai strain gauge, jembatan Wheatstone, mikrokontroler, dan LCD. Jembatan mengubah perubahan tahanan menjadi beda tegangan. Peran utama jembatan pada rantai ini adalah…",
          "options": [
            {
              "id": "concept-2023-01-option-1",
              "label": "Pengolah data, karena jembatan sudah menghitung gaya dalam satuan newton.",
              "feedback": "Jembatan memberi tegangan. Perhitungan gaya melalui persamaan kalibrasi merupakan tugas pengolahan berikutnya.",
              "misconceptionTag": "concept-2023-01-choice-1"
            },
            {
              "id": "concept-2023-01-option-2",
              "label": "Elemen sensor, karena semua bagian yang keluarannya berubah adalah sensor.",
              "feedback": "Perubahan keluaran saja tidak menentukan kelas sensor. Dalam rantai ini, strain gauge yang pertama merespons regangan mekanis.",
              "misconceptionTag": "concept-2023-01-choice-2"
            },
            {
              "id": "concept-2023-01-option-3",
              "label": "Pengondisi sinyal, karena jembatan mengubah keluaran sensor menjadi bentuk listrik yang lebih mudah dibaca.",
              "feedback": "Benar. Jembatan mengubah perubahan tahanan menjadi beda tegangan untuk tahap berikutnya."
            },
            {
              "id": "concept-2023-01-option-4",
              "label": "Penyaji data, karena beda tegangan langsung memberi tampilan bagi pengguna.",
              "feedback": "LCD menyajikan hasil. Tegangan internal belum merupakan tampilan yang dapat dibaca pengguna.",
              "misconceptionTag": "concept-2023-01-choice-4"
            }
          ],
          "correctOptionId": "concept-2023-01-option-3",
          "explanation": "Strain gauge berhubungan langsung dengan regangan dan mengubah tahanan. Jembatan membaca perubahan itu sebagai beda tegangan, sehingga perannya pengondisi sinyal. Mengubah bentuk sinyal belum sama dengan menghitung gaya lewat kalibrasi atau menampilkan hasil.",
          "relatedProblemId": "2023-uts1-q1"
        },
        {
          "id": "concept-2024-04",
          "prompt": "Pada transduser gaya dengan umpan balik negatif, perubahan catu menaikkan penguatan jalur maju. Gaya masuk dan penguatan jalur umpan balik tetap. Jika penguatan loop sudah besar, mengapa keluaran berubah jauh lebih kecil daripada perubahan penguatan maju?",
          "options": [
            {
              "id": "concept-2024-04-option-1",
              "label": "Penguatan total selalu sama dengan hasil kali penguatan maju dan umpan balik.",
              "feedback": "Hasil kali itu adalah loop gain. Penguatan masukan dan keluaran tertutup juga memuat penyebut dari pengurangan umpan balik.",
              "misconceptionTag": "concept-2024-04-choice-1"
            },
            {
              "id": "concept-2024-04-option-2",
              "label": "Kenaikan keluaran memperbesar gaya penyeimbang, sehingga mengurangi gaya galat yang masuk ke jalur maju.",
              "feedback": "Benar. Respons gaya penyeimbang menekan kepekaan terhadap perubahan jalur maju, selama loop bekerja sesuai model."
            },
            {
              "id": "concept-2024-04-option-3",
              "label": "Umpan balik membuat penguatan maju sama sekali tidak memengaruhi keluaran pada semua kondisi.",
              "feedback": "Kebal terhadap perubahan penguatan hanya pendekatan saat loop gain besar. Pada gain terbatas masih ada perubahan keluaran.",
              "misconceptionTag": "concept-2024-04-choice-3"
            },
            {
              "id": "concept-2024-04-option-4",
              "label": "Penguat membatasi keluaran pada tegangan tetap, sehingga besar gaya tidak lagi terbaca.",
              "feedback": "Pembatasan atau saturasi bukan mekanisme yang dinyatakan. Sistem tetap mengukur perubahan gaya melalui keseimbangan umpan balik.",
              "misconceptionTag": "concept-2024-04-choice-4"
            }
          ],
          "correctOptionId": "concept-2024-04-option-2",
          "explanation": "Jalur negatif mengurangi gaya penyeimbang dari gaya masukan. Saat keluaran naik, gaya penyeimbang juga naik dan menahan perubahan lebih lanjut. Pada loop gain besar, penguatan tertutup mendekati kebalikan penguatan umpan balik, tetapi ketergantungan pada jalur maju belum tepat nol.",
          "relatedProblemId": "2024-uts1-q3"
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-systems-guided",
          "mode": "spot-the-error",
          "title": "Tinjau peran jembatan",
          "prompt": "Tentukan langkah pertama yang perlu diperbaiki dalam alasan berikut.",
          "workSample": "Strain gauge menerima gaya dan berubah tahanan. Jembatan membaca perubahan tahanan. Jadi, jembatan merupakan sensor gaya utama.",
          "question": {
            "id": "ipe-systems-guided-question",
            "prompt": "Bagian mana yang perlu Anda ubah?",
            "options": [
              {
                "id": "ipe-systems-guided-question-option-1",
                "label": "Kesimpulan peran jembatan: jembatan mengondisikan sinyal tahanan.",
                "feedback": "Tepat. Sensor menerima pengaruh fisik; jembatan mengubah bentuk sinyal listriknya."
              },
              {
                "id": "ipe-systems-guided-question-option-2",
                "label": "Pernyataan bahwa strain gauge berubah tahanan.",
                "feedback": "Perubahan tahanan merupakan respons sensor yang sesuai. Kesalahan muncul pada label fungsi jembatan.",
                "misconceptionTag": "systems-guided-choice-2"
              },
              {
                "id": "ipe-systems-guided-question-option-3",
                "label": "Peran pengolah: pengolah harus disebut sensor karena menghasilkan nilai gaya.",
                "feedback": "Pengolah memberi makna pada data sensor. Pengolah tidak langsung menerima gaya dalam rantai ini.",
                "misconceptionTag": "systems-guided-choice-3"
              }
            ],
            "correctOptionId": "ipe-systems-guided-question-option-1",
            "explanation": "Pertahankan dua kalimat pertama. Ubah kesimpulan terakhir menjadi peran pengondisi sinyal. Sebut besaran masuk dan keluar untuk mendukung label tersebut."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-systems-essay",
          "title": "Jelaskan pilihan model sistem ukur",
          "prompt": "Sistem gaya memakai sensor tahanan, jembatan, penguat, pengolah, dan layar. Jelaskan peran tiap tahap. Lalu, jelaskan cara umpan balik negatif dapat mengurangi pengaruh perubahan penguatan maju. Anda tidak perlu menghitung angka.",
          "sections": [
            "Model dan asumsi",
            "Alur penalaran",
            "Kesimpulan dan batas"
          ],
          "hints": [
            "Mulai dari gaya dan ikuti bentuk sinyalnya.",
            "Tulis besaran masuk dan keluar pada setiap tahap.",
            "Pisahkan fungsi sensor, pengondisi, pengolah, dan penyaji. Pada umpan balik, bandingkan sinyal balik dengan masukan."
          ],
          "rubric": [
            {
              "id": "ipe-systems-rubric-model",
              "label": "Model dan asumsi",
              "weight": 35,
              "fullCredit": "Menyebut perubahan tahanan sebagai respons sensor, lalu membedakan empat fungsi utama.",
              "commonPartialError": "Jangan menyebut semua alat yang terhubung ke sensor sebagai sensor."
            },
            {
              "id": "ipe-systems-rubric-reasoning",
              "label": "Alur penalaran",
              "weight": 40,
              "fullCredit": "Menelusuri bentuk serta satuan sinyal dan menjelaskan pengurangan selisih melalui umpan balik negatif."
            },
            {
              "id": "ipe-systems-rubric-conclusion",
              "label": "Kesimpulan dan batas",
              "weight": 25,
              "fullCredit": "Menyatakan bahwa manfaat umpan balik bergantung pada model dan kestabilan, bukan berlaku tanpa batas."
            }
          ],
          "verifiedOutline": "Sensor merespons gaya melalui perubahan tahanan. Jembatan dan penguat menyiapkan tegangan untuk pengolah. Pengolah menerapkan kalibrasi, lalu layar menyajikan gaya. Periksa satuan pada setiap hubungan. Umpan balik negatif mengurangi selisih antara masukan dan sinyal balik. Pengaruh perubahan penguatan maju dapat mengecil saat penguatan loop memadai. Kesimpulan tersebut tetap memerlukan model dan kestabilan yang sesuai."
        }
      ]
    }
  ]
};

export const english: NonNullable<CourseTranslation['modules']>[string] = {
  "title": "Measurement systems and feedback",
  "items": {
    "ipe-systems-material": {
      "title": "Trace a quantity from the sensor to the reading",
      "examHook": {
        "prompt": "A strain gauge changes resistance under force. Why does the system still need a bridge, a processor, and a display?",
        "targetOutcome": "You can explain each stage and the direction of feedback."
      },
      "body": "Start with the quantity you want to measure. Then follow how the signal changes at each stage. This approach helps you explain an instrument without memorizing its name.\n\nOne device can perform several functions. We name the function that matches its use in the question.\n\n[Open the worked solution: Roles of measurement-system elements](?item=2025-uas-q1).",
      "microUnits": [
        {
          "id": "ipe-systems-principle",
          "title": "Choose a model from the stated conditions",
          "intuition": "Force changes the sensor resistance. A bridge turns that resistance change into a voltage difference. A processor applies calibration to obtain force. A display shows that value. A **measurement chain** is the sequence of stages that connects a physical quantity to a readable result.",
          "formal": "In a linear series model, each output becomes the next input:\n\n$$y=K_3K_2K_1x.$$\n\nWith negative feedback, compare the input with the feedback signal before applying the forward gain.",
          "validityBounds": "Multiplying gains assumes a linear model without loading between stages. Check the units of every gain. For feedback, check the summing sign and system stability.",
          "decisionCheck": {
            "prompt": "An amplifier raises the sensor voltage before it reaches the processor. What main function does it perform?",
            "options": [
              {
                "id": "ipe-systems-decision-question-option-1",
                "label": "Preparing the signal for the next stage to read.",
                "feedback": "Correct. The amplifier changes the size of an existing electrical sensor signal."
              },
              {
                "id": "ipe-systems-decision-question-option-2",
                "label": "Converting the physical quantity directly into a sensor response.",
                "feedback": "The sensor has already performed that stage. The amplifier receives voltage rather than the original physical quantity."
              },
              {
                "id": "ipe-systems-decision-question-option-3",
                "label": "Presenting the final result to the user.",
                "feedback": "A display makes the result readable to the user. The amplifier prepares the signal for another stage."
              }
            ],
            "explanation": "Identify the function from its input and output. The amplifier receives and produces voltage, so it performs signal conditioning."
          }
        }
      ],
      "checkpoints": [
        "You can explain each stage and the direction of feedback.",
        "The order of functions and signal units determines the measurement model.",
        "Do not classify every device connected to a sensor as a sensing element."
      ],
      "derivations": [
        {
          "id": "ipe-systems-sources",
          "title": "Sources and archive conventions",
          "content": "[Midterm 1, Midterm 2, and final exam archive, 2023 to 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Years follow archive folders; printed paper dates may differ.\n\n[Main reference: Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view). Each worked solution includes its original statement, source pages, and relevant assumptions."
        }
      ]
    },
    "2025-uas-q1": {
      "title": "Roles of measurement-system elements",
      "source": "Final exam 2025 · Question 1",
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Measurement systems and feedback"
      ],
      "statement": "Classify each component as a sensing, signal-conditioning, signal-processing, or data-presentation element. The components are (a) incremental encoder; (b) LVDT; (c) Wheatstone bridge; (d) inverting amplifier; (e) low-pass filter. The list continues: (f) analog-to-digital converter; (g) strain gauge; (h) RTD; (i) current-to-voltage converter; (j) capacitive proximity probe. The source calls RTD “Resistance Temperature Dependence”.",
      "simulation": {
        "title": "Measurement system",
        "caption": "Follow the path from a physical quantity to a signal and readable result.",
        "params": []
      },
      "steps": [
        {
          "id": "2025-uas-q1-step-1",
          "title": "1. Follow the quantity from measurement to information",
          "content": "We classify components by their roles in the system. Start with the physical quantity and follow the signal path. A component can sense the quantity, prepare the signal, process data, or present results. You can use these roles to classify each item.\n\nA component does not need to output a number to be a sensor. Resistance that changes with temperature or strain already carries measurement information.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The order of functions and signal units determines the measurement model.",
            "commonPitfall": "Do not classify every device connected to a sensor as a sensing element."
          }
        },
        {
          "id": "2025-uas-q1-step-2",
          "title": "2. Find the components that directly sense the measurand",
          "content": "Sensing elements directly interact with the quantity we want to measure. Incremental encoder(a) senses motion or angle, while LVDT(b) senses displacement. Strain gauge(g) senses strain, and RTD(h) senses temperature. Capacitive probe(j) senses proximity or distance.\n\nAn RTD and a strain gauge initially produce a resistance change. In an LVDT or encoder, motion changes an electrical signal through the device’s mechanism. Each acts where the physical quantity first becomes a readable signal."
        },
        {
          "id": "2025-uas-q1-step-3",
          "title": "3. Why is the bridge not the primary sensing element?",
          "content": "A Wheatstone bridge compares resistances and produces a voltage difference. If a strain gauge occupies one arm, the gauge senses strain while the bridge makes its resistance change easier to read. The bridge therefore belongs to signal conditioning in item(c)."
        },
        {
          "id": "2025-uas-q1-step-4",
          "title": "4. Find the components that prepare the signal",
          "content": "Signal-conditioning elements adjust signal form or size for readout. (c) A Wheatstone bridge converts resistance imbalance to voltage. (d) An inverting amplifier scales and inverts the signal. (e) A low-pass filter suppresses high-frequency components. (i) A current-to-voltage converter changes current into voltage.\n\nAmplification, filtering, and current-to-voltage conversion retain sensor information while adapting it to the next device. A filter can reject high-frequency interference, but an excessively low cutoff can also remove part of the wanted signal."
        },
        {
          "id": "2025-uas-q1-step-5",
          "title": "5. Place the analog-to-digital converter",
          "content": "Under the functional grouping used here, (f) the ADC is a signal-processing element because it converts an analog value into a digital code. Some architectures include it in acquisition or conditioning. State the conversion function so the classification does not depend on block labels alone.\n\nAn ADC takes an analog input and produces a finite-resolution digital code. A binary number is not yet presentation to the user: a computer or display must still interpret it."
        },
        {
          "id": "2025-uas-q1-step-6",
          "title": "6. Check for a data-presentation element",
          "content": "The list contains no data-presentation element. Examples would be a numeric display, plot, pointer, or recorder. There is no need to force a sensor into this group just to fill every category.\n\nTreat an empty group as a valid result of checking the list, not a reason to force a component into it. This list can include sensors and conditioners without including a display or recorder."
        },
        {
          "id": "2025-uas-q1-step-7",
          "title": "7. Check the classification with a complete example chain",
          "content": "Example: temperature → RTD → bridge → amplifier/filter → ADC → software → display. Temperature changes the RTD resistance; later circuits prepare and convert its signal; the display presents the result. These functions support the classification in the answer."
        }
      ],
      "finalAnswer": "Sensing: a, b, g, h, j. Conditioning: c, d, e, i. Processing: f, under the stated functional convention. Presentation: none in the list.",
      "takeaway": "Do not classify every device connected to a sensor as a sensing element."
    },
    "2024-uts1-q3": {
      "title": "Force transducer with negative feedback",
      "source": "Midterm 1 2024 · Question 3",
      "assumptions": [
        "Blocks are linear, feedback polarity follows the diagram’s minus sign, and amplifier and coil operate without saturation. The analysis concerns steady state."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Measurement systems and feedback"
      ],
      "statement": "A force transducer uses negative feedback. Error force passes through an elastic sensor with gain $10^{-4}$, a displacement sensor with gain $100V_s$, and an amplifier with gain $10^3$, producing $V_o$. A coil-and-magnet feedback block of gain $10$ produces balancing force subtracted from input $F$. (a) Find $V_o$ for $F=50$ N with supplies (i) 1.0 V and (ii) 1.5 V. (b) Explain the practical significance of the supply change.",
      "simulation": {
        "title": "Feedback",
        "caption": "Output drives a balancing force subtracted from input force; supply changes the forward-path gain.",
        "params": [
          {
            "key": "supply",
            "label": "Supply voltage"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uts1-q3-step-1",
          "title": "a · Read the summing-junction signs",
          "content": "The plus input receives external force $F$, while the minus input receives the output-derived balancing force. With feedback gain $B=10\\ \\mathrm{N/V}$, that force is $F_b=BV_o$.\n\nThe forward path does not receive the entire $F$; it receives error force $F_e=F-F_b$. We call this arrangement **negative feedback**: an output rise reduces the forward path’s effective input.\n\n$$\nF_b=10V_o,\\qquad F_e=F-10V_o\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The order of functions and signal units determines the measurement model.",
            "commonPitfall": "Do not classify every device connected to a sensor as a sensing element."
          },
          "checkpoint": {
            "prompt": "In a negative-feedback force transducer, a supply change raises forward-path gain. Input force and feedback gain stay fixed. With an already large loop gain, why does output change much less than the forward gain?",
            "options": [
              {
                "id": "2024-uts1-q3-checkpoint-option-1",
                "label": "Total gain always equals forward gain multiplied by feedback gain.",
                "feedback": "That product is loop gain. Closed-loop input and output gain also includes the denominator arising from feedback subtraction."
              },
              {
                "id": "2024-uts1-q3-checkpoint-option-2",
                "label": "An output rise increases balancing force, reducing the error force applied to the forward path.",
                "feedback": "Correct. Balancing-force response suppresses sensitivity to forward-path changes while the loop operates within its model."
              },
              {
                "id": "2024-uts1-q3-checkpoint-option-3",
                "label": "Feedback makes forward gain completely irrelevant under every condition.",
                "feedback": "Gain insensitivity is an approximation at large loop gain. A finite gain still permits some output change."
              },
              {
                "id": "2024-uts1-q3-checkpoint-option-4",
                "label": "The amplifier clamps output at a fixed voltage, so force magnitude is no longer measured.",
                "feedback": "Clamping or saturation is not the stated mechanism. The system still measures force through feedback balance."
              }
            ]
          }
        },
        {
          "id": "2024-uts1-q3-step-2",
          "title": "a · Combine the forward-path gains",
          "content": "The three blocks are in cascade: each output enters the next block. Their product gives the forward-path gain $A$.\n\nThe numerical factors give $10^{-4}\\times100\\times10^3=10$. Thus $A=10V_s$, with net units V/N. Insert the numerical supply voltage in volts as in the diagram.\n\n$$\nA=(10^{-4})(100V_s)(10^3)=10V_s,\\qquad V_o=A(F-10V_o)\n$$"
        },
        {
          "id": "2024-uts1-q3-step-3",
          "title": "a · Solve the equation with output on both sides",
          "content": "Expand to $V_o=AF-10AV_o$. Add $10AV_o$ to both sides, then factor out $V_o$. Using $V_o=AF$ would incorrectly remove the feedback force.\n\nDivide by $1+10A$. Substituting $A=10V_s$ gives denominator $1+100V_s$. Its plus sign follows from the negative summing input.\n\n$$\n\\begin{aligned}(1+10A)V_o&=AF\\\\V_o&=\\frac{A}{1+10A}F=\\frac{10V_s}{1+100V_s}F\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts1-q3-step-4",
          "title": "a(i) · Calculate output at a 1.0 V supply",
          "content": "At $V_s=1.0$ V, forward gain is $A=10$ V/N and loop gain is $AB=100$. Insert the 50 N force into the closed-loop relation.\n\nThe balancing force is $10V_o\\approx49.505$ N, slightly below 50 N. An error force of about 0.495 N is still needed to produce output through finite forward gain.\n\n$$\nV_{o,1}=\\frac{10(1.0)}{1+100(1.0)}(50)=\\frac{500}{101}=4.950495\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q3-step-5",
          "title": "a(ii) · Calculate output at a 1.5 V supply",
          "content": "At $V_s=1.5$ V, forward gain rises to 15 V/N and loop gain to 150. Input force and feedback gain remain unchanged.\n\nOutput becomes about 4.96689 V. Balancing force rises to about 49.669 N and error force falls to about 0.331 N.\n\n$$\nV_{o,2}=\\frac{10(1.5)}{1+100(1.5)}(50)=\\frac{750}{151}=4.966887\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q3-step-6",
          "title": "b · Compare supply and output changes",
          "content": "Supply rises by 50%, from 1.0 to 1.5 V. Output rises by only about 0.01639 V. Divide the output increase by its initial value to calculate the relative change.\n\nThe output increase is about 0.331%, much smaller than 50%. Feedback suppresses supply sensitivity but does not remove it completely.\n\n$$\n\\frac{V_{o,2}-V_{o,1}}{V_{o,1}}(100\\%)=\\frac{4.966887-4.950495}{4.950495}(100\\%)=0.33113\\%\n$$"
        },
        {
          "id": "2024-uts1-q3-step-7",
          "title": "b · Explain why output approaches 5 V",
          "content": "When loop gain $AB$ greatly exceeds one, $1+AB$ is close to $AB$. Closed-loop gain then approaches $1/B=0.1$ V/N.\n\nFor 50 N, the limiting approximation is 5 V. Both results lie slightly below 5 V and approach it as forward gain rises. The approach to a fixed limit explains improved scale stability, provided amplifier and actuator stay within their operating limits.\n\n$$\n\\frac{V_o}{F}=\\frac{A}{1+AB}\\approx\\frac1B\\quad(AB\\gg1),\\qquad V_o\\approx\\frac{50}{10}=5\\ \\mathrm V\n$$"
        }
      ],
      "finalAnswer": "Output is about 4.95050 V at a 1.0 V supply and 4.96689 V at 1.5 V. A 50% supply rise causes only about a 0.331% output rise; negative feedback reduces supply sensitivity.\n\n$$\n\\boxed{V_o(1.0\\ \\mathrm V)=4.95050\\ \\mathrm V,\\qquad V_o(1.5\\ \\mathrm V)=4.96689\\ \\mathrm V}\n$$",
      "takeaway": "Do not classify every device connected to a sensor as a sensing element."
    },
    "2024-uts2-q2": {
      "title": "Flowmeters, resolvers, and proximity detectors",
      "source": "Midterm 2 2024 · Question 2",
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Measurement systems and feedback"
      ],
      "statement": "2. Conceptual Questions: Flowmeter, Resolver, Inductive and Optical Proximity\n\n(a) [5%] In a differential pressure flowmeter, why is the discharge coefficient ($C_d$) needed to determine the fluid flow?\n\n(b) [5%] There are three types of differential pressure flowmeters: orifice, nozzle, and venturi. Why is the orifice meter the most widely used in industry? Does the orifice have the highest discharge coefficient ($C_d$)?\n\n(c) [5%] Please explain briefly the working principle of the following resolver.\n\n(d) [5%] Explain briefly how an inductive proximity works.\n(e) [5%] Explain briefly how an optical proximity works.",
      "simulation": {
        "title": "Resolver",
        "caption": "Two signed amplitudes determine angle within one revolution.",
        "params": [
          {
            "key": "angle",
            "label": "Rotor angle θ"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uts2-q2-step-1",
          "title": "a · Start with the pressure and flow relation",
          "content": "A **differential-pressure meter** narrows the flow path and infers flow rate from the resulting pressure difference. At the same flow rate, fluid moves faster through the smaller section. We use Bernoulli to relate the speed increase to a static-pressure decrease.\n\nContinuity keeps the flow rate equal at both sections. Lossless Bernoulli then gives ideal flow from pressure difference, density, and section sizes. “Ideal” means that flow losses have not yet been included.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The order of functions and signal units determines the measurement model.",
            "commonPitfall": "Do not classify every device connected to a sensor as a sensing element."
          },
          "simulation": {
            "title": "Flow through an orifice",
            "caption": "Changing Cd changes actual flow at the same pressure difference.",
            "params": [
              {
                "key": "pressure",
                "label": "Pressure difference Δp"
              },
              {
                "key": "diameterRatio",
                "label": "d / D"
              },
              {
                "key": "Cd",
                "label": "Discharge coefficient Cd"
              }
            ]
          }
        },
        {
          "id": "2024-uts2-q2-step-2",
          "title": "a · Why does the ideal result need Cd?",
          "content": "Real flow has losses, jet contraction, and a nonuniform velocity profile. The **discharge coefficient**, $C_d$, is the actual-to-ideal flow ratio. It corrects ideal flow under the same meter definition.\n\nBoth quantities are flow rates, so their units cancel. $C_d$ is dimensionless. Use a value matched to geometry, pressure taps, Reynolds number, and reference area; it is not a safety factor.\n\n$$\nC_d=\\frac{Q_{\\mathrm{actual}}}{Q_{\\mathrm{ideal}}}\\quad\\Longrightarrow\\quad Q_{\\mathrm{actual}}=C_dQ_{\\mathrm{ideal}}\n$$",
          "simulation": {
            "title": "Flow through an orifice",
            "caption": "Changing Cd changes actual flow at the same pressure difference.",
            "params": [
              {
                "key": "pressure",
                "label": "Pressure difference Δp"
              },
              {
                "key": "diameterRatio",
                "label": "d / D"
              },
              {
                "key": "Cd",
                "label": "Discharge coefficient Cd"
              }
            ]
          }
        },
        {
          "id": "2024-uts2-q2-step-3",
          "title": "b · Separate adoption reasons from coefficient size",
          "content": "An orifice uses a simple plate with a hole. The simple plate makes the meter compact, inexpensive, and easy to replace. Installation and maintenance advantages can explain its wide use.\n\nA $C_d$ near one means that actual flow is close to the ideal calculation under the chosen convention. That number alone does not determine price, size, reliability, or maintenance effort."
        },
        {
          "id": "2024-uts2-q2-step-4",
          "title": "b · Compare the orifice, nozzle, and venturi",
          "content": "The notes give an orifice $C_d$ range of 0.58 to 0.65. The nozzle range is 0.93 to 0.98; the venturi range is 0.95 to 0.995. The orifice therefore does not have the highest coefficient.\n\nAn orifice also generally causes more permanent pressure loss. A venturi changes area gradually and recovers pressure better. Selection weighs cost against pressure loss rather than relying on one number."
        },
        {
          "id": "2024-uts2-q2-step-5",
          "title": "c · Follow the resolver excitation",
          "content": "A **resolver** has a rotor and stator windings. It measures shaft angle through changing magnetic coupling. AC excitation produces a time-varying field. The rotor field induces voltages in two stator windings whose axes are 90° apart.\n\nIn the brushless arrangement shown, a rotary transformer transfers excitation to the rotor without sliding contacts. Shaft rotation changes how strongly the rotor field couples to each stator winding.\n\nMagnetic coupling describes how strongly one winding’s field induces voltage in another winding. Rotation changes that coupling, so the voltages carry angle information.",
          "simulation": {
            "title": "Resolver",
            "caption": "Shaft rotation changes the sine and cosine amplitudes.",
            "params": [
              {
                "key": "angle",
                "label": "Rotor angle θ"
              }
            ]
          }
        },
        {
          "id": "2024-uts2-q2-step-6",
          "title": "c · Why are two outputs needed?",
          "content": "After **demodulation**, which extracts amplitude and sign from the AC signal, $V_s$ is a signed amplitude proportional to sine of angle, while $V_c$ follows cosine. The factor $k$ is the coupling ratio and $V_{\\mathrm{ref}}$ is excitation amplitude.\n\nThe two signs identify the angle quadrant. A sine/cosine ratio loses this information if signs are discarded. The atan2 function uses both outputs to determine the angle within a turn. Sine and cosine describe shaft angle; both signals retain the same AC carrier frequency.\n\n$$\nV_s=kV_{\\mathrm{ref}}\\sin\\theta,\\qquad V_c=kV_{\\mathrm{ref}}\\cos\\theta,\\qquad\\theta=\\operatorname{atan2}(V_s,V_c)\n$$",
          "simulation": {
            "title": "Resolver",
            "caption": "Shaft rotation changes the sine and cosine amplitudes.",
            "params": [
              {
                "key": "angle",
                "label": "Rotor angle θ"
              }
            ]
          }
        },
        {
          "id": "2024-uts2-q2-step-7",
          "title": "d · From metal to an oscillator change",
          "content": "An inductive detector coil creates an alternating magnetic field. As a metal target approaches, the field induces eddy currents in it. Those currents take energy and change the oscillator load.\n\nThe circuit detects the change in amplitude or oscillation condition. This lets it detect metal without touching it.",
          "simulation": {
            "title": "Measurement system",
            "caption": "Coil, metal target, then switch output.",
            "params": [
              {
                "key": "gap",
                "label": "Relative target position"
              }
            ]
          }
        },
        {
          "id": "2024-uts2-q2-step-8",
          "title": "d · Distinguish detection from distance measurement",
          "content": "The detector compares the signal change with a threshold. Crossing it changes the output ON/OFF. That state tells us whether the target is within the detection region.\n\nA switch output does not directly give distance in millimetres. Continuous distance measurement needs a sensor and calibration designed to provide a position output.",
          "simulation": {
            "title": "Measurement system",
            "caption": "Coil, metal target, then switch output.",
            "params": [
              {
                "key": "gap",
                "label": "Relative target position"
              }
            ]
          }
        },
        {
          "id": "2024-uts2-q2-step-9",
          "title": "e · Follow the light path",
          "content": "An optical detector has an emitter and a receiver. In through-beam sensing they face each other and an object interrupts the beam. In retroreflective sensing they share one side while a reflector returns the beam.\n\nIn either arrangement, an object changes the received light. The circuit compares that signal with a threshold and changes detection state.",
          "simulation": {
            "title": "Measurement system",
            "caption": "An object blocks the light path and changes detection state.",
            "params": [
              {
                "key": "gap",
                "label": "Relative target position"
              }
            ]
          }
        },
        {
          "id": "2024-uts2-q2-step-10",
          "title": "e · Why emit light in pulses?",
          "content": "The notes use infrared pulses so the receiver can recognise its own emitter’s pattern. Ambient light without that pattern is easier to distinguish from the measuring signal.\n\nThis reduces ambient-light interference, but it does not make every optical condition equivalent. Alignment, obstructions, and reflections still affect the light reaching the receiver.",
          "simulation": {
            "title": "Measurement system",
            "caption": "An object blocks the light path and changes detection state.",
            "params": [
              {
                "key": "gap",
                "label": "Relative target position"
              }
            ]
          }
        }
      ],
      "finalAnswer": "Cd corrects ideal flow. An orifice offers simplicity and low cost, rather than the highest Cd. Resolvers measure angle, inductive detectors sense nearby metal, and optical detectors sense changes in light.",
      "takeaway": "Do not classify every device connected to a sensor as a sensing element."
    },
    "2024-uas-q5": {
      "title": "Mean error and system error spread",
      "source": "Final exam 2024 · Question 5",
      "assumptions": [
        "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
        "Stage errors are taken as independent, uniform, and zero-centred; only the recorder gain misadjustment creates bias. The 5000 Pa input is treated as exact."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Measurement systems and feedback"
      ],
      "statement": "5. [20%] Accuracy of Measurement System.\n\nA pressure measurement system has four stages: pressure sensor, deflection bridge, amplifier, and recorder. The diagram places these stages in that order between the input and output.\nThe table gives linear sensitivities K and error bandwidths ±h:\nPressure sensor: $10^{-4}\\ \\Omega\\,\\mathrm{Pa}^{-1}$, ±0.005 Ω.\nDeflection bridge: $4\\times10^{-2}\\ \\mathrm{mV}\\,\\Omega^{-1}$, $\\pm5\\times10^{-4}\\ \\mathrm{mV}$.\nAmplifier: $10^3\\ \\mathrm{mV}\\,\\mathrm{mV}^{-1}$, ±0.5 mV.\nRecorder: $250\\ \\mathrm{Pa}\\,\\mathrm{mV}^{-1}$, ±100 Pa.\n\n(a) [10%] The recorder has an incorrect sensitivity of 225 Pa mV⁻¹. Calculate the mean error $\\bar E$ for an input pressure of $5\\times10^3$ Pa.\n\n(b) [10%] Calculate the standard deviation $\\sigma_E$ of the error distribution function.\nSupplied relations: $\\bar O_i=K_i\\bar I_i$, $\\sigma_{I_{i+1}}^2=\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+h_i^2/3$.",
      "simulation": {
        "title": "Measurement system",
        "caption": "Each error passes through all downstream gains. Compare actual and nominal recorder settings.",
        "params": [
          {
            "key": "input",
            "label": "Input pressure"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uas-q5-step-1",
          "title": "a · Follow the quantity through the chain",
          "content": "We follow pressure through resistance, voltage, amplified voltage, and finally the pressure reading. Each **sensitivity** is output change per input change. Tracking its units helps us refer each stage’s error to the final output.\n\nFor linear stages with no offset, total sensitivity is the product of the stage sensitivities. Start with nominal settings to see the effect of the recorder adjustment.\n\n$$\nK_{\\mathrm{nom}}=(10^{-4})(0.04)(1000)(250)=1\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The order of functions and signal units determines the measurement model.",
            "commonPitfall": "Do not classify every device connected to a sensor as a sensing element."
          },
          "checkpoint": {
            "prompt": "A gain misadjustment makes an instrument’s mean reading lower than true pressure. Repeated readings also show random spread. What can averaging many independent readings at that same setting accomplish?",
            "options": [
              {
                "id": "2024-uas-q5-checkpoint-option-1",
                "label": "Remove both bias and spread because positive and negative errors always cancel.",
                "feedback": "Random cancellation does not remove a systematic shift shared by all readings."
              },
              {
                "id": "2024-uas-q5-checkpoint-option-2",
                "label": "Automatically correct instrument sensitivity without calibration or correction.",
                "feedback": "Averaging processes data; it does not change circuit gain. Incorrect sensitivity still requires correction."
              },
              {
                "id": "2024-uas-q5-checkpoint-option-3",
                "label": "Make standard deviation equal to the absolute bias.",
                "feedback": "Bias measures a centre shift; standard deviation measures spread. No rule makes them equal."
              },
              {
                "id": "2024-uas-q5-checkpoint-option-4",
                "label": "Reduce the spread of the sample mean, but not remove the gain-induced bias.",
                "feedback": "Correct. Random uncertainty of the mean can decrease while its distribution remains shifted."
              }
            ]
          }
        },
        {
          "id": "2024-uas-q5-step-2",
          "title": "a · Use the recorder’s actual sensitivity",
          "content": "Part (a) changes recorder sensitivity from 250 to 225 Pa/mV. The other three stages stay fixed. Since 225/250 = 0.9, the whole-system scale becomes 0.9 of nominal.\n\nThe product units reduce to Pa/Pa, so total sensitivity is dimensionless. A value of 0.9 means the mean reading is 90% of input pressure.\n\n$$\nK_{\\mathrm{actual}}=(10^{-4}\\ \\Omega/\\mathrm{Pa})(0.04\\ \\mathrm{mV}/\\Omega)(1000)(225\\ \\mathrm{Pa}/\\mathrm{mV})=0.9\n$$"
        },
        {
          "id": "2024-uas-q5-step-3",
          "title": "a · Calculate the mean output stage by stage",
          "content": "A 5000 Pa input produces a resistance change of $10^{-4}(5000)=0.5\\ \\Omega$. The bridge converts this to 0.02 mV, and the amplifier produces 20 mV.\n\nThe recorder reads $225(20)=4500$ Pa. This stage-by-stage calculation matches the total-gain result and checks the units at each stage.\n\n$$\n5000\\ \\mathrm{Pa}\\ \\longrightarrow\\ 0.5\\ \\Omega\\ \\longrightarrow\\ 0.02\\ \\mathrm{mV}\\ \\longrightarrow\\ 20\\ \\mathrm{mV}\\ \\longrightarrow\\ 4500\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2024-uas-q5-step-4",
          "title": "a · State the sign of the mean error",
          "content": "Define error as $E=O-I$, indicated output minus true input. Since the reading is smaller, the mean error is negative.\n\nThe −500 Pa result is a bias: the centre of the reading distribution is 500 Pa below the true value. It is not a standard deviation.\n\n$$\n\\bar E=\\bar O-I=4500-5000=-500\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2024-uas-q5-step-5",
          "title": "b · Interpret the error half-width ±h",
          "content": "The table gives error limits from $-h_i$ to $+h_i$ at each stage output. The supplied $h_i^2/3$ formula assumes a uniform distribution over that interval.\n\nIts variance is $h_i^2/3$, and its standard deviation is $h_i/\\sqrt3$. The original contributions use Ω, mV, and Pa, so they cannot be added directly.\n\nA **uniform distribution** assigns equal probability to equal-width intervals between the limits. The ±h limits are not a standard deviation; keep those quantities distinct before combining errors.\n\n$$\n\\sigma_i^2=\\frac{h_i^2}{3}\n$$"
        },
        {
          "id": "2024-uas-q5-step-6",
          "title": "b · Refer sensor and bridge errors to the final output",
          "content": "The sensor error already exists at the sensor output. It passes only through the bridge, amplifier, and recorder; do not multiply by sensor sensitivity again.\n\nLikewise, bridge error passes only through its two downstream stages. Use the actual recorder sensitivity of 225 Pa/mV to remain consistent with part (a).\n\n$$\n\\begin{aligned}h_{1,o}&=0.005(0.04)(1000)(225)=45\\ \\mathrm{Pa}\\\\h_{2,o}&=0.0005(1000)(225)=112.5\\ \\mathrm{Pa}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uas-q5-step-7",
          "title": "b · Convert the last two errors to Pa",
          "content": "The amplifier’s 0.5 mV error still passes through the recorder, becoming 112.5 Pa. The recorder’s ±100 Pa error already has final-output units and undergoes no further gain.\n\nThe four comparable half-widths are now 45, 112.5, 112.5, and 100 Pa. They describe contributions at the final reading, not the components’ original limits.\n\n$$\nh_{3,o}=0.5(225)=112.5\\ \\mathrm{Pa},\\qquad h_{4,o}=100\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2024-uas-q5-step-8",
          "title": "b · Add variances, then take the square root",
          "content": "For independent stage errors, contribution variances add. Add squared standard deviations, not the half-widths or standard deviations themselves.\n\nThe input is fixed, so error spread equals output spread. After adding variances in Pa², take the square root to return to Pa.\n\n**Variance** measures spread using the mean squared deviation from the mean. **Standard deviation** is the square root of variance, so it uses the original output unit.\n\n$$\n\\sigma_E^2=\\frac{45^2+112.5^2+112.5^2+100^2}{3}=12445.8333\\ \\mathrm{Pa^2},\\qquad\\sigma_E=111.5609\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2024-uas-q5-step-9",
          "title": "Separate bias, spread, and the recorder setting",
          "content": "Readings centre on 4500 Pa with a standard deviation of 111.56 Pa under this model. The −500 Pa bias shifts the centre; standard deviation describes variation around it. Adding them does not produce a new standard deviation.\n\nIf part (b) instead uses the nominal 250 Pa/mV recorder, the result is 120.76 Pa. The main answer continues the actual 225 Pa/mV setting from part (a); state that condition to keep the two cases distinct."
        }
      ],
      "finalAnswer": "The mean reading is 4500 Pa, mean error is −500 Pa, and error standard deviation is about 111.56 Pa with the actual 225 Pa/mV recorder.\n\n$$\n\\boxed{\\bar O=4500\\ \\mathrm{Pa},\\quad\\bar E=-500\\ \\mathrm{Pa},\\quad\\sigma_E\\approx111.56\\ \\mathrm{Pa}}\n$$",
      "takeaway": "Do not classify every device connected to a sensor as a sensing element."
    },
    "2023-uts1-q1": {
      "title": "Roles of measurement-system elements",
      "source": "Midterm 1 2023 · Question 1",
      "assumptions": [
        "Classification uses the primary role in a basic measurement chain. Integrated devices and digital filters can span multiple functions.",
        "Conditioning and processing boundaries vary across frameworks. For filters and frequency converters, explain the circuit's function instead of treating one label as universal across implementations."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Measurement systems and feedback"
      ],
      "statement": "Classify each element by its main role: sensing, signal conditioning, signal processing, or data presentation. (a) Strain gauge; (b) thermocouple; (c) Wheatstone bridge; (d) low-pass filter; (e) operational amplifier; (f) current-to-voltage converter; (g) frequency-to-voltage converter; (h) accelerometer; (i) microcontroller; (j) LCD.",
      "simulation": {
        "title": "Measurement system",
        "caption": "Follow the physical quantity through sensing, conditioning, processing, and display.",
        "params": []
      },
      "steps": [
        {
          "id": "2023-uts1-q1-step-1",
          "title": "Follow each element's function rather than its name",
          "content": "A sensing element first responds to the physical quantity being measured. Signal conditioning prepares its output for the next stage, for example by amplification or conversion to another electrical form.\n\nSignal processing operates on data, such as applying a calibration equation to calculate the measured value. Data presentation makes the result readable to the user, for example as digits on a display.\n\nA complete device can combine several functions. Here, classify each named element by its main role in a basic measurement chain.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The order of functions and signal units determines the measurement model.",
            "commonPitfall": "Do not classify every device connected to a sensor as a sensing element."
          },
          "checkpoint": {
            "prompt": "A force system uses a strain gauge, Wheatstone bridge, microcontroller, and LCD. The bridge turns resistance change into a voltage difference. Its main role in this chain is…",
            "options": [
              {
                "id": "2023-uts1-q1-checkpoint-option-1",
                "label": "Data processor, because the bridge already calculates force in newtons.",
                "feedback": "The bridge supplies voltage. Converting it into force through calibration belongs to later processing."
              },
              {
                "id": "2023-uts1-q1-checkpoint-option-2",
                "label": "Sensing element, because any part with a changing output is a sensor.",
                "feedback": "A changing output does not by itself define a sensor. In this chain, the strain gauge first responds to mechanical strain."
              },
              {
                "id": "2023-uts1-q1-checkpoint-option-3",
                "label": "Signal conditioner, because it converts the sensor output into a more readable electrical form.",
                "feedback": "Correct. The bridge converts resistance change into a voltage difference for the next stage."
              },
              {
                "id": "2023-uts1-q1-checkpoint-option-4",
                "label": "Data presenter, because a voltage difference directly provides a user display.",
                "feedback": "The LCD presents the result. An internal voltage is not yet a user-readable display."
              }
            ]
          }
        },
        {
          "id": "2023-uts1-q1-step-2",
          "title": "a, b, h · Elements that directly respond to physical quantities",
          "content": "A strain gauge responds to strain through resistance change. A thermocouple responds to the temperatures of its two junctions through thermoelectric voltage. Both are sensing elements.\n\nAn accelerometer responds to acceleration and produces a related signal. A complete accelerometer may contain conditioning electronics, but its main role here remains acceleration sensing."
        },
        {
          "id": "2023-uts1-q1-step-3",
          "title": "c, e · Convert and amplify a sensor signal",
          "content": "A Wheatstone bridge can turn a small resistance change into a voltage difference. Strain or temperature first changes the sensor; the bridge reads that electrical change.\n\nAn operational amplifier, or op-amp, can amplify a small voltage or buffer a signal against loading by the next stage. In these uses, the bridge and op-amp are signal conditioners."
        },
        {
          "id": "2023-uts1-q1-step-4",
          "title": "d, f, g · Filter and convert electrical signal form",
          "content": "A low-pass filter passes low-frequency components and attenuates higher-frequency components. In a sensor readout circuit, this prepares the signal for later processing.\n\nCurrent-to-voltage and frequency-to-voltage converters make an existing signal compatible with the next stage's input. Both change its electrical representation, so they are signal conditioners.\n\nFilter classification depends on context. The analog filter in this chain is treated as conditioning; a filtering algorithm acting on digital samples may instead be discussed as signal processing.\n\n> These categories follow circuit function. An analog filter or frequency-to-voltage converter may be placed differently in another course framework. Conversion of electrical signal form is conditioning here. If the course treats frequency extraction or mapping pulses to a measured value as processing, item g can be called a processing element. State the function underlying the label."
        },
        {
          "id": "2023-uts1-q1-step-5",
          "title": "i · Process data with a microcontroller",
          "content": "A microcontroller executes a program on incoming readings. It can convert ADC codes to voltage, apply calibration, remove an offset, or calculate an average.\n\nThose operations interpret or transform measurement data, so the microcontroller is a signal-processing element. Its ability to control an LCD does not change the main role intended here."
        },
        {
          "id": "2023-uts1-q1-step-6",
          "title": "j · Present the result with an LCD",
          "content": "An LCD displays values, units, or other measurement information. It lets the user read the result, so it is a data-presentation element.\n\nThe LCD need not know how the sensor produced its signal. It receives a result prepared by other stages for display."
        },
        {
          "id": "2023-uts1-q1-step-7",
          "title": "Match every element to its group",
          "content": "The complete classification below follows each element's main function in a basic measurement chain. For elements with multiple possible functions, explaining the role is more useful than memorising a label without context.\n\n| Item | Element | Kelompok / Group |\n| --- | --- | --- |\n| a | Strain gauge | Sensor / Sensing |\n| b | Thermocouple | Sensor / Sensing |\n| c | Wheatstone bridge | Pengondisi / Conditioning |\n| d | Low-pass filter | Pengondisi / Conditioning |\n| e | Operational amplifier | Pengondisi / Conditioning |\n| f | Current-to-voltage converter | Pengondisi / Conditioning |\n| g | Frequency-to-voltage converter | Pengondisi / Conditioning |\n| h | Accelerometer | Sensor / Sensing |\n| i | Microcontroller | Pengolah / Processing |\n| j | LCD | Penyaji / Presentation |"
        }
      ],
      "finalAnswer": "Sensing: a, b, h. Signal conditioning: c, d, e, f, g. Signal processing: i. Data presentation: j. The low-pass filter is classified as analog conditioning in this chain. For d and g, explain circuit function because boundaries between conditioning and processing can differ across frameworks.",
      "takeaway": "Do not classify every device connected to a sensor as a sensing element."
    },
    "ipe-systems-practice": {
      "title": "Practice: Measurement systems and feedback",
      "intro": "This practice helps you choose a model and explain your reasoning. Start with multiple-choice questions, review a flawed example, then write your own answer. Use the rubric to check your logic, assumptions, and conclusion limits.",
      "questions": [
        {
          "id": "concept-2023-01",
          "prompt": "A force system uses a strain gauge, Wheatstone bridge, microcontroller, and LCD. The bridge turns resistance change into a voltage difference. Its main role in this chain is…",
          "options": [
            {
              "id": "concept-2023-01-option-1",
              "label": "Data processor, because the bridge already calculates force in newtons.",
              "feedback": "The bridge supplies voltage. Converting it into force through calibration belongs to later processing."
            },
            {
              "id": "concept-2023-01-option-2",
              "label": "Sensing element, because any part with a changing output is a sensor.",
              "feedback": "A changing output does not by itself define a sensor. In this chain, the strain gauge first responds to mechanical strain."
            },
            {
              "id": "concept-2023-01-option-3",
              "label": "Signal conditioner, because it converts the sensor output into a more readable electrical form.",
              "feedback": "Correct. The bridge converts resistance change into a voltage difference for the next stage."
            },
            {
              "id": "concept-2023-01-option-4",
              "label": "Data presenter, because a voltage difference directly provides a user display.",
              "feedback": "The LCD presents the result. An internal voltage is not yet a user-readable display."
            }
          ],
          "explanation": "The strain gauge directly responds to strain by changing resistance. The bridge reads that change as a voltage difference, so its role is signal conditioning. Changing signal form is distinct from calculating calibrated force or displaying a result."
        },
        {
          "id": "concept-2024-04",
          "prompt": "In a negative-feedback force transducer, a supply change raises forward-path gain. Input force and feedback gain stay fixed. With an already large loop gain, why does output change much less than the forward gain?",
          "options": [
            {
              "id": "concept-2024-04-option-1",
              "label": "Total gain always equals forward gain multiplied by feedback gain.",
              "feedback": "That product is loop gain. Closed-loop input and output gain also includes the denominator arising from feedback subtraction."
            },
            {
              "id": "concept-2024-04-option-2",
              "label": "An output rise increases balancing force, reducing the error force applied to the forward path.",
              "feedback": "Correct. Balancing-force response suppresses sensitivity to forward-path changes while the loop operates within its model."
            },
            {
              "id": "concept-2024-04-option-3",
              "label": "Feedback makes forward gain completely irrelevant under every condition.",
              "feedback": "Gain insensitivity is an approximation at large loop gain. A finite gain still permits some output change."
            },
            {
              "id": "concept-2024-04-option-4",
              "label": "The amplifier clamps output at a fixed voltage, so force magnitude is no longer measured.",
              "feedback": "Clamping or saturation is not the stated mechanism. The system still measures force through feedback balance."
            }
          ],
          "explanation": "Negative feedback subtracts balancing force from input force. As output rises, balancing force rises and restrains further change. At high loop gain, closed-loop gain approaches the inverse feedback gain, but forward-gain dependence is not exactly zero."
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-systems-guided",
          "title": "Review the role of the bridge",
          "prompt": "Find the first step that needs correction in this reasoning.",
          "workSample": "The strain gauge receives force and changes resistance. The bridge reads that resistance change. Therefore, the bridge is the main force sensor.",
          "question": {
            "prompt": "Which part should you change?",
            "options": [
              {
                "id": "ipe-systems-guided-question-option-1",
                "label": "The bridge classification: the bridge conditions the resistance signal.",
                "feedback": "Correct. The sensor responds to the physical input; the bridge changes its electrical signal form."
              },
              {
                "id": "ipe-systems-guided-question-option-2",
                "label": "The statement that a strain gauge changes resistance.",
                "feedback": "Resistance change is the expected sensor response. The error lies in the bridge function label."
              },
              {
                "id": "ipe-systems-guided-question-option-3",
                "label": "The processor role: it must be called a sensor because it produces a force value.",
                "feedback": "The processor interprets sensor data. It does not directly receive force in this chain."
              }
            ],
            "explanation": "Keep the first two sentences. Change the final classification to signal conditioning. Name the input and output quantities to support that classification."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-systems-essay",
          "title": "Explain your measurement-system model",
          "prompt": "A force system uses a resistive sensor, bridge, amplifier, processor, and display. Explain each stage. Then explain how negative feedback can reduce the effect of a forward-gain change. You do not need numerical calculations.",
          "sections": [
            "Model and assumptions",
            "Reasoning",
            "Conclusion and limits"
          ],
          "hints": [
            "Start with force and follow the signal form.",
            "Name the input and output quantity at every stage.",
            "Separate sensing, conditioning, processing, and display. For feedback, compare the feedback signal with the input."
          ],
          "rubric": [
            {
              "id": "ipe-systems-rubric-model",
              "label": "Model and assumptions",
              "fullCredit": "Identifies resistance change as the sensor response and distinguishes the four main functions.",
              "commonPartialError": "Do not classify every device connected to a sensor as a sensing element."
            },
            {
              "id": "ipe-systems-rubric-reasoning",
              "label": "Reasoning",
              "fullCredit": "Traces signal forms and units and explains error reduction through negative feedback."
            },
            {
              "id": "ipe-systems-rubric-conclusion",
              "label": "Conclusion and limits",
              "fullCredit": "States that feedback benefits depend on the model and stability rather than holding without limits."
            }
          ],
          "verifiedOutline": "The sensor responds to force through resistance change. The bridge and amplifier prepare a voltage for the processor. The processor applies calibration, and the display presents force. Check units at every relation. Negative feedback reduces the difference between the input and feedback signal. Adequate loop gain can reduce sensitivity to forward-gain changes. This conclusion still requires a suitable model and stable operation."
        }
      ]
    }
  }
};

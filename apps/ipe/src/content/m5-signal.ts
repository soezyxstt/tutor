import type { CourseModule, CourseTranslation } from '@tutor/core';

export const module: CourseModule = {
  "id": "ipe-signal",
  "code": "M5",
  "title": "Rangkaian pengondisi sinyal",
  "items": [
    {
      "id": "ipe-signal-material",
      "kind": "material",
      "slug": "ipe-signal-material",
      "title": "Baca simpul, penguatan, dan frekuensi rangkaian",
      "estimatedMinutes": 12,
      "examHook": {
        "prompt": "Gambar jembatan diputar, lalu rumus hafalan memberi tanda tegangan berbeda. Bagaimana Anda menentukan keluaran tanpa bergantung pada posisi gambar?",
        "targetOutcome": "Anda dapat menentukan titik ukur, polaritas, dan pengaruh beban."
      },
      "body": "Tandai simpul catu dan terminal keluaran terlebih dahulu. Pada jembatan, sambungan menentukan beda tegangan. Pada penguat, letak masukan serta resistor umpan balik menentukan tanda dan besar penguatan.\n\nBagian 1 memberi contoh jembatan dan penguat. Bagian 2 memberi model RC orde satu. Anda dapat memakai kedua sumber untuk memahami contoh filter aktif sambil menjaga batas asumsi rangkaian.\n\n[Buka pembahasan bertahap: Filter lolos rendah pasif dan aktif](?item=2025-uts1-q5).",
      "microUnits": [
        {
          "id": "ipe-signal-principle",
          "title": "Baca simpul dan polaritas jembatan",
          "intuition": "Voltmeter membaca selisih potensial dua simpul. **Polaritas** menyatakan urutan pengurangan itu. Anda dapat mencari kedua potensial terhadap acuan yang sama, lalu mengurangkannya. Bagian 1 halaman 7 memperlihatkan jembatan yang membaca perubahan tahanan strain gauge.",
          "formal": "Untuk pembagi tegangan tanpa beban:\n\n$$V_B=V_s\\frac{R_2}{R_1+R_2}.$$\n\nHitung cabang lain dari sambungannya sendiri. Keluaran mengikuti $V_{\\mathrm{out}}=V_B-V_D$. Menukar terminal ukur membalik tanda hasil.",
          "validityBounds": "Rumus sederhana ini menganggap voltmeter tidak menarik arus berarti. Cocokkan simpul sumber, terminal ukur, dan resistor sebelum memakai rumus dari gambar lain.",
          "decisionCheck": {
            "id": "ipe-signal-decision-question",
            "prompt": "Anda memutar gambar jembatan tanpa mengubah sambungan. Apa yang perlu menentukan persamaan keluarannya?",
            "options": [
              {
                "id": "ipe-signal-decision-question-option-1",
                "label": "Simpul catu, terminal keluaran, dan hubungan resistor.",
                "feedback": "Tepat. Hubungan listrik tetap sama meskipun gambar berubah arah."
              },
              {
                "id": "ipe-signal-decision-question-option-2",
                "label": "Resistor yang terlihat paling atas setelah gambar diputar.",
                "feedback": "Posisi pada halaman tidak mengubah sambungan resistor.",
                "misconceptionTag": "signal-decision-choice-2"
              },
              {
                "id": "ipe-signal-decision-question-option-3",
                "label": "Arah halaman, karena arah itu menetapkan polaritas listrik.",
                "feedback": "Polaritas mengikuti terminal ukur, bukan arah halaman.",
                "misconceptionTag": "signal-decision-choice-3"
              }
            ],
            "correctOptionId": "ipe-signal-decision-question-option-1",
            "explanation": "Tandai simpul terlebih dahulu. Cari potensial terminal terhadap acuan yang sama, lalu kurangkan sesuai polaritas."
          }
        },
        {
          "id": "ipe-signal-amplifiers",
          "title": "Pilih penguat dari sambungan masukannya",
          "intuition": "Penguat pembalik memberi tanda keluaran yang berlawanan terhadap masukan. Penguat tak membalik mempertahankan tanda. Keduanya memakai umpan balik, tetapi posisi masukan dan resistor menentukan penguatannya.",
          "formal": "Bagian 1 halaman 8 menunjukkan kedua rangkaian. Dengan $R_f$ sebagai resistor umpan balik:\n\n$$A_{\\mathrm{inv}}=-\\frac{R_f}{R_i},\\qquad A_{\\mathrm{noninv}}=1+\\frac{R_f}{R_g}.$$\n\n$R_i$ menghubungkan sumber ke masukan pembalik. $R_g$ menghubungkan simpul umpan balik ke acuan pada rangkaian tak membalik.",
          "validityBounds": "Rumus ini memakai model op-amp ideal dalam umpan balik negatif. Periksa catu, frekuensi kerja, dan beban agar penguat tetap linear.",
          "decisionCheck": {
            "prompt": "Dua penguat memakai resistor yang sama besar. Yang satu membalik, yang lain tak membalik. Apakah penguatannya sama?",
            "options": [
              {
                "id": "ipe-signal-amplifiers-decision-option-1",
                "label": "Tidak. Model ideal memberi −1 untuk pembalik dan 2 untuk tak membalik.",
                "feedback": "Tepat. Sambungan menentukan apakah rumus memakai tanda minus atau tambahan satu."
              },
              {
                "id": "ipe-signal-amplifiers-decision-option-2",
                "label": "Ya. Resistor yang sama selalu memberi penguatan 1.",
                "feedback": "Kesamaan resistor belum menentukan rumus. Anda perlu membaca sambungan masukan.",
                "misconceptionTag": "ipe-signal-amplifiers-decision-choice-2"
              },
              {
                "id": "ipe-signal-amplifiers-decision-option-3",
                "label": "Ya. Jenis sambungan hanya mengubah warna grafik.",
                "feedback": "Sambungan menentukan hubungan listrik yang nyata, termasuk tanda dan besar penguatan.",
                "misconceptionTag": "ipe-signal-amplifiers-decision-choice-3"
              }
            ],
            "explanation": "Cocokkan diagram dengan $-R_f/R_i$ atau $1+R_f/R_g$ sebelum memasukkan rasio resistor satu.",
            "id": "ipe-signal-amplifiers-decision",
            "correctOptionId": "ipe-signal-amplifiers-decision-option-1"
          }
        },
        {
          "id": "ipe-signal-rc-model",
          "title": "Hubungkan filter RC dengan respons orde satu",
          "intuition": "Pada contoh Bagian 2 halaman 6, resistor membatasi arus pengisian kapasitor. Tegangan kapasitor tidak langsung mengikuti perubahan cepat. Rangkaian ini meneruskan perubahan lambat lebih baik daripada perubahan cepat.",
          "formal": "Dengan keluaran pada kapasitor:\n\n$$RC\\frac{dV_{\\mathrm{out}}}{dt}+V_{\\mathrm{out}}=V_{\\mathrm{in}},\\qquad \\tau=RC,$$\n\n$$H(s)=\\frac{1}{1+sRC},\\qquad f_c=\\frac{1}{2\\pi RC}.$$\n\nPada $f=f_c$, besar penguatan menjadi $1/\\sqrt2$ dari nilai frekuensi rendah dan fase menjadi $-45^\\circ$.",
          "validityBounds": "Model ini memakai sumber ideal dan keluaran tanpa beban berarti. Bagian 2 halaman 7 memberi kurva amplitudo serta fase orde satu. Beban nyata dapat mengubah nilai penguatan dan frekuensi batas.",
          "decisionCheck": {
            "prompt": "Anda menaikkan C dengan R tetap pada RC tanpa beban. Apa perubahan yang sesuai dengan model?",
            "options": [
              {
                "id": "ipe-signal-rc-model-decision-option-1",
                "label": "Konstanta waktu naik dan frekuensi batas turun.",
                "feedback": "Tepat. RC membesar, sedangkan 1/(2πRC) mengecil."
              },
              {
                "id": "ipe-signal-rc-model-decision-option-2",
                "label": "Konstanta waktu turun dan frekuensi batas naik.",
                "feedback": "Hubungannya terbalik: kapasitor yang lebih besar membuat respons lebih lambat.",
                "misconceptionTag": "ipe-signal-rc-model-decision-choice-2"
              },
              {
                "id": "ipe-signal-rc-model-decision-option-3",
                "label": "Penguatan frekuensi rendah otomatis menjadi lebih besar dari satu.",
                "feedback": "Rangkaian RC ideal tetap memiliki penguatan frekuensi rendah satu. Kapasitor mengubah respons waktunya.",
                "misconceptionTag": "ipe-signal-rc-model-decision-choice-3"
              }
            ],
            "explanation": "Periksa kedua rumus sekaligus: $\\tau=RC$ dan $f_c=1/(2\\pi RC)$. Keduanya harus memberi perubahan yang saling sesuai.",
            "id": "ipe-signal-rc-model-decision",
            "correctOptionId": "ipe-signal-rc-model-decision-option-1"
          }
        },
        {
          "id": "ipe-signal-active-example",
          "title": "Pisahkan dasar sumber dan contoh praktikum",
          "intuition": "Anda dapat mengikuti RC dengan penguat tak membalik. Dalam model ideal, penguat menaikkan sinyal dan mengurangi beban tahap berikutnya pada RC. Bagian 1 dan 2 memberi dasar kedua blok, tetapi tidak menetapkan skema praktikum dalam naskah ujian.",
          "formal": "Untuk susunan contoh tersebut:\n\n$$H_{\\mathrm{aktif}}(s)=\\frac{1+R_f/R_g}{1+sRC}.$$\n\nGunakan contoh $R=10\\,\\mathrm{k\\Omega}$, $C=100\\,\\mathrm{nF}$, dan $R_f=R_g$. Anda memperoleh $f_c\\approx159{,}15\\,\\mathrm{Hz}$ serta penguatan frekuensi rendah 2.",
          "validityBounds": "Nilai ini ialah contoh yang sama dengan simulasi, bukan data praktikum tambahan. Untuk menjawab skema praktikum secara tepat, cocokkan dengan rangkaian yang benar-benar Anda pakai.",
          "decisionCheck": {
            "prompt": "Penguat ideal berpenguatan 2 mengikuti RC tanpa mengubah bebannya. Apa yang berubah pada gabungan contoh ini?",
            "options": [
              {
                "id": "ipe-signal-active-example-decision-option-1",
                "label": "Penguatan frekuensi rendah menjadi 2; frekuensi batas RC tetap.",
                "feedback": "Tepat. Penguat mengalikan pembilang, sedangkan faktor RC pada penyebut tetap."
              },
              {
                "id": "ipe-signal-active-example-decision-option-2",
                "label": "Frekuensi batas selalu menjadi dua kali lipat.",
                "feedback": "Faktor penguatan tidak mengubah RC pada model ideal ini.",
                "misconceptionTag": "ipe-signal-active-example-decision-choice-2"
              },
              {
                "id": "ipe-signal-active-example-decision-option-3",
                "label": "Kapasitor tidak lagi memengaruhi respons frekuensi.",
                "feedback": "Faktor RC tetap berada pada penyebut dan tetap menentukan penurunan amplitudo.",
                "misconceptionTag": "ipe-signal-active-example-decision-choice-3"
              }
            ],
            "explanation": "Bandingkan $1/(1+sRC)$ dengan $2/(1+sRC)$. Anda tetap perlu memeriksa beban dan batas op-amp pada rangkaian nyata.",
            "id": "ipe-signal-active-example-decision",
            "correctOptionId": "ipe-signal-active-example-decision-option-1"
          }
        }
      ],
      "checkpoints": [
        "Anda dapat menentukan keluaran jembatan dari simpul dan polaritasnya.",
        "Anda dapat memilih rumus penguat dari sambungan masukannya.",
        "Anda dapat menghubungkan RC, konstanta waktu, dan frekuensi batas.",
        "Anda dapat membedakan dasar teori dari skema praktikum yang belum tersedia."
      ],
      "derivations": [
        {
          "id": "ipe-signal-sources",
          "title": "Sumber dan cara membaca arsip",
          "content": "[Bagian 1 (2022)](https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view): halaman 3 menempatkan jembatan dan penguat sebagai pengondisi. Halaman 7 menunjukkan jembatan strain gauge serta urutan timbangan. Halaman 8 menunjukkan penguat pembalik dan tak membalik.\n\n[Bagian 2 (2022)](https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view): halaman 6 memberi rangkaian RC beserta $\\tau=RC$; halaman 7 memberi respons amplitudo dan fase orde satu. Kita menggabungkan model RC dan penguat untuk contoh filter aktif. Sumber tidak memuat skema praktikum yang secara tegas dirujuk pada soal 2025.\n\nNomor halaman menghitung halaman PDF dari 1. Naskah soal tetap berasal dari [arsip ujian](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END); label dan nilai ilustrasi tidak mengganti naskah itu."
        }
      ]
    },
    {
      "id": "2025-uts1-q5",
      "kind": "problem",
      "slug": "2025-uts1-q5",
      "title": "Filter lolos rendah pasif dan aktif",
      "source": "UTS 1 2025 · Soal 5",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
        "file": "2025-uts1.pdf",
        "pages": [
          2
        ],
        "original": "5. [10%] Practicum Questions: Active and Passive Low Pass Filter\na. [5%] Based on the practicum, what are the differences between passive and active low pass filters?\nb. [5%] Draw the schematic diagram of an active low pass filter you did in the practicum?",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              3,
              8
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view",
            "title": "Pengukuran Teknik, Bagian 2 (2022)",
            "pages": [
              6,
              7
            ]
          }
        ]
      },
      "assumptions": [
        "Rangkaian RC diikuti penguat tak membalik ialah contoh, bukan salinan rangkaian praktikum yang tidak disertakan.",
        "Nilai R=10 kΩ, C=100 nF, Rf=Rg=10 kΩ hanya ilustrasi. Model menganggap sumber ideal, masukan op-amp berimpedansi tinggi, dan op-amp bekerja dalam batas catu serta lebar pitanya."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2025,
        "number": 5
      },
      "difficulty": "menengah",
      "estimatedMinutes": 16,
      "tags": [
        "Rangkaian pengondisi sinyal"
      ],
      "statement": "(a) Berdasarkan praktikum, jelaskan perbedaan filter lolos rendah pasif dan aktif. (b) Gambar skema filter lolos rendah aktif yang digunakan dalam praktikum.\nNaskah tidak menyertakan skema atau nilai komponen praktikum. Pembahasan memberi contoh sah berupa RC diikuti penguat tak membalik; sesuaikan dengan rangkaian praktikum yang benar-benar dipakai.",
      "simulation": {
        "id": "2025-uts1-q5-visual",
        "type": "ipe-lowpass",
        "title": "Filter lolos rendah",
        "caption": "Contoh ilustratif: R = 10 kΩ, C = 100 nF, dan gain penguat 2. Amati RC yang memilih frekuensi serta penguat yang mengurangi pengaruh beban. Skema praktikum asli tidak tersedia dalam naskah.",
        "params": [
          {
            "key": "frequency",
            "label": "Frekuensi masukan",
            "min": 0,
            "max": 795.7747154594767,
            "step": 5,
            "defaultValue": 100,
            "unit": "Hz"
          },
          {
            "key": "gain",
            "label": "Penguatan op-amp",
            "min": 1,
            "max": 5,
            "step": 0.1,
            "defaultValue": 2
          }
        ],
        "data": {
          "R": 10000,
          "C": 1e-07,
          "gain": 2,
          "frequency": 100,
          "visualKind": "lowpass"
        }
      },
      "steps": [
        {
          "id": "2025-uts1-q5-step-1",
          "title": "1. Mulai dari tujuan filter lolos rendah",
          "content": "Anda mungkin ingin membaca suhu yang berubah lambat sambil menekan gangguan listrik yang cepat. **Filter lolos rendah** (rangkaian yang melewatkan frekuensi rendah dan melemahkan frekuensi tinggi) membantu tugas tersebut. Kita membandingkan rangkaian pasif dan aktif untuk tujuan yang sama. Filter nyata menurunkan amplitudo secara bertahap, bukan memutusnya seketika pada satu frekuensi.\n\nFrekuensi batas $f_c$ memberi patokan penurunan tersebut. Untuk RC orde satu, amplitudo pada $f_c$ adalah $1/\\sqrt2$ dari nilai frekuensi rendah. Penurunan tersebut tepatnya −3.0103 dB, lazim disebut −3 dB.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Hubungan simpul, arah pengukuran, dan beban menentukan persamaan rangkaian.",
            "commonPitfall": "Jangan menyalin rumus jembatan sebelum mencocokkan posisi catu dan terminal keluaran."
          },
          "checkpoint": {
            "prompt": "Sebuah filter RC pasif berubah responsnya saat dihubungkan ke beban berimpedansi rendah. Perancang ingin mengisolasi beban dan memberi penguatan pada sinyal frekuensi rendah. Pilihan mana paling sesuai?",
            "options": [
              {
                "id": "2025-uts1-q5-checkpoint-option-1",
                "label": "Hilangkan catu op-amp agar filter aktif bekerja tanpa sumber daya tambahan.",
                "feedback": "Tanpa catu yang sesuai, op-amp tidak menjalankan fungsi penguat atau penyangga sebagaimana dirancang.",
                "misconceptionTag": "concept-2025-05-choice-1"
              },
              {
                "id": "2025-uts1-q5-checkpoint-option-2",
                "label": "Tambahkan penguat operasional dengan susunan penyangga/penguat yang sesuai, sambil memeriksa catu, bandwidth, dan batas keluarannya.",
                "feedback": "Tepat. Susunan aktif dapat menangani isolasi beban dan penguatan, dengan batas alat yang tetap perlu diperiksa."
              },
              {
                "id": "2025-uts1-q5-checkpoint-option-3",
                "label": "Anggap filter aktif akan memotong semua frekuensi di atas cutoff menjadi tepat nol.",
                "feedback": "Filter nyata memiliki penurunan bertahap; cutoff bukan batas pemutusan mendadak menjadi nol.",
                "misconceptionTag": "concept-2025-05-choice-3"
              },
              {
                "id": "2025-uts1-q5-checkpoint-option-4",
                "label": "Ubah label filter menjadi aktif tanpa mengubah rangkaian RC atau beban.",
                "feedback": "Nama tidak mengubah impedansi atau hubungan sinyal. Perubahan fungsi memerlukan perubahan rangkaian.",
                "misconceptionTag": "concept-2025-05-choice-4"
              }
            ],
            "correctOptionId": "2025-uts1-q5-checkpoint-option-2"
          }
        },
        {
          "id": "2025-uts1-q5-step-2",
          "title": "2. Jelaskan cara kerja contoh pasif RC",
          "content": "Hubungkan resistor $R$ seri dari masukan menuju simpul keluaran, lalu kapasitor $C$ dari simpul itu ke ground. Ambil keluaran pada kapasitor. Pada frekuensi rendah, impedansi kapasitor besar sehingga tegangan simpul mendekati masukan; saat frekuensi naik, impedansi kapasitor turun dan tegangan simpul mengecil.\n\nRangkaian RC ini tidak memerlukan catu untuk komponen aktif dan tidak memberi penguatan tegangan di atas 1 pada kondisi ideal tanpa beban. Namun, tahanan sumber dan beban dapat mengubah responsnya."
        },
        {
          "id": "2025-uts1-q5-step-3",
          "title": "3. Jelaskan tambahan fungsi komponen aktif",
          "content": "Filter aktif memakai komponen berdaya, misalnya op-amp. Masukan op-amp yang berimpedansi tinggi dapat mengurangi beban pada bagian RC. Keluarannya dapat menggerakkan beban berikutnya, dan umpan balik dapat memberi penguatan tegangan jika dibutuhkan.\n\nPenguat tetap memiliki batas: catu, rentang tegangan keluaran, lebar pita, dan laju perubahan tegangan maksimum. Oleh karena itu, rancangan aktif tidak otomatis menjaga semua amplitudo atau semua frekuensi."
        },
        {
          "id": "2025-uts1-q5-step-4",
          "title": "4. Bandingkan kedua jenis dengan kondisi yang jelas",
          "content": "Perbandingan berikut berlaku untuk contoh RC sederhana dan RC yang diikuti op-amp. Filter pasif lain dapat memakai induktor, dan filter aktif lain dapat memakai susunan orde lebih tinggi.\n\n| Aspek | RC pasif | RC + op-amp aktif |\n| --- | --- | --- |\n| Komponen / Components | R, C | R, C, op-amp |\n| Catu aktif / Active supply | Tidak / No | Ya / Yes |\n| Gain frekuensi rendah / Low-frequency gain | ≤ 1 untuk RC ini / for this RC | Dapat ≥ 1 / Can be ≥ 1 |\n| Pengaruh beban / Loading | Sumber dan beban mengubah respons / Source and load affect response | Op-amp mengurangi beban pada RC / Op-amp reduces RC loading |\n| Batas utama / Main limits | Nilai R, C serta sumber/beban / R, C and source/load | R, C serta catu dan batas op-amp / R, C and op-amp limits |"
        },
        {
          "id": "2025-uts1-q5-step-5",
          "title": "5. Gambar bagian RC dan masukan op-amp",
          "content": "Untuk contoh aktif, pertahankan resistor seri dan kapasitor ke ground seperti contoh pasif. Hubungkan simpul kapasitor ke masukan tak membalik $(+)$ op-amp. Ambil keluaran akhir pada pin keluaran op-amp, bukan langsung pada simpul RC.\n\nMasukan op-amp ideal tidak mengambil arus. Oleh karena itu, bagian RC menentukan respons frekuensi dan op-amp menjaga agar beban keluaran tidak langsung membebani kapasitor. Pada komponen nyata, asumsi ini berlaku saat impedansi masukan cukup tinggi."
        },
        {
          "id": "2025-uts1-q5-step-6",
          "title": "6. Lengkapi umpan balik dan catu",
          "content": "Hubungkan resistor $R_f$ dari keluaran ke masukan membalik $(- )$, serta $R_g$ dari masukan membalik ke ground. Sambungan ini memberi umpan balik negatif dan penguatan frekuensi rendah $A_v=1+R_f/R_g$. Gambarkan juga pin catu op-amp dan acuan ground bersama.\n\nUntuk contoh gain 2, pilih $R_f=R_g$, misalnya masing-masing 10 kΩ. Jika hanya butuh penyangga dengan gain 1, keluaran dapat langsung terhubung ke masukan membalik. Keduanya contoh filter aktif yang sah.\n\n$$\nA_v=1+\\frac{R_f}{R_g}=1+\\frac{10\\ \\mathrm{k\\Omega}}{10\\ \\mathrm{k\\Omega}}=2\n$$"
        },
        {
          "id": "2025-uts1-q5-step-7",
          "title": "7. Hubungkan skema dengan respons yang diharapkan",
          "content": "RC memberi faktor $1/(1+sRC)$, sedangkan penguat tak membalik memberi faktor $A_v$ selama op-amp bekerja dalam batasnya. Kalikan keduanya untuk mendapat fungsi alih. Pada frekuensi rendah gain mendekati $A_v$; pada frekuensi tinggi RC menurunkannya.\n\nNilai pada visual hanya contoh: $R=10\\ \\mathrm{k\\Omega}$ dan $C=100\\ \\mathrm{nF}$ memberi $RC=0.001\\ \\mathrm s$ serta $f_c\\approx159.15\\ \\mathrm{Hz}$. Angka ini tidak berasal dari naskah praktikum.\n\n$$\nH(s)=\\frac{A_v}{1+sRC},\\qquad f_c=\\frac1{2\\pi RC}=\\frac1{2\\pi(10^4)(10^{-7})}=159.15\\ \\mathrm{Hz}\n$$"
        },
        {
          "id": "2025-uts1-q5-step-8",
          "title": "8. Cek skema dan kaitkan dengan praktikum yang sebenarnya",
          "content": "Pastikan kapasitor menghubungkan simpul RC ke ground, keluaran op-amp memberi umpan balik ke masukan membalik, dan op-amp mendapat catu. Pada frekuensi rendah, contoh ini harus mendekati gain 2; saat frekuensi naik jauh di atas batas, gain harus turun.\n\nNaskah tidak menunjukkan rangkaian praktikum yang sebenarnya. Jika praktikum memakai susunan lain, gunakan catatan praktikum untuk menggambar sambungan serta nilai komponennya. Contoh di sini menjelaskan prinsip dan tidak mengklaim menyalin rangkaian tersebut."
        }
      ],
      "finalAnswer": "Filter RC pasif memakai R dan C, tidak memerlukan catu aktif, dan responsnya dapat berubah akibat sumber serta beban. Filter aktif menambah komponen berdaya seperti op-amp untuk mengurangi beban dan memberi penguatan, dengan batas catu serta respons op-amp. Contoh sah: RC masuk ke pin+ op-amp, Rf dari keluaran ke pin −, Rg dari pin − ke ground, dengan catu yang jelas. Skema praktikum asli tidak tersedia dalam naskah.\n\n$$\n\\boxed{H(s)=\\frac{1+R_f/R_g}{1+sRC},\\qquad f_c=\\frac1{2\\pi RC}}\n$$",
      "takeaway": "Jangan menyalin rumus jembatan sebelum mencocokkan posisi catu dan terminal keluaran.",
      "sourceNotes": [
        "Bagian 1 halaman 8 menunjukkan penguat pembalik dan tak membalik. Bagian 2 halaman 6 memberi rangkaian RC dengan keluaran pada kapasitor dan konstanta waktu RC. Halaman 7 memberi respons amplitudo serta fase orde satu.",
        "Gabungan RC dan penguat tak membalik pada pembahasan merupakan contoh yang diturunkan dari kedua model. Sumber baru ini tetap tidak mengidentifikasi skema atau nilai komponen praktikum yang diminta naskah 2025."
      ]
    },
    {
      "id": "2023-uts1-q5",
      "kind": "problem",
      "slug": "2023-uts1-q5",
      "title": "Bridge sensor gaya: tegangan, arus, dan daya",
      "source": "UTS 1 2023 · Soal 5",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
        "file": "2023-uts1.pdf",
        "pages": [
          2,
          3
        ],
        "original": "5. [15%] Signal Conditioning\nA force sensor produces a change in resistance as its output. The sensor forms one leg (R1) of a basic Wheatstone bridge. The sensor resistance with no force load is 500 Ω, and its static sensitivity is 0.5 Ω/N. Each arm of the bridge is initially 500 Ω.\na. [5%] Determine the bridge output for applied loads of 350 N. The bridge is operated as a deflection bridge, with an input voltage of 10 V.\nb. [5%] Determine the current flow through the sensor.\nc. [5%] Determine the power dissipated by the sensor (assume temperature sensitivity is negligible).\nAppendix, Possible Useful Formulas [as printed]: \\(P=V\\cdot I=V^2R=I^2/R\\).",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              3,
              7
            ]
          }
        ]
      },
      "assumptions": [
        "Jembatan standar memakai catu antara titik atas dan bawah, R1 di kiri atas, dan keluaran titik tengah kiri dikurangi kanan. Soal tidak memberi gambar polaritas; tanda berubah jika kabel keluaran ditukar.",
        "Voltmeter memiliki impedansi masuk tak hingga, resistor lain tetap, dan perubahan tahanan akibat suhu diabaikan sesuai soal.",
        "Lampiran salah mencetak dua bentuk daya. Perhitungan memakai P=VI=I²R=V²/R berdasarkan hukum Ohm."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2023,
        "number": 5
      },
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "tags": [
        "Rangkaian pengondisi sinyal"
      ],
      "statement": "Sensor gaya menjadi lengan R1 pada jembatan Wheatstone. Tahanan tanpa beban 500 Ω dan sensitivitas statik 0.5 Ω/N. Keempat lengan awalnya 500 Ω, dengan catu jembatan 10 V. Pada gaya 350 N, kerjakan tiga bagian. (a) Hitung tegangan keluaran dalam mode defleksi. (b) Hitung arus melalui sensor. (c) Hitung daya yang terdisipasi pada sensor. Abaikan kepekaan terhadap suhu. Lampiran mencetak rumus daya yang perlu diperiksa satuannya.",
      "simulation": {
        "id": "2023-uts1-q5-visual",
        "type": "ipe-bridge",
        "title": "Jembatan ukur",
        "caption": "R1 adalah sensor. Pengukuran selisih titik tengah tidak menarik arus pada model voltmeter ideal.",
        "params": [
          {
            "key": "resistance",
            "label": "Hambatan sensor",
            "min": 135,
            "max": 1350,
            "step": 0.1,
            "defaultValue": 675,
            "unit": "Ω"
          },
          {
            "key": "voltage",
            "label": "Tegangan catu",
            "min": 0,
            "max": 20,
            "step": 0.1,
            "defaultValue": 10,
            "unit": "V"
          }
        ],
        "data": {
          "R1": 675,
          "R2": 500,
          "R3": 500,
          "R4": 500,
          "V": 10,
          "variableArm": 1,
          "visualKind": "bridge"
        }
      },
      "steps": [
        {
          "id": "2023-uts1-q5-step-1",
          "title": "5a · Ubah gaya menjadi perubahan tahanan",
          "content": "Sensitivitas 0.5 Ω/N menyatakan bahwa tiap kenaikan gaya 1 N menaikkan tahanan sebesar 0.5 Ω pada model statik. Gaya 350 N karena itu menambah tahanan 175 Ω.\n\nPerubahan 175 Ω harus ditambahkan pada tahanan awal 500 Ω. Ketiga lengan lain tetap 500 Ω karena soal hanya menjadikan R1 sebagai sensor.\n\n$$\n\\Delta R_1=(0.5\\ \\Omega/\\mathrm N)(350\\ \\mathrm N)=175\\ \\Omega,\\qquad R_1=500+175=\\boxed{675\\ \\Omega}\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Hubungan simpul, arah pengukuran, dan beban menentukan persamaan rangkaian.",
            "commonPitfall": "Jangan menyalin rumus jembatan sebelum mencocokkan posisi catu dan terminal keluaran."
          }
        },
        {
          "id": "2023-uts1-q5-step-2",
          "title": "Tetapkan sambungan dan polaritas keluaran",
          "content": "Soal tidak menyertakan gambar polaritas. Kita gunakan jembatan standar: R1 di kiri atas, R2 di kiri bawah, R3 di kanan atas, R4 di kanan bawah. Catu memberi 10 V pada titik atas dan 0 V pada titik bawah.\n\nSebut titik tengah kiri A dan kanan B, lalu definisikan Vo=VA−VB. Voltmeter ideal tidak menarik arus di antara A dan B. Oleh karena itu, masing-masing sisi menjadi rangkaian dua resistor seri yang terpisah.\n\n$$\nV_o=V_A-V_B,\\qquad R_2=R_3=R_4=500\\ \\Omega\n$$",
          "simulation": {
            "id": "2023-uts1-q5-step-2-visual",
            "type": "ipe-bridge",
            "title": "Jembatan ukur",
            "caption": "R1 adalah sensor. Pengukuran selisih titik tengah tidak menarik arus pada model voltmeter ideal.",
            "params": [
              {
                "key": "resistance",
                "label": "Hambatan sensor",
                "min": 135,
                "max": 1350,
                "step": 0.1,
                "defaultValue": 675,
                "unit": "Ω"
              },
              {
                "key": "voltage",
                "label": "Tegangan catu",
                "min": 0,
                "max": 20,
                "step": 0.1,
                "defaultValue": 10,
                "unit": "V"
              }
            ],
            "data": {
              "R1": 675,
              "R2": 500,
              "R3": 500,
              "R4": 500,
              "V": 10,
              "variableArm": 1,
              "visualKind": "bridge"
            }
          }
        },
        {
          "id": "2023-uts1-q5-step-3",
          "title": "Gunakan pembagi tegangan pada sisi sensor",
          "content": "Arus sisi kiri adalah $V_s/(R_1+R_2)$. Tegangan titik A terhadap titik bawah sama dengan tegangan pada R2, sehingga $V_A=V_sR_2/(R_1+R_2)$.\n\nR1 membesar akibat gaya, sehingga lebih banyak tegangan jatuh pada R1 dan tegangan titik tengah kiri turun. Kita gunakan pembagi tepat karena perubahan tahanan 175/500=35% tidak kecil.\n\n$$\nV_A=10\\frac{500}{675+500}=10\\frac{500}{1175}=4.255319\\ \\mathrm V\n$$"
        },
        {
          "id": "2023-uts1-q5-step-4",
          "title": "Hitung sisi acuan dan selisih tegangan",
          "content": "Dua resistor sisi kanan tetap sama, sehingga membagi catu 10 V menjadi dua bagian sama besar. Titik B berada pada 5 V.\n\nKita kurangi VB dari VA sesuai polaritas yang telah ditetapkan. Tanda negatif berarti titik A lebih rendah dari B. Menukar kabel voltmeter membalik tanda, tetapi tidak mengubah besar keluarannya.\n\n$$\nV_B=10\\frac{500}{500+500}=5\\ \\mathrm V,\\qquad V_o=4.255319-5=\\boxed{-0.744681\\ \\mathrm V}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-5",
          "title": "5b · Cari arus pada cabang yang memuat sensor",
          "content": "Sensor R1 dan R2 tersusun seri. Voltmeter tidak menarik arus, sehingga arus melalui R1 sama dengan arus melalui R2.\n\nTahanan yang membatasi arus cabang adalah R1+R2=1175 Ω. Jangan membagi 10 V hanya dengan R1 karena sensor tidak menerima seluruh tegangan catu.\n\n$$\nI_s=\\frac{10}{675+500}=\\frac{10}{1175}=0.008510638\\ \\mathrm A=\\boxed{8.510638\\ \\mathrm{mA}}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-6",
          "title": "Bedakan arus sensor dari arus total sumber",
          "content": "Arus cabang kanan adalah 10/(500+500)=10 mA. Sumber memasok kedua cabang, sehingga arus totalnya lebih besar daripada arus melalui sensor.\n\nBagian b meminta arus sensor, sehingga jawaban tetap 8.510638 mA. Menjumlahkan kedua cabang akan menjawab arus yang ditarik seluruh jembatan.\n\n$$\nI_{\\rm right}=10\\ \\mathrm{mA},\\qquad I_{\\rm supply}=I_s+I_{\\rm right}=18.510638\\ \\mathrm{mA}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-7",
          "title": "5c · Periksa rumus daya pada lampiran",
          "content": "Daya listrik pada resistor adalah $P=VI$. Dengan hukum Ohm $V=IR$, bentuk yang setara adalah $P=I^2R=V^2/R$.\n\nLampiran tercetak menulis $V^2R$ dan $I^2/R$. Kedua bentuk itu salah secara satuan. Kita mempertahankan teks sumber, tetapi menghitung dengan hubungan daya dan hukum Ohm yang konsisten.\n\n$$\n\\boxed{P=VI=I^2R=\\frac{V^2}{R}}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-8",
          "title": "Hitung daya hanya pada resistor sensor",
          "content": "Pakai arus sensor 0.008510638 A dan tahanan sensor setelah diberi gaya, yaitu 675 Ω. Tahanan 500 Ω adalah nilai tanpa beban, sehingga tidak sesuai untuk kondisi yang sedang dihitung.\n\nKuadratkan arus lalu kalikan tahanan. Hasil dalam watt dapat diubah menjadi milliwatt dengan mengalikan 1000.\n\n$$\nP_s=I_s^2R_1=\\left(\\frac{10}{1175}\\right)^2(675)=0.048890901\\ \\mathrm W=\\boxed{48.890901\\ \\mathrm{mW}}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-9",
          "title": "Periksa hasil dengan tegangan pada sensor",
          "content": "Tegangan pada sensor adalah selisih titik atas 10 V dan titik A 4.255319 V, yaitu 5.744681 V. Ini juga sama dengan IsR1.\n\nKita kalikan tegangan itu dengan arus sensor untuk memperoleh daya yang sama. Menggunakan 10 V sebagai tegangan sensor akan menghitung daya terlalu besar karena mengabaikan jatuh tegangan pada R2.\n\n$$\nV_{R_1}=10-4.255319=5.744681\\ \\mathrm V,\\qquad V_{R_1}I_s=5.744681(0.008510638)=0.048890901\\ \\mathrm W\n$$"
        },
        {
          "id": "2023-uts1-q5-step-10",
          "title": "Maknai keluaran dan asumsi suhu",
          "content": "Pada gaya nol, semua resistor sama dan kedua titik tengah berada pada 5 V, sehingga Vo=0. Gaya mengubah satu lengan dan menghasilkan keluaran defleksi tanpa menyeimbangkan ulang jembatan.\n\nDaya pada sensor berubah menjadi panas. Soal meminta mengabaikan kepekaan terhadap suhu, sehingga kita tidak menambahkan perubahan tahanan akibat pemanasan tersebut. Hasil daya tetap penting sebagai besaran listrik yang diminta."
        }
      ],
      "finalAnswer": "Tahanan sensor menjadi 675 Ω. Dengan Vo=VA−VB, keluarannya −0.744681 V; besarnya 0.744681 V. Arus sensor 8.510638 mA dan daya sensor 48.890901 mW.\n\n$$\n\\boxed{R_1=675\\ \\Omega,\\quad|V_o|=0.744681\\ \\mathrm V,\\quad I_s=8.510638\\ \\mathrm{mA},\\quad P_s=48.890901\\ \\mathrm{mW}}\n$$",
      "takeaway": "Jangan menyalin rumus jembatan sebelum mencocokkan posisi catu dan terminal keluaran.",
      "sourceNotes": [
        "Bagian 1 halaman 3 menjelaskan jembatan sebagai pengondisi yang mengubah perubahan impedansi menjadi tegangan. Halaman 7 menunjukkan contoh jembatan strain gauge dengan simpul catu dan terminal keluarannya.",
        "Untuk jembatan pada soal ini, perhitungan tetap mengikuti sambungan dan polaritas yang dinyatakan dalam pembahasan. Rumus daya resistor berasal dari hubungan tegangan, arus, dan tahanan; nilai daya yang keliru pada bahan tambahan arsip tidak menjadi acuan hasil."
      ]
    },
    {
      "id": "ipe-signal-practice",
      "kind": "practice",
      "slug": "ipe-signal-practice",
      "title": "Latihan: Rangkaian pengondisi sinyal",
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "intro": "Latihan ini membantu Anda memilih model dan menjelaskan alasan. Mulai dari pilihan ganda, tinjau contoh yang keliru, lalu susun jawaban sendiri. Gunakan rubrik untuk memeriksa alur, asumsi, dan batas kesimpulan Anda.",
      "questions": [
        {
          "id": "concept-2024-07",
          "prompt": "Jembatan RTD pada gambar diberi catu di simpul kiri dan kanan, sementara voltmeter menghubungkan simpul atas dan bawah. Sebelum menghitung keluaran, tindakan mana yang paling tepat?",
          "options": [
            {
              "id": "concept-2024-07-option-1",
              "label": "Telusuri dua jalur dari simpul catu tinggi ke rendah, hitung kedua titik tengah, lalu tetapkan polaritas selisihnya.",
              "feedback": "Benar. Cara ini mempertahankan sambungan asli dan menunjukkan asal pembilang serta penyebut pembagi tegangan."
            },
            {
              "id": "concept-2024-07-option-2",
              "label": "Gunakan rumus hafalan untuk catu atas dan bawah tanpa mengubah pasangan resistor.",
              "feedback": "Rumus umum hanya benar jika pemetaan resistor dan simpul sesuai. Mengabaikan catu yang berbeda dapat memasangkan lengan yang salah.",
              "misconceptionTag": "concept-2024-07-choice-2"
            },
            {
              "id": "concept-2024-07-option-3",
              "label": "Gabungkan semua resistor sebagai satu rangkaian seri agar arusnya sama.",
              "feedback": "Ada dua jalur paralel antara simpul catu, sehingga seluruh resistor tidak membawa satu arus seri yang sama.",
              "misconceptionTag": "concept-2024-07-choice-3"
            },
            {
              "id": "concept-2024-07-option-4",
              "label": "Anggap voltmeter selalu membaca nol karena rangkaian berbentuk jembatan.",
              "feedback": "Bentuk jembatan tidak menjamin seimbang. Perubahan RTD justru membuat beda potensial untuk dibaca pada deflection mode.",
              "misconceptionTag": "concept-2024-07-choice-4"
            }
          ],
          "correctOptionId": "concept-2024-07-option-1",
          "explanation": "Hubungan listrik ditentukan sambungan, bukan arah gambar di kertas. Dengan voltmeter berimpedansi tinggi, jalur atas dan bawah masing-masing menjadi pembagi tegangan. Keluaran adalah selisih kedua simpul dengan polaritas yang dinyatakan.",
          "relatedProblemId": "2024-uas-q2"
        },
        {
          "id": "concept-2025-05",
          "prompt": "Sebuah filter RC pasif berubah responsnya saat dihubungkan ke beban berimpedansi rendah. Perancang ingin mengisolasi beban dan memberi penguatan pada sinyal frekuensi rendah. Pilihan mana paling sesuai?",
          "options": [
            {
              "id": "concept-2025-05-option-1",
              "label": "Hilangkan catu op-amp agar filter aktif bekerja tanpa sumber daya tambahan.",
              "feedback": "Tanpa catu yang sesuai, op-amp tidak menjalankan fungsi penguat atau penyangga sebagaimana dirancang.",
              "misconceptionTag": "concept-2025-05-choice-1"
            },
            {
              "id": "concept-2025-05-option-2",
              "label": "Tambahkan penguat operasional dengan susunan penyangga/penguat yang sesuai, sambil memeriksa catu, bandwidth, dan batas keluarannya.",
              "feedback": "Tepat. Susunan aktif dapat menangani isolasi beban dan penguatan, dengan batas alat yang tetap perlu diperiksa."
            },
            {
              "id": "concept-2025-05-option-3",
              "label": "Anggap filter aktif akan memotong semua frekuensi di atas cutoff menjadi tepat nol.",
              "feedback": "Filter nyata memiliki penurunan bertahap; cutoff bukan batas pemutusan mendadak menjadi nol.",
              "misconceptionTag": "concept-2025-05-choice-3"
            },
            {
              "id": "concept-2025-05-option-4",
              "label": "Ubah label filter menjadi aktif tanpa mengubah rangkaian RC atau beban.",
              "feedback": "Nama tidak mengubah impedansi atau hubungan sinyal. Perubahan fungsi memerlukan perubahan rangkaian.",
              "misconceptionTag": "concept-2025-05-choice-4"
            }
          ],
          "correctOptionId": "concept-2025-05-option-2",
          "explanation": "Penguat operasional dapat memberi impedansi masuk tinggi, impedansi keluar rendah, dan penguatan sesuai susunannya. Hal itu membantu mengurangi pembebanan pada jaringan RC. Namun, op-amp memerlukan daya dan memiliki batas frekuensi serta keluaran; “aktif” tidak berarti respons ideal tanpa batas.",
          "relatedProblemId": "2025-uts1-q5"
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-signal-guided",
          "mode": "spot-the-error",
          "title": "Periksa tanda tegangan jembatan",
          "prompt": "Voltmeter mengukur terminal B terhadap D. Periksa langkah berikut.",
          "workSample": "Saya sudah menemukan potensial B dan D terhadap acuan yang sama. Keluaran B terhadap D adalah VD dikurangi VB.",
          "question": {
            "id": "ipe-signal-guided-question",
            "prompt": "Apa langkah yang perlu Anda perbaiki?",
            "options": [
              {
                "id": "ipe-signal-guided-question-option-1",
                "label": "Kurangkan potensial D dari potensial B.",
                "feedback": "Tepat. Pembacaan B terhadap D memakai VB sebagai suku pertama."
              },
              {
                "id": "ipe-signal-guided-question-option-2",
                "label": "Jumlahkan kedua potensial tanpa melihat polaritas.",
                "feedback": "Penjumlahan bukan beda potensial yang diminta.",
                "misconceptionTag": "signal-guided-choice-2"
              },
              {
                "id": "ipe-signal-guided-question-option-3",
                "label": "Ubah acuan salah satu potensial saja.",
                "feedback": "Kedua potensial harus memakai acuan yang sama sebelum Anda mengurangkannya.",
                "misconceptionTag": "signal-guided-choice-3"
              }
            ],
            "correctOptionId": "ipe-signal-guided-question-option-1",
            "explanation": "Pembacaan B terhadap D berarti VB dikurangi VD. Pembalikan terminal membalik tanda, bukan mengubah besar tegangan."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-signal-essay",
          "title": "Jelaskan perubahan respons saat beban terpasang",
          "prompt": "Filter RC pasif bekerja sesuai model saat keluaran terbuka. Setelah Anda menghubungkan alat pembaca, amplitudo berubah. Susun pemeriksaan dan jelaskan kapan penyangga aktif dapat membantu.",
          "sections": [
            "Model dan asumsi",
            "Alur penalaran",
            "Kesimpulan dan batas"
          ],
          "hints": [
            "Masukan alat pembaca juga merupakan bagian rangkaian.",
            "Periksa impedansi sumber, filter, dan masukan alat pembaca.",
            "Bandingkan model tanpa beban dengan model berbeban. Lalu, periksa manfaat serta batas penyangga."
          ],
          "rubric": [
            {
              "id": "ipe-signal-rubric-model",
              "label": "Model dan asumsi",
              "weight": 35,
              "fullCredit": "Memasukkan impedansi masukan alat pembaca sebagai beban filter.",
              "commonPartialError": "Jangan menyalin rumus jembatan sebelum mencocokkan posisi catu dan terminal keluaran."
            },
            {
              "id": "ipe-signal-rubric-reasoning",
              "label": "Alur penalaran",
              "weight": 40,
              "fullCredit": "Menjelaskan bagaimana beban mengubah pembagi tegangan dan respons frekuensi."
            },
            {
              "id": "ipe-signal-rubric-conclusion",
              "label": "Kesimpulan dan batas",
              "weight": 25,
              "fullCredit": "Mengusulkan penyangga dengan pemeriksaan impedansi, catu, dan rentang frekuensi kerjanya."
            }
          ],
          "verifiedOutline": "Alat pembaca menarik arus sesuai impedansi masukannya. Arus tersebut dapat mengubah pembagi tegangan pada filter. Tambahkan beban ke model, lalu bandingkan responsnya dengan kondisi keluaran terbuka. Penyangga dengan impedansi masuk tinggi dapat mengurangi pengaruh beban. Periksa kemampuan keluarannya, batas catu, dan rentang frekuensi. Uji kembali rangkaian lengkap pada kondisi pemakaian."
        }
      ]
    }
  ]
};

export const english: NonNullable<CourseTranslation['modules']>[string] = {
  "title": "Signal-conditioning circuits",
  "items": {
    "ipe-signal-material": {
      "title": "Read circuit nodes, gain, and frequency response",
      "examHook": {
        "prompt": "A bridge diagram is rotated, and a memorized formula gives a different sign. How can you find the output without relying on drawing orientation?",
        "targetOutcome": "You can identify measurement nodes, polarity, and loading effects."
      },
      "body": "Mark the supply nodes and output terminals first. In a bridge, the connections determine voltage difference. In an amplifier, the input and feedback-resistor connections determine gain magnitude and sign.\n\nPart 1 gives bridge and amplifier examples. Part 2 gives the first-order RC model. You can use both sources to understand the active-filter example while keeping its circuit assumptions clear.\n\n[Open the worked solution: Passive and active low-pass filters](?item=2025-uts1-q5).",
      "microUnits": [
        {
          "id": "ipe-signal-principle",
          "title": "Read bridge nodes and polarity",
          "intuition": "A voltmeter reads the potential difference between two nodes. **Polarity** sets the subtraction order. You can find both potentials relative to one reference, then subtract them. Part 1, page 7, shows a bridge reading a strain gauge resistance change.",
          "formal": "For an unloaded voltage divider:\n\n$$V_B=V_s\\frac{R_2}{R_1+R_2}.$$\n\nCalculate the other branch from its own connections. The output is $V_{\\mathrm{out}}=V_B-V_D$. Swapping measurement terminals reverses the result’s sign.",
          "validityBounds": "This simple expression assumes negligible voltmeter current. Match supply nodes, measurement terminals, and resistors before using a formula from another drawing.",
          "decisionCheck": {
            "prompt": "You rotate a bridge drawing without changing its connections. What should determine the output equation?",
            "options": [
              {
                "id": "ipe-signal-decision-question-option-1",
                "label": "Supply nodes, output terminals, and resistor connections.",
                "feedback": "Correct. Electrical connections stay the same even when the drawing turns."
              },
              {
                "id": "ipe-signal-decision-question-option-2",
                "label": "Whichever resistor appears highest after rotation.",
                "feedback": "Page position does not change resistor connections."
              },
              {
                "id": "ipe-signal-decision-question-option-3",
                "label": "Page orientation, because it sets electrical polarity.",
                "feedback": "Polarity follows the measurement terminals rather than the page orientation."
              }
            ],
            "explanation": "Label nodes first. Find terminal potentials against the same reference, then subtract according to polarity."
          }
        },
        {
          "id": "ipe-signal-amplifiers",
          "title": "Choose an amplifier from its input connections",
          "intuition": "An inverting amplifier gives output with the opposite sign to its input. A non-inverting amplifier keeps the sign. Both use feedback, but the input and resistor connections set the gain.",
          "formal": "Part 1, page 8, shows both circuits. With $R_f$ as the feedback resistor:\n\n$$A_{\\mathrm{inv}}=-\\frac{R_f}{R_i},\\qquad A_{\\mathrm{noninv}}=1+\\frac{R_f}{R_g}.$$\n\n$R_i$ connects the source to the inverting input. $R_g$ connects the feedback node to reference in the non-inverting circuit.",
          "validityBounds": "When you use these formulas, assume an ideal op-amp with negative feedback. Check supply rails, operating frequency, and load so the amplifier remains linear.",
          "decisionCheck": {
            "prompt": "Two amplifiers use equal resistor values. One is inverting and the other non-inverting. Do you obtain the same gain?",
            "options": [
              {
                "id": "ipe-signal-amplifiers-decision-option-1",
                "label": "No. The ideal models give −1 for inverting and 2 for non-inverting.",
                "feedback": "Correct. The connections determine whether the formula uses a minus sign or an added one."
              },
              {
                "id": "ipe-signal-amplifiers-decision-option-2",
                "label": "Yes. Equal resistors always give a gain of 1.",
                "feedback": "Equal resistors do not determine the formula. You need to read the input connections."
              },
              {
                "id": "ipe-signal-amplifiers-decision-option-3",
                "label": "Yes. The connection type changes only the graph color.",
                "feedback": "Connections determine the actual electrical relation, including gain magnitude and sign."
              }
            ],
            "explanation": "Match the diagram to $-R_f/R_i$ or $1+R_f/R_g$ before substituting a resistor ratio of one."
          }
        },
        {
          "id": "ipe-signal-rc-model",
          "title": "Connect an RC filter to first-order response",
          "intuition": "In the example on Part 2, page 6, a resistor limits capacitor charging current. Capacitor voltage does not immediately follow a rapid change. The circuit therefore passes slow changes more strongly than fast ones.",
          "formal": "With output across the capacitor:\n\n$$RC\\frac{dV_{\\mathrm{out}}}{dt}+V_{\\mathrm{out}}=V_{\\mathrm{in}},\\qquad \\tau=RC,$$\n\n$$H(s)=\\frac{1}{1+sRC},\\qquad f_c=\\frac{1}{2\\pi RC}.$$\n\nAt $f=f_c$, gain magnitude is $1/\\sqrt2$ of its low-frequency value and phase is $-45^\\circ$.",
          "validityBounds": "This model assumes an ideal source and negligible output loading. Part 2, page 7, gives the first-order magnitude and phase curves. A real load can change gain and cutoff frequency.",
          "decisionCheck": {
            "prompt": "You increase C while holding R fixed in the unloaded RC circuit. Which change follows from the model?",
            "options": [
              {
                "id": "ipe-signal-rc-model-decision-option-1",
                "label": "The time constant rises and the cutoff frequency falls.",
                "feedback": "Correct. RC increases, while 1/(2πRC) decreases."
              },
              {
                "id": "ipe-signal-rc-model-decision-option-2",
                "label": "The time constant falls and the cutoff frequency rises.",
                "feedback": "The relation is reversed: a larger capacitor makes the response slower."
              },
              {
                "id": "ipe-signal-rc-model-decision-option-3",
                "label": "The low-frequency gain automatically becomes greater than one.",
                "feedback": "The ideal RC circuit keeps a low-frequency gain of one. The capacitor changes its time response."
              }
            ],
            "explanation": "Check both formulas: $\\tau=RC$ and $f_c=1/(2\\pi RC)$. They should give you consistent changes."
          }
        },
        {
          "id": "ipe-signal-active-example",
          "title": "Separate the source basis from the lab example",
          "intuition": "You can follow the RC section with a non-inverting amplifier. In the ideal model, the amplifier raises the signal and reduces how much the next stage loads the RC section. Parts 1 and 2 support these blocks, but do not specify the exam’s lab circuit.",
          "formal": "For this illustrative arrangement:\n\n$$H_{\\mathrm{active}}(s)=\\frac{1+R_f/R_g}{1+sRC}.$$\n\nWith $R=10\\,\\mathrm{k\\Omega}$, $C=100\\,\\mathrm{nF}$, and $R_f=R_g$, we obtain $f_c\\approx159.15\\,\\mathrm{Hz}$ and a low-frequency gain of 2.",
          "validityBounds": "You can try these illustrative values in the simulation. The values do not add evidence about the lab circuit. To answer the lab-schematic question exactly, match the circuit you actually used.",
          "decisionCheck": {
            "prompt": "An ideal gain-2 amplifier follows the RC section without changing its load. What changes in this example?",
            "options": [
              {
                "id": "ipe-signal-active-example-decision-option-1",
                "label": "The low-frequency gain becomes 2; the RC cutoff stays the same.",
                "feedback": "Correct. The amplifier multiplies the numerator while the denominator’s RC factor stays unchanged."
              },
              {
                "id": "ipe-signal-active-example-decision-option-2",
                "label": "The cutoff frequency always doubles.",
                "feedback": "The gain factor does not change RC in this ideal model."
              },
              {
                "id": "ipe-signal-active-example-decision-option-3",
                "label": "The capacitor no longer affects frequency response.",
                "feedback": "The RC factor remains in the denominator and still sets the amplitude roll-off."
              }
            ],
            "explanation": "Compare $1/(1+sRC)$ with $2/(1+sRC)$. You still need to check loading and op-amp limits in a real circuit."
          }
        }
      ],
      "checkpoints": [
        "You can determine bridge output from its nodes and polarity.",
        "You can choose an amplifier formula from its input connections.",
        "You can connect RC, time constant, and cutoff frequency.",
        "You can distinguish the theory basis from an unavailable lab schematic."
      ],
      "derivations": [
        {
          "id": "ipe-signal-sources",
          "title": "Sources and archive conventions",
          "content": "[Part 1 (2022)](https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view): page 3 places bridges and amplifiers in conditioning; page 7 shows a strain gauge bridge and weighing system; page 8 shows inverting and non-inverting amplifiers.\n\n[Part 2 (2022)](https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view): page 6 gives the RC circuit with $\\tau=RC$; page 7 gives first-order magnitude and phase response. We combine the RC and amplifier models for the active-filter example. These sources do not explicitly provide the lab schematic requested by the 2025 question.\n\nPage numbers count physical PDF pages from 1. Original questions still come from the [exam archive](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END); illustrative labels and values do not replace the papers."
        }
      ]
    },
    "2025-uts1-q5": {
      "title": "Passive and active low-pass filters",
      "source": "Midterm 1 2025 · Question 5",
      "assumptions": [
        "The RC section followed by a non-inverting amplifier is an example, not a reproduction of an unavailable practicum circuit.",
        "R=10 kΩ, C=100 nF, and Rf=Rg=10 kΩ are illustrative values. The model assumes an ideal source, high op-amp input impedance, and operation within supply and bandwidth limits."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Signal-conditioning circuits"
      ],
      "statement": "(a) Based on the practicum, explain the differences between passive and active low-pass filters. (b) Draw the active low-pass filter schematic used in the practicum.\nThe paper does not include the practicum circuit or component values. This solution gives a valid example: an RC section followed by a non-inverting amplifier. Match the submitted schematic to the circuit actually used in the practicum.",
      "simulation": {
        "title": "Low-pass filter",
        "caption": "Illustrative example: R = 10 kΩ, C = 100 nF, and amplifier gain 2. Observe how the RC section selects frequencies and the amplifier reduces loading. The paper does not provide the original practicum schematic.",
        "params": [
          {
            "key": "frequency",
            "label": "Input frequency"
          },
          {
            "key": "gain",
            "label": "Op-amp gain"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uts1-q5-step-1",
          "title": "1. Start with the purpose of a low-pass filter",
          "content": "You may want to measure slowly changing temperature while reducing faster electrical interference. A **low-pass filter** is a circuit that preserves low frequencies and attenuates high frequencies for this purpose. We compare passive and active circuits that perform this task. A real filter reduces amplitude gradually, rather than cutting it off abruptly at one frequency.\n\nThe cutoff $f_c$ provides a reference for that attenuation. For a first-order RC filter, amplitude at $f_c$ is $1/\\sqrt2$ of its low-frequency value. This drop is exactly −3.0103 dB, commonly called −3 dB.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Node connections, measurement direction, and loading determine circuit equations.",
            "commonPitfall": "Do not copy a bridge formula before matching the supply and output terminals."
          },
          "checkpoint": {
            "prompt": "A passive RC filter changes response when connected to a low-impedance load. The designer wants to isolate that load and amplify the low-frequency signal. Which choice best fits?",
            "options": [
              {
                "id": "2025-uts1-q5-checkpoint-option-1",
                "label": "Remove the op-amp supply so the active filter works without additional power.",
                "feedback": "Without a suitable supply, the op-amp cannot perform its designed amplification or buffering function."
              },
              {
                "id": "2025-uts1-q5-checkpoint-option-2",
                "label": "Add a suitable op-amp buffer/amplifier while checking its supply, bandwidth, and output limits.",
                "feedback": "Correct. An active arrangement can address load isolation and gain while retaining practical device limits."
              },
              {
                "id": "2025-uts1-q5-checkpoint-option-3",
                "label": "Assume an active filter makes every frequency above cutoff exactly zero.",
                "feedback": "Real filters roll off gradually; cutoff is not an abrupt boundary to zero output."
              },
              {
                "id": "2025-uts1-q5-checkpoint-option-4",
                "label": "Relabel the filter as active without changing the RC network or load.",
                "feedback": "A label cannot change impedance or signal relations. A functional change requires a circuit change."
              }
            ]
          }
        },
        {
          "id": "2025-uts1-q5-step-2",
          "title": "2. Explain how a passive RC example works",
          "content": "Connect resistor $R$ in series from input to the output node, and capacitor $C$ from that node to ground. Measure the voltage across the capacitor. At low frequency, capacitor impedance is large and the node voltage approaches the input; at higher frequency, capacitor impedance falls and the node voltage decreases.\n\nThis RC circuit needs no active-component supply and has no voltage gain above 1 under ideal unloaded conditions. Source and load resistance can nevertheless alter its response."
        },
        {
          "id": "2025-uts1-q5-step-3",
          "title": "3. Explain what the active component adds",
          "content": "An active filter uses a powered component such as an op-amp. Its high input impedance can reduce loading of the RC section. Its output can drive the next stage, while feedback can provide voltage gain if needed.\n\nThe amplifier still has limits: supply rails, output voltage range, bandwidth, and maximum rate of voltage change. An active design therefore cannot preserve every amplitude at every frequency."
        },
        {
          "id": "2025-uts1-q5-step-4",
          "title": "4. Compare the two types under stated conditions",
          "content": "The comparison below concerns a simple RC section and an RC section followed by an op-amp. Other passive filters can use inductors, and other active filters can have higher-order topologies.\n\n| Aspect | Passive RC | Active RC + op-amp |\n| --- | --- | --- |\n| Komponen / Components | R, C | R, C, op-amp |\n| Catu aktif / Active supply | Tidak / No | Ya / Yes |\n| Gain frekuensi rendah / Low-frequency gain | ≤ 1 untuk RC ini / for this RC | Dapat ≥ 1 / Can be ≥ 1 |\n| Pengaruh beban / Loading | Sumber dan beban mengubah respons / Source and load affect response | Op-amp mengurangi beban pada RC / Op-amp reduces RC loading |\n| Batas utama / Main limits | Nilai R, C serta sumber/beban / R, C and source/load | R, C serta catu dan batas op-amp / R, C and op-amp limits |"
        },
        {
          "id": "2025-uts1-q5-step-5",
          "title": "5. Draw the RC section and op-amp input",
          "content": "For the active example, keep the series resistor and grounded capacitor from the passive circuit. Connect the capacitor node to the op-amp non-inverting $(+)$ input. Take the final output from the op-amp output pin, not directly from the RC node.\n\nAn ideal op-amp input draws no current. The RC section therefore sets the frequency response while the op-amp prevents the output load from directly loading the capacitor. For real parts, this approximation requires sufficiently high input impedance."
        },
        {
          "id": "2025-uts1-q5-step-6",
          "title": "6. Complete the feedback and supply connections",
          "content": "Connect resistor $R_f$ from output to the inverting $(- )$ input, and $R_g$ from the inverting input to ground. This connection provides negative feedback and low-frequency gain $A_v=1+R_f/R_g$. Also show the op-amp supply pins and a common ground reference.\n\nFor the example gain of 2, choose $R_f=R_g$, for example 10 kΩ each. For a unity-gain buffer, the output can instead connect directly to the inverting input. Both are valid active-filter examples.\n\n$$\nA_v=1+\\frac{R_f}{R_g}=1+\\frac{10\\ \\mathrm{k\\Omega}}{10\\ \\mathrm{k\\Omega}}=2\n$$"
        },
        {
          "id": "2025-uts1-q5-step-7",
          "title": "7. Connect the schematic to the expected response",
          "content": "The RC section contributes $1/(1+sRC)$, while the non-inverting amplifier contributes $A_v$ while operating within its limits. Multiply them for the transfer function. At low frequency, gain approaches $A_v$; at high frequency, the RC section attenuates it.\n\nThe visual values are illustrative: $R=10\\ \\mathrm{k\\Omega}$ and $C=100\\ \\mathrm{nF}$ give $RC=0.001\\ \\mathrm s$ and $f_c\\approx159.15\\ \\mathrm{Hz}$. These values are not supplied by the practicum paper.\n\n$$\nH(s)=\\frac{A_v}{1+sRC},\\qquad f_c=\\frac1{2\\pi RC}=\\frac1{2\\pi(10^4)(10^{-7})}=159.15\\ \\mathrm{Hz}\n$$"
        },
        {
          "id": "2025-uts1-q5-step-8",
          "title": "8. Check the schematic against the actual practicum",
          "content": "Check that the capacitor connects the RC node to ground, the op-amp output feeds back to its inverting input, and the op-amp has power. At low frequency, this example should approach gain 2; well above cutoff, gain should decrease.\n\nThe paper does not show the actual practicum circuit. If the practicum used another topology, use the lab notes for its connections and component values. This example explains the principle without claiming to reproduce that circuit."
        }
      ],
      "finalAnswer": "A passive RC filter uses R and C, needs no active supply, and can be affected by source and load impedance. An active filter adds a powered component such as an op-amp to reduce loading and provide gain, subject to supply and amplifier-response limits. A valid example connects the RC node to the+ input, Rf from output to − input, and Rg from − input to ground, with the supply shown. The actual practicum schematic is not provided.\n\n$$\n\\boxed{H(s)=\\frac{1+R_f/R_g}{1+sRC},\\qquad f_c=\\frac1{2\\pi RC}}\n$$",
      "takeaway": "Do not copy a bridge formula before matching the supply and output terminals.",
      "sourceNotes": [
        "Part 1, page 8, shows inverting and non-inverting amplifiers. Part 2, page 6, gives an RC circuit with output across the capacitor and time constant RC; page 7 gives first-order magnitude and phase response.",
        "The solution combines RC and a non-inverting amplifier as an example derived from those models. These added sources still do not identify the schematic or component values used in the lab named by the 2025 exam."
      ]
    },
    "2023-uts1-q5": {
      "title": "Force-sensor bridge: voltage, current, and power",
      "source": "Midterm 1 2023 · Question 5",
      "assumptions": [
        "The standard bridge uses top-to-bottom excitation, R1 in the upper-left arm, and left-minus-right midpoint output. No polarity diagram is supplied; reversing output leads changes the sign.",
        "The voltmeter has infinite input impedance, other resistors stay fixed, and temperature-induced resistance changes are neglected as stated.",
        "The appendix misprints two power expressions. Calculation uses P=VI=I²R=V²/R from Ohm's law."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Signal-conditioning circuits"
      ],
      "statement": "A force sensor forms arm R1 of a Wheatstone bridge. Its unloaded resistance is 500 Ω, static sensitivity is 0.5 Ω/N, and all four arms initially equal 500 Ω. The bridge supply is 10 V. At a force of 350 N: (a) find output voltage in deflection mode; (b) find sensor current; (c) find sensor power dissipation. Neglect temperature sensitivity. The appendix prints a power formula whose units need checking.",
      "simulation": {
        "title": "Measurement bridge",
        "caption": "R1 is the sensor. The ideal voltmeter draws no current from the two midpoint nodes.",
        "params": [
          {
            "key": "resistance",
            "label": "Sensor resistance"
          },
          {
            "key": "voltage",
            "label": "Supply voltage"
          }
        ]
      },
      "steps": [
        {
          "id": "2023-uts1-q5-step-1",
          "title": "5a · Convert force into resistance change",
          "content": "Sensitivity 0.5 Ω/N means each additional 1 N raises resistance by 0.5 Ω in the static model. A force of 350 N therefore adds 175 Ω.\n\nAdd the 175 Ω change to the initial 500 Ω resistance. The other three arms stay at 500 Ω because only R1 is the sensing element.\n\n$$\n\\Delta R_1=(0.5\\ \\Omega/\\mathrm N)(350\\ \\mathrm N)=175\\ \\Omega,\\qquad R_1=500+175=\\boxed{675\\ \\Omega}\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Node connections, measurement direction, and loading determine circuit equations.",
            "commonPitfall": "Do not copy a bridge formula before matching the supply and output terminals."
          }
        },
        {
          "id": "2023-uts1-q5-step-2",
          "title": "Define the connections and output polarity",
          "content": "The question supplies no polarity diagram. We use a standard bridge: R1 upper-left, R2 lower-left, R3 upper-right, and R4 lower-right. The supply places 10 V at the top node and 0 V at the bottom.\n\nCall the left midpoint A and the right midpoint B, and define Vo=VA−VB. An ideal voltmeter draws no current between A and B. Each side is therefore a separate pair of series resistors.\n\n$$\nV_o=V_A-V_B,\\qquad R_2=R_3=R_4=500\\ \\Omega\n$$",
          "simulation": {
            "title": "Measurement bridge",
            "caption": "R1 is the sensor. The ideal voltmeter draws no current from the two midpoint nodes.",
            "params": [
              {
                "key": "resistance",
                "label": "Sensor resistance"
              },
              {
                "key": "voltage",
                "label": "Supply voltage"
              }
            ]
          }
        },
        {
          "id": "2023-uts1-q5-step-3",
          "title": "Use a voltage divider on the sensor side",
          "content": "Left-branch current is $V_s/(R_1+R_2)$. The voltage of A relative to the bottom node equals the voltage across R2, giving $V_A=V_sR_2/(R_1+R_2)$.\n\nR1 increases under load, placing more voltage across R1 and lowering the left midpoint voltage. We use the exact divider because the resistance change, 175/500=35%, is not small.\n\n$$\nV_A=10\\frac{500}{675+500}=10\\frac{500}{1175}=4.255319\\ \\mathrm V\n$$"
        },
        {
          "id": "2023-uts1-q5-step-4",
          "title": "Calculate the reference side and voltage difference",
          "content": "The two right-hand resistors remain equal, splitting the 10 V supply into equal parts. Node B is at 5 V.\n\nWe subtract VB from VA using the defined polarity. The negative sign means A is below B. Swapping voltmeter leads reverses the sign without changing output magnitude.\n\n$$\nV_B=10\\frac{500}{500+500}=5\\ \\mathrm V,\\qquad V_o=4.255319-5=\\boxed{-0.744681\\ \\mathrm V}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-5",
          "title": "5b · Find current in the sensor branch",
          "content": "Sensor R1 and R2 are in series. Since the voltmeter draws no current, the current through R1 equals that through R2.\n\nBranch current is set by R1+R2=1175 Ω. Do not divide 10 V by R1 alone, because the sensor does not receive the full supply voltage.\n\n$$\nI_s=\\frac{10}{675+500}=\\frac{10}{1175}=0.008510638\\ \\mathrm A=\\boxed{8.510638\\ \\mathrm{mA}}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-6",
          "title": "Distinguish sensor current from total supply current",
          "content": "Right-branch current is 10/(500+500)=10 mA. The supply feeds both branches, so total supply current is larger than sensor current.\n\nPart b asks for sensor current, so the answer remains 8.510638 mA. Adding the branches would instead answer the current drawn by the whole bridge.\n\n$$\nI_{\\rm right}=10\\ \\mathrm{mA},\\qquad I_{\\rm supply}=I_s+I_{\\rm right}=18.510638\\ \\mathrm{mA}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-7",
          "title": "5c · Check the appendix power formula",
          "content": "Electrical power in a resistor is $P=VI$. Using Ohm's law $V=IR$, equivalent forms are $P=I^2R=V^2/R$.\n\nThe printed appendix writes $V^2R$ and $I^2/R$. Both are dimensionally incorrect. Keep the original transcription, but calculate using the consistent power relation and Ohm's law.\n\n$$\n\\boxed{P=VI=I^2R=\\frac{V^2}{R}}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-8",
          "title": "Calculate power in the sensor resistor alone",
          "content": "We use sensor current 0.008510638 A and its loaded resistance of 675 Ω. The 500 Ω value is unloaded resistance and does not describe the present condition.\n\nSquare current and multiply by resistance. Convert the result in watts to milliwatts by multiplying by 1000.\n\n$$\nP_s=I_s^2R_1=\\left(\\frac{10}{1175}\\right)^2(675)=0.048890901\\ \\mathrm W=\\boxed{48.890901\\ \\mathrm{mW}}\n$$"
        },
        {
          "id": "2023-uts1-q5-step-9",
          "title": "Check using voltage across the sensor",
          "content": "Sensor voltage is the difference between the 10 V top node and node A at 4.255319 V: 5.744681 V. It also equals IsR1.\n\nWe multiply that voltage by sensor current to recover the same power. Using 10 V as sensor voltage would overestimate its power by ignoring the drop across R2.\n\n$$\nV_{R_1}=10-4.255319=5.744681\\ \\mathrm V,\\qquad V_{R_1}I_s=5.744681(0.008510638)=0.048890901\\ \\mathrm W\n$$"
        },
        {
          "id": "2023-uts1-q5-step-10",
          "title": "Interpret the output and temperature assumption",
          "content": "At zero force, all resistors are equal and both midpoints are at 5 V, so Vo=0. Force changes one arm and produces a deflection output without rebalancing the bridge.\n\nSensor power becomes heat. The question asks us to neglect temperature sensitivity, so no heating-induced resistance change is added. Dissipated power remains the requested electrical quantity."
        }
      ],
      "finalAnswer": "Sensor resistance becomes 675 Ω. Defining Vo=VA−VB gives −0.744681 V, with magnitude 0.744681 V. Sensor current is 8.510638 mA and sensor power is 48.890901 mW.\n\n$$\n\\boxed{R_1=675\\ \\Omega,\\quad|V_o|=0.744681\\ \\mathrm V,\\quad I_s=8.510638\\ \\mathrm{mA},\\quad P_s=48.890901\\ \\mathrm{mW}}\n$$",
      "takeaway": "Do not copy a bridge formula before matching the supply and output terminals.",
      "sourceNotes": [
        "Part 1, page 3, describes a bridge as a conditioner that converts impedance changes to voltage. Page 7 shows a strain gauge bridge with its supply nodes and output terminals.",
        "For this question’s bridge, the calculation still follows the connections and polarity stated in the solution. Resistor power follows the voltage-current-resistance relations; incorrect power values in the archive supplement do not determine the answer."
      ]
    },
    "ipe-signal-practice": {
      "title": "Practice: Signal-conditioning circuits",
      "intro": "This practice helps you choose a model and explain your reasoning. Start with multiple-choice questions, review a flawed example, then write your own answer. Use the rubric to check your logic, assumptions, and conclusion limits.",
      "questions": [
        {
          "id": "concept-2024-07",
          "prompt": "An RTD bridge is supplied across its left and right nodes, while a voltmeter connects the upper and lower nodes. What is the best action before calculating output?",
          "options": [
            {
              "id": "concept-2024-07-option-1",
              "label": "Trace both paths from high to low supply, calculate their midpoints, then define the difference polarity.",
              "feedback": "Correct. This preserves the actual wiring and explains the numerator and denominator of each divider."
            },
            {
              "id": "concept-2024-07-option-2",
              "label": "Use a memorised top-to-bottom supply formula without changing resistor pairings.",
              "feedback": "A general formula is valid only with the correct resistor and node mapping. Ignoring the supply orientation can pair the wrong arms."
            },
            {
              "id": "concept-2024-07-option-3",
              "label": "Combine all resistors into one series circuit so they carry the same current.",
              "feedback": "There are two parallel paths between supply nodes, so all resistors do not carry one common series current."
            },
            {
              "id": "concept-2024-07-option-4",
              "label": "Assume the voltmeter always reads zero because the circuit is a bridge.",
              "feedback": "A bridge shape does not guarantee balance. RTD change creates the potential difference read in deflection mode."
            }
          ],
          "explanation": "Electrical connections, not orientation on paper, determine the circuit. With a high-impedance voltmeter, upper and lower paths each form a voltage divider. Output is their midpoint difference under the stated polarity."
        },
        {
          "id": "concept-2025-05",
          "prompt": "A passive RC filter changes response when connected to a low-impedance load. The designer wants to isolate that load and amplify the low-frequency signal. Which choice best fits?",
          "options": [
            {
              "id": "concept-2025-05-option-1",
              "label": "Remove the op-amp supply so the active filter works without additional power.",
              "feedback": "Without a suitable supply, the op-amp cannot perform its designed amplification or buffering function."
            },
            {
              "id": "concept-2025-05-option-2",
              "label": "Add a suitable op-amp buffer/amplifier while checking its supply, bandwidth, and output limits.",
              "feedback": "Correct. An active arrangement can address load isolation and gain while retaining practical device limits."
            },
            {
              "id": "concept-2025-05-option-3",
              "label": "Assume an active filter makes every frequency above cutoff exactly zero.",
              "feedback": "Real filters roll off gradually; cutoff is not an abrupt boundary to zero output."
            },
            {
              "id": "concept-2025-05-option-4",
              "label": "Relabel the filter as active without changing the RC network or load.",
              "feedback": "A label cannot change impedance or signal relations. A functional change requires a circuit change."
            }
          ],
          "explanation": "An op-amp can provide high input impedance, low output impedance, and circuit-dependent gain. The high input impedance helps reduce loading of the RC network. It still requires power and has frequency and output limits; “active” does not mean unlimited ideal behavior."
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-signal-guided",
          "title": "Check the bridge-voltage sign",
          "prompt": "The voltmeter measures terminal B relative to D. Check the following step.",
          "workSample": "I found the potentials at B and D relative to the same reference. The output at B relative to D is VD minus VB.",
          "question": {
            "prompt": "Which step should you correct?",
            "options": [
              {
                "id": "ipe-signal-guided-question-option-1",
                "label": "Subtract the potential at D from the potential at B.",
                "feedback": "Correct. A reading at B relative to D uses VB as the first term."
              },
              {
                "id": "ipe-signal-guided-question-option-2",
                "label": "Add both potentials without considering polarity.",
                "feedback": "Addition does not give the requested potential difference."
              },
              {
                "id": "ipe-signal-guided-question-option-3",
                "label": "Change the reference for only one potential.",
                "feedback": "Both potentials must use the same reference before you subtract them."
              }
            ],
            "explanation": "A reading at B relative to D means VB minus VD. Reversing the terminals reverses the sign rather than changing the magnitude."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-signal-essay",
          "title": "Explain a response change after connecting a load",
          "prompt": "A passive RC filter matches its model with an open output. After you connect a reader, its amplitude changes. Plan a check and explain when an active buffer could help.",
          "sections": [
            "Model and assumptions",
            "Reasoning",
            "Conclusion and limits"
          ],
          "hints": [
            "The reader input also forms part of the circuit.",
            "Check source, filter, and reader input impedances.",
            "Compare unloaded and loaded models. Then check the buffer benefits and limits."
          ],
          "rubric": [
            {
              "id": "ipe-signal-rubric-model",
              "label": "Model and assumptions",
              "fullCredit": "Includes the reader input impedance as a filter load.",
              "commonPartialError": "Do not copy a bridge formula before matching the supply and output terminals."
            },
            {
              "id": "ipe-signal-rubric-reasoning",
              "label": "Reasoning",
              "fullCredit": "Explains how loading changes voltage division and frequency response."
            },
            {
              "id": "ipe-signal-rubric-conclusion",
              "label": "Conclusion and limits",
              "fullCredit": "Proposes a buffer while checking impedance, supply, and operating-frequency limits."
            }
          ],
          "verifiedOutline": "The reader draws current according to its input impedance. That current can alter voltage division in the filter. Include the load in the model and compare its response with the open-output case. A buffer with high input impedance can reduce loading. Check its output capability, supply limits, and frequency range. Retest the complete circuit under operating conditions."
        }
      ]
    }
  }
};

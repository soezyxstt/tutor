import type { CourseModule, CourseTranslation } from '@tutor/core';

export const module: CourseModule = {
  "id": "ipe-calibration",
  "code": "M2",
  "title": "Kalibrasi dan gangguan",
  "items": [
    {
      "id": "ipe-calibration-material",
      "kind": "material",
      "slug": "ipe-calibration-material",
      "title": "Bedakan perubahan kemiringan dan titik nol",
      "estimatedMinutes": 6,
      "examHook": {
        "prompt": "Catu sensor berubah. Apakah semua keluaran bergeser sama besar, atau perubahan keluaran bergantung pada masukan?",
        "targetOutcome": "Anda dapat memilih model kalibrasi dan menjelaskan batas penggunaannya."
      },
      "body": "Kalibrasi membandingkan keluaran alat dengan masukan acuan. Anda perlu membaca bentuk hubungannya sebelum menentukan angka. Perubahan garis dapat menunjukkan perubahan titik nol, kepekaan, atau keduanya.\n\nGunakan rentang dan kondisi uji yang sama saat membandingkan dua kurva. Catat perbedaan data sumber secara terbuka.\n\n[Buka pembahasan bertahap: Kalibrasi suhu dan pengaruh catu](?item=2025-uts1-q1).",
      "microUnits": [
        {
          "id": "ipe-calibration-principle",
          "title": "Pilih model dari kondisi soal",
          "intuition": "Keluaran yang bergeser sama besar menunjukkan perubahan titik nol. Keluaran yang bergeser makin jauh saat masukan naik menunjukkan perubahan kemiringan. **Sensitivitas** (perubahan keluaran per perubahan masukan) menyatakan kemiringan tersebut. Pembedaan ini membantu Anda memilih suku koreksi yang tepat.",
          "formal": "Model garis menggunakan:\n\n$$y=Kx+a.$$\n\n$K$ menyatakan sensitivitas dan $a$ menyatakan keluaran pada masukan nol. Bandingkan selisih keluaran pada masukan yang sama.",
          "validityBounds": "Model garis berlaku pada rentang kalibrasinya. Kalibrasi statik belum menjamin respons yang baik pada masukan cepat. Untuk histeresis, bandingkan lintasan naik dan turun pada masukan yang sama.",
          "decisionCheck": {
            "id": "ipe-calibration-decision-question",
            "prompt": "Dua garis kalibrasi berpotongan pada masukan nol. Garis kedua lebih curam. Suku model mana yang berubah?",
            "options": [
              {
                "id": "ipe-calibration-decision-question-option-1",
                "label": "Sensitivitas berubah; titik nol tetap.",
                "feedback": "Tepat. Kemiringan berubah, tetapi keluaran pada masukan nol sama."
              },
              {
                "id": "ipe-calibration-decision-question-option-2",
                "label": "Titik nol berubah; sensitivitas tetap.",
                "feedback": "Keluaran pada masukan nol sama. Perbedaannya muncul pada kemiringan garis.",
                "misconceptionTag": "calibration-decision-choice-2"
              },
              {
                "id": "ipe-calibration-decision-question-option-3",
                "label": "Kedua garis pasti menggambarkan respons dinamik.",
                "feedback": "Garis kalibrasi belum memberi informasi waktu respons.",
                "misconceptionTag": "calibration-decision-choice-3"
              }
            ],
            "correctOptionId": "ipe-calibration-decision-question-option-1",
            "explanation": "Dalam model garis, sensitivitas mengalikan masukan. Perubahan sensitivitas membuat selisih keluaran membesar saat masukan menjauh dari nol."
          }
        }
      ],
      "checkpoints": [
        "Anda dapat memilih model kalibrasi dan menjelaskan batas penggunaannya.",
        "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
        "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
      ],
      "derivations": [
        {
          "id": "ipe-calibration-sources",
          "title": "Sumber dan cara membaca arsip",
          "content": "[Arsip soal UTS 1, UTS 2, dan UAS 2023 sampai 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Tahun mengikuti folder arsip; tanggal pada naskah dapat berbeda.\n\n[Materi utama: Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view). Setiap pembahasan menyertakan naskah sumber, halaman, dan asumsi yang relevan."
        }
      ]
    },
    {
      "id": "2025-uts1-q1",
      "kind": "problem",
      "slug": "2025-uts1-q1",
      "title": "Kalibrasi suhu dan pengaruh catu",
      "source": "UTS 1 2025 · Soal 1",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
        "file": "2025-uts1.pdf",
        "pages": [
          1
        ],
        "original": "1. [30%] Static Characteristics of Measurement Systems\nA temperature sensor has an input range of 0 to 120°C and a standard voltage supply Vs = 9 V.\nThe calibration result is presented on the table below.\nInput temperature in °C: 0, 15, 30, 45, 60, 75, 90.\nOutput voltage in mV (Vs = 9 V): 0, 78, 155, 222, 308, 377, 450.\nOutput voltage in mV (Vs = 12 V): 5, 93, 177, 255, 345, 415, 500.\nBy using the general equation of a system element\n\\[O=KI+K_MI_MI+a+K_II_I+N(I),\\]\na. [10%] Calculate the slope (K) and offset (a) of the standard system.\nb. [10%] Calculate the constants KM and KI associated with supply voltage variations.\nc. [10%] Calculate the maximum non-linearity as a percentage of f.s.d.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Garis acuan memakai dua ujung data, bukan regresi. IM dan II berarti perubahan catu dari 9 V.",
        "Rentang tertulis 0 sampai 120 °C bertentangan dengan tabel yang berhenti 90 °C. Persen terhadap 600 mV memakai ekstrapolasi dan bukan bukti maksimum pada seluruh rentang.",
        "KM dan KI merangkum perubahan garis ujung. Sisa ketaklinieran dapat bergantung pada suhu serta catu."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2025,
        "number": 1
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "Sensor suhu memiliki rentang masukan yang tertulis 0 sampai 120 °C dan catu standar 9 V. Data kalibrasi:\nSuhu (°C): 0, 15, 30, 45, 60, 75, 90.\nKeluaran pada 9 V (mV): 0, 78, 155, 222, 308, 377, 450.\nKeluaran pada 12 V (mV): 5, 93, 177, 255, 345, 415, 500.\nGunakan $O=KI+K_MI_MI+a+K_II_I+N(I)$. Tentukan (a) kemiringan K dan offset a pada kondisi standar. Lanjutkan dengan (b) KM dan KI akibat perubahan catu. Untuk(c), hitung ketaklinieran maksimum sebagai persen simpangan skala penuh (f.s.d.). Perhatikan bahwa tabel berhenti pada 90 °C, berbeda dari batas 120 °C pada kalimat soal.",
      "simulation": {
        "id": "2025-uts1-q1-visual",
        "type": "ipe-calibration",
        "title": "Kalibrasi",
        "caption": "Bandingkan kedua catu dan garis ujung rentang data 0 sampai 90 °C. Span tabel 450 mV berbeda dari span 600 mV yang memerlukan ekstrapolasi ke 120 °C.",
        "params": [],
        "data": {
          "xs": [
            0,
            15,
            30,
            45,
            60,
            75,
            90
          ],
          "ys": [
            0,
            78,
            155,
            222,
            308,
            377,
            450
          ],
          "ys2": [
            5,
            93,
            177,
            255,
            345,
            415,
            500
          ],
          "supply1": 9,
          "supply2": 12,
          "xUnit": "°C",
          "yUnit": "mV",
          "visualKind": "calibration"
        }
      },
      "steps": [
        {
          "id": "2025-uts1-q1-step-1",
          "title": "1. Tetapkan masukan, keluaran, dan kondisi standar",
          "content": "Kita mencari hubungan suhu dengan tegangan pada dua catu. Masukan $I$ adalah suhu $T$ dalam °C; keluaran $O$ adalah tegangan dalam mV. Catu 9 V menjadi acuan. Kita membuat garis melalui kedua ujung data. **Residu** (selisih keluaran nyata terhadap garis acuan) memakai simbol $N$ untuk menilai ketaklinieran.\n\nMetode garis ujung berbeda dari regresi kuadrat terkecil. Soal tidak menetapkan metode lain, sehingga nyatakan pilihan ini sebelum menghitung.\n\n| T (°C) | O pada 9 V (mV) | O pada 12 V (mV) |\n| --- | --- | --- |\n| 0 | 0 | 5 |\n| 15 | 78 | 93 |\n| 30 | 155 | 177 |\n| 45 | 222 | 255 |\n| 60 | 308 | 345 |\n| 75 | 377 | 415 |\n| 90 | 450 | 500 |",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          }
        },
        {
          "id": "2025-uts1-q1-step-2",
          "title": "2. Cari sensitivitas dan offset pada catu 9 V",
          "content": "Kemiringan adalah kenaikan keluaran dibagi kenaikan suhu. Dua ujung data standar ialah $(0,0)$ dan $(90,450)$. Offset $a$ diperoleh dengan memasukkan satu titik ke $O=KT+a$; karena titik pertama nol, offsetnya nol.\n\n$K=5\\ \\mathrm{mV/{}^\\circ C}$ berarti garis acuan naik 5 mV untuk kenaikan 1 °C. Angka ini merangkum garis, bukan menjamin semua titik tabel tepat di atasnya.\n\n$$\nK=\\frac{450-0}{90-0}=5\\ \\mathrm{mV/{}^\\circ C},\\qquad a=0-K(0)=0\\ \\mathrm{mV}\\\\O_{9,\\mathrm{line}}=5T\n$$"
        },
        {
          "id": "2025-uts1-q1-step-3",
          "title": "3. Bentuk garis pembanding pada catu 12 V",
          "content": "Pada catu kedua, titik nol bergeser menjadi 5 mV dan titik 90 °C menjadi 500 mV. Kurangi offset 5 mV sebelum menghitung kemiringan; 500/90 saja akan mencampur perubahan offset dengan perubahan sensitivitas.\n\n$$\nK_{12}=\\frac{500-5}{90-0}=5.5\\ \\mathrm{mV/{}^\\circ C},\\qquad a_{12}=5\\ \\mathrm{mV}\\\\O_{12,\\mathrm{line}}=5.5T+5\n$$"
        },
        {
          "id": "2025-uts1-q1-step-4",
          "title": "4. Gunakan perubahan catu sebagai masukan pengganggu",
          "content": "Definisikan $\\Delta V_s=V_s-9\\ \\mathrm V$. Kedua suku pengaruh catu memakai perubahan dari kondisi standar ini: $I_M=I_I=\\Delta V_s$. Maka pengaruh tambahan menjadi nol ketika catu kembali 9 V.\n\n$K_I$ mengatur perubahan offset per volt. $K_M$ mengatur perubahan kemiringan per volt. Memisahkan keduanya mencegah kita menganggap seluruh perubahan keluaran berasal dari satu jenis galat.\n\n$$\n\\Delta V_s=12-9=3\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts1-q1-step-5",
          "title": "5. Cari KI dari perubahan titik nol",
          "content": "Pada $T=0$, semua suku yang mengandung suhu hilang. Perubahan keluaran dari 0 menjadi 5 mV hanya memberi perubahan offset garis. Bagi kenaikan itu dengan perubahan catu 3 V.\n\n$$\nK_I=\\frac{a_{12}-a_9}{12-9}=\\frac{5-0}{3}=\\frac53\\ \\mathrm{mV/V}\n$$"
        },
        {
          "id": "2025-uts1-q1-step-6",
          "title": "6. Cari KM dari perubahan kemiringan",
          "content": "Sensitivitas bertambah dari 5 menjadi 5.5 mV/°C. Bagi perubahan 0.5 mV/°C dengan 3 V. Satuan hasil harus menyertakan suhu dan catu karena koefisien ini mengubah sensitivitas per volt.\n\nPemeriksaan: pada $\\Delta V_s=3$, garis model menjadi $(5+\\tfrac16\\cdot3)T+\\tfrac53\\cdot3=5.5T+5$, sama dengan garis catu 12 V.\n\n$$\nK_M=\\frac{K_{12}-K_9}{12-9}=\\frac{5.5-5}{3}=\\frac16\\ \\mathrm{\\frac{mV}{{}^\\circ C\\,V}}\n$$"
        },
        {
          "id": "2025-uts1-q1-step-7",
          "title": "7. Hitung residu setiap titik pada kondisi standar",
          "content": "Ketaklinieran standar memakai catu 9 V. Untuk setiap suhu, hitung keluaran garis $5T$, lalu kurangi dari keluaran tabel. Contoh pada 60 °C: tabel 308 mV dan garis 300 mV, sehingga residunya+8 mV.\n\n$$\nN(T)=O_9(T)-5T,\\qquad \\max|N|=8\\ \\mathrm{mV}\\quad\\text{at }T=60^\\circ\\mathrm C\n$$\n\n| T (°C) | O 9 (mV) | Garis (mV) | N (mV) |\n| --- | --- | --- | --- |\n| 0 | 0 | 0 | 0 |\n| 15 | 78 | 75 | 3 |\n| 30 | 155 | 150 | 5 |\n| 45 | 222 | 225 | -3 |\n| 60 | 308 | 300 | 8 |\n| 75 | 377 | 375 | 2 |\n| 90 | 450 | 450 | 0 |"
        },
        {
          "id": "2025-uts1-q1-step-8",
          "title": "8. Pisahkan span terukur dari rentang yang hanya dinyatakan",
          "content": "Tabel hanya membuktikan keluaran 0 sampai 450 mV pada 0 sampai 90 °C. Terhadap span terukur itu, deviasi 8 mV adalah 1.778%. Namun, kalimat soal menyebut rentang 0 sampai 120 °C. Bila garis K=5 diekstrapolasi sampai 120 °C, span nominalnya 600 mV dan deviasi yang sama menjadi 1.333% dari span tersebut.\n\nTidak ada data 90 sampai 120 °C, jadi kita belum dapat membuktikan ketaklinieran maksimum di seluruh rentang 120 °C. Laporkan konvensi penyebutnya; jangan menyembunyikan perbedaan data ini.\n\n$$\n\\frac8{450}\\,100\\%=1.7778\\%\\quad\\text{(measured span)}\\\\\\frac8{5(120)}\\,100\\%=1.3333\\%\\quad\\text{(extrapolated nominal span)}\n$$"
        },
        {
          "id": "2025-uts1-q1-step-9",
          "title": "9. Tafsirkan pengaruh catu dan batas model garis",
          "content": "Kenaikan catu menggeser titik nol dan memperbesar sensitivitas: kedua jenis pengaruh memang ada. Garis ujung berhasil merangkum keduanya, tetapi residu tiap titik tetap perlu diperiksa. Pada 30 °C, misalnya, kenaikan keluaran nyata 22 mV berbeda dari kenaikan garis 20 mV; bentuk ketaklinieran juga dapat berubah.\n\nHasil a dan KI bersatuan mV dan mV/V, sedangkan K dan KM melibatkan perubahan terhadap suhu. Pemeriksaan satuan ini membantu membedakan pergeseran garis dari perubahan kemiringan."
        }
      ],
      "finalAnswer": "$K=5\\ \\mathrm{mV/{}^\\circ C}$, $a=0$, $K_M=1/6\\ \\mathrm{mV/({}^\\circ C\\,V)}$, dan $K_I=5/3\\ \\mathrm{mV/V}$. Deviasi maksimum pada titik terukur adalah 8 mV di 60 °C. Nilainya 1.778% span tabel 450 mV, atau 1.333% span nominal 600 mV bila garis diekstrapolasi ke 120 °C. Maksimum di wilayah 90 sampai 120 °C belum diketahui.\n\n$$\n\\boxed{K=5,\\quad a=0,\\quad K_M=\\tfrac16,\\quad K_I=\\tfrac53,\\quad\\max|N|_{\\mathrm{sampled}}=8\\ \\mathrm{mV}}\n$$",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "2025-uts1-q4",
      "kind": "problem",
      "slug": "2025-uts1-q4",
      "title": "Histeresis sensor tinggi cairan",
      "source": "UTS 1 2025 · Soal 4",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
        "file": "2025-uts1.pdf",
        "pages": [
          2
        ],
        "original": "4. [15%] Systematic Characteristics of Measurement Systems: Hysteresis\nA liquid level sensor has an input range of 0 to 24 cm. By using the calibration results given in the following table, estimate the maximum hysteresis as a percentage of f.s.d.\nLevel h (cm): 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24.\nOutput voltage (V), h increasing: 0.0, 2.4, 5.3, 8.1, 10.8, 13.7, 17.2, 20.3, 23.5, 26.7, 29.9, 33.2, 36.8.\nOutput voltage (V), h decreasing: 0.3, 2.9, 6.0, 9.0, 11.6, 14.4, 18.2, 21.5, 24.7, 27.5, 30.7, 34.2, 36.8.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Gunakan selisih penuh dua kurva pada masukan yang sama dan span keluaran 36.8 V.",
        "Maksimum berarti maksimum pada titik kalibrasi yang tersedia; perilaku di antara titik tidak diberikan."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2025,
        "number": 4
      },
      "difficulty": "menengah",
      "estimatedMinutes": 12,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "Sensor tinggi cairan memiliki rentang 0 sampai 24 cm. Kalibrasi memberi dua keluaran pada tinggi yang sama, masing-masing saat cairan naik dan turun.\nh (cm): 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24.\nTegangan saat naik (V): 0.0, 2.4, 5.3, 8.1, 10.8, 13.7, 17.2, 20.3, 23.5, 26.7, 29.9, 33.2, 36.8.\nTegangan saat turun (V): 0.3, 2.9, 6.0, 9.0, 11.6, 14.4, 18.2, 21.5, 24.7, 27.5, 30.7, 34.2, 36.8.\nTaksir histeresis maksimum sebagai persen simpangan skala penuh (f.s.d.).",
      "simulation": {
        "id": "2025-uts1-q4-visual",
        "type": "ipe-hysteresis",
        "title": "Histeresis",
        "caption": "Bandingkan dua tegangan pada tinggi yang sama. Celah vertikal terbesar pada data ialah 1.2 V di 14 cm dan 16 cm.",
        "params": [
          {
            "key": "level",
            "label": "Level yang dibandingkan",
            "min": 0,
            "max": 24,
            "step": 2,
            "defaultValue": 14,
            "unit": "cm"
          }
        ],
        "data": {
          "levels": [
            0,
            2,
            4,
            6,
            8,
            10,
            12,
            14,
            16,
            18,
            20,
            22,
            24
          ],
          "rising": [
            0,
            2.4,
            5.3,
            8.1,
            10.8,
            13.7,
            17.2,
            20.3,
            23.5,
            26.7,
            29.9,
            33.2,
            36.8
          ],
          "falling": [
            0.3,
            2.9,
            6,
            9,
            11.6,
            14.4,
            18.2,
            21.5,
            24.7,
            27.5,
            30.7,
            34.2,
            36.8
          ],
          "level": 14,
          "visualKind": "hysteresis"
        }
      },
      "steps": [
        {
          "id": "2025-uts1-q4-step-1",
          "title": "1. Kenali pasangan data yang harus dibandingkan",
          "content": "Keluaran sensor dapat berbeda pada tinggi yang sama karena arah perubahan sebelumnya berbeda. **Histeresis** (perbedaan keluaran akibat riwayat arah masukan) mengukur pengaruh tersebut. Kita membandingkan tegangan saat cairan naik dan turun pada satu $h$. Anda tidak perlu membuat garis lurus acuan untuk menghitung selisih kedua arah.\n\nContoh: pada 14 cm, sensor memberi 20.3 V saat naik dan 21.5 V saat turun. Tingginya sama; arah sebelumnya yang berbeda.\n\n| h (cm) | Naik (V) | Turun (V) |\n| --- | --- | --- |\n| 0 | 0.0 | 0.3 |\n| 2 | 2.4 | 2.9 |\n| 4 | 5.3 | 6.0 |\n| 6 | 8.1 | 9.0 |\n| 8 | 10.8 | 11.6 |\n| 10 | 13.7 | 14.4 |\n| 12 | 17.2 | 18.2 |\n| 14 | 20.3 | 21.5 |\n| 16 | 23.5 | 24.7 |\n| 18 | 26.7 | 27.5 |\n| 20 | 29.9 | 30.7 |\n| 22 | 33.2 | 34.2 |\n| 24 | 36.8 | 36.8 |",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          },
          "checkpoint": {
            "prompt": "Pada tinggi cairan yang sama, keluaran sensor berbeda antara saat tangki diisi dan saat dikosongkan. Perbandingan apa yang tepat untuk menilai histeresis?",
            "options": [
              {
                "id": "2025-uts1-q4-checkpoint-option-1",
                "label": "Bandingkan setiap titik dengan garis lurus, tanpa memperhatikan arah perubahan level.",
                "feedback": "Itu menilai ketaklinieran terhadap garis yang dipilih, bukan secara khusus jarak antara dua jalur.",
                "misconceptionTag": "concept-2025-07-choice-1"
              },
              {
                "id": "2025-uts1-q4-checkpoint-option-2",
                "label": "Bandingkan keluaran pada tinggi terendah dengan keluaran pada tinggi tertinggi.",
                "feedback": "Pengurangan kedua ujung memberi span keluaran. Span dapat menjadi penyebut persen, tetapi bukan besar histeresis.",
                "misconceptionTag": "concept-2025-07-choice-2"
              },
              {
                "id": "2025-uts1-q4-checkpoint-option-3",
                "label": "Bandingkan dua keluaran pada waktu yang sama walaupun tinggi cairannya berbeda.",
                "feedback": "Masukan berbeda juga mengubah keluaran. Perbandingan tersebut mencampur perubahan level dengan histeresis.",
                "misconceptionTag": "concept-2025-07-choice-3"
              },
              {
                "id": "2025-uts1-q4-checkpoint-option-4",
                "label": "Bandingkan keluaran naik dan turun pada masukan yang sama, lalu cari selisih terbesar.",
                "feedback": "Tepat. Masukan yang sama membuat selisih mencerminkan pengaruh arah/riwayat."
              }
            ],
            "correctOptionId": "2025-uts1-q4-checkpoint-option-4"
          }
        },
        {
          "id": "2025-uts1-q4-step-2",
          "title": "2. Hitung selisih mutlak di setiap tinggi",
          "content": "Definisikan $H(h)$ sebagai jarak vertikal kedua kurva pada tinggi $h$. Nilai mutlak membuat ukuran histeresis tetap positif, apa pun kurva yang lebih tinggi. Pada 14 cm, hitung 21.5−20.3=1.2 V.\n\n$$\nH(h)=|O_{\\downarrow}(h)-O_{\\uparrow}(h)|\n$$\n\n| h (cm) | \\|Turun − naik\\| (V) |\n| --- | --- |\n| 0 | 0.3 |\n| 2 | 0.5 |\n| 4 | 0.7 |\n| 6 | 0.9 |\n| 8 | 0.8 |\n| 10 | 0.7 |\n| 12 | 1.0 |\n| 14 | 1.2 |\n| 16 | 1.2 |\n| 18 | 0.8 |\n| 20 | 0.8 |\n| 22 | 1.0 |\n| 24 | 0.0 |"
        },
        {
          "id": "2025-uts1-q4-step-3",
          "title": "3. Ambil celah terbesar, bukan hanya selisih di ujung",
          "content": "Dari seluruh baris, nilai tertinggi adalah 1.2 V dan muncul dua kali: pada 14 cm serta 16 cm. Selisih 0.3 V pada 0 cm dan 0 V pada 24 cm tidak mewakili celah terbesar di tengah rentang.\n\n$$\nH_{\\max}=1.2\\ \\mathrm V\\qquad(h=14\\ \\mathrm{cm}\\ \\text{or}\\ 16\\ \\mathrm{cm})\n$$"
        },
        {
          "id": "2025-uts1-q4-step-4",
          "title": "4. Pilih span keluaran agar satuan saling hapus",
          "content": "Pembilang kita berupa tegangan, maka penyebut juga harus berupa tegangan. Span keluaran penuh pada tabel ialah 36.8−0=36.8 V. Membagi 1.2 V langsung dengan rentang masukan 24 cm akan menghasilkan V/cm, bukan persen.\n\n$$\nO_{\\rm span}=36.8-0=36.8\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts1-q4-step-5",
          "title": "5. Nyatakan histeresis sebagai persen skala penuh",
          "content": "Bagi celah maksimum dengan span keluaran, lalu kalikan 100%. Gunakan celah penuh 1.2 V: soal meminta histeresis maksimum, bukan simpangan ±terhadap garis tengah kedua kurva.\n\n$$\nH_{\\%\\mathrm{fsd}}=\\frac{1.2\\ \\mathrm V}{36.8\\ \\mathrm V}\\,100\\%=3.2608696\\%\\approx3.26\\%\n$$"
        },
        {
          "id": "2025-uts1-q4-step-6",
          "title": "6. Tafsirkan hasil dan batas taksirannya",
          "content": "Pada data ini, riwayat arah perubahan dapat mengubah tegangan hingga 1.2 V untuk tinggi cairan yang sama. Histeresis berbeda dari ketaklinieran: ketaklinieran membandingkan keluaran terhadap garis acuan, sedangkan histeresis membandingkan dua arah pada masukan yang sama.\n\nHasil 3.26% merupakan taksiran dari titik tabel. Tanpa data yang lebih rapat, kita belum mengetahui apakah celah di antara titik-titik itu lebih besar."
        }
      ],
      "finalAnswer": "Histeresis maksimum pada titik terukur ialah 1.2 V, terjadi pada 14 cm dan 16 cm. Dengan span keluaran 36.8 V, histeresis maksimum sekitar 3.26% f.s.d.\n\n$$\n\\boxed{H_{\\max}=1.2\\ \\mathrm V,\\qquad H_{\\%\\mathrm{fsd}}=3.26087\\%}\n$$",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "2025-uts2-q6",
      "kind": "problem",
      "slug": "2025-uts2-q6",
      "title": "Memilih kalibrasi statik atau dinamik",
      "source": "UTS 2 2025 · Soal 6",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
        "file": "2025-uts2.pdf",
        "pages": [
          3
        ],
        "original": "6. Practicum Questions: Static and Dynamic Calibration\na. [5%] When should dynamic calibration be performed instead of static calibration?\nb. [5%] Why is sensor calibration important?",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
          "pages": [
            19
          ]
        }
      },
      "exam": {
        "term": "UTS 2",
        "year": 2025,
        "number": 6
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "(a) Kapan kita perlu kalibrasi dinamik, bukan hanya kalibrasi statik? (b) Mengapa kalibrasi sensor penting?",
      "simulation": {
        "id": "2025-uts2-q6-visual",
        "type": "ipe-calibration",
        "title": "Kalibrasi",
        "caption": "Hubungan tunak dan respons terhadap waktu menjawab dua kebutuhan kalibrasi yang berbeda.",
        "params": [
          {
            "key": "tau",
            "label": "Konstanta waktu τ",
            "min": 0.2,
            "max": 3,
            "step": 0.1,
            "defaultValue": 1,
            "unit": "s"
          },
          {
            "key": "time",
            "label": "Posisi waktu",
            "min": 0,
            "max": 100,
            "step": 0.1,
            "defaultValue": 0,
            "unit": "%"
          }
        ],
        "data": {
          "mode": "static-dynamic",
          "visualKind": "calibration"
        }
      },
      "steps": [
        {
          "id": "2025-uts2-q6-step-1",
          "title": "1. Mulai dari tujuan kalibrasi",
          "content": "Kita memberi alat masukan acuan, lalu membandingkan keluarannya dengan acuan tersebut. **Kalibrasi** (penetapan hubungan acuan dan indikasi) menunjukkan bagaimana alat merespons besaran yang diketahui. Anda perlu membedakan masukan tetap dan masukan berubah karena kedua kondisi menguji kemampuan yang berbeda.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          },
          "checkpoint": {
            "prompt": "Dua sensor suhu menunjukkan nilai akhir yang sama pada setiap suhu acuan. Namun, saat suhu berubah cepat, salah satu sensor tertinggal jauh. Kesimpulan mana yang paling tepat?",
            "options": [
              {
                "id": "2025-uts2-q6-checkpoint-option-1",
                "label": "Kalibrasi statik yang sama menjamin kedua sensor cocok untuk semua perubahan suhu.",
                "feedback": "Keadaan akhir yang sama tidak memberi informasi lengkap tentang waktu tanggap.",
                "misconceptionTag": "concept-2025-06-choice-1"
              },
              {
                "id": "2025-uts2-q6-checkpoint-option-2",
                "label": "Keduanya dapat memiliki perilaku statik serupa, tetapi perlu dibandingkan respons dinamiknya untuk tugas cepat.",
                "feedback": "Tepat. Pisahkan ketepatan keadaan tunak dari kemampuan mengikuti perubahan."
              },
              {
                "id": "2025-uts2-q6-checkpoint-option-3",
                "label": "Sensor yang lambat pasti memiliki offset keadaan tunak lebih besar.",
                "feedback": "Keterlambatan dapat terjadi meskipun offset akhirnya sama-sama nol.",
                "misconceptionTag": "concept-2025-06-choice-3"
              },
              {
                "id": "2025-uts2-q6-checkpoint-option-4",
                "label": "Menambah digit layar akan membuat sensor lambat mengikuti suhu lebih cepat.",
                "feedback": "Digit memengaruhi resolusi tampilan, bukan proses fisik yang menentukan waktu tanggap.",
                "misconceptionTag": "concept-2025-06-choice-4"
              }
            ],
            "correctOptionId": "2025-uts2-q6-checkpoint-option-2"
          }
        },
        {
          "id": "2025-uts2-q6-step-2",
          "title": "2. Lihat apakah besaran berubah selama pengukuran",
          "content": "Kalibrasi statik memberi masukan yang tetap atau berubah cukup lambat hingga keluaran stabil. Metode ini cocok untuk mencari hubungan masukan-keluaran, offset, sensitivitas, dan ketaklinieran pada kondisi tunak.\n\nContohnya, letakkan sensor suhu pada beberapa suhu acuan dan tunggu hingga tiap keluaran stabil. Langkah menunggu memisahkan galat keadaan tunak dari keterlambatan sensor."
        },
        {
          "id": "2025-uts2-q6-step-3",
          "title": "3. Baca sensitivitas dan offset dari keadaan tunak",
          "content": "Offset adalah keluaran ketika masukan acuan nol, menurut definisi alat. Sensitivitas $K$ adalah perubahan keluaran per perubahan masukan. Bila titik kalibrasi tidak mengikuti satu garis, residunya menunjukkan ketaklinieran terhadap garis acuan yang dipilih.\n\n$$\nK=\\frac{\\Delta y_{\\mathrm{steady}}}{\\Delta x},\\qquad y_{\\mathrm{reference}}=Kx+a\n$$"
        },
        {
          "id": "2025-uts2-q6-step-4",
          "title": "4. Pilih kalibrasi dinamik untuk perubahan cepat",
          "content": "Gunakan kalibrasi dinamik saat laju perubahan masukan sebanding dengan, atau lebih cepat dari, respons sensor. Contohnya pengukuran getaran, benturan, atau suhu yang berubah cepat. Sensor bisa benar pada keadaan tunak tetapi terlambat atau salah amplitudo saat digunakan.\n\nMisalnya, dua sensor dapat menunjukkan suhu akhir yang sama, tetapi salah satunya memerlukan waktu lebih lama. Keduanya dapat memiliki kalibrasi statik baik, namun tidak sama baiknya untuk mencatat perubahan suhu cepat."
        },
        {
          "id": "2025-uts2-q6-step-5",
          "title": "5. Ukur hubungan waktu atau frekuensi",
          "content": "Masukan tangga dapat menunjukkan waktu tanggap dan waktu tunak. Masukan sinus pada beberapa frekuensi menunjukkan perubahan sensitivitas dan beda fase. Hasilnya menentukan rentang frekuensi yang masih memberi pembacaan layak.\n\nPada uji sinus, bandingkan amplitudo setelah respons awal mereda. Besar $|G(j\\omega)|$ menyatakan perbandingan amplitudo dan sudut $\\arg G(j\\omega)$ menyatakan beda fase. Nilai ini dapat berubah dengan frekuensi meski sensitivitas statiknya tetap.\n\n$$\nK=\\frac{\\Delta y_{\\mathrm{steady}}}{\\Delta x},\\qquad G(j\\omega)=\\frac{Y(j\\omega)}{X(j\\omega)}\n$$"
        },
        {
          "id": "2025-uts2-q6-step-6",
          "title": "6. Pilih pengujian berdasarkan cara alat dipakai",
          "content": "Untuk memantau suhu ruang yang berubah lambat, hubungan statik sering menjadi perhatian awal. Untuk getaran mesin, sensor juga harus mengikuti amplitudo dan fase pada frekuensi kerja. Pilihan uji mengikuti perubahan sinyal yang ingin diukur."
        },
        {
          "id": "2025-uts2-q6-step-7",
          "title": "7. Jelaskan manfaat kalibrasi",
          "content": "Kalibrasi membandingkan alat dengan acuan yang diketahui, sehingga kita dapat menaksir galat, membuat koreksi, dan menyatakan ketidakpastian. Kalibrasi ulang juga membantu melihat drift akibat waktu atau kondisi pemakaian. Kalibrasi tidak otomatis memperbaiki alat; hasilnya memberi dasar untuk koreksi atau penyetelan.\n\nPisahkan kalibrasi dari penyetelan: kalibrasi menemukan hubungan dan galat; penyetelan mengubah alat. Sesudah penyetelan, lakukan pemeriksaan lagi untuk memastikan hubungan barunya sesuai."
        }
      ],
      "finalAnswer": "Kalibrasi dinamik diperlukan saat respons waktu sensor memengaruhi hasil. Kalibrasi statik tetap diperlukan untuk skala dan offset; kalibrasi dinamik menambah informasi amplitudo, fase, dan batas frekuensi.",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "2025-uas-q2",
      "kind": "problem",
      "slug": "2025-uas-q2",
      "title": "Kalibrasi sensor dan perubahan catu",
      "source": "UAS 2025 · Soal 2",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
        "file": "2025-uas.pdf",
        "pages": [
          1,
          3
        ],
        "original": "2. [20%] Systematic Characteristics of Measurement System\nA displacement sensor has an input range of 0.0 to 0.3 cm and a standard supply voltage Vs = 1.0 volts. Using the calibration results given in the table, estimate:\na. [5%] The slope K of the ideal straight line.\nb. [10%] The constant KI, KM associated with supply voltage variations.\nc. [5%] The maximum nonlinearity as a percentage of f.s.d.\nDisplacement x in cm: 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0.\nOutput voltage in millivolts when Vs = 1.0 V: 0, 33, 64, 88, 103, 111, 116.\nOutput voltage in millivolts when Vs = 1.2 V: 0, 42, 83, 112, 130, 141, 148.\nUseful formula: \\(O=KI+K_M I_M I+a+K_I I_I+N(I)\\).",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Rentang 0.0 sampai 0.3 cm pada paragraf bertentangan dengan tabel 0.0 sampai 3.0 cm. Hasil memakai tabel. Jika seluruh posisi tabel seharusnya sepersepuluhnya, K dan KM menjadi sepuluh kali lebih besar; persen ketaklinieran tetap.",
        "K dan KM memakai garis dua ujung, bukan regresi kuadrat terkecil. Data tidak mendukung satu model perubahan catu linear yang tepat untuk semua posisi. Maksimum di antara titik sampel belum membuktikan maksimum pada setiap posisi kontinu."
      ],
      "exam": {
        "term": "UAS",
        "year": 2025,
        "number": 2
      },
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "Sensor perpindahan memakai catu acuan $V_s=1.0\\ \\mathrm V$. Teks soal menyebut rentang 0.0 sampai 0.3 cm, tetapi tabel memberi 0.0 sampai 3.0 cm. Kita pertahankan catatan ini dan memakai angka tabel secara konsisten.\nUntuk $x=[0,0.5,1,1.5,2,2.5,3]\\ \\mathrm{cm}$, keluaran pada 1.0 V ialah $[0,33,64,88,103,111,116]\\ \\mathrm{mV}$, dan pada 1.2 V ialah $[0,42,83,112,130,141,148]\\ \\mathrm{mV}$.\n(a) Cari kemiringan ideal $K$. (b) Taksir $K_I$ dan $K_M$ akibat perubahan catu. (c) Cari ketaklinieran maksimum dalam persen skala penuh.",
      "simulation": {
        "id": "2025-uas-q2-visual",
        "type": "ipe-calibration",
        "title": "Kalibrasi",
        "caption": "Bandingkan data kalibrasi, garis dua ujung, dan jarak vertikal tiap titik.",
        "params": [],
        "data": {
          "xs": [
            0,
            0.5,
            1,
            1.5,
            2,
            2.5,
            3
          ],
          "ys": [
            0,
            33,
            64,
            88,
            103,
            111,
            116
          ],
          "ys2": [
            0,
            42,
            83,
            112,
            130,
            141,
            148
          ],
          "supply1": 1,
          "supply2": 1.2,
          "xUnit": "cm",
          "yUnit": "mV",
          "visualKind": "calibration"
        }
      },
      "steps": [
        {
          "id": "2025-uas-q2-step-1",
          "title": "1. Tetapkan data acuan dan jelaskan konflik satuan sumber",
          "content": "Kita memakai posisi $x$ dalam cm dan keluaran $O$ dalam mV. Tabel memuat posisi 0 sampai 3.0 cm, tetapi kalimat soal menyebut maksimum 0.3 cm. Kita mengikuti semua angka tabel secara konsisten. Mengubah titik akhirnya saja akan mengubah hubungan data secara keliru.\n\nCatu 1.0 V menjadi kondisi standar. Kita akan mencari garis acuannya, melihat bagaimana catu 1.2 V mengubah garis itu, lalu menghitung ketaklinieran terhadap garis standar.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          }
        },
        {
          "id": "2025-uas-q2-step-2",
          "title": "2. Pakai garis dua ujung sebagai acuan",
          "content": "Pada catu standar, dua ujung tabel adalah (0 cm, 0 mV) dan (3 cm, 116 mV). Garis ideal melewati kedua titik ini, sehingga offset acuannya nol.\n\nDalam $O=Kx+a$, $K$ adalah perubahan keluaran per cm dan $a$ adalah keluaran garis pada $x=0$. Gunakan selisih keluaran dibagi selisih masukan; jangan membagi masing-masing titik untuk memaksakan satu kemiringan pada kurva yang tidak lurus.\n\n$$\nK=\\frac{116-0}{3-0}=38.6667\\ \\mathrm{mV/cm},\\qquad a=0,\\qquad O_{\\mathrm{lin}}(x)=38.6667x\n$$"
        },
        {
          "id": "2025-uas-q2-step-3",
          "title": "3. Pisahkan perubahan offset dan kemiringan",
          "content": "Gunakan $\\Delta V_s=V_s-1.0\\ \\mathrm V$. Koefisien $K_I$ menunjukkan pergeseran keluaran yang tidak bergantung pada posisi. Koefisien $K_M$ menunjukkan perubahan sensitivitas per perubahan catu. Model berikut memakai taksiran garis ujung.\n\nMenggunakan $\\Delta V_s$, bukan $V_s$ langsung, memastikan pengaruh catu tambahan nol pada kondisi standar. Suku $K_I\\Delta V_s$ menggeser seluruh garis; suku $K_M\\Delta V_s\\,x$ mengubah kemiringannya.\n\n$$\nO(x,V_s)\\approx[K+K_M\\Delta V_s]x+a+K_I\\Delta V_s+N(x,V_s)\n$$"
        },
        {
          "id": "2025-uas-q2-step-4",
          "title": "4. Cari KI dari titik nol",
          "content": "Pada x = 0, kedua catu memberi keluaran 0 mV. Jadi, perubahan catu tidak menggeser titik nol pada data ini.\n\nMemilih $x=0$ sengaja menghapus semua suku yang mengandung posisi. Dengan demikian, selisih keluaran pada titik nol menguji pengaruh offset tanpa tercampur pengaruh kemiringan.\n\n$$\nK_I=\\frac{O(0,1.2)-O(0,1.0)}{1.2-1.0}=\\frac{0-0}{0.2}=0\\ \\mathrm{mV/V}\n$$"
        },
        {
          "id": "2025-uas-q2-step-5",
          "title": "5. Cari KM dari perubahan kemiringan",
          "content": "Garis ujung pada 1.2 V memiliki kemiringan 148/3 mV/cm. Kurangi dengan kemiringan acuan lalu bagi 0.2 V.\n\nPerubahan kemiringannya 10.6667 mV/cm untuk kenaikan catu 0.2 V. Pembagian oleh 0.2 menghasilkan pengaruh per volt, bukan pengaruh total saat catu menjadi 1.2 V.\n\nPemeriksaan: $38.6667+53.3333(0.2)=49.3333\\ \\mathrm{mV/cm}$. Jadi model mengembalikan kemiringan ujung pada catu kedua.\n\n$$\nK_{1.2}=\\frac{148}{3}=49.3333\\ \\mathrm{mV/cm}\\\\K_M=\\frac{49.3333-38.6667}{0.2}=53.3333\\ \\mathrm{mV/(cm\\,V)}\n$$\n\n> Ini taksiran dari dua ujung, bukan kecocokan tepat semua titik. Misalnya pada x = 1 cm, model perubahan garis memberi 10.667 mV, sedangkan tabel memberi 19 mV. Bentuk ketaklinieran juga berubah bersama catu."
        },
        {
          "id": "2025-uas-q2-step-6",
          "title": "6. Hitung satu residu dengan lengkap sebelum seluruh tabel",
          "content": "Pada $x=1.5\\ \\mathrm{cm}$, garis acuan memprediksi $38.6667(1.5)=58\\ \\mathrm{mV}$, sedangkan pengukuran memberi 88 mV. Selisih 30 mV berarti titik nyata berada di atas garis, bukan bahwa posisi sebenarnya bertambah 30 cm.\n\n$$\nN(1.5)=O_{\\mathrm{measured}}-O_{\\mathrm{line}}=88-58=30\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uas-q2-step-7",
          "title": "7. Hitung simpangan pada setiap posisi",
          "content": "Gunakan data catu standar 1.0 V untuk menilai ketaklinieran sensor acuan. Kurangi setiap keluaran tabel dengan keluaran garis ideal pada posisi yang sama.\n\nTerapkan pengurangan yang sama pada setiap baris. Garis acuan melalui dua ujung. Oleh karena itu, residu di kedua ujung harus nol. Pemeriksaan ini membantu menemukan salah substitusi atau salah satuan.\n\n$$\nN(x)=O(x,1.0)-38.6667x\n$$\n\n| x (cm) | O (mV) | Garis ideal (mV) | Simpangan (mV) |\n| --- | --- | --- | --- |\n| 0.0 | 0 | 0.000 | 0.000 |\n| 0.5 | 33 | 19.333 | 13.667 |\n| 1.0 | 64 | 38.667 | 25.333 |\n| 1.5 | 88 | 58.000 | 30.000 |\n| 2.0 | 103 | 77.333 | 25.667 |\n| 2.5 | 111 | 96.667 | 14.333 |\n| 3.0 | 116 | 116.000 | 0.000 |"
        },
        {
          "id": "2025-uas-q2-step-8",
          "title": "8. Nyatakan simpangan maksimum dalam persen",
          "content": "Simpangan terbesar pada titik yang tersedia ialah 30 mV di x = 1.5 cm. Rentang keluaran penuh ialah 116 mV. Persentase ini memakai skala penuh, bukan nilai 88 mV pada titik tersebut.\n\nKata “maksimum” di sini berlaku untuk titik yang tersedia. Data tidak memberi jaminan tentang puncak residu di antara titik uji. Itu alasan pembahasan menyebut maksimum teramati, bukan batas pasti untuk semua posisi.\n\n$$\n\\%N_{\\max}=\\frac{30}{116}\\,100\\%=25.8621\\%\n$$"
        },
        {
          "id": "2025-uas-q2-step-9",
          "title": "9. Periksa batas model pengaruh catu",
          "content": "Pada 1 cm, keluaran berubah dari 64 menjadi 83 mV: selisih 19 mV. Model perubahan garis ujung hanya memprediksi $K_M\\Delta V_s x=53.3333(0.2)(1)=10.6667\\ \\mathrm{mV}$. Sisa selisih menunjukkan bentuk ketaklinieran juga berubah dengan catu.\n\nJadi KM dan KI di sini merangkum perubahan garis acuan. Keduanya tidak membuat model linear cocok tepat dengan setiap titik pada kedua catu."
        },
        {
          "id": "2025-uas-q2-step-10",
          "title": "10. Tafsirkan hasil dan akibat pilihan skala posisi",
          "content": "$K_I=0$ menyatakan titik nol tetap; $K_M>0$ menyatakan catu yang lebih besar menaikkan sensitivitas. Jika semua posisi tabel harus dibagi 10, $K$ dan $K_M$ menjadi 10 kali lebih besar. Persen ketaklinieran tetap sama karena residu tegangan dan span tegangan tidak berubah."
        }
      ],
      "finalAnswer": "Dengan tabel 0 sampai 3 cm, garis dua ujung memberi K = 38.667 mV/cm dan KI = 0. Nilai KM ≈ 53.333 mV/(cm·V). Ketaklinieran maksimum pada titik sampel ialah 25.86% skala penuh.\n\n$$\n\\boxed{\\begin{aligned}K&=38.667\\ \\mathrm{mV/cm},\\quad K_I=0\\ \\mathrm{mV/V}\\\\K_M&\\approx53.333\\ \\mathrm{mV/(cm\\,V)}\\\\N_{\\max}&=25.86\\%\\ \\mathrm{FS}\\end{aligned}}\n$$",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "2024-uts1-q2",
      "kind": "problem",
      "slug": "2024-uts1-q2",
      "title": "Garis ideal dan nonlinearitas termokopel",
      "source": "UTS 1 2024 · Soal 2",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
        "file": "2024-uts1.pdf",
        "pages": [
          1
        ],
        "original": "2. [20%] A thermocouple used between 0 and 500°C has the following input–output characteristics: Input T in °C: 0, 100, 200, 300, 500. Output E in μV: 0, 5268, 10777, 16325, 27388. (a) Find the equation of the ideal straight line. (b) Find the non-linearity at 100°C and 300°C in μV and as a percentage of f.s.d.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Garis ideal memakai metode titik ujung. Nonlinearitas bertanda didefinisikan sebagai data dikurangi garis; besar nonlinearitas adalah nilai mutlaknya."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2024,
        "number": 2
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "Termokopel bekerja pada 0 sampai 500°C dengan data $T=[0,100,200,300,500]$ °C dan $E=[0,5268,10777,16325,27388]$ μV. (a) Tentukan persamaan garis lurus ideal. (b) Hitung nonlinearitas pada 100°C dan 300°C dalam μV serta persen rentang keluaran penuh (f.s.d.).",
      "simulation": {
        "id": "2024-uts1-q2-visual",
        "type": "ipe-calibration",
        "title": "Kalibrasi",
        "caption": "Bandingkan tabel dengan satu garis melalui dua ujung rentang; selisih vertikal adalah nonlinearitas.",
        "params": [],
        "data": {
          "xs": [
            0,
            100,
            200,
            300,
            500
          ],
          "ys": [
            0,
            5268,
            10777,
            16325,
            27388
          ],
          "inputUnit": "°C",
          "outputUnit": "μV",
          "visualKind": "calibration"
        }
      },
      "steps": [
        {
          "id": "2024-uts1-q2-step-1",
          "title": "a · Tentukan garis pembanding yang dipakai",
          "content": "Tabel memberi keluaran nyata, sedangkan soal meminta garis ideal untuk membandingkannya. Kita memakai **metode titik ujung** (garis melalui data pada batas bawah dan atas rentang ukur).\n\nKedua titik itu adalah $(0^\\circ\\mathrm C,0\\ \\mu\\mathrm V)$ dan $(500^\\circ\\mathrm C,27388\\ \\mu\\mathrm V)$. Pilihan metode perlu dinyatakan karena regresi seluruh titik memberi garis lain.\n\n| T (°C) | E aktual (μV) |\n| --- | --- |\n| 0 | 0 |\n| 100 | 5268 |\n| 200 | 10777 |\n| 300 | 16325 |\n| 500 | 27388 |",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          }
        },
        {
          "id": "2024-uts1-q2-step-2",
          "title": "a · Hitung kemiringan dari perubahan keluaran",
          "content": "Kemiringan $K$ menyatakan berapa μV keluaran ideal naik untuk kenaikan satu derajat. Bagi perubahan tegangan 27388 μV dengan perubahan suhu 500°C.\n\nKeluaran pada suhu nol adalah nol, sehingga offset $a=0$. Bentuk garis $E_{\\mathrm{lin}}=KT+a$ lalu menjadi hasil berikut.\n\n$$\nK=\\frac{27388-0}{500-0}=54.776\\ \\mu\\mathrm V/{}^\\circ\\mathrm C,\\qquad E_{\\mathrm{lin}}(T)=54.776T\\quad[\\mu\\mathrm V]\n$$"
        },
        {
          "id": "2024-uts1-q2-step-3",
          "title": "b · Definisikan penyimpangan dan penyebut persen",
          "content": "Gunakan $N(T)=E_{\\mathrm{data}}(T)-E_{\\mathrm{lin}}(T)$. Nilai negatif berarti data berada di bawah garis; besar nonlinearitas memakai $|N|$.\n\nF.s.d. adalah rentang keluaran dari ujung bawah sampai ujung atas, yaitu 27388 μV. Kedua suhu harus dibagi dengan rentang yang sama agar persentasenya sebanding.\n\n$$\nN_{\\%}(T)=\\frac{N(T)}{27388}(100\\%)\n$$"
        },
        {
          "id": "2024-uts1-q2-step-4",
          "title": "b · Bandingkan data dan garis pada 100°C",
          "content": "Garis ideal pada 100°C memberi $54{,}776(100)=5477{,}6$ μV. Tabel memberi 5268 μV. Kurangi nilai garis dari nilai tabel.\n\nPenyimpangannya −209,6 μV. Ketika soal meminta besar nonlinearitas, kita dapat melaporkan 209,6 μV dan menjelaskan posisinya di bawah garis.\n\n$$\nN(100)=5268-5477.6=-209.6\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q2-step-5",
          "title": "b · Ubah penyimpangan 100°C menjadi persen f.s.d.",
          "content": "Bagi −209,6 μV dengan 27388 μV. Satuan tegangan saling menghapus, lalu perkalian 100% mengubah rasio menjadi persen.\n\nPenyebutnya bukan 5268 μV. Membagi dengan pembacaan lokal akan menyatakan persen terhadap pembacaan, bukan terhadap skala penuh.\n\n$$\nN_{\\%}(100)=\\frac{-209.6}{27388}(100\\%)=-0.76530\\%\n$$"
        },
        {
          "id": "2024-uts1-q2-step-6",
          "title": "b · Lakukan perbandingan yang sama pada 300°C",
          "content": "Garis memberi $54{,}776(300)=16432{,}8$ μV dan tabel memberi 16325 μV. Selisihnya −107,8 μV, jadi titik ini juga berada di bawah garis.\n\nGunakan rentang 27388 μV yang sama untuk memperoleh −0,39360% f.s.d. Besar nonlinearitas di 300°C lebih kecil daripada di 100°C, meskipun tegangannya lebih tinggi.\n\n$$\nN(300)=16325-16432.8=-107.8\\ \\mu\\mathrm V,\\qquad N_{\\%}(300)=\\frac{-107.8}{27388}(100\\%)=-0.39360\\%\n$$"
        },
        {
          "id": "2024-uts1-q2-step-7",
          "title": "Periksa hasil terhadap metode titik ujung",
          "content": "Pada 0 dan 500°C, penyimpangan harus nol karena garis memang melalui kedua titik itu. Pada titik di antaranya, tanda dan besar selisih menunjukkan kelengkungan karakteristik nyata.\n\nJawaban bagian (b) mencakup nilai bertanda dan besarnya. Kita tidak menyebut dua titik yang ditanya sebagai maksimum seluruh rentang tanpa memeriksa semua titik dan perilaku di antaranya."
        }
      ],
      "finalAnswer": "Garis idealnya $E=54{,}776T$ dalam μV. Pada 100°C, nonlinearitas bertanda −209,6 μV (−0,76530% f.s.d.). Pada 300°C, nilainya −107,8 μV (−0,39360% f.s.d.). Besarnya masing-masing 0,76530% dan 0,39360%.\n\n$$\n\\boxed{\\begin{aligned}E_{\\mathrm{lin}}&=54.776T\\quad[\\mu\\mathrm V]\\\\N(100)&=-209.6\\ \\mu\\mathrm V=-0.76530\\%\\ \\mathrm{f.s.d.}\\\\N(300)&=-107.8\\ \\mu\\mathrm V=-0.39360\\%\\ \\mathrm{f.s.d.}\\end{aligned}}\n$$",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "2024-uts1-q5",
      "kind": "problem",
      "slug": "2024-uts1-q5",
      "title": "Gangguan suhu dan catu pada pengukur tekanan",
      "source": "UTS 1 2024 · Soal 5",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
        "file": "2024-uts1.pdf",
        "pages": [
          2
        ],
        "original": "5. [20%] Under standard condition, a pressure gauge operates according to \\(i=4p+0.04\\), where i is electrical current in mA and p is measured pressure in barg. When the gauge operates at ambient temperature 5°C higher than the standard condition, and the battery is normal, the equation becomes \\(i=4p+0.06\\). When the temperature is standardized, but the battery is 0.2 volts lower than the standard, the equation becomes \\(i=4.1p+0.04\\). If the gauge is modelled as \\(i=(K+K_MI_M)p+(a+K_II_I)\\), (a) calculate K, \\(K_M\\), a and \\(K_I\\); (b) what are the units of each?",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "I_M dan I_I adalah perubahan dari kondisi standar. Suhu dan tegangan standar absolut tidak diberikan. Titik 0 dan 1 bar pada visual adalah titik contoh dari persamaan, bukan data uji baru."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2024,
        "number": 5
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "Pada kondisi standar, pengukur tekanan mengikuti $i=4p+0{,}04$, dengan i dalam mA dan p dalam bar gauge. Saat suhu lingkungan 5°C lebih tinggi dan catu normal, persamaan menjadi $i=4p+0{,}06$. Saat suhu normal dan catu 0,2 V lebih rendah, persamaan menjadi $i=4{,}1p+0{,}04$. Untuk model $i=(K+K_MI_M)p+(a+K_II_I)$, (a) cari K, $K_M$, a, dan $K_I$; (b) nyatakan satuannya.",
      "simulation": {
        "id": "2024-uts1-q5-visual",
        "type": "ipe-calibration",
        "title": "Kalibrasi",
        "caption": "Dua tekanan contoh pada garis sumber memperlihatkan pergeseran offset saat suhu naik dan perubahan kemiringan saat catu turun.",
        "params": [],
        "data": {
          "xs": [
            0,
            1
          ],
          "ys": [
            0.04,
            4.04
          ],
          "yAmbient": [
            0.06,
            4.06
          ],
          "ySupply": [
            0.04,
            4.14
          ],
          "inputUnit": "bar",
          "outputUnit": "mA",
          "supplyChange": -0.2,
          "temperatureChange": 5,
          "visualKind": "calibration"
        }
      },
      "steps": [
        {
          "id": "2024-uts1-q5-step-1",
          "title": "a · Pisahkan kemiringan dan titik nol",
          "content": "Pada garis $i=4p+0{,}04$, angka 4 mengalikan tekanan. Angka tersebut menjadi **sensitivitas** (perubahan keluaran per perubahan tekanan). Angka 0,04 tetap ada saat $p=0$, sehingga menjadi **offset** (keluaran pada masukan nol).\n\nModel soal memberi dua tempat masuk gangguan: $K_MI_M$ mengubah kemiringan, sedangkan $K_II_I$ mengubah offset. Kita cocokkan perubahan pada dua persamaan uji dengan peran tersebut.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          }
        },
        {
          "id": "2024-uts1-q5-step-2",
          "title": "a · Definisikan gangguan sebagai perubahan dari standar",
          "content": "Tetapkan $I_M=V_s-V_{s,0}$, perubahan catu dari catu standar. Tetapkan $I_I=T_a-T_{a,0}$, perubahan suhu dari suhu standar. Nilai standar absolutnya tidak perlu diketahui untuk menghitung perubahan.\n\nPada uji suhu, $I_I=+5^\\circ\\mathrm C$ dan $I_M=0$. Pada uji baterai, $I_M=-0{,}2$ V dan $I_I=0$. Tanda minus pada perubahan catu harus dipertahankan.\n\n$$\nI_M=V_s-V_{s,0},\\qquad I_I=T_a-T_{a,0}\n$$"
        },
        {
          "id": "2024-uts1-q5-step-3",
          "title": "a · Ambil K dan a dari kondisi standar",
          "content": "Saat kedua gangguan nol, model menyusut menjadi $i=Kp+a$. Cocokkan suku yang mengalikan $p$ dan suku konstanta dengan $i=4p+0{,}04$.\n\nTekanan memakai bar dan keluaran memakai mA, sehingga K mempunyai satuan mA/bar. Offset a langsung memakai satuan keluaran, yaitu mA.\n\n$$\nK=4\\ \\mathrm{mA/bar},\\qquad a=0.04\\ \\mathrm{mA}\n$$"
        },
        {
          "id": "2024-uts1-q5-step-4",
          "title": "a · Gunakan perubahan offset untuk mencari KI",
          "content": "Pada uji suhu, kemiringan tetap 4. Hanya offset yang naik dari 0,04 ke 0,06 mA. Maka tambahan 0,02 mA berasal dari $K_I(5)$.\n\nKurangi offset standar dari kedua ruas, lalu bagi dengan kenaikan suhu 5°C. Tanda positif berarti suhu lingkungan yang lebih tinggi menaikkan keluaran nol.\n\n$$\n0.06=0.04+5K_I\\quad\\Longrightarrow\\quad K_I=\\frac{0.06-0.04}{5}=0.004\\ \\mathrm{mA}/{}^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uts1-q5-step-5",
          "title": "a · Gunakan perubahan kemiringan untuk mencari KM",
          "content": "Pada uji baterai, offset tetap 0,04 mA tetapi kemiringan naik dari 4 menjadi 4,1 mA/bar. Suku $K_MI_M$ harus memberi kenaikan 0,1 mA/bar.\n\nPerubahan catu adalah −0,2 V. Membagi kenaikan kemiringan dengan bilangan negatif memberi $K_M<0$: penurunan catu justru menaikkan sensitivitas pada model ini.\n\n$$\n4.1=4+K_M(-0.2)\\quad\\Longrightarrow\\quad K_M=\\frac{4.1-4}{-0.2}=-0.5\\ \\frac{\\mathrm{mA}}{\\mathrm{bar\\,V}}\n$$"
        },
        {
          "id": "2024-uts1-q5-step-6",
          "title": "b · Periksa satuan tiap suku",
          "content": "Semua suku yang dijumlahkan menjadi i harus mempunyai satuan mA. Suku $K_MI_M$ harus bersatuan mA/bar sebelum dikalikan tekanan. Suku $K_II_I$ langsung bersatuan mA.\n\n| Konstanta | Nilai | Satuan |\n| --- | --- | --- |\n| K | 4 | mA/bar |\n| K_M | −0.5 | mA/(bar·V) |\n| a | 0.04 | mA |\n| K_I | 0.004 | mA/°C |"
        },
        {
          "id": "2024-uts1-q5-step-7",
          "title": "Masukkan kembali kedua uji untuk memeriksa tanda",
          "content": "Untuk suhu+5°C, tambahan offset adalah $0{,}004(5)=0{,}02$ mA, sehingga offset menjadi 0,06 mA. Untuk catu−0,2 V, tambahan kemiringan adalah $(-0{,}5)(-0{,}2)=+0{,}1$ mA/bar.\n\nKedua persamaan uji kembali tepat. Cek ini menunjukkan mengapa mengganti−0,2 V dengan besarnya 0,2 V akan memberi tanda $K_M$ yang salah.\n\n$$\ni=\\bigl[4-0.5(V_s-V_{s,0})\\bigr]p+0.04+0.004(T_a-T_{a,0})\\quad[\\mathrm{mA}]\n$$"
        }
      ],
      "finalAnswer": "K=4 mA/bar, a=0,04 mA, K_M=−0,5 mA/(bar·V), dan K_I=0,004 mA/°C. Perubahan catu memodifikasi sensitivitas; perubahan suhu menggeser offset.\n\n$$\n\\boxed{\\begin{aligned}K&=4\\ \\mathrm{mA/bar},&a&=0.04\\ \\mathrm{mA}\\\\K_M&=-0.5\\ \\mathrm{mA/(bar\\,V)},&K_I&=0.004\\ \\mathrm{mA}/{}^\\circ\\mathrm C\\end{aligned}}\n$$",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "2024-uts2-q4",
      "kind": "problem",
      "slug": "2024-uts2-q4",
      "title": "Nonlinearitas dan model termokopel",
      "source": "UTS 2 2024 · Soal 4",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3/view",
        "file": "2024-uts2.pdf",
        "pages": [
          2,
          3
        ],
        "original": "4. Thermocouple: Temperature Measurement & Measurement Characteristics\nAn iron v. constantan thermocouple (Type J) is used to measure temperatures in the ranges of 0°C to 300°C. The e.m.f. values for the thermocouple are provided in the following table.\nType: Iron v. constantan, Type J. Temperature range: −20 to +700°C. E.m.f. values (μV): \\(E_{0,0}=0\\), \\(E_{100,0}=5269\\), \\(E_{200,0}=10779\\), \\(E_{300,0}=16327\\).\n(a) [10%] Calculate the non-linearity at 100°C and 200°C as a percentage of the full scale.\n(b) [5%] For the temperature range between 100°C and 300°C, the thermocouple e.m.f. is expressed as \\(E_{T,0}=a_1T+a_2T^2\\). Calculate \\(a_1\\) and \\(a_2\\).\n(c) [10%] If the measured e.m.f. is 12500 μV relative to a reference junction at 20°C, and the reference junction circuit voltage is 1000 μV, use the results from question (b) to estimate the temperature of the measured junction.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
          "pages": [
            4,
            5,
            6
          ]
        }
      },
      "assumptions": [
        "Nonlinearitas memakai garis ujung 0 sampai 300°C. Model kuadrat memakai titik 100 dan 300°C; soal tidak menetapkan metode pencocokan."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2024,
        "number": 4
      },
      "difficulty": "menengah",
      "estimatedMinutes": 22,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "Termokopel besi dan konstantan tipe J mengukur 0 sampai 300°C. Tabel memberi tegangan terhadap 0°C. Nilainya: pada 0°C = 0 μV; 100°C = 5269 μV; 200°C = 10779 μV; 300°C = 16327 μV. Rentang tipe pada tabel adalah −20 hingga 700°C. (a) Hitung nonlinearitas pada 100 dan 200°C sebagai persen skala penuh. (b) Untuk rentang 100 sampai 300°C, tentukan $a_1,a_2$ dalam $E_{T,0}=a_1T+a_2T^2$. (c) Tegangan ukur 12500 μV mengacu ke sambungan 20°C. Rangkaian sambungan referensi memberi 1000 μV. Gunakan model bagian (b) untuk mencari suhu sambungan ukur.",
      "simulation": {
        "id": "2024-uts2-q4-visual",
        "type": "ipe-calibration",
        "title": "Kalibrasi",
        "caption": "Bandingkan data termokopel dengan garis ujung dan model kuadrat.",
        "params": [],
        "data": {
          "slope": 54.423333,
          "intercept": 0,
          "xUnit": "°C",
          "yUnit": "μV",
          "mode": "thermocouple",
          "a1": 51.823333,
          "a2": 0.008666667,
          "xs": [
            0,
            100,
            200,
            300
          ],
          "ys": [
            0,
            5269,
            10779,
            16327
          ],
          "visualKind": "calibration"
        }
      },
      "steps": [
        {
          "id": "2024-uts2-q4-step-1",
          "title": "a · Tetapkan acuan nonlinearitas",
          "content": "**Nonlinearitas** (penyimpangan kurva nyata dari garis acuan) menyatakan seberapa jauh sensor mengikuti hubungan lurus. Soal memberi rentang 0 sampai 300°C. Kita pakai garis yang menghubungkan ujung rentang: $(0,0)$ dan $(300,16327)$, dengan keluaran dalam μV.\n\nKemiringan adalah perubahan keluaran dibagi perubahan suhu. Titik awalnya nol, jadi garis ini tidak memerlukan konstanta offset. Rentang keluaran skala penuh adalah 16327 μV.\n\n$$\nE_{\\mathrm{lin}}(T)=\\frac{16327-0}{300-0}T=54.423333T\\quad[\\mu\\mathrm V]\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          }
        },
        {
          "id": "2024-uts2-q4-step-2",
          "title": "a · Hitung penyimpangan pada 100°C",
          "content": "Angka 5269 μV berasal dari tabel aktual. Nilai pembandingnya berasal dari garis, yaitu $54{,}423333(100)=5442{,}333$ μV. Selisih aktual dikurangi garis bernilai negatif.\n\nUntuk persen skala penuh, bagi selisih itu dengan 16327 μV, lalu kalikan 100%. Jangan membaginya dengan keluaran pada 100°C, karena itu menghasilkan ukuran persentase yang berbeda.\n\n$$\n\\delta E_{100}=5269-5442.333=-173.333\\ \\mu\\mathrm V,\\qquad N_{100}=\\frac{-173.333}{16327}(100\\%)=-1.0616\\%\n$$"
        },
        {
          "id": "2024-uts2-q4-step-3",
          "title": "a · Terapkan acuan yang sama pada 200°C",
          "content": "Pada 200°C, garis acuan memberi 10884,667 μV. Tabel memberi 10779 μV. Jangan membuat garis acuan baru untuk tiap titik; kedua nonlinearitas harus merujuk garis yang sama.\n\nBesarnya nonlinearitas adalah 1,062% pada 100°C dan 0,647% pada 200°C. Tanda minus pada hasil bertanda menjelaskan bahwa data berada di bawah garis.\n\n$$\n\\delta E_{200}=10779-10884.667=-105.667\\ \\mu\\mathrm V,\\qquad N_{200}=\\frac{-105.667}{16327}(100\\%)=-0.6472\\%\n$$"
        },
        {
          "id": "2024-uts2-q4-step-4",
          "title": "b · Bangun dua persamaan untuk dua konstanta",
          "content": "Bagian (b) meminta model $E=a_1T+a_2T^2$ pada rentang 100 sampai 300°C. Ada dua konstanta yang belum diketahui. Kita memilih kedua titik ujung rentang tersebut untuk menentukan keduanya.\n\nMasukkan $T=100$ dengan $E=5269$, lalu $T=300$ dengan $E=16327$. Kuadrat suhu memberi 10000 dan 90000; angka itu berasal dari suku $T^2$.\n\n$$\n\\begin{aligned}100a_1+10000a_2&=5269\\\\300a_1+90000a_2&=16327\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q4-step-5",
          "title": "b · Hilangkan a₁ untuk mencari a₂",
          "content": "Bagi seluruh persamaan pertama dengan 100 dan kedua dengan 300. Kedua koefisien $a_1$ lalu menjadi satu. Kurangi persamaan pertama hasil pembagian dari persamaan kedua.\n\nSuku $a_1$ saling menghapus. Selisih 300 dan 100 menjadi koefisien 200 pada $a_2$. Bagi kedua ruas dengan 200 untuk memperoleh $a_2$.\n\n$$\n\\begin{aligned}a_1+100a_2&=52.69\\\\a_1+300a_2&=54.423333\\\\200a_2&=1.733333\\\\a_2&=0.008666667\\ \\frac{\\mu\\mathrm V}{({}^\\circ\\mathrm C)^2}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q4-step-6",
          "title": "b · Cari a₁ dan periksa satuan model",
          "content": "Gunakan kembali $a_1+100a_2=52{,}69$. Kurangi $100a_2$ dari kedua ruas. Kita memperoleh 51,823333 untuk $a_1$.\n\nSuku $a_1T$ dan $a_2T^2$ sama-sama harus berupa tegangan. Jadi satuan $a_1$ adalah μV/°C dan satuan $a_2$ adalah μV/(°C)². T pada model ini memakai angka suhu dalam °C.\n\n$$\na_1=52.69-100(0.008666667)=51.823333\\ \\frac{\\mu\\mathrm V}{{}^\\circ\\mathrm C}\n$$"
        },
        {
          "id": "2024-uts2-q4-step-7",
          "title": "Periksa arti pendekatan dua titik",
          "content": "Model pasti melalui 100 dan 300°C karena kedua titik itu dipakai untuk mencarinya. Kita dapat menguji titik 200°C yang tidak ikut menentukan konstanta.\n\nModel memberi 10711,333 μV, sementara tabel memberi 10779 μV. Selisih 67,667 μV menunjukkan bahwa model ini mendekati data, bukan melalui seluruh tabel. Metode kuadrat terkecil dengan semua titik akan memberi konstanta lain.\n\n$$\nE_{\\mathrm{model}}(200)=51.823333(200)+0.008666667(200)^2=10711.333\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts2-q4-step-8",
          "title": "c · Samakan referensi tegangan sebelum mencari suhu",
          "content": "Model bagian (b) memakai referensi 0°C. Namun, tegangan terukur 12500 μV memakai referensi 20°C. Untuk menyamakan acuan, tambahkan tegangan rangkaian referensi 1000 μV yang disebut pada bagian (c).\n\nKita memakai angka 1000 μV yang diberikan, tanpa menggantinya dengan 1019 μV dari tabel lain. Tegangan target model menjadi 13500 μV.\n\n$$\nE(T,0)=E(T,20)+E(20,0)=12500+1000=13500\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts2-q4-step-9",
          "title": "c · Susun persamaan kuadrat dalam suhu",
          "content": "Masukkan tegangan target ke $E=a_1T+a_2T^2$. Kurangi 13500 dari kedua ruas agar satu ruas menjadi nol. Dengan begitu, kita bisa memakai rumus akar persamaan kuadrat.\n\nPada bentuk $AT^2+BT+C=0$, koefisiennya adalah $A=a_2$, $B=a_1$, dan $C=-13500$. Huruf A di sini hanya koefisien aljabar, bukan luas.\n\n$$\n0.008666667T^2+51.823333T-13500=0\n$$"
        },
        {
          "id": "2024-uts2-q4-step-10",
          "title": "c · Pilih akar yang berada dalam rentang model",
          "content": "Rumus kuadrat menghasilkan dua akar. Gunakan tanda plus dan minus untuk memeriksa keduanya, lalu cocokkan dengan rentang 100 sampai 300°C yang mendasari model.\n\nAkar positif sekitar 250,04°C berada dalam rentang tersebut. Akar sekitar −6229,66°C berada jauh di luar domain dan tidak mewakili pengukuran ini.\n\n$$\nT=\\frac{-51.823333\\pm\\sqrt{(51.823333)^2+4(0.008666667)(13500)}}{2(0.008666667)}\\quad\\Rightarrow\\quad T\\approx250.04^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uts2-q4-step-11",
          "title": "Periksa urutan suhu dan tegangan",
          "content": "Tegangan 13500 μV berada di antara keluaran model pada 200 dan 300°C. Suhu sekitar 250°C sesuai dengan urutan itu. Jika kita masukkan kembali suhu hasil, model memberi sekitar 13500 μV.\n\nKetelitian angka akhir tetap dibatasi oleh model pendekatan dan data soal. Menulis banyak angka desimal tidak menghapus selisih model terhadap tabel."
        }
      ],
      "finalAnswer": "Besar nonlinearitasnya 1,062% pada 100°C dan 0,647% pada 200°C. Model dua titik memberi suhu sekitar 250,04°C setelah kompensasi referensi.\n\n$$\n\\boxed{\\begin{aligned}|N_{100}|&=1.062\\%,\\quad|N_{200}|=0.647\\%\\\\a_1&=51.82333\\ \\mu\\mathrm V/{}^\\circ\\mathrm C\\\\a_2&=0.008666667\\ \\mu\\mathrm V/{}^\\circ\\mathrm C^2\\\\T&\\approx250.04^\\circ\\mathrm C\\end{aligned}}\n$$",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "2024-uas-q1",
      "kind": "problem",
      "slug": "2024-uas-q1",
      "title": "Kalibrasi sensor tekanan",
      "source": "UAS 2024 · Soal 1",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
        "file": "2024-uas.pdf",
        "pages": [
          1
        ],
        "original": "1. [20%] Systematic Characteristics of Measurement Systems\nThe following table presents the test results of a pressure transducer in a laboratory under the following conditions:\n(i) Ambient temperature 25°C, supply voltage 9 V (standard).\n(ii) Ambient temperature 25°C, supply voltage 12 V.\n(iii) Ambient temperature 30°C, supply voltage 9 V.\nInput (barg): 0, 4, 8, 12, 16.\nOutput (mA), condition (i): 4, 11.0, 16.0, 22.8, 29.6.\nOutput (mA), condition (ii): 4, 13.2, 21.3, 31.1, 39.2.\nOutput (mA), condition (iii): 6, 12.5, 18.1, 25.5, 31.6.\n(a) [10%] Determine the values of \\(K_M,K_I,a,K\\) associated with the model equation \\(O=(K+K_MI_M)I+a+K_II_I\\). Complete your answer with the units.\n(b) [10%] Calculate the maximum non-linearity as a percentage of the full-scale deflection (f.s.d.).",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        "Soal tidak menetapkan regresi kuadrat terkecil. Kita memakai garis ujung, dan menyatakan gangguan sebagai selisih terhadap kondisi standar."
      ],
      "exam": {
        "term": "UAS",
        "year": 2024,
        "number": 1
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "Sensor tekanan menjalani uji pada tiga kondisi. Kondisi (i) memakai suhu sekitar 25°C dan catu 9 V sebagai standar. Kondisi (ii) memakai 25°C dan 12 V. Kondisi (iii) memakai 30°C dan 9 V.\n\nMasukan tiap kondisi adalah 0, 4, 8, 12, 16 barg. Keluaran (mA) kondisi (i): 4; 11,0; 16,0; 22,8; 29,6. Keluaran kondisi (ii): 4; 13,2; 21,3; 31,1; 39,2. Keluaran kondisi (iii): 6; 12,5; 18,1; 25,5; 31,6.\n\n\n(a) Tentukan $K_M,K_I,a,K$ beserta satuannya pada model $O=(K+K_MI_M)I+a+K_II_I$. (b) Tentukan nonlinearitas maksimum sebagai persen rentang keluaran penuh.",
      "simulation": {
        "id": "2024-uas-q1-visual",
        "type": "ipe-calibration",
        "title": "Kalibrasi",
        "caption": "Garis ideal memakai kedua titik ujung; jarak vertikal menunjukkan nonlinearitas.",
        "params": [],
        "data": {
          "slope": 1.6,
          "intercept": 4,
          "xUnit": "bar",
          "yUnit": "mA",
          "ySupply": [
            4,
            13.2,
            21.3,
            31.1,
            39.2
          ],
          "yAmbient": [
            6,
            12.5,
            18.1,
            25.5,
            31.6
          ],
          "xs": [
            0,
            4,
            8,
            12,
            16
          ],
          "ys": [
            4,
            11,
            16,
            22.8,
            29.6
          ],
          "visualKind": "calibration"
        }
      },
      "steps": [
        {
          "id": "2024-uas-q1-step-1",
          "title": "a · Baca fungsi tiap suku pada model",
          "content": "Keluaran $O$ berupa arus dalam mA dan masukan $I$ berupa tekanan dalam bar gauge. Pada $O=(K+K_MI_M)I+a+K_II_I$, kurung pertama mengatur kemiringan hubungan arus dan tekanan.\n\n$a$ adalah keluaran pada masukan nol dalam kondisi standar. Suku $K_II_I$ menggeser keluaran tanpa dikalikan tekanan. Kita akan membedakan perubahan kemiringan dari perubahan titik nol.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          },
          "checkpoint": {
            "prompt": "Saat suhu lingkungan berubah, seluruh kurva kalibrasi arus dan tekanan bergeser ke atas dengan jumlah arus yang sama. Kemiringan kurva tetap. Dalam model gangguan, perubahan mana yang paling sesuai?",
            "options": [
              {
                "id": "2024-uas-q1-checkpoint-option-1",
                "label": "Sensitivitas terhadap tekanan meningkat, sedangkan keluaran nol tetap.",
                "feedback": "Jika sensitivitas berubah, jarak dua kurva bergantung pada tekanan. Itu bertentangan dengan pergeseran yang sama pada semua titik.",
                "misconceptionTag": "concept-2024-06-choice-1"
              },
              {
                "id": "2024-uas-q1-checkpoint-option-2",
                "label": "Offset keluaran berubah, sedangkan sensitivitas terhadap tekanan tetap.",
                "feedback": "Benar. Kurva bergeser tanpa berubah kemiringan, sehingga perubahan masuk sebagai gangguan titik nol."
              },
              {
                "id": "2024-uas-q1-checkpoint-option-3",
                "label": "Resolusi alat meningkat, sehingga kurva tampak lebih tinggi.",
                "feedback": "Resolusi adalah perubahan terkecil yang dapat dibedakan. Pergeseran kurva kalibrasi tidak membuktikan perubahan resolusi.",
                "misconceptionTag": "concept-2024-06-choice-3"
              },
              {
                "id": "2024-uas-q1-checkpoint-option-4",
                "label": "Hanya nonlinearitas bertambah, karena setiap perubahan lingkungan pasti melengkungkan kurva.",
                "feedback": "Pergeseran seluruh kurva tidak dengan sendirinya mengubah lengkungannya. Nonlinearitas memerlukan perbandingan bentuk terhadap garis acuan.",
                "misconceptionTag": "concept-2024-06-choice-4"
              }
            ],
            "correctOptionId": "2024-uas-q1-checkpoint-option-2"
          }
        },
        {
          "id": "2024-uas-q1-step-2",
          "title": "a · Pilih kondisi standar sebagai titik acuan",
          "content": "Tabel kondisi (i), yaitu catu 9 V dan suhu 25°C, menjadi acuan. Definisikan $I_M$ sebagai perubahan catu dan $I_I$ sebagai perubahan suhu dari acuan ini.\n\nKedua perubahan bernilai nol pada kondisi standar. Dengan definisi ini, $K$ dan $a$ langsung menggambarkan garis standar. Kita memakai tabel cetak, bukan catatan tangan di lembar.\n\n$$\nI_M=V_s-9\\ \\mathrm V,\\qquad I_I=T_a-25^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uas-q1-step-3",
          "title": "a · Tentukan kemiringan K dari dua ujung",
          "content": "Pada kondisi standar, masukan naik dari 0 ke 16 bar dan keluaran naik dari 4 ke 29,6 mA. Kemiringan menghitung kenaikan keluaran per kenaikan masukan.\n\nKurangi keluaran awal sebelum membagi. Menggunakan $29{,}6/16$ akan memasukkan arus titik nol ke dalam kemiringan.\n\n$$\nK=\\frac{29.6-4}{16-0}=\\frac{25.6}{16}=1.6\\ \\mathrm{mA/bar}\n$$"
        },
        {
          "id": "2024-uas-q1-step-4",
          "title": "a · Cari offset a dan tulis garis standar",
          "content": "Di tekanan nol, suku $KI$ menjadi nol. Arus yang tersisa adalah 4 mA, sehingga $a=4$ mA. Offset ini memang ada pada sensor; ia tidak otomatis merupakan galat.\n\nGaris standar kini dapat memprediksi keluaran ideal pada setiap tekanan. Kita akan memakai garis yang sama saat menghitung nonlinearitas.\n\n$$\na=4\\ \\mathrm{mA},\\qquad O_{\\mathrm{lin}}=1.6I+4\\quad[\\mathrm{mA}]\n$$"
        },
        {
          "id": "2024-uas-q1-step-5",
          "title": "a · Cari perubahan sensitivitas akibat catu",
          "content": "Bandingkan kondisi (ii) dengan (i): suhu sama, hanya catu naik 3 V. Pada 12 V, keluaran nol tetap 4 mA, tetapi keluaran ujung menjadi 39,2 mA. Jadi perubahan utama terjadi pada kemiringan.\n\nKemiringan baru 2,2 mA/bar lebih besar 0,6 mA/bar. Bagi perubahan kemiringan dengan perubahan catu untuk memperoleh $K_M$.\n\n$$\nK_{12}=\\frac{39.2-4}{16}=2.2\\ \\mathrm{mA/bar},\\qquad K_M=\\frac{2.2-1.6}{12-9}=0.2\\ \\frac{\\mathrm{mA}}{\\mathrm{bar\\,V}}\n$$"
        },
        {
          "id": "2024-uas-q1-step-6",
          "title": "a · Cari pergeseran titik nol akibat suhu",
          "content": "Bandingkan kondisi (iii) dengan (i): catu sama, suhu naik 5°C. Di masukan nol, keluaran naik dari 4 ke 6 mA. Ini memberi perubahan offset 2 mA.\n\nPada ujung atas, perubahan 29,6 ke 31,6 mA juga 2 mA. Kemiringan ujung tetap 1,6 mA/bar. Bagi pergeseran 2 mA dengan 5°C untuk mencari $K_I$.\n\n$$\nK_I=\\frac{6-4}{30-25}=0.4\\ \\mathrm{mA}/{}^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uas-q1-step-7",
          "title": "b · Bandingkan setiap data dengan garis standar",
          "content": "Nonlinearitas memakai data pada kondisi standar. Untuk tiap tekanan, hitung garis $1{,}6I+4$, lalu kurangi hasil garis dari data. Misalnya pada 8 bar, garis memberi $1{,}6(8)+4=16{,}8$ mA.\n\nData di titik itu adalah 16,0 mA, sehingga selisihnya −0,8 mA. Tabel berikut memperlihatkan seluruh titik, agar kita tidak hanya memilih titik yang tampak paling jauh.\n\n$$\n\\delta O=O_{\\mathrm{data}}-O_{\\mathrm{lin}}\n$$\n\n| I (bar) | Data (mA) | Garis (mA) | Selisih (mA) |\n| --- | --- | --- | --- |\n| 0 | 4 | 4 | 0 |\n| 4 | 11.0 | 10.4 | 0.6 |\n| 8 | 16.0 | 16.8 | −0.8 |\n| 12 | 22.8 | 23.2 | −0.4 |\n| 16 | 29.6 | 29.6 | 0 |"
        },
        {
          "id": "2024-uas-q1-step-8",
          "title": "b · Ubah penyimpangan terbesar menjadi persen",
          "content": "Simpangan terbesar dalam nilai mutlak adalah 0,8 mA. F.s.d. adalah rentang keluaran dari masukan nol ke masukan penuh: $29{,}6-4=25{,}6$ mA.\n\nBagi kedua besaran dengan satuan sama, lalu kalikan 100%. Offset 4 mA tidak ikut menjadi bagian rentang, sehingga penyebutnya bukan 29,6 mA.\n\n$$\nN_{\\max}=\\frac{\\max|\\delta O|}{O_{\\max}-O_{\\min}}(100\\%)=\\frac{0.8}{25.6}(100\\%)=3.125\\%\n$$"
        },
        {
          "id": "2024-uas-q1-step-9",
          "title": "Periksa apa yang dirangkum model",
          "content": "Keempat konstanta merangkum garis ujung. Nilai $K$ mengubah bar menjadi mA, sedangkan $a$ memberi arus awal. Nilai $K_M$ mengubah kemiringan per volt, sedangkan $K_I$ mengubah titik nol per derajat.\n\nTitik tengah tidak semuanya tepat pada garis. Model lingkungan tersebut belum menghapus nonlinearitas tabel. Nilai 3,125% menyatakan simpangan terbesar di titik uji yang tersedia."
        }
      ],
      "finalAnswer": "K = 1,6 mA/bar, a = 4 mA, KM = 0,2 mA/(bar·V), KI = 0,4 mA/°C. Nonlinearitas maksimum pada kondisi standar adalah 3,125% f.s.d.\n\n$$\n\\boxed{\\begin{aligned}K&=1.6\\ \\mathrm{mA/bar},&a&=4\\ \\mathrm{mA}\\\\K_M&=0.2\\ \\mathrm{mA/(bar\\,V)},&K_I&=0.4\\ \\mathrm{mA/{}^\\circ C}\\\\N_{max}&=3.125\\%\\ \\mathrm{f.s.d.}\\end{aligned}}\n$$",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "2023-uts1-q2",
      "kind": "problem",
      "slug": "2023-uts1-q2",
      "title": "Kalibrasi gaya pada suhu dan catu berbeda",
      "source": "UTS 1 2023 · Soal 2",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
        "file": "2023-uts1.pdf",
        "pages": [
          1
        ],
        "original": "2. [40%] Systematic Characteristic of Measurement Systems\nA calibration process is conducted to find the systematic characteristic of a strain-gauge-based force measurement system under three different conditions. Condition I is considered as a standard, where the ambient temperature is kept constant at \\(T=20^\\circ\\mathrm C\\) and the power supply is set at \\(V_s=10\\) volts. Under Condition II, the temperature is set at \\(T=25^\\circ\\mathrm C\\) and the power supply is set at \\(V_s=10\\) volts. Under Condition III, the temperature is set at \\(T=20^\\circ\\mathrm C\\) and the power supply is set at \\(V_s=12\\) volts. The results are summarized in the following table.\nInput in kgf: 0, 10, 20, 30, 40, 50.\nCondition I, output in volts: 0.00, 0.11, 0.23, 0.34, 0.42, 0.50.\nCondition II, output in volts: 0.02, 0.11, 0.25, 0.36, 0.44, 0.52.\nCondition III, output in volts: 0.00, 0.13, 0.27, 0.40, 0.50, 0.60.\na. [10%] If the model of ideal system is \\(O=KI+a\\), where O denotes output in volts and I denotes input in kgf, find K and a.\nb. [10%] Find interfering constant \\(K_I\\) and interfering input \\(I_I\\).\nc. [10%] Find modifying constant \\(K_M\\) and modifying input \\(I_M\\).\nd. [10%] Find maximum nonlinearity of the system in percentage of F.S.D. (Full Scale Displacement).",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Garis ideal menggunakan titik ujung karena soal tidak menetapkan metode regresi. Masukan lingkungan dinyatakan sebagai perubahan dari 20°C dan 10 V.",
        "Angka 0.11 V pada kondisi II, masukan 10 kgf, mengikuti tabel cetak. Model garis tidak dipaksa melewati semua data."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2023,
        "number": 2
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "Sensor gaya berbasis strain gauge diuji pada tiga kondisi: I (standar), $T=20^\\circ\\mathrm C,\\ V_s=10\\ \\mathrm V$; II, $T=25^\\circ\\mathrm C,\\ V_s=10\\ \\mathrm V$; III, $T=20^\\circ\\mathrm C,\\ V_s=12\\ \\mathrm V$. Masukan gaya (kgf): 0, 10, 20, 30, 40, 50. Keluaran (V): I = 0.00; 0.11; 0.23; 0.34; 0.42; 0.50. II = 0.02; 0.11; 0.25; 0.36; 0.44; 0.52. III = 0.00; 0.13; 0.27; 0.40; 0.50; 0.60. (a) Cari K dan a pada garis ideal $O=KI+a$. (b) Cari konstanta pengganggu $K_I$ dan masukan $I_I$. (c) Cari konstanta pemodifikasi $K_M$ dan masukan $I_M$. (d) Cari nonlinearitas maksimum sebagai persen F.S.D.",
      "simulation": {
        "id": "2023-uts1-q2-visual",
        "type": "ipe-calibration",
        "title": "Kalibrasi",
        "caption": "Bandingkan titik nol, kemiringan garis ujung, dan jarak tiap data dari garisnya.",
        "params": [],
        "data": {
          "xs": [
            0,
            10,
            20,
            30,
            40,
            50
          ],
          "ys": [
            0,
            0.11,
            0.23,
            0.34,
            0.42,
            0.5
          ],
          "yAmbient": [
            0.02,
            0.11,
            0.25,
            0.36,
            0.44,
            0.52
          ],
          "ySupply": [
            0,
            0.13,
            0.27,
            0.4,
            0.5,
            0.6
          ],
          "xUnit": "kgf",
          "yUnit": "V",
          "slope": 0.01,
          "intercept": 0,
          "visualKind": "calibration"
        }
      },
      "steps": [
        {
          "id": "2023-uts1-q2-step-1",
          "title": "2a · Pilih garis acuan dan satuannya",
          "content": "Masukan I adalah gaya dalam kgf; kgf merupakan satuan gaya, bukan massa dalam kg. Keluaran O adalah tegangan dalam volt. Kemiringan K karena itu memiliki satuan V/kgf, sedangkan a memiliki satuan V.\n\nKondisi I adalah acuan standar. Kita memakai garis yang melalui dua titik ujungnya untuk mendefinisikan garis ideal. Pilihan ini perlu dinyatakan karena garis regresi dapat memberi koefisien yang berbeda.\n\n$$\nO_{\\rm ideal}=KI+a,\\qquad (I_{\\min},O_{\\min})=(0,0),\\quad(I_{\\max},O_{\\max})=(50,0.50)\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          },
          "checkpoint": {
            "prompt": "Setelah catu sensor gaya dinaikkan, garis kalibrasi menjadi lebih curam, tetapi keluaran saat gaya nol tetap. Kesimpulan mana yang paling tepat untuk model garis ini?",
            "options": [
              {
                "id": "2023-uts1-q2-checkpoint-option-1",
                "label": "Catu mengubah sensitivitas; bukti ini tidak menunjukkan pergeseran nol.",
                "feedback": "Benar. Perubahan kemiringan menunjukkan masukan yang memodifikasi sensitivitas, bukan tambahan offset tetap."
              },
              {
                "id": "2023-uts1-q2-checkpoint-option-2",
                "label": "Catu tidak berpengaruh karena keluaran nol tetap.",
                "feedback": "Keluaran nol hanya memeriksa offset. Sensitivitas masih dapat berubah meskipun titik nol tetap.",
                "misconceptionTag": "concept-2023-02-choice-2"
              },
              {
                "id": "2023-uts1-q2-checkpoint-option-3",
                "label": "Catu menambah offset yang sama pada semua gaya.",
                "feedback": "Offset seragam akan menggeser seluruh garis, termasuk titik gaya nol. Di sini titik nol tetap.",
                "misconceptionTag": "concept-2023-02-choice-3"
              },
              {
                "id": "2023-uts1-q2-checkpoint-option-4",
                "label": "Semua selisih akibat catu harus disebut nonlinearitas.",
                "feedback": "Dua garis lurus dapat memiliki kemiringan berbeda tanpa masing-masing memiliki nonlinearitas.",
                "misconceptionTag": "concept-2023-02-choice-4"
              }
            ],
            "correctOptionId": "2023-uts1-q2-checkpoint-option-1"
          }
        },
        {
          "id": "2023-uts1-q2-step-2",
          "title": "Hitung K dan a dari dua titik ujung",
          "content": "Keluaran naik 0.50 V ketika gaya naik 50 kgf. Kita bagi kenaikan keluaran dengan kenaikan gaya untuk memperoleh sensitivitas garis ideal.\n\nPada I=0, suku KI nol dan keluaran sama dengan a. Tabel memberi O=0 V pada kondisi standar, sehingga a=0 V.\n\n$$\nK=\\frac{0.50-0}{50-0}=\\boxed{0.010\\ \\mathrm{V/kgf}},\\qquad a=\\boxed{0\\ \\mathrm V}\n$$"
        },
        {
          "id": "2023-uts1-q2-step-3",
          "title": "Definisikan dua masukan lingkungan terhadap kondisi standar",
          "content": "Suhu dan catu bukan gaya yang ingin diukur, tetapi keduanya dapat mengubah keluaran. Untuk memisahkan pengaruhnya, nyatakan keduanya sebagai perubahan dari keadaan standar.\n\nKita pilih $I_I=T-20^\\circ\\mathrm C$ untuk pengaruh yang menggeser keluaran nol, dan $I_M=V_s-10\\ \\mathrm V$ untuk pengaruh yang mengubah sensitivitas. Pilihan ini akan diperiksa dari garis ujung kondisi II dan III.\n\n$$\nO=(K+K_MI_M)I+a+K_II_I,\\qquad I_I=T-20^\\circ\\mathrm C,\\quad I_M=V_s-10\\ \\mathrm V\n$$"
        },
        {
          "id": "2023-uts1-q2-step-4",
          "title": "2b · Gunakan kondisi II untuk membaca pergeseran nol",
          "content": "Pada kondisi II, catu tetap tetapi suhu naik 5°C. Garis ujungnya melewati (0,0.02) dan (50,0.52), sehingga kemiringannya tetap (0.52−0.02)/50=0.010 V/kgf.\n\nKeluaran nol naik 0.02 V. Kita bagi kenaikan ini dengan 5°C untuk memperoleh KI. Masukan pengganggu berupa perubahan suhu 5°C pada kondisi II dan nol pada kondisi standar.\n\n$$\nK_I=\\frac{0.02-0}{25-20}=\\boxed{0.004\\ \\mathrm{V/{}^\\circ C}},\\qquad I_I=5^\\circ\\mathrm C\\ \\text{(II)}\n$$"
        },
        {
          "id": "2023-uts1-q2-step-5",
          "title": "2c · Gunakan kondisi III untuk membaca perubahan sensitivitas",
          "content": "Pada kondisi III, suhu tetap tetapi catu naik 2 V. Keluaran nol masih 0 V, sedangkan keluaran pada 50 kgf menjadi 0.60 V. Kemiringan garis ujung kini 0.012 V/kgf.\n\nKita bagi perubahan kemiringan 0.002 V/kgf dengan perubahan catu 2 V. KM menyatakan perubahan sensitivitas per volt perubahan catu, bukan penambahan tegangan keluaran yang sama untuk semua gaya.\n\n$$\nK_{\\rm III}=\\frac{0.60}{50}=0.012\\ \\mathrm{V/kgf},\\qquad K_M=\\frac{0.012-0.010}{12-10}=\\boxed{0.001\\ \\mathrm{V/(kgf\\,V)}},\\qquad I_M=2\\ \\mathrm V\\ \\text{(III)}\n$$"
        },
        {
          "id": "2023-uts1-q2-step-6",
          "title": "Periksa model pada tiga kondisi",
          "content": "Pada kondisi standar, kedua masukan lingkungan nol sehingga model kembali menjadi O=0.010I. Kenaikan suhu saja menambah 0.020 V pada garis. Kenaikan catu saja mengubah kemiringan menjadi 0.012 V/kgf.\n\nModel ini merangkum garis ujung tanpa memaksa semua titik data tepat pada garis. Pada kondisi II, data 10 kgf tercetak 0.11 V. Kita mempertahankan angka itu meskipun tidak cocok dengan pergeseran seragam pada titik tersebut.\n\n$$\nO_{\\rm line}=[0.010+0.001(V_s-10)]I+0.004(T-20)\n$$"
        },
        {
          "id": "2023-uts1-q2-step-7",
          "title": "2d · Hitung jarak data standar dari garis ideal",
          "content": "Nonlinearitas adalah jarak data terhadap garis lurus acuannya. Untuk kondisi I, hitung keluaran garis 0.010I pada tiap gaya, lalu kurangi nilai itu dari data.\n\nPada 30 kgf, garis memberi 0.30 V dan data memberi 0.34 V. Selisihnya 0.04 V. Tabel menunjukkan bahwa inilah besar selisih maksimum di antara titik yang tersedia.\n\n$$\nN(I)=O_{\\rm data}(I)-0.010I\n$$\n\n| I (kgf) | Data (V) | Garis (V) | Selisih (V) |\n| --- | --- | --- | --- |\n| 0 | 0.00 | 0.00 | 0.00 |\n| 10 | 0.11 | 0.10 | 0.01 |\n| 20 | 0.23 | 0.20 | 0.03 |\n| 30 | 0.34 | 0.30 | 0.04 |\n| 40 | 0.42 | 0.40 | 0.02 |\n| 50 | 0.50 | 0.50 | 0.00 |"
        },
        {
          "id": "2023-uts1-q2-step-8",
          "title": "Nyatakan nonlinearitas sebagai persen span",
          "content": "F.S.D. pada perhitungan ini adalah span keluaran penuh: 0.50−0=0.50 V. Kita membagi selisih maksimum 0.04 V dengan span itu, bukan dengan nilai gaya atau keluaran pada titik 30 kgf.\n\nSatuan volt saling menghapus, lalu perkalian 100% memberi 8%. Nilai itu menggambarkan ketidaklurusan terhadap garis ujung, bukan seluruh sumber galat sensor.\n\n$$\nN_{\\max}=0.04\\ \\mathrm V,\\qquad \\%N_{\\max}=\\frac{0.04}{0.50}\\times100\\%=\\boxed{8.0\\%\\ \\mathrm{F.S.D.}}\n$$"
        },
        {
          "id": "2023-uts1-q2-step-9",
          "title": "Cek apakah kondisi lain mengubah kesimpulan maksimum",
          "content": "Jika bagian terakhir dimaksudkan mencakup semua kondisi, gunakan garis ujung masing-masing. Kondisi II juga memiliki selisih maksimum 0.04 V dan span 0.50 V, sehingga 8%.\n\nKondisi III memiliki selisih maksimum 0.04 V terhadap garis 0.012I, tetapi spannya 0.60 V, sehingga sekitar 6.67%. Dengan kedua penafsiran tersebut, maksimum yang dilaporkan tetap 8%."
        }
      ],
      "finalAnswer": "Dengan garis ujung: K=0.010 V/kgf dan a=0 V. Pengaruh suhu: II=T−20°C, KI=0.004 V/°C. Pengaruh catu: IM=Vs−10 V, KM=0.001 V/(kgf·V). Nonlinearitas maksimum 8.0% F.S.D.\n\n$$\n\\boxed{\\begin{aligned}K&=0.010\\ \\mathrm{V/kgf},&a&=0\\\\K_I&=0.004\\ \\mathrm{V/{}^\\circ C},&K_M&=0.001\\ \\mathrm{V/(kgf\\,V)}\\\\N_{\\max}&=8.0\\%\\ \\mathrm{F.S.D.}\\end{aligned}}\n$$",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "2023-uas-q5",
      "kind": "problem",
      "slug": "2023-uas-q5",
      "title": "Kalibrasi dan pengaruh tegangan catu",
      "source": "UAS 2023 · Soal 5",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
        "file": "2023-uas.pdf",
        "pages": [
          2
        ],
        "original": "5. Systematic Characteristic of Measurement Systems\nA pressure sensor has an input range of 0.0 to 3.0 BarG and a standard supply voltage Vs = 0.5 volts. Using the calibration result given in the table,\na. [5%] Calculate the slope K and a of the ideal straight line.\nb. [5%] Calculate the constants KM and KI associated with supply voltage variations.\nc. [5%] Calculate the maximum non-linearity as a percentage of f.s.d.\nPressure x in Bar gauge (BarG): 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0.\nOutput voltage in millivolts (Vs = 0.5 volts): 0.0, 16.5, 32.0, 44.0, 51.5, 55.5, 58.5.\nOutput voltage in millivolts (Vs = 0.6 volts): 0.0, 21.0, 41.5, 56.0, 65.0, 70.5, 74.0.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
          "pages": []
        }
      },
      "assumptions": [
        "Pakai garis ujung, bukan regresi kuadrat terkecil. KM dan KI merujuk perubahan catu dari 0.5 V."
      ],
      "exam": {
        "term": "UAS",
        "year": 2023,
        "number": 5
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Kalibrasi dan gangguan"
      ],
      "statement": "Sensor tekanan memiliki rentang 0 sampai 3.0 barG dan catu nominal $V_s=0.5\\,\\mathrm V$. Tekanan $x$: 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0 barG. Keluaran pada 0.5 V: 0, 16.5, 32.0, 44.0, 51.5, 55.5, 58.5 mV. Keluaran pada 0.6 V: 0, 21.0, 41.5, 56.0, 65.0, 70.5, 74.0 mV. (a) Cari kemiringan $K$ dan intersep $a$ garis ideal. (b) Cari $K_M$ dan $K_I$ akibat perubahan catu. (c) Cari ketaklinearan maksimum sebagai persen rentang penuh.",
      "simulation": {
        "id": "2023-uas-q5-visual",
        "type": "ipe-calibration",
        "title": "Kalibrasi",
        "caption": "Jarak vertikal data terhadap garis ujung menunjukkan ketaklinearan.",
        "params": [],
        "data": {
          "supply": 0.5,
          "alternateSupply": 0.6,
          "inputUnit": "barG",
          "outputUnit": "mV",
          "xs": [
            0,
            0.5,
            1,
            1.5,
            2,
            2.5,
            3
          ],
          "ys": [
            0,
            16.5,
            32,
            44,
            51.5,
            55.5,
            58.5
          ],
          "ys2": [
            0,
            21,
            41.5,
            56,
            65,
            70.5,
            74
          ],
          "visualKind": "calibration"
        }
      },
      "steps": [
        {
          "id": "2023-uas-q5-step-1",
          "title": "5a · Tentukan garis acuan dari data standar",
          "content": "Kalibrasi membandingkan tekanan masukan dengan tegangan keluaran. Kita memerlukan garis lurus acuan sebelum dapat membahas kemiringan atau nonlinearitas.\n\nCatu standar adalah 0.5 V. Kita memilih garis yang melewati kedua titik ujungnya, yaitu (0 barG, 0 mV) dan (3 barG, 58.5 mV). Soal tidak menetapkan regresi kuadrat terkecil, yang dapat memberi garis berbeda.\n\nPada model $O=Kx+a$, $x$ adalah tekanan, $O$ tegangan, $K$ kemiringan atau sensitivitas, dan $a$ keluaran saat tekanan nol.\n\n$$\nO_{\\rm ideal}=Kx+a\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Perbandingan pada masukan yang sama memisahkan pengaruh gangguan dari perubahan besaran ukur.",
            "commonPitfall": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
          }
        },
        {
          "id": "2023-uas-q5-step-2",
          "title": "Hitung kemiringan dan keluaran pada nol",
          "content": "Kemiringan membagi perubahan keluaran dengan perubahan masukan. Tegangan naik 58.5 mV ketika tekanan naik 3 barG, sehingga setiap kenaikan 1 barG pada garis acuan memberi 19.5 mV.\n\nKita masukkan titik x=0, O=0 pada model untuk memperoleh a=0 mV. Nilai a adalah keluaran nol, sedangkan K menjelaskan laju perubahan keluaran; keduanya memiliki satuan berbeda.\n\n$$\nK=\\frac{58.5-0}{3-0}=19.5\\ \\mathrm{mV/barG},\\qquad a=0\\ \\mathrm{mV},\\qquad O_{\\rm ideal}=19.5x\n$$"
        },
        {
          "id": "2023-uas-q5-step-3",
          "title": "5b · Nyatakan perubahan catu terhadap acuan",
          "content": "Definisikan $\\Delta V_s=V_s-0.5$ V. Variabel ini nol pada kondisi standar dan 0.1 V pada kondisi kedua. Dengan definisi itu, $K$ serta $a$ tetap menyatakan karakteristik standar.\n\nKonstanta $K_M$ menjelaskan perubahan kemiringan per volt perubahan catu. Konstanta $K_I$ menjelaskan pergeseran keluaran nol per volt perubahan catu. Pengaruhnya berbeda: satu mengalikan tekanan, satu menambah keluaran pada semua tekanan.\n\n$$\nO=[K+K_M\\Delta V_s]x+a+K_I\\Delta V_s\n$$"
        },
        {
          "id": "2023-uas-q5-step-4",
          "title": "Cari kemiringan pada catu 0.6 V",
          "content": "Pakai metode garis ujung yang sama pada data kedua. Kedua ujungnya adalah (0,0) dan (3,74.0), sehingga kemiringan menjadi 24.6667 mV/barG.\n\nKita bandingkan kemiringan ini dengan 19.5 mV/barG. Kenaikan catu 0.1 V meningkatkan sensitivitas, tetapi kita belum menyatakan seberapa besar kenaikan per satu volt.\n\n$$\nK_1=\\frac{74.0-0}{3-0}=24.6667\\ \\mathrm{mV/barG},\\qquad\\Delta K=24.6667-19.5=5.1667\\ \\mathrm{mV/barG}\n$$"
        },
        {
          "id": "2023-uas-q5-step-5",
          "title": "Pisahkan perubahan sensitivitas dan pergeseran nol",
          "content": "Kita bagi kenaikan sensitivitas dengan kenaikan catu untuk memperoleh KM. Satuan tambahan per volt menunjukkan bahwa KM bukan sensitivitas tekanan itu sendiri.\n\nPada tekanan nol, kedua data memberi keluaran 0 mV. Keluaran nol tidak berubah di antara kedua kondisi, sehingga KI=0.\n\nKI=0 tidak berarti catu tidak berpengaruh. Catu tetap mengubah kemiringan melalui KM yang tidak nol.\n\n$$\nK_M=\\frac{24.6667-19.5}{0.6-0.5}=\\boxed{51.6667\\ \\mathrm{mV/(barG\\,V)}},\\qquad K_I=\\frac{0-0}{0.1}=\\boxed{0\\ \\mathrm{mV/V}}\n$$\n\n> Konstanta ini menjelaskan perubahan garis ujung. Titik di tengah masih memuat ketaklinearan, yang juga dapat berubah bersama catu."
        },
        {
          "id": "2023-uas-q5-step-6",
          "title": "5c · Hitung keluaran garis ideal pada setiap tekanan",
          "content": "Nonlinearitas mengukur selisih kurva data dari garis lurus acuan. Untuk catu standar, garisnya $O_{\\rm ideal}=19.5x$. Pada 1.5 barG, garis memberi $19.5(1.5)=29.25$ mV.\n\nData nyata pada tekanan itu adalah 44.0 mV. Selisihnya 44.0−29.25=14.75 mV. Kita perlu memeriksa semua titik sebelum menyebut nilai itu maksimum.\n\n$$\nN(x)=O_{0.5}(x)-O_{\\rm ideal}(x)=O_{0.5}(x)-19.5x\n$$"
        },
        {
          "id": "2023-uas-q5-step-7",
          "title": "Cari selisih terbesar dari seluruh tabel",
          "content": "Tabel memakai data catu 0.5 V dan garis acuannya sendiri. Selisih antara dua kondisi catu bukan nonlinearitas yang sedang dicari.\n\nSelisih terbesar adalah 14.75 mV pada 1.5 barG. Kedua titik ujung berselisih nol karena garis acuan memang melewati keduanya; itu tidak membuat semua titik di tengah linear.\n\n$$\nN_{\\max}=\\max_x|N(x)|=14.75\\ \\mathrm{mV}\n$$\n\n| x (barG) | Keluaran (mV) | Garis ideal (mV) | Selisih (mV) |\n| --- | --- | --- | --- |\n| 0 | 0 | 0 | 0 |\n| 0.5 | 16.5 | 9.75 | 6.75 |\n| 1.0 | 32.0 | 19.5 | 12.5 |\n| 1.5 | 44.0 | 29.25 | 14.75 |\n| 2.0 | 51.5 | 39.0 | 12.5 |\n| 2.5 | 55.5 | 48.75 | 6.75 |\n| 3.0 | 58.5 | 58.5 | 0 |"
        },
        {
          "id": "2023-uas-q5-step-8",
          "title": "Bagi dengan rentang keluaran penuh",
          "content": "Full-scale deflection, disingkat f.s.d., adalah perubahan keluaran sepanjang rentang masukan yang dipakai. Pada kondisi standar, span keluaran adalah 58.5−0=58.5 mV.\n\nKita bagi selisih maksimum dengan span tersebut, lalu kalikan 100%. Pembilang dan penyebut sama-sama mV, sehingga hasil perbandingan tidak memiliki satuan.\n\n$$\n\\%N_{\\max}=\\frac{14.75\\ \\mathrm{mV}}{58.5\\ \\mathrm{mV}}\\times100\\%=\\boxed{25.2137\\%\\ \\mathrm{f.s.d.}}\n$$"
        },
        {
          "id": "2023-uas-q5-step-9",
          "title": "Tafsirkan model dan batas hasilnya",
          "content": "K dan a merangkum garis ujung pada catu standar. KM dan KI merangkum perubahan garis ujung saat catu berubah. Data di antara titik ujung tetap memiliki nonlinearitas yang tidak dihapus oleh empat konstanta ini.\n\nAngka 25.2137% menyatakan selisih terbesar terhadap span keluaran penuh, bukan persentase terhadap tekanan pada satu titik. Jika kita memilih regresi sebagai garis acuan, seluruh hitungan sensitivitas dan nonlinearitas harus mengikuti garis baru itu."
        }
      ],
      "finalAnswer": "Dengan garis ujung: K=19.5 mV/barG, a=0, KM=51.6667 mV/(barG·V), KI=0. Ketaklinearan maksimum 25.2137% f.s.d.\n\n$$\n\\boxed{\\begin{aligned}K&=19.5\\ \\mathrm{mV/barG},&a&=0\\\\K_M&=51.6667\\ \\mathrm{mV/(barG\\,V)},&K_I&=0\\\\N_{\\max}&=25.2137\\%\\ \\mathrm{f.s.d.}\\end{aligned}}\n$$",
      "takeaway": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
    },
    {
      "id": "ipe-calibration-practice",
      "kind": "practice",
      "slug": "ipe-calibration-practice",
      "title": "Latihan: Kalibrasi dan gangguan",
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "intro": "Latihan ini membantu Anda memilih model dan menjelaskan alasan. Mulai dari pilihan ganda, tinjau contoh yang keliru, lalu susun jawaban sendiri. Gunakan rubrik untuk memeriksa alur, asumsi, dan batas kesimpulan Anda.",
      "questions": [
        {
          "id": "concept-2023-02",
          "prompt": "Setelah catu sensor gaya dinaikkan, garis kalibrasi menjadi lebih curam, tetapi keluaran saat gaya nol tetap. Kesimpulan mana yang paling tepat untuk model garis ini?",
          "options": [
            {
              "id": "concept-2023-02-option-1",
              "label": "Catu mengubah sensitivitas; bukti ini tidak menunjukkan pergeseran nol.",
              "feedback": "Benar. Perubahan kemiringan menunjukkan masukan yang memodifikasi sensitivitas, bukan tambahan offset tetap."
            },
            {
              "id": "concept-2023-02-option-2",
              "label": "Catu tidak berpengaruh karena keluaran nol tetap.",
              "feedback": "Keluaran nol hanya memeriksa offset. Sensitivitas masih dapat berubah meskipun titik nol tetap.",
              "misconceptionTag": "concept-2023-02-choice-2"
            },
            {
              "id": "concept-2023-02-option-3",
              "label": "Catu menambah offset yang sama pada semua gaya.",
              "feedback": "Offset seragam akan menggeser seluruh garis, termasuk titik gaya nol. Di sini titik nol tetap.",
              "misconceptionTag": "concept-2023-02-choice-3"
            },
            {
              "id": "concept-2023-02-option-4",
              "label": "Semua selisih akibat catu harus disebut nonlinearitas.",
              "feedback": "Dua garis lurus dapat memiliki kemiringan berbeda tanpa masing-masing memiliki nonlinearitas.",
              "misconceptionTag": "concept-2023-02-choice-4"
            }
          ],
          "correctOptionId": "concept-2023-02-option-1",
          "explanation": "Kemiringan menyatakan perubahan keluaran per perubahan gaya. Garis yang lebih curam berarti sensitivitas berubah. Offset yang tetap menunjukkan tidak ada pergeseran nol pada garis itu. Nonlinearitas memerlukan pemeriksaan jarak data dari garis, bukan sekadar membandingkan dua kemiringan.",
          "relatedProblemId": "2023-uts1-q2"
        },
        {
          "id": "concept-2024-06",
          "prompt": "Saat suhu lingkungan berubah, seluruh kurva kalibrasi arus dan tekanan bergeser ke atas dengan jumlah arus yang sama. Kemiringan kurva tetap. Dalam model gangguan, perubahan mana yang paling sesuai?",
          "options": [
            {
              "id": "concept-2024-06-option-1",
              "label": "Sensitivitas terhadap tekanan meningkat, sedangkan keluaran nol tetap.",
              "feedback": "Jika sensitivitas berubah, jarak dua kurva bergantung pada tekanan. Itu bertentangan dengan pergeseran yang sama pada semua titik.",
              "misconceptionTag": "concept-2024-06-choice-1"
            },
            {
              "id": "concept-2024-06-option-2",
              "label": "Offset keluaran berubah, sedangkan sensitivitas terhadap tekanan tetap.",
              "feedback": "Benar. Kurva bergeser tanpa berubah kemiringan, sehingga perubahan masuk sebagai gangguan titik nol."
            },
            {
              "id": "concept-2024-06-option-3",
              "label": "Resolusi alat meningkat, sehingga kurva tampak lebih tinggi.",
              "feedback": "Resolusi adalah perubahan terkecil yang dapat dibedakan. Pergeseran kurva kalibrasi tidak membuktikan perubahan resolusi.",
              "misconceptionTag": "concept-2024-06-choice-3"
            },
            {
              "id": "concept-2024-06-option-4",
              "label": "Hanya nonlinearitas bertambah, karena setiap perubahan lingkungan pasti melengkungkan kurva.",
              "feedback": "Pergeseran seluruh kurva tidak dengan sendirinya mengubah lengkungannya. Nonlinearitas memerlukan perbandingan bentuk terhadap garis acuan.",
              "misconceptionTag": "concept-2024-06-choice-4"
            }
          ],
          "correctOptionId": "concept-2024-06-option-2",
          "explanation": "Pergeseran yang sama pada semua masukan menambah suku keluaran yang tidak bergantung pada tekanan. Pergeseran tersebut mengubah offset. Perubahan sensitivitas akan membuat selisih keluaran bertambah atau berkurang bersama tekanan.",
          "relatedProblemId": "2024-uas-q1"
        },
        {
          "id": "concept-2025-06",
          "prompt": "Dua sensor suhu menunjukkan nilai akhir yang sama pada setiap suhu acuan. Namun, saat suhu berubah cepat, salah satu sensor tertinggal jauh. Kesimpulan mana yang paling tepat?",
          "options": [
            {
              "id": "concept-2025-06-option-1",
              "label": "Kalibrasi statik yang sama menjamin kedua sensor cocok untuk semua perubahan suhu.",
              "feedback": "Keadaan akhir yang sama tidak memberi informasi lengkap tentang waktu tanggap.",
              "misconceptionTag": "concept-2025-06-choice-1"
            },
            {
              "id": "concept-2025-06-option-2",
              "label": "Keduanya dapat memiliki perilaku statik serupa, tetapi perlu dibandingkan respons dinamiknya untuk tugas cepat.",
              "feedback": "Tepat. Pisahkan ketepatan keadaan tunak dari kemampuan mengikuti perubahan."
            },
            {
              "id": "concept-2025-06-option-3",
              "label": "Sensor yang lambat pasti memiliki offset keadaan tunak lebih besar.",
              "feedback": "Keterlambatan dapat terjadi meskipun offset akhirnya sama-sama nol.",
              "misconceptionTag": "concept-2025-06-choice-3"
            },
            {
              "id": "concept-2025-06-option-4",
              "label": "Menambah digit layar akan membuat sensor lambat mengikuti suhu lebih cepat.",
              "feedback": "Digit memengaruhi resolusi tampilan, bukan proses fisik yang menentukan waktu tanggap.",
              "misconceptionTag": "concept-2025-06-choice-4"
            }
          ],
          "correctOptionId": "concept-2025-06-option-2",
          "explanation": "Kalibrasi statik menilai hubungan setelah keluaran stabil. Ia tidak menunjukkan berapa cepat sensor mencapai nilai itu atau seberapa besar amplitudo dan fase berubah saat masukan berosilasi. Pilihan sensor untuk perubahan cepat memerlukan uji dinamik yang sesuai.",
          "relatedProblemId": "2025-uts2-q6"
        },
        {
          "id": "concept-2025-07",
          "prompt": "Pada tinggi cairan yang sama, keluaran sensor berbeda antara saat tangki diisi dan saat dikosongkan. Perbandingan apa yang tepat untuk menilai histeresis?",
          "options": [
            {
              "id": "concept-2025-07-option-1",
              "label": "Bandingkan setiap titik dengan garis lurus, tanpa memperhatikan arah perubahan level.",
              "feedback": "Itu menilai ketaklinieran terhadap garis yang dipilih, bukan secara khusus jarak antara dua jalur.",
              "misconceptionTag": "concept-2025-07-choice-1"
            },
            {
              "id": "concept-2025-07-option-2",
              "label": "Bandingkan keluaran pada tinggi terendah dengan keluaran pada tinggi tertinggi.",
              "feedback": "Pengurangan kedua ujung memberi span keluaran. Span dapat menjadi penyebut persen, tetapi bukan besar histeresis.",
              "misconceptionTag": "concept-2025-07-choice-2"
            },
            {
              "id": "concept-2025-07-option-3",
              "label": "Bandingkan dua keluaran pada waktu yang sama walaupun tinggi cairannya berbeda.",
              "feedback": "Masukan berbeda juga mengubah keluaran. Perbandingan tersebut mencampur perubahan level dengan histeresis.",
              "misconceptionTag": "concept-2025-07-choice-3"
            },
            {
              "id": "concept-2025-07-option-4",
              "label": "Bandingkan keluaran naik dan turun pada masukan yang sama, lalu cari selisih terbesar.",
              "feedback": "Tepat. Masukan yang sama membuat selisih mencerminkan pengaruh arah/riwayat."
            }
          ],
          "correctOptionId": "concept-2025-07-option-4",
          "explanation": "Histeresis berarti keluaran bergantung pada riwayat arah masukan. Anda dapat melihat pengaruh riwayat dengan membandingkan dua jalur pada masukan yang sama. Jarak terhadap garis acuan menilai ketaklinieran; itu tidak menggantikan perbandingan dua arah.",
          "relatedProblemId": "2025-uts1-q4"
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-calibration-guided",
          "mode": "spot-the-error",
          "title": "Tinjau perubahan kurva kalibrasi",
          "prompt": "Dua kurva sejajar memiliki selisih keluaran yang tetap. Tinjau alasan berikut.",
          "workSample": "Kurva kedua lebih tinggi. Semua nilai keluarannya bertambah. Jadi, sensitivitas sensor pasti bertambah.",
          "question": {
            "id": "ipe-calibration-guided-question",
            "prompt": "Kesimpulan mana yang sesuai dengan dua kurva sejajar?",
            "options": [
              {
                "id": "ipe-calibration-guided-question-option-1",
                "label": "Titik nol berubah, sedangkan sensitivitas tetap.",
                "feedback": "Tepat. Kurva sejajar memiliki kemiringan sama dan titik nol berbeda."
              },
              {
                "id": "ipe-calibration-guided-question-option-2",
                "label": "Sensitivitas berubah karena setiap keluaran lebih tinggi.",
                "feedback": "Kenaikan keluaran tidak cukup untuk menyimpulkan perubahan sensitivitas. Anda perlu memeriksa kemiringan.",
                "misconceptionTag": "calibration-guided-choice-2"
              },
              {
                "id": "ipe-calibration-guided-question-option-3",
                "label": "Kedua kurva membuktikan adanya histeresis.",
                "feedback": "Histeresis memerlukan perbandingan lintasan naik dan turun. Soal hanya menyatakan dua kurva sejajar.",
                "misconceptionTag": "calibration-guided-choice-3"
              }
            ],
            "correctOptionId": "ipe-calibration-guided-question-option-1",
            "explanation": "Sensitivitas mengikuti kemiringan. Pada dua garis sejajar, perubahan keluaran sama besar untuk perubahan masukan yang sama. Pergeseran kurva masuk ke suku titik nol."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-calibration-essay",
          "title": "Pilih uji kalibrasi yang diperlukan",
          "prompt": "Sensor level menunjukkan keluaran berbeda saat tangki diisi dan dikosongkan. Catu sensor juga berubah selama pengujian. Susun cara membedakan histeresis dari pengaruh catu. Jelaskan data, perbandingan, dan batas kesimpulan Anda.",
          "sections": [
            "Model dan asumsi",
            "Alur penalaran",
            "Kesimpulan dan batas"
          ],
          "hints": [
            "Kita perlu mengubah satu kondisi setiap kali.",
            "Bandingkan lintasan naik dan turun pada level serta catu yang sama.",
            "Uji arah gerak dengan catu tetap. Lalu, uji perubahan catu pada arah gerak yang sama."
          ],
          "rubric": [
            {
              "id": "ipe-calibration-rubric-model",
              "label": "Model dan asumsi",
              "weight": 35,
              "fullCredit": "Membedakan histeresis dari perubahan titik nol atau sensitivitas akibat catu.",
              "commonPartialError": "Jangan membagi galat dengan rentang yang berbeda dari acuan soal."
            },
            {
              "id": "ipe-calibration-rubric-reasoning",
              "label": "Alur penalaran",
              "weight": 40,
              "fullCredit": "Mengontrol catu dan arah gerak, lalu membandingkan keluaran pada level yang sama."
            },
            {
              "id": "ipe-calibration-rubric-conclusion",
              "label": "Kesimpulan dan batas",
              "weight": 25,
              "fullCredit": "Membatasi kesimpulan pada rentang dan kondisi pengujian tanpa mengklaim perilaku dinamik."
            }
          ],
          "verifiedOutline": "Jaga catu tetap saat mencatat lintasan level naik dan turun. Bandingkan keluaran pada level yang sama untuk menilai histeresis. Ulangi pengukuran dengan catu lain sambil mempertahankan arah gerak. Periksa apakah catu menggeser titik nol, kemiringan, atau keduanya. Laporkan rentang dan kondisi uji. Kalibrasi tersebut belum menetapkan respons terhadap perubahan level yang cepat."
        }
      ]
    }
  ]
};

export const english: NonNullable<CourseTranslation['modules']>[string] = {
  "title": "Calibration and disturbances",
  "items": {
    "ipe-calibration-material": {
      "title": "Distinguish gain changes from zero shifts",
      "examHook": {
        "prompt": "The sensor supply changes. Do all outputs shift equally, or does the shift depend on the input?",
        "targetOutcome": "You can choose a calibration model and explain its limits."
      },
      "body": "Calibration compares instrument outputs with reference inputs. Read the shape of that relation before choosing numbers. A line can change through a zero shift, a sensitivity change, or both.\n\nUse the same range and test conditions when comparing two curves. State any conflict in the source data.\n\n[Open the worked solution: Temperature calibration and supply effects](?item=2025-uts1-q1).",
      "microUnits": [
        {
          "id": "ipe-calibration-principle",
          "title": "Choose a model from the stated conditions",
          "intuition": "An equal output shift suggests a zero change. A shift that grows with input suggests a slope change. **Sensitivity** is the output change per input change. It describes that slope. Distinguishing the two changes helps you choose the correct correction term.",
          "formal": "A straight-line model uses:\n\n$$y=Kx+a.$$\n\n$K$ is sensitivity and $a$ is the output at zero input. Compare output differences at the same input.",
          "validityBounds": "A line model applies within its calibration range. Static calibration does not guarantee good response to rapid inputs. For hysteresis, compare rising and falling paths at the same input.",
          "decisionCheck": {
            "prompt": "Two calibration lines intersect at zero input. The second line is steeper. Which model term changes?",
            "options": [
              {
                "id": "ipe-calibration-decision-question-option-1",
                "label": "Sensitivity changes; the zero stays fixed.",
                "feedback": "Correct. The slope changes, but the output at zero input matches."
              },
              {
                "id": "ipe-calibration-decision-question-option-2",
                "label": "The zero changes; sensitivity stays fixed.",
                "feedback": "The zero-input outputs match. The difference lies in the line slopes."
              },
              {
                "id": "ipe-calibration-decision-question-option-3",
                "label": "Both lines must describe dynamic response.",
                "feedback": "Calibration lines do not establish response-time behaviour."
              }
            ],
            "explanation": "In a line model, sensitivity multiplies the input. A sensitivity change makes output differences grow as the input moves away from zero."
          }
        }
      ],
      "checkpoints": [
        "You can choose a calibration model and explain its limits.",
        "Comparing the same input separates disturbance effects from changes in the measured quantity.",
        "Do not normalize an error using a range different from the stated reference."
      ],
      "derivations": [
        {
          "id": "ipe-calibration-sources",
          "title": "Sources and archive conventions",
          "content": "[Midterm 1, Midterm 2, and final exam archive, 2023 to 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Years follow archive folders; printed paper dates may differ.\n\n[Main reference: Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view). Each worked solution includes its original statement, source pages, and relevant assumptions."
        }
      ]
    },
    "2025-uts1-q1": {
      "title": "Temperature calibration and supply effects",
      "source": "Midterm 1 2025 · Question 1",
      "assumptions": [
        "The reference line uses the data endpoints, not regression. IM and II mean supply departure from 9 V.",
        "The stated 0 to 120 °C range conflicts with a table ending at 90 °C. The 600 mV normalization uses extrapolation and does not establish the maximum over the whole range.",
        "KM and KI summarize endpoint-line changes. Residual nonlinearity can depend on both temperature and supply."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "The sensor’s stated input range is 0 to 120 °C, with a standard 9 V supply. Calibration data:\nTemperature (°C): 0, 15, 30, 45, 60, 75, 90.\nOutput at 9 V (mV): 0, 78, 155, 222, 308, 377, 450.\nOutput at 12 V (mV): 5, 93, 177, 255, 345, 415, 500.\nUse $O=KI+K_MI_MI+a+K_II_I+N(I)$. Find (a) standard slope K and offset a. Next, find(b) KM and KI for supply variations. For(c), calculate maximum nonlinearity as a percentage of full-scale deflection (f.s.d.). The table ends at 90 °C, unlike the 120 °C limit in the prose.",
      "simulation": {
        "title": "Calibration",
        "caption": "Compare both supplies and endpoint lines over the measured 0 to 90 °C data. The 450 mV table span differs from the 600 mV span obtained by extrapolating to 120 °C.",
        "params": []
      },
      "steps": [
        {
          "id": "2025-uts1-q1-step-1",
          "title": "1. Identify input, output, and the standard condition",
          "content": "We want the relation between temperature and voltage at two supplies. Input $I$ is temperature $T$ in °C; output $O$ is voltage in mV. The 9 V supply is our reference. We draw a line through the data endpoints. A **residual** $N$ is the measured output minus that reference line; it lets us assess nonlinearity.\n\nThe endpoint method differs from least-squares regression. The question specifies no other fitting method, so state this choice before calculating.\n\n| T (°C) | O at 9 V (mV) | O at 12 V (mV) |\n| --- | --- | --- |\n| 0 | 0 | 5 |\n| 15 | 78 | 93 |\n| 30 | 155 | 177 |\n| 45 | 222 | 255 |\n| 60 | 308 | 345 |\n| 75 | 377 | 415 |\n| 90 | 450 | 500 |",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          }
        },
        {
          "id": "2025-uts1-q1-step-2",
          "title": "2. Find sensitivity and offset at 9 V",
          "content": "Slope is output rise divided by temperature rise. The standard endpoints are $(0,0)$ and $(90,450)$. Obtain offset $a$ by inserting a point into $O=KT+a$; the zero first point makes the offset zero.\n\n$K=5\\ \\mathrm{mV/{}^\\circ C}$ means the reference line rises 5 mV per 1 °C increase. It describes the line, not an exact fit through every table point.\n\n$$\nK=\\frac{450-0}{90-0}=5\\ \\mathrm{mV/{}^\\circ C},\\qquad a=0-K(0)=0\\ \\mathrm{mV}\\\\O_{9,\\mathrm{line}}=5T\n$$"
        },
        {
          "id": "2025-uts1-q1-step-3",
          "title": "3. Form the comparison line at 12 V",
          "content": "At the second supply, the zero point shifts to 5 mV and the 90 °C point becomes 500 mV. Subtract the 5 mV offset before calculating slope; 500/90 alone would mix offset and sensitivity changes.\n\n$$\nK_{12}=\\frac{500-5}{90-0}=5.5\\ \\mathrm{mV/{}^\\circ C},\\qquad a_{12}=5\\ \\mathrm{mV}\\\\O_{12,\\mathrm{line}}=5.5T+5\n$$"
        },
        {
          "id": "2025-uts1-q1-step-4",
          "title": "4. Use supply change as the influence input",
          "content": "Define $\\Delta V_s=V_s-9\\ \\mathrm V$. Both supply-influence terms use this departure from standard: $I_M=I_I=\\Delta V_s$. Their additional effects then vanish when supply returns to 9 V.\n\n$K_I$ describes offset change per volt; $K_M$ describes slope change per volt. Separating them prevents attributing the entire output change to one error type.\n\n$$\n\\Delta V_s=12-9=3\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts1-q1-step-5",
          "title": "5. Find KI from the zero-point change",
          "content": "At $T=0$, all temperature-dependent terms vanish. The output change from 0 to 5 mV gives the line’s offset change. Divide it by the 3 V supply change.\n\n$$\nK_I=\\frac{a_{12}-a_9}{12-9}=\\frac{5-0}{3}=\\frac53\\ \\mathrm{mV/V}\n$$"
        },
        {
          "id": "2025-uts1-q1-step-6",
          "title": "6. Find KM from the slope change",
          "content": "Sensitivity rises from 5 to 5.5 mV/°C. Divide the 0.5 mV/°C change by 3 V. The units must include both temperature and supply, since this coefficient changes sensitivity per volt.\n\nCheck: at $\\Delta V_s=3$, the model line becomes $(5+\\tfrac16\\cdot3)T+\\tfrac53\\cdot3=5.5T+5$, reproducing the 12 V line.\n\n$$\nK_M=\\frac{K_{12}-K_9}{12-9}=\\frac{5.5-5}{3}=\\frac16\\ \\mathrm{\\frac{mV}{{}^\\circ C\\,V}}\n$$"
        },
        {
          "id": "2025-uts1-q1-step-7",
          "title": "7. Calculate every residual at the standard condition",
          "content": "Standard nonlinearity uses the 9 V supply. At each temperature, calculate line output $5T$ and subtract it from the table output. At 60 °C, for example, the table gives 308 mV and the line 300 mV, leaving a+8 mV residual.\n\n$$\nN(T)=O_9(T)-5T,\\qquad \\max|N|=8\\ \\mathrm{mV}\\quad\\text{at }T=60^\\circ\\mathrm C\n$$\n\n| T (°C) | O 9 (mV) | Line (mV) | N (mV) |\n| --- | --- | --- | --- |\n| 0 | 0 | 0 | 0 |\n| 15 | 78 | 75 | 3 |\n| 30 | 155 | 150 | 5 |\n| 45 | 222 | 225 | -3 |\n| 60 | 308 | 300 | 8 |\n| 75 | 377 | 375 | 2 |\n| 90 | 450 | 450 | 0 |"
        },
        {
          "id": "2025-uts1-q1-step-8",
          "title": "8. Separate the measured span from the stated range",
          "content": "The table establishes an output of 0 to 450 mV over 0 to 90 °C only. Relative to that measured span,8 mV is 1.778%. The prose instead states 0 to 120 °C. If the K=5 line is extrapolated to 120 °C, nominal span is 600 mV and the same deviation becomes 1.333% of that span.\n\nThere are no 90 to 120 °C data, so the maximum nonlinearity over the complete 120 °C range is not established. State the denominator convention rather than hiding this mismatch.\n\n$$\n\\frac8{450}\\,100\\%=1.7778\\%\\quad\\text{(measured span)}\\\\\\frac8{5(120)}\\,100\\%=1.3333\\%\\quad\\text{(extrapolated nominal span)}\n$$"
        },
        {
          "id": "2025-uts1-q1-step-9",
          "title": "9. Interpret supply effects and the line model’s limits",
          "content": "Raising the supply shifts the zero point and increases sensitivity: both influence types are present. Endpoint lines summarize them, but pointwise residuals still matter. At 30 °C, for example, the measured increase of 22 mV differs from the line’s 20 mV increase; the nonlinear shape can also change.\n\nThe units of a and KI are mV and mV/V, whereas K and KM involve changes with temperature. This unit check distinguishes line shift from slope change."
        }
      ],
      "finalAnswer": "$K=5\\ \\mathrm{mV/{}^\\circ C}$, $a=0$, $K_M=1/6\\ \\mathrm{mV/({}^\\circ C\\,V)}$, and $K_I=5/3\\ \\mathrm{mV/V}$. The largest measured-point deviation is 8 mV at 60 °C. That deviation is 1.778% of the 450 mV table span. It is 1.333% of a 600 mV nominal span extrapolated to 120 °C. The maximum over 90 to 120 °C remains unknown.\n\n$$\n\\boxed{K=5,\\quad a=0,\\quad K_M=\\tfrac16,\\quad K_I=\\tfrac53,\\quad\\max|N|_{\\mathrm{sampled}}=8\\ \\mathrm{mV}}\n$$",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "2025-uts1-q4": {
      "title": "Liquid-level sensor hysteresis",
      "source": "Midterm 1 2025 · Question 4",
      "assumptions": [
        "Use the full separation of the two curves at the same input and a 36.8 V output span.",
        "Maximum refers to the available calibration points; behavior between them is not supplied."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "The level sensor has a 0 to 24 cm input range. Calibration provides outputs while liquid level rises and falls at the same heights.\nh (cm): 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24.\nRising-level voltage (V): 0.0, 2.4, 5.3, 8.1, 10.8, 13.7, 17.2, 20.3, 23.5, 26.7, 29.9, 33.2, 36.8.\nFalling-level voltage (V): 0.3, 2.9, 6.0, 9.0, 11.6, 14.4, 18.2, 21.5, 24.7, 27.5, 30.7, 34.2, 36.8.\nEstimate maximum hysteresis as a percentage of full-scale deflection (f.s.d.).",
      "simulation": {
        "title": "Hysteresis",
        "caption": "Compare the two voltages at the same level. The largest sampled vertical separation is 1.2 V at 14 cm and 16 cm.",
        "params": [
          {
            "key": "level",
            "label": "Level to compare"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uts1-q4-step-1",
          "title": "1. Identify which measurements to compare",
          "content": "At the same height, output can differ because the preceding direction of change differs. **Hysteresis** is the output difference caused by that input history. We compare rising and falling voltages at one value of $h$. You do not need a straight reference line to find this separation.\n\nFor example, at 14 cm the sensor gives 20.3 V while rising and 21.5 V while falling. The height is the same; the preceding direction differs.\n\n| h (cm) | Rising (V) | Falling (V) |\n| --- | --- | --- |\n| 0 | 0.0 | 0.3 |\n| 2 | 2.4 | 2.9 |\n| 4 | 5.3 | 6.0 |\n| 6 | 8.1 | 9.0 |\n| 8 | 10.8 | 11.6 |\n| 10 | 13.7 | 14.4 |\n| 12 | 17.2 | 18.2 |\n| 14 | 20.3 | 21.5 |\n| 16 | 23.5 | 24.7 |\n| 18 | 26.7 | 27.5 |\n| 20 | 29.9 | 30.7 |\n| 22 | 33.2 | 34.2 |\n| 24 | 36.8 | 36.8 |",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          },
          "checkpoint": {
            "prompt": "At the same liquid height, a sensor gives different outputs while the tank fills and drains. Which comparison correctly assesses hysteresis?",
            "options": [
              {
                "id": "2025-uts1-q4-checkpoint-option-1",
                "label": "Compare each point with a straight line, ignoring the direction of level change.",
                "feedback": "That assesses nonlinearity relative to a chosen line, not specifically separation between the two paths."
              },
              {
                "id": "2025-uts1-q4-checkpoint-option-2",
                "label": "Compare the lowest-level output with the highest-level output.",
                "feedback": "Subtracting the endpoints gives output span. You can use that span to normalize a percentage, but it does not measure hysteresis."
              },
              {
                "id": "2025-uts1-q4-checkpoint-option-3",
                "label": "Compare two outputs at the same time even if the liquid heights differ.",
                "feedback": "Different inputs also change output. That comparison mixes level change with hysteresis."
              },
              {
                "id": "2025-uts1-q4-checkpoint-option-4",
                "label": "Compare rising and falling outputs at the same input, then find the largest separation.",
                "feedback": "Correct. Holding input equal makes the difference reveal the direction/history effect."
              }
            ]
          }
        },
        {
          "id": "2025-uts1-q4-step-2",
          "title": "2. Calculate the absolute difference at each height",
          "content": "Define $H(h)$ as the vertical separation between the two curves at height $h$. The absolute value keeps hysteresis magnitude positive whichever curve is higher. At 14 cm,21.5−20.3=1.2 V.\n\n$$\nH(h)=|O_{\\downarrow}(h)-O_{\\uparrow}(h)|\n$$\n\n| h (cm) | \\|Falling − rising\\| (V) |\n| --- | --- |\n| 0 | 0.3 |\n| 2 | 0.5 |\n| 4 | 0.7 |\n| 6 | 0.9 |\n| 8 | 0.8 |\n| 10 | 0.7 |\n| 12 | 1.0 |\n| 14 | 1.2 |\n| 16 | 1.2 |\n| 18 | 0.8 |\n| 20 | 0.8 |\n| 22 | 1.0 |\n| 24 | 0.0 |"
        },
        {
          "id": "2025-uts1-q4-step-3",
          "title": "3. Take the largest separation, not only endpoint differences",
          "content": "The largest value across the rows is 1.2 V, occurring twice: at 14 cm and 16 cm. The 0.3 V difference at 0 cm and 0 V difference at 24 cm do not capture the larger separation inside the range.\n\n$$\nH_{\\max}=1.2\\ \\mathrm V\\qquad(h=14\\ \\mathrm{cm}\\ \\text{or}\\ 16\\ \\mathrm{cm})\n$$"
        },
        {
          "id": "2025-uts1-q4-step-4",
          "title": "4. Choose the output span so units cancel",
          "content": "The numerator is a voltage, so the denominator must also be a voltage. The full output span in the table is 36.8−0=36.8 V. Dividing 1.2 V directly by the 24 cm input range would give V/cm, not a percentage.\n\n$$\nO_{\\rm span}=36.8-0=36.8\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts1-q4-step-5",
          "title": "5. Express hysteresis as a percentage of full scale",
          "content": "Divide maximum separation by output span and multiply by 100%. Use the full 1.2 V separation: the question asks maximum hysteresis, not a ±deviation around the curves’ midpoint.\n\n$$\nH_{\\%\\mathrm{fsd}}=\\frac{1.2\\ \\mathrm V}{36.8\\ \\mathrm V}\\,100\\%=3.2608696\\%\\approx3.26\\%\n$$"
        },
        {
          "id": "2025-uts1-q4-step-6",
          "title": "6. Interpret the result and its sampling limit",
          "content": "In these data, direction history changes the voltage by as much as 1.2 V at the same liquid level. Hysteresis differs from nonlinearity: nonlinearity compares output with a reference line, whereas hysteresis compares the two directions at the same input.\n\nThe 3.26% result is an estimate from the tabulated points. Denser measurements would be needed to determine whether a larger separation occurs between them."
        }
      ],
      "finalAnswer": "Maximum sampled hysteresis is 1.2 V, at 14 cm and 16 cm. Relative to the 36.8 V output span, maximum hysteresis is approximately 3.26% f.s.d.\n\n$$\n\\boxed{H_{\\max}=1.2\\ \\mathrm V,\\qquad H_{\\%\\mathrm{fsd}}=3.26087\\%}\n$$",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "2025-uts2-q6": {
      "title": "Choosing static or dynamic calibration",
      "source": "Midterm 2 2025 · Question 6",
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "(a) When is dynamic calibration needed rather than static calibration alone? (b) Why is sensor calibration important?",
      "simulation": {
        "title": "Calibration",
        "caption": "Steady-state relation and time response answer different calibration needs.",
        "params": [
          {
            "key": "tau",
            "label": "Time constant τ"
          },
          {
            "key": "time",
            "label": "Time position"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uts2-q6-step-1",
          "title": "1. Start with the purpose of calibration",
          "content": "We apply a reference input and compare it with the instrument indication. **Calibration** establishes the relation between the known input and the indication, showing how the instrument responds. You need to distinguish steady and changing inputs because they test different aspects of performance.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          },
          "checkpoint": {
            "prompt": "Two temperature sensors give the same final reading at every reference temperature. During rapid temperature changes, however, one lags far behind. Which conclusion is best?",
            "options": [
              {
                "id": "2025-uts2-q6-checkpoint-option-1",
                "label": "Matching static calibration guarantees both sensors suit every temperature change.",
                "feedback": "Matching final values do not fully describe response time."
              },
              {
                "id": "2025-uts2-q6-checkpoint-option-2",
                "label": "They can have similar static behavior, but their dynamic responses need comparison for fast measurements.",
                "feedback": "Correct. Separate steady-state agreement from the ability to follow change."
              },
              {
                "id": "2025-uts2-q6-checkpoint-option-3",
                "label": "The slower sensor must have a larger steady-state offset.",
                "feedback": "Lag can occur even when both final offsets are zero."
              },
              {
                "id": "2025-uts2-q6-checkpoint-option-4",
                "label": "Adding display digits will make the slower sensor track temperature faster.",
                "feedback": "Digits affect display resolution, not the physical response time."
              }
            ]
          }
        },
        {
          "id": "2025-uts2-q6-step-2",
          "title": "2. Check whether the measurand changes during measurement",
          "content": "Static calibration applies constant inputs or changes them slowly enough for the output to settle. It establishes the steady-state input/output relation, offset, sensitivity, and nonlinearity.\n\nFor example, place a temperature sensor at several reference temperatures and wait for each output to settle. Waiting separates steady-state error from sensor lag."
        },
        {
          "id": "2025-uts2-q6-step-3",
          "title": "3. Read sensitivity and offset from steady conditions",
          "content": "Offset is the output at the defined zero input. Sensitivity $K$ is output change per input change. If calibration points do not follow one line, their residuals show nonlinearity relative to the chosen reference line.\n\n$$\nK=\\frac{\\Delta y_{\\mathrm{steady}}}{\\Delta x},\\qquad y_{\\mathrm{reference}}=Kx+a\n$$"
        },
        {
          "id": "2025-uts2-q6-step-4",
          "title": "4. Choose dynamic calibration for rapid changes",
          "content": "Use dynamic calibration when the input changes on a timescale comparable to, or faster than, the sensor response. Examples include vibration, impact, and rapid temperature changes. A sensor can be correct at steady state yet lag or distort amplitude in use.\n\nTwo sensors may indicate the same final temperature while one takes longer to reach it. Both can have good static calibration yet differ in their ability to record rapid temperature changes."
        },
        {
          "id": "2025-uts2-q6-step-5",
          "title": "5. Measure the time or frequency response",
          "content": "A step input can reveal response and settling times. Sinusoidal inputs at several frequencies reveal sensitivity changes and phase shift. These results identify the usable measurement frequency range.\n\nIn a sinusoidal test, compare amplitudes after the initial transient dies away. The magnitude $|G(j\\omega)|$ gives the amplitude ratio and $\\arg G(j\\omega)$ gives phase difference. They can vary with frequency even when static sensitivity remains fixed.\n\n$$\nK=\\frac{\\Delta y_{\\mathrm{steady}}}{\\Delta x},\\qquad G(j\\omega)=\\frac{Y(j\\omega)}{X(j\\omega)}\n$$"
        },
        {
          "id": "2025-uts2-q6-step-6",
          "title": "6. Choose tests based on how the instrument is used",
          "content": "For slowly changing room temperature, the static relation is often the first concern. For machine vibration, the sensor must also reproduce amplitude and phase at operating frequencies. The test choice follows the signal changes being measured."
        },
        {
          "id": "2025-uts2-q6-step-7",
          "title": "7. Explain the purpose of calibration",
          "content": "Calibration compares the instrument with a known reference so we can estimate errors, apply corrections, and state uncertainty. Recalibration also reveals drift with time or use. Calibration does not automatically repair the instrument; it provides evidence for correction or adjustment.\n\nSeparate calibration from adjustment: calibration determines the relation and error; adjustment changes the instrument. After adjustment, check again to establish the new relation."
        }
      ],
      "finalAnswer": "Dynamic calibration is needed when sensor response time affects the result. Static calibration still establishes scale and offset; dynamic calibration adds amplitude, phase, and frequency-limit information.",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "2025-uas-q2": {
      "title": "Sensor calibration and supply variation",
      "source": "Final exam 2025 · Question 2",
      "assumptions": [
        "The prose range 0.0 to 0.3 cm conflicts with the 0.0 to 3.0 cm table. Results use the table. If every tabulated position should be one tenth as large, K and KM become ten times larger; percentage nonlinearity stays unchanged.",
        "K and KM use endpoint lines, not least-squares regression. The data do not support one exact linear supply-change model at every position. The sampled maximum does not prove the maximum at every continuous position."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "The displacement sensor uses a $1.0\\ \\mathrm V$ reference supply. The prose states a 0.0 to 0.3 cm range, but the table spans 0.0 to 3.0 cm. We retain this discrepancy and consistently use the table values.\nFor $x=[0,0.5,1,1.5,2,2.5,3]\\ \\mathrm{cm}$, output at 1.0 V is $[0,33,64,88,103,111,116]\\ \\mathrm{mV}$; output at 1.2 V is $[0,42,83,112,130,141,148]\\ \\mathrm{mV}$.\n(a) Find ideal slope $K$. (b) Estimate supply-related $K_I$ and $K_M$. (c) Find maximum nonlinearity as a percentage of full-scale deflection.",
      "simulation": {
        "title": "Calibration",
        "caption": "Compare calibration data, endpoint lines, and each point’s vertical deviation.",
        "params": []
      },
      "steps": [
        {
          "id": "2025-uas-q2-step-1",
          "title": "1. Set the reference data and explain the source range conflict",
          "content": "We use position $x$ in cm and output $O$ in mV. The table spans 0 to 3.0 cm, but the prose states a 0.3 cm maximum. We use all table values consistently. Changing only the endpoint would distort the data relation.\n\nThe 1.0 V supply is the standard condition. We will find its reference line, determine how the 1.2 V supply changes that line, and then calculate nonlinearity relative to the standard line.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          }
        },
        {
          "id": "2025-uas-q2-step-2",
          "title": "2. Use an endpoint reference line",
          "content": "At the standard supply, the table endpoints are (0 cm, 0 mV) and (3 cm, 116 mV). The ideal line passes through both, so its reference offset is zero.\n\nIn $O=Kx+a$, $K$ is output change per cm and $a$ is the line output at $x=0$. Use output difference divided by input difference; dividing every point separately would not make a nonlinear curve share one slope.\n\n$$\nK=\\frac{116-0}{3-0}=38.6667\\ \\mathrm{mV/cm},\\qquad a=0,\\qquad O_{\\mathrm{lin}}(x)=38.6667x\n$$"
        },
        {
          "id": "2025-uas-q2-step-3",
          "title": "3. Separate offset and slope changes",
          "content": "Define $\\Delta V_s=V_s-1.0\\ \\mathrm V$. Coefficient $K_I$ describes a position-independent output shift. Coefficient $K_M$ describes sensitivity change per supply change. The following model uses endpoint estimates.\n\nUsing $\\Delta V_s$, rather than raw $V_s$, makes the extra supply effect zero at the standard condition. The term $K_I\\Delta V_s$ shifts the whole line; $K_M\\Delta V_s\\,x$ changes its slope.\n\n$$\nO(x,V_s)\\approx[K+K_M\\Delta V_s]x+a+K_I\\Delta V_s+N(x,V_s)\n$$"
        },
        {
          "id": "2025-uas-q2-step-4",
          "title": "4. Find KI from the zero-input point",
          "content": "At x = 0, both supplies give 0 mV. Thus the supply change does not shift the zero-input output in these data.\n\nChoosing $x=0$ deliberately removes all position-dependent terms. The output difference at zero therefore tests the offset effect without mixing it with a slope change.\n\n$$\nK_I=\\frac{O(0,1.2)-O(0,1.0)}{1.2-1.0}=\\frac{0-0}{0.2}=0\\ \\mathrm{mV/V}\n$$"
        },
        {
          "id": "2025-uas-q2-step-5",
          "title": "5. Find KM from the change in slope",
          "content": "The endpoint line at 1.2 V has slope 148/3 mV/cm. Subtract the reference slope and divide by 0.2 V.\n\nThe slope change is 10.6667 mV/cm for a 0.2 V supply increase. Dividing by 0.2 gives the effect per volt, not the total effect at a 1.2 V supply.\n\nCheck: $38.6667+53.3333(0.2)=49.3333\\ \\mathrm{mV/cm}$. The model therefore reproduces the second supply’s endpoint slope.\n\n$$\nK_{1.2}=\\frac{148}{3}=49.3333\\ \\mathrm{mV/cm}\\\\K_M=\\frac{49.3333-38.6667}{0.2}=53.3333\\ \\mathrm{mV/(cm\\,V)}\n$$\n\n> The endpoint estimate describes the line change, but does not fit every point exactly. At x = 1 cm, the line-change model predicts 10.667 mV, while the table gives 19 mV. The nonlinear residual also changes with supply."
        },
        {
          "id": "2025-uas-q2-step-6",
          "title": "6. Work through one residual before the full table",
          "content": "At $x=1.5\\ \\mathrm{cm}$, the reference line predicts $38.6667(1.5)=58\\ \\mathrm{mV}$, while the measurement gives 88 mV. The 30 mV difference places the measured point above the line; it is not a 30 cm position increase.\n\n$$\nN(1.5)=O_{\\mathrm{measured}}-O_{\\mathrm{line}}=88-58=30\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uas-q2-step-7",
          "title": "7. Calculate the deviation at each position",
          "content": "Use the standard 1.0 V data to assess reference-supply nonlinearity. Subtract the ideal-line output from each table output at the same position.\n\nApply the same subtraction to every row. Because the reference line passes through both endpoints, both endpoint residuals must be zero. The zero-residual check helps you catch substitution or unit mistakes.\n\n$$\nN(x)=O(x,1.0)-38.6667x\n$$\n\n| x (cm) | O (mV) | Ideal line (mV) | Deviation (mV) |\n| --- | --- | --- | --- |\n| 0.0 | 0 | 0.000 | 0.000 |\n| 0.5 | 33 | 19.333 | 13.667 |\n| 1.0 | 64 | 38.667 | 25.333 |\n| 1.5 | 88 | 58.000 | 30.000 |\n| 2.0 | 103 | 77.333 | 25.667 |\n| 2.5 | 111 | 96.667 | 14.333 |\n| 3.0 | 116 | 116.000 | 0.000 |"
        },
        {
          "id": "2025-uas-q2-step-8",
          "title": "8. Express the maximum deviation as a percentage",
          "content": "The largest deviation among the supplied points is 30 mV at x = 1.5 cm. Full output span is 116 mV. The percentage uses full scale, not the 88 mV output at that point.\n\n“Maximum” here refers to the supplied points. The data do not rule out a larger residual between test points. The data support an observed maximum, rather than an exact bound at every position.\n\n$$\n\\%N_{\\max}=\\frac{30}{116}\\,100\\%=25.8621\\%\n$$"
        },
        {
          "id": "2025-uas-q2-step-9",
          "title": "9. Check the limits of the supply-effect model",
          "content": "At 1 cm, output rises from 64 to 83 mV, a 19 mV difference. The endpoint-line change predicts only $K_M\\Delta V_s x=53.3333(0.2)(1)=10.6667\\ \\mathrm{mV}$. The remainder shows that the nonlinear shape also changes with supply.\n\nThus KM and KI summarize changes in the reference line. They do not make a linear model fit every point at both supply levels exactly."
        },
        {
          "id": "2025-uas-q2-step-10",
          "title": "10. Interpret the result and the position-scale choice",
          "content": "$K_I=0$ means the zero point stays fixed; $K_M>0$ means a higher supply increases sensitivity. If every position must be divided by 10, $K$ and $K_M$ become 10 times larger. Percentage nonlinearity stays unchanged because voltage residuals and voltage span do not change."
        }
      ],
      "finalAnswer": "For the 0 to 3 cm table, endpoint lines give K = 38.667 mV/cm and KI = 0. The value of KM is approximately 53.333 mV/(cm·V). Maximum sampled nonlinearity is 25.86% of full scale.\n\n$$\n\\boxed{\\begin{aligned}K&=38.667\\ \\mathrm{mV/cm},\\quad K_I=0\\ \\mathrm{mV/V}\\\\K_M&\\approx53.333\\ \\mathrm{mV/(cm\\,V)}\\\\N_{\\max}&=25.86\\%\\ \\mathrm{FS}\\end{aligned}}\n$$",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "2024-uts1-q2": {
      "title": "Ideal line and thermocouple nonlinearity",
      "source": "Midterm 1 2024 · Question 2",
      "assumptions": [
        "The ideal line uses the endpoint method. Signed nonlinearity is actual data minus line; its magnitude is the absolute value."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "A thermocouple operates over 0 to 500°C with $T=[0,100,200,300,500]$ °C and $E=[0,5268,10777,16325,27388]$ μV. (a) Find the ideal straight-line equation. (b) Find nonlinearity at 100°C and 300°C in μV and as a percentage of full-scale deflection.",
      "simulation": {
        "title": "Calibration",
        "caption": "Compare the table with one endpoint line; vertical departure gives nonlinearity.",
        "params": []
      },
      "steps": [
        {
          "id": "2024-uts1-q2-step-1",
          "title": "a · Define the reference line",
          "content": "The table gives actual output, while the question asks for an ideal comparison line. We use the **endpoint method**: the line through the data at the lower and upper range limits.\n\nThose points are $(0^\\circ\\mathrm C,0\\ \\mu\\mathrm V)$ and $(500^\\circ\\mathrm C,27388\\ \\mu\\mathrm V)$. State the method because regression through all points would give a different line.\n\n| T (°C) | Actual E (μV) |\n| --- | --- |\n| 0 | 0 |\n| 100 | 5268 |\n| 200 | 10777 |\n| 300 | 16325 |\n| 500 | 27388 |",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          }
        },
        {
          "id": "2024-uts1-q2-step-2",
          "title": "a · Calculate slope from the output change",
          "content": "The slope $K$ is the ideal μV increase per degree. Divide the 27388 μV output change by the 500°C temperature change.\n\nOutput at zero temperature is zero, so the offset $a=0$. The line $E_{\\mathrm{lin}}=KT+a$ becomes the expression below.\n\n$$\nK=\\frac{27388-0}{500-0}=54.776\\ \\mu\\mathrm V/{}^\\circ\\mathrm C,\\qquad E_{\\mathrm{lin}}(T)=54.776T\\quad[\\mu\\mathrm V]\n$$"
        },
        {
          "id": "2024-uts1-q2-step-3",
          "title": "b · Define the departure and percentage denominator",
          "content": "Use $N(T)=E_{\\mathrm{data}}(T)-E_{\\mathrm{lin}}(T)$. A negative value places the point below the line; nonlinearity magnitude uses $|N|$.\n\nFull-scale deflection is the output span between the range limits, 27388 μV. Use that same span for both temperatures so the percentages are comparable.\n\n$$\nN_{\\%}(T)=\\frac{N(T)}{27388}(100\\%)\n$$"
        },
        {
          "id": "2024-uts1-q2-step-4",
          "title": "b · Compare data and line at 100°C",
          "content": "The ideal line at 100°C gives $54.776(100)=5477.6$ μV. The table gives 5268 μV. Subtract the line value from the table value.\n\nThe departure is −209.6 μV. For nonlinearity magnitude, report 209.6 μV and explain that the point lies below the line.\n\n$$\nN(100)=5268-5477.6=-209.6\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q2-step-5",
          "title": "b · Convert the 100°C departure to percent f.s.d.",
          "content": "Divide −209.6 μV by 27388 μV. Voltage units cancel, and multiplying by 100% converts the ratio to percent.\n\nThe denominator is not 5268 μV. Dividing by the local reading would give percent of reading rather than percent of full scale.\n\n$$\nN_{\\%}(100)=\\frac{-209.6}{27388}(100\\%)=-0.76530\\%\n$$"
        },
        {
          "id": "2024-uts1-q2-step-6",
          "title": "b · Repeat the comparison at 300°C",
          "content": "The line gives $54.776(300)=16432.8$ μV and the table gives 16325 μV. Their difference is −107.8 μV, again below the line.\n\nUse the same 27388 μV span to obtain −0.39360% f.s.d. Nonlinearity magnitude at 300°C is smaller than at 100°C despite the higher voltage.\n\n$$\nN(300)=16325-16432.8=-107.8\\ \\mu\\mathrm V,\\qquad N_{\\%}(300)=\\frac{-107.8}{27388}(100\\%)=-0.39360\\%\n$$"
        },
        {
          "id": "2024-uts1-q2-step-7",
          "title": "Check against the endpoint method",
          "content": "Departure must be zero at 0 and 500°C because the reference line passes through both endpoints. Interior signed departures describe the actual characteristic’s curvature.\n\nPart (b) reports both signed departures and magnitudes. The two requested points should not be called the maximum over the entire range without checking other points and behaviour between them."
        }
      ],
      "finalAnswer": "The ideal line is E = 54.776 T in μV. Signed nonlinearity is −209.6 μV (−0.76530% f.s.d.) at 100°C and −107.8 μV (−0.39360% f.s.d.) at 300°C. Magnitudes are 0.76530% and 0.39360%.\n\n$$\n\\boxed{\\begin{aligned}E_{\\mathrm{lin}}&=54.776T\\quad[\\mu\\mathrm V]\\\\N(100)&=-209.6\\ \\mu\\mathrm V=-0.76530\\%\\ \\mathrm{f.s.d.}\\\\N(300)&=-107.8\\ \\mu\\mathrm V=-0.39360\\%\\ \\mathrm{f.s.d.}\\end{aligned}}\n$$",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "2024-uts1-q5": {
      "title": "Temperature and supply effects on a pressure gauge",
      "source": "Midterm 1 2024 · Question 5",
      "assumptions": [
        "I_M and I_I are deviations from standard conditions. Absolute standard temperature and voltage are not supplied. The visual’s 0 and 1 bar points are examples evaluated from the equations, not new test data."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "At standard conditions a pressure gauge follows $i=4p+0.04$, with i in mA and p in bar gauge. At 5°C above standard ambient temperature with normal supply, it follows $i=4p+0.06$. At standard temperature with supply 0.2 V lower, it follows $i=4.1p+0.04$. For $i=(K+K_MI_M)p+(a+K_II_I)$, (a) find K, $K_M$, a, and $K_I$; (b) state their units.",
      "simulation": {
        "title": "Calibration",
        "caption": "Two example pressures on the source lines show an offset shift with warming and a slope change with lower supply.",
        "params": []
      },
      "steps": [
        {
          "id": "2024-uts1-q5-step-1",
          "title": "a · Separate slope from zero offset",
          "content": "We separate the slope from the zero-input output in $i=4p+0.04$. The factor 4 is **sensitivity**, output change per pressure change. The 0.04 term remains when $p=0$; it is the **offset**, or zero-input output.\n\nThe model provides two disturbance effects: $K_MI_M$ changes slope, while $K_II_I$ changes offset. Match the two test equations to those roles.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          }
        },
        {
          "id": "2024-uts1-q5-step-2",
          "title": "a · Define disturbances as deviations from standard",
          "content": "Define $I_M=V_s-V_{s,0}$, supply change from standard, and $I_I=T_a-T_{a,0}$, ambient-temperature change from standard. The absolute standard values are not needed to calculate the deviations.\n\nFor the temperature test, $I_I=+5^\\circ\\mathrm C,I_M=0$. For the battery test, $I_M=-0.2$ V,$I_I=0$. Preserve the minus sign on the supply change.\n\n$$\nI_M=V_s-V_{s,0},\\qquad I_I=T_a-T_{a,0}\n$$"
        },
        {
          "id": "2024-uts1-q5-step-3",
          "title": "a · Read K and a from standard conditions",
          "content": "With both disturbances zero, the model reduces to $i=Kp+a$. Match the coefficient of $p$ and the constant term to $i=4p+0.04$.\n\nWith pressure in bar and output in mA, K has units mA/bar. Offset a directly uses the output unit, mA.\n\n$$\nK=4\\ \\mathrm{mA/bar},\\qquad a=0.04\\ \\mathrm{mA}\n$$"
        },
        {
          "id": "2024-uts1-q5-step-4",
          "title": "a · Use the offset change to find KI",
          "content": "In the temperature test the slope stays at 4. Only offset rises from 0.04 to 0.06 mA. The extra 0.02 mA must come from $K_I(5)$.\n\nSubtract the standard offset, then divide by the 5°C temperature rise. The positive sign means warmer surroundings raise zero-input output.\n\n$$\n0.06=0.04+5K_I\\quad\\Longrightarrow\\quad K_I=\\frac{0.06-0.04}{5}=0.004\\ \\mathrm{mA}/{}^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uts1-q5-step-5",
          "title": "a · Use the slope change to find KM",
          "content": "In the battery test, offset stays at 0.04 mA while slope rises from 4 to 4.1 mA/bar. The term $K_MI_M$ must therefore contribute 0.1 mA/bar.\n\nSupply change is−0.2 V. Dividing the slope increase by a negative value gives $K_M<0$: lower supply increases sensitivity in this model.\n\n$$\n4.1=4+K_M(-0.2)\\quad\\Longrightarrow\\quad K_M=\\frac{4.1-4}{-0.2}=-0.5\\ \\frac{\\mathrm{mA}}{\\mathrm{bar\\,V}}\n$$"
        },
        {
          "id": "2024-uts1-q5-step-6",
          "title": "b · Check the units of every term",
          "content": "Every term added into i must have mA units. Thus $K_MI_M$ must have mA/bar units before multiplying pressure, whereas $K_II_I$ directly has mA units.\n\n| Constant | Value | Unit |\n| --- | --- | --- |\n| K | 4 | mA/bar |\n| K_M | −0.5 | mA/(bar·V) |\n| a | 0.04 | mA |\n| K_I | 0.004 | mA/°C |"
        },
        {
          "id": "2024-uts1-q5-step-7",
          "title": "Substitute both tests back to check signs",
          "content": "For+5°C, the offset addition is $0.004(5)=0.02$ mA, giving 0.06 mA. For−0.2 V, the slope addition is $(-0.5)(-0.2)=+0.1$ mA/bar.\n\nBoth test equations are recovered exactly. This check shows why replacing−0.2 V with its magnitude 0.2 V would give the wrong sign for $K_M$.\n\n$$\ni=\\bigl[4-0.5(V_s-V_{s,0})\\bigr]p+0.04+0.004(T_a-T_{a,0})\\quad[\\mathrm{mA}]\n$$"
        }
      ],
      "finalAnswer": "K=4 mA/bar, a=0.04 mA, K_M=−0.5 mA/(bar·V), and K_I=0.004 mA/°C. Supply variation modifies sensitivity; temperature variation shifts offset.\n\n$$\n\\boxed{\\begin{aligned}K&=4\\ \\mathrm{mA/bar},&a&=0.04\\ \\mathrm{mA}\\\\K_M&=-0.5\\ \\mathrm{mA/(bar\\,V)},&K_I&=0.004\\ \\mathrm{mA}/{}^\\circ\\mathrm C\\end{aligned}}\n$$",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "2024-uts2-q4": {
      "title": "Thermocouple nonlinearity and a fitted model",
      "source": "Midterm 2 2024 · Question 4",
      "assumptions": [
        "Nonlinearity uses the 0 to 300°C endpoint line. The quadratic uses the 100 and 300°C points; the exam does not prescribe a fitting method."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "4. Thermocouple: Temperature Measurement & Measurement Characteristics.\n\nAn iron v. constantan thermocouple (Type J) is used to measure temperatures in the ranges of 0°C to 300°C. The e.m.f. values for the thermocouple are provided in the following table.\nType: Iron v. constantan, Type J. Temperature range: −20 to +700°C. E.m.f. values (μV): $E_{0,0}=0$, $E_{100,0}=5269$, $E_{200,0}=10779$, $E_{300,0}=16327$.\n\n(a) [10%] Calculate the non-linearity at 100°C and 200°C as a percentage of the full scale.\n\n(b) [5%] For the temperature range between 100°C and 300°C, the thermocouple e.m.f. is expressed as $E_{T,0}=a_1T+a_2T^2$. Calculate $a_1$ and $a_2$.\n\n(c) [10%] The measured e.m.f. is 12500 μV relative to a reference junction at 20°C. The reference junction circuit voltage is 1000 μV. Use the results from question (b) to estimate the temperature of the measured junction.",
      "simulation": {
        "title": "Calibration",
        "caption": "Compare thermocouple data with the endpoint line and quadratic model.",
        "params": []
      },
      "steps": [
        {
          "id": "2024-uts2-q4-step-1",
          "title": "a · Set the nonlinearity reference",
          "content": "We use **nonlinearity**, the actual curve’s departure from a reference line, to measure how closely the sensor follows a straight relationship. For the stated 0 to 300°C range, use the line joining $(0,0)$ and $(300,16327)$, with output in μV.\n\nSlope is output change divided by temperature change. Since the starting point is zero, this line needs no offset term. The full output span is 16327 μV.\n\n$$\nE_{\\mathrm{lin}}(T)=\\frac{16327-0}{300-0}T=54.423333T\\quad[\\mu\\mathrm V]\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          }
        },
        {
          "id": "2024-uts2-q4-step-2",
          "title": "a · Calculate the departure at 100°C",
          "content": "The actual 5269 μV comes from the table. The comparison value comes from the line: $54.423333(100)=5442.333$ μV. Actual minus reference is negative.\n\nFor percent of full scale, divide this difference by 16327 μV and multiply by 100%. Dividing by the output at 100°C would give a different percentage measure.\n\n$$\n\\delta E_{100}=5269-5442.333=-173.333\\ \\mu\\mathrm V,\\qquad N_{100}=\\frac{-173.333}{16327}(100\\%)=-1.0616\\%\n$$"
        },
        {
          "id": "2024-uts2-q4-step-3",
          "title": "a · Keep the same reference at 200°C",
          "content": "At 200°C, the reference line gives 10884.667 μV, while the table gives 10779 μV. Do not create a new reference line for each point: both nonlinearities must use the same line.\n\nThe nonlinearity magnitudes are 1.062% at 100°C and 0.647% at 200°C. The negative signed values indicate points below the line.\n\n$$\n\\delta E_{200}=10779-10884.667=-105.667\\ \\mu\\mathrm V,\\qquad N_{200}=\\frac{-105.667}{16327}(100\\%)=-0.6472\\%\n$$"
        },
        {
          "id": "2024-uts2-q4-step-4",
          "title": "b · Form two equations for two constants",
          "content": "Part (b) asks for $E=a_1T+a_2T^2$ over 100 to 300°C. There are two unknown constants. Choose the two endpoints of that range to determine them.\n\nInsert $T=100,E=5269$, then $T=300,E=16327$. Squaring these temperatures gives 10000 and 90000 in the $T^2$ terms.\n\n$$\n\\begin{aligned}100a_1+10000a_2&=5269\\\\300a_1+90000a_2&=16327\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q4-step-5",
          "title": "b · Eliminate a₁ to find a₂",
          "content": "Divide the entire first equation by 100 and the entire second by 300. Both $a_1$ coefficients become one. Subtract the first divided equation from the second.\n\nThe $a_1$ terms cancel. The difference between 300 and 100 gives a coefficient of 200 for $a_2$. Divide both sides by 200.\n\n$$\n\\begin{aligned}a_1+100a_2&=52.69\\\\a_1+300a_2&=54.423333\\\\200a_2&=1.733333\\\\a_2&=0.008666667\\ \\frac{\\mu\\mathrm V}{({}^\\circ\\mathrm C)^2}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q4-step-6",
          "title": "b · Find a₁ and check the model units",
          "content": "Return to $a_1+100a_2=52.69$. Subtract $100a_2$ from both sides to obtain 51.823333 for $a_1$.\n\nBoth $a_1T$ and $a_2T^2$ must have voltage units. Thus $a_1$ has units μV/°C and $a_2$ has units μV/(°C)². This model uses the numerical temperature in °C.\n\n$$\na_1=52.69-100(0.008666667)=51.823333\\ \\frac{\\mu\\mathrm V}{{}^\\circ\\mathrm C}\n$$"
        },
        {
          "id": "2024-uts2-q4-step-7",
          "title": "Check what the two-point fit means",
          "content": "The model passes through 100 and 300°C because those points determined it. Test the unused 200°C point to assess the approximation.\n\nThe model gives 10711.333 μV versus the tabulated 10779 μV. The 67.667 μV difference shows an approximation, not an exact fit to every point. Least squares using all points would give different constants.\n\n$$\nE_{\\mathrm{model}}(200)=51.823333(200)+0.008666667(200)^2=10711.333\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts2-q4-step-8",
          "title": "c · Match voltage references before finding temperature",
          "content": "The model from part (b) uses a 0°C reference, but the measured 12500 μV uses a 20°C reference. Match the references by adding the 1000 μV reference-circuit voltage supplied in part (c).\n\nUse the supplied 1000 μV, rather than substituting 1019 μV from another table. The model’s target voltage is 13500 μV.\n\n$$\nE(T,0)=E(T,20)+E(20,0)=12500+1000=13500\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts2-q4-step-9",
          "title": "c · Form the quadratic in temperature",
          "content": "Insert the target voltage into $E=a_1T+a_2T^2$. Subtract 13500 from both sides so one side is zero. This puts the equation in the form needed for the quadratic formula.\n\nIn $AT^2+BT+C=0$, the coefficients are $A=a_2$, $B=a_1$, and $C=-13500$. Here A is an algebraic coefficient, not an area.\n\n$$\n0.008666667T^2+51.823333T-13500=0\n$$"
        },
        {
          "id": "2024-uts2-q4-step-10",
          "title": "c · Select the root within the model range",
          "content": "The quadratic formula produces two roots. Evaluate both signs, then compare them with the 100 to 300°C range used to build the model.\n\nThe positive root, about 250.04°C, is within the range. The root near −6229.66°C lies far outside the domain and does not describe this measurement.\n\n$$\nT=\\frac{-51.823333\\pm\\sqrt{(51.823333)^2+4(0.008666667)(13500)}}{2(0.008666667)}\\quad\\Rightarrow\\quad T\\approx250.04^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uts2-q4-step-11",
          "title": "Check the temperature and voltage ordering",
          "content": "The 13500 μV target lies between the model outputs at 200 and 300°C. A temperature near 250°C fits that ordering. Substituting the result back gives about 13500 μV.\n\nThe approximation and source data still limit accuracy. Extra decimal places do not remove the model’s departure from the table."
        }
      ],
      "finalAnswer": "Nonlinearity magnitudes are 1.062% at 100°C and 0.647% at 200°C. The endpoint-fitted model gives approximately 250.04°C after reference compensation.\n\n$$\n\\boxed{\\begin{aligned}|N_{100}|&=1.062\\%,\\quad|N_{200}|=0.647\\%\\\\a_1&=51.82333\\ \\mu\\mathrm V/{}^\\circ\\mathrm C\\\\a_2&=0.008666667\\ \\mu\\mathrm V/{}^\\circ\\mathrm C^2\\\\T&\\approx250.04^\\circ\\mathrm C\\end{aligned}}\n$$",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "2024-uas-q1": {
      "title": "Calibrating a pressure transducer",
      "source": "Final exam 2024 · Question 1",
      "assumptions": [
        "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
        "The exam does not request least-squares regression. This solution uses endpoint lines and environmental deviations from the standard condition."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "1. [20%] Systematic Characteristics of Measurement Systems.\n\nA laboratory tests a pressure transducer under three conditions:\n(i) Ambient temperature 25°C, supply voltage 9 V (standard).\n(ii) Ambient temperature 25°C, supply voltage 12 V.\n(iii) Ambient temperature 30°C, supply voltage 9 V.\nInput (barg): 0, 4, 8, 12, 16.\nOutput (mA), condition (i): 4, 11.0, 16.0, 22.8, 29.6.\nOutput (mA), condition (ii): 4, 13.2, 21.3, 31.1, 39.2.\nOutput (mA), condition (iii): 6, 12.5, 18.1, 25.5, 31.6.\n\n(a) [10%] Determine the values of $K_M,K_I,a,K$ associated with the model equation $O=(K+K_MI_M)I+a+K_II_I$. Complete your answer with the units.\n\n(b) [10%] Calculate the maximum non-linearity as a percentage of the full-scale deflection (f.s.d.).",
      "simulation": {
        "title": "Calibration",
        "caption": "The ideal line uses both endpoints; vertical departure shows nonlinearity.",
        "params": []
      },
      "steps": [
        {
          "id": "2024-uas-q1-step-1",
          "title": "a · Read the role of each model term",
          "content": "We compare output $O$, a current in mA, with input $I$, a gauge pressure in bar. In $O=(K+K_MI_M)I+a+K_II_I$, the first bracket controls the current and pressure slope.\n\n$a$ is the zero-input output under standard conditions. The term $K_II_I$ shifts output without multiplying pressure. We will distinguish slope changes from zero shifts.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          },
          "checkpoint": {
            "prompt": "When ambient temperature changes, an entire current and pressure calibration curve shifts upward by the same current amount. Its slope stays fixed. Which disturbance change best describes this?",
            "options": [
              {
                "id": "2024-uas-q1-checkpoint-option-1",
                "label": "Pressure sensitivity increases while zero output stays fixed.",
                "feedback": "A sensitivity change makes curve separation depend on pressure, contradicting the equal shift at all points."
              },
              {
                "id": "2024-uas-q1-checkpoint-option-2",
                "label": "Output offset changes while pressure sensitivity stays fixed.",
                "feedback": "Correct. The curve translates without changing slope, so the effect is a zero-shift disturbance."
              },
              {
                "id": "2024-uas-q1-checkpoint-option-3",
                "label": "Instrument resolution increases, making the curve appear higher.",
                "feedback": "Resolution is the smallest distinguishable change. A calibration-curve shift does not establish a resolution change."
              },
              {
                "id": "2024-uas-q1-checkpoint-option-4",
                "label": "Only nonlinearity increases, because any environmental change must bend the curve.",
                "feedback": "Translating a whole curve does not by itself change its curvature. Nonlinearity concerns its shape relative to a reference line."
              }
            ]
          }
        },
        {
          "id": "2024-uas-q1-step-2",
          "title": "a · Use standard conditions as the reference",
          "content": "Condition (i), a 9 V supply and 25°C ambient temperature, is the reference. Define $I_M$ as supply change and $I_I$ as temperature change from it.\n\nBoth changes are zero under standard conditions. With these definitions, $K$ and $a$ directly describe the standard line. Use the printed table rather than handwritten notes.\n\n$$\nI_M=V_s-9\\ \\mathrm V,\\qquad I_I=T_a-25^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uas-q1-step-3",
          "title": "a · Determine K from the two endpoints",
          "content": "Under standard conditions, input rises from 0 to 16 bar while output rises from 4 to 29.6 mA. Slope measures output increase per input increase.\n\nSubtract the initial output before dividing. Using $29.6/16$ would wrongly include the zero-input current in the slope.\n\n$$\nK=\\frac{29.6-4}{16-0}=\\frac{25.6}{16}=1.6\\ \\mathrm{mA/bar}\n$$"
        },
        {
          "id": "2024-uas-q1-step-4",
          "title": "a · Find offset a and write the standard line",
          "content": "At zero pressure the $KI$ term vanishes. The remaining 4 mA gives $a=4$ mA. This offset is part of the sensor characteristic; it is not automatically an error.\n\nThe standard line can now predict ideal output at each pressure. Use this same line later when calculating nonlinearity.\n\n$$\na=4\\ \\mathrm{mA},\\qquad O_{\\mathrm{lin}}=1.6I+4\\quad[\\mathrm{mA}]\n$$"
        },
        {
          "id": "2024-uas-q1-step-5",
          "title": "a · Find the supply-induced sensitivity change",
          "content": "Compare (ii) with (i): temperature stays fixed while supply rises by 3 V. At 12 V, zero output remains 4 mA, but the upper-end output becomes 39.2 mA. The main change is therefore in slope.\n\nThe new slope of 2.2 mA/bar is 0.6 mA/bar higher. Divide that slope change by the supply change to obtain $K_M$.\n\n$$\nK_{12}=\\frac{39.2-4}{16}=2.2\\ \\mathrm{mA/bar},\\qquad K_M=\\frac{2.2-1.6}{12-9}=0.2\\ \\frac{\\mathrm{mA}}{\\mathrm{bar\\,V}}\n$$"
        },
        {
          "id": "2024-uas-q1-step-6",
          "title": "a · Find the temperature-induced zero shift",
          "content": "Compare (iii) with (i): supply stays fixed while temperature rises by 5°C. At zero input, output rises from 4 to 6 mA, giving a 2 mA offset change.\n\nAt the upper endpoint, 29.6 to 31.6 mA is also a 2 mA shift. The endpoint slope remains 1.6 mA/bar. Divide the 2 mA shift by 5°C to find $K_I$.\n\n$$\nK_I=\\frac{6-4}{30-25}=0.4\\ \\mathrm{mA}/{}^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uas-q1-step-7",
          "title": "b · Compare every reading with the standard line",
          "content": "Use the standard-condition data for nonlinearity. At each pressure, evaluate $1.6I+4$, then subtract that line value from the reading. At 8 bar, for example, the line gives $1.6(8)+4=16.8$ mA.\n\nThe reading there is 16.0 mA, giving a −0.8 mA residual. The table checks all points rather than selecting one by appearance.\n\n$$\n\\delta O=O_{\\mathrm{data}}-O_{\\mathrm{lin}}\n$$\n\n| I (bar) | Data (mA) | Line (mA) | Residual (mA) |\n| --- | --- | --- | --- |\n| 0 | 4 | 4 | 0 |\n| 4 | 11.0 | 10.4 | 0.6 |\n| 8 | 16.0 | 16.8 | −0.8 |\n| 12 | 22.8 | 23.2 | −0.4 |\n| 16 | 29.6 | 29.6 | 0 |"
        },
        {
          "id": "2024-uas-q1-step-8",
          "title": "b · Convert the largest departure to percent",
          "content": "The largest absolute departure is 0.8 mA. Full-scale deflection is the output span from zero to full input: $29.6-4=25.6$ mA.\n\nDivide these quantities with matching units, then multiply by 100%. The 4 mA offset is not part of the span, so the denominator is not 29.6 mA.\n\n$$\nN_{\\max}=\\frac{\\max|\\delta O|}{O_{\\max}-O_{\\min}}(100\\%)=\\frac{0.8}{25.6}(100\\%)=3.125\\%\n$$"
        },
        {
          "id": "2024-uas-q1-step-9",
          "title": "Check what the model captures",
          "content": "The four constants describe endpoint lines: $K$ converts bar into mA, $a$ sets initial current, $K_M$ changes slope per supply volt, and $K_I$ shifts zero per degree.\n\nNot every interior point lies on a line. This environmental model therefore does not remove the table’s nonlinearity. The 3.125% result is the largest departure among the available test points."
        }
      ],
      "finalAnswer": "K = 1.6 mA/bar, a = 4 mA, KM = 0.2 mA/(bar·V), KI = 0.4 mA/°C. Maximum standard-condition nonlinearity is 3.125% f.s.d.\n\n$$\n\\boxed{\\begin{aligned}K&=1.6\\ \\mathrm{mA/bar},&a&=4\\ \\mathrm{mA}\\\\K_M&=0.2\\ \\mathrm{mA/(bar\\,V)},&K_I&=0.4\\ \\mathrm{mA/{}^\\circ C}\\\\N_{max}&=3.125\\%\\ \\mathrm{f.s.d.}\\end{aligned}}\n$$",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "2023-uts1-q2": {
      "title": "Force calibration at different temperatures and supplies",
      "source": "Midterm 1 2023 · Question 2",
      "assumptions": [
        "The ideal lines use endpoints because the question does not prescribe regression. Environmental inputs are deviations from 20°C and 10 V.",
        "The 0.11 V value for condition II at 10 kgf follows the printed table. The linear model is not forced through every datum."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "A strain-gauge force sensor is calibrated under three conditions: I (standard), $T=20^\\circ\\mathrm C,\\ V_s=10\\ \\mathrm V$; II, $T=25^\\circ\\mathrm C,\\ V_s=10\\ \\mathrm V$; III, $T=20^\\circ\\mathrm C,\\ V_s=12\\ \\mathrm V$. Force inputs (kgf): 0, 10, 20, 30, 40, 50. Outputs (V): I = 0.00, 0.11, 0.23, 0.34, 0.42, 0.50. Condition II = 0.02, 0.11, 0.25, 0.36, 0.44, 0.52. Condition III = 0.00, 0.13, 0.27, 0.40, 0.50, 0.60. (a) Find K and a in ideal line $O=KI+a$. (b) Find interfering constant $K_I$ and input $I_I$. (c) Find modifying constant $K_M$ and input $I_M$. (d) Find maximum nonlinearity as a percentage of F.S.D.",
      "simulation": {
        "title": "Calibration",
        "caption": "Compare zero output, endpoint-line slope, and each datum's departure from its line.",
        "params": []
      },
      "steps": [
        {
          "id": "2023-uts1-q2-step-1",
          "title": "2a · Choose the reference line and its units",
          "content": "Input I is force in kgf; kgf is a force unit rather than mass in kg. Output O is voltage in volts. Slope K therefore has units V/kgf, while a has units V.\n\nCondition I is the standard reference. We use the line through its two endpoints to define the ideal line. State this choice because regression can produce different coefficients.\n\n$$\nO_{\\rm ideal}=KI+a,\\qquad (I_{\\min},O_{\\min})=(0,0),\\quad(I_{\\max},O_{\\max})=(50,0.50)\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          },
          "checkpoint": {
            "prompt": "After a force sensor's supply is increased, its calibration line becomes steeper, while its zero-force output stays unchanged. Which conclusion best fits this linear model?",
            "options": [
              {
                "id": "2023-uts1-q2-checkpoint-option-1",
                "label": "Supply changes sensitivity; this evidence does not show a zero shift.",
                "feedback": "Correct. A slope change indicates an input that modifies sensitivity, rather than a fixed additive offset."
              },
              {
                "id": "2023-uts1-q2-checkpoint-option-2",
                "label": "Supply has no effect because zero output stays unchanged.",
                "feedback": "Zero output tests only the offset. Sensitivity can change even when the zero point stays fixed."
              },
              {
                "id": "2023-uts1-q2-checkpoint-option-3",
                "label": "Supply adds the same offset at every force.",
                "feedback": "A uniform offset would shift the entire line, including the zero-force point. Here that point stays fixed."
              },
              {
                "id": "2023-uts1-q2-checkpoint-option-4",
                "label": "Every supply-induced difference must be called nonlinearity.",
                "feedback": "Two straight lines can have different slopes without either line being nonlinear."
              }
            ]
          }
        },
        {
          "id": "2023-uts1-q2-step-2",
          "title": "Calculate K and a from the endpoints",
          "content": "Output rises 0.50 V over a force rise of 50 kgf. We divide output increase by force increase to obtain ideal-line sensitivity.\n\nAt I=0, the KI term vanishes and output equals a. The standard table gives O=0 V, so a=0 V.\n\n$$\nK=\\frac{0.50-0}{50-0}=\\boxed{0.010\\ \\mathrm{V/kgf}},\\qquad a=\\boxed{0\\ \\mathrm V}\n$$"
        },
        {
          "id": "2023-uts1-q2-step-3",
          "title": "Define environmental inputs relative to standard conditions",
          "content": "Temperature and supply are not the measured force, but both can affect output. Express them as changes from standard conditions to separate their effects.\n\nWe choose $I_I=T-20^\\circ\\mathrm C$ for the effect shifting zero output, and $I_M=V_s-10\\ \\mathrm V$ for the effect changing sensitivity. The endpoint lines of conditions II and III will test this interpretation.\n\n$$\nO=(K+K_MI_M)I+a+K_II_I,\\qquad I_I=T-20^\\circ\\mathrm C,\\quad I_M=V_s-10\\ \\mathrm V\n$$"
        },
        {
          "id": "2023-uts1-q2-step-4",
          "title": "2b · Use condition II to identify zero shift",
          "content": "In condition II, supply stays fixed while temperature rises by 5°C. Its endpoint line joins (0,0.02) and (50,0.52), so the slope remains (0.52−0.02)/50=0.010 V/kgf.\n\nZero output rises by 0.02 V. We divide by 5°C to obtain KI. The interfering input is a 5°C temperature change in condition II and zero at standard conditions.\n\n$$\nK_I=\\frac{0.02-0}{25-20}=\\boxed{0.004\\ \\mathrm{V/{}^\\circ C}},\\qquad I_I=5^\\circ\\mathrm C\\ \\text{(II)}\n$$"
        },
        {
          "id": "2023-uts1-q2-step-5",
          "title": "2c · Use condition III to identify sensitivity change",
          "content": "In condition III, temperature stays fixed while supply rises by 2 V. Zero output remains 0 V, while output at 50 kgf becomes 0.60 V. Endpoint slope is now 0.012 V/kgf.\n\nWe divide the slope change of 0.002 V/kgf by the 2 V supply change. KM describes sensitivity change per supply volt rather than an equal additive output voltage at every force.\n\n$$\nK_{\\rm III}=\\frac{0.60}{50}=0.012\\ \\mathrm{V/kgf},\\qquad K_M=\\frac{0.012-0.010}{12-10}=\\boxed{0.001\\ \\mathrm{V/(kgf\\,V)}},\\qquad I_M=2\\ \\mathrm V\\ \\text{(III)}\n$$"
        },
        {
          "id": "2023-uts1-q2-step-6",
          "title": "Check the model under all three conditions",
          "content": "At standard conditions both environmental inputs vanish, returning O=0.010I. Temperature rise alone adds 0.020 V to the line. Supply rise alone changes slope to 0.012 V/kgf.\n\nThe model describes endpoint lines without forcing every datum onto its line. Condition II at 10 kgf is printed as 0.11 V. We retain that value despite its departure from a uniform shift at that point.\n\n$$\nO_{\\rm line}=[0.010+0.001(V_s-10)]I+0.004(T-20)\n$$"
        },
        {
          "id": "2023-uts1-q2-step-7",
          "title": "2d · Find standard-data departures from the ideal line",
          "content": "Nonlinearity is departure from the reference straight line. For condition I, calculate line output 0.010I at each force, then subtract it from the measured output.\n\nAt 30 kgf, the line gives 0.30 V and the datum is 0.34 V. The difference is 0.04 V. The table shows this is the largest departure among the supplied points.\n\n$$\nN(I)=O_{\\rm data}(I)-0.010I\n$$\n\n| I (kgf) | Data (V) | Line (V) | Deviation (V) |\n| --- | --- | --- | --- |\n| 0 | 0.00 | 0.00 | 0.00 |\n| 10 | 0.11 | 0.10 | 0.01 |\n| 20 | 0.23 | 0.20 | 0.03 |\n| 30 | 0.34 | 0.30 | 0.04 |\n| 40 | 0.42 | 0.40 | 0.02 |\n| 50 | 0.50 | 0.50 | 0.00 |"
        },
        {
          "id": "2023-uts1-q2-step-8",
          "title": "Express nonlinearity as a percentage of span",
          "content": "For this calculation, F.S.D. is full output span: 0.50−0=0.50 V. We divide the maximum departure of 0.04 V by that span rather than by force or output at 30 kgf.\n\nThe volt units cancel; multiplying by 100% gives 8%. This describes departure from the endpoint line rather than every source of sensor error.\n\n$$\nN_{\\max}=0.04\\ \\mathrm V,\\qquad \\%N_{\\max}=\\frac{0.04}{0.50}\\times100\\%=\\boxed{8.0\\%\\ \\mathrm{F.S.D.}}\n$$"
        },
        {
          "id": "2023-uts1-q2-step-9",
          "title": "Check whether the other conditions change the maximum",
          "content": "If the final part is intended to cover all conditions, use each condition's own endpoint line. Condition II also has maximum deviation 0.04 V and span 0.50 V, giving 8%.\n\nCondition III has maximum deviation 0.04 V from 0.012I, but its span is 0.60 V, giving about 6.67%. Either interpretation therefore leaves the reported maximum at 8%."
        }
      ],
      "finalAnswer": "Using endpoint lines: K=0.010 V/kgf and a=0 V. Temperature effect: II=T−20°C, KI=0.004 V/°C. Supply effect: IM=Vs−10 V, KM=0.001 V/(kgf·V). Maximum nonlinearity is 8.0% F.S.D.\n\n$$\n\\boxed{\\begin{aligned}K&=0.010\\ \\mathrm{V/kgf},&a&=0\\\\K_I&=0.004\\ \\mathrm{V/{}^\\circ C},&K_M&=0.001\\ \\mathrm{V/(kgf\\,V)}\\\\N_{\\max}&=8.0\\%\\ \\mathrm{F.S.D.}\\end{aligned}}\n$$",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "2023-uas-q5": {
      "title": "Calibration and supply-voltage effects",
      "source": "Final exam 2023 · Question 5",
      "assumptions": [
        "Use endpoint lines, not least-squares regression. KM and KI refer to supply change from 0.5 V."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Calibration and disturbances"
      ],
      "statement": "A pressure sensor spans 0 to 3.0 barG with nominal supply $V_s=0.5\\,\\mathrm V$. Pressures $x$: 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0 barG. Outputs at 0.5 V: 0, 16.5, 32.0, 44.0, 51.5, 55.5, 58.5 mV. Outputs at 0.6 V: 0, 21.0, 41.5, 56.0, 65.0, 70.5, 74.0 mV. (a) Find ideal-line slope $K$ and intercept $a$. (b) Find supply-effect constants $K_M$ and $K_I$. (c) Find maximum nonlinearity as a percentage of full-scale span.",
      "simulation": {
        "title": "Calibration",
        "caption": "Vertical distance from data to the endpoint line shows nonlinearity.",
        "params": []
      },
      "steps": [
        {
          "id": "2023-uas-q5-step-1",
          "title": "5a · Define the reference line from standard data",
          "content": "Calibration compares input pressure with output voltage. A straight reference line is needed before discussing slope or nonlinearity.\n\nThe standard supply is 0.5 V. We choose the line through its two endpoints: (0 barG, 0 mV) and (3 barG, 58.5 mV). The question does not specify least-squares regression, which could give a different line.\n\nIn $O=Kx+a$, $x$ is pressure, $O$ voltage, $K$ slope or sensitivity, and $a$ zero-pressure output.\n\n$$\nO_{\\rm ideal}=Kx+a\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Comparing the same input separates disturbance effects from changes in the measured quantity.",
            "commonPitfall": "Do not normalize an error using a range different from the stated reference."
          }
        },
        {
          "id": "2023-uas-q5-step-2",
          "title": "Calculate slope and zero output",
          "content": "Slope divides output change by input change. Voltage rises 58.5 mV over a 3 barG pressure increase, so each additional 1 barG gives 19.5 mV on the reference line.\n\nWe insert x=0, O=0 into the model to obtain a=0 mV. The value a is zero output, while K is output change per input change; they have different units.\n\n$$\nK=\\frac{58.5-0}{3-0}=19.5\\ \\mathrm{mV/barG},\\qquad a=0\\ \\mathrm{mV},\\qquad O_{\\rm ideal}=19.5x\n$$"
        },
        {
          "id": "2023-uas-q5-step-3",
          "title": "5b · Express supply change relative to the reference",
          "content": "We define $\\Delta V_s=V_s-0.5$ V. It is zero at standard conditions and 0.1 V in the second condition. This keeps $K$ and $a$ as the standard-condition characteristics.\n\nThe constant $K_M$ describes slope change per volt of supply change. The constant $K_I$ describes zero-output shift per volt of supply change. Their effects differ: one multiplies pressure, while the other adds to output at every pressure.\n\n$$\nO=[K+K_M\\Delta V_s]x+a+K_I\\Delta V_s\n$$"
        },
        {
          "id": "2023-uas-q5-step-4",
          "title": "Find the slope at a 0.6 V supply",
          "content": "Apply the same endpoint method to the second dataset. Its endpoints are (0,0) and (3,74.0), giving a slope of 24.6667 mV/barG.\n\nWe compare that slope with 19.5 mV/barG. A 0.1 V supply increase raises sensitivity; we still need to express that change per one volt.\n\n$$\nK_1=\\frac{74.0-0}{3-0}=24.6667\\ \\mathrm{mV/barG},\\qquad\\Delta K=24.6667-19.5=5.1667\\ \\mathrm{mV/barG}\n$$"
        },
        {
          "id": "2023-uas-q5-step-5",
          "title": "Separate sensitivity change from zero shift",
          "content": "We divide the sensitivity increase by the supply increase to obtain KM. The additional per-volt unit shows that KM is not pressure sensitivity itself.\n\nAt zero pressure, both datasets give 0 mV. Since zero output does not change between the conditions, KI=0.\n\nKI=0 does not mean supply has no effect. It still changes slope through the nonzero KM.\n\n$$\nK_M=\\frac{24.6667-19.5}{0.6-0.5}=\\boxed{51.6667\\ \\mathrm{mV/(barG\\,V)}},\\qquad K_I=\\frac{0-0}{0.1}=\\boxed{0\\ \\mathrm{mV/V}}\n$$\n\n> These constants describe endpoint-line changes. Intermediate points retain nonlinearity, which may itself vary with supply."
        },
        {
          "id": "2023-uas-q5-step-6",
          "title": "5c · Calculate ideal-line output at each pressure",
          "content": "Nonlinearity measures the data curve's departure from its straight reference line. At standard supply, the line is $O_{\\rm ideal}=19.5x$. At 1.5 barG, it gives $19.5(1.5)=29.25$ mV.\n\nThe actual datum at that pressure is 44.0 mV. Its deviation is 44.0−29.25=14.75 mV. Check every point before calling that the maximum.\n\n$$\nN(x)=O_{0.5}(x)-O_{\\rm ideal}(x)=O_{0.5}(x)-19.5x\n$$"
        },
        {
          "id": "2023-uas-q5-step-7",
          "title": "Find the largest deviation in the table",
          "content": "The table uses the 0.5 V data and its own reference line. Differences between the two supply conditions are not the nonlinearity being calculated.\n\nThe largest deviation is 14.75 mV at 1.5 barG. Both endpoint deviations are zero because the reference line passes through them; this does not make the intermediate points linear.\n\n$$\nN_{\\max}=\\max_x|N(x)|=14.75\\ \\mathrm{mV}\n$$\n\n| x (barG) | Output (mV) | Ideal line (mV) | Deviation (mV) |\n| --- | --- | --- | --- |\n| 0 | 0 | 0 | 0 |\n| 0.5 | 16.5 | 9.75 | 6.75 |\n| 1.0 | 32.0 | 19.5 | 12.5 |\n| 1.5 | 44.0 | 29.25 | 14.75 |\n| 2.0 | 51.5 | 39.0 | 12.5 |\n| 2.5 | 55.5 | 48.75 | 6.75 |\n| 3.0 | 58.5 | 58.5 | 0 |"
        },
        {
          "id": "2023-uas-q5-step-8",
          "title": "Divide by the full output span",
          "content": "Full-scale deflection, abbreviated f.s.d., is the output change across the input range. At standard conditions, output span is 58.5−0=58.5 mV.\n\nWe divide maximum deviation by that span, then multiply by 100%. Numerator and denominator are both in mV, so their ratio is dimensionless.\n\n$$\n\\%N_{\\max}=\\frac{14.75\\ \\mathrm{mV}}{58.5\\ \\mathrm{mV}}\\times100\\%=\\boxed{25.2137\\%\\ \\mathrm{f.s.d.}}\n$$"
        },
        {
          "id": "2023-uas-q5-step-9",
          "title": "Interpret the model and its limits",
          "content": "K and a describe the standard-supply endpoint line. KM and KI describe how that endpoint line changes with supply. Intermediate data retain nonlinearity that these four constants do not remove.\n\nThe value 25.2137% is the largest deviation relative to full output span, not a percentage of pressure at one point. If regression were chosen as the reference, sensitivity and nonlinearity calculations would all need to use that new line."
        }
      ],
      "finalAnswer": "Using endpoint lines: K=19.5 mV/barG, a=0, KM=51.6667 mV/(barG·V), KI=0. Maximum nonlinearity is 25.2137% f.s.d.\n\n$$\n\\boxed{\\begin{aligned}K&=19.5\\ \\mathrm{mV/barG},&a&=0\\\\K_M&=51.6667\\ \\mathrm{mV/(barG\\,V)},&K_I&=0\\\\N_{\\max}&=25.2137\\%\\ \\mathrm{f.s.d.}\\end{aligned}}\n$$",
      "takeaway": "Do not normalize an error using a range different from the stated reference."
    },
    "ipe-calibration-practice": {
      "title": "Practice: Calibration and disturbances",
      "intro": "This practice helps you choose a model and explain your reasoning. Start with multiple-choice questions, review a flawed example, then write your own answer. Use the rubric to check your logic, assumptions, and conclusion limits.",
      "questions": [
        {
          "id": "concept-2023-02",
          "prompt": "After a force sensor's supply is increased, its calibration line becomes steeper, while its zero-force output stays unchanged. Which conclusion best fits this linear model?",
          "options": [
            {
              "id": "concept-2023-02-option-1",
              "label": "Supply changes sensitivity; this evidence does not show a zero shift.",
              "feedback": "Correct. A slope change indicates an input that modifies sensitivity, rather than a fixed additive offset."
            },
            {
              "id": "concept-2023-02-option-2",
              "label": "Supply has no effect because zero output stays unchanged.",
              "feedback": "Zero output tests only the offset. Sensitivity can change even when the zero point stays fixed."
            },
            {
              "id": "concept-2023-02-option-3",
              "label": "Supply adds the same offset at every force.",
              "feedback": "A uniform offset would shift the entire line, including the zero-force point. Here that point stays fixed."
            },
            {
              "id": "concept-2023-02-option-4",
              "label": "Every supply-induced difference must be called nonlinearity.",
              "feedback": "Two straight lines can have different slopes without either line being nonlinear."
            }
          ],
          "explanation": "Slope expresses output change per force change. A steeper line means sensitivity has changed. An unchanged intercept means no zero shift in that line. Nonlinearity requires checking departures from a line rather than merely comparing two slopes."
        },
        {
          "id": "concept-2024-06",
          "prompt": "When ambient temperature changes, an entire current and pressure calibration curve shifts upward by the same current amount. Its slope stays fixed. Which disturbance change best describes this?",
          "options": [
            {
              "id": "concept-2024-06-option-1",
              "label": "Pressure sensitivity increases while zero output stays fixed.",
              "feedback": "A sensitivity change makes curve separation depend on pressure, contradicting the equal shift at all points."
            },
            {
              "id": "concept-2024-06-option-2",
              "label": "Output offset changes while pressure sensitivity stays fixed.",
              "feedback": "Correct. The curve translates without changing slope, so the effect is a zero-shift disturbance."
            },
            {
              "id": "concept-2024-06-option-3",
              "label": "Instrument resolution increases, making the curve appear higher.",
              "feedback": "Resolution is the smallest distinguishable change. A calibration-curve shift does not establish a resolution change."
            },
            {
              "id": "concept-2024-06-option-4",
              "label": "Only nonlinearity increases, because any environmental change must bend the curve.",
              "feedback": "Translating a whole curve does not by itself change its curvature. Nonlinearity concerns its shape relative to a reference line."
            }
          ],
          "explanation": "An equal shift at every input adds an output term independent of pressure. The uniform shift changes the offset. A sensitivity change would make the output difference vary with pressure."
        },
        {
          "id": "concept-2025-06",
          "prompt": "Two temperature sensors give the same final reading at every reference temperature. During rapid temperature changes, however, one lags far behind. Which conclusion is best?",
          "options": [
            {
              "id": "concept-2025-06-option-1",
              "label": "Matching static calibration guarantees both sensors suit every temperature change.",
              "feedback": "Matching final values do not fully describe response time."
            },
            {
              "id": "concept-2025-06-option-2",
              "label": "They can have similar static behavior, but their dynamic responses need comparison for fast measurements.",
              "feedback": "Correct. Separate steady-state agreement from the ability to follow change."
            },
            {
              "id": "concept-2025-06-option-3",
              "label": "The slower sensor must have a larger steady-state offset.",
              "feedback": "Lag can occur even when both final offsets are zero."
            },
            {
              "id": "concept-2025-06-option-4",
              "label": "Adding display digits will make the slower sensor track temperature faster.",
              "feedback": "Digits affect display resolution, not the physical response time."
            }
          ],
          "explanation": "Static calibration evaluates the relation after settling. It does not determine how quickly the sensor reaches that value or how amplitude and phase change with an oscillating input. Sensor selection for rapid changes requires suitable dynamic tests."
        },
        {
          "id": "concept-2025-07",
          "prompt": "At the same liquid height, a sensor gives different outputs while the tank fills and drains. Which comparison correctly assesses hysteresis?",
          "options": [
            {
              "id": "concept-2025-07-option-1",
              "label": "Compare each point with a straight line, ignoring the direction of level change.",
              "feedback": "That assesses nonlinearity relative to a chosen line, not specifically separation between the two paths."
            },
            {
              "id": "concept-2025-07-option-2",
              "label": "Compare the lowest-level output with the highest-level output.",
              "feedback": "Subtracting the endpoints gives output span. You can use that span to normalize a percentage, but it does not measure hysteresis."
            },
            {
              "id": "concept-2025-07-option-3",
              "label": "Compare two outputs at the same time even if the liquid heights differ.",
              "feedback": "Different inputs also change output. That comparison mixes level change with hysteresis."
            },
            {
              "id": "concept-2025-07-option-4",
              "label": "Compare rising and falling outputs at the same input, then find the largest separation.",
              "feedback": "Correct. Holding input equal makes the difference reveal the direction/history effect."
            }
          ],
          "explanation": "Hysteresis means output depends on the input’s directional history. To isolate that effect, compare both paths at the same input value. Distance from a reference line assesses nonlinearity and does not replace the two-direction comparison."
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-calibration-guided",
          "title": "Review a changed calibration curve",
          "prompt": "Two parallel curves have a constant output difference. Review the following reasoning.",
          "workSample": "The second curve is higher. Every output has increased. Therefore, sensor sensitivity must have increased.",
          "question": {
            "prompt": "Which conclusion matches two parallel curves?",
            "options": [
              {
                "id": "ipe-calibration-guided-question-option-1",
                "label": "The zero changes while sensitivity stays the same.",
                "feedback": "Correct. Parallel curves share a slope and have different intercepts."
              },
              {
                "id": "ipe-calibration-guided-question-option-2",
                "label": "Sensitivity changes because every output is higher.",
                "feedback": "Higher outputs alone do not establish a sensitivity change. You need to check the slope."
              },
              {
                "id": "ipe-calibration-guided-question-option-3",
                "label": "The two curves prove hysteresis.",
                "feedback": "Hysteresis requires comparing rising and falling paths. The question only states that two curves are parallel."
              }
            ],
            "explanation": "Sensitivity follows the slope. Parallel lines have equal output changes for equal input changes. The curve shift belongs to the intercept term."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-calibration-essay",
          "title": "Choose the calibration tests you need",
          "prompt": "A level sensor gives different outputs while a tank fills and drains. Its supply also changes during testing. Plan how to distinguish hysteresis from supply effects. Explain the data, comparisons, and limits of your conclusion.",
          "sections": [
            "Model and assumptions",
            "Reasoning",
            "Conclusion and limits"
          ],
          "hints": [
            "We need to change one condition at a time.",
            "Compare rising and falling paths at the same level and supply.",
            "Test direction with a fixed supply. Then test supply changes while keeping the direction the same."
          ],
          "rubric": [
            {
              "id": "ipe-calibration-rubric-model",
              "label": "Model and assumptions",
              "fullCredit": "Distinguishes hysteresis from supply-induced zero or sensitivity changes.",
              "commonPartialError": "Do not normalize an error using a range different from the stated reference."
            },
            {
              "id": "ipe-calibration-rubric-reasoning",
              "label": "Reasoning",
              "fullCredit": "Controls supply and direction, then compares outputs at the same level."
            },
            {
              "id": "ipe-calibration-rubric-conclusion",
              "label": "Conclusion and limits",
              "fullCredit": "Limits the conclusion to the tested range and conditions without claiming dynamic performance."
            }
          ],
          "verifiedOutline": "Hold the supply fixed while recording rising and falling level paths. Compare outputs at the same level to assess hysteresis. Repeat with another supply while holding the direction constant. Check whether supply changes shift the intercept, slope, or both. Report the tested range and conditions. These calibration tests do not establish response to rapid level changes."
        }
      ]
    }
  }
};

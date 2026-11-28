import type { CourseModule, CourseTranslation } from '@tutor/core';

export const module: CourseModule = {
  "id": "ipe-dynamics",
  "code": "M4",
  "title": "Respons waktu dan frekuensi",
  "items": [
    {
      "id": "ipe-dynamics-material",
      "kind": "material",
      "slug": "ipe-dynamics-material",
      "title": "Periksa apakah sensor mengikuti perubahan",
      "estimatedMinutes": 6,
      "examHook": {
        "prompt": "Dua sensor menunjukkan suhu akhir yang sama. Salah satunya lambat saat suhu berubah. Sensor mana yang sesuai untuk mengamati perubahan cepat?",
        "targetOutcome": "Anda dapat menilai keterlambatan, amplitudo, dan batas frekuensi sensor."
      },
      "body": "Kalibrasi statik memeriksa hasil setelah keadaan menetap. Masukan yang berubah memerlukan pemeriksaan waktu respons. Anda perlu menilai seberapa cepat dan seberapa tepat sensor mengikuti perubahan.\n\nUntuk masukan berulang, periksa amplitudo dan fase secara terpisah. Amplitudo yang sesuai belum menjamin waktu puncak yang sesuai.\n\n[Buka pembahasan bertahap: Amplitudo, fase, dan lebar pita sensor gaya](?item=2025-uts1-q3).",
      "microUnits": [
        {
          "id": "ipe-dynamics-principle",
          "title": "Pilih model dari kondisi soal",
          "intuition": "Sensor suhu membutuhkan waktu untuk menyerap atau melepas panas. Model **orde satu** (model dengan satu konstanta waktu) menjelaskan pendekatan bertahap menuju nilai akhir. Saat kondisi lingkungan berganti, suhu sensor tetap menerus. Laju perubahannya dapat berubah karena konstanta waktu berubah.",
          "formal": "Untuk perubahan mendadak dengan model orde satu:\n\n$$y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}.$$\n\n$y_0$ adalah keadaan awal, $y_\\infty$ nilai akhir, dan $\\tau$ konstanta waktu.",
          "validityBounds": "Persamaan ini memakai konstanta waktu tetap dalam satu interval. Pecah interval saat kondisi berubah. Model orde dua juga memerlukan frekuensi alami dan redaman. Jangan membawa sensitivitas statik ke semua frekuensi.",
          "decisionCheck": {
            "id": "ipe-dynamics-decision-question",
            "prompt": "Sensor mengikuti amplitudo dengan baik, tetapi puncaknya terlambat. Apakah sensor pasti sesuai untuk menentukan waktu kejadian?",
            "options": [
              {
                "id": "ipe-dynamics-decision-question-option-1",
                "label": "Belum; periksa keterlambatan terhadap toleransi waktu.",
                "feedback": "Tepat. Tugas waktu kejadian memerlukan batas keterlambatan yang sesuai."
              },
              {
                "id": "ipe-dynamics-decision-question-option-2",
                "label": "Ya; amplitudo yang benar menjamin fase yang benar.",
                "feedback": "Amplitudo dan fase merupakan dua bagian respons yang berbeda.",
                "misconceptionTag": "dynamics-decision-choice-2"
              },
              {
                "id": "ipe-dynamics-decision-question-option-3",
                "label": "Ya; kalibrasi statik sudah mencakup semua frekuensi.",
                "feedback": "Kalibrasi statik memeriksa keadaan menetap, bukan seluruh respons frekuensi.",
                "misconceptionTag": "dynamics-decision-choice-3"
              }
            ],
            "correctOptionId": "ipe-dynamics-decision-question-option-1",
            "explanation": "Pilih ukuran galat sesuai tugas. Untuk waktu kejadian, respons fase atau beda waktu perlu diperiksa secara khusus."
          }
        }
      ],
      "checkpoints": [
        "Anda dapat menilai keterlambatan, amplitudo, dan batas frekuensi sensor.",
        "Keadaan awal dan model dinamik menentukan respons sebelum sensor mencapai nilai akhir.",
        "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
      ],
      "derivations": [
        {
          "id": "ipe-dynamics-sources",
          "title": "Sumber dan cara membaca arsip",
          "content": "[Arsip soal UTS 1, UTS 2, dan UAS 2023 sampai 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Tahun mengikuti folder arsip; tanggal pada naskah dapat berbeda.\n\n[Materi utama: Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view). Setiap pembahasan menyertakan naskah sumber, halaman, dan asumsi yang relevan."
        }
      ]
    },
    {
      "id": "2025-uts1-q3",
      "kind": "problem",
      "slug": "2025-uts1-q3",
      "title": "Amplitudo, fase, dan lebar pita sensor gaya",
      "source": "UTS 1 2025 · Soal 3",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
        "file": "2025-uts1.pdf",
        "pages": [
          2
        ],
        "original": "3. [25%] Dynamic Characteristics of Measurement Systems\nA force sensor is a typical second-order system with natural frequency of ωn = 1000 Hz and damping ratio coefficient of ζ = 0.7. The sensor is used to measure a sinusoidal force of 600 Hz.\na. [10%] Calculate the ratio between output and input amplitudes.\nb. [5%] Calculate the phase difference between output and input.\nc. [5%] Calculate the system dynamic amplitude error in percent.\nd. [5%] Determine the bandwidth of the force sensor.\nUseful formulas supplied on the same page:\n\\[G(s)=\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_ns+\\omega_n^2},\\qquad \\omega_b=\\omega_n\\sqrt{(1-2\\zeta^2)+\\sqrt{4\\zeta^4-4\\zeta^2+2}}.\\]",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Angka 1000 diberi satuan Hz pada naskah, sehingga diartikan sebagai fn=1000 Hz meskipun simbolnya tertulis ωn. Frekuensi sudutnya 2π×1000 rad/s.",
        "Gunakan keadaan tunak sinusoidal, model linear orde dua dengan gain statik 1, dan batas setengah daya terhadap gain statik.",
        "Galat amplitudo bertanda memakai keluaran dikurangi ideal. Nilai mutlak menyatakan besar galat."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2025,
        "number": 3
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Respons waktu dan frekuensi"
      ],
      "statement": "Sensor gaya mengikuti model orde dua. Naskah menulis frekuensi alami $\\omega_n=1000\\ \\mathrm{Hz}$, dengan rasio redaman $\\zeta=0.7$. Gaya masukan berbentuk sinus dengan frekuensi 600 Hz.\nTentukan (a) rasio amplitudo keluaran terhadap masukan, (b) selisih fase, (c) galat amplitudo dinamik dalam persen, dan (d) lebar pita sensor. Gunakan fungsi alih orde dua pada naskah. Perhatikan bahwa simbol ω biasanya memakai rad/s, sedangkan soal memberi Hz.",
      "simulation": {
        "id": "2025-uts1-q3-visual",
        "type": "ipe-frequency",
        "title": "Respons frekuensi",
        "caption": "Ubah frekuensi masukan dan perhatikan perubahan amplitudo serta fase. Frekuensi alami pada kendali ini memakai Hz; gain statik model sama dengan 1.",
        "params": [
          {
            "key": "frequency",
            "label": "Frekuensi masukan",
            "min": 0,
            "max": 2500,
            "step": 5,
            "defaultValue": 600,
            "unit": "Hz"
          },
          {
            "key": "zeta",
            "label": "Rasio redaman ζ",
            "min": 0.1,
            "max": 1.5,
            "step": 0.05,
            "defaultValue": 0.7
          }
        ],
        "data": {
          "order": 2,
          "fn": 1000,
          "zeta": 0.7,
          "frequency": 600,
          "visualKind": "frequency"
        }
      },
      "steps": [
        {
          "id": "2025-uts1-q3-step-1",
          "title": "1. Tentukan apa yang berubah pada sinyal sinus",
          "content": "Kita membandingkan bentuk gelombang masukan dan keluaran setelah gejala awal mereda. Dalam keadaan tunak ini, frekuensi sinus tetap sama, tetapi tinggi puncak dan waktunya dapat berubah. **Rasio amplitudo** $M$ membandingkan tinggi gelombang keluaran dengan masukan. **Fase** $\\phi$ menyatakan pergeseran posisi gelombang dalam satu siklus, sehingga membantu menilai keterlambatan.\n\nFungsi alih yang diberikan memiliki gain statik 1, karena $G(0)=1$. Jadi, keluaran dalam pembahasan ini sudah dinormalkan terhadap sensitivitas statik sensor; kita tidak memerlukan nilai sensitivitas listrik lain.\n\n$$\nF_{\\rm in}=A\\sin(2\\pi ft),\\qquad F_{\\rm out,norm}=MA\\sin(2\\pi ft+\\phi)\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Keadaan awal dan model dinamik menentukan respons sebelum sensor mencapai nilai akhir.",
            "commonPitfall": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
          },
          "checkpoint": {
            "prompt": "Sensor gaya menghasilkan gelombang sinus dengan amplitudo hampir sama seperti acuan, tetapi puncaknya muncul lebih lambat. Sistem akan dipakai untuk membandingkan waktu kejadian dengan sensor lain. Kesimpulan mana yang tepat?",
            "options": [
              {
                "id": "2025-uts1-q3-checkpoint-option-1",
                "label": "Respons amplitudo dan fase perlu dinilai terpisah; keterlambatan dapat mengganggu perbandingan waktu meskipun amplitudo cukup baik.",
                "feedback": "Tepat. Kecocokan amplitudo tidak cukup untuk menjamin kecocokan waktu."
              },
              {
                "id": "2025-uts1-q3-checkpoint-option-2",
                "label": "Amplitudo yang hampir sama membuktikan beda fase juga hampir nol.",
                "feedback": "Besar penguatan tidak menentukan fase secara langsung pada satu titik pengukuran.",
                "misconceptionTag": "concept-2025-03-choice-2"
              },
              {
                "id": "2025-uts1-q3-checkpoint-option-3",
                "label": "Keterlambatan boleh diabaikan karena kalibrasi dinamik hanya menilai besar sinyal.",
                "feedback": "Kalibrasi dinamik juga menilai fase atau waktu tanggap; keduanya penting untuk urutan kejadian.",
                "misconceptionTag": "concept-2025-03-choice-3"
              },
              {
                "id": "2025-uts1-q3-checkpoint-option-4",
                "label": "Puncak yang terlambat selalu berarti polaritas sensor terbalik.",
                "feedback": "Pembalikan polaritas memberi pergeseran tertentu, tetapi keterlambatan umum dapat berasal dari respons dinamik biasa.",
                "misconceptionTag": "concept-2025-03-choice-4"
              }
            ],
            "correctOptionId": "2025-uts1-q3-checkpoint-option-1"
          }
        },
        {
          "id": "2025-uts1-q3-step-2",
          "title": "2. Samakan jenis satuan frekuensi",
          "content": "Naskah menulis $\\omega_n$ tetapi memberi satuan Hz. Kita mengikuti angka dan satuan yang tertulis: frekuensi alami $f_n=1000\\ \\mathrm{Hz}$. Jika memakai frekuensi sudut, ubah keduanya dengan $\\omega=2\\pi f$.\n\nRasio frekuensi $r$ tetap sama karena faktor $2\\pi$ saling menghapus. Jangan membagi satu nilai dalam rad/s dengan nilai lain dalam Hz.\n\n$$\n\\omega_n=2\\pi(1000)=6283.19\\ \\mathrm{rad/s},\\quad\\omega=2\\pi(600)=3769.91\\ \\mathrm{rad/s}\\\\r=\\frac{\\omega}{\\omega_n}=\\frac{f}{f_n}=\\frac{600}{1000}=0.6\n$$"
        },
        {
          "id": "2025-uts1-q3-step-3",
          "title": "3. Bentuk respons frekuensi dari fungsi alih",
          "content": "Untuk masukan sinus, gantikan $s$ dengan $j\\omega$. Huruf $j$ menyatakan akar dari −1; karena $j^2=-1$, suku $s^2$ berubah menjadi $-\\omega^2$. Bagi pembilang dan penyebut dengan $\\omega_n^2$ agar persamaan hanya memakai rasio $r$.\n\n$$\nG(j\\omega)=\\frac{\\omega_n^2}{\\omega_n^2-\\omega^2+j2\\zeta\\omega_n\\omega}=\\frac1{(1-r^2)+j(2\\zeta r)}\\\\1-r^2=1-0.6^2=0.64,\\qquad2\\zeta r=2(0.7)(0.6)=0.84\n$$"
        },
        {
          "id": "2025-uts1-q3-step-4",
          "title": "4. Hitung rasio amplitudo dari besar bilangan kompleks",
          "content": "Besar penyebut $0.64+j0.84$ ialah akar jumlah kuadrat kedua bagiannya. Pembilangnya bernilai 1. Oleh karena itu, rasio amplitudo merupakan kebalikan besar penyebut itu.\n\nJadi, amplitudo keluaran sekitar 94.69% dari amplitudo ideal setelah koreksi sensitivitas statik. Sebagai contoh, jika amplitudo acuan 1 N, indikasi amplitudonya sekitar 0.9469 N.\n\n$$\nM=|G|=\\frac1{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}}=\\frac1{\\sqrt{0.64^2+0.84^2}}=\\frac1{\\sqrt{1.1152}}=0.9469425\n$$"
        },
        {
          "id": "2025-uts1-q3-step-5",
          "title": "5. Hitung fase dan jelaskan arti tanda negatif",
          "content": "Penyebut mempunyai sudut positif. Fungsi alih membagi dengan penyebut tersebut, sehingga fase keluaran menjadi negatif. Gunakan $\\operatorname{atan2}$ agar pilihan kuadran tetap benar saat frekuensi melintasi frekuensi alami.\n\nFase −52.70° berarti keluaran tertinggal terhadap masukan. Pada 600 Hz, selang waktu antara puncak yang bersesuaian sekitar 0.244 ms. Pengaruh tersebut berbeda dari besarnya penurunan amplitudo.\n\n$$\n\\phi=-\\operatorname{atan2}(0.84,0.64)=-52.6961^\\circ\\\\\\Delta t=\\frac{52.6961}{360(600)}=2.43963\\times10^{-4}\\ \\mathrm s\n$$"
        },
        {
          "id": "2025-uts1-q3-step-6",
          "title": "6. Ubah selisih amplitudo menjadi persen",
          "content": "Amplitudo ideal yang telah dinormalkan mempunyai rasio 1. Kurangi 1 dari $M$, lalu kalikan 100%. Tanda negatif menyatakan amplitudo terbaca lebih kecil; bila yang diminta hanya besar galat, laporkan nilai mutlaknya.\n\nFase tidak masuk ke rumus galat amplitudo ini. Dua sinyal dapat memiliki amplitudo hampir sama sekaligus berbeda fase cukup besar.\n\n$$\n\\varepsilon_A=(M-1)100\\%=(0.9469425-1)100\\%=-5.30575\\%\\\\|\\varepsilon_A|=5.30575\\%\n$$"
        },
        {
          "id": "2025-uts1-q3-step-7",
          "title": "7. Tentukan arti lebar pita yang digunakan",
          "content": "Kita memakai batas setengah daya relatif terhadap gain statik. Pada batas ini, amplitudo turun ke $1/\\sqrt2$ dari nilai frekuensi rendah. Batas ini lazim disebut −3 dB, tepatnya −3.0103 dB. Dengan definisi ini, lebar pita dimulai dari 0 Hz dan berakhir di $f_b$. Ukuran ini bukan batas ketika galat amplitudo masih 5%; syarat itu akan memberi frekuensi lain.\n\n$$\nM(r_b)=\\frac1{\\sqrt2}\\quad\\Longrightarrow\\quad(1-r_b^2)^2+4\\zeta^2r_b^2=2\n$$"
        },
        {
          "id": "2025-uts1-q3-step-8",
          "title": "8. Selesaikan batas lebar pita tanpa melewati aljabarnya",
          "content": "Kembangkan kuadrat, pindahkan 2 ke ruas kiri, lalu gunakan $u=r_b^2$. Persamaan menjadi kuadrat dalam $u$. Pilih akar positif karena $r_b^2$ tidak mungkin negatif, kemudian ambil akar lagi untuk memperoleh $r_b$.\n\n$$\nr_b^4+(4\\zeta^2-2)r_b^2-1=0\\\\u^2+(4(0.7)^2-2)u-1=u^2-0.04u-1=0\\\\u=0.02+\\sqrt{1.0004}=1.02019998\\\\r_b=\\sqrt u=1.01004949\n$$"
        },
        {
          "id": "2025-uts1-q3-step-9",
          "title": "9. Kembalikan rasio ke Hz dan cek hasilnya",
          "content": "Kalikan $r_b$ dengan frekuensi alami 1000 Hz. Hasilnya sedikit di atas 1000 Hz. Hal ini masuk akal: tepat pada frekuensi alami, rasio amplitudo $1/(2\\zeta)=0.7143$, yang masih sedikit di atas batas 0.7071.\n\nSinyal 600 Hz masih di dalam lebar pita −3 dB. Namun, amplitudonya tetap turun 5.31% dan fasenya tertinggal 52.70°. Berada di dalam lebar pita tidak berarti bebas galat.\n\n$$\nf_b=r_bf_n=1.01004949(1000)=1010.0495\\ \\mathrm{Hz}\\approx1.010\\ \\mathrm{kHz}\n$$"
        }
      ],
      "finalAnswer": "Rasio amplitudo 0.946943; fase keluaran −52.696° terhadap masukan. Galat amplitudo bertanda −5.30575% (besar galat 5.30575%). Dengan batas setengah daya dan frekuensi alami 1000 Hz, lebar pita sekitar 0 sampai 1010.05 Hz.\n\n$$\n\\boxed{M=0.946943,\\quad\\phi=-52.696^\\circ,\\quad\\varepsilon_A=-5.30575\\%,\\quad f_b=1010.05\\ \\mathrm{Hz}}\n$$",
      "takeaway": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
    },
    {
      "id": "2025-uas-q6",
      "kind": "problem",
      "slug": "2025-uas-q6",
      "title": "Batas frekuensi dan sensitivitas silang",
      "source": "UAS 2025 · Soal 6",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
        "file": "2025-uas.pdf",
        "pages": [
          3
        ],
        "original": "6. [15%] Dynamic Characteristic of Measurement System\nFigure 2 depicts the sensitivity of a piezoelectric accelerometer. Suppose its sensitivity is 100 mV/g and it is valid over a frequency range from 1 to 10,000 Hz.\na. [5%] What happens to the sensor sensitivity if we operate it at a frequency of 0.5 Hz?\nb. [5%] What happens to the sensor sensitivity if we operate it at a frequency above 10,000 Hz (for example, at 25,000 Hz)?\nc. [5%] What is meant by cross-sensitivity of an accelerometer? If the cross-sensitivity of this accelerometer is 5 mV/g, what does it mean?\nFigure 2: normalized magnitude and phase response; low-frequency attenuation, approximately flat intermediate response, a high-frequency resonance peak, then roll-off. The horizontal graph axis is labelled ω.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
          "pages": [
            18,
            19
          ]
        }
      },
      "assumptions": [
        "Kurva sumber bersifat kualitatif dan sumbunya memakai rad/s. Jangan membaca angka sumbu ω sebagai Hz. Tidak ada frekuensi alami, redaman, atau parameter rangkaian yang cukup untuk menghitung sensitivitas tepat di luar pita."
      ],
      "exam": {
        "term": "UAS",
        "year": 2025,
        "number": 6
      },
      "difficulty": "menengah",
      "estimatedMinutes": 16,
      "tags": [
        "Respons waktu dan frekuensi"
      ],
      "statement": "Akselerometer piezoelektrik memiliki sensitivitas nominal $100\\ \\mathrm{mV/g}$, yang berlaku pada rentang $1$ hingga $10000\\ \\mathrm{Hz}$. Kurva sumber menunjukkan penurunan di frekuensi rendah, daerah datar, puncak resonansi, lalu penurunan di frekuensi tinggi.\n(a) Apa yang terjadi pada $0.5\\ \\mathrm{Hz}$? (b) Apa yang terjadi di atas $10000\\ \\mathrm{Hz}$, misalnya $25000\\ \\mathrm{Hz}$? (c) Apa arti sensitivitas silang $5\\ \\mathrm{mV/g}$?",
      "simulation": {
        "id": "2025-uas-q6-visual",
        "type": "ipe-accelerometer",
        "title": "Akselerometer",
        "caption": "Kurva menjelaskan daerah kerja dan resonansi secara kualitatif; bukan kalibrasi numerik tambahan.",
        "params": [
          {
            "key": "frequency",
            "label": "Frekuensi masukan",
            "min": 0.1,
            "max": 30000,
            "step": 0.1,
            "defaultValue": 25000,
            "unit": "Hz"
          }
        ],
        "data": {
          "mode": "bandwidth",
          "sensitivity": 100,
          "fMin": 1,
          "fMax": 10000,
          "frequency": 25000,
          "crossSensitivity": 5,
          "qualitative": 1,
          "visualKind": "accelerometer"
        }
      },
      "steps": [
        {
          "id": "2025-uas-q6-step-1",
          "title": "1. Pakai sensitivitas nominal hanya dalam rentangnya",
          "content": "Kita memakai sensitivitas untuk menghubungkan percepatan dengan tegangan. **Sensitivitas** (perubahan keluaran per satuan masukan) sebesar $100\\ \\mathrm{mV/g}$ memberi sekitar 100 mV untuk percepatan 1 g. Nilai ini berlaku pada sumbu ukur dan rentang frekuensi yang dinyatakan. Satuan g berarti percepatan gravitasi standar, bukan gram.\n\nAngka sensitivitas perlu dibaca bersama rentang frekuensinya. Spesifikasi soal menetapkan rentang 1 sampai 10000 Hz. Kita memakai sensitivitas 100 mV/g dalam rentang tersebut, bukan untuk setiap gerak.\n\n$$\nV_{\\mathrm{out}}\\approx Sa,\\qquad S=100\\ \\mathrm{mV/g},\\quad 1g\\approx9.80665\\ \\mathrm{m/s^2}\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Keadaan awal dan model dinamik menentukan respons sebelum sensor mencapai nilai akhir.",
            "commonPitfall": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
          },
          "checkpoint": {
            "prompt": "Accelerometer piezoelektrik memiliki sensitivitas nominal hanya dalam pita yang dinyatakan. Ketika sinyal melampaui batas atas pita, apa yang paling tepat dilakukan?",
            "options": [
              {
                "id": "2025-uas-q6-checkpoint-option-1",
                "label": "Tetap gunakan sensitivitas nominal karena semua sensor memiliki penguatan tetap pada semua frekuensi.",
                "feedback": "Sensitivitas bergantung pada respons dinamik; nilai nominal tidak berlaku tanpa batas.",
                "misconceptionTag": "concept-2025-10-choice-1"
              },
              {
                "id": "2025-uas-q6-checkpoint-option-2",
                "label": "Periksa respons frekuensi atau kalibrasi yang sesuai; resonansi dan pelemahan dapat membuat konversi nominal keliru.",
                "feedback": "Tepat. Keputusan memakai atau mengoreksi pembacaan perlu dukungan respons yang sesuai."
              },
              {
                "id": "2025-uas-q6-checkpoint-option-3",
                "label": "Anggap semua frekuensi di atas pita pasti menghasilkan keluaran lebih besar.",
                "feedback": "Puncak resonansi tidak berarti seluruh daerah frekuensi lebih tinggi terus menguat.",
                "misconceptionTag": "concept-2025-10-choice-3"
              },
              {
                "id": "2025-uas-q6-checkpoint-option-4",
                "label": "Abaikan arah pemasangan karena kesalahan frekuensi menghapus sensitivitas silang.",
                "feedback": "Sensitivitas silang adalah respons terhadap sumbu lain dan tetap dapat menambah galat.",
                "misconceptionTag": "concept-2025-10-choice-4"
              }
            ],
            "correctOptionId": "2025-uas-q6-checkpoint-option-2"
          }
        },
        {
          "id": "2025-uas-q6-step-2",
          "title": "2. Pisahkan kesalahan amplitudo, fase, dan arah",
          "content": "Untuk getaran sinus, sensor dapat mengubah besar sinyal dan menggeser waktunya. Selain itu, percepatan dari sumbu lain dapat ikut terbaca. Soal menguji tiga hal ini melalui frekuensi rendah, frekuensi tinggi, dan sensitivitas silang."
        },
        {
          "id": "2025-uas-q6-step-3",
          "title": "3. Jelaskan respons pada 0.5 Hz",
          "content": "0.5 Hz berada di bawah batas 1 Hz. Muatan piezoelektrik dan rangkaian pembacanya tidak mempertahankan respons terhadap perubahan yang sangat lambat. Keluaran melemah, sehingga sensitivitas efektif lebih kecil dari nominal dan fase dapat berubah. Nilai tepat tidak tersedia dari data soal.\n\nPiezoelektrik menghasilkan muatan ketika gaya berubah, tetapi jalur kebocoran dan rangkaian pembaca membuat respons sangat lambat sulit dipertahankan. Oleh karena itu, alat ini bukan pilihan langsung untuk membaca percepatan konstan tanpa batas waktu."
        },
        {
          "id": "2025-uas-q6-step-4",
          "title": "4. Bandingkan respons tinggi dengan bagian datar kurva",
          "content": "Di bagian datar, penguatan relatif mendekati nilai nominal. Mendekati resonansi mekanik, gerak internal dapat membesar dan menghasilkan puncak keluaran. Batas 10 kHz memberi tahu kapan kita harus berhenti menganggap sensitivitas nominal tetap berlaku."
        },
        {
          "id": "2025-uas-q6-step-5",
          "title": "5. Bedakan daerah resonansi dan daerah setelahnya",
          "content": "Di atas 10 kHz, sensitivitas tidak lagi terjamin 100 mV/g. Pada bagian kurva yang mendekati resonansi, keluaran membesar sehingga percepatan tampak terlalu tinggi jika dibagi sensitivitas nominal. Jauh setelah resonansi, keluaran kembali turun. Jadi, jangan menyatakan semua frekuensi di atas 10 kHz selalu menaikkan keluaran.\n\nContoh 25 kHz berada di luar pita yang valid. Kurva memakai $\\omega$, sehingga ubah dahulu: $\\omega=2\\pi f$. Kurva kualitatif mengisyaratkan pengaruh resonansi, tetapi tidak memberi angka sensitivitas yang cukup pasti untuk dihitung.\n\nTanpa titik kalibrasi atau fungsi transfer yang lengkap, jangan mengambil satu angka penguatan dari bentuk kurva kualitatif. Jawaban yang didukung data adalah arah kecenderungan dan status di luar rentang, bukan koreksi numerik pasti.\n\n$$\nf=25000\\ \\mathrm{Hz}\\quad\\Longrightarrow\\quad\\omega=2\\pi f\\approx1.571\\times10^5\\ \\mathrm{rad/s}\n$$"
        },
        {
          "id": "2025-uas-q6-step-6",
          "title": "6. Gunakan satuan frekuensi yang sama sebelum membandingkan",
          "content": "Hz menghitung siklus per detik, sedangkan rad/s menghitung sudut fase per detik. Satu siklus mengandung $2\\pi$ radian. Jadi, angka 25000 Hz tidak boleh ditempatkan langsung di posisi 25000 pada sumbu $\\omega$.\n\n$$\n\\omega=2\\pi f,\\qquad f=\\frac{\\omega}{2\\pi}\n$$"
        },
        {
          "id": "2025-uas-q6-step-7",
          "title": "7. Tafsirkan sensitivitas silang",
          "content": "Sensitivitas silang ialah respons terhadap percepatan yang tegak lurus sumbu ukur utama. Nilai 5 mV/g berarti percepatan 1 g pada sumbu melintang dapat menambah sekitar 5 mV pada keluaran. Jika kita menganggap semua keluaran berasal dari sumbu utama, ini setara galat terbaca 0.05 g.\n\nKonversi 0.05 g adalah pembacaan semu pada sumbu utama jika seluruh 5 mV dianggap berasal dari sensitivitas utama. Sensor tidak sedang menyatakan percepatan melintang 0.05 g; masukan melintangnya tetap 1 g dalam contoh ini.\n\n$$\n\\frac{S_{\\perp}}{S_{\\parallel}}\\,100\\%=\\frac5{100}\\,100\\%=5\\%,\\qquad a_{\\mathrm{apparent}}=\\frac{5\\ \\mathrm{mV}}{100\\ \\mathrm{mV/g}}=0.05g\n$$"
        },
        {
          "id": "2025-uas-q6-step-8",
          "title": "8. Hubungkan hasil dengan keputusan pengukuran",
          "content": "Untuk mengurangi galat, pilih sensor dengan rentang frekuensi yang mencakup sinyal, pasang sumbu ukurnya dengan benar, dan cek gerak melintang. Kalibrasi sensitivitas tunggal tidak mengatasi semua galat bila frekuensi atau arah pemakaian berubah."
        }
      ],
      "finalAnswer": "Pada 0.5 Hz, respons melemah. Pada 25 kHz, nilai nominal tidak berlaku dan pengaruh resonansi dapat memperbesar bacaan; angka tepat tidak diberikan. Sensitivitas silang 5 mV/g berarti respons melintang 5% dari sensitivitas sumbu utama.\n\n$$\n\\boxed{S_{\\perp}/S_{\\parallel}=5\\%,\\qquad 1g_{\\perp}\\ \\Rightarrow\\ 0.05g\\ \\text{apparent}}\n$$",
      "takeaway": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
    },
    {
      "id": "2024-uts1-q4",
      "kind": "problem",
      "slug": "2024-uts1-q4",
      "title": "Respons suhu saat berpindah dari air ke udara",
      "source": "UTS 1 2024 · Soal 4",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
        "file": "2024-uts1.pdf",
        "pages": [
          1,
          2,
          3
        ],
        "original": "4. [20%] A temperature measurement system consists of linear elements and has an overall steady-state sensitivity of unity. The dynamics of the system are determined by the first-order transfer function of the sensing element. At time t = 0, the sensing element is suddenly transferred from air at 20°C to boiling water, i.e. 100°C. One minute later the element is suddenly transferred back to air. Using the data given below, (a) derive transfer function of the sensor, i.e. \\(G(s)=\\Delta T_{\\mathrm{out}}(s)/\\Delta T_{\\mathrm{in}}(s)\\). (b) Calculate the system dynamic error at the following times: t = 10, 20, 50, 120 and 300 s. Sensor data: mass \\(M=5\\times10^{-2}\\ \\mathrm{kg}\\); surface area \\(A=10^{-3}\\ \\mathrm{m^2}\\); specific heat \\(C=0.2\\ \\mathrm{J\\,kg^{-1}\\,{}^\\circ C^{-1}}\\); heat-transfer coefficient for air \\(U_a=0.2\\ \\mathrm{W\\,m^{-2}\\,{}^\\circ C^{-1}}\\); heat-transfer coefficient for water \\(U_w=1.0\\ \\mathrm{W\\,m^{-2}\\,{}^\\circ C^{-1}}\\); time constant \\(\\tau=MC/(UA)\\). The appendix gives Laplace transform pairs.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Sensor dianggap bersuhu seragam dan mula-mula setimbang pada 20°C. Nilai sifat termal mengikuti angka cetak soal, termasuk C=0,2 J/(kg·°C).",
        "Galat bertanda didefinisikan sebagai suhu keluaran dikurangi suhu masukan. Nilai mutlaknya tetap sama jika konvensi tanda dibalik."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2024,
        "number": 4
      },
      "difficulty": "menengah",
      "estimatedMinutes": 22,
      "tags": [
        "Respons waktu dan frekuensi"
      ],
      "statement": "Sistem suhu memiliki sensitivitas keadaan tunak satu dan respons orde satu. Sensor mula-mula setimbang dengan udara 20°C. Pada $t=0$, sensor masuk air 100°C; pada $t=60$ s, sensor kembali ke udara 20°C. Diketahui $M=0{,}05$ kg, $A=0{,}001$ m², $C=0{,}2$ J/(kg·°C), $U_a=0{,}2$ W/(m²·°C), $U_w=1{,}0$ W/(m²·°C), dan $\\tau=MC/(UA)$. (a) Turunkan $G(s)=\\Delta T_{\\mathrm{out}}(s)/\\Delta T_{\\mathrm{in}}(s)$. (b) Hitung galat dinamis pada 10, 20, 50, 120, dan 300 s.",
      "simulation": {
        "id": "2024-uts1-q4-visual",
        "type": "ipe-thermal-cycle",
        "title": "Pemanasan dan pendinginan",
        "caption": "Pada 60 s, medium dan konstanta waktu berubah. Suhu sensor tetap kontinu; galat membandingkannya dengan suhu medium saat itu.",
        "params": [
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
          "cold": 20,
          "hot": 100,
          "switchTime": 60,
          "tauHot": 10,
          "tauCold": 50,
          "visualKind": "thermal-cycle"
        }
      },
      "steps": [
        {
          "id": "2024-uts1-q4-step-1",
          "title": "a · Hubungkan panas masuk dengan perubahan suhu sensor",
          "content": "Sebut suhu medium sebagai $T_{\\mathrm{in}}$ dan suhu yang ditunjukkan sensor sebagai $T_{\\mathrm{out}}$. Sensor memerlukan energi untuk mengubah suhunya; kapasitas panas totalnya adalah $MC$, dengan satuan J/°C.\n\nLaju panas dari medium ke sensor adalah $UA(T_{\\mathrm{in}}-T_{\\mathrm{out}})$. Ketika medium lebih panas, beda suhu positif dan suhu sensor naik. Menyamakan panas masuk dengan laju perubahan energi sensor memberi persamaan berikut.\n\n$$\nMC\\frac{dT_{\\mathrm{out}}}{dt}=UA(T_{\\mathrm{in}}-T_{\\mathrm{out}})\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Keadaan awal dan model dinamik menentukan respons sebelum sensor mencapai nilai akhir.",
            "commonPitfall": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
          },
          "checkpoint": {
            "prompt": "Sensor dipanaskan dalam air, lalu dipindahkan kembali ke udara. Koefisien perpindahan panas air lebih besar daripada udara. Pada saat perpindahan, suhu sensor belum persis sama dengan suhu air. Model mana yang tepat?",
            "options": [
              {
                "id": "2024-uts1-q4-checkpoint-option-1",
                "label": "Pendinginan dimulai tepat dari suhu air, berapa pun lama sensor berada di dalam air.",
                "feedback": "Sensor hanya mendekati suhu air selama pemanasan. Gunakan nilai yang benar-benar dicapai pada waktu perpindahan.",
                "misconceptionTag": "concept-2024-08-choice-1"
              },
              {
                "id": "2024-uts1-q4-checkpoint-option-2",
                "label": "Pendinginan harus memakai konstanta waktu air karena sensor yang dipakai tetap sama.",
                "feedback": "Konstanta waktu juga memuat koefisien perpindahan panas. Mengganti medium mengubah parameter itu meskipun massa sensor tetap.",
                "misconceptionTag": "concept-2024-08-choice-2"
              },
              {
                "id": "2024-uts1-q4-checkpoint-option-3",
                "label": "Suhu keluaran langsung meloncat ke suhu udara karena lingkungan sudah berubah.",
                "feedback": "Lingkungan dapat berubah mendadak, tetapi kapasitas panas sensor membuat suhu keluarannya berubah bertahap.",
                "misconceptionTag": "concept-2024-08-choice-3"
              },
              {
                "id": "2024-uts1-q4-checkpoint-option-4",
                "label": "Suhu keluaran tetap kontinu, dimulai dari nilai saat dipindah, lalu mendekati suhu udara dengan konstanta waktu udara.",
                "feedback": "Benar. Respons harus tersambung kontinu dan memakai konstanta waktu yang sesuai dengan medium pada tiap fase."
              }
            ],
            "correctOptionId": "2024-uts1-q4-checkpoint-option-4"
          }
        },
        {
          "id": "2024-uts1-q4-step-2",
          "title": "a · Turunkan fungsi alih orde satu",
          "content": "Bagi kedua ruas dengan $UA$, lalu tambahkan $T_{\\mathrm{out}}$ ke ruas kiri. Koefisien turunan adalah $\\tau=MC/(UA)$, yaitu **konstanta waktu** (skala waktu perubahan respons sensor).\n\nGunakan perubahan suhu dari keadaan setimbang awal, sehingga kondisi awal perubahan bernilai nol. Transformasi Laplace mengubah turunan menjadi $s\\Delta T_{\\mathrm{out}}(s)$. Membagi kedua ruas memberi fungsi alih untuk medium yang tetap.\n\n$$\n\\begin{aligned}\\tau\\frac{d\\Delta T_{\\mathrm{out}}}{dt}+\\Delta T_{\\mathrm{out}}&=\\Delta T_{\\mathrm{in}}\\\\(\\tau s+1)\\Delta T_{\\mathrm{out}}(s)&=\\Delta T_{\\mathrm{in}}(s)\\\\G(s)&=\\frac1{\\tau s+1}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts1-q4-step-3",
          "title": "a · Hitung konstanta waktu untuk masing-masing medium",
          "content": "Dari data, $MC=0{,}05(0{,}2)=0{,}01$ J/°C. Di air, $U_wA=1{,}0(0{,}001)=0{,}001$ W/°C. Di udara, $U_aA=0{,}0002$ W/°C.\n\nHubungan W = J/s membuat hasil pembagian kapasitas panas dengan koefisien pelepasan panas bersatuan detik. Air memberi $\\tau_w=10$ s, sedangkan udara memberi $\\tau_a=50$ s. Sensor merespons lebih lambat di udara.\n\n$$\n\\tau_w=\\frac{0.01}{0.001}=10\\ \\mathrm s,\\quad \\tau_a=\\frac{0.01}{0.0002}=50\\ \\mathrm s,\\qquad G_w(s)=\\frac1{10s+1},\\quad G_a(s)=\\frac1{50s+1}\n$$"
        },
        {
          "id": "2024-uts1-q4-step-4",
          "title": "b · Pisahkan dua fase dan definisikan galat",
          "content": "Masukan berupa suhu medium: 100°C selama 0 sampai 60 s, lalu 20°C setelah 60 s. Keluaran adalah suhu sensor yang berubah bertahap. Keduanya tidak harus sama selama proses.\n\nKita definisikan galat bertanda sebagai keluaran dikurangi masukan. Nilai negatif berarti sensor tertinggal di bawah suhu medium; nilai positif berarti sensor masih lebih panas.\n\n$$\nE_d(t)=T_{\\mathrm{out}}(t)-T_{\\mathrm{in}}(t)\n$$"
        },
        {
          "id": "2024-uts1-q4-step-5",
          "title": "b · Tulis respons selama pemanasan di air",
          "content": "Untuk masukan suhu tetap, respons orde satu mendekati suhu akhir secara eksponensial: suhu akhir ditambah selisih suhu awal dan akhir dikalikan $e^{-t/\\tau}$. Pada fase ini suhu awal 20°C, suhu akhir 100°C, dan $\\tau=10$ s.\n\nSelisih suhu awal dan akhir adalah −80°C. Saat $t=0$, persamaan memberi 20°C; saat waktu membesar, suku eksponensial mengecil dan hasil mendekati 100°C.\n\n$$\nT_{\\mathrm{out}}(t)=100+(20-100)e^{-t/10}=100-80e^{-t/10},\\qquad0\\le t<60\n$$"
        },
        {
          "id": "2024-uts1-q4-step-6",
          "title": "b · Hitung tiga galat sebelum perpindahan",
          "content": "Pada 10,20, dan 50 s, sensor masih berada di air 100°C. Kurangi 100 dari respons pemanasan; galat menjadi $-80e^{-t/10}$.\n\nWaktu-waktu ini masing-masing sama dengan 1,2, dan 5 konstanta waktu air. Galat mengecil, tetapi belum tepat nol pada waktu yang berhingga.\n\n$$\n\\begin{aligned}E_d(10)&=-80e^{-1}=-29.43036^\\circ\\mathrm C\\\\E_d(20)&=-80e^{-2}=-10.82682^\\circ\\mathrm C\\\\E_d(50)&=-80e^{-5}=-0.53904^\\circ\\mathrm C\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts1-q4-step-7",
          "title": "Hitung suhu sensor tepat sebelum kembali ke udara",
          "content": "Sensor berada di air selama 60 s, yaitu 6 konstanta waktu air. Masukkan 60 ke respons pemanasan untuk memperoleh suhu awal fase pendinginan.\n\nHasil 99,80170°C sangat dekat dengan 100°C, tetapi tidak sama. Suhu sensor tidak meloncat ketika medium berganti, sehingga $T_{\\mathrm{out}}(60^+)=T_{\\mathrm{out}}(60^-)$.\n\n$$\nT_{60}=100-80e^{-60/10}=99.8016998^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uts1-q4-step-8",
          "title": "Gunakan waktu sejak perpindahan untuk pendinginan",
          "content": "Di udara, suhu akhir kembali 20°C dan konstanta waktunya 50 s. Waktu pendinginan dimulai pada $t=60$, sehingga waktu yang masuk eksponen adalah $t-60$, bukan $t$.\n\nKelebihan suhu awal terhadap udara adalah $99{,}8016998-20=79{,}8016998$°C. Gunakan nilai ini agar respons tetap kontinu pada batas kedua fase.\n\n$$\nT_{\\mathrm{out}}(t)=20+79.8016998e^{-(t-60)/50},\\qquad E_d(t)=79.8016998e^{-(t-60)/50}\\quad(t\\ge60)\n$$"
        },
        {
          "id": "2024-uts1-q4-step-9",
          "title": "b · Hitung galat pada 120 dan 300 s",
          "content": "Pada 120 s, sensor telah mendingin selama 60 s. Pada 300 s, lama pendinginannya 240 s. Kedua waktu global itu tidak sama dengan waktu yang berlalu dalam fase udara.\n\nHasil galat positif karena sensor masih lebih hangat daripada udara. Kita menambahkan 20°C hanya ketika mencari suhu keluaran, bukan ketika melaporkan galat.\n\n$$\n\\begin{aligned}E_d(120)&=79.8016998e^{-(120-60)/50}=24.03581^\\circ\\mathrm C\\\\E_d(300)&=79.8016998e^{-(300-60)/50}=0.65675^\\circ\\mathrm C\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts1-q4-step-10",
          "title": "Bandingkan keluaran, masukan, dan galat",
          "content": "Tabel berikut memisahkan suhu yang benar-benar dibaca sensor dari suhu medium. Besar galat adalah nilai mutlak kolom terakhir. Jika memakai definisi galat masukan dikurangi keluaran, semua tanda berbalik tetapi besarnya tetap.\n\n| t (s) | T masuk (°C) | T keluar (°C) | E_d (°C) |\n| --- | --- | --- | --- |\n| 10 | 100 | 70.56964 | −29.43036 |\n| 20 | 100 | 89.17318 | −10.82682 |\n| 50 | 100 | 99.46096 | −0.53904 |\n| 120 | 20 | 44.03581 | +24.03581 |\n| 300 | 20 | 20.65675 | +0.65675 |"
        },
        {
          "id": "2024-uts1-q4-step-11",
          "title": "Periksa model pada batas kedua fase",
          "content": "Keluaran mulai dari 20°C, mendekati 100°C selama pemanasan, lalu turun secara kontinu menuju 20°C. Galat dapat meloncat saat 60 s karena suhu masukan berubah seketika; suhu sensor sendiri tetap kontinu.\n\nKita tidak memakai satu fungsi alih tetap untuk seluruh riwayat, karena $U$ berubah ketika medium berganti. Masing-masing medium memiliki fungsi alihnya sendiri, dan suhu akhir fase pertama menjadi kondisi awal fase kedua."
        }
      ],
      "finalAnswer": "Fungsi alih di air adalah $1/(10s+1)$; di udara $1/(50s+1)$. Kita memakai $E_d=T_{\\mathrm{keluar}}-T_{\\mathrm{masuk}}$. Galat pada 10, 20, dan 50 s adalah −29,43036; −10,82682; dan −0,53904°C. Galat pada 120 dan 300 s adalah +24,03581 dan +0,65675°C.\n\n$$\n\\boxed{\\begin{aligned}\\tau_w&=10\\ \\mathrm s,\\quad\\tau_a=50\\ \\mathrm s\\\\E_d(10)&=-29.43036^\\circ\\mathrm C\\\\E_d(20)&=-10.82682^\\circ\\mathrm C\\\\E_d(50)&=-0.53904^\\circ\\mathrm C\\\\E_d(120)&=+24.03581^\\circ\\mathrm C\\\\E_d(300)&=+0.65675^\\circ\\mathrm C\\end{aligned}}\n$$",
      "takeaway": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
    },
    {
      "id": "2024-uas-q3",
      "kind": "problem",
      "slug": "2024-uas-q3",
      "title": "Batas frekuensi dengan galat 5%",
      "source": "UAS 2024 · Soal 3",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
        "file": "2024-uas.pdf",
        "pages": [
          2
        ],
        "original": "3. [10%] Dynamic Characteristics of Measurement Systems\nA seismic instrument is characterized by the following dynamic transfer function \\(G(s)=\\omega_n^2/(s^2+2\\zeta\\omega_n+\\omega_n^2)\\) [as printed]. Where \\(\\omega_n\\) is the natural frequency and \\(\\zeta\\) is the damping ratio. The instrument has a natural frequency of 20 Hz and a damping ratio of 0.65. Determine the maximum input frequency for a vibration such that the amplitude error in the indicated displacement is less than 5%.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        "Penyebut pada soal kehilangan faktor s dalam suku redaman. Hasil memakai fungsi alih orde dua yang dinyatakan dalam pembahasan. Tidak ada geometri instrumen yang cukup untuk menyusun diagram gaya khusus alat ini."
      ],
      "exam": {
        "term": "UAS",
        "year": 2024,
        "number": 3
      },
      "difficulty": "menengah",
      "estimatedMinutes": 16,
      "tags": [
        "Respons waktu dan frekuensi"
      ],
      "statement": "Instrumen seismik memiliki frekuensi alami $f_n=20\\ \\mathrm{Hz}$ dan rasio redaman $\\zeta=0{,}65$. Tentukan batas frekuensi masukan agar galat amplitudo simpangan kurang dari 5%. Penyebut fungsi alih pada naskah mencetak $s^2+2\\zeta\\omega_n+\\omega_n^2$; pembahasan memakai bentuk orde dua yang konsisten satuan, $G(s)=\\omega_n^2/(s^2+2\\zeta\\omega_ns+\\omega_n^2)$.",
      "simulation": {
        "id": "2024-uas-q3-visual",
        "type": "ipe-dynamics",
        "title": "Respons dinamis",
        "caption": "Rasio amplitudo mencapai 0,95 pada sekitar 14,40 Hz; daerah ini hanya menguji galat amplitudo.",
        "params": [
          {
            "key": "frequency",
            "label": "Frekuensi masukan",
            "min": 0,
            "max": 40,
            "step": 0.01,
            "defaultValue": 14.4,
            "unit": "Hz"
          },
          {
            "key": "damping",
            "label": "Rasio redaman ζ",
            "min": 0,
            "max": 1.5,
            "step": 0.01,
            "defaultValue": 0.65
          }
        ],
        "data": {
          "mode": "frequency-response",
          "frequency": 14.4,
          "limit": 0.05,
          "damping": 0.65,
          "omegaN": 125.66370614359172,
          "visualKind": "dynamics"
        }
      },
      "steps": [
        {
          "id": "2024-uas-q3-step-1",
          "title": "Tetapkan besaran yang dibatasi soal",
          "content": "Kita membandingkan amplitudo simpangan yang ditunjukkan alat dengan amplitudo masukannya. Batas soal menyangkut **galat amplitudo** (selisih relatif kedua amplitudo). Kita tidak diminta mencari galat fase atau respons terhadap masukan tangga.\n\nUntuk getaran sinusoidal pada satu frekuensi, fungsi alih memberi rasio amplitudo keluaran terhadap masukan. Sensitivitas keadaan tunaknya satu, sehingga rasio idealnya adalah 1.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Keadaan awal dan model dinamik menentukan respons sebelum sensor mencapai nilai akhir.",
            "commonPitfall": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
          }
        },
        {
          "id": "2024-uas-q3-step-2",
          "title": "Perbaiki suku redaman secara terbuka",
          "content": "Naskah mencetak $2\\zeta\\omega_n$ pada penyebut tanpa faktor $s$. Suku itu bersatuan per detik, sedangkan $s^2$ dan $\\omega_n^2$ bersatuan per detik kuadrat. Penjumlahan tersebut tidak konsisten.\n\nKita memakai bentuk orde dua dengan $2\\zeta\\omega_ns$. Definisikan $r=f/f_n=\\omega/\\omega_n$. Pembilang dan penyebut rasio memakai satuan yang sama. Jadi $r=f/20$ dapat langsung memakai Hz.\n\n$$\nG(s)=\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_ns+\\omega_n^2},\\qquad r=\\frac{f}{20}\n$$"
        },
        {
          "id": "2024-uas-q3-step-3",
          "title": "Ubah fungsi alih menjadi rasio amplitudo",
          "content": "Untuk keadaan sinusoidal tunak, gantikan $s$ dengan $j\\omega$, dengan $j^2=-1$. Penyebut memiliki bagian nyata $\\omega_n^2-\\omega^2$ dan bagian imajiner $2\\zeta\\omega_n\\omega$.\n\nBagi pembilang dan penyebut dengan $\\omega_n^2$. Besar bilangan $a+jb$ adalah $\\sqrt{a^2+b^2}$, sehingga kita memperoleh rasio amplitudo $M$.\n\n$$\nG(j\\omega)=\\frac1{1-r^2+j\\,2\\zeta r},\\qquad M(r)=\\frac1{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}}\n$$"
        },
        {
          "id": "2024-uas-q3-step-4",
          "title": "Terjemahkan galat 5% menjadi dua batas",
          "content": "Galat amplitudo relatif adalah $|M-1|$. Nilai $M=0{,}95$ berarti alat membaca 5% terlalu rendah; $M=1{,}05$ berarti 5% terlalu tinggi.\n\nJadi kita perlu memeriksa kedua batas. Respons orde dua dapat naik di sekitar resonansi sebelum turun; tidak aman menganggapnya selalu menurun sejak frekuensi nol.\n\n$$\n|M-1|<0.05\\quad\\Longleftrightarrow\\quad0.95<M<1.05\n$$"
        },
        {
          "id": "2024-uas-q3-step-5",
          "title": "Periksa puncak respons sebelum memilih batas",
          "content": "Maksimum $M$ terjadi ketika kuadrat penyebutnya minimum. Tuliskan $D(r)=1+(4\\zeta^2-2)r^2+r^4$. Dari $D^{\\prime}(r)=0$, puncak tak nol memenuhi $r_p^2=1-2\\zeta^2$.\n\nDengan $\\zeta=0{,}65$, puncaknya hanya sekitar 1,01223, atau 1,223% di atas nilai ideal. Batas atas 1,05 tidak terlampaui, sehingga batas kerja datang dari penurunan ke $M=0{,}95$.\n\n$$\nr_p^2=1-2(0.65)^2=0.155,\\qquad M_{\\max}=\\frac1{2(0.65)\\sqrt{1-0.65^2}}=1.01223\n$$"
        },
        {
          "id": "2024-uas-q3-step-6",
          "title": "Buka kuadrat pada persamaan batas",
          "content": "Masukkan $M=0{,}95$ dan $2\\zeta=1{,}3$. Balik kedua ruas, lalu kuadratkan. Semua besar yang terlibat positif, sehingga langkah ini tidak mengubah batas yang dicari.\n\nSuku $(1-r^2)^2$ menjadi $1-2r^2+r^4$, sedangkan $(1{,}3r)^2=1{,}69r^2$. Gabungkan suku $r^2$ dan kurangi $1/0{,}95^2$ dari kedua ruas.\n\n$$\n\\begin{aligned}(1-r^2)^2+(1.3r)^2&=\\frac1{0.95^2}\\\\1-2r^2+r^4+1.69r^2&=1.10803324\\\\r^4-0.31r^2-0.10803324&=0\\end{aligned}\n$$"
        },
        {
          "id": "2024-uas-q3-step-7",
          "title": "Gunakan x = r² untuk mencari akar",
          "content": "Persamaan hanya memuat $r^4$ dan $r^2$. Dengan $x=r^2$, bentuknya menjadi kuadrat biasa $x^2-0{,}31x-0{,}10803324=0$.\n\nPilih akar $x$ positif karena kuadrat rasio frekuensi tidak negatif. Setelah mendapat $x$, ambil akar kuadrat sekali lagi untuk memperoleh $r$.\n\n$$\nx=\\frac{0.31+\\sqrt{0.31^2+4(0.10803324)}}2=0.51839819,\\qquad r=\\sqrt{x}=0.71999874\n$$"
        },
        {
          "id": "2024-uas-q3-step-8",
          "title": "Kembalikan ke hertz dan periksa syarat ketat",
          "content": "Dari definisi $r=f/20$, kalikan dengan 20 Hz untuk mendapat batas 14,39997 Hz. Pada frekuensi ini $M=0{,}95$, jadi galat tepat 5%.\n\nSoal meminta kurang dari 5%, maka pilih $f$ di bawah batas tersebut. Hasil ini membatasi amplitudo saja; ia tidak menjamin fase keluaran sama dengan fase masukan.\n\n$$\nf_{\\mathrm{lim}}=20(0.71999874)=14.39997\\ \\mathrm{Hz},\\qquad0\\le f<f_{\\mathrm{lim}}\n$$"
        }
      ],
      "finalAnswer": "Batas amplitudo 5% terjadi sekitar 14,40 Hz. Pilih frekuensi masukan di bawah batas ini untuk memenuhi syarat “kurang dari 5%”.\n\n$$\n\\boxed{0\\le f<f_{\\mathrm{lim}},\\qquad f_{\\mathrm{lim}}=14.39997\\ \\mathrm{Hz}\\approx14.40\\ \\mathrm{Hz}}\n$$",
      "takeaway": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
    },
    {
      "id": "2023-uts1-q4",
      "kind": "problem",
      "slug": "2023-uts1-q4",
      "title": "Waktu respons termometer dan batas frekuensi",
      "source": "UTS 1 2023 · Soal 4",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
        "file": "2023-uts1.pdf",
        "pages": [
          2,
          3
        ],
        "original": "4. [25%] Dynamic Characteristic of Measurement Systems\nA thermometer has transfer function of \\(G(s)=O(s)/I(s)=0.2/(7s+1)\\), where O(s) is output in mV and I(s) is temperature in °C.\na. [10%] Estimate the time taken by the thermometer to reach 98% of temperature change, when the thermometer measures temperature with step profile from 30°C to 40°C.\nb. [15%] For dynamic measurement, find the maximum frequency where the error of measurement is less than 3 dB.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Termometer mula-mula tunak pada 30°C. Waktu nol dipilih saat suhu berubah. Offset tidak ditambahkan karena fungsi alih hanya memberi sensitivitas dan konstanta waktu.",
        "Batas 3 dB ditafsirkan sebagai pelemahan amplitudo relatif terhadap gain statik, bukan logaritma gain berdimensi mV/°C. Nilai tepat −3.000 dB dibedakan dari titik half-power −3.0103 dB."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2023,
        "number": 4
      },
      "difficulty": "menengah",
      "estimatedMinutes": 24,
      "tags": [
        "Respons waktu dan frekuensi"
      ],
      "statement": "Termometer memiliki fungsi alih $G(s)=O(s)/I(s)=0.2/(7s+1)$. Keluaran O dalam mV dan masukan I berupa suhu dalam °C. (a) Cari waktu sejak perubahan suhu mendadak dari 30°C ke 40°C hingga termometer mencapai 98% perubahan tersebut. (b) Cari batas frekuensi agar galat amplitudo pengukuran dinamik kurang dari 3 dB.",
      "simulation": {
        "id": "2023-uts1-q4-visual",
        "type": "ipe-dynamics",
        "title": "Respons dinamis",
        "caption": "Respons dimulai pada 6 mV dan mendekati 8 mV. Target 98% perubahan berada pada 7.96 mV.",
        "params": [
          {
            "key": "tau",
            "label": "Konstanta waktu τ",
            "min": 1.4,
            "max": 21,
            "step": 0.01,
            "defaultValue": 7,
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
          "tau": 7,
          "initial": 6,
          "final": 8,
          "K": 0.2,
          "stepTime": 0,
          "evaluationTime": 27.38416103799702,
          "unit": "mV",
          "inputUnit": "°C",
          "initialTemperature": 30,
          "finalTemperature": 40,
          "visualKind": "dynamics"
        }
      },
      "steps": [
        {
          "id": "2023-uts1-q4-step-1",
          "title": "Kenali gain statik dan konstanta waktu",
          "content": "Bentuk umum orde satu adalah $G(s)=K/(\\tau s+1)$. Dengan mencocokkan koefisien, kita memperoleh sensitivitas statik $K=0.2$ mV/°C dan konstanta waktu $\\tau=7$ s. Huruf $s$ dalam fungsi alih adalah variabel Laplace, bukan waktu pembacaan.\n\nGain statik menghubungkan suhu dengan keluaran setelah sensor tunak. Konstanta waktu mengatur seberapa cepat keluaran menuju kondisi itu setelah suhu berubah.\n\n$$\nK=0.2\\ \\mathrm{mV/{}^\\circ C},\\qquad\\tau=7\\ \\mathrm s\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Keadaan awal dan model dinamik menentukan respons sebelum sensor mencapai nilai akhir.",
            "commonPitfall": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
          },
          "checkpoint": {
            "prompt": "Termometer orde satu mula-mula tunak pada suhu yang tidak nol, lalu menerima kenaikan suhu mendadak. Soal meminta waktu untuk mencapai 98% perubahan suhu. Acuan 98% yang benar adalah…",
            "options": [
              {
                "id": "2023-uts1-q4-checkpoint-option-1",
                "label": "Nilai keluaran akhir yang dihitung dari nol, tanpa memperhatikan nilai awal.",
                "feedback": "Jika keluaran awal tidak nol, 98% nilai akhir berbeda dari 98% kenaikan. Itu bukan besaran yang soal minta.",
                "misconceptionTag": "concept-2023-03-choice-1"
              },
              {
                "id": "2023-uts1-q4-checkpoint-option-2",
                "label": "Jumlah waktu sejak alat dinyalakan, walaupun suhu berubah jauh sesudahnya.",
                "feedback": "Respons terhadap langkah belum berlangsung sebelum langkah terjadi. Waktu menyala tidak otomatis sama dengan waktu respons.",
                "misconceptionTag": "concept-2023-03-choice-2"
              },
              {
                "id": "2023-uts1-q4-checkpoint-option-3",
                "label": "Konstanta waktu alat; setelah satu konstanta waktu, keluaran selalu mencapai 98%.",
                "feedback": "Konstanta waktu mengatur laju respons, bukan menyatakan waktu untuk semua persentase. Satu konstanta waktu belum mencapai 98% perubahan.",
                "misconceptionTag": "concept-2023-03-choice-3"
              },
              {
                "id": "2023-uts1-q4-checkpoint-option-4",
                "label": "Kenaikan keluaran dari nilai awal menuju nilai akhir, dengan waktu dihitung sejak suhu berubah.",
                "feedback": "Benar. Fraksi selesai harus diukur dari keluaran awal dan dibandingkan dengan seluruh perubahan menuju keadaan akhir."
              }
            ],
            "correctOptionId": "2023-uts1-q4-checkpoint-option-4"
          }
        },
        {
          "id": "2023-uts1-q4-step-2",
          "title": "4a · Hitung perubahan yang harus ditempuh keluaran",
          "content": "Anggap termometer telah tunak pada 30°C sebelum perubahan. Keluaran awalnya 0.2×30=6 mV. Pada suhu akhir 40°C, keluaran yang dituju adalah 0.2×40=8 mV.\n\nKenaikan keluaran yang perlu diselesaikan adalah 2 mV. Persentase 98% mengacu pada kenaikan ini, bukan pada seluruh nilai akhir 8 mV.\n\n$$\nO_0=6\\ \\mathrm{mV},\\quad O_\\infty=8\\ \\mathrm{mV},\\quad\\Delta O=2\\ \\mathrm{mV},\\quad O_{98}=6+0.98(2)=7.96\\ \\mathrm{mV}\n$$",
          "simulation": {
            "id": "2023-uts1-q4-step-2-visual",
            "type": "ipe-dynamics",
            "title": "Respons dinamis",
            "caption": "Respons dimulai pada 6 mV dan mendekati 8 mV. Target 98% perubahan berada pada 7.96 mV.",
            "params": [
              {
                "key": "tau",
                "label": "Konstanta waktu τ",
                "min": 1.4,
                "max": 21,
                "step": 0.01,
                "defaultValue": 7,
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
              "tau": 7,
              "initial": 6,
              "final": 8,
              "K": 0.2,
              "stepTime": 0,
              "evaluationTime": 27.38416103799702,
              "unit": "mV",
              "inputUnit": "°C",
              "initialTemperature": 30,
              "finalTemperature": 40,
              "visualKind": "dynamics"
            }
          }
        },
        {
          "id": "2023-uts1-q4-step-3",
          "title": "Tulis respons langkah dari nilai awal yang benar",
          "content": "Kita mulai waktu t=0 saat suhu berubah. Bentuk respons orde satu adalah nilai awal ditambah perubahan akhir yang dikali fraksi selesai.\n\nFraksi selesai adalah $1-e^{-t/\\tau}$. Pada t=0, fraksi ini nol; saat waktu membesar, fraksi mendekati satu. Jadi bentuk tersebut memenuhi kedua batas fisiknya.\n\n$$\nO(t)=O_0+(O_\\infty-O_0)(1-e^{-t/\\tau})=6+2(1-e^{-t/7})\\quad[\\mathrm{mV}]\n$$"
        },
        {
          "id": "2023-uts1-q4-step-4",
          "title": "Ubah target 98% menjadi sisa 2%",
          "content": "Jika 98% perubahan sudah selesai, 2% masih tersisa. Eksponensial menyatakan fraksi sisa tersebut, sehingga kita menyamakannya dengan 0.02.\n\nKita juga dapat memasukkan keluaran target 7.96 mV ke persamaan. Kita kurangi 6 mV pada kedua ruas, lalu bagi dengan perubahan 2 mV. Kedua cara memberi hubungan yang sama.\n\n$$\n\\frac{O(t)-O_0}{O_\\infty-O_0}=0.98\\quad\\Rightarrow\\quad1-e^{-t/7}=0.98\\quad\\Rightarrow\\quad e^{-t/7}=0.02\n$$"
        },
        {
          "id": "2023-uts1-q4-step-5",
          "title": "Selesaikan waktu dengan logaritma natural",
          "content": "Logaritma natural, $\\ln$, membalik operasi eksponensial $e^x$. Kita ambil $\\ln$ pada kedua ruas agar pangkat $-t/7$ dapat dibaca langsung.\n\nKita kalikan kedua ruas dengan −7. Nilai ln(0.02) negatif, sehingga waktu yang diperoleh positif. Tanda positif sesuai waktu tunggu sesudah langkah.\n\n$$\n-\\frac t7=\\ln(0.02)\\quad\\Rightarrow\\quad t=-7\\ln(0.02)=\\boxed{27.38416\\ \\mathrm s}\n$$"
        },
        {
          "id": "2023-uts1-q4-step-6",
          "title": "Periksa arti waktu yang ditemukan",
          "content": "Waktu itu sekitar 3.912 konstanta waktu. Substitusi kembali memberi keluaran 7.96 mV. Pembagian dengan sensitivitas 0.2 mV/°C memberi suhu terbaca 39.8°C.\n\nSuhu masukan sudah 40°C, tetapi sensor masih menyisakan 0.2°C dari kenaikan 10°C. Sisa 0.2°C tersebut adalah 2% perubahan, bukan 2% dari suhu 40°C.\n\n$$\n\\frac{t_{98}}{\\tau}=3.9120,\\qquad\\frac{7.96\\ \\mathrm{mV}}{0.2\\ \\mathrm{mV/{}^\\circ C}}=39.8^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2023-uts1-q4-step-7",
          "title": "4b · Bandingkan amplitudo dengan respons statik",
          "content": "Untuk masukan suhu sinus, sensor dapat menghasilkan amplitudo yang lebih kecil dan fase yang tertunda. Soal memberi batas galat dalam dB, sehingga kita membandingkan besar amplitudo keluaran dengan respons statik yang ideal.\n\nGain statik adalah K=0.2 mV/°C. Kita gunakan rasio $M=|G(j\\omega)|/K$ agar nilai ideal sama dengan satu dan tidak bergantung pada pilihan satuan mV atau V.\n\n$$\nM(\\omega)=\\frac{|G(j\\omega)|}{K}\n$$",
          "simulation": {
            "id": "2023-uts1-q4-step-7-visual",
            "type": "ipe-frequency",
            "title": "Respons frekuensi",
            "caption": "Bandingkan penguatan terhadap nilai DC. Batas tepat −3 dB sedikit di bawah titik half-power.",
            "params": [
              {
                "key": "frequency",
                "label": "Frekuensi masukan",
                "min": 0,
                "max": 0.09094568176679733,
                "step": 0.0001,
                "defaultValue": 0.022682497499000042,
                "unit": "Hz"
              }
            ],
            "data": {
              "order": 1,
              "tau": 7,
              "K": 0.2,
              "frequency": 0.022682497499000042,
              "visualKind": "frequency"
            }
          }
        },
        {
          "id": "2023-uts1-q4-step-8",
          "title": "Cari besar gain pada frekuensi sinus",
          "content": "Substitusi $s=j\\omega$, dengan $j^2=-1$, memberi penyebut $1+j7\\omega$. Besar bilangan kompleks dengan bagian nyata 1 dan bagian imajiner $7\\omega$ adalah $\\sqrt{1+(7\\omega)^2}$.\n\nPembagian oleh gain statik 0.2 menghapus pembilang. Pada frekuensi nol, M=1; saat frekuensi naik, penyebut bertambah dan amplitudo relatif turun.\n\n$$\n|G(j\\omega)|=\\frac{0.2}{\\sqrt{1+(7\\omega)^2}},\\qquad M(\\omega)=\\frac1{\\sqrt{1+(7\\omega)^2}}\n$$"
        },
        {
          "id": "2023-uts1-q4-step-9",
          "title": "Terjemahkan batas 3 dB menjadi rasio amplitudo",
          "content": "Untuk perbandingan amplitudo, gain dalam dB adalah 20 log10 M. Sensor orde satu ini melemahkan amplitudo, sehingga gain dalam dB bernilai nol atau negatif.\n\nGalat amplitudo kurang dari 3 dB berarti besar pelemahannya kurang dari 3 dB, yaitu gain lebih besar dari −3 dB. Konversi kembali memberi M lebih besar dari sekitar 0.707946.\n\n$$\n20\\log_{10}M>-3\\quad\\Rightarrow\\quad M>10^{-3/20}=0.7079458\n$$"
        },
        {
          "id": "2023-uts1-q4-step-10",
          "title": "Selesaikan batas frekuensi sudut",
          "content": "Kita masukkan rumus M ke pertidaksamaan. Semua besaran positif, sehingga pembalikan pecahan membalik arah pertidaksamaan. Setelah dikuadratkan, kita dapat mengisolasi (7ω)².\n\nUntuk batas tepatnya, pakai tanda sama dengan. Nilai di bawah batas memenuhi syarat kurang dari 3 dB.\n\n$$\n\\begin{aligned}\\frac1{\\sqrt{1+(7\\omega)^2}}&>10^{-3/20}\\\\1+(7\\omega)^2&<10^{3/10}\\\\\\omega&<\\frac{\\sqrt{10^{0.3}-1}}7=0.142518335\\ \\mathrm{rad/s}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts1-q4-step-11",
          "title": "Ubah radian per detik menjadi hertz",
          "content": "Satu siklus memuat $2\\pi$ radian, sehingga $f=\\omega/(2\\pi)$. Kita bagi batas frekuensi sudut dengan $2\\pi$ untuk mendapat hertz.\n\nPada batas, pelemahan tepat 3 dB. Soal meminta pelemahan kurang dari 3 dB, sehingga frekuensi kerja harus berada di bawah batas.\n\n$$\n\\boxed{0\\le f<f_{\\rm lim}},\\qquad f_{\\rm lim}=\\frac{\\sqrt{10^{0.3}-1}}{2\\pi(7)}=\\boxed{0.02268250\\ \\mathrm{Hz}}\n$$"
        },
        {
          "id": "2023-uts1-q4-step-12",
          "title": "Bedakan batas tepat 3 dB dan pendekatan half-power",
          "content": "Batas orde satu sering disebut $f_c=1/(2\\pi\\tau)$. Di titik itu, $M=1/\\sqrt2$ dan gain sebenarnya −3.0103 dB. Angka ini lazim dibulatkan menjadi −3 dB.\n\nPendekatan itu memberi 0.02273642 Hz, sangat dekat dengan batas tepat 0.02268250 Hz. Untuk syarat ketat kurang dari 3.000 dB, gunakan batas tepat yang lebih kecil.\n\nBatas ini hanya memeriksa amplitudo. Sensor tetap memiliki keterlambatan fase; soal tidak menetapkan batas fase tambahan.\n\n$$\nf_c=\\frac1{2\\pi\\tau}=0.02273642\\ \\mathrm{Hz},\\qquad20\\log_{10}\\left(\\frac1{\\sqrt2}\\right)=-3.0103\\ \\mathrm{dB}\n$$"
        }
      ],
      "finalAnswer": "Waktu mencapai 98% perubahan adalah 27.384 s sejak langkah suhu. Untuk pelemahan amplitudo kurang dari tepat 3 dB, gunakan f<0.02268250 Hz. Pendekatan cutoff half-power yang lazim adalah 0.02273642 Hz.\n\n$$\n\\boxed{t_{98}=27.38416\\ \\mathrm s,\\qquad 0\\le f<0.02268250\\ \\mathrm{Hz}}\n$$",
      "takeaway": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
    },
    {
      "id": "2023-uts2-q4",
      "kind": "problem",
      "slug": "2023-uts2-q4",
      "title": "Doppler dan tegangan vibrometer",
      "source": "UTS 2 2023 · Soal 4",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7/view",
        "file": "2023-uts2.pdf",
        "pages": [
          2,
          3
        ],
        "original": "4. Velocity Sensors\na. [10%] A policeman detects speeding drivers using a Doppler sensor. Let the car emits sound with frequency of 880 Hz while it is speeding at 120 km/h. Calculate sound frequency detected by the sensor when the car is approaching the policeman. Also, calculate the frequency after the driver passing the policeman. (Assume the speed of sound at 1 atm and 20°C is 330 m/s).\nb. [10%] A velocity transducer (vibrometer) as shown in the figure below has sensitivity of 40 mV/(cm/sec) in frequency range 10 Hz ≤ f ≤ 2000 Hz. The induced voltage of the sensor is given by e ≈ BLv where B is the magnetic field strength, L is the length of the coil, and v is the motion velocity of the coil. Since B and L are constant, then e ≈ Kv where K is the sensitivity of the sensor. If the sensor measures vibration with constant acceleration amplitude as 1G (9.81 m/s²), calculate the amplitude of output voltage at 10 Hz and at 2000 Hz.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
          "pages": [
            17,
            18,
            19
          ]
        }
      },
      "assumptions": [
        "Medium diam, sumber dan pengamat segaris. Untuk vibrometer, getaran sinus dan sensitivitas konstan pada rentang yang disebut soal."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2023,
        "number": 4
      },
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "tags": [
        "Respons waktu dan frekuensi"
      ],
      "statement": "(a) Mobil memancarkan bunyi 880 Hz dan bergerak 120 km/jam. Polisi diam; cepat rambat bunyi 330 m/s. Hitung frekuensi saat mobil mendekati, lalu menjauhi polisi. (b) Vibrometer memiliki sensitivitas $40\\,\\mathrm{mV/(cm/s)}$ pada $10\\le f\\le2000\\,\\mathrm{Hz}$. Tegangannya $e\\approx BLv=Kv$. Untuk getaran sinus dengan amplitudo percepatan tetap $1g=9.81\\,\\mathrm{m/s^2}$, hitung amplitudo tegangan pada 10 Hz dan 2000 Hz.",
      "simulation": {
        "id": "2023-uts2-q4-visual",
        "type": "ipe-doppler",
        "title": "Pergeseran Doppler",
        "caption": "Jarak antar muka gelombang menentukan frekuensi yang diterima.",
        "params": [
          {
            "key": "speed",
            "label": "Kecepatan sumber",
            "min": 0,
            "max": 66.666666,
            "step": 0.1,
            "defaultValue": 33.333333,
            "unit": "m/s"
          },
          {
            "key": "angle",
            "label": "Sudut arah gerak θ",
            "min": 0,
            "max": 180,
            "step": 1,
            "defaultValue": 0,
            "unit": "°"
          }
        ],
        "data": {
          "sourceFrequency": 880,
          "sourceSpeed": 33.333333,
          "soundSpeed": 330,
          "visualKind": "doppler"
        }
      },
      "steps": [
        {
          "id": "2023-uts2-q4-step-1",
          "title": "4a · Tentukan sumber, pengamat, dan satuan kecepatan",
          "content": "Mobil memancarkan bunyi 880 Hz, sehingga mobil adalah sumber bergerak. Polisi menerima bunyi sambil diam. Kita memakai model Doppler sumber bergerak, dengan udara sebagai medium yang diam.\n\nKecepatan mobil dan kecepatan bunyi harus memakai satuan yang sama. Ubah 120 km/h menjadi m/s dengan mengalikan 1000 m/km dan membagi 3600 s/jam.\n\n$$\nv_s=120\\frac{1000}{3600}=33.3333\\ \\mathrm{m/s},\\qquad c=330\\ \\mathrm{m/s},\\qquad f_s=880\\ \\mathrm{Hz}\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Keadaan awal dan model dinamik menentukan respons sebelum sensor mencapai nilai akhir.",
            "commonPitfall": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
          },
          "checkpoint": {
            "prompt": "Vibrometer menghasilkan tegangan yang sebanding dengan kecepatan. Dua getaran sinus memiliki amplitudo percepatan yang sama, tetapi frekuensinya berbeda. Keduanya masih berada dalam rentang sensitivitas tetap alat. Mengapa getaran berfrekuensi lebih tinggi memberi tegangan lebih kecil?",
            "options": [
              {
                "id": "2023-uts2-q4-checkpoint-option-1",
                "label": "Frekuensi mengubah satuan tegangan dari volt menjadi milivolt.",
                "feedback": "Volt dan milivolt hanya dua cara menuliskan tegangan yang sama. Perubahan satuan tidak menjelaskan perubahan fisik.",
                "misconceptionTag": "concept-2023-08-choice-1"
              },
              {
                "id": "2023-uts2-q4-checkpoint-option-2",
                "label": "Percepatan yang sama harus menghasilkan kecepatan yang sama pada semua frekuensi.",
                "feedback": "Hubungan percepatan dengan kecepatan juga bergantung pada frekuensi getaran sinus.",
                "misconceptionTag": "concept-2023-08-choice-2"
              },
              {
                "id": "2023-uts2-q4-checkpoint-option-3",
                "label": "Untuk gerak sinus, percepatan yang sama pada frekuensi lebih tinggi memerlukan amplitudo kecepatan lebih kecil.",
                "feedback": "Benar. Sensor merespons kecepatan yang lebih kecil pada percepatan tetap dan frekuensi lebih besar."
              },
              {
                "id": "2023-uts2-q4-checkpoint-option-4",
                "label": "Sensitivitas alat pasti turun setiap kali frekuensi naik, walaupun soal menyatakan tetap.",
                "feedback": "Ini bertentangan dengan syarat sensitivitas tetap di dalam rentang kerja yang disebut.",
                "misconceptionTag": "concept-2023-08-choice-4"
              }
            ],
            "correctOptionId": "2023-uts2-q4-checkpoint-option-3"
          }
        },
        {
          "id": "2023-uts2-q4-step-2",
          "title": "Cari jarak antarpuncak bunyi saat mobil mendekat",
          "content": "Dalam satu periode $T_s=1/f_s$, puncak bunyi bergerak sejauh $cT_s$. Selama waktu yang sama, mobil maju sejauh $v_sT_s$ sebelum memancarkan puncak berikutnya.\n\nJarak dua puncak di depan sumber menjadi $\\lambda=(c-v_s)T_s$. Pengamat diam menerima puncak dengan laju $f=c/\\lambda$. Penyebut lebih kecil daripada $c$, sehingga frekuensi naik.\n\n$$\n\\lambda_{\\rm approach}=\\frac{c-v_s}{f_s},\\qquad f_{\\rm approach}=\\frac c{\\lambda_{\\rm approach}}=f_s\\frac c{c-v_s}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-3",
          "title": "Hitung frekuensi saat mendekat",
          "content": "Kita masukkan kecepatan dengan tanda pengurangan, sesuai jarak puncak yang memendek. Pengurangan terjadi pada penyebut karena sumber bergerak, sedangkan pengamat tetap diam.\n\nHasil harus lebih besar dari 880 Hz. Angka sekitar 978.88 Hz memenuhi cek arah ini.\n\n$$\nf_{\\rm approach}=880\\frac{330}{330-33.3333}=\\boxed{978.88\\ \\mathrm{Hz}}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-4",
          "title": "Balik perubahan jarak puncak saat mobil menjauh",
          "content": "Saat mobil menjauh, posisi emisi berikutnya makin jauh dari polisi. Jarak puncak yang menuju polisi bertambah, sehingga penyebut berubah menjadi c+vs.\n\nHasil berada di bawah 880 Hz. Kedua hasil menganggap gerak segaris dengan polisi; lintasan menyamping memerlukan komponen kecepatan radial.\n\nWalaupun soal menyebut deteksi Doppler polisi, data menyatakan bunyi berasal dari mobil. Oleh karena itu, kita tidak menambahkan faktor pantulan radar yang mengalami pergeseran pada perjalanan pergi dan pulang.\n\n$$\nf_{\\rm recede}=880\\frac{330}{330+33.3333}=\\boxed{799.27\\ \\mathrm{Hz}}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-5",
          "title": "4b · Tentukan besaran yang langsung dibaca vibrometer",
          "content": "Vibrometer pada soal menghasilkan tegangan yang sebanding dengan kecepatan gerak kumparan: $e\\approx Kv$. Namun soal memberi amplitudo percepatan 1G, bukan amplitudo kecepatan. Kita perlu menghubungkan keduanya lebih dulu.\n\nTanda topi, seperti $\\hat a$, menyatakan amplitudo puncak. Nilai yang diberikan adalah $\\hat a=9.81\\ \\mathrm{m/s^2}$. Besarnya tetap pada kedua frekuensi yang dibandingkan.\n\n$$\n\\hat e=K\\hat v,\\qquad \\hat a=9.81\\ \\mathrm{m/s^2}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-6",
          "title": "Hubungkan kecepatan dan percepatan untuk gerak sinus",
          "content": "Kita ambil perpindahan $x(t)=\\hat x\\sin\\omega t$. Satu kali turunan memberi kecepatan, dan turunan berikutnya memberi percepatan. Setiap turunan menambahkan faktor $\\omega$ pada amplitudo.\n\nJadi $\\hat v=\\omega\\hat x$ dan $\\hat a=\\omega^2\\hat x=\\omega\\hat v$. Frekuensi $f$ menghitung siklus per detik, sedangkan $\\omega=2\\pi f$ memakai radian per detik.\n\n$$\n\\hat v=\\frac{\\hat a}{\\omega}=\\frac{\\hat a}{2\\pi f},\\qquad\\hat e=\\frac{K\\hat a}{2\\pi f}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-7",
          "title": "Samakan satuan sensitivitas dan kecepatan",
          "content": "Sensitivitas 40 mV/(cm/s) berarti gerak 1 cm/s memberi 40 mV. Kita memakai m/s dalam perhitungan gerak, sehingga kedua satuan pada perbandingan perlu diubah.\n\n40 mV sama dengan 0.040 V, dan 1 cm/s sama dengan 0.01 m/s. Pembagian memberi 4 V/(m/s), sehingga tegangan akhirnya langsung dalam volt.\n\n$$\nK=\\frac{0.040\\ \\mathrm V}{0.01\\ \\mathrm{m/s}}=4\\ \\mathrm{V/(m/s)},\\qquad\\hat e=\\frac{4(9.81)}{2\\pi f}\\ \\mathrm V\n$$",
          "simulation": {
            "id": "2023-uts2-q4-step-7-visual",
            "type": "ipe-vibrometer",
            "title": "Vibrometer",
            "caption": "Amplitudo tegangan berkurang saat frekuensi naik pada percepatan tetap.",
            "params": [
              {
                "key": "frequency",
                "label": "Frekuensi masukan",
                "min": 10,
                "max": 2000,
                "step": 1,
                "defaultValue": 10,
                "unit": "Hz"
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
              "acceleration": 9.81,
              "sensitivity": 4,
              "frequency": 10,
              "minFrequency": 10,
              "maxFrequency": 2000,
              "visualKind": "vibrometer"
            }
          }
        },
        {
          "id": "2023-uts2-q4-step-8",
          "title": "Hitung keluaran pada 10 Hz",
          "content": "Kita hitung frekuensi sudut, lalu bagi amplitudo percepatan dengan frekuensi sudut untuk memperoleh amplitudo kecepatan. Setelah itu, kalikan dengan sensitivitas.\n\nHasil 0.624524 V sama dengan 624.524 mV. Nilai ini adalah amplitudo puncak keluaran sinus, bukan tegangan tetap.\n\n$$\n\\begin{aligned}\\omega&=2\\pi(10)=62.8319\\ \\mathrm{rad/s}\\\\\\hat v&=\\frac{9.81}{62.8319}=0.156131\\ \\mathrm{m/s}\\\\\\hat e&=4(0.156131)=0.624524\\ \\mathrm V=624.524\\ \\mathrm{mV}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-9",
          "title": "Hitung keluaran pada 2000 Hz",
          "content": "Kita gunakan urutan yang sama pada frekuensi 2000 Hz. Percepatannya tetap 9.81 m/s², tetapi kecepatan puncaknya kini jauh lebih kecil karena dibagi frekuensi yang lebih besar.\n\nSetelah dikali sensitivitas, tegangan puncaknya sekitar 0.00312262 V atau 3.12262 mV.\n\n$$\n\\hat v=\\frac{9.81}{2\\pi(2000)}=0.000780655\\ \\mathrm{m/s},\\qquad\\hat e=4(0.000780655)=\\boxed{3.12262\\ \\mathrm{mV}}\n$$",
          "simulation": {
            "id": "2023-uts2-q4-step-9-visual",
            "type": "ipe-vibrometer",
            "title": "Vibrometer",
            "caption": "Gunakan frekuensi 10 dan 2000 Hz untuk memeriksa rasio 200:1.",
            "params": [
              {
                "key": "frequency",
                "label": "Frekuensi masukan",
                "min": 10,
                "max": 2000,
                "step": 1,
                "defaultValue": 10,
                "unit": "Hz"
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
              "acceleration": 9.81,
              "sensitivity": 4,
              "frequency": 10,
              "minFrequency": 10,
              "maxFrequency": 2000,
              "visualKind": "vibrometer"
            }
          }
        },
        {
          "id": "2023-uts2-q4-step-10",
          "title": "Periksa hubungan kedua hasil",
          "content": "Frekuensi naik dari 10 menjadi 2000 Hz, yaitu 200 kali. Pada percepatan tetap, rumus memberi kecepatan dan tegangan yang turun 200 kali. Kedua hasil memenuhi hubungan ini.\n\nKesimpulan ini memakai sensitivitas tetap dalam rentang 10 sampai 2000 Hz yang diberikan. Jika yang tetap adalah amplitudo kecepatan, bukan percepatan, tegangan tidak akan turun dengan cara yang sama.\n\nKedua angka merupakan amplitudo puncak. Untuk RMS sinyal sinus, barulah bagi amplitudo puncak dengan akar dua; soal tidak meminta konversi itu.\n\n$$\n\\frac{\\hat e(10)}{\\hat e(2000)}=\\frac{2000}{10}=200\n$$"
        }
      ],
      "finalAnswer": "Bunyi terukur 978.88 Hz saat mendekat dan 799.27 Hz saat menjauh. Amplitudo tegangan vibrometer 624.524 mV pada 10 Hz dan 3.12262 mV pada 2000 Hz.\n\n$$\n\\boxed{\\begin{aligned}f_{\\rm approach}&=978.88\\ \\mathrm{Hz}\\\\f_{\\rm recede}&=799.27\\ \\mathrm{Hz}\\\\\\hat e_{10}&=624.524\\ \\mathrm{mV}\\\\\\hat e_{2000}&=3.12262\\ \\mathrm{mV}\\end{aligned}}\n$$",
      "takeaway": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
    },
    {
      "id": "2023-uas-q3",
      "kind": "problem",
      "slug": "2023-uas-q3",
      "title": "Respons sensor orde satu",
      "source": "UAS 2023 · Soal 3",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
        "file": "2023-uas.pdf",
        "pages": [
          1,
          3
        ],
        "original": "3. First-Order System\nA temperature sensor can be modeled as a first-order system with a time constant of 1 second and a sensitivity of 0.08 Ω/°C. Initially, the sensor is at a steady condition of 27 °C with a resistance of 200 Ω. The temperature suddenly changes at t = 1 second to 100 °C.\na. [8%] Find the differential equation model of the sensor that relates changes in temperature input to resistance output.\nb. [7%] What will be the sensor's resistance at t = 3 seconds?",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
          "pages": [
            2,
            3
          ]
        }
      },
      "exam": {
        "term": "UAS",
        "year": 2023,
        "number": 3
      },
      "difficulty": "menengah",
      "estimatedMinutes": 16,
      "tags": [
        "Respons waktu dan frekuensi"
      ],
      "statement": "Sensor suhu orde satu memiliki $\\tau=1\\,\\mathrm s$ dan sensitivitas $K=0.08\\,\\Omega/{}^\\circ\\mathrm C$. Mula-mula sensor tunak pada 27 °C dengan tahanan 200 Ω. Suhu berubah mendadak menjadi 100 °C pada $t=1\\,\\mathrm s$. (a) Susun persamaan diferensial masukan suhu terhadap keluaran tahanan. (b) Hitung tahanan pada $t=3\\,\\mathrm s$.",
      "simulation": {
        "id": "2023-uas-q3-visual",
        "type": "ipe-rtd",
        "title": "Sensor suhu resistif",
        "caption": "Sensor mulai berubah pada t=1 s dan mendekati 205.84 Ω.",
        "params": [
          {
            "key": "tau",
            "label": "Konstanta waktu τ",
            "min": 0.2,
            "max": 3,
            "step": 0.01,
            "defaultValue": 1,
            "unit": "s"
          },
          {
            "key": "targetTemperature",
            "label": "Suhu akhir",
            "min": 0,
            "max": 200,
            "step": 1,
            "defaultValue": 100,
            "unit": "°C"
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
          "tau": 1,
          "initialTemperature": 27,
          "finalTemperature": 100,
          "initialResistance": 200,
          "stepTime": 1,
          "evaluationTime": 3,
          "K": 0.08,
          "initial": 200,
          "final": 205.84,
          "visualKind": "rtd"
        }
      },
      "steps": [
        {
          "id": "2023-uas-q3-step-1",
          "title": "3a · Jadikan keadaan awal sebagai titik acuan",
          "content": "Sensor mulai pada 27°C dan 200 Ω dalam keadaan tunak. Tunak berarti keluarannya sudah berhenti berubah ketika suhu belum berubah.\n\nDefinisikan perubahan $\\Delta T=T-27$ dan $\\Delta R=R-200$. Sensitivitas 0.08 Ω/°C menghubungkan kedua perubahan ini, bukan menyatakan bahwa tahanan absolut sama dengan 0.08 kali suhu absolut.\n\n$$\n\\Delta T=T-27,\\qquad\\Delta R=R-200,\\qquad K=0.08\\ \\Omega/{}^\\circ\\mathrm C\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Keadaan awal dan model dinamik menentukan respons sebelum sensor mencapai nilai akhir.",
            "commonPitfall": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
          }
        },
        {
          "id": "2023-uas-q3-step-2",
          "title": "Masukkan konstanta waktu ke persamaan orde satu",
          "content": "Model orde satu adalah $\\tau\\,d\\Delta R/dt+\\Delta R=K\\Delta T$. Turunan menyatakan seberapa cepat tahanan sedang berubah; konstanta waktu $\\tau=1$ s menentukan laju pendekatan ke keadaan akhir.\n\nKita ganti variabel perubahan dengan tahanan dan suhu asli. Nilai awal 200 Ω konstan, sehingga turunan R−200 sama dengan turunan R.\n\nSetiap suku memiliki satuan Ω: konstanta waktu dalam detik dikali Ω/s, perubahan tahanan dalam Ω, dan sensitivitas Ω/°C dikali perubahan suhu °C.\n\n$$\n\\boxed{(1\\ \\mathrm s)\\frac{dR}{dt}+R-200=0.08(T-27)}\n$$"
        },
        {
          "id": "2023-uas-q3-step-3",
          "title": "Nyatakan masukan sebelum dan sesudah t=1 s",
          "content": "Sebelum t=1 s, suhu tetap 27°C, sehingga ΔT=0 dan tahanan tetap 200 Ω. Pada t=1 s, suhu berubah mendadak menjadi 100°C.\n\nPerubahan mendadak pada masukan disebut langkah. Besar langkahnya 100−27=73°C. Sensor orde satu tidak langsung menyelesaikan seluruh perubahan keluarannya pada saat itu.\n\n$$\n\\Delta T(t)=\\begin{cases}0,&t<1\\\\73^\\circ\\mathrm C,&t\\ge1\\end{cases}\n$$"
        },
        {
          "id": "2023-uas-q3-step-4",
          "title": "Cari keadaan akhir sebagai batas respons",
          "content": "Setelah menunggu cukup lama pada suhu 100°C, laju perubahan tahanan menuju nol. Hapus suku turunan dari model untuk mencari nilai akhir.\n\nKenaikan tahanan akhirnya 0.08×73=5.84 Ω. Tambahkan pada tahanan awal 200 Ω untuk memperoleh 205.84 Ω.\n\n$$\nR_\\infty-200=0.08(100-27)=5.84\\ \\Omega\\quad\\Rightarrow\\quad R_\\infty=205.84\\ \\Omega\n$$"
        },
        {
          "id": "2023-uas-q3-step-5",
          "title": "Lihat mengapa respons berbentuk eksponensial",
          "content": "Sesudah langkah, model dapat ditulis $\\tau\\,dR/dt=R_\\infty-R$. Jadi tahanan berubah paling cepat ketika jaraknya dari nilai akhir masih besar, lalu melambat saat jarak itu mengecil.\n\nSebut sisa perubahan itu $u=R_\\infty-R$. Turunannya adalah $du/dt=-dR/dt$, sehingga model menjadi $du/dt=-u/\\tau$. Solusinya menyusut sebagai eksponensial terhadap waktu yang berlalu.\n\n$$\n\\frac{du}{dt}=-\\frac u\\tau\\quad\\Rightarrow\\quad u(t)=u(1)e^{-(t-1)/\\tau}\n$$"
        },
        {
          "id": "2023-uas-q3-step-6",
          "title": "Gunakan kondisi awal untuk menentukan besar respons",
          "content": "Tepat saat suhu berubah, tahanan masih 200 Ω. Sisa menuju nilai akhir adalah 205.84−200=5.84 Ω, sehingga u(1)=5.84 Ω.\n\nKita kurangi sisa eksponensial itu dari nilai akhir. Bentuk kedua di bawah menunjukkan hal yang sama sebagai nilai awal ditambah perubahan yang sudah selesai.\n\n$$\nR(t)=205.84-5.84e^{-(t-1)/1}=200+5.84(1-e^{-(t-1)/1}),\\qquad t\\ge1\n$$"
        },
        {
          "id": "2023-uas-q3-step-7",
          "title": "3b · Evaluasi setelah dua detik respons",
          "content": "Waktu pembacaan adalah t=3 s, sedangkan langkah terjadi pada t=1 s. Jadi selang respons 3−1=2 s, atau dua konstanta waktu.\n\nNilai $e^{-2}=0.135335$ berarti 13.5335% dari perubahan masih tersisa. Fraksi yang sudah terjadi adalah 0.864665; kalikan dengan 5.84 Ω lalu tambahkan 200 Ω.\n\n$$\n\\begin{aligned}R(3)&=200+5.84(1-e^{-(3-1)/1})\\\\&=200+5.84(0.864665)\\\\&=\\boxed{205.04964\\ \\Omega}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uas-q3-step-8",
          "title": "Periksa kondisi awal, akhir, dan sisa galat dinamik",
          "content": "Pada t=1 s, rumus memberi 200 Ω. Pada waktu yang sangat lama, rumus memberi 205.84 Ω. Pembacaan 205.04964 Ω berada di antara keduanya, sesuai respons pemanasan tanpa lonjakan.\n\nSisa 0.79036 Ω adalah selisih sementara akibat respons yang belum selesai. Nilai ini diukur terhadap tahanan akhir, bukan terhadap nol ohm.\n\nPerbandingan 13.53% memakai perubahan 5.84 Ω sebagai penyebut. Membaginya dengan seluruh tahanan 205.84 Ω akan menjawab pertanyaan persentase yang berbeda.\n\n$$\nR_\\infty-R(3)=205.84-205.04964=0.79036\\ \\Omega,\\qquad\\frac{0.79036}{5.84}\\approx13.53\\%\n$$"
        }
      ],
      "finalAnswer": "Modelnya dR/dt + R − 200 = 0.08(T − 27), dengan satuan sesuai data. Pada t=3 s, R=205.04964 Ω.\n\n$$\n\\boxed{R(3\\,\\mathrm s)=205.04964\\ \\Omega}\n$$",
      "takeaway": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
    },
    {
      "id": "ipe-dynamics-practice",
      "kind": "practice",
      "slug": "ipe-dynamics-practice",
      "title": "Latihan: Respons waktu dan frekuensi",
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "intro": "Latihan ini membantu Anda memilih model dan menjelaskan alasan. Mulai dari pilihan ganda, tinjau contoh yang keliru, lalu susun jawaban sendiri. Gunakan rubrik untuk memeriksa alur, asumsi, dan batas kesimpulan Anda.",
      "questions": [
        {
          "id": "concept-2023-03",
          "prompt": "Termometer orde satu mula-mula tunak pada suhu yang tidak nol, lalu menerima kenaikan suhu mendadak. Soal meminta waktu untuk mencapai 98% perubahan suhu. Acuan 98% yang benar adalah…",
          "options": [
            {
              "id": "concept-2023-03-option-1",
              "label": "Nilai keluaran akhir yang dihitung dari nol, tanpa memperhatikan nilai awal.",
              "feedback": "Jika keluaran awal tidak nol, 98% nilai akhir berbeda dari 98% kenaikan. Itu bukan besaran yang soal minta.",
              "misconceptionTag": "concept-2023-03-choice-1"
            },
            {
              "id": "concept-2023-03-option-2",
              "label": "Jumlah waktu sejak alat dinyalakan, walaupun suhu berubah jauh sesudahnya.",
              "feedback": "Respons terhadap langkah belum berlangsung sebelum langkah terjadi. Waktu menyala tidak otomatis sama dengan waktu respons.",
              "misconceptionTag": "concept-2023-03-choice-2"
            },
            {
              "id": "concept-2023-03-option-3",
              "label": "Konstanta waktu alat; setelah satu konstanta waktu, keluaran selalu mencapai 98%.",
              "feedback": "Konstanta waktu mengatur laju respons, bukan menyatakan waktu untuk semua persentase. Satu konstanta waktu belum mencapai 98% perubahan.",
              "misconceptionTag": "concept-2023-03-choice-3"
            },
            {
              "id": "concept-2023-03-option-4",
              "label": "Kenaikan keluaran dari nilai awal menuju nilai akhir, dengan waktu dihitung sejak suhu berubah.",
              "feedback": "Benar. Fraksi selesai harus diukur dari keluaran awal dan dibandingkan dengan seluruh perubahan menuju keadaan akhir."
            }
          ],
          "correctOptionId": "concept-2023-03-option-4",
          "explanation": "Persentase respons langkah mengacu pada perubahan yang harus ditempuh, yaitu nilai akhir dikurangi nilai awal. Jam respons mulai saat langkah terjadi. Menggunakan nol keluaran mengubah besar perubahan; menggunakan waktu menyala memasukkan masa ketika sensor masih tunak.",
          "relatedProblemId": "2023-uts1-q4"
        },
        {
          "id": "concept-2023-08",
          "prompt": "Vibrometer menghasilkan tegangan yang sebanding dengan kecepatan. Dua getaran sinus memiliki amplitudo percepatan yang sama, tetapi frekuensinya berbeda. Keduanya masih berada dalam rentang sensitivitas tetap alat. Mengapa getaran berfrekuensi lebih tinggi memberi tegangan lebih kecil?",
          "options": [
            {
              "id": "concept-2023-08-option-1",
              "label": "Frekuensi mengubah satuan tegangan dari volt menjadi milivolt.",
              "feedback": "Volt dan milivolt hanya dua cara menuliskan tegangan yang sama. Perubahan satuan tidak menjelaskan perubahan fisik.",
              "misconceptionTag": "concept-2023-08-choice-1"
            },
            {
              "id": "concept-2023-08-option-2",
              "label": "Percepatan yang sama harus menghasilkan kecepatan yang sama pada semua frekuensi.",
              "feedback": "Hubungan percepatan dengan kecepatan juga bergantung pada frekuensi getaran sinus.",
              "misconceptionTag": "concept-2023-08-choice-2"
            },
            {
              "id": "concept-2023-08-option-3",
              "label": "Untuk gerak sinus, percepatan yang sama pada frekuensi lebih tinggi memerlukan amplitudo kecepatan lebih kecil.",
              "feedback": "Benar. Sensor merespons kecepatan yang lebih kecil pada percepatan tetap dan frekuensi lebih besar."
            },
            {
              "id": "concept-2023-08-option-4",
              "label": "Sensitivitas alat pasti turun setiap kali frekuensi naik, walaupun soal menyatakan tetap.",
              "feedback": "Ini bertentangan dengan syarat sensitivitas tetap di dalam rentang kerja yang disebut.",
              "misconceptionTag": "concept-2023-08-choice-4"
            }
          ],
          "correctOptionId": "concept-2023-08-option-3",
          "explanation": "Percepatan adalah laju perubahan kecepatan. Pada getaran lebih cepat, kecepatan yang lebih kecil dapat memberi amplitudo percepatan yang sama. Sensor membaca kecepatan dengan sensitivitas tetap, sehingga tegangannya ikut mengecil. Penyebabnya adalah besaran gerak yang masuk, bukan perubahan sensitivitas.",
          "relatedProblemId": "2023-uts2-q4"
        },
        {
          "id": "concept-2023-10",
          "prompt": "Akselerometer massa dan pegas memakai LVDT untuk membaca simpangan relatif inti. Teknisi menghitung batas percepatan dari kekakuan pegas dan batas gerak inti dengan model kuasistatik, lalu menerapkannya pada semua frekuensi. Apa yang perlu diperbaiki?",
          "options": [
            {
              "id": "concept-2023-10-option-1",
              "label": "Batas gerak tetap berlaku, tetapi hubungan percepatan dengan simpangan perlu memakai massa, pegas, redaman, dan frekuensi masukan.",
              "feedback": "Benar. Model dinamik diperlukan untuk menghubungkan batas simpangan tetap dengan batas percepatan pada tiap frekuensi."
            },
            {
              "id": "concept-2023-10-option-2",
              "label": "LVDT sebenarnya membaca percepatan absolut secara langsung, sehingga model mekanis tidak diperlukan.",
              "feedback": "LVDT mengukur posisi inti terhadap rumah. Hubungan posisi itu dengan percepatan berasal dari model mekanis.",
              "misconceptionTag": "concept-2023-10-choice-2"
            },
            {
              "id": "concept-2023-10-option-3",
              "label": "Cukup membalik tanda tegangan; sensitivitas amplitudo tidak pernah bergantung frekuensi.",
              "feedback": "Polaritas mengubah tanda, bukan menghapus ketergantungan amplitudo pada frekuensi.",
              "misconceptionTag": "concept-2023-10-choice-3"
            },
            {
              "id": "concept-2023-10-option-4",
              "label": "Batas gerak inti harus dianggap tidak berlaku pada getaran sinus.",
              "feedback": "Batas gerak adalah batas fisik inti. Getaran sinus tetap dapat melampauinya.",
              "misconceptionTag": "concept-2023-10-choice-4"
            }
          ],
          "correctOptionId": "concept-2023-10-option-1",
          "explanation": "LVDT membaca simpangan relatif, sedangkan massa, pegas, dan peredam mengubah percepatan menjadi simpangan itu. Pada frekuensi rendah, model kuasistatik dapat berlaku. Pada frekuensi lain, respons dinamik mengubah simpangan untuk percepatan yang sama. Batas inti tetap, sehingga batas percepatan yang terkait dapat berubah.",
          "relatedProblemId": "2023-uas-q4"
        },
        {
          "id": "concept-2024-08",
          "prompt": "Sensor dipanaskan dalam air, lalu dipindahkan kembali ke udara. Koefisien perpindahan panas air lebih besar daripada udara. Pada saat perpindahan, suhu sensor belum persis sama dengan suhu air. Model mana yang tepat?",
          "options": [
            {
              "id": "concept-2024-08-option-1",
              "label": "Pendinginan dimulai tepat dari suhu air, berapa pun lama sensor berada di dalam air.",
              "feedback": "Sensor hanya mendekati suhu air selama pemanasan. Gunakan nilai yang benar-benar dicapai pada waktu perpindahan.",
              "misconceptionTag": "concept-2024-08-choice-1"
            },
            {
              "id": "concept-2024-08-option-2",
              "label": "Pendinginan harus memakai konstanta waktu air karena sensor yang dipakai tetap sama.",
              "feedback": "Konstanta waktu juga memuat koefisien perpindahan panas. Mengganti medium mengubah parameter itu meskipun massa sensor tetap.",
              "misconceptionTag": "concept-2024-08-choice-2"
            },
            {
              "id": "concept-2024-08-option-3",
              "label": "Suhu keluaran langsung meloncat ke suhu udara karena lingkungan sudah berubah.",
              "feedback": "Lingkungan dapat berubah mendadak, tetapi kapasitas panas sensor membuat suhu keluarannya berubah bertahap.",
              "misconceptionTag": "concept-2024-08-choice-3"
            },
            {
              "id": "concept-2024-08-option-4",
              "label": "Suhu keluaran tetap kontinu, dimulai dari nilai saat dipindah, lalu mendekati suhu udara dengan konstanta waktu udara.",
              "feedback": "Benar. Respons harus tersambung kontinu dan memakai konstanta waktu yang sesuai dengan medium pada tiap fase."
            }
          ],
          "correctOptionId": "concept-2024-08-option-4",
          "explanation": "Sensor menyimpan energi panas, sehingga perubahan lingkungan tidak membuat suhu sensor meloncat seketika. Kondisi awal pendinginan adalah suhu akhir fase pemanasan. Konstanta waktu bergantung pada lingkungan melalui perpindahan panas; udara memberi respons lebih lambat pada data ini.",
          "relatedProblemId": "2024-uts1-q4"
        },
        {
          "id": "concept-2025-03",
          "prompt": "Sensor gaya menghasilkan gelombang sinus dengan amplitudo hampir sama seperti acuan, tetapi puncaknya muncul lebih lambat. Sistem akan dipakai untuk membandingkan waktu kejadian dengan sensor lain. Kesimpulan mana yang tepat?",
          "options": [
            {
              "id": "concept-2025-03-option-1",
              "label": "Respons amplitudo dan fase perlu dinilai terpisah; keterlambatan dapat mengganggu perbandingan waktu meskipun amplitudo cukup baik.",
              "feedback": "Tepat. Kecocokan amplitudo tidak cukup untuk menjamin kecocokan waktu."
            },
            {
              "id": "concept-2025-03-option-2",
              "label": "Amplitudo yang hampir sama membuktikan beda fase juga hampir nol.",
              "feedback": "Besar penguatan tidak menentukan fase secara langsung pada satu titik pengukuran.",
              "misconceptionTag": "concept-2025-03-choice-2"
            },
            {
              "id": "concept-2025-03-option-3",
              "label": "Keterlambatan boleh diabaikan karena kalibrasi dinamik hanya menilai besar sinyal.",
              "feedback": "Kalibrasi dinamik juga menilai fase atau waktu tanggap; keduanya penting untuk urutan kejadian.",
              "misconceptionTag": "concept-2025-03-choice-3"
            },
            {
              "id": "concept-2025-03-option-4",
              "label": "Puncak yang terlambat selalu berarti polaritas sensor terbalik.",
              "feedback": "Pembalikan polaritas memberi pergeseran tertentu, tetapi keterlambatan umum dapat berasal dari respons dinamik biasa.",
              "misconceptionTag": "concept-2025-03-choice-4"
            }
          ],
          "correctOptionId": "concept-2025-03-option-1",
          "explanation": "Respons sinus memiliki dua informasi: perbandingan amplitudo dan beda fase. Sensor dapat mempertahankan amplitudo dengan cukup baik sambil tetap memberi keterlambatan fase yang berarti. Untuk menghubungkan peristiwa dari dua sensor, kedua respons perlu diketahui pada frekuensi yang dipakai.",
          "relatedProblemId": "2025-uts1-q3"
        },
        {
          "id": "concept-2025-10",
          "prompt": "Accelerometer piezoelektrik memiliki sensitivitas nominal hanya dalam pita yang dinyatakan. Ketika sinyal melampaui batas atas pita, apa yang paling tepat dilakukan?",
          "options": [
            {
              "id": "concept-2025-10-option-1",
              "label": "Tetap gunakan sensitivitas nominal karena semua sensor memiliki penguatan tetap pada semua frekuensi.",
              "feedback": "Sensitivitas bergantung pada respons dinamik; nilai nominal tidak berlaku tanpa batas.",
              "misconceptionTag": "concept-2025-10-choice-1"
            },
            {
              "id": "concept-2025-10-option-2",
              "label": "Periksa respons frekuensi atau kalibrasi yang sesuai; resonansi dan pelemahan dapat membuat konversi nominal keliru.",
              "feedback": "Tepat. Keputusan memakai atau mengoreksi pembacaan perlu dukungan respons yang sesuai."
            },
            {
              "id": "concept-2025-10-option-3",
              "label": "Anggap semua frekuensi di atas pita pasti menghasilkan keluaran lebih besar.",
              "feedback": "Puncak resonansi tidak berarti seluruh daerah frekuensi lebih tinggi terus menguat.",
              "misconceptionTag": "concept-2025-10-choice-3"
            },
            {
              "id": "concept-2025-10-option-4",
              "label": "Abaikan arah pemasangan karena kesalahan frekuensi menghapus sensitivitas silang.",
              "feedback": "Sensitivitas silang adalah respons terhadap sumbu lain dan tetap dapat menambah galat.",
              "misconceptionTag": "concept-2025-10-choice-4"
            }
          ],
          "correctOptionId": "concept-2025-10-option-2",
          "explanation": "Batas pita menandai wilayah tempat sensitivitas nominal didukung spesifikasi. Di luar pita, respons dapat membesar dekat resonansi dan melemah jauh sesudahnya. Pengaruh frekuensi tidak menghilangkan pengaruh arah, sehingga keduanya tetap perlu diperiksa.",
          "relatedProblemId": "2025-uas-q6"
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-dynamics-guided",
          "mode": "spot-the-error",
          "title": "Periksa keadaan awal saat lingkungan berganti",
          "prompt": "Sensor keluar dari air panas sebelum mencapai suhu air. Periksa model pendinginan berikut.",
          "workSample": "Sensor pindah ke udara. Gunakan suhu air sebagai suhu awal sensor. Pakai konstanta waktu air untuk seluruh proses pendinginan.",
          "question": {
            "id": "ipe-dynamics-guided-question",
            "prompt": "Perbaikan mana yang menangani kedua masalah?",
            "options": [
              {
                "id": "ipe-dynamics-guided-question-option-1",
                "label": "Gunakan suhu sensor saat pindah dan konstanta waktu di udara.",
                "feedback": "Tepat. Suhu sensor menerus saat pindah, tetapi kondisi perpindahan panas berubah."
              },
              {
                "id": "ipe-dynamics-guided-question-option-2",
                "label": "Gunakan suhu udara sebagai suhu awal sensor.",
                "feedback": "Suhu sensor tidak langsung sama dengan udara. Kesetaraan itu akan menghapus proses pendinginan.",
                "misconceptionTag": "dynamics-guided-choice-2"
              },
              {
                "id": "ipe-dynamics-guided-question-option-3",
                "label": "Pertahankan suhu awal, tetapi abaikan proses pendinginan.",
                "feedback": "Soal meminta model setelah perpindahan. Kita perlu mempertahankan perubahan suhu selama pendinginan.",
                "misconceptionTag": "dynamics-guided-choice-3"
              }
            ],
            "correctOptionId": "ipe-dynamics-guided-question-option-1",
            "explanation": "Hitung keadaan sensor pada akhir interval pertama. Gunakan nilai tersebut sebagai awal interval kedua. Pilih konstanta waktu sesuai lingkungan pada tiap interval."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-dynamics-essay",
          "title": "Pilih sensor untuk perubahan cepat",
          "prompt": "Dua sensor memiliki kalibrasi statik yang sama. Sensor pertama melemahkan amplitudo masukan cepat. Sensor kedua menjaga amplitudo, tetapi memberi keterlambatan fase. Susun penilaian untuk pengukuran amplitudo dan penentuan waktu kejadian.",
          "sections": [
            "Model dan asumsi",
            "Alur penalaran",
            "Kesimpulan dan batas"
          ],
          "hints": [
            "Kebutuhan pengukuran menentukan jenis galat yang perlu Anda batasi.",
            "Pisahkan galat amplitudo dari beda waktu atau fase.",
            "Tentukan rentang frekuensi, bandingkan kedua respons, lalu nyatakan kecocokan untuk tiap tugas."
          ],
          "rubric": [
            {
              "id": "ipe-dynamics-rubric-model",
              "label": "Model dan asumsi",
              "weight": 35,
              "fullCredit": "Membedakan sensitivitas statik, respons amplitudo, dan respons fase.",
              "commonPartialError": "Persentase respons mengacu pada perubahan dari keadaan awal, bukan selalu pada nilai akhir mutlak."
            },
            {
              "id": "ipe-dynamics-rubric-reasoning",
              "label": "Alur penalaran",
              "weight": 40,
              "fullCredit": "Menilai tiap sensor pada rentang frekuensi dan jenis tugas yang sama."
            },
            {
              "id": "ipe-dynamics-rubric-conclusion",
              "label": "Kesimpulan dan batas",
              "weight": 25,
              "fullCredit": "Memberi pilihan bersyarat sesuai toleransi amplitudo dan waktu, bukan memilih dari kalibrasi statik saja."
            }
          ],
          "verifiedOutline": "Kalibrasi statik yang sama hanya menyamakan hubungan pada keadaan menetap. Untuk amplitudo, bandingkan perbandingan amplitudo keluaran terhadap acuan pada frekuensi kerja. Untuk waktu kejadian, periksa fase atau beda waktu pada frekuensi yang sama. Sensor kedua dapat sesuai untuk amplitudo tetapi belum tentu untuk waktu kejadian. Pilihan akhir bergantung pada toleransi dan rentang frekuensi. Nyatakan kedua batas tersebut."
        }
      ]
    }
  ]
};

export const english: NonNullable<CourseTranslation['modules']>[string] = {
  "title": "Time and frequency response",
  "items": {
    "ipe-dynamics-material": {
      "title": "Check whether a sensor follows the input",
      "examHook": {
        "prompt": "Two sensors show the same final temperature. One responds slowly when temperature changes. Which sensor suits a rapidly changing input?",
        "targetOutcome": "You can assess sensor delay, amplitude response, and frequency limits."
      },
      "body": "Static calibration checks readings after conditions settle. A changing input requires a response-time check. You need to assess how quickly and faithfully a sensor follows the change.\n\nFor repeating inputs, check amplitude and phase separately. A matching amplitude does not guarantee matching peak times.\n\n[Open the worked solution: Force-sensor amplitude, phase, and bandwidth](?item=2025-uts1-q3).",
      "microUnits": [
        {
          "id": "ipe-dynamics-principle",
          "title": "Choose a model from the stated conditions",
          "intuition": "A temperature sensor needs time to absorb or release heat. A **first-order model** uses one time constant to describe a gradual approach to the final value. When the surroundings change, sensor temperature remains continuous. Its rate of change can alter because the time constant changes.",
          "formal": "For a step change in a first-order model:\n\n$$y(t)=y_\\infty+(y_0-y_\\infty)e^{-t/\\tau}.$$\n\n$y_0$ is the initial value, $y_\\infty$ the final value, and $\\tau$ the time constant.",
          "validityBounds": "This equation assumes a fixed time constant within one interval. Split the interval when conditions change. A second-order model also needs natural frequency and damping. Do not apply static sensitivity at every frequency.",
          "decisionCheck": {
            "prompt": "A sensor tracks amplitude well, but its peaks arrive late. Is it necessarily suitable for event timing?",
            "options": [
              {
                "id": "ipe-dynamics-decision-question-option-1",
                "label": "Not yet; compare its delay with the timing tolerance.",
                "feedback": "Correct. Event timing needs an acceptable delay limit."
              },
              {
                "id": "ipe-dynamics-decision-question-option-2",
                "label": "Yes; correct amplitude guarantees correct phase.",
                "feedback": "Amplitude and phase are separate parts of the response."
              },
              {
                "id": "ipe-dynamics-decision-question-option-3",
                "label": "Yes; static calibration covers every frequency.",
                "feedback": "Static calibration checks steady conditions rather than the full frequency response."
              }
            ],
            "explanation": "Choose the error measure that matches the task. Event timing requires a separate phase or time-delay check."
          }
        }
      ],
      "checkpoints": [
        "You can assess sensor delay, amplitude response, and frequency limits.",
        "The initial state and dynamic model determine response before the sensor reaches its final value.",
        "A response percentage refers to the change from the initial state, not always the absolute final value."
      ],
      "derivations": [
        {
          "id": "ipe-dynamics-sources",
          "title": "Sources and archive conventions",
          "content": "[Midterm 1, Midterm 2, and final exam archive, 2023 to 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Years follow archive folders; printed paper dates may differ.\n\n[Main reference: Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view). Each worked solution includes its original statement, source pages, and relevant assumptions."
        }
      ]
    },
    "2025-uts1-q3": {
      "title": "Force-sensor amplitude, phase, and bandwidth",
      "source": "Midterm 1 2025 · Question 3",
      "assumptions": [
        "The paper assigns Hz to 1000, so it is interpreted as fn=1000 Hz despite the symbol ωn. Its angular frequency is 2π×1000 rad/s.",
        "Use sinusoidal steady state, a linear second-order model with unit static gain, and bandwidth defined by the half-power point relative to static gain.",
        "Signed amplitude error uses output minus ideal; its absolute value gives the error magnitude."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Time and frequency response"
      ],
      "statement": "The force sensor follows a second-order model. The paper writes natural frequency $\\omega_n=1000\\ \\mathrm{Hz}$, with damping ratio $\\zeta=0.7$. The input force is sinusoidal at 600 Hz.\nFind (a) the output-to-input amplitude ratio, (b) phase difference, (c) percentage dynamic amplitude error, and (d) sensor bandwidth. Use the supplied second-order transfer function. Note that ω conventionally uses rad/s, whereas the question gives Hz.",
      "simulation": {
        "title": "Frequency response",
        "caption": "Change input frequency and inspect both amplitude and phase. The natural-frequency control uses Hz; the model has unit static gain.",
        "params": [
          {
            "key": "frequency",
            "label": "Input frequency"
          },
          {
            "key": "zeta",
            "label": "Damping ratio ζ"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uts1-q3-step-1",
          "title": "1. Identify what changes in a sinusoidal signal",
          "content": "We compare input and output waveforms after the initial transient has decayed. In this steady state, sinusoidal frequency stays the same, but peak height and timing can change. **Amplitude ratio** $M$ compares output and input peak heights. **Phase** $\\phi$ measures their shift within a cycle, letting you assess timing lag.\n\nThe supplied transfer function has static gain 1 because $G(0)=1$. Output here is therefore normalized by the sensor’s static sensitivity; no separate electrical sensitivity is needed.\n\n$$\nF_{\\rm in}=A\\sin(2\\pi ft),\\qquad F_{\\rm out,norm}=MA\\sin(2\\pi ft+\\phi)\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The initial state and dynamic model determine response before the sensor reaches its final value.",
            "commonPitfall": "A response percentage refers to the change from the initial state, not always the absolute final value."
          },
          "checkpoint": {
            "prompt": "A force sensor produces a sinusoid with nearly the same amplitude as the reference, but its peaks occur later. It will be used to compare event timing with another sensor. Which conclusion is sound?",
            "options": [
              {
                "id": "2025-uts1-q3-checkpoint-option-1",
                "label": "Amplitude and phase responses need separate assessment; delay can distort timing comparisons even when amplitude is adequate.",
                "feedback": "Correct. Amplitude agreement alone does not guarantee timing agreement."
              },
              {
                "id": "2025-uts1-q3-checkpoint-option-2",
                "label": "Nearly equal amplitudes prove that phase difference is also nearly zero.",
                "feedback": "Gain magnitude at one measurement point does not directly establish phase."
              },
              {
                "id": "2025-uts1-q3-checkpoint-option-3",
                "label": "The delay can be ignored because dynamic calibration assesses only magnitude.",
                "feedback": "Dynamic calibration also assesses phase or response time, which matter for event sequence."
              },
              {
                "id": "2025-uts1-q3-checkpoint-option-4",
                "label": "Later peaks always mean the sensor polarity is reversed.",
                "feedback": "Polarity reversal produces a particular shift, but general lag can arise from ordinary dynamic response."
              }
            ]
          }
        },
        {
          "id": "2025-uts1-q3-step-2",
          "title": "2. Use consistent frequency units",
          "content": "The paper uses $\\omega_n$ but gives Hz. We follow its stated numerical value and unit: natural frequency $f_n=1000\\ \\mathrm{Hz}$. If angular frequencies are used, convert both with $\\omega=2\\pi f$.\n\nThe frequency ratio $r$ is unchanged because the $2\\pi$ factors cancel. Do not divide a rad/s value by a Hz value.\n\n$$\n\\omega_n=2\\pi(1000)=6283.19\\ \\mathrm{rad/s},\\quad\\omega=2\\pi(600)=3769.91\\ \\mathrm{rad/s}\\\\r=\\frac{\\omega}{\\omega_n}=\\frac{f}{f_n}=\\frac{600}{1000}=0.6\n$$"
        },
        {
          "id": "2025-uts1-q3-step-3",
          "title": "3. Obtain the frequency response from the transfer function",
          "content": "For a sinusoidal input, replace $s$ by $j\\omega$. Here $j$ is the square root of −1, so $j^2=-1$ turns $s^2$ into $-\\omega^2$. Divide numerator and denominator by $\\omega_n^2$ to express the result using ratio $r$.\n\n$$\nG(j\\omega)=\\frac{\\omega_n^2}{\\omega_n^2-\\omega^2+j2\\zeta\\omega_n\\omega}=\\frac1{(1-r^2)+j(2\\zeta r)}\\\\1-r^2=1-0.6^2=0.64,\\qquad2\\zeta r=2(0.7)(0.6)=0.84\n$$"
        },
        {
          "id": "2025-uts1-q3-step-4",
          "title": "4. Calculate amplitude ratio from the complex magnitude",
          "content": "The magnitude of denominator $0.64+j0.84$ is the square root of the sum of its two squared components. With numerator 1, the amplitude ratio is the reciprocal of that magnitude.\n\nThe output amplitude is therefore about 94.69% of the ideal amplitude after static-sensitivity correction. For an illustrative 1 N input amplitude, the indicated amplitude is about 0.9469 N.\n\n$$\nM=|G|=\\frac1{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}}=\\frac1{\\sqrt{0.64^2+0.84^2}}=\\frac1{\\sqrt{1.1152}}=0.9469425\n$$"
        },
        {
          "id": "2025-uts1-q3-step-5",
          "title": "5. Calculate phase and explain the negative sign",
          "content": "The denominator has a positive angle. Dividing by it makes the output phase negative. Use $\\operatorname{atan2}$ so the quadrant remains correct when frequency crosses the natural frequency.\n\nA phase of −52.70° means the output lags the input. At 600 Hz, corresponding peaks are about 0.244 ms apart. This describes a different error from the amplitude reduction.\n\n$$\n\\phi=-\\operatorname{atan2}(0.84,0.64)=-52.6961^\\circ\\\\\\Delta t=\\frac{52.6961}{360(600)}=2.43963\\times10^{-4}\\ \\mathrm s\n$$"
        },
        {
          "id": "2025-uts1-q3-step-6",
          "title": "6. Express the amplitude difference as a percentage",
          "content": "The normalized ideal amplitude ratio is 1. Subtract 1 from $M$ and multiply by 100%. A negative sign indicates an under-read amplitude; if only error magnitude is requested, report its absolute value.\n\nPhase does not enter this amplitude-error formula. Two signals can have nearly equal amplitudes while differing substantially in phase.\n\n$$\n\\varepsilon_A=(M-1)100\\%=(0.9469425-1)100\\%=-5.30575\\%\\\\|\\varepsilon_A|=5.30575\\%\n$$"
        },
        {
          "id": "2025-uts1-q3-step-7",
          "title": "7. Define the bandwidth convention",
          "content": "We use the half-power boundary relative to static gain. At this boundary, amplitude falls to $1/\\sqrt2$ of its low-frequency value. This boundary is commonly called −3 dB, or exactly −3.0103 dB. The bandwidth then extends from 0 Hz to $f_b$. A 5%-amplitude-error limit would give a different frequency from this bandwidth definition.\n\n$$\nM(r_b)=\\frac1{\\sqrt2}\\quad\\Longrightarrow\\quad(1-r_b^2)^2+4\\zeta^2r_b^2=2\n$$"
        },
        {
          "id": "2025-uts1-q3-step-8",
          "title": "8. Solve the bandwidth boundary step by step",
          "content": "Expand the square, move 2 to the left, and set $u=r_b^2$. The substitution gives a quadratic in $u$. Choose its positive root because $r_b^2$ cannot be negative, then take another square root to obtain $r_b$.\n\n$$\nr_b^4+(4\\zeta^2-2)r_b^2-1=0\\\\u^2+(4(0.7)^2-2)u-1=u^2-0.04u-1=0\\\\u=0.02+\\sqrt{1.0004}=1.02019998\\\\r_b=\\sqrt u=1.01004949\n$$"
        },
        {
          "id": "2025-uts1-q3-step-9",
          "title": "9. Convert the ratio to Hz and check the result",
          "content": "Multiply $r_b$ by the 1000 Hz natural frequency. The result lies slightly above 1000 Hz. At the natural frequency, amplitude ratio $1/(2\\zeta)=0.7143$ remains just above the 0.7071 cutoff. The slightly higher cutoff frequency is therefore consistent.\n\nThe 600 Hz signal is within the −3 dB bandwidth, yet still has 5.31% amplitude loss and 52.70° phase lag. Being inside the bandwidth does not mean error-free measurement.\n\n$$\nf_b=r_bf_n=1.01004949(1000)=1010.0495\\ \\mathrm{Hz}\\approx1.010\\ \\mathrm{kHz}\n$$"
        }
      ],
      "finalAnswer": "Amplitude ratio 0.946943; output phase −52.696° relative to input. Signed amplitude error −5.30575% (magnitude 5.30575%). Using the half-power definition and a 1000 Hz natural frequency, bandwidth is approximately 0 to 1010.05 Hz.\n\n$$\n\\boxed{M=0.946943,\\quad\\phi=-52.696^\\circ,\\quad\\varepsilon_A=-5.30575\\%,\\quad f_b=1010.05\\ \\mathrm{Hz}}\n$$",
      "takeaway": "A response percentage refers to the change from the initial state, not always the absolute final value."
    },
    "2025-uas-q6": {
      "title": "Frequency limits and cross-axis sensitivity",
      "source": "Final exam 2025 · Question 6",
      "assumptions": [
        "The source curve is qualitative and its horizontal axis uses rad/s. Do not read ω-axis values as Hz. Natural frequency, damping, and circuit parameters needed for exact out-of-band sensitivity are not given."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Time and frequency response"
      ],
      "statement": "A piezoelectric accelerometer has nominal sensitivity $100\\ \\mathrm{mV/g}$, valid from $1$ to $10000\\ \\mathrm{Hz}$. The source response shows low-frequency attenuation, a flat band, a resonance peak, then high-frequency roll-off.\n(a) What happens at $0.5\\ \\mathrm{Hz}$? (b) What happens above $10000\\ \\mathrm{Hz}$, for example $25000\\ \\mathrm{Hz}$? (c) What does a cross-axis sensitivity of $5\\ \\mathrm{mV/g}$ mean?",
      "simulation": {
        "title": "Accelerometer",
        "caption": "The curve explains the usable band and resonance qualitatively; it is not additional numerical calibration data.",
        "params": [
          {
            "key": "frequency",
            "label": "Input frequency"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uas-q6-step-1",
          "title": "1. Use nominal sensitivity within its valid band",
          "content": "We use sensitivity to connect acceleration with voltage. **Sensitivity** is output change per unit input; $100\\ \\mathrm{mV/g}$ gives about 100 mV for 1 g of acceleration. The value applies along the sensing axis within the stated frequency band. Here g means standard gravitational acceleration, not grams.\n\nRead sensitivity together with its frequency range. The 1 to 10000 Hz specification identifies where conversion using 100 mV/g is supported by the question, not a promise for all motion.\n\n$$\nV_{\\mathrm{out}}\\approx Sa,\\qquad S=100\\ \\mathrm{mV/g},\\quad 1g\\approx9.80665\\ \\mathrm{m/s^2}\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The initial state and dynamic model determine response before the sensor reaches its final value.",
            "commonPitfall": "A response percentage refers to the change from the initial state, not always the absolute final value."
          },
          "checkpoint": {
            "prompt": "A piezoelectric accelerometer has a nominal sensitivity specified only within a stated band. When a signal exceeds the upper band limit, what is the soundest approach?",
            "options": [
              {
                "id": "2025-uas-q6-checkpoint-option-1",
                "label": "Keep using nominal sensitivity because all sensors have constant gain at every frequency.",
                "feedback": "Sensitivity depends on dynamic response; the nominal value is not unlimited in frequency."
              },
              {
                "id": "2025-uas-q6-checkpoint-option-2",
                "label": "Check the relevant frequency response or calibration; resonance and attenuation can invalidate nominal conversion.",
                "feedback": "Correct. Using or correcting the reading requires an appropriate response characterization."
              },
              {
                "id": "2025-uas-q6-checkpoint-option-3",
                "label": "Assume every frequency above the band necessarily gives a larger output.",
                "feedback": "A resonance peak does not mean the entire higher-frequency range remains amplified."
              },
              {
                "id": "2025-uas-q6-checkpoint-option-4",
                "label": "Ignore mounting direction because frequency error eliminates cross-axis sensitivity.",
                "feedback": "Cross-axis sensitivity is response to another axis and can still add error."
              }
            ]
          }
        },
        {
          "id": "2025-uas-q6-step-2",
          "title": "2. Separate amplitude, phase, and direction errors",
          "content": "For sinusoidal vibration, a sensor can change signal magnitude and shift its timing. Acceleration on another axis can also enter the reading. The question probes these effects through low frequency, high frequency, and cross-axis sensitivity."
        },
        {
          "id": "2025-uas-q6-step-3",
          "title": "3. Explain the response at 0.5 Hz",
          "content": "0.5 Hz lies below the 1 Hz lower limit. The piezoelectric charge and readout circuit do not maintain response to very slow changes. Output attenuates, so effective sensitivity drops below nominal and phase may shift. The question does not specify its exact value.\n\nPiezoelectric sensing generates charge under changing force, but leakage paths and readout circuitry make very slow responses hard to sustain. It is therefore not a direct choice for indefinitely measuring constant acceleration."
        },
        {
          "id": "2025-uas-q6-step-4",
          "title": "4. Compare high-frequency response with the flat region",
          "content": "In the flat region, relative gain stays near nominal. Near mechanical resonance, internal motion can grow and produce an output peak. The 10 kHz limit tells us when to stop assuming the nominal sensitivity remains valid."
        },
        {
          "id": "2025-uas-q6-step-5",
          "title": "5. Distinguish resonance from the region beyond it",
          "content": "Above 10 kHz, the 100 mV/g sensitivity is no longer guaranteed. Approaching resonance, output rises and dividing by nominal sensitivity overestimates acceleration. Far beyond resonance, output falls again. Thus not every frequency above 10 kHz increases the output.\n\nThe 25 kHz example is outside the valid band. The plot uses $\\omega$, so first convert with $\\omega=2\\pi f$. The qualitative curve suggests resonance effects but does not provide a sufficiently precise numerical sensitivity.\n\nWithout calibration points or a complete transfer function, do not infer a precise gain from a qualitative curve. The data support a trend and an out-of-range judgment, not an exact numerical correction.\n\n$$\nf=25000\\ \\mathrm{Hz}\\quad\\Longrightarrow\\quad\\omega=2\\pi f\\approx1.571\\times10^5\\ \\mathrm{rad/s}\n$$"
        },
        {
          "id": "2025-uas-q6-step-6",
          "title": "6. Use matching frequency units before comparing",
          "content": "Hertz counts cycles per second; rad/s counts phase angle per second. One cycle contains $2\\pi$ radians. Thus 25000 Hz cannot be placed directly at 25000 on an $\\omega$ axis.\n\n$$\n\\omega=2\\pi f,\\qquad f=\\frac{\\omega}{2\\pi}\n$$"
        },
        {
          "id": "2025-uas-q6-step-7",
          "title": "7. Interpret cross-axis sensitivity",
          "content": "Cross-axis sensitivity is response to acceleration perpendicular to the main sensing axis. A value of 5 mV/g means 1 g transverse acceleration can contribute about 5 mV to the output. If all output is attributed to the main axis, this appears as 0.05 g of acceleration.\n\nThe 0.05 g is an apparent main-axis reading obtained by treating all 5 mV as main-axis output. The actual transverse input in this example remains 1 g, not 0.05 g.\n\n$$\n\\frac{S_{\\perp}}{S_{\\parallel}}\\,100\\%=\\frac5{100}\\,100\\%=5\\%,\\qquad a_{\\mathrm{apparent}}=\\frac{5\\ \\mathrm{mV}}{100\\ \\mathrm{mV/g}}=0.05g\n$$"
        },
        {
          "id": "2025-uas-q6-step-8",
          "title": "8. Connect the findings to measurement choices",
          "content": "To reduce error, choose a sensor whose range covers the signal, align the measurement axis, and check transverse motion. A single sensitivity calibration cannot correct every error when frequency or direction changes."
        }
      ],
      "finalAnswer": "At 0.5 Hz, the response attenuates. At 25 kHz, nominal sensitivity is invalid and resonance may amplify the reading; no exact value is given. Cross-axis sensitivity of 5 mV/g is 5% of main-axis sensitivity.\n\n$$\n\\boxed{S_{\\perp}/S_{\\parallel}=5\\%,\\qquad 1g_{\\perp}\\ \\Rightarrow\\ 0.05g\\ \\text{apparent}}\n$$",
      "takeaway": "A response percentage refers to the change from the initial state, not always the absolute final value."
    },
    "2024-uts1-q4": {
      "title": "Temperature response when moving from water to air",
      "source": "Midterm 1 2024 · Question 4",
      "assumptions": [
        "The sensor is treated as isothermal and initially at 20°C equilibrium. Thermal properties follow the printed values, including C=0.2 J/(kg·°C).",
        "Signed error is output temperature minus input temperature. Its magnitude is unchanged under the opposite sign convention."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Time and frequency response"
      ],
      "statement": "The temperature system has unity steady-state sensitivity and first-order response. Initially the sensor is in equilibrium with 20°C air. At $t=0$ it enters 100°C water; at $t=60$ s it returns to 20°C air. The sensor has $M=0.05$ kg, $A=0.001$ m², and $C=0.2$ J/(kg·°C). Use $U_a=0.2$ W/(m²·°C), $U_w=1.0$ W/(m²·°C), and $\\tau=MC/(UA)$. (a) Derive $G(s)=\\Delta T_{\\mathrm{out}}(s)/\\Delta T_{\\mathrm{in}}(s)$; (b) calculate dynamic error at 10, 20, 50, 120, and 300 s.",
      "simulation": {
        "title": "Heating and cooling",
        "caption": "At 60 s the medium and time constant change. Sensor temperature remains continuous; error compares it with the current medium temperature.",
        "params": [
          {
            "key": "time",
            "label": "Time position"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uts1-q4-step-1",
          "title": "a · Relate heat input to sensor-temperature change",
          "content": "We label medium temperature $T_{\\mathrm{in}}$ and indicated sensor temperature be $T_{\\mathrm{out}}$. Changing sensor temperature requires energy; its total heat capacity is $MC$, in J/°C.\n\nHeat transfer from medium to sensor is $UA(T_{\\mathrm{in}}-T_{\\mathrm{out}})$. A hotter medium gives a positive difference and raises sensor temperature. Equate heat inflow to the rate of stored-energy change.\n\n$$\nMC\\frac{dT_{\\mathrm{out}}}{dt}=UA(T_{\\mathrm{in}}-T_{\\mathrm{out}})\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The initial state and dynamic model determine response before the sensor reaches its final value.",
            "commonPitfall": "A response percentage refers to the change from the initial state, not always the absolute final value."
          },
          "checkpoint": {
            "prompt": "A sensor heats in water and is then returned to air. Water has a larger heat-transfer coefficient than air. At transfer, the sensor has not exactly reached water temperature. Which model is appropriate?",
            "options": [
              {
                "id": "2024-uts1-q4-checkpoint-option-1",
                "label": "Cooling starts exactly at water temperature regardless of immersion duration.",
                "feedback": "The sensor only approaches water temperature during heating. Use the value actually reached at transfer."
              },
              {
                "id": "2024-uts1-q4-checkpoint-option-2",
                "label": "Cooling must use the water time constant because the sensor itself is unchanged.",
                "feedback": "The time constant also includes the heat-transfer coefficient. Changing medium changes that parameter even if sensor mass stays fixed."
              },
              {
                "id": "2024-uts1-q4-checkpoint-option-3",
                "label": "Output temperature immediately jumps to air temperature because the environment changed.",
                "feedback": "The surroundings can change abruptly, but the sensor’s heat capacity makes its temperature change gradually."
              },
              {
                "id": "2024-uts1-q4-checkpoint-option-4",
                "label": "Output temperature stays continuous, starts from its transfer-time value, and approaches air temperature with the air time constant.",
                "feedback": "Correct. The response must join continuously and use the time constant appropriate to each medium."
              }
            ]
          }
        },
        {
          "id": "2024-uts1-q4-step-2",
          "title": "a · Derive the first-order transfer function",
          "content": "Divide both sides by $UA$, then bring $T_{\\mathrm{out}}$ to the left. The derivative coefficient is the **time constant**, the response’s time scale, $\\tau=MC/(UA)$.\n\nUse temperature deviations from initial equilibrium, so the initial deviation is zero. The Laplace transform converts the derivative into $s\\Delta T_{\\mathrm{out}}(s)$. Dividing gives the transfer function for a fixed medium.\n\n$$\n\\begin{aligned}\\tau\\frac{d\\Delta T_{\\mathrm{out}}}{dt}+\\Delta T_{\\mathrm{out}}&=\\Delta T_{\\mathrm{in}}\\\\(\\tau s+1)\\Delta T_{\\mathrm{out}}(s)&=\\Delta T_{\\mathrm{in}}(s)\\\\G(s)&=\\frac1{\\tau s+1}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts1-q4-step-3",
          "title": "a · Calculate a time constant for each medium",
          "content": "From the data, $MC=0.05(0.2)=0.01$ J/°C. In water, $U_wA=1.0(0.001)=0.001$ W/°C. In air, $U_aA=0.0002$ W/°C.\n\nSince W = J/s, dividing heat capacity by heat-transfer conductance gives seconds. Water gives $\\tau_w=10$ s, while air gives $\\tau_a=50$ s. The sensor responds more slowly in air.\n\n$$\n\\tau_w=\\frac{0.01}{0.001}=10\\ \\mathrm s,\\quad \\tau_a=\\frac{0.01}{0.0002}=50\\ \\mathrm s,\\qquad G_w(s)=\\frac1{10s+1},\\quad G_a(s)=\\frac1{50s+1}\n$$"
        },
        {
          "id": "2024-uts1-q4-step-4",
          "title": "b · Separate the phases and define error",
          "content": "The input is medium temperature: 100°C during 0 to 60 s, then 20°C after 60 s. Output is the gradually changing sensor temperature. They need not match during the process.\n\nDefine signed error as output minus input. Negative error means the sensor remains below medium temperature; positive error means it is still hotter.\n\n$$\nE_d(t)=T_{\\mathrm{out}}(t)-T_{\\mathrm{in}}(t)\n$$"
        },
        {
          "id": "2024-uts1-q4-step-5",
          "title": "b · Write the heating response in water",
          "content": "For constant input temperature, first-order response approaches its final value exponentially: final temperature plus the initial and final difference times $e^{-t/\\tau}$. Here the initial value is 20°C, the final value 100°C, and $\\tau=10$ s.\n\nThe initial and final difference is −80°C. At $t=0$ the equation gives 20°C; as time increases, the exponential shrinks and output approaches 100°C.\n\n$$\nT_{\\mathrm{out}}(t)=100+(20-100)e^{-t/10}=100-80e^{-t/10},\\qquad0\\le t<60\n$$"
        },
        {
          "id": "2024-uts1-q4-step-6",
          "title": "b · Calculate the three errors before transfer",
          "content": "At 10,20, and 50 s the sensor remains in 100°C water. Subtract 100 from the heating response to obtain error $-80e^{-t/10}$.\n\nThese times correspond to 1,2, and 5 water time constants. Error decreases but does not become exactly zero at a finite time.\n\n$$\n\\begin{aligned}E_d(10)&=-80e^{-1}=-29.43036^\\circ\\mathrm C\\\\E_d(20)&=-80e^{-2}=-10.82682^\\circ\\mathrm C\\\\E_d(50)&=-80e^{-5}=-0.53904^\\circ\\mathrm C\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts1-q4-step-7",
          "title": "Find sensor temperature just before returning to air",
          "content": "The sensor stays in water for 60 s, or 6 water time constants. Insert 60 into the heating response to find the cooling phase’s initial temperature.\n\nThe result,99.80170°C, is close to 100°C but not identical. Sensor temperature cannot jump when the medium changes, so $T_{\\mathrm{out}}(60^+)=T_{\\mathrm{out}}(60^-)$.\n\n$$\nT_{60}=100-80e^{-60/10}=99.8016998^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uts1-q4-step-8",
          "title": "Use elapsed time since transfer for cooling",
          "content": "In air the final temperature returns to 20°C and the time constant is 50 s. Cooling begins at $t=60$, so the exponential uses elapsed time $t-60$, not $t$.\n\nThe initial excess above air temperature is $99.8016998-20=79.8016998$°C. Use this value to keep the response continuous between phases.\n\n$$\nT_{\\mathrm{out}}(t)=20+79.8016998e^{-(t-60)/50},\\qquad E_d(t)=79.8016998e^{-(t-60)/50}\\quad(t\\ge60)\n$$"
        },
        {
          "id": "2024-uts1-q4-step-9",
          "title": "b · Calculate error at 120 and 300 s",
          "content": "At 120 s the sensor has cooled for 60 s; at 300 s it has cooled for 240 s. Global time is not the elapsed time in the air phase.\n\nErrors are positive because the sensor remains warmer than the air. Add 20°C only to recover output temperature, not when reporting error.\n\n$$\n\\begin{aligned}E_d(120)&=79.8016998e^{-(120-60)/50}=24.03581^\\circ\\mathrm C\\\\E_d(300)&=79.8016998e^{-(300-60)/50}=0.65675^\\circ\\mathrm C\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts1-q4-step-10",
          "title": "Compare output, input, and error",
          "content": "The table separates sensor indication from medium temperature. Error magnitude is the absolute value of the final column. Defining error as input minus output would reverse every sign but leave magnitudes unchanged.\n\n| t (s) | Input T (°C) | Output T (°C) | E_d (°C) |\n| --- | --- | --- | --- |\n| 10 | 100 | 70.56964 | −29.43036 |\n| 20 | 100 | 89.17318 | −10.82682 |\n| 50 | 100 | 99.46096 | −0.53904 |\n| 120 | 20 | 44.03581 | +24.03581 |\n| 300 | 20 | 20.65675 | +0.65675 |"
        },
        {
          "id": "2024-uts1-q4-step-11",
          "title": "Check the model at the phase boundary",
          "content": "Output starts at 20°C, approaches 100°C while heating, then falls continuously toward 20°C. Error can jump at 60 s because the input jumps; the sensor temperature itself remains continuous.\n\nOne fixed transfer function cannot describe the whole history because $U$ changes with medium. Each medium has its own transfer function, and the first phase’s final temperature becomes the second phase’s initial condition."
        }
      ],
      "finalAnswer": "The transfer function is $1/(10s+1)$ in water and $1/(50s+1)$ in air. We use $E_d=T_{\\mathrm{out}}-T_{\\mathrm{in}}$. Errors at 10, 20, and 50 s are −29.43036, −10.82682, and −0.53904°C. Errors at 120 and 300 s are +24.03581 and +0.65675°C.\n\n$$\n\\boxed{\\begin{aligned}\\tau_w&=10\\ \\mathrm s,\\quad\\tau_a=50\\ \\mathrm s\\\\E_d(10)&=-29.43036^\\circ\\mathrm C\\\\E_d(20)&=-10.82682^\\circ\\mathrm C\\\\E_d(50)&=-0.53904^\\circ\\mathrm C\\\\E_d(120)&=+24.03581^\\circ\\mathrm C\\\\E_d(300)&=+0.65675^\\circ\\mathrm C\\end{aligned}}\n$$",
      "takeaway": "A response percentage refers to the change from the initial state, not always the absolute final value."
    },
    "2024-uas-q3": {
      "title": "Frequency limit for a 5% amplitude error",
      "source": "Final exam 2024 · Question 3",
      "assumptions": [
        "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
        "The printed damping term omits a factor of s. Results use the second-order model explicitly stated here. The source does not provide enough instrument geometry for a device-specific force diagram."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Time and frequency response"
      ],
      "statement": "3. [10%] Dynamic Characteristics of Measurement Systems\nA seismic instrument is characterized by the following dynamic transfer function $G(s)=\\omega_n^2/(s^2+2\\zeta\\omega_n+\\omega_n^2)$ [as printed]. Where $\\omega_n$ is the natural frequency and $\\zeta$ is the damping ratio. The instrument has a natural frequency of 20 Hz and a damping ratio of 0.65. Determine the maximum input frequency for a vibration such that the amplitude error in the indicated displacement is less than 5%.",
      "simulation": {
        "title": "Dynamic response",
        "caption": "The amplitude ratio reaches 0.95 near 14.40 Hz; this checks amplitude error only.",
        "params": [
          {
            "key": "frequency",
            "label": "Input frequency"
          },
          {
            "key": "damping",
            "label": "Damping ratio ζ"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uas-q3-step-1",
          "title": "Identify the quantity constrained by the question",
          "content": "We compare the indicated displacement amplitude with the input amplitude. The constraint concerns **amplitude error**, the relative difference between those amplitudes. The question does not ask for phase error or a step response.\n\nFor sinusoidal vibration at one frequency, the transfer function gives the output-to-input amplitude ratio. Its steady-state sensitivity is unity, so the ideal ratio is 1.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The initial state and dynamic model determine response before the sensor reaches its final value.",
            "commonPitfall": "A response percentage refers to the change from the initial state, not always the absolute final value."
          }
        },
        {
          "id": "2024-uas-q3-step-2",
          "title": "Correct the damping term explicitly",
          "content": "The printed denominator contains $2\\zeta\\omega_n$ without $s$. That term has inverse-second units, while $s^2$ and $\\omega_n^2$ have inverse-second-squared units. The sum is dimensionally inconsistent.\n\nUse the second-order form with $2\\zeta\\omega_ns$. Define $r=f/f_n=\\omega/\\omega_n$. Matching units cancel, so $r=f/20$ can use Hz directly.\n\n$$\nG(s)=\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_ns+\\omega_n^2},\\qquad r=\\frac{f}{20}\n$$"
        },
        {
          "id": "2024-uas-q3-step-3",
          "title": "Convert the transfer function into an amplitude ratio",
          "content": "For steady sinusoidal response, substitute $s=j\\omega$, where $j^2=-1$. The denominator has real part $\\omega_n^2-\\omega^2$ and imaginary part $2\\zeta\\omega_n\\omega$.\n\nDivide numerator and denominator by $\\omega_n^2$. The magnitude of $a+jb$ is $\\sqrt{a^2+b^2}$, giving the amplitude ratio $M$.\n\n$$\nG(j\\omega)=\\frac1{1-r^2+j\\,2\\zeta r},\\qquad M(r)=\\frac1{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}}\n$$"
        },
        {
          "id": "2024-uas-q3-step-4",
          "title": "Translate 5% error into two limits",
          "content": "Relative amplitude error is $|M-1|$. $M=0.95$ means a reading 5% too low; $M=1.05$ means 5% too high.\n\nBoth limits must be checked. A second-order response can rise near resonance before falling, so do not assume it decreases from zero frequency onward.\n\n$$\n|M-1|<0.05\\quad\\Longleftrightarrow\\quad0.95<M<1.05\n$$"
        },
        {
          "id": "2024-uas-q3-step-5",
          "title": "Check the response peak before selecting a boundary",
          "content": "$M$ is largest where its squared denominator is smallest. Write $D(r)=1+(4\\zeta^2-2)r^2+r^4$. From $D^{\\prime}(r)=0$, the nonzero peak satisfies $r_p^2=1-2\\zeta^2$.\n\nFor $\\zeta=0.65$, the peak is only about 1.01223, or 1.223% above ideal. It never exceeds 1.05, so the operating boundary comes from the fall to $M=0.95$.\n\n$$\nr_p^2=1-2(0.65)^2=0.155,\\qquad M_{\\max}=\\frac1{2(0.65)\\sqrt{1-0.65^2}}=1.01223\n$$"
        },
        {
          "id": "2024-uas-q3-step-6",
          "title": "Expand the boundary equation",
          "content": "Insert $M=0.95$ and $2\\zeta=1.3$. Take reciprocals, then square. These magnitudes are positive, so this operation preserves the desired boundary.\n\nExpand $(1-r^2)^2$ into $1-2r^2+r^4$, while $(1.3r)^2=1.69r^2$. Combine the $r^2$ terms and subtract $1/0.95^2$ from both sides.\n\n$$\n\\begin{aligned}(1-r^2)^2+(1.3r)^2&=\\frac1{0.95^2}\\\\1-2r^2+r^4+1.69r^2&=1.10803324\\\\r^4-0.31r^2-0.10803324&=0\\end{aligned}\n$$"
        },
        {
          "id": "2024-uas-q3-step-7",
          "title": "Use x = r² to solve for the root",
          "content": "The equation contains only $r^4$ and $r^2$. Set $x=r^2$ to obtain the ordinary quadratic $x^2-0.31x-0.10803324=0$.\n\nSelect the positive $x$ root because a squared frequency ratio cannot be negative. Then take one more square root to obtain $r$.\n\n$$\nx=\\frac{0.31+\\sqrt{0.31^2+4(0.10803324)}}2=0.51839819,\\qquad r=\\sqrt{x}=0.71999874\n$$"
        },
        {
          "id": "2024-uas-q3-step-8",
          "title": "Convert to hertz and respect the strict limit",
          "content": "From $r=f/20$, multiply by 20 Hz to obtain a boundary of 14.39997 Hz. At that frequency $M=0.95$, so error is exactly 5%.\n\nThe question requires less than 5%, so choose $f$ below that boundary. This controls amplitude only; it does not guarantee equal input and output phase.\n\n$$\nf_{\\mathrm{lim}}=20(0.71999874)=14.39997\\ \\mathrm{Hz},\\qquad0\\le f<f_{\\mathrm{lim}}\n$$"
        }
      ],
      "finalAnswer": "The 5% amplitude-error boundary is approximately 14.40 Hz. Use an input frequency below this boundary to satisfy “less than 5%”.\n\n$$\n\\boxed{0\\le f<f_{\\mathrm{lim}},\\qquad f_{\\mathrm{lim}}=14.39997\\ \\mathrm{Hz}\\approx14.40\\ \\mathrm{Hz}}\n$$",
      "takeaway": "A response percentage refers to the change from the initial state, not always the absolute final value."
    },
    "2023-uts1-q4": {
      "title": "Thermometer response time and frequency limit",
      "source": "Midterm 1 2023 · Question 4",
      "assumptions": [
        "The thermometer starts at equilibrium at 30°C. Time zero is chosen at the temperature step. No extra offset is added because the transfer function gives only sensitivity and time constant.",
        "The 3 dB bound is amplitude attenuation relative to static gain rather than the logarithm of a dimensional mV/°C gain. Exact −3.000 dB is distinguished from the half-power value −3.0103 dB."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Time and frequency response"
      ],
      "statement": "A thermometer has transfer function $G(s)=O(s)/I(s)=0.2/(7s+1)$. Output O is in mV and input I is temperature in °C. (a) Find elapsed time after a step from 30°C to 40°C to reach 98% of that change. (b) Find the frequency limit for dynamic amplitude error below 3 dB.",
      "simulation": {
        "title": "Dynamic response",
        "caption": "The response starts at 6 mV and approaches 8 mV. The 98%-of-change target is 7.96 mV.",
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
          "id": "2023-uts1-q4-step-1",
          "title": "Identify static gain and the time constant",
          "content": "The standard first-order form is $G(s)=K/(\\tau s+1)$. Matching coefficients gives static sensitivity $K=0.2$ mV/°C and time constant $\\tau=7$ s. The $s$ in the transfer function is the Laplace variable rather than reading time.\n\nStatic gain relates temperature to settled output. The time constant sets how quickly output approaches that condition after temperature changes.\n\n$$\nK=0.2\\ \\mathrm{mV/{}^\\circ C},\\qquad\\tau=7\\ \\mathrm s\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The initial state and dynamic model determine response before the sensor reaches its final value.",
            "commonPitfall": "A response percentage refers to the change from the initial state, not always the absolute final value."
          },
          "checkpoint": {
            "prompt": "A first-order thermometer starts at equilibrium at a nonzero temperature, then receives a sudden temperature rise. The question asks when it reaches 98% of the temperature change. The correct reference for 98% is…",
            "options": [
              {
                "id": "2023-uts1-q4-checkpoint-option-1",
                "label": "The final output measured from zero, regardless of the initial value.",
                "feedback": "With nonzero initial output, 98% of the final value differs from 98% of the rise. The first quantity does not match the requested change."
              },
              {
                "id": "2023-uts1-q4-checkpoint-option-2",
                "label": "Total time since power-on, even if the temperature step happens much later.",
                "feedback": "The step response has not begun before the step occurs. Power-on time is not automatically response duration."
              },
              {
                "id": "2023-uts1-q4-checkpoint-option-3",
                "label": "The instrument's time constant; after one time constant, output always reaches 98%.",
                "feedback": "The time constant sets response speed, not the time for every percentage. One time constant does not complete 98% of the change."
              },
              {
                "id": "2023-uts1-q4-checkpoint-option-4",
                "label": "The output increase from initial to final value, with time measured from the temperature step.",
                "feedback": "Correct. The completed fraction is measured from initial output and compared with the whole change toward equilibrium."
              }
            ]
          }
        },
        {
          "id": "2023-uts1-q4-step-2",
          "title": "4a · Find the required output change",
          "content": "Assume the thermometer is initially settled at 30°C. Initial output is 0.2×30=6 mV. At the final 40°C temperature, target output is 0.2×40=8 mV.\n\nThe output rise to be completed is 2 mV. The 98% target refers to this rise rather than the entire final value of 8 mV.\n\n$$\nO_0=6\\ \\mathrm{mV},\\quad O_\\infty=8\\ \\mathrm{mV},\\quad\\Delta O=2\\ \\mathrm{mV},\\quad O_{98}=6+0.98(2)=7.96\\ \\mathrm{mV}\n$$",
          "simulation": {
            "title": "Dynamic response",
            "caption": "The response starts at 6 mV and approaches 8 mV. The 98%-of-change target is 7.96 mV.",
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
          }
        },
        {
          "id": "2023-uts1-q4-step-3",
          "title": "Write the step response from the correct initial value",
          "content": "Set t=0 at the temperature step. A first-order response is the initial value plus the final change multiplied by its completed fraction.\n\nThe completed fraction is $1-e^{-t/\\tau}$. It is zero at t=0 and approaches one as time grows. The expression therefore satisfies both physical limits.\n\n$$\nO(t)=O_0+(O_\\infty-O_0)(1-e^{-t/\\tau})=6+2(1-e^{-t/7})\\quad[\\mathrm{mV}]\n$$"
        },
        {
          "id": "2023-uts1-q4-step-4",
          "title": "Turn the 98% target into a 2% remainder",
          "content": "If 98% of the change is complete, 2% remains. The exponential represents that remaining fraction, so set it equal to 0.02.\n\nWe can also insert target output 7.96 mV into the equation. We subtract 6 mV from both sides, then divide by the 2 mV change. Both approaches give the same relation.\n\n$$\n\\frac{O(t)-O_0}{O_\\infty-O_0}=0.98\\quad\\Rightarrow\\quad1-e^{-t/7}=0.98\\quad\\Rightarrow\\quad e^{-t/7}=0.02\n$$"
        },
        {
          "id": "2023-uts1-q4-step-5",
          "title": "Solve for time using the natural logarithm",
          "content": "The natural logarithm, $\\ln$, reverses the exponential $e^x$. Apply $\\ln$ to both sides so that the exponent $-t/7$ can be read directly.\n\nWe multiply both sides by −7. Since ln(0.02) is negative, the resulting time is positive, as required for waiting after the step.\n\n$$\n-\\frac t7=\\ln(0.02)\\quad\\Rightarrow\\quad t=-7\\ln(0.02)=\\boxed{27.38416\\ \\mathrm s}\n$$"
        },
        {
          "id": "2023-uts1-q4-step-6",
          "title": "Check what the calculated time means",
          "content": "The time is about 3.912 time constants. Substitution gives output 7.96 mV. Dividing by sensitivity 0.2 mV/°C gives an indicated temperature of 39.8°C.\n\nInput is already 40°C, but the sensor still lacks 0.2°C of the 10°C rise. That remaining 0.2°C is 2% of the change rather than 2% of the 40°C temperature.\n\n$$\n\\frac{t_{98}}{\\tau}=3.9120,\\qquad\\frac{7.96\\ \\mathrm{mV}}{0.2\\ \\mathrm{mV/{}^\\circ C}}=39.8^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2023-uts1-q4-step-7",
          "title": "4b · Compare amplitude with the static response",
          "content": "For sinusoidal temperature input, the sensor can produce reduced amplitude and a phase delay. The error limit is in dB, so compare output amplitude with the ideal static response.\n\nStatic gain is K=0.2 mV/°C. We use the ratio $M=|G(j\\omega)|/K$ so ideal gain is one and the result does not depend on choosing mV or V.\n\n$$\nM(\\omega)=\\frac{|G(j\\omega)|}{K}\n$$",
          "simulation": {
            "title": "Frequency response",
            "caption": "Compare gain with its DC value. The exact −3 dB boundary is slightly below the half-power point.",
            "params": [
              {
                "key": "frequency",
                "label": "Input frequency"
              }
            ]
          }
        },
        {
          "id": "2023-uts1-q4-step-8",
          "title": "Find gain magnitude for a sinusoidal frequency",
          "content": "Substituting $s=j\\omega$, where $j^2=-1$, gives denominator $1+j7\\omega$. A complex number with real part 1 and imaginary part $7\\omega$ has magnitude $\\sqrt{1+(7\\omega)^2}$.\n\nDividing by static gain 0.2 cancels the numerator. At zero frequency, M=1; increasing frequency increases the denominator and reduces relative amplitude.\n\n$$\n|G(j\\omega)|=\\frac{0.2}{\\sqrt{1+(7\\omega)^2}},\\qquad M(\\omega)=\\frac1{\\sqrt{1+(7\\omega)^2}}\n$$"
        },
        {
          "id": "2023-uts1-q4-step-9",
          "title": "Translate the 3 dB limit into an amplitude ratio",
          "content": "For an amplitude ratio, gain in dB is 20 log10 M. This first-order sensor attenuates amplitude, so the gain is zero or negative.\n\nAmplitude error below 3 dB means attenuation magnitude below 3 dB, or gain greater than −3 dB. Converting back gives M greater than about 0.707946.\n\n$$\n20\\log_{10}M>-3\\quad\\Rightarrow\\quad M>10^{-3/20}=0.7079458\n$$"
        },
        {
          "id": "2023-uts1-q4-step-10",
          "title": "Solve the angular-frequency boundary",
          "content": "We insert the expression for M into the inequality. All quantities are positive, so taking reciprocals reverses the inequality. Squaring then allows isolation of (7ω)².\n\nWe use equality to locate the exact boundary. Frequencies below it satisfy the less-than-3-dB condition.\n\n$$\n\\begin{aligned}\\frac1{\\sqrt{1+(7\\omega)^2}}&>10^{-3/20}\\\\1+(7\\omega)^2&<10^{3/10}\\\\\\omega&<\\frac{\\sqrt{10^{0.3}-1}}7=0.142518335\\ \\mathrm{rad/s}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts1-q4-step-11",
          "title": "Convert radians per second into hertz",
          "content": "One cycle contains $2\\pi$ radians, so $f=\\omega/(2\\pi)$. We divide the angular-frequency boundary by $2\\pi$ to obtain hertz.\n\nAt the boundary, attenuation equals exactly 3 dB. Since the question requires less than 3 dB, operating frequency must be below the boundary rather than exactly at it.\n\n$$\n\\boxed{0\\le f<f_{\\rm lim}},\\qquad f_{\\rm lim}=\\frac{\\sqrt{10^{0.3}-1}}{2\\pi(7)}=\\boxed{0.02268250\\ \\mathrm{Hz}}\n$$"
        },
        {
          "id": "2023-uts1-q4-step-12",
          "title": "Distinguish exact 3 dB from the half-power approximation",
          "content": "A first-order cutoff is often written $f_c=1/(2\\pi\\tau)$. There, $M=1/\\sqrt2$ and gain is actually −3.0103 dB, commonly rounded to −3 dB.\n\nThat approximation gives 0.02273642 Hz, very close to the exact 0.02268250 Hz boundary. For the strict condition below 3.000 dB, use the smaller exact boundary.\n\nThis limit checks amplitude only. The sensor still has phase delay; the question sets no additional phase constraint.\n\n$$\nf_c=\\frac1{2\\pi\\tau}=0.02273642\\ \\mathrm{Hz},\\qquad20\\log_{10}\\left(\\frac1{\\sqrt2}\\right)=-3.0103\\ \\mathrm{dB}\n$$"
        }
      ],
      "finalAnswer": "Time to reach 98% of the change is 27.384 s after the temperature step. For amplitude attenuation strictly below 3 dB, use f<0.02268250 Hz. The usual half-power cutoff approximation is 0.02273642 Hz.\n\n$$\n\\boxed{t_{98}=27.38416\\ \\mathrm s,\\qquad 0\\le f<0.02268250\\ \\mathrm{Hz}}\n$$",
      "takeaway": "A response percentage refers to the change from the initial state, not always the absolute final value."
    },
    "2023-uts2-q4": {
      "title": "Doppler and vibrometer voltage",
      "source": "Midterm 2 2023 · Question 4",
      "assumptions": [
        "The medium is stationary and motion is along the source-observer line. Vibrometer motion is sinusoidal, with constant sensitivity in the stated band."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Time and frequency response"
      ],
      "statement": "(a) A car emits 880 Hz sound while travelling at 120 km/h. The police observer is stationary; sound speed is 330 m/s. Find the observed frequency when the car approaches and when it recedes. (b) A vibrometer has sensitivity $40\\,\\mathrm{mV/(cm/s)}$ over $10\\le f\\le2000\\,\\mathrm{Hz}$, with $e\\approx BLv=Kv$. For sinusoidal vibration with fixed acceleration amplitude $1g=9.81\\,\\mathrm{m/s^2}$, find output-voltage amplitude at 10 Hz and 2000 Hz.",
      "simulation": {
        "title": "Doppler shift",
        "caption": "Wavefront spacing determines received frequency.",
        "params": [
          {
            "key": "speed",
            "label": "Source speed"
          },
          {
            "key": "angle",
            "label": "Motion angle θ"
          }
        ]
      },
      "steps": [
        {
          "id": "2023-uts2-q4-step-1",
          "title": "4a · Identify the source, observer, and speed units",
          "content": "The car emits sound at 880 Hz, so it is the moving source. The stationary officer receives that sound. We use the moving-source Doppler model with stationary air.\n\nCar speed and sound speed must use the same units. Convert 120 km/h to m/s by multiplying by 1000 m/km and dividing by 3600 s/hour.\n\n$$\nv_s=120\\frac{1000}{3600}=33.3333\\ \\mathrm{m/s},\\qquad c=330\\ \\mathrm{m/s},\\qquad f_s=880\\ \\mathrm{Hz}\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The initial state and dynamic model determine response before the sensor reaches its final value.",
            "commonPitfall": "A response percentage refers to the change from the initial state, not always the absolute final value."
          },
          "checkpoint": {
            "prompt": "A vibrometer produces voltage proportional to velocity. Two sinusoidal vibrations have equal acceleration amplitude but different frequencies, both within the constant-sensitivity range. Why does the higher-frequency vibration give less voltage?",
            "options": [
              {
                "id": "2023-uts2-q4-checkpoint-option-1",
                "label": "Frequency changes the voltage unit from volts to millivolts.",
                "feedback": "Volts and millivolts are alternative ways of expressing the same voltage. Unit conversion does not explain a physical change."
              },
              {
                "id": "2023-uts2-q4-checkpoint-option-2",
                "label": "Equal acceleration must produce equal velocity at all frequencies.",
                "feedback": "The relationship between acceleration and velocity also depends on sinusoidal frequency."
              },
              {
                "id": "2023-uts2-q4-checkpoint-option-3",
                "label": "For sinusoidal motion, equal acceleration at higher frequency requires smaller velocity amplitude.",
                "feedback": "Correct. At fixed acceleration and higher frequency, the sensor receives a smaller velocity amplitude."
              },
              {
                "id": "2023-uts2-q4-checkpoint-option-4",
                "label": "Instrument sensitivity must fall with increasing frequency even though it is stated to be constant.",
                "feedback": "This contradicts the stated constant-sensitivity condition within the working band."
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q4-step-2",
          "title": "Find wave-crest spacing during approach",
          "content": "In one source period $T_s=1/f_s$, a sound crest travels $cT_s$. During the same time, the car moves forward by $v_sT_s$ before emitting the next crest.\n\nThe spacing ahead of the source becomes $\\lambda=(c-v_s)T_s$. A stationary observer receives crests at rate $f=c/\\lambda$. The denominator is smaller than $c$, so frequency rises.\n\n$$\n\\lambda_{\\rm approach}=\\frac{c-v_s}{f_s},\\qquad f_{\\rm approach}=\\frac c{\\lambda_{\\rm approach}}=f_s\\frac c{c-v_s}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-3",
          "title": "Calculate the approaching frequency",
          "content": "We insert the speeds with subtraction, matching the shorter crest spacing. The subtraction belongs in the denominator because the source moves while the observer stays still.\n\nThe result must exceed 880 Hz. The value near 978.88 Hz passes this direction check.\n\n$$\nf_{\\rm approach}=880\\frac{330}{330-33.3333}=\\boxed{978.88\\ \\mathrm{Hz}}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-4",
          "title": "Reverse the crest-spacing change during recession",
          "content": "As the car recedes, the next emission point is farther from the officer. Spacing between crests travelling toward the officer increases, so the denominator becomes c+vs.\n\nThe result falls below 880 Hz. Both results assume motion along the line to the officer; an oblique path needs the radial velocity component.\n\nAlthough the question mentions police Doppler detection, its data describe sound emitted by the car. We therefore do not add the two-way shift of a reflected radar signal.\n\n$$\nf_{\\rm recede}=880\\frac{330}{330+33.3333}=\\boxed{799.27\\ \\mathrm{Hz}}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-5",
          "title": "4b · Identify what the vibrometer measures directly",
          "content": "This vibrometer produces voltage proportional to coil velocity: $e\\approx Kv$. The problem gives acceleration amplitude of 1G rather than velocity amplitude, so we must connect those quantities first.\n\nA hat, as in $\\hat a$, denotes peak amplitude. Here $\\hat a=9.81\\ \\mathrm{m/s^2}$, held fixed at both frequencies.\n\n$$\n\\hat e=K\\hat v,\\qquad \\hat a=9.81\\ \\mathrm{m/s^2}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-6",
          "title": "Connect velocity and acceleration for sinusoidal motion",
          "content": "We take displacement $x(t)=\\hat x\\sin\\omega t$. One derivative gives velocity, and the next gives acceleration. Each derivative introduces a factor of $\\omega$ into the amplitude.\n\nThus $\\hat v=\\omega\\hat x$ and $\\hat a=\\omega^2\\hat x=\\omega\\hat v$. Frequency $f$ counts cycles per second, while $\\omega=2\\pi f$ uses radians per second.\n\n$$\n\\hat v=\\frac{\\hat a}{\\omega}=\\frac{\\hat a}{2\\pi f},\\qquad\\hat e=\\frac{K\\hat a}{2\\pi f}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-7",
          "title": "Match sensitivity and velocity units",
          "content": "Sensitivity 40 mV/(cm/s) means a velocity of 1 cm/s gives 40 mV. Since the motion calculation uses m/s, convert both units in that ratio.\n\n40 mV equals 0.040 V, and 1 cm/s equals 0.01 m/s. Their ratio is 4 V/(m/s), so the resulting voltage is directly in volts.\n\n$$\nK=\\frac{0.040\\ \\mathrm V}{0.01\\ \\mathrm{m/s}}=4\\ \\mathrm{V/(m/s)},\\qquad\\hat e=\\frac{4(9.81)}{2\\pi f}\\ \\mathrm V\n$$",
          "simulation": {
            "title": "Vibrometer",
            "caption": "Voltage amplitude falls as frequency rises at fixed acceleration.",
            "params": [
              {
                "key": "frequency",
                "label": "Input frequency"
              },
              {
                "key": "time",
                "label": "Time position"
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q4-step-8",
          "title": "Calculate output at 10 Hz",
          "content": "We calculate angular frequency, then divide acceleration amplitude by it to obtain velocity amplitude. We multiply that velocity by sensitivity.\n\nThe result 0.624524 V equals 624.524 mV. It is the peak amplitude of a sinusoidal output rather than a constant voltage.\n\n$$\n\\begin{aligned}\\omega&=2\\pi(10)=62.8319\\ \\mathrm{rad/s}\\\\\\hat v&=\\frac{9.81}{62.8319}=0.156131\\ \\mathrm{m/s}\\\\\\hat e&=4(0.156131)=0.624524\\ \\mathrm V=624.524\\ \\mathrm{mV}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts2-q4-step-9",
          "title": "Calculate output at 2000 Hz",
          "content": "Follow the same sequence at 2000 Hz. Acceleration stays at 9.81 m/s², but peak velocity is now much smaller because it is divided by a higher frequency.\n\nMultiplying by sensitivity gives a peak voltage of about 0.00312262 V, or 3.12262 mV.\n\n$$\n\\hat v=\\frac{9.81}{2\\pi(2000)}=0.000780655\\ \\mathrm{m/s},\\qquad\\hat e=4(0.000780655)=\\boxed{3.12262\\ \\mathrm{mV}}\n$$",
          "simulation": {
            "title": "Vibrometer",
            "caption": "Compare 10 and 2000 Hz to check the 200:1 ratio.",
            "params": [
              {
                "key": "frequency",
                "label": "Input frequency"
              },
              {
                "key": "time",
                "label": "Time position"
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q4-step-10",
          "title": "Check the relationship between the results",
          "content": "Frequency rises from 10 to 2000 Hz, a factor of 200. At fixed acceleration, the formula makes velocity and voltage fall by a factor of 200. The two results satisfy that relationship.\n\nThis conclusion uses the stated constant sensitivity over 10 to 2000 Hz. If velocity amplitude were fixed instead of acceleration amplitude, voltage would not decrease in this way.\n\nBoth numbers are peak amplitudes. RMS for a sinusoid would require division by the square root of two; the question does not request that conversion.\n\n$$\n\\frac{\\hat e(10)}{\\hat e(2000)}=\\frac{2000}{10}=200\n$$"
        }
      ],
      "finalAnswer": "Observed sound is 978.88 Hz on approach and 799.27 Hz on recession. Vibrometer voltage amplitude is 624.524 mV at 10 Hz and 3.12262 mV at 2000 Hz.\n\n$$\n\\boxed{\\begin{aligned}f_{\\rm approach}&=978.88\\ \\mathrm{Hz}\\\\f_{\\rm recede}&=799.27\\ \\mathrm{Hz}\\\\\\hat e_{10}&=624.524\\ \\mathrm{mV}\\\\\\hat e_{2000}&=3.12262\\ \\mathrm{mV}\\end{aligned}}\n$$",
      "takeaway": "A response percentage refers to the change from the initial state, not always the absolute final value."
    },
    "2023-uas-q3": {
      "title": "First-order sensor response",
      "source": "Final exam 2023 · Question 3",
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Time and frequency response"
      ],
      "statement": "A first-order temperature sensor has $\\tau=1\\,\\mathrm s$ and sensitivity $K=0.08\\,\\Omega/{}^\\circ\\mathrm C$. Initially it is steady at 27 °C with resistance 200 Ω. Temperature steps to 100 °C at $t=1\\,\\mathrm s$. (a) Form the temperature-to-resistance differential equation. (b) Find resistance at $t=3\\,\\mathrm s$.",
      "simulation": {
        "title": "Resistive temperature sensor",
        "caption": "The sensor responds from t=1 s and approaches 205.84 Ω.",
        "params": [
          {
            "key": "tau",
            "label": "Time constant τ"
          },
          {
            "key": "targetTemperature",
            "label": "Final temperature"
          },
          {
            "key": "time",
            "label": "Time position"
          }
        ]
      },
      "steps": [
        {
          "id": "2023-uas-q3-step-1",
          "title": "3a · Use the initial equilibrium as the reference",
          "content": "The sensor starts at 27°C and 200 Ω in steady state. Steady means its output has stopped changing while temperature remains fixed.\n\nWe define deviations $\\Delta T=T-27$ and $\\Delta R=R-200$. Sensitivity 0.08 Ω/°C relates these changes; it does not say absolute resistance equals 0.08 times absolute temperature.\n\n$$\n\\Delta T=T-27,\\qquad\\Delta R=R-200,\\qquad K=0.08\\ \\Omega/{}^\\circ\\mathrm C\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "The initial state and dynamic model determine response before the sensor reaches its final value.",
            "commonPitfall": "A response percentage refers to the change from the initial state, not always the absolute final value."
          }
        },
        {
          "id": "2023-uas-q3-step-2",
          "title": "Insert the time constant into the first-order equation",
          "content": "The first-order model is $\\tau\\,d\\Delta R/dt+\\Delta R=K\\Delta T$. The derivative describes how fast resistance is changing; the time constant $\\tau=1$ s sets how quickly it approaches equilibrium.\n\nReplace deviations with absolute resistance and temperature. Since 200 Ω is constant, the derivative of R−200 equals the derivative of R.\n\nEvery term has units Ω: the time constant in seconds multiplies Ω/s, resistance change is in Ω, and sensitivity in Ω/°C multiplies temperature change in °C.\n\n$$\n\\boxed{(1\\ \\mathrm s)\\frac{dR}{dt}+R-200=0.08(T-27)}\n$$"
        },
        {
          "id": "2023-uas-q3-step-3",
          "title": "State the input before and after t=1 s",
          "content": "Before t=1 s, temperature stays at 27°C, so ΔT=0 and resistance remains 200 Ω. At t=1 s, temperature abruptly becomes 100°C.\n\nAn abrupt input change is called a step. Its size is 100−27=73°C. A first-order sensor does not complete its entire output change instantaneously.\n\n$$\n\\Delta T(t)=\\begin{cases}0,&t<1\\\\73^\\circ\\mathrm C,&t\\ge1\\end{cases}\n$$"
        },
        {
          "id": "2023-uas-q3-step-4",
          "title": "Find the final equilibrium as a response limit",
          "content": "After a sufficiently long time at 100°C, resistance rate approaches zero. Remove the derivative term from the model to find the final value.\n\nThe final resistance rise is 0.08×73=5.84 Ω. Add it to the initial 200 Ω to obtain 205.84 Ω.\n\n$$\nR_\\infty-200=0.08(100-27)=5.84\\ \\Omega\\quad\\Rightarrow\\quad R_\\infty=205.84\\ \\Omega\n$$"
        },
        {
          "id": "2023-uas-q3-step-5",
          "title": "See why the response is exponential",
          "content": "After the step, the model can be written $\\tau\\,dR/dt=R_\\infty-R$. Resistance changes fastest when it is far from the final value, then slows as that gap closes.\n\nCall the remaining change $u=R_\\infty-R$. Since $du/dt=-dR/dt$, the model becomes $du/dt=-u/\\tau$. Its solution decays exponentially with elapsed time.\n\n$$\n\\frac{du}{dt}=-\\frac u\\tau\\quad\\Rightarrow\\quad u(t)=u(1)e^{-(t-1)/\\tau}\n$$"
        },
        {
          "id": "2023-uas-q3-step-6",
          "title": "Use the initial condition to set the response size",
          "content": "At the instant temperature changes, resistance is still 200 Ω. The remaining change is 205.84−200=5.84 Ω, so u(1)=5.84 Ω.\n\nWe subtract the remaining exponential from the final value. The second form below expresses the same result as the initial value plus the completed change.\n\n$$\nR(t)=205.84-5.84e^{-(t-1)/1}=200+5.84(1-e^{-(t-1)/1}),\\qquad t\\ge1\n$$"
        },
        {
          "id": "2023-uas-q3-step-7",
          "title": "3b · Evaluate after two seconds of response",
          "content": "The reading is at t=3 s, while the step occurred at t=1 s. The response duration is therefore 3−1=2 s, or two time constants.\n\nThe value $e^{-2}=0.135335$ means 13.5335% of the change remains. The completed fraction is 0.864665; multiply it by 5.84 Ω and add 200 Ω.\n\n$$\n\\begin{aligned}R(3)&=200+5.84(1-e^{-(3-1)/1})\\\\&=200+5.84(0.864665)\\\\&=\\boxed{205.04964\\ \\Omega}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uas-q3-step-8",
          "title": "Check the initial value, final value, and remaining dynamic error",
          "content": "At t=1 s, the formula gives 200 Ω. At very long times, it gives 205.84 Ω. The reading 205.04964 Ω lies between these limits, consistent with a heating response without overshoot.\n\nThe remaining 0.79036 Ω is a temporary difference caused by incomplete response. It is measured relative to final resistance rather than zero ohms.\n\nThe 13.53% ratio uses the 5.84 Ω change as denominator. Dividing by the full 205.84 Ω resistance would answer a different percentage question.\n\n$$\nR_\\infty-R(3)=205.84-205.04964=0.79036\\ \\Omega,\\qquad\\frac{0.79036}{5.84}\\approx13.53\\%\n$$"
        }
      ],
      "finalAnswer": "The model is dR/dt + R − 200 = 0.08(T − 27), with the stated units. At t=3 s, R=205.04964 Ω.\n\n$$\n\\boxed{R(3\\,\\mathrm s)=205.04964\\ \\Omega}\n$$",
      "takeaway": "A response percentage refers to the change from the initial state, not always the absolute final value."
    },
    "ipe-dynamics-practice": {
      "title": "Practice: Time and frequency response",
      "intro": "This practice helps you choose a model and explain your reasoning. Start with multiple-choice questions, review a flawed example, then write your own answer. Use the rubric to check your logic, assumptions, and conclusion limits.",
      "questions": [
        {
          "id": "concept-2023-03",
          "prompt": "A first-order thermometer starts at equilibrium at a nonzero temperature, then receives a sudden temperature rise. The question asks when it reaches 98% of the temperature change. The correct reference for 98% is…",
          "options": [
            {
              "id": "concept-2023-03-option-1",
              "label": "The final output measured from zero, regardless of the initial value.",
              "feedback": "With nonzero initial output, 98% of the final value differs from 98% of the rise. The first quantity does not match the requested change."
            },
            {
              "id": "concept-2023-03-option-2",
              "label": "Total time since power-on, even if the temperature step happens much later.",
              "feedback": "The step response has not begun before the step occurs. Power-on time is not automatically response duration."
            },
            {
              "id": "concept-2023-03-option-3",
              "label": "The instrument's time constant; after one time constant, output always reaches 98%.",
              "feedback": "The time constant sets response speed, not the time for every percentage. One time constant does not complete 98% of the change."
            },
            {
              "id": "concept-2023-03-option-4",
              "label": "The output increase from initial to final value, with time measured from the temperature step.",
              "feedback": "Correct. The completed fraction is measured from initial output and compared with the whole change toward equilibrium."
            }
          ],
          "explanation": "Step-response percentage refers to the required change: final value minus initial value. The response clock begins at the step. Referencing zero output changes the size of the change, while time since power-on includes an earlier equilibrium period."
        },
        {
          "id": "concept-2023-08",
          "prompt": "A vibrometer produces voltage proportional to velocity. Two sinusoidal vibrations have equal acceleration amplitude but different frequencies, both within the constant-sensitivity range. Why does the higher-frequency vibration give less voltage?",
          "options": [
            {
              "id": "concept-2023-08-option-1",
              "label": "Frequency changes the voltage unit from volts to millivolts.",
              "feedback": "Volts and millivolts are alternative ways of expressing the same voltage. Unit conversion does not explain a physical change."
            },
            {
              "id": "concept-2023-08-option-2",
              "label": "Equal acceleration must produce equal velocity at all frequencies.",
              "feedback": "The relationship between acceleration and velocity also depends on sinusoidal frequency."
            },
            {
              "id": "concept-2023-08-option-3",
              "label": "For sinusoidal motion, equal acceleration at higher frequency requires smaller velocity amplitude.",
              "feedback": "Correct. At fixed acceleration and higher frequency, the sensor receives a smaller velocity amplitude."
            },
            {
              "id": "concept-2023-08-option-4",
              "label": "Instrument sensitivity must fall with increasing frequency even though it is stated to be constant.",
              "feedback": "This contradicts the stated constant-sensitivity condition within the working band."
            }
          ],
          "explanation": "Acceleration is the rate of change of velocity. In a faster oscillation, a smaller velocity amplitude can produce the same acceleration amplitude. Since the sensor reads velocity with constant sensitivity, voltage decreases too. The cause is the input motion quantity rather than a sensitivity change."
        },
        {
          "id": "concept-2023-10",
          "prompt": "A spring and mass accelerometer uses an LVDT to read relative core displacement. A technician calculates acceleration range from spring stiffness and core travel using a quasistatic model, then applies that range at every frequency. What needs correction?",
          "options": [
            {
              "id": "concept-2023-10-option-1",
              "label": "The travel limit still applies, but acceleration-to-displacement response must include mass, stiffness, damping, and input frequency.",
              "feedback": "Correct. A dynamic model connects the fixed displacement limit with the acceleration limit at each frequency."
            },
            {
              "id": "concept-2023-10-option-2",
              "label": "The LVDT directly reads absolute acceleration, so no mechanical model is needed.",
              "feedback": "The LVDT measures core position relative to the housing. The mechanical model connects that position to acceleration."
            },
            {
              "id": "concept-2023-10-option-3",
              "label": "Simply reverse voltage polarity; amplitude sensitivity never depends on frequency.",
              "feedback": "Polarity changes sign; it does not remove frequency dependence of amplitude."
            },
            {
              "id": "concept-2023-10-option-4",
              "label": "Core-travel limits should be ignored for sinusoidal vibration.",
              "feedback": "Travel is a physical core limit. Sinusoidal motion can still exceed it."
            }
          ],
          "explanation": "The LVDT reads relative displacement, while the mass, spring, and damper system converts acceleration into that displacement. The quasistatic approximation can hold at low frequency. Elsewhere, dynamic response changes displacement for the same acceleration. The core limit stays fixed, so its corresponding acceleration limit can change."
        },
        {
          "id": "concept-2024-08",
          "prompt": "A sensor heats in water and is then returned to air. Water has a larger heat-transfer coefficient than air. At transfer, the sensor has not exactly reached water temperature. Which model is appropriate?",
          "options": [
            {
              "id": "concept-2024-08-option-1",
              "label": "Cooling starts exactly at water temperature regardless of immersion duration.",
              "feedback": "The sensor only approaches water temperature during heating. Use the value actually reached at transfer."
            },
            {
              "id": "concept-2024-08-option-2",
              "label": "Cooling must use the water time constant because the sensor itself is unchanged.",
              "feedback": "The time constant also includes the heat-transfer coefficient. Changing medium changes that parameter even if sensor mass stays fixed."
            },
            {
              "id": "concept-2024-08-option-3",
              "label": "Output temperature immediately jumps to air temperature because the environment changed.",
              "feedback": "The surroundings can change abruptly, but the sensor’s heat capacity makes its temperature change gradually."
            },
            {
              "id": "concept-2024-08-option-4",
              "label": "Output temperature stays continuous, starts from its transfer-time value, and approaches air temperature with the air time constant.",
              "feedback": "Correct. The response must join continuously and use the time constant appropriate to each medium."
            }
          ],
          "explanation": "The sensor stores thermal energy, so changing its surroundings cannot instantly jump its temperature. Cooling starts from the temperature reached at the end of heating. The time constant depends on environmental heat transfer; air gives a slower response in this case."
        },
        {
          "id": "concept-2025-03",
          "prompt": "A force sensor produces a sinusoid with nearly the same amplitude as the reference, but its peaks occur later. It will be used to compare event timing with another sensor. Which conclusion is sound?",
          "options": [
            {
              "id": "concept-2025-03-option-1",
              "label": "Amplitude and phase responses need separate assessment; delay can distort timing comparisons even when amplitude is adequate.",
              "feedback": "Correct. Amplitude agreement alone does not guarantee timing agreement."
            },
            {
              "id": "concept-2025-03-option-2",
              "label": "Nearly equal amplitudes prove that phase difference is also nearly zero.",
              "feedback": "Gain magnitude at one measurement point does not directly establish phase."
            },
            {
              "id": "concept-2025-03-option-3",
              "label": "The delay can be ignored because dynamic calibration assesses only magnitude.",
              "feedback": "Dynamic calibration also assesses phase or response time, which matter for event sequence."
            },
            {
              "id": "concept-2025-03-option-4",
              "label": "Later peaks always mean the sensor polarity is reversed.",
              "feedback": "Polarity reversal produces a particular shift, but general lag can arise from ordinary dynamic response."
            }
          ],
          "explanation": "Sinusoidal response has two aspects: amplitude ratio and phase difference. A sensor may preserve amplitude reasonably well while still introducing substantial phase lag. Linking events from two sensors requires both responses at the operating frequency."
        },
        {
          "id": "concept-2025-10",
          "prompt": "A piezoelectric accelerometer has a nominal sensitivity specified only within a stated band. When a signal exceeds the upper band limit, what is the soundest approach?",
          "options": [
            {
              "id": "concept-2025-10-option-1",
              "label": "Keep using nominal sensitivity because all sensors have constant gain at every frequency.",
              "feedback": "Sensitivity depends on dynamic response; the nominal value is not unlimited in frequency."
            },
            {
              "id": "concept-2025-10-option-2",
              "label": "Check the relevant frequency response or calibration; resonance and attenuation can invalidate nominal conversion.",
              "feedback": "Correct. Using or correcting the reading requires an appropriate response characterization."
            },
            {
              "id": "concept-2025-10-option-3",
              "label": "Assume every frequency above the band necessarily gives a larger output.",
              "feedback": "A resonance peak does not mean the entire higher-frequency range remains amplified."
            },
            {
              "id": "concept-2025-10-option-4",
              "label": "Ignore mounting direction because frequency error eliminates cross-axis sensitivity.",
              "feedback": "Cross-axis sensitivity is response to another axis and can still add error."
            }
          ],
          "explanation": "The band identifies where nominal sensitivity is supported by the specification. Outside it, response can rise near resonance and attenuate farther beyond it. Frequency effects do not remove directional effects, so both still need consideration."
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-dynamics-guided",
          "title": "Check the initial state when surroundings change",
          "prompt": "A sensor leaves hot water before reaching the water temperature. Check the following cooling model.",
          "workSample": "The sensor moves into air. Use the water temperature as the sensor initial value. Use the water time constant throughout cooling.",
          "question": {
            "prompt": "Which correction addresses both problems?",
            "options": [
              {
                "id": "ipe-dynamics-guided-question-option-1",
                "label": "Use the sensor temperature at transfer and the air time constant.",
                "feedback": "Correct. Sensor temperature is continuous at transfer, but heat-transfer conditions change."
              },
              {
                "id": "ipe-dynamics-guided-question-option-2",
                "label": "Use air temperature as the sensor initial value.",
                "feedback": "Sensor temperature does not immediately equal air temperature. That assumption would remove the cooling process."
              },
              {
                "id": "ipe-dynamics-guided-question-option-3",
                "label": "Keep the initial value but ignore cooling.",
                "feedback": "The question asks for the model after transfer. We must retain the temperature change during cooling."
              }
            ],
            "explanation": "Find the sensor state at the end of the first interval. Use that value to start the second interval. Choose the time constant for each interval environment."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-dynamics-essay",
          "title": "Choose a sensor for rapid changes",
          "prompt": "Two sensors share the same static calibration. The first attenuates rapidly changing inputs. The second preserves amplitude but introduces phase delay. Assess them for amplitude measurement and event timing.",
          "sections": [
            "Model and assumptions",
            "Reasoning",
            "Conclusion and limits"
          ],
          "hints": [
            "The measurement task determines which errors you need to limit.",
            "Separate amplitude error from timing or phase error.",
            "Define the frequency range, compare both responses, and state suitability for each task."
          ],
          "rubric": [
            {
              "id": "ipe-dynamics-rubric-model",
              "label": "Model and assumptions",
              "fullCredit": "Distinguishes static sensitivity, amplitude response, and phase response.",
              "commonPartialError": "A response percentage refers to the change from the initial state, not always the absolute final value."
            },
            {
              "id": "ipe-dynamics-rubric-reasoning",
              "label": "Reasoning",
              "fullCredit": "Assesses each sensor over the same frequency range and task requirements."
            },
            {
              "id": "ipe-dynamics-rubric-conclusion",
              "label": "Conclusion and limits",
              "fullCredit": "Makes a choice conditional on amplitude and timing tolerances rather than static calibration alone."
            }
          ],
          "verifiedOutline": "Equal static calibration only matches steady-state relations. For amplitude measurement, compare output-to-reference amplitudes at the operating frequencies. For event timing, check phase or time delay at those same frequencies. The second sensor may suit amplitude measurement while failing the timing requirement. The final choice depends on tolerances and frequency range. State both limits."
        }
      ]
    }
  }
};

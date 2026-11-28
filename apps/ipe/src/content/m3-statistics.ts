import type { CourseModule, CourseTranslation } from '@tutor/core';

export const module: CourseModule = {
  "id": "ipe-statistics",
  "code": "M3",
  "title": "Galat dan ketidakpastian",
  "items": [
    {
      "id": "ipe-statistics-material",
      "kind": "material",
      "slug": "ipe-statistics-material",
      "title": "Bedakan bias dari sebaran hasil",
      "estimatedMinutes": 6,
      "examHook": {
        "prompt": "Hasil pengukuran berkumpul rapat, tetapi jauh dari acuan. Apakah mengulang pengukuran cukup untuk memperbaikinya?",
        "targetOutcome": "Anda dapat memilih tindakan untuk bias dan sebaran acak."
      },
      "body": "Nilai rata-rata dan sebaran menjawab dua pertanyaan berbeda. Rata-rata membantu Anda melihat letak kumpulan hasil. Sebaran menunjukkan seberapa jauh hasil berubah antarulang.\n\nBandingkan rata-rata dengan acuan sebelum menilai ketepatan. Kumpulan hasil yang rapat tetap dapat memiliki kesalahan tetap.\n\n[Buka pembahasan bertahap: Bias dan sebaran galat pada rantai ukur](?item=2025-uts1-q2).",
      "microUnits": [
        {
          "id": "ipe-statistics-principle",
          "title": "Pilih model dari kondisi soal",
          "intuition": "Kesalahan penguatan dapat menggeser rata-rata hasil dari acuan. Pergeseran tetap ini disebut **bias** (selisih rata-rata terhadap acuan). Gangguan acak membuat hasil menyebar. Merata-ratakan pengulangan independen dapat mengurangi sebaran rata-rata, tetapi tidak otomatis menghapus bias.",
          "formal": "Untuk model $y=Kx+a$, koefisien yang berubah ikut mengubah hasil. Pada $x$ tetap:\n\n$$\\sigma_y^2=x^2\\sigma_K^2+\\sigma_a^2+2x\\,\\operatorname{Cov}(K,a).$$\n\nSuku kovariansi boleh hilang hanya dengan alasan yang sesuai.",
          "validityBounds": "Jangan menganggap semua masukan independen tanpa memeriksa sumbernya. Bedakan simpangan baku data dari simpangan baku rata-rata. Nyatakan apakah perhitungan memakai sampel atau populasi.",
          "decisionCheck": {
            "id": "ipe-statistics-decision-question",
            "prompt": "Pengulangan independen memperkecil sebaran rata-rata, tetapi rata-rata masih jauh dari acuan. Apa langkah berikutnya?",
            "options": [
              {
                "id": "ipe-statistics-decision-question-option-1",
                "label": "Periksa penyebab bias dan hubungan kalibrasi.",
                "feedback": "Tepat. Pengulangan tidak otomatis mengoreksi kesalahan tetap."
              },
              {
                "id": "ipe-statistics-decision-question-option-2",
                "label": "Anggap bias sudah hilang karena sebaran mengecil.",
                "feedback": "Sebaran dan bias menjelaskan hal berbeda. Rata-rata masih belum sesuai acuan.",
                "misconceptionTag": "statistics-decision-choice-2"
              },
              {
                "id": "ipe-statistics-decision-question-option-3",
                "label": "Ganti nilai acuan dengan rata-rata alat tanpa pemeriksaan.",
                "feedback": "Mengganti acuan akan menyembunyikan selisih, bukan menjelaskan penyebabnya.",
                "misconceptionTag": "statistics-decision-choice-3"
              }
            ],
            "correctOptionId": "ipe-statistics-decision-question-option-1",
            "explanation": "Gunakan pengulangan untuk menilai komponen acak. Periksa titik nol, penguatan, dan kondisi uji untuk mencari bias."
          }
        }
      ],
      "checkpoints": [
        "Anda dapat memilih tindakan untuk bias dan sebaran acak.",
        "Bias memerlukan koreksi model atau kalibrasi; pengulangan terutama membantu menilai komponen acak.",
        "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
      ],
      "derivations": [
        {
          "id": "ipe-statistics-sources",
          "title": "Sumber dan cara membaca arsip",
          "content": "[Arsip soal UTS 1, UTS 2, dan UAS 2023 sampai 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Tahun mengikuti folder arsip; tanggal pada naskah dapat berbeda.\n\n[Materi utama: Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view). Setiap pembahasan menyertakan naskah sumber, halaman, dan asumsi yang relevan."
        }
      ]
    },
    {
      "id": "2025-uts1-q2",
      "kind": "problem",
      "slug": "2025-uts1-q2",
      "title": "Bias dan sebaran galat pada rantai ukur",
      "source": "UTS 1 2025 · Soal 2",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
        "file": "2025-uts1.pdf",
        "pages": [
          1,
          2
        ],
        "original": "2. [20%] Accuracy of Measurement Systems\nA pressure measurement system consists of a pressure sensor, a deflection bridge, an amplifier, and a recorder, as shown in the following figure.\n[Figure: Input → Pressure Sensor → Deflection Bridge → Amplifier → Recorder → Output.]\nThe table below gives the linear sensitivities and error bandwidths for each element in the system.\nPressure sensor: K = 10⁻³ Ω Pa⁻¹; error bandwidth ±h = ±0.08 Ω.\nDeflection bridge: K = 5 × 10⁻² mV Ω⁻¹; ±h = ±10⁻³ mV.\nAmplifier: K = 10³ mV mV⁻¹; ±h = ±0.5 mV.\nRecorder: K = 20 Pa mV⁻¹; ±h = ±5 Pa.\na. [10%] Given that the recorder is incorrectly adjusted so that its sensitivity is 15 Pa mV⁻¹, calculate the mean error Ē for an input pressure of 5 × 10³ Pa.\nb. [10%] Calculate the standard deviation σE of the error distribution function.\nUseful formulas supplied on page2:\n\\[\\overline O_i=K_i\\overline I_i,\\qquad \\sigma_{I_{i+1}}^2=\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+\\frac{h_i^2}{3}.\\]",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Masukan 5000 Pa dianggap acuan tetap tanpa ketidakpastian tambahan.",
        "Suku h²/3 pada rumus sumber diartikan sebagai galat uniform dalam ±h. Galat tambahan tiap blok dianggap independen dan bermean nol. Naskah tidak menyatakan distribusi ini dalam kalimat; asumsi mengikuti rumus yang diberikan.",
        "Untuk bagian(b), sistem tetap memakai recorder salah setel 15 Pa/mV dan lebar galat recorder ±5 Pa yang tercantum."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2025,
        "number": 2
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Galat dan ketidakpastian"
      ],
      "statement": "Rantai ukur tekanan terdiri dari sensor tekanan → jembatan defleksi → penguat → recorder. Data sensitivitas nominal dan setengah lebar galat tiap keluaran:\nSensor: $10^{-3}\\ \\Omega/\\mathrm{Pa}$, ±0.08 Ω.\nJembatan: $5\\times10^{-2}\\ \\mathrm{mV}/\\Omega$, ±0.001 mV.\nPenguat: $10^3\\ \\mathrm{mV/mV}$, ±0.5 mV.\nRecorder: $20\\ \\mathrm{Pa/mV}$, ±5 Pa.\n(a) Recorder salah disetel menjadi 15 Pa/mV. Hitung galat rata-rata untuk masukan 5000 Pa. (b) Hitung simpangan baku distribusi galat. Gunakan rumus propagasi pada naskah; jelaskan asumsi untuk suku $h_i^2/3$.",
      "simulation": {
        "id": "2025-uts1-q2-visual",
        "type": "ipe-uncertainty",
        "title": "Ketidakpastian pengukuran",
        "caption": "Setiap blok menambah galat dalam satuan keluarannya: Ω, mV, mV, lalu Pa. Recorder memakai gain aktual 15 Pa/mV; lebar galat diasumsikan uniform dan independen.",
        "params": [
          {
            "key": "input",
            "label": "Tekanan masukan",
            "min": 0,
            "max": 10000,
            "step": 100,
            "defaultValue": 5000,
            "unit": "Pa"
          },
          {
            "key": "lastGain",
            "label": "Kepekaan perekam",
            "min": 10,
            "max": 25,
            "step": 0.5,
            "defaultValue": 15,
            "unit": "Pa/mV"
          }
        ],
        "data": {
          "mode": "chain",
          "input": 5000,
          "gains": [
            0.001,
            0.05,
            1000,
            15
          ],
          "halfWidths": [
            0.08,
            0.001,
            0.5,
            5
          ],
          "visualKind": "uncertainty"
        }
      },
      "steps": [
        {
          "id": "2025-uts1-q2-step-1",
          "title": "1. Pisahkan perubahan nilai rata-rata dari sebaran",
          "content": "Kita menilai rata-rata galat dan sebarannya secara terpisah. **Bias** (galat rata-rata) menunjukkan apakah hasil cenderung terlalu tinggi atau rendah. Simbolnya $\\overline E$. **Simpangan baku** (ukuran sebaran di sekitar rata-rata) memakai simbol $\\sigma_E$. Recorder yang salah gain menggeser rata-rata; lebar galat tiap blok menyumbang sebaran.\n\nKita memperlakukan tekanan 5000 Pa sebagai masukan acuan yang tetap. Oleh karena itu, varians masukan awal nol; bukan berarti seluruh rantai bebas galat.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Bias memerlukan koreksi model atau kalibrasi; pengulangan terutama membantu menilai komponen acak.",
            "commonPitfall": "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
          },
          "checkpoint": {
            "prompt": "Sebuah sistem tekanan memberi hasil berulang yang rapat, tetapi semuanya lebih rendah dari acuan. Pemeriksaan menemukan penguatan recorder terlalu kecil. Tindakan mana yang paling tepat untuk memperbaiki masalah utama?",
            "options": [
              {
                "id": "2025-uts1-q2-checkpoint-option-1",
                "label": "Ambil lebih banyak pengulangan lalu pakai rata-ratanya tanpa mengubah recorder.",
                "feedback": "Pengulangan dapat memperkecil ketidakpastian rata-rata akibat galat acak, tetapi tidak menghapus gain yang salah.",
                "misconceptionTag": "concept-2025-01-choice-1"
              },
              {
                "id": "2025-uts1-q2-checkpoint-option-2",
                "label": "Perbesar resolusi layar agar penyimpangan rata-rata hilang.",
                "feedback": "Resolusi mengatur langkah tampilan. Ia tidak memperbaiki pemetaan masukan dan keluaran yang salah.",
                "misconceptionTag": "concept-2025-01-choice-2"
              },
              {
                "id": "2025-uts1-q2-checkpoint-option-3",
                "label": "Perbaiki penguatan recorder, lalu kalibrasi ulang hubungan masukan dan keluaran.",
                "feedback": "Tepat. Tindakan ini menargetkan penyebab bias, lalu memeriksa hubungan setelah penyetelan."
              },
              {
                "id": "2025-uts1-q2-checkpoint-option-4",
                "label": "Nyatakan sistem sudah akurat karena hasil pengulangannya rapat.",
                "feedback": "Hasil rapat menunjukkan presisi, bukan bukti bebas bias. Akurasi tetap perlu dibandingkan dengan acuan.",
                "misconceptionTag": "concept-2025-01-choice-4"
              }
            ],
            "correctOptionId": "2025-uts1-q2-checkpoint-option-3"
          }
        },
        {
          "id": "2025-uts1-q2-step-2",
          "title": "2. Periksa penguatan nominal dan satuannya",
          "content": "Penguatan sebuah rantai diperoleh dengan mengalikan sensitivitas berurutan. Satuan keluaran satu blok menjadi satuan masukan blok berikutnya. Dengan recorder nominal 20 Pa/mV, hasil kali keseluruhan adalah 1, sehingga nilai tekanan yang ditampilkan seharusnya sama dengan masukan.\n\n$$\nK_{\\mathrm{nom}}=(10^{-3})(5\\times10^{-2})(10^3)(20)=1\\ \\mathrm{Pa/Pa}\n$$"
        },
        {
          "id": "2025-uts1-q2-step-3",
          "title": "3. Propagasikan rata-rata dengan gain recorder yang nyata",
          "content": "Hitung berturut-turut agar setiap perubahan satuan terlihat. Sensor memberi 5 Ω, jembatan memberi 0.25 mV, penguat memberi 250 mV. Recorder yang salah gain kemudian mengubah 250 mV menjadi 3750 Pa.\n\n$$\n5000\\ \\mathrm{Pa}\\xrightarrow{0.001}\\ 5\\ \\Omega\\xrightarrow{0.05}\\ 0.25\\ \\mathrm{mV}\\xrightarrow{1000}\\ 250\\ \\mathrm{mV}\\xrightarrow{15}\\ 3750\\ \\mathrm{Pa}\n$$\n\n| Keluaran blok | Rata-rata |\n| --- | --- |\n| Sensor | 5 Ω |\n| Bridge | 0.25 mV |\n| Amplifier | 250 mV |\n| Recorder | 3750 Pa |"
        },
        {
          "id": "2025-uts1-q2-step-4",
          "title": "4. Tentukan bias beserta tandanya",
          "content": "Definisikan galat sebagai indikasi dikurangi nilai acuan. Hasil negatif berarti sistem membaca terlalu rendah. Rasio gain aktual terhadap nominal adalah 15/20=0.75, sehingga pembacaan 75% dari acuan sesuai dengan hasil bertahap.\n\n$$\n\\overline E=3750-5000=-1250\\ \\mathrm{Pa}\\qquad\\frac{\\overline E}{5000}\\,100\\%=-25\\%\n$$"
        },
        {
          "id": "2025-uts1-q2-step-5",
          "title": "5. Jelaskan mengapa lebar galat menjadi varians h²/3",
          "content": "Rumus naskah memakai $h_i^2/3$. Model tersebut sesuai galat tambahan berdistribusi uniform antara $-h_i$ dan $+h_i$, bermean nol. Kita juga menganggap galat antarelemen independen, sehingga varians dapat dijumlahkan tanpa suku korelasi.\n\n$h_i$ adalah setengah lebar, bukan lebar penuh. Galat yang datang dari blok sebelumnya dikalikan gain $K_i$, sehingga variansnya dikalikan $K_i^2$.\n\n$$\n\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+\\frac{h_i^2}{3},\\qquad\\sigma_{I_1}^2=0\n$$"
        },
        {
          "id": "2025-uts1-q2-step-6",
          "title": "6. Hitung varians sensor dan jembatan",
          "content": "Sensor menerima masukan acuan tanpa sebaran, jadi hanya galat tambahannya 0.08 Ω yang menyumbang varians. Pada jembatan, propagasikan varians sensor melalui gain 0.05 mV/Ω, lalu tambahkan varians galat jembatan 0.001 mV.\n\n$$\n\\sigma_1^2=\\frac{0.08^2}{3}=0.00213333\\ \\Omega^2\\\\\\sigma_2^2=0.05^2(0.00213333)+\\frac{0.001^2}{3}=5.66667\\times10^{-6}\\ \\mathrm{mV^2}\n$$"
        },
        {
          "id": "2025-uts1-q2-step-7",
          "title": "7. Teruskan varians melalui penguat dan recorder",
          "content": "Gain penguat 1000 mengalikan simpangan baku 1000 kali dan varians sejuta kali. Di tahap akhir, kita memakai gain recorder aktual 15 Pa/mV. Gain nominal 20 tidak sesuai karena kita sedang menghitung sebaran sistem yang salah setel.\n\n$$\n\\sigma_3^2=1000^2(5.66667\\times10^{-6})+\\frac{0.5^2}{3}=5.75000\\ \\mathrm{mV^2}\\\\\\sigma_E^2=15^2(5.75)+\\frac{5^2}{3}=1302.08333\\ \\mathrm{Pa^2}\n$$"
        },
        {
          "id": "2025-uts1-q2-step-8",
          "title": "8. Ambil akar dan tafsirkan sebarannya",
          "content": "Varians bersatuan Pa². Ambil akar untuk memperoleh simpangan baku dalam Pa, sehingga dapat dibandingkan dengan bias. Nilai 36.08 Pa adalah sebaran di sekitar galat rata-rata −1250 Pa, bukan pengganti bias tersebut.\n\n$$\n\\boxed{\\sigma_E=\\sqrt{1302.08333}=36.0844\\ \\mathrm{Pa}}\n$$"
        },
        {
          "id": "2025-uts1-q2-step-9",
          "title": "9. Cek hasil dari kontribusi yang dirujuk ke keluaran",
          "content": "Bawa setiap setengah lebar galat ke keluaran akhir melalui gain sesudahnya. Kontribusinya menjadi 60,15,7.5, dan 5 Pa. Jumlah kuadratnya dibagi 3 menghasilkan varians yang sama. Pemeriksaan ini memastikan tidak ada gain yang terlewat atau diterapkan dua kali.\n\nBias jauh lebih besar daripada simpangan bakunya. Pengulangan banyak pengukuran dapat menaksir mean dengan lebih baik, tetapi tidak menghapus gain recorder yang salah.\n\n$$\n\\sigma_E^2=\\frac{60^2+15^2+7.5^2+5^2}{3}=1302.08333\\ \\mathrm{Pa^2}\n$$"
        }
      ],
      "finalAnswer": "Keluaran rata-rata 3750 Pa, sehingga galat rata-rata (indikasi −acuan) adalah −1250 Pa atau −25%. Dengan galat blok uniform, independen, bermean nol, dan gain recorder aktual 15 Pa/mV, simpangan baku galatnya 36.0844 Pa.\n\n$$\n\\boxed{\\overline E=-1250\\ \\mathrm{Pa},\\qquad\\sigma_E\\approx36.08\\ \\mathrm{Pa}}\n$$",
      "takeaway": "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
    },
    {
      "id": "2024-uts1-q6",
      "kind": "problem",
      "slug": "2024-uts1-q6",
      "title": "Rata-rata dan sebaran tegangan dari koefisien sensor",
      "source": "UTS 1 2024 · Soal 6",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
        "file": "2024-uts1.pdf",
        "pages": [
          2
        ],
        "original": "6. [15%] A sensing element with characteristic \\(E=a_0+a_1T+a_2T^2\\) measures temperature at \\(T=120^\\circ\\mathrm C\\). Here E represents output voltage in μV and T is the measured temperature in °C. Statistical data is presented in Table 1 after one hundred samples tested in the laboratory. Parameter \\(a_0\\): average 1.2, standard deviation \\(0.1\\times10^{-1}\\). Parameter \\(a_1\\): average \\(1.8\\times10^{-2}\\), standard deviation \\(0.1\\times10^{-2}\\). Parameter \\(a_2\\): average \\(2.4\\times10^{-4}\\), standard deviation 0. Calculate average value and standard deviation of E. Assume that the distribution is normal or Gaussian.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "T=120°C dianggap tetap tanpa ketidakpastian masukan. Untuk hasil numerik simpangan baku utama, koefisien diasumsikan tidak berkorelasi; asumsi ini tidak mengikuti normalitas saja."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2024,
        "number": 6
      },
      "difficulty": "menengah",
      "estimatedMinutes": 16,
      "tags": [
        "Galat dan ketidakpastian"
      ],
      "statement": "Sensor mengikuti $E=a_0+a_1T+a_2T^2$, dengan E dalam μV dan T dalam °C. Pada $T=120^\\circ\\mathrm C$, cari rata-rata serta simpangan baku E. Tabel dari 100 sampel memberi rata-rata koefisien $[1{,}2;\\,1{,}8\\times10^{-2};\\,2{,}4\\times10^{-4}]$ untuk $a_0,a_1,a_2$, dan simpangan baku $[0{,}1\\times10^{-1};\\,0{,}1\\times10^{-2};\\,0]$. Soal menyatakan distribusi normal atau Gaussian.",
      "simulation": {
        "id": "2024-uts1-q6-visual",
        "type": "ipe-uncertainty",
        "title": "Ketidakpastian pengukuran",
        "caption": "Bandingkan kontribusi varians koefisien pada suhu tetap. Perhitungan menganggap kovarians antarkoefisien nol.",
        "params": [
          {
            "key": "input",
            "label": "Suhu yang diukur",
            "min": 0,
            "max": 200,
            "step": 1,
            "defaultValue": 120,
            "unit": "°C"
          }
        ],
        "data": {
          "mode": "polynomial",
          "input": 120,
          "means": [
            1.2,
            0.018,
            0.00024
          ],
          "sds": [
            0.01,
            0.001,
            0
          ],
          "visualKind": "uncertainty"
        }
      },
      "steps": [
        {
          "id": "2024-uts1-q6-step-1",
          "title": "Tentukan mana yang tetap dan mana yang bervariasi",
          "content": "Suhu 120°C kita perlakukan sebagai masukan tetap. Yang bervariasi antarsampel adalah koefisien $a_0,a_1,a_2$. Walau model memuat $T^2$, pada suhu tetap ia merupakan penjumlahan berbobot dari ketiga koefisien.\n\nBobotnya adalah 1, 120, dan 14400. Artinya, perubahan kecil pada $a_1$ dikalikan 120 ketika muncul sebagai perubahan tegangan E.\n\n$$\nE=a_0+120a_1+14400a_2\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Bias memerlukan koreksi model atau kalibrasi; pengulangan terutama membantu menilai komponen acak.",
            "commonPitfall": "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
          }
        },
        {
          "id": "2024-uts1-q6-step-2",
          "title": "Baca notasi ilmiah dan satuan koefisien",
          "content": "Tabel memberi $\\sigma_{a_0}=0{,}1\\times10^{-1}=0{,}01$ dan $\\sigma_{a_1}=0{,}1\\times10^{-2}=0{,}001$. Faktor 0,1 tetap harus ikut dikalikan; jangan membacanya sebagai $10^{-1}$ atau $10^{-2}$ saja.\n\nSemua suku harus memberi μV setelah dikalikan faktor suhunya. Jadi $a_0$ bersatuan μV, $a_1$ bersatuan μV/°C, dan $a_2$ bersatuan μV/(°C)². Simpangan baku tiap koefisien memakai satuan koefisiennya sendiri.\n\n| Koefisien | Rata-rata | Simpangan baku |\n| --- | --- | --- |\n| a₀ | 1.2 μV | 0.01 μV |\n| a₁ | 0.018 μV/°C | 0.001 μV/°C |\n| a₂ | 0.00024 μV/(°C)² | 0 μV/(°C)² |"
        },
        {
          "id": "2024-uts1-q6-step-3",
          "title": "Hitung rata-rata keluaran dari rata-rata koefisien",
          "content": "Rata-rata suatu jumlah sama dengan jumlah rata-ratanya. Nilai T tetap, sehingga bobot 120 dan 14400 juga tetap. Kita masukkan setiap rata-rata koefisien ke model.\n\nTiga kontribusinya adalah 1,2 μV dari offset, 2,16 μV dari suku linear, dan 3,456 μV dari suku kuadrat. Jumlahnya 6,816 μV.\n\n$$\n\\bar E=\\bar a_0+120\\bar a_1+14400\\bar a_2=1.2+120(0.018)+14400(0.00024)=6.816\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q6-step-4",
          "title": "Nyatakan syarat sebelum menjumlahkan varians",
          "content": "Untuk mencari sebaran E dari simpangan baku koefisien, kita perlu mengetahui hubungan variasi koefisien. Jawaban numerik biasa mengasumsikan koefisien tidak berkorelasi, misalnya saling independen.\n\nKeterangan “normal” saja tidak menjamin asumsi tersebut. Kita nyatakan asumsi ini karena tabel tidak memberi kovarians. Dengan kovarians nol, varians kontribusi dapat dijumlahkan.\n\n**Kovarians** (ukuran apakah dua koefisien berubah bersama) menentukan apakah perlu suku silang. Kovarians nol memungkinkan kita menjumlahkan varians tanpa suku silang.\n\n$$\n\\sigma_E^2=\\sigma_{a_0}^2+T^2\\sigma_{a_1}^2+T^4\\sigma_{a_2}^2\\quad(\\text{zero covariance})\n$$"
        },
        {
          "id": "2024-uts1-q6-step-5",
          "title": "Ubah setiap simpangan baku ke satuan tegangan",
          "content": "Mengalikan peubah acak dengan konstanta c mengalikan simpangan bakunya dengan $|c|$, sedangkan variansnya dengan $c^2$. Jadi simpangan tegangan dari $a_1$ adalah $120(0{,}001)=0{,}12$ μV.\n\nKontribusi dari $a_0$ adalah 0,01 μV. Suku kuadrat tetap menyumbang 3,456 μV ke rata-rata. Suku tersebut tidak menambah sebaran pada model ini karena $\\sigma_{a_2}=0$.\n\n$$\n\\sigma_{0,E}=0.01\\ \\mu\\mathrm V,\\qquad\\sigma_{1,E}=0.12\\ \\mu\\mathrm V,\\qquad\\sigma_{2,E}=0\n$$"
        },
        {
          "id": "2024-uts1-q6-step-6",
          "title": "Jumlahkan kuadrat kontribusi lalu ambil akar",
          "content": "Jumlahkan $0{,}01^2$, $0{,}12^2$, dan 0 untuk memperoleh varians 0,0145(μV)². Baru setelah itu ambil akar.\n\nHasil 0,120416 μV dekat dengan kontribusi 0,12 μV dari $a_1$, karena kontribusi tersebut mendominasi varians. Menjumlahkan 0,01 dan 0,12 langsung akan menganggap variasi bertambah bersama secara sempurna.\n\n$$\n\\sigma_E=\\sqrt{(0.01)^2+(0.12)^2+0}=\\sqrt{0.0145}=0.120416\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q6-step-7",
          "title": "Bedakan sebaran keluaran dari ketidakpastian rata-rata",
          "content": "Soal meminta simpangan baku E, yaitu sebaran keluaran yang mengikuti variasi koefisien. Angka 100 sampel menjelaskan asal statistik tabel, bukan perintah untuk membagi hasil dengan 10.\n\nPembagian dengan akar jumlah sampel dipakai untuk galat baku rata-rata dalam model sampel independen. Galat baku mengukur ketidakpastian rata-rata, bukan sebaran tiap keluaran. Di bawah asumsi koefisien normal independen, E juga normal karena merupakan kombinasi linear pada T tetap.\n\n$$\nE\\sim\\mathcal N\\!\\left(6.816,\\ 0.0145\\right)\\quad[E\\text{ in }\\mu\\mathrm V]\n$$"
        },
        {
          "id": "2024-uts1-q6-step-8",
          "title": "Jelaskan batas informasi jika koefisien berkorelasi",
          "content": "Jika $a_0$ dan $a_1$ berkorelasi, varians perlu tambahan $2T\\,\\operatorname{Cov}(a_0,a_1)$. Nilai $\\sigma_{a_2}=0$ membuat suku kovarians yang melibatkan $a_2$ nol.\n\nDengan koefisien korelasi $\\rho_{01}$, varians menjadi $0{,}0145+0{,}0024\\rho_{01}$. Rata-ratanya tetap 6,816 μV. Namun, simpangan baku 0,120416 μV mensyaratkan kovarians nol. Normalitas saja belum menentukan satu nilai unik.\n\n$$\n\\sigma_E^2=0.0145+0.0024\\rho_{01}\\quad[(\\mu\\mathrm V)^2]\n$$"
        }
      ],
      "finalAnswer": "Rata-rata keluaran 6,816 μV. Dengan koefisien tidak berkorelasi, simpangan bakunya 0,120416 μV. Jika kovarians koefisien tidak nol, tabel belum cukup untuk menentukan satu simpangan baku.\n\n$$\n\\boxed{\\bar E=6.816\\ \\mu\\mathrm V,\\qquad\\sigma_E=0.120416\\ \\mu\\mathrm V\\quad(\\operatorname{Cov}=0)}\n$$",
      "takeaway": "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
    },
    {
      "id": "2023-uts1-q3",
      "kind": "problem",
      "slug": "2023-uts1-q3",
      "title": "Sebaran keluaran akibat variasi sensitivitas dan offset",
      "source": "UTS 1 2023 · Soal 3",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
        "file": "2023-uts1.pdf",
        "pages": [
          1,
          2
        ],
        "original": "3. [10%] Statistical Characteristic of Measurement Systems\nA temperature sensor is modeled by \\(V=KT+a\\), where V is output in volts, T is measured temperature in °C, where as K and a are constants. Due to imperfection in manufacturing process, the sensors are varied with statistical properties listed below. If the manufacturing process is assumed to be a normal process, calculate the average of output voltage \\(\\bar V\\) and the standard deviation of the output voltage \\(\\sigma_V\\). Let the temperature being measured is \\(T=100^\\circ\\mathrm C\\).\n\\(\\bar K=0.02,\\ \\sigma_K=0.001,\\ \\bar a=-0.001,\\ \\sigma_a=1.5\\times10^{-4}\\).",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)"
        }
      },
      "assumptions": [
        "Suhu 100°C dianggap tepat dan tetap. Perhitungan numerik simpangan baku mengasumsikan kovarians K dan a nol; normalitas saja tidak cukup untuk membuktikan asumsi ini."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2023,
        "number": 3
      },
      "difficulty": "menengah",
      "estimatedMinutes": 16,
      "tags": [
        "Galat dan ketidakpastian"
      ],
      "statement": "Sensor suhu mengikuti $V=KT+a$. Akibat variasi produksi, $\\bar K=0.02,\\ \\sigma_K=0.001,\\ \\bar a=-0.001,\\ \\sigma_a=1.5\\times10^{-4}$. V dalam volt dan T dalam °C. Dengan proses produksi diasumsikan normal dan suhu yang diukur $T=100^\\circ\\mathrm C$, cari rata-rata tegangan $\\bar V$ serta simpangan bakunya $\\sigma_V$.",
      "simulation": {
        "id": "2023-uts1-q3-visual",
        "type": "ipe-uncertainty",
        "title": "Ketidakpastian pengukuran",
        "caption": "Bandingkan kontribusi variasi sensitivitas dan offset pada sebaran tegangan.",
        "params": [
          {
            "key": "input",
            "label": "Suhu yang diukur",
            "min": 0,
            "max": 200,
            "step": 1,
            "defaultValue": 100,
            "unit": "°C"
          }
        ],
        "data": {
          "mode": "linear",
          "input": 100,
          "meanK": 0.02,
          "sdK": 0.001,
          "meanOffset": -0.001,
          "sdOffset": 0.00015,
          "visualKind": "uncertainty"
        }
      },
      "steps": [
        {
          "id": "2023-uts1-q3-step-1",
          "title": "Tentukan besaran yang tetap dan yang bervariasi",
          "content": "Suhu masukan tetap pada 100°C. Yang berbeda dari satu sensor ke sensor lain adalah K, yaitu sensitivitas, dan a, yaitu offset. Jadi sebaran keluaran berasal dari variasi produksi kedua parameter itu.\n\nGaris di atas simbol, seperti $\\bar K$, berarti rata-rata. Simbol $\\sigma_K$, dibaca sigma K, berarti simpangan baku K. Keluaran V memakai volt, sehingga satuan K adalah V/°C dan satuan a adalah V.\n\n$$\n\\bar K=0.02\\ \\mathrm{V/{}^\\circ C},\\quad\\sigma_K=0.001\\ \\mathrm{V/{}^\\circ C},\\quad\\bar a=-0.001\\ \\mathrm V,\\quad\\sigma_a=0.00015\\ \\mathrm V\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Bias memerlukan koreksi model atau kalibrasi; pengulangan terutama membantu menilai komponen acak.",
            "commonPitfall": "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
          }
        },
        {
          "id": "2023-uts1-q3-step-2",
          "title": "Gunakan linearitas rata-rata",
          "content": "Rata-rata penjumlahan sama dengan jumlah rata-rata. Nilai T tetap, sehingga kita dapat mengeluarkannya dari operasi rata-rata.\n\nLangkah ini tidak memerlukan K dan a saling bebas. Korelasi akan berpengaruh pada varians, tetapi tidak mengubah rumus rata-rata linear ini.\n\n$$\n\\bar V=\\overline{KT+a}=T\\bar K+\\bar a\n$$"
        },
        {
          "id": "2023-uts1-q3-step-3",
          "title": "Hitung tegangan rata-rata",
          "content": "Bagian sensitivitas memberi 0.02×100=2.000 V. Offset rata-rata bernilai −0.001 V, sehingga mengurangi keluaran rata-rata menjadi 1.999 V.\n\nTanda negatif pada offset menyatakan arah pergeseran pusat data. Simpangan baku offset tetap positif karena menyatakan besar sebaran, bukan arah.\n\n$$\n\\bar V=100(0.02)+(-0.001)=\\boxed{1.999\\ \\mathrm V}\n$$"
        },
        {
          "id": "2023-uts1-q3-step-4",
          "title": "Tulis varians sebelum menggabungkan simpangan baku",
          "content": "Varians adalah kuadrat simpangan baku. Ketika sebuah variabel dikali T, simpangan bakunya dikali |T| dan variansnya dikali T².\n\nUntuk penjumlahan $TK+a$, rumus umum juga memuat kovarians. Kovarians menjelaskan apakah sensor dengan K lebih besar cenderung memiliki a yang lebih besar atau lebih kecil.\n\n$$\n\\sigma_V^2=T^2\\sigma_K^2+\\sigma_a^2+2T\\,\\operatorname{Cov}(K,a)\n$$"
        },
        {
          "id": "2023-uts1-q3-step-5",
          "title": "Nyatakan asumsi yang diperlukan oleh data soal",
          "content": "Soal tidak memberi kovarians atau korelasi K dengan a. Untuk memperoleh satu jawaban numerik, kita mengambil kovarians nol, misalnya jika kedua variasi saling bebas.\n\nDistribusi normal saja tidak menjamin kedua parameter saling bebas. Jika keduanya berkorelasi, rata-rata tetap 1.999 V tetapi simpangan baku perlu informasi tambahan.\n\n$$\n\\operatorname{Cov}(K,a)=0\\quad\\Rightarrow\\quad\\sigma_V^2=T^2\\sigma_K^2+\\sigma_a^2\n$$"
        },
        {
          "id": "2023-uts1-q3-step-6",
          "title": "Samakan kedua kontribusi ke satuan volt",
          "content": "Variasi sensitivitas menjadi variasi tegangan setelah dikali suhu tetap 100°C. Kontribusi simpangan bakunya 100×0.001=0.100 V.\n\nOffset sudah memiliki satuan volt, sehingga kontribusinya tetap 0.00015 V. Kita menggabungkan kuadrat kedua kontribusi ini, bukan langsung menjumlahkan simpangan bakunya.\n\n$$\nT\\sigma_K=0.100\\ \\mathrm V,\\qquad\\sigma_a=0.00015\\ \\mathrm V\n$$"
        },
        {
          "id": "2023-uts1-q3-step-7",
          "title": "Jumlahkan varians, lalu ambil akar",
          "content": "Kuadrat 0.100 V adalah 0.010000 V². Kuadrat 0.00015 V adalah 0.0000000225 V². Jumlahnya masih memakai V².\n\nKita ambil akar untuk kembali ke satuan volt. Hasil mendekati 0.100 V karena kontribusi variasi sensitivitas jauh lebih besar pada suhu 100°C ini.\n\n$$\n\\begin{aligned}\\sigma_V&=\\sqrt{(100\\times0.001)^2+(1.5\\times10^{-4})^2}\\\\&=\\sqrt{0.0100000225}\\\\&=\\boxed{0.1000001125\\ \\mathrm V\\approx0.100\\ \\mathrm V}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts1-q3-step-8",
          "title": "Tafsirkan rata-rata dan sebaran keluaran",
          "content": "Nilai 1.999 V adalah pusat keluaran kumpulan sensor pada suhu yang sama. Simpangan baku sekitar 0.100 V menggambarkan sebaran antar-sensor dari model produksi ini; angka itu bukan batas galat maksimum yang pasti.\n\nJika K dan a merupakan variabel normal yang saling bebas, gabungan linear V juga normal. Pernyataan bentuk distribusi ini terpisah dari langkah menghitung rata-rata dan varians."
        }
      ],
      "finalAnswer": "Rata-rata keluaran adalah 1.999 V. Dengan kovarians K dan a dianggap nol, simpangan baku keluaran 0.1000001125 V, atau sekitar 0.100 V.\n\n$$\n\\boxed{\\bar V=1.999\\ \\mathrm V,\\qquad \\sigma_V\\approx0.100\\ \\mathrm V\\quad[\\operatorname{Cov}(K,a)=0]}\n$$",
      "takeaway": "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
    },
    {
      "id": "2023-uas-q2",
      "kind": "problem",
      "slug": "2023-uas-q2",
      "title": "Rata-rata dan simpangan baku",
      "source": "UAS 2023 · Soal 2",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
        "file": "2023-uas.pdf",
        "pages": [
          1
        ],
        "original": "2. Statistical Characteristic of Measurement Systems\n[10%] Ten strain gauges are sampled and measured for quality control purposes. Calculate the average and standard deviation values of the resistance measurement results shown below. The unit is in ohm.\n120.1, 120.0, 120.2, 120.0, 119.8, 120.3, 120.0, 119.6, 120.0, 119.9.",
        "originalLanguage": "en",
        "reference": {
          "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
          "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
          "pages": []
        }
      },
      "exam": {
        "term": "UAS",
        "year": 2023,
        "number": 2
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Galat dan ketidakpastian"
      ],
      "statement": "Sepuluh strain gauge diambil sebagai sampel kendali mutu. Tahanannya dalam Ω: 120.1, 120.0, 120.2, 120.0, 119.8, 120.3, 120.0, 119.6, 120.0, 119.9. Hitung rata-rata dan simpangan baku sampelnya.",
      "simulation": {
        "id": "2023-uas-q2-visual",
        "type": "ipe-statistics",
        "title": "Sebaran data ukur",
        "caption": "Tiap titik adalah satu strain gauge; garis acuan menunjukkan rata-rata.",
        "params": [
          {
            "key": "value0",
            "label": "Pengamatan 1",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 120.1,
            "unit": "Ω"
          },
          {
            "key": "value1",
            "label": "Pengamatan 2",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 120,
            "unit": "Ω"
          },
          {
            "key": "value2",
            "label": "Pengamatan 3",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 120.2,
            "unit": "Ω"
          },
          {
            "key": "value3",
            "label": "Pengamatan 4",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 120,
            "unit": "Ω"
          },
          {
            "key": "value4",
            "label": "Pengamatan 5",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 119.8,
            "unit": "Ω"
          },
          {
            "key": "value5",
            "label": "Pengamatan 6",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 120.3,
            "unit": "Ω"
          },
          {
            "key": "value6",
            "label": "Pengamatan 7",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 120,
            "unit": "Ω"
          },
          {
            "key": "value7",
            "label": "Pengamatan 8",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 119.6,
            "unit": "Ω"
          },
          {
            "key": "value8",
            "label": "Pengamatan 9",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 120,
            "unit": "Ω"
          },
          {
            "key": "value9",
            "label": "Pengamatan 10",
            "min": 118.89999999999999,
            "max": 121,
            "step": 0.01,
            "defaultValue": 119.9,
            "unit": "Ω"
          }
        ],
        "data": {
          "values": [
            120.1,
            120,
            120.2,
            120,
            119.8,
            120.3,
            120,
            119.6,
            120,
            119.9
          ],
          "mean": 119.99,
          "standardDeviation": 0.1969207398365598,
          "visualKind": "statistics"
        }
      },
      "steps": [
        {
          "id": "2023-uas-q2-step-1",
          "title": "Tentukan fungsi rata-rata dan simpangan baku",
          "content": "Sepuluh angka adalah tahanan sepuluh strain gauge yang diambil sebagai sampel. **Rata-rata** (jumlah nilai dibagi jumlah data) menyatakan pusat data. **Simpangan baku** (ukuran sebaran terhadap rata-rata) menyatakan sebaran dalam satuan tahanan.\n\nKita memakai semua hasil pengukuran, termasuk nilai yang berulang. Empat kemunculan 120.0 Ω adalah empat unit sampel, bukan satu data yang boleh dihapus sebagai duplikat.\n\n$$\nn=10,\\qquad \\bar R=\\frac{1}{n}\\sum_{i=1}^nR_i\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Bias memerlukan koreksi model atau kalibrasi; pengulangan terutama membantu menilai komponen acak.",
            "commonPitfall": "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
          },
          "checkpoint": {
            "prompt": "Tahanan beberapa strain gauge berkumpul rapat, sehingga simpangan baku sampelnya kecil. Nilai benar tersertifikasi untuk tiap unit belum tersedia. Kesimpulan apa yang didukung data tersebut?",
            "options": [
              {
                "id": "2023-uas-q2-checkpoint-option-1",
                "label": "Rata-rata tidak lagi diperlukan karena simpangan baku sudah memberi pusat data.",
                "feedback": "Simpangan baku memberi ukuran sebaran. Rata-rata tetap diperlukan untuk menyatakan pusat data.",
                "misconceptionTag": "concept-2023-09-choice-1"
              },
              {
                "id": "2023-uas-q2-checkpoint-option-2",
                "label": "Sebaran tahanan yang teramati kecil; bias terhadap nilai benar belum dapat dipastikan.",
                "feedback": "Benar. Sebaran dapat dinilai dari sampel; bias memerlukan acuan atau informasi tambahan."
              },
              {
                "id": "2023-uas-q2-checkpoint-option-3",
                "label": "Semua hasil pasti dekat dengan nilai benar.",
                "feedback": "Kedekatan antarhasil tidak menjamin kedekatan terhadap nilai benar yang belum diketahui.",
                "misconceptionTag": "concept-2023-09-choice-3"
              },
              {
                "id": "2023-uas-q2-checkpoint-option-4",
                "label": "Alat ukur pasti tidak memiliki galat karena pengulangan konsisten.",
                "feedback": "Bias yang sama pada semua pembacaan dapat tetap menghasilkan simpangan baku kecil.",
                "misconceptionTag": "concept-2023-09-choice-4"
              }
            ],
            "correctOptionId": "2023-uas-q2-checkpoint-option-2"
          }
        },
        {
          "id": "2023-uas-q2-step-2",
          "title": "Jumlahkan tahanan lalu bagi jumlah sampel",
          "content": "Simbol $\\sum R_i$ berarti menjumlahkan semua tahanan, dari unit pertama sampai kesepuluh. Totalnya 1199.9 Ω. Kita membagi total dengan sepuluh karena jumlah unitnya sepuluh.\n\nRata-rata 119.99 Ω berada di antara nilai terkecil 119.6 Ω dan terbesar 120.3 Ω. Pemeriksaan rentang ini memastikan pusat data tidak berada di luar data yang kita jumlahkan.\n\n$$\n\\sum R_i=1199.9\\ \\Omega,\\qquad\\bar R=\\frac{1199.9}{10}=\\boxed{119.99\\ \\Omega}\n$$"
        },
        {
          "id": "2023-uas-q2-step-3",
          "title": "Hitung selisih tiap nilai dari pusat data",
          "content": "Untuk unit pertama, selisihnya $120.1-119.99=0.11$ Ω. Untuk nilai terkecil, selisihnya $119.6-119.99=-0.39$ Ω. Tanda menunjukkan apakah data berada di atas atau di bawah rata-rata.\n\nMenjumlahkan selisih bertanda tidak mengukur sebaran: nilai positif dan negatif saling menghapus. Oleh karena itu, simpangan baku memakai kuadrat selisih.\n\n$$\nd_i=R_i-\\bar R,\\qquad\\sum d_i=0\n$$"
        },
        {
          "id": "2023-uas-q2-step-4",
          "title": "Kuadratkan selisih dan jumlahkan",
          "content": "Kuadrat membuat tiap kontribusi tidak negatif dan memberi bobot lebih besar pada data yang jauh dari pusat. Satuan kini menjadi Ω² karena kita mengalikan Ω dengan Ω.\n\nTabel memperlihatkan seluruh hitungan. Jumlah kolom terakhir adalah 0.3490 Ω²; ini masih jumlah kuadrat selisih, belum varians atau simpangan baku.\n\n$$\n\\sum_{i=1}^{10}(R_i-\\bar R)^2=0.3490\\ \\Omega^2\n$$\n\n| Rᵢ (Ω) | Rᵢ − 119.99 (Ω) | Kuadrat (Ω²) |\n| --- | --- | --- |\n| 120.1 | 0.11 | 0.0121 |\n| 120.0 | 0.01 | 0.0001 |\n| 120.2 | 0.21 | 0.0441 |\n| 120.0 | 0.01 | 0.0001 |\n| 119.8 | −0.19 | 0.0361 |\n| 120.3 | 0.31 | 0.0961 |\n| 120.0 | 0.01 | 0.0001 |\n| 119.6 | −0.39 | 0.1521 |\n| 120.0 | 0.01 | 0.0001 |\n| 119.9 | −0.09 | 0.0081 |"
        },
        {
          "id": "2023-uas-q2-step-5",
          "title": "Gunakan n−1 untuk varians sampel",
          "content": "Kita memperkirakan sebaran populasi dari sampel, sementara rata-rata populasi juga belum diketahui. Rata-rata yang dipakai berasal dari sepuluh data yang sama.\n\nSetelah rata-rata ditetapkan, sepuluh selisih harus berjumlah nol; sembilan selisih menentukan selisih terakhir. Pembagi n−1 pada varians sampel menyesuaikan penggunaan rata-rata sampel itu.\n\nJadi pembaginya 9, bukan 10. Hasil varians tetap memakai Ω².\n\n$$\ns^2=\\frac{\\sum(R_i-\\bar R)^2}{n-1}=\\frac{0.3490}{9}=0.0387778\\ \\Omega^2\n$$"
        },
        {
          "id": "2023-uas-q2-step-6",
          "title": "Ambil akar untuk kembali ke satuan tahanan",
          "content": "Simpangan baku adalah akar varians. Akar mengubah satuan Ω² kembali menjadi Ω, sehingga nilainya dapat dibandingkan langsung dengan tahanan.\n\nKita gunakan nilai belum dibulatkan selama hitungan, lalu bulatkan hasil akhir. Dua besaran yang diminta adalah rata-rata 119.99 Ω dan simpangan baku sampel sekitar 0.196921 Ω.\n\n$$\ns=\\sqrt{\\frac{0.3490}{9}}=\\boxed{0.196921\\ \\Omega}\n$$"
        },
        {
          "id": "2023-uas-q2-step-7",
          "title": "Tafsirkan hasil tanpa menyamakan sebaran dengan galat",
          "content": "Simpangan baku sekitar 0.197 Ω menggambarkan sebaran tahanan antarunit sampel. Nilai itu bukan otomatis galat alat ukur, dan bukan ketidakpastian rata-rata.\n\nJika sepuluh unit merupakan seluruh populasi yang ingin dideskripsikan, pembagi 10 memberi simpangan baku populasi 0.186815 Ω. Kata sampel pada soal mendukung penggunaan 0.196921 Ω.\n\nData ini juga tidak memberi nilai tahanan benar yang tersertifikasi. Oleh karena itu, kedekatan rata-rata terhadap 120 Ω belum membuktikan tidak adanya bias pengukuran."
        }
      ],
      "finalAnswer": "Rata-rata 119.99 Ω dan simpangan baku sampel 0.196921 Ω.\n\n$$\n\\boxed{\\bar R=119.99\\ \\Omega,\\qquad s=0.196921\\ \\Omega}\n$$",
      "takeaway": "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
    },
    {
      "id": "ipe-statistics-practice",
      "kind": "practice",
      "slug": "ipe-statistics-practice",
      "title": "Latihan: Galat dan ketidakpastian",
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "intro": "Latihan ini membantu Anda memilih model dan menjelaskan alasan. Mulai dari pilihan ganda, tinjau contoh yang keliru, lalu susun jawaban sendiri. Gunakan rubrik untuk memeriksa alur, asumsi, dan batas kesimpulan Anda.",
      "questions": [
        {
          "id": "concept-2023-09",
          "prompt": "Tahanan beberapa strain gauge berkumpul rapat, sehingga simpangan baku sampelnya kecil. Nilai benar tersertifikasi untuk tiap unit belum tersedia. Kesimpulan apa yang didukung data tersebut?",
          "options": [
            {
              "id": "concept-2023-09-option-1",
              "label": "Rata-rata tidak lagi diperlukan karena simpangan baku sudah memberi pusat data.",
              "feedback": "Simpangan baku memberi ukuran sebaran. Rata-rata tetap diperlukan untuk menyatakan pusat data.",
              "misconceptionTag": "concept-2023-09-choice-1"
            },
            {
              "id": "concept-2023-09-option-2",
              "label": "Sebaran tahanan yang teramati kecil; bias terhadap nilai benar belum dapat dipastikan.",
              "feedback": "Benar. Sebaran dapat dinilai dari sampel; bias memerlukan acuan atau informasi tambahan."
            },
            {
              "id": "concept-2023-09-option-3",
              "label": "Semua hasil pasti dekat dengan nilai benar.",
              "feedback": "Kedekatan antarhasil tidak menjamin kedekatan terhadap nilai benar yang belum diketahui.",
              "misconceptionTag": "concept-2023-09-choice-3"
            },
            {
              "id": "concept-2023-09-option-4",
              "label": "Alat ukur pasti tidak memiliki galat karena pengulangan konsisten.",
              "feedback": "Bias yang sama pada semua pembacaan dapat tetap menghasilkan simpangan baku kecil.",
              "misconceptionTag": "concept-2023-09-choice-4"
            }
          ],
          "correctOptionId": "concept-2023-09-option-2",
          "explanation": "Simpangan baku menggambarkan sebaran terhadap rata-rata, bukan jarak dari nilai benar. Sekumpulan hasil dapat berdekatan tetapi semuanya bergeser akibat bias. Data antarunit juga mencampur variasi produk dan pengukuran, sehingga tidak otomatis menjadi ukuran galat alat saja.",
          "relatedProblemId": "2023-uas-q2"
        },
        {
          "id": "concept-2024-09",
          "prompt": "Salah setel penguatan membuat rata-rata alat selalu lebih rendah daripada tekanan benar. Pengukuran berulang juga menunjukkan sebaran acak. Apa yang dapat dicapai dengan merata-ratakan banyak pengukuran independen pada setelan yang sama?",
          "options": [
            {
              "id": "concept-2024-09-option-1",
              "label": "Menghilangkan bias dan sebaran sekaligus karena galat positif dan negatif selalu saling menghapus.",
              "feedback": "Pembatalan acak tidak menghapus pergeseran sistematis yang sama pada semua pengukuran.",
              "misconceptionTag": "concept-2024-09-choice-1"
            },
            {
              "id": "concept-2024-09-option-2",
              "label": "Memperbaiki sensitivitas alat secara otomatis tanpa kalibrasi atau koreksi.",
              "feedback": "Rata-rata adalah pengolahan data, bukan perubahan penguatan rangkaian. Sensitivitas salah tetap memerlukan koreksi.",
              "misconceptionTag": "concept-2024-09-choice-2"
            },
            {
              "id": "concept-2024-09-option-3",
              "label": "Mengubah simpangan baku menjadi sama dengan nilai mutlak bias.",
              "feedback": "Bias mengukur pergeseran pusat, sedangkan simpangan baku mengukur sebaran. Tidak ada aturan yang menyamakan keduanya.",
              "misconceptionTag": "concept-2024-09-choice-3"
            },
            {
              "id": "concept-2024-09-option-4",
              "label": "Mengurangi sebaran rata-rata sampel, tetapi tidak menghilangkan bias akibat penguatan.",
              "feedback": "Benar. Ketidakpastian acak rata-rata dapat turun, sedangkan pusat distribusinya tetap bergeser."
            }
          ],
          "correctOptionId": "concept-2024-09-option-4",
          "explanation": "Galat acak yang independen dapat membuat rata-rata semakin stabil saat jumlah data bertambah. Namun, semua data masih berpusat pada nilai yang salah akibat setelan penguatan. Kita perlu memperbaiki setelan atau menerapkan koreksi untuk mengatasi bias tersebut.",
          "relatedProblemId": "2024-uas-q5"
        },
        {
          "id": "concept-2025-01",
          "prompt": "Sebuah sistem tekanan memberi hasil berulang yang rapat, tetapi semuanya lebih rendah dari acuan. Pemeriksaan menemukan penguatan recorder terlalu kecil. Tindakan mana yang paling tepat untuk memperbaiki masalah utama?",
          "options": [
            {
              "id": "concept-2025-01-option-1",
              "label": "Ambil lebih banyak pengulangan lalu pakai rata-ratanya tanpa mengubah recorder.",
              "feedback": "Pengulangan dapat memperkecil ketidakpastian rata-rata akibat galat acak, tetapi tidak menghapus gain yang salah.",
              "misconceptionTag": "concept-2025-01-choice-1"
            },
            {
              "id": "concept-2025-01-option-2",
              "label": "Perbesar resolusi layar agar penyimpangan rata-rata hilang.",
              "feedback": "Resolusi mengatur langkah tampilan. Ia tidak memperbaiki pemetaan masukan dan keluaran yang salah.",
              "misconceptionTag": "concept-2025-01-choice-2"
            },
            {
              "id": "concept-2025-01-option-3",
              "label": "Perbaiki penguatan recorder, lalu kalibrasi ulang hubungan masukan dan keluaran.",
              "feedback": "Tepat. Tindakan ini menargetkan penyebab bias, lalu memeriksa hubungan setelah penyetelan."
            },
            {
              "id": "concept-2025-01-option-4",
              "label": "Nyatakan sistem sudah akurat karena hasil pengulangannya rapat.",
              "feedback": "Hasil rapat menunjukkan presisi, bukan bukti bebas bias. Akurasi tetap perlu dibandingkan dengan acuan.",
              "misconceptionTag": "concept-2025-01-choice-4"
            }
          ],
          "correctOptionId": "concept-2025-01-option-3",
          "explanation": "Hasil yang rapat menunjukkan sebaran acak kecil, tetapi tidak menjamin rata-ratanya benar. Penguatan recorder yang salah memberi galat sistematis yang tetap pada hubungan masukan dan keluaran. Perbaiki penyebabnya dan kalibrasi lagi; pengulangan tambahan hanya membantu menaksir rata-rata yang masih bias.",
          "relatedProblemId": "2025-uts1-q2"
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-statistics-guided",
          "mode": "spot-the-error",
          "title": "Tinjau klaim hasil yang presisi",
          "prompt": "Sebuah alat memberi hasil yang rapat. Nilai acuan belum tersedia. Periksa kesimpulan berikut.",
          "workSample": "Simpangan baku hasil kecil. Oleh karena itu, semua hasil pasti dekat dengan nilai benar.",
          "question": {
            "id": "ipe-statistics-guided-question",
            "prompt": "Apa yang belum didukung data?",
            "options": [
              {
                "id": "ipe-statistics-guided-question-option-1",
                "label": "Kedekatan hasil dengan nilai benar.",
                "feedback": "Tepat. Kita perlu acuan untuk menilai kedekatan rata-rata dengan nilai benar."
              },
              {
                "id": "ipe-statistics-guided-question-option-2",
                "label": "Kecilnya sebaran hasil pada pengujian tersebut.",
                "feedback": "Sebaran kecil memang sesuai dengan simpangan baku kecil. Kesalahan terletak pada kesimpulan tentang nilai benar.",
                "misconceptionTag": "statistics-guided-choice-2"
              },
              {
                "id": "ipe-statistics-guided-question-option-3",
                "label": "Perlunya mencatat kondisi pengukuran.",
                "feedback": "Kondisi ukur tetap perlu dicatat. Langkah itu tidak menyebabkan kesalahan pada kesimpulan.",
                "misconceptionTag": "statistics-guided-choice-3"
              }
            ],
            "correctOptionId": "ipe-statistics-guided-question-option-1",
            "explanation": "Data mendukung konsistensi pengulangan pada kondisi uji. Data belum menunjukkan bias karena nilai acuan belum tersedia."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-statistics-essay",
          "title": "Susun pemeriksaan galat alat",
          "prompt": "Sensor tekanan memberi hasil yang rapat dan selalu lebih rendah dari acuan. Jelaskan cara menentukan penyebab, tindakan perbaikan, dan bukti bahwa perbaikan berhasil. Utamakan alasan, bukan hitungan.",
          "sections": [
            "Model dan asumsi",
            "Alur penalaran",
            "Kesimpulan dan batas"
          ],
          "hints": [
            "Pisahkan letak rata-rata dari sebarannya.",
            "Periksa kalibrasi titik nol dan penguatan pada lebih dari satu masukan.",
            "Bandingkan dengan acuan, koreksi penyebab bias, lalu ulangi uji pada beberapa masukan."
          ],
          "rubric": [
            {
              "id": "ipe-statistics-rubric-model",
              "label": "Model dan asumsi",
              "weight": 35,
              "fullCredit": "Mengidentifikasi bias dan sebaran acak sebagai dua komponen berbeda.",
              "commonPartialError": "Sebaran kecil tidak membuktikan hasil sudah dekat dengan nilai acuan."
            },
            {
              "id": "ipe-statistics-rubric-reasoning",
              "label": "Alur penalaran",
              "weight": 40,
              "fullCredit": "Membandingkan beberapa titik acuan untuk membedakan kesalahan titik nol dan penguatan."
            },
            {
              "id": "ipe-statistics-rubric-conclusion",
              "label": "Kesimpulan dan batas",
              "weight": 25,
              "fullCredit": "Memeriksa ulang rata-rata dan sebaran setelah koreksi serta menyebut ketidakpastian acuan."
            }
          ],
          "verifiedOutline": "Hasil yang rapat menunjukkan sebaran kecil. Rata-rata yang lebih rendah dari acuan menunjukkan bias. Uji beberapa tekanan acuan untuk membedakan kesalahan titik nol dan penguatan. Perbaiki hubungan kalibrasi atau setelan yang salah. Ulangi pengukuran setelah koreksi dan periksa rata-rata serta sebarannya. Sertakan ketidakpastian acuan saat menilai kedekatan hasil."
        }
      ]
    }
  ]
};

export const english: NonNullable<CourseTranslation['modules']>[string] = {
  "title": "Error and uncertainty",
  "items": {
    "ipe-statistics-material": {
      "title": "Distinguish bias from measurement spread",
      "examHook": {
        "prompt": "Measurements cluster tightly but remain far from the reference. Will repeating the measurement be enough to fix the problem?",
        "targetOutcome": "You can choose appropriate actions for bias and random spread."
      },
      "body": "The mean and spread answer different questions. The mean helps you locate a group of readings. The spread describes how readings vary between repeats.\n\nCompare the mean with a reference before judging accuracy. A tight cluster can still have a consistent error.\n\n[Open the worked solution: Bias and error spread in a measurement chain](?item=2025-uts1-q2).",
      "microUnits": [
        {
          "id": "ipe-statistics-principle",
          "title": "Choose a model from the stated conditions",
          "intuition": "An incorrect gain can shift the mean away from a reference. This consistent difference is **bias**, the mean error relative to the reference. Random disturbances spread the readings. Averaging independent repeats can reduce the spread of the mean, but it does not automatically remove bias.",
          "formal": "For $y=Kx+a$, changing coefficients also change the result. With fixed $x$:\n\n$$\\sigma_y^2=x^2\\sigma_K^2+\\sigma_a^2+2x\\,\\operatorname{Cov}(K,a).$$\n\nDrop the covariance term only when the assumptions justify it.",
          "validityBounds": "Do not assume every input is independent without checking its source. Distinguish the spread of readings from the spread of their mean. State whether the calculation concerns a sample or population.",
          "decisionCheck": {
            "prompt": "Independent repeats narrow the spread of the mean, but the mean remains far from the reference. What should you do next?",
            "options": [
              {
                "id": "ipe-statistics-decision-question-option-1",
                "label": "Check the cause of bias and the calibration relation.",
                "feedback": "Correct. Repeats do not automatically correct a consistent error."
              },
              {
                "id": "ipe-statistics-decision-question-option-2",
                "label": "Treat bias as removed because the spread shrank.",
                "feedback": "Spread and bias describe different properties. The mean still disagrees with the reference."
              },
              {
                "id": "ipe-statistics-decision-question-option-3",
                "label": "Replace the reference with the instrument mean without checking it.",
                "feedback": "Replacing the reference hides the difference rather than explaining its cause."
              }
            ],
            "explanation": "Use repeats to assess random variation. Check zero, gain, and test conditions to investigate bias."
          }
        }
      ],
      "checkpoints": [
        "You can choose appropriate actions for bias and random spread.",
        "Bias requires model or calibration correction; repeats mainly help assess random variation.",
        "A small spread does not prove that results are close to the reference."
      ],
      "derivations": [
        {
          "id": "ipe-statistics-sources",
          "title": "Sources and archive conventions",
          "content": "[Midterm 1, Midterm 2, and final exam archive, 2023 to 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Years follow archive folders; printed paper dates may differ.\n\n[Main reference: Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view). Each worked solution includes its original statement, source pages, and relevant assumptions."
        }
      ]
    },
    "2025-uts1-q2": {
      "title": "Bias and error spread in a measurement chain",
      "source": "Midterm 1 2025 · Question 2",
      "assumptions": [
        "The 5000 Pa input is treated as a fixed reference without additional uncertainty.",
        "The source h²/3 term is interpreted as uniform error within ±h. Additive block errors are independent and zero-mean. The prose does not specify the distribution; this assumption follows the supplied formula.",
        "For part(b), the system still uses the misadjusted 15 Pa/mV recorder and its listed ±5 Pa error half-width."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Error and uncertainty"
      ],
      "statement": "The pressure chain is sensor → deflection bridge → amplifier → recorder. Nominal sensitivities and output error half-widths:\nSensor: $10^{-3}\\ \\Omega/\\mathrm{Pa}$, ±0.08 Ω.\nBridge: $5\\times10^{-2}\\ \\mathrm{mV}/\\Omega$, ±0.001 mV.\nAmplifier: $10^3\\ \\mathrm{mV/mV}$, ±0.5 mV.\nRecorder: $20\\ \\mathrm{Pa/mV}$, ±5 Pa.\n(a) The recorder is misadjusted to 15 Pa/mV. Find the mean error for a 5000 Pa input. (b) Find the error distribution’s standard deviation. Use the supplied propagation formula and explain the assumption behind $h_i^2/3$.",
      "simulation": {
        "title": "Measurement uncertainty",
        "caption": "Each block adds error in its output unit: Ω, mV, mV, then Pa. The recorder uses its actual 15 Pa/mV gain; error half-widths assume independent uniform distributions.",
        "params": [
          {
            "key": "input",
            "label": "Input pressure"
          },
          {
            "key": "lastGain",
            "label": "Recorder sensitivity"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uts1-q2-step-1",
          "title": "1. Separate the mean change from the spread",
          "content": "We assess mean error separately from its spread. **Bias**, the mean error $\\overline E$, shows whether readings tend high or low. **Standard deviation** $\\sigma_E$ measures spread around that mean. A misadjusted recorder shifts the mean, while each block’s error bandwidth contributes spread.\n\nTreat the 5000 Pa pressure as a fixed reference input. Its initial variance is therefore zero; that does not make the rest of the chain error-free.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Bias requires model or calibration correction; repeats mainly help assess random variation.",
            "commonPitfall": "A small spread does not prove that results are close to the reference."
          },
          "checkpoint": {
            "prompt": "A pressure system gives tightly clustered repeat readings, all below the reference. Inspection finds that the recorder gain is too low. Which action best addresses the main problem?",
            "options": [
              {
                "id": "2025-uts1-q2-checkpoint-option-1",
                "label": "Take more repeats and use their mean without changing the recorder.",
                "feedback": "Repeats can reduce random uncertainty in the mean, but cannot remove an incorrect gain."
              },
              {
                "id": "2025-uts1-q2-checkpoint-option-2",
                "label": "Increase display resolution so the mean deviation disappears.",
                "feedback": "Resolution controls the display step. It does not correct a faulty input and output mapping."
              },
              {
                "id": "2025-uts1-q2-checkpoint-option-3",
                "label": "Correct the recorder gain, then recalibrate the input and output relation.",
                "feedback": "Correct. This targets the bias source and checks the relation after adjustment."
              },
              {
                "id": "2025-uts1-q2-checkpoint-option-4",
                "label": "Declare the system accurate because its repeat readings are tightly clustered.",
                "feedback": "Tight clustering indicates precision, not freedom from bias. Accuracy still requires comparison with a reference."
              }
            ]
          }
        },
        {
          "id": "2025-uts1-q2-step-2",
          "title": "2. Check the nominal gain and its units",
          "content": "Multiply successive sensitivities to obtain chain gain. Each block’s output unit becomes the next block’s input unit. With the nominal 20 Pa/mV recorder, overall gain is 1, so the displayed pressure should equal the input.\n\n$$\nK_{\\mathrm{nom}}=(10^{-3})(5\\times10^{-2})(10^3)(20)=1\\ \\mathrm{Pa/Pa}\n$$"
        },
        {
          "id": "2025-uts1-q2-step-3",
          "title": "3. Propagate the mean with the actual recorder gain",
          "content": "Calculate stage by stage to keep each unit change visible. The sensor gives 5 Ω, the bridge 0.25 mV, and the amplifier 250 mV. The misadjusted recorder then converts 250 mV into 3750 Pa.\n\n$$\n5000\\ \\mathrm{Pa}\\xrightarrow{0.001}\\ 5\\ \\Omega\\xrightarrow{0.05}\\ 0.25\\ \\mathrm{mV}\\xrightarrow{1000}\\ 250\\ \\mathrm{mV}\\xrightarrow{15}\\ 3750\\ \\mathrm{Pa}\n$$\n\n| Block output | Mean |\n| --- | --- |\n| Sensor | 5 Ω |\n| Bridge | 0.25 mV |\n| Amplifier | 250 mV |\n| Recorder | 3750 Pa |"
        },
        {
          "id": "2025-uts1-q2-step-4",
          "title": "4. Determine the bias and its sign",
          "content": "Define error as indicated value minus reference. A negative result means under-reading. Actual-to-nominal recorder gain is 15/20=0.75, so a 75%-of-reference reading agrees with the stage calculation.\n\n$$\n\\overline E=3750-5000=-1250\\ \\mathrm{Pa}\\qquad\\frac{\\overline E}{5000}\\,100\\%=-25\\%\n$$"
        },
        {
          "id": "2025-uts1-q2-step-5",
          "title": "5. Explain why the error half-width gives variance h²/3",
          "content": "The supplied formula uses $h_i^2/3$. The term corresponds to additive zero-mean uniform error from $-h_i$ to $+h_i$. We also assume errors in different elements are independent, so their variances add without covariance terms.\n\n$h_i$ is the half-width, not the full width. The preceding block’s error is multiplied by gain $K_i$, so its variance is multiplied by $K_i^2$.\n\n$$\n\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+\\frac{h_i^2}{3},\\qquad\\sigma_{I_1}^2=0\n$$"
        },
        {
          "id": "2025-uts1-q2-step-6",
          "title": "6. Calculate sensor and bridge variances",
          "content": "The sensor receives a fixed reference, so only its 0.08 Ω additive error contributes variance. At the bridge, propagate sensor variance through the 0.05 mV/Ω gain, then add the bridge’s own 0.001 mV error variance.\n\n$$\n\\sigma_1^2=\\frac{0.08^2}{3}=0.00213333\\ \\Omega^2\\\\\\sigma_2^2=0.05^2(0.00213333)+\\frac{0.001^2}{3}=5.66667\\times10^{-6}\\ \\mathrm{mV^2}\n$$"
        },
        {
          "id": "2025-uts1-q2-step-7",
          "title": "7. Continue variance through amplifier and recorder",
          "content": "The amplifier’s 1000 gain multiplies standard deviation by 1000 and variance by one million. At the final stage, use the actual 15 Pa/mV recorder, not nominal 20, because the requested distribution belongs to the misadjusted system.\n\n$$\n\\sigma_3^2=1000^2(5.66667\\times10^{-6})+\\frac{0.5^2}{3}=5.75000\\ \\mathrm{mV^2}\\\\\\sigma_E^2=15^2(5.75)+\\frac{5^2}{3}=1302.08333\\ \\mathrm{Pa^2}\n$$"
        },
        {
          "id": "2025-uts1-q2-step-8",
          "title": "8. Take the square root and interpret the spread",
          "content": "Variance has units Pa². Taking its square root gives standard deviation in Pa, allowing comparison with bias. The 36.08 Pa is spread around a mean error of −1250 Pa, not a replacement for that bias.\n\n$$\n\\boxed{\\sigma_E=\\sqrt{1302.08333}=36.0844\\ \\mathrm{Pa}}\n$$"
        },
        {
          "id": "2025-uts1-q2-step-9",
          "title": "9. Check using output-referred contributions",
          "content": "Refer each error half-width to the final output using the gains after its point of entry. Contributions become 60,15,7.5, and 5 Pa. Their squared sum divided by 3 gives the same variance, checking that no gain was omitted or applied twice.\n\nThe bias is much larger than the standard deviation. Many repeats can estimate the mean more precisely, but cannot remove the incorrect recorder gain.\n\n$$\n\\sigma_E^2=\\frac{60^2+15^2+7.5^2+5^2}{3}=1302.08333\\ \\mathrm{Pa^2}\n$$"
        }
      ],
      "finalAnswer": "Mean output is 3750 Pa, giving a mean error (indication −reference) of −1250 Pa or −25%. With independent zero-mean uniform block errors and the actual 15 Pa/mV recorder gain, error standard deviation is 36.0844 Pa.\n\n$$\n\\boxed{\\overline E=-1250\\ \\mathrm{Pa},\\qquad\\sigma_E\\approx36.08\\ \\mathrm{Pa}}\n$$",
      "takeaway": "A small spread does not prove that results are close to the reference."
    },
    "2024-uts1-q6": {
      "title": "Mean and voltage spread from sensor coefficients",
      "source": "Midterm 1 2024 · Question 6",
      "assumptions": [
        "T=120°C is fixed without input uncertainty. The main standard-deviation result assumes uncorrelated coefficients; normality alone does not imply that assumption."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Error and uncertainty"
      ],
      "statement": "A sensor follows $E=a_0+a_1T+a_2T^2$, with E in μV and T in °C. At $T=120^\\circ\\mathrm C$, find the mean and standard deviation of E. A table from 100 samples gives coefficient means $[1.2,\\,1.8\\times10^{-2},\\,2.4\\times10^{-4}]$ for $a_0,a_1,a_2$, and standard deviations $[0.1\\times10^{-1},\\,0.1\\times10^{-2},\\,0]$. The question specifies a normal or Gaussian distribution.",
      "simulation": {
        "title": "Measurement uncertainty",
        "caption": "Compare coefficient variance contributions at fixed temperature. The calculation assumes zero covariance between coefficients.",
        "params": [
          {
            "key": "input",
            "label": "Measured temperature"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uts1-q6-step-1",
          "title": "Identify fixed and varying quantities",
          "content": "We hold the 120°C input fixed to isolate the effect of varying sensor coefficients. The coefficients $a_0,a_1,a_2$ vary between samples. Although the model contains $T^2$, at fixed temperature it is a weighted sum of the coefficients.\n\nThe weights are 1, 120, and 14400. A small variation in $a_1$ is therefore multiplied by 120 when it appears as voltage variation.\n\n$$\nE=a_0+120a_1+14400a_2\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Bias requires model or calibration correction; repeats mainly help assess random variation.",
            "commonPitfall": "A small spread does not prove that results are close to the reference."
          }
        },
        {
          "id": "2024-uts1-q6-step-2",
          "title": "Read the scientific notation and coefficient units",
          "content": "The table gives $\\sigma_{a_0}=0.1\\times10^{-1}=0.01$ and $\\sigma_{a_1}=0.1\\times10^{-2}=0.001$. Keep the 0.1 multiplier; these are not $10^{-1}$ or $10^{-2}$.\n\nTo make every term a voltage, $a_0$ uses μV, $a_1$ uses μV/°C, and $a_2$ uses μV/(°C)². Each coefficient’s standard deviation has that coefficient’s unit.\n\n| Coefficient | Mean | Standard deviation |\n| --- | --- | --- |\n| a₀ | 1.2 μV | 0.01 μV |\n| a₁ | 0.018 μV/°C | 0.001 μV/°C |\n| a₂ | 0.00024 μV/(°C)² | 0 μV/(°C)² |"
        },
        {
          "id": "2024-uts1-q6-step-3",
          "title": "Calculate output mean from coefficient means",
          "content": "The mean of a sum equals the sum of the means. With fixed T, the weights 120 and 14400 are fixed too. Insert each coefficient mean into the model.\n\nThe three contributions are 1.2 μV from the offset, 2.16 μV from the linear term, and 3.456 μV from the quadratic term. They sum to 6.816 μV.\n\n$$\n\\bar E=\\bar a_0+120\\bar a_1+14400\\bar a_2=1.2+120(0.018)+14400(0.00024)=6.816\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q6-step-4",
          "title": "State the condition for adding variances",
          "content": "To find E’s spread from coefficient standard deviations, we need the relation between their variations. The usual numerical answer assumes uncorrelated coefficients, for example independent ones.\n\nThe word “normal” alone does not guarantee this. State the assumption because the table gives no covariances. With zero covariance, contribution variances can be added.\n\n**Covariance** measures whether two coefficients vary together. Zero covariance lets us add their variance contributions without a cross term.\n\n$$\n\\sigma_E^2=\\sigma_{a_0}^2+T^2\\sigma_{a_1}^2+T^4\\sigma_{a_2}^2\\quad(\\text{zero covariance})\n$$"
        },
        {
          "id": "2024-uts1-q6-step-5",
          "title": "Convert each standard deviation into voltage units",
          "content": "Multiplying a random variable by c multiplies its standard deviation by $|c|$ and its variance by $c^2$. The voltage standard deviation from $a_1$ is therefore $120(0.001)=0.12$ μV.\n\nThe $a_0$ contribution is 0.01 μV. Since $\\sigma_{a_2}=0$, the quadratic term still contributes 3.456 μV to the mean but adds no spread in this model.\n\n$$\n\\sigma_{0,E}=0.01\\ \\mu\\mathrm V,\\qquad\\sigma_{1,E}=0.12\\ \\mu\\mathrm V,\\qquad\\sigma_{2,E}=0\n$$"
        },
        {
          "id": "2024-uts1-q6-step-6",
          "title": "Add squared contributions, then take the square root",
          "content": "Add $0.01^2$, $0.12^2$, and 0 to obtain variance 0.0145(μV)². Then take the square root.\n\nThe 0.120416 μV result is close to the 0.12 μV contribution from $a_1$, which dominates variance. Adding 0.01 and 0.12 directly would instead assume perfectly aligned variations.\n\n$$\n\\sigma_E=\\sqrt{(0.01)^2+(0.12)^2+0}=\\sqrt{0.0145}=0.120416\\ \\mu\\mathrm V\n$$"
        },
        {
          "id": "2024-uts1-q6-step-7",
          "title": "Distinguish output spread from uncertainty of a mean",
          "content": "The question asks for E’s standard deviation: output spread arising from coefficient variation. The 100 samples explain where the table statistics came from, not an instruction to divide this result by 10.\n\nDividing by the square root of sample size gives the standard error of a mean under independent sampling. The standard error describes uncertainty in the mean, rather than the spread of individual outputs. With independent normal coefficients, E is also normal because it is a linear combination at fixed T.\n\n$$\nE\\sim\\mathcal N\\!\\left(6.816,\\ 0.0145\\right)\\quad[E\\text{ in }\\mu\\mathrm V]\n$$"
        },
        {
          "id": "2024-uts1-q6-step-8",
          "title": "Explain the information limit if coefficients correlate",
          "content": "If $a_0,a_1$ correlate, variance needs the term $2T\\,\\operatorname{Cov}(a_0,a_1)$. The zero $\\sigma_{a_2}$ makes covariance terms involving $a_2$ vanish.\n\nWith correlation coefficient $\\rho_{01}$, variance becomes $0.0145+0.0024\\rho_{01}$. The mean remains 6.816 μV, but the 0.120416 μV standard deviation requires zero covariance; normality alone does not determine a unique value.\n\n$$\n\\sigma_E^2=0.0145+0.0024\\rho_{01}\\quad[(\\mu\\mathrm V)^2]\n$$"
        }
      ],
      "finalAnswer": "Mean output is 6.816 μV. With uncorrelated coefficients, standard deviation is 0.120416 μV. Nonzero coefficient covariance requires more information for a unique standard deviation.\n\n$$\n\\boxed{\\bar E=6.816\\ \\mu\\mathrm V,\\qquad\\sigma_E=0.120416\\ \\mu\\mathrm V\\quad(\\operatorname{Cov}=0)}\n$$",
      "takeaway": "A small spread does not prove that results are close to the reference."
    },
    "2023-uts1-q3": {
      "title": "Output spread from sensitivity and offset variation",
      "source": "Midterm 1 2023 · Question 3",
      "assumptions": [
        "The 100°C input is treated as exact and fixed. Numerical standard deviation assumes zero covariance between K and a; normality alone does not establish that assumption."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Error and uncertainty"
      ],
      "statement": "A temperature sensor follows $V=KT+a$. Manufacturing variation gives $\\bar K=0.02,\\ \\sigma_K=0.001,\\ \\bar a=-0.001,\\ \\sigma_a=1.5\\times10^{-4}$. V is in volts and T in °C. Assuming a normal manufacturing process and measured temperature $T=100^\\circ\\mathrm C$, find mean output voltage $\\bar V$ and standard deviation $\\sigma_V$.",
      "simulation": {
        "title": "Measurement uncertainty",
        "caption": "Compare sensitivity and offset variation contributions to output-voltage spread.",
        "params": [
          {
            "key": "input",
            "label": "Measured temperature"
          }
        ]
      },
      "steps": [
        {
          "id": "2023-uts1-q3-step-1",
          "title": "Identify fixed and varying quantities",
          "content": "Input temperature is fixed at 100°C. Sensitivity K and offset a vary between manufactured sensors. Output spread therefore arises from manufacturing variation in those two parameters.\n\nA bar over a symbol, such as $\\bar K$, denotes a mean. The symbol $\\sigma_K$, read sigma K, denotes K's standard deviation. Since V is in volts, K has units V/°C and a has units V.\n\n$$\n\\bar K=0.02\\ \\mathrm{V/{}^\\circ C},\\quad\\sigma_K=0.001\\ \\mathrm{V/{}^\\circ C},\\quad\\bar a=-0.001\\ \\mathrm V,\\quad\\sigma_a=0.00015\\ \\mathrm V\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Bias requires model or calibration correction; repeats mainly help assess random variation.",
            "commonPitfall": "A small spread does not prove that results are close to the reference."
          }
        },
        {
          "id": "2023-uts1-q3-step-2",
          "title": "Use linearity of the mean",
          "content": "The mean of a sum equals the sum of the means. Since T is fixed, it can be taken outside the averaging operation.\n\nThis step does not require K and a to be independent. Correlation affects variance but does not alter this linear mean relation.\n\n$$\n\\bar V=\\overline{KT+a}=T\\bar K+\\bar a\n$$"
        },
        {
          "id": "2023-uts1-q3-step-3",
          "title": "Calculate the mean voltage",
          "content": "The sensitivity term contributes 0.02×100=2.000 V. Mean offset is −0.001 V, lowering mean output to 1.999 V.\n\nThe negative offset indicates the direction of the mean shift. Offset standard deviation remains positive because it describes spread rather than direction.\n\n$$\n\\bar V=100(0.02)+(-0.001)=\\boxed{1.999\\ \\mathrm V}\n$$"
        },
        {
          "id": "2023-uts1-q3-step-4",
          "title": "Write variance before combining standard deviations",
          "content": "Variance is standard deviation squared. Multiplying a variable by T multiplies its standard deviation by |T| and its variance by T².\n\nFor the sum $TK+a$, the general formula also includes covariance. Covariance describes whether sensors with larger K tend to have larger or smaller a.\n\n$$\n\\sigma_V^2=T^2\\sigma_K^2+\\sigma_a^2+2T\\,\\operatorname{Cov}(K,a)\n$$"
        },
        {
          "id": "2023-uts1-q3-step-5",
          "title": "State the assumption required by the available data",
          "content": "The question gives no covariance or correlation between K and a. To obtain one numerical answer, assume zero covariance, as would hold for independent variations.\n\nNormal distributions alone do not make the two parameters independent. If they are correlated, the mean remains 1.999 V, but standard deviation needs additional information.\n\n$$\n\\operatorname{Cov}(K,a)=0\\quad\\Rightarrow\\quad\\sigma_V^2=T^2\\sigma_K^2+\\sigma_a^2\n$$"
        },
        {
          "id": "2023-uts1-q3-step-6",
          "title": "Put both uncertainty contributions into volts",
          "content": "Sensitivity variation becomes voltage variation after multiplication by the fixed 100°C temperature. Its standard-deviation contribution is 100×0.001=0.100 V.\n\nOffset already has units volts, so its contribution remains 0.00015 V. Combine the squares of these contributions rather than adding standard deviations directly.\n\n$$\nT\\sigma_K=0.100\\ \\mathrm V,\\qquad\\sigma_a=0.00015\\ \\mathrm V\n$$"
        },
        {
          "id": "2023-uts1-q3-step-7",
          "title": "Add variances, then take the square root",
          "content": "Squaring 0.100 V gives 0.010000 V². Squaring 0.00015 V gives 0.0000000225 V². Their sum still has units V².\n\nWe take the square root to return to volts. The result is close to 0.100 V because sensitivity variation dominates at this 100°C input.\n\n$$\n\\begin{aligned}\\sigma_V&=\\sqrt{(100\\times0.001)^2+(1.5\\times10^{-4})^2}\\\\&=\\sqrt{0.0100000225}\\\\&=\\boxed{0.1000001125\\ \\mathrm V\\approx0.100\\ \\mathrm V}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts1-q3-step-8",
          "title": "Interpret mean output and its spread",
          "content": "The value 1.999 V is the centre of the sensor population's outputs at the same temperature. Standard deviation about 0.100 V describes between-sensor spread in this manufacturing model; it is not a guaranteed maximum error bound.\n\nIf K and a are independent normal variables, their linear combination V is also normal. That distribution-shape statement is separate from calculating its mean and variance."
        }
      ],
      "finalAnswer": "Mean output is 1.999 V. Assuming zero covariance between K and a, output standard deviation is 0.1000001125 V, approximately 0.100 V.\n\n$$\n\\boxed{\\bar V=1.999\\ \\mathrm V,\\qquad \\sigma_V\\approx0.100\\ \\mathrm V\\quad[\\operatorname{Cov}(K,a)=0]}\n$$",
      "takeaway": "A small spread does not prove that results are close to the reference."
    },
    "2023-uas-q2": {
      "title": "Mean and standard deviation",
      "source": "Final exam 2023 · Question 2",
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Error and uncertainty"
      ],
      "statement": "Ten strain gauges are sampled for quality control. Resistances in Ω are 120.1, 120.0, 120.2, 120.0, 119.8, 120.3, 120.0, 119.6, 120.0, 119.9. Find the mean and sample standard deviation.",
      "simulation": {
        "title": "Measurement data",
        "caption": "Each point is one strain gauge; the reference line marks the mean.",
        "params": [
          {
            "key": "value0",
            "label": "Observation 1"
          },
          {
            "key": "value1",
            "label": "Observation 2"
          },
          {
            "key": "value2",
            "label": "Observation 3"
          },
          {
            "key": "value3",
            "label": "Observation 4"
          },
          {
            "key": "value4",
            "label": "Observation 5"
          },
          {
            "key": "value5",
            "label": "Observation 6"
          },
          {
            "key": "value6",
            "label": "Observation 7"
          },
          {
            "key": "value7",
            "label": "Observation 8"
          },
          {
            "key": "value8",
            "label": "Observation 9"
          },
          {
            "key": "value9",
            "label": "Observation 10"
          }
        ]
      },
      "steps": [
        {
          "id": "2023-uas-q2-step-1",
          "title": "Identify what the mean and standard deviation describe",
          "content": "The ten values are resistances from ten sampled strain gauges. The **mean**, the sum divided by sample size, describes the data centre. **Standard deviation** measures spread around that mean in resistance units.\n\nWe use every measurement, including repeated values. The four occurrences of 120.0 Ω represent four sampled units, not one value to keep after removing duplicates.\n\n$$\nn=10,\\qquad \\bar R=\\frac{1}{n}\\sum_{i=1}^nR_i\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Bias requires model or calibration correction; repeats mainly help assess random variation.",
            "commonPitfall": "A small spread does not prove that results are close to the reference."
          },
          "checkpoint": {
            "prompt": "Several strain-gauge resistances cluster closely, giving a small sample standard deviation. Certified true values for the units are unavailable. What conclusion do the data support?",
            "options": [
              {
                "id": "2023-uas-q2-checkpoint-option-1",
                "label": "The mean is unnecessary because standard deviation already provides the centre.",
                "feedback": "Standard deviation measures spread. The mean is still needed to state the data centre."
              },
              {
                "id": "2023-uas-q2-checkpoint-option-2",
                "label": "Observed resistance spread is small; bias relative to true values remains undetermined.",
                "feedback": "Correct. The sample supports a spread assessment; bias requires a reference or additional information."
              },
              {
                "id": "2023-uas-q2-checkpoint-option-3",
                "label": "All results must be close to their true values.",
                "feedback": "Closeness between results does not establish closeness to an unknown true value."
              },
              {
                "id": "2023-uas-q2-checkpoint-option-4",
                "label": "The measuring instrument must be error-free because results are consistent.",
                "feedback": "A common bias in all readings can still produce a small standard deviation."
              }
            ]
          }
        },
        {
          "id": "2023-uas-q2-step-2",
          "title": "Sum the resistances and divide by sample size",
          "content": "The symbol $\\sum R_i$ means adding every resistance, from the first unit to the tenth. Their total is 1199.9 Ω. We divide by ten because there are ten units.\n\nThe mean 119.99 Ω lies between the minimum 119.6 Ω and maximum 120.3 Ω. This range check confirms that the centre lies within the data we averaged.\n\n$$\n\\sum R_i=1199.9\\ \\Omega,\\qquad\\bar R=\\frac{1199.9}{10}=\\boxed{119.99\\ \\Omega}\n$$"
        },
        {
          "id": "2023-uas-q2-step-3",
          "title": "Calculate each value's deviation from the centre",
          "content": "The first unit's deviation is $120.1-119.99=0.11$ Ω. The smallest value has deviation $119.6-119.99=-0.39$ Ω. The sign indicates whether a value lies above or below the mean.\n\nAdding signed deviations does not measure spread: positive and negative values cancel. Standard deviation therefore uses squared deviations.\n\n$$\nd_i=R_i-\\bar R,\\qquad\\sum d_i=0\n$$"
        },
        {
          "id": "2023-uas-q2-step-4",
          "title": "Square the deviations and sum them",
          "content": "Squaring makes every contribution nonnegative and gives greater weight to values farther from the centre. Units become Ω² because Ω is multiplied by Ω.\n\nThe table shows every calculation. The final column sums to 0.3490 Ω²; this is the sum of squared deviations, not yet variance or standard deviation.\n\n$$\n\\sum_{i=1}^{10}(R_i-\\bar R)^2=0.3490\\ \\Omega^2\n$$\n\n| Rᵢ (Ω) | Rᵢ − 119.99 (Ω) | Square (Ω²) |\n| --- | --- | --- |\n| 120.1 | 0.11 | 0.0121 |\n| 120.0 | 0.01 | 0.0001 |\n| 120.2 | 0.21 | 0.0441 |\n| 120.0 | 0.01 | 0.0001 |\n| 119.8 | −0.19 | 0.0361 |\n| 120.3 | 0.31 | 0.0961 |\n| 120.0 | 0.01 | 0.0001 |\n| 119.6 | −0.39 | 0.1521 |\n| 120.0 | 0.01 | 0.0001 |\n| 119.9 | −0.09 | 0.0081 |"
        },
        {
          "id": "2023-uas-q2-step-5",
          "title": "Use n−1 for sample variance",
          "content": "We estimate population spread from a sample, and the population mean is also unknown. The mean used here was estimated from those same ten values.\n\nOnce the mean is set, the ten deviations must sum to zero; nine deviations determine the last one. The n−1 divisor in sample variance accounts for estimating the mean from the sample.\n\nThe divisor is therefore 9 rather than 10. Variance still has units Ω².\n\n$$\ns^2=\\frac{\\sum(R_i-\\bar R)^2}{n-1}=\\frac{0.3490}{9}=0.0387778\\ \\Omega^2\n$$"
        },
        {
          "id": "2023-uas-q2-step-6",
          "title": "Take the square root to return to resistance units",
          "content": "Standard deviation is the square root of variance. It converts Ω² back to Ω, allowing direct comparison with resistance values.\n\nKeep unrounded values during calculation, then round the final result. The requested quantities are mean 119.99 Ω and sample standard deviation about 0.196921 Ω.\n\n$$\ns=\\sqrt{\\frac{0.3490}{9}}=\\boxed{0.196921\\ \\Omega}\n$$"
        },
        {
          "id": "2023-uas-q2-step-7",
          "title": "Interpret spread without equating it with error",
          "content": "The standard deviation of about 0.197 Ω describes resistance spread between sampled units. It is not automatically measurement-instrument error or uncertainty of the mean.\n\nIf the ten units were the entire population of interest, division by 10 would give population standard deviation 0.186815 Ω. The question's sample wording supports using 0.196921 Ω.\n\nThese data also provide no certified true resistance. A mean near 120 Ω therefore does not by itself establish that the measurements are free of bias."
        }
      ],
      "finalAnswer": "Mean 119.99 Ω and sample standard deviation 0.196921 Ω.\n\n$$\n\\boxed{\\bar R=119.99\\ \\Omega,\\qquad s=0.196921\\ \\Omega}\n$$",
      "takeaway": "A small spread does not prove that results are close to the reference."
    },
    "ipe-statistics-practice": {
      "title": "Practice: Error and uncertainty",
      "intro": "This practice helps you choose a model and explain your reasoning. Start with multiple-choice questions, review a flawed example, then write your own answer. Use the rubric to check your logic, assumptions, and conclusion limits.",
      "questions": [
        {
          "id": "concept-2023-09",
          "prompt": "Several strain-gauge resistances cluster closely, giving a small sample standard deviation. Certified true values for the units are unavailable. What conclusion do the data support?",
          "options": [
            {
              "id": "concept-2023-09-option-1",
              "label": "The mean is unnecessary because standard deviation already provides the centre.",
              "feedback": "Standard deviation measures spread. The mean is still needed to state the data centre."
            },
            {
              "id": "concept-2023-09-option-2",
              "label": "Observed resistance spread is small; bias relative to true values remains undetermined.",
              "feedback": "Correct. The sample supports a spread assessment; bias requires a reference or additional information."
            },
            {
              "id": "concept-2023-09-option-3",
              "label": "All results must be close to their true values.",
              "feedback": "Closeness between results does not establish closeness to an unknown true value."
            },
            {
              "id": "concept-2023-09-option-4",
              "label": "The measuring instrument must be error-free because results are consistent.",
              "feedback": "A common bias in all readings can still produce a small standard deviation."
            }
          ],
          "explanation": "Standard deviation describes spread around the mean rather than distance from a true value. Results can cluster tightly while sharing a bias. Between-unit measurements also combine product variation and measurement effects, so they do not automatically isolate instrument error."
        },
        {
          "id": "concept-2024-09",
          "prompt": "A gain misadjustment makes an instrument’s mean reading lower than true pressure. Repeated readings also show random spread. What can averaging many independent readings at that same setting accomplish?",
          "options": [
            {
              "id": "concept-2024-09-option-1",
              "label": "Remove both bias and spread because positive and negative errors always cancel.",
              "feedback": "Random cancellation does not remove a systematic shift shared by all readings."
            },
            {
              "id": "concept-2024-09-option-2",
              "label": "Automatically correct instrument sensitivity without calibration or correction.",
              "feedback": "Averaging processes data; it does not change circuit gain. Incorrect sensitivity still requires correction."
            },
            {
              "id": "concept-2024-09-option-3",
              "label": "Make standard deviation equal to the absolute bias.",
              "feedback": "Bias measures a centre shift; standard deviation measures spread. No rule makes them equal."
            },
            {
              "id": "concept-2024-09-option-4",
              "label": "Reduce the spread of the sample mean, but not remove the gain-induced bias.",
              "feedback": "Correct. Random uncertainty of the mean can decrease while its distribution remains shifted."
            }
          ],
          "explanation": "Independent random errors can make the mean more stable as sample size grows. All readings still centre on the wrong value caused by the gain setting. Correcting the setting or applying a calibration correction is needed to address that bias."
        },
        {
          "id": "concept-2025-01",
          "prompt": "A pressure system gives tightly clustered repeat readings, all below the reference. Inspection finds that the recorder gain is too low. Which action best addresses the main problem?",
          "options": [
            {
              "id": "concept-2025-01-option-1",
              "label": "Take more repeats and use their mean without changing the recorder.",
              "feedback": "Repeats can reduce random uncertainty in the mean, but cannot remove an incorrect gain."
            },
            {
              "id": "concept-2025-01-option-2",
              "label": "Increase display resolution so the mean deviation disappears.",
              "feedback": "Resolution controls the display step. It does not correct a faulty input and output mapping."
            },
            {
              "id": "concept-2025-01-option-3",
              "label": "Correct the recorder gain, then recalibrate the input and output relation.",
              "feedback": "Correct. This targets the bias source and checks the relation after adjustment."
            },
            {
              "id": "concept-2025-01-option-4",
              "label": "Declare the system accurate because its repeat readings are tightly clustered.",
              "feedback": "Tight clustering indicates precision, not freedom from bias. Accuracy still requires comparison with a reference."
            }
          ],
          "explanation": "Tight clustering indicates small random spread, but does not establish a correct mean. Incorrect recorder gain produces a systematic error in the input and output relation. Correct the cause and recalibrate; additional repeats only estimate the still-biased mean more precisely."
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-statistics-guided",
          "title": "Review a precision claim",
          "prompt": "An instrument produces tightly clustered readings. No reference value is available. Check the following conclusion.",
          "workSample": "The readings have a small standard deviation. Therefore, every reading must be close to the true value.",
          "question": {
            "prompt": "Which claim lacks support?",
            "options": [
              {
                "id": "ipe-statistics-guided-question-option-1",
                "label": "Closeness to the true value.",
                "feedback": "Correct. We need a reference to judge whether the mean is close to the true value."
              },
              {
                "id": "ipe-statistics-guided-question-option-2",
                "label": "The small spread during that test.",
                "feedback": "A small spread does match a small standard deviation. The unsupported claim concerns the true value."
              },
              {
                "id": "ipe-statistics-guided-question-option-3",
                "label": "The need to record measurement conditions.",
                "feedback": "Measurement conditions should still be recorded. That step does not cause the faulty conclusion."
              }
            ],
            "explanation": "The data support repeatability under the test conditions. They do not establish bias because no reference value is available."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-statistics-essay",
          "title": "Plan an instrument-error check",
          "prompt": "A pressure sensor gives tight readings that consistently fall below the reference. Explain how you would identify the cause, correct it, and verify the correction. Focus on reasoning rather than calculations.",
          "sections": [
            "Model and assumptions",
            "Reasoning",
            "Conclusion and limits"
          ],
          "hints": [
            "Separate the location of the mean from its spread.",
            "Check zero and gain calibration at more than one input.",
            "Compare with a reference, correct the cause of bias, and repeat the test at several inputs."
          ],
          "rubric": [
            {
              "id": "ipe-statistics-rubric-model",
              "label": "Model and assumptions",
              "fullCredit": "Identifies bias and random spread as separate components.",
              "commonPartialError": "A small spread does not prove that results are close to the reference."
            },
            {
              "id": "ipe-statistics-rubric-reasoning",
              "label": "Reasoning",
              "fullCredit": "Compares several reference points to distinguish zero and gain errors."
            },
            {
              "id": "ipe-statistics-rubric-conclusion",
              "label": "Conclusion and limits",
              "fullCredit": "Rechecks the mean and spread after correction and notes reference uncertainty."
            }
          ],
          "verifiedOutline": "Tightly clustered readings indicate small spread. A mean below the reference indicates bias. Test several reference pressures to distinguish zero and gain errors. Correct the calibration relation or incorrect setting. Repeat measurements after correction and check both mean and spread. Include reference uncertainty when judging agreement."
        }
      ]
    }
  }
};

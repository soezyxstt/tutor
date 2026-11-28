import type { CourseModule, CourseTranslation } from '@tutor/core';

export const module: CourseModule = {
  "id": "ipe-temperature",
  "code": "M7",
  "title": "Sensor suhu",
  "items": [
    {
      "id": "ipe-temperature-material",
      "kind": "material",
      "slug": "ipe-temperature-material",
      "title": "Periksa acuan sebelum mencari suhu",
      "estimatedMinutes": 12,
      "examHook": {
        "prompt": "Tabel termokopel mengacu pada 0 °C, tetapi terminal alat berada pada suhu ruang. Bagaimana Anda memakai tegangan terukur?",
        "targetOutcome": "Anda dapat memilih koreksi referensi dan skala suhu yang sesuai."
      },
      "body": "Sensor suhu tidak selalu langsung memberi angka suhu. Termokopel memberi tegangan yang terkait dua sambungan. RTD dan termistor memberi tahanan yang perlu dipetakan ke suhu.\n\nAnda perlu mengenali keluaran sensor dan acuan modelnya. Langkah tersebut mencegah kesalahan tanda, kompensasi, dan skala suhu.\n\n[Buka pembahasan bertahap: Termokopel J dan suhu referensi](?item=2025-uts2-q2).",
      "microUnits": [
        {
          "id": "ipe-temperature-principle",
          "title": "Pilih model dari kondisi soal",
          "intuition": "Tegangan termokopel bergantung pada suhu sambungan ukur dan sambungan referensi. **Kompensasi referensi** (koreksi tegangan untuk acuan tabel) menyamakan acuan pengukuran dengan acuan tabel. Anda mengoreksi tegangan terlebih dahulu, lalu mencari suhu dari tabel.",
          "formal": "Dengan tabel beracuan 0 °C:\n\n$$E(T_h,0)=E_{\\mathrm{ukur}}+E(T_r,0).$$\n\n$T_h$ menyatakan suhu sambungan ukur dan $T_r$ suhu referensi. Periksa arah polaritas sebelum memakai tanda tersebut.",
          "validityBounds": "Gunakan tipe termokopel dan rentang tabel yang sesuai. Untuk model termistor eksponensial, gunakan kelvin jika model mensyaratkannya. Untuk RTD, periksa rentang pendekatan linear serta pemanasan diri.",
          "decisionCheck": {
            "id": "ipe-temperature-decision-question",
            "prompt": "Model termistor memakai suhu mutlak. Anda memiliki suhu dalam Celsius. Apa langkah yang sesuai sebelum memakai model?",
            "options": [
              {
                "id": "ipe-temperature-decision-question-option-1",
                "label": "Ubah suhu ke kelvin sesuai acuan model.",
                "feedback": "Tepat. Model memakai nilai suhu mutlak, bukan hanya selisih suhu."
              },
              {
                "id": "ipe-temperature-decision-question-option-2",
                "label": "Masukkan angka Celsius karena selisih satu derajat sama.",
                "feedback": "Ukuran kenaikan sama tidak membuat nilai suhu mutlak kedua skala sama.",
                "misconceptionTag": "temperature-decision-choice-2"
              },
              {
                "id": "ipe-temperature-decision-question-option-3",
                "label": "Ganti tanda suhu saja; skala suhu tidak memengaruhi model.",
                "feedback": "Perubahan tanda tidak mengganti acuan nol Celsius menjadi nol kelvin.",
                "misconceptionTag": "temperature-decision-choice-3"
              }
            ],
            "correctOptionId": "ipe-temperature-decision-question-option-1",
            "explanation": "Ikuti satuan pada definisi model. Konstanta model yang memakai kelvin tidak dapat langsung dipakai bersama angka Celsius."
          }
        },
        {
          "id": "ipe-temperature-static-reference",
          "title": "Pisahkan ketaklinieran dan koreksi referensi",
          "intuition": "Bagian 1, halaman PDF 12-14, membahas dua sebab selisih yang berbeda. Kurva sensor dapat menyimpang dari garis ideal. Suhu terminal juga dapat mengubah tegangan yang Anda baca. Tentukan dahulu selisih mana yang ditanya.",
          "formal": "Untuk rentang $T_a$ sampai $T_b$, tulis $K=[E(T_b,0)-E(T_a,0)]/(T_b-T_a)$ dan $E_{\\mathrm{ideal}}(T)=E(T_a,0)+K(T-T_a)$. Lalu $N(T)=E(T,0)-E_{\\mathrm{ideal}}(T)$. Persen simpangan pada titik itu adalah $100|N(T)|/|E(T_b,0)-E(T_a,0)|$.",
          "validityBounds": "Pakai tipe termokopel, rentang, satuan tegangan, serta acuan yang sama. Simpangan pada satu titik tidak selalu menjadi simpangan terbesar. Koreksi referensi memakai tegangan, sehingga jangan menambah suhu begitu saja.",
          "decisionCheck": {
            "id": "ipe-temperature-static-reference-check",
            "prompt": "Tabel memberi tegangan termokopel terhadap 0 °C. Soal meminta ketaklinieran pada satu suhu dalam rentang tertentu. Apa pembagi yang tepat untuk persen skala penuh?",
            "options": [
              {
                "id": "ipe-temperature-static-reference-option-1",
                "label": "Rentang tegangan antara kedua ujung rentang suhu.",
                "feedback": "Tepat. Pembilang dan pembagi sama-sama memiliki satuan tegangan."
              },
              {
                "id": "ipe-temperature-static-reference-option-2",
                "label": "Suhu titik yang sedang diperiksa.",
                "feedback": "Membagi tegangan dengan suhu menghasilkan sensitivitas, bukan persen simpangan.",
                "misconceptionTag": "ipe-temperature-static-reference-error-2"
              },
              {
                "id": "ipe-temperature-static-reference-option-3",
                "label": "Tegangan terukur tanpa memeriksa suhu referensi.",
                "feedback": "Tegangan terukur dapat memakai acuan lain dan bukan rentang keluaran penuh.",
                "misconceptionTag": "ipe-temperature-static-reference-error-3"
              }
            ],
            "explanation": "Skala penuh mengacu pada rentang keluaran tegangan yang membentuk garis ideal. Selisih suhu dipakai untuk kemiringan garis, bukan sebagai pembagi simpangan tegangan.",
            "correctOptionId": "ipe-temperature-static-reference-option-1"
          }
        },
        {
          "id": "ipe-temperature-time-response",
          "title": "Hitung waktu sejak suhu berubah",
          "intuition": "Bagian 2, halaman PDF 6-7, memodelkan sensor yang perlu waktu untuk mendekati nilai akhir. Kalibrasi statik memberi hubungan saat keadaan sudah tunak. Konstanta waktu menentukan seberapa cepat sensor mendekati keadaan itu.",
          "formal": "Untuk masukan yang berubah sekali pada $t_0$, $R(t)=R_\\infty+[R(t_0)-R_\\infty]e^{-(t-t_0)/\\tau}$ bagi $t\\ge t_0$. Anda memperoleh $R_\\infty$ dari kalibrasi statik. Setelah satu $\\tau$, sisa selisih adalah $e^{-1}$ dari selisih awal.",
          "validityBounds": "Model ini memakai satu konstanta waktu, parameter tetap, dan masukan yang tetap setelah perubahan. Tetapkan keadaan awal dan waktu perubahan. Jangan memakai nilai kalibrasi akhir sebagai pembacaan sesaat.",
          "decisionCheck": {
            "id": "ipe-temperature-time-response-check",
            "prompt": "Suhu berubah pada detik ke-1. Anda mencari bacaan pada detik ke-2. Waktu mana yang masuk ke pangkat eksponensial?",
            "options": [
              {
                "id": "ipe-temperature-time-response-option-1",
                "label": "1 detik, yaitu 2 dikurangi 1.",
                "feedback": "Tepat. Sensor telah merespons selama satu detik."
              },
              {
                "id": "ipe-temperature-time-response-option-2",
                "label": "2 detik karena itu waktu pembacaan.",
                "feedback": "Itu menghitung satu detik sebelum perubahan suhu sebagai bagian dari respons.",
                "misconceptionTag": "ipe-temperature-time-response-error-2"
              },
              {
                "id": "ipe-temperature-time-response-option-3",
                "label": "3 detik karena kedua waktu perlu dijumlahkan.",
                "feedback": "Waktu respons merupakan selisih, bukan jumlah kedua waktu.",
                "misconceptionTag": "ipe-temperature-time-response-error-3"
              }
            ],
            "explanation": "Respons dimulai pada saat masukan berubah. Gunakan selang waktu sejak perubahan itu, bukan angka jam pengamatan.",
            "correctOptionId": "ipe-temperature-time-response-option-1"
          }
        }
      ],
      "checkpoints": [
        "Anda dapat memilih koreksi referensi dan skala suhu yang sesuai.",
        "Acuan, polaritas, dan skala suhu harus cocok dengan model sensor.",
        "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi."
      ],
      "derivations": [
        {
          "id": "ipe-temperature-sources",
          "title": "Sumber dan cara membaca arsip",
          "content": "Baca bagian yang sesuai dengan model yang Anda pakai. Nomor di bawah menghitung halaman PDF dari 1; satu halaman dapat memuat beberapa slide.\n\n[Pengukuran Teknik, Bagian 1 (2022)](https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view), halaman PDF 11, 12, 13, 14, 16: Rentang, garis ideal, ketaklinieran, sensitivitas, dan pengaruh suhu referensi.\n\n[Pengukuran Teknik, Bagian 2 (2022)](https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view), halaman PDF 6, 7: Model orde satu dan respons terhadap perubahan suhu.\n\n[Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view), halaman PDF 2, 3, 4, 5, 6, 19, 20, 24, 25, 26: Jenis sensor suhu, model tahanan, hukum termokopel, dan tabel acuan.\n\n[Arsip soal UTS 1, UTS 2, dan UAS 2023 sampai 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Setiap soal menyimpan naskah, halaman ujian, dan asumsi tersendiri."
        }
      ]
    },
    {
      "id": "2025-uts2-q2",
      "kind": "problem",
      "slug": "2025-uts2-q2",
      "title": "Termokopel J dan suhu referensi",
      "source": "UTS 2 2025 · Soal 2",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
        "file": "2025-uts2.pdf",
        "pages": [
          1,
          2,
          4
        ],
        "original": "2. Temperature Sensor: Thermocouple\nA Type J thermocouple is used to measure temperature of air inside a pipe, as shown in the following figure. Hint: Use the table in the appendix to answer the following questions.\na. [5%] If the reference junction temperature is 0°C, calculate the percentage non-linearity at 150°C for a measurement range of 0 to 400°C.\nb. [10%] Calculate the temperature inside a pipe if an emf of 12.7 mV is measured relative to a reference junction of 20°C.\nFigure data: Air, V = 50 m/s; emf measured against Tref. Appendix: Type J thermocouple, reference junctions at 0°C. Relevant table entries (°C → mV): 0 → 0.000; 20 → 1.019; 150 → 8.010; 252 → 13.666; 253 → 13.722; 400 → 21.848.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              12,
              13,
              14,
              16
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              4,
              5,
              24,
              25,
              26
            ]
          }
        ]
      },
      "assumptions": [
        "Acuan ketaklinieran memakai garis dua ujung rentang. Suhu sambungan ukur mewakili suhu udara; galat pemasangan dan perpindahan panas diabaikan."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2025,
        "number": 2
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Sensor suhu"
      ],
      "statement": "Termokopel tipe J mengukur suhu udara dalam pipa. Gambar memberi kecepatan udara $50\\ \\mathrm{m/s}$. Gunakan tabel lampiran dengan referensi $0^\\circ\\mathrm C$.\n(a) Untuk rentang $0$ hingga $400^\\circ\\mathrm C$, hitung ketaklinieran pada $150^\\circ\\mathrm C$ sebagai persen skala penuh. (b) Tentukan suhu saat tegangan terukur $12.7\\ \\mathrm{mV}$ dan suhu referensi $20^\\circ\\mathrm C$.",
      "simulation": {
        "id": "2025-uts2-q2-visual",
        "type": "ipe-thermocouple",
        "title": "Termokopel",
        "caption": "Tegangan sambungan dingin melengkapi tegangan terukur sebelum pencarian suhu.",
        "params": [
          {
            "key": "temperature",
            "label": "Suhu",
            "min": 0,
            "max": 400,
            "step": 1,
            "defaultValue": 252.946,
            "unit": "°C"
          },
          {
            "key": "referenceTemperature",
            "label": "Suhu referensi",
            "min": 0,
            "max": 400,
            "step": 1,
            "defaultValue": 20,
            "unit": "°C"
          }
        ],
        "data": {
          "type": "J",
          "measuredMv": 12.7,
          "Tref": 20,
          "T": 252.946,
          "rangeMax": 400,
          "testC": 150,
          "tableC": [
            0,
            20,
            150,
            252,
            253,
            400
          ],
          "tableMv": [
            0,
            1.019,
            8.01,
            13.666,
            13.722,
            21.848
          ],
          "visualKind": "thermocouple"
        }
      },
      "steps": [
        {
          "id": "2025-uts2-q2-step-1",
          "title": "1. Pahami apa yang dibaca termokopel",
          "content": "Dua sambungan logam pada suhu berbeda menghasilkan tegangan. **Termokopel** (sensor suhu berbahan dua logam berbeda) memakai tegangan tersebut untuk mengukur suhu. Tabel tipe J memberi $E_J(T,0)$, yaitu tegangan dengan sambungan ukur pada $T$ dan referensi pada $0^\\circ\\mathrm C$. Kita perlu mengetahui suhu referensi sebelum membaca suhu dari tegangan.\n\nBagian (a) menilai bentuk kurva terhadap garis acuan. Bagian (b) memakai tabel yang sama untuk mencari suhu. Kedua bagian memakai tegangan tabel, tetapi langkah awalnya berbeda.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Acuan, polaritas, dan skala suhu harus cocok dengan model sensor.",
            "commonPitfall": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi."
          },
          "checkpoint": {
            "prompt": "Anda menyambung kawat tembaga ke sepasang kawat termokopel melalui dua terminal. Kedua terminal berada pada suhu yang sama. Mengapa sambungan tambahan itu dapat dipakai tanpa menambah tegangan bersih pada model ideal?",
            "options": [
              {
                "id": "2025-uts2-q2-checkpoint-option-1",
                "label": "Setiap logam ketiga selalu menghapus seluruh tegangan termokopel, pada suhu berapa pun.",
                "feedback": "Logam tambahan tidak menghapus tegangan ukur seluruh termokopel. Pembatalan hanya berlaku pada kontribusi tambahannya dan memerlukan pasangan sambungan bersuhu sama.",
                "misconceptionTag": "concept-2025-02-choice-1"
              },
              {
                "id": "2025-uts2-q2-checkpoint-option-2",
                "label": "Tahanan kawat tembaga yang kecil menjamin kedua sambungan tidak pernah menghasilkan tegangan termal.",
                "feedback": "Tahanan rendah membantu mengurangi jatuh tegangan listrik, tetapi tidak menjamin pembatalan tegangan akibat suhu. Syarat penting di sini ialah suhu kedua terminal yang sama.",
                "misconceptionTag": "concept-2025-02-choice-2"
              },
              {
                "id": "2025-uts2-q2-checkpoint-option-3",
                "label": "Sambungan tambahan menghapus kebutuhan mengetahui suhu referensi termokopel.",
                "feedback": "Pembatalan sambungan tambahan tidak mengubah suhu referensi yang dipakai tabel. Referensi tetap harus diketahui dan dikompensasi bila perlu.",
                "misconceptionTag": "concept-2025-02-choice-3"
              },
              {
                "id": "2025-uts2-q2-checkpoint-option-4",
                "label": "Pengaruh pasangan sambungan logam tambahan saling menghapus jika keduanya bersuhu sama; perbedaan suhu terminal dapat menambah galat.",
                "feedback": "Tepat. Pernyataan ini menyebut mekanisme pembatalan serta syarat suhu yang harus dijaga."
              }
            ],
            "correctOptionId": "2025-uts2-q2-checkpoint-option-4"
          }
        },
        {
          "id": "2025-uts2-q2-step-2",
          "title": "2. Bentuk garis ideal dari dua ujung rentang",
          "content": "Ketaklinieran membandingkan tabel nyata dengan garis lurus acuan. Di sini kita memilih garis melalui titik 0 °C dan 400 °C, bukan garis singgung pada 150 °C.\n\nKemiringan garis adalah $21.848/400=0.05462\\ \\mathrm{mV/{}^\\circ C}$. Mengalikan kemiringan dengan 150 °C memberi tegangan yang akan dibaca sensor jika hubungan itu benar-benar lurus. Ini nilai pembanding, bukan nilai tabel nyata.\n\n$$\nE_{\\mathrm{lin}}(T)=\\frac{21.848-0}{400-0}T=0.05462T\\ \\mathrm{mV}\\\\E_{\\mathrm{lin}}(150)=8.193\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uts2-q2-step-3",
          "title": "3. Bandingkan tegangan pada 150 °C",
          "content": "Tabel memberi 8.010 mV. Kurangi dengan nilai garis ideal, lalu bagi simpangan mutlak dengan rentang keluaran penuh. Tanda negatif berarti titik tabel berada di bawah garis.\n\nPenyebut $21.848\\ \\mathrm{mV}$ berasal dari rentang keluaran 0 sampai 400 °C. Membagi dengan 8.010 mV akan memberi persen terhadap pembacaan pada 150 °C, yang berbeda dari persen skala penuh yang diminta.\n\n$$\nN(150)=8.010-8.193=-0.183\\ \\mathrm{mV}\\\\\\%N=\\frac{|{-0.183}|}{21.848}\\,100\\%=0.8376\\%\n$$"
        },
        {
          "id": "2025-uts2-q2-step-4",
          "title": "4. Tulis hubungan sambungan sebelum mengoreksi",
          "content": "Untuk sambungan ukur yang sama, menaikkan suhu referensi dari 0 ke 20 °C mengurangi beda tegangan yang terbaca. Tegangan yang hilang sebesar $E_J(20,0)$. Untuk mengembalikan pembacaan ke bentuk tabel, nilai itu harus ditambahkan.\n\n$$\nE_J(T,20)=E_J(T,0)-E_J(20,0)\\quad\\Rightarrow\\quad E_J(T,0)=E_J(T,20)+E_J(20,0)\n$$"
        },
        {
          "id": "2025-uts2-q2-step-5",
          "title": "5. Koreksi sambungan referensi 20 °C",
          "content": "Tegangan terukur berasal dari selisih dua suhu sambungan. Kita menambahkan $E_J(20,0)=1.019\\ \\mathrm{mV}$ untuk memakai tabel referensi nol. Menambah langsung 20 °C pada hasil pencarian tabel tidak tepat karena hubungan suhu dan tegangan tidak benar-benar linear.\n\nLakukan koreksi di ranah tegangan terlebih dahulu. Penjumlahan suhu secara langsung hanya akan sah untuk hubungan tegangan dan suhu yang benar-benar linear dengan sensitivitas tetap.\n\n$$\nE_J(T,0)=E_J(T,20)+E_J(20,0)=12.700+1.019=13.719\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uts2-q2-step-6",
          "title": "6. Cari dua baris tabel yang mengapit tegangan",
          "content": "Pilih entri yang mengapit $13.719\\ \\mathrm{mV}$, bukan yang sekadar tampak dekat. Entri bawah ialah $(252^\\circ\\mathrm C,13.666\\ \\mathrm{mV})$, dan entri atas ialah $(253^\\circ\\mathrm C,13.722\\ \\mathrm{mV})$. Suhu akhir harus berada di antaranya.\n\n$$\n13.666<13.719<13.722\\quad\\Rightarrow\\quad252<T<253\n$$"
        },
        {
          "id": "2025-uts2-q2-step-7",
          "title": "7. Interpolasi di antara dua entri terdekat",
          "content": "13.719 mV berada di antara 13.666 mV pada 252 °C dan 13.722 mV pada 253 °C. Kita hitung bagian jarak dari titik bawah.\n\nPembilang adalah kenaikan dari entri bawah: $0.053\\ \\mathrm{mV}$. Penyebut adalah lebar satu interval: $0.056\\ \\mathrm{mV}$. Rasionya sekitar 0.946, sehingga suhu berada sekitar 94.6% perjalanan dari 252 ke 253 °C.\n\n$$\nT=252+\\frac{13.719-13.666}{13.722-13.666}(253-252)=252.946^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2025-uts2-q2-step-8",
          "title": "8. Cek arah koreksi dan batas hasil",
          "content": "Tegangan ekuivalen referensi nol lebih besar daripada tegangan terukur: $13.719>12.700\\ \\mathrm{mV}$. Hasil $252.946^\\circ\\mathrm C$ juga berada dalam interval 252 sampai 253 °C dan sangat dekat ke ujung atas, sesuai posisi tegangannya."
        },
        {
          "id": "2025-uts2-q2-step-9",
          "title": "9. Tafsirkan hasil sesuai model pengukuran",
          "content": "Suhu sambungan ukur sekitar 253 °C. Kita menyamakannya dengan suhu udara karena soal tidak memberi data untuk menghitung galat perpindahan panas atau pemulihan suhu aliran. Angka kecepatan udara tidak masuk ke koreksi listrik termokopel ini.\n\nMembedakan suhu sambungan dari suhu fluida membantu melihat batas jawaban. Data yang tersedia cukup untuk konversi listrik, tetapi belum cukup untuk menilai galat pemasangan atau perpindahan panas."
        }
      ],
      "finalAnswer": "Ketaklinieran pada 150 °C ialah 0.838% skala penuh, dengan simpangan −0.183 mV. Suhu ukur sekitar 252.95 °C.\n\n$$\n\\boxed{\\%N_{150}=0.838\\%\\ \\mathrm{FS},\\qquad T\\approx252.95^\\circ\\mathrm C}\n$$",
      "takeaway": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi.",
      "sourceNotes": [
        "Bagian 1, halaman PDF 12-13, menetapkan garis ideal dari dua ujung rentang dan simpangan $N(T)=E(T)-E_{\\mathrm{ideal}}(T)$. Jadi, pada bagian (a), bagi besar simpangan tegangan dengan rentang **keluaran** $E(400,0)-E(0,0)$. Nilai di satu suhu tidak membuktikan simpangan terbesar di seluruh rentang.",
        "Bagian 1, halaman PDF 14 dan 16, membahas suhu referensi sebagai pengaruh lingkungan pada termokopel. Gabungkan dasar itu dengan hukum termokopel di Bagian 3: koreksi tegangan sambungan referensi terlebih dahulu, lalu cari suhu pada tabel tipe J. Jangan menambah $20^\\circ\\mathrm C$ langsung ke hasil pembacaan tabel. Bedakan dua kondisi: saat suhu sambungan ukur tetap, kenaikan suhu referensi menurunkan tegangan terukur. Saat tegangan terukur tetap seperti pada soal, kenaikan suhu referensi menaikkan tegangan yang harus dicari pada tabel dan menaikkan suhu sambungan ukur hasil hitung."
      ]
    },
    {
      "id": "2025-uts2-q5",
      "kind": "problem",
      "slug": "2025-uts2-q5",
      "title": "RTD pada jembatan Wheatstone",
      "source": "UTS 2 2025 · Soal 5",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
        "file": "2025-uts2.pdf",
        "pages": [
          3
        ],
        "original": "5. RTD Sensor and Signal Conditioning\nAn RTD (Resistance Temperature Detector) is used as one arm (R4) of a Wheatstone bridge, as shown in the figure below. The RTD is used to measure a constant temperature, with the bridge operating in deflection mode. The RTD has a resistance of 25 Ω at a temperature of 0°C, and a thermal coefficient of resistance, β = 0.004 °C⁻¹. The resistance of the RTD as a function of temperature is given by: R(T) = R0(1 + βT).\na. [5%] If the RTD is subjected to a temperature of 100°C, calculate the resistance of RTD.\nb. [5%] Then, if the input voltage to the bridge is 5 V, calculate the output voltage of the bridge.\nFigure data: R2 = R3 = 100 Ω; R1 = 25 Ω at 0°C and balanced bridge conditions. Excitation connects the left and right diamond nodes; the galvanometer connects the upper and lower nodes.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              2,
              3,
              12
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              2,
              3,
              5,
              19
            ]
          }
        ]
      },
      "assumptions": [
        "Pembaca keluaran berimpedansi tinggi, tahanan kabel dan pemanasan sendiri diabaikan. Polaritas sumber dan pembaca kita definisikan karena gambar tidak memberi tanda keluaran."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2025,
        "number": 5
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Sensor suhu"
      ],
      "statement": "RTD menjadi lengan $R_4$ jembatan Wheatstone yang bekerja dalam mode defleksi. Diketahui $R_0=25\\ \\Omega$, $\\beta=0.004\\ ^\\circ\\mathrm C^{-1}$, dan $R(T)=R_0(1+\\beta T)$. Pada gambar, $R_2=R_3=100\\ \\Omega$ serta $R_1=25\\ \\Omega$. Suplai menghubungkan simpul kiri dan kanan; keluaran menghubungkan simpul atas dan bawah.\n(a) Hitung tahanan RTD pada $100^\\circ\\mathrm C$. (b) Hitung keluaran untuk suplai $5\\ \\mathrm V$.",
      "simulation": {
        "id": "2025-uts2-q5-visual",
        "type": "ipe-rtd",
        "title": "Sensor suhu resistif",
        "caption": "Suhu mengubah tahanan RTD dan ketakseimbangan jembatan.",
        "params": [
          {
            "key": "temperature",
            "label": "Suhu",
            "min": 0,
            "max": 200,
            "step": 1,
            "defaultValue": 100,
            "unit": "°C"
          },
          {
            "key": "voltage",
            "label": "Tegangan catu",
            "min": 0,
            "max": 10,
            "step": 0.1,
            "defaultValue": 5,
            "unit": "V"
          }
        ],
        "data": {
          "R0": 25,
          "alpha": 0.004,
          "T": 100,
          "V": 5,
          "R1": 25,
          "R2": 100,
          "R3": 100,
          "topology": "side-excitation",
          "visualKind": "rtd"
        }
      },
      "steps": [
        {
          "id": "2025-uts2-q5-step-1",
          "title": "1. Ikuti rantai suhu, tahanan, lalu tegangan",
          "content": "Suhu mengubah tahanan bahan sensor. **RTD** (sensor suhu berbasis perubahan tahanan) memakai hubungan tersebut untuk membaca suhu. Jembatan mengubah tahanan RTD menjadi beda tegangan. Kita menghitung tahanan terlebih dahulu, lalu mencari tegangan kedua titik keluaran.\n\nDalam $R(T)=R_0[1+\\alpha(T-T_0)]$, $R_0=25\\ \\Omega$ adalah tahanan pada $T_0=0^\\circ\\mathrm C$, dan $\\alpha=0.004\\ {}^\\circ\\mathrm C^{-1}$ menyatakan perubahan relatif per derajat.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Acuan, polaritas, dan skala suhu harus cocok dengan model sensor.",
            "commonPitfall": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi."
          }
        },
        {
          "id": "2025-uts2-q5-step-2",
          "title": "2. Ubah suhu menjadi tahanan",
          "content": "Koefisien positif berarti tahanan naik saat suhu naik. Kenaikan relatif pada 100 °C ialah 0.004 × 100 = 0.4, yaitu 40% dari tahanan awal.\n\nKenaikan mutlaknya ialah $\\Delta R=25(0.4)=10\\ \\Omega$, sehingga $R_4=25+10=35\\ \\Omega$. Koefisien suhu tidak berarti tahanan bertambah 0.004 Ω setiap derajat; ia mengalikan tahanan awal.\n\n$$\nR_4=25[1+0.004(100)]=35\\ \\Omega\n$$"
        },
        {
          "id": "2025-uts2-q5-step-3",
          "title": "3. Tetapkan simpul sebelum memakai rumus",
          "content": "Ikuti sambungan pada gambar: simpul kiri $+5\\ \\mathrm V$, simpul kanan $0\\ \\mathrm V$. Cabang atas terdiri dari $R_2$ lalu $R_3$; cabang bawah terdiri dari $R_1$ lalu RTD. Dengan pembaca berimpedansi tinggi, masing-masing cabang menjadi pembagi tegangan.\n\nPenomoran resistor saja tidak cukup untuk memilih rumus jembatan. Kita harus mengenali letak catu dan kedua simpul keluaran. Gambar soal memakai catu pada titik kiri dan kanan. Anda perlu mengikuti sambungan tersebut sebelum memasukkan R1 sampai R4 ke rumus pembagi tegangan.",
          "simulation": {
            "id": "2025-uts2-q5-step-3-visual",
            "type": "ipe-bridge",
            "title": "Jembatan ukur",
            "caption": "Suplai kiri dan kanan dan keluaran atas dan bawah mengikuti sambungan asli.",
            "params": [
              {
                "key": "resistance",
                "label": "Hambatan sensor",
                "min": 7,
                "max": 70,
                "step": 0.1,
                "defaultValue": 35,
                "unit": "Ω"
              },
              {
                "key": "voltage",
                "label": "Tegangan catu",
                "min": 0,
                "max": 10,
                "step": 0.1,
                "defaultValue": 5,
                "unit": "V"
              }
            ],
            "data": {
              "topology": "side-excitation",
              "R1": 25,
              "R2": 100,
              "R3": 100,
              "R4": 35,
              "V": 5,
              "visualKind": "bridge"
            }
          }
        },
        {
          "id": "2025-uts2-q5-step-4",
          "title": "4. Turunkan pembagi tegangan cabang atas",
          "content": "Arus cabang atas adalah tegangan total dibagi jumlah tahanannya. Tegangan simpul atas terhadap simpul kanan 0 V sama dengan jatuh tegangan pada $R_3$. Dua resistor 100 Ω membagi catu menjadi dua bagian sama.\n\n$$\nI_{\\mathrm{upper}}=\\frac5{100+100}=0.025\\ \\mathrm A,\\qquad V_{\\mathrm{top}}=I_{\\mathrm{upper}}R_3=2.500\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts2-q5-step-5",
          "title": "5. Hitung pembagi tegangan cabang RTD",
          "content": "Cabang bawah membawa arus berbeda karena jumlah tahanannya 60 Ω. Keluaran simpul bawah diukur terhadap sisi 0 V, jadi gunakan jatuh tegangan pada RTD 35 Ω. Memakai 25 Ω akan memberi tegangan dari simpul kiri ke simpul bawah, bukan tegangan simpul bawah terhadap acuan.\n\n$$\nI_{\\mathrm{lower}}=\\frac5{25+35}=0.0833333\\ \\mathrm A\\\\V_{\\mathrm{bottom}}=I_{\\mathrm{lower}}R_4=5\\frac{35}{60}=2.91667\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts2-q5-step-6",
          "title": "6. Ambil selisih dan cek kondisi nol",
          "content": "Untuk definisi $V_o=V_{\\mathrm{top}}-V_{\\mathrm{bottom}}$, keluaran negatif. Jika kabel pembaca dibalik, tandanya berubah, tetapi besarnya tetap. Pada $0^\\circ\\mathrm C$, kedua simpul bernilai 2.5 V sehingga jembatan seimbang.\n\nNilai negatif memberi informasi polaritas, bukan tegangan yang “tidak mungkin”. Simpul bawah lebih tinggi 0.41667 V daripada simpul atas. Jika pertanyaan meminta besar keluaran tanpa polaritas, laporkan $0.41667\\ \\mathrm V$ sambil menjelaskan definisi tanda.\n\n$$\nV_o=2.500-2.91667=-0.41667\\ \\mathrm V,\\qquad |V_o|=0.41667\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts2-q5-step-7",
          "title": "7. Cek perubahan dari keadaan seimbang",
          "content": "Pada 0 °C, $R_4=R_1=25\\ \\Omega$ dan $R_2=R_3=100\\ \\Omega$, sehingga kedua pembagi memberi 2.5 V. Saat suhu naik, RTD bertambah dan simpul bawah naik. Maka $V_{\\mathrm{top}}-V_{\\mathrm{bottom}}$ harus menjadi negatif, sesuai hasil hitung.\n\nPerhitungan ini mengabaikan arus yang ditarik alat baca dan pemanasan RTD oleh catu. Kedua pengaruh tersebut perlu diperiksa saat merancang rangkaian nyata."
        }
      ],
      "finalAnswer": "Tahanan RTD ialah 35 Ω. Besar tegangan keluaran 0.4167 V; dengan polaritas atas dikurangi bawah, keluarannya −0.4167 V.\n\n$$\n\\boxed{R(100^\\circ\\mathrm C)=35\\ \\Omega,\\qquad |V_o|=0.4167\\ \\mathrm V}\n$$",
      "takeaway": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi.",
      "sourceNotes": [
        "Bagian 1, halaman PDF 2-3, membedakan sensor dari pengondisi sinyal. RTD mengubah suhu menjadi tahanan; jembatan mengubah perubahan tahanan menjadi beda tegangan. Karena itu, hitung $R(T)$ lebih dahulu, lalu hitung kedua tegangan simpul sesuai gambar. Letak catu dan tanda keluaran menentukan persamaan jembatan."
      ]
    },
    {
      "id": "2025-uas-q4",
      "kind": "problem",
      "slug": "2025-uas-q4",
      "title": "Termokopel T dengan referensi 25 °C",
      "source": "UAS 2025 · Soal 4",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
        "file": "2025-uas.pdf",
        "pages": [
          2,
          4
        ],
        "original": "4. [10%] Thermocouple\nA table of Type T Thermocouple relative to a reference junction temperature of 0°C is presented in the Appendix. Use the table to calculate:\na. [5%] The percentage non-linearity at 200°C if the temperature range is 0 to 400°C.\nb. [5%] The temperature inside a vessel is an e.m.f of 11.5 mV is measured relative to a reference junction of 25°C.\nRelevant appendix entries (°C → mV): 0 → 0.000; 25 → 0.992; 200 → 9.288; 258 → 12.461; 259 → 12.518; 400 → 20.872.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              12,
              13,
              14,
              16
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              4,
              24,
              25,
              26
            ]
          }
        ]
      },
      "assumptions": [
        "Acuan ketaklinieran memakai garis dua ujung. Suhu sambungan ukur dianggap sama dengan suhu bejana. Nilai tegangan mengikuti tabel lampiran soal, tanpa mengganti pembulatannya."
      ],
      "exam": {
        "term": "UAS",
        "year": 2025,
        "number": 4
      },
      "difficulty": "menengah",
      "estimatedMinutes": 16,
      "tags": [
        "Sensor suhu"
      ],
      "statement": "Gunakan tabel termokopel tipe T dengan sambungan referensi $0^\\circ\\mathrm C$. (a) Hitung ketaklinieran pada $200^\\circ\\mathrm C$ untuk rentang $0$ hingga $400^\\circ\\mathrm C$. (b) Hitung suhu bejana jika tegangan terukur $11.5\\ \\mathrm{mV}$ terhadap referensi $25^\\circ\\mathrm C$.",
      "simulation": {
        "id": "2025-uas-q4-visual",
        "type": "ipe-thermocouple",
        "title": "Termokopel",
        "caption": "Tabel tipe T dan garis ideal menunjukkan ketaklinieran serta koreksi referensi.",
        "params": [
          {
            "key": "temperature",
            "label": "Suhu",
            "min": 0,
            "max": 400,
            "step": 1,
            "defaultValue": 258.544,
            "unit": "°C"
          },
          {
            "key": "referenceTemperature",
            "label": "Suhu referensi",
            "min": 0,
            "max": 400,
            "step": 1,
            "defaultValue": 25,
            "unit": "°C"
          }
        ],
        "data": {
          "type": "T",
          "measuredMv": 11.5,
          "Tref": 25,
          "T": 258.544,
          "rangeMax": 400,
          "testC": 200,
          "tableC": [
            0,
            25,
            200,
            258,
            259,
            400
          ],
          "tableMv": [
            0,
            0.992,
            9.288,
            12.461,
            12.518,
            20.872
          ],
          "visualKind": "thermocouple"
        }
      },
      "steps": [
        {
          "id": "2025-uas-q4-step-1",
          "title": "1. Gunakan tabel yang sesuai tipe dan suhu referensi",
          "content": "Kita harus memakai tabel yang sesuai dengan jenis logam termokopel. Soal ini memakai tipe T, sehingga kita mengambil semua tegangan dari tabel tipe T. Tabel memberi $E_T(T,0)$, yaitu tegangan terhadap sambungan referensi 0 °C. Tabel tipe J memakai pasangan logam berbeda dan tidak dapat menggantikannya.\n\nMulai dengan bagian ketaklinieran pada referensi 0 °C. Setelah itu, ubah pembacaan dengan referensi 25 °C ke bentuk tabel sebelum mencari suhu.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Acuan, polaritas, dan skala suhu harus cocok dengan model sensor.",
            "commonPitfall": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi."
          }
        },
        {
          "id": "2025-uas-q4-step-2",
          "title": "2. Hitung tegangan garis ideal pada 200 °C",
          "content": "Tabel memberi 0 mV pada 0 °C dan 20.872 mV pada 400 °C. Suhu 200 °C berada di tengah rentang. Garis lurus dua ujung memberi setengah tegangan skala penuh pada suhu ini.\n\nGaris dua ujung mempunyai kemiringan $20.872/400=0.05218\\ \\mathrm{mV/{}^\\circ C}$. Garis ini menyatakan alat linear hipotetis yang memiliki keluaran sama di kedua ujung rentang.\n\n$$\nE_{\\mathrm{lin}}(200)=20.872\\frac{200}{400}=10.436\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uas-q4-step-3",
          "title": "3. Bandingkan dengan tabel nyata",
          "content": "Tegangan nyata pada 200 °C ialah 9.288 mV. Simpangannya negatif karena keluaran tabel berada di bawah garis ideal. Untuk persen ketaklinieran, gunakan besar simpangannya.\n\nGunakan span keluaran 20.872 mV sebagai penyebut. Membagi dengan 9.288 mV akan mengubah pertanyaannya menjadi galat relatif terhadap pembacaan, bukan ketaklinieran sebagai persen skala penuh.\n\n$$\nN(200)=9.288-10.436=-1.148\\ \\mathrm{mV}\\\\\\%N=\\frac{1.148}{20.872}\\,100\\%=5.5002\\%\n$$"
        },
        {
          "id": "2025-uas-q4-step-4",
          "title": "4. Tentukan tanda koreksi referensi",
          "content": "Tegangan yang dibaca adalah selisih antara kontribusi sambungan ukur dan sambungan referensi. Kita mengembalikan acuan ke 0 °C dengan menambah kontribusi 25 °C yang pengukuran sudah kurangkan.\n\n$$\nE_T(T,25)=E_T(T,0)-E_T(25,0)\n$$"
        },
        {
          "id": "2025-uas-q4-step-5",
          "title": "5. Tambahkan tegangan referensi 25 °C",
          "content": "Tabel pada 25 °C memberi 0.992 mV. Tambahkan nilai ini ke tegangan 11.5 mV agar hasil setara dengan referensi nol.\n\nNilai 0.992 mV berasal dari tabel, bukan pendekatan sensitivitas konstan. Koreksi di ranah tegangan menjaga hubungan yang tepat meskipun kurva termokopel tidak linear.\n\n$$\nE_T(T,0)=E_T(T,25)+E_T(25,0)=11.500+0.992=12.492\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uas-q4-step-6",
          "title": "6. Tentukan interval suhu sebelum menghitung pecahannya",
          "content": "Tegangan memenuhi $12.461<12.492<12.518\\ \\mathrm{mV}$. Jadi, suhu harus berada antara 258 dan 259 °C. Selisih terhadap titik bawah adalah 0.031 mV dari rentang 0.057 mV, sehingga posisinya sedikit melewati setengah interval.\n\n$$\n\\lambda=\\frac{12.492-12.461}{12.518-12.461}=\\frac{0.031}{0.057}\\approx0.54386\n$$"
        },
        {
          "id": "2025-uas-q4-step-7",
          "title": "7. Interpolasi suhu",
          "content": "12.492 mV berada di antara 12.461 mV pada 258 °C dan 12.518 mV pada 259 °C. Selisihnya 0.031 mV dari titik bawah dalam interval 0.057 mV.\n\nSecara umum, $T=T_{\\mathrm{low}}+\\lambda(T_{\\mathrm{high}}-T_{\\mathrm{low}})$. Di sini lebar intervalnya 1 °C, sehingga angka 0.54386 langsung menjadi tambahan derajat terhadap 258 °C.\n\n$$\nT=258+\\frac{12.492-12.461}{12.518-12.461}=258.5439^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2025-uas-q4-step-8",
          "title": "8. Cek hasil sebelum membulatkan",
          "content": "Hasil 258.5439 °C berada dalam interval tabel yang dipilih. Angka 5.5002% menjawab ketaklinieran pada 200 °C. Hasil 258.5439 °C menjawab pembacaan dengan referensi 25 °C. Kedua hasil menjawab bagian berbeda dan tidak saling mengoreksi."
        }
      ],
      "finalAnswer": "Ketaklinieran pada 200 °C ialah 5.50% skala penuh. Setelah koreksi sambungan dingin, suhu bejana sekitar 258.54 °C.\n\n$$\n\\boxed{\\%N_{200}=5.50\\%\\ \\mathrm{FS},\\qquad T\\approx258.54^\\circ\\mathrm C}\n$$",
      "takeaway": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi.",
      "sourceNotes": [
        "Gunakan definisi ketaklinieran Bagian 1, halaman PDF 12-13: selisih terhadap garis dua ujung berbeda dari sensitivitas lokal $dE/dT$. Bagi besar simpangan pada $200^\\circ\\mathrm C$ dengan rentang tegangan tabel, bukan dengan suhu $200^\\circ\\mathrm C$. Untuk bagian (b), gangguan suhu referensi di halaman PDF 14 menjelaskan mengapa Anda perlu menambah tegangan acuan sebelum mencari suhu."
      ]
    },
    {
      "id": "2024-uts1-q1",
      "kind": "problem",
      "slug": "2024-uts1-q1",
      "title": "Hambatan termistor dari dua titik kalibrasi",
      "source": "UTS 1 2024 · Soal 1",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
        "file": "2024-uts1.pdf",
        "pages": [
          1
        ],
        "original": "1. [5%] The resistance \\(R(\\theta)\\) of a thermistor at temperature \\(\\theta\\) K is given by \\(R(\\theta)=\\alpha e^{(\\beta/\\theta)}\\). Given that the resistance at the ice point \\((\\theta=273.15\\ \\mathrm K)\\) is 9.00 kΩ and the resistance at the steam point \\((\\theta=373.15\\ \\mathrm K)\\) is 0.50 kΩ, find the resistance at 25°C.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              12,
              13
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              2,
              4,
              19,
              20
            ]
          }
        ]
      },
      "assumptions": [
        "Model eksponensial yang diberikan dianggap berlaku di antara kedua titik kalibrasi. Pemanasan sendiri akibat arus ukur diabaikan."
      ],
      "exam": {
        "term": "UTS 1",
        "year": 2024,
        "number": 1
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Sensor suhu"
      ],
      "statement": "Hambatan termistor mengikuti $R(\\theta)=\\alpha e^{\\beta/\\theta}$, dengan $\\theta$ dalam kelvin. Diketahui $R(273{,}15\\ \\mathrm K)=9{,}00\\ \\mathrm{k\\Omega}$ dan $R(373{,}15\\ \\mathrm K)=0{,}50\\ \\mathrm{k\\Omega}$. Tentukan hambatan pada 25°C.",
      "simulation": {
        "id": "2024-uts1-q1-visual",
        "type": "ipe-thermistor",
        "title": "Termistor",
        "caption": "Dua titik kalibrasi menentukan kurva eksponensial; suhu kontrol memakai °C, sedangkan model memakai kelvin.",
        "params": [
          {
            "key": "temperature",
            "label": "Suhu",
            "min": 0,
            "max": 100,
            "step": 1,
            "defaultValue": 25,
            "unit": "°C"
          }
        ],
        "data": {
          "T1": 273.15,
          "R1": 9000,
          "T2": 373.15,
          "R2": 500,
          "T": 25,
          "visualKind": "thermistor"
        }
      },
      "steps": [
        {
          "id": "2024-uts1-q1-step-1",
          "title": "Kenali model dan suhu yang akan dimasukkan",
          "content": "Hambatan turun dari 9,00 kΩ ke 0,50 kΩ ketika suhu naik. Penurunan hambatan sesuai perilaku **termistor NTC** (sensor yang hambatannya turun saat suhu naik). Namun, kita tidak memakai interpolasi garis lurus karena soal sudah memberi model eksponensial.\n\nModel memakai suhu mutlak $\\theta$ dalam kelvin. Suhu berada di penyebut, sehingga titik nol skala memengaruhi hasil. Ubah 25°C menjadi $25+273{,}15=298{,}15$ K sebelum menghitung.\n\n$$\n\\theta_1=273.15\\ \\mathrm K,\\quad\\theta_2=373.15\\ \\mathrm K,\\quad\\theta=298.15\\ \\mathrm K\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Acuan, polaritas, dan skala suhu harus cocok dengan model sensor.",
            "commonPitfall": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi."
          },
          "checkpoint": {
            "prompt": "Sebuah termistor dikalibrasi dengan model $R=\\alpha e^{\\beta/\\theta}$, dengan $\\theta$ dalam kelvin. Seorang siswa memasukkan angka suhu Celsius ke model yang sama tanpa mengubah konstanta. Penilaian mana yang tepat?",
            "options": [
              {
                "id": "2024-uts1-q1-checkpoint-option-1",
                "label": "Hasil tetap sama karena selisih satu kelvin sama dengan selisih satu derajat Celsius.",
                "feedback": "Kesamaan selisih suhu tidak membuat $1/\\theta$ sama. Di sini $\\theta$ berada di penyebut, bukan hanya sebagai selisih suhu.",
                "misconceptionTag": "concept-2024-02-choice-1"
              },
              {
                "id": "2024-uts1-q1-checkpoint-option-2",
                "label": "Langkah itu benar jika hambatan ditulis dalam kilo-ohm.",
                "feedback": "Satuan hambatan memengaruhi skala $\\alpha$, bukan titik nol skala suhu. Mengganti Ω menjadi kΩ tidak memperbaiki suhu yang salah.",
                "misconceptionTag": "concept-2024-02-choice-2"
              },
              {
                "id": "2024-uts1-q1-checkpoint-option-3",
                "label": "Langkah itu salah karena model memakai kebalikan suhu mutlak; pergantian titik nol mengubah nilai $\\beta/\\theta$.",
                "feedback": "Benar. Konversikan suhu ke kelvin sebelum memakai model dan konstanta kalibrasinya."
              },
              {
                "id": "2024-uts1-q1-checkpoint-option-4",
                "label": "Langkah itu hanya salah pada suhu di bawah 0°C; pada suhu positif kedua skala dapat ditukar.",
                "feedback": "Nilai Celsius dan kelvin tetap berbeda pada suhu positif. Masalahnya adalah penggunaan skala yang tidak sesuai dengan model.",
                "misconceptionTag": "concept-2024-02-choice-4"
              }
            ],
            "correctOptionId": "2024-uts1-q1-checkpoint-option-3"
          }
        },
        {
          "id": "2024-uts1-q1-step-2",
          "title": "Tuliskan model pada dua titik yang diketahui",
          "content": "Konstanta $\\alpha$ dan $\\beta$ belum diketahui. Dua data kalibrasi memberi dua persamaan. Kita boleh mempertahankan hambatan dalam kΩ selama semua hambatan dan $\\alpha$ memakai satuan yang sama.\n\nTujuan langkah berikutnya adalah menghilangkan $\\alpha$, sehingga satu persamaan hanya menyisakan $\\beta$.\n\n$$\n9.00=\\alpha e^{\\beta/273.15},\\qquad0.50=\\alpha e^{\\beta/373.15}\\quad[R,\\alpha\\text{ in k}\\Omega]\n$$"
        },
        {
          "id": "2024-uts1-q1-step-3",
          "title": "Bagi kedua persamaan untuk menghapus α",
          "content": "Bagi persamaan pertama dengan kedua. Faktor $\\alpha$ saling menghapus. Untuk eksponen, $e^a/e^b=e^{a-b}$, sehingga selisih kebalikan suhu muncul.\n\nPerbandingan hambatan $9/0{,}5=18$ tidak bersatuan. Kita lalu memakai logaritma natural untuk membuka eksponennya.\n\n$$\n\\frac{9.00}{0.50}=e^{\\beta(1/273.15-1/373.15)}\\quad\\Longrightarrow\\quad\\ln18=\\beta\\left(\\frac1{273.15}-\\frac1{373.15}\\right)\n$$"
        },
        {
          "id": "2024-uts1-q1-step-4",
          "title": "Hitung β dan pahami satuannya",
          "content": "Bagi kedua ruas dengan selisih kebalikan suhu. Pembilang $\\ln18$ tidak bersatuan, sedangkan penyebut bersatuan $\\mathrm K^{-1}$. Jadi $\\beta$ bersatuan kelvin.\n\nNilai $\\beta$ positif membuat $\\beta/\\theta$ mengecil ketika suhu naik, sehingga hambatan turun. Tanda hasil cocok dengan data.\n\n$$\n\\beta=\\frac{\\ln18}{1/273.15-1/373.15}=\\frac{2.89037176}{1/273.15-1/373.15}=2946.0381\\ \\mathrm K\n$$"
        },
        {
          "id": "2024-uts1-q1-step-5",
          "title": "Gunakan salah satu titik sebagai acuan hambatan",
          "content": "Kita bisa mencari $\\alpha$, tetapi untuk satu suhu baru lebih ringkas membagi $R(\\theta)$ dengan $R(\\theta_1)$. Konstanta $\\alpha$ kembali menghapus.\n\nBentuk berikut memakai langsung hambatan 9,00 kΩ pada titik es. Ia tetap merupakan model eksponensial yang sama, bukan model baru.\n\n$$\nR(\\theta)=R(\\theta_1)\\exp\\!\\left[\\beta\\left(\\frac1\\theta-\\frac1{\\theta_1}\\right)\\right]\n$$"
        },
        {
          "id": "2024-uts1-q1-step-6",
          "title": "Masukkan suhu 25°C dalam kelvin",
          "content": "Ganti $\\theta$ dengan 298,15 K dan $\\beta$ dengan hasil kalibrasi. Nilai 298,15 lebih besar daripada 273,15. Selisih kebalikannya negatif, sehingga faktor eksponensial harus kurang dari satu.\n\nHasilnya sekitar 3,6432 kΩ, atau 3643,2 Ω. Jika $\\alpha$ ikut dihitung, nilainya sekitar 0,000186292 kΩ; $\\alpha$ bukan hambatan pada 0°C.\n\n$$\nR(298.15)=9.00\\exp\\!\\left[2946.0381\\left(\\frac1{298.15}-\\frac1{273.15}\\right)\\right]=3.643200\\ \\mathrm{k\\Omega}\n$$"
        },
        {
          "id": "2024-uts1-q1-step-7",
          "title": "Periksa hasil terhadap kedua titik kalibrasi",
          "content": "Suhu 25°C berada di antara 0 dan 100°C. Hambatan 3,6432 kΩ juga berada di antara 9,00 dan 0,50 kΩ serta turun ketika suhu naik. Kedua cek ini sesuai sifat NTC.\n\nNilainya tidak perlu berada pada garis lurus antara data. Bentuk eksponensial memang memberi perubahan hambatan per derajat yang berbeda pada suhu berbeda."
        }
      ],
      "finalAnswer": "Hambatan pada 25°C sekitar 3,643 kΩ. Kalibrasi model memberi β ≈ 2946,04 K.\n\n$$\n\\boxed{R(25^\\circ\\mathrm C)\\approx3.6432\\ \\mathrm{k\\Omega}}\n$$",
      "takeaway": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi.",
      "sourceNotes": [
        "Bagian 3, halaman PDF 19-20, memberi model termistor eksponensial. Bagian 1, halaman PDF 12-13, mengingatkan bahwa sensor yang tidak linear tidak memiliki satu sensitivitas tetap. Untuk model soal ini, $\\ln R=\\ln\\alpha+\\beta/\\theta$ membentuk garis terhadap $1/\\theta$, bukan terhadap $\\theta$. Gunakan dua suhu acuan dalam kelvin; hasil kalibrasi berlaku dalam batas model yang diberikan."
      ]
    },
    {
      "id": "2024-uts2-q1",
      "kind": "problem",
      "slug": "2024-uts2-q1",
      "title": "Memilih sensor dan mencari suhu referensi",
      "source": "UTS 2 2024 · Soal 1",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3/view",
        "file": "2024-uts2.pdf",
        "pages": [
          1,
          4
        ],
        "original": "1. Temperature Sensors: RTD, Thermistor, Thermocouple\n(a) [5%] What are the differences between an RTD (Resistance Temperature Detector) and a thermistor, in terms of their characteristics and measurement ranges?\n(b) [5%] If you need to measure the temperature of approximately 1000°C, which sensor would you choose among an RTD, a thermistor, and a thermocouple? Explain why you choose this sensor.\n(c) [10%] A type J thermocouple is used to measure temperature \\(T_1\\), with the reference temperature \\(T_2\\), as shown in the figure below. The voltage output is measured using a voltmeter. If the measured temperature \\(T_1\\) is 450°C and the voltage recorded by the voltmeter is 15 mV, determine the reference temperature \\(T_2\\). Use the table provided on the last page to answer this question.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              11,
              14
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              2,
              3,
              4,
              5,
              6,
              25,
              26
            ]
          }
        ]
      },
      "exam": {
        "term": "UTS 2",
        "year": 2024,
        "number": 1
      },
      "difficulty": "menengah",
      "estimatedMinutes": 16,
      "tags": [
        "Sensor suhu"
      ],
      "statement": "(a) Bandingkan sifat dan rentang ukur RTD dengan termistor. (b) Pilih sensor untuk suhu sekitar 1000°C dari RTD, termistor, atau termokopel. Jelaskan alasan pilihan Anda. (c) Termokopel tipe J memiliki suhu ukur $T_1=450^\\circ\\mathrm C$ dan suhu referensi $T_2$. Voltmeter membaca 15 mV. Cari $T_2$ memakai tabel tipe J dengan sambungan referensi 0°C pada halaman 4.",
      "simulation": {
        "id": "2024-uts2-q1-visual",
        "type": "ipe-thermocouple",
        "title": "Termokopel",
        "caption": "Tegangan ukur adalah selisih tegangan tabel sambungan ukur dan referensi.",
        "params": [
          {
            "key": "temperature",
            "label": "Suhu",
            "min": 0,
            "max": 500,
            "step": 1,
            "defaultValue": 450,
            "unit": "°C"
          },
          {
            "key": "referenceTemperature",
            "label": "Suhu referensi",
            "min": 0,
            "max": 500,
            "step": 1,
            "defaultValue": 178.93,
            "unit": "°C"
          }
        ],
        "data": {
          "type": "J",
          "measured": 15,
          "T": 450,
          "Tref": 178.93,
          "visualKind": "thermocouple"
        }
      },
      "steps": [
        {
          "id": "2024-uts2-q1-step-1",
          "title": "a · Apa yang berubah ketika suhu naik?",
          "content": "**RTD** (sensor suhu dari hambatan logam) dan **termistor** (sensor suhu dari hambatan bahan semikonduktor) mengubah suhu menjadi perubahan hambatan. Rangkaian mengalirkan arus ukur, lalu membaca tegangan atau hambatannya. Kita bandingkan hubungan suhu dan hambatan untuk memilih sensor yang sesuai.\n\nRTD memakai logam, misalnya platina. Dalam rentang kerjanya, kenaikan suhu biasanya menaikkan hambatan secara hampir linear. “Hampir linear” berarti kemiringan kurvanya cukup tetap, bukan tepat sama pada semua suhu.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Acuan, polaritas, dan skala suhu harus cocok dengan model sensor.",
            "commonPitfall": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi."
          },
          "checkpoint": {
            "prompt": "Sambungan ukur termokopel tipe J berada pada suhu tetap. Sambungan referensinya menghangat, tetapi perangkat tetap memakai kompensasi referensi lama. Dalam rentang tabel yang tegangannya naik terhadap suhu, apa yang paling mungkin terjadi?",
            "options": [
              {
                "id": "2024-uts2-q1-checkpoint-option-1",
                "label": "Tegangan turun dan perangkat dapat menafsirkan suhu ukur terlalu rendah.",
                "feedback": "Benar. Tegangan referensi naik dan mengurangi selisih terukur; kompensasi harus mengikuti suhu referensi baru."
              },
              {
                "id": "2024-uts2-q1-checkpoint-option-2",
                "label": "Tegangan naik karena kedua sambungan menambah tegangan dengan tanda sama.",
                "feedback": "Kedua kontribusi dikurangkan menurut polaritas rangkaian, bukan dijumlahkan dengan tanda sama.",
                "misconceptionTag": "concept-2024-01-choice-2"
              },
              {
                "id": "2024-uts2-q1-checkpoint-option-3",
                "label": "Tegangan tetap karena hanya suhu sambungan ukur yang memengaruhinya.",
                "feedback": "Tegangan bergantung pada suhu ukur dan suhu referensi. Mengabaikan referensi mengubah arti pembacaan.",
                "misconceptionTag": "concept-2024-01-choice-3"
              },
              {
                "id": "2024-uts2-q1-checkpoint-option-4",
                "label": "Tegangan turun, sehingga suhu benda pasti turun dengan besar yang sama.",
                "feedback": "Soal menetapkan suhu benda tetap. Perubahan sambungan referensi dapat mengubah pembacaan tanpa perubahan suhu benda.",
                "misconceptionTag": "concept-2024-01-choice-4"
              }
            ],
            "correctOptionId": "2024-uts2-q1-checkpoint-option-1"
          },
          "simulation": {
            "id": "2024-uts2-q1-step-1-visual",
            "type": "ipe-rtd",
            "title": "Sensor suhu resistif",
            "caption": "Bandingkan kenaikan hambatan RTD dengan penurunan hambatan NTC.",
            "params": [
              {
                "key": "temperature",
                "label": "Suhu",
                "min": 0,
                "max": 100,
                "step": 1,
                "defaultValue": 25,
                "unit": "°C"
              }
            ],
            "data": {
              "mode": "compare",
              "visualKind": "rtd"
            }
          }
        },
        {
          "id": "2024-uts2-q1-step-2",
          "title": "a · Kenali kepekaan dan batas termistor",
          "content": "Termistor pada materi berjenis **NTC** (hambatan turun saat suhu naik). Perubahan hambatannya dapat lebih besar per derajat daripada RTD, sehingga peka untuk perubahan suhu kecil. Namun, kemiringannya berubah terhadap suhu; satu faktor konversi linear belum tentu cukup.\n\nKeduanya memerlukan arus ukur. Arus itu menghasilkan panas pada sensor. Jika panas ukur terlalu besar, suhu sensor naik dari suhu benda dan menambah galat; kita perlu membatasi arus."
        },
        {
          "id": "2024-uts2-q1-step-3",
          "title": "a dan b · Gunakan rentang kerja untuk memilih sensor",
          "content": "Materi memberi contoh RTD sekitar −196 sampai 482°C dan termistor sekitar −45 sampai 150°C. Angka ini berlaku untuk contoh pada materi; lembar data produk menentukan batas sensor yang benar-benar dipakai.\n\nSuhu sekitar 1000°C berada di atas kedua rentang contoh itu. Pilih jenis dan selubung termokopel yang sesuai. Contohnya, rakitan tipe K atau N dengan batas kerja di atas 1000°C. Tipe J pada bagian (c) adalah kasus lain. Penggunaan tipe J di sana belum menjamin bahwa semua termokopel cocok untuk 1000°C.\n\n**Termokopel** (sensor dengan dua logam berbeda) menghasilkan tegangan yang terkait dengan suhu kedua sambungannya. Pilihan jenis dan selubung menentukan apakah sensor tahan pada suhu yang akan diukur."
        },
        {
          "id": "2024-uts2-q1-step-4",
          "title": "c · Bedakan suhu ukur dan suhu referensi",
          "content": "Di sini $T_1=450^\\circ\\mathrm C$ adalah suhu sambungan ukur, sedangkan $T_2$ adalah suhu sambungan referensi yang dicari. Tabel halaman 4 memberi $E(T,0)$: tegangan untuk suhu $T$ ketika referensinya 0°C.\n\nVoltmeter membaca selisih kontribusi kedua sambungan. Referensinya belum tentu 0°C. Mencari 15 mV langsung di tabel akan menjawab kasus dengan referensi 0°C.\n\n$$\nE(T_1,T_2)=E(T_1,0)-E(T_2,0)\n$$"
        },
        {
          "id": "2024-uts2-q1-step-5",
          "title": "c · Isolasi tegangan tabel yang belum diketahui",
          "content": "Kita mencari $E(T_2,0)$, bukan $E(T_1,0)$. Tambahkan $E(T_2,0)$ ke kedua ruas, lalu kurangi tegangan terukur dari kedua ruas. Langkah ini menjelaskan mengapa 15 mV dikurangkan.\n\n$$\n\\begin{aligned}15&=E(450,0)-E(T_2,0)\\\\15+E(T_2,0)&=E(450,0)\\\\E(T_2,0)&=E(450,0)-15\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q1-step-6",
          "title": "c · Ambil angka dari tabel tipe J",
          "content": "Pada baris 450°C dan kolom 0, tabel memberi 24,610 mV. Maka tegangan tabel yang mewakili sambungan referensi adalah 9,610 mV. Semua angka pada operasi ini memakai mV.\n\nCari dua nilai yang mengapitnya: 9,559 mV pada 178°C dan 9,614 mV pada 179°C. Suhu yang dicari harus berada di antara kedua suhu tersebut.\n\n$$\nE(T_2,0)=24.610-15.000=9.610\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2024-uts2-q1-step-7",
          "title": "c · Interpolasi dalam selang satu derajat",
          "content": "Dari batas bawah, kenaikan tegangannya $9{,}610-9{,}559=0{,}051$ mV. Lebar selang tabel adalah $9{,}614-9{,}559=0{,}055$ mV. Jadi kita bergerak sekitar 0,927 bagian dari selang 178 sampai 179°C.\n\nInterpolasi ini menganggap kurva hampir lurus hanya pada selang kecil tersebut. Kita tidak menganggap seluruh rentang termokopel linear.\n\n$$\nT_2=178+\\frac{0.051}{0.055}(179-178)=178.9273^\\circ\\mathrm C\\approx178.93^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uts2-q1-step-8",
          "title": "Periksa kembali dengan tegangan ukur",
          "content": "Hasilnya lebih tinggi daripada 0°C tetapi masih lebih rendah daripada 450°C. Referensi yang lebih hangat mengurangi tegangan terukur; ini sesuai dengan 15 mV yang lebih kecil daripada 24,610 mV.\n\nMasukkan kembali tegangan referensi: selisihnya tepat 15 mV. Kita dapat melaporkan sekitar 179°C sesuai ketelitian tabel.\n\n$$\n24.610-9.610=15.000\\ \\mathrm{mV}\n$$"
        }
      ],
      "finalAnswer": "Pilih termokopel yang sesuai untuk 1000°C. Untuk sambungan tipe J pada bagian (c), suhu referensinya sekitar 179°C.\n\n$$\n\\boxed{T_2\\approx179^\\circ\\mathrm C}\n$$",
      "takeaway": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi.",
      "sourceNotes": [
        "Bagian 1, halaman PDF 11, memisahkan rentang input dari rentang keluaran. Pilih sensor yang mencakup suhu proses, lalu periksa syarat pemasangan dan pembacaan pada tabel Bagian 3. Untuk mencari suhu referensi, pakai $E(T_2,0)=E(T_1,0)-E_{\\mathrm{ukur}}$ dengan tipe dan polaritas yang sama; tabel beracuan nol tidak berarti sambungan nyata berada pada nol."
      ]
    },
    {
      "id": "2024-uas-q2",
      "kind": "problem",
      "slug": "2024-uas-q2",
      "title": "RTD pada jembatan Wheatstone",
      "source": "UAS 2024 · Soal 2",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
        "file": "2024-uas.pdf",
        "pages": [
          1
        ],
        "original": "2. [15%] Temperature Sensor (RTD) and Signal Conditioning (Wheatstone Bridge)\nAn RTD serves as one arm (\\(R_4\\)) of a Wheatstone bridge, as shown in figure below. The RTD is used to measure a constant temperature, with the bridge operating in deflection mode. The RTD has a resistance of 25 Ω at a temperature of 0°C, and a thermal coefficient of resistance, \\(\\alpha=0.003925\\ {}^\\circ\\mathrm C^{-1}\\). If the RTD is subjected to a temperature of 100°C and the input voltage to the bridge is 5 V, calculate the output voltage of the bridge.\nFigure labels: \\(R_2=R_3=100\\ \\Omega\\); \\(R_1=25\\ \\Omega\\) at 0°C and balanced bridge conditions. Supply is between the left and right nodes; the detector is between the upper and lower nodes.\nThe resistance of the RTD as a function of temperature is given by \\(R(T)=R_0(1+\\alpha T)\\).",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              2,
              3,
              12
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              2,
              3,
              19
            ]
          }
        ]
      },
      "assumptions": [
        "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        "Voltmeter ideal tidak menarik arus; hambatan kabel dan pemanasan sendiri RTD diabaikan. Polaritas keluaran dinyatakan dalam pembahasan."
      ],
      "exam": {
        "term": "UAS",
        "year": 2024,
        "number": 2
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Sensor suhu"
      ],
      "statement": "RTD menjadi lengan $R_4$ pada jembatan Wheatstone. Diketahui $R_0=25\\ \\Omega$ pada 0°C, $\\alpha=0{,}003925\\ {}^\\circ\\mathrm C^{-1}$, suhu 100°C, dan catu 5 V. Pada gambar, dua lengan atas bernilai 100 Ω; lengan kiri bawah 25 Ω; lengan kanan bawah adalah RTD. Catu terhubung ke simpul kiri dan kanan. Keluaran diukur antara simpul atas dan bawah. Hitung tegangan keluaran memakai $R(T)=R_0(1+\\alpha T)$.",
      "simulation": {
        "id": "2024-uas-q2-visual",
        "type": "ipe-bridge",
        "title": "Jembatan ukur",
        "caption": "Ikuti catu kiri dan kanan: keluaran membandingkan simpul atas dan bawah.",
        "params": [
          {
            "key": "temperature",
            "label": "Suhu",
            "min": 0,
            "max": 200,
            "step": 1,
            "defaultValue": 100,
            "unit": "°C"
          },
          {
            "key": "voltage",
            "label": "Tegangan catu",
            "min": 0,
            "max": 10,
            "step": 0.1,
            "defaultValue": 5,
            "unit": "V"
          }
        ],
        "data": {
          "mode": "rtd-horizontal",
          "R1": 25,
          "R2": 100,
          "R3": 100,
          "R0": 25,
          "alpha": 0.003925,
          "T": 100,
          "V": 5,
          "visualKind": "bridge"
        }
      },
      "steps": [
        {
          "id": "2024-uas-q2-step-1",
          "title": "Tentukan dua perubahan yang saling terhubung",
          "content": "Suhu tidak masuk langsung ke rumus tegangan jembatan. Suhu mengubah hambatan RTD lebih dulu, lalu perubahan hambatan mengubah pembagian tegangan pada jembatan.\n\nJembatan bekerja dalam **mode defleksi** (membaca tegangan saat jembatan tidak seimbang). Kita membaca perubahan tegangan akibat perubahan hambatan. Kita tidak mengatur ulang resistor agar keluaran kembali nol.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Acuan, polaritas, dan skala suhu harus cocok dengan model sensor.",
            "commonPitfall": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi."
          },
          "checkpoint": {
            "prompt": "Jembatan RTD pada gambar diberi catu di simpul kiri dan kanan, sementara voltmeter menghubungkan simpul atas dan bawah. Sebelum menghitung keluaran, tindakan mana yang paling tepat?",
            "options": [
              {
                "id": "2024-uas-q2-checkpoint-option-1",
                "label": "Telusuri dua jalur dari simpul catu tinggi ke rendah, hitung kedua titik tengah, lalu tetapkan polaritas selisihnya.",
                "feedback": "Benar. Cara ini mempertahankan sambungan asli dan menunjukkan asal pembilang serta penyebut pembagi tegangan."
              },
              {
                "id": "2024-uas-q2-checkpoint-option-2",
                "label": "Gunakan rumus hafalan untuk catu atas dan bawah tanpa mengubah pasangan resistor.",
                "feedback": "Rumus umum hanya benar jika pemetaan resistor dan simpul sesuai. Mengabaikan catu yang berbeda dapat memasangkan lengan yang salah.",
                "misconceptionTag": "concept-2024-07-choice-2"
              },
              {
                "id": "2024-uas-q2-checkpoint-option-3",
                "label": "Gabungkan semua resistor sebagai satu rangkaian seri agar arusnya sama.",
                "feedback": "Ada dua jalur paralel antara simpul catu, sehingga seluruh resistor tidak membawa satu arus seri yang sama.",
                "misconceptionTag": "concept-2024-07-choice-3"
              },
              {
                "id": "2024-uas-q2-checkpoint-option-4",
                "label": "Anggap voltmeter selalu membaca nol karena rangkaian berbentuk jembatan.",
                "feedback": "Bentuk jembatan tidak menjamin seimbang. Perubahan RTD justru membuat beda potensial untuk dibaca pada deflection mode.",
                "misconceptionTag": "concept-2024-07-choice-4"
              }
            ],
            "correctOptionId": "2024-uas-q2-checkpoint-option-1"
          }
        },
        {
          "id": "2024-uas-q2-step-2",
          "title": "Hitung perubahan relatif hambatan",
          "content": "Data $R_0=25\\ \\Omega$ merujuk suhu 0°C. Koefisien $\\alpha=0{,}003925\\ {}^\\circ\\mathrm C^{-1}$ menyatakan perubahan relatif hambatan per derajat. Kenaikan suhu 100°C memberi $\\alpha T=0{,}3925$, atau 39,25%.\n\nKalikan kenaikan relatif itu dengan 25 Ω untuk memperoleh kenaikan 9,8125 Ω. Tambahkan pada hambatan awal.\n\n$$\nR_4=R_0(1+\\alpha T)=25(1+0.3925)=25+9.8125=34.8125\\ \\Omega\n$$"
        },
        {
          "id": "2024-uas-q2-step-3",
          "title": "Ikuti jalur catu pada gambar",
          "content": "Catu pada gambar terhubung kiri dan kanan. Tetapkan simpul kiri $+5$ V dan kanan 0 V. Jalur atas melewati $R_2$ lalu $R_3$; jalur bawah melewati $R_1$ lalu RTD $R_4$.\n\nSebut titik tengah atas A dan bawah B. Voltmeter ideal tidak mengambil arus, sehingga kedua jalur tetap berupa dua pembagi tegangan. Memasangkan resistor menurut posisi gambar tanpa mengikuti catu dapat memberi rumus yang salah."
        },
        {
          "id": "2024-uas-q2-step-4",
          "title": "Turunkan pembagi tegangan dari hukum Ohm",
          "content": "Untuk dua resistor seri, arusnya sama: $I=V_s/(R_L+R_R)$. Tegangan titik tengah terhadap simpul kanan nol sama dengan jatuh tegangan pada resistor kanan, yaitu $IR_R$.\n\nItulah asal pembilang resistor kanan pada rumus pembagi. Untuk jalur atas, resistor kanan adalah $R_3=100\\ \\Omega$.\n\n$$\nV_{\\mathrm{mid}}=V_s\\frac{R_R}{R_L+R_R},\\qquad V_A=5\\frac{100}{100+100}=2.500\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uas-q2-step-5",
          "title": "Hitung titik tengah bawah dengan hambatan baru",
          "content": "Pada jalur bawah, resistor kanan adalah RTD. Masukkan $R_1=25\\ \\Omega$ dan $R_4=34{,}8125\\ \\Omega$. Penyebut memakai jumlah kedua hambatan dalam jalur itu.\n\nTegangan B menjadi lebih besar dari 2,5 V karena RTD mengambil bagian tegangan yang lebih besar. Kita memakai rumus lengkap; kenaikan 39,25% tidak cukup kecil untuk mengandalkan pendekatan perubahan kecil.\n\n$$\nV_B=5\\frac{34.8125}{25+34.8125}=5\\frac{34.8125}{59.8125}=2.910136\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uas-q2-step-6",
          "title": "Tentukan polaritas keluaran sebelum mengurangkan",
          "content": "Kita definisikan $V_o=V_B-V_A$, yaitu bawah dikurangi atas. Dengan definisi ini, hasil positif berarti simpul B berada pada potensial lebih tinggi.\n\nJika Anda membalik kabel voltmeter, hasil menjadi negatif dengan besar yang sama. Soal tidak memberi tanda polaritas keluaran. Besar tegangan 0,41014 V tetap berlaku untuk kedua arah pemasangan kabel.\n\n$$\nV_o=2.910136-2.500=+0.410136\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uas-q2-step-7",
          "title": "Periksa keadaan seimbang pada suhu awal",
          "content": "Pada 0°C, RTD kembali menjadi 25 Ω. Kedua jalur memiliki pembagian sama besar: jalur atas 100/100 dan jalur bawah 25/25. Meskipun nilai hambatannya berbeda, kedua titik tengah sama-sama 2,5 V.\n\nKeluaran lalu nol, sesuai keterangan jembatan seimbang pada soal. Cek ini menguji sambungan yang kita pilih, bukan hanya hasil perkalian.\n\n$$\nV_o(0^\\circ\\mathrm C)=5\\frac{25}{25+25}-5\\frac{100}{100+100}=0\n$$"
        }
      ],
      "finalAnswer": "RTD menjadi 34,8125 Ω. Besar tegangan keluaran jembatan adalah sekitar 0,410 V; tanda mengikuti polaritas voltmeter.\n\n$$\n\\boxed{R_4=34.8125\\ \\Omega,\\qquad|V_o|\\approx0.41014\\ \\mathrm V}\n$$",
      "takeaway": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi.",
      "sourceNotes": [
        "Baca RTD dan jembatan sebagai dua tahap berbeda, sesuai Bagian 1, halaman PDF 2-3. Hubungan tahanan-suhu boleh linear pada rentang pendekatan, tetapi hubungan tegangan jembatan terhadap tahanan berbentuk pembagi tegangan. Karena itu, jangan mengganti hitungan simpul dengan rumus jembatan kecil-sinyal tanpa memeriksa batas perubahan tahanannya."
      ]
    },
    {
      "id": "2023-uts2-q2",
      "kind": "problem",
      "slug": "2023-uts2-q2",
      "title": "Termokopel dan respons RTD",
      "source": "UTS 2 2023 · Soal 2",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7/view",
        "file": "2023-uts2.pdf",
        "pages": [
          1,
          4
        ],
        "original": "2. Temperature Sensors: Thermocouple & RTD\na. [10%] A type K thermocouple is used to measure the machine temperature of T = 340 °C. The reference temperatur for the thermocouple is Tref = 100 °C. Calculate the output voltage of the thermocouple during the measurement. You may see the table given in the attachment to this document.\nb. [10%] An RTD can be modeled as a first order system with a time constant 0.5 seconds and a sensitivity 0.004 Ω/°C. There are no biases in the system. Initially the RTD is at steady 20 °C with its resistance 100 Ω. The temperature suddenly changes at t = 1 second to 100 °C.\ni. Find the differential equation model of the RTD that relates changes temperature input to resistance output.\nii. What will be the RTD's resistance at t = 2 seconds?\nAttached type K table, reference junction 0 °C: E(100 °C)=4.096 mV; E(340 °C)=13.874 mV.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view",
            "title": "Pengukuran Teknik, Bagian 2 (2022)",
            "pages": [
              6,
              7
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              2,
              3,
              4,
              24,
              25
            ]
          }
        ]
      },
      "assumptions": [
        "Pernyataan tanpa bias ditafsirkan untuk variabel perubahan. Model mutlak tanpa offset tidak dapat memenuhi nilai awal dan sensitivitas yang sama."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2023,
        "number": 2
      },
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "tags": [
        "Sensor suhu"
      ],
      "statement": "(a) Termokopel K mengukur suhu 340 °C dengan sambungan referensi 100 °C. Hitung tegangan keluaran memakai tabel yang beracuan 0 °C: $E_K(340,0)=13.874\\,\\mathrm{mV}$ dan $E_K(100,0)=4.096\\,\\mathrm{mV}$.\n(b) RTD orde satu memiliki $\\tau=0.5\\,\\mathrm{s}$ dan sensitivitas $0.004\\,\\Omega/{}^\\circ\\mathrm C$. Soal menyatakan tidak ada bias. Awalnya $T=20\\,{}^\\circ\\mathrm C$, $R=100\\,\\Omega$, dan keadaan tunak. Pada $t=1\\,\\mathrm{s}$, suhu berubah menjadi 100 °C. (i) Susun persamaan diferensial perubahan suhu ke tahanan. (ii) Hitung $R(2\\,\\mathrm{s})$.",
      "simulation": {
        "id": "2023-uts2-q2-visual",
        "type": "ipe-thermocouple",
        "title": "Termokopel",
        "caption": "Dua suhu sambungan menentukan tegangan yang terbaca.",
        "params": [
          {
            "key": "temperature",
            "label": "Suhu",
            "min": 0,
            "max": 500,
            "step": 1,
            "defaultValue": 340,
            "unit": "°C"
          },
          {
            "key": "referenceTemperature",
            "label": "Suhu referensi",
            "min": 0,
            "max": 500,
            "step": 1,
            "defaultValue": 100,
            "unit": "°C"
          }
        ],
        "data": {
          "type": "K",
          "hotEmf": 13.874,
          "coldEmf": 4.096,
          "T": 340,
          "Tref": 100,
          "visualKind": "thermocouple"
        }
      },
      "steps": [
        {
          "id": "2023-uts2-q2-step-1",
          "title": "2a · Baca arti angka pada tabel termokopel",
          "content": "Dua sambungan logam berbeda dapat menghasilkan tegangan saat suhunya berbeda. **Termokopel** (sensor suhu yang membaca tegangan tersebut) memakai prinsip ini. Satu suhu saja belum cukup untuk menentukan tegangan keluaran.\n\nNotasi $E_K(T,0)$ berarti tegangan tipe K saat sambungan ukur berada pada $T$ dan sambungan referensi pada 0°C. Soal memakai referensi 100°C, sehingga angka tabel 340°C belum menjadi jawaban akhir.\n\n$$\nE_K(340,0)=13.874\\ \\mathrm{mV},\\qquad E_K(100,0)=4.096\\ \\mathrm{mV}\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Acuan, polaritas, dan skala suhu harus cocok dengan model sensor.",
            "commonPitfall": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi."
          },
          "checkpoint": {
            "prompt": "Tabel termokopel memakai referensi 0°C, tetapi sambungan referensi alat berada di atas 0°C. Tegangan terukur sudah diketahui. Bagaimana cara yang tepat mencari suhu sambungan panas dari tabel?",
            "options": [
              {
                "id": "2023-uts2-q2-checkpoint-option-1",
                "label": "Kurangi tegangan tabel referensi dari tegangan terukur, lalu cari suhu.",
                "feedback": "Pengurangan sudah terjadi pada tegangan yang diukur. Menguranginya lagi membuat koreksi referensi salah arah.",
                "misconceptionTag": "concept-2023-05-choice-1"
              },
              {
                "id": "2023-uts2-q2-checkpoint-option-2",
                "label": "Cari tegangan terukur langsung pada tabel, lalu tambahkan suhu referensi.",
                "feedback": "Cara ini menganggap tegangan hanya bergantung secara linear pada selisih suhu. Tabel nyata tidak mengikuti asumsi itu secara tepat.",
                "misconceptionTag": "concept-2023-05-choice-2"
              },
              {
                "id": "2023-uts2-q2-checkpoint-option-3",
                "label": "Abaikan referensi karena termokopel selalu memberi suhu panas secara absolut.",
                "feedback": "Keluaran termokopel bergantung pada kedua sambungan. Suhu referensi diperlukan untuk membaca suhu panas.",
                "misconceptionTag": "concept-2023-05-choice-3"
              },
              {
                "id": "2023-uts2-q2-checkpoint-option-4",
                "label": "Tambahkan tegangan tabel pada suhu referensi ke tegangan terukur, lalu cari suhu dari tegangan total itu.",
                "feedback": "Benar. Samakan acuan tegangan terlebih dahulu, baru gunakan tabel untuk mencari suhu."
              }
            ],
            "correctOptionId": "2023-uts2-q2-checkpoint-option-4"
          }
        },
        {
          "id": "2023-uts2-q2-step-2",
          "title": "Kurangi dua tegangan yang memakai acuan sama",
          "content": "Kita menghilangkan pengaruh referensi 0°C dengan mengurangkan tegangan 100°C dari tegangan 340°C. Hasilnya adalah tegangan antara kedua suhu pada soal.\n\nNilainya positif karena sambungan ukur lebih panas dalam polaritas tabel. Jangan mencari tabel pada 240°C: mengurangkan suhu lebih dulu akan menganggap hubungan suhu dengan tegangan selalu linear.\n\n$$\nE_K(340,100)=E_K(340,0)-E_K(100,0)=13.874-4.096=\\boxed{9.778\\ \\mathrm{mV}}\n$$"
        },
        {
          "id": "2023-uts2-q2-step-3",
          "title": "2b(i) · Pisahkan nilai awal dan perubahan RTD",
          "content": "Tahanan elemen logam berubah saat suhunya berubah. **RTD** (sensor suhu dengan elemen tahanan logam) membaca perubahan tersebut. Sensitivitas 0.004 Ω/°C berarti kenaikan suhu 1°C memberi kenaikan tahanan akhir 0.004 Ω.\n\nNilai awalnya sudah diketahui: 20°C dan 100 Ω. Kita definisikan $\\Delta T=T-20$ dan $\\Delta R=R-100$. Kedua perubahan bernilai nol sebelum suhu berubah.\n\nPernyataan tanpa bias cocok untuk perubahan ini. Model absolut $R=0.004T$ justru memberi 0.08 Ω pada 20°C, sehingga bertentangan dengan nilai awal soal.\n\n$$\n\\Delta T=T-20,\\qquad \\Delta R=R-100\n$$"
        },
        {
          "id": "2023-uts2-q2-step-4",
          "title": "Susun model orde satu",
          "content": "Orde satu berarti persamaan memuat turunan pertama keluaran terhadap waktu. Konstanta waktu $\\tau$ mengatur laju respons; semakin besar $\\tau$, semakin lama keluaran mendekati nilai akhirnya.\n\nSuku $K\\Delta T$ adalah perubahan tahanan yang dituju pada keadaan tunak. Suku $\\tau\\,d\\Delta R/dt$ menjelaskan selisih sementara antara target itu dan perubahan tahanan saat ini.\n\n$$\n\\tau\\frac{d\\Delta R}{dt}+\\Delta R=K\\Delta T\\quad\\Rightarrow\\quad0.5\\frac{d\\Delta R}{dt}+\\Delta R=0.004\\Delta T\n$$",
          "simulation": {
            "id": "2023-uts2-q2-step-4-visual",
            "type": "ipe-rtd",
            "title": "Sensor suhu resistif",
            "caption": "Respons tahanan dimulai saat suhu berubah pada t=1 s.",
            "params": [
              {
                "key": "tau",
                "label": "Konstanta waktu τ",
                "min": 0.1,
                "max": 1.5,
                "step": 0.01,
                "defaultValue": 0.5,
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
              "tau": 0.5,
              "initialTemperature": 20,
              "finalTemperature": 100,
              "initialResistance": 100,
              "stepTime": 1,
              "evaluationTime": 2,
              "K": 0.004,
              "initial": 100,
              "final": 100.32,
              "visualKind": "rtd"
            }
          }
        },
        {
          "id": "2023-uts2-q2-step-5",
          "title": "Tulis persamaan dengan suhu dan tahanan asli",
          "content": "Nilai awal 100 Ω adalah konstanta, sehingga turunannya nol: $d(R-100)/dt=dR/dt$. Kita ganti kedua variabel perubahan dengan definisinya untuk memperoleh model yang diminta.\n\nCek satuannya: 0.5 s dikali laju tahanan Ω/s menghasilkan Ω. Ruas kanan juga Ω karena sensitivitas Ω/°C dikali perubahan suhu °C.\n\n$$\n\\boxed{0.5\\frac{dR}{dt}+R-100=0.004(T-20)}\n$$"
        },
        {
          "id": "2023-uts2-q2-step-6",
          "title": "Cari tahanan akhir setelah suhu berubah",
          "content": "Pada keadaan tunak, tahanan sudah tidak berubah terhadap waktu, sehingga suku turunannya nol. Model lalu menjadi perubahan tahanan = sensitivitas × perubahan suhu.\n\nSuhu naik dari 20°C ke 100°C, yaitu 80°C. Perubahan tahanan akhirnya 0.320 Ω; nilai ini perlu ditambahkan pada 100 Ω, bukan menggantikannya.\n\n$$\n\\Delta T=100-20=80^\\circ\\mathrm C,\\quad\\Delta R_\\infty=0.004(80)=0.320\\ \\Omega,\\quad R_\\infty=100.320\\ \\Omega\n$$"
        },
        {
          "id": "2023-uts2-q2-step-7",
          "title": "Mulai waktu respons saat perubahan terjadi",
          "content": "Suhu belum berubah sebelum t=1 s. Sensor awalnya tunak, sehingga tahanan tetap 100 Ω sepanjang selang itu.\n\nUntuk $t\\ge1$, gunakan waktu berjalan $t-1$. Saat pembacaan pada t=2 s, respons baru berlangsung 1 s. Dengan $\\tau=0.5$ s, ini setara dua konstanta waktu.\n\n$$\n\\Delta t=t-t_0=2-1=1\\ \\mathrm s,\\qquad\\frac{\\Delta t}{\\tau}=\\frac{1}{0.5}=2\n$$"
        },
        {
          "id": "2023-uts2-q2-step-8",
          "title": "Gunakan bentuk respons yang memenuhi kondisi awal",
          "content": "Respons langkah orde satu menyisakan fraksi $e^{-\\Delta t/\\tau}$ dari perubahan yang belum selesai. Oleh karena itu, fraksi perubahan yang sudah selesai adalah $1-e^{-\\Delta t/\\tau}$.\n\nKita kalikan fraksi selesai dengan perubahan akhir 0.320 Ω, lalu tambahkan tahanan awal. Saat t=1 s, eksponensial bernilai satu dan perubahan keluaran masih nol.\n\n$$\nR(t)=100+0.320\\left(1-e^{-(t-1)/0.5}\\right),\\qquad t\\ge1\n$$",
          "simulation": {
            "id": "2023-uts2-q2-step-8-visual",
            "type": "ipe-rtd",
            "title": "Sensor suhu resistif",
            "caption": "Bandingkan tahanan saat ini dengan nilai akhirnya.",
            "params": [
              {
                "key": "tau",
                "label": "Konstanta waktu τ",
                "min": 0.1,
                "max": 1.5,
                "step": 0.01,
                "defaultValue": 0.5,
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
              "tau": 0.5,
              "initialTemperature": 20,
              "finalTemperature": 100,
              "initialResistance": 100,
              "stepTime": 1,
              "evaluationTime": 2,
              "K": 0.004,
              "initial": 100,
              "final": 100.32,
              "visualKind": "rtd"
            }
          }
        },
        {
          "id": "2023-uts2-q2-step-9",
          "title": "2b(ii) · Hitung tahanan pada t=2 s",
          "content": "Kita masukkan waktu berjalan 1 s. Nilai $e^{-2}=0.135335$, sehingga fraksi perubahan yang selesai adalah $1-0.135335=0.864665$.\n\nKenaikan tahanan saat pembacaan adalah sekitar 0.276693 Ω. Tambahkan nilai itu ke 100 Ω untuk mendapat pembacaan sensor.\n\n$$\n\\begin{aligned}R(2)&=100+0.320(1-e^{-2})\\\\&=100+0.320(0.864665)\\\\&=\\boxed{100.27669\\ \\Omega}\\end{aligned}\n$$",
          "simulation": {
            "id": "2023-uts2-q2-step-9-visual",
            "type": "ipe-rtd",
            "title": "Sensor suhu resistif",
            "caption": "Titik pada t=2 s menunjukkan hasil hitungan.",
            "params": [
              {
                "key": "tau",
                "label": "Konstanta waktu τ",
                "min": 0.1,
                "max": 1.5,
                "step": 0.01,
                "defaultValue": 0.5,
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
              "tau": 0.5,
              "initialTemperature": 20,
              "finalTemperature": 100,
              "initialResistance": 100,
              "stepTime": 1,
              "evaluationTime": 2,
              "K": 0.004,
              "initial": 100,
              "final": 100.32,
              "visualKind": "rtd"
            }
          }
        },
        {
          "id": "2023-uts2-q2-step-10",
          "title": "Periksa batas dan arti sensitivitas",
          "content": "Hasil berada antara 100 Ω dan 100.320 Ω, sesuai sensor yang sedang mendekati keadaan akhir. Pada waktu yang sangat lama, eksponensial menuju nol dan tahanan menuju 100.320 Ω.\n\nJangan kalikan 0.004 dengan 100 Ω lagi. Satuan yang diberikan Ω/°C sudah menyatakan perubahan tahanan langsung. Koefisien relatif per °C akan membutuhkan model dan satuan yang berbeda."
        }
      ],
      "finalAnswer": "Tegangan termokopel 9.778 mV. Model RTD memakai perubahan dari 20 °C dan 100 Ω; pada t=2 s, tahanan 100.27669 Ω.\n\n$$\n\\boxed{\\begin{aligned}E_K&=9.778\\ \\mathrm{mV}\\\\R(2)&=100.27669\\ \\Omega\\end{aligned}}\n$$",
      "takeaway": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi.",
      "sourceNotes": [
        "Bagian 2, halaman PDF 6-7, menambah dasar yang tidak dijelaskan oleh tabel sensor saja: model orde satu menghubungkan respons waktu dengan nilai akhirnya. Gunakan perubahan terhadap keadaan awal, $\\Delta R=R-100\\ \\Omega$ dan $\\Delta T=T-20^\\circ\\mathrm C$, sehingga $\\tau\\,d\\Delta R/dt+\\Delta R=K\\Delta T$. Model perubahan ini menjaga keadaan awal yang diberikan.",
        "Hitung waktu sejak suhu berubah, yaitu $t-1\\ \\mathrm s$. Pada $t=2\\ \\mathrm s$, sensor sudah merespons selama dua konstanta waktu. Tabel termokopel pada bagian (a) tetap memakai hukum beda suhu acuan; persamaan dinamik baru diperlukan pada bagian RTD."
      ]
    },
    {
      "id": "ipe-temperature-practice",
      "kind": "practice",
      "slug": "ipe-temperature-practice",
      "title": "Latihan: Sensor suhu",
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "intro": "Latihan ini membantu Anda memilih model dan menjelaskan alasan. Mulai dari pilihan ganda, tinjau contoh yang keliru, lalu susun jawaban sendiri. Gunakan rubrik untuk memeriksa alur, asumsi, dan batas kesimpulan Anda.",
      "questions": [
        {
          "id": "concept-2023-05",
          "prompt": "Tabel termokopel memakai referensi 0°C, tetapi sambungan referensi alat berada di atas 0°C. Tegangan terukur sudah diketahui. Bagaimana cara yang tepat mencari suhu sambungan panas dari tabel?",
          "options": [
            {
              "id": "concept-2023-05-option-1",
              "label": "Kurangi tegangan tabel referensi dari tegangan terukur, lalu cari suhu.",
              "feedback": "Pengurangan sudah terjadi pada tegangan yang diukur. Menguranginya lagi membuat koreksi referensi salah arah.",
              "misconceptionTag": "concept-2023-05-choice-1"
            },
            {
              "id": "concept-2023-05-option-2",
              "label": "Cari tegangan terukur langsung pada tabel, lalu tambahkan suhu referensi.",
              "feedback": "Cara ini menganggap tegangan hanya bergantung secara linear pada selisih suhu. Tabel nyata tidak mengikuti asumsi itu secara tepat.",
              "misconceptionTag": "concept-2023-05-choice-2"
            },
            {
              "id": "concept-2023-05-option-3",
              "label": "Abaikan referensi karena termokopel selalu memberi suhu panas secara absolut.",
              "feedback": "Keluaran termokopel bergantung pada kedua sambungan. Suhu referensi diperlukan untuk membaca suhu panas.",
              "misconceptionTag": "concept-2023-05-choice-3"
            },
            {
              "id": "concept-2023-05-option-4",
              "label": "Tambahkan tegangan tabel pada suhu referensi ke tegangan terukur, lalu cari suhu dari tegangan total itu.",
              "feedback": "Benar. Samakan acuan tegangan terlebih dahulu, baru gunakan tabel untuk mencari suhu."
            }
          ],
          "correctOptionId": "concept-2023-05-option-4",
          "explanation": "Tegangan terukur merupakan tegangan tabel sambungan panas dikurangi tegangan tabel referensi. Untuk memulihkan tegangan panas terhadap 0°C, tambahkan kontribusi referensi. Menambahkan suhu setelah pencarian tabel tidak tepat secara umum karena hubungan suhu dengan tegangan tidak linear.",
          "relatedProblemId": "2023-uts2-q2"
        },
        {
          "id": "concept-2024-01",
          "prompt": "Sambungan ukur termokopel tipe J berada pada suhu tetap. Sambungan referensinya menghangat, tetapi perangkat tetap memakai kompensasi referensi lama. Dalam rentang tabel yang tegangannya naik terhadap suhu, apa yang paling mungkin terjadi?",
          "options": [
            {
              "id": "concept-2024-01-option-1",
              "label": "Tegangan turun dan perangkat dapat menafsirkan suhu ukur terlalu rendah.",
              "feedback": "Benar. Tegangan referensi naik dan mengurangi selisih terukur; kompensasi harus mengikuti suhu referensi baru."
            },
            {
              "id": "concept-2024-01-option-2",
              "label": "Tegangan naik karena kedua sambungan menambah tegangan dengan tanda sama.",
              "feedback": "Kedua kontribusi dikurangkan menurut polaritas rangkaian, bukan dijumlahkan dengan tanda sama.",
              "misconceptionTag": "concept-2024-01-choice-2"
            },
            {
              "id": "concept-2024-01-option-3",
              "label": "Tegangan tetap karena hanya suhu sambungan ukur yang memengaruhinya.",
              "feedback": "Tegangan bergantung pada suhu ukur dan suhu referensi. Mengabaikan referensi mengubah arti pembacaan.",
              "misconceptionTag": "concept-2024-01-choice-3"
            },
            {
              "id": "concept-2024-01-option-4",
              "label": "Tegangan turun, sehingga suhu benda pasti turun dengan besar yang sama.",
              "feedback": "Soal menetapkan suhu benda tetap. Perubahan sambungan referensi dapat mengubah pembacaan tanpa perubahan suhu benda.",
              "misconceptionTag": "concept-2024-01-choice-4"
            }
          ],
          "correctOptionId": "concept-2024-01-option-1",
          "explanation": "Termokopel membaca selisih kontribusi kedua sambungan. Referensi yang lebih hangat mengurangi tegangan pada suhu ukur yang tetap. Kompensasi lama menambahkan tegangan referensi terlalu kecil, sehingga hasil suhu dapat terlalu rendah.",
          "relatedProblemId": "2024-uts2-q1"
        },
        {
          "id": "concept-2024-02",
          "prompt": "Sebuah termistor dikalibrasi dengan model $R=\\alpha e^{\\beta/\\theta}$, dengan $\\theta$ dalam kelvin. Seorang siswa memasukkan angka suhu Celsius ke model yang sama tanpa mengubah konstanta. Penilaian mana yang tepat?",
          "options": [
            {
              "id": "concept-2024-02-option-1",
              "label": "Hasil tetap sama karena selisih satu kelvin sama dengan selisih satu derajat Celsius.",
              "feedback": "Kesamaan selisih suhu tidak membuat $1/\\theta$ sama. Di sini $\\theta$ berada di penyebut, bukan hanya sebagai selisih suhu.",
              "misconceptionTag": "concept-2024-02-choice-1"
            },
            {
              "id": "concept-2024-02-option-2",
              "label": "Langkah itu benar jika hambatan ditulis dalam kilo-ohm.",
              "feedback": "Satuan hambatan memengaruhi skala $\\alpha$, bukan titik nol skala suhu. Mengganti Ω menjadi kΩ tidak memperbaiki suhu yang salah.",
              "misconceptionTag": "concept-2024-02-choice-2"
            },
            {
              "id": "concept-2024-02-option-3",
              "label": "Langkah itu salah karena model memakai kebalikan suhu mutlak; pergantian titik nol mengubah nilai $\\beta/\\theta$.",
              "feedback": "Benar. Konversikan suhu ke kelvin sebelum memakai model dan konstanta kalibrasinya."
            },
            {
              "id": "concept-2024-02-option-4",
              "label": "Langkah itu hanya salah pada suhu di bawah 0°C; pada suhu positif kedua skala dapat ditukar.",
              "feedback": "Nilai Celsius dan kelvin tetap berbeda pada suhu positif. Masalahnya adalah penggunaan skala yang tidak sesuai dengan model.",
              "misconceptionTag": "concept-2024-02-choice-4"
            }
          ],
          "correctOptionId": "concept-2024-02-option-3",
          "explanation": "Selisih suhu mempunyai besar yang sama pada kedua skala, tetapi nilai suhu dan kebalikannya tidak sama. Konstanta model berasal dari data dalam kelvin. Memasukkan Celsius mengubah model, bahkan memberi pembagian dengan nol pada 0°C.",
          "relatedProblemId": "2024-uts1-q1"
        },
        {
          "id": "concept-2025-02",
          "prompt": "Anda menyambung kawat tembaga ke sepasang kawat termokopel melalui dua terminal. Kedua terminal berada pada suhu yang sama. Mengapa sambungan tambahan itu dapat dipakai tanpa menambah tegangan bersih pada model ideal?",
          "options": [
            {
              "id": "concept-2025-02-option-1",
              "label": "Setiap logam ketiga selalu menghapus seluruh tegangan termokopel, pada suhu berapa pun.",
              "feedback": "Logam tambahan tidak menghapus tegangan ukur seluruh termokopel. Pembatalan hanya berlaku pada kontribusi tambahannya dan memerlukan pasangan sambungan bersuhu sama.",
              "misconceptionTag": "concept-2025-02-choice-1"
            },
            {
              "id": "concept-2025-02-option-2",
              "label": "Tahanan kawat tembaga yang kecil menjamin kedua sambungan tidak pernah menghasilkan tegangan termal.",
              "feedback": "Tahanan rendah membantu mengurangi jatuh tegangan listrik, tetapi tidak menjamin pembatalan tegangan akibat suhu. Syarat penting di sini ialah suhu kedua terminal yang sama.",
              "misconceptionTag": "concept-2025-02-choice-2"
            },
            {
              "id": "concept-2025-02-option-3",
              "label": "Sambungan tambahan menghapus kebutuhan mengetahui suhu referensi termokopel.",
              "feedback": "Pembatalan sambungan tambahan tidak mengubah suhu referensi yang dipakai tabel. Referensi tetap harus diketahui dan dikompensasi bila perlu.",
              "misconceptionTag": "concept-2025-02-choice-3"
            },
            {
              "id": "concept-2025-02-option-4",
              "label": "Pengaruh pasangan sambungan logam tambahan saling menghapus jika keduanya bersuhu sama; perbedaan suhu terminal dapat menambah galat.",
              "feedback": "Tepat. Pernyataan ini menyebut mekanisme pembatalan serta syarat suhu yang harus dijaga."
            }
          ],
          "correctOptionId": "concept-2025-02-option-4",
          "explanation": "Hukum logam antara mengizinkan logam tambahan jika pasangan sambungannya berada pada suhu yang sama. Syarat suhu yang sama membuat kontribusi tambahan saling menghapus. Kompensasi suhu referensi tetap diperlukan jika tabel memakai referensi yang berbeda.",
          "relatedProblemId": "2025-uts2-q2"
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-temperature-guided",
          "mode": "spot-the-error",
          "title": "Tinjau urutan kompensasi termokopel",
          "prompt": "Sambungan referensi lebih hangat daripada acuan tabel. Periksa cara berikut.",
          "workSample": "Saya membaca suhu dari tegangan terukur pada tabel 0 °C. Setelah itu, saya menambah suhu referensi pada hasil suhu tersebut.",
          "question": {
            "id": "ipe-temperature-guided-question",
            "prompt": "Urutan mana yang sesuai untuk kurva termokopel nonlinear?",
            "options": [
              {
                "id": "ipe-temperature-guided-question-option-1",
                "label": "Tambahkan tegangan referensi, lalu cari suhu dari tegangan hasil koreksi.",
                "feedback": "Tepat. Hubungan penjumlahan berlaku pada tegangan dengan acuan yang sesuai."
              },
              {
                "id": "ipe-temperature-guided-question-option-2",
                "label": "Tambahkan suhu langsung tanpa memeriksa kurva.",
                "feedback": "Hubungan tegangan dan suhu dapat nonlinear. Penjumlahan suhu tidak mengikuti koreksi tegangan secara umum.",
                "misconceptionTag": "temperature-guided-choice-2"
              },
              {
                "id": "ipe-temperature-guided-question-option-3",
                "label": "Abaikan referensi karena semua tegangan memakai satuan yang sama.",
                "feedback": "Satuan yang sama tidak berarti acuan suhu sudah sama.",
                "misconceptionTag": "temperature-guided-choice-3"
              }
            ],
            "correctOptionId": "ipe-temperature-guided-question-option-1",
            "explanation": "Cari tegangan ekuivalen referensi pada tabel. Tambahkan ke tegangan terukur sesuai polaritas. Gunakan jumlahnya untuk mencari suhu sambungan ukur."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-temperature-essay",
          "title": "Periksa pembacaan termokopel yang turun",
          "prompt": "Suhu proses tetap, tetapi pembacaan termokopel turun saat terminal alat menghangat. Susun diagnosis yang membedakan perubahan proses dari kesalahan kompensasi referensi.",
          "sections": [
            "Model dan asumsi",
            "Alur penalaran",
            "Kesimpulan dan batas"
          ],
          "hints": [
            "Termokopel melibatkan dua suhu sambungan.",
            "Periksa suhu referensi yang digunakan perangkat dan suhu terminal sebenarnya.",
            "Telusuri tegangan terukur, koreksi referensi, dan pembacaan tabel secara terpisah."
          ],
          "rubric": [
            {
              "id": "ipe-temperature-rubric-model",
              "label": "Model dan asumsi",
              "weight": 35,
              "fullCredit": "Menyatakan peran sambungan ukur dan referensi serta tipe tabel yang digunakan.",
              "commonPartialError": "Jangan menambah suhu referensi langsung pada suhu hasil pembacaan tabel yang belum dikoreksi."
            },
            {
              "id": "ipe-temperature-rubric-reasoning",
              "label": "Alur penalaran",
              "weight": 40,
              "fullCredit": "Menelusuri perubahan tegangan saat referensi menghangat dan memeriksa nilai kompensasi perangkat."
            },
            {
              "id": "ipe-temperature-rubric-conclusion",
              "label": "Kesimpulan dan batas",
              "weight": 25,
              "fullCredit": "Mengusulkan uji referensi atau acuan suhu lain sebelum menyimpulkan suhu proses berubah."
            }
          ],
          "verifiedOutline": "Pastikan suhu proses dengan acuan yang sesuai. Catat suhu terminal dan nilai kompensasi yang dipakai perangkat. Pada polaritas biasa, pemanasan referensi mengurangi tegangan terukur untuk suhu proses tetap. Kompensasi yang tidak ikut berubah dapat membuat pembacaan tampak turun. Periksa tipe termokopel, polaritas, tabel, dan sensor referensi. Uji kembali setelah koreksi untuk menilai apakah gejala hilang."
        }
      ]
    }
  ]
};

export const english: NonNullable<CourseTranslation['modules']>[string] = {
  "title": "Temperature sensors",
  "items": {
    "ipe-temperature-material": {
      "title": "Check the reference before finding temperature",
      "examHook": {
        "prompt": "A thermocouple table refers to 0 °C, but the instrument terminals are at room temperature. How should you use the measured voltage?",
        "targetOutcome": "You can choose a suitable reference correction and temperature scale."
      },
      "body": "A temperature sensor does not always output a temperature value directly. A thermocouple gives a voltage related to two junctions. RTDs and thermistors give resistance that must be mapped to temperature.\n\nIdentify the sensor output and model reference first. This step helps prevent sign, compensation, and temperature-scale errors.\n\n[Open the worked solution: Type J thermocouple and reference temperature](?item=2025-uts2-q2).",
      "microUnits": [
        {
          "id": "ipe-temperature-principle",
          "title": "Choose a model from the stated conditions",
          "intuition": "Thermocouple voltage depends on both the measuring and reference junction temperatures. **Reference compensation** is a voltage correction that aligns the measurement with the table reference. You correct the voltage first, then use the table to find temperature.",
          "formal": "For a table referenced to 0 °C:\n\n$$E(T_h,0)=E_{\\mathrm{measured}}+E(T_r,0).$$\n\n$T_h$ is the measuring-junction temperature and $T_r$ the reference temperature. Check polarity before using that sign.",
          "validityBounds": "Use the correct thermocouple type and table range. For an exponential thermistor model, use kelvin when required. For an RTD, check the linear-model range and self-heating.",
          "decisionCheck": {
            "prompt": "A thermistor model uses absolute temperature. Your temperature is in Celsius. What should you do before applying the model?",
            "options": [
              {
                "id": "ipe-temperature-decision-question-option-1",
                "label": "Convert temperature to kelvin to match the model.",
                "feedback": "Correct. The model uses absolute temperature rather than temperature differences alone."
              },
              {
                "id": "ipe-temperature-decision-question-option-2",
                "label": "Enter the Celsius value because one-degree changes are equal.",
                "feedback": "Equal step sizes do not make the absolute values of the two scales equal."
              },
              {
                "id": "ipe-temperature-decision-question-option-3",
                "label": "Only change its sign; temperature scale does not affect the model.",
                "feedback": "Changing a sign does not convert the Celsius zero reference to the kelvin reference."
              }
            ],
            "explanation": "Follow the units in the model definition. Constants defined for kelvin cannot be used directly with Celsius values."
          }
        },
        {
          "id": "ipe-temperature-static-reference",
          "title": "Separate nonlinearity from reference correction",
          "intuition": "Part 1, PDF pages 12-14, describes two different causes of a reading difference. The sensor curve may depart from an ideal line, and terminal temperature may change the measured voltage. Identify which difference the question asks you to evaluate.",
          "formal": "For a range from $T_a$ to $T_b$, write $K=[E(T_b,0)-E(T_a,0)]/(T_b-T_a)$ and $E_{\\mathrm{ideal}}(T)=E(T_a,0)+K(T-T_a)$. Then $N(T)=E(T,0)-E_{\\mathrm{ideal}}(T)$. The percentage deviation at that point is $100|N(T)|/|E(T_b,0)-E(T_a,0)|$.",
          "validityBounds": "Use the same thermocouple type, range, voltage unit, and reference throughout. A deviation at one point need not be the maximum. Correct the reference voltage before looking up temperature.",
          "decisionCheck": {
            "prompt": "A table gives thermocouple voltages relative to 0 °C. A question asks for nonlinearity at one temperature within a stated range. Which denominator gives percentage of full scale?",
            "options": [
              {
                "id": "ipe-temperature-static-reference-option-1",
                "label": "The voltage span between the two temperature endpoints.",
                "feedback": "Correct. Numerator and denominator both have voltage units."
              },
              {
                "id": "ipe-temperature-static-reference-option-2",
                "label": "The temperature at the test point.",
                "feedback": "Voltage divided by temperature is sensitivity, not percentage deviation."
              },
              {
                "id": "ipe-temperature-static-reference-option-3",
                "label": "The measured voltage without checking its reference.",
                "feedback": "The measured voltage may use a different reference and is not the full output span."
              }
            ],
            "explanation": "Full scale uses the voltage-output span that defines the ideal line. The temperature span sets its slope; it is not the denominator for a voltage deviation."
          }
        },
        {
          "id": "ipe-temperature-time-response",
          "title": "Measure time from the temperature change",
          "intuition": "Part 2, PDF pages 6-7, models a sensor that takes time to approach its final reading. Static calibration sets the steady value. The time constant determines how quickly the sensor approaches it.",
          "formal": "For one input step at $t_0$, $R(t)=R_\\infty+[R(t_0)-R_\\infty]e^{-(t-t_0)/\\tau}$ for $t\\ge t_0$. Static calibration gives $R_\\infty$. After one $\\tau$, the remaining difference is $e^{-1}$ of its initial value.",
          "validityBounds": "This model assumes one time constant, fixed parameters, and a constant input after the step. State the initial reading and step time. The final calibrated reading is not the instantaneous reading.",
          "decisionCheck": {
            "prompt": "Temperature changes at 1 second and you want the reading at 2 seconds. Which elapsed time belongs in the exponential?",
            "options": [
              {
                "id": "ipe-temperature-time-response-option-1",
                "label": "1 second, from 2 minus 1.",
                "feedback": "Correct. The sensor has responded for one second."
              },
              {
                "id": "ipe-temperature-time-response-option-2",
                "label": "2 seconds because that is the reading time.",
                "feedback": "That counts one second before the temperature step as part of the response."
              },
              {
                "id": "ipe-temperature-time-response-option-3",
                "label": "3 seconds, from adding both times.",
                "feedback": "Response time is the difference, not the sum."
              }
            ],
            "explanation": "The response begins when the input changes. Use time since that change, not the absolute observation time."
          }
        }
      ],
      "checkpoints": [
        "You can choose a suitable reference correction and temperature scale.",
        "Reference, polarity, and temperature scale must match the sensor model.",
        "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup."
      ],
      "derivations": [
        {
          "id": "ipe-temperature-sources",
          "title": "Sources and archive conventions",
          "content": "Read the part that supports the model you use. The numbers count physical PDF pages from 1; a page may contain several slides.\n\n[Pengukuran Teknik, Bagian 1 (2022)](https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view), PDF pages 11, 12, 13, 14, 16: Ranges, endpoint lines, nonlinearity, sensitivity, and reference-temperature effects.\n\n[Pengukuran Teknik, Bagian 2 (2022)](https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view), PDF pages 6, 7: First-order models and temperature step response.\n\n[Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view), PDF pages 2, 3, 4, 5, 6, 19, 20, 24, 25, 26: Temperature-sensor types, resistance models, thermocouple laws, and reference tables.\n\n[Midterm and final-exam archive, 2023 to 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Each problem retains its own original statement, exam pages, and assumptions."
        }
      ]
    },
    "2025-uts2-q2": {
      "title": "Type J thermocouple and reference temperature",
      "source": "Midterm 2 2025 · Question 2",
      "assumptions": [
        "Nonlinearity uses an endpoint reference line. Junction temperature represents air temperature; installation and heat-transfer errors are neglected."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Temperature sensors"
      ],
      "statement": "A Type J thermocouple measures air temperature in a pipe. The figure states an air speed of $50\\ \\mathrm{m/s}$. Use the appendix table referenced to $0^\\circ\\mathrm C$.\n(a) Over a $0$ to $400^\\circ\\mathrm C$ range, find nonlinearity at $150^\\circ\\mathrm C$ as a percentage of full scale. (b) Find the temperature for a measured $12.7\\ \\mathrm{mV}$ with a $20^\\circ\\mathrm C$ reference junction.",
      "simulation": {
        "title": "Thermocouple",
        "caption": "Add the cold-junction voltage to the measured voltage before finding temperature.",
        "params": [
          {
            "key": "temperature",
            "label": "Temperature"
          },
          {
            "key": "referenceTemperature",
            "label": "Reference temperature"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uts2-q2-step-1",
          "title": "1. Understand what the thermocouple reads",
          "content": "Two junctions at different temperatures produce a voltage. A **thermocouple** uses two different metals to produce that voltage and measure temperature. The Type J table gives $E_J(T,0)$: voltage for a measuring junction at $T$ and a reference at $0^\\circ\\mathrm C$. We need the reference temperature before converting voltage to temperature.\n\nPart (a) evaluates the curve against a reference line. Part (b) uses the same table to find temperature. Both use table voltages, but their starting steps differ.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Reference, polarity, and temperature scale must match the sensor model.",
            "commonPitfall": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup."
          },
          "checkpoint": {
            "prompt": "You connect copper wires to a thermocouple pair through two terminals. Both terminals remain at the same temperature. Why can these added connections introduce no extra net voltage in the ideal model?",
            "options": [
              {
                "id": "2025-uts2-q2-checkpoint-option-1",
                "label": "Every third metal cancels the entire thermocouple voltage at any temperature.",
                "feedback": "An added metal does not cancel the whole measuring voltage. Cancellation concerns the added contributions and requires equal junction temperatures."
              },
              {
                "id": "2025-uts2-q2-checkpoint-option-2",
                "label": "Low copper resistance guarantees that neither connection can generate thermal voltage.",
                "feedback": "Low resistance can reduce electrical voltage drop, but does not ensure thermal-voltage cancellation. The key condition here is equal terminal temperatures."
              },
              {
                "id": "2025-uts2-q2-checkpoint-option-3",
                "label": "The added connections eliminate the need to know the thermocouple reference temperature.",
                "feedback": "Cancellation at added connections does not change the table reference. You still need to know and, when needed, compensate the reference temperature."
              },
              {
                "id": "2025-uts2-q2-checkpoint-option-4",
                "label": "The added junction pair has cancelling contributions when both junctions share a temperature; a terminal temperature difference can add error.",
                "feedback": "Correct. The statement identifies both cancellation and the temperature condition that makes it valid."
              }
            ]
          }
        },
        {
          "id": "2025-uts2-q2-step-2",
          "title": "2. Build the ideal endpoint line",
          "content": "Nonlinearity compares the actual table with a reference straight line. Here we use the line through 0 °C and 400 °C, not a tangent at 150 °C.\n\nThe line slope is $21.848/400=0.05462\\ \\mathrm{mV/{}^\\circ C}$. Multiplying it by 150 °C gives the voltage of a perfectly linear sensor with those endpoints. It is a comparison value, not the actual table value.\n\n$$\nE_{\\mathrm{lin}}(T)=\\frac{21.848-0}{400-0}T=0.05462T\\ \\mathrm{mV}\\\\E_{\\mathrm{lin}}(150)=8.193\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uts2-q2-step-3",
          "title": "3. Compare the voltage at 150 °C",
          "content": "The table gives 8.010 mV. Subtract the ideal-line value, then divide the absolute deviation by the full output span. The negative sign means the table point is below the line.\n\nThe denominator $21.848\\ \\mathrm{mV}$ is the output span over 0 to 400 °C. Dividing by 8.010 mV would give a percentage of the reading at 150 °C, not the requested percentage of full scale.\n\n$$\nN(150)=8.010-8.193=-0.183\\ \\mathrm{mV}\\\\\\%N=\\frac{|{-0.183}|}{21.848}\\,100\\%=0.8376\\%\n$$"
        },
        {
          "id": "2025-uts2-q2-step-4",
          "title": "4. Write the junction relation before correcting",
          "content": "For the same measuring junction, raising the reference from 0 to 20 °C reduces the measured voltage. The lost amount is $E_J(20,0)$. Add that amount to express the reading in the table convention.\n\n$$\nE_J(T,20)=E_J(T,0)-E_J(20,0)\\quad\\Rightarrow\\quad E_J(T,0)=E_J(T,20)+E_J(20,0)\n$$"
        },
        {
          "id": "2025-uts2-q2-step-5",
          "title": "5. Correct the 20 °C reference junction",
          "content": "The measured voltage comes from the two junction temperatures. To use the zero-reference table, add $E_J(20,0)=1.019\\ \\mathrm{mV}$. Adding 20 °C directly to a table-derived temperature is not exact because voltage is not perfectly linear with temperature.\n\nApply the correction in voltage first. Directly adding temperatures would require an exactly linear voltage and temperature relation with constant sensitivity.\n\n$$\nE_J(T,0)=E_J(T,20)+E_J(20,0)=12.700+1.019=13.719\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uts2-q2-step-6",
          "title": "6. Find the two table entries bracketing the voltage",
          "content": "Choose entries that bracket $13.719\\ \\mathrm{mV}$, rather than merely look close. The lower entry is $(252^\\circ\\mathrm C,13.666\\ \\mathrm{mV})$, and the upper one is $(253^\\circ\\mathrm C,13.722\\ \\mathrm{mV})$. The final temperature must lie between them.\n\n$$\n13.666<13.719<13.722\\quad\\Rightarrow\\quad252<T<253\n$$"
        },
        {
          "id": "2025-uts2-q2-step-7",
          "title": "7. Interpolate between the nearest entries",
          "content": "13.719 mV lies between 13.666 mV at 252 °C and 13.722 mV at 253 °C. Find the fraction of the interval above the lower point.\n\nThe numerator is the rise above the lower entry: $0.053\\ \\mathrm{mV}$. The denominator is one table interval: $0.056\\ \\mathrm{mV}$. Their ratio is about 0.946, placing the temperature about 94.6% of the way from 252 to 253 °C.\n\n$$\nT=252+\\frac{13.719-13.666}{13.722-13.666}(253-252)=252.946^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2025-uts2-q2-step-8",
          "title": "8. Check the correction direction and result limits",
          "content": "The equivalent zero-reference voltage exceeds the measured voltage: $13.719>12.700\\ \\mathrm{mV}$. The result $252.946^\\circ\\mathrm C$ also lies within 252 to 253 °C and near the upper end, matching the voltage position."
        },
        {
          "id": "2025-uts2-q2-step-9",
          "title": "9. Interpret the result within the measurement model",
          "content": "The measuring junction is about 253 °C. We equate this with air temperature because the question gives no data for heat-transfer or flow-recovery corrections. Air speed does not enter this electrical thermocouple correction.\n\nSeparating junction temperature from fluid temperature makes the answer’s limit clear. The supplied data support the electrical conversion, but do not determine installation or heat-transfer errors."
        }
      ],
      "finalAnswer": "Nonlinearity at 150 °C is 0.838% of full scale, with a −0.183 mV deviation. The measured temperature is about 252.95 °C.\n\n$$\n\\boxed{\\%N_{150}=0.838\\%\\ \\mathrm{FS},\\qquad T\\approx252.95^\\circ\\mathrm C}\n$$",
      "takeaway": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup.",
      "sourceNotes": [
        "Part 1, PDF pages 12-13, defines the ideal endpoint line and the deviation $N(T)=E(T)-E_{\\mathrm{ideal}}(T)$. In part (a), divide the magnitude of the voltage deviation by the **output** span $E(400,0)-E(0,0)$. A value at one temperature does not establish the largest deviation across the range.",
        "Part 1, PDF pages 14 and 16, treats reference-junction temperature as an environmental influence. Combine this with the thermocouple laws in Part 3: correct the reference voltage first, then find temperature in the Type J table. Do not add $20^\\circ\\mathrm C$ directly to an uncorrected table reading. Distinguish two conditions: with hot-junction temperature held fixed, a higher reference temperature lowers the measured voltage. With measured voltage held fixed as in the problem, a higher reference temperature raises the voltage used for the table lookup and raises the calculated hot-junction temperature."
      ]
    },
    "2025-uts2-q5": {
      "title": "RTD in a Wheatstone bridge",
      "source": "Midterm 2 2025 · Question 5",
      "assumptions": [
        "The output readout has high impedance; lead resistance and self-heating are neglected. Supply/readout polarity is explicitly defined because the drawing does not label output polarity."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Temperature sensors"
      ],
      "statement": "An RTD forms arm $R_4$ of a Wheatstone bridge operating in deflection mode. Given $R_0=25\\ \\Omega$, $\\beta=0.004\\ ^\\circ\\mathrm C^{-1}$, and $R(T)=R_0(1+\\beta T)$. The figure has $R_2=R_3=100\\ \\Omega$ and $R_1=25\\ \\Omega$. Excitation connects the left/right nodes, and output connects the top/bottom nodes.\n(a) Find RTD resistance at $100^\\circ\\mathrm C$. (b) Find bridge output for a $5\\ \\mathrm V$ supply.",
      "simulation": {
        "title": "Resistive temperature sensor",
        "caption": "Temperature changes RTD resistance and bridge imbalance.",
        "params": [
          {
            "key": "temperature",
            "label": "Temperature"
          },
          {
            "key": "voltage",
            "label": "Supply voltage"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uts2-q5-step-1",
          "title": "1. Follow temperature, resistance, then voltage",
          "content": "Temperature changes the sensing material’s resistance. An **RTD** is a resistive temperature sensor that uses this change to measure temperature. The bridge turns the RTD resistance into a voltage difference. We first calculate resistance, then find the two output-node voltages.\n\nIn $R(T)=R_0[1+\\alpha(T-T_0)]$, $R_0=25\\ \\Omega$ is the resistance at $T_0=0^\\circ\\mathrm C$, and $\\alpha=0.004\\ {}^\\circ\\mathrm C^{-1}$ is the relative change per degree.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Reference, polarity, and temperature scale must match the sensor model.",
            "commonPitfall": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup."
          }
        },
        {
          "id": "2025-uts2-q5-step-2",
          "title": "2. Convert temperature to resistance",
          "content": "A positive coefficient means resistance increases with temperature. At 100 °C the fractional increase is 0.004 × 100 = 0.4, or 40% of the initial resistance.\n\nThe absolute increase is $\\Delta R=25(0.4)=10\\ \\Omega$, so $R_4=25+10=35\\ \\Omega$. The temperature coefficient does not mean an increase of 0.004 Ω per degree; it multiplies the reference resistance.\n\n$$\nR_4=25[1+0.004(100)]=35\\ \\Omega\n$$"
        },
        {
          "id": "2025-uts2-q5-step-3",
          "title": "3. Define the nodes before using a formula",
          "content": "Follow the drawing: take the left node as $+5\\ \\mathrm V$ and the right node as $0\\ \\mathrm V$. The upper branch contains $R_2$ then $R_3$; the lower branch contains $R_1$ then the RTD. With a high-impedance readout, each branch is a voltage divider.\n\nResistor numbering alone cannot determine the bridge formula. Identify the supply and the two output nodes. This drawing uses left-to-right excitation, so do not insert R 1 to R 4 blindly into a formula for a top-to-bottom supply.",
          "simulation": {
            "title": "Measurement bridge",
            "caption": "Left/right excitation and top/bottom output follow the original wiring.",
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
          "id": "2025-uts2-q5-step-4",
          "title": "4. Derive the upper-branch divider",
          "content": "The upper-branch current is total voltage divided by total resistance. The top-node voltage relative to the right-hand 0 V node is the drop across $R_3$. The two 100 Ω resistors split the supply equally.\n\n$$\nI_{\\mathrm{upper}}=\\frac5{100+100}=0.025\\ \\mathrm A,\\qquad V_{\\mathrm{top}}=I_{\\mathrm{upper}}R_3=2.500\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts2-q5-step-5",
          "title": "5. Calculate the RTD-branch divider",
          "content": "The lower branch carries a different current because its total resistance is 60 Ω. Its node voltage is measured relative to the 0 V side, so use the drop across the 35 Ω RTD. Using 25 Ω would instead give the drop from the left supply node to the lower node.\n\n$$\nI_{\\mathrm{lower}}=\\frac5{25+35}=0.0833333\\ \\mathrm A\\\\V_{\\mathrm{bottom}}=I_{\\mathrm{lower}}R_4=5\\frac{35}{60}=2.91667\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts2-q5-step-6",
          "title": "6. Take the difference and check the zero condition",
          "content": "With $V_o=V_{\\mathrm{top}}-V_{\\mathrm{bottom}}$, output is negative. Reversing the readout leads changes the sign but not the magnitude. At $0^\\circ\\mathrm C$, both nodes are at 2.5 V and the bridge is balanced.\n\nA negative value indicates polarity, not an “impossible” voltage. The lower node is 0.41667 V above the top node. If only output magnitude is requested, report $0.41667\\ \\mathrm V$ and state the sign convention.\n\n$$\nV_o=2.500-2.91667=-0.41667\\ \\mathrm V,\\qquad |V_o|=0.41667\\ \\mathrm V\n$$"
        },
        {
          "id": "2025-uts2-q5-step-7",
          "title": "7. Check the change from the balanced state",
          "content": "At 0 °C, $R_4=R_1=25\\ \\Omega$ and $R_2=R_3=100\\ \\Omega$, so both dividers give 2.5 V. Heating increases the RTD resistance and raises the lower node. Thus $V_{\\mathrm{top}}-V_{\\mathrm{bottom}}$ must become negative, as calculated.\n\nThe calculation neglects readout current and RTD self-heating from the supply. Both need consideration in a real circuit design."
        }
      ],
      "finalAnswer": "RTD resistance is 35 Ω. Output magnitude is 0.4167 V; with top-minus-bottom polarity, output is −0.4167 V.\n\n$$\n\\boxed{R(100^\\circ\\mathrm C)=35\\ \\Omega,\\qquad |V_o|=0.4167\\ \\mathrm V}\n$$",
      "takeaway": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup.",
      "sourceNotes": [
        "Part 1, PDF pages 2-3, distinguishes sensing from signal conditioning. The RTD converts temperature into resistance; the bridge converts the resistance change into a voltage difference. Find $R(T)$ first, then calculate both node voltages from the actual diagram. The supply position and output polarity determine the bridge equation."
      ]
    },
    "2025-uas-q4": {
      "title": "Type T thermocouple with a 25 °C reference",
      "source": "Final exam 2025 · Question 4",
      "assumptions": [
        "Nonlinearity uses an endpoint line. Measuring-junction temperature is assumed to equal vessel temperature. Voltages follow the exam appendix, retaining its rounding."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Temperature sensors"
      ],
      "statement": "Use the Type T thermocouple table referenced to $0^\\circ\\mathrm C$. (a) Find nonlinearity at $200^\\circ\\mathrm C$ over a $0$ to $400^\\circ\\mathrm C$ range. (b) Find vessel temperature if the measured voltage is $11.5\\ \\mathrm{mV}$ relative to a $25^\\circ\\mathrm C$ reference.",
      "simulation": {
        "title": "Thermocouple",
        "caption": "The Type T table and ideal line show nonlinearity and reference correction.",
        "params": [
          {
            "key": "temperature",
            "label": "Temperature"
          },
          {
            "key": "referenceTemperature",
            "label": "Reference temperature"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uas-q4-step-1",
          "title": "1. Use the correct type and reference-temperature table",
          "content": "We must use a table for the thermocouple’s metal pair. This problem uses Type T, so we take every voltage from the Type T table. The table gives $E_T(T,0)$, the voltage relative to a 0 °C reference junction. A Type J table describes different metals and cannot replace it.\n\nStart with nonlinearity at a 0 °C reference. Then convert the 25 °C-reference reading to the table convention before finding temperature.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Reference, polarity, and temperature scale must match the sensor model.",
            "commonPitfall": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup."
          }
        },
        {
          "id": "2025-uas-q4-step-2",
          "title": "2. Calculate ideal-line voltage at 200 °C",
          "content": "The table gives 0 mV at 0 °C and 20.872 mV at 400 °C. Since 200 °C is at midrange, the endpoint line gives half the full-scale voltage.\n\nThe endpoint line has slope $20.872/400=0.05218\\ \\mathrm{mV/{}^\\circ C}$. It describes a hypothetical linear instrument with the same two endpoint outputs.\n\n$$\nE_{\\mathrm{lin}}(200)=20.872\\frac{200}{400}=10.436\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uas-q4-step-3",
          "title": "3. Compare with the actual table",
          "content": "The actual voltage at 200 °C is 9.288 mV. Its deviation is negative because it lies below the ideal line. Use the magnitude for percentage nonlinearity.\n\nUse the 20.872 mV output span as denominator. Dividing by 9.288 mV would instead describe relative error against the reading, not nonlinearity as a percentage of full scale.\n\n$$\nN(200)=9.288-10.436=-1.148\\ \\mathrm{mV}\\\\\\%N=\\frac{1.148}{20.872}\\,100\\%=5.5002\\%\n$$"
        },
        {
          "id": "2025-uas-q4-step-4",
          "title": "4. Determine the sign of the reference correction",
          "content": "The measured voltage is the measuring-junction contribution minus the reference-junction contribution. To refer it back to 0 °C, add the 25 °C contribution that the measurement has subtracted.\n\n$$\nE_T(T,25)=E_T(T,0)-E_T(25,0)\n$$"
        },
        {
          "id": "2025-uas-q4-step-5",
          "title": "5. Add the 25 °C reference voltage",
          "content": "The 25 °C table entry is 0.992 mV. Add it to the measured 11.5 mV to obtain an equivalent zero-reference voltage.\n\nThe 0.992 mV value comes from the table, not a constant-sensitivity approximation. Correcting in voltage preserves the relation even though the thermocouple curve is nonlinear.\n\n$$\nE_T(T,0)=E_T(T,25)+E_T(25,0)=11.500+0.992=12.492\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2025-uas-q4-step-6",
          "title": "6. Determine the temperature interval before its fraction",
          "content": "Since $12.461<12.492<12.518\\ \\mathrm{mV}$, temperature must lie between 258 and 259 °C. It is 0.031 mV above the lower entry within a 0.057 mV interval, slightly more than halfway through.\n\n$$\n\\lambda=\\frac{12.492-12.461}{12.518-12.461}=\\frac{0.031}{0.057}\\approx0.54386\n$$"
        },
        {
          "id": "2025-uas-q4-step-7",
          "title": "7. Interpolate temperature",
          "content": "12.492 mV lies between 12.461 mV at 258 °C and 12.518 mV at 259 °C. It is 0.031 mV above the lower entry in a 0.057 mV interval.\n\nIn general, $T=T_{\\mathrm{low}}+\\lambda(T_{\\mathrm{high}}-T_{\\mathrm{low}})$. Here the interval is 1 °C, so 0.54386 is directly the number of degrees above 258 °C.\n\n$$\nT=258+\\frac{12.492-12.461}{12.518-12.461}=258.5439^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2025-uas-q4-step-8",
          "title": "8. Check the result before rounding",
          "content": "The 258.5439 °C result lies within the selected table interval. The 5.5002% value answers nonlinearity at 200 °C;258.5439 °C answers the reading with a 25 °C reference. They answer different subparts and require no further correction of one by the other."
        }
      ],
      "finalAnswer": "Nonlinearity at 200 °C is 5.50% of full scale. After cold-junction correction, vessel temperature is about 258.54 °C.\n\n$$\n\\boxed{\\%N_{200}=5.50\\%\\ \\mathrm{FS},\\qquad T\\approx258.54^\\circ\\mathrm C}\n$$",
      "takeaway": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup.",
      "sourceNotes": [
        "Use the nonlinearity definition in Part 1, PDF pages 12-13: deviation from an endpoint line differs from local sensitivity $dE/dT$. Divide the deviation magnitude at $200^\\circ\\mathrm C$ by the table voltage span, not by the temperature $200^\\circ\\mathrm C$. For part (b), the reference-temperature influence on PDF page 14 explains why you add the reference voltage before finding temperature."
      ]
    },
    "2024-uts1-q1": {
      "title": "Thermistor resistance from two calibration points",
      "source": "Midterm 1 2024 · Question 1",
      "assumptions": [
        "The supplied exponential model is assumed valid between the two calibration points. Measurement-current self-heating is neglected."
      ],
      "exam": {
        "term": "Midterm 1"
      },
      "tags": [
        "Temperature sensors"
      ],
      "statement": "A thermistor follows $R(\\theta)=\\alpha e^{\\beta/\\theta}$, where $\\theta$ is in kelvin. Given $R(273.15\\ \\mathrm K)=9.00\\ \\mathrm{k\\Omega}$ and $R(373.15\\ \\mathrm K)=0.50\\ \\mathrm{k\\Omega}$, find its resistance at 25°C.",
      "simulation": {
        "title": "Thermistor",
        "caption": "Two calibration points determine the exponential curve; the control uses °C while the model uses kelvin.",
        "params": [
          {
            "key": "temperature",
            "label": "Temperature"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uts1-q1-step-1",
          "title": "Identify the model and the temperature to insert",
          "content": "Resistance falls from 9.00 kΩ to 0.50 kΩ as temperature rises, consistent with an **NTC thermistor**, whose resistance falls when heated. We use the supplied exponential model because straight-line interpolation would ignore that model.\n\nThe model uses absolute temperature $\\theta$ in kelvin. Since temperature appears in a denominator, convert 25°C to $25+273.15=298.15$ K before calculating.\n\n$$\n\\theta_1=273.15\\ \\mathrm K,\\quad\\theta_2=373.15\\ \\mathrm K,\\quad\\theta=298.15\\ \\mathrm K\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Reference, polarity, and temperature scale must match the sensor model.",
            "commonPitfall": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup."
          },
          "checkpoint": {
            "prompt": "A thermistor is calibrated with $R=\\alpha e^{\\beta/\\theta}$, where $\\theta$ is in kelvin. A student inserts numerical Celsius temperatures into the same model without changing its constants. Which assessment is correct?",
            "options": [
              {
                "id": "2024-uts1-q1-checkpoint-option-1",
                "label": "The result is unchanged because one-kelvin and one-degree-Celsius increments are equal.",
                "feedback": "Equal temperature increments do not make $1/\\theta$ equal. Here $\\theta$ appears in a denominator, not merely as a temperature difference."
              },
              {
                "id": "2024-uts1-q1-checkpoint-option-2",
                "label": "It is correct if resistance is expressed in kilohms.",
                "feedback": "Resistance units affect the scale of $\\alpha$, not the temperature zero point. Changing Ω to kΩ cannot correct the wrong temperature scale."
              },
              {
                "id": "2024-uts1-q1-checkpoint-option-3",
                "label": "It is wrong because the model uses reciprocal absolute temperature; changing the zero point changes $\\beta/\\theta$.",
                "feedback": "Correct. Convert temperature to kelvin before using the model and its calibrated constants."
              },
              {
                "id": "2024-uts1-q1-checkpoint-option-4",
                "label": "It is wrong only below 0°C; the scales are interchangeable at positive temperatures.",
                "feedback": "Celsius and kelvin values still differ at positive temperatures. The issue is using a scale inconsistent with the model."
              }
            ]
          }
        },
        {
          "id": "2024-uts1-q1-step-2",
          "title": "Write the model at both known points",
          "content": "The constants $\\alpha,\\beta$ are unknown. Two calibration points provide two equations. Resistance can stay in kΩ as long as all resistances and $\\alpha$ use that same unit.\n\nThe next step eliminates $\\alpha$, leaving an equation containing only $\\beta$.\n\n$$\n9.00=\\alpha e^{\\beta/273.15},\\qquad0.50=\\alpha e^{\\beta/373.15}\\quad[R,\\alpha\\text{ in k}\\Omega]\n$$"
        },
        {
          "id": "2024-uts1-q1-step-3",
          "title": "Divide the equations to eliminate α",
          "content": "Divide the first equation by the second. The $\\alpha$ factors cancel. Since $e^a/e^b=e^{a-b}$, a difference of reciprocal temperatures appears.\n\nThe resistance ratio $9/0.5=18$ is dimensionless. Apply the natural logarithm to recover the exponent.\n\n$$\n\\frac{9.00}{0.50}=e^{\\beta(1/273.15-1/373.15)}\\quad\\Longrightarrow\\quad\\ln18=\\beta\\left(\\frac1{273.15}-\\frac1{373.15}\\right)\n$$"
        },
        {
          "id": "2024-uts1-q1-step-4",
          "title": "Calculate β and interpret its units",
          "content": "Divide both sides by the reciprocal-temperature difference. The numerator $\\ln18$ is dimensionless and the denominator has units $\\mathrm K^{-1}$, so $\\beta$ has kelvin units.\n\nA positive $\\beta$ makes $\\beta/\\theta$ decrease as temperature rises, lowering resistance. The sign matches the observations.\n\n$$\n\\beta=\\frac{\\ln18}{1/273.15-1/373.15}=\\frac{2.89037176}{1/273.15-1/373.15}=2946.0381\\ \\mathrm K\n$$"
        },
        {
          "id": "2024-uts1-q1-step-5",
          "title": "Use one calibration point as a resistance reference",
          "content": "We could calculate $\\alpha$, but for a new temperature it is shorter to divide $R(\\theta)$ by $R(\\theta_1)$. The constant $\\alpha$ cancels again.\n\nThe following form directly uses the 9.00 kΩ resistance at the ice point. It is the same exponential model, not a new one.\n\n$$\nR(\\theta)=R(\\theta_1)\\exp\\!\\left[\\beta\\left(\\frac1\\theta-\\frac1{\\theta_1}\\right)\\right]\n$$"
        },
        {
          "id": "2024-uts1-q1-step-6",
          "title": "Insert 25°C in kelvin",
          "content": "Insert $\\theta=298.15$ K and the fitted $\\beta$. Since 298.15 exceeds 273.15, the reciprocal difference is negative and the exponential factor must be below one.\n\nThe result is about 3.6432 kΩ, or 3643.2 Ω. If calculated, $\\alpha$ is about 0.000186292 kΩ; it is not the resistance at 0°C.\n\n$$\nR(298.15)=9.00\\exp\\!\\left[2946.0381\\left(\\frac1{298.15}-\\frac1{273.15}\\right)\\right]=3.643200\\ \\mathrm{k\\Omega}\n$$"
        },
        {
          "id": "2024-uts1-q1-step-7",
          "title": "Check against both calibration points",
          "content": "25°C lies between 0 and 100°C. The 3.6432 kΩ result lies between 9.00 and 0.50 kΩ and decreases as temperature rises. Both checks agree with NTC behaviour.\n\nThe result need not lie on a straight line between the data. The exponential relation gives a different resistance change per degree at different temperatures."
        }
      ],
      "finalAnswer": "Resistance at 25°C is about 3.643 kΩ. The model calibration gives β ≈ 2946.04 K.\n\n$$\n\\boxed{R(25^\\circ\\mathrm C)\\approx3.6432\\ \\mathrm{k\\Omega}}\n$$",
      "takeaway": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup.",
      "sourceNotes": [
        "Part 3, PDF pages 19-20, presents the exponential thermistor model. Part 1, PDF pages 12-13, explains why a nonlinear sensor does not have one constant sensitivity. For this problem, $\\ln R=\\ln\\alpha+\\beta/\\theta$ is a line against $1/\\theta$, not against $\\theta$. Use both reference temperatures in kelvin and keep the result within the stated model limits."
      ]
    },
    "2024-uts2-q1": {
      "title": "Choosing a sensor and finding the reference temperature",
      "source": "Midterm 2 2024 · Question 1",
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Temperature sensors"
      ],
      "statement": "1. Temperature Sensors: RTD, Thermistor, Thermocouple\n\n(a) [5%] What are the differences between an RTD (Resistance Temperature Detector) and a thermistor, in terms of their characteristics and measurement ranges?\n\n(b) [5%] If you need to measure the temperature of approximately 1000°C, which sensor would you choose among an RTD, a thermistor, and a thermocouple? Explain why you choose this sensor.\n\n(c) [10%] A type J thermocouple is used to measure temperature $T_1$, with the reference temperature $T_2$, as shown in the figure below. The voltage output is measured using a voltmeter. If the measured temperature $T_1$ is 450°C and the voltage recorded by the voltmeter is 15 mV, determine the reference temperature $T_2$. Use the table provided on the last page to answer this question.",
      "simulation": {
        "title": "Thermocouple",
        "caption": "Measured voltage is the difference between the hot- and reference-junction table values.",
        "params": [
          {
            "key": "temperature",
            "label": "Temperature"
          },
          {
            "key": "referenceTemperature",
            "label": "Reference temperature"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uts2-q1-step-1",
          "title": "a · What changes as temperature rises?",
          "content": "An **RTD** measures temperature through metal resistance. A **thermistor** uses the temperature-dependent resistance of semiconductor material. A circuit supplies a measuring current and reads voltage or resistance. We compare their temperature and resistance relationships to choose a suitable sensor.\n\nAn RTD uses a metal such as platinum. Within its operating range, resistance usually rises approximately linearly with temperature. “Approximately linear” means a fairly steady slope, not an identical slope at every temperature.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Reference, polarity, and temperature scale must match the sensor model.",
            "commonPitfall": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup."
          },
          "checkpoint": {
            "prompt": "A type J measuring junction stays at a constant temperature. Its reference junction warms, but the device keeps using the old reference compensation. Within the table range where voltage rises with temperature, what is most likely?",
            "options": [
              {
                "id": "2024-uts2-q1-checkpoint-option-1",
                "label": "Voltage falls and the device can report a measuring temperature that is too low.",
                "feedback": "Correct. Higher reference voltage reduces the measured difference; compensation must track the new reference temperature."
              },
              {
                "id": "2024-uts2-q1-checkpoint-option-2",
                "label": "Voltage rises because both junctions add voltage with the same sign.",
                "feedback": "The junction contributions subtract under the circuit polarity; they do not add with the same sign."
              },
              {
                "id": "2024-uts2-q1-checkpoint-option-3",
                "label": "Voltage stays fixed because only the measuring junction affects it.",
                "feedback": "Voltage depends on both measuring and reference temperatures. Ignoring the reference changes the reading’s interpretation."
              },
              {
                "id": "2024-uts2-q1-checkpoint-option-4",
                "label": "Voltage falls, proving that the object temperature fell by the same amount.",
                "feedback": "The object temperature is fixed in the scenario. Reference changes can alter the reading without any object-temperature change."
              }
            ]
          },
          "simulation": {
            "title": "Resistive temperature sensor",
            "caption": "Compare rising RTD resistance with falling NTC resistance.",
            "params": [
              {
                "key": "temperature",
                "label": "Temperature"
              }
            ]
          }
        },
        {
          "id": "2024-uts2-q1-step-2",
          "title": "a · Identify thermistor sensitivity and limits",
          "content": "The thermistor in the notes is an **NTC** type: its resistance falls as temperature rises. Its resistance change per degree can exceed an RTD’s, making small temperature changes easier to detect. Its slope varies with temperature, so one linear conversion factor may be insufficient.\n\nBoth need a measuring current. That current heats the sensor. Excessive measurement heating raises the sensor above the object’s temperature and adds error, so the current must be limited."
        },
        {
          "id": "2024-uts2-q1-step-3",
          "title": "a and b · Use the operating range to select a sensor",
          "content": "The notes give example ranges of about −196 to 482°C for an RTD and −45 to 150°C for a thermistor. These apply to the examples in the notes; the actual product’s data sheet determines its limits.\n\nAbout 1000°C exceeds both example ranges. Choose a thermocouple with a suitable type and sheath, such as a type K or N assembly rated above 1000°C. The type J in part (c) is a separate case, not evidence that all thermocouples suit 1000°C.\n\nA **thermocouple** joins two different metals and produces a voltage related to its two junction temperatures. Its type and sheath determine whether it can withstand the temperature you need to measure."
        },
        {
          "id": "2024-uts2-q1-step-4",
          "title": "c · Distinguish measuring and reference temperatures",
          "content": "Here $T_1=450^\\circ\\mathrm C$ is the measuring-junction temperature, while $T_2$ is the unknown reference-junction temperature. The table on page 4 gives $E(T,0)$: voltage at temperature $T$ with a 0°C reference.\n\nThe voltmeter reads the difference between the two junction contributions. Looking up 15 mV directly would answer a different case, one whose reference is fixed at 0°C.\n\n$$\nE(T_1,T_2)=E(T_1,0)-E(T_2,0)\n$$"
        },
        {
          "id": "2024-uts2-q1-step-5",
          "title": "c · Isolate the unknown table voltage",
          "content": "We need $E(T_2,0)$, not $E(T_1,0)$. Add $E(T_2,0)$ to both sides, then subtract the measured voltage from both sides. The rearrangement explains why we subtract the 15 mV reading.\n\n$$\n\\begin{aligned}15&=E(450,0)-E(T_2,0)\\\\15+E(T_2,0)&=E(450,0)\\\\E(T_2,0)&=E(450,0)-15\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q1-step-6",
          "title": "c · Read the type J table",
          "content": "At the 450°C row and column 0, the table gives 24.610 mV. The equivalent table voltage for the reference junction is therefore 9.610 mV. Every term in this subtraction uses mV.\n\nFind the neighbouring entries: 9.559 mV at 178°C and 9.614 mV at 179°C. The unknown temperature must lie between these temperatures.\n\n$$\nE(T_2,0)=24.610-15.000=9.610\\ \\mathrm{mV}\n$$"
        },
        {
          "id": "2024-uts2-q1-step-7",
          "title": "c · Interpolate within the one-degree interval",
          "content": "Above the lower entry, the voltage rise is $9.610-9.559=0.051$ mV. The full table interval is $9.614-9.559=0.055$ mV. We therefore move about 0.927 of the way from 178 to 179°C.\n\nThis interpolation treats only this small interval as nearly straight. It does not assume that the thermocouple is linear over its whole range.\n\n$$\nT_2=178+\\frac{0.051}{0.055}(179-178)=178.9273^\\circ\\mathrm C\\approx178.93^\\circ\\mathrm C\n$$"
        },
        {
          "id": "2024-uts2-q1-step-8",
          "title": "Check against the measured voltage",
          "content": "The result is above 0°C but below 450°C. A warmer reference reduces measured voltage, consistent with 15 mV being below 24.610 mV.\n\nSubstitute the reference voltage back: the difference is exactly 15 mV. Report about 179°C at the table’s precision.\n\n$$\n24.610-9.610=15.000\\ \\mathrm{mV}\n$$"
        }
      ],
      "finalAnswer": "Choose a suitably rated thermocouple at 1000°C. The type J reference junction in part (c) is approximately 179°C.\n\n$$\n\\boxed{T_2\\approx179^\\circ\\mathrm C}\n$$",
      "takeaway": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup.",
      "sourceNotes": [
        "Part 1, PDF page 11, separates the input range from the output range. Choose a sensor that covers the process temperature, then check installation and readout requirements in Part 3. To find the reference temperature, use $E(T_2,0)=E(T_1,0)-E_{\\mathrm{meas}}$ with the same thermocouple type and polarity. A zero-reference table does not imply that the physical reference junction is at zero."
      ]
    },
    "2024-uas-q2": {
      "title": "An RTD in a Wheatstone bridge",
      "source": "Final exam 2024 · Question 2",
      "assumptions": [
        "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
        "The ideal voltmeter draws no current; lead resistance and RTD self-heating are neglected. Output polarity is explicitly defined in the solution."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Temperature sensors"
      ],
      "statement": "2. [15%] Temperature Sensor (RTD) and Signal Conditioning (Wheatstone Bridge)\nAn RTD serves as one arm ($R_4$) of a Wheatstone bridge, as shown in figure below. The RTD is used to measure a constant temperature, with the bridge operating in deflection mode. The RTD has a resistance of 25 Ω at a temperature of 0°C, and a thermal coefficient of resistance, $\\alpha=0.003925\\ {}^\\circ\\mathrm C^{-1}$. If the RTD is subjected to a temperature of 100°C and the input voltage to the bridge is 5 V, calculate the output voltage of the bridge.\nFigure labels: $R_2=R_3=100\\ \\Omega$; $R_1=25\\ \\Omega$ at 0°C and balanced bridge conditions. Supply is between the left and right nodes; the detector is between the upper and lower nodes.\nThe resistance of the RTD as a function of temperature is given by $R(T)=R_0(1+\\alpha T)$.",
      "simulation": {
        "title": "Measurement bridge",
        "caption": "Follow the left-to-right supply: the output compares upper and lower nodes.",
        "params": [
          {
            "key": "temperature",
            "label": "Temperature"
          },
          {
            "key": "voltage",
            "label": "Supply voltage"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uas-q2-step-1",
          "title": "Identify the two linked changes",
          "content": "We first convert temperature to RTD resistance, then use resistance to calculate bridge voltage. It first changes RTD resistance, then that resistance changes the bridge’s voltage division.\n\nThe bridge operates in **deflection mode**: we read the voltage while the bridge is unbalanced. That voltage change indicates the resistance change. We do not readjust a resistor to restore a zero output.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Reference, polarity, and temperature scale must match the sensor model.",
            "commonPitfall": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup."
          },
          "checkpoint": {
            "prompt": "An RTD bridge is supplied across its left and right nodes, while a voltmeter connects the upper and lower nodes. What is the best action before calculating output?",
            "options": [
              {
                "id": "2024-uas-q2-checkpoint-option-1",
                "label": "Trace both paths from high to low supply, calculate their midpoints, then define the difference polarity.",
                "feedback": "Correct. This preserves the actual wiring and explains the numerator and denominator of each divider."
              },
              {
                "id": "2024-uas-q2-checkpoint-option-2",
                "label": "Use a memorised top-to-bottom supply formula without changing resistor pairings.",
                "feedback": "A general formula is valid only with the correct resistor and node mapping. Ignoring the supply orientation can pair the wrong arms."
              },
              {
                "id": "2024-uas-q2-checkpoint-option-3",
                "label": "Combine all resistors into one series circuit so they carry the same current.",
                "feedback": "There are two parallel paths between supply nodes, so all resistors do not carry one common series current."
              },
              {
                "id": "2024-uas-q2-checkpoint-option-4",
                "label": "Assume the voltmeter always reads zero because the circuit is a bridge.",
                "feedback": "A bridge shape does not guarantee balance. RTD change creates the potential difference read in deflection mode."
              }
            ]
          }
        },
        {
          "id": "2024-uas-q2-step-2",
          "title": "Calculate the fractional resistance change",
          "content": "The given $R_0=25\\ \\Omega$ refers to 0°C. The coefficient $\\alpha=0.003925\\ {}^\\circ\\mathrm C^{-1}$ is fractional resistance change per degree. A 100°C rise gives $\\alpha T=0.3925$, or 39.25%.\n\nMultiply the fractional change by 25 Ω to obtain a 9.8125 Ω increase. Add it to the initial resistance.\n\n$$\nR_4=R_0(1+\\alpha T)=25(1+0.3925)=25+9.8125=34.8125\\ \\Omega\n$$"
        },
        {
          "id": "2024-uas-q2-step-3",
          "title": "Follow the supply paths in the diagram",
          "content": "The supply connects left to right in the figure. Set the left node to $+5$ V and the right node to 0 V. The upper path passes through $R_2,R_3$; the lower path passes through $R_1,R_4$, the RTD.\n\nCall the upper midpoint A and the lower midpoint B. An ideal voltmeter takes no current, so each path remains a voltage divider. Pairing resistors by appearance without following the supply connections can give the wrong equation."
        },
        {
          "id": "2024-uas-q2-step-4",
          "title": "Derive voltage division from Ohm’s law",
          "content": "Two series resistors carry the same current: $I=V_s/(R_L+R_R)$. Midpoint voltage relative to the zero-volt right node equals the voltage across the right resistor, $IR_R$.\n\nThe voltage-divider relation explains why the right resistor appears in the numerator. For the upper path, that resistor is $R_3=100\\ \\Omega$.\n\n$$\nV_{\\mathrm{mid}}=V_s\\frac{R_R}{R_L+R_R},\\qquad V_A=5\\frac{100}{100+100}=2.500\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uas-q2-step-5",
          "title": "Calculate the lower midpoint with the new resistance",
          "content": "The lower path’s right resistor is the RTD. Insert $R_1=25\\ \\Omega$ and $R_4=34.8125\\ \\Omega$. The denominator is the sum of the two resistances in that path.\n\nNode B rises above 2.5 V because the RTD takes a larger fraction of the supply. Use the full equation: a 39.25% resistance increase is too large to rely on a small-change approximation.\n\n$$\nV_B=5\\frac{34.8125}{25+34.8125}=5\\frac{34.8125}{59.8125}=2.910136\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uas-q2-step-6",
          "title": "Define output polarity before subtracting",
          "content": "Define $V_o=V_B-V_A$, lower minus upper. A positive result then means node B is at the higher potential.\n\nReversing the voltmeter leads gives the negative of the same magnitude. Since the question does not label output polarity, the magnitude 0.41014 V is the invariant result.\n\n$$\nV_o=2.910136-2.500=+0.410136\\ \\mathrm V\n$$"
        },
        {
          "id": "2024-uas-q2-step-7",
          "title": "Check balance at the initial temperature",
          "content": "At 0°C, the RTD returns to 25 Ω. Both paths divide equally: 100/100 above and 25/25 below. Despite different resistance magnitudes, both midpoints are at 2.5 V.\n\nThe output is then zero, matching the stated balanced condition. This checks our circuit interpretation, not merely the arithmetic.\n\n$$\nV_o(0^\\circ\\mathrm C)=5\\frac{25}{25+25}-5\\frac{100}{100+100}=0\n$$"
        }
      ],
      "finalAnswer": "The RTD becomes 34.8125 Ω. The bridge output magnitude is approximately 0.410 V; its sign depends on detector polarity.\n\n$$\n\\boxed{R_4=34.8125\\ \\Omega,\\qquad|V_o|\\approx0.41014\\ \\mathrm V}\n$$",
      "takeaway": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup.",
      "sourceNotes": [
        "Read the RTD and bridge as separate stages, following Part 1, PDF pages 2-3. Resistance may vary linearly with temperature over the stated approximation, while bridge voltage follows a voltage-divider relation. Do not replace the node calculation with a small-signal bridge formula without checking the resistance-change limit."
      ]
    },
    "2023-uts2-q2": {
      "title": "Thermocouple and RTD response",
      "source": "Midterm 2 2023 · Question 2",
      "assumptions": [
        "The no-bias statement is interpreted for deviation variables. An absolute model with zero offset cannot satisfy the stated initial value and sensitivity together."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Temperature sensors"
      ],
      "statement": "(a) A type K thermocouple measures 340 °C with a 100 °C reference junction. Find its output using the 0 °C-reference table: $E_K(340,0)=13.874\\,\\mathrm{mV}$ and $E_K(100,0)=4.096\\,\\mathrm{mV}$.\n(b) A first-order RTD has $\\tau=0.5\\,\\mathrm{s}$ and sensitivity $0.004\\,\\Omega/{}^\\circ\\mathrm C$. The problem states no bias. Initially it is steady at $T=20\\,{}^\\circ\\mathrm C$ and $R=100\\,\\Omega$. At $t=1\\,\\mathrm{s}$, temperature becomes 100 °C. (i) Form the temperature-change-to-resistance differential equation. (ii) Find $R(2\\,\\mathrm{s})$.",
      "simulation": {
        "title": "Thermocouple",
        "caption": "Both junction temperatures determine the measured voltage.",
        "params": [
          {
            "key": "temperature",
            "label": "Temperature"
          },
          {
            "key": "referenceTemperature",
            "label": "Reference temperature"
          }
        ]
      },
      "steps": [
        {
          "id": "2023-uts2-q2-step-1",
          "title": "2a · Read what the thermocouple table represents",
          "content": "Two junctions of dissimilar metals can produce voltage when their temperatures differ. A **thermocouple**, a temperature sensor that reads this voltage, uses that effect. One temperature alone cannot determine its output.\n\nThe notation $E_K(T,0)$ means type K voltage with a measuring junction at $T$ and a reference junction at 0°C. This problem uses a 100°C reference, so the 340°C table entry is not yet the final answer.\n\n$$\nE_K(340,0)=13.874\\ \\mathrm{mV},\\qquad E_K(100,0)=4.096\\ \\mathrm{mV}\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Reference, polarity, and temperature scale must match the sensor model.",
            "commonPitfall": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup."
          },
          "checkpoint": {
            "prompt": "A thermocouple table uses a 0°C reference, but the instrument's reference junction is above 0°C. The measured voltage is known. How should the hot-junction temperature be found from the table?",
            "options": [
              {
                "id": "2023-uts2-q2-checkpoint-option-1",
                "label": "Subtract the reference table voltage from measured voltage, then look up temperature.",
                "feedback": "The reference contribution was already subtracted in the measurement. Subtracting it again applies the correction in the wrong direction."
              },
              {
                "id": "2023-uts2-q2-checkpoint-option-2",
                "label": "Look up measured voltage directly, then add reference temperature.",
                "feedback": "This assumes voltage is a linear function of temperature difference. Real tables do not follow that assumption exactly."
              },
              {
                "id": "2023-uts2-q2-checkpoint-option-3",
                "label": "Ignore the reference because a thermocouple always reports absolute hot-junction temperature.",
                "feedback": "Thermocouple output depends on both junctions. Reference temperature is needed to infer the hot-junction temperature."
              },
              {
                "id": "2023-uts2-q2-checkpoint-option-4",
                "label": "Add the reference temperature's table voltage to the measured voltage, then look up temperature from that total.",
                "feedback": "Correct. Put the voltage on the same reference basis before using the table to find temperature."
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q2-step-2",
          "title": "Subtract two voltages with the same reference",
          "content": "We subtract the 100°C table voltage from the 340°C table voltage to remove the common 0°C reference contribution. The result is the voltage between the two stated temperatures.\n\nThe value is positive because the measuring junction is hotter under the table's polarity convention. Do not look up 240°C: subtracting temperatures first would assume a linear relationship between temperature and voltage.\n\n$$\nE_K(340,100)=E_K(340,0)-E_K(100,0)=13.874-4.096=\\boxed{9.778\\ \\mathrm{mV}}\n$$"
        },
        {
          "id": "2023-uts2-q2-step-3",
          "title": "2b(i) · Separate the RTD baseline from its change",
          "content": "A metal element changes resistance as its temperature changes. An **RTD**, a temperature sensor with a metal resistance element, reads that change. Sensitivity 0.004 Ω/°C means a 1°C rise produces a final resistance rise of 0.004 Ω.\n\nThe baseline is given: 20°C and 100 Ω. We define $\\Delta T=T-20$ and $\\Delta R=R-100$. Both changes are zero before the temperature step.\n\nThe no-bias statement fits these changes. An absolute model $R=0.004T$ would give 0.08 Ω at 20°C, contradicting the stated baseline.\n\n$$\n\\Delta T=T-20,\\qquad \\Delta R=R-100\n$$"
        },
        {
          "id": "2023-uts2-q2-step-4",
          "title": "Form the first-order model",
          "content": "First order means the equation contains the first time derivative of the output. The time constant $\\tau$ sets response speed; a larger $\\tau$ makes the output approach its final value more slowly.\n\nThe term $K\\Delta T$ is the target steady resistance change. The term $\\tau\\,d\\Delta R/dt$ accounts for the temporary difference between that target and the current resistance change.\n\n$$\n\\tau\\frac{d\\Delta R}{dt}+\\Delta R=K\\Delta T\\quad\\Rightarrow\\quad0.5\\frac{d\\Delta R}{dt}+\\Delta R=0.004\\Delta T\n$$",
          "simulation": {
            "title": "Resistive temperature sensor",
            "caption": "Resistance responds when temperature changes at t=1 s.",
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
          }
        },
        {
          "id": "2023-uts2-q2-step-5",
          "title": "Write the equation using absolute temperature and resistance",
          "content": "The 100 Ω baseline is constant, so its derivative is zero: $d(R-100)/dt=dR/dt$. We substitute the two deviation definitions to obtain the requested model.\n\nCheck the units: 0.5 s times a resistance rate in Ω/s gives Ω. The right side also has units Ω because sensitivity in Ω/°C multiplies a temperature change in °C.\n\n$$\n\\boxed{0.5\\frac{dR}{dt}+R-100=0.004(T-20)}\n$$"
        },
        {
          "id": "2023-uts2-q2-step-6",
          "title": "Find the final resistance after the temperature step",
          "content": "At steady state, resistance no longer changes with time, so its derivative is zero. The model then becomes resistance change = sensitivity × temperature change.\n\nTemperature rises from 20°C to 100°C, a change of 80°C. The final resistance change is 0.320 Ω; add it to the 100 Ω baseline rather than replacing that baseline.\n\n$$\n\\Delta T=100-20=80^\\circ\\mathrm C,\\quad\\Delta R_\\infty=0.004(80)=0.320\\ \\Omega,\\quad R_\\infty=100.320\\ \\Omega\n$$"
        },
        {
          "id": "2023-uts2-q2-step-7",
          "title": "Start the response clock at the temperature step",
          "content": "Temperature has not changed before t=1 s. Since the sensor starts at equilibrium, resistance remains 100 Ω during that interval.\n\nFor $t\\ge1$, use elapsed time $t-1$. At the reading time t=2 s, the response has lasted only 1 s. With $\\tau=0.5$ s, this is two time constants.\n\n$$\n\\Delta t=t-t_0=2-1=1\\ \\mathrm s,\\qquad\\frac{\\Delta t}{\\tau}=\\frac{1}{0.5}=2\n$$"
        },
        {
          "id": "2023-uts2-q2-step-8",
          "title": "Use a response that satisfies the initial condition",
          "content": "A first-order step response leaves a fraction $e^{-\\Delta t/\\tau}$ of the change unfinished. The completed fraction is therefore $1-e^{-\\Delta t/\\tau}$.\n\nWe multiply the completed fraction by the final change of 0.320 Ω, then add initial resistance. At t=1 s, the exponential equals one, leaving zero output change.\n\n$$\nR(t)=100+0.320\\left(1-e^{-(t-1)/0.5}\\right),\\qquad t\\ge1\n$$",
          "simulation": {
            "title": "Resistive temperature sensor",
            "caption": "Compare current resistance with its final value.",
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
          }
        },
        {
          "id": "2023-uts2-q2-step-9",
          "title": "2b(ii) · Evaluate resistance at t=2 s",
          "content": "We substitute the elapsed time of 1 s. Since $e^{-2}=0.135335$, the completed fraction is $1-0.135335=0.864665$.\n\nThe resistance increase at the reading time is about 0.276693 Ω. Add that increase to 100 Ω to obtain the sensor reading.\n\n$$\n\\begin{aligned}R(2)&=100+0.320(1-e^{-2})\\\\&=100+0.320(0.864665)\\\\&=\\boxed{100.27669\\ \\Omega}\\end{aligned}\n$$",
          "simulation": {
            "title": "Resistive temperature sensor",
            "caption": "The point at t=2 s shows the calculated reading.",
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
          }
        },
        {
          "id": "2023-uts2-q2-step-10",
          "title": "Check the limits and the meaning of sensitivity",
          "content": "The result lies between 100 Ω and 100.320 Ω, as expected while the sensor approaches equilibrium. At very long times the exponential approaches zero and resistance approaches 100.320 Ω.\n\nDo not multiply 0.004 by 100 Ω again. Its stated units Ω/°C already describe the resistance change directly. A relative coefficient per °C would require different units and a different model."
        }
      ],
      "finalAnswer": "Thermocouple output is 9.778 mV. Use the RTD deviation model about 20 °C and 100 Ω; at t=2 s, resistance is 100.27669 Ω.\n\n$$\n\\boxed{\\begin{aligned}E_K&=9.778\\ \\mathrm{mV}\\\\R(2)&=100.27669\\ \\Omega\\end{aligned}}\n$$",
      "takeaway": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup.",
      "sourceNotes": [
        "Part 2, PDF pages 6-7, supplies the time-response model that a sensor table alone does not provide. Work with changes from the initial state: $\\Delta R=R-100\\ \\Omega$ and $\\Delta T=T-20^\\circ\\mathrm C$. Then $\\tau\\,d\\Delta R/dt+\\Delta R=K\\Delta T$, which preserves the stated initial condition.",
        "Measure elapsed time from the temperature change, using $t-1\\ \\mathrm s$. At $t=2\\ \\mathrm s$, two time constants have elapsed. Part (a) still uses the thermocouple reference-junction relation; the dynamic equation applies to the RTD part."
      ]
    },
    "ipe-temperature-practice": {
      "title": "Practice: Temperature sensors",
      "intro": "This practice helps you choose a model and explain your reasoning. Start with multiple-choice questions, review a flawed example, then write your own answer. Use the rubric to check your logic, assumptions, and conclusion limits.",
      "questions": [
        {
          "id": "concept-2023-05",
          "prompt": "A thermocouple table uses a 0°C reference, but the instrument's reference junction is above 0°C. The measured voltage is known. How should the hot-junction temperature be found from the table?",
          "options": [
            {
              "id": "concept-2023-05-option-1",
              "label": "Subtract the reference table voltage from measured voltage, then look up temperature.",
              "feedback": "The reference contribution was already subtracted in the measurement. Subtracting it again applies the correction in the wrong direction."
            },
            {
              "id": "concept-2023-05-option-2",
              "label": "Look up measured voltage directly, then add reference temperature.",
              "feedback": "This assumes voltage is a linear function of temperature difference. Real tables do not follow that assumption exactly."
            },
            {
              "id": "concept-2023-05-option-3",
              "label": "Ignore the reference because a thermocouple always reports absolute hot-junction temperature.",
              "feedback": "Thermocouple output depends on both junctions. Reference temperature is needed to infer the hot-junction temperature."
            },
            {
              "id": "concept-2023-05-option-4",
              "label": "Add the reference temperature's table voltage to the measured voltage, then look up temperature from that total.",
              "feedback": "Correct. Put the voltage on the same reference basis before using the table to find temperature."
            }
          ],
          "explanation": "Measured voltage equals the hot-junction table voltage minus the reference-junction table voltage. Recover the hot-junction voltage relative to 0°C by adding the reference contribution. Adding temperatures after lookup is generally invalid because the relationship between temperature and voltage is nonlinear."
        },
        {
          "id": "concept-2024-01",
          "prompt": "A type J measuring junction stays at a constant temperature. Its reference junction warms, but the device keeps using the old reference compensation. Within the table range where voltage rises with temperature, what is most likely?",
          "options": [
            {
              "id": "concept-2024-01-option-1",
              "label": "Voltage falls and the device can report a measuring temperature that is too low.",
              "feedback": "Correct. Higher reference voltage reduces the measured difference; compensation must track the new reference temperature."
            },
            {
              "id": "concept-2024-01-option-2",
              "label": "Voltage rises because both junctions add voltage with the same sign.",
              "feedback": "The junction contributions subtract under the circuit polarity; they do not add with the same sign."
            },
            {
              "id": "concept-2024-01-option-3",
              "label": "Voltage stays fixed because only the measuring junction affects it.",
              "feedback": "Voltage depends on both measuring and reference temperatures. Ignoring the reference changes the reading’s interpretation."
            },
            {
              "id": "concept-2024-01-option-4",
              "label": "Voltage falls, proving that the object temperature fell by the same amount.",
              "feedback": "The object temperature is fixed in the scenario. Reference changes can alter the reading without any object-temperature change."
            }
          ],
          "explanation": "A thermocouple reads the difference between the two junction contributions. A warmer reference reduces voltage at unchanged measuring temperature. Old compensation adds too little reference voltage, so the inferred temperature can be too low."
        },
        {
          "id": "concept-2024-02",
          "prompt": "A thermistor is calibrated with $R=\\alpha e^{\\beta/\\theta}$, where $\\theta$ is in kelvin. A student inserts numerical Celsius temperatures into the same model without changing its constants. Which assessment is correct?",
          "options": [
            {
              "id": "concept-2024-02-option-1",
              "label": "The result is unchanged because one-kelvin and one-degree-Celsius increments are equal.",
              "feedback": "Equal temperature increments do not make $1/\\theta$ equal. Here $\\theta$ appears in a denominator, not merely as a temperature difference."
            },
            {
              "id": "concept-2024-02-option-2",
              "label": "It is correct if resistance is expressed in kilohms.",
              "feedback": "Resistance units affect the scale of $\\alpha$, not the temperature zero point. Changing Ω to kΩ cannot correct the wrong temperature scale."
            },
            {
              "id": "concept-2024-02-option-3",
              "label": "It is wrong because the model uses reciprocal absolute temperature; changing the zero point changes $\\beta/\\theta$.",
              "feedback": "Correct. Convert temperature to kelvin before using the model and its calibrated constants."
            },
            {
              "id": "concept-2024-02-option-4",
              "label": "It is wrong only below 0°C; the scales are interchangeable at positive temperatures.",
              "feedback": "Celsius and kelvin values still differ at positive temperatures. The issue is using a scale inconsistent with the model."
            }
          ],
          "explanation": "Temperature differences have the same size on both scales, but numerical temperatures and their reciprocals differ. The model constants were fitted using kelvin. Inserting Celsius changes the model and even creates division by zero at 0°C."
        },
        {
          "id": "concept-2025-02",
          "prompt": "You connect copper wires to a thermocouple pair through two terminals. Both terminals remain at the same temperature. Why can these added connections introduce no extra net voltage in the ideal model?",
          "options": [
            {
              "id": "concept-2025-02-option-1",
              "label": "Every third metal cancels the entire thermocouple voltage at any temperature.",
              "feedback": "An added metal does not cancel the whole measuring voltage. Cancellation concerns the added contributions and requires equal junction temperatures."
            },
            {
              "id": "concept-2025-02-option-2",
              "label": "Low copper resistance guarantees that neither connection can generate thermal voltage.",
              "feedback": "Low resistance can reduce electrical voltage drop, but does not ensure thermal-voltage cancellation. The key condition here is equal terminal temperatures."
            },
            {
              "id": "concept-2025-02-option-3",
              "label": "The added connections eliminate the need to know the thermocouple reference temperature.",
              "feedback": "Cancellation at added connections does not change the table reference. You still need to know and, when needed, compensate the reference temperature."
            },
            {
              "id": "concept-2025-02-option-4",
              "label": "The added junction pair has cancelling contributions when both junctions share a temperature; a terminal temperature difference can add error.",
              "feedback": "Correct. The statement identifies both cancellation and the temperature condition that makes it valid."
            }
          ],
          "explanation": "The law of intermediate metals permits an added metal when the two resulting junctions share the same temperature. Equal junction temperatures make their added contributions cancel. Reference compensation is still required when the table uses a different reference temperature."
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-temperature-guided",
          "title": "Review the thermocouple-compensation order",
          "prompt": "The reference junction is warmer than the table reference. Check this approach.",
          "workSample": "I read a temperature from the measured voltage using the 0 °C table. Then I add the reference temperature to that temperature result.",
          "question": {
            "prompt": "Which order suits a nonlinear thermocouple curve?",
            "options": [
              {
                "id": "ipe-temperature-guided-question-option-1",
                "label": "Add the reference voltage, then look up temperature from the corrected voltage.",
                "feedback": "Correct. The addition relation applies to voltages with suitable references."
              },
              {
                "id": "ipe-temperature-guided-question-option-2",
                "label": "Add temperatures directly without checking the curve.",
                "feedback": "The voltage-temperature relation can be nonlinear. Adding temperatures does not generally reproduce voltage compensation."
              },
              {
                "id": "ipe-temperature-guided-question-option-3",
                "label": "Ignore the reference because all voltages share the same unit.",
                "feedback": "Matching units do not mean the temperature references already match."
              }
            ],
            "explanation": "Find the reference equivalent voltage in the table. Add it to the measured voltage with the correct polarity. Use the total to find the measuring-junction temperature."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-temperature-essay",
          "title": "Investigate a falling thermocouple reading",
          "prompt": "Process temperature stays constant, but a thermocouple reading falls as its terminals warm. Plan a diagnosis that distinguishes a process change from a reference-compensation error.",
          "sections": [
            "Model and assumptions",
            "Reasoning",
            "Conclusion and limits"
          ],
          "hints": [
            "A thermocouple involves two junction temperatures.",
            "Compare the reference temperature used by the device with the actual terminal temperature.",
            "Trace measured voltage, reference correction, and table lookup separately."
          ],
          "rubric": [
            {
              "id": "ipe-temperature-rubric-model",
              "label": "Model and assumptions",
              "fullCredit": "States the roles of the measuring and reference junctions and identifies the table type.",
              "commonPartialError": "Do not simply add reference temperature to a temperature obtained from an uncorrected table lookup."
            },
            {
              "id": "ipe-temperature-rubric-reasoning",
              "label": "Reasoning",
              "fullCredit": "Traces the voltage change as the reference warms and checks the device compensation value."
            },
            {
              "id": "ipe-temperature-rubric-conclusion",
              "label": "Conclusion and limits",
              "fullCredit": "Proposes a reference check or independent temperature reference before concluding that the process changed."
            }
          ],
          "verifiedOutline": "Confirm process temperature with a suitable reference. Record terminal temperature and the compensation value used by the device. With the usual polarity, warming the reference reduces measured voltage at fixed process temperature. Compensation that fails to update can make the displayed temperature fall. Check thermocouple type, polarity, table, and reference sensor. Retest after correction to see whether the symptom disappears."
        }
      ]
    }
  }
};

import type { CourseModule, CourseTranslation } from '@tutor/core';

export const module: CourseModule = {
  "id": "ipe-position",
  "code": "M8",
  "title": "Posisi, perpindahan, dan regangan",
  "items": [
    {
      "id": "ipe-position-material",
      "kind": "material",
      "slug": "ipe-position-material",
      "title": "Pilih sinyal yang membedakan posisi",
      "estimatedMinutes": 9,
      "examHook": {
        "prompt": "Poros bergerak saat daya mati. Sensor apa yang dapat membaca posisi dalam satu putaran saat daya kembali?",
        "targetOutcome": "Anda dapat menjelaskan acuan posisi dan informasi arah dari keluaran sensor."
      },
      "body": "Sensor posisi memakai perubahan yang dapat dibaca rangkaian. Perubahan itu dapat berupa kode, fase, amplitudo, tahanan, atau kapasitansi. Anda perlu menghubungkan keluaran tersebut dengan posisi serta arah yang ingin diketahui.\n\nPeriksa apakah sensor memerlukan posisi acuan awal. Periksa juga apakah dua posisi dapat menghasilkan sinyal yang tampak sama.\n\n[Buka pembahasan bertahap: Tinggi cairan dari waktu ultrasonik](?item=2025-uts2-q3).",
      "microUnits": [
        {
          "id": "ipe-position-principle",
          "title": "Pilih model dari kondisi soal",
          "intuition": "Encoder absolut memberi kode yang terkait posisi. Encoder inkremental menghitung perpindahan dari acuan. Resolver memberi pasangan sinyal yang terkait sinus dan kosinus sudut. **Kuadran** (wilayah sudut menurut tanda kedua sinyal) membantu Anda membedakan sudut dengan rasio yang sama.",
          "formal": "Untuk pasangan resolver ideal:\n\n$$V_s=K\\sin\\theta,\\qquad V_c=K\\cos\\theta.$$\n\nPembacaan sudut menggunakan kedua tanda, misalnya melalui $\\operatorname{atan2}(V_s,V_c)$.",
          "validityBounds": "Pasangan resolver perlu amplitudo dan acuan fase yang sesuai. Encoder absolut satu putaran tidak otomatis menghitung jumlah putaran. Pada LVDT, bedakan eksitasi internal AC dari catu luar DC.",
          "decisionCheck": {
            "id": "ipe-position-decision-question",
            "prompt": "DC LVDT menerima catu luar DC. Apakah kumparan pengindranya pasti bekerja dengan medan tetap?",
            "options": [
              {
                "id": "ipe-position-decision-question-option-1",
                "label": "Tidak; rangkaian internal dapat membangkitkan eksitasi AC.",
                "feedback": "Tepat. Catu luar dan bentuk sinyal internal merupakan hal berbeda."
              },
              {
                "id": "ipe-position-decision-question-option-2",
                "label": "Ya; jenis catu luar selalu sama dengan eksitasi internal.",
                "feedback": "Rangkaian internal dapat mengubah catu DC menjadi eksitasi AC.",
                "misconceptionTag": "position-decision-choice-2"
              },
              {
                "id": "ipe-position-decision-question-option-3",
                "label": "Ya; keluaran DC berarti alat tidak dapat memakai induksi.",
                "feedback": "Rangkaian dapat menyearahkan atau mengolah sinyal induksi menjadi keluaran DC.",
                "misconceptionTag": "position-decision-choice-3"
              }
            ],
            "correctOptionId": "ipe-position-decision-question-option-1",
            "explanation": "Baca fungsi tiap tahap. DC LVDT dapat memuat pembangkit AC dan pengolah keluaran di dalam perangkat."
          }
        },
        {
          "id": "ipe-position-resolution",
          "title": "Bedakan resolusi, sensitivitas, dan akurasi",
          "intuition": "Bagian 1, halaman PDF 13-14, memberi dua ukuran yang berbeda. Sensitivitas menyatakan perubahan keluaran per perubahan input. Resolusi menyatakan selang input yang belum menghasilkan perubahan keluaran yang bisa dibedakan. Keduanya belum mencakup seluruh galat sistem.",
          "formal": "Untuk keluaran kontinu $O(I)$, sensitivitas lokal ialah $dO/dI$. Untuk encoder absolut $n$ bit yang mencakup satu putaran, jumlah kode $2^n$ memberi langkah sudut $\\Delta\\theta=360^\\circ/2^n$. Encoder 8 bit memiliki 256 kode, sehingga langkahnya $1.40625^\\circ$.",
          "validityBounds": "Rumus langkah sudut menganggap kode terbagi rata dalam satu putaran. Periksa apakah jumlah hitungan encoder inkremental memakai satu tepi atau empat tepi per siklus. Jangan menyamakan jarak antarkode dengan batas galat total.",
          "decisionCheck": {
            "id": "ipe-position-resolution-check",
            "prompt": "Encoder absolut 8 bit mencakup satu putaran. Kesimpulan mana yang langsung mengikuti jumlah bitnya?",
            "options": [
              {
                "id": "ipe-position-resolution-option-1",
                "label": "Ada 256 kode dengan langkah nominal 360°/256.",
                "feedback": "Tepat. Itu menyatakan pembagian posisi nominal."
              },
              {
                "id": "ipe-position-resolution-option-2",
                "label": "Setiap hasil pasti bebas galat sampai delapan angka desimal.",
                "feedback": "Bit menyatakan kode biner, bukan jumlah angka desimal yang akurat.",
                "misconceptionTag": "ipe-position-resolution-error-2"
              },
              {
                "id": "ipe-position-resolution-option-3",
                "label": "Sensitivitas setiap sensor posisi pasti sama dengan 8 V/derajat.",
                "feedback": "Jumlah bit tidak menentukan sensitivitas tegangan sensor.",
                "misconceptionTag": "ipe-position-resolution-error-3"
              }
            ],
            "explanation": "Jumlah bit menentukan jumlah kode dan langkah nominal. Akurasi sistem juga bergantung pada kesalahan alat, pembacaan, dan pemasangan.",
            "correctOptionId": "ipe-position-resolution-option-1"
          }
        }
      ],
      "checkpoints": [
        "Anda dapat menjelaskan acuan posisi dan informasi arah dari keluaran sensor.",
        "Informasi posisi bergantung pada kode, acuan, dan tanda sinyal yang benar-benar tersedia.",
        "Rasio dua sinyal saja dapat menghilangkan informasi kuadran."
      ],
      "derivations": [
        {
          "id": "ipe-position-sources",
          "title": "Sumber dan cara membaca arsip",
          "content": "Baca bagian yang sesuai dengan model yang Anda pakai. Nomor di bawah menghitung halaman PDF dari 1; satu halaman dapat memuat beberapa slide.\n\n[Pengukuran Teknik, Bagian 1 (2022)](https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view), halaman PDF 2, 3, 8, 12, 13, 14: Fungsi tahap pengukuran, pengondisi sinyal, sensitivitas, dan resolusi.\n\n[Pengukuran Teknik, Bagian 2 (2022)](https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view), halaman PDF 4, 7, 8, 10: Kompensasi suhu pada gauge serta model orde dua dan batas frekuensi akselerometer.\n\n[Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view), halaman PDF 14, 15, 16, 17, 18, 19, 20, 21, 22, 23: Sensor posisi, encoder, LVDT, strain gauge, dan susunan sensor perpindahan.\n\n[Arsip soal UTS 1, UTS 2, dan UAS 2023 sampai 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Setiap soal menyimpan naskah, halaman ujian, dan asumsi tersendiri."
        }
      ]
    },
    {
      "id": "2025-uts2-q3",
      "kind": "problem",
      "slug": "2025-uts2-q3",
      "title": "Tinggi cairan dari waktu ultrasonik",
      "source": "UTS 2 2025 · Soal 3",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
        "file": "2025-uts2.pdf",
        "pages": [
          2
        ],
        "original": "3. Ultrasonic Sensor\nAn ultrasonic sensor is used to monitor the fluid level in a tank. The sensor is installed above the tank. When the tank is empty, it takes 200 ms for the ultrasonic waves to travel from sensor to the fluid surface and then back to sensor. When the fluid in the tank is at height h, it takes 100 ms for the ultrasonic waves to travel from the sensor to the fluid surface and then back to sensor. The ultrasound travel in the air with speed of 330 m/s.\na. [10%] Draw a schematic of this measurement setup and briefly explain how it works.\nb. [15%] Calculate the fluid height (h).",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              2,
              3
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              16
            ]
          }
        ]
      },
      "assumptions": [
        "Saat tangki kosong, frasa “fluid surface” pada sumber kita baca sebagai dasar atau permukaan acuan kosong. Kedua waktu merupakan waktu pulang-pergi."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2025,
        "number": 3
      },
      "difficulty": "menengah",
      "estimatedMinutes": 14,
      "tags": [
        "Posisi, perpindahan, dan regangan"
      ],
      "statement": "Sensor ultrasonik berada di atas tangki. Waktu tempuh pulang-pergi saat kosong ialah $200\\ \\mathrm{ms}$, dan saat cairan setinggi $h$ ialah $100\\ \\mathrm{ms}$. Cepat rambat bunyi di udara $330\\ \\mathrm{m/s}$.\n(a) Gambar susunan pengukuran dan jelaskan cara kerjanya. (b) Hitung tinggi cairan $h$.",
      "simulation": {
        "id": "2025-uts2-q3-visual",
        "type": "ipe-ultrasonic",
        "title": "Sensor ultrasonik",
        "caption": "Pulsa menempuh jarak udara dua kali. Tinggi cairan mengurangi jarak sensor ke pemantul.",
        "params": [
          {
            "key": "flightTime",
            "label": "Waktu pulang-pergi",
            "min": 0,
            "max": 0.2,
            "step": 0.002,
            "defaultValue": 0.1,
            "unit": "s"
          }
        ],
        "data": {
          "c": 330,
          "tEmpty": 0.2,
          "t": 0.1,
          "height": 33,
          "level": 16.5,
          "visualKind": "ultrasonic"
        }
      },
      "steps": [
        {
          "id": "2025-uts2-q3-step-1",
          "title": "1. Bedakan jarak udara dan tinggi cairan",
          "content": "Sensor mengirim pulsa bunyi ke bawah, lalu menerima pantulannya. **Gema** (pulsa bunyi yang kembali) memberi waktu tempuh untuk menghitung jarak. Saat kosong, pulsa memantul dari dasar tangki; saat terisi, pulsa memantul dari permukaan cairan. Kita menyebut jarak ke dasar $H$ dan jarak ke permukaan $d$. Tinggi cairan ialah $h=H-d$.\n\nTitik nol tinggi cairan berada di dasar, sedangkan sensor mengukur jarak dari atas. Kedua arah ukur berbeda. Pembacaan jarak yang lebih kecil berarti level cairan lebih tinggi.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Informasi posisi bergantung pada kode, acuan, dan tanda sinyal yang benar-benar tersedia.",
            "commonPitfall": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran."
          }
        },
        {
          "id": "2025-uts2-q3-step-2",
          "title": "2. Ubah waktu ke detik dan tandai waktu acuan",
          "content": "$t_0$ adalah waktu gema saat tangki kosong; $t$ waktu saat tangki terisi. Cepat rambat $c=330\\ \\mathrm{m/s}$ memakai meter per detik. Oleh karena itu, ubah kedua waktu menjadi detik agar hasil jarak dalam meter.\n\n$$\nt_0=200\\ \\mathrm{ms}=0.200\\ \\mathrm s,\\qquad t=100\\ \\mathrm{ms}=0.100\\ \\mathrm s\n$$"
        },
        {
          "id": "2025-uts2-q3-step-3",
          "title": "3. Hitung jarak sensor ke dasar",
          "content": "Pulsa menempuh jarak $H$ ke bawah dan $H$ kembali ke sensor. Jadi, $ct_0=2H$. Membagi dengan dua mengubah panjang lintasan keseluruhan menjadi jarak satu arah.\n\n$$\nH=\\frac{ct_0}{2}=\\frac{330(0.200)}2=33.0\\ \\mathrm m\n$$"
        },
        {
          "id": "2025-uts2-q3-step-4",
          "title": "4. Hitung jarak udara yang masih tersisa",
          "content": "Saat ada cairan, gema kembali dari permukaannya. Gunakan alasan pulang-pergi yang sama, tetapi dengan waktu $t$. Nilai ini adalah jarak udara di atas cairan, belum tinggi cairannya.\n\n$$\nd=\\frac{ct}{2}=\\frac{330(0.100)}2=16.5\\ \\mathrm m\n$$"
        },
        {
          "id": "2025-uts2-q3-step-5",
          "title": "5. Kurangi kedua jarak",
          "content": "Permukaan cairan mengurangi jarak pantulan dari 33.0 m menjadi 16.5 m. Selisihnya memberi tinggi cairan dari dasar tangki.\n\nPengurangan dapat dilakukan pada jaraknya atau langsung pada waktunya. Keduanya setara karena $c/2$ adalah faktor yang sama dalam $H$ dan $d$.\n\n$$\nh=H-d=\\frac c2(t_0-t)=\\frac{330}{2}(0.200-0.100)=16.5\\ \\mathrm m\n$$"
        },
        {
          "id": "2025-uts2-q3-step-6",
          "title": "6. Uji hubungan dengan keadaan kosong dan penuh",
          "content": "Jika $t=t_0$, rumus memberi $h=0$: tangki kosong. Jika waktu gema berkurang, permukaan mendekati sensor dan $h$ naik. Di sini $t=t_0/2$, sehingga level berada pada setengah tinggi acuan: $16.5/33=0.5$.\n\nBatas teoritis waktu nol berarti permukaan tepat pada sensor. Sensor nyata biasanya memiliki jarak minimum; soal ini tidak memberikan batas tersebut."
        },
        {
          "id": "2025-uts2-q3-step-7",
          "title": "7. Cek skala dan kondisi pengukuran",
          "content": "Hasil besar ini mengikuti data 200 ms dan 100 ms pada sumber. Jangan menggantinya menjadi mikrodetik tanpa koreksi resmi. Sensor harus tetap pada posisi yang sama, dan cepat rambat harus mewakili udara pada kedua pengukuran.\n\nPerubahan suhu udara dapat mengubah cepat rambat. Jika dua pengukuran memakai cepat rambat berbeda, mengurangkan waktu dengan satu nilai c tidak lagi memberi hasil yang sama tepatnya."
        }
      ],
      "finalAnswer": "Tinggi cairan 16.5 m. Pengukuran membandingkan waktu pantulan dari dasar dengan waktu pantulan dari permukaan cairan.\n\n$$\n\\boxed{h=\\frac{330}{2}(0.200-0.100)=16.5\\ \\mathrm m}\n$$",
      "takeaway": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran.",
      "sourceNotes": [
        "Sesuai urutan fungsi di Bagian 1, halaman PDF 2-3, detektor mula-mula menerima pantulan; pengolah kemudian mengubah selang waktu menjadi jarak. Bagian 3, halaman PDF 16, menjelaskan pengukuran berdasarkan waktu pantulan. Karena waktunya pulang-pergi, perubahan tinggi ialah $h=c(t_{\\mathrm{kosong}}-t_{\\mathrm{isi}})/2$ bila cepat rambat tetap."
      ]
    },
    {
      "id": "2025-uts2-q4",
      "kind": "problem",
      "slug": "2025-uts2-q4",
      "title": "Sensor posisi dan susunan strain gauge",
      "source": "UTS 2 2025 · Soal 4",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
        "file": "2025-uts2.pdf",
        "pages": [
          2,
          3
        ],
        "original": "4. Position Sensors: LVDT, Resolver, Encoder, Strain gauges\na. [5%] What are the similarities and differences between a resolver and an LVDT (Linear Variable Differential Transformer)?\nb. [5%] What are the advantages and disadvantages of an absolute encoder compared to an incremental encoder?\nc. [5%] A cantilever beam with four strain gauges A1, A2, D1 and D2 is shown in the figure below. These four strain gauges form a Wheatstone bridge. (i) Describe the position of each strain gauge on the Wheatstone bridge’s arm. (ii) What is the function of D1 and D2?\nd. [5%] In a two-channel incremental encoder, how can we detect the direction of motion of the rotor (e.g. clockwise and counterclockwise)? You may sketch a schematic to support your answer.\nFigure: a cantilever fixed on the left and loaded downward at its right end; A1 and D1 are on the upper face, A2 and D2 on the lower face. The D gauges are drawn perpendicular to the A gauges.",
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
              4
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              15,
              16,
              17,
              20,
              21,
              23
            ]
          }
        ]
      },
      "assumptions": [
        "Penamaan lengan pada pembahasan kita tetapkan secara eksplisit; susunan yang setara dengan polaritas keluaran terbalik juga sah. Identifikasi regangan D mengikuti orientasi pada gambar, bukan huruf D saja."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2025,
        "number": 4
      },
      "difficulty": "menengah",
      "estimatedMinutes": 24,
      "tags": [
        "Posisi, perpindahan, dan regangan"
      ],
      "statement": "(a) Bandingkan persamaan dan perbedaan resolver dengan LVDT. (b) Jelaskan kelebihan serta kekurangan encoder absolut terhadap encoder inkremental. (c) Balok kantilever memiliki A1 dan D1 di atas, A2 dan D2 di bawah, serta gaya ke bawah di ujung bebas. Tentukan susunan keempat gauge pada jembatan Wheatstone dan fungsi D1/D2. (d) Jelaskan cara dua kanal encoder inkremental menentukan arah putaran.",
      "simulation": {
        "id": "2025-uts2-q4-visual",
        "type": "ipe-resolver",
        "title": "Resolver",
        "caption": "Resolver memakai dua keluaran yang saling melengkapi untuk membaca sudut.",
        "params": [
          {
            "key": "angle",
            "label": "Sudut rotor θ",
            "min": 0,
            "max": 360,
            "step": 1,
            "defaultValue": 30,
            "unit": "°"
          }
        ],
        "data": {
          "visualKind": "resolver"
        }
      },
      "steps": [
        {
          "id": "2025-uts2-q4-step-1",
          "title": "1. Kelompokkan tugas menurut cara sensor membaca gerak",
          "content": "Anda akan membandingkan sensor posisi dan menyusun jembatan pengukur regangan. Kita mulai dari besaran masuk, sinyal keluar, dan cara membaca arah. Tiga hal tersebut membantu menjelaskan fungsi setiap alat sebelum membandingkan kelebihan serta batasnya.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Informasi posisi bergantung pada kode, acuan, dan tanda sinyal yang benar-benar tersedia.",
            "commonPitfall": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran."
          },
          "checkpoint": {
            "prompt": "Dua gauge D dipasang melintang dan merekat pada permukaan balok yang mengalami lentur. Seorang mahasiswa menyebut keduanya “dummy, jadi pasti tanpa regangan”. Penilaian mana yang paling tepat?",
            "options": [
              {
                "id": "2025-uts2-q4-checkpoint-option-1",
                "label": "Benar, orientasi melintang selalu menghapus seluruh respons mekanik.",
                "feedback": "Melintang masih dapat mengalami regangan akibat efek Poisson.",
                "misconceptionTag": "concept-2025-04-choice-1"
              },
              {
                "id": "2025-uts2-q4-checkpoint-option-2",
                "label": "Benar, semua gauge dalam jembatan hanya merespons suhu.",
                "feedback": "Jembatan membaca perubahan tahanan, termasuk perubahan akibat regangan mekanik.",
                "misconceptionTag": "concept-2025-04-choice-2"
              },
              {
                "id": "2025-uts2-q4-checkpoint-option-3",
                "label": "Belum tepat: gauge yang merekat dapat membaca regangan Poisson, walaupun juga membantu kompensasi suhu.",
                "feedback": "Tepat. Respons mekanik dan peran kompensasi suhu dapat hadir bersamaan."
              },
              {
                "id": "2025-uts2-q4-checkpoint-option-4",
                "label": "Salah, gauge melintang harus mengalami regangan yang sama tanda dan besarnya dengan gauge memanjang.",
                "feedback": "Regangan melintang berhubungan dengan rasio Poisson dan umumnya berlawanan tanda; tidak sama begitu saja.",
                "misconceptionTag": "concept-2025-04-choice-4"
              }
            ],
            "correctOptionId": "2025-uts2-q4-checkpoint-option-3"
          }
        },
        {
          "id": "2025-uts2-q4-step-2",
          "title": "2. Kenali kesamaan LVDT dan resolver",
          "content": "Keduanya memakai kopling magnetik antarkumparan dan eksitasi AC. Gerak mengubah tegangan induksi. Rangkaian pembaca mengolah amplitudo serta fase keluaran untuk memperoleh posisi.\n\nPada keduanya, gerak tidak perlu memutus atau menyambung kontak ukur yang bergeser. Namun, pembaca tetap memerlukan acuan eksitasi untuk mengartikan fase dan tanda sinyal.",
          "simulation": {
            "id": "2025-uts2-q4-step-2-visual",
            "type": "ipe-lvdt",
            "title": "LVDT",
            "caption": "Inti bergerak mengubah selisih tegangan dua kumparan sekunder.",
            "params": [
              {
                "key": "position",
                "label": "Simpangan x",
                "min": -1,
                "max": 1,
                "step": 0.01,
                "defaultValue": 0
              }
            ],
            "data": {
              "visualKind": "lvdt"
            }
          }
        },
        {
          "id": "2025-uts2-q4-step-3",
          "title": "3. Baca posisi linear dari selisih dua sekunder LVDT",
          "content": "Di titik tengah, kopling ke kedua sekunder sama, sehingga $V_1$ dan $V_2$ saling menghapus pada sambungan seri berlawanan. Ketika inti bergeser, satu kopling menguat dan yang lain melemah. Selisih amplitudo memberi besar perpindahan; fase terhadap acuan menunjukkan sisinya.\n\nHubungan $V_o\\approx kx$ hanya berlaku dalam rentang linear. $k$ adalah sensitivitas tegangan per panjang, bukan konstanta tanpa satuan.\n\n$$\nV_o=V_1-V_2\\approx kx\n$$"
        },
        {
          "id": "2025-uts2-q4-step-4",
          "title": "4. Bedakan besaran yang mereka ukur",
          "content": "LVDT mengukur perpindahan lurus: dekat titik tengah, selisih keluaran berbanding dengan $x$, dan pembalikan fase menandai sisi titik nol. Resolver mengukur sudut: dua keluarannya mengikuti $\\sin\\theta$ dan $\\cos\\theta$.\n\nDua keluaran resolver diperlukan untuk menghindari ambiguitas sudut. Satu nilai sinus dapat muncul pada lebih dari satu sudut; pasangan sinus dan kosinus beserta tandanya menentukan kuadran.\n\n$$\nV_{\\mathrm{LVDT}}=V_1-V_2\\approx kx,\\qquad V_s\\propto\\sin\\theta,\\quad V_c\\propto\\cos\\theta\n$$",
          "simulation": {
            "id": "2025-uts2-q4-step-4-visual",
            "type": "ipe-resolver",
            "title": "Resolver",
            "caption": "Dua amplitudo resolver menentukan sudut dan kuadrannya.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut rotor θ",
                "min": 0,
                "max": 360,
                "step": 1,
                "defaultValue": 30,
                "unit": "°"
              }
            ],
            "data": {
              "visualKind": "resolver"
            }
          }
        },
        {
          "id": "2025-uts2-q4-step-5",
          "title": "5. Bandingkan encoder absolut dan inkremental",
          "content": "Encoder absolut memberi kode posisi yang unik dalam rentangnya. Setelah daya kembali, tipe absolut satu putaran dapat membaca sudut tanpa menghitung pulsa sejak nol. Encoder inkremental menghitung perubahan posisi, sehingga biasanya perlu acuan awal atau homing.\n\nEncoder absolut biasanya memerlukan pembacaan kode yang lebih rumit dan biaya lebih tinggi untuk spesifikasi setara. Jangan menganggap encoder absolut satu putaran juga menyimpan jumlah putaran; itu memerlukan kemampuan multiturn.\n\nBayangkan daya terputus saat poros berada di tengah rentang. Encoder absolut membaca kode yang sedang berada di bawah pembaca. Encoder inkremental perlu mengetahui hitungan awal sebelum pulsa baru dapat menjadi posisi total. Inilah alasan homing sering diperlukan."
        },
        {
          "id": "2025-uts2-q4-step-6",
          "title": "6. Tentukan tanda regangan pada balok sebelum menyusun jembatan",
          "content": "Untuk beban ujung ke bawah pada gambar, permukaan atas dekat tumpuan mengalami tarik dan permukaan bawah mengalami tekan. Gauge memanjang searah balok mengikuti regangan itu: $\\varepsilon_{A1}=+\\varepsilon$ dan $\\varepsilon_{A2}=-\\varepsilon$.\n\nDengan gauge factor $GF$, perubahan relatif tahanan ialah $\\delta=\\Delta R/R=GF\\varepsilon$. Dengan demikian, tanda mekanik dapat diteruskan ke tanda perubahan tahanan.\n\n$$\n\\delta_{A1}=+GF\\varepsilon,\\qquad\\delta_{A2}=-GF\\varepsilon\n$$"
        },
        {
          "id": "2025-uts2-q4-step-7",
          "title": "7. Tempatkan gauge agar pengaruh lentur menjumlah",
          "content": "Tetapkan suplai pada simpul atas dan bawah jembatan, lalu keluaran $V_o=V_R-V_L$. Satu susunan yang sah: kiri atas A 1, kiri bawah A 2, kanan atas D 1, kanan bawah D 2. Pada beban ke bawah, A 1 memanjang dan A 2 memendek.\n\nDengan $\\delta_i=\\Delta R_i/R$, kontribusi lengan kiri atas dan kanan bawah bertanda positif. Kontribusi dua lengan lain bertanda negatif. A1 dan A2 mengalami regangan berlawanan. Kita menempatkan keduanya pada lengan bersebelahan agar pengaruhnya saling menambah.\n\nTujuannya agar pengurangan dua tegangan simpul justru menambahkan pengaruh tarik dan tekan. Jika dua gauge yang tandanya berlawanan ditempatkan sembarang, keluaran dapat berkurang atau saling meniadakan.\n\n$$\n\\frac{V_o}{V_s}\\approx\\frac14(\\delta_{A1}-\\delta_{A2}-\\delta_{D1}+\\delta_{D2})\n$$",
          "simulation": {
            "id": "2025-uts2-q4-step-7-visual",
            "type": "ipe-strain",
            "title": "Sensor regangan",
            "caption": "A1 tarik dan A2 tekan. Susunan jembatan menjaga sinyal lentur saling menambah.",
            "params": [
              {
                "key": "strain",
                "label": "Regangan A1",
                "min": -1500,
                "max": 1500,
                "step": 25,
                "defaultValue": 500,
                "unit": "με"
              },
              {
                "key": "poisson",
                "label": "Rasio Poisson ν",
                "min": 0,
                "max": 0.49,
                "step": 0.01,
                "defaultValue": 0.3
              }
            ],
            "data": {
              "mode": "bending",
              "topLeft": "A1",
              "bottomLeft": "A2",
              "topRight": "D1",
              "bottomRight": "D2",
              "transverse": 1,
              "visualKind": "strain"
            }
          }
        },
        {
          "id": "2025-uts2-q4-step-8",
          "title": "8. Periksa susunan dengan persamaan pembagi tegangan",
          "content": "Tanpa arus masuk ke alat baca, simpul kiri dan kanan masing-masing mengikuti pembagi tegangan. Mengembangkan persamaan di sekitar empat tahanan yang sama menghasilkan bentuk pendek pada langkah sebelumnya.\n\nJika hanya A 1 bertambah tahanannya, $V_L$ turun sehingga $V_R-V_L$ naik. Jika A 2 berkurang tahanannya, $V_L$ juga turun. Pemeriksaan sederhana ini memastikan kedua regangan menambah sinyal.\n\n$$\nV_L=V_s\\frac{R_{A2}}{R_{A1}+R_{A2}},\\qquad V_R=V_s\\frac{R_{D2}}{R_{D1}+R_{D2}},\\qquad V_o=V_R-V_L\n$$"
        },
        {
          "id": "2025-uts2-q4-step-9",
          "title": "9. Jelaskan fungsi D1 dan D2 dengan tepat",
          "content": "Fungsi yang dituju ialah mengurangi perubahan keluaran akibat suhu. Jika semua gauge sejenis mengalami perubahan suhu sama, perubahan tahanan bersama saling menghapus pada jembatan.\n\nGambar menaruh D 1/D 2 melintang pada balok. Jika keduanya merekat pada balok, mereka juga merasakan regangan Poisson: D 1 sebesar $-\\nu\\varepsilon$, D 2 sebesar $+\\nu\\varepsilon$. Jadi, jangan menyebutnya bebas regangan tanpa asumsi tambahan. Dalam model dummy ideal yang terpisah dari regangan mekanik, kedua kontribusi mekaniknya nol.\n\n$\\nu$ adalah rasio Poisson: tarikan memanjang disertai penyusutan melintang. Oleh karena itu, orientasi D 1/D 2 pada gambar harus diperiksa sebelum kita menganggap keduanya hanya mengukur suhu.\n\n$$\n\\left.\\frac{V_o}{V_s}\\right|_{\\mathrm{bonded}}\\approx\\frac{GF(1+\\nu)\\varepsilon}{2},\\qquad \\left.\\frac{V_o}{V_s}\\right|_{\\mathrm{ideal\\ dummy}}\\approx\\frac{GF\\varepsilon}{2}\n$$"
        },
        {
          "id": "2025-uts2-q4-step-10",
          "title": "10. Pisahkan kompensasi suhu dari pembatalan regangan",
          "content": "Jika suhu mengubah semua tahanan dengan fraksi yang sama $\\delta_T$, jumlah bertandanya ialah $\\delta_T-\\delta_T-\\delta_T+\\delta_T=0$. Inilah alasan jembatan dapat menekan pengaruh suhu bersama.\n\nKompensasi itu memerlukan gauge sejenis dan suhu yang cukup seragam. Gradien suhu atau beda sifat gauge dapat menyisakan galat; menyebut sebuah gauge “dummy” saja tidak menjamin kompensasi sempurna."
        },
        {
          "id": "2025-uts2-q4-step-11",
          "title": "11. Baca urutan pulsa untuk mengetahui arah",
          "content": "Dua kanal A dan B bergeser seperempat periode. Jika A mendahului B, tetapkan satu arah; jika B mendahului A, arah berbalik. Hubungan dengan searah jarum jam bergantung pada pemasangan, jadi cek sekali dengan gerak yang diketahui.\n\nBaca pasangan A/B secara berurutan, bukan dua nilai yang diambil terpisah tanpa urutan waktu. Frekuensi pulsa memberi besar kecepatan, sedangkan kanal yang mendahului memberi arah.\n\n$$\n\\text{A leads: }00\\to10\\to11\\to01\\to00\\\\\\text{B leads: }00\\to01\\to11\\to10\\to00\n$$",
          "simulation": {
            "id": "2025-uts2-q4-step-11-visual",
            "type": "ipe-encoder",
            "title": "Encoder sudut",
            "caption": "Urutan perubahan A/B menentukan arah, bukan besar frekuensi saja.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut θ",
                "min": 0,
                "max": 359.9,
                "step": 0.1,
                "defaultValue": 45,
                "unit": "°"
              }
            ],
            "data": {
              "mode": "quadrature",
              "pulses": 8,
              "visualKind": "encoder"
            }
          }
        },
        {
          "id": "2025-uts2-q4-step-12",
          "title": "12. Tutup setiap subsoal dengan jenis informasi yang benar",
          "content": "LVDT memberi posisi lurus; resolver memberi sudut; encoder absolut memberi kode posisi; encoder inkremental memberi perubahan posisi yang perlu dihitung. Jembatan strain gauge membaca perubahan tahanan dengan susunan tanda yang sesuai. Setiap perbedaan berasal dari cara sinyal dibentuk dan dibaca."
        }
      ],
      "finalAnswer": "LVDT mengukur perpindahan lurus, resolver mengukur sudut. Encoder absolut memberi kode posisi; encoder inkremental menghitung perubahan. Tempatkan A1/A2 bersebelahan dan D1/D2 pada dua lengan lain sesuai diagram. D membantu kompensasi suhu; gauge melintang yang merekat juga merasakan efek Poisson. Arah encoder berasal dari kanal yang mendahului.",
      "takeaway": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran.",
      "sourceNotes": [
        "Bagian 1, halaman PDF 3 dan 8, memisahkan sensor regangan dari pengondisi sinyal. Bagian 2, halaman PDF 4, menunjukkan kompensasi suhu dengan gauge yang mendapat pengaruh suhu serupa. Pada soal ini, periksa pula arah gauge: gauge melintang yang melekat pada balok dapat menerima regangan Poisson, sehingga bukan selalu resistor yang bebas regangan."
      ]
    },
    {
      "id": "2025-uas-q3",
      "kind": "problem",
      "slug": "2025-uas-q3",
      "title": "Encoder 8 bit dan cara kerja resolver",
      "source": "UAS 2025 · Soal 3",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
        "file": "2025-uas.pdf",
        "pages": [
          1,
          2
        ],
        "original": "3. [25%] Angular Position Measurement\na. [5%] Explain the working principle of an incremental encoder. How can you determine the direction of rotation that occurs?\nb. [5%] What is the difference between an incremental encoder and an absolute encoder? What are the weaknesses of an incremental encoder?\nc. [5%] Calculate the resolution in degrees of an 8-bit encoder.\nd. [5%] What are the advantages and disadvantages of resolver compared to linear potentiometer?\ne. [5%] Explain briefly how the following resolver works.\nFigure: rotor reference RH/RL coupled through a brushless excitation transformer; perpendicular stator windings S2/S4 marked K Ref Cos θ and S3/S1 marked K Ref Sin θ.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              14
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              14,
              15,
              16,
              17
            ]
          }
        ]
      },
      "assumptions": [
        "Encoder 8 bit mencakup satu putaran penuh dengan 256 kode. Arti searah jarum jam terhadap kanal A/B mengikuti pemasangan. Perbandingan resolver mengacu pada jenis brushless yang tampak pada sumber."
      ],
      "exam": {
        "term": "UAS",
        "year": 2025,
        "number": 3
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Posisi, perpindahan, dan regangan"
      ],
      "statement": "(a) Jelaskan prinsip encoder inkremental dan penentuan arah putarannya. (b) Bandingkan dengan encoder absolut serta sebutkan kelemahannya. (c) Hitung resolusi sudut encoder 8 bit untuk satu putaran. (d) Bandingkan kelebihan dan kekurangan resolver terhadap potensiometer linear. (e) Jelaskan resolver pada gambar, yang memiliki keluaran $K\\,\\mathrm{Ref}\\cos\\theta$ dan $K\\,\\mathrm{Ref}\\sin\\theta$.",
      "simulation": {
        "id": "2025-uas-q3-visual",
        "type": "ipe-encoder",
        "title": "Encoder sudut",
        "caption": "Putar sudut untuk melihat perubahan kode dan batas resolusinya.",
        "params": [
          {
            "key": "angle",
            "label": "Sudut θ",
            "min": 0,
            "max": 359.9,
            "step": 0.1,
            "defaultValue": 45,
            "unit": "°"
          },
          {
            "key": "bits",
            "label": "Jumlah bit",
            "min": 2,
            "max": 10,
            "step": 1,
            "defaultValue": 8
          }
        ],
        "data": {
          "bits": 8,
          "mode": "absolute",
          "visualKind": "encoder"
        }
      },
      "steps": [
        {
          "id": "2025-uas-q3-step-1",
          "title": "1. Bedakan posisi saat ini dari perubahan posisi",
          "content": "Kita perlu membedakan perubahan posisi dan posisi saat ini. **Encoder** (alat yang mengubah gerak menjadi kode atau pulsa) dapat memberi kedua jenis informasi itu. Anda dapat menghitung pulsa untuk mengetahui gerak poros. Untuk mengetahui sudut saat ini, Anda juga memerlukan acuan awal atau kode posisi yang unik.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Informasi posisi bergantung pada kode, acuan, dan tanda sinyal yang benar-benar tersedia.",
            "commonPitfall": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran."
          },
          "checkpoint": {
            "prompt": "Dua posisi rotor resolver memberi rasio sinyal sinus terhadap kosinus yang sama. Namun, tanda kedua sinyal berbalik antara posisi pertama dan kedua. Bagaimana pembaca sudut dapat membedakan kedua posisi?",
            "options": [
              {
                "id": "2025-uas-q3-checkpoint-option-1",
                "label": "Pertahankan tanda kedua kanal setelah demodulasi, lalu tentukan sudut dengan atan2 sehingga kuadrannya tetap diketahui.",
                "feedback": "Tepat. Dua tanda membedakan kuadran, sedangkan besar relatif kedua kanal menentukan sudut di dalam kuadran."
              },
              {
                "id": "2025-uas-q3-checkpoint-option-2",
                "label": "Gunakan hanya nilai mutlak rasio sinus terhadap kosinus; tanda tidak membawa informasi sudut.",
                "feedback": "Nilai mutlak membuang tanda, sehingga beberapa kuadran menjadi tak dapat dibedakan.",
                "misconceptionTag": "concept-2025-08-choice-2"
              },
              {
                "id": "2025-uas-q3-checkpoint-option-3",
                "label": "Tambahkan tegangan kedua kanal; jumlahnya selalu menentukan satu sudut penuh secara unik.",
                "feedback": "Jumlah sinus dan kosinus tidak memberi pemetaan satu-ke-satu untuk seluruh putaran. Beberapa sudut dapat memberi jumlah yang sama.",
                "misconceptionTag": "concept-2025-08-choice-3"
              },
              {
                "id": "2025-uas-q3-checkpoint-option-4",
                "label": "Ukur hanya amplitudo kanal sinus; satu kanal sudah membedakan semua sudut sepanjang satu putaran.",
                "feedback": "Satu nilai sinus dapat berasal dari lebih dari satu sudut. Kanal kosinus beserta tandanya menghilangkan ambiguitas tersebut.",
                "misconceptionTag": "concept-2025-08-choice-4"
              }
            ],
            "correctOptionId": "2025-uas-q3-checkpoint-option-1"
          }
        },
        {
          "id": "2025-uas-q3-step-2",
          "title": "2. Hitung gerak dari pulsa",
          "content": "Pada encoder inkremental optik, pola terang-gelap pada cakram melewati pemancar dan penerima. Setiap perubahan menghasilkan pulsa. Banyak pulsa memberi perubahan sudut, sedangkan frekuensi pulsa memberi kecepatan putar.\n\n$\\Delta n$ adalah jumlah hitungan yang bertambah, dan $N_{\\mathrm{count/rev}}$ jumlah hitungan efektif per putaran. Pada pembacaan kuadratur×4, hitungan efektif dapat empat kali jumlah periode kanal. Tetapkan aturan hitung sebelum mengubah hitungan menjadi derajat.\n\n$$\n\\Delta\\theta=\\frac{360^\\circ}{N_{\\mathrm{count/rev}}}\\Delta n\n$$"
        },
        {
          "id": "2025-uas-q3-step-3",
          "title": "3. Gunakan dua kanal untuk arah",
          "content": "A dan B berbeda fase seperempat periode. Urutan 00 → 10 → 11 → 01 berarti A mendahului B. Urutan terbalik berarti arah berbalik. Satu kanal saja tidak memberi informasi arah yang unik.\n\nPada urutan pertama, bit A berubah dari 0 ke 1 ketika B masih 0. Pada urutan terbalik, B berubah lebih dahulu. Dengan membaca transisi yang berurutan, penghitung dapat memilih menambah atau mengurangi posisi.",
          "simulation": {
            "id": "2025-uas-q3-step-3-visual",
            "type": "ipe-encoder",
            "title": "Encoder sudut",
            "caption": "Bandingkan urutan kanal saat putaran berbalik.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut θ",
                "min": 0,
                "max": 359.9,
                "step": 0.1,
                "defaultValue": 45,
                "unit": "°"
              }
            ],
            "data": {
              "mode": "quadrature",
              "pulses": 8,
              "visualKind": "encoder"
            }
          }
        },
        {
          "id": "2025-uas-q3-step-4",
          "title": "4. Bedakan perubahan posisi dan kode posisi",
          "content": "Encoder inkremental menyimpan posisi melalui penghitung. Kehilangan daya atau pulsa yang terlewat dapat membuat posisi hitungan salah, sehingga perlu acuan ulang. Encoder absolut memberi kode sudut langsung. Pada tipe satu putaran, kode menunjukkan posisi dalam satu putaran, bukan jumlah putaran total.\n\nUntuk mesin yang harus mengetahui sudut setelah listrik kembali tanpa bergerak mencari titik nol, kode absolut memberi keuntungan langsung. Namun, alat absolut satu putaran tetap tidak memberi jumlah putaran total tanpa kemampuan tambahan."
        },
        {
          "id": "2025-uas-q3-step-5",
          "title": "5. Bagi satu putaran menjadi 256 posisi",
          "content": "Delapan bit menyediakan 2⁸ kode. Sudut satu putaran ialah 360°. Jadi, lebar satu langkah sudut ialah 360°/256. Lebar langkah tersebut menyatakan resolusi, bukan jaminan ketelitian alat.\n\nAda 256 wilayah sudut, dengan kode 0 sampai 255. Jangan membagi 360° dengan 255 hanya karena kode tertingginya 255: terdapat 256 kode, dan batas 0°/360° adalah posisi fisik yang sama.\n\n$$\nN=2^8=256,\\qquad \\Delta\\theta=\\frac{360^\\circ}{256}=1.40625^\\circ\n$$",
          "simulation": {
            "id": "2025-uas-q3-step-5-visual",
            "type": "ipe-encoder",
            "title": "Encoder sudut",
            "caption": "Encoder 8 bit membagi lingkaran menjadi 256 kode posisi.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut θ",
                "min": 0,
                "max": 359.9,
                "step": 0.1,
                "defaultValue": 45,
                "unit": "°"
              },
              {
                "key": "bits",
                "label": "Jumlah bit",
                "min": 2,
                "max": 10,
                "step": 1,
                "defaultValue": 8
              }
            ],
            "data": {
              "mode": "absolute",
              "bits": 8,
              "visualKind": "encoder"
            }
          }
        },
        {
          "id": "2025-uas-q3-step-6",
          "title": "6. Pisahkan resolusi dari ketelitian posisi",
          "content": "Resolusi 1.40625° adalah jarak antarwilayah kode. Salah posisi cakram, ketidaktepatan pembaca, atau kalibrasi dapat membuat sudut nyata berbeda dari sudut yang ditunjukkan. Oleh karena itu, menambah bit memperkecil langkah kode tetapi tidak otomatis menghapus galat alat."
        },
        {
          "id": "2025-uas-q3-step-7",
          "title": "7. Bandingkan resolver dengan potensiometer linear",
          "content": "Resolver brushless mengukur sudut melalui induksi, sehingga tidak memakai kontak geser pengukur. Ia tahan untuk putaran berulang dan tidak mengalami keausan wiper. Kekurangannya ialah kebutuhan eksitasi AC, pembaca sinus-kosinus, ukuran, dan biaya rangkaian.\n\nPotensiometer linear langsung mengukur perpindahan lurus dengan pembagi tegangan DC yang sederhana dan murah. Namun, kontaknya dapat aus dan menambah noise. Keduanya mengukur jenis posisi berbeda; penggantian langsung memerlukan pengubah gerak atau potensiometer putar yang sesuai.\n\nSebelum membandingkan biaya dan keausan, pastikan besaran yang hendak diukur sama. Resolver putar dan potensiometer linear tidak langsung saling menggantikan hanya karena keduanya termasuk sensor posisi."
        },
        {
          "id": "2025-uas-q3-step-8",
          "title": "8. Turunkan sudut dari dua keluaran resolver",
          "content": "Eksitasi AC Ref membangkitkan medan rotor. Dua kumparan stator tegak lurus menerima tegangan dengan amplitudo yang mengikuti kosinus dan sinus sudut. Setelah demodulasi terhadap Ref, gunakan kedua tanda amplitudo agar kuadran tidak hilang.\n\n$\\omega_c$ adalah frekuensi sudut pembawa eksitasi, bukan kecepatan putar poros. Demodulasi mengambil amplitudo bertanda yang berubah terhadap $\\theta$, lalu $\\operatorname{atan2}$ memakai dua tanda untuk memilih kuadran.\n\n$$\nv_{S2-S4}=K V_{\\mathrm{ref}}\\cos\\theta\\sin\\omega_ct,\\quad v_{S3-S1}=K V_{\\mathrm{ref}}\\sin\\theta\\sin\\omega_ct\\\\\\theta=\\operatorname{atan2}(V_{\\sin},V_{\\cos})\n$$",
          "simulation": {
            "id": "2025-uas-q3-step-8-visual",
            "type": "ipe-resolver",
            "title": "Resolver",
            "caption": "Amplitudo sinus dan kosinus berubah bersama satu sudut rotor.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut rotor θ",
                "min": 0,
                "max": 360,
                "step": 1,
                "defaultValue": 40,
                "unit": "°"
              }
            ],
            "data": {
              "angle": 40,
              "visualKind": "resolver"
            }
          }
        },
        {
          "id": "2025-uas-q3-step-9",
          "title": "9. Cek keluaran resolver pada sudut yang dikenal",
          "content": "Pada 0°, kanal sinus nol dan kanal kosinus positif maksimum. Pada 90°, kanal kosinus nol dan kanal sinus positif maksimum. Pada 180°, kosinus menjadi negatif. Tanda itu menjelaskan mengapa rasio tanpa informasi kuadran dapat memberi sudut yang salah."
        }
      ],
      "finalAnswer": "Resolusi encoder 8 bit ialah 1.40625° per kode. Arah inkremental berasal dari urutan A/B; posisi absolut berasal dari kode. Resolver membaca sudut dari dua amplitudo sinus-kosinus yang telah didemodulasi.\n\n$$\n\\boxed{\\Delta\\theta=1.40625^\\circ/\\mathrm{code}}\n$$",
      "takeaway": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran.",
      "sourceNotes": [
        "Bagian 1, halaman PDF 14, membedakan resolusi dari bentuk kurva keluaran. Untuk encoder absolut dengan $n$ bit, ada $2^n$ kode dan lebar satu langkah sudut ialah $360^\\circ/2^n$. Jumlah kode tidak menyatakan akurasi total; pemasangan dan kesalahan pembacaan masih dapat menambah galat."
      ]
    },
    {
      "id": "2024-uas-q6",
      "kind": "problem",
      "slug": "2024-uas-q6",
      "title": "DC LVDT dan dua jenis encoder",
      "source": "UAS 2024 · Soal 6",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
        "file": "2024-uas.pdf",
        "pages": [
          3
        ],
        "original": "6. [10%] Position Sensor\n(a) [5%] Explain briefly how a DC LVDT (Direct Current Linear Variable Differential Transformer) works. You may include a sketch of the DC LVDT.\n(b) [5%] What are the differences between an absolute and an incremental encoder? You may include sketches of both encoders.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              2,
              3,
              14
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              15,
              16,
              17
            ]
          }
        ]
      },
      "assumptions": [
        "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025."
      ],
      "exam": {
        "term": "UAS",
        "year": 2024,
        "number": 6
      },
      "difficulty": "menengah",
      "estimatedMinutes": 16,
      "tags": [
        "Posisi, perpindahan, dan regangan"
      ],
      "statement": "(a) Jelaskan cara kerja DC LVDT, yaitu Linear Variable Differential Transformer dengan antarmuka DC. Anda boleh memakai sketsa. (b) Bandingkan encoder absolut dan encoder inkremental. Anda boleh memakai sketsa keduanya.",
      "simulation": {
        "id": "2024-uas-q6-visual",
        "type": "ipe-lvdt",
        "title": "LVDT",
        "caption": "DC pada antarmuka tidak menghilangkan eksitasi AC di kumparan.",
        "params": [
          {
            "key": "position",
            "label": "Simpangan x",
            "min": -1,
            "max": 1,
            "step": 0.01,
            "defaultValue": 0.3
          }
        ],
        "data": {
          "position": 0.3,
          "mode": "dc",
          "visualKind": "lvdt"
        }
      },
      "steps": [
        {
          "id": "2024-uas-q6-step-1",
          "title": "a · Identifikasi bagian yang bergerak pada LVDT",
          "content": "**LVDT** (sensor dengan inti magnetik yang bergeser di dalam kumparan) mengukur perpindahan lurus inti. Kumparan primer menerima eksitasi dan dua kumparan sekunder menangkap perubahan medan. Inti yang bergeser mengubah kopling primer ke kedua sekunder.\n\nKita tidak membaca posisi dari kontak geser pada kumparan. Kita membaca perubahan tegangan induksi ketika posisi inti berubah.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Informasi posisi bergantung pada kode, acuan, dan tanda sinyal yang benar-benar tersedia.",
            "commonPitfall": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran."
          },
          "checkpoint": {
            "prompt": "Sebuah DC LVDT menerima catu DC dan menghasilkan tegangan DC yang mengikuti posisi inti. Pernyataan mana yang menjelaskan cara kerjanya dengan tepat?",
            "options": [
              {
                "id": "2024-uas-q6-checkpoint-option-1",
                "label": "Rangkaian internal membuat eksitasi AC, lalu mendemodulasi selisih sekunder menjadi keluaran DC.",
                "feedback": "Benar. Rangkaian ini memungkinkan antarmuka DC sambil mempertahankan prinsip transformator AC di dalamnya."
              },
              {
                "id": "2024-uas-q6-checkpoint-option-2",
                "label": "Primer menerima DC tetap dan terus menginduksi tegangan sekunder tanpa perubahan medan.",
                "feedback": "DC tetap tidak terus menghasilkan induksi setelah kondisi transien berakhir. Eksitasi AC menyediakan perubahan medan yang diperlukan.",
                "misconceptionTag": "concept-2024-10-choice-2"
              },
              {
                "id": "2024-uas-q6-checkpoint-option-3",
                "label": "Dua tegangan sekunder dijumlahkan agar arah perpindahan selalu terlihat dari nilainya.",
                "feedback": "Sekunder disusun saling mengurangi. Selisih dan fase terhadap eksitasi, bukan jumlah amplitudo saja, memberi informasi posisi bertanda.",
                "misconceptionTag": "concept-2024-10-choice-3"
              },
              {
                "id": "2024-uas-q6-checkpoint-option-4",
                "label": "Inti menggeser kontak listrik sehingga LVDT bekerja seperti potensiometer.",
                "feedback": "LVDT membaca perubahan kopling magnetik; ia tidak memerlukan kontak geser untuk membaca posisi inti.",
                "misconceptionTag": "concept-2024-10-choice-4"
              }
            ],
            "correctOptionId": "2024-uas-q6-checkpoint-option-1"
          },
          "simulation": {
            "id": "2024-uas-q6-step-1-visual",
            "type": "ipe-lvdt",
            "title": "LVDT",
            "caption": "Pergeseran inti mengubah selisih keluaran kedua kumparan.",
            "params": [
              {
                "key": "position",
                "label": "Simpangan x",
                "min": -1,
                "max": 1,
                "step": 0.01,
                "defaultValue": 0.3
              }
            ],
            "data": {
              "position": 0.3,
              "mode": "dc",
              "visualKind": "lvdt"
            }
          }
        },
        {
          "id": "2024-uas-q6-step-2",
          "title": "a · Hubungkan selisih tegangan dengan arah perpindahan",
          "content": "Dua sekunder disusun saling mengurangi. Pada posisi tengah, koplingnya hampir sama sehingga $e_{s1}\\approx e_{s2}$ dan keluaran selisih mendekati nol.\n\nKetika inti bergerak ke satu sisi, satu tegangan naik dan yang lain turun. Besar selisih menunjukkan besar perpindahan; perubahan fase terhadap eksitasi membedakan kedua sisi titik nol.\n\n$$\ne_{\\mathrm{diff}}=e_{s1}-e_{s2}\n$$",
          "simulation": {
            "id": "2024-uas-q6-step-2-visual",
            "type": "ipe-lvdt",
            "title": "LVDT",
            "caption": "Pergeseran inti mengubah selisih keluaran kedua kumparan.",
            "params": [
              {
                "key": "position",
                "label": "Simpangan x",
                "min": -1,
                "max": 1,
                "step": 0.01,
                "defaultValue": 0.3
              }
            ],
            "data": {
              "position": 0.3,
              "mode": "dc",
              "visualKind": "lvdt"
            }
          }
        },
        {
          "id": "2024-uas-q6-step-3",
          "title": "a · Telusuri catu DC sampai keluaran DC",
          "content": "Istilah DC LVDT merujuk antarmuka alat: catu masuk dan keluaran akhirnya berupa DC. Di dalam alat, osilator mengubah catu DC menjadi eksitasi AC untuk primer.\n\nInduksi tetap memerlukan perubahan medan magnet. Tegangan DC tetap yang langsung terhubung ke primer tidak menyediakan perubahan tersebut. Rangkaian DC LVDT harus mengubah DC menjadi eksitasi AC dahulu.",
          "simulation": {
            "id": "2024-uas-q6-step-3-visual",
            "type": "ipe-lvdt",
            "title": "LVDT",
            "caption": "Pergeseran inti mengubah selisih keluaran kedua kumparan.",
            "params": [
              {
                "key": "position",
                "label": "Simpangan x",
                "min": -1,
                "max": 1,
                "step": 0.01,
                "defaultValue": 0.3
              }
            ],
            "data": {
              "position": 0.3,
              "mode": "dc",
              "visualKind": "lvdt"
            }
          }
        },
        {
          "id": "2024-uas-q6-step-4",
          "title": "a · Mengapa keluaran perlu didemodulasi?",
          "content": "Selisih sekunder masih berupa sinyal AC. Demodulator yang mengacu pada eksitasi membaca besar sekaligus tandanya, lalu penyaring mengurangi komponen AC agar keluaran DC mengikuti posisi.\n\nDekat pusat dalam rentang linear, $V_o\\approx Kx$. Di sini $x$ adalah perpindahan bertanda dan $K$ adalah sensitivitas, misalnya V/mm. Hubungan linear ini tidak otomatis berlaku sampai semua posisi inti.\n\n$$\nV_o\\approx Kx\n$$",
          "simulation": {
            "id": "2024-uas-q6-step-4-visual",
            "type": "ipe-lvdt",
            "title": "LVDT",
            "caption": "Pergeseran inti mengubah selisih keluaran kedua kumparan.",
            "params": [
              {
                "key": "position",
                "label": "Simpangan x",
                "min": -1,
                "max": 1,
                "step": 0.01,
                "defaultValue": 0.3
              }
            ],
            "data": {
              "position": 0.3,
              "mode": "dc",
              "visualKind": "lvdt"
            }
          }
        },
        {
          "id": "2024-uas-q6-step-5",
          "title": "b · Encoder inkremental membaca perubahan posisi",
          "content": "Pola berulang pada cakram atau skala menghasilkan pulsa ketika bergerak. Setiap pulsa mewakili perubahan posisi tertentu. Penghitung menjumlahkan perubahan itu dari suatu posisi awal.\n\nUntuk memperoleh arah, kanal A dan B berselisih seperempat siklus. Urutan kanal yang mendahului berbalik saat arah gerak berbalik. Satu kanal saja memberi jumlah gerak, tetapi tidak membedakan arah secara unik.",
          "simulation": {
            "id": "2024-uas-q6-step-5-visual",
            "type": "ipe-encoder",
            "title": "Encoder sudut",
            "caption": "Kanal A dan B menunjukkan perubahan serta arah; indeks Z memberi tanda acuan.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut θ",
                "min": 0,
                "max": 359.9,
                "step": 0.1,
                "defaultValue": 45,
                "unit": "°"
              }
            ],
            "data": {
              "mode": "incremental",
              "bits": 4,
              "angle": 45,
              "visualKind": "encoder"
            }
          }
        },
        {
          "id": "2024-uas-q6-step-6",
          "title": "b · Jelaskan akibat hilangnya acuan inkremental",
          "content": "Nilai posisi bergantung pada posisi awal dan seluruh hitungan setelahnya. Jika penghitung kehilangan daya atau melewatkan pulsa, kode posisi yang benar tidak dapat dipulihkan hanya dari keadaan satu kanal saat diam.\n\n**Homing** (gerak untuk mencari acuan mesin) memulihkan titik awal penghitung. Kanal Z dapat memberi tanda satu putaran, tetapi bukan kode unik untuk setiap posisi. Ia membantu mencari acuan, bukan mengganti seluruh informasi absolut.",
          "simulation": {
            "id": "2024-uas-q6-step-6-visual",
            "type": "ipe-encoder",
            "title": "Encoder sudut",
            "caption": "Kanal A dan B menunjukkan perubahan serta arah; indeks Z memberi tanda acuan.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut θ",
                "min": 0,
                "max": 359.9,
                "step": 0.1,
                "defaultValue": 45,
                "unit": "°"
              }
            ],
            "data": {
              "mode": "incremental",
              "bits": 4,
              "angle": 45,
              "visualKind": "encoder"
            }
          }
        },
        {
          "id": "2024-uas-q6-step-7",
          "title": "b · Encoder absolut memberi kode untuk posisi saat ini",
          "content": "Encoder absolut memberi pola kode unik untuk tiap sektor dalam rentangnya. Sistem membaca kode yang sedang aktif; ia tidak perlu mengamati semua gerak sebelumnya untuk mengetahui posisi dalam satu putaran.\n\nDengan $n$ bit, ada $2^n$ kode. Jika satu putaran penuh dibagi merata, resolusinya $360^\\circ/2^n$. Resolusi menyatakan langkah kode, bukan jaminan bahwa galat alat sekecil itu.\n\n$$\n\\Delta\\theta=\\frac{360^\\circ}{2^n}\n$$",
          "simulation": {
            "id": "2024-uas-q6-step-7-visual",
            "type": "ipe-encoder",
            "title": "Encoder sudut",
            "caption": "Setiap sektor memiliki kode posisi sendiri.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut θ",
                "min": 0,
                "max": 359.9,
                "step": 0.1,
                "defaultValue": 45,
                "unit": "°"
              },
              {
                "key": "bits",
                "label": "Jumlah bit",
                "min": 2,
                "max": 10,
                "step": 1,
                "defaultValue": 4
              }
            ],
            "data": {
              "mode": "absolute",
              "bits": 4,
              "angle": 45,
              "visualKind": "encoder"
            }
          }
        },
        {
          "id": "2024-uas-q6-step-8",
          "title": "b · Bedakan kode posisi dan jumlah putaran",
          "content": "**Kode Gray** (susunan kode dengan satu bit berubah antarposisi bersebelahan) mengurangi ambiguitas pembacaan saat peralihan. Kode Gray tidak menambah jumlah posisi dengan sendirinya.\n\nEncoder absolut single-turn mengidentifikasi sudut dalam satu putaran. Untuk mengetahui jumlah putaran penuh, sistem memerlukan kemampuan multiturn. Istilah “absolut” belum menjamin bahwa sistem menyimpan seluruh riwayat putaran.",
          "simulation": {
            "id": "2024-uas-q6-step-8-visual",
            "type": "ipe-encoder",
            "title": "Encoder sudut",
            "caption": "Setiap sektor memiliki kode posisi sendiri.",
            "params": [
              {
                "key": "angle",
                "label": "Sudut θ",
                "min": 0,
                "max": 359.9,
                "step": 0.1,
                "defaultValue": 45,
                "unit": "°"
              },
              {
                "key": "bits",
                "label": "Jumlah bit",
                "min": 2,
                "max": 10,
                "step": 1,
                "defaultValue": 4
              }
            ],
            "data": {
              "mode": "absolute",
              "bits": 4,
              "angle": 45,
              "visualKind": "encoder"
            }
          }
        }
      ],
      "finalAnswer": "DC LVDT mengolah selisih sinyal AC internal menjadi keluaran DC posisi. Encoder inkremental menghitung perubahan posisi; encoder absolut membaca kode posisi dalam rentangnya.",
      "takeaway": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran.",
      "sourceNotes": [
        "Bagian 1, halaman PDF 2-3, membantu membaca istilah DC LVDT sebagai sistem lengkap. Elemen induktif memakai eksitasi bolak-balik; rangkaian internal menyediakan eksitasi dan mengolah selisih sekunder menjadi keluaran DC. Perbedaan antarmuka tidak mengubah besaran yang diukur, yaitu perpindahan inti."
      ]
    },
    {
      "id": "2023-uts2-q3",
      "kind": "problem",
      "slug": "2023-uts2-q3",
      "title": "Encoder, sensor level, dan LVDT",
      "source": "UTS 2 2023 · Soal 3",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7/view",
        "file": "2023-uts2.pdf",
        "pages": [
          2
        ],
        "original": "3. Position Sensors\na. [5%] Please explain the differences between absolute and incremental encoders, in terms of construction and output signals?\nb. [5%] A capacitive-based sensor is used to measure the liquid level in a tank. Assuming the dielectric constant of the liquid is k times of air, surface area of the sensor is A, and the distance between surfaces is D. Determine the capacitance of the sensor as shown in the figure below.\nFigure labels: total height h; air height h1; liquid height h2; probe bottom clearance h0; metal shell, measured material, inner electrode, outer electrode.\nc. [5%] Sketch a signal conditioner to measure changes in capacitance in the level sensor at question [b].\nd. [5%] Please explain how the following LVDT works?\ne. [5%] What is the advantage and disadvantage of an LVDT over a potentiometer?",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view",
            "title": "Pengukuran Teknik, Bagian 1 (2022)",
            "pages": [
              3,
              12,
              13
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              14,
              15,
              16,
              17,
              21,
              22,
              23
            ]
          }
        ]
      },
      "assumptions": [
        "A adalah luas seluruh elektroda aktif, bukan luas dasar tangki. Rumus A/D memakai model pelat sejajar atau celah silinder yang tipis; abaikan efek ujung dan kapasitansi kabel.",
        "Dimensi visual level merupakan contoh untuk mengeksplorasi rumus. Soal hanya memberi variabel, bukan angka dimensi."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2023,
        "number": 3
      },
      "difficulty": "menengah",
      "estimatedMinutes": 24,
      "tags": [
        "Posisi, perpindahan, dan regangan"
      ],
      "statement": "(a) Bandingkan konstruksi dan keluaran encoder absolut dengan inkremental. (b) Sensor kapasitif mengukur level cairan; permitivitas cairan $k$ kali udara, luas aktif elektroda $A$, dan celah $D$. Pada gambar, $h=h_1+h_2$, sedangkan ujung bawah elektroda berada $h_0$ di atas dasar tangki. Turunkan kapasitansinya. (c) Gambar pengondisi sinyal untuk perubahan kapasitansi itu. (d) Jelaskan kerja LVDT pada gambar. (e) Jelaskan keunggulan dan kekurangan LVDT terhadap potensiometer.",
      "simulation": {
        "id": "2023-uts2-q3-visual",
        "type": "ipe-encoder",
        "title": "Encoder sudut",
        "caption": "Kode absolut menyatakan posisi, sedangkan pulsa A/B menyatakan perubahan dan arah.",
        "params": [
          {
            "key": "angle",
            "label": "Sudut θ",
            "min": 0,
            "max": 359.9,
            "step": 0.1,
            "defaultValue": 45,
            "unit": "°"
          },
          {
            "key": "bits",
            "label": "Jumlah bit",
            "min": 2,
            "max": 10,
            "step": 1,
            "defaultValue": 4
          }
        ],
        "data": {
          "bits": 4,
          "pulses": 16,
          "theta": 45,
          "visualKind": "encoder"
        }
      },
      "steps": [
        {
          "id": "2023-uts2-q3-step-1",
          "title": "3a · Baca posisi dari kode encoder absolut",
          "content": "Posisi mekanis dapat kita baca sebagai sinyal listrik melalui **encoder** (alat pembaca posisi). Encoder absolut memakai pola pada cakram atau skala. Pola tersebut memberi kode berbeda untuk setiap posisi yang dapat dibedakan alat.\n\nPada encoder optik, pembaca membaca beberapa jalur bersama sebagai satu kata kode biner atau Gray. Kode menunjukkan posisi saat itu. Pembaca dapat mengenali sudut dalam satu putaran tanpa menghitung gerak sejak alat menyala.\n\nBatas satu putaran tetap penting: kemampuan mengenali jumlah putaran memerlukan rancangan multiturn, bukan hanya lebih banyak kode dalam satu putaran.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Informasi posisi bergantung pada kode, acuan, dan tanda sinyal yang benar-benar tersedia.",
            "commonPitfall": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran."
          },
          "checkpoint": {
            "prompt": "Sebuah poros dapat bergeser saat daya mati. Setelah daya kembali, sistem harus membaca posisi dalam satu putaran tanpa menggerakkan poros untuk mencari acuan. Pilihan yang paling sesuai adalah…",
            "options": [
              {
                "id": "2023-uts2-q3-checkpoint-option-1",
                "label": "Encoder inkremental satu kanal, karena setiap pulsa adalah kode posisi unik.",
                "feedback": "Pola satu kanal berulang. Tanpa hitungan dan posisi awal, pulsa tidak mengidentifikasi sektor secara unik.",
                "misconceptionTag": "concept-2023-06-choice-1"
              },
              {
                "id": "2023-uts2-q3-checkpoint-option-2",
                "label": "Encoder inkremental dengan indeks Z, karena indeks menunjukkan semua sudut saat poros diam.",
                "feedback": "Indeks hanya aktif dekat satu posisi. Pada posisi lain saat diam, sistem belum mengetahui jaraknya dari indeks.",
                "misconceptionTag": "concept-2023-06-choice-2"
              },
              {
                "id": "2023-uts2-q3-checkpoint-option-3",
                "label": "Encoder absolut single-turn, karena kode saat ini menunjukkan posisi dalam satu putaran.",
                "feedback": "Benar. Kode unik per sektor memenuhi syarat membaca sudut dalam satu putaran tanpa gerak acuan."
              },
              {
                "id": "2023-uts2-q3-checkpoint-option-4",
                "label": "Encoder inkremental A/B tanpa penyimpanan posisi, karena dua kanal selalu memberi posisi absolut.",
                "feedback": "Dua kanal membedakan arah gerak, tetapi tidak memulihkan hitungan yang hilang saat daya mati.",
                "misconceptionTag": "concept-2023-06-choice-4"
              }
            ],
            "correctOptionId": "2023-uts2-q3-checkpoint-option-3"
          }
        },
        {
          "id": "2023-uts2-q3-step-2",
          "title": "Baca perubahan posisi dari encoder inkremental",
          "content": "Encoder inkremental memakai pola terang dan gelap atau pola magnetik yang berulang. Saat pola melewati pembaca, keluaran menjadi rangkaian pulsa. Pulsa itu memberi informasi gerak, bukan kode posisi yang unik.\n\nKanal A dan B biasanya bergeser seperempat siklus. Kanal yang lebih dulu berubah memberi arah putaran; jumlah pulsa yang dihitung memberi perubahan sudut. Kanal Z dapat memberi satu tanda acuan tiap putaran.\n\nJika hitungan hilang saat daya mati, pembaca perlu menemukan acuan lagi, kecuali sistem memiliki cara lain untuk menyimpan posisi. Menambah kanal Z tidak membuat setiap sudut memiliki kode absolut."
        },
        {
          "id": "2023-uts2-q3-step-3",
          "title": "3b · Tentukan bagian probe yang aktif",
          "content": "Pada sensor level, udara dan cairan mengisi ruang di antara dua elektroda. Permitivitas $\\varepsilon$ menyatakan pengaruh bahan di ruang itu terhadap kapasitansi; cairan memiliki nilai $k\\varepsilon_{\\rm air}$.\n\nProbe mulai pada ketinggian $h_0$ dari dasar. Jadi panjang aktifnya $L=h-h_0$. Untuk level cairan $h_2$, panjang probe yang tercelup adalah $h_2-h_0$, selama level masih di antara ujung bawah dan ujung atas probe.\n\n$$\nL=h-h_0,\\qquad\\eta=\\frac{h_2-h_0}{h-h_0},\\qquad0\\le\\eta\\le1\n$$",
          "simulation": {
            "id": "2023-uts2-q3-step-3-visual",
            "type": "ipe-capacitive",
            "title": "Sensor kapasitif",
            "caption": "Hanya bagian elektroda yang tercelup yang berubah permitivitasnya.",
            "params": [
              {
                "key": "height",
                "label": "Tinggi cairan h",
                "min": 0,
                "max": 1,
                "step": 0.01,
                "defaultValue": 0.5,
                "unit": "m"
              },
              {
                "key": "permittivity",
                "label": "Konstanta dielektrik κ",
                "min": 1,
                "max": 10,
                "step": 0.1,
                "defaultValue": 4
              }
            ],
            "data": {
              "height": 1,
              "deadHeight": 0.1,
              "level": 0.5,
              "k": 4,
              "area": 0.02,
              "gap": 0.005,
              "visualKind": "capacitive"
            }
          }
        },
        {
          "id": "2023-uts2-q3-step-4",
          "title": "Tentukan luas yang berhadapan dengan tiap bahan",
          "content": "Luas $A$ pada soal adalah seluruh luas elektroda aktif. Jika bentuknya seragam sepanjang tinggi, fraksi panjang yang tercelup sama dengan fraksi luas yang tercelup. Maka $A_{\\rm cair}=A\\eta$.\n\nSisa luas masih berhadapan dengan udara. Menjumlahkan kedua luas harus mengembalikan A; cek ini membantu menghindari menghitung daerah yang sama dua kali.\n\n$$\nA_{\\rm liquid}=A\\eta,\\qquad A_{\\rm air}=A(1-\\eta),\\qquad A_{\\rm liquid}+A_{\\rm air}=A\n$$"
        },
        {
          "id": "2023-uts2-q3-step-5",
          "title": "Jumlahkan kapasitansi dua daerah yang paralel",
          "content": "Kedua daerah berada pada pasangan elektroda yang sama, sehingga tegangannya sama. Muatan dari daerah udara dan cairan menambah muatan total. Hubungan ini sama dengan dua kapasitor paralel.\n\nPada model pelat sejajar atau celah tipis, $C=\\varepsilon A/D$, dengan $D$ jarak elektroda. Kita gunakan permitivitas udara pada luas udara, dan $k\\varepsilon_{\\rm air}$ pada luas cairan.\n\n$$\n\\begin{aligned}C&=C_{\\rm air\\ region}+C_{\\rm liquid\\ region}\\\\&=\\frac{\\varepsilon_{\\rm air}A(1-\\eta)}D+\\frac{k\\varepsilon_{\\rm air}A\\eta}D\\\\&=\\frac{\\varepsilon_{\\rm air}A}D[1+(k-1)\\eta]\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts2-q3-step-6",
          "title": "Tulis rumus sesuai semua tinggi pada gambar",
          "content": "Kita masukkan definisi $\\eta$ ke persamaan kapasitansi. Panjang bagian berisi udara adalah $h_1=h-h_2$, sehingga $L-(h_2-h_0)=h_1$.\n\nFaktor di luar kurung memuat luas per panjang aktif. Isi kurung menjumlahkan panjang udara dan panjang cairan yang diberi bobot k. Tidak ada angka dimensi yang perlu ditebak karena soal meminta bentuk simbolik.\n\n$$\n\\boxed{C=\\frac{\\varepsilon_{\\rm air}A}{D(h-h_0)}[h_1+k(h_2-h_0)]},\\qquad h_0\\le h_2\\le h\n$$"
        },
        {
          "id": "2023-uts2-q3-step-7",
          "title": "Cek probe kosong, penuh, dan batas geometri",
          "content": "Saat level tepat di ujung bawah, $\\eta=0$ dan seluruh celah aktif berisi udara: $C=C_{\\rm air}=\\varepsilon_{\\rm air}A/D$. Saat probe terendam penuh, $\\eta=1$ dan $C=kC_{\\rm air}$.\n\nJika cairan masih di bawah $h_0$, sensor belum merespons kenaikan level karena probe belum tercelup. Jika $k=1$, mengganti udara dengan cairan juga tidak mengubah kapasitansi.\n\nRumus $A/D$ memakai celah tipis. Untuk dua silinder konsentris dengan jari-jari $a,b$, gunakan bentuk tepat $C=2\\pi\\varepsilon_{\\rm air}[h_1+k(h_2-h_0)]/\\ln(b/a)$. Pembagian daerahnya tetap sama.",
          "simulation": {
            "id": "2023-uts2-q3-step-7-visual",
            "type": "ipe-capacitive",
            "title": "Sensor kapasitif",
            "caption": "Cek batas kosong dan penuh untuk memeriksa rumus.",
            "params": [
              {
                "key": "height",
                "label": "Tinggi cairan h",
                "min": 0,
                "max": 1,
                "step": 0.01,
                "defaultValue": 0.5,
                "unit": "m"
              },
              {
                "key": "permittivity",
                "label": "Konstanta dielektrik κ",
                "min": 1,
                "max": 10,
                "step": 0.1,
                "defaultValue": 4
              }
            ],
            "data": {
              "height": 1,
              "deadHeight": 0.1,
              "level": 0.5,
              "k": 4,
              "area": 0.02,
              "gap": 0.005,
              "visualKind": "capacitive"
            }
          }
        },
        {
          "id": "2023-uts2-q3-step-8",
          "title": "3c · Susun jembatan untuk membaca kapasitansi",
          "content": "Kita perlu mengubah kapasitansi menjadi sinyal yang mudah dibaca. Satu pilihan adalah **jembatan AC** (rangkaian pembanding dengan catu bolak-balik). Letakkan $C_s$ di kiri atas, $C_{\\rm ref}$ di kiri bawah, dan dua resistor sama besar di kanan.\n\nBeri tegangan AC antara titik atas dan bawah. Ukur selisih kedua titik tengah. AC memberi arus bolak-balik melalui kapasitor, sedangkan setelah transien selesai, catu DC tetap tidak memberi arus melalui kapasitor ideal.",
          "simulation": {
            "id": "2023-uts2-q3-step-8-visual",
            "type": "ipe-bridge",
            "title": "Jembatan ukur",
            "caption": "Jembatan AC mengubah ketidakseimbangan kapasitansi menjadi tegangan.",
            "params": [
              {
                "key": "capacitance",
                "label": "Kapasitansi sensor",
                "min": 10,
                "max": 300,
                "step": 1,
                "defaultValue": 100,
                "unit": "pF"
              },
              {
                "key": "voltage",
                "label": "Amplitudo eksitasi AC",
                "min": 0.1,
                "max": 5,
                "step": 0.1,
                "defaultValue": 1,
                "unit": "V"
              }
            ],
            "data": {
              "mode": "capacitive",
              "Cs": 100,
              "Cref": 100,
              "R": 10000,
              "excitation": 1,
              "visualKind": "bridge"
            }
          }
        },
        {
          "id": "2023-uts2-q3-step-9",
          "title": "Ikuti keluaran jembatan hingga menjadi pembacaan level",
          "content": "Impedansi kapasitor berbanding terbalik dengan kapasitansi: $Z_C=1/(j\\omega C)$. Oleh karena itu, pembagi tegangan sisi kiri memberi $V_{\\rm ex}C_s/(C_s+C_{\\rm ref})$; sisi kanan selalu memberi $V_{\\rm ex}/2$.\n\nSaat $C_s=C_{\\rm ref}$, selisihnya nol. Perubahan level mengubah $C_s$, lalu mengubah tegangan selisih. Penguat diferensial memperbesar selisih itu; demodulator sinkron dan penyaring lolos rendah menghasilkan keluaran untuk tampilan level.\n\n$$\nV_b=V_{\\rm ex}\\left(\\frac{C_s}{C_s+C_{\\rm ref}}-\\frac12\\right)\n$$"
        },
        {
          "id": "2023-uts2-q3-step-10",
          "title": "3d · Susun kumparan LVDT dan baca selisihnya",
          "content": "LVDT mengukur perpindahan lurus. Gambar skemanya memuat satu kumparan primer, dua kumparan sekunder, dan inti besi yang dapat bergerak sepanjang sumbu kumparan.\n\nEksitasi AC pada primer memberi fluks magnet bolak-balik. Posisi inti menentukan seberapa kuat fluks menghubungkan primer dengan tiap sekunder. Hubungkan kedua sekunder berlawanan agar keluaran menjadi $V_1-V_2$.\n\nPada posisi tengah, kedua tegangan hampir sama dan saling menghapus. Pergeseran inti meningkatkan satu kopling dan mengurangi kopling lainnya, sehingga selisih tidak lagi nol.\n\n$$\nV_o=V_1-V_2\n$$",
          "simulation": {
            "id": "2023-uts2-q3-step-10-visual",
            "type": "ipe-lvdt",
            "title": "LVDT",
            "caption": "Inti mengubah kopling dua sekunder; selisihnya menunjukkan posisi.",
            "params": [
              {
                "key": "position",
                "label": "Simpangan x",
                "min": -10,
                "max": 10,
                "step": 0.1,
                "defaultValue": 0,
                "unit": "mm"
              }
            ],
            "data": {
              "range": 10,
              "sensitivity": 0.31,
              "x": 0,
              "visualKind": "lvdt"
            }
          }
        },
        {
          "id": "2023-uts2-q3-step-11",
          "title": "Baca besar dan arah perpindahan LVDT",
          "content": "Dalam daerah linear, amplitudo selisih tegangan sebanding dengan besar perpindahan. Tetapi dua posisi pada sisi berlawanan dapat memberi amplitudo yang sama.\n\nFase sinyal terhadap eksitasi membedakan kedua sisi: sinyal berbalik fase 180° saat inti melewati tengah. Demodulator peka fase memakai informasi ini untuk memberi tegangan DC positif atau negatif.\n\nPada model di bawah, $x$ adalah perpindahan bertanda dan $\\omega_c$ frekuensi sudut eksitasi. Membaca amplitudo saja akan membuang informasi tanda $x$.\n\n$$\nV_o(t)=K_xx\\sin(\\omega_ct),\\qquad V_{\\rm DC}\\propto x\n$$",
          "simulation": {
            "id": "2023-uts2-q3-step-11-visual",
            "type": "ipe-lvdt",
            "title": "LVDT",
            "caption": "Perubahan fase menjaga informasi arah simpangan.",
            "params": [
              {
                "key": "position",
                "label": "Simpangan x",
                "min": -10,
                "max": 10,
                "step": 0.1,
                "defaultValue": 2,
                "unit": "mm"
              }
            ],
            "data": {
              "range": 10,
              "sensitivity": 0.31,
              "x": 2,
              "visualKind": "lvdt"
            }
          }
        },
        {
          "id": "2023-uts2-q3-step-12",
          "title": "3e · Pilih LVDT atau potensiometer sesuai kebutuhan",
          "content": "Potensiometer memakai kontak geser listrik, atau wiper, untuk membaca bagian tahanan sepanjang lintasan. Rangkaiannya ringkas dan dapat memakai catu DC, tetapi kontaknya dapat aus dan menambah derau.\n\nLVDT tidak membutuhkan kontak geser listrik pada inti. Keunggulannya adalah gerak ukur yang halus tanpa keausan wiper. Namun alat memerlukan eksitasi AC dan pengondisi sinyal; ukuran serta biayanya dapat lebih besar.\n\nKeduanya tetap memiliki batas: LVDT perlu bekerja dalam daerah linearnya, dan resolusi praktisnya dipengaruhi derau serta rangkaian baca. Tidak adanya wiper tidak berarti ketelitian tak terbatas."
        }
      ],
      "finalAnswer": "Encoder absolut memberi kode posisi; inkremental memberi pulsa perubahan posisi. Kapasitansi menjumlahkan daerah udara dan cairan. Jembatan AC membaca perubahannya. LVDT membaca selisih dua sekunder tanpa kontak geser listrik.\n\n$$\n\\boxed{C=\\frac{\\varepsilon_{\\rm air}A}{D}\\left[1+(k-1)\\frac{h_2-h_0}{h-h_0}\\right]}\n$$",
      "takeaway": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran.",
      "sourceNotes": [
        "Bagian 1, halaman PDF 12-13, menghubungkan sensitivitas dengan kemiringan keluaran terhadap input. Setelah memakai geometri level di Bagian 3, halaman PDF 22, turunkan $dC/dh$ dari persamaan kapasitansi Anda. Ini menguji apakah perubahan tinggi memberi perubahan keluaran yang sesuai. Halaman PDF 3 pada Bagian 1 menjelaskan mengapa perubahan kapasitansi masih memerlukan pengondisi sinyal."
      ]
    },
    {
      "id": "2023-uas-q4",
      "kind": "problem",
      "slug": "2023-uas-q4",
      "title": "Resolver, LVDT, dan akselerometer",
      "source": "UAS 2023 · Soal 4",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
        "file": "2023-uas.pdf",
        "pages": [
          1,
          2,
          3
        ],
        "original": "4. Position Sensors\na. [7%] Please explain the working principle of the following resolver.\nb. [8%] Sketch an LVDT and explain how does an LVDT works?\nc. [15%] An LVDT is used to measure the seismic mass displacement in an accelerometer. The LVDT output (with signal conditioning) is 0.31 mV/mm, and the maximum LVDT core displacement is ±10 mm. The spring constant is 240 N/m, the seismic mass is m = m1 + m2 = 0.05 kg, and the damping coefficient is c = 3.46 N.s/m.\ni. The relationship between the acceleration m/s² and the output voltage.\nii. The maximum measurable acceleration m/s².",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view",
            "title": "Pengukuran Teknik, Bagian 2 (2022)",
            "pages": [
              7,
              8,
              10
            ]
          },
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              15,
              16,
              18,
              19,
              23
            ]
          }
        ]
      },
      "assumptions": [
        "Koordinat simpangan diukur dari keseimbangan statik sehingga berat dan gaya pegas awal saling meniadakan. Tanda keluaran bergantung sambungan LVDT.",
        "Batas percepatan numerik memakai kondisi kuasistatik. Pada frekuensi lain, gunakan fungsi respons dinamik."
      ],
      "exam": {
        "term": "UAS",
        "year": 2023,
        "number": 4
      },
      "difficulty": "menengah",
      "estimatedMinutes": 26,
      "tags": [
        "Posisi, perpindahan, dan regangan"
      ],
      "statement": "(a) Jelaskan prinsip resolver dengan keluaran sinus dan kosinus pada gambar. (b) Gambar LVDT dan jelaskan kerjanya. (c) LVDT membaca simpangan massa seismik akselerometer. Sensitivitas setelah pengondisi sinyal $S=0.31\\,\\mathrm{mV/mm}$, batas simpangan inti ±10 mm, $k=240\\,\\mathrm{N/m}$, $m=m_1+m_2=0.05\\,\\mathrm{kg}$, dan $c=3.46\\,\\mathrm{N\\,s/m}$. Tentukan (i) hubungan percepatan alas dengan tegangan keluaran dan (ii) batas percepatan yang dapat terbaca.",
      "simulation": {
        "id": "2023-uas-q4-visual",
        "type": "ipe-resolver",
        "title": "Resolver",
        "caption": "Dua amplitudo bersama-sama menunjukkan sudut dan kuadran.",
        "params": [
          {
            "key": "angle",
            "label": "Sudut rotor θ",
            "min": 0,
            "max": 360,
            "step": 1,
            "defaultValue": 30,
            "unit": "°"
          }
        ],
        "data": {
          "excitation": 1,
          "theta": 30,
          "visualKind": "resolver"
        }
      },
      "steps": [
        {
          "id": "2023-uas-q4-step-1",
          "title": "4a · Hubungkan sudut rotor dengan dua tegangan resolver",
          "content": "Resolver mengukur sudut melalui kopling magnet antar-kumparan. Eksitasi AC pada rotor menghasilkan fluks yang berubah terhadap waktu. Dua kumparan stator menghadap arah yang berbeda 90°.\n\nPada sudut rotor $\\theta$, amplitudo keluaran stator mengikuti $\\sin\\theta$ dan $\\cos\\theta$. Kedua tegangan tetap memakai frekuensi pembawa AC yang sama; yang berubah dengan posisi adalah amplitudonya.\n\nDalam persamaan, $V_r$ adalah amplitudo eksitasi, $K$ faktor kopling, dan $\\omega_c$ frekuensi sudut pembawa. Pada bentuk tanpa sikat, transformator putar menyalurkan eksitasi tanpa kontak geser.\n\n$$\nv_s(t)=KV_r\\sin\\theta\\sin\\omega_ct,\\qquad v_c(t)=KV_r\\cos\\theta\\sin\\omega_ct\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Informasi posisi bergantung pada kode, acuan, dan tanda sinyal yang benar-benar tersedia.",
            "commonPitfall": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran."
          },
          "checkpoint": {
            "prompt": "Akselerometer massa dan pegas memakai LVDT untuk membaca simpangan relatif inti. Teknisi menghitung batas percepatan dari kekakuan pegas dan batas gerak inti dengan model kuasistatik, lalu menerapkannya pada semua frekuensi. Apa yang perlu diperbaiki?",
            "options": [
              {
                "id": "2023-uas-q4-checkpoint-option-1",
                "label": "Batas gerak tetap berlaku, tetapi hubungan percepatan dengan simpangan perlu memakai massa, pegas, redaman, dan frekuensi masukan.",
                "feedback": "Benar. Model dinamik diperlukan untuk menghubungkan batas simpangan tetap dengan batas percepatan pada tiap frekuensi."
              },
              {
                "id": "2023-uas-q4-checkpoint-option-2",
                "label": "LVDT sebenarnya membaca percepatan absolut secara langsung, sehingga model mekanis tidak diperlukan.",
                "feedback": "LVDT mengukur posisi inti terhadap rumah. Hubungan posisi itu dengan percepatan berasal dari model mekanis.",
                "misconceptionTag": "concept-2023-10-choice-2"
              },
              {
                "id": "2023-uas-q4-checkpoint-option-3",
                "label": "Cukup membalik tanda tegangan; sensitivitas amplitudo tidak pernah bergantung frekuensi.",
                "feedback": "Polaritas mengubah tanda, bukan menghapus ketergantungan amplitudo pada frekuensi.",
                "misconceptionTag": "concept-2023-10-choice-3"
              },
              {
                "id": "2023-uas-q4-checkpoint-option-4",
                "label": "Batas gerak inti harus dianggap tidak berlaku pada getaran sinus.",
                "feedback": "Batas gerak adalah batas fisik inti. Getaran sinus tetap dapat melampauinya.",
                "misconceptionTag": "concept-2023-10-choice-4"
              }
            ],
            "correctOptionId": "2023-uas-q4-checkpoint-option-1"
          }
        },
        {
          "id": "2023-uas-q4-step-2",
          "title": "Gunakan kedua tanda untuk menentukan kuadran",
          "content": "Demodulasi membandingkan setiap keluaran dengan eksitasi untuk mengambil amplitudo bertanda. Tanda positif atau negatif memuat informasi sisi sudut, bukan hanya besar tegangan.\n\nPerbandingan $V_s/V_c=\\tan\\theta$ belum membedakan sudut yang terpisah 180°. Fungsi $\\operatorname{atan2}(V_s,V_c)$ memakai kedua tanda secara terpisah sehingga dapat memilih kuadran.\n\n$$\nV_s=KV_r\\sin\\theta,\\quad V_c=KV_r\\cos\\theta,\\quad\\theta=\\operatorname{atan2}(V_s,V_c)\n$$"
        },
        {
          "id": "2023-uas-q4-step-3",
          "title": "4b · Gambar susunan LVDT",
          "content": "LVDT mengukur perpindahan lurus. Tunjukkan satu primer di antara dua sekunder, inti magnet yang bergerak sepanjang sumbu, serta rumah sensor yang menjadi acuan posisi.\n\nEksitasi AC pada primer menimbulkan tegangan pada kedua sekunder. Hubungkan sekunder secara seri berlawanan sehingga tegangan keluarannya adalah selisih $V_1-V_2$.\n\nInti di tengah memberi kopling yang hampir sama dan keluaran mendekati nol. Jika inti bergeser, satu kopling meningkat dan yang lain menurun.\n\n$$\nV_{\\rm diff}=V_1-V_2\n$$",
          "simulation": {
            "id": "2023-uas-q4-step-3-visual",
            "type": "ipe-lvdt",
            "title": "LVDT",
            "caption": "Dua sekunder mengukur simpangan inti terhadap rumah sensor.",
            "params": [
              {
                "key": "position",
                "label": "Simpangan x",
                "min": -10,
                "max": 10,
                "step": 0.1,
                "defaultValue": 0,
                "unit": "mm"
              }
            ],
            "data": {
              "range": 10,
              "sensitivity": 0.31,
              "x": 0,
              "visualKind": "lvdt"
            }
          }
        },
        {
          "id": "2023-uas-q4-step-4",
          "title": "Bedakan sinyal AC LVDT dari keluaran yang sudah dikondisikan",
          "content": "Besar tegangan AC memberi besar simpangan, sedangkan fase terhadap eksitasi membedakan sisi simpangan. Pengondisi peka fase mengubah keduanya menjadi tegangan bertanda yang sebanding dengan posisi dalam daerah linear.\n\nSoal memberi sensitivitas sesudah pengondisi: $S=0.31$ mV/mm. Hubungan satuannya adalah 1 mV = 0.001 V dan 1 mm = 0.001 m. Konversi tersebut memberi sensitivitas setara 0.31 V/m.\n\nHubungan $E=Sz$ membaca simpangan inti terhadap rumah, bukan posisi inti terhadap tanah. Hal ini menentukan koordinat yang perlu kita pakai pada model mekanis.\n\n$$\nE=Sz,\\qquad S=\\frac{0.00031\\ \\mathrm V}{0.001\\ \\mathrm m}=0.31\\ \\mathrm{V/m}\n$$"
        },
        {
          "id": "2023-uas-q4-step-5",
          "title": "4c(i) · Pilih koordinat untuk massa dan rumah",
          "content": "Kita ambil arah ke atas sebagai positif. Sebut $y$ gerak rumah sensor, $x$ gerak absolut massa, dan $z=x-y$ simpangan massa relatif terhadap rumah. Kita ukur $z$ dari keadaan setimbang statik.\n\nPercepatan yang ingin diukur adalah $a=\\ddot y$, yaitu percepatan rumah. Tanda dua titik menyatakan turunan kedua terhadap waktu. Hubungan $x=z+y$ memberi percepatan absolut massa $\\ddot x=\\ddot z+a$.\n\nKedua bagian massa bergerak bersama, sehingga massa dalam persamaan adalah m1+m2=0.05 kg. Memakai hanya satu bagian akan mengubah sensitivitas dan frekuensi alami.\n\n$$\nz=x-y,\\qquad a=\\ddot y,\\qquad\\ddot x=\\ddot z+a,\\qquad m=m_1+m_2=0.05\\ \\mathrm{kg}\n$$"
        },
        {
          "id": "2023-uas-q4-step-6",
          "title": "Tulis gaya nyata dan gaya inersia pada massa yang sama",
          "content": "Pada keadaan awal, pegas menopang berat. Dengan z diukur dari keadaan itu, gaya pegas total adalah mg−kz, sedangkan berat adalah −mg. Kedua suku mg saling menghapus dalam persamaan perubahan.\n\nPeredam melawan kecepatan relatif, sehingga gayanya $-c\\dot z$. Neraca D'Alembert menambahkan gaya inersia $-m\\ddot x$, lalu menjumlahkan semuanya menjadi nol. Gaya inersia memakai percepatan absolut massa.\n\n$$\n(mg-kz)-mg-c\\dot z-m\\ddot x=0\n$$",
          "simulation": {
            "id": "2023-uas-q4-step-6-visual",
            "type": "ipe-accelerometer",
            "title": "Akselerometer",
            "caption": "Gaya nyata dan gaya inersia harus memenuhi neraca pada massa yang sama.",
            "params": [
              {
                "key": "frequency",
                "label": "Frekuensi masukan",
                "min": 0.1,
                "max": 19.847840235184517,
                "step": 0.1,
                "defaultValue": 2,
                "unit": "Hz"
              },
              {
                "key": "acceleration",
                "label": "Amplitudo percepatan",
                "min": 0,
                "max": 57.599999999999994,
                "step": 0.1,
                "defaultValue": 9.81,
                "unit": "m/s²"
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
              "damping": 0.4994079828490263,
              "sensitivity": 0.31,
              "maxTravel": 0.01,
              "frequency": 2,
              "acceleration": 9.81,
              "m": 0.05,
              "k": 240,
              "c": 3.46,
              "omegaN": 69.2820323027551,
              "visualKind": "accelerometer"
            }
          }
        },
        {
          "id": "2023-uas-q4-step-7",
          "title": "Dapatkan persamaan gerak relatif",
          "content": "Kita masukkan $\\ddot x=\\ddot z+a$. Setelah suku mg saling menghapus, persamaan memuat gaya pegas, gaya peredam, dan percepatan massa.\n\nTambahkan semua suku gerak relatif ke kedua ruas untuk menyusunnya di kiri. Percepatan rumah menjadi masukan di kanan dengan tanda negatif: saat rumah dipercepat ke atas, massa cenderung tertinggal relatif ke bawah.\n\n$$\n\\begin{aligned}-kz-c\\dot z-m(\\ddot z+a)&=0\\\\m\\ddot z+c\\dot z+kz&=-ma\\\\0.05\\ddot z+3.46\\dot z+240z&=-0.05a\\end{aligned}\n$$"
        },
        {
          "id": "2023-uas-q4-step-8",
          "title": "Ubah model gerak menjadi hubungan tegangan dengan percepatan",
          "content": "Untuk keadaan awal nol, transformasi Laplace mengubah $\\dot z$ menjadi $sZ(s)$ dan $\\ddot z$ menjadi $s^2Z(s)$. **Transformasi Laplace** (perubahan bentuk matematis dari waktu ke variabel s) membuat model menjadi persamaan aljabar.\n\nKita keluarkan $Z(s)$ sebagai faktor, lalu bagi dengan koefisiennya untuk mendapat $Z/A$. Hubungan $E=Sz$ menunjukkan bahwa kita perlu mengalikan hasil itu dengan sensitivitas LVDT.\n\n$$\n\\begin{aligned}(ms^2+cs+k)Z(s)&=-mA(s)\\\\\\frac{Z(s)}{A(s)}&=-\\frac m{ms^2+cs+k}\\\\\\frac{E(s)}{A(s)}&=-\\frac{Sm}{ms^2+cs+k}\\end{aligned}\n$$",
          "simulation": {
            "id": "2023-uas-q4-step-8-visual",
            "type": "ipe-accelerometer",
            "title": "Akselerometer",
            "caption": "Bandingkan gerak rumah dan massa pada frekuensi yang sama.",
            "params": [
              {
                "key": "frequency",
                "label": "Frekuensi masukan",
                "min": 0.1,
                "max": 19.847840235184517,
                "step": 0.1,
                "defaultValue": 2,
                "unit": "Hz"
              },
              {
                "key": "acceleration",
                "label": "Amplitudo percepatan",
                "min": 0,
                "max": 57.599999999999994,
                "step": 0.1,
                "defaultValue": 9.81,
                "unit": "m/s²"
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
              "damping": 0.4994079828490263,
              "sensitivity": 0.31,
              "maxTravel": 0.01,
              "frequency": 2,
              "acceleration": 9.81,
              "m": 0.05,
              "k": 240,
              "c": 3.46,
              "omegaN": 69.2820323027551,
              "visualKind": "accelerometer"
            }
          }
        },
        {
          "id": "2023-uas-q4-step-9",
          "title": "Masukkan konstanta dan kenali batas frekuensinya",
          "content": "Kita bagi pembilang dan penyebut dengan m=0.05 kg. Koefisien c/m menjadi 69.2 dan k/m menjadi 4800. Tegangan pada bentuk ini memakai volt karena S memakai V/m.\n\nFrekuensi alami $\\omega_n=\\sqrt{k/m}$ memberi skala frekuensi mekanis; rasio redaman $\\zeta=c/(2\\sqrt{km})$ mengatur pengaruh peredam. Nilainya menunjukkan bahwa sensitivitas tidak konstan pada semua frekuensi.\n\n$$\n\\boxed{\\frac{E(s)}{A(s)}=-\\frac{0.31}{s^2+69.2s+4800}}\\quad\\frac{\\mathrm V}{\\mathrm{m/s^2}},\\qquad\\omega_n=69.282\\ \\mathrm{rad/s},\\quad f_n=\\frac{\\omega_n}{2\\pi}=11.027\\ \\mathrm{Hz},\\quad\\zeta=0.4994\n$$"
        },
        {
          "id": "2023-uas-q4-step-10",
          "title": "Ambil pendekatan untuk percepatan yang berubah lambat",
          "content": "Jika frekuensi masukan jauh di bawah $\\omega_n$, gerak relatif berubah cukup lambat sehingga $m\\ddot z$ dan $c\\dot z$ kecil dibanding $kz$. Model lalu mendekati $kz=-ma$.\n\nKita bagi dengan $k$, lalu gunakan $E=Sz$. Tanda negatif berasal dari arah simpangan relatif yang kita pilih; membalik kabel keluaran membalik tanda tanpa mengubah besar sensitivitas.\n\n$$\nz\\approx-\\frac mk a,\\qquad E\\approx-\\frac{Sm}{k}a=-\\frac{0.31(0.05)}{240}a\\quad[\\mathrm V]\n$$",
          "simulation": {
            "id": "2023-uas-q4-step-10-visual",
            "type": "ipe-accelerometer",
            "title": "Akselerometer",
            "caption": "Pada frekuensi rendah, simpangan relatif sebanding dengan percepatan.",
            "params": [
              {
                "key": "frequency",
                "label": "Frekuensi masukan",
                "min": 0.1,
                "max": 19.847840235184517,
                "step": 0.1,
                "defaultValue": 1,
                "unit": "Hz"
              },
              {
                "key": "acceleration",
                "label": "Amplitudo percepatan",
                "min": 0,
                "max": 57.599999999999994,
                "step": 0.1,
                "defaultValue": 9.81,
                "unit": "m/s²"
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
              "damping": 0.4994079828490263,
              "sensitivity": 0.31,
              "maxTravel": 0.01,
              "frequency": 1,
              "acceleration": 9.81,
              "m": 0.05,
              "k": 240,
              "c": 3.46,
              "omegaN": 69.2820323027551,
              "visualKind": "accelerometer"
            }
          }
        },
        {
          "id": "2023-uas-q4-step-11",
          "title": "Nyatakan sensitivitas dalam mV dan cara membacanya",
          "content": "Koefisien pada langkah sebelumnya adalah 0.0000645833 V per m/s². Kita kalikan dengan 1000 untuk memakai mV: besar sensitivitas menjadi 0.0645833 mV per m/s².\n\nJika keluaran yang diketahui berupa mV, bagi dengan sensitivitas tersebut untuk memperoleh percepatan. Hubungan ini hanya memakai pendekatan frekuensi rendah yang sudah disebut.\n\n$$\nE[\\mathrm{mV}]\\approx-0.0645833\\,a[\\mathrm{m/s^2}],\\qquad a[\\mathrm{m/s^2}]\\approx-15.4839\\,E[\\mathrm{mV}]\n$$"
        },
        {
          "id": "2023-uas-q4-step-12",
          "title": "4c(ii) · Gunakan batas simpangan inti",
          "content": "Batas ±10 mm adalah simpangan relatif inti dari tengah, sehingga besar batasnya zmax=0.010 m. Dalam pendekatan lambat, besar percepatan yang mencapai batas itu adalah k zmax/m.\n\nTegangan pada batas tersebut adalah sensitivitas LVDT dikali 10 mm. Ini memberi cek lain: percepatan 48 m/s² dikali sensitivitas tegangan juga menghasilkan 3.1 mV.\n\n$$\n|a|_{\\max}=\\frac{kz_{\\max}}m=\\frac{240(0.010)}{0.05}=\\boxed{48\\ \\mathrm{m/s^2}},\\qquad |E|_{\\max}=0.31(10)=3.1\\ \\mathrm{mV}\n$$",
          "simulation": {
            "id": "2023-uas-q4-step-12-visual",
            "type": "ipe-accelerometer",
            "title": "Akselerometer",
            "caption": "Batas ±10 mm berlaku pada simpangan relatif inti.",
            "params": [
              {
                "key": "frequency",
                "label": "Frekuensi masukan",
                "min": 0.1,
                "max": 19.847840235184517,
                "step": 0.1,
                "defaultValue": 1,
                "unit": "Hz"
              },
              {
                "key": "acceleration",
                "label": "Amplitudo percepatan",
                "min": 0,
                "max": 57.599999999999994,
                "step": 0.1,
                "defaultValue": 48,
                "unit": "m/s²"
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
              "damping": 0.4994079828490263,
              "sensitivity": 0.31,
              "maxTravel": 0.01,
              "frequency": 1,
              "acceleration": 48,
              "m": 0.05,
              "k": 240,
              "c": 3.46,
              "omegaN": 69.2820323027551,
              "visualKind": "accelerometer"
            }
          }
        },
        {
          "id": "2023-uas-q4-step-13",
          "title": "Jelaskan mengapa batas 48 m/s² bukan untuk semua frekuensi",
          "content": "Pada masukan sinus dengan frekuensi sudut $\\omega$, substitusi $s=j\\omega$ pada model memberi amplitudo simpangan $\\hat z=m\\hat a/\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}$.\n\nBatas mekanis tetap ±10 mm, tetapi percepatan yang menghasilkan simpangan itu dapat berubah menurut frekuensi. Untuk menemukan batas percepatan dinamik, setel amplitudo simpangan sama dengan zmax lalu selesaikan amplitudo percepatan.\n\nSoal tidak memberi frekuensi masukan. Oleh karena itu, 48 m/s² merupakan jawaban numerik dengan syarat kuasistatik, yaitu percepatan yang berubah cukup lambat.\n\n$$\n\\hat a_{\\max}(\\omega)=\\frac{z_{\\max}}m\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}\\quad\\longrightarrow\\quad48\\ \\mathrm{m/s^2}\\ \\text{as }\\omega\\to0\n$$"
        }
      ],
      "finalAnswer": "Resolver memakai dua keluaran sinus/kosinus; LVDT memakai selisih sekunder. Model dinamik E/A = −0.31/(s²+69.2s+4800). Pada frekuensi rendah, sensitivitas 0.0645833 mV/(m/s²) dan batas percepatan ±48 m/s².\n\n$$\n\\boxed{\\begin{aligned}|E|&\\approx0.0645833|a|\\quad[\\mathrm{mV}]\\\\|a|_{\\max}&=48\\ \\mathrm{m/s^2}\\quad(\\omega\\ll\\omega_n)\\end{aligned}}\n$$",
      "takeaway": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran.",
      "sourceNotes": [
        "Bagian 2, halaman PDF 7-8, memberi model respons orde dua. Di sini, LVDT membaca simpangan **relatif** massa terhadap alas. Dengan $z=x-y$, neraca gaya memberi $m\\ddot z+c\\dot z+kz=-m\\ddot y$. Kalikan hubungan simpangan itu dengan sensitivitas LVDT untuk memperoleh tegangan.",
        "Bagian 2, halaman PDF 10, dan Bagian 3, halaman PDF 19, menekankan batas frekuensi kerja. Pendekatan $z\\approx-ma/k$ berlaku jauh di bawah frekuensi alami. Karena itu, batas percepatan dari simpangan maksimum perlu menyebut batas frekuensinya; nilai statik tidak berlaku pada semua frekuensi."
      ]
    },
    {
      "id": "ipe-position-practice",
      "kind": "practice",
      "slug": "ipe-position-practice",
      "title": "Latihan: Posisi, perpindahan, dan regangan",
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "intro": "Latihan ini membantu Anda memilih model dan menjelaskan alasan. Mulai dari pilihan ganda, tinjau contoh yang keliru, lalu susun jawaban sendiri. Gunakan rubrik untuk memeriksa alur, asumsi, dan batas kesimpulan Anda.",
      "questions": [
        {
          "id": "concept-2023-06",
          "prompt": "Sebuah poros dapat bergeser saat daya mati. Setelah daya kembali, sistem harus membaca posisi dalam satu putaran tanpa menggerakkan poros untuk mencari acuan. Pilihan yang paling sesuai adalah…",
          "options": [
            {
              "id": "concept-2023-06-option-1",
              "label": "Encoder inkremental satu kanal, karena setiap pulsa adalah kode posisi unik.",
              "feedback": "Pola satu kanal berulang. Tanpa hitungan dan posisi awal, pulsa tidak mengidentifikasi sektor secara unik.",
              "misconceptionTag": "concept-2023-06-choice-1"
            },
            {
              "id": "concept-2023-06-option-2",
              "label": "Encoder inkremental dengan indeks Z, karena indeks menunjukkan semua sudut saat poros diam.",
              "feedback": "Indeks hanya aktif dekat satu posisi. Pada posisi lain saat diam, sistem belum mengetahui jaraknya dari indeks.",
              "misconceptionTag": "concept-2023-06-choice-2"
            },
            {
              "id": "concept-2023-06-option-3",
              "label": "Encoder absolut single-turn, karena kode saat ini menunjukkan posisi dalam satu putaran.",
              "feedback": "Benar. Kode unik per sektor memenuhi syarat membaca sudut dalam satu putaran tanpa gerak acuan."
            },
            {
              "id": "concept-2023-06-option-4",
              "label": "Encoder inkremental A/B tanpa penyimpanan posisi, karena dua kanal selalu memberi posisi absolut.",
              "feedback": "Dua kanal membedakan arah gerak, tetapi tidak memulihkan hitungan yang hilang saat daya mati.",
              "misconceptionTag": "concept-2023-06-choice-4"
            }
          ],
          "correctOptionId": "concept-2023-06-option-3",
          "explanation": "Encoder absolut single-turn memberi kode posisi saat dibaca, sehingga tidak perlu mengumpulkan pulsa gerak sejak acuan. A/B memberi arah dan perubahan posisi; indeks Z memberi satu tanda acuan, bukan kode untuk semua sudut. Kebutuhan soal hanya dalam satu putaran, sehingga belum memerlukan informasi jumlah putaran.",
          "relatedProblemId": "2023-uts2-q3"
        },
        {
          "id": "concept-2023-07",
          "prompt": "Pada probe level dengan dua elektroda tegak, bagian atas celah berisi udara dan bagian bawah berisi cairan. Kedua bagian terhubung ke pasangan elektroda yang sama. Mengapa kapasitansi kedua daerah dijumlahkan seperti kapasitor paralel?",
          "options": [
            {
              "id": "concept-2023-07-option-1",
              "label": "Kedua daerah mengalami tegangan yang sama, sementara muatan keduanya menambah muatan total.",
              "feedback": "Benar. Kesamaan beda tegangan dan penjumlahan muatan menentukan model paralel."
            },
            {
              "id": "concept-2023-07-option-2",
              "label": "Cairan meniadakan semua kapasitansi pada daerah udara.",
              "feedback": "Daerah udara tetap menyumbang kapasitansi selama masih berada dalam bagian elektroda aktif.",
              "misconceptionTag": "concept-2023-07-choice-2"
            },
            {
              "id": "concept-2023-07-option-3",
              "label": "Arus harus melewati udara lalu cairan karena udara berada di atas cairan.",
              "feedback": "Posisi atas dan bawah tidak memaksa hubungan seri. Di sini medan melintasi celah antara elektroda pada tiap ketinggian.",
              "misconceptionTag": "concept-2023-07-choice-3"
            },
            {
              "id": "concept-2023-07-option-4",
              "label": "Semua kapasitor dengan bahan dielektrik berbeda selalu tersusun paralel.",
              "feedback": "Bahan berbeda tidak menentukan hubungan rangkaian. Geometri dan sambungan elektroda yang menentukannya.",
              "misconceptionTag": "concept-2023-07-choice-4"
            }
          ],
          "correctOptionId": "concept-2023-07-option-1",
          "explanation": "Susunan listrik ditentukan oleh elektroda dan arah medan, bukan semata urutan atas dan bawah. Kedua daerah memiliki beda tegangan yang sama dan menyumbang muatan ke terminal yang sama, sehingga kapasitansi menambah. Model seri baru sesuai jika lapisan tersusun berturut-turut sepanjang arah medan dengan pembagian tegangan.",
          "relatedProblemId": "2023-uts2-q3"
        },
        {
          "id": "concept-2024-10",
          "prompt": "Sebuah DC LVDT menerima catu DC dan menghasilkan tegangan DC yang mengikuti posisi inti. Pernyataan mana yang menjelaskan cara kerjanya dengan tepat?",
          "options": [
            {
              "id": "concept-2024-10-option-1",
              "label": "Rangkaian internal membuat eksitasi AC, lalu mendemodulasi selisih sekunder menjadi keluaran DC.",
              "feedback": "Benar. Rangkaian ini memungkinkan antarmuka DC sambil mempertahankan prinsip transformator AC di dalamnya."
            },
            {
              "id": "concept-2024-10-option-2",
              "label": "Primer menerima DC tetap dan terus menginduksi tegangan sekunder tanpa perubahan medan.",
              "feedback": "DC tetap tidak terus menghasilkan induksi setelah kondisi transien berakhir. Eksitasi AC menyediakan perubahan medan yang diperlukan.",
              "misconceptionTag": "concept-2024-10-choice-2"
            },
            {
              "id": "concept-2024-10-option-3",
              "label": "Dua tegangan sekunder dijumlahkan agar arah perpindahan selalu terlihat dari nilainya.",
              "feedback": "Sekunder disusun saling mengurangi. Selisih dan fase terhadap eksitasi, bukan jumlah amplitudo saja, memberi informasi posisi bertanda.",
              "misconceptionTag": "concept-2024-10-choice-3"
            },
            {
              "id": "concept-2024-10-option-4",
              "label": "Inti menggeser kontak listrik sehingga LVDT bekerja seperti potensiometer.",
              "feedback": "LVDT membaca perubahan kopling magnetik; ia tidak memerlukan kontak geser untuk membaca posisi inti.",
              "misconceptionTag": "concept-2024-10-choice-4"
            }
          ],
          "correctOptionId": "concept-2024-10-option-1",
          "explanation": "Istilah DC LVDT menjelaskan catu dan keluaran pada antarmuka. Proses induksi di dalamnya tetap memerlukan medan yang berubah, sehingga primer memakai AC. Selisih sekunder serta demodulasi yang peka fase mempertahankan besar dan tanda perpindahan.",
          "relatedProblemId": "2024-uas-q6"
        },
        {
          "id": "concept-2025-04",
          "prompt": "Dua gauge D dipasang melintang dan merekat pada permukaan balok yang mengalami lentur. Seorang mahasiswa menyebut keduanya “dummy, jadi pasti tanpa regangan”. Penilaian mana yang paling tepat?",
          "options": [
            {
              "id": "concept-2025-04-option-1",
              "label": "Benar, orientasi melintang selalu menghapus seluruh respons mekanik.",
              "feedback": "Melintang masih dapat mengalami regangan akibat efek Poisson.",
              "misconceptionTag": "concept-2025-04-choice-1"
            },
            {
              "id": "concept-2025-04-option-2",
              "label": "Benar, semua gauge dalam jembatan hanya merespons suhu.",
              "feedback": "Jembatan membaca perubahan tahanan, termasuk perubahan akibat regangan mekanik.",
              "misconceptionTag": "concept-2025-04-choice-2"
            },
            {
              "id": "concept-2025-04-option-3",
              "label": "Belum tepat: gauge yang merekat dapat membaca regangan Poisson, walaupun juga membantu kompensasi suhu.",
              "feedback": "Tepat. Respons mekanik dan peran kompensasi suhu dapat hadir bersamaan."
            },
            {
              "id": "concept-2025-04-option-4",
              "label": "Salah, gauge melintang harus mengalami regangan yang sama tanda dan besarnya dengan gauge memanjang.",
              "feedback": "Regangan melintang berhubungan dengan rasio Poisson dan umumnya berlawanan tanda; tidak sama begitu saja.",
              "misconceptionTag": "concept-2025-04-choice-4"
            }
          ],
          "correctOptionId": "concept-2025-04-option-3",
          "explanation": "Orientasi gauge menentukan komponen regangan yang dibaca, bukan menjamin regangan nol. Tarikan memanjang dapat disertai penyusutan melintang, dan sebaliknya. Gauge D yang merekat dapat ikut memberi sinyal mekanik; model dummy tanpa regangan memerlukan pemisahan mekanik atau asumsi yang jelas.",
          "relatedProblemId": "2025-uts2-q4"
        },
        {
          "id": "concept-2025-08",
          "prompt": "Dua posisi rotor resolver memberi rasio sinyal sinus terhadap kosinus yang sama. Namun, tanda kedua sinyal berbalik antara posisi pertama dan kedua. Bagaimana pembaca sudut dapat membedakan kedua posisi?",
          "options": [
            {
              "id": "concept-2025-08-option-1",
              "label": "Pertahankan tanda kedua kanal setelah demodulasi, lalu tentukan sudut dengan atan2 sehingga kuadrannya tetap diketahui.",
              "feedback": "Tepat. Dua tanda membedakan kuadran, sedangkan besar relatif kedua kanal menentukan sudut di dalam kuadran."
            },
            {
              "id": "concept-2025-08-option-2",
              "label": "Gunakan hanya nilai mutlak rasio sinus terhadap kosinus; tanda tidak membawa informasi sudut.",
              "feedback": "Nilai mutlak membuang tanda, sehingga beberapa kuadran menjadi tak dapat dibedakan.",
              "misconceptionTag": "concept-2025-08-choice-2"
            },
            {
              "id": "concept-2025-08-option-3",
              "label": "Tambahkan tegangan kedua kanal; jumlahnya selalu menentukan satu sudut penuh secara unik.",
              "feedback": "Jumlah sinus dan kosinus tidak memberi pemetaan satu-ke-satu untuk seluruh putaran. Beberapa sudut dapat memberi jumlah yang sama.",
              "misconceptionTag": "concept-2025-08-choice-3"
            },
            {
              "id": "concept-2025-08-option-4",
              "label": "Ukur hanya amplitudo kanal sinus; satu kanal sudah membedakan semua sudut sepanjang satu putaran.",
              "feedback": "Satu nilai sinus dapat berasal dari lebih dari satu sudut. Kanal kosinus beserta tandanya menghilangkan ambiguitas tersebut.",
              "misconceptionTag": "concept-2025-08-choice-4"
            }
          ],
          "correctOptionId": "concept-2025-08-option-1",
          "explanation": "Sinyal resolver memuat arah dan kuadran melalui pasangan sinus serta kosinus. Rasio saja dapat sama untuk dua sudut yang berbeda 180°. Pembaca perlu mempertahankan tanda kedua kanal terhadap sinyal pembawa, lalu memakai atan2 untuk memilih kuadran yang sesuai.",
          "relatedProblemId": "2025-uas-q3"
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-position-guided",
          "mode": "spot-the-error",
          "title": "Periksa penentuan sudut resolver",
          "prompt": "Dua posisi memberi rasio sinus terhadap kosinus yang sama. Tanda kedua sinyal berbalik. Periksa kesimpulan berikut.",
          "workSample": "Rasio kedua sinyal sama. Jadi, kedua posisi rotor pasti sama.",
          "question": {
            "id": "ipe-position-guided-question",
            "prompt": "Informasi apa yang hilang dari alasan tersebut?",
            "options": [
              {
                "id": "ipe-position-guided-question-option-1",
                "label": "Tanda kedua sinyal yang menentukan kuadran.",
                "feedback": "Tepat. Tanda pasangan sinus dan kosinus membedakan kuadran meskipun rasionya sama."
              },
              {
                "id": "ipe-position-guided-question-option-2",
                "label": "Nilai mutlak rasio; tanda sinyal memang harus dihapus.",
                "feedback": "Nilai mutlak justru menghapus tanda yang membedakan kuadran. Pertahankan kedua tanda saat mencari sudut.",
                "misconceptionTag": "position-guided-choice-2"
              },
              {
                "id": "ipe-position-guided-question-option-3",
                "label": "Penguatan bersama; kedua posisi hanya berbeda karena penguatan berubah.",
                "feedback": "Penguatan bersama positif tidak membalik kedua tanda. Periksa kuadran sebelum menyimpulkan penguatan berubah.",
                "misconceptionTag": "position-guided-choice-3"
              }
            ],
            "correctOptionId": "ipe-position-guided-question-option-1",
            "explanation": "Gunakan pasangan sinyal lengkap. Fungsi atan2 memakai tanda pembilang dan penyebut untuk membedakan kuadran."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-position-essay",
          "title": "Pilih pembaca posisi setelah daya padam",
          "prompt": "Poros dapat bergerak ketika daya mati. Saat menyala, alat harus mengetahui posisi dalam satu putaran tanpa bergerak ke acuan. Bandingkan encoder absolut dan inkremental. Jelaskan batas pilihan Anda.",
          "sections": [
            "Model dan asumsi",
            "Alur penalaran",
            "Kesimpulan dan batas"
          ],
          "hints": [
            "Periksa informasi yang tersedia tepat setelah daya kembali.",
            "Bedakan kode posisi saat ini dari hitungan perpindahan sebelumnya.",
            "Cocokkan kebutuhan awal dengan kode atau acuan. Lalu, pisahkan posisi satu putaran dari jumlah putaran."
          ],
          "rubric": [
            {
              "id": "ipe-position-rubric-model",
              "label": "Model dan asumsi",
              "weight": 35,
              "fullCredit": "Membedakan kode posisi absolut dari hitungan perpindahan inkremental.",
              "commonPartialError": "Rasio dua sinyal saja dapat menghilangkan informasi kuadran."
            },
            {
              "id": "ipe-position-rubric-reasoning",
              "label": "Alur penalaran",
              "weight": 40,
              "fullCredit": "Menjelaskan mengapa gerak tanpa daya memutus hubungan hitungan lama dengan posisi kini."
            },
            {
              "id": "ipe-position-rubric-conclusion",
              "label": "Kesimpulan dan batas",
              "weight": 25,
              "fullCredit": "Memilih encoder absolut untuk kebutuhan satu putaran dan menyebut batas resolusi serta jumlah putaran."
            }
          ],
          "verifiedOutline": "Encoder inkremental memerlukan hitungan dan acuan yang tetap diketahui. Gerak saat daya mati dapat membuat hitungan lama tidak sesuai posisi kini. Encoder absolut membaca kode posisi saat menyala, sehingga cocok untuk kebutuhan dalam satu putaran. Pilih resolusi yang sesuai toleransi. Kode satu putaran belum menyatakan jumlah putaran poros. Jika tugas memerlukan jumlah putaran, tambahkan kemampuan yang memang menyimpan informasi tersebut."
        }
      ]
    }
  ]
};

export const english: NonNullable<CourseTranslation['modules']>[string] = {
  "title": "Position, displacement, and strain",
  "items": {
    "ipe-position-material": {
      "title": "Choose a signal that distinguishes positions",
      "examHook": {
        "prompt": "A shaft moves while power is off. Which sensor can read its position within one turn when power returns?",
        "targetOutcome": "You can explain position references and directional information in sensor outputs."
      },
      "body": "A position sensor uses a change that a circuit can read. That change may involve code, phase, amplitude, resistance, or capacitance. Connect the output to the position and direction you need.\n\nCheck whether the sensor requires an initial position reference. Also check whether two positions can produce apparently identical signals.\n\n[Open the worked solution: Liquid level from ultrasonic travel time](?item=2025-uts2-q3).",
      "microUnits": [
        {
          "id": "ipe-position-principle",
          "title": "Choose a model from the stated conditions",
          "intuition": "An absolute encoder gives a code associated with position. An incremental encoder counts movement from a reference. A resolver provides signals related to the sine and cosine of angle. A **quadrant** identifies an angle region from both signal signs and helps distinguish angles with the same ratio.",
          "formal": "For an ideal resolver signal pair:\n\n$$V_s=K\\sin\\theta,\\qquad V_c=K\\cos\\theta.$$\n\nAngle recovery uses both signs, for example through $\\operatorname{atan2}(V_s,V_c)$.",
          "validityBounds": "A resolver pair needs suitable amplitudes and a phase reference. A single-turn absolute encoder does not automatically count turns. For an LVDT, distinguish internal AC excitation from an external DC supply.",
          "decisionCheck": {
            "prompt": "A DC LVDT takes an external DC supply. Must its sensing coils operate with a constant field?",
            "options": [
              {
                "id": "ipe-position-decision-question-option-1",
                "label": "No; an internal circuit can generate AC excitation.",
                "feedback": "Correct. External supply and internal signal form are different properties."
              },
              {
                "id": "ipe-position-decision-question-option-2",
                "label": "Yes; the external supply type always matches internal excitation.",
                "feedback": "An internal circuit can convert DC supply into AC excitation."
              },
              {
                "id": "ipe-position-decision-question-option-3",
                "label": "Yes; a DC output means the instrument cannot use induction.",
                "feedback": "A circuit can rectify or process an induction signal into a DC output."
              }
            ],
            "explanation": "Read the function of each stage. A DC LVDT can contain an AC generator and output-conditioning circuits."
          }
        },
        {
          "id": "ipe-position-resolution",
          "title": "Distinguish resolution, sensitivity, and accuracy",
          "intuition": "Part 1, PDF pages 13-14, defines two different measures. Sensitivity is output change per input change. Resolution is an input interval that does not yet produce a distinguishable output change. Neither measure accounts for every system error.",
          "formal": "For continuous output $O(I)$, local sensitivity is $dO/dI$. For an $n$-bit absolute encoder over one turn, $2^n$ codes give an angular step $\\Delta\\theta=360^\\circ/2^n$. An 8-bit encoder has 256 codes, giving a step of $1.40625^\\circ$.",
          "validityBounds": "This step-size relation assumes evenly spaced codes over one turn. For an incremental encoder, check whether counts use one edge or four edges per cycle. Code spacing is not the total error limit.",
          "decisionCheck": {
            "prompt": "An 8-bit absolute encoder covers one turn. Which conclusion follows directly from its bit count?",
            "options": [
              {
                "id": "ipe-position-resolution-option-1",
                "label": "There are 256 codes with a nominal step of 360°/256.",
                "feedback": "Correct. This describes the nominal position intervals."
              },
              {
                "id": "ipe-position-resolution-option-2",
                "label": "Every reading is error-free to eight decimal places.",
                "feedback": "Bits specify binary codes, not accurate decimal places."
              },
              {
                "id": "ipe-position-resolution-option-3",
                "label": "Every position sensor must have a sensitivity of 8 V/degree.",
                "feedback": "Bit count does not set a sensor voltage sensitivity."
              }
            ],
            "explanation": "Bit count determines the code count and nominal step. System accuracy also depends on instrument, readout, and installation errors."
          }
        }
      ],
      "checkpoints": [
        "You can explain position references and directional information in sensor outputs.",
        "Position information depends on the codes, references, and signal signs actually available.",
        "A ratio alone can discard quadrant information."
      ],
      "derivations": [
        {
          "id": "ipe-position-sources",
          "title": "Sources and archive conventions",
          "content": "Read the part that supports the model you use. The numbers count physical PDF pages from 1; a page may contain several slides.\n\n[Pengukuran Teknik, Bagian 1 (2022)](https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view), PDF pages 2, 3, 8, 12, 13, 14: Measurement-stage functions, signal conditioning, sensitivity, and resolution.\n\n[Pengukuran Teknik, Bagian 2 (2022)](https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view), PDF pages 4, 7, 8, 10: Gauge temperature compensation, second-order models, and accelerometer frequency limits.\n\n[Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view), PDF pages 14, 15, 16, 17, 18, 19, 20, 21, 22, 23: Position sensors, encoders, LVDTs, strain gauges, and displacement-sensor arrangements.\n\n[Midterm and final-exam archive, 2023 to 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Each problem retains its own original statement, exam pages, and assumptions."
        }
      ]
    },
    "2025-uts2-q3": {
      "title": "Liquid level from ultrasonic travel time",
      "source": "Midterm 2 2025 · Question 3",
      "assumptions": [
        "For the empty tank, the source phrase “fluid surface” is interpreted as the bottom or empty reference surface. Both times are round-trip times."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Position, displacement, and strain"
      ],
      "statement": "An ultrasonic sensor is mounted above a tank. The round-trip time is $200\\ \\mathrm{ms}$ when empty and $100\\ \\mathrm{ms}$ with a liquid height $h$. Sound travels at $330\\ \\mathrm{m/s}$.\n(a) Draw the measurement arrangement and explain it. (b) Calculate $h$.",
      "simulation": {
        "title": "Ultrasonic sensor",
        "caption": "The pulse travels across the air gap twice. Increasing level reduces sensor-to-reflector distance.",
        "params": [
          {
            "key": "flightTime",
            "label": "Round-trip time"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uts2-q3-step-1",
          "title": "1. Distinguish the air gap from liquid height",
          "content": "The sensor sends a sound pulse downwards and receives its reflection. This **echo**, the returning sound pulse, provides a travel time that we use to calculate distance. The empty-tank echo comes from the bottom; the filled-tank echo comes from the liquid surface. We call these distances $H$ and $d$, so liquid height is $h=H-d$.\n\nLiquid height starts at the bottom, whereas the sensor measures distance from above. The two references differ, so a smaller measured air distance means a greater liquid level.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Position information depends on the codes, references, and signal signs actually available.",
            "commonPitfall": "A ratio alone can discard quadrant information."
          }
        },
        {
          "id": "2025-uts2-q3-step-2",
          "title": "2. Convert time to seconds and identify the reference",
          "content": "$t_0$ is the empty-tank echo time; $t$ is the filled-tank echo time. Since sound speed is $c=330\\ \\mathrm{m/s}$, both times must be in seconds to obtain metres.\n\n$$\nt_0=200\\ \\mathrm{ms}=0.200\\ \\mathrm s,\\qquad t=100\\ \\mathrm{ms}=0.100\\ \\mathrm s\n$$"
        },
        {
          "id": "2025-uts2-q3-step-3",
          "title": "3. Calculate the sensor-to-bottom distance",
          "content": "The pulse travels $H$ downward and $H$ back to the sensor. Thus $ct_0=2H$. Dividing by two converts the total path length to a one-way distance.\n\n$$\nH=\\frac{ct_0}{2}=\\frac{330(0.200)}2=33.0\\ \\mathrm m\n$$"
        },
        {
          "id": "2025-uts2-q3-step-4",
          "title": "4. Calculate the remaining air gap",
          "content": "With liquid present, the echo returns from its surface. Use the same round-trip argument with time $t$. The calculation gives the air gap above the liquid; we still need to find liquid height.\n\n$$\nd=\\frac{ct}{2}=\\frac{330(0.100)}2=16.5\\ \\mathrm m\n$$"
        },
        {
          "id": "2025-uts2-q3-step-5",
          "title": "5. Subtract the two distances",
          "content": "The liquid surface reduces the echo distance from 33.0 m to 16.5 m. Their difference gives liquid height above the tank bottom.\n\nYou can subtract the distances or subtract the times first. The methods are equivalent because $c/2$ is the same factor in $H$ and $d$.\n\n$$\nh=H-d=\\frac c2(t_0-t)=\\frac{330}{2}(0.200-0.100)=16.5\\ \\mathrm m\n$$"
        },
        {
          "id": "2025-uts2-q3-step-6",
          "title": "6. Test the relation at empty and full conditions",
          "content": "If $t=t_0$, the formula gives $h=0$: an empty tank. As echo time decreases, the surface approaches the sensor and $h$ rises. Here $t=t_0/2$, so the level is half the reference height: $16.5/33=0.5$.\n\nThe theoretical zero-time limit places the surface at the sensor. Real sensors usually have a minimum distance, which this question does not specify."
        },
        {
          "id": "2025-uts2-q3-step-7",
          "title": "7. Check scale and measurement conditions",
          "content": "This large result follows the source values of 200 ms and 100 ms. Do not silently replace them with microseconds. The sensor must stay in the same position, and the sound speed must represent the air during both measurements.\n\nAir-temperature changes can alter sound speed. If the two measurements use different speeds, subtracting their times with a single c is no longer equally accurate."
        }
      ],
      "finalAnswer": "The liquid height is 16.5 m. The measurement compares the bottom-echo time with the liquid-surface echo time.\n\n$$\n\\boxed{h=\\frac{330}{2}(0.200-0.100)=16.5\\ \\mathrm m}\n$$",
      "takeaway": "A ratio alone can discard quadrant information.",
      "sourceNotes": [
        "Following the functional sequence in Part 1, PDF pages 2-3, a detector first receives the echo and processing converts travel time into distance. Part 3, PDF page 16, describes echo-time measurement. Since travel is round-trip, the level change is $h=c(t_{\\mathrm{empty}}-t_{\\mathrm{filled}})/2$ for constant sound speed."
      ]
    },
    "2025-uts2-q4": {
      "title": "Position sensors and strain-gauge wiring",
      "source": "Midterm 2 2025 · Question 4",
      "assumptions": [
        "Arm names are defined explicitly; equivalent arrangements with reversed output polarity are also valid. The D-gauge strain interpretation follows the drawing orientation, not the letter D alone."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Position, displacement, and strain"
      ],
      "statement": "(a) Compare a resolver and an LVDT. (b) Give the advantages and drawbacks of an absolute encoder relative to an incremental encoder. (c) A cantilever has A1/D1 on top, A2/D2 below, and a downward tip force. Assign all four gauges to Wheatstone-bridge arms and explain D1/D2. (d) Explain how two incremental-encoder channels determine rotation direction.",
      "simulation": {
        "title": "Resolver",
        "caption": "A resolver uses two complementary outputs to read angle.",
        "params": [
          {
            "key": "angle",
            "label": "Rotor angle θ"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uts2-q4-step-1",
          "title": "1. Group the tasks by how each sensor reads motion",
          "content": "You will compare position sensors and arrange a bridge for measuring strain. We begin with each device’s input, output, and method for reading direction. Those three features explain what each device does before we compare its strengths and limits.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Position information depends on the codes, references, and signal signs actually available.",
            "commonPitfall": "A ratio alone can discard quadrant information."
          },
          "checkpoint": {
            "prompt": "Two D gauges are bonded transversely to the surface of a bending beam. A student calls them “dummy gauges, so they must be strain-free.” Which assessment is most accurate?",
            "options": [
              {
                "id": "2025-uts2-q4-checkpoint-option-1",
                "label": "Correct: transverse orientation always removes every mechanical response.",
                "feedback": "A transverse direction can still experience Poisson strain."
              },
              {
                "id": "2025-uts2-q4-checkpoint-option-2",
                "label": "Correct: every gauge in a bridge responds only to temperature.",
                "feedback": "A bridge reads resistance changes, including those caused by mechanical strain."
              },
              {
                "id": "2025-uts2-q4-checkpoint-option-3",
                "label": "Not quite: bonded gauges can sense Poisson strain while also helping compensate temperature.",
                "feedback": "Correct. Mechanical response and temperature-compensation roles can coexist."
              },
              {
                "id": "2025-uts2-q4-checkpoint-option-4",
                "label": "Incorrect: transverse gauges must have the same strain sign and magnitude as longitudinal gauges.",
                "feedback": "Transverse strain depends on Poisson’s ratio and generally has the opposite sign; it is not simply identical."
              }
            ]
          }
        },
        {
          "id": "2025-uts2-q4-step-2",
          "title": "2. Identify what LVDTs and resolvers share",
          "content": "Both use magnetic coupling between windings and AC excitation. Motion changes the induced voltage. Readout electronics use output amplitude and phase to recover position.\n\nIn both devices, motion does not require making or breaking a sliding measuring contact. Their readout still needs an excitation reference to interpret signal phase and sign.",
          "simulation": {
            "title": "LVDT",
            "caption": "Core displacement changes the difference between two secondary voltages.",
            "params": [
              {
                "key": "position",
                "label": "Displacement x"
              }
            ]
          }
        },
        {
          "id": "2025-uts2-q4-step-3",
          "title": "3. Read linear position from the LVDT secondary difference",
          "content": "At the centre, coupling to both secondaries is equal, so $V_1$ and $V_2$ cancel in series opposition. Moving the core strengthens one coupling and weakens the other. The difference amplitude indicates displacement magnitude; phase relative to the reference indicates the side.\n\nThe relation $V_o\\approx kx$ applies within the linear range. $k$ is voltage per unit length, not a dimensionless constant.\n\n$$\nV_o=V_1-V_2\\approx kx\n$$"
        },
        {
          "id": "2025-uts2-q4-step-4",
          "title": "4. Distinguish what they measure",
          "content": "An LVDT measures linear displacement: near its centre, differential output scales with $x$, and phase reversal identifies the side of null. A resolver measures angle through outputs proportional to $\\sin\\theta$ and $\\cos\\theta$.\n\nTwo resolver outputs avoid angular ambiguity. The same sine value can occur at more than one angle; the sine and cosine pair and its signs identify the quadrant.\n\n$$\nV_{\\mathrm{LVDT}}=V_1-V_2\\approx kx,\\qquad V_s\\propto\\sin\\theta,\\quad V_c\\propto\\cos\\theta\n$$",
          "simulation": {
            "title": "Resolver",
            "caption": "The two resolver amplitudes identify the angle and quadrant.",
            "params": [
              {
                "key": "angle",
                "label": "Rotor angle θ"
              }
            ]
          }
        },
        {
          "id": "2025-uts2-q4-step-5",
          "title": "5. Compare absolute and incremental encoders",
          "content": "An absolute encoder gives a unique position code within its range. After power returns, a single-turn absolute encoder can read angle without counting pulses from zero. An incremental encoder counts position changes and usually needs an initial reference or homing.\n\nAbsolute encoders generally need more involved code readout and cost more at comparable specifications. A single-turn absolute encoder does not automatically retain the turn count; that requires multiturn capability.\n\nConsider power being lost while the shaft is midway through its range. An absolute encoder reads the code currently beneath the reader. An incremental encoder needs an initial count before new pulses can represent total position. The missing initial count explains the usual need to find a reference position, or home."
        },
        {
          "id": "2025-uts2-q4-step-6",
          "title": "6. Determine the beam strain signs before wiring the bridge",
          "content": "For the downward tip load shown, the upper surface near the support is in tension and the lower surface in compression. The longitudinal gauges follow those strains: $\\varepsilon_{A1}=+\\varepsilon$ and $\\varepsilon_{A2}=-\\varepsilon$.\n\nWith gauge factor $GF$, relative resistance change is $\\delta=\\Delta R/R=GF\\varepsilon$. This converts the mechanical strain signs into resistance-change signs.\n\n$$\n\\delta_{A1}=+GF\\varepsilon,\\qquad\\delta_{A2}=-GF\\varepsilon\n$$"
        },
        {
          "id": "2025-uts2-q4-step-7",
          "title": "7. Place the gauges so bending contributions add",
          "content": "Apply excitation to the top and bottom bridge nodes and define $V_o=V_R-V_L$. One valid arrangement is A 1 upper left, A 2 lower left, D 1 upper right, D 2 lower right. Under the downward load, A 1 stretches and A 2 shortens.\n\nWith $\\delta_i=\\Delta R_i/R$, the upper-left and lower-right arms contribute positively. The other two contribute negatively. Since A 1 and A 2 have opposite strain signs, put them in adjacent arms.\n\nThe goal is for subtraction of the two node voltages to add the tensile and compressive effects. Arbitrary placement of opposite-sign gauges can reduce or cancel the output.\n\n$$\n\\frac{V_o}{V_s}\\approx\\frac14(\\delta_{A1}-\\delta_{A2}-\\delta_{D1}+\\delta_{D2})\n$$",
          "simulation": {
            "title": "Strain measurement",
            "caption": "A1 is in tension and A2 in compression. Bridge placement makes the bending signals add.",
            "params": [
              {
                "key": "strain",
                "label": "A1 strain"
              },
              {
                "key": "poisson",
                "label": "Poisson ratio ν"
              }
            ]
          }
        },
        {
          "id": "2025-uts2-q4-step-8",
          "title": "8. Check the arrangement using voltage dividers",
          "content": "With negligible readout current, the left and right nodes each follow a voltage-divider relation. Expanding around four equal resistances produces the short expression in the previous step.\n\nIf only A 1 increases resistance, $V_L$ falls and $V_R-V_L$ rises. If A 2 decreases resistance, $V_L$ also falls. This simple check confirms that the two strains add to the signal.\n\n$$\nV_L=V_s\\frac{R_{A2}}{R_{A1}+R_{A2}},\\qquad V_R=V_s\\frac{R_{D2}}{R_{D1}+R_{D2}},\\qquad V_o=V_R-V_L\n$$"
        },
        {
          "id": "2025-uts2-q4-step-9",
          "title": "9. Explain D1 and D2 carefully",
          "content": "Their intended function is to reduce temperature-induced output change. When matching gauges experience the same temperature change, their common resistance change cancels in the bridge.\n\nThe drawing places D 1/D 2 transversely on the beam. If bonded, they also sense Poisson strain: $-\\nu\\varepsilon$ at D 1 and $+\\nu\\varepsilon$ at D 2. Do not call them strain-free without an extra assumption. For ideal dummy gauges isolated from mechanical strain, both mechanical contributions are zero.\n\n$\\nu$ is Poisson’s ratio: longitudinal stretching is accompanied by transverse contraction. The D 1/D 2 orientation in the drawing must therefore be checked before treating them as temperature-only gauges.\n\n$$\n\\left.\\frac{V_o}{V_s}\\right|_{\\mathrm{bonded}}\\approx\\frac{GF(1+\\nu)\\varepsilon}{2},\\qquad \\left.\\frac{V_o}{V_s}\\right|_{\\mathrm{ideal\\ dummy}}\\approx\\frac{GF\\varepsilon}{2}\n$$"
        },
        {
          "id": "2025-uts2-q4-step-10",
          "title": "10. Separate temperature compensation from strain cancellation",
          "content": "If temperature changes all resistances by the same fraction $\\delta_T$, their signed sum is $\\delta_T-\\delta_T-\\delta_T+\\delta_T=0$. The cancellation explains how the bridge suppresses a common temperature effect.\n\nThis compensation requires matched gauges at sufficiently similar temperatures. Temperature gradients or mismatched gauge properties leave residual error; calling a gauge “dummy” does not guarantee perfect compensation."
        },
        {
          "id": "2025-uts2-q4-step-11",
          "title": "11. Read the pulse order to determine direction",
          "content": "Channels A and B are shifted by a quarter period. If A leads B, assign one direction; if B leads A, the direction reverses. Which one is clockwise depends on installation, so verify it with a known rotation.\n\nRead successive A/B pairs, not two isolated values without time order. Pulse frequency gives speed magnitude, while the leading channel gives direction.\n\n$$\n\\text{A leads: }00\\to10\\to11\\to01\\to00\\\\\\text{B leads: }00\\to01\\to11\\to10\\to00\n$$",
          "simulation": {
            "title": "Angular encoder",
            "caption": "The A/B transition order determines direction; frequency alone does not.",
            "params": [
              {
                "key": "angle",
                "label": "Angle θ"
              }
            ]
          }
        },
        {
          "id": "2025-uts2-q4-step-12",
          "title": "12. Finish each subpart with the correct information type",
          "content": "An LVDT gives linear position; a resolver gives angle; an absolute encoder gives a position code; an incremental encoder gives position changes to count. The strain-gauge bridge reads resistance changes with a suitable sign arrangement. Each distinction follows how its signal is generated and read."
        }
      ],
      "finalAnswer": "An LVDT measures linear displacement; a resolver measures angle. Absolute encoders give position codes; incremental encoders count changes. Put A1/A2 in adjacent arms and D1/D2 in the remaining arms as shown. D gauges help compensate temperature; bonded transverse gauges also sense Poisson strain. Encoder direction comes from the leading channel.",
      "takeaway": "A ratio alone can discard quadrant information.",
      "sourceNotes": [
        "Part 1, PDF pages 3 and 8, separates strain sensing from signal conditioning. Part 2, PDF page 4, shows temperature compensation with gauges exposed to similar temperature changes. Also check gauge orientation here: a transverse gauge bonded to the beam can sense Poisson strain, so it is not necessarily strain-free."
      ]
    },
    "2025-uas-q3": {
      "title": "8-bit encoder and resolver operation",
      "source": "Final exam 2025 · Question 3",
      "assumptions": [
        "The 8-bit encoder spans one full revolution with 256 codes. Clockwise meaning for A/B order depends on installation. Resolver comparison refers to the brushless type shown in the source."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Position, displacement, and strain"
      ],
      "statement": "(a) Explain incremental-encoder operation and direction detection. (b) Compare it with an absolute encoder and state its weaknesses. (c) Find the angular resolution of an 8-bit encoder over one turn. (d) Compare a resolver’s strengths and weaknesses with a linear potentiometer. (e) Explain the pictured resolver with $K\\,\\mathrm{Ref}\\cos\\theta$ and $K\\,\\mathrm{Ref}\\sin\\theta$ outputs.",
      "simulation": {
        "title": "Angular encoder",
        "caption": "Change angle to see the code transitions and resolution limit.",
        "params": [
          {
            "key": "angle",
            "label": "Angle θ"
          },
          {
            "key": "bits",
            "label": "Bit depth"
          }
        ]
      },
      "steps": [
        {
          "id": "2025-uas-q3-step-1",
          "title": "1. Distinguish current position from position change",
          "content": "We need to distinguish position change from current position. An **encoder** converts motion into pulses or codes that provide these kinds of information. You can count pulses to measure shaft movement. To find its current angle, you also need an initial reference or a unique position code.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Position information depends on the codes, references, and signal signs actually available.",
            "commonPitfall": "A ratio alone can discard quadrant information."
          },
          "checkpoint": {
            "prompt": "Two resolver rotor positions produce the same sine-to-cosine signal ratio. However, both signal signs reverse between the positions. How can the angle reader distinguish them?",
            "options": [
              {
                "id": "2025-uas-q3-checkpoint-option-1",
                "label": "Preserve both channel signs after demodulation, then use atan2 to retain the angle quadrant.",
                "feedback": "Correct. The two signs identify the quadrant, while the relative channel magnitudes locate the angle within it."
              },
              {
                "id": "2025-uas-q3-checkpoint-option-2",
                "label": "Use only the absolute sine-to-cosine ratio; signs carry no angle information.",
                "feedback": "Absolute values discard signs and make multiple quadrants indistinguishable."
              },
              {
                "id": "2025-uas-q3-checkpoint-option-3",
                "label": "Add the two channel voltages; their sum always uniquely determines a full-turn angle.",
                "feedback": "The sine-plus-cosine sum is not one-to-one over a full turn. Different angles can have the same sum."
              },
              {
                "id": "2025-uas-q3-checkpoint-option-4",
                "label": "Measure only the sine-channel amplitude; one channel distinguishes every angle over a full turn.",
                "feedback": "One sine value can correspond to several angles. The cosine channel and its sign resolve that ambiguity."
              }
            ]
          }
        },
        {
          "id": "2025-uas-q3-step-2",
          "title": "2. Count motion from pulses",
          "content": "In an optical incremental encoder, alternating disk regions pass a light emitter and receiver to produce pulses. Pulse count gives angular displacement, while pulse frequency gives rotational speed.\n\n$\\Delta n$ is the count change, and $N_{\\mathrm{count/rev}}$ is the effective count per turn. With quadrature×4 decoding, this can be four times the number of channel periods. Define the counting convention before converting counts to degrees.\n\n$$\n\\Delta\\theta=\\frac{360^\\circ}{N_{\\mathrm{count/rev}}}\\Delta n\n$$"
        },
        {
          "id": "2025-uas-q3-step-3",
          "title": "3. Use two channels for direction",
          "content": "A and B are separated by a quarter period. The order 00 → 10 → 11 → 01 means A leads B. Reversing the order indicates reverse rotation. A single channel does not uniquely identify direction.\n\nIn the first sequence, A changes from 0 to 1 while B is still 0. In the reverse sequence, B changes first. Reading successive transitions lets the counter decide whether to add to or subtract from position.",
          "simulation": {
            "title": "Angular encoder",
            "caption": "Compare channel order when rotation reverses.",
            "params": [
              {
                "key": "angle",
                "label": "Angle θ"
              }
            ]
          }
        },
        {
          "id": "2025-uas-q3-step-4",
          "title": "4. Distinguish position changes from position codes",
          "content": "An incremental encoder tracks position with a counter. Power loss or missed pulses can invalidate the count, requiring a new reference. An absolute encoder gives a direct angle code. A single-turn model identifies position within one turn, not total accumulated turns.\n\nFor a machine that must know its angle after power returns without moving to find a zero reference, an absolute code offers a direct advantage. A single-turn absolute device still cannot provide the total turn count without additional capability."
        },
        {
          "id": "2025-uas-q3-step-5",
          "title": "5. Divide one turn into 256 positions",
          "content": "Eight bits provide 2⁸ codes. One turn is 360°, so each angular step spans 360°/256. This step width describes resolution, not a guarantee of accuracy.\n\nThere are 256 angular intervals, labelled 0 through 255. Do not divide 360° by 255 just because 255 is the highest code: there are 256 codes, and the 0°/360° boundary is the same physical position.\n\n$$\nN=2^8=256,\\qquad \\Delta\\theta=\\frac{360^\\circ}{256}=1.40625^\\circ\n$$",
          "simulation": {
            "title": "Angular encoder",
            "caption": "An 8-bit encoder divides the circle into 256 position codes.",
            "params": [
              {
                "key": "angle",
                "label": "Angle θ"
              },
              {
                "key": "bits",
                "label": "Bit depth"
              }
            ]
          }
        },
        {
          "id": "2025-uas-q3-step-6",
          "title": "6. Separate resolution from angular accuracy",
          "content": "The 1.40625° resolution is the spacing of code intervals. Disk misalignment, readout imperfections, or calibration can make the true angle differ from the indicated angle. More bits reduce the code step but do not automatically remove instrument error."
        },
        {
          "id": "2025-uas-q3-step-7",
          "title": "7. Compare a resolver with a linear potentiometer",
          "content": "A brushless resolver measures angle by induction without a sliding sensing contact. It suits repeated rotation and avoids wiper wear. Its drawbacks include AC excitation, sine/cosine readout electronics, size, and circuit cost.\n\nA linear potentiometer directly measures linear displacement using a simple, inexpensive DC voltage divider. Its contact can wear and add noise. The two devices measure different forms of position; substitution needs a motion conversion or a suitable rotary potentiometer.\n\nBefore comparing cost and wear, check that the required measured quantity is the same. A rotary resolver and a linear potentiometer are not direct replacements merely because both sense position."
        },
        {
          "id": "2025-uas-q3-step-8",
          "title": "8. Recover angle from the resolver outputs",
          "content": "The AC reference excites the rotor field. Two perpendicular stator windings produce voltages whose amplitudes follow cosine and sine of the shaft angle. After reference-sensitive demodulation, retain both amplitude signs to identify the quadrant.\n\n$\\omega_c$ is the angular frequency of the excitation carrier, not shaft rotational speed. Demodulation extracts the signed amplitudes that vary with $\\theta$; $\\operatorname{atan2}$ then uses both signs to choose the quadrant.\n\n$$\nv_{S2-S4}=K V_{\\mathrm{ref}}\\cos\\theta\\sin\\omega_ct,\\quad v_{S3-S1}=K V_{\\mathrm{ref}}\\sin\\theta\\sin\\omega_ct\\\\\\theta=\\operatorname{atan2}(V_{\\sin},V_{\\cos})\n$$",
          "simulation": {
            "title": "Resolver",
            "caption": "Sine and cosine amplitudes change with the same rotor angle.",
            "params": [
              {
                "key": "angle",
                "label": "Rotor angle θ"
              }
            ]
          }
        },
        {
          "id": "2025-uas-q3-step-9",
          "title": "9. Check resolver outputs at known angles",
          "content": "At 0°, the sine channel is zero and cosine is at its positive maximum. At 90°, cosine is zero and sine is at its positive maximum. At 180°, cosine becomes negative. These signs explain why a ratio without quadrant information can produce the wrong angle."
        }
      ],
      "finalAnswer": "An 8-bit encoder resolves 1.40625° per code. Incremental direction comes from A/B order; absolute position comes from its code. A resolver derives angle from demodulated sine/cosine amplitudes.\n\n$$\n\\boxed{\\Delta\\theta=1.40625^\\circ/\\mathrm{code}}\n$$",
      "takeaway": "A ratio alone can discard quadrant information.",
      "sourceNotes": [
        "Part 1, PDF page 14, treats resolution as the input interval that produces no distinct output change. An absolute encoder with $n$ bits has $2^n$ codes and an angular step of $360^\\circ/2^n$. Code count alone does not establish total accuracy; installation and readout errors can add further error."
      ]
    },
    "2024-uas-q6": {
      "title": "DC LVDTs and two encoder types",
      "source": "Final exam 2024 · Question 6",
      "assumptions": [
        "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Position, displacement, and strain"
      ],
      "statement": "6. [10%] Position Sensor\n\n(a) [5%] Explain briefly how a DC LVDT (Direct Current Linear Variable Differential Transformer) works. You may include a sketch of the DC LVDT.\n\n(b) [5%] What are the differences between an absolute and an incremental encoder? You may include sketches of both encoders.",
      "simulation": {
        "title": "LVDT",
        "caption": "A DC interface does not remove the AC excitation inside the coils.",
        "params": [
          {
            "key": "position",
            "label": "Displacement x"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uas-q6-step-1",
          "title": "a · Identify the moving part in the LVDT",
          "content": "An **LVDT** has a magnetic core that slides inside windings. We use its induced voltages to measure the core’s linear displacement. The primary receives excitation and two secondary windings respond to its changing field. Core motion changes the coupling to each secondary.\n\nPosition is not read through a sliding contact on a winding. It is inferred from induced-voltage changes as the core moves.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Position information depends on the codes, references, and signal signs actually available.",
            "commonPitfall": "A ratio alone can discard quadrant information."
          },
          "checkpoint": {
            "prompt": "A DC LVDT accepts a DC supply and produces a DC voltage that follows core position. Which statement correctly explains its operation?",
            "options": [
              {
                "id": "2024-uas-q6-checkpoint-option-1",
                "label": "Internal circuitry creates AC excitation, then demodulates the secondary difference into a DC output.",
                "feedback": "Correct. The circuitry provides a DC interface while retaining internal AC transformer operation."
              },
              {
                "id": "2024-uas-q6-checkpoint-option-2",
                "label": "The primary receives steady DC and continuously induces secondary voltage without a changing field.",
                "feedback": "Steady DC does not sustain induction after the transient ends. AC excitation supplies the required changing field."
              },
              {
                "id": "2024-uas-q6-checkpoint-option-3",
                "label": "The two secondary voltages are added so direction is always evident from the result.",
                "feedback": "The secondaries connect in opposition. Their difference and phase relative to excitation provide signed position, not the amplitude sum alone."
              },
              {
                "id": "2024-uas-q6-checkpoint-option-4",
                "label": "The core moves an electrical contact, so the LVDT works like a potentiometer.",
                "feedback": "An LVDT senses magnetic-coupling changes; it needs no sliding contact to read core position."
              }
            ]
          },
          "simulation": {
            "title": "LVDT",
            "caption": "Core motion changes the difference between the two secondary outputs.",
            "params": [
              {
                "key": "position",
                "label": "Displacement x"
              }
            ]
          }
        },
        {
          "id": "2024-uas-q6-step-2",
          "title": "a · Relate voltage difference to displacement direction",
          "content": "The two secondaries connect in opposition. At the centre their coupling is nearly equal, so $e_{s1}\\approx e_{s2}$ and differential output is near zero.\n\nAs the core moves to one side, one voltage rises and the other falls. Difference magnitude indicates displacement magnitude; phase relative to excitation distinguishes the two sides of null.\n\n$$\ne_{\\mathrm{diff}}=e_{s1}-e_{s2}\n$$",
          "simulation": {
            "title": "LVDT",
            "caption": "Core motion changes the difference between the two secondary outputs.",
            "params": [
              {
                "key": "position",
                "label": "Displacement x"
              }
            ]
          }
        },
        {
          "id": "2024-uas-q6-step-3",
          "title": "a · Trace the DC supply to the DC output",
          "content": "DC LVDT describes the instrument interface: its supply and final output are DC. Internally, an oscillator converts the DC supply into AC excitation for the primary.\n\nInduction still requires a changing magnetic field. Applying steady DC directly to the primary therefore does not explain DC LVDT operation.",
          "simulation": {
            "title": "LVDT",
            "caption": "Core motion changes the difference between the two secondary outputs.",
            "params": [
              {
                "key": "position",
                "label": "Displacement x"
              }
            ]
          }
        },
        {
          "id": "2024-uas-q6-step-4",
          "title": "a · Why must the output be demodulated?",
          "content": "The secondary difference is still AC. An excitation-referenced demodulator recovers its signed magnitude; filtering then reduces AC components so the DC output follows position.\n\nNear null within the linear range, $V_o\\approx Kx$. Here $x$ is signed displacement and $K$ is sensitivity, for example V/mm. The linear relation does not automatically hold at every core position.\n\n$$\nV_o\\approx Kx\n$$",
          "simulation": {
            "title": "LVDT",
            "caption": "Core motion changes the difference between the two secondary outputs.",
            "params": [
              {
                "key": "position",
                "label": "Displacement x"
              }
            ]
          }
        },
        {
          "id": "2024-uas-q6-step-5",
          "title": "b · An incremental encoder reads position changes",
          "content": "A repeating disk or scale pattern produces pulses during motion. Each pulse represents a position increment. A counter accumulates these increments from an initial position.\n\nChannels A and B are a quarter-cycle apart to provide direction. Their leading order reverses with motion direction. One channel gives motion counts but cannot uniquely distinguish direction.",
          "simulation": {
            "title": "Angular encoder",
            "caption": "A and B show motion and direction; index Z provides a reference mark.",
            "params": [
              {
                "key": "angle",
                "label": "Angle θ"
              }
            ]
          }
        },
        {
          "id": "2024-uas-q6-step-6",
          "title": "b · Explain the loss of an incremental reference",
          "content": "Position depends on the initial reference and every subsequent count. If the counter loses power or misses pulses, one stationary channel state cannot recover the correct position.\n\nHoming finds the machine reference again. An index Z channel can mark one position per turn, but it is not a unique code for every position. It helps establish a reference rather than replacing all absolute information.",
          "simulation": {
            "title": "Angular encoder",
            "caption": "A and B show motion and direction; index Z provides a reference mark.",
            "params": [
              {
                "key": "angle",
                "label": "Angle θ"
              }
            ]
          }
        },
        {
          "id": "2024-uas-q6-step-7",
          "title": "b · An absolute encoder codes the current position",
          "content": "An absolute encoder gives each sector in its range a unique code. The system reads the active code; it need not observe all prior motion to know the position within one turn.\n\nWith $n$ bits there are $2^n$ codes. If they divide a full turn uniformly, resolution is $360^\\circ/2^n$. Resolution is code spacing, not a guarantee of equally small measurement error.\n\n$$\n\\Delta\\theta=\\frac{360^\\circ}{2^n}\n$$",
          "simulation": {
            "title": "Angular encoder",
            "caption": "Each sector has its own position code.",
            "params": [
              {
                "key": "angle",
                "label": "Angle θ"
              },
              {
                "key": "bits",
                "label": "Bit depth"
              }
            ]
          }
        },
        {
          "id": "2024-uas-q6-step-8",
          "title": "b · Distinguish angle code from turn count",
          "content": "Gray code is often used so only one bit changes between neighbouring positions. This reduces readout ambiguity at code transitions; it does not by itself add more positions.\n\nA single-turn absolute encoder identifies angle within one turn. Knowing completed turns requires multiturn capability. “Absolute” therefore does not always mean that the full turn history is retained.",
          "simulation": {
            "title": "Angular encoder",
            "caption": "Each sector has its own position code.",
            "params": [
              {
                "key": "angle",
                "label": "Angle θ"
              },
              {
                "key": "bits",
                "label": "Bit depth"
              }
            ]
          }
        }
      ],
      "finalAnswer": "A DC LVDT converts an internal AC difference signal into a DC position output. Incremental encoders count position changes; absolute encoders read a position code within their range.",
      "takeaway": "A ratio alone can discard quadrant information.",
      "sourceNotes": [
        "Part 1, PDF pages 2-3, helps interpret a DC LVDT as a complete system. The inductive element uses alternating excitation; internal electronics supply that excitation and convert the secondary difference into a DC output. The interface does not change the measurand: core displacement."
      ]
    },
    "2023-uts2-q3": {
      "title": "Encoders, level sensing, and LVDT",
      "source": "Midterm 2 2023 · Question 3",
      "assumptions": [
        "A is the total active electrode area, not the tank floor area. The A/D formula uses a parallel-plate or thin cylindrical-gap model; neglect fringing and cable capacitance.",
        "Level-visual dimensions are illustrative values for exploring the formula. The exam gives variables, not numerical dimensions."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Position, displacement, and strain"
      ],
      "statement": "(a) Compare absolute and incremental encoder construction and outputs. (b) A capacitive sensor measures liquid level; liquid permittivity is $k$ times that of air, active electrode area is $A$, and gap is $D$. The figure has $h=h_1+h_2$, with the electrode tip $h_0$ above the tank bottom. Derive capacitance. (c) Sketch a signal conditioner for this capacitance change. (d) Explain the pictured LVDT. (e) Compare LVDT advantages and disadvantages with a potentiometer.",
      "simulation": {
        "title": "Angular encoder",
        "caption": "Absolute codes represent position; A/B pulses represent change and direction.",
        "params": [
          {
            "key": "angle",
            "label": "Angle θ"
          },
          {
            "key": "bits",
            "label": "Bit depth"
          }
        ]
      },
      "steps": [
        {
          "id": "2023-uts2-q3-step-1",
          "title": "3a · Read position from an absolute encoder code",
          "content": "We can read mechanical position electrically using an **encoder**, a device that converts position into a signal. An absolute encoder uses a disc or scale pattern. Its pattern gives a different code for each distinguishable position.\n\nIn an optical encoder, the reader combines several tracks into a binary or Gray code word. The code identifies the current position. The reader can recognise single-turn angle without counting motion from startup.\n\nThe one-revolution limit matters: identifying completed revolutions requires a multiturn design, rather than simply more codes within one turn.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Position information depends on the codes, references, and signal signs actually available.",
            "commonPitfall": "A ratio alone can discard quadrant information."
          },
          "checkpoint": {
            "prompt": "A shaft may move while power is off. After power returns, the system must read its position within one revolution without moving it to find a reference. The most suitable choice is…",
            "options": [
              {
                "id": "2023-uts2-q3-checkpoint-option-1",
                "label": "A one-channel incremental encoder, because each pulse is a unique position code.",
                "feedback": "A single-channel pattern repeats. Without a count and initial position, pulses do not uniquely identify the sector."
              },
              {
                "id": "2023-uts2-q3-checkpoint-option-2",
                "label": "An incremental encoder with index Z, because the index identifies every angle while stationary.",
                "feedback": "The index is active near one position. At another stationary position, the system does not know its distance from that index."
              },
              {
                "id": "2023-uts2-q3-checkpoint-option-3",
                "label": "A single-turn absolute encoder, because its current code identifies position within one revolution.",
                "feedback": "Correct. A unique code per sector meets the requirement for reading single-turn angle without reference motion."
              },
              {
                "id": "2023-uts2-q3-checkpoint-option-4",
                "label": "An A/B incremental encoder without position retention, because two channels always provide absolute position.",
                "feedback": "Two channels distinguish motion direction but do not recover a count lost during power-off."
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q3-step-2",
          "title": "Read position changes from an incremental encoder",
          "content": "An incremental encoder uses a repeating optical or magnetic pattern. As the pattern passes the reader, the output becomes a pulse train. Those pulses describe motion rather than a unique position code.\n\nChannels A and B are usually a quarter-cycle apart. Which channel changes first gives direction; the number of counted pulses gives angular change. Channel Z can supply one reference mark per turn.\n\nIf power loss erases the count, the readout needs to find a reference again unless another method preserves position. Adding channel Z does not give every angle an absolute code."
        },
        {
          "id": "2023-uts2-q3-step-3",
          "title": "3b · Identify the active part of the probe",
          "content": "In the level sensor, air and liquid occupy the gap between two electrodes. Permittivity $\\varepsilon$ describes how the material in that gap affects capacitance; the liquid has value $k\\varepsilon_{\\rm air}$.\n\nThe probe starts at height $h_0$ above the bottom. Its active length is therefore $L=h-h_0$. At liquid level $h_2$, the immersed probe length is $h_2-h_0$, as long as the level lies between the probe's bottom and top.\n\n$$\nL=h-h_0,\\qquad\\eta=\\frac{h_2-h_0}{h-h_0},\\qquad0\\le\\eta\\le1\n$$",
          "simulation": {
            "title": "Capacitive sensor",
            "caption": "Only the immersed electrode section changes permittivity.",
            "params": [
              {
                "key": "height",
                "label": "Liquid height h"
              },
              {
                "key": "permittivity",
                "label": "Relative permittivity κ"
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q3-step-4",
          "title": "Find the electrode area facing each material",
          "content": "The stated area $A$ is the entire active electrode area. With a uniform shape along the height, the immersed length fraction equals the immersed area fraction. Thus $A_{\\rm liquid}=A\\eta$.\n\nThe remaining area still faces air. Adding the two areas must return A; this check helps avoid counting the same region twice.\n\n$$\nA_{\\rm liquid}=A\\eta,\\qquad A_{\\rm air}=A(1-\\eta),\\qquad A_{\\rm liquid}+A_{\\rm air}=A\n$$"
        },
        {
          "id": "2023-uts2-q3-step-5",
          "title": "Add the capacitances of the parallel regions",
          "content": "Both regions lie across the same electrodes and have the same voltage. Their charges add to the total charge. This electrical arrangement behaves as parallel capacitors.\n\nFor a parallel-plate or thin-gap model, $C=\\varepsilon A/D$, where $D$ is electrode spacing. We use air permittivity over the air area and $k\\varepsilon_{\\rm air}$ over the liquid area.\n\n$$\n\\begin{aligned}C&=C_{\\rm air\\ region}+C_{\\rm liquid\\ region}\\\\&=\\frac{\\varepsilon_{\\rm air}A(1-\\eta)}D+\\frac{k\\varepsilon_{\\rm air}A\\eta}D\\\\&=\\frac{\\varepsilon_{\\rm air}A}D[1+(k-1)\\eta]\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts2-q3-step-6",
          "title": "Express the formula using the figure heights",
          "content": "We substitute the definition of $\\eta$ into capacitance. The air-filled length is $h_1=h-h_2$, so $L-(h_2-h_0)=h_1$.\n\nThe factor outside the brackets contains area per active length. Inside, air length adds to liquid length weighted by k. No dimensions need to be guessed because the question asks for a symbolic expression.\n\n$$\n\\boxed{C=\\frac{\\varepsilon_{\\rm air}A}{D(h-h_0)}[h_1+k(h_2-h_0)]},\\qquad h_0\\le h_2\\le h\n$$"
        },
        {
          "id": "2023-uts2-q3-step-7",
          "title": "Check empty, full, and geometric limits",
          "content": "At the probe's bottom tip, $\\eta=0$ and the entire active gap contains air: $C=C_{\\rm air}=\\varepsilon_{\\rm air}A/D$. At full immersion, $\\eta=1$ and $C=kC_{\\rm air}$.\n\nIf liquid remains below $h_0$, the probe is not yet immersed and does not respond to the level rise. If $k=1$, replacing air with liquid also leaves capacitance unchanged.\n\nThe $A/D$ formula assumes a thin gap. For concentric cylinders of radii $a,b$, use the exact form $C=2\\pi\\varepsilon_{\\rm air}[h_1+k(h_2-h_0)]/\\ln(b/a)$. The division into regions stays the same.",
          "simulation": {
            "title": "Capacitive sensor",
            "caption": "Check empty and full limits to verify the formula.",
            "params": [
              {
                "key": "height",
                "label": "Liquid height h"
              },
              {
                "key": "permittivity",
                "label": "Relative permittivity κ"
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q3-step-8",
          "title": "3c · Arrange a bridge to read capacitance",
          "content": "We need to convert capacitance into a readable signal. One choice is an **AC bridge**, a comparison circuit driven by alternating voltage. Place $C_s$ upper-left, $C_{\\rm ref}$ lower-left, and equal resistors in the right arms.\n\nApply AC between the top and bottom nodes, and measure the midpoint difference. AC produces alternating capacitor current; after transients end, a steady DC supply produces no current through an ideal capacitor.",
          "simulation": {
            "title": "Measurement bridge",
            "caption": "The AC bridge converts capacitance imbalance into voltage.",
            "params": [
              {
                "key": "capacitance",
                "label": "Sensor capacitance"
              },
              {
                "key": "voltage",
                "label": "AC excitation amplitude"
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q3-step-9",
          "title": "Follow bridge output into a level reading",
          "content": "Capacitor impedance is inversely proportional to capacitance: $Z_C=1/(j\\omega C)$. The left divider therefore gives $V_{\\rm ex}C_s/(C_s+C_{\\rm ref})$; the right divider gives $V_{\\rm ex}/2$.\n\nWhen $C_s=C_{\\rm ref}$, the difference is zero. A level change alters $C_s$, then the difference voltage. A differential amplifier increases that difference; a synchronous demodulator and low-pass filter produce an output for the level display.\n\n$$\nV_b=V_{\\rm ex}\\left(\\frac{C_s}{C_s+C_{\\rm ref}}-\\frac12\\right)\n$$"
        },
        {
          "id": "2023-uts2-q3-step-10",
          "title": "3d · Arrange the LVDT windings and read their difference",
          "content": "An LVDT measures linear displacement. Its sketch needs one primary winding, two secondary windings, and an iron core moving along the winding axis.\n\nAC primary excitation creates alternating magnetic flux. Core position sets the coupling from the primary to each secondary. Connect the secondaries in opposition so the output becomes $V_1-V_2$.\n\nAt the centre, the two voltages are almost equal and cancel. Core motion strengthens one coupling and weakens the other, creating a nonzero difference.\n\n$$\nV_o=V_1-V_2\n$$",
          "simulation": {
            "title": "LVDT",
            "caption": "The core changes both secondary couplings; their difference indicates position.",
            "params": [
              {
                "key": "position",
                "label": "Displacement x"
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q3-step-11",
          "title": "Read both magnitude and direction from an LVDT",
          "content": "Within the linear range, voltage-difference amplitude is proportional to displacement magnitude. Two positions on opposite sides can nevertheless have the same amplitude.\n\nSignal phase relative to excitation distinguishes the sides: crossing the centre reverses phase by 180°. A phase-sensitive demodulator uses that information to produce positive or negative DC voltage.\n\nIn the model below, $x$ is signed displacement and $\\omega_c$ the excitation angular frequency. Reading amplitude alone would discard the sign of $x$.\n\n$$\nV_o(t)=K_xx\\sin(\\omega_ct),\\qquad V_{\\rm DC}\\propto x\n$$",
          "simulation": {
            "title": "LVDT",
            "caption": "Phase preserves displacement direction.",
            "params": [
              {
                "key": "position",
                "label": "Displacement x"
              }
            ]
          }
        },
        {
          "id": "2023-uts2-q3-step-12",
          "title": "3e · Choose an LVDT or potentiometer for the task",
          "content": "A potentiometer uses a sliding electrical contact, or wiper, to read the resistance along its track. Its circuit is compact and can use DC excitation, but the contact can wear and introduce noise.\n\nAn LVDT needs no sliding electrical contact on the core. It measures motion smoothly without wiper wear, but needs AC excitation and signal conditioning. Size and cost can also be greater.\n\nBoth still have limits: an LVDT must stay in its linear region, and practical resolution depends on noise and readout electronics. Absence of a wiper does not mean unlimited accuracy."
        }
      ],
      "finalAnswer": "Absolute encoders provide position codes; incremental encoders provide motion pulses. Capacitance adds the air and liquid regions. An AC bridge reads its change. An LVDT senses the secondary-voltage difference without sliding electrical contact.\n\n$$\n\\boxed{C=\\frac{\\varepsilon_{\\rm air}A}{D}\\left[1+(k-1)\\frac{h_2-h_0}{h-h_0}\\right]}\n$$",
      "takeaway": "A ratio alone can discard quadrant information.",
      "sourceNotes": [
        "Part 1, PDF pages 12-13, relates sensitivity to the output slope against input. After using the level geometry in Part 3, PDF page 22, derive $dC/dh$ from your capacitance expression. This checks whether a level change gives the expected output change. Part 1, PDF page 3, explains why a capacitance change still needs signal conditioning."
      ]
    },
    "2023-uas-q4": {
      "title": "Resolver, LVDT, and accelerometer",
      "source": "Final exam 2023 · Question 4",
      "assumptions": [
        "Displacement is measured from static equilibrium, where weight and initial spring force cancel. Output sign depends on LVDT wiring.",
        "The numerical acceleration limit assumes quasistatic operation. At other frequencies, use the dynamic response."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Position, displacement, and strain"
      ],
      "statement": "(a) Explain the resolver’s sine/cosine outputs shown in the figure. (b) Sketch an LVDT and explain its operation. (c) An LVDT measures an accelerometer’s seismic-mass displacement. Conditioned sensitivity is $S=0.31\\,\\mathrm{mV/mm}$, core travel is ±10 mm, $k=240\\,\\mathrm{N/m}$, $m=m_1+m_2=0.05\\,\\mathrm{kg}$, and $c=3.46\\,\\mathrm{N\\,s/m}$. Find (i) the base-acceleration-to-output-voltage relation and (ii) maximum measurable acceleration.",
      "simulation": {
        "title": "Resolver",
        "caption": "Both amplitudes together determine angle and quadrant.",
        "params": [
          {
            "key": "angle",
            "label": "Rotor angle θ"
          }
        ]
      },
      "steps": [
        {
          "id": "2023-uas-q4-step-1",
          "title": "4a · Connect rotor angle to two resolver voltages",
          "content": "A resolver measures angle through magnetic coupling between windings. AC rotor excitation creates time-varying flux. Two stator windings face directions 90° apart.\n\nAt rotor angle $\\theta$, stator-output amplitudes follow $\\sin\\theta$ and $\\cos\\theta$. Both voltages retain the same AC carrier frequency; position changes their amplitudes.\n\nHere $V_r$ is excitation amplitude, $K$ a coupling factor, and $\\omega_c$ carrier angular frequency. In a brushless design, a rotary transformer supplies excitation without sliding contacts.\n\n$$\nv_s(t)=KV_r\\sin\\theta\\sin\\omega_ct,\\qquad v_c(t)=KV_r\\cos\\theta\\sin\\omega_ct\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Position information depends on the codes, references, and signal signs actually available.",
            "commonPitfall": "A ratio alone can discard quadrant information."
          },
          "checkpoint": {
            "prompt": "A spring and mass accelerometer uses an LVDT to read relative core displacement. A technician calculates acceleration range from spring stiffness and core travel using a quasistatic model, then applies that range at every frequency. What needs correction?",
            "options": [
              {
                "id": "2023-uas-q4-checkpoint-option-1",
                "label": "The travel limit still applies, but acceleration-to-displacement response must include mass, stiffness, damping, and input frequency.",
                "feedback": "Correct. A dynamic model connects the fixed displacement limit with the acceleration limit at each frequency."
              },
              {
                "id": "2023-uas-q4-checkpoint-option-2",
                "label": "The LVDT directly reads absolute acceleration, so no mechanical model is needed.",
                "feedback": "The LVDT measures core position relative to the housing. The mechanical model connects that position to acceleration."
              },
              {
                "id": "2023-uas-q4-checkpoint-option-3",
                "label": "Simply reverse voltage polarity; amplitude sensitivity never depends on frequency.",
                "feedback": "Polarity changes sign; it does not remove frequency dependence of amplitude."
              },
              {
                "id": "2023-uas-q4-checkpoint-option-4",
                "label": "Core-travel limits should be ignored for sinusoidal vibration.",
                "feedback": "Travel is a physical core limit. Sinusoidal motion can still exceed it."
              }
            ]
          }
        },
        {
          "id": "2023-uas-q4-step-2",
          "title": "Use both signs to identify the quadrant",
          "content": "Demodulation compares each output with excitation to recover a signed amplitude. Positive and negative signs carry angular-side information rather than voltage magnitude alone.\n\nThe ratio $V_s/V_c=\\tan\\theta$ cannot by itself distinguish angles separated by 180°. The function $\\operatorname{atan2}(V_s,V_c)$ uses both signs separately to select the quadrant.\n\n$$\nV_s=KV_r\\sin\\theta,\\quad V_c=KV_r\\cos\\theta,\\quad\\theta=\\operatorname{atan2}(V_s,V_c)\n$$"
        },
        {
          "id": "2023-uas-q4-step-3",
          "title": "4b · Sketch the LVDT arrangement",
          "content": "An LVDT measures linear displacement. Show one primary between two secondaries, a magnetic core moving along the axis, and a housing that defines the position reference.\n\nPrimary AC excitation induces voltages in both secondaries. Connect the secondaries in series opposition so output is the difference $V_1-V_2$.\n\nA centred core gives nearly equal coupling and an output near zero. Moving the core increases one coupling and decreases the other.\n\n$$\nV_{\\rm diff}=V_1-V_2\n$$",
          "simulation": {
            "title": "LVDT",
            "caption": "Two secondary windings sense core displacement relative to the housing.",
            "params": [
              {
                "key": "position",
                "label": "Displacement x"
              }
            ]
          }
        },
        {
          "id": "2023-uas-q4-step-4",
          "title": "Distinguish raw LVDT AC from the conditioned output",
          "content": "AC voltage magnitude gives displacement magnitude, while phase relative to excitation identifies the side. A phase-sensitive conditioner converts both into signed voltage proportional to position within the linear region.\n\nThe problem gives conditioned sensitivity $S=0.31$ mV/mm. Since 1 mV = 0.001 V and 1 mm = 0.001 m, this is also 0.31 V/m.\n\nThe relation $E=Sz$ reads core displacement relative to the housing, rather than its position relative to the ground. This determines the coordinates needed for the mechanical model.\n\n$$\nE=Sz,\\qquad S=\\frac{0.00031\\ \\mathrm V}{0.001\\ \\mathrm m}=0.31\\ \\mathrm{V/m}\n$$"
        },
        {
          "id": "2023-uas-q4-step-5",
          "title": "4c(i) · Choose coordinates for the mass and housing",
          "content": "We take upward as positive. Let $y$ be housing motion, $x$ absolute mass motion, and $z=x-y$ mass displacement relative to the housing. Measure $z$ from static equilibrium.\n\nThe input acceleration is $a=\\ddot y$, the housing acceleration. Two dots denote the second time derivative. Since $x=z+y$, absolute mass acceleration is $\\ddot x=\\ddot z+a$.\n\nThe two mass parts move together, so the equation uses m1+m2=0.05 kg. Using only one part would change sensitivity and natural frequency.\n\n$$\nz=x-y,\\qquad a=\\ddot y,\\qquad\\ddot x=\\ddot z+a,\\qquad m=m_1+m_2=0.05\\ \\mathrm{kg}\n$$"
        },
        {
          "id": "2023-uas-q4-step-6",
          "title": "Write real and inertia forces on the same mass",
          "content": "Initially the spring supports the weight. With z measured from that equilibrium, total spring force is mg−kz and weight is −mg. The two mg terms cancel in the motion-about-equilibrium equation.\n\nThe damper opposes relative velocity, giving force $-c\\dot z$. A D'Alembert balance adds inertia force $-m\\ddot x$, then sets the total to zero. That inertia force uses absolute mass acceleration.\n\n$$\n(mg-kz)-mg-c\\dot z-m\\ddot x=0\n$$",
          "simulation": {
            "title": "Accelerometer",
            "caption": "Real and inertia forces must balance on the same combined mass.",
            "params": [
              {
                "key": "frequency",
                "label": "Input frequency"
              },
              {
                "key": "acceleration",
                "label": "Acceleration amplitude"
              },
              {
                "key": "time",
                "label": "Time position"
              }
            ]
          }
        },
        {
          "id": "2023-uas-q4-step-7",
          "title": "Obtain the relative-motion equation",
          "content": "We substitute $\\ddot x=\\ddot z+a$. After cancelling mg, the equation contains spring force, damping force, and mass acceleration.\n\nAdd the relative-motion terms to both sides to collect them on the left. Housing acceleration becomes the input on the right with a negative sign: when the housing accelerates upward, the mass tends to lag downward relative to it.\n\n$$\n\\begin{aligned}-kz-c\\dot z-m(\\ddot z+a)&=0\\\\m\\ddot z+c\\dot z+kz&=-ma\\\\0.05\\ddot z+3.46\\dot z+240z&=-0.05a\\end{aligned}\n$$"
        },
        {
          "id": "2023-uas-q4-step-8",
          "title": "Convert motion into a relationship between voltage and acceleration",
          "content": "For zero initial conditions, the Laplace transform maps $\\dot z$ to $sZ(s)$ and $\\ddot z$ to $s^2Z(s)$. This mathematical transformation expresses a time-domain model in variable s, giving an algebraic equation.\n\nFactor out $Z(s)$, then divide by its coefficient to obtain $Z/A$. Since $E=Sz$, multiply that relation by the LVDT sensitivity.\n\n$$\n\\begin{aligned}(ms^2+cs+k)Z(s)&=-mA(s)\\\\\\frac{Z(s)}{A(s)}&=-\\frac m{ms^2+cs+k}\\\\\\frac{E(s)}{A(s)}&=-\\frac{Sm}{ms^2+cs+k}\\end{aligned}\n$$",
          "simulation": {
            "title": "Accelerometer",
            "caption": "Compare housing and mass motion at the same frequency.",
            "params": [
              {
                "key": "frequency",
                "label": "Input frequency"
              },
              {
                "key": "acceleration",
                "label": "Acceleration amplitude"
              },
              {
                "key": "time",
                "label": "Time position"
              }
            ]
          }
        },
        {
          "id": "2023-uas-q4-step-9",
          "title": "Insert the constants and identify the frequency scale",
          "content": "We divide numerator and denominator by m=0.05 kg. The coefficient c/m becomes 69.2 and k/m becomes 4800. Voltage in this form is in volts because S uses V/m.\n\nNatural frequency $\\omega_n=\\sqrt{k/m}$ sets the mechanical frequency scale; damping ratio $\\zeta=c/(2\\sqrt{km})$ describes damping strength. These values show that sensitivity cannot be constant at every frequency.\n\n$$\n\\boxed{\\frac{E(s)}{A(s)}=-\\frac{0.31}{s^2+69.2s+4800}}\\quad\\frac{\\mathrm V}{\\mathrm{m/s^2}},\\qquad\\omega_n=69.282\\ \\mathrm{rad/s},\\quad f_n=\\frac{\\omega_n}{2\\pi}=11.027\\ \\mathrm{Hz},\\quad\\zeta=0.4994\n$$"
        },
        {
          "id": "2023-uas-q4-step-10",
          "title": "Use the slowly varying acceleration approximation",
          "content": "If input frequency is far below $\\omega_n$, relative motion changes slowly enough that $m\\ddot z$ and $c\\dot z$ are small compared with $kz$. The model then approaches $kz=-ma$.\n\nWe divide by $k$, then use $E=Sz$. The negative sign follows the chosen relative-displacement direction; reversing output wires changes the sign without changing sensitivity magnitude.\n\n$$\nz\\approx-\\frac mk a,\\qquad E\\approx-\\frac{Sm}{k}a=-\\frac{0.31(0.05)}{240}a\\quad[\\mathrm V]\n$$",
          "simulation": {
            "title": "Accelerometer",
            "caption": "At low frequency, relative displacement is proportional to acceleration.",
            "params": [
              {
                "key": "frequency",
                "label": "Input frequency"
              },
              {
                "key": "acceleration",
                "label": "Acceleration amplitude"
              },
              {
                "key": "time",
                "label": "Time position"
              }
            ]
          }
        },
        {
          "id": "2023-uas-q4-step-11",
          "title": "Express sensitivity in mV and show how to read it",
          "content": "The preceding coefficient is 0.0000645833 V per m/s². We multiply by 1000 to use mV: sensitivity magnitude becomes 0.0645833 mV per m/s².\n\nIf the known output is in mV, divide by that sensitivity to obtain acceleration. This relation retains the low-frequency assumption already stated.\n\n$$\nE[\\mathrm{mV}]\\approx-0.0645833\\,a[\\mathrm{m/s^2}],\\qquad a[\\mathrm{m/s^2}]\\approx-15.4839\\,E[\\mathrm{mV}]\n$$"
        },
        {
          "id": "2023-uas-q4-step-12",
          "title": "4c(ii) · Apply the core-displacement limit",
          "content": "The ±10 mm limit is relative core displacement from the centre, so its magnitude is zmax=0.010 m. Under the slow-input approximation, acceleration reaching that limit is k zmax/m.\n\nVoltage at the travel limit is LVDT sensitivity times 10 mm. This provides another check: acceleration of 48 m/s² times voltage sensitivity also gives 3.1 mV.\n\n$$\n|a|_{\\max}=\\frac{kz_{\\max}}m=\\frac{240(0.010)}{0.05}=\\boxed{48\\ \\mathrm{m/s^2}},\\qquad |E|_{\\max}=0.31(10)=3.1\\ \\mathrm{mV}\n$$",
          "simulation": {
            "title": "Accelerometer",
            "caption": "The ±10 mm limit applies to relative core displacement.",
            "params": [
              {
                "key": "frequency",
                "label": "Input frequency"
              },
              {
                "key": "acceleration",
                "label": "Acceleration amplitude"
              },
              {
                "key": "time",
                "label": "Time position"
              }
            ]
          }
        },
        {
          "id": "2023-uas-q4-step-13",
          "title": "Explain why 48 m/s² is not a universal frequency-independent limit",
          "content": "For a sinusoidal input at angular frequency $\\omega$, substituting $s=j\\omega$ into the model gives displacement amplitude $\\hat z=m\\hat a/\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}$.\n\nThe mechanical limit stays ±10 mm, but the acceleration producing that displacement can change with frequency. Set displacement amplitude equal to zmax and solve for acceleration amplitude to obtain the dynamic limit.\n\nThe question gives no input frequency. The numerical answer 48 m/s² therefore requires quasistatic operation, meaning acceleration changes sufficiently slowly.\n\n$$\n\\hat a_{\\max}(\\omega)=\\frac{z_{\\max}}m\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}\\quad\\longrightarrow\\quad48\\ \\mathrm{m/s^2}\\ \\text{as }\\omega\\to0\n$$"
        }
      ],
      "finalAnswer": "A resolver uses sine/cosine outputs; an LVDT uses the secondary difference. Dynamic model E/A = −0.31/(s²+69.2s+4800). At low frequency, sensitivity magnitude is 0.0645833 mV/(m/s²), with acceleration limit ±48 m/s².\n\n$$\n\\boxed{\\begin{aligned}|E|&\\approx0.0645833|a|\\quad[\\mathrm{mV}]\\\\|a|_{\\max}&=48\\ \\mathrm{m/s^2}\\quad(\\omega\\ll\\omega_n)\\end{aligned}}\n$$",
      "takeaway": "A ratio alone can discard quadrant information.",
      "sourceNotes": [
        "Part 2, PDF pages 7-8, supplies the second-order response model. Here the LVDT reads **relative** mass displacement. With $z=x-y$, force balance gives $m\\ddot z+c\\dot z+kz=-m\\ddot y$. Multiply the displacement relation by LVDT sensitivity to obtain voltage.",
        "Part 2, PDF page 10, and Part 3, PDF page 19, emphasize the usable frequency range. The approximation $z\\approx-ma/k$ applies well below the natural frequency. An acceleration limit derived from maximum displacement must therefore state its frequency condition; the static limit does not hold at every frequency."
      ]
    },
    "ipe-position-practice": {
      "title": "Practice: Position, displacement, and strain",
      "intro": "This practice helps you choose a model and explain your reasoning. Start with multiple-choice questions, review a flawed example, then write your own answer. Use the rubric to check your logic, assumptions, and conclusion limits.",
      "questions": [
        {
          "id": "concept-2023-06",
          "prompt": "A shaft may move while power is off. After power returns, the system must read its position within one revolution without moving it to find a reference. The most suitable choice is…",
          "options": [
            {
              "id": "concept-2023-06-option-1",
              "label": "A one-channel incremental encoder, because each pulse is a unique position code.",
              "feedback": "A single-channel pattern repeats. Without a count and initial position, pulses do not uniquely identify the sector."
            },
            {
              "id": "concept-2023-06-option-2",
              "label": "An incremental encoder with index Z, because the index identifies every angle while stationary.",
              "feedback": "The index is active near one position. At another stationary position, the system does not know its distance from that index."
            },
            {
              "id": "concept-2023-06-option-3",
              "label": "A single-turn absolute encoder, because its current code identifies position within one revolution.",
              "feedback": "Correct. A unique code per sector meets the requirement for reading single-turn angle without reference motion."
            },
            {
              "id": "concept-2023-06-option-4",
              "label": "An A/B incremental encoder without position retention, because two channels always provide absolute position.",
              "feedback": "Two channels distinguish motion direction but do not recover a count lost during power-off."
            }
          ],
          "explanation": "A single-turn absolute encoder supplies a position code at readout, without accumulating motion pulses from a reference. A/B provides direction and position change; index Z marks one reference rather than every angle. The requirement is only within one revolution, so turn-count information is not needed."
        },
        {
          "id": "concept-2023-07",
          "prompt": "A vertical two-electrode level probe has air in the upper gap and liquid in the lower gap. Both regions connect across the same pair of electrodes. Why do their capacitances add like parallel capacitors?",
          "options": [
            {
              "id": "concept-2023-07-option-1",
              "label": "Both regions have the same voltage, while their charges add to the total charge.",
              "feedback": "Correct. Equal voltage and additive charge determine the parallel model."
            },
            {
              "id": "concept-2023-07-option-2",
              "label": "Because liquid eliminates all capacitance in the air region.",
              "feedback": "The air region still contributes capacitance while it remains within the active electrode region."
            },
            {
              "id": "concept-2023-07-option-3",
              "label": "Because air is above liquid, current must pass through them sequentially.",
              "feedback": "Top-to-bottom position does not force a series connection. Here the field crosses the electrode gap at each height."
            },
            {
              "id": "concept-2023-07-option-4",
              "label": "Because capacitors with different dielectric materials are always parallel.",
              "feedback": "Different materials do not determine circuit arrangement. Geometry and electrode connections do."
            }
          ],
          "explanation": "Electrical arrangement follows the electrodes and field direction, not just top-to-bottom order. Both regions have the same potential difference and contribute charge to the same terminals, so capacitances add. A series model instead suits successive layers along the field direction with divided voltage."
        },
        {
          "id": "concept-2024-10",
          "prompt": "A DC LVDT accepts a DC supply and produces a DC voltage that follows core position. Which statement correctly explains its operation?",
          "options": [
            {
              "id": "concept-2024-10-option-1",
              "label": "Internal circuitry creates AC excitation, then demodulates the secondary difference into a DC output.",
              "feedback": "Correct. The circuitry provides a DC interface while retaining internal AC transformer operation."
            },
            {
              "id": "concept-2024-10-option-2",
              "label": "The primary receives steady DC and continuously induces secondary voltage without a changing field.",
              "feedback": "Steady DC does not sustain induction after the transient ends. AC excitation supplies the required changing field."
            },
            {
              "id": "concept-2024-10-option-3",
              "label": "The two secondary voltages are added so direction is always evident from the result.",
              "feedback": "The secondaries connect in opposition. Their difference and phase relative to excitation provide signed position, not the amplitude sum alone."
            },
            {
              "id": "concept-2024-10-option-4",
              "label": "The core moves an electrical contact, so the LVDT works like a potentiometer.",
              "feedback": "An LVDT senses magnetic-coupling changes; it needs no sliding contact to read core position."
            }
          ],
          "explanation": "DC LVDT describes supply and output at the interface. Internal induction still needs a changing field, so the primary uses AC. Differential secondary sensing and phase-sensitive demodulation retain displacement magnitude and sign."
        },
        {
          "id": "concept-2025-04",
          "prompt": "Two D gauges are bonded transversely to the surface of a bending beam. A student calls them “dummy gauges, so they must be strain-free.” Which assessment is most accurate?",
          "options": [
            {
              "id": "concept-2025-04-option-1",
              "label": "Correct: transverse orientation always removes every mechanical response.",
              "feedback": "A transverse direction can still experience Poisson strain."
            },
            {
              "id": "concept-2025-04-option-2",
              "label": "Correct: every gauge in a bridge responds only to temperature.",
              "feedback": "A bridge reads resistance changes, including those caused by mechanical strain."
            },
            {
              "id": "concept-2025-04-option-3",
              "label": "Not quite: bonded gauges can sense Poisson strain while also helping compensate temperature.",
              "feedback": "Correct. Mechanical response and temperature-compensation roles can coexist."
            },
            {
              "id": "concept-2025-04-option-4",
              "label": "Incorrect: transverse gauges must have the same strain sign and magnitude as longitudinal gauges.",
              "feedback": "Transverse strain depends on Poisson’s ratio and generally has the opposite sign; it is not simply identical."
            }
          ],
          "explanation": "Gauge orientation selects the strain component, rather than guaranteeing zero strain. Longitudinal tension can accompany transverse contraction, and vice versa. Bonded D gauges can therefore contribute mechanical signal; a strain-free dummy model needs mechanical isolation or an explicit assumption."
        },
        {
          "id": "concept-2025-08",
          "prompt": "Two resolver rotor positions produce the same sine-to-cosine signal ratio. However, both signal signs reverse between the positions. How can the angle reader distinguish them?",
          "options": [
            {
              "id": "concept-2025-08-option-1",
              "label": "Preserve both channel signs after demodulation, then use atan2 to retain the angle quadrant.",
              "feedback": "Correct. The two signs identify the quadrant, while the relative channel magnitudes locate the angle within it."
            },
            {
              "id": "concept-2025-08-option-2",
              "label": "Use only the absolute sine-to-cosine ratio; signs carry no angle information.",
              "feedback": "Absolute values discard signs and make multiple quadrants indistinguishable."
            },
            {
              "id": "concept-2025-08-option-3",
              "label": "Add the two channel voltages; their sum always uniquely determines a full-turn angle.",
              "feedback": "The sine-plus-cosine sum is not one-to-one over a full turn. Different angles can have the same sum."
            },
            {
              "id": "concept-2025-08-option-4",
              "label": "Measure only the sine-channel amplitude; one channel distinguishes every angle over a full turn.",
              "feedback": "One sine value can correspond to several angles. The cosine channel and its sign resolve that ambiguity."
            }
          ],
          "explanation": "The resolver’s sine and cosine pair carries quadrant information. The ratio alone can match at two angles separated by 180°. The reader must retain both channel signs relative to the carrier, then use atan2 to select the correct quadrant."
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-position-guided",
          "title": "Check a resolver-angle calculation",
          "prompt": "Two positions give the same sine-to-cosine ratio. Both signal signs reverse. Check the following conclusion.",
          "workSample": "The signal ratios match. Therefore, both rotor positions must be identical.",
          "question": {
            "prompt": "What information does this reasoning omit?",
            "options": [
              {
                "id": "ipe-position-guided-question-option-1",
                "label": "Both signal signs, which determine the quadrant.",
                "feedback": "Correct. The sine and cosine signs distinguish quadrants even when their ratio matches."
              },
              {
                "id": "ipe-position-guided-question-option-2",
                "label": "The absolute ratio; signal signs should be removed.",
                "feedback": "Absolute values remove the signs that distinguish quadrants. Retain both signs when finding the angle."
              },
              {
                "id": "ipe-position-guided-question-option-3",
                "label": "The common gain; only a gain change distinguishes the two positions.",
                "feedback": "A shared positive gain does not reverse both signs. Check the quadrant before attributing the change to gain."
              }
            ],
            "explanation": "Use the complete signal pair. The atan2 function uses both numerator and denominator signs to distinguish quadrants."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-position-essay",
          "title": "Choose a position reader after a power loss",
          "prompt": "A shaft can move while power is off. On startup, the instrument must know its position within one turn without moving to a reference. Compare absolute and incremental encoders. Explain the limits of your choice.",
          "sections": [
            "Model and assumptions",
            "Reasoning",
            "Conclusion and limits"
          ],
          "hints": [
            "Check which information is available immediately after power returns.",
            "Distinguish a current-position code from previous movement counts.",
            "Match the startup requirement to available codes or references. Then separate single-turn position from turn count."
          ],
          "rubric": [
            {
              "id": "ipe-position-rubric-model",
              "label": "Model and assumptions",
              "fullCredit": "Distinguishes absolute position codes from incremental movement counts.",
              "commonPartialError": "A ratio alone can discard quadrant information."
            },
            {
              "id": "ipe-position-rubric-reasoning",
              "label": "Reasoning",
              "fullCredit": "Explains why unpowered motion breaks the link between an old count and current position."
            },
            {
              "id": "ipe-position-rubric-conclusion",
              "label": "Conclusion and limits",
              "fullCredit": "Chooses an absolute encoder for the single-turn requirement and notes resolution and turn-count limits."
            }
          ],
          "verifiedOutline": "An incremental encoder needs a known count and reference. Motion while power is off can make an old count inconsistent with current position. An absolute encoder reads a position code on startup, so it suits the single-turn requirement. Choose resolution that matches the tolerance. A single-turn code does not give shaft turn count. If the task needs turn count, add a capability that actually preserves that information."
        }
      ]
    }
  }
};

import type { CourseModule, CourseTranslation } from '@tutor/core';

export const module: CourseModule = {
  "id": "ipe-flow",
  "code": "M6",
  "title": "Pengukuran aliran",
  "items": [
    {
      "id": "ipe-flow-material",
      "kind": "material",
      "slug": "ipe-flow-material",
      "title": "Hubungkan beda tekanan dengan debit",
      "estimatedMinutes": 6,
      "examHook": {
        "prompt": "Pitot membaca kecepatan di satu titik. Apakah nilai tersebut selalu dapat Anda kalikan dengan seluruh luas pipa?",
        "targetOutcome": "Anda dapat memilih luas, kecepatan, dan koefisien aliran yang sesuai."
      },
      "body": "Tentukan dahulu besaran yang benar-benar diukur alat. Manometer membaca beda tinggi, sedangkan Pitot memberi beda tekanan terkait kecepatan lokal. Debit memerlukan hubungan tambahan antara besaran tersebut dan seluruh aliran.\n\nTuliskan asumsi profil kecepatan serta arti koefisien yang Anda gunakan. Kedua hal ini menentukan apakah hasil bisa dipercaya.\n\n[Buka pembahasan bertahap: Debit oli melalui orifis](?item=2025-uts2-q1).",
      "microUnits": [
        {
          "id": "ipe-flow-principle",
          "title": "Pilih model dari kondisi soal",
          "intuition": "Cairan yang bergerak melewati pipa dapat memiliki kecepatan berbeda pada tiap posisi. **Kecepatan rata-rata** (debit dibagi luas) mewakili seluruh penampang. Kecepatan lokal dari Pitot hanya mewakili titik pengukuran. Anda perlu profil aliran atau faktor penghubung untuk menyamakan keduanya.",
          "formal": "Hubungan debit menggunakan:\n\n$$Q=A\\bar{v}.$$\n\nPada meter beda tekanan, model umumnya menghubungkan $Q$ dengan $\\sqrt{\\Delta p}$. Bentuk lengkapnya bergantung pada geometri dan definisi koefisien.",
          "validityBounds": "Periksa massa jenis kedua fluida pada manometer. Koefisien debit dapat bergantung pada Reynolds. Jangan menghitung koreksi kontraksi dua kali atau menebak viskositas yang tidak tersedia.",
          "decisionCheck": {
            "id": "ipe-flow-decision-question",
            "prompt": "Pitot membaca kecepatan titik tengah pada profil aliran yang tidak rata. Data apa yang masih Anda perlukan untuk menentukan debit?",
            "options": [
              {
                "id": "ipe-flow-decision-question-option-1",
                "label": "Hubungan kecepatan lokal dengan kecepatan rata-rata penampang.",
                "feedback": "Tepat. Debit memerlukan kecepatan rata-rata, sehingga profil atau faktor penghubung perlu diketahui."
              },
              {
                "id": "ipe-flow-decision-question-option-2",
                "label": "Hanya luas pipa; kecepatan lokal selalu sama dengan rata-rata.",
                "feedback": "Pada profil tidak rata, satu titik belum mewakili seluruh penampang.",
                "misconceptionTag": "flow-decision-choice-2"
              },
              {
                "id": "ipe-flow-decision-question-option-3",
                "label": "Hanya panjang pipa; luas penampang tidak diperlukan.",
                "feedback": "Debit melalui penampang bergantung pada distribusi kecepatan dan luasnya.",
                "misconceptionTag": "flow-decision-choice-3"
              }
            ],
            "correctOptionId": "ipe-flow-decision-question-option-1",
            "explanation": "Gunakan pembacaan Pitot sebagai kecepatan lokal. Hubungkan ke kecepatan rata-rata dengan model profil yang sesuai sebelum memakai luas pipa."
          }
        }
      ],
      "checkpoints": [
        "Anda dapat memilih luas, kecepatan, dan koefisien aliran yang sesuai.",
        "Geometri dan definisi koefisien harus cocok sebelum beda tekanan dapat diubah menjadi debit.",
        "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
      ],
      "derivations": [
        {
          "id": "ipe-flow-sources",
          "title": "Sumber dan cara membaca arsip",
          "content": "Baca bagian yang sesuai dengan model yang Anda pakai. Nomor di bawah menghitung halaman PDF dari 1; satu halaman dapat memuat beberapa slide.\n\n[Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view), halaman PDF 7, 8, 9, 10, 11, 12, 13: Prinsip sensor aliran, meter beda tekanan, tabel koefisien debit, Pitot, serta meter magnetik dan ultrasonik.\n\n[Arsip soal UTS 1, UTS 2, dan UAS 2023 sampai 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Setiap soal menyimpan naskah, halaman ujian, dan asumsi tersendiri."
        }
      ]
    },
    {
      "id": "2025-uts2-q1",
      "kind": "problem",
      "slug": "2025-uts2-q1",
      "title": "Debit oli melalui orifis",
      "source": "UTS 2 2025 · Soal 1",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
        "file": "2025-uts2.pdf",
        "pages": [
          1
        ],
        "original": "1. Flow Measurement: Orifice Flowmeter\nA hydraulic oil with a density of \\(\\rho=870\\ \\mathrm{kg/m^3}\\) flows inside a pipe with an internal diameter (D) of 500 mm. An orifice flowmeter is used to measure the flow, yielding a vena contracta with a diameter (d) of 300 mm, as shown in the following figure. In addition, the pressure difference (ΔP) between the upstream and downstream sections of the orifice is measured using a pressure gauge, giving a value of 1.6 MPa. The absolute viscosity (μ) of the oil is given as 0.059 Ns/m².\na. [15%] Calculate the volumetric flowrate of the oil in m³/s. Hint: Use Bernoulli’s equation and the continuity equation.\nb. [5%] Calculate the mass flowrate of the oil in kg/s.\nc. [5%] There is a pressure difference between the upstream and downstream sections of the orifice plate. Which section has higher pressure? Explain briefly.\nd. [5%] What are the advantages and disadvantages of an orifice flowmeter compared to a venturi flowmeter?\nDischarge-coefficient table: columns Re = 10⁴, 10⁵, 10⁶, 10⁷. Rows d/D: 0.2 → 0.60, 0.595, 0.594, 0.594; 0.4 → 0.61, 0.603, 0.598, 0.598; 0.5 → 0.62, 0.608, 0.603, 0.603; 0.6 → 0.63, 0.610, 0.608, 0.608; 0.7 → 0.64, 0.614, 0.609, 0.609.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              7,
              9,
              10
            ]
          }
        ]
      },
      "assumptions": [
        "Aliran tunak, oli tak termampatkan, kedua titik berada pada elevasi yang sama, dan beda tekanan sesuai titik ukur tabel.",
        "Soal menyebut d sebagai diameter vena contracta, tetapi juga memberi tabel Cd untuk metode orifis. Pembahasan mengikuti konvensi hitungan kuliah: d menjadi diameter bukaan efektif dalam rumus Cd. Dalam desain nyata, diameter lubang pelat dan vena contracta berbeda; keduanya tidak boleh ditukar tanpa model koefisien yang sesuai."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2025,
        "number": 1
      },
      "difficulty": "menengah",
      "estimatedMinutes": 22,
      "tags": [
        "Pengukuran aliran"
      ],
      "statement": "Oli dengan massa jenis $870\\ \\mathrm{kg/m^3}$ dan viskositas $0.059\\ \\mathrm{Pa\\,s}$ mengalir dalam pipa berdiameter $500\\ \\mathrm{mm}$. Orifis menghasilkan diameter $d=300\\ \\mathrm{mm}$, yang disebut vena contracta pada soal. Beda tekanannya $1.6\\ \\mathrm{MPa}$. Gunakan tabel koefisien debit pada sumber.\n(a) Hitung debit volume dengan kontinuitas dan Bernoulli. (b) Hitung debit massa. (c) Tentukan sisi bertekanan lebih tinggi dan alasannya. (d) Bandingkan kelebihan serta kekurangan orifis terhadap venturi.",
      "given": [
        "Diameter pipa: $D=0.500\\ \\mathrm m$",
        "Diameter penyempitan: $d=0.300\\ \\mathrm m$",
        "Beda tekanan: $\\Delta p=1.6\\times10^6\\ \\mathrm{Pa}$"
      ],
      "simulation": {
        "id": "2025-uts2-q1-visual",
        "type": "ipe-orifice",
        "title": "Aliran melalui orifice",
        "caption": "Hubungkan penyempitan, tekanan, dan debit. Nilai awal mengikuti soal.",
        "params": [
          {
            "key": "pressure",
            "label": "Beda tekanan Δp",
            "min": 0,
            "max": 3200,
            "step": 16,
            "defaultValue": 1600,
            "unit": "kPa"
          },
          {
            "key": "diameterRatio",
            "label": "d / D",
            "min": 0.15,
            "max": 0.85,
            "step": 0.01,
            "defaultValue": 0.6
          },
          {
            "key": "Cd",
            "label": "Koefisien debit Cd",
            "min": 0,
            "max": 1,
            "step": 0.001,
            "defaultValue": 0.61
          }
        ],
        "data": {
          "D": 0.5,
          "d": 0.3,
          "rho": 870,
          "mu": 0.059,
          "dp": 1600000,
          "Cd": 0.61,
          "visualKind": "orifice"
        }
      },
      "steps": [
        {
          "id": "2025-uts2-q1-step-1",
          "title": "1. Tentukan apa yang dicari dan mengapa beda tekanan berguna",
          "content": "Kita mencari banyaknya oli yang melewati pipa setiap detik. **Debit volume** (volume per detik) memakai simbol $Q$. **Debit massa** (massa per detik) memakai simbol $\\dot m$. Kita mencari $Q$ dahulu, lalu memakai massa jenis $\\rho$ untuk memperoleh $\\dot m$.\n\nOrifis tidak membaca debit secara langsung. Penyempitan mengubah kecepatan, lalu perubahan kecepatan menimbulkan beda tekanan. Oleh karena itu, kontinuitas menghubungkan kecepatan kedua penampang, dan Bernoulli menghubungkannya dengan $\\Delta p$.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Geometri dan definisi koefisien harus cocok sebelum beda tekanan dapat diubah menjadi debit.",
            "commonPitfall": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
          }
        },
        {
          "id": "2025-uts2-q1-step-2",
          "title": "2. Samakan satuan dan pilih baris tabel",
          "content": "$500\\ \\mathrm{mm}=0.500\\ \\mathrm m$, $300\\ \\mathrm{mm}=0.300\\ \\mathrm m$, dan $1.6\\ \\mathrm{MPa}=1.6\\times10^6\\ \\mathrm{Pa}$. Viskositas $\\mu=0.059\\ \\mathrm{Pa\\,s}$ diperlukan nanti untuk mengecek Reynolds.\n\nKita mencari volume per detik. Ubah diameter ke meter dan tekanan ke pascal. Rasio diameter menentukan baris koefisien debit $C_d$.\n\n$A_1$ adalah luas pipa hulu dan $A_2$ luas penampang kecil dalam konvensi soal. Luas memakai kuadrat diameter: $A_2/A_1=(d/D)^2=0.36$, bukan 0.6. Ini akan menentukan hubungan kecepatan.\n\n$$\n\\beta=\\frac dD=0.6,\\qquad A_1=\\frac{\\pi D^2}{4}=0.196350\\ \\mathrm{m^2},\\quad A_2=0.0706858\\ \\mathrm{m^2}\n$$\n\n| d/D | Re = 10⁴ | Re = 10⁵ | Re = 10⁶ | Re = 10⁷ |\n| --- | --- | --- | --- | --- |\n| 0.2 | 0.600 | 0.595 | 0.594 | 0.594 |\n| 0.4 | 0.610 | 0.603 | 0.598 | 0.598 |\n| 0.5 | 0.620 | 0.608 | 0.603 | 0.603 |\n| 0.6 | 0.630 | 0.610 | 0.608 | 0.608 |\n| 0.7 | 0.640 | 0.614 | 0.609 | 0.609 |"
        },
        {
          "id": "2025-uts2-q1-step-3",
          "title": "3. Hubungkan kedua kecepatan",
          "content": "Oli dianggap tak termampatkan. Volume yang masuk sama dengan volume yang keluar, sehingga penampang kecil memiliki kecepatan lebih tinggi.\n\nKecepatan $v_1$ milik pipa besar, sedangkan $v_2$ milik penampang kecil. Luas $A_2$ lebih kecil daripada $A_1$, sehingga $v_2>v_1$. Hubungan ini juga menjadi pemeriksaan tanda dan arah perubahan tekanan.\n\n$$\nA_1v_1=A_2v_2=Q,\\qquad v_1=\\frac{A_2}{A_1}v_2=\\beta^2v_2=0.36v_2\n$$"
        },
        {
          "id": "2025-uts2-q1-step-4",
          "title": "4. Turunkan hubungan tekanan dan kecepatan",
          "content": "Untuk model ideal, tulis Bernoulli antara titik hulu dan penampang kecil. Kedua titik memiliki elevasi sama, sehingga suku energi gravitasi saling menghapus. Pindahkan suku tekanan ke kiri dan suku kecepatan ke kanan.\n\nMasukkan $v_1=\\beta^2v_2$. Saat kecepatan dikuadratkan, faktor $\\beta^2$ menjadi $\\beta^4$. Itulah asal penyebut $1-\\beta^4$; faktor ini tidak muncul hanya dari menghafal rumus orifis.\n\n$$\np_1+\\tfrac12\\rho v_1^2=p_2+\\tfrac12\\rho v_2^2\\\\\\Delta p=\\tfrac12\\rho v_2^2(1-\\beta^4)\\quad\\Rightarrow\\quad v_{2,i}=\\sqrt{\\frac{2\\Delta p}{\\rho(1-\\beta^4)}}\n$$"
        },
        {
          "id": "2025-uts2-q1-step-5",
          "title": "5. Hitung debit sebelum koreksi empiris",
          "content": "Indeks $i$ berarti ideal. Kalikan kecepatan ideal pada penampang kecil dengan luas penampang itu. Nilai di dalam akar memiliki satuan $\\mathrm{m^2/s^2}$, sehingga akar memberi $\\mathrm{m/s}$ dan hasil akhir memberi $\\mathrm{m^3/s}$.\n\n$$\n1-0.6^4=0.8704\\\\Q_i=0.0706858\\sqrt{\\frac{2(1.6\\times10^6)}{870(0.8704)}}=4.59503\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2025-uts2-q1-step-6",
          "title": "6. Gunakan Cd, lalu uji dugaan awalnya",
          "content": "$C_d$ adalah koefisien debit tak bersatuan. Ia menghubungkan hasil ideal dengan hasil nyata menurut tabel. Baris $d/D=0.6$ sudah pasti, tetapi kolom Reynolds belum diketahui karena Reynolds sendiri memerlukan debit.\n\nGunakan $C_d=0.610$ sebagai percobaan dari kolom $10^5$. Ini belum keputusan akhir: hitung debit, dapatkan Reynolds, lalu lihat apakah keduanya sesuai. Jika tidak sesuai, perbarui $C_d$ dan ulangi.\n\n$$\nQ=C_dQ_i=0.610(4.59503)=2.80297\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2025-uts2-q1-step-7",
          "title": "7. Pastikan pilihan Cd sesuai",
          "content": "Reynolds memakai kecepatan rata-rata dalam pipa dan diameter pipa. Hasilnya dekat $10^5$, sehingga $C_d=0.610$ cocok dengan ketelitian tabel. Interpolasi halus hanya mengubah hasil pembulatan sedikit.\n\nGunakan debit aktual yang baru diperoleh, bukan debit ideal, untuk mendapatkan $v_1$. Viskositas dinamik berada di penyebut: pada geometri dan kecepatan sama, oli yang lebih kental menghasilkan Reynolds lebih rendah.\n\n$$\nv_1=\\frac Q{A_1}=14.2754\\ \\mathrm{m/s},\\qquad Re_D=\\frac{\\rho v_1D}{\\mu}=\\frac{870(14.2754)(0.500)}{0.059}=1.05251\\times10^5\n$$"
        },
        {
          "id": "2025-uts2-q1-step-8",
          "title": "8. Ubah debit volume menjadi debit massa",
          "content": "Setiap meter kubik oli memiliki massa 870 kg. Kalikan debit volume dengan massa jenis.\n\nPeriksa satuannya: $(\\mathrm{kg/m^3})(\\mathrm{m^3/s})=\\mathrm{kg/s}$. Debit massa lebih besar angkanya karena satu meter kubik oli memiliki massa ratusan kilogram, bukan karena kedua debit mengukur besaran yang sama.\n\n$$\n\\dot m=\\rho Q=870(2.80297)=2438.58\\ \\mathrm{kg/s}\n$$"
        },
        {
          "id": "2025-uts2-q1-step-9",
          "title": "9. Tentukan sisi bertekanan lebih tinggi",
          "content": "Tekanan hulu lebih tinggi. Saat aliran menyempit, kecepatan naik dan tekanan statik turun. Setelah aliran melebar kembali, sebagian tekanan pulih, tetapi rugi energi membuat pemulihannya tidak penuh.\n\nBedakan penurunan tekanan di dekat penyempitan dari rugi tekanan permanen setelah aliran pulih. Beda tekanan pada dua titik ukur membantu menghitung debit; seluruh beda itu tidak harus tetap menjadi rugi tekanan jauh di hilir.\n\n$$\np_1>p_2,\\qquad \\Delta p=p_1-p_2>0\n$$"
        },
        {
          "id": "2025-uts2-q1-step-10",
          "title": "10. Bandingkan orifis dengan venturi",
          "content": "Orifis ringkas, murah, mudah dibuat, dan pelatnya mudah diganti. Kekurangannya ialah rugi tekanan permanen lebih besar serta hasil lebih peka terhadap tepi pelat, endapan, dan kondisi aliran. Venturi lebih besar dan mahal, tetapi bentuknya yang bertahap memberi pemulihan tekanan lebih baik.\n\nPilih orifis bila ukuran, biaya awal, dan kemudahan mengganti pelat lebih penting. Pertimbangkan venturi bila penghematan rugi tekanan selama operasi lebih penting. Perbandingan ini menjawab fungsi alat, bukan hanya bentuknya."
        },
        {
          "id": "2025-uts2-q1-step-11",
          "title": "11. Cek apakah seluruh hasil saling cocok",
          "content": "$C_d<1$ membuat $Q<Q_i$, sesuai peran koreksi. Selain itu, $Q/A_2\\approx39.65\\ \\mathrm{m/s}$ lebih besar daripada $Q/A_1\\approx14.28\\ \\mathrm{m/s}$, sesuai penyempitan. Hasil Reynolds juga kembali ke kolom tabel yang kita pakai.\n\nHasil ini tetap mengikuti konvensi diameter yang dijelaskan pada catatan soal. Jangan menambahkan koefisien kontraksi lain tanpa mengubah model; itu dapat menghitung koreksi dua kali."
        }
      ],
      "finalAnswer": "Dengan Cd ≈ 0.610, debit volume ≈ 2.803 m³/s dan debit massa ≈ 2.439 × 10³ kg/s. Tekanan hulu lebih tinggi.\n\n$$\n\\boxed{Q\\approx2.803\\ \\mathrm{m^3/s},\\quad \\dot m\\approx2.439\\times10^3\\ \\mathrm{kg/s},\\quad Re_D\\approx1.053\\times10^5}\n$$",
      "takeaway": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
    },
    {
      "id": "2025-uas-q5",
      "kind": "problem",
      "slug": "2025-uas-q5",
      "title": "Orifis dengan manometer raksa",
      "source": "UAS 2025 · Soal 5",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
        "file": "2025-uas.pdf",
        "pages": [
          2,
          3
        ],
        "original": "5. [20%] Flow Measurement System\na. [10%] Derive the equation for v1 as a function of the mercury (Hg) manometer height difference h, the density of mercury ρm, the density of the fluid ρf, and the ratio of cross-sectional diameters (d/D), as shown in Figure 1.\nb. [5%] For D = 300 mm, d = 180 mm, a mercury height difference of 100 mm, mercury density of 13,600 kg/m³, and fluid density of 900 kg/m³, determine the mass flow rate of the fluid flowing in the pipe (m³/s).\nc. [5%] Check whether the flow is laminar or turbulent.\nFigure 1: horizontal pipe, orifice, and differential mercury U-tube manometer. The discharge-coefficient table has Re columns 10⁴, 10⁵, 10⁶, 10⁷. At d/D = 0.6, Cd = 0.63, 0.610, 0.608, 0.608. Other rows d/D: 0.2 → 0.60, 0.595, 0.594, 0.594; 0.4 → 0.61, 0.603, 0.598, 0.598; 0.5 → 0.62, 0.608, 0.603, 0.603; 0.7 → 0.64, 0.614, 0.609, 0.609.\nUseful formulas: Re = ρvD/μ; Q = Av.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              7,
              9,
              10
            ]
          }
        ]
      },
      "assumptions": [
        "Aliran tunak tak termampatkan, titik ukur setinggi sama, g = 9.81 m/s². Kita memakai d sebagai diameter bukaan efektif pada metode Cd, sesuai konvensi soal orifis lain. Diameter vena contracta nyata memerlukan model koefisien yang konsisten.",
        "Rentang hasil tabel Cd bukan batas universal: tabel hanya memuat Re 10⁴ sampai 10⁷. Sumber tidak memberi μ; angka Cd hanya skenario, bukan hasil terverifikasi untuk fluida ini."
      ],
      "exam": {
        "term": "UAS",
        "year": 2025,
        "number": 5
      },
      "difficulty": "menengah",
      "estimatedMinutes": 22,
      "tags": [
        "Pengukuran aliran"
      ],
      "statement": "(a) Turunkan kecepatan pipa $v_1$ dari beda tinggi raksa $h$, massa jenis raksa $\\rho_m$, massa jenis fluida $\\rho_f$, dan rasio $d/D$. (b) Gunakan $D=300\\ \\mathrm{mm}$, $d=180\\ \\mathrm{mm}$, $h=100\\ \\mathrm{mm}$, $\\rho_m=13600\\ \\mathrm{kg/m^3}$, dan $\\rho_f=900\\ \\mathrm{kg/m^3}$ untuk menghitung aliran. Sumber menyebut “mass flow rate” dengan satuan $\\mathrm{m^3/s}$; kita bedakan debit volume $Q$ dan debit massa $\\dot m$. (c) Periksa rezim aliran. Tabel $C_d$ tersedia, tetapi viskositas tidak diberikan.",
      "simulation": {
        "id": "2025-uas-q5-visual",
        "type": "ipe-orifice",
        "title": "Aliran melalui orifice",
        "caption": "Manometer memberi beda tekanan. Nilai awal menampilkan model ideal Cd = 1; koreksi aktual perlu data tambahan.",
        "params": [
          {
            "key": "pressure",
            "label": "Beda tekanan Δp",
            "min": 0,
            "max": 24.9174,
            "step": 0.124587,
            "defaultValue": 12.4587,
            "unit": "kPa"
          },
          {
            "key": "diameterRatio",
            "label": "d / D",
            "min": 0.15,
            "max": 0.85,
            "step": 0.01,
            "defaultValue": 0.6
          },
          {
            "key": "Cd",
            "label": "Koefisien debit Cd",
            "min": 0,
            "max": 1,
            "step": 0.001,
            "defaultValue": 1
          }
        ],
        "data": {
          "D": 0.3,
          "d": 0.18,
          "rho": 900,
          "rhoManometer": 13600,
          "h": 0.1,
          "dp": 12458.7,
          "Cd": 1,
          "mode": "manometer",
          "viscosityMissing": 1,
          "visualKind": "orifice"
        }
      },
      "steps": [
        {
          "id": "2025-uas-q5-step-1",
          "title": "1. Pisahkan besaran yang dapat ditentukan dari data yang kurang",
          "content": "Data manometer cukup untuk mencari $\\Delta p$, lalu Bernoulli memberi kecepatan ideal. Kita memerlukan $C_d$ untuk mencari debit aktual. Namun, pemilihan $C_d$ membutuhkan bilangan Reynolds, sedangkan bilangan Reynolds membutuhkan viskositas. Sumber tidak memberi viskositas. Kita akan menyatakan hasil aktual beserta syaratnya agar Anda dapat membedakan hasil pasti dan hasil bersyarat.\n\nMenemukan data yang kurang bukan alasan menghentikan semua hitungan. Kerjakan bagian yang dapat ditentukan, lalu tulis dengan jelas apa yang masih bergantung pada asumsi.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Geometri dan definisi koefisien harus cocok sebelum beda tekanan dapat diubah menjadi debit.",
            "commonPitfall": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
          },
          "checkpoint": {
            "prompt": "Soal orifis memberi geometri, beda tekanan, massa jenis, dan tabel Cd yang bergantung pada Reynolds. Viskositas tidak tersedia. Jawaban mana paling dapat dipertanggungjawabkan?",
            "options": [
              {
                "id": "2025-uas-q5-checkpoint-option-1",
                "label": "Ambil viskositas dari soal lain yang sama-sama menyebut oli.",
                "feedback": "Nama fluida yang sama tidak menjamin viskositas sama; suhu dan jenis oli juga berpengaruh.",
                "misconceptionTag": "concept-2025-09-choice-1"
              },
              {
                "id": "2025-uas-q5-checkpoint-option-2",
                "label": "Tetapkan aliran turbulen hanya karena beda tekanannya tidak nol.",
                "feedback": "Aliran laminar juga memerlukan beda tekanan. Beda tekanan bukan penentu tunggal rezim.",
                "misconceptionTag": "concept-2025-09-choice-2"
              },
              {
                "id": "2025-uas-q5-checkpoint-option-3",
                "label": "Laporkan debit ideal dan hubungan debit aktual terhadap Cd; jelaskan data yang perlu ditambah untuk memilih Cd.",
                "feedback": "Tepat. Jawaban ini menyelesaikan bagian yang dapat ditentukan tanpa menyembunyikan kekurangan data."
              },
              {
                "id": "2025-uas-q5-checkpoint-option-4",
                "label": "Pilih Cd paling kecil pada tabel dan nyatakan hasilnya sebagai jawaban pasti.",
                "feedback": "Nilai itu hanya berlaku pada kondisi tabelnya. Memilih angka terkecil tidak membuktikan syaratnya terpenuhi.",
                "misconceptionTag": "concept-2025-09-choice-4"
              }
            ],
            "correctOptionId": "2025-uas-q5-checkpoint-option-3"
          }
        },
        {
          "id": "2025-uas-q5-step-2",
          "title": "2. Ubah beda tinggi menjadi beda tekanan",
          "content": "Kedua pipa manometer berisi fluida ukur di atas raksa. Oleh karena itu, beda tekanan memakai selisih massa jenis, bukan massa jenis raksa saja. Ambil $h$ positif ketika tekanan hulu lebih tinggi.\n\n$\\rho_m=13600\\ \\mathrm{kg/m^3}$ adalah massa jenis raksa dan $\\rho_f=900\\ \\mathrm{kg/m^3}$ massa jenis fluida pipa. Kolom fluida pipa juga menyumbang tekanan hidrostatik, sehingga yang tersisa adalah selisih kedua massa jenis. Pakai $h=100\\ \\mathrm{mm}=0.100\\ \\mathrm m$.\n\n$$\n\\Delta p=(\\rho_m-\\rho_f)gh=(13600-900)(9.81)(0.100)=12458.7\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2025-uas-q5-step-3",
          "title": "3. Ubah rasio diameter menjadi rasio luas",
          "content": "$D=0.300\\ \\mathrm m$ dan $d=0.180\\ \\mathrm m$, sehingga $\\beta=0.6$. Kontinuitas untuk fluida tak termampatkan memberi debit sama di kedua penampang. Luas kecil sama dengan 0.36 kali luas pipa. Oleh karena itu, kecepatannya $1/0.36$ kali kecepatan pipa.\n\n$$\n\\frac{A_2}{A_1}=\\beta^2=0.36,\\qquad A_1v_1=A_2v_2\\quad\\Rightarrow\\quad v_2=\\frac{v_1}{\\beta^2}\n$$"
        },
        {
          "id": "2025-uas-q5-step-4",
          "title": "4. Susun Bernoulli dalam kecepatan pipa yang diminta",
          "content": "Pada elevasi sama, $\\Delta p=\\rho_f(v_2^2-v_1^2)/2$ untuk model ideal. Ganti $v_2$ dengan $v_1/\\beta^2$. Dengan begitu, hanya $v_1$ yang belum diketahui.\n\n$$\n\\Delta p=\\frac{\\rho_f}{2}\\left(\\frac{v_{1,i}^2}{\\beta^4}-v_{1,i}^2\\right)=\\frac{\\rho_f v_{1,i}^2}{2}(\\beta^{-4}-1)\n$$"
        },
        {
          "id": "2025-uas-q5-step-5",
          "title": "5. Gabungkan kontinuitas dan Bernoulli",
          "content": "Tuliskan $\\beta=d/D$. Kontinuitas memberi $v_2=v_1/\\beta^2$. Masukkan ke Bernoulli pada elevasi sama, kemudian keluarkan $v_1$ dari tanda akar. Kecepatan ini masih ideal karena kita belum memasukkan koreksi debit.\n\nUntuk memperoleh bentuk akhir, gunakan $\\beta^{-4}-1=(1-\\beta^4)/\\beta^4$ dan $\\sqrt{\\beta^4}=\\beta^2$ karena diameter positif. Itu menjelaskan faktor $\\beta^2$ di depan akar.\n\n$$\n(\\rho_m-\\rho_f)gh=\\frac12\\rho_fv_{1,i}^{\\,2}(\\beta^{-4}-1)\\\\v_{1,i}=\\beta^2\\sqrt{\\frac{2gh(\\rho_m/\\rho_f-1)}{1-\\beta^4}},\\qquad v_{1,\\mathrm{actual}}=C_dv_{1,i}\n$$\n\n| d/D | Re = 10⁴ | Re = 10⁵ | Re = 10⁶ | Re = 10⁷ |\n| --- | --- | --- | --- | --- |\n| 0.2 | 0.600 | 0.595 | 0.594 | 0.594 |\n| 0.4 | 0.610 | 0.603 | 0.598 | 0.598 |\n| 0.5 | 0.620 | 0.608 | 0.603 | 0.603 |\n| 0.6 | 0.630 | 0.610 | 0.608 | 0.608 |\n| 0.7 | 0.640 | 0.614 | 0.609 | 0.609 |"
        },
        {
          "id": "2025-uas-q5-step-6",
          "title": "6. Masukkan angka untuk kecepatan ideal",
          "content": "Pakai massa jenis fluida pipa di penyebut energi kinetik. Raksa hanya berperan dalam mengubah tinggi manometer menjadi beda tekanan. Hasil ini belum dikalikan koefisien debit.\n\n$$\nv_{1,i}=0.6^2\\sqrt{\\frac{2(9.81)(0.100)(13600/900-1)}{1-0.6^4}}=2.03036\\ \\mathrm{m/s}\n$$"
        },
        {
          "id": "2025-uas-q5-step-7",
          "title": "7. Hitung nilai ideal yang sudah dapat ditentukan",
          "content": "Rasio diameter ialah 0.6. Luas pipa berasal dari diameter 0.300 m. Kalikan luas dengan kecepatan untuk memperoleh debit volume, lalu kalikan dengan massa jenis untuk debit massa.\n\nKecepatan yang kita hitung milik pipa besar, jadi kalikan dengan $A_1$, bukan $A_2$. Mengalikan $v_1$ dengan luas kecil akan menggabungkan dua penampang yang berbeda dan menghasilkan debit salah.\n\n$$\nv_{1,i}=2.03036\\ \\mathrm{m/s},\\quad A_1=\\frac{\\pi(0.300)^2}{4}=0.0706858\\ \\mathrm{m^2}\\\\Q_i=A_1v_{1,i}=0.143518\\ \\mathrm{m^3/s},\\quad \\dot m_i=900Q_i=129.166\\ \\mathrm{kg/s}\n$$"
        },
        {
          "id": "2025-uas-q5-step-8",
          "title": "8. Pisahkan hasil aktual dari asumsi Cd",
          "content": "Untuk hasil aktual, $Q=C_dQ_i$. Namun, tabel memilih $C_d$ dari Reynolds, sedangkan Reynolds memerlukan viskositas. Sumber tidak memberi viskositas. Oleh karena itu, kita belum dapat memilih satu nilai aktual yang unik. Jangan mengambil viskositas dari soal lain.\n\nTabel skenario menunjukkan akibat beberapa pilihan Cd, bukan tiga jawaban yang sama-sama telah dibuktikan. Setiap baris memerlukan kondisi Reynolds yang sesuai; data yang kurang mencegah kita memilih satu baris secara pasti.\n\n$$\nQ=0.143518C_d\\ \\mathrm{m^3/s},\\qquad \\dot m=129.166C_d\\ \\mathrm{kg/s}\n$$\n\n| Asumsi Cd | Q (m³/s) | ṁ (kg/s) |\n| --- | --- | --- |\n| 0.630 (Re = 10⁴) | 0.090416 | 81.375 |\n| 0.610 (Re = 10⁵) | 0.087546 | 78.791 |\n| 0.608 (Re ≥ 10⁶ pada tabel / in table) | 0.087259 | 78.533 |"
        },
        {
          "id": "2025-uas-q5-step-9",
          "title": "9. Tulis pemeriksaan Reynolds secara bersyarat",
          "content": "Dengan $\\mu$ dalam $\\mathrm{Pa\\,s}$, persamaan di bawah memberi Reynolds aktual. Rezim pipa biasanya laminar di bawah sekitar 2300, transisi sekitar 2300 sampai 4000, dan turbulen di atas sekitar 4000. Tanpa $\\mu$, pilihannya tidak bisa dipastikan.\n\nRumus ini memakai $v_{1,\\mathrm{actual}}=C_dv_{1,i}$. Menyatakan aliran turbulen hanya dari nilai beda tekanan tidak cukup, karena viskositas juga mengatur rasio gaya inersia terhadap gaya viskos.\n\n$$\nRe_D=\\frac{900(2.03036C_d)(0.300)}{\\mu}=\\frac{548.197C_d}{\\mu}\n$$\n\n> Jika sengaja memakai Cd = 0.608, Re = 333.304/μ. Syarat Re ≥ 10⁶ untuk kolom itu menuntut μ ≤ 3.333 × 10⁻⁴ Pa·s. Jadi pemilihan kolom harus dicek, bukan diasumsikan dari bentuk gambar."
        },
        {
          "id": "2025-uas-q5-step-10",
          "title": "10. Periksa satu pilihan Cd tanpa menganggapnya data baru",
          "content": "Jika seseorang memilih $C_d=0.608$ dari kolom Reynolds tinggi, model memberi $Re_D=333.304/\\mu$. Syarat $Re_D\\ge10^6$ hanya terpenuhi jika $\\mu\\le3.333\\times10^{-4}\\ \\mathrm{Pa\\,s}$. Soal tidak mengatakan syarat ini terpenuhi."
        },
        {
          "id": "2025-uas-q5-step-11",
          "title": "11. Laporkan satuan dan data yang masih diperlukan",
          "content": "m³/s menyatakan debit volume; kg/s menyatakan debit massa. Kita sudah dapat melaporkan hasil ideal dan hubungan terhadap Cd. Nilai viskositas atau Cd yang ditetapkan perlu ditambahkan untuk menutup bagian aktual; viskositas juga diperlukan untuk memutuskan laminar atau turbulen.\n\nPemeriksaan fisik: untuk $0<C_d<1$, debit aktual lebih kecil daripada debit ideal. Jika suatu substitusi menghasilkan kebalikannya tanpa model tambahan, periksa kembali letak $C_d$ dan luas yang dipakai."
        }
      ],
      "finalAnswer": "Debit ideal 0.143518 m³/s dan 129.166 kg/s. Debit aktual adalah 0.143518 Cd m³/s dan 129.166 Cd kg/s. Viskositas yang hilang membuat Cd aktual dan rezim aliran belum dapat ditentukan secara unik.\n\n$$\n\\boxed{\\begin{aligned}v_{1,i}&=\\beta^2\\sqrt{\\frac{2gh(\\rho_m/\\rho_f-1)}{1-\\beta^4}}\\\\Q&=0.143518C_d\\ \\mathrm{m^3/s}\\\\\\dot m&=129.166C_d\\ \\mathrm{kg/s}\\end{aligned}}\n$$",
      "takeaway": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
    },
    {
      "id": "2024-uts2-q3",
      "kind": "problem",
      "slug": "2024-uts2-q3",
      "title": "Debit dari Pitot dan manometer",
      "source": "UTS 2 2024 · Soal 3",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3/view",
        "file": "2024-uts2.pdf",
        "pages": [
          2,
          3
        ],
        "original": "3. Pitot Tube: Flow Measurement\nA pitot tube is used to measure the water flow inside a pipe with an internal diameter of 100 mm. The tube is connected to a U-tube manometer filled with mercury, as depicted in the following figure. Given that the density of water and mercury are 1000 kg/m³ and 13600 kg/m³, respectively, and the absolute viscosity of water at 27°C is \\(8.62\\times10^{-3}\\ \\mathrm{Ns/m^2}\\). The gravity constant is 10 m/s².\n(a) [5%] By using Bernoulli’s equation, determine the pressure difference between Point 1 and Point 2, i.e. \\(P_2-P_1\\).\n(b) [10%] By using Pascal’s Law, determine the water flow (\\(v_1\\)) in terms of the mercury height difference (\\(h_m\\)).\n(c) [10%] If \\(h_m=5\\) mm, calculate the volumetric flowrate in m³/s.\n(d) [5%] Check whether the water flow is laminar or turbulent?\nUseful formulas supplied: \\(Re=\\rho vD/\\mu\\); laminar \\(v_{max}=2v_{avg}\\); turbulent \\(v_{max}=1.23v_{avg}\\).",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              11
            ]
          }
        ]
      },
      "assumptions": [
        "Kita anggap ujung Pitot berada pada garis tengah dan aliran berkembang penuh, sesuai gambar profil pada lampiran. Jika v1 dimaksudkan sebagai kecepatan rata-rata, debitnya 0,008816 m³/s; itu melewati koreksi profil yang diberikan soal.",
        "Soal mencetak viskositas 8,62 × 10⁻³ Pa·s. Pembahasan mempertahankan angka itu; jangan menggantinya diam-diam dengan nilai dari tabel air."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2024,
        "number": 3
      },
      "difficulty": "menengah",
      "estimatedMinutes": 18,
      "tags": [
        "Pengukuran aliran"
      ],
      "statement": "Air mengalir di pipa berdiameter dalam 100 mm. Pitot menghubungkan tekanan statis di titik 1 dan tekanan stagnasi di titik 2 ke manometer U berisi raksa. Diketahui $\\rho_w=1000\\ \\mathrm{kg/m^3}$, $\\rho_m=13600\\ \\mathrm{kg/m^3}$, $\\mu=8{,}62\\times10^{-3}\\ \\mathrm{Pa\\,s}$, dan $g=10\\ \\mathrm{m/s^2}$. (a) Turunkan $P_2-P_1$ dengan Bernoulli. (b) Nyatakan $v_1$ sebagai fungsi selisih tinggi raksa $h_m$. (c) Hitung debit saat $h_m=5$ mm. (d) Periksa jenis alirannya. Gunakan hubungan pada lampiran: $v_{max}=2v_{avg}$ untuk laminar dan $v_{max}=1{,}23v_{avg}$ untuk turbulen.",
      "simulation": {
        "id": "2024-uts2-q3-visual",
        "type": "ipe-pitot",
        "title": "Tabung Pitot",
        "caption": "Tinggi raksa menentukan tekanan dinamis; profil aliran mengubah kecepatan lokal menjadi debit.",
        "params": [
          {
            "key": "height",
            "label": "Beda tinggi h",
            "min": 0,
            "max": 0.01,
            "step": 0.0001,
            "defaultValue": 0.005,
            "unit": "m"
          }
        ],
        "data": {
          "D": 0.1,
          "rho": 1000,
          "g": 10,
          "h": 0.005,
          "mu": 0.00862,
          "profileFactor": 1.23,
          "rhoMan": 13600,
          "visualKind": "pitot"
        }
      },
      "steps": [
        {
          "id": "2024-uts2-q3-step-1",
          "title": "a · Tentukan apa yang dibaca Pitot",
          "content": "Kita ingin debit seluruh pipa, tetapi Pitot mula-mula memberi informasi kecepatan di satu lokasi. Titik 1 mengikuti aliran, sedangkan titik 2 di mulut Pitot menghentikan fluida setempat. Kita menyebut lokasi fluida berhenti sebagai **titik stagnasi** (titik dengan kecepatan lokal nol).\n\nDengan demikian $v_2=0$. Kedua titik berada pada elevasi yang sama, dan kita abaikan rugi sepanjang lintasan pendek menuju mulut Pitot. Syarat ini membuat Bernoulli sesuai untuk menghubungkan tekanan dan kecepatan.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Geometri dan definisi koefisien harus cocok sebelum beda tekanan dapat diubah menjadi debit.",
            "commonPitfall": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
          },
          "checkpoint": {
            "prompt": "Pitot pada garis tengah pipa memberi kecepatan lokal. Seorang siswa langsung mengalikan kecepatan itu dengan seluruh luas pipa. Untuk profil aliran yang kecepatannya menurun menuju dinding, bagaimana menilai langkah tersebut?",
            "options": [
              {
                "id": "2024-uts2-q3-checkpoint-option-1",
                "label": "Terlalu rendah, karena luas dekat dinding belum dihitung.",
                "feedback": "Seluruh luas sudah dikalikan. Masalahnya adalah kecepatan yang terlalu besar untuk mewakili seluruh luas itu.",
                "misconceptionTag": "concept-2024-03-choice-1"
              },
              {
                "id": "2024-uts2-q3-checkpoint-option-2",
                "label": "Terlalu tinggi, karena debit memerlukan kecepatan rata-rata penampang.",
                "feedback": "Benar. Debit adalah penjumlahan kontribusi kecepatan lokal di seluruh penampang, yang setara dengan luas kali kecepatan rata-rata."
              },
              {
                "id": "2024-uts2-q3-checkpoint-option-3",
                "label": "Tepat, karena kontinuitas membuat kecepatan sama di semua titik penampang.",
                "feedback": "Kontinuitas menyamakan debit antarpenampang dalam aliran tunak, bukan kecepatan setiap titik di satu penampang.",
                "misconceptionTag": "concept-2024-03-choice-3"
              },
              {
                "id": "2024-uts2-q3-checkpoint-option-4",
                "label": "Tidak berpengaruh, karena faktor profil hanya mengubah tekanan statis.",
                "feedback": "Faktor profil menghubungkan kecepatan pusat dengan kecepatan rata-rata, sehingga langsung memengaruhi debit.",
                "misconceptionTag": "concept-2024-03-choice-4"
              }
            ],
            "correctOptionId": "2024-uts2-q3-checkpoint-option-2"
          }
        },
        {
          "id": "2024-uts2-q3-step-2",
          "title": "a · Turunkan beda tekanan dari Bernoulli",
          "content": "Suku $\\tfrac12\\rho_wv^2$ adalah energi gerak per volume fluida. Pada titik stagnasi suku itu nol. Kurangi $P_1$ dari kedua ruas setelah menyamakan elevasi.\n\n$\\rho_w$ menyatakan massa jenis air. Untuk kecepatan tak nol, ruas kanan positif sehingga $P_2>P_1$. Tanda ini nanti menentukan kaki raksa yang lebih rendah.\n\n$$\n\\begin{aligned}P_1+\\tfrac12\\rho_wv_1^2+\\rho_wgz_1&=P_2+\\tfrac12\\rho_w(0)^2+\\rho_wgz_1\\\\P_2-P_1&=\\tfrac12\\rho_wv_1^2\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q3-step-3",
          "title": "b · Susun keseimbangan hidrostatik",
          "content": "Di manometer, tekanan bertambah sebesar $\\rho g\\Delta z$ saat kita turun dan berkurang dengan nilai yang sama saat naik dalam fluida sejenis. Tekanan pada satu bidang mendatar di raksa yang diam harus sama.\n\nSelisih tinggi $h_m$ memberi tambahan kolom raksa pada satu kaki, tetapi juga mengurangi kolom air sebesar tinggi yang sama. Kontribusi bersihnya adalah $\\rho_mgh_m-\\rho_wgh_m$. Inilah asal selisih massa jenis; menggunakan $\\rho_mgh_m$ saja mengabaikan air di atas raksa.\n\n$$\nP_2-P_1=(\\rho_m-\\rho_w)gh_m\n$$"
        },
        {
          "id": "2024-uts2-q3-step-4",
          "title": "b · Selesaikan persamaan untuk kecepatan",
          "content": "Bernoulli dan manometer menyatakan beda tekanan yang sama. Samakan kedua hasil, lalu kalikan kedua ruas dengan $2/\\rho_w$. Langkah ini menyisakan $v_1^2$.\n\nAmbil akar positif karena yang dicari adalah besar kecepatan. Arah aliran sudah kita tetapkan melalui orientasi Pitot.\n\n$$\n\\begin{aligned}\\tfrac12\\rho_wv_1^2&=(\\rho_m-\\rho_w)gh_m\\\\v_1^2&=\\frac{2(\\rho_m-\\rho_w)gh_m}{\\rho_w}\\\\v_1&=\\sqrt{\\frac{2(\\rho_m-\\rho_w)gh_m}{\\rho_w}}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q3-step-5",
          "title": "c · Masukkan data dalam satuan SI",
          "content": "Tinggi 5 mm menjadi 0,005 m. Diameter 100 mm menjadi 0,100 m. Pakai $g=10\\ \\mathrm{m/s^2}$ dan viskositas $8{,}62\\times10^{-3}\\ \\mathrm{Pa\\,s}$ sebagaimana tertulis pada soal.\n\nSelisih massa jenisnya 12600 kg/m³. Setelah menghitung beda tekanan 630 Pa, masukkan nilai itu ke hubungan Pitot.\n\n$$\n\\begin{aligned}\\Delta P&=(13600-1000)(10)(0.005)=630\\ \\mathrm{Pa}\\\\v_1&=\\sqrt{\\frac{2(630)}{1000}}=\\sqrt{1.26}=1.122497\\ \\mathrm{m/s}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q3-step-6",
          "title": "c dan d · Bedakan kecepatan pusat dan rata-rata",
          "content": "Ujung Pitot pada gambar berada di garis tengah, sehingga nilai tadi adalah $v_{\\max}$. Debit $Q=A\\bar v$ memakai $\\bar v$, yaitu kecepatan rata-rata seluruh penampang. Di dekat dinding, aliran lebih lambat daripada di pusat.\n\nSoal memberi dua faktor profil: 2 untuk laminar dan 1,23 untuk turbulen. Kita belum boleh memilih tanpa cek Reynolds. Gunakan tiap dugaan, lalu uji apakah jenis alirannya mendukung dugaan itu.\n\n$$\nv_{\\max}=2\\bar v\\quad(\\mathrm{laminar}),\\qquad v_{\\max}=1.23\\bar v\\quad(\\mathrm{turbulent})\n$$"
        },
        {
          "id": "2024-uts2-q3-step-7",
          "title": "d · Uji dugaan laminar",
          "content": "Bagi kecepatan pusat dengan 2 untuk mencoba profil laminar. Reynolds menggunakan kecepatan rata-rata pipa, bukan kecepatan pusat.\n\nHasil sekitar 6511 sudah melewati rentang laminar pipa, umumnya di bawah 2300. Hasil cek tidak mendukung dugaan awal, sehingga faktor 2 tidak konsisten untuk data ini.\n\n$$\n\\bar v_{\\mathrm{trial}}=\\frac{1.122497}{2}=0.561249\\ \\mathrm{m/s},\\qquad Re_{\\mathrm{trial}}=\\frac{1000(0.561249)(0.100)}{0.00862}\\approx6511\n$$"
        },
        {
          "id": "2024-uts2-q3-step-8",
          "title": "d · Uji profil turbulen yang diberikan",
          "content": "Sekarang bagi kecepatan pusat dengan 1,23. Faktor ini berasal dari lampiran soal. Ia bukan konstanta yang berlaku untuk semua profil turbulen.\n\nReynolds sekitar 10587 berada di atas rentang transisi pipa, sehingga mendukung model turbulen. Gunakan kecepatan rata-rata ini untuk menghitung debit.\n\n$$\n\\bar v=\\frac{1.122497}{1.23}=0.912599\\ \\mathrm{m/s},\\qquad Re=\\frac{1000(0.912599)(0.100)}{0.00862}\\approx1.059\\times10^4\n$$"
        },
        {
          "id": "2024-uts2-q3-step-9",
          "title": "c · Hitung luas, lalu debit seluruh pipa",
          "content": "Rumus luas lingkaran dapat ditulis $A=\\pi D^2/4$ karena jari-jari adalah $D/2$. Dengan diameter dalam 0,100 m, luasnya 0,00785398 m².\n\nKalikan luas dengan kecepatan rata-rata. Satuan m² × m/s menjadi m³/s. Hasil sekitar 7,17 L/s lebih kecil daripada perkiraan yang memakai kecepatan pusat untuk seluruh penampang.\n\n$$\nQ=\\frac{\\pi(0.100)^2}{4}(0.912599)=0.00716754\\ \\mathrm{m^3/s}\\approx7.17\\ \\mathrm{L/s}\n$$"
        }
      ],
      "finalAnswer": "Debit sekitar 0,00717 m³/s dan alirannya turbulen, setelah mengubah kecepatan pusat menjadi kecepatan rata-rata.\n\n$$\n\\boxed{\\Delta P=630\\ \\mathrm{Pa},\\quad Q\\approx7.168\\times10^{-3}\\ \\mathrm{m^3/s},\\quad Re\\approx10587}\n$$",
      "takeaway": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
    },
    {
      "id": "2024-uas-q4",
      "kind": "problem",
      "slug": "2024-uas-q4",
      "title": "Orifis dan luas vena kontrakta",
      "source": "UAS 2024 · Soal 4",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
        "file": "2024-uas.pdf",
        "pages": [
          2
        ],
        "original": "4. [25%] Flow Measurement: Orifice Plate Flowmeter\nAn orifice plate flowmeter is situated in a horizontal pipe with an internal diameter of 90 mm in which water flows. The diameter of the sharp-edged orifice is 30 mm. The discharge coefficient (\\(C_d\\)) for the flowmeter is 0.65, and the coefficient of contraction is 0.67. The static pressure difference across the orifice is 0.3 bar. The water density is 1000 kg/m³.\n(a) [10%] Using Bernoulli’s equation and the continuity equation between positions before and after the orifice plate, derive the equation for the water velocity at the position before the orifice plate.\n(b) [5%] Calculate the cross-sectional areas of the pipe and vena contracta.\n(c) [5%] Calculate the ideal (theoretical) volumetric flow rate of the water in the pipe.\n(d) [5%] Calculate the actual (real) mass flow rate of the water in the pipe.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              9,
              10
            ]
          }
        ]
      },
      "assumptions": [
        "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        "Naskah tidak menetapkan luas acuan Cd. Hasil utama memakai A2 = Ac pada rumus materi; alternatif dengan definisi standar berbasis luas lubang juga ditampilkan. Ini bukan dua jawaban untuk satu definisi koefisien yang sama.",
        "Aliran dianggap tunak, tak termampatkan, dengan penampang efektif sesuai definisi beda tekanan."
      ],
      "exam": {
        "term": "UAS",
        "year": 2024,
        "number": 4
      },
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "tags": [
        "Pengukuran aliran"
      ],
      "statement": "Air mengalir dalam pipa horizontal dengan diameter dalam 90 mm. Diameter lubang orifis tajam 30 mm. Koefisien debit $C_d=0{,}65$ dan koefisien kontraksi $C_c=0{,}67$. Beda tekanan statis 0,3 bar dan massa jenis 1000 kg/m³. (a) Turunkan kecepatan sebelum pelat dengan Bernoulli dan kontinuitas. (b) Hitung luas pipa serta vena kontrakta. (c) Hitung debit volume ideal. (d) Hitung debit massa nyata. Bedakan luas lubang dari luas aliran tersempit setelah pelat.",
      "simulation": {
        "id": "2024-uas-q4-visual",
        "type": "ipe-orifice",
        "title": "Aliran melalui orifice",
        "caption": "Luas lubang dan vena berbeda. Hasil utama memakai Cd dengan acuan vena yang dinyatakan.",
        "params": [
          {
            "key": "pressure",
            "label": "Beda tekanan Δp",
            "min": 0,
            "max": 60,
            "step": 0.3,
            "defaultValue": 30,
            "unit": "kPa"
          },
          {
            "key": "diameterRatio",
            "label": "d₀ / D",
            "min": 0.15,
            "max": 0.85,
            "step": 0.01,
            "defaultValue": 0.3333333333333333
          },
          {
            "key": "Cd",
            "label": "Koefisien debit Cd",
            "min": 0,
            "max": 1,
            "step": 0.001,
            "defaultValue": 0.65
          }
        ],
        "data": {
          "D": 0.09,
          "d": 0.03,
          "Cd": 0.65,
          "Cc": 0.67,
          "rho": 1000,
          "convention": "vena",
          "dp": 30000,
          "visualKind": "orifice"
        }
      },
      "steps": [
        {
          "id": "2024-uas-q4-step-1",
          "title": "a · Tentukan penampang dan besaran aliran",
          "content": "Penampang 1 berada di pipa sebelum pelat, dengan luas $A_1$ dan kecepatan rata-rata $v_1$. Penampang 2 berada pada aliran sempit, dengan luas $A_2$ dan kecepatan $v_2$. Kita mencari hubungan kecepatan hulu dengan beda tekanan.\n\nUntuk aliran tunak tak termampatkan, volume yang melewati kedua penampang tiap detik sama. Hubungan $Q=Av$ berarti perkalian luas dan kecepatan harus sama.\n\n$$\nA_1v_1=A_2v_2\\quad\\Longrightarrow\\quad v_2=\\frac{A_1}{A_2}v_1\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Geometri dan definisi koefisien harus cocok sebelum beda tekanan dapat diubah menjadi debit.",
            "commonPitfall": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
          },
          "checkpoint": {
            "prompt": "Sebuah tabel Cd sudah dikalibrasi terhadap luas lubang pelat orifis dan mencakup kontraksi jet. Seseorang memakai Cd itu, lalu mengganti luas lubang dengan Cc kali luas lubang untuk “menambah ketelitian”. Apa masalah utamanya?",
            "options": [
              {
                "id": "2024-uas-q4-checkpoint-option-1",
                "label": "Cc mempunyai satuan luas, sehingga tidak boleh dipakai dalam rumus debit.",
                "feedback": "Cc adalah rasio dua luas, sehingga tidak bersatuan. Masalahnya bukan satuan Cc, melainkan pencampuran definisi.",
                "misconceptionTag": "concept-2024-05-choice-1"
              },
              {
                "id": "2024-uas-q4-checkpoint-option-2",
                "label": "Koreksi tambahan selalu membuat hasil lebih akurat jika debitnya menjadi lebih kecil.",
                "feedback": "Nilai yang lebih kecil belum tentu lebih dekat ke kenyataan. Koreksi harus mengikuti model dan kalibrasinya.",
                "misconceptionTag": "concept-2024-05-choice-2"
              },
              {
                "id": "2024-uas-q4-checkpoint-option-3",
                "label": "Kontraksi dapat dihitung dua kali karena definisi luas dan koefisien tidak lagi sesuai.",
                "feedback": "Benar. Periksa definisi luas acuan sebelum menggabungkan Cd dan Cc."
              },
              {
                "id": "2024-uas-q4-checkpoint-option-4",
                "label": "Cd seharusnya dikalikan dengan diameter, bukan debit.",
                "feedback": "Cd didefinisikan sebagai rasio debit nyata terhadap debit ideal. Ia tidak mengubah diameter secara langsung.",
                "misconceptionTag": "concept-2024-05-choice-4"
              }
            ],
            "correctOptionId": "2024-uas-q4-checkpoint-option-3"
          }
        },
        {
          "id": "2024-uas-q4-step-2",
          "title": "a · Gunakan Bernoulli pada pipa horizontal",
          "content": "Pipa horizontal memberi elevasi yang sama, sehingga suku $\\rho gz$ saling menghapus. Untuk debit ideal, kita belum memasukkan rugi aliran. Selisih tekanan berubah menjadi selisih energi gerak per volume.\n\nDefinisikan $\\Delta P=P_1-P_2>0$. Pada penampang sempit, kecepatan lebih besar dan tekanan statis lebih rendah.\n\n$$\nP_1+\\tfrac12\\rho v_1^2=P_2+\\tfrac12\\rho v_2^2\\quad\\Longrightarrow\\quad\\Delta P=\\tfrac12\\rho(v_2^2-v_1^2)\n$$"
        },
        {
          "id": "2024-uas-q4-step-3",
          "title": "a · Masukkan kontinuitas dan isolasi v₁",
          "content": "Ganti $v_2$ dengan $(A_1/A_2)v_1$. Ketika dikuadratkan, seluruh perbandingan luas ikut dikuadratkan. Keluarkan $v_1^2$ sebagai faktor bersama.\n\nKalikan kedua ruas dengan 2, lalu bagi dengan $\\rho[(A_1/A_2)^2-1]$. Akar positif memberi besar kecepatan ideal sebelum pelat.\n\n$$\n\\begin{aligned}\\Delta P&=\\tfrac12\\rho\\left[\\left(\\frac{A_1}{A_2}\\right)^2-1\\right]v_1^2\\\\v_{1,i}&=\\sqrt{\\frac{2\\Delta P}{\\rho[(A_1/A_2)^2-1]}}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uas-q4-step-4",
          "title": "b · Pisahkan lubang pelat dari vena kontrakta",
          "content": "Luas lubang pelat adalah $A_o$. Aliran masih dapat menyempit setelah melewati tepi tajam. **Vena kontrakta** (penampang aliran paling sempit setelah pelat) memiliki luas $A_c$. Luas lubang dan luas vena kontrakta berbeda.\n\nKoefisien kontraksi adalah $C_c=A_c/A_o=0{,}67$. Koefisien tersebut mengalikan luas, bukan diameter. Luas sebanding dengan diameter kuadrat, sehingga diameter vena adalah $\\sqrt{C_c}$ kali diameter lubang.\n\n$$\nA_c=C_cA_o,\\qquad d_c=d_o\\sqrt{C_c}\n$$"
        },
        {
          "id": "2024-uas-q4-step-5",
          "title": "b · Hitung luas dengan diameter dalam meter",
          "content": "Ubah 90 mm menjadi 0,090 m dan 30 mm menjadi 0,030 m sebelum menghitung luas. Rumus $\\pi D^2/4$ berasal dari $\\pi(D/2)^2$.\n\nHitung luas pipa dan lubang, lalu kalikan luas lubang dengan 0,67. Urutannya harus memenuhi $A_c<A_o<A_1$.\n\n$$\n\\begin{aligned}A_1&=\\frac\\pi4(0.09)^2=6.361725\\times10^{-3}\\ \\mathrm{m^2}\\\\A_o&=\\frac\\pi4(0.03)^2=7.068583\\times10^{-4}\\ \\mathrm{m^2}\\\\A_c&=C_cA_o=4.735951\\times10^{-4}\\ \\mathrm{m^2}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uas-q4-step-6",
          "title": "c · Tetapkan acuan yang konsisten dengan materi",
          "content": "Urutan soal meminta luas vena sebelum menghitung debit. Mengikuti rute itu, kita memakai $A_2=A_c$ pada rumus penampang. Beda tekanan 0,3 bar menjadi $0{,}3\\times10^5=30000$ Pa.\n\nUntuk memperoleh debit, kalikan rumus $v_{1,i}$ dengan $A_1$. Membagi bagian dalam akar dengan $A_1^2/A_2^2$ memberi bentuk dengan $A_2$ di luar akar.\n\n$$\nQ_i=A_1v_{1,i}=A_2\\sqrt{\\frac{2\\Delta P}{\\rho[1-(A_2/A_1)^2]}}\n$$"
        },
        {
          "id": "2024-uas-q4-step-7",
          "title": "c · Masukkan luas vena ke debit ideal",
          "content": "Gunakan $A_2=0{,}0004735951$ m², $A_1=0{,}006361725$ m², $\\rho=1000$ kg/m³, dan $\\Delta P=30000$ Pa. Faktor penyebut mempertahankan pengaruh kecepatan hulu; kita tidak menganggap $v_1=0$.\n\nDebit ideal berbasis vena adalah sekitar 0,00367866 m³/s. Membaginya dengan luas pipa memberi kecepatan hulu ideal 0,578249 m/s.\n\n$$\nQ_{i,c}=0.0004735951\\sqrt{\\frac{2(30000)}{1000[1-(0.0004735951/0.006361725)^2]}}=0.003678659\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2024-uas-q4-step-8",
          "title": "d · Terapkan Cd pada acuan yang sama",
          "content": "Jika $C_d=0{,}65$ pada soal mengacu pada debit ideal berbasis vena, debit nyata adalah 65% dari debit ideal tersebut. Pengali ini tidak mengubah satuan.\n\nKecocokan luas acuan adalah syarat definisi koefisien, bukan sekadar pilihan hitung. Hasil utama berikut berlaku dengan acuan vena yang sama untuk luas dan $C_d$.\n\n$$\nQ_c=C_dQ_{i,c}=0.65(0.003678659)=0.002391129\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2024-uas-q4-step-9",
          "title": "d · Ubah debit volume menjadi debit massa",
          "content": "Setiap meter kubik air mempunyai massa 1000 kg menurut data soal. Kalikan volume per detik dengan massa per volume untuk mendapat massa per detik.\n\nSatuan m³ saling menghapus, menyisakan kg/s. Hasil 2,39113 kg/s memakai koefisien yang mengacu pada vena.\n\n$$\n\\dot m_c=\\rho Q_c=1000(0.002391129)=2.391129\\ \\mathrm{kg/s}\n$$"
        },
        {
          "id": "2024-uas-q4-step-10",
          "title": "Jangan mencampur dua definisi koefisien debit",
          "content": "Pada definisi orifice meter yang lazim, $C_d$ mengacu pada luas lubang $A_o$ dan sudah merangkum kontraksi. Memakai koefisien itu lalu mengganti $A_o$ dengan $C_cA_o$ dapat menghitung kontraksi dua kali.\n\nJika 0,65 pada naskah memakai definisi lubang, debit idealnya 0,00550942 m³/s dan debit massa nyatanya 3,58112 kg/s. Naskah tidak menetapkan acuan $C_d$; karena itu, kita nyatakan kedua interpretasi secara terpisah. Nilainya tidak saling bertentangan setelah definisinya dijelaskan.\n\n$$\nQ_{\\mathrm{ideal},o}=A_o\\sqrt{\\frac{2\\Delta P}{\\rho[1-(A_o/A_1)^2]}}=0.005509416\\ \\mathrm{m^3/s}\n$$\n\n> Pembahasan utama mengikuti rute A2 = luas vena pada soal. Nilai Cd untuk lubang dan untuk vena tidak dapat dianggap sama tanpa definisi atau kalibrasi."
        }
      ],
      "finalAnswer": "Luas pipa 0,00636173 m² dan luas vena 0,000473595 m². Dengan Cd yang mengacu pada debit ideal di vena, Qideal ≈ 0,00367866 m³/s dan debit massa ≈ 2,39113 kg/s. Jika Cd mengacu ke lubang, debit massa ≈ 3,58112 kg/s.\n\n$$\n\\boxed{\\begin{aligned}A_1&=6.36173\\times10^{-3}\\ \\mathrm{m^2}\\\\A_c&=4.73595\\times10^{-4}\\ \\mathrm{m^2}\\\\Q_{\\mathrm{ideal},c}&=3.67866\\times10^{-3}\\ \\mathrm{m^3/s}\\\\\\dot m_c&=2.39113\\ \\mathrm{kg/s}\\quad(C_d:\\ A_2=A_c)\\end{aligned}}\n$$",
      "takeaway": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
    },
    {
      "id": "2023-uts2-q1",
      "kind": "problem",
      "slug": "2023-uts2-q1",
      "title": "Debit orifice dan pilihan sensor",
      "source": "UTS 2 2023 · Soal 1",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7/view",
        "file": "2023-uts2.pdf",
        "pages": [
          1
        ],
        "original": "1. Flowmeter Sensors\nAn orifice-type flowmeter measures the flow of water with density of \\(\\rho_w=1000\\,\\mathrm{kg/m^3}\\) and the absolute viscosity of water at 25 °C is \\(9.53\\times10^{-3}\\,\\mathrm{Ns/m^2}\\). The flowmeter utilizes a tube filled up by mercury with density of \\(\\rho_m=13600\\,\\mathrm{kg/m^3}\\). Pipe diameter and vena contracta diameter are \\(D=800\\,\\mathrm{mm}\\) and \\(d=160\\,\\mathrm{mm}\\), respectively. During the measurement, mercury levels indicate discrepancy as \\(h=45\\,\\mathrm{cm}\\).\na. [15%] Calculate flowrate (q) of the water in m³/s.\nb. [10%] What type of sensor is suitable for measuring the flow rate of a conductive fluid such as H₂SO₄? Explain.\nc. [10%] Which type of sensor can be used to measure mass flow rate in kilograms per second? Explain.\nTable 1. Coefficient of discharge Cd for orifice plate: Reynolds number columns 10⁴, 10⁵, 10⁶, 10⁷. Rows d/D: 0.2 → 0.600, 0.595, 0.594, 0.594; 0.4 → 0.610, 0.603, 0.598, 0.598; 0.5 → 0.620, 0.608, 0.603, 0.603; 0.6 → 0.630, 0.610, 0.608, 0.608; 0.7 → 0.640, 0.614, 0.609, 0.609.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              7,
              9,
              10,
              12
            ]
          }
        ]
      },
      "assumptions": [
        "Tap sama tinggi, aliran tunak tak termampatkan, g=9.81 m/s². Pakai viskositas 9.53×10⁻³ Pa·s persis seperti soal; jangan menggantinya dengan nilai air dari tabel lain.",
        "Soal menyebut d sebagai diameter vena contracta tetapi juga memakai tabel Cd orifice. Pembahasan mengikuti definisi dan model dalam soal."
      ],
      "exam": {
        "term": "UTS 2",
        "year": 2023,
        "number": 1
      },
      "difficulty": "menengah",
      "estimatedMinutes": 22,
      "tags": [
        "Pengukuran aliran"
      ],
      "statement": "Orifice mengukur aliran air dengan $\\rho_w=1000\\,\\mathrm{kg/m^3}$, $\\mu=9.53\\times10^{-3}\\,\\mathrm{Pa\\,s}$ pada 25 °C. Manometer berisi raksa dengan $\\rho_m=13600\\,\\mathrm{kg/m^3}$. Diameter pipa $D=800\\,\\mathrm{mm}$, diameter vena contracta yang dipakai soal $d=160\\,\\mathrm{mm}$, dan beda tinggi raksa $h=45\\,\\mathrm{cm}$.\n(a) Hitung debit volume. (b) Pilih sensor aliran untuk cairan konduktif seperti H₂SO₄ dan jelaskan alasannya. (c) Pilih sensor untuk debit massa dalam kg/s dan jelaskan prinsipnya. Untuk $d/D=0.2$, tabel memberi $C_d=0.600,0.595,0.594,0.594$ pada $Re=10^4,10^5,10^6,10^7$.",
      "given": [
        "Diameter pipa: 800 mm",
        "Diameter kecil: 160 mm",
        "Beda tinggi raksa: 45 cm"
      ],
      "simulation": {
        "id": "2023-uts2-q1-visual",
        "type": "ipe-orifice",
        "title": "Aliran melalui orifice",
        "caption": "Lihat hubungan beda tinggi raksa, beda tekanan, dan debit.",
        "params": [
          {
            "key": "pressure",
            "label": "Beda tekanan Δp",
            "min": 0,
            "max": 111.24539999999999,
            "step": 0.5562269999999999,
            "defaultValue": 55.622699999999995,
            "unit": "kPa"
          },
          {
            "key": "diameterRatio",
            "label": "d / D",
            "min": 0.15,
            "max": 0.85,
            "step": 0.01,
            "defaultValue": 0.19999999999999998
          },
          {
            "key": "Cd",
            "label": "Koefisien debit Cd",
            "min": 0,
            "max": 1,
            "step": 0.001,
            "defaultValue": 0.5983674312
          }
        ],
        "data": {
          "D": 0.8,
          "d": 0.16,
          "rho": 1000,
          "rhoManometer": 13600,
          "h": 0.45,
          "mu": 0.00953,
          "Cd": 0.5983674312,
          "dp": 55622.7,
          "visualKind": "orifice"
        }
      },
      "steps": [
        {
          "id": "2023-uts2-q1-step-1",
          "title": "1a · Tentukan besaran yang dicari",
          "content": "Kita mencari **debit volume** (volume air yang melewati pipa tiap detik), Q. Satuan yang diminta adalah m³/s. Kita perlu mengubah semua panjang menjadi meter sebelum menghitung luas.\n\nDiameter pipa menentukan luas aliran di hulu. Diameter kecil menentukan luas aliran di bagian sempit. Beda tinggi raksa memberi beda tekanan, bukan kecepatan secara langsung.\n\n$$\nD=\\frac{800}{1000}=0.800\\ \\mathrm m,\\quad d=0.160\\ \\mathrm m,\\quad h=\\frac{45}{100}=0.450\\ \\mathrm m\n$$",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Geometri dan definisi koefisien harus cocok sebelum beda tekanan dapat diubah menjadi debit.",
            "commonPitfall": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
          }
        },
        {
          "id": "2023-uts2-q1-step-2",
          "title": "Ubah beda tinggi raksa menjadi tekanan",
          "content": "**Massa jenis** (massa per volume) memakai simbol $\\rho$, dibaca rho. Kedua kaki manometer berisi air di atas raksa. Pengaruh kolom air mengurangi pengaruh kolom raksa, sehingga kita memakai $\\rho_m-\\rho_w$.\n\nKedua tap berada pada ketinggian yang sama. Dengan $g=9.81\\ \\mathrm{m/s^2}$, selisih tinggi 0.450 m memberi tekanan hulu yang lebih besar. Sisi bertekanan lebih besar menekan raksa ke bawah.\n\n$$\n\\Delta p=(\\rho_m-\\rho_w)gh=(13600-1000)(9.81)(0.450)=55622.7\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2023-uts2-q1-step-3",
          "title": "Gunakan debit yang sama pada dua penampang",
          "content": "Pada aliran tunak, air tidak terus menumpuk di antara dua penampang. Massa jenis tetap membuat debit masuk sama dengan debit keluar. **Persamaan kontinuitas** (hubungan kekekalan aliran) menyatakan kesamaan tersebut.\n\nLuas lingkaran adalah $A=\\pi d^2/4$. Hubungan $Q=Av$ memberi kecepatan rata-rata $v=Q/A$. Luas yang lebih kecil memerlukan kecepatan lebih tinggi untuk melewatkan debit yang sama.\n\n$$\nA_1=\\frac{\\pi(0.800)^2}{4}=0.502655\\ \\mathrm{m^2},\\quad A_2=\\frac{\\pi(0.160)^2}{4}=0.0201062\\ \\mathrm{m^2},\\quad Q=A_1v_1=A_2v_2\n$$"
        },
        {
          "id": "2023-uts2-q1-step-4",
          "title": "Hubungkan kenaikan kecepatan dengan penurunan tekanan",
          "content": "Bernoulli membandingkan energi tekanan, energi gerak, dan energi ketinggian fluida. Kita mulai dari model ideal tanpa rugi aliran; pipa mendatar membuat kedua suku ketinggian saling menghapus.\n\nKita kurangi tekanan hilir pada kedua ruas untuk membentuk selisih tekanan. Bagian sempit memiliki kecepatan lebih tinggi. Pada model ideal ini, kenaikan kecepatan tersebut membutuhkan tekanan hulu yang lebih tinggi.\n\n$$\np_1+\\frac12\\rho_wv_1^2=p_2+\\frac12\\rho_wv_2^2\\quad\\Rightarrow\\quad \\Delta p=\\frac12\\rho_w(v_2^2-v_1^2)\n$$"
        },
        {
          "id": "2023-uts2-q1-step-5",
          "title": "Turunkan rumus debit, lalu beri koreksi aliran nyata",
          "content": "Kita masukkan $v_1=Q/A_1$ dan $v_2=Q/A_2$. Kedua suku memuat $Q^2$, sehingga kita dapat mengeluarkannya sebagai faktor. Setelah membagi dengan faktor luas dan massa jenis, ambil akar positif untuk besar debit.\n\nKoefisien debit $C_d$ mengoreksi model ideal terhadap aliran nyata. Rasio luas adalah $(d/D)^2$; saat rasio luas dikuadratkan, muncul $(d/D)^4$.\n\n$$\n\\begin{aligned}\\Delta p&=\\frac{\\rho_wQ_{\\rm ideal}^2}{2A_2^2}\\left[1-\\left(\\frac{A_2}{A_1}\\right)^2\\right]\\\\Q&=C_dQ_{\\rm ideal}=C_dA_2\\sqrt{\\frac{2\\Delta p}{\\rho_w[1-(d/D)^4]}}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts2-q1-step-6",
          "title": "Hitung bagian rumus yang sudah diketahui",
          "content": "Rasio diameter $\\beta=d/D=0.160/0.800=0.2$. Kita dapat menghitung debit ideal lebih dulu, meskipun $C_d$ yang sesuai belum dipilih.\n\nHasil 0.2122358 m³/s masih perlu dikalikan $C_d$. Tabel pada soal menunjukkan nilai sekitar 0.60, sehingga debit nyata diperkirakan sekitar 60% dari hasil ideal dalam model ini.\n\n$$\nQ_{\\rm ideal}=0.0201062\\sqrt{\\frac{2(55622.7)}{1000(1-0.2^4)}}=0.2122358\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2023-uts2-q1-step-7",
          "title": "Coba Cd, lalu periksa bilangan Reynolds",
          "content": "Bilangan Reynolds $Re$ membandingkan pengaruh gerak fluida dengan pengaruh kekentalan. Tabel memerlukan $Re$, tetapi perhitungan $Re$ memerlukan kecepatan yang belum kita ketahui. Kita mulai dengan tebakan tabel, lalu memperbaruinya.\n\nKita ambil $C_d=0.600$ dari baris $\\beta=0.2$. Kita hitung $Q$, lalu gunakan $v_1=Q/A_1$ pada rumus Reynolds. Diameter yang dipakai di sini adalah diameter pipa $D$.\n\n$$\nQ^{(0)}=0.600(0.2122358)=0.127341\\ \\mathrm{m^3/s},\\qquad Re=\\frac{\\rho_wv_1D}{\\mu}=\\frac{4\\rho_wQ}{\\pi\\mu D}\\approx2.13\\times10^4\n$$"
        },
        {
          "id": "2023-uts2-q1-step-8",
          "title": "Perbarui Cd dari dua kolom yang mengapit Re",
          "content": "Nilai Reynolds berada antara $10^4$ dan $10^5$. Pada baris $\\beta=0.2$, kedua nilai $C_d$ adalah 0.600 dan 0.595. Kita pilih interpolasi pada skala $\\log_{10}Re$, karena kolom naik per kelipatan sepuluh.\n\nKita masukkan Reynolds hasil tebakan, hitung $C_d$ baru, lalu ulangi perhitungan debit dan Reynolds. Hasilnya stabil di sekitar $C_d=0.59837$ dan $Re=21209$.\n\n$$\nC_d=0.600+\\frac{\\log_{10}Re-4}{5-4}(0.595-0.600)\\quad\\Rightarrow\\quad C_d\\approx0.59837\n$$\n\n> Soal tidak menetapkan cara interpolasi. Digit akhir dapat sedikit berubah; tiga angka penting tetap sama."
        },
        {
          "id": "2023-uts2-q1-step-9",
          "title": "Nyatakan debit dan periksa satuannya",
          "content": "Kita kalikan debit ideal dengan koefisien akhir. Di dalam akar, tekanan dibagi massa jenis memberi satuan m²/s². Akar itu berupa kecepatan; setelah dikali luas, hasilnya m³/s.\n\nHasilnya lebih kecil dari debit ideal, sesuai koefisien yang kurang dari satu. Hubungan 1 m³ = 1000 L memberi debit sekitar 127 liter tiap detik.\n\n$$\nQ=0.59837(0.2122358)\\approx\\boxed{0.1270\\ \\mathrm{m^3/s}=127.0\\ \\mathrm{L/s}}\n$$"
        },
        {
          "id": "2023-uts2-q1-step-10",
          "title": "1b · Pilih sensor berdasarkan sifat cairan",
          "content": "Cairan konduktif dapat membawa muatan listrik. Saat cairan itu melintasi medan magnet, dua elektroda membaca tegangan yang terkait dengan kecepatan alirannya. Prinsip ini mendukung pilihan flowmeter elektromagnetik.\n\nPada bentuk sederhana, $e=BLv$: $B$ adalah kuat medan magnet, $L$ jarak efektif elektroda, dan $v$ kecepatan rata-rata. Setelah memperoleh $v$, alat menghitung $Q=Av$.\n\nUntuk H₂SO₄, pemilihan alat juga perlu menyesuaikan bahan elektroda dan pelapis dengan suhu serta konsentrasi asam. Kesesuaian prinsip ukur dan ketahanan bahan merupakan dua syarat yang berbeda.\n\n$$\ne=BLv,\\qquad Q=Av\n$$"
        },
        {
          "id": "2023-uts2-q1-step-11",
          "title": "1c · Bedakan debit massa dari debit volume",
          "content": "Debit massa $\\dot m$, dibaca m titik, menyatakan kilogram yang lewat tiap detik. Jika alat hanya memberi debit volume, kita perlu massa jenis untuk mengubahnya menjadi $\\dot m=\\rho Q$.\n\nFlowmeter Coriolis memberi pengukuran debit massa langsung. Alat menggetarkan tabung; fluida yang bergerak di dalamnya mengubah gerak dan beda fase tabung pada dua titik. Kalibrasi menghubungkan perubahan fase itu dengan kg/s.\n\nSoal meminta sensor dengan keluaran kg/s. Coriolis memenuhi tujuan tersebut tanpa memulai dari debit volume dan asumsi massa jenis tetap.\n\n$$\n\\dot m=\\rho Q\\quad\\text{for conversion from volume flow}\n$$"
        }
      ],
      "finalAnswer": "Debit air sekitar 0.1270 m³/s. Gunakan flowmeter elektromagnetik untuk cairan konduktif dan Coriolis untuk debit massa langsung.\n\n$$\n\\boxed{Q\\approx0.1270\\ \\mathrm{m^3/s}}\n$$",
      "takeaway": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
    },
    {
      "id": "2023-uas-q1",
      "kind": "problem",
      "slug": "2023-uas-q1",
      "title": "Venturi dan manometer raksa",
      "source": "UAS 2023 · Soal 1",
      "sourceDetails": {
        "url": "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
        "file": "2023-uas.pdf",
        "pages": [
          1
        ],
        "original": "1. Flowmeter Sensor\nVenturi-type flowmeter measurement is used to measure fluid flow inside a pipe with an inner diameter of 80 mm at the larger section (A) and an inner diameter of 20 mm at the smaller section (B). A U-tube manometer containing mercury is connected to sections A dan B. When measuring the flow of fluid with a mass density of 950 kg/m³, the upper surfaces of the mercury in the U-tube have a differential height of 50 mm. The discharge coefficient (Cd) of the venturi-meter is 0.97, and the mass density of mercury is 13600 kg/m³.\na. [5%] Sketch the venturi-meter sensor, including the U-tube manometer.\nb. [7%] Use the Bernoulli equation to derive the flow at section A.\nc. [8%] Calculate the flow of fluid in m³/s.\nd. [10%] If we replace the venturi type with the nozzle type (with the same inner diameter), explain what will happen to the mercury height and discharge coefficient. Explain why this happens.",
        "originalLanguage": "en",
        "references": [
          {
            "url": "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
            "title": "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
            "pages": [
              8,
              9,
              10
            ]
          }
        ]
      },
      "assumptions": [
        "Aliran tunak, tak termampatkan, tap sama tinggi, g=9.81 m/s². Perbandingan tinggi setelah penggantian memakai debit tetap jika disebut."
      ],
      "exam": {
        "term": "UAS",
        "year": 2023,
        "number": 1
      },
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "tags": [
        "Pengukuran aliran"
      ],
      "statement": "Venturi memiliki diameter $D_A=80\\,\\mathrm{mm}$ dan diameter leher $D_B=20\\,\\mathrm{mm}$. Fluida bermassa jenis $950\\,\\mathrm{kg/m^3}$. Manometer U berisi raksa $13600\\,\\mathrm{kg/m^3}$ menunjukkan beda tinggi 50 mm. Koefisien debit $C_d=0.97$. (a) Gambar Venturi dan manometernya. (b) Turunkan kecepatan/debit pada A dari Bernoulli. (c) Hitung debit dalam m³/s. (d) Jika Venturi diganti nozzle dengan diameter sama, jelaskan perubahan tinggi raksa dan $C_d$.",
      "simulation": {
        "id": "2023-uas-q1-visual",
        "type": "ipe-venturi",
        "title": "Aliran melalui venturi",
        "caption": "Penampang leher mempercepat aliran dan menurunkan tekanan.",
        "params": [
          {
            "key": "pressure",
            "label": "Beda tekanan Δp",
            "min": 0,
            "max": 12.40965,
            "step": 0.06204825,
            "defaultValue": 6.204825,
            "unit": "kPa"
          },
          {
            "key": "diameterRatio",
            "label": "d / D",
            "min": 0.15,
            "max": 0.85,
            "step": 0.01,
            "defaultValue": 0.25
          },
          {
            "key": "Cd",
            "label": "Koefisien debit Cd",
            "min": 0,
            "max": 1,
            "step": 0.001,
            "defaultValue": 0.97
          }
        ],
        "data": {
          "D": 0.08,
          "d": 0.02,
          "rho": 950,
          "rhoManometer": 13600,
          "h": 0.05,
          "Cd": 0.97,
          "dp": 6204.825,
          "visualKind": "venturi"
        }
      },
      "steps": [
        {
          "id": "2023-uas-q1-step-1",
          "title": "1a · Susun gambar Venturi dan dua tap tekanan",
          "content": "Gambar aliran dari penampang besar A menuju penyempitan halus, leher B, lalu pelebaran halus atau diffuser. Diameter A adalah 80 mm dan diameter leher B adalah 20 mm.\n\nHubungkan tap tekanan A dan B ke dua kaki manometer U berisi raksa. Fluida proses mengisi ruang di atas raksa. Tandai h sebagai selisih vertikal dua permukaan raksa, bukan seluruh panjang kolom.\n\nUntuk aliran dari A ke B pada pipa mendatar, tekanan A lebih besar. Raksa pada kaki yang terhubung ke A turun, sehingga permukaan kaki B lebih tinggi.",
          "hint": "Mulai dari besaran yang diminta. Periksa data dan kondisi yang membatasi model.",
          "rationale": {
            "whyThisMethod": "Geometri dan definisi koefisien harus cocok sebelum beda tekanan dapat diubah menjadi debit.",
            "commonPitfall": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
          },
          "checkpoint": {
            "prompt": "Sebuah Venturi diganti nozzle dengan diameter pipa dan leher yang sama. Untuk kondisi ini, Cd nozzle diketahui lebih rendah. Pompa menjaga debit tetap dan manometer memakai fluida yang sama. Apa yang terjadi pada selisih tinggi manometer?",
            "options": [
              {
                "id": "2023-uas-q1-checkpoint-option-1",
                "label": "Turun, karena Cd yang lebih kecil selalu berarti beda tekanan lebih kecil.",
                "feedback": "Kesimpulan itu mengabaikan syarat debit tetap. Cd yang lebih kecil perlu diimbangi beda tekanan yang lebih besar.",
                "misconceptionTag": "concept-2023-04-choice-1"
              },
              {
                "id": "2023-uas-q1-checkpoint-option-2",
                "label": "Naik, karena debit yang sama memerlukan beda tekanan lebih besar ketika Cd lebih kecil.",
                "feedback": "Benar. Beda tekanan dan tinggi manometer meningkat agar debit tetap sama pada Cd yang lebih kecil."
              },
              {
                "id": "2023-uas-q1-checkpoint-option-3",
                "label": "Pasti nol, karena pompa sudah menjaga debit tetap.",
                "feedback": "Pompa mempertahankan aliran dengan menyediakan tekanan yang diperlukan. Pengaturan debit tidak menghapus penurunan tekanan pada meter.",
                "misconceptionTag": "concept-2023-04-choice-3"
              },
              {
                "id": "2023-uas-q1-checkpoint-option-4",
                "label": "Tetap, karena kedua diameter tidak berubah.",
                "feedback": "Geometri sama hanya mempertahankan faktor geometri. Perubahan Cd masih memengaruhi hubungan debit dengan tekanan.",
                "misconceptionTag": "concept-2023-04-choice-4"
              }
            ],
            "correctOptionId": "2023-uas-q1-checkpoint-option-2"
          }
        },
        {
          "id": "2023-uas-q1-step-2",
          "title": "Baca beda tekanan dari manometer",
          "content": "Kita memakai selisih massa jenis raksa dan fluida proses karena kedua kaki di atas raksa juga berisi fluida. Pada ketinggian yang sama dalam raksa yang diam, tekanannya sama; menyeimbangkan kedua kolom memberi hubungan berikut.\n\nUbah 50 mm menjadi 0.050 m. Hasil Δp menyatakan pA−pB dan bernilai positif untuk arah aliran pada sketsa.\n\n$$\n\\Delta p=(\\rho_m-\\rho)gh=(13600-950)(9.81)(0.050)=6204.825\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2023-uas-q1-step-3",
          "title": "1b · Gunakan kontinuitas untuk mengurangi variabel",
          "content": "Aliran tunak tak termampatkan memiliki debit volume yang sama pada A dan B. Kita tidak perlu mencari kedua kecepatan secara terpisah: salah satunya dapat dinyatakan melalui yang lain.\n\nLuas lingkaran berbanding dengan kuadrat diameter. Diameter A empat kali diameter B, sehingga luas A adalah $4^2=16$ kali luas B. Kecepatan di B menjadi 16 kali kecepatan di A.\n\n$$\nA_Av_A=A_Bv_B,\\qquad v_B=\\frac{A_A}{A_B}v_A,\\qquad\\frac{A_A}{A_B}=\\left(\\frac{80}{20}\\right)^2=16\n$$"
        },
        {
          "id": "2023-uas-q1-step-4",
          "title": "Masukkan hubungan kecepatan ke Bernoulli",
          "content": "Pada pipa mendatar, suku energi ketinggian sama pada kedua penampang. Model ideal menghubungkan penurunan tekanan dengan kenaikan energi gerak.\n\nGanti $v_B$ dengan $(A_A/A_B)v_A$. Setelah dikuadratkan, kedua suku kecepatan memuat $v_A^2$, sehingga faktor itu dapat dikeluarkan.\n\n$$\n\\begin{aligned}\\Delta p&=\\frac12\\rho(v_B^2-v_A^2)\\\\&=\\frac12\\rho\\left[\\left(\\frac{A_A}{A_B}v_A\\right)^2-v_A^2\\right]\\\\&=\\frac12\\rho v_A^2\\left[\\left(\\frac{A_A}{A_B}\\right)^2-1\\right]\\end{aligned}\n$$"
        },
        {
          "id": "2023-uas-q1-step-5",
          "title": "Selesaikan kecepatan ideal di A",
          "content": "Kita kalikan kedua ruas dengan 2, lalu bagi dengan massa jenis dan faktor rasio luas. Hasilnya adalah kuadrat kecepatan di A. Kita ambil akar positif karena kita mencari besar kecepatan dalam arah aliran.\n\nRasio luas yang dikuadratkan menjadi rasio diameter pangkat empat. Kemunculan pangkat empat berasal dari geometri luas, bukan rumus baru yang harus dihafal.\n\n$$\nv_{A,\\rm ideal}=\\sqrt{\\frac{2\\Delta p}{\\rho[(A_A/A_B)^2-1]}}=\\sqrt{\\frac{2\\Delta p}{\\rho[(D_A/D_B)^4-1]}}\n$$"
        },
        {
          "id": "2023-uas-q1-step-6",
          "title": "Ubah aliran ideal menjadi debit nyata",
          "content": "Koefisien debit $C_d=0.97$ memberi debit nyata sebesar 97% dari debit ideal. Luas penampang tetap. Oleh karena itu, faktor koreksi debit juga berlaku untuk kecepatan rata-rata di A.\n\nDebit adalah luas dikali kecepatan. Bentuk memakai luas leher $A_B$ berikut setara dengan bentuk $A_Av_A$, tetapi lebih ringkas untuk substitusi.\n\n$$\nv_A=C_dv_{A,\\rm ideal},\\qquad Q=A_Av_A=C_dA_B\\sqrt{\\frac{2\\Delta p}{\\rho[1-(D_B/D_A)^4]}}\n$$"
        },
        {
          "id": "2023-uas-q1-step-7",
          "title": "1c · Masukkan diameter dalam meter",
          "content": "Ubah diameter 20 mm menjadi 0.020 m sebelum menghitung luas leher. Jika diameter masih mm, luas akan berupa mm² dan satuan debit tidak cocok.\n\nRasio diameter 0.020/0.080 = 0.25 tidak memiliki satuan. Kita masukkan luas, tekanan, massa jenis, serta koefisien yang telah diketahui.\n\n$$\n\\begin{aligned}A_B&=\\frac{\\pi(0.020)^2}{4}=3.14159\\times10^{-4}\\ \\mathrm{m^2}\\\\Q&=0.97(3.14159\\times10^{-4})\\sqrt{\\frac{2(6204.825)}{950(1-0.25^4)}}\\\\&=\\boxed{1.10354\\times10^{-3}\\ \\mathrm{m^3/s}}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uas-q1-step-8",
          "title": "Periksa debit melalui kedua kecepatan",
          "content": "Debit 0.00110354 m³/s sama dengan 1.10354 L/s. Kita bagi debit itu dengan luas masing-masing penampang untuk mendapat kecepatan rata-ratanya.\n\nKecepatan leher 16 kali kecepatan A, sesuai kontinuitas. Kenaikan kecepatan ini juga sesuai tekanan B yang lebih rendah pada manometer.\n\n$$\nv_A=\\frac{Q}{\\pi(0.080)^2/4}=0.21954\\ \\mathrm{m/s},\\qquad v_B=\\frac Q{A_B}=3.51269\\ \\mathrm{m/s},\\qquad \\frac{v_B}{v_A}=16\n$$"
        },
        {
          "id": "2023-uas-q1-step-9",
          "title": "1d · Bedakan pemulihan tekanan dan beda tekanan ukur",
          "content": "Diffuser Venturi memperlambat aliran secara bertahap setelah leher, sehingga sebagian energi gerak kembali menjadi tekanan. Nozzle umumnya memulihkan tekanan lebih sedikit karena tidak memiliki diffuser sepanjang Venturi.\n\nRugi tekanan permanen adalah tekanan yang tidak kembali setelah alat. Beda tekanan tap adalah selisih tekanan pada dua lokasi pengukuran. Keduanya terkait dengan bentuk alat, tetapi tidak boleh dianggap besaran yang sama.\n\nKoefisien nozzle bergantung pada rancangan dan kondisi aliran. Rentang pada materi tumpang tindih dengan 0.97, sehingga kita tidak dapat menyatakan bahwa semua nozzle pasti memiliki Cd yang lebih rendah."
        },
        {
          "id": "2023-uas-q1-step-10",
          "title": "Tentukan perubahan tinggi dengan menyebut kondisi yang tetap",
          "content": "Untuk diameter dan cairan yang sama, bentuk debitnya dapat ditulis $Q=C_dB\\sqrt h$, dengan $B$ memuat semua faktor yang tetap. Jika debit juga dijaga sama, kedua alat memenuhi $C_{d,v}\\sqrt{h_v}=C_{d,n}\\sqrt{h_n}$.\n\nKita bagi dengan koefisien nozzle lalu kuadratkan. Jika Cd nozzle lebih kecil, tinggi raksa perlu lebih besar untuk menghasilkan debit yang sama. Jika pompa tidak menjaga debit, debit dapat ikut berubah.\n\nSoal tidak memberi Cd nozzle maupun kondisi pompa. Kita dapat memberi hubungan bersyarat di atas, tetapi belum dapat menetapkan satu tinggi raksa baru.\n\n$$\n\\left.\\frac{h_n}{h_v}\\right|_{Q\\ {\\rm fixed}}=\\left(\\frac{C_{d,v}}{C_{d,n}}\\right)^2\n$$\n\n> Jika tekanan pendorong tetap, debit juga dapat berubah. Jangan menganggap Q tetap tanpa menyebutnya."
        }
      ],
      "finalAnswer": "Debit 1.10354×10⁻³ m³/s dan kecepatan di A 0.21954 m/s. Saat mengganti alat, tinggi raksa bergantung pada debit yang dipertahankan dan Cd nozzle.\n\n$$\n\\boxed{Q=1.10354\\times10^{-3}\\ \\mathrm{m^3/s},\\quad v_A=0.21954\\ \\mathrm{m/s}}\n$$",
      "takeaway": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
    },
    {
      "id": "ipe-flow-practice",
      "kind": "practice",
      "slug": "ipe-flow-practice",
      "title": "Latihan: Pengukuran aliran",
      "difficulty": "menengah",
      "estimatedMinutes": 20,
      "intro": "Latihan ini membantu Anda memilih model dan menjelaskan alasan. Mulai dari pilihan ganda, tinjau contoh yang keliru, lalu susun jawaban sendiri. Gunakan rubrik untuk memeriksa alur, asumsi, dan batas kesimpulan Anda.",
      "questions": [
        {
          "id": "concept-2023-04",
          "prompt": "Sebuah Venturi diganti nozzle dengan diameter pipa dan leher yang sama. Untuk kondisi ini, Cd nozzle diketahui lebih rendah. Pompa menjaga debit tetap dan manometer memakai fluida yang sama. Apa yang terjadi pada selisih tinggi manometer?",
          "options": [
            {
              "id": "concept-2023-04-option-1",
              "label": "Turun, karena Cd yang lebih kecil selalu berarti beda tekanan lebih kecil.",
              "feedback": "Kesimpulan itu mengabaikan syarat debit tetap. Cd yang lebih kecil perlu diimbangi beda tekanan yang lebih besar.",
              "misconceptionTag": "concept-2023-04-choice-1"
            },
            {
              "id": "concept-2023-04-option-2",
              "label": "Naik, karena debit yang sama memerlukan beda tekanan lebih besar ketika Cd lebih kecil.",
              "feedback": "Benar. Beda tekanan dan tinggi manometer meningkat agar debit tetap sama pada Cd yang lebih kecil."
            },
            {
              "id": "concept-2023-04-option-3",
              "label": "Pasti nol, karena pompa sudah menjaga debit tetap.",
              "feedback": "Pompa mempertahankan aliran dengan menyediakan tekanan yang diperlukan. Pengaturan debit tidak menghapus penurunan tekanan pada meter.",
              "misconceptionTag": "concept-2023-04-choice-3"
            },
            {
              "id": "concept-2023-04-option-4",
              "label": "Tetap, karena kedua diameter tidak berubah.",
              "feedback": "Geometri sama hanya mempertahankan faktor geometri. Perubahan Cd masih memengaruhi hubungan debit dengan tekanan.",
              "misconceptionTag": "concept-2023-04-choice-4"
            }
          ],
          "correctOptionId": "concept-2023-04-option-2",
          "explanation": "Pada geometri dan fluida yang tetap, debit bertambah dengan Cd dan akar beda tekanan. Jika Cd turun tetapi debit dijaga, beda tekanan harus naik. Selisih tinggi manometer ikut naik. Diameter yang sama saja tidak menjamin pembacaan yang sama, dan debit tetap tidak berarti beda tekanan nol.",
          "relatedProblemId": "2023-uas-q1"
        },
        {
          "id": "concept-2024-03",
          "prompt": "Pitot pada garis tengah pipa memberi kecepatan lokal. Seorang siswa langsung mengalikan kecepatan itu dengan seluruh luas pipa. Untuk profil aliran yang kecepatannya menurun menuju dinding, bagaimana menilai langkah tersebut?",
          "options": [
            {
              "id": "concept-2024-03-option-1",
              "label": "Terlalu rendah, karena luas dekat dinding belum dihitung.",
              "feedback": "Seluruh luas sudah dikalikan. Masalahnya adalah kecepatan yang terlalu besar untuk mewakili seluruh luas itu.",
              "misconceptionTag": "concept-2024-03-choice-1"
            },
            {
              "id": "concept-2024-03-option-2",
              "label": "Terlalu tinggi, karena debit memerlukan kecepatan rata-rata penampang.",
              "feedback": "Benar. Debit adalah penjumlahan kontribusi kecepatan lokal di seluruh penampang, yang setara dengan luas kali kecepatan rata-rata."
            },
            {
              "id": "concept-2024-03-option-3",
              "label": "Tepat, karena kontinuitas membuat kecepatan sama di semua titik penampang.",
              "feedback": "Kontinuitas menyamakan debit antarpenampang dalam aliran tunak, bukan kecepatan setiap titik di satu penampang.",
              "misconceptionTag": "concept-2024-03-choice-3"
            },
            {
              "id": "concept-2024-03-option-4",
              "label": "Tidak berpengaruh, karena faktor profil hanya mengubah tekanan statis.",
              "feedback": "Faktor profil menghubungkan kecepatan pusat dengan kecepatan rata-rata, sehingga langsung memengaruhi debit.",
              "misconceptionTag": "concept-2024-03-choice-4"
            }
          ],
          "correctOptionId": "concept-2024-03-option-2",
          "explanation": "Kecepatan pusat lebih tinggi daripada rata-rata pada profil yang diberikan. Memakainya untuk seluruh luas menganggap bagian dekat dinding bergerak secepat pusat. Gunakan hubungan profil yang sesuai, lalu cek Reynolds untuk memastikan pilihan profil konsisten.",
          "relatedProblemId": "2024-uts2-q3"
        },
        {
          "id": "concept-2024-05",
          "prompt": "Sebuah tabel Cd sudah dikalibrasi terhadap luas lubang pelat orifis dan mencakup kontraksi jet. Seseorang memakai Cd itu, lalu mengganti luas lubang dengan Cc kali luas lubang untuk “menambah ketelitian”. Apa masalah utamanya?",
          "options": [
            {
              "id": "concept-2024-05-option-1",
              "label": "Cc mempunyai satuan luas, sehingga tidak boleh dipakai dalam rumus debit.",
              "feedback": "Cc adalah rasio dua luas, sehingga tidak bersatuan. Masalahnya bukan satuan Cc, melainkan pencampuran definisi.",
              "misconceptionTag": "concept-2024-05-choice-1"
            },
            {
              "id": "concept-2024-05-option-2",
              "label": "Koreksi tambahan selalu membuat hasil lebih akurat jika debitnya menjadi lebih kecil.",
              "feedback": "Nilai yang lebih kecil belum tentu lebih dekat ke kenyataan. Koreksi harus mengikuti model dan kalibrasinya.",
              "misconceptionTag": "concept-2024-05-choice-2"
            },
            {
              "id": "concept-2024-05-option-3",
              "label": "Kontraksi dapat dihitung dua kali karena definisi luas dan koefisien tidak lagi sesuai.",
              "feedback": "Benar. Periksa definisi luas acuan sebelum menggabungkan Cd dan Cc."
            },
            {
              "id": "concept-2024-05-option-4",
              "label": "Cd seharusnya dikalikan dengan diameter, bukan debit.",
              "feedback": "Cd didefinisikan sebagai rasio debit nyata terhadap debit ideal. Ia tidak mengubah diameter secara langsung.",
              "misconceptionTag": "concept-2024-05-choice-4"
            }
          ],
          "correctOptionId": "concept-2024-05-option-3",
          "explanation": "Koefisien empiris terikat pada definisi perhitungan ideal yang dipakai saat kalibrasi. Jika Cd sudah mencakup kontraksi dengan acuan luas lubang, memperkecil luas lagi dapat menggandakan koreksi. Model berbasis vena memerlukan koefisien dengan acuan yang sesuai.",
          "relatedProblemId": "2024-uas-q4"
        },
        {
          "id": "concept-2025-09",
          "prompt": "Soal orifis memberi geometri, beda tekanan, massa jenis, dan tabel Cd yang bergantung pada Reynolds. Viskositas tidak tersedia. Jawaban mana paling dapat dipertanggungjawabkan?",
          "options": [
            {
              "id": "concept-2025-09-option-1",
              "label": "Ambil viskositas dari soal lain yang sama-sama menyebut oli.",
              "feedback": "Nama fluida yang sama tidak menjamin viskositas sama; suhu dan jenis oli juga berpengaruh.",
              "misconceptionTag": "concept-2025-09-choice-1"
            },
            {
              "id": "concept-2025-09-option-2",
              "label": "Tetapkan aliran turbulen hanya karena beda tekanannya tidak nol.",
              "feedback": "Aliran laminar juga memerlukan beda tekanan. Beda tekanan bukan penentu tunggal rezim.",
              "misconceptionTag": "concept-2025-09-choice-2"
            },
            {
              "id": "concept-2025-09-option-3",
              "label": "Laporkan debit ideal dan hubungan debit aktual terhadap Cd; jelaskan data yang perlu ditambah untuk memilih Cd.",
              "feedback": "Tepat. Jawaban ini menyelesaikan bagian yang dapat ditentukan tanpa menyembunyikan kekurangan data."
            },
            {
              "id": "concept-2025-09-option-4",
              "label": "Pilih Cd paling kecil pada tabel dan nyatakan hasilnya sebagai jawaban pasti.",
              "feedback": "Nilai itu hanya berlaku pada kondisi tabelnya. Memilih angka terkecil tidak membuktikan syaratnya terpenuhi.",
              "misconceptionTag": "concept-2025-09-choice-4"
            }
          ],
          "correctOptionId": "concept-2025-09-option-3",
          "explanation": "Bagian ideal masih dapat dihitung dari data yang ada. Namun, memilih koefisien bergantung Reynolds memerlukan kondisi aliran yang belum lengkap tanpa viskositas atau informasi setara. Jawaban bersyarat menjaga pemisahan antara hasil data dan asumsi tambahan.",
          "relatedProblemId": "2025-uas-q5"
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-flow-guided",
          "mode": "spot-the-error",
          "title": "Tinjau koreksi kontraksi orifis",
          "prompt": "Koefisien debit memakai luas lubang pelat dan sudah mencakup kontraksi. Periksa langkah berikut.",
          "workSample": "Saya memakai koefisien debit dari tabel tersebut. Lalu, saya mengganti luas lubang dengan luas jet yang menyempit agar lebih teliti.",
          "question": {
            "id": "ipe-flow-guided-question",
            "prompt": "Mengapa langkah terakhir tidak tepat?",
            "options": [
              {
                "id": "ipe-flow-guided-question-option-1",
                "label": "Langkah itu menghitung pengaruh kontraksi dua kali.",
                "feedback": "Tepat. Definisi koefisien dan luas yang digunakan harus sepasang."
              },
              {
                "id": "ipe-flow-guided-question-option-2",
                "label": "Luas tidak pernah memengaruhi debit.",
                "feedback": "Luas memengaruhi debit. Masalahnya ialah memakai luas yang tidak sesuai definisi koefisien.",
                "misconceptionTag": "flow-guided-choice-2"
              },
              {
                "id": "ipe-flow-guided-question-option-3",
                "label": "Semua koefisien debit harus sama dengan satu.",
                "feedback": "Koefisien mengoreksi perbedaan dari model ideal. Nilainya tidak harus satu.",
                "misconceptionTag": "flow-guided-choice-3"
              }
            ],
            "correctOptionId": "ipe-flow-guided-question-option-1",
            "explanation": "Pertahankan luas lubang saat koefisien mengacu pada luas tersebut. Gunakan luas jet hanya jika model dan koefisien memang mendefinisikannya demikian."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-flow-essay",
          "title": "Nilai kecukupan data aliran",
          "prompt": "Soal memberi geometri orifis, beda tekanan, dan massa jenis. Tabel koefisien debit bergantung pada Reynolds, tetapi viskositas tidak tersedia. Jelaskan hasil yang dapat Anda nyatakan dan data tambahan yang diperlukan.",
          "sections": [
            "Model dan asumsi",
            "Alur penalaran",
            "Kesimpulan dan batas"
          ],
          "hints": [
            "Periksa hubungan antara Reynolds dan koefisien debit.",
            "Tuliskan besaran yang Anda butuhkan untuk menentukan Reynolds.",
            "Pisahkan hubungan bersyarat dari hasil numerik tunggal. Sebut asumsi yang perlu diuji."
          ],
          "rubric": [
            {
              "id": "ipe-flow-rubric-model",
              "label": "Model dan asumsi",
              "weight": 35,
              "fullCredit": "Memilih geometri, luas, dan definisi koefisien yang konsisten.",
              "commonPartialError": "Kecepatan titik tengah pipa tidak selalu sama dengan kecepatan rata-rata."
            },
            {
              "id": "ipe-flow-rubric-reasoning",
              "label": "Alur penalaran",
              "weight": 40,
              "fullCredit": "Menjelaskan hubungan timbal balik antara debit, Reynolds, dan koefisien serta kebutuhan viskositas."
            },
            {
              "id": "ipe-flow-rubric-conclusion",
              "label": "Kesimpulan dan batas",
              "weight": 25,
              "fullCredit": "Memberi jawaban bersyarat atau meminta data yang kurang tanpa menyamarkan asumsi sebagai fakta."
            }
          ],
          "verifiedOutline": "Pilih persamaan orifis sesuai geometri dan definisi tabel. Debit bergantung pada koefisien, sedangkan koefisien dapat bergantung pada Reynolds. Reynolds memerlukan viskositas serta kecepatan yang terkait debit. Tanpa viskositas, tabel belum menentukan satu koefisien yang pasti. Sajikan hubungan atau hasil bersyarat dengan asumsi yang jelas. Minta viskositas pada suhu kerja atau data yang membenarkan daerah koefisien tetap."
        }
      ]
    }
  ]
};

export const english: NonNullable<CourseTranslation['modules']>[string] = {
  "title": "Flow measurement",
  "items": {
    "ipe-flow-material": {
      "title": "Connect pressure difference to flow rate",
      "examHook": {
        "prompt": "A Pitot tube measures velocity at one point. Can you always multiply that value by the entire pipe area?",
        "targetOutcome": "You can choose consistent flow areas, velocities, and coefficients."
      },
      "body": "First identify what the instrument actually measures. A manometer reads a height difference, while a Pitot tube provides a pressure difference related to local velocity. Flow rate needs a further relation between that reading and the whole flow.\n\nState the velocity-profile assumption and the meaning of each coefficient. Both determine whether the result is justified.\n\n[Open the worked solution: Oil flow through an orifice](?item=2025-uts2-q1).",
      "microUnits": [
        {
          "id": "ipe-flow-principle",
          "title": "Choose a model from the stated conditions",
          "intuition": "Fluid can move at different speeds across a pipe. **Mean velocity** is flow rate divided by area and represents the whole section. A Pitot reading gives local velocity at its measurement point. You need a velocity profile or conversion factor to connect the two.",
          "formal": "Flow rate follows:\n\n$$Q=A\\bar{v}.$$\n\nA differential-pressure meter generally relates $Q$ to $\\sqrt{\\Delta p}$. Its full expression depends on geometry and the coefficient definition.",
          "validityBounds": "Check both fluid densities in a manometer. The discharge coefficient can depend on Reynolds number. Do not count contraction twice or guess a missing viscosity.",
          "decisionCheck": {
            "prompt": "A Pitot tube reads centreline velocity in a nonuniform flow. What information do you still need to determine flow rate?",
            "options": [
              {
                "id": "ipe-flow-decision-question-option-1",
                "label": "The relation between local velocity and the cross-section mean.",
                "feedback": "Correct. Flow rate needs mean velocity, so you need a profile or conversion factor."
              },
              {
                "id": "ipe-flow-decision-question-option-2",
                "label": "Only pipe area; local velocity always equals the mean.",
                "feedback": "With a nonuniform profile, one point does not represent the whole section."
              },
              {
                "id": "ipe-flow-decision-question-option-3",
                "label": "Only pipe length; cross-section area is unnecessary.",
                "feedback": "Flow rate through a section depends on its velocity distribution and area."
              }
            ],
            "explanation": "Treat the Pitot reading as local velocity. Use a suitable profile model to obtain mean velocity before multiplying by pipe area."
          }
        }
      ],
      "checkpoints": [
        "You can choose consistent flow areas, velocities, and coefficients.",
        "Geometry and coefficient definitions must match before converting pressure difference into flow rate.",
        "Centreline velocity is not always the mean velocity."
      ],
      "derivations": [
        {
          "id": "ipe-flow-sources",
          "title": "Sources and archive conventions",
          "content": "Read the part that supports the model you use. The numbers count physical PDF pages from 1; a page may contain several slides.\n\n[Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view), PDF pages 7, 8, 9, 10, 11, 12, 13: Flow-sensor principles, differential-pressure meters, discharge coefficients, Pitot tubes, and magnetic and ultrasonic meters.\n\n[Midterm and final-exam archive, 2023 to 2025](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Each problem retains its own original statement, exam pages, and assumptions."
        }
      ]
    },
    "2025-uts2-q1": {
      "title": "Oil flow through an orifice",
      "source": "Midterm 2 2025 · Question 1",
      "assumptions": [
        "Steady incompressible flow, equal tap elevation, and a pressure difference consistent with the coefficient table.",
        "The question calls d the vena contracta diameter but supplies an orifice Cd table. This solution follows the course calculation convention: d is the effective aperture diameter in the Cd method. In a real design, plate-bore and vena-contracta diameters differ and cannot be exchanged without a matching coefficient model."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Flow measurement"
      ],
      "statement": "Oil of density $870\\ \\mathrm{kg/m^3}$ and viscosity $0.059\\ \\mathrm{Pa\\,s}$ flows through a $500\\ \\mathrm{mm}$ pipe. The stated diameter $d=300\\ \\mathrm{mm}$ is called the vena contracta diameter in the question. The pressure difference is $1.6\\ \\mathrm{MPa}$. Use the source discharge-coefficient table.\n(a) Find the volume flow using continuity and Bernoulli. (b) Find the mass flow. (c) Identify the higher-pressure side and explain. (d) Compare an orifice meter with a venturi meter.",
      "given": [
        "Pipe diameter: $D=0.500\\ \\mathrm m$",
        "Restriction diameter: $d=0.300\\ \\mathrm m$",
        "Pressure difference: $\\Delta p=1.6\\times10^6\\ \\mathrm{Pa}$"
      ],
      "simulation": {
        "title": "Flow through an orifice",
        "caption": "Connect the restriction, pressure, and flow. Initial values follow the question.",
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
      },
      "steps": [
        {
          "id": "2025-uts2-q1-step-1",
          "title": "1. Identify the unknowns and why pressure difference helps",
          "content": "We want to know how much oil passes through the pipe each second. **Volume flow** $Q$ measures volume per second; **mass flow** $\\dot m$ measures mass per second. We find $Q$ first, then use density $\\rho$ to obtain $\\dot m$.\n\nThe orifice does not read flow directly. Its restriction changes velocity, which produces a pressure difference. Continuity therefore links the two section velocities, and Bernoulli links them to $\\Delta p$.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Geometry and coefficient definitions must match before converting pressure difference into flow rate.",
            "commonPitfall": "Centreline velocity is not always the mean velocity."
          }
        },
        {
          "id": "2025-uts2-q1-step-2",
          "title": "2. Convert units and choose the table row",
          "content": "$500\\ \\mathrm{mm}=0.500\\ \\mathrm m$, $300\\ \\mathrm{mm}=0.300\\ \\mathrm m$, and $1.6\\ \\mathrm{MPa}=1.6\\times10^6\\ \\mathrm{Pa}$. Viscosity $\\mu=0.059\\ \\mathrm{Pa\\,s}$ is needed later to check Reynolds number.\n\nWe need volume per second. Convert diameters to metres and pressure to pascals. The diameter ratio selects the discharge-coefficient row.\n\n$A_1$ is the upstream pipe area and $A_2$ the smaller-section area under the stated convention. Area depends on diameter squared: $A_2/A_1=(d/D)^2=0.36$, not 0.6. This determines the velocity relation.\n\n$$\n\\beta=\\frac dD=0.6,\\qquad A_1=\\frac{\\pi D^2}{4}=0.196350\\ \\mathrm{m^2},\\quad A_2=0.0706858\\ \\mathrm{m^2}\n$$\n\n| d/D | Re = 10⁴ | Re = 10⁵ | Re = 10⁶ | Re = 10⁷ |\n| --- | --- | --- | --- | --- |\n| 0.2 | 0.600 | 0.595 | 0.594 | 0.594 |\n| 0.4 | 0.610 | 0.603 | 0.598 | 0.598 |\n| 0.5 | 0.620 | 0.608 | 0.603 | 0.603 |\n| 0.6 | 0.630 | 0.610 | 0.608 | 0.608 |\n| 0.7 | 0.640 | 0.614 | 0.609 | 0.609 |"
        },
        {
          "id": "2025-uts2-q1-step-3",
          "title": "3. Relate the two velocities",
          "content": "Treat the oil as incompressible. The incoming and outgoing volume flows match, so the smaller section has the greater velocity.\n\n$v_1$ belongs to the large pipe and $v_2$ to the small section. Since $A_2<A_1$, we must have $v_2>v_1$. This also checks the sign and direction of the pressure change.\n\n$$\nA_1v_1=A_2v_2=Q,\\qquad v_1=\\frac{A_2}{A_1}v_2=\\beta^2v_2=0.36v_2\n$$"
        },
        {
          "id": "2025-uts2-q1-step-4",
          "title": "4. Derive the pressure and velocity relation",
          "content": "For the ideal model, write Bernoulli between the upstream and smaller sections. Equal elevations cancel the gravitational terms. Move the pressure terms to the left and the velocity terms to the right.\n\nSubstitute $v_1=\\beta^2v_2$. Squaring velocity changes $\\beta^2$ into $\\beta^4$. This produces the denominator $1-\\beta^4$ in the orifice relation.\n\n$$\np_1+\\tfrac12\\rho v_1^2=p_2+\\tfrac12\\rho v_2^2\\\\\\Delta p=\\tfrac12\\rho v_2^2(1-\\beta^4)\\quad\\Rightarrow\\quad v_{2,i}=\\sqrt{\\frac{2\\Delta p}{\\rho(1-\\beta^4)}}\n$$"
        },
        {
          "id": "2025-uts2-q1-step-5",
          "title": "5. Calculate flow before the empirical correction",
          "content": "Subscript $i$ means ideal. Multiply the ideal small-section velocity by that section area. The quantity under the square root has units $\\mathrm{m^2/s^2}$, so the root gives $\\mathrm{m/s}$ and the final product gives $\\mathrm{m^3/s}$.\n\n$$\n1-0.6^4=0.8704\\\\Q_i=0.0706858\\sqrt{\\frac{2(1.6\\times10^6)}{870(0.8704)}}=4.59503\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2025-uts2-q1-step-6",
          "title": "6. Apply Cd, then test the initial choice",
          "content": "$C_d$ is a dimensionless discharge coefficient. It connects ideal and actual flow according to the table. The $d/D=0.6$ row is known, but the Reynolds column is not yet known because Reynolds number itself depends on flow.\n\nTry $C_d=0.610$ from the $10^5$ column. Treat this choice as a trial. Calculate flow and Reynolds number, then check their consistency with the table. If they disagree, update $C_d$ and repeat.\n\n$$\nQ=C_dQ_i=0.610(4.59503)=2.80297\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2025-uts2-q1-step-7",
          "title": "7. Check the coefficient choice",
          "content": "Reynolds number uses the mean pipe velocity and pipe diameter. The result is close to $10^5$, so $C_d=0.610$ is consistent with the table precision. Fine interpolation barely changes the rounded result.\n\nUse the actual flow just calculated, not ideal flow, to obtain $v_1$. Dynamic viscosity appears in the denominator: at the same geometry and velocity, more viscous oil gives a lower Reynolds number.\n\n$$\nv_1=\\frac Q{A_1}=14.2754\\ \\mathrm{m/s},\\qquad Re_D=\\frac{\\rho v_1D}{\\mu}=\\frac{870(14.2754)(0.500)}{0.059}=1.05251\\times10^5\n$$"
        },
        {
          "id": "2025-uts2-q1-step-8",
          "title": "8. Convert volume flow to mass flow",
          "content": "Each cubic metre of oil has a mass of 870 kg. Multiply volume flow by density.\n\nCheck the units: $(\\mathrm{kg/m^3})(\\mathrm{m^3/s})=\\mathrm{kg/s}$. The numerical mass flow is larger because a cubic metre of oil weighs hundreds of kilograms, not because the two flow rates measure the same quantity.\n\n$$\n\\dot m=\\rho Q=870(2.80297)=2438.58\\ \\mathrm{kg/s}\n$$"
        },
        {
          "id": "2025-uts2-q1-step-9",
          "title": "9. Identify the higher-pressure side",
          "content": "Upstream pressure is higher. The restriction increases velocity and lowers static pressure. Some pressure recovers as the flow expands again, but energy loss prevents full recovery.\n\nDistinguish the pressure drop near the restriction from permanent pressure loss after recovery. The pressure difference between the taps helps determine flow; not all of it must remain as a loss far downstream.\n\n$$\np_1>p_2,\\qquad \\Delta p=p_1-p_2>0\n$$"
        },
        {
          "id": "2025-uts2-q1-step-10",
          "title": "10. Compare the orifice with a venturi",
          "content": "An orifice is compact, inexpensive, simple to make, and easy to replace. Its drawbacks are greater permanent pressure loss and greater sensitivity to plate-edge condition, deposits, and flow conditions. A venturi is larger and more expensive, but its gradual shape gives better pressure recovery.\n\nChoose an orifice when size, initial cost, and easy plate replacement matter most. Consider a venturi when reducing pressure loss during operation matters more. The comparison follows instrument function, not shape alone."
        },
        {
          "id": "2025-uts2-q1-step-11",
          "title": "11. Check that the results agree",
          "content": "$C_d<1$ gives $Q<Q_i$, consistent with the correction. Also, $Q/A_2\\approx39.65\\ \\mathrm{m/s}$ exceeds $Q/A_1\\approx14.28\\ \\mathrm{m/s}$, as the restriction requires. Reynolds number also returns us to the table column we used.\n\nThese results retain the diameter convention stated in the question notes. Do not add a separate contraction coefficient without changing the model; doing so can count the correction twice."
        }
      ],
      "finalAnswer": "With Cd ≈ 0.610, volume flow ≈ 2.803 m³/s and mass flow ≈ 2.439 × 10³ kg/s. Upstream pressure is higher.\n\n$$\n\\boxed{Q\\approx2.803\\ \\mathrm{m^3/s},\\quad \\dot m\\approx2.439\\times10^3\\ \\mathrm{kg/s},\\quad Re_D\\approx1.053\\times10^5}\n$$",
      "takeaway": "Centreline velocity is not always the mean velocity."
    },
    "2025-uas-q5": {
      "title": "Orifice with a mercury manometer",
      "source": "Final exam 2025 · Question 5",
      "assumptions": [
        "Steady incompressible flow, equal tap elevations, and g = 9.81 m/s². Following the course orifice convention, d is used as the effective aperture diameter in the Cd method; an actual vena-contracta diameter requires a consistent coefficient model.",
        "The tabulated Cd flow range is not a universal bound: the table only covers Re 10⁴ to 10⁷. The source omits μ, so the listed Cd cases are scenarios, not verified properties of this fluid."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Flow measurement"
      ],
      "statement": "(a) Derive pipe velocity $v_1$ from mercury height difference $h$, mercury density $\\rho_m$, fluid density $\\rho_f$, and $d/D$. (b) Use $D=300\\ \\mathrm{mm}$, $d=180\\ \\mathrm{mm}$, $h=100\\ \\mathrm{mm}$, $\\rho_m=13600\\ \\mathrm{kg/m^3}$, and $\\rho_f=900\\ \\mathrm{kg/m^3}$ to calculate flow. The source asks for “mass flow rate” in $\\mathrm{m^3/s}$; distinguish volume flow $Q$ from mass flow $\\dot m$. (c) Check the flow regime. A $C_d$ table is given, but viscosity is missing.",
      "simulation": {
        "title": "Flow through an orifice",
        "caption": "The manometer gives pressure difference. Initial values show the ideal Cd = 1 model; actual correction requires more data.",
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
      },
      "steps": [
        {
          "id": "2025-uas-q5-step-1",
          "title": "1. Separate determined quantities from missing data",
          "content": "The manometer data determine $\\Delta p$, and Bernoulli gives ideal velocity. We need $C_d$ to calculate actual flow. Choosing $C_d$ requires Reynolds number, which requires viscosity. The source does not supply viscosity. We therefore state the conditions for actual-flow results, helping you separate determined results from conditional ones.\n\nMissing data do not prevent all calculation. Solve the determined parts, then state clearly which results still depend on an assumption.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Geometry and coefficient definitions must match before converting pressure difference into flow rate.",
            "commonPitfall": "Centreline velocity is not always the mean velocity."
          },
          "checkpoint": {
            "prompt": "An orifice problem supplies geometry, pressure difference, density, and a Reynolds-dependent Cd table, but no viscosity. Which answer is best supported?",
            "options": [
              {
                "id": "2025-uas-q5-checkpoint-option-1",
                "label": "Take viscosity from another problem that also mentions oil.",
                "feedback": "A shared fluid name does not establish equal viscosity; temperature and oil type matter."
              },
              {
                "id": "2025-uas-q5-checkpoint-option-2",
                "label": "Declare turbulent flow solely because pressure difference is nonzero.",
                "feedback": "Laminar flow also requires a pressure difference. Pressure difference alone does not determine regime."
              },
              {
                "id": "2025-uas-q5-checkpoint-option-3",
                "label": "Report ideal flow and actual flow as a function of Cd; state the extra data needed to choose Cd.",
                "feedback": "Correct. It solves the determined portion without hiding missing information."
              },
              {
                "id": "2025-uas-q5-checkpoint-option-4",
                "label": "Choose the smallest table Cd and present the result as exact.",
                "feedback": "That value applies under its tabulated conditions. Choosing the smallest value does not establish those conditions."
              }
            ]
          }
        },
        {
          "id": "2025-uas-q5-step-2",
          "title": "2. Convert height difference to pressure difference",
          "content": "Both manometer legs contain process fluid above the mercury. Therefore pressure difference uses the density difference, not mercury density alone. Take $h$ as positive for higher upstream pressure.\n\n$\\rho_m=13600\\ \\mathrm{kg/m^3}$ is mercury density and $\\rho_f=900\\ \\mathrm{kg/m^3}$ is pipe-fluid density. The pipe-fluid columns also contribute hydrostatic pressure, leaving the density difference. Use $h=100\\ \\mathrm{mm}=0.100\\ \\mathrm m$.\n\n$$\n\\Delta p=(\\rho_m-\\rho_f)gh=(13600-900)(9.81)(0.100)=12458.7\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2025-uas-q5-step-3",
          "title": "3. Convert diameter ratio to area ratio",
          "content": "$D=0.300\\ \\mathrm m$ and $d=0.180\\ \\mathrm m$, so $\\beta=0.6$. Incompressible continuity gives equal flow through both sections. Since the smaller area is 0.36 of pipe area, its velocity is $1/0.36$ times pipe velocity.\n\n$$\n\\frac{A_2}{A_1}=\\beta^2=0.36,\\qquad A_1v_1=A_2v_2\\quad\\Rightarrow\\quad v_2=\\frac{v_1}{\\beta^2}\n$$"
        },
        {
          "id": "2025-uas-q5-step-4",
          "title": "4. Write Bernoulli in terms of the requested pipe velocity",
          "content": "At equal elevation, $\\Delta p=\\rho_f(v_2^2-v_1^2)/2$ for the ideal model. Replace $v_2$ with $v_1/\\beta^2$, leaving only $v_1$ unknown.\n\n$$\n\\Delta p=\\frac{\\rho_f}{2}\\left(\\frac{v_{1,i}^2}{\\beta^4}-v_{1,i}^2\\right)=\\frac{\\rho_f v_{1,i}^2}{2}(\\beta^{-4}-1)\n$$"
        },
        {
          "id": "2025-uas-q5-step-5",
          "title": "5. Combine continuity and Bernoulli",
          "content": "Write $\\beta=d/D$. Continuity gives $v_2=v_1/\\beta^2$. Insert this into equal-elevation Bernoulli and solve for $v_1$. The velocity remains ideal until we apply the discharge correction.\n\nTo obtain the final form, use $\\beta^{-4}-1=(1-\\beta^4)/\\beta^4$ and $\\sqrt{\\beta^4}=\\beta^2$ for positive diameters. The simplification gives the factor $\\beta^2$ outside the square root.\n\n$$\n(\\rho_m-\\rho_f)gh=\\frac12\\rho_fv_{1,i}^{\\,2}(\\beta^{-4}-1)\\\\v_{1,i}=\\beta^2\\sqrt{\\frac{2gh(\\rho_m/\\rho_f-1)}{1-\\beta^4}},\\qquad v_{1,\\mathrm{actual}}=C_dv_{1,i}\n$$\n\n| d/D | Re = 10⁴ | Re = 10⁵ | Re = 10⁶ | Re = 10⁷ |\n| --- | --- | --- | --- | --- |\n| 0.2 | 0.600 | 0.595 | 0.594 | 0.594 |\n| 0.4 | 0.610 | 0.603 | 0.598 | 0.598 |\n| 0.5 | 0.620 | 0.608 | 0.603 | 0.603 |\n| 0.6 | 0.630 | 0.610 | 0.608 | 0.608 |\n| 0.7 | 0.640 | 0.614 | 0.609 | 0.609 |"
        },
        {
          "id": "2025-uas-q5-step-6",
          "title": "6. Substitute the values for ideal velocity",
          "content": "Use pipe-fluid density in the kinetic-energy denominator. Mercury is used only to convert manometer height into pressure difference. This result has not yet been multiplied by the discharge coefficient.\n\n$$\nv_{1,i}=0.6^2\\sqrt{\\frac{2(9.81)(0.100)(13600/900-1)}{1-0.6^4}}=2.03036\\ \\mathrm{m/s}\n$$"
        },
        {
          "id": "2025-uas-q5-step-7",
          "title": "7. Calculate the ideal values that are determined",
          "content": "The diameter ratio is 0.6. Pipe area uses the 0.300 m diameter. Multiply area by velocity for volume flow, then by density for mass flow.\n\nThe velocity calculated belongs to the large pipe, so multiply it by $A_1$, not $A_2$. Combining $v_1$ with the small area mixes different sections and gives the wrong flow.\n\n$$\nv_{1,i}=2.03036\\ \\mathrm{m/s},\\quad A_1=\\frac{\\pi(0.300)^2}{4}=0.0706858\\ \\mathrm{m^2}\\\\Q_i=A_1v_{1,i}=0.143518\\ \\mathrm{m^3/s},\\quad \\dot m_i=900Q_i=129.166\\ \\mathrm{kg/s}\n$$"
        },
        {
          "id": "2025-uas-q5-step-8",
          "title": "8. Separate actual flow from the coefficient assumption",
          "content": "Actual flow is $Q=C_dQ_i$. However, the table chooses $C_d$ from Reynolds number, which requires viscosity. Since viscosity is absent, no unique actual flow is determined. Do not import viscosity from another question.\n\nThe scenario table shows the consequences of different Cd choices, not three independently established answers. Each row requires a matching Reynolds condition; missing data prevent a unique choice.\n\n$$\nQ=0.143518C_d\\ \\mathrm{m^3/s},\\qquad \\dot m=129.166C_d\\ \\mathrm{kg/s}\n$$\n\n| Assumed Cd | Q (m³/s) | ṁ (kg/s) |\n| --- | --- | --- |\n| 0.630 (Re = 10⁴) | 0.090416 | 81.375 |\n| 0.610 (Re = 10⁵) | 0.087546 | 78.791 |\n| 0.608 (Re ≥ 10⁶ pada tabel / in table) | 0.087259 | 78.533 |"
        },
        {
          "id": "2025-uas-q5-step-9",
          "title": "9. State the Reynolds check conditionally",
          "content": "With $\\mu$ in $\\mathrm{Pa\\,s}$, the expression below gives actual Reynolds number. Pipe flow is commonly treated as laminar below about 2300, transitional around 2300 to 4000, and turbulent above about 4000. Without $\\mu$, the regime cannot be established.\n\nThis expression uses $v_{1,\\mathrm{actual}}=C_dv_{1,i}$. Pressure difference alone cannot establish turbulent flow, because viscosity also controls the ratio of inertial to viscous effects.\n\n$$\nRe_D=\\frac{900(2.03036C_d)(0.300)}{\\mu}=\\frac{548.197C_d}{\\mu}\n$$\n\n> If Cd = 0.608 is deliberately assumed, Re = 333.304/μ. The Re ≥ 10⁶ table column then requires μ ≤ 3.333 × 10⁻⁴ Pa·s. The selected column needs a consistency check; the drawing alone does not establish it."
        },
        {
          "id": "2025-uas-q5-step-10",
          "title": "10. Check one Cd choice without treating it as new data",
          "content": "If $C_d=0.608$ is chosen from the high-Reynolds column, the model gives $Re_D=333.304/\\mu$. To match $Re_D\\ge10^6$, viscosity must satisfy $\\mu\\le3.333\\times10^{-4}\\ \\mathrm{Pa\\,s}$. The question does not establish this condition."
        },
        {
          "id": "2025-uas-q5-step-11",
          "title": "11. Report units and the missing datum",
          "content": "m³/s denotes volume flow; kg/s denotes mass flow. We can already report ideal flow and the relation to Cd. A viscosity value or specified Cd is needed for a unique actual flow; viscosity is also needed to classify the flow regime.\n\nPhysical check: for $0<C_d<1$, actual flow is smaller than ideal flow. If substitution gives the opposite without an additional model, recheck the position of $C_d$ and the area used."
        }
      ],
      "finalAnswer": "Ideal flow is 0.143518 m³/s and 129.166 kg/s. Actual flow is 0.143518 Cd m³/s and 129.166 Cd kg/s. Missing viscosity prevents a unique actual Cd and flow-regime determination.\n\n$$\n\\boxed{\\begin{aligned}v_{1,i}&=\\beta^2\\sqrt{\\frac{2gh(\\rho_m/\\rho_f-1)}{1-\\beta^4}}\\\\Q&=0.143518C_d\\ \\mathrm{m^3/s}\\\\\\dot m&=129.166C_d\\ \\mathrm{kg/s}\\end{aligned}}\n$$",
      "takeaway": "Centreline velocity is not always the mean velocity."
    },
    "2024-uts2-q3": {
      "title": "Flow rate from a Pitot tube and manometer",
      "source": "Midterm 2 2024 · Question 3",
      "assumptions": [
        "The Pitot opening is taken to be on the centreline with fully developed flow, consistent with the supplied profiles. If v1 were intended as an average velocity, the flow would be 0.008816 m³/s, which omits the provided profile correction.",
        "The exam prints a viscosity of 8.62 × 10⁻³ Pa·s. This solution keeps that value rather than silently replacing it with a water-property table value."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Flow measurement"
      ],
      "statement": "3. Pitot Tube: Flow Measurement\nA pitot tube is used to measure the water flow inside a pipe with an internal diameter of 100 mm. The tube is connected to a U-tube manometer filled with mercury, as depicted in the following figure. Given that the density of water and mercury are 1000 kg/m³ and 13600 kg/m³, respectively, and the absolute viscosity of water at 27°C is $8.62\\times10^{-3}\\ \\mathrm{Ns/m^2}$. The gravity constant is 10 m/s².\n\n(a) [5%] By using Bernoulli’s equation, determine the pressure difference between Point 1 and Point 2, i.e. $P_2-P_1$.\n\n(b) [10%] By using Pascal’s Law, determine the water flow ($v_1$) in terms of the mercury height difference ($h_m$).\n\n(c) [10%] If $h_m=5$ mm, calculate the volumetric flowrate in m³/s.\n\n(d) [5%] Check whether the water flow is laminar or turbulent?\nUseful formulas supplied: $Re=\\rho vD/\\mu$; laminar $v_{max}=2v_{avg}$; turbulent $v_{max}=1.23v_{avg}$.",
      "simulation": {
        "title": "Pitot tube",
        "caption": "Mercury height sets dynamic pressure; the velocity profile converts local speed into flow rate.",
        "params": [
          {
            "key": "height",
            "label": "Height difference h"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uts2-q3-step-1",
          "title": "a · Identify what the Pitot tube reads",
          "content": "We need the whole-pipe flow rate, but a Pitot tube first provides speed at one location. Point 1 is in the moving stream; point 2 at the opening brings fluid locally to rest. We call point 2 the **stagnation point**, where local fluid speed is zero.\n\nThus $v_2=0$. The two points have equal elevation, and we neglect losses along the short path to the opening. These conditions make Bernoulli appropriate for relating pressure to speed.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Geometry and coefficient definitions must match before converting pressure difference into flow rate.",
            "commonPitfall": "Centreline velocity is not always the mean velocity."
          },
          "checkpoint": {
            "prompt": "A centreline Pitot tube gives local speed. A student immediately multiplies it by the whole pipe area. For a velocity profile that decreases toward the wall, how should this step be judged?",
            "options": [
              {
                "id": "2024-uts2-q3-checkpoint-option-1",
                "label": "Too low, because the area near the wall has not been counted.",
                "feedback": "The whole area is already included. The problem is that the selected speed is too large to represent all of it."
              },
              {
                "id": "2024-uts2-q3-checkpoint-option-2",
                "label": "Too high, because flow rate requires the cross-sectional mean speed.",
                "feedback": "Correct. Flow rate sums local-speed contributions over the section, equivalent to area times mean speed."
              },
              {
                "id": "2024-uts2-q3-checkpoint-option-3",
                "label": "Correct, because continuity makes speed equal everywhere across a section.",
                "feedback": "Continuity matches flow rate between sections in steady flow, not speeds at every point within one section."
              },
              {
                "id": "2024-uts2-q3-checkpoint-option-4",
                "label": "It makes no difference, because the profile factor changes only static pressure.",
                "feedback": "The profile factor links centreline speed to mean speed and therefore directly affects flow rate."
              }
            ]
          }
        },
        {
          "id": "2024-uts2-q3-step-2",
          "title": "a · Derive the pressure difference from Bernoulli",
          "content": "The term $\\tfrac12\\rho_wv^2$ is kinetic energy per unit fluid volume. It becomes zero at stagnation. With equal elevations, subtract $P_1$ from both sides.\n\n$\\rho_w$ denotes water density. For nonzero speed the right side is positive, so $P_2>P_1$. This sign also determines which mercury surface is lower.\n\n$$\n\\begin{aligned}P_1+\\tfrac12\\rho_wv_1^2+\\rho_wgz_1&=P_2+\\tfrac12\\rho_w(0)^2+\\rho_wgz_1\\\\P_2-P_1&=\\tfrac12\\rho_wv_1^2\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q3-step-3",
          "title": "b · Set up the hydrostatic balance",
          "content": "In the manometer, pressure increases by $\\rho g\\Delta z$ when moving downward and decreases by that amount when moving upward in the same fluid. Pressure must match along one horizontal level in the stationary mercury.\n\nThe height difference $h_m$ adds a mercury column on one side but removes an equal-height water column. The net contribution is $\\rho_mgh_m-\\rho_wgh_m$. The net column contribution explains the density difference; using only $\\rho_mgh_m$ ignores the water above mercury.\n\n$$\nP_2-P_1=(\\rho_m-\\rho_w)gh_m\n$$"
        },
        {
          "id": "2024-uts2-q3-step-4",
          "title": "b · Solve the equation for speed",
          "content": "Bernoulli and the manometer describe the same pressure difference. Set the results equal, then multiply both sides by $2/\\rho_w$. This isolates $v_1^2$.\n\nTake the positive square root because we seek speed magnitude. The Pitot orientation already establishes flow direction.\n\n$$\n\\begin{aligned}\\tfrac12\\rho_wv_1^2&=(\\rho_m-\\rho_w)gh_m\\\\v_1^2&=\\frac{2(\\rho_m-\\rho_w)gh_m}{\\rho_w}\\\\v_1&=\\sqrt{\\frac{2(\\rho_m-\\rho_w)gh_m}{\\rho_w}}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q3-step-5",
          "title": "c · Substitute the data in SI units",
          "content": "The 5 mm height becomes 0.005 m, and the 100 mm diameter becomes 0.100 m. Use $g=10\\ \\mathrm{m/s^2}$ and viscosity $8.62\\times10^{-3}\\ \\mathrm{Pa\\,s}$ as printed in the question.\n\nThe density difference is 12600 kg/m³. Calculate the 630 Pa pressure difference, then insert it into the Pitot relation.\n\n$$\n\\begin{aligned}\\Delta P&=(13600-1000)(10)(0.005)=630\\ \\mathrm{Pa}\\\\v_1&=\\sqrt{\\frac{2(630)}{1000}}=\\sqrt{1.26}=1.122497\\ \\mathrm{m/s}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uts2-q3-step-6",
          "title": "c and d · Distinguish centreline and mean speed",
          "content": "The opening in the figure lies on the centreline, so the calculated value is $v_{\\max}$. Flow rate $Q=A\\bar v$ needs $\\bar v$, the cross-sectional mean speed. Fluid near the wall moves more slowly than at the centre.\n\nThe question gives profile factors of 2 for laminar flow and 1.23 for turbulent flow. Check Reynolds number before choosing. Apply each assumption and test whether its resulting regime supports it.\n\n$$\nv_{\\max}=2\\bar v\\quad(\\mathrm{laminar}),\\qquad v_{\\max}=1.23\\bar v\\quad(\\mathrm{turbulent})\n$$"
        },
        {
          "id": "2024-uts2-q3-step-7",
          "title": "d · Test the laminar assumption",
          "content": "Divide the centreline speed by 2 to try the laminar profile. Pipe Reynolds number uses the mean speed, not the centreline speed.\n\nAbout 6511 is outside the usual laminar pipe range below roughly 2300. The check contradicts the starting assumption, so a factor of 2 is inconsistent with these data.\n\n$$\n\\bar v_{\\mathrm{trial}}=\\frac{1.122497}{2}=0.561249\\ \\mathrm{m/s},\\qquad Re_{\\mathrm{trial}}=\\frac{1000(0.561249)(0.100)}{0.00862}\\approx6511\n$$"
        },
        {
          "id": "2024-uts2-q3-step-8",
          "title": "d · Test the supplied turbulent profile",
          "content": "Now divide the centreline speed by 1.23. This factor comes from the exam’s formula sheet; it is not universal for every turbulent profile.\n\nReynolds number is about 10587, above the pipe transition range, supporting turbulent flow. Use this mean speed to calculate flow rate.\n\n$$\n\\bar v=\\frac{1.122497}{1.23}=0.912599\\ \\mathrm{m/s},\\qquad Re=\\frac{1000(0.912599)(0.100)}{0.00862}\\approx1.059\\times10^4\n$$"
        },
        {
          "id": "2024-uts2-q3-step-9",
          "title": "c · Calculate area, then whole-pipe flow",
          "content": "Circle area can be written $A=\\pi D^2/4$ because radius is $D/2$. The 0.100 m internal diameter gives 0.00785398 m².\n\nMultiply area by mean speed. The units m² × m/s give m³/s. About 7.17 L/s is lower than an estimate that applies centreline speed across the whole section.\n\n$$\nQ=\\frac{\\pi(0.100)^2}{4}(0.912599)=0.00716754\\ \\mathrm{m^3/s}\\approx7.17\\ \\mathrm{L/s}\n$$"
        }
      ],
      "finalAnswer": "The flow rate is approximately 0.00717 m³/s and the flow is turbulent, after converting centreline velocity to mean velocity.\n\n$$\n\\boxed{\\Delta P=630\\ \\mathrm{Pa},\\quad Q\\approx7.168\\times10^{-3}\\ \\mathrm{m^3/s},\\quad Re\\approx10587}\n$$",
      "takeaway": "Centreline velocity is not always the mean velocity."
    },
    "2024-uas-q4": {
      "title": "Orifice flow and vena-contracta area",
      "source": "Final exam 2024 · Question 4",
      "assumptions": [
        "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
        "The exam does not define Cd’s reference area. The main result uses A2 = Ac in the course formula; the standard hole-area alternative is also shown. The two results use different coefficient definitions.",
        "Flow is assumed steady and incompressible, with effective sections consistent with the pressure difference definition."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Flow measurement"
      ],
      "statement": "4. [25%] Flow Measurement: Orifice Plate Flowmeter\nAn orifice plate flowmeter is situated in a horizontal pipe with an internal diameter of 90 mm in which water flows. The diameter of the sharp-edged orifice is 30 mm. The discharge coefficient ($C_d$) for the flowmeter is 0.65, and the coefficient of contraction is 0.67. The static pressure difference across the orifice is 0.3 bar. The water density is 1000 kg/m³.\n\n(a) [10%] Apply Bernoulli’s equation and continuity between positions before and after the plate. Derive the equation for water velocity before the plate.\n\n(b) [5%] Calculate the cross-sectional areas of the pipe and vena contracta.\n\n(c) [5%] Calculate the ideal (theoretical) volumetric flow rate of the water in the pipe.\n\n(d) [5%] Calculate the actual (real) mass flow rate of the water in the pipe.",
      "simulation": {
        "title": "Flow through an orifice",
        "caption": "Hole area differs from vena area. The main result explicitly uses a vena-referenced Cd.",
        "params": [
          {
            "key": "pressure",
            "label": "Pressure difference Δp"
          },
          {
            "key": "diameterRatio",
            "label": "d₀ / D"
          },
          {
            "key": "Cd",
            "label": "Discharge coefficient Cd"
          }
        ]
      },
      "steps": [
        {
          "id": "2024-uas-q4-step-1",
          "title": "a · Define the sections and flow quantities",
          "content": "Section 1 is upstream of the plate, with area $A_1$ and mean speed $v_1$. Section 2 is the narrow stream, with area $A_2$ and speed $v_2$. We seek upstream speed in terms of pressure difference.\n\nIn steady incompressible flow, the same volume passes both sections each second. Since $Q=Av$, area times speed must match.\n\n$$\nA_1v_1=A_2v_2\\quad\\Longrightarrow\\quad v_2=\\frac{A_1}{A_2}v_1\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Geometry and coefficient definitions must match before converting pressure difference into flow rate.",
            "commonPitfall": "Centreline velocity is not always the mean velocity."
          },
          "checkpoint": {
            "prompt": "A Cd table is calibrated using the orifice-plate hole area and already includes jet contraction. Someone uses that Cd, then replaces hole area with Cc times hole area to “improve accuracy”. What is the main problem?",
            "options": [
              {
                "id": "2024-uas-q4-checkpoint-option-1",
                "label": "Cc has area units, so it cannot appear in a flow equation.",
                "feedback": "Cc is a ratio of two areas and is dimensionless. The problem is inconsistent definitions, not Cc units."
              },
              {
                "id": "2024-uas-q4-checkpoint-option-2",
                "label": "Extra correction always improves accuracy if it produces a smaller flow rate.",
                "feedback": "A smaller value is not necessarily closer to reality. Corrections must follow the model and calibration."
              },
              {
                "id": "2024-uas-q4-checkpoint-option-3",
                "label": "Contraction can be counted twice because the area and coefficient definitions no longer match.",
                "feedback": "Correct. Check the reference-area definition before combining Cd and Cc."
              },
              {
                "id": "2024-uas-q4-checkpoint-option-4",
                "label": "Cd should multiply diameter rather than flow rate.",
                "feedback": "Cd is defined as actual flow divided by ideal flow. It does not directly change diameter."
              }
            ]
          }
        },
        {
          "id": "2024-uas-q4-step-2",
          "title": "a · Apply Bernoulli to the horizontal pipe",
          "content": "The horizontal pipe gives equal elevations, so the $\\rho gz$ terms cancel. For ideal flow, losses are not yet included. Pressure difference becomes a kinetic-energy difference per unit volume.\n\nDefine $\\Delta P=P_1-P_2>0$. At the narrow section, speed is higher and static pressure is lower.\n\n$$\nP_1+\\tfrac12\\rho v_1^2=P_2+\\tfrac12\\rho v_2^2\\quad\\Longrightarrow\\quad\\Delta P=\\tfrac12\\rho(v_2^2-v_1^2)\n$$"
        },
        {
          "id": "2024-uas-q4-step-3",
          "title": "a · Substitute continuity and isolate v₁",
          "content": "Replace $v_2$ with $(A_1/A_2)v_1$. Squaring also squares the entire area ratio. Factor out $v_1^2$.\n\nMultiply both sides by 2, then divide by $\\rho[(A_1/A_2)^2-1]$. The positive square root gives ideal upstream speed.\n\n$$\n\\begin{aligned}\\Delta P&=\\tfrac12\\rho\\left[\\left(\\frac{A_1}{A_2}\\right)^2-1\\right]v_1^2\\\\v_{1,i}&=\\sqrt{\\frac{2\\Delta P}{\\rho[(A_1/A_2)^2-1]}}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uas-q4-step-4",
          "title": "b · Distinguish the plate hole from the vena contracta",
          "content": "The plate-hole area is $A_o$. The stream can contract further after passing the sharp edge. Its narrowest section is the **vena contracta**, with area $A_c$. The hole and the vena contracta have different areas.\n\nThe contraction coefficient is $C_c=A_c/A_o=0.67$. It multiplies area, not diameter. Since area scales with diameter squared, vena diameter is $\\sqrt{C_c}$ times hole diameter.\n\n$$\nA_c=C_cA_o,\\qquad d_c=d_o\\sqrt{C_c}\n$$"
        },
        {
          "id": "2024-uas-q4-step-5",
          "title": "b · Calculate areas using diameters in metres",
          "content": "Convert 90 mm to 0.090 m and 30 mm to 0.030 m before calculating area. The formula $\\pi D^2/4$ comes from $\\pi(D/2)^2$.\n\nCalculate pipe and hole areas, then multiply hole area by 0.67. Their ordering must satisfy $A_c<A_o<A_1$.\n\n$$\n\\begin{aligned}A_1&=\\frac\\pi4(0.09)^2=6.361725\\times10^{-3}\\ \\mathrm{m^2}\\\\A_o&=\\frac\\pi4(0.03)^2=7.068583\\times10^{-4}\\ \\mathrm{m^2}\\\\A_c&=C_cA_o=4.735951\\times10^{-4}\\ \\mathrm{m^2}\\end{aligned}\n$$"
        },
        {
          "id": "2024-uas-q4-step-6",
          "title": "c · State the convention used with the course model",
          "content": "The question asks for vena area before flow rate. Following that route, use $A_2=A_c$ in the section-based formula. The pressure difference converts from 0.3 bar to $0.3\\times10^5=30000$ Pa.\n\nTo obtain flow rate, multiply $v_{1,i}$ by $A_1$. Rearranging the area ratio gives the form with $A_2$ outside the square root.\n\n$$\nQ_i=A_1v_{1,i}=A_2\\sqrt{\\frac{2\\Delta P}{\\rho[1-(A_2/A_1)^2]}}\n$$"
        },
        {
          "id": "2024-uas-q4-step-7",
          "title": "c · Insert the vena area into ideal flow",
          "content": "Use $A_2=0.0004735951$ m², $A_1=0.006361725$ m², $\\rho=1000$ kg/m³, and $\\Delta P=30000$ Pa. The denominator retains upstream velocity; we do not assume $v_1=0$.\n\nVena-based ideal flow is about 0.00367866 m³/s. Dividing by pipe area gives an ideal upstream speed of 0.578249 m/s.\n\n$$\nQ_{i,c}=0.0004735951\\sqrt{\\frac{2(30000)}{1000[1-(0.0004735951/0.006361725)^2]}}=0.003678659\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2024-uas-q4-step-8",
          "title": "d · Apply Cd under the same convention",
          "content": "If the given $C_d=0.65$ is referenced to vena-based ideal flow, actual flow is 65% of that ideal value. The multiplier does not change units.\n\nMatching the reference areas is a condition on the coefficient definition, not just an arithmetic choice. The main result uses the same vena reference for area and $C_d$.\n\n$$\nQ_c=C_dQ_{i,c}=0.65(0.003678659)=0.002391129\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2024-uas-q4-step-9",
          "title": "d · Convert volume flow into mass flow",
          "content": "Each cubic metre of water has a mass of 1000 kg under the supplied data. Multiply volume per second by mass per volume to obtain mass per second.\n\nThe cubic-metre units cancel, leaving kg/s. The 2.39113 kg/s result uses a vena-referenced coefficient.\n\n$$\n\\dot m_c=\\rho Q_c=1000(0.002391129)=2.391129\\ \\mathrm{kg/s}\n$$"
        },
        {
          "id": "2024-uas-q4-step-10",
          "title": "Do not mix two discharge-coefficient definitions",
          "content": "Under the usual orifice-meter convention, $C_d$ is referenced to hole area $A_o$ and already includes contraction. Using that coefficient and also replacing $A_o$ with $C_cA_o$ can count contraction twice.\n\nIf the printed 0.65 uses the hole-area convention, ideal flow is 0.00550942 m³/s and actual mass flow is 3.58112 kg/s. The exam leaves the $C_d$ reference undefined, so the two interpretations are stated separately. They describe different coefficient conventions.\n\n$$\nQ_{\\mathrm{ideal},o}=A_o\\sqrt{\\frac{2\\Delta P}{\\rho[1-(A_o/A_1)^2]}}=0.005509416\\ \\mathrm{m^3/s}\n$$\n\n> The main solution follows the exam’s A2 = vena-area route. A hole-referenced Cd and a vena-referenced Cd are not interchangeable without a definition or calibration."
        }
      ],
      "finalAnswer": "Pipe area is 0.00636173 m² and vena area is 0.000473595 m². With vena-referenced Cd, ideal flow is about 0.00367866 m³/s and mass flow is about 2.39113 kg/s. A hole-referenced Cd instead gives about 3.58112 kg/s.\n\n$$\n\\boxed{\\begin{aligned}A_1&=6.36173\\times10^{-3}\\ \\mathrm{m^2}\\\\A_c&=4.73595\\times10^{-4}\\ \\mathrm{m^2}\\\\Q_{\\mathrm{ideal},c}&=3.67866\\times10^{-3}\\ \\mathrm{m^3/s}\\\\\\dot m_c&=2.39113\\ \\mathrm{kg/s}\\quad(C_d:\\ A_2=A_c)\\end{aligned}}\n$$",
      "takeaway": "Centreline velocity is not always the mean velocity."
    },
    "2023-uts2-q1": {
      "title": "Orifice flow and sensor selection",
      "source": "Midterm 2 2023 · Question 1",
      "assumptions": [
        "Equal-elevation taps, steady incompressible flow, g=9.81 m/s². Use the printed viscosity 9.53×10⁻³ Pa·s; do not replace it with a water-property value from another table.",
        "The problem calls d the vena contracta diameter while also supplying an orifice Cd table. This solution follows the definitions and model given in the exam."
      ],
      "exam": {
        "term": "Midterm 2"
      },
      "tags": [
        "Flow measurement"
      ],
      "statement": "An orifice measures water flow with $\\rho_w=1000\\,\\mathrm{kg/m^3}$ and $\\mu=9.53\\times10^{-3}\\,\\mathrm{Pa\\,s}$ at 25 °C. The mercury manometer has $\\rho_m=13600\\,\\mathrm{kg/m^3}$. Pipe diameter $D=800\\,\\mathrm{mm}$, the problem's vena contracta diameter $d=160\\,\\mathrm{mm}$, and mercury level difference $h=45\\,\\mathrm{cm}$.\n(a) Find volume flow rate. (b) Select a flow sensor for a conductive liquid such as H₂SO₄ and explain. (c) Select a sensor for mass flow in kg/s and explain. At $d/D=0.2$, the table gives $C_d=0.600,0.595,0.594,0.594$ for $Re=10^4,10^5,10^6,10^7$.",
      "given": [
        "Pipe diameter: 800 mm",
        "Small diameter: 160 mm",
        "Mercury level difference: 45 cm"
      ],
      "simulation": {
        "title": "Flow through an orifice",
        "caption": "Compare mercury height, pressure difference, and flow rate.",
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
      },
      "steps": [
        {
          "id": "2023-uts2-q1-step-1",
          "title": "1a · Identify the quantity to find",
          "content": "We seek **volume flow rate**, the water volume passing through the pipe each second. The requested unit is m³/s. We convert all lengths to metres before calculating areas.\n\nThe pipe diameter sets the upstream flow area. The smaller diameter sets the restricted area. Mercury height gives a pressure difference, rather than velocity directly.\n\n$$\nD=\\frac{800}{1000}=0.800\\ \\mathrm m,\\quad d=0.160\\ \\mathrm m,\\quad h=\\frac{45}{100}=0.450\\ \\mathrm m\n$$",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Geometry and coefficient definitions must match before converting pressure difference into flow rate.",
            "commonPitfall": "Centreline velocity is not always the mean velocity."
          }
        },
        {
          "id": "2023-uts2-q1-step-2",
          "title": "Convert mercury height into pressure",
          "content": "**Density**, the mass per unit volume, uses symbol $\\rho$, read rho. Both manometer legs contain water above the mercury. The water-column contribution subtracts from the mercury contribution, so we use $\\rho_m-\\rho_w$.\n\nThe two pressure taps are at the same elevation. With $g=9.81\\ \\mathrm{m/s^2}$, the 0.450 m height difference indicates higher upstream pressure. The higher-pressure side pushes mercury downward.\n\n$$\n\\Delta p=(\\rho_m-\\rho_w)gh=(13600-1000)(9.81)(0.450)=55622.7\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2023-uts2-q1-step-3",
          "title": "Use the same flow rate at both sections",
          "content": "In steady flow, water does not keep accumulating between the sections. Constant density makes incoming and outgoing volume rates equal. The **continuity equation**, a statement of flow conservation, expresses that equality.\n\nA circular area is $A=\\pi d^2/4$. Since $Q=Av$, mean velocity at a section is $v=Q/A$. A smaller area needs a higher velocity to carry the same flow rate.\n\n$$\nA_1=\\frac{\\pi(0.800)^2}{4}=0.502655\\ \\mathrm{m^2},\\quad A_2=\\frac{\\pi(0.160)^2}{4}=0.0201062\\ \\mathrm{m^2},\\quad Q=A_1v_1=A_2v_2\n$$"
        },
        {
          "id": "2023-uts2-q1-step-4",
          "title": "Connect increasing speed with decreasing pressure",
          "content": "Bernoulli compares pressure energy, kinetic energy, and elevation energy. Start with an ideal lossless model. A horizontal pipe lets the two elevation terms cancel.\n\nWe subtract downstream pressure from both sides to place the pressure difference on the left. Because the restricted section is faster, upstream pressure is higher in this ideal model.\n\n$$\np_1+\\frac12\\rho_wv_1^2=p_2+\\frac12\\rho_wv_2^2\\quad\\Rightarrow\\quad \\Delta p=\\frac12\\rho_w(v_2^2-v_1^2)\n$$"
        },
        {
          "id": "2023-uts2-q1-step-5",
          "title": "Derive flow rate, then correct for real flow",
          "content": "We substitute $v_1=Q/A_1$ and $v_2=Q/A_2$. Both terms contain $Q^2$, so factor it out. We divide by the area and density factors, then take the positive square root for the flow magnitude.\n\nThe discharge coefficient $C_d$ corrects ideal flow to match real flow. The area ratio is $(d/D)^2$; squaring that area ratio produces $(d/D)^4$.\n\n$$\n\\begin{aligned}\\Delta p&=\\frac{\\rho_wQ_{\\rm ideal}^2}{2A_2^2}\\left[1-\\left(\\frac{A_2}{A_1}\\right)^2\\right]\\\\Q&=C_dQ_{\\rm ideal}=C_dA_2\\sqrt{\\frac{2\\Delta p}{\\rho_w[1-(d/D)^4]}}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uts2-q1-step-6",
          "title": "Calculate the known part of the formula",
          "content": "The diameter ratio is $\\beta=d/D=0.160/0.800=0.2$. We can calculate ideal flow before choosing the matching $C_d$.\n\nThe result 0.2122358 m³/s still needs multiplication by $C_d$. The supplied table gives values near 0.60, so real flow is about 60% of the ideal result in this model.\n\n$$\nQ_{\\rm ideal}=0.0201062\\sqrt{\\frac{2(55622.7)}{1000(1-0.2^4)}}=0.2122358\\ \\mathrm{m^3/s}\n$$"
        },
        {
          "id": "2023-uts2-q1-step-7",
          "title": "Try a discharge coefficient, then check Reynolds number",
          "content": "Reynolds number $Re$ compares fluid inertia with viscous effects. The table needs $Re$, but computing $Re$ needs the unknown velocity. Start with a table estimate, then update it.\n\nWe take $C_d=0.600$ from the $\\beta=0.2$ row. We calculate $Q$, then use $v_1=Q/A_1$ in Reynolds number. The relevant diameter here is the pipe diameter $D$.\n\n$$\nQ^{(0)}=0.600(0.2122358)=0.127341\\ \\mathrm{m^3/s},\\qquad Re=\\frac{\\rho_wv_1D}{\\mu}=\\frac{4\\rho_wQ}{\\pi\\mu D}\\approx2.13\\times10^4\n$$"
        },
        {
          "id": "2023-uts2-q1-step-8",
          "title": "Update the coefficient between the bracketing columns",
          "content": "The Reynolds number lies between $10^4$ and $10^5$. At $\\beta=0.2$, the corresponding coefficients are 0.600 and 0.595. We choose interpolation on a $\\log_{10}Re$ scale because the columns increase by decades.\n\nWe insert the estimated Reynolds number, calculate a new $C_d$, then repeat the flow and Reynolds calculation. The values settle near $C_d=0.59837$ and $Re=21209$.\n\n$$\nC_d=0.600+\\frac{\\log_{10}Re-4}{5-4}(0.595-0.600)\\quad\\Rightarrow\\quad C_d\\approx0.59837\n$$\n\n> The problem does not prescribe an interpolation method. Final digits can vary slightly; the three-significant-figure result is unchanged."
        },
        {
          "id": "2023-uts2-q1-step-9",
          "title": "State the flow rate and check its units",
          "content": "We multiply ideal flow by the final coefficient. Inside the square root, pressure divided by density has units m²/s². The square root is a velocity; multiplying by area gives m³/s.\n\nThe result is below ideal flow, consistent with a coefficient below one. Since 1 m³ = 1000 L, it equals about 127 litres each second.\n\n$$\nQ=0.59837(0.2122358)\\approx\\boxed{0.1270\\ \\mathrm{m^3/s}=127.0\\ \\mathrm{L/s}}\n$$"
        },
        {
          "id": "2023-uts2-q1-step-10",
          "title": "1b · Choose a sensor from the liquid's properties",
          "content": "A conducting liquid can carry electric charge. As it moves across a magnetic field, two electrodes detect a voltage related to flow velocity. This supports choosing an electromagnetic flowmeter.\n\nIn a simple model, $e=BLv$: $B$ is magnetic field strength, $L$ the effective electrode spacing, and $v$ mean velocity. Once $v$ is known, the meter obtains $Q=Av$.\n\nFor H₂SO₄, electrode and liner materials must also suit the acid temperature and concentration. A suitable measurement principle and compatible materials are separate requirements.\n\n$$\ne=BLv,\\qquad Q=Av\n$$"
        },
        {
          "id": "2023-uts2-q1-step-11",
          "title": "1c · Distinguish mass flow from volume flow",
          "content": "Mass flow $\\dot m$, read m dot, is the number of kilograms passing each second. A volume-flow reading needs density to convert it through $\\dot m=\\rho Q$.\n\nA Coriolis flowmeter measures mass flow directly. It vibrates a tube; flowing fluid changes the tube motion and the phase difference at two locations. Calibration relates that phase change to kg/s.\n\nBecause the question asks for a sensor giving kg/s, Coriolis meets that goal without starting from a volume-flow measurement and an assumed fixed density.\n\n$$\n\\dot m=\\rho Q\\quad\\text{for conversion from volume flow}\n$$"
        }
      ],
      "finalAnswer": "Water flow is about 0.1270 m³/s. Use an electromagnetic meter for conductive liquids and a Coriolis meter for direct mass flow.\n\n$$\n\\boxed{Q\\approx0.1270\\ \\mathrm{m^3/s}}\n$$",
      "takeaway": "Centreline velocity is not always the mean velocity."
    },
    "2023-uas-q1": {
      "title": "Venturi and mercury manometer",
      "source": "Final exam 2023 · Question 1",
      "assumptions": [
        "Steady incompressible flow, equal-elevation taps, g=9.81 m/s². Replacement-height comparisons assume fixed flow only where stated."
      ],
      "exam": {
        "term": "Final exam"
      },
      "tags": [
        "Flow measurement"
      ],
      "statement": "A Venturi has $D_A=80\\,\\mathrm{mm}$ and throat diameter $D_B=20\\,\\mathrm{mm}$. Fluid density is $950\\,\\mathrm{kg/m^3}$. A mercury U-tube, density $13600\\,\\mathrm{kg/m^3}$, shows a 50 mm level difference. The discharge coefficient is $C_d=0.97$. (a) Sketch the Venturi and manometer. (b) Derive section-A velocity/flow using Bernoulli. (c) Find volume flow in m³/s. (d) Explain how mercury height and $C_d$ change when a nozzle of the same diameters replaces the Venturi.",
      "simulation": {
        "title": "Flow through a venturi",
        "caption": "The throat accelerates flow and reduces pressure.",
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
      },
      "steps": [
        {
          "id": "2023-uas-q1-step-1",
          "title": "1a · Arrange the Venturi and its two pressure taps",
          "content": "Sketch flow from the large section A through a smooth contraction, throat B, and a gradual expansion or diffuser. Section A has diameter 80 mm; throat B has diameter 20 mm.\n\nConnect pressure taps A and B to the two legs of a mercury U-tube. The process fluid occupies the space above the mercury. Mark h as the vertical difference between the mercury surfaces, not the full column length.\n\nFor flow from A toward B in a horizontal pipe, pressure at A is higher. Mercury in the leg connected to A moves downward, leaving the B-leg surface higher.",
          "hint": "Start with the requested quantity. Check the data and conditions that constrain the model.",
          "rationale": {
            "whyThisMethod": "Geometry and coefficient definitions must match before converting pressure difference into flow rate.",
            "commonPitfall": "Centreline velocity is not always the mean velocity."
          },
          "checkpoint": {
            "prompt": "A Venturi is replaced by a nozzle with the same pipe and throat diameters. For these conditions, the nozzle Cd is known to be lower. The pump holds flow constant and the manometer fluids stay the same. What happens to the manometer height difference?",
            "options": [
              {
                "id": "2023-uas-q1-checkpoint-option-1",
                "label": "It falls because a smaller Cd always means a smaller pressure difference.",
                "feedback": "This ignores the fixed-flow condition. A smaller Cd must be compensated by greater pressure difference."
              },
              {
                "id": "2023-uas-q1-checkpoint-option-2",
                "label": "It rises because the same flow requires a larger pressure difference when Cd is lower.",
                "feedback": "Correct. Pressure difference and manometer height increase to maintain the same flow with lower Cd."
              },
              {
                "id": "2023-uas-q1-checkpoint-option-3",
                "label": "It must become zero because the pump maintains constant flow.",
                "feedback": "The pump maintains flow by supplying the required pressure. Flow regulation does not remove the meter's pressure drop."
              },
              {
                "id": "2023-uas-q1-checkpoint-option-4",
                "label": "It stays the same because both diameters are unchanged.",
                "feedback": "Equal geometry preserves only the geometric factor. Cd still changes the relationship between flow and pressure."
              }
            ]
          }
        },
        {
          "id": "2023-uas-q1-step-2",
          "title": "Read pressure difference from the manometer",
          "content": "We use the difference between mercury and process-fluid densities because the upper parts of both legs also contain process fluid. At equal elevation in stationary mercury, pressures are equal; balancing the two columns gives the following relation.\n\nConvert 50 mm to 0.050 m. The resulting Δp is pA−pB and is positive for the flow direction in the sketch.\n\n$$\n\\Delta p=(\\rho_m-\\rho)gh=(13600-950)(9.81)(0.050)=6204.825\\ \\mathrm{Pa}\n$$"
        },
        {
          "id": "2023-uas-q1-step-3",
          "title": "1b · Use continuity to reduce the unknowns",
          "content": "Steady incompressible flow has the same volume flow rate at A and B. We need not solve for both velocities separately: one can be expressed in terms of the other.\n\nCircular area scales with diameter squared. Since A's diameter is four times B's, its area is $4^2=16$ times as large. Velocity at B is therefore 16 times velocity at A.\n\n$$\nA_Av_A=A_Bv_B,\\qquad v_B=\\frac{A_A}{A_B}v_A,\\qquad\\frac{A_A}{A_B}=\\left(\\frac{80}{20}\\right)^2=16\n$$"
        },
        {
          "id": "2023-uas-q1-step-4",
          "title": "Substitute the velocity relation into Bernoulli",
          "content": "In a horizontal pipe, elevation-energy terms are equal at the two sections. The ideal model relates pressure drop to increasing kinetic energy.\n\nReplace $v_B$ by $(A_A/A_B)v_A$. After squaring, both velocity terms contain $v_A^2$, allowing it to be factored out.\n\n$$\n\\begin{aligned}\\Delta p&=\\frac12\\rho(v_B^2-v_A^2)\\\\&=\\frac12\\rho\\left[\\left(\\frac{A_A}{A_B}v_A\\right)^2-v_A^2\\right]\\\\&=\\frac12\\rho v_A^2\\left[\\left(\\frac{A_A}{A_B}\\right)^2-1\\right]\\end{aligned}\n$$"
        },
        {
          "id": "2023-uas-q1-step-5",
          "title": "Solve for ideal section-A velocity",
          "content": "We multiply both sides by 2, then divide by density and the area-ratio factor. This gives section-A velocity squared. We take the positive root because we seek the speed along the flow direction.\n\nThe squared area ratio becomes the fourth power of the diameter ratio. That fourth power comes from area geometry rather than a separate rule to memorise.\n\n$$\nv_{A,\\rm ideal}=\\sqrt{\\frac{2\\Delta p}{\\rho[(A_A/A_B)^2-1]}}=\\sqrt{\\frac{2\\Delta p}{\\rho[(D_A/D_B)^4-1]}}\n$$"
        },
        {
          "id": "2023-uas-q1-step-6",
          "title": "Convert ideal flow into real flow",
          "content": "The discharge coefficient $C_d=0.97$ makes real flow 97% of ideal flow for this meter and model. Since area is fixed, the same correction also applies to mean section-A velocity.\n\nFlow rate equals area times velocity. The form using throat area $A_B$ below is equivalent to $A_Av_A$, but is shorter for numerical substitution.\n\n$$\nv_A=C_dv_{A,\\rm ideal},\\qquad Q=A_Av_A=C_dA_B\\sqrt{\\frac{2\\Delta p}{\\rho[1-(D_B/D_A)^4]}}\n$$"
        },
        {
          "id": "2023-uas-q1-step-7",
          "title": "1c · Substitute diameters in metres",
          "content": "Convert 20 mm to 0.020 m before calculating throat area. Keeping diameter in millimetres would produce mm² and inconsistent flow units.\n\nThe diameter ratio 0.020/0.080 = 0.25 is dimensionless. We insert the area, pressure, density, and discharge coefficient already found.\n\n$$\n\\begin{aligned}A_B&=\\frac{\\pi(0.020)^2}{4}=3.14159\\times10^{-4}\\ \\mathrm{m^2}\\\\Q&=0.97(3.14159\\times10^{-4})\\sqrt{\\frac{2(6204.825)}{950(1-0.25^4)}}\\\\&=\\boxed{1.10354\\times10^{-3}\\ \\mathrm{m^3/s}}\\end{aligned}\n$$"
        },
        {
          "id": "2023-uas-q1-step-8",
          "title": "Check flow using both velocities",
          "content": "The flow 0.00110354 m³/s equals 1.10354 L/s. We divide it by each section's area to obtain the mean velocities.\n\nThroat velocity is 16 times section-A velocity, agreeing with continuity. This increase also agrees with the lower B pressure indicated by the manometer.\n\n$$\nv_A=\\frac{Q}{\\pi(0.080)^2/4}=0.21954\\ \\mathrm{m/s},\\qquad v_B=\\frac Q{A_B}=3.51269\\ \\mathrm{m/s},\\qquad \\frac{v_B}{v_A}=16\n$$"
        },
        {
          "id": "2023-uas-q1-step-9",
          "title": "1d · Distinguish pressure recovery from measured pressure difference",
          "content": "A Venturi diffuser gradually slows flow after the throat, converting some kinetic energy back into pressure. A nozzle generally recovers less pressure because it lacks the Venturi's long diffuser.\n\nPermanent pressure loss is the pressure not recovered after the meter. Tap pressure difference compares the two measurement locations. Both depend on geometry, but they are not the same quantity.\n\nA nozzle's coefficient depends on design and flow conditions. The range in the notes overlaps 0.97, so not every nozzle necessarily has a lower Cd."
        },
        {
          "id": "2023-uas-q1-step-10",
          "title": "Determine height change by stating what stays fixed",
          "content": "For the same diameters and fluid, write flow as $Q=C_dB\\sqrt h$, with $B$ containing the fixed factors. If flow is also held constant, the two meters satisfy $C_{d,v}\\sqrt{h_v}=C_{d,n}\\sqrt{h_n}$.\n\nWe divide by the nozzle coefficient, then square. If nozzle Cd is lower, mercury height must be larger to produce the same flow. If the pump does not maintain flow, the flow rate can also change.\n\nBecause nozzle Cd and pump conditions are absent, this conditional relationship is justified, but a unique new mercury height is not.\n\n$$\n\\left.\\frac{h_n}{h_v}\\right|_{Q\\ {\\rm fixed}}=\\left(\\frac{C_{d,v}}{C_{d,n}}\\right)^2\n$$\n\n> If driving pressure is fixed, flow can also change. Do not silently assume fixed Q."
        }
      ],
      "finalAnswer": "Flow is 1.10354×10⁻³ m³/s and section-A velocity is 0.21954 m/s. After replacement, mercury height depends on the maintained flow and nozzle Cd.\n\n$$\n\\boxed{Q=1.10354\\times10^{-3}\\ \\mathrm{m^3/s},\\quad v_A=0.21954\\ \\mathrm{m/s}}\n$$",
      "takeaway": "Centreline velocity is not always the mean velocity."
    },
    "ipe-flow-practice": {
      "title": "Practice: Flow measurement",
      "intro": "This practice helps you choose a model and explain your reasoning. Start with multiple-choice questions, review a flawed example, then write your own answer. Use the rubric to check your logic, assumptions, and conclusion limits.",
      "questions": [
        {
          "id": "concept-2023-04",
          "prompt": "A Venturi is replaced by a nozzle with the same pipe and throat diameters. For these conditions, the nozzle Cd is known to be lower. The pump holds flow constant and the manometer fluids stay the same. What happens to the manometer height difference?",
          "options": [
            {
              "id": "concept-2023-04-option-1",
              "label": "It falls because a smaller Cd always means a smaller pressure difference.",
              "feedback": "This ignores the fixed-flow condition. A smaller Cd must be compensated by greater pressure difference."
            },
            {
              "id": "concept-2023-04-option-2",
              "label": "It rises because the same flow requires a larger pressure difference when Cd is lower.",
              "feedback": "Correct. Pressure difference and manometer height increase to maintain the same flow with lower Cd."
            },
            {
              "id": "concept-2023-04-option-3",
              "label": "It must become zero because the pump maintains constant flow.",
              "feedback": "The pump maintains flow by supplying the required pressure. Flow regulation does not remove the meter's pressure drop."
            },
            {
              "id": "concept-2023-04-option-4",
              "label": "It stays the same because both diameters are unchanged.",
              "feedback": "Equal geometry preserves only the geometric factor. Cd still changes the relationship between flow and pressure."
            }
          ],
          "explanation": "For fixed geometry and fluid, flow increases with Cd and the square root of pressure difference. If Cd falls while flow is maintained, pressure difference must rise. Manometer height rises with it. Equal diameters alone do not ensure equal readings, and constant flow does not mean zero pressure difference."
        },
        {
          "id": "concept-2024-03",
          "prompt": "A centreline Pitot tube gives local speed. A student immediately multiplies it by the whole pipe area. For a velocity profile that decreases toward the wall, how should this step be judged?",
          "options": [
            {
              "id": "concept-2024-03-option-1",
              "label": "Too low, because the area near the wall has not been counted.",
              "feedback": "The whole area is already included. The problem is that the selected speed is too large to represent all of it."
            },
            {
              "id": "concept-2024-03-option-2",
              "label": "Too high, because flow rate requires the cross-sectional mean speed.",
              "feedback": "Correct. Flow rate sums local-speed contributions over the section, equivalent to area times mean speed."
            },
            {
              "id": "concept-2024-03-option-3",
              "label": "Correct, because continuity makes speed equal everywhere across a section.",
              "feedback": "Continuity matches flow rate between sections in steady flow, not speeds at every point within one section."
            },
            {
              "id": "concept-2024-03-option-4",
              "label": "It makes no difference, because the profile factor changes only static pressure.",
              "feedback": "The profile factor links centreline speed to mean speed and therefore directly affects flow rate."
            }
          ],
          "explanation": "Centreline speed exceeds the mean for the stated profile. Applying it over the entire area assumes near-wall fluid moves as fast as the centre. Use an appropriate profile relation and check Reynolds number for consistency."
        },
        {
          "id": "concept-2024-05",
          "prompt": "A Cd table is calibrated using the orifice-plate hole area and already includes jet contraction. Someone uses that Cd, then replaces hole area with Cc times hole area to “improve accuracy”. What is the main problem?",
          "options": [
            {
              "id": "concept-2024-05-option-1",
              "label": "Cc has area units, so it cannot appear in a flow equation.",
              "feedback": "Cc is a ratio of two areas and is dimensionless. The problem is inconsistent definitions, not Cc units."
            },
            {
              "id": "concept-2024-05-option-2",
              "label": "Extra correction always improves accuracy if it produces a smaller flow rate.",
              "feedback": "A smaller value is not necessarily closer to reality. Corrections must follow the model and calibration."
            },
            {
              "id": "concept-2024-05-option-3",
              "label": "Contraction can be counted twice because the area and coefficient definitions no longer match.",
              "feedback": "Correct. Check the reference-area definition before combining Cd and Cc."
            },
            {
              "id": "concept-2024-05-option-4",
              "label": "Cd should multiply diameter rather than flow rate.",
              "feedback": "Cd is defined as actual flow divided by ideal flow. It does not directly change diameter."
            }
          ],
          "explanation": "An empirical coefficient is tied to the ideal calculation used in its calibration. If hole-based Cd already includes contraction, reducing area again can duplicate that correction. A vena-based model needs a coefficient referenced consistently."
        },
        {
          "id": "concept-2025-09",
          "prompt": "An orifice problem supplies geometry, pressure difference, density, and a Reynolds-dependent Cd table, but no viscosity. Which answer is best supported?",
          "options": [
            {
              "id": "concept-2025-09-option-1",
              "label": "Take viscosity from another problem that also mentions oil.",
              "feedback": "A shared fluid name does not establish equal viscosity; temperature and oil type matter."
            },
            {
              "id": "concept-2025-09-option-2",
              "label": "Declare turbulent flow solely because pressure difference is nonzero.",
              "feedback": "Laminar flow also requires a pressure difference. Pressure difference alone does not determine regime."
            },
            {
              "id": "concept-2025-09-option-3",
              "label": "Report ideal flow and actual flow as a function of Cd; state the extra data needed to choose Cd.",
              "feedback": "Correct. It solves the determined portion without hiding missing information."
            },
            {
              "id": "concept-2025-09-option-4",
              "label": "Choose the smallest table Cd and present the result as exact.",
              "feedback": "That value applies under its tabulated conditions. Choosing the smallest value does not establish those conditions."
            }
          ],
          "explanation": "The supplied data still determine the ideal calculation. Selecting a Reynolds-dependent coefficient, however, requires flow information that is incomplete without viscosity or equivalent data. A conditional answer keeps data-supported results separate from additional assumptions."
        }
      ],
      "guidedTasks": [
        {
          "id": "ipe-flow-guided",
          "title": "Review an orifice-contraction correction",
          "prompt": "The discharge coefficient uses the plate-hole area and already includes contraction. Check the following step.",
          "workSample": "I use the discharge coefficient from that table. Then I replace the hole area with the contracted jet area for greater accuracy.",
          "question": {
            "prompt": "Why is the final step inappropriate?",
            "options": [
              {
                "id": "ipe-flow-guided-question-option-1",
                "label": "It counts the contraction effect twice.",
                "feedback": "Correct. The coefficient definition must match the area used."
              },
              {
                "id": "ipe-flow-guided-question-option-2",
                "label": "Area never affects flow rate.",
                "feedback": "Area affects flow rate. The problem is using an area inconsistent with the coefficient definition."
              },
              {
                "id": "ipe-flow-guided-question-option-3",
                "label": "Every discharge coefficient must equal one.",
                "feedback": "The coefficient corrects deviations from the ideal model. It need not equal one."
              }
            ],
            "explanation": "Keep the hole area when the coefficient refers to that area. Use jet area only when the model and coefficient explicitly require it."
          }
        }
      ],
      "essayTasks": [
        {
          "id": "ipe-flow-essay",
          "title": "Assess whether flow data are sufficient",
          "prompt": "A question gives orifice geometry, pressure difference, and density. Its discharge-coefficient table depends on Reynolds number, but viscosity is missing. Explain what you can conclude and what additional data you need.",
          "sections": [
            "Model and assumptions",
            "Reasoning",
            "Conclusion and limits"
          ],
          "hints": [
            "Check the relation between Reynolds number and discharge coefficient.",
            "List the quantities needed to determine Reynolds number.",
            "Separate a conditional relation from one numerical result. State the assumptions you would need to test."
          ],
          "rubric": [
            {
              "id": "ipe-flow-rubric-model",
              "label": "Model and assumptions",
              "fullCredit": "Chooses consistent geometry, area, and coefficient definitions.",
              "commonPartialError": "Centreline velocity is not always the mean velocity."
            },
            {
              "id": "ipe-flow-rubric-reasoning",
              "label": "Reasoning",
              "fullCredit": "Explains the relation among flow rate, Reynolds number, and coefficient and the need for viscosity."
            },
            {
              "id": "ipe-flow-rubric-conclusion",
              "label": "Conclusion and limits",
              "fullCredit": "Gives a conditional result or requests missing data without presenting assumptions as facts."
            }
          ],
          "verifiedOutline": "Choose an orifice relation consistent with the geometry and table definition. Flow rate depends on the coefficient, while that coefficient may depend on Reynolds number. Reynolds number needs viscosity and a velocity related to flow rate. Without viscosity, the table does not determine one coefficient. Give a relation or conditional result with explicit assumptions. Request viscosity at the operating temperature or evidence supporting a constant-coefficient range."
        }
      ]
    }
  }
};

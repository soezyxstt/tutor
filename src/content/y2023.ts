import type { ExamQuestion, PracticeQuestion } from "./types";

export const questions2023: ExamQuestion[] = [
  {
    id: "2023-uts2-q1",
    year: 2023,
    exam: "uts2",
    number: 1,
    title: {
      id: "Debit orifice dan pilihan sensor",
      en: "Orifice flow and sensor selection",
    },
    topic: "flow",
    source: {
      url: "https://drive.google.com/file/d/1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7/view",
      file: "2023-uts2.pdf",
      pages: [1],
    },
    originalLanguage: "en",
    original:
      "1. Flowmeter Sensors\nAn orifice-type flowmeter measures the flow of water with density of \\(\\rho_w=1000\\,\\mathrm{kg/m^3}\\) and the absolute viscosity of water at 25 °C is \\(9.53\\times10^{-3}\\,\\mathrm{Ns/m^2}\\). The flowmeter utilizes a tube filled up by mercury with density of \\(\\rho_m=13600\\,\\mathrm{kg/m^3}\\). Pipe diameter and vena contracta diameter are \\(D=800\\,\\mathrm{mm}\\) and \\(d=160\\,\\mathrm{mm}\\), respectively. During the measurement, mercury levels indicate discrepancy as \\(h=45\\,\\mathrm{cm}\\).\na. [15%] Calculate flowrate (q) of the water in m³/s.\nb. [10%] What type of sensor is suitable for measuring the flow rate of a conductive fluid such as H₂SO₄? Explain.\nc. [10%] Which type of sensor can be used to measure mass flow rate in kilograms per second? Explain.\nTable 1. Coefficient of discharge Cd for orifice plate: Reynolds number columns 10⁴, 10⁵, 10⁶, 10⁷. Rows d/D: 0.2 → 0.600, 0.595, 0.594, 0.594; 0.4 → 0.610, 0.603, 0.598, 0.598; 0.5 → 0.620, 0.608, 0.603, 0.603; 0.6 → 0.630, 0.610, 0.608, 0.608; 0.7 → 0.640, 0.614, 0.609, 0.609.",
    prompt: {
      id: "Orifice mengukur aliran air dengan \\(\\rho_w=1000\\,\\mathrm{kg/m^3}\\), \\(\\mu=9.53\\times10^{-3}\\,\\mathrm{Pa\\,s}\\) pada 25 °C. Manometer berisi raksa dengan \\(\\rho_m=13600\\,\\mathrm{kg/m^3}\\). Diameter pipa \\(D=800\\,\\mathrm{mm}\\), diameter vena contracta yang dipakai soal \\(d=160\\,\\mathrm{mm}\\), dan beda tinggi raksa \\(h=45\\,\\mathrm{cm}\\).\n(a) Hitung debit volume. (b) Pilih sensor aliran untuk cairan konduktif seperti H₂SO₄ dan jelaskan alasannya. (c) Pilih sensor untuk debit massa dalam kg/s dan jelaskan prinsipnya. Untuk \\(d/D=0.2\\), tabel memberi \\(C_d=0.600,0.595,0.594,0.594\\) pada \\(Re=10^4,10^5,10^6,10^7\\).",
      en: "An orifice measures water flow with \\(\\rho_w=1000\\,\\mathrm{kg/m^3}\\) and \\(\\mu=9.53\\times10^{-3}\\,\\mathrm{Pa\\,s}\\) at 25 °C. The mercury manometer has \\(\\rho_m=13600\\,\\mathrm{kg/m^3}\\). Pipe diameter \\(D=800\\,\\mathrm{mm}\\), the problem's vena contracta diameter \\(d=160\\,\\mathrm{mm}\\), and mercury level difference \\(h=45\\,\\mathrm{cm}\\).\n(a) Find volume flow rate. (b) Select a flow sensor for a conductive liquid such as H₂SO₄ and explain. (c) Select a sensor for mass flow in kg/s and explain. At \\(d/D=0.2\\), the table gives \\(C_d=0.600,0.595,0.594,0.594\\) for \\(Re=10^4,10^5,10^6,10^7\\).",
    },
    givens: [
      {
        label: {
          id: "Diameter pipa",
          en: "Pipe diameter",
        },
        value: "800 mm",
      },
      {
        label: {
          id: "Diameter kecil",
          en: "Small diameter",
        },
        value: "160 mm",
      },
      {
        label: {
          id: "Beda tinggi raksa",
          en: "Mercury level difference",
        },
        value: "45 cm",
      },
    ],
    steps: [
      {
        title: {
          id: "1a · Tentukan besaran yang dicari",
          en: "1a · Identify the quantity to find",
        },
        body: [
          {
            id: "Kita mencari **debit volume** (volume air yang melewati pipa tiap detik), Q. Satuan yang diminta adalah m³/s. Kita perlu mengubah semua panjang menjadi meter sebelum menghitung luas.",
            en: "We seek **volume flow rate**, the water volume passing through the pipe each second. The requested unit is m³/s. We convert all lengths to metres before calculating areas.",
          },
          {
            id: "Diameter pipa menentukan luas aliran di hulu. Diameter kecil menentukan luas aliran di bagian sempit. Beda tinggi raksa memberi beda tekanan, bukan kecepatan secara langsung.",
            en: "The pipe diameter sets the upstream flow area. The smaller diameter sets the restricted area. Mercury height gives a pressure difference, rather than velocity directly.",
          },
        ],
        math: "D=\\frac{800}{1000}=0.800\\ \\mathrm m,\\quad d=0.160\\ \\mathrm m,\\quad h=\\frac{45}{100}=0.450\\ \\mathrm m",
      },
      {
        title: {
          id: "Ubah beda tinggi raksa menjadi tekanan",
          en: "Convert mercury height into pressure",
        },
        body: [
          {
            id: "**Massa jenis** (massa per volume) memakai simbol \\(\\rho\\), dibaca rho. Kedua kaki manometer berisi air di atas raksa. Pengaruh kolom air mengurangi pengaruh kolom raksa, sehingga kita memakai \\(\\rho_m-\\rho_w\\).",
            en: "**Density**, the mass per unit volume, uses symbol \\(\\rho\\), read rho. Both manometer legs contain water above the mercury. The water-column contribution subtracts from the mercury contribution, so we use \\(\\rho_m-\\rho_w\\).",
          },
          {
            id: "Kedua tap berada pada ketinggian yang sama. Dengan \\(g=9.81\\ \\mathrm{m/s^2}\\), selisih tinggi 0.450 m memberi tekanan hulu yang lebih besar. Sisi bertekanan lebih besar menekan raksa ke bawah.",
            en: "The two pressure taps are at the same elevation. With \\(g=9.81\\ \\mathrm{m/s^2}\\), the 0.450 m height difference indicates higher upstream pressure. The higher-pressure side pushes mercury downward.",
          },
        ],
        math: "\\Delta p=(\\rho_m-\\rho_w)gh=(13600-1000)(9.81)(0.450)=55622.7\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "Gunakan debit yang sama pada dua penampang",
          en: "Use the same flow rate at both sections",
        },
        body: [
          {
            id: "Pada aliran tunak, air tidak terus menumpuk di antara dua penampang. Massa jenis tetap membuat debit masuk sama dengan debit keluar. **Persamaan kontinuitas** (hubungan kekekalan aliran) menyatakan kesamaan tersebut.",
            en: "In steady flow, water does not keep accumulating between the sections. Constant density makes incoming and outgoing volume rates equal. The **continuity equation**, a statement of flow conservation, expresses that equality.",
          },
          {
            id: "Luas lingkaran adalah \\(A=\\pi d^2/4\\). Hubungan \\(Q=Av\\) memberi kecepatan rata-rata \\(v=Q/A\\). Luas yang lebih kecil memerlukan kecepatan lebih tinggi untuk melewatkan debit yang sama.",
            en: "A circular area is \\(A=\\pi d^2/4\\). Since \\(Q=Av\\), mean velocity at a section is \\(v=Q/A\\). A smaller area needs a higher velocity to carry the same flow rate.",
          },
        ],
        math: "A_1=\\frac{\\pi(0.800)^2}{4}=0.502655\\ \\mathrm{m^2},\\quad A_2=\\frac{\\pi(0.160)^2}{4}=0.0201062\\ \\mathrm{m^2},\\quad Q=A_1v_1=A_2v_2",
      },
      {
        title: {
          id: "Hubungkan kenaikan kecepatan dengan penurunan tekanan",
          en: "Connect increasing speed with decreasing pressure",
        },
        body: [
          {
            id: "Bernoulli membandingkan energi tekanan, energi gerak, dan energi ketinggian fluida. Kita mulai dari model ideal tanpa rugi aliran; pipa mendatar membuat kedua suku ketinggian saling menghapus.",
            en: "Bernoulli compares pressure energy, kinetic energy, and elevation energy. Start with an ideal lossless model. A horizontal pipe lets the two elevation terms cancel.",
          },
          {
            id: "Kita kurangi tekanan hilir pada kedua ruas untuk membentuk selisih tekanan. Bagian sempit memiliki kecepatan lebih tinggi. Pada model ideal ini, kenaikan kecepatan tersebut membutuhkan tekanan hulu yang lebih tinggi.",
            en: "We subtract downstream pressure from both sides to place the pressure difference on the left. Because the restricted section is faster, upstream pressure is higher in this ideal model.",
          },
        ],
        math: "p_1+\\frac12\\rho_wv_1^2=p_2+\\frac12\\rho_wv_2^2\\quad\\Rightarrow\\quad \\Delta p=\\frac12\\rho_w(v_2^2-v_1^2)",
      },
      {
        title: {
          id: "Turunkan rumus debit, lalu beri koreksi aliran nyata",
          en: "Derive flow rate, then correct for real flow",
        },
        body: [
          {
            id: "Kita masukkan \\(v_1=Q/A_1\\) dan \\(v_2=Q/A_2\\). Kedua suku memuat \\(Q^2\\), sehingga kita dapat mengeluarkannya sebagai faktor. Setelah membagi dengan faktor luas dan massa jenis, ambil akar positif untuk besar debit.",
            en: "We substitute \\(v_1=Q/A_1\\) and \\(v_2=Q/A_2\\). Both terms contain \\(Q^2\\), so factor it out. We divide by the area and density factors, then take the positive square root for the flow magnitude.",
          },
          {
            id: "Koefisien debit \\(C_d\\) mengoreksi model ideal terhadap aliran nyata. Rasio luas adalah \\((d/D)^2\\); saat rasio luas dikuadratkan, muncul \\((d/D)^4\\).",
            en: "The discharge coefficient \\(C_d\\) corrects ideal flow to match real flow. The area ratio is \\((d/D)^2\\); squaring that area ratio produces \\((d/D)^4\\).",
          },
        ],
        math: "\\begin{aligned}\\Delta p&=\\frac{\\rho_wQ_{\\rm ideal}^2}{2A_2^2}\\left[1-\\left(\\frac{A_2}{A_1}\\right)^2\\right]\\\\Q&=C_dQ_{\\rm ideal}=C_dA_2\\sqrt{\\frac{2\\Delta p}{\\rho_w[1-(d/D)^4]}}\\end{aligned}",
      },
      {
        title: {
          id: "Hitung bagian rumus yang sudah diketahui",
          en: "Calculate the known part of the formula",
        },
        body: [
          {
            id: "Rasio diameter \\(\\beta=d/D=0.160/0.800=0.2\\). Kita dapat menghitung debit ideal lebih dulu, meskipun \\(C_d\\) yang sesuai belum dipilih.",
            en: "The diameter ratio is \\(\\beta=d/D=0.160/0.800=0.2\\). We can calculate ideal flow before choosing the matching \\(C_d\\).",
          },
          {
            id: "Hasil 0.2122358 m³/s masih perlu dikalikan \\(C_d\\). Tabel pada soal menunjukkan nilai sekitar 0.60, sehingga debit nyata diperkirakan sekitar 60% dari hasil ideal dalam model ini.",
            en: "The result 0.2122358 m³/s still needs multiplication by \\(C_d\\). The supplied table gives values near 0.60, so real flow is about 60% of the ideal result in this model.",
          },
        ],
        math: "Q_{\\rm ideal}=0.0201062\\sqrt{\\frac{2(55622.7)}{1000(1-0.2^4)}}=0.2122358\\ \\mathrm{m^3/s}",
      },
      {
        title: {
          id: "Coba Cd, lalu periksa bilangan Reynolds",
          en: "Try a discharge coefficient, then check Reynolds number",
        },
        body: [
          {
            id: "Bilangan Reynolds \\(Re\\) membandingkan pengaruh gerak fluida dengan pengaruh kekentalan. Tabel memerlukan \\(Re\\), tetapi perhitungan \\(Re\\) memerlukan kecepatan yang belum kita ketahui. Kita mulai dengan tebakan tabel, lalu memperbaruinya.",
            en: "Reynolds number \\(Re\\) compares fluid inertia with viscous effects. The table needs \\(Re\\), but computing \\(Re\\) needs the unknown velocity. Start with a table estimate, then update it.",
          },
          {
            id: "Kita ambil \\(C_d=0.600\\) dari baris \\(\\beta=0.2\\). Kita hitung \\(Q\\), lalu gunakan \\(v_1=Q/A_1\\) pada rumus Reynolds. Diameter yang dipakai di sini adalah diameter pipa \\(D\\).",
            en: "We take \\(C_d=0.600\\) from the \\(\\beta=0.2\\) row. We calculate \\(Q\\), then use \\(v_1=Q/A_1\\) in Reynolds number. The relevant diameter here is the pipe diameter \\(D\\).",
          },
        ],
        math: "Q^{(0)}=0.600(0.2122358)=0.127341\\ \\mathrm{m^3/s},\\qquad Re=\\frac{\\rho_wv_1D}{\\mu}=\\frac{4\\rho_wQ}{\\pi\\mu D}\\approx2.13\\times10^4",
      },
      {
        title: {
          id: "Perbarui Cd dari dua kolom yang mengapit Re",
          en: "Update the coefficient between the bracketing columns",
        },
        body: [
          {
            id: "Nilai Reynolds berada antara \\(10^4\\) dan \\(10^5\\). Pada baris \\(\\beta=0.2\\), kedua nilai \\(C_d\\) adalah 0.600 dan 0.595. Kita pilih interpolasi pada skala \\(\\log_{10}Re\\), karena kolom naik per kelipatan sepuluh.",
            en: "The Reynolds number lies between \\(10^4\\) and \\(10^5\\). At \\(\\beta=0.2\\), the corresponding coefficients are 0.600 and 0.595. We choose interpolation on a \\(\\log_{10}Re\\) scale because the columns increase by decades.",
          },
          {
            id: "Kita masukkan Reynolds hasil tebakan, hitung \\(C_d\\) baru, lalu ulangi perhitungan debit dan Reynolds. Hasilnya stabil di sekitar \\(C_d=0.59837\\) dan \\(Re=21209\\).",
            en: "We insert the estimated Reynolds number, calculate a new \\(C_d\\), then repeat the flow and Reynolds calculation. The values settle near \\(C_d=0.59837\\) and \\(Re=21209\\).",
          },
        ],
        math: "C_d=0.600+\\frac{\\log_{10}Re-4}{5-4}(0.595-0.600)\\quad\\Rightarrow\\quad C_d\\approx0.59837",
        note: {
          id: "Soal tidak menetapkan cara interpolasi. Digit akhir dapat sedikit berubah; tiga angka penting tetap sama.",
          en: "The problem does not prescribe an interpolation method. Final digits can vary slightly; the three-significant-figure result is unchanged.",
        },
      },
      {
        title: {
          id: "Nyatakan debit dan periksa satuannya",
          en: "State the flow rate and check its units",
        },
        body: [
          {
            id: "Kita kalikan debit ideal dengan koefisien akhir. Di dalam akar, tekanan dibagi massa jenis memberi satuan m²/s². Akar itu berupa kecepatan; setelah dikali luas, hasilnya m³/s.",
            en: "We multiply ideal flow by the final coefficient. Inside the square root, pressure divided by density has units m²/s². The square root is a velocity; multiplying by area gives m³/s.",
          },
          {
            id: "Hasilnya lebih kecil dari debit ideal, sesuai koefisien yang kurang dari satu. Hubungan 1 m³ = 1000 L memberi debit sekitar 127 liter tiap detik.",
            en: "The result is below ideal flow, consistent with a coefficient below one. Since 1 m³ = 1000 L, it equals about 127 litres each second.",
          },
        ],
        math: "Q=0.59837(0.2122358)\\approx\\boxed{0.1270\\ \\mathrm{m^3/s}=127.0\\ \\mathrm{L/s}}",
      },
      {
        title: {
          id: "1b · Pilih sensor berdasarkan sifat cairan",
          en: "1b · Choose a sensor from the liquid's properties",
        },
        body: [
          {
            id: "Cairan konduktif dapat membawa muatan listrik. Saat cairan itu melintasi medan magnet, dua elektroda membaca tegangan yang terkait dengan kecepatan alirannya. Prinsip ini mendukung pilihan flowmeter elektromagnetik.",
            en: "A conducting liquid can carry electric charge. As it moves across a magnetic field, two electrodes detect a voltage related to flow velocity. This supports choosing an electromagnetic flowmeter.",
          },
          {
            id: "Pada bentuk sederhana, \\(e=BLv\\): \\(B\\) adalah kuat medan magnet, \\(L\\) jarak efektif elektroda, dan \\(v\\) kecepatan rata-rata. Setelah memperoleh \\(v\\), alat menghitung \\(Q=Av\\).",
            en: "In a simple model, \\(e=BLv\\): \\(B\\) is magnetic field strength, \\(L\\) the effective electrode spacing, and \\(v\\) mean velocity. Once \\(v\\) is known, the meter obtains \\(Q=Av\\).",
          },
          {
            id: "Untuk H₂SO₄, pemilihan alat juga perlu menyesuaikan bahan elektroda dan pelapis dengan suhu serta konsentrasi asam. Kesesuaian prinsip ukur dan ketahanan bahan merupakan dua syarat yang berbeda.",
            en: "For H₂SO₄, electrode and liner materials must also suit the acid temperature and concentration. A suitable measurement principle and compatible materials are separate requirements.",
          },
        ],
        math: "e=BLv,\\qquad Q=Av",
      },
      {
        title: {
          id: "1c · Bedakan debit massa dari debit volume",
          en: "1c · Distinguish mass flow from volume flow",
        },
        body: [
          {
            id: "Debit massa \\(\\dot m\\), dibaca m titik, menyatakan kilogram yang lewat tiap detik. Jika alat hanya memberi debit volume, kita perlu massa jenis untuk mengubahnya menjadi \\(\\dot m=\\rho Q\\).",
            en: "Mass flow \\(\\dot m\\), read m dot, is the number of kilograms passing each second. A volume-flow reading needs density to convert it through \\(\\dot m=\\rho Q\\).",
          },
          {
            id: "Flowmeter Coriolis memberi pengukuran debit massa langsung. Alat menggetarkan tabung; fluida yang bergerak di dalamnya mengubah gerak dan beda fase tabung pada dua titik. Kalibrasi menghubungkan perubahan fase itu dengan kg/s.",
            en: "A Coriolis flowmeter measures mass flow directly. It vibrates a tube; flowing fluid changes the tube motion and the phase difference at two locations. Calibration relates that phase change to kg/s.",
          },
          {
            id: "Soal meminta sensor dengan keluaran kg/s. Coriolis memenuhi tujuan tersebut tanpa memulai dari debit volume dan asumsi massa jenis tetap.",
            en: "Because the question asks for a sensor giving kg/s, Coriolis meets that goal without starting from a volume-flow measurement and an assumed fixed density.",
          },
        ],
        math: "\\dot m=\\rho Q\\quad\\text{for conversion from volume flow}",
      },
    ],
    answer: {
      id: "Debit air sekitar 0.1270 m³/s. Gunakan flowmeter elektromagnetik untuk cairan konduktif dan Coriolis untuk debit massa langsung.",
      en: "Water flow is about 0.1270 m³/s. Use an electromagnetic meter for conductive liquids and a Coriolis meter for direct mass flow.",
    },
    answerMath: "\\boxed{Q\\approx0.1270\\ \\mathrm{m^3/s}}",
    assumptions: [
      {
        id: "Tap sama tinggi, aliran tunak tak termampatkan, g=9.81 m/s². Pakai viskositas 9.53×10⁻³ Pa·s persis seperti soal; jangan menggantinya dengan nilai air dari tabel lain.",
        en: "Equal-elevation taps, steady incompressible flow, g=9.81 m/s². Use the printed viscosity 9.53×10⁻³ Pa·s; do not replace it with a water-property value from another table.",
      },
      {
        id: "Soal menyebut d sebagai diameter vena contracta tetapi juga memakai tabel Cd orifice. Pembahasan mengikuti definisi dan model dalam soal.",
        en: "The problem calls d the vena contracta diameter while also supplying an orifice Cd table. This solution follows the definitions and model given in the exam.",
      },
    ],
    visual: {
      kind: "orifice",
      caption: {
        id: "Lihat hubungan beda tinggi raksa, beda tekanan, dan debit.",
        en: "Compare mercury height, pressure difference, and flow rate.",
      },
      params: {
        D: 0.8,
        d: 0.16,
        rho: 1000,
        rhoManometer: 13600,
        h: 0.45,
        mu: 0.00953,
        Cd: 0.5983674312,
        dp: 55622.7,
      },
    },
    referencePages: [7, 9, 10, 12],
  },
  {
    id: "2023-uts2-q2",
    year: 2023,
    exam: "uts2",
    number: 2,
    title: {
      id: "Termokopel dan respons RTD",
      en: "Thermocouple and RTD response",
    },
    topic: "temperature",
    source: {
      url: "https://drive.google.com/file/d/1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7/view",
      file: "2023-uts2.pdf",
      pages: [1, 4],
    },
    originalLanguage: "en",
    original:
      "2. Temperature Sensors: Thermocouple & RTD\na. [10%] A type K thermocouple is used to measure the machine temperature of T = 340 °C. The reference temperatur for the thermocouple is Tref = 100 °C. Calculate the output voltage of the thermocouple during the measurement. You may see the table given in the attachment to this document.\nb. [10%] An RTD can be modeled as a first order system with a time constant 0.5 seconds and a sensitivity 0.004 Ω/°C. There are no biases in the system. Initially the RTD is at steady 20 °C with its resistance 100 Ω. The temperature suddenly changes at t = 1 second to 100 °C.\ni. Find the differential equation model of the RTD that relates changes temperature input to resistance output.\nii. What will be the RTD's resistance at t = 2 seconds?\nAttached type K table, reference junction 0 °C: E(100 °C)=4.096 mV; E(340 °C)=13.874 mV.",
    prompt: {
      id: "(a) Termokopel K mengukur suhu 340 °C dengan sambungan referensi 100 °C. Hitung tegangan keluaran memakai tabel yang beracuan 0 °C: \\(E_K(340,0)=13.874\\,\\mathrm{mV}\\) dan \\(E_K(100,0)=4.096\\,\\mathrm{mV}\\).\n(b) RTD orde satu memiliki \\(\\tau=0.5\\,\\mathrm{s}\\) dan sensitivitas \\(0.004\\,\\Omega/{}^\\circ\\mathrm C\\). Soal menyatakan tidak ada bias. Awalnya \\(T=20\\,{}^\\circ\\mathrm C\\), \\(R=100\\,\\Omega\\), dan keadaan tunak. Pada \\(t=1\\,\\mathrm{s}\\), suhu berubah menjadi 100 °C. (i) Susun persamaan diferensial perubahan suhu ke tahanan. (ii) Hitung \\(R(2\\,\\mathrm{s})\\).",
      en: "(a) A type K thermocouple measures 340 °C with a 100 °C reference junction. Find its output using the 0 °C-reference table: \\(E_K(340,0)=13.874\\,\\mathrm{mV}\\) and \\(E_K(100,0)=4.096\\,\\mathrm{mV}\\).\n(b) A first-order RTD has \\(\\tau=0.5\\,\\mathrm{s}\\) and sensitivity \\(0.004\\,\\Omega/{}^\\circ\\mathrm C\\). The problem states no bias. Initially it is steady at \\(T=20\\,{}^\\circ\\mathrm C\\) and \\(R=100\\,\\Omega\\). At \\(t=1\\,\\mathrm{s}\\), temperature becomes 100 °C. (i) Form the temperature-change-to-resistance differential equation. (ii) Find \\(R(2\\,\\mathrm{s})\\).",
    },
    steps: [
      {
        title: {
          id: "2a · Baca arti angka pada tabel termokopel",
          en: "2a · Read what the thermocouple table represents",
        },
        body: [
          {
            id: "Dua sambungan logam berbeda dapat menghasilkan tegangan saat suhunya berbeda. **Termokopel** (sensor suhu yang membaca tegangan tersebut) memakai prinsip ini. Satu suhu saja belum cukup untuk menentukan tegangan keluaran.",
            en: "Two junctions of dissimilar metals can produce voltage when their temperatures differ. A **thermocouple**, a temperature sensor that reads this voltage, uses that effect. One temperature alone cannot determine its output.",
          },
          {
            id: "Notasi \\(E_K(T,0)\\) berarti tegangan tipe K saat sambungan ukur berada pada \\(T\\) dan sambungan referensi pada 0°C. Soal memakai referensi 100°C, sehingga angka tabel 340°C belum menjadi jawaban akhir.",
            en: "The notation \\(E_K(T,0)\\) means type K voltage with a measuring junction at \\(T\\) and a reference junction at 0°C. This problem uses a 100°C reference, so the 340°C table entry is not yet the final answer.",
          },
        ],
        math: "E_K(340,0)=13.874\\ \\mathrm{mV},\\qquad E_K(100,0)=4.096\\ \\mathrm{mV}",
      },
      {
        title: {
          id: "Kurangi dua tegangan yang memakai acuan sama",
          en: "Subtract two voltages with the same reference",
        },
        body: [
          {
            id: "Kita menghilangkan pengaruh referensi 0°C dengan mengurangkan tegangan 100°C dari tegangan 340°C. Hasilnya adalah tegangan antara kedua suhu pada soal.",
            en: "We subtract the 100°C table voltage from the 340°C table voltage to remove the common 0°C reference contribution. The result is the voltage between the two stated temperatures.",
          },
          {
            id: "Nilainya positif karena sambungan ukur lebih panas dalam polaritas tabel. Jangan mencari tabel pada 240°C: mengurangkan suhu lebih dulu akan menganggap hubungan suhu dengan tegangan selalu linear.",
            en: "The value is positive because the measuring junction is hotter under the table's polarity convention. Do not look up 240°C: subtracting temperatures first would assume a linear relationship between temperature and voltage.",
          },
        ],
        math: "E_K(340,100)=E_K(340,0)-E_K(100,0)=13.874-4.096=\\boxed{9.778\\ \\mathrm{mV}}",
      },
      {
        title: {
          id: "2b(i) · Pisahkan nilai awal dan perubahan RTD",
          en: "2b(i) · Separate the RTD baseline from its change",
        },
        body: [
          {
            id: "Tahanan elemen logam berubah saat suhunya berubah. **RTD** (sensor suhu dengan elemen tahanan logam) membaca perubahan tersebut. Sensitivitas 0.004 Ω/°C berarti kenaikan suhu 1°C memberi kenaikan tahanan akhir 0.004 Ω.",
            en: "A metal element changes resistance as its temperature changes. An **RTD**, a temperature sensor with a metal resistance element, reads that change. Sensitivity 0.004 Ω/°C means a 1°C rise produces a final resistance rise of 0.004 Ω.",
          },
          {
            id: "Nilai awalnya sudah diketahui: 20°C dan 100 Ω. Kita definisikan \\(\\Delta T=T-20\\) dan \\(\\Delta R=R-100\\). Kedua perubahan bernilai nol sebelum suhu berubah.",
            en: "The baseline is given: 20°C and 100 Ω. We define \\(\\Delta T=T-20\\) and \\(\\Delta R=R-100\\). Both changes are zero before the temperature step.",
          },
          {
            id: "Pernyataan tanpa bias cocok untuk perubahan ini. Model absolut \\(R=0.004T\\) justru memberi 0.08 Ω pada 20°C, sehingga bertentangan dengan nilai awal soal.",
            en: "The no-bias statement fits these changes. An absolute model \\(R=0.004T\\) would give 0.08 Ω at 20°C, contradicting the stated baseline.",
          },
        ],
        math: "\\Delta T=T-20,\\qquad \\Delta R=R-100",
      },
      {
        title: {
          id: "Susun model orde satu",
          en: "Form the first-order model",
        },
        body: [
          {
            id: "Orde satu berarti persamaan memuat turunan pertama keluaran terhadap waktu. Konstanta waktu \\(\\tau\\) mengatur laju respons; semakin besar \\(\\tau\\), semakin lama keluaran mendekati nilai akhirnya.",
            en: "First order means the equation contains the first time derivative of the output. The time constant \\(\\tau\\) sets response speed; a larger \\(\\tau\\) makes the output approach its final value more slowly.",
          },
          {
            id: "Suku \\(K\\Delta T\\) adalah perubahan tahanan yang dituju pada keadaan tunak. Suku \\(\\tau\\,d\\Delta R/dt\\) menjelaskan selisih sementara antara target itu dan perubahan tahanan saat ini.",
            en: "The term \\(K\\Delta T\\) is the target steady resistance change. The term \\(\\tau\\,d\\Delta R/dt\\) accounts for the temporary difference between that target and the current resistance change.",
          },
        ],
        math: "\\tau\\frac{d\\Delta R}{dt}+\\Delta R=K\\Delta T\\quad\\Rightarrow\\quad0.5\\frac{d\\Delta R}{dt}+\\Delta R=0.004\\Delta T",
        visual: {
          kind: "rtd",
          caption: {
            id: "Respons tahanan dimulai saat suhu berubah pada t=1 s.",
            en: "Resistance responds when temperature changes at t=1 s.",
          },
          params: {
            tau: 0.5,
            initialTemperature: 20,
            finalTemperature: 100,
            initialResistance: 100,
            stepTime: 1,
            evaluationTime: 2,
            K: 0.004,
            initial: 100,
            final: 100.32,
          },
        },
      },
      {
        title: {
          id: "Tulis persamaan dengan suhu dan tahanan asli",
          en: "Write the equation using absolute temperature and resistance",
        },
        body: [
          {
            id: "Nilai awal 100 Ω adalah konstanta, sehingga turunannya nol: \\(d(R-100)/dt=dR/dt\\). Kita ganti kedua variabel perubahan dengan definisinya untuk memperoleh model yang diminta.",
            en: "The 100 Ω baseline is constant, so its derivative is zero: \\(d(R-100)/dt=dR/dt\\). We substitute the two deviation definitions to obtain the requested model.",
          },
          {
            id: "Cek satuannya: 0.5 s dikali laju tahanan Ω/s menghasilkan Ω. Ruas kanan juga Ω karena sensitivitas Ω/°C dikali perubahan suhu °C.",
            en: "Check the units: 0.5 s times a resistance rate in Ω/s gives Ω. The right side also has units Ω because sensitivity in Ω/°C multiplies a temperature change in °C.",
          },
        ],
        math: "\\boxed{0.5\\frac{dR}{dt}+R-100=0.004(T-20)}",
      },
      {
        title: {
          id: "Cari tahanan akhir setelah suhu berubah",
          en: "Find the final resistance after the temperature step",
        },
        body: [
          {
            id: "Pada keadaan tunak, tahanan sudah tidak berubah terhadap waktu, sehingga suku turunannya nol. Model lalu menjadi perubahan tahanan = sensitivitas × perubahan suhu.",
            en: "At steady state, resistance no longer changes with time, so its derivative is zero. The model then becomes resistance change = sensitivity × temperature change.",
          },
          {
            id: "Suhu naik dari 20°C ke 100°C, yaitu 80°C. Perubahan tahanan akhirnya 0.320 Ω; nilai ini perlu ditambahkan pada 100 Ω, bukan menggantikannya.",
            en: "Temperature rises from 20°C to 100°C, a change of 80°C. The final resistance change is 0.320 Ω; add it to the 100 Ω baseline rather than replacing that baseline.",
          },
        ],
        math: "\\Delta T=100-20=80^\\circ\\mathrm C,\\quad\\Delta R_\\infty=0.004(80)=0.320\\ \\Omega,\\quad R_\\infty=100.320\\ \\Omega",
      },
      {
        title: {
          id: "Mulai waktu respons saat perubahan terjadi",
          en: "Start the response clock at the temperature step",
        },
        body: [
          {
            id: "Suhu belum berubah sebelum t=1 s. Sensor awalnya tunak, sehingga tahanan tetap 100 Ω sepanjang selang itu.",
            en: "Temperature has not changed before t=1 s. Since the sensor starts at equilibrium, resistance remains 100 Ω during that interval.",
          },
          {
            id: "Untuk \\(t\\ge1\\), gunakan waktu berjalan \\(t-1\\). Saat pembacaan pada t=2 s, respons baru berlangsung 1 s. Dengan \\(\\tau=0.5\\) s, ini setara dua konstanta waktu.",
            en: "For \\(t\\ge1\\), use elapsed time \\(t-1\\). At the reading time t=2 s, the response has lasted only 1 s. With \\(\\tau=0.5\\) s, this is two time constants.",
          },
        ],
        math: "\\Delta t=t-t_0=2-1=1\\ \\mathrm s,\\qquad\\frac{\\Delta t}{\\tau}=\\frac{1}{0.5}=2",
      },
      {
        title: {
          id: "Gunakan bentuk respons yang memenuhi kondisi awal",
          en: "Use a response that satisfies the initial condition",
        },
        body: [
          {
            id: "Respons langkah orde satu menyisakan fraksi \\(e^{-\\Delta t/\\tau}\\) dari perubahan yang belum selesai. Oleh karena itu, fraksi perubahan yang sudah selesai adalah \\(1-e^{-\\Delta t/\\tau}\\).",
            en: "A first-order step response leaves a fraction \\(e^{-\\Delta t/\\tau}\\) of the change unfinished. The completed fraction is therefore \\(1-e^{-\\Delta t/\\tau}\\).",
          },
          {
            id: "Kita kalikan fraksi selesai dengan perubahan akhir 0.320 Ω, lalu tambahkan tahanan awal. Saat t=1 s, eksponensial bernilai satu dan perubahan keluaran masih nol.",
            en: "We multiply the completed fraction by the final change of 0.320 Ω, then add initial resistance. At t=1 s, the exponential equals one, leaving zero output change.",
          },
        ],
        math: "R(t)=100+0.320\\left(1-e^{-(t-1)/0.5}\\right),\\qquad t\\ge1",
        visual: {
          kind: "rtd",
          caption: {
            id: "Bandingkan tahanan saat ini dengan nilai akhirnya.",
            en: "Compare current resistance with its final value.",
          },
          params: {
            tau: 0.5,
            initialTemperature: 20,
            finalTemperature: 100,
            initialResistance: 100,
            stepTime: 1,
            evaluationTime: 2,
            K: 0.004,
            initial: 100,
            final: 100.32,
          },
        },
      },
      {
        title: {
          id: "2b(ii) · Hitung tahanan pada t=2 s",
          en: "2b(ii) · Evaluate resistance at t=2 s",
        },
        body: [
          {
            id: "Kita masukkan waktu berjalan 1 s. Nilai \\(e^{-2}=0.135335\\), sehingga fraksi perubahan yang selesai adalah \\(1-0.135335=0.864665\\).",
            en: "We substitute the elapsed time of 1 s. Since \\(e^{-2}=0.135335\\), the completed fraction is \\(1-0.135335=0.864665\\).",
          },
          {
            id: "Kenaikan tahanan saat pembacaan adalah sekitar 0.276693 Ω. Tambahkan nilai itu ke 100 Ω untuk mendapat pembacaan sensor.",
            en: "The resistance increase at the reading time is about 0.276693 Ω. Add that increase to 100 Ω to obtain the sensor reading.",
          },
        ],
        math: "\\begin{aligned}R(2)&=100+0.320(1-e^{-2})\\\\&=100+0.320(0.864665)\\\\&=\\boxed{100.27669\\ \\Omega}\\end{aligned}",
        visual: {
          kind: "rtd",
          caption: {
            id: "Titik pada t=2 s menunjukkan hasil hitungan.",
            en: "The point at t=2 s shows the calculated reading.",
          },
          params: {
            tau: 0.5,
            initialTemperature: 20,
            finalTemperature: 100,
            initialResistance: 100,
            stepTime: 1,
            evaluationTime: 2,
            K: 0.004,
            initial: 100,
            final: 100.32,
          },
        },
      },
      {
        title: {
          id: "Periksa batas dan arti sensitivitas",
          en: "Check the limits and the meaning of sensitivity",
        },
        body: [
          {
            id: "Hasil berada antara 100 Ω dan 100.320 Ω, sesuai sensor yang sedang mendekati keadaan akhir. Pada waktu yang sangat lama, eksponensial menuju nol dan tahanan menuju 100.320 Ω.",
            en: "The result lies between 100 Ω and 100.320 Ω, as expected while the sensor approaches equilibrium. At very long times the exponential approaches zero and resistance approaches 100.320 Ω.",
          },
          {
            id: "Jangan kalikan 0.004 dengan 100 Ω lagi. Satuan yang diberikan Ω/°C sudah menyatakan perubahan tahanan langsung. Koefisien relatif per °C akan membutuhkan model dan satuan yang berbeda.",
            en: "Do not multiply 0.004 by 100 Ω again. Its stated units Ω/°C already describe the resistance change directly. A relative coefficient per °C would require different units and a different model.",
          },
        ],
      },
    ],
    answer: {
      id: "Tegangan termokopel 9.778 mV. Model RTD memakai perubahan dari 20 °C dan 100 Ω; pada t=2 s, tahanan 100.27669 Ω.",
      en: "Thermocouple output is 9.778 mV. Use the RTD deviation model about 20 °C and 100 Ω; at t=2 s, resistance is 100.27669 Ω.",
    },
    answerMath:
      "\\boxed{\\begin{aligned}E_K&=9.778\\ \\mathrm{mV}\\\\R(2)&=100.27669\\ \\Omega\\end{aligned}}",
    assumptions: [
      {
        id: "Pernyataan tanpa bias ditafsirkan untuk variabel perubahan. Model mutlak tanpa offset tidak dapat memenuhi nilai awal dan sensitivitas yang sama.",
        en: "The no-bias statement is interpreted for deviation variables. An absolute model with zero offset cannot satisfy the stated initial value and sensitivity together.",
      },
    ],
    visual: {
      kind: "thermocouple",
      caption: {
        id: "Dua suhu sambungan menentukan tegangan yang terbaca.",
        en: "Both junction temperatures determine the measured voltage.",
      },
      params: {
        type: "K",
        hotEmf: 13.874,
        coldEmf: 4.096,
        T: 340,
        Tref: 100,
      },
    },
    referencePages: [2, 3, 4, 24, 25],
  },
  {
    id: "2023-uts2-q3",
    year: 2023,
    exam: "uts2",
    number: 3,
    title: {
      id: "Encoder, sensor level, dan LVDT",
      en: "Encoders, level sensing, and LVDT",
    },
    topic: "position",
    source: {
      url: "https://drive.google.com/file/d/1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7/view",
      file: "2023-uts2.pdf",
      pages: [2],
    },
    originalLanguage: "en",
    original:
      "3. Position Sensors\na. [5%] Please explain the differences between absolute and incremental encoders, in terms of construction and output signals?\nb. [5%] A capacitive-based sensor is used to measure the liquid level in a tank. Assuming the dielectric constant of the liquid is k times of air, surface area of the sensor is A, and the distance between surfaces is D. Determine the capacitance of the sensor as shown in the figure below.\nFigure labels: total height h; air height h1; liquid height h2; probe bottom clearance h0; metal shell, measured material, inner electrode, outer electrode.\nc. [5%] Sketch a signal conditioner to measure changes in capacitance in the level sensor at question [b].\nd. [5%] Please explain how the following LVDT works?\ne. [5%] What is the advantage and disadvantage of an LVDT over a potentiometer?",
    prompt: {
      id: "(a) Bandingkan konstruksi dan keluaran encoder absolut dengan inkremental. (b) Sensor kapasitif mengukur level cairan; permitivitas cairan \\(k\\) kali udara, luas aktif elektroda \\(A\\), dan celah \\(D\\). Pada gambar, \\(h=h_1+h_2\\), sedangkan ujung bawah elektroda berada \\(h_0\\) di atas dasar tangki. Turunkan kapasitansinya. (c) Gambar pengondisi sinyal untuk perubahan kapasitansi itu. (d) Jelaskan kerja LVDT pada gambar. (e) Jelaskan keunggulan dan kekurangan LVDT terhadap potensiometer.",
      en: "(a) Compare absolute and incremental encoder construction and outputs. (b) A capacitive sensor measures liquid level; liquid permittivity is \\(k\\) times that of air, active electrode area is \\(A\\), and gap is \\(D\\). The figure has \\(h=h_1+h_2\\), with the electrode tip \\(h_0\\) above the tank bottom. Derive capacitance. (c) Sketch a signal conditioner for this capacitance change. (d) Explain the pictured LVDT. (e) Compare LVDT advantages and disadvantages with a potentiometer.",
    },
    steps: [
      {
        title: {
          id: "3a · Baca posisi dari kode encoder absolut",
          en: "3a · Read position from an absolute encoder code",
        },
        body: [
          {
            id: "Posisi mekanis dapat kita baca sebagai sinyal listrik melalui **encoder** (alat pembaca posisi). Encoder absolut memakai pola pada cakram atau skala. Pola tersebut memberi kode berbeda untuk setiap posisi yang dapat dibedakan alat.",
            en: "We can read mechanical position electrically using an **encoder**, a device that converts position into a signal. An absolute encoder uses a disc or scale pattern. Its pattern gives a different code for each distinguishable position.",
          },
          {
            id: "Pada encoder optik, pembaca membaca beberapa jalur bersama sebagai satu kata kode biner atau Gray. Kode menunjukkan posisi saat itu. Pembaca dapat mengenali sudut dalam satu putaran tanpa menghitung gerak sejak alat menyala.",
            en: "In an optical encoder, the reader combines several tracks into a binary or Gray code word. The code identifies the current position. The reader can recognise single-turn angle without counting motion from startup.",
          },
          {
            id: "Batas satu putaran tetap penting: kemampuan mengenali jumlah putaran memerlukan rancangan multiturn, bukan hanya lebih banyak kode dalam satu putaran.",
            en: "The one-revolution limit matters: identifying completed revolutions requires a multiturn design, rather than simply more codes within one turn.",
          },
        ],
      },
      {
        title: {
          id: "Baca perubahan posisi dari encoder inkremental",
          en: "Read position changes from an incremental encoder",
        },
        body: [
          {
            id: "Encoder inkremental memakai pola terang dan gelap atau pola magnetik yang berulang. Saat pola melewati pembaca, keluaran menjadi rangkaian pulsa. Pulsa itu memberi informasi gerak, bukan kode posisi yang unik.",
            en: "An incremental encoder uses a repeating optical or magnetic pattern. As the pattern passes the reader, the output becomes a pulse train. Those pulses describe motion rather than a unique position code.",
          },
          {
            id: "Kanal A dan B biasanya bergeser seperempat siklus. Kanal yang lebih dulu berubah memberi arah putaran; jumlah pulsa yang dihitung memberi perubahan sudut. Kanal Z dapat memberi satu tanda acuan tiap putaran.",
            en: "Channels A and B are usually a quarter-cycle apart. Which channel changes first gives direction; the number of counted pulses gives angular change. Channel Z can supply one reference mark per turn.",
          },
          {
            id: "Jika hitungan hilang saat daya mati, pembaca perlu menemukan acuan lagi, kecuali sistem memiliki cara lain untuk menyimpan posisi. Menambah kanal Z tidak membuat setiap sudut memiliki kode absolut.",
            en: "If power loss erases the count, the readout needs to find a reference again unless another method preserves position. Adding channel Z does not give every angle an absolute code.",
          },
        ],
      },
      {
        title: {
          id: "3b · Tentukan bagian probe yang aktif",
          en: "3b · Identify the active part of the probe",
        },
        body: [
          {
            id: "Pada sensor level, udara dan cairan mengisi ruang di antara dua elektroda. Permitivitas \\(\\varepsilon\\) menyatakan pengaruh bahan di ruang itu terhadap kapasitansi; cairan memiliki nilai \\(k\\varepsilon_{\\rm air}\\).",
            en: "In the level sensor, air and liquid occupy the gap between two electrodes. Permittivity \\(\\varepsilon\\) describes how the material in that gap affects capacitance; the liquid has value \\(k\\varepsilon_{\\rm air}\\).",
          },
          {
            id: "Probe mulai pada ketinggian \\(h_0\\) dari dasar. Jadi panjang aktifnya \\(L=h-h_0\\). Untuk level cairan \\(h_2\\), panjang probe yang tercelup adalah \\(h_2-h_0\\), selama level masih di antara ujung bawah dan ujung atas probe.",
            en: "The probe starts at height \\(h_0\\) above the bottom. Its active length is therefore \\(L=h-h_0\\). At liquid level \\(h_2\\), the immersed probe length is \\(h_2-h_0\\), as long as the level lies between the probe's bottom and top.",
          },
        ],
        math: "L=h-h_0,\\qquad\\eta=\\frac{h_2-h_0}{h-h_0},\\qquad0\\le\\eta\\le1",
        visual: {
          kind: "capacitive",
          caption: {
            id: "Hanya bagian elektroda yang tercelup yang berubah permitivitasnya.",
            en: "Only the immersed electrode section changes permittivity.",
          },
          params: {
            height: 1,
            deadHeight: 0.1,
            level: 0.5,
            k: 4,
            area: 0.02,
            gap: 0.005,
          },
        },
      },
      {
        title: {
          id: "Tentukan luas yang berhadapan dengan tiap bahan",
          en: "Find the electrode area facing each material",
        },
        body: [
          {
            id: "Luas \\(A\\) pada soal adalah seluruh luas elektroda aktif. Jika bentuknya seragam sepanjang tinggi, fraksi panjang yang tercelup sama dengan fraksi luas yang tercelup. Maka \\(A_{\\rm cair}=A\\eta\\).",
            en: "The stated area \\(A\\) is the entire active electrode area. With a uniform shape along the height, the immersed length fraction equals the immersed area fraction. Thus \\(A_{\\rm liquid}=A\\eta\\).",
          },
          {
            id: "Sisa luas masih berhadapan dengan udara. Menjumlahkan kedua luas harus mengembalikan A; cek ini membantu menghindari menghitung daerah yang sama dua kali.",
            en: "The remaining area still faces air. Adding the two areas must return A; this check helps avoid counting the same region twice.",
          },
        ],
        math: "A_{\\rm liquid}=A\\eta,\\qquad A_{\\rm air}=A(1-\\eta),\\qquad A_{\\rm liquid}+A_{\\rm air}=A",
      },
      {
        title: {
          id: "Jumlahkan kapasitansi dua daerah yang paralel",
          en: "Add the capacitances of the parallel regions",
        },
        body: [
          {
            id: "Kedua daerah berada pada pasangan elektroda yang sama, sehingga tegangannya sama. Muatan dari daerah udara dan cairan menambah muatan total. Hubungan ini sama dengan dua kapasitor paralel.",
            en: "Both regions lie across the same electrodes and have the same voltage. Their charges add to the total charge. This electrical arrangement behaves as parallel capacitors.",
          },
          {
            id: "Pada model pelat sejajar atau celah tipis, \\(C=\\varepsilon A/D\\), dengan \\(D\\) jarak elektroda. Kita gunakan permitivitas udara pada luas udara, dan \\(k\\varepsilon_{\\rm air}\\) pada luas cairan.",
            en: "For a parallel-plate or thin-gap model, \\(C=\\varepsilon A/D\\), where \\(D\\) is electrode spacing. We use air permittivity over the air area and \\(k\\varepsilon_{\\rm air}\\) over the liquid area.",
          },
        ],
        math: "\\begin{aligned}C&=C_{\\rm air\\ region}+C_{\\rm liquid\\ region}\\\\&=\\frac{\\varepsilon_{\\rm air}A(1-\\eta)}D+\\frac{k\\varepsilon_{\\rm air}A\\eta}D\\\\&=\\frac{\\varepsilon_{\\rm air}A}D[1+(k-1)\\eta]\\end{aligned}",
      },
      {
        title: {
          id: "Tulis rumus sesuai semua tinggi pada gambar",
          en: "Express the formula using the figure heights",
        },
        body: [
          {
            id: "Kita masukkan definisi \\(\\eta\\) ke persamaan kapasitansi. Panjang bagian berisi udara adalah \\(h_1=h-h_2\\), sehingga \\(L-(h_2-h_0)=h_1\\).",
            en: "We substitute the definition of \\(\\eta\\) into capacitance. The air-filled length is \\(h_1=h-h_2\\), so \\(L-(h_2-h_0)=h_1\\).",
          },
          {
            id: "Faktor di luar kurung memuat luas per panjang aktif. Isi kurung menjumlahkan panjang udara dan panjang cairan yang diberi bobot k. Tidak ada angka dimensi yang perlu ditebak karena soal meminta bentuk simbolik.",
            en: "The factor outside the brackets contains area per active length. Inside, air length adds to liquid length weighted by k. No dimensions need to be guessed because the question asks for a symbolic expression.",
          },
        ],
        math: "\\boxed{C=\\frac{\\varepsilon_{\\rm air}A}{D(h-h_0)}[h_1+k(h_2-h_0)]},\\qquad h_0\\le h_2\\le h",
      },
      {
        title: {
          id: "Cek probe kosong, penuh, dan batas geometri",
          en: "Check empty, full, and geometric limits",
        },
        body: [
          {
            id: "Saat level tepat di ujung bawah, \\(\\eta=0\\) dan seluruh celah aktif berisi udara: \\(C=C_{\\rm air}=\\varepsilon_{\\rm air}A/D\\). Saat probe terendam penuh, \\(\\eta=1\\) dan \\(C=kC_{\\rm air}\\).",
            en: "At the probe's bottom tip, \\(\\eta=0\\) and the entire active gap contains air: \\(C=C_{\\rm air}=\\varepsilon_{\\rm air}A/D\\). At full immersion, \\(\\eta=1\\) and \\(C=kC_{\\rm air}\\).",
          },
          {
            id: "Jika cairan masih di bawah \\(h_0\\), sensor belum merespons kenaikan level karena probe belum tercelup. Jika \\(k=1\\), mengganti udara dengan cairan juga tidak mengubah kapasitansi.",
            en: "If liquid remains below \\(h_0\\), the probe is not yet immersed and does not respond to the level rise. If \\(k=1\\), replacing air with liquid also leaves capacitance unchanged.",
          },
          {
            id: "Rumus \\(A/D\\) memakai celah tipis. Untuk dua silinder konsentris dengan jari-jari \\(a,b\\), gunakan bentuk tepat \\(C=2\\pi\\varepsilon_{\\rm air}[h_1+k(h_2-h_0)]/\\ln(b/a)\\). Pembagian daerahnya tetap sama.",
            en: "The \\(A/D\\) formula assumes a thin gap. For concentric cylinders of radii \\(a,b\\), use the exact form \\(C=2\\pi\\varepsilon_{\\rm air}[h_1+k(h_2-h_0)]/\\ln(b/a)\\). The division into regions stays the same.",
          },
        ],
        visual: {
          kind: "capacitive",
          caption: {
            id: "Cek batas kosong dan penuh untuk memeriksa rumus.",
            en: "Check empty and full limits to verify the formula.",
          },
          params: {
            height: 1,
            deadHeight: 0.1,
            level: 0.5,
            k: 4,
            area: 0.02,
            gap: 0.005,
          },
        },
      },
      {
        title: {
          id: "3c · Susun jembatan untuk membaca kapasitansi",
          en: "3c · Arrange a bridge to read capacitance",
        },
        body: [
          {
            id: "Kita perlu mengubah kapasitansi menjadi sinyal yang mudah dibaca. Satu pilihan adalah **jembatan AC** (rangkaian pembanding dengan catu bolak-balik). Letakkan \\(C_s\\) di kiri atas, \\(C_{\\rm ref}\\) di kiri bawah, dan dua resistor sama besar di kanan.",
            en: "We need to convert capacitance into a readable signal. One choice is an **AC bridge**, a comparison circuit driven by alternating voltage. Place \\(C_s\\) upper-left, \\(C_{\\rm ref}\\) lower-left, and equal resistors in the right arms.",
          },
          {
            id: "Beri tegangan AC antara titik atas dan bawah. Ukur selisih kedua titik tengah. AC memberi arus bolak-balik melalui kapasitor, sedangkan setelah transien selesai, catu DC tetap tidak memberi arus melalui kapasitor ideal.",
            en: "Apply AC between the top and bottom nodes, and measure the midpoint difference. AC produces alternating capacitor current; after transients end, a steady DC supply produces no current through an ideal capacitor.",
          },
        ],
        visual: {
          kind: "bridge",
          caption: {
            id: "Jembatan AC mengubah ketidakseimbangan kapasitansi menjadi tegangan.",
            en: "The AC bridge converts capacitance imbalance into voltage.",
          },
          params: {
            mode: "capacitive",
            Cs: 100,
            Cref: 100,
            R: 10000,
            excitation: 1,
          },
        },
      },
      {
        title: {
          id: "Ikuti keluaran jembatan hingga menjadi pembacaan level",
          en: "Follow bridge output into a level reading",
        },
        body: [
          {
            id: "Impedansi kapasitor berbanding terbalik dengan kapasitansi: \\(Z_C=1/(j\\omega C)\\). Oleh karena itu, pembagi tegangan sisi kiri memberi \\(V_{\\rm ex}C_s/(C_s+C_{\\rm ref})\\); sisi kanan selalu memberi \\(V_{\\rm ex}/2\\).",
            en: "Capacitor impedance is inversely proportional to capacitance: \\(Z_C=1/(j\\omega C)\\). The left divider therefore gives \\(V_{\\rm ex}C_s/(C_s+C_{\\rm ref})\\); the right divider gives \\(V_{\\rm ex}/2\\).",
          },
          {
            id: "Saat \\(C_s=C_{\\rm ref}\\), selisihnya nol. Perubahan level mengubah \\(C_s\\), lalu mengubah tegangan selisih. Penguat diferensial memperbesar selisih itu; demodulator sinkron dan penyaring lolos rendah menghasilkan keluaran untuk tampilan level.",
            en: "When \\(C_s=C_{\\rm ref}\\), the difference is zero. A level change alters \\(C_s\\), then the difference voltage. A differential amplifier increases that difference; a synchronous demodulator and low-pass filter produce an output for the level display.",
          },
        ],
        math: "V_b=V_{\\rm ex}\\left(\\frac{C_s}{C_s+C_{\\rm ref}}-\\frac12\\right)",
      },
      {
        title: {
          id: "3d · Susun kumparan LVDT dan baca selisihnya",
          en: "3d · Arrange the LVDT windings and read their difference",
        },
        body: [
          {
            id: "LVDT mengukur perpindahan lurus. Gambar skemanya memuat satu kumparan primer, dua kumparan sekunder, dan inti besi yang dapat bergerak sepanjang sumbu kumparan.",
            en: "An LVDT measures linear displacement. Its sketch needs one primary winding, two secondary windings, and an iron core moving along the winding axis.",
          },
          {
            id: "Eksitasi AC pada primer memberi fluks magnet bolak-balik. Posisi inti menentukan seberapa kuat fluks menghubungkan primer dengan tiap sekunder. Hubungkan kedua sekunder berlawanan agar keluaran menjadi \\(V_1-V_2\\).",
            en: "AC primary excitation creates alternating magnetic flux. Core position sets the coupling from the primary to each secondary. Connect the secondaries in opposition so the output becomes \\(V_1-V_2\\).",
          },
          {
            id: "Pada posisi tengah, kedua tegangan hampir sama dan saling menghapus. Pergeseran inti meningkatkan satu kopling dan mengurangi kopling lainnya, sehingga selisih tidak lagi nol.",
            en: "At the centre, the two voltages are almost equal and cancel. Core motion strengthens one coupling and weakens the other, creating a nonzero difference.",
          },
        ],
        math: "V_o=V_1-V_2",
        visual: {
          kind: "lvdt",
          caption: {
            id: "Inti mengubah kopling dua sekunder; selisihnya menunjukkan posisi.",
            en: "The core changes both secondary couplings; their difference indicates position.",
          },
          params: {
            range: 10,
            sensitivity: 0.31,
            x: 0,
          },
        },
      },
      {
        title: {
          id: "Baca besar dan arah perpindahan LVDT",
          en: "Read both magnitude and direction from an LVDT",
        },
        body: [
          {
            id: "Dalam daerah linear, amplitudo selisih tegangan sebanding dengan besar perpindahan. Tetapi dua posisi pada sisi berlawanan dapat memberi amplitudo yang sama.",
            en: "Within the linear range, voltage-difference amplitude is proportional to displacement magnitude. Two positions on opposite sides can nevertheless have the same amplitude.",
          },
          {
            id: "Fase sinyal terhadap eksitasi membedakan kedua sisi: sinyal berbalik fase 180° saat inti melewati tengah. Demodulator peka fase memakai informasi ini untuk memberi tegangan DC positif atau negatif.",
            en: "Signal phase relative to excitation distinguishes the sides: crossing the centre reverses phase by 180°. A phase-sensitive demodulator uses that information to produce positive or negative DC voltage.",
          },
          {
            id: "Pada model di bawah, \\(x\\) adalah perpindahan bertanda dan \\(\\omega_c\\) frekuensi sudut eksitasi. Membaca amplitudo saja akan membuang informasi tanda \\(x\\).",
            en: "In the model below, \\(x\\) is signed displacement and \\(\\omega_c\\) the excitation angular frequency. Reading amplitude alone would discard the sign of \\(x\\).",
          },
        ],
        math: "V_o(t)=K_xx\\sin(\\omega_ct),\\qquad V_{\\rm DC}\\propto x",
        visual: {
          kind: "lvdt",
          caption: {
            id: "Perubahan fase menjaga informasi arah simpangan.",
            en: "Phase preserves displacement direction.",
          },
          params: {
            range: 10,
            sensitivity: 0.31,
            x: 2,
          },
        },
      },
      {
        title: {
          id: "3e · Pilih LVDT atau potensiometer sesuai kebutuhan",
          en: "3e · Choose an LVDT or potentiometer for the task",
        },
        body: [
          {
            id: "Potensiometer memakai kontak geser listrik, atau wiper, untuk membaca bagian tahanan sepanjang lintasan. Rangkaiannya ringkas dan dapat memakai catu DC, tetapi kontaknya dapat aus dan menambah derau.",
            en: "A potentiometer uses a sliding electrical contact, or wiper, to read the resistance along its track. Its circuit is compact and can use DC excitation, but the contact can wear and introduce noise.",
          },
          {
            id: "LVDT tidak membutuhkan kontak geser listrik pada inti. Keunggulannya adalah gerak ukur yang halus tanpa keausan wiper. Namun alat memerlukan eksitasi AC dan pengondisi sinyal; ukuran serta biayanya dapat lebih besar.",
            en: "An LVDT needs no sliding electrical contact on the core. It measures motion smoothly without wiper wear, but needs AC excitation and signal conditioning. Size and cost can also be greater.",
          },
          {
            id: "Keduanya tetap memiliki batas: LVDT perlu bekerja dalam daerah linearnya, dan resolusi praktisnya dipengaruhi derau serta rangkaian baca. Tidak adanya wiper tidak berarti ketelitian tak terbatas.",
            en: "Both still have limits: an LVDT must stay in its linear region, and practical resolution depends on noise and readout electronics. Absence of a wiper does not mean unlimited accuracy.",
          },
        ],
      },
    ],
    answer: {
      id: "Encoder absolut memberi kode posisi; inkremental memberi pulsa perubahan posisi. Kapasitansi menjumlahkan daerah udara dan cairan. Jembatan AC membaca perubahannya. LVDT membaca selisih dua sekunder tanpa kontak geser listrik.",
      en: "Absolute encoders provide position codes; incremental encoders provide motion pulses. Capacitance adds the air and liquid regions. An AC bridge reads its change. An LVDT senses the secondary-voltage difference without sliding electrical contact.",
    },
    answerMath:
      "\\boxed{C=\\frac{\\varepsilon_{\\rm air}A}{D}\\left[1+(k-1)\\frac{h_2-h_0}{h-h_0}\\right]}",
    assumptions: [
      {
        id: "A adalah luas seluruh elektroda aktif, bukan luas dasar tangki. Rumus A/D memakai model pelat sejajar atau celah silinder yang tipis; abaikan efek ujung dan kapasitansi kabel.",
        en: "A is the total active electrode area, not the tank floor area. The A/D formula uses a parallel-plate or thin cylindrical-gap model; neglect fringing and cable capacitance.",
      },
      {
        id: "Dimensi visual level merupakan contoh untuk mengeksplorasi rumus. Soal hanya memberi variabel, bukan angka dimensi.",
        en: "Level-visual dimensions are illustrative values for exploring the formula. The exam gives variables, not numerical dimensions.",
      },
    ],
    visual: {
      kind: "encoder",
      caption: {
        id: "Kode absolut menyatakan posisi, sedangkan pulsa A/B menyatakan perubahan dan arah.",
        en: "Absolute codes represent position; A/B pulses represent change and direction.",
      },
      params: {
        bits: 4,
        pulses: 16,
        theta: 45,
      },
    },
    referencePages: [14, 15, 16, 17, 21, 22, 23],
  },
  {
    id: "2023-uts2-q4",
    year: 2023,
    exam: "uts2",
    number: 4,
    title: {
      id: "Doppler dan tegangan vibrometer",
      en: "Doppler and vibrometer voltage",
    },
    topic: "dynamics",
    source: {
      url: "https://drive.google.com/file/d/1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7/view",
      file: "2023-uts2.pdf",
      pages: [2, 3],
    },
    originalLanguage: "en",
    original:
      "4. Velocity Sensors\na. [10%] A policeman detects speeding drivers using a Doppler sensor. Let the car emits sound with frequency of 880 Hz while it is speeding at 120 km/h. Calculate sound frequency detected by the sensor when the car is approaching the policeman. Also, calculate the frequency after the driver passing the policeman. (Assume the speed of sound at 1 atm and 20°C is 330 m/s).\nb. [10%] A velocity transducer (vibrometer) as shown in the figure below has sensitivity of 40 mV/(cm/sec) in frequency range 10 Hz ≤ f ≤ 2000 Hz. The induced voltage of the sensor is given by e ≈ BLv where B is the magnetic field strength, L is the length of the coil, and v is the motion velocity of the coil. Since B and L are constant, then e ≈ Kv where K is the sensitivity of the sensor. If the sensor measures vibration with constant acceleration amplitude as 1G (9.81 m/s²), calculate the amplitude of output voltage at 10 Hz and at 2000 Hz.",
    prompt: {
      id: "(a) Mobil memancarkan bunyi 880 Hz dan bergerak 120 km/jam. Polisi diam; cepat rambat bunyi 330 m/s. Hitung frekuensi saat mobil mendekati, lalu menjauhi polisi. (b) Vibrometer memiliki sensitivitas \\(40\\,\\mathrm{mV/(cm/s)}\\) pada \\(10\\le f\\le2000\\,\\mathrm{Hz}\\). Tegangannya \\(e\\approx BLv=Kv\\). Untuk getaran sinus dengan amplitudo percepatan tetap \\(1g=9.81\\,\\mathrm{m/s^2}\\), hitung amplitudo tegangan pada 10 Hz dan 2000 Hz.",
      en: "(a) A car emits 880 Hz sound while travelling at 120 km/h. The police observer is stationary; sound speed is 330 m/s. Find the observed frequency when the car approaches and when it recedes. (b) A vibrometer has sensitivity \\(40\\,\\mathrm{mV/(cm/s)}\\) over \\(10\\le f\\le2000\\,\\mathrm{Hz}\\), with \\(e\\approx BLv=Kv\\). For sinusoidal vibration with fixed acceleration amplitude \\(1g=9.81\\,\\mathrm{m/s^2}\\), find output-voltage amplitude at 10 Hz and 2000 Hz.",
    },
    steps: [
      {
        title: {
          id: "4a · Tentukan sumber, pengamat, dan satuan kecepatan",
          en: "4a · Identify the source, observer, and speed units",
        },
        body: [
          {
            id: "Mobil memancarkan bunyi 880 Hz, sehingga mobil adalah sumber bergerak. Polisi menerima bunyi sambil diam. Kita memakai model Doppler sumber bergerak, dengan udara sebagai medium yang diam.",
            en: "The car emits sound at 880 Hz, so it is the moving source. The stationary officer receives that sound. We use the moving-source Doppler model with stationary air.",
          },
          {
            id: "Kecepatan mobil dan kecepatan bunyi harus memakai satuan yang sama. Ubah 120 km/h menjadi m/s dengan mengalikan 1000 m/km dan membagi 3600 s/jam.",
            en: "Car speed and sound speed must use the same units. Convert 120 km/h to m/s by multiplying by 1000 m/km and dividing by 3600 s/hour.",
          },
        ],
        math: "v_s=120\\frac{1000}{3600}=33.3333\\ \\mathrm{m/s},\\qquad c=330\\ \\mathrm{m/s},\\qquad f_s=880\\ \\mathrm{Hz}",
      },
      {
        title: {
          id: "Cari jarak antarpuncak bunyi saat mobil mendekat",
          en: "Find wave-crest spacing during approach",
        },
        body: [
          {
            id: "Dalam satu periode \\(T_s=1/f_s\\), puncak bunyi bergerak sejauh \\(cT_s\\). Selama waktu yang sama, mobil maju sejauh \\(v_sT_s\\) sebelum memancarkan puncak berikutnya.",
            en: "In one source period \\(T_s=1/f_s\\), a sound crest travels \\(cT_s\\). During the same time, the car moves forward by \\(v_sT_s\\) before emitting the next crest.",
          },
          {
            id: "Jarak dua puncak di depan sumber menjadi \\(\\lambda=(c-v_s)T_s\\). Pengamat diam menerima puncak dengan laju \\(f=c/\\lambda\\). Penyebut lebih kecil daripada \\(c\\), sehingga frekuensi naik.",
            en: "The spacing ahead of the source becomes \\(\\lambda=(c-v_s)T_s\\). A stationary observer receives crests at rate \\(f=c/\\lambda\\). The denominator is smaller than \\(c\\), so frequency rises.",
          },
        ],
        math: "\\lambda_{\\rm approach}=\\frac{c-v_s}{f_s},\\qquad f_{\\rm approach}=\\frac c{\\lambda_{\\rm approach}}=f_s\\frac c{c-v_s}",
      },
      {
        title: {
          id: "Hitung frekuensi saat mendekat",
          en: "Calculate the approaching frequency",
        },
        body: [
          {
            id: "Kita masukkan kecepatan dengan tanda pengurangan, sesuai jarak puncak yang memendek. Pengurangan terjadi pada penyebut karena sumber bergerak, sedangkan pengamat tetap diam.",
            en: "We insert the speeds with subtraction, matching the shorter crest spacing. The subtraction belongs in the denominator because the source moves while the observer stays still.",
          },
          {
            id: "Hasil harus lebih besar dari 880 Hz. Angka sekitar 978.88 Hz memenuhi cek arah ini.",
            en: "The result must exceed 880 Hz. The value near 978.88 Hz passes this direction check.",
          },
        ],
        math: "f_{\\rm approach}=880\\frac{330}{330-33.3333}=\\boxed{978.88\\ \\mathrm{Hz}}",
      },
      {
        title: {
          id: "Balik perubahan jarak puncak saat mobil menjauh",
          en: "Reverse the crest-spacing change during recession",
        },
        body: [
          {
            id: "Saat mobil menjauh, posisi emisi berikutnya makin jauh dari polisi. Jarak puncak yang menuju polisi bertambah, sehingga penyebut berubah menjadi c+vs.",
            en: "As the car recedes, the next emission point is farther from the officer. Spacing between crests travelling toward the officer increases, so the denominator becomes c+vs.",
          },
          {
            id: "Hasil berada di bawah 880 Hz. Kedua hasil menganggap gerak segaris dengan polisi; lintasan menyamping memerlukan komponen kecepatan radial.",
            en: "The result falls below 880 Hz. Both results assume motion along the line to the officer; an oblique path needs the radial velocity component.",
          },
          {
            id: "Walaupun soal menyebut deteksi Doppler polisi, data menyatakan bunyi berasal dari mobil. Oleh karena itu, kita tidak menambahkan faktor pantulan radar yang mengalami pergeseran pada perjalanan pergi dan pulang.",
            en: "Although the question mentions police Doppler detection, its data describe sound emitted by the car. We therefore do not add the two-way shift of a reflected radar signal.",
          },
        ],
        math: "f_{\\rm recede}=880\\frac{330}{330+33.3333}=\\boxed{799.27\\ \\mathrm{Hz}}",
      },
      {
        title: {
          id: "4b · Tentukan besaran yang langsung dibaca vibrometer",
          en: "4b · Identify what the vibrometer measures directly",
        },
        body: [
          {
            id: "Vibrometer pada soal menghasilkan tegangan yang sebanding dengan kecepatan gerak kumparan: \\(e\\approx Kv\\). Namun soal memberi amplitudo percepatan 1G, bukan amplitudo kecepatan. Kita perlu menghubungkan keduanya lebih dulu.",
            en: "This vibrometer produces voltage proportional to coil velocity: \\(e\\approx Kv\\). The problem gives acceleration amplitude of 1G rather than velocity amplitude, so we must connect those quantities first.",
          },
          {
            id: "Tanda topi, seperti \\(\\hat a\\), menyatakan amplitudo puncak. Nilai yang diberikan adalah \\(\\hat a=9.81\\ \\mathrm{m/s^2}\\). Besarnya tetap pada kedua frekuensi yang dibandingkan.",
            en: "A hat, as in \\(\\hat a\\), denotes peak amplitude. Here \\(\\hat a=9.81\\ \\mathrm{m/s^2}\\), held fixed at both frequencies.",
          },
        ],
        math: "\\hat e=K\\hat v,\\qquad \\hat a=9.81\\ \\mathrm{m/s^2}",
      },
      {
        title: {
          id: "Hubungkan kecepatan dan percepatan untuk gerak sinus",
          en: "Connect velocity and acceleration for sinusoidal motion",
        },
        body: [
          {
            id: "Kita ambil perpindahan \\(x(t)=\\hat x\\sin\\omega t\\). Satu kali turunan memberi kecepatan, dan turunan berikutnya memberi percepatan. Setiap turunan menambahkan faktor \\(\\omega\\) pada amplitudo.",
            en: "We take displacement \\(x(t)=\\hat x\\sin\\omega t\\). One derivative gives velocity, and the next gives acceleration. Each derivative introduces a factor of \\(\\omega\\) into the amplitude.",
          },
          {
            id: "Jadi \\(\\hat v=\\omega\\hat x\\) dan \\(\\hat a=\\omega^2\\hat x=\\omega\\hat v\\). Frekuensi \\(f\\) menghitung siklus per detik, sedangkan \\(\\omega=2\\pi f\\) memakai radian per detik.",
            en: "Thus \\(\\hat v=\\omega\\hat x\\) and \\(\\hat a=\\omega^2\\hat x=\\omega\\hat v\\). Frequency \\(f\\) counts cycles per second, while \\(\\omega=2\\pi f\\) uses radians per second.",
          },
        ],
        math: "\\hat v=\\frac{\\hat a}{\\omega}=\\frac{\\hat a}{2\\pi f},\\qquad\\hat e=\\frac{K\\hat a}{2\\pi f}",
      },
      {
        title: {
          id: "Samakan satuan sensitivitas dan kecepatan",
          en: "Match sensitivity and velocity units",
        },
        body: [
          {
            id: "Sensitivitas 40 mV/(cm/s) berarti gerak 1 cm/s memberi 40 mV. Kita memakai m/s dalam perhitungan gerak, sehingga kedua satuan pada perbandingan perlu diubah.",
            en: "Sensitivity 40 mV/(cm/s) means a velocity of 1 cm/s gives 40 mV. Since the motion calculation uses m/s, convert both units in that ratio.",
          },
          {
            id: "40 mV sama dengan 0.040 V, dan 1 cm/s sama dengan 0.01 m/s. Pembagian memberi 4 V/(m/s), sehingga tegangan akhirnya langsung dalam volt.",
            en: "40 mV equals 0.040 V, and 1 cm/s equals 0.01 m/s. Their ratio is 4 V/(m/s), so the resulting voltage is directly in volts.",
          },
        ],
        math: "K=\\frac{0.040\\ \\mathrm V}{0.01\\ \\mathrm{m/s}}=4\\ \\mathrm{V/(m/s)},\\qquad\\hat e=\\frac{4(9.81)}{2\\pi f}\\ \\mathrm V",
        visual: {
          kind: "vibrometer",
          caption: {
            id: "Amplitudo tegangan berkurang saat frekuensi naik pada percepatan tetap.",
            en: "Voltage amplitude falls as frequency rises at fixed acceleration.",
          },
          params: {
            acceleration: 9.81,
            sensitivity: 4,
            frequency: 10,
            minFrequency: 10,
            maxFrequency: 2000,
          },
        },
      },
      {
        title: {
          id: "Hitung keluaran pada 10 Hz",
          en: "Calculate output at 10 Hz",
        },
        body: [
          {
            id: "Kita hitung frekuensi sudut, lalu bagi amplitudo percepatan dengan frekuensi sudut untuk memperoleh amplitudo kecepatan. Setelah itu, kalikan dengan sensitivitas.",
            en: "We calculate angular frequency, then divide acceleration amplitude by it to obtain velocity amplitude. We multiply that velocity by sensitivity.",
          },
          {
            id: "Hasil 0.624524 V sama dengan 624.524 mV. Nilai ini adalah amplitudo puncak keluaran sinus, bukan tegangan tetap.",
            en: "The result 0.624524 V equals 624.524 mV. It is the peak amplitude of a sinusoidal output rather than a constant voltage.",
          },
        ],
        math: "\\begin{aligned}\\omega&=2\\pi(10)=62.8319\\ \\mathrm{rad/s}\\\\\\hat v&=\\frac{9.81}{62.8319}=0.156131\\ \\mathrm{m/s}\\\\\\hat e&=4(0.156131)=0.624524\\ \\mathrm V=624.524\\ \\mathrm{mV}\\end{aligned}",
      },
      {
        title: {
          id: "Hitung keluaran pada 2000 Hz",
          en: "Calculate output at 2000 Hz",
        },
        body: [
          {
            id: "Kita gunakan urutan yang sama pada frekuensi 2000 Hz. Percepatannya tetap 9.81 m/s², tetapi kecepatan puncaknya kini jauh lebih kecil karena dibagi frekuensi yang lebih besar.",
            en: "Follow the same sequence at 2000 Hz. Acceleration stays at 9.81 m/s², but peak velocity is now much smaller because it is divided by a higher frequency.",
          },
          {
            id: "Setelah dikali sensitivitas, tegangan puncaknya sekitar 0.00312262 V atau 3.12262 mV.",
            en: "Multiplying by sensitivity gives a peak voltage of about 0.00312262 V, or 3.12262 mV.",
          },
        ],
        math: "\\hat v=\\frac{9.81}{2\\pi(2000)}=0.000780655\\ \\mathrm{m/s},\\qquad\\hat e=4(0.000780655)=\\boxed{3.12262\\ \\mathrm{mV}}",
        visual: {
          kind: "vibrometer",
          caption: {
            id: "Gunakan frekuensi 10 dan 2000 Hz untuk memeriksa rasio 200:1.",
            en: "Compare 10 and 2000 Hz to check the 200:1 ratio.",
          },
          params: {
            acceleration: 9.81,
            sensitivity: 4,
            frequency: 10,
            minFrequency: 10,
            maxFrequency: 2000,
          },
        },
      },
      {
        title: {
          id: "Periksa hubungan kedua hasil",
          en: "Check the relationship between the results",
        },
        body: [
          {
            id: "Frekuensi naik dari 10 menjadi 2000 Hz, yaitu 200 kali. Pada percepatan tetap, rumus memberi kecepatan dan tegangan yang turun 200 kali. Kedua hasil memenuhi hubungan ini.",
            en: "Frequency rises from 10 to 2000 Hz, a factor of 200. At fixed acceleration, the formula makes velocity and voltage fall by a factor of 200. The two results satisfy that relationship.",
          },
          {
            id: "Kesimpulan ini memakai sensitivitas tetap dalam rentang 10 sampai 2000 Hz yang diberikan. Jika yang tetap adalah amplitudo kecepatan, bukan percepatan, tegangan tidak akan turun dengan cara yang sama.",
            en: "This conclusion uses the stated constant sensitivity over 10 to 2000 Hz. If velocity amplitude were fixed instead of acceleration amplitude, voltage would not decrease in this way.",
          },
          {
            id: "Kedua angka merupakan amplitudo puncak. Untuk RMS sinyal sinus, barulah bagi amplitudo puncak dengan akar dua; soal tidak meminta konversi itu.",
            en: "Both numbers are peak amplitudes. RMS for a sinusoid would require division by the square root of two; the question does not request that conversion.",
          },
        ],
        math: "\\frac{\\hat e(10)}{\\hat e(2000)}=\\frac{2000}{10}=200",
      },
    ],
    answer: {
      id: "Bunyi terukur 978.88 Hz saat mendekat dan 799.27 Hz saat menjauh. Amplitudo tegangan vibrometer 624.524 mV pada 10 Hz dan 3.12262 mV pada 2000 Hz.",
      en: "Observed sound is 978.88 Hz on approach and 799.27 Hz on recession. Vibrometer voltage amplitude is 624.524 mV at 10 Hz and 3.12262 mV at 2000 Hz.",
    },
    answerMath:
      "\\boxed{\\begin{aligned}f_{\\rm approach}&=978.88\\ \\mathrm{Hz}\\\\f_{\\rm recede}&=799.27\\ \\mathrm{Hz}\\\\\\hat e_{10}&=624.524\\ \\mathrm{mV}\\\\\\hat e_{2000}&=3.12262\\ \\mathrm{mV}\\end{aligned}}",
    assumptions: [
      {
        id: "Medium diam, sumber dan pengamat segaris. Untuk vibrometer, getaran sinus dan sensitivitas konstan pada rentang yang disebut soal.",
        en: "The medium is stationary and motion is along the source-observer line. Vibrometer motion is sinusoidal, with constant sensitivity in the stated band.",
      },
    ],
    visual: {
      kind: "doppler",
      caption: {
        id: "Jarak antar muka gelombang menentukan frekuensi yang diterima.",
        en: "Wavefront spacing determines received frequency.",
      },
      params: {
        sourceFrequency: 880,
        sourceSpeed: 33.333333,
        soundSpeed: 330,
      },
    },
    referencePages: [17, 18, 19],
  },
  {
    id: "2023-uas-q1",
    year: 2023,
    exam: "uas",
    number: 1,
    title: {
      id: "Venturi dan manometer raksa",
      en: "Venturi and mercury manometer",
    },
    topic: "flow",
    source: {
      url: "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
      file: "2023-uas.pdf",
      pages: [1],
    },
    originalLanguage: "en",
    original:
      "1. Flowmeter Sensor\nVenturi-type flowmeter measurement is used to measure fluid flow inside a pipe with an inner diameter of 80 mm at the larger section (A) and an inner diameter of 20 mm at the smaller section (B). A U-tube manometer containing mercury is connected to sections A dan B. When measuring the flow of fluid with a mass density of 950 kg/m³, the upper surfaces of the mercury in the U-tube have a differential height of 50 mm. The discharge coefficient (Cd) of the venturi-meter is 0.97, and the mass density of mercury is 13600 kg/m³.\na. [5%] Sketch the venturi-meter sensor, including the U-tube manometer.\nb. [7%] Use the Bernoulli equation to derive the flow at section A.\nc. [8%] Calculate the flow of fluid in m³/s.\nd. [10%] If we replace the venturi type with the nozzle type (with the same inner diameter), explain what will happen to the mercury height and discharge coefficient. Explain why this happens.",
    prompt: {
      id: "Venturi memiliki diameter \\(D_A=80\\,\\mathrm{mm}\\) dan diameter leher \\(D_B=20\\,\\mathrm{mm}\\). Fluida bermassa jenis \\(950\\,\\mathrm{kg/m^3}\\). Manometer U berisi raksa \\(13600\\,\\mathrm{kg/m^3}\\) menunjukkan beda tinggi 50 mm. Koefisien debit \\(C_d=0.97\\). (a) Gambar Venturi dan manometernya. (b) Turunkan kecepatan/debit pada A dari Bernoulli. (c) Hitung debit dalam m³/s. (d) Jika Venturi diganti nozzle dengan diameter sama, jelaskan perubahan tinggi raksa dan \\(C_d\\).",
      en: "A Venturi has \\(D_A=80\\,\\mathrm{mm}\\) and throat diameter \\(D_B=20\\,\\mathrm{mm}\\). Fluid density is \\(950\\,\\mathrm{kg/m^3}\\). A mercury U-tube, density \\(13600\\,\\mathrm{kg/m^3}\\), shows a 50 mm level difference. The discharge coefficient is \\(C_d=0.97\\). (a) Sketch the Venturi and manometer. (b) Derive section-A velocity/flow using Bernoulli. (c) Find volume flow in m³/s. (d) Explain how mercury height and \\(C_d\\) change when a nozzle of the same diameters replaces the Venturi.",
    },
    steps: [
      {
        title: {
          id: "1a · Susun gambar Venturi dan dua tap tekanan",
          en: "1a · Arrange the Venturi and its two pressure taps",
        },
        body: [
          {
            id: "Gambar aliran dari penampang besar A menuju penyempitan halus, leher B, lalu pelebaran halus atau diffuser. Diameter A adalah 80 mm dan diameter leher B adalah 20 mm.",
            en: "Sketch flow from the large section A through a smooth contraction, throat B, and a gradual expansion or diffuser. Section A has diameter 80 mm; throat B has diameter 20 mm.",
          },
          {
            id: "Hubungkan tap tekanan A dan B ke dua kaki manometer U berisi raksa. Fluida proses mengisi ruang di atas raksa. Tandai h sebagai selisih vertikal dua permukaan raksa, bukan seluruh panjang kolom.",
            en: "Connect pressure taps A and B to the two legs of a mercury U-tube. The process fluid occupies the space above the mercury. Mark h as the vertical difference between the mercury surfaces, not the full column length.",
          },
          {
            id: "Untuk aliran dari A ke B pada pipa mendatar, tekanan A lebih besar. Raksa pada kaki yang terhubung ke A turun, sehingga permukaan kaki B lebih tinggi.",
            en: "For flow from A toward B in a horizontal pipe, pressure at A is higher. Mercury in the leg connected to A moves downward, leaving the B-leg surface higher.",
          },
        ],
      },
      {
        title: {
          id: "Baca beda tekanan dari manometer",
          en: "Read pressure difference from the manometer",
        },
        body: [
          {
            id: "Kita memakai selisih massa jenis raksa dan fluida proses karena kedua kaki di atas raksa juga berisi fluida. Pada ketinggian yang sama dalam raksa yang diam, tekanannya sama; menyeimbangkan kedua kolom memberi hubungan berikut.",
            en: "We use the difference between mercury and process-fluid densities because the upper parts of both legs also contain process fluid. At equal elevation in stationary mercury, pressures are equal; balancing the two columns gives the following relation.",
          },
          {
            id: "Ubah 50 mm menjadi 0.050 m. Hasil Δp menyatakan pA−pB dan bernilai positif untuk arah aliran pada sketsa.",
            en: "Convert 50 mm to 0.050 m. The resulting Δp is pA−pB and is positive for the flow direction in the sketch.",
          },
        ],
        math: "\\Delta p=(\\rho_m-\\rho)gh=(13600-950)(9.81)(0.050)=6204.825\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "1b · Gunakan kontinuitas untuk mengurangi variabel",
          en: "1b · Use continuity to reduce the unknowns",
        },
        body: [
          {
            id: "Aliran tunak tak termampatkan memiliki debit volume yang sama pada A dan B. Kita tidak perlu mencari kedua kecepatan secara terpisah: salah satunya dapat dinyatakan melalui yang lain.",
            en: "Steady incompressible flow has the same volume flow rate at A and B. We need not solve for both velocities separately: one can be expressed in terms of the other.",
          },
          {
            id: "Luas lingkaran berbanding dengan kuadrat diameter. Diameter A empat kali diameter B, sehingga luas A adalah \\(4^2=16\\) kali luas B. Kecepatan di B menjadi 16 kali kecepatan di A.",
            en: "Circular area scales with diameter squared. Since A's diameter is four times B's, its area is \\(4^2=16\\) times as large. Velocity at B is therefore 16 times velocity at A.",
          },
        ],
        math: "A_Av_A=A_Bv_B,\\qquad v_B=\\frac{A_A}{A_B}v_A,\\qquad\\frac{A_A}{A_B}=\\left(\\frac{80}{20}\\right)^2=16",
      },
      {
        title: {
          id: "Masukkan hubungan kecepatan ke Bernoulli",
          en: "Substitute the velocity relation into Bernoulli",
        },
        body: [
          {
            id: "Pada pipa mendatar, suku energi ketinggian sama pada kedua penampang. Model ideal menghubungkan penurunan tekanan dengan kenaikan energi gerak.",
            en: "In a horizontal pipe, elevation-energy terms are equal at the two sections. The ideal model relates pressure drop to increasing kinetic energy.",
          },
          {
            id: "Ganti \\(v_B\\) dengan \\((A_A/A_B)v_A\\). Setelah dikuadratkan, kedua suku kecepatan memuat \\(v_A^2\\), sehingga faktor itu dapat dikeluarkan.",
            en: "Replace \\(v_B\\) by \\((A_A/A_B)v_A\\). After squaring, both velocity terms contain \\(v_A^2\\), allowing it to be factored out.",
          },
        ],
        math: "\\begin{aligned}\\Delta p&=\\frac12\\rho(v_B^2-v_A^2)\\\\&=\\frac12\\rho\\left[\\left(\\frac{A_A}{A_B}v_A\\right)^2-v_A^2\\right]\\\\&=\\frac12\\rho v_A^2\\left[\\left(\\frac{A_A}{A_B}\\right)^2-1\\right]\\end{aligned}",
      },
      {
        title: {
          id: "Selesaikan kecepatan ideal di A",
          en: "Solve for ideal section-A velocity",
        },
        body: [
          {
            id: "Kita kalikan kedua ruas dengan 2, lalu bagi dengan massa jenis dan faktor rasio luas. Hasilnya adalah kuadrat kecepatan di A. Kita ambil akar positif karena kita mencari besar kecepatan dalam arah aliran.",
            en: "We multiply both sides by 2, then divide by density and the area-ratio factor. This gives section-A velocity squared. We take the positive root because we seek the speed along the flow direction.",
          },
          {
            id: "Rasio luas yang dikuadratkan menjadi rasio diameter pangkat empat. Kemunculan pangkat empat berasal dari geometri luas, bukan rumus baru yang harus dihafal.",
            en: "The squared area ratio becomes the fourth power of the diameter ratio. That fourth power comes from area geometry rather than a separate rule to memorise.",
          },
        ],
        math: "v_{A,\\rm ideal}=\\sqrt{\\frac{2\\Delta p}{\\rho[(A_A/A_B)^2-1]}}=\\sqrt{\\frac{2\\Delta p}{\\rho[(D_A/D_B)^4-1]}}",
      },
      {
        title: {
          id: "Ubah aliran ideal menjadi debit nyata",
          en: "Convert ideal flow into real flow",
        },
        body: [
          {
            id: "Koefisien debit \\(C_d=0.97\\) memberi debit nyata sebesar 97% dari debit ideal. Luas penampang tetap. Oleh karena itu, faktor koreksi debit juga berlaku untuk kecepatan rata-rata di A.",
            en: "The discharge coefficient \\(C_d=0.97\\) makes real flow 97% of ideal flow for this meter and model. Since area is fixed, the same correction also applies to mean section-A velocity.",
          },
          {
            id: "Debit adalah luas dikali kecepatan. Bentuk memakai luas leher \\(A_B\\) berikut setara dengan bentuk \\(A_Av_A\\), tetapi lebih ringkas untuk substitusi.",
            en: "Flow rate equals area times velocity. The form using throat area \\(A_B\\) below is equivalent to \\(A_Av_A\\), but is shorter for numerical substitution.",
          },
        ],
        math: "v_A=C_dv_{A,\\rm ideal},\\qquad Q=A_Av_A=C_dA_B\\sqrt{\\frac{2\\Delta p}{\\rho[1-(D_B/D_A)^4]}}",
      },
      {
        title: {
          id: "1c · Masukkan diameter dalam meter",
          en: "1c · Substitute diameters in metres",
        },
        body: [
          {
            id: "Ubah diameter 20 mm menjadi 0.020 m sebelum menghitung luas leher. Jika diameter masih mm, luas akan berupa mm² dan satuan debit tidak cocok.",
            en: "Convert 20 mm to 0.020 m before calculating throat area. Keeping diameter in millimetres would produce mm² and inconsistent flow units.",
          },
          {
            id: "Rasio diameter 0.020/0.080 = 0.25 tidak memiliki satuan. Kita masukkan luas, tekanan, massa jenis, serta koefisien yang telah diketahui.",
            en: "The diameter ratio 0.020/0.080 = 0.25 is dimensionless. We insert the area, pressure, density, and discharge coefficient already found.",
          },
        ],
        math: "\\begin{aligned}A_B&=\\frac{\\pi(0.020)^2}{4}=3.14159\\times10^{-4}\\ \\mathrm{m^2}\\\\Q&=0.97(3.14159\\times10^{-4})\\sqrt{\\frac{2(6204.825)}{950(1-0.25^4)}}\\\\&=\\boxed{1.10354\\times10^{-3}\\ \\mathrm{m^3/s}}\\end{aligned}",
      },
      {
        title: {
          id: "Periksa debit melalui kedua kecepatan",
          en: "Check flow using both velocities",
        },
        body: [
          {
            id: "Debit 0.00110354 m³/s sama dengan 1.10354 L/s. Kita bagi debit itu dengan luas masing-masing penampang untuk mendapat kecepatan rata-ratanya.",
            en: "The flow 0.00110354 m³/s equals 1.10354 L/s. We divide it by each section's area to obtain the mean velocities.",
          },
          {
            id: "Kecepatan leher 16 kali kecepatan A, sesuai kontinuitas. Kenaikan kecepatan ini juga sesuai tekanan B yang lebih rendah pada manometer.",
            en: "Throat velocity is 16 times section-A velocity, agreeing with continuity. This increase also agrees with the lower B pressure indicated by the manometer.",
          },
        ],
        math: "v_A=\\frac{Q}{\\pi(0.080)^2/4}=0.21954\\ \\mathrm{m/s},\\qquad v_B=\\frac Q{A_B}=3.51269\\ \\mathrm{m/s},\\qquad \\frac{v_B}{v_A}=16",
      },
      {
        title: {
          id: "1d · Bedakan pemulihan tekanan dan beda tekanan ukur",
          en: "1d · Distinguish pressure recovery from measured pressure difference",
        },
        body: [
          {
            id: "Diffuser Venturi memperlambat aliran secara bertahap setelah leher, sehingga sebagian energi gerak kembali menjadi tekanan. Nozzle umumnya memulihkan tekanan lebih sedikit karena tidak memiliki diffuser sepanjang Venturi.",
            en: "A Venturi diffuser gradually slows flow after the throat, converting some kinetic energy back into pressure. A nozzle generally recovers less pressure because it lacks the Venturi's long diffuser.",
          },
          {
            id: "Rugi tekanan permanen adalah tekanan yang tidak kembali setelah alat. Beda tekanan tap adalah selisih tekanan pada dua lokasi pengukuran. Keduanya terkait dengan bentuk alat, tetapi tidak boleh dianggap besaran yang sama.",
            en: "Permanent pressure loss is the pressure not recovered after the meter. Tap pressure difference compares the two measurement locations. Both depend on geometry, but they are not the same quantity.",
          },
          {
            id: "Koefisien nozzle bergantung pada rancangan dan kondisi aliran. Rentang pada materi tumpang tindih dengan 0.97, sehingga kita tidak dapat menyatakan bahwa semua nozzle pasti memiliki Cd yang lebih rendah.",
            en: "A nozzle's coefficient depends on design and flow conditions. The range in the notes overlaps 0.97, so not every nozzle necessarily has a lower Cd.",
          },
        ],
      },
      {
        title: {
          id: "Tentukan perubahan tinggi dengan menyebut kondisi yang tetap",
          en: "Determine height change by stating what stays fixed",
        },
        body: [
          {
            id: "Untuk diameter dan cairan yang sama, bentuk debitnya dapat ditulis \\(Q=C_dB\\sqrt h\\), dengan \\(B\\) memuat semua faktor yang tetap. Jika debit juga dijaga sama, kedua alat memenuhi \\(C_{d,v}\\sqrt{h_v}=C_{d,n}\\sqrt{h_n}\\).",
            en: "For the same diameters and fluid, write flow as \\(Q=C_dB\\sqrt h\\), with \\(B\\) containing the fixed factors. If flow is also held constant, the two meters satisfy \\(C_{d,v}\\sqrt{h_v}=C_{d,n}\\sqrt{h_n}\\).",
          },
          {
            id: "Kita bagi dengan koefisien nozzle lalu kuadratkan. Jika Cd nozzle lebih kecil, tinggi raksa perlu lebih besar untuk menghasilkan debit yang sama. Jika pompa tidak menjaga debit, debit dapat ikut berubah.",
            en: "We divide by the nozzle coefficient, then square. If nozzle Cd is lower, mercury height must be larger to produce the same flow. If the pump does not maintain flow, the flow rate can also change.",
          },
          {
            id: "Soal tidak memberi Cd nozzle maupun kondisi pompa. Kita dapat memberi hubungan bersyarat di atas, tetapi belum dapat menetapkan satu tinggi raksa baru.",
            en: "Because nozzle Cd and pump conditions are absent, this conditional relationship is justified, but a unique new mercury height is not.",
          },
        ],
        math: "\\left.\\frac{h_n}{h_v}\\right|_{Q\\ {\\rm fixed}}=\\left(\\frac{C_{d,v}}{C_{d,n}}\\right)^2",
        note: {
          id: "Jika tekanan pendorong tetap, debit juga dapat berubah. Jangan menganggap Q tetap tanpa menyebutnya.",
          en: "If driving pressure is fixed, flow can also change. Do not silently assume fixed Q.",
        },
      },
    ],
    answer: {
      id: "Debit 1.10354×10⁻³ m³/s dan kecepatan di A 0.21954 m/s. Saat mengganti alat, tinggi raksa bergantung pada debit yang dipertahankan dan Cd nozzle.",
      en: "Flow is 1.10354×10⁻³ m³/s and section-A velocity is 0.21954 m/s. After replacement, mercury height depends on the maintained flow and nozzle Cd.",
    },
    answerMath:
      "\\boxed{Q=1.10354\\times10^{-3}\\ \\mathrm{m^3/s},\\quad v_A=0.21954\\ \\mathrm{m/s}}",
    assumptions: [
      {
        id: "Aliran tunak, tak termampatkan, tap sama tinggi, g=9.81 m/s². Perbandingan tinggi setelah penggantian memakai debit tetap jika disebut.",
        en: "Steady incompressible flow, equal-elevation taps, g=9.81 m/s². Replacement-height comparisons assume fixed flow only where stated.",
      },
    ],
    visual: {
      kind: "venturi",
      caption: {
        id: "Penampang leher mempercepat aliran dan menurunkan tekanan.",
        en: "The throat accelerates flow and reduces pressure.",
      },
      params: {
        D: 0.08,
        d: 0.02,
        rho: 950,
        rhoManometer: 13600,
        h: 0.05,
        Cd: 0.97,
        dp: 6204.825,
      },
    },
    referencePages: [8, 9, 10],
  },
  {
    id: "2023-uas-q2",
    year: 2023,
    exam: "uas",
    number: 2,
    title: {
      id: "Rata-rata dan simpangan baku",
      en: "Mean and standard deviation",
    },
    topic: "statistics",
    source: {
      url: "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
      file: "2023-uas.pdf",
      pages: [1],
    },
    originalLanguage: "en",
    original:
      "2. Statistical Characteristic of Measurement Systems\n[10%] Ten strain gauges are sampled and measured for quality control purposes. Calculate the average and standard deviation values of the resistance measurement results shown below. The unit is in ohm.\n120.1, 120.0, 120.2, 120.0, 119.8, 120.3, 120.0, 119.6, 120.0, 119.9.",
    prompt: {
      id: "Sepuluh strain gauge diambil sebagai sampel kendali mutu. Tahanannya dalam Ω: 120.1, 120.0, 120.2, 120.0, 119.8, 120.3, 120.0, 119.6, 120.0, 119.9. Hitung rata-rata dan simpangan baku sampelnya.",
      en: "Ten strain gauges are sampled for quality control. Resistances in Ω are 120.1, 120.0, 120.2, 120.0, 119.8, 120.3, 120.0, 119.6, 120.0, 119.9. Find the mean and sample standard deviation.",
    },
    steps: [
      {
        title: {
          id: "Tentukan fungsi rata-rata dan simpangan baku",
          en: "Identify what the mean and standard deviation describe",
        },
        body: [
          {
            id: "Sepuluh angka adalah tahanan sepuluh strain gauge yang diambil sebagai sampel. **Rata-rata** (jumlah nilai dibagi jumlah data) menyatakan pusat data. **Simpangan baku** (ukuran sebaran terhadap rata-rata) menyatakan sebaran dalam satuan tahanan.",
            en: "The ten values are resistances from ten sampled strain gauges. The **mean**, the sum divided by sample size, describes the data centre. **Standard deviation** measures spread around that mean in resistance units.",
          },
          {
            id: "Kita memakai semua hasil pengukuran, termasuk nilai yang berulang. Empat kemunculan 120.0 Ω adalah empat unit sampel, bukan satu data yang boleh dihapus sebagai duplikat.",
            en: "We use every measurement, including repeated values. The four occurrences of 120.0 Ω represent four sampled units, not one value to keep after removing duplicates.",
          },
        ],
        math: "n=10,\\qquad \\bar R=\\frac{1}{n}\\sum_{i=1}^nR_i",
      },
      {
        title: {
          id: "Jumlahkan tahanan lalu bagi jumlah sampel",
          en: "Sum the resistances and divide by sample size",
        },
        body: [
          {
            id: "Simbol \\(\\sum R_i\\) berarti menjumlahkan semua tahanan, dari unit pertama sampai kesepuluh. Totalnya 1199.9 Ω. Kita membagi total dengan sepuluh karena jumlah unitnya sepuluh.",
            en: "The symbol \\(\\sum R_i\\) means adding every resistance, from the first unit to the tenth. Their total is 1199.9 Ω. We divide by ten because there are ten units.",
          },
          {
            id: "Rata-rata 119.99 Ω berada di antara nilai terkecil 119.6 Ω dan terbesar 120.3 Ω. Pemeriksaan rentang ini memastikan pusat data tidak berada di luar data yang kita jumlahkan.",
            en: "The mean 119.99 Ω lies between the minimum 119.6 Ω and maximum 120.3 Ω. This range check confirms that the centre lies within the data we averaged.",
          },
        ],
        math: "\\sum R_i=1199.9\\ \\Omega,\\qquad\\bar R=\\frac{1199.9}{10}=\\boxed{119.99\\ \\Omega}",
      },
      {
        title: {
          id: "Hitung selisih tiap nilai dari pusat data",
          en: "Calculate each value's deviation from the centre",
        },
        body: [
          {
            id: "Untuk unit pertama, selisihnya \\(120.1-119.99=0.11\\) Ω. Untuk nilai terkecil, selisihnya \\(119.6-119.99=-0.39\\) Ω. Tanda menunjukkan apakah data berada di atas atau di bawah rata-rata.",
            en: "The first unit's deviation is \\(120.1-119.99=0.11\\) Ω. The smallest value has deviation \\(119.6-119.99=-0.39\\) Ω. The sign indicates whether a value lies above or below the mean.",
          },
          {
            id: "Menjumlahkan selisih bertanda tidak mengukur sebaran: nilai positif dan negatif saling menghapus. Oleh karena itu, simpangan baku memakai kuadrat selisih.",
            en: "Adding signed deviations does not measure spread: positive and negative values cancel. Standard deviation therefore uses squared deviations.",
          },
        ],
        math: "d_i=R_i-\\bar R,\\qquad\\sum d_i=0",
      },
      {
        title: {
          id: "Kuadratkan selisih dan jumlahkan",
          en: "Square the deviations and sum them",
        },
        body: [
          {
            id: "Kuadrat membuat tiap kontribusi tidak negatif dan memberi bobot lebih besar pada data yang jauh dari pusat. Satuan kini menjadi Ω² karena kita mengalikan Ω dengan Ω.",
            en: "Squaring makes every contribution nonnegative and gives greater weight to values farther from the centre. Units become Ω² because Ω is multiplied by Ω.",
          },
          {
            id: "Tabel memperlihatkan seluruh hitungan. Jumlah kolom terakhir adalah 0.3490 Ω²; ini masih jumlah kuadrat selisih, belum varians atau simpangan baku.",
            en: "The table shows every calculation. The final column sums to 0.3490 Ω²; this is the sum of squared deviations, not yet variance or standard deviation.",
          },
        ],
        math: "\\sum_{i=1}^{10}(R_i-\\bar R)^2=0.3490\\ \\Omega^2",
        table: {
          headers: [
            {
              id: "Rᵢ (Ω)",
              en: "Rᵢ (Ω)",
            },
            {
              id: "Rᵢ − 119.99 (Ω)",
              en: "Rᵢ − 119.99 (Ω)",
            },
            {
              id: "Kuadrat (Ω²)",
              en: "Square (Ω²)",
            },
          ],
          rows: [
            ["120.1", "0.11", "0.0121"],
            ["120.0", "0.01", "0.0001"],
            ["120.2", "0.21", "0.0441"],
            ["120.0", "0.01", "0.0001"],
            ["119.8", "−0.19", "0.0361"],
            ["120.3", "0.31", "0.0961"],
            ["120.0", "0.01", "0.0001"],
            ["119.6", "−0.39", "0.1521"],
            ["120.0", "0.01", "0.0001"],
            ["119.9", "−0.09", "0.0081"],
          ],
        },
      },
      {
        title: {
          id: "Gunakan n−1 untuk varians sampel",
          en: "Use n−1 for sample variance",
        },
        body: [
          {
            id: "Kita memperkirakan sebaran populasi dari sampel, sementara rata-rata populasi juga belum diketahui. Rata-rata yang dipakai berasal dari sepuluh data yang sama.",
            en: "We estimate population spread from a sample, and the population mean is also unknown. The mean used here was estimated from those same ten values.",
          },
          {
            id: "Setelah rata-rata ditetapkan, sepuluh selisih harus berjumlah nol; sembilan selisih menentukan selisih terakhir. Pembagi n−1 pada varians sampel menyesuaikan penggunaan rata-rata sampel itu.",
            en: "Once the mean is set, the ten deviations must sum to zero; nine deviations determine the last one. The n−1 divisor in sample variance accounts for estimating the mean from the sample.",
          },
          {
            id: "Jadi pembaginya 9, bukan 10. Hasil varians tetap memakai Ω².",
            en: "The divisor is therefore 9 rather than 10. Variance still has units Ω².",
          },
        ],
        math: "s^2=\\frac{\\sum(R_i-\\bar R)^2}{n-1}=\\frac{0.3490}{9}=0.0387778\\ \\Omega^2",
      },
      {
        title: {
          id: "Ambil akar untuk kembali ke satuan tahanan",
          en: "Take the square root to return to resistance units",
        },
        body: [
          {
            id: "Simpangan baku adalah akar varians. Akar mengubah satuan Ω² kembali menjadi Ω, sehingga nilainya dapat dibandingkan langsung dengan tahanan.",
            en: "Standard deviation is the square root of variance. It converts Ω² back to Ω, allowing direct comparison with resistance values.",
          },
          {
            id: "Kita gunakan nilai belum dibulatkan selama hitungan, lalu bulatkan hasil akhir. Dua besaran yang diminta adalah rata-rata 119.99 Ω dan simpangan baku sampel sekitar 0.196921 Ω.",
            en: "Keep unrounded values during calculation, then round the final result. The requested quantities are mean 119.99 Ω and sample standard deviation about 0.196921 Ω.",
          },
        ],
        math: "s=\\sqrt{\\frac{0.3490}{9}}=\\boxed{0.196921\\ \\Omega}",
      },
      {
        title: {
          id: "Tafsirkan hasil tanpa menyamakan sebaran dengan galat",
          en: "Interpret spread without equating it with error",
        },
        body: [
          {
            id: "Simpangan baku sekitar 0.197 Ω menggambarkan sebaran tahanan antarunit sampel. Nilai itu bukan otomatis galat alat ukur, dan bukan ketidakpastian rata-rata.",
            en: "The standard deviation of about 0.197 Ω describes resistance spread between sampled units. It is not automatically measurement-instrument error or uncertainty of the mean.",
          },
          {
            id: "Jika sepuluh unit merupakan seluruh populasi yang ingin dideskripsikan, pembagi 10 memberi simpangan baku populasi 0.186815 Ω. Kata sampel pada soal mendukung penggunaan 0.196921 Ω.",
            en: "If the ten units were the entire population of interest, division by 10 would give population standard deviation 0.186815 Ω. The question's sample wording supports using 0.196921 Ω.",
          },
          {
            id: "Data ini juga tidak memberi nilai tahanan benar yang tersertifikasi. Oleh karena itu, kedekatan rata-rata terhadap 120 Ω belum membuktikan tidak adanya bias pengukuran.",
            en: "These data also provide no certified true resistance. A mean near 120 Ω therefore does not by itself establish that the measurements are free of bias.",
          },
        ],
      },
    ],
    answer: {
      id: "Rata-rata 119.99 Ω dan simpangan baku sampel 0.196921 Ω.",
      en: "Mean 119.99 Ω and sample standard deviation 0.196921 Ω.",
    },
    answerMath:
      "\\boxed{\\bar R=119.99\\ \\Omega,\\qquad s=0.196921\\ \\Omega}",
    visual: {
      kind: "statistics",
      caption: {
        id: "Tiap titik adalah satu strain gauge; garis acuan menunjukkan rata-rata.",
        en: "Each point is one strain gauge; the reference line marks the mean.",
      },
      params: {
        values: [120.1, 120, 120.2, 120, 119.8, 120.3, 120, 119.6, 120, 119.9],
        mean: 119.99,
        standardDeviation: 0.1969207398365598,
      },
    },
    referencePages: [],
  },
  {
    id: "2023-uas-q3",
    year: 2023,
    exam: "uas",
    number: 3,
    title: {
      id: "Respons sensor orde satu",
      en: "First-order sensor response",
    },
    topic: "dynamics",
    source: {
      url: "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
      file: "2023-uas.pdf",
      pages: [1, 3],
    },
    originalLanguage: "en",
    original:
      "3. First-Order System\nA temperature sensor can be modeled as a first-order system with a time constant of 1 second and a sensitivity of 0.08 Ω/°C. Initially, the sensor is at a steady condition of 27 °C with a resistance of 200 Ω. The temperature suddenly changes at t = 1 second to 100 °C.\na. [8%] Find the differential equation model of the sensor that relates changes in temperature input to resistance output.\nb. [7%] What will be the sensor's resistance at t = 3 seconds?",
    prompt: {
      id: "Sensor suhu orde satu memiliki \\(\\tau=1\\,\\mathrm s\\) dan sensitivitas \\(K=0.08\\,\\Omega/{}^\\circ\\mathrm C\\). Mula-mula sensor tunak pada 27 °C dengan tahanan 200 Ω. Suhu berubah mendadak menjadi 100 °C pada \\(t=1\\,\\mathrm s\\). (a) Susun persamaan diferensial masukan suhu terhadap keluaran tahanan. (b) Hitung tahanan pada \\(t=3\\,\\mathrm s\\).",
      en: "A first-order temperature sensor has \\(\\tau=1\\,\\mathrm s\\) and sensitivity \\(K=0.08\\,\\Omega/{}^\\circ\\mathrm C\\). Initially it is steady at 27 °C with resistance 200 Ω. Temperature steps to 100 °C at \\(t=1\\,\\mathrm s\\). (a) Form the temperature-to-resistance differential equation. (b) Find resistance at \\(t=3\\,\\mathrm s\\).",
    },
    steps: [
      {
        title: {
          id: "3a · Jadikan keadaan awal sebagai titik acuan",
          en: "3a · Use the initial equilibrium as the reference",
        },
        body: [
          {
            id: "Sensor mulai pada 27°C dan 200 Ω dalam keadaan tunak. Tunak berarti keluarannya sudah berhenti berubah ketika suhu belum berubah.",
            en: "The sensor starts at 27°C and 200 Ω in steady state. Steady means its output has stopped changing while temperature remains fixed.",
          },
          {
            id: "Definisikan perubahan \\(\\Delta T=T-27\\) dan \\(\\Delta R=R-200\\). Sensitivitas 0.08 Ω/°C menghubungkan kedua perubahan ini, bukan menyatakan bahwa tahanan absolut sama dengan 0.08 kali suhu absolut.",
            en: "We define deviations \\(\\Delta T=T-27\\) and \\(\\Delta R=R-200\\). Sensitivity 0.08 Ω/°C relates these changes; it does not say absolute resistance equals 0.08 times absolute temperature.",
          },
        ],
        math: "\\Delta T=T-27,\\qquad\\Delta R=R-200,\\qquad K=0.08\\ \\Omega/{}^\\circ\\mathrm C",
      },
      {
        title: {
          id: "Masukkan konstanta waktu ke persamaan orde satu",
          en: "Insert the time constant into the first-order equation",
        },
        body: [
          {
            id: "Model orde satu adalah \\(\\tau\\,d\\Delta R/dt+\\Delta R=K\\Delta T\\). Turunan menyatakan seberapa cepat tahanan sedang berubah; konstanta waktu \\(\\tau=1\\) s menentukan laju pendekatan ke keadaan akhir.",
            en: "The first-order model is \\(\\tau\\,d\\Delta R/dt+\\Delta R=K\\Delta T\\). The derivative describes how fast resistance is changing; the time constant \\(\\tau=1\\) s sets how quickly it approaches equilibrium.",
          },
          {
            id: "Kita ganti variabel perubahan dengan tahanan dan suhu asli. Nilai awal 200 Ω konstan, sehingga turunan R−200 sama dengan turunan R.",
            en: "Replace deviations with absolute resistance and temperature. Since 200 Ω is constant, the derivative of R−200 equals the derivative of R.",
          },
          {
            id: "Setiap suku memiliki satuan Ω: konstanta waktu dalam detik dikali Ω/s, perubahan tahanan dalam Ω, dan sensitivitas Ω/°C dikali perubahan suhu °C.",
            en: "Every term has units Ω: the time constant in seconds multiplies Ω/s, resistance change is in Ω, and sensitivity in Ω/°C multiplies temperature change in °C.",
          },
        ],
        math: "\\boxed{(1\\ \\mathrm s)\\frac{dR}{dt}+R-200=0.08(T-27)}",
      },
      {
        title: {
          id: "Nyatakan masukan sebelum dan sesudah t=1 s",
          en: "State the input before and after t=1 s",
        },
        body: [
          {
            id: "Sebelum t=1 s, suhu tetap 27°C, sehingga ΔT=0 dan tahanan tetap 200 Ω. Pada t=1 s, suhu berubah mendadak menjadi 100°C.",
            en: "Before t=1 s, temperature stays at 27°C, so ΔT=0 and resistance remains 200 Ω. At t=1 s, temperature abruptly becomes 100°C.",
          },
          {
            id: "Perubahan mendadak pada masukan disebut langkah. Besar langkahnya 100−27=73°C. Sensor orde satu tidak langsung menyelesaikan seluruh perubahan keluarannya pada saat itu.",
            en: "An abrupt input change is called a step. Its size is 100−27=73°C. A first-order sensor does not complete its entire output change instantaneously.",
          },
        ],
        math: "\\Delta T(t)=\\begin{cases}0,&t<1\\\\73^\\circ\\mathrm C,&t\\ge1\\end{cases}",
      },
      {
        title: {
          id: "Cari keadaan akhir sebagai batas respons",
          en: "Find the final equilibrium as a response limit",
        },
        body: [
          {
            id: "Setelah menunggu cukup lama pada suhu 100°C, laju perubahan tahanan menuju nol. Hapus suku turunan dari model untuk mencari nilai akhir.",
            en: "After a sufficiently long time at 100°C, resistance rate approaches zero. Remove the derivative term from the model to find the final value.",
          },
          {
            id: "Kenaikan tahanan akhirnya 0.08×73=5.84 Ω. Tambahkan pada tahanan awal 200 Ω untuk memperoleh 205.84 Ω.",
            en: "The final resistance rise is 0.08×73=5.84 Ω. Add it to the initial 200 Ω to obtain 205.84 Ω.",
          },
        ],
        math: "R_\\infty-200=0.08(100-27)=5.84\\ \\Omega\\quad\\Rightarrow\\quad R_\\infty=205.84\\ \\Omega",
      },
      {
        title: {
          id: "Lihat mengapa respons berbentuk eksponensial",
          en: "See why the response is exponential",
        },
        body: [
          {
            id: "Sesudah langkah, model dapat ditulis \\(\\tau\\,dR/dt=R_\\infty-R\\). Jadi tahanan berubah paling cepat ketika jaraknya dari nilai akhir masih besar, lalu melambat saat jarak itu mengecil.",
            en: "After the step, the model can be written \\(\\tau\\,dR/dt=R_\\infty-R\\). Resistance changes fastest when it is far from the final value, then slows as that gap closes.",
          },
          {
            id: "Sebut sisa perubahan itu \\(u=R_\\infty-R\\). Turunannya adalah \\(du/dt=-dR/dt\\), sehingga model menjadi \\(du/dt=-u/\\tau\\). Solusinya menyusut sebagai eksponensial terhadap waktu yang berlalu.",
            en: "Call the remaining change \\(u=R_\\infty-R\\). Since \\(du/dt=-dR/dt\\), the model becomes \\(du/dt=-u/\\tau\\). Its solution decays exponentially with elapsed time.",
          },
        ],
        math: "\\frac{du}{dt}=-\\frac u\\tau\\quad\\Rightarrow\\quad u(t)=u(1)e^{-(t-1)/\\tau}",
      },
      {
        title: {
          id: "Gunakan kondisi awal untuk menentukan besar respons",
          en: "Use the initial condition to set the response size",
        },
        body: [
          {
            id: "Tepat saat suhu berubah, tahanan masih 200 Ω. Sisa menuju nilai akhir adalah 205.84−200=5.84 Ω, sehingga u(1)=5.84 Ω.",
            en: "At the instant temperature changes, resistance is still 200 Ω. The remaining change is 205.84−200=5.84 Ω, so u(1)=5.84 Ω.",
          },
          {
            id: "Kita kurangi sisa eksponensial itu dari nilai akhir. Bentuk kedua di bawah menunjukkan hal yang sama sebagai nilai awal ditambah perubahan yang sudah selesai.",
            en: "We subtract the remaining exponential from the final value. The second form below expresses the same result as the initial value plus the completed change.",
          },
        ],
        math: "R(t)=205.84-5.84e^{-(t-1)/1}=200+5.84(1-e^{-(t-1)/1}),\\qquad t\\ge1",
      },
      {
        title: {
          id: "3b · Evaluasi setelah dua detik respons",
          en: "3b · Evaluate after two seconds of response",
        },
        body: [
          {
            id: "Waktu pembacaan adalah t=3 s, sedangkan langkah terjadi pada t=1 s. Jadi selang respons 3−1=2 s, atau dua konstanta waktu.",
            en: "The reading is at t=3 s, while the step occurred at t=1 s. The response duration is therefore 3−1=2 s, or two time constants.",
          },
          {
            id: "Nilai \\(e^{-2}=0.135335\\) berarti 13.5335% dari perubahan masih tersisa. Fraksi yang sudah terjadi adalah 0.864665; kalikan dengan 5.84 Ω lalu tambahkan 200 Ω.",
            en: "The value \\(e^{-2}=0.135335\\) means 13.5335% of the change remains. The completed fraction is 0.864665; multiply it by 5.84 Ω and add 200 Ω.",
          },
        ],
        math: "\\begin{aligned}R(3)&=200+5.84(1-e^{-(3-1)/1})\\\\&=200+5.84(0.864665)\\\\&=\\boxed{205.04964\\ \\Omega}\\end{aligned}",
      },
      {
        title: {
          id: "Periksa kondisi awal, akhir, dan sisa galat dinamik",
          en: "Check the initial value, final value, and remaining dynamic error",
        },
        body: [
          {
            id: "Pada t=1 s, rumus memberi 200 Ω. Pada waktu yang sangat lama, rumus memberi 205.84 Ω. Pembacaan 205.04964 Ω berada di antara keduanya, sesuai respons pemanasan tanpa lonjakan.",
            en: "At t=1 s, the formula gives 200 Ω. At very long times, it gives 205.84 Ω. The reading 205.04964 Ω lies between these limits, consistent with a heating response without overshoot.",
          },
          {
            id: "Sisa 0.79036 Ω adalah selisih sementara akibat respons yang belum selesai. Nilai ini diukur terhadap tahanan akhir, bukan terhadap nol ohm.",
            en: "The remaining 0.79036 Ω is a temporary difference caused by incomplete response. It is measured relative to final resistance rather than zero ohms.",
          },
          {
            id: "Perbandingan 13.53% memakai perubahan 5.84 Ω sebagai penyebut. Membaginya dengan seluruh tahanan 205.84 Ω akan menjawab pertanyaan persentase yang berbeda.",
            en: "The 13.53% ratio uses the 5.84 Ω change as denominator. Dividing by the full 205.84 Ω resistance would answer a different percentage question.",
          },
        ],
        math: "R_\\infty-R(3)=205.84-205.04964=0.79036\\ \\Omega,\\qquad\\frac{0.79036}{5.84}\\approx13.53\\%",
      },
    ],
    answer: {
      id: "Modelnya dR/dt + R − 200 = 0.08(T − 27), dengan satuan sesuai data. Pada t=3 s, R=205.04964 Ω.",
      en: "The model is dR/dt + R − 200 = 0.08(T − 27), with the stated units. At t=3 s, R=205.04964 Ω.",
    },
    answerMath: "\\boxed{R(3\\,\\mathrm s)=205.04964\\ \\Omega}",
    visual: {
      kind: "rtd",
      caption: {
        id: "Sensor mulai berubah pada t=1 s dan mendekati 205.84 Ω.",
        en: "The sensor responds from t=1 s and approaches 205.84 Ω.",
      },
      params: {
        tau: 1,
        initialTemperature: 27,
        finalTemperature: 100,
        initialResistance: 200,
        stepTime: 1,
        evaluationTime: 3,
        K: 0.08,
        initial: 200,
        final: 205.84,
      },
    },
    referencePages: [2, 3],
  },
  {
    id: "2023-uas-q4",
    year: 2023,
    exam: "uas",
    number: 4,
    title: {
      id: "Resolver, LVDT, dan akselerometer",
      en: "Resolver, LVDT, and accelerometer",
    },
    topic: "position",
    source: {
      url: "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
      file: "2023-uas.pdf",
      pages: [1, 2, 3],
    },
    originalLanguage: "en",
    original:
      "4. Position Sensors\na. [7%] Please explain the working principle of the following resolver.\nb. [8%] Sketch an LVDT and explain how does an LVDT works?\nc. [15%] An LVDT is used to measure the seismic mass displacement in an accelerometer. The LVDT output (with signal conditioning) is 0.31 mV/mm, and the maximum LVDT core displacement is ±10 mm. The spring constant is 240 N/m, the seismic mass is m = m1 + m2 = 0.05 kg, and the damping coefficient is c = 3.46 N.s/m.\ni. The relationship between the acceleration m/s² and the output voltage.\nii. The maximum measurable acceleration m/s².",
    prompt: {
      id: "(a) Jelaskan prinsip resolver dengan keluaran sinus dan kosinus pada gambar. (b) Gambar LVDT dan jelaskan kerjanya. (c) LVDT membaca simpangan massa seismik akselerometer. Sensitivitas setelah pengondisi sinyal \\(S=0.31\\,\\mathrm{mV/mm}\\), batas simpangan inti ±10 mm, \\(k=240\\,\\mathrm{N/m}\\), \\(m=m_1+m_2=0.05\\,\\mathrm{kg}\\), dan \\(c=3.46\\,\\mathrm{N\\,s/m}\\). Tentukan (i) hubungan percepatan alas dengan tegangan keluaran dan (ii) batas percepatan yang dapat terbaca.",
      en: "(a) Explain the resolver’s sine/cosine outputs shown in the figure. (b) Sketch an LVDT and explain its operation. (c) An LVDT measures an accelerometer’s seismic-mass displacement. Conditioned sensitivity is \\(S=0.31\\,\\mathrm{mV/mm}\\), core travel is ±10 mm, \\(k=240\\,\\mathrm{N/m}\\), \\(m=m_1+m_2=0.05\\,\\mathrm{kg}\\), and \\(c=3.46\\,\\mathrm{N\\,s/m}\\). Find (i) the base-acceleration-to-output-voltage relation and (ii) maximum measurable acceleration.",
    },
    steps: [
      {
        title: {
          id: "4a · Hubungkan sudut rotor dengan dua tegangan resolver",
          en: "4a · Connect rotor angle to two resolver voltages",
        },
        body: [
          {
            id: "Resolver mengukur sudut melalui kopling magnet antar-kumparan. Eksitasi AC pada rotor menghasilkan fluks yang berubah terhadap waktu. Dua kumparan stator menghadap arah yang berbeda 90°.",
            en: "A resolver measures angle through magnetic coupling between windings. AC rotor excitation creates time-varying flux. Two stator windings face directions 90° apart.",
          },
          {
            id: "Pada sudut rotor \\(\\theta\\), amplitudo keluaran stator mengikuti \\(\\sin\\theta\\) dan \\(\\cos\\theta\\). Kedua tegangan tetap memakai frekuensi pembawa AC yang sama; yang berubah dengan posisi adalah amplitudonya.",
            en: "At rotor angle \\(\\theta\\), stator-output amplitudes follow \\(\\sin\\theta\\) and \\(\\cos\\theta\\). Both voltages retain the same AC carrier frequency; position changes their amplitudes.",
          },
          {
            id: "Dalam persamaan, \\(V_r\\) adalah amplitudo eksitasi, \\(K\\) faktor kopling, dan \\(\\omega_c\\) frekuensi sudut pembawa. Pada bentuk tanpa sikat, transformator putar menyalurkan eksitasi tanpa kontak geser.",
            en: "Here \\(V_r\\) is excitation amplitude, \\(K\\) a coupling factor, and \\(\\omega_c\\) carrier angular frequency. In a brushless design, a rotary transformer supplies excitation without sliding contacts.",
          },
        ],
        math: "v_s(t)=KV_r\\sin\\theta\\sin\\omega_ct,\\qquad v_c(t)=KV_r\\cos\\theta\\sin\\omega_ct",
      },
      {
        title: {
          id: "Gunakan kedua tanda untuk menentukan kuadran",
          en: "Use both signs to identify the quadrant",
        },
        body: [
          {
            id: "Demodulasi membandingkan setiap keluaran dengan eksitasi untuk mengambil amplitudo bertanda. Tanda positif atau negatif memuat informasi sisi sudut, bukan hanya besar tegangan.",
            en: "Demodulation compares each output with excitation to recover a signed amplitude. Positive and negative signs carry angular-side information rather than voltage magnitude alone.",
          },
          {
            id: "Perbandingan \\(V_s/V_c=\\tan\\theta\\) belum membedakan sudut yang terpisah 180°. Fungsi \\(\\operatorname{atan2}(V_s,V_c)\\) memakai kedua tanda secara terpisah sehingga dapat memilih kuadran.",
            en: "The ratio \\(V_s/V_c=\\tan\\theta\\) cannot by itself distinguish angles separated by 180°. The function \\(\\operatorname{atan2}(V_s,V_c)\\) uses both signs separately to select the quadrant.",
          },
        ],
        math: "V_s=KV_r\\sin\\theta,\\quad V_c=KV_r\\cos\\theta,\\quad\\theta=\\operatorname{atan2}(V_s,V_c)",
      },
      {
        title: {
          id: "4b · Gambar susunan LVDT",
          en: "4b · Sketch the LVDT arrangement",
        },
        body: [
          {
            id: "LVDT mengukur perpindahan lurus. Tunjukkan satu primer di antara dua sekunder, inti magnet yang bergerak sepanjang sumbu, serta rumah sensor yang menjadi acuan posisi.",
            en: "An LVDT measures linear displacement. Show one primary between two secondaries, a magnetic core moving along the axis, and a housing that defines the position reference.",
          },
          {
            id: "Eksitasi AC pada primer menimbulkan tegangan pada kedua sekunder. Hubungkan sekunder secara seri berlawanan sehingga tegangan keluarannya adalah selisih \\(V_1-V_2\\).",
            en: "Primary AC excitation induces voltages in both secondaries. Connect the secondaries in series opposition so output is the difference \\(V_1-V_2\\).",
          },
          {
            id: "Inti di tengah memberi kopling yang hampir sama dan keluaran mendekati nol. Jika inti bergeser, satu kopling meningkat dan yang lain menurun.",
            en: "A centred core gives nearly equal coupling and an output near zero. Moving the core increases one coupling and decreases the other.",
          },
        ],
        math: "V_{\\rm diff}=V_1-V_2",
        visual: {
          kind: "lvdt",
          caption: {
            id: "Dua sekunder mengukur simpangan inti terhadap rumah sensor.",
            en: "Two secondary windings sense core displacement relative to the housing.",
          },
          params: {
            range: 10,
            sensitivity: 0.31,
            x: 0,
          },
        },
      },
      {
        title: {
          id: "Bedakan sinyal AC LVDT dari keluaran yang sudah dikondisikan",
          en: "Distinguish raw LVDT AC from the conditioned output",
        },
        body: [
          {
            id: "Besar tegangan AC memberi besar simpangan, sedangkan fase terhadap eksitasi membedakan sisi simpangan. Pengondisi peka fase mengubah keduanya menjadi tegangan bertanda yang sebanding dengan posisi dalam daerah linear.",
            en: "AC voltage magnitude gives displacement magnitude, while phase relative to excitation identifies the side. A phase-sensitive conditioner converts both into signed voltage proportional to position within the linear region.",
          },
          {
            id: "Soal memberi sensitivitas sesudah pengondisi: \\(S=0.31\\) mV/mm. Hubungan satuannya adalah 1 mV = 0.001 V dan 1 mm = 0.001 m. Konversi tersebut memberi sensitivitas setara 0.31 V/m.",
            en: "The problem gives conditioned sensitivity \\(S=0.31\\) mV/mm. Since 1 mV = 0.001 V and 1 mm = 0.001 m, this is also 0.31 V/m.",
          },
          {
            id: "Hubungan \\(E=Sz\\) membaca simpangan inti terhadap rumah, bukan posisi inti terhadap tanah. Hal ini menentukan koordinat yang perlu kita pakai pada model mekanis.",
            en: "The relation \\(E=Sz\\) reads core displacement relative to the housing, rather than its position relative to the ground. This determines the coordinates needed for the mechanical model.",
          },
        ],
        math: "E=Sz,\\qquad S=\\frac{0.00031\\ \\mathrm V}{0.001\\ \\mathrm m}=0.31\\ \\mathrm{V/m}",
      },
      {
        title: {
          id: "4c(i) · Pilih koordinat untuk massa dan rumah",
          en: "4c(i) · Choose coordinates for the mass and housing",
        },
        body: [
          {
            id: "Kita ambil arah ke atas sebagai positif. Sebut \\(y\\) gerak rumah sensor, \\(x\\) gerak absolut massa, dan \\(z=x-y\\) simpangan massa relatif terhadap rumah. Kita ukur \\(z\\) dari keadaan setimbang statik.",
            en: "We take upward as positive. Let \\(y\\) be housing motion, \\(x\\) absolute mass motion, and \\(z=x-y\\) mass displacement relative to the housing. Measure \\(z\\) from static equilibrium.",
          },
          {
            id: "Percepatan yang ingin diukur adalah \\(a=\\ddot y\\), yaitu percepatan rumah. Tanda dua titik menyatakan turunan kedua terhadap waktu. Hubungan \\(x=z+y\\) memberi percepatan absolut massa \\(\\ddot x=\\ddot z+a\\).",
            en: "The input acceleration is \\(a=\\ddot y\\), the housing acceleration. Two dots denote the second time derivative. Since \\(x=z+y\\), absolute mass acceleration is \\(\\ddot x=\\ddot z+a\\).",
          },
          {
            id: "Kedua bagian massa bergerak bersama, sehingga massa dalam persamaan adalah m1+m2=0.05 kg. Memakai hanya satu bagian akan mengubah sensitivitas dan frekuensi alami.",
            en: "The two mass parts move together, so the equation uses m1+m2=0.05 kg. Using only one part would change sensitivity and natural frequency.",
          },
        ],
        math: "z=x-y,\\qquad a=\\ddot y,\\qquad\\ddot x=\\ddot z+a,\\qquad m=m_1+m_2=0.05\\ \\mathrm{kg}",
      },
      {
        title: {
          id: "Tulis gaya nyata dan gaya inersia pada massa yang sama",
          en: "Write real and inertia forces on the same mass",
        },
        body: [
          {
            id: "Pada keadaan awal, pegas menopang berat. Dengan z diukur dari keadaan itu, gaya pegas total adalah mg−kz, sedangkan berat adalah −mg. Kedua suku mg saling menghapus dalam persamaan perubahan.",
            en: "Initially the spring supports the weight. With z measured from that equilibrium, total spring force is mg−kz and weight is −mg. The two mg terms cancel in the motion-about-equilibrium equation.",
          },
          {
            id: "Peredam melawan kecepatan relatif, sehingga gayanya \\(-c\\dot z\\). Neraca D'Alembert menambahkan gaya inersia \\(-m\\ddot x\\), lalu menjumlahkan semuanya menjadi nol. Gaya inersia memakai percepatan absolut massa.",
            en: "The damper opposes relative velocity, giving force \\(-c\\dot z\\). A D'Alembert balance adds inertia force \\(-m\\ddot x\\), then sets the total to zero. That inertia force uses absolute mass acceleration.",
          },
        ],
        math: "(mg-kz)-mg-c\\dot z-m\\ddot x=0",
        visual: {
          kind: "accelerometer",
          caption: {
            id: "Gaya nyata dan gaya inersia harus memenuhi neraca pada massa yang sama.",
            en: "Real and inertia forces must balance on the same combined mass.",
          },
          params: {
            damping: 0.4994079828490263,
            sensitivity: 0.31,
            maxTravel: 0.01,
            frequency: 2,
            acceleration: 9.81,
            m: 0.05,
            k: 240,
            c: 3.46,
            omegaN: 69.2820323027551,
          },
        },
      },
      {
        title: {
          id: "Dapatkan persamaan gerak relatif",
          en: "Obtain the relative-motion equation",
        },
        body: [
          {
            id: "Kita masukkan \\(\\ddot x=\\ddot z+a\\). Setelah suku mg saling menghapus, persamaan memuat gaya pegas, gaya peredam, dan percepatan massa.",
            en: "We substitute \\(\\ddot x=\\ddot z+a\\). After cancelling mg, the equation contains spring force, damping force, and mass acceleration.",
          },
          {
            id: "Tambahkan semua suku gerak relatif ke kedua ruas untuk menyusunnya di kiri. Percepatan rumah menjadi masukan di kanan dengan tanda negatif: saat rumah dipercepat ke atas, massa cenderung tertinggal relatif ke bawah.",
            en: "Add the relative-motion terms to both sides to collect them on the left. Housing acceleration becomes the input on the right with a negative sign: when the housing accelerates upward, the mass tends to lag downward relative to it.",
          },
        ],
        math: "\\begin{aligned}-kz-c\\dot z-m(\\ddot z+a)&=0\\\\m\\ddot z+c\\dot z+kz&=-ma\\\\0.05\\ddot z+3.46\\dot z+240z&=-0.05a\\end{aligned}",
      },
      {
        title: {
          id: "Ubah model gerak menjadi hubungan tegangan dengan percepatan",
          en: "Convert motion into a relationship between voltage and acceleration",
        },
        body: [
          {
            id: "Untuk keadaan awal nol, transformasi Laplace mengubah \\(\\dot z\\) menjadi \\(sZ(s)\\) dan \\(\\ddot z\\) menjadi \\(s^2Z(s)\\). **Transformasi Laplace** (perubahan bentuk matematis dari waktu ke variabel s) membuat model menjadi persamaan aljabar.",
            en: "For zero initial conditions, the Laplace transform maps \\(\\dot z\\) to \\(sZ(s)\\) and \\(\\ddot z\\) to \\(s^2Z(s)\\). This mathematical transformation expresses a time-domain model in variable s, giving an algebraic equation.",
          },
          {
            id: "Kita keluarkan \\(Z(s)\\) sebagai faktor, lalu bagi dengan koefisiennya untuk mendapat \\(Z/A\\). Hubungan \\(E=Sz\\) menunjukkan bahwa kita perlu mengalikan hasil itu dengan sensitivitas LVDT.",
            en: "Factor out \\(Z(s)\\), then divide by its coefficient to obtain \\(Z/A\\). Since \\(E=Sz\\), multiply that relation by the LVDT sensitivity.",
          },
        ],
        math: "\\begin{aligned}(ms^2+cs+k)Z(s)&=-mA(s)\\\\\\frac{Z(s)}{A(s)}&=-\\frac m{ms^2+cs+k}\\\\\\frac{E(s)}{A(s)}&=-\\frac{Sm}{ms^2+cs+k}\\end{aligned}",
        visual: {
          kind: "accelerometer",
          caption: {
            id: "Bandingkan gerak rumah dan massa pada frekuensi yang sama.",
            en: "Compare housing and mass motion at the same frequency.",
          },
          params: {
            damping: 0.4994079828490263,
            sensitivity: 0.31,
            maxTravel: 0.01,
            frequency: 2,
            acceleration: 9.81,
            m: 0.05,
            k: 240,
            c: 3.46,
            omegaN: 69.2820323027551,
          },
        },
      },
      {
        title: {
          id: "Masukkan konstanta dan kenali batas frekuensinya",
          en: "Insert the constants and identify the frequency scale",
        },
        body: [
          {
            id: "Kita bagi pembilang dan penyebut dengan m=0.05 kg. Koefisien c/m menjadi 69.2 dan k/m menjadi 4800. Tegangan pada bentuk ini memakai volt karena S memakai V/m.",
            en: "We divide numerator and denominator by m=0.05 kg. The coefficient c/m becomes 69.2 and k/m becomes 4800. Voltage in this form is in volts because S uses V/m.",
          },
          {
            id: "Frekuensi alami \\(\\omega_n=\\sqrt{k/m}\\) memberi skala frekuensi mekanis; rasio redaman \\(\\zeta=c/(2\\sqrt{km})\\) mengatur pengaruh peredam. Nilainya menunjukkan bahwa sensitivitas tidak konstan pada semua frekuensi.",
            en: "Natural frequency \\(\\omega_n=\\sqrt{k/m}\\) sets the mechanical frequency scale; damping ratio \\(\\zeta=c/(2\\sqrt{km})\\) describes damping strength. These values show that sensitivity cannot be constant at every frequency.",
          },
        ],
        math: "\\boxed{\\frac{E(s)}{A(s)}=-\\frac{0.31}{s^2+69.2s+4800}}\\quad\\frac{\\mathrm V}{\\mathrm{m/s^2}},\\qquad\\omega_n=69.282\\ \\mathrm{rad/s},\\quad f_n=\\frac{\\omega_n}{2\\pi}=11.027\\ \\mathrm{Hz},\\quad\\zeta=0.4994",
      },
      {
        title: {
          id: "Ambil pendekatan untuk percepatan yang berubah lambat",
          en: "Use the slowly varying acceleration approximation",
        },
        body: [
          {
            id: "Jika frekuensi masukan jauh di bawah \\(\\omega_n\\), gerak relatif berubah cukup lambat sehingga \\(m\\ddot z\\) dan \\(c\\dot z\\) kecil dibanding \\(kz\\). Model lalu mendekati \\(kz=-ma\\).",
            en: "If input frequency is far below \\(\\omega_n\\), relative motion changes slowly enough that \\(m\\ddot z\\) and \\(c\\dot z\\) are small compared with \\(kz\\). The model then approaches \\(kz=-ma\\).",
          },
          {
            id: "Kita bagi dengan \\(k\\), lalu gunakan \\(E=Sz\\). Tanda negatif berasal dari arah simpangan relatif yang kita pilih; membalik kabel keluaran membalik tanda tanpa mengubah besar sensitivitas.",
            en: "We divide by \\(k\\), then use \\(E=Sz\\). The negative sign follows the chosen relative-displacement direction; reversing output wires changes the sign without changing sensitivity magnitude.",
          },
        ],
        math: "z\\approx-\\frac mk a,\\qquad E\\approx-\\frac{Sm}{k}a=-\\frac{0.31(0.05)}{240}a\\quad[\\mathrm V]",
        visual: {
          kind: "accelerometer",
          caption: {
            id: "Pada frekuensi rendah, simpangan relatif sebanding dengan percepatan.",
            en: "At low frequency, relative displacement is proportional to acceleration.",
          },
          params: {
            damping: 0.4994079828490263,
            sensitivity: 0.31,
            maxTravel: 0.01,
            frequency: 1,
            acceleration: 9.81,
            m: 0.05,
            k: 240,
            c: 3.46,
            omegaN: 69.2820323027551,
          },
        },
      },
      {
        title: {
          id: "Nyatakan sensitivitas dalam mV dan cara membacanya",
          en: "Express sensitivity in mV and show how to read it",
        },
        body: [
          {
            id: "Koefisien pada langkah sebelumnya adalah 0.0000645833 V per m/s². Kita kalikan dengan 1000 untuk memakai mV: besar sensitivitas menjadi 0.0645833 mV per m/s².",
            en: "The preceding coefficient is 0.0000645833 V per m/s². We multiply by 1000 to use mV: sensitivity magnitude becomes 0.0645833 mV per m/s².",
          },
          {
            id: "Jika keluaran yang diketahui berupa mV, bagi dengan sensitivitas tersebut untuk memperoleh percepatan. Hubungan ini hanya memakai pendekatan frekuensi rendah yang sudah disebut.",
            en: "If the known output is in mV, divide by that sensitivity to obtain acceleration. This relation retains the low-frequency assumption already stated.",
          },
        ],
        math: "E[\\mathrm{mV}]\\approx-0.0645833\\,a[\\mathrm{m/s^2}],\\qquad a[\\mathrm{m/s^2}]\\approx-15.4839\\,E[\\mathrm{mV}]",
      },
      {
        title: {
          id: "4c(ii) · Gunakan batas simpangan inti",
          en: "4c(ii) · Apply the core-displacement limit",
        },
        body: [
          {
            id: "Batas ±10 mm adalah simpangan relatif inti dari tengah, sehingga besar batasnya zmax=0.010 m. Dalam pendekatan lambat, besar percepatan yang mencapai batas itu adalah k zmax/m.",
            en: "The ±10 mm limit is relative core displacement from the centre, so its magnitude is zmax=0.010 m. Under the slow-input approximation, acceleration reaching that limit is k zmax/m.",
          },
          {
            id: "Tegangan pada batas tersebut adalah sensitivitas LVDT dikali 10 mm. Ini memberi cek lain: percepatan 48 m/s² dikali sensitivitas tegangan juga menghasilkan 3.1 mV.",
            en: "Voltage at the travel limit is LVDT sensitivity times 10 mm. This provides another check: acceleration of 48 m/s² times voltage sensitivity also gives 3.1 mV.",
          },
        ],
        math: "|a|_{\\max}=\\frac{kz_{\\max}}m=\\frac{240(0.010)}{0.05}=\\boxed{48\\ \\mathrm{m/s^2}},\\qquad |E|_{\\max}=0.31(10)=3.1\\ \\mathrm{mV}",
        visual: {
          kind: "accelerometer",
          caption: {
            id: "Batas ±10 mm berlaku pada simpangan relatif inti.",
            en: "The ±10 mm limit applies to relative core displacement.",
          },
          params: {
            damping: 0.4994079828490263,
            sensitivity: 0.31,
            maxTravel: 0.01,
            frequency: 1,
            acceleration: 48,
            m: 0.05,
            k: 240,
            c: 3.46,
            omegaN: 69.2820323027551,
          },
        },
      },
      {
        title: {
          id: "Jelaskan mengapa batas 48 m/s² bukan untuk semua frekuensi",
          en: "Explain why 48 m/s² is not a universal frequency-independent limit",
        },
        body: [
          {
            id: "Pada masukan sinus dengan frekuensi sudut \\(\\omega\\), substitusi \\(s=j\\omega\\) pada model memberi amplitudo simpangan \\(\\hat z=m\\hat a/\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}\\).",
            en: "For a sinusoidal input at angular frequency \\(\\omega\\), substituting \\(s=j\\omega\\) into the model gives displacement amplitude \\(\\hat z=m\\hat a/\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}\\).",
          },
          {
            id: "Batas mekanis tetap ±10 mm, tetapi percepatan yang menghasilkan simpangan itu dapat berubah menurut frekuensi. Untuk menemukan batas percepatan dinamik, setel amplitudo simpangan sama dengan zmax lalu selesaikan amplitudo percepatan.",
            en: "The mechanical limit stays ±10 mm, but the acceleration producing that displacement can change with frequency. Set displacement amplitude equal to zmax and solve for acceleration amplitude to obtain the dynamic limit.",
          },
          {
            id: "Soal tidak memberi frekuensi masukan. Oleh karena itu, 48 m/s² merupakan jawaban numerik dengan syarat kuasistatik, yaitu percepatan yang berubah cukup lambat.",
            en: "The question gives no input frequency. The numerical answer 48 m/s² therefore requires quasistatic operation, meaning acceleration changes sufficiently slowly.",
          },
        ],
        math: "\\hat a_{\\max}(\\omega)=\\frac{z_{\\max}}m\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}\\quad\\longrightarrow\\quad48\\ \\mathrm{m/s^2}\\ \\text{as }\\omega\\to0",
      },
    ],
    answer: {
      id: "Resolver memakai dua keluaran sinus/kosinus; LVDT memakai selisih sekunder. Model dinamik E/A = −0.31/(s²+69.2s+4800). Pada frekuensi rendah, sensitivitas 0.0645833 mV/(m/s²) dan batas percepatan ±48 m/s².",
      en: "A resolver uses sine/cosine outputs; an LVDT uses the secondary difference. Dynamic model E/A = −0.31/(s²+69.2s+4800). At low frequency, sensitivity magnitude is 0.0645833 mV/(m/s²), with acceleration limit ±48 m/s².",
    },
    answerMath:
      "\\boxed{\\begin{aligned}|E|&\\approx0.0645833|a|\\quad[\\mathrm{mV}]\\\\|a|_{\\max}&=48\\ \\mathrm{m/s^2}\\quad(\\omega\\ll\\omega_n)\\end{aligned}}",
    assumptions: [
      {
        id: "Koordinat simpangan diukur dari keseimbangan statik sehingga berat dan gaya pegas awal saling meniadakan. Tanda keluaran bergantung sambungan LVDT.",
        en: "Displacement is measured from static equilibrium, where weight and initial spring force cancel. Output sign depends on LVDT wiring.",
      },
      {
        id: "Batas percepatan numerik memakai kondisi kuasistatik. Pada frekuensi lain, gunakan fungsi respons dinamik.",
        en: "The numerical acceleration limit assumes quasistatic operation. At other frequencies, use the dynamic response.",
      },
    ],
    visual: {
      kind: "resolver",
      caption: {
        id: "Dua amplitudo bersama-sama menunjukkan sudut dan kuadran.",
        en: "Both amplitudes together determine angle and quadrant.",
      },
      params: {
        excitation: 1,
        theta: 30,
      },
    },
    referencePages: [15, 16, 18, 23],
  },
  {
    id: "2023-uas-q5",
    year: 2023,
    exam: "uas",
    number: 5,
    title: {
      id: "Kalibrasi dan pengaruh tegangan catu",
      en: "Calibration and supply-voltage effects",
    },
    topic: "calibration",
    source: {
      url: "https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view",
      file: "2023-uas.pdf",
      pages: [2],
    },
    originalLanguage: "en",
    original:
      "5. Systematic Characteristic of Measurement Systems\nA pressure sensor has an input range of 0.0 to 3.0 BarG and a standard supply voltage Vs = 0.5 volts. Using the calibration result given in the table,\na. [5%] Calculate the slope K and a of the ideal straight line.\nb. [5%] Calculate the constants KM and KI associated with supply voltage variations.\nc. [5%] Calculate the maximum non-linearity as a percentage of f.s.d.\nPressure x in Bar gauge (BarG): 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0.\nOutput voltage in millivolts (Vs = 0.5 volts): 0.0, 16.5, 32.0, 44.0, 51.5, 55.5, 58.5.\nOutput voltage in millivolts (Vs = 0.6 volts): 0.0, 21.0, 41.5, 56.0, 65.0, 70.5, 74.0.",
    prompt: {
      id: "Sensor tekanan memiliki rentang 0 sampai 3.0 barG dan catu nominal \\(V_s=0.5\\,\\mathrm V\\). Tekanan \\(x\\): 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0 barG. Keluaran pada 0.5 V: 0, 16.5, 32.0, 44.0, 51.5, 55.5, 58.5 mV. Keluaran pada 0.6 V: 0, 21.0, 41.5, 56.0, 65.0, 70.5, 74.0 mV. (a) Cari kemiringan \\(K\\) dan intersep \\(a\\) garis ideal. (b) Cari \\(K_M\\) dan \\(K_I\\) akibat perubahan catu. (c) Cari ketaklinearan maksimum sebagai persen rentang penuh.",
      en: "A pressure sensor spans 0 to 3.0 barG with nominal supply \\(V_s=0.5\\,\\mathrm V\\). Pressures \\(x\\): 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0 barG. Outputs at 0.5 V: 0, 16.5, 32.0, 44.0, 51.5, 55.5, 58.5 mV. Outputs at 0.6 V: 0, 21.0, 41.5, 56.0, 65.0, 70.5, 74.0 mV. (a) Find ideal-line slope \\(K\\) and intercept \\(a\\). (b) Find supply-effect constants \\(K_M\\) and \\(K_I\\). (c) Find maximum nonlinearity as a percentage of full-scale span.",
    },
    steps: [
      {
        title: {
          id: "5a · Tentukan garis acuan dari data standar",
          en: "5a · Define the reference line from standard data",
        },
        body: [
          {
            id: "Kalibrasi membandingkan tekanan masukan dengan tegangan keluaran. Kita memerlukan garis lurus acuan sebelum dapat membahas kemiringan atau nonlinearitas.",
            en: "Calibration compares input pressure with output voltage. A straight reference line is needed before discussing slope or nonlinearity.",
          },
          {
            id: "Catu standar adalah 0.5 V. Kita memilih garis yang melewati kedua titik ujungnya, yaitu (0 barG, 0 mV) dan (3 barG, 58.5 mV). Soal tidak menetapkan regresi kuadrat terkecil, yang dapat memberi garis berbeda.",
            en: "The standard supply is 0.5 V. We choose the line through its two endpoints: (0 barG, 0 mV) and (3 barG, 58.5 mV). The question does not specify least-squares regression, which could give a different line.",
          },
          {
            id: "Pada model \\(O=Kx+a\\), \\(x\\) adalah tekanan, \\(O\\) tegangan, \\(K\\) kemiringan atau sensitivitas, dan \\(a\\) keluaran saat tekanan nol.",
            en: "In \\(O=Kx+a\\), \\(x\\) is pressure, \\(O\\) voltage, \\(K\\) slope or sensitivity, and \\(a\\) zero-pressure output.",
          },
        ],
        math: "O_{\\rm ideal}=Kx+a",
      },
      {
        title: {
          id: "Hitung kemiringan dan keluaran pada nol",
          en: "Calculate slope and zero output",
        },
        body: [
          {
            id: "Kemiringan membagi perubahan keluaran dengan perubahan masukan. Tegangan naik 58.5 mV ketika tekanan naik 3 barG, sehingga setiap kenaikan 1 barG pada garis acuan memberi 19.5 mV.",
            en: "Slope divides output change by input change. Voltage rises 58.5 mV over a 3 barG pressure increase, so each additional 1 barG gives 19.5 mV on the reference line.",
          },
          {
            id: "Kita masukkan titik x=0, O=0 pada model untuk memperoleh a=0 mV. Nilai a adalah keluaran nol, sedangkan K menjelaskan laju perubahan keluaran; keduanya memiliki satuan berbeda.",
            en: "We insert x=0, O=0 into the model to obtain a=0 mV. The value a is zero output, while K is output change per input change; they have different units.",
          },
        ],
        math: "K=\\frac{58.5-0}{3-0}=19.5\\ \\mathrm{mV/barG},\\qquad a=0\\ \\mathrm{mV},\\qquad O_{\\rm ideal}=19.5x",
      },
      {
        title: {
          id: "5b · Nyatakan perubahan catu terhadap acuan",
          en: "5b · Express supply change relative to the reference",
        },
        body: [
          {
            id: "Definisikan \\(\\Delta V_s=V_s-0.5\\) V. Variabel ini nol pada kondisi standar dan 0.1 V pada kondisi kedua. Dengan definisi itu, \\(K\\) serta \\(a\\) tetap menyatakan karakteristik standar.",
            en: "We define \\(\\Delta V_s=V_s-0.5\\) V. It is zero at standard conditions and 0.1 V in the second condition. This keeps \\(K\\) and \\(a\\) as the standard-condition characteristics.",
          },
          {
            id: "Konstanta \\(K_M\\) menjelaskan perubahan kemiringan per volt perubahan catu. Konstanta \\(K_I\\) menjelaskan pergeseran keluaran nol per volt perubahan catu. Pengaruhnya berbeda: satu mengalikan tekanan, satu menambah keluaran pada semua tekanan.",
            en: "The constant \\(K_M\\) describes slope change per volt of supply change. The constant \\(K_I\\) describes zero-output shift per volt of supply change. Their effects differ: one multiplies pressure, while the other adds to output at every pressure.",
          },
        ],
        math: "O=[K+K_M\\Delta V_s]x+a+K_I\\Delta V_s",
      },
      {
        title: {
          id: "Cari kemiringan pada catu 0.6 V",
          en: "Find the slope at a 0.6 V supply",
        },
        body: [
          {
            id: "Pakai metode garis ujung yang sama pada data kedua. Kedua ujungnya adalah (0,0) dan (3,74.0), sehingga kemiringan menjadi 24.6667 mV/barG.",
            en: "Apply the same endpoint method to the second dataset. Its endpoints are (0,0) and (3,74.0), giving a slope of 24.6667 mV/barG.",
          },
          {
            id: "Kita bandingkan kemiringan ini dengan 19.5 mV/barG. Kenaikan catu 0.1 V meningkatkan sensitivitas, tetapi kita belum menyatakan seberapa besar kenaikan per satu volt.",
            en: "We compare that slope with 19.5 mV/barG. A 0.1 V supply increase raises sensitivity; we still need to express that change per one volt.",
          },
        ],
        math: "K_1=\\frac{74.0-0}{3-0}=24.6667\\ \\mathrm{mV/barG},\\qquad\\Delta K=24.6667-19.5=5.1667\\ \\mathrm{mV/barG}",
      },
      {
        title: {
          id: "Pisahkan perubahan sensitivitas dan pergeseran nol",
          en: "Separate sensitivity change from zero shift",
        },
        body: [
          {
            id: "Kita bagi kenaikan sensitivitas dengan kenaikan catu untuk memperoleh KM. Satuan tambahan per volt menunjukkan bahwa KM bukan sensitivitas tekanan itu sendiri.",
            en: "We divide the sensitivity increase by the supply increase to obtain KM. The additional per-volt unit shows that KM is not pressure sensitivity itself.",
          },
          {
            id: "Pada tekanan nol, kedua data memberi keluaran 0 mV. Keluaran nol tidak berubah di antara kedua kondisi, sehingga KI=0.",
            en: "At zero pressure, both datasets give 0 mV. Since zero output does not change between the conditions, KI=0.",
          },
          {
            id: "KI=0 tidak berarti catu tidak berpengaruh. Catu tetap mengubah kemiringan melalui KM yang tidak nol.",
            en: "KI=0 does not mean supply has no effect. It still changes slope through the nonzero KM.",
          },
        ],
        math: "K_M=\\frac{24.6667-19.5}{0.6-0.5}=\\boxed{51.6667\\ \\mathrm{mV/(barG\\,V)}},\\qquad K_I=\\frac{0-0}{0.1}=\\boxed{0\\ \\mathrm{mV/V}}",
        note: {
          id: "Konstanta ini menjelaskan perubahan garis ujung. Titik di tengah masih memuat ketaklinearan, yang juga dapat berubah bersama catu.",
          en: "These constants describe endpoint-line changes. Intermediate points retain nonlinearity, which may itself vary with supply.",
        },
      },
      {
        title: {
          id: "5c · Hitung keluaran garis ideal pada setiap tekanan",
          en: "5c · Calculate ideal-line output at each pressure",
        },
        body: [
          {
            id: "Nonlinearitas mengukur selisih kurva data dari garis lurus acuan. Untuk catu standar, garisnya \\(O_{\\rm ideal}=19.5x\\). Pada 1.5 barG, garis memberi \\(19.5(1.5)=29.25\\) mV.",
            en: "Nonlinearity measures the data curve's departure from its straight reference line. At standard supply, the line is \\(O_{\\rm ideal}=19.5x\\). At 1.5 barG, it gives \\(19.5(1.5)=29.25\\) mV.",
          },
          {
            id: "Data nyata pada tekanan itu adalah 44.0 mV. Selisihnya 44.0−29.25=14.75 mV. Kita perlu memeriksa semua titik sebelum menyebut nilai itu maksimum.",
            en: "The actual datum at that pressure is 44.0 mV. Its deviation is 44.0−29.25=14.75 mV. Check every point before calling that the maximum.",
          },
        ],
        math: "N(x)=O_{0.5}(x)-O_{\\rm ideal}(x)=O_{0.5}(x)-19.5x",
      },
      {
        title: {
          id: "Cari selisih terbesar dari seluruh tabel",
          en: "Find the largest deviation in the table",
        },
        body: [
          {
            id: "Tabel memakai data catu 0.5 V dan garis acuannya sendiri. Selisih antara dua kondisi catu bukan nonlinearitas yang sedang dicari.",
            en: "The table uses the 0.5 V data and its own reference line. Differences between the two supply conditions are not the nonlinearity being calculated.",
          },
          {
            id: "Selisih terbesar adalah 14.75 mV pada 1.5 barG. Kedua titik ujung berselisih nol karena garis acuan memang melewati keduanya; itu tidak membuat semua titik di tengah linear.",
            en: "The largest deviation is 14.75 mV at 1.5 barG. Both endpoint deviations are zero because the reference line passes through them; this does not make the intermediate points linear.",
          },
        ],
        math: "N_{\\max}=\\max_x|N(x)|=14.75\\ \\mathrm{mV}",
        table: {
          headers: [
            {
              id: "x (barG)",
              en: "x (barG)",
            },
            {
              id: "Keluaran (mV)",
              en: "Output (mV)",
            },
            {
              id: "Garis ideal (mV)",
              en: "Ideal line (mV)",
            },
            {
              id: "Selisih (mV)",
              en: "Deviation (mV)",
            },
          ],
          rows: [
            ["0", "0", "0", "0"],
            ["0.5", "16.5", "9.75", "6.75"],
            ["1.0", "32.0", "19.5", "12.5"],
            ["1.5", "44.0", "29.25", "14.75"],
            ["2.0", "51.5", "39.0", "12.5"],
            ["2.5", "55.5", "48.75", "6.75"],
            ["3.0", "58.5", "58.5", "0"],
          ],
        },
      },
      {
        title: {
          id: "Bagi dengan rentang keluaran penuh",
          en: "Divide by the full output span",
        },
        body: [
          {
            id: "Full-scale deflection, disingkat f.s.d., adalah perubahan keluaran sepanjang rentang masukan yang dipakai. Pada kondisi standar, span keluaran adalah 58.5−0=58.5 mV.",
            en: "Full-scale deflection, abbreviated f.s.d., is the output change across the input range. At standard conditions, output span is 58.5−0=58.5 mV.",
          },
          {
            id: "Kita bagi selisih maksimum dengan span tersebut, lalu kalikan 100%. Pembilang dan penyebut sama-sama mV, sehingga hasil perbandingan tidak memiliki satuan.",
            en: "We divide maximum deviation by that span, then multiply by 100%. Numerator and denominator are both in mV, so their ratio is dimensionless.",
          },
        ],
        math: "\\%N_{\\max}=\\frac{14.75\\ \\mathrm{mV}}{58.5\\ \\mathrm{mV}}\\times100\\%=\\boxed{25.2137\\%\\ \\mathrm{f.s.d.}}",
      },
      {
        title: {
          id: "Tafsirkan model dan batas hasilnya",
          en: "Interpret the model and its limits",
        },
        body: [
          {
            id: "K dan a merangkum garis ujung pada catu standar. KM dan KI merangkum perubahan garis ujung saat catu berubah. Data di antara titik ujung tetap memiliki nonlinearitas yang tidak dihapus oleh empat konstanta ini.",
            en: "K and a describe the standard-supply endpoint line. KM and KI describe how that endpoint line changes with supply. Intermediate data retain nonlinearity that these four constants do not remove.",
          },
          {
            id: "Angka 25.2137% menyatakan selisih terbesar terhadap span keluaran penuh, bukan persentase terhadap tekanan pada satu titik. Jika kita memilih regresi sebagai garis acuan, seluruh hitungan sensitivitas dan nonlinearitas harus mengikuti garis baru itu.",
            en: "The value 25.2137% is the largest deviation relative to full output span, not a percentage of pressure at one point. If regression were chosen as the reference, sensitivity and nonlinearity calculations would all need to use that new line.",
          },
        ],
      },
    ],
    answer: {
      id: "Dengan garis ujung: K=19.5 mV/barG, a=0, KM=51.6667 mV/(barG·V), KI=0. Ketaklinearan maksimum 25.2137% f.s.d.",
      en: "Using endpoint lines: K=19.5 mV/barG, a=0, KM=51.6667 mV/(barG·V), KI=0. Maximum nonlinearity is 25.2137% f.s.d.",
    },
    answerMath:
      "\\boxed{\\begin{aligned}K&=19.5\\ \\mathrm{mV/barG},&a&=0\\\\K_M&=51.6667\\ \\mathrm{mV/(barG\\,V)},&K_I&=0\\\\N_{\\max}&=25.2137\\%\\ \\mathrm{f.s.d.}\\end{aligned}}",
    assumptions: [
      {
        id: "Pakai garis ujung, bukan regresi kuadrat terkecil. KM dan KI merujuk perubahan catu dari 0.5 V.",
        en: "Use endpoint lines, not least-squares regression. KM and KI refer to supply change from 0.5 V.",
      },
    ],
    visual: {
      kind: "calibration",
      caption: {
        id: "Jarak vertikal data terhadap garis ujung menunjukkan ketaklinearan.",
        en: "Vertical distance from data to the endpoint line shows nonlinearity.",
      },
      params: {
        supply: 0.5,
        alternateSupply: 0.6,
        inputUnit: "barG",
        outputUnit: "mV",
        xs: [0, 0.5, 1, 1.5, 2, 2.5, 3],
        ys: [0, 16.5, 32, 44, 51.5, 55.5, 58.5],
        ys2: [0, 21, 41.5, 56, 65, 70.5, 74],
      },
    },
    referencePages: [],
  },
];

export const practice2023: PracticeQuestion[] = [
  {
    id: "concept-2023-01",
    topic: "systems",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uts1-q1",
    prompt: {
      id: "Sebuah sistem gaya memakai strain gauge, jembatan Wheatstone, mikrokontroler, dan LCD. Jembatan mengubah perubahan tahanan menjadi beda tegangan. Peran utama jembatan pada rantai ini adalah…",
      en: "A force system uses a strain gauge, Wheatstone bridge, microcontroller, and LCD. The bridge turns resistance change into a voltage difference. Its main role in this chain is…",
    },
    options: [
      {
        id: "Pengolah data, karena jembatan sudah menghitung gaya dalam satuan newton.",
        en: "Data processor, because the bridge already calculates force in newtons.",
      },
      {
        id: "Elemen sensor, karena semua bagian yang keluarannya berubah adalah sensor.",
        en: "Sensing element, because any part with a changing output is a sensor.",
      },
      {
        id: "Pengondisi sinyal, karena jembatan mengubah keluaran sensor menjadi bentuk listrik yang lebih mudah dibaca.",
        en: "Signal conditioner, because it converts the sensor output into a more readable electrical form.",
      },
      {
        id: "Penyaji data, karena beda tegangan langsung memberi tampilan bagi pengguna.",
        en: "Data presenter, because a voltage difference directly provides a user display.",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Strain gauge berhubungan langsung dengan regangan dan mengubah tahanan. Jembatan membaca perubahan itu sebagai beda tegangan, sehingga perannya pengondisi sinyal. Mengubah bentuk sinyal belum sama dengan menghitung gaya lewat kalibrasi atau menampilkan hasil.",
      en: "The strain gauge directly responds to strain by changing resistance. The bridge reads that change as a voltage difference, so its role is signal conditioning. Changing signal form is distinct from calculating calibrated force or displaying a result.",
    },
    optionExplanations: [
      {
        id: "Jembatan memberi tegangan. Perhitungan gaya melalui persamaan kalibrasi merupakan tugas pengolahan berikutnya.",
        en: "The bridge supplies voltage. Converting it into force through calibration belongs to later processing.",
      },
      {
        id: "Perubahan keluaran saja tidak menentukan kelas sensor. Dalam rantai ini, strain gauge yang pertama merespons regangan mekanis.",
        en: "A changing output does not by itself define a sensor. In this chain, the strain gauge first responds to mechanical strain.",
      },
      {
        id: "Benar. Jembatan mengubah perubahan tahanan menjadi beda tegangan untuk tahap berikutnya.",
        en: "Correct. The bridge converts resistance change into a voltage difference for the next stage.",
      },
      {
        id: "LCD menyajikan hasil. Tegangan internal belum merupakan tampilan yang dapat dibaca pengguna.",
        en: "The LCD presents the result. An internal voltage is not yet a user-readable display.",
      },
    ],
  },
  {
    id: "concept-2023-02",
    topic: "calibration",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uts1-q2",
    prompt: {
      id: "Setelah catu sensor gaya dinaikkan, garis kalibrasi menjadi lebih curam, tetapi keluaran saat gaya nol tetap. Kesimpulan mana yang paling tepat untuk model garis ini?",
      en: "After a force sensor's supply is increased, its calibration line becomes steeper, while its zero-force output stays unchanged. Which conclusion best fits this linear model?",
    },
    options: [
      {
        id: "Catu mengubah sensitivitas; bukti ini tidak menunjukkan pergeseran nol.",
        en: "Supply changes sensitivity; this evidence does not show a zero shift.",
      },
      {
        id: "Catu tidak berpengaruh karena keluaran nol tetap.",
        en: "Supply has no effect because zero output stays unchanged.",
      },
      {
        id: "Catu menambah offset yang sama pada semua gaya.",
        en: "Supply adds the same offset at every force.",
      },
      {
        id: "Semua selisih akibat catu harus disebut nonlinearitas.",
        en: "Every supply-induced difference must be called nonlinearity.",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Kemiringan menyatakan perubahan keluaran per perubahan gaya. Garis yang lebih curam berarti sensitivitas berubah. Offset yang tetap menunjukkan tidak ada pergeseran nol pada garis itu. Nonlinearitas memerlukan pemeriksaan jarak data dari garis, bukan sekadar membandingkan dua kemiringan.",
      en: "Slope expresses output change per force change. A steeper line means sensitivity has changed. An unchanged intercept means no zero shift in that line. Nonlinearity requires checking departures from a line rather than merely comparing two slopes.",
    },
    optionExplanations: [
      {
        id: "Benar. Perubahan kemiringan menunjukkan masukan yang memodifikasi sensitivitas, bukan tambahan offset tetap.",
        en: "Correct. A slope change indicates an input that modifies sensitivity, rather than a fixed additive offset.",
      },
      {
        id: "Keluaran nol hanya memeriksa offset. Sensitivitas masih dapat berubah meskipun titik nol tetap.",
        en: "Zero output tests only the offset. Sensitivity can change even when the zero point stays fixed.",
      },
      {
        id: "Offset seragam akan menggeser seluruh garis, termasuk titik gaya nol. Di sini titik nol tetap.",
        en: "A uniform offset would shift the entire line, including the zero-force point. Here that point stays fixed.",
      },
      {
        id: "Dua garis lurus dapat memiliki kemiringan berbeda tanpa masing-masing memiliki nonlinearitas.",
        en: "Two straight lines can have different slopes without either line being nonlinear.",
      },
    ],
  },
  {
    id: "concept-2023-03",
    topic: "dynamics",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uts1-q4",
    prompt: {
      id: "Termometer orde satu mula-mula tunak pada suhu yang tidak nol, lalu menerima kenaikan suhu mendadak. Soal meminta waktu untuk mencapai 98% perubahan suhu. Acuan 98% yang benar adalah…",
      en: "A first-order thermometer starts at equilibrium at a nonzero temperature, then receives a sudden temperature rise. The question asks when it reaches 98% of the temperature change. The correct reference for 98% is…",
    },
    options: [
      {
        id: "Nilai keluaran akhir yang dihitung dari nol, tanpa memperhatikan nilai awal.",
        en: "The final output measured from zero, regardless of the initial value.",
      },
      {
        id: "Jumlah waktu sejak alat dinyalakan, walaupun suhu berubah jauh sesudahnya.",
        en: "Total time since power-on, even if the temperature step happens much later.",
      },
      {
        id: "Konstanta waktu alat; setelah satu konstanta waktu, keluaran selalu mencapai 98%.",
        en: "The instrument's time constant; after one time constant, output always reaches 98%.",
      },
      {
        id: "Kenaikan keluaran dari nilai awal menuju nilai akhir, dengan waktu dihitung sejak suhu berubah.",
        en: "The output increase from initial to final value, with time measured from the temperature step.",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Persentase respons langkah mengacu pada perubahan yang harus ditempuh, yaitu nilai akhir dikurangi nilai awal. Jam respons mulai saat langkah terjadi. Menggunakan nol keluaran mengubah besar perubahan; menggunakan waktu menyala memasukkan masa ketika sensor masih tunak.",
      en: "Step-response percentage refers to the required change: final value minus initial value. The response clock begins at the step. Referencing zero output changes the size of the change, while time since power-on includes an earlier equilibrium period.",
    },
    optionExplanations: [
      {
        id: "Jika keluaran awal tidak nol, 98% nilai akhir berbeda dari 98% kenaikan. Itu bukan besaran yang soal minta.",
        en: "With nonzero initial output, 98% of the final value differs from 98% of the rise. The first quantity does not match the requested change.",
      },
      {
        id: "Respons terhadap langkah belum berlangsung sebelum langkah terjadi. Waktu menyala tidak otomatis sama dengan waktu respons.",
        en: "The step response has not begun before the step occurs. Power-on time is not automatically response duration.",
      },
      {
        id: "Konstanta waktu mengatur laju respons, bukan menyatakan waktu untuk semua persentase. Satu konstanta waktu belum mencapai 98% perubahan.",
        en: "The time constant sets response speed, not the time for every percentage. One time constant does not complete 98% of the change.",
      },
      {
        id: "Benar. Fraksi selesai harus diukur dari keluaran awal dan dibandingkan dengan seluruh perubahan menuju keadaan akhir.",
        en: "Correct. The completed fraction is measured from initial output and compared with the whole change toward equilibrium.",
      },
    ],
  },
  {
    id: "concept-2023-04",
    topic: "flow",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uas-q1",
    prompt: {
      id: "Sebuah Venturi diganti nozzle dengan diameter pipa dan leher yang sama. Untuk kondisi ini, Cd nozzle diketahui lebih rendah. Pompa menjaga debit tetap dan manometer memakai fluida yang sama. Apa yang terjadi pada selisih tinggi manometer?",
      en: "A Venturi is replaced by a nozzle with the same pipe and throat diameters. For these conditions, the nozzle Cd is known to be lower. The pump holds flow constant and the manometer fluids stay the same. What happens to the manometer height difference?",
    },
    options: [
      {
        id: "Turun, karena Cd yang lebih kecil selalu berarti beda tekanan lebih kecil.",
        en: "It falls because a smaller Cd always means a smaller pressure difference.",
      },
      {
        id: "Naik, karena debit yang sama memerlukan beda tekanan lebih besar ketika Cd lebih kecil.",
        en: "It rises because the same flow requires a larger pressure difference when Cd is lower.",
      },
      {
        id: "Pasti nol, karena pompa sudah menjaga debit tetap.",
        en: "It must become zero because the pump maintains constant flow.",
      },
      {
        id: "Tetap, karena kedua diameter tidak berubah.",
        en: "It stays the same because both diameters are unchanged.",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Pada geometri dan fluida yang tetap, debit bertambah dengan Cd dan akar beda tekanan. Jika Cd turun tetapi debit dijaga, beda tekanan harus naik. Selisih tinggi manometer ikut naik. Diameter yang sama saja tidak menjamin pembacaan yang sama, dan debit tetap tidak berarti beda tekanan nol.",
      en: "For fixed geometry and fluid, flow increases with Cd and the square root of pressure difference. If Cd falls while flow is maintained, pressure difference must rise. Manometer height rises with it. Equal diameters alone do not ensure equal readings, and constant flow does not mean zero pressure difference.",
    },
    optionExplanations: [
      {
        id: "Kesimpulan itu mengabaikan syarat debit tetap. Cd yang lebih kecil perlu diimbangi beda tekanan yang lebih besar.",
        en: "This ignores the fixed-flow condition. A smaller Cd must be compensated by greater pressure difference.",
      },
      {
        id: "Benar. Beda tekanan dan tinggi manometer meningkat agar debit tetap sama pada Cd yang lebih kecil.",
        en: "Correct. Pressure difference and manometer height increase to maintain the same flow with lower Cd.",
      },
      {
        id: "Pompa mempertahankan aliran dengan menyediakan tekanan yang diperlukan. Pengaturan debit tidak menghapus penurunan tekanan pada meter.",
        en: "The pump maintains flow by supplying the required pressure. Flow regulation does not remove the meter's pressure drop.",
      },
      {
        id: "Geometri sama hanya mempertahankan faktor geometri. Perubahan Cd masih memengaruhi hubungan debit dengan tekanan.",
        en: "Equal geometry preserves only the geometric factor. Cd still changes the relationship between flow and pressure.",
      },
    ],
  },
  {
    id: "concept-2023-05",
    topic: "temperature",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uts2-q2",
    prompt: {
      id: "Tabel termokopel memakai referensi 0°C, tetapi sambungan referensi alat berada di atas 0°C. Tegangan terukur sudah diketahui. Bagaimana cara yang tepat mencari suhu sambungan panas dari tabel?",
      en: "A thermocouple table uses a 0°C reference, but the instrument's reference junction is above 0°C. The measured voltage is known. How should the hot-junction temperature be found from the table?",
    },
    options: [
      {
        id: "Kurangi tegangan tabel referensi dari tegangan terukur, lalu cari suhu.",
        en: "Subtract the reference table voltage from measured voltage, then look up temperature.",
      },
      {
        id: "Cari tegangan terukur langsung pada tabel, lalu tambahkan suhu referensi.",
        en: "Look up measured voltage directly, then add reference temperature.",
      },
      {
        id: "Abaikan referensi karena termokopel selalu memberi suhu panas secara absolut.",
        en: "Ignore the reference because a thermocouple always reports absolute hot-junction temperature.",
      },
      {
        id: "Tambahkan tegangan tabel pada suhu referensi ke tegangan terukur, lalu cari suhu dari tegangan total itu.",
        en: "Add the reference temperature's table voltage to the measured voltage, then look up temperature from that total.",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Tegangan terukur merupakan tegangan tabel sambungan panas dikurangi tegangan tabel referensi. Untuk memulihkan tegangan panas terhadap 0°C, tambahkan kontribusi referensi. Menambahkan suhu setelah pencarian tabel tidak tepat secara umum karena hubungan suhu dengan tegangan tidak linear.",
      en: "Measured voltage equals the hot-junction table voltage minus the reference-junction table voltage. Recover the hot-junction voltage relative to 0°C by adding the reference contribution. Adding temperatures after lookup is generally invalid because the relationship between temperature and voltage is nonlinear.",
    },
    optionExplanations: [
      {
        id: "Pengurangan sudah terjadi pada tegangan yang diukur. Menguranginya lagi membuat koreksi referensi salah arah.",
        en: "The reference contribution was already subtracted in the measurement. Subtracting it again applies the correction in the wrong direction.",
      },
      {
        id: "Cara ini menganggap tegangan hanya bergantung secara linear pada selisih suhu. Tabel nyata tidak mengikuti asumsi itu secara tepat.",
        en: "This assumes voltage is a linear function of temperature difference. Real tables do not follow that assumption exactly.",
      },
      {
        id: "Keluaran termokopel bergantung pada kedua sambungan. Suhu referensi diperlukan untuk membaca suhu panas.",
        en: "Thermocouple output depends on both junctions. Reference temperature is needed to infer the hot-junction temperature.",
      },
      {
        id: "Benar. Samakan acuan tegangan terlebih dahulu, baru gunakan tabel untuk mencari suhu.",
        en: "Correct. Put the voltage on the same reference basis before using the table to find temperature.",
      },
    ],
  },
  {
    id: "concept-2023-06",
    topic: "position",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uts2-q3",
    prompt: {
      id: "Sebuah poros dapat bergeser saat daya mati. Setelah daya kembali, sistem harus membaca posisi dalam satu putaran tanpa menggerakkan poros untuk mencari acuan. Pilihan yang paling sesuai adalah…",
      en: "A shaft may move while power is off. After power returns, the system must read its position within one revolution without moving it to find a reference. The most suitable choice is…",
    },
    options: [
      {
        id: "Encoder inkremental satu kanal, karena setiap pulsa adalah kode posisi unik.",
        en: "A one-channel incremental encoder, because each pulse is a unique position code.",
      },
      {
        id: "Encoder inkremental dengan indeks Z, karena indeks menunjukkan semua sudut saat poros diam.",
        en: "An incremental encoder with index Z, because the index identifies every angle while stationary.",
      },
      {
        id: "Encoder absolut single-turn, karena kode saat ini menunjukkan posisi dalam satu putaran.",
        en: "A single-turn absolute encoder, because its current code identifies position within one revolution.",
      },
      {
        id: "Encoder inkremental A/B tanpa penyimpanan posisi, karena dua kanal selalu memberi posisi absolut.",
        en: "An A/B incremental encoder without position retention, because two channels always provide absolute position.",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Encoder absolut single-turn memberi kode posisi saat dibaca, sehingga tidak perlu mengumpulkan pulsa gerak sejak acuan. A/B memberi arah dan perubahan posisi; indeks Z memberi satu tanda acuan, bukan kode untuk semua sudut. Kebutuhan soal hanya dalam satu putaran, sehingga belum memerlukan informasi jumlah putaran.",
      en: "A single-turn absolute encoder supplies a position code at readout, without accumulating motion pulses from a reference. A/B provides direction and position change; index Z marks one reference rather than every angle. The requirement is only within one revolution, so turn-count information is not needed.",
    },
    optionExplanations: [
      {
        id: "Pola satu kanal berulang. Tanpa hitungan dan posisi awal, pulsa tidak mengidentifikasi sektor secara unik.",
        en: "A single-channel pattern repeats. Without a count and initial position, pulses do not uniquely identify the sector.",
      },
      {
        id: "Indeks hanya aktif dekat satu posisi. Pada posisi lain saat diam, sistem belum mengetahui jaraknya dari indeks.",
        en: "The index is active near one position. At another stationary position, the system does not know its distance from that index.",
      },
      {
        id: "Benar. Kode unik per sektor memenuhi syarat membaca sudut dalam satu putaran tanpa gerak acuan.",
        en: "Correct. A unique code per sector meets the requirement for reading single-turn angle without reference motion.",
      },
      {
        id: "Dua kanal membedakan arah gerak, tetapi tidak memulihkan hitungan yang hilang saat daya mati.",
        en: "Two channels distinguish motion direction but do not recover a count lost during power-off.",
      },
    ],
  },
  {
    id: "concept-2023-07",
    topic: "position",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uts2-q3",
    prompt: {
      id: "Pada probe level dengan dua elektroda tegak, bagian atas celah berisi udara dan bagian bawah berisi cairan. Kedua bagian terhubung ke pasangan elektroda yang sama. Mengapa kapasitansi kedua daerah dijumlahkan seperti kapasitor paralel?",
      en: "A vertical two-electrode level probe has air in the upper gap and liquid in the lower gap. Both regions connect across the same pair of electrodes. Why do their capacitances add like parallel capacitors?",
    },
    options: [
      {
        id: "Kedua daerah mengalami tegangan yang sama, sementara muatan keduanya menambah muatan total.",
        en: "Both regions have the same voltage, while their charges add to the total charge.",
      },
      {
        id: "Cairan meniadakan semua kapasitansi pada daerah udara.",
        en: "Because liquid eliminates all capacitance in the air region.",
      },
      {
        id: "Arus harus melewati udara lalu cairan karena udara berada di atas cairan.",
        en: "Because air is above liquid, current must pass through them sequentially.",
      },
      {
        id: "Semua kapasitor dengan bahan dielektrik berbeda selalu tersusun paralel.",
        en: "Because capacitors with different dielectric materials are always parallel.",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Susunan listrik ditentukan oleh elektroda dan arah medan, bukan semata urutan atas dan bawah. Kedua daerah memiliki beda tegangan yang sama dan menyumbang muatan ke terminal yang sama, sehingga kapasitansi menambah. Model seri baru sesuai jika lapisan tersusun berturut-turut sepanjang arah medan dengan pembagian tegangan.",
      en: "Electrical arrangement follows the electrodes and field direction, not just top-to-bottom order. Both regions have the same potential difference and contribute charge to the same terminals, so capacitances add. A series model instead suits successive layers along the field direction with divided voltage.",
    },
    optionExplanations: [
      {
        id: "Benar. Kesamaan beda tegangan dan penjumlahan muatan menentukan model paralel.",
        en: "Correct. Equal voltage and additive charge determine the parallel model.",
      },
      {
        id: "Daerah udara tetap menyumbang kapasitansi selama masih berada dalam bagian elektroda aktif.",
        en: "The air region still contributes capacitance while it remains within the active electrode region.",
      },
      {
        id: "Posisi atas dan bawah tidak memaksa hubungan seri. Di sini medan melintasi celah antara elektroda pada tiap ketinggian.",
        en: "Top-to-bottom position does not force a series connection. Here the field crosses the electrode gap at each height.",
      },
      {
        id: "Bahan berbeda tidak menentukan hubungan rangkaian. Geometri dan sambungan elektroda yang menentukannya.",
        en: "Different materials do not determine circuit arrangement. Geometry and electrode connections do.",
      },
    ],
  },
  {
    id: "concept-2023-08",
    topic: "dynamics",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uts2-q4",
    prompt: {
      id: "Vibrometer menghasilkan tegangan yang sebanding dengan kecepatan. Dua getaran sinus memiliki amplitudo percepatan yang sama, tetapi frekuensinya berbeda. Keduanya masih berada dalam rentang sensitivitas tetap alat. Mengapa getaran berfrekuensi lebih tinggi memberi tegangan lebih kecil?",
      en: "A vibrometer produces voltage proportional to velocity. Two sinusoidal vibrations have equal acceleration amplitude but different frequencies, both within the constant-sensitivity range. Why does the higher-frequency vibration give less voltage?",
    },
    options: [
      {
        id: "Frekuensi mengubah satuan tegangan dari volt menjadi milivolt.",
        en: "Frequency changes the voltage unit from volts to millivolts.",
      },
      {
        id: "Percepatan yang sama harus menghasilkan kecepatan yang sama pada semua frekuensi.",
        en: "Equal acceleration must produce equal velocity at all frequencies.",
      },
      {
        id: "Untuk gerak sinus, percepatan yang sama pada frekuensi lebih tinggi memerlukan amplitudo kecepatan lebih kecil.",
        en: "For sinusoidal motion, equal acceleration at higher frequency requires smaller velocity amplitude.",
      },
      {
        id: "Sensitivitas alat pasti turun setiap kali frekuensi naik, walaupun soal menyatakan tetap.",
        en: "Instrument sensitivity must fall with increasing frequency even though it is stated to be constant.",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Percepatan adalah laju perubahan kecepatan. Pada getaran lebih cepat, kecepatan yang lebih kecil dapat memberi amplitudo percepatan yang sama. Sensor membaca kecepatan dengan sensitivitas tetap, sehingga tegangannya ikut mengecil. Penyebabnya adalah besaran gerak yang masuk, bukan perubahan sensitivitas.",
      en: "Acceleration is the rate of change of velocity. In a faster oscillation, a smaller velocity amplitude can produce the same acceleration amplitude. Since the sensor reads velocity with constant sensitivity, voltage decreases too. The cause is the input motion quantity rather than a sensitivity change.",
    },
    optionExplanations: [
      {
        id: "Volt dan milivolt hanya dua cara menuliskan tegangan yang sama. Perubahan satuan tidak menjelaskan perubahan fisik.",
        en: "Volts and millivolts are alternative ways of expressing the same voltage. Unit conversion does not explain a physical change.",
      },
      {
        id: "Hubungan percepatan dengan kecepatan juga bergantung pada frekuensi getaran sinus.",
        en: "The relationship between acceleration and velocity also depends on sinusoidal frequency.",
      },
      {
        id: "Benar. Sensor merespons kecepatan yang lebih kecil pada percepatan tetap dan frekuensi lebih besar.",
        en: "Correct. At fixed acceleration and higher frequency, the sensor receives a smaller velocity amplitude.",
      },
      {
        id: "Ini bertentangan dengan syarat sensitivitas tetap di dalam rentang kerja yang disebut.",
        en: "This contradicts the stated constant-sensitivity condition within the working band.",
      },
    ],
  },
  {
    id: "concept-2023-09",
    topic: "statistics",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uas-q2",
    prompt: {
      id: "Tahanan beberapa strain gauge berkumpul rapat, sehingga simpangan baku sampelnya kecil. Nilai benar tersertifikasi untuk tiap unit belum tersedia. Kesimpulan apa yang didukung data tersebut?",
      en: "Several strain-gauge resistances cluster closely, giving a small sample standard deviation. Certified true values for the units are unavailable. What conclusion do the data support?",
    },
    options: [
      {
        id: "Rata-rata tidak lagi diperlukan karena simpangan baku sudah memberi pusat data.",
        en: "The mean is unnecessary because standard deviation already provides the centre.",
      },
      {
        id: "Sebaran tahanan yang teramati kecil; bias terhadap nilai benar belum dapat dipastikan.",
        en: "Observed resistance spread is small; bias relative to true values remains undetermined.",
      },
      {
        id: "Semua hasil pasti dekat dengan nilai benar.",
        en: "All results must be close to their true values.",
      },
      {
        id: "Alat ukur pasti tidak memiliki galat karena pengulangan konsisten.",
        en: "The measuring instrument must be error-free because results are consistent.",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Simpangan baku menggambarkan sebaran terhadap rata-rata, bukan jarak dari nilai benar. Sekumpulan hasil dapat berdekatan tetapi semuanya bergeser akibat bias. Data antarunit juga mencampur variasi produk dan pengukuran, sehingga tidak otomatis menjadi ukuran galat alat saja.",
      en: "Standard deviation describes spread around the mean rather than distance from a true value. Results can cluster tightly while sharing a bias. Between-unit measurements also combine product variation and measurement effects, so they do not automatically isolate instrument error.",
    },
    optionExplanations: [
      {
        id: "Simpangan baku memberi ukuran sebaran. Rata-rata tetap diperlukan untuk menyatakan pusat data.",
        en: "Standard deviation measures spread. The mean is still needed to state the data centre.",
      },
      {
        id: "Benar. Sebaran dapat dinilai dari sampel; bias memerlukan acuan atau informasi tambahan.",
        en: "Correct. The sample supports a spread assessment; bias requires a reference or additional information.",
      },
      {
        id: "Kedekatan antarhasil tidak menjamin kedekatan terhadap nilai benar yang belum diketahui.",
        en: "Closeness between results does not establish closeness to an unknown true value.",
      },
      {
        id: "Bias yang sama pada semua pembacaan dapat tetap menghasilkan simpangan baku kecil.",
        en: "A common bias in all readings can still produce a small standard deviation.",
      },
    ],
  },
  {
    id: "concept-2023-10",
    topic: "dynamics",
    difficulty: "reasoning",
    sourceQuestionId: "2023-uas-q4",
    prompt: {
      id: "Akselerometer massa dan pegas memakai LVDT untuk membaca simpangan relatif inti. Teknisi menghitung batas percepatan dari kekakuan pegas dan batas gerak inti dengan model kuasistatik, lalu menerapkannya pada semua frekuensi. Apa yang perlu diperbaiki?",
      en: "A spring and mass accelerometer uses an LVDT to read relative core displacement. A technician calculates acceleration range from spring stiffness and core travel using a quasistatic model, then applies that range at every frequency. What needs correction?",
    },
    options: [
      {
        id: "Batas gerak tetap berlaku, tetapi hubungan percepatan dengan simpangan perlu memakai massa, pegas, redaman, dan frekuensi masukan.",
        en: "The travel limit still applies, but acceleration-to-displacement response must include mass, stiffness, damping, and input frequency.",
      },
      {
        id: "LVDT sebenarnya membaca percepatan absolut secara langsung, sehingga model mekanis tidak diperlukan.",
        en: "The LVDT directly reads absolute acceleration, so no mechanical model is needed.",
      },
      {
        id: "Cukup membalik tanda tegangan; sensitivitas amplitudo tidak pernah bergantung frekuensi.",
        en: "Simply reverse voltage polarity; amplitude sensitivity never depends on frequency.",
      },
      {
        id: "Batas gerak inti harus dianggap tidak berlaku pada getaran sinus.",
        en: "Core-travel limits should be ignored for sinusoidal vibration.",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "LVDT membaca simpangan relatif, sedangkan massa, pegas, dan peredam mengubah percepatan menjadi simpangan itu. Pada frekuensi rendah, model kuasistatik dapat berlaku. Pada frekuensi lain, respons dinamik mengubah simpangan untuk percepatan yang sama. Batas inti tetap, sehingga batas percepatan yang terkait dapat berubah.",
      en: "The LVDT reads relative displacement, while the mass, spring, and damper system converts acceleration into that displacement. The quasistatic approximation can hold at low frequency. Elsewhere, dynamic response changes displacement for the same acceleration. The core limit stays fixed, so its corresponding acceleration limit can change.",
    },
    optionExplanations: [
      {
        id: "Benar. Model dinamik diperlukan untuk menghubungkan batas simpangan tetap dengan batas percepatan pada tiap frekuensi.",
        en: "Correct. A dynamic model connects the fixed displacement limit with the acceleration limit at each frequency.",
      },
      {
        id: "LVDT mengukur posisi inti terhadap rumah. Hubungan posisi itu dengan percepatan berasal dari model mekanis.",
        en: "The LVDT measures core position relative to the housing. The mechanical model connects that position to acceleration.",
      },
      {
        id: "Polaritas mengubah tanda, bukan menghapus ketergantungan amplitudo pada frekuensi.",
        en: "Polarity changes sign; it does not remove frequency dependence of amplitude.",
      },
      {
        id: "Batas gerak adalah batas fisik inti. Getaran sinus tetap dapat melampauinya.",
        en: "Travel is a physical core limit. Sinusoidal motion can still exceed it.",
      },
    ],
  },
];

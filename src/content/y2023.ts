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
          id: "1a · Ubah tinggi menjadi beda tekanan",
          en: "1a · Convert height to pressure difference",
        },
        body: [
          {
            id: "Kita pakai meter: \\(D=0.800\\), \\(d=0.160\\), dan \\(h=0.450\\). Pada dua tap yang sama tinggi, air di atas raksa ikut memberi tekanan. Karena itu, pakai selisih massa jenis.",
            en: "Use metres: \\(D=0.800\\), \\(d=0.160\\), and \\(h=0.450\\). With pressure taps at the same elevation, water above the mercury also contributes pressure. We therefore use the density difference.",
          },
          {
            id: "Tekanan hulu lebih tinggi. Tekanan itu menekan permukaan raksa di sisi hulu, sehingga sisi hilir lebih tinggi.",
            en: "Upstream pressure is higher. It pushes down the upstream mercury surface, leaving the downstream surface higher.",
          },
        ],
        math: "\\Delta p=(\\rho_m-\\rho_w)gh=(13600-1000)(9.81)(0.450)=55622.7\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "Hubungkan debit dengan beda tekanan",
          en: "Connect flow rate to pressure difference",
        },
        body: [
          {
            id: "Kontinuitas memberi \\(Q=A_1v_1=A_2v_2\\). Bernoulli untuk aliran ideal mendatar memberi \\(\\Delta p=\\tfrac12\\rho(v_2^2-v_1^2)\\). Gabungkan keduanya, lalu kalikan dengan \\(C_d\\) untuk memperhitungkan aliran nyata.",
            en: "Continuity gives \\(Q=A_1v_1=A_2v_2\\). Bernoulli for ideal horizontal flow gives \\(\\Delta p=\\tfrac12\\rho(v_2^2-v_1^2)\\). Combine them, then multiply by \\(C_d\\) to account for real flow.",
          },
          {
            id: "Rasio diameter \\(\\beta=d/D=0.2\\), sehingga faktor dalam akar memakai \\(\\beta^4\\), bukan \\(\\beta^2\\).",
            en: "The diameter ratio is \\(\\beta=d/D=0.2\\), so the square-root factor contains \\(\\beta^4\\), not \\(\\beta^2\\).",
          },
        ],
        math: "Q=C_d\\frac{\\pi d^2}{4}\\sqrt{\\frac{2\\Delta p}{\\rho_w(1-\\beta^4)}}=C_d(0.2122358)\\ \\mathrm{m^3/s}",
      },
      {
        title: {
          id: "Pilih koefisien yang cocok dengan Reynolds",
          en: "Choose a coefficient consistent with Reynolds number",
        },
        body: [
          {
            id: "Tabel memerlukan \\(Re\\), tetapi \\(Re\\) memerlukan debit. Mulai dengan \\(C_d=0.600\\): kita dapat \\(Q=0.127341\\,\\mathrm{m^3/s}\\) dan \\(Re\\approx2.13\\times10^4\\). Jadi, gunakan baris \\(\\beta=0.2\\) antara kolom \\(10^4\\) dan \\(10^5\\).",
            en: "The table needs \\(Re\\), while \\(Re\\) needs the flow rate. Start with \\(C_d=0.600\\): this gives \\(Q=0.127341\\,\\mathrm{m^3/s}\\) and \\(Re\\approx2.13\\times10^4\\). Use the \\(\\beta=0.2\\) row between \\(10^4\\) and \\(10^5\\).",
          },
          {
            id: "Dengan interpolasi terhadap \\(\\log_{10}Re\\), lalu ulangi hitungan, hasilnya \\(C_d=0.59837\\) dan \\(Re=2.1209\\times10^4\\). Pembulatan \\(C_d\\approx0.60\\) juga memberi \\(Q\\approx0.127\\,\\mathrm{m^3/s}\\).",
            en: "Interpolating against \\(\\log_{10}Re\\) and repeating the calculation gives \\(C_d=0.59837\\) and \\(Re=2.1209\\times10^4\\). Rounding to \\(C_d\\approx0.60\\) also gives \\(Q\\approx0.127\\,\\mathrm{m^3/s}\\).",
          },
        ],
        math: "Re=\\frac{\\rho_wv_1D}{\\mu}=\\frac{4\\rho_wQ}{\\pi\\mu D},\\qquad \\boxed{Q\\approx0.1270\\ \\mathrm{m^3/s}=127.0\\ \\mathrm{L/s}}",
        note: {
          id: "Soal tidak menetapkan cara interpolasi. Digit akhir dapat sedikit berubah; tiga angka penting tetap sama.",
          en: "The problem does not prescribe an interpolation method. Final digits can vary slightly; the three-significant-figure result is unchanged.",
        },
      },
      {
        title: {
          id: "1b · Cairan konduktif",
          en: "1b · Conductive liquid",
        },
        body: [
          {
            id: "Pilih flowmeter elektromagnetik. Cairan konduktif yang bergerak melintasi medan magnet menimbulkan tegangan pada elektroda. Pada geometri dan medan tetap, tegangan sebanding dengan kecepatan rata-rata, lalu \\(Q=Av\\).",
            en: "Choose an electromagnetic flowmeter. A conducting liquid moving across a magnetic field creates a voltage between electrodes. For fixed geometry and magnetic field, voltage is proportional to mean velocity, then \\(Q=Av\\).",
          },
          {
            id: "Untuk H₂SO₄, bahan elektroda dan pelapis pipa juga harus tahan terhadap konsentrasi serta suhu asam. Sifat konduktif saja belum cukup untuk menentukan bahan alat.",
            en: "For H₂SO₄, the electrode and pipe-liner materials must also suit the acid concentration and temperature. Conductivity alone does not determine material compatibility.",
          },
        ],
        math: "e=BLv,\\qquad Q=Av",
      },
      {
        title: {
          id: "1c · Debit massa langsung",
          en: "1c · Direct mass flow",
        },
        body: [
          {
            id: "Pilih flowmeter Coriolis. Alat menggetarkan pipa. Aliran massa mengubah fase getaran pada dua lokasi; hasil kalibrasinya memberi \\(\\dot m\\) dalam kg/s.",
            en: "Choose a Coriolis flowmeter. It vibrates a tube. Mass flow changes the vibration phase at two locations; calibration converts that phase change into \\(\\dot m\\) in kg/s.",
          },
          {
            id: "Jika memakai flowmeter volume, kita masih perlu massa jenis untuk menghitung \\(\\dot m=\\rho Q\\). Coriolis mengukur debit massa langsung melalui respons tabungnya.",
            en: "A volume flowmeter still needs density to calculate \\(\\dot m=\\rho Q\\). A Coriolis meter measures mass flow directly through its tube response.",
          },
        ],
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
          id: "2a · Samakan acuan tabel",
          en: "2a · Match the table reference",
        },
        body: [
          {
            id: "Tabel termokopel memakai sambungan referensi 0 °C, sedangkan soal memakai 100 °C. Kita kurangi tegangan kedua suhu terhadap acuan yang sama.",
            en: "The table uses a 0 °C reference junction, while the problem uses 100 °C. Subtract both voltages measured against the same reference.",
          },
          {
            id: "Jangan langsung mencari tegangan pada \\(340-100=240\\,{}^\\circ\\mathrm C\\): hubungan tegangan dengan suhu tidak persis linear.",
            en: "Do not simply look up the voltage at \\(340-100=240\\,{}^\\circ\\mathrm C\\): the temperature-voltage relationship is not exactly linear.",
          },
        ],
        math: "E_K(340,100)=E_K(340,0)-E_K(100,0)=13.874-4.096=\\boxed{9.778\\ \\mathrm{mV}}",
      },
      {
        title: {
          id: "2b(i) · Definisikan perubahan dari keadaan awal",
          en: "2b(i) · Define changes from the initial state",
        },
        body: [
          {
            id: "Kita ukur perubahan dari titik awal: \\(\\Delta T=T-20\\) dan \\(\\Delta R=R-100\\). Sensitivitas menghubungkan perubahan tahanan dengan perubahan suhu.",
            en: "Measure changes from the initial state: \\(\\Delta T=T-20\\) and \\(\\Delta R=R-100\\). Sensitivity relates resistance changes to temperature changes.",
          },
          {
            id: "Dengan pilihan ini, model tanpa bias cocok dengan nilai awal soal. Menulis \\(R=0.004T\\) untuk nilai mutlak justru bertentangan dengan \\(R=100\\,\\Omega\\) pada 20 °C.",
            en: "This bias-free deviation model agrees with the initial values. Writing absolute \\(R=0.004T\\) would contradict \\(R=100\\,\\Omega\\) at 20 °C.",
          },
        ],
        math: "0.5\\frac{d\\Delta R}{dt}+\\Delta R=0.004\\Delta T\\quad\\Longleftrightarrow\\quad0.5\\frac{dR}{dt}+R-100=0.004(T-20)",
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
          id: "Tentukan nilai akhir dan waktu yang telah berlalu",
          en: "Find the final value and elapsed time",
        },
        body: [
          {
            id: "Kenaikan suhu adalah \\(100-20=80\\,{}^\\circ\\mathrm C\\). Karena itu kenaikan tahanan akhirnya hanya \\(0.004(80)=0.320\\,\\Omega\\).",
            en: "The temperature rise is \\(100-20=80\\,{}^\\circ\\mathrm C\\), so the final resistance increase is only \\(0.004(80)=0.320\\,\\Omega\\).",
          },
          {
            id: "Pada waktu baca \\(t=2\\,\\mathrm{s}\\), perubahan baru berlangsung \\(2-1=1\\,\\mathrm{s}\\), yaitu dua konstanta waktu.",
            en: "At reading time \\(t=2\\,\\mathrm{s}\\), the response has lasted \\(2-1=1\\,\\mathrm{s}\\), or two time constants.",
          },
        ],
        math: "R_\\infty=100.320\\ \\Omega,\\qquad R(t)=100+0.320\\left(1-e^{-(t-1)/0.5}\\right),\\quad t\\ge1",
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
          id: "2b(ii) · Hitung tahanan pada 2 detik",
          en: "2b(ii) · Evaluate resistance at 2 seconds",
        },
        body: [
          {
            id: "Pada dua konstanta waktu, keluaran sudah menempuh sekitar 86.47% dari perubahan akhirnya. Tahanannya harus di antara 100 dan 100.320 Ω.",
            en: "After two time constants, the output has completed about 86.47% of its final change. Resistance must lie between 100 and 100.320 Ω.",
          },
          {
            id: "Angka 0.004 pada soal bersatuan Ω/°C. Kita tidak mengalikannya lagi dengan tahanan awal, karena soal tidak memberi koefisien relatif per °C.",
            en: "The supplied 0.004 has units Ω/°C. Do not multiply it by the initial resistance again; the problem does not give a relative coefficient per °C.",
          },
        ],
        math: "R(2)=100+0.320(1-e^{-2})=\\boxed{100.27669\\ \\Omega}",
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
          id: "3a · Bedakan posisi dengan perubahan posisi",
          en: "3a · Distinguish position from position change",
        },
        body: [
          {
            id: "Encoder absolut memakai pola kode yang memberi nilai unik untuk tiap sektor sudut. Pada encoder optik, beberapa jalur kode dapat memberi kata biner atau Gray; nilai sudut dapat terbaca tanpa menghitung seluruh gerak sejak awal.",
            en: "An absolute encoder uses a code pattern with a unique value for each angular sector. In an optical encoder, several code tracks can provide binary or Gray words, so angle can be read without counting all motion from startup.",
          },
          {
            id: "Encoder inkremental memakai pola berulang. Kanal A dan B biasanya berselisih seperempat siklus; jumlah pulsa memberi perubahan sudut, dan kanal yang mendahului memberi arah. Kanal indeks Z menandai satu posisi acuan. Setelah kehilangan hitungan atau daya, sistem perlu acuan ulang kecuali posisi tersimpan dengan cara lain.",
            en: "An incremental encoder uses a repeating pattern. Channels A and B are usually a quarter-cycle apart; pulse count gives angular change, and the leading channel gives direction. Index Z marks a reference position. Lost counts or power require a reference procedure unless another method preserves position.",
          },
        ],
      },
      {
        title: {
          id: "3b · Pisahkan luas udara dan cairan",
          en: "3b · Split air and liquid areas",
        },
        body: [
          {
            id: "Dua bagian elektroda mengalami tegangan yang sama. Bagian udara dan bagian cairan karena itu membentuk kapasitor paralel, sehingga kapasitansinya dijumlahkan.",
            en: "Both electrode sections have the same voltage across them. The air and liquid sections therefore act as parallel capacitors, so their capacitances add.",
          },
          {
            id: "Panjang aktif adalah \\(L=h-h_0\\), bukan seluruh tinggi tangki. Saat \\(h_0\\le h_2\\le h\\), fraksi aktif yang tercelup adalah \\(\\eta=(h_2-h_0)/L\\); luas cairan \\(A\\eta\\) dan luas udara \\(A(1-\\eta)\\).",
            en: "The active length is \\(L=h-h_0\\), not the full tank height. For \\(h_0\\le h_2\\le h\\), the immersed fraction is \\(\\eta=(h_2-h_0)/L\\); liquid area is \\(A\\eta\\) and air area is \\(A(1-\\eta)\\).",
          },
        ],
        math: "C=\\frac{\\varepsilon_{\\rm air}A}{D}\\left[(1-\\eta)+k\\eta\\right]=\\frac{\\varepsilon_{\\rm air}A}{D}\\left[1+(k-1)\\eta\\right]",
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
          id: "Tulis hasil sesuai label gambar",
          en: "Express the result using the figure labels",
        },
        body: [
          {
            id: "Karena \\(h_1=h-h_2\\), bentuk berikut memakai semua tinggi pada gambar. Jika ujung elektroda mencapai dasar, ambil \\(h_0=0\\).",
            en: "Since \\(h_1=h-h_2\\), the following expression uses all figure heights. If the electrode reaches the bottom, set \\(h_0=0\\).",
          },
          {
            id: "Untuk level di bawah ujung probe, seluruh luas aktif masih berisi udara: \\(C=C_{\\rm air}\\). Saat seluruh probe terendam, \\(C=kC_{\\rm air}\\). Pada bentuk silinder konsentris yang celahnya tidak tipis, gunakan faktor geometri \\(2\\pi/\\ln(b/a)\\) sebagai pengganti \\(A/(DL)\\).",
            en: "Below the probe tip, the entire active area still contains air: \\(C=C_{\\rm air}\\). At full immersion, \\(C=kC_{\\rm air}\\). For concentric cylinders with a non-thin gap, use geometric factor \\(2\\pi/\\ln(b/a)\\) instead of \\(A/(DL)\\).",
          },
        ],
        math: "\\boxed{C=\\frac{\\varepsilon_{\\rm air}A}{D(h-h_0)}\\left[h_1+k(h_2-h_0)\\right]},\\quad h_0\\le h_2\\le h",
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
          id: "3c · Ubah kapasitansi menjadi tegangan",
          en: "3c · Convert capacitance into voltage",
        },
        body: [
          {
            id: "Satu pilihan adalah jembatan AC. Hubungkan \\(C_s\\) di lengan kiri atas, \\(C_{\\rm ref}\\) di kiri bawah, dan dua resistor sama besar di kanan. Beri eksitasi AC antara titik atas dan bawah. Ukur selisih titik tengah dengan penguat diferensial, lalu demodulator sinkron dan penyaring lolos rendah.",
            en: "One option is an AC bridge. Put \\(C_s\\) in the upper-left arm, \\(C_{\\rm ref}\\) below it, and equal resistors in the right arms. Apply AC between top and bottom. Feed the midpoint difference to a differential amplifier, synchronous demodulator, and low-pass filter.",
          },
          {
            id: "Saat \\(C_s=C_{\\rm ref}\\), kedua titik tengah sama sehingga keluarannya nol. Level naik mengubah \\(C_s\\), lalu mengubah keluaran jembatan. AC diperlukan karena kapasitor tidak melewatkan arus DC pada keadaan tunak.",
            en: "When \\(C_s=C_{\\rm ref}\\), both midpoint voltages match and bridge output is zero. Rising level changes \\(C_s\\) and the bridge output. AC is needed because a capacitor passes no steady DC current.",
          },
        ],
        math: "V_b=V_{\\rm ex}\\left(\\frac{C_s}{C_s+C_{\\rm ref}}-\\frac12\\right)",
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
          id: "3d · Ikuti fluks pada LVDT",
          en: "3d · Follow the LVDT coupling",
        },
        body: [
          {
            id: "Eksitasi AC pada kumparan primer menghasilkan fluks bolak-balik. Inti besi yang bergerak mengubah kopling menuju dua kumparan sekunder. Hubungkan kedua sekunder secara seri berlawanan sehingga \\(V_o=V_1-V_2\\).",
            en: "AC excitation in the primary produces alternating flux. The moving iron core changes coupling to the two secondaries. Connect the secondaries in series opposition so \\(V_o=V_1-V_2\\).",
          },
          {
            id: "Di tengah, \\(V_1\\approx V_2\\) dan keluaran mendekati nol. Saat inti bergeser, satu tegangan naik dan yang lain turun. Dalam daerah kerja linear, amplitudo memberi besar simpangan; perubahan fase 180° memberi sisi simpangan. Demodulasi peka fase menghasilkan keluaran bertanda.",
            en: "At the centre, \\(V_1\\approx V_2\\) and output is near zero. Moving the core raises one voltage and lowers the other. Within the linear range, amplitude gives displacement magnitude; a 180° phase reversal distinguishes the side. Phase-sensitive demodulation produces a signed output.",
          },
        ],
        math: "V_o(t)=K_xx\\sin(\\omega_ct),\\qquad V_{\\rm DC}\\propto x",
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
          id: "3e · Bandingkan dengan potensiometer",
          en: "3e · Compare with a potentiometer",
        },
        body: [
          {
            id: "LVDT tidak memerlukan kontak geser listrik, sehingga tidak mengalami keausan wiper dan dapat mengukur gerak kecil dengan halus. Potensiometer memakai wiper, tetapi rangkaiannya ringkas dan dapat bekerja dengan catu DC sederhana.",
            en: "An LVDT needs no sliding electrical contact, so it avoids wiper wear and can resolve small motion smoothly. A potentiometer uses a wiper but has a compact circuit and can run from a simple DC supply.",
          },
          {
            id: "Kekurangan LVDT adalah kebutuhan eksitasi dan pengondisi sinyal, ukuran serta biaya yang dapat lebih besar, dan perlunya menjaga inti dalam daerah linear. Resolusi praktis tetap dibatasi derau dan rangkaian baca.",
            en: "LVDT tradeoffs include excitation and signal-conditioning needs, potentially greater size and cost, and the need to keep the core in its linear range. Practical resolution remains limited by noise and readout electronics.",
          },
        ],
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
          id: "4a · Pilih sumber bergerak dan pengamat diam",
          en: "4a · Identify a moving source and stationary observer",
        },
        body: [
          {
            id: "Soal menyebut mobil sebagai sumber bunyi. Kecepatan sumber \\(v_s=120/3.6=33.333\\,\\mathrm{m/s}\\), sedangkan polisi tidak bergerak.",
            en: "The car is the sound source in this problem. Its speed is \\(v_s=120/3.6=33.333\\,\\mathrm{m/s}\\), while the observer is stationary.",
          },
          {
            id: "Saat mendekat, sumber memancarkan puncak gelombang berikutnya dari posisi yang lebih dekat. Panjang gelombang di depan menjadi \\((c-v_s)/f_s\\), sehingga frekuensi yang diterima naik.",
            en: "On approach, each new wave crest starts closer to the observer. Wavelength ahead becomes \\((c-v_s)/f_s\\), increasing the received frequency.",
          },
        ],
        math: "f_{\\rm approach}=f_s\\frac{c}{c-v_s}=880\\frac{330}{330-33.333}=\\boxed{978.88\\ \\mathrm{Hz}}",
      },
      {
        title: {
          id: "Hitung saat sumber menjauh",
          en: "Calculate the receding case",
        },
        body: [
          {
            id: "Setelah lewat, jarak antar puncak gelombang yang menuju polisi menjadi lebih besar. Penyebut kini \\(c+v_s\\), sehingga frekuensi turun di bawah 880 Hz.",
            en: "After passing, wave crests travelling toward the observer are farther apart. The denominator becomes \\(c+v_s\\), so frequency falls below 880 Hz.",
          },
          {
            id: "Ini model bunyi langsung dari mobil, bukan gelombang radar yang dipantulkan dua kali. Kita juga menganggap geraknya searah garis pandang; di lintasan menyamping gunakan komponen kecepatan radial.",
            en: "This models sound emitted directly by the car, not a reflected radar signal with two Doppler shifts. Motion is taken along the line of sight; an oblique path requires radial velocity.",
          },
        ],
        math: "f_{\\rm recede}=f_s\\frac{c}{c+v_s}=880\\frac{330}{330+33.333}=\\boxed{799.27\\ \\mathrm{Hz}}",
      },
      {
        title: {
          id: "4b · Ubah percepatan menjadi kecepatan",
          en: "4b · Convert acceleration amplitude into velocity amplitude",
        },
        body: [
          {
            id: "Untuk gerak sinus, amplitudo percepatan \\(\\hat a=\\omega\\hat v\\), dengan \\(\\omega=2\\pi f\\). Jadi \\(\\hat v=\\hat a/(2\\pi f)\\). Pada percepatan tetap, frekuensi yang lebih tinggi justru memerlukan amplitudo kecepatan yang lebih kecil.",
            en: "For sinusoidal motion, acceleration amplitude is \\(\\hat a=\\omega\\hat v\\), where \\(\\omega=2\\pi f\\). Thus \\(\\hat v=\\hat a/(2\\pi f)\\). At fixed acceleration, higher frequency requires lower velocity amplitude.",
          },
          {
            id: "Samakan satuan sensitivitas: 1 cm/s = 0.01 m/s. Maka 40 mV/(cm/s) sama dengan 4 V/(m/s).",
            en: "Convert sensitivity units: 1 cm/s = 0.01 m/s, so 40 mV/(cm/s) equals 4 V/(m/s).",
          },
        ],
        math: "\\hat e=K\\hat v=\\frac{K\\hat a}{2\\pi f}=\\frac{4(9.81)}{2\\pi f}\\ \\mathrm V",
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
          id: "Bandingkan dua frekuensi",
          en: "Compare the two frequencies",
        },
        body: [
          {
            id: "Pada 10 Hz, \\(\\hat v=0.156131\\,\\mathrm{m/s}\\), sehingga \\(\\hat e=0.624524\\,\\mathrm V\\). Pada 2000 Hz, \\(\\hat v=0.000780655\\,\\mathrm{m/s}\\), sehingga \\(\\hat e=0.00312262\\,\\mathrm V\\).",
            en: "At 10 Hz, \\(\\hat v=0.156131\\,\\mathrm{m/s}\\), giving \\(\\hat e=0.624524\\,\\mathrm V\\). At 2000 Hz, \\(\\hat v=0.000780655\\,\\mathrm{m/s}\\), giving \\(\\hat e=0.00312262\\,\\mathrm V\\).",
          },
          {
            id: "Frekuensi naik 200 kali, maka tegangan turun 200 kali. Ini amplitudo puncak, bukan nilai RMS; kedua frekuensi masih berada dalam rentang sensitivitas yang soal berikan.",
            en: "Frequency increases by a factor of 200, so voltage decreases by a factor of 200. These are peak amplitudes, not RMS values; both frequencies fall within the specified sensitivity range.",
          },
        ],
        math: "\\boxed{\\begin{aligned}\\hat e(10\\,\\mathrm{Hz})&=624.524\\ \\mathrm{mV}\\\\\\hat e(2000\\,\\mathrm{Hz})&=3.12262\\ \\mathrm{mV}\\end{aligned}}",
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
          id: "1a · Tandai dua lokasi tekanan",
          en: "1a · Mark the two pressure locations",
        },
        body: [
          {
            id: "Penampang A berada sebelum penyempitan; B berada di leher. Kontinuitas membuat kecepatan di B lebih tinggi. Pada pipa mendatar, tekanan di A lebih tinggi, sehingga permukaan raksa di kaki A lebih rendah.",
            en: "Section A is upstream of the contraction; B is at the throat. Continuity makes velocity at B higher. In a horizontal pipe, pressure at A is higher, so the mercury surface in leg A is lower.",
          },
          {
            id: "Gambar perlu memperlihatkan penyempitan halus, leher, pelebaran halus, dua tap, serta selisih vertikal permukaan raksa. Beda tinggi itu 50 mm; bukan panjang kolom raksa seluruhnya.",
            en: "The sketch should show the smooth contraction, throat, diffuser, both pressure taps, and the vertical mercury-level difference. That difference is 50 mm, not the entire mercury-column length.",
          },
        ],
      },
      {
        title: {
          id: "Ubah pembacaan manometer menjadi tekanan",
          en: "Convert the manometer reading to pressure",
        },
        body: [
          {
            id: "Karena kedua tap sama tinggi dan kedua kaki di atas raksa berisi fluida proses, gunakan selisih massa jenis. Ubah 50 mm menjadi 0.050 m.",
            en: "Both taps are at the same elevation and the spaces above mercury contain process fluid, so use the density difference. Convert 50 mm to 0.050 m.",
          },
        ],
        math: "\\Delta p=(13600-950)(9.81)(0.050)=6204.825\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "1b · Turunkan aliran pada penampang A",
          en: "1b · Derive section-A flow",
        },
        body: [
          {
            id: "Dari \\(A_Av_A=A_Bv_B\\), diperoleh \\(v_B=(A_A/A_B)v_A\\). Masukkan ke Bernoulli mendatar. Setelah itu, masukkan \\(C_d\\) sebagai koreksi debit nyata.",
            en: "From \\(A_Av_A=A_Bv_B\\), obtain \\(v_B=(A_A/A_B)v_A\\). Substitute into horizontal Bernoulli, then include \\(C_d\\) as the real-flow correction.",
          },
          {
            id: "Rasio luas \\(A_A/A_B=(80/20)^2=16\\). Jadi kecepatan di leher 16 kali kecepatan rata-rata di A.",
            en: "The area ratio is \\(A_A/A_B=(80/20)^2=16\\), so throat mean velocity is 16 times section-A mean velocity.",
          },
        ],
        math: "\\begin{aligned}\\Delta p&=\\tfrac12\\rho v_A^2\\left[\\left(\\frac{A_A}{A_B}\\right)^2-1\\right]&&\\text{(ideal)}\\\\v_A&=C_d\\sqrt{\\frac{2\\Delta p}{\\rho[(D_A/D_B)^4-1]}}\\\\Q&=A_Av_A=C_dA_B\\sqrt{\\frac{2\\Delta p}{\\rho[1-(D_B/D_A)^4]}}\\end{aligned}",
      },
      {
        title: {
          id: "1c · Hitung dan periksa debit",
          en: "1c · Calculate and check flow",
        },
        body: [
          {
            id: "Luas leher \\(A_B=\\pi(0.020)^2/4=3.14159\\times10^{-4}\\,\\mathrm{m^2}\\). Pakai diameter dalam meter sebelum menguadratkannya.",
            en: "Throat area is \\(A_B=\\pi(0.020)^2/4=3.14159\\times10^{-4}\\,\\mathrm{m^2}\\). Use metres before squaring the diameter.",
          },
          {
            id: "Hasil ini setara 1.10354 L/s. Kecepatan \\(v_A=0.21954\\,\\mathrm{m/s}\\) dan \\(v_B=3.51269\\,\\mathrm{m/s}\\) memenuhi rasio 16:1.",
            en: "The result is 1.10354 L/s. Velocities \\(v_A=0.21954\\,\\mathrm{m/s}\\) and \\(v_B=3.51269\\,\\mathrm{m/s}\\) satisfy the 16:1 ratio.",
          },
        ],
        math: "Q=0.97\\frac{\\pi(0.020)^2}{4}\\sqrt{\\frac{2(6204.825)}{950[1-(0.020/0.080)^4]}}=\\boxed{1.10354\\times10^{-3}\\ \\mathrm{m^3/s}}",
      },
      {
        title: {
          id: "1d · Nyatakan apa yang tetap saat alat diganti",
          en: "1d · State what stays fixed when replacing the meter",
        },
        body: [
          {
            id: "Nozzle umumnya memberi pemulihan tekanan yang lebih kecil daripada Venturi karena tidak memiliki diffuser sepanjang Venturi. Namun rugi tekanan permanen berbeda dari beda tekanan antara tap pengukuran.",
            en: "A nozzle generally recovers less pressure than a Venturi because it lacks the Venturi’s long diffuser. Permanent pressure loss, however, differs from the measured pressure difference between taps.",
          },
          {
            id: "Jika debit dipertahankan dan \\(C_{d,n}<0.97\\), beda tekanan dan tinggi raksa naik menurut hubungan di bawah. Tanpa nilai \\(C_{d,n}\\) serta kondisi pompa, kita tidak dapat memberi tinggi baru yang unik. Rentang \\(C_d\\) nozzle pada materi juga tumpang tindih dengan 0.97, jadi penurunannya bukan kepastian untuk setiap nozzle.",
            en: "If flow is held fixed and \\(C_{d,n}<0.97\\), pressure difference and mercury height increase by the relation below. Without \\(C_{d,n}\\) and the pumping condition, there is no unique new height. The course’s nozzle \\(C_d\\) range overlaps 0.97, so a decrease is not guaranteed for every nozzle.",
          },
        ],
        math: "\\left.\\frac{h_n}{h_v}\\right|_{Q\\ \\rm fixed}=\\left(\\frac{C_{d,v}}{C_{d,n}}\\right)^2",
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
          id: "Jumlahkan semua hasil",
          en: "Add all measurements",
        },
        body: [
          {
            id: "Ada 10 hasil. Rata-rata menggunakan semua nilai, termasuk 120.0 Ω yang muncul empat kali. Jumlah seluruhnya 1199.9 Ω.",
            en: "There are 10 measurements. The mean uses every value, including all four occurrences of 120.0 Ω. Their total is 1199.9 Ω.",
          },
        ],
        math: "\\bar R=\\frac{\\sum R_i}{n}=\\frac{1199.9}{10}=119.99\\ \\Omega",
      },
      {
        title: {
          id: "Ukur jarak tiap hasil dari rata-rata",
          en: "Measure each result’s distance from the mean",
        },
        body: [
          {
            id: "Kurangi tiap nilai dengan 119.99 Ω, kuadratkan selisihnya, lalu jumlahkan. Menguadratkan mencegah selisih positif dan negatif saling menghapus.",
            en: "Subtract 119.99 Ω from each value, square each difference, and add them. Squaring prevents positive and negative differences from cancelling.",
          },
          {
            id: "Sebagai contoh, 119.6 Ω memberi selisih −0.39 Ω dan kuadrat 0.1521 Ω². Seluruh kuadrat selisih berjumlah 0.3490 Ω².",
            en: "For example, 119.6 Ω has deviation −0.39 Ω and squared deviation 0.1521 Ω². All squared deviations sum to 0.3490 Ω².",
          },
        ],
        math: "\\sum_{i=1}^{10}(R_i-\\bar R)^2=0.3490\\ \\Omega^2",
      },
      {
        title: {
          id: "Gunakan penyebut sampel",
          en: "Use the sample denominator",
        },
        body: [
          {
            id: "Soal menyebut sepuluh unit sebagai sampel. Karena itu varians sampel memakai penyebut \\(n-1=9\\). Akar kuadratnya mengembalikan satuan dari Ω² menjadi Ω.",
            en: "The problem describes the ten units as a sample. Sample variance therefore uses denominator \\(n-1=9\\). Taking the square root restores units from Ω² to Ω.",
          },
        ],
        math: "s=\\sqrt{\\frac{\\sum(R_i-\\bar R)^2}{n-1}}=\\sqrt{\\frac{0.3490}{9}}=\\boxed{0.196921\\ \\Omega}",
      },
      {
        title: {
          id: "Tafsirkan kedua angka",
          en: "Interpret both results",
        },
        body: [
          {
            id: "Rata-rata 119.99 Ω menunjukkan pusat data, sedangkan simpangan baku sekitar 0.197 Ω menunjukkan sebaran antarsampel. Angka itu bukan otomatis galat alat atau ketidakpastian rata-rata.",
            en: "The mean of 119.99 Ω locates the data centre, while standard deviation of about 0.197 Ω describes between-sample spread. It is not automatically instrument error or the uncertainty of the mean.",
          },
          {
            id: "Jika sepuluh unit dianggap seluruh populasi yang hendak dideskripsikan, penyebut 10 memberi 0.186815 Ω. Untuk redaksi soal yang menyebut sampel, gunakan hasil 0.196921 Ω.",
            en: "If these ten units were the entire population of interest, denominator 10 would give 0.186815 Ω. The exam’s sample wording supports 0.196921 Ω.",
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
          id: "3a · Mulai dari keadaan tunak awal",
          en: "3a · Start from the initial equilibrium",
        },
        body: [
          {
            id: "Definisikan \\(\\Delta T=T-27\\) dan \\(\\Delta R=R-200\\). Model orde satu menyatakan laju perubahan dan nilai tahanan saat ini bersama-sama mengikuti masukan.",
            en: "Define \\(\\Delta T=T-27\\) and \\(\\Delta R=R-200\\). The first-order model combines the current resistance change with its rate of change to follow the input.",
          },
          {
            id: "Pada keadaan tunak, turunan nol dan \\(\\Delta R=K\\Delta T\\). Ini juga membantu memeriksa satuan model.",
            en: "At steady state the derivative vanishes and \\(\\Delta R=K\\Delta T\\). This also provides a unit check.",
          },
        ],
        math: "\\tau\\frac{d\\Delta R}{dt}+\\Delta R=K\\Delta T\\quad\\Rightarrow\\quad\\frac{dR}{dt}+R-200=0.08(T-27)",
      },
      {
        title: {
          id: "Hitung perubahan akhir",
          en: "Calculate the final change",
        },
        body: [
          {
            id: "Suhu naik \\(100-27=73\\,{}^\\circ\\mathrm C\\). Kenaikan tahanan akhir adalah \\(0.08(73)=5.84\\,\\Omega\\), sehingga \\(R_\\infty=205.84\\,\\Omega\\).",
            en: "Temperature rises by \\(100-27=73\\,{}^\\circ\\mathrm C\\). The final resistance increase is \\(0.08(73)=5.84\\,\\Omega\\), so \\(R_\\infty=205.84\\,\\Omega\\).",
          },
          {
            id: "Karena tahanan mulai dari keadaan tunak, respons sebelum \\(t=1\\) tetap 200 Ω. Setelah perubahan, tahanan mendekati nilai akhir secara eksponensial.",
            en: "The sensor starts at equilibrium, so resistance stays at 200 Ω before \\(t=1\\). After the step it approaches the final value exponentially.",
          },
        ],
        math: "R(t)=\\begin{cases}200,&t<1\\\\200+5.84(1-e^{-(t-1)}),&t\\ge1\\end{cases}\\quad[\\Omega]",
      },
      {
        title: {
          id: "3b · Pakai waktu sejak perubahan",
          en: "3b · Use time since the step",
        },
        body: [
          {
            id: "Waktu baca 3 s bukan waktu respons 3 s. Suhu berubah pada 1 s, jadi sensor sudah merespons selama 2 s atau dua konstanta waktu.",
            en: "A reading at 3 s does not mean 3 s of response. The temperature changed at 1 s, so response duration is 2 s, or two time constants.",
          },
          {
            id: "Masukkan \\(t-1=2\\) ke fungsi respons.",
            en: "Substitute \\(t-1=2\\) into the response.",
          },
        ],
        math: "R(3)=200+5.84(1-e^{-2})=\\boxed{205.04964\\ \\Omega}",
      },
      {
        title: {
          id: "Periksa batas hasil",
          en: "Check the result against its limits",
        },
        body: [
          {
            id: "Hasil berada di antara tahanan awal 200 Ω dan akhir 205.84 Ω. Sisa galat dinamik adalah \\(205.84-205.04964=0.79036\\,\\Omega\\), atau 13.53% dari perubahan 5.84 Ω.",
            en: "The result lies between initial 200 Ω and final 205.84 Ω. Remaining dynamic error is \\(205.84-205.04964=0.79036\\,\\Omega\\), or 13.53% of the 5.84 Ω change.",
          },
          {
            id: "Jika \\(t\\to\\infty\\), suku eksponensial menuju nol dan tahanan menuju 205.84 Ω. Jika \\(t=1\\), tahanan belum meloncat dari 200 Ω.",
            en: "As \\(t\\to\\infty\\), the exponential vanishes and resistance approaches 205.84 Ω. At \\(t=1\\), resistance has not jumped away from 200 Ω.",
          },
        ],
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
          id: "4a · Baca sudut dari dua keluaran resolver",
          en: "4a · Read angle from both resolver outputs",
        },
        body: [
          {
            id: "Resolver mengubah kopling magnetik saat rotor berputar. Eksitasi AC rotor membangkitkan dua keluaran stator dengan amplitudo sebanding \\(\\sin\\theta\\) dan \\(\\cos\\theta\\). Keduanya memakai pembawa AC yang sama.",
            en: "A resolver changes magnetic coupling as its rotor turns. Rotor AC excitation induces stator outputs with amplitudes proportional to \\(\\sin\\theta\\) and \\(\\cos\\theta\\). Both use the same AC carrier.",
          },
          {
            id: "Setelah demodulasi, gunakan \\(\\operatorname{atan2}(V_s,V_c)\\) untuk menentukan sudut dan kuadrannya. Rasio \\(V_s/V_c\\) saja tidak membedakan sudut yang terpaut 180°. Pada resolver tanpa sikat, transformator putar menyalurkan eksitasi tanpa kontak geser.",
            en: "After demodulation, \\(\\operatorname{atan2}(V_s,V_c)\\) gives angle and quadrant. The ratio \\(V_s/V_c\\) alone cannot distinguish angles separated by 180°. In a brushless resolver, a rotary transformer transfers excitation without sliding contacts.",
          },
        ],
        math: "v_s(t)=KV_r\\sin\\theta\\sin\\omega_ct,\\qquad v_c(t)=KV_r\\cos\\theta\\sin\\omega_ct",
      },
      {
        title: {
          id: "4b · Susun LVDT",
          en: "4b · Arrange the LVDT",
        },
        body: [
          {
            id: "LVDT memiliki satu primer, dua sekunder, dan inti yang dapat bergerak. Eksitasi primer dengan AC. Hubungkan sekunder seri berlawanan, sehingga keluaran \\(V_1-V_2\\).",
            en: "An LVDT has one primary, two secondary windings, and a movable core. Excite the primary with AC and connect the secondaries in series opposition, giving output \\(V_1-V_2\\).",
          },
          {
            id: "Inti di tengah memberi selisih mendekati nol. Pergeseran mengubah besar dan fase selisih. Demodulator peka fase memberi tegangan DC bertanda yang sebanding dengan posisi dalam daerah linear.",
            en: "A centred core gives nearly zero difference. Displacement changes the magnitude and phase of the difference. A phase-sensitive demodulator produces signed DC proportional to position within the linear range.",
          },
        ],
        math: "E=S z,\\qquad S=0.31\\ \\mathrm{mV/mm}=0.31\\ \\mathrm{V/m}",
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
          id: "4c(i) · Gambar gaya pada massa gabungan",
          en: "4c(i) · Draw forces on the combined mass",
        },
        body: [
          {
            id: "Ambil arah atas positif. \\(y\\) adalah gerak rumah sensor, \\(x\\) gerak mutlak massa, dan \\(z=x-y\\) simpangan relatif dari keseimbangan statik. Massa yang bergerak adalah \\(m_1+m_2\\), bukan salah satu saja.",
            en: "Take upward as positive. \\(y\\) is housing motion, \\(x\\) absolute mass motion, and \\(z=x-y\\) relative displacement from static equilibrium. The moving mass is \\(m_1+m_2\\), not either mass alone.",
          },
          {
            id: "Pegas menahan berat pada keadaan awal. Gaya pegas total \\(mg-kz\\), berat \\(-mg\\), gaya redam \\(-c\\dot z\\), dan gaya inersia D’Alembert \\(-m\\ddot x\\) berjumlah nol. Karena \\(\\ddot x=\\ddot z+\\ddot y\\), kita memperoleh persamaan berikut.",
            en: "The spring supports weight initially. Total spring force \\(mg-kz\\), weight \\(-mg\\), damping \\(-c\\dot z\\), and D’Alembert inertia \\(-m\\ddot x\\) sum to zero. Since \\(\\ddot x=\\ddot z+\\ddot y\\), the following equation results.",
          },
        ],
        math: "\\underbrace{(mg-kz)-mg-c\\dot z-m(\\ddot z+\\ddot y)}_{\\text{force balance}}=0\\quad\\Rightarrow\\quad m\\ddot z+c\\dot z+kz=-m a,\\quad a=\\ddot y",
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
          id: "Turunkan hubungan dinamik tegangan",
          en: "Derive the dynamic voltage relation",
        },
        body: [
          {
            id: "Dengan kondisi awal nol, ambil transformasi Laplace dan gunakan \\(E=Sz\\). Tanda minus muncul karena massa tertinggal relatif terhadap rumah saat rumah mempercepat ke atas.",
            en: "With zero initial conditions, take the Laplace transform and use \\(E=Sz\\). The negative sign indicates that the mass lags relative to the housing when the housing accelerates upward.",
          },
          {
            id: "Frekuensi alami \\(\\omega_n=\\sqrt{k/m}=69.282\\,\\mathrm{rad/s}\\), atau \\(f_n=11.027\\,\\mathrm{Hz}\\), dan rasio redaman \\(\\zeta=c/(2\\sqrt{km})=0.4994\\). Respons berubah terhadap frekuensi; hubungan statik saja tidak berlaku di seluruh rentang.",
            en: "Natural frequency is \\(\\omega_n=\\sqrt{k/m}=69.282\\,\\mathrm{rad/s}\\), or \\(f_n=11.027\\,\\mathrm{Hz}\\), and damping ratio is \\(\\zeta=c/(2\\sqrt{km})=0.4994\\). Response varies with frequency; a static relation does not cover the whole band.",
          },
        ],
        math: "\\frac{E(s)}{A(s)}=-\\frac{Sm}{ms^2+cs+k}=\\boxed{-\\frac{0.31}{s^2+69.2s+4800}}\\quad\\frac{\\mathrm V}{\\mathrm{m/s^2}}",
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
          id: "Hubungan pada percepatan yang berubah lambat",
          en: "Relation for slowly varying acceleration",
        },
        body: [
          {
            id: "Untuk frekuensi jauh di bawah frekuensi alami, pengaruh \\(m\\ddot z\\) dan \\(c\\dot z\\) kecil dibanding \\(kz\\). Maka \\(z\\approx-ma/k\\), lalu \\(E\\approx-Sm a/k\\).",
            en: "At frequencies well below the natural frequency, \\(m\\ddot z\\) and \\(c\\dot z\\) are small compared with \\(kz\\). Thus \\(z\\approx-ma/k\\), then \\(E\\approx-Sm a/k\\).",
          },
          {
            id: "Gunakan mV jika ingin membaca percepatan langsung dari tegangan. Pembalikan kabel keluaran membalik tanda, tetapi tidak mengubah besar sensitivitas.",
            en: "Use mV to read acceleration directly from voltage. Reversing output wiring reverses the sign, not sensitivity magnitude.",
          },
        ],
        math: "E[\\mathrm{mV}]\\approx-0.0645833\\,a[\\mathrm{m/s^2}],\\qquad a\\approx-15.4839\\,E[\\mathrm{mV}]",
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
          id: "4c(ii) · Terapkan batas gerak inti",
          en: "4c(ii) · Apply the core-travel limit",
        },
        body: [
          {
            id: "Batas ±10 mm sama dengan ±0.010 m. Dalam pendekatan kuasistatik, \\(|a|_{\\max}=k|z|_{\\max}/m=48\\,\\mathrm{m/s^2}\\), sekitar 4.89 g. Batas keluaran \\(|E|_{\\max}=0.31(10)=3.1\\,\\mathrm{mV}\\).",
            en: "Travel limit ±10 mm equals ±0.010 m. In the quasistatic approximation, \\(|a|_{\\max}=k|z|_{\\max}/m=48\\,\\mathrm{m/s^2}\\), about 4.89 g. Output limit is \\(|E|_{\\max}=0.31(10)=3.1\\,\\mathrm{mV}\\).",
          },
          {
            id: "Untuk percepatan sinus pada frekuensi tertentu, gunakan batas dinamik di bawah. Karena soal tidak memberi frekuensi masukan, 48 m/s² harus ditulis sebagai batas kuasistatik, bukan batas universal.",
            en: "For sinusoidal acceleration at a specified frequency, use the dynamic limit below. As no input frequency is given, 48 m/s² is a quasistatic limit, not a universal one.",
          },
        ],
        math: "\\boxed{|a|_{\\max,\\,\\omega\\ll\\omega_n}=48\\ \\mathrm{m/s^2}}\\qquad\\hat a_{\\max}(\\omega)=\\frac{z_{\\max}}{m}\\sqrt{(k-m\\omega^2)^2+(c\\omega)^2}",
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
      id: "Sensor tekanan memiliki rentang 0–3.0 barG dan catu nominal \\(V_s=0.5\\,\\mathrm V\\). Tekanan \\(x\\): 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0 barG. Keluaran pada 0.5 V: 0, 16.5, 32.0, 44.0, 51.5, 55.5, 58.5 mV. Keluaran pada 0.6 V: 0, 21.0, 41.5, 56.0, 65.0, 70.5, 74.0 mV. (a) Cari kemiringan \\(K\\) dan intersep \\(a\\) garis ideal. (b) Cari \\(K_M\\) dan \\(K_I\\) akibat perubahan catu. (c) Cari ketaklinearan maksimum sebagai persen rentang penuh.",
      en: "A pressure sensor spans 0–3.0 barG with nominal supply \\(V_s=0.5\\,\\mathrm V\\). Pressures \\(x\\): 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0 barG. Outputs at 0.5 V: 0, 16.5, 32.0, 44.0, 51.5, 55.5, 58.5 mV. Outputs at 0.6 V: 0, 21.0, 41.5, 56.0, 65.0, 70.5, 74.0 mV. (a) Find ideal-line slope \\(K\\) and intercept \\(a\\). (b) Find supply-effect constants \\(K_M\\) and \\(K_I\\). (c) Find maximum nonlinearity as a percentage of full-scale span.",
    },
    steps: [
      {
        title: {
          id: "5a · Tentukan garis acuan",
          en: "5a · Define the reference line",
        },
        body: [
          {
            id: "Kita memakai garis yang menghubungkan dua titik ujung pada catu nominal. Titiknya \\((0,0)\\) dan \\((3,58.5)\\), dengan tekanan dalam barG dan keluaran dalam mV.",
            en: "Use the line joining the nominal-supply endpoints: \\((0,0)\\) and \\((3,58.5)\\), with pressure in barG and output in mV.",
          },
          {
            id: "Metode garis ujung perlu disebut karena garis regresi akan memberi hasil lain. Jangan mencampur kemiringan dari satu metode dengan galat dari metode lain.",
            en: "The endpoint method must be stated because a regression line would give different values. Do not mix one method’s slope with another method’s errors.",
          },
        ],
        math: "K=\\frac{58.5-0}{3-0}=19.5\\ \\mathrm{mV/barG},\\qquad a=0,\\qquad O_{\\rm ideal}=19.5x",
      },
      {
        title: {
          id: "5b · Pisahkan perubahan kemiringan dan titik nol",
          en: "5b · Separate slope and zero changes",
        },
        body: [
          {
            id: "Definisikan perubahan catu \\(\\Delta V_s=V_s-0.5\\). Model garis ujungnya \\(O=[K+K_M\\Delta V_s]x+a+K_I\\Delta V_s\\). \\(K_M\\) mengubah sensitivitas, sedangkan \\(K_I\\) menggeser titik nol.",
            en: "Define supply change \\(\\Delta V_s=V_s-0.5\\). The endpoint-line model is \\(O=[K+K_M\\Delta V_s]x+a+K_I\\Delta V_s\\). \\(K_M\\) changes sensitivity, while \\(K_I\\) shifts zero.",
          },
          {
            id: "Pada catu 0.6 V, kemiringan garis ujung \\(K_1=74/3=24.6667\\,\\mathrm{mV/barG}\\). Keluaran nol tetap 0 mV pada kedua catu.",
            en: "At 0.6 V, endpoint slope is \\(K_1=74/3=24.6667\\,\\mathrm{mV/barG}\\). Zero-input output remains 0 mV for both supplies.",
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
          id: "5c · Hitung selisih dari garis ideal",
          en: "5c · Compute departures from the ideal line",
        },
        body: [
          {
            id: "Untuk tiap tekanan, hitung \\(N(x)=O_{0.5}(x)-19.5x\\). Gunakan tabel pada catu nominal, bukan selisih antara dua catu.",
            en: "At each pressure calculate \\(N(x)=O_{0.5}(x)-19.5x\\). Use the nominal-supply data, not the difference between supplies.",
          },
          {
            id: "Selisih terbesar adalah 14.75 mV pada 1.5 barG. Titik ujung memiliki selisih nol karena garis acuan melewati keduanya.",
            en: "The largest deviation is 14.75 mV at 1.5 barG. Endpoint deviations are zero because the reference line passes through both.",
          },
        ],
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
          id: "Bagi dengan rentang penuh keluaran",
          en: "Divide by the full output span",
        },
        body: [
          {
            id: "Rentang penuh keluaran pada catu nominal adalah \\(58.5-0=58.5\\,\\mathrm{mV}\\). Bagi simpangan maksimum dengan rentang ini, lalu kalikan 100%.",
            en: "Nominal full output span is \\(58.5-0=58.5\\,\\mathrm{mV}\\). Divide the maximum deviation by this span and multiply by 100%.",
          },
          {
            id: "Persentase ini menggambarkan deviasi maksimum dari garis ujung pada data kalibrasi yang tersedia. Ia bukan galat persentase terhadap tekanan pada satu titik.",
            en: "This percentage describes the largest endpoint-line departure among the supplied calibration data. It is not percentage error relative to the pressure at a single point.",
          },
        ],
        math: "\\%N_{\\max}=\\frac{14.75}{58.5}\\times100\\%=\\boxed{25.2137\\%\\ \\mathrm{f.s.d.}}",
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
    id: "practice-2023-01",
    topic: "flow",
    difficulty: "foundation",
    prompt: {
      id: "Manometer raksa membaca aliran air melalui dua tap yang sama tinggi. Rumus beda tekanan yang tepat adalah …",
      en: "A mercury manometer reads water flow through two equal-elevation taps. Which pressure-difference formula is correct?",
    },
    options: [
      {
        id: "\\(\\rho_mgh\\)",
        en: "\\(\\rho_mgh\\)",
      },
      {
        id: "\\((\\rho_m-\\rho_w)gh\\)",
        en: "\\((\\rho_m-\\rho_w)gh\\)",
      },
      {
        id: "\\((\\rho_m+\\rho_w)gh\\)",
        en: "\\((\\rho_m+\\rho_w)gh\\)",
      },
      {
        id: "\\(\\rho_wg/h\\)",
        en: "\\(\\rho_wg/h\\)",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Air di atas raksa ikut memberi tekanan. Pada tap sama tinggi, penjumlahan tekanan hidrostatik menyisakan selisih massa jenis raksa dan air.",
      en: "Water above the mercury also contributes pressure. At equal tap elevations, the hydrostatic balance leaves the mercury-water density difference.",
    },
    sourceQuestionId: "2023-uts2-q1",
  },
  {
    id: "practice-2023-02",
    topic: "flow",
    difficulty: "applied",
    prompt: {
      id: "Pada alat dan fluida yang sama, \\(C_d\\) dianggap tetap. Jika beda tekanan naik dari 4 kPa menjadi 16 kPa, debit menjadi …",
      en: "For the same meter and fluid, treat \\(C_d\\) as constant. If pressure difference rises from 4 kPa to 16 kPa, flow becomes …",
    },
    options: [
      {
        id: "setengah semula",
        en: "half the original",
      },
      {
        id: "tetap",
        en: "unchanged",
      },
      {
        id: "empat kali semula",
        en: "four times the original",
      },
      {
        id: "dua kali semula",
        en: "twice the original",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Debit sebanding akar beda tekanan. Beda tekanan naik empat kali, sehingga debit naik \\(\\sqrt4=2\\) kali.",
      en: "Flow is proportional to the square root of pressure difference. A fourfold pressure increase gives a \\(\\sqrt4=2\\)-fold flow increase.",
    },
    math: "\\frac{Q_2}{Q_1}=\\sqrt{\\frac{16}{4}}=2",
    sourceQuestionId: "2023-uas-q1",
  },
  {
    id: "practice-2023-03",
    topic: "temperature",
    difficulty: "applied",
    prompt: {
      id: "Tabel termokopel terhadap 0 °C memberi \\(E(200)=8.138\\,\\mathrm{mV}\\) dan \\(E(50)=2.023\\,\\mathrm{mV}\\). Jika sambungan ukur 200 °C dan referensi 50 °C, keluarannya …",
      en: "A 0 °C-reference thermocouple table gives \\(E(200)=8.138\\,\\mathrm{mV}\\) and \\(E(50)=2.023\\,\\mathrm{mV}\\). With hot junction 200 °C and reference 50 °C, output is …",
    },
    options: [
      {
        id: "10.161 mV",
        en: "10.161 mV",
      },
      {
        id: "8.138 mV",
        en: "8.138 mV",
      },
      {
        id: "6.115 mV",
        en: "6.115 mV",
      },
      {
        id: "2.023 mV",
        en: "2.023 mV",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Kurangi dua tegangan terhadap acuan tabel yang sama. Nilai suhu tidak langsung menjadi tegangan tanpa tabel.",
      en: "Subtract both voltages referred to the same table reference. Temperature values cannot be treated as voltages.",
    },
    math: "E(200,50)=8.138-2.023=6.115\\ \\mathrm{mV}",
    sourceQuestionId: "2023-uts2-q2",
  },
  {
    id: "practice-2023-04",
    topic: "dynamics",
    difficulty: "applied",
    prompt: {
      id: "Sensor orde satu berubah dari 100 Ω menuju 110 Ω, dengan \\(\\tau=2\\,\\mathrm s\\). Langkah masukan terjadi pada \\(t=3\\,\\mathrm s\\). Berapa tahanan pada \\(t=5\\,\\mathrm s\\)?",
      en: "A first-order sensor changes from 100 Ω toward 110 Ω with \\(\\tau=2\\,\\mathrm s\\). The input step occurs at \\(t=3\\,\\mathrm s\\). What is resistance at \\(t=5\\,\\mathrm s\\)?",
    },
    options: [
      {
        id: "106.321 Ω",
        en: "106.321 Ω",
      },
      {
        id: "103.679 Ω",
        en: "103.679 Ω",
      },
      {
        id: "109.179 Ω",
        en: "109.179 Ω",
      },
      {
        id: "110.000 Ω",
        en: "110.000 Ω",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Waktu respons baru \\(5-3=2\\,\\mathrm s=\\tau\\). Setelah satu konstanta waktu, sensor mencapai \\(1-e^{-1}=63.21\\%\\) dari perubahan 10 Ω.",
      en: "Response time is only \\(5-3=2\\,\\mathrm s=\\tau\\). After one time constant, the sensor completes \\(1-e^{-1}=63.21\\%\\) of its 10 Ω change.",
    },
    math: "R=100+10(1-e^{-1})=106.321\\ \\Omega",
    sourceQuestionId: "2023-uas-q3",
  },
  {
    id: "practice-2023-05",
    topic: "position",
    difficulty: "foundation",
    prompt: {
      id: "Dua kanal A dan B encoder inkremental bergeser seperempat siklus. Informasi tambahan apa yang dapat diperoleh dari kanal yang mendahului?",
      en: "An incremental encoder has A and B channels a quarter-cycle apart. What additional information does the leading channel provide?",
    },
    options: [
      {
        id: "Suhu encoder",
        en: "Encoder temperature",
      },
      {
        id: "Arah putaran",
        en: "Rotation direction",
      },
      {
        id: "Posisi mutlak setelah daya mati tanpa acuan",
        en: "Absolute position after power loss without a reference",
      },
      {
        id: "Massa rotor",
        en: "Rotor mass",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Urutan tepi A dan B berubah saat arah putaran berbalik. Jumlah hitungan menyatakan perubahan sudut; urutannya menyatakan arah.",
      en: "The A/B edge order reverses when rotation reverses. Count gives angular change; edge order gives direction.",
    },
    sourceQuestionId: "2023-uts2-q3",
  },
  {
    id: "practice-2023-06",
    topic: "position",
    difficulty: "applied",
    prompt: {
      id: "Sensor level kapasitif memiliki \\(C_{\\rm air}=20\\,\\mathrm{pF}\\), \\(k=4\\), dan setengah panjang aktif terendam. Berapa kapasitansinya?",
      en: "A capacitive level sensor has \\(C_{\\rm air}=20\\,\\mathrm{pF}\\), \\(k=4\\), and half its active length immersed. What is capacitance?",
    },
    options: [
      {
        id: "10 pF",
        en: "10 pF",
      },
      {
        id: "40 pF",
        en: "40 pF",
      },
      {
        id: "80 pF",
        en: "80 pF",
      },
      {
        id: "50 pF",
        en: "50 pF",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Bagian udara dan cairan tersusun paralel. Gunakan fraksi terendam \\(\\eta=0.5\\), sehingga \\(C=20[1+(4-1)(0.5)]\\).",
      en: "The air and liquid sections are in parallel. Use immersed fraction \\(\\eta=0.5\\), giving \\(C=20[1+(4-1)(0.5)]\\).",
    },
    math: "C=50\\ \\mathrm{pF}",
    sourceQuestionId: "2023-uts2-q3",
  },
  {
    id: "practice-2023-07",
    topic: "dynamics",
    difficulty: "reasoning",
    prompt: {
      id: "Vibrometer mengukur getaran sinus pada percepatan puncak tetap. Frekuensi naik dua kali, masih di dalam rentang sensitivitas tetap. Bagaimana amplitudo tegangannya berubah?",
      en: "A vibrometer measures sinusoidal motion at fixed peak acceleration. Frequency doubles within the constant-sensitivity band. What happens to voltage amplitude?",
    },
    options: [
      {
        id: "Turun menjadi setengah",
        en: "Halves",
      },
      {
        id: "Naik empat kali",
        en: "Quadruples",
      },
      {
        id: "Tetap",
        en: "Stays the same",
      },
      {
        id: "Naik dua kali",
        en: "Doubles",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Vibrometer membaca kecepatan, sedangkan \\(\\hat v=\\hat a/(2\\pi f)\\). Pada percepatan tetap, frekuensi dua kali memberi kecepatan dan tegangan setengah.",
      en: "A vibrometer senses velocity, and \\(\\hat v=\\hat a/(2\\pi f)\\). At fixed acceleration, doubling frequency halves velocity and voltage.",
    },
    sourceQuestionId: "2023-uts2-q4",
  },
  {
    id: "practice-2023-08",
    topic: "statistics",
    difficulty: "applied",
    prompt: {
      id: "Tiga tahanan sampel adalah 9, 10, dan 11 Ω. Berapa simpangan baku sampelnya?",
      en: "Three sample resistances are 9, 10, and 11 Ω. What is their sample standard deviation?",
    },
    options: [
      {
        id: "0 Ω",
        en: "0 Ω",
      },
      {
        id: "0.8165 Ω",
        en: "0.8165 Ω",
      },
      {
        id: "1 Ω",
        en: "1 Ω",
      },
      {
        id: "2 Ω",
        en: "2 Ω",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Rata-ratanya 10 Ω. Kuadrat selisih berjumlah 1+0+1=2 Ω². Varians sampel membaginya dengan n−1=2, lalu ambil akar.",
      en: "The mean is 10 Ω. Squared deviations sum to 1+0+1=2 Ω². Sample variance divides by n−1=2, then take the square root.",
    },
    math: "s=\\sqrt{2/2}=1\\ \\Omega",
    sourceQuestionId: "2023-uas-q2",
  },
  {
    id: "practice-2023-09",
    topic: "dynamics",
    difficulty: "applied",
    prompt: {
      id: "Akselerometer kuasistatik memiliki \\(m=0.10\\,\\mathrm{kg}\\), \\(k=500\\,\\mathrm{N/m}\\), dan batas gerak relatif 2 mm. Berapa besar percepatan maksimumnya?",
      en: "A quasistatic accelerometer has \\(m=0.10\\,\\mathrm{kg}\\), \\(k=500\\,\\mathrm{N/m}\\), and relative travel limit 2 mm. What is its maximum acceleration magnitude?",
    },
    options: [
      {
        id: "0.1 m/s²",
        en: "0.1 m/s²",
      },
      {
        id: "10 m/s²",
        en: "10 m/s²",
      },
      {
        id: "1 m/s²",
        en: "1 m/s²",
      },
      {
        id: "100 m/s²",
        en: "100 m/s²",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Ubah 2 mm menjadi 0.002 m. Untuk percepatan yang berubah lambat, besar gaya inersia ma sama dengan gaya pegas kz.",
      en: "Convert 2 mm to 0.002 m. For slowly varying acceleration, inertia-force magnitude ma equals spring-force magnitude kz.",
    },
    math: "a_{\\max}=\\frac{kz_{\\max}}m=\\frac{500(0.002)}{0.10}=10\\ \\mathrm{m/s^2}",
    sourceQuestionId: "2023-uas-q4",
  },
  {
    id: "practice-2023-10",
    topic: "calibration",
    difficulty: "reasoning",
    prompt: {
      id: "Kalibrasi memiliki rentang keluaran 0–80 mV. Deviasi terbesar dari garis ujung adalah 4 mV. Berapa ketaklinearan maksimum terhadap rentang penuh?",
      en: "A calibration has output range 0–80 mV. Its largest endpoint-line departure is 4 mV. What is maximum full-scale nonlinearity?",
    },
    options: [
      {
        id: "0.05%",
        en: "0.05%",
      },
      {
        id: "4%",
        en: "4%",
      },
      {
        id: "5%",
        en: "5%",
      },
      {
        id: "20%",
        en: "20%",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Bagi deviasi maksimum dengan rentang keluaran 80 mV, lalu kalikan 100%. Penyebutnya bukan keluaran pada titik deviasi.",
      en: "Divide maximum deviation by the 80 mV output span and multiply by 100%. The denominator is not the reading at the deviation point.",
    },
    math: "\\%N_{\\max}=\\frac4{80}\\times100\\%=5\\%",
    sourceQuestionId: "2023-uas-q5",
  },
];

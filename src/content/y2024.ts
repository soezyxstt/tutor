import type { ExamQuestion, PracticeQuestion } from "./types";

export const questions2024: ExamQuestion[] = [
  {
    id: "2024-uts2-q1",
    year: 2024,
    exam: "uts2",
    number: 1,
    title: {
      id: "Memilih sensor dan mencari suhu referensi",
      en: "Choosing a sensor and finding the reference temperature",
    },
    topic: "temperature",
    source: {
      url: "https://drive.google.com/file/d/1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3/view",
      file: "2024-uts2.pdf",
      pages: [1, 4],
    },
    original:
      "1. Temperature Sensors: RTD, Thermistor, Thermocouple\n(a) [5%] What are the differences between an RTD (Resistance Temperature Detector) and a thermistor, in terms of their characteristics and measurement ranges?\n(b) [5%] If you need to measure the temperature of approximately 1000°C, which sensor would you choose among an RTD, a thermistor, and a thermocouple? Explain why you choose this sensor.\n(c) [10%] A type J thermocouple is used to measure temperature \\(T_1\\), with the reference temperature \\(T_2\\), as shown in the figure below. The voltage output is measured using a voltmeter. If the measured temperature \\(T_1\\) is 450°C and the voltage recorded by the voltmeter is 15 mV, determine the reference temperature \\(T_2\\). Use the table provided on the last page to answer this question.",
    originalLanguage: "en",
    prompt: {
      id: "(a) Bandingkan sifat dan rentang ukur RTD dengan termistor. (b) Pilih sensor untuk suhu sekitar 1000°C dari RTD, termistor, atau termokopel. Jelaskan alasanmu. (c) Termokopel tipe J memiliki suhu ukur \\(T_1=450^\\circ\\mathrm C\\) dan suhu referensi \\(T_2\\). Voltmeter membaca 15 mV. Cari \\(T_2\\) memakai tabel tipe J dengan sambungan referensi 0°C pada halaman 4.",
      en: "1. Temperature Sensors: RTD, Thermistor, Thermocouple\n(a) [5%] What are the differences between an RTD (Resistance Temperature Detector) and a thermistor, in terms of their characteristics and measurement ranges?\n(b) [5%] If you need to measure the temperature of approximately 1000°C, which sensor would you choose among an RTD, a thermistor, and a thermocouple? Explain why you choose this sensor.\n(c) [10%] A type J thermocouple is used to measure temperature \\(T_1\\), with the reference temperature \\(T_2\\), as shown in the figure below. The voltage output is measured using a voltmeter. If the measured temperature \\(T_1\\) is 450°C and the voltage recorded by the voltmeter is 15 mV, determine the reference temperature \\(T_2\\). Use the table provided on the last page to answer this question.",
    },
    steps: [
      {
        title: {
          id: "a · Bandingkan cara kerjanya",
          en: "a · Compare how they work",
        },
        body: [
          {
            id: "RTD memakai logam, misalnya platina. Hambatannya biasanya naik saat suhu naik. Hubungannya cukup linear pada rentang terbatas.",
            en: "An RTD uses a metal such as platinum. Its resistance usually rises with temperature and is approximately linear over a limited range.",
          },
          {
            id: "Termistor memakai bahan semikonduktor. Untuk jenis NTC dalam materi, hambatan turun saat suhu naik. Perubahannya lebih peka, tetapi tidak linear. Keduanya perlu arus ukur dan dapat memanas karena arus itu.",
            en: "A thermistor uses semiconductor material. For the NTC type in the notes, resistance falls as temperature rises. Its response is more sensitive but nonlinear. Both require a measuring current and can suffer self-heating.",
          },
        ],
        visual: {
          kind: "rtd",
          caption: {
            id: "Bandingkan kenaikan hambatan RTD dengan penurunan hambatan NTC.",
            en: "Compare rising RTD resistance with falling NTC resistance.",
          },
          params: {
            mode: "compare",
          },
        },
      },
      {
        title: {
          id: "a–b · Cocokkan rentang suhu",
          en: "a–b · Match the temperature range",
        },
        body: [
          {
            id: "Contoh pada materi memberi rentang RTD sekitar −196 sampai 482°C dan termistor sekitar −45 sampai 150°C. Angka ini menggambarkan sensor pada materi, bukan batas semua produk.",
            en: "The notes give example ranges of about −196 to 482°C for an RTD and −45 to 150°C for a thermistor. These describe the sensors in the notes, not every available product.",
          },
          {
            id: "Untuk sekitar 1000°C, pilih termokopel yang memang memiliki batas kerja di atas 1000°C, misalnya tipe K atau N dengan selubung yang sesuai. Jangan memakai rentang tipe J pada bagian (c) sebagai alasan bahwa semua termokopel aman pada 1000°C.",
            en: "At about 1000°C, choose a thermocouple rated above that temperature, such as a suitable type K or N assembly. The type J used in part (c) does not imply that every thermocouple is suitable at 1000°C.",
          },
        ],
      },
      {
        title: {
          id: "c · Tegangan menyatakan selisih dua referensi",
          en: "c · Voltage is the difference between two reference values",
        },
        body: [
          {
            id: "Tabel memberi tegangan terhadap 0°C. Voltmeter pada soal justru membandingkan sambungan 450°C dengan sambungan pada suhu yang belum diketahui.",
            en: "The table lists voltages relative to 0°C. The voltmeter instead compares the 450°C junction with a junction at an unknown temperature.",
          },
          {
            id: "Karena itu, kurangi nilai tabel untuk kedua suhu. Kita mencari tegangan tabel pada sambungan referensi, bukan langsung mencari 15 mV di tabel.",
            en: "Subtract the two table values. We need the reference-junction table voltage, rather than directly looking up 15 mV.",
          },
        ],
        math: "E(T_1,T_2)=E(T_1,0)-E(T_2,0)",
      },
      {
        title: {
          id: "c · Gunakan tabel tipe J",
          en: "c · Use the type J table",
        },
        body: [
          {
            id: "Pada 450°C, tabel memberi 24,610 mV. Kurangi tegangan yang terbaca, yaitu 15 mV.",
            en: "At 450°C, the table gives 24.610 mV. Subtract the measured 15 mV.",
          },
          {
            id: "Nilai 9,610 mV berada sangat dekat dengan 9,614 mV pada 179°C. Interpolasi antara 178 dan 179°C memberi sekitar 178,93°C.",
            en: "The resulting 9.610 mV is close to 9.614 mV at 179°C. Interpolation between 178 and 179°C gives about 178.93°C.",
          },
        ],
        math: "\\begin{aligned}E(T_2,0)&=24.610-15=9.610\\ \\mathrm{mV}\\\\T_2&=178+\\frac{9.610-9.559}{9.614-9.559}\\approx178.93^\\circ\\mathrm C\\end{aligned}",
      },
      {
        title: {
          id: "Periksa arah hasilnya",
          en: "Check the direction of the result",
        },
        body: [
          {
            id: "Suhu referensi lebih tinggi daripada 0°C, jadi tegangan terukur harus lebih kecil daripada 24,610 mV. Hasil 15 mV memenuhi cek ini.",
            en: "A reference above 0°C must reduce the reading below 24.610 mV. The measured 15 mV passes this check.",
          },
        ],
      },
    ],
    answer: {
      id: "Pilih termokopel yang sesuai untuk 1000°C. Untuk sambungan tipe J pada bagian (c), suhu referensinya sekitar 179°C.",
      en: "Choose a suitably rated thermocouple at 1000°C. The type J reference junction in part (c) is approximately 179°C.",
    },
    visual: {
      kind: "thermocouple",
      caption: {
        id: "Tegangan ukur adalah selisih tegangan tabel sambungan ukur dan referensi.",
        en: "Measured voltage is the difference between the hot- and reference-junction table values.",
      },
      params: {
        type: "J",
        measured: 15,
        T: 450,
        Tref: 178.93,
      },
    },
    answerMath: "\\boxed{T_2\\approx179^\\circ\\mathrm C}",
    referencePages: [2, 3, 4, 5, 6],
  },
  {
    id: "2024-uts2-q2",
    year: 2024,
    exam: "uts2",
    number: 2,
    title: {
      id: "Flowmeter, resolver, dan detektor jarak",
      en: "Flowmeters, resolvers, and proximity detectors",
    },
    topic: "systems",
    source: {
      url: "https://drive.google.com/file/d/1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3/view",
      file: "2024-uts2.pdf",
      pages: [1, 2],
    },
    original:
      "2. Conceptual Questions: Flowmeter, Resolver, Inductive and Optical Proximity\n(a) [5%] In a differential pressure flowmeter, why is the discharge coefficient (\\(C_d\\)) needed to determine the fluid flow?\n(b) [5%] There are three types of differential pressure flowmeters: orifice, nozzle, and venturi. Why is the orifice meter the most widely used in industry? Does the orifice have the highest discharge coefficient (\\(C_d\\))?\n(c) [5%] Please explain briefly the working principle of the following resolver.\n(d) [5%] Explain briefly how an inductive proximity works.\n(e) [5%] Explain briefly how an optical proximity works.",
    originalLanguage: "en",
    prompt: {
      id: "(a) Mengapa flowmeter beda tekanan memerlukan koefisien debit \\(C_d\\)? (b) Mengapa orifis banyak dipakai dibanding nozzle dan venturi? Apakah nilai \\(C_d\\)-nya paling tinggi? (c) Jelaskan resolver pada gambar, dengan keluaran stator yang sebanding dengan sinus dan kosinus sudut poros. (d) Jelaskan detektor jarak induktif. (e) Jelaskan detektor jarak optik.",
      en: "2. Conceptual Questions: Flowmeter, Resolver, Inductive and Optical Proximity\n(a) [5%] In a differential pressure flowmeter, why is the discharge coefficient (\\(C_d\\)) needed to determine the fluid flow?\n(b) [5%] There are three types of differential pressure flowmeters: orifice, nozzle, and venturi. Why is the orifice meter the most widely used in industry? Does the orifice have the highest discharge coefficient (\\(C_d\\))?\n(c) [5%] Please explain briefly the working principle of the following resolver.\n(d) [5%] Explain briefly how an inductive proximity works.\n(e) [5%] Explain briefly how an optical proximity works.",
    },
    steps: [
      {
        title: {
          id: "a · Koreksi debit ideal",
          en: "a · Correct the ideal flow rate",
        },
        body: [
          {
            id: "Bernoulli tanpa rugi dan kontinuitas memberi debit ideal. Aliran nyata memiliki rugi, kontraksi, dan profil kecepatan yang tidak seragam. Koefisien debit merangkum pengaruhnya sesuai bentuk alat dan lokasi pengambilan tekanan.",
            en: "Lossless Bernoulli and continuity give the ideal flow rate. Real flow has losses, contraction, and a nonuniform velocity profile. The discharge coefficient accounts for these effects for a specified meter and pressure-tap arrangement.",
          },
          {
            id: "Gunakan koefisien yang cocok dengan geometri serta bilangan Reynolds. Koefisien ini bukan faktor keamanan yang boleh kita pilih sembarang.",
            en: "Use a coefficient that matches the geometry and Reynolds number. It is not an arbitrary safety factor.",
          },
        ],
        math: "Q_{\\mathrm{actual}}=C_dQ_{\\mathrm{ideal}}",
        visual: {
          kind: "orifice",
          caption: {
            id: "Perubahan Cd mengubah debit nyata pada beda tekanan yang sama.",
            en: "Changing Cd changes actual flow at the same pressure difference.",
          },
          params: {
            Cd: 0.62,
            D: 0.1,
            d: 0.05,
            rho: 1000,
            dp: 10000,
          },
        },
      },
      {
        title: {
          id: "b · Biaya dan kehilangan tekanan",
          en: "b · Cost and pressure loss",
        },
        body: [
          {
            id: "Orifis memakai pelat berlubang yang sederhana, ringkas, murah, dan mudah diganti. Itu membuatnya menarik untuk banyak pemasangan.",
            en: "An orifice uses a simple, compact, inexpensive plate that is easy to replace. These features suit many installations.",
          },
          {
            id: "Nilai koefisiennya justru lebih rendah: materi memberi orifis 0,58–0,65; nozzle 0,93–0,98; venturi 0,95–0,995. Orifis juga menimbulkan kehilangan tekanan permanen lebih besar. Jadi, pemakaian luas tidak berarti kinerjanya unggul pada semua ukuran.",
            en: "Its discharge coefficient is lower: the notes give 0.58–0.65 for an orifice, 0.93–0.98 for a nozzle, and 0.95–0.995 for a venturi. An orifice also causes greater permanent pressure loss. Widespread use does not mean it is superior by every measure.",
          },
        ],
      },
      {
        title: {
          id: "c · Baca dua keluaran resolver",
          en: "c · Read the two resolver outputs",
        },
        body: [
          {
            id: "Rotor menerima eksitasi AC. Perubahan sudut mengubah kopling magnetik ke dua kumparan stator yang berselisih sudut 90°.",
            en: "The rotor receives AC excitation. Rotation changes the magnetic coupling to two stator windings spaced 90° apart.",
          },
          {
            id: "Amplitudo keluaran stator sebanding dengan sinus dan kosinus sudut poros. Setelah rangkaian membaca amplitudo bertandanya, fungsi atan2 menentukan sudut beserta kuadrannya. Perhatikan bahwa sinus/kosinus di sini menyatakan sudut poros, bukan dua frekuensi yang berbeda.",
            en: "The output amplitudes are proportional to the sine and cosine of shaft angle. After recovering signed amplitudes, atan2 determines the angle and its quadrant. Here sine and cosine refer to shaft angle, not two different frequencies.",
          },
        ],
        math: "V_s=kV_{\\mathrm{ref}}\\sin\\theta,\\qquad V_c=kV_{\\mathrm{ref}}\\cos\\theta,\\qquad\\theta=\\operatorname{atan2}(V_s,V_c)",
        visual: {
          kind: "resolver",
          caption: {
            id: "Putaran poros mengubah amplitudo sinus dan kosinus.",
            en: "Shaft rotation changes the sine and cosine amplitudes.",
          },
          params: {
            angle: 45,
          },
        },
      },
      {
        title: {
          id: "d · Deteksi logam secara induktif",
          en: "d · Detect metal inductively",
        },
        body: [
          {
            id: "Kumparan yang diberi arus AC membentuk medan magnet bolak-balik. Logam yang mendekat menimbulkan arus pusar dan mengubah beban serta amplitudo osilator.",
            en: "An AC-driven coil creates an alternating magnetic field. Nearby metal develops eddy currents, changing the oscillator load and amplitude.",
          },
          {
            id: "Rangkaian membandingkan perubahan itu dengan ambang lalu mengubah keluaran ON/OFF. Detektor ini cocok untuk target logam; keluaran sakelar tidak langsung menyatakan jarak secara linear.",
            en: "A circuit compares that change with a threshold and switches the output ON or OFF. This detector suits metallic targets; its switch output is not a linear distance measurement.",
          },
        ],
        visual: {
          kind: "system",
          caption: {
            id: "Kumparan, target logam, lalu keluaran sakelar.",
            en: "Coil, metal target, then switch output.",
          },
          params: {
            mode: "inductive",
          },
        },
      },
      {
        title: {
          id: "e · Deteksi dengan cahaya",
          en: "e · Detect with light",
        },
        body: [
          {
            id: "Pemancar mengirim cahaya dan penerima membaca intensitasnya. Pada through-beam, benda memutus berkas di antara keduanya. Pada retroreflective, reflektor mengembalikan cahaya ke penerima di sisi pemancar.",
            en: "An emitter sends light and a receiver measures its intensity. In through-beam sensing, an object interrupts the beam between them. In retroreflective sensing, a reflector returns light to a receiver beside the emitter.",
          },
          {
            id: "Benda mengubah cahaya yang diterima, lalu rangkaian mengaktifkan sakelar. Materi menyebut pulsa inframerah agar detektor dapat membedakan sinyalnya dari cahaya sekitar.",
            en: "The object changes the received light, which triggers a switch. The notes use pulsed infrared light to help distinguish the intended signal from ambient light.",
          },
        ],
        visual: {
          kind: "system",
          caption: {
            id: "Objek menghalangi lintasan cahaya dan mengubah status deteksi.",
            en: "An object blocks the light path and changes detection state.",
          },
          params: {
            mode: "optical",
          },
        },
      },
    ],
    answer: {
      id: "Cd mengoreksi debit ideal. Orifis unggul pada kesederhanaan dan biaya, bukan pada Cd tertinggi. Resolver membaca sudut; detektor induktif membaca kedekatan logam; detektor optik membaca perubahan cahaya.",
      en: "Cd corrects ideal flow. An orifice offers simplicity and low cost, rather than the highest Cd. Resolvers measure angle, inductive detectors sense nearby metal, and optical detectors sense changes in light.",
    },
    visual: {
      kind: "resolver",
      caption: {
        id: "Dua amplitudo cukup untuk menentukan sudut pada satu putaran.",
        en: "Two signed amplitudes determine angle within one revolution.",
      },
      params: {
        angle: 45,
      },
    },
    referencePages: [1, 2, 9, 10, 16],
  },
  {
    id: "2024-uts2-q3",
    year: 2024,
    exam: "uts2",
    number: 3,
    title: {
      id: "Debit dari Pitot dan manometer",
      en: "Flow rate from a Pitot tube and manometer",
    },
    topic: "flow",
    source: {
      url: "https://drive.google.com/file/d/1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3/view",
      file: "2024-uts2.pdf",
      pages: [2, 3],
    },
    original:
      "3. Pitot Tube: Flow Measurement\nA pitot tube is used to measure the water flow inside a pipe with an internal diameter of 100 mm. The tube is connected to a U-tube manometer filled with mercury, as depicted in the following figure. Given that the density of water and mercury are 1000 kg/m³ and 13600 kg/m³, respectively, and the absolute viscosity of water at 27°C is \\(8.62\\times10^{-3}\\ \\mathrm{Ns/m^2}\\). The gravity constant is 10 m/s².\n(a) [5%] By using Bernoulli’s equation, determine the pressure difference between Point 1 and Point 2, i.e. \\(P_2-P_1\\).\n(b) [10%] By using Pascal’s Law, determine the water flow (\\(v_1\\)) in terms of the mercury height difference (\\(h_m\\)).\n(c) [10%] If \\(h_m=5\\) mm, calculate the volumetric flowrate in m³/s.\n(d) [5%] Check whether the water flow is laminar or turbulent?\nUseful formulas supplied: \\(Re=\\rho vD/\\mu\\); laminar \\(v_{max}=2v_{avg}\\); turbulent \\(v_{max}=1.23v_{avg}\\).",
    originalLanguage: "en",
    prompt: {
      id: "Air mengalir di pipa berdiameter dalam 100 mm. Pitot menghubungkan tekanan statis di titik 1 dan tekanan stagnasi di titik 2 ke manometer U berisi raksa. Diketahui \\(\\rho_w=1000\\ \\mathrm{kg/m^3}\\), \\(\\rho_m=13600\\ \\mathrm{kg/m^3}\\), \\(\\mu=8{,}62\\times10^{-3}\\ \\mathrm{Pa\\,s}\\), dan \\(g=10\\ \\mathrm{m/s^2}\\). (a) Turunkan \\(P_2-P_1\\) dengan Bernoulli. (b) Nyatakan \\(v_1\\) sebagai fungsi selisih tinggi raksa \\(h_m\\). (c) Hitung debit saat \\(h_m=5\\) mm. (d) Periksa jenis alirannya. Gunakan hubungan pada lampiran: \\(v_{max}=2v_{avg}\\) untuk laminar dan \\(v_{max}=1{,}23v_{avg}\\) untuk turbulen.",
      en: "3. Pitot Tube: Flow Measurement\nA pitot tube is used to measure the water flow inside a pipe with an internal diameter of 100 mm. The tube is connected to a U-tube manometer filled with mercury, as depicted in the following figure. Given that the density of water and mercury are 1000 kg/m³ and 13600 kg/m³, respectively, and the absolute viscosity of water at 27°C is \\(8.62\\times10^{-3}\\ \\mathrm{Ns/m^2}\\). The gravity constant is 10 m/s².\n(a) [5%] By using Bernoulli’s equation, determine the pressure difference between Point 1 and Point 2, i.e. \\(P_2-P_1\\).\n(b) [10%] By using Pascal’s Law, determine the water flow (\\(v_1\\)) in terms of the mercury height difference (\\(h_m\\)).\n(c) [10%] If \\(h_m=5\\) mm, calculate the volumetric flowrate in m³/s.\n(d) [5%] Check whether the water flow is laminar or turbulent?\nUseful formulas supplied: \\(Re=\\rho vD/\\mu\\); laminar \\(v_{max}=2v_{avg}\\); turbulent \\(v_{max}=1.23v_{avg}\\).",
    },
    steps: [
      {
        title: {
          id: "a · Hentikan aliran di ujung Pitot",
          en: "a · Stop the flow at the Pitot opening",
        },
        body: [
          {
            id: "Titik 2 merupakan titik stagnasi: kecepatan lokal turun ke nol. Titik 1 dan 2 berada pada ketinggian yang sama. Abaikan rugi pada lintasan pendek menuju ujung Pitot.",
            en: "Point 2 is a stagnation point: the local velocity falls to zero. Points 1 and 2 are at the same elevation. Neglect losses along the short path to the Pitot opening.",
          },
          {
            id: "Bernoulli mengubah energi gerak menjadi tekanan. Karena itu, tekanan titik 2 lebih tinggi daripada titik 1.",
            en: "Bernoulli converts kinetic energy into pressure, so point 2 has the higher pressure.",
          },
        ],
        math: "P_1+\\frac12\\rho_wv_1^2=P_2+\\frac12\\rho_w(0)^2\\quad\\Rightarrow\\quad P_2-P_1=\\frac12\\rho_wv_1^2",
      },
      {
        title: {
          id: "b · Hubungkan tekanan dengan tinggi raksa",
          en: "b · Relate pressure to mercury height",
        },
        body: [
          {
            id: "Kedua kaki manometer juga berisi air di atas raksa. Karena itu, selisih massa jenis yang menentukan beda tekanan, bukan massa jenis raksa saja.",
            en: "Both manometer legs also contain water above the mercury. The pressure difference therefore depends on the density difference, not mercury density alone.",
          },
          {
            id: "Samakan tekanan hidrostatik pada satu bidang mendatar di raksa, lalu gabungkan dengan hasil Bernoulli.",
            en: "Equate hydrostatic pressures at one horizontal level in the mercury, then combine that relation with Bernoulli.",
          },
        ],
        math: "\\Delta P=(\\rho_m-\\rho_w)gh_m,\\qquad v_1=\\sqrt{\\frac{2(\\rho_m-\\rho_w)gh_m}{\\rho_w}}",
      },
      {
        title: {
          id: "c · Hitung kecepatan lokal",
          en: "c · Calculate local velocity",
        },
        body: [
          {
            id: "Ubah 5 mm menjadi 0,005 m. Beda tekanannya 630 Pa, lalu kecepatan di lokasi Pitot adalah 1,1225 m/s.",
            en: "Convert 5 mm to 0.005 m. The pressure difference is 630 Pa and the local Pitot velocity is 1.1225 m/s.",
          },
          {
            id: "Ujung Pitot pada garis tengah membaca kecepatan maksimum. Debit memerlukan kecepatan rata-rata penampang, sehingga kita belum boleh langsung mengalikan nilai ini dengan luas pipa.",
            en: "A Pitot opening on the centreline measures the maximum velocity. Flow rate requires the cross-sectional average, so do not yet multiply this value directly by pipe area.",
          },
        ],
        math: "\\begin{aligned}\\Delta P&=(13600-1000)(10)(0.005)=630\\ \\mathrm{Pa}\\\\v_{max}&=\\sqrt{2(630)/1000}=1.1225\\ \\mathrm{m/s}\\end{aligned}",
      },
      {
        title: {
          id: "d · Pilih profil yang konsisten",
          en: "d · Choose a consistent velocity profile",
        },
        body: [
          {
            id: "Coba profil laminar lebih dulu. Nilai rata-ratanya 1,1225/2 = 0,56125 m/s, tetapi bilangan Reynolds-nya sekitar 6511. Angka ini tidak sesuai dengan aliran laminar.",
            en: "First try a laminar profile. The mean velocity is 1.1225/2 = 0.56125 m/s, but its Reynolds number is about 6511, which is inconsistent with laminar flow.",
          },
          {
            id: "Dengan profil turbulen pada lampiran, kecepatan rata-rata menjadi 1,1225/1,23 = 0,91260 m/s. Bilangan Reynolds sekitar 10.587 mendukung pilihan turbulen.",
            en: "With the turbulent profile supplied in the exam, the average is 1.1225/1.23 = 0.91260 m/s. A Reynolds number of about 10,587 supports that choice.",
          },
        ],
        math: "\\bar v=\\frac{1.122497}{1.23}=0.912599\\ \\mathrm{m/s},\\qquad Re=\\frac{1000(0.912599)(0.1)}{8.62\\times10^{-3}}\\approx1.059\\times10^4",
      },
      {
        title: {
          id: "c · Ubah kecepatan rata-rata menjadi debit",
          en: "c · Convert mean velocity to flow rate",
        },
        body: [
          {
            id: "Luas pipa berasal dari diameter dalam 0,1 m. Kalikan luas ini dengan kecepatan rata-rata, bukan kecepatan pusat.",
            en: "Use the 0.1 m internal diameter to find pipe area. Multiply that area by mean velocity, not centreline velocity.",
          },
          {
            id: "Hasilnya sekitar 7,17 liter per detik. Ini memakai faktor profil 1,23 yang memang diberikan dalam soal.",
            en: "The result is about 7.17 litres per second, using the profile factor of 1.23 supplied in the exam.",
          },
        ],
        math: "Q=\\frac{\\pi(0.1)^2}{4}(0.912599)=7.1675\\times10^{-3}\\ \\mathrm{m^3/s}",
      },
    ],
    answer: {
      id: "Debit sekitar 0,00717 m³/s dan alirannya turbulen, setelah mengubah kecepatan pusat menjadi kecepatan rata-rata.",
      en: "The flow rate is approximately 0.00717 m³/s and the flow is turbulent, after converting centreline velocity to mean velocity.",
    },
    visual: {
      kind: "pitot",
      caption: {
        id: "Tinggi raksa menentukan tekanan dinamis; profil aliran mengubah kecepatan lokal menjadi debit.",
        en: "Mercury height sets dynamic pressure; the velocity profile converts local speed into flow rate.",
      },
      params: {
        D: 0.1,
        rho: 1000,
        g: 10,
        h: 0.005,
        mu: 0.00862,
        profileFactor: 1.23,
        rhoMan: 13600,
      },
    },
    answerMath:
      "\\boxed{\\Delta P=630\\ \\mathrm{Pa},\\quad Q\\approx7.168\\times10^{-3}\\ \\mathrm{m^3/s},\\quad Re\\approx10587}",
    referencePages: [11],
    assumptions: [
      {
        id: "Kita anggap ujung Pitot berada pada garis tengah dan aliran berkembang penuh, sesuai gambar profil pada lampiran. Jika v1 dimaksudkan sebagai kecepatan rata-rata, debitnya 0,008816 m³/s; itu melewati koreksi profil yang diberikan soal.",
        en: "The Pitot opening is taken to be on the centreline with fully developed flow, consistent with the supplied profiles. If v1 were intended as an average velocity, the flow would be 0.008816 m³/s, which omits the provided profile correction.",
      },
      {
        id: "Soal mencetak viskositas 8,62 × 10⁻³ Pa·s. Pembahasan mempertahankan angka itu; jangan menggantinya diam-diam dengan nilai dari tabel air.",
        en: "The exam prints a viscosity of 8.62 × 10⁻³ Pa·s. This solution keeps that value rather than silently replacing it with a water-property table value.",
      },
    ],
  },
  {
    id: "2024-uts2-q4",
    year: 2024,
    exam: "uts2",
    number: 4,
    title: {
      id: "Nonlinearitas dan model termokopel",
      en: "Thermocouple nonlinearity and a fitted model",
    },
    topic: "calibration",
    source: {
      url: "https://drive.google.com/file/d/1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3/view",
      file: "2024-uts2.pdf",
      pages: [2, 3],
    },
    original:
      "4. Thermocouple: Temperature Measurement & Measurement Characteristics\nAn iron v. constantan thermocouple (Type J) is used to measure temperatures in the ranges of 0°C to 300°C. The e.m.f. values for the thermocouple are provided in the following table.\nType: Iron v. constantan, Type J. Temperature range: −20 to +700°C. E.m.f. values (μV): \\(E_{0,0}=0\\), \\(E_{100,0}=5269\\), \\(E_{200,0}=10779\\), \\(E_{300,0}=16327\\).\n(a) [10%] Calculate the non-linearity at 100°C and 200°C as a percentage of the full scale.\n(b) [5%] For the temperature range between 100°C and 300°C, the thermocouple e.m.f. is expressed as \\(E_{T,0}=a_1T+a_2T^2\\). Calculate \\(a_1\\) and \\(a_2\\).\n(c) [10%] If the measured e.m.f. is 12500 μV relative to a reference junction at 20°C, and the reference junction circuit voltage is 1000 μV, use the results from question (b) to estimate the temperature of the measured junction.",
    originalLanguage: "en",
    prompt: {
      id: "Termokopel besi–konstantan tipe J mengukur 0–300°C. Tabel memberi tegangan terhadap 0°C: pada 0°C = 0 μV; 100°C = 5269 μV; 200°C = 10779 μV; 300°C = 16327 μV. Rentang tipe pada tabel adalah −20 hingga 700°C. (a) Hitung nonlinearitas pada 100 dan 200°C sebagai persen skala penuh. (b) Untuk rentang 100–300°C, tentukan \\(a_1,a_2\\) dalam \\(E_{T,0}=a_1T+a_2T^2\\). (c) Tegangan ukur 12500 μV mengacu ke sambungan 20°C. Rangkaian sambungan referensi memberi 1000 μV. Gunakan model bagian (b) untuk mencari suhu sambungan ukur.",
      en: "4. Thermocouple: Temperature Measurement & Measurement Characteristics\nAn iron v. constantan thermocouple (Type J) is used to measure temperatures in the ranges of 0°C to 300°C. The e.m.f. values for the thermocouple are provided in the following table.\nType: Iron v. constantan, Type J. Temperature range: −20 to +700°C. E.m.f. values (μV): \\(E_{0,0}=0\\), \\(E_{100,0}=5269\\), \\(E_{200,0}=10779\\), \\(E_{300,0}=16327\\).\n(a) [10%] Calculate the non-linearity at 100°C and 200°C as a percentage of the full scale.\n(b) [5%] For the temperature range between 100°C and 300°C, the thermocouple e.m.f. is expressed as \\(E_{T,0}=a_1T+a_2T^2\\). Calculate \\(a_1\\) and \\(a_2\\).\n(c) [10%] If the measured e.m.f. is 12500 μV relative to a reference junction at 20°C, and the reference junction circuit voltage is 1000 μV, use the results from question (b) to estimate the temperature of the measured junction.",
    },
    steps: [
      {
        title: {
          id: "a · Tentukan garis ideal",
          en: "a · Define the ideal line",
        },
        body: [
          {
            id: "Pakai garis yang menghubungkan kedua ujung rentang ukur: (0°C, 0 μV) dan (300°C, 16327 μV). Skala penuh yang dipakai ialah 16327 μV.",
            en: "Use the line joining the measurement-range endpoints: (0°C, 0 μV) and (300°C, 16327 μV). The full-scale output span is 16327 μV.",
          },
          {
            id: "Nonlinearitas adalah selisih tegangan aktual terhadap garis ini, dibagi rentang keluaran skala penuh.",
            en: "Nonlinearity is the actual-minus-ideal voltage divided by this full-scale span.",
          },
        ],
        math: "E_{\\mathrm{lin}}(T)=\\frac{16327}{300}T=54.42333T\\quad(\\mu\\mathrm V)",
      },
      {
        title: {
          id: "a · Bandingkan dua titik",
          en: "a · Compare the two points",
        },
        body: [
          {
            id: "Pada 100°C, garis ideal memberi 5442,333 μV. Data berada 173,333 μV di bawahnya. Pada 200°C, garis memberi 10884,667 μV, sedangkan data berada 105,667 μV di bawahnya.",
            en: "At 100°C, the ideal line gives 5442.333 μV, so the data are 173.333 μV below it. At 200°C, the ideal value is 10884.667 μV and the data are 105.667 μV below it.",
          },
          {
            id: "Tanda negatif menyatakan posisi di bawah garis. Jika soal meminta besar nonlinearitas, laporkan 1,062% dan 0,647%.",
            en: "The negative sign means below the line. For nonlinearity magnitudes, report 1.062% and 0.647%.",
          },
        ],
        math: "\\begin{aligned}N_{100}&=\\frac{5269-5442.333}{16327}(100\\%)=-1.0616\\%\\\\N_{200}&=\\frac{10779-10884.667}{16327}(100\\%)=-0.6472\\%\\end{aligned}",
      },
      {
        title: {
          id: "b · Bentuk dua persamaan",
          en: "b · Form two equations",
        },
        body: [
          {
            id: "Untuk dua konstanta, kita pakai dua titik ujung rentang yang diminta, yaitu 100 dan 300°C. Bagi persamaan pertama dengan 100 dan kedua dengan 300 agar suku a1 sama.",
            en: "For the two constants, use the endpoints of the requested interval, 100 and 300°C. Divide the first equation by 100 and the second by 300 so their a1 terms match.",
          },
          {
            id: "Kurangi persamaan hasil pembagian. Kita memperoleh a2, lalu masukkan kembali untuk memperoleh a1.",
            en: "Subtract the divided equations to find a2, then substitute back to find a1.",
          },
        ],
        math: "\\begin{aligned}100a_1+10000a_2&=5269\\\\300a_1+90000a_2&=16327\\\\200a_2&=54.423333-52.69\\\\a_2&=0.008666667\\ \\mu\\mathrm V/{}^\\circ\\mathrm C^2\\\\a_1&=51.823333\\ \\mu\\mathrm V/{}^\\circ\\mathrm C\\end{aligned}",
      },
      {
        title: {
          id: "Periksa batas model kuadrat",
          en: "Check the quadratic model",
        },
        body: [
          {
            id: "Model dua titik ini memberi 10711,333 μV pada 200°C, berbeda 67,667 μV dari data. Jadi model ini merupakan pendekatan, bukan kurva yang melalui seluruh tabel.",
            en: "This two-point model predicts 10711.333 μV at 200°C, differing from the data by 67.667 μV. It is therefore an approximation rather than an exact fit to every table value.",
          },
          {
            id: "Tiga nilai tak nol tidak dapat dicocokkan persis dengan dua konstanta ini. Jika memakai kuadrat terkecil, hasil koefisien akan berbeda; di sini pilihan titik sudah dinyatakan.",
            en: "Three nonzero data values cannot all be matched exactly with these two constants. A least-squares fit would give different coefficients; the endpoint choice is explicit here.",
          },
        ],
      },
      {
        title: {
          id: "c · Tambahkan kompensasi referensi",
          en: "c · Add the reference compensation",
        },
        body: [
          {
            id: "Tegangan 12500 μV belum mengacu ke 0°C. Tambahkan 1000 μV yang diberikan untuk sambungan referensi, sehingga target model menjadi 13500 μV.",
            en: "The 12500 μV reading is not yet referenced to 0°C. Add the given 1000 μV reference contribution, making the model target 13500 μV.",
          },
          {
            id: "Kita gunakan angka 1000 μV dari bagian (c), bukan menggantinya dengan nilai tabel tipe J pada 20°C.",
            en: "Use the 1000 μV specified in part (c), without replacing it by a type J table value at 20°C.",
          },
        ],
        math: "E(T,0)=12500+1000=13500\\ \\mu\\mathrm V",
      },
      {
        title: {
          id: "c · Ambil akar pada rentang kerja",
          en: "c · Select the root within the working interval",
        },
        body: [
          {
            id: "Masukkan tegangan terkoreksi ke model. Persamaan kuadrat memberi dua akar, tetapi hanya sekitar 250,04°C yang berada dalam rentang 100–300°C.",
            en: "Substitute the compensated voltage into the model. The quadratic has two roots, but only about 250.04°C lies within 100–300°C.",
          },
          {
            id: "Akar negatif sekitar −6229,66°C berada di luar domain model dan tidak bermakna untuk pengukuran ini.",
            en: "The negative root near −6229.66°C is outside the model domain and has no meaning for this measurement.",
          },
        ],
        math: "0.008666667T^2+51.823333T-13500=0\\quad\\Rightarrow\\quad T\\approx250.04^\\circ\\mathrm C",
      },
    ],
    answer: {
      id: "Besar nonlinearitasnya 1,062% pada 100°C dan 0,647% pada 200°C. Model dua titik memberi suhu sekitar 250,04°C setelah kompensasi referensi.",
      en: "Nonlinearity magnitudes are 1.062% at 100°C and 0.647% at 200°C. The endpoint-fitted model gives approximately 250.04°C after reference compensation.",
    },
    visual: {
      kind: "calibration",
      caption: {
        id: "Bandingkan data termokopel dengan garis ujung dan model kuadrat.",
        en: "Compare thermocouple data with the endpoint line and quadratic model.",
      },
      params: {
        slope: 54.423333,
        intercept: 0,
        xUnit: "°C",
        yUnit: "μV",
        mode: "thermocouple",
        a1: 51.823333,
        a2: 0.008666667,
        xs: [0, 100, 200, 300],
        ys: [0, 5269, 10779, 16327],
      },
    },
    answerMath:
      "\\boxed{\\begin{aligned}|N_{100}|&=1.062\\%,\\quad|N_{200}|=0.647\\%\\\\a_1&=51.82333\\ \\mu\\mathrm V/{}^\\circ\\mathrm C\\\\a_2&=0.008666667\\ \\mu\\mathrm V/{}^\\circ\\mathrm C^2\\\\T&\\approx250.04^\\circ\\mathrm C\\end{aligned}}",
    referencePages: [4, 5, 6],
    assumptions: [
      {
        id: "Nonlinearitas memakai garis ujung 0–300°C. Model kuadrat memakai titik 100 dan 300°C; soal tidak menetapkan metode pencocokan.",
        en: "Nonlinearity uses the 0–300°C endpoint line. The quadratic uses the 100 and 300°C points; the exam does not prescribe a fitting method.",
      },
    ],
  },
  {
    id: "2024-uas-q1",
    year: 2024,
    exam: "uas",
    number: 1,
    title: {
      id: "Kalibrasi sensor tekanan",
      en: "Calibrating a pressure transducer",
    },
    topic: "calibration",
    source: {
      url: "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
      file: "2024-uas.pdf",
      pages: [1],
    },
    original:
      "1. [20%] Systematic Characteristics of Measurement Systems\nThe following table presents the test results of a pressure transducer in a laboratory under the following conditions:\n(i) Ambient temperature 25°C, supply voltage 9 V (standard).\n(ii) Ambient temperature 25°C, supply voltage 12 V.\n(iii) Ambient temperature 30°C, supply voltage 9 V.\nInput (barg): 0, 4, 8, 12, 16.\nOutput (mA), condition (i): 4, 11.0, 16.0, 22.8, 29.6.\nOutput (mA), condition (ii): 4, 13.2, 21.3, 31.1, 39.2.\nOutput (mA), condition (iii): 6, 12.5, 18.1, 25.5, 31.6.\n(a) [10%] Determine the values of \\(K_M,K_I,a,K\\) associated with the model equation \\(O=(K+K_MI_M)I+a+K_II_I\\). Complete your answer with the units.\n(b) [10%] Calculate the maximum non-linearity as a percentage of the full-scale deflection (f.s.d.).",
    originalLanguage: "en",
    prompt: {
      id: "Sensor tekanan diuji pada tiga kondisi: (i) suhu sekitar 25°C dan catu 9 V sebagai standar; (ii) 25°C dan 12 V; (iii) 30°C dan 9 V. Untuk masukan 0, 4, 8, 12, 16 barg, keluaran (mA) berturut-turut adalah (i) 4; 11,0; 16,0; 22,8; 29,6, (ii) 4; 13,2; 21,3; 31,1; 39,2, dan (iii) 6; 12,5; 18,1; 25,5; 31,6. (a) Tentukan \\(K_M,K_I,a,K\\) beserta satuannya pada model \\(O=(K+K_MI_M)I+a+K_II_I\\). (b) Tentukan nonlinearitas maksimum sebagai persen rentang keluaran penuh.",
      en: "1. [20%] Systematic Characteristics of Measurement Systems\nThe following table presents the test results of a pressure transducer in a laboratory under the following conditions:\n(i) Ambient temperature 25°C, supply voltage 9 V (standard).\n(ii) Ambient temperature 25°C, supply voltage 12 V.\n(iii) Ambient temperature 30°C, supply voltage 9 V.\nInput (barg): 0, 4, 8, 12, 16.\nOutput (mA), condition (i): 4, 11.0, 16.0, 22.8, 29.6.\nOutput (mA), condition (ii): 4, 13.2, 21.3, 31.1, 39.2.\nOutput (mA), condition (iii): 6, 12.5, 18.1, 25.5, 31.6.\n(a) [10%] Determine the values of \\(K_M,K_I,a,K\\) associated with the model equation \\(O=(K+K_MI_M)I+a+K_II_I\\). Complete your answer with the units.\n(b) [10%] Calculate the maximum non-linearity as a percentage of the full-scale deflection (f.s.d.).",
    },
    steps: [
      {
        title: {
          id: "a · Definisikan perubahan lingkungan",
          en: "a · Define the environmental changes",
        },
        body: [
          {
            id: "I menyatakan tekanan masukan dalam bar gauge. Ambil perubahan catu terhadap 9 V sebagai masukan yang mengubah sensitivitas. Ambil perubahan suhu terhadap 25°C sebagai masukan yang menggeser titik nol.",
            en: "I is the input gauge pressure in bar. Use supply change relative to 9 V as the sensitivity-modifying input, and ambient-temperature change relative to 25°C as the zero-shifting input.",
          },
          {
            id: "Definisi ini membuat kedua masukan gangguan bernilai nol pada kondisi standar. Catatan tangan pada lembar bukan data kalibrasi; kita hitung dari tabel cetak.",
            en: "Both environmental inputs are then zero under standard conditions. Handwritten annotations are not calibration data; use the printed table.",
          },
        ],
        math: "I_M=V_s-9\\ \\mathrm V,\\qquad I_I=T_a-25^\\circ\\mathrm C",
      },
      {
        title: {
          id: "a · Cari kemiringan dan titik nol standar",
          en: "a · Find the standard slope and offset",
        },
        body: [
          {
            id: "Kita pakai garis yang melalui titik ujung kondisi (i). Kenaikan keluaran adalah 29,6 − 4 = 25,6 mA untuk kenaikan tekanan 16 bar.",
            en: "Use the endpoint line for condition (i). Output rises by 29.6 − 4 = 25.6 mA over a pressure increase of 16 bar.",
          },
          {
            id: "Keluaran pada tekanan nol adalah 4 mA. Nilai ini menjadi offset a, bukan bagian kemiringan.",
            en: "The zero-pressure output is 4 mA. This is the offset a, not part of the slope.",
          },
        ],
        math: "K=\\frac{29.6-4}{16-0}=1.6\\ \\mathrm{mA/bar},\\qquad a=4\\ \\mathrm{mA}",
      },
      {
        title: {
          id: "a · Pisahkan pengaruh catu dan suhu",
          en: "a · Separate supply and temperature effects",
        },
        body: [
          {
            id: "Pada catu 12 V, kemiringan menjadi (39,2 − 4)/16 = 2,2 mA/bar. Tambahan catu 3 V menaikkan kemiringan sebesar 0,6 mA/bar.",
            en: "At a 12 V supply, the slope is (39.2 − 4)/16 = 2.2 mA/bar. A 3 V supply rise increases sensitivity by 0.6 mA/bar.",
          },
          {
            id: "Pada suhu 30°C, kedua ujung keluaran naik 2 mA tanpa mengubah kemiringan. Kenaikan suhu 5°C jadi menggeser offset sebesar 0,4 mA per °C.",
            en: "At 30°C, both endpoint outputs increase by 2 mA without changing the slope. A 5°C temperature rise therefore shifts the offset by 0.4 mA per °C.",
          },
        ],
        math: "K_M=\\frac{2.2-1.6}{12-9}=0.2\\ \\frac{\\mathrm{mA}}{\\mathrm{bar\\,V}},\\qquad K_I=\\frac{6-4}{30-25}=0.4\\ \\frac{\\mathrm{mA}}{{}^\\circ\\mathrm C}",
      },
      {
        title: {
          id: "b · Ukur jarak data dari garis",
          en: "b · Measure the departures from the line",
        },
        body: [
          {
            id: "Garis standar memberi keluaran 4; 10,4; 16,8; 23,2; 29,6 mA. Kurangi nilai ideal ini dari data kondisi (i).",
            en: "The standard line gives outputs of 4, 10.4, 16.8, 23.2, and 29.6 mA. Subtract these from the condition (i) measurements.",
          },
          {
            id: "Simpangan terbesar adalah −0,8 mA pada 8 bar. Kita pakai besarnya, 0,8 mA, untuk nonlinearitas maksimum.",
            en: "The largest departure is −0.8 mA at 8 bar. Use its magnitude, 0.8 mA, for maximum nonlinearity.",
          },
        ],
        math: "\\delta O=\\{0,\\ 0.6,\\ -0.8,\\ -0.4,\\ 0\\}\\ \\mathrm{mA}",
        table: {
          headers: [
            {
              id: "I (bar)",
              en: "I (bar)",
            },
            {
              id: "Data (mA)",
              en: "Data (mA)",
            },
            {
              id: "Garis (mA)",
              en: "Line (mA)",
            },
            {
              id: "Selisih (mA)",
              en: "Residual (mA)",
            },
          ],
          rows: [
            ["0", "4", "4", "0"],
            ["4", "11.0", "10.4", "0.6"],
            ["8", "16.0", "16.8", "−0.8"],
            ["12", "22.8", "23.2", "−0.4"],
            ["16", "29.6", "29.6", "0"],
          ],
        },
      },
      {
        title: {
          id: "b · Bagi dengan rentang keluaran",
          en: "b · Divide by the output span",
        },
        body: [
          {
            id: "Full-scale deflection berarti perubahan keluaran dari nol masukan sampai masukan maksimum. Nilainya 29,6 − 4 = 25,6 mA, bukan 29,6 mA.",
            en: "Full-scale deflection is the output change from minimum to maximum input: 29.6 − 4 = 25.6 mA, not 29.6 mA.",
          },
          {
            id: "Model garis merangkum pengaruh catu dan suhu pada titik ujung. Simpangan kecil di titik tengah tetap menunjukkan nonlinearitas.",
            en: "The linear model captures supply and temperature effects at the endpoints. Small intermediate departures still represent nonlinearity.",
          },
        ],
        math: "N_{max}=\\frac{0.8}{25.6}(100\\%)=3.125\\%",
      },
    ],
    answer: {
      id: "K = 1,6 mA/bar, a = 4 mA, KM = 0,2 mA/(bar·V), KI = 0,4 mA/°C. Nonlinearitas maksimum pada kondisi standar adalah 3,125% f.s.d.",
      en: "K = 1.6 mA/bar, a = 4 mA, KM = 0.2 mA/(bar·V), KI = 0.4 mA/°C. Maximum standard-condition nonlinearity is 3.125% f.s.d.",
    },
    visual: {
      kind: "calibration",
      caption: {
        id: "Garis ideal memakai kedua titik ujung; jarak vertikal menunjukkan nonlinearitas.",
        en: "The ideal line uses both endpoints; vertical departure shows nonlinearity.",
      },
      params: {
        slope: 1.6,
        intercept: 4,
        xUnit: "bar",
        yUnit: "mA",
        ySupply: [4, 13.2, 21.3, 31.1, 39.2],
        yAmbient: [6, 12.5, 18.1, 25.5, 31.6],
        xs: [0, 4, 8, 12, 16],
        ys: [4, 11, 16, 22.8, 29.6],
      },
    },
    answerMath:
      "\\boxed{\\begin{aligned}K&=1.6\\ \\mathrm{mA/bar},&a&=4\\ \\mathrm{mA}\\\\K_M&=0.2\\ \\mathrm{mA/(bar\\,V)},&K_I&=0.4\\ \\mathrm{mA/{}^\\circ C}\\\\N_{max}&=3.125\\%\\ \\mathrm{f.s.d.}\\end{aligned}}",
    assumptions: [
      {
        id: "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        en: "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
      },
      {
        id: "Soal tidak menetapkan regresi kuadrat terkecil. Kita memakai garis ujung, dan menyatakan gangguan sebagai selisih terhadap kondisi standar.",
        en: "The exam does not request least-squares regression. This solution uses endpoint lines and environmental deviations from the standard condition.",
      },
    ],
  },
  {
    id: "2024-uas-q2",
    year: 2024,
    exam: "uas",
    number: 2,
    title: {
      id: "RTD pada jembatan Wheatstone",
      en: "An RTD in a Wheatstone bridge",
    },
    topic: "temperature",
    source: {
      url: "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
      file: "2024-uas.pdf",
      pages: [1],
    },
    original:
      "2. [15%] Temperature Sensor (RTD) and Signal Conditioning (Wheatstone Bridge)\nAn RTD serves as one arm (\\(R_4\\)) of a Wheatstone bridge, as shown in figure below. The RTD is used to measure a constant temperature, with the bridge operating in deflection mode. The RTD has a resistance of 25 Ω at a temperature of 0°C, and a thermal coefficient of resistance, \\(\\alpha=0.003925\\ {}^\\circ\\mathrm C^{-1}\\). If the RTD is subjected to a temperature of 100°C and the input voltage to the bridge is 5 V, calculate the output voltage of the bridge.\nFigure labels: \\(R_2=R_3=100\\ \\Omega\\); \\(R_1=25\\ \\Omega\\) at 0°C and balanced bridge conditions. Supply is between the left and right nodes; the detector is between the upper and lower nodes.\nThe resistance of the RTD as a function of temperature is given by \\(R(T)=R_0(1+\\alpha T)\\).",
    originalLanguage: "en",
    prompt: {
      id: "RTD menjadi lengan \\(R_4\\) pada jembatan Wheatstone. Diketahui \\(R_0=25\\ \\Omega\\) pada 0°C, \\(\\alpha=0{,}003925\\ {}^\\circ\\mathrm C^{-1}\\), suhu 100°C, dan catu 5 V. Pada gambar, dua lengan atas bernilai 100 Ω; lengan kiri bawah 25 Ω; lengan kanan bawah adalah RTD. Catu terhubung ke simpul kiri dan kanan. Keluaran diukur antara simpul atas dan bawah. Hitung tegangan keluaran memakai \\(R(T)=R_0(1+\\alpha T)\\).",
      en: "2. [15%] Temperature Sensor (RTD) and Signal Conditioning (Wheatstone Bridge)\nAn RTD serves as one arm (\\(R_4\\)) of a Wheatstone bridge, as shown in figure below. The RTD is used to measure a constant temperature, with the bridge operating in deflection mode. The RTD has a resistance of 25 Ω at a temperature of 0°C, and a thermal coefficient of resistance, \\(\\alpha=0.003925\\ {}^\\circ\\mathrm C^{-1}\\). If the RTD is subjected to a temperature of 100°C and the input voltage to the bridge is 5 V, calculate the output voltage of the bridge.\nFigure labels: \\(R_2=R_3=100\\ \\Omega\\); \\(R_1=25\\ \\Omega\\) at 0°C and balanced bridge conditions. Supply is between the left and right nodes; the detector is between the upper and lower nodes.\nThe resistance of the RTD as a function of temperature is given by \\(R(T)=R_0(1+\\alpha T)\\).",
    },
    steps: [
      {
        title: {
          id: "Hitung hambatan RTD pada 100°C",
          en: "Find the RTD resistance at 100°C",
        },
        body: [
          {
            id: "Koefisien α menyatakan kenaikan relatif hambatan per derajat. Masukkan selisih suhu terhadap 0°C, yaitu 100°C.",
            en: "The coefficient α gives the fractional resistance rise per degree. Use the temperature rise from 0°C, which is 100°C.",
          },
          {
            id: "Hambatan naik dari 25 Ω menjadi 34,8125 Ω. Kenaikan ini membuat jembatan tidak lagi seimbang.",
            en: "Resistance rises from 25 Ω to 34.8125 Ω, making the bridge unbalanced.",
          },
        ],
        math: "R_4=25[1+0.003925(100)]=34.8125\\ \\Omega",
      },
      {
        title: {
          id: "Ikuti sambungan pada gambar",
          en: "Follow the connections in the figure",
        },
        body: [
          {
            id: "Gambar memasang catu melintang kiri–kanan dan alat ukur atas–bawah. Kita tetapkan simpul kiri 5 V dan kanan 0 V. Sebut simpul atas A dan bawah B.",
            en: "The figure places the supply left-to-right and the detector top-to-bottom. Define the left node as 5 V and the right node as 0 V. Call the upper node A and lower node B.",
          },
          {
            id: "Dua resistor atas sama-sama 100 Ω, sehingga simpul atas berada pada setengah tegangan catu. Jangan memasangkan resistor 100 Ω dan 25 Ω sebagai satu pembagi: itu tidak mengikuti jalur catu pada gambar.",
            en: "The two upper resistors are both 100 Ω, so the upper node is at half the supply voltage. Pairing 100 Ω with 25 Ω as one divider would not follow this figure’s supply path.",
          },
        ],
        math: "V_A=5\\frac{100}{100+100}=2.5\\ \\mathrm V",
      },
      {
        title: {
          id: "Hitung tegangan simpul bawah",
          en: "Find the lower-node voltage",
        },
        body: [
          {
            id: "Jalur bawah berisi resistor kiri 25 Ω dan RTD kanan 34,8125 Ω. Dengan acuan simpul kanan nol, tegangan simpul bawah sama dengan jatuh tegangan pada RTD.",
            en: "The lower path contains 25 Ω on the left and the 34.8125 Ω RTD on the right. With the right node at zero, the lower-node voltage is the voltage across the RTD.",
          },
          {
            id: "Gunakan persamaan pembagi tegangan lengkap. Perubahan hambatannya hampir 40%, sehingga pendekatan perubahan kecil kurang tepat.",
            en: "Use the exact voltage-divider equation. Resistance changes by almost 40%, making the small-change approximation unsuitable.",
          },
        ],
        math: "V_B=5\\frac{34.8125}{25+34.8125}=2.910136\\ \\mathrm V",
      },
      {
        title: {
          id: "Kurangi kedua simpul",
          en: "Subtract the two node voltages",
        },
        body: [
          {
            id: "Untuk definisi keluaran bawah dikurangi atas, hasilnya positif 0,41014 V. Jika kabel voltmeter dibalik, tandanya berubah tetapi besarnya tetap.",
            en: "Defining output as lower minus upper gives +0.41014 V. Reversing the detector leads changes the sign but not the magnitude.",
          },
          {
            id: "Cek pada 0°C: kedua lengan bawah sama-sama 25 Ω, sehingga kedua simpul 2,5 V dan keluarannya nol.",
            en: "At 0°C, both lower resistors are 25 Ω, so both detector nodes are 2.5 V and the output is zero.",
          },
        ],
        math: "V_o=V_B-V_A=2.910136-2.5=0.410136\\ \\mathrm V",
      },
    ],
    answer: {
      id: "RTD menjadi 34,8125 Ω. Besar tegangan keluaran jembatan adalah sekitar 0,410 V; tanda mengikuti polaritas voltmeter.",
      en: "The RTD becomes 34.8125 Ω. The bridge output magnitude is approximately 0.410 V; its sign depends on detector polarity.",
    },
    visual: {
      kind: "bridge",
      caption: {
        id: "Ikuti catu kiri–kanan: keluaran membandingkan simpul atas dan bawah.",
        en: "Follow the left-to-right supply: the output compares upper and lower nodes.",
      },
      params: {
        mode: "rtd-horizontal",
        R1: 25,
        R2: 100,
        R3: 100,
        R0: 25,
        alpha: 0.003925,
        T: 100,
        V: 5,
      },
    },
    answerMath:
      "\\boxed{R_4=34.8125\\ \\Omega,\\qquad|V_o|\\approx0.41014\\ \\mathrm V}",
    referencePages: [2, 3],
    assumptions: [
      {
        id: "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        en: "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
      },
      {
        id: "Voltmeter ideal tidak menarik arus; hambatan kabel dan pemanasan sendiri RTD diabaikan. Polaritas keluaran dinyatakan dalam pembahasan.",
        en: "The ideal voltmeter draws no current; lead resistance and RTD self-heating are neglected. Output polarity is explicitly defined in the solution.",
      },
    ],
  },
  {
    id: "2024-uas-q3",
    year: 2024,
    exam: "uas",
    number: 3,
    title: {
      id: "Batas frekuensi dengan galat 5%",
      en: "Frequency limit for a 5% amplitude error",
    },
    topic: "dynamics",
    source: {
      url: "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
      file: "2024-uas.pdf",
      pages: [2],
    },
    original:
      "3. [10%] Dynamic Characteristics of Measurement Systems\nA seismic instrument is characterized by the following dynamic transfer function \\(G(s)=\\omega_n^2/(s^2+2\\zeta\\omega_n+\\omega_n^2)\\) [as printed]. Where \\(\\omega_n\\) is the natural frequency and \\(\\zeta\\) is the damping ratio. The instrument has a natural frequency of 20 Hz and a damping ratio of 0.65. Determine the maximum input frequency for a vibration such that the amplitude error in the indicated displacement is less than 5%.",
    originalLanguage: "en",
    prompt: {
      id: "Instrumen seismik memiliki frekuensi alami \\(f_n=20\\ \\mathrm{Hz}\\) dan rasio redaman \\(\\zeta=0{,}65\\). Tentukan batas frekuensi masukan agar galat amplitudo simpangan kurang dari 5%. Penyebut fungsi alih pada naskah mencetak \\(s^2+2\\zeta\\omega_n+\\omega_n^2\\); pembahasan memakai bentuk orde dua yang konsisten satuan, \\(G(s)=\\omega_n^2/(s^2+2\\zeta\\omega_ns+\\omega_n^2)\\).",
      en: "3. [10%] Dynamic Characteristics of Measurement Systems\nA seismic instrument is characterized by the following dynamic transfer function \\(G(s)=\\omega_n^2/(s^2+2\\zeta\\omega_n+\\omega_n^2)\\) [as printed]. Where \\(\\omega_n\\) is the natural frequency and \\(\\zeta\\) is the damping ratio. The instrument has a natural frequency of 20 Hz and a damping ratio of 0.65. Determine the maximum input frequency for a vibration such that the amplitude error in the indicated displacement is less than 5%.",
    },
    steps: [
      {
        title: {
          id: "Gunakan model yang konsisten satuan",
          en: "Use the dimensionally consistent model",
        },
        body: [
          {
            id: "Suku redaman harus memuat s. Tanpa s, satuannya berbeda dari dua suku lain pada penyebut. Koreksi ini kita nyatakan terbuka karena naskah cetak menghilangkannya.",
            en: "The damping term must include s. Without it, its units differ from the other denominator terms. This correction is explicit because the printed formula omits it.",
          },
          {
            id: "Rasio frekuensi r dapat dihitung dari frekuensi dalam Hz maupun rad/s, asalkan pembilang dan penyebut memakai satuan sama.",
            en: "The frequency ratio r can use either Hz or rad/s, provided numerator and denominator use the same units.",
          },
        ],
        math: "G(s)=\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_ns+\\omega_n^2},\\qquad r=\\frac{\\omega}{\\omega_n}=\\frac{f}{20}",
      },
      {
        title: {
          id: "Ubah fungsi alih menjadi rasio amplitudo",
          en: "Convert the transfer function to an amplitude ratio",
        },
        body: [
          {
            id: "Masukan sinusoidal berarti kita evaluasi s = jω. Besar keluaran dibagi besar masukan adalah M.",
            en: "For a sinusoidal input, evaluate the transfer function at s = jω. The output-to-input amplitude ratio is M.",
          },
          {
            id: "Galat di bawah 5% berarti amplitudo harus berada di antara 95% dan 105% nilai yang semestinya. Syarat ini membatasi amplitudo, bukan galat fase.",
            en: "Less than 5% amplitude error requires M between 95% and 105% of its ideal value. This condition does not constrain phase error.",
          },
        ],
        math: "M(r)=\\frac1{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}},\\qquad0.95<M(r)<1.05",
      },
      {
        title: {
          id: "Periksa apakah penguatan melewati 1,05",
          en: "Check whether the peak exceeds 1.05",
        },
        body: [
          {
            id: "Redaman 0,65 menghasilkan puncak kecil. Besarnya hanya sekitar 1,01223, sehingga batas atas 1,05 tidak pernah terlampaui.",
            en: "A damping ratio of 0.65 produces a small peak of about 1.01223, so the upper limit of 1.05 is never crossed.",
          },
          {
            id: "Dengan begitu, batas frekuensi berasal dari penurunan amplitudo hingga 0,95 pada sisi frekuensi yang lebih tinggi.",
            en: "The frequency limit therefore occurs where amplitude falls to 0.95 at higher frequency.",
          },
        ],
        math: "M_{max}=\\frac1{2\\zeta\\sqrt{1-\\zeta^2}}=1.01223<1.05",
      },
      {
        title: {
          id: "Selesaikan batas bawah amplitudo",
          en: "Solve the lower amplitude boundary",
        },
        body: [
          {
            id: "Masukkan ζ = 0,65 dan M = 0,95. Ambil x = r² agar persamaan menjadi kuadrat biasa.",
            en: "Substitute ζ = 0.65 and M = 0.95. Let x = r² to obtain an ordinary quadratic.",
          },
          {
            id: "Pilih akar x positif, karena kuadrat rasio frekuensi tidak boleh negatif.",
            en: "Choose the positive x root, since a squared frequency ratio cannot be negative.",
          },
        ],
        math: "\\begin{aligned}(1-r^2)^2+(1.3r)^2&=\\frac1{0.95^2}\\\\r^4-0.31r^2-0.10803324&=0\\\\x&=0.51839819\\\\r&\\approx0.71999874\\end{aligned}",
      },
      {
        title: {
          id: "Kembalikan ke hertz",
          en: "Convert back to hertz",
        },
        body: [
          {
            id: "Kalikan rasio frekuensi dengan 20 Hz. Batasnya sekitar 14,40 Hz.",
            en: "Multiply the frequency ratio by 20 Hz. The boundary is approximately 14.40 Hz.",
          },
          {
            id: "Tepat pada batas, galat sama dengan 5%. Karena soal meminta kurang dari 5%, frekuensi kerja harus di bawah nilai batas itu.",
            en: "At the boundary, the error equals 5%. Because the question says less than 5%, the operating frequency must be below it.",
          },
        ],
        math: "f_{\\mathrm{batas}}=(0.71999874)(20)=14.3999748\\ \\mathrm{Hz}",
      },
    ],
    answer: {
      id: "Batas amplitudo 5% terjadi sekitar 14,40 Hz. Pilih frekuensi masukan di bawah batas ini untuk memenuhi syarat “kurang dari 5%”.",
      en: "The 5% amplitude-error boundary is approximately 14.40 Hz. Use an input frequency below this boundary to satisfy “less than 5%”.",
    },
    visual: {
      kind: "dynamics",
      caption: {
        id: "Rasio amplitudo mencapai 0,95 pada sekitar 14,40 Hz; daerah ini hanya menguji galat amplitudo.",
        en: "The amplitude ratio reaches 0.95 near 14.40 Hz; this checks amplitude error only.",
      },
      params: {
        mode: "frequency-response",
        frequency: 14.4,
        limit: 0.05,
        damping: 0.65,
        omegaN: 125.66370614359172,
      },
    },
    answerMath:
      "\\boxed{0\\le f<f_{\\mathrm{lim}},\\qquad f_{\\mathrm{lim}}=14.39997\\ \\mathrm{Hz}\\approx14.40\\ \\mathrm{Hz}}",
    assumptions: [
      {
        id: "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        en: "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
      },
      {
        id: "Penyebut pada soal kehilangan faktor s dalam suku redaman. Hasil memakai fungsi alih orde dua yang dinyatakan dalam pembahasan. Tidak ada geometri instrumen yang cukup untuk menyusun diagram gaya khusus alat ini.",
        en: "The printed damping term omits a factor of s. Results use the second-order model explicitly stated here. The source does not provide enough instrument geometry for a device-specific force diagram.",
      },
    ],
  },
  {
    id: "2024-uas-q4",
    year: 2024,
    exam: "uas",
    number: 4,
    title: {
      id: "Orifis dan luas vena kontrakta",
      en: "Orifice flow and vena-contracta area",
    },
    topic: "flow",
    source: {
      url: "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
      file: "2024-uas.pdf",
      pages: [2],
    },
    original:
      "4. [25%] Flow Measurement: Orifice Plate Flowmeter\nAn orifice plate flowmeter is situated in a horizontal pipe with an internal diameter of 90 mm in which water flows. The diameter of the sharp-edged orifice is 30 mm. The discharge coefficient (\\(C_d\\)) for the flowmeter is 0.65, and the coefficient of contraction is 0.67. The static pressure difference across the orifice is 0.3 bar. The water density is 1000 kg/m³.\n(a) [10%] Using Bernoulli’s equation and the continuity equation between positions before and after the orifice plate, derive the equation for the water velocity at the position before the orifice plate.\n(b) [5%] Calculate the cross-sectional areas of the pipe and vena contracta.\n(c) [5%] Calculate the ideal (theoretical) volumetric flow rate of the water in the pipe.\n(d) [5%] Calculate the actual (real) mass flow rate of the water in the pipe.",
    originalLanguage: "en",
    prompt: {
      id: "Air mengalir dalam pipa horizontal dengan diameter dalam 90 mm. Diameter lubang orifis tajam 30 mm, koefisien debit \\(C_d=0{,}65\\), koefisien kontraksi \\(C_c=0{,}67\\), beda tekanan statis 0,3 bar, dan massa jenis 1000 kg/m³. (a) Turunkan kecepatan sebelum pelat dengan Bernoulli dan kontinuitas. (b) Hitung luas pipa serta vena kontrakta. (c) Hitung debit volume ideal. (d) Hitung debit massa nyata. Bedakan luas lubang dari luas aliran tersempit setelah pelat.",
      en: "4. [25%] Flow Measurement: Orifice Plate Flowmeter\nAn orifice plate flowmeter is situated in a horizontal pipe with an internal diameter of 90 mm in which water flows. The diameter of the sharp-edged orifice is 30 mm. The discharge coefficient (\\(C_d\\)) for the flowmeter is 0.65, and the coefficient of contraction is 0.67. The static pressure difference across the orifice is 0.3 bar. The water density is 1000 kg/m³.\n(a) [10%] Using Bernoulli’s equation and the continuity equation between positions before and after the orifice plate, derive the equation for the water velocity at the position before the orifice plate.\n(b) [5%] Calculate the cross-sectional areas of the pipe and vena contracta.\n(c) [5%] Calculate the ideal (theoretical) volumetric flow rate of the water in the pipe.\n(d) [5%] Calculate the actual (real) mass flow rate of the water in the pipe.",
    },
    steps: [
      {
        title: {
          id: "a · Gabungkan dua persamaan aliran",
          en: "a · Combine the two flow equations",
        },
        body: [
          {
            id: "Pilih penampang 1 di pipa sebelum pelat dan penampang 2 pada aliran sempit. Untuk aliran tunak tak termampatkan, debit pada kedua penampang sama.",
            en: "Choose section 1 in the pipe upstream of the plate and section 2 in the narrow stream. Steady incompressible flow has the same volumetric rate at both sections.",
          },
          {
            id: "Karena pipa horizontal, suku ketinggian saling menghapus. Masukkan v2 = A1v1/A2 ke Bernoulli tanpa rugi untuk mendapat kecepatan ideal.",
            en: "Because the pipe is horizontal, elevation terms cancel. Substitute v2 = A1v1/A2 into lossless Bernoulli to obtain ideal upstream velocity.",
          },
        ],
        math: "\\begin{aligned}A_1v_1&=A_2v_2\\\\\\Delta P&=\\frac12\\rho(v_2^2-v_1^2)\\\\v_{1,\\mathrm{ideal}}&=\\sqrt{\\frac{2\\Delta P}{\\rho[(A_1/A_2)^2-1]}}\\end{aligned}",
      },
      {
        title: {
          id: "b · Hitung tiga luas yang berbeda",
          en: "b · Calculate three distinct areas",
        },
        body: [
          {
            id: "Ubah diameter menjadi 0,09 m dan 0,03 m. Koefisien kontraksi membandingkan luas vena kontrakta dengan luas lubang, sehingga luas vena ialah 0,67 kali luas lubang.",
            en: "Convert the diameters to 0.09 m and 0.03 m. The contraction coefficient is the vena-contracta area divided by hole area, so the vena area is 0.67 times the hole area.",
          },
          {
            id: "Koefisien kontraksi berlaku pada luas, bukan langsung pada diameter. Diameter vena, bila diperlukan, adalah akar 0,67 kali diameter lubang.",
            en: "The contraction coefficient acts on area, not directly on diameter. The vena diameter, if needed, is the square root of 0.67 times the hole diameter.",
          },
        ],
        math: "\\begin{aligned}A_1&=\\frac\\pi4(0.09)^2=6.361725\\times10^{-3}\\ \\mathrm{m^2}\\\\A_o&=\\frac\\pi4(0.03)^2=7.068583\\times10^{-4}\\ \\mathrm{m^2}\\\\A_c&=C_cA_o=4.735951\\times10^{-4}\\ \\mathrm{m^2}\\end{aligned}",
      },
      {
        title: {
          id: "c · Nyatakan acuan luas pada rumus materi",
          en: "c · State the area used in the course formula",
        },
        body: [
          {
            id: "Untuk mengikuti urutan soal yang meminta luas vena, ambil A2 = Ac dalam rumus penampang pada materi. Beda tekanan 0,3 bar sama dengan 30000 Pa.",
            en: "To follow the question sequence that asks for vena area, take A2 = Ac in the course section-based formula. The pressure difference of 0.3 bar is 30000 Pa.",
          },
          {
            id: "Nilai ini adalah debit ideal untuk penampang vena yang dipilih. Kita harus menjaga acuan yang sama saat memakai koefisien debit.",
            en: "This is the ideal flow for the selected vena section. Keep the coefficient’s reference area consistent when applying a discharge coefficient.",
          },
        ],
        math: "\\begin{aligned}Q_{\\mathrm{ideal},c}&=A_c\\sqrt{\\frac{2\\Delta P}{\\rho[1-(A_c/A_1)^2]}}\\\\&=3.678659\\times10^{-3}\\ \\mathrm{m^3/s}\\\\v_{1,\\mathrm{ideal},c}&=Q_{\\mathrm{ideal},c}/A_1=0.578249\\ \\mathrm{m/s}\\end{aligned}",
      },
      {
        title: {
          id: "d · Hasil dengan acuan vena yang sama",
          en: "d · Result using the same vena reference",
        },
        body: [
          {
            id: "Jika Cd = 0,65 pada soal dimaksudkan untuk mengoreksi debit ideal berbasis Ac di atas, debit nyata ialah Cd kali debit ideal itu.",
            en: "If the given Cd = 0.65 is intended to correct the Ac-based ideal flow above, actual flow equals Cd times that ideal value.",
          },
          {
            id: "Kalikan debit volume nyata dengan massa jenis untuk mendapat debit massa. Hasil 2,391 kg/s bersyarat pada definisi koefisien ini.",
            en: "Multiply actual volumetric flow by density to obtain mass flow. The result of 2.391 kg/s is conditional on this coefficient convention.",
          },
        ],
        math: "\\dot m=\\rho C_dQ_{\\mathrm{ideal},c}=1000(0.65)(0.003678659)=2.391129\\ \\mathrm{kg/s}",
      },
      {
        title: {
          id: "Catatan penting: konvensi Cd pada alat nyata",
          en: "Important: the meter’s Cd convention",
        },
        body: [
          {
            id: "Koefisien debit orifice meter lazimnya mengacu pada luas lubang Ao dan sudah merangkum kontraksi. Dengan definisi tersebut, kita tidak mengalikan koreksi kontraksi sekali lagi.",
            en: "An orifice meter’s usual discharge coefficient is referenced to the hole area Ao and already includes contraction effects. Under that definition, do not apply a second contraction correction.",
          },
          {
            id: "Jika 0,65 memakai definisi luas lubang, hasilnya Qideal = 0,00550942 m³/s dan debit massa nyata = 3,58112 kg/s. Naskah tidak menjelaskan acuan Cd, sehingga kedua hasil harus dibedakan lewat definisinya, bukan dicampur.",
            en: "If 0.65 uses the hole-area convention, ideal flow is 0.00550942 m³/s and actual mass flow is 3.58112 kg/s. The exam does not define Cd’s reference area, so distinguish the two results by their definitions instead of mixing them.",
          },
        ],
        math: "Q_{\\mathrm{ideal},o}=A_o\\sqrt{\\frac{2\\Delta P}{\\rho[1-(A_o/A_1)^2]}}=0.005509416\\ \\mathrm{m^3/s}",
        note: {
          id: "Pembahasan utama mengikuti rute A2 = luas vena pada soal. Nilai Cd untuk lubang dan untuk vena tidak dapat dianggap sama tanpa definisi atau kalibrasi.",
          en: "The main solution follows the exam’s A2 = vena-area route. A hole-referenced Cd and a vena-referenced Cd are not interchangeable without a definition or calibration.",
        },
      },
    ],
    answer: {
      id: "Luas pipa 0,00636173 m² dan luas vena 0,000473595 m². Dengan Cd yang mengacu pada debit ideal di vena, Qideal ≈ 0,00367866 m³/s dan debit massa ≈ 2,39113 kg/s. Jika Cd mengacu ke lubang, debit massa ≈ 3,58112 kg/s.",
      en: "Pipe area is 0.00636173 m² and vena area is 0.000473595 m². With vena-referenced Cd, ideal flow is about 0.00367866 m³/s and mass flow is about 2.39113 kg/s. A hole-referenced Cd instead gives about 3.58112 kg/s.",
    },
    visual: {
      kind: "orifice",
      caption: {
        id: "Luas lubang dan vena berbeda. Hasil utama memakai Cd dengan acuan vena yang dinyatakan.",
        en: "Hole area differs from vena area. The main result explicitly uses a vena-referenced Cd.",
      },
      params: {
        D: 0.09,
        d: 0.03,
        Cd: 0.65,
        Cc: 0.67,
        rho: 1000,
        convention: "vena",
        dp: 30000,
      },
    },
    answerMath:
      "\\boxed{\\begin{aligned}A_1&=6.36173\\times10^{-3}\\ \\mathrm{m^2}\\\\A_c&=4.73595\\times10^{-4}\\ \\mathrm{m^2}\\\\Q_{\\mathrm{ideal},c}&=3.67866\\times10^{-3}\\ \\mathrm{m^3/s}\\\\\\dot m_c&=2.39113\\ \\mathrm{kg/s}\\quad(C_d:\\ A_2=A_c)\\end{aligned}}",
    referencePages: [9, 10],
    assumptions: [
      {
        id: "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        en: "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
      },
      {
        id: "Naskah tidak menetapkan luas acuan Cd. Hasil utama memakai A2 = Ac pada rumus materi; alternatif dengan definisi standar berbasis luas lubang juga ditampilkan. Ini bukan dua jawaban untuk satu definisi koefisien yang sama.",
        en: "The exam does not define Cd’s reference area. The main result uses A2 = Ac in the course formula; the standard hole-area alternative is also shown. These are not two answers under one identical coefficient definition.",
      },
      {
        id: "Aliran dianggap tunak, tak termampatkan, dengan penampang efektif sesuai definisi beda tekanan.",
        en: "Flow is assumed steady and incompressible, with effective sections consistent with the pressure difference definition.",
      },
    ],
  },
  {
    id: "2024-uas-q5",
    year: 2024,
    exam: "uas",
    number: 5,
    title: {
      id: "Galat rata-rata dan sebaran galat sistem",
      en: "Mean error and system error spread",
    },
    topic: "systems",
    source: {
      url: "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
      file: "2024-uas.pdf",
      pages: [2],
    },
    original:
      "5. [20%] Accuracy of Measurement System\nA pressure measurement system consists of a pressure sensor, deflection bridge, amplifier, and recorder, as shown in the following figure: Input → Pressure Sensor → Deflection Bridge → Amplifier → Recorder → Output.\nThe table gives linear sensitivities K and error bandwidths ±h:\nPressure sensor: \\(10^{-4}\\ \\Omega\\,\\mathrm{Pa}^{-1}\\), ±0.005 Ω.\nDeflection bridge: \\(4\\times10^{-2}\\ \\mathrm{mV}\\,\\Omega^{-1}\\), \\(\\pm5\\times10^{-4}\\ \\mathrm{mV}\\).\nAmplifier: \\(10^3\\ \\mathrm{mV}\\,\\mathrm{mV}^{-1}\\), ±0.5 mV.\nRecorder: \\(250\\ \\mathrm{Pa}\\,\\mathrm{mV}^{-1}\\), ±100 Pa.\n(a) [10%] Given that the recorder is incorrectly adjusted so that its sensitivity is 225 Pa mV⁻¹, calculate the mean error \\(\\bar E\\) for an input pressure of \\(5\\times10^3\\) Pa.\n(b) [10%] Calculate the standard deviation \\(\\sigma_E\\) of the error distribution function.\nSupplied relations: \\(\\bar O_i=K_i\\bar I_i\\), \\(\\sigma_{I_{i+1}}^2=\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+h_i^2/3\\).",
    originalLanguage: "en",
    prompt: {
      id: "Sistem terdiri atas sensor tekanan, jembatan defleksi, penguat, lalu perekam. Sensitivitas dan setengah lebar galat tiap tahap: sensor \\(10^{-4}\\ \\Omega/\\mathrm{Pa}\\) dan 0,005 Ω; jembatan \\(4\\times10^{-2}\\ \\mathrm{mV}/\\Omega\\) dan \\(5\\times10^{-4}\\) mV; penguat \\(10^3\\ \\mathrm{mV}/\\mathrm{mV}\\) dan 0,5 mV; perekam 250 Pa/mV dan 100 Pa. (a) Perekam keliru disetel menjadi 225 Pa/mV. Hitung galat rata-rata untuk masukan 5000 Pa. (b) Hitung simpangan baku galat. Gunakan \\(\\bar O_i=K_i\\bar I_i\\) dan \\(\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+h_i^2/3\\).",
      en: "5. [20%] Accuracy of Measurement System\nA pressure measurement system consists of a pressure sensor, deflection bridge, amplifier, and recorder, as shown in the following figure: Input → Pressure Sensor → Deflection Bridge → Amplifier → Recorder → Output.\nThe table gives linear sensitivities K and error bandwidths ±h:\nPressure sensor: \\(10^{-4}\\ \\Omega\\,\\mathrm{Pa}^{-1}\\), ±0.005 Ω.\nDeflection bridge: \\(4\\times10^{-2}\\ \\mathrm{mV}\\,\\Omega^{-1}\\), \\(\\pm5\\times10^{-4}\\ \\mathrm{mV}\\).\nAmplifier: \\(10^3\\ \\mathrm{mV}\\,\\mathrm{mV}^{-1}\\), ±0.5 mV.\nRecorder: \\(250\\ \\mathrm{Pa}\\,\\mathrm{mV}^{-1}\\), ±100 Pa.\n(a) [10%] Given that the recorder is incorrectly adjusted so that its sensitivity is 225 Pa mV⁻¹, calculate the mean error \\(\\bar E\\) for an input pressure of \\(5\\times10^3\\) Pa.\n(b) [10%] Calculate the standard deviation \\(\\sigma_E\\) of the error distribution function.\nSupplied relations: \\(\\bar O_i=K_i\\bar I_i\\), \\(\\sigma_{I_{i+1}}^2=\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+h_i^2/3\\).",
    },
    steps: [
      {
        title: {
          id: "a · Periksa sensitivitas total",
          en: "a · Check the total sensitivity",
        },
        body: [
          {
            id: "Sensitivitas tahap berurutan saling mengalikan. Dengan perekam nominal 250 Pa/mV, hasil perkaliannya satu, sehingga keluaran ideal sama dengan masukan.",
            en: "Sensitivities multiply along a cascade. With the nominal 250 Pa/mV recorder, their product is one, so ideal output equals input.",
          },
          {
            id: "Perekam yang berubah menjadi 225 Pa/mV membuat sensitivitas sistem 0,9. Ini mengubah rata-rata hasil ukur, bukan hanya lebar sebarannya.",
            en: "Changing the recorder to 225 Pa/mV makes total sensitivity 0.9. This changes the mean measurement, not just its spread.",
          },
        ],
        math: "K_{\\mathrm{total}}=(10^{-4})(4\\times10^{-2})(10^3)(225)=0.9",
      },
      {
        title: {
          id: "a · Hitung pembacaan dan bias",
          en: "a · Calculate the reading and bias",
        },
        body: [
          {
            id: "Masukan 5000 Pa berubah menjadi rata-rata keluaran 4500 Pa. Definisikan galat sebagai keluaran dikurangi masukan.",
            en: "An input of 5000 Pa produces a mean output of 4500 Pa. Define error as output minus input.",
          },
          {
            id: "Hasil negatif berarti alat membaca 500 Pa terlalu rendah, atau 10% di bawah nilai masukan.",
            en: "A negative result means the instrument reads 500 Pa low, or 10% below the input.",
          },
        ],
        math: "\\bar O=0.9(5000)=4500\\ \\mathrm{Pa},\\qquad\\bar E=4500-5000=-500\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "b · Ubah tiap galat ke satuan keluaran",
          en: "b · Refer each error to the final output",
        },
        body: [
          {
            id: "Setiap galat tahap ikut melewati semua penguat setelahnya. Karena satuan galat awal berbeda, ubah semuanya menjadi Pa pada keluaran sebelum menjumlahkan varians.",
            en: "Each stage error passes through every downstream gain. Since the original error units differ, convert all contributions to pascals at the final output before summing variances.",
          },
          {
            id: "Dengan perekam aktual 225 Pa/mV, setengah lebar kontribusinya adalah 45; 112,5; 112,5; dan 100 Pa.",
            en: "With the actual recorder sensitivity of 225 Pa/mV, the output-referred half-widths are 45, 112.5, 112.5, and 100 Pa.",
          },
        ],
        math: "\\begin{aligned}h_{1,o}&=0.005(0.04)(1000)(225)=45\\ \\mathrm{Pa}\\\\h_{2,o}&=0.0005(1000)(225)=112.5\\ \\mathrm{Pa}\\\\h_{3,o}&=0.5(225)=112.5\\ \\mathrm{Pa}\\\\h_{4,o}&=100\\ \\mathrm{Pa}\\end{aligned}",
      },
      {
        title: {
          id: "b · Jumlahkan varians independen",
          en: "b · Add independent variances",
        },
        body: [
          {
            id: "Rumus h²/3 pada soal menyatakan galat seragam pada rentang −h sampai +h. Untuk kontribusi independen, varians saling menjumlah.",
            en: "The h²/3 term supplied in the exam describes a uniform error over −h to +h. Independent error variances add.",
          },
          {
            id: "Masukan dianggap tetap dan diketahui. Karena itu, simpangan baku galat sama dengan simpangan baku keluaran.",
            en: "The input is fixed and known, so error standard deviation equals output standard deviation.",
          },
        ],
        math: "\\sigma_E=\\sqrt{\\frac{45^2+112.5^2+112.5^2+100^2}{3}}=111.5609\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "Bedakan bias dari simpangan baku",
          en: "Distinguish bias from standard deviation",
        },
        body: [
          {
            id: "−500 Pa adalah pergeseran rata-rata, sedangkan 111,56 Pa menunjukkan sebaran acak di sekitar rata-rata tersebut. Jangan menjumlahkan keduanya lalu menyebut hasilnya simpangan baku.",
            en: "−500 Pa is the mean shift, whereas 111.56 Pa describes random spread around that mean. Adding them does not produce a standard deviation.",
          },
          {
            id: "Jika bagian (b) dimaksudkan terpisah pada perekam nominal 250 Pa/mV, hasilnya 120,76 Pa. Jawaban utama memakai setelan aktual 225 Pa/mV yang baru diberikan pada bagian (a).",
            en: "If part (b) is intended independently at the nominal 250 Pa/mV setting, the result is 120.76 Pa. The main answer uses the actual 225 Pa/mV setting introduced in part (a).",
          },
        ],
      },
    ],
    answer: {
      id: "Rata-rata pembacaan 4500 Pa, galat rata-rata −500 Pa, dan simpangan baku galat sekitar 111,56 Pa untuk perekam aktual 225 Pa/mV.",
      en: "The mean reading is 4500 Pa, mean error is −500 Pa, and error standard deviation is about 111.56 Pa with the actual 225 Pa/mV recorder.",
    },
    visual: {
      kind: "system",
      caption: {
        id: "Setiap galat melewati semua sensitivitas setelahnya. Bandingkan setelan perekam aktual dan nominal.",
        en: "Each error passes through all downstream gains. Compare actual and nominal recorder settings.",
      },
      params: {
        mode: "uncertainty",
        input: 5000,
        recorderGain: 225,
        nominalRecorderGain: 250,
        gains: [0.0001, 0.04, 1000, 225],
        halfWidths: [0.005, 0.0005, 0.5, 100],
      },
    },
    answerMath:
      "\\boxed{\\bar O=4500\\ \\mathrm{Pa},\\quad\\bar E=-500\\ \\mathrm{Pa},\\quad\\sigma_E\\approx111.56\\ \\mathrm{Pa}}",
    assumptions: [
      {
        id: "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        en: "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
      },
      {
        id: "Kontribusi galat tiap tahap dianggap independen, seragam, dan berpusat nol; hanya salah setel sensitivitas perekam memberi bias. Masukan 5000 Pa dianggap pasti.",
        en: "Stage errors are taken as independent, uniform, and zero-centred; only the recorder gain misadjustment creates bias. The 5000 Pa input is treated as exact.",
      },
    ],
  },
  {
    id: "2024-uas-q6",
    year: 2024,
    exam: "uas",
    number: 6,
    title: {
      id: "DC LVDT dan dua jenis encoder",
      en: "DC LVDTs and two encoder types",
    },
    topic: "position",
    source: {
      url: "https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view",
      file: "2024-uas.pdf",
      pages: [3],
    },
    original:
      "6. [10%] Position Sensor\n(a) [5%] Explain briefly how a DC LVDT (Direct Current Linear Variable Differential Transformer) works. You may include a sketch of the DC LVDT.\n(b) [5%] What are the differences between an absolute and an incremental encoder? You may include sketches of both encoders.",
    originalLanguage: "en",
    prompt: {
      id: "(a) Jelaskan cara kerja DC LVDT, yaitu Linear Variable Differential Transformer dengan antarmuka DC. Kamu boleh memakai sketsa. (b) Bandingkan encoder absolut dan encoder inkremental. Kamu boleh memakai sketsa keduanya.",
      en: "6. [10%] Position Sensor\n(a) [5%] Explain briefly how a DC LVDT (Direct Current Linear Variable Differential Transformer) works. You may include a sketch of the DC LVDT.\n(b) [5%] What are the differences between an absolute and an incremental encoder? You may include sketches of both encoders.",
    },
    steps: [
      {
        title: {
          id: "a · Inti mengubah kopling magnetik",
          en: "a · The core changes magnetic coupling",
        },
        body: [
          {
            id: "LVDT memiliki satu kumparan primer, dua kumparan sekunder, dan inti magnetik yang dapat bergerak lurus. Primer menerima tegangan AC sehingga kedua sekunder menghasilkan tegangan terinduksi.",
            en: "An LVDT has one primary winding, two secondary windings, and a movable magnetic core. AC excitation of the primary induces voltage in both secondaries.",
          },
          {
            id: "Di posisi tengah, kedua keluaran sekunder sama besar dan selisihnya mendekati nol. Pergeseran inti memperbesar satu keluaran dan memperkecil yang lain.",
            en: "At the centre, the secondary outputs are equal and their difference is near zero. Moving the core increases one output and reduces the other.",
          },
        ],
        math: "e_{\\mathrm{diff}}=e_{s1}-e_{s2}",
        visual: {
          kind: "lvdt",
          caption: {
            id: "Pergeseran inti mengubah selisih keluaran kedua kumparan.",
            en: "Core motion changes the difference between the two secondary outputs.",
          },
          params: {
            position: 0.3,
            mode: "dc",
          },
        },
      },
      {
        title: {
          id: "a · Mengapa disebut DC LVDT",
          en: "a · Why it is called a DC LVDT",
        },
        body: [
          {
            id: "DC LVDT menerima catu DC pada antarmukanya. Rangkaian internal membuat eksitasi AC, membaca selisih sinyal sekunder, lalu menyearahkan atau mendemodulasi dan menyaringnya menjadi keluaran DC.",
            en: "A DC LVDT accepts a DC supply at its interface. Internal electronics generate AC excitation, read the secondary difference, then demodulate or rectify and filter it into a DC output.",
          },
          {
            id: "Jadi, induksi pada transformator tetap memakai AC. Besar keluaran DC menyatakan besar perpindahan; tanda atau arah perubahannya menyatakan sisi perpindahan.",
            en: "Transformer induction still uses AC. Output magnitude represents displacement magnitude, while its sign or direction of change identifies the side of motion.",
          },
        ],
        math: "V_o\\approx Kx",
      },
      {
        title: {
          id: "b · Encoder inkremental menghitung perubahan",
          en: "b · An incremental encoder counts changes",
        },
        body: [
          {
            id: "Cakram berpola atau skala menghasilkan pulsa saat bergerak. Penghitung mengubah jumlah pulsa menjadi perubahan posisi. Dua kanal A dan B dengan beda fase seperempat siklus memberi arah gerak.",
            en: "A patterned disc or scale generates pulses during motion. A counter converts pulse count into position change. Channels A and B, separated by a quarter cycle, give direction.",
          },
          {
            id: "Encoder ini perlu posisi awal atau proses homing untuk mengetahui posisi terhadap acuan mesin. Setelah penghitung kehilangan daya atau pulsa terlewat, posisi absolut dapat hilang. Kanal Z dapat memberi tanda satu putaran, tetapi tidak mengganti seluruh kode absolut.",
            en: "It needs an initial position or homing to locate the mechanism relative to its reference. Lost power or missed pulses can lose absolute position. An index Z pulse can mark one revolution but does not replace a full absolute code.",
          },
        ],
        visual: {
          kind: "encoder",
          caption: {
            id: "Kanal A dan B menunjukkan perubahan serta arah; indeks Z memberi tanda acuan.",
            en: "A and B show motion and direction; index Z provides a reference mark.",
          },
          params: {
            mode: "incremental",
            bits: 4,
            angle: 45,
          },
        },
      },
      {
        title: {
          id: "b · Encoder absolut membaca kode posisi",
          en: "b · An absolute encoder reads a position code",
        },
        body: [
          {
            id: "Encoder absolut memberikan kode unik untuk tiap posisi dalam rentangnya. Sistem dapat membaca posisi satu putaran tanpa lebih dulu menghitung gerak dari nol.",
            en: "An absolute encoder provides a unique code for each position in its range. The system can read position within one revolution without first counting motion from zero.",
          },
          {
            id: "Resolusi n bit membagi satu putaran menjadi 2 pangkat n posisi. Gray code sering dipakai agar satu bit saja berubah pada batas posisi bersebelahan. Jumlah putaran penuh memerlukan encoder multiturn, bukan sekadar encoder absolut single-turn.",
            en: "An n-bit encoder divides one revolution into 2 to the power n positions. Gray code often limits neighbouring-code changes to one bit. Tracking completed turns requires a multiturn encoder, not merely a single-turn absolute encoder.",
          },
        ],
        math: "\\Delta\\theta=\\frac{360^\\circ}{2^n}",
        visual: {
          kind: "encoder",
          caption: {
            id: "Setiap sektor memiliki kode posisi sendiri.",
            en: "Each sector has its own position code.",
          },
          params: {
            mode: "absolute",
            bits: 4,
            angle: 45,
          },
        },
      },
    ],
    answer: {
      id: "DC LVDT mengolah selisih sinyal AC internal menjadi keluaran DC posisi. Encoder inkremental menghitung perubahan posisi; encoder absolut membaca kode posisi dalam rentangnya.",
      en: "A DC LVDT converts an internal AC difference signal into a DC position output. Incremental encoders count position changes; absolute encoders read a position code within their range.",
    },
    visual: {
      kind: "lvdt",
      caption: {
        id: "DC pada antarmuka tidak menghilangkan eksitasi AC di kumparan.",
        en: "A DC interface does not remove the AC excitation inside the coils.",
      },
      params: {
        position: 0.3,
        mode: "dc",
      },
    },
    referencePages: [15, 16, 17],
    assumptions: [
      {
        id: "Berkas ini berada dalam arsip 2024; kepala soal mencantumkan tanggal ujian 15 Januari 2025.",
        en: "This file belongs to the 2024 archive; its header dates the exam to 15 January 2025.",
      },
    ],
  },
];

export const practice2024: PracticeQuestion[] = [
  {
    id: "practice-2024-01",
    topic: "temperature",
    difficulty: "foundation",
    prompt: {
      id: "Termokopel membaca 12 mV terhadap sambungan referensi. Tegangan tabel sambungan referensi terhadap 0°C adalah 1 mV. Berapa tegangan yang harus dicari pada tabel bersambungan referensi 0°C?",
      en: "A thermocouple reads 12 mV relative to its reference junction. The reference-junction table voltage relative to 0°C is 1 mV. Which voltage should be looked up in a 0°C-referenced table?",
    },
    options: [
      {
        id: "11 mV",
        en: "11 mV",
      },
      {
        id: "12 mV",
        en: "12 mV",
      },
      {
        id: "13 mV",
        en: "13 mV",
      },
      {
        id: "1 mV",
        en: "1 mV",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Tegangan ukur adalah Eukur,0 dikurangi Eref,0. Untuk mengembalikan acuan ke 0°C, tambahkan kontribusi referensi: 12 + 1 = 13 mV. Pengurangan memberi kompensasi dengan arah terbalik.",
      en: "The reading equals Ehot,0 minus Eref,0. Restore the 0°C reference by adding the reference contribution: 12 + 1 = 13 mV. Subtraction would compensate in the wrong direction.",
    },
    sourceQuestionId: "2024-uts2-q1",
    math: "E(T,0)=E(T,T_{\\mathrm{ref}})+E(T_{\\mathrm{ref}},0)=13\\ \\mathrm{mV}",
  },
  {
    id: "practice-2024-02",
    topic: "temperature",
    difficulty: "foundation",
    prompt: {
      id: "Dalam rentang kerja normal, apa yang terjadi pada RTD logam dan termistor NTC saat suhu naik?",
      en: "Within their normal working ranges, what happens to a metal RTD and an NTC thermistor as temperature rises?",
    },
    options: [
      {
        id: "Hambatan keduanya naik.",
        en: "Both resistances rise.",
      },
      {
        id: "Hambatan RTD naik; hambatan NTC turun.",
        en: "RTD resistance rises; NTC resistance falls.",
      },
      {
        id: "Hambatan RTD turun; hambatan NTC naik.",
        en: "RTD resistance falls; NTC resistance rises.",
      },
      {
        id: "Keduanya langsung menghasilkan tegangan tanpa arus ukur.",
        en: "Both directly generate voltage without a measuring current.",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "RTD logam umumnya memiliki koefisien suhu positif. NTC berarti koefisien suhu negatif, sehingga hambatannya turun saat suhu naik. RTD dan NTC tetap memerlukan rangkaian ukur; keduanya berbeda dari termokopel.",
      en: "Metal RTDs normally have a positive temperature coefficient. NTC means negative temperature coefficient, so resistance falls as temperature rises. Both require a measurement circuit and differ from a thermocouple.",
    },
    sourceQuestionId: "2024-uts2-q1",
  },
  {
    id: "practice-2024-03",
    topic: "flow",
    difficulty: "applied",
    prompt: {
      id: "Manometer raksa membandingkan dua titik dalam air pada ketinggian sama. Jika \\(\\rho_m=13600\\), \\(\\rho_w=1000\\ \\mathrm{kg/m^3}\\), \\(g=10\\ \\mathrm{m/s^2}\\), dan selisih tinggi 10 mm, berapa besar beda tekanannya?",
      en: "A mercury manometer compares two points in water at equal elevation. With \\(\\rho_m=13600\\), \\(\\rho_w=1000\\ \\mathrm{kg/m^3}\\), \\(g=10\\ \\mathrm{m/s^2}\\), and a 10 mm height difference, what is the pressure difference?",
    },
    options: [
      {
        id: "126 Pa",
        en: "126 Pa",
      },
      {
        id: "1360 Pa",
        en: "1360 Pa",
      },
      {
        id: "100 Pa",
        en: "100 Pa",
      },
      {
        id: "1260 Pa",
        en: "1260 Pa",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Kedua kaki berisi air di atas raksa. Gunakan selisih massa jenis dan ubah 10 mm menjadi 0,010 m: (13600 − 1000) × 10 × 0,010 = 1260 Pa. Nilai 1360 Pa mengabaikan kolom air.",
      en: "Both legs contain water above the mercury. Use the density difference and convert 10 mm to 0.010 m: (13600 − 1000) × 10 × 0.010 = 1260 Pa. A result of 1360 Pa ignores the water columns.",
    },
    sourceQuestionId: "2024-uts2-q3",
    math: "\\Delta P=(\\rho_m-\\rho_w)gh=1260\\ \\mathrm{Pa}",
  },
  {
    id: "practice-2024-04",
    topic: "flow",
    difficulty: "reasoning",
    prompt: {
      id: "Lubang orifis berdiameter 20 mm memiliki \\(C_c=0{,}64\\). Jika penampang lubang dan vena sama-sama bulat, berapa diameter vena kontrakta?",
      en: "An orifice hole has a 20 mm diameter and \\(C_c=0.64\\). If the hole and vena sections are circular, what is the vena-contracta diameter?",
    },
    options: [
      {
        id: "12,8 mm",
        en: "12.8 mm",
      },
      {
        id: "16 mm",
        en: "16 mm",
      },
      {
        id: "20 mm",
        en: "20 mm",
      },
      {
        id: "25 mm",
        en: "25 mm",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Cc membandingkan luas, bukan diameter. Karena luas lingkaran sebanding kuadrat diameter, dvena = √Cc × dlubang = 0,8 × 20 = 16 mm.",
      en: "Cc is an area ratio, not a diameter ratio. Since circular area is proportional to diameter squared, dvena = √Cc × dhole = 0.8 × 20 = 16 mm.",
    },
    sourceQuestionId: "2024-uas-q4",
    math: "d_c=\\sqrt{C_c}\\,d_o=\\sqrt{0.64}(20)=16\\ \\mathrm{mm}",
  },
  {
    id: "practice-2024-05",
    topic: "calibration",
    difficulty: "applied",
    prompt: {
      id: "Sensor memiliki keluaran 4 mA pada masukan 0 dan 24 mA pada masukan 100. Pada masukan 50, keluarannya 15 mA. Berapa nonlinearitas di titik itu sebagai persen rentang keluaran penuh, memakai garis ujung?",
      en: "A sensor outputs 4 mA at input 0 and 24 mA at input 100. At input 50, it outputs 15 mA. What is the nonlinearity at that point as a percentage of full output span, using the endpoint line?",
    },
    options: [
      {
        id: "1%",
        en: "1%",
      },
      {
        id: "4,17%",
        en: "4.17%",
      },
      {
        id: "5%",
        en: "5%",
      },
      {
        id: "6,67%",
        en: "6.67%",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Garis ideal berada pada 14 mA saat masukan 50. Selisihnya 1 mA. Rentang keluaran adalah 24 − 4 = 20 mA, jadi nonlinearitasnya 1/20 × 100% = 5%.",
      en: "The ideal line gives 14 mA at input 50, so the departure is 1 mA. Output span is 24 − 4 = 20 mA, giving 1/20 × 100% = 5%.",
    },
    sourceQuestionId: "2024-uas-q1",
    math: "N=\\frac{|15-14|}{24-4}(100\\%)=5\\%",
  },
  {
    id: "practice-2024-06",
    topic: "calibration",
    difficulty: "foundation",
    prompt: {
      id: "Model termokopel memakai \\(E=a_1T+a_2T^2\\), dengan E dalam μV dan T dalam °C. Apa satuan \\(a_2\\)?",
      en: "A thermocouple model is \\(E=a_1T+a_2T^2\\), with E in μV and T in °C. What are the units of \\(a_2\\)?",
    },
    options: [
      {
        id: "μV/°C²",
        en: "μV/°C²",
      },
      {
        id: "μV/°C",
        en: "μV/°C",
      },
      {
        id: "°C²/μV",
        en: "°C²/μV",
      },
      {
        id: "Tanpa satuan",
        en: "Dimensionless",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Setiap suku pada ruas kanan harus memiliki satuan tegangan. Karena T² bersatuan °C², a2 harus bersatuan μV/°C² agar hasil kalinya μV.",
      en: "Every term on the right must have voltage units. Since T² has units °C², a2 must be in μV/°C² so the product is in μV.",
    },
    sourceQuestionId: "2024-uts2-q4",
  },
  {
    id: "practice-2024-07",
    topic: "temperature",
    difficulty: "applied",
    prompt: {
      id: "Jembatan mendapat catu 4 V antara simpul kiri (+) dan kanan (0 V). Dua resistor jalur atas sama besar. Jalur bawah memiliki resistor 100 Ω di kiri dan RTD 110 Ω di kanan. Berapa keluaran simpul bawah dikurangi simpul atas?",
      en: "A bridge has a 4 V supply between its left (+) and right (0 V) nodes. The two upper-path resistors are equal. The lower path has 100 Ω on the left and a 110 Ω RTD on the right. What is lower-node voltage minus upper-node voltage?",
    },
    options: [
      {
        id: "0 V",
        en: "0 V",
      },
      {
        id: "−95,24 mV",
        en: "−95.24 mV",
      },
      {
        id: "+200 mV",
        en: "+200 mV",
      },
      {
        id: "+95,24 mV",
        en: "+95.24 mV",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Simpul atas berada pada 2 V. Simpul bawah berada pada 4 × 110/(100 + 110) = 2,095238 V. Selisih bawah dikurangi atas adalah +0,095238 V.",
      en: "The upper node is at 2 V. The lower node is at 4 × 110/(100 + 110) = 2.095238 V. Lower minus upper is +0.095238 V.",
    },
    sourceQuestionId: "2024-uas-q2",
    math: "V_o=4\\left(\\frac{110}{210}-\\frac12\\right)=0.095238\\ \\mathrm V",
  },
  {
    id: "practice-2024-08",
    topic: "dynamics",
    difficulty: "applied",
    prompt: {
      id: "Instrumen orde dua memiliki \\(\\zeta=1/\\sqrt2\\) dan \\(f_n=20\\) Hz. Pada frekuensi masukan 10 Hz, rasio amplitudonya paling dekat dengan nilai mana?",
      en: "A second-order instrument has \\(\\zeta=1/\\sqrt2\\) and \\(f_n=20\\) Hz. At a 10 Hz input, which value is closest to its amplitude ratio?",
    },
    options: [
      {
        id: "0,50",
        en: "0.50",
      },
      {
        id: "0,970",
        en: "0.970",
      },
      {
        id: "1,333",
        en: "1.333",
      },
      {
        id: "2,00",
        en: "2.00",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Rasio frekuensi r = 10/20 = 0,5. Substitusi pada M = 1/√[(1 − r²)² + (2ζr)²] memberi 1/√1,0625 = 0,97014. Amplitudonya sekitar 2,99% di bawah nilai ideal.",
      en: "The frequency ratio is r = 10/20 = 0.5. Substituting into M = 1/√[(1 − r²)² + (2ζr)²] gives 1/√1.0625 = 0.97014. Amplitude is about 2.99% below ideal.",
    },
    sourceQuestionId: "2024-uas-q3",
    math: "M=\\frac1{\\sqrt{(1-0.5^2)^2+2(0.5^2)}}=0.97014",
  },
  {
    id: "practice-2024-09",
    topic: "systems",
    difficulty: "reasoning",
    prompt: {
      id: "Dua sumber galat independen sudah dinyatakan pada keluaran yang sama. Keduanya seragam dan berpusat nol, dengan setengah lebar 3 Pa dan 4 Pa. Berapa simpangan baku gabungannya?",
      en: "Two independent, zero-centred uniform errors are already referred to the same output. Their half-widths are 3 Pa and 4 Pa. What is the combined standard deviation?",
    },
    options: [
      {
        id: "7 Pa",
        en: "7 Pa",
      },
      {
        id: "5 Pa",
        en: "5 Pa",
      },
      {
        id: "2,89 Pa",
        en: "2.89 Pa",
      },
      {
        id: "1 Pa",
        en: "1 Pa",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Galat seragam dengan setengah lebar h memiliki varians h²/3. Jumlahkan varians kedua sumber: (9 + 16)/3. Akarnya sekitar 2,89 Pa. Menjumlahkan 3 + 4 memberi batas terburuk, bukan simpangan baku.",
      en: "A uniform error with half-width h has variance h²/3. Add the two variances: (9 + 16)/3. Taking the square root gives about 2.89 Pa. Adding 3 + 4 gives a worst-case bound, not standard deviation.",
    },
    sourceQuestionId: "2024-uas-q5",
    math: "\\sigma=\\sqrt{\\frac{3^2+4^2}{3}}=2.887\\ \\mathrm{Pa}",
  },
  {
    id: "practice-2024-10",
    topic: "position",
    difficulty: "reasoning",
    prompt: {
      id: "Sebuah poros harus menunjukkan sudut dalam satu putaran segera setelah daya kembali, tanpa bergerak mencari titik nol. Pilihan mana yang langsung memenuhi kebutuhan itu?",
      en: "A shaft must report its angle within one revolution immediately after power returns, without moving to find zero. Which option directly meets that requirement?",
    },
    options: [
      {
        id: "Encoder absolut single-turn",
        en: "A single-turn absolute encoder",
      },
      {
        id: "Encoder inkremental dengan satu kanal saja",
        en: "A single-channel incremental encoder",
      },
      {
        id: "Encoder inkremental yang penghitungnya kembali nol saat daya mati",
        en: "An incremental encoder whose counter resets at power loss",
      },
      {
        id: "Detektor induktif ON/OFF tanpa pola sudut",
        en: "An ON/OFF inductive detector without an angular pattern",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Encoder absolut memberi kode unik untuk sudut dalam rentangnya. Encoder inkremental yang kehilangan hitungan memerlukan acuan ulang. Permintaan hanya menyebut posisi satu putaran, sehingga kemampuan multiturn belum diperlukan.",
      en: "An absolute encoder provides a unique code for angle within its range. An incremental encoder that loses its count needs a reference again. The requirement covers one revolution, so multiturn capability is not yet needed.",
    },
    sourceQuestionId: "2024-uas-q6",
  },
];

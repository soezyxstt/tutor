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
      id: "(a) Bandingkan sifat dan rentang ukur RTD dengan termistor. (b) Pilih sensor untuk suhu sekitar 1000°C dari RTD, termistor, atau termokopel. Jelaskan alasan pilihan Anda. (c) Termokopel tipe J memiliki suhu ukur \\(T_1=450^\\circ\\mathrm C\\) dan suhu referensi \\(T_2\\). Voltmeter membaca 15 mV. Cari \\(T_2\\) memakai tabel tipe J dengan sambungan referensi 0°C pada halaman 4.",
      en: "1. Temperature Sensors: RTD, Thermistor, Thermocouple\n\n(a) [5%] What are the differences between an RTD (Resistance Temperature Detector) and a thermistor, in terms of their characteristics and measurement ranges?\n\n(b) [5%] If you need to measure the temperature of approximately 1000°C, which sensor would you choose among an RTD, a thermistor, and a thermocouple? Explain why you choose this sensor.\n\n(c) [10%] A type J thermocouple is used to measure temperature \\(T_1\\), with the reference temperature \\(T_2\\), as shown in the figure below. The voltage output is measured using a voltmeter. If the measured temperature \\(T_1\\) is 450°C and the voltage recorded by the voltmeter is 15 mV, determine the reference temperature \\(T_2\\). Use the table provided on the last page to answer this question.",
    },
    steps: [
      {
        title: {
          id: "a · Apa yang berubah ketika suhu naik?",
          en: "a · What changes as temperature rises?",
        },
        body: [
          {
            id: "**RTD** (sensor suhu dari hambatan logam) dan **termistor** (sensor suhu dari hambatan bahan semikonduktor) mengubah suhu menjadi perubahan hambatan. Rangkaian mengalirkan arus ukur, lalu membaca tegangan atau hambatannya. Kita bandingkan hubungan suhu dan hambatan untuk memilih sensor yang sesuai.",
            en: "An **RTD** measures temperature through metal resistance. A **thermistor** uses the temperature-dependent resistance of semiconductor material. A circuit supplies a measuring current and reads voltage or resistance. We compare their temperature and resistance relationships to choose a suitable sensor.",
          },
          {
            id: "RTD memakai logam, misalnya platina. Dalam rentang kerjanya, kenaikan suhu biasanya menaikkan hambatan secara hampir linear. “Hampir linear” berarti kemiringan kurvanya cukup tetap, bukan tepat sama pada semua suhu.",
            en: "An RTD uses a metal such as platinum. Within its operating range, resistance usually rises approximately linearly with temperature. “Approximately linear” means a fairly steady slope, not an identical slope at every temperature.",
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
          id: "a · Kenali kepekaan dan batas termistor",
          en: "a · Identify thermistor sensitivity and limits",
        },
        body: [
          {
            id: "Termistor pada materi berjenis **NTC** (hambatan turun saat suhu naik). Perubahan hambatannya dapat lebih besar per derajat daripada RTD, sehingga peka untuk perubahan suhu kecil. Namun, kemiringannya berubah terhadap suhu; satu faktor konversi linear belum tentu cukup.",
            en: "The thermistor in the notes is an **NTC** type: its resistance falls as temperature rises. Its resistance change per degree can exceed an RTD’s, making small temperature changes easier to detect. Its slope varies with temperature, so one linear conversion factor may be insufficient.",
          },
          {
            id: "Keduanya memerlukan arus ukur. Arus itu menghasilkan panas pada sensor. Jika panas ukur terlalu besar, suhu sensor naik dari suhu benda dan menambah galat; kita perlu membatasi arus.",
            en: "Both need a measuring current. That current heats the sensor. Excessive measurement heating raises the sensor above the object’s temperature and adds error, so the current must be limited.",
          },
        ],
      },
      {
        title: {
          id: "a dan b · Gunakan rentang kerja untuk memilih sensor",
          en: "a and b · Use the operating range to select a sensor",
        },
        body: [
          {
            id: "Materi memberi contoh RTD sekitar −196 sampai 482°C dan termistor sekitar −45 sampai 150°C. Angka ini berlaku untuk contoh pada materi; lembar data produk menentukan batas sensor yang benar-benar dipakai.",
            en: "The notes give example ranges of about −196 to 482°C for an RTD and −45 to 150°C for a thermistor. These apply to the examples in the notes; the actual product’s data sheet determines its limits.",
          },
          {
            id: "Suhu sekitar 1000°C berada di atas kedua rentang contoh itu. Pilih jenis dan selubung termokopel yang sesuai. Contohnya, rakitan tipe K atau N dengan batas kerja di atas 1000°C. Tipe J pada bagian (c) adalah kasus lain. Penggunaan tipe J di sana belum menjamin bahwa semua termokopel cocok untuk 1000°C.",
            en: "About 1000°C exceeds both example ranges. Choose a thermocouple with a suitable type and sheath, such as a type K or N assembly rated above 1000°C. The type J in part (c) is a separate case, not evidence that all thermocouples suit 1000°C.",
          },
          {
            id: "**Termokopel** (sensor dengan dua logam berbeda) menghasilkan tegangan yang terkait dengan suhu kedua sambungannya. Pilihan jenis dan selubung menentukan apakah sensor tahan pada suhu yang akan diukur.",
            en: "A **thermocouple** joins two different metals and produces a voltage related to its two junction temperatures. Its type and sheath determine whether it can withstand the temperature you need to measure.",
          },
        ],
      },
      {
        title: {
          id: "c · Bedakan suhu ukur dan suhu referensi",
          en: "c · Distinguish measuring and reference temperatures",
        },
        body: [
          {
            id: "Di sini \\(T_1=450^\\circ\\mathrm C\\) adalah suhu sambungan ukur, sedangkan \\(T_2\\) adalah suhu sambungan referensi yang dicari. Tabel halaman 4 memberi \\(E(T,0)\\): tegangan untuk suhu \\(T\\) ketika referensinya 0°C.",
            en: "Here \\(T_1=450^\\circ\\mathrm C\\) is the measuring-junction temperature, while \\(T_2\\) is the unknown reference-junction temperature. The table on page 4 gives \\(E(T,0)\\): voltage at temperature \\(T\\) with a 0°C reference.",
          },
          {
            id: "Voltmeter membaca selisih kontribusi kedua sambungan. Referensinya belum tentu 0°C. Mencari 15 mV langsung di tabel akan menjawab kasus dengan referensi 0°C.",
            en: "The voltmeter reads the difference between the two junction contributions. Looking up 15 mV directly would answer a different case, one whose reference is fixed at 0°C.",
          },
        ],
        math: "E(T_1,T_2)=E(T_1,0)-E(T_2,0)",
      },
      {
        title: {
          id: "c · Isolasi tegangan tabel yang belum diketahui",
          en: "c · Isolate the unknown table voltage",
        },
        body: [
          {
            id: "Kita mencari \\(E(T_2,0)\\), bukan \\(E(T_1,0)\\). Tambahkan \\(E(T_2,0)\\) ke kedua ruas, lalu kurangi tegangan terukur dari kedua ruas. Langkah ini menjelaskan mengapa 15 mV dikurangkan.",
            en: "We need \\(E(T_2,0)\\), not \\(E(T_1,0)\\). Add \\(E(T_2,0)\\) to both sides, then subtract the measured voltage from both sides. The rearrangement explains why we subtract the 15 mV reading.",
          },
        ],
        math: "\\begin{aligned}15&=E(450,0)-E(T_2,0)\\\\15+E(T_2,0)&=E(450,0)\\\\E(T_2,0)&=E(450,0)-15\\end{aligned}",
      },
      {
        title: {
          id: "c · Ambil angka dari tabel tipe J",
          en: "c · Read the type J table",
        },
        body: [
          {
            id: "Pada baris 450°C dan kolom 0, tabel memberi 24,610 mV. Maka tegangan tabel yang mewakili sambungan referensi adalah 9,610 mV. Semua angka pada operasi ini memakai mV.",
            en: "At the 450°C row and column 0, the table gives 24.610 mV. The equivalent table voltage for the reference junction is therefore 9.610 mV. Every term in this subtraction uses mV.",
          },
          {
            id: "Cari dua nilai yang mengapitnya: 9,559 mV pada 178°C dan 9,614 mV pada 179°C. Suhu yang dicari harus berada di antara kedua suhu tersebut.",
            en: "Find the neighbouring entries: 9.559 mV at 178°C and 9.614 mV at 179°C. The unknown temperature must lie between these temperatures.",
          },
        ],
        math: "E(T_2,0)=24.610-15.000=9.610\\ \\mathrm{mV}",
      },
      {
        title: {
          id: "c · Interpolasi dalam selang satu derajat",
          en: "c · Interpolate within the one-degree interval",
        },
        body: [
          {
            id: "Dari batas bawah, kenaikan tegangannya \\(9{,}610-9{,}559=0{,}051\\) mV. Lebar selang tabel adalah \\(9{,}614-9{,}559=0{,}055\\) mV. Jadi kita bergerak sekitar 0,927 bagian dari selang 178 sampai 179°C.",
            en: "Above the lower entry, the voltage rise is \\(9.610-9.559=0.051\\) mV. The full table interval is \\(9.614-9.559=0.055\\) mV. We therefore move about 0.927 of the way from 178 to 179°C.",
          },
          {
            id: "Interpolasi ini menganggap kurva hampir lurus hanya pada selang kecil tersebut. Kita tidak menganggap seluruh rentang termokopel linear.",
            en: "This interpolation treats only this small interval as nearly straight. It does not assume that the thermocouple is linear over its whole range.",
          },
        ],
        math: "T_2=178+\\frac{0.051}{0.055}(179-178)=178.9273^\\circ\\mathrm C\\approx178.93^\\circ\\mathrm C",
      },
      {
        title: {
          id: "Periksa kembali dengan tegangan ukur",
          en: "Check against the measured voltage",
        },
        body: [
          {
            id: "Hasilnya lebih tinggi daripada 0°C tetapi masih lebih rendah daripada 450°C. Referensi yang lebih hangat mengurangi tegangan terukur; ini sesuai dengan 15 mV yang lebih kecil daripada 24,610 mV.",
            en: "The result is above 0°C but below 450°C. A warmer reference reduces measured voltage, consistent with 15 mV being below 24.610 mV.",
          },
          {
            id: "Masukkan kembali tegangan referensi: selisihnya tepat 15 mV. Kita dapat melaporkan sekitar 179°C sesuai ketelitian tabel.",
            en: "Substitute the reference voltage back: the difference is exactly 15 mV. Report about 179°C at the table’s precision.",
          },
        ],
        math: "24.610-9.610=15.000\\ \\mathrm{mV}",
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
      en: "2. Conceptual Questions: Flowmeter, Resolver, Inductive and Optical Proximity\n\n(a) [5%] In a differential pressure flowmeter, why is the discharge coefficient (\\(C_d\\)) needed to determine the fluid flow?\n\n(b) [5%] There are three types of differential pressure flowmeters: orifice, nozzle, and venturi. Why is the orifice meter the most widely used in industry? Does the orifice have the highest discharge coefficient (\\(C_d\\))?\n\n(c) [5%] Please explain briefly the working principle of the following resolver.\n\n(d) [5%] Explain briefly how an inductive proximity works.\n(e) [5%] Explain briefly how an optical proximity works.",
    },
    steps: [
      {
        title: {
          id: "a · Mulai dari hubungan tekanan dan aliran",
          en: "a · Start with the pressure and flow relation",
        },
        body: [
          {
            id: "**Flowmeter beda tekanan** (pengukur debit dari selisih tekanan) menyempitkan jalur aliran. Untuk debit yang sama, fluida bergerak lebih cepat pada penampang sempit. Kita memakai hubungan Bernoulli untuk mengaitkan kenaikan kecepatan dengan penurunan tekanan statis.",
            en: "A **differential-pressure meter** narrows the flow path and infers flow rate from the resulting pressure difference. At the same flow rate, fluid moves faster through the smaller section. We use Bernoulli to relate the speed increase to a static-pressure decrease.",
          },
          {
            id: "Kontinuitas memastikan debit di kedua penampang sama. Bernoulli tanpa rugi kemudian memberi debit ideal dari beda tekanan, massa jenis, dan ukuran penampang. Kata “ideal” menandai asumsi bahwa rugi aliran belum masuk.",
            en: "Continuity keeps the flow rate equal at both sections. Lossless Bernoulli then gives ideal flow from pressure difference, density, and section sizes. “Ideal” means that flow losses have not yet been included.",
          },
        ],
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
          id: "a · Mengapa hasil ideal perlu Cd?",
          en: "a · Why does the ideal result need Cd?",
        },
        body: [
          {
            id: "Aliran nyata memiliki rugi, kontraksi jet, dan profil kecepatan yang tidak seragam. **Koefisien debit** (rasio debit nyata terhadap debit ideal), \\(C_d\\), mengoreksi hasil ideal untuk definisi alat yang sama.",
            en: "Real flow has losses, jet contraction, and a nonuniform velocity profile. The **discharge coefficient**, \\(C_d\\), is the actual-to-ideal flow ratio. It corrects ideal flow under the same meter definition.",
          },
          {
            id: "Kedua besaran sama-sama debit, sehingga satuan pada perbandingan saling menghapus. Nilai \\(C_d\\) tidak bersatuan. Gunakan nilai yang cocok dengan geometri, lokasi lubang tekanan, bilangan Reynolds, dan luas acuan. Koefisien tersebut bukan faktor keamanan.",
            en: "Both quantities are flow rates, so their units cancel. \\(C_d\\) is dimensionless. Use a value matched to geometry, pressure taps, Reynolds number, and reference area; it is not a safety factor.",
          },
        ],
        math: "C_d=\\frac{Q_{\\mathrm{actual}}}{Q_{\\mathrm{ideal}}}\\quad\\Longrightarrow\\quad Q_{\\mathrm{actual}}=C_dQ_{\\mathrm{ideal}}",
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
          id: "b · Pisahkan alasan pemakaian dari nilai koefisien",
          en: "b · Separate adoption reasons from coefficient size",
        },
        body: [
          {
            id: "Orifis memakai pelat berlubang yang sederhana. Bentuk ini membuat alat ringkas, murah, dan mudah diganti. Keuntungan pemasangan dan perawatan dapat menjelaskan pemakaian luasnya.",
            en: "An orifice uses a simple plate with a hole. The simple plate makes the meter compact, inexpensive, and easy to replace. Installation and maintenance advantages can explain its wide use.",
          },
          {
            id: "Nilai \\(C_d\\) yang mendekati satu berarti hasil nyata dekat dengan perhitungan ideal pada acuan yang dipakai. Angka itu sendiri tidak menentukan harga, ukuran, keandalan, atau kemudahan perawatan.",
            en: "A \\(C_d\\) near one means that actual flow is close to the ideal calculation under the chosen convention. That number alone does not determine price, size, reliability, or maintenance effort.",
          },
        ],
      },
      {
        title: {
          id: "b · Bandingkan orifis, nozzle, dan venturi",
          en: "b · Compare the orifice, nozzle, and venturi",
        },
        body: [
          {
            id: "Materi memberi rentang \\(C_d\\) orifis 0,58 sampai 0,65. Rentang nozzle adalah 0,93 sampai 0,98; rentang venturi 0,95 sampai 0,995. Jadi orifis tidak memiliki koefisien paling tinggi.",
            en: "The notes give an orifice \\(C_d\\) range of 0.58 to 0.65. The nozzle range is 0.93 to 0.98; the venturi range is 0.95 to 0.995. The orifice therefore does not have the highest coefficient.",
          },
          {
            id: "Orifis juga umumnya menimbulkan kehilangan tekanan permanen lebih besar. Venturi memakai perubahan penampang yang bertahap sehingga pemulihan tekanannya lebih baik. Kita memilih alat dengan menimbang biaya dan rugi tekanan, bukan satu angka saja.",
            en: "An orifice also generally causes more permanent pressure loss. A venturi changes area gradually and recovers pressure better. Selection weighs cost against pressure loss rather than relying on one number.",
          },
        ],
      },
      {
        title: {
          id: "c · Ikuti energi listrik pada resolver",
          en: "c · Follow the resolver excitation",
        },
        body: [
          {
            id: "**Resolver** (sensor sudut dengan rotor dan kumparan stator) mengukur sudut poros melalui perubahan kopling magnetik. Eksitasi AC menghasilkan medan yang berubah terhadap waktu. Medan rotor menginduksi tegangan pada dua kumparan stator yang sumbunya berselisih 90°.",
            en: "A **resolver** has a rotor and stator windings. It measures shaft angle through changing magnetic coupling. AC excitation produces a time-varying field. The rotor field induces voltages in two stator windings whose axes are 90° apart.",
          },
          {
            id: "Pada gambar jenis brushless, transformator putar menyalurkan eksitasi ke rotor tanpa kontak geser. Putaran poros mengubah seberapa kuat medan rotor terhubung ke tiap kumparan stator.",
            en: "In the brushless arrangement shown, a rotary transformer transfers excitation to the rotor without sliding contacts. Shaft rotation changes how strongly the rotor field couples to each stator winding.",
          },
          {
            id: "Kopling magnetik menyatakan seberapa kuat medan dari satu kumparan menimbulkan tegangan pada kumparan lain. Putaran mengubah kopling tersebut, sehingga tegangan membawa informasi sudut.",
            en: "Magnetic coupling describes how strongly one winding’s field induces voltage in another winding. Rotation changes that coupling, so the voltages carry angle information.",
          },
        ],
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
          id: "c · Mengapa perlu dua keluaran?",
          en: "c · Why are two outputs needed?",
        },
        body: [
          {
            id: "Setelah **demodulasi** (pengambilan amplitudo dan tanda dari sinyal AC), \\(V_s\\) menyatakan amplitudo bertanda yang sebanding dengan sinus sudut; \\(V_c\\) sebanding dengan kosinus. Faktor \\(k\\) adalah perbandingan kopling dan \\(V_{\\mathrm{ref}}\\) adalah amplitudo eksitasi.",
            en: "After **demodulation**, which extracts amplitude and sign from the AC signal, \\(V_s\\) is a signed amplitude proportional to sine of angle, while \\(V_c\\) follows cosine. The factor \\(k\\) is the coupling ratio and \\(V_{\\mathrm{ref}}\\) is excitation amplitude.",
          },
          {
            id: "Kedua tanda memberi kuadran sudut. Rasio sinus/kosinus saja kehilangan informasi ini jika tanda tidak dipertahankan. Fungsi atan2 memakai kedua keluaran untuk menentukan sudut satu putaran. Sinus dan kosinus tersebut mengikuti sudut poros; keduanya tetap membawa frekuensi AC eksitasi yang sama.",
            en: "The two signs identify the angle quadrant. A sine/cosine ratio loses this information if signs are discarded. The atan2 function uses both outputs to determine the angle within a turn. Sine and cosine describe shaft angle; both signals retain the same AC carrier frequency.",
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
          id: "d · Dari logam menuju perubahan osilator",
          en: "d · From metal to an oscillator change",
        },
        body: [
          {
            id: "Kumparan detektor induktif membentuk medan magnet bolak-balik. Saat target logam mendekat, medan itu menimbulkan arus pusar pada target. Arus tersebut mengambil energi dan mengubah beban osilator.",
            en: "An inductive detector coil creates an alternating magnetic field. As a metal target approaches, the field induces eddy currents in it. Those currents take energy and change the oscillator load.",
          },
          {
            id: "Rangkaian membaca perubahan amplitudo atau kondisi osilasi. Dengan begitu, alat mendeteksi logam tanpa harus menyentuhnya.",
            en: "The circuit detects the change in amplitude or oscillation condition. This lets it detect metal without touching it.",
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
          id: "d · Bedakan deteksi dari pengukuran jarak",
          en: "d · Distinguish detection from distance measurement",
        },
        body: [
          {
            id: "Detektor membandingkan perubahan sinyal dengan suatu ambang. Ketika ambang terlewati, keluaran berubah ON/OFF. Status ini menjawab apakah target berada dalam daerah deteksi.",
            en: "The detector compares the signal change with a threshold. Crossing it changes the output ON/OFF. That state tells us whether the target is within the detection region.",
          },
          {
            id: "Keluaran sakelar tidak langsung menyatakan jarak dalam milimeter. Untuk mengukur jarak secara terus-menerus, kita memerlukan sensor dan kalibrasi yang memang memberi keluaran posisi.",
            en: "A switch output does not directly give distance in millimetres. Continuous distance measurement needs a sensor and calibration designed to provide a position output.",
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
          id: "e · Ikuti lintasan cahaya",
          en: "e · Follow the light path",
        },
        body: [
          {
            id: "Detektor optik memiliki pemancar dan penerima. Pada through-beam, keduanya berhadapan dan benda memutus berkas. Pada retroreflective, pemancar serta penerima berada di sisi yang sama; reflektor mengembalikan berkas.",
            en: "An optical detector has an emitter and a receiver. In through-beam sensing they face each other and an object interrupts the beam. In retroreflective sensing they share one side while a reflector returns the beam.",
          },
          {
            id: "Pada kedua susunan itu, keberadaan benda mengubah cahaya yang diterima. Rangkaian membandingkan sinyal dengan ambang dan mengubah status deteksi.",
            en: "In either arrangement, an object changes the received light. The circuit compares that signal with a threshold and changes detection state.",
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
      {
        title: {
          id: "e · Mengapa cahaya dipancarkan sebagai pulsa?",
          en: "e · Why emit light in pulses?",
        },
        body: [
          {
            id: "Materi menyebut pulsa inframerah agar penerima dapat mengenali pola dari pemancarnya sendiri. Cahaya sekitar yang tidak memiliki pola itu lebih mudah dipisahkan dari sinyal ukur.",
            en: "The notes use infrared pulses so the receiver can recognise its own emitter’s pattern. Ambient light without that pattern is easier to distinguish from the measuring signal.",
          },
          {
            id: "Pengenalan pola pulsa membantu menekan gangguan cahaya sekitar, tetapi tidak membuat semua kondisi optik setara. Penempatan, penghalang, dan pantulan tetap memengaruhi cahaya yang sampai ke penerima.",
            en: "This reduces ambient-light interference, but it does not make every optical condition equivalent. Alignment, obstructions, and reflections still affect the light reaching the receiver.",
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
      en: "3. Pitot Tube: Flow Measurement\nA pitot tube is used to measure the water flow inside a pipe with an internal diameter of 100 mm. The tube is connected to a U-tube manometer filled with mercury, as depicted in the following figure. Given that the density of water and mercury are 1000 kg/m³ and 13600 kg/m³, respectively, and the absolute viscosity of water at 27°C is \\(8.62\\times10^{-3}\\ \\mathrm{Ns/m^2}\\). The gravity constant is 10 m/s².\n\n(a) [5%] By using Bernoulli’s equation, determine the pressure difference between Point 1 and Point 2, i.e. \\(P_2-P_1\\).\n\n(b) [10%] By using Pascal’s Law, determine the water flow (\\(v_1\\)) in terms of the mercury height difference (\\(h_m\\)).\n\n(c) [10%] If \\(h_m=5\\) mm, calculate the volumetric flowrate in m³/s.\n\n(d) [5%] Check whether the water flow is laminar or turbulent?\nUseful formulas supplied: \\(Re=\\rho vD/\\mu\\); laminar \\(v_{max}=2v_{avg}\\); turbulent \\(v_{max}=1.23v_{avg}\\).",
    },
    steps: [
      {
        title: {
          id: "a · Tentukan apa yang dibaca Pitot",
          en: "a · Identify what the Pitot tube reads",
        },
        body: [
          {
            id: "Kita ingin debit seluruh pipa, tetapi Pitot mula-mula memberi informasi kecepatan di satu lokasi. Titik 1 mengikuti aliran, sedangkan titik 2 di mulut Pitot menghentikan fluida setempat. Kita menyebut lokasi fluida berhenti sebagai **titik stagnasi** (titik dengan kecepatan lokal nol).",
            en: "We need the whole-pipe flow rate, but a Pitot tube first provides speed at one location. Point 1 is in the moving stream; point 2 at the opening brings fluid locally to rest. We call point 2 the **stagnation point**, where local fluid speed is zero.",
          },
          {
            id: "Dengan demikian \\(v_2=0\\). Kedua titik berada pada elevasi yang sama, dan kita abaikan rugi sepanjang lintasan pendek menuju mulut Pitot. Syarat ini membuat Bernoulli sesuai untuk menghubungkan tekanan dan kecepatan.",
            en: "Thus \\(v_2=0\\). The two points have equal elevation, and we neglect losses along the short path to the opening. These conditions make Bernoulli appropriate for relating pressure to speed.",
          },
        ],
      },
      {
        title: {
          id: "a · Turunkan beda tekanan dari Bernoulli",
          en: "a · Derive the pressure difference from Bernoulli",
        },
        body: [
          {
            id: "Suku \\(\\tfrac12\\rho_wv^2\\) adalah energi gerak per volume fluida. Pada titik stagnasi suku itu nol. Kurangi \\(P_1\\) dari kedua ruas setelah menyamakan elevasi.",
            en: "The term \\(\\tfrac12\\rho_wv^2\\) is kinetic energy per unit fluid volume. It becomes zero at stagnation. With equal elevations, subtract \\(P_1\\) from both sides.",
          },
          {
            id: "\\(\\rho_w\\) menyatakan massa jenis air. Untuk kecepatan tak nol, ruas kanan positif sehingga \\(P_2>P_1\\). Tanda ini nanti menentukan kaki raksa yang lebih rendah.",
            en: "\\(\\rho_w\\) denotes water density. For nonzero speed the right side is positive, so \\(P_2>P_1\\). This sign also determines which mercury surface is lower.",
          },
        ],
        math: "\\begin{aligned}P_1+\\tfrac12\\rho_wv_1^2+\\rho_wgz_1&=P_2+\\tfrac12\\rho_w(0)^2+\\rho_wgz_1\\\\P_2-P_1&=\\tfrac12\\rho_wv_1^2\\end{aligned}",
      },
      {
        title: {
          id: "b · Susun keseimbangan hidrostatik",
          en: "b · Set up the hydrostatic balance",
        },
        body: [
          {
            id: "Di manometer, tekanan bertambah sebesar \\(\\rho g\\Delta z\\) saat kita turun dan berkurang dengan nilai yang sama saat naik dalam fluida sejenis. Tekanan pada satu bidang mendatar di raksa yang diam harus sama.",
            en: "In the manometer, pressure increases by \\(\\rho g\\Delta z\\) when moving downward and decreases by that amount when moving upward in the same fluid. Pressure must match along one horizontal level in the stationary mercury.",
          },
          {
            id: "Selisih tinggi \\(h_m\\) memberi tambahan kolom raksa pada satu kaki, tetapi juga mengurangi kolom air sebesar tinggi yang sama. Kontribusi bersihnya adalah \\(\\rho_mgh_m-\\rho_wgh_m\\). Inilah asal selisih massa jenis; menggunakan \\(\\rho_mgh_m\\) saja mengabaikan air di atas raksa.",
            en: "The height difference \\(h_m\\) adds a mercury column on one side but removes an equal-height water column. The net contribution is \\(\\rho_mgh_m-\\rho_wgh_m\\). The net column contribution explains the density difference; using only \\(\\rho_mgh_m\\) ignores the water above mercury.",
          },
        ],
        math: "P_2-P_1=(\\rho_m-\\rho_w)gh_m",
      },
      {
        title: {
          id: "b · Selesaikan persamaan untuk kecepatan",
          en: "b · Solve the equation for speed",
        },
        body: [
          {
            id: "Bernoulli dan manometer menyatakan beda tekanan yang sama. Samakan kedua hasil, lalu kalikan kedua ruas dengan \\(2/\\rho_w\\). Langkah ini menyisakan \\(v_1^2\\).",
            en: "Bernoulli and the manometer describe the same pressure difference. Set the results equal, then multiply both sides by \\(2/\\rho_w\\). This isolates \\(v_1^2\\).",
          },
          {
            id: "Ambil akar positif karena yang dicari adalah besar kecepatan. Arah aliran sudah kita tetapkan melalui orientasi Pitot.",
            en: "Take the positive square root because we seek speed magnitude. The Pitot orientation already establishes flow direction.",
          },
        ],
        math: "\\begin{aligned}\\tfrac12\\rho_wv_1^2&=(\\rho_m-\\rho_w)gh_m\\\\v_1^2&=\\frac{2(\\rho_m-\\rho_w)gh_m}{\\rho_w}\\\\v_1&=\\sqrt{\\frac{2(\\rho_m-\\rho_w)gh_m}{\\rho_w}}\\end{aligned}",
      },
      {
        title: {
          id: "c · Masukkan data dalam satuan SI",
          en: "c · Substitute the data in SI units",
        },
        body: [
          {
            id: "Tinggi 5 mm menjadi 0,005 m. Diameter 100 mm menjadi 0,100 m. Pakai \\(g=10\\ \\mathrm{m/s^2}\\) dan viskositas \\(8{,}62\\times10^{-3}\\ \\mathrm{Pa\\,s}\\) sebagaimana tertulis pada soal.",
            en: "The 5 mm height becomes 0.005 m, and the 100 mm diameter becomes 0.100 m. Use \\(g=10\\ \\mathrm{m/s^2}\\) and viscosity \\(8.62\\times10^{-3}\\ \\mathrm{Pa\\,s}\\) as printed in the question.",
          },
          {
            id: "Selisih massa jenisnya 12600 kg/m³. Setelah menghitung beda tekanan 630 Pa, masukkan nilai itu ke hubungan Pitot.",
            en: "The density difference is 12600 kg/m³. Calculate the 630 Pa pressure difference, then insert it into the Pitot relation.",
          },
        ],
        math: "\\begin{aligned}\\Delta P&=(13600-1000)(10)(0.005)=630\\ \\mathrm{Pa}\\\\v_1&=\\sqrt{\\frac{2(630)}{1000}}=\\sqrt{1.26}=1.122497\\ \\mathrm{m/s}\\end{aligned}",
      },
      {
        title: {
          id: "c dan d · Bedakan kecepatan pusat dan rata-rata",
          en: "c and d · Distinguish centreline and mean speed",
        },
        body: [
          {
            id: "Ujung Pitot pada gambar berada di garis tengah, sehingga nilai tadi adalah \\(v_{\\max}\\). Debit \\(Q=A\\bar v\\) memakai \\(\\bar v\\), yaitu kecepatan rata-rata seluruh penampang. Di dekat dinding, aliran lebih lambat daripada di pusat.",
            en: "The opening in the figure lies on the centreline, so the calculated value is \\(v_{\\max}\\). Flow rate \\(Q=A\\bar v\\) needs \\(\\bar v\\), the cross-sectional mean speed. Fluid near the wall moves more slowly than at the centre.",
          },
          {
            id: "Soal memberi dua faktor profil: 2 untuk laminar dan 1,23 untuk turbulen. Kita belum boleh memilih tanpa cek Reynolds. Gunakan tiap dugaan, lalu uji apakah jenis alirannya mendukung dugaan itu.",
            en: "The question gives profile factors of 2 for laminar flow and 1.23 for turbulent flow. Check Reynolds number before choosing. Apply each assumption and test whether its resulting regime supports it.",
          },
        ],
        math: "v_{\\max}=2\\bar v\\quad(\\mathrm{laminar}),\\qquad v_{\\max}=1.23\\bar v\\quad(\\mathrm{turbulent})",
      },
      {
        title: {
          id: "d · Uji dugaan laminar",
          en: "d · Test the laminar assumption",
        },
        body: [
          {
            id: "Bagi kecepatan pusat dengan 2 untuk mencoba profil laminar. Reynolds menggunakan kecepatan rata-rata pipa, bukan kecepatan pusat.",
            en: "Divide the centreline speed by 2 to try the laminar profile. Pipe Reynolds number uses the mean speed, not the centreline speed.",
          },
          {
            id: "Hasil sekitar 6511 sudah melewati rentang laminar pipa, umumnya di bawah 2300. Hasil cek tidak mendukung dugaan awal, sehingga faktor 2 tidak konsisten untuk data ini.",
            en: "About 6511 is outside the usual laminar pipe range below roughly 2300. The check contradicts the starting assumption, so a factor of 2 is inconsistent with these data.",
          },
        ],
        math: "\\bar v_{\\mathrm{trial}}=\\frac{1.122497}{2}=0.561249\\ \\mathrm{m/s},\\qquad Re_{\\mathrm{trial}}=\\frac{1000(0.561249)(0.100)}{0.00862}\\approx6511",
      },
      {
        title: {
          id: "d · Uji profil turbulen yang diberikan",
          en: "d · Test the supplied turbulent profile",
        },
        body: [
          {
            id: "Sekarang bagi kecepatan pusat dengan 1,23. Faktor ini berasal dari lampiran soal. Ia bukan konstanta yang berlaku untuk semua profil turbulen.",
            en: "Now divide the centreline speed by 1.23. This factor comes from the exam’s formula sheet; it is not universal for every turbulent profile.",
          },
          {
            id: "Reynolds sekitar 10587 berada di atas rentang transisi pipa, sehingga mendukung model turbulen. Gunakan kecepatan rata-rata ini untuk menghitung debit.",
            en: "Reynolds number is about 10587, above the pipe transition range, supporting turbulent flow. Use this mean speed to calculate flow rate.",
          },
        ],
        math: "\\bar v=\\frac{1.122497}{1.23}=0.912599\\ \\mathrm{m/s},\\qquad Re=\\frac{1000(0.912599)(0.100)}{0.00862}\\approx1.059\\times10^4",
      },
      {
        title: {
          id: "c · Hitung luas, lalu debit seluruh pipa",
          en: "c · Calculate area, then whole-pipe flow",
        },
        body: [
          {
            id: "Rumus luas lingkaran dapat ditulis \\(A=\\pi D^2/4\\) karena jari-jari adalah \\(D/2\\). Dengan diameter dalam 0,100 m, luasnya 0,00785398 m².",
            en: "Circle area can be written \\(A=\\pi D^2/4\\) because radius is \\(D/2\\). The 0.100 m internal diameter gives 0.00785398 m².",
          },
          {
            id: "Kalikan luas dengan kecepatan rata-rata. Satuan m² × m/s menjadi m³/s. Hasil sekitar 7,17 L/s lebih kecil daripada perkiraan yang memakai kecepatan pusat untuk seluruh penampang.",
            en: "Multiply area by mean speed. The units m² × m/s give m³/s. About 7.17 L/s is lower than an estimate that applies centreline speed across the whole section.",
          },
        ],
        math: "Q=\\frac{\\pi(0.100)^2}{4}(0.912599)=0.00716754\\ \\mathrm{m^3/s}\\approx7.17\\ \\mathrm{L/s}",
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
      id: "Termokopel besi dan konstantan tipe J mengukur 0 sampai 300°C. Tabel memberi tegangan terhadap 0°C. Nilainya: pada 0°C = 0 μV; 100°C = 5269 μV; 200°C = 10779 μV; 300°C = 16327 μV. Rentang tipe pada tabel adalah −20 hingga 700°C. (a) Hitung nonlinearitas pada 100 dan 200°C sebagai persen skala penuh. (b) Untuk rentang 100 sampai 300°C, tentukan \\(a_1,a_2\\) dalam \\(E_{T,0}=a_1T+a_2T^2\\). (c) Tegangan ukur 12500 μV mengacu ke sambungan 20°C. Rangkaian sambungan referensi memberi 1000 μV. Gunakan model bagian (b) untuk mencari suhu sambungan ukur.",
      en: "4. Thermocouple: Temperature Measurement & Measurement Characteristics.\n\nAn iron v. constantan thermocouple (Type J) is used to measure temperatures in the ranges of 0°C to 300°C. The e.m.f. values for the thermocouple are provided in the following table.\nType: Iron v. constantan, Type J. Temperature range: −20 to +700°C. E.m.f. values (μV): \\(E_{0,0}=0\\), \\(E_{100,0}=5269\\), \\(E_{200,0}=10779\\), \\(E_{300,0}=16327\\).\n\n(a) [10%] Calculate the non-linearity at 100°C and 200°C as a percentage of the full scale.\n\n(b) [5%] For the temperature range between 100°C and 300°C, the thermocouple e.m.f. is expressed as \\(E_{T,0}=a_1T+a_2T^2\\). Calculate \\(a_1\\) and \\(a_2\\).\n\n(c) [10%] The measured e.m.f. is 12500 μV relative to a reference junction at 20°C. The reference junction circuit voltage is 1000 μV. Use the results from question (b) to estimate the temperature of the measured junction.",
    },
    steps: [
      {
        title: {
          id: "a · Tetapkan acuan nonlinearitas",
          en: "a · Set the nonlinearity reference",
        },
        body: [
          {
            id: "**Nonlinearitas** (penyimpangan kurva nyata dari garis acuan) menyatakan seberapa jauh sensor mengikuti hubungan lurus. Soal memberi rentang 0 sampai 300°C. Kita pakai garis yang menghubungkan ujung rentang: \\((0,0)\\) dan \\((300,16327)\\), dengan keluaran dalam μV.",
            en: "We use **nonlinearity**, the actual curve’s departure from a reference line, to measure how closely the sensor follows a straight relationship. For the stated 0 to 300°C range, use the line joining \\((0,0)\\) and \\((300,16327)\\), with output in μV.",
          },
          {
            id: "Kemiringan adalah perubahan keluaran dibagi perubahan suhu. Titik awalnya nol, jadi garis ini tidak memerlukan konstanta offset. Rentang keluaran skala penuh adalah 16327 μV.",
            en: "Slope is output change divided by temperature change. Since the starting point is zero, this line needs no offset term. The full output span is 16327 μV.",
          },
        ],
        math: "E_{\\mathrm{lin}}(T)=\\frac{16327-0}{300-0}T=54.423333T\\quad[\\mu\\mathrm V]",
      },
      {
        title: {
          id: "a · Hitung penyimpangan pada 100°C",
          en: "a · Calculate the departure at 100°C",
        },
        body: [
          {
            id: "Angka 5269 μV berasal dari tabel aktual. Nilai pembandingnya berasal dari garis, yaitu \\(54{,}423333(100)=5442{,}333\\) μV. Selisih aktual dikurangi garis bernilai negatif.",
            en: "The actual 5269 μV comes from the table. The comparison value comes from the line: \\(54.423333(100)=5442.333\\) μV. Actual minus reference is negative.",
          },
          {
            id: "Untuk persen skala penuh, bagi selisih itu dengan 16327 μV, lalu kalikan 100%. Jangan membaginya dengan keluaran pada 100°C, karena itu menghasilkan ukuran persentase yang berbeda.",
            en: "For percent of full scale, divide this difference by 16327 μV and multiply by 100%. Dividing by the output at 100°C would give a different percentage measure.",
          },
        ],
        math: "\\delta E_{100}=5269-5442.333=-173.333\\ \\mu\\mathrm V,\\qquad N_{100}=\\frac{-173.333}{16327}(100\\%)=-1.0616\\%",
      },
      {
        title: {
          id: "a · Terapkan acuan yang sama pada 200°C",
          en: "a · Keep the same reference at 200°C",
        },
        body: [
          {
            id: "Pada 200°C, garis acuan memberi 10884,667 μV. Tabel memberi 10779 μV. Jangan membuat garis acuan baru untuk tiap titik; kedua nonlinearitas harus merujuk garis yang sama.",
            en: "At 200°C, the reference line gives 10884.667 μV, while the table gives 10779 μV. Do not create a new reference line for each point: both nonlinearities must use the same line.",
          },
          {
            id: "Besarnya nonlinearitas adalah 1,062% pada 100°C dan 0,647% pada 200°C. Tanda minus pada hasil bertanda menjelaskan bahwa data berada di bawah garis.",
            en: "The nonlinearity magnitudes are 1.062% at 100°C and 0.647% at 200°C. The negative signed values indicate points below the line.",
          },
        ],
        math: "\\delta E_{200}=10779-10884.667=-105.667\\ \\mu\\mathrm V,\\qquad N_{200}=\\frac{-105.667}{16327}(100\\%)=-0.6472\\%",
      },
      {
        title: {
          id: "b · Bangun dua persamaan untuk dua konstanta",
          en: "b · Form two equations for two constants",
        },
        body: [
          {
            id: "Bagian (b) meminta model \\(E=a_1T+a_2T^2\\) pada rentang 100 sampai 300°C. Ada dua konstanta yang belum diketahui. Kita memilih kedua titik ujung rentang tersebut untuk menentukan keduanya.",
            en: "Part (b) asks for \\(E=a_1T+a_2T^2\\) over 100 to 300°C. There are two unknown constants. Choose the two endpoints of that range to determine them.",
          },
          {
            id: "Masukkan \\(T=100\\) dengan \\(E=5269\\), lalu \\(T=300\\) dengan \\(E=16327\\). Kuadrat suhu memberi 10000 dan 90000; angka itu berasal dari suku \\(T^2\\).",
            en: "Insert \\(T=100,E=5269\\), then \\(T=300,E=16327\\). Squaring these temperatures gives 10000 and 90000 in the \\(T^2\\) terms.",
          },
        ],
        math: "\\begin{aligned}100a_1+10000a_2&=5269\\\\300a_1+90000a_2&=16327\\end{aligned}",
      },
      {
        title: {
          id: "b · Hilangkan a₁ untuk mencari a₂",
          en: "b · Eliminate a₁ to find a₂",
        },
        body: [
          {
            id: "Bagi seluruh persamaan pertama dengan 100 dan kedua dengan 300. Kedua koefisien \\(a_1\\) lalu menjadi satu. Kurangi persamaan pertama hasil pembagian dari persamaan kedua.",
            en: "Divide the entire first equation by 100 and the entire second by 300. Both \\(a_1\\) coefficients become one. Subtract the first divided equation from the second.",
          },
          {
            id: "Suku \\(a_1\\) saling menghapus. Selisih 300 dan 100 menjadi koefisien 200 pada \\(a_2\\). Bagi kedua ruas dengan 200 untuk memperoleh \\(a_2\\).",
            en: "The \\(a_1\\) terms cancel. The difference between 300 and 100 gives a coefficient of 200 for \\(a_2\\). Divide both sides by 200.",
          },
        ],
        math: "\\begin{aligned}a_1+100a_2&=52.69\\\\a_1+300a_2&=54.423333\\\\200a_2&=1.733333\\\\a_2&=0.008666667\\ \\frac{\\mu\\mathrm V}{({}^\\circ\\mathrm C)^2}\\end{aligned}",
      },
      {
        title: {
          id: "b · Cari a₁ dan periksa satuan model",
          en: "b · Find a₁ and check the model units",
        },
        body: [
          {
            id: "Gunakan kembali \\(a_1+100a_2=52{,}69\\). Kurangi \\(100a_2\\) dari kedua ruas. Kita memperoleh 51,823333 untuk \\(a_1\\).",
            en: "Return to \\(a_1+100a_2=52.69\\). Subtract \\(100a_2\\) from both sides to obtain 51.823333 for \\(a_1\\).",
          },
          {
            id: "Suku \\(a_1T\\) dan \\(a_2T^2\\) sama-sama harus berupa tegangan. Jadi satuan \\(a_1\\) adalah μV/°C dan satuan \\(a_2\\) adalah μV/(°C)². T pada model ini memakai angka suhu dalam °C.",
            en: "Both \\(a_1T\\) and \\(a_2T^2\\) must have voltage units. Thus \\(a_1\\) has units μV/°C and \\(a_2\\) has units μV/(°C)². This model uses the numerical temperature in °C.",
          },
        ],
        math: "a_1=52.69-100(0.008666667)=51.823333\\ \\frac{\\mu\\mathrm V}{{}^\\circ\\mathrm C}",
      },
      {
        title: {
          id: "Periksa arti pendekatan dua titik",
          en: "Check what the two-point fit means",
        },
        body: [
          {
            id: "Model pasti melalui 100 dan 300°C karena kedua titik itu dipakai untuk mencarinya. Kita dapat menguji titik 200°C yang tidak ikut menentukan konstanta.",
            en: "The model passes through 100 and 300°C because those points determined it. Test the unused 200°C point to assess the approximation.",
          },
          {
            id: "Model memberi 10711,333 μV, sementara tabel memberi 10779 μV. Selisih 67,667 μV menunjukkan bahwa model ini mendekati data, bukan melalui seluruh tabel. Metode kuadrat terkecil dengan semua titik akan memberi konstanta lain.",
            en: "The model gives 10711.333 μV versus the tabulated 10779 μV. The 67.667 μV difference shows an approximation, not an exact fit to every point. Least squares using all points would give different constants.",
          },
        ],
        math: "E_{\\mathrm{model}}(200)=51.823333(200)+0.008666667(200)^2=10711.333\\ \\mu\\mathrm V",
      },
      {
        title: {
          id: "c · Samakan referensi tegangan sebelum mencari suhu",
          en: "c · Match voltage references before finding temperature",
        },
        body: [
          {
            id: "Model bagian (b) memakai referensi 0°C. Namun, tegangan terukur 12500 μV memakai referensi 20°C. Untuk menyamakan acuan, tambahkan tegangan rangkaian referensi 1000 μV yang disebut pada bagian (c).",
            en: "The model from part (b) uses a 0°C reference, but the measured 12500 μV uses a 20°C reference. Match the references by adding the 1000 μV reference-circuit voltage supplied in part (c).",
          },
          {
            id: "Kita memakai angka 1000 μV yang diberikan, tanpa menggantinya dengan 1019 μV dari tabel lain. Tegangan target model menjadi 13500 μV.",
            en: "Use the supplied 1000 μV, rather than substituting 1019 μV from another table. The model’s target voltage is 13500 μV.",
          },
        ],
        math: "E(T,0)=E(T,20)+E(20,0)=12500+1000=13500\\ \\mu\\mathrm V",
      },
      {
        title: {
          id: "c · Susun persamaan kuadrat dalam suhu",
          en: "c · Form the quadratic in temperature",
        },
        body: [
          {
            id: "Masukkan tegangan target ke \\(E=a_1T+a_2T^2\\). Kurangi 13500 dari kedua ruas agar satu ruas menjadi nol. Dengan begitu, kita bisa memakai rumus akar persamaan kuadrat.",
            en: "Insert the target voltage into \\(E=a_1T+a_2T^2\\). Subtract 13500 from both sides so one side is zero. This puts the equation in the form needed for the quadratic formula.",
          },
          {
            id: "Pada bentuk \\(AT^2+BT+C=0\\), koefisiennya adalah \\(A=a_2\\), \\(B=a_1\\), dan \\(C=-13500\\). Huruf A di sini hanya koefisien aljabar, bukan luas.",
            en: "In \\(AT^2+BT+C=0\\), the coefficients are \\(A=a_2\\), \\(B=a_1\\), and \\(C=-13500\\). Here A is an algebraic coefficient, not an area.",
          },
        ],
        math: "0.008666667T^2+51.823333T-13500=0",
      },
      {
        title: {
          id: "c · Pilih akar yang berada dalam rentang model",
          en: "c · Select the root within the model range",
        },
        body: [
          {
            id: "Rumus kuadrat menghasilkan dua akar. Gunakan tanda plus dan minus untuk memeriksa keduanya, lalu cocokkan dengan rentang 100 sampai 300°C yang mendasari model.",
            en: "The quadratic formula produces two roots. Evaluate both signs, then compare them with the 100 to 300°C range used to build the model.",
          },
          {
            id: "Akar positif sekitar 250,04°C berada dalam rentang tersebut. Akar sekitar −6229,66°C berada jauh di luar domain dan tidak mewakili pengukuran ini.",
            en: "The positive root, about 250.04°C, is within the range. The root near −6229.66°C lies far outside the domain and does not describe this measurement.",
          },
        ],
        math: "T=\\frac{-51.823333\\pm\\sqrt{(51.823333)^2+4(0.008666667)(13500)}}{2(0.008666667)}\\quad\\Rightarrow\\quad T\\approx250.04^\\circ\\mathrm C",
      },
      {
        title: {
          id: "Periksa urutan suhu dan tegangan",
          en: "Check the temperature and voltage ordering",
        },
        body: [
          {
            id: "Tegangan 13500 μV berada di antara keluaran model pada 200 dan 300°C. Suhu sekitar 250°C sesuai dengan urutan itu. Jika kita masukkan kembali suhu hasil, model memberi sekitar 13500 μV.",
            en: "The 13500 μV target lies between the model outputs at 200 and 300°C. A temperature near 250°C fits that ordering. Substituting the result back gives about 13500 μV.",
          },
          {
            id: "Ketelitian angka akhir tetap dibatasi oleh model pendekatan dan data soal. Menulis banyak angka desimal tidak menghapus selisih model terhadap tabel.",
            en: "The approximation and source data still limit accuracy. Extra decimal places do not remove the model’s departure from the table.",
          },
        ],
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
        id: "Nonlinearitas memakai garis ujung 0 sampai 300°C. Model kuadrat memakai titik 100 dan 300°C; soal tidak menetapkan metode pencocokan.",
        en: "Nonlinearity uses the 0 to 300°C endpoint line. The quadratic uses the 100 and 300°C points; the exam does not prescribe a fitting method.",
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
      id: "Sensor tekanan menjalani uji pada tiga kondisi. Kondisi (i) memakai suhu sekitar 25°C dan catu 9 V sebagai standar. Kondisi (ii) memakai 25°C dan 12 V. Kondisi (iii) memakai 30°C dan 9 V.\n\nMasukan tiap kondisi adalah 0, 4, 8, 12, 16 barg. Keluaran (mA) kondisi (i): 4; 11,0; 16,0; 22,8; 29,6. Keluaran kondisi (ii): 4; 13,2; 21,3; 31,1; 39,2. Keluaran kondisi (iii): 6; 12,5; 18,1; 25,5; 31,6.\n\n\n(a) Tentukan \\(K_M,K_I,a,K\\) beserta satuannya pada model \\(O=(K+K_MI_M)I+a+K_II_I\\). (b) Tentukan nonlinearitas maksimum sebagai persen rentang keluaran penuh.",
      en: "1. [20%] Systematic Characteristics of Measurement Systems.\n\nA laboratory tests a pressure transducer under three conditions:\n(i) Ambient temperature 25°C, supply voltage 9 V (standard).\n(ii) Ambient temperature 25°C, supply voltage 12 V.\n(iii) Ambient temperature 30°C, supply voltage 9 V.\nInput (barg): 0, 4, 8, 12, 16.\nOutput (mA), condition (i): 4, 11.0, 16.0, 22.8, 29.6.\nOutput (mA), condition (ii): 4, 13.2, 21.3, 31.1, 39.2.\nOutput (mA), condition (iii): 6, 12.5, 18.1, 25.5, 31.6.\n\n(a) [10%] Determine the values of \\(K_M,K_I,a,K\\) associated with the model equation \\(O=(K+K_MI_M)I+a+K_II_I\\). Complete your answer with the units.\n\n(b) [10%] Calculate the maximum non-linearity as a percentage of the full-scale deflection (f.s.d.).",
    },
    steps: [
      {
        title: {
          id: "a · Baca fungsi tiap suku pada model",
          en: "a · Read the role of each model term",
        },
        body: [
          {
            id: "Keluaran \\(O\\) berupa arus dalam mA dan masukan \\(I\\) berupa tekanan dalam bar gauge. Pada \\(O=(K+K_MI_M)I+a+K_II_I\\), kurung pertama mengatur kemiringan hubungan arus dan tekanan.",
            en: "We compare output \\(O\\), a current in mA, with input \\(I\\), a gauge pressure in bar. In \\(O=(K+K_MI_M)I+a+K_II_I\\), the first bracket controls the current and pressure slope.",
          },
          {
            id: "\\(a\\) adalah keluaran pada masukan nol dalam kondisi standar. Suku \\(K_II_I\\) menggeser keluaran tanpa dikalikan tekanan. Kita akan membedakan perubahan kemiringan dari perubahan titik nol.",
            en: "\\(a\\) is the zero-input output under standard conditions. The term \\(K_II_I\\) shifts output without multiplying pressure. We will distinguish slope changes from zero shifts.",
          },
        ],
      },
      {
        title: {
          id: "a · Pilih kondisi standar sebagai titik acuan",
          en: "a · Use standard conditions as the reference",
        },
        body: [
          {
            id: "Tabel kondisi (i), yaitu catu 9 V dan suhu 25°C, menjadi acuan. Definisikan \\(I_M\\) sebagai perubahan catu dan \\(I_I\\) sebagai perubahan suhu dari acuan ini.",
            en: "Condition (i), a 9 V supply and 25°C ambient temperature, is the reference. Define \\(I_M\\) as supply change and \\(I_I\\) as temperature change from it.",
          },
          {
            id: "Kedua perubahan bernilai nol pada kondisi standar. Dengan definisi ini, \\(K\\) dan \\(a\\) langsung menggambarkan garis standar. Kita memakai tabel cetak, bukan catatan tangan di lembar.",
            en: "Both changes are zero under standard conditions. With these definitions, \\(K\\) and \\(a\\) directly describe the standard line. Use the printed table rather than handwritten notes.",
          },
        ],
        math: "I_M=V_s-9\\ \\mathrm V,\\qquad I_I=T_a-25^\\circ\\mathrm C",
      },
      {
        title: {
          id: "a · Tentukan kemiringan K dari dua ujung",
          en: "a · Determine K from the two endpoints",
        },
        body: [
          {
            id: "Pada kondisi standar, masukan naik dari 0 ke 16 bar dan keluaran naik dari 4 ke 29,6 mA. Kemiringan menghitung kenaikan keluaran per kenaikan masukan.",
            en: "Under standard conditions, input rises from 0 to 16 bar while output rises from 4 to 29.6 mA. Slope measures output increase per input increase.",
          },
          {
            id: "Kurangi keluaran awal sebelum membagi. Menggunakan \\(29{,}6/16\\) akan memasukkan arus titik nol ke dalam kemiringan.",
            en: "Subtract the initial output before dividing. Using \\(29.6/16\\) would wrongly include the zero-input current in the slope.",
          },
        ],
        math: "K=\\frac{29.6-4}{16-0}=\\frac{25.6}{16}=1.6\\ \\mathrm{mA/bar}",
      },
      {
        title: {
          id: "a · Cari offset a dan tulis garis standar",
          en: "a · Find offset a and write the standard line",
        },
        body: [
          {
            id: "Di tekanan nol, suku \\(KI\\) menjadi nol. Arus yang tersisa adalah 4 mA, sehingga \\(a=4\\) mA. Offset ini memang ada pada sensor; ia tidak otomatis merupakan galat.",
            en: "At zero pressure the \\(KI\\) term vanishes. The remaining 4 mA gives \\(a=4\\) mA. This offset is part of the sensor characteristic; it is not automatically an error.",
          },
          {
            id: "Garis standar kini dapat memprediksi keluaran ideal pada setiap tekanan. Kita akan memakai garis yang sama saat menghitung nonlinearitas.",
            en: "The standard line can now predict ideal output at each pressure. Use this same line later when calculating nonlinearity.",
          },
        ],
        math: "a=4\\ \\mathrm{mA},\\qquad O_{\\mathrm{lin}}=1.6I+4\\quad[\\mathrm{mA}]",
      },
      {
        title: {
          id: "a · Cari perubahan sensitivitas akibat catu",
          en: "a · Find the supply-induced sensitivity change",
        },
        body: [
          {
            id: "Bandingkan kondisi (ii) dengan (i): suhu sama, hanya catu naik 3 V. Pada 12 V, keluaran nol tetap 4 mA, tetapi keluaran ujung menjadi 39,2 mA. Jadi perubahan utama terjadi pada kemiringan.",
            en: "Compare (ii) with (i): temperature stays fixed while supply rises by 3 V. At 12 V, zero output remains 4 mA, but the upper-end output becomes 39.2 mA. The main change is therefore in slope.",
          },
          {
            id: "Kemiringan baru 2,2 mA/bar lebih besar 0,6 mA/bar. Bagi perubahan kemiringan dengan perubahan catu untuk memperoleh \\(K_M\\).",
            en: "The new slope of 2.2 mA/bar is 0.6 mA/bar higher. Divide that slope change by the supply change to obtain \\(K_M\\).",
          },
        ],
        math: "K_{12}=\\frac{39.2-4}{16}=2.2\\ \\mathrm{mA/bar},\\qquad K_M=\\frac{2.2-1.6}{12-9}=0.2\\ \\frac{\\mathrm{mA}}{\\mathrm{bar\\,V}}",
      },
      {
        title: {
          id: "a · Cari pergeseran titik nol akibat suhu",
          en: "a · Find the temperature-induced zero shift",
        },
        body: [
          {
            id: "Bandingkan kondisi (iii) dengan (i): catu sama, suhu naik 5°C. Di masukan nol, keluaran naik dari 4 ke 6 mA. Ini memberi perubahan offset 2 mA.",
            en: "Compare (iii) with (i): supply stays fixed while temperature rises by 5°C. At zero input, output rises from 4 to 6 mA, giving a 2 mA offset change.",
          },
          {
            id: "Pada ujung atas, perubahan 29,6 ke 31,6 mA juga 2 mA. Kemiringan ujung tetap 1,6 mA/bar. Bagi pergeseran 2 mA dengan 5°C untuk mencari \\(K_I\\).",
            en: "At the upper endpoint, 29.6 to 31.6 mA is also a 2 mA shift. The endpoint slope remains 1.6 mA/bar. Divide the 2 mA shift by 5°C to find \\(K_I\\).",
          },
        ],
        math: "K_I=\\frac{6-4}{30-25}=0.4\\ \\mathrm{mA}/{}^\\circ\\mathrm C",
      },
      {
        title: {
          id: "b · Bandingkan setiap data dengan garis standar",
          en: "b · Compare every reading with the standard line",
        },
        body: [
          {
            id: "Nonlinearitas memakai data pada kondisi standar. Untuk tiap tekanan, hitung garis \\(1{,}6I+4\\), lalu kurangi hasil garis dari data. Misalnya pada 8 bar, garis memberi \\(1{,}6(8)+4=16{,}8\\) mA.",
            en: "Use the standard-condition data for nonlinearity. At each pressure, evaluate \\(1.6I+4\\), then subtract that line value from the reading. At 8 bar, for example, the line gives \\(1.6(8)+4=16.8\\) mA.",
          },
          {
            id: "Data di titik itu adalah 16,0 mA, sehingga selisihnya −0,8 mA. Tabel berikut memperlihatkan seluruh titik, agar kita tidak hanya memilih titik yang tampak paling jauh.",
            en: "The reading there is 16.0 mA, giving a −0.8 mA residual. The table checks all points rather than selecting one by appearance.",
          },
        ],
        math: "\\delta O=O_{\\mathrm{data}}-O_{\\mathrm{lin}}",
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
          id: "b · Ubah penyimpangan terbesar menjadi persen",
          en: "b · Convert the largest departure to percent",
        },
        body: [
          {
            id: "Simpangan terbesar dalam nilai mutlak adalah 0,8 mA. F.s.d. adalah rentang keluaran dari masukan nol ke masukan penuh: \\(29{,}6-4=25{,}6\\) mA.",
            en: "The largest absolute departure is 0.8 mA. Full-scale deflection is the output span from zero to full input: \\(29.6-4=25.6\\) mA.",
          },
          {
            id: "Bagi kedua besaran dengan satuan sama, lalu kalikan 100%. Offset 4 mA tidak ikut menjadi bagian rentang, sehingga penyebutnya bukan 29,6 mA.",
            en: "Divide these quantities with matching units, then multiply by 100%. The 4 mA offset is not part of the span, so the denominator is not 29.6 mA.",
          },
        ],
        math: "N_{\\max}=\\frac{\\max|\\delta O|}{O_{\\max}-O_{\\min}}(100\\%)=\\frac{0.8}{25.6}(100\\%)=3.125\\%",
      },
      {
        title: {
          id: "Periksa apa yang dirangkum model",
          en: "Check what the model captures",
        },
        body: [
          {
            id: "Keempat konstanta merangkum garis ujung. Nilai \\(K\\) mengubah bar menjadi mA, sedangkan \\(a\\) memberi arus awal. Nilai \\(K_M\\) mengubah kemiringan per volt, sedangkan \\(K_I\\) mengubah titik nol per derajat.",
            en: "The four constants describe endpoint lines: \\(K\\) converts bar into mA, \\(a\\) sets initial current, \\(K_M\\) changes slope per supply volt, and \\(K_I\\) shifts zero per degree.",
          },
          {
            id: "Titik tengah tidak semuanya tepat pada garis. Model lingkungan tersebut belum menghapus nonlinearitas tabel. Nilai 3,125% menyatakan simpangan terbesar di titik uji yang tersedia.",
            en: "Not every interior point lies on a line. This environmental model therefore does not remove the table’s nonlinearity. The 3.125% result is the largest departure among the available test points.",
          },
        ],
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
          id: "Tentukan dua perubahan yang saling terhubung",
          en: "Identify the two linked changes",
        },
        body: [
          {
            id: "Suhu tidak masuk langsung ke rumus tegangan jembatan. Suhu mengubah hambatan RTD lebih dulu, lalu perubahan hambatan mengubah pembagian tegangan pada jembatan.",
            en: "We first convert temperature to RTD resistance, then use resistance to calculate bridge voltage. It first changes RTD resistance, then that resistance changes the bridge’s voltage division.",
          },
          {
            id: "Jembatan bekerja dalam **mode defleksi** (membaca tegangan saat jembatan tidak seimbang). Kita membaca perubahan tegangan akibat perubahan hambatan. Kita tidak mengatur ulang resistor agar keluaran kembali nol.",
            en: "The bridge operates in **deflection mode**: we read the voltage while the bridge is unbalanced. That voltage change indicates the resistance change. We do not readjust a resistor to restore a zero output.",
          },
        ],
      },
      {
        title: {
          id: "Hitung perubahan relatif hambatan",
          en: "Calculate the fractional resistance change",
        },
        body: [
          {
            id: "Data \\(R_0=25\\ \\Omega\\) merujuk suhu 0°C. Koefisien \\(\\alpha=0{,}003925\\ {}^\\circ\\mathrm C^{-1}\\) menyatakan perubahan relatif hambatan per derajat. Kenaikan suhu 100°C memberi \\(\\alpha T=0{,}3925\\), atau 39,25%.",
            en: "The given \\(R_0=25\\ \\Omega\\) refers to 0°C. The coefficient \\(\\alpha=0.003925\\ {}^\\circ\\mathrm C^{-1}\\) is fractional resistance change per degree. A 100°C rise gives \\(\\alpha T=0.3925\\), or 39.25%.",
          },
          {
            id: "Kalikan kenaikan relatif itu dengan 25 Ω untuk memperoleh kenaikan 9,8125 Ω. Tambahkan pada hambatan awal.",
            en: "Multiply the fractional change by 25 Ω to obtain a 9.8125 Ω increase. Add it to the initial resistance.",
          },
        ],
        math: "R_4=R_0(1+\\alpha T)=25(1+0.3925)=25+9.8125=34.8125\\ \\Omega",
      },
      {
        title: {
          id: "Ikuti jalur catu pada gambar",
          en: "Follow the supply paths in the diagram",
        },
        body: [
          {
            id: "Catu pada gambar terhubung kiri dan kanan. Tetapkan simpul kiri \\(+5\\) V dan kanan 0 V. Jalur atas melewati \\(R_2\\) lalu \\(R_3\\); jalur bawah melewati \\(R_1\\) lalu RTD \\(R_4\\).",
            en: "The supply connects left to right in the figure. Set the left node to \\(+5\\) V and the right node to 0 V. The upper path passes through \\(R_2,R_3\\); the lower path passes through \\(R_1,R_4\\), the RTD.",
          },
          {
            id: "Sebut titik tengah atas A dan bawah B. Voltmeter ideal tidak mengambil arus, sehingga kedua jalur tetap berupa dua pembagi tegangan. Memasangkan resistor menurut posisi gambar tanpa mengikuti catu dapat memberi rumus yang salah.",
            en: "Call the upper midpoint A and the lower midpoint B. An ideal voltmeter takes no current, so each path remains a voltage divider. Pairing resistors by appearance without following the supply connections can give the wrong equation.",
          },
        ],
      },
      {
        title: {
          id: "Turunkan pembagi tegangan dari hukum Ohm",
          en: "Derive voltage division from Ohm’s law",
        },
        body: [
          {
            id: "Untuk dua resistor seri, arusnya sama: \\(I=V_s/(R_L+R_R)\\). Tegangan titik tengah terhadap simpul kanan nol sama dengan jatuh tegangan pada resistor kanan, yaitu \\(IR_R\\).",
            en: "Two series resistors carry the same current: \\(I=V_s/(R_L+R_R)\\). Midpoint voltage relative to the zero-volt right node equals the voltage across the right resistor, \\(IR_R\\).",
          },
          {
            id: "Itulah asal pembilang resistor kanan pada rumus pembagi. Untuk jalur atas, resistor kanan adalah \\(R_3=100\\ \\Omega\\).",
            en: "The voltage-divider relation explains why the right resistor appears in the numerator. For the upper path, that resistor is \\(R_3=100\\ \\Omega\\).",
          },
        ],
        math: "V_{\\mathrm{mid}}=V_s\\frac{R_R}{R_L+R_R},\\qquad V_A=5\\frac{100}{100+100}=2.500\\ \\mathrm V",
      },
      {
        title: {
          id: "Hitung titik tengah bawah dengan hambatan baru",
          en: "Calculate the lower midpoint with the new resistance",
        },
        body: [
          {
            id: "Pada jalur bawah, resistor kanan adalah RTD. Masukkan \\(R_1=25\\ \\Omega\\) dan \\(R_4=34{,}8125\\ \\Omega\\). Penyebut memakai jumlah kedua hambatan dalam jalur itu.",
            en: "The lower path’s right resistor is the RTD. Insert \\(R_1=25\\ \\Omega\\) and \\(R_4=34.8125\\ \\Omega\\). The denominator is the sum of the two resistances in that path.",
          },
          {
            id: "Tegangan B menjadi lebih besar dari 2,5 V karena RTD mengambil bagian tegangan yang lebih besar. Kita memakai rumus lengkap; kenaikan 39,25% tidak cukup kecil untuk mengandalkan pendekatan perubahan kecil.",
            en: "Node B rises above 2.5 V because the RTD takes a larger fraction of the supply. Use the full equation: a 39.25% resistance increase is too large to rely on a small-change approximation.",
          },
        ],
        math: "V_B=5\\frac{34.8125}{25+34.8125}=5\\frac{34.8125}{59.8125}=2.910136\\ \\mathrm V",
      },
      {
        title: {
          id: "Tentukan polaritas keluaran sebelum mengurangkan",
          en: "Define output polarity before subtracting",
        },
        body: [
          {
            id: "Kita definisikan \\(V_o=V_B-V_A\\), yaitu bawah dikurangi atas. Dengan definisi ini, hasil positif berarti simpul B berada pada potensial lebih tinggi.",
            en: "Define \\(V_o=V_B-V_A\\), lower minus upper. A positive result then means node B is at the higher potential.",
          },
          {
            id: "Jika Anda membalik kabel voltmeter, hasil menjadi negatif dengan besar yang sama. Soal tidak memberi tanda polaritas keluaran. Besar tegangan 0,41014 V tetap berlaku untuk kedua arah pemasangan kabel.",
            en: "Reversing the voltmeter leads gives the negative of the same magnitude. Since the question does not label output polarity, the magnitude 0.41014 V is the invariant result.",
          },
        ],
        math: "V_o=2.910136-2.500=+0.410136\\ \\mathrm V",
      },
      {
        title: {
          id: "Periksa keadaan seimbang pada suhu awal",
          en: "Check balance at the initial temperature",
        },
        body: [
          {
            id: "Pada 0°C, RTD kembali menjadi 25 Ω. Kedua jalur memiliki pembagian sama besar: jalur atas 100/100 dan jalur bawah 25/25. Meskipun nilai hambatannya berbeda, kedua titik tengah sama-sama 2,5 V.",
            en: "At 0°C, the RTD returns to 25 Ω. Both paths divide equally: 100/100 above and 25/25 below. Despite different resistance magnitudes, both midpoints are at 2.5 V.",
          },
          {
            id: "Keluaran lalu nol, sesuai keterangan jembatan seimbang pada soal. Cek ini menguji sambungan yang kita pilih, bukan hanya hasil perkalian.",
            en: "The output is then zero, matching the stated balanced condition. This checks our circuit interpretation, not merely the arithmetic.",
          },
        ],
        math: "V_o(0^\\circ\\mathrm C)=5\\frac{25}{25+25}-5\\frac{100}{100+100}=0",
      },
    ],
    answer: {
      id: "RTD menjadi 34,8125 Ω. Besar tegangan keluaran jembatan adalah sekitar 0,410 V; tanda mengikuti polaritas voltmeter.",
      en: "The RTD becomes 34.8125 Ω. The bridge output magnitude is approximately 0.410 V; its sign depends on detector polarity.",
    },
    visual: {
      kind: "bridge",
      caption: {
        id: "Ikuti catu kiri dan kanan: keluaran membandingkan simpul atas dan bawah.",
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
          id: "Tetapkan besaran yang dibatasi soal",
          en: "Identify the quantity constrained by the question",
        },
        body: [
          {
            id: "Kita membandingkan amplitudo simpangan yang ditunjukkan alat dengan amplitudo masukannya. Batas soal menyangkut **galat amplitudo** (selisih relatif kedua amplitudo). Kita tidak diminta mencari galat fase atau respons terhadap masukan tangga.",
            en: "We compare the indicated displacement amplitude with the input amplitude. The constraint concerns **amplitude error**, the relative difference between those amplitudes. The question does not ask for phase error or a step response.",
          },
          {
            id: "Untuk getaran sinusoidal pada satu frekuensi, fungsi alih memberi rasio amplitudo keluaran terhadap masukan. Sensitivitas keadaan tunaknya satu, sehingga rasio idealnya adalah 1.",
            en: "For sinusoidal vibration at one frequency, the transfer function gives the output-to-input amplitude ratio. Its steady-state sensitivity is unity, so the ideal ratio is 1.",
          },
        ],
      },
      {
        title: {
          id: "Perbaiki suku redaman secara terbuka",
          en: "Correct the damping term explicitly",
        },
        body: [
          {
            id: "Naskah mencetak \\(2\\zeta\\omega_n\\) pada penyebut tanpa faktor \\(s\\). Suku itu bersatuan per detik, sedangkan \\(s^2\\) dan \\(\\omega_n^2\\) bersatuan per detik kuadrat. Penjumlahan tersebut tidak konsisten.",
            en: "The printed denominator contains \\(2\\zeta\\omega_n\\) without \\(s\\). That term has inverse-second units, while \\(s^2\\) and \\(\\omega_n^2\\) have inverse-second-squared units. The sum is dimensionally inconsistent.",
          },
          {
            id: "Kita memakai bentuk orde dua dengan \\(2\\zeta\\omega_ns\\). Definisikan \\(r=f/f_n=\\omega/\\omega_n\\). Pembilang dan penyebut rasio memakai satuan yang sama. Jadi \\(r=f/20\\) dapat langsung memakai Hz.",
            en: "Use the second-order form with \\(2\\zeta\\omega_ns\\). Define \\(r=f/f_n=\\omega/\\omega_n\\). Matching units cancel, so \\(r=f/20\\) can use Hz directly.",
          },
        ],
        math: "G(s)=\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_ns+\\omega_n^2},\\qquad r=\\frac{f}{20}",
      },
      {
        title: {
          id: "Ubah fungsi alih menjadi rasio amplitudo",
          en: "Convert the transfer function into an amplitude ratio",
        },
        body: [
          {
            id: "Untuk keadaan sinusoidal tunak, gantikan \\(s\\) dengan \\(j\\omega\\), dengan \\(j^2=-1\\). Penyebut memiliki bagian nyata \\(\\omega_n^2-\\omega^2\\) dan bagian imajiner \\(2\\zeta\\omega_n\\omega\\).",
            en: "For steady sinusoidal response, substitute \\(s=j\\omega\\), where \\(j^2=-1\\). The denominator has real part \\(\\omega_n^2-\\omega^2\\) and imaginary part \\(2\\zeta\\omega_n\\omega\\).",
          },
          {
            id: "Bagi pembilang dan penyebut dengan \\(\\omega_n^2\\). Besar bilangan \\(a+jb\\) adalah \\(\\sqrt{a^2+b^2}\\), sehingga kita memperoleh rasio amplitudo \\(M\\).",
            en: "Divide numerator and denominator by \\(\\omega_n^2\\). The magnitude of \\(a+jb\\) is \\(\\sqrt{a^2+b^2}\\), giving the amplitude ratio \\(M\\).",
          },
        ],
        math: "G(j\\omega)=\\frac1{1-r^2+j\\,2\\zeta r},\\qquad M(r)=\\frac1{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}}",
      },
      {
        title: {
          id: "Terjemahkan galat 5% menjadi dua batas",
          en: "Translate 5% error into two limits",
        },
        body: [
          {
            id: "Galat amplitudo relatif adalah \\(|M-1|\\). Nilai \\(M=0{,}95\\) berarti alat membaca 5% terlalu rendah; \\(M=1{,}05\\) berarti 5% terlalu tinggi.",
            en: "Relative amplitude error is \\(|M-1|\\). \\(M=0.95\\) means a reading 5% too low; \\(M=1.05\\) means 5% too high.",
          },
          {
            id: "Jadi kita perlu memeriksa kedua batas. Respons orde dua dapat naik di sekitar resonansi sebelum turun; tidak aman menganggapnya selalu menurun sejak frekuensi nol.",
            en: "Both limits must be checked. A second-order response can rise near resonance before falling, so do not assume it decreases from zero frequency onward.",
          },
        ],
        math: "|M-1|<0.05\\quad\\Longleftrightarrow\\quad0.95<M<1.05",
      },
      {
        title: {
          id: "Periksa puncak respons sebelum memilih batas",
          en: "Check the response peak before selecting a boundary",
        },
        body: [
          {
            id: "Maksimum \\(M\\) terjadi ketika kuadrat penyebutnya minimum. Tuliskan \\(D(r)=1+(4\\zeta^2-2)r^2+r^4\\). Dari \\(D^{\\prime}(r)=0\\), puncak tak nol memenuhi \\(r_p^2=1-2\\zeta^2\\).",
            en: "\\(M\\) is largest where its squared denominator is smallest. Write \\(D(r)=1+(4\\zeta^2-2)r^2+r^4\\). From \\(D^{\\prime}(r)=0\\), the nonzero peak satisfies \\(r_p^2=1-2\\zeta^2\\).",
          },
          {
            id: "Dengan \\(\\zeta=0{,}65\\), puncaknya hanya sekitar 1,01223, atau 1,223% di atas nilai ideal. Batas atas 1,05 tidak terlampaui, sehingga batas kerja datang dari penurunan ke \\(M=0{,}95\\).",
            en: "For \\(\\zeta=0.65\\), the peak is only about 1.01223, or 1.223% above ideal. It never exceeds 1.05, so the operating boundary comes from the fall to \\(M=0.95\\).",
          },
        ],
        math: "r_p^2=1-2(0.65)^2=0.155,\\qquad M_{\\max}=\\frac1{2(0.65)\\sqrt{1-0.65^2}}=1.01223",
      },
      {
        title: {
          id: "Buka kuadrat pada persamaan batas",
          en: "Expand the boundary equation",
        },
        body: [
          {
            id: "Masukkan \\(M=0{,}95\\) dan \\(2\\zeta=1{,}3\\). Balik kedua ruas, lalu kuadratkan. Semua besar yang terlibat positif, sehingga langkah ini tidak mengubah batas yang dicari.",
            en: "Insert \\(M=0.95\\) and \\(2\\zeta=1.3\\). Take reciprocals, then square. These magnitudes are positive, so this operation preserves the desired boundary.",
          },
          {
            id: "Suku \\((1-r^2)^2\\) menjadi \\(1-2r^2+r^4\\), sedangkan \\((1{,}3r)^2=1{,}69r^2\\). Gabungkan suku \\(r^2\\) dan kurangi \\(1/0{,}95^2\\) dari kedua ruas.",
            en: "Expand \\((1-r^2)^2\\) into \\(1-2r^2+r^4\\), while \\((1.3r)^2=1.69r^2\\). Combine the \\(r^2\\) terms and subtract \\(1/0.95^2\\) from both sides.",
          },
        ],
        math: "\\begin{aligned}(1-r^2)^2+(1.3r)^2&=\\frac1{0.95^2}\\\\1-2r^2+r^4+1.69r^2&=1.10803324\\\\r^4-0.31r^2-0.10803324&=0\\end{aligned}",
      },
      {
        title: {
          id: "Gunakan x = r² untuk mencari akar",
          en: "Use x = r² to solve for the root",
        },
        body: [
          {
            id: "Persamaan hanya memuat \\(r^4\\) dan \\(r^2\\). Dengan \\(x=r^2\\), bentuknya menjadi kuadrat biasa \\(x^2-0{,}31x-0{,}10803324=0\\).",
            en: "The equation contains only \\(r^4\\) and \\(r^2\\). Set \\(x=r^2\\) to obtain the ordinary quadratic \\(x^2-0.31x-0.10803324=0\\).",
          },
          {
            id: "Pilih akar \\(x\\) positif karena kuadrat rasio frekuensi tidak negatif. Setelah mendapat \\(x\\), ambil akar kuadrat sekali lagi untuk memperoleh \\(r\\).",
            en: "Select the positive \\(x\\) root because a squared frequency ratio cannot be negative. Then take one more square root to obtain \\(r\\).",
          },
        ],
        math: "x=\\frac{0.31+\\sqrt{0.31^2+4(0.10803324)}}2=0.51839819,\\qquad r=\\sqrt{x}=0.71999874",
      },
      {
        title: {
          id: "Kembalikan ke hertz dan periksa syarat ketat",
          en: "Convert to hertz and respect the strict limit",
        },
        body: [
          {
            id: "Dari definisi \\(r=f/20\\), kalikan dengan 20 Hz untuk mendapat batas 14,39997 Hz. Pada frekuensi ini \\(M=0{,}95\\), jadi galat tepat 5%.",
            en: "From \\(r=f/20\\), multiply by 20 Hz to obtain a boundary of 14.39997 Hz. At that frequency \\(M=0.95\\), so error is exactly 5%.",
          },
          {
            id: "Soal meminta kurang dari 5%, maka pilih \\(f\\) di bawah batas tersebut. Hasil ini membatasi amplitudo saja; ia tidak menjamin fase keluaran sama dengan fase masukan.",
            en: "The question requires less than 5%, so choose \\(f\\) below that boundary. This controls amplitude only; it does not guarantee equal input and output phase.",
          },
        ],
        math: "f_{\\mathrm{lim}}=20(0.71999874)=14.39997\\ \\mathrm{Hz},\\qquad0\\le f<f_{\\mathrm{lim}}",
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
      id: "Air mengalir dalam pipa horizontal dengan diameter dalam 90 mm. Diameter lubang orifis tajam 30 mm. Koefisien debit \\(C_d=0{,}65\\) dan koefisien kontraksi \\(C_c=0{,}67\\). Beda tekanan statis 0,3 bar dan massa jenis 1000 kg/m³. (a) Turunkan kecepatan sebelum pelat dengan Bernoulli dan kontinuitas. (b) Hitung luas pipa serta vena kontrakta. (c) Hitung debit volume ideal. (d) Hitung debit massa nyata. Bedakan luas lubang dari luas aliran tersempit setelah pelat.",
      en: "4. [25%] Flow Measurement: Orifice Plate Flowmeter\nAn orifice plate flowmeter is situated in a horizontal pipe with an internal diameter of 90 mm in which water flows. The diameter of the sharp-edged orifice is 30 mm. The discharge coefficient (\\(C_d\\)) for the flowmeter is 0.65, and the coefficient of contraction is 0.67. The static pressure difference across the orifice is 0.3 bar. The water density is 1000 kg/m³.\n\n(a) [10%] Apply Bernoulli’s equation and continuity between positions before and after the plate. Derive the equation for water velocity before the plate.\n\n(b) [5%] Calculate the cross-sectional areas of the pipe and vena contracta.\n\n(c) [5%] Calculate the ideal (theoretical) volumetric flow rate of the water in the pipe.\n\n(d) [5%] Calculate the actual (real) mass flow rate of the water in the pipe.",
    },
    steps: [
      {
        title: {
          id: "a · Tentukan penampang dan besaran aliran",
          en: "a · Define the sections and flow quantities",
        },
        body: [
          {
            id: "Penampang 1 berada di pipa sebelum pelat, dengan luas \\(A_1\\) dan kecepatan rata-rata \\(v_1\\). Penampang 2 berada pada aliran sempit, dengan luas \\(A_2\\) dan kecepatan \\(v_2\\). Kita mencari hubungan kecepatan hulu dengan beda tekanan.",
            en: "Section 1 is upstream of the plate, with area \\(A_1\\) and mean speed \\(v_1\\). Section 2 is the narrow stream, with area \\(A_2\\) and speed \\(v_2\\). We seek upstream speed in terms of pressure difference.",
          },
          {
            id: "Untuk aliran tunak tak termampatkan, volume yang melewati kedua penampang tiap detik sama. Hubungan \\(Q=Av\\) berarti perkalian luas dan kecepatan harus sama.",
            en: "In steady incompressible flow, the same volume passes both sections each second. Since \\(Q=Av\\), area times speed must match.",
          },
        ],
        math: "A_1v_1=A_2v_2\\quad\\Longrightarrow\\quad v_2=\\frac{A_1}{A_2}v_1",
      },
      {
        title: {
          id: "a · Gunakan Bernoulli pada pipa horizontal",
          en: "a · Apply Bernoulli to the horizontal pipe",
        },
        body: [
          {
            id: "Pipa horizontal memberi elevasi yang sama, sehingga suku \\(\\rho gz\\) saling menghapus. Untuk debit ideal, kita belum memasukkan rugi aliran. Selisih tekanan berubah menjadi selisih energi gerak per volume.",
            en: "The horizontal pipe gives equal elevations, so the \\(\\rho gz\\) terms cancel. For ideal flow, losses are not yet included. Pressure difference becomes a kinetic-energy difference per unit volume.",
          },
          {
            id: "Definisikan \\(\\Delta P=P_1-P_2>0\\). Pada penampang sempit, kecepatan lebih besar dan tekanan statis lebih rendah.",
            en: "Define \\(\\Delta P=P_1-P_2>0\\). At the narrow section, speed is higher and static pressure is lower.",
          },
        ],
        math: "P_1+\\tfrac12\\rho v_1^2=P_2+\\tfrac12\\rho v_2^2\\quad\\Longrightarrow\\quad\\Delta P=\\tfrac12\\rho(v_2^2-v_1^2)",
      },
      {
        title: {
          id: "a · Masukkan kontinuitas dan isolasi v₁",
          en: "a · Substitute continuity and isolate v₁",
        },
        body: [
          {
            id: "Ganti \\(v_2\\) dengan \\((A_1/A_2)v_1\\). Ketika dikuadratkan, seluruh perbandingan luas ikut dikuadratkan. Keluarkan \\(v_1^2\\) sebagai faktor bersama.",
            en: "Replace \\(v_2\\) with \\((A_1/A_2)v_1\\). Squaring also squares the entire area ratio. Factor out \\(v_1^2\\).",
          },
          {
            id: "Kalikan kedua ruas dengan 2, lalu bagi dengan \\(\\rho[(A_1/A_2)^2-1]\\). Akar positif memberi besar kecepatan ideal sebelum pelat.",
            en: "Multiply both sides by 2, then divide by \\(\\rho[(A_1/A_2)^2-1]\\). The positive square root gives ideal upstream speed.",
          },
        ],
        math: "\\begin{aligned}\\Delta P&=\\tfrac12\\rho\\left[\\left(\\frac{A_1}{A_2}\\right)^2-1\\right]v_1^2\\\\v_{1,i}&=\\sqrt{\\frac{2\\Delta P}{\\rho[(A_1/A_2)^2-1]}}\\end{aligned}",
      },
      {
        title: {
          id: "b · Pisahkan lubang pelat dari vena kontrakta",
          en: "b · Distinguish the plate hole from the vena contracta",
        },
        body: [
          {
            id: "Luas lubang pelat adalah \\(A_o\\). Aliran masih dapat menyempit setelah melewati tepi tajam. **Vena kontrakta** (penampang aliran paling sempit setelah pelat) memiliki luas \\(A_c\\). Luas lubang dan luas vena kontrakta berbeda.",
            en: "The plate-hole area is \\(A_o\\). The stream can contract further after passing the sharp edge. Its narrowest section is the **vena contracta**, with area \\(A_c\\). The hole and the vena contracta have different areas.",
          },
          {
            id: "Koefisien kontraksi adalah \\(C_c=A_c/A_o=0{,}67\\). Koefisien tersebut mengalikan luas, bukan diameter. Luas sebanding dengan diameter kuadrat, sehingga diameter vena adalah \\(\\sqrt{C_c}\\) kali diameter lubang.",
            en: "The contraction coefficient is \\(C_c=A_c/A_o=0.67\\). It multiplies area, not diameter. Since area scales with diameter squared, vena diameter is \\(\\sqrt{C_c}\\) times hole diameter.",
          },
        ],
        math: "A_c=C_cA_o,\\qquad d_c=d_o\\sqrt{C_c}",
      },
      {
        title: {
          id: "b · Hitung luas dengan diameter dalam meter",
          en: "b · Calculate areas using diameters in metres",
        },
        body: [
          {
            id: "Ubah 90 mm menjadi 0,090 m dan 30 mm menjadi 0,030 m sebelum menghitung luas. Rumus \\(\\pi D^2/4\\) berasal dari \\(\\pi(D/2)^2\\).",
            en: "Convert 90 mm to 0.090 m and 30 mm to 0.030 m before calculating area. The formula \\(\\pi D^2/4\\) comes from \\(\\pi(D/2)^2\\).",
          },
          {
            id: "Hitung luas pipa dan lubang, lalu kalikan luas lubang dengan 0,67. Urutannya harus memenuhi \\(A_c<A_o<A_1\\).",
            en: "Calculate pipe and hole areas, then multiply hole area by 0.67. Their ordering must satisfy \\(A_c<A_o<A_1\\).",
          },
        ],
        math: "\\begin{aligned}A_1&=\\frac\\pi4(0.09)^2=6.361725\\times10^{-3}\\ \\mathrm{m^2}\\\\A_o&=\\frac\\pi4(0.03)^2=7.068583\\times10^{-4}\\ \\mathrm{m^2}\\\\A_c&=C_cA_o=4.735951\\times10^{-4}\\ \\mathrm{m^2}\\end{aligned}",
      },
      {
        title: {
          id: "c · Tetapkan acuan yang konsisten dengan materi",
          en: "c · State the convention used with the course model",
        },
        body: [
          {
            id: "Urutan soal meminta luas vena sebelum menghitung debit. Mengikuti rute itu, kita memakai \\(A_2=A_c\\) pada rumus penampang. Beda tekanan 0,3 bar menjadi \\(0{,}3\\times10^5=30000\\) Pa.",
            en: "The question asks for vena area before flow rate. Following that route, use \\(A_2=A_c\\) in the section-based formula. The pressure difference converts from 0.3 bar to \\(0.3\\times10^5=30000\\) Pa.",
          },
          {
            id: "Untuk memperoleh debit, kalikan rumus \\(v_{1,i}\\) dengan \\(A_1\\). Membagi bagian dalam akar dengan \\(A_1^2/A_2^2\\) memberi bentuk dengan \\(A_2\\) di luar akar.",
            en: "To obtain flow rate, multiply \\(v_{1,i}\\) by \\(A_1\\). Rearranging the area ratio gives the form with \\(A_2\\) outside the square root.",
          },
        ],
        math: "Q_i=A_1v_{1,i}=A_2\\sqrt{\\frac{2\\Delta P}{\\rho[1-(A_2/A_1)^2]}}",
      },
      {
        title: {
          id: "c · Masukkan luas vena ke debit ideal",
          en: "c · Insert the vena area into ideal flow",
        },
        body: [
          {
            id: "Gunakan \\(A_2=0{,}0004735951\\) m², \\(A_1=0{,}006361725\\) m², \\(\\rho=1000\\) kg/m³, dan \\(\\Delta P=30000\\) Pa. Faktor penyebut mempertahankan pengaruh kecepatan hulu; kita tidak menganggap \\(v_1=0\\).",
            en: "Use \\(A_2=0.0004735951\\) m², \\(A_1=0.006361725\\) m², \\(\\rho=1000\\) kg/m³, and \\(\\Delta P=30000\\) Pa. The denominator retains upstream velocity; we do not assume \\(v_1=0\\).",
          },
          {
            id: "Debit ideal berbasis vena adalah sekitar 0,00367866 m³/s. Membaginya dengan luas pipa memberi kecepatan hulu ideal 0,578249 m/s.",
            en: "Vena-based ideal flow is about 0.00367866 m³/s. Dividing by pipe area gives an ideal upstream speed of 0.578249 m/s.",
          },
        ],
        math: "Q_{i,c}=0.0004735951\\sqrt{\\frac{2(30000)}{1000[1-(0.0004735951/0.006361725)^2]}}=0.003678659\\ \\mathrm{m^3/s}",
      },
      {
        title: {
          id: "d · Terapkan Cd pada acuan yang sama",
          en: "d · Apply Cd under the same convention",
        },
        body: [
          {
            id: "Jika \\(C_d=0{,}65\\) pada soal mengacu pada debit ideal berbasis vena, debit nyata adalah 65% dari debit ideal tersebut. Pengali ini tidak mengubah satuan.",
            en: "If the given \\(C_d=0.65\\) is referenced to vena-based ideal flow, actual flow is 65% of that ideal value. The multiplier does not change units.",
          },
          {
            id: "Kecocokan luas acuan adalah syarat definisi koefisien, bukan sekadar pilihan hitung. Hasil utama berikut berlaku dengan acuan vena yang sama untuk luas dan \\(C_d\\).",
            en: "Matching the reference areas is a condition on the coefficient definition, not just an arithmetic choice. The main result uses the same vena reference for area and \\(C_d\\).",
          },
        ],
        math: "Q_c=C_dQ_{i,c}=0.65(0.003678659)=0.002391129\\ \\mathrm{m^3/s}",
      },
      {
        title: {
          id: "d · Ubah debit volume menjadi debit massa",
          en: "d · Convert volume flow into mass flow",
        },
        body: [
          {
            id: "Setiap meter kubik air mempunyai massa 1000 kg menurut data soal. Kalikan volume per detik dengan massa per volume untuk mendapat massa per detik.",
            en: "Each cubic metre of water has a mass of 1000 kg under the supplied data. Multiply volume per second by mass per volume to obtain mass per second.",
          },
          {
            id: "Satuan m³ saling menghapus, menyisakan kg/s. Hasil 2,39113 kg/s memakai koefisien yang mengacu pada vena.",
            en: "The cubic-metre units cancel, leaving kg/s. The 2.39113 kg/s result uses a vena-referenced coefficient.",
          },
        ],
        math: "\\dot m_c=\\rho Q_c=1000(0.002391129)=2.391129\\ \\mathrm{kg/s}",
      },
      {
        title: {
          id: "Jangan mencampur dua definisi koefisien debit",
          en: "Do not mix two discharge-coefficient definitions",
        },
        body: [
          {
            id: "Pada definisi orifice meter yang lazim, \\(C_d\\) mengacu pada luas lubang \\(A_o\\) dan sudah merangkum kontraksi. Memakai koefisien itu lalu mengganti \\(A_o\\) dengan \\(C_cA_o\\) dapat menghitung kontraksi dua kali.",
            en: "Under the usual orifice-meter convention, \\(C_d\\) is referenced to hole area \\(A_o\\) and already includes contraction. Using that coefficient and also replacing \\(A_o\\) with \\(C_cA_o\\) can count contraction twice.",
          },
          {
            id: "Jika 0,65 pada naskah memakai definisi lubang, debit idealnya 0,00550942 m³/s dan debit massa nyatanya 3,58112 kg/s. Naskah tidak menetapkan acuan \\(C_d\\); karena itu, kita nyatakan kedua interpretasi secara terpisah. Nilainya tidak saling bertentangan setelah definisinya dijelaskan.",
            en: "If the printed 0.65 uses the hole-area convention, ideal flow is 0.00550942 m³/s and actual mass flow is 3.58112 kg/s. The exam leaves the \\(C_d\\) reference undefined, so the two interpretations are stated separately. They describe different coefficient conventions.",
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
        en: "The exam does not define Cd’s reference area. The main result uses A2 = Ac in the course formula; the standard hole-area alternative is also shown. The two results use different coefficient definitions.",
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
      id: "Sistem terdiri atas sensor tekanan, jembatan defleksi, penguat, lalu perekam. Setiap tahap memiliki sensitivitas K dan setengah lebar galat h. Sensor: \\(10^{-4}\\ \\Omega/\\mathrm{Pa}\\) dan 0,005 Ω. Jembatan: \\(4\\times10^{-2}\\ \\mathrm{mV}/\\Omega\\) dan \\(5\\times10^{-4}\\) mV. Penguat: \\(10^3\\ \\mathrm{mV}/\\mathrm{mV}\\) dan 0,5 mV. Perekam: 250 Pa/mV dan 100 Pa.\n\n\n(a) Perekam keliru disetel menjadi 225 Pa/mV. Hitung galat rata-rata untuk masukan 5000 Pa. (b) Hitung simpangan baku galat. Gunakan \\(\\bar O_i=K_i\\bar I_i\\) dan \\(\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+h_i^2/3\\).",
      en: "5. [20%] Accuracy of Measurement System.\n\nA pressure measurement system has four stages: pressure sensor, deflection bridge, amplifier, and recorder. The diagram places these stages in that order between the input and output.\nThe table gives linear sensitivities K and error bandwidths ±h:\nPressure sensor: \\(10^{-4}\\ \\Omega\\,\\mathrm{Pa}^{-1}\\), ±0.005 Ω.\nDeflection bridge: \\(4\\times10^{-2}\\ \\mathrm{mV}\\,\\Omega^{-1}\\), \\(\\pm5\\times10^{-4}\\ \\mathrm{mV}\\).\nAmplifier: \\(10^3\\ \\mathrm{mV}\\,\\mathrm{mV}^{-1}\\), ±0.5 mV.\nRecorder: \\(250\\ \\mathrm{Pa}\\,\\mathrm{mV}^{-1}\\), ±100 Pa.\n\n(a) [10%] The recorder has an incorrect sensitivity of 225 Pa mV⁻¹. Calculate the mean error \\(\\bar E\\) for an input pressure of \\(5\\times10^3\\) Pa.\n\n(b) [10%] Calculate the standard deviation \\(\\sigma_E\\) of the error distribution function.\nSupplied relations: \\(\\bar O_i=K_i\\bar I_i\\), \\(\\sigma_{I_{i+1}}^2=\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+h_i^2/3\\).",
    },
    steps: [
      {
        title: {
          id: "a · Ikuti besaran dari masukan ke keluaran",
          en: "a · Follow the quantity through the chain",
        },
        body: [
          {
            id: "Sistem mengubah tekanan menjadi hambatan, lalu tegangan, tegangan yang diperkuat, dan akhirnya angka tekanan pada perekam. **Sensitivitas** (perubahan keluaran per perubahan masukan) menghubungkan besaran pada tiap tahap. Kita ikuti satuannya agar galat tiap tahap sampai ke keluaran akhir.",
            en: "We follow pressure through resistance, voltage, amplified voltage, and finally the pressure reading. Each **sensitivity** is output change per input change. Tracking its units helps us refer each stage’s error to the final output.",
          },
          {
            id: "Untuk hubungan linear tanpa offset, sensitivitas total adalah hasil kali semua sensitivitas. Kita mulai dengan nilai nominal agar dapat melihat perubahan akibat perekam yang salah setel.",
            en: "For linear stages with no offset, total sensitivity is the product of the stage sensitivities. Start with nominal settings to see the effect of the recorder adjustment.",
          },
        ],
        math: "K_{\\mathrm{nom}}=(10^{-4})(0.04)(1000)(250)=1",
      },
      {
        title: {
          id: "a · Gunakan sensitivitas perekam yang benar-benar terpasang",
          en: "a · Use the recorder’s actual sensitivity",
        },
        body: [
          {
            id: "Bagian (a) mengganti sensitivitas perekam dari 250 menjadi 225 Pa/mV. Tiga tahap lain tetap. Perbandingan 225/250 = 0,9 membuat skala seluruh sistem juga menjadi 0,9 dari nominal.",
            en: "Part (a) changes recorder sensitivity from 250 to 225 Pa/mV. The other three stages stay fixed. Since 225/250 = 0.9, the whole-system scale becomes 0.9 of nominal.",
          },
          {
            id: "Perkalian satuan memberi Pa/Pa, sehingga sensitivitas total tidak bersatuan. Nilai 0,9 berarti alat membaca 90% dari tekanan masukan rata-rata.",
            en: "The product units reduce to Pa/Pa, so total sensitivity is dimensionless. A value of 0.9 means the mean reading is 90% of input pressure.",
          },
        ],
        math: "K_{\\mathrm{actual}}=(10^{-4}\\ \\Omega/\\mathrm{Pa})(0.04\\ \\mathrm{mV}/\\Omega)(1000)(225\\ \\mathrm{Pa}/\\mathrm{mV})=0.9",
      },
      {
        title: {
          id: "a · Hitung rata-rata keluaran tahap demi tahap",
          en: "a · Calculate the mean output stage by stage",
        },
        body: [
          {
            id: "Masukan 5000 Pa menghasilkan perubahan hambatan \\(10^{-4}(5000)=0{,}5\\ \\Omega\\). Jembatan mengubahnya menjadi 0,02 mV, lalu penguat menghasilkan 20 mV.",
            en: "A 5000 Pa input produces a resistance change of \\(10^{-4}(5000)=0.5\\ \\Omega\\). The bridge converts this to 0.02 mV, and the amplifier produces 20 mV.",
          },
          {
            id: "Perekam membaca \\(225(20)=4500\\) Pa. Perhitungan berurutan ini memberi hasil sama dengan sensitivitas total dan membantu memeriksa satuan setiap tahap.",
            en: "The recorder reads \\(225(20)=4500\\) Pa. This stage-by-stage calculation matches the total-gain result and checks the units at each stage.",
          },
        ],
        math: "5000\\ \\mathrm{Pa}\\ \\longrightarrow\\ 0.5\\ \\Omega\\ \\longrightarrow\\ 0.02\\ \\mathrm{mV}\\ \\longrightarrow\\ 20\\ \\mathrm{mV}\\ \\longrightarrow\\ 4500\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "a · Nyatakan tanda galat rata-rata",
          en: "a · State the sign of the mean error",
        },
        body: [
          {
            id: "Kita definisikan galat \\(E=O-I\\), keluaran dikurangi masukan sebenarnya. Pembacaan lebih kecil daripada masukan, sehingga galat rata-ratanya negatif.",
            en: "Define error as \\(E=O-I\\), indicated output minus true input. Since the reading is smaller, the mean error is negative.",
          },
          {
            id: "Hasil −500 Pa menyatakan bias: pusat sebaran pembacaan berada 500 Pa di bawah nilai benar. Ini bukan simpangan baku.",
            en: "The −500 Pa result is a bias: the centre of the reading distribution is 500 Pa below the true value. It is not a standard deviation.",
          },
        ],
        math: "\\bar E=\\bar O-I=4500-5000=-500\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "b · Pahami arti lebar galat ±h",
          en: "b · Interpret the error half-width ±h",
        },
        body: [
          {
            id: "Tabel memberi batas galat \\(-h_i\\) sampai \\(+h_i\\) pada keluaran tiap tahap. Rumus \\(h_i^2/3\\) yang disediakan mengasumsikan distribusi seragam dalam interval tersebut.",
            en: "The table gives error limits from \\(-h_i\\) to \\(+h_i\\) at each stage output. The supplied \\(h_i^2/3\\) formula assumes a uniform distribution over that interval.",
          },
          {
            id: "Untuk distribusi ini, varians adalah \\(h_i^2/3\\) dan simpangan bakunya \\(h_i/\\sqrt3\\). Kontribusi awal memakai Ω, mV, dan Pa. Kita perlu menyamakan satuannya sebelum menjumlahkannya.",
            en: "Its variance is \\(h_i^2/3\\), and its standard deviation is \\(h_i/\\sqrt3\\). The original contributions use Ω, mV, and Pa, so they cannot be added directly.",
          },
          {
            id: "**Distribusi seragam** (peluang yang sama untuk selang yang sama lebar) memodelkan galat antara kedua batas. Batas ±h bukan simpangan baku; keduanya harus dibedakan sebelum menjumlahkan galat.",
            en: "A **uniform distribution** assigns equal probability to equal-width intervals between the limits. The ±h limits are not a standard deviation; keep those quantities distinct before combining errors.",
          },
        ],
        math: "\\sigma_i^2=\\frac{h_i^2}{3}",
      },
      {
        title: {
          id: "b · Bawa galat sensor dan jembatan ke keluaran",
          en: "b · Refer sensor and bridge errors to the final output",
        },
        body: [
          {
            id: "Galat sensor sudah muncul setelah sensor. Galat tersebut hanya melewati jembatan, penguat, dan perekam. Kita tidak mengalikan sensitivitas sensor lagi.",
            en: "The sensor error already exists at the sensor output. It passes only through the bridge, amplifier, and recorder; do not multiply by sensor sensitivity again.",
          },
          {
            id: "Demikian pula, galat jembatan hanya melewati dua tahap setelahnya. Kita memakai sensitivitas aktual perekam 225 Pa/mV agar konsisten dengan bagian (a).",
            en: "Likewise, bridge error passes only through its two downstream stages. Use the actual recorder sensitivity of 225 Pa/mV to remain consistent with part (a).",
          },
        ],
        math: "\\begin{aligned}h_{1,o}&=0.005(0.04)(1000)(225)=45\\ \\mathrm{Pa}\\\\h_{2,o}&=0.0005(1000)(225)=112.5\\ \\mathrm{Pa}\\end{aligned}",
      },
      {
        title: {
          id: "b · Bawa dua galat terakhir ke satuan Pa",
          en: "b · Convert the last two errors to Pa",
        },
        body: [
          {
            id: "Galat penguat 0,5 mV masih melewati perekam, sehingga menjadi 112,5 Pa. Galat perekam ±100 Pa sudah memakai satuan keluaran dan tidak melewati penguat lagi.",
            en: "The amplifier’s 0.5 mV error still passes through the recorder, becoming 112.5 Pa. The recorder’s ±100 Pa error already has final-output units and undergoes no further gain.",
          },
          {
            id: "Keempat setengah lebar yang dapat dibandingkan sekarang adalah 45, 112,5, 112,5, dan 100 Pa. Besarnya ini adalah kontribusi ke pembacaan akhir, bukan batas asli komponen.",
            en: "The four comparable half-widths are now 45, 112.5, 112.5, and 100 Pa. They describe contributions at the final reading, not the components’ original limits.",
          },
        ],
        math: "h_{3,o}=0.5(225)=112.5\\ \\mathrm{Pa},\\qquad h_{4,o}=100\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "b · Jumlahkan varians, lalu ambil akar",
          en: "b · Add variances, then take the square root",
        },
        body: [
          {
            id: "Untuk galat tahap yang independen, varians kontribusinya menjumlah. Yang dijumlahkan adalah kuadrat simpangan baku, bukan setengah lebar atau simpangan bakunya langsung.",
            en: "For independent stage errors, contribution variances add. Add squared standard deviations, not the half-widths or standard deviations themselves.",
          },
          {
            id: "Masukan dianggap tetap, jadi sebaran galat sama dengan sebaran keluaran. Setelah menjumlahkan varians dalam Pa², ambil akar untuk kembali ke Pa.",
            en: "The input is fixed, so error spread equals output spread. After adding variances in Pa², take the square root to return to Pa.",
          },
          {
            id: "**Varians** (rata-rata kuadrat simpangan dari nilai tengah) mengukur sebaran. **Simpangan baku** (akar varians) mengembalikan ukuran sebaran ke satuan keluaran.",
            en: "**Variance** measures spread using the mean squared deviation from the mean. **Standard deviation** is the square root of variance, so it uses the original output unit.",
          },
        ],
        math: "\\sigma_E^2=\\frac{45^2+112.5^2+112.5^2+100^2}{3}=12445.8333\\ \\mathrm{Pa^2},\\qquad\\sigma_E=111.5609\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "Pisahkan bias, sebaran, dan asumsi setelan",
          en: "Separate bias, spread, and the recorder setting",
        },
        body: [
          {
            id: "Pembacaan berpusat pada 4500 Pa, dengan simpangan baku 111,56 Pa dalam model ini. Bias −500 Pa menggeser pusatnya; simpangan baku menggambarkan variasi di sekitar pusat tersebut. Menambah keduanya tidak menghasilkan simpangan baku baru.",
            en: "Readings centre on 4500 Pa with a standard deviation of 111.56 Pa under this model. The −500 Pa bias shifts the centre; standard deviation describes variation around it. Adding them does not produce a new standard deviation.",
          },
          {
            id: "Jika bagian (b) dianggap memakai perekam nominal 250 Pa/mV, hasilnya 120,76 Pa. Jawaban utama meneruskan setelan aktual 225 Pa/mV dari bagian (a); syarat itu perlu disebut agar dua hasil tidak tercampur.",
            en: "If part (b) instead uses the nominal 250 Pa/mV recorder, the result is 120.76 Pa. The main answer continues the actual 225 Pa/mV setting from part (a); state that condition to keep the two cases distinct.",
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
      id: "(a) Jelaskan cara kerja DC LVDT, yaitu Linear Variable Differential Transformer dengan antarmuka DC. Anda boleh memakai sketsa. (b) Bandingkan encoder absolut dan encoder inkremental. Anda boleh memakai sketsa keduanya.",
      en: "6. [10%] Position Sensor\n\n(a) [5%] Explain briefly how a DC LVDT (Direct Current Linear Variable Differential Transformer) works. You may include a sketch of the DC LVDT.\n\n(b) [5%] What are the differences between an absolute and an incremental encoder? You may include sketches of both encoders.",
    },
    steps: [
      {
        title: {
          id: "a · Identifikasi bagian yang bergerak pada LVDT",
          en: "a · Identify the moving part in the LVDT",
        },
        body: [
          {
            id: "**LVDT** (sensor dengan inti magnetik yang bergeser di dalam kumparan) mengukur perpindahan lurus inti. Kumparan primer menerima eksitasi dan dua kumparan sekunder menangkap perubahan medan. Inti yang bergeser mengubah kopling primer ke kedua sekunder.",
            en: "An **LVDT** has a magnetic core that slides inside windings. We use its induced voltages to measure the core’s linear displacement. The primary receives excitation and two secondary windings respond to its changing field. Core motion changes the coupling to each secondary.",
          },
          {
            id: "Kita tidak membaca posisi dari kontak geser pada kumparan. Kita membaca perubahan tegangan induksi ketika posisi inti berubah.",
            en: "Position is not read through a sliding contact on a winding. It is inferred from induced-voltage changes as the core moves.",
          },
        ],
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
          id: "a · Hubungkan selisih tegangan dengan arah perpindahan",
          en: "a · Relate voltage difference to displacement direction",
        },
        body: [
          {
            id: "Dua sekunder disusun saling mengurangi. Pada posisi tengah, koplingnya hampir sama sehingga \\(e_{s1}\\approx e_{s2}\\) dan keluaran selisih mendekati nol.",
            en: "The two secondaries connect in opposition. At the centre their coupling is nearly equal, so \\(e_{s1}\\approx e_{s2}\\) and differential output is near zero.",
          },
          {
            id: "Ketika inti bergerak ke satu sisi, satu tegangan naik dan yang lain turun. Besar selisih menunjukkan besar perpindahan; perubahan fase terhadap eksitasi membedakan kedua sisi titik nol.",
            en: "As the core moves to one side, one voltage rises and the other falls. Difference magnitude indicates displacement magnitude; phase relative to excitation distinguishes the two sides of null.",
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
          id: "a · Telusuri catu DC sampai keluaran DC",
          en: "a · Trace the DC supply to the DC output",
        },
        body: [
          {
            id: "Istilah DC LVDT merujuk antarmuka alat: catu masuk dan keluaran akhirnya berupa DC. Di dalam alat, osilator mengubah catu DC menjadi eksitasi AC untuk primer.",
            en: "DC LVDT describes the instrument interface: its supply and final output are DC. Internally, an oscillator converts the DC supply into AC excitation for the primary.",
          },
          {
            id: "Induksi tetap memerlukan perubahan medan magnet. Tegangan DC tetap yang langsung terhubung ke primer tidak menyediakan perubahan tersebut. Rangkaian DC LVDT harus mengubah DC menjadi eksitasi AC dahulu.",
            en: "Induction still requires a changing magnetic field. Applying steady DC directly to the primary therefore does not explain DC LVDT operation.",
          },
        ],
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
          id: "a · Mengapa keluaran perlu didemodulasi?",
          en: "a · Why must the output be demodulated?",
        },
        body: [
          {
            id: "Selisih sekunder masih berupa sinyal AC. Demodulator yang mengacu pada eksitasi membaca besar sekaligus tandanya, lalu penyaring mengurangi komponen AC agar keluaran DC mengikuti posisi.",
            en: "The secondary difference is still AC. An excitation-referenced demodulator recovers its signed magnitude; filtering then reduces AC components so the DC output follows position.",
          },
          {
            id: "Dekat pusat dalam rentang linear, \\(V_o\\approx Kx\\). Di sini \\(x\\) adalah perpindahan bertanda dan \\(K\\) adalah sensitivitas, misalnya V/mm. Hubungan linear ini tidak otomatis berlaku sampai semua posisi inti.",
            en: "Near null within the linear range, \\(V_o\\approx Kx\\). Here \\(x\\) is signed displacement and \\(K\\) is sensitivity, for example V/mm. The linear relation does not automatically hold at every core position.",
          },
        ],
        math: "V_o\\approx Kx",
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
          id: "b · Encoder inkremental membaca perubahan posisi",
          en: "b · An incremental encoder reads position changes",
        },
        body: [
          {
            id: "Pola berulang pada cakram atau skala menghasilkan pulsa ketika bergerak. Setiap pulsa mewakili perubahan posisi tertentu. Penghitung menjumlahkan perubahan itu dari suatu posisi awal.",
            en: "A repeating disk or scale pattern produces pulses during motion. Each pulse represents a position increment. A counter accumulates these increments from an initial position.",
          },
          {
            id: "Untuk memperoleh arah, kanal A dan B berselisih seperempat siklus. Urutan kanal yang mendahului berbalik saat arah gerak berbalik. Satu kanal saja memberi jumlah gerak, tetapi tidak membedakan arah secara unik.",
            en: "Channels A and B are a quarter-cycle apart to provide direction. Their leading order reverses with motion direction. One channel gives motion counts but cannot uniquely distinguish direction.",
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
          id: "b · Jelaskan akibat hilangnya acuan inkremental",
          en: "b · Explain the loss of an incremental reference",
        },
        body: [
          {
            id: "Nilai posisi bergantung pada posisi awal dan seluruh hitungan setelahnya. Jika penghitung kehilangan daya atau melewatkan pulsa, kode posisi yang benar tidak dapat dipulihkan hanya dari keadaan satu kanal saat diam.",
            en: "Position depends on the initial reference and every subsequent count. If the counter loses power or misses pulses, one stationary channel state cannot recover the correct position.",
          },
          {
            id: "**Homing** (gerak untuk mencari acuan mesin) memulihkan titik awal penghitung. Kanal Z dapat memberi tanda satu putaran, tetapi bukan kode unik untuk setiap posisi. Ia membantu mencari acuan, bukan mengganti seluruh informasi absolut.",
            en: "Homing finds the machine reference again. An index Z channel can mark one position per turn, but it is not a unique code for every position. It helps establish a reference rather than replacing all absolute information.",
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
          id: "b · Encoder absolut memberi kode untuk posisi saat ini",
          en: "b · An absolute encoder codes the current position",
        },
        body: [
          {
            id: "Encoder absolut memberi pola kode unik untuk tiap sektor dalam rentangnya. Sistem membaca kode yang sedang aktif; ia tidak perlu mengamati semua gerak sebelumnya untuk mengetahui posisi dalam satu putaran.",
            en: "An absolute encoder gives each sector in its range a unique code. The system reads the active code; it need not observe all prior motion to know the position within one turn.",
          },
          {
            id: "Dengan \\(n\\) bit, ada \\(2^n\\) kode. Jika satu putaran penuh dibagi merata, resolusinya \\(360^\\circ/2^n\\). Resolusi menyatakan langkah kode, bukan jaminan bahwa galat alat sekecil itu.",
            en: "With \\(n\\) bits there are \\(2^n\\) codes. If they divide a full turn uniformly, resolution is \\(360^\\circ/2^n\\). Resolution is code spacing, not a guarantee of equally small measurement error.",
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
      {
        title: {
          id: "b · Bedakan kode posisi dan jumlah putaran",
          en: "b · Distinguish angle code from turn count",
        },
        body: [
          {
            id: "**Kode Gray** (susunan kode dengan satu bit berubah antarposisi bersebelahan) mengurangi ambiguitas pembacaan saat peralihan. Kode Gray tidak menambah jumlah posisi dengan sendirinya.",
            en: "Gray code is often used so only one bit changes between neighbouring positions. This reduces readout ambiguity at code transitions; it does not by itself add more positions.",
          },
          {
            id: "Encoder absolut single-turn mengidentifikasi sudut dalam satu putaran. Untuk mengetahui jumlah putaran penuh, sistem memerlukan kemampuan multiturn. Istilah “absolut” belum menjamin bahwa sistem menyimpan seluruh riwayat putaran.",
            en: "A single-turn absolute encoder identifies angle within one turn. Knowing completed turns requires multiturn capability. “Absolute” therefore does not always mean that the full turn history is retained.",
          },
        ],
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
    id: "concept-2024-01",
    topic: "temperature",
    difficulty: "reasoning",
    prompt: {
      id: "Sambungan ukur termokopel tipe J berada pada suhu tetap. Sambungan referensinya menghangat, tetapi perangkat tetap memakai kompensasi referensi lama. Dalam rentang tabel yang tegangannya naik terhadap suhu, apa yang paling mungkin terjadi?",
      en: "A type J measuring junction stays at a constant temperature. Its reference junction warms, but the device keeps using the old reference compensation. Within the table range where voltage rises with temperature, what is most likely?",
    },
    options: [
      {
        id: "Tegangan turun dan perangkat dapat menafsirkan suhu ukur terlalu rendah.",
        en: "Voltage falls and the device can report a measuring temperature that is too low.",
      },
      {
        id: "Tegangan naik karena kedua sambungan menambah tegangan dengan tanda sama.",
        en: "Voltage rises because both junctions add voltage with the same sign.",
      },
      {
        id: "Tegangan tetap karena hanya suhu sambungan ukur yang memengaruhinya.",
        en: "Voltage stays fixed because only the measuring junction affects it.",
      },
      {
        id: "Tegangan turun, sehingga suhu benda pasti turun dengan besar yang sama.",
        en: "Voltage falls, proving that the object temperature fell by the same amount.",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Termokopel membaca selisih kontribusi kedua sambungan. Referensi yang lebih hangat mengurangi tegangan pada suhu ukur yang tetap. Kompensasi lama menambahkan tegangan referensi terlalu kecil, sehingga hasil suhu dapat terlalu rendah.",
      en: "A thermocouple reads the difference between the two junction contributions. A warmer reference reduces voltage at unchanged measuring temperature. Old compensation adds too little reference voltage, so the inferred temperature can be too low.",
    },
    optionExplanations: [
      {
        id: "Benar. Tegangan referensi naik dan mengurangi selisih terukur; kompensasi harus mengikuti suhu referensi baru.",
        en: "Correct. Higher reference voltage reduces the measured difference; compensation must track the new reference temperature.",
      },
      {
        id: "Kedua kontribusi dikurangkan menurut polaritas rangkaian, bukan dijumlahkan dengan tanda sama.",
        en: "The junction contributions subtract under the circuit polarity; they do not add with the same sign.",
      },
      {
        id: "Tegangan bergantung pada suhu ukur dan suhu referensi. Mengabaikan referensi mengubah arti pembacaan.",
        en: "Voltage depends on both measuring and reference temperatures. Ignoring the reference changes the reading’s interpretation.",
      },
      {
        id: "Soal menetapkan suhu benda tetap. Perubahan sambungan referensi dapat mengubah pembacaan tanpa perubahan suhu benda.",
        en: "The object temperature is fixed in the scenario. Reference changes can alter the reading without any object-temperature change.",
      },
    ],
    sourceQuestionId: "2024-uts2-q1",
  },
  {
    id: "concept-2024-02",
    topic: "temperature",
    difficulty: "reasoning",
    prompt: {
      id: "Sebuah termistor dikalibrasi dengan model \\(R=\\alpha e^{\\beta/\\theta}\\), dengan \\(\\theta\\) dalam kelvin. Seorang siswa memasukkan angka suhu Celsius ke model yang sama tanpa mengubah konstanta. Penilaian mana yang tepat?",
      en: "A thermistor is calibrated with \\(R=\\alpha e^{\\beta/\\theta}\\), where \\(\\theta\\) is in kelvin. A student inserts numerical Celsius temperatures into the same model without changing its constants. Which assessment is correct?",
    },
    options: [
      {
        id: "Hasil tetap sama karena selisih satu kelvin sama dengan selisih satu derajat Celsius.",
        en: "The result is unchanged because one-kelvin and one-degree-Celsius increments are equal.",
      },
      {
        id: "Langkah itu benar jika hambatan ditulis dalam kilo-ohm.",
        en: "It is correct if resistance is expressed in kilohms.",
      },
      {
        id: "Langkah itu salah karena model memakai kebalikan suhu mutlak; pergantian titik nol mengubah nilai \\(\\beta/\\theta\\).",
        en: "It is wrong because the model uses reciprocal absolute temperature; changing the zero point changes \\(\\beta/\\theta\\).",
      },
      {
        id: "Langkah itu hanya salah pada suhu di bawah 0°C; pada suhu positif kedua skala dapat ditukar.",
        en: "It is wrong only below 0°C; the scales are interchangeable at positive temperatures.",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Selisih suhu mempunyai besar yang sama pada kedua skala, tetapi nilai suhu dan kebalikannya tidak sama. Konstanta model berasal dari data dalam kelvin. Memasukkan Celsius mengubah model, bahkan memberi pembagian dengan nol pada 0°C.",
      en: "Temperature differences have the same size on both scales, but numerical temperatures and their reciprocals differ. The model constants were fitted using kelvin. Inserting Celsius changes the model and even creates division by zero at 0°C.",
    },
    optionExplanations: [
      {
        id: "Kesamaan selisih suhu tidak membuat \\(1/\\theta\\) sama. Di sini \\(\\theta\\) berada di penyebut, bukan hanya sebagai selisih suhu.",
        en: "Equal temperature increments do not make \\(1/\\theta\\) equal. Here \\(\\theta\\) appears in a denominator, not merely as a temperature difference.",
      },
      {
        id: "Satuan hambatan memengaruhi skala \\(\\alpha\\), bukan titik nol skala suhu. Mengganti Ω menjadi kΩ tidak memperbaiki suhu yang salah.",
        en: "Resistance units affect the scale of \\(\\alpha\\), not the temperature zero point. Changing Ω to kΩ cannot correct the wrong temperature scale.",
      },
      {
        id: "Benar. Konversikan suhu ke kelvin sebelum memakai model dan konstanta kalibrasinya.",
        en: "Correct. Convert temperature to kelvin before using the model and its calibrated constants.",
      },
      {
        id: "Nilai Celsius dan kelvin tetap berbeda pada suhu positif. Masalahnya adalah penggunaan skala yang tidak sesuai dengan model.",
        en: "Celsius and kelvin values still differ at positive temperatures. The issue is using a scale inconsistent with the model.",
      },
    ],
    sourceQuestionId: "2024-uts1-q1",
  },
  {
    id: "concept-2024-03",
    topic: "flow",
    difficulty: "applied",
    prompt: {
      id: "Pitot pada garis tengah pipa memberi kecepatan lokal. Seorang siswa langsung mengalikan kecepatan itu dengan seluruh luas pipa. Untuk profil aliran yang kecepatannya menurun menuju dinding, bagaimana menilai langkah tersebut?",
      en: "A centreline Pitot tube gives local speed. A student immediately multiplies it by the whole pipe area. For a velocity profile that decreases toward the wall, how should this step be judged?",
    },
    options: [
      {
        id: "Terlalu rendah, karena luas dekat dinding belum dihitung.",
        en: "Too low, because the area near the wall has not been counted.",
      },
      {
        id: "Terlalu tinggi, karena debit memerlukan kecepatan rata-rata penampang.",
        en: "Too high, because flow rate requires the cross-sectional mean speed.",
      },
      {
        id: "Tepat, karena kontinuitas membuat kecepatan sama di semua titik penampang.",
        en: "Correct, because continuity makes speed equal everywhere across a section.",
      },
      {
        id: "Tidak berpengaruh, karena faktor profil hanya mengubah tekanan statis.",
        en: "It makes no difference, because the profile factor changes only static pressure.",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Kecepatan pusat lebih tinggi daripada rata-rata pada profil yang diberikan. Memakainya untuk seluruh luas menganggap bagian dekat dinding bergerak secepat pusat. Gunakan hubungan profil yang sesuai, lalu cek Reynolds untuk memastikan pilihan profil konsisten.",
      en: "Centreline speed exceeds the mean for the stated profile. Applying it over the entire area assumes near-wall fluid moves as fast as the centre. Use an appropriate profile relation and check Reynolds number for consistency.",
    },
    optionExplanations: [
      {
        id: "Seluruh luas sudah dikalikan. Masalahnya adalah kecepatan yang terlalu besar untuk mewakili seluruh luas itu.",
        en: "The whole area is already included. The problem is that the selected speed is too large to represent all of it.",
      },
      {
        id: "Benar. Debit adalah penjumlahan kontribusi kecepatan lokal di seluruh penampang, yang setara dengan luas kali kecepatan rata-rata.",
        en: "Correct. Flow rate sums local-speed contributions over the section, equivalent to area times mean speed.",
      },
      {
        id: "Kontinuitas menyamakan debit antarpenampang dalam aliran tunak, bukan kecepatan setiap titik di satu penampang.",
        en: "Continuity matches flow rate between sections in steady flow, not speeds at every point within one section.",
      },
      {
        id: "Faktor profil menghubungkan kecepatan pusat dengan kecepatan rata-rata, sehingga langsung memengaruhi debit.",
        en: "The profile factor links centreline speed to mean speed and therefore directly affects flow rate.",
      },
    ],
    sourceQuestionId: "2024-uts2-q3",
  },
  {
    id: "concept-2024-04",
    topic: "systems",
    difficulty: "reasoning",
    prompt: {
      id: "Pada transduser gaya dengan umpan balik negatif, perubahan catu menaikkan penguatan jalur maju. Gaya masuk dan penguatan jalur umpan balik tetap. Jika penguatan loop sudah besar, mengapa keluaran berubah jauh lebih kecil daripada perubahan penguatan maju?",
      en: "In a negative-feedback force transducer, a supply change raises forward-path gain. Input force and feedback gain stay fixed. With an already large loop gain, why does output change much less than the forward gain?",
    },
    options: [
      {
        id: "Penguatan total selalu sama dengan hasil kali penguatan maju dan umpan balik.",
        en: "Total gain always equals forward gain multiplied by feedback gain.",
      },
      {
        id: "Kenaikan keluaran memperbesar gaya penyeimbang, sehingga mengurangi gaya galat yang masuk ke jalur maju.",
        en: "An output rise increases balancing force, reducing the error force applied to the forward path.",
      },
      {
        id: "Umpan balik membuat penguatan maju sama sekali tidak memengaruhi keluaran pada semua kondisi.",
        en: "Feedback makes forward gain completely irrelevant under every condition.",
      },
      {
        id: "Penguat membatasi keluaran pada tegangan tetap, sehingga besar gaya tidak lagi terbaca.",
        en: "The amplifier clamps output at a fixed voltage, so force magnitude is no longer measured.",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Jalur negatif mengurangi gaya penyeimbang dari gaya masukan. Saat keluaran naik, gaya penyeimbang juga naik dan menahan perubahan lebih lanjut. Pada loop gain besar, penguatan tertutup mendekati kebalikan penguatan umpan balik, tetapi ketergantungan pada jalur maju belum tepat nol.",
      en: "Negative feedback subtracts balancing force from input force. As output rises, balancing force rises and restrains further change. At high loop gain, closed-loop gain approaches the inverse feedback gain, but forward-gain dependence is not exactly zero.",
    },
    optionExplanations: [
      {
        id: "Hasil kali itu adalah loop gain. Penguatan masukan dan keluaran tertutup juga memuat penyebut dari pengurangan umpan balik.",
        en: "That product is loop gain. Closed-loop input and output gain also includes the denominator arising from feedback subtraction.",
      },
      {
        id: "Benar. Respons gaya penyeimbang menekan kepekaan terhadap perubahan jalur maju, selama loop bekerja sesuai model.",
        en: "Correct. Balancing-force response suppresses sensitivity to forward-path changes while the loop operates within its model.",
      },
      {
        id: "Kebal terhadap perubahan penguatan hanya pendekatan saat loop gain besar. Pada gain terbatas masih ada perubahan keluaran.",
        en: "Gain insensitivity is an approximation at large loop gain. A finite gain still permits some output change.",
      },
      {
        id: "Pembatasan atau saturasi bukan mekanisme yang dinyatakan. Sistem tetap mengukur perubahan gaya melalui keseimbangan umpan balik.",
        en: "Clamping or saturation is not the stated mechanism. The system still measures force through feedback balance.",
      },
    ],
    sourceQuestionId: "2024-uts1-q3",
  },
  {
    id: "concept-2024-05",
    topic: "flow",
    difficulty: "reasoning",
    prompt: {
      id: "Sebuah tabel Cd sudah dikalibrasi terhadap luas lubang pelat orifis dan mencakup kontraksi jet. Seseorang memakai Cd itu, lalu mengganti luas lubang dengan Cc kali luas lubang untuk “menambah ketelitian”. Apa masalah utamanya?",
      en: "A Cd table is calibrated using the orifice-plate hole area and already includes jet contraction. Someone uses that Cd, then replaces hole area with Cc times hole area to “improve accuracy”. What is the main problem?",
    },
    options: [
      {
        id: "Cc mempunyai satuan luas, sehingga tidak boleh dipakai dalam rumus debit.",
        en: "Cc has area units, so it cannot appear in a flow equation.",
      },
      {
        id: "Koreksi tambahan selalu membuat hasil lebih akurat jika debitnya menjadi lebih kecil.",
        en: "Extra correction always improves accuracy if it produces a smaller flow rate.",
      },
      {
        id: "Kontraksi dapat dihitung dua kali karena definisi luas dan koefisien tidak lagi sesuai.",
        en: "Contraction can be counted twice because the area and coefficient definitions no longer match.",
      },
      {
        id: "Cd seharusnya dikalikan dengan diameter, bukan debit.",
        en: "Cd should multiply diameter rather than flow rate.",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Koefisien empiris terikat pada definisi perhitungan ideal yang dipakai saat kalibrasi. Jika Cd sudah mencakup kontraksi dengan acuan luas lubang, memperkecil luas lagi dapat menggandakan koreksi. Model berbasis vena memerlukan koefisien dengan acuan yang sesuai.",
      en: "An empirical coefficient is tied to the ideal calculation used in its calibration. If hole-based Cd already includes contraction, reducing area again can duplicate that correction. A vena-based model needs a coefficient referenced consistently.",
    },
    optionExplanations: [
      {
        id: "Cc adalah rasio dua luas, sehingga tidak bersatuan. Masalahnya bukan satuan Cc, melainkan pencampuran definisi.",
        en: "Cc is a ratio of two areas and is dimensionless. The problem is inconsistent definitions, not Cc units.",
      },
      {
        id: "Nilai yang lebih kecil belum tentu lebih dekat ke kenyataan. Koreksi harus mengikuti model dan kalibrasinya.",
        en: "A smaller value is not necessarily closer to reality. Corrections must follow the model and calibration.",
      },
      {
        id: "Benar. Periksa definisi luas acuan sebelum menggabungkan Cd dan Cc.",
        en: "Correct. Check the reference-area definition before combining Cd and Cc.",
      },
      {
        id: "Cd didefinisikan sebagai rasio debit nyata terhadap debit ideal. Ia tidak mengubah diameter secara langsung.",
        en: "Cd is defined as actual flow divided by ideal flow. It does not directly change diameter.",
      },
    ],
    sourceQuestionId: "2024-uas-q4",
  },
  {
    id: "concept-2024-06",
    topic: "calibration",
    difficulty: "applied",
    prompt: {
      id: "Saat suhu lingkungan berubah, seluruh kurva kalibrasi arus dan tekanan bergeser ke atas dengan jumlah arus yang sama. Kemiringan kurva tetap. Dalam model gangguan, perubahan mana yang paling sesuai?",
      en: "When ambient temperature changes, an entire current and pressure calibration curve shifts upward by the same current amount. Its slope stays fixed. Which disturbance change best describes this?",
    },
    options: [
      {
        id: "Sensitivitas terhadap tekanan meningkat, sedangkan keluaran nol tetap.",
        en: "Pressure sensitivity increases while zero output stays fixed.",
      },
      {
        id: "Offset keluaran berubah, sedangkan sensitivitas terhadap tekanan tetap.",
        en: "Output offset changes while pressure sensitivity stays fixed.",
      },
      {
        id: "Resolusi alat meningkat, sehingga kurva tampak lebih tinggi.",
        en: "Instrument resolution increases, making the curve appear higher.",
      },
      {
        id: "Hanya nonlinearitas bertambah, karena setiap perubahan lingkungan pasti melengkungkan kurva.",
        en: "Only nonlinearity increases, because any environmental change must bend the curve.",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Pergeseran yang sama pada semua masukan menambah suku keluaran yang tidak bergantung pada tekanan. Pergeseran tersebut mengubah offset. Perubahan sensitivitas akan membuat selisih keluaran bertambah atau berkurang bersama tekanan.",
      en: "An equal shift at every input adds an output term independent of pressure. The uniform shift changes the offset. A sensitivity change would make the output difference vary with pressure.",
    },
    optionExplanations: [
      {
        id: "Jika sensitivitas berubah, jarak dua kurva bergantung pada tekanan. Itu bertentangan dengan pergeseran yang sama pada semua titik.",
        en: "A sensitivity change makes curve separation depend on pressure, contradicting the equal shift at all points.",
      },
      {
        id: "Benar. Kurva bergeser tanpa berubah kemiringan, sehingga perubahan masuk sebagai gangguan titik nol.",
        en: "Correct. The curve translates without changing slope, so the effect is a zero-shift disturbance.",
      },
      {
        id: "Resolusi adalah perubahan terkecil yang dapat dibedakan. Pergeseran kurva kalibrasi tidak membuktikan perubahan resolusi.",
        en: "Resolution is the smallest distinguishable change. A calibration-curve shift does not establish a resolution change.",
      },
      {
        id: "Pergeseran seluruh kurva tidak dengan sendirinya mengubah lengkungannya. Nonlinearitas memerlukan perbandingan bentuk terhadap garis acuan.",
        en: "Translating a whole curve does not by itself change its curvature. Nonlinearity concerns its shape relative to a reference line.",
      },
    ],
    sourceQuestionId: "2024-uas-q1",
  },
  {
    id: "concept-2024-07",
    topic: "signal",
    difficulty: "reasoning",
    prompt: {
      id: "Jembatan RTD pada gambar diberi catu di simpul kiri dan kanan, sementara voltmeter menghubungkan simpul atas dan bawah. Sebelum menghitung keluaran, tindakan mana yang paling tepat?",
      en: "An RTD bridge is supplied across its left and right nodes, while a voltmeter connects the upper and lower nodes. What is the best action before calculating output?",
    },
    options: [
      {
        id: "Telusuri dua jalur dari simpul catu tinggi ke rendah, hitung kedua titik tengah, lalu tetapkan polaritas selisihnya.",
        en: "Trace both paths from high to low supply, calculate their midpoints, then define the difference polarity.",
      },
      {
        id: "Gunakan rumus hafalan untuk catu atas dan bawah tanpa mengubah pasangan resistor.",
        en: "Use a memorised top-to-bottom supply formula without changing resistor pairings.",
      },
      {
        id: "Gabungkan semua resistor sebagai satu rangkaian seri agar arusnya sama.",
        en: "Combine all resistors into one series circuit so they carry the same current.",
      },
      {
        id: "Anggap voltmeter selalu membaca nol karena rangkaian berbentuk jembatan.",
        en: "Assume the voltmeter always reads zero because the circuit is a bridge.",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Hubungan listrik ditentukan sambungan, bukan arah gambar di kertas. Dengan voltmeter berimpedansi tinggi, jalur atas dan bawah masing-masing menjadi pembagi tegangan. Keluaran adalah selisih kedua simpul dengan polaritas yang dinyatakan.",
      en: "Electrical connections, not orientation on paper, determine the circuit. With a high-impedance voltmeter, upper and lower paths each form a voltage divider. Output is their midpoint difference under the stated polarity.",
    },
    optionExplanations: [
      {
        id: "Benar. Cara ini mempertahankan sambungan asli dan menunjukkan asal pembilang serta penyebut pembagi tegangan.",
        en: "Correct. This preserves the actual wiring and explains the numerator and denominator of each divider.",
      },
      {
        id: "Rumus umum hanya benar jika pemetaan resistor dan simpul sesuai. Mengabaikan catu yang berbeda dapat memasangkan lengan yang salah.",
        en: "A general formula is valid only with the correct resistor and node mapping. Ignoring the supply orientation can pair the wrong arms.",
      },
      {
        id: "Ada dua jalur paralel antara simpul catu, sehingga seluruh resistor tidak membawa satu arus seri yang sama.",
        en: "There are two parallel paths between supply nodes, so all resistors do not carry one common series current.",
      },
      {
        id: "Bentuk jembatan tidak menjamin seimbang. Perubahan RTD justru membuat beda potensial untuk dibaca pada deflection mode.",
        en: "A bridge shape does not guarantee balance. RTD change creates the potential difference read in deflection mode.",
      },
    ],
    sourceQuestionId: "2024-uas-q2",
  },
  {
    id: "concept-2024-08",
    topic: "dynamics",
    difficulty: "reasoning",
    prompt: {
      id: "Sensor dipanaskan dalam air, lalu dipindahkan kembali ke udara. Koefisien perpindahan panas air lebih besar daripada udara. Pada saat perpindahan, suhu sensor belum persis sama dengan suhu air. Model mana yang tepat?",
      en: "A sensor heats in water and is then returned to air. Water has a larger heat-transfer coefficient than air. At transfer, the sensor has not exactly reached water temperature. Which model is appropriate?",
    },
    options: [
      {
        id: "Pendinginan dimulai tepat dari suhu air, berapa pun lama sensor berada di dalam air.",
        en: "Cooling starts exactly at water temperature regardless of immersion duration.",
      },
      {
        id: "Pendinginan harus memakai konstanta waktu air karena sensor yang dipakai tetap sama.",
        en: "Cooling must use the water time constant because the sensor itself is unchanged.",
      },
      {
        id: "Suhu keluaran langsung meloncat ke suhu udara karena lingkungan sudah berubah.",
        en: "Output temperature immediately jumps to air temperature because the environment changed.",
      },
      {
        id: "Suhu keluaran tetap kontinu, dimulai dari nilai saat dipindah, lalu mendekati suhu udara dengan konstanta waktu udara.",
        en: "Output temperature stays continuous, starts from its transfer-time value, and approaches air temperature with the air time constant.",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Sensor menyimpan energi panas, sehingga perubahan lingkungan tidak membuat suhu sensor meloncat seketika. Kondisi awal pendinginan adalah suhu akhir fase pemanasan. Konstanta waktu bergantung pada lingkungan melalui perpindahan panas; udara memberi respons lebih lambat pada data ini.",
      en: "The sensor stores thermal energy, so changing its surroundings cannot instantly jump its temperature. Cooling starts from the temperature reached at the end of heating. The time constant depends on environmental heat transfer; air gives a slower response in this case.",
    },
    optionExplanations: [
      {
        id: "Sensor hanya mendekati suhu air selama pemanasan. Gunakan nilai yang benar-benar dicapai pada waktu perpindahan.",
        en: "The sensor only approaches water temperature during heating. Use the value actually reached at transfer.",
      },
      {
        id: "Konstanta waktu juga memuat koefisien perpindahan panas. Mengganti medium mengubah parameter itu meskipun massa sensor tetap.",
        en: "The time constant also includes the heat-transfer coefficient. Changing medium changes that parameter even if sensor mass stays fixed.",
      },
      {
        id: "Lingkungan dapat berubah mendadak, tetapi kapasitas panas sensor membuat suhu keluarannya berubah bertahap.",
        en: "The surroundings can change abruptly, but the sensor’s heat capacity makes its temperature change gradually.",
      },
      {
        id: "Benar. Respons harus tersambung kontinu dan memakai konstanta waktu yang sesuai dengan medium pada tiap fase.",
        en: "Correct. The response must join continuously and use the time constant appropriate to each medium.",
      },
    ],
    sourceQuestionId: "2024-uts1-q4",
  },
  {
    id: "concept-2024-09",
    topic: "statistics",
    difficulty: "reasoning",
    prompt: {
      id: "Salah setel penguatan membuat rata-rata alat selalu lebih rendah daripada tekanan benar. Pengukuran berulang juga menunjukkan sebaran acak. Apa yang dapat dicapai dengan merata-ratakan banyak pengukuran independen pada setelan yang sama?",
      en: "A gain misadjustment makes an instrument’s mean reading lower than true pressure. Repeated readings also show random spread. What can averaging many independent readings at that same setting accomplish?",
    },
    options: [
      {
        id: "Menghilangkan bias dan sebaran sekaligus karena galat positif dan negatif selalu saling menghapus.",
        en: "Remove both bias and spread because positive and negative errors always cancel.",
      },
      {
        id: "Memperbaiki sensitivitas alat secara otomatis tanpa kalibrasi atau koreksi.",
        en: "Automatically correct instrument sensitivity without calibration or correction.",
      },
      {
        id: "Mengubah simpangan baku menjadi sama dengan nilai mutlak bias.",
        en: "Make standard deviation equal to the absolute bias.",
      },
      {
        id: "Mengurangi sebaran rata-rata sampel, tetapi tidak menghilangkan bias akibat penguatan.",
        en: "Reduce the spread of the sample mean, but not remove the gain-induced bias.",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Galat acak yang independen dapat membuat rata-rata semakin stabil saat jumlah data bertambah. Namun, semua data masih berpusat pada nilai yang salah akibat setelan penguatan. Kita perlu memperbaiki setelan atau menerapkan koreksi untuk mengatasi bias tersebut.",
      en: "Independent random errors can make the mean more stable as sample size grows. All readings still centre on the wrong value caused by the gain setting. Correcting the setting or applying a calibration correction is needed to address that bias.",
    },
    optionExplanations: [
      {
        id: "Pembatalan acak tidak menghapus pergeseran sistematis yang sama pada semua pengukuran.",
        en: "Random cancellation does not remove a systematic shift shared by all readings.",
      },
      {
        id: "Rata-rata adalah pengolahan data, bukan perubahan penguatan rangkaian. Sensitivitas salah tetap memerlukan koreksi.",
        en: "Averaging processes data; it does not change circuit gain. Incorrect sensitivity still requires correction.",
      },
      {
        id: "Bias mengukur pergeseran pusat, sedangkan simpangan baku mengukur sebaran. Tidak ada aturan yang menyamakan keduanya.",
        en: "Bias measures a centre shift; standard deviation measures spread. No rule makes them equal.",
      },
      {
        id: "Benar. Ketidakpastian acak rata-rata dapat turun, sedangkan pusat distribusinya tetap bergeser.",
        en: "Correct. Random uncertainty of the mean can decrease while its distribution remains shifted.",
      },
    ],
    sourceQuestionId: "2024-uas-q5",
  },
  {
    id: "concept-2024-10",
    topic: "position",
    difficulty: "foundation",
    prompt: {
      id: "Sebuah DC LVDT menerima catu DC dan menghasilkan tegangan DC yang mengikuti posisi inti. Pernyataan mana yang menjelaskan cara kerjanya dengan tepat?",
      en: "A DC LVDT accepts a DC supply and produces a DC voltage that follows core position. Which statement correctly explains its operation?",
    },
    options: [
      {
        id: "Rangkaian internal membuat eksitasi AC, lalu mendemodulasi selisih sekunder menjadi keluaran DC.",
        en: "Internal circuitry creates AC excitation, then demodulates the secondary difference into a DC output.",
      },
      {
        id: "Primer menerima DC tetap dan terus menginduksi tegangan sekunder tanpa perubahan medan.",
        en: "The primary receives steady DC and continuously induces secondary voltage without a changing field.",
      },
      {
        id: "Dua tegangan sekunder dijumlahkan agar arah perpindahan selalu terlihat dari nilainya.",
        en: "The two secondary voltages are added so direction is always evident from the result.",
      },
      {
        id: "Inti menggeser kontak listrik sehingga LVDT bekerja seperti potensiometer.",
        en: "The core moves an electrical contact, so the LVDT works like a potentiometer.",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Istilah DC LVDT menjelaskan catu dan keluaran pada antarmuka. Proses induksi di dalamnya tetap memerlukan medan yang berubah, sehingga primer memakai AC. Selisih sekunder serta demodulasi yang peka fase mempertahankan besar dan tanda perpindahan.",
      en: "DC LVDT describes supply and output at the interface. Internal induction still needs a changing field, so the primary uses AC. Differential secondary sensing and phase-sensitive demodulation retain displacement magnitude and sign.",
    },
    optionExplanations: [
      {
        id: "Benar. Rangkaian ini memungkinkan antarmuka DC sambil mempertahankan prinsip transformator AC di dalamnya.",
        en: "Correct. The circuitry provides a DC interface while retaining internal AC transformer operation.",
      },
      {
        id: "DC tetap tidak terus menghasilkan induksi setelah kondisi transien berakhir. Eksitasi AC menyediakan perubahan medan yang diperlukan.",
        en: "Steady DC does not sustain induction after the transient ends. AC excitation supplies the required changing field.",
      },
      {
        id: "Sekunder disusun saling mengurangi. Selisih dan fase terhadap eksitasi, bukan jumlah amplitudo saja, memberi informasi posisi bertanda.",
        en: "The secondaries connect in opposition. Their difference and phase relative to excitation provide signed position, not the amplitude sum alone.",
      },
      {
        id: "LVDT membaca perubahan kopling magnetik; ia tidak memerlukan kontak geser untuk membaca posisi inti.",
        en: "An LVDT senses magnetic-coupling changes; it needs no sliding contact to read core position.",
      },
    ],
    sourceQuestionId: "2024-uas-q6",
  },
];

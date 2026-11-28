import type { ExamQuestion } from "./types";

export const questionsUts12023: ExamQuestion[] = [
  {
    id: "2023-uts1-q1",
    year: 2023,
    exam: "uts1",
    number: 1,
    title: {
      id: "Peran elemen dalam sistem ukur",
      en: "Roles of measurement-system elements",
    },
    topic: "systems",
    source: {
      url: "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
      file: "2023-uts1.pdf",
      pages: [1],
    },
    originalLanguage: "en",
    original:
      "1. [10%] Elements of Measurement System\nClassify the following elements as sensing elements, signal conditioning elements, signal processing elements, or data presentation elements.\na. Strain gauge\nb. Thermocouple\nc. Wheatstone bridge\nd. Low Pass Filter\ne. Operational amplifier\nf. Current to voltage converter\ng. Frequency to voltage converter\nh. Accelerometer\ni. Microcontroller\nj. LCD",
    prompt: {
      id: "Kelompokkan tiap elemen menurut peran utamanya: sensor, pengondisi sinyal, pengolah sinyal, atau penyaji data. Daftarnya: (a) strain gauge; (b) termokopel; (c) jembatan Wheatstone; (d) low-pass filter; (e) penguat operasional. Lanjutkan dengan (f) pengubah arus ke tegangan; (g) pengubah frekuensi ke tegangan; (h) akselerometer; (i) mikrokontroler; (j) LCD.",
      en: "Classify each element by its main role: sensing, signal conditioning, signal processing, or data presentation. (a) Strain gauge; (b) thermocouple; (c) Wheatstone bridge; (d) low-pass filter; (e) operational amplifier; (f) current-to-voltage converter; (g) frequency-to-voltage converter; (h) accelerometer; (i) microcontroller; (j) LCD.",
    },
    steps: [
      {
        title: {
          id: "Ikuti fungsi tiap elemen, bukan hanya nama alatnya",
          en: "Follow each element's function rather than its name",
        },
        body: [
          {
            id: "Sensor pertama kali merespons besaran fisik yang ingin diukur. Pengondisi sinyal menyiapkan sinyal sensor agar tahap berikutnya dapat membacanya, misalnya dengan memperbesar atau mengubah bentuk listriknya.",
            en: "A sensing element first responds to the physical quantity being measured. Signal conditioning prepares its output for the next stage, for example by amplification or conversion to another electrical form.",
          },
          {
            id: "Pengolah sinyal melakukan operasi pada data, seperti memakai persamaan kalibrasi untuk menghitung nilai ukur. Penyaji data membuat hasil dapat dibaca pengguna, misalnya sebagai angka pada layar.",
            en: "Signal processing operates on data, such as applying a calibration equation to calculate the measured value. Data presentation makes the result readable to the user, for example as digits on a display.",
          },
          {
            id: "Satu perangkat lengkap dapat menggabungkan beberapa fungsi. Pada soal ini, kita mengelompokkan elemen berdasarkan fungsi utama yang disebut dalam rantai ukur dasar.",
            en: "A complete device can combine several functions. Here, classify each named element by its main role in a basic measurement chain.",
          },
        ],
      },
      {
        title: {
          id: "a, b, h · Elemen yang langsung merespons besaran fisik",
          en: "a, b, h · Elements that directly respond to physical quantities",
        },
        body: [
          {
            id: "Strain gauge merespons regangan melalui perubahan tahanan. Termokopel merespons keadaan suhu pada dua sambungannya melalui tegangan termoelektrik. Keduanya merupakan elemen sensor.",
            en: "A strain gauge responds to strain through resistance change. A thermocouple responds to the temperatures of its two junctions through thermoelectric voltage. Both are sensing elements.",
          },
          {
            id: "Akselerometer merespons percepatan dan memberi sinyal yang terkait dengannya. Walau produk akselerometer dapat memiliki rangkaian pengondisi di dalamnya, peran utamanya di sini tetap sensor percepatan.",
            en: "An accelerometer responds to acceleration and produces a related signal. A complete accelerometer may contain conditioning electronics, but its main role here remains acceleration sensing.",
          },
        ],
      },
      {
        title: {
          id: "c, e · Ubah dan perbesar sinyal sensor",
          en: "c, e · Convert and amplify a sensor signal",
        },
        body: [
          {
            id: "Jembatan Wheatstone dapat mengubah perubahan tahanan kecil menjadi beda tegangan. Besaran regangan atau suhu lebih dulu mengubah sensor; jembatan membaca perubahan listrik tersebut.",
            en: "A Wheatstone bridge can turn a small resistance change into a voltage difference. Strain or temperature first changes the sensor; the bridge reads that electrical change.",
          },
          {
            id: "Penguat operasional, atau op-amp, dapat memperbesar tegangan kecil atau menyangga sinyal agar tahap berikutnya tidak banyak membebaninya. Dalam penggunaan ini, jembatan dan op-amp merupakan pengondisi sinyal.",
            en: "An operational amplifier, or op-amp, can amplify a small voltage or buffer a signal against loading by the next stage. In these uses, the bridge and op-amp are signal conditioners.",
          },
        ],
      },
      {
        title: {
          id: "d, f, g · Saring dan ubah bentuk listrik sinyal",
          en: "d, f, g · Filter and convert electrical signal form",
        },
        body: [
          {
            id: "Low-pass filter meneruskan komponen frekuensi rendah dan melemahkan komponen yang lebih tinggi. Dalam rangkaian pembacaan sensor, fungsi ini membantu menyiapkan sinyal sebelum pengolahan berikutnya.",
            en: "A low-pass filter passes low-frequency components and attenuates higher-frequency components. In a sensor readout circuit, this prepares the signal for later processing.",
          },
          {
            id: "Pengubah arus ke tegangan dan pengubah frekuensi ke tegangan membuat sinyal cocok dengan masukan tahap berikutnya. Keduanya mengubah bentuk sinyal yang sudah ada, sehingga termasuk pengondisi sinyal.",
            en: "Current-to-voltage and frequency-to-voltage converters make an existing signal compatible with the next stage's input. Both change its electrical representation, so they are signal conditioners.",
          },
          {
            id: "Klasifikasi filter bergantung konteks. Filter analog pada rantai ini dikelompokkan sebagai pengondisi; algoritma filter yang bekerja pada sampel digital juga dapat dibahas sebagai pengolahan sinyal.",
            en: "Filter classification depends on context. The analog filter in this chain is treated as conditioning; a filtering algorithm acting on digital samples may instead be discussed as signal processing.",
          },
        ],
        note: {
          id: "Kategori ini mengikuti fungsi rangkaian. Filter analog dan konverter frekuensi-ke-tegangan dapat ditempatkan berbeda dalam kerangka kuliah lain. Jika konverter hanya mengubah bentuk listrik sinyal, ia berperan sebagai pengondisi. Jika kerangka kuliah menempatkan penentuan frekuensi atau pemetaan pulsa ke nilai ukur sebagai pengolahan, elemen g dapat disebut pengolah. Jelaskan fungsi yang dipakai sebagai dasar label.",
          en: "These categories follow circuit function. An analog filter or frequency-to-voltage converter may be placed differently in another course framework. Conversion of electrical signal form is conditioning here. If the course treats frequency extraction or mapping pulses to a measured value as processing, item g can be called a processing element. State the function underlying the label.",
        },
      },
      {
        title: {
          id: "i · Olah data dengan mikrokontroler",
          en: "i · Process data with a microcontroller",
        },
        body: [
          {
            id: "Mikrokontroler menjalankan program pada pembacaan yang masuk. Program dapat mengubah kode ADC menjadi tegangan, menerapkan kalibrasi, mengurangi offset, atau menghitung rata-rata.",
            en: "A microcontroller executes a program on incoming readings. It can convert ADC codes to voltage, apply calibration, remove an offset, or calculate an average.",
          },
          {
            id: "Operasi tersebut memberi makna atau memperbaiki bentuk data ukur, sehingga mikrokontroler masuk pengolah sinyal. Kemampuannya mengendalikan LCD tidak mengubah peran utama yang dimaksud soal.",
            en: "Those operations interpret or transform measurement data, so the microcontroller is a signal-processing element. Its ability to control an LCD does not change the main role intended here.",
          },
        ],
      },
      {
        title: {
          id: "j · Sajikan hasil dengan LCD",
          en: "j · Present the result with an LCD",
        },
        body: [
          {
            id: "LCD menampilkan angka, satuan, atau informasi hasil ukur. Pengguna membaca hasil melalui tampilan tersebut, sehingga LCD termasuk penyaji data.",
            en: "An LCD displays values, units, or other measurement information. It lets the user read the result, so it is a data-presentation element.",
          },
          {
            id: "LCD tidak harus mengetahui bagaimana sensor menghasilkan sinyal. Ia menerima hasil yang sudah disiapkan oleh tahap lain untuk ditampilkan.",
            en: "The LCD need not know how the sensor produced its signal. It receives a result prepared by other stages for display.",
          },
        ],
      },
      {
        title: {
          id: "Cocokkan seluruh elemen dengan kelompoknya",
          en: "Match every element to its group",
        },
        body: [
          {
            id: "Klasifikasi lengkap di bawah mengikuti fungsi utama pada rantai ukur dasar. Untuk elemen yang dapat menjalankan banyak fungsi, penjelasan peran lebih kuat daripada menghafal satu label tanpa konteks.",
            en: "The complete classification below follows each element's main function in a basic measurement chain. For elements with multiple possible functions, explaining the role is more useful than memorising a label without context.",
          },
        ],
        table: {
          headers: [
            {
              id: "Butir",
              en: "Item",
            },
            {
              id: "Elemen",
              en: "Element",
            },
            {
              id: "Kelompok / Group",
              en: "Kelompok / Group",
            },
          ],
          rows: [
            ["a", "Strain gauge", "Sensor / Sensing"],
            ["b", "Thermocouple", "Sensor / Sensing"],
            ["c", "Wheatstone bridge", "Pengondisi / Conditioning"],
            ["d", "Low-pass filter", "Pengondisi / Conditioning"],
            ["e", "Operational amplifier", "Pengondisi / Conditioning"],
            ["f", "Current-to-voltage converter", "Pengondisi / Conditioning"],
            [
              "g",
              "Frequency-to-voltage converter",
              "Pengondisi / Conditioning",
            ],
            ["h", "Accelerometer", "Sensor / Sensing"],
            ["i", "Microcontroller", "Pengolah / Processing"],
            ["j", "LCD", "Penyaji / Presentation"],
          ],
        },
      },
    ],
    answer: {
      id: "Sensor: a, b, h. Pengondisi sinyal: c, d, e, f, g. Pengolah sinyal: i. Penyaji data: j. Low-pass filter diklasifikasikan sebagai pengondisi analog dalam konteks rantai ini. Untuk d dan g, jelaskan fungsi rangkaiannya karena batas pengondisi dan pengolah dapat berbeda menurut kerangka.",
      en: "Sensing: a, b, h. Signal conditioning: c, d, e, f, g. Signal processing: i. Data presentation: j. The low-pass filter is classified as analog conditioning in this chain. For d and g, explain circuit function because boundaries between conditioning and processing can differ across frameworks.",
    },
    assumptions: [
      {
        id: "Klasifikasi memakai peran utama dalam sistem ukur dasar. Perangkat terpadu dan filter digital dapat mencakup lebih dari satu fungsi.",
        en: "Classification uses the primary role in a basic measurement chain. Integrated devices and digital filters can span multiple functions.",
      },
      {
        id: "Istilah pengondisi dan pengolah tidak selalu dibatasi dengan cara yang sama antar-kerangka. Untuk filter dan konverter frekuensi, jawaban harus menyertakan fungsi rangkaian, bukan menyatakan satu label berlaku pada semua implementasi.",
        en: "Conditioning and processing boundaries vary across frameworks. For filters and frequency converters, explain the circuit's function instead of treating one label as universal across implementations.",
      },
    ],
    visual: {
      kind: "system",
      params: {
        mode: "elements",
      },
      caption: {
        id: "Ikuti urutan besaran fisik, sensor, pengondisi, pengolah, dan tampilan.",
        en: "Follow the physical quantity through sensing, conditioning, processing, and display.",
      },
    },
  },
  {
    id: "2023-uts1-q2",
    year: 2023,
    exam: "uts1",
    number: 2,
    title: {
      id: "Kalibrasi gaya pada suhu dan catu berbeda",
      en: "Force calibration at different temperatures and supplies",
    },
    topic: "calibration",
    source: {
      url: "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
      file: "2023-uts1.pdf",
      pages: [1],
    },
    originalLanguage: "en",
    original:
      "2. [40%] Systematic Characteristic of Measurement Systems\nA calibration process is conducted to find the systematic characteristic of a strain-gauge-based force measurement system under three different conditions. Condition I is considered as a standard, where the ambient temperature is kept constant at \\(T=20^\\circ\\mathrm C\\) and the power supply is set at \\(V_s=10\\) volts. Under Condition II, the temperature is set at \\(T=25^\\circ\\mathrm C\\) and the power supply is set at \\(V_s=10\\) volts. Under Condition III, the temperature is set at \\(T=20^\\circ\\mathrm C\\) and the power supply is set at \\(V_s=12\\) volts. The results are summarized in the following table.\nInput in kgf: 0, 10, 20, 30, 40, 50.\nCondition I, output in volts: 0.00, 0.11, 0.23, 0.34, 0.42, 0.50.\nCondition II, output in volts: 0.02, 0.11, 0.25, 0.36, 0.44, 0.52.\nCondition III, output in volts: 0.00, 0.13, 0.27, 0.40, 0.50, 0.60.\na. [10%] If the model of ideal system is \\(O=KI+a\\), where O denotes output in volts and I denotes input in kgf, find K and a.\nb. [10%] Find interfering constant \\(K_I\\) and interfering input \\(I_I\\).\nc. [10%] Find modifying constant \\(K_M\\) and modifying input \\(I_M\\).\nd. [10%] Find maximum nonlinearity of the system in percentage of F.S.D. (Full Scale Displacement).",
    prompt: {
      id: "Sensor gaya berbasis strain gauge diuji pada tiga kondisi: I (standar), \\(T=20^\\circ\\mathrm C,\\ V_s=10\\ \\mathrm V\\); II, \\(T=25^\\circ\\mathrm C,\\ V_s=10\\ \\mathrm V\\); III, \\(T=20^\\circ\\mathrm C,\\ V_s=12\\ \\mathrm V\\). Masukan gaya (kgf): 0, 10, 20, 30, 40, 50. Keluaran (V): I = 0.00; 0.11; 0.23; 0.34; 0.42; 0.50. II = 0.02; 0.11; 0.25; 0.36; 0.44; 0.52. III = 0.00; 0.13; 0.27; 0.40; 0.50; 0.60. (a) Cari K dan a pada garis ideal \\(O=KI+a\\). (b) Cari konstanta pengganggu \\(K_I\\) dan masukan \\(I_I\\). (c) Cari konstanta pemodifikasi \\(K_M\\) dan masukan \\(I_M\\). (d) Cari nonlinearitas maksimum sebagai persen F.S.D.",
      en: "A strain-gauge force sensor is calibrated under three conditions: I (standard), \\(T=20^\\circ\\mathrm C,\\ V_s=10\\ \\mathrm V\\); II, \\(T=25^\\circ\\mathrm C,\\ V_s=10\\ \\mathrm V\\); III, \\(T=20^\\circ\\mathrm C,\\ V_s=12\\ \\mathrm V\\). Force inputs (kgf): 0, 10, 20, 30, 40, 50. Outputs (V): I = 0.00, 0.11, 0.23, 0.34, 0.42, 0.50. Condition II = 0.02, 0.11, 0.25, 0.36, 0.44, 0.52. Condition III = 0.00, 0.13, 0.27, 0.40, 0.50, 0.60. (a) Find K and a in ideal line \\(O=KI+a\\). (b) Find interfering constant \\(K_I\\) and input \\(I_I\\). (c) Find modifying constant \\(K_M\\) and input \\(I_M\\). (d) Find maximum nonlinearity as a percentage of F.S.D.",
    },
    steps: [
      {
        title: {
          id: "2a · Pilih garis acuan dan satuannya",
          en: "2a · Choose the reference line and its units",
        },
        body: [
          {
            id: "Masukan I adalah gaya dalam kgf; kgf merupakan satuan gaya, bukan massa dalam kg. Keluaran O adalah tegangan dalam volt. Kemiringan K karena itu memiliki satuan V/kgf, sedangkan a memiliki satuan V.",
            en: "Input I is force in kgf; kgf is a force unit rather than mass in kg. Output O is voltage in volts. Slope K therefore has units V/kgf, while a has units V.",
          },
          {
            id: "Kondisi I adalah acuan standar. Kita memakai garis yang melalui dua titik ujungnya untuk mendefinisikan garis ideal. Pilihan ini perlu dinyatakan karena garis regresi dapat memberi koefisien yang berbeda.",
            en: "Condition I is the standard reference. We use the line through its two endpoints to define the ideal line. State this choice because regression can produce different coefficients.",
          },
        ],
        math: "O_{\\rm ideal}=KI+a,\\qquad (I_{\\min},O_{\\min})=(0,0),\\quad(I_{\\max},O_{\\max})=(50,0.50)",
      },
      {
        title: {
          id: "Hitung K dan a dari dua titik ujung",
          en: "Calculate K and a from the endpoints",
        },
        body: [
          {
            id: "Keluaran naik 0.50 V ketika gaya naik 50 kgf. Kita bagi kenaikan keluaran dengan kenaikan gaya untuk memperoleh sensitivitas garis ideal.",
            en: "Output rises 0.50 V over a force rise of 50 kgf. We divide output increase by force increase to obtain ideal-line sensitivity.",
          },
          {
            id: "Pada I=0, suku KI nol dan keluaran sama dengan a. Tabel memberi O=0 V pada kondisi standar, sehingga a=0 V.",
            en: "At I=0, the KI term vanishes and output equals a. The standard table gives O=0 V, so a=0 V.",
          },
        ],
        math: "K=\\frac{0.50-0}{50-0}=\\boxed{0.010\\ \\mathrm{V/kgf}},\\qquad a=\\boxed{0\\ \\mathrm V}",
      },
      {
        title: {
          id: "Definisikan dua masukan lingkungan terhadap kondisi standar",
          en: "Define environmental inputs relative to standard conditions",
        },
        body: [
          {
            id: "Suhu dan catu bukan gaya yang ingin diukur, tetapi keduanya dapat mengubah keluaran. Untuk memisahkan pengaruhnya, nyatakan keduanya sebagai perubahan dari keadaan standar.",
            en: "Temperature and supply are not the measured force, but both can affect output. Express them as changes from standard conditions to separate their effects.",
          },
          {
            id: "Kita pilih \\(I_I=T-20^\\circ\\mathrm C\\) untuk pengaruh yang menggeser keluaran nol, dan \\(I_M=V_s-10\\ \\mathrm V\\) untuk pengaruh yang mengubah sensitivitas. Pilihan ini akan diperiksa dari garis ujung kondisi II dan III.",
            en: "We choose \\(I_I=T-20^\\circ\\mathrm C\\) for the effect shifting zero output, and \\(I_M=V_s-10\\ \\mathrm V\\) for the effect changing sensitivity. The endpoint lines of conditions II and III will test this interpretation.",
          },
        ],
        math: "O=(K+K_MI_M)I+a+K_II_I,\\qquad I_I=T-20^\\circ\\mathrm C,\\quad I_M=V_s-10\\ \\mathrm V",
      },
      {
        title: {
          id: "2b · Gunakan kondisi II untuk membaca pergeseran nol",
          en: "2b · Use condition II to identify zero shift",
        },
        body: [
          {
            id: "Pada kondisi II, catu tetap tetapi suhu naik 5°C. Garis ujungnya melewati (0,0.02) dan (50,0.52), sehingga kemiringannya tetap (0.52−0.02)/50=0.010 V/kgf.",
            en: "In condition II, supply stays fixed while temperature rises by 5°C. Its endpoint line joins (0,0.02) and (50,0.52), so the slope remains (0.52−0.02)/50=0.010 V/kgf.",
          },
          {
            id: "Keluaran nol naik 0.02 V. Kita bagi kenaikan ini dengan 5°C untuk memperoleh KI. Masukan pengganggu berupa perubahan suhu 5°C pada kondisi II dan nol pada kondisi standar.",
            en: "Zero output rises by 0.02 V. We divide by 5°C to obtain KI. The interfering input is a 5°C temperature change in condition II and zero at standard conditions.",
          },
        ],
        math: "K_I=\\frac{0.02-0}{25-20}=\\boxed{0.004\\ \\mathrm{V/{}^\\circ C}},\\qquad I_I=5^\\circ\\mathrm C\\ \\text{(II)}",
      },
      {
        title: {
          id: "2c · Gunakan kondisi III untuk membaca perubahan sensitivitas",
          en: "2c · Use condition III to identify sensitivity change",
        },
        body: [
          {
            id: "Pada kondisi III, suhu tetap tetapi catu naik 2 V. Keluaran nol masih 0 V, sedangkan keluaran pada 50 kgf menjadi 0.60 V. Kemiringan garis ujung kini 0.012 V/kgf.",
            en: "In condition III, temperature stays fixed while supply rises by 2 V. Zero output remains 0 V, while output at 50 kgf becomes 0.60 V. Endpoint slope is now 0.012 V/kgf.",
          },
          {
            id: "Kita bagi perubahan kemiringan 0.002 V/kgf dengan perubahan catu 2 V. KM menyatakan perubahan sensitivitas per volt perubahan catu, bukan penambahan tegangan keluaran yang sama untuk semua gaya.",
            en: "We divide the slope change of 0.002 V/kgf by the 2 V supply change. KM describes sensitivity change per supply volt rather than an equal additive output voltage at every force.",
          },
        ],
        math: "K_{\\rm III}=\\frac{0.60}{50}=0.012\\ \\mathrm{V/kgf},\\qquad K_M=\\frac{0.012-0.010}{12-10}=\\boxed{0.001\\ \\mathrm{V/(kgf\\,V)}},\\qquad I_M=2\\ \\mathrm V\\ \\text{(III)}",
      },
      {
        title: {
          id: "Periksa model pada tiga kondisi",
          en: "Check the model under all three conditions",
        },
        body: [
          {
            id: "Pada kondisi standar, kedua masukan lingkungan nol sehingga model kembali menjadi O=0.010I. Kenaikan suhu saja menambah 0.020 V pada garis. Kenaikan catu saja mengubah kemiringan menjadi 0.012 V/kgf.",
            en: "At standard conditions both environmental inputs vanish, returning O=0.010I. Temperature rise alone adds 0.020 V to the line. Supply rise alone changes slope to 0.012 V/kgf.",
          },
          {
            id: "Model ini merangkum garis ujung tanpa memaksa semua titik data tepat pada garis. Pada kondisi II, data 10 kgf tercetak 0.11 V. Kita mempertahankan angka itu meskipun tidak cocok dengan pergeseran seragam pada titik tersebut.",
            en: "The model describes endpoint lines without forcing every datum onto its line. Condition II at 10 kgf is printed as 0.11 V. We retain that value despite its departure from a uniform shift at that point.",
          },
        ],
        math: "O_{\\rm line}=[0.010+0.001(V_s-10)]I+0.004(T-20)",
      },
      {
        title: {
          id: "2d · Hitung jarak data standar dari garis ideal",
          en: "2d · Find standard-data departures from the ideal line",
        },
        body: [
          {
            id: "Nonlinearitas adalah jarak data terhadap garis lurus acuannya. Untuk kondisi I, hitung keluaran garis 0.010I pada tiap gaya, lalu kurangi nilai itu dari data.",
            en: "Nonlinearity is departure from the reference straight line. For condition I, calculate line output 0.010I at each force, then subtract it from the measured output.",
          },
          {
            id: "Pada 30 kgf, garis memberi 0.30 V dan data memberi 0.34 V. Selisihnya 0.04 V. Tabel menunjukkan bahwa inilah besar selisih maksimum di antara titik yang tersedia.",
            en: "At 30 kgf, the line gives 0.30 V and the datum is 0.34 V. The difference is 0.04 V. The table shows this is the largest departure among the supplied points.",
          },
        ],
        math: "N(I)=O_{\\rm data}(I)-0.010I",
        table: {
          headers: [
            {
              id: "I (kgf)",
              en: "I (kgf)",
            },
            {
              id: "Data (V)",
              en: "Data (V)",
            },
            {
              id: "Garis (V)",
              en: "Line (V)",
            },
            {
              id: "Selisih (V)",
              en: "Deviation (V)",
            },
          ],
          rows: [
            ["0", "0.00", "0.00", "0.00"],
            ["10", "0.11", "0.10", "0.01"],
            ["20", "0.23", "0.20", "0.03"],
            ["30", "0.34", "0.30", "0.04"],
            ["40", "0.42", "0.40", "0.02"],
            ["50", "0.50", "0.50", "0.00"],
          ],
        },
      },
      {
        title: {
          id: "Nyatakan nonlinearitas sebagai persen span",
          en: "Express nonlinearity as a percentage of span",
        },
        body: [
          {
            id: "F.S.D. pada perhitungan ini adalah span keluaran penuh: 0.50−0=0.50 V. Kita membagi selisih maksimum 0.04 V dengan span itu, bukan dengan nilai gaya atau keluaran pada titik 30 kgf.",
            en: "For this calculation, F.S.D. is full output span: 0.50−0=0.50 V. We divide the maximum departure of 0.04 V by that span rather than by force or output at 30 kgf.",
          },
          {
            id: "Satuan volt saling menghapus, lalu perkalian 100% memberi 8%. Nilai itu menggambarkan ketidaklurusan terhadap garis ujung, bukan seluruh sumber galat sensor.",
            en: "The volt units cancel; multiplying by 100% gives 8%. This describes departure from the endpoint line rather than every source of sensor error.",
          },
        ],
        math: "N_{\\max}=0.04\\ \\mathrm V,\\qquad \\%N_{\\max}=\\frac{0.04}{0.50}\\times100\\%=\\boxed{8.0\\%\\ \\mathrm{F.S.D.}}",
      },
      {
        title: {
          id: "Cek apakah kondisi lain mengubah kesimpulan maksimum",
          en: "Check whether the other conditions change the maximum",
        },
        body: [
          {
            id: "Jika bagian terakhir dimaksudkan mencakup semua kondisi, gunakan garis ujung masing-masing. Kondisi II juga memiliki selisih maksimum 0.04 V dan span 0.50 V, sehingga 8%.",
            en: "If the final part is intended to cover all conditions, use each condition's own endpoint line. Condition II also has maximum deviation 0.04 V and span 0.50 V, giving 8%.",
          },
          {
            id: "Kondisi III memiliki selisih maksimum 0.04 V terhadap garis 0.012I, tetapi spannya 0.60 V, sehingga sekitar 6.67%. Dengan kedua penafsiran tersebut, maksimum yang dilaporkan tetap 8%.",
            en: "Condition III has maximum deviation 0.04 V from 0.012I, but its span is 0.60 V, giving about 6.67%. Either interpretation therefore leaves the reported maximum at 8%.",
          },
        ],
      },
    ],
    answer: {
      id: "Dengan garis ujung: K=0.010 V/kgf dan a=0 V. Pengaruh suhu: II=T−20°C, KI=0.004 V/°C. Pengaruh catu: IM=Vs−10 V, KM=0.001 V/(kgf·V). Nonlinearitas maksimum 8.0% F.S.D.",
      en: "Using endpoint lines: K=0.010 V/kgf and a=0 V. Temperature effect: II=T−20°C, KI=0.004 V/°C. Supply effect: IM=Vs−10 V, KM=0.001 V/(kgf·V). Maximum nonlinearity is 8.0% F.S.D.",
    },
    answerMath:
      "\\boxed{\\begin{aligned}K&=0.010\\ \\mathrm{V/kgf},&a&=0\\\\K_I&=0.004\\ \\mathrm{V/{}^\\circ C},&K_M&=0.001\\ \\mathrm{V/(kgf\\,V)}\\\\N_{\\max}&=8.0\\%\\ \\mathrm{F.S.D.}\\end{aligned}}",
    assumptions: [
      {
        id: "Garis ideal menggunakan titik ujung karena soal tidak menetapkan metode regresi. Masukan lingkungan dinyatakan sebagai perubahan dari 20°C dan 10 V.",
        en: "The ideal lines use endpoints because the question does not prescribe regression. Environmental inputs are deviations from 20°C and 10 V.",
      },
      {
        id: "Angka 0.11 V pada kondisi II, masukan 10 kgf, mengikuti tabel cetak. Model garis tidak dipaksa melewati semua data.",
        en: "The 0.11 V value for condition II at 10 kgf follows the printed table. The linear model is not forced through every datum.",
      },
    ],
    visual: {
      kind: "calibration",
      caption: {
        id: "Bandingkan titik nol, kemiringan garis ujung, dan jarak tiap data dari garisnya.",
        en: "Compare zero output, endpoint-line slope, and each datum's departure from its line.",
      },
      params: {
        xs: [0, 10, 20, 30, 40, 50],
        ys: [0, 0.11, 0.23, 0.34, 0.42, 0.5],
        yAmbient: [0.02, 0.11, 0.25, 0.36, 0.44, 0.52],
        ySupply: [0, 0.13, 0.27, 0.4, 0.5, 0.6],
        xUnit: "kgf",
        yUnit: "V",
        slope: 0.01,
        intercept: 0,
      },
    },
  },
  {
    id: "2023-uts1-q3",
    year: 2023,
    exam: "uts1",
    number: 3,
    title: {
      id: "Sebaran keluaran akibat variasi sensitivitas dan offset",
      en: "Output spread from sensitivity and offset variation",
    },
    topic: "statistics",
    source: {
      url: "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
      file: "2023-uts1.pdf",
      pages: [1, 2],
    },
    originalLanguage: "en",
    original:
      "3. [10%] Statistical Characteristic of Measurement Systems\nA temperature sensor is modeled by \\(V=KT+a\\), where V is output in volts, T is measured temperature in °C, where as K and a are constants. Due to imperfection in manufacturing process, the sensors are varied with statistical properties listed below. If the manufacturing process is assumed to be a normal process, calculate the average of output voltage \\(\\bar V\\) and the standard deviation of the output voltage \\(\\sigma_V\\). Let the temperature being measured is \\(T=100^\\circ\\mathrm C\\).\n\\(\\bar K=0.02,\\ \\sigma_K=0.001,\\ \\bar a=-0.001,\\ \\sigma_a=1.5\\times10^{-4}\\).",
    prompt: {
      id: "Sensor suhu mengikuti \\(V=KT+a\\). Akibat variasi produksi, \\(\\bar K=0.02,\\ \\sigma_K=0.001,\\ \\bar a=-0.001,\\ \\sigma_a=1.5\\times10^{-4}\\). V dalam volt dan T dalam °C. Dengan proses produksi diasumsikan normal dan suhu yang diukur \\(T=100^\\circ\\mathrm C\\), cari rata-rata tegangan \\(\\bar V\\) serta simpangan bakunya \\(\\sigma_V\\).",
      en: "A temperature sensor follows \\(V=KT+a\\). Manufacturing variation gives \\(\\bar K=0.02,\\ \\sigma_K=0.001,\\ \\bar a=-0.001,\\ \\sigma_a=1.5\\times10^{-4}\\). V is in volts and T in °C. Assuming a normal manufacturing process and measured temperature \\(T=100^\\circ\\mathrm C\\), find mean output voltage \\(\\bar V\\) and standard deviation \\(\\sigma_V\\).",
    },
    steps: [
      {
        title: {
          id: "Tentukan besaran yang tetap dan yang bervariasi",
          en: "Identify fixed and varying quantities",
        },
        body: [
          {
            id: "Suhu masukan tetap pada 100°C. Yang berbeda dari satu sensor ke sensor lain adalah K, yaitu sensitivitas, dan a, yaitu offset. Jadi sebaran keluaran berasal dari variasi produksi kedua parameter itu.",
            en: "Input temperature is fixed at 100°C. Sensitivity K and offset a vary between manufactured sensors. Output spread therefore arises from manufacturing variation in those two parameters.",
          },
          {
            id: "Garis di atas simbol, seperti \\(\\bar K\\), berarti rata-rata. Simbol \\(\\sigma_K\\), dibaca sigma K, berarti simpangan baku K. Keluaran V memakai volt, sehingga satuan K adalah V/°C dan satuan a adalah V.",
            en: "A bar over a symbol, such as \\(\\bar K\\), denotes a mean. The symbol \\(\\sigma_K\\), read sigma K, denotes K's standard deviation. Since V is in volts, K has units V/°C and a has units V.",
          },
        ],
        math: "\\bar K=0.02\\ \\mathrm{V/{}^\\circ C},\\quad\\sigma_K=0.001\\ \\mathrm{V/{}^\\circ C},\\quad\\bar a=-0.001\\ \\mathrm V,\\quad\\sigma_a=0.00015\\ \\mathrm V",
      },
      {
        title: {
          id: "Gunakan linearitas rata-rata",
          en: "Use linearity of the mean",
        },
        body: [
          {
            id: "Rata-rata penjumlahan sama dengan jumlah rata-rata. Nilai T tetap, sehingga kita dapat mengeluarkannya dari operasi rata-rata.",
            en: "The mean of a sum equals the sum of the means. Since T is fixed, it can be taken outside the averaging operation.",
          },
          {
            id: "Langkah ini tidak memerlukan K dan a saling bebas. Korelasi akan berpengaruh pada varians, tetapi tidak mengubah rumus rata-rata linear ini.",
            en: "This step does not require K and a to be independent. Correlation affects variance but does not alter this linear mean relation.",
          },
        ],
        math: "\\bar V=\\overline{KT+a}=T\\bar K+\\bar a",
      },
      {
        title: {
          id: "Hitung tegangan rata-rata",
          en: "Calculate the mean voltage",
        },
        body: [
          {
            id: "Bagian sensitivitas memberi 0.02×100=2.000 V. Offset rata-rata bernilai −0.001 V, sehingga mengurangi keluaran rata-rata menjadi 1.999 V.",
            en: "The sensitivity term contributes 0.02×100=2.000 V. Mean offset is −0.001 V, lowering mean output to 1.999 V.",
          },
          {
            id: "Tanda negatif pada offset menyatakan arah pergeseran pusat data. Simpangan baku offset tetap positif karena menyatakan besar sebaran, bukan arah.",
            en: "The negative offset indicates the direction of the mean shift. Offset standard deviation remains positive because it describes spread rather than direction.",
          },
        ],
        math: "\\bar V=100(0.02)+(-0.001)=\\boxed{1.999\\ \\mathrm V}",
      },
      {
        title: {
          id: "Tulis varians sebelum menggabungkan simpangan baku",
          en: "Write variance before combining standard deviations",
        },
        body: [
          {
            id: "Varians adalah kuadrat simpangan baku. Ketika sebuah variabel dikali T, simpangan bakunya dikali |T| dan variansnya dikali T².",
            en: "Variance is standard deviation squared. Multiplying a variable by T multiplies its standard deviation by |T| and its variance by T².",
          },
          {
            id: "Untuk penjumlahan \\(TK+a\\), rumus umum juga memuat kovarians. Kovarians menjelaskan apakah sensor dengan K lebih besar cenderung memiliki a yang lebih besar atau lebih kecil.",
            en: "For the sum \\(TK+a\\), the general formula also includes covariance. Covariance describes whether sensors with larger K tend to have larger or smaller a.",
          },
        ],
        math: "\\sigma_V^2=T^2\\sigma_K^2+\\sigma_a^2+2T\\,\\operatorname{Cov}(K,a)",
      },
      {
        title: {
          id: "Nyatakan asumsi yang diperlukan oleh data soal",
          en: "State the assumption required by the available data",
        },
        body: [
          {
            id: "Soal tidak memberi kovarians atau korelasi K dengan a. Untuk memperoleh satu jawaban numerik, kita mengambil kovarians nol, misalnya jika kedua variasi saling bebas.",
            en: "The question gives no covariance or correlation between K and a. To obtain one numerical answer, assume zero covariance, as would hold for independent variations.",
          },
          {
            id: "Distribusi normal saja tidak menjamin kedua parameter saling bebas. Jika keduanya berkorelasi, rata-rata tetap 1.999 V tetapi simpangan baku perlu informasi tambahan.",
            en: "Normal distributions alone do not make the two parameters independent. If they are correlated, the mean remains 1.999 V, but standard deviation needs additional information.",
          },
        ],
        math: "\\operatorname{Cov}(K,a)=0\\quad\\Rightarrow\\quad\\sigma_V^2=T^2\\sigma_K^2+\\sigma_a^2",
      },
      {
        title: {
          id: "Samakan kedua kontribusi ke satuan volt",
          en: "Put both uncertainty contributions into volts",
        },
        body: [
          {
            id: "Variasi sensitivitas menjadi variasi tegangan setelah dikali suhu tetap 100°C. Kontribusi simpangan bakunya 100×0.001=0.100 V.",
            en: "Sensitivity variation becomes voltage variation after multiplication by the fixed 100°C temperature. Its standard-deviation contribution is 100×0.001=0.100 V.",
          },
          {
            id: "Offset sudah memiliki satuan volt, sehingga kontribusinya tetap 0.00015 V. Kita menggabungkan kuadrat kedua kontribusi ini, bukan langsung menjumlahkan simpangan bakunya.",
            en: "Offset already has units volts, so its contribution remains 0.00015 V. Combine the squares of these contributions rather than adding standard deviations directly.",
          },
        ],
        math: "T\\sigma_K=0.100\\ \\mathrm V,\\qquad\\sigma_a=0.00015\\ \\mathrm V",
      },
      {
        title: {
          id: "Jumlahkan varians, lalu ambil akar",
          en: "Add variances, then take the square root",
        },
        body: [
          {
            id: "Kuadrat 0.100 V adalah 0.010000 V². Kuadrat 0.00015 V adalah 0.0000000225 V². Jumlahnya masih memakai V².",
            en: "Squaring 0.100 V gives 0.010000 V². Squaring 0.00015 V gives 0.0000000225 V². Their sum still has units V².",
          },
          {
            id: "Kita ambil akar untuk kembali ke satuan volt. Hasil mendekati 0.100 V karena kontribusi variasi sensitivitas jauh lebih besar pada suhu 100°C ini.",
            en: "We take the square root to return to volts. The result is close to 0.100 V because sensitivity variation dominates at this 100°C input.",
          },
        ],
        math: "\\begin{aligned}\\sigma_V&=\\sqrt{(100\\times0.001)^2+(1.5\\times10^{-4})^2}\\\\&=\\sqrt{0.0100000225}\\\\&=\\boxed{0.1000001125\\ \\mathrm V\\approx0.100\\ \\mathrm V}\\end{aligned}",
      },
      {
        title: {
          id: "Tafsirkan rata-rata dan sebaran keluaran",
          en: "Interpret mean output and its spread",
        },
        body: [
          {
            id: "Nilai 1.999 V adalah pusat keluaran kumpulan sensor pada suhu yang sama. Simpangan baku sekitar 0.100 V menggambarkan sebaran antar-sensor dari model produksi ini; angka itu bukan batas galat maksimum yang pasti.",
            en: "The value 1.999 V is the centre of the sensor population's outputs at the same temperature. Standard deviation about 0.100 V describes between-sensor spread in this manufacturing model; it is not a guaranteed maximum error bound.",
          },
          {
            id: "Jika K dan a merupakan variabel normal yang saling bebas, gabungan linear V juga normal. Pernyataan bentuk distribusi ini terpisah dari langkah menghitung rata-rata dan varians.",
            en: "If K and a are independent normal variables, their linear combination V is also normal. That distribution-shape statement is separate from calculating its mean and variance.",
          },
        ],
      },
    ],
    answer: {
      id: "Rata-rata keluaran adalah 1.999 V. Dengan kovarians K dan a dianggap nol, simpangan baku keluaran 0.1000001125 V, atau sekitar 0.100 V.",
      en: "Mean output is 1.999 V. Assuming zero covariance between K and a, output standard deviation is 0.1000001125 V, approximately 0.100 V.",
    },
    answerMath:
      "\\boxed{\\bar V=1.999\\ \\mathrm V,\\qquad \\sigma_V\\approx0.100\\ \\mathrm V\\quad[\\operatorname{Cov}(K,a)=0]}",
    assumptions: [
      {
        id: "Suhu 100°C dianggap tepat dan tetap. Perhitungan numerik simpangan baku mengasumsikan kovarians K dan a nol; normalitas saja tidak cukup untuk membuktikan asumsi ini.",
        en: "The 100°C input is treated as exact and fixed. Numerical standard deviation assumes zero covariance between K and a; normality alone does not establish that assumption.",
      },
    ],
    visual: {
      kind: "uncertainty",
      params: {
        mode: "linear",
        input: 100,
        meanK: 0.02,
        sdK: 0.001,
        meanOffset: -0.001,
        sdOffset: 0.00015,
      },
      caption: {
        id: "Bandingkan kontribusi variasi sensitivitas dan offset pada sebaran tegangan.",
        en: "Compare sensitivity and offset variation contributions to output-voltage spread.",
      },
    },
  },
  {
    id: "2023-uts1-q4",
    year: 2023,
    exam: "uts1",
    number: 4,
    title: {
      id: "Waktu respons termometer dan batas frekuensi",
      en: "Thermometer response time and frequency limit",
    },
    topic: "dynamics",
    source: {
      url: "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
      file: "2023-uts1.pdf",
      pages: [2, 3],
    },
    originalLanguage: "en",
    original:
      "4. [25%] Dynamic Characteristic of Measurement Systems\nA thermometer has transfer function of \\(G(s)=O(s)/I(s)=0.2/(7s+1)\\), where O(s) is output in mV and I(s) is temperature in °C.\na. [10%] Estimate the time taken by the thermometer to reach 98% of temperature change, when the thermometer measures temperature with step profile from 30°C to 40°C.\nb. [15%] For dynamic measurement, find the maximum frequency where the error of measurement is less than 3 dB.",
    prompt: {
      id: "Termometer memiliki fungsi alih \\(G(s)=O(s)/I(s)=0.2/(7s+1)\\). Keluaran O dalam mV dan masukan I berupa suhu dalam °C. (a) Cari waktu sejak perubahan suhu mendadak dari 30°C ke 40°C hingga termometer mencapai 98% perubahan tersebut. (b) Cari batas frekuensi agar galat amplitudo pengukuran dinamik kurang dari 3 dB.",
      en: "A thermometer has transfer function \\(G(s)=O(s)/I(s)=0.2/(7s+1)\\). Output O is in mV and input I is temperature in °C. (a) Find elapsed time after a step from 30°C to 40°C to reach 98% of that change. (b) Find the frequency limit for dynamic amplitude error below 3 dB.",
    },
    steps: [
      {
        title: {
          id: "Kenali gain statik dan konstanta waktu",
          en: "Identify static gain and the time constant",
        },
        body: [
          {
            id: "Bentuk umum orde satu adalah \\(G(s)=K/(\\tau s+1)\\). Dengan mencocokkan koefisien, kita memperoleh sensitivitas statik \\(K=0.2\\) mV/°C dan konstanta waktu \\(\\tau=7\\) s. Huruf \\(s\\) dalam fungsi alih adalah variabel Laplace, bukan waktu pembacaan.",
            en: "The standard first-order form is \\(G(s)=K/(\\tau s+1)\\). Matching coefficients gives static sensitivity \\(K=0.2\\) mV/°C and time constant \\(\\tau=7\\) s. The \\(s\\) in the transfer function is the Laplace variable rather than reading time.",
          },
          {
            id: "Gain statik menghubungkan suhu dengan keluaran setelah sensor tunak. Konstanta waktu mengatur seberapa cepat keluaran menuju kondisi itu setelah suhu berubah.",
            en: "Static gain relates temperature to settled output. The time constant sets how quickly output approaches that condition after temperature changes.",
          },
        ],
        math: "K=0.2\\ \\mathrm{mV/{}^\\circ C},\\qquad\\tau=7\\ \\mathrm s",
      },
      {
        title: {
          id: "4a · Hitung perubahan yang harus ditempuh keluaran",
          en: "4a · Find the required output change",
        },
        body: [
          {
            id: "Anggap termometer telah tunak pada 30°C sebelum perubahan. Keluaran awalnya 0.2×30=6 mV. Pada suhu akhir 40°C, keluaran yang dituju adalah 0.2×40=8 mV.",
            en: "Assume the thermometer is initially settled at 30°C. Initial output is 0.2×30=6 mV. At the final 40°C temperature, target output is 0.2×40=8 mV.",
          },
          {
            id: "Kenaikan keluaran yang perlu diselesaikan adalah 2 mV. Persentase 98% mengacu pada kenaikan ini, bukan pada seluruh nilai akhir 8 mV.",
            en: "The output rise to be completed is 2 mV. The 98% target refers to this rise rather than the entire final value of 8 mV.",
          },
        ],
        math: "O_0=6\\ \\mathrm{mV},\\quad O_\\infty=8\\ \\mathrm{mV},\\quad\\Delta O=2\\ \\mathrm{mV},\\quad O_{98}=6+0.98(2)=7.96\\ \\mathrm{mV}",
        visual: {
          kind: "dynamics",
          params: {
            tau: 7,
            initial: 6,
            final: 8,
            K: 0.2,
            stepTime: 0,
            evaluationTime: 27.38416103799702,
            unit: "mV",
            inputUnit: "°C",
            initialTemperature: 30,
            finalTemperature: 40,
          },
          caption: {
            id: "Respons dimulai pada 6 mV dan mendekati 8 mV. Target 98% perubahan berada pada 7.96 mV.",
            en: "The response starts at 6 mV and approaches 8 mV. The 98%-of-change target is 7.96 mV.",
          },
        },
      },
      {
        title: {
          id: "Tulis respons langkah dari nilai awal yang benar",
          en: "Write the step response from the correct initial value",
        },
        body: [
          {
            id: "Kita mulai waktu t=0 saat suhu berubah. Bentuk respons orde satu adalah nilai awal ditambah perubahan akhir yang dikali fraksi selesai.",
            en: "Set t=0 at the temperature step. A first-order response is the initial value plus the final change multiplied by its completed fraction.",
          },
          {
            id: "Fraksi selesai adalah \\(1-e^{-t/\\tau}\\). Pada t=0, fraksi ini nol; saat waktu membesar, fraksi mendekati satu. Jadi bentuk tersebut memenuhi kedua batas fisiknya.",
            en: "The completed fraction is \\(1-e^{-t/\\tau}\\). It is zero at t=0 and approaches one as time grows. The expression therefore satisfies both physical limits.",
          },
        ],
        math: "O(t)=O_0+(O_\\infty-O_0)(1-e^{-t/\\tau})=6+2(1-e^{-t/7})\\quad[\\mathrm{mV}]",
      },
      {
        title: {
          id: "Ubah target 98% menjadi sisa 2%",
          en: "Turn the 98% target into a 2% remainder",
        },
        body: [
          {
            id: "Jika 98% perubahan sudah selesai, 2% masih tersisa. Eksponensial menyatakan fraksi sisa tersebut, sehingga kita menyamakannya dengan 0.02.",
            en: "If 98% of the change is complete, 2% remains. The exponential represents that remaining fraction, so set it equal to 0.02.",
          },
          {
            id: "Kita juga dapat memasukkan keluaran target 7.96 mV ke persamaan. Kita kurangi 6 mV pada kedua ruas, lalu bagi dengan perubahan 2 mV. Kedua cara memberi hubungan yang sama.",
            en: "We can also insert target output 7.96 mV into the equation. We subtract 6 mV from both sides, then divide by the 2 mV change. Both approaches give the same relation.",
          },
        ],
        math: "\\frac{O(t)-O_0}{O_\\infty-O_0}=0.98\\quad\\Rightarrow\\quad1-e^{-t/7}=0.98\\quad\\Rightarrow\\quad e^{-t/7}=0.02",
      },
      {
        title: {
          id: "Selesaikan waktu dengan logaritma natural",
          en: "Solve for time using the natural logarithm",
        },
        body: [
          {
            id: "Logaritma natural, \\(\\ln\\), membalik operasi eksponensial \\(e^x\\). Kita ambil \\(\\ln\\) pada kedua ruas agar pangkat \\(-t/7\\) dapat dibaca langsung.",
            en: "The natural logarithm, \\(\\ln\\), reverses the exponential \\(e^x\\). Apply \\(\\ln\\) to both sides so that the exponent \\(-t/7\\) can be read directly.",
          },
          {
            id: "Kita kalikan kedua ruas dengan −7. Nilai ln(0.02) negatif, sehingga waktu yang diperoleh positif. Tanda positif sesuai waktu tunggu sesudah langkah.",
            en: "We multiply both sides by −7. Since ln(0.02) is negative, the resulting time is positive, as required for waiting after the step.",
          },
        ],
        math: "-\\frac t7=\\ln(0.02)\\quad\\Rightarrow\\quad t=-7\\ln(0.02)=\\boxed{27.38416\\ \\mathrm s}",
      },
      {
        title: {
          id: "Periksa arti waktu yang ditemukan",
          en: "Check what the calculated time means",
        },
        body: [
          {
            id: "Waktu itu sekitar 3.912 konstanta waktu. Substitusi kembali memberi keluaran 7.96 mV. Pembagian dengan sensitivitas 0.2 mV/°C memberi suhu terbaca 39.8°C.",
            en: "The time is about 3.912 time constants. Substitution gives output 7.96 mV. Dividing by sensitivity 0.2 mV/°C gives an indicated temperature of 39.8°C.",
          },
          {
            id: "Suhu masukan sudah 40°C, tetapi sensor masih menyisakan 0.2°C dari kenaikan 10°C. Sisa 0.2°C tersebut adalah 2% perubahan, bukan 2% dari suhu 40°C.",
            en: "Input is already 40°C, but the sensor still lacks 0.2°C of the 10°C rise. That remaining 0.2°C is 2% of the change rather than 2% of the 40°C temperature.",
          },
        ],
        math: "\\frac{t_{98}}{\\tau}=3.9120,\\qquad\\frac{7.96\\ \\mathrm{mV}}{0.2\\ \\mathrm{mV/{}^\\circ C}}=39.8^\\circ\\mathrm C",
      },
      {
        title: {
          id: "4b · Bandingkan amplitudo dengan respons statik",
          en: "4b · Compare amplitude with the static response",
        },
        body: [
          {
            id: "Untuk masukan suhu sinus, sensor dapat menghasilkan amplitudo yang lebih kecil dan fase yang tertunda. Soal memberi batas galat dalam dB, sehingga kita membandingkan besar amplitudo keluaran dengan respons statik yang ideal.",
            en: "For sinusoidal temperature input, the sensor can produce reduced amplitude and a phase delay. The error limit is in dB, so compare output amplitude with the ideal static response.",
          },
          {
            id: "Gain statik adalah K=0.2 mV/°C. Kita gunakan rasio \\(M=|G(j\\omega)|/K\\) agar nilai ideal sama dengan satu dan tidak bergantung pada pilihan satuan mV atau V.",
            en: "Static gain is K=0.2 mV/°C. We use the ratio \\(M=|G(j\\omega)|/K\\) so ideal gain is one and the result does not depend on choosing mV or V.",
          },
        ],
        math: "M(\\omega)=\\frac{|G(j\\omega)|}{K}",
        visual: {
          kind: "frequency",
          params: {
            order: 1,
            tau: 7,
            K: 0.2,
            frequency: 0.022682497499000042,
          },
          caption: {
            id: "Bandingkan penguatan terhadap nilai DC. Batas tepat −3 dB sedikit di bawah titik half-power.",
            en: "Compare gain with its DC value. The exact −3 dB boundary is slightly below the half-power point.",
          },
        },
      },
      {
        title: {
          id: "Cari besar gain pada frekuensi sinus",
          en: "Find gain magnitude for a sinusoidal frequency",
        },
        body: [
          {
            id: "Substitusi \\(s=j\\omega\\), dengan \\(j^2=-1\\), memberi penyebut \\(1+j7\\omega\\). Besar bilangan kompleks dengan bagian nyata 1 dan bagian imajiner \\(7\\omega\\) adalah \\(\\sqrt{1+(7\\omega)^2}\\).",
            en: "Substituting \\(s=j\\omega\\), where \\(j^2=-1\\), gives denominator \\(1+j7\\omega\\). A complex number with real part 1 and imaginary part \\(7\\omega\\) has magnitude \\(\\sqrt{1+(7\\omega)^2}\\).",
          },
          {
            id: "Pembagian oleh gain statik 0.2 menghapus pembilang. Pada frekuensi nol, M=1; saat frekuensi naik, penyebut bertambah dan amplitudo relatif turun.",
            en: "Dividing by static gain 0.2 cancels the numerator. At zero frequency, M=1; increasing frequency increases the denominator and reduces relative amplitude.",
          },
        ],
        math: "|G(j\\omega)|=\\frac{0.2}{\\sqrt{1+(7\\omega)^2}},\\qquad M(\\omega)=\\frac1{\\sqrt{1+(7\\omega)^2}}",
      },
      {
        title: {
          id: "Terjemahkan batas 3 dB menjadi rasio amplitudo",
          en: "Translate the 3 dB limit into an amplitude ratio",
        },
        body: [
          {
            id: "Untuk perbandingan amplitudo, gain dalam dB adalah 20 log10 M. Sensor orde satu ini melemahkan amplitudo, sehingga gain dalam dB bernilai nol atau negatif.",
            en: "For an amplitude ratio, gain in dB is 20 log10 M. This first-order sensor attenuates amplitude, so the gain is zero or negative.",
          },
          {
            id: "Galat amplitudo kurang dari 3 dB berarti besar pelemahannya kurang dari 3 dB, yaitu gain lebih besar dari −3 dB. Konversi kembali memberi M lebih besar dari sekitar 0.707946.",
            en: "Amplitude error below 3 dB means attenuation magnitude below 3 dB, or gain greater than −3 dB. Converting back gives M greater than about 0.707946.",
          },
        ],
        math: "20\\log_{10}M>-3\\quad\\Rightarrow\\quad M>10^{-3/20}=0.7079458",
      },
      {
        title: {
          id: "Selesaikan batas frekuensi sudut",
          en: "Solve the angular-frequency boundary",
        },
        body: [
          {
            id: "Kita masukkan rumus M ke pertidaksamaan. Semua besaran positif, sehingga pembalikan pecahan membalik arah pertidaksamaan. Setelah dikuadratkan, kita dapat mengisolasi (7ω)².",
            en: "We insert the expression for M into the inequality. All quantities are positive, so taking reciprocals reverses the inequality. Squaring then allows isolation of (7ω)².",
          },
          {
            id: "Untuk batas tepatnya, pakai tanda sama dengan. Nilai di bawah batas memenuhi syarat kurang dari 3 dB.",
            en: "We use equality to locate the exact boundary. Frequencies below it satisfy the less-than-3-dB condition.",
          },
        ],
        math: "\\begin{aligned}\\frac1{\\sqrt{1+(7\\omega)^2}}&>10^{-3/20}\\\\1+(7\\omega)^2&<10^{3/10}\\\\\\omega&<\\frac{\\sqrt{10^{0.3}-1}}7=0.142518335\\ \\mathrm{rad/s}\\end{aligned}",
      },
      {
        title: {
          id: "Ubah radian per detik menjadi hertz",
          en: "Convert radians per second into hertz",
        },
        body: [
          {
            id: "Satu siklus memuat \\(2\\pi\\) radian, sehingga \\(f=\\omega/(2\\pi)\\). Kita bagi batas frekuensi sudut dengan \\(2\\pi\\) untuk mendapat hertz.",
            en: "One cycle contains \\(2\\pi\\) radians, so \\(f=\\omega/(2\\pi)\\). We divide the angular-frequency boundary by \\(2\\pi\\) to obtain hertz.",
          },
          {
            id: "Pada batas, pelemahan tepat 3 dB. Soal meminta pelemahan kurang dari 3 dB, sehingga frekuensi kerja harus berada di bawah batas.",
            en: "At the boundary, attenuation equals exactly 3 dB. Since the question requires less than 3 dB, operating frequency must be below the boundary rather than exactly at it.",
          },
        ],
        math: "\\boxed{0\\le f<f_{\\rm lim}},\\qquad f_{\\rm lim}=\\frac{\\sqrt{10^{0.3}-1}}{2\\pi(7)}=\\boxed{0.02268250\\ \\mathrm{Hz}}",
      },
      {
        title: {
          id: "Bedakan batas tepat 3 dB dan pendekatan half-power",
          en: "Distinguish exact 3 dB from the half-power approximation",
        },
        body: [
          {
            id: "Batas orde satu sering disebut \\(f_c=1/(2\\pi\\tau)\\). Di titik itu, \\(M=1/\\sqrt2\\) dan gain sebenarnya −3.0103 dB. Angka ini lazim dibulatkan menjadi −3 dB.",
            en: "A first-order cutoff is often written \\(f_c=1/(2\\pi\\tau)\\). There, \\(M=1/\\sqrt2\\) and gain is actually −3.0103 dB, commonly rounded to −3 dB.",
          },
          {
            id: "Pendekatan itu memberi 0.02273642 Hz, sangat dekat dengan batas tepat 0.02268250 Hz. Untuk syarat ketat kurang dari 3.000 dB, gunakan batas tepat yang lebih kecil.",
            en: "That approximation gives 0.02273642 Hz, very close to the exact 0.02268250 Hz boundary. For the strict condition below 3.000 dB, use the smaller exact boundary.",
          },
          {
            id: "Batas ini hanya memeriksa amplitudo. Sensor tetap memiliki keterlambatan fase; soal tidak menetapkan batas fase tambahan.",
            en: "This limit checks amplitude only. The sensor still has phase delay; the question sets no additional phase constraint.",
          },
        ],
        math: "f_c=\\frac1{2\\pi\\tau}=0.02273642\\ \\mathrm{Hz},\\qquad20\\log_{10}\\left(\\frac1{\\sqrt2}\\right)=-3.0103\\ \\mathrm{dB}",
      },
    ],
    answer: {
      id: "Waktu mencapai 98% perubahan adalah 27.384 s sejak langkah suhu. Untuk pelemahan amplitudo kurang dari tepat 3 dB, gunakan f<0.02268250 Hz. Pendekatan cutoff half-power yang lazim adalah 0.02273642 Hz.",
      en: "Time to reach 98% of the change is 27.384 s after the temperature step. For amplitude attenuation strictly below 3 dB, use f<0.02268250 Hz. The usual half-power cutoff approximation is 0.02273642 Hz.",
    },
    answerMath:
      "\\boxed{t_{98}=27.38416\\ \\mathrm s,\\qquad 0\\le f<0.02268250\\ \\mathrm{Hz}}",
    assumptions: [
      {
        id: "Termometer mula-mula tunak pada 30°C. Waktu nol dipilih saat suhu berubah. Offset tidak ditambahkan karena fungsi alih hanya memberi sensitivitas dan konstanta waktu.",
        en: "The thermometer starts at equilibrium at 30°C. Time zero is chosen at the temperature step. No extra offset is added because the transfer function gives only sensitivity and time constant.",
      },
      {
        id: "Batas 3 dB ditafsirkan sebagai pelemahan amplitudo relatif terhadap gain statik, bukan logaritma gain berdimensi mV/°C. Nilai tepat −3.000 dB dibedakan dari titik half-power −3.0103 dB.",
        en: "The 3 dB bound is amplitude attenuation relative to static gain rather than the logarithm of a dimensional mV/°C gain. Exact −3.000 dB is distinguished from the half-power value −3.0103 dB.",
      },
    ],
    visual: {
      kind: "dynamics",
      params: {
        tau: 7,
        initial: 6,
        final: 8,
        K: 0.2,
        stepTime: 0,
        evaluationTime: 27.38416103799702,
        unit: "mV",
        inputUnit: "°C",
        initialTemperature: 30,
        finalTemperature: 40,
      },
      caption: {
        id: "Respons dimulai pada 6 mV dan mendekati 8 mV. Target 98% perubahan berada pada 7.96 mV.",
        en: "The response starts at 6 mV and approaches 8 mV. The 98%-of-change target is 7.96 mV.",
      },
    },
  },
  {
    id: "2023-uts1-q5",
    year: 2023,
    exam: "uts1",
    number: 5,
    title: {
      id: "Bridge sensor gaya: tegangan, arus, dan daya",
      en: "Force-sensor bridge: voltage, current, and power",
    },
    topic: "signal",
    source: {
      url: "https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view",
      file: "2023-uts1.pdf",
      pages: [2, 3],
    },
    originalLanguage: "en",
    original:
      "5. [15%] Signal Conditioning\nA force sensor produces a change in resistance as its output. The sensor forms one leg (R1) of a basic Wheatstone bridge. The sensor resistance with no force load is 500 Ω, and its static sensitivity is 0.5 Ω/N. Each arm of the bridge is initially 500 Ω.\na. [5%] Determine the bridge output for applied loads of 350 N. The bridge is operated as a deflection bridge, with an input voltage of 10 V.\nb. [5%] Determine the current flow through the sensor.\nc. [5%] Determine the power dissipated by the sensor (assume temperature sensitivity is negligible).\nAppendix, Possible Useful Formulas [as printed]: \\(P=V\\cdot I=V^2R=I^2/R\\).",
    prompt: {
      id: "Sensor gaya menjadi lengan R1 pada jembatan Wheatstone. Tahanan tanpa beban 500 Ω dan sensitivitas statik 0.5 Ω/N. Keempat lengan awalnya 500 Ω, dengan catu jembatan 10 V. Pada gaya 350 N, kerjakan tiga bagian. (a) Hitung tegangan keluaran dalam mode defleksi. (b) Hitung arus melalui sensor. (c) Hitung daya yang terdisipasi pada sensor. Abaikan kepekaan terhadap suhu. Lampiran mencetak rumus daya yang perlu diperiksa satuannya.",
      en: "A force sensor forms arm R1 of a Wheatstone bridge. Its unloaded resistance is 500 Ω, static sensitivity is 0.5 Ω/N, and all four arms initially equal 500 Ω. The bridge supply is 10 V. At a force of 350 N: (a) find output voltage in deflection mode; (b) find sensor current; (c) find sensor power dissipation. Neglect temperature sensitivity. The appendix prints a power formula whose units need checking.",
    },
    steps: [
      {
        title: {
          id: "5a · Ubah gaya menjadi perubahan tahanan",
          en: "5a · Convert force into resistance change",
        },
        body: [
          {
            id: "Sensitivitas 0.5 Ω/N menyatakan bahwa tiap kenaikan gaya 1 N menaikkan tahanan sebesar 0.5 Ω pada model statik. Gaya 350 N karena itu menambah tahanan 175 Ω.",
            en: "Sensitivity 0.5 Ω/N means each additional 1 N raises resistance by 0.5 Ω in the static model. A force of 350 N therefore adds 175 Ω.",
          },
          {
            id: "Perubahan 175 Ω harus ditambahkan pada tahanan awal 500 Ω. Ketiga lengan lain tetap 500 Ω karena soal hanya menjadikan R1 sebagai sensor.",
            en: "Add the 175 Ω change to the initial 500 Ω resistance. The other three arms stay at 500 Ω because only R1 is the sensing element.",
          },
        ],
        math: "\\Delta R_1=(0.5\\ \\Omega/\\mathrm N)(350\\ \\mathrm N)=175\\ \\Omega,\\qquad R_1=500+175=\\boxed{675\\ \\Omega}",
      },
      {
        title: {
          id: "Tetapkan sambungan dan polaritas keluaran",
          en: "Define the connections and output polarity",
        },
        body: [
          {
            id: "Soal tidak menyertakan gambar polaritas. Kita gunakan jembatan standar: R1 di kiri atas, R2 di kiri bawah, R3 di kanan atas, R4 di kanan bawah. Catu memberi 10 V pada titik atas dan 0 V pada titik bawah.",
            en: "The question supplies no polarity diagram. We use a standard bridge: R1 upper-left, R2 lower-left, R3 upper-right, and R4 lower-right. The supply places 10 V at the top node and 0 V at the bottom.",
          },
          {
            id: "Sebut titik tengah kiri A dan kanan B, lalu definisikan Vo=VA−VB. Voltmeter ideal tidak menarik arus di antara A dan B. Oleh karena itu, masing-masing sisi menjadi rangkaian dua resistor seri yang terpisah.",
            en: "Call the left midpoint A and the right midpoint B, and define Vo=VA−VB. An ideal voltmeter draws no current between A and B. Each side is therefore a separate pair of series resistors.",
          },
        ],
        math: "V_o=V_A-V_B,\\qquad R_2=R_3=R_4=500\\ \\Omega",
        visual: {
          kind: "bridge",
          params: {
            R1: 675,
            R2: 500,
            R3: 500,
            R4: 500,
            V: 10,
            variableArm: 1,
          },
          caption: {
            id: "R1 adalah sensor. Pengukuran selisih titik tengah tidak menarik arus pada model voltmeter ideal.",
            en: "R1 is the sensor. The ideal voltmeter draws no current from the two midpoint nodes.",
          },
        },
      },
      {
        title: {
          id: "Gunakan pembagi tegangan pada sisi sensor",
          en: "Use a voltage divider on the sensor side",
        },
        body: [
          {
            id: "Arus sisi kiri adalah \\(V_s/(R_1+R_2)\\). Tegangan titik A terhadap titik bawah sama dengan tegangan pada R2, sehingga \\(V_A=V_sR_2/(R_1+R_2)\\).",
            en: "Left-branch current is \\(V_s/(R_1+R_2)\\). The voltage of A relative to the bottom node equals the voltage across R2, giving \\(V_A=V_sR_2/(R_1+R_2)\\).",
          },
          {
            id: "R1 membesar akibat gaya, sehingga lebih banyak tegangan jatuh pada R1 dan tegangan titik tengah kiri turun. Kita gunakan pembagi tepat karena perubahan tahanan 175/500=35% tidak kecil.",
            en: "R1 increases under load, placing more voltage across R1 and lowering the left midpoint voltage. We use the exact divider because the resistance change, 175/500=35%, is not small.",
          },
        ],
        math: "V_A=10\\frac{500}{675+500}=10\\frac{500}{1175}=4.255319\\ \\mathrm V",
      },
      {
        title: {
          id: "Hitung sisi acuan dan selisih tegangan",
          en: "Calculate the reference side and voltage difference",
        },
        body: [
          {
            id: "Dua resistor sisi kanan tetap sama, sehingga membagi catu 10 V menjadi dua bagian sama besar. Titik B berada pada 5 V.",
            en: "The two right-hand resistors remain equal, splitting the 10 V supply into equal parts. Node B is at 5 V.",
          },
          {
            id: "Kita kurangi VB dari VA sesuai polaritas yang telah ditetapkan. Tanda negatif berarti titik A lebih rendah dari B. Menukar kabel voltmeter membalik tanda, tetapi tidak mengubah besar keluarannya.",
            en: "We subtract VB from VA using the defined polarity. The negative sign means A is below B. Swapping voltmeter leads reverses the sign without changing output magnitude.",
          },
        ],
        math: "V_B=10\\frac{500}{500+500}=5\\ \\mathrm V,\\qquad V_o=4.255319-5=\\boxed{-0.744681\\ \\mathrm V}",
      },
      {
        title: {
          id: "5b · Cari arus pada cabang yang memuat sensor",
          en: "5b · Find current in the sensor branch",
        },
        body: [
          {
            id: "Sensor R1 dan R2 tersusun seri. Voltmeter tidak menarik arus, sehingga arus melalui R1 sama dengan arus melalui R2.",
            en: "Sensor R1 and R2 are in series. Since the voltmeter draws no current, the current through R1 equals that through R2.",
          },
          {
            id: "Tahanan yang membatasi arus cabang adalah R1+R2=1175 Ω. Jangan membagi 10 V hanya dengan R1 karena sensor tidak menerima seluruh tegangan catu.",
            en: "Branch current is set by R1+R2=1175 Ω. Do not divide 10 V by R1 alone, because the sensor does not receive the full supply voltage.",
          },
        ],
        math: "I_s=\\frac{10}{675+500}=\\frac{10}{1175}=0.008510638\\ \\mathrm A=\\boxed{8.510638\\ \\mathrm{mA}}",
      },
      {
        title: {
          id: "Bedakan arus sensor dari arus total sumber",
          en: "Distinguish sensor current from total supply current",
        },
        body: [
          {
            id: "Arus cabang kanan adalah 10/(500+500)=10 mA. Sumber memasok kedua cabang, sehingga arus totalnya lebih besar daripada arus melalui sensor.",
            en: "Right-branch current is 10/(500+500)=10 mA. The supply feeds both branches, so total supply current is larger than sensor current.",
          },
          {
            id: "Bagian b meminta arus sensor, sehingga jawaban tetap 8.510638 mA. Menjumlahkan kedua cabang akan menjawab arus yang ditarik seluruh jembatan.",
            en: "Part b asks for sensor current, so the answer remains 8.510638 mA. Adding the branches would instead answer the current drawn by the whole bridge.",
          },
        ],
        math: "I_{\\rm right}=10\\ \\mathrm{mA},\\qquad I_{\\rm supply}=I_s+I_{\\rm right}=18.510638\\ \\mathrm{mA}",
      },
      {
        title: {
          id: "5c · Periksa rumus daya pada lampiran",
          en: "5c · Check the appendix power formula",
        },
        body: [
          {
            id: "Daya listrik pada resistor adalah \\(P=VI\\). Dengan hukum Ohm \\(V=IR\\), bentuk yang setara adalah \\(P=I^2R=V^2/R\\).",
            en: "Electrical power in a resistor is \\(P=VI\\). Using Ohm's law \\(V=IR\\), equivalent forms are \\(P=I^2R=V^2/R\\).",
          },
          {
            id: "Lampiran tercetak menulis \\(V^2R\\) dan \\(I^2/R\\). Kedua bentuk itu salah secara satuan. Kita mempertahankan teks sumber, tetapi menghitung dengan hubungan daya dan hukum Ohm yang konsisten.",
            en: "The printed appendix writes \\(V^2R\\) and \\(I^2/R\\). Both are dimensionally incorrect. Keep the original transcription, but calculate using the consistent power relation and Ohm's law.",
          },
        ],
        math: "\\boxed{P=VI=I^2R=\\frac{V^2}{R}}",
      },
      {
        title: {
          id: "Hitung daya hanya pada resistor sensor",
          en: "Calculate power in the sensor resistor alone",
        },
        body: [
          {
            id: "Pakai arus sensor 0.008510638 A dan tahanan sensor setelah diberi gaya, yaitu 675 Ω. Tahanan 500 Ω adalah nilai tanpa beban, sehingga tidak sesuai untuk kondisi yang sedang dihitung.",
            en: "We use sensor current 0.008510638 A and its loaded resistance of 675 Ω. The 500 Ω value is unloaded resistance and does not describe the present condition.",
          },
          {
            id: "Kuadratkan arus lalu kalikan tahanan. Hasil dalam watt dapat diubah menjadi milliwatt dengan mengalikan 1000.",
            en: "Square current and multiply by resistance. Convert the result in watts to milliwatts by multiplying by 1000.",
          },
        ],
        math: "P_s=I_s^2R_1=\\left(\\frac{10}{1175}\\right)^2(675)=0.048890901\\ \\mathrm W=\\boxed{48.890901\\ \\mathrm{mW}}",
      },
      {
        title: {
          id: "Periksa hasil dengan tegangan pada sensor",
          en: "Check using voltage across the sensor",
        },
        body: [
          {
            id: "Tegangan pada sensor adalah selisih titik atas 10 V dan titik A 4.255319 V, yaitu 5.744681 V. Ini juga sama dengan IsR1.",
            en: "Sensor voltage is the difference between the 10 V top node and node A at 4.255319 V: 5.744681 V. It also equals IsR1.",
          },
          {
            id: "Kita kalikan tegangan itu dengan arus sensor untuk memperoleh daya yang sama. Menggunakan 10 V sebagai tegangan sensor akan menghitung daya terlalu besar karena mengabaikan jatuh tegangan pada R2.",
            en: "We multiply that voltage by sensor current to recover the same power. Using 10 V as sensor voltage would overestimate its power by ignoring the drop across R2.",
          },
        ],
        math: "V_{R_1}=10-4.255319=5.744681\\ \\mathrm V,\\qquad V_{R_1}I_s=5.744681(0.008510638)=0.048890901\\ \\mathrm W",
      },
      {
        title: {
          id: "Maknai keluaran dan asumsi suhu",
          en: "Interpret the output and temperature assumption",
        },
        body: [
          {
            id: "Pada gaya nol, semua resistor sama dan kedua titik tengah berada pada 5 V, sehingga Vo=0. Gaya mengubah satu lengan dan menghasilkan keluaran defleksi tanpa menyeimbangkan ulang jembatan.",
            en: "At zero force, all resistors are equal and both midpoints are at 5 V, so Vo=0. Force changes one arm and produces a deflection output without rebalancing the bridge.",
          },
          {
            id: "Daya pada sensor berubah menjadi panas. Soal meminta mengabaikan kepekaan terhadap suhu, sehingga kita tidak menambahkan perubahan tahanan akibat pemanasan tersebut. Hasil daya tetap penting sebagai besaran listrik yang diminta.",
            en: "Sensor power becomes heat. The question asks us to neglect temperature sensitivity, so no heating-induced resistance change is added. Dissipated power remains the requested electrical quantity.",
          },
        ],
      },
    ],
    answer: {
      id: "Tahanan sensor menjadi 675 Ω. Dengan Vo=VA−VB, keluarannya −0.744681 V; besarnya 0.744681 V. Arus sensor 8.510638 mA dan daya sensor 48.890901 mW.",
      en: "Sensor resistance becomes 675 Ω. Defining Vo=VA−VB gives −0.744681 V, with magnitude 0.744681 V. Sensor current is 8.510638 mA and sensor power is 48.890901 mW.",
    },
    answerMath:
      "\\boxed{R_1=675\\ \\Omega,\\quad|V_o|=0.744681\\ \\mathrm V,\\quad I_s=8.510638\\ \\mathrm{mA},\\quad P_s=48.890901\\ \\mathrm{mW}}",
    assumptions: [
      {
        id: "Jembatan standar memakai catu antara titik atas dan bawah, R1 di kiri atas, dan keluaran titik tengah kiri dikurangi kanan. Soal tidak memberi gambar polaritas; tanda berubah jika kabel keluaran ditukar.",
        en: "The standard bridge uses top-to-bottom excitation, R1 in the upper-left arm, and left-minus-right midpoint output. No polarity diagram is supplied; reversing output leads changes the sign.",
      },
      {
        id: "Voltmeter memiliki impedansi masuk tak hingga, resistor lain tetap, dan perubahan tahanan akibat suhu diabaikan sesuai soal.",
        en: "The voltmeter has infinite input impedance, other resistors stay fixed, and temperature-induced resistance changes are neglected as stated.",
      },
      {
        id: "Lampiran salah mencetak dua bentuk daya. Perhitungan memakai P=VI=I²R=V²/R berdasarkan hukum Ohm.",
        en: "The appendix misprints two power expressions. Calculation uses P=VI=I²R=V²/R from Ohm's law.",
      },
    ],
    visual: {
      kind: "bridge",
      params: {
        R1: 675,
        R2: 500,
        R3: 500,
        R4: 500,
        V: 10,
        variableArm: 1,
      },
      caption: {
        id: "R1 adalah sensor. Pengukuran selisih titik tengah tidak menarik arus pada model voltmeter ideal.",
        en: "R1 is the sensor. The ideal voltmeter draws no current from the two midpoint nodes.",
      },
    },
  },
];

import type {
  ExamQuestion,
  PracticeQuestion,
  Localized,
  SolutionStep,
} from "./types";

const L = (id: string, en: string): Localized => ({ id, en });
const r = String.raw;
const step = (
  title: Localized,
  body: Localized[],
  rest: Partial<SolutionStep> = {},
): SolutionStep => ({ title, body, ...rest });
const uts = {
  url: "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
  file: "2025-uts2.pdf",
};
const uas = {
  url: "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
  file: "2025-uas.pdf",
};

export const questions2025: ExamQuestion[] = [
  {
    id: "2025-uts2-q1",
    year: 2025,
    exam: "uts2",
    number: 1,
    topic: "flow",
    title: L("Debit oli melalui orifis", "Oil flow through an orifice"),
    source: { ...uts, pages: [1] },
    originalLanguage: "en",
    original: r`1. Flow Measurement: Orifice Flowmeter
A hydraulic oil with a density of \(\rho=870\ \mathrm{kg/m^3}\) flows inside a pipe with an internal diameter (D) of 500 mm. An orifice flowmeter is used to measure the flow, yielding a vena contracta with a diameter (d) of 300 mm, as shown in the following figure. In addition, the pressure difference (ΔP) between the upstream and downstream sections of the orifice is measured using a pressure gauge, giving a value of 1.6 MPa. The absolute viscosity (μ) of the oil is given as 0.059 Ns/m².
a. [15%] Calculate the volumetric flowrate of the oil in m³/s. Hint: Use Bernoulli’s equation and the continuity equation.
b. [5%] Calculate the mass flowrate of the oil in kg/s.
c. [5%] There is a pressure difference between the upstream and downstream sections of the orifice plate. Which section has higher pressure? Explain briefly.
d. [5%] What are the advantages and disadvantages of an orifice flowmeter compared to a venturi flowmeter?
Discharge-coefficient table: columns Re = 10⁴, 10⁵, 10⁶, 10⁷. Rows d/D: 0.2 → 0.60, 0.595, 0.594, 0.594; 0.4 → 0.61, 0.603, 0.598, 0.598; 0.5 → 0.62, 0.608, 0.603, 0.603; 0.6 → 0.63, 0.610, 0.608, 0.608; 0.7 → 0.64, 0.614, 0.609, 0.609.`,
    prompt: L(
      r`Oli dengan massa jenis \(870\ \mathrm{kg/m^3}\) dan viskositas \(0.059\ \mathrm{Pa\,s}\) mengalir dalam pipa berdiameter \(500\ \mathrm{mm}\). Orifis menghasilkan diameter \(d=300\ \mathrm{mm}\), yang disebut vena contracta pada soal. Beda tekanannya \(1.6\ \mathrm{MPa}\). Gunakan tabel koefisien debit pada sumber.
(a) Hitung debit volume dengan kontinuitas dan Bernoulli. (b) Hitung debit massa. (c) Tentukan sisi bertekanan lebih tinggi dan alasannya. (d) Bandingkan kelebihan serta kekurangan orifis terhadap venturi.`,
      r`Oil of density \(870\ \mathrm{kg/m^3}\) and viscosity \(0.059\ \mathrm{Pa\,s}\) flows through a \(500\ \mathrm{mm}\) pipe. The stated diameter \(d=300\ \mathrm{mm}\) is called the vena contracta diameter in the question. The pressure difference is \(1.6\ \mathrm{MPa}\). Use the source discharge-coefficient table.
(a) Find the volume flow using continuity and Bernoulli. (b) Find the mass flow. (c) Identify the higher-pressure side and explain. (d) Compare an orifice meter with a venturi meter.`,
    ),
    givens: [
      {
        label: L("Diameter pipa", "Pipe diameter"),
        value: r`\(D=0.500\ \mathrm m\)`,
      },
      {
        label: L("Diameter penyempitan", "Restriction diameter"),
        value: r`\(d=0.300\ \mathrm m\)`,
      },
      {
        label: L("Beda tekanan", "Pressure difference"),
        value: r`\(\Delta p=1.6\times10^6\ \mathrm{Pa}\)`,
      },
    ],
    steps: [
      step(
        L(
          "1. Samakan satuan dan pilih baris tabel",
          "1. Convert units and choose the table row",
        ),
        [
          L(
            r`Kita mencari volume per detik. Ubah diameter ke meter dan tekanan ke pascal. Rasio diameter menentukan baris koefisien debit \(C_d\).`,
            r`We need volume per second. Convert diameters to metres and pressure to pascals. The diameter ratio selects the discharge-coefficient row.`,
          ),
        ],
        {
          math: r`\beta=\frac dD=0.6,\qquad A_1=\frac{\pi D^2}{4}=0.196350\ \mathrm{m^2},\quad A_2=0.0706858\ \mathrm{m^2}`,
          table: {
            headers: [
              L("d/D", "d/D"),
              L("Re = 10⁴", "Re = 10⁴"),
              L("Re = 10⁵", "Re = 10⁵"),
              L("Re = 10⁶", "Re = 10⁶"),
              L("Re = 10⁷", "Re = 10⁷"),
            ],
            rows: [
              ["0.2", "0.600", "0.595", "0.594", "0.594"],
              ["0.4", "0.610", "0.603", "0.598", "0.598"],
              ["0.5", "0.620", "0.608", "0.603", "0.603"],
              ["0.6", "0.630", "0.610", "0.608", "0.608"],
              ["0.7", "0.640", "0.614", "0.609", "0.609"],
            ],
          },
        },
      ),
      step(
        L("2. Hubungkan kedua kecepatan", "2. Relate the two velocities"),
        [
          L(
            r`Oli dianggap tak termampatkan. Volume yang masuk sama dengan volume yang keluar, sehingga penampang kecil memiliki kecepatan lebih tinggi.`,
            r`Treat the oil as incompressible. The incoming and outgoing volume flows match, so the smaller section has the greater velocity.`,
          ),
        ],
        {
          math: r`A_1v_1=A_2v_2=Q,\qquad v_1=\beta^2v_2\qquad p_1-p_2=\frac12\rho(v_2^2-v_1^2)`,
        },
      ),
      step(
        L(
          "3. Hitung debit ideal, lalu koreksi",
          "3. Calculate ideal flow, then correct it",
        ),
        [
          L(
            r`Masukkan hubungan kontinuitas ke Bernoulli untuk pipa mendatar. Hasil ideal belum memuat rugi aliran; tabel \(C_d\) mengoreksinya. Coba \(C_d=0.610\), lalu cek bilangan Reynolds.`,
            r`Insert continuity into Bernoulli for a horizontal pipe. The ideal result omits flow losses; the tabulated coefficient corrects it. Try \(C_d=0.610\), then check Reynolds number.`,
          ),
        ],
        {
          math: r`Q_i=A_2\sqrt{\frac{2\Delta p}{\rho(1-\beta^4)}}=0.0706858\sqrt{\frac{2(1.6\times10^6)}{870(1-0.6^4)}}=4.59503\ \mathrm{m^3/s}\\Q=C_dQ_i=0.610(4.59503)=2.80297\ \mathrm{m^3/s}`,
        },
      ),
      step(
        L("4. Pastikan pilihan Cd sesuai", "4. Check the coefficient choice"),
        [
          L(
            r`Reynolds memakai kecepatan rata-rata dalam pipa dan diameter pipa. Hasilnya dekat \(10^5\), sehingga \(C_d=0.610\) cocok dengan ketelitian tabel. Interpolasi halus hanya mengubah hasil pembulatan sedikit.`,
            r`Reynolds number uses the mean pipe velocity and pipe diameter. The result is close to \(10^5\), so \(C_d=0.610\) is consistent with the table precision. Fine interpolation barely changes the rounded result.`,
          ),
        ],
        {
          math: r`v_1=\frac Q{A_1}=14.2754\ \mathrm{m/s},\qquad Re_D=\frac{\rho v_1D}{\mu}=\frac{870(14.2754)(0.500)}{0.059}=1.05251\times10^5`,
        },
      ),
      step(
        L(
          "5. Ubah debit volume menjadi debit massa",
          "5. Convert volume flow to mass flow",
        ),
        [
          L(
            "Setiap meter kubik oli memiliki massa 870 kg. Kalikan debit volume dengan massa jenis.",
            "Each cubic metre of oil has a mass of 870 kg. Multiply volume flow by density.",
          ),
        ],
        { math: r`\dot m=\rho Q=870(2.80297)=2438.58\ \mathrm{kg/s}` },
      ),
      step(
        L(
          "6. Tentukan sisi bertekanan lebih tinggi",
          "6. Identify the higher-pressure side",
        ),
        [
          L(
            r`Tekanan hulu lebih tinggi. Saat aliran menyempit, kecepatan naik dan tekanan statik turun. Setelah aliran melebar kembali, sebagian tekanan pulih, tetapi rugi energi membuat pemulihannya tidak penuh.`,
            r`Upstream pressure is higher. The restriction increases velocity and lowers static pressure. Some pressure recovers as the flow expands again, but energy loss prevents full recovery.`,
          ),
        ],
        { math: r`p_1>p_2,\qquad \Delta p=p_1-p_2>0` },
      ),
      step(
        L(
          "7. Bandingkan orifis dengan venturi",
          "7. Compare the orifice with a venturi",
        ),
        [
          L(
            "Orifis ringkas, murah, mudah dibuat, dan pelatnya mudah diganti. Kekurangannya ialah rugi tekanan permanen lebih besar serta hasil lebih peka terhadap tepi pelat, endapan, dan kondisi aliran. Venturi lebih besar dan mahal, tetapi bentuknya yang bertahap memberi pemulihan tekanan lebih baik.",
            "An orifice is compact, inexpensive, simple to make, and easy to replace. Its drawbacks are greater permanent pressure loss and greater sensitivity to plate-edge condition, deposits, and flow conditions. A venturi is larger and more expensive, but its gradual shape gives better pressure recovery.",
          ),
        ],
      ),
    ],
    answer: L(
      "Dengan Cd ≈ 0.610, debit volume ≈ 2.803 m³/s dan debit massa ≈ 2.439 × 10³ kg/s. Tekanan hulu lebih tinggi.",
      "With Cd ≈ 0.610, volume flow ≈ 2.803 m³/s and mass flow ≈ 2.439 × 10³ kg/s. Upstream pressure is higher.",
    ),
    answerMath: r`\boxed{Q\approx2.803\ \mathrm{m^3/s},\quad \dot m\approx2.439\times10^3\ \mathrm{kg/s},\quad Re_D\approx1.053\times10^5}`,
    assumptions: [
      L(
        "Aliran tunak, oli tak termampatkan, kedua titik berada pada elevasi yang sama, dan beda tekanan sesuai titik ukur tabel.",
        "Steady incompressible flow, equal tap elevation, and a pressure difference consistent with the coefficient table.",
      ),
      L(
        "Soal menyebut d sebagai diameter vena contracta, tetapi juga memberi tabel Cd untuk metode orifis. Pembahasan mengikuti konvensi hitungan kuliah: d menjadi diameter bukaan efektif dalam rumus Cd. Dalam desain nyata, diameter lubang pelat dan vena contracta berbeda; keduanya tidak boleh ditukar tanpa model koefisien yang sesuai.",
        "The question calls d the vena contracta diameter but supplies an orifice Cd table. This solution follows the course calculation convention: d is the effective aperture diameter in the Cd method. In a real design, plate-bore and vena-contracta diameters differ and cannot be exchanged without a matching coefficient model.",
      ),
    ],
    visual: {
      kind: "orifice",
      params: { D: 0.5, d: 0.3, rho: 870, mu: 0.059, dp: 1600000, Cd: 0.61 },
      caption: L(
        "Hubungkan penyempitan, tekanan, dan debit. Nilai awal mengikuti soal.",
        "Connect the restriction, pressure, and flow. Initial values follow the question.",
      ),
    },
    referencePages: [7, 9, 10],
  },
  {
    id: "2025-uts2-q2",
    year: 2025,
    exam: "uts2",
    number: 2,
    topic: "temperature",
    title: L(
      "Termokopel J dan suhu referensi",
      "Type J thermocouple and reference temperature",
    ),
    source: { ...uts, pages: [1, 2, 4] },
    originalLanguage: "en",
    original: r`2. Temperature Sensor: Thermocouple
A Type J thermocouple is used to measure temperature of air inside a pipe, as shown in the following figure. Hint: Use the table in the appendix to answer the following questions.
a. [5%] If the reference junction temperature is 0°C, calculate the percentage non-linearity at 150°C for a measurement range of 0 to 400°C.
b. [10%] Calculate the temperature inside a pipe if an emf of 12.7 mV is measured relative to a reference junction of 20°C.
Figure data: Air, V = 50 m/s; emf measured against Tref. Appendix: Type J thermocouple, reference junctions at 0°C. Relevant table entries (°C → mV): 0 → 0.000; 20 → 1.019; 150 → 8.010; 252 → 13.666; 253 → 13.722; 400 → 21.848.`,
    prompt: L(
      r`Termokopel tipe J mengukur suhu udara dalam pipa. Gambar memberi kecepatan udara \(50\ \mathrm{m/s}\). Gunakan tabel lampiran dengan referensi \(0^\circ\mathrm C\).
(a) Untuk rentang \(0\) hingga \(400^\circ\mathrm C\), hitung ketaklinieran pada \(150^\circ\mathrm C\) sebagai persen skala penuh. (b) Tentukan suhu saat tegangan terukur \(12.7\ \mathrm{mV}\) dan suhu referensi \(20^\circ\mathrm C\).`,
      r`A Type J thermocouple measures air temperature in a pipe. The figure states an air speed of \(50\ \mathrm{m/s}\). Use the appendix table referenced to \(0^\circ\mathrm C\).
(a) Over a \(0\) to \(400^\circ\mathrm C\) range, find nonlinearity at \(150^\circ\mathrm C\) as a percentage of full scale. (b) Find the temperature for a measured \(12.7\ \mathrm{mV}\) with a \(20^\circ\mathrm C\) reference junction.`,
    ),
    steps: [
      step(
        L(
          "1. Bentuk garis ideal dari dua ujung rentang",
          "1. Build the ideal endpoint line",
        ),
        [
          L(
            "Ketaklinieran membandingkan tabel nyata dengan garis lurus acuan. Di sini kita memilih garis melalui titik 0 °C dan 400 °C, bukan garis singgung pada 150 °C.",
            "Nonlinearity compares the actual table with a reference straight line. Here we use the line through 0 °C and 400 °C, not a tangent at 150 °C.",
          ),
        ],
        {
          math: r`E_{\mathrm{lin}}(T)=\frac{21.848-0}{400-0}T=0.05462T\ \mathrm{mV}\\E_{\mathrm{lin}}(150)=8.193\ \mathrm{mV}`,
        },
      ),
      step(
        L(
          "2. Bandingkan tegangan pada 150 °C",
          "2. Compare the voltage at 150 °C",
        ),
        [
          L(
            "Tabel memberi 8.010 mV. Kurangi dengan nilai garis ideal, lalu bagi simpangan mutlak dengan rentang keluaran penuh. Tanda negatif berarti titik tabel berada di bawah garis.",
            "The table gives 8.010 mV. Subtract the ideal-line value, then divide the absolute deviation by the full output span. The negative sign means the table point is below the line.",
          ),
        ],
        {
          math: r`N(150)=8.010-8.193=-0.183\ \mathrm{mV}\\\%N=\frac{|{-0.183}|}{21.848}\,100\%=0.8376\%`,
        },
      ),
      step(
        L(
          "3. Koreksi sambungan referensi 20 °C",
          "3. Correct the 20 °C reference junction",
        ),
        [
          L(
            r`Tegangan terukur berasal dari selisih dua suhu sambungan. Agar cocok dengan tabel referensi nol, tambahkan \(E_J(20,0)=1.019\ \mathrm{mV}\). Menambah langsung 20 °C pada hasil pencarian tabel tidak tepat karena hubungan suhu dan tegangan tidak benar-benar linear.`,
            r`The measured voltage comes from the two junction temperatures. To use the zero-reference table, add \(E_J(20,0)=1.019\ \mathrm{mV}\). Adding 20 °C directly to a table-derived temperature is not exact because voltage is not perfectly linear with temperature.`,
          ),
        ],
        {
          math: r`E_J(T,0)=E_J(T,20)+E_J(20,0)=12.700+1.019=13.719\ \mathrm{mV}`,
        },
      ),
      step(
        L(
          "4. Interpolasi di antara dua entri terdekat",
          "4. Interpolate between the nearest entries",
        ),
        [
          L(
            "13.719 mV berada di antara 13.666 mV pada 252 °C dan 13.722 mV pada 253 °C. Kita hitung bagian jarak dari titik bawah.",
            "13.719 mV lies between 13.666 mV at 252 °C and 13.722 mV at 253 °C. Find the fraction of the interval above the lower point.",
          ),
        ],
        {
          math: r`T=252+\frac{13.719-13.666}{13.722-13.666}(253-252)=252.946^\circ\mathrm C`,
        },
      ),
      step(
        L(
          "5. Tafsirkan hasil sesuai model pengukuran",
          "5. Interpret the result within the measurement model",
        ),
        [
          L(
            "Suhu sambungan ukur sekitar 253 °C. Kita menyamakannya dengan suhu udara karena soal tidak memberi data untuk menghitung galat perpindahan panas atau pemulihan suhu aliran. Angka kecepatan udara tidak masuk ke koreksi listrik termokopel ini.",
            "The measuring junction is about 253 °C. We equate this with air temperature because the question gives no data for heat-transfer or flow-recovery corrections. Air speed does not enter this electrical thermocouple correction.",
          ),
        ],
      ),
    ],
    answer: L(
      "Ketaklinieran pada 150 °C ialah 0.838% skala penuh, dengan simpangan −0.183 mV. Suhu ukur sekitar 252.95 °C.",
      "Nonlinearity at 150 °C is 0.838% of full scale, with a −0.183 mV deviation. The measured temperature is about 252.95 °C.",
    ),
    answerMath: r`\boxed{\%N_{150}=0.838\%\ \mathrm{FS},\qquad T\approx252.95^\circ\mathrm C}`,
    assumptions: [
      L(
        "Acuan ketaklinieran memakai garis dua ujung rentang. Suhu sambungan ukur mewakili suhu udara; galat pemasangan dan perpindahan panas diabaikan.",
        "Nonlinearity uses an endpoint reference line. Junction temperature represents air temperature; installation and heat-transfer errors are neglected.",
      ),
    ],
    visual: {
      kind: "thermocouple",
      params: {
        type: "J",
        measuredMv: 12.7,
        Tref: 20,
        T: 252.946,
        rangeMax: 400,
        testC: 150,
        tableC: [0, 20, 150, 252, 253, 400],
        tableMv: [0, 1.019, 8.01, 13.666, 13.722, 21.848],
      },
      caption: L(
        "Tegangan sambungan dingin melengkapi tegangan terukur sebelum pencarian suhu.",
        "Add the cold-junction voltage to the measured voltage before finding temperature.",
      ),
    },
    referencePages: [4, 5, 24, 25, 26],
  },
  {
    id: "2025-uts2-q3",
    year: 2025,
    exam: "uts2",
    number: 3,
    topic: "position",
    title: L(
      "Tinggi cairan dari waktu ultrasonik",
      "Liquid level from ultrasonic travel time",
    ),
    source: { ...uts, pages: [2] },
    originalLanguage: "en",
    original: r`3. Ultrasonic Sensor
An ultrasonic sensor is used to monitor the fluid level in a tank. The sensor is installed above the tank. When the tank is empty, it takes 200 ms for the ultrasonic waves to travel from sensor to the fluid surface and then back to sensor. When the fluid in the tank is at height h, it takes 100 ms for the ultrasonic waves to travel from the sensor to the fluid surface and then back to sensor. The ultrasound travel in the air with speed of 330 m/s.
a. [10%] Draw a schematic of this measurement setup and briefly explain how it works.
b. [15%] Calculate the fluid height (h).`,
    prompt: L(
      r`Sensor ultrasonik berada di atas tangki. Waktu tempuh pulang-pergi saat kosong ialah \(200\ \mathrm{ms}\), dan saat cairan setinggi \(h\) ialah \(100\ \mathrm{ms}\). Cepat rambat bunyi di udara \(330\ \mathrm{m/s}\).
(a) Gambar susunan pengukuran dan jelaskan cara kerjanya. (b) Hitung tinggi cairan \(h\).`,
      r`An ultrasonic sensor is mounted above a tank. The round-trip time is \(200\ \mathrm{ms}\) when empty and \(100\ \mathrm{ms}\) with a liquid height \(h\). Sound travels at \(330\ \mathrm{m/s}\).
(a) Draw the measurement arrangement and explain it. (b) Calculate \(h\).`,
    ),
    steps: [
      step(
        L(
          "1. Bedakan jarak udara dan tinggi cairan",
          "1. Distinguish the air gap from liquid height",
        ),
        [
          L(
            r`Sensor memancarkan pulsa ke bawah, lalu menerima pantulannya. Saat kosong, pantulan acuan berasal dari dasar tangki. Saat terisi, pantulan berasal dari permukaan cairan. Sebut jarak sensor ke dasar \(H\), dan jarak sensor ke permukaan \(d\); tinggi cairan ialah \(h=H-d\).`,
            r`The sensor sends a pulse downwards and receives its echo. When empty, the reference echo comes from the tank bottom. When filled, it comes from the liquid surface. Let \(H\) be the sensor-to-bottom distance and \(d\) the air gap; liquid height is \(h=H-d\).`,
          ),
        ],
      ),
      step(
        L(
          "2. Bagi lintasan pulang-pergi dengan dua",
          "2. Halve the round-trip path",
        ),
        [
          L(
            r`Waktu yang tercatat mencakup perjalanan pergi dan kembali. Karena itu, jarak satu arah ialah \(ct/2\), bukan \(ct\). Ubah milidetik menjadi detik sebelum mengalikan.`,
            r`The recorded time includes the outward and return trips. The one-way distance is therefore \(ct/2\), not \(ct\). Convert milliseconds to seconds before multiplying.`,
          ),
        ],
        {
          math: r`H=\frac{ct_0}{2}=\frac{330(0.200)}2=33.0\ \mathrm m,\qquad d=\frac{ct}{2}=\frac{330(0.100)}2=16.5\ \mathrm m`,
        },
      ),
      step(
        L("3. Kurangi kedua jarak", "3. Subtract the two distances"),
        [
          L(
            "Permukaan cairan mengurangi jarak pantulan dari 33.0 m menjadi 16.5 m. Selisihnya memberi tinggi cairan dari dasar tangki.",
            "The liquid surface reduces the echo distance from 33.0 m to 16.5 m. Their difference gives liquid height above the tank bottom.",
          ),
        ],
        {
          math: r`h=H-d=\frac c2(t_0-t)=\frac{330}{2}(0.200-0.100)=16.5\ \mathrm m`,
        },
      ),
      step(
        L(
          "4. Cek skala dan kondisi pengukuran",
          "4. Check scale and measurement conditions",
        ),
        [
          L(
            "Hasil besar ini mengikuti data 200 ms dan 100 ms pada sumber. Jangan menggantinya menjadi mikrodetik tanpa koreksi resmi. Sensor harus tetap pada posisi yang sama, dan cepat rambat harus mewakili udara pada kedua pengukuran.",
            "This large result follows the source values of 200 ms and 100 ms. Do not silently replace them with microseconds. The sensor must stay in the same position, and the sound speed must represent the air during both measurements.",
          ),
        ],
      ),
    ],
    answer: L(
      "Tinggi cairan 16.5 m. Pengukuran membandingkan waktu pantulan dari dasar dengan waktu pantulan dari permukaan cairan.",
      "The liquid height is 16.5 m. The measurement compares the bottom-echo time with the liquid-surface echo time.",
    ),
    answerMath: r`\boxed{h=\frac{330}{2}(0.200-0.100)=16.5\ \mathrm m}`,
    assumptions: [
      L(
        "Saat tangki kosong, frasa “fluid surface” pada sumber kita baca sebagai dasar atau permukaan acuan kosong. Kedua waktu merupakan waktu pulang-pergi.",
        "For the empty tank, the source phrase “fluid surface” is interpreted as the bottom or empty reference surface. Both times are round-trip times.",
      ),
    ],
    visual: {
      kind: "ultrasonic",
      params: { c: 330, tEmpty: 0.2, t: 0.1, height: 33, level: 16.5 },
      caption: L(
        "Pulsa menempuh jarak udara dua kali. Tinggi cairan mengurangi jarak sensor ke pemantul.",
        "The pulse travels across the air gap twice. Increasing level reduces sensor-to-reflector distance.",
      ),
    },
    referencePages: [16],
  },
  {
    id: "2025-uts2-q4",
    year: 2025,
    exam: "uts2",
    number: 4,
    topic: "position",
    title: L(
      "Sensor posisi dan susunan strain gauge",
      "Position sensors and strain-gauge wiring",
    ),
    source: { ...uts, pages: [2, 3] },
    originalLanguage: "en",
    original: r`4. Position Sensors: LVDT, Resolver, Encoder, Strain gauges
a. [5%] What are the similarities and differences between a resolver and an LVDT (Linear Variable Differential Transformer)?
b. [5%] What are the advantages and disadvantages of an absolute encoder compared to an incremental encoder?
c. [5%] A cantilever beam with four strain gauges A1, A2, D1 and D2 is shown in the figure below. These four strain gauges form a Wheatstone bridge. (i) Describe the position of each strain gauge on the Wheatstone bridge’s arm. (ii) What is the function of D1 and D2?
d. [5%] In a two-channel incremental encoder, how can we detect the direction of motion of the rotor (e.g. clockwise and counterclockwise)? You may sketch a schematic to support your answer.
Figure: a cantilever fixed on the left and loaded downward at its right end; A1 and D1 are on the upper face, A2 and D2 on the lower face. The D gauges are drawn perpendicular to the A gauges.`,
    prompt: L(
      r`(a) Bandingkan persamaan dan perbedaan resolver dengan LVDT. (b) Jelaskan kelebihan serta kekurangan encoder absolut terhadap encoder inkremental. (c) Balok kantilever memiliki A1 dan D1 di atas, A2 dan D2 di bawah, serta gaya ke bawah di ujung bebas. Tentukan susunan keempat gauge pada jembatan Wheatstone dan fungsi D1/D2. (d) Jelaskan cara dua kanal encoder inkremental menentukan arah putaran.`,
      r`(a) Compare a resolver and an LVDT. (b) Give the advantages and drawbacks of an absolute encoder relative to an incremental encoder. (c) A cantilever has A1/D1 on top, A2/D2 below, and a downward tip force. Assign all four gauges to Wheatstone-bridge arms and explain D1/D2. (d) Explain how two incremental-encoder channels determine rotation direction.`,
    ),
    steps: [
      step(
        L(
          "1. Kenali kesamaan LVDT dan resolver",
          "1. Identify what LVDTs and resolvers share",
        ),
        [
          L(
            "Keduanya memakai kopling magnetik antarkumparan dan eksitasi AC. Gerak mengubah tegangan induksi. Rangkaian pembaca mengolah amplitudo serta fase keluaran untuk memperoleh posisi.",
            "Both use magnetic coupling between windings and AC excitation. Motion changes the induced voltage. Readout electronics use output amplitude and phase to recover position.",
          ),
        ],
        {
          visual: {
            kind: "lvdt",
            caption: L(
              "Inti bergerak mengubah selisih tegangan dua kumparan sekunder.",
              "Core displacement changes the difference between two secondary voltages.",
            ),
          },
        },
      ),
      step(
        L(
          "2. Bedakan besaran yang mereka ukur",
          "2. Distinguish what they measure",
        ),
        [
          L(
            r`LVDT mengukur perpindahan lurus: dekat titik tengah, selisih keluaran berbanding dengan \(x\), dan pembalikan fase menandai sisi titik nol. Resolver mengukur sudut: dua keluarannya mengikuti \(\sin\theta\) dan \(\cos\theta\).`,
            r`An LVDT measures linear displacement: near its centre, differential output scales with \(x\), and phase reversal identifies the side of null. A resolver measures angle through outputs proportional to \(\sin\theta\) and \(\cos\theta\).`,
          ),
        ],
        {
          math: r`V_{\mathrm{LVDT}}=V_1-V_2\approx kx,\qquad V_s\propto\sin\theta,\quad V_c\propto\cos\theta`,
          visual: {
            kind: "resolver",
            caption: L(
              "Dua amplitudo resolver menentukan sudut dan kuadrannya.",
              "The two resolver amplitudes identify the angle and quadrant.",
            ),
          },
        },
      ),
      step(
        L(
          "3. Bandingkan encoder absolut dan inkremental",
          "3. Compare absolute and incremental encoders",
        ),
        [
          L(
            "Encoder absolut memberi kode posisi yang unik dalam rentangnya. Setelah daya kembali, tipe absolut satu putaran dapat membaca sudut tanpa menghitung pulsa sejak nol. Encoder inkremental menghitung perubahan posisi, sehingga biasanya perlu acuan awal atau homing.",
            "An absolute encoder gives a unique position code within its range. After power returns, a single-turn absolute encoder can read angle without counting pulses from zero. An incremental encoder counts position changes and usually needs an initial reference or homing.",
          ),
          L(
            "Encoder absolut biasanya memerlukan pembacaan kode yang lebih rumit dan biaya lebih tinggi untuk spesifikasi setara. Jangan menganggap encoder absolut satu putaran juga menyimpan jumlah putaran; itu memerlukan kemampuan multiturn.",
            "Absolute encoders generally need more involved code readout and cost more at comparable specifications. A single-turn absolute encoder does not automatically retain the turn count; that requires multiturn capability.",
          ),
        ],
      ),
      step(
        L(
          "4. Tempatkan gauge agar pengaruh lentur menjumlah",
          "4. Place the gauges so bending contributions add",
        ),
        [
          L(
            r`Tetapkan suplai pada simpul atas dan bawah jembatan, lalu keluaran \(V_o=V_R-V_L\). Satu susunan yang sah: kiri atas A1, kiri bawah A2, kanan atas D1, kanan bawah D2. Pada beban ke bawah, A1 memanjang dan A2 memendek.`,
            r`Apply excitation to the top and bottom bridge nodes and define \(V_o=V_R-V_L\). One valid arrangement is A1 upper left, A2 lower left, D1 upper right, D2 lower right. Under the downward load, A1 stretches and A2 shortens.`,
          ),
          L(
            r`Dengan \(\delta_i=\Delta R_i/R\), kontribusi lengan kiri atas dan kanan bawah bertanda positif. Kontribusi dua lengan lain bertanda negatif. Karena A1 dan A2 mengalami regangan berlawanan, tempatkan keduanya pada lengan bersebelahan.`,
            r`With \(\delta_i=\Delta R_i/R\), the upper-left and lower-right arms contribute positively. The other two contribute negatively. Since A1 and A2 have opposite strain signs, put them in adjacent arms.`,
          ),
        ],
        {
          math: r`\frac{V_o}{V_s}\approx\frac14(\delta_{A1}-\delta_{A2}-\delta_{D1}+\delta_{D2})`,
          visual: {
            kind: "strain",
            params: {
              mode: "bending",
              topLeft: "A1",
              bottomLeft: "A2",
              topRight: "D1",
              bottomRight: "D2",
              transverse: 1,
            },
            caption: L(
              "A1 tarik dan A2 tekan. Susunan jembatan menjaga sinyal lentur saling menambah.",
              "A1 is in tension and A2 in compression. Bridge placement makes the bending signals add.",
            ),
          },
        },
      ),
      step(
        L(
          "5. Jelaskan fungsi D1 dan D2 dengan tepat",
          "5. Explain D1 and D2 carefully",
        ),
        [
          L(
            "Fungsi yang dituju ialah mengurangi perubahan keluaran akibat suhu. Jika semua gauge sejenis mengalami perubahan suhu sama, perubahan tahanan bersama saling menghapus pada jembatan.",
            "Their intended function is to reduce temperature-induced output change. When matching gauges experience the same temperature change, their common resistance change cancels in the bridge.",
          ),
          L(
            r`Gambar menaruh D1/D2 melintang pada balok. Jika keduanya merekat pada balok, mereka juga merasakan regangan Poisson: D1 sebesar \(-\nu\varepsilon\), D2 sebesar \(+\nu\varepsilon\). Jadi, jangan menyebutnya bebas regangan tanpa asumsi tambahan. Dalam model dummy ideal yang terpisah dari regangan mekanik, kedua kontribusi mekaniknya nol.`,
            r`The drawing places D1/D2 transversely on the beam. If bonded, they also sense Poisson strain: \(-\nu\varepsilon\) at D1 and \(+\nu\varepsilon\) at D2. Do not call them strain-free without an extra assumption. For ideal dummy gauges isolated from mechanical strain, both mechanical contributions are zero.`,
          ),
        ],
        {
          math: r`\left.\frac{V_o}{V_s}\right|_{\mathrm{bonded}}\approx\frac{GF(1+\nu)\varepsilon}{2},\qquad \left.\frac{V_o}{V_s}\right|_{\mathrm{ideal\ dummy}}\approx\frac{GF\varepsilon}{2}`,
        },
      ),
      step(
        L(
          "6. Baca urutan pulsa untuk mengetahui arah",
          "6. Read the pulse order to determine direction",
        ),
        [
          L(
            "Dua kanal A dan B bergeser seperempat periode. Jika A mendahului B, tetapkan satu arah; jika B mendahului A, arah berbalik. Hubungan dengan searah jarum jam bergantung pada pemasangan, jadi cek sekali dengan gerak yang diketahui.",
            "Channels A and B are shifted by a quarter period. If A leads B, assign one direction; if B leads A, the direction reverses. Which one is clockwise depends on installation, so verify it with a known rotation.",
          ),
        ],
        {
          math: r`\text{A leads: }00\to10\to11\to01\to00\\\text{B leads: }00\to01\to11\to10\to00`,
          visual: {
            kind: "encoder",
            params: { mode: "quadrature", pulses: 8 },
            caption: L(
              "Urutan perubahan A/B menentukan arah, bukan besar frekuensi saja.",
              "The A/B transition order determines direction; frequency alone does not.",
            ),
          },
        },
      ),
    ],
    answer: L(
      "LVDT mengukur perpindahan lurus, resolver mengukur sudut. Encoder absolut memberi kode posisi; encoder inkremental menghitung perubahan. Tempatkan A1/A2 bersebelahan dan D1/D2 pada dua lengan lain sesuai diagram. D membantu kompensasi suhu; gauge melintang yang merekat juga merasakan efek Poisson. Arah encoder berasal dari kanal yang mendahului.",
      "An LVDT measures linear displacement; a resolver measures angle. Absolute encoders give position codes; incremental encoders count changes. Put A1/A2 in adjacent arms and D1/D2 in the remaining arms as shown. D gauges help compensate temperature; bonded transverse gauges also sense Poisson strain. Encoder direction comes from the leading channel.",
    ),
    assumptions: [
      L(
        "Penamaan lengan pada pembahasan kita tetapkan secara eksplisit; susunan yang setara dengan polaritas keluaran terbalik juga sah. Identifikasi regangan D mengikuti orientasi pada gambar, bukan huruf D saja.",
        "Arm names are defined explicitly; equivalent arrangements with reversed output polarity are also valid. The D-gauge strain interpretation follows the drawing orientation, not the letter D alone.",
      ),
    ],
    visual: {
      kind: "resolver",
      caption: L(
        "Resolver memakai dua keluaran yang saling melengkapi untuk membaca sudut.",
        "A resolver uses two complementary outputs to read angle.",
      ),
    },
    referencePages: [15, 16, 17, 20, 21, 23],
  },
  {
    id: "2025-uts2-q5",
    year: 2025,
    exam: "uts2",
    number: 5,
    topic: "temperature",
    title: L("RTD pada jembatan Wheatstone", "RTD in a Wheatstone bridge"),
    source: { ...uts, pages: [3] },
    originalLanguage: "en",
    original: r`5. RTD Sensor and Signal Conditioning
An RTD (Resistance Temperature Detector) is used as one arm (R4) of a Wheatstone bridge, as shown in the figure below. The RTD is used to measure a constant temperature, with the bridge operating in deflection mode. The RTD has a resistance of 25 Ω at a temperature of 0°C, and a thermal coefficient of resistance, β = 0.004 °C⁻¹. The resistance of the RTD as a function of temperature is given by: R(T) = R0(1 + βT).
a. [5%] If the RTD is subjected to a temperature of 100°C, calculate the resistance of RTD.
b. [5%] Then, if the input voltage to the bridge is 5 V, calculate the output voltage of the bridge.
Figure data: R2 = R3 = 100 Ω; R1 = 25 Ω at 0°C and balanced bridge conditions. Excitation connects the left and right diamond nodes; the galvanometer connects the upper and lower nodes.`,
    prompt: L(
      r`RTD menjadi lengan \(R_4\) jembatan Wheatstone yang bekerja dalam mode defleksi. Diketahui \(R_0=25\ \Omega\), \(\beta=0.004\ ^\circ\mathrm C^{-1}\), dan \(R(T)=R_0(1+\beta T)\). Pada gambar, \(R_2=R_3=100\ \Omega\) serta \(R_1=25\ \Omega\). Suplai menghubungkan simpul kiri dan kanan; keluaran menghubungkan simpul atas dan bawah.
(a) Hitung tahanan RTD pada \(100^\circ\mathrm C\). (b) Hitung keluaran untuk suplai \(5\ \mathrm V\).`,
      r`An RTD forms arm \(R_4\) of a Wheatstone bridge operating in deflection mode. Given \(R_0=25\ \Omega\), \(\beta=0.004\ ^\circ\mathrm C^{-1}\), and \(R(T)=R_0(1+\beta T)\). The figure has \(R_2=R_3=100\ \Omega\) and \(R_1=25\ \Omega\). Excitation connects the left/right nodes, and output connects the top/bottom nodes.
(a) Find RTD resistance at \(100^\circ\mathrm C\). (b) Find bridge output for a \(5\ \mathrm V\) supply.`,
    ),
    steps: [
      step(
        L(
          "1. Ubah suhu menjadi tahanan",
          "1. Convert temperature to resistance",
        ),
        [
          L(
            "Koefisien positif berarti tahanan naik saat suhu naik. Kenaikan relatif pada 100 °C ialah 0.004 × 100 = 0.4, yaitu 40% dari tahanan awal.",
            "A positive coefficient means resistance increases with temperature. At 100 °C the fractional increase is 0.004 × 100 = 0.4, or 40% of the initial resistance.",
          ),
        ],
        { math: r`R_4=25[1+0.004(100)]=35\ \Omega` },
      ),
      step(
        L(
          "2. Tetapkan simpul sebelum memakai rumus",
          "2. Define the nodes before using a formula",
        ),
        [
          L(
            r`Ikuti sambungan pada gambar: simpul kiri \(+5\ \mathrm V\), simpul kanan \(0\ \mathrm V\). Cabang atas terdiri dari \(R_2\) lalu \(R_3\); cabang bawah terdiri dari \(R_1\) lalu RTD. Dengan pembaca berimpedansi tinggi, masing-masing cabang menjadi pembagi tegangan.`,
            r`Follow the drawing: take the left node as \(+5\ \mathrm V\) and the right node as \(0\ \mathrm V\). The upper branch contains \(R_2\) then \(R_3\); the lower branch contains \(R_1\) then the RTD. With a high-impedance readout, each branch is a voltage divider.`,
          ),
        ],
        {
          visual: {
            kind: "bridge",
            params: {
              topology: "side-excitation",
              R1: 25,
              R2: 100,
              R3: 100,
              R4: 35,
              V: 5,
            },
            caption: L(
              "Suplai kiri–kanan dan keluaran atas–bawah mengikuti sambungan asli.",
              "Left/right excitation and top/bottom output follow the original wiring.",
            ),
          },
        },
      ),
      step(
        L(
          "3. Hitung dua tegangan simpul",
          "3. Calculate the two node voltages",
        ),
        [
          L(
            "Simpul atas berada tepat di tengah 5 V karena dua tahanannya sama. Pada cabang bawah, RTD yang lebih besar membuat tegangan simpul bawah naik dari 2.5 V.",
            "The upper node is halfway across 5 V because its resistors are equal. In the lower branch, the larger RTD raises the lower-node voltage above 2.5 V.",
          ),
        ],
        {
          math: r`V_{\mathrm{top}}=5\frac{R_3}{R_2+R_3}=5\frac{100}{200}=2.500\ \mathrm V\\V_{\mathrm{bottom}}=5\frac{R_4}{R_1+R_4}=5\frac{35}{60}=2.91667\ \mathrm V`,
        },
      ),
      step(
        L(
          "4. Ambil selisih dan cek kondisi nol",
          "4. Take the difference and check the zero condition",
        ),
        [
          L(
            r`Untuk definisi \(V_o=V_{\mathrm{top}}-V_{\mathrm{bottom}}\), keluaran negatif. Jika kabel pembaca dibalik, tandanya berubah, tetapi besarnya tetap. Pada \(0^\circ\mathrm C\), kedua simpul bernilai 2.5 V sehingga jembatan seimbang.`,
            r`With \(V_o=V_{\mathrm{top}}-V_{\mathrm{bottom}}\), output is negative. Reversing the readout leads changes the sign but not the magnitude. At \(0^\circ\mathrm C\), both nodes are at 2.5 V and the bridge is balanced.`,
          ),
        ],
        {
          math: r`V_o=2.500-2.91667=-0.41667\ \mathrm V,\qquad |V_o|=0.41667\ \mathrm V`,
        },
      ),
    ],
    answer: L(
      "Tahanan RTD ialah 35 Ω. Besar tegangan keluaran 0.4167 V; dengan polaritas atas dikurangi bawah, keluarannya −0.4167 V.",
      "RTD resistance is 35 Ω. Output magnitude is 0.4167 V; with top-minus-bottom polarity, output is −0.4167 V.",
    ),
    answerMath: r`\boxed{R(100^\circ\mathrm C)=35\ \Omega,\qquad |V_o|=0.4167\ \mathrm V}`,
    assumptions: [
      L(
        "Pembaca keluaran berimpedansi tinggi, tahanan kabel dan pemanasan sendiri diabaikan. Polaritas sumber dan pembaca kita definisikan karena gambar tidak memberi tanda keluaran.",
        "The output readout has high impedance; lead resistance and self-heating are neglected. Supply/readout polarity is explicitly defined because the drawing does not label output polarity.",
      ),
    ],
    visual: {
      kind: "rtd",
      params: {
        R0: 25,
        alpha: 0.004,
        T: 100,
        V: 5,
        R1: 25,
        R2: 100,
        R3: 100,
        topology: "side-excitation",
      },
      caption: L(
        "Suhu mengubah tahanan RTD dan ketakseimbangan jembatan.",
        "Temperature changes RTD resistance and bridge imbalance.",
      ),
    },
    referencePages: [2, 3, 5],
  },
  {
    id: "2025-uts2-q6",
    year: 2025,
    exam: "uts2",
    number: 6,
    topic: "calibration",
    title: L(
      "Memilih kalibrasi statik atau dinamik",
      "Choosing static or dynamic calibration",
    ),
    source: { ...uts, pages: [3] },
    originalLanguage: "en",
    original: `6. Practicum Questions: Static and Dynamic Calibration\na. [5%] When should dynamic calibration be performed instead of static calibration?\nb. [5%] Why is sensor calibration important?`,
    prompt: L(
      "(a) Kapan kita perlu kalibrasi dinamik, bukan hanya kalibrasi statik? (b) Mengapa kalibrasi sensor penting?",
      "(a) When is dynamic calibration needed rather than static calibration alone? (b) Why is sensor calibration important?",
    ),
    steps: [
      step(
        L(
          "1. Lihat apakah besaran berubah selama pengukuran",
          "1. Check whether the measurand changes during measurement",
        ),
        [
          L(
            "Kalibrasi statik memberi masukan yang tetap atau berubah cukup lambat hingga keluaran stabil. Metode ini cocok untuk mencari hubungan masukan-keluaran, offset, sensitivitas, dan ketaklinieran pada kondisi tunak.",
            "Static calibration applies constant inputs or changes them slowly enough for the output to settle. It establishes the steady-state input/output relation, offset, sensitivity, and nonlinearity.",
          ),
        ],
      ),
      step(
        L(
          "2. Pilih kalibrasi dinamik untuk perubahan cepat",
          "2. Choose dynamic calibration for rapid changes",
        ),
        [
          L(
            "Gunakan kalibrasi dinamik saat laju perubahan masukan sebanding dengan, atau lebih cepat dari, respons sensor. Contohnya pengukuran getaran, benturan, atau suhu yang berubah cepat. Sensor bisa benar pada keadaan tunak tetapi terlambat atau salah amplitudo saat digunakan.",
            "Use dynamic calibration when the input changes on a timescale comparable to, or faster than, the sensor response. Examples include vibration, impact, and rapid temperature changes. A sensor can be correct at steady state yet lag or distort amplitude in use.",
          ),
        ],
      ),
      step(
        L(
          "3. Ukur hubungan waktu atau frekuensi",
          "3. Measure the time or frequency response",
        ),
        [
          L(
            "Masukan tangga dapat menunjukkan waktu tanggap dan waktu tunak. Masukan sinus pada beberapa frekuensi menunjukkan perubahan sensitivitas dan beda fase. Hasilnya menentukan rentang frekuensi yang masih memberi pembacaan layak.",
            "A step input can reveal response and settling times. Sinusoidal inputs at several frequencies reveal sensitivity changes and phase shift. These results identify the usable measurement frequency range.",
          ),
        ],
        {
          math: r`K=\frac{\Delta y_{\mathrm{steady}}}{\Delta x},\qquad G(j\omega)=\frac{Y(j\omega)}{X(j\omega)}`,
        },
      ),
      step(
        L(
          "4. Jelaskan manfaat kalibrasi",
          "4. Explain the purpose of calibration",
        ),
        [
          L(
            "Kalibrasi membandingkan alat dengan acuan yang diketahui, sehingga kita dapat menaksir galat, membuat koreksi, dan menyatakan ketidakpastian. Kalibrasi ulang juga membantu melihat drift akibat waktu atau kondisi pemakaian. Kalibrasi tidak otomatis memperbaiki alat; hasilnya memberi dasar untuk koreksi atau penyetelan.",
            "Calibration compares the instrument with a known reference so we can estimate errors, apply corrections, and state uncertainty. Recalibration also reveals drift with time or use. Calibration does not automatically repair the instrument; it provides evidence for correction or adjustment.",
          ),
        ],
      ),
    ],
    answer: L(
      "Kalibrasi dinamik diperlukan saat respons waktu sensor memengaruhi hasil. Kalibrasi statik tetap diperlukan untuk skala dan offset; kalibrasi dinamik menambah informasi amplitudo, fase, dan batas frekuensi.",
      "Dynamic calibration is needed when sensor response time affects the result. Static calibration still establishes scale and offset; dynamic calibration adds amplitude, phase, and frequency-limit information.",
    ),
    visual: {
      kind: "calibration",
      params: { mode: "static-dynamic" },
      caption: L(
        "Hubungan tunak dan respons terhadap waktu menjawab dua kebutuhan kalibrasi yang berbeda.",
        "Steady-state relation and time response answer different calibration needs.",
      ),
    },
    referencePages: [19],
  },
  {
    id: "2025-uas-q1",
    year: 2025,
    exam: "uas",
    number: 1,
    topic: "systems",
    title: L(
      "Peran elemen sistem pengukuran",
      "Roles of measurement-system elements",
    ),
    source: { ...uas, pages: [1] },
    originalLanguage: "en",
    original: `1. [10%] Elements of Measurement Systems\nPlease categorize the following elements into sensing elements, signal conditioning elements, signal processing elements, or data presentation elements.\na. Incremental encoder.\nb. LVDT\nc. Wheatstone bridge\nd. Inverting amplifier\ne. Low pass filter\nf. Analog to Digital Converter\ng. Strain gauge\nh. Resistance Temperature Dependence\ni. Current to voltage converter\nj. Capacitive proximity probe`,
    prompt: L(
      "Kelompokkan: (a) encoder inkremental, (b) LVDT, (c) jembatan Wheatstone, (d) penguat pembalik, (e) filter lolos rendah, (f) konverter analog-ke-digital, (g) strain gauge, (h) RTD yang disebut “Resistance Temperature Dependence” pada sumber, (i) konverter arus-ke-tegangan, dan (j) probe kedekatan kapasitif. Pilih elemen perasa, pengondisi sinyal, pemroses sinyal, atau penyaji data.",
      "Classify (a) incremental encoder, (b) LVDT, (c) Wheatstone bridge, (d) inverting amplifier, (e) low-pass filter, (f) analog-to-digital converter, (g) strain gauge, (h) RTD, termed “Resistance Temperature Dependence” in the source, (i) current-to-voltage converter, and (j) capacitive proximity probe as sensing, signal-conditioning, signal-processing, or data-presentation elements.",
    ),
    steps: [
      step(
        L(
          "1. Cari komponen yang langsung merasakan besaran",
          "1. Find the components that directly sense the measurand",
        ),
        [
          L(
            "Elemen perasa berinteraksi langsung dengan besaran yang ingin diukur. Kelompok ini berisi (a) encoder inkremental untuk gerak/sudut, (b) LVDT untuk perpindahan, (g) strain gauge untuk regangan, (h) RTD untuk suhu, dan (j) probe kapasitif untuk kedekatan atau jarak.",
            "Sensing elements directly interact with the quantity being measured. These are (a) incremental encoder for motion/angle, (b) LVDT for displacement, (g) strain gauge for strain, (h) RTD for temperature, and (j) capacitive probe for proximity or distance.",
          ),
        ],
      ),
      step(
        L(
          "2. Cari komponen yang menyiapkan sinyal",
          "2. Find the components that prepare the signal",
        ),
        [
          L(
            "Pengondisi sinyal mengubah bentuk atau besar sinyal agar mudah dibaca. (c) Jembatan Wheatstone mengubah beda tahanan menjadi beda tegangan. (d) Penguat pembalik memberi penguatan serta pembalikan tanda. (e) Filter lolos rendah menekan komponen frekuensi tinggi. (i) Konverter arus-ke-tegangan mengubah sinyal arus menjadi tegangan.",
            "Signal-conditioning elements adjust signal form or size for readout. (c) A Wheatstone bridge converts resistance imbalance to voltage. (d) An inverting amplifier scales and inverts the signal. (e) A low-pass filter suppresses high-frequency components. (i) A current-to-voltage converter changes current into voltage.",
          ),
        ],
      ),
      step(
        L(
          "3. Tempatkan konverter analog-ke-digital",
          "3. Place the analog-to-digital converter",
        ),
        [
          L(
            "Dengan pembagian fungsi pada pembahasan ini, (f) ADC masuk pemroses sinyal karena mengubah nilai analog menjadi kode digital. Beberapa arsitektur memasukkan ADC ke blok akuisisi atau pengondisian. Jelaskan fungsi konversinya agar klasifikasi tidak bergantung pada nama blok saja.",
            "Under the functional grouping used here, (f) the ADC is a signal-processing element because it converts an analog value into a digital code. Some architectures include it in acquisition or conditioning. State the conversion function so the classification does not depend on block labels alone.",
          ),
        ],
      ),
      step(
        L(
          "4. Periksa apakah ada penyaji data",
          "4. Check for a data-presentation element",
        ),
        [
          L(
            "Daftar soal tidak memuat penyaji data. Contoh kelompok ini ialah layar angka, grafik, penunjuk, atau pencatat hasil. Jangan memaksa salah satu sensor masuk ke sini hanya agar semua kelompok terisi.",
            "The list contains no data-presentation element. Examples would be a numeric display, plot, pointer, or recorder. There is no need to force a sensor into this group just to fill every category.",
          ),
        ],
      ),
    ],
    answer: L(
      "Perasa: a, b, g, h, j. Pengondisi: c, d, e, i. Pemroses: f, dengan konvensi pembagian fungsi di atas. Penyaji data: tidak ada pada daftar.",
      "Sensing: a, b, g, h, j. Conditioning: c, d, e, i. Processing: f, under the stated functional convention. Presentation: none in the list.",
    ),
    visual: {
      kind: "system",
      params: { mode: "elements" },
      caption: L(
        "Telusuri perubahan besaran fisik hingga sinyal dan hasil yang terbaca.",
        "Follow the path from a physical quantity to a signal and readable result.",
      ),
    },
    referencePages: [1, 2, 6, 14, 15, 16, 17],
  },
  {
    id: "2025-uas-q2",
    year: 2025,
    exam: "uas",
    number: 2,
    topic: "calibration",
    title: L(
      "Kalibrasi sensor dan perubahan catu",
      "Sensor calibration and supply variation",
    ),
    source: { ...uas, pages: [1, 3] },
    originalLanguage: "en",
    original: r`2. [20%] Systematic Characteristics of Measurement System
A displacement sensor has an input range of 0.0 to 0.3 cm and a standard supply voltage Vs = 1.0 volts. Using the calibration results given in the table, estimate:
a. [5%] The slope K of the ideal straight line.
b. [10%] The constant KI, KM associated with supply voltage variations.
c. [5%] The maximum nonlinearity as a percentage of f.s.d.
Displacement x in cm: 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0.
Output voltage in millivolts when Vs = 1.0 V: 0, 33, 64, 88, 103, 111, 116.
Output voltage in millivolts when Vs = 1.2 V: 0, 42, 83, 112, 130, 141, 148.
Useful formula: \(O=KI+K_M I_M I+a+K_I I_I+N(I)\).`,
    prompt: L(
      r`Sensor perpindahan memakai catu acuan \(V_s=1.0\ \mathrm V\). Teks soal menyebut rentang 0.0–0.3 cm, tetapi tabel memberi 0.0–3.0 cm. Kita pertahankan catatan ini dan memakai angka tabel secara konsisten.
Untuk \(x=[0,0.5,1,1.5,2,2.5,3]\ \mathrm{cm}\), keluaran pada 1.0 V ialah \([0,33,64,88,103,111,116]\ \mathrm{mV}\), dan pada 1.2 V ialah \([0,42,83,112,130,141,148]\ \mathrm{mV}\).
(a) Cari kemiringan ideal \(K\). (b) Taksir \(K_I\) dan \(K_M\) akibat perubahan catu. (c) Cari ketaklinieran maksimum dalam persen skala penuh.`,
      r`The displacement sensor uses a \(1.0\ \mathrm V\) reference supply. The prose states a 0.0–0.3 cm range, but the table spans 0.0–3.0 cm. We retain this discrepancy and consistently use the table values.
For \(x=[0,0.5,1,1.5,2,2.5,3]\ \mathrm{cm}\), output at 1.0 V is \([0,33,64,88,103,111,116]\ \mathrm{mV}\); output at 1.2 V is \([0,42,83,112,130,141,148]\ \mathrm{mV}\).
(a) Find ideal slope \(K\). (b) Estimate supply-related \(K_I\) and \(K_M\). (c) Find maximum nonlinearity as a percentage of full-scale deflection.`,
    ),
    steps: [
      step(
        L(
          "1. Pakai garis dua ujung sebagai acuan",
          "1. Use an endpoint reference line",
        ),
        [
          L(
            "Pada catu standar, dua ujung tabel adalah (0 cm, 0 mV) dan (3 cm, 116 mV). Garis ideal melewati kedua titik ini, sehingga offset acuannya nol.",
            "At the standard supply, the table endpoints are (0 cm, 0 mV) and (3 cm, 116 mV). The ideal line passes through both, so its reference offset is zero.",
          ),
        ],
        {
          math: r`K=\frac{116-0}{3-0}=38.6667\ \mathrm{mV/cm},\qquad a=0,\qquad O_{\mathrm{lin}}(x)=38.6667x`,
        },
      ),
      step(
        L(
          "2. Pisahkan perubahan offset dan kemiringan",
          "2. Separate offset and slope changes",
        ),
        [
          L(
            r`Gunakan \(\Delta V_s=V_s-1.0\ \mathrm V\). Koefisien \(K_I\) menunjukkan pergeseran keluaran yang tidak bergantung pada posisi. Koefisien \(K_M\) menunjukkan perubahan sensitivitas per perubahan catu. Model berikut memakai taksiran garis ujung.`,
            r`Define \(\Delta V_s=V_s-1.0\ \mathrm V\). Coefficient \(K_I\) describes a position-independent output shift. Coefficient \(K_M\) describes sensitivity change per supply change. The following model uses endpoint estimates.`,
          ),
        ],
        { math: r`O(x,V_s)\approx[K+K_M\Delta V_s]x+a+K_I\Delta V_s+N(x,V_s)` },
      ),
      step(
        L("3. Cari KI dari titik nol", "3. Find KI from the zero-input point"),
        [
          L(
            "Pada x = 0, kedua catu memberi keluaran 0 mV. Jadi, perubahan catu tidak menggeser titik nol pada data ini.",
            "At x = 0, both supplies give 0 mV. Thus the supply change does not shift the zero-input output in these data.",
          ),
        ],
        {
          math: r`K_I=\frac{O(0,1.2)-O(0,1.0)}{1.2-1.0}=\frac{0-0}{0.2}=0\ \mathrm{mV/V}`,
        },
      ),
      step(
        L(
          "4. Cari KM dari perubahan kemiringan",
          "4. Find KM from the change in slope",
        ),
        [
          L(
            "Garis ujung pada 1.2 V memiliki kemiringan 148/3 mV/cm. Kurangi dengan kemiringan acuan lalu bagi 0.2 V.",
            "The endpoint line at 1.2 V has slope 148/3 mV/cm. Subtract the reference slope and divide by 0.2 V.",
          ),
        ],
        {
          math: r`K_{1.2}=\frac{148}{3}=49.3333\ \mathrm{mV/cm}\\K_M=\frac{49.3333-38.6667}{0.2}=53.3333\ \mathrm{mV/(cm\,V)}`,
          note: L(
            "Ini taksiran dari dua ujung, bukan kecocokan tepat semua titik. Misalnya pada x = 1 cm, model perubahan garis memberi 10.667 mV, sedangkan tabel memberi 19 mV. Bentuk ketaklinieran juga berubah bersama catu.",
            "This is an endpoint estimate, not an exact fit to every point. At x = 1 cm, the line-change model predicts 10.667 mV, while the table gives 19 mV. The nonlinear residual also changes with supply.",
          ),
        },
      ),
      step(
        L(
          "5. Hitung simpangan pada setiap posisi",
          "5. Calculate the deviation at each position",
        ),
        [
          L(
            "Gunakan data catu standar 1.0 V untuk menilai ketaklinieran sensor acuan. Kurangi setiap keluaran tabel dengan keluaran garis ideal pada posisi yang sama.",
            "Use the standard 1.0 V data to assess reference-supply nonlinearity. Subtract the ideal-line output from each table output at the same position.",
          ),
        ],
        {
          math: r`N(x)=O(x,1.0)-38.6667x`,
          table: {
            headers: [
              L("x (cm)", "x (cm)"),
              L("O (mV)", "O (mV)"),
              L("Garis ideal (mV)", "Ideal line (mV)"),
              L("Simpangan (mV)", "Deviation (mV)"),
            ],
            rows: [
              ["0.0", "0", "0.000", "0.000"],
              ["0.5", "33", "19.333", "13.667"],
              ["1.0", "64", "38.667", "25.333"],
              ["1.5", "88", "58.000", "30.000"],
              ["2.0", "103", "77.333", "25.667"],
              ["2.5", "111", "96.667", "14.333"],
              ["3.0", "116", "116.000", "0.000"],
            ],
          },
        },
      ),
      step(
        L(
          "6. Nyatakan simpangan maksimum dalam persen",
          "6. Express the maximum deviation as a percentage",
        ),
        [
          L(
            "Simpangan terbesar pada titik yang tersedia ialah 30 mV di x = 1.5 cm. Rentang keluaran penuh ialah 116 mV. Persentase ini memakai skala penuh, bukan nilai 88 mV pada titik tersebut.",
            "The largest deviation among the supplied points is 30 mV at x = 1.5 cm. Full output span is 116 mV. The percentage uses full scale, not the 88 mV output at that point.",
          ),
        ],
        { math: r`\%N_{\max}=\frac{30}{116}\,100\%=25.8621\%` },
      ),
    ],
    answer: L(
      "Dengan tabel 0–3 cm dan garis dua ujung: K = 38.667 mV/cm, KI = 0, KM ≈ 53.333 mV/(cm·V), serta ketaklinieran maksimum 25.86% skala penuh pada titik sampel.",
      "Using the 0–3 cm table and endpoint lines: K = 38.667 mV/cm, KI = 0, KM ≈ 53.333 mV/(cm·V), and maximum sampled nonlinearity is 25.86% of full scale.",
    ),
    answerMath: r`\boxed{\begin{aligned}K&=38.667\ \mathrm{mV/cm},\quad K_I=0\ \mathrm{mV/V}\\K_M&\approx53.333\ \mathrm{mV/(cm\,V)}\\N_{\max}&=25.86\%\ \mathrm{FS}\end{aligned}}`,
    assumptions: [
      L(
        "Rentang 0.0–0.3 cm pada paragraf bertentangan dengan tabel 0.0–3.0 cm. Hasil memakai tabel. Jika seluruh posisi tabel seharusnya sepersepuluhnya, K dan KM menjadi sepuluh kali lebih besar; persen ketaklinieran tetap.",
        "The prose range 0.0–0.3 cm conflicts with the 0.0–3.0 cm table. Results use the table. If every tabulated position should be one tenth as large, K and KM become ten times larger; percentage nonlinearity stays unchanged.",
      ),
      L(
        "K dan KM memakai garis dua ujung, bukan regresi kuadrat terkecil. Data tidak mendukung satu model perubahan catu linear yang tepat untuk semua posisi. Maksimum di antara titik sampel belum membuktikan maksimum pada setiap posisi kontinu.",
        "K and KM use endpoint lines, not least-squares regression. The data do not support one exact linear supply-change model at every position. The sampled maximum does not prove the maximum at every continuous position.",
      ),
    ],
    visual: {
      kind: "calibration",
      params: {
        xs: [0, 0.5, 1, 1.5, 2, 2.5, 3],
        ys: [0, 33, 64, 88, 103, 111, 116],
        ys2: [0, 42, 83, 112, 130, 141, 148],
        supply1: 1,
        supply2: 1.2,
        xUnit: "cm",
        yUnit: "mV",
      },
      caption: L(
        "Bandingkan data kalibrasi, garis dua ujung, dan jarak vertikal tiap titik.",
        "Compare calibration data, endpoint lines, and each point’s vertical deviation.",
      ),
    },
  },
  {
    id: "2025-uas-q3",
    year: 2025,
    exam: "uas",
    number: 3,
    topic: "position",
    title: L(
      "Encoder 8 bit dan cara kerja resolver",
      "8-bit encoder and resolver operation",
    ),
    source: { ...uas, pages: [1, 2] },
    originalLanguage: "en",
    original: `3. [25%] Angular Position Measurement\na. [5%] Explain the working principle of an incremental encoder. How can you determine the direction of rotation that occurs?\nb. [5%] What is the difference between an incremental encoder and an absolute encoder? What are the weaknesses of an incremental encoder?\nc. [5%] Calculate the resolution in degrees of an 8-bit encoder.\nd. [5%] What are the advantages and disadvantages of resolver compared to linear potentiometer?\ne. [5%] Explain briefly how the following resolver works.\nFigure: rotor reference RH/RL coupled through a brushless excitation transformer; perpendicular stator windings S2/S4 marked K Ref Cos θ and S3/S1 marked K Ref Sin θ.`,
    prompt: L(
      r`(a) Jelaskan prinsip encoder inkremental dan penentuan arah putarannya. (b) Bandingkan dengan encoder absolut serta sebutkan kelemahannya. (c) Hitung resolusi sudut encoder 8 bit untuk satu putaran. (d) Bandingkan kelebihan dan kekurangan resolver terhadap potensiometer linear. (e) Jelaskan resolver pada gambar, yang memiliki keluaran \(K\,\mathrm{Ref}\cos\theta\) dan \(K\,\mathrm{Ref}\sin\theta\).`,
      r`(a) Explain incremental-encoder operation and direction detection. (b) Compare it with an absolute encoder and state its weaknesses. (c) Find the angular resolution of an 8-bit encoder over one turn. (d) Compare a resolver’s strengths and weaknesses with a linear potentiometer. (e) Explain the pictured resolver with \(K\,\mathrm{Ref}\cos\theta\) and \(K\,\mathrm{Ref}\sin\theta\) outputs.`,
    ),
    steps: [
      step(
        L("1. Hitung gerak dari pulsa", "1. Count motion from pulses"),
        [
          L(
            "Pada encoder inkremental optik, pola terang-gelap pada cakram melewati pemancar dan penerima. Setiap perubahan menghasilkan pulsa. Banyak pulsa memberi perubahan sudut, sedangkan frekuensi pulsa memberi kecepatan putar.",
            "In an optical incremental encoder, alternating disk regions pass a light emitter and receiver to produce pulses. Pulse count gives angular displacement, while pulse frequency gives rotational speed.",
          ),
        ],
        {
          math: r`\Delta\theta=\frac{360^\circ}{N_{\mathrm{count/rev}}}\Delta n`,
        },
      ),
      step(
        L(
          "2. Gunakan dua kanal untuk arah",
          "2. Use two channels for direction",
        ),
        [
          L(
            "A dan B berbeda fase seperempat periode. Urutan 00 → 10 → 11 → 01 berarti A mendahului B. Urutan terbalik berarti arah berbalik. Satu kanal saja tidak memberi informasi arah yang unik.",
            "A and B are separated by a quarter period. The order 00 → 10 → 11 → 01 means A leads B. Reversing the order indicates reverse rotation. A single channel does not uniquely identify direction.",
          ),
        ],
        {
          visual: {
            kind: "encoder",
            params: { mode: "quadrature", pulses: 8 },
            caption: L(
              "Bandingkan urutan kanal saat putaran berbalik.",
              "Compare channel order when rotation reverses.",
            ),
          },
        },
      ),
      step(
        L(
          "3. Bedakan perubahan posisi dan kode posisi",
          "3. Distinguish position changes from position codes",
        ),
        [
          L(
            "Encoder inkremental menyimpan posisi melalui penghitung. Kehilangan daya atau pulsa yang terlewat dapat membuat posisi hitungan salah, sehingga perlu acuan ulang. Encoder absolut memberi kode sudut langsung. Pada tipe satu putaran, kode menunjukkan posisi dalam satu putaran, bukan jumlah putaran total.",
            "An incremental encoder tracks position with a counter. Power loss or missed pulses can invalidate the count, requiring a new reference. An absolute encoder gives a direct angle code. A single-turn model identifies position within one turn, not total accumulated turns.",
          ),
        ],
      ),
      step(
        L(
          "4. Bagi satu putaran menjadi 256 posisi",
          "4. Divide one turn into 256 positions",
        ),
        [
          L(
            "Delapan bit menyediakan 2⁸ kode. Karena sudut satu putaran 360°, lebar satu langkah sudut ialah 360°/256. Ini resolusi, bukan jaminan ketelitian alat.",
            "Eight bits provide 2⁸ codes. One turn is 360°, so each angular step spans 360°/256. This is resolution, not a guarantee of accuracy.",
          ),
        ],
        {
          math: r`N=2^8=256,\qquad \Delta\theta=\frac{360^\circ}{256}=1.40625^\circ`,
          visual: {
            kind: "encoder",
            params: { mode: "absolute", bits: 8 },
            caption: L(
              "Encoder 8 bit membagi lingkaran menjadi 256 kode posisi.",
              "An 8-bit encoder divides the circle into 256 position codes.",
            ),
          },
        },
      ),
      step(
        L(
          "5. Bandingkan resolver dengan potensiometer linear",
          "5. Compare a resolver with a linear potentiometer",
        ),
        [
          L(
            "Resolver brushless mengukur sudut melalui induksi, sehingga tidak memakai kontak geser pengukur. Ia tahan untuk putaran berulang dan tidak mengalami keausan wiper. Kekurangannya ialah kebutuhan eksitasi AC, pembaca sinus-kosinus, ukuran, dan biaya rangkaian.",
            "A brushless resolver measures angle by induction without a sliding sensing contact. It suits repeated rotation and avoids wiper wear. Its drawbacks include AC excitation, sine/cosine readout electronics, size, and circuit cost.",
          ),
          L(
            "Potensiometer linear langsung mengukur perpindahan lurus dengan pembagi tegangan DC yang sederhana dan murah. Namun, kontaknya dapat aus dan menambah noise. Keduanya mengukur jenis posisi berbeda; penggantian langsung memerlukan pengubah gerak atau potensiometer putar yang sesuai.",
            "A linear potentiometer directly measures linear displacement using a simple, inexpensive DC voltage divider. Its contact can wear and add noise. The two devices measure different forms of position; substitution needs a motion conversion or a suitable rotary potentiometer.",
          ),
        ],
      ),
      step(
        L(
          "6. Turunkan sudut dari dua keluaran resolver",
          "6. Recover angle from the resolver outputs",
        ),
        [
          L(
            r`Eksitasi AC Ref membangkitkan medan rotor. Dua kumparan stator tegak lurus menerima tegangan dengan amplitudo yang mengikuti kosinus dan sinus sudut. Setelah demodulasi terhadap Ref, gunakan kedua tanda amplitudo agar kuadran tidak hilang.`,
            r`The AC reference excites the rotor field. Two perpendicular stator windings produce voltages whose amplitudes follow cosine and sine of the shaft angle. After reference-sensitive demodulation, retain both amplitude signs to identify the quadrant.`,
          ),
        ],
        {
          math: r`v_{S2-S4}=K V_{\mathrm{ref}}\cos\theta\sin\omega_ct,\quad v_{S3-S1}=K V_{\mathrm{ref}}\sin\theta\sin\omega_ct\\\theta=\operatorname{atan2}(V_{\sin},V_{\cos})`,
          visual: {
            kind: "resolver",
            params: { angle: 40 },
            caption: L(
              "Amplitudo sinus dan kosinus berubah bersama satu sudut rotor.",
              "Sine and cosine amplitudes change with the same rotor angle.",
            ),
          },
        },
      ),
    ],
    answer: L(
      "Resolusi encoder 8 bit ialah 1.40625° per kode. Arah inkremental berasal dari urutan A/B; posisi absolut berasal dari kode. Resolver membaca sudut dari dua amplitudo sinus-kosinus yang telah didemodulasi.",
      "An 8-bit encoder resolves 1.40625° per code. Incremental direction comes from A/B order; absolute position comes from its code. A resolver derives angle from demodulated sine/cosine amplitudes.",
    ),
    answerMath: r`\boxed{\Delta\theta=1.40625^\circ/\mathrm{code}}`,
    assumptions: [
      L(
        "Encoder 8 bit mencakup satu putaran penuh dengan 256 kode. Arti searah jarum jam terhadap kanal A/B mengikuti pemasangan. Perbandingan resolver mengacu pada jenis brushless yang tampak pada sumber.",
        "The 8-bit encoder spans one full revolution with 256 codes. Clockwise meaning for A/B order depends on installation. Resolver comparison refers to the brushless type shown in the source.",
      ),
    ],
    visual: {
      kind: "encoder",
      params: { bits: 8, mode: "absolute" },
      caption: L(
        "Putar sudut untuk melihat perubahan kode dan batas resolusinya.",
        "Change angle to see the code transitions and resolution limit.",
      ),
    },
    referencePages: [14, 15, 16, 17],
  },
  {
    id: "2025-uas-q4",
    year: 2025,
    exam: "uas",
    number: 4,
    topic: "temperature",
    title: L(
      "Termokopel T dengan referensi 25 °C",
      "Type T thermocouple with a 25 °C reference",
    ),
    source: { ...uas, pages: [2, 4] },
    originalLanguage: "en",
    original: `4. [10%] Thermocouple\nA table of Type T Thermocouple relative to a reference junction temperature of 0°C is presented in the Appendix. Use the table to calculate:\na. [5%] The percentage non-linearity at 200°C if the temperature range is 0 to 400°C.\nb. [5%] The temperature inside a vessel is an e.m.f of 11.5 mV is measured relative to a reference junction of 25°C.\nRelevant appendix entries (°C → mV): 0 → 0.000; 25 → 0.992; 200 → 9.288; 258 → 12.461; 259 → 12.518; 400 → 20.872.`,
    prompt: L(
      r`Gunakan tabel termokopel tipe T dengan sambungan referensi \(0^\circ\mathrm C\). (a) Hitung ketaklinieran pada \(200^\circ\mathrm C\) untuk rentang \(0\) hingga \(400^\circ\mathrm C\). (b) Hitung suhu bejana jika tegangan terukur \(11.5\ \mathrm{mV}\) terhadap referensi \(25^\circ\mathrm C\).`,
      r`Use the Type T thermocouple table referenced to \(0^\circ\mathrm C\). (a) Find nonlinearity at \(200^\circ\mathrm C\) over a \(0\) to \(400^\circ\mathrm C\) range. (b) Find vessel temperature if the measured voltage is \(11.5\ \mathrm{mV}\) relative to a \(25^\circ\mathrm C\) reference.`,
    ),
    steps: [
      step(
        L(
          "1. Hitung tegangan garis ideal pada 200 °C",
          "1. Calculate ideal-line voltage at 200 °C",
        ),
        [
          L(
            "Tabel memberi 0 mV pada 0 °C dan 20.872 mV pada 400 °C. Karena 200 °C berada di tengah rentang, garis lurus dua ujung memberi setengah tegangan skala penuh.",
            "The table gives 0 mV at 0 °C and 20.872 mV at 400 °C. Since 200 °C is at midrange, the endpoint line gives half the full-scale voltage.",
          ),
        ],
        {
          math: r`E_{\mathrm{lin}}(200)=20.872\frac{200}{400}=10.436\ \mathrm{mV}`,
        },
      ),
      step(
        L(
          "2. Bandingkan dengan tabel nyata",
          "2. Compare with the actual table",
        ),
        [
          L(
            "Tegangan nyata pada 200 °C ialah 9.288 mV. Simpangannya negatif karena keluaran tabel berada di bawah garis ideal. Untuk persen ketaklinieran, gunakan besar simpangannya.",
            "The actual voltage at 200 °C is 9.288 mV. Its deviation is negative because it lies below the ideal line. Use the magnitude for percentage nonlinearity.",
          ),
        ],
        {
          math: r`N(200)=9.288-10.436=-1.148\ \mathrm{mV}\\\%N=\frac{1.148}{20.872}\,100\%=5.5002\%`,
        },
      ),
      step(
        L(
          "3. Tambahkan tegangan referensi 25 °C",
          "3. Add the 25 °C reference voltage",
        ),
        [
          L(
            "Tabel pada 25 °C memberi 0.992 mV. Tambahkan nilai ini ke tegangan 11.5 mV agar hasil setara dengan referensi nol.",
            "The 25 °C table entry is 0.992 mV. Add it to the measured 11.5 mV to obtain an equivalent zero-reference voltage.",
          ),
        ],
        {
          math: r`E_T(T,0)=E_T(T,25)+E_T(25,0)=11.500+0.992=12.492\ \mathrm{mV}`,
        },
      ),
      step(
        L("4. Interpolasi suhu", "4. Interpolate temperature"),
        [
          L(
            "12.492 mV berada di antara 12.461 mV pada 258 °C dan 12.518 mV pada 259 °C. Selisihnya 0.031 mV dari titik bawah dalam interval 0.057 mV.",
            "12.492 mV lies between 12.461 mV at 258 °C and 12.518 mV at 259 °C. It is 0.031 mV above the lower entry in a 0.057 mV interval.",
          ),
        ],
        {
          math: r`T=258+\frac{12.492-12.461}{12.518-12.461}=258.5439^\circ\mathrm C`,
        },
      ),
    ],
    answer: L(
      "Ketaklinieran pada 200 °C ialah 5.50% skala penuh. Setelah koreksi sambungan dingin, suhu bejana sekitar 258.54 °C.",
      "Nonlinearity at 200 °C is 5.50% of full scale. After cold-junction correction, vessel temperature is about 258.54 °C.",
    ),
    answerMath: r`\boxed{\%N_{200}=5.50\%\ \mathrm{FS},\qquad T\approx258.54^\circ\mathrm C}`,
    assumptions: [
      L(
        "Acuan ketaklinieran memakai garis dua ujung. Suhu sambungan ukur dianggap sama dengan suhu bejana. Nilai tegangan mengikuti tabel lampiran soal, tanpa mengganti pembulatannya.",
        "Nonlinearity uses an endpoint line. Measuring-junction temperature is assumed to equal vessel temperature. Voltages follow the exam appendix, retaining its rounding.",
      ),
    ],
    visual: {
      kind: "thermocouple",
      params: {
        type: "T",
        measuredMv: 11.5,
        Tref: 25,
        T: 258.544,
        rangeMax: 400,
        testC: 200,
        tableC: [0, 25, 200, 258, 259, 400],
        tableMv: [0, 0.992, 9.288, 12.461, 12.518, 20.872],
      },
      caption: L(
        "Tabel tipe T dan garis ideal menunjukkan ketaklinieran serta koreksi referensi.",
        "The Type T table and ideal line show nonlinearity and reference correction.",
      ),
    },
    referencePages: [4, 24, 25, 26],
  },
  {
    id: "2025-uas-q5",
    year: 2025,
    exam: "uas",
    number: 5,
    topic: "flow",
    title: L(
      "Orifis dengan manometer raksa",
      "Orifice with a mercury manometer",
    ),
    source: { ...uas, pages: [2, 3] },
    originalLanguage: "en",
    original: r`5. [20%] Flow Measurement System
a. [10%] Derive the equation for v1 as a function of the mercury (Hg) manometer height difference h, the density of mercury ρm, the density of the fluid ρf, and the ratio of cross-sectional diameters (d/D), as shown in Figure 1.
b. [5%] For D = 300 mm, d = 180 mm, a mercury height difference of 100 mm, mercury density of 13,600 kg/m³, and fluid density of 900 kg/m³, determine the mass flow rate of the fluid flowing in the pipe (m³/s).
c. [5%] Check whether the flow is laminar or turbulent.
Figure 1: horizontal pipe, orifice, and differential mercury U-tube manometer. The discharge-coefficient table has Re columns 10⁴, 10⁵, 10⁶, 10⁷. At d/D = 0.6, Cd = 0.63, 0.610, 0.608, 0.608. Other rows d/D: 0.2 → 0.60, 0.595, 0.594, 0.594; 0.4 → 0.61, 0.603, 0.598, 0.598; 0.5 → 0.62, 0.608, 0.603, 0.603; 0.7 → 0.64, 0.614, 0.609, 0.609.
Useful formulas: Re = ρvD/μ; Q = Av.`,
    prompt: L(
      r`(a) Turunkan kecepatan pipa \(v_1\) dari beda tinggi raksa \(h\), massa jenis raksa \(\rho_m\), massa jenis fluida \(\rho_f\), dan rasio \(d/D\). (b) Gunakan \(D=300\ \mathrm{mm}\), \(d=180\ \mathrm{mm}\), \(h=100\ \mathrm{mm}\), \(\rho_m=13600\ \mathrm{kg/m^3}\), dan \(\rho_f=900\ \mathrm{kg/m^3}\) untuk menghitung aliran. Sumber menyebut “mass flow rate” dengan satuan \(\mathrm{m^3/s}\); kita bedakan debit volume \(Q\) dan debit massa \(\dot m\). (c) Periksa rezim aliran. Tabel \(C_d\) tersedia, tetapi viskositas tidak diberikan.`,
      r`(a) Derive pipe velocity \(v_1\) from mercury height difference \(h\), mercury density \(\rho_m\), fluid density \(\rho_f\), and \(d/D\). (b) Use \(D=300\ \mathrm{mm}\), \(d=180\ \mathrm{mm}\), \(h=100\ \mathrm{mm}\), \(\rho_m=13600\ \mathrm{kg/m^3}\), and \(\rho_f=900\ \mathrm{kg/m^3}\) to calculate flow. The source asks for “mass flow rate” in \(\mathrm{m^3/s}\); distinguish volume flow \(Q\) from mass flow \(\dot m\). (c) Check the flow regime. A \(C_d\) table is given, but viscosity is missing.`,
    ),
    steps: [
      step(
        L(
          "1. Ubah beda tinggi menjadi beda tekanan",
          "1. Convert height difference to pressure difference",
        ),
        [
          L(
            r`Kedua pipa manometer berisi fluida ukur di atas raksa. Karena itu, beda tekanan memakai selisih massa jenis, bukan massa jenis raksa saja. Ambil \(h\) positif ketika tekanan hulu lebih tinggi.`,
            r`Both manometer legs contain process fluid above the mercury. Therefore pressure difference uses the density difference, not mercury density alone. Take \(h\) as positive for higher upstream pressure.`,
          ),
        ],
        {
          math: r`\Delta p=(\rho_m-\rho_f)gh=(13600-900)(9.81)(0.100)=12458.7\ \mathrm{Pa}`,
        },
      ),
      step(
        L(
          "2. Gabungkan kontinuitas dan Bernoulli",
          "2. Combine continuity and Bernoulli",
        ),
        [
          L(
            r`Tuliskan \(\beta=d/D\). Kontinuitas memberi \(v_2=v_1/\beta^2\). Masukkan ke Bernoulli pada elevasi sama, kemudian keluarkan \(v_1\) dari tanda akar. Ini adalah kecepatan ideal sebelum koreksi debit.`,
            r`Write \(\beta=d/D\). Continuity gives \(v_2=v_1/\beta^2\). Insert this into equal-elevation Bernoulli and solve for \(v_1\). This is the ideal velocity before discharge correction.`,
          ),
        ],
        {
          math: r`(\rho_m-\rho_f)gh=\frac12\rho_fv_{1,i}^{\,2}(\beta^{-4}-1)\\v_{1,i}=\beta^2\sqrt{\frac{2gh(\rho_m/\rho_f-1)}{1-\beta^4}},\qquad v_{1,\mathrm{actual}}=C_dv_{1,i}`,
          table: {
            headers: [
              L("d/D", "d/D"),
              L("Re = 10⁴", "Re = 10⁴"),
              L("Re = 10⁵", "Re = 10⁵"),
              L("Re = 10⁶", "Re = 10⁶"),
              L("Re = 10⁷", "Re = 10⁷"),
            ],
            rows: [
              ["0.2", "0.600", "0.595", "0.594", "0.594"],
              ["0.4", "0.610", "0.603", "0.598", "0.598"],
              ["0.5", "0.620", "0.608", "0.603", "0.603"],
              ["0.6", "0.630", "0.610", "0.608", "0.608"],
              ["0.7", "0.640", "0.614", "0.609", "0.609"],
            ],
          },
        },
      ),
      step(
        L(
          "3. Hitung nilai ideal yang sudah dapat ditentukan",
          "3. Calculate the ideal values that are determined",
        ),
        [
          L(
            "Rasio diameter ialah 0.6. Luas pipa berasal dari diameter 0.300 m. Kalikan luas dengan kecepatan untuk memperoleh debit volume, lalu kalikan dengan massa jenis untuk debit massa.",
            "The diameter ratio is 0.6. Pipe area uses the 0.300 m diameter. Multiply area by velocity for volume flow, then by density for mass flow.",
          ),
        ],
        {
          math: r`v_{1,i}=2.03036\ \mathrm{m/s},\quad A_1=\frac{\pi(0.300)^2}{4}=0.0706858\ \mathrm{m^2}\\Q_i=A_1v_{1,i}=0.143518\ \mathrm{m^3/s},\quad \dot m_i=900Q_i=129.166\ \mathrm{kg/s}`,
        },
      ),
      step(
        L(
          "4. Pisahkan hasil aktual dari asumsi Cd",
          "4. Separate actual flow from the coefficient assumption",
        ),
        [
          L(
            r`Untuk hasil aktual, \(Q=C_dQ_i\). Namun, tabel memilih \(C_d\) dari Reynolds, sedangkan Reynolds memerlukan viskositas. Karena sumber tidak memberi viskositas, belum ada satu nilai aktual yang unik. Jangan mengambil viskositas dari soal lain.`,
            r`Actual flow is \(Q=C_dQ_i\). However, the table chooses \(C_d\) from Reynolds number, which requires viscosity. Since viscosity is absent, no unique actual flow is determined. Do not import viscosity from another question.`,
          ),
        ],
        {
          math: r`Q=0.143518C_d\ \mathrm{m^3/s},\qquad \dot m=129.166C_d\ \mathrm{kg/s}`,
          table: {
            headers: [
              L("Asumsi Cd", "Assumed Cd"),
              L("Q (m³/s)", "Q (m³/s)"),
              L("ṁ (kg/s)", "ṁ (kg/s)"),
            ],
            rows: [
              ["0.630 (Re = 10⁴)", "0.090416", "81.375"],
              ["0.610 (Re = 10⁵)", "0.087546", "78.791"],
              ["0.608 (Re ≥ 10⁶ pada tabel / in table)", "0.087259", "78.533"],
            ],
          },
        },
      ),
      step(
        L(
          "5. Tulis pemeriksaan Reynolds secara bersyarat",
          "5. State the Reynolds check conditionally",
        ),
        [
          L(
            r`Dengan \(\mu\) dalam \(\mathrm{Pa\,s}\), persamaan di bawah memberi Reynolds aktual. Rezim pipa biasanya laminar di bawah sekitar 2300, transisi sekitar 2300–4000, dan turbulen di atas sekitar 4000. Tanpa \(\mu\), pilihannya tidak bisa dipastikan.`,
            r`With \(\mu\) in \(\mathrm{Pa\,s}\), the expression below gives actual Reynolds number. Pipe flow is commonly treated as laminar below about 2300, transitional around 2300–4000, and turbulent above about 4000. Without \(\mu\), the regime cannot be established.`,
          ),
        ],
        {
          math: r`Re_D=\frac{900(2.03036C_d)(0.300)}{\mu}=\frac{548.197C_d}{\mu}`,
          note: L(
            "Jika sengaja memakai Cd = 0.608, Re = 333.304/μ. Syarat Re ≥ 10⁶ untuk kolom itu menuntut μ ≤ 3.333 × 10⁻⁴ Pa·s. Jadi pemilihan kolom harus dicek, bukan diasumsikan dari bentuk gambar.",
            "If Cd = 0.608 is deliberately assumed, Re = 333.304/μ. The Re ≥ 10⁶ table column then requires μ ≤ 3.333 × 10⁻⁴ Pa·s. The selected column needs a consistency check; the drawing alone does not establish it.",
          ),
        },
      ),
      step(
        L(
          "6. Laporkan satuan dan data yang masih diperlukan",
          "6. Report units and the missing datum",
        ),
        [
          L(
            "m³/s menyatakan debit volume; kg/s menyatakan debit massa. Kita sudah dapat melaporkan hasil ideal dan hubungan terhadap Cd. Nilai viskositas atau Cd yang ditetapkan perlu ditambahkan untuk menutup bagian aktual; viskositas juga diperlukan untuk memutuskan laminar atau turbulen.",
            "m³/s denotes volume flow; kg/s denotes mass flow. We can already report ideal flow and the relation to Cd. A viscosity value or specified Cd is needed for a unique actual flow; viscosity is also needed to classify the flow regime.",
          ),
        ],
      ),
    ],
    answer: L(
      "Debit ideal 0.143518 m³/s dan 129.166 kg/s. Debit aktual adalah 0.143518 Cd m³/s dan 129.166 Cd kg/s. Viskositas yang hilang membuat Cd aktual dan rezim aliran belum dapat ditentukan secara unik.",
      "Ideal flow is 0.143518 m³/s and 129.166 kg/s. Actual flow is 0.143518 Cd m³/s and 129.166 Cd kg/s. Missing viscosity prevents a unique actual Cd and flow-regime determination.",
    ),
    answerMath: r`\boxed{\begin{aligned}v_{1,i}&=\beta^2\sqrt{\frac{2gh(\rho_m/\rho_f-1)}{1-\beta^4}}\\Q&=0.143518C_d\ \mathrm{m^3/s}\\\dot m&=129.166C_d\ \mathrm{kg/s}\end{aligned}}`,
    assumptions: [
      L(
        "Aliran tunak tak termampatkan, titik ukur setinggi sama, g = 9.81 m/s². Seperti konvensi soal orifis lainnya, d dipakai sebagai diameter bukaan efektif untuk metode Cd; diameter vena contracta nyata memerlukan model koefisien yang konsisten.",
        "Steady incompressible flow, equal tap elevations, and g = 9.81 m/s². Following the course orifice convention, d is used as the effective aperture diameter in the Cd method; an actual vena-contracta diameter requires a consistent coefficient model.",
      ),
      L(
        "Rentang hasil tabel Cd bukan batas universal: tabel hanya memuat Re 10⁴–10⁷. Sumber tidak memberi μ; angka Cd hanya skenario, bukan hasil terverifikasi untuk fluida ini.",
        "The tabulated Cd flow range is not a universal bound: the table only covers Re 10⁴–10⁷. The source omits μ, so the listed Cd cases are scenarios, not verified properties of this fluid.",
      ),
    ],
    visual: {
      kind: "orifice",
      params: {
        D: 0.3,
        d: 0.18,
        rho: 900,
        rhoManometer: 13600,
        h: 0.1,
        dp: 12458.7,
        Cd: 1,
        mode: "manometer",
        viscosityMissing: 1,
      },
      caption: L(
        "Manometer memberi beda tekanan. Nilai awal menampilkan model ideal Cd = 1; koreksi aktual perlu data tambahan.",
        "The manometer gives pressure difference. Initial values show the ideal Cd = 1 model; actual correction requires more data.",
      ),
    },
    referencePages: [7, 9, 10],
  },
  {
    id: "2025-uas-q6",
    year: 2025,
    exam: "uas",
    number: 6,
    topic: "dynamics",
    title: L(
      "Batas frekuensi dan sensitivitas silang",
      "Frequency limits and cross-axis sensitivity",
    ),
    source: { ...uas, pages: [3] },
    originalLanguage: "en",
    original: `6. [15%] Dynamic Characteristic of Measurement System\nFigure 2 depicts the sensitivity of a piezoelectric accelerometer. Suppose its sensitivity is 100 mV/g and it is valid over a frequency range from 1 to 10,000 Hz.\na. [5%] What happens to the sensor sensitivity if we operate it at a frequency of 0.5 Hz?\nb. [5%] What happens to the sensor sensitivity if we operate it at a frequency above 10,000 Hz (for example, at 25,000 Hz)?\nc. [5%] What is meant by cross-sensitivity of an accelerometer? If the cross-sensitivity of this accelerometer is 5 mV/g, what does it mean?\nFigure 2: normalized magnitude and phase response; low-frequency attenuation, approximately flat intermediate response, a high-frequency resonance peak, then roll-off. The horizontal graph axis is labelled ω.`,
    prompt: L(
      r`Akselerometer piezoelektrik memiliki sensitivitas nominal \(100\ \mathrm{mV/g}\), yang berlaku pada rentang \(1\) hingga \(10000\ \mathrm{Hz}\). Kurva sumber menunjukkan penurunan di frekuensi rendah, daerah datar, puncak resonansi, lalu penurunan di frekuensi tinggi.
(a) Apa yang terjadi pada \(0.5\ \mathrm{Hz}\)? (b) Apa yang terjadi di atas \(10000\ \mathrm{Hz}\), misalnya \(25000\ \mathrm{Hz}\)? (c) Apa arti sensitivitas silang \(5\ \mathrm{mV/g}\)?`,
      r`A piezoelectric accelerometer has nominal sensitivity \(100\ \mathrm{mV/g}\), valid from \(1\) to \(10000\ \mathrm{Hz}\). The source response shows low-frequency attenuation, a flat band, a resonance peak, then high-frequency roll-off.
(a) What happens at \(0.5\ \mathrm{Hz}\)? (b) What happens above \(10000\ \mathrm{Hz}\), for example \(25000\ \mathrm{Hz}\)? (c) What does a cross-axis sensitivity of \(5\ \mathrm{mV/g}\) mean?`,
    ),
    steps: [
      step(
        L(
          "1. Pakai sensitivitas nominal hanya dalam rentangnya",
          "1. Use nominal sensitivity within its valid band",
        ),
        [
          L(
            r`Sensitivitas \(100\ \mathrm{mV/g}\) berarti percepatan 1 g pada sumbu ukur menghasilkan sekitar 100 mV dalam rentang yang dinyatakan. Di luar rentang itu, rasio keluaran terhadap percepatan dapat berubah. Di sini g pada satuan sensor berarti percepatan gravitasi standar, bukan gram.`,
            r`A sensitivity of \(100\ \mathrm{mV/g}\) means 1 g along the sensing axis produces about 100 mV within the stated band. Outside that band, the output-to-acceleration ratio can change. Here g denotes standard gravitational acceleration, not grams.`,
          ),
        ],
        {
          math: r`V_{\mathrm{out}}\approx Sa,\qquad S=100\ \mathrm{mV/g},\quad 1g\approx9.80665\ \mathrm{m/s^2}`,
        },
      ),
      step(
        L(
          "2. Jelaskan respons pada 0.5 Hz",
          "2. Explain the response at 0.5 Hz",
        ),
        [
          L(
            "0.5 Hz berada di bawah batas 1 Hz. Muatan piezoelektrik dan rangkaian pembacanya tidak mempertahankan respons terhadap perubahan yang sangat lambat. Keluaran melemah, sehingga sensitivitas efektif lebih kecil dari nominal dan fase dapat berubah. Nilai tepat tidak tersedia dari data soal.",
            "0.5 Hz lies below the 1 Hz lower limit. The piezoelectric charge and readout circuit do not maintain response to very slow changes. Output attenuates, so effective sensitivity drops below nominal and phase may shift. The question does not specify its exact value.",
          ),
        ],
      ),
      step(
        L(
          "3. Bedakan daerah resonansi dan daerah setelahnya",
          "3. Distinguish resonance from the region beyond it",
        ),
        [
          L(
            "Di atas 10 kHz, sensitivitas tidak lagi terjamin 100 mV/g. Pada bagian kurva yang mendekati resonansi, keluaran membesar sehingga percepatan tampak terlalu tinggi jika dibagi sensitivitas nominal. Jauh setelah resonansi, keluaran kembali turun. Jadi, jangan menyatakan semua frekuensi di atas 10 kHz selalu menaikkan keluaran.",
            "Above 10 kHz, the 100 mV/g sensitivity is no longer guaranteed. Approaching resonance, output rises and dividing by nominal sensitivity overestimates acceleration. Far beyond resonance, output falls again. Thus not every frequency above 10 kHz increases the output.",
          ),
          L(
            r`Contoh 25 kHz berada di luar pita yang valid. Kurva memakai \(\omega\), sehingga ubah dahulu: \(\omega=2\pi f\). Kurva kualitatif mengisyaratkan pengaruh resonansi, tetapi tidak memberi angka sensitivitas yang cukup pasti untuk dihitung.`,
            r`The 25 kHz example is outside the valid band. The plot uses \(\omega\), so first convert with \(\omega=2\pi f\). The qualitative curve suggests resonance effects but does not provide a sufficiently precise numerical sensitivity.`,
          ),
        ],
        {
          math: r`f=25000\ \mathrm{Hz}\quad\Longrightarrow\quad\omega=2\pi f\approx1.571\times10^5\ \mathrm{rad/s}`,
        },
      ),
      step(
        L(
          "4. Tafsirkan sensitivitas silang",
          "4. Interpret cross-axis sensitivity",
        ),
        [
          L(
            "Sensitivitas silang ialah respons terhadap percepatan yang tegak lurus sumbu ukur utama. Nilai 5 mV/g berarti percepatan 1 g pada sumbu melintang dapat menambah sekitar 5 mV pada keluaran. Jika kita menganggap semua keluaran berasal dari sumbu utama, ini setara galat terbaca 0.05 g.",
            "Cross-axis sensitivity is response to acceleration perpendicular to the main sensing axis. A value of 5 mV/g means 1 g transverse acceleration can contribute about 5 mV to the output. If all output is attributed to the main axis, this appears as 0.05 g of acceleration.",
          ),
        ],
        {
          math: r`\frac{S_{\perp}}{S_{\parallel}}\,100\%=\frac5{100}\,100\%=5\%,\qquad a_{\mathrm{apparent}}=\frac{5\ \mathrm{mV}}{100\ \mathrm{mV/g}}=0.05g`,
        },
      ),
    ],
    answer: L(
      "Pada 0.5 Hz, respons melemah. Pada 25 kHz, nilai nominal tidak berlaku dan pengaruh resonansi dapat memperbesar bacaan; angka tepat tidak diberikan. Sensitivitas silang 5 mV/g berarti respons melintang 5% dari sensitivitas sumbu utama.",
      "At 0.5 Hz, the response attenuates. At 25 kHz, nominal sensitivity is invalid and resonance may amplify the reading; no exact value is given. Cross-axis sensitivity of 5 mV/g is 5% of main-axis sensitivity.",
    ),
    answerMath: r`\boxed{S_{\perp}/S_{\parallel}=5\%,\qquad 1g_{\perp}\ \Rightarrow\ 0.05g\ \text{apparent}}`,
    assumptions: [
      L(
        "Kurva sumber bersifat kualitatif dan sumbunya memakai rad/s. Jangan membaca angka sumbu ω sebagai Hz. Tidak ada frekuensi alami, redaman, atau parameter rangkaian yang cukup untuk menghitung sensitivitas tepat di luar pita.",
        "The source curve is qualitative and its horizontal axis uses rad/s. Do not read ω-axis values as Hz. Natural frequency, damping, and circuit parameters needed for exact out-of-band sensitivity are not given.",
      ),
    ],
    visual: {
      kind: "accelerometer",
      params: {
        mode: "bandwidth",
        sensitivity: 100,
        fMin: 1,
        fMax: 10000,
        frequency: 25000,
        crossSensitivity: 5,
        qualitative: 1,
      },
      caption: L(
        "Kurva menjelaskan daerah kerja dan resonansi secara kualitatif; bukan kalibrasi numerik tambahan.",
        "The curve explains the usable band and resonance qualitatively; it is not additional numerical calibration data.",
      ),
    },
    referencePages: [18, 19],
  },
];

export const practice2025: PracticeQuestion[] = [
  {
    id: "practice-2025-1",
    topic: "flow",
    difficulty: "applied",
    sourceQuestionId: "2025-uts2-q1",
    prompt: L(
      "Pada orifis yang sama, massa jenis dan Cd tetap. Jika beda tekanan menjadi empat kali semula, debit volume menjadi berapa kali?",
      "For the same orifice, density and Cd remain constant. If pressure difference becomes four times larger, how does volume flow change?",
    ),
    options: [
      L("2 kali", "2 times"),
      L("4 kali", "4 times"),
      L("16 kali", "16 times"),
      L("Tidak berubah", "Unchanged"),
    ],
    correctIndex: 0,
    explanation: L(
      "Rumus debit memuat akar beda tekanan. Karena geometri, massa jenis, dan Cd tetap, akar dari empat memberi faktor dua. Hubungan ini bersyarat pada Cd yang tidak berubah.",
      "Flow depends on the square root of pressure difference. With geometry, density, and Cd fixed, the square root of four gives a factor of two. This assumes Cd does not change.",
    ),
    math: r`\frac{Q_2}{Q_1}=\sqrt{\frac{\Delta p_2}{\Delta p_1}}=\sqrt4=2`,
  },
  {
    id: "practice-2025-2",
    topic: "temperature",
    difficulty: "applied",
    sourceQuestionId: "2025-uts2-q2",
    prompt: L(
      "Termokopel J memberi 9.760 mV terhadap referensi 20 °C. Tabel memberi E(20,0) = 1.019 mV dan E(200,0) = 10.779 mV. Berapa suhu sambungan ukur?",
      "A Type J thermocouple reads 9.760 mV relative to 20 °C. The table gives E(20,0) = 1.019 mV and E(200,0) = 10.779 mV. What is the measuring-junction temperature?",
    ),
    options: [
      L("180 °C", "180 °C"),
      L("200 °C", "200 °C"),
      L("220 °C", "220 °C"),
      L(
        "Tidak bisa karena referensi bukan 0 °C",
        "Impossible because the reference is not 0 °C",
      ),
    ],
    correctIndex: 1,
    explanation: L(
      "Tambahkan tegangan referensi, bukan suhunya. 9.760 + 1.019 = 10.779 mV, yang tepat sama dengan entri 200 °C.",
      "Add the reference voltage, not its temperature. 9.760 + 1.019 = 10.779 mV, exactly the 200 °C table entry.",
    ),
    math: r`E(T,0)=9.760+1.019=10.779\ \mathrm{mV}\Rightarrow T=200^\circ\mathrm C`,
  },
  {
    id: "practice-2025-3",
    topic: "position",
    difficulty: "applied",
    sourceQuestionId: "2025-uts2-q3",
    prompt: L(
      "Dalam contoh latihan, waktu ultrasonik pulang-pergi berubah dari 20 ms saat kosong menjadi 8 ms saat terisi. Cepat rambat 340 m/s. Berapa tinggi cairan?",
      "In this practice example, ultrasonic round-trip time changes from 20 ms when empty to 8 ms when filled. Sound speed is 340 m/s. What is the liquid height?",
    ),
    options: [
      L("4.08 m", "4.08 m"),
      L("1.36 m", "1.36 m"),
      L("2.04 m", "2.04 m"),
      L("3.40 m", "3.40 m"),
    ],
    correctIndex: 2,
    explanation: L(
      "Tinggi cairan berasal dari pengurangan jarak udara. Selisih waktu 0.012 s masih memuat lintasan pergi dan kembali, sehingga hasil 340 × 0.012 harus dibagi dua.",
      "Liquid height is the reduction in the air gap. The 0.012 s time difference still represents outward and return travel, so 340 × 0.012 must be halved.",
    ),
    math: r`h=\frac{340(0.020-0.008)}2=2.04\ \mathrm m`,
  },
  {
    id: "practice-2025-4",
    topic: "strain",
    difficulty: "reasoning",
    sourceQuestionId: "2025-uts2-q4",
    prompt: L(
      "Sebuah gauge melintang merekat pada permukaan balok yang mengalami regangan tarik longitudinal ε. Pernyataan mana yang paling tepat?",
      "A transverse gauge is bonded to a beam surface with longitudinal tensile strain ε. Which statement is most accurate?",
    ),
    options: [
      L(
        "Selalu tidak mengalami regangan karena disebut dummy",
        "It is always strain-free because it is called a dummy",
      ),
      L("Regangannya selalu sama dengan +ε", "Its strain is always +ε"),
      L("Hanya mengukur tegangan catu", "It measures only the supply voltage"),
      L(
        "Dapat merasakan regangan −νε dan membantu kompensasi suhu",
        "It can sense strain −νε and help compensate temperature",
      ),
    ],
    correctIndex: 3,
    explanation: L(
      "Bahan yang memanjang umumnya menyusut melintang. Gauge melintang yang merekat mengikuti perubahan itu. Agar gauge benar-benar menjadi dummy tanpa regangan, pemasangannya harus memisahkan regangan mekanik sambil menjaga kondisi suhu yang sesuai.",
      "A material that stretches longitudinally generally contracts transversely. A bonded transverse gauge follows that strain. A truly strain-free dummy must be mechanically isolated while retaining appropriate thermal exposure.",
    ),
    math: r`\varepsilon_T=-\nu\varepsilon_L`,
  },
  {
    id: "practice-2025-5",
    topic: "temperature",
    difficulty: "applied",
    sourceQuestionId: "2025-uts2-q5",
    prompt: L(
      "RTD memiliki R₀ = 100 Ω pada 0 °C dan koefisien linear 0.004 °C⁻¹. Berapa tahanannya pada 75 °C?",
      "An RTD has R₀ = 100 Ω at 0 °C and a linear coefficient of 0.004 °C⁻¹. What is its resistance at 75 °C?",
    ),
    options: [
      L("130 Ω", "130 Ω"),
      L("103 Ω", "103 Ω"),
      L("70 Ω", "70 Ω"),
      L("175 Ω", "175 Ω"),
    ],
    correctIndex: 0,
    explanation: L(
      "Kenaikan relatif ialah 0.004 × 75 = 0.30. Tahanan naik 30 Ω dari nilai awal 100 Ω.",
      "The fractional increase is 0.004 × 75 = 0.30. Resistance rises by 30 Ω above the initial 100 Ω.",
    ),
    math: r`R=100(1+0.004\times75)=130\ \Omega`,
  },
  {
    id: "practice-2025-6",
    topic: "calibration",
    difficulty: "reasoning",
    sourceQuestionId: "2025-uts2-q6",
    prompt: L(
      "Sensor membaca beban tetap dengan benar, tetapi keluarannya tertinggal saat beban berosilasi cepat. Pengujian mana yang paling langsung menilai masalah ini?",
      "A sensor reads steady loads correctly but its output lags during rapid oscillation. Which test most directly evaluates this problem?",
    ),
    options: [
      L("Mengulang pengukuran nol saja", "Repeat zero-input measurements only"),
      L(
        "Kalibrasi dinamik untuk amplitudo dan fase pada beberapa frekuensi",
        "Dynamic calibration of amplitude and phase over several frequencies",
      ),
      L(
        "Menambah jumlah angka desimal pada layar",
        "Add more display decimal places",
      ),
      L("Mengganti satuan keluaran", "Change the output unit"),
    ],
    correctIndex: 1,
    explanation: L(
      "Galatnya bergantung pada perubahan terhadap waktu. Uji sinus pada beberapa frekuensi mengukur redaman amplitudo dan keterlambatan fase yang tidak terlihat dari uji beban tetap.",
      "The error depends on time variation. Sinusoidal testing over several frequencies reveals amplitude attenuation and phase lag that steady-load tests do not show.",
    ),
  },
  {
    id: "practice-2025-7",
    topic: "calibration",
    difficulty: "applied",
    sourceQuestionId: "2025-uas-q2",
    prompt: L(
      "Sensor memiliki garis acuan dari (0 mm, 0 V) ke (10 mm, 5 V). Pada 4 mm, alat memberi 2.2 V. Berapa ketaklinieran titik itu sebagai persen skala penuh?",
      "A sensor’s reference line runs from (0 mm, 0 V) to (10 mm, 5 V). At 4 mm the output is 2.2 V. What is that point’s nonlinearity as a percentage of full scale?",
    ),
    options: [
      L("10%", "10%"),
      L("9.09%", "9.09%"),
      L("4%", "4%"),
      L("44%", "44%"),
    ],
    correctIndex: 2,
    explanation: L(
      "Garis ideal memberi 2.0 V pada 4 mm. Simpangan 0.2 V dibagi rentang keluaran penuh 5 V, lalu dikalikan 100%. Pembagi untuk persen FS bukan nilai lokal 2.0 atau 2.2 V.",
      "The ideal line gives 2.0 V at 4 mm. Divide the 0.2 V deviation by the full 5 V output span, then multiply by 100%. The full-scale denominator is not the local 2.0 or 2.2 V value.",
    ),
    math: r`N_{\%FS}=\frac{|2.2-5(4/10)|}{5}\,100\%=4\%`,
  },
  {
    id: "practice-2025-8",
    topic: "position",
    difficulty: "foundation",
    sourceQuestionId: "2025-uas-q3",
    prompt: L(
      "Berapa resolusi sudut encoder absolut 10 bit yang mencakup satu putaran penuh?",
      "What is the angular resolution of a 10-bit absolute encoder covering one full turn?",
    ),
    options: [
      L("10° per kode", "10° per code"),
      L("0.703125° per kode", "0.703125° per code"),
      L("1.40625° per kode", "1.40625° per code"),
      L("0.3515625° per kode", "0.3515625° per code"),
    ],
    correctIndex: 3,
    explanation: L(
      "Sepuluh bit memberi 1024 kode. Bagi 360° dengan 1024. Banyak bit menyatakan jumlah kode; nilainya bukan langsung besar sudut.",
      "Ten bits give 1024 codes. Divide 360° by 1024. Bit depth specifies code count, not the angle directly.",
    ),
    math: r`\Delta\theta=\frac{360^\circ}{2^{10}}=0.3515625^\circ`,
  },
  {
    id: "practice-2025-9",
    topic: "flow",
    difficulty: "reasoning",
    sourceQuestionId: "2025-uas-q5",
    prompt: L(
      "Diameter pipa, kecepatan rata-rata, dan massa jenis diketahui. Sifat fluida apa yang masih diperlukan untuk menghitung Reynolds dan menilai rezim aliran?",
      "Pipe diameter, mean velocity, and density are known. Which additional fluid property is needed to calculate Reynolds number and assess flow regime?",
    ),
    options: [
      L("Viskositas dinamik", "Dynamic viscosity"),
      L("Kapasitas panas saja", "Heat capacity alone"),
      L("Tegangan permukaan saja", "Surface tension alone"),
      L("Tidak perlu data lain", "No other datum is needed"),
    ],
    correctIndex: 0,
    explanation: L(
      "Reynolds membandingkan pengaruh inersia dan viskositas. Dengan ρ, v, dan D yang sudah diketahui, kita masih memerlukan μ. Massa jenis saja tidak cukup untuk memastikan aliran turbulen.",
      "Reynolds number compares inertial and viscous effects. With ρ, v, and D known, μ is still required. Density alone cannot establish turbulent flow.",
    ),
    math: r`Re_D=\frac{\rho vD}{\mu}`,
  },
  {
    id: "practice-2025-10",
    topic: "dynamics",
    difficulty: "applied",
    sourceQuestionId: "2025-uas-q6",
    prompt: L(
      "Akselerometer memiliki sensitivitas utama 100 mV/g dan sensitivitas silang 5 mV/g. Jika percepatan utama nol dan percepatan melintang 2 g, berapa percepatan semu jika keluaran dibagi sensitivitas utama?",
      "An accelerometer has main-axis sensitivity 100 mV/g and cross-axis sensitivity 5 mV/g. With zero main-axis acceleration and 2 g transverse acceleration, what apparent acceleration results if output is divided by main-axis sensitivity?",
    ),
    options: [
      L("2 g", "2 g"),
      L("0.10 g", "0.10 g"),
      L("0.05 g", "0.05 g"),
      L("10 g", "10 g"),
    ],
    correctIndex: 1,
    explanation: L(
      "Percepatan melintang memberi 5 × 2 = 10 mV. Jika pembaca menganggap tegangan ini berasal dari sumbu utama, hasilnya 10/100 = 0.10 g. Arahnya bergantung pada tanda sensitivitas silang.",
      "The transverse acceleration contributes 5 × 2 = 10 mV. If interpreted as main-axis output, this gives 10/100 = 0.10 g. Its sign depends on the cross-axis sensitivity sign.",
    ),
    math: r`a_{\mathrm{apparent}}=\frac{(5\ \mathrm{mV/g})(2g)}{100\ \mathrm{mV/g}}=0.10g`,
  },
];

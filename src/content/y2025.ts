import type { ExamQuestion, PracticeQuestion } from "./types";

export const questions2025: ExamQuestion[] = [
  {
    id: "2025-uts2-q1",
    year: 2025,
    exam: "uts2",
    number: 1,
    topic: "flow",
    title: {
      id: "Debit oli melalui orifis",
      en: "Oil flow through an orifice",
    },
    source: {
      url: "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
      file: "2025-uts2.pdf",
      pages: [1],
    },
    originalLanguage: "en",
    original:
      "1. Flow Measurement: Orifice Flowmeter\nA hydraulic oil with a density of \\(\\rho=870\\ \\mathrm{kg/m^3}\\) flows inside a pipe with an internal diameter (D) of 500 mm. An orifice flowmeter is used to measure the flow, yielding a vena contracta with a diameter (d) of 300 mm, as shown in the following figure. In addition, the pressure difference (ΔP) between the upstream and downstream sections of the orifice is measured using a pressure gauge, giving a value of 1.6 MPa. The absolute viscosity (μ) of the oil is given as 0.059 Ns/m².\na. [15%] Calculate the volumetric flowrate of the oil in m³/s. Hint: Use Bernoulli’s equation and the continuity equation.\nb. [5%] Calculate the mass flowrate of the oil in kg/s.\nc. [5%] There is a pressure difference between the upstream and downstream sections of the orifice plate. Which section has higher pressure? Explain briefly.\nd. [5%] What are the advantages and disadvantages of an orifice flowmeter compared to a venturi flowmeter?\nDischarge-coefficient table: columns Re = 10⁴, 10⁵, 10⁶, 10⁷. Rows d/D: 0.2 → 0.60, 0.595, 0.594, 0.594; 0.4 → 0.61, 0.603, 0.598, 0.598; 0.5 → 0.62, 0.608, 0.603, 0.603; 0.6 → 0.63, 0.610, 0.608, 0.608; 0.7 → 0.64, 0.614, 0.609, 0.609.",
    prompt: {
      id: "Oli dengan massa jenis \\(870\\ \\mathrm{kg/m^3}\\) dan viskositas \\(0.059\\ \\mathrm{Pa\\,s}\\) mengalir dalam pipa berdiameter \\(500\\ \\mathrm{mm}\\). Orifis menghasilkan diameter \\(d=300\\ \\mathrm{mm}\\), yang disebut vena contracta pada soal. Beda tekanannya \\(1.6\\ \\mathrm{MPa}\\). Gunakan tabel koefisien debit pada sumber.\n(a) Hitung debit volume dengan kontinuitas dan Bernoulli. (b) Hitung debit massa. (c) Tentukan sisi bertekanan lebih tinggi dan alasannya. (d) Bandingkan kelebihan serta kekurangan orifis terhadap venturi.",
      en: "Oil of density \\(870\\ \\mathrm{kg/m^3}\\) and viscosity \\(0.059\\ \\mathrm{Pa\\,s}\\) flows through a \\(500\\ \\mathrm{mm}\\) pipe. The stated diameter \\(d=300\\ \\mathrm{mm}\\) is called the vena contracta diameter in the question. The pressure difference is \\(1.6\\ \\mathrm{MPa}\\). Use the source discharge-coefficient table.\n(a) Find the volume flow using continuity and Bernoulli. (b) Find the mass flow. (c) Identify the higher-pressure side and explain. (d) Compare an orifice meter with a venturi meter.",
    },
    givens: [
      {
        label: {
          id: "Diameter pipa",
          en: "Pipe diameter",
        },
        value: "\\(D=0.500\\ \\mathrm m\\)",
      },
      {
        label: {
          id: "Diameter penyempitan",
          en: "Restriction diameter",
        },
        value: "\\(d=0.300\\ \\mathrm m\\)",
      },
      {
        label: {
          id: "Beda tekanan",
          en: "Pressure difference",
        },
        value: "\\(\\Delta p=1.6\\times10^6\\ \\mathrm{Pa}\\)",
      },
    ],
    steps: [
      {
        title: {
          id: "1. Tentukan apa yang dicari dan mengapa beda tekanan berguna",
          en: "1. Identify the unknowns and why pressure difference helps",
        },
        body: [
          {
            id: "Kita mencari banyaknya oli yang melewati pipa setiap detik. **Debit volume** (volume per detik) memakai simbol \\(Q\\). **Debit massa** (massa per detik) memakai simbol \\(\\dot m\\). Kita mencari \\(Q\\) dahulu, lalu memakai massa jenis \\(\\rho\\) untuk memperoleh \\(\\dot m\\).",
            en: "We want to know how much oil passes through the pipe each second. **Volume flow** \\(Q\\) measures volume per second; **mass flow** \\(\\dot m\\) measures mass per second. We find \\(Q\\) first, then use density \\(\\rho\\) to obtain \\(\\dot m\\).",
          },
          {
            id: "Orifis tidak membaca debit secara langsung. Penyempitan mengubah kecepatan, lalu perubahan kecepatan menimbulkan beda tekanan. Oleh karena itu, kontinuitas menghubungkan kecepatan kedua penampang, dan Bernoulli menghubungkannya dengan \\(\\Delta p\\).",
            en: "The orifice does not read flow directly. Its restriction changes velocity, which produces a pressure difference. Continuity therefore links the two section velocities, and Bernoulli links them to \\(\\Delta p\\).",
          },
        ],
      },
      {
        title: {
          id: "2. Samakan satuan dan pilih baris tabel",
          en: "2. Convert units and choose the table row",
        },
        body: [
          {
            id: "\\(500\\ \\mathrm{mm}=0.500\\ \\mathrm m\\), \\(300\\ \\mathrm{mm}=0.300\\ \\mathrm m\\), dan \\(1.6\\ \\mathrm{MPa}=1.6\\times10^6\\ \\mathrm{Pa}\\). Viskositas \\(\\mu=0.059\\ \\mathrm{Pa\\,s}\\) diperlukan nanti untuk mengecek Reynolds.",
            en: "\\(500\\ \\mathrm{mm}=0.500\\ \\mathrm m\\), \\(300\\ \\mathrm{mm}=0.300\\ \\mathrm m\\), and \\(1.6\\ \\mathrm{MPa}=1.6\\times10^6\\ \\mathrm{Pa}\\). Viscosity \\(\\mu=0.059\\ \\mathrm{Pa\\,s}\\) is needed later to check Reynolds number.",
          },
          {
            id: "Kita mencari volume per detik. Ubah diameter ke meter dan tekanan ke pascal. Rasio diameter menentukan baris koefisien debit \\(C_d\\).",
            en: "We need volume per second. Convert diameters to metres and pressure to pascals. The diameter ratio selects the discharge-coefficient row.",
          },
          {
            id: "\\(A_1\\) adalah luas pipa hulu dan \\(A_2\\) luas penampang kecil dalam konvensi soal. Luas memakai kuadrat diameter: \\(A_2/A_1=(d/D)^2=0.36\\), bukan 0.6. Ini akan menentukan hubungan kecepatan.",
            en: "\\(A_1\\) is the upstream pipe area and \\(A_2\\) the smaller-section area under the stated convention. Area depends on diameter squared: \\(A_2/A_1=(d/D)^2=0.36\\), not 0.6. This determines the velocity relation.",
          },
        ],
        math: "\\beta=\\frac dD=0.6,\\qquad A_1=\\frac{\\pi D^2}{4}=0.196350\\ \\mathrm{m^2},\\quad A_2=0.0706858\\ \\mathrm{m^2}",
        table: {
          headers: [
            {
              id: "d/D",
              en: "d/D",
            },
            {
              id: "Re = 10⁴",
              en: "Re = 10⁴",
            },
            {
              id: "Re = 10⁵",
              en: "Re = 10⁵",
            },
            {
              id: "Re = 10⁶",
              en: "Re = 10⁶",
            },
            {
              id: "Re = 10⁷",
              en: "Re = 10⁷",
            },
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
      {
        title: {
          id: "3. Hubungkan kedua kecepatan",
          en: "3. Relate the two velocities",
        },
        body: [
          {
            id: "Oli dianggap tak termampatkan. Volume yang masuk sama dengan volume yang keluar, sehingga penampang kecil memiliki kecepatan lebih tinggi.",
            en: "Treat the oil as incompressible. The incoming and outgoing volume flows match, so the smaller section has the greater velocity.",
          },
          {
            id: "Kecepatan \\(v_1\\) milik pipa besar, sedangkan \\(v_2\\) milik penampang kecil. Luas \\(A_2\\) lebih kecil daripada \\(A_1\\), sehingga \\(v_2>v_1\\). Hubungan ini juga menjadi pemeriksaan tanda dan arah perubahan tekanan.",
            en: "\\(v_1\\) belongs to the large pipe and \\(v_2\\) to the small section. Since \\(A_2<A_1\\), we must have \\(v_2>v_1\\). This also checks the sign and direction of the pressure change.",
          },
        ],
        math: "A_1v_1=A_2v_2=Q,\\qquad v_1=\\frac{A_2}{A_1}v_2=\\beta^2v_2=0.36v_2",
      },
      {
        title: {
          id: "4. Turunkan hubungan tekanan dan kecepatan",
          en: "4. Derive the pressure and velocity relation",
        },
        body: [
          {
            id: "Untuk model ideal, tulis Bernoulli antara titik hulu dan penampang kecil. Kedua titik memiliki elevasi sama, sehingga suku energi gravitasi saling menghapus. Pindahkan suku tekanan ke kiri dan suku kecepatan ke kanan.",
            en: "For the ideal model, write Bernoulli between the upstream and smaller sections. Equal elevations cancel the gravitational terms. Move the pressure terms to the left and the velocity terms to the right.",
          },
          {
            id: "Masukkan \\(v_1=\\beta^2v_2\\). Saat kecepatan dikuadratkan, faktor \\(\\beta^2\\) menjadi \\(\\beta^4\\). Itulah asal penyebut \\(1-\\beta^4\\); faktor ini tidak muncul hanya dari menghafal rumus orifis.",
            en: "Substitute \\(v_1=\\beta^2v_2\\). Squaring velocity changes \\(\\beta^2\\) into \\(\\beta^4\\). This produces the denominator \\(1-\\beta^4\\) in the orifice relation.",
          },
        ],
        math: "p_1+\\tfrac12\\rho v_1^2=p_2+\\tfrac12\\rho v_2^2\\\\\\Delta p=\\tfrac12\\rho v_2^2(1-\\beta^4)\\quad\\Rightarrow\\quad v_{2,i}=\\sqrt{\\frac{2\\Delta p}{\\rho(1-\\beta^4)}}",
      },
      {
        title: {
          id: "5. Hitung debit sebelum koreksi empiris",
          en: "5. Calculate flow before the empirical correction",
        },
        body: [
          {
            id: "Indeks \\(i\\) berarti ideal. Kalikan kecepatan ideal pada penampang kecil dengan luas penampang itu. Nilai di dalam akar memiliki satuan \\(\\mathrm{m^2/s^2}\\), sehingga akar memberi \\(\\mathrm{m/s}\\) dan hasil akhir memberi \\(\\mathrm{m^3/s}\\).",
            en: "Subscript \\(i\\) means ideal. Multiply the ideal small-section velocity by that section area. The quantity under the square root has units \\(\\mathrm{m^2/s^2}\\), so the root gives \\(\\mathrm{m/s}\\) and the final product gives \\(\\mathrm{m^3/s}\\).",
          },
        ],
        math: "1-0.6^4=0.8704\\\\Q_i=0.0706858\\sqrt{\\frac{2(1.6\\times10^6)}{870(0.8704)}}=4.59503\\ \\mathrm{m^3/s}",
      },
      {
        title: {
          id: "6. Gunakan Cd, lalu uji dugaan awalnya",
          en: "6. Apply Cd, then test the initial choice",
        },
        body: [
          {
            id: "\\(C_d\\) adalah koefisien debit tak bersatuan. Ia menghubungkan hasil ideal dengan hasil nyata menurut tabel. Baris \\(d/D=0.6\\) sudah pasti, tetapi kolom Reynolds belum diketahui karena Reynolds sendiri memerlukan debit.",
            en: "\\(C_d\\) is a dimensionless discharge coefficient. It connects ideal and actual flow according to the table. The \\(d/D=0.6\\) row is known, but the Reynolds column is not yet known because Reynolds number itself depends on flow.",
          },
          {
            id: "Gunakan \\(C_d=0.610\\) sebagai percobaan dari kolom \\(10^5\\). Ini belum keputusan akhir: hitung debit, dapatkan Reynolds, lalu lihat apakah keduanya sesuai. Jika tidak sesuai, perbarui \\(C_d\\) dan ulangi.",
            en: "Try \\(C_d=0.610\\) from the \\(10^5\\) column. Treat this choice as a trial. Calculate flow and Reynolds number, then check their consistency with the table. If they disagree, update \\(C_d\\) and repeat.",
          },
        ],
        math: "Q=C_dQ_i=0.610(4.59503)=2.80297\\ \\mathrm{m^3/s}",
      },
      {
        title: {
          id: "7. Pastikan pilihan Cd sesuai",
          en: "7. Check the coefficient choice",
        },
        body: [
          {
            id: "Reynolds memakai kecepatan rata-rata dalam pipa dan diameter pipa. Hasilnya dekat \\(10^5\\), sehingga \\(C_d=0.610\\) cocok dengan ketelitian tabel. Interpolasi halus hanya mengubah hasil pembulatan sedikit.",
            en: "Reynolds number uses the mean pipe velocity and pipe diameter. The result is close to \\(10^5\\), so \\(C_d=0.610\\) is consistent with the table precision. Fine interpolation barely changes the rounded result.",
          },
          {
            id: "Gunakan debit aktual yang baru diperoleh, bukan debit ideal, untuk mendapatkan \\(v_1\\). Viskositas dinamik berada di penyebut: pada geometri dan kecepatan sama, oli yang lebih kental menghasilkan Reynolds lebih rendah.",
            en: "Use the actual flow just calculated, not ideal flow, to obtain \\(v_1\\). Dynamic viscosity appears in the denominator: at the same geometry and velocity, more viscous oil gives a lower Reynolds number.",
          },
        ],
        math: "v_1=\\frac Q{A_1}=14.2754\\ \\mathrm{m/s},\\qquad Re_D=\\frac{\\rho v_1D}{\\mu}=\\frac{870(14.2754)(0.500)}{0.059}=1.05251\\times10^5",
      },
      {
        title: {
          id: "8. Ubah debit volume menjadi debit massa",
          en: "8. Convert volume flow to mass flow",
        },
        body: [
          {
            id: "Setiap meter kubik oli memiliki massa 870 kg. Kalikan debit volume dengan massa jenis.",
            en: "Each cubic metre of oil has a mass of 870 kg. Multiply volume flow by density.",
          },
          {
            id: "Periksa satuannya: \\((\\mathrm{kg/m^3})(\\mathrm{m^3/s})=\\mathrm{kg/s}\\). Debit massa lebih besar angkanya karena satu meter kubik oli memiliki massa ratusan kilogram, bukan karena kedua debit mengukur besaran yang sama.",
            en: "Check the units: \\((\\mathrm{kg/m^3})(\\mathrm{m^3/s})=\\mathrm{kg/s}\\). The numerical mass flow is larger because a cubic metre of oil weighs hundreds of kilograms, not because the two flow rates measure the same quantity.",
          },
        ],
        math: "\\dot m=\\rho Q=870(2.80297)=2438.58\\ \\mathrm{kg/s}",
      },
      {
        title: {
          id: "9. Tentukan sisi bertekanan lebih tinggi",
          en: "9. Identify the higher-pressure side",
        },
        body: [
          {
            id: "Tekanan hulu lebih tinggi. Saat aliran menyempit, kecepatan naik dan tekanan statik turun. Setelah aliran melebar kembali, sebagian tekanan pulih, tetapi rugi energi membuat pemulihannya tidak penuh.",
            en: "Upstream pressure is higher. The restriction increases velocity and lowers static pressure. Some pressure recovers as the flow expands again, but energy loss prevents full recovery.",
          },
          {
            id: "Bedakan penurunan tekanan di dekat penyempitan dari rugi tekanan permanen setelah aliran pulih. Beda tekanan pada dua titik ukur membantu menghitung debit; seluruh beda itu tidak harus tetap menjadi rugi tekanan jauh di hilir.",
            en: "Distinguish the pressure drop near the restriction from permanent pressure loss after recovery. The pressure difference between the taps helps determine flow; not all of it must remain as a loss far downstream.",
          },
        ],
        math: "p_1>p_2,\\qquad \\Delta p=p_1-p_2>0",
      },
      {
        title: {
          id: "10. Bandingkan orifis dengan venturi",
          en: "10. Compare the orifice with a venturi",
        },
        body: [
          {
            id: "Orifis ringkas, murah, mudah dibuat, dan pelatnya mudah diganti. Kekurangannya ialah rugi tekanan permanen lebih besar serta hasil lebih peka terhadap tepi pelat, endapan, dan kondisi aliran. Venturi lebih besar dan mahal, tetapi bentuknya yang bertahap memberi pemulihan tekanan lebih baik.",
            en: "An orifice is compact, inexpensive, simple to make, and easy to replace. Its drawbacks are greater permanent pressure loss and greater sensitivity to plate-edge condition, deposits, and flow conditions. A venturi is larger and more expensive, but its gradual shape gives better pressure recovery.",
          },
          {
            id: "Pilih orifis bila ukuran, biaya awal, dan kemudahan mengganti pelat lebih penting. Pertimbangkan venturi bila penghematan rugi tekanan selama operasi lebih penting. Perbandingan ini menjawab fungsi alat, bukan hanya bentuknya.",
            en: "Choose an orifice when size, initial cost, and easy plate replacement matter most. Consider a venturi when reducing pressure loss during operation matters more. The comparison follows instrument function, not shape alone.",
          },
        ],
      },
      {
        title: {
          id: "11. Cek apakah seluruh hasil saling cocok",
          en: "11. Check that the results agree",
        },
        body: [
          {
            id: "\\(C_d<1\\) membuat \\(Q<Q_i\\), sesuai peran koreksi. Selain itu, \\(Q/A_2\\approx39.65\\ \\mathrm{m/s}\\) lebih besar daripada \\(Q/A_1\\approx14.28\\ \\mathrm{m/s}\\), sesuai penyempitan. Hasil Reynolds juga kembali ke kolom tabel yang kita pakai.",
            en: "\\(C_d<1\\) gives \\(Q<Q_i\\), consistent with the correction. Also, \\(Q/A_2\\approx39.65\\ \\mathrm{m/s}\\) exceeds \\(Q/A_1\\approx14.28\\ \\mathrm{m/s}\\), as the restriction requires. Reynolds number also returns us to the table column we used.",
          },
          {
            id: "Hasil ini tetap mengikuti konvensi diameter yang dijelaskan pada catatan soal. Jangan menambahkan koefisien kontraksi lain tanpa mengubah model; itu dapat menghitung koreksi dua kali.",
            en: "These results retain the diameter convention stated in the question notes. Do not add a separate contraction coefficient without changing the model; doing so can count the correction twice.",
          },
        ],
      },
    ],
    answer: {
      id: "Dengan Cd ≈ 0.610, debit volume ≈ 2.803 m³/s dan debit massa ≈ 2.439 × 10³ kg/s. Tekanan hulu lebih tinggi.",
      en: "With Cd ≈ 0.610, volume flow ≈ 2.803 m³/s and mass flow ≈ 2.439 × 10³ kg/s. Upstream pressure is higher.",
    },
    answerMath:
      "\\boxed{Q\\approx2.803\\ \\mathrm{m^3/s},\\quad \\dot m\\approx2.439\\times10^3\\ \\mathrm{kg/s},\\quad Re_D\\approx1.053\\times10^5}",
    assumptions: [
      {
        id: "Aliran tunak, oli tak termampatkan, kedua titik berada pada elevasi yang sama, dan beda tekanan sesuai titik ukur tabel.",
        en: "Steady incompressible flow, equal tap elevation, and a pressure difference consistent with the coefficient table.",
      },
      {
        id: "Soal menyebut d sebagai diameter vena contracta, tetapi juga memberi tabel Cd untuk metode orifis. Pembahasan mengikuti konvensi hitungan kuliah: d menjadi diameter bukaan efektif dalam rumus Cd. Dalam desain nyata, diameter lubang pelat dan vena contracta berbeda; keduanya tidak boleh ditukar tanpa model koefisien yang sesuai.",
        en: "The question calls d the vena contracta diameter but supplies an orifice Cd table. This solution follows the course calculation convention: d is the effective aperture diameter in the Cd method. In a real design, plate-bore and vena-contracta diameters differ and cannot be exchanged without a matching coefficient model.",
      },
    ],
    visual: {
      kind: "orifice",
      params: {
        D: 0.5,
        d: 0.3,
        rho: 870,
        mu: 0.059,
        dp: 1600000,
        Cd: 0.61,
      },
      caption: {
        id: "Hubungkan penyempitan, tekanan, dan debit. Nilai awal mengikuti soal.",
        en: "Connect the restriction, pressure, and flow. Initial values follow the question.",
      },
    },
    referencePages: [7, 9, 10],
  },
  {
    id: "2025-uts2-q2",
    year: 2025,
    exam: "uts2",
    number: 2,
    topic: "temperature",
    title: {
      id: "Termokopel J dan suhu referensi",
      en: "Type J thermocouple and reference temperature",
    },
    source: {
      url: "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
      file: "2025-uts2.pdf",
      pages: [1, 2, 4],
    },
    originalLanguage: "en",
    original:
      "2. Temperature Sensor: Thermocouple\nA Type J thermocouple is used to measure temperature of air inside a pipe, as shown in the following figure. Hint: Use the table in the appendix to answer the following questions.\na. [5%] If the reference junction temperature is 0°C, calculate the percentage non-linearity at 150°C for a measurement range of 0 to 400°C.\nb. [10%] Calculate the temperature inside a pipe if an emf of 12.7 mV is measured relative to a reference junction of 20°C.\nFigure data: Air, V = 50 m/s; emf measured against Tref. Appendix: Type J thermocouple, reference junctions at 0°C. Relevant table entries (°C → mV): 0 → 0.000; 20 → 1.019; 150 → 8.010; 252 → 13.666; 253 → 13.722; 400 → 21.848.",
    prompt: {
      id: "Termokopel tipe J mengukur suhu udara dalam pipa. Gambar memberi kecepatan udara \\(50\\ \\mathrm{m/s}\\). Gunakan tabel lampiran dengan referensi \\(0^\\circ\\mathrm C\\).\n(a) Untuk rentang \\(0\\) hingga \\(400^\\circ\\mathrm C\\), hitung ketaklinieran pada \\(150^\\circ\\mathrm C\\) sebagai persen skala penuh. (b) Tentukan suhu saat tegangan terukur \\(12.7\\ \\mathrm{mV}\\) dan suhu referensi \\(20^\\circ\\mathrm C\\).",
      en: "A Type J thermocouple measures air temperature in a pipe. The figure states an air speed of \\(50\\ \\mathrm{m/s}\\). Use the appendix table referenced to \\(0^\\circ\\mathrm C\\).\n(a) Over a \\(0\\) to \\(400^\\circ\\mathrm C\\) range, find nonlinearity at \\(150^\\circ\\mathrm C\\) as a percentage of full scale. (b) Find the temperature for a measured \\(12.7\\ \\mathrm{mV}\\) with a \\(20^\\circ\\mathrm C\\) reference junction.",
    },
    steps: [
      {
        title: {
          id: "1. Pahami apa yang dibaca termokopel",
          en: "1. Understand what the thermocouple reads",
        },
        body: [
          {
            id: "Dua sambungan logam pada suhu berbeda menghasilkan tegangan. **Termokopel** (sensor suhu berbahan dua logam berbeda) memakai tegangan tersebut untuk mengukur suhu. Tabel tipe J memberi \\(E_J(T,0)\\), yaitu tegangan dengan sambungan ukur pada \\(T\\) dan referensi pada \\(0^\\circ\\mathrm C\\). Kita perlu mengetahui suhu referensi sebelum membaca suhu dari tegangan.",
            en: "Two junctions at different temperatures produce a voltage. A **thermocouple** uses two different metals to produce that voltage and measure temperature. The Type J table gives \\(E_J(T,0)\\): voltage for a measuring junction at \\(T\\) and a reference at \\(0^\\circ\\mathrm C\\). We need the reference temperature before converting voltage to temperature.",
          },
          {
            id: "Bagian (a) menilai bentuk kurva terhadap garis acuan. Bagian (b) memakai tabel yang sama untuk mencari suhu. Kedua bagian memakai tegangan tabel, tetapi langkah awalnya berbeda.",
            en: "Part (a) evaluates the curve against a reference line. Part (b) uses the same table to find temperature. Both use table voltages, but their starting steps differ.",
          },
        ],
      },
      {
        title: {
          id: "2. Bentuk garis ideal dari dua ujung rentang",
          en: "2. Build the ideal endpoint line",
        },
        body: [
          {
            id: "Ketaklinieran membandingkan tabel nyata dengan garis lurus acuan. Di sini kita memilih garis melalui titik 0 °C dan 400 °C, bukan garis singgung pada 150 °C.",
            en: "Nonlinearity compares the actual table with a reference straight line. Here we use the line through 0 °C and 400 °C, not a tangent at 150 °C.",
          },
          {
            id: "Kemiringan garis adalah \\(21.848/400=0.05462\\ \\mathrm{mV/{}^\\circ C}\\). Mengalikan kemiringan dengan 150 °C memberi tegangan yang akan dibaca sensor jika hubungan itu benar-benar lurus. Ini nilai pembanding, bukan nilai tabel nyata.",
            en: "The line slope is \\(21.848/400=0.05462\\ \\mathrm{mV/{}^\\circ C}\\). Multiplying it by 150 °C gives the voltage of a perfectly linear sensor with those endpoints. It is a comparison value, not the actual table value.",
          },
        ],
        math: "E_{\\mathrm{lin}}(T)=\\frac{21.848-0}{400-0}T=0.05462T\\ \\mathrm{mV}\\\\E_{\\mathrm{lin}}(150)=8.193\\ \\mathrm{mV}",
      },
      {
        title: {
          id: "3. Bandingkan tegangan pada 150 °C",
          en: "3. Compare the voltage at 150 °C",
        },
        body: [
          {
            id: "Tabel memberi 8.010 mV. Kurangi dengan nilai garis ideal, lalu bagi simpangan mutlak dengan rentang keluaran penuh. Tanda negatif berarti titik tabel berada di bawah garis.",
            en: "The table gives 8.010 mV. Subtract the ideal-line value, then divide the absolute deviation by the full output span. The negative sign means the table point is below the line.",
          },
          {
            id: "Penyebut \\(21.848\\ \\mathrm{mV}\\) berasal dari rentang keluaran 0 sampai 400 °C. Membagi dengan 8.010 mV akan memberi persen terhadap pembacaan pada 150 °C, yang berbeda dari persen skala penuh yang diminta.",
            en: "The denominator \\(21.848\\ \\mathrm{mV}\\) is the output span over 0 to 400 °C. Dividing by 8.010 mV would give a percentage of the reading at 150 °C, not the requested percentage of full scale.",
          },
        ],
        math: "N(150)=8.010-8.193=-0.183\\ \\mathrm{mV}\\\\\\%N=\\frac{|{-0.183}|}{21.848}\\,100\\%=0.8376\\%",
      },
      {
        title: {
          id: "4. Tulis hubungan sambungan sebelum mengoreksi",
          en: "4. Write the junction relation before correcting",
        },
        body: [
          {
            id: "Untuk sambungan ukur yang sama, menaikkan suhu referensi dari 0 ke 20 °C mengurangi beda tegangan yang terbaca. Tegangan yang hilang sebesar \\(E_J(20,0)\\). Untuk mengembalikan pembacaan ke bentuk tabel, nilai itu harus ditambahkan.",
            en: "For the same measuring junction, raising the reference from 0 to 20 °C reduces the measured voltage. The lost amount is \\(E_J(20,0)\\). Add that amount to express the reading in the table convention.",
          },
        ],
        math: "E_J(T,20)=E_J(T,0)-E_J(20,0)\\quad\\Rightarrow\\quad E_J(T,0)=E_J(T,20)+E_J(20,0)",
      },
      {
        title: {
          id: "5. Koreksi sambungan referensi 20 °C",
          en: "5. Correct the 20 °C reference junction",
        },
        body: [
          {
            id: "Tegangan terukur berasal dari selisih dua suhu sambungan. Kita menambahkan \\(E_J(20,0)=1.019\\ \\mathrm{mV}\\) untuk memakai tabel referensi nol. Menambah langsung 20 °C pada hasil pencarian tabel tidak tepat karena hubungan suhu dan tegangan tidak benar-benar linear.",
            en: "The measured voltage comes from the two junction temperatures. To use the zero-reference table, add \\(E_J(20,0)=1.019\\ \\mathrm{mV}\\). Adding 20 °C directly to a table-derived temperature is not exact because voltage is not perfectly linear with temperature.",
          },
          {
            id: "Lakukan koreksi di ranah tegangan terlebih dahulu. Penjumlahan suhu secara langsung hanya akan sah untuk hubungan tegangan dan suhu yang benar-benar linear dengan sensitivitas tetap.",
            en: "Apply the correction in voltage first. Directly adding temperatures would require an exactly linear voltage and temperature relation with constant sensitivity.",
          },
        ],
        math: "E_J(T,0)=E_J(T,20)+E_J(20,0)=12.700+1.019=13.719\\ \\mathrm{mV}",
      },
      {
        title: {
          id: "6. Cari dua baris tabel yang mengapit tegangan",
          en: "6. Find the two table entries bracketing the voltage",
        },
        body: [
          {
            id: "Pilih entri yang mengapit \\(13.719\\ \\mathrm{mV}\\), bukan yang sekadar tampak dekat. Entri bawah ialah \\((252^\\circ\\mathrm C,13.666\\ \\mathrm{mV})\\), dan entri atas ialah \\((253^\\circ\\mathrm C,13.722\\ \\mathrm{mV})\\). Suhu akhir harus berada di antaranya.",
            en: "Choose entries that bracket \\(13.719\\ \\mathrm{mV}\\), rather than merely look close. The lower entry is \\((252^\\circ\\mathrm C,13.666\\ \\mathrm{mV})\\), and the upper one is \\((253^\\circ\\mathrm C,13.722\\ \\mathrm{mV})\\). The final temperature must lie between them.",
          },
        ],
        math: "13.666<13.719<13.722\\quad\\Rightarrow\\quad252<T<253",
      },
      {
        title: {
          id: "7. Interpolasi di antara dua entri terdekat",
          en: "7. Interpolate between the nearest entries",
        },
        body: [
          {
            id: "13.719 mV berada di antara 13.666 mV pada 252 °C dan 13.722 mV pada 253 °C. Kita hitung bagian jarak dari titik bawah.",
            en: "13.719 mV lies between 13.666 mV at 252 °C and 13.722 mV at 253 °C. Find the fraction of the interval above the lower point.",
          },
          {
            id: "Pembilang adalah kenaikan dari entri bawah: \\(0.053\\ \\mathrm{mV}\\). Penyebut adalah lebar satu interval: \\(0.056\\ \\mathrm{mV}\\). Rasionya sekitar 0.946, sehingga suhu berada sekitar 94.6% perjalanan dari 252 ke 253 °C.",
            en: "The numerator is the rise above the lower entry: \\(0.053\\ \\mathrm{mV}\\). The denominator is one table interval: \\(0.056\\ \\mathrm{mV}\\). Their ratio is about 0.946, placing the temperature about 94.6% of the way from 252 to 253 °C.",
          },
        ],
        math: "T=252+\\frac{13.719-13.666}{13.722-13.666}(253-252)=252.946^\\circ\\mathrm C",
      },
      {
        title: {
          id: "8. Cek arah koreksi dan batas hasil",
          en: "8. Check the correction direction and result limits",
        },
        body: [
          {
            id: "Tegangan ekuivalen referensi nol lebih besar daripada tegangan terukur: \\(13.719>12.700\\ \\mathrm{mV}\\). Hasil \\(252.946^\\circ\\mathrm C\\) juga berada dalam interval 252 sampai 253 °C dan sangat dekat ke ujung atas, sesuai posisi tegangannya.",
            en: "The equivalent zero-reference voltage exceeds the measured voltage: \\(13.719>12.700\\ \\mathrm{mV}\\). The result \\(252.946^\\circ\\mathrm C\\) also lies within 252 to 253 °C and near the upper end, matching the voltage position.",
          },
        ],
      },
      {
        title: {
          id: "9. Tafsirkan hasil sesuai model pengukuran",
          en: "9. Interpret the result within the measurement model",
        },
        body: [
          {
            id: "Suhu sambungan ukur sekitar 253 °C. Kita menyamakannya dengan suhu udara karena soal tidak memberi data untuk menghitung galat perpindahan panas atau pemulihan suhu aliran. Angka kecepatan udara tidak masuk ke koreksi listrik termokopel ini.",
            en: "The measuring junction is about 253 °C. We equate this with air temperature because the question gives no data for heat-transfer or flow-recovery corrections. Air speed does not enter this electrical thermocouple correction.",
          },
          {
            id: "Membedakan suhu sambungan dari suhu fluida membantu melihat batas jawaban. Data yang tersedia cukup untuk konversi listrik, tetapi belum cukup untuk menilai galat pemasangan atau perpindahan panas.",
            en: "Separating junction temperature from fluid temperature makes the answer’s limit clear. The supplied data support the electrical conversion, but do not determine installation or heat-transfer errors.",
          },
        ],
      },
    ],
    answer: {
      id: "Ketaklinieran pada 150 °C ialah 0.838% skala penuh, dengan simpangan −0.183 mV. Suhu ukur sekitar 252.95 °C.",
      en: "Nonlinearity at 150 °C is 0.838% of full scale, with a −0.183 mV deviation. The measured temperature is about 252.95 °C.",
    },
    answerMath:
      "\\boxed{\\%N_{150}=0.838\\%\\ \\mathrm{FS},\\qquad T\\approx252.95^\\circ\\mathrm C}",
    assumptions: [
      {
        id: "Acuan ketaklinieran memakai garis dua ujung rentang. Suhu sambungan ukur mewakili suhu udara; galat pemasangan dan perpindahan panas diabaikan.",
        en: "Nonlinearity uses an endpoint reference line. Junction temperature represents air temperature; installation and heat-transfer errors are neglected.",
      },
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
      caption: {
        id: "Tegangan sambungan dingin melengkapi tegangan terukur sebelum pencarian suhu.",
        en: "Add the cold-junction voltage to the measured voltage before finding temperature.",
      },
    },
    referencePages: [4, 5, 24, 25, 26],
  },
  {
    id: "2025-uts2-q3",
    year: 2025,
    exam: "uts2",
    number: 3,
    topic: "position",
    title: {
      id: "Tinggi cairan dari waktu ultrasonik",
      en: "Liquid level from ultrasonic travel time",
    },
    source: {
      url: "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
      file: "2025-uts2.pdf",
      pages: [2],
    },
    originalLanguage: "en",
    original:
      "3. Ultrasonic Sensor\nAn ultrasonic sensor is used to monitor the fluid level in a tank. The sensor is installed above the tank. When the tank is empty, it takes 200 ms for the ultrasonic waves to travel from sensor to the fluid surface and then back to sensor. When the fluid in the tank is at height h, it takes 100 ms for the ultrasonic waves to travel from the sensor to the fluid surface and then back to sensor. The ultrasound travel in the air with speed of 330 m/s.\na. [10%] Draw a schematic of this measurement setup and briefly explain how it works.\nb. [15%] Calculate the fluid height (h).",
    prompt: {
      id: "Sensor ultrasonik berada di atas tangki. Waktu tempuh pulang-pergi saat kosong ialah \\(200\\ \\mathrm{ms}\\), dan saat cairan setinggi \\(h\\) ialah \\(100\\ \\mathrm{ms}\\). Cepat rambat bunyi di udara \\(330\\ \\mathrm{m/s}\\).\n(a) Gambar susunan pengukuran dan jelaskan cara kerjanya. (b) Hitung tinggi cairan \\(h\\).",
      en: "An ultrasonic sensor is mounted above a tank. The round-trip time is \\(200\\ \\mathrm{ms}\\) when empty and \\(100\\ \\mathrm{ms}\\) with a liquid height \\(h\\). Sound travels at \\(330\\ \\mathrm{m/s}\\).\n(a) Draw the measurement arrangement and explain it. (b) Calculate \\(h\\).",
    },
    steps: [
      {
        title: {
          id: "1. Bedakan jarak udara dan tinggi cairan",
          en: "1. Distinguish the air gap from liquid height",
        },
        body: [
          {
            id: "Sensor mengirim pulsa bunyi ke bawah, lalu menerima pantulannya. **Gema** (pulsa bunyi yang kembali) memberi waktu tempuh untuk menghitung jarak. Saat kosong, pulsa memantul dari dasar tangki; saat terisi, pulsa memantul dari permukaan cairan. Kita menyebut jarak ke dasar \\(H\\) dan jarak ke permukaan \\(d\\). Tinggi cairan ialah \\(h=H-d\\).",
            en: "The sensor sends a sound pulse downwards and receives its reflection. This **echo**, the returning sound pulse, provides a travel time that we use to calculate distance. The empty-tank echo comes from the bottom; the filled-tank echo comes from the liquid surface. We call these distances \\(H\\) and \\(d\\), so liquid height is \\(h=H-d\\).",
          },
          {
            id: "Titik nol tinggi cairan berada di dasar, sedangkan sensor mengukur jarak dari atas. Kedua arah ukur berbeda. Pembacaan jarak yang lebih kecil berarti level cairan lebih tinggi.",
            en: "Liquid height starts at the bottom, whereas the sensor measures distance from above. The two references differ, so a smaller measured air distance means a greater liquid level.",
          },
        ],
      },
      {
        title: {
          id: "2. Ubah waktu ke detik dan tandai waktu acuan",
          en: "2. Convert time to seconds and identify the reference",
        },
        body: [
          {
            id: "\\(t_0\\) adalah waktu gema saat tangki kosong; \\(t\\) waktu saat tangki terisi. Cepat rambat \\(c=330\\ \\mathrm{m/s}\\) memakai meter per detik. Oleh karena itu, ubah kedua waktu menjadi detik agar hasil jarak dalam meter.",
            en: "\\(t_0\\) is the empty-tank echo time; \\(t\\) is the filled-tank echo time. Since sound speed is \\(c=330\\ \\mathrm{m/s}\\), both times must be in seconds to obtain metres.",
          },
        ],
        math: "t_0=200\\ \\mathrm{ms}=0.200\\ \\mathrm s,\\qquad t=100\\ \\mathrm{ms}=0.100\\ \\mathrm s",
      },
      {
        title: {
          id: "3. Hitung jarak sensor ke dasar",
          en: "3. Calculate the sensor-to-bottom distance",
        },
        body: [
          {
            id: "Pulsa menempuh jarak \\(H\\) ke bawah dan \\(H\\) kembali ke sensor. Jadi, \\(ct_0=2H\\). Membagi dengan dua mengubah panjang lintasan keseluruhan menjadi jarak satu arah.",
            en: "The pulse travels \\(H\\) downward and \\(H\\) back to the sensor. Thus \\(ct_0=2H\\). Dividing by two converts the total path length to a one-way distance.",
          },
        ],
        math: "H=\\frac{ct_0}{2}=\\frac{330(0.200)}2=33.0\\ \\mathrm m",
      },
      {
        title: {
          id: "4. Hitung jarak udara yang masih tersisa",
          en: "4. Calculate the remaining air gap",
        },
        body: [
          {
            id: "Saat ada cairan, gema kembali dari permukaannya. Gunakan alasan pulang-pergi yang sama, tetapi dengan waktu \\(t\\). Nilai ini adalah jarak udara di atas cairan, belum tinggi cairannya.",
            en: "With liquid present, the echo returns from its surface. Use the same round-trip argument with time \\(t\\). The calculation gives the air gap above the liquid; we still need to find liquid height.",
          },
        ],
        math: "d=\\frac{ct}{2}=\\frac{330(0.100)}2=16.5\\ \\mathrm m",
      },
      {
        title: {
          id: "5. Kurangi kedua jarak",
          en: "5. Subtract the two distances",
        },
        body: [
          {
            id: "Permukaan cairan mengurangi jarak pantulan dari 33.0 m menjadi 16.5 m. Selisihnya memberi tinggi cairan dari dasar tangki.",
            en: "The liquid surface reduces the echo distance from 33.0 m to 16.5 m. Their difference gives liquid height above the tank bottom.",
          },
          {
            id: "Pengurangan dapat dilakukan pada jaraknya atau langsung pada waktunya. Keduanya setara karena \\(c/2\\) adalah faktor yang sama dalam \\(H\\) dan \\(d\\).",
            en: "You can subtract the distances or subtract the times first. The methods are equivalent because \\(c/2\\) is the same factor in \\(H\\) and \\(d\\).",
          },
        ],
        math: "h=H-d=\\frac c2(t_0-t)=\\frac{330}{2}(0.200-0.100)=16.5\\ \\mathrm m",
      },
      {
        title: {
          id: "6. Uji hubungan dengan keadaan kosong dan penuh",
          en: "6. Test the relation at empty and full conditions",
        },
        body: [
          {
            id: "Jika \\(t=t_0\\), rumus memberi \\(h=0\\): tangki kosong. Jika waktu gema berkurang, permukaan mendekati sensor dan \\(h\\) naik. Di sini \\(t=t_0/2\\), sehingga level berada pada setengah tinggi acuan: \\(16.5/33=0.5\\).",
            en: "If \\(t=t_0\\), the formula gives \\(h=0\\): an empty tank. As echo time decreases, the surface approaches the sensor and \\(h\\) rises. Here \\(t=t_0/2\\), so the level is half the reference height: \\(16.5/33=0.5\\).",
          },
          {
            id: "Batas teoritis waktu nol berarti permukaan tepat pada sensor. Sensor nyata biasanya memiliki jarak minimum; soal ini tidak memberikan batas tersebut.",
            en: "The theoretical zero-time limit places the surface at the sensor. Real sensors usually have a minimum distance, which this question does not specify.",
          },
        ],
      },
      {
        title: {
          id: "7. Cek skala dan kondisi pengukuran",
          en: "7. Check scale and measurement conditions",
        },
        body: [
          {
            id: "Hasil besar ini mengikuti data 200 ms dan 100 ms pada sumber. Jangan menggantinya menjadi mikrodetik tanpa koreksi resmi. Sensor harus tetap pada posisi yang sama, dan cepat rambat harus mewakili udara pada kedua pengukuran.",
            en: "This large result follows the source values of 200 ms and 100 ms. Do not silently replace them with microseconds. The sensor must stay in the same position, and the sound speed must represent the air during both measurements.",
          },
          {
            id: "Perubahan suhu udara dapat mengubah cepat rambat. Jika dua pengukuran memakai cepat rambat berbeda, mengurangkan waktu dengan satu nilai c tidak lagi memberi hasil yang sama tepatnya.",
            en: "Air-temperature changes can alter sound speed. If the two measurements use different speeds, subtracting their times with a single c is no longer equally accurate.",
          },
        ],
      },
    ],
    answer: {
      id: "Tinggi cairan 16.5 m. Pengukuran membandingkan waktu pantulan dari dasar dengan waktu pantulan dari permukaan cairan.",
      en: "The liquid height is 16.5 m. The measurement compares the bottom-echo time with the liquid-surface echo time.",
    },
    answerMath: "\\boxed{h=\\frac{330}{2}(0.200-0.100)=16.5\\ \\mathrm m}",
    assumptions: [
      {
        id: "Saat tangki kosong, frasa “fluid surface” pada sumber kita baca sebagai dasar atau permukaan acuan kosong. Kedua waktu merupakan waktu pulang-pergi.",
        en: "For the empty tank, the source phrase “fluid surface” is interpreted as the bottom or empty reference surface. Both times are round-trip times.",
      },
    ],
    visual: {
      kind: "ultrasonic",
      params: {
        c: 330,
        tEmpty: 0.2,
        t: 0.1,
        height: 33,
        level: 16.5,
      },
      caption: {
        id: "Pulsa menempuh jarak udara dua kali. Tinggi cairan mengurangi jarak sensor ke pemantul.",
        en: "The pulse travels across the air gap twice. Increasing level reduces sensor-to-reflector distance.",
      },
    },
    referencePages: [16],
  },
  {
    id: "2025-uts2-q4",
    year: 2025,
    exam: "uts2",
    number: 4,
    topic: "position",
    title: {
      id: "Sensor posisi dan susunan strain gauge",
      en: "Position sensors and strain-gauge wiring",
    },
    source: {
      url: "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
      file: "2025-uts2.pdf",
      pages: [2, 3],
    },
    originalLanguage: "en",
    original:
      "4. Position Sensors: LVDT, Resolver, Encoder, Strain gauges\na. [5%] What are the similarities and differences between a resolver and an LVDT (Linear Variable Differential Transformer)?\nb. [5%] What are the advantages and disadvantages of an absolute encoder compared to an incremental encoder?\nc. [5%] A cantilever beam with four strain gauges A1, A2, D1 and D2 is shown in the figure below. These four strain gauges form a Wheatstone bridge. (i) Describe the position of each strain gauge on the Wheatstone bridge’s arm. (ii) What is the function of D1 and D2?\nd. [5%] In a two-channel incremental encoder, how can we detect the direction of motion of the rotor (e.g. clockwise and counterclockwise)? You may sketch a schematic to support your answer.\nFigure: a cantilever fixed on the left and loaded downward at its right end; A1 and D1 are on the upper face, A2 and D2 on the lower face. The D gauges are drawn perpendicular to the A gauges.",
    prompt: {
      id: "(a) Bandingkan persamaan dan perbedaan resolver dengan LVDT. (b) Jelaskan kelebihan serta kekurangan encoder absolut terhadap encoder inkremental. (c) Balok kantilever memiliki A1 dan D1 di atas, A2 dan D2 di bawah, serta gaya ke bawah di ujung bebas. Tentukan susunan keempat gauge pada jembatan Wheatstone dan fungsi D1/D2. (d) Jelaskan cara dua kanal encoder inkremental menentukan arah putaran.",
      en: "(a) Compare a resolver and an LVDT. (b) Give the advantages and drawbacks of an absolute encoder relative to an incremental encoder. (c) A cantilever has A1/D1 on top, A2/D2 below, and a downward tip force. Assign all four gauges to Wheatstone-bridge arms and explain D1/D2. (d) Explain how two incremental-encoder channels determine rotation direction.",
    },
    steps: [
      {
        title: {
          id: "1. Kelompokkan tugas menurut cara sensor membaca gerak",
          en: "1. Group the tasks by how each sensor reads motion",
        },
        body: [
          {
            id: "Anda akan membandingkan sensor posisi dan menyusun jembatan pengukur regangan. Kita mulai dari besaran masuk, sinyal keluar, dan cara membaca arah. Tiga hal tersebut membantu menjelaskan fungsi setiap alat sebelum membandingkan kelebihan serta batasnya.",
            en: "You will compare position sensors and arrange a bridge for measuring strain. We begin with each device’s input, output, and method for reading direction. Those three features explain what each device does before we compare its strengths and limits.",
          },
        ],
      },
      {
        title: {
          id: "2. Kenali kesamaan LVDT dan resolver",
          en: "2. Identify what LVDTs and resolvers share",
        },
        body: [
          {
            id: "Keduanya memakai kopling magnetik antarkumparan dan eksitasi AC. Gerak mengubah tegangan induksi. Rangkaian pembaca mengolah amplitudo serta fase keluaran untuk memperoleh posisi.",
            en: "Both use magnetic coupling between windings and AC excitation. Motion changes the induced voltage. Readout electronics use output amplitude and phase to recover position.",
          },
          {
            id: "Pada keduanya, gerak tidak perlu memutus atau menyambung kontak ukur yang bergeser. Namun, pembaca tetap memerlukan acuan eksitasi untuk mengartikan fase dan tanda sinyal.",
            en: "In both devices, motion does not require making or breaking a sliding measuring contact. Their readout still needs an excitation reference to interpret signal phase and sign.",
          },
        ],
        visual: {
          kind: "lvdt",
          caption: {
            id: "Inti bergerak mengubah selisih tegangan dua kumparan sekunder.",
            en: "Core displacement changes the difference between two secondary voltages.",
          },
        },
      },
      {
        title: {
          id: "3. Baca posisi linear dari selisih dua sekunder LVDT",
          en: "3. Read linear position from the LVDT secondary difference",
        },
        body: [
          {
            id: "Di titik tengah, kopling ke kedua sekunder sama, sehingga \\(V_1\\) dan \\(V_2\\) saling menghapus pada sambungan seri berlawanan. Ketika inti bergeser, satu kopling menguat dan yang lain melemah. Selisih amplitudo memberi besar perpindahan; fase terhadap acuan menunjukkan sisinya.",
            en: "At the centre, coupling to both secondaries is equal, so \\(V_1\\) and \\(V_2\\) cancel in series opposition. Moving the core strengthens one coupling and weakens the other. The difference amplitude indicates displacement magnitude; phase relative to the reference indicates the side.",
          },
          {
            id: "Hubungan \\(V_o\\approx kx\\) hanya berlaku dalam rentang linear. \\(k\\) adalah sensitivitas tegangan per panjang, bukan konstanta tanpa satuan.",
            en: "The relation \\(V_o\\approx kx\\) applies within the linear range. \\(k\\) is voltage per unit length, not a dimensionless constant.",
          },
        ],
        math: "V_o=V_1-V_2\\approx kx",
      },
      {
        title: {
          id: "4. Bedakan besaran yang mereka ukur",
          en: "4. Distinguish what they measure",
        },
        body: [
          {
            id: "LVDT mengukur perpindahan lurus: dekat titik tengah, selisih keluaran berbanding dengan \\(x\\), dan pembalikan fase menandai sisi titik nol. Resolver mengukur sudut: dua keluarannya mengikuti \\(\\sin\\theta\\) dan \\(\\cos\\theta\\).",
            en: "An LVDT measures linear displacement: near its centre, differential output scales with \\(x\\), and phase reversal identifies the side of null. A resolver measures angle through outputs proportional to \\(\\sin\\theta\\) and \\(\\cos\\theta\\).",
          },
          {
            id: "Dua keluaran resolver diperlukan untuk menghindari ambiguitas sudut. Satu nilai sinus dapat muncul pada lebih dari satu sudut; pasangan sinus dan kosinus beserta tandanya menentukan kuadran.",
            en: "Two resolver outputs avoid angular ambiguity. The same sine value can occur at more than one angle; the sine and cosine pair and its signs identify the quadrant.",
          },
        ],
        math: "V_{\\mathrm{LVDT}}=V_1-V_2\\approx kx,\\qquad V_s\\propto\\sin\\theta,\\quad V_c\\propto\\cos\\theta",
        visual: {
          kind: "resolver",
          caption: {
            id: "Dua amplitudo resolver menentukan sudut dan kuadrannya.",
            en: "The two resolver amplitudes identify the angle and quadrant.",
          },
        },
      },
      {
        title: {
          id: "5. Bandingkan encoder absolut dan inkremental",
          en: "5. Compare absolute and incremental encoders",
        },
        body: [
          {
            id: "Encoder absolut memberi kode posisi yang unik dalam rentangnya. Setelah daya kembali, tipe absolut satu putaran dapat membaca sudut tanpa menghitung pulsa sejak nol. Encoder inkremental menghitung perubahan posisi, sehingga biasanya perlu acuan awal atau homing.",
            en: "An absolute encoder gives a unique position code within its range. After power returns, a single-turn absolute encoder can read angle without counting pulses from zero. An incremental encoder counts position changes and usually needs an initial reference or homing.",
          },
          {
            id: "Encoder absolut biasanya memerlukan pembacaan kode yang lebih rumit dan biaya lebih tinggi untuk spesifikasi setara. Jangan menganggap encoder absolut satu putaran juga menyimpan jumlah putaran; itu memerlukan kemampuan multiturn.",
            en: "Absolute encoders generally need more involved code readout and cost more at comparable specifications. A single-turn absolute encoder does not automatically retain the turn count; that requires multiturn capability.",
          },
          {
            id: "Bayangkan daya terputus saat poros berada di tengah rentang. Encoder absolut membaca kode yang sedang berada di bawah pembaca. Encoder inkremental perlu mengetahui hitungan awal sebelum pulsa baru dapat menjadi posisi total. Inilah alasan homing sering diperlukan.",
            en: "Consider power being lost while the shaft is midway through its range. An absolute encoder reads the code currently beneath the reader. An incremental encoder needs an initial count before new pulses can represent total position. The missing initial count explains the usual need to find a reference position, or home.",
          },
        ],
      },
      {
        title: {
          id: "6. Tentukan tanda regangan pada balok sebelum menyusun jembatan",
          en: "6. Determine the beam strain signs before wiring the bridge",
        },
        body: [
          {
            id: "Untuk beban ujung ke bawah pada gambar, permukaan atas dekat tumpuan mengalami tarik dan permukaan bawah mengalami tekan. Gauge memanjang searah balok mengikuti regangan itu: \\(\\varepsilon_{A1}=+\\varepsilon\\) dan \\(\\varepsilon_{A2}=-\\varepsilon\\).",
            en: "For the downward tip load shown, the upper surface near the support is in tension and the lower surface in compression. The longitudinal gauges follow those strains: \\(\\varepsilon_{A1}=+\\varepsilon\\) and \\(\\varepsilon_{A2}=-\\varepsilon\\).",
          },
          {
            id: "Dengan gauge factor \\(GF\\), perubahan relatif tahanan ialah \\(\\delta=\\Delta R/R=GF\\varepsilon\\). Dengan demikian, tanda mekanik dapat diteruskan ke tanda perubahan tahanan.",
            en: "With gauge factor \\(GF\\), relative resistance change is \\(\\delta=\\Delta R/R=GF\\varepsilon\\). This converts the mechanical strain signs into resistance-change signs.",
          },
        ],
        math: "\\delta_{A1}=+GF\\varepsilon,\\qquad\\delta_{A2}=-GF\\varepsilon",
      },
      {
        title: {
          id: "7. Tempatkan gauge agar pengaruh lentur menjumlah",
          en: "7. Place the gauges so bending contributions add",
        },
        body: [
          {
            id: "Tetapkan suplai pada simpul atas dan bawah jembatan, lalu keluaran \\(V_o=V_R-V_L\\). Satu susunan yang sah: kiri atas A 1, kiri bawah A 2, kanan atas D 1, kanan bawah D 2. Pada beban ke bawah, A 1 memanjang dan A 2 memendek.",
            en: "Apply excitation to the top and bottom bridge nodes and define \\(V_o=V_R-V_L\\). One valid arrangement is A 1 upper left, A 2 lower left, D 1 upper right, D 2 lower right. Under the downward load, A 1 stretches and A 2 shortens.",
          },
          {
            id: "Dengan \\(\\delta_i=\\Delta R_i/R\\), kontribusi lengan kiri atas dan kanan bawah bertanda positif. Kontribusi dua lengan lain bertanda negatif. A1 dan A2 mengalami regangan berlawanan. Kita menempatkan keduanya pada lengan bersebelahan agar pengaruhnya saling menambah.",
            en: "With \\(\\delta_i=\\Delta R_i/R\\), the upper-left and lower-right arms contribute positively. The other two contribute negatively. Since A 1 and A 2 have opposite strain signs, put them in adjacent arms.",
          },
          {
            id: "Tujuannya agar pengurangan dua tegangan simpul justru menambahkan pengaruh tarik dan tekan. Jika dua gauge yang tandanya berlawanan ditempatkan sembarang, keluaran dapat berkurang atau saling meniadakan.",
            en: "The goal is for subtraction of the two node voltages to add the tensile and compressive effects. Arbitrary placement of opposite-sign gauges can reduce or cancel the output.",
          },
        ],
        math: "\\frac{V_o}{V_s}\\approx\\frac14(\\delta_{A1}-\\delta_{A2}-\\delta_{D1}+\\delta_{D2})",
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
          caption: {
            id: "A1 tarik dan A2 tekan. Susunan jembatan menjaga sinyal lentur saling menambah.",
            en: "A1 is in tension and A2 in compression. Bridge placement makes the bending signals add.",
          },
        },
      },
      {
        title: {
          id: "8. Periksa susunan dengan persamaan pembagi tegangan",
          en: "8. Check the arrangement using voltage dividers",
        },
        body: [
          {
            id: "Tanpa arus masuk ke alat baca, simpul kiri dan kanan masing-masing mengikuti pembagi tegangan. Mengembangkan persamaan di sekitar empat tahanan yang sama menghasilkan bentuk pendek pada langkah sebelumnya.",
            en: "With negligible readout current, the left and right nodes each follow a voltage-divider relation. Expanding around four equal resistances produces the short expression in the previous step.",
          },
          {
            id: "Jika hanya A 1 bertambah tahanannya, \\(V_L\\) turun sehingga \\(V_R-V_L\\) naik. Jika A 2 berkurang tahanannya, \\(V_L\\) juga turun. Pemeriksaan sederhana ini memastikan kedua regangan menambah sinyal.",
            en: "If only A 1 increases resistance, \\(V_L\\) falls and \\(V_R-V_L\\) rises. If A 2 decreases resistance, \\(V_L\\) also falls. This simple check confirms that the two strains add to the signal.",
          },
        ],
        math: "V_L=V_s\\frac{R_{A2}}{R_{A1}+R_{A2}},\\qquad V_R=V_s\\frac{R_{D2}}{R_{D1}+R_{D2}},\\qquad V_o=V_R-V_L",
      },
      {
        title: {
          id: "9. Jelaskan fungsi D1 dan D2 dengan tepat",
          en: "9. Explain D1 and D2 carefully",
        },
        body: [
          {
            id: "Fungsi yang dituju ialah mengurangi perubahan keluaran akibat suhu. Jika semua gauge sejenis mengalami perubahan suhu sama, perubahan tahanan bersama saling menghapus pada jembatan.",
            en: "Their intended function is to reduce temperature-induced output change. When matching gauges experience the same temperature change, their common resistance change cancels in the bridge.",
          },
          {
            id: "Gambar menaruh D 1/D 2 melintang pada balok. Jika keduanya merekat pada balok, mereka juga merasakan regangan Poisson: D 1 sebesar \\(-\\nu\\varepsilon\\), D 2 sebesar \\(+\\nu\\varepsilon\\). Jadi, jangan menyebutnya bebas regangan tanpa asumsi tambahan. Dalam model dummy ideal yang terpisah dari regangan mekanik, kedua kontribusi mekaniknya nol.",
            en: "The drawing places D 1/D 2 transversely on the beam. If bonded, they also sense Poisson strain: \\(-\\nu\\varepsilon\\) at D 1 and \\(+\\nu\\varepsilon\\) at D 2. Do not call them strain-free without an extra assumption. For ideal dummy gauges isolated from mechanical strain, both mechanical contributions are zero.",
          },
          {
            id: "\\(\\nu\\) adalah rasio Poisson: tarikan memanjang disertai penyusutan melintang. Oleh karena itu, orientasi D 1/D 2 pada gambar harus diperiksa sebelum kita menganggap keduanya hanya mengukur suhu.",
            en: "\\(\\nu\\) is Poisson’s ratio: longitudinal stretching is accompanied by transverse contraction. The D 1/D 2 orientation in the drawing must therefore be checked before treating them as temperature-only gauges.",
          },
        ],
        math: "\\left.\\frac{V_o}{V_s}\\right|_{\\mathrm{bonded}}\\approx\\frac{GF(1+\\nu)\\varepsilon}{2},\\qquad \\left.\\frac{V_o}{V_s}\\right|_{\\mathrm{ideal\\ dummy}}\\approx\\frac{GF\\varepsilon}{2}",
      },
      {
        title: {
          id: "10. Pisahkan kompensasi suhu dari pembatalan regangan",
          en: "10. Separate temperature compensation from strain cancellation",
        },
        body: [
          {
            id: "Jika suhu mengubah semua tahanan dengan fraksi yang sama \\(\\delta_T\\), jumlah bertandanya ialah \\(\\delta_T-\\delta_T-\\delta_T+\\delta_T=0\\). Inilah alasan jembatan dapat menekan pengaruh suhu bersama.",
            en: "If temperature changes all resistances by the same fraction \\(\\delta_T\\), their signed sum is \\(\\delta_T-\\delta_T-\\delta_T+\\delta_T=0\\). The cancellation explains how the bridge suppresses a common temperature effect.",
          },
          {
            id: "Kompensasi itu memerlukan gauge sejenis dan suhu yang cukup seragam. Gradien suhu atau beda sifat gauge dapat menyisakan galat; menyebut sebuah gauge “dummy” saja tidak menjamin kompensasi sempurna.",
            en: "This compensation requires matched gauges at sufficiently similar temperatures. Temperature gradients or mismatched gauge properties leave residual error; calling a gauge “dummy” does not guarantee perfect compensation.",
          },
        ],
      },
      {
        title: {
          id: "11. Baca urutan pulsa untuk mengetahui arah",
          en: "11. Read the pulse order to determine direction",
        },
        body: [
          {
            id: "Dua kanal A dan B bergeser seperempat periode. Jika A mendahului B, tetapkan satu arah; jika B mendahului A, arah berbalik. Hubungan dengan searah jarum jam bergantung pada pemasangan, jadi cek sekali dengan gerak yang diketahui.",
            en: "Channels A and B are shifted by a quarter period. If A leads B, assign one direction; if B leads A, the direction reverses. Which one is clockwise depends on installation, so verify it with a known rotation.",
          },
          {
            id: "Baca pasangan A/B secara berurutan, bukan dua nilai yang diambil terpisah tanpa urutan waktu. Frekuensi pulsa memberi besar kecepatan, sedangkan kanal yang mendahului memberi arah.",
            en: "Read successive A/B pairs, not two isolated values without time order. Pulse frequency gives speed magnitude, while the leading channel gives direction.",
          },
        ],
        math: "\\text{A leads: }00\\to10\\to11\\to01\\to00\\\\\\text{B leads: }00\\to01\\to11\\to10\\to00",
        visual: {
          kind: "encoder",
          params: {
            mode: "quadrature",
            pulses: 8,
          },
          caption: {
            id: "Urutan perubahan A/B menentukan arah, bukan besar frekuensi saja.",
            en: "The A/B transition order determines direction; frequency alone does not.",
          },
        },
      },
      {
        title: {
          id: "12. Tutup setiap subsoal dengan jenis informasi yang benar",
          en: "12. Finish each subpart with the correct information type",
        },
        body: [
          {
            id: "LVDT memberi posisi lurus; resolver memberi sudut; encoder absolut memberi kode posisi; encoder inkremental memberi perubahan posisi yang perlu dihitung. Jembatan strain gauge membaca perubahan tahanan dengan susunan tanda yang sesuai. Setiap perbedaan berasal dari cara sinyal dibentuk dan dibaca.",
            en: "An LVDT gives linear position; a resolver gives angle; an absolute encoder gives a position code; an incremental encoder gives position changes to count. The strain-gauge bridge reads resistance changes with a suitable sign arrangement. Each distinction follows how its signal is generated and read.",
          },
        ],
      },
    ],
    answer: {
      id: "LVDT mengukur perpindahan lurus, resolver mengukur sudut. Encoder absolut memberi kode posisi; encoder inkremental menghitung perubahan. Tempatkan A1/A2 bersebelahan dan D1/D2 pada dua lengan lain sesuai diagram. D membantu kompensasi suhu; gauge melintang yang merekat juga merasakan efek Poisson. Arah encoder berasal dari kanal yang mendahului.",
      en: "An LVDT measures linear displacement; a resolver measures angle. Absolute encoders give position codes; incremental encoders count changes. Put A1/A2 in adjacent arms and D1/D2 in the remaining arms as shown. D gauges help compensate temperature; bonded transverse gauges also sense Poisson strain. Encoder direction comes from the leading channel.",
    },
    assumptions: [
      {
        id: "Penamaan lengan pada pembahasan kita tetapkan secara eksplisit; susunan yang setara dengan polaritas keluaran terbalik juga sah. Identifikasi regangan D mengikuti orientasi pada gambar, bukan huruf D saja.",
        en: "Arm names are defined explicitly; equivalent arrangements with reversed output polarity are also valid. The D-gauge strain interpretation follows the drawing orientation, not the letter D alone.",
      },
    ],
    visual: {
      kind: "resolver",
      caption: {
        id: "Resolver memakai dua keluaran yang saling melengkapi untuk membaca sudut.",
        en: "A resolver uses two complementary outputs to read angle.",
      },
    },
    referencePages: [15, 16, 17, 20, 21, 23],
  },
  {
    id: "2025-uts2-q5",
    year: 2025,
    exam: "uts2",
    number: 5,
    topic: "temperature",
    title: {
      id: "RTD pada jembatan Wheatstone",
      en: "RTD in a Wheatstone bridge",
    },
    source: {
      url: "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
      file: "2025-uts2.pdf",
      pages: [3],
    },
    originalLanguage: "en",
    original:
      "5. RTD Sensor and Signal Conditioning\nAn RTD (Resistance Temperature Detector) is used as one arm (R4) of a Wheatstone bridge, as shown in the figure below. The RTD is used to measure a constant temperature, with the bridge operating in deflection mode. The RTD has a resistance of 25 Ω at a temperature of 0°C, and a thermal coefficient of resistance, β = 0.004 °C⁻¹. The resistance of the RTD as a function of temperature is given by: R(T) = R0(1 + βT).\na. [5%] If the RTD is subjected to a temperature of 100°C, calculate the resistance of RTD.\nb. [5%] Then, if the input voltage to the bridge is 5 V, calculate the output voltage of the bridge.\nFigure data: R2 = R3 = 100 Ω; R1 = 25 Ω at 0°C and balanced bridge conditions. Excitation connects the left and right diamond nodes; the galvanometer connects the upper and lower nodes.",
    prompt: {
      id: "RTD menjadi lengan \\(R_4\\) jembatan Wheatstone yang bekerja dalam mode defleksi. Diketahui \\(R_0=25\\ \\Omega\\), \\(\\beta=0.004\\ ^\\circ\\mathrm C^{-1}\\), dan \\(R(T)=R_0(1+\\beta T)\\). Pada gambar, \\(R_2=R_3=100\\ \\Omega\\) serta \\(R_1=25\\ \\Omega\\). Suplai menghubungkan simpul kiri dan kanan; keluaran menghubungkan simpul atas dan bawah.\n(a) Hitung tahanan RTD pada \\(100^\\circ\\mathrm C\\). (b) Hitung keluaran untuk suplai \\(5\\ \\mathrm V\\).",
      en: "An RTD forms arm \\(R_4\\) of a Wheatstone bridge operating in deflection mode. Given \\(R_0=25\\ \\Omega\\), \\(\\beta=0.004\\ ^\\circ\\mathrm C^{-1}\\), and \\(R(T)=R_0(1+\\beta T)\\). The figure has \\(R_2=R_3=100\\ \\Omega\\) and \\(R_1=25\\ \\Omega\\). Excitation connects the left/right nodes, and output connects the top/bottom nodes.\n(a) Find RTD resistance at \\(100^\\circ\\mathrm C\\). (b) Find bridge output for a \\(5\\ \\mathrm V\\) supply.",
    },
    steps: [
      {
        title: {
          id: "1. Ikuti rantai suhu, tahanan, lalu tegangan",
          en: "1. Follow temperature, resistance, then voltage",
        },
        body: [
          {
            id: "Suhu mengubah tahanan bahan sensor. **RTD** (sensor suhu berbasis perubahan tahanan) memakai hubungan tersebut untuk membaca suhu. Jembatan mengubah tahanan RTD menjadi beda tegangan. Kita menghitung tahanan terlebih dahulu, lalu mencari tegangan kedua titik keluaran.",
            en: "Temperature changes the sensing material’s resistance. An **RTD** is a resistive temperature sensor that uses this change to measure temperature. The bridge turns the RTD resistance into a voltage difference. We first calculate resistance, then find the two output-node voltages.",
          },
          {
            id: "Dalam \\(R(T)=R_0[1+\\alpha(T-T_0)]\\), \\(R_0=25\\ \\Omega\\) adalah tahanan pada \\(T_0=0^\\circ\\mathrm C\\), dan \\(\\alpha=0.004\\ {}^\\circ\\mathrm C^{-1}\\) menyatakan perubahan relatif per derajat.",
            en: "In \\(R(T)=R_0[1+\\alpha(T-T_0)]\\), \\(R_0=25\\ \\Omega\\) is the resistance at \\(T_0=0^\\circ\\mathrm C\\), and \\(\\alpha=0.004\\ {}^\\circ\\mathrm C^{-1}\\) is the relative change per degree.",
          },
        ],
      },
      {
        title: {
          id: "2. Ubah suhu menjadi tahanan",
          en: "2. Convert temperature to resistance",
        },
        body: [
          {
            id: "Koefisien positif berarti tahanan naik saat suhu naik. Kenaikan relatif pada 100 °C ialah 0.004 × 100 = 0.4, yaitu 40% dari tahanan awal.",
            en: "A positive coefficient means resistance increases with temperature. At 100 °C the fractional increase is 0.004 × 100 = 0.4, or 40% of the initial resistance.",
          },
          {
            id: "Kenaikan mutlaknya ialah \\(\\Delta R=25(0.4)=10\\ \\Omega\\), sehingga \\(R_4=25+10=35\\ \\Omega\\). Koefisien suhu tidak berarti tahanan bertambah 0.004 Ω setiap derajat; ia mengalikan tahanan awal.",
            en: "The absolute increase is \\(\\Delta R=25(0.4)=10\\ \\Omega\\), so \\(R_4=25+10=35\\ \\Omega\\). The temperature coefficient does not mean an increase of 0.004 Ω per degree; it multiplies the reference resistance.",
          },
        ],
        math: "R_4=25[1+0.004(100)]=35\\ \\Omega",
      },
      {
        title: {
          id: "3. Tetapkan simpul sebelum memakai rumus",
          en: "3. Define the nodes before using a formula",
        },
        body: [
          {
            id: "Ikuti sambungan pada gambar: simpul kiri \\(+5\\ \\mathrm V\\), simpul kanan \\(0\\ \\mathrm V\\). Cabang atas terdiri dari \\(R_2\\) lalu \\(R_3\\); cabang bawah terdiri dari \\(R_1\\) lalu RTD. Dengan pembaca berimpedansi tinggi, masing-masing cabang menjadi pembagi tegangan.",
            en: "Follow the drawing: take the left node as \\(+5\\ \\mathrm V\\) and the right node as \\(0\\ \\mathrm V\\). The upper branch contains \\(R_2\\) then \\(R_3\\); the lower branch contains \\(R_1\\) then the RTD. With a high-impedance readout, each branch is a voltage divider.",
          },
          {
            id: "Penomoran resistor saja tidak cukup untuk memilih rumus jembatan. Kita harus mengenali letak catu dan kedua simpul keluaran. Gambar soal memakai catu pada titik kiri dan kanan. Anda perlu mengikuti sambungan tersebut sebelum memasukkan R1 sampai R4 ke rumus pembagi tegangan.",
            en: "Resistor numbering alone cannot determine the bridge formula. Identify the supply and the two output nodes. This drawing uses left-to-right excitation, so do not insert R 1 to R 4 blindly into a formula for a top-to-bottom supply.",
          },
        ],
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
          caption: {
            id: "Suplai kiri dan kanan dan keluaran atas dan bawah mengikuti sambungan asli.",
            en: "Left/right excitation and top/bottom output follow the original wiring.",
          },
        },
      },
      {
        title: {
          id: "4. Turunkan pembagi tegangan cabang atas",
          en: "4. Derive the upper-branch divider",
        },
        body: [
          {
            id: "Arus cabang atas adalah tegangan total dibagi jumlah tahanannya. Tegangan simpul atas terhadap simpul kanan 0 V sama dengan jatuh tegangan pada \\(R_3\\). Dua resistor 100 Ω membagi catu menjadi dua bagian sama.",
            en: "The upper-branch current is total voltage divided by total resistance. The top-node voltage relative to the right-hand 0 V node is the drop across \\(R_3\\). The two 100 Ω resistors split the supply equally.",
          },
        ],
        math: "I_{\\mathrm{upper}}=\\frac5{100+100}=0.025\\ \\mathrm A,\\qquad V_{\\mathrm{top}}=I_{\\mathrm{upper}}R_3=2.500\\ \\mathrm V",
      },
      {
        title: {
          id: "5. Hitung pembagi tegangan cabang RTD",
          en: "5. Calculate the RTD-branch divider",
        },
        body: [
          {
            id: "Cabang bawah membawa arus berbeda karena jumlah tahanannya 60 Ω. Keluaran simpul bawah diukur terhadap sisi 0 V, jadi gunakan jatuh tegangan pada RTD 35 Ω. Memakai 25 Ω akan memberi tegangan dari simpul kiri ke simpul bawah, bukan tegangan simpul bawah terhadap acuan.",
            en: "The lower branch carries a different current because its total resistance is 60 Ω. Its node voltage is measured relative to the 0 V side, so use the drop across the 35 Ω RTD. Using 25 Ω would instead give the drop from the left supply node to the lower node.",
          },
        ],
        math: "I_{\\mathrm{lower}}=\\frac5{25+35}=0.0833333\\ \\mathrm A\\\\V_{\\mathrm{bottom}}=I_{\\mathrm{lower}}R_4=5\\frac{35}{60}=2.91667\\ \\mathrm V",
      },
      {
        title: {
          id: "6. Ambil selisih dan cek kondisi nol",
          en: "6. Take the difference and check the zero condition",
        },
        body: [
          {
            id: "Untuk definisi \\(V_o=V_{\\mathrm{top}}-V_{\\mathrm{bottom}}\\), keluaran negatif. Jika kabel pembaca dibalik, tandanya berubah, tetapi besarnya tetap. Pada \\(0^\\circ\\mathrm C\\), kedua simpul bernilai 2.5 V sehingga jembatan seimbang.",
            en: "With \\(V_o=V_{\\mathrm{top}}-V_{\\mathrm{bottom}}\\), output is negative. Reversing the readout leads changes the sign but not the magnitude. At \\(0^\\circ\\mathrm C\\), both nodes are at 2.5 V and the bridge is balanced.",
          },
          {
            id: "Nilai negatif memberi informasi polaritas, bukan tegangan yang “tidak mungkin”. Simpul bawah lebih tinggi 0.41667 V daripada simpul atas. Jika pertanyaan meminta besar keluaran tanpa polaritas, laporkan \\(0.41667\\ \\mathrm V\\) sambil menjelaskan definisi tanda.",
            en: "A negative value indicates polarity, not an “impossible” voltage. The lower node is 0.41667 V above the top node. If only output magnitude is requested, report \\(0.41667\\ \\mathrm V\\) and state the sign convention.",
          },
        ],
        math: "V_o=2.500-2.91667=-0.41667\\ \\mathrm V,\\qquad |V_o|=0.41667\\ \\mathrm V",
      },
      {
        title: {
          id: "7. Cek perubahan dari keadaan seimbang",
          en: "7. Check the change from the balanced state",
        },
        body: [
          {
            id: "Pada 0 °C, \\(R_4=R_1=25\\ \\Omega\\) dan \\(R_2=R_3=100\\ \\Omega\\), sehingga kedua pembagi memberi 2.5 V. Saat suhu naik, RTD bertambah dan simpul bawah naik. Maka \\(V_{\\mathrm{top}}-V_{\\mathrm{bottom}}\\) harus menjadi negatif, sesuai hasil hitung.",
            en: "At 0 °C, \\(R_4=R_1=25\\ \\Omega\\) and \\(R_2=R_3=100\\ \\Omega\\), so both dividers give 2.5 V. Heating increases the RTD resistance and raises the lower node. Thus \\(V_{\\mathrm{top}}-V_{\\mathrm{bottom}}\\) must become negative, as calculated.",
          },
          {
            id: "Perhitungan ini mengabaikan arus yang ditarik alat baca dan pemanasan RTD oleh catu. Kedua pengaruh tersebut perlu diperiksa saat merancang rangkaian nyata.",
            en: "The calculation neglects readout current and RTD self-heating from the supply. Both need consideration in a real circuit design.",
          },
        ],
      },
    ],
    answer: {
      id: "Tahanan RTD ialah 35 Ω. Besar tegangan keluaran 0.4167 V; dengan polaritas atas dikurangi bawah, keluarannya −0.4167 V.",
      en: "RTD resistance is 35 Ω. Output magnitude is 0.4167 V; with top-minus-bottom polarity, output is −0.4167 V.",
    },
    answerMath:
      "\\boxed{R(100^\\circ\\mathrm C)=35\\ \\Omega,\\qquad |V_o|=0.4167\\ \\mathrm V}",
    assumptions: [
      {
        id: "Pembaca keluaran berimpedansi tinggi, tahanan kabel dan pemanasan sendiri diabaikan. Polaritas sumber dan pembaca kita definisikan karena gambar tidak memberi tanda keluaran.",
        en: "The output readout has high impedance; lead resistance and self-heating are neglected. Supply/readout polarity is explicitly defined because the drawing does not label output polarity.",
      },
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
      caption: {
        id: "Suhu mengubah tahanan RTD dan ketakseimbangan jembatan.",
        en: "Temperature changes RTD resistance and bridge imbalance.",
      },
    },
    referencePages: [2, 3, 5],
  },
  {
    id: "2025-uts2-q6",
    year: 2025,
    exam: "uts2",
    number: 6,
    topic: "calibration",
    title: {
      id: "Memilih kalibrasi statik atau dinamik",
      en: "Choosing static or dynamic calibration",
    },
    source: {
      url: "https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view",
      file: "2025-uts2.pdf",
      pages: [3],
    },
    originalLanguage: "en",
    original:
      "6. Practicum Questions: Static and Dynamic Calibration\na. [5%] When should dynamic calibration be performed instead of static calibration?\nb. [5%] Why is sensor calibration important?",
    prompt: {
      id: "(a) Kapan kita perlu kalibrasi dinamik, bukan hanya kalibrasi statik? (b) Mengapa kalibrasi sensor penting?",
      en: "(a) When is dynamic calibration needed rather than static calibration alone? (b) Why is sensor calibration important?",
    },
    steps: [
      {
        title: {
          id: "1. Mulai dari tujuan kalibrasi",
          en: "1. Start with the purpose of calibration",
        },
        body: [
          {
            id: "Kita memberi alat masukan acuan, lalu membandingkan keluarannya dengan acuan tersebut. **Kalibrasi** (penetapan hubungan acuan dan indikasi) menunjukkan bagaimana alat merespons besaran yang diketahui. Anda perlu membedakan masukan tetap dan masukan berubah karena kedua kondisi menguji kemampuan yang berbeda.",
            en: "We apply a reference input and compare it with the instrument indication. **Calibration** establishes the relation between the known input and the indication, showing how the instrument responds. You need to distinguish steady and changing inputs because they test different aspects of performance.",
          },
        ],
      },
      {
        title: {
          id: "2. Lihat apakah besaran berubah selama pengukuran",
          en: "2. Check whether the measurand changes during measurement",
        },
        body: [
          {
            id: "Kalibrasi statik memberi masukan yang tetap atau berubah cukup lambat hingga keluaran stabil. Metode ini cocok untuk mencari hubungan masukan-keluaran, offset, sensitivitas, dan ketaklinieran pada kondisi tunak.",
            en: "Static calibration applies constant inputs or changes them slowly enough for the output to settle. It establishes the steady-state input/output relation, offset, sensitivity, and nonlinearity.",
          },
          {
            id: "Contohnya, letakkan sensor suhu pada beberapa suhu acuan dan tunggu hingga tiap keluaran stabil. Langkah menunggu memisahkan galat keadaan tunak dari keterlambatan sensor.",
            en: "For example, place a temperature sensor at several reference temperatures and wait for each output to settle. Waiting separates steady-state error from sensor lag.",
          },
        ],
      },
      {
        title: {
          id: "3. Baca sensitivitas dan offset dari keadaan tunak",
          en: "3. Read sensitivity and offset from steady conditions",
        },
        body: [
          {
            id: "Offset adalah keluaran ketika masukan acuan nol, menurut definisi alat. Sensitivitas \\(K\\) adalah perubahan keluaran per perubahan masukan. Bila titik kalibrasi tidak mengikuti satu garis, residunya menunjukkan ketaklinieran terhadap garis acuan yang dipilih.",
            en: "Offset is the output at the defined zero input. Sensitivity \\(K\\) is output change per input change. If calibration points do not follow one line, their residuals show nonlinearity relative to the chosen reference line.",
          },
        ],
        math: "K=\\frac{\\Delta y_{\\mathrm{steady}}}{\\Delta x},\\qquad y_{\\mathrm{reference}}=Kx+a",
      },
      {
        title: {
          id: "4. Pilih kalibrasi dinamik untuk perubahan cepat",
          en: "4. Choose dynamic calibration for rapid changes",
        },
        body: [
          {
            id: "Gunakan kalibrasi dinamik saat laju perubahan masukan sebanding dengan, atau lebih cepat dari, respons sensor. Contohnya pengukuran getaran, benturan, atau suhu yang berubah cepat. Sensor bisa benar pada keadaan tunak tetapi terlambat atau salah amplitudo saat digunakan.",
            en: "Use dynamic calibration when the input changes on a timescale comparable to, or faster than, the sensor response. Examples include vibration, impact, and rapid temperature changes. A sensor can be correct at steady state yet lag or distort amplitude in use.",
          },
          {
            id: "Misalnya, dua sensor dapat menunjukkan suhu akhir yang sama, tetapi salah satunya memerlukan waktu lebih lama. Keduanya dapat memiliki kalibrasi statik baik, namun tidak sama baiknya untuk mencatat perubahan suhu cepat.",
            en: "Two sensors may indicate the same final temperature while one takes longer to reach it. Both can have good static calibration yet differ in their ability to record rapid temperature changes.",
          },
        ],
      },
      {
        title: {
          id: "5. Ukur hubungan waktu atau frekuensi",
          en: "5. Measure the time or frequency response",
        },
        body: [
          {
            id: "Masukan tangga dapat menunjukkan waktu tanggap dan waktu tunak. Masukan sinus pada beberapa frekuensi menunjukkan perubahan sensitivitas dan beda fase. Hasilnya menentukan rentang frekuensi yang masih memberi pembacaan layak.",
            en: "A step input can reveal response and settling times. Sinusoidal inputs at several frequencies reveal sensitivity changes and phase shift. These results identify the usable measurement frequency range.",
          },
          {
            id: "Pada uji sinus, bandingkan amplitudo setelah respons awal mereda. Besar \\(|G(j\\omega)|\\) menyatakan perbandingan amplitudo dan sudut \\(\\arg G(j\\omega)\\) menyatakan beda fase. Nilai ini dapat berubah dengan frekuensi meski sensitivitas statiknya tetap.",
            en: "In a sinusoidal test, compare amplitudes after the initial transient dies away. The magnitude \\(|G(j\\omega)|\\) gives the amplitude ratio and \\(\\arg G(j\\omega)\\) gives phase difference. They can vary with frequency even when static sensitivity remains fixed.",
          },
        ],
        math: "K=\\frac{\\Delta y_{\\mathrm{steady}}}{\\Delta x},\\qquad G(j\\omega)=\\frac{Y(j\\omega)}{X(j\\omega)}",
      },
      {
        title: {
          id: "6. Pilih pengujian berdasarkan cara alat dipakai",
          en: "6. Choose tests based on how the instrument is used",
        },
        body: [
          {
            id: "Untuk memantau suhu ruang yang berubah lambat, hubungan statik sering menjadi perhatian awal. Untuk getaran mesin, sensor juga harus mengikuti amplitudo dan fase pada frekuensi kerja. Pilihan uji mengikuti perubahan sinyal yang ingin diukur.",
            en: "For slowly changing room temperature, the static relation is often the first concern. For machine vibration, the sensor must also reproduce amplitude and phase at operating frequencies. The test choice follows the signal changes being measured.",
          },
        ],
      },
      {
        title: {
          id: "7. Jelaskan manfaat kalibrasi",
          en: "7. Explain the purpose of calibration",
        },
        body: [
          {
            id: "Kalibrasi membandingkan alat dengan acuan yang diketahui, sehingga kita dapat menaksir galat, membuat koreksi, dan menyatakan ketidakpastian. Kalibrasi ulang juga membantu melihat drift akibat waktu atau kondisi pemakaian. Kalibrasi tidak otomatis memperbaiki alat; hasilnya memberi dasar untuk koreksi atau penyetelan.",
            en: "Calibration compares the instrument with a known reference so we can estimate errors, apply corrections, and state uncertainty. Recalibration also reveals drift with time or use. Calibration does not automatically repair the instrument; it provides evidence for correction or adjustment.",
          },
          {
            id: "Pisahkan kalibrasi dari penyetelan: kalibrasi menemukan hubungan dan galat; penyetelan mengubah alat. Sesudah penyetelan, lakukan pemeriksaan lagi untuk memastikan hubungan barunya sesuai.",
            en: "Separate calibration from adjustment: calibration determines the relation and error; adjustment changes the instrument. After adjustment, check again to establish the new relation.",
          },
        ],
      },
    ],
    answer: {
      id: "Kalibrasi dinamik diperlukan saat respons waktu sensor memengaruhi hasil. Kalibrasi statik tetap diperlukan untuk skala dan offset; kalibrasi dinamik menambah informasi amplitudo, fase, dan batas frekuensi.",
      en: "Dynamic calibration is needed when sensor response time affects the result. Static calibration still establishes scale and offset; dynamic calibration adds amplitude, phase, and frequency-limit information.",
    },
    visual: {
      kind: "calibration",
      params: {
        mode: "static-dynamic",
      },
      caption: {
        id: "Hubungan tunak dan respons terhadap waktu menjawab dua kebutuhan kalibrasi yang berbeda.",
        en: "Steady-state relation and time response answer different calibration needs.",
      },
    },
    referencePages: [19],
  },
  {
    id: "2025-uas-q1",
    year: 2025,
    exam: "uas",
    number: 1,
    topic: "systems",
    title: {
      id: "Peran elemen sistem pengukuran",
      en: "Roles of measurement-system elements",
    },
    source: {
      url: "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
      file: "2025-uas.pdf",
      pages: [1],
    },
    originalLanguage: "en",
    original:
      "1. [10%] Elements of Measurement Systems\nPlease categorize the following elements into sensing elements, signal conditioning elements, signal processing elements, or data presentation elements.\na. Incremental encoder.\nb. LVDT\nc. Wheatstone bridge\nd. Inverting amplifier\ne. Low pass filter\nf. Analog to Digital Converter\ng. Strain gauge\nh. Resistance Temperature Dependence\ni. Current to voltage converter\nj. Capacitive proximity probe",
    prompt: {
      id: "Kelompokkan setiap komponen sebagai elemen perasa, pengondisi sinyal, pemroses sinyal, atau penyaji data. Komponennya: (a) encoder inkremental; (b) LVDT; (c) jembatan Wheatstone; (d) penguat pembalik; (e) filter lolos rendah. Daftar berlanjut: (f) konverter analog-ke-digital; (g) strain gauge; (h) RTD; (i) konverter arus-ke-tegangan; (j) probe kedekatan kapasitif. Sumber menyebut RTD sebagai “Resistance Temperature Dependence”.",
      en: "Classify each component as a sensing, signal-conditioning, signal-processing, or data-presentation element. The components are (a) incremental encoder; (b) LVDT; (c) Wheatstone bridge; (d) inverting amplifier; (e) low-pass filter. The list continues: (f) analog-to-digital converter; (g) strain gauge; (h) RTD; (i) current-to-voltage converter; (j) capacitive proximity probe. The source calls RTD “Resistance Temperature Dependence”.",
    },
    steps: [
      {
        title: {
          id: "1. Ikuti perjalanan besaran sampai menjadi informasi",
          en: "1. Follow the quantity from measurement to information",
        },
        body: [
          {
            id: "Kita mengelompokkan komponen menurut perannya dalam sistem. Mulai dari besaran fisik, lalu telusuri jalur sinyal. Komponen dapat merasakan besaran, menyiapkan sinyal, mengolah data, atau menampilkan hasil. Anda dapat memakai urutan tersebut untuk menentukan kelompok setiap komponen.",
            en: "We classify components by their roles in the system. Start with the physical quantity and follow the signal path. A component can sense the quantity, prepare the signal, process data, or present results. You can use these roles to classify each item.",
          },
          {
            id: "Sebuah komponen tidak harus langsung menghasilkan angka agar termasuk sensor. Tahanan yang berubah terhadap suhu atau regangan juga sudah membawa informasi pengukuran.",
            en: "A component does not need to output a number to be a sensor. Resistance that changes with temperature or strain already carries measurement information.",
          },
        ],
      },
      {
        title: {
          id: "2. Cari komponen yang langsung merasakan besaran",
          en: "2. Find the components that directly sense the measurand",
        },
        body: [
          {
            id: "Elemen perasa berinteraksi langsung dengan besaran yang ingin kita ukur. Encoder inkremental(a) merasakan gerak atau sudut, sedangkan LVDT(b) merasakan perpindahan. Strain gauge(g) merasakan regangan, dan RTD(h) merasakan suhu. Probe kapasitif(j) merasakan kedekatan atau jarak.",
            en: "Sensing elements directly interact with the quantity we want to measure. Incremental encoder(a) senses motion or angle, while LVDT(b) senses displacement. Strain gauge(g) senses strain, and RTD(h) senses temperature. Capacitive probe(j) senses proximity or distance.",
          },
          {
            id: "Pada RTD dan strain gauge, sinyal awal berupa perubahan tahanan. Pada LVDT dan encoder, gerak mengubah sinyal listrik melalui cara kerja masing-masing. Semua contoh ini berada pada titik ketika besaran fisik mulai menjadi sinyal yang dapat dibaca.",
            en: "An RTD and a strain gauge initially produce a resistance change. In an LVDT or encoder, motion changes an electrical signal through the device’s mechanism. Each acts where the physical quantity first becomes a readable signal.",
          },
        ],
      },
      {
        title: {
          id: "3. Mengapa jembatan tidak menjadi elemen perasa utama?",
          en: "3. Why is the bridge not the primary sensing element?",
        },
        body: [
          {
            id: "Jembatan Wheatstone membandingkan tahanan dan menghasilkan beda tegangan. Jika strain gauge dipasang pada salah satu lengannya, gauge merasakan regangan, sedangkan jembatan membuat perubahan tahanannya lebih mudah dibaca. Membedakan keduanya menjelaskan penempatan (c) sebagai pengondisi sinyal.",
            en: "A Wheatstone bridge compares resistances and produces a voltage difference. If a strain gauge occupies one arm, the gauge senses strain while the bridge makes its resistance change easier to read. The bridge therefore belongs to signal conditioning in item(c).",
          },
        ],
      },
      {
        title: {
          id: "4. Cari komponen yang menyiapkan sinyal",
          en: "4. Find the components that prepare the signal",
        },
        body: [
          {
            id: "Pengondisi sinyal mengubah bentuk atau besar sinyal agar mudah dibaca. (c) Jembatan Wheatstone mengubah beda tahanan menjadi beda tegangan. (d) Penguat pembalik memberi penguatan serta pembalikan tanda. (e) Filter lolos rendah menekan komponen frekuensi tinggi. (i) Konverter arus-ke-tegangan mengubah sinyal arus menjadi tegangan.",
            en: "Signal-conditioning elements adjust signal form or size for readout. (c) A Wheatstone bridge converts resistance imbalance to voltage. (d) An inverting amplifier scales and inverts the signal. (e) A low-pass filter suppresses high-frequency components. (i) A current-to-voltage converter changes current into voltage.",
          },
          {
            id: "Penguatan, penyaringan, dan konversi arus menjadi tegangan mempertahankan informasi dari sensor sambil menyesuaikannya dengan alat berikutnya. Filter dapat membuang gangguan frekuensi tinggi, tetapi cutoff yang terlalu rendah juga dapat membuang bagian sinyal yang ingin diukur.",
            en: "Amplification, filtering, and current-to-voltage conversion retain sensor information while adapting it to the next device. A filter can reject high-frequency interference, but an excessively low cutoff can also remove part of the wanted signal.",
          },
        ],
      },
      {
        title: {
          id: "5. Tempatkan konverter analog-ke-digital",
          en: "5. Place the analog-to-digital converter",
        },
        body: [
          {
            id: "Dengan pembagian fungsi pada pembahasan ini, (f) ADC masuk pemroses sinyal karena mengubah nilai analog menjadi kode digital. Beberapa arsitektur memasukkan ADC ke blok akuisisi atau pengondisian. Jelaskan fungsi konversinya agar klasifikasi tidak bergantung pada nama blok saja.",
            en: "Under the functional grouping used here, (f) the ADC is a signal-processing element because it converts an analog value into a digital code. Some architectures include it in acquisition or conditioning. State the conversion function so the classification does not depend on block labels alone.",
          },
          {
            id: "ADC mengambil masukan analog dan menghasilkan kode digital dengan resolusi terbatas. Ia belum menyajikan hasil ke pengguna hanya karena keluarannya berupa angka biner. Komputer atau layar masih perlu mengartikan kode itu.",
            en: "An ADC takes an analog input and produces a finite-resolution digital code. A binary number is not yet presentation to the user: a computer or display must still interpret it.",
          },
        ],
      },
      {
        title: {
          id: "6. Periksa apakah ada penyaji data",
          en: "6. Check for a data-presentation element",
        },
        body: [
          {
            id: "Daftar soal tidak memuat penyaji data. Contoh kelompok ini ialah layar angka, grafik, penunjuk, atau pencatat hasil. Jangan memaksa salah satu sensor masuk ke sini hanya agar semua kelompok terisi.",
            en: "The list contains no data-presentation element. Examples would be a numeric display, plot, pointer, or recorder. There is no need to force a sensor into this group just to fill every category.",
          },
          {
            id: "Gunakan kelompok yang kosong sebagai hasil pemeriksaan daftar, bukan alasan memindahkan komponen secara paksa. Daftar ini memang dapat mencakup sensor dan pengondisi tanpa memuat layar atau pencatat.",
            en: "Treat an empty group as a valid result of checking the list, not a reason to force a component into it. This list can include sensors and conditioners without including a display or recorder.",
          },
        ],
      },
      {
        title: {
          id: "7. Periksa klasifikasi dengan satu contoh rantai lengkap",
          en: "7. Check the classification with a complete example chain",
        },
        body: [
          {
            id: "Contoh: suhu → RTD → jembatan → penguat/filter → ADC → perangkat lunak → layar. Suhu mengubah tahanan pada RTD; rangkaian berikutnya menyiapkan dan mengubah sinyal; layar menyajikan hasil. Fungsi inilah yang mendukung pembagian kelompok pada jawaban.",
            en: "Example: temperature → RTD → bridge → amplifier/filter → ADC → software → display. Temperature changes the RTD resistance; later circuits prepare and convert its signal; the display presents the result. These functions support the classification in the answer.",
          },
        ],
      },
    ],
    answer: {
      id: "Perasa: a, b, g, h, j. Pengondisi: c, d, e, i. Pemroses: f, dengan konvensi pembagian fungsi di atas. Penyaji data: tidak ada pada daftar.",
      en: "Sensing: a, b, g, h, j. Conditioning: c, d, e, i. Processing: f, under the stated functional convention. Presentation: none in the list.",
    },
    visual: {
      kind: "system",
      params: {
        mode: "elements",
      },
      caption: {
        id: "Telusuri perubahan besaran fisik hingga sinyal dan hasil yang terbaca.",
        en: "Follow the path from a physical quantity to a signal and readable result.",
      },
    },
    referencePages: [1, 2, 6, 14, 15, 16, 17],
  },
  {
    id: "2025-uas-q2",
    year: 2025,
    exam: "uas",
    number: 2,
    topic: "calibration",
    title: {
      id: "Kalibrasi sensor dan perubahan catu",
      en: "Sensor calibration and supply variation",
    },
    source: {
      url: "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
      file: "2025-uas.pdf",
      pages: [1, 3],
    },
    originalLanguage: "en",
    original:
      "2. [20%] Systematic Characteristics of Measurement System\nA displacement sensor has an input range of 0.0 to 0.3 cm and a standard supply voltage Vs = 1.0 volts. Using the calibration results given in the table, estimate:\na. [5%] The slope K of the ideal straight line.\nb. [10%] The constant KI, KM associated with supply voltage variations.\nc. [5%] The maximum nonlinearity as a percentage of f.s.d.\nDisplacement x in cm: 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0.\nOutput voltage in millivolts when Vs = 1.0 V: 0, 33, 64, 88, 103, 111, 116.\nOutput voltage in millivolts when Vs = 1.2 V: 0, 42, 83, 112, 130, 141, 148.\nUseful formula: \\(O=KI+K_M I_M I+a+K_I I_I+N(I)\\).",
    prompt: {
      id: "Sensor perpindahan memakai catu acuan \\(V_s=1.0\\ \\mathrm V\\). Teks soal menyebut rentang 0.0 sampai 0.3 cm, tetapi tabel memberi 0.0 sampai 3.0 cm. Kita pertahankan catatan ini dan memakai angka tabel secara konsisten.\nUntuk \\(x=[0,0.5,1,1.5,2,2.5,3]\\ \\mathrm{cm}\\), keluaran pada 1.0 V ialah \\([0,33,64,88,103,111,116]\\ \\mathrm{mV}\\), dan pada 1.2 V ialah \\([0,42,83,112,130,141,148]\\ \\mathrm{mV}\\).\n(a) Cari kemiringan ideal \\(K\\). (b) Taksir \\(K_I\\) dan \\(K_M\\) akibat perubahan catu. (c) Cari ketaklinieran maksimum dalam persen skala penuh.",
      en: "The displacement sensor uses a \\(1.0\\ \\mathrm V\\) reference supply. The prose states a 0.0 to 0.3 cm range, but the table spans 0.0 to 3.0 cm. We retain this discrepancy and consistently use the table values.\nFor \\(x=[0,0.5,1,1.5,2,2.5,3]\\ \\mathrm{cm}\\), output at 1.0 V is \\([0,33,64,88,103,111,116]\\ \\mathrm{mV}\\); output at 1.2 V is \\([0,42,83,112,130,141,148]\\ \\mathrm{mV}\\).\n(a) Find ideal slope \\(K\\). (b) Estimate supply-related \\(K_I\\) and \\(K_M\\). (c) Find maximum nonlinearity as a percentage of full-scale deflection.",
    },
    steps: [
      {
        title: {
          id: "1. Tetapkan data acuan dan jelaskan konflik satuan sumber",
          en: "1. Set the reference data and explain the source range conflict",
        },
        body: [
          {
            id: "Kita memakai posisi \\(x\\) dalam cm dan keluaran \\(O\\) dalam mV. Tabel memuat posisi 0 sampai 3.0 cm, tetapi kalimat soal menyebut maksimum 0.3 cm. Kita mengikuti semua angka tabel secara konsisten. Mengubah titik akhirnya saja akan mengubah hubungan data secara keliru.",
            en: "We use position \\(x\\) in cm and output \\(O\\) in mV. The table spans 0 to 3.0 cm, but the prose states a 0.3 cm maximum. We use all table values consistently. Changing only the endpoint would distort the data relation.",
          },
          {
            id: "Catu 1.0 V menjadi kondisi standar. Kita akan mencari garis acuannya, melihat bagaimana catu 1.2 V mengubah garis itu, lalu menghitung ketaklinieran terhadap garis standar.",
            en: "The 1.0 V supply is the standard condition. We will find its reference line, determine how the 1.2 V supply changes that line, and then calculate nonlinearity relative to the standard line.",
          },
        ],
      },
      {
        title: {
          id: "2. Pakai garis dua ujung sebagai acuan",
          en: "2. Use an endpoint reference line",
        },
        body: [
          {
            id: "Pada catu standar, dua ujung tabel adalah (0 cm, 0 mV) dan (3 cm, 116 mV). Garis ideal melewati kedua titik ini, sehingga offset acuannya nol.",
            en: "At the standard supply, the table endpoints are (0 cm, 0 mV) and (3 cm, 116 mV). The ideal line passes through both, so its reference offset is zero.",
          },
          {
            id: "Dalam \\(O=Kx+a\\), \\(K\\) adalah perubahan keluaran per cm dan \\(a\\) adalah keluaran garis pada \\(x=0\\). Gunakan selisih keluaran dibagi selisih masukan; jangan membagi masing-masing titik untuk memaksakan satu kemiringan pada kurva yang tidak lurus.",
            en: "In \\(O=Kx+a\\), \\(K\\) is output change per cm and \\(a\\) is the line output at \\(x=0\\). Use output difference divided by input difference; dividing every point separately would not make a nonlinear curve share one slope.",
          },
        ],
        math: "K=\\frac{116-0}{3-0}=38.6667\\ \\mathrm{mV/cm},\\qquad a=0,\\qquad O_{\\mathrm{lin}}(x)=38.6667x",
      },
      {
        title: {
          id: "3. Pisahkan perubahan offset dan kemiringan",
          en: "3. Separate offset and slope changes",
        },
        body: [
          {
            id: "Gunakan \\(\\Delta V_s=V_s-1.0\\ \\mathrm V\\). Koefisien \\(K_I\\) menunjukkan pergeseran keluaran yang tidak bergantung pada posisi. Koefisien \\(K_M\\) menunjukkan perubahan sensitivitas per perubahan catu. Model berikut memakai taksiran garis ujung.",
            en: "Define \\(\\Delta V_s=V_s-1.0\\ \\mathrm V\\). Coefficient \\(K_I\\) describes a position-independent output shift. Coefficient \\(K_M\\) describes sensitivity change per supply change. The following model uses endpoint estimates.",
          },
          {
            id: "Menggunakan \\(\\Delta V_s\\), bukan \\(V_s\\) langsung, memastikan pengaruh catu tambahan nol pada kondisi standar. Suku \\(K_I\\Delta V_s\\) menggeser seluruh garis; suku \\(K_M\\Delta V_s\\,x\\) mengubah kemiringannya.",
            en: "Using \\(\\Delta V_s\\), rather than raw \\(V_s\\), makes the extra supply effect zero at the standard condition. The term \\(K_I\\Delta V_s\\) shifts the whole line; \\(K_M\\Delta V_s\\,x\\) changes its slope.",
          },
        ],
        math: "O(x,V_s)\\approx[K+K_M\\Delta V_s]x+a+K_I\\Delta V_s+N(x,V_s)",
      },
      {
        title: {
          id: "4. Cari KI dari titik nol",
          en: "4. Find KI from the zero-input point",
        },
        body: [
          {
            id: "Pada x = 0, kedua catu memberi keluaran 0 mV. Jadi, perubahan catu tidak menggeser titik nol pada data ini.",
            en: "At x = 0, both supplies give 0 mV. Thus the supply change does not shift the zero-input output in these data.",
          },
          {
            id: "Memilih \\(x=0\\) sengaja menghapus semua suku yang mengandung posisi. Dengan demikian, selisih keluaran pada titik nol menguji pengaruh offset tanpa tercampur pengaruh kemiringan.",
            en: "Choosing \\(x=0\\) deliberately removes all position-dependent terms. The output difference at zero therefore tests the offset effect without mixing it with a slope change.",
          },
        ],
        math: "K_I=\\frac{O(0,1.2)-O(0,1.0)}{1.2-1.0}=\\frac{0-0}{0.2}=0\\ \\mathrm{mV/V}",
      },
      {
        title: {
          id: "5. Cari KM dari perubahan kemiringan",
          en: "5. Find KM from the change in slope",
        },
        body: [
          {
            id: "Garis ujung pada 1.2 V memiliki kemiringan 148/3 mV/cm. Kurangi dengan kemiringan acuan lalu bagi 0.2 V.",
            en: "The endpoint line at 1.2 V has slope 148/3 mV/cm. Subtract the reference slope and divide by 0.2 V.",
          },
          {
            id: "Perubahan kemiringannya 10.6667 mV/cm untuk kenaikan catu 0.2 V. Pembagian oleh 0.2 menghasilkan pengaruh per volt, bukan pengaruh total saat catu menjadi 1.2 V.",
            en: "The slope change is 10.6667 mV/cm for a 0.2 V supply increase. Dividing by 0.2 gives the effect per volt, not the total effect at a 1.2 V supply.",
          },
          {
            id: "Pemeriksaan: \\(38.6667+53.3333(0.2)=49.3333\\ \\mathrm{mV/cm}\\). Jadi model mengembalikan kemiringan ujung pada catu kedua.",
            en: "Check: \\(38.6667+53.3333(0.2)=49.3333\\ \\mathrm{mV/cm}\\). The model therefore reproduces the second supply’s endpoint slope.",
          },
        ],
        math: "K_{1.2}=\\frac{148}{3}=49.3333\\ \\mathrm{mV/cm}\\\\K_M=\\frac{49.3333-38.6667}{0.2}=53.3333\\ \\mathrm{mV/(cm\\,V)}",
        note: {
          id: "Ini taksiran dari dua ujung, bukan kecocokan tepat semua titik. Misalnya pada x = 1 cm, model perubahan garis memberi 10.667 mV, sedangkan tabel memberi 19 mV. Bentuk ketaklinieran juga berubah bersama catu.",
          en: "The endpoint estimate describes the line change, but does not fit every point exactly. At x = 1 cm, the line-change model predicts 10.667 mV, while the table gives 19 mV. The nonlinear residual also changes with supply.",
        },
      },
      {
        title: {
          id: "6. Hitung satu residu dengan lengkap sebelum seluruh tabel",
          en: "6. Work through one residual before the full table",
        },
        body: [
          {
            id: "Pada \\(x=1.5\\ \\mathrm{cm}\\), garis acuan memprediksi \\(38.6667(1.5)=58\\ \\mathrm{mV}\\), sedangkan pengukuran memberi 88 mV. Selisih 30 mV berarti titik nyata berada di atas garis, bukan bahwa posisi sebenarnya bertambah 30 cm.",
            en: "At \\(x=1.5\\ \\mathrm{cm}\\), the reference line predicts \\(38.6667(1.5)=58\\ \\mathrm{mV}\\), while the measurement gives 88 mV. The 30 mV difference places the measured point above the line; it is not a 30 cm position increase.",
          },
        ],
        math: "N(1.5)=O_{\\mathrm{measured}}-O_{\\mathrm{line}}=88-58=30\\ \\mathrm{mV}",
      },
      {
        title: {
          id: "7. Hitung simpangan pada setiap posisi",
          en: "7. Calculate the deviation at each position",
        },
        body: [
          {
            id: "Gunakan data catu standar 1.0 V untuk menilai ketaklinieran sensor acuan. Kurangi setiap keluaran tabel dengan keluaran garis ideal pada posisi yang sama.",
            en: "Use the standard 1.0 V data to assess reference-supply nonlinearity. Subtract the ideal-line output from each table output at the same position.",
          },
          {
            id: "Terapkan pengurangan yang sama pada setiap baris. Garis acuan melalui dua ujung. Oleh karena itu, residu di kedua ujung harus nol. Pemeriksaan ini membantu menemukan salah substitusi atau salah satuan.",
            en: "Apply the same subtraction to every row. Because the reference line passes through both endpoints, both endpoint residuals must be zero. The zero-residual check helps you catch substitution or unit mistakes.",
          },
        ],
        math: "N(x)=O(x,1.0)-38.6667x",
        table: {
          headers: [
            {
              id: "x (cm)",
              en: "x (cm)",
            },
            {
              id: "O (mV)",
              en: "O (mV)",
            },
            {
              id: "Garis ideal (mV)",
              en: "Ideal line (mV)",
            },
            {
              id: "Simpangan (mV)",
              en: "Deviation (mV)",
            },
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
      {
        title: {
          id: "8. Nyatakan simpangan maksimum dalam persen",
          en: "8. Express the maximum deviation as a percentage",
        },
        body: [
          {
            id: "Simpangan terbesar pada titik yang tersedia ialah 30 mV di x = 1.5 cm. Rentang keluaran penuh ialah 116 mV. Persentase ini memakai skala penuh, bukan nilai 88 mV pada titik tersebut.",
            en: "The largest deviation among the supplied points is 30 mV at x = 1.5 cm. Full output span is 116 mV. The percentage uses full scale, not the 88 mV output at that point.",
          },
          {
            id: "Kata “maksimum” di sini berlaku untuk titik yang tersedia. Data tidak memberi jaminan tentang puncak residu di antara titik uji. Itu alasan pembahasan menyebut maksimum teramati, bukan batas pasti untuk semua posisi.",
            en: "“Maximum” here refers to the supplied points. The data do not rule out a larger residual between test points. The data support an observed maximum, rather than an exact bound at every position.",
          },
        ],
        math: "\\%N_{\\max}=\\frac{30}{116}\\,100\\%=25.8621\\%",
      },
      {
        title: {
          id: "9. Periksa batas model pengaruh catu",
          en: "9. Check the limits of the supply-effect model",
        },
        body: [
          {
            id: "Pada 1 cm, keluaran berubah dari 64 menjadi 83 mV: selisih 19 mV. Model perubahan garis ujung hanya memprediksi \\(K_M\\Delta V_s x=53.3333(0.2)(1)=10.6667\\ \\mathrm{mV}\\). Sisa selisih menunjukkan bentuk ketaklinieran juga berubah dengan catu.",
            en: "At 1 cm, output rises from 64 to 83 mV, a 19 mV difference. The endpoint-line change predicts only \\(K_M\\Delta V_s x=53.3333(0.2)(1)=10.6667\\ \\mathrm{mV}\\). The remainder shows that the nonlinear shape also changes with supply.",
          },
          {
            id: "Jadi KM dan KI di sini merangkum perubahan garis acuan. Keduanya tidak membuat model linear cocok tepat dengan setiap titik pada kedua catu.",
            en: "Thus KM and KI summarize changes in the reference line. They do not make a linear model fit every point at both supply levels exactly.",
          },
        ],
      },
      {
        title: {
          id: "10. Tafsirkan hasil dan akibat pilihan skala posisi",
          en: "10. Interpret the result and the position-scale choice",
        },
        body: [
          {
            id: "\\(K_I=0\\) menyatakan titik nol tetap; \\(K_M>0\\) menyatakan catu yang lebih besar menaikkan sensitivitas. Jika semua posisi tabel harus dibagi 10, \\(K\\) dan \\(K_M\\) menjadi 10 kali lebih besar. Persen ketaklinieran tetap sama karena residu tegangan dan span tegangan tidak berubah.",
            en: "\\(K_I=0\\) means the zero point stays fixed; \\(K_M>0\\) means a higher supply increases sensitivity. If every position must be divided by 10, \\(K\\) and \\(K_M\\) become 10 times larger. Percentage nonlinearity stays unchanged because voltage residuals and voltage span do not change.",
          },
        ],
      },
    ],
    answer: {
      id: "Dengan tabel 0 sampai 3 cm, garis dua ujung memberi K = 38.667 mV/cm dan KI = 0. Nilai KM ≈ 53.333 mV/(cm·V). Ketaklinieran maksimum pada titik sampel ialah 25.86% skala penuh.",
      en: "For the 0 to 3 cm table, endpoint lines give K = 38.667 mV/cm and KI = 0. The value of KM is approximately 53.333 mV/(cm·V). Maximum sampled nonlinearity is 25.86% of full scale.",
    },
    answerMath:
      "\\boxed{\\begin{aligned}K&=38.667\\ \\mathrm{mV/cm},\\quad K_I=0\\ \\mathrm{mV/V}\\\\K_M&\\approx53.333\\ \\mathrm{mV/(cm\\,V)}\\\\N_{\\max}&=25.86\\%\\ \\mathrm{FS}\\end{aligned}}",
    assumptions: [
      {
        id: "Rentang 0.0 sampai 0.3 cm pada paragraf bertentangan dengan tabel 0.0 sampai 3.0 cm. Hasil memakai tabel. Jika seluruh posisi tabel seharusnya sepersepuluhnya, K dan KM menjadi sepuluh kali lebih besar; persen ketaklinieran tetap.",
        en: "The prose range 0.0 to 0.3 cm conflicts with the 0.0 to 3.0 cm table. Results use the table. If every tabulated position should be one tenth as large, K and KM become ten times larger; percentage nonlinearity stays unchanged.",
      },
      {
        id: "K dan KM memakai garis dua ujung, bukan regresi kuadrat terkecil. Data tidak mendukung satu model perubahan catu linear yang tepat untuk semua posisi. Maksimum di antara titik sampel belum membuktikan maksimum pada setiap posisi kontinu.",
        en: "K and KM use endpoint lines, not least-squares regression. The data do not support one exact linear supply-change model at every position. The sampled maximum does not prove the maximum at every continuous position.",
      },
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
      caption: {
        id: "Bandingkan data kalibrasi, garis dua ujung, dan jarak vertikal tiap titik.",
        en: "Compare calibration data, endpoint lines, and each point’s vertical deviation.",
      },
    },
  },
  {
    id: "2025-uas-q3",
    year: 2025,
    exam: "uas",
    number: 3,
    topic: "position",
    title: {
      id: "Encoder 8 bit dan cara kerja resolver",
      en: "8-bit encoder and resolver operation",
    },
    source: {
      url: "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
      file: "2025-uas.pdf",
      pages: [1, 2],
    },
    originalLanguage: "en",
    original:
      "3. [25%] Angular Position Measurement\na. [5%] Explain the working principle of an incremental encoder. How can you determine the direction of rotation that occurs?\nb. [5%] What is the difference between an incremental encoder and an absolute encoder? What are the weaknesses of an incremental encoder?\nc. [5%] Calculate the resolution in degrees of an 8-bit encoder.\nd. [5%] What are the advantages and disadvantages of resolver compared to linear potentiometer?\ne. [5%] Explain briefly how the following resolver works.\nFigure: rotor reference RH/RL coupled through a brushless excitation transformer; perpendicular stator windings S2/S4 marked K Ref Cos θ and S3/S1 marked K Ref Sin θ.",
    prompt: {
      id: "(a) Jelaskan prinsip encoder inkremental dan penentuan arah putarannya. (b) Bandingkan dengan encoder absolut serta sebutkan kelemahannya. (c) Hitung resolusi sudut encoder 8 bit untuk satu putaran. (d) Bandingkan kelebihan dan kekurangan resolver terhadap potensiometer linear. (e) Jelaskan resolver pada gambar, yang memiliki keluaran \\(K\\,\\mathrm{Ref}\\cos\\theta\\) dan \\(K\\,\\mathrm{Ref}\\sin\\theta\\).",
      en: "(a) Explain incremental-encoder operation and direction detection. (b) Compare it with an absolute encoder and state its weaknesses. (c) Find the angular resolution of an 8-bit encoder over one turn. (d) Compare a resolver’s strengths and weaknesses with a linear potentiometer. (e) Explain the pictured resolver with \\(K\\,\\mathrm{Ref}\\cos\\theta\\) and \\(K\\,\\mathrm{Ref}\\sin\\theta\\) outputs.",
    },
    steps: [
      {
        title: {
          id: "1. Bedakan posisi saat ini dari perubahan posisi",
          en: "1. Distinguish current position from position change",
        },
        body: [
          {
            id: "Kita perlu membedakan perubahan posisi dan posisi saat ini. **Encoder** (alat yang mengubah gerak menjadi kode atau pulsa) dapat memberi kedua jenis informasi itu. Anda dapat menghitung pulsa untuk mengetahui gerak poros. Untuk mengetahui sudut saat ini, Anda juga memerlukan acuan awal atau kode posisi yang unik.",
            en: "We need to distinguish position change from current position. An **encoder** converts motion into pulses or codes that provide these kinds of information. You can count pulses to measure shaft movement. To find its current angle, you also need an initial reference or a unique position code.",
          },
        ],
      },
      {
        title: {
          id: "2. Hitung gerak dari pulsa",
          en: "2. Count motion from pulses",
        },
        body: [
          {
            id: "Pada encoder inkremental optik, pola terang-gelap pada cakram melewati pemancar dan penerima. Setiap perubahan menghasilkan pulsa. Banyak pulsa memberi perubahan sudut, sedangkan frekuensi pulsa memberi kecepatan putar.",
            en: "In an optical incremental encoder, alternating disk regions pass a light emitter and receiver to produce pulses. Pulse count gives angular displacement, while pulse frequency gives rotational speed.",
          },
          {
            id: "\\(\\Delta n\\) adalah jumlah hitungan yang bertambah, dan \\(N_{\\mathrm{count/rev}}\\) jumlah hitungan efektif per putaran. Pada pembacaan kuadratur×4, hitungan efektif dapat empat kali jumlah periode kanal. Tetapkan aturan hitung sebelum mengubah hitungan menjadi derajat.",
            en: "\\(\\Delta n\\) is the count change, and \\(N_{\\mathrm{count/rev}}\\) is the effective count per turn. With quadrature×4 decoding, this can be four times the number of channel periods. Define the counting convention before converting counts to degrees.",
          },
        ],
        math: "\\Delta\\theta=\\frac{360^\\circ}{N_{\\mathrm{count/rev}}}\\Delta n",
      },
      {
        title: {
          id: "3. Gunakan dua kanal untuk arah",
          en: "3. Use two channels for direction",
        },
        body: [
          {
            id: "A dan B berbeda fase seperempat periode. Urutan 00 → 10 → 11 → 01 berarti A mendahului B. Urutan terbalik berarti arah berbalik. Satu kanal saja tidak memberi informasi arah yang unik.",
            en: "A and B are separated by a quarter period. The order 00 → 10 → 11 → 01 means A leads B. Reversing the order indicates reverse rotation. A single channel does not uniquely identify direction.",
          },
          {
            id: "Pada urutan pertama, bit A berubah dari 0 ke 1 ketika B masih 0. Pada urutan terbalik, B berubah lebih dahulu. Dengan membaca transisi yang berurutan, penghitung dapat memilih menambah atau mengurangi posisi.",
            en: "In the first sequence, A changes from 0 to 1 while B is still 0. In the reverse sequence, B changes first. Reading successive transitions lets the counter decide whether to add to or subtract from position.",
          },
        ],
        visual: {
          kind: "encoder",
          params: {
            mode: "quadrature",
            pulses: 8,
          },
          caption: {
            id: "Bandingkan urutan kanal saat putaran berbalik.",
            en: "Compare channel order when rotation reverses.",
          },
        },
      },
      {
        title: {
          id: "4. Bedakan perubahan posisi dan kode posisi",
          en: "4. Distinguish position changes from position codes",
        },
        body: [
          {
            id: "Encoder inkremental menyimpan posisi melalui penghitung. Kehilangan daya atau pulsa yang terlewat dapat membuat posisi hitungan salah, sehingga perlu acuan ulang. Encoder absolut memberi kode sudut langsung. Pada tipe satu putaran, kode menunjukkan posisi dalam satu putaran, bukan jumlah putaran total.",
            en: "An incremental encoder tracks position with a counter. Power loss or missed pulses can invalidate the count, requiring a new reference. An absolute encoder gives a direct angle code. A single-turn model identifies position within one turn, not total accumulated turns.",
          },
          {
            id: "Untuk mesin yang harus mengetahui sudut setelah listrik kembali tanpa bergerak mencari titik nol, kode absolut memberi keuntungan langsung. Namun, alat absolut satu putaran tetap tidak memberi jumlah putaran total tanpa kemampuan tambahan.",
            en: "For a machine that must know its angle after power returns without moving to find a zero reference, an absolute code offers a direct advantage. A single-turn absolute device still cannot provide the total turn count without additional capability.",
          },
        ],
      },
      {
        title: {
          id: "5. Bagi satu putaran menjadi 256 posisi",
          en: "5. Divide one turn into 256 positions",
        },
        body: [
          {
            id: "Delapan bit menyediakan 2⁸ kode. Sudut satu putaran ialah 360°. Jadi, lebar satu langkah sudut ialah 360°/256. Lebar langkah tersebut menyatakan resolusi, bukan jaminan ketelitian alat.",
            en: "Eight bits provide 2⁸ codes. One turn is 360°, so each angular step spans 360°/256. This step width describes resolution, not a guarantee of accuracy.",
          },
          {
            id: "Ada 256 wilayah sudut, dengan kode 0 sampai 255. Jangan membagi 360° dengan 255 hanya karena kode tertingginya 255: terdapat 256 kode, dan batas 0°/360° adalah posisi fisik yang sama.",
            en: "There are 256 angular intervals, labelled 0 through 255. Do not divide 360° by 255 just because 255 is the highest code: there are 256 codes, and the 0°/360° boundary is the same physical position.",
          },
        ],
        math: "N=2^8=256,\\qquad \\Delta\\theta=\\frac{360^\\circ}{256}=1.40625^\\circ",
        visual: {
          kind: "encoder",
          params: {
            mode: "absolute",
            bits: 8,
          },
          caption: {
            id: "Encoder 8 bit membagi lingkaran menjadi 256 kode posisi.",
            en: "An 8-bit encoder divides the circle into 256 position codes.",
          },
        },
      },
      {
        title: {
          id: "6. Pisahkan resolusi dari ketelitian posisi",
          en: "6. Separate resolution from angular accuracy",
        },
        body: [
          {
            id: "Resolusi 1.40625° adalah jarak antarwilayah kode. Salah posisi cakram, ketidaktepatan pembaca, atau kalibrasi dapat membuat sudut nyata berbeda dari sudut yang ditunjukkan. Oleh karena itu, menambah bit memperkecil langkah kode tetapi tidak otomatis menghapus galat alat.",
            en: "The 1.40625° resolution is the spacing of code intervals. Disk misalignment, readout imperfections, or calibration can make the true angle differ from the indicated angle. More bits reduce the code step but do not automatically remove instrument error.",
          },
        ],
      },
      {
        title: {
          id: "7. Bandingkan resolver dengan potensiometer linear",
          en: "7. Compare a resolver with a linear potentiometer",
        },
        body: [
          {
            id: "Resolver brushless mengukur sudut melalui induksi, sehingga tidak memakai kontak geser pengukur. Ia tahan untuk putaran berulang dan tidak mengalami keausan wiper. Kekurangannya ialah kebutuhan eksitasi AC, pembaca sinus-kosinus, ukuran, dan biaya rangkaian.",
            en: "A brushless resolver measures angle by induction without a sliding sensing contact. It suits repeated rotation and avoids wiper wear. Its drawbacks include AC excitation, sine/cosine readout electronics, size, and circuit cost.",
          },
          {
            id: "Potensiometer linear langsung mengukur perpindahan lurus dengan pembagi tegangan DC yang sederhana dan murah. Namun, kontaknya dapat aus dan menambah noise. Keduanya mengukur jenis posisi berbeda; penggantian langsung memerlukan pengubah gerak atau potensiometer putar yang sesuai.",
            en: "A linear potentiometer directly measures linear displacement using a simple, inexpensive DC voltage divider. Its contact can wear and add noise. The two devices measure different forms of position; substitution needs a motion conversion or a suitable rotary potentiometer.",
          },
          {
            id: "Sebelum membandingkan biaya dan keausan, pastikan besaran yang hendak diukur sama. Resolver putar dan potensiometer linear tidak langsung saling menggantikan hanya karena keduanya termasuk sensor posisi.",
            en: "Before comparing cost and wear, check that the required measured quantity is the same. A rotary resolver and a linear potentiometer are not direct replacements merely because both sense position.",
          },
        ],
      },
      {
        title: {
          id: "8. Turunkan sudut dari dua keluaran resolver",
          en: "8. Recover angle from the resolver outputs",
        },
        body: [
          {
            id: "Eksitasi AC Ref membangkitkan medan rotor. Dua kumparan stator tegak lurus menerima tegangan dengan amplitudo yang mengikuti kosinus dan sinus sudut. Setelah demodulasi terhadap Ref, gunakan kedua tanda amplitudo agar kuadran tidak hilang.",
            en: "The AC reference excites the rotor field. Two perpendicular stator windings produce voltages whose amplitudes follow cosine and sine of the shaft angle. After reference-sensitive demodulation, retain both amplitude signs to identify the quadrant.",
          },
          {
            id: "\\(\\omega_c\\) adalah frekuensi sudut pembawa eksitasi, bukan kecepatan putar poros. Demodulasi mengambil amplitudo bertanda yang berubah terhadap \\(\\theta\\), lalu \\(\\operatorname{atan2}\\) memakai dua tanda untuk memilih kuadran.",
            en: "\\(\\omega_c\\) is the angular frequency of the excitation carrier, not shaft rotational speed. Demodulation extracts the signed amplitudes that vary with \\(\\theta\\); \\(\\operatorname{atan2}\\) then uses both signs to choose the quadrant.",
          },
        ],
        math: "v_{S2-S4}=K V_{\\mathrm{ref}}\\cos\\theta\\sin\\omega_ct,\\quad v_{S3-S1}=K V_{\\mathrm{ref}}\\sin\\theta\\sin\\omega_ct\\\\\\theta=\\operatorname{atan2}(V_{\\sin},V_{\\cos})",
        visual: {
          kind: "resolver",
          params: {
            angle: 40,
          },
          caption: {
            id: "Amplitudo sinus dan kosinus berubah bersama satu sudut rotor.",
            en: "Sine and cosine amplitudes change with the same rotor angle.",
          },
        },
      },
      {
        title: {
          id: "9. Cek keluaran resolver pada sudut yang dikenal",
          en: "9. Check resolver outputs at known angles",
        },
        body: [
          {
            id: "Pada 0°, kanal sinus nol dan kanal kosinus positif maksimum. Pada 90°, kanal kosinus nol dan kanal sinus positif maksimum. Pada 180°, kosinus menjadi negatif. Tanda itu menjelaskan mengapa rasio tanpa informasi kuadran dapat memberi sudut yang salah.",
            en: "At 0°, the sine channel is zero and cosine is at its positive maximum. At 90°, cosine is zero and sine is at its positive maximum. At 180°, cosine becomes negative. These signs explain why a ratio without quadrant information can produce the wrong angle.",
          },
        ],
      },
    ],
    answer: {
      id: "Resolusi encoder 8 bit ialah 1.40625° per kode. Arah inkremental berasal dari urutan A/B; posisi absolut berasal dari kode. Resolver membaca sudut dari dua amplitudo sinus-kosinus yang telah didemodulasi.",
      en: "An 8-bit encoder resolves 1.40625° per code. Incremental direction comes from A/B order; absolute position comes from its code. A resolver derives angle from demodulated sine/cosine amplitudes.",
    },
    answerMath: "\\boxed{\\Delta\\theta=1.40625^\\circ/\\mathrm{code}}",
    assumptions: [
      {
        id: "Encoder 8 bit mencakup satu putaran penuh dengan 256 kode. Arti searah jarum jam terhadap kanal A/B mengikuti pemasangan. Perbandingan resolver mengacu pada jenis brushless yang tampak pada sumber.",
        en: "The 8-bit encoder spans one full revolution with 256 codes. Clockwise meaning for A/B order depends on installation. Resolver comparison refers to the brushless type shown in the source.",
      },
    ],
    visual: {
      kind: "encoder",
      params: {
        bits: 8,
        mode: "absolute",
      },
      caption: {
        id: "Putar sudut untuk melihat perubahan kode dan batas resolusinya.",
        en: "Change angle to see the code transitions and resolution limit.",
      },
    },
    referencePages: [14, 15, 16, 17],
  },
  {
    id: "2025-uas-q4",
    year: 2025,
    exam: "uas",
    number: 4,
    topic: "temperature",
    title: {
      id: "Termokopel T dengan referensi 25 °C",
      en: "Type T thermocouple with a 25 °C reference",
    },
    source: {
      url: "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
      file: "2025-uas.pdf",
      pages: [2, 4],
    },
    originalLanguage: "en",
    original:
      "4. [10%] Thermocouple\nA table of Type T Thermocouple relative to a reference junction temperature of 0°C is presented in the Appendix. Use the table to calculate:\na. [5%] The percentage non-linearity at 200°C if the temperature range is 0 to 400°C.\nb. [5%] The temperature inside a vessel is an e.m.f of 11.5 mV is measured relative to a reference junction of 25°C.\nRelevant appendix entries (°C → mV): 0 → 0.000; 25 → 0.992; 200 → 9.288; 258 → 12.461; 259 → 12.518; 400 → 20.872.",
    prompt: {
      id: "Gunakan tabel termokopel tipe T dengan sambungan referensi \\(0^\\circ\\mathrm C\\). (a) Hitung ketaklinieran pada \\(200^\\circ\\mathrm C\\) untuk rentang \\(0\\) hingga \\(400^\\circ\\mathrm C\\). (b) Hitung suhu bejana jika tegangan terukur \\(11.5\\ \\mathrm{mV}\\) terhadap referensi \\(25^\\circ\\mathrm C\\).",
      en: "Use the Type T thermocouple table referenced to \\(0^\\circ\\mathrm C\\). (a) Find nonlinearity at \\(200^\\circ\\mathrm C\\) over a \\(0\\) to \\(400^\\circ\\mathrm C\\) range. (b) Find vessel temperature if the measured voltage is \\(11.5\\ \\mathrm{mV}\\) relative to a \\(25^\\circ\\mathrm C\\) reference.",
    },
    steps: [
      {
        title: {
          id: "1. Gunakan tabel yang sesuai tipe dan suhu referensi",
          en: "1. Use the correct type and reference-temperature table",
        },
        body: [
          {
            id: "Kita harus memakai tabel yang sesuai dengan jenis logam termokopel. Soal ini memakai tipe T, sehingga kita mengambil semua tegangan dari tabel tipe T. Tabel memberi \\(E_T(T,0)\\), yaitu tegangan terhadap sambungan referensi 0 °C. Tabel tipe J memakai pasangan logam berbeda dan tidak dapat menggantikannya.",
            en: "We must use a table for the thermocouple’s metal pair. This problem uses Type T, so we take every voltage from the Type T table. The table gives \\(E_T(T,0)\\), the voltage relative to a 0 °C reference junction. A Type J table describes different metals and cannot replace it.",
          },
          {
            id: "Mulai dengan bagian ketaklinieran pada referensi 0 °C. Setelah itu, ubah pembacaan dengan referensi 25 °C ke bentuk tabel sebelum mencari suhu.",
            en: "Start with nonlinearity at a 0 °C reference. Then convert the 25 °C-reference reading to the table convention before finding temperature.",
          },
        ],
      },
      {
        title: {
          id: "2. Hitung tegangan garis ideal pada 200 °C",
          en: "2. Calculate ideal-line voltage at 200 °C",
        },
        body: [
          {
            id: "Tabel memberi 0 mV pada 0 °C dan 20.872 mV pada 400 °C. Suhu 200 °C berada di tengah rentang. Garis lurus dua ujung memberi setengah tegangan skala penuh pada suhu ini.",
            en: "The table gives 0 mV at 0 °C and 20.872 mV at 400 °C. Since 200 °C is at midrange, the endpoint line gives half the full-scale voltage.",
          },
          {
            id: "Garis dua ujung mempunyai kemiringan \\(20.872/400=0.05218\\ \\mathrm{mV/{}^\\circ C}\\). Garis ini menyatakan alat linear hipotetis yang memiliki keluaran sama di kedua ujung rentang.",
            en: "The endpoint line has slope \\(20.872/400=0.05218\\ \\mathrm{mV/{}^\\circ C}\\). It describes a hypothetical linear instrument with the same two endpoint outputs.",
          },
        ],
        math: "E_{\\mathrm{lin}}(200)=20.872\\frac{200}{400}=10.436\\ \\mathrm{mV}",
      },
      {
        title: {
          id: "3. Bandingkan dengan tabel nyata",
          en: "3. Compare with the actual table",
        },
        body: [
          {
            id: "Tegangan nyata pada 200 °C ialah 9.288 mV. Simpangannya negatif karena keluaran tabel berada di bawah garis ideal. Untuk persen ketaklinieran, gunakan besar simpangannya.",
            en: "The actual voltage at 200 °C is 9.288 mV. Its deviation is negative because it lies below the ideal line. Use the magnitude for percentage nonlinearity.",
          },
          {
            id: "Gunakan span keluaran 20.872 mV sebagai penyebut. Membagi dengan 9.288 mV akan mengubah pertanyaannya menjadi galat relatif terhadap pembacaan, bukan ketaklinieran sebagai persen skala penuh.",
            en: "Use the 20.872 mV output span as denominator. Dividing by 9.288 mV would instead describe relative error against the reading, not nonlinearity as a percentage of full scale.",
          },
        ],
        math: "N(200)=9.288-10.436=-1.148\\ \\mathrm{mV}\\\\\\%N=\\frac{1.148}{20.872}\\,100\\%=5.5002\\%",
      },
      {
        title: {
          id: "4. Tentukan tanda koreksi referensi",
          en: "4. Determine the sign of the reference correction",
        },
        body: [
          {
            id: "Tegangan yang dibaca adalah selisih antara kontribusi sambungan ukur dan sambungan referensi. Kita mengembalikan acuan ke 0 °C dengan menambah kontribusi 25 °C yang pengukuran sudah kurangkan.",
            en: "The measured voltage is the measuring-junction contribution minus the reference-junction contribution. To refer it back to 0 °C, add the 25 °C contribution that the measurement has subtracted.",
          },
        ],
        math: "E_T(T,25)=E_T(T,0)-E_T(25,0)",
      },
      {
        title: {
          id: "5. Tambahkan tegangan referensi 25 °C",
          en: "5. Add the 25 °C reference voltage",
        },
        body: [
          {
            id: "Tabel pada 25 °C memberi 0.992 mV. Tambahkan nilai ini ke tegangan 11.5 mV agar hasil setara dengan referensi nol.",
            en: "The 25 °C table entry is 0.992 mV. Add it to the measured 11.5 mV to obtain an equivalent zero-reference voltage.",
          },
          {
            id: "Nilai 0.992 mV berasal dari tabel, bukan pendekatan sensitivitas konstan. Koreksi di ranah tegangan menjaga hubungan yang tepat meskipun kurva termokopel tidak linear.",
            en: "The 0.992 mV value comes from the table, not a constant-sensitivity approximation. Correcting in voltage preserves the relation even though the thermocouple curve is nonlinear.",
          },
        ],
        math: "E_T(T,0)=E_T(T,25)+E_T(25,0)=11.500+0.992=12.492\\ \\mathrm{mV}",
      },
      {
        title: {
          id: "6. Tentukan interval suhu sebelum menghitung pecahannya",
          en: "6. Determine the temperature interval before its fraction",
        },
        body: [
          {
            id: "Tegangan memenuhi \\(12.461<12.492<12.518\\ \\mathrm{mV}\\). Jadi, suhu harus berada antara 258 dan 259 °C. Selisih terhadap titik bawah adalah 0.031 mV dari rentang 0.057 mV, sehingga posisinya sedikit melewati setengah interval.",
            en: "Since \\(12.461<12.492<12.518\\ \\mathrm{mV}\\), temperature must lie between 258 and 259 °C. It is 0.031 mV above the lower entry within a 0.057 mV interval, slightly more than halfway through.",
          },
        ],
        math: "\\lambda=\\frac{12.492-12.461}{12.518-12.461}=\\frac{0.031}{0.057}\\approx0.54386",
      },
      {
        title: {
          id: "7. Interpolasi suhu",
          en: "7. Interpolate temperature",
        },
        body: [
          {
            id: "12.492 mV berada di antara 12.461 mV pada 258 °C dan 12.518 mV pada 259 °C. Selisihnya 0.031 mV dari titik bawah dalam interval 0.057 mV.",
            en: "12.492 mV lies between 12.461 mV at 258 °C and 12.518 mV at 259 °C. It is 0.031 mV above the lower entry in a 0.057 mV interval.",
          },
          {
            id: "Secara umum, \\(T=T_{\\mathrm{low}}+\\lambda(T_{\\mathrm{high}}-T_{\\mathrm{low}})\\). Di sini lebar intervalnya 1 °C, sehingga angka 0.54386 langsung menjadi tambahan derajat terhadap 258 °C.",
            en: "In general, \\(T=T_{\\mathrm{low}}+\\lambda(T_{\\mathrm{high}}-T_{\\mathrm{low}})\\). Here the interval is 1 °C, so 0.54386 is directly the number of degrees above 258 °C.",
          },
        ],
        math: "T=258+\\frac{12.492-12.461}{12.518-12.461}=258.5439^\\circ\\mathrm C",
      },
      {
        title: {
          id: "8. Cek hasil sebelum membulatkan",
          en: "8. Check the result before rounding",
        },
        body: [
          {
            id: "Hasil 258.5439 °C berada dalam interval tabel yang dipilih. Angka 5.5002% menjawab ketaklinieran pada 200 °C. Hasil 258.5439 °C menjawab pembacaan dengan referensi 25 °C. Kedua hasil menjawab bagian berbeda dan tidak saling mengoreksi.",
            en: "The 258.5439 °C result lies within the selected table interval. The 5.5002% value answers nonlinearity at 200 °C;258.5439 °C answers the reading with a 25 °C reference. They answer different subparts and require no further correction of one by the other.",
          },
        ],
      },
    ],
    answer: {
      id: "Ketaklinieran pada 200 °C ialah 5.50% skala penuh. Setelah koreksi sambungan dingin, suhu bejana sekitar 258.54 °C.",
      en: "Nonlinearity at 200 °C is 5.50% of full scale. After cold-junction correction, vessel temperature is about 258.54 °C.",
    },
    answerMath:
      "\\boxed{\\%N_{200}=5.50\\%\\ \\mathrm{FS},\\qquad T\\approx258.54^\\circ\\mathrm C}",
    assumptions: [
      {
        id: "Acuan ketaklinieran memakai garis dua ujung. Suhu sambungan ukur dianggap sama dengan suhu bejana. Nilai tegangan mengikuti tabel lampiran soal, tanpa mengganti pembulatannya.",
        en: "Nonlinearity uses an endpoint line. Measuring-junction temperature is assumed to equal vessel temperature. Voltages follow the exam appendix, retaining its rounding.",
      },
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
      caption: {
        id: "Tabel tipe T dan garis ideal menunjukkan ketaklinieran serta koreksi referensi.",
        en: "The Type T table and ideal line show nonlinearity and reference correction.",
      },
    },
    referencePages: [4, 24, 25, 26],
  },
  {
    id: "2025-uas-q5",
    year: 2025,
    exam: "uas",
    number: 5,
    topic: "flow",
    title: {
      id: "Orifis dengan manometer raksa",
      en: "Orifice with a mercury manometer",
    },
    source: {
      url: "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
      file: "2025-uas.pdf",
      pages: [2, 3],
    },
    originalLanguage: "en",
    original:
      "5. [20%] Flow Measurement System\na. [10%] Derive the equation for v1 as a function of the mercury (Hg) manometer height difference h, the density of mercury ρm, the density of the fluid ρf, and the ratio of cross-sectional diameters (d/D), as shown in Figure 1.\nb. [5%] For D = 300 mm, d = 180 mm, a mercury height difference of 100 mm, mercury density of 13,600 kg/m³, and fluid density of 900 kg/m³, determine the mass flow rate of the fluid flowing in the pipe (m³/s).\nc. [5%] Check whether the flow is laminar or turbulent.\nFigure 1: horizontal pipe, orifice, and differential mercury U-tube manometer. The discharge-coefficient table has Re columns 10⁴, 10⁵, 10⁶, 10⁷. At d/D = 0.6, Cd = 0.63, 0.610, 0.608, 0.608. Other rows d/D: 0.2 → 0.60, 0.595, 0.594, 0.594; 0.4 → 0.61, 0.603, 0.598, 0.598; 0.5 → 0.62, 0.608, 0.603, 0.603; 0.7 → 0.64, 0.614, 0.609, 0.609.\nUseful formulas: Re = ρvD/μ; Q = Av.",
    prompt: {
      id: "(a) Turunkan kecepatan pipa \\(v_1\\) dari beda tinggi raksa \\(h\\), massa jenis raksa \\(\\rho_m\\), massa jenis fluida \\(\\rho_f\\), dan rasio \\(d/D\\). (b) Gunakan \\(D=300\\ \\mathrm{mm}\\), \\(d=180\\ \\mathrm{mm}\\), \\(h=100\\ \\mathrm{mm}\\), \\(\\rho_m=13600\\ \\mathrm{kg/m^3}\\), dan \\(\\rho_f=900\\ \\mathrm{kg/m^3}\\) untuk menghitung aliran. Sumber menyebut “mass flow rate” dengan satuan \\(\\mathrm{m^3/s}\\); kita bedakan debit volume \\(Q\\) dan debit massa \\(\\dot m\\). (c) Periksa rezim aliran. Tabel \\(C_d\\) tersedia, tetapi viskositas tidak diberikan.",
      en: "(a) Derive pipe velocity \\(v_1\\) from mercury height difference \\(h\\), mercury density \\(\\rho_m\\), fluid density \\(\\rho_f\\), and \\(d/D\\). (b) Use \\(D=300\\ \\mathrm{mm}\\), \\(d=180\\ \\mathrm{mm}\\), \\(h=100\\ \\mathrm{mm}\\), \\(\\rho_m=13600\\ \\mathrm{kg/m^3}\\), and \\(\\rho_f=900\\ \\mathrm{kg/m^3}\\) to calculate flow. The source asks for “mass flow rate” in \\(\\mathrm{m^3/s}\\); distinguish volume flow \\(Q\\) from mass flow \\(\\dot m\\). (c) Check the flow regime. A \\(C_d\\) table is given, but viscosity is missing.",
    },
    steps: [
      {
        title: {
          id: "1. Pisahkan besaran yang dapat ditentukan dari data yang kurang",
          en: "1. Separate determined quantities from missing data",
        },
        body: [
          {
            id: "Data manometer cukup untuk mencari \\(\\Delta p\\), lalu Bernoulli memberi kecepatan ideal. Kita memerlukan \\(C_d\\) untuk mencari debit aktual. Namun, pemilihan \\(C_d\\) membutuhkan bilangan Reynolds, sedangkan bilangan Reynolds membutuhkan viskositas. Sumber tidak memberi viskositas. Kita akan menyatakan hasil aktual beserta syaratnya agar Anda dapat membedakan hasil pasti dan hasil bersyarat.",
            en: "The manometer data determine \\(\\Delta p\\), and Bernoulli gives ideal velocity. We need \\(C_d\\) to calculate actual flow. Choosing \\(C_d\\) requires Reynolds number, which requires viscosity. The source does not supply viscosity. We therefore state the conditions for actual-flow results, helping you separate determined results from conditional ones.",
          },
          {
            id: "Menemukan data yang kurang bukan alasan menghentikan semua hitungan. Kerjakan bagian yang dapat ditentukan, lalu tulis dengan jelas apa yang masih bergantung pada asumsi.",
            en: "Missing data do not prevent all calculation. Solve the determined parts, then state clearly which results still depend on an assumption.",
          },
        ],
      },
      {
        title: {
          id: "2. Ubah beda tinggi menjadi beda tekanan",
          en: "2. Convert height difference to pressure difference",
        },
        body: [
          {
            id: "Kedua pipa manometer berisi fluida ukur di atas raksa. Oleh karena itu, beda tekanan memakai selisih massa jenis, bukan massa jenis raksa saja. Ambil \\(h\\) positif ketika tekanan hulu lebih tinggi.",
            en: "Both manometer legs contain process fluid above the mercury. Therefore pressure difference uses the density difference, not mercury density alone. Take \\(h\\) as positive for higher upstream pressure.",
          },
          {
            id: "\\(\\rho_m=13600\\ \\mathrm{kg/m^3}\\) adalah massa jenis raksa dan \\(\\rho_f=900\\ \\mathrm{kg/m^3}\\) massa jenis fluida pipa. Kolom fluida pipa juga menyumbang tekanan hidrostatik, sehingga yang tersisa adalah selisih kedua massa jenis. Pakai \\(h=100\\ \\mathrm{mm}=0.100\\ \\mathrm m\\).",
            en: "\\(\\rho_m=13600\\ \\mathrm{kg/m^3}\\) is mercury density and \\(\\rho_f=900\\ \\mathrm{kg/m^3}\\) is pipe-fluid density. The pipe-fluid columns also contribute hydrostatic pressure, leaving the density difference. Use \\(h=100\\ \\mathrm{mm}=0.100\\ \\mathrm m\\).",
          },
        ],
        math: "\\Delta p=(\\rho_m-\\rho_f)gh=(13600-900)(9.81)(0.100)=12458.7\\ \\mathrm{Pa}",
      },
      {
        title: {
          id: "3. Ubah rasio diameter menjadi rasio luas",
          en: "3. Convert diameter ratio to area ratio",
        },
        body: [
          {
            id: "\\(D=0.300\\ \\mathrm m\\) dan \\(d=0.180\\ \\mathrm m\\), sehingga \\(\\beta=0.6\\). Kontinuitas untuk fluida tak termampatkan memberi debit sama di kedua penampang. Luas kecil sama dengan 0.36 kali luas pipa. Oleh karena itu, kecepatannya \\(1/0.36\\) kali kecepatan pipa.",
            en: "\\(D=0.300\\ \\mathrm m\\) and \\(d=0.180\\ \\mathrm m\\), so \\(\\beta=0.6\\). Incompressible continuity gives equal flow through both sections. Since the smaller area is 0.36 of pipe area, its velocity is \\(1/0.36\\) times pipe velocity.",
          },
        ],
        math: "\\frac{A_2}{A_1}=\\beta^2=0.36,\\qquad A_1v_1=A_2v_2\\quad\\Rightarrow\\quad v_2=\\frac{v_1}{\\beta^2}",
      },
      {
        title: {
          id: "4. Susun Bernoulli dalam kecepatan pipa yang diminta",
          en: "4. Write Bernoulli in terms of the requested pipe velocity",
        },
        body: [
          {
            id: "Pada elevasi sama, \\(\\Delta p=\\rho_f(v_2^2-v_1^2)/2\\) untuk model ideal. Ganti \\(v_2\\) dengan \\(v_1/\\beta^2\\). Dengan begitu, hanya \\(v_1\\) yang belum diketahui.",
            en: "At equal elevation, \\(\\Delta p=\\rho_f(v_2^2-v_1^2)/2\\) for the ideal model. Replace \\(v_2\\) with \\(v_1/\\beta^2\\), leaving only \\(v_1\\) unknown.",
          },
        ],
        math: "\\Delta p=\\frac{\\rho_f}{2}\\left(\\frac{v_{1,i}^2}{\\beta^4}-v_{1,i}^2\\right)=\\frac{\\rho_f v_{1,i}^2}{2}(\\beta^{-4}-1)",
      },
      {
        title: {
          id: "5. Gabungkan kontinuitas dan Bernoulli",
          en: "5. Combine continuity and Bernoulli",
        },
        body: [
          {
            id: "Tuliskan \\(\\beta=d/D\\). Kontinuitas memberi \\(v_2=v_1/\\beta^2\\). Masukkan ke Bernoulli pada elevasi sama, kemudian keluarkan \\(v_1\\) dari tanda akar. Kecepatan ini masih ideal karena kita belum memasukkan koreksi debit.",
            en: "Write \\(\\beta=d/D\\). Continuity gives \\(v_2=v_1/\\beta^2\\). Insert this into equal-elevation Bernoulli and solve for \\(v_1\\). The velocity remains ideal until we apply the discharge correction.",
          },
          {
            id: "Untuk memperoleh bentuk akhir, gunakan \\(\\beta^{-4}-1=(1-\\beta^4)/\\beta^4\\) dan \\(\\sqrt{\\beta^4}=\\beta^2\\) karena diameter positif. Itu menjelaskan faktor \\(\\beta^2\\) di depan akar.",
            en: "To obtain the final form, use \\(\\beta^{-4}-1=(1-\\beta^4)/\\beta^4\\) and \\(\\sqrt{\\beta^4}=\\beta^2\\) for positive diameters. The simplification gives the factor \\(\\beta^2\\) outside the square root.",
          },
        ],
        math: "(\\rho_m-\\rho_f)gh=\\frac12\\rho_fv_{1,i}^{\\,2}(\\beta^{-4}-1)\\\\v_{1,i}=\\beta^2\\sqrt{\\frac{2gh(\\rho_m/\\rho_f-1)}{1-\\beta^4}},\\qquad v_{1,\\mathrm{actual}}=C_dv_{1,i}",
        table: {
          headers: [
            {
              id: "d/D",
              en: "d/D",
            },
            {
              id: "Re = 10⁴",
              en: "Re = 10⁴",
            },
            {
              id: "Re = 10⁵",
              en: "Re = 10⁵",
            },
            {
              id: "Re = 10⁶",
              en: "Re = 10⁶",
            },
            {
              id: "Re = 10⁷",
              en: "Re = 10⁷",
            },
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
      {
        title: {
          id: "6. Masukkan angka untuk kecepatan ideal",
          en: "6. Substitute the values for ideal velocity",
        },
        body: [
          {
            id: "Pakai massa jenis fluida pipa di penyebut energi kinetik. Raksa hanya berperan dalam mengubah tinggi manometer menjadi beda tekanan. Hasil ini belum dikalikan koefisien debit.",
            en: "Use pipe-fluid density in the kinetic-energy denominator. Mercury is used only to convert manometer height into pressure difference. This result has not yet been multiplied by the discharge coefficient.",
          },
        ],
        math: "v_{1,i}=0.6^2\\sqrt{\\frac{2(9.81)(0.100)(13600/900-1)}{1-0.6^4}}=2.03036\\ \\mathrm{m/s}",
      },
      {
        title: {
          id: "7. Hitung nilai ideal yang sudah dapat ditentukan",
          en: "7. Calculate the ideal values that are determined",
        },
        body: [
          {
            id: "Rasio diameter ialah 0.6. Luas pipa berasal dari diameter 0.300 m. Kalikan luas dengan kecepatan untuk memperoleh debit volume, lalu kalikan dengan massa jenis untuk debit massa.",
            en: "The diameter ratio is 0.6. Pipe area uses the 0.300 m diameter. Multiply area by velocity for volume flow, then by density for mass flow.",
          },
          {
            id: "Kecepatan yang kita hitung milik pipa besar, jadi kalikan dengan \\(A_1\\), bukan \\(A_2\\). Mengalikan \\(v_1\\) dengan luas kecil akan menggabungkan dua penampang yang berbeda dan menghasilkan debit salah.",
            en: "The velocity calculated belongs to the large pipe, so multiply it by \\(A_1\\), not \\(A_2\\). Combining \\(v_1\\) with the small area mixes different sections and gives the wrong flow.",
          },
        ],
        math: "v_{1,i}=2.03036\\ \\mathrm{m/s},\\quad A_1=\\frac{\\pi(0.300)^2}{4}=0.0706858\\ \\mathrm{m^2}\\\\Q_i=A_1v_{1,i}=0.143518\\ \\mathrm{m^3/s},\\quad \\dot m_i=900Q_i=129.166\\ \\mathrm{kg/s}",
      },
      {
        title: {
          id: "8. Pisahkan hasil aktual dari asumsi Cd",
          en: "8. Separate actual flow from the coefficient assumption",
        },
        body: [
          {
            id: "Untuk hasil aktual, \\(Q=C_dQ_i\\). Namun, tabel memilih \\(C_d\\) dari Reynolds, sedangkan Reynolds memerlukan viskositas. Sumber tidak memberi viskositas. Oleh karena itu, kita belum dapat memilih satu nilai aktual yang unik. Jangan mengambil viskositas dari soal lain.",
            en: "Actual flow is \\(Q=C_dQ_i\\). However, the table chooses \\(C_d\\) from Reynolds number, which requires viscosity. Since viscosity is absent, no unique actual flow is determined. Do not import viscosity from another question.",
          },
          {
            id: "Tabel skenario menunjukkan akibat beberapa pilihan Cd, bukan tiga jawaban yang sama-sama telah dibuktikan. Setiap baris memerlukan kondisi Reynolds yang sesuai; data yang kurang mencegah kita memilih satu baris secara pasti.",
            en: "The scenario table shows the consequences of different Cd choices, not three independently established answers. Each row requires a matching Reynolds condition; missing data prevent a unique choice.",
          },
        ],
        math: "Q=0.143518C_d\\ \\mathrm{m^3/s},\\qquad \\dot m=129.166C_d\\ \\mathrm{kg/s}",
        table: {
          headers: [
            {
              id: "Asumsi Cd",
              en: "Assumed Cd",
            },
            {
              id: "Q (m³/s)",
              en: "Q (m³/s)",
            },
            {
              id: "ṁ (kg/s)",
              en: "ṁ (kg/s)",
            },
          ],
          rows: [
            ["0.630 (Re = 10⁴)", "0.090416", "81.375"],
            ["0.610 (Re = 10⁵)", "0.087546", "78.791"],
            ["0.608 (Re ≥ 10⁶ pada tabel / in table)", "0.087259", "78.533"],
          ],
        },
      },
      {
        title: {
          id: "9. Tulis pemeriksaan Reynolds secara bersyarat",
          en: "9. State the Reynolds check conditionally",
        },
        body: [
          {
            id: "Dengan \\(\\mu\\) dalam \\(\\mathrm{Pa\\,s}\\), persamaan di bawah memberi Reynolds aktual. Rezim pipa biasanya laminar di bawah sekitar 2300, transisi sekitar 2300 sampai 4000, dan turbulen di atas sekitar 4000. Tanpa \\(\\mu\\), pilihannya tidak bisa dipastikan.",
            en: "With \\(\\mu\\) in \\(\\mathrm{Pa\\,s}\\), the expression below gives actual Reynolds number. Pipe flow is commonly treated as laminar below about 2300, transitional around 2300 to 4000, and turbulent above about 4000. Without \\(\\mu\\), the regime cannot be established.",
          },
          {
            id: "Rumus ini memakai \\(v_{1,\\mathrm{actual}}=C_dv_{1,i}\\). Menyatakan aliran turbulen hanya dari nilai beda tekanan tidak cukup, karena viskositas juga mengatur rasio gaya inersia terhadap gaya viskos.",
            en: "This expression uses \\(v_{1,\\mathrm{actual}}=C_dv_{1,i}\\). Pressure difference alone cannot establish turbulent flow, because viscosity also controls the ratio of inertial to viscous effects.",
          },
        ],
        math: "Re_D=\\frac{900(2.03036C_d)(0.300)}{\\mu}=\\frac{548.197C_d}{\\mu}",
        note: {
          id: "Jika sengaja memakai Cd = 0.608, Re = 333.304/μ. Syarat Re ≥ 10⁶ untuk kolom itu menuntut μ ≤ 3.333 × 10⁻⁴ Pa·s. Jadi pemilihan kolom harus dicek, bukan diasumsikan dari bentuk gambar.",
          en: "If Cd = 0.608 is deliberately assumed, Re = 333.304/μ. The Re ≥ 10⁶ table column then requires μ ≤ 3.333 × 10⁻⁴ Pa·s. The selected column needs a consistency check; the drawing alone does not establish it.",
        },
      },
      {
        title: {
          id: "10. Periksa satu pilihan Cd tanpa menganggapnya data baru",
          en: "10. Check one Cd choice without treating it as new data",
        },
        body: [
          {
            id: "Jika seseorang memilih \\(C_d=0.608\\) dari kolom Reynolds tinggi, model memberi \\(Re_D=333.304/\\mu\\). Syarat \\(Re_D\\ge10^6\\) hanya terpenuhi jika \\(\\mu\\le3.333\\times10^{-4}\\ \\mathrm{Pa\\,s}\\). Soal tidak mengatakan syarat ini terpenuhi.",
            en: "If \\(C_d=0.608\\) is chosen from the high-Reynolds column, the model gives \\(Re_D=333.304/\\mu\\). To match \\(Re_D\\ge10^6\\), viscosity must satisfy \\(\\mu\\le3.333\\times10^{-4}\\ \\mathrm{Pa\\,s}\\). The question does not establish this condition.",
          },
        ],
      },
      {
        title: {
          id: "11. Laporkan satuan dan data yang masih diperlukan",
          en: "11. Report units and the missing datum",
        },
        body: [
          {
            id: "m³/s menyatakan debit volume; kg/s menyatakan debit massa. Kita sudah dapat melaporkan hasil ideal dan hubungan terhadap Cd. Nilai viskositas atau Cd yang ditetapkan perlu ditambahkan untuk menutup bagian aktual; viskositas juga diperlukan untuk memutuskan laminar atau turbulen.",
            en: "m³/s denotes volume flow; kg/s denotes mass flow. We can already report ideal flow and the relation to Cd. A viscosity value or specified Cd is needed for a unique actual flow; viscosity is also needed to classify the flow regime.",
          },
          {
            id: "Pemeriksaan fisik: untuk \\(0<C_d<1\\), debit aktual lebih kecil daripada debit ideal. Jika suatu substitusi menghasilkan kebalikannya tanpa model tambahan, periksa kembali letak \\(C_d\\) dan luas yang dipakai.",
            en: "Physical check: for \\(0<C_d<1\\), actual flow is smaller than ideal flow. If substitution gives the opposite without an additional model, recheck the position of \\(C_d\\) and the area used.",
          },
        ],
      },
    ],
    answer: {
      id: "Debit ideal 0.143518 m³/s dan 129.166 kg/s. Debit aktual adalah 0.143518 Cd m³/s dan 129.166 Cd kg/s. Viskositas yang hilang membuat Cd aktual dan rezim aliran belum dapat ditentukan secara unik.",
      en: "Ideal flow is 0.143518 m³/s and 129.166 kg/s. Actual flow is 0.143518 Cd m³/s and 129.166 Cd kg/s. Missing viscosity prevents a unique actual Cd and flow-regime determination.",
    },
    answerMath:
      "\\boxed{\\begin{aligned}v_{1,i}&=\\beta^2\\sqrt{\\frac{2gh(\\rho_m/\\rho_f-1)}{1-\\beta^4}}\\\\Q&=0.143518C_d\\ \\mathrm{m^3/s}\\\\\\dot m&=129.166C_d\\ \\mathrm{kg/s}\\end{aligned}}",
    assumptions: [
      {
        id: "Aliran tunak tak termampatkan, titik ukur setinggi sama, g = 9.81 m/s². Kita memakai d sebagai diameter bukaan efektif pada metode Cd, sesuai konvensi soal orifis lain. Diameter vena contracta nyata memerlukan model koefisien yang konsisten.",
        en: "Steady incompressible flow, equal tap elevations, and g = 9.81 m/s². Following the course orifice convention, d is used as the effective aperture diameter in the Cd method; an actual vena-contracta diameter requires a consistent coefficient model.",
      },
      {
        id: "Rentang hasil tabel Cd bukan batas universal: tabel hanya memuat Re 10⁴ sampai 10⁷. Sumber tidak memberi μ; angka Cd hanya skenario, bukan hasil terverifikasi untuk fluida ini.",
        en: "The tabulated Cd flow range is not a universal bound: the table only covers Re 10⁴ to 10⁷. The source omits μ, so the listed Cd cases are scenarios, not verified properties of this fluid.",
      },
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
      caption: {
        id: "Manometer memberi beda tekanan. Nilai awal menampilkan model ideal Cd = 1; koreksi aktual perlu data tambahan.",
        en: "The manometer gives pressure difference. Initial values show the ideal Cd = 1 model; actual correction requires more data.",
      },
    },
    referencePages: [7, 9, 10],
  },
  {
    id: "2025-uas-q6",
    year: 2025,
    exam: "uas",
    number: 6,
    topic: "dynamics",
    title: {
      id: "Batas frekuensi dan sensitivitas silang",
      en: "Frequency limits and cross-axis sensitivity",
    },
    source: {
      url: "https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view",
      file: "2025-uas.pdf",
      pages: [3],
    },
    originalLanguage: "en",
    original:
      "6. [15%] Dynamic Characteristic of Measurement System\nFigure 2 depicts the sensitivity of a piezoelectric accelerometer. Suppose its sensitivity is 100 mV/g and it is valid over a frequency range from 1 to 10,000 Hz.\na. [5%] What happens to the sensor sensitivity if we operate it at a frequency of 0.5 Hz?\nb. [5%] What happens to the sensor sensitivity if we operate it at a frequency above 10,000 Hz (for example, at 25,000 Hz)?\nc. [5%] What is meant by cross-sensitivity of an accelerometer? If the cross-sensitivity of this accelerometer is 5 mV/g, what does it mean?\nFigure 2: normalized magnitude and phase response; low-frequency attenuation, approximately flat intermediate response, a high-frequency resonance peak, then roll-off. The horizontal graph axis is labelled ω.",
    prompt: {
      id: "Akselerometer piezoelektrik memiliki sensitivitas nominal \\(100\\ \\mathrm{mV/g}\\), yang berlaku pada rentang \\(1\\) hingga \\(10000\\ \\mathrm{Hz}\\). Kurva sumber menunjukkan penurunan di frekuensi rendah, daerah datar, puncak resonansi, lalu penurunan di frekuensi tinggi.\n(a) Apa yang terjadi pada \\(0.5\\ \\mathrm{Hz}\\)? (b) Apa yang terjadi di atas \\(10000\\ \\mathrm{Hz}\\), misalnya \\(25000\\ \\mathrm{Hz}\\)? (c) Apa arti sensitivitas silang \\(5\\ \\mathrm{mV/g}\\)?",
      en: "A piezoelectric accelerometer has nominal sensitivity \\(100\\ \\mathrm{mV/g}\\), valid from \\(1\\) to \\(10000\\ \\mathrm{Hz}\\). The source response shows low-frequency attenuation, a flat band, a resonance peak, then high-frequency roll-off.\n(a) What happens at \\(0.5\\ \\mathrm{Hz}\\)? (b) What happens above \\(10000\\ \\mathrm{Hz}\\), for example \\(25000\\ \\mathrm{Hz}\\)? (c) What does a cross-axis sensitivity of \\(5\\ \\mathrm{mV/g}\\) mean?",
    },
    steps: [
      {
        title: {
          id: "1. Pakai sensitivitas nominal hanya dalam rentangnya",
          en: "1. Use nominal sensitivity within its valid band",
        },
        body: [
          {
            id: "Kita memakai sensitivitas untuk menghubungkan percepatan dengan tegangan. **Sensitivitas** (perubahan keluaran per satuan masukan) sebesar \\(100\\ \\mathrm{mV/g}\\) memberi sekitar 100 mV untuk percepatan 1 g. Nilai ini berlaku pada sumbu ukur dan rentang frekuensi yang dinyatakan. Satuan g berarti percepatan gravitasi standar, bukan gram.",
            en: "We use sensitivity to connect acceleration with voltage. **Sensitivity** is output change per unit input; \\(100\\ \\mathrm{mV/g}\\) gives about 100 mV for 1 g of acceleration. The value applies along the sensing axis within the stated frequency band. Here g means standard gravitational acceleration, not grams.",
          },
          {
            id: "Angka sensitivitas perlu dibaca bersama rentang frekuensinya. Spesifikasi soal menetapkan rentang 1 sampai 10000 Hz. Kita memakai sensitivitas 100 mV/g dalam rentang tersebut, bukan untuk setiap gerak.",
            en: "Read sensitivity together with its frequency range. The 1 to 10000 Hz specification identifies where conversion using 100 mV/g is supported by the question, not a promise for all motion.",
          },
        ],
        math: "V_{\\mathrm{out}}\\approx Sa,\\qquad S=100\\ \\mathrm{mV/g},\\quad 1g\\approx9.80665\\ \\mathrm{m/s^2}",
      },
      {
        title: {
          id: "2. Pisahkan kesalahan amplitudo, fase, dan arah",
          en: "2. Separate amplitude, phase, and direction errors",
        },
        body: [
          {
            id: "Untuk getaran sinus, sensor dapat mengubah besar sinyal dan menggeser waktunya. Selain itu, percepatan dari sumbu lain dapat ikut terbaca. Soal menguji tiga hal ini melalui frekuensi rendah, frekuensi tinggi, dan sensitivitas silang.",
            en: "For sinusoidal vibration, a sensor can change signal magnitude and shift its timing. Acceleration on another axis can also enter the reading. The question probes these effects through low frequency, high frequency, and cross-axis sensitivity.",
          },
        ],
      },
      {
        title: {
          id: "3. Jelaskan respons pada 0.5 Hz",
          en: "3. Explain the response at 0.5 Hz",
        },
        body: [
          {
            id: "0.5 Hz berada di bawah batas 1 Hz. Muatan piezoelektrik dan rangkaian pembacanya tidak mempertahankan respons terhadap perubahan yang sangat lambat. Keluaran melemah, sehingga sensitivitas efektif lebih kecil dari nominal dan fase dapat berubah. Nilai tepat tidak tersedia dari data soal.",
            en: "0.5 Hz lies below the 1 Hz lower limit. The piezoelectric charge and readout circuit do not maintain response to very slow changes. Output attenuates, so effective sensitivity drops below nominal and phase may shift. The question does not specify its exact value.",
          },
          {
            id: "Piezoelektrik menghasilkan muatan ketika gaya berubah, tetapi jalur kebocoran dan rangkaian pembaca membuat respons sangat lambat sulit dipertahankan. Oleh karena itu, alat ini bukan pilihan langsung untuk membaca percepatan konstan tanpa batas waktu.",
            en: "Piezoelectric sensing generates charge under changing force, but leakage paths and readout circuitry make very slow responses hard to sustain. It is therefore not a direct choice for indefinitely measuring constant acceleration.",
          },
        ],
      },
      {
        title: {
          id: "4. Bandingkan respons tinggi dengan bagian datar kurva",
          en: "4. Compare high-frequency response with the flat region",
        },
        body: [
          {
            id: "Di bagian datar, penguatan relatif mendekati nilai nominal. Mendekati resonansi mekanik, gerak internal dapat membesar dan menghasilkan puncak keluaran. Batas 10 kHz memberi tahu kapan kita harus berhenti menganggap sensitivitas nominal tetap berlaku.",
            en: "In the flat region, relative gain stays near nominal. Near mechanical resonance, internal motion can grow and produce an output peak. The 10 kHz limit tells us when to stop assuming the nominal sensitivity remains valid.",
          },
        ],
      },
      {
        title: {
          id: "5. Bedakan daerah resonansi dan daerah setelahnya",
          en: "5. Distinguish resonance from the region beyond it",
        },
        body: [
          {
            id: "Di atas 10 kHz, sensitivitas tidak lagi terjamin 100 mV/g. Pada bagian kurva yang mendekati resonansi, keluaran membesar sehingga percepatan tampak terlalu tinggi jika dibagi sensitivitas nominal. Jauh setelah resonansi, keluaran kembali turun. Jadi, jangan menyatakan semua frekuensi di atas 10 kHz selalu menaikkan keluaran.",
            en: "Above 10 kHz, the 100 mV/g sensitivity is no longer guaranteed. Approaching resonance, output rises and dividing by nominal sensitivity overestimates acceleration. Far beyond resonance, output falls again. Thus not every frequency above 10 kHz increases the output.",
          },
          {
            id: "Contoh 25 kHz berada di luar pita yang valid. Kurva memakai \\(\\omega\\), sehingga ubah dahulu: \\(\\omega=2\\pi f\\). Kurva kualitatif mengisyaratkan pengaruh resonansi, tetapi tidak memberi angka sensitivitas yang cukup pasti untuk dihitung.",
            en: "The 25 kHz example is outside the valid band. The plot uses \\(\\omega\\), so first convert with \\(\\omega=2\\pi f\\). The qualitative curve suggests resonance effects but does not provide a sufficiently precise numerical sensitivity.",
          },
          {
            id: "Tanpa titik kalibrasi atau fungsi transfer yang lengkap, jangan mengambil satu angka penguatan dari bentuk kurva kualitatif. Jawaban yang didukung data adalah arah kecenderungan dan status di luar rentang, bukan koreksi numerik pasti.",
            en: "Without calibration points or a complete transfer function, do not infer a precise gain from a qualitative curve. The data support a trend and an out-of-range judgment, not an exact numerical correction.",
          },
        ],
        math: "f=25000\\ \\mathrm{Hz}\\quad\\Longrightarrow\\quad\\omega=2\\pi f\\approx1.571\\times10^5\\ \\mathrm{rad/s}",
      },
      {
        title: {
          id: "6. Gunakan satuan frekuensi yang sama sebelum membandingkan",
          en: "6. Use matching frequency units before comparing",
        },
        body: [
          {
            id: "Hz menghitung siklus per detik, sedangkan rad/s menghitung sudut fase per detik. Satu siklus mengandung \\(2\\pi\\) radian. Jadi, angka 25000 Hz tidak boleh ditempatkan langsung di posisi 25000 pada sumbu \\(\\omega\\).",
            en: "Hertz counts cycles per second; rad/s counts phase angle per second. One cycle contains \\(2\\pi\\) radians. Thus 25000 Hz cannot be placed directly at 25000 on an \\(\\omega\\) axis.",
          },
        ],
        math: "\\omega=2\\pi f,\\qquad f=\\frac{\\omega}{2\\pi}",
      },
      {
        title: {
          id: "7. Tafsirkan sensitivitas silang",
          en: "7. Interpret cross-axis sensitivity",
        },
        body: [
          {
            id: "Sensitivitas silang ialah respons terhadap percepatan yang tegak lurus sumbu ukur utama. Nilai 5 mV/g berarti percepatan 1 g pada sumbu melintang dapat menambah sekitar 5 mV pada keluaran. Jika kita menganggap semua keluaran berasal dari sumbu utama, ini setara galat terbaca 0.05 g.",
            en: "Cross-axis sensitivity is response to acceleration perpendicular to the main sensing axis. A value of 5 mV/g means 1 g transverse acceleration can contribute about 5 mV to the output. If all output is attributed to the main axis, this appears as 0.05 g of acceleration.",
          },
          {
            id: "Konversi 0.05 g adalah pembacaan semu pada sumbu utama jika seluruh 5 mV dianggap berasal dari sensitivitas utama. Sensor tidak sedang menyatakan percepatan melintang 0.05 g; masukan melintangnya tetap 1 g dalam contoh ini.",
            en: "The 0.05 g is an apparent main-axis reading obtained by treating all 5 mV as main-axis output. The actual transverse input in this example remains 1 g, not 0.05 g.",
          },
        ],
        math: "\\frac{S_{\\perp}}{S_{\\parallel}}\\,100\\%=\\frac5{100}\\,100\\%=5\\%,\\qquad a_{\\mathrm{apparent}}=\\frac{5\\ \\mathrm{mV}}{100\\ \\mathrm{mV/g}}=0.05g",
      },
      {
        title: {
          id: "8. Hubungkan hasil dengan keputusan pengukuran",
          en: "8. Connect the findings to measurement choices",
        },
        body: [
          {
            id: "Untuk mengurangi galat, pilih sensor dengan rentang frekuensi yang mencakup sinyal, pasang sumbu ukurnya dengan benar, dan cek gerak melintang. Kalibrasi sensitivitas tunggal tidak mengatasi semua galat bila frekuensi atau arah pemakaian berubah.",
            en: "To reduce error, choose a sensor whose range covers the signal, align the measurement axis, and check transverse motion. A single sensitivity calibration cannot correct every error when frequency or direction changes.",
          },
        ],
      },
    ],
    answer: {
      id: "Pada 0.5 Hz, respons melemah. Pada 25 kHz, nilai nominal tidak berlaku dan pengaruh resonansi dapat memperbesar bacaan; angka tepat tidak diberikan. Sensitivitas silang 5 mV/g berarti respons melintang 5% dari sensitivitas sumbu utama.",
      en: "At 0.5 Hz, the response attenuates. At 25 kHz, nominal sensitivity is invalid and resonance may amplify the reading; no exact value is given. Cross-axis sensitivity of 5 mV/g is 5% of main-axis sensitivity.",
    },
    answerMath:
      "\\boxed{S_{\\perp}/S_{\\parallel}=5\\%,\\qquad 1g_{\\perp}\\ \\Rightarrow\\ 0.05g\\ \\text{apparent}}",
    assumptions: [
      {
        id: "Kurva sumber bersifat kualitatif dan sumbunya memakai rad/s. Jangan membaca angka sumbu ω sebagai Hz. Tidak ada frekuensi alami, redaman, atau parameter rangkaian yang cukup untuk menghitung sensitivitas tepat di luar pita.",
        en: "The source curve is qualitative and its horizontal axis uses rad/s. Do not read ω-axis values as Hz. Natural frequency, damping, and circuit parameters needed for exact out-of-band sensitivity are not given.",
      },
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
      caption: {
        id: "Kurva menjelaskan daerah kerja dan resonansi secara kualitatif; bukan kalibrasi numerik tambahan.",
        en: "The curve explains the usable band and resonance qualitatively; it is not additional numerical calibration data.",
      },
    },
    referencePages: [18, 19],
  },
];

export const practice2025: PracticeQuestion[] = [
  {
    id: "concept-2025-01",
    topic: "statistics",
    difficulty: "reasoning",
    prompt: {
      id: "Sebuah sistem tekanan memberi hasil berulang yang rapat, tetapi semuanya lebih rendah dari acuan. Pemeriksaan menemukan penguatan recorder terlalu kecil. Tindakan mana yang paling tepat untuk memperbaiki masalah utama?",
      en: "A pressure system gives tightly clustered repeat readings, all below the reference. Inspection finds that the recorder gain is too low. Which action best addresses the main problem?",
    },
    options: [
      {
        id: "Ambil lebih banyak pengulangan lalu pakai rata-ratanya tanpa mengubah recorder.",
        en: "Take more repeats and use their mean without changing the recorder.",
      },
      {
        id: "Perbesar resolusi layar agar penyimpangan rata-rata hilang.",
        en: "Increase display resolution so the mean deviation disappears.",
      },
      {
        id: "Perbaiki penguatan recorder, lalu kalibrasi ulang hubungan masukan dan keluaran.",
        en: "Correct the recorder gain, then recalibrate the input and output relation.",
      },
      {
        id: "Nyatakan sistem sudah akurat karena hasil pengulangannya rapat.",
        en: "Declare the system accurate because its repeat readings are tightly clustered.",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Hasil yang rapat menunjukkan sebaran acak kecil, tetapi tidak menjamin rata-ratanya benar. Penguatan recorder yang salah memberi galat sistematis yang tetap pada hubungan masukan dan keluaran. Perbaiki penyebabnya dan kalibrasi lagi; pengulangan tambahan hanya membantu menaksir rata-rata yang masih bias.",
      en: "Tight clustering indicates small random spread, but does not establish a correct mean. Incorrect recorder gain produces a systematic error in the input and output relation. Correct the cause and recalibrate; additional repeats only estimate the still-biased mean more precisely.",
    },
    optionExplanations: [
      {
        id: "Pengulangan dapat memperkecil ketidakpastian rata-rata akibat galat acak, tetapi tidak menghapus gain yang salah.",
        en: "Repeats can reduce random uncertainty in the mean, but cannot remove an incorrect gain.",
      },
      {
        id: "Resolusi mengatur langkah tampilan. Ia tidak memperbaiki pemetaan masukan dan keluaran yang salah.",
        en: "Resolution controls the display step. It does not correct a faulty input and output mapping.",
      },
      {
        id: "Tepat. Tindakan ini menargetkan penyebab bias, lalu memeriksa hubungan setelah penyetelan.",
        en: "Correct. This targets the bias source and checks the relation after adjustment.",
      },
      {
        id: "Hasil rapat menunjukkan presisi, bukan bukti bebas bias. Akurasi tetap perlu dibandingkan dengan acuan.",
        en: "Tight clustering indicates precision, not freedom from bias. Accuracy still requires comparison with a reference.",
      },
    ],
    sourceQuestionId: "2025-uts1-q2",
  },
  {
    id: "concept-2025-02",
    topic: "temperature",
    difficulty: "reasoning",
    prompt: {
      id: "Anda menyambung kawat tembaga ke sepasang kawat termokopel melalui dua terminal. Kedua terminal berada pada suhu yang sama. Mengapa sambungan tambahan itu dapat dipakai tanpa menambah tegangan bersih pada model ideal?",
      en: "You connect copper wires to a thermocouple pair through two terminals. Both terminals remain at the same temperature. Why can these added connections introduce no extra net voltage in the ideal model?",
    },
    options: [
      {
        id: "Setiap logam ketiga selalu menghapus seluruh tegangan termokopel, pada suhu berapa pun.",
        en: "Every third metal cancels the entire thermocouple voltage at any temperature.",
      },
      {
        id: "Tahanan kawat tembaga yang kecil menjamin kedua sambungan tidak pernah menghasilkan tegangan termal.",
        en: "Low copper resistance guarantees that neither connection can generate thermal voltage.",
      },
      {
        id: "Sambungan tambahan menghapus kebutuhan mengetahui suhu referensi termokopel.",
        en: "The added connections eliminate the need to know the thermocouple reference temperature.",
      },
      {
        id: "Pengaruh pasangan sambungan logam tambahan saling menghapus jika keduanya bersuhu sama; perbedaan suhu terminal dapat menambah galat.",
        en: "The added junction pair has cancelling contributions when both junctions share a temperature; a terminal temperature difference can add error.",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Hukum logam antara mengizinkan logam tambahan jika pasangan sambungannya berada pada suhu yang sama. Syarat suhu yang sama membuat kontribusi tambahan saling menghapus. Kompensasi suhu referensi tetap diperlukan jika tabel memakai referensi yang berbeda.",
      en: "The law of intermediate metals permits an added metal when the two resulting junctions share the same temperature. Equal junction temperatures make their added contributions cancel. Reference compensation is still required when the table uses a different reference temperature.",
    },
    optionExplanations: [
      {
        id: "Logam tambahan tidak menghapus tegangan ukur seluruh termokopel. Pembatalan hanya berlaku pada kontribusi tambahannya dan memerlukan pasangan sambungan bersuhu sama.",
        en: "An added metal does not cancel the whole measuring voltage. Cancellation concerns the added contributions and requires equal junction temperatures.",
      },
      {
        id: "Tahanan rendah membantu mengurangi jatuh tegangan listrik, tetapi tidak menjamin pembatalan tegangan akibat suhu. Syarat penting di sini ialah suhu kedua terminal yang sama.",
        en: "Low resistance can reduce electrical voltage drop, but does not ensure thermal-voltage cancellation. The key condition here is equal terminal temperatures.",
      },
      {
        id: "Pembatalan sambungan tambahan tidak mengubah suhu referensi yang dipakai tabel. Referensi tetap harus diketahui dan dikompensasi bila perlu.",
        en: "Cancellation at added connections does not change the table reference. You still need to know and, when needed, compensate the reference temperature.",
      },
      {
        id: "Tepat. Pernyataan ini menyebut mekanisme pembatalan serta syarat suhu yang harus dijaga.",
        en: "Correct. The statement identifies both cancellation and the temperature condition that makes it valid.",
      },
    ],
    sourceQuestionId: "2025-uts2-q2",
  },
  {
    id: "concept-2025-03",
    topic: "dynamics",
    difficulty: "reasoning",
    prompt: {
      id: "Sensor gaya menghasilkan gelombang sinus dengan amplitudo hampir sama seperti acuan, tetapi puncaknya muncul lebih lambat. Sistem akan dipakai untuk membandingkan waktu kejadian dengan sensor lain. Kesimpulan mana yang tepat?",
      en: "A force sensor produces a sinusoid with nearly the same amplitude as the reference, but its peaks occur later. It will be used to compare event timing with another sensor. Which conclusion is sound?",
    },
    options: [
      {
        id: "Respons amplitudo dan fase perlu dinilai terpisah; keterlambatan dapat mengganggu perbandingan waktu meskipun amplitudo cukup baik.",
        en: "Amplitude and phase responses need separate assessment; delay can distort timing comparisons even when amplitude is adequate.",
      },
      {
        id: "Amplitudo yang hampir sama membuktikan beda fase juga hampir nol.",
        en: "Nearly equal amplitudes prove that phase difference is also nearly zero.",
      },
      {
        id: "Keterlambatan boleh diabaikan karena kalibrasi dinamik hanya menilai besar sinyal.",
        en: "The delay can be ignored because dynamic calibration assesses only magnitude.",
      },
      {
        id: "Puncak yang terlambat selalu berarti polaritas sensor terbalik.",
        en: "Later peaks always mean the sensor polarity is reversed.",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Respons sinus memiliki dua informasi: perbandingan amplitudo dan beda fase. Sensor dapat mempertahankan amplitudo dengan cukup baik sambil tetap memberi keterlambatan fase yang berarti. Untuk menghubungkan peristiwa dari dua sensor, kedua respons perlu diketahui pada frekuensi yang dipakai.",
      en: "Sinusoidal response has two aspects: amplitude ratio and phase difference. A sensor may preserve amplitude reasonably well while still introducing substantial phase lag. Linking events from two sensors requires both responses at the operating frequency.",
    },
    optionExplanations: [
      {
        id: "Tepat. Kecocokan amplitudo tidak cukup untuk menjamin kecocokan waktu.",
        en: "Correct. Amplitude agreement alone does not guarantee timing agreement.",
      },
      {
        id: "Besar penguatan tidak menentukan fase secara langsung pada satu titik pengukuran.",
        en: "Gain magnitude at one measurement point does not directly establish phase.",
      },
      {
        id: "Kalibrasi dinamik juga menilai fase atau waktu tanggap; keduanya penting untuk urutan kejadian.",
        en: "Dynamic calibration also assesses phase or response time, which matter for event sequence.",
      },
      {
        id: "Pembalikan polaritas memberi pergeseran tertentu, tetapi keterlambatan umum dapat berasal dari respons dinamik biasa.",
        en: "Polarity reversal produces a particular shift, but general lag can arise from ordinary dynamic response.",
      },
    ],
    sourceQuestionId: "2025-uts1-q3",
  },
  {
    id: "concept-2025-04",
    topic: "strain",
    difficulty: "reasoning",
    prompt: {
      id: "Dua gauge D dipasang melintang dan merekat pada permukaan balok yang mengalami lentur. Seorang mahasiswa menyebut keduanya “dummy, jadi pasti tanpa regangan”. Penilaian mana yang paling tepat?",
      en: "Two D gauges are bonded transversely to the surface of a bending beam. A student calls them “dummy gauges, so they must be strain-free.” Which assessment is most accurate?",
    },
    options: [
      {
        id: "Benar, orientasi melintang selalu menghapus seluruh respons mekanik.",
        en: "Correct: transverse orientation always removes every mechanical response.",
      },
      {
        id: "Benar, semua gauge dalam jembatan hanya merespons suhu.",
        en: "Correct: every gauge in a bridge responds only to temperature.",
      },
      {
        id: "Belum tepat: gauge yang merekat dapat membaca regangan Poisson, walaupun juga membantu kompensasi suhu.",
        en: "Not quite: bonded gauges can sense Poisson strain while also helping compensate temperature.",
      },
      {
        id: "Salah, gauge melintang harus mengalami regangan yang sama tanda dan besarnya dengan gauge memanjang.",
        en: "Incorrect: transverse gauges must have the same strain sign and magnitude as longitudinal gauges.",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Orientasi gauge menentukan komponen regangan yang dibaca, bukan menjamin regangan nol. Tarikan memanjang dapat disertai penyusutan melintang, dan sebaliknya. Gauge D yang merekat dapat ikut memberi sinyal mekanik; model dummy tanpa regangan memerlukan pemisahan mekanik atau asumsi yang jelas.",
      en: "Gauge orientation selects the strain component, rather than guaranteeing zero strain. Longitudinal tension can accompany transverse contraction, and vice versa. Bonded D gauges can therefore contribute mechanical signal; a strain-free dummy model needs mechanical isolation or an explicit assumption.",
    },
    optionExplanations: [
      {
        id: "Melintang masih dapat mengalami regangan akibat efek Poisson.",
        en: "A transverse direction can still experience Poisson strain.",
      },
      {
        id: "Jembatan membaca perubahan tahanan, termasuk perubahan akibat regangan mekanik.",
        en: "A bridge reads resistance changes, including those caused by mechanical strain.",
      },
      {
        id: "Tepat. Respons mekanik dan peran kompensasi suhu dapat hadir bersamaan.",
        en: "Correct. Mechanical response and temperature-compensation roles can coexist.",
      },
      {
        id: "Regangan melintang berhubungan dengan rasio Poisson dan umumnya berlawanan tanda; tidak sama begitu saja.",
        en: "Transverse strain depends on Poisson’s ratio and generally has the opposite sign; it is not simply identical.",
      },
    ],
    sourceQuestionId: "2025-uts2-q4",
  },
  {
    id: "concept-2025-05",
    topic: "signal",
    difficulty: "applied",
    prompt: {
      id: "Sebuah filter RC pasif berubah responsnya saat dihubungkan ke beban berimpedansi rendah. Perancang ingin mengisolasi beban dan memberi penguatan pada sinyal frekuensi rendah. Pilihan mana paling sesuai?",
      en: "A passive RC filter changes response when connected to a low-impedance load. The designer wants to isolate that load and amplify the low-frequency signal. Which choice best fits?",
    },
    options: [
      {
        id: "Hilangkan catu op-amp agar filter aktif bekerja tanpa sumber daya tambahan.",
        en: "Remove the op-amp supply so the active filter works without additional power.",
      },
      {
        id: "Tambahkan penguat operasional dengan susunan penyangga/penguat yang sesuai, sambil memeriksa catu, bandwidth, dan batas keluarannya.",
        en: "Add a suitable op-amp buffer/amplifier while checking its supply, bandwidth, and output limits.",
      },
      {
        id: "Anggap filter aktif akan memotong semua frekuensi di atas cutoff menjadi tepat nol.",
        en: "Assume an active filter makes every frequency above cutoff exactly zero.",
      },
      {
        id: "Ubah label filter menjadi aktif tanpa mengubah rangkaian RC atau beban.",
        en: "Relabel the filter as active without changing the RC network or load.",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Penguat operasional dapat memberi impedansi masuk tinggi, impedansi keluar rendah, dan penguatan sesuai susunannya. Hal itu membantu mengurangi pembebanan pada jaringan RC. Namun, op-amp memerlukan daya dan memiliki batas frekuensi serta keluaran; “aktif” tidak berarti respons ideal tanpa batas.",
      en: "An op-amp can provide high input impedance, low output impedance, and circuit-dependent gain. The high input impedance helps reduce loading of the RC network. It still requires power and has frequency and output limits; “active” does not mean unlimited ideal behavior.",
    },
    optionExplanations: [
      {
        id: "Tanpa catu yang sesuai, op-amp tidak menjalankan fungsi penguat atau penyangga sebagaimana dirancang.",
        en: "Without a suitable supply, the op-amp cannot perform its designed amplification or buffering function.",
      },
      {
        id: "Tepat. Susunan aktif dapat menangani isolasi beban dan penguatan, dengan batas alat yang tetap perlu diperiksa.",
        en: "Correct. An active arrangement can address load isolation and gain while retaining practical device limits.",
      },
      {
        id: "Filter nyata memiliki penurunan bertahap; cutoff bukan batas pemutusan mendadak menjadi nol.",
        en: "Real filters roll off gradually; cutoff is not an abrupt boundary to zero output.",
      },
      {
        id: "Nama tidak mengubah impedansi atau hubungan sinyal. Perubahan fungsi memerlukan perubahan rangkaian.",
        en: "A label cannot change impedance or signal relations. A functional change requires a circuit change.",
      },
    ],
    sourceQuestionId: "2025-uts1-q5",
  },
  {
    id: "concept-2025-06",
    topic: "calibration",
    difficulty: "applied",
    prompt: {
      id: "Dua sensor suhu menunjukkan nilai akhir yang sama pada setiap suhu acuan. Namun, saat suhu berubah cepat, salah satu sensor tertinggal jauh. Kesimpulan mana yang paling tepat?",
      en: "Two temperature sensors give the same final reading at every reference temperature. During rapid temperature changes, however, one lags far behind. Which conclusion is best?",
    },
    options: [
      {
        id: "Kalibrasi statik yang sama menjamin kedua sensor cocok untuk semua perubahan suhu.",
        en: "Matching static calibration guarantees both sensors suit every temperature change.",
      },
      {
        id: "Keduanya dapat memiliki perilaku statik serupa, tetapi perlu dibandingkan respons dinamiknya untuk tugas cepat.",
        en: "They can have similar static behavior, but their dynamic responses need comparison for fast measurements.",
      },
      {
        id: "Sensor yang lambat pasti memiliki offset keadaan tunak lebih besar.",
        en: "The slower sensor must have a larger steady-state offset.",
      },
      {
        id: "Menambah digit layar akan membuat sensor lambat mengikuti suhu lebih cepat.",
        en: "Adding display digits will make the slower sensor track temperature faster.",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Kalibrasi statik menilai hubungan setelah keluaran stabil. Ia tidak menunjukkan berapa cepat sensor mencapai nilai itu atau seberapa besar amplitudo dan fase berubah saat masukan berosilasi. Pilihan sensor untuk perubahan cepat memerlukan uji dinamik yang sesuai.",
      en: "Static calibration evaluates the relation after settling. It does not determine how quickly the sensor reaches that value or how amplitude and phase change with an oscillating input. Sensor selection for rapid changes requires suitable dynamic tests.",
    },
    optionExplanations: [
      {
        id: "Keadaan akhir yang sama tidak memberi informasi lengkap tentang waktu tanggap.",
        en: "Matching final values do not fully describe response time.",
      },
      {
        id: "Tepat. Pisahkan ketepatan keadaan tunak dari kemampuan mengikuti perubahan.",
        en: "Correct. Separate steady-state agreement from the ability to follow change.",
      },
      {
        id: "Keterlambatan dapat terjadi meskipun offset akhirnya sama-sama nol.",
        en: "Lag can occur even when both final offsets are zero.",
      },
      {
        id: "Digit memengaruhi resolusi tampilan, bukan proses fisik yang menentukan waktu tanggap.",
        en: "Digits affect display resolution, not the physical response time.",
      },
    ],
    sourceQuestionId: "2025-uts2-q6",
  },
  {
    id: "concept-2025-07",
    topic: "calibration",
    difficulty: "reasoning",
    prompt: {
      id: "Pada tinggi cairan yang sama, keluaran sensor berbeda antara saat tangki diisi dan saat dikosongkan. Perbandingan apa yang tepat untuk menilai histeresis?",
      en: "At the same liquid height, a sensor gives different outputs while the tank fills and drains. Which comparison correctly assesses hysteresis?",
    },
    options: [
      {
        id: "Bandingkan setiap titik dengan garis lurus, tanpa memperhatikan arah perubahan level.",
        en: "Compare each point with a straight line, ignoring the direction of level change.",
      },
      {
        id: "Bandingkan keluaran pada tinggi terendah dengan keluaran pada tinggi tertinggi.",
        en: "Compare the lowest-level output with the highest-level output.",
      },
      {
        id: "Bandingkan dua keluaran pada waktu yang sama walaupun tinggi cairannya berbeda.",
        en: "Compare two outputs at the same time even if the liquid heights differ.",
      },
      {
        id: "Bandingkan keluaran naik dan turun pada masukan yang sama, lalu cari selisih terbesar.",
        en: "Compare rising and falling outputs at the same input, then find the largest separation.",
      },
    ],
    correctIndex: 3,
    explanation: {
      id: "Histeresis berarti keluaran bergantung pada riwayat arah masukan. Anda dapat melihat pengaruh riwayat dengan membandingkan dua jalur pada masukan yang sama. Jarak terhadap garis acuan menilai ketaklinieran; itu tidak menggantikan perbandingan dua arah.",
      en: "Hysteresis means output depends on the input’s directional history. To isolate that effect, compare both paths at the same input value. Distance from a reference line assesses nonlinearity and does not replace the two-direction comparison.",
    },
    optionExplanations: [
      {
        id: "Itu menilai ketaklinieran terhadap garis yang dipilih, bukan secara khusus jarak antara dua jalur.",
        en: "That assesses nonlinearity relative to a chosen line, not specifically separation between the two paths.",
      },
      {
        id: "Pengurangan kedua ujung memberi span keluaran. Span dapat menjadi penyebut persen, tetapi bukan besar histeresis.",
        en: "Subtracting the endpoints gives output span. You can use that span to normalize a percentage, but it does not measure hysteresis.",
      },
      {
        id: "Masukan berbeda juga mengubah keluaran. Perbandingan tersebut mencampur perubahan level dengan histeresis.",
        en: "Different inputs also change output. That comparison mixes level change with hysteresis.",
      },
      {
        id: "Tepat. Masukan yang sama membuat selisih mencerminkan pengaruh arah/riwayat.",
        en: "Correct. Holding input equal makes the difference reveal the direction/history effect.",
      },
    ],
    sourceQuestionId: "2025-uts1-q4",
  },
  {
    id: "concept-2025-08",
    topic: "position",
    difficulty: "reasoning",
    prompt: {
      id: "Dua posisi rotor resolver memberi rasio sinyal sinus terhadap kosinus yang sama. Namun, tanda kedua sinyal berbalik antara posisi pertama dan kedua. Bagaimana pembaca sudut dapat membedakan kedua posisi?",
      en: "Two resolver rotor positions produce the same sine-to-cosine signal ratio. However, both signal signs reverse between the positions. How can the angle reader distinguish them?",
    },
    options: [
      {
        id: "Pertahankan tanda kedua kanal setelah demodulasi, lalu tentukan sudut dengan atan2 sehingga kuadrannya tetap diketahui.",
        en: "Preserve both channel signs after demodulation, then use atan2 to retain the angle quadrant.",
      },
      {
        id: "Gunakan hanya nilai mutlak rasio sinus terhadap kosinus; tanda tidak membawa informasi sudut.",
        en: "Use only the absolute sine-to-cosine ratio; signs carry no angle information.",
      },
      {
        id: "Tambahkan tegangan kedua kanal; jumlahnya selalu menentukan satu sudut penuh secara unik.",
        en: "Add the two channel voltages; their sum always uniquely determines a full-turn angle.",
      },
      {
        id: "Ukur hanya amplitudo kanal sinus; satu kanal sudah membedakan semua sudut sepanjang satu putaran.",
        en: "Measure only the sine-channel amplitude; one channel distinguishes every angle over a full turn.",
      },
    ],
    correctIndex: 0,
    explanation: {
      id: "Sinyal resolver memuat arah dan kuadran melalui pasangan sinus serta kosinus. Rasio saja dapat sama untuk dua sudut yang berbeda 180°. Pembaca perlu mempertahankan tanda kedua kanal terhadap sinyal pembawa, lalu memakai atan2 untuk memilih kuadran yang sesuai.",
      en: "The resolver’s sine and cosine pair carries quadrant information. The ratio alone can match at two angles separated by 180°. The reader must retain both channel signs relative to the carrier, then use atan2 to select the correct quadrant.",
    },
    optionExplanations: [
      {
        id: "Tepat. Dua tanda membedakan kuadran, sedangkan besar relatif kedua kanal menentukan sudut di dalam kuadran.",
        en: "Correct. The two signs identify the quadrant, while the relative channel magnitudes locate the angle within it.",
      },
      {
        id: "Nilai mutlak membuang tanda, sehingga beberapa kuadran menjadi tak dapat dibedakan.",
        en: "Absolute values discard signs and make multiple quadrants indistinguishable.",
      },
      {
        id: "Jumlah sinus dan kosinus tidak memberi pemetaan satu-ke-satu untuk seluruh putaran. Beberapa sudut dapat memberi jumlah yang sama.",
        en: "The sine-plus-cosine sum is not one-to-one over a full turn. Different angles can have the same sum.",
      },
      {
        id: "Satu nilai sinus dapat berasal dari lebih dari satu sudut. Kanal kosinus beserta tandanya menghilangkan ambiguitas tersebut.",
        en: "One sine value can correspond to several angles. The cosine channel and its sign resolve that ambiguity.",
      },
    ],
    sourceQuestionId: "2025-uas-q3",
  },
  {
    id: "concept-2025-09",
    topic: "flow",
    difficulty: "reasoning",
    prompt: {
      id: "Soal orifis memberi geometri, beda tekanan, massa jenis, dan tabel Cd yang bergantung pada Reynolds. Viskositas tidak tersedia. Jawaban mana paling dapat dipertanggungjawabkan?",
      en: "An orifice problem supplies geometry, pressure difference, density, and a Reynolds-dependent Cd table, but no viscosity. Which answer is best supported?",
    },
    options: [
      {
        id: "Ambil viskositas dari soal lain yang sama-sama menyebut oli.",
        en: "Take viscosity from another problem that also mentions oil.",
      },
      {
        id: "Tetapkan aliran turbulen hanya karena beda tekanannya tidak nol.",
        en: "Declare turbulent flow solely because pressure difference is nonzero.",
      },
      {
        id: "Laporkan debit ideal dan hubungan debit aktual terhadap Cd; jelaskan data yang perlu ditambah untuk memilih Cd.",
        en: "Report ideal flow and actual flow as a function of Cd; state the extra data needed to choose Cd.",
      },
      {
        id: "Pilih Cd paling kecil pada tabel dan nyatakan hasilnya sebagai jawaban pasti.",
        en: "Choose the smallest table Cd and present the result as exact.",
      },
    ],
    correctIndex: 2,
    explanation: {
      id: "Bagian ideal masih dapat dihitung dari data yang ada. Namun, memilih koefisien bergantung Reynolds memerlukan kondisi aliran yang belum lengkap tanpa viskositas atau informasi setara. Jawaban bersyarat menjaga pemisahan antara hasil data dan asumsi tambahan.",
      en: "The supplied data still determine the ideal calculation. Selecting a Reynolds-dependent coefficient, however, requires flow information that is incomplete without viscosity or equivalent data. A conditional answer keeps data-supported results separate from additional assumptions.",
    },
    optionExplanations: [
      {
        id: "Nama fluida yang sama tidak menjamin viskositas sama; suhu dan jenis oli juga berpengaruh.",
        en: "A shared fluid name does not establish equal viscosity; temperature and oil type matter.",
      },
      {
        id: "Aliran laminar juga memerlukan beda tekanan. Beda tekanan bukan penentu tunggal rezim.",
        en: "Laminar flow also requires a pressure difference. Pressure difference alone does not determine regime.",
      },
      {
        id: "Tepat. Jawaban ini menyelesaikan bagian yang dapat ditentukan tanpa menyembunyikan kekurangan data.",
        en: "Correct. It solves the determined portion without hiding missing information.",
      },
      {
        id: "Nilai itu hanya berlaku pada kondisi tabelnya. Memilih angka terkecil tidak membuktikan syaratnya terpenuhi.",
        en: "That value applies under its tabulated conditions. Choosing the smallest value does not establish those conditions.",
      },
    ],
    sourceQuestionId: "2025-uas-q5",
  },
  {
    id: "concept-2025-10",
    topic: "dynamics",
    difficulty: "reasoning",
    prompt: {
      id: "Accelerometer piezoelektrik memiliki sensitivitas nominal hanya dalam pita yang dinyatakan. Ketika sinyal melampaui batas atas pita, apa yang paling tepat dilakukan?",
      en: "A piezoelectric accelerometer has a nominal sensitivity specified only within a stated band. When a signal exceeds the upper band limit, what is the soundest approach?",
    },
    options: [
      {
        id: "Tetap gunakan sensitivitas nominal karena semua sensor memiliki penguatan tetap pada semua frekuensi.",
        en: "Keep using nominal sensitivity because all sensors have constant gain at every frequency.",
      },
      {
        id: "Periksa respons frekuensi atau kalibrasi yang sesuai; resonansi dan pelemahan dapat membuat konversi nominal keliru.",
        en: "Check the relevant frequency response or calibration; resonance and attenuation can invalidate nominal conversion.",
      },
      {
        id: "Anggap semua frekuensi di atas pita pasti menghasilkan keluaran lebih besar.",
        en: "Assume every frequency above the band necessarily gives a larger output.",
      },
      {
        id: "Abaikan arah pemasangan karena kesalahan frekuensi menghapus sensitivitas silang.",
        en: "Ignore mounting direction because frequency error eliminates cross-axis sensitivity.",
      },
    ],
    correctIndex: 1,
    explanation: {
      id: "Batas pita menandai wilayah tempat sensitivitas nominal didukung spesifikasi. Di luar pita, respons dapat membesar dekat resonansi dan melemah jauh sesudahnya. Pengaruh frekuensi tidak menghilangkan pengaruh arah, sehingga keduanya tetap perlu diperiksa.",
      en: "The band identifies where nominal sensitivity is supported by the specification. Outside it, response can rise near resonance and attenuate farther beyond it. Frequency effects do not remove directional effects, so both still need consideration.",
    },
    optionExplanations: [
      {
        id: "Sensitivitas bergantung pada respons dinamik; nilai nominal tidak berlaku tanpa batas.",
        en: "Sensitivity depends on dynamic response; the nominal value is not unlimited in frequency.",
      },
      {
        id: "Tepat. Keputusan memakai atau mengoreksi pembacaan perlu dukungan respons yang sesuai.",
        en: "Correct. Using or correcting the reading requires an appropriate response characterization.",
      },
      {
        id: "Puncak resonansi tidak berarti seluruh daerah frekuensi lebih tinggi terus menguat.",
        en: "A resonance peak does not mean the entire higher-frequency range remains amplified.",
      },
      {
        id: "Sensitivitas silang adalah respons terhadap sumbu lain dan tetap dapat menambah galat.",
        en: "Cross-axis sensitivity is response to another axis and can still add error.",
      },
    ],
    sourceQuestionId: "2025-uas-q6",
  },
];

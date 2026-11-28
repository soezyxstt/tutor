import type { ExamQuestion } from "./types";

export const questionsUts12025: ExamQuestion[] = [
  {
    id: "2025-uts1-q1",
    year: 2025,
    exam: "uts1",
    number: 1,
    topic: "calibration",
    title: {
      id: "Kalibrasi suhu dan pengaruh catu",
      en: "Temperature calibration and supply effects",
    },
    source: {
      url: "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
      file: "2025-uts1.pdf",
      pages: [1],
    },
    originalLanguage: "en",
    original:
      "1. [30%] Static Characteristics of Measurement Systems\nA temperature sensor has an input range of 0 to 120°C and a standard voltage supply Vs = 9 V.\nThe calibration result is presented on the table below.\nInput temperature in °C: 0, 15, 30, 45, 60, 75, 90.\nOutput voltage in mV (Vs = 9 V): 0, 78, 155, 222, 308, 377, 450.\nOutput voltage in mV (Vs = 12 V): 5, 93, 177, 255, 345, 415, 500.\nBy using the general equation of a system element\n\\[O=KI+K_MI_MI+a+K_II_I+N(I),\\]\na. [10%] Calculate the slope (K) and offset (a) of the standard system.\nb. [10%] Calculate the constants KM and KI associated with supply voltage variations.\nc. [10%] Calculate the maximum non-linearity as a percentage of f.s.d.",
    prompt: {
      id: "Sensor suhu memiliki rentang masukan yang tertulis 0 sampai 120 °C dan catu standar 9 V. Data kalibrasi:\nSuhu (°C): 0, 15, 30, 45, 60, 75, 90.\nKeluaran pada 9 V (mV): 0, 78, 155, 222, 308, 377, 450.\nKeluaran pada 12 V (mV): 5, 93, 177, 255, 345, 415, 500.\nGunakan \\(O=KI+K_MI_MI+a+K_II_I+N(I)\\). Tentukan (a) kemiringan K dan offset a pada kondisi standar. Lanjutkan dengan (b) KM dan KI akibat perubahan catu. Untuk(c), hitung ketaklinieran maksimum sebagai persen simpangan skala penuh (f.s.d.). Perhatikan bahwa tabel berhenti pada 90 °C, berbeda dari batas 120 °C pada kalimat soal.",
      en: "The sensor’s stated input range is 0 to 120 °C, with a standard 9 V supply. Calibration data:\nTemperature (°C): 0, 15, 30, 45, 60, 75, 90.\nOutput at 9 V (mV): 0, 78, 155, 222, 308, 377, 450.\nOutput at 12 V (mV): 5, 93, 177, 255, 345, 415, 500.\nUse \\(O=KI+K_MI_MI+a+K_II_I+N(I)\\). Find (a) standard slope K and offset a. Next, find(b) KM and KI for supply variations. For(c), calculate maximum nonlinearity as a percentage of full-scale deflection (f.s.d.). The table ends at 90 °C, unlike the 120 °C limit in the prose.",
    },
    visual: {
      kind: "calibration",
      params: {
        xs: [0, 15, 30, 45, 60, 75, 90],
        ys: [0, 78, 155, 222, 308, 377, 450],
        ys2: [5, 93, 177, 255, 345, 415, 500],
        supply1: 9,
        supply2: 12,
        xUnit: "°C",
        yUnit: "mV",
      },
      caption: {
        id: "Bandingkan kedua catu dan garis ujung rentang data 0 sampai 90 °C. Span tabel 450 mV berbeda dari span 600 mV yang memerlukan ekstrapolasi ke 120 °C.",
        en: "Compare both supplies and endpoint lines over the measured 0 to 90 °C data. The 450 mV table span differs from the 600 mV span obtained by extrapolating to 120 °C.",
      },
    },
    steps: [
      {
        title: {
          id: "1. Tetapkan masukan, keluaran, dan kondisi standar",
          en: "1. Identify input, output, and the standard condition",
        },
        body: [
          {
            id: "Kita mencari hubungan suhu dengan tegangan pada dua catu. Masukan \\(I\\) adalah suhu \\(T\\) dalam °C; keluaran \\(O\\) adalah tegangan dalam mV. Catu 9 V menjadi acuan. Kita membuat garis melalui kedua ujung data. **Residu** (selisih keluaran nyata terhadap garis acuan) memakai simbol \\(N\\) untuk menilai ketaklinieran.",
            en: "We want the relation between temperature and voltage at two supplies. Input \\(I\\) is temperature \\(T\\) in °C; output \\(O\\) is voltage in mV. The 9 V supply is our reference. We draw a line through the data endpoints. A **residual** \\(N\\) is the measured output minus that reference line; it lets us assess nonlinearity.",
          },
          {
            id: "Metode garis ujung berbeda dari regresi kuadrat terkecil. Soal tidak menetapkan metode lain, sehingga nyatakan pilihan ini sebelum menghitung.",
            en: "The endpoint method differs from least-squares regression. The question specifies no other fitting method, so state this choice before calculating.",
          },
        ],
        table: {
          headers: [
            {
              id: "T (°C)",
              en: "T (°C)",
            },
            {
              id: "O pada 9 V (mV)",
              en: "O at 9 V (mV)",
            },
            {
              id: "O pada 12 V (mV)",
              en: "O at 12 V (mV)",
            },
          ],
          rows: [
            ["0", "0", "5"],
            ["15", "78", "93"],
            ["30", "155", "177"],
            ["45", "222", "255"],
            ["60", "308", "345"],
            ["75", "377", "415"],
            ["90", "450", "500"],
          ],
        },
      },
      {
        title: {
          id: "2. Cari sensitivitas dan offset pada catu 9 V",
          en: "2. Find sensitivity and offset at 9 V",
        },
        body: [
          {
            id: "Kemiringan adalah kenaikan keluaran dibagi kenaikan suhu. Dua ujung data standar ialah \\((0,0)\\) dan \\((90,450)\\). Offset \\(a\\) diperoleh dengan memasukkan satu titik ke \\(O=KT+a\\); karena titik pertama nol, offsetnya nol.",
            en: "Slope is output rise divided by temperature rise. The standard endpoints are \\((0,0)\\) and \\((90,450)\\). Obtain offset \\(a\\) by inserting a point into \\(O=KT+a\\); the zero first point makes the offset zero.",
          },
          {
            id: "\\(K=5\\ \\mathrm{mV/{}^\\circ C}\\) berarti garis acuan naik 5 mV untuk kenaikan 1 °C. Angka ini merangkum garis, bukan menjamin semua titik tabel tepat di atasnya.",
            en: "\\(K=5\\ \\mathrm{mV/{}^\\circ C}\\) means the reference line rises 5 mV per 1 °C increase. It describes the line, not an exact fit through every table point.",
          },
        ],
        math: "K=\\frac{450-0}{90-0}=5\\ \\mathrm{mV/{}^\\circ C},\\qquad a=0-K(0)=0\\ \\mathrm{mV}\\\\O_{9,\\mathrm{line}}=5T",
      },
      {
        title: {
          id: "3. Bentuk garis pembanding pada catu 12 V",
          en: "3. Form the comparison line at 12 V",
        },
        body: [
          {
            id: "Pada catu kedua, titik nol bergeser menjadi 5 mV dan titik 90 °C menjadi 500 mV. Kurangi offset 5 mV sebelum menghitung kemiringan; 500/90 saja akan mencampur perubahan offset dengan perubahan sensitivitas.",
            en: "At the second supply, the zero point shifts to 5 mV and the 90 °C point becomes 500 mV. Subtract the 5 mV offset before calculating slope; 500/90 alone would mix offset and sensitivity changes.",
          },
        ],
        math: "K_{12}=\\frac{500-5}{90-0}=5.5\\ \\mathrm{mV/{}^\\circ C},\\qquad a_{12}=5\\ \\mathrm{mV}\\\\O_{12,\\mathrm{line}}=5.5T+5",
      },
      {
        title: {
          id: "4. Gunakan perubahan catu sebagai masukan pengganggu",
          en: "4. Use supply change as the influence input",
        },
        body: [
          {
            id: "Definisikan \\(\\Delta V_s=V_s-9\\ \\mathrm V\\). Kedua suku pengaruh catu memakai perubahan dari kondisi standar ini: \\(I_M=I_I=\\Delta V_s\\). Maka pengaruh tambahan menjadi nol ketika catu kembali 9 V.",
            en: "Define \\(\\Delta V_s=V_s-9\\ \\mathrm V\\). Both supply-influence terms use this departure from standard: \\(I_M=I_I=\\Delta V_s\\). Their additional effects then vanish when supply returns to 9 V.",
          },
          {
            id: "\\(K_I\\) mengatur perubahan offset per volt. \\(K_M\\) mengatur perubahan kemiringan per volt. Memisahkan keduanya mencegah kita menganggap seluruh perubahan keluaran berasal dari satu jenis galat.",
            en: "\\(K_I\\) describes offset change per volt; \\(K_M\\) describes slope change per volt. Separating them prevents attributing the entire output change to one error type.",
          },
        ],
        math: "\\Delta V_s=12-9=3\\ \\mathrm V",
      },
      {
        title: {
          id: "5. Cari KI dari perubahan titik nol",
          en: "5. Find KI from the zero-point change",
        },
        body: [
          {
            id: "Pada \\(T=0\\), semua suku yang mengandung suhu hilang. Perubahan keluaran dari 0 menjadi 5 mV hanya memberi perubahan offset garis. Bagi kenaikan itu dengan perubahan catu 3 V.",
            en: "At \\(T=0\\), all temperature-dependent terms vanish. The output change from 0 to 5 mV gives the line’s offset change. Divide it by the 3 V supply change.",
          },
        ],
        math: "K_I=\\frac{a_{12}-a_9}{12-9}=\\frac{5-0}{3}=\\frac53\\ \\mathrm{mV/V}",
      },
      {
        title: {
          id: "6. Cari KM dari perubahan kemiringan",
          en: "6. Find KM from the slope change",
        },
        body: [
          {
            id: "Sensitivitas bertambah dari 5 menjadi 5.5 mV/°C. Bagi perubahan 0.5 mV/°C dengan 3 V. Satuan hasil harus menyertakan suhu dan catu karena koefisien ini mengubah sensitivitas per volt.",
            en: "Sensitivity rises from 5 to 5.5 mV/°C. Divide the 0.5 mV/°C change by 3 V. The units must include both temperature and supply, since this coefficient changes sensitivity per volt.",
          },
          {
            id: "Pemeriksaan: pada \\(\\Delta V_s=3\\), garis model menjadi \\((5+\\tfrac16\\cdot3)T+\\tfrac53\\cdot3=5.5T+5\\), sama dengan garis catu 12 V.",
            en: "Check: at \\(\\Delta V_s=3\\), the model line becomes \\((5+\\tfrac16\\cdot3)T+\\tfrac53\\cdot3=5.5T+5\\), reproducing the 12 V line.",
          },
        ],
        math: "K_M=\\frac{K_{12}-K_9}{12-9}=\\frac{5.5-5}{3}=\\frac16\\ \\mathrm{\\frac{mV}{{}^\\circ C\\,V}}",
      },
      {
        title: {
          id: "7. Hitung residu setiap titik pada kondisi standar",
          en: "7. Calculate every residual at the standard condition",
        },
        body: [
          {
            id: "Ketaklinieran standar memakai catu 9 V. Untuk setiap suhu, hitung keluaran garis \\(5T\\), lalu kurangi dari keluaran tabel. Contoh pada 60 °C: tabel 308 mV dan garis 300 mV, sehingga residunya+8 mV.",
            en: "Standard nonlinearity uses the 9 V supply. At each temperature, calculate line output \\(5T\\) and subtract it from the table output. At 60 °C, for example, the table gives 308 mV and the line 300 mV, leaving a+8 mV residual.",
          },
        ],
        math: "N(T)=O_9(T)-5T,\\qquad \\max|N|=8\\ \\mathrm{mV}\\quad\\text{at }T=60^\\circ\\mathrm C",
        table: {
          headers: [
            {
              id: "T (°C)",
              en: "T (°C)",
            },
            {
              id: "O 9 (mV)",
              en: "O 9 (mV)",
            },
            {
              id: "Garis (mV)",
              en: "Line (mV)",
            },
            {
              id: "N (mV)",
              en: "N (mV)",
            },
          ],
          rows: [
            ["0", "0", "0", "0"],
            ["15", "78", "75", "3"],
            ["30", "155", "150", "5"],
            ["45", "222", "225", "-3"],
            ["60", "308", "300", "8"],
            ["75", "377", "375", "2"],
            ["90", "450", "450", "0"],
          ],
        },
      },
      {
        title: {
          id: "8. Pisahkan span terukur dari rentang yang hanya dinyatakan",
          en: "8. Separate the measured span from the stated range",
        },
        body: [
          {
            id: "Tabel hanya membuktikan keluaran 0 sampai 450 mV pada 0 sampai 90 °C. Terhadap span terukur itu, deviasi 8 mV adalah 1.778%. Namun, kalimat soal menyebut rentang 0 sampai 120 °C. Bila garis K=5 diekstrapolasi sampai 120 °C, span nominalnya 600 mV dan deviasi yang sama menjadi 1.333% dari span tersebut.",
            en: "The table establishes an output of 0 to 450 mV over 0 to 90 °C only. Relative to that measured span,8 mV is 1.778%. The prose instead states 0 to 120 °C. If the K=5 line is extrapolated to 120 °C, nominal span is 600 mV and the same deviation becomes 1.333% of that span.",
          },
          {
            id: "Tidak ada data 90 sampai 120 °C, jadi kita belum dapat membuktikan ketaklinieran maksimum di seluruh rentang 120 °C. Laporkan konvensi penyebutnya; jangan menyembunyikan perbedaan data ini.",
            en: "There are no 90 to 120 °C data, so the maximum nonlinearity over the complete 120 °C range is not established. State the denominator convention rather than hiding this mismatch.",
          },
        ],
        math: "\\frac8{450}\\,100\\%=1.7778\\%\\quad\\text{(measured span)}\\\\\\frac8{5(120)}\\,100\\%=1.3333\\%\\quad\\text{(extrapolated nominal span)}",
      },
      {
        title: {
          id: "9. Tafsirkan pengaruh catu dan batas model garis",
          en: "9. Interpret supply effects and the line model’s limits",
        },
        body: [
          {
            id: "Kenaikan catu menggeser titik nol dan memperbesar sensitivitas: kedua jenis pengaruh memang ada. Garis ujung berhasil merangkum keduanya, tetapi residu tiap titik tetap perlu diperiksa. Pada 30 °C, misalnya, kenaikan keluaran nyata 22 mV berbeda dari kenaikan garis 20 mV; bentuk ketaklinieran juga dapat berubah.",
            en: "Raising the supply shifts the zero point and increases sensitivity: both influence types are present. Endpoint lines summarize them, but pointwise residuals still matter. At 30 °C, for example, the measured increase of 22 mV differs from the line’s 20 mV increase; the nonlinear shape can also change.",
          },
          {
            id: "Hasil a dan KI bersatuan mV dan mV/V, sedangkan K dan KM melibatkan perubahan terhadap suhu. Pemeriksaan satuan ini membantu membedakan pergeseran garis dari perubahan kemiringan.",
            en: "The units of a and KI are mV and mV/V, whereas K and KM involve changes with temperature. This unit check distinguishes line shift from slope change.",
          },
        ],
      },
    ],
    answer: {
      id: "\\(K=5\\ \\mathrm{mV/{}^\\circ C}\\), \\(a=0\\), \\(K_M=1/6\\ \\mathrm{mV/({}^\\circ C\\,V)}\\), dan \\(K_I=5/3\\ \\mathrm{mV/V}\\). Deviasi maksimum pada titik terukur adalah 8 mV di 60 °C. Nilainya 1.778% span tabel 450 mV, atau 1.333% span nominal 600 mV bila garis diekstrapolasi ke 120 °C. Maksimum di wilayah 90 sampai 120 °C belum diketahui.",
      en: "\\(K=5\\ \\mathrm{mV/{}^\\circ C}\\), \\(a=0\\), \\(K_M=1/6\\ \\mathrm{mV/({}^\\circ C\\,V)}\\), and \\(K_I=5/3\\ \\mathrm{mV/V}\\). The largest measured-point deviation is 8 mV at 60 °C. That deviation is 1.778% of the 450 mV table span. It is 1.333% of a 600 mV nominal span extrapolated to 120 °C. The maximum over 90 to 120 °C remains unknown.",
    },
    answerMath:
      "\\boxed{K=5,\\quad a=0,\\quad K_M=\\tfrac16,\\quad K_I=\\tfrac53,\\quad\\max|N|_{\\mathrm{sampled}}=8\\ \\mathrm{mV}}",
    assumptions: [
      {
        id: "Garis acuan memakai dua ujung data, bukan regresi. IM dan II berarti perubahan catu dari 9 V.",
        en: "The reference line uses the data endpoints, not regression. IM and II mean supply departure from 9 V.",
      },
      {
        id: "Rentang tertulis 0 sampai 120 °C bertentangan dengan tabel yang berhenti 90 °C. Persen terhadap 600 mV memakai ekstrapolasi dan bukan bukti maksimum pada seluruh rentang.",
        en: "The stated 0 to 120 °C range conflicts with a table ending at 90 °C. The 600 mV normalization uses extrapolation and does not establish the maximum over the whole range.",
      },
      {
        id: "KM dan KI merangkum perubahan garis ujung. Sisa ketaklinieran dapat bergantung pada suhu serta catu.",
        en: "KM and KI summarize endpoint-line changes. Residual nonlinearity can depend on both temperature and supply.",
      },
    ],
  },
  {
    id: "2025-uts1-q2",
    year: 2025,
    exam: "uts1",
    number: 2,
    topic: "statistics",
    title: {
      id: "Bias dan sebaran galat pada rantai ukur",
      en: "Bias and error spread in a measurement chain",
    },
    source: {
      url: "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
      file: "2025-uts1.pdf",
      pages: [1, 2],
    },
    originalLanguage: "en",
    original:
      "2. [20%] Accuracy of Measurement Systems\nA pressure measurement system consists of a pressure sensor, a deflection bridge, an amplifier, and a recorder, as shown in the following figure.\n[Figure: Input → Pressure Sensor → Deflection Bridge → Amplifier → Recorder → Output.]\nThe table below gives the linear sensitivities and error bandwidths for each element in the system.\nPressure sensor: K = 10⁻³ Ω Pa⁻¹; error bandwidth ±h = ±0.08 Ω.\nDeflection bridge: K = 5 × 10⁻² mV Ω⁻¹; ±h = ±10⁻³ mV.\nAmplifier: K = 10³ mV mV⁻¹; ±h = ±0.5 mV.\nRecorder: K = 20 Pa mV⁻¹; ±h = ±5 Pa.\na. [10%] Given that the recorder is incorrectly adjusted so that its sensitivity is 15 Pa mV⁻¹, calculate the mean error Ē for an input pressure of 5 × 10³ Pa.\nb. [10%] Calculate the standard deviation σE of the error distribution function.\nUseful formulas supplied on page2:\n\\[\\overline O_i=K_i\\overline I_i,\\qquad \\sigma_{I_{i+1}}^2=\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+\\frac{h_i^2}{3}.\\]",
    prompt: {
      id: "Rantai ukur tekanan terdiri dari sensor tekanan → jembatan defleksi → penguat → recorder. Data sensitivitas nominal dan setengah lebar galat tiap keluaran:\nSensor: \\(10^{-3}\\ \\Omega/\\mathrm{Pa}\\), ±0.08 Ω.\nJembatan: \\(5\\times10^{-2}\\ \\mathrm{mV}/\\Omega\\), ±0.001 mV.\nPenguat: \\(10^3\\ \\mathrm{mV/mV}\\), ±0.5 mV.\nRecorder: \\(20\\ \\mathrm{Pa/mV}\\), ±5 Pa.\n(a) Recorder salah disetel menjadi 15 Pa/mV. Hitung galat rata-rata untuk masukan 5000 Pa. (b) Hitung simpangan baku distribusi galat. Gunakan rumus propagasi pada naskah; jelaskan asumsi untuk suku \\(h_i^2/3\\).",
      en: "The pressure chain is sensor → deflection bridge → amplifier → recorder. Nominal sensitivities and output error half-widths:\nSensor: \\(10^{-3}\\ \\Omega/\\mathrm{Pa}\\), ±0.08 Ω.\nBridge: \\(5\\times10^{-2}\\ \\mathrm{mV}/\\Omega\\), ±0.001 mV.\nAmplifier: \\(10^3\\ \\mathrm{mV/mV}\\), ±0.5 mV.\nRecorder: \\(20\\ \\mathrm{Pa/mV}\\), ±5 Pa.\n(a) The recorder is misadjusted to 15 Pa/mV. Find the mean error for a 5000 Pa input. (b) Find the error distribution’s standard deviation. Use the supplied propagation formula and explain the assumption behind \\(h_i^2/3\\).",
    },
    visual: {
      kind: "uncertainty",
      params: {
        mode: "chain",
        input: 5000,
        gains: [0.001, 0.05, 1000, 15],
        halfWidths: [0.08, 0.001, 0.5, 5],
      },
      caption: {
        id: "Setiap blok menambah galat dalam satuan keluarannya: Ω, mV, mV, lalu Pa. Recorder memakai gain aktual 15 Pa/mV; lebar galat diasumsikan uniform dan independen.",
        en: "Each block adds error in its output unit: Ω, mV, mV, then Pa. The recorder uses its actual 15 Pa/mV gain; error half-widths assume independent uniform distributions.",
      },
    },
    steps: [
      {
        title: {
          id: "1. Pisahkan perubahan nilai rata-rata dari sebaran",
          en: "1. Separate the mean change from the spread",
        },
        body: [
          {
            id: "Kita menilai rata-rata galat dan sebarannya secara terpisah. **Bias** (galat rata-rata) menunjukkan apakah hasil cenderung terlalu tinggi atau rendah. Simbolnya \\(\\overline E\\). **Simpangan baku** (ukuran sebaran di sekitar rata-rata) memakai simbol \\(\\sigma_E\\). Recorder yang salah gain menggeser rata-rata; lebar galat tiap blok menyumbang sebaran.",
            en: "We assess mean error separately from its spread. **Bias**, the mean error \\(\\overline E\\), shows whether readings tend high or low. **Standard deviation** \\(\\sigma_E\\) measures spread around that mean. A misadjusted recorder shifts the mean, while each block’s error bandwidth contributes spread.",
          },
          {
            id: "Kita memperlakukan tekanan 5000 Pa sebagai masukan acuan yang tetap. Oleh karena itu, varians masukan awal nol; bukan berarti seluruh rantai bebas galat.",
            en: "Treat the 5000 Pa pressure as a fixed reference input. Its initial variance is therefore zero; that does not make the rest of the chain error-free.",
          },
        ],
      },
      {
        title: {
          id: "2. Periksa penguatan nominal dan satuannya",
          en: "2. Check the nominal gain and its units",
        },
        body: [
          {
            id: "Penguatan sebuah rantai diperoleh dengan mengalikan sensitivitas berurutan. Satuan keluaran satu blok menjadi satuan masukan blok berikutnya. Dengan recorder nominal 20 Pa/mV, hasil kali keseluruhan adalah 1, sehingga nilai tekanan yang ditampilkan seharusnya sama dengan masukan.",
            en: "Multiply successive sensitivities to obtain chain gain. Each block’s output unit becomes the next block’s input unit. With the nominal 20 Pa/mV recorder, overall gain is 1, so the displayed pressure should equal the input.",
          },
        ],
        math: "K_{\\mathrm{nom}}=(10^{-3})(5\\times10^{-2})(10^3)(20)=1\\ \\mathrm{Pa/Pa}",
      },
      {
        title: {
          id: "3. Propagasikan rata-rata dengan gain recorder yang nyata",
          en: "3. Propagate the mean with the actual recorder gain",
        },
        body: [
          {
            id: "Hitung berturut-turut agar setiap perubahan satuan terlihat. Sensor memberi 5 Ω, jembatan memberi 0.25 mV, penguat memberi 250 mV. Recorder yang salah gain kemudian mengubah 250 mV menjadi 3750 Pa.",
            en: "Calculate stage by stage to keep each unit change visible. The sensor gives 5 Ω, the bridge 0.25 mV, and the amplifier 250 mV. The misadjusted recorder then converts 250 mV into 3750 Pa.",
          },
        ],
        math: "5000\\ \\mathrm{Pa}\\xrightarrow{0.001}\\ 5\\ \\Omega\\xrightarrow{0.05}\\ 0.25\\ \\mathrm{mV}\\xrightarrow{1000}\\ 250\\ \\mathrm{mV}\\xrightarrow{15}\\ 3750\\ \\mathrm{Pa}",
        table: {
          headers: [
            {
              id: "Keluaran blok",
              en: "Block output",
            },
            {
              id: "Rata-rata",
              en: "Mean",
            },
          ],
          rows: [
            ["Sensor", "5 Ω"],
            ["Bridge", "0.25 mV"],
            ["Amplifier", "250 mV"],
            ["Recorder", "3750 Pa"],
          ],
        },
      },
      {
        title: {
          id: "4. Tentukan bias beserta tandanya",
          en: "4. Determine the bias and its sign",
        },
        body: [
          {
            id: "Definisikan galat sebagai indikasi dikurangi nilai acuan. Hasil negatif berarti sistem membaca terlalu rendah. Rasio gain aktual terhadap nominal adalah 15/20=0.75, sehingga pembacaan 75% dari acuan sesuai dengan hasil bertahap.",
            en: "Define error as indicated value minus reference. A negative result means under-reading. Actual-to-nominal recorder gain is 15/20=0.75, so a 75%-of-reference reading agrees with the stage calculation.",
          },
        ],
        math: "\\overline E=3750-5000=-1250\\ \\mathrm{Pa}\\qquad\\frac{\\overline E}{5000}\\,100\\%=-25\\%",
      },
      {
        title: {
          id: "5. Jelaskan mengapa lebar galat menjadi varians h²/3",
          en: "5. Explain why the error half-width gives variance h²/3",
        },
        body: [
          {
            id: "Rumus naskah memakai \\(h_i^2/3\\). Model tersebut sesuai galat tambahan berdistribusi uniform antara \\(-h_i\\) dan \\(+h_i\\), bermean nol. Kita juga menganggap galat antarelemen independen, sehingga varians dapat dijumlahkan tanpa suku korelasi.",
            en: "The supplied formula uses \\(h_i^2/3\\). The term corresponds to additive zero-mean uniform error from \\(-h_i\\) to \\(+h_i\\). We also assume errors in different elements are independent, so their variances add without covariance terms.",
          },
          {
            id: "\\(h_i\\) adalah setengah lebar, bukan lebar penuh. Galat yang datang dari blok sebelumnya dikalikan gain \\(K_i\\), sehingga variansnya dikalikan \\(K_i^2\\).",
            en: "\\(h_i\\) is the half-width, not the full width. The preceding block’s error is multiplied by gain \\(K_i\\), so its variance is multiplied by \\(K_i^2\\).",
          },
        ],
        math: "\\sigma_{O_i}^2=K_i^2\\sigma_{I_i}^2+\\frac{h_i^2}{3},\\qquad\\sigma_{I_1}^2=0",
      },
      {
        title: {
          id: "6. Hitung varians sensor dan jembatan",
          en: "6. Calculate sensor and bridge variances",
        },
        body: [
          {
            id: "Sensor menerima masukan acuan tanpa sebaran, jadi hanya galat tambahannya 0.08 Ω yang menyumbang varians. Pada jembatan, propagasikan varians sensor melalui gain 0.05 mV/Ω, lalu tambahkan varians galat jembatan 0.001 mV.",
            en: "The sensor receives a fixed reference, so only its 0.08 Ω additive error contributes variance. At the bridge, propagate sensor variance through the 0.05 mV/Ω gain, then add the bridge’s own 0.001 mV error variance.",
          },
        ],
        math: "\\sigma_1^2=\\frac{0.08^2}{3}=0.00213333\\ \\Omega^2\\\\\\sigma_2^2=0.05^2(0.00213333)+\\frac{0.001^2}{3}=5.66667\\times10^{-6}\\ \\mathrm{mV^2}",
      },
      {
        title: {
          id: "7. Teruskan varians melalui penguat dan recorder",
          en: "7. Continue variance through amplifier and recorder",
        },
        body: [
          {
            id: "Gain penguat 1000 mengalikan simpangan baku 1000 kali dan varians sejuta kali. Di tahap akhir, kita memakai gain recorder aktual 15 Pa/mV. Gain nominal 20 tidak sesuai karena kita sedang menghitung sebaran sistem yang salah setel.",
            en: "The amplifier’s 1000 gain multiplies standard deviation by 1000 and variance by one million. At the final stage, use the actual 15 Pa/mV recorder, not nominal 20, because the requested distribution belongs to the misadjusted system.",
          },
        ],
        math: "\\sigma_3^2=1000^2(5.66667\\times10^{-6})+\\frac{0.5^2}{3}=5.75000\\ \\mathrm{mV^2}\\\\\\sigma_E^2=15^2(5.75)+\\frac{5^2}{3}=1302.08333\\ \\mathrm{Pa^2}",
      },
      {
        title: {
          id: "8. Ambil akar dan tafsirkan sebarannya",
          en: "8. Take the square root and interpret the spread",
        },
        body: [
          {
            id: "Varians bersatuan Pa². Ambil akar untuk memperoleh simpangan baku dalam Pa, sehingga dapat dibandingkan dengan bias. Nilai 36.08 Pa adalah sebaran di sekitar galat rata-rata −1250 Pa, bukan pengganti bias tersebut.",
            en: "Variance has units Pa². Taking its square root gives standard deviation in Pa, allowing comparison with bias. The 36.08 Pa is spread around a mean error of −1250 Pa, not a replacement for that bias.",
          },
        ],
        math: "\\boxed{\\sigma_E=\\sqrt{1302.08333}=36.0844\\ \\mathrm{Pa}}",
      },
      {
        title: {
          id: "9. Cek hasil dari kontribusi yang dirujuk ke keluaran",
          en: "9. Check using output-referred contributions",
        },
        body: [
          {
            id: "Bawa setiap setengah lebar galat ke keluaran akhir melalui gain sesudahnya. Kontribusinya menjadi 60,15,7.5, dan 5 Pa. Jumlah kuadratnya dibagi 3 menghasilkan varians yang sama. Pemeriksaan ini memastikan tidak ada gain yang terlewat atau diterapkan dua kali.",
            en: "Refer each error half-width to the final output using the gains after its point of entry. Contributions become 60,15,7.5, and 5 Pa. Their squared sum divided by 3 gives the same variance, checking that no gain was omitted or applied twice.",
          },
          {
            id: "Bias jauh lebih besar daripada simpangan bakunya. Pengulangan banyak pengukuran dapat menaksir mean dengan lebih baik, tetapi tidak menghapus gain recorder yang salah.",
            en: "The bias is much larger than the standard deviation. Many repeats can estimate the mean more precisely, but cannot remove the incorrect recorder gain.",
          },
        ],
        math: "\\sigma_E^2=\\frac{60^2+15^2+7.5^2+5^2}{3}=1302.08333\\ \\mathrm{Pa^2}",
      },
    ],
    answer: {
      id: "Keluaran rata-rata 3750 Pa, sehingga galat rata-rata (indikasi −acuan) adalah −1250 Pa atau −25%. Dengan galat blok uniform, independen, bermean nol, dan gain recorder aktual 15 Pa/mV, simpangan baku galatnya 36.0844 Pa.",
      en: "Mean output is 3750 Pa, giving a mean error (indication −reference) of −1250 Pa or −25%. With independent zero-mean uniform block errors and the actual 15 Pa/mV recorder gain, error standard deviation is 36.0844 Pa.",
    },
    answerMath:
      "\\boxed{\\overline E=-1250\\ \\mathrm{Pa},\\qquad\\sigma_E\\approx36.08\\ \\mathrm{Pa}}",
    assumptions: [
      {
        id: "Masukan 5000 Pa dianggap acuan tetap tanpa ketidakpastian tambahan.",
        en: "The 5000 Pa input is treated as a fixed reference without additional uncertainty.",
      },
      {
        id: "Suku h²/3 pada rumus sumber diartikan sebagai galat uniform dalam ±h. Galat tambahan tiap blok dianggap independen dan bermean nol. Naskah tidak menyatakan distribusi ini dalam kalimat; asumsi mengikuti rumus yang diberikan.",
        en: "The source h²/3 term is interpreted as uniform error within ±h. Additive block errors are independent and zero-mean. The prose does not specify the distribution; this assumption follows the supplied formula.",
      },
      {
        id: "Untuk bagian(b), sistem tetap memakai recorder salah setel 15 Pa/mV dan lebar galat recorder ±5 Pa yang tercantum.",
        en: "For part(b), the system still uses the misadjusted 15 Pa/mV recorder and its listed ±5 Pa error half-width.",
      },
    ],
  },
  {
    id: "2025-uts1-q3",
    year: 2025,
    exam: "uts1",
    number: 3,
    topic: "dynamics",
    title: {
      id: "Amplitudo, fase, dan lebar pita sensor gaya",
      en: "Force-sensor amplitude, phase, and bandwidth",
    },
    source: {
      url: "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
      file: "2025-uts1.pdf",
      pages: [2],
    },
    originalLanguage: "en",
    original:
      "3. [25%] Dynamic Characteristics of Measurement Systems\nA force sensor is a typical second-order system with natural frequency of ωn = 1000 Hz and damping ratio coefficient of ζ = 0.7. The sensor is used to measure a sinusoidal force of 600 Hz.\na. [10%] Calculate the ratio between output and input amplitudes.\nb. [5%] Calculate the phase difference between output and input.\nc. [5%] Calculate the system dynamic amplitude error in percent.\nd. [5%] Determine the bandwidth of the force sensor.\nUseful formulas supplied on the same page:\n\\[G(s)=\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_ns+\\omega_n^2},\\qquad \\omega_b=\\omega_n\\sqrt{(1-2\\zeta^2)+\\sqrt{4\\zeta^4-4\\zeta^2+2}}.\\]",
    prompt: {
      id: "Sensor gaya mengikuti model orde dua. Naskah menulis frekuensi alami \\(\\omega_n=1000\\ \\mathrm{Hz}\\), dengan rasio redaman \\(\\zeta=0.7\\). Gaya masukan berbentuk sinus dengan frekuensi 600 Hz.\nTentukan (a) rasio amplitudo keluaran terhadap masukan, (b) selisih fase, (c) galat amplitudo dinamik dalam persen, dan (d) lebar pita sensor. Gunakan fungsi alih orde dua pada naskah. Perhatikan bahwa simbol ω biasanya memakai rad/s, sedangkan soal memberi Hz.",
      en: "The force sensor follows a second-order model. The paper writes natural frequency \\(\\omega_n=1000\\ \\mathrm{Hz}\\), with damping ratio \\(\\zeta=0.7\\). The input force is sinusoidal at 600 Hz.\nFind (a) the output-to-input amplitude ratio, (b) phase difference, (c) percentage dynamic amplitude error, and (d) sensor bandwidth. Use the supplied second-order transfer function. Note that ω conventionally uses rad/s, whereas the question gives Hz.",
    },
    visual: {
      kind: "frequency",
      params: {
        order: 2,
        fn: 1000,
        zeta: 0.7,
        frequency: 600,
      },
      caption: {
        id: "Ubah frekuensi masukan dan perhatikan perubahan amplitudo serta fase. Frekuensi alami pada kendali ini memakai Hz; gain statik model sama dengan 1.",
        en: "Change input frequency and inspect both amplitude and phase. The natural-frequency control uses Hz; the model has unit static gain.",
      },
    },
    steps: [
      {
        title: {
          id: "1. Tentukan apa yang berubah pada sinyal sinus",
          en: "1. Identify what changes in a sinusoidal signal",
        },
        body: [
          {
            id: "Kita membandingkan bentuk gelombang masukan dan keluaran setelah gejala awal mereda. Dalam keadaan tunak ini, frekuensi sinus tetap sama, tetapi tinggi puncak dan waktunya dapat berubah. **Rasio amplitudo** \\(M\\) membandingkan tinggi gelombang keluaran dengan masukan. **Fase** \\(\\phi\\) menyatakan pergeseran posisi gelombang dalam satu siklus, sehingga membantu menilai keterlambatan.",
            en: "We compare input and output waveforms after the initial transient has decayed. In this steady state, sinusoidal frequency stays the same, but peak height and timing can change. **Amplitude ratio** \\(M\\) compares output and input peak heights. **Phase** \\(\\phi\\) measures their shift within a cycle, letting you assess timing lag.",
          },
          {
            id: "Fungsi alih yang diberikan memiliki gain statik 1, karena \\(G(0)=1\\). Jadi, keluaran dalam pembahasan ini sudah dinormalkan terhadap sensitivitas statik sensor; kita tidak memerlukan nilai sensitivitas listrik lain.",
            en: "The supplied transfer function has static gain 1 because \\(G(0)=1\\). Output here is therefore normalized by the sensor’s static sensitivity; no separate electrical sensitivity is needed.",
          },
        ],
        math: "F_{\\rm in}=A\\sin(2\\pi ft),\\qquad F_{\\rm out,norm}=MA\\sin(2\\pi ft+\\phi)",
      },
      {
        title: {
          id: "2. Samakan jenis satuan frekuensi",
          en: "2. Use consistent frequency units",
        },
        body: [
          {
            id: "Naskah menulis \\(\\omega_n\\) tetapi memberi satuan Hz. Kita mengikuti angka dan satuan yang tertulis: frekuensi alami \\(f_n=1000\\ \\mathrm{Hz}\\). Jika memakai frekuensi sudut, ubah keduanya dengan \\(\\omega=2\\pi f\\).",
            en: "The paper uses \\(\\omega_n\\) but gives Hz. We follow its stated numerical value and unit: natural frequency \\(f_n=1000\\ \\mathrm{Hz}\\). If angular frequencies are used, convert both with \\(\\omega=2\\pi f\\).",
          },
          {
            id: "Rasio frekuensi \\(r\\) tetap sama karena faktor \\(2\\pi\\) saling menghapus. Jangan membagi satu nilai dalam rad/s dengan nilai lain dalam Hz.",
            en: "The frequency ratio \\(r\\) is unchanged because the \\(2\\pi\\) factors cancel. Do not divide a rad/s value by a Hz value.",
          },
        ],
        math: "\\omega_n=2\\pi(1000)=6283.19\\ \\mathrm{rad/s},\\quad\\omega=2\\pi(600)=3769.91\\ \\mathrm{rad/s}\\\\r=\\frac{\\omega}{\\omega_n}=\\frac{f}{f_n}=\\frac{600}{1000}=0.6",
      },
      {
        title: {
          id: "3. Bentuk respons frekuensi dari fungsi alih",
          en: "3. Obtain the frequency response from the transfer function",
        },
        body: [
          {
            id: "Untuk masukan sinus, gantikan \\(s\\) dengan \\(j\\omega\\). Huruf \\(j\\) menyatakan akar dari −1; karena \\(j^2=-1\\), suku \\(s^2\\) berubah menjadi \\(-\\omega^2\\). Bagi pembilang dan penyebut dengan \\(\\omega_n^2\\) agar persamaan hanya memakai rasio \\(r\\).",
            en: "For a sinusoidal input, replace \\(s\\) by \\(j\\omega\\). Here \\(j\\) is the square root of −1, so \\(j^2=-1\\) turns \\(s^2\\) into \\(-\\omega^2\\). Divide numerator and denominator by \\(\\omega_n^2\\) to express the result using ratio \\(r\\).",
          },
        ],
        math: "G(j\\omega)=\\frac{\\omega_n^2}{\\omega_n^2-\\omega^2+j2\\zeta\\omega_n\\omega}=\\frac1{(1-r^2)+j(2\\zeta r)}\\\\1-r^2=1-0.6^2=0.64,\\qquad2\\zeta r=2(0.7)(0.6)=0.84",
      },
      {
        title: {
          id: "4. Hitung rasio amplitudo dari besar bilangan kompleks",
          en: "4. Calculate amplitude ratio from the complex magnitude",
        },
        body: [
          {
            id: "Besar penyebut \\(0.64+j0.84\\) ialah akar jumlah kuadrat kedua bagiannya. Pembilangnya bernilai 1. Oleh karena itu, rasio amplitudo merupakan kebalikan besar penyebut itu.",
            en: "The magnitude of denominator \\(0.64+j0.84\\) is the square root of the sum of its two squared components. With numerator 1, the amplitude ratio is the reciprocal of that magnitude.",
          },
          {
            id: "Jadi, amplitudo keluaran sekitar 94.69% dari amplitudo ideal setelah koreksi sensitivitas statik. Sebagai contoh, jika amplitudo acuan 1 N, indikasi amplitudonya sekitar 0.9469 N.",
            en: "The output amplitude is therefore about 94.69% of the ideal amplitude after static-sensitivity correction. For an illustrative 1 N input amplitude, the indicated amplitude is about 0.9469 N.",
          },
        ],
        math: "M=|G|=\\frac1{\\sqrt{(1-r^2)^2+(2\\zeta r)^2}}=\\frac1{\\sqrt{0.64^2+0.84^2}}=\\frac1{\\sqrt{1.1152}}=0.9469425",
      },
      {
        title: {
          id: "5. Hitung fase dan jelaskan arti tanda negatif",
          en: "5. Calculate phase and explain the negative sign",
        },
        body: [
          {
            id: "Penyebut mempunyai sudut positif. Fungsi alih membagi dengan penyebut tersebut, sehingga fase keluaran menjadi negatif. Gunakan \\(\\operatorname{atan2}\\) agar pilihan kuadran tetap benar saat frekuensi melintasi frekuensi alami.",
            en: "The denominator has a positive angle. Dividing by it makes the output phase negative. Use \\(\\operatorname{atan2}\\) so the quadrant remains correct when frequency crosses the natural frequency.",
          },
          {
            id: "Fase −52.70° berarti keluaran tertinggal terhadap masukan. Pada 600 Hz, selang waktu antara puncak yang bersesuaian sekitar 0.244 ms. Pengaruh tersebut berbeda dari besarnya penurunan amplitudo.",
            en: "A phase of −52.70° means the output lags the input. At 600 Hz, corresponding peaks are about 0.244 ms apart. This describes a different error from the amplitude reduction.",
          },
        ],
        math: "\\phi=-\\operatorname{atan2}(0.84,0.64)=-52.6961^\\circ\\\\\\Delta t=\\frac{52.6961}{360(600)}=2.43963\\times10^{-4}\\ \\mathrm s",
      },
      {
        title: {
          id: "6. Ubah selisih amplitudo menjadi persen",
          en: "6. Express the amplitude difference as a percentage",
        },
        body: [
          {
            id: "Amplitudo ideal yang telah dinormalkan mempunyai rasio 1. Kurangi 1 dari \\(M\\), lalu kalikan 100%. Tanda negatif menyatakan amplitudo terbaca lebih kecil; bila yang diminta hanya besar galat, laporkan nilai mutlaknya.",
            en: "The normalized ideal amplitude ratio is 1. Subtract 1 from \\(M\\) and multiply by 100%. A negative sign indicates an under-read amplitude; if only error magnitude is requested, report its absolute value.",
          },
          {
            id: "Fase tidak masuk ke rumus galat amplitudo ini. Dua sinyal dapat memiliki amplitudo hampir sama sekaligus berbeda fase cukup besar.",
            en: "Phase does not enter this amplitude-error formula. Two signals can have nearly equal amplitudes while differing substantially in phase.",
          },
        ],
        math: "\\varepsilon_A=(M-1)100\\%=(0.9469425-1)100\\%=-5.30575\\%\\\\|\\varepsilon_A|=5.30575\\%",
      },
      {
        title: {
          id: "7. Tentukan arti lebar pita yang digunakan",
          en: "7. Define the bandwidth convention",
        },
        body: [
          {
            id: "Kita memakai batas setengah daya relatif terhadap gain statik. Pada batas ini, amplitudo turun ke \\(1/\\sqrt2\\) dari nilai frekuensi rendah. Batas ini lazim disebut −3 dB, tepatnya −3.0103 dB. Dengan definisi ini, lebar pita dimulai dari 0 Hz dan berakhir di \\(f_b\\). Ukuran ini bukan batas ketika galat amplitudo masih 5%; syarat itu akan memberi frekuensi lain.",
            en: "We use the half-power boundary relative to static gain. At this boundary, amplitude falls to \\(1/\\sqrt2\\) of its low-frequency value. This boundary is commonly called −3 dB, or exactly −3.0103 dB. The bandwidth then extends from 0 Hz to \\(f_b\\). A 5%-amplitude-error limit would give a different frequency from this bandwidth definition.",
          },
        ],
        math: "M(r_b)=\\frac1{\\sqrt2}\\quad\\Longrightarrow\\quad(1-r_b^2)^2+4\\zeta^2r_b^2=2",
      },
      {
        title: {
          id: "8. Selesaikan batas lebar pita tanpa melewati aljabarnya",
          en: "8. Solve the bandwidth boundary step by step",
        },
        body: [
          {
            id: "Kembangkan kuadrat, pindahkan 2 ke ruas kiri, lalu gunakan \\(u=r_b^2\\). Persamaan menjadi kuadrat dalam \\(u\\). Pilih akar positif karena \\(r_b^2\\) tidak mungkin negatif, kemudian ambil akar lagi untuk memperoleh \\(r_b\\).",
            en: "Expand the square, move 2 to the left, and set \\(u=r_b^2\\). The substitution gives a quadratic in \\(u\\). Choose its positive root because \\(r_b^2\\) cannot be negative, then take another square root to obtain \\(r_b\\).",
          },
        ],
        math: "r_b^4+(4\\zeta^2-2)r_b^2-1=0\\\\u^2+(4(0.7)^2-2)u-1=u^2-0.04u-1=0\\\\u=0.02+\\sqrt{1.0004}=1.02019998\\\\r_b=\\sqrt u=1.01004949",
      },
      {
        title: {
          id: "9. Kembalikan rasio ke Hz dan cek hasilnya",
          en: "9. Convert the ratio to Hz and check the result",
        },
        body: [
          {
            id: "Kalikan \\(r_b\\) dengan frekuensi alami 1000 Hz. Hasilnya sedikit di atas 1000 Hz. Hal ini masuk akal: tepat pada frekuensi alami, rasio amplitudo \\(1/(2\\zeta)=0.7143\\), yang masih sedikit di atas batas 0.7071.",
            en: "Multiply \\(r_b\\) by the 1000 Hz natural frequency. The result lies slightly above 1000 Hz. At the natural frequency, amplitude ratio \\(1/(2\\zeta)=0.7143\\) remains just above the 0.7071 cutoff. The slightly higher cutoff frequency is therefore consistent.",
          },
          {
            id: "Sinyal 600 Hz masih di dalam lebar pita −3 dB. Namun, amplitudonya tetap turun 5.31% dan fasenya tertinggal 52.70°. Berada di dalam lebar pita tidak berarti bebas galat.",
            en: "The 600 Hz signal is within the −3 dB bandwidth, yet still has 5.31% amplitude loss and 52.70° phase lag. Being inside the bandwidth does not mean error-free measurement.",
          },
        ],
        math: "f_b=r_bf_n=1.01004949(1000)=1010.0495\\ \\mathrm{Hz}\\approx1.010\\ \\mathrm{kHz}",
      },
    ],
    answer: {
      id: "Rasio amplitudo 0.946943; fase keluaran −52.696° terhadap masukan. Galat amplitudo bertanda −5.30575% (besar galat 5.30575%). Dengan batas setengah daya dan frekuensi alami 1000 Hz, lebar pita sekitar 0 sampai 1010.05 Hz.",
      en: "Amplitude ratio 0.946943; output phase −52.696° relative to input. Signed amplitude error −5.30575% (magnitude 5.30575%). Using the half-power definition and a 1000 Hz natural frequency, bandwidth is approximately 0 to 1010.05 Hz.",
    },
    answerMath:
      "\\boxed{M=0.946943,\\quad\\phi=-52.696^\\circ,\\quad\\varepsilon_A=-5.30575\\%,\\quad f_b=1010.05\\ \\mathrm{Hz}}",
    assumptions: [
      {
        id: "Angka 1000 diberi satuan Hz pada naskah, sehingga diartikan sebagai fn=1000 Hz meskipun simbolnya tertulis ωn. Frekuensi sudutnya 2π×1000 rad/s.",
        en: "The paper assigns Hz to 1000, so it is interpreted as fn=1000 Hz despite the symbol ωn. Its angular frequency is 2π×1000 rad/s.",
      },
      {
        id: "Gunakan keadaan tunak sinusoidal, model linear orde dua dengan gain statik 1, dan batas setengah daya terhadap gain statik.",
        en: "Use sinusoidal steady state, a linear second-order model with unit static gain, and bandwidth defined by the half-power point relative to static gain.",
      },
      {
        id: "Galat amplitudo bertanda memakai keluaran dikurangi ideal. Nilai mutlak menyatakan besar galat.",
        en: "Signed amplitude error uses output minus ideal; its absolute value gives the error magnitude.",
      },
    ],
  },
  {
    id: "2025-uts1-q4",
    year: 2025,
    exam: "uts1",
    number: 4,
    topic: "calibration",
    title: {
      id: "Histeresis sensor tinggi cairan",
      en: "Liquid-level sensor hysteresis",
    },
    source: {
      url: "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
      file: "2025-uts1.pdf",
      pages: [2],
    },
    originalLanguage: "en",
    original:
      "4. [15%] Systematic Characteristics of Measurement Systems: Hysteresis\nA liquid level sensor has an input range of 0 to 24 cm. By using the calibration results given in the following table, estimate the maximum hysteresis as a percentage of f.s.d.\nLevel h (cm): 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24.\nOutput voltage (V), h increasing: 0.0, 2.4, 5.3, 8.1, 10.8, 13.7, 17.2, 20.3, 23.5, 26.7, 29.9, 33.2, 36.8.\nOutput voltage (V), h decreasing: 0.3, 2.9, 6.0, 9.0, 11.6, 14.4, 18.2, 21.5, 24.7, 27.5, 30.7, 34.2, 36.8.",
    prompt: {
      id: "Sensor tinggi cairan memiliki rentang 0 sampai 24 cm. Kalibrasi memberi dua keluaran pada tinggi yang sama, masing-masing saat cairan naik dan turun.\nh (cm): 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24.\nTegangan saat naik (V): 0.0, 2.4, 5.3, 8.1, 10.8, 13.7, 17.2, 20.3, 23.5, 26.7, 29.9, 33.2, 36.8.\nTegangan saat turun (V): 0.3, 2.9, 6.0, 9.0, 11.6, 14.4, 18.2, 21.5, 24.7, 27.5, 30.7, 34.2, 36.8.\nTaksir histeresis maksimum sebagai persen simpangan skala penuh (f.s.d.).",
      en: "The level sensor has a 0 to 24 cm input range. Calibration provides outputs while liquid level rises and falls at the same heights.\nh (cm): 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24.\nRising-level voltage (V): 0.0, 2.4, 5.3, 8.1, 10.8, 13.7, 17.2, 20.3, 23.5, 26.7, 29.9, 33.2, 36.8.\nFalling-level voltage (V): 0.3, 2.9, 6.0, 9.0, 11.6, 14.4, 18.2, 21.5, 24.7, 27.5, 30.7, 34.2, 36.8.\nEstimate maximum hysteresis as a percentage of full-scale deflection (f.s.d.).",
    },
    visual: {
      kind: "hysteresis",
      params: {
        levels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
        rising: [
          0, 2.4, 5.3, 8.1, 10.8, 13.7, 17.2, 20.3, 23.5, 26.7, 29.9, 33.2,
          36.8,
        ],
        falling: [
          0.3, 2.9, 6, 9, 11.6, 14.4, 18.2, 21.5, 24.7, 27.5, 30.7, 34.2, 36.8,
        ],
        level: 14,
      },
      caption: {
        id: "Bandingkan dua tegangan pada tinggi yang sama. Celah vertikal terbesar pada data ialah 1.2 V di 14 cm dan 16 cm.",
        en: "Compare the two voltages at the same level. The largest sampled vertical separation is 1.2 V at 14 cm and 16 cm.",
      },
    },
    steps: [
      {
        title: {
          id: "1. Kenali pasangan data yang harus dibandingkan",
          en: "1. Identify which measurements to compare",
        },
        body: [
          {
            id: "Keluaran sensor dapat berbeda pada tinggi yang sama karena arah perubahan sebelumnya berbeda. **Histeresis** (perbedaan keluaran akibat riwayat arah masukan) mengukur pengaruh tersebut. Kita membandingkan tegangan saat cairan naik dan turun pada satu \\(h\\). Anda tidak perlu membuat garis lurus acuan untuk menghitung selisih kedua arah.",
            en: "At the same height, output can differ because the preceding direction of change differs. **Hysteresis** is the output difference caused by that input history. We compare rising and falling voltages at one value of \\(h\\). You do not need a straight reference line to find this separation.",
          },
          {
            id: "Contoh: pada 14 cm, sensor memberi 20.3 V saat naik dan 21.5 V saat turun. Tingginya sama; arah sebelumnya yang berbeda.",
            en: "For example, at 14 cm the sensor gives 20.3 V while rising and 21.5 V while falling. The height is the same; the preceding direction differs.",
          },
        ],
        table: {
          headers: [
            {
              id: "h (cm)",
              en: "h (cm)",
            },
            {
              id: "Naik (V)",
              en: "Rising (V)",
            },
            {
              id: "Turun (V)",
              en: "Falling (V)",
            },
          ],
          rows: [
            ["0", "0.0", "0.3"],
            ["2", "2.4", "2.9"],
            ["4", "5.3", "6.0"],
            ["6", "8.1", "9.0"],
            ["8", "10.8", "11.6"],
            ["10", "13.7", "14.4"],
            ["12", "17.2", "18.2"],
            ["14", "20.3", "21.5"],
            ["16", "23.5", "24.7"],
            ["18", "26.7", "27.5"],
            ["20", "29.9", "30.7"],
            ["22", "33.2", "34.2"],
            ["24", "36.8", "36.8"],
          ],
        },
      },
      {
        title: {
          id: "2. Hitung selisih mutlak di setiap tinggi",
          en: "2. Calculate the absolute difference at each height",
        },
        body: [
          {
            id: "Definisikan \\(H(h)\\) sebagai jarak vertikal kedua kurva pada tinggi \\(h\\). Nilai mutlak membuat ukuran histeresis tetap positif, apa pun kurva yang lebih tinggi. Pada 14 cm, hitung 21.5−20.3=1.2 V.",
            en: "Define \\(H(h)\\) as the vertical separation between the two curves at height \\(h\\). The absolute value keeps hysteresis magnitude positive whichever curve is higher. At 14 cm,21.5−20.3=1.2 V.",
          },
        ],
        math: "H(h)=|O_{\\downarrow}(h)-O_{\\uparrow}(h)|",
        table: {
          headers: [
            {
              id: "h (cm)",
              en: "h (cm)",
            },
            {
              id: "|Turun − naik| (V)",
              en: "|Falling − rising| (V)",
            },
          ],
          rows: [
            ["0", "0.3"],
            ["2", "0.5"],
            ["4", "0.7"],
            ["6", "0.9"],
            ["8", "0.8"],
            ["10", "0.7"],
            ["12", "1.0"],
            ["14", "1.2"],
            ["16", "1.2"],
            ["18", "0.8"],
            ["20", "0.8"],
            ["22", "1.0"],
            ["24", "0.0"],
          ],
        },
      },
      {
        title: {
          id: "3. Ambil celah terbesar, bukan hanya selisih di ujung",
          en: "3. Take the largest separation, not only endpoint differences",
        },
        body: [
          {
            id: "Dari seluruh baris, nilai tertinggi adalah 1.2 V dan muncul dua kali: pada 14 cm serta 16 cm. Selisih 0.3 V pada 0 cm dan 0 V pada 24 cm tidak mewakili celah terbesar di tengah rentang.",
            en: "The largest value across the rows is 1.2 V, occurring twice: at 14 cm and 16 cm. The 0.3 V difference at 0 cm and 0 V difference at 24 cm do not capture the larger separation inside the range.",
          },
        ],
        math: "H_{\\max}=1.2\\ \\mathrm V\\qquad(h=14\\ \\mathrm{cm}\\ \\text{or}\\ 16\\ \\mathrm{cm})",
      },
      {
        title: {
          id: "4. Pilih span keluaran agar satuan saling hapus",
          en: "4. Choose the output span so units cancel",
        },
        body: [
          {
            id: "Pembilang kita berupa tegangan, maka penyebut juga harus berupa tegangan. Span keluaran penuh pada tabel ialah 36.8−0=36.8 V. Membagi 1.2 V langsung dengan rentang masukan 24 cm akan menghasilkan V/cm, bukan persen.",
            en: "The numerator is a voltage, so the denominator must also be a voltage. The full output span in the table is 36.8−0=36.8 V. Dividing 1.2 V directly by the 24 cm input range would give V/cm, not a percentage.",
          },
        ],
        math: "O_{\\rm span}=36.8-0=36.8\\ \\mathrm V",
      },
      {
        title: {
          id: "5. Nyatakan histeresis sebagai persen skala penuh",
          en: "5. Express hysteresis as a percentage of full scale",
        },
        body: [
          {
            id: "Bagi celah maksimum dengan span keluaran, lalu kalikan 100%. Gunakan celah penuh 1.2 V: soal meminta histeresis maksimum, bukan simpangan ±terhadap garis tengah kedua kurva.",
            en: "Divide maximum separation by output span and multiply by 100%. Use the full 1.2 V separation: the question asks maximum hysteresis, not a ±deviation around the curves’ midpoint.",
          },
        ],
        math: "H_{\\%\\mathrm{fsd}}=\\frac{1.2\\ \\mathrm V}{36.8\\ \\mathrm V}\\,100\\%=3.2608696\\%\\approx3.26\\%",
      },
      {
        title: {
          id: "6. Tafsirkan hasil dan batas taksirannya",
          en: "6. Interpret the result and its sampling limit",
        },
        body: [
          {
            id: "Pada data ini, riwayat arah perubahan dapat mengubah tegangan hingga 1.2 V untuk tinggi cairan yang sama. Histeresis berbeda dari ketaklinieran: ketaklinieran membandingkan keluaran terhadap garis acuan, sedangkan histeresis membandingkan dua arah pada masukan yang sama.",
            en: "In these data, direction history changes the voltage by as much as 1.2 V at the same liquid level. Hysteresis differs from nonlinearity: nonlinearity compares output with a reference line, whereas hysteresis compares the two directions at the same input.",
          },
          {
            id: "Hasil 3.26% merupakan taksiran dari titik tabel. Tanpa data yang lebih rapat, kita belum mengetahui apakah celah di antara titik-titik itu lebih besar.",
            en: "The 3.26% result is an estimate from the tabulated points. Denser measurements would be needed to determine whether a larger separation occurs between them.",
          },
        ],
      },
    ],
    answer: {
      id: "Histeresis maksimum pada titik terukur ialah 1.2 V, terjadi pada 14 cm dan 16 cm. Dengan span keluaran 36.8 V, histeresis maksimum sekitar 3.26% f.s.d.",
      en: "Maximum sampled hysteresis is 1.2 V, at 14 cm and 16 cm. Relative to the 36.8 V output span, maximum hysteresis is approximately 3.26% f.s.d.",
    },
    answerMath:
      "\\boxed{H_{\\max}=1.2\\ \\mathrm V,\\qquad H_{\\%\\mathrm{fsd}}=3.26087\\%}",
    assumptions: [
      {
        id: "Gunakan selisih penuh dua kurva pada masukan yang sama dan span keluaran 36.8 V.",
        en: "Use the full separation of the two curves at the same input and a 36.8 V output span.",
      },
      {
        id: "Maksimum berarti maksimum pada titik kalibrasi yang tersedia; perilaku di antara titik tidak diberikan.",
        en: "Maximum refers to the available calibration points; behavior between them is not supplied.",
      },
    ],
  },
  {
    id: "2025-uts1-q5",
    year: 2025,
    exam: "uts1",
    number: 5,
    topic: "signal",
    title: {
      id: "Filter lolos rendah pasif dan aktif",
      en: "Passive and active low-pass filters",
    },
    source: {
      url: "https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view",
      file: "2025-uts1.pdf",
      pages: [2],
    },
    originalLanguage: "en",
    original:
      "5. [10%] Practicum Questions: Active and Passive Low Pass Filter\na. [5%] Based on the practicum, what are the differences between passive and active low pass filters?\nb. [5%] Draw the schematic diagram of an active low pass filter you did in the practicum?",
    prompt: {
      id: "(a) Berdasarkan praktikum, jelaskan perbedaan filter lolos rendah pasif dan aktif. (b) Gambar skema filter lolos rendah aktif yang digunakan dalam praktikum.\nNaskah tidak menyertakan skema atau nilai komponen praktikum. Pembahasan memberi contoh sah berupa RC diikuti penguat tak membalik; sesuaikan dengan rangkaian praktikum yang benar-benar dipakai.",
      en: "(a) Based on the practicum, explain the differences between passive and active low-pass filters. (b) Draw the active low-pass filter schematic used in the practicum.\nThe paper does not include the practicum circuit or component values. This solution gives a valid example: an RC section followed by a non-inverting amplifier. Match the submitted schematic to the circuit actually used in the practicum.",
    },
    visual: {
      kind: "lowpass",
      params: {
        R: 10000,
        C: 1e-7,
        gain: 2,
        frequency: 100,
      },
      caption: {
        id: "Contoh ilustratif: R = 10 kΩ, C = 100 nF, dan gain penguat 2. Amati RC yang memilih frekuensi serta penguat yang mengurangi pengaruh beban. Skema praktikum asli tidak tersedia dalam naskah.",
        en: "Illustrative example: R = 10 kΩ, C = 100 nF, and amplifier gain 2. Observe how the RC section selects frequencies and the amplifier reduces loading. The paper does not provide the original practicum schematic.",
      },
    },
    steps: [
      {
        title: {
          id: "1. Mulai dari tujuan filter lolos rendah",
          en: "1. Start with the purpose of a low-pass filter",
        },
        body: [
          {
            id: "Anda mungkin ingin membaca suhu yang berubah lambat sambil menekan gangguan listrik yang cepat. **Filter lolos rendah** (rangkaian yang melewatkan frekuensi rendah dan melemahkan frekuensi tinggi) membantu tugas tersebut. Kita membandingkan rangkaian pasif dan aktif untuk tujuan yang sama. Filter nyata menurunkan amplitudo secara bertahap, bukan memutusnya seketika pada satu frekuensi.",
            en: "You may want to measure slowly changing temperature while reducing faster electrical interference. A **low-pass filter** is a circuit that preserves low frequencies and attenuates high frequencies for this purpose. We compare passive and active circuits that perform this task. A real filter reduces amplitude gradually, rather than cutting it off abruptly at one frequency.",
          },
          {
            id: "Frekuensi batas \\(f_c\\) memberi patokan penurunan tersebut. Untuk RC orde satu, amplitudo pada \\(f_c\\) adalah \\(1/\\sqrt2\\) dari nilai frekuensi rendah. Penurunan tersebut tepatnya −3.0103 dB, lazim disebut −3 dB.",
            en: "The cutoff \\(f_c\\) provides a reference for that attenuation. For a first-order RC filter, amplitude at \\(f_c\\) is \\(1/\\sqrt2\\) of its low-frequency value. This drop is exactly −3.0103 dB, commonly called −3 dB.",
          },
        ],
      },
      {
        title: {
          id: "2. Jelaskan cara kerja contoh pasif RC",
          en: "2. Explain how a passive RC example works",
        },
        body: [
          {
            id: "Hubungkan resistor \\(R\\) seri dari masukan menuju simpul keluaran, lalu kapasitor \\(C\\) dari simpul itu ke ground. Ambil keluaran pada kapasitor. Pada frekuensi rendah, impedansi kapasitor besar sehingga tegangan simpul mendekati masukan; saat frekuensi naik, impedansi kapasitor turun dan tegangan simpul mengecil.",
            en: "Connect resistor \\(R\\) in series from input to the output node, and capacitor \\(C\\) from that node to ground. Measure the voltage across the capacitor. At low frequency, capacitor impedance is large and the node voltage approaches the input; at higher frequency, capacitor impedance falls and the node voltage decreases.",
          },
          {
            id: "Rangkaian RC ini tidak memerlukan catu untuk komponen aktif dan tidak memberi penguatan tegangan di atas 1 pada kondisi ideal tanpa beban. Namun, tahanan sumber dan beban dapat mengubah responsnya.",
            en: "This RC circuit needs no active-component supply and has no voltage gain above 1 under ideal unloaded conditions. Source and load resistance can nevertheless alter its response.",
          },
        ],
      },
      {
        title: {
          id: "3. Jelaskan tambahan fungsi komponen aktif",
          en: "3. Explain what the active component adds",
        },
        body: [
          {
            id: "Filter aktif memakai komponen berdaya, misalnya op-amp. Masukan op-amp yang berimpedansi tinggi dapat mengurangi beban pada bagian RC. Keluarannya dapat menggerakkan beban berikutnya, dan umpan balik dapat memberi penguatan tegangan jika dibutuhkan.",
            en: "An active filter uses a powered component such as an op-amp. Its high input impedance can reduce loading of the RC section. Its output can drive the next stage, while feedback can provide voltage gain if needed.",
          },
          {
            id: "Penguat tetap memiliki batas: catu, rentang tegangan keluaran, lebar pita, dan laju perubahan tegangan maksimum. Oleh karena itu, rancangan aktif tidak otomatis menjaga semua amplitudo atau semua frekuensi.",
            en: "The amplifier still has limits: supply rails, output voltage range, bandwidth, and maximum rate of voltage change. An active design therefore cannot preserve every amplitude at every frequency.",
          },
        ],
      },
      {
        title: {
          id: "4. Bandingkan kedua jenis dengan kondisi yang jelas",
          en: "4. Compare the two types under stated conditions",
        },
        body: [
          {
            id: "Perbandingan berikut berlaku untuk contoh RC sederhana dan RC yang diikuti op-amp. Filter pasif lain dapat memakai induktor, dan filter aktif lain dapat memakai susunan orde lebih tinggi.",
            en: "The comparison below concerns a simple RC section and an RC section followed by an op-amp. Other passive filters can use inductors, and other active filters can have higher-order topologies.",
          },
        ],
        table: {
          headers: [
            {
              id: "Aspek",
              en: "Aspect",
            },
            {
              id: "RC pasif",
              en: "Passive RC",
            },
            {
              id: "RC + op-amp aktif",
              en: "Active RC + op-amp",
            },
          ],
          rows: [
            ["Komponen / Components", "R, C", "R, C, op-amp"],
            ["Catu aktif / Active supply", "Tidak / No", "Ya / Yes"],
            [
              "Gain frekuensi rendah / Low-frequency gain",
              "≤ 1 untuk RC ini / for this RC",
              "Dapat ≥ 1 / Can be ≥ 1",
            ],
            [
              "Pengaruh beban / Loading",
              "Sumber dan beban mengubah respons / Source and load affect response",
              "Op-amp mengurangi beban pada RC / Op-amp reduces RC loading",
            ],
            [
              "Batas utama / Main limits",
              "Nilai R, C serta sumber/beban / R, C and source/load",
              "R, C serta catu dan batas op-amp / R, C and op-amp limits",
            ],
          ],
        },
      },
      {
        title: {
          id: "5. Gambar bagian RC dan masukan op-amp",
          en: "5. Draw the RC section and op-amp input",
        },
        body: [
          {
            id: "Untuk contoh aktif, pertahankan resistor seri dan kapasitor ke ground seperti contoh pasif. Hubungkan simpul kapasitor ke masukan tak membalik \\((+)\\) op-amp. Ambil keluaran akhir pada pin keluaran op-amp, bukan langsung pada simpul RC.",
            en: "For the active example, keep the series resistor and grounded capacitor from the passive circuit. Connect the capacitor node to the op-amp non-inverting \\((+)\\) input. Take the final output from the op-amp output pin, not directly from the RC node.",
          },
          {
            id: "Masukan op-amp ideal tidak mengambil arus. Oleh karena itu, bagian RC menentukan respons frekuensi dan op-amp menjaga agar beban keluaran tidak langsung membebani kapasitor. Pada komponen nyata, asumsi ini berlaku saat impedansi masukan cukup tinggi.",
            en: "An ideal op-amp input draws no current. The RC section therefore sets the frequency response while the op-amp prevents the output load from directly loading the capacitor. For real parts, this approximation requires sufficiently high input impedance.",
          },
        ],
      },
      {
        title: {
          id: "6. Lengkapi umpan balik dan catu",
          en: "6. Complete the feedback and supply connections",
        },
        body: [
          {
            id: "Hubungkan resistor \\(R_f\\) dari keluaran ke masukan membalik \\((- )\\), serta \\(R_g\\) dari masukan membalik ke ground. Sambungan ini memberi umpan balik negatif dan penguatan frekuensi rendah \\(A_v=1+R_f/R_g\\). Gambarkan juga pin catu op-amp dan acuan ground bersama.",
            en: "Connect resistor \\(R_f\\) from output to the inverting \\((- )\\) input, and \\(R_g\\) from the inverting input to ground. This connection provides negative feedback and low-frequency gain \\(A_v=1+R_f/R_g\\). Also show the op-amp supply pins and a common ground reference.",
          },
          {
            id: "Untuk contoh gain 2, pilih \\(R_f=R_g\\), misalnya masing-masing 10 kΩ. Jika hanya butuh penyangga dengan gain 1, keluaran dapat langsung terhubung ke masukan membalik. Keduanya contoh filter aktif yang sah.",
            en: "For the example gain of 2, choose \\(R_f=R_g\\), for example 10 kΩ each. For a unity-gain buffer, the output can instead connect directly to the inverting input. Both are valid active-filter examples.",
          },
        ],
        math: "A_v=1+\\frac{R_f}{R_g}=1+\\frac{10\\ \\mathrm{k\\Omega}}{10\\ \\mathrm{k\\Omega}}=2",
      },
      {
        title: {
          id: "7. Hubungkan skema dengan respons yang diharapkan",
          en: "7. Connect the schematic to the expected response",
        },
        body: [
          {
            id: "RC memberi faktor \\(1/(1+sRC)\\), sedangkan penguat tak membalik memberi faktor \\(A_v\\) selama op-amp bekerja dalam batasnya. Kalikan keduanya untuk mendapat fungsi alih. Pada frekuensi rendah gain mendekati \\(A_v\\); pada frekuensi tinggi RC menurunkannya.",
            en: "The RC section contributes \\(1/(1+sRC)\\), while the non-inverting amplifier contributes \\(A_v\\) while operating within its limits. Multiply them for the transfer function. At low frequency, gain approaches \\(A_v\\); at high frequency, the RC section attenuates it.",
          },
          {
            id: "Nilai pada visual hanya contoh: \\(R=10\\ \\mathrm{k\\Omega}\\) dan \\(C=100\\ \\mathrm{nF}\\) memberi \\(RC=0.001\\ \\mathrm s\\) serta \\(f_c\\approx159.15\\ \\mathrm{Hz}\\). Angka ini tidak berasal dari naskah praktikum.",
            en: "The visual values are illustrative: \\(R=10\\ \\mathrm{k\\Omega}\\) and \\(C=100\\ \\mathrm{nF}\\) give \\(RC=0.001\\ \\mathrm s\\) and \\(f_c\\approx159.15\\ \\mathrm{Hz}\\). These values are not supplied by the practicum paper.",
          },
        ],
        math: "H(s)=\\frac{A_v}{1+sRC},\\qquad f_c=\\frac1{2\\pi RC}=\\frac1{2\\pi(10^4)(10^{-7})}=159.15\\ \\mathrm{Hz}",
      },
      {
        title: {
          id: "8. Cek skema dan kaitkan dengan praktikum yang sebenarnya",
          en: "8. Check the schematic against the actual practicum",
        },
        body: [
          {
            id: "Pastikan kapasitor menghubungkan simpul RC ke ground, keluaran op-amp memberi umpan balik ke masukan membalik, dan op-amp mendapat catu. Pada frekuensi rendah, contoh ini harus mendekati gain 2; saat frekuensi naik jauh di atas batas, gain harus turun.",
            en: "Check that the capacitor connects the RC node to ground, the op-amp output feeds back to its inverting input, and the op-amp has power. At low frequency, this example should approach gain 2; well above cutoff, gain should decrease.",
          },
          {
            id: "Naskah tidak menunjukkan rangkaian praktikum yang sebenarnya. Jika praktikum memakai susunan lain, gunakan catatan praktikum untuk menggambar sambungan serta nilai komponennya. Contoh di sini menjelaskan prinsip dan tidak mengklaim menyalin rangkaian tersebut.",
            en: "The paper does not show the actual practicum circuit. If the practicum used another topology, use the lab notes for its connections and component values. This example explains the principle without claiming to reproduce that circuit.",
          },
        ],
      },
    ],
    answer: {
      id: "Filter RC pasif memakai R dan C, tidak memerlukan catu aktif, dan responsnya dapat berubah akibat sumber serta beban. Filter aktif menambah komponen berdaya seperti op-amp untuk mengurangi beban dan memberi penguatan, dengan batas catu serta respons op-amp. Contoh sah: RC masuk ke pin+ op-amp, Rf dari keluaran ke pin −, Rg dari pin − ke ground, dengan catu yang jelas. Skema praktikum asli tidak tersedia dalam naskah.",
      en: "A passive RC filter uses R and C, needs no active supply, and can be affected by source and load impedance. An active filter adds a powered component such as an op-amp to reduce loading and provide gain, subject to supply and amplifier-response limits. A valid example connects the RC node to the+ input, Rf from output to − input, and Rg from − input to ground, with the supply shown. The actual practicum schematic is not provided.",
    },
    answerMath:
      "\\boxed{H(s)=\\frac{1+R_f/R_g}{1+sRC},\\qquad f_c=\\frac1{2\\pi RC}}",
    assumptions: [
      {
        id: "Rangkaian RC diikuti penguat tak membalik ialah contoh, bukan salinan rangkaian praktikum yang tidak disertakan.",
        en: "The RC section followed by a non-inverting amplifier is an example, not a reproduction of an unavailable practicum circuit.",
      },
      {
        id: "Nilai R=10 kΩ, C=100 nF, Rf=Rg=10 kΩ hanya ilustrasi. Model menganggap sumber ideal, masukan op-amp berimpedansi tinggi, dan op-amp bekerja dalam batas catu serta lebar pitanya.",
        en: "R=10 kΩ, C=100 nF, and Rf=Rg=10 kΩ are illustrative values. The model assumes an ideal source, high op-amp input impedance, and operation within supply and bandwidth limits.",
      },
    ],
  },
];

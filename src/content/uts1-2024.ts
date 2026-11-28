import type { ExamQuestion } from "./types";

export const questionsUts12024: ExamQuestion[] = [
  {
    id: "2024-uts1-q1",
    year: 2024,
    exam: "uts1",
    number: 1,
    title: {
      id: "Hambatan termistor dari dua titik kalibrasi",
      en: "Thermistor resistance from two calibration points",
    },
    topic: "temperature",
    source: {
      url: "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
      file: "2024-uts1.pdf",
      pages: [1],
    },
    original:
      "1. [5%] The resistance \\(R(\\theta)\\) of a thermistor at temperature \\(\\theta\\) K is given by \\(R(\\theta)=\\alpha e^{(\\beta/\\theta)}\\). Given that the resistance at the ice point \\((\\theta=273.15\\ \\mathrm K)\\) is 9.00 kΩ and the resistance at the steam point \\((\\theta=373.15\\ \\mathrm K)\\) is 0.50 kΩ, find the resistance at 25°C.",
    originalLanguage: "en",
    prompt: {
      id: "Hambatan termistor mengikuti \\(R(\\theta)=\\alpha e^{\\beta/\\theta}\\), dengan \\(\\theta\\) dalam kelvin. Diketahui \\(R(273{,}15\\ \\mathrm K)=9{,}00\\ \\mathrm{k\\Omega}\\) dan \\(R(373{,}15\\ \\mathrm K)=0{,}50\\ \\mathrm{k\\Omega}\\). Tentukan hambatan pada 25°C.",
      en: "A thermistor follows \\(R(\\theta)=\\alpha e^{\\beta/\\theta}\\), where \\(\\theta\\) is in kelvin. Given \\(R(273.15\\ \\mathrm K)=9.00\\ \\mathrm{k\\Omega}\\) and \\(R(373.15\\ \\mathrm K)=0.50\\ \\mathrm{k\\Omega}\\), find its resistance at 25°C.",
    },
    steps: [
      {
        title: {
          id: "Kenali model dan suhu yang akan dimasukkan",
          en: "Identify the model and the temperature to insert",
        },
        body: [
          {
            id: "Hambatan turun dari 9,00 kΩ ke 0,50 kΩ ketika suhu naik. Penurunan hambatan sesuai perilaku **termistor NTC** (sensor yang hambatannya turun saat suhu naik). Namun, kita tidak memakai interpolasi garis lurus karena soal sudah memberi model eksponensial.",
            en: "Resistance falls from 9.00 kΩ to 0.50 kΩ as temperature rises, consistent with an **NTC thermistor**, whose resistance falls when heated. We use the supplied exponential model because straight-line interpolation would ignore that model.",
          },
          {
            id: "Model memakai suhu mutlak \\(\\theta\\) dalam kelvin. Suhu berada di penyebut, sehingga titik nol skala memengaruhi hasil. Ubah 25°C menjadi \\(25+273{,}15=298{,}15\\) K sebelum menghitung.",
            en: "The model uses absolute temperature \\(\\theta\\) in kelvin. Since temperature appears in a denominator, convert 25°C to \\(25+273.15=298.15\\) K before calculating.",
          },
        ],
        math: "\\theta_1=273.15\\ \\mathrm K,\\quad\\theta_2=373.15\\ \\mathrm K,\\quad\\theta=298.15\\ \\mathrm K",
      },
      {
        title: {
          id: "Tuliskan model pada dua titik yang diketahui",
          en: "Write the model at both known points",
        },
        body: [
          {
            id: "Konstanta \\(\\alpha\\) dan \\(\\beta\\) belum diketahui. Dua data kalibrasi memberi dua persamaan. Kita boleh mempertahankan hambatan dalam kΩ selama semua hambatan dan \\(\\alpha\\) memakai satuan yang sama.",
            en: "The constants \\(\\alpha,\\beta\\) are unknown. Two calibration points provide two equations. Resistance can stay in kΩ as long as all resistances and \\(\\alpha\\) use that same unit.",
          },
          {
            id: "Tujuan langkah berikutnya adalah menghilangkan \\(\\alpha\\), sehingga satu persamaan hanya menyisakan \\(\\beta\\).",
            en: "The next step eliminates \\(\\alpha\\), leaving an equation containing only \\(\\beta\\).",
          },
        ],
        math: "9.00=\\alpha e^{\\beta/273.15},\\qquad0.50=\\alpha e^{\\beta/373.15}\\quad[R,\\alpha\\text{ in k}\\Omega]",
      },
      {
        title: {
          id: "Bagi kedua persamaan untuk menghapus α",
          en: "Divide the equations to eliminate α",
        },
        body: [
          {
            id: "Bagi persamaan pertama dengan kedua. Faktor \\(\\alpha\\) saling menghapus. Untuk eksponen, \\(e^a/e^b=e^{a-b}\\), sehingga selisih kebalikan suhu muncul.",
            en: "Divide the first equation by the second. The \\(\\alpha\\) factors cancel. Since \\(e^a/e^b=e^{a-b}\\), a difference of reciprocal temperatures appears.",
          },
          {
            id: "Perbandingan hambatan \\(9/0{,}5=18\\) tidak bersatuan. Kita lalu memakai logaritma natural untuk membuka eksponennya.",
            en: "The resistance ratio \\(9/0.5=18\\) is dimensionless. Apply the natural logarithm to recover the exponent.",
          },
        ],
        math: "\\frac{9.00}{0.50}=e^{\\beta(1/273.15-1/373.15)}\\quad\\Longrightarrow\\quad\\ln18=\\beta\\left(\\frac1{273.15}-\\frac1{373.15}\\right)",
      },
      {
        title: {
          id: "Hitung β dan pahami satuannya",
          en: "Calculate β and interpret its units",
        },
        body: [
          {
            id: "Bagi kedua ruas dengan selisih kebalikan suhu. Pembilang \\(\\ln18\\) tidak bersatuan, sedangkan penyebut bersatuan \\(\\mathrm K^{-1}\\). Jadi \\(\\beta\\) bersatuan kelvin.",
            en: "Divide both sides by the reciprocal-temperature difference. The numerator \\(\\ln18\\) is dimensionless and the denominator has units \\(\\mathrm K^{-1}\\), so \\(\\beta\\) has kelvin units.",
          },
          {
            id: "Nilai \\(\\beta\\) positif membuat \\(\\beta/\\theta\\) mengecil ketika suhu naik, sehingga hambatan turun. Tanda hasil cocok dengan data.",
            en: "A positive \\(\\beta\\) makes \\(\\beta/\\theta\\) decrease as temperature rises, lowering resistance. The sign matches the observations.",
          },
        ],
        math: "\\beta=\\frac{\\ln18}{1/273.15-1/373.15}=\\frac{2.89037176}{1/273.15-1/373.15}=2946.0381\\ \\mathrm K",
      },
      {
        title: {
          id: "Gunakan salah satu titik sebagai acuan hambatan",
          en: "Use one calibration point as a resistance reference",
        },
        body: [
          {
            id: "Kita bisa mencari \\(\\alpha\\), tetapi untuk satu suhu baru lebih ringkas membagi \\(R(\\theta)\\) dengan \\(R(\\theta_1)\\). Konstanta \\(\\alpha\\) kembali menghapus.",
            en: "We could calculate \\(\\alpha\\), but for a new temperature it is shorter to divide \\(R(\\theta)\\) by \\(R(\\theta_1)\\). The constant \\(\\alpha\\) cancels again.",
          },
          {
            id: "Bentuk berikut memakai langsung hambatan 9,00 kΩ pada titik es. Ia tetap merupakan model eksponensial yang sama, bukan model baru.",
            en: "The following form directly uses the 9.00 kΩ resistance at the ice point. It is the same exponential model, not a new one.",
          },
        ],
        math: "R(\\theta)=R(\\theta_1)\\exp\\!\\left[\\beta\\left(\\frac1\\theta-\\frac1{\\theta_1}\\right)\\right]",
      },
      {
        title: {
          id: "Masukkan suhu 25°C dalam kelvin",
          en: "Insert 25°C in kelvin",
        },
        body: [
          {
            id: "Ganti \\(\\theta\\) dengan 298,15 K dan \\(\\beta\\) dengan hasil kalibrasi. Nilai 298,15 lebih besar daripada 273,15. Selisih kebalikannya negatif, sehingga faktor eksponensial harus kurang dari satu.",
            en: "Insert \\(\\theta=298.15\\) K and the fitted \\(\\beta\\). Since 298.15 exceeds 273.15, the reciprocal difference is negative and the exponential factor must be below one.",
          },
          {
            id: "Hasilnya sekitar 3,6432 kΩ, atau 3643,2 Ω. Jika \\(\\alpha\\) ikut dihitung, nilainya sekitar 0,000186292 kΩ; \\(\\alpha\\) bukan hambatan pada 0°C.",
            en: "The result is about 3.6432 kΩ, or 3643.2 Ω. If calculated, \\(\\alpha\\) is about 0.000186292 kΩ; it is not the resistance at 0°C.",
          },
        ],
        math: "R(298.15)=9.00\\exp\\!\\left[2946.0381\\left(\\frac1{298.15}-\\frac1{273.15}\\right)\\right]=3.643200\\ \\mathrm{k\\Omega}",
      },
      {
        title: {
          id: "Periksa hasil terhadap kedua titik kalibrasi",
          en: "Check against both calibration points",
        },
        body: [
          {
            id: "Suhu 25°C berada di antara 0 dan 100°C. Hambatan 3,6432 kΩ juga berada di antara 9,00 dan 0,50 kΩ serta turun ketika suhu naik. Kedua cek ini sesuai sifat NTC.",
            en: "25°C lies between 0 and 100°C. The 3.6432 kΩ result lies between 9.00 and 0.50 kΩ and decreases as temperature rises. Both checks agree with NTC behaviour.",
          },
          {
            id: "Nilainya tidak perlu berada pada garis lurus antara data. Bentuk eksponensial memang memberi perubahan hambatan per derajat yang berbeda pada suhu berbeda.",
            en: "The result need not lie on a straight line between the data. The exponential relation gives a different resistance change per degree at different temperatures.",
          },
        ],
      },
    ],
    answer: {
      id: "Hambatan pada 25°C sekitar 3,643 kΩ. Kalibrasi model memberi β ≈ 2946,04 K.",
      en: "Resistance at 25°C is about 3.643 kΩ. The model calibration gives β ≈ 2946.04 K.",
    },
    answerMath:
      "\\boxed{R(25^\\circ\\mathrm C)\\approx3.6432\\ \\mathrm{k\\Omega}}",
    visual: {
      kind: "thermistor",
      params: {
        T1: 273.15,
        R1: 9000,
        T2: 373.15,
        R2: 500,
        T: 25,
      },
      caption: {
        id: "Dua titik kalibrasi menentukan kurva eksponensial; suhu kontrol memakai °C, sedangkan model memakai kelvin.",
        en: "Two calibration points determine the exponential curve; the control uses °C while the model uses kelvin.",
      },
    },
    assumptions: [
      {
        id: "Model eksponensial yang diberikan dianggap berlaku di antara kedua titik kalibrasi. Pemanasan sendiri akibat arus ukur diabaikan.",
        en: "The supplied exponential model is assumed valid between the two calibration points. Measurement-current self-heating is neglected.",
      },
    ],
    referencePages: [2, 4],
  },
  {
    id: "2024-uts1-q2",
    year: 2024,
    exam: "uts1",
    number: 2,
    title: {
      id: "Garis ideal dan nonlinearitas termokopel",
      en: "Ideal line and thermocouple nonlinearity",
    },
    topic: "calibration",
    source: {
      url: "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
      file: "2024-uts1.pdf",
      pages: [1],
    },
    original:
      "2. [20%] A thermocouple used between 0 and 500°C has the following input–output characteristics: Input T in °C: 0, 100, 200, 300, 500. Output E in μV: 0, 5268, 10777, 16325, 27388. (a) Find the equation of the ideal straight line. (b) Find the non-linearity at 100°C and 300°C in μV and as a percentage of f.s.d.",
    originalLanguage: "en",
    prompt: {
      id: "Termokopel bekerja pada 0 sampai 500°C dengan data \\(T=[0,100,200,300,500]\\) °C dan \\(E=[0,5268,10777,16325,27388]\\) μV. (a) Tentukan persamaan garis lurus ideal. (b) Hitung nonlinearitas pada 100°C dan 300°C dalam μV serta persen rentang keluaran penuh (f.s.d.).",
      en: "A thermocouple operates over 0 to 500°C with \\(T=[0,100,200,300,500]\\) °C and \\(E=[0,5268,10777,16325,27388]\\) μV. (a) Find the ideal straight-line equation. (b) Find nonlinearity at 100°C and 300°C in μV and as a percentage of full-scale deflection.",
    },
    steps: [
      {
        title: {
          id: "a · Tentukan garis pembanding yang dipakai",
          en: "a · Define the reference line",
        },
        body: [
          {
            id: "Tabel memberi keluaran nyata, sedangkan soal meminta garis ideal untuk membandingkannya. Kita memakai **metode titik ujung** (garis melalui data pada batas bawah dan atas rentang ukur).",
            en: "The table gives actual output, while the question asks for an ideal comparison line. We use the **endpoint method**: the line through the data at the lower and upper range limits.",
          },
          {
            id: "Kedua titik itu adalah \\((0^\\circ\\mathrm C,0\\ \\mu\\mathrm V)\\) dan \\((500^\\circ\\mathrm C,27388\\ \\mu\\mathrm V)\\). Pilihan metode perlu dinyatakan karena regresi seluruh titik memberi garis lain.",
            en: "Those points are \\((0^\\circ\\mathrm C,0\\ \\mu\\mathrm V)\\) and \\((500^\\circ\\mathrm C,27388\\ \\mu\\mathrm V)\\). State the method because regression through all points would give a different line.",
          },
        ],
        table: {
          headers: [
            {
              id: "T (°C)",
              en: "T (°C)",
            },
            {
              id: "E aktual (μV)",
              en: "Actual E (μV)",
            },
          ],
          rows: [
            ["0", "0"],
            ["100", "5268"],
            ["200", "10777"],
            ["300", "16325"],
            ["500", "27388"],
          ],
        },
      },
      {
        title: {
          id: "a · Hitung kemiringan dari perubahan keluaran",
          en: "a · Calculate slope from the output change",
        },
        body: [
          {
            id: "Kemiringan \\(K\\) menyatakan berapa μV keluaran ideal naik untuk kenaikan satu derajat. Bagi perubahan tegangan 27388 μV dengan perubahan suhu 500°C.",
            en: "The slope \\(K\\) is the ideal μV increase per degree. Divide the 27388 μV output change by the 500°C temperature change.",
          },
          {
            id: "Keluaran pada suhu nol adalah nol, sehingga offset \\(a=0\\). Bentuk garis \\(E_{\\mathrm{lin}}=KT+a\\) lalu menjadi hasil berikut.",
            en: "Output at zero temperature is zero, so the offset \\(a=0\\). The line \\(E_{\\mathrm{lin}}=KT+a\\) becomes the expression below.",
          },
        ],
        math: "K=\\frac{27388-0}{500-0}=54.776\\ \\mu\\mathrm V/{}^\\circ\\mathrm C,\\qquad E_{\\mathrm{lin}}(T)=54.776T\\quad[\\mu\\mathrm V]",
      },
      {
        title: {
          id: "b · Definisikan penyimpangan dan penyebut persen",
          en: "b · Define the departure and percentage denominator",
        },
        body: [
          {
            id: "Gunakan \\(N(T)=E_{\\mathrm{data}}(T)-E_{\\mathrm{lin}}(T)\\). Nilai negatif berarti data berada di bawah garis; besar nonlinearitas memakai \\(|N|\\).",
            en: "Use \\(N(T)=E_{\\mathrm{data}}(T)-E_{\\mathrm{lin}}(T)\\). A negative value places the point below the line; nonlinearity magnitude uses \\(|N|\\).",
          },
          {
            id: "F.s.d. adalah rentang keluaran dari ujung bawah sampai ujung atas, yaitu 27388 μV. Kedua suhu harus dibagi dengan rentang yang sama agar persentasenya sebanding.",
            en: "Full-scale deflection is the output span between the range limits, 27388 μV. Use that same span for both temperatures so the percentages are comparable.",
          },
        ],
        math: "N_{\\%}(T)=\\frac{N(T)}{27388}(100\\%)",
      },
      {
        title: {
          id: "b · Bandingkan data dan garis pada 100°C",
          en: "b · Compare data and line at 100°C",
        },
        body: [
          {
            id: "Garis ideal pada 100°C memberi \\(54{,}776(100)=5477{,}6\\) μV. Tabel memberi 5268 μV. Kurangi nilai garis dari nilai tabel.",
            en: "The ideal line at 100°C gives \\(54.776(100)=5477.6\\) μV. The table gives 5268 μV. Subtract the line value from the table value.",
          },
          {
            id: "Penyimpangannya −209,6 μV. Ketika soal meminta besar nonlinearitas, kita dapat melaporkan 209,6 μV dan menjelaskan posisinya di bawah garis.",
            en: "The departure is −209.6 μV. For nonlinearity magnitude, report 209.6 μV and explain that the point lies below the line.",
          },
        ],
        math: "N(100)=5268-5477.6=-209.6\\ \\mu\\mathrm V",
      },
      {
        title: {
          id: "b · Ubah penyimpangan 100°C menjadi persen f.s.d.",
          en: "b · Convert the 100°C departure to percent f.s.d.",
        },
        body: [
          {
            id: "Bagi −209,6 μV dengan 27388 μV. Satuan tegangan saling menghapus, lalu perkalian 100% mengubah rasio menjadi persen.",
            en: "Divide −209.6 μV by 27388 μV. Voltage units cancel, and multiplying by 100% converts the ratio to percent.",
          },
          {
            id: "Penyebutnya bukan 5268 μV. Membagi dengan pembacaan lokal akan menyatakan persen terhadap pembacaan, bukan terhadap skala penuh.",
            en: "The denominator is not 5268 μV. Dividing by the local reading would give percent of reading rather than percent of full scale.",
          },
        ],
        math: "N_{\\%}(100)=\\frac{-209.6}{27388}(100\\%)=-0.76530\\%",
      },
      {
        title: {
          id: "b · Lakukan perbandingan yang sama pada 300°C",
          en: "b · Repeat the comparison at 300°C",
        },
        body: [
          {
            id: "Garis memberi \\(54{,}776(300)=16432{,}8\\) μV dan tabel memberi 16325 μV. Selisihnya −107,8 μV, jadi titik ini juga berada di bawah garis.",
            en: "The line gives \\(54.776(300)=16432.8\\) μV and the table gives 16325 μV. Their difference is −107.8 μV, again below the line.",
          },
          {
            id: "Gunakan rentang 27388 μV yang sama untuk memperoleh −0,39360% f.s.d. Besar nonlinearitas di 300°C lebih kecil daripada di 100°C, meskipun tegangannya lebih tinggi.",
            en: "Use the same 27388 μV span to obtain −0.39360% f.s.d. Nonlinearity magnitude at 300°C is smaller than at 100°C despite the higher voltage.",
          },
        ],
        math: "N(300)=16325-16432.8=-107.8\\ \\mu\\mathrm V,\\qquad N_{\\%}(300)=\\frac{-107.8}{27388}(100\\%)=-0.39360\\%",
      },
      {
        title: {
          id: "Periksa hasil terhadap metode titik ujung",
          en: "Check against the endpoint method",
        },
        body: [
          {
            id: "Pada 0 dan 500°C, penyimpangan harus nol karena garis memang melalui kedua titik itu. Pada titik di antaranya, tanda dan besar selisih menunjukkan kelengkungan karakteristik nyata.",
            en: "Departure must be zero at 0 and 500°C because the reference line passes through both endpoints. Interior signed departures describe the actual characteristic’s curvature.",
          },
          {
            id: "Jawaban bagian (b) mencakup nilai bertanda dan besarnya. Kita tidak menyebut dua titik yang ditanya sebagai maksimum seluruh rentang tanpa memeriksa semua titik dan perilaku di antaranya.",
            en: "Part (b) reports both signed departures and magnitudes. The two requested points should not be called the maximum over the entire range without checking other points and behaviour between them.",
          },
        ],
      },
    ],
    answer: {
      id: "Garis idealnya \\(E=54{,}776T\\) dalam μV. Pada 100°C, nonlinearitas bertanda −209,6 μV (−0,76530% f.s.d.). Pada 300°C, nilainya −107,8 μV (−0,39360% f.s.d.). Besarnya masing-masing 0,76530% dan 0,39360%.",
      en: "The ideal line is E = 54.776 T in μV. Signed nonlinearity is −209.6 μV (−0.76530% f.s.d.) at 100°C and −107.8 μV (−0.39360% f.s.d.) at 300°C. Magnitudes are 0.76530% and 0.39360%.",
    },
    answerMath:
      "\\boxed{\\begin{aligned}E_{\\mathrm{lin}}&=54.776T\\quad[\\mu\\mathrm V]\\\\N(100)&=-209.6\\ \\mu\\mathrm V=-0.76530\\%\\ \\mathrm{f.s.d.}\\\\N(300)&=-107.8\\ \\mu\\mathrm V=-0.39360\\%\\ \\mathrm{f.s.d.}\\end{aligned}}",
    visual: {
      kind: "calibration",
      params: {
        xs: [0, 100, 200, 300, 500],
        ys: [0, 5268, 10777, 16325, 27388],
        inputUnit: "°C",
        outputUnit: "μV",
      },
      caption: {
        id: "Bandingkan tabel dengan satu garis melalui dua ujung rentang; selisih vertikal adalah nonlinearitas.",
        en: "Compare the table with one endpoint line; vertical departure gives nonlinearity.",
      },
    },
    assumptions: [
      {
        id: "Garis ideal memakai metode titik ujung. Nonlinearitas bertanda didefinisikan sebagai data dikurangi garis; besar nonlinearitas adalah nilai mutlaknya.",
        en: "The ideal line uses the endpoint method. Signed nonlinearity is actual data minus line; its magnitude is the absolute value.",
      },
    ],
  },
  {
    id: "2024-uts1-q3",
    year: 2024,
    exam: "uts1",
    number: 3,
    title: {
      id: "Transduser gaya dengan umpan balik negatif",
      en: "Force transducer with negative feedback",
    },
    topic: "systems",
    source: {
      url: "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
      file: "2024-uts1.pdf",
      pages: [1],
    },
    original:
      "3. [20%] Figure below shows a block diagram of a force transducer using negative feedback. The elastic sensor gives a displacement output for a force input; the displacement sensor gives a voltage output for a displacement input. \\(V_s\\) is the supply voltage for the displacement sensor. (a) Calculate the output voltage \\(V_o\\) when (i) \\(V_s=1.0\\ \\mathrm V,F=50\\ \\mathrm N\\), (ii) \\(V_s=1.5\\ \\mathrm V,F=50\\ \\mathrm N\\). (b) Comment on the practical significance of the variation of the supply voltage \\(V_s\\). Figure: input force F enters the positive summing input; balancing force enters the negative input. Forward blocks: elastic force sensor \\(10^{-4}\\), displacement sensor \\(100\\times V_s\\), amplifier \\(10^3\\). Output \\(V_o\\) returns through coil-and-magnet block 10 to the negative summing input.",
    originalLanguage: "en",
    prompt: {
      id: "Transduser gaya memakai umpan balik negatif. Gaya galat melewati sensor elastis dengan penguatan \\(10^{-4}\\), sensor perpindahan \\(100V_s\\), dan penguat \\(10^3\\), lalu menghasilkan tegangan \\(V_o\\). Jalur balik kumparan dan magnet mempunyai penguatan \\(10\\) dan menghasilkan gaya penyeimbang yang dikurangkan dari gaya masuk \\(F\\). (a) Hitung \\(V_o\\) untuk \\(F=50\\) N pada catu (i) 1,0 V dan (ii) 1,5 V. (b) Jelaskan arti praktis pengaruh perubahan catu.",
      en: "A force transducer uses negative feedback. Error force passes through an elastic sensor with gain \\(10^{-4}\\), a displacement sensor with gain \\(100V_s\\), and an amplifier with gain \\(10^3\\), producing \\(V_o\\). A coil-and-magnet feedback block of gain \\(10\\) produces balancing force subtracted from input \\(F\\). (a) Find \\(V_o\\) for \\(F=50\\) N with supplies (i) 1.0 V and (ii) 1.5 V. (b) Explain the practical significance of the supply change.",
    },
    steps: [
      {
        title: {
          id: "a · Baca tanda pada simpul penjumlah",
          en: "a · Read the summing-junction signs",
        },
        body: [
          {
            id: "Tanda plus menerima gaya luar \\(F\\). Tanda minus menerima gaya penyeimbang dari keluaran. Dengan penguatan jalur balik \\(B=10\\ \\mathrm{N/V}\\), gaya balik adalah \\(F_b=BV_o\\).",
            en: "The plus input receives external force \\(F\\), while the minus input receives the output-derived balancing force. With feedback gain \\(B=10\\ \\mathrm{N/V}\\), that force is \\(F_b=BV_o\\).",
          },
          {
            id: "Jalur maju tidak menerima seluruh \\(F\\); ia menerima gaya galat \\(F_e=F-F_b\\). Kita menyebut susunan pengurang tersebut **umpan balik negatif** (keluaran mengurangi masukan efektif). Kenaikan keluaran memperbesar gaya penyeimbang.",
            en: "The forward path does not receive the entire \\(F\\); it receives error force \\(F_e=F-F_b\\). We call this arrangement **negative feedback**: an output rise reduces the forward path’s effective input.",
          },
        ],
        math: "F_b=10V_o,\\qquad F_e=F-10V_o",
      },
      {
        title: {
          id: "a · Gabungkan penguatan jalur maju",
          en: "a · Combine the forward-path gains",
        },
        body: [
          {
            id: "Ketiga blok tersusun seri: keluaran satu blok menjadi masukan blok berikutnya. Maka penguatan total jalur maju \\(A\\) adalah hasil kali ketiganya.",
            en: "The three blocks are in cascade: each output enters the next block. Their product gives the forward-path gain \\(A\\).",
          },
          {
            id: "Perkalian faktor bilangan memberi \\(10^{-4}\\times100\\times10^3=10\\). Jadi \\(A=10V_s\\), dengan satuan gabungan V/N. Masukkan nilai numerik \\(V_s\\) dalam volt sesuai diagram.",
            en: "The numerical factors give \\(10^{-4}\\times100\\times10^3=10\\). Thus \\(A=10V_s\\), with net units V/N. Insert the numerical supply voltage in volts as in the diagram.",
          },
        ],
        math: "A=(10^{-4})(100V_s)(10^3)=10V_s,\\qquad V_o=A(F-10V_o)",
      },
      {
        title: {
          id: "a · Selesaikan persamaan yang memuat keluaran di dua ruas",
          en: "a · Solve the equation with output on both sides",
        },
        body: [
          {
            id: "Buka kurung: \\(V_o=AF-10AV_o\\). Tambahkan \\(10AV_o\\) ke kedua ruas, lalu keluarkan \\(V_o\\) sebagai faktor. Kita tidak boleh memakai \\(V_o=AF\\) karena itu menghapus gaya balik.",
            en: "Expand to \\(V_o=AF-10AV_o\\). Add \\(10AV_o\\) to both sides, then factor out \\(V_o\\). Using \\(V_o=AF\\) would incorrectly remove the feedback force.",
          },
          {
            id: "Bagi dengan \\(1+10A\\). Setelah memasukkan \\(A=10V_s\\), penyebut menjadi \\(1+100V_s\\). Tanda plus pada penyebut berasal dari tanda minus di simpul penjumlah.",
            en: "Divide by \\(1+10A\\). Substituting \\(A=10V_s\\) gives denominator \\(1+100V_s\\). Its plus sign follows from the negative summing input.",
          },
        ],
        math: "\\begin{aligned}(1+10A)V_o&=AF\\\\V_o&=\\frac{A}{1+10A}F=\\frac{10V_s}{1+100V_s}F\\end{aligned}",
      },
      {
        title: {
          id: "a(i) · Hitung keluaran untuk catu 1,0 V",
          en: "a(i) · Calculate output at a 1.0 V supply",
        },
        body: [
          {
            id: "Pada \\(V_s=1{,}0\\) V, penguatan maju \\(A=10\\) V/N dan loop gain \\(AB=100\\). Masukkan gaya 50 N ke rumus tertutup.",
            en: "At \\(V_s=1.0\\) V, forward gain is \\(A=10\\) V/N and loop gain is \\(AB=100\\). Insert the 50 N force into the closed-loop relation.",
          },
          {
            id: "Gaya baliknya \\(10V_o\\approx49{,}505\\) N, sedikit di bawah 50 N. Selisih sekitar 0,495 N tetap diperlukan untuk menghasilkan keluaran melalui penguatan maju yang terbatas.",
            en: "The balancing force is \\(10V_o\\approx49.505\\) N, slightly below 50 N. An error force of about 0.495 N is still needed to produce output through finite forward gain.",
          },
        ],
        math: "V_{o,1}=\\frac{10(1.0)}{1+100(1.0)}(50)=\\frac{500}{101}=4.950495\\ \\mathrm V",
      },
      {
        title: {
          id: "a(ii) · Hitung keluaran untuk catu 1,5 V",
          en: "a(ii) · Calculate output at a 1.5 V supply",
        },
        body: [
          {
            id: "Pada \\(V_s=1{,}5\\) V, penguatan maju naik menjadi 15 V/N dan loop gain menjadi 150. Gaya masuk serta penguatan jalur balik tetap.",
            en: "At \\(V_s=1.5\\) V, forward gain rises to 15 V/N and loop gain to 150. Input force and feedback gain remain unchanged.",
          },
          {
            id: "Keluaran menjadi sekitar 4,96689 V. Gaya balik naik menjadi sekitar 49,669 N dan gaya galat turun menjadi sekitar 0,331 N.",
            en: "Output becomes about 4.96689 V. Balancing force rises to about 49.669 N and error force falls to about 0.331 N.",
          },
        ],
        math: "V_{o,2}=\\frac{10(1.5)}{1+100(1.5)}(50)=\\frac{750}{151}=4.966887\\ \\mathrm V",
      },
      {
        title: {
          id: "b · Bandingkan perubahan catu dan keluaran",
          en: "b · Compare supply and output changes",
        },
        body: [
          {
            id: "Catu naik 50%, dari 1,0 menjadi 1,5 V. Keluaran hanya naik sekitar 0,01639 V. Bagi kenaikan keluaran dengan keluaran awal untuk menghitung perubahan relatifnya.",
            en: "Supply rises by 50%, from 1.0 to 1.5 V. Output rises by only about 0.01639 V. Divide the output increase by its initial value to calculate the relative change.",
          },
          {
            id: "Kenaikan keluaran sekitar 0,331%, jauh lebih kecil daripada 50%. Jadi umpan balik menekan pengaruh perubahan catu, tetapi belum menghilangkannya sepenuhnya.",
            en: "The output increase is about 0.331%, much smaller than 50%. Feedback suppresses supply sensitivity but does not remove it completely.",
          },
        ],
        math: "\\frac{V_{o,2}-V_{o,1}}{V_{o,1}}(100\\%)=\\frac{4.966887-4.950495}{4.950495}(100\\%)=0.33113\\%",
      },
      {
        title: {
          id: "b · Jelaskan mengapa hasil mendekati 5 V",
          en: "b · Explain why output approaches 5 V",
        },
        body: [
          {
            id: "Jika loop gain \\(AB\\) jauh lebih besar daripada satu, penyebut \\(1+AB\\) hampir sama dengan \\(AB\\). Maka penguatan tertutup mendekati \\(1/B\\), yaitu 0,1 V/N.",
            en: "When loop gain \\(AB\\) greatly exceeds one, \\(1+AB\\) is close to \\(AB\\). Closed-loop gain then approaches \\(1/B=0.1\\) V/N.",
          },
          {
            id: "Untuk 50 N, batas pendekatan itu adalah 5 V. Kedua hasil berada sedikit di bawah 5 V dan mendekatinya saat penguatan maju naik. Ini menjelaskan perbaikan kestabilan skala, selama penguat dan aktuator tidak melewati batas kerja.",
            en: "For 50 N, the limiting approximation is 5 V. Both results lie slightly below 5 V and approach it as forward gain rises. The approach to a fixed limit explains improved scale stability, provided amplifier and actuator stay within their operating limits.",
          },
        ],
        math: "\\frac{V_o}{F}=\\frac{A}{1+AB}\\approx\\frac1B\\quad(AB\\gg1),\\qquad V_o\\approx\\frac{50}{10}=5\\ \\mathrm V",
      },
    ],
    answer: {
      id: "Keluaran sekitar 4,95050 V pada catu 1,0 V dan 4,96689 V pada catu 1,5 V. Catu naik 50%, tetapi keluaran naik sekitar 0,331%; umpan balik negatif menekan kepekaan terhadap perubahan catu.",
      en: "Output is about 4.95050 V at a 1.0 V supply and 4.96689 V at 1.5 V. A 50% supply rise causes only about a 0.331% output rise; negative feedback reduces supply sensitivity.",
    },
    answerMath:
      "\\boxed{V_o(1.0\\ \\mathrm V)=4.95050\\ \\mathrm V,\\qquad V_o(1.5\\ \\mathrm V)=4.96689\\ \\mathrm V}",
    visual: {
      kind: "feedback",
      params: {
        forward: 10,
        feedback: 10,
        supply: 1,
        force: 50,
      },
      caption: {
        id: "Keluaran menggerakkan gaya balik yang dikurangkan dari gaya masuk; catu mengubah penguatan jalur maju.",
        en: "Output drives a balancing force subtracted from input force; supply changes the forward-path gain.",
      },
    },
    assumptions: [
      {
        id: "Blok dianggap linear, polaritas umpan balik mengikuti tanda minus pada gambar, dan penguat serta kumparan bekerja tanpa saturasi. Analisis membahas keadaan tunak.",
        en: "Blocks are linear, feedback polarity follows the diagram’s minus sign, and amplifier and coil operate without saturation. The analysis concerns steady state.",
      },
    ],
  },
  {
    id: "2024-uts1-q4",
    year: 2024,
    exam: "uts1",
    number: 4,
    title: {
      id: "Respons suhu saat berpindah dari air ke udara",
      en: "Temperature response when moving from water to air",
    },
    topic: "dynamics",
    source: {
      url: "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
      file: "2024-uts1.pdf",
      pages: [1, 2, 3],
    },
    original:
      "4. [20%] A temperature measurement system consists of linear elements and has an overall steady-state sensitivity of unity. The dynamics of the system are determined by the first-order transfer function of the sensing element. At time t = 0, the sensing element is suddenly transferred from air at 20°C to boiling water, i.e. 100°C. One minute later the element is suddenly transferred back to air. Using the data given below, (a) derive transfer function of the sensor, i.e. \\(G(s)=\\Delta T_{\\mathrm{out}}(s)/\\Delta T_{\\mathrm{in}}(s)\\). (b) Calculate the system dynamic error at the following times: t = 10, 20, 50, 120 and 300 s. Sensor data: mass \\(M=5\\times10^{-2}\\ \\mathrm{kg}\\); surface area \\(A=10^{-3}\\ \\mathrm{m^2}\\); specific heat \\(C=0.2\\ \\mathrm{J\\,kg^{-1}\\,{}^\\circ C^{-1}}\\); heat-transfer coefficient for air \\(U_a=0.2\\ \\mathrm{W\\,m^{-2}\\,{}^\\circ C^{-1}}\\); heat-transfer coefficient for water \\(U_w=1.0\\ \\mathrm{W\\,m^{-2}\\,{}^\\circ C^{-1}}\\); time constant \\(\\tau=MC/(UA)\\). The appendix gives Laplace transform pairs.",
    originalLanguage: "en",
    prompt: {
      id: "Sistem suhu memiliki sensitivitas keadaan tunak satu dan respons orde satu. Sensor mula-mula setimbang dengan udara 20°C. Pada \\(t=0\\), sensor masuk air 100°C; pada \\(t=60\\) s, sensor kembali ke udara 20°C. Diketahui \\(M=0{,}05\\) kg, \\(A=0{,}001\\) m², \\(C=0{,}2\\) J/(kg·°C), \\(U_a=0{,}2\\) W/(m²·°C), \\(U_w=1{,}0\\) W/(m²·°C), dan \\(\\tau=MC/(UA)\\). (a) Turunkan \\(G(s)=\\Delta T_{\\mathrm{out}}(s)/\\Delta T_{\\mathrm{in}}(s)\\). (b) Hitung galat dinamis pada 10, 20, 50, 120, dan 300 s.",
      en: "The temperature system has unity steady-state sensitivity and first-order response. Initially the sensor is in equilibrium with 20°C air. At \\(t=0\\) it enters 100°C water; at \\(t=60\\) s it returns to 20°C air. The sensor has \\(M=0.05\\) kg, \\(A=0.001\\) m², and \\(C=0.2\\) J/(kg·°C). Use \\(U_a=0.2\\) W/(m²·°C), \\(U_w=1.0\\) W/(m²·°C), and \\(\\tau=MC/(UA)\\). (a) Derive \\(G(s)=\\Delta T_{\\mathrm{out}}(s)/\\Delta T_{\\mathrm{in}}(s)\\); (b) calculate dynamic error at 10, 20, 50, 120, and 300 s.",
    },
    steps: [
      {
        title: {
          id: "a · Hubungkan panas masuk dengan perubahan suhu sensor",
          en: "a · Relate heat input to sensor-temperature change",
        },
        body: [
          {
            id: "Sebut suhu medium sebagai \\(T_{\\mathrm{in}}\\) dan suhu yang ditunjukkan sensor sebagai \\(T_{\\mathrm{out}}\\). Sensor memerlukan energi untuk mengubah suhunya; kapasitas panas totalnya adalah \\(MC\\), dengan satuan J/°C.",
            en: "We label medium temperature \\(T_{\\mathrm{in}}\\) and indicated sensor temperature be \\(T_{\\mathrm{out}}\\). Changing sensor temperature requires energy; its total heat capacity is \\(MC\\), in J/°C.",
          },
          {
            id: "Laju panas dari medium ke sensor adalah \\(UA(T_{\\mathrm{in}}-T_{\\mathrm{out}})\\). Ketika medium lebih panas, beda suhu positif dan suhu sensor naik. Menyamakan panas masuk dengan laju perubahan energi sensor memberi persamaan berikut.",
            en: "Heat transfer from medium to sensor is \\(UA(T_{\\mathrm{in}}-T_{\\mathrm{out}})\\). A hotter medium gives a positive difference and raises sensor temperature. Equate heat inflow to the rate of stored-energy change.",
          },
        ],
        math: "MC\\frac{dT_{\\mathrm{out}}}{dt}=UA(T_{\\mathrm{in}}-T_{\\mathrm{out}})",
      },
      {
        title: {
          id: "a · Turunkan fungsi alih orde satu",
          en: "a · Derive the first-order transfer function",
        },
        body: [
          {
            id: "Bagi kedua ruas dengan \\(UA\\), lalu tambahkan \\(T_{\\mathrm{out}}\\) ke ruas kiri. Koefisien turunan adalah \\(\\tau=MC/(UA)\\), yaitu **konstanta waktu** (skala waktu perubahan respons sensor).",
            en: "Divide both sides by \\(UA\\), then bring \\(T_{\\mathrm{out}}\\) to the left. The derivative coefficient is the **time constant**, the response’s time scale, \\(\\tau=MC/(UA)\\).",
          },
          {
            id: "Gunakan perubahan suhu dari keadaan setimbang awal, sehingga kondisi awal perubahan bernilai nol. Transformasi Laplace mengubah turunan menjadi \\(s\\Delta T_{\\mathrm{out}}(s)\\). Membagi kedua ruas memberi fungsi alih untuk medium yang tetap.",
            en: "Use temperature deviations from initial equilibrium, so the initial deviation is zero. The Laplace transform converts the derivative into \\(s\\Delta T_{\\mathrm{out}}(s)\\). Dividing gives the transfer function for a fixed medium.",
          },
        ],
        math: "\\begin{aligned}\\tau\\frac{d\\Delta T_{\\mathrm{out}}}{dt}+\\Delta T_{\\mathrm{out}}&=\\Delta T_{\\mathrm{in}}\\\\(\\tau s+1)\\Delta T_{\\mathrm{out}}(s)&=\\Delta T_{\\mathrm{in}}(s)\\\\G(s)&=\\frac1{\\tau s+1}\\end{aligned}",
      },
      {
        title: {
          id: "a · Hitung konstanta waktu untuk masing-masing medium",
          en: "a · Calculate a time constant for each medium",
        },
        body: [
          {
            id: "Dari data, \\(MC=0{,}05(0{,}2)=0{,}01\\) J/°C. Di air, \\(U_wA=1{,}0(0{,}001)=0{,}001\\) W/°C. Di udara, \\(U_aA=0{,}0002\\) W/°C.",
            en: "From the data, \\(MC=0.05(0.2)=0.01\\) J/°C. In water, \\(U_wA=1.0(0.001)=0.001\\) W/°C. In air, \\(U_aA=0.0002\\) W/°C.",
          },
          {
            id: "Hubungan W = J/s membuat hasil pembagian kapasitas panas dengan koefisien pelepasan panas bersatuan detik. Air memberi \\(\\tau_w=10\\) s, sedangkan udara memberi \\(\\tau_a=50\\) s. Sensor merespons lebih lambat di udara.",
            en: "Since W = J/s, dividing heat capacity by heat-transfer conductance gives seconds. Water gives \\(\\tau_w=10\\) s, while air gives \\(\\tau_a=50\\) s. The sensor responds more slowly in air.",
          },
        ],
        math: "\\tau_w=\\frac{0.01}{0.001}=10\\ \\mathrm s,\\quad \\tau_a=\\frac{0.01}{0.0002}=50\\ \\mathrm s,\\qquad G_w(s)=\\frac1{10s+1},\\quad G_a(s)=\\frac1{50s+1}",
      },
      {
        title: {
          id: "b · Pisahkan dua fase dan definisikan galat",
          en: "b · Separate the phases and define error",
        },
        body: [
          {
            id: "Masukan berupa suhu medium: 100°C selama 0 sampai 60 s, lalu 20°C setelah 60 s. Keluaran adalah suhu sensor yang berubah bertahap. Keduanya tidak harus sama selama proses.",
            en: "The input is medium temperature: 100°C during 0 to 60 s, then 20°C after 60 s. Output is the gradually changing sensor temperature. They need not match during the process.",
          },
          {
            id: "Kita definisikan galat bertanda sebagai keluaran dikurangi masukan. Nilai negatif berarti sensor tertinggal di bawah suhu medium; nilai positif berarti sensor masih lebih panas.",
            en: "Define signed error as output minus input. Negative error means the sensor remains below medium temperature; positive error means it is still hotter.",
          },
        ],
        math: "E_d(t)=T_{\\mathrm{out}}(t)-T_{\\mathrm{in}}(t)",
      },
      {
        title: {
          id: "b · Tulis respons selama pemanasan di air",
          en: "b · Write the heating response in water",
        },
        body: [
          {
            id: "Untuk masukan suhu tetap, respons orde satu mendekati suhu akhir secara eksponensial: suhu akhir ditambah selisih suhu awal dan akhir dikalikan \\(e^{-t/\\tau}\\). Pada fase ini suhu awal 20°C, suhu akhir 100°C, dan \\(\\tau=10\\) s.",
            en: "For constant input temperature, first-order response approaches its final value exponentially: final temperature plus the initial and final difference times \\(e^{-t/\\tau}\\). Here the initial value is 20°C, the final value 100°C, and \\(\\tau=10\\) s.",
          },
          {
            id: "Selisih suhu awal dan akhir adalah −80°C. Saat \\(t=0\\), persamaan memberi 20°C; saat waktu membesar, suku eksponensial mengecil dan hasil mendekati 100°C.",
            en: "The initial and final difference is −80°C. At \\(t=0\\) the equation gives 20°C; as time increases, the exponential shrinks and output approaches 100°C.",
          },
        ],
        math: "T_{\\mathrm{out}}(t)=100+(20-100)e^{-t/10}=100-80e^{-t/10},\\qquad0\\le t<60",
      },
      {
        title: {
          id: "b · Hitung tiga galat sebelum perpindahan",
          en: "b · Calculate the three errors before transfer",
        },
        body: [
          {
            id: "Pada 10,20, dan 50 s, sensor masih berada di air 100°C. Kurangi 100 dari respons pemanasan; galat menjadi \\(-80e^{-t/10}\\).",
            en: "At 10,20, and 50 s the sensor remains in 100°C water. Subtract 100 from the heating response to obtain error \\(-80e^{-t/10}\\).",
          },
          {
            id: "Waktu-waktu ini masing-masing sama dengan 1,2, dan 5 konstanta waktu air. Galat mengecil, tetapi belum tepat nol pada waktu yang berhingga.",
            en: "These times correspond to 1,2, and 5 water time constants. Error decreases but does not become exactly zero at a finite time.",
          },
        ],
        math: "\\begin{aligned}E_d(10)&=-80e^{-1}=-29.43036^\\circ\\mathrm C\\\\E_d(20)&=-80e^{-2}=-10.82682^\\circ\\mathrm C\\\\E_d(50)&=-80e^{-5}=-0.53904^\\circ\\mathrm C\\end{aligned}",
      },
      {
        title: {
          id: "Hitung suhu sensor tepat sebelum kembali ke udara",
          en: "Find sensor temperature just before returning to air",
        },
        body: [
          {
            id: "Sensor berada di air selama 60 s, yaitu 6 konstanta waktu air. Masukkan 60 ke respons pemanasan untuk memperoleh suhu awal fase pendinginan.",
            en: "The sensor stays in water for 60 s, or 6 water time constants. Insert 60 into the heating response to find the cooling phase’s initial temperature.",
          },
          {
            id: "Hasil 99,80170°C sangat dekat dengan 100°C, tetapi tidak sama. Suhu sensor tidak meloncat ketika medium berganti, sehingga \\(T_{\\mathrm{out}}(60^+)=T_{\\mathrm{out}}(60^-)\\).",
            en: "The result,99.80170°C, is close to 100°C but not identical. Sensor temperature cannot jump when the medium changes, so \\(T_{\\mathrm{out}}(60^+)=T_{\\mathrm{out}}(60^-)\\).",
          },
        ],
        math: "T_{60}=100-80e^{-60/10}=99.8016998^\\circ\\mathrm C",
      },
      {
        title: {
          id: "Gunakan waktu sejak perpindahan untuk pendinginan",
          en: "Use elapsed time since transfer for cooling",
        },
        body: [
          {
            id: "Di udara, suhu akhir kembali 20°C dan konstanta waktunya 50 s. Waktu pendinginan dimulai pada \\(t=60\\), sehingga waktu yang masuk eksponen adalah \\(t-60\\), bukan \\(t\\).",
            en: "In air the final temperature returns to 20°C and the time constant is 50 s. Cooling begins at \\(t=60\\), so the exponential uses elapsed time \\(t-60\\), not \\(t\\).",
          },
          {
            id: "Kelebihan suhu awal terhadap udara adalah \\(99{,}8016998-20=79{,}8016998\\)°C. Gunakan nilai ini agar respons tetap kontinu pada batas kedua fase.",
            en: "The initial excess above air temperature is \\(99.8016998-20=79.8016998\\)°C. Use this value to keep the response continuous between phases.",
          },
        ],
        math: "T_{\\mathrm{out}}(t)=20+79.8016998e^{-(t-60)/50},\\qquad E_d(t)=79.8016998e^{-(t-60)/50}\\quad(t\\ge60)",
      },
      {
        title: {
          id: "b · Hitung galat pada 120 dan 300 s",
          en: "b · Calculate error at 120 and 300 s",
        },
        body: [
          {
            id: "Pada 120 s, sensor telah mendingin selama 60 s. Pada 300 s, lama pendinginannya 240 s. Kedua waktu global itu tidak sama dengan waktu yang berlalu dalam fase udara.",
            en: "At 120 s the sensor has cooled for 60 s; at 300 s it has cooled for 240 s. Global time is not the elapsed time in the air phase.",
          },
          {
            id: "Hasil galat positif karena sensor masih lebih hangat daripada udara. Kita menambahkan 20°C hanya ketika mencari suhu keluaran, bukan ketika melaporkan galat.",
            en: "Errors are positive because the sensor remains warmer than the air. Add 20°C only to recover output temperature, not when reporting error.",
          },
        ],
        math: "\\begin{aligned}E_d(120)&=79.8016998e^{-(120-60)/50}=24.03581^\\circ\\mathrm C\\\\E_d(300)&=79.8016998e^{-(300-60)/50}=0.65675^\\circ\\mathrm C\\end{aligned}",
      },
      {
        title: {
          id: "Bandingkan keluaran, masukan, dan galat",
          en: "Compare output, input, and error",
        },
        body: [
          {
            id: "Tabel berikut memisahkan suhu yang benar-benar dibaca sensor dari suhu medium. Besar galat adalah nilai mutlak kolom terakhir. Jika memakai definisi galat masukan dikurangi keluaran, semua tanda berbalik tetapi besarnya tetap.",
            en: "The table separates sensor indication from medium temperature. Error magnitude is the absolute value of the final column. Defining error as input minus output would reverse every sign but leave magnitudes unchanged.",
          },
        ],
        table: {
          headers: [
            {
              id: "t (s)",
              en: "t (s)",
            },
            {
              id: "T masuk (°C)",
              en: "Input T (°C)",
            },
            {
              id: "T keluar (°C)",
              en: "Output T (°C)",
            },
            {
              id: "E_d (°C)",
              en: "E_d (°C)",
            },
          ],
          rows: [
            ["10", "100", "70.56964", "−29.43036"],
            ["20", "100", "89.17318", "−10.82682"],
            ["50", "100", "99.46096", "−0.53904"],
            ["120", "20", "44.03581", "+24.03581"],
            ["300", "20", "20.65675", "+0.65675"],
          ],
        },
      },
      {
        title: {
          id: "Periksa model pada batas kedua fase",
          en: "Check the model at the phase boundary",
        },
        body: [
          {
            id: "Keluaran mulai dari 20°C, mendekati 100°C selama pemanasan, lalu turun secara kontinu menuju 20°C. Galat dapat meloncat saat 60 s karena suhu masukan berubah seketika; suhu sensor sendiri tetap kontinu.",
            en: "Output starts at 20°C, approaches 100°C while heating, then falls continuously toward 20°C. Error can jump at 60 s because the input jumps; the sensor temperature itself remains continuous.",
          },
          {
            id: "Kita tidak memakai satu fungsi alih tetap untuk seluruh riwayat, karena \\(U\\) berubah ketika medium berganti. Masing-masing medium memiliki fungsi alihnya sendiri, dan suhu akhir fase pertama menjadi kondisi awal fase kedua.",
            en: "One fixed transfer function cannot describe the whole history because \\(U\\) changes with medium. Each medium has its own transfer function, and the first phase’s final temperature becomes the second phase’s initial condition.",
          },
        ],
      },
    ],
    answer: {
      id: "Fungsi alih di air adalah \\(1/(10s+1)\\); di udara \\(1/(50s+1)\\). Kita memakai \\(E_d=T_{\\mathrm{keluar}}-T_{\\mathrm{masuk}}\\). Galat pada 10, 20, dan 50 s adalah −29,43036; −10,82682; dan −0,53904°C. Galat pada 120 dan 300 s adalah +24,03581 dan +0,65675°C.",
      en: "The transfer function is \\(1/(10s+1)\\) in water and \\(1/(50s+1)\\) in air. We use \\(E_d=T_{\\mathrm{out}}-T_{\\mathrm{in}}\\). Errors at 10, 20, and 50 s are −29.43036, −10.82682, and −0.53904°C. Errors at 120 and 300 s are +24.03581 and +0.65675°C.",
    },
    answerMath:
      "\\boxed{\\begin{aligned}\\tau_w&=10\\ \\mathrm s,\\quad\\tau_a=50\\ \\mathrm s\\\\E_d(10)&=-29.43036^\\circ\\mathrm C\\\\E_d(20)&=-10.82682^\\circ\\mathrm C\\\\E_d(50)&=-0.53904^\\circ\\mathrm C\\\\E_d(120)&=+24.03581^\\circ\\mathrm C\\\\E_d(300)&=+0.65675^\\circ\\mathrm C\\end{aligned}}",
    visual: {
      kind: "thermal-cycle",
      params: {
        cold: 20,
        hot: 100,
        switchTime: 60,
        tauHot: 10,
        tauCold: 50,
      },
      caption: {
        id: "Pada 60 s, medium dan konstanta waktu berubah. Suhu sensor tetap kontinu; galat membandingkannya dengan suhu medium saat itu.",
        en: "At 60 s the medium and time constant change. Sensor temperature remains continuous; error compares it with the current medium temperature.",
      },
    },
    assumptions: [
      {
        id: "Sensor dianggap bersuhu seragam dan mula-mula setimbang pada 20°C. Nilai sifat termal mengikuti angka cetak soal, termasuk C=0,2 J/(kg·°C).",
        en: "The sensor is treated as isothermal and initially at 20°C equilibrium. Thermal properties follow the printed values, including C=0.2 J/(kg·°C).",
      },
      {
        id: "Galat bertanda didefinisikan sebagai suhu keluaran dikurangi suhu masukan. Nilai mutlaknya tetap sama jika konvensi tanda dibalik.",
        en: "Signed error is output temperature minus input temperature. Its magnitude is unchanged under the opposite sign convention.",
      },
    ],
  },
  {
    id: "2024-uts1-q5",
    year: 2024,
    exam: "uts1",
    number: 5,
    title: {
      id: "Gangguan suhu dan catu pada pengukur tekanan",
      en: "Temperature and supply effects on a pressure gauge",
    },
    topic: "calibration",
    source: {
      url: "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
      file: "2024-uts1.pdf",
      pages: [2],
    },
    original:
      "5. [20%] Under standard condition, a pressure gauge operates according to \\(i=4p+0.04\\), where i is electrical current in mA and p is measured pressure in barg. When the gauge operates at ambient temperature 5°C higher than the standard condition, and the battery is normal, the equation becomes \\(i=4p+0.06\\). When the temperature is standardized, but the battery is 0.2 volts lower than the standard, the equation becomes \\(i=4.1p+0.04\\). If the gauge is modelled as \\(i=(K+K_MI_M)p+(a+K_II_I)\\), (a) calculate K, \\(K_M\\), a and \\(K_I\\); (b) what are the units of each?",
    originalLanguage: "en",
    prompt: {
      id: "Pada kondisi standar, pengukur tekanan mengikuti \\(i=4p+0{,}04\\), dengan i dalam mA dan p dalam bar gauge. Saat suhu lingkungan 5°C lebih tinggi dan catu normal, persamaan menjadi \\(i=4p+0{,}06\\). Saat suhu normal dan catu 0,2 V lebih rendah, persamaan menjadi \\(i=4{,}1p+0{,}04\\). Untuk model \\(i=(K+K_MI_M)p+(a+K_II_I)\\), (a) cari K, \\(K_M\\), a, dan \\(K_I\\); (b) nyatakan satuannya.",
      en: "At standard conditions a pressure gauge follows \\(i=4p+0.04\\), with i in mA and p in bar gauge. At 5°C above standard ambient temperature with normal supply, it follows \\(i=4p+0.06\\). At standard temperature with supply 0.2 V lower, it follows \\(i=4.1p+0.04\\). For \\(i=(K+K_MI_M)p+(a+K_II_I)\\), (a) find K, \\(K_M\\), a, and \\(K_I\\); (b) state their units.",
    },
    steps: [
      {
        title: {
          id: "a · Pisahkan kemiringan dan titik nol",
          en: "a · Separate slope from zero offset",
        },
        body: [
          {
            id: "Pada garis \\(i=4p+0{,}04\\), angka 4 mengalikan tekanan. Angka tersebut menjadi **sensitivitas** (perubahan keluaran per perubahan tekanan). Angka 0,04 tetap ada saat \\(p=0\\), sehingga menjadi **offset** (keluaran pada masukan nol).",
            en: "We separate the slope from the zero-input output in \\(i=4p+0.04\\). The factor 4 is **sensitivity**, output change per pressure change. The 0.04 term remains when \\(p=0\\); it is the **offset**, or zero-input output.",
          },
          {
            id: "Model soal memberi dua tempat masuk gangguan: \\(K_MI_M\\) mengubah kemiringan, sedangkan \\(K_II_I\\) mengubah offset. Kita cocokkan perubahan pada dua persamaan uji dengan peran tersebut.",
            en: "The model provides two disturbance effects: \\(K_MI_M\\) changes slope, while \\(K_II_I\\) changes offset. Match the two test equations to those roles.",
          },
        ],
      },
      {
        title: {
          id: "a · Definisikan gangguan sebagai perubahan dari standar",
          en: "a · Define disturbances as deviations from standard",
        },
        body: [
          {
            id: "Tetapkan \\(I_M=V_s-V_{s,0}\\), perubahan catu dari catu standar. Tetapkan \\(I_I=T_a-T_{a,0}\\), perubahan suhu dari suhu standar. Nilai standar absolutnya tidak perlu diketahui untuk menghitung perubahan.",
            en: "Define \\(I_M=V_s-V_{s,0}\\), supply change from standard, and \\(I_I=T_a-T_{a,0}\\), ambient-temperature change from standard. The absolute standard values are not needed to calculate the deviations.",
          },
          {
            id: "Pada uji suhu, \\(I_I=+5^\\circ\\mathrm C\\) dan \\(I_M=0\\). Pada uji baterai, \\(I_M=-0{,}2\\) V dan \\(I_I=0\\). Tanda minus pada perubahan catu harus dipertahankan.",
            en: "For the temperature test, \\(I_I=+5^\\circ\\mathrm C,I_M=0\\). For the battery test, \\(I_M=-0.2\\) V,\\(I_I=0\\). Preserve the minus sign on the supply change.",
          },
        ],
        math: "I_M=V_s-V_{s,0},\\qquad I_I=T_a-T_{a,0}",
      },
      {
        title: {
          id: "a · Ambil K dan a dari kondisi standar",
          en: "a · Read K and a from standard conditions",
        },
        body: [
          {
            id: "Saat kedua gangguan nol, model menyusut menjadi \\(i=Kp+a\\). Cocokkan suku yang mengalikan \\(p\\) dan suku konstanta dengan \\(i=4p+0{,}04\\).",
            en: "With both disturbances zero, the model reduces to \\(i=Kp+a\\). Match the coefficient of \\(p\\) and the constant term to \\(i=4p+0.04\\).",
          },
          {
            id: "Tekanan memakai bar dan keluaran memakai mA, sehingga K mempunyai satuan mA/bar. Offset a langsung memakai satuan keluaran, yaitu mA.",
            en: "With pressure in bar and output in mA, K has units mA/bar. Offset a directly uses the output unit, mA.",
          },
        ],
        math: "K=4\\ \\mathrm{mA/bar},\\qquad a=0.04\\ \\mathrm{mA}",
      },
      {
        title: {
          id: "a · Gunakan perubahan offset untuk mencari KI",
          en: "a · Use the offset change to find KI",
        },
        body: [
          {
            id: "Pada uji suhu, kemiringan tetap 4. Hanya offset yang naik dari 0,04 ke 0,06 mA. Maka tambahan 0,02 mA berasal dari \\(K_I(5)\\).",
            en: "In the temperature test the slope stays at 4. Only offset rises from 0.04 to 0.06 mA. The extra 0.02 mA must come from \\(K_I(5)\\).",
          },
          {
            id: "Kurangi offset standar dari kedua ruas, lalu bagi dengan kenaikan suhu 5°C. Tanda positif berarti suhu lingkungan yang lebih tinggi menaikkan keluaran nol.",
            en: "Subtract the standard offset, then divide by the 5°C temperature rise. The positive sign means warmer surroundings raise zero-input output.",
          },
        ],
        math: "0.06=0.04+5K_I\\quad\\Longrightarrow\\quad K_I=\\frac{0.06-0.04}{5}=0.004\\ \\mathrm{mA}/{}^\\circ\\mathrm C",
      },
      {
        title: {
          id: "a · Gunakan perubahan kemiringan untuk mencari KM",
          en: "a · Use the slope change to find KM",
        },
        body: [
          {
            id: "Pada uji baterai, offset tetap 0,04 mA tetapi kemiringan naik dari 4 menjadi 4,1 mA/bar. Suku \\(K_MI_M\\) harus memberi kenaikan 0,1 mA/bar.",
            en: "In the battery test, offset stays at 0.04 mA while slope rises from 4 to 4.1 mA/bar. The term \\(K_MI_M\\) must therefore contribute 0.1 mA/bar.",
          },
          {
            id: "Perubahan catu adalah −0,2 V. Membagi kenaikan kemiringan dengan bilangan negatif memberi \\(K_M<0\\): penurunan catu justru menaikkan sensitivitas pada model ini.",
            en: "Supply change is−0.2 V. Dividing the slope increase by a negative value gives \\(K_M<0\\): lower supply increases sensitivity in this model.",
          },
        ],
        math: "4.1=4+K_M(-0.2)\\quad\\Longrightarrow\\quad K_M=\\frac{4.1-4}{-0.2}=-0.5\\ \\frac{\\mathrm{mA}}{\\mathrm{bar\\,V}}",
      },
      {
        title: {
          id: "b · Periksa satuan tiap suku",
          en: "b · Check the units of every term",
        },
        body: [
          {
            id: "Semua suku yang dijumlahkan menjadi i harus mempunyai satuan mA. Suku \\(K_MI_M\\) harus bersatuan mA/bar sebelum dikalikan tekanan. Suku \\(K_II_I\\) langsung bersatuan mA.",
            en: "Every term added into i must have mA units. Thus \\(K_MI_M\\) must have mA/bar units before multiplying pressure, whereas \\(K_II_I\\) directly has mA units.",
          },
        ],
        table: {
          headers: [
            {
              id: "Konstanta",
              en: "Constant",
            },
            {
              id: "Nilai",
              en: "Value",
            },
            {
              id: "Satuan",
              en: "Unit",
            },
          ],
          rows: [
            ["K", "4", "mA/bar"],
            ["K_M", "−0.5", "mA/(bar·V)"],
            ["a", "0.04", "mA"],
            ["K_I", "0.004", "mA/°C"],
          ],
        },
      },
      {
        title: {
          id: "Masukkan kembali kedua uji untuk memeriksa tanda",
          en: "Substitute both tests back to check signs",
        },
        body: [
          {
            id: "Untuk suhu+5°C, tambahan offset adalah \\(0{,}004(5)=0{,}02\\) mA, sehingga offset menjadi 0,06 mA. Untuk catu−0,2 V, tambahan kemiringan adalah \\((-0{,}5)(-0{,}2)=+0{,}1\\) mA/bar.",
            en: "For+5°C, the offset addition is \\(0.004(5)=0.02\\) mA, giving 0.06 mA. For−0.2 V, the slope addition is \\((-0.5)(-0.2)=+0.1\\) mA/bar.",
          },
          {
            id: "Kedua persamaan uji kembali tepat. Cek ini menunjukkan mengapa mengganti−0,2 V dengan besarnya 0,2 V akan memberi tanda \\(K_M\\) yang salah.",
            en: "Both test equations are recovered exactly. This check shows why replacing−0.2 V with its magnitude 0.2 V would give the wrong sign for \\(K_M\\).",
          },
        ],
        math: "i=\\bigl[4-0.5(V_s-V_{s,0})\\bigr]p+0.04+0.004(T_a-T_{a,0})\\quad[\\mathrm{mA}]",
      },
    ],
    answer: {
      id: "K=4 mA/bar, a=0,04 mA, K_M=−0,5 mA/(bar·V), dan K_I=0,004 mA/°C. Perubahan catu memodifikasi sensitivitas; perubahan suhu menggeser offset.",
      en: "K=4 mA/bar, a=0.04 mA, K_M=−0.5 mA/(bar·V), and K_I=0.004 mA/°C. Supply variation modifies sensitivity; temperature variation shifts offset.",
    },
    answerMath:
      "\\boxed{\\begin{aligned}K&=4\\ \\mathrm{mA/bar},&a&=0.04\\ \\mathrm{mA}\\\\K_M&=-0.5\\ \\mathrm{mA/(bar\\,V)},&K_I&=0.004\\ \\mathrm{mA}/{}^\\circ\\mathrm C\\end{aligned}}",
    visual: {
      kind: "calibration",
      params: {
        xs: [0, 1],
        ys: [0.04, 4.04],
        yAmbient: [0.06, 4.06],
        ySupply: [0.04, 4.14],
        inputUnit: "bar",
        outputUnit: "mA",
        supplyChange: -0.2,
        temperatureChange: 5,
      },
      caption: {
        id: "Dua tekanan contoh pada garis sumber memperlihatkan pergeseran offset saat suhu naik dan perubahan kemiringan saat catu turun.",
        en: "Two example pressures on the source lines show an offset shift with warming and a slope change with lower supply.",
      },
    },
    assumptions: [
      {
        id: "I_M dan I_I adalah perubahan dari kondisi standar. Suhu dan tegangan standar absolut tidak diberikan. Titik 0 dan 1 bar pada visual adalah titik contoh dari persamaan, bukan data uji baru.",
        en: "I_M and I_I are deviations from standard conditions. Absolute standard temperature and voltage are not supplied. The visual’s 0 and 1 bar points are examples evaluated from the equations, not new test data.",
      },
    ],
  },
  {
    id: "2024-uts1-q6",
    year: 2024,
    exam: "uts1",
    number: 6,
    title: {
      id: "Rata-rata dan sebaran tegangan dari koefisien sensor",
      en: "Mean and voltage spread from sensor coefficients",
    },
    topic: "statistics",
    source: {
      url: "https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view",
      file: "2024-uts1.pdf",
      pages: [2],
    },
    original:
      "6. [15%] A sensing element with characteristic \\(E=a_0+a_1T+a_2T^2\\) measures temperature at \\(T=120^\\circ\\mathrm C\\). Here E represents output voltage in μV and T is the measured temperature in °C. Statistical data is presented in Table 1 after one hundred samples tested in the laboratory. Parameter \\(a_0\\): average 1.2, standard deviation \\(0.1\\times10^{-1}\\). Parameter \\(a_1\\): average \\(1.8\\times10^{-2}\\), standard deviation \\(0.1\\times10^{-2}\\). Parameter \\(a_2\\): average \\(2.4\\times10^{-4}\\), standard deviation 0. Calculate average value and standard deviation of E. Assume that the distribution is normal or Gaussian.",
    originalLanguage: "en",
    prompt: {
      id: "Sensor mengikuti \\(E=a_0+a_1T+a_2T^2\\), dengan E dalam μV dan T dalam °C. Pada \\(T=120^\\circ\\mathrm C\\), cari rata-rata serta simpangan baku E. Tabel dari 100 sampel memberi rata-rata koefisien \\([1{,}2;\\,1{,}8\\times10^{-2};\\,2{,}4\\times10^{-4}]\\) untuk \\(a_0,a_1,a_2\\), dan simpangan baku \\([0{,}1\\times10^{-1};\\,0{,}1\\times10^{-2};\\,0]\\). Soal menyatakan distribusi normal atau Gaussian.",
      en: "A sensor follows \\(E=a_0+a_1T+a_2T^2\\), with E in μV and T in °C. At \\(T=120^\\circ\\mathrm C\\), find the mean and standard deviation of E. A table from 100 samples gives coefficient means \\([1.2,\\,1.8\\times10^{-2},\\,2.4\\times10^{-4}]\\) for \\(a_0,a_1,a_2\\), and standard deviations \\([0.1\\times10^{-1},\\,0.1\\times10^{-2},\\,0]\\). The question specifies a normal or Gaussian distribution.",
    },
    steps: [
      {
        title: {
          id: "Tentukan mana yang tetap dan mana yang bervariasi",
          en: "Identify fixed and varying quantities",
        },
        body: [
          {
            id: "Suhu 120°C kita perlakukan sebagai masukan tetap. Yang bervariasi antarsampel adalah koefisien \\(a_0,a_1,a_2\\). Walau model memuat \\(T^2\\), pada suhu tetap ia merupakan penjumlahan berbobot dari ketiga koefisien.",
            en: "We hold the 120°C input fixed to isolate the effect of varying sensor coefficients. The coefficients \\(a_0,a_1,a_2\\) vary between samples. Although the model contains \\(T^2\\), at fixed temperature it is a weighted sum of the coefficients.",
          },
          {
            id: "Bobotnya adalah 1, 120, dan 14400. Artinya, perubahan kecil pada \\(a_1\\) dikalikan 120 ketika muncul sebagai perubahan tegangan E.",
            en: "The weights are 1, 120, and 14400. A small variation in \\(a_1\\) is therefore multiplied by 120 when it appears as voltage variation.",
          },
        ],
        math: "E=a_0+120a_1+14400a_2",
      },
      {
        title: {
          id: "Baca notasi ilmiah dan satuan koefisien",
          en: "Read the scientific notation and coefficient units",
        },
        body: [
          {
            id: "Tabel memberi \\(\\sigma_{a_0}=0{,}1\\times10^{-1}=0{,}01\\) dan \\(\\sigma_{a_1}=0{,}1\\times10^{-2}=0{,}001\\). Faktor 0,1 tetap harus ikut dikalikan; jangan membacanya sebagai \\(10^{-1}\\) atau \\(10^{-2}\\) saja.",
            en: "The table gives \\(\\sigma_{a_0}=0.1\\times10^{-1}=0.01\\) and \\(\\sigma_{a_1}=0.1\\times10^{-2}=0.001\\). Keep the 0.1 multiplier; these are not \\(10^{-1}\\) or \\(10^{-2}\\).",
          },
          {
            id: "Semua suku harus memberi μV setelah dikalikan faktor suhunya. Jadi \\(a_0\\) bersatuan μV, \\(a_1\\) bersatuan μV/°C, dan \\(a_2\\) bersatuan μV/(°C)². Simpangan baku tiap koefisien memakai satuan koefisiennya sendiri.",
            en: "To make every term a voltage, \\(a_0\\) uses μV, \\(a_1\\) uses μV/°C, and \\(a_2\\) uses μV/(°C)². Each coefficient’s standard deviation has that coefficient’s unit.",
          },
        ],
        table: {
          headers: [
            {
              id: "Koefisien",
              en: "Coefficient",
            },
            {
              id: "Rata-rata",
              en: "Mean",
            },
            {
              id: "Simpangan baku",
              en: "Standard deviation",
            },
          ],
          rows: [
            ["a₀", "1.2 μV", "0.01 μV"],
            ["a₁", "0.018 μV/°C", "0.001 μV/°C"],
            ["a₂", "0.00024 μV/(°C)²", "0 μV/(°C)²"],
          ],
        },
      },
      {
        title: {
          id: "Hitung rata-rata keluaran dari rata-rata koefisien",
          en: "Calculate output mean from coefficient means",
        },
        body: [
          {
            id: "Rata-rata suatu jumlah sama dengan jumlah rata-ratanya. Nilai T tetap, sehingga bobot 120 dan 14400 juga tetap. Kita masukkan setiap rata-rata koefisien ke model.",
            en: "The mean of a sum equals the sum of the means. With fixed T, the weights 120 and 14400 are fixed too. Insert each coefficient mean into the model.",
          },
          {
            id: "Tiga kontribusinya adalah 1,2 μV dari offset, 2,16 μV dari suku linear, dan 3,456 μV dari suku kuadrat. Jumlahnya 6,816 μV.",
            en: "The three contributions are 1.2 μV from the offset, 2.16 μV from the linear term, and 3.456 μV from the quadratic term. They sum to 6.816 μV.",
          },
        ],
        math: "\\bar E=\\bar a_0+120\\bar a_1+14400\\bar a_2=1.2+120(0.018)+14400(0.00024)=6.816\\ \\mu\\mathrm V",
      },
      {
        title: {
          id: "Nyatakan syarat sebelum menjumlahkan varians",
          en: "State the condition for adding variances",
        },
        body: [
          {
            id: "Untuk mencari sebaran E dari simpangan baku koefisien, kita perlu mengetahui hubungan variasi koefisien. Jawaban numerik biasa mengasumsikan koefisien tidak berkorelasi, misalnya saling independen.",
            en: "To find E’s spread from coefficient standard deviations, we need the relation between their variations. The usual numerical answer assumes uncorrelated coefficients, for example independent ones.",
          },
          {
            id: "Keterangan “normal” saja tidak menjamin asumsi tersebut. Kita nyatakan asumsi ini karena tabel tidak memberi kovarians. Dengan kovarians nol, varians kontribusi dapat dijumlahkan.",
            en: "The word “normal” alone does not guarantee this. State the assumption because the table gives no covariances. With zero covariance, contribution variances can be added.",
          },
          {
            id: "**Kovarians** (ukuran apakah dua koefisien berubah bersama) menentukan apakah perlu suku silang. Kovarians nol memungkinkan kita menjumlahkan varians tanpa suku silang.",
            en: "**Covariance** measures whether two coefficients vary together. Zero covariance lets us add their variance contributions without a cross term.",
          },
        ],
        math: "\\sigma_E^2=\\sigma_{a_0}^2+T^2\\sigma_{a_1}^2+T^4\\sigma_{a_2}^2\\quad(\\text{zero covariance})",
      },
      {
        title: {
          id: "Ubah setiap simpangan baku ke satuan tegangan",
          en: "Convert each standard deviation into voltage units",
        },
        body: [
          {
            id: "Mengalikan peubah acak dengan konstanta c mengalikan simpangan bakunya dengan \\(|c|\\), sedangkan variansnya dengan \\(c^2\\). Jadi simpangan tegangan dari \\(a_1\\) adalah \\(120(0{,}001)=0{,}12\\) μV.",
            en: "Multiplying a random variable by c multiplies its standard deviation by \\(|c|\\) and its variance by \\(c^2\\). The voltage standard deviation from \\(a_1\\) is therefore \\(120(0.001)=0.12\\) μV.",
          },
          {
            id: "Kontribusi dari \\(a_0\\) adalah 0,01 μV. Suku kuadrat tetap menyumbang 3,456 μV ke rata-rata. Suku tersebut tidak menambah sebaran pada model ini karena \\(\\sigma_{a_2}=0\\).",
            en: "The \\(a_0\\) contribution is 0.01 μV. Since \\(\\sigma_{a_2}=0\\), the quadratic term still contributes 3.456 μV to the mean but adds no spread in this model.",
          },
        ],
        math: "\\sigma_{0,E}=0.01\\ \\mu\\mathrm V,\\qquad\\sigma_{1,E}=0.12\\ \\mu\\mathrm V,\\qquad\\sigma_{2,E}=0",
      },
      {
        title: {
          id: "Jumlahkan kuadrat kontribusi lalu ambil akar",
          en: "Add squared contributions, then take the square root",
        },
        body: [
          {
            id: "Jumlahkan \\(0{,}01^2\\), \\(0{,}12^2\\), dan 0 untuk memperoleh varians 0,0145(μV)². Baru setelah itu ambil akar.",
            en: "Add \\(0.01^2\\), \\(0.12^2\\), and 0 to obtain variance 0.0145(μV)². Then take the square root.",
          },
          {
            id: "Hasil 0,120416 μV dekat dengan kontribusi 0,12 μV dari \\(a_1\\), karena kontribusi tersebut mendominasi varians. Menjumlahkan 0,01 dan 0,12 langsung akan menganggap variasi bertambah bersama secara sempurna.",
            en: "The 0.120416 μV result is close to the 0.12 μV contribution from \\(a_1\\), which dominates variance. Adding 0.01 and 0.12 directly would instead assume perfectly aligned variations.",
          },
        ],
        math: "\\sigma_E=\\sqrt{(0.01)^2+(0.12)^2+0}=\\sqrt{0.0145}=0.120416\\ \\mu\\mathrm V",
      },
      {
        title: {
          id: "Bedakan sebaran keluaran dari ketidakpastian rata-rata",
          en: "Distinguish output spread from uncertainty of a mean",
        },
        body: [
          {
            id: "Soal meminta simpangan baku E, yaitu sebaran keluaran yang mengikuti variasi koefisien. Angka 100 sampel menjelaskan asal statistik tabel, bukan perintah untuk membagi hasil dengan 10.",
            en: "The question asks for E’s standard deviation: output spread arising from coefficient variation. The 100 samples explain where the table statistics came from, not an instruction to divide this result by 10.",
          },
          {
            id: "Pembagian dengan akar jumlah sampel dipakai untuk galat baku rata-rata dalam model sampel independen. Galat baku mengukur ketidakpastian rata-rata, bukan sebaran tiap keluaran. Di bawah asumsi koefisien normal independen, E juga normal karena merupakan kombinasi linear pada T tetap.",
            en: "Dividing by the square root of sample size gives the standard error of a mean under independent sampling. The standard error describes uncertainty in the mean, rather than the spread of individual outputs. With independent normal coefficients, E is also normal because it is a linear combination at fixed T.",
          },
        ],
        math: "E\\sim\\mathcal N\\!\\left(6.816,\\ 0.0145\\right)\\quad[E\\text{ in }\\mu\\mathrm V]",
      },
      {
        title: {
          id: "Jelaskan batas informasi jika koefisien berkorelasi",
          en: "Explain the information limit if coefficients correlate",
        },
        body: [
          {
            id: "Jika \\(a_0\\) dan \\(a_1\\) berkorelasi, varians perlu tambahan \\(2T\\,\\operatorname{Cov}(a_0,a_1)\\). Nilai \\(\\sigma_{a_2}=0\\) membuat suku kovarians yang melibatkan \\(a_2\\) nol.",
            en: "If \\(a_0,a_1\\) correlate, variance needs the term \\(2T\\,\\operatorname{Cov}(a_0,a_1)\\). The zero \\(\\sigma_{a_2}\\) makes covariance terms involving \\(a_2\\) vanish.",
          },
          {
            id: "Dengan koefisien korelasi \\(\\rho_{01}\\), varians menjadi \\(0{,}0145+0{,}0024\\rho_{01}\\). Rata-ratanya tetap 6,816 μV. Namun, simpangan baku 0,120416 μV mensyaratkan kovarians nol. Normalitas saja belum menentukan satu nilai unik.",
            en: "With correlation coefficient \\(\\rho_{01}\\), variance becomes \\(0.0145+0.0024\\rho_{01}\\). The mean remains 6.816 μV, but the 0.120416 μV standard deviation requires zero covariance; normality alone does not determine a unique value.",
          },
        ],
        math: "\\sigma_E^2=0.0145+0.0024\\rho_{01}\\quad[(\\mu\\mathrm V)^2]",
      },
    ],
    answer: {
      id: "Rata-rata keluaran 6,816 μV. Dengan koefisien tidak berkorelasi, simpangan bakunya 0,120416 μV. Jika kovarians koefisien tidak nol, tabel belum cukup untuk menentukan satu simpangan baku.",
      en: "Mean output is 6.816 μV. With uncorrelated coefficients, standard deviation is 0.120416 μV. Nonzero coefficient covariance requires more information for a unique standard deviation.",
    },
    answerMath:
      "\\boxed{\\bar E=6.816\\ \\mu\\mathrm V,\\qquad\\sigma_E=0.120416\\ \\mu\\mathrm V\\quad(\\operatorname{Cov}=0)}",
    visual: {
      kind: "uncertainty",
      params: {
        mode: "polynomial",
        input: 120,
        means: [1.2, 0.018, 0.00024],
        sds: [0.01, 0.001, 0],
      },
      caption: {
        id: "Bandingkan kontribusi varians koefisien pada suhu tetap. Perhitungan menganggap kovarians antarkoefisien nol.",
        en: "Compare coefficient variance contributions at fixed temperature. The calculation assumes zero covariance between coefficients.",
      },
    },
    assumptions: [
      {
        id: "T=120°C dianggap tetap tanpa ketidakpastian masukan. Untuk hasil numerik simpangan baku utama, koefisien diasumsikan tidak berkorelasi; asumsi ini tidak mengikuti normalitas saja.",
        en: "T=120°C is fixed without input uncertainty. The main standard-deviation result assumes uncorrelated coefficients; normality alone does not imply that assumption.",
      },
    ],
  },
];

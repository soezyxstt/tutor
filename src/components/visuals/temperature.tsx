import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Locale, VisualSpec } from "@/content/types";
import { IconButton, Parameter, TextSelect } from "@/components/controls";
import { Formula } from "@/components/math";
import {
  bridgeVoltage,
  endpointFit,
  firstOrder,
  stats,
  thermocoupleEMF,
} from "@/lib/models";
import { num, text } from "@/lib/i18n";
import { Metric, Playback, Svg, parr, pnum, pstr, useClock } from "./common";
import { Plot, type Series } from "./plot";

type Props = { spec: VisualSpec; locale: Locale };
const GREEN = "#597e3e";
const ORANGE = "#aa7043";
const GREY = "#8a949c";
const line = (start: number, end: number, fn: (x: number) => number, n = 100) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const x = start + ((end - start) * i) / n;
    return [x, fn(x)];
  });
const has = (spec: VisualSpec, key: string) =>
  typeof spec.params?.[key] === "number";

export function ThermocoupleVisual({ spec, locale }: Props) {
  const initialType = pstr(spec, "type", "J");
  const [type, setType] = useState(initialType);
  const [T, setT] = useState(pnum(spec, "T", 200));
  const [Tref, setTref] = useState(pnum(spec, "Tref", 20));
  const maximum = Math.min(
    type === "T" ? 400 : 500,
    pnum(spec, "rangeMax", type === "T" ? 400 : 500),
  );
  const hot = Math.min(maximum, Math.max(0, T));
  const cold = Math.min(maximum, Math.max(0, Tref));
  const eHot = thermocoupleEMF(hot, type),
    eCold = thermocoupleEMF(cold, type),
    measured = eHot - eCold;
  const series: Series[] = [
    {
      name: text(locale, "Tabel acuan 0°C", "0°C reference curve"),
      data: line(0, maximum, (x) => thermocoupleEMF(x, type)),
      color: GREEN,
    },
    {
      name: text(locale, "Garis dua ujung", "Endpoint line"),
      data: [
        [0, 0],
        [maximum, thermocoupleEMF(maximum, type)],
      ],
      color: GREY,
      dashed: true,
    },
    {
      name: text(locale, "Sambungan ukur", "Measuring junction"),
      data: [[hot, eHot]],
      type: "scatter",
      color: ORANGE,
    },
    {
      name: text(locale, "Sambungan referensi", "Reference junction"),
      data: [[cold, eCold]],
      type: "scatter",
      color: "#537995",
    },
  ];
  return (
    <>
      <div className="visual-toolbar">
        <TextSelect
          label={text(locale, "Jenis termokopel", "Thermocouple type")}
          value={type}
          onChange={(v) => {
            setType(v);
            if (v === "T") {
              setT((t) => Math.min(t, 400));
              setTref((t) => Math.min(t, 400));
            }
          }}
          options={["J", "K", "T"].map((value) => ({
            value,
            label: `${text(locale, "Tipe", "Type")} ${value}`,
          }))}
        />
      </div>
      <Svg
        label={text(
          locale,
          "Logam A menuju terminal atas voltmeter; logam B melewati sambungan referensi lalu logam A menuju terminal bawah",
          "Metal A goes to the upper voltmeter terminal; metal B passes through the reference junction and metal A to the lower terminal",
        )}
        viewBox="0 0 500 134"
      >
        <path
          d="M70 54L115 27H428V33M300 82H428V75"
          fill="none"
          stroke={ORANGE}
          strokeWidth="4"
        />
        <path
          d="M70 54L115 82H300"
          fill="none"
          stroke="#537995"
          strokeWidth="4"
        />
        <circle cx="70" cy="54" r="7" fill={ORANGE} />
        <circle cx="300" cy="82" r="7" fill="#537995" />
        <circle
          cx="428"
          cy="54"
          r="21"
          fill="var(--background,#fff)"
          stroke="#7d8878"
          strokeWidth="1.5"
        />
        <text x="428" y="60" textAnchor="middle">
          V
        </text>
        <text x="70" y="115" textAnchor="middle">
          {text(locale, "Ukur", "Measure")}
        </text>
        <text x="300" y="125" textAnchor="middle">
          {text(locale, "Referensi", "Reference")}
        </text>
        <text x="264" y="17" textAnchor="middle">
          {text(locale, "Logam A", "Metal A")}
        </text>
        <text x="178" y="105" textAnchor="middle">
          {text(locale, "Logam B", "Metal B")}
        </text>
        <text x="385" y="106" textAnchor="middle">
          A
        </text>
      </Svg>
      <Plot
        locale={locale}
        height={180}
        xLabel="T (°C)"
        yLabel="E(T, 0) (mV)"
        xMin={0}
        xMax={maximum}
        series={series}
      />
      <div className="metrics">
        <Metric
          label={text(locale, "Tegangan terukur", "Measured voltage")}
          value={num(measured, locale, 3)}
          unit="mV"
        />
        <Metric
          label={text(locale, "Koreksi referensi", "Reference correction")}
          value={num(eCold, locale, 3)}
          unit="mV"
        />
      </div>
      <div className="parameter-grid">
        <Parameter
          label={text(locale, "Suhu ukur", "Measured temperature")}
          value={hot}
          min={0}
          max={maximum}
          step={1}
          digits={2}
          onChange={setT}
          unit="°C"
        />
        <Parameter
          label={text(locale, "Suhu referensi", "Reference temperature")}
          value={cold}
          min={0}
          max={maximum}
          step={1}
          digits={2}
          onChange={setTref}
          unit="°C"
        />
      </div>
      <Formula>{String.raw`E(T,T_{\mathrm{ref}})=E(T,0)-E(T_{\mathrm{ref}},0)`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          "Kurva memakai fungsi acuan ITS-90. Pembulatan tabel soal dapat memberi selisih kecil. Garis putus-putus menghubungkan kedua ujung rentang yang terlihat.",
          "The curve uses the ITS-90 reference function. Rounding in the exam table may give small differences. The dashed line connects the visible range endpoints.",
        )}
        {!has(spec, "T")
          ? ` ${text(locale, "Nilai awal adalah contoh untuk eksplorasi.", "Initial values are an illustrative example.")}`
          : ""}
      </p>
    </>
  );
}

function ResistanceComparison({ locale }: { locale: Locale }) {
  const [T, setT] = useState(25);
  const alpha = 0.00385,
    beta = 3950;
  const rtd = (t: number) => (1 + alpha * t) / (1 + alpha * 25);
  const ntc = (t: number) => Math.exp(beta * (1 / (t + 273.15) - 1 / 298.15));
  return (
    <>
      <Plot
        locale={locale}
        height={210}
        xLabel="T (°C)"
        yLabel="R(T) / R(25°C)"
        xMin={0}
        xMax={100}
        series={[
          { name: "RTD", data: line(0, 100, rtd), color: GREEN },
          { name: "NTC", data: line(0, 100, ntc), color: ORANGE },
          {
            name: text(locale, "RTD dipilih", "Selected RTD"),
            data: [[T, rtd(T)]],
            type: "scatter",
            color: GREEN,
          },
          {
            name: text(locale, "NTC dipilih", "Selected NTC"),
            data: [[T, ntc(T)]],
            type: "scatter",
            color: ORANGE,
          },
        ]}
      />
      <div className="metrics">
        <Metric label="RTD · R / R₂₅" value={num(rtd(T), locale, 3)} />
        <Metric label="NTC · R / R₂₅" value={num(ntc(T), locale, 3)} />
      </div>
      <Parameter
        label={text(locale, "Suhu", "Temperature")}
        value={T}
        min={0}
        max={100}
        onChange={setT}
        unit="°C"
      />
      <p className="visual-note">
        {text(
          locale,
          "Contoh model: RTD α = 0,00385/°C, NTC β = 3950 K. Keduanya dinormalisasi pada 25°C agar arah perubahan bisa dibandingkan; ini bukan data kalibrasi sensor soal.",
          "Illustrative models: RTD α = 0.00385/°C and NTC β = 3950 K. Both are normalised at 25°C to compare their response directions; these are not calibration data for a sensor in the exam.",
        )}
      </p>
    </>
  );
}

function DynamicRtd({ spec, locale }: Props) {
  const tauDefault = pnum(spec, "tau", 1),
    stepTime = pnum(spec, "stepTime", 0);
  const [tau, setTau] = useState(tauDefault),
    [targetT, setTargetT] = useState(pnum(spec, "finalTemperature", 100));
  const initialT = pnum(spec, "initialTemperature", 20),
    initialR = pnum(spec, "initialResistance", pnum(spec, "initial", 100));
  const sensitivity = pnum(
    spec,
    "K",
    (pnum(spec, "final", initialR + 1) - initialR) /
      (pnum(spec, "finalTemperature", 100) - initialT || 1),
  );
  const finalR = initialR + sensitivity * (targetT - initialT);
  const duration = Math.max(
    stepTime + 6 * tau,
    pnum(spec, "evaluationTime", 0) + tau,
  );
  const clock = useClock(duration);
  const response = (t: number) =>
    t < stepTime ? initialR : firstOrder(t - stepTime, tau, initialR, finalR);
  const value = response(clock.t);
  const endTime = Math.max(duration, stepTime + 6 * tau);
  const rangePadding = Math.max(Math.abs(finalR - initialR), 0.1) * 0.15;
  const series: Series[] = [
    {
      name: text(locale, "Respons R(t)", "Response R(t)"),
      data: line(0, endTime, response),
      color: GREEN,
    },
    {
      name: text(locale, "Nilai setimbang", "Equilibrium value"),
      data: [
        [0, initialR],
        [stepTime, initialR],
        [stepTime, finalR],
        [endTime, finalR],
      ],
      color: GREY,
      dashed: true,
    },
    {
      name: text(locale, "Saat ini", "Current reading"),
      data: [[clock.t, value]],
      type: "scatter",
      color: ORANGE,
    },
  ];
  return (
    <>
      <Plot
        locale={locale}
        height={210}
        xLabel="t (s)"
        yLabel="R (Ω)"
        xMin={0}
        xMax={endTime}
        yMin={Math.min(initialR, finalR) - rangePadding}
        yMax={Math.max(initialR, finalR) + rangePadding}
        series={series}
      />
      <Playback clock={clock} locale={locale} />
      <div className="metrics">
        <Metric
          label={text(locale, "Hambatan saat ini", "Current resistance")}
          value={num(value, locale, 5)}
          unit="Ω"
        />
        <Metric
          label={text(locale, "Nilai akhir", "Final resistance")}
          value={num(finalR, locale, 5)}
          unit="Ω"
        />
      </div>
      <div className="parameter-grid">
        <Parameter
          label={text(locale, "Konstanta waktu τ", "Time constant τ")}
          value={tau}
          min={Math.max(0.05, tauDefault / 5)}
          max={tauDefault * 3}
          step={0.05}
          digits={2}
          onChange={(v) => {
            setTau(v);
            clock.reset();
          }}
          unit="s"
        />
        <Parameter
          label={text(locale, "Suhu akhir", "Final temperature")}
          value={targetT}
          min={0}
          max={Math.max(200, pnum(spec, "finalTemperature", 100) * 1.5)}
          step={1}
          onChange={(v) => {
            setTargetT(v);
            clock.reset();
          }}
          unit="°C"
        />
      </div>
      <Parameter
        label={text(locale, "Waktu pengamatan", "Observation time")}
        value={clock.t}
        min={0}
        max={duration}
        step={0.01}
        digits={2}
        onChange={(v) => {
          clock.setPlaying(false);
          clock.setT(v);
        }}
        unit="s"
      />
      <Formula>{String.raw`R(t)=R_0+K\Delta T\left(1-e^{-(t-t_s)/\tau}\right),\quad t\ge t_s`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `Perubahan suhu mulai pada t = ${num(stepTime, locale, 2)} s. K = ${num(sensitivity, locale, 4)} Ω/°C adalah sensitivitas mutlak, bukan koefisien relatif α.`,
          `The temperature step starts at t = ${num(stepTime, locale, 2)} s. K = ${num(sensitivity, locale, 4)} Ω/°C is an absolute sensitivity, not a relative coefficient α.`,
        )}
      </p>
    </>
  );
}

function StaticRtd({ spec, locale }: Props) {
  const R0 = pnum(spec, "R0", 100),
    alpha = pnum(spec, "alpha", 0.00385);
  const [T, setT] = useState(pnum(spec, "T", 100));
  const maximum = Math.max(200, pnum(spec, "T", 100) * 1.5);
  const resistance = (t: number) => R0 * (1 + alpha * t);
  return (
    <>
      <Plot
        locale={locale}
        height={210}
        xLabel="T (°C)"
        yLabel="R (Ω)"
        series={[
          { name: "RTD", data: line(0, maximum, resistance), color: GREEN },
          {
            name: text(locale, "Suhu dipilih", "Selected temperature"),
            data: [[T, resistance(T)]],
            type: "scatter",
            color: ORANGE,
          },
        ]}
      />
      <div className="metrics">
        <Metric
          label={text(locale, "Hambatan RTD", "RTD resistance")}
          value={num(resistance(T), locale, 4)}
          unit="Ω"
        />
      </div>
      <Parameter
        label={text(locale, "Suhu", "Temperature")}
        value={T}
        min={0}
        max={maximum}
        onChange={setT}
        unit="°C"
      />
      <Formula>{String.raw`R(T)=R_0(1+\alpha T)`}</Formula>
      {!has(spec, "R0") && (
        <p className="visual-note">
          {text(
            locale,
            "Contoh ilustratif: R₀ = 100 Ω dan α = 0,00385/°C.",
            "Illustrative example: R₀ = 100 Ω and α = 0.00385/°C.",
          )}
        </p>
      )}
    </>
  );
}

export function RtdVisual({ spec, locale }: Props) {
  if (pstr(spec, "mode", "") === "compare")
    return <ResistanceComparison locale={locale} />;
  if (has(spec, "tau")) return <DynamicRtd spec={spec} locale={locale} />;
  if (spec.params?.topology || has(spec, "R1"))
    return <BridgeVisual spec={spec} locale={locale} />;
  return <StaticRtd spec={spec} locale={locale} />;
}

function Resistor({
  x,
  y,
  horizontal = false,
  name,
  colour = "#7c8c70",
  capacitor = false,
}: {
  x: number;
  y: number;
  horizontal?: boolean;
  name: string;
  colour?: string;
  capacitor?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {capacitor ? (
        <g>
          <path
            d={horizontal ? "M-5 -14V14M5 -14V14" : "M-14 -5H14M-14 5H14"}
            fill="none"
            stroke={colour}
            strokeWidth="3"
          />
        </g>
      ) : (
        <rect
          x={horizontal ? -21 : -7}
          y={horizontal ? -7 : -21}
          width={horizontal ? 42 : 14}
          height={horizontal ? 14 : 42}
          fill="var(--background,#fff)"
          stroke={colour}
          strokeWidth="2"
          rx="1"
        />
      )}
      <text
        x={horizontal ? 0 : 21}
        y={horizontal ? -16 : 5}
        textAnchor={horizontal ? "middle" : "start"}
        fill={colour}
      >
        {name}
      </text>
    </g>
  );
}

function BridgeDiagram({
  locale,
  side,
  capacitive = false,
}: {
  locale: Locale;
  side: boolean;
  capacitive?: boolean;
}) {
  return side ? (
    <Svg
      label={text(
        locale,
        "Jembatan dengan catu kiri-kanan dan keluaran VB dikurangi VA",
        "Bridge with left-to-right supply and output VB minus VA",
      )}
      viewBox="0 0 500 215"
    >
      <path
        d="M50 55H450V155H50ZM250 55V83M250 127V155"
        fill="none"
        stroke="#8c9586"
        strokeWidth="2"
      />
      <Resistor x={145} y={55} horizontal name="R₂" />
      <Resistor x={355} y={55} horizontal name="R₃" />
      <Resistor x={145} y={155} horizontal name="R₁" />
      <Resistor x={355} y={155} horizontal name="R₄ · RTD" colour={ORANGE} />
      <circle
        cx="250"
        cy="105"
        r="22"
        fill="var(--background,#fff)"
        stroke="#8c9586"
      />
      <text x="250" y="111" textAnchor="middle">
        V
      </text>
      <circle cx="250" cy="55" r="4" fill={GREEN} />
      <circle cx="250" cy="155" r="4" fill={ORANGE} />
      <text x="267" y="49">
        A −
      </text>
      <text x="267" y="178">
        B +
      </text>
      <text x="50" y="192" textAnchor="middle">
        +Vₛ
      </text>
      <text x="450" y="192" textAnchor="middle">
        0 V
      </text>
    </Svg>
  ) : (
    <Svg
      label={text(
        locale,
        "Jembatan dengan catu atas-bawah dan keluaran VA dikurangi VB",
        "Bridge with top-to-bottom excitation and output VA minus VB",
      )}
      viewBox="0 0 500 235"
    >
      <path
        d="M130 25H350V195H130ZM130 110H220M260 110H350"
        fill="none"
        stroke="#8c9586"
        strokeWidth="2"
      />
      <Resistor
        x={130}
        y={66}
        name={capacitive ? "Cₛ" : "R₁"}
        capacitor={capacitive}
        colour={capacitive ? ORANGE : GREEN}
      />
      <Resistor
        x={130}
        y={153}
        name={capacitive ? "Cᵣ" : "R₂"}
        capacitor={capacitive}
      />
      <Resistor x={350} y={66} name={capacitive ? "R" : "R₃"} />
      <Resistor
        x={350}
        y={153}
        name={capacitive ? "R" : "R₄"}
        colour={capacitive ? GREEN : ORANGE}
      />
      <circle
        cx="240"
        cy="110"
        r="20"
        fill="var(--background,#fff)"
        stroke="#8c9586"
      />
      <text x="240" y="116" textAnchor="middle">
        V
      </text>
      <circle cx="130" cy="110" r="4" fill={GREEN} />
      <circle cx="350" cy="110" r="4" fill={ORANGE} />
      <text x="83" y="115">
        A +
      </text>
      <text x="363" y="115">
        B −
      </text>
      <text x="240" y="16" textAnchor="middle">
        {capacitive ? "~ Vₛ" : "+Vₛ"}
      </text>
      <text x="240" y="211" textAnchor="middle">
        0 V
      </text>
    </Svg>
  );
}

function CapacitiveBridge({ spec, locale }: Props) {
  const initial = pnum(spec, "Cs", 100),
    reference = pnum(spec, "Cref", 100),
    [Cs, setCs] = useState(initial);
  const [V, setV] = useState(pnum(spec, "excitation", 1));
  const output = V * (Cs / (Cs + reference) - 0.5);
  return (
    <>
      <BridgeDiagram locale={locale} side={false} capacitive />
      <div className="metrics">
        <Metric
          label={text(locale, "Keluaran bertanda", "Signed output")}
          value={num(output * 1000, locale, 3)}
          unit="mV"
        />
        <Metric
          label={text(locale, "Kapasitor acuan Cᵣ", "Reference capacitor Cᵣ")}
          value={num(reference, locale, 2)}
          unit="pF"
        />
      </div>
      <div className="parameter-grid">
        <Parameter
          label={text(locale, "Kapasitansi sensor Cₛ", "Sensor capacitance Cₛ")}
          value={Cs}
          min={Math.max(1, initial / 10)}
          max={initial * 3}
          step={1}
          onChange={setCs}
          unit="pF"
        />
        <Parameter
          label={text(
            locale,
            "Amplitudo eksitasi AC",
            "AC excitation amplitude",
          )}
          value={V}
          min={0.1}
          max={5}
          step={0.1}
          onChange={setV}
          unit="V"
        />
      </div>
      <Formula>{String.raw`V_o=V_s\left(\frac{C_s}{C_s+C_r}-\frac12\right)`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          "Dua resistor kanan sama besar. Kedua kapasitor kiri membagi tegangan AC; rangkaian tidak bekerja untuk pengukuran DC tunak. Besaran keluaran memakai konvensi amplitudo yang sama dengan eksitasi. Nilai kapasitansi ini contoh jembatan seimbang.",
          "The right-hand resistors are equal. The left-hand capacitors divide AC voltage; this circuit does not measure a steady DC input. Output uses the same amplitude convention as excitation. Capacitances illustrate a balanced bridge.",
        )}
      </p>
    </>
  );
}

export function BridgeVisual({ spec, locale }: Props) {
  if (pstr(spec, "mode", "") === "capacitive")
    return <CapacitiveBridge spec={spec} locale={locale} />;
  return <ResistiveBridge spec={spec} locale={locale} />;
}

function ResistiveBridge({ spec, locale }: Props) {
  const side =
    pstr(spec, "topology", "") === "side-excitation" ||
    pstr(spec, "mode", "") === "rtd-horizontal";
  const thermal = has(spec, "R0");
  const sensorArm = pnum(spec, "variableArm", 4);
  const sensorR1 = sensorArm === 1 && !thermal;
  const R1source = pnum(spec, "R1", 100),
    R2 = pnum(spec, "R2", 100),
    R3 = pnum(spec, "R3", 100);
  const R0 = pnum(spec, "R0", 100),
    alpha = pnum(spec, "alpha", 0.00385);
  const [T, setT] = useState(pnum(spec, "T", 100)),
    [R, setR] = useState(sensorR1 ? R1source : pnum(spec, "R4", 100)),
    [V, setV] = useState(pnum(spec, "V", 5));
  const R1 = sensorR1 ? R : R1source;
  const R4 = thermal
    ? R0 * (1 + alpha * T)
    : sensorR1
      ? pnum(spec, "R4", 500)
      : R;
  const sensorCurrent = V / (R1 + R2);
  const output = side
    ? bridgeVoltage(V, R1, R4, R2, R3)
    : bridgeVoltage(V, R1, R2, R3, R4);
  return (
    <>
      <BridgeDiagram locale={locale} side={side} />
      <div className="metrics">
        <Metric
          label={text(locale, "Tegangan keluaran", "Output voltage")}
          value={num(output * 1000, locale, 4)}
          unit="mV"
        />
        {thermal && (
          <Metric
            label={text(locale, "Hambatan RTD R₄", "RTD resistance R₄")}
            value={num(R4, locale, 4)}
            unit="Ω"
          />
        )}
        {sensorR1 && (
          <Metric
            label={text(locale, "Arus sensor R₁", "Sensor R₁ current")}
            value={num(sensorCurrent * 1000, locale, 4)}
            unit="mA"
          />
        )}
      </div>
      {sensorR1 && (
        <p
          className="visual-note"
          data-model="bridge-sensor"
          data-current={sensorCurrent}
          data-power={sensorCurrent ** 2 * R1}
          data-output={output}
        >
          {text(locale, "Daya sensor", "Sensor power")}:{" "}
          {num(sensorCurrent ** 2 * R1 * 1000, locale, 4)} mW.
        </p>
      )}
      <div className="parameter-grid">
        {thermal ? (
          <Parameter
            label={text(locale, "Suhu RTD", "RTD temperature")}
            value={T}
            min={0}
            max={200}
            step={1}
            onChange={setT}
            unit="°C"
          />
        ) : (
          <Parameter
            label={sensorR1 ? "R₁" : "R₄"}
            value={R}
            min={Math.max(
              1,
              (sensorR1 ? R1source : pnum(spec, "R4", 100)) * 0.2,
            )}
            max={(sensorR1 ? R1source : pnum(spec, "R4", 100)) * 2}
            step={0.1}
            digits={2}
            onChange={setR}
            unit="Ω"
          />
        )}
        <Parameter
          label={text(locale, "Tegangan catu", "Supply voltage")}
          value={V}
          min={0}
          max={Math.max(10, pnum(spec, "V", 5) * 2)}
          step={0.1}
          digits={1}
          onChange={setV}
          unit="V"
        />
      </div>
      <Formula>
        {side
          ? String.raw`V_o=V_B-V_A=V_s\left(\frac{R_4}{R_1+R_4}-\frac{R_3}{R_2+R_3}\right)`
          : String.raw`V_o=V_A-V_B=V_s\left(\frac{R_2}{R_1+R_2}-\frac{R_4}{R_3+R_4}\right)`}
      </Formula>
      <p className="visual-note">
        {`R₁ = ${num(R1, locale)} Ω · R₂ = ${num(R2, locale)} Ω · R₃ = ${num(R3, locale)} Ω. `}
        {text(
          locale,
          "Voltmeter ideal tidak menarik arus. Membalik terminal keluaran membalik tanda hasil.",
          "An ideal voltmeter draws no current. Reversing output terminals reverses the result’s sign.",
        )}
      </p>
    </>
  );
}

function CalibrationExample({ locale }: { locale: Locale }) {
  const [mode, setMode] = useState("static"),
    [tau, setTau] = useState(1);
  const clock = useClock(6);
  const y = firstOrder(clock.t, tau, 0, 10);
  return (
    <>
      <div className="visual-toolbar">
        <TextSelect
          label={text(locale, "Jenis kalibrasi", "Calibration type")}
          value={mode}
          onChange={(v) => {
            setMode(v);
            clock.reset();
          }}
          options={[
            {
              value: "static",
              label: text(locale, "Keadaan tunak", "Steady state"),
            },
            {
              value: "dynamic",
              label: text(locale, "Respons waktu", "Time response"),
            },
          ]}
        />
      </div>
      {mode === "static" ? (
        <>
          <Plot
            locale={locale}
            height={210}
            xLabel={text(locale, "Masukan (unit)", "Input (unit)")}
            yLabel={text(locale, "Keluaran (unit)", "Output (unit)")}
            series={[
              {
                name: text(locale, "Hubungan tunak", "Steady-state relation"),
                data: [
                  [0, 0],
                  [1, 2],
                  [2, 4],
                  [3, 6],
                  [4, 8],
                  [5, 10],
                ],
                color: GREEN,
              },
            ]}
          />
          <Formula>{String.raw`y=2x`}</Formula>
        </>
      ) : (
        <>
          <Plot
            locale={locale}
            height={210}
            xLabel="t (s)"
            yLabel={text(locale, "Keluaran (unit)", "Output (unit)")}
            xMin={0}
            xMax={6}
            series={[
              {
                name: text(locale, "Respons", "Response"),
                data: line(0, 6, (t) => firstOrder(t, tau, 0, 10)),
                color: GREEN,
              },
              {
                name: text(locale, "Saat ini", "Current"),
                data: [[clock.t, y]],
                type: "scatter",
                color: ORANGE,
              },
            ]}
          />
          <Playback clock={clock} locale={locale} />
          <div className="metrics">
            <Metric
              label={text(locale, "Keluaran saat ini", "Current output")}
              value={num(y, locale, 3)}
            />
          </div>
          <Parameter
            label={text(locale, "Konstanta waktu τ", "Time constant τ")}
            value={tau}
            min={0.2}
            max={3}
            step={0.1}
            onChange={(v) => {
              setTau(v);
              clock.reset();
            }}
            unit="s"
          />
        </>
      )}
      <p className="visual-note">
        {text(
          locale,
          "Contoh ilustratif. Kalibrasi statik mengukur hubungan saat nilai sudah tetap. Kalibrasi dinamik mengukur perubahan terhadap waktu. Angka pada contoh ini bukan data ujian.",
          "Illustrative example. Static calibration measures a settled input-output relationship. Dynamic calibration measures change over time. These example values are not exam data.",
        )}
      </p>
    </>
  );
}

export function CalibrationVisual({ spec, locale }: Props) {
  if (
    !Array.isArray(spec.params?.xs) ||
    !Array.isArray(spec.params?.ys) ||
    spec.params.xs.length < 2 ||
    spec.params.xs.length !== spec.params.ys.length
  )
    return <CalibrationExample locale={locale} />;
  return <CalibrationData spec={spec} locale={locale} />;
}

function CalibrationData({ spec, locale }: Props) {
  const xs = parr(spec, "xs", []),
    base = parr(spec, "ys", []);
  const alternate = parr(spec, "ys2", parr(spec, "ySupply", [])),
    ambient = parr(spec, "yAmbient", []);
  const [set, setSet] = useState("base");
  const ys =
    set === "supply" && alternate.length === xs.length
      ? alternate
      : set === "ambient" && ambient.length === xs.length
        ? ambient
        : base;
  const fit = endpointFit(xs, ys);
  const [selected, setSelected] = useState(() => {
    const f = endpointFit(xs, base);
    return f.residuals.reduce(
      (best, value, index) =>
        Math.abs(value) > Math.abs(f.residuals[best]) ? index : best,
      0,
    );
  });
  const at = Math.min(selected, xs.length - 1),
    x = xs[at],
    y = ys[at],
    ideal = fit.a + fit.K * x;
  const xUnit = pstr(spec, "xUnit", pstr(spec, "inputUnit", "")),
    yUnit = pstr(spec, "yUnit", pstr(spec, "outputUnit", ""));
  const sets = [
    {
      value: "base",
      label: text(locale, "Kondisi standar", "Standard condition"),
    },
  ];
  if (alternate.length === xs.length)
    sets.push({
      value: "supply",
      label: text(locale, "Catu berubah", "Changed supply"),
    });
  if (ambient.length === xs.length)
    sets.push({
      value: "ambient",
      label: text(locale, "Suhu berubah", "Changed temperature"),
    });
  const series: Series[] = [
    {
      name: text(locale, "Data ukur", "Measured data"),
      data: xs.map((xi, i) => [xi, ys[i]]),
      color: GREEN,
      type: "scatter",
    },
    {
      name: text(locale, "Garis ujung", "Endpoint line"),
      data: [
        [xs[0], fit.a + fit.K * xs[0]],
        [xs[xs.length - 1], fit.a + fit.K * xs[xs.length - 1]],
      ],
      color: GREY,
      dashed: true,
    },
    {
      name: text(locale, "Simpangan", "Residual"),
      data: [
        [x, ideal],
        [x, y],
      ],
      color: ORANGE,
    },
    {
      name: text(locale, "Titik dipilih", "Selected point"),
      data: [[x, y]],
      color: ORANGE,
      type: "scatter",
    },
  ];
  if (has(spec, "a1") && has(spec, "a2"))
    series.push({
      name: text(
        locale,
        "Model kuadrat 100 sampai 300°C",
        "Quadratic model 100 to 300°C",
      ),
      data: line(
        100,
        300,
        (t) => pnum(spec, "a1", 0) * t + pnum(spec, "a2", 0) * t * t,
      ),
      color: "#537995",
    });
  return (
    <>
      <Plot
        locale={locale}
        height={220}
        xLabel={`${text(locale, "Masukan", "Input")}${xUnit ? ` (${xUnit})` : ""}`}
        yLabel={`${text(locale, "Keluaran", "Output")}${yUnit ? ` (${yUnit})` : ""}`}
        series={series}
      />
      <div className="metrics">
        <Metric
          label={text(locale, "Simpangan titik", "Point residual")}
          value={num(y - ideal, locale, 4)}
          unit={yUnit}
        />
        <Metric
          label={text(locale, "Nonlinearitas maksimum", "Maximum nonlinearity")}
          value={
            fit.fs
              ? num((100 * fit.max) / fit.fs, locale, 3)
              : text(locale, "Belum ada", "Not available")
          }
          unit="% f.s.d."
        />
      </div>
      <div className="parameter-grid">
        <TextSelect
          label={text(locale, "Pilih titik ukur", "Select a measurement")}
          value={String(at)}
          onChange={(v) => setSelected(Number(v))}
          options={xs.map((value, i) => ({
            value: String(i),
            label: `${text(locale, "Titik", "Point")} ${i + 1}: ${num(value, locale, 3)} ${xUnit}`,
          }))}
        />
        {sets.length > 1 && (
          <TextSelect
            label={text(locale, "Kondisi kalibrasi", "Calibration condition")}
            value={set}
            onChange={setSet}
            options={sets}
          />
        )}
      </div>
      <Formula>{String.raw`\delta y=y_{\mathrm{data}}-(Kx+a),\qquad N_{\max}=\frac{\max|\delta y|}{y_{\max}-y_{\min}}\times100\%`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `Garis ujung: K = ${num(fit.K, locale, 5)}, a = ${num(fit.a, locale, 5)}. Rentang keluaran = ${num(fit.fs, locale, 4)} ${yUnit}.`,
          `Endpoint line: K = ${num(fit.K, locale, 5)}, a = ${num(fit.a, locale, 5)}. Output span = ${num(fit.fs, locale, 4)} ${yUnit}.`,
        )}
      </p>
    </>
  );
}

export function StatisticsVisual({ spec, locale }: Props) {
  const source = useMemo(
    () => parr(spec, "values", [9.8, 10, 10.2, 10.1, 9.9]),
    [spec],
  );
  const [values, setValues] = useState(source),
    [selected, setSelected] = useState(0);
  const result = stats(values),
    unit = pstr(spec, "unit", has(spec, "mean") ? "Ω" : "");
  const low = Math.min(...source),
    high = Math.max(...source),
    span = Math.max(high - low, 0.1);
  const count = new Map<string, number>();
  const dots = values.map((v) => {
    const key = v.toFixed(6),
      rank = (count.get(key) ?? 0) + 1;
    count.set(key, rank);
    return [v, rank];
  });
  const tallest = Math.max(...dots.map((d) => d[1])) + 0.7;
  const modified = values.some((v, i) => v !== source[i]);
  const update = (value: number) =>
    setValues((previous) =>
      previous.map((old, i) => (i === selected ? value : old)),
    );
  return (
    <>
      <div className="visual-toolbar">
        <span>
          {text(
            locale,
            `${values.length} pengamatan`,
            `${values.length} observations`,
          )}
        </span>
        <IconButton
          label={text(locale, "Pulihkan data soal", "Restore source data")}
          onClick={() => setValues([...source])}
          disabled={!modified}
        >
          <RotateCcw />
        </IconButton>
      </div>
      <Plot
        locale={locale}
        height={215}
        xLabel={`${text(locale, "Nilai", "Value")}${unit ? ` (${unit})` : ""}`}
        yLabel={text(locale, "Jumlah titik", "Point count")}
        xMin={Math.min(...values, result.mean - result.sd) - 0.1 * span}
        xMax={Math.max(...values, result.mean + result.sd) + 0.1 * span}
        yMin={0}
        yMax={tallest}
        series={[
          {
            name: text(locale, "Data", "Data"),
            data: dots,
            type: "scatter",
            color: GREEN,
          },
          {
            name: text(locale, "Rata-rata", "Mean"),
            data: [
              [result.mean, 0],
              [result.mean, tallest],
            ],
            color: GREY,
          },
          {
            name: "−s",
            data: [
              [result.mean - result.sd, 0],
              [result.mean - result.sd, tallest],
            ],
            color: "#b3bbaa",
            dashed: true,
          },
          {
            name: "+s",
            data: [
              [result.mean + result.sd, 0],
              [result.mean + result.sd, tallest],
            ],
            color: "#b3bbaa",
            dashed: true,
          },
          {
            name: text(locale, "Dipilih", "Selected"),
            data: [dots[selected]],
            type: "scatter",
            color: ORANGE,
          },
        ]}
      />
      <div className="metrics">
        <Metric
          label={text(locale, "Rata-rata", "Mean")}
          value={num(result.mean, locale, 5)}
          unit={unit}
        />
        <Metric
          label={text(
            locale,
            "Simpangan baku sampel",
            "Sample standard deviation",
          )}
          value={num(result.sd, locale, 6)}
          unit={unit}
        />
      </div>
      <div className="parameter-grid">
        <TextSelect
          label={text(locale, "Pilih pengamatan", "Select an observation")}
          value={String(selected)}
          onChange={(v) => setSelected(Number(v))}
          options={values.map((_, i) => ({
            value: String(i),
            label: `${text(locale, "Pengamatan", "Observation")} ${i + 1}`,
          }))}
        />
        <Parameter
          label={text(locale, "Nilai untuk eksplorasi", "Value to explore")}
          value={values[selected]}
          min={low - span}
          max={high + span}
          step={0.01}
          digits={2}
          onChange={update}
          unit={unit}
        />
      </div>
      <Formula>{String.raw`\bar x=\frac1n\sum_{i=1}^{n}x_i,\qquad s=\sqrt{\frac{\sum_{i=1}^{n}(x_i-\bar x)^2}{n-1}}`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          "Titik bertumpuk berarti nilainya sama. Garis luar menunjukkan rata-rata ± satu simpangan baku; ini tidak mengasumsikan data berdistribusi normal.",
          "Stacked points have equal values. Outer lines show the mean ± one standard deviation; this does not assume a normal distribution.",
        )}
        {modified
          ? ` ${text(locale, "Anda sedang melihat data percobaan. Pulihkan visual untuk kembali ke data soal.", "You are viewing exploratory data; restore it to return to the exam values.")}`
          : ""}
        {!Array.isArray(spec.params?.values)
          ? ` ${text(locale, "Data awal hanya contoh.", "Initial data are illustrative.")}`
          : ""}
      </p>
    </>
  );
}

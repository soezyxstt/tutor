import { useState } from "react";
import type { Locale, VisualSpec } from "@/content/types";
import { Parameter, TextSelect } from "@/components/controls";
import { Formula } from "@/components/math";
import { text, num } from "@/lib/i18n";
import {
  coefficientUncertainty,
  frequencyResponse,
  halfPowerFrequency,
  negativeFeedback,
  thermalCycle,
  thermistorModel,
  uncertaintyChain,
} from "@/lib/measurement";
import { Metric, Playback, Svg, parr, pnum, pstr, useClock } from "./common";
import { Plot, type Series } from "./plot";

type Props = { spec: VisualSpec; locale: Locale };
const green = "#65834c",
  orange = "#b37748",
  ink = "#697363";
const samples = (max: number, fn: (x: number) => number, count = 161) =>
  Array.from({ length: count }, (_, i) => {
    const x = (max * i) / (count - 1);
    return [x, fn(x)];
  });

export function FrequencyVisual({ spec, locale }: Props) {
  const order = pnum(spec, "order", 2),
    tau = pnum(spec, "tau", 7),
    fn = pnum(spec, "fn", 1000);
  const [zeta, setZeta] = useState(pnum(spec, "zeta", 0.7));
  const cutoff = halfPowerFrequency(order, tau, fn, zeta);
  const maximum = order === 1 ? 4 / (2 * Math.PI * tau) : 2.5 * fn;
  const [f, setF] = useState(
    pnum(spec, "frequency", order === 1 ? cutoff : 0.6 * fn),
  );
  const response = frequencyResponse(order, f, tau, fn, zeta);
  const curves: Series[] = [
    {
      name: text(locale, "Rasio amplitudo", "Amplitude ratio"),
      data: samples(
        maximum,
        (f) => frequencyResponse(order, f, tau, fn, zeta).magnitude,
      ),
    },
    {
      name: text(locale, "Batas setengah daya", "Half-power level"),
      data: [
        [0, Math.SQRT1_2],
        [maximum, Math.SQRT1_2],
      ],
      color: "#9da58f",
      dashed: true,
    },
    {
      name: text(locale, "Frekuensi dipilih", "Selected frequency"),
      data: [[f, response.magnitude]],
      type: "scatter",
      color: orange,
    },
  ];
  return (
    <div
      data-model="frequency"
      data-frequency={f}
      data-magnitude={response.magnitude}
      data-phase={response.phase}
      data-cutoff={cutoff}
      data-absolute-gain={pnum(spec, "K", 1) * response.magnitude}
    >
      <Plot
        series={curves}
        xLabel="f (Hz)"
        yLabel="M = |G(f)| / |G(0)|"
        height={185}
        xMin={0}
        xMax={maximum}
        yMin={0}
        locale={locale}
      />
      <Plot
        series={[
          {
            name: text(locale, "Fase keluaran", "Output phase"),
            data: samples(
              maximum,
              (f) => frequencyResponse(order, f, tau, fn, zeta).phase,
            ),
          },
          {
            name: text(locale, "Frekuensi dipilih", "Selected frequency"),
            data: [[f, response.phase]],
            type: "scatter",
            color: orange,
          },
        ]}
        xLabel="f (Hz)"
        yLabel="φ (°)"
        height={165}
        xMin={0}
        xMax={maximum}
        yMax={0}
        yMin={order === 1 ? -90 : -180}
        locale={locale}
      />
      <div className="metrics">
        <Metric
          label={text(locale, "Rasio terhadap DC", "Ratio relative to DC")}
          value={num(response.magnitude, locale, 4)}
        />
        <Metric
          label={text(locale, "Fase keluaran", "Output phase")}
          value={num(response.phase, locale, 2)}
          unit="°"
        />
      </div>
      <Parameter
        label={text(locale, "Frekuensi masukan", "Input frequency")}
        value={f}
        min={0}
        max={maximum}
        step={order === 1 ? 0.0001 : 5}
        digits={order === 1 ? 5 : 0}
        onChange={setF}
        unit="Hz"
      />
      {order === 2 && (
        <Parameter
          label={text(locale, "Rasio redaman ζ", "Damping ratio ζ")}
          value={zeta}
          min={0.1}
          max={1.5}
          step={0.05}
          digits={2}
          onChange={setZeta}
        />
      )}
      {order === 1 && (
        <p className="visual-note">
          {text(
            locale,
            `Grafik membagi gain dengan nilai DC-nya. Dengan K = ${num(pnum(spec, "K", 1), locale)} mV/°C, gain aktual pada frekuensi ini = ${num(pnum(spec, "K", 1) * response.magnitude, locale, 6)} mV/°C.`,
            `The plot divides gain by its DC value. With K = ${num(pnum(spec, "K", 1), locale)} mV/°C, the actual gain here is ${num(pnum(spec, "K", 1) * response.magnitude, locale, 6)} mV/°C.`,
          )}
        </p>
      )}
      <p className="visual-note">
        {text(
          locale,
          `Pada frekuensi yang sama, baca perubahan amplitudo di atas dan keterlambatan fase di bawah. Gain relatif = ${num(response.db, locale, 3)} dB. Batas setengah daya (−3,0103 dB) = ${num(cutoff, locale, 5)} Hz.`,
          `At the same frequency, read amplitude change above and phase lag below. Relative gain = ${num(response.db, locale, 3)} dB. Half-power cutoff (−3.0103 dB) = ${num(cutoff, locale, 5)} Hz.`,
        )}
      </p>
      <Formula>
        {order === 1
          ? String.raw`M=\frac{1}{\sqrt{1+(2\pi f\tau)^2}},\quad \phi=-\tan^{-1}(2\pi f\tau)`
          : String.raw`M=\frac{1}{\sqrt{(1-r^2)^2+(2\zeta r)^2}},\quad r=f/f_n`}
      </Formula>
    </div>
  );
}

export function ThermistorVisual({ spec, locale }: Props) {
  const T1 = pnum(spec, "T1", 273.15),
    R1 = pnum(spec, "R1", 9000),
    T2 = pnum(spec, "T2", 373.15),
    R2 = pnum(spec, "R2", 500);
  const [T, setT] = useState(pnum(spec, "T", 25));
  const result = thermistorModel(T, T1, R1, T2, R2);
  return (
    <div
      data-model="thermistor"
      data-temperature={T}
      data-resistance={result.resistance}
    >
      <Plot
        series={[
          {
            name: text(locale, "Model NTC", "NTC model"),
            data: samples(
              100,
              (T) => thermistorModel(T, T1, R1, T2, R2).resistance / 1000,
            ),
          },
          {
            name: text(locale, "Data kalibrasi", "Calibration data"),
            data: [
              [T1 - 273.15, R1 / 1000],
              [T2 - 273.15, R2 / 1000],
            ],
            type: "scatter",
            color: ink,
          },
          {
            name: text(locale, "Suhu dipilih", "Selected temperature"),
            data: [[T, result.resistance / 1000]],
            type: "scatter",
            color: orange,
          },
        ]}
        xLabel="T (°C)"
        yLabel="R (kΩ)"
        xMin={0}
        xMax={100}
        yMin={0}
        height={220}
        locale={locale}
      />
      <div className="metrics">
        <Metric
          label={text(locale, "Hambatan", "Resistance")}
          value={num(result.resistance / 1000, locale, 4)}
          unit="kΩ"
        />
        <Metric
          label={text(locale, "Kemiringan saat ini", "Local slope")}
          value={num(result.slope, locale, 2)}
          unit="Ω/°C"
        />
      </div>
      <Parameter
        label={text(locale, "Suhu", "Temperature")}
        value={T}
        min={0}
        max={100}
        step={1}
        digits={0}
        onChange={setT}
        unit="°C"
      />
      <Formula>{String.raw`R(T)=R_1\exp\!\left[\beta\left(\frac{1}{T+273.15}-\frac{1}{T_1}\right)\right]`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `NTC: suhu naik, hambatan turun. Kemiringannya berubah, jadi garis lurus antara dua titik tidak cukup. β = ${num(result.beta, locale, 2)} K; rumus memakai suhu mutlak.`,
          `NTC: resistance falls as temperature rises. The slope changes, so a straight line between two points is insufficient. β = ${num(result.beta, locale, 2)} K; the formula uses absolute temperature.`,
        )}
      </p>
    </div>
  );
}

export function ThermalCycleVisual({ spec, locale }: Props) {
  const cold = pnum(spec, "cold", 20),
    hot = pnum(spec, "hot", 100),
    switchTime = pnum(spec, "switchTime", 60),
    tauHot = pnum(spec, "tauHot", 10),
    tauCold = pnum(spec, "tauCold", 50);
  const end = switchTime + 5 * tauCold,
    clock = useClock(end, 10);
  const state = thermalCycle(clock.t, cold, hot, switchTime, tauHot, tauCold);
  return (
    <div
      data-model="thermal-cycle"
      data-time={clock.t}
      data-input={state.input}
      data-output={state.output}
      data-error={state.error}
    >
      <Plot
        series={[
          {
            name: text(locale, "Suhu lingkungan", "Surrounding temperature"),
            data: [
              [0, hot],
              [switchTime, hot],
              [switchTime, cold],
              [end, cold],
            ],
            dashed: true,
            color: "#8c9980",
          },
          {
            name: text(locale, "Bacaan sensor", "Sensor reading"),
            data: samples(
              end,
              (t) =>
                thermalCycle(t, cold, hot, switchTime, tauHot, tauCold).output,
            ),
          },
          {
            name: text(locale, "Saat ini", "Current state"),
            data: [[clock.t, state.output]],
            type: "scatter",
            color: orange,
          },
        ]}
        xLabel="t (s)"
        yLabel="T (°C)"
        xMin={0}
        xMax={end}
        yMin={cold - 5}
        yMax={hot + 5}
        height={225}
        locale={locale}
      />
      <Playback clock={clock} locale={locale} digits={1} />
      <div className="metrics">
        <Metric
          label={text(locale, "Bacaan sensor", "Sensor reading")}
          value={num(state.output, locale, 3)}
          unit="°C"
        />
        <Metric
          label={text(
            locale,
            "Galat: bacaan − acuan",
            "Error: reading − reference",
          )}
          value={num(state.error, locale, 3)}
          unit="°C"
        />
      </div>
      <Parameter
        label={text(locale, "Waktu pengamatan", "Observation time")}
        value={clock.t}
        min={0}
        max={end}
        step={1}
        digits={1}
        onChange={(t) => {
          clock.setPlaying(false);
          clock.setT(t);
        }}
        unit="s"
      />
      <p className="visual-note">
        {text(
          locale,
          `Garis putus-putus: suhu lingkungan. Garis utuh: bacaan sensor. Pada ${switchTime} s, lingkungan berubah tetapi suhu sensor tetap menyambung. τ di udara ${tauCold} s lebih besar daripada τ di air mendidih ${tauHot} s, jadi pendinginan lebih lambat. Waktu tayang 10×.`,
          `Dashed line: surrounding temperature. Solid line: sensor reading. At ${switchTime} s, the surroundings change while the sensor temperature remains continuous. Air has τ = ${tauCold} s versus ${tauHot} s in boiling water, so cooling is slower. Playback speed: 10×.`,
        )}
      </p>
      <Formula>{String.raw`\tau\,\frac{dT_o}{dt}+T_o=T_i,\qquad e=T_o-T_i`}</Formula>
    </div>
  );
}

function VarianceShares({
  values,
  labels,
  locale,
}: {
  values: number[];
  labels: string[];
  locale: Locale;
}) {
  const total = values.reduce((a, b) => a + b, 0);
  return (
    <div
      className="variance-shares"
      aria-label={text(
        locale,
        "Bagian varians tiap sumber",
        "Variance contribution of each source",
      )}
    >
      {values.map((value, i) => (
        <div key={i} className="variance-share">
          <div>
            <span>{labels[i]}</span>
            <strong>
              {num(total ? (100 * value) / total : 0, locale, 2)}%
            </strong>
          </div>
          <div className="variance-track">
            <span
              style={{
                width: `${total ? (100 * value) / total : 0}%`,
                background: [green, orange, "#788598", "#9cae8b"][i % 4],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function UncertaintyVisual({ spec, locale }: Props) {
  const mode = pstr(spec, "mode", "linear"),
    chain = mode === "chain";
  const [input, setInput] = useState(pnum(spec, "input", 100));
  const gains = parr(spec, "gains", [0.001, 0.05, 1000, 15]);
  const [lastGain, setLastGain] = useState(gains[gains.length - 1]);
  const actualGains = [...gains.slice(0, -1), lastGain];
  const means =
    mode === "polynomial"
      ? parr(spec, "means", [1.2, 0.018, 0.00024])
      : [pnum(spec, "meanOffset", -0.001), pnum(spec, "meanK", 0.02)];
  const sds =
    mode === "polynomial"
      ? parr(spec, "sds", [0.01, 0.001, 0])
      : [pnum(spec, "sdOffset", 0.00015), pnum(spec, "sdK", 0.001)];
  const result = chain
    ? uncertaintyChain(
        input,
        actualGains,
        parr(spec, "halfWidths", [0.08, 0.001, 0.5, 5]),
      )
    : coefficientUncertainty(input, means, sds);
  const unit = chain ? "Pa" : mode === "polynomial" ? "μV" : "V";
  const labels = chain
    ? [
        text(locale, "Sensor", "Sensor"),
        text(locale, "Jembatan", "Bridge"),
        text(locale, "Penguat", "Amplifier"),
        text(locale, "Perekam", "Recorder"),
      ]
    : mode === "polynomial"
      ? ["a₀", "a₁T", "a₂T²"]
      : ["a", "KT"];
  return (
    <div
      data-model="uncertainty"
      data-mode={mode}
      data-mean={result.mean}
      data-sd={result.sd}
      data-input={input}
    >
      {chain && (
        <ol className="measurement-chain">
          {actualGains.map((gain, i) => (
            <li key={i}>
              <span>{labels[i]}</span>
              <strong>× {num(gain, locale, 4)}</strong>
              <small>{["Ω/Pa", "mV/Ω", "mV/mV", "Pa/mV"][i]}</small>
            </li>
          ))}
        </ol>
      )}
      <div className="metrics">
        <Metric
          label={text(locale, "Rata-rata keluaran", "Mean output")}
          value={num(result.mean, locale, 6)}
          unit={unit}
        />
        <Metric
          label={text(
            locale,
            "Simpangan baku keluaran",
            "Output standard deviation",
          )}
          value={num(result.sd, locale, 6)}
          unit={unit}
        />
      </div>
      {chain && (
        <p className="visual-note">
          {text(
            locale,
            `Bias = keluaran rata-rata − masukan = ${num(result.mean - input, locale, 3)} Pa.`,
            `Bias = mean output − input = ${num(result.mean - input, locale, 3)} Pa.`,
          )}
        </p>
      )}
      <p className="visual-note">
        {text(
          locale,
          "Dari mana sebaran keluaran berasal? Tiap batang menunjukkan bagian varians total.",
          "Where does output spread come from? Each bar shows its share of total variance.",
        )}
      </p>
      <VarianceShares
        values={result.contributions}
        labels={labels}
        locale={locale}
      />
      <Parameter
        label={
          chain
            ? text(locale, "Tekanan masukan", "Input pressure")
            : text(locale, "Suhu yang diukur", "Measured temperature")
        }
        value={input}
        min={0}
        max={chain ? 10000 : 200}
        step={chain ? 100 : 1}
        digits={0}
        onChange={setInput}
        unit={chain ? "Pa" : "°C"}
      />
      {chain && (
        <Parameter
          label={text(locale, "Kepekaan perekam", "Recorder sensitivity")}
          value={lastGain}
          min={10}
          max={25}
          step={0.5}
          digits={1}
          onChange={setLastGain}
          unit="Pa/mV"
        />
      )}
      <Formula>
        {chain
          ? String.raw`\sigma_o^2=\sum_i\left(\prod_{j>i}K_j\right)^2\frac{h_i^2}{3}`
          : String.raw`\sigma_o^2=\sum_i\left(\frac{\partial O}{\partial a_i}\sigma_{a_i}\right)^2`}
      </Formula>
      <p className="visual-note">
        {chain
          ? text(
              locale,
              "Model menganggap galat tiap elemen seragam dalam ±h, saling bebas, dan masuk setelah penguatan elemen itu. Galat sensor ikut mendapat semua penguatan sesudahnya. Memperbaiki bias tidak menghapus sebaran.",
              "The model assumes independent uniform errors within ±h, added after each element’s gain. Sensor error passes through every later gain. Correcting bias does not remove spread.",
            )
          : text(
              locale,
              "Suhu masukan dianggap pasti dan kovarians antarkoefisien nol. Koefisien dengan simpangan baku nol tetap memengaruhi rata-rata, tetapi tidak menambah varians.",
              "Input temperature is treated as exact and coefficient covariances as zero. A coefficient with zero standard deviation still affects the mean but adds no variance.",
            )}
      </p>
    </div>
  );
}

export function HysteresisVisual({ spec, locale }: Props) {
  const levels = parr(spec, "levels", [0, 24]),
    rising = parr(spec, "rising", [0, 36.8]),
    falling = parr(spec, "falling", [0.3, 36.8]);
  const [level, setLevel] = useState(pnum(spec, "level", 14));
  const index = levels.reduce(
    (best, h, i) =>
      Math.abs(h - level) < Math.abs(levels[best] - level) ? i : best,
    0,
  );
  const gap = Math.abs(falling[index] - rising[index]);
  const maximum = Math.max(...rising.map((v, i) => Math.abs(v - falling[i]))),
    span = rising[rising.length - 1] - rising[0];
  return (
    <div data-model="hysteresis" data-level={levels[index]} data-gap={gap}>
      <Plot
        series={[
          {
            name: text(locale, "Level naik", "Rising level"),
            data: levels.map((h, i) => [h, rising[i]]),
            color: green,
          },
          {
            name: text(locale, "Level turun", "Falling level"),
            data: levels.map((h, i) => [h, falling[i]]),
            color: orange,
            dashed: true,
          },
          {
            name: text(
              locale,
              "Selisih pada level sama",
              "Gap at the same level",
            ),
            data: [
              [levels[index], rising[index]],
              [levels[index], falling[index]],
            ],
            color: ink,
          },
          {
            name: text(locale, "Dua bacaan", "Two readings"),
            data: [
              [levels[index], rising[index]],
              [levels[index], falling[index]],
            ],
            type: "scatter",
            color: ink,
          },
        ]}
        xLabel="h (cm)"
        yLabel="V (V)"
        xMin={levels[0]}
        xMax={levels[levels.length - 1]}
        yMin={0}
        height={240}
        locale={locale}
      />
      <div className="metrics">
        <Metric
          label={text(locale, "Bacaan saat naik", "Reading while rising")}
          value={num(rising[index], locale, 2)}
          unit="V"
        />
        <Metric
          label={text(locale, "Bacaan saat turun", "Reading while falling")}
          value={num(falling[index], locale, 2)}
          unit="V"
        />
      </div>
      <Parameter
        label={text(locale, "Level yang dibandingkan", "Level to compare")}
        value={levels[index]}
        min={levels[0]}
        max={levels[levels.length - 1]}
        step={levels[1] - levels[0]}
        digits={0}
        unit="cm"
        onChange={setLevel}
      />
      <p className="visual-note">
        {text(
          locale,
          `Selisih pada level ini = ${num(gap, locale, 2)} V. Bandingkan pada masukan yang sama, lalu cari selisih terbesar: ${num(maximum, locale, 2)} V atau ${num((100 * maximum) / span, locale, 3)}% dari span ${num(span, locale, 1)} V. Garis menghubungkan data tabel.`,
          `The gap here is ${num(gap, locale, 2)} V. Compare readings at the same input, then find the largest gap: ${num(maximum, locale, 2)} V, or ${num((100 * maximum) / span, locale, 3)}% of the ${num(span, locale, 1)} V span. Lines connect tabulated data.`,
        )}
      </p>
    </div>
  );
}

export function FeedbackVisual({ spec, locale }: Props) {
  const forward = pnum(spec, "forward", 10),
    feedback = pnum(spec, "feedback", 10),
    force = pnum(spec, "force", 50);
  const [supply, setSupply] = useState(pnum(spec, "supply", 1));
  const state = negativeFeedback(force, forward, feedback, supply);
  return (
    <div
      data-model="feedback"
      data-supply={supply}
      data-output={state.output}
      data-loop-gain={state.loopGain}
    >
      <Svg
        viewBox="0 0 360 220"
        label={text(
          locale,
          "Umpan balik negatif pada sensor gaya",
          "Negative feedback in a force sensor",
        )}
      >
        <text x="30" y="42" textAnchor="middle">
          F
        </text>
        <path d="M10 68H61" stroke={ink} markerEnd="url(#arrow-ink)" />
        <circle cx="77" cy="68" r="15" fill="none" stroke={ink} />
        <text x="76" y="74" textAnchor="middle">
          +
        </text>
        <text x="95" y="106">
          −
        </text>
        <path
          d="M93 68H135M256 68H340"
          stroke={ink}
          markerEnd="url(#arrow-ink)"
        />
        <rect
          x="136"
          y="40"
          width="118"
          height="55"
          rx="3"
          fill="#e1ead6"
          stroke={green}
        />
        <text x="195" y="74" textAnchor="middle">
          A = {num(forward * supply, locale, 2)}
        </text>
        <text x="326" y="39" textAnchor="middle">
          Vₒ
        </text>
        <path
          d="M304 68V170H255M136 170H77V84"
          fill="none"
          stroke={ink}
          markerEnd="url(#arrow-ink)"
        />
        <rect
          x="136"
          y="144"
          width="118"
          height="52"
          rx="3"
          fill="none"
          stroke={ink}
        />
        <text x="195" y="176" textAnchor="middle">
          B = {num(feedback, locale, 2)}
        </text>
        <text x="195" y="120" textAnchor="middle">
          {text(locale, "A berubah oleh catu", "A varies with supply")}
        </text>
      </Svg>
      <div className="metrics">
        <Metric
          label={text(locale, "Tegangan keluaran", "Output voltage")}
          value={num(state.output, locale, 5)}
          unit="V"
        />
        <Metric
          label={text(
            locale,
            "Kepekaan sistem tertutup",
            "Closed-loop sensitivity",
          )}
          value={num(state.gain, locale, 6)}
          unit="V/N"
        />
      </div>
      <Parameter
        label={text(locale, "Tegangan catu", "Supply voltage")}
        value={supply}
        min={0.5}
        max={2}
        step={0.05}
        digits={2}
        unit="V"
        onChange={setSupply}
      />
      <Formula>{String.raw`V_o=A(F-BV_o)\;\Rightarrow\;\frac{V_o}{F}=\frac{A}{1+AB}`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `F = ${force} N. Kenaikan keluaran memperbesar gaya umpan balik yang mengurangi masukan bersih. Umpan balik membatasi pengaruh catu karena AB = ${num(state.loopGain, locale)}. Batas idealnya Vₒ ≈ F/B = ${num(force / feedback, locale)} V.`,
          `F = ${force} N. A higher output increases the feedback force, reducing the net input. With AB = ${num(state.loopGain, locale)}, a supply change is not fully passed to the output. The ideal limit is Vₒ ≈ F/B = ${num(force / feedback, locale)} V.`,
        )}
      </p>
    </div>
  );
}

export function LowPassVisual({ spec, locale }: Props) {
  const R = pnum(spec, "R", 10000),
    C = pnum(spec, "C", 1e-7),
    fc = 1 / (2 * Math.PI * R * C);
  const [active, setActive] = useState("active"),
    [gain, setGain] = useState(pnum(spec, "gain", 2)),
    [f, setF] = useState(pnum(spec, "frequency", 100));
  const g = active === "active" ? gain : 1,
    magnitude = g / Math.sqrt(1 + (f / fc) ** 2);
  return (
    <div
      data-model="lowpass"
      data-frequency={f}
      data-cutoff={fc}
      data-gain={magnitude}
    >
      <TextSelect
        label={text(locale, "Jenis tapis", "Filter type")}
        value={active}
        onChange={setActive}
        options={[
          { value: "active", label: text(locale, "LPF aktif", "Active LPF") },
          { value: "passive", label: text(locale, "LPF pasif", "Passive LPF") },
        ]}
      />
      <Svg
        viewBox={active === "active" ? "0 0 360 285" : "0 0 360 220"}
        label={text(
          locale,
          "Contoh rangkaian RC lolos rendah",
          "Example RC low-pass circuit",
        )}
      >
        <g stroke={ink} strokeWidth="1.8" fill="none">
          <path d="M15 100H67M112 100H165M165 100V153M154 153H176M154 161H176M165 161V193M151 193H179M155 198H175M159 203H171" />
          <rect x="67" y="92" width="45" height="16" />
          {active === "active" ? (
            <>
              <path d="M165 100H225M225 80V160L290 120ZM290 120H345M320 120V230H288M243 230H210V140H225M210 230H191M146 230H100V263M87 263H113M91 268H109M95 273H105M248 94V40" />
              <rect x="243" y="222" width="45" height="16" />
              <rect x="146" y="222" width="45" height="16" />
            </>
          ) : (
            <path d="M165 100H345" />
          )}
        </g>
        <text x="24" y="80">
          Vᵢ
        </text>
        <text x="89" y="78" textAnchor="middle">
          R
        </text>
        <text x="139" y="163" textAnchor="end">
          C
        </text>
        <text x="326" y={active === "active" ? 100 : 80}>
          Vₒ
        </text>
        {active === "active" && (
          <>
            <text x="236" y="108">
              +
            </text>
            <text x="236" y="146">
              −
            </text>
            <text x="266" y="214" textAnchor="middle">
              R𝒇
            </text>
            <text x="168" y="254" textAnchor="middle">
              R𝒈
            </text>
            <text x="248" y="27" textAnchor="middle">
              {text(locale, "Catu", "Supply")}
            </text>
          </>
        )}
      </Svg>
      <Plot
        series={[
          {
            name: text(locale, "Gain amplitudo", "Amplitude gain"),
            data: samples(5 * fc, (f) => g / Math.sqrt(1 + (f / fc) ** 2)),
          },
          {
            name: text(locale, "Frekuensi dipilih", "Selected frequency"),
            data: [[f, magnitude]],
            type: "scatter",
            color: orange,
          },
        ]}
        xLabel="f (Hz)"
        yLabel="|Vₒ / Vᵢ|"
        xMin={0}
        xMax={5 * fc}
        yMin={0}
        height={175}
        locale={locale}
      />
      <div className="metrics">
        <Metric
          label={text(
            locale,
            "Gain pada frekuensi ini",
            "Gain at this frequency",
          )}
          value={num(magnitude, locale, 4)}
        />
        <Metric
          label={text(locale, "Frekuensi potong", "Cutoff frequency")}
          value={num(fc, locale, 3)}
          unit="Hz"
        />
      </div>
      <Parameter
        label={text(locale, "Frekuensi masukan", "Input frequency")}
        value={f}
        min={0}
        max={5 * fc}
        step={5}
        digits={0}
        unit="Hz"
        onChange={setF}
      />
      {active === "active" && (
        <Parameter
          label={text(
            locale,
            "Gain op-amp: 1 + Rf/Rg",
            "Op-amp gain: 1 + Rf/Rg",
          )}
          value={gain}
          min={1}
          max={5}
          step={0.1}
          digits={1}
          onChange={setGain}
        />
      )}
      <Formula>{String.raw`f_c=\frac{1}{2\pi RC},\qquad H(s)=\frac{${active === "active" ? "1+R_f/R_g" : "1"}}{1+sRC}`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `Contoh, bukan gambar rangkaian praktikum: R = ${num(R / 1000, locale)} kΩ, C = ${num(C * 1e9, locale)} nF. Op-amp ideal memisahkan RC dari beban dan dapat memberi gain. Model pasif memakai keluaran tanpa beban. Batas catu dan saturasi tidak dimodelkan.`,
          `Illustrative circuit, not the practicum schematic: R = ${num(R / 1000, locale)} kΩ, C = ${num(C * 1e9, locale)} nF. The ideal op-amp isolates RC from the load and can provide gain. The passive model assumes an unloaded output. Supply limits and saturation are not modelled.`,
        )}
      </p>
    </div>
  );
}

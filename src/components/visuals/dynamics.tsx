import { useEffect, useMemo, useState } from "react";
import type { Locale, VisualSpec } from "@/content/types";
import { Parameter, TextSelect } from "@/components/controls";
import { Formula } from "@/components/math";
import { num, text } from "@/lib/i18n";
import { Metric, Playback, Svg, pnum, pstr, useClock } from "./common";
import { Plot, type Series } from "./plot";

type Props = { spec: VisualSpec; locale: Locale };
const green = "#65834c",
  ink = "#697363",
  orange = "#b37748";
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
  gap: 12,
} as const;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function DynamicsVisual(props: Props) {
  return typeof props.spec.params?.tau === "number" ? (
    <FirstOrderVisual {...props} />
  ) : (
    <SecondOrderVisual {...props} />
  );
}

function FirstOrderVisual({ spec, locale }: Props) {
  const sourceTau = pnum(spec, "tau", 1),
    initial = pnum(spec, "initial", 0),
    final = pnum(spec, "final", 1),
    stepTime = pnum(spec, "stepTime", 0);
  const [tau, setTau] = useState(sourceTau);
  const end = stepTime + Math.max(6 * tau, 0.5);
  const clock = useClock(end);
  useEffect(() => {
    setTau(sourceTau);
    clock.reset();
  }, [sourceTau, initial, final, stepTime]);
  const unit = pstr(spec, "unit", spec.kind === "rtd" ? "Ω" : ""),
    label = spec.kind === "rtd" ? "R" : text(locale, "Keluaran", "Output");
  const response = (t: number) =>
    t < stepTime
      ? initial
      : initial + (final - initial) * (1 - Math.exp(-(t - stepTime) / tau));
  const value = response(clock.t),
    span = Math.abs(final - initial) || 1;
  const series = useMemo<Series[]>(
    () => [
      {
        name: text(locale, "Masukan setara", "Equivalent input"),
        data: [
          [0, initial],
          [stepTime, initial],
          [stepTime, final],
          [end, final],
        ],
        color: "#9da58f",
        dashed: true,
      },
      {
        name: text(locale, "Respons", "Response"),
        data: Array.from({ length: 201 }, (_, i) => {
          const t = (end * i) / 200;
          return [t, response(t)];
        }),
      },
      {
        name: text(locale, "Saat ini", "Current state"),
        data: [[clock.t, value]],
        type: "scatter",
        color: orange,
      },
    ],
    [initial, final, tau, stepTime, end, clock.t, locale],
  );
  if (!(tau > 0))
    return (
      <p role="status">
        {text(
          locale,
          "Konstanta waktu harus positif.",
          "The time constant must be positive.",
        )}
      </p>
    );
  return (
    <div data-model="first-order" data-time={clock.t} data-output={value}>
      <Plot
        series={series}
        xLabel="t (s)"
        yLabel={`${label}${unit ? ` (${unit})` : ""}`}
        xMin={0}
        xMax={end}
        yMin={Math.min(initial, final) - span * 0.08}
        yMax={Math.max(initial, final) + span * 0.08}
        height={215}
        locale={locale}
      />
      <Playback clock={clock} locale={locale} />
      <div className="metrics">
        <Metric
          label={`${label}(t)`}
          value={num(value, locale, 6)}
          unit={unit}
        />
        <Metric
          label={text(locale, "Sisa perubahan", "Remaining change")}
          value={num(final - value, locale, 6)}
          unit={unit}
        />
      </div>
      <Parameter
        label={text(locale, "Konstanta waktu τ", "Time constant τ")}
        value={tau}
        min={Math.max(0.05, sourceTau / 5)}
        max={Math.max(sourceTau * 3, 1)}
        step={0.05}
        onChange={(v) => {
          setTau(v);
          clock.reset();
        }}
        unit="s"
        digits={2}
      />
      <Formula>{String.raw`y(t)=y_0+(y_\infty-y_0)\left(1-e^{-(t-t_0)/\tau}\right),\quad t\ge t_0`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          "Garis putus-putus menunjukkan nilai tunak yang dituju. Mengubah τ memulai ulang respons.",
          "The dashed line shows the target steady value. Changing τ restarts the response.",
        )}
      </p>
    </div>
  );
}

function SecondOrderVisual({ spec, locale }: Props) {
  const omegaN = pnum(spec, "omegaN", 2 * Math.PI * 20),
    sourceDamping = pnum(spec, "damping", 0.65),
    fn = omegaN / (2 * Math.PI),
    limit = pnum(spec, "limit", 0.05);
  const [frequency, setFrequency] = useState(
      pnum(spec, "frequency", fn * 0.72),
    ),
    [damping, setDamping] = useState(sourceDamping);
  useEffect(() => {
    setFrequency(pnum(spec, "frequency", fn * 0.72));
    setDamping(sourceDamping);
  }, [omegaN, sourceDamping, pnum(spec, "frequency", fn * 0.72)]);
  const ratio = frequency / fn,
    den = Math.hypot(1 - ratio * ratio, 2 * damping * ratio),
    gain = den < 1e-10 ? Infinity : 1 / den;
  const error = Math.abs(gain - 1) * 100,
    phase =
      (-Math.atan2(2 * damping * ratio, 1 - ratio * ratio) * 180) / Math.PI;
  const series = useMemo<Series[]>(() => {
    const points = Array.from({ length: 321 }, (_, i) => {
      const f = (2 * fn * i) / 320,
        r = f / fn,
        d = Math.hypot(1 - r * r, 2 * damping * r);
      return [f, d < 1e-9 || 1 / d > 2.2 ? NaN : 1 / d];
    });
    return [
      {
        name: text(locale, "Rasio amplitudo", "Amplitude ratio"),
        data: points,
      },
      {
        name: `+${num(limit * 100, locale, 1)}%`,
        data: [
          [0, 1 + limit],
          [2 * fn, 1 + limit],
        ],
        dashed: true,
        color: "#a3aa9c",
      },
      {
        name: `−${num(limit * 100, locale, 1)}%`,
        data: [
          [0, 1 - limit],
          [2 * fn, 1 - limit],
        ],
        dashed: true,
        color: "#b59060",
      },
      {
        name: text(locale, "Frekuensi pilihan", "Selected frequency"),
        data: Number.isFinite(gain) ? [[frequency, gain]] : [],
        type: "scatter",
        color: orange,
      },
    ];
  }, [frequency, damping, fn, limit, locale, gain]);
  return (
    <div data-model="second-order-frequency" data-gain={gain}>
      <Plot
        series={series}
        xLabel="f (Hz)"
        yLabel="|G|"
        xMin={0}
        xMax={2 * fn}
        yMin={0}
        yMax={2.2}
        height={210}
        locale={locale}
      />
      <div className="parameter-grid">
        <Parameter
          label={text(locale, "Frekuensi masukan", "Input frequency")}
          value={frequency}
          min={0}
          max={fn * 2}
          step={0.01}
          onChange={setFrequency}
          unit="Hz"
          digits={2}
        />
        <Parameter
          label={text(locale, "Rasio redaman ζ", "Damping ratio ζ")}
          value={damping}
          min={0}
          max={1.5}
          step={0.01}
          onChange={setDamping}
          digits={2}
        />
      </div>
      <div className="metrics">
        <Metric
          label={text(locale, "Galat amplitudo", "Amplitude error")}
          value={Number.isFinite(error) ? num(error, locale, 3) : "∞"}
          unit="%"
        />
        <Metric
          label={text(locale, "Beda fase", "Phase difference")}
          value={
            Number.isFinite(gain)
              ? num(phase, locale, 2)
              : text(locale, "Tak terdefinisi", "Undefined")
          }
          unit={Number.isFinite(gain) ? "°" : undefined}
        />
      </div>
      {!Number.isFinite(gain) ? (
        <p className="visual-note" role="status">
          {text(
            locale,
            "Pada resonansi tanpa redaman, model tidak memberi amplitudo tunak hingga. Tambahkan redaman atau ubah frekuensi.",
            "At undamped resonance, this model has no finite steady amplitude. Add damping or change frequency.",
          )}
        </p>
      ) : (
        <p className="visual-note" role="status">
          {error < limit * 100
            ? text(
                locale,
                "Galat amplitudo berada di bawah batas.",
                "Amplitude error is below the limit.",
              )
            : text(
                locale,
                "Galat amplitudo mencapai atau melampaui batas.",
                "Amplitude error reaches or exceeds the limit.",
              )}
        </p>
      )}
      <Formula>{String.raw`|G(j\omega)|=\frac{1}{\sqrt{(1-r^2)^2+(2\zeta r)^2}},\quad r=\frac{f}{f_n}`}</Formula>
      <Svg
        label={text(
          locale,
          "Diagram gaya model orde dua ekuivalen",
          "Equivalent second-order force diagram",
        )}
        viewBox="0 0 440 200"
      >
        <rect
          x="210"
          y="62"
          width="70"
          height="58"
          rx="4"
          fill="#e6ecde"
          stroke={ink}
        />
        <text x="245" y="96" textAnchor="middle">
          m
        </text>
        <path
          d="M280 76H381"
          fill="none"
          stroke={green}
          strokeWidth="2"
          markerEnd="url(#arrow-green)"
        />
        <text x="330" y="60" textAnchor="middle">
          ku
        </text>
        <path
          d="M210 68H80"
          fill="none"
          stroke={green}
          strokeWidth="2"
          markerEnd="url(#arrow-green)"
        />
        <text x="130" y="56" textAnchor="middle">
          kx
        </text>
        <path
          d="M210 90H80"
          fill="none"
          stroke={green}
          strokeWidth="2"
          markerEnd="url(#arrow-green)"
        />
        <text x="130" y="83" textAnchor="middle">
          cẋ
        </text>
        <path
          d="M210 113H80"
          fill="none"
          stroke={orange}
          strokeWidth="2"
          strokeDasharray="5 4"
          markerEnd="url(#arrow-orange)"
        />
        <text x="130" y="137" textAnchor="middle">
          mẍ
        </text>
        <path
          d="M245 62V22M245 120V159"
          stroke={green}
          strokeWidth="2"
          markerEnd="url(#arrow-green)"
        />
        <text x="260" y="30">
          N
        </text>
        <text x="260" y="154">
          mg
        </text>
        <text x="220" y="185" textAnchor="middle">
          {text(
            locale,
            "Panah acuan; panjang skematis",
            "Reference arrows; schematic lengths",
          )}
        </text>
      </Svg>
      <Formula>{String.raw`ku-kx-c\dot x-m\ddot x=0,\qquad \frac{k}{m}=\omega_n^2,\quad\frac{c}{m}=2\zeta\omega_n`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          "Model translasi ekuivalen untuk fungsi alih; geometri dan massa alat tidak tersedia. Panah inersia putus-putus bukan gaya kontak. Gaya berat dan reaksi penopang saling meniadakan.",
          "Equivalent translation model for the transfer function; instrument geometry and mass are unspecified. Dashed inertia is not a contact force. Weight and support reaction cancel.",
        )}
      </p>
    </div>
  );
}

export function AccelerometerVisual(props: Props) {
  return pstr(props.spec, "mode", "") === "bandwidth" ? (
    <BandwidthVisual {...props} />
  ) : (
    <SeismicVisual {...props} />
  );
}

function BandwidthVisual({ spec, locale }: Props) {
  const sensitivity = pnum(spec, "sensitivity", 100),
    cross = pnum(spec, "crossSensitivity", 5),
    fmin = pnum(spec, "fMin", 1),
    fmax = pnum(spec, "fMax", 10000);
  const [frequency, setFrequency] = useState(pnum(spec, "frequency", 25000));
  useEffect(
    () => setFrequency(pnum(spec, "frequency", 25000)),
    [pnum(spec, "frequency", 25000)],
  );
  const low = frequency < fmin,
    high = frequency > fmax;
  const px = (f: number) => 45 + ((Math.log10(f) + 0.5) / 5.2) * 410;
  return (
    <>
      <Svg
        label={text(
          locale,
          "Pita frekuensi akselerometer dengan daerah di luar kalibrasi",
          "Accelerometer frequency band and uncalibrated regions",
        )}
        viewBox="0 0 500 225"
      >
        <rect
          x={px(fmin)}
          y="44"
          width={px(fmax) - px(fmin)}
          height="132"
          fill="#e8efdf"
        />
        <path d="M45 176H468M45 176V32" stroke={ink} strokeWidth="1.5" />
        <path
          d={`M45 155Q${px(fmin) - 10} 130 ${px(fmin)} 85H${px(fmax)}`}
          stroke={green}
          strokeWidth="3"
          fill="none"
        />
        <rect
          x={px(fmax) + 3}
          y="44"
          width={468 - px(fmax) - 3}
          height="132"
          fill="#f1e9dd"
        />
        <text
          x={(px(fmax) + 468) / 2}
          y="108"
          textAnchor="middle"
          fill={orange}
          fontSize="28"
        >
          ?
        </text>
        <path
          d={`M${px(frequency)} 37V180`}
          stroke={orange}
          strokeWidth="1.4"
          strokeDasharray="3 4"
        />
        <text x="49" y="24">
          {text(locale, "Sensitivitas", "Sensitivity")}
        </text>
        <text x="250" y="70" textAnchor="middle">
          {sensitivity} mV/g
        </text>
        <text x={px(fmin)} y="198" textAnchor="middle">
          {num(fmin, locale, 0)}
        </text>
        <text x={px(fmax)} y="198" textAnchor="middle">
          {num(fmax, locale, 0)}
        </text>
        <text x="457" y="219" textAnchor="end">
          f (Hz)
        </text>
        <text x="248" y="147" textAnchor="middle">
          {text(locale, "Rentang nominal", "Nominal range")}
        </text>
      </Svg>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span>{text(locale, "Frekuensi", "Frequency")}</span>
        <TextSelect
          label={text(locale, "Pilih frekuensi", "Choose frequency")}
          value={String(frequency)}
          onChange={(v) => setFrequency(Number(v))}
          options={[0.5, 1, 10, 100, 1000, 10000, 25000].map((f) => ({
            value: String(f),
            label: `${num(f, locale, 1)} Hz`,
          }))}
        />
      </div>
      <p className="visual-note" role="status">
        {low
          ? text(
              locale,
              "Di bawah pita: sensitivitas turun; nilai tepat tidak tersedia.",
              "Below the band: sensitivity falls; its exact value is unavailable.",
            )
          : high
            ? text(
                locale,
                "Di atas pita: resonansi atau pelemahan dapat terjadi; sensitivitas tepat tidak dapat ditentukan dari data soal.",
                "Above the band: resonance or attenuation may occur; the problem does not give the exact sensitivity.",
              )
            : text(
                locale,
                "Di dalam pita: gunakan sensitivitas nominal yang soal berikan.",
                "Inside the band: use the nominal sensitivity given in the problem.",
              )}
      </p>
      <div className="metrics">
        <Metric
          label={text(locale, "Sensitivitas silang", "Cross sensitivity")}
          value={num(cross, locale, 2)}
          unit="mV/g"
        />
        <Metric
          label={text(locale, "Rasio silang / utama", "Cross / main ratio")}
          value={num((cross / sensitivity) * 100, locale, 2)}
          unit="%"
        />
      </div>
      <p className="visual-note">
        {text(
          locale,
          "Bentuk bawah pita bersifat kualitatif. Di atas pita, frekuensi resonansi dan sensitivitas tepat belum diketahui.",
          "The below-band curve is qualitative. Above the band, resonance frequency and exact sensitivity are unknown.",
        )}
      </p>
    </>
  );
}

export function seismicState(
  m: number,
  k: number,
  c: number,
  A: number,
  f: number,
  t: number,
) {
  const w = 2 * Math.PI * f,
    real = k - m * w * w,
    imag = c * w,
    den = real * real + imag * imag;
  if (den === 0)
    return {
      a: A,
      z: NaN,
      dz: NaN,
      ddz: NaN,
      absoluteAcceleration: NaN,
      amplitude: Infinity,
    };
  const hr = (-m * real) / den,
    hi = (m * imag) / den,
    co = Math.cos(w * t),
    si = Math.sin(w * t);
  const z = A * (hr * co - hi * si),
    dz = A * w * (-hr * si - hi * co),
    ddz = -w * w * z,
    a = A * co;
  return {
    a,
    z,
    dz,
    ddz,
    absoluteAcceleration: a + ddz,
    amplitude: (A * m) / Math.sqrt(den),
  };
}
function Spring({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  const length = y2 - y1,
    pts = Array.from(
      { length: 11 },
      (_, i) =>
        `${x + (i === 0 || i === 10 ? 0 : i % 2 ? 7 : -7)},${y1 + (length * i) / 10}`,
    ).join(" ");
  return <polyline points={pts} fill="none" stroke={ink} strokeWidth="2" />;
}
function VerticalForce({
  x,
  value,
  label,
  scale,
  locale,
  inertia = false,
}: {
  x: number;
  value: number;
  label: string;
  scale: number;
  locale: Locale;
  inertia?: boolean;
}) {
  const raw = Math.abs(value) * scale,
    length = Math.min(77, raw),
    direction = value >= 0 ? -1 : 1,
    start = value >= 0 ? 100 : 132,
    end = start + direction * length,
    head = Math.min(5, length * 0.4),
    color = inertia ? orange : green;
  return (
    <g>
      {length > 0.05 && (
        <>
          <path
            d={`M${x} ${start}V${end}`}
            stroke={color}
            strokeWidth={Math.min(2, length * 0.35)}
            strokeDasharray={inertia ? "4 3" : undefined}
          />
          <path
            d={`M${x} ${end}L${x - head / 2} ${end - direction * head}L${x + head / 2} ${end - direction * head}Z`}
            fill={color}
          />
        </>
      )}
      <text x={x} y="229" textAnchor="middle" fill={color}>
        {label}
      </text>
      <text x={x} y="250" textAnchor="middle" fontSize="13">
        {num(value, locale, 3)}
      </text>
      {raw > 77 && (
        <text x={x + 7} y={end} fontSize="12">
          …
        </text>
      )}
    </g>
  );
}
function SeismicVisual({ spec, locale }: Props) {
  const m = pnum(spec, "m", 0.05),
    k = pnum(spec, "k", 240),
    c = pnum(spec, "c", 3.46),
    S = pnum(spec, "sensitivity", 0.31),
    travel = pnum(spec, "maxTravel", 0.01);
  const sourceF = pnum(spec, "frequency", 2),
    sourceA = pnum(spec, "acceleration", 9.81),
    fn = Math.sqrt(k / m) / (2 * Math.PI);
  const [frequency, setFrequency] = useState(sourceF),
    [amplitude, setAmplitude] = useState(sourceA);
  const speed = Math.min(1, 1 / Math.max(frequency, 0.1)),
    clock = useClock(4 / Math.max(frequency, 0.1), speed);
  useEffect(() => {
    setFrequency(sourceF);
    setAmplitude(sourceA);
    clock.reset();
  }, [m, k, c, S, travel, sourceF, sourceA]);
  const state = seismicState(m, k, c, amplitude, frequency, clock.t),
    voltage = S * state.z;
  const fg = -m * 9.81,
    fs = m * 9.81 - k * state.z,
    fc = -c * state.dz,
    fi = -m * state.absoluteAcceleration,
    residual = fg + fs + fc + fi;
  const outOfRange = state.amplitude > travel,
    scale = 32 / travel,
    massY = 110 - clamp(state.z, -1.5 * travel, 1.5 * travel) * scale,
    forceScale = 55 / (m * 9.81 + k * travel);
  const forceClipped = [fg, fs, fc, fi].some(
      (v) => Math.abs(v) * forceScale > 77,
    ),
    maxA = Math.max(sourceA, (k / m) * travel * 1.2);
  if (!(m > 0 && k > 0 && c >= 0 && travel > 0))
    return (
      <p role="status">
        {text(
          locale,
          "Parameter massa, pegas, redaman, atau batas gerak tidak valid.",
          "Mass, spring, damping, or travel-limit parameters are invalid.",
        )}
      </p>
    );
  return (
    <div
      data-model="seismic-accelerometer"
      data-time={clock.t}
      data-z={state.z}
      data-voltage={voltage}
      data-force-residual={residual}
    >
      <div style={gridStyle}>
        <Svg
          label={text(
            locale,
            "Massa seismik relatif terhadap rumah sensor",
            "Seismic mass relative to sensor housing",
          )}
          viewBox="0 0 260 265"
        >
          <path
            d="M55 25H200V195H55Z"
            fill="#f0f3eb"
            stroke={ink}
            strokeWidth="2"
          />
          <path d="M40 198H215" stroke={ink} strokeWidth="3" />
          <path d="M65 110H190" stroke="#b5bcae" strokeDasharray="3 3" />
          <text x="205" y="115">
            z=0
          </text>
          <rect
            x="94"
            y="33"
            width="27"
            height="34"
            fill="none"
            stroke="#9ca991"
          />
          <rect
            x="135"
            y="33"
            width="27"
            height="34"
            fill="none"
            stroke="#9ca991"
          />
          <path
            d={`M128 ${massY}V${massY - 42}`}
            stroke={ink}
            strokeWidth="6"
          />
          <Spring x={108} y1={massY + 27} y2={188} />
          <path
            d={`M151 ${massY + 27}V${massY + 47}M141 ${massY + 47}H161M141 ${massY + 44}V170H161V${massY + 44}M151 170V188`}
            fill="none"
            stroke={ink}
            strokeWidth="2"
          />
          <rect
            x="82"
            y={massY - 14}
            width="92"
            height="41"
            rx="3"
            fill="#dce7cf"
            stroke={green}
            strokeWidth="2"
          />
          <text x="128" y={massY + 12} textAnchor="middle">
            m₁ + m₂
          </text>
          <text x="94" y="182">
            k
          </text>
          <text x="174" y="172">
            c
          </text>
          <path d="M29 160V95" stroke={ink} markerEnd="url(#arrow-ink)" />
          <text x="28" y="85" textAnchor="middle">
            +z
          </text>
          <text x="130" y="225" textAnchor="middle">
            {text(locale, "Ac. rumah a(t)", "Base acceleration a(t)")}
          </text>
          <text x="130" y="249" textAnchor="middle">
            {num(state.a, locale, 3)} m/s²
          </text>
        </Svg>
        <Svg
          label={text(
            locale,
            "Diagram benda bebas massa dengan gaya inersia D’Alembert",
            "Mass free-body diagram including D’Alembert inertia",
          )}
          viewBox="0 0 260 265"
        >
          <text x="130" y="16" textAnchor="middle">
            {text(locale, "Gaya bertanda (N)", "Signed forces (N)")}
          </text>
          <rect
            x="20"
            y="100"
            width="220"
            height="32"
            rx="3"
            fill="#e6ecde"
            stroke={ink}
          />
          <text x="130" y="122" textAnchor="middle">
            m
          </text>
          <VerticalForce
            x={43}
            value={fs}
            label="Fₛ"
            scale={forceScale}
            locale={locale}
          />
          <VerticalForce
            x={101}
            value={fg}
            label="−mg"
            scale={forceScale}
            locale={locale}
          />
          <VerticalForce
            x={159}
            value={fc}
            label="F꜀"
            scale={forceScale}
            locale={locale}
          />
          <VerticalForce
            x={217}
            value={fi}
            label="−mẍ"
            scale={forceScale}
            locale={locale}
            inertia
          />
        </Svg>
      </div>
      <Playback clock={clock} locale={locale} />
      <div className="metrics">
        <Metric
          label={text(locale, "Simpangan relatif z", "Relative displacement z")}
          value={num(state.z * 1000, locale, 4)}
          unit="mm"
        />
        <Metric label="E(t)" value={num(voltage * 1000, locale, 4)} unit="mV" />
      </div>
      <div className="parameter-grid">
        <Parameter
          label={text(locale, "Frekuensi contoh", "Illustrative frequency")}
          value={frequency}
          min={0.1}
          max={Math.max(fn * 1.8, sourceF)}
          step={0.1}
          onChange={(v) => {
            setFrequency(v);
            clock.reset();
          }}
          unit="Hz"
          digits={1}
        />
        <Parameter
          label={text(locale, "Amplitudo percepatan", "Acceleration amplitude")}
          value={amplitude}
          min={0}
          max={maxA}
          step={0.1}
          onChange={(v) => {
            setAmplitude(v);
            clock.reset();
          }}
          unit="m/s²"
          digits={2}
        />
      </div>
      <Formula>{String.raw`\underbrace{(mg-kz)-mg-c\dot z-m(\ddot z+a)}_{\sum F_{\mathrm{real}}-m\ddot x}=0,\quad E=Sz`}</Formula>
      {outOfRange && (
        <p role="status" className="visual-note">
          {text(
            locale,
            `Amplitudo simpangan ${num(state.amplitude * 1000, locale, 3)} mm melampaui batas ${num(travel * 1000, locale, 2)} mm. Respons linear ini berada di luar rentang ukur.`,
            `Displacement amplitude ${num(state.amplitude * 1000, locale, 3)} mm exceeds the ${num(travel * 1000, locale, 2)} mm limit. This linear response is outside the measurement range.`,
          )}
        </p>
      )}
      <p className="visual-note">
        {text(
          locale,
          "Respons sinus tunak; tampilan mengikuti rumah sensor. Eksitasi contoh bukan data tambahan soal. Garis putus-putus menunjukkan inersia.",
          "Steady sinusoidal response, viewed from the housing. The example excitation is not extra exam data. Dashed arrows show inertia.",
        )}{" "}
        {speed < 1
          ? text(
              locale,
              `Waktu tayang ${num(speed, locale, 4)}×.`,
              `Playback speed ${num(speed, locale, 4)}×.`,
            )
          : ""}{" "}
        {forceClipped
          ? text(
              locale,
              "Panah bertanda … melebihi skala gambar; nilainya tetap ditampilkan.",
              "Arrows marked … exceed the drawing scale; their values remain visible.",
            )
          : ""}
      </p>
    </div>
  );
}

export function VibrometerVisual({ spec, locale }: Props) {
  const sourceF = pnum(spec, "frequency", 10),
    A = pnum(spec, "acceleration", 9.81),
    K = pnum(spec, "sensitivity", 4),
    fmin = pnum(spec, "minFrequency", 10),
    fmax = pnum(spec, "maxFrequency", 2000);
  const [frequency, setFrequency] = useState(sourceF);
  const speed = Math.min(1, 1 / frequency),
    clock = useClock(4 / frequency, speed);
  useEffect(() => {
    setFrequency(sourceF);
    clock.reset();
  }, [sourceF, A, K, fmin, fmax]);
  const w = 2 * Math.PI * frequency,
    xAmp = A / (w * w),
    vAmp = A / w,
    eAmp = K * vAmp,
    phase = w * clock.t,
    x = xAmp * Math.sin(phase),
    v = vAmp * Math.cos(phase),
    e = K * v;
  const xScale = 48 / (A / (2 * Math.PI * fmin) ** 2 || 1),
    y = 86 - x * xScale,
    timeScale = frequency > 100 ? 1000 : 1,
    timeUnit = frequency > 100 ? "ms" : "s";
  const series = useMemo<Series[]>(
    () => [
      {
        name: text(locale, "Tegangan", "Voltage"),
        data: Array.from({ length: 201 }, (_, i) => {
          const t = ((4 / frequency) * i) / 200;
          return [t * timeScale, eAmp * Math.cos(w * t) * 1000];
        }),
      },
      {
        name: text(locale, "Saat ini", "Current state"),
        data: [[clock.t * timeScale, e * 1000]],
        type: "scatter",
        color: orange,
      },
    ],
    [frequency, K, A, clock.t, locale],
  );
  return (
    <div
      data-model="vibrometer"
      data-time={clock.t}
      data-displacement={x}
      data-velocity={v}
      data-voltage={e}
    >
      <Svg
        label={text(
          locale,
          "Kumparan bergerak terhadap magnet tetap",
          "Coil moving relative to fixed magnets",
        )}
        viewBox="0 0 500 200"
      >
        <rect
          x="93"
          y="15"
          width="46"
          height="155"
          rx="3"
          fill="#e1e6da"
          stroke={ink}
        />
        <rect
          x="221"
          y="15"
          width="46"
          height="155"
          rx="3"
          fill="#e1e6da"
          stroke={ink}
        />
        <text x="116" y="105" textAnchor="middle">
          S
        </text>
        <text x="244" y="105" textAnchor="middle">
          N
        </text>
        <path
          d={`M154 ${y - 16}H206V${y + 30}H154Z`}
          fill="none"
          stroke={green}
          strokeWidth="5"
        />
        <path
          d={`M155 ${y - 16}V${y - 23}H183M205 ${y - 16}V${y - 30}H195`}
          fill="none"
          stroke={ink}
          strokeWidth="2"
        />
        <path d="M82 174H276" stroke={ink} />
        <text x="180" y="195" textAnchor="middle">
          {text(locale, "Magnet tetap", "Fixed magnets")}
        </text>
        <path d="M321 119V47" stroke={ink} markerEnd="url(#arrow-ink)" />
        <text x="322" y="34" textAnchor="middle">
          +x
        </text>
        <text x="398" y="73" textAnchor="middle">
          {text(locale, "Kumparan", "Coil")}
        </text>
        <text x="398" y="102" textAnchor="middle">
          x = {num(x * 1000, locale, 6)} mm
        </text>
      </Svg>
      <Playback
        clock={clock}
        locale={locale}
        digits={frequency > 100 ? 5 : 3}
      />
      <div className="metrics">
        <Metric label="E(t)" value={num(e * 1000, locale, 4)} unit="mV" />
        <Metric
          label={text(locale, "Amplitudo tegangan", "Voltage amplitude")}
          value={num(eAmp * 1000, locale, 4)}
          unit="mV"
        />
      </div>
      <Parameter
        label={text(locale, "Frekuensi", "Frequency")}
        value={frequency}
        min={fmin}
        max={fmax}
        step={1}
        onChange={(f) => {
          setFrequency(f);
          clock.reset();
        }}
        unit="Hz"
        digits={0}
      />
      <Plot
        series={series}
        xLabel={`t (${timeUnit})`}
        yLabel="E (mV)"
        height={175}
        xMin={0}
        xMax={(4 / frequency) * timeScale}
        yMin={-eAmp * 1100}
        yMax={eAmp * 1100}
        locale={locale}
      />
      <Formula>{String.raw`\hat v=\frac{\hat a}{2\pi f},\qquad\hat E=K\hat v`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `Gerak kinematik dengan percepatan puncak tetap. Skala simpangan tetap; pada frekuensi tinggi, geraknya sangat kecil. Waktu tayang ${num(speed, locale, 5)}×.`,
          `Prescribed motion with fixed peak acceleration. Displacement scale stays fixed; high-frequency motion is very small. Playback speed ${num(speed, locale, 5)}×.`,
        )}
      </p>
    </div>
  );
}

import { useParamState } from "./context";
import { lazy, Suspense, useId, useState, type PointerEvent } from "react";
import type { Locale, VisualSpec } from "./types";
import { TextSelect } from "./controls";
import { Formula } from "./math";
import { text, num } from "../lib/i18n";
import { Metric, Svg, pnum, pstr } from "./common";
import { Plot } from "./plot";

const Spatial = lazy(() => import("./spatial"));
type Props = { spec: VisualSpec; locale: Locale; dimension?: string };
const clamp = (x: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, x));
const rad = (x: number) => (x * Math.PI) / 180;
const angleOf = (s: VisualSpec, fallback = 35) =>
  pnum(s, "theta", pnum(s, "angle", fallback));
const green = "var(--primary)";
const ink = "var(--muted-foreground)";
const brown = "var(--warning)";

function Model3D({
  kind,
  value,
  bits,
  encoderMode,
  pulses,
  locale,
}: {
  kind: string;
  value: number;
  bits?: number;
  encoderMode?: "absolute" | "incremental";
  pulses?: number;
  locale: Locale;
}) {
  return (
    <Suspense
      fallback={
        <div className="visual-loading">
          {text(locale, "Memuat model 3D…", "Loading 3D model…")}
        </div>
      }
    >
      <Spatial
        kind={kind}
        value={value}
        bits={bits}
        encoderMode={encoderMode}
        pulses={pulses}
        locale={locale}
      />
    </Suspense>
  );
}
function angularDrag(
  e: PointerEvent<SVGGElement>,
  cx: number,
  cy: number,
  update: (value: number) => void,
) {
  const svg = e.currentTarget.ownerSVGElement;
  const matrix = svg?.getScreenCTM();
  if (!svg || !matrix) return;
  const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(
    matrix.inverse(),
  );
  update(((Math.atan2(cy - pt.y, pt.x - cx) * 180) / Math.PI + 360) % 360);
}
function ringArc(
  cx: number,
  cy: number,
  ri: number,
  ro: number,
  from: number,
  to: number,
) {
  const a = rad(from),
    b = rad(to),
    large = to - from > 180 ? 1 : 0;
  return `M ${cx + ro * Math.cos(a)} ${cy - ro * Math.sin(a)} A ${ro} ${ro} 0 ${large} 0 ${cx + ro * Math.cos(b)} ${cy - ro * Math.sin(b)} L ${cx + ri * Math.cos(b)} ${cy - ri * Math.sin(b)} A ${ri} ${ri} 0 ${large} 1 ${cx + ri * Math.cos(a)} ${cy - ri * Math.sin(a)} Z`;
}
function codedRings(bits: number, cx: number, cy: number) {
  const count = 2 ** bits,
    rings: { d: string; key: string }[] = [];
  for (let b = 0; b < bits; b++) {
    const ri = 18 + (b * 70) / bits,
      ro = ri + 70 / bits - 1.6;
    let start = -1;
    for (let i = 0; i <= count; i++) {
      const bit = i < count && (((i ^ (i >> 1)) >> (bits - b - 1)) & 1) === 1;
      if (bit && start < 0) start = i;
      if (!bit && start >= 0) {
        rings.push({
          key: `${b}-${start}`,
          d: ringArc(cx, cy, ri, ro, (start * 360) / count, (i * 360) / count),
        });
        start = -1;
      }
    }
  }
  return rings;
}
function Encoder({ spec, locale, dimension }: Props) {
  const initialAngle = angleOf(spec, 45),
    initialBits = clamp(Math.round(pnum(spec, "bits", 8)), 2, 10);
  const [theta, setTheta] = useParamState("angle", initialAngle),
    [bits, setBits] = useParamState("bits", initialBits);
  const mode = pstr(spec, "mode", "absolute");
  const incremental = ["quadrature", "incremental"].includes(mode);
  const pulses = Math.max(1, Math.round(pnum(spec, "pulses", 16))),
    pitch = 360 / pulses;
  const count = 2 ** bits,
    code = Math.min(count - 1, Math.floor(((theta % 360) / 360) * count)),
    gray = code ^ (code >> 1);
  const states = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ];
  const phase = Math.floor(((theta / pitch) * 4) % 4),
    [a, b] = states[phase];
  const cx = 126,
    cy = 112;
  function waveform(channel: number) {
    const points: string[] = [];
    const y = channel ? 136 : 72;
    for (let i = 0; i < 8; i++) {
      const value = states[i % 4][channel];
      points.push(
        `${252 + i * 27},${y - value * 28}`,
        `${252 + (i + 1) * 27},${y - value * 28}`,
      );
    }
    return points.join(" ");
  }
  return (
    <>
      {dimension === "3d" ? (
        <Model3D
          kind="encoder"
          value={theta}
          bits={bits}
          encoderMode={incremental ? "incremental" : "absolute"}
          pulses={pulses}
          locale={locale}
        />
      ) : (
        <Svg
          label={text(
            locale,
            incremental
              ? "Cakram encoder dan dua kanal kuadratur"
              : "Cakram kode Gray dan sudut pembacaan",
            incremental
              ? "Encoder disk and quadrature channels"
              : "Gray-code disk and reading angle",
          )}
          viewBox="0 0 500 230"
        >
          <g
            style={{ touchAction: "none", cursor: "grab" }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              angularDrag(e, cx, cy, setTheta);
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId))
                angularDrag(e, cx, cy, setTheta);
            }}
            onPointerUp={(e) =>
              e.currentTarget.releasePointerCapture(e.pointerId)
            }
          >
            <circle cx={cx} cy={cy} r="91" fill="var(--surface-subtle)" stroke="var(--muted-foreground)" />
            {incremental
              ? Array.from({ length: Math.min(pulses, 128) }, (_, i) => (
                  <path
                    key={i}
                    d={ringArc(
                      cx,
                      cy,
                      60,
                      86,
                      (i * 360) / Math.min(pulses, 128),
                      ((i + 0.5) * 360) / Math.min(pulses, 128),
                    )}
                    fill={green}
                  />
                ))
              : codedRings(bits, cx, cy).map((v) => (
                  <path key={v.key} d={v.d} fill={green} />
                ))}
            <circle cx={cx} cy={cy} r="12" fill="var(--muted-foreground)" />
            <line
              x1={cx}
              y1={cy}
              x2={cx + 98 * Math.cos(rad(theta))}
              y2={cy - 98 * Math.sin(rad(theta))}
              stroke={brown}
              strokeWidth="3"
            />
            <circle
              cx={cx + 98 * Math.cos(rad(theta))}
              cy={cy - 98 * Math.sin(rad(theta))}
              r="6"
              fill={brown}
            />
          </g>
          {incremental ? (
            <>
              <text x="235" y="58" textAnchor="end">
                A
              </text>
              <text x="235" y="124" textAnchor="end">
                B
              </text>
              <polyline
                points={waveform(0)}
                fill="none"
                stroke={green}
                strokeWidth="2"
              />
              <polyline
                points={waveform(1)}
                fill="none"
                stroke={brown}
                strokeWidth="2"
              />
              <line
                x1={252 + ((theta / pitch) % 2) * 108}
                x2={252 + ((theta / pitch) % 2) * 108}
                y1="32"
                y2="151"
                stroke={ink}
                strokeDasharray="4 4"
              />
              <text x="252" y="172">
                0
              </text>
              <text x="465" y="172" textAnchor="end">
                {num(2 * pitch, locale, 1)}°
              </text>
              <text x="360" y="207" textAnchor="middle">
                {text(
                  locale,
                  "Satu periode A/B = satu celah",
                  "One A/B period = one slit",
                )}
              </text>
            </>
          ) : (
            <>
              <text x="270" y="62">
                {text(locale, "Kode posisi", "Position code")}
              </text>
              <text x="270" y="98" style={{ fontSize: 28, fontWeight: 500 }}>
                {code} / {count - 1}
              </text>
              <text x="270" y="136">
                Gray
              </text>
              <text
                x="270"
                y="162"
                style={{ fontFamily: "monospace", fontSize: 19 }}
              >
                {gray.toString(2).padStart(bits, "0")}
              </text>
              <text x="270" y="199">
                Δθ = {num(360 / count, locale, 5)}°
              </text>
            </>
          )}
        </Svg>
      )}
      {dimension === "3d" && !incremental && (
        <div className="metrics">
          <Metric
            label={text(locale, "Kode posisi", "Position code")}
            value={String(code)}
          />
          <Metric label="Δθ" value={num(360 / count, locale, 5)} unit="°" />
        </div>
      )}
      {incremental && (
        <div className="metrics">
          <Metric label="A" value={String(a)} />
          <Metric label="B" value={String(b)} />
          <Metric
            label={text(
              locale,
              "Hitungan per putaran, ×4",
              "Counts per turn, ×4",
            )}
            value={String(pulses * 4)}
          />
        </div>
      )}
      
      {incremental ? (
        <>
          <Formula>{String.raw`00\ \to\ 10\ \to\ 11\ \to\ 01\ \to\ 00`}</Formula>
          <p className="visual-note">
            {text(
              locale,
              "Urutan di atas untuk θ meningkat. Saat θ menurun, urutan berbalik. Sumbu grafik adalah sudut, bukan waktu. Kanal Z dapat memberi satu acuan per putaran.",
              "The sequence above is for increasing θ. Decreasing θ reverses it. The plot axis is angle, not time. An index channel Z can provide one reference per turn.",
            )}
          </p>
        </>
      ) : (
        <p className="visual-note">
          {text(
            locale,
            "Pola Gray adalah contoh pengkodean. Setiap kode bersebelahan mengubah satu bit. Resolusi berbeda dari ketelitian.",
            "Gray code is one encoding example. Adjacent codes change one bit. Resolution differs from accuracy.",
          )}
        </p>
      )}
    </>
  );
}
function Resolver({ spec, locale, dimension }: Props) {
  const initial = angleOf(spec, 30),
    [theta, setTheta] = useParamState("angle", initial);
  const s = Math.sin(rad(theta)),
    c = Math.cos(rad(theta));
  return (
    <>
      {dimension === "3d" ? (
        <Model3D kind="resolver" value={theta} locale={locale} />
      ) : (
        <Svg
          label={text(
            locale,
            "Sudut rotor dengan proyeksi sinus dan kosinus",
            "Rotor angle and sine/cosine projections",
          )}
          viewBox="0 0 500 235"
        >
          <circle cx="125" cy="117" r="76" fill="var(--surface-subtle)" stroke="var(--muted-foreground)" />
          <line x1="27" y1="117" x2="223" y2="117" stroke="var(--muted-foreground)" />
          <line x1="125" y1="19" x2="125" y2="215" stroke="var(--muted-foreground)" />
          <g
            style={{ touchAction: "none", cursor: "grab" }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              angularDrag(e, 125, 117, setTheta);
            }}
            onPointerMove={(e) => {
              if (e.currentTarget.hasPointerCapture(e.pointerId))
                angularDrag(e, 125, 117, setTheta);
            }}
            onPointerUp={(e) =>
              e.currentTarget.releasePointerCapture(e.pointerId)
            }
          >
            <circle cx="125" cy="117" r="82" fill="transparent" />
            <line
              x1="125"
              y1="117"
              x2={125 + 72 * c}
              y2={117 - 72 * s}
              stroke={green}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx={125 + 72 * c} cy={117 - 72 * s} r="7" fill={green} />
          </g>
          <path
            d={`M${125 + 72 * c} 117V${117 - 72 * s}H125`}
            fill="none"
            stroke={brown}
            strokeDasharray="4 4"
          />
          <rect
            x="214"
            y="101"
            width="15"
            height="32"
            rx="4"
            fill="var(--border)"
            stroke={ink}
          />
          <rect
            x="109"
            y="11"
            width="32"
            height="15"
            rx="4"
            fill="var(--border)"
            stroke={ink}
          />
          <text x="238" y="123">
            cos θ
          </text>
          <text x="145" y="24">
            sin θ
          </text>
          {[
            { y: 63, value: c, label: "cos θ" },
            { y: 151, value: s, label: "sin θ" },
          ].map((v) => (
            <g key={v.label}>
              <line x1="310" y1={v.y} x2="470" y2={v.y} stroke="var(--border)" />
              <line
                x1="390"
                y1={v.y - 11}
                x2="390"
                y2={v.y + 11}
                stroke={ink}
              />
              <line
                x1="390"
                y1={v.y}
                x2={390 + 80 * v.value}
                y2={v.y}
                stroke={v.label === "cos θ" ? green : brown}
                strokeWidth="9"
                strokeLinecap="round"
              />
              <text x="310" y={v.y - 25}>
                {v.label} = {num(v.value, locale, 3)}
              </text>
              <text x="310" y={v.y + 27}>
                −1
              </text>
              <text x="465" y={v.y + 27} textAnchor="end">
                +1
              </text>
            </g>
          ))}
        </Svg>
      )}
      {dimension === "3d" && (
        <div className="metrics">
          <Metric
            label={text(locale, "Amplitudo cos θ", "cos θ amplitude")}
            value={num(c, locale, 3)}
          />
          <Metric
            label={text(locale, "Amplitudo sin θ", "sin θ amplitude")}
            value={num(s, locale, 3)}
          />
        </div>
      )}

      <Formula>{String.raw`\theta=\operatorname{atan2}\!\left(\frac{V_{\sin}}{KV_{\mathrm{ref}}},\frac{V_{\cos}}{KV_{\mathrm{ref}}}\right)`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          "Amplitudo ternormalisasi setelah demodulasi. Kedua kumparan membawa frekuensi eksitasi yang sama; sudut mengubah amplitudonya.",
          "Normalized amplitudes after demodulation. Both windings carry the same excitation frequency; angle changes their amplitudes.",
        )}
      </p>
    </>
  );
}
function Lvdt({ spec, locale, dimension }: Props) {
  const physical =
    typeof spec.params?.x === "number" ||
    typeof spec.params?.range === "number" ||
    typeof spec.params?.sensitivity === "number";
  const range = Math.max(0.0001, pnum(spec, "range", physical ? 10 : 1)),
    initial = clamp(pnum(spec, "x", pnum(spec, "position", 0)), -range, range);
  const sensitivity = pnum(spec, "sensitivity", physical ? 0.31 : 1),
    [x, setX] = useParamState("position", initial),
    dc = pstr(spec, "mode", "") === "dc";
  const gain = physical ? sensitivity * range : 1,
    v1 = (gain * (1 + x / range)) / 2,
    v2 = (gain * (1 - x / range)) / 2;
  const core = 250 + (60 * x) / range;
  return (
    <>
      {dimension === "3d" ? (
        <Model3D kind="lvdt" value={(10 * x) / range} locale={locale} />
      ) : (
        <Svg
          label={text(
            locale,
            "Inti LVDT, primer, dan dua sekunder",
            "LVDT core, primary, and two secondary windings",
          )}
          viewBox="0 0 500 205"
        >
          <path d="M45 72H455V122H45Z" fill="var(--surface-subtle)" stroke="var(--primary)" />
          <line x1="20" y1="97" x2="480" y2="97" stroke="var(--border)" />
          {[
            { x: 145, label: "S₂", color: green },
            { x: 250, label: "P · AC", color: brown },
            { x: 355, label: "S₁", color: green },
          ].map((v) => (
            <g key={v.label}>
              {Array.from({ length: 7 }, (_, i) => (
                <ellipse
                  key={i}
                  cx={v.x - 27 + i * 9}
                  cy="97"
                  rx="4"
                  ry="37"
                  fill="none"
                  stroke={v.color}
                  strokeWidth="2"
                />
              ))}
              <text x={v.x} y="37" textAnchor="middle">
                {v.label}
              </text>
            </g>
          ))}
          <rect
            x={core - 85}
            y="86"
            width="170"
            height="22"
            rx="5"
            fill="var(--muted-foreground)"
            stroke="var(--muted-foreground)"
          />
          <line
            x1={core - 140}
            y1="97"
            x2={core - 85}
            y2="97"
            stroke="var(--muted-foreground)"
            strokeWidth="6"
          />
          <line
            x1="250"
            y1="144"
            x2={core}
            y2="144"
            stroke={brown}
            markerEnd={Math.abs(x) > 0.001 ? "url(#arrow-orange)" : undefined}
          />
          <text x={core + 8} y="149">
            x
          </text>
          <text x="145" y="180" textAnchor="middle">
            V₂ = {num(v2, locale, 3)}
            {physical ? " mV" : ""}
          </text>
          <text x="355" y="180" textAnchor="middle">
            V₁ = {num(v1, locale, 3)}
            {physical ? " mV" : ""}
          </text>
        </Svg>
      )}
      <div className="metrics">
        <Metric
          label={
            dc
              ? text(
                  locale,
                  "Keluaran DC setelah demodulasi",
                  "DC output after demodulation",
                )
              : "V₁ − V₂"
          }
          value={num(v1 - v2, locale, 3)}
          unit={physical ? "mV" : text(locale, "relatif", "relative")}
        />
        <Metric
          label={text(
            locale,
            "Fase terhadap acuan",
            "Phase relative to reference",
          )}
          value={
            Math.abs(x) < 1e-10
              ? text(locale, "Tidak terdefinisi pada nol", "Undefined at null")
              : x > 0
                ? "0°"
                : "180°"
          }
        />
      </div>

      <Formula>{String.raw`V_o=V_1-V_2\approx kx`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          "Skema rentang linear. Nilai tiap sekunder merupakan model simetris untuk menunjukkan selisihnya.",
          "Linear-range schematic. Individual secondary values use a symmetric model to illustrate their difference.",
        )}{" "}
        {dc &&
          text(
            locale,
            "Antarmuka DC tetap memakai eksitasi AC dan demodulasi di dalam modul.",
            "A DC interface still uses internal AC excitation and demodulation.",
          )}
        {!physical &&
          text(
            locale,
            " Posisi dan amplitudo relatif; bukan kalibrasi panjang.",
            " Relative position and amplitude; not a length calibration.",
          )}
      </p>
    </>
  );
}
function Potentiometer({ spec, locale }: Props) {
  const length = pnum(spec, "length", 100),
    voltage = pnum(spec, "V", 5),
    initial = clamp(pnum(spec, "x", length * 0.4), 0, length),
    [x, setX] = useParamState("position", initial);
  const cursor = 70 + (360 * x) / length,
    output = (voltage * x) / length;
  return (
    <>
      <Svg
        label={text(
          locale,
          "Pembagi tegangan potensiometer linear",
          "Linear potentiometer voltage divider",
        )}
        viewBox="0 0 500 180"
      >
        <line x1="45" y1="74" x2="455" y2="74" stroke={ink} strokeWidth="2" />
        <rect
          x="70"
          y="64"
          width="360"
          height="20"
          fill="var(--surface-subtle)"
          stroke={green}
        />
        <path
          d={`M${cursor} 145V88`}
          stroke={brown}
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrow-orange)"
        />
        <line x1={cursor} y1="145" x2="458" y2="145" stroke={brown} />
        <text x="456" y="168" textAnchor="end">
          Vₒ
        </text>
        <text x="48" y="47">
          0 V
        </text>
        <text x="452" y="47" textAnchor="end">
          {num(voltage, locale)} V
        </text>
        <text x="70" y="110">
          x = 0
        </text>
        <text x="430" y="110" textAnchor="end">
          L
        </text>
      </Svg>
      <div className="metrics">
        <Metric
          label={text(locale, "Tegangan keluaran", "Output voltage")}
          value={num(output, locale, 3)}
          unit="V"
        />
      </div>

      <Formula>{String.raw`V_o=V_s\frac{x}{L}`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          "Contoh pembagi tegangan ideal tanpa pembebanan. Dimensi dan catu adalah nilai ilustrasi jika sumber tidak menetapkannya.",
          "Ideal unloaded-divider example. Dimensions and excitation are illustrative when the source does not specify them.",
        )}
      </p>
    </>
  );
}

export function PositionVisual(props: Props) {
  const key = `${props.spec.kind}:${JSON.stringify(props.spec.params ?? {})}`;
  if (props.spec.kind === "encoder") return <Encoder key={key} {...props} />;
  if (props.spec.kind === "resolver") return <Resolver key={key} {...props} />;
  if (props.spec.kind === "potentiometer")
    return <Potentiometer key={key} {...props} />;
  return <Lvdt key={key} {...props} />;
}

function Capacitive({ spec, locale }: Props) {
  const H = Math.max(0.001, pnum(spec, "height", 1)),
    h0 = clamp(pnum(spec, "deadHeight", 0.1), 0, H * 0.99);
  const A = pnum(spec, "area", 0.02),
    gap = pnum(spec, "gap", 0.005),
    initial = clamp(pnum(spec, "level", H * 0.5), 0, H),
    k0 = pnum(spec, "k", 4);
  const [h, setH] = useParamState("height", initial),
    [k, setK] = useParamState("permittivity", k0);
  const eta = clamp((h - h0) / (H - h0), 0, 1),
    C0 = (8.8541878128e-12 * A) / gap,
    C = C0 * (1 + (k - 1) * eta);
  const y = 218 - (h / H) * 172,
    tip = 218 - (h0 / H) * 172;
  const clip = useId();
  return (
    <>
      <Svg
        label={text(
          locale,
          "Kapasitor sebagian terendam, dengan jarak mati di bawah ujung pelat",
          "Partly immersed capacitor with dead height below the electrode tips",
        )}
        viewBox="0 0 500 250"
      >
        <defs>
          <clipPath id={clip}>
            <rect x="123" y="45" width="254" height="173" />
          </clipPath>
        </defs>
        <rect
          x="123"
          y={y}
          width="254"
          height={218 - y}
          fill="var(--surface-subtle)"
          clipPath={`url(#${clip})`}
        />
        <path d="M120 40V220H380V40" fill="none" stroke={ink} strokeWidth="3" />
        <line
          x1="124"
          y1={y}
          x2="376"
          y2={y}
          stroke="var(--primary)"
          strokeWidth="2"
        />
        <rect x="217" y="38" width="9" height={tip - 38} fill={green} />
        <rect x="274" y="38" width="9" height={tip - 38} fill={brown} />
        <path d="M221 38V18M279 38V18" fill="none" stroke={ink} />
        <circle cx="221" cy="16" r="3" fill="var(--surface-subtle)" stroke={ink} />
        <circle cx="279" cy="16" r="3" fill="var(--surface-subtle)" stroke={ink} />
        <text x="250" y="20" textAnchor="middle">
          C
        </text>
        <path
          d={`M92 ${y}V218`}
          stroke="var(--primary)"
          markerStart={h > 0 ? "url(#arrow-ink)" : undefined}
          markerEnd={h > 0 ? "url(#arrow-ink)" : undefined}
        />
        <text x="74" y={(y + 218) / 2 + 5}>
          h
        </text>
        <path d={`M409 ${tip}V218`} stroke={ink} />
        <path d={`M401 ${tip}H417M401 218H417`} stroke={ink} />
        <text x="422" y={(tip + 218) / 2 + 4}>
          h₀
        </text>
        {h >= H * 0.2 && (
          <text x="150" y={Math.min(y + 30, 205)}>
            {text(locale, "cairan", "liquid")}
          </text>
        )}
        {y > 90 && (
          <text x="157" y="67">
            {text(locale, "udara", "air")}
          </text>
        )}
        <path
          d="M227 95H273"
          stroke={ink}
          markerStart="url(#arrow-ink)"
          markerEnd="url(#arrow-ink)"
        />
        <text x="250" y="86" textAnchor="middle">
          d
        </text>
      </Svg>
      <div className="metrics">
        <Metric
          label={text(locale, "Kapasitansi", "Capacitance")}
          value={num(C * 1e12, locale, 2)}
          unit="pF"
        />
        <Metric
          label={text(
            locale,
            "Panjang terendam aktif",
            "Active immersed length",
          )}
          value={num(Math.max(0, h - h0), locale, 3)}
          unit="m"
        />
      </div>
      
      <Formula>{String.raw`C=\frac{\varepsilon_0A}{d}\,[1+(\kappa-1)\eta],\quad\eta=\frac{\max(0,h-h_0)}{H-h_0}`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `Model pelat sejajar; H = ${num(H, locale)} m, h₀ = ${num(h0, locale)} m. Dimensi ilustrasi. Di bawah ujung pelat, tinggi cairan belum mengubah kapasitansi.`,
          `Parallel-plate model; H = ${num(H, locale)} m, h₀ = ${num(h0, locale)} m. Illustrative dimensions. Below the electrode tips, liquid height does not yet change capacitance.`,
        )}
      </p>
    </>
  );
}
export function CapacitiveVisual(props: Props) {
  return (
    <Capacitive key={JSON.stringify(props.spec.params ?? {})} {...props} />
  );
}

function Ultrasonic({ spec, locale }: Props) {
  const c = pnum(spec, "c", 330),
    t0 = Math.max(1e-6, pnum(spec, "tEmpty", 0.2)),
    initial = clamp(pnum(spec, "t", 0.1), 0, t0),
    [time, setTime] = useParamState("flightTime", initial);
  const H = (c * t0) / 2,
    d = (c * time) / 2,
    h = H - d,
    surface = 45 + (175 * time) / t0;
  const clip = useId();
  return (
    <>
      <Svg
        label={text(
          locale,
          "Tangki dan dua lintasan pulsa ultrasonik pulang-pergi",
          "Tank and the outgoing/return ultrasonic pulse paths",
        )}
        viewBox="0 0 500 250"
      >
        <defs>
          <clipPath id={clip}>
            <rect x="140" y="44" width="220" height="176" />
          </clipPath>
        </defs>
        <rect
          x="140"
          y={surface}
          width="220"
          height={220 - surface}
          fill="var(--border)"
          clipPath={`url(#${clip})`}
        />
        <path d="M140 45V220H360V45" fill="none" stroke={ink} strokeWidth="3" />
        <line
          x1="142"
          y1={surface}
          x2="358"
          y2={surface}
          stroke="var(--primary)"
          strokeWidth="2"
        />
        <rect
          x="225"
          y="16"
          width="50"
          height="26"
          rx="5"
          fill="var(--border)"
          stroke={green}
        />
        <text x="250" y="13" textAnchor="middle">
          {text(locale, "Sensor", "Sensor")}
        </text>
        {surface >= 61 && (
          <>
            <path
              d={`M238 47V${surface - 4}`}
              stroke={green}
              strokeWidth="2"
              markerEnd="url(#arrow-green)"
            />
            <path
              d={`M262 ${surface - 4}V47`}
              stroke={brown}
              strokeWidth="2"
              markerEnd="url(#arrow-orange)"
            />
          </>
        )}
        <path
          d={`M95 ${surface}V220`}
          stroke={ink}
          markerStart={h > 0 ? "url(#arrow-ink)" : undefined}
          markerEnd={h > 0 ? "url(#arrow-ink)" : undefined}
        />
        <text x="78" y={(surface + 220) / 2 + 4}>
          h
        </text>
        <path d={`M316 45V${surface}`} stroke={ink} strokeDasharray="4 4" />
        <text x="324" y={(surface + 45) / 2 + 4}>
          d
        </text>
        <path d="M407 45V220M398 45H415M398 220H415" fill="none" stroke={ink} />
        <text x="424" y="135">
          H
        </text>
        <text x="250" y="241" textAnchor="middle">
          {text(locale, "Dasar / acuan kosong", "Bottom / empty reference")}
        </text>
      </Svg>
      <div className="metrics">
        <Metric
          label={text(locale, "Tinggi cairan h", "Liquid height h")}
          value={num(h, locale, 3)}
          unit="m"
        />
        <Metric
          label={text(locale, "Jarak udara d", "Air gap d")}
          value={num(d, locale, 3)}
          unit="m"
        />
      </div>

      <Formula>{String.raw`h=\frac{c}{2}(t_0-t)`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `c = ${num(c, locale)} m/s; t₀ = ${num(t0 * 1000, locale)} ms; H = ${num(H, locale)} m.`,
          `c = ${num(c, locale)} m/s; t₀ = ${num(t0 * 1000, locale)} ms; H = ${num(H, locale)} m.`,
        )}
      </p>
    </>
  );
}
export function UltrasonicVisual(props: Props) {
  return (
    <Ultrasonic key={JSON.stringify(props.spec.params ?? {})} {...props} />
  );
}

function Strain({ spec, locale }: Props) {
  const initial = pnum(spec, "strainMicro", 500),
    [micro, setMicro] = useParamState("strain", initial),
    [poisson, setPoisson] = useParamState("poisson", pnum(spec, "nu", 0.3)),
    [model, setModel] = useState("bonded");
  const V = pnum(spec, "V", 5),
    R = pnum(spec, "R0", 350),
    GF = pnum(spec, "GF", 2),
    e = micro * 1e-6;
  const nu = model === "bonded" ? poisson : 0,
    strains = [e, -e, -nu * e, nu * e],
    resistances = strains.map((v) => R * (1 + GF * v));
  const [a1, a2, d1, d2] = resistances,
    vl = (V * a2) / (a1 + a2),
    vr = (V * d2) / (d1 + d2),
    Vo = vr - vl;
  const labels = ["A1", "A2", "D1", "D2"];
  return (
    <>
      <Svg
        label={text(
          locale,
          "Balok kantilever, gauge atas/bawah, beban dan reaksi statik",
          "Cantilever with top/bottom gauges, static load and reactions",
        )}
        viewBox="0 0 500 175"
      >
        <rect x="48" y="46" width="13" height="88" fill="var(--border)" />
        <path d="M61 82H429V108H61Z" fill="var(--surface-subtle)" stroke={ink} />
        <rect
          x="103"
          y="76"
          width="45"
          height="7"
          fill={micro >= 0 ? brown : green}
        />
        <rect
          x="174"
          y="76"
          width="15"
          height="7"
          fill={micro >= 0 ? green : brown}
        />
        <rect
          x="103"
          y="108"
          width="45"
          height="7"
          fill={micro >= 0 ? green : brown}
        />
        <rect
          x="174"
          y="108"
          width="15"
          height="7"
          fill={micro >= 0 ? brown : green}
        />
        <text x="125" y="61" textAnchor="middle">
          A1
        </text>
        <text x="181" y="61" textAnchor="middle">
          D1
        </text>
        <text x="125" y="138" textAnchor="middle">
          A2
        </text>
        <text x="181" y="138" textAnchor="middle">
          D2
        </text>
        {micro !== 0 && (
          <>
            <path
              d={micro > 0 ? "M418 24V78" : "M418 77V24"}
              stroke={brown}
              strokeWidth="2"
              markerEnd="url(#arrow-orange)"
            />
            <text x="432" y="49">
              F
            </text>
            <path
              d={micro > 0 ? "M30 109V62" : "M30 62V109"}
              stroke={ink}
              strokeWidth="2"
              markerEnd="url(#arrow-ink)"
            />
            <text x="10" y="49">
              Rᵧ
            </text>
            <path
              d={
                micro > 0
                  ? "M76 154A23 23 0 0 0 34 145"
                  : "M34 145A23 23 0 0 1 76 154"
              }
              fill="none"
              stroke={ink}
              markerEnd="url(#arrow-ink)"
            />
            <text x="15" y="173">
              M
            </text>
          </>
        )}
        <text x="315" y="139" textAnchor="middle">
          {text(locale, "Skema statik", "Static schematic")}
        </text>
      </Svg>
      <Svg
        label={text(
          locale,
          "Jembatan A1 A2 D1 D2, catu atas-bawah dan keluaran kanan dikurangi kiri",
          "A1 A2 D1 D2 bridge with top/bottom excitation and right-minus-left output",
        )}
        viewBox="0 0 500 245"
      >
        <path
          d="M250 27L125 120L250 213L375 120Z"
          fill="none"
          stroke={ink}
          strokeWidth="2"
        />
        {[
          { x: 186, y: 73, rot: -37, i: 0 },
          { x: 186, y: 166, rot: 37, i: 1 },
          { x: 313, y: 73, rot: 37, i: 2 },
          { x: 313, y: 166, rot: -37, i: 3 },
        ].map((v) => (
          <g key={v.i}>
            <rect
              x={v.x - 29}
              y={v.y - 9}
              width="58"
              height="18"
              fill="var(--surface-subtle)"
              stroke={strains[v.i] >= 0 ? brown : green}
              strokeWidth="2"
              transform={`rotate(${v.rot},${v.x},${v.y})`}
            />
            <text x={v.x < 250 ? 91 : 409} y={v.y - 3} textAnchor="middle">
              {labels[v.i]}
            </text>
            <text x={v.x < 250 ? 91 : 409} y={v.y + 19} textAnchor="middle">
              {num(resistances[v.i], locale, 3)} Ω
            </text>
          </g>
        ))}
        <line x1="125" y1="120" x2="205" y2="120" stroke={ink} />
        <line x1="295" y1="120" x2="375" y2="120" stroke={ink} />
        <text x="250" y="125" textAnchor="middle">
          − Vₒ +
        </text>
        <text x="250" y="15" textAnchor="middle">
          +{num(V, locale)} V
        </text>
        <text x="250" y="238" textAnchor="middle">
          0 V
        </text>
        {[
          [250, 27],
          [125, 120],
          [250, 213],
          [375, 120],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={ink} />
        ))}
      </Svg>
      <div className="metrics">
        <Metric
          label={text(locale, "Keluaran jembatan", "Bridge output")}
          value={num(Vo * 1000, locale, 4)}
          unit="mV"
        />
        <Metric
          label={text(locale, "Regangan melintang D1", "D1 transverse strain")}
          value={num(-nu * micro, locale, 1)}
          unit="με"
        />
      </div>
      
      <TextSelect
        value={model}
        onChange={setModel}
        label={text(locale, "Model gauge D", "D-gauge model")}
        options={[
          {
            value: "bonded",
            label: text(locale, "D merekat melintang", "Bonded transverse D"),
          },
          {
            value: "dummy",
            label: text(
              locale,
              "Dummy ideal tanpa regangan",
              "Ideal strain-free dummy",
            ),
          },
        ]}
      />
      <Formula>{String.raw`\frac{V_o}{V_s}\approx\frac14(\delta_{A1}-\delta_{A2}-\delta_{D1}+\delta_{D2})`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `Contoh GF = ${GF}, R₀ = ${R} Ω; bentuk balok skematis. D yang merekat mengukur efek Poisson. Semua gauge sejenis pada suhu sama membantu meniadakan perubahan tahanan bersama.`,
          `Illustrative GF = ${GF}, R₀ = ${R} Ω; schematic beam. Bonded D gauges measure Poisson strain. Matched gauges at the same temperature help cancel common resistance changes.`,
        )}
      </p>
    </>
  );
}
export function StrainVisual(props: Props) {
  return <Strain key={JSON.stringify(props.spec.params ?? {})} {...props} />;
}

function Doppler({ spec, locale }: Props) {
  const c = pnum(spec, "soundSpeed", 330),
    f0 = pnum(spec, "sourceFrequency", 880),
    v0 = clamp(pnum(spec, "sourceSpeed", 100 / 3.6), 0, 0.8 * c),
    initialAngle = pnum(spec, "angle", 0);
  const [speed, setSpeed] = useParamState("speed", v0),
    [angle, setAngle] = useParamState("angle", initialAngle);
  const maxSpeed = Math.min(0.8 * c, Math.max(v0 * 2, 50));
  const projection = speed * Math.cos(rad(angle)),
    received = (f0 * c) / (c - projection),
    length = (75 * speed) / maxSpeed;
  const curve = Array.from({ length: 91 }, (_, i) => [
    i * 2,
    (f0 * c) / (c - speed * Math.cos(rad(i * 2))),
  ]);
  return (
    <>
      <Svg
        label={text(
          locale,
          "Sumber suara bergerak terhadap penerima tetap",
          "Moving sound source and stationary receiver",
        )}
        viewBox="0 0 500 220"
      >
        <path d="M30 154H470" stroke="var(--border)" strokeWidth="2" />
        <rect
          x="71"
          y="122"
          width="93"
          height="28"
          rx="8"
          fill="var(--border)"
          stroke={green}
        />
        <path d="M90 122L103 100H137L151 122" fill="var(--surface-subtle)" stroke={green} />
        <circle cx="93" cy="153" r="11" fill={ink} />
        <circle cx="142" cy="153" r="11" fill={ink} />
        <circle cx="405" cy="119" r="15" fill="var(--border)" stroke={ink} />
        <path
          d="M405 135V173M405 143L388 155M405 143L421 155M405 173L390 194M405 173L420 194"
          stroke={ink}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M174 130H373"
          stroke="var(--primary)"
          strokeDasharray="5 5"
          markerEnd="url(#arrow-ink)"
        />
        <text x="275" y="116" textAnchor="middle">
          {text(locale, "arah ke penerima", "toward receiver")}
        </text>
        {speed > 0 && (
          <path
            d={`M118 95L${118 + length * Math.cos(rad(angle))} ${95 - length * Math.sin(rad(angle))}`}
            stroke={brown}
            strokeWidth="3"
            markerEnd="url(#arrow-orange)"
          />
        )}
        <text x="115" y="204" textAnchor="middle">
          f₀ = {num(f0, locale)} Hz
        </text>
        <text x="405" y="87" textAnchor="middle">
          {text(locale, "Diam", "Stationary")}
        </text>
        <text x="206" y="55">
          v cos θ = {num(projection, locale, 2)} m/s
        </text>
      </Svg>
      <div className="metrics">
        <Metric
          label={text(locale, "Frekuensi diterima", "Received frequency")}
          value={num(received, locale, 2)}
          unit="Hz"
        />
        <Metric
          label={text(locale, "Perubahan frekuensi", "Frequency shift")}
          value={`${received >= f0 ? "+" : ""}${num(received - f0, locale, 2)}`}
          unit="Hz"
        />
      </div>
      
      <Plot
        locale={locale}
        series={[
          {
            name: text(locale, "Frekuensi diterima", "Received frequency"),
            data: curve,
          },
          {
            name: text(locale, "Keadaan saat ini", "Current state"),
            type: "scatter",
            data: [[angle, received]],
            color: brown,
          },
        ]}
        xLabel="θ (°)"
        yLabel="f (Hz)"
        height={165}
        xMin={0}
        xMax={180}
      />
      <Formula>{String.raw`f_{\mathrm{obs}}=f_0\frac{c}{c-v\cos\theta}`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          `Sumber bergerak, penerima diam, c = ${num(c, locale)} m/s. θ = 0° mendekat; θ = 180° menjauh. Ini suara langsung, bukan pantulan radar.`,
          `Moving source, stationary receiver, c = ${num(c, locale)} m/s. θ = 0° approaches; θ = 180° recedes. Sound travels directly from source to receiver.`,
        )}
      </p>
    </>
  );
}
export function DopplerVisual(props: Props) {
  return <Doppler key={JSON.stringify(props.spec.params ?? {})} {...props} />;
}

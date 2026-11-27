import { lazy, Suspense, useState } from "react";
import type { Locale, VisualSpec } from "@/content/types";
import { Parameter } from "@/components/controls";
import { flowModel } from "@/lib/models";
import { text, num } from "@/lib/i18n";
import { Svg, Metric, pnum, pstr } from "./common";
import { Formula } from "@/components/math";

const Spatial = lazy(() => import("./spatial"));
const labelStyle = { fontSize: 16, fill: "#3f4e3b" };
const smallStyle = { fontSize: 14, fill: "#4c5d47" };
const noteStyle = { fontSize: 12, lineHeight: 1.6, color: "#59634f" };

function GlassTube({ d }: { d: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke="#76827a" strokeWidth="11" />
      <path d={d} stroke="#dce8df" strokeWidth="7" />
    </g>
  );
}

/** Positive pressure at the left port depresses its mercury surface. */
function ManometerGraphic({
  left,
  right,
  top,
  bottom,
  meanY,
  h,
  hMax,
}: {
  left: number;
  right: number;
  top: number;
  bottom: number;
  meanY: number;
  h: number;
  hMax: number;
}) {
  const halfDifference = 35 * Math.max(0, Math.min(1, h / hMax));
  const leftY = meanY + halfDifference;
  const rightY = meanY - halfDifference;
  const mid = (left + right) / 2;
  const bendY = bottom - 20;
  const lowerPath =
    " V" +
    bendY +
    " Q" +
    left +
    " " +
    bottom +
    " " +
    (left + 20) +
    " " +
    bottom +
    " H" +
    (right - 20) +
    " Q" +
    right +
    " " +
    bottom +
    " " +
    right +
    " " +
    bendY;
  return (
    <g
      data-manometer-height={h}
      data-left-mercury-y={leftY}
      data-right-mercury-y={rightY}
    >
      <GlassTube d={"M" + left + " " + top + lowerPath + " V" + top} />
      <path
        d={"M" + left + " " + leftY + lowerPath + " V" + rightY}
        fill="none"
        stroke="#82999d"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d={
          "M" +
          (left - 4) +
          " " +
          leftY +
          " H" +
          (left + 4) +
          " M" +
          (right - 4) +
          " " +
          rightY +
          " H" +
          (right + 4)
        }
        stroke="#435b64"
        strokeWidth="2"
      />
      <path
        d={
          "M" +
          (left + 8) +
          " " +
          leftY +
          " H" +
          (mid + 5) +
          " M" +
          (mid - 5) +
          " " +
          rightY +
          " H" +
          (right - 8)
        }
        stroke="#7e877b"
        strokeDasharray="4 4"
        fill="none"
      />
      {h > 0 && (
        <path
          d={"M" + mid + " " + rightY + " V" + leftY}
          stroke="#9b663c"
          strokeWidth="1.5"
          markerStart="url(#arrow-orange)"
          markerEnd="url(#arrow-orange)"
        />
      )}
      <text x={mid + 13} y={meanY + 6} style={labelStyle}>
        h
      </text>
      <text x={mid} y={bottom - 12} textAnchor="middle" style={labelStyle}>
        Hg
      </text>
    </g>
  );
}

function FlowSection({
  locale,
  beta,
  Cc,
  vena,
  venturi,
  manometer,
  h,
  hMax,
}: {
  locale: Locale;
  beta: number;
  Cc: number;
  vena: boolean;
  venturi: boolean;
  manometer: boolean;
  h: number;
  hMax: number;
}) {
  const center = 90,
    halfPipe = 45;
  const holeHalf = halfPipe * beta;
  const jetHalf = holeHalf * Math.sqrt(vena ? Cc : 1);
  const plateX = 163,
    plateEnd = 175,
    jetX = 220;
  const pipe = venturi
    ? "M12 45 H100 L185 " +
      (center - holeHalf) +
      " H235 L290 45 H328 V135 H290 L235 " +
      (center + holeHalf) +
      " H185 L100 135 H12 Z"
    : "M12 45 H328 V135 H12 Z";
  const label = text(
    locale,
    "Penampang aliran dengan diameter pipa dan penampang ukur." +
      (manometer
        ? " Manometer menghubungkan tekanan hulu dan tekanan penampang ukur."
        : ""),
    "Flow section with pipe and measuring-section diameters." +
      (manometer
        ? " The manometer connects upstream and measuring-section pressures."
        : ""),
  );
  return (
    <Svg label={label} viewBox={manometer ? "0 0 340 284" : "0 0 340 180"}>
      <path d={pipe} fill="#e2e9d8" stroke="#839179" strokeWidth="2" />
      {!venturi && (
        <>
          <path
            d={
              "M" +
              plateX +
              " 36 H" +
              plateEnd +
              " V" +
              (center - holeHalf) +
              " H" +
              plateX +
              " Z M" +
              plateX +
              " " +
              (center + holeHalf) +
              " H" +
              plateEnd +
              " V144 H" +
              plateX +
              " Z"
            }
            fill="#67765c"
            data-hole-diameter-ratio={beta}
          />
          <path
            d={
              "M" +
              plateEnd +
              " " +
              (center - holeHalf) +
              " C190 " +
              (center - jetHalf) +
              " 204 " +
              (center - jetHalf) +
              " " +
              jetX +
              " " +
              (center - jetHalf) +
              " C251 " +
              (center - jetHalf) +
              " 286 51 318 51 M" +
              plateEnd +
              " " +
              (center + holeHalf) +
              " C190 " +
              (center + jetHalf) +
              " 204 " +
              (center + jetHalf) +
              " " +
              jetX +
              " " +
              (center + jetHalf) +
              " C251 " +
              (center + jetHalf) +
              " 286 129 318 129"
            }
            fill="none"
            stroke="#8e9c82"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            data-jet-diameter-ratio={beta * Math.sqrt(vena ? Cc : 1)}
          />
        </>
      )}
      {[-0.65, -0.32, 0, 0.32, 0.65].map((f) => (
        <path
          key={f}
          d={
            venturi
              ? "M20 " +
                (center + f * 40) +
                " H94 C131 " +
                (center + f * 40) +
                " 162 " +
                (center + f * holeHalf) +
                " 195 " +
                (center + f * holeHalf) +
                " H225 C260 " +
                (center + f * holeHalf) +
                " 282 " +
                (center + f * 40) +
                " 316 " +
                (center + f * 40)
              : "M20 " +
                (center + f * 40) +
                " C99 " +
                (center + f * 40) +
                " 129 " +
                (center + f * holeHalf) +
                " 171 " +
                (center + f * holeHalf) +
                " C189 " +
                (center + f * jetHalf) +
                " 204 " +
                (center + f * jetHalf) +
                " 220 " +
                (center + f * jetHalf) +
                " C258 " +
                (center + f * jetHalf) +
                " 282 " +
                (center + f * 40) +
                " 316 " +
                (center + f * 40)
          }
          fill="none"
          stroke="#6d8d54"
          strokeWidth="1.35"
          markerEnd="url(#arrow-green)"
        />
      ))}
      <path
        d="M35 49 V131"
        stroke="#56644e"
        strokeWidth="1.2"
        markerStart="url(#arrow-ink)"
        markerEnd="url(#arrow-ink)"
      />
      <text x="18" y="96" style={labelStyle}>
        D
      </text>
      {vena && !venturi && (
        <>
          <path
            d={
              "M151 " + (center - holeHalf + 2) + " V" + (center + holeHalf - 2)
            }
            stroke="#56644e"
            strokeWidth="1.2"
            markerStart="url(#arrow-ink)"
            markerEnd="url(#arrow-ink)"
          />
          <text x="127" y="96" style={labelStyle}>
            d₀
          </text>
        </>
      )}
      <path
        d={
          "M" +
          jetX +
          " " +
          (center - jetHalf + 2) +
          " V" +
          (center + jetHalf - 2)
        }
        stroke="#56644e"
        strokeWidth="1.2"
        markerStart="url(#arrow-ink)"
        markerEnd="url(#arrow-ink)"
      />
      <text x="230" y="96" style={labelStyle}>
        d
        {vena && !venturi && (
          <tspan baselineShift="sub" style={{ fontSize: 11 }}>
            c
          </tspan>
        )}
      </text>
      <text x="51" y="24" textAnchor="middle" style={labelStyle}>
        {text(locale, "Hulu", "Upstream")}
      </text>
      <text x="289" y="24" textAnchor="middle" style={labelStyle}>
        {text(locale, "Hilir", "Downstream")}
      </text>
      {!manometer && (
        <>
          {!venturi && (
            <>
              <path d="M163 144 L150 151" stroke="#67765c" />
              <text x="142" y="171" textAnchor="middle" style={smallStyle}>
                {text(locale, "Pelat", "Plate")}
              </text>
            </>
          )}
          <path
            d={"M" + jetX + " " + (center + jetHalf + 3) + " L249 150"}
            stroke="#67765c"
            fill="none"
          />
          <text x="258" y="171" textAnchor="middle" style={smallStyle}>
            {venturi
              ? text(locale, "Leher", "Throat")
              : vena
                ? "Vena contracta"
                : text(locale, "Penampang 2", "Section 2")}
          </text>
        </>
      )}
      {manometer && (
        <>
          <GlassTube d="M80 136 V165" />
          <GlassTube
            d={
              "M220 " +
              (venturi ? center + holeHalf + 1 : 136) +
              " V151 H260 V165"
            }
          />
          {!venturi && (
            <text x="168" y="164" textAnchor="middle" style={smallStyle}>
              {text(locale, "Pelat", "Plate")}
            </text>
          )}
          <text x="55" y="177" textAnchor="middle" style={labelStyle}>
            p₁
          </text>
          <text x="288" y="177" textAnchor="middle" style={labelStyle}>
            p₂
          </text>
          <ManometerGraphic
            left={80}
            right={260}
            top={165}
            bottom={270}
            meanY={211}
            h={h}
            hMax={hMax}
          />
        </>
      )}
    </Svg>
  );
}

export function FlowVisual({
  spec,
  locale,
  dimension,
}: {
  spec: VisualSpec;
  locale: Locale;
  dimension: string;
}) {
  const D = pnum(spec, "D", 0.5),
    rho = pnum(spec, "rho", 1000);
  const rhoMan = pnum(spec, "rhoManometer", pnum(spec, "rhoMan", 13600));
  const g = pnum(spec, "g", 9.81),
    Cc = pnum(spec, "Cc", 1);
  const manometer =
    typeof spec.params?.h === "number" ||
    pstr(spec, "mode", "") === "manometer";
  const pressurePerHeight = (rhoMan - rho) * g;
  const initialDp = pnum(
    spec,
    "dp",
    manometer ? pressurePerHeight * pnum(spec, "h", 0.1) : 50000,
  );
  const hMax = Math.max((initialDp * 2) / pressurePerHeight, 0.002);
  const hasCd = typeof spec.params?.Cd === "number";
  const [dp, setDp] = useState(initialDp / 1000);
  const [beta, setBeta] = useState(pnum(spec, "d", D * 0.6) / D);
  const [Cd, setCd] = useState(pnum(spec, "Cd", 1));
  const vena = pstr(spec, "convention", "") === "vena";
  const venturi = spec.kind === "venturi";
  const model = flowModel(D, D * beta, rho, dp * 1000, Cd, Cc, vena);
  const h = (dp * 1000) / pressurePerHeight;
  const mu = typeof spec.params?.mu === "number" ? pnum(spec, "mu", 0) : 0;
  const Re = mu > 0 ? (rho * model.v1 * D) / mu : null;
  const hStepMm = 10 ** Math.floor(Math.log10((hMax * 1000) / 200));
  const assumed = pnum(spec, "viscosityMissing", 0) === 1 || !hasCd;
  return (
    <>
      {dimension === "3d" ? (
        <div className="visual-stage">
          <Suspense
            fallback={
              <div className="visual-loading">
                {text(locale, "Memuat model 3D…", "Loading 3D model…")}
              </div>
            }
          >
            <Spatial
              kind={venturi ? "venturi" : "orifice"}
              beta={beta}
              jetBeta={vena ? beta * Math.sqrt(Cc) : beta}
              locale={locale}
            />
          </Suspense>
        </div>
      ) : (
        <FlowSection
          locale={locale}
          beta={beta}
          Cc={Cc}
          vena={vena}
          venturi={venturi}
          manometer={manometer}
          h={h}
          hMax={hMax}
        />
      )}
      <div className="metrics">
        <Metric
          label={
            Cd === 1
              ? text(locale, "Debit ideal Q", "Ideal flow Q")
              : assumed
                ? text(locale, "Debit asumsi Q", "Assumed flow Q")
                : text(locale, "Debit aktual Q", "Actual flow Q")
          }
          value={num(model.Q, locale, 5)}
          unit="m³/s"
        />
        <Metric
          label={text(locale, "Laju massa", "Mass flow")}
          value={num(model.mass, locale, 3)}
          unit="kg/s"
        />
        {manometer && (
          <Metric
            label={text(locale, "Beda tekanan", "Pressure difference")}
            value={num(dp, locale, 3)}
            unit="kPa"
          />
        )}
        {Re !== null && <Metric label="Re" value={num(Re, locale, 0)} />}
      </div>
      <div className="parameter-grid">
        {manometer ? (
          <Parameter
            label={text(locale, "Beda tinggi h", "Height difference h")}
            value={h * 1000}
            min={0}
            max={hMax * 1000}
            step={hStepMm}
            digits={2}
            unit="mm"
            onChange={(v) => setDp(((v / 1000) * pressurePerHeight) / 1000)}
          />
        ) : (
          <Parameter
            label="Δp"
            value={dp}
            min={0}
            max={Math.max((initialDp * 2) / 1000, 10)}
            step={Math.max(initialDp / 100000, 0.01)}
            onChange={setDp}
            unit="kPa"
            digits={2}
          />
        )}
        <Parameter
          label={vena ? "d₀ / D" : "d / D"}
          value={beta}
          min={0.15}
          max={0.85}
          step={0.01}
          onChange={setBeta}
          digits={2}
        />
        <Parameter
          label={text(locale, "Koefisien debit Cd", "Discharge coefficient Cd")}
          value={Cd}
          min={0}
          max={1}
          step={0.001}
          onChange={setCd}
          digits={3}
        />
      </div>
      <Formula>
        {"Q=C_d A_2\\sqrt{\\frac{2\\Delta p}{\\rho[1-(A_2/A_1)^2]}}"}
      </Formula>
      {vena && <Formula>{"A_2=C_cA_0,\\qquad d_c=d_0\\sqrt{C_c}"}</Formula>}
      {manometer && <Formula>{"\\Delta p=(\\rho_{Hg}-\\rho)gh"}</Formula>}
      <p className="visual-note" style={noteStyle}>
        {text(
          locale,
          "Cd mengikuti nilai yang dipilih; perubahan Re tidak menghitung ulang Cd dari tabel.",
          "Cd follows the selected value; changing Re does not recalculate Cd from the table.",
        )}
        {Cd === 1 &&
          text(
            locale,
            " Cd = 1 menampilkan aliran ideal.",
            " Cd = 1 shows ideal flow.",
          )}
        {manometer
          ? text(
              locale,
              " Diagram skematis; tinggi manometer dan diameter pipa memakai skala berbeda. Tekanan mengacu pada elevasi yang sama.",
              " Schematic diagram; manometer height and pipe diameter use different scales. Pressures refer to equal elevation.",
            )
          : text(locale, " Penampang skematis.", " Schematic section.")}
      </p>
    </>
  );
}

export function PitotVisual({
  spec,
  locale,
}: {
  spec: VisualSpec;
  locale: Locale;
}) {
  const rho = pnum(spec, "rho", 996);
  const rm = pnum(spec, "rhoMan", pnum(spec, "rhoManometer", 13600));
  const initialH = pnum(spec, "h", 0.1),
    hMax = Math.max(initialH * 2, 0.002);
  const [h, setH] = useState(initialH);
  const g = pnum(spec, "g", 9.81),
    profile = pnum(spec, "profileFactor", 1);
  const dp = (rm - rho) * g * h,
    v = Math.sqrt((2 * dp) / rho),
    vavg = v / profile;
  const D = pnum(spec, "D", 0.1),
    Q = (vavg * Math.PI * D * D) / 4;
  const mu = typeof spec.params?.mu === "number" ? pnum(spec, "mu", 0) : 0;
  const Re = mu > 0 ? (rho * vavg * D) / mu : null;
  const stepMm = 10 ** Math.floor(Math.log10((hMax * 1000) / 200));
  return (
    <>
      <Svg
        label={text(
          locale,
          "Tabung Pitot menghadap aliran. Kaki kiri membaca tekanan stagnasi; kaki kanan membaca tekanan statis.",
          "The Pitot opening faces the flow. The left leg reads stagnation pressure; the right leg reads static pressure.",
        )}
        viewBox="0 0 340 260"
      >
        <path d="M12 35 H328 M12 105 H328" stroke="#7e8a76" strokeWidth="2.5" />
        <path
          d="M28 70 H88"
          stroke="#6d8d54"
          strokeWidth="2"
          markerEnd="url(#arrow-green)"
        />
        <text x="54" y="59" textAnchor="middle" style={labelStyle}>
          v
        </text>
        <GlassTube d="M105 70 H140 V145" />
        <GlassTube d="M260 106 V145" />
        <path d="M105 65 V75" stroke="#4e6254" strokeWidth="1.5" />
        <text x="121" y="54" textAnchor="middle" style={labelStyle}>
          p₀
        </text>
        <text x="278" y="98" style={labelStyle}>
          p
        </text>
        <ManometerGraphic
          left={140}
          right={260}
          top={145}
          bottom={246}
          meanY={188}
          h={h}
          hMax={hMax}
        />
        <text x="39" y="162" style={labelStyle}>
          {text(locale, "Stagnasi", "Stagnation")}
        </text>
        <path d="M102 156 H127" stroke="#788470" />
        <text x="38" y="187" style={smallStyle}>
          {h > 0 ? "p₀ > p" : "p₀ = p"}
        </text>
      </Svg>
      <div className="metrics">
        <Metric
          label={text(locale, "Beda tekanan", "Pressure difference")}
          value={num(dp, locale, 2)}
          unit="Pa"
        />
        <Metric
          label={text(locale, "Kecepatan lokal", "Local velocity")}
          value={num(v, locale, 3)}
          unit="m/s"
        />
        <Metric label="Q" value={num(Q, locale, 6)} unit="m³/s" />
        {Re !== null && <Metric label="Re" value={num(Re, locale, 0)} />}
      </div>
      <Parameter
        label={text(locale, "Beda tinggi h", "Height difference h")}
        value={h * 1000}
        min={0}
        max={hMax * 1000}
        step={stepMm}
        onChange={(v) => setH(v / 1000)}
        unit="mm"
        digits={2}
      />
      <Formula>{"v=\\sqrt{\\frac{2(\\rho_{Hg}-\\rho)gh}{\\rho}}"}</Formula>
      {profile !== 1 && (
        <Formula>
          {"v_{\\mathrm{avg}}=\\frac{v}{" +
            profile +
            "},\\qquad Q=\\frac{\\pi D^2}{4}v_{\\mathrm{avg}}"}
        </Formula>
      )}
      <p className="visual-note" style={noteStyle}>
        {text(
          locale,
          "Tinggi manometer dan diameter pipa memakai skala berbeda. Tekanan stagnasi terhubung ke kaki kiri; tekanan statis ke kaki kanan.",
          "Manometer height and pipe diameter use different scales. The left leg reads stagnation pressure; the right leg reads static pressure.",
        )}
      </p>
    </>
  );
}

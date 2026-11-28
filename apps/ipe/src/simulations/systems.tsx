import { useParamState } from "./context";
import { useState } from "react";
import type { Locale, VisualSpec } from "./types";
import { Button } from "@tutor/ui";
import { Formula } from "./math";
import { text, num } from "../lib/i18n";
import { pstr, pnum, parr, Svg, Metric } from "./common";
import { Plot } from "./plot";
export function SystemVisual({
  spec,
  locale,
}: {
  spec: VisualSpec;
  locale: Locale;
}) {
  const mode = pstr(spec, "mode", "chain");
  const [active, setActive] = useState(0),
    [gap, setGap] = useParamState("gap", 40),
    [input, setInput] = useParamState("input", pnum(spec, "input", 5000));
  if (mode === "inductive" || mode === "optical") {
    const on = gap < 45,
      optical = mode === "optical";
    const targetX = optical ? 282 : 160 + gap * 2.4,
      targetY = optical ? 70 + gap * 0.6 : 49;
    return (
      <>
        <Svg
          label={text(locale, "Detektor dan target", "Detector and target")}
          viewBox="0 0 500 220"
        >
          <rect
            x="35"
            y="65"
            width="100"
            height="64"
            rx="6"
            fill="var(--border)"
            stroke="var(--primary)"
          />
          {!optical ? (
            <>
              <path
                d="M55 82q8-15 16 0t16 0t16 0t16 0M55 110q8-15 16 0t16 0t16 0t16 0"
                stroke="var(--primary)"
                strokeWidth="3"
                fill="none"
              />
              {[25, 40, 55].map((r) => (
                <path
                  key={r}
                  d={`M145 ${97 - r}Q${145 + r * 1.4} 97 145 ${97 + r}`}
                  fill="none"
                  stroke="var(--primary)"
                  strokeDasharray="4 5"
                />
              ))}
            </>
          ) : (
            <>
              <path
                d={`M135 97H${on ? 282 : 430}`}
                stroke="var(--primary)"
                strokeWidth="3"
              />
              {on && (
                <path d="M310 97H430" stroke="var(--border)" strokeDasharray="5 5" />
              )}
              <rect
                x="430"
                y="65"
                width="45"
                height="64"
                rx="6"
                fill={on ? "var(--surface-subtle)" : "var(--border)"}
                stroke="var(--primary)"
              />
              <text x="445" y="155" textAnchor="middle" className="small-label">
                {text(locale, "Penerima", "Receiver")}
              </text>
            </>
          )}
          <rect
            x={targetX}
            y={targetY}
            width="28"
            height={optical ? 54 : 96}
            rx="3"
            fill="var(--muted-foreground)"
            stroke="var(--muted-foreground)"
          />
          <text x="86" y="155" textAnchor="middle">
            {optical
              ? text(locale, "Pemancar", "Emitter")
              : text(locale, "Kumparan", "Coil")}
          </text>
          <text x={targetX + 14} y="207" textAnchor="middle">
            {text(locale, "Target", "Target")}
          </text>
        </Svg>
        <div className="metrics">
          <Metric
            label={text(locale, "Keluaran saklar", "Switch output")}
            value={on ? "1" : "0"}
          />
          {optical && (
            <Metric
              label={text(locale, "Berkas cahaya", "Light beam")}
              value={
                on
                  ? text(locale, "Terhalang", "Blocked")
                  : text(locale, "Lolos", "Clear")
              }
            />
          )}
        </div>

        <p className="visual-note">
          {optical
            ? text(
                locale,
                "Skema pemancar dan penerima. Keluaran ilustratif bernilai 1 saat target memotong berkas. Persentase menyatakan posisi, bukan jarak terkalibrasi.",
                "Emitter and receiver schematic. Illustrative output is 1 when the target blocks the beam. Percentage is position, not a calibrated distance.",
              )
            : text(
                locale,
                "Ilustrasi ambang saklar pada 45% rentang. Bukan kalibrasi jarak sensor nyata.",
                "Illustrative switch threshold at 45% of the range. Not a real sensor distance calibration.",
              )}
        </p>
      </>
    );
  }
  if (mode === "uncertainty") {
    const gains = parr(spec, "gains", [0.0001, 0.04, 1000, 225]);
    const out = input * gains.reduce((s, g) => s * g, 1);
    return (
      <>
        <Svg
          label={text(
            locale,
            "Rantai penguatan dan keluaran",
            "Gain chain and output",
          )}
          viewBox="0 0 500 150"
        >
          {gains.map((g, i) => (
            <g key={i}>
              <rect
                x={16 + i * 124}
                y="45"
                width="95"
                height="58"
                rx="3"
                fill="var(--surface-subtle)"
                stroke="var(--primary)"
              />
              <text x={63 + i * 124} y="69" textAnchor="middle">
                {i + 1}
              </text>
              <text x={63 + i * 124} y="88" textAnchor="middle">
                × {g}
              </text>
              {i < 3 && (
                <path
                  d={`M${114 + i * 124} 74h23`}
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-green)"
                />
              )}
            </g>
          ))}
        </Svg>

        <div className="metrics">
          <Metric
            label={text(locale, "Bacaan", "Reading")}
            value={num(out, locale, 1)}
            unit="Pa"
          />
          <Metric
            label={text(locale, "Bias", "Bias")}
            value={num(out - input, locale, 1)}
            unit="Pa"
          />
        </div>
        <Formula>{String.raw`\bar e=p_{\mathrm{baca}}-p_{\mathrm{benar}}`}</Formula>
        <p className="visual-note">
          {text(
            locale,
            "Penguatan nominal per tahap mengikuti soal. Bias sistematis berbeda dari simpangan baku galat acak.",
            "Stage gains follow the question. Systematic bias differs from the standard deviation of random error.",
          )}
        </p>
      </>
    );
  }
  const labels = [
    text(locale, "Sensor", "Sensor"),
    text(locale, "Pengondisi", "Conditioning"),
    text(locale, "Pengolah", "Processing"),
    text(locale, "Penyaji", "Display"),
  ];
  const examples = [
    text(
      locale,
      "RTD, strain gauge, LVDT, encoder: ubah besaran fisik menjadi sinyal.",
      "RTD, strain gauge, LVDT, encoder: turn a physical quantity into a signal.",
    ),
    text(
      locale,
      "Jembatan Wheatstone, penguat, filter: sesuaikan bentuk dan skala sinyal.",
      "Wheatstone bridge, amplifier, filter: adapt signal form and scale.",
    ),
    text(
      locale,
      "ADC dan hitungan digital: ubah atau olah data untuk memperoleh hasil ukur.",
      "ADC and digital calculations: convert or process data into a measurement.",
    ),
    text(
      locale,
      "Layar dan perekam: tampilkan atau simpan hasil ukur.",
      "Display and recorder: show or store the measured result.",
    ),
  ];
  return (
    <>
      <div className="system-blocks">
        {labels.map((label, i) => (
          <Button
            key={label}
            variant="ghost"
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
          >
            <span>{i + 1}</span>
            {label}
          </Button>
        ))}
      </div>
      <Svg
        label={text(
          locale,
          "Urutan fungsi sistem ukur",
          "Measurement system function sequence",
        )}
        viewBox="0 0 500 150"
      >
        <path
          d="M40 72H460"
          stroke="var(--primary)"
          strokeWidth="1.5"
          markerEnd="url(#arrow-green)"
        />
        {labels.map((label, i) => (
          <g key={i}>
            <circle
              cx={60 + i * 125}
              cy="72"
              r={active === i ? 25 : 20}
              fill={active === i ? "var(--primary)" : "var(--surface-subtle)"}
              stroke="var(--primary)"
            />
            <text
              x={60 + i * 125}
              y="78"
              textAnchor="middle"
              style={{ fill: active === i ? "var(--surface-subtle)" : "var(--primary)" }}
            >
              {i + 1}
            </text>
            <text
              x={60 + i * 125}
              y="119"
              textAnchor="middle"
              className="small-label"
            >
              {label}
            </text>
          </g>
        ))}
      </Svg>
      <p className="system-description">{examples[active]}</p>
    </>
  );
}
export function SignalVisual({
  spec,
  locale,
}: {
  spec: VisualSpec;
  locale: Locale;
}) {
  const [f, setF] = useParamState("frequency", pnum(spec, "frequency", 2));
  const points = Array.from({ length: 201 }, (_, i) => [
    i / 100,
    Math.sin((2 * Math.PI * f * i) / 100),
  ]);
  return (
    <>
      <Plot
        locale={locale}
        series={[{ name: text(locale, "Sinyal", "Signal"), data: points }]}
        xLabel="t (s)"
        yLabel="V"
        xMin={0}
        xMax={2}
        yMin={-1.2}
        yMax={1.2}
      />

      <Formula>{String.raw`v(t)=\sin(2\pi ft)\ \mathrm V`}</Formula>
      <p className="visual-note">
        {text(
          locale,
          "Contoh sinyal sinus, amplitudo 1 V. Grafik memperlihatkan seluruh rekaman, bukan animasi waktu.",
          "Example sine wave with 1 V amplitude. The plot shows a complete record, not a time animation.",
        )}
      </p>
    </>
  );
}

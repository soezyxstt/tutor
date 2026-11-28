import { resolveColor, useThemeRevision } from "./theme";
import { useRef, useEffect } from "react";
import * as echarts from "echarts/core";
import { LineChart, ScatterChart, BarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  MarkLineComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import type { Locale } from "./types";
echarts.use([
  LineChart,
  ScatterChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  MarkLineComponent,
  SVGRenderer,
]);
export type Series = {
  name: string;
  data: number[][];
  color?: string;
  dashed?: boolean;
  type?: "line" | "scatter" | "bar";
};
export function Plot({
  series,
  xLabel,
  yLabel,
  height = 200,
  xMin,
  xMax,
  yMin,
  yMax,
  locale,
}: {
  series: Series[];
  xLabel: string;
  yLabel: string;
  height?: number;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  locale: Locale;
}) {
  const revision = useThemeRevision();
  const ref = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.EChartsType | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    chart.current = echarts.init(ref.current, undefined, { renderer: "svg" });
    const resize = new ResizeObserver(() => chart.current?.resize());
    resize.observe(ref.current);
    return () => {
      resize.disconnect();
      chart.current?.dispose();
      chart.current = null;
    };
  }, []);
  useEffect(() => {
    chart.current?.setOption(
      {
        animation: false,
        textStyle: { fontFamily: getComputedStyle(document.documentElement).getPropertyValue("--font-sans"), fontSize: 12, color: resolveColor("var(--foreground)") },
        grid: { left: 44, right: 20, top: 26, bottom: 36 },
        tooltip: {
          trigger: "axis",
          confine: true,
          valueFormatter: (v: number) =>
            new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", {
              maximumFractionDigits: 4,
            }).format(v),
        },
        xAxis: {
          type: "value",
          name: xLabel,
          nameLocation: "middle",
          nameGap: 24,
          min: xMin,
          max: xMax,
          axisLine: { show: true, lineStyle: { color: resolveColor("var(--border)") } },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: resolveColor("var(--border)") } },
          axisLabel: { color: resolveColor("var(--muted-foreground)"), hideOverlap: true },
        },
        yAxis: {
          type: "value",
          name: yLabel,
          nameGap: 12,
          min: yMin,
          max: yMax,
          splitNumber: 4,
          axisLine: { show: false },
          axisLabel: { color: resolveColor("var(--muted-foreground)"), hideOverlap: true },
          splitLine: { lineStyle: { color: resolveColor("var(--border)") } },
        },
        series: series.map((s, i) => ({
          name: s.name,
          type: s.type ?? "line",
          data: s.data.map(point => point.map(value => Number.isFinite(value) ? value : null)),
          showSymbol: s.type === "scatter",
          symbolSize: 7,
          lineStyle: {
            width: 2,
            color: resolveColor(s.color ?? ["var(--primary)", "var(--muted-foreground)", "var(--warning)"][i % 3]),
            type: s.dashed ? "dashed" : "solid",
          },
          itemStyle: {
            color: resolveColor(s.color ?? ["var(--primary)", "var(--muted-foreground)", "var(--warning)"][i % 3]),
          },
          emphasis: { disabled: true },
        })),
      },
      { notMerge: true },
    );
  }, [series, xLabel, yLabel, xMin, xMax, yMin, yMax, locale, revision]);
  return (
    <div
      ref={ref}
      style={{ height, width: "100%" }}
      role="img"
      aria-label={`${yLabel} / ${xLabel}. ${series.map((s) => s.name).join(", ")}`}
    />
  );
}

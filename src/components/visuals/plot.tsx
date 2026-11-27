import { lazy, Suspense, type ComponentProps } from "react";
import { text } from "@/lib/i18n";
export type { Series } from "./plot-core";
const PlotCore = lazy(() =>
  import("./plot-core").then((m) => ({ default: m.Plot })),
);
type Props = ComponentProps<typeof PlotCore>;
export function Plot(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="visual-loading" style={{ height: props.height ?? 200 }}>
          {text(props.locale, "Memuat grafik…", "Loading plot…")}
        </div>
      }
    >
      <PlotCore {...props} />
    </Suspense>
  );
}

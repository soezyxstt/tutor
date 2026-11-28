import { Component, Suspense, useState, type ReactNode } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import type { Locale, VisualSpec } from "@/content/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconButton } from "@/components/controls";
import { text } from "@/lib/i18n";
import { RichText } from "@/components/math";
import { FlowVisual, PitotVisual } from "./flow";
import {
  ThermocoupleVisual,
  RtdVisual,
  BridgeVisual,
  CalibrationVisual,
  StatisticsVisual,
} from "./temperature";
import {
  PositionVisual,
  CapacitiveVisual,
  UltrasonicVisual,
  StrainVisual,
  DopplerVisual,
} from "./position";
import {
  DynamicsVisual,
  AccelerometerVisual,
  VibrometerVisual,
} from "./dynamics";
import { SystemVisual, SignalVisual } from "./systems";
import {
  FeedbackVisual,
  FrequencyVisual,
  HysteresisVisual,
  LowPassVisual,
  ThermalCycleVisual,
  ThermistorVisual,
  UncertaintyVisual,
} from "./measurement";
class VisualBoundary extends Component<
  { children: ReactNode; locale: Locale; dimension: string },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidUpdate(prev: { dimension: string }) {
    if (prev.dimension !== this.props.dimension && this.state.error)
      this.setState({ error: false });
  }
  render() {
    if (this.state.error)
      return (
        <div className="visual-error">
          <p>
            {text(
              this.props.locale,
              "Visual tidak dapat dimuat. Pembahasan tetap bisa dibaca. Coba atur ulang visual atau gunakan tampilan 2D.",
              "The visual could not load. The solution remains available. Reset the visual or use the 2D view.",
            )}
          </p>
        </div>
      );
    return this.props.children;
  }
}
function Renderer({
  spec,
  locale,
  dimension,
}: {
  spec: VisualSpec;
  locale: Locale;
  dimension: string;
}) {
  const props = { spec, locale, dimension };
  switch (spec.kind) {
    case "frequency":
      return <FrequencyVisual {...props} />;
    case "thermistor":
      return <ThermistorVisual {...props} />;
    case "thermal-cycle":
      return <ThermalCycleVisual {...props} />;
    case "uncertainty":
      return <UncertaintyVisual {...props} />;
    case "hysteresis":
      return <HysteresisVisual {...props} />;
    case "feedback":
      return <FeedbackVisual {...props} />;
    case "lowpass":
      return <LowPassVisual {...props} />;
    case "orifice":
    case "venturi":
      return <FlowVisual {...props} />;
    case "pitot":
      return <PitotVisual {...props} />;
    case "thermocouple":
      return <ThermocoupleVisual {...props} />;
    case "rtd":
      return <RtdVisual {...props} />;
    case "bridge":
      return <BridgeVisual {...props} />;
    case "calibration":
      return <CalibrationVisual {...props} />;
    case "statistics":
      return <StatisticsVisual {...props} />;
    case "encoder":
    case "resolver":
    case "lvdt":
    case "potentiometer":
      return <PositionVisual {...props} />;
    case "capacitive":
      return <CapacitiveVisual {...props} />;
    case "ultrasonic":
      return <UltrasonicVisual {...props} />;
    case "strain":
      return <StrainVisual {...props} />;
    case "doppler":
      return <DopplerVisual {...props} />;
    case "dynamics":
      return <DynamicsVisual {...props} />;
    case "accelerometer":
      return <AccelerometerVisual {...props} />;
    case "vibrometer":
      return <VibrometerVisual {...props} />;
    case "system":
      return <SystemVisual {...props} />;
    case "signal":
      return <SignalVisual {...props} />;
    default:
      return null;
  }
}
export function Visual({ spec, locale }: { spec: VisualSpec; locale: Locale }) {
  const [dimension, setDimension] = useState("2d"),
    [reset, setReset] = useState(0);
  const supports3d = [
    "orifice",
    "venturi",
    "encoder",
    "resolver",
    "lvdt",
  ].includes(spec.kind);
  if (spec.kind === "none") return null;
  return (
    <section className="visual-widget">
      <div className="visual-toolbar">
        <span>
          <SlidersHorizontal size={12} />
          {text(locale, "Coba & amati", "Explore & observe")}
        </span>
        <div>
          {supports3d && (
            <Tabs value={dimension} onValueChange={setDimension}>
              <TabsList
                variant="line"
                aria-label={text(locale, "Dimensi visual", "Visual dimension")}
              >
                <TabsTrigger value="2d">2D</TabsTrigger>
                <TabsTrigger value="3d">3D</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          <IconButton
            label={text(locale, "Atur ulang visual", "Reset visual")}
            onClick={() => {
              setReset((n) => n + 1);
              setDimension("2d");
            }}
          >
            <RotateCcw />
          </IconButton>
        </div>
      </div>
      <div className="visual-body">
        <VisualBoundary key={reset} locale={locale} dimension={dimension}>
          <Suspense
            fallback={
              <div className="visual-loading">
                {text(locale, "Memuat visual…", "Loading visual…")}
              </div>
            }
          >
            <Renderer spec={spec} locale={locale} dimension={dimension} />
          </Suspense>
        </VisualBoundary>
      </div>
      <RichText className="visual-caption">{spec.caption[locale]}</RichText>
    </section>
  );
}

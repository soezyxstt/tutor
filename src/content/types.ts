export type Locale = "id" | "en";
export type Localized = { id: string; en: string };
export type Topic =
  | "flow"
  | "temperature"
  | "strain"
  | "position"
  | "signal"
  | "calibration"
  | "systems"
  | "dynamics"
  | "statistics";
export interface ContentTable {
  headers: Localized[];
  rows: string[][];
}
export interface SolutionStep {
  title: Localized;
  body: Localized[];
  math?: string;
  note?: Localized;
  table?: ContentTable;
  visual?: VisualSpec;
}
export interface VisualSpec {
  kind:
    | "orifice"
    | "venturi"
    | "pitot"
    | "ultrasonic"
    | "thermocouple"
    | "strain"
    | "bridge"
    | "encoder"
    | "resolver"
    | "lvdt"
    | "capacitive"
    | "doppler"
    | "vibrometer"
    | "accelerometer"
    | "statistics"
    | "calibration"
    | "signal"
    | "system"
    | "dynamics"
    | "potentiometer"
    | "rtd"
    | "none";
  params?: Record<string, number | string | number[]>;
  caption: Localized;
}
export interface ExamQuestion {
  id: string;
  year: number;
  exam: "uts2" | "uas";
  number: number;
  title: Localized;
  topic: Topic;
  source: { url: string; file: string; pages: number[] };
  original: string;
  originalLanguage: Locale;
  prompt: Localized;
  givens?: { label: Localized; value: string }[];
  steps: SolutionStep[];
  answer: Localized;
  answerMath?: string;
  assumptions?: Localized[];
  visual: VisualSpec;
  visuals?: VisualSpec[];
  referencePages?: number[];
}
export interface PracticeQuestion {
  id: string;
  topic: Topic;
  difficulty: "foundation" | "applied" | "reasoning";
  prompt: Localized;
  options: Localized[];
  correctIndex: number;
  explanation: Localized;
  math?: string;
  sourceQuestionId?: string;
}

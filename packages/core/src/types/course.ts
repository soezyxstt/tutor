import type { Locale } from '../i18n/language';

export type DifficultyLevel = 'dasar' | 'menengah' | 'lanjut';

export type LessonKind = 'material' | 'practice' | 'problem';

export interface SimulationParamDef {
  key: string;
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface SimulationSpec {
  id: string;
  type: 'damped-oscillator' | string;
  title: string;
  caption?: string;
  params: SimulationParamDef[];
  /** Fixed source settings (modes, sample arrays, geometry), never translated or AI-edited. */
  data?: Record<string, string | number | number[]>;
}

export interface StepCheckpoint {
  prompt: string;
  options: {
    id: string;
    label: string;
    feedback?: string;
    misconceptionTag?: string;
  }[];
  correctOptionId: string;
}

export interface StepRationale {
  whyThisMethod: string;
  whyNotAlternative?: string;
  commonPitfall?: string;
}

export interface SolutionStep {
  id: string;
  title: string;
  summary?: string;
  content: string;
  hint?: string;
  /** Optional 1-click self-explanation check before/alongside the step */
  checkpoint?: StepCheckpoint;
  /** Optional collapsible "Kenapa cara ini?" drawer separating What from Why */
  rationale?: StepRationale;
  /** A visual tied to this step, using the same shared controls and AI parameter state. */
  simulation?: SimulationSpec;
}

export interface MaterialDerivation {
  id: string;
  title: string;
  content: string;
}

export interface ExamHook {
  prompt: string;
  targetOutcome: string;
}

export interface MicroTheoryUnit {
  id: string;
  title: string;
  intuition: string;
  formal: string;
  validityBounds?: string;
  decisionCheck?: PracticeQuestion;
}

export interface MaterialItem {
  id: string;
  kind: 'material';
  slug: string;
  title: string;
  estimatedMinutes?: number;
  tags?: string[];
  /** Phase 1: Problem-first exam hook framing why the theory matters */
  examHook?: ExamHook;
  body: string;
  /** Phase 2: Chunked micro-theory units (<= 180 words) with analytical decision checks */
  microUnits?: MicroTheoryUnit[];
  keyFormula?: {
    label: string;
    latex: string;
    note?: string;
  };
  derivations?: MaterialDerivation[];
  checkpoints?: string[];
  simulation?: SimulationSpec;
}

export interface PracticeOption {
  id: string;
  label: string;
  /** Optional targeted feedback when student picks this specific option */
  feedback?: string;
  /** Optional misconception identifier for analytical distractors */
  misconceptionTag?: string;
}

export interface PracticeQuestion {
  id: string;
  relatedProblemId?: string;
  prompt: string;
  options: PracticeOption[];
  correctOptionId: string;
  hint?: string;
  explanation: string;
}

export interface GuidedPracticeTask {
  id: string;
  mode: 'spot-the-error' | 'complete-the-bridge';
  title: string;
  prompt: string;
  /** Flawed solution or partial skeleton */
  workSample: string;
  question: PracticeQuestion;
}

export interface RubricCriterion {
  id: string;
  label: string;
  weight: number; // Must sum to 100 across criteria
  fullCredit: string;
  commonPartialError?: string;
}

export interface EssayPracticeTask {
  id: string;
  title: string;
  prompt: string;
  /** Guided thinking blocks (e.g. ['Asumsi & Model', 'Strategi', 'Eksekusi', 'Kesimpulan']) */
  sections?: string[];
  /** Exact 3-tier progressive hints: [konsep, langkah pembuka, kerangka alur] */
  hints: [string, string, string];
  rubric: RubricCriterion[];
  verifiedOutline: string;
}

export interface PracticeItem {
  id: string;
  kind: 'practice';
  slug: string;
  title: string;
  difficulty: DifficultyLevel;
  estimatedMinutes?: number;
  tags?: string[];
  intro?: string;
  /** Tier 1: Analytical Micro-MCQ */
  questions: PracticeQuestion[];
  /** Tier 2: Guided / Partial Essay (Spot-the-Error, Complete-the-Bridge) */
  guidedTasks?: GuidedPracticeTask[];
  /** Tier 3: Full Exam Essay with 3-tier hints & 100%-weight rubric */
  essayTasks?: EssayPracticeTask[];
  simulation?: SimulationSpec;
}

export interface ExamRef {
  term: string; // e.g. 'UTS', 'UTS 1', 'UAS', 'Kuis 1'
  year: number;
  number?: number;
}

export interface ProblemItem {
  id: string;
  kind: 'problem';
  slug: string;
  title: string;
  source?: string;
  /** Verbatim evidence remains in its original language when the lesson is translated. */
  sourceDetails?: {
    url: string;
    file: string;
    pages: number[];
    original: string;
    originalLanguage: Locale;
    /** Prefer plural references when a solution draws on several course sources. */
    references?: Array<{ url: string; title: string; pages: number[] }>;
    /** Compatibility with courses authored before multiple references were supported. */
    reference?: { url: string; title: string; pages?: number[] };
  };
  /** Source-grounded explanations, translated with the rest of the lesson. */
  sourceNotes?: string[];
  assumptions?: string[];
  exam?: ExamRef;
  difficulty: DifficultyLevel;
  estimatedMinutes?: number;
  tags?: string[];
  statement: string;
  given?: string[];
  asked?: string;
  simulation?: SimulationSpec;
  /** Additional source visuals, in reading order. */
  simulations?: SimulationSpec[];
  steps: SolutionStep[];
  finalAnswer: string;
  takeaway?: string;
}

export type LessonItem = MaterialItem | PracticeItem | ProblemItem;

export interface CourseModule {
  id: string;
  code?: string;
  title: string;
  items: LessonItem[];
}

/** Translation overlays only replace display text; stable IDs, answer keys and physics stay in the source. */
type TranslationInvariant = 'id' | 'key' | 'slug' | 'kind' | 'type' | 'mode' | 'code' | 'domain' | 'difficulty' | 'correctOptionId' | 'misconceptionTag' | 'latex' | 'unit' | 'data' | 'sourceDetails' | 'relatedProblemId';
export type TextTranslation<T> = T extends string ? string
  : T extends readonly (infer E)[] ? E extends string ? string[]
    : Array<TextTranslation<E> & (E extends { id: string } ? { id: string } : E extends { key: string } ? { key: string } : unknown)>
  : T extends object ? { [K in keyof T as K extends TranslationInvariant ? never : K]?: TextTranslation<T[K]> }
  : never;

export type LessonTranslation = TextTranslation<LessonItem>;

export interface CourseTranslation {
  title?: string;
  subtitle?: string;
  semester?: string;
  /** Key modules and lessons by source IDs, never by translated titles or array positions. */
  modules?: Record<string, {
    title?: string;
    items?: Record<string, LessonTranslation>;
  }>;
}

export interface CourseConfig {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  domain: string;
  semester?: string;
  enableShowcase?: boolean;
  sourceLanguage?: Locale;
  translations?: Partial<Record<Locale, CourseTranslation>>;
  catalog?: { listed?: boolean; status?: 'published' | 'draft' | 'showcase'; order?: number };
  modules: CourseModule[];
}

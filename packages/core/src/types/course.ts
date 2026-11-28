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
}

export interface SolutionStep {
  id: string;
  title: string;
  summary?: string;
  content: string;
  hint?: string;
}

export interface MaterialDerivation {
  id: string;
  title: string;
  content: string;
}

export interface MaterialItem {
  id: string;
  kind: 'material';
  slug: string;
  title: string;
  estimatedMinutes?: number;
  tags?: string[];
  body: string;
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
}

export interface PracticeQuestion {
  id: string;
  prompt: string;
  options: PracticeOption[];
  correctOptionId: string;
  hint?: string;
  explanation: string;
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
  questions: PracticeQuestion[];
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
  exam?: ExamRef;
  difficulty: DifficultyLevel;
  estimatedMinutes?: number;
  tags?: string[];
  statement: string;
  given?: string[];
  asked?: string;
  simulation?: SimulationSpec;
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

export interface CourseConfig {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  domain: string;
  semester?: string;
  enableShowcase?: boolean;
  modules: CourseModule[];
}

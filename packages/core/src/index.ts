export type {
  CourseConfig,
  CourseTranslation,
  LessonTranslation,
  TextTranslation,
  CourseModule,
  DifficultyLevel,
  EssayPracticeTask,
  ExamHook,
  ExamRef,
  GuidedPracticeTask,
  LessonItem,
  LessonKind,
  MaterialDerivation,
  MaterialItem,
  MicroTheoryUnit,
  PracticeItem,
  PracticeOption,
  PracticeQuestion,
  ProblemItem,
  RubricCriterion,
  SimulationParamDef,
  SimulationSpec,
  SolutionStep,
  StepCheckpoint,
  StepRationale,
} from './types/course';

export {
  useTutorStore,
  type InlineAiAnchorState,
  type ReadingFontSize,
} from './store/tutor-store';

export { TutorApp } from './app/tutor-app';
export { TutorShell } from './layout/tutor-shell';
export {
  TutorSidebarContent,
  type SidebarFilter,
  type SidebarGroupMode,
} from './layout/tutor-sidebar';
export { TutorTopbar } from './layout/tutor-topbar';
export { QuickSearchDialog } from './layout/quick-search-dialog';

export { MathMarkdown } from './content/math-markdown';
export { MathExpression } from './content/math-expression';
export { Callout, type CalloutTone } from './content/callout';
export { StepDisclosure } from './content/step-disclosure';
export { ProblemView } from './content/problem-view';
export { MaterialView } from './content/material-view';
export { PracticeView } from './content/practice-view';

export { SimulationStage } from './simulation/simulation-stage';
export {
  registerSimulation,
  getSimulationComponent,
} from './simulation/simulation-registry';
export type { SimulationRendererProps } from './simulation/damped-oscillator-sim';

export { InlineAiThread } from './ai/inline-ai-thread';
export { SelectionAiPopover } from './ai/selection-ai-popover';
export {
  updateSimulationParamsSchema,
  revealSolutionStepSchema,
  showFormulaBreakdownSchema,
  showStepDerivationSchema,
  showComparisonTableSchema,
  showQuickQuizSchema,
  showPitfallWarningSchema,
  renderInteractivePlotSchema,
  renderInteractive3DSchema,
  type AiUiToolInvocation,
  type UpdateSimulationParamsInput,
  type RevealSolutionStepInput,
  type ShowFormulaBreakdownInput,
  type ShowStepDerivationInput,
  type ShowComparisonTableInput,
  type ShowQuickQuizInput,
  type ShowPitfallWarningInput,
  type RenderInteractivePlotInput,
  type RenderInteractive3DInput,
} from './ai/ui-sdk/tools';
export { AiToolInvocationView } from './ai/ui-sdk/tool-renderers';

export { CoreShowcaseView } from './showcase/core-showcase-view';
export * from './i18n';
export { CatalogShell } from './catalog/catalog-shell';

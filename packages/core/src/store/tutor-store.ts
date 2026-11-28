import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ReadingFontSize = 'sm' | 'md' | 'lg';

export interface InlineAiAnchorState {
  open: boolean;
  quotedText?: string;
  draftPrompt?: string;
}

interface TutorState {
  completedIds: Record<string, boolean>;
  bookmarkedIds: Record<string, boolean>;
  checkedPoints: Record<string, boolean>;
  practiceAnswers: Record<string, string>;
  essayDrafts: Record<string, Record<string, string>>;
  revealedSteps: Record<string, number[]>;
  stepRequests: Record<string, { index: number }>;
  simParams: Record<string, Record<string, number>>;
  sidebarCollapsed: boolean;
  fontSize: ReadingFontSize;
  focusMode: boolean;
  autoShowHints: boolean;
  inlineThreads: Record<string, InlineAiAnchorState>;

  toggleComplete: (itemKey: string) => void;
  toggleBookmark: (itemKey: string) => void;
  toggleCheckpoint: (pointKey: string) => void;
  setPracticeAnswer: (questionKey: string, optionId: string) => void;
  resetPracticeAnswers: (prefix: string) => void;
  setEssayDraft: (taskKey: string, section: string, value: string) => void;

  toggleStep: (itemKey: string, stepIndex: number) => void;
  revealStep: (itemKey: string, stepIndex: number) => void;
  revealNextStep: (itemKey: string, totalSteps: number) => void;
  revealAllSteps: (itemKey: string, totalSteps: number) => void;
  hideAllSteps: (itemKey: string) => void;

  setSimParam: (simKey: string, paramKey: string, value: number) => void;
  updateSimParams: (simKey: string, patch: Record<string, number>) => void;
  resetSimParams: (simKey: string, defaults: Record<string, number>) => void;

  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setFontSize: (size: ReadingFontSize) => void;
  setFocusMode: (focus: boolean) => void;
  setAutoShowHints: (auto: boolean) => void;

  openInlineAi: (
    anchorId: string,
    options?: { quotedText?: string; draftPrompt?: string }
  ) => void;
  closeInlineAi: (anchorId: string) => void;
  clearInlineDraft: (anchorId: string) => void;
}

export const useTutorStore = create<TutorState>()(
  persist(
    (set) => ({
      completedIds: {},
      bookmarkedIds: {},
      checkedPoints: {},
      practiceAnswers: {},
      essayDrafts: {},
      revealedSteps: {},
      stepRequests: {},
      simParams: {},
      sidebarCollapsed: false,
      fontSize: 'md',
      focusMode: false,
      autoShowHints: false,
      inlineThreads: {},

      toggleComplete: (itemKey) =>
        set((state) => ({
          completedIds: {
            ...state.completedIds,
            [itemKey]: !state.completedIds[itemKey],
          },
        })),

      toggleBookmark: (itemKey) =>
        set((state) => ({
          bookmarkedIds: {
            ...state.bookmarkedIds,
            [itemKey]: !state.bookmarkedIds[itemKey],
          },
        })),

      toggleCheckpoint: (pointKey) =>
        set((state) => ({
          checkedPoints: {
            ...state.checkedPoints,
            [pointKey]: !state.checkedPoints[pointKey],
          },
        })),

      setPracticeAnswer: (questionKey, optionId) =>
        set((state) => ({
          practiceAnswers: {
            ...state.practiceAnswers,
            [questionKey]: optionId,
          },
        })),

      resetPracticeAnswers: (prefix) =>
        set((state) => {
          const next = { ...state.practiceAnswers };
          const drafts = { ...state.essayDrafts };
          for (const key of Object.keys(next)) {
            if (key.startsWith(prefix)) delete next[key];
          }
          for (const key of Object.keys(drafts)) {
            if (key.startsWith(prefix)) delete drafts[key];
          }
          return { practiceAnswers: next, essayDrafts: drafts };
        }),

      setEssayDraft: (taskKey, section, value) =>
        set((state) => ({ essayDrafts: {
          ...state.essayDrafts,
          [taskKey]: { ...state.essayDrafts[taskKey], [section]: value },
        } })),

      toggleStep: (itemKey, stepIndex) =>
        set((state) => {
          const current = state.revealedSteps[itemKey] ?? [0];
          const exists = current.includes(stepIndex);
          const next = exists
            ? current.filter((i) => i !== stepIndex)
            : [...current, stepIndex].sort((a, b) => a - b);
          return {
            revealedSteps: {
              ...state.revealedSteps,
              [itemKey]: next,
            },
          };
        }),

      revealStep: (itemKey, stepIndex) =>
        set((state) => {
          const current = state.revealedSteps[itemKey] ?? [0];
          return {
            stepRequests: { ...state.stepRequests, [itemKey]: { index: stepIndex } },
            revealedSteps: {
              ...state.revealedSteps,
              [itemKey]: current.includes(stepIndex) ? current : [...current, stepIndex].sort((a, b) => a - b),
            },
          };
        }),

      revealNextStep: (itemKey, totalSteps) =>
        set((state) => {
          const current = state.revealedSteps[itemKey] ?? [0];
          for (let i = 0; i < totalSteps; i++) {
            if (!current.includes(i)) {
              return {
                revealedSteps: {
                  ...state.revealedSteps,
                  [itemKey]: [...current, i].sort((a, b) => a - b),
                },
              };
            }
          }
          return state;
        }),

      revealAllSteps: (itemKey, totalSteps) =>
        set((state) => ({
          revealedSteps: {
            ...state.revealedSteps,
            [itemKey]: Array.from({ length: totalSteps }, (_, i) => i),
          },
        })),

      hideAllSteps: (itemKey) =>
        set((state) => ({
          revealedSteps: {
            ...state.revealedSteps,
            [itemKey]: [],
          },
        })),

      setSimParam: (simKey, paramKey, value) =>
        set((state) => ({
          simParams: {
            ...state.simParams,
            [simKey]: {
              ...(state.simParams[simKey] ?? {}),
              [paramKey]: value,
            },
          },
        })),

      updateSimParams: (simKey, patch) =>
        set((state) => ({
          simParams: {
            ...state.simParams,
            [simKey]: {
              ...(state.simParams[simKey] ?? {}),
              ...patch,
            },
          },
        })),

      resetSimParams: (simKey, defaults) =>
        set((state) => ({
          simParams: {
            ...state.simParams,
            [simKey]: { ...defaults },
          },
        })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setFontSize: (fontSize) => set({ fontSize }),
      setFocusMode: (focusMode) =>
        set((state) => ({
          focusMode,
          sidebarCollapsed: focusMode ? true : state.sidebarCollapsed,
        })),
      setAutoShowHints: (autoShowHints) => set({ autoShowHints }),

      openInlineAi: (anchorId, options) =>
        set((state) => ({
          inlineThreads: {
            ...state.inlineThreads,
            [anchorId]: {
              open: true,
              quotedText:
                options?.quotedText ?? state.inlineThreads[anchorId]?.quotedText,
              draftPrompt: options?.draftPrompt,
            },
          },
        })),

      closeInlineAi: (anchorId) =>
        set((state) => ({
          inlineThreads: {
            ...state.inlineThreads,
            [anchorId]: {
              ...(state.inlineThreads[anchorId] ?? { open: false }),
              open: false,
              draftPrompt: undefined,
            },
          },
        })),

      clearInlineDraft: (anchorId) =>
        set((state) => {
          const existing = state.inlineThreads[anchorId];
          if (!existing) return state;
          return {
            inlineThreads: {
              ...state.inlineThreads,
              [anchorId]: { ...existing, draftPrompt: undefined },
            },
          };
        }),
    }),
    {
      name: 'tutor-learning-state-v3',
      partialize: (state) => ({
        completedIds: state.completedIds,
        bookmarkedIds: state.bookmarkedIds,
        checkedPoints: state.checkedPoints,
        practiceAnswers: state.practiceAnswers,
        essayDrafts: state.essayDrafts,
        revealedSteps: state.revealedSteps,
        sidebarCollapsed: state.sidebarCollapsed,
        fontSize: state.fontSize,
        focusMode: state.focusMode,
        autoShowHints: state.autoShowHints,
      }),
    }
  )
);

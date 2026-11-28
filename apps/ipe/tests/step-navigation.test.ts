import test from 'node:test';
import assert from 'node:assert/strict';

test('AI can request an already visited step repeatedly without persisting navigation commands', async () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage });
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { localStorage: storage } });
  try {
    // Initialize the real persisted store against disposable browser storage.
    const { useTutorStore } = await import('../../../packages/core/src/store/tutor-store');
    const key = 'ipe:2025-uts1-q1';
    const notifications: number[] = [];
    const unsubscribe = useTutorStore.subscribe((state, previous) => {
      if (state.stepRequests[key] !== previous.stepRequests[key]) notifications.push(state.stepRequests[key].index);
    });
    try {
      useTutorStore.getState().revealStep(key, 2);
      const first = useTutorStore.getState().stepRequests[key];
      useTutorStore.getState().revealStep(key, 2);
      assert.notEqual(useTutorStore.getState().stepRequests[key], first, 'A repeated AI request must still notify the step reader');
      useTutorStore.getState().revealStep(key, 0);
      assert.deepEqual(notifications, [2, 2, 0], 'AI can return to a previously visited earlier step');
      assert.deepEqual(useTutorStore.getState().revealedSteps[key], [0, 2], 'Navigation does not erase learning history or duplicate visited steps');
      const persisted = JSON.parse(values.get('tutor-learning-state-v3')!);
      assert.deepEqual(persisted.state.revealedSteps[key], [0, 2]);
      assert.equal(Object.hasOwn(persisted.state, 'stepRequests'), false, 'Do not replay an AI navigation command after reloading');
    } finally { unsubscribe(); }
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else Reflect.deleteProperty(globalThis, 'localStorage');
    if (windowDescriptor) Object.defineProperty(globalThis, 'window', windowDescriptor);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { createTimePositionSync } from '../src/simulations/time-position';
import { learningContext } from '../../../packages/core/src/ai/learning-context';
import { course } from '../src/content/course';

test('clock telemetry updates the shared slider and AI context without becoming a seek command', async () => {
  const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const storage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { localStorage: storage } });
  try {
    const { useTutorStore } = await import('../../../packages/core/src/store/tutor-store');
    const problem = course.modules.flatMap(module => module.items).find(item => item.id === '2023-uts1-q4');
    assert.ok(problem?.kind === 'problem' && problem.simulation);
    const simulation = problem.simulation;
    const key = `ipe:${simulation.id}`;
    const sync = createTimePositionSync();
    const end = 42;
    const seeks: number[] = [];
    const unsubscribe = useTutorStore.subscribe(state => {
      const target = sync.receive(state.simParams[key]?.time, end);
      if (target !== undefined) seeks.push(target);
    });
    try {
      // Replay a complete 10 Hz run through the real shared store. Any echo
      // interpreted as a command would pause the hook on its first tick.
      for (let tick = 1; tick <= 420; tick++) {
        sync.publish(tick / 10, end, position => useTutorStore.getState().setSimParam(key, 'time', position));
        if (tick === 218) {
          assert.ok(Math.abs(useTutorStore.getState().simParams[key].time - 21.8 / 42 * 100) < 1e-10);
          const context = learningContext(undefined, undefined, simulation, useTutorStore.getState().simParams[key]);
          const current = JSON.parse(context!).parameters.find((parameter: { key: string }) => parameter.key === 'time');
          assert.equal(current.value, useTutorStore.getState().simParams[key].time, 'AI must receive the displayed time position');
        }
      }
      assert.equal(useTutorStore.getState().simParams[key].time, 100, 'Natural completion must reach the end of the slider');
      assert.deepEqual(seeks, [], 'Clock writes must never pause or seek their own playback');

      useTutorStore.getState().setSimParam(key, 'time', 0);
      useTutorStore.getState().updateSimParams(key, { time: 100 });
      useTutorStore.getState().updateSimParams(key, { time: 25 });
      assert.deepEqual(seeks, [0, 42, 10.5], 'Manual Home/End and AI seeks must still move the clock');

      sync.publish(0, end, position => useTutorStore.getState().setSimParam(key, 'time', position));
      assert.equal(useTutorStore.getState().simParams[key].time, 0, 'Reset/restart must return shared time to zero');
      assert.deepEqual(seeks, [0, 42, 10.5], 'Reset telemetry must not become another external seek');
      sync.publish(6, 12, position => useTutorStore.getState().setSimParam(key, 'time', position));
      assert.equal(useTutorStore.getState().simParams[key].time, 50, 'Changed model duration must use the current end time');

      sync.forget();
      const restored = sync.receive(useTutorStore.getState().simParams[key].time, 12);
      assert.equal(restored, 6, 'A remount must restore the saved shared cursor');
      sync.publish(restored!, 12, () => assert.fail('Restoring the saved cursor must not overwrite shared state'));
    } finally { unsubscribe(); }
  } finally {
    if (windowDescriptor) Object.defineProperty(globalThis, 'window', windowDescriptor);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});

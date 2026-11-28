import assert from 'node:assert/strict';
import test from 'node:test';
import { MessageChannel as NodeMessageChannel } from 'node:worker_threads';
import { JSDOM } from 'jsdom';

test('the tutor reads and drives only approved controls in its active lesson', async (t) => {
  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="app"></div></body></html>', {
    url: 'https://tutor.example', pretendToBeVisual: true,
  });
  const browser = dom.window;
  const channels = new Set<NodeMessageChannel>();
  class TestMessageChannel extends NodeMessageChannel {
    constructor() { super(); channels.add(this); }
  }
  Object.defineProperty(globalThis, 'MessageChannel', { value: TestMessageChannel, configurable: true });
  const scheduled = new Set<ReturnType<typeof setTimeout>>();
  const originalTimeout = globalThis.setTimeout;
  const originalInterval = globalThis.setInterval;
  globalThis.setTimeout = ((...args: Parameters<typeof setTimeout>) => {
    const timer = originalTimeout(...args);
    scheduled.add(timer);
    return timer;
  }) as typeof setTimeout;
  globalThis.setInterval = ((...args: Parameters<typeof setInterval>) => {
    const timer = originalInterval(...args);
    scheduled.add(timer);
    return timer;
  }) as typeof setInterval;
  t.after(() => {
    dom.window.close();
    for (const timer of scheduled) { clearTimeout(timer); clearInterval(timer); }
    for (const channel of channels) { channel.port1.close(); channel.port2.close(); }
    globalThis.setTimeout = originalTimeout;
    globalThis.setInterval = originalInterval;
  });
  for (const name of ['window', 'document', 'navigator', 'Node', 'NodeFilter', 'Element', 'ShadowRoot', 'MutationObserver', 'Event', 'EventTarget', 'CustomEvent', 'KeyboardEvent', 'MouseEvent', 'PointerEvent', 'DOMRect', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame', ...Object.getOwnPropertyNames(browser).filter((name) => /^(HTML|SVG).*Element$/.test(name))]) {
    const value = name === 'window' ? browser : browser[name as keyof typeof browser];
    Object.defineProperty(globalThis, name, { value: typeof value === 'function' && ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(name) ? value.bind(browser) : value, configurable: true, writable: true });
  }
  Object.assign(globalThis, {
    IS_REACT_ACT_ENVIRONMENT: true,
    __UI_SDK_STRICT__: true,
    ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
    CSS: { escape: (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '\\$&') },
  });
  Object.assign(browser.HTMLElement.prototype, { showPopover() {}, hidePopover() {} });
  Object.assign(browser.Element.prototype, {
    getAnimations: () => [],
    scrollIntoView() {},
    checkVisibility() { return true; },
    getClientRects: () => [new browser.DOMRect(0, 0, 300, 30)],
  });
  Object.assign(browser.document, { elementFromPoint: () => null, elementsFromPoint: () => [] });
  browser.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) as unknown as MediaQueryList;

  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { AgentButton, AgentSlider } = await import('../src/ai/agent-controls');
  const { initializeTutorAgent, runTutorAgentTool, tutorUiContext } = await import('../src/ai/agent-runtime');
  const host = browser.document.getElementById('app')!;
  const root = createRoot(host);
  let submittedAnswers = 0;
  let unsafePresses = 0;

  function Fixture() {
    const [damping, setDamping] = React.useState([0.2]);
    const [open, setOpen] = React.useState(false);
    return <>
      <section data-tutor-agent-scope="course:lesson-a">
        <AgentSlider aria-label="Damping" value={damping} min={0} max={1} step={0.1} onValueChange={setDamping} />
        <output aria-label="Damping readout">{damping[0]}</output>
        <AgentButton aria-expanded={open} onClick={() => setOpen(!open)}>Explain method</AgentButton>
        {open && <p>The method is open.</p>}
        <AgentButton disabled>Unavailable step</AgentButton>
        <AgentButton data-agent-confirm="Requires the student" onClick={() => { unsafePresses += 1; }}>Student action</AgentButton>
        <button onClick={() => { submittedAnswers += 1; }}>Submit quiz answer</button>
        <div data-agent-hidden><AgentButton>Hidden control</AgentButton></div>
      </section>
      <section data-tutor-agent-scope="course:lesson-b">
        <AgentSlider aria-label="Damping" defaultValue={[0.9]} min={0} max={1} />
        <AgentButton>Other lesson action</AgentButton>
      </section>
    </>;
  }

  initializeTutorAgent();
  try {
    await React.act(async () => { root.render(<Fixture />); });
  } catch (error) {
    await React.act(async () => { root.unmount(); });
    dom.window.close();
    throw error;
  }
  const snapshot = async () => await runTutorAgentTool('course:lesson-a', 'snapshot', {}) as Array<Record<string, any>>;
  const act = async (input: object, signal?: AbortSignal) => {
    let result: any;
    let done = false;
    const running = runTutorAgentTool('course:lesson-a', 'act', input, signal).then((value) => { result = value; done = true; });
    while (!done) await React.act(async () => { await new Promise((resolve) => setTimeout(resolve, 5)); });
    await running;
    return result;
  };

  try {
    await t.test('snapshot has named controls and current values, without quiz or another lesson', async () => {
      const entries = await snapshot();
      assert.deepEqual(entries.map((entry) => entry.label).sort(), ['Damping', 'Explain method', 'Student action', 'Unavailable step'].sort());
      assert.ok(entries.every((entry) => entry.label));
      assert.deepEqual(entries.find((entry) => entry.label === 'Damping')?.value, [0.2]);
      assert.equal(entries.find((entry) => entry.label === 'Explain method')?.expanded, false);
      const found = await runTutorAgentTool('course:lesson-a', 'query', { text: 'Other' });
      assert.deepEqual(found, []);
    });

    await t.test('agent changes the real controlled slider and reveals a section', async () => {
      const result = await act({ steps: [
        { ref: 'Damping', action: 'setValue', args: [[0.6]] },
        { ref: 'Explain method', action: 'press' },
      ] });
      assert.equal(result.ok, true, JSON.stringify(result));
      assert.equal(host.querySelector('output')?.textContent, '0.6');
      assert.equal(result.steps[1].current.expanded, true);
      assert.ok(host.textContent?.includes('The method is open.'));
      const other = await runTutorAgentTool('course:lesson-b', 'snapshot', {}) as any[];
      assert.deepEqual(other.find((entry) => entry.label === 'Damping')?.value, [0.9]);
    });

    await t.test('unknown, out of range, disabled, marked and cross-lesson actions fail', async () => {
      for (const step of [
        { ref: 'Damping', action: 'setValue', args: [[2]] },
        { ref: 'Damping', action: 'setValue', args: [['0.5']] },
        { ref: 'Damping', action: 'setValue', args: [[0.3, 0.8]] },
        { ref: 'Unavailable step', action: 'press' },
        { ref: 'Student action', action: 'press' },
        { ref: 'Other lesson action', action: 'press' },
        { ref: 'Submit quiz answer', action: 'press' },
        { ref: 'Hidden control', action: 'press' },
      ]) assert.equal((await act({ steps: [step] })).ok, false, JSON.stringify(step));
      assert.equal(host.querySelector('output')?.textContent, '0.6');
      assert.equal(submittedAnswers, 0);
      assert.equal(unsafePresses, 0);
    });

    await t.test('stopping a turn prevents mutations and invalid tool arguments return errors', async () => {
      const controller = new AbortController();
      controller.abort();
      assert.equal((await act({ steps: [{ ref: 'Damping', action: 'setValue', args: [[0.8]] }] }, controller.signal)).ok, false);
      assert.equal(host.querySelector('output')?.textContent, '0.6');
      assert.equal((await runTutorAgentTool('course:lesson-a', 'snapshot', { accidental: true }) as any).ok, false);
      assert.equal((await runTutorAgentTool('course:lesson-a', 'query', { closed: true }) as any).ok, false);
      assert.equal((await act({ steps: [] })).ok, false);
    });

    await t.test('snapshot reflects human interaction and context stays within budget', async () => {
      const button = Array.from(host.querySelectorAll('button')).find((node) => node.textContent === 'Explain method')!;
      await React.act(async () => { button.click(); });
      const state = JSON.parse(tutorUiContext('course:lesson-a'));
      assert.equal(state.components.find((entry: any) => entry.label === 'Explain method')?.expanded, false);
      assert.ok(JSON.stringify(state).length <= 10_000);
      assert.ok(!JSON.stringify(state).includes('Other lesson action'));
    });

    await t.test('one action can open a step and use a control that mounts afterward', async () => {
      function DeferredStep() {
        const [next, setNext] = React.useState(false);
        const [ready, setReady] = React.useState(false);
        const [explained, setExplained] = React.useState(false);
        React.useEffect(() => {
          if (!next) return;
          const timer = setTimeout(() => setReady(true), 80);
          return () => clearTimeout(timer);
        }, [next]);
        return <section data-tutor-agent-scope="course:lesson-a">
          {!next ? <AgentButton onClick={() => setNext(true)}>Open next step</AgentButton> : <div data-tutor-transition>
            {ready ? <AgentButton aria-expanded={explained} onClick={() => setExplained(true)}>Explain the next method</AgentButton> : <p>Loading next step</p>}
          </div>}
        </section>;
      }
      await React.act(async () => { root.render(<DeferredStep />); });
      const result = await act({ steps: [
        { ref: 'Open next step', action: 'press' },
        { ref: 'Explain the next method', action: 'press' },
      ] });
      assert.equal(result.ok, true, JSON.stringify(result));
      assert.equal(result.steps[1].current.expanded, true);
    });

    await t.test('a control found by query stays actionable beyond the SDK snapshot limit', async () => {
      let presses = 0;
      await React.act(async () => {
        root.render(<section data-tutor-agent-scope="course:lesson-a">
          {Array.from({ length: 110 }, (_, index) => <AgentButton key={`control-${index}`}>Control {index}</AgentButton>)}
          <AgentButton onClick={() => { presses += 1; }}>Late control</AgentButton>
        </section>);
      });
      const found = await runTutorAgentTool('course:lesson-a', 'query', { text: 'Late control' }) as any[];
      assert.equal(found.length, 1);
      assert.equal((await act({ steps: [{ ref: found[0].ref, action: 'press' }] })).ok, true);
      assert.equal(presses, 1);
    });
  } finally {
    await React.act(async () => { root.unmount(); });
    dom.window.close();
  }
});

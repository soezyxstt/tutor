import assert from 'node:assert/strict';
import test from 'node:test';
import { MessageChannel as NodeMessageChannel } from 'node:worker_threads';
import { JSDOM } from 'jsdom';

test('an open step tutor keeps its draft and DOM through step and reading-mode changes', async (t) => {
  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="app"></div></body></html>', {
    url: 'https://tutor.example/?lang=en', pretendToBeVisual: true,
  });
  const browser = dom.window;
  const channels = new Set<NodeMessageChannel>();
  class TestMessageChannel extends NodeMessageChannel {
    constructor() { super(); channels.add(this); }
  }
  Object.defineProperty(globalThis, 'MessageChannel', { value: TestMessageChannel, configurable: true });
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const originalTimeout = globalThis.setTimeout;
  const originalInterval = globalThis.setInterval;
  const originalFetch = globalThis.fetch;
  globalThis.setTimeout = ((...args: Parameters<typeof setTimeout>) => {
    const timer = originalTimeout(...args);
    timers.add(timer);
    return timer;
  }) as typeof setTimeout;
  globalThis.setInterval = ((...args: Parameters<typeof setInterval>) => {
    const timer = originalInterval(...args);
    timers.add(timer);
    return timer;
  }) as typeof setInterval;
  let requests = 0;
  globalThis.fetch = async () => { requests++; throw new Error('This test must not send a tutor request.'); };
  t.after(() => {
    dom.window.close();
    for (const timer of timers) { clearTimeout(timer); clearInterval(timer); }
    for (const channel of channels) { channel.port1.close(); channel.port2.close(); }
    globalThis.setTimeout = originalTimeout;
    globalThis.setInterval = originalInterval;
    globalThis.fetch = originalFetch;
  });
  for (const name of ['window', 'document', 'navigator', 'localStorage', 'Node', 'NodeFilter', 'Element', 'ShadowRoot', 'MutationObserver', 'Event', 'EventTarget', 'CustomEvent', 'KeyboardEvent', 'MouseEvent', 'PointerEvent', 'DOMRect', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame', ...Object.getOwnPropertyNames(browser).filter((name) => /^(HTML|SVG).*Element$/.test(name))]) {
    const value = name === 'window' ? browser : browser[name as keyof typeof browser];
    Object.defineProperty(globalThis, name, {
      value: typeof value === 'function' && ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(name) ? value.bind(browser) : value,
      configurable: true, writable: true,
    });
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
    getClientRects: () => [new browser.DOMRect(0, 0, 600, 40)],
  });
  Object.assign(browser.document, { elementFromPoint: () => null, elementsFromPoint: () => [] });
  browser.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }) as unknown as MediaQueryList;

  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { MotionConfig } = await import('motion/react');
  const { LanguageProvider } = await import('../src/i18n/language-provider');
  const { StepDisclosure } = await import('../src/content/step-disclosure');
  const { useTutorStore } = await import('../src/store/tutor-store');
  const host = browser.document.getElementById('app')!;
  const root = createRoot(host);
  const itemKey = 'course:lifecycle-problem';
  const firstAnchor = `${itemKey}:step:identify`;
  const steps = [
    { id: 'identify', title: 'Identify the input', content: 'First-step content.', hint: 'Check the input units.' },
    { id: 'evaluate', title: 'Evaluate the model', content: 'Second-step content.', hint: 'Check the model assumptions.' },
  ];
  const button = (label: string) => {
    const found = Array.from(host.querySelectorAll('button')).find((node) => node.getAttribute('aria-label') === label || node.textContent?.trim() === label);
    assert.ok(found, `Expected the ${label} control to be mounted.`);
    return found;
  };

  try {
    await React.act(async () => {
      root.render(<LanguageProvider><MotionConfig reducedMotion="always">
        <section data-tutor-agent-scope={itemKey}>
          <StepDisclosure courseSlug="course" itemKey={itemKey} steps={steps} problemTitle="Lifecycle regression" />
        </section>
      </MotionConfig></LanguageProvider>);
    });
    // A store-only open avoids the button's automatic prompt and lets us check
    // a real unsent draft without a mock of InlineAiThread or useChat.
    await React.act(async () => { useTutorStore.getState().openInlineAi(firstAnchor); });
    const firstThread = host.querySelector(`[data-inline-ai="${firstAnchor}"]`);
    assert.ok(firstThread);
    const input = firstThread.querySelector('textarea');
    assert.ok(input);
    const draft = 'Why do we use this model before changing the frequency?';
    await React.act(async () => {
      Object.getOwnPropertyDescriptor(browser.HTMLTextAreaElement.prototype, 'value')!.set!.call(input, draft);
      input.dispatchEvent(new browser.Event('input', { bubbles: true }));
    });
    assert.equal(input.value, draft);

    const unchangedThread = () => {
      assert.equal(host.querySelector(`[data-inline-ai="${firstAnchor}"]`), firstThread, 'The original thread must remain mounted.');
      assert.equal(firstThread.querySelector('textarea'), input, 'The input must keep its DOM identity.');
      assert.equal(input.value, draft, 'Navigation must preserve the unsent draft.');
      assert.match(firstThread.textContent ?? '', /Step 1.*Identify the input/, 'The retained thread must keep its original context label.');
    };

    await React.act(async () => { button('Step 2: Evaluate the model').click(); });
    button('Hint for step 2');
    assert.match(host.textContent ?? '', /Second-step content\./);
    unchangedThread();

    await React.act(async () => { button('Show all steps').click(); });
    button('Hint for step 1');
    button('Hint for step 2');
    unchangedThread();

    await React.act(async () => { button('One step at a time').click(); });
    button('Hint for step 2');
    unchangedThread();

    await React.act(async () => { button('Step 1: Identify the input').click(); });
    button('Hint for step 1');
    unchangedThread();
    assert.equal(requests, 0, 'Changing steps and reading mode must not send or restart a tutor turn.');
  } finally {
    await React.act(async () => { root.unmount(); });
  }
});

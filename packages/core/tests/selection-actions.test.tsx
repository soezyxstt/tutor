import assert from 'node:assert/strict';
import test from 'node:test';
import { MessageChannel as NodeMessageChannel } from 'node:worker_threads';
import { JSDOM } from 'jsdom';

test('selection presets send the chosen task and exact quote; a custom question only opens the composer', async (t) => {
  const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
    url: 'https://tutor.example/?lang=id', pretendToBeVisual: true,
  });
  const browser = dom.window;
  const channels = new Set<NodeMessageChannel>();
  class TestMessageChannel extends NodeMessageChannel {
    constructor() { super(); channels.add(this); }
  }
  Object.defineProperty(globalThis, 'MessageChannel', { value: TestMessageChannel, configurable: true });
  for (const name of ['window', 'document', 'navigator', 'localStorage', 'Node', 'Element', 'HTMLElement', 'HTMLTextAreaElement', 'MutationObserver', 'Event', 'MouseEvent', 'PointerEvent', 'DOMRect', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) {
    const value = name === 'window' ? browser : browser[name as keyof typeof browser];
    Object.defineProperty(globalThis, name, {
      value: typeof value === 'function' && ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(name) ? value.bind(browser) : value,
      configurable: true, writable: true,
    });
  }
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  let docked = true;
  browser.matchMedia = () => ({ get matches() { return docked; }, addEventListener() {}, removeEventListener() {} }) as unknown as MediaQueryList;
  Object.assign(browser.Range.prototype, { getClientRects: () => [new browser.DOMRect(30, 180, 500, 100)] });
  t.after(() => {
    dom.window.close();
    for (const channel of channels) { channel.port1.close(); channel.port2.close(); }
  });

  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { LanguageProvider } = await import('../src/i18n/language-provider');
  const { SelectionAiPopover } = await import('../src/ai/selection-ai-popover');
  const { useTutorStore } = await import('../src/store/tutor-store');
  const host = browser.document.getElementById('app')!;
  const root = createRoot(host);
  const anchorId = 'ipe:frequency:step:limits';
  const first = 'Sensitivitas nominalnya 100 mV/g. '.repeat(12);
  const second = 'Pada 0.5 Hz, bandingkan respons sensor dengan rentang kerjanya. '.repeat(4);

  function Fixture() {
    const containerRef = React.useRef<HTMLElement>(null);
    const open = useTutorStore((state) => state.inlineThreads[anchorId]?.open);
    return <>
      <main ref={containerRef} tabIndex={-1}>
        <section data-ai-anchor={anchorId}>
          <p id="first-paragraph">{first}</p><p id="second-paragraph">{second}</p>
        </section>
        {open && <div data-inline-ai={anchorId}><textarea aria-label="Local question" /></div>}
      </main>
      <SelectionAiPopover containerRef={containerRef} fallbackAnchorId="ipe:frequency:statement" />
    </>;
  }

  const selectExcerpt = async () => {
    let selected = '';
    await React.act(async () => {
      host.querySelector('main')!.focus();
      const firstNode = host.querySelector('#first-paragraph')!.firstChild!;
      const secondNode = host.querySelector('#second-paragraph')!.firstChild!;
      const range = browser.document.createRange();
      range.setStart(firstNode, 0);
      range.setEnd(secondNode, secondNode.textContent!.length);
      const selection = browser.getSelection()!;
      selection.removeAllRanges(); selection.addRange(range);
      selected = selection.toString().trim();
      browser.document.dispatchEvent(new browser.Event('selectionchange'));
      await new Promise((resolve) => setTimeout(resolve, 90));
    });
    const toolbar = browser.document.querySelector('[data-ai-selection-toolbar]');
    assert.ok(toolbar, 'A multi-paragraph selection longer than 400 characters must show the actions.');
    assert.equal(toolbar.getAttribute('data-docked'), String(docked));
    return { selected, toolbar };
  };
  const click = async (toolbar: Element, label: string) => {
    const button = Array.from(toolbar.querySelectorAll('button')).find((node) => node.textContent?.trim() === label);
    assert.ok(button, `The ${label} preset must be available.`);
    await React.act(async () => { button.click(); });
  };

  try {
    for (const locale of ['id', 'en'] as const) {
      docked = locale === 'id';
      Object.defineProperty(browser, 'innerWidth', { value: docked ? 390 : 1024, configurable: true });
      browser.history.replaceState({}, '', `?lang=${locale}`);
      await React.act(async () => {
        useTutorStore.setState({ inlineThreads: {} });
        root.render(<LanguageProvider key={locale}><Fixture /></LanguageProvider>);
      });
      const cases = [
        { label: locale === 'id' ? 'Jelaskan per langkah' : 'Explain step by step', intent: /per langkah|step by step/, detail: /simbol|symbols/ },
        { label: locale === 'id' ? 'Buat visualisasi' : 'Create a visual', intent: /visualisasi interaktif|interactive visualization/, detail: /grafik|graph/ },
        { label: locale === 'id' ? 'Permudah bahasa' : 'Simplify the wording', intent: /Tulis ulang|Rewrite/, detail: /makna|meaning/ },
      ];
      for (const action of cases) {
        await React.act(async () => { useTutorStore.setState({ inlineThreads: {} }); });
        const { selected, toolbar } = await selectExcerpt();
        await click(toolbar, action.label);
        const thread = useTutorStore.getState().inlineThreads[anchorId];
        assert.equal(thread?.open, true);
        assert.equal(thread.quotedText, selected);
        assert.equal(Object.keys(useTutorStore.getState().inlineThreads).length, 1, 'The chosen block supplies the anchor, not the page fallback.');
        assert.ok(thread.draftPrompt?.includes(`"${selected}"`), 'The queued task must include the exact selected excerpt.');
        assert.match(thread.draftPrompt!, action.intent);
        assert.match(thread.draftPrompt!, action.detail);
        assert.match(thread.draftPrompt!, /satuan|units/);
        assert.doesNotMatch(thread.draftPrompt!, /renderInteractive|SDK|tool call|pemanggilan tool/);
        await React.act(async () => { await new Promise((resolve) => setTimeout(resolve, 25)); });
        assert.notEqual(browser.document.activeElement, host.querySelector('textarea'), 'A preset must not open the mobile keyboard.');
      }

      const { selected, toolbar } = await selectExcerpt();
      await click(toolbar, locale === 'id' ? 'Tanya AI' : 'Ask AI');
      const custom = useTutorStore.getState().inlineThreads[anchorId];
      assert.equal(custom.open, true);
      assert.equal(custom.quotedText, selected);
      assert.equal(custom.draftPrompt, undefined, 'A custom question must clear the earlier preset and wait for the learner to type.');
      await React.act(async () => { await new Promise((resolve) => setTimeout(resolve, 40)); });
      assert.equal(browser.document.activeElement, host.querySelector('textarea'), 'The custom action must focus its local composer.');
    }
  } finally {
    await React.act(async () => { root.unmount(); });
  }
});

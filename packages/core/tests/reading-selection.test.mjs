import test from 'node:test';
import assert from 'node:assert/strict';
import { MAX_SELECTION_CHARACTERS, readReadingSelection, selectionToolbarPosition } from '../src/ai/reading-selection.ts';

// Minimal Selection/Range boundary fixtures exercise the reader without a
// browser dependency. Layout and touch behavior are checked in the app preview.
function element(parentElement = null, { anchor = null, excluded = false } = {}) {
  return {
    nodeType: 1,
    parentElement,
    contains(node) {
      for (let current = node; current; current = current.parentElement) if (current === this) return true;
      return false;
    },
    closest(selector) {
      if (selector === '[data-ai-anchor]' ? anchor !== null : excluded) return this;
      return parentElement?.closest(selector) ?? null;
    },
    getAttribute(name) { return name === 'data-ai-anchor' ? anchor : null; },
  };
}

function fixture(text, { backwards = false, outside = false, excludedEnd = false, anchored = true } = {}) {
  const container = element();
  const startElement = element(container, { anchor: anchored ? 'course:problem:step:1' : null });
  const endElement = element(outside ? element() : container, { anchor: 'course:problem:step:2', excluded: excludedEnd });
  const startContainer = { nodeType: 3, parentElement: startElement };
  const endContainer = { nodeType: 3, parentElement: endElement };
  const range = { startContainer, endContainer };
  const selection = {
    anchorNode: backwards ? endContainer : startContainer,
    focusNode: backwards ? startContainer : endContainer,
    isCollapsed: false,
    rangeCount: 1,
    getRangeAt: () => range,
    toString: () => text,
  };
  return { container, selection };
}

test('keeps a multi-paragraph selection beyond the old 400-character limit', () => {
  const text = `${'First paragraph. '.repeat(20)}\n\n${'Second paragraph. '.repeat(20)}`;
  const { container, selection } = fixture(text);
  const result = readReadingSelection(container, selection, 'fallback');
  assert.equal(result.text, text.trim());
  assert.equal(result.anchorId, 'course:problem:step:1');
  assert.equal(result.truncated, false);
});

test('backwards selection uses the same document-order anchor', () => {
  const { container, selection } = fixture('Across two different steps.', { backwards: true });
  assert.equal(readReadingSelection(container, selection, 'fallback').anchorId, 'course:problem:step:1');
});

test('selecting outside the reading area or into a chat/input does not send a quote', () => {
  for (const options of [{ outside: true }, { excludedEnd: true }]) {
    const { container, selection } = fixture('Some selected content.', options);
    assert.equal(readReadingSelection(container, selection, 'fallback'), null);
  }
});

test('very long selections retain a bounded excerpt and explicit truncation state', () => {
  const text = 'a'.repeat(MAX_SELECTION_CHARACTERS + 5_000);
  const { container, selection } = fixture(text);
  const result = readReadingSelection(container, selection, 'fallback');
  assert.equal(result.truncated, true);
  assert.equal(result.originalLength, text.length);
  assert.equal(result.text, `${'a'.repeat(MAX_SELECTION_CHARACTERS)}…`);
});

test('a single math symbol is valid and unanchored text uses the page context', () => {
  const { container, selection } = fixture('x', { anchored: false });
  assert.equal(readReadingSelection(container, selection, 'statement').anchorId, 'statement');
  assert.equal(readReadingSelection(container, selection, null), null);
  selection.isCollapsed = true;
  assert.equal(readReadingSelection(container, selection, 'statement'), null);
});

test('toolbar placement follows a visible selection line and stays inside the viewport', () => {
  const rects = [
    { top: -400, bottom: -380, left: 10, right: 300, width: 290, height: 20 },
    { top: 150, bottom: 170, left: 300, right: 390, width: 90, height: 20 },
  ];
  assert.deepEqual(selectionToolbarPosition(rects, { width: 390, height: 844 }), { top: 106, left: 294 });
  assert.equal(selectionToolbarPosition(rects.slice(0, 1), { width: 390, height: 844 }), null);
});

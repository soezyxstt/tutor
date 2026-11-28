import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { MathMarkdown } from '../src/content/math-markdown';
import { readReadingSelection, readingRangeText } from '../src/ai/reading-selection';

function render(content: string) {
  return renderToStaticMarkup(createElement(MathMarkdown, { content }));
}

test('a range across paragraphs quotes each selected formula once from its exact source', () => {
  const formula = String.raw`\frac{5}{100}=0.05`;
  const dom = new JSDOM(`<main data-ai-anchor="ipe:cross-axis">${render(`Bandingkan $${formula}$ terlebih dahulu.\n\nRasio ini menyatakan sensitivitas silang.`)}</main>`);
  try {
    const main = dom.window.document.querySelector('main')!;
    const paragraphs = main.querySelectorAll('p');
    const range = dom.window.document.createRange();
    range.setStart(paragraphs[0].firstChild!, 0);
    const last = paragraphs[1].lastChild!;
    range.setEnd(last, last.textContent!.length);
    const selection = dom.window.getSelection()!;
    selection.addRange(range);
    const result = readReadingSelection(main, selection, 'fallback');
    assert.equal(result?.anchorId, 'ipe:cross-axis');
    assert.equal(result?.text, `Bandingkan $${formula}$ terlebih dahulu.\n\nRasio ini menyatakan sensitivitas silang.`);
    const rerendered = render(result!.text);
    assert.equal((rerendered.match(/<annotation encoding="application\/x-tex">/g) ?? []).length, 1);
    assert.ok(rerendered.includes(`<annotation encoding="application/x-tex">${formula}</annotation>`));
    assert.doesNotMatch(rerendered, /<h[1-6]\b|katex-error/, 'An equals sign must remain inside its equation, not become a Markdown heading.');
  } finally { dom.window.close(); }
});

test('full display formulas retain display math and partial math never adds unselected terms', () => {
  const dom = new JSDOM(`<main>${render('$$\nx+1=2\n$$')}</main>`);
  try {
    const main = dom.window.document.querySelector('main')!;
    const full = dom.window.document.createRange();
    full.selectNodeContents(main);
    assert.equal(readingRangeText(full), '$$\nx+1=2\n$$');
    const visible = main.querySelector('.katex-html')!;
    const nodes: Text[] = [];
    const walker = dom.window.document.createTreeWalker(visible, 4);
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    const glyphs = nodes.filter((node) => node.textContent);
    const glyphRange = dom.window.document.createRange();
    glyphRange.setStart(glyphs[0], 0);
    glyphRange.setEnd(glyphs[glyphs.length - 1], glyphs[glyphs.length - 1].textContent!.length);
    assert.equal(readingRangeText(glyphRange), '$$\nx+1=2\n$$', 'Selecting every visible glyph includes the complete existing formula.');
    const equal = nodes.find((node) => node.textContent === '=')!;
    const two = nodes.find((node) => node.textContent === '2')!;
    assert.ok(equal && two);
    const partial = dom.window.document.createRange();
    partial.setStart(equal, 0);
    partial.setEnd(two, 1);
    assert.equal(readingRangeText(partial), '=2');
    assert.doesNotMatch(readingRangeText(partial), /x|\+1|\$/);
  } finally { dom.window.close(); }
});

test('selected inline and multiline code keeps literal math markers and internal blank lines', () => {
  const inline = String.raw`\(x_1\)`;
  const code = String.raw`\[x=1\]` + '\n\n    value = 2';
  const dom = new JSDOM(`<main>${render(`Code: \`${inline}\`.\n\n\`\`\`text\n${code}\n\`\`\``)}</main>`);
  try {
    const range = dom.window.document.createRange();
    range.selectNodeContents(dom.window.document.querySelector('main')!);
    const text = readingRangeText(range);
    assert.ok(text.includes(`\`${inline}\``));
    assert.ok(text.includes(code));
    const html = render(text);
    assert.ok(html.includes(`<code>${inline}</code>`));
    assert.ok(html.includes(code));
    assert.doesNotMatch(html, /application\/x-tex|katex-error/);
  } finally { dom.window.close(); }
});

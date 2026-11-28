import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MathMarkdown } from '../src/content/math-markdown';

function render(content: string) {
  return renderToStaticMarkup(createElement(MathMarkdown, { content }));
}
function annotations(html: string) {
  return [...html.matchAll(/<annotation encoding="application\/x-tex">([\s\S]*?)<\/annotation>/g)].map((match) => match[1]);
}

test('the live provider voltage response renders bracket display math and inline TeX', () => {
  const voltage = String.raw`V_{\text{total}}=100+10=110\ \mathrm{mV}`;
  const html = render(`Tegangan totalnya:\n\n\\[\n${voltage}\n\\]\n\nNilai \\(V_{\\text{total}}\\) memakai satuan mV.`);
  assert.deepEqual(annotations(html), [voltage, String.raw`V_{\text{total}}`]);
  assert.equal((html.match(/<math\b[^>]*display="block"/g) ?? []).length, 1);
  assert.match(html, /<msub>/);
  assert.doesNotMatch(html, /katex-error/);
  assert.ok(html.includes('Tegangan totalnya:'));
  assert.ok(html.includes('memakai satuan mV.'));
});

test('TeX delimiters coexist with dollar math without changing existing equations', () => {
  const html = render(String.raw`Use \(a_1\), $b_2$, and \[c_3\].` + '\n\n$$\nd_4\n$$');
  assert.deepEqual(annotations(html), ['a_1', 'b_2', 'c_3', 'd_4']);
  assert.equal((html.match(/<math\b[^>]*display="block"/g) ?? []).length, 2);
  const literal = String.raw`\text{\(literal\)}`;
  const existing = render(`$${literal}$`);
  assert.deepEqual(annotations(existing), [literal], 'Existing dollar-delimited math remains one opaque expression.');
});

test('inline, fenced, and indented code preserve their literal TeX delimiters', () => {
  const literal = String.raw`\(x_1\) and \[y_2\]`;
  const html = render([
    `Inline: \`${literal}\`.`,
    `\`\`\`tex\n${literal}\n\`\`\``,
    `~~~text\n${literal}\n~~~`,
    `    ${literal}`,
  ].join('\n\n'));
  assert.equal(annotations(html).length, 0);
  assert.ok(html.includes(`<code>${literal}</code>`));
  assert.ok(html.includes(`<code class="language-tex">${literal}\n</code>`));
  assert.ok(html.includes(`<code class="language-text">${literal}\n</code>`));
  assert.ok(html.includes(`<pre><code>${literal}\n</code></pre>`));
});

test('links, escaped literal delimiters, and unmatched punctuation retain Markdown meaning', () => {
  const content = String.raw`[source](https://example.com/\(guide\)?x=1&y=2) and [normal link](https://example.com).

Keep \\(x\\) and \\[y\\] literal. Escape \*asterisks\*, \_underscores\_, \[unpaired brackets], and \(unpaired parentheses).`;
  const html = render(content);
  assert.equal(annotations(html).length, 0);
  assert.ok(html.includes('href="https://example.com/(guide)?x=1&amp;y=2"'));
  assert.ok(html.includes('href="https://example.com"'));
  assert.ok(html.includes(String.raw`Keep \(x\) and \[y\] literal.`));
  assert.ok(html.includes('Escape *asterisks*, _underscores_, [unpaired brackets], and (unpaired parentheses).'));
});

test('display TeX in a list or quote preserves its container and equation characters', () => {
  const html = render(String.raw`- Result: \[x=\frac{a}{b}\].

> Compare \(a_1\) with \(b_2\).`);
  assert.deepEqual(annotations(html), [String.raw`x=\frac{a}{b}`, 'a_1', 'b_2']);
  assert.match(html, /<ul>[\s\S]*<li>Result:/);
  assert.match(html, /<blockquote>/);
  assert.doesNotMatch(html, /katex-error/);
  const multiline = render(String.raw`> \[
> V_1=\frac{a}{b}
> \]

- A multiline result:
  \[
  V_2=a+b
  \]`);
  assert.deepEqual(annotations(multiline), [String.raw`V_1=\frac{a}{b}`, 'V_2=a+b']);
  assert.doesNotMatch(multiline, /katex-error/);
});

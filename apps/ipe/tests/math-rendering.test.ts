import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MathExpression } from '../../../packages/core/src/content/math-expression';
import { LanguageProvider } from '../../../packages/core/src/i18n/language-provider';
import { AiToolInvocationView } from '../../../packages/core/src/ai/ui-sdk/tool-renderers';

const calibration = String.raw`T = \frac{R_x - R_0}{\alpha R_0}`;

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
}

function annotations(html: string) {
  return [...html.matchAll(/<annotation encoding="application\/x-tex">([\s\S]*?)<\/annotation>/g)]
    .map((match) => match[1]);
}

function renderExpression(latex: string, display = true) {
  return renderToStaticMarkup(createElement(MathExpression, { latex, display }));
}

function renderTool(props: Parameters<typeof AiToolInvocationView>[0]) {
  return renderToStaticMarkup(createElement(LanguageProvider, null,
    createElement(AiToolInvocationView, props)));
}

test('raw tool LaTeX renders fractions and subscripts as math, not Markdown text', () => {
  const html = renderExpression(calibration);
  assert.deepEqual(annotations(html), [escapeHtml(calibration)]);
  assert.match(html, /<mfrac>/, 'The fraction must reach the math renderer');
  assert.match(html, /<msub>/, 'Subscripts must remain mathematical notation');
  assert.match(html, /<math\b[^>]*display="block"/);
  assert.doesNotMatch(html, /<p[\s>]/, 'A bare equation must not become a prose paragraph');
});

for (const [name, wrapped] of [
  ['single dollars', `$${calibration}$`],
  ['double dollars', `$$\n${calibration}\n$$`],
  ['parentheses', `\\(${calibration}\\)`],
  ['brackets', `\\[\n${calibration}\n\\]`],
] as const) {
  test(`equation fields accept paired ${name} without double-wrapping the formula`, () => {
    const html = renderExpression(`  ${wrapped}  `);
    assert.deepEqual(annotations(html), [escapeHtml(calibration)]);
    assert.equal((html.match(/<math[\s>]/g) ?? []).length, 1);
    assert.match(html, /<mfrac>/);
  });
}

test('inline symbols stay inline while block equations use block math', () => {
  const symbol = String.raw`R_{\mathrm{ref}}`;
  const inline = renderExpression(symbol, false);
  assert.deepEqual(annotations(inline), [escapeHtml(symbol)]);
  assert.match(inline, /<msub>/);
  assert.doesNotMatch(inline, /<math\b[^>]*display="block"/);
  assert.match(renderExpression(symbol, true), /<math\b[^>]*display="block"/);
});

test('AI derivation renders raw and delimited steps plus Markdown reasons', () => {
  const first = String.raw`\frac{R_x}{R_0} = 1 + \alpha T`;
  const html = renderTool({ invocation: {
    toolName: 'showStepDerivation',
    args: {
      title: 'Solve the calibration equation',
      steps: [
        { expression: first, rule: 'Use the **linear calibration** with $R_0$ as reference.' },
        { expression: `$${calibration}$`, rule: String.raw`Divide both sides by $\alpha R_0$.` },
      ],
    },
  } });
  const equations = annotations(html);
  for (const latex of [first, calibration, 'R_0', String.raw`\alpha R_0`]) {
    assert.ok(equations.includes(escapeHtml(latex)), `Missing rendered math: ${latex}`);
  }
  assert.match(html, /<strong>linear calibration<\/strong>/);
  assert.equal((html.match(/<mfrac>/g) ?? []).length, 2);
  assert.equal((html.match(/<math\b[^>]*display="block"/g) ?? []).length, 2,
    'Each derivation expression must have its own display equation');
});

test('formula breakdown accepts existing delimiters in both the formula and symbols', () => {
  const reference = String.raw`R_{\mathrm{ref}}`;
  const change = String.raw`\Delta T`;
  const html = renderTool({ invocation: {
    toolName: 'showFormulaBreakdown',
    args: {
      title: 'Calibration variables',
      latex: `\\[${calibration}\\]`,
      symbols: [
        { symbol: reference, meaning: 'Reference resistance.' },
        { symbol: `\\(${change}\\)`, meaning: 'Temperature change.' },
      ],
    },
  } });
  assert.deepEqual(annotations(html), [calibration, reference, change].map(escapeHtml));
  assert.equal((html.match(/<math\b[^>]*display="block"/g) ?? []).length, 1);
});

test('a long uncertainty equation remains one math block without text line breaks', () => {
  const uncertainty = String.raw`u_c = \sqrt{\left(\frac{\partial f}{\partial x_1}u_{x_1}\right)^2 + \left(\frac{\partial f}{\partial x_2}u_{x_2}\right)^2 + 2\frac{\partial f}{\partial x_1}\frac{\partial f}{\partial x_2}\operatorname{cov}(x_1,x_2)}`;
  const html = renderExpression(uncertainty);
  assert.deepEqual(annotations(html), [escapeHtml(uncertainty)]);
  assert.equal((html.match(/<math[\s>]/g) ?? []).length, 1);
  assert.match(html, /<math\b[^>]*display="block"/);
  assert.doesNotMatch(html, /<(?:p|br)[\s>\/]/,
    'Responsive overflow must not split the equation into ordinary text lines');
});

test('invalid LaTeX remains visible as an accessible note without crashing the thread', () => {
  const invalid = String.raw`\frac{u_x}{`;
  for (const display of [false, true]) {
    const html = renderExpression(`\\[${invalid}\\]`, display);
    assert.match(html, /role="note"/);
    assert.ok(html.includes(`aria-label="${escapeHtml(invalid)}"`));
    assert.ok(html.includes(`<code>${escapeHtml(invalid)}</code>`),
      'Keep the original formula visible, not only in an accessible label');
    assert.equal(annotations(html).length, 0, 'Do not pass a broken formula off as rendered math');
  }
});

test('math fields cannot create HTML elements or script links', () => {
  for (const latex of [
    String.raw`\text{<img src=x onerror=alert(1)>}`,
    String.raw`\href{javascript:alert(1)}{open}`,
    String.raw`\href{https://example.com}{open}`,
    String.raw`\htmlStyle{position:fixed;inset:0}{cover}`,
    String.raw`\frac{"><img src=x onerror=alert(1)>}{`,
  ]) {
    const html = renderExpression(latex);
    assert.doesNotMatch(html, /<(?:img|script|iframe)\b/i);
    assert.doesNotMatch(html, /<a(?:\s|>)/i, 'Tool math must not create trusted links');
    assert.doesNotMatch(html, /<[a-z][^>]*\bstyle=["'][^"']*position\s*:\s*fixed/i);
  }
  const malformed = String.raw`\frac{"><img src=x onerror=alert(1)>}{`;
  const fallback = renderExpression(malformed);
  assert.ok(fallback.includes(`<code>${escapeHtml(malformed)}</code>`),
    'The parse-error fallback must escape HTML as well');
  assert.ok(fallback.includes(`aria-label="${escapeHtml(malformed)}"`),
    'The fallback label must escape quotes and HTML');
});

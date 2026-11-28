import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// WCAG relative luminance: verify the actual shared tokens, including the
// tinted surfaces used for feedback. Browser checks cover inherited text color.
const css = readFileSync(new URL('../packages/ui/src/styles/tokens.css', import.meta.url), 'utf8');
const themes = [':root', '.dark'].map((selector) => {
  const block = css.slice(css.indexOf(`${selector} {`)).split('}')[0];
  const tokens = Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[\da-f]{6})\s*;/gi)].map(([, key, value]) => [key, value]));
  return [selector, tokens];
});
const rgb = (hex) => [1, 3, 5].map((position) => parseInt(hex.slice(position, position + 2), 16) / 255);
const luminance = (color) => color.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
const contrast = (first, second) => {
  const [low, high] = [luminance(first), luminance(second)].sort((a, b) => a - b);
  return (high + 0.05) / (low + 0.05);
};
const mix = (color, background, opacity) => color.map((channel, index) => channel * opacity + background[index] * (1 - opacity));

for (const [name, tokens] of themes) {
  test(`${name}: reading text, secondary text, links, and feedback meet 4.5:1`, () => {
    for (const surface of ['background', 'surface-subtle', 'muted', 'popover']) {
      for (const text of ['foreground', 'muted-foreground', 'primary', 'success', 'warning', 'destructive']) {
        const ratio = contrast(rgb(tokens[text]), rgb(tokens[surface]));
        assert.ok(ratio >= 4.5, `${text} on ${surface}: ${ratio.toFixed(3)}:1`);
      }
    }
    assert.ok(contrast(rgb(tokens['secondary-foreground']), rgb(tokens.secondary)) >= 4.5);
  });

  test(`${name}: selected answers and button states retain readable foregrounds`, () => {
    for (const state of ['primary', 'success', 'warning', 'destructive', 'accent']) {
      const foreground = rgb(tokens[`${state}-foreground`]);
      assert.ok(contrast(foreground, rgb(tokens[state])) >= 4.5, `${state} solid state`);
      for (const surface of ['background', 'surface-subtle']) {
        for (const opacity of [0.1, 0.2]) {
          assert.ok(contrast(rgb(tokens[state]), mix(rgb(tokens[state]), rgb(tokens[surface]), opacity)) >= 4.5, `${state} ${opacity * 100}% feedback tint on ${surface}`);
        }
      }
    }
    assert.ok(contrast(rgb(tokens['primary-foreground']), rgb(tokens['primary-hover'])) >= 4.5);
  });

  test(`${name}: control boundaries, focus, and graph strokes meet 3:1`, () => {
    for (const surface of ['background', 'surface-subtle', 'muted', 'popover']) {
      for (const indicator of ['input', 'ring', 'primary', 'success', 'warning', 'destructive', 'muted-foreground']) {
        const ratio = contrast(rgb(tokens[indicator]), rgb(tokens[surface]));
        assert.ok(ratio >= 3, `${indicator} on ${surface}: ${ratio.toFixed(3)}:1`);
      }
    }
  });
}

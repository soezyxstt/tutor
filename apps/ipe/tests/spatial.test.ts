import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Spatial, { supportsWebGL2 } from '../src/simulations/spatial';

function withCanvas(getContext: (kind: string, options: unknown) => unknown, run: () => void) {
  const keys = ['document', 'getComputedStyle'] as const;
  const descriptors = keys.map(key => Object.getOwnPropertyDescriptor(globalThis, key));
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    documentElement: {},
    createElement: (tag: string) => {
      assert.equal(tag, 'canvas');
      return { getContext };
    },
  } });
  Object.defineProperty(globalThis, 'getComputedStyle', { configurable: true, value: () => ({ getPropertyValue: () => '#f0f3fa' }) });
  try {
    run();
  } finally {
    keys.forEach((key, index) => {
      const descriptor = descriptors[index];
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    });
  }
}

test('no WebGL renders the translated fallback without mounting a failed Canvas subtree', () => {
  for (const locale of ['id', 'en'] as const) {
    for (const unavailable of [() => null, () => { throw new Error('GPU disabled'); }]) {
      withCanvas(unavailable, () => {
        const html = renderToStaticMarkup(createElement(Spatial, { kind: 'orifice', locale }));
        assert.ok(html.includes('role="status"'));
        assert.ok(html.includes(locale === 'id' ? 'Pilih 2D untuk melanjutkan.' : 'Select 2D to continue.'));
        assert.ok(!html.includes('<canvas'), 'The fallback must bypass R3F initialization and teardown, not sit inside a canvas');
      });
    }
  }
});

test('the WebGL2 probe releases its own context and tolerates an unavailable release extension', () => {
  const requests: Array<[string, unknown]> = [];
  const extensions: string[] = [];
  let releases = 0;
  withCanvas((kind, options) => {
    requests.push([kind, options]);
    return { getExtension: (extension: string) => {
      extensions.push(extension);
      return { loseContext: () => { releases += 1; } };
    } };
  }, () => assert.equal(supportsWebGL2(), true));
  assert.deepEqual(requests, [['webgl2', { alpha: true, antialias: true, powerPreference: 'high-performance' }]]);
  assert.deepEqual(extensions, ['WEBGL_lose_context']);
  assert.equal(releases, 1, 'The detached probe must release its context before the real Canvas mounts');

  withCanvas(() => ({ getExtension: () => null }), () => assert.equal(supportsWebGL2(), true));
  withCanvas(() => ({ getExtension: () => { throw new Error('Extension disabled'); } }), () => assert.equal(supportsWebGL2(), true));
});

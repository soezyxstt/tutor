import test from 'node:test';
import assert from 'node:assert/strict';
import { act, createElement, StrictMode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createRoot, extend } from '@react-three/fiber';
import * as THREE from 'three';
import Spatial, { supportsWebGL2 } from '../src/simulations/spatial';
import { SpatialLabel } from '../src/simulations/spatial-label';

async function withCanvas(getContext: (kind: string, options: unknown) => unknown, run: () => void | Promise<void>) {
  const keys = ['document', 'getComputedStyle', 'IS_REACT_ACT_ENVIRONMENT'] as const;
  const descriptors = keys.map(key => Object.getOwnPropertyDescriptor(globalThis, key));
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    documentElement: {},
    createElement: (tag: string) => {
      assert.equal(tag, 'canvas');
      return { getContext };
    },
  } });
  Object.defineProperty(globalThis, 'getComputedStyle', { configurable: true, value: () => ({ getPropertyValue: () => '#f0f3fa' }) });
  Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { configurable: true, value: true });
  try {
    await run();
  } finally {
    keys.forEach((key, index) => {
      const descriptor = descriptors[index];
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    });
  }
}

test('no WebGL renders the translated fallback without mounting a failed Canvas subtree', async () => {
  for (const locale of ['id', 'en'] as const) {
    for (const unavailable of [() => null, () => { throw new Error('GPU disabled'); }]) {
      await withCanvas(unavailable, () => {
        const html = renderToStaticMarkup(createElement(Spatial, { kind: 'orifice', locale }));
        assert.ok(html.includes('role="status"'));
        assert.ok(html.includes(locale === 'id' ? 'Pilih 2D untuk melanjutkan.' : 'Select 2D to continue.'));
        assert.ok(!html.includes('<canvas'), 'The fallback must bypass R3F initialization and teardown, not sit inside a canvas');
      });
    }
  }
});

test('the WebGL2 probe releases its own context and tolerates an unavailable release extension', async () => {
  const requests: Array<[string, unknown]> = [];
  const extensions: string[] = [];
  let releases = 0;
  await withCanvas((kind, options) => {
    requests.push([kind, options]);
    return { getExtension: (extension: string) => {
      extensions.push(extension);
      return { loseContext: () => { releases += 1; } };
    } };
  }, () => assert.equal(supportsWebGL2(), true));
  assert.deepEqual(requests, [['webgl2', { alpha: true, antialias: true, powerPreference: 'high-performance' }]]);
  assert.deepEqual(extensions, ['WEBGL_lose_context']);
  assert.equal(releases, 1, 'The detached probe must release its context before the real Canvas mounts');

  await withCanvas(() => ({ getExtension: () => null }), () => assert.equal(supportsWebGL2(), true));
  await withCanvas(() => ({ getExtension: () => { throw new Error('Extension disabled'); } }), () => assert.equal(supportsWebGL2(), true));
});

test('3D labels redraw with the theme and unmount through R3F without any nested DOM roots', async () => {
  extend(THREE);
  const drawn: Array<{ text: string; color: string }> = [];
  await withCanvas((kind) => {
    assert.equal(kind, '2d', 'A native label only creates a detached texture canvas');
    return {
      fillStyle: '',
      measureText: (value: string) => ({ width: value.length * 12 }),
      fillRect() {},
      fillText(this: { fillStyle: string }, text: string) { drawn.push({ text, color: this.fillStyle }); },
    };
  }, async () => {
    for (let mount = 0; mount < 2; mount += 1) {
      const canvas = {} as HTMLCanvasElement;
      const scene = new THREE.Scene();
      const renderer = {
        domElement: canvas, render() {}, setSize() {}, setPixelRatio() {},
        shadowMap: {},
      } as unknown as THREE.WebGLRenderer;
      const root = createRoot(canvas);
      await root.configure({ gl: renderer, scene, dpr: 1, frameloop: 'never', size: { width: 400, height: 260, top: 0, left: 0 }, camera: { fov: 39 } });
      const label = (foreground: string) => createElement(StrictMode, null, createElement(SpatialLabel, {
        label: 'd₂', position: [0.65, -0.15, 0.6], foreground, background: '#f0f3fa',
      }));
      act(() => { root.render(label('#172344')); });
      const sprite = scene.children[0] as THREE.Sprite;
      assert.equal(sprite.isSprite, true);
      assert.equal(sprite.userData.label, 'd₂');
      assert.deepEqual(sprite.position.toArray(), [0.65, -0.15, 0.6]);
      assert.equal(sprite.material.sizeAttenuation, false);
      assert.equal(sprite.material.depthTest, false);
      assert.equal(sprite.material.toneMapped, false);
      const texture = sprite.material.map!;
      assert.equal(texture.colorSpace, THREE.SRGBColorSpace);
      let oldDisposals = 0;
      texture.addEventListener('dispose', () => { oldDisposals += 1; });

      act(() => { root.render(label('#e7efff')); });
      assert.notEqual(sprite.material.map, texture, 'Theme changes must update a mounted label');
      assert.equal(oldDisposals, 1, 'R3F disposes the replaced texture');
      let finalDisposals = 0;
      sprite.material.map!.addEventListener('dispose', () => { finalDisposals += 1; });
      act(() => { root.unmount(); });
      assert.equal(scene.children.length, 0);
      assert.equal(finalDisposals, 1, 'R3F disposes the last texture when leaving 3D');
    }
  });
  assert.ok(drawn.some(({ text, color }) => text === 'd₂' && color === '#172344'));
  assert.ok(drawn.some(({ text, color }) => text === 'd₂' && color === '#e7efff'));
});

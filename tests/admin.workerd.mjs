import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

// Resolve the runtime bundled with this repo's Wrangler, so this check runs on
// the same Workers implementation used for local builds and deployment.
const appRequire = createRequire(new URL('../apps/catalog/package.json', import.meta.url));
const wranglerRequire = createRequire(appRequire.resolve('wrangler'));
const { Miniflare, convertV4MiniflareOptions } = wranglerRequire('miniflare');

test('workerd supports model discovery and central settings while refusing upstream redirects', async () => {
  const bundle = await build({
    stdin: {
      resolveDir: fileURLToPath(new URL('..', import.meta.url)),
      contents: `
        import { discoverProviderModels } from './packages/core/src/server/model-catalog';
        import { resolveTutorSettings } from './packages/core/src/server/tutor-settings';
        export default {
          async fetch(request) {
            const path = new URL(request.url).pathname;
            try {
              if (path.startsWith('/models/')) {
                return Response.json(await discoverProviderModels({
                  CF_ACCOUNT_ID: 'runtime-test', CF_AI_GATEWAY_ID: path.endsWith('/redirect') ? 'redirect' : 'normal', CF_AIG_TOKEN: 'runtime-test-token'
                }, 'openai'));
              }
              return Response.json(await resolveTutorSettings({
                AI_MODEL: 'openai/gpt-4o-mini', TUTOR_CONFIG_URL: 'https://config.example' + path
              }));
            } catch (error) {
              return Response.json({ error: error.message }, { status: 502 });
            }
          }
        };
      `,
      loader: 'ts',
    },
    bundle: true, write: false, format: 'esm', platform: 'browser', target: 'es2022',
  });
  const options = {
    host: '127.0.0.1', port: 0,
    workers: [{
      name: 'admin-runtime-probe', modules: true, script: bundle.outputFiles[0].text,
      compatibilityDate: '2026-11-01', outboundService: 'upstream',
    }, {
      name: 'upstream', modules: true, compatibilityDate: '2026-11-01',
      script: `export default { fetch(request) {
        const url = new URL(request.url);
        if (url.pathname.includes('/redirect')) return new Response(null, { status: 302, headers: { Location: 'https://unexpected.example/config' } });
        if (url.hostname === 'gateway.ai.cloudflare.com') {
          if (request.headers.get('cf-aig-authorization') !== 'Bearer runtime-test-token') return new Response(null, { status: 401 });
          return Response.json({ data: [{ id: 'gpt-4.1-mini' }] });
        }
        return Response.json({ primaryModel: 'openai/gpt-4.1-mini', fallbackModels: [], source: 'admin' });
      } };`,
    }],
  };
  // Wrangler 4 currently includes the v4-to-v5 options adapter. Keep the test
  // usable with older compatible Wrangler releases that expose v4 directly.
  const runtime = new Miniflare(convertV4MiniflareOptions ? convertV4MiniflareOptions(options) : options);
  try {
    const models = await runtime.dispatchFetch('https://test.example/models/normal');
    assert.equal(models.status, 200);
    assert.equal((await models.json())[0].id, 'openai/gpt-4.1-mini');
    const rejected = await runtime.dispatchFetch('https://test.example/models/redirect');
    assert.equal(rejected.status, 502);
    assert.deepEqual(await rejected.json(), { error: 'Provider model list returned HTTP 302.' });
    const settings = await runtime.dispatchFetch('https://test.example/settings/normal');
    assert.equal((await settings.json()).primaryModel, 'openai/gpt-4.1-mini');
    const fallback = await runtime.dispatchFetch('https://test.example/settings/redirect');
    assert.equal((await fallback.json()).primaryModel, 'openai/gpt-4o-mini');
  } finally {
    await runtime.dispose();
  }
});

test('workerd binding verification reaches strict admin auth with a localhost request origin', async () => {
  const bundle = await build({
    stdin: {
      resolveDir: fileURLToPath(new URL('..', import.meta.url)),
      contents: `
        import { createTutorWorker } from './packages/core/src/server/worker';
        export { TutorAdminState } from './packages/core/src/server/worker';
        export default createTutorWorker({ admin: true });
      `,
      loader: 'ts',
    },
    bundle: true, write: false, format: 'esm', platform: 'browser', target: 'es2022', external: ['node:*'],
  });
  const options = {
    host: '127.0.0.1', port: 0,
    workers: [{
      name: 'verification-proxy', modules: true,
      script: 'export default { fetch() { return new Response(null, { status: 404 }); } };',
      serviceBindings: { CATALOG: 'catalog' },
    }, {
      name: 'catalog', modules: true, script: bundle.outputFiles[0].text,
      compatibilityDate: '2026-11-01', compatibilityFlags: ['nodejs_compat'],
      durableObjects: { TUTOR_ADMIN_STATE: { className: 'TutorAdminState', useSQLite: true } },
      bindings: { ADMIN_USERNAME: 'runtime-admin', ADMIN_PASSWORD: 'runtime-test-password', TUTOR_CONFIG_URL: 'disabled' },
    }],
  };
  const runtime = new Miniflare(convertV4MiniflareOptions ? convertV4MiniflareOptions(options) : options);
  try {
    const { CATALOG } = await runtime.getBindings('verification-proxy');
    const origin = 'https://localhost';
    const rejected = await CATALOG.fetch(`${origin}/api/admin/login`, {
      method: 'POST', redirect: 'manual', headers: { Origin: 'https://other.localhost', 'Content-Type': 'application/json' }, body: '{}',
    });
    assert.equal(rejected.status, 403);
    assert.equal((await rejected.json()).code, 'ORIGIN_MISMATCH');
    const login = await CATALOG.fetch(`${origin}/api/admin/login`, {
      method: 'POST', redirect: 'manual', headers: { Origin: origin, 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'runtime-admin', password: 'runtime-test-password' }),
    });
    assert.equal(login.status, 200);
    const cookie = login.headers.get('Set-Cookie').split(';')[0];
    assert.match(login.headers.get('Set-Cookie'), /HttpOnly; Secure; SameSite=Strict/);
    await login.arrayBuffer();
    const session = await CATALOG.fetch(`${origin}/api/admin/session`, { redirect: 'manual', headers: { Cookie: cookie } });
    assert.equal((await session.json()).authenticated, true);
    const sibling = await CATALOG.fetch(`${origin}/api/admin/logout`, {
      method: 'POST', redirect: 'manual', headers: { Origin: 'https://course.localhost', Cookie: cookie },
    });
    assert.equal(sibling.status, 403);
    assert.equal((await sibling.json()).code, 'ORIGIN_MISMATCH');
    const logout = await CATALOG.fetch(`${origin}/api/admin/logout`, {
      method: 'POST', redirect: 'manual', headers: { Origin: origin, Cookie: cookie },
    });
    assert.equal(logout.status, 200);
    await logout.arrayBuffer();
    const expired = await CATALOG.fetch(`${origin}/api/admin/session`, { redirect: 'manual', headers: { Cookie: cookie } });
    assert.equal((await expired.json()).authenticated, false);
  } finally {
    await runtime.dispose();
  }
});

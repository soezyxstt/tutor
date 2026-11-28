import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

async function readJson(response, label) {
  try { return await response.json(); }
  catch { throw new Error(`${label} did not return valid JSON (HTTP ${response.status}).`); }
}

// Runs inside Actions. Never print credentials, cookies, response headers, or
// upstream error bodies. The test reads settings; it never changes a model.
async function verifyCatalog(fetcher) {
  const origin = process.env.CATALOG_ORIGIN || 'https://tutor.adihnursyam.com';
  let cookie = '';
  const request = (path, init = {}) => fetcher(`${origin}${path}`, {
    ...init,
    redirect: 'error',
    signal: AbortSignal.timeout(45_000),
    headers: { ...(cookie ? { Cookie: cookie } : {}), ...(init.method ? { Origin: origin, 'Content-Type': 'application/json' } : {}), ...init.headers },
  });

  let healthResult = 'No response';
  for (let attempt = 0; attempt < 12; attempt++) {
    try {
      const health = await request('/api/health');
      healthResult = `HTTP ${health.status}`;
      const payload = await health.json().catch(() => null);
      if (health.ok && payload?.ok === true) break;
      if (health.ok) healthResult += ' with an unexpected response format';
    } catch (error) {
      healthResult = error?.name === 'TimeoutError' ? 'Request timed out' : 'Network request failed';
    }
    // A newly bound domain can need time to become available. Keep diagnostics
    // useful without logging response bodies, headers, or credentials.
    assert(attempt < 11, `Catalog health endpoint is not available: ${healthResult}.`);
    console.log(`Waiting for catalog health (${attempt + 1}/12): ${healthResult}.`);
    await new Promise(resolve => setTimeout(resolve, 10_000));
  }

  const homepage = await request('/');
  assert.equal(homepage.status, 200, 'Catalog must load.');
  assert(/id="root"/.test(await homepage.text()), 'Catalog must return the app.');
  const loginPage = await request('/admin');
  assert.equal(loginPage.status, 200, 'Admin page must load.');
  const config = await request('/api/tutor-config');
  assert.equal(config.status, 200, 'Central model settings must be readable.');
  const publicSettings = await readJson(config, 'Public settings');
  assert.equal(typeof publicSettings.primaryModel, 'string');
  assert.equal((await request('/api/admin/settings')).status, 401, 'Anonymous settings access must fail.');
  const session = await request('/api/admin/session');
  const sessionInfo = await readJson(session, 'Anonymous session');
  assert.equal(sessionInfo.authenticated, false);
  assert.equal(sessionInfo.configured, true, 'Admin runtime secrets and storage must be configured.');
  assert.equal((await request('/api/admin/login', { method: 'POST', headers: { Origin: 'https://example.com' }, body: '{}' })).status, 403, 'Cross-origin login must fail.');

  assert(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD, 'Admin test credentials must be supplied.');
  try {
    const login = await request('/api/admin/login', { method: 'POST', body: JSON.stringify({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD }) });
    assert.equal(login.status, 200, 'Admin sign-in must succeed.');
    const setCookie = login.headers.get('set-cookie') || '';
    cookie = setCookie.split(';', 1)[0];
    assert(/HttpOnly/.test(setCookie), 'Session cookie must be HttpOnly.');
    assert(/Secure/.test(setCookie), 'Session cookie must require HTTPS.');
    assert(/SameSite=Strict/.test(setCookie), 'Session cookie must use strict same-site protection.');
    assert(!/Domain=/i.test(setCookie), 'Session cookie must be limited to the catalog host.');
    assert.equal((await readJson(await request('/api/admin/session'), 'Admin session')).authenticated, true);
    const settingsResponse = await request('/api/admin/settings');
    assert.equal(settingsResponse.status, 200, 'Authenticated settings must load.');
    assert.equal((await readJson(settingsResponse, 'Admin settings')).primaryModel, publicSettings.primaryModel);
    const modelsResponse = await request('/api/admin/models');
    assert.equal(modelsResponse.status, 200, 'Authenticated model catalog must load.');
    const inventory = await readJson(modelsResponse, 'Model inventory');
    assert(Array.isArray(inventory.models) && inventory.models.length > 0, 'Model list must not be empty.');
    for (const provider of inventory.providers) {
      const models = inventory.models.filter(model => model.provider === provider.id);
      const multimodal = models.filter(model => model.inputModalities.some(input => input !== 'text')).length;
      console.log(`${provider.id}: ${provider.status}; ${models.length} models; ${multimodal} with known media inputs.`);
      if (provider.status !== 'live') console.log(`${provider.id}: ${provider.error?.match(/HTTP \d{3}/)?.[0] || 'Live discovery unavailable'}.`);
    }
    assert.equal((await request('/api/admin/settings', { method: 'PUT', headers: { Origin: 'https://demo.tutor.adihnursyam.com' }, body: '{}' })).status, 403, 'A sibling subdomain must not change settings.');
    const aiResponse = await request('/api/ai', { method: 'POST', body: JSON.stringify({ language: 'en', courseCode: 'deployment-check', messages: [{ id: 'deployment-check', role: 'user', content: 'Reply with the single word ready.' }] }) });
    assert.equal(aiResponse.status, 200, 'AI tutor request must start.');
    const aiStream = await aiResponse.text();
    assert(/^0:/m.test(aiStream), 'AI tutor must return real streamed text.');
    assert(!/^3:/m.test(aiStream), 'AI tutor stream must not report a provider error.');
    console.log('AI tutor streamed a real response through the configured models.');
    console.log('Live catalog, shared settings, login, secure session, model discovery, and origin checks passed.');
  } finally {
    if (cookie) {
      const logout = await request('/api/admin/logout', { method: 'POST' });
      assert.equal(logout.status, 200, 'Sign-out must succeed.');
      assert.equal((await request('/api/admin/settings')).status, 401, 'Signed-out session must no longer work.');
    }
    cookie = '';
  }
}

let platform;
try {
  let fetcher = fetch;
  if (process.env.CATALOG_CHECK_MODE === 'binding') {
    // This authenticated Cloudflare API connection checks the deployed Worker
    // with its real bindings and secrets. It creates no public test endpoint and
    // leaves the custom domain's bot protection in place.
    const require = createRequire(new URL('../apps/catalog/package.json', import.meta.url));
    const { getPlatformProxy } = require('wrangler');
    platform = await getPlatformProxy({
      configPath: fileURLToPath(new URL('./wrangler.verify.jsonc', import.meta.url)),
      persist: false,
      envFiles: [],
      remoteBindings: true,
    });
    fetcher = (input, init) => platform.env.CATALOG.fetch(input, init);
    console.log('Checking the deployed Worker through an authenticated Cloudflare service binding.');
  }
  await verifyCatalog(fetcher);
} finally {
  await platform?.dispose();
}

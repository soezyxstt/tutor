import assert from 'node:assert/strict';

// Runs inside Actions. Never print credentials, cookies, response headers, or
// upstream error bodies. The test reads settings; it never changes a model.
const origin = process.env.CATALOG_ORIGIN || 'https://tutor.adihnursyam.com';
let cookie = '';
const request = (path, init = {}) => fetch(`${origin}${path}`, {
  ...init,
  redirect: 'error',
  signal: AbortSignal.timeout(45_000),
  headers: { ...(cookie ? { Cookie: cookie } : {}), ...(init.method ? { Origin: origin, 'Content-Type': 'application/json' } : {}), ...init.headers },
});

for (let attempt = 0; attempt < 6; attempt++) {
  try {
    const health = await request('/api/health');
    if (health.ok && (await health.json()).ok) break;
  } catch { /* A newly bound domain may need time to become available. */ }
  assert(attempt < 5, 'Catalog health endpoint is not available.');
  await new Promise(resolve => setTimeout(resolve, 10_000));
}

const homepage = await request('/');
assert.equal(homepage.status, 200, 'Catalog must load.');
assert.match(await homepage.text(), /id="root"/, 'Catalog must return the app.');
const loginPage = await request('/admin');
assert.equal(loginPage.status, 200, 'Admin page must load.');
const config = await request('/api/tutor-config');
assert.equal(config.status, 200, 'Central model settings must be readable.');
const publicSettings = await config.json();
assert.equal(typeof publicSettings.primaryModel, 'string');
assert.equal((await request('/api/admin/settings')).status, 401, 'Anonymous settings access must fail.');
const session = await request('/api/admin/session');
const sessionInfo = await session.json();
assert.equal(sessionInfo.authenticated, false);
assert.equal(sessionInfo.configured, true, 'Admin runtime secrets and storage must be configured.');
assert.equal((await request('/api/admin/login', { method: 'POST', headers: { Origin: 'https://example.com' }, body: '{}' })).status, 403, 'Cross-origin login must fail.');

assert(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD, 'Admin test credentials must be supplied.');
try {
  const login = await request('/api/admin/login', { method: 'POST', body: JSON.stringify({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD }) });
  assert.equal(login.status, 200, 'Admin sign-in must succeed.');
  const setCookie = login.headers.get('set-cookie') || '';
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /Secure/);
  assert.match(setCookie, /SameSite=Strict/);
  assert.doesNotMatch(setCookie, /Domain=/i);
  cookie = setCookie.split(';', 1)[0];
  assert.equal((await (await request('/api/admin/session')).json()).authenticated, true);
  const settingsResponse = await request('/api/admin/settings');
  assert.equal(settingsResponse.status, 200, 'Authenticated settings must load.');
  assert.equal((await settingsResponse.json()).primaryModel, publicSettings.primaryModel);
  const modelsResponse = await request('/api/admin/models');
  assert.equal(modelsResponse.status, 200, 'Authenticated model catalog must load.');
  const inventory = await modelsResponse.json();
  assert(Array.isArray(inventory.models) && inventory.models.length > 0, 'Model list must not be empty.');
  for (const provider of inventory.providers) {
    const models = inventory.models.filter(model => model.provider === provider.id);
    const multimodal = models.filter(model => model.inputModalities.some(input => input !== 'text')).length;
    console.log(`${provider.id}: ${provider.status}; ${models.length} models; ${multimodal} with known media inputs.`);
  }
  assert.equal((await request('/api/admin/settings', { method: 'PUT', headers: { Origin: 'https://demo.tutor.adihnursyam.com' }, body: '{}' })).status, 403, 'A sibling subdomain must not change settings.');
  const aiResponse = await request('/api/ai', { method: 'POST', body: JSON.stringify({ language: 'en', courseCode: 'deployment-check', messages: [{ id: 'deployment-check', role: 'user', content: 'Reply with the single word ready.' }] }) });
  assert.equal(aiResponse.status, 200, 'AI tutor request must start.');
  const aiStream = await aiResponse.text();
  assert.match(aiStream, /^0:/m, 'AI tutor must return real streamed text.');
  assert.doesNotMatch(aiStream, /^3:/m, 'AI tutor stream must not report a provider error.');
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

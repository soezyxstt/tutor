import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, mkdir, readFile, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { build } from 'esbuild';
import { checkCourseRuntime } from '../scripts/check-course-runtime.mjs';
import { generateCatalog } from '../scripts/generate-catalog.mjs';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ts = createRequire(join(repositoryRoot, 'packages/core/package.json'))('typescript');

test('a real generated course inherits the shared UI, agent tools, and central model settings', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'tutor-new-course-'));
  const app = join(root, 'apps', 'sample-course');
  try {
    await mkdir(join(root, 'scripts'), { recursive: true });
    await cp(join(repositoryRoot, 'apps/starter'), join(root, 'apps/starter'), {
      recursive: true, filter: (path) => !['node_modules', 'dist', '.wrangler', '.dev.vars'].includes(path.split('/').at(-1)),
    });
    for (const file of ['new-course.mjs', 'check-course-runtime.mjs']) await cp(join(repositoryRoot, 'scripts', file), join(root, 'scripts', file));
    await cp(join(repositoryRoot, 'tsconfig.base.json'), join(root, 'tsconfig.base.json'));
    await cp(join(repositoryRoot, 'COURSES.md'), join(root, 'COURSES.md'));
    await symlink(join(repositoryRoot, 'packages'), join(root, 'packages'), 'dir');
    const generated = spawnSync(process.execPath, [join(root, 'scripts/new-course.mjs'), '--slug', 'sample-course', '--name', 'Sample Course', '--code', 'SC1001'], { encoding: 'utf8' });
    assert.equal(generated.status, 0, generated.stderr);
    assert.deepEqual(checkCourseRuntime(app, root), []);
    const workflow = await readFile(join(root, '.github/workflows/deploy-sample-course.yml'), 'utf8');
    for (const requirement of ['packages/core/**', 'packages/ui/**', 'pnpm validate', 'pnpm test', 'CF_AIG_TOKEN']) assert.ok(workflow.includes(requirement), requirement);
    assert.deepEqual((await generateCatalog({ rootDir: root, outputPath: join(root, 'catalog.json') })).courses, [], 'The generated draft stays out of the public catalog.');

    // A course may alias imports and register its own lazy visual while keeping
    // the actual shared app. Public agent controls need no copied implementation.
    const entry = join(app, 'src/main.tsx');
    await writeFile(entry, (await readFile(entry, 'utf8'))
      .replace("import { TutorApp } from '@tutor/core';", "import { TutorApp as CourseApp, registerSimulation } from '@tutor/core';\nregisterSimulation('sample-control', () => import('./simulations/sample-control'));")
      .replace('<TutorApp ', '<CourseApp '));
    await mkdir(join(app, 'src/simulations'));
    await writeFile(join(app, 'src/simulations/sample-control.tsx'), "import { AgentButton } from '@tutor/core';\nexport default function SampleControl() { return <AgentButton aria-label=\"Sample visual control\">Reset</AgentButton>; }\n");
    assert.deepEqual(checkCourseRuntime(app, root), []);
    // Reuse installed workspace dependencies without touching the repository's
    // app list or lockfile. All generated source still comes from the CLI.
    await symlink(join(repositoryRoot, 'apps/starter/node_modules'), join(app, 'node_modules'), 'dir');
    const browserBuild = await build({ entryPoints: [entry], bundle: true, platform: 'browser', format: 'esm', jsx: 'automatic', loader: { '.css': 'empty' }, write: false, metafile: true, logLevel: 'silent' });
    const included = Object.values(browserBuild.metafile.outputs).flatMap((output) => Object.entries(output.inputs).filter(([, value]) => value.bytesInOutput > 0).map(([path]) => path));
    for (const file of ['app/tutor-app.tsx', 'content/problem-view.tsx', 'ai/inline-ai-thread.tsx', 'ai/agent-runtime.ts', 'ai/selection-ai-popover.tsx', 'ai/ui-sdk/interactive-simulation.tsx']) {
      assert.ok(included.some((path) => path.endsWith(`packages/core/src/${file}`)), `Generated browser build includes the actual shared ${file}`);
    }

    const workerFile = join(root, 'generated-worker.mjs');
    await build({ entryPoints: [join(app, 'src/worker.ts')], bundle: true, platform: 'node', format: 'esm', outfile: workerFile, logLevel: 'silent' });
    const { default: worker } = await import(pathToFileURL(workerFile).href);
    const config = ts.parseConfigFileTextToJson('wrangler.jsonc', await readFile(join(app, 'wrangler.jsonc'), 'utf8')).config;
    let settingsReads = 0;
    let payload;
    const env = { ...config.vars, CF_ACCOUNT_ID: 'scaffold-test-account', CF_AIG_TOKEN: 'scaffold-test-token', TUTOR_CONFIG: {
      fetch: async () => { settingsReads++; return Response.json({ primaryModel: 'openai/gpt-4o-mini', fallbackModels: [], source: 'admin' }); },
    } };
    t.mock.method(globalThis, 'fetch', async (_input, init) => {
      payload = JSON.parse(String(init.body));
      const chunk = { id: 'scaffold-test', object: 'chat.completion.chunk', created: 1, model: payload.model, choices: [{ index: 0, delta: {}, finish_reason: 'stop' }] };
      return new Response(`data: ${JSON.stringify(chunk)}\n\ndata: [DONE]\n\n`, { headers: { 'Content-Type': 'text/event-stream' } });
    });
    const health = await (await worker.request('/api/health', {}, env)).json();
    assert.equal(health.ai.mode, 'byok');
    assert.equal(health.ai.settingsSource, 'admin');
    assert.deepEqual(health.ai.models, ['openai/gpt-4o-mini']);
    const reply = await worker.request('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ courseTitle: 'Sample Course', messages: [{ role: 'user', content: 'Show an interactive response.' }] }) }, env);
    assert.equal(reply.status, 200);
    await reply.text();
    assert.equal(settingsReads, 1, 'The generated worker uses the shared catalog binding and its normal cache.');
    for (const name of ['snapshot', 'query', 'act', 'renderInteractiveSimulation']) assert.ok(payload.tools.some((tool) => tool.function.name === name), name);

    await t.test('validation catches a forked entry or broken inherited settings without rejecting course visuals', async () => {
      const breakFile = async (file, mutate, expectedFile) => {
        const path = join(app, file);
        const original = await readFile(path, 'utf8');
        await writeFile(path, mutate(original));
        try { assert.ok(checkCourseRuntime(app, root).some((issue) => issue.file === expectedFile), file); }
        finally { await writeFile(path, original); }
      };
      await breakFile('src/main.tsx', (text) => text.replace('<CourseApp course={course} />', '<div>Separate course UI</div>'), 'src/main.tsx');
      await breakFile('src/worker.ts', () => 'export default { fetch() { return new Response("Separate tutor"); } };', 'src/worker.ts');
      await breakFile('src/styles.css', (text) => text.replace('@layer ui-sdk;', ''), 'src/styles.css');
      await breakFile('wrangler.jsonc', () => JSON.stringify({ ...config, services: {}, assets: { ...config.assets, run_worker_first: 7 } }), 'wrangler.jsonc');
      await breakFile('package.json', (text) => text.replace('"@tutor/core": "workspace:*"', '"@tutor/core": "0.0.1"'), 'package.json');
      assert.deepEqual(checkCourseRuntime(app, root), []);
    });
  } finally { await rm(root, { recursive: true, force: true }); }
});

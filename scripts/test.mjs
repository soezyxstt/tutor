import { build } from 'esbuild';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

// Keep external DOM-test dependencies resolvable from @tutor/core.
const directory = await mkdtemp(join('packages/core/node_modules', '.tutor-tests-'));
try {
  const serverTest = join(directory, 'admin.test.mjs');
  await build({ entryPoints: ['tests/admin.test.ts'], bundle: true, platform: 'node', format: 'esm', outfile: serverTest, logLevel: 'warning' });
  const coreTests = [];
  for (const filename of (await readdir('packages/core/tests')).filter((name) => /\.test\.(?:mjs|tsx?)$/.test(name)).sort()) {
    const input = join('packages/core/tests', filename);
    if (filename.endsWith('.mjs')) {
      coreTests.push(input);
    } else {
      const output = join(directory, `core-${filename.replace(/\.tsx?$/, '.cjs')}`);
      await build({ entryPoints: [input], bundle: true, platform: 'node', format: 'cjs', external: ['jsdom'], outfile: output, logLevel: 'warning' });
      coreTests.push(output);
    }
  }
  const courseTests = [];
  for (const app of await readdir('apps', { withFileTypes: true })) {
    if (!app.isDirectory()) continue;
    const testDirectory = join('apps', app.name, 'tests');
    const entries = await readdir(testDirectory).catch((error) => {
      if (error.code === 'ENOENT') return [];
      throw error;
    });
    for (const filename of entries.filter((name) => name.endsWith('.test.ts')).sort()) {
      const output = join(directory, `${app.name}-${filename.replace(/\.ts$/, '.cjs')}`);
      await build({ entryPoints: [join(testDirectory, filename)], bundle: true, platform: 'node', format: 'cjs', outfile: output, logLevel: 'warning' });
      courseTests.push(output);
    }
  }
  const result = spawnSync(process.execPath, ['--experimental-strip-types', '--test', serverTest, 'tests/admin.workerd.mjs', 'tests/catalog.test.mjs', 'tests/contrast.test.mjs', ...coreTests, ...courseTests], { stdio: 'inherit' });
  process.exitCode = result.status ?? 1;
} finally {
  await rm(directory, { recursive: true, force: true });
}

import { build } from 'esbuild';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const directory = await mkdtemp(join(tmpdir(), 'tutor-tests-'));
try {
  const serverTest = join(directory, 'admin.test.mjs');
  await build({ entryPoints: ['tests/admin.test.ts'], bundle: true, platform: 'node', format: 'esm', outfile: serverTest, logLevel: 'warning' });
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
  const result = spawnSync(process.execPath, ['--experimental-strip-types', '--test', serverTest, 'tests/admin.workerd.mjs', 'tests/catalog.test.mjs', 'tests/contrast.test.mjs', 'packages/core/tests/i18n.test.mjs', ...courseTests], { stdio: 'inherit' });
  process.exitCode = result.status ?? 1;
} finally {
  await rm(directory, { recursive: true, force: true });
}

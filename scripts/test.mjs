import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const directory = await mkdtemp(join(tmpdir(), 'tutor-tests-'));
try {
  const serverTest = join(directory, 'admin.test.mjs');
  await build({ entryPoints: ['tests/admin.test.ts'], bundle: true, platform: 'node', format: 'esm', outfile: serverTest, logLevel: 'warning' });
  const result = spawnSync(process.execPath, ['--experimental-strip-types', '--test', serverTest, 'tests/admin.workerd.mjs', 'tests/catalog.test.mjs', 'packages/core/tests/i18n.test.mjs'], { stdio: 'inherit' });
  process.exitCode = result.status ?? 1;
} finally {
  await rm(directory, { recursive: true, force: true });
}

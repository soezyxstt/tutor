import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const [slug, previewId = 'preview'] = process.argv.slice(2);
if (!/^[a-z0-9-]+$/.test(slug ?? '') || !/^[a-z0-9-]+$/.test(previewId)) {
  throw new Error('Usage: node scripts/prepare-course-preview.mjs <course-slug> [preview-id]');
}
const directory = resolve('apps', slug);
const require = createRequire(resolve(directory, 'package.json'));
const { parseConfigFileTextToJson } = require('typescript');
const parsed = parseConfigFileTextToJson('wrangler.jsonc', readFileSync(resolve(directory, 'wrangler.jsonc'), 'utf8'));
if (parsed.error) throw new Error('Course Worker configuration is invalid.');
const config = { ...parsed.config, name: `tutor-${slug}-${previewId}`, routes: [], workers_dev: true, preview_urls: true };
writeFileSync(resolve(directory, '.wrangler-preview.json'), JSON.stringify(config, null, 2) + '\n');
console.log(`Prepared ${config.name} with no production domain routes.`);

#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const starterDir = join(rootDir, 'apps', 'starter');

function parseArgs(argv) {
  const opts = {};
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      opts.help = true;
    } else if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        throw new Error(`Missing value for --${key}`);
      }
      opts[key] = next;
      i++;
    } else {
      positional.push(arg);
    }
  }
  if (!opts.slug && positional[0]) opts.slug = positional[0];
  if (!opts.name && positional[1]) opts.name = positional[1];
  return opts;
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || !opts.slug) {
    console.log(`Usage:
  pnpm new-course --slug <slug> [--name "<Nama Mata Kuliah>"] [--code <KODE>]

Example:
  pnpm new-course --slug mekanika-fluida --name "Mekanika Fluida" --code MS2101`);
    process.exit(opts.help ? 0 : 1);
  }

  const slug = slugify(opts.slug);
  if (!slug) {
    throw new Error('Invalid slug.');
  }

  const name = opts.name || toTitle(slug);
  const code = (opts.code || slug.slice(0, 4).toUpperCase() + '101').toUpperCase();
  const domain = `${slug}.tutor.adihnursyam.com`;
  const targetDir = join(rootDir, 'apps', slug);

  if (existsSync(targetDir)) {
    throw new Error(`Directory apps/${slug} already exists.`);
  }

  cpSync(starterDir, targetDir, { recursive: true });

  // Update package.json
  const pkgPath = join(targetDir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  pkg.name = `@tutor/app-${slug}`;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

  // Update wrangler.jsonc
  const wranglerPath = join(targetDir, 'wrangler.jsonc');
  const wranglerContent = readFileSync(wranglerPath, 'utf8')
    .replace('"tutor-starter"', `"tutor-${slug}"`)
    .replace('starter.tutor.adihnursyam.com', domain);
  writeFileSync(wranglerPath, wranglerContent);

  // Update index.html
  const htmlPath = join(targetDir, 'index.html');
  const html = readFileSync(htmlPath, 'utf8').replace(
    '<title>Mata Kuliah · Tutor</title>',
    `<title>${name} · Tutor</title>`
  );
  writeFileSync(htmlPath, html);

  // Update src/content/course.ts
  const coursePath = join(targetDir, 'src', 'content', 'course.ts');
  const courseContent = readFileSync(coursePath, 'utf8')
    .replace("slug: 'starter'", `slug: '${slug}'`)
    .replace("code: 'MK1001'", `code: '${code}'`)
    .replace("title: 'Nama Mata Kuliah'", `title: '${name}'`)
    .replace('starter.tutor.adihnursyam.com', domain);
  writeFileSync(coursePath, courseContent);

  // Create GitHub Actions workflow
  const workflowDir = join(rootDir, '.github', 'workflows');
  mkdirSync(workflowDir, { recursive: true });
  const workflowPath = join(workflowDir, `deploy-${slug}.yml`);
  const workflowYaml = `name: Deploy ${name}

on:
  push:
    branches: [main]
    paths:
      - 'apps/${slug}/**'
      - 'packages/ui/**'
      - 'packages/core/**'
      - 'pnpm-lock.yaml'
      - 'pnpm-workspace.yaml'
      - 'package.json'
      - '.github/workflows/deploy-${slug}.yml'
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: deploy-tutor-${slug}
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-24.04
    timeout-minutes: 15
    env:
      WRANGLER_SEND_METRICS: 'false'
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: false

      - uses: pnpm/action-setup@v4
        with:
          version: 12.21.0

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build ${name}
        run: pnpm --filter @tutor/app-${slug} build

      - name: Deploy to Cloudflare Workers (${domain})
        working-directory: apps/${slug}
        env:
          CLOUDFLARE_ACCOUNT_ID: \${{ secrets.CF_ACCOUNT_ID }}
          CLOUDFLARE_API_TOKEN: \${{ secrets.CF_DEPLOY_PAGES_TOKEN }}
        run: pnpm exec wrangler deploy
`;
  writeFileSync(workflowPath, workflowYaml);

  // Register new course in COURSES.md automatically
  const coursesIndexPath = join(rootDir, 'COURSES.md');
  if (existsSync(coursesIndexPath)) {
    const indexContent = readFileSync(coursesIndexPath, 'utf8');
    if (!indexContent.includes(`| \`${slug}\` |`)) {
      const newRow = `| \`${slug}\` | \`${code}\` | ${name} | \`https://${domain}\` | \`tutor-${slug}\` | \`.github/workflows/deploy-${slug}.yml\` | Draft | *(Belum diisi — perbarui setelah konten selesai)* |`;
      const marker = '## Infrastruktur & Secret Bersama';
      const updated = indexContent.includes(marker)
        ? indexContent.replace(marker, `${newRow}\n\n${marker}`)
        : `${indexContent.trimEnd()}\n${newRow}\n`;
      writeFileSync(coursesIndexPath, updated);
    }
  }

  console.log(`Created new course app at apps/${slug}`);
  console.log(`  Domain   : https://${domain}`);
  console.log(`  Workflow : .github/workflows/deploy-${slug}.yml`);
  console.log(`  Indexed  : COURSES.md`);
  console.log(`\nNext steps:`);
  console.log(`  pnpm install`);
  console.log(`  pnpm --filter @tutor/app-${slug} dev`);
}

main();

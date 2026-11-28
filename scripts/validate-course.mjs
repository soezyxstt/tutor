#!/usr/bin/env node
/**
 * Lapis 1 & Lapis 2 Course Validator (Schema, KaTeX Balance, Pedagogical Linter)
 * Runs across all apps/<slug>/src/content/*.ts files.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const appsDir = join(rootDir, 'apps');

let errors = 0;
let warnings = 0;

function error(file, msg) {
  console.error(`  [ERROR] ${file}: ${msg}`);
  errors++;
}

function warn(file, msg) {
  console.warn(`  [WARN]  ${file}: ${msg}`);
  warnings++;
}

function checkFile(filePath, relPath) {
  const src = readFileSync(filePath, 'utf8');

  // 1. Check duplicate lesson slugs inside the same file
  const seenSlugs = new Set();
  for (const m of src.matchAll(/\bslug:\s*['"`]([^'"`]+)['"`]/g)) {
    const slug = m[1];
    if (seenSlugs.has(slug)) {
      error(relPath, `Duplicate slug "${slug}"`);
    }
    seenSlugs.add(slug);
  }

  // 2. Check KaTeX display math $$ parity
  const displayDelims = (src.match(/\$\$/g) || []).length;
  if (displayDelims % 2 !== 0) {
    error(relPath, `Unbalanced KaTeX display delimiters (found ${displayDelims} "$$")`);
  }

  // 3. Check rubric weight sums if essayTasks / rubric blocks exist
  const rubricBlocks = src.matchAll(/rubric:\s*\[([\s\S]*?)\]/g);
  for (const rb of rubricBlocks) {
    const weights = [...rb[1].matchAll(/weight:\s*(\d+(?:\.\d+)?)/g)].map((w) =>
      Number(w[1])
    );
    if (weights.length > 0) {
      const sum = weights.reduce((a, b) => a + b, 0);
      if (Math.abs(sum - 100) > 0.01) {
        error(relPath, `Rubric weights sum to ${sum}% (must equal 100%)`);
      }
    }
  }

  // 4. Pedagogical Linter: warn on any single prose paragraph > 180 words inside body/intuition
  const bodyBlocks = src.matchAll(/body:\s*`([\s\S]*?)`/g);
  for (const b of bodyBlocks) {
    const paragraphs = b[1].split(/\n\s*\n/);
    for (const p of paragraphs) {
      const trimmed = p.trim();
      if (!trimmed || trimmed.startsWith('|') || trimmed.startsWith('$$') || trimmed.startsWith('#')) {
        continue;
      }
      const words = trimmed.split(/\s+/).filter(Boolean).length;
      if (words > 180) {
        warn(
          relPath,
          `Paragraph has ${words} words (> 180 word anti-wall-of-text limit). Consider chunking or adding a Decision Check.`
        );
      }
    }
  }
}

function main() {
  if (!existsSync(appsDir)) {
    console.log('No apps directory found.');
    return;
  }

  const apps = readdirSync(appsDir, { withFileTypes: true }).filter((d) =>
    d.isDirectory()
  );

  let checkedCount = 0;
  for (const app of apps) {
    const contentDir = join(appsDir, app.name, 'src', 'content');
    if (!existsSync(contentDir)) continue;
    const files = readdirSync(contentDir).filter((f) => f.endsWith('.ts'));
    for (const f of files) {
      const full = join(contentDir, f);
      const rel = `apps/${app.name}/src/content/${f}`;
      checkFile(full, rel);
      checkedCount++;
    }
  }

  console.log(
    `Validated ${checkedCount} course content file(s): ${errors} error(s), ${warnings} warning(s).`
  );
  if (errors > 0) {
    process.exit(1);
  }
}

main();

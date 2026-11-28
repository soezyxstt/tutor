import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ts = createRequire(join(repositoryRoot, 'packages/core/package.json'))('typescript');

function contains(node, predicate) {
  return predicate(node) || !!ts.forEachChild(node, (child) => contains(child, predicate) || undefined);
}

function importedNames(source, module, exported) {
  const names = new Set();
  for (const node of source.statements) {
    if (!ts.isImportDeclaration(node) || node.moduleSpecifier.text !== module || node.importClause?.isTypeOnly) continue;
    const bindings = node.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const item of bindings.elements) if (!item.isTypeOnly && (item.propertyName?.text ?? item.name.text) === exported) names.add(item.name.text);
    }
  }
  return names;
}

/** Check only the shared course boundary. Course content and custom simulation
 * registration remain free to grow behind these entrypoints. */
export function checkCourseRuntime(appDirectory, rootDir = repositoryRoot) {
  const issues = [];
  const fail = (file, message) => issues.push({ file, message });
  const read = (file) => {
    const path = join(appDirectory, file);
    if (!existsSync(path)) { fail(file, 'Missing shared course entrypoint.'); return ''; }
    return readFileSync(path, 'utf8');
  };
  const parse = (file, kind) => ts.createSourceFile(file, read(file), ts.ScriptTarget.Latest, true, kind);
  const main = parse('src/main.tsx', ts.ScriptKind.TSX);
  const apps = importedNames(main, '@tutor/core', 'TutorApp');
  const roots = importedNames(main, 'react-dom/client', 'createRoot');
  const rootVariables = new Set();
  const rootCall = (node) => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && roots.has(node.expression.text);
  contains(main, (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && rootCall(node.initializer)) rootVariables.add(node.name.text);
    return false;
  });
  const mountsSharedApp = contains(main, (node) => ts.isCallExpression(node)
    && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === 'render'
    && (rootCall(node.expression.expression) || (ts.isIdentifier(node.expression.expression) && rootVariables.has(node.expression.expression.text)))
    && node.arguments.some((argument) => contains(argument, (child) => (ts.isJsxOpeningElement(child) || ts.isJsxSelfClosingElement(child)) && ts.isIdentifier(child.tagName) && apps.has(child.tagName.text))));
  if (!mountsSharedApp) fail('src/main.tsx', 'Mount TutorApp from @tutor/core through createRoot; keep shared layout and tutor in packages/core.');
  if (!main.statements.some((node) => ts.isImportDeclaration(node) && node.moduleSpecifier.text === './styles.css')) fail('src/main.tsx', 'Import ./styles.css for the shared UI and agent control styles.');

  const worker = parse('src/worker.ts', ts.ScriptKind.TS);
  const factories = importedNames(worker, '@tutor/core/worker', 'createTutorWorker');
  if (!worker.statements.some((node) => ts.isExportAssignment(node) && !node.isExportEquals && ts.isCallExpression(node.expression) && ts.isIdentifier(node.expression.expression) && factories.has(node.expression.expression.text) && node.expression.arguments.length === 0)) {
    fail('src/worker.ts', 'Export createTutorWorker() from @tutor/core/worker so the course inherits the shared prompt, tools, and gateway.');
  }

  const css = read('src/styles.css').replace(/\/\*[\s\S]*?\*\//g, '');
  const imports = [...css.matchAll(/@import\s+['"]([^'"]+)['"]/g)];
  const tailwind = imports.find((match) => match[1] === 'tailwindcss');
  const agentLayer = [...css.matchAll(/@layer\s+([^;{}]+);/g)].find((match) => match[1].split(',')[0].trim() === 'ui-sdk');
  if (!tailwind || !agentLayer || agentLayer.index > tailwind.index) fail('src/styles.css', 'Declare @layer ui-sdk before importing tailwindcss.');
  for (const stylesheet of ['@tutor/ui/styles.css', 'katex/dist/katex.min.css']) {
    if (!imports.some((match) => match[1] === stylesheet)) fail('src/styles.css', `Import ${stylesheet}.`);
  }
  const sources = [...css.matchAll(/@source\s+['"]([^'"]+)['"]/g)].map((match) => resolve(appDirectory, 'src', match[1]));
  for (const packageName of ['core', 'ui']) {
    if (!sources.includes(resolve(rootDir, 'packages', packageName, 'src'))) fail('src/styles.css', `Include packages/${packageName}/src in Tailwind @source.`);
  }

  try {
    const pkg = JSON.parse(read('package.json'));
    for (const name of ['@tutor/core', '@tutor/ui']) if (pkg.dependencies?.[name] !== 'workspace:*') fail('package.json', `${name} must use workspace:* to inherit shared releases.`);
  } catch { fail('package.json', 'Invalid package JSON.'); }
  const parsed = ts.parseConfigFileTextToJson('wrangler.jsonc', read('wrangler.jsonc'));
  if (parsed.error) fail('wrangler.jsonc', 'Invalid Worker configuration.');
  else {
    const config = parsed.config ?? {};
    if (config.main !== 'src/worker.ts') fail('wrangler.jsonc', 'Use src/worker.ts as the shared API entrypoint.');
    const workerFirst = config.assets?.run_worker_first;
    if (workerFirst !== true && !(Array.isArray(workerFirst) && workerFirst.includes('/api/*'))) fail('wrangler.jsonc', 'Route /api/* through the course Worker before SPA assets.');
    if (!(Array.isArray(config.services) && config.services.some((service) => service?.binding === 'TUTOR_CONFIG' && service?.service === 'tutor-catalog')) || config.vars?.TUTOR_CONFIG_URL !== 'https://tutor.adihnursyam.com/api/tutor-config') fail('wrangler.jsonc', 'Inherit model settings through TUTOR_CONFIG bound to tutor-catalog and its shared config URL.');
    if (config.vars?.AI_GATEWAY_BYOK !== 'true' || config.vars?.CF_AI_GATEWAY_ID !== 'tutor-ai-gateway') fail('wrangler.jsonc', 'Use the shared tutor-ai-gateway with AI_GATEWAY_BYOK enabled.');
  }
  return issues;
}

export function assertCourseRuntime(appDirectory, rootDir = repositoryRoot) {
  const issues = checkCourseRuntime(appDirectory, rootDir);
  if (issues.length) throw new Error(issues.map(({ file, message }) => `${appDirectory}/${file}: ${message}`).join('\n'));
}

import { createAgent, type AgentComponent, type AgentStep } from '@ui-sdk/react/agent';
import { elementOf } from '@ui-sdk/react/observe';
import { z } from 'zod';

const stepSchema = z.object({
  ref: z.string().min(1).max(200),
  action: z.string().min(1).max(80),
  args: z.array(z.unknown()).max(8).optional(),
}).strict();
const actSchema = z.object({ steps: z.array(stepSchema).min(1).max(8) }).strict();
const querySchema = z.object({
  text: z.string().max(160).optional(),
  within: z.string().max(200).optional(),
  kind: z.string().max(50).optional(),
  from: z.number().int().min(0).max(500).optional(),
  closed: z.boolean().optional(),
}).strict();

type Bridge = ReturnType<typeof createAgent>;
type RecentChange = { ref: string; label?: string; key: string; value: unknown; source: string };
let bridge: Bridge | undefined;
let activeScope: string | undefined;
let pending: Promise<unknown> = Promise.resolve();
const changes = new Map<string, RecentChange[]>();

function scopeFor(ref: string): string | undefined {
  const element = elementOf(ref);
  if (!element?.isConnected || !element.matches('[data-tutor-agent-control]')) return undefined;
  return element.closest('[data-tutor-agent-scope]')?.getAttribute('data-tutor-agent-scope') ?? undefined;
}

export function initializeTutorAgent(): Bridge | undefined {
  if (typeof document === 'undefined') return undefined;
  if (!bridge) {
    bridge = createAgent({
      allow: (step) => !step.confirm && !!activeScope && scopeFor(step.ref) === activeScope,
      timeout: 5_000,
    });
    bridge.subscribe((change) => {
      const scope = scopeFor(change.ref);
      if (!scope || change.source === 'agent') return;
      const recent = changes.get(scope) ?? [];
      const next = recent.filter((entry) => entry.ref !== change.ref || entry.key !== change.key);
      next.push({ ref: change.ref, label: change.label, key: change.key, value: change.value, source: change.source });
      changes.set(scope, next.slice(-8));
      if (changes.size > 8) changes.delete(changes.keys().next().value!);
    });
  }
  return bridge;
}

function compact(component: AgentComponent): AgentComponent {
  const result: AgentComponent = {
    ref: component.ref,
    component: component.component,
    label: component.label?.slice(0, 160),
    actions: component.actions,
  };
  for (const key of ['value', 'min', 'max', 'step', 'checked', 'pressed', 'open', 'pending', 'disabled', 'more', 'confirm']) {
    const value = component[key];
    if (value !== undefined) result[key] = typeof value === 'string' ? value.slice(0, 200) : value;
  }
  const element = elementOf(component.ref);
  for (const key of ['pressed', 'expanded']) {
    const value = element?.getAttribute(`aria-${key}`);
    if (value === 'true' || value === 'false') result[key] = value === 'true';
  }
  if (component.items) result.items = component.items.slice(0, 20).map((item) => ({ value: item.value, label: item.label.slice(0, 120) }));
  return result;
}

function scopedComponents(scope: string, components?: AgentComponent[]): AgentComponent[] {
  return (components ?? initializeTutorAgent()?.snapshot() ?? [])
    .filter((component) => !component.offPage && scopeFor(component.ref) === scope)
    .map(compact);
}

function boundedSnapshot(scope: string): AgentComponent[] {
  const entries = scopedComponents(scope);
  const result: AgentComponent[] = [];
  let characters = 0;
  for (const entry of entries) {
    const size = JSON.stringify(entry).length;
    if (result.length >= 40 || characters + size > 8_000) break;
    result.push(entry);
    characters += size;
  }
  if (entries.length > result.length) result.push({ ref: 'more', component: 'more', actions: [], more: entries.length - result.length });
  return result;
}

export function tutorUiContext(scope: string): string {
  const recentChanges = (changes.get(scope) ?? []).map((change) => ({ ...change, label: change.label?.slice(0, 160) }));
  changes.delete(scope);
  const context = { components: boundedSnapshot(scope), recentChanges };
  while (JSON.stringify(context).length > 10_000 && context.recentChanges.length) context.recentChanges.shift();
  return JSON.stringify(context);
}

async function resolveComponent(scope: string, ref: string): Promise<AgentComponent | undefined> {
  const components = scopedComponents(scope);
  const direct = components.find((component) => component.ref === ref);
  if (direct) return direct;
  const label = ref.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const matches = components.filter((component) => component.label?.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === label);
  if (matches.length === 1) return matches[0];
  if (matches.length > 1) return undefined;
  const found = await initializeTutorAgent()?.query({ within: ref });
  if (!Array.isArray(found)) return undefined;
  const scoped = scopedComponents(scope, found);
  return scoped.length === 1 ? scoped[0] : undefined;
}

function stepError(component: AgentComponent, step: AgentStep): string | undefined {
  if (!component.actions.includes(step.action)) return `Action ${step.action} is unavailable for ${component.label ?? component.ref}.`;
  if (step.action === 'setValue' && component.component === 'slider') {
    const argument = step.args?.[0];
    const values = Array.isArray(argument) ? argument : [argument];
    if (!values.length || values.length > 4 || values.some((value) => typeof value !== 'number' || !Number.isFinite(value))) return 'Slider values must be finite numbers.';
    const count = Array.isArray(component.value) ? component.value.length : 1;
    if (values.length !== count) return `This slider requires exactly ${count} value${count === 1 ? '' : 's'}.`;
    if (values.some((value) => (typeof component.min === 'number' && value < component.min) || (typeof component.max === 'number' && value > component.max))) return 'A slider value is outside its allowed range.';
  }
  return undefined;
}

function afterRender(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function scopeElement(scope: string): Element | undefined {
  return Array.from(document.querySelectorAll('[data-tutor-agent-scope]'))
    .find((element) => element.getAttribute('data-tutor-agent-scope') === scope);
}

function nextPaint(signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      signal?.removeEventListener('abort', finish);
      resolve();
    };
    const timeout = setTimeout(finish, 100);
    frame = requestAnimationFrame(finish);
    signal?.addEventListener('abort', finish, { once: true });
    if (signal?.aborted) finish();
  });
}

export async function settleTutorUi(scope: string, signal?: AbortSignal): Promise<void> {
  await nextPaint(signal);
  const root = scopeElement(scope);
  if (!root || signal?.aborted) return;
  const animations = Array.from(root.querySelectorAll('[data-tutor-transition]'))
    .flatMap((element) => element.getAnimations?.({ subtree: true }) ?? [])
    .filter((animation) => animation.playState === 'running' && animation.effect?.getComputedTiming().iterations !== Infinity);
  if (animations.length) {
    await new Promise<void>((resolve) => {
      const finish = () => {
        clearTimeout(timeout);
        signal?.removeEventListener('abort', finish);
        resolve();
      };
      const timeout = setTimeout(finish, 400);
      signal?.addEventListener('abort', finish, { once: true });
      void Promise.allSettled(animations.map((animation) => animation.finished)).then(finish);
    });
  }
  await nextPaint(signal);
}

async function waitForComponent(scope: string, ref: string, signal?: AbortSignal): Promise<AgentComponent | undefined> {
  const root = scopeElement(scope);
  if (!root || signal?.aborted) return undefined;
  return new Promise((resolve) => {
    let checking = false;
    let stopped = false;
    const finish = (component?: AgentComponent) => {
      if (stopped) return;
      stopped = true;
      observer.disconnect();
      clearTimeout(timeout);
      signal?.removeEventListener('abort', abort);
      resolve(component);
    };
    const check = async () => {
      if (checking || stopped) return;
      checking = true;
      const component = await resolveComponent(scope, ref);
      checking = false;
      if (component || !root.isConnected || signal?.aborted) finish(component);
    };
    const abort = () => finish();
    const observer = new MutationObserver(() => { void check(); });
    observer.observe(root, { childList: true, subtree: true });
    const timeout = setTimeout(() => finish(), 600);
    signal?.addEventListener('abort', abort, { once: true });
    void check();
  });
}

export function isTutorAgentTool(name: string): name is 'snapshot' | 'query' | 'act' {
  return name === 'snapshot' || name === 'query' || name === 'act';
}

export async function runTutorAgentTool(scope: string, name: string, input: unknown, signal?: AbortSignal): Promise<unknown> {
  const agent = initializeTutorAgent();
  if (!agent) return { ok: false, error: 'The lesson is not mounted.' };
  if (name === 'snapshot') {
    if (!z.object({}).strict().safeParse(input).success) return { ok: false, error: 'snapshot expects an empty object.' };
    return boundedSnapshot(scope);
  }
  if (name === 'query') {
    const parsed = querySchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: 'Invalid query arguments.' };
    if (parsed.data.closed) return { ok: false, error: 'Query only reads visible controls. Use act to open a named section first.' };
    const within = parsed.data.within ? await resolveComponent(scope, parsed.data.within) : undefined;
    if (parsed.data.within && !within) return { ok: false, error: 'The control is not in this lesson or its label is ambiguous. Call snapshot for its ref.' };
    const found = await agent.query({ ...parsed.data, within: within?.ref, closed: false });
    return Array.isArray(found) ? scopedComponents(scope, found).slice(0, 40) : { ok: false, error: 'No matching control is visible in this lesson.' };
  }
  if (name !== 'act') return { ok: false, error: 'Unknown UI tool.' };
  const parsed = actSchema.safeParse(input);
  if (!parsed.success || JSON.stringify(input).length > 8_000) return { ok: false, error: 'act expects one to eight valid steps.' };
  const run = async () => {
    const steps: Record<string, unknown>[] = [];
    activeScope = scope;
    try {
      for (const [index, requested] of parsed.data.steps.entries()) {
        if (signal?.aborted) return { ok: false, error: 'The turn was stopped.', steps };
        let component = await resolveComponent(scope, requested.ref);
        if (!component && index > 0) component = await waitForComponent(scope, requested.ref, signal);
        if (!component) return { ok: false, error: 'The control is not in this lesson or its label is ambiguous. Call snapshot for its ref.', steps };
        const error = stepError(component, requested);
        if (error) return { ok: false, error, steps };
        const result = await agent.act({ steps: [{ ...requested, ref: component.ref }] }, { signal });
        if (result.ok && requested.action === 'press') await settleTutorUi(scope, signal);
        else await afterRender();
        const current = await resolveComponent(scope, component.ref);
        steps.push({ step: index, ref: component.ref, action: requested.action, current, pending: current?.pending ?? false });
        if (!result.ok) return { ok: false, error: result.error?.message?.slice(0, 240) ?? 'The control refused this change.', steps };
        if (requested.action === 'setValue' && current && 'value' in current) {
          const expected = requested.args?.[0];
          const normalize = (value: unknown) => Array.isArray(value) ? value : [value];
          if (JSON.stringify(normalize(current.value)) !== JSON.stringify(normalize(expected))) return { ok: false, error: 'The requested value was not accepted. Read the actual control value.', steps };
        }
      }
      return { ok: true, steps };
    } finally {
      activeScope = undefined;
    }
  };
  const result = pending.then(run, run);
  pending = result.catch(() => undefined);
  return result.catch(() => ({ ok: false, error: 'The UI action could not finish. Call snapshot and try again.' }));
}

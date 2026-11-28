# IPE migration to the shared Tutor app

IPE uses `apps/ipe` and the shared `TutorApp`, content views, language preference,
learning store, design tokens, and Worker API. Its source is the previous IPE app
on `staging`, commit `802aead07004425dce164dd704f5f6a964a142fa`.

## Content and preservation

- MS3105, Instrumentasi, Pengukuran & Eksperimen.
- Eight topic modules with eight material lessons, 47 exam problems, and eight practice sets.
- The material lessons contain 30 short theory units with matching decision checks.
- All nine UTS 1, UTS 2, and UAS papers from 2023 to 2025 remain available.
- All 419 original explanation steps, 30 concept questions, source quotations,
  page locators, assumptions, tables, answers, and 90 source visuals remain available.
- Each module includes a concept decision, guided task, and independent response
  with three hints and a rubric totaling 100%.
- All 63 lessons have complete English overlays with stable content IDs.

Content lives in native `CourseModule` files. There is no legacy app shell or
runtime content adapter. The small simulation factory translates fixed visual
specifications into shared controls. Heavy plots and 3D load through the registry.

The shared views now render the existing `examHook`, `microUnits`, `guidedTasks`,
and `essayTasks` fields. Optional source metadata and per-step visuals also live
in core so other courses can reuse them.

The [reference audit](ipe-reference-audit.md) records all three supplied course
PDFs, their page counts, the duplicate Part 2 check, two verified source errata,
and the page mapping for all 47 problems. The source update adds bilingual
source notes to 41 problems and expands theory from 8 to 30 units while retaining
the original exam baseline. Shared problem, simulation, and step AI contexts
include those notes and the relevant reference titles, pages, and links.

Old `#soal/<id>` and `#latihan` links still open the matching content. On the same
hostname, IPE imports recognized saved questions, completion flags, practice
answers, and open-step progress once. Existing shared progress takes precedence.
The migration retains the old storage keys and runs safely without storage access.

## Shared reading palette and UI fixes

The shared [theme tokens](../packages/ui/src/styles/tokens.css) use cool neutral
reading surfaces and blue actions in both modes. Light mode uses deep blue
controls with white labels. Dark mode uses lighter blue controls with deep blue
labels, alongside a dark reading surface and light body text.

| Token | Light mode | Dark mode |
| --- | --- | --- |
| `--background` | `#f7f8fa` | `#101923` |
| `--foreground` | `#17283b` | `#e7eef7` |
| `--surface-subtle` | `#eef2f6` | `#172332` |
| `--muted-foreground` | `#46586d` | `#b5c3d6` |
| `--primary` | `#1d4e89` | `#93bdf4` |
| `--primary-foreground` | `#ffffff` | `#102a46` |

The shared [step view](../packages/core/src/content/step-disclosure.tsx) includes
three related fixes:

- Selected checkpoint labels inherit their button's state foreground through
  `MathMarkdown`. The shared prose styles no longer reset them to the page text
  color; headings and emphasis also inherit the surrounding text color.
- Correct and wrong choices show a check or cross icon plus translated text
  feedback. Selection uses `aria-pressed`, and the feedback has `role="status"`.
- The renderer removes a matching numeric title prefix, such as `1.` or `1)`,
  when the step number already appears beside it. This changes display only;
  stored source titles and preservation fingerprints remain unchanged.

The following contrast ratios come from the actual token values, using sRGB
relative luminance and `(Llighter + 0.05) / (Ldarker + 0.05)`. Values shown here
round to two decimals; the tests compare unrounded values.

| Pair | Light mode | Dark mode |
| --- | --- | --- |
| Body text: `foreground` on `background` | 14.08:1 | 15.16:1 |
| Secondary text: `muted-foreground` on `background` | 6.87:1 | 9.91:1 |
| Link text: `primary` on `background` | 7.89:1 | 9.13:1 |
| Primary button: `primary-foreground` on `primary` | 8.39:1 | 7.51:1 |
| Primary hover: `primary-foreground` on `primary-hover` | 10.95:1 | 9.21:1 |
| Correct choice: `success-foreground` on `success` | 7.16:1 | 7.94:1 |
| Wrong choice: `destructive-foreground` on `destructive` | 7.54:1 | 6.98:1 |
| Control boundary: `input` on `background` | 3.74:1 | 5.55:1 |
| Focus indicator: `ring` on `background` | 7.89:1 | 9.13:1 |

The six [contrast tests](../tests/contrast.test.mjs) cover both themes, including
solid selected states, 10% and 20% feedback tints, text surfaces, control
boundaries, focus colors, and graph-stroke colors. They use the
[WCAG text contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
of 4.5:1 for the tested text pairs and the
[non-text contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
of 3:1 for the tested controls and indicators. The scope is these token pairs
and component states; these checks do not constitute a full WCAG conformance
audit.

## AI runtime fixes

Commit `f092cca` fixes the shared AI request and streaming path. UI tools now use
provider-compatible schemas without the SDK's incompatible strict-output mode,
while returned tool calls still undergo Zod validation. The 25-second startup
deadline stops when response headers arrive, so it no longer aborts an accepted
answer as it streams. The gateway also normalizes missing Gemini tool-call
indices and preserves each call's continuation signature for later turns.
[Focused runtime tests](../tests/ai-runtime.test.ts) cover schema compatibility,
stream lifetime, and tool-conversation handling. These changes apply to the
shared Worker, including IPE problem and simulation tutor requests.

## Run and verify

```sh
pnpm install --frozen-lockfile
pnpm --filter @tutor/app-ipe dev
pnpm validate
pnpm typecheck
pnpm test
pnpm build
```

Tests compare source fingerprints, preserve all answer choices and links, parse
the actual Markdown and KaTeX in both languages, verify independent numerical
results, and check the shared learning views and progress migration.

## Preview and production

The IPE workflow builds and checks internal pull requests, then deploys a separate
`tutor-ipe-pr-<number>` Worker on its Workers preview URL. A preview has no custom
domain routes and reads the central model settings through `TUTOR_CONFIG`.
Fork pull requests cannot run the deployment job. Builds never receive secrets.

On `main`, the same workflow uses `tutor-ipe` and the domain declared in
`apps/ipe/wrangler.jsonc`. The catalog discovers the published course automatically.

The existing production hostname currently belongs to Pages project `ipe`
(`ipe-5lm.pages.dev`). The first production rollout needs a one-time domain
transfer after the new Worker passes checks. Deploy and verify the Worker first,
then detach only `ipe.tutor.adihnursyam.com` from that Pages project and attach it
to `tutor-ipe`. Keep the Pages project available during the transfer. The previous
proxied CNAME target is `ipe-5lm.pages.dev`, which provides a rollback destination.
The PR preview does not perform that transfer.

Do not point the old Pages build at the monorepo root. Future IPE changes belong
in this app and deploy through the Worker workflow.

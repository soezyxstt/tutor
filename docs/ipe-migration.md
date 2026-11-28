# IPE migration to the shared Tutor app

IPE uses `apps/ipe` and the shared `TutorApp`, content views, language preference,
learning store, design tokens, and Worker API. Its source is the previous IPE app
on `staging`, commit `802aead07004425dce164dd704f5f6a964a142fa`.

## Content and preservation

- MS3105, Instrumentasi, Pengukuran & Eksperimen.
- Eight topic modules with eight short lessons, 47 exam problems, and eight practice sets.
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

Old `#soal/<id>` and `#latihan` links still open the matching content. On the same
hostname, IPE imports recognized saved questions, completion flags, practice
answers, and open-step progress once. Existing shared progress takes precedence.
The migration retains the old storage keys and runs safely without storage access.

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

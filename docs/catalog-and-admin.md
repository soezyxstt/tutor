# Catalog, languages, and AI settings

## Public catalog

The catalog runs at `https://tutor.adihnursyam.com`. Its source is `apps/catalog`.
It uses the same `@tutor/ui` components and tokens as the course sites.

`scripts/generate-catalog.mjs` imports each `apps/*/src/content/course.ts` export.
It counts the real modules, materials, practice sets, solutions, and exam groups.
The catalog build and local development server run this generator automatically.
The deploy workflow watches every app, so a new course does not need a separate
catalog entry or a change to the workflow.

The generator skips `starter`, `catalog`, empty courses, and courses with
`catalog.listed: false` or `catalog.status: 'draft'`. `pnpm new-course` starts in
draft status. After authoring and validation, publish the course with:

```ts
catalog: { status: 'published' },
```

Push the authored course to `main`. Its course workflow deploys the destination
site, and the catalog workflow rebuilds the list. `COURSES.md` remains the human
index; the public catalog reads the actual course data, not this Markdown file.

## Language preference

Shared UI supports Indonesian and English. The first visit follows the client's
first browser language: `id` and `id-*` use Indonesian; other languages use
English. Users can choose Indonesian, English, or the system setting.

Preference order is a valid `?lang=id|en|system` link, the shared Tutor preference
cookie, local storage, then the system setting. Links carry the preference to
the selected course. The preference cookie contains only the language choice.
It shares across `tutor.adihnursyam.com` and its subdomains. Admin sessions use a
separate host-only cookie and never share across course subdomains.

Each course declares its source language and can provide translations:

```ts
import type { CourseConfig, CourseTranslation } from '@tutor/core';

const english: CourseTranslation = {
  title: 'Heat Transfer',
  subtitle: 'Materials, practice, and worked solutions.',
  modules: {
    conduction: {
      title: 'Conduction',
      items: {
        'plane-wall': {
          title: 'Heat transfer through a wall',
          // Translate the text fields of the source item here.
        },
      },
    },
  },
};

const course: CourseConfig = {
  // Existing course fields stay the same.
  sourceLanguage: 'id',
  translations: { en: english },
};
```

Translation overlays match modules and lessons by ID. Arrays such as solution
steps, practice questions, options, and simulation parameters match by `id` or
`key`. Overlays cannot change source IDs, item order, answer keys, or numerical
parameters. Switching languages keeps the active lesson and learning progress.

Missing text falls back to the source language with a visible notice. The catalog
distinguishes complete, partial, and unavailable translations by checking the
actual text. A translated title alone does not count as a translated lesson.

The demo includes complete Indonesian and English versions for all six items.
Follow the latest `bahasa-ajar` and `instructional-language` skills from
`soezyxstt/agent-skills` when writing either language. Do not substitute another
skill or duplicate those skill files in this repository.

## Admin and shared model settings

The admin page is `https://tutor.adihnursyam.com/admin`.

The deployment reads these existing GitHub Actions secrets:

| Secret | Purpose |
| --- | --- |
| `CF_ACCOUNT_ID` | Cloudflare account |
| `CF_DEPLOY_PAGES_TOKEN` | Worker deployment and runtime secret synchronization |
| `CF_AIG_TOKEN` | Authenticated AI Gateway requests using stored provider keys |
| `ADMIN_USERNAME` | Admin sign-in name |
| `ADMIN_PASSWORD` | Admin sign-in password |

Only the deploy and live-check steps receive the admin credentials. The build
never receives them. The workflow pipes credentials directly to Wrangler secret
storage and never prints them. An optional Worker secret `ADMIN_SESSION_SECRET`
can add signing material; changing either admin credential invalidates sessions.

`TutorAdminState` stores model settings, login limits, and revocable sessions in a
SQLite Durable Object. The session expires after eight hours. Mutations require
the exact admin origin, including when a request comes from a sibling course site.

Choose one primary model and up to five fallback models. Save once to apply the
choice across every course Worker. Course Workers read `/api/tutor-config`, cache
it for 30 seconds, and keep a last good result or environment defaults if the
catalog cannot respond. A fallback model runs when the previous request fails
before streaming begins; the server does not replay a partially emitted answer.

## Model inventory

The admin reads the provider model lists through AI Gateway BYOK:

| Provider | Gateway prefix |
| --- | --- |
| Muse AI | `custom-muse/` |
| Gemini AI Studio | `google-ai-studio/` |
| OpenAI | `openai/` |

The list retains all provider-reported IDs, including older models still listed.
Search by name or ID, filter by provider, or select **Text + media** to find known
multimodal input models. Input and tool capabilities come from provider metadata
or documented families. Unknown capabilities remain unknown.

The UI marks connected providers, cached lists, and unverified reference lists.
Refreshing requests a new list. If discovery fails, the server uses the last good
list for up to seven days, then reference data where available. A reference entry
does not guarantee current model access. Custom model IDs can be added with an
explicit acknowledgment when provider metadata is incomplete. Known incompatible
models remain visible but cannot be selected for the current chat endpoint.

Provider API keys stay in Cloudflare AI Gateway. The client never receives them.

## Commands and checks

```sh
pnpm dev:catalog
pnpm catalog:generate
pnpm validate
pnpm typecheck
pnpm test
pnpm build
```

For local admin work, build the catalog and run Wrangler in `apps/catalog`.
Put disposable development credentials in ignored `.dev.vars`. Do not copy
production secrets into local files. Vite proxies `/api` to port 8787.

The production workflow runs `scripts/verify-catalog.mjs` after deploy. The check
signs in using Actions secrets, reads settings and provider lists, checks origin
protection, then revokes its session. It does not change model choices or print
credentials, cookies, or upstream error bodies.

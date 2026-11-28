# Tutor Monorepo

Monorepo untuk platform pembahasan soal dan materi interaktif per mata kuliah dengan satu sistem UI bersama, di-deploy ke **Cloudflare Workers (Static Assets)** pada subdomain `<namamatakuliah>.tutor.adihnursyam.com`.

## Dokumentasi & Agent Skills

- `AGENTS.md` (+ `CLAUDE.md`): Panduan lengkap arsitektur, invarian desain UI, dan pipeline end-to-end bagi AI coding agent.
- `COURSES.md`: Indeks seluruh mata kuliah yang sudah ada, domain `<slug>.tutor.adihnursyam.com`, Worker, dan workflow CI/CD.
- `.agents/skills/`: Skill set siap pakai (`new-course-pipeline`, `author-course-content`, `build-course-simulation`).

## Struktur Workspace

- `packages/ui` (`@tutor/ui`): Sistem desain, palet warna kontras belajar (terang & gelap), primitif Shadcn/Radix UI (select tanpa border, icon button tanpa border/bg, tombol ringkas), dan animasi `motion/react`.
- `packages/core` (`@tutor/core`): Layout shell & sidebar collapsible, renderer Markdown + KaTeX, pembahasan bertahap (*progressive disclosure*), registry simulasi lazy-loaded (built-in RK4 Canvas solver, siap untuk R3F / Rapier / Mafs / ECharts), panel Tutor AI (Vercel AI SDK + *client-side tool calling*), state persisten Zustand, serta Cloudflare Worker AI handler (Hono + Cloudflare AI Gateway).
- `apps/demo` (`@tutor/app-demo`): Aplikasi showcase (Mekanika & Getaran + katalog Komponen Core UI di `?view=components`).
- `apps/starter` (`@tutor/app-starter`): Template bersih untuk membuat mata kuliah baru.
- `scripts/new-course.mjs`: Generator CLI untuk membuat app mata kuliah baru lengkap dengan `wrangler.jsonc` dan workflow GitHub Actions.

## Perintah Utama

```bash
pnpm install
pnpm dev:demo          # Jalankan showcase lokal
pnpm typecheck         # Typecheck seluruh workspace
pnpm build             # Build seluruh apps
pnpm new-course --slug perpan --name "Perpindahan Panas" --code MS3101
```

## Deployment Cloudflare Workers

Setiap aplikasi di `apps/<slug>` memiliki `wrangler.jsonc` dengan:
- Static assets (`./dist`) + SPA fallback
- Worker API (`/api/ai`) berbasis Hono + Vercel AI SDK + Cloudflare AI Gateway
- Custom domain `<slug>.tutor.adihnursyam.com`

Workflow GitHub Actions menggunakan secret `CF_ACCOUNT_ID` dan `CF_DEPLOY_PAGES_TOKEN`.

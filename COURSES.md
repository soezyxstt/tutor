# Indeks Mata Kuliah & Deployment (`COURSES.md`)

Daftar resmi seluruh deployment mata kuliah di monorepo `soezyxstt/tutor`.
Setiap mata kuliah di-host terpisah sebagai **Cloudflare Worker (Static Assets + Hono AI API)** pada subdomain `<slug>.tutor.adihnursyam.com`.

> **Catatan untuk AI Agent:** Selalu periksa tabel ini sebelum membuat app baru. Saat membuat mata kuliah baru lewat `pnpm new-course`, baris baru akan ditambahkan otomatis; lengkapi kolom ringkasan modul/ujian setelah konten selesai disusun.

## Daftar Deployment Aktif

| Slug | Kode | Mata Kuliah | Domain | Worker Name | Workflow CI/CD | Status | Ringkasan Konten & Ujian |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `demo` | `FI1101` | Mekanika & Getaran | `https://demo.tutor.adihnursyam.com` | `tutor-demo` | `.github/workflows/deploy-demo.yml` | Showcase / Core Reference | 2 modul (`M1 Osilasi Teredam`, `M2 Dinamika Benda Tegar`), 2 materi, 1 latihan, 3 pembahasan (`UTS 2024`, `UTS 2023`), simulasi RK4, katalog Core UI (`?view=components`) |
| `starter` | `MK1001` | Template Starter | `https://starter.tutor.adihnursyam.com` | `tutor-starter` | *(template — tidak di-deploy)* | Template | Template bersih untuk `pnpm new-course` |

## Infrastruktur & Secret Bersama

- **Hosting**: Cloudflare Workers dengan Static Assets (`./dist`) + API route `/api/ai` (`@tutor/core/worker`).
- **Custom Domain Pattern**: `<slug>.tutor.adihnursyam.com` (dideklarasikan di `apps/<slug>/wrangler.jsonc`).
- **GitHub Actions Secrets** (sudah terpasang di repo `soezyxstt/tutor`):
  - `CF_ACCOUNT_ID` → dipetakan ke `CLOUDFLARE_ACCOUNT_ID`
  - `CF_DEPLOY_PAGES_TOKEN` → dipetakan ke `CLOUDFLARE_API_TOKEN`
- **Runtime Worker Environment Variables (opsional per Worker di dashboard Cloudflare untuk AI live)**:
  - `OPENAI_API_KEY`: API key provider LLM
  - `CLOUDFLARE_AI_GATEWAY_URL`: URL Cloudflare AI Gateway (caching, rate-limit, fallback)
  - `AI_MODEL`: Nama model (default `gpt-4o-mini`)

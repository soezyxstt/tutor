# Indeks Mata Kuliah & Deployment (`COURSES.md`)

Daftar resmi seluruh deployment mata kuliah di monorepo `soezyxstt/tutor`.
Setiap mata kuliah di-host terpisah sebagai **Cloudflare Worker (Static Assets + Hono AI API)** pada subdomain `<slug>.tutor.adihnursyam.com`.

> **Catatan untuk AI Agent:** Selalu periksa tabel ini sebelum membuat app baru. Saat membuat mata kuliah baru lewat `pnpm new-course`, baris baru akan ditambahkan otomatis; lengkapi kolom ringkasan modul/ujian setelah konten selesai disusun.

## Daftar Deployment Aktif

Katalog pusat: `https://tutor.adihnursyam.com`, Worker `tutor-catalog`, workflow `.github/workflows/deploy-catalog.yml`. Admin: `/admin`. Katalog membaca app mata kuliah secara otomatis saat build.

| Slug | Kode | Mata Kuliah | Domain | Worker Name | Workflow CI/CD | Status | Ringkasan Konten & Ujian |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `demo` | `FI1101` | Mekanika & Getaran | `https://demo.tutor.adihnursyam.com` | `tutor-demo` | `.github/workflows/deploy-demo.yml` | Showcase / Core Reference | 2 modul (`M1 Osilasi Teredam`, `M2 Dinamika Benda Tegar`), 2 materi, 1 latihan, 3 pembahasan (`UTS 2024`, `UTS 2023`), simulasi RK4, katalog Core UI (`?view=components`) |
| `starter` | `MK1001` | Template Starter | `https://starter.tutor.adihnursyam.com` | `tutor-starter` | *(template — tidak di-deploy)* | Template | Template bersih untuk `pnpm new-course` |

## Infrastruktur & Secret Bersama

- **Hosting**: Cloudflare Workers dengan Static Assets (`./dist`) + API route `/api/ai` (`@tutor/core/worker`).
- **Custom Domain Pattern**: `<slug>.tutor.adihnursyam.com` (dideklarasikan di `apps/<slug>/wrangler.jsonc`).
- **GitHub Actions Secrets** (di repo `soezyxstt/tutor`):
  - `CF_ACCOUNT_ID` → dipetakan ke `CLOUDFLARE_ACCOUNT_ID` dan disuntikkan ke Worker var
  - `CF_DEPLOY_PAGES_TOKEN` → dipetakan ke `CLOUDFLARE_API_TOKEN`
  - `CF_AIG_TOKEN` *(pasang sekali di GitHub Secrets)* → otomatis disinkronkan ke seluruh Worker untuk **Cloudflare AI Gateway BYOK** (`tutor-ai-gateway`)
- **AI Providers (BYOK via Cloudflare AI Gateway `/compat`)**:
  - Model utama dan cadangan bisa diubah di `https://tutor.adihnursyam.com/admin`; pilihan berlaku untuk semua mata kuliah.
  - Primary default: `google-ai-studio/gemini-2.5-flash`
  - Fallback default: `openai/gpt-4o-mini` (bisa ditambah Muse AI via Custom Provider `custom-muse/<model>`)
  - Panduan lengkap setup AI Gateway BYOK & R2: [`docs/cloudflare-setup.md`](docs/cloudflare-setup.md)

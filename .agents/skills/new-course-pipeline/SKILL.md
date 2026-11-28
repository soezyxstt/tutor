---
name: new-course-pipeline
description: End-to-end pipeline for creating a new course deployment in the tutor monorepo, configuring its Cloudflare Workers custom domain (<slug>.tutor.adihnursyam.com), GitHub Actions workflow, and updating COURSES.md.
---
# New Course Deployment Pipeline

Gunakan skill ini saat pengguna meminta membuat pembahasan/materi untuk **mata kuliah baru** yang belum terdaftar di `COURSES.md`.

## Langkah 1 — Cek `COURSES.md`
Pastikan slug mata kuliah belum ada di `COURSES.md`. Pilih slug pendek, huruf kecil, tanpa spasi (contoh: `perpan`, `statistika`, `kalkulus-1`, `mekflu`). Domain otomatis menjadi:
```
https://<slug>.tutor.adihnursyam.com
```

## Langkah 2 — Jalankan Generator CLI
Dari root monorepo:
```bash
pnpm new-course --slug <slug> --name "<Nama Mata Kuliah>" --code <KODE>
pnpm install
```

Perintah ini otomatis membuat:
1. `apps/<slug>/` (disalin dari `apps/starter`, memakai `@tutor/core` dan `@tutor/ui`).
2. `apps/<slug>/wrangler.jsonc` dengan:
   - `name: "tutor-<slug>"`
   - `main: "src/worker.ts"` (menggunakan `createTutorWorker()` dari `@tutor/core/worker`)
   - `assets: { directory: "./dist", binding: "ASSETS", not_found_handling: "single-page-application" }`
   - `routes: [{ pattern: "<slug>.tutor.adihnursyam.com", custom_domain: true }]`
3. `.github/workflows/deploy-<slug>.yml` yang mem-build `@tutor/app-<slug>` dan menjalankan `wrangler deploy` dengan secret GitHub:
   - `CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}`
   - `CLOUDFLARE_API_TOKEN: ${{ secrets.CF_DEPLOY_PAGES_TOKEN }}`
4. Baris baru di `COURSES.md`.

## Langkah 3 — Susun Konten & Simulasi
- Ikuti skill `author-course-content` untuk mengisi `apps/<slug>/src/content/` (jika soal banyak, pecah per modul/ujian, misal `src/content/m1-konduksi.ts`, `src/content/m2-konveksi.ts`, lalu gabungkan di `src/content/course.ts`).
- Jika butuh visualisasi khusus (grafik ECharts, Mafs, solver numerik Canvas, 3D R3F/Rapier), ikuti skill `build-course-simulation`.

## Langkah 4 — Perbarui `COURSES.md`
Lengkapi kolom **Ringkasan Konten & Ujian** di `COURSES.md` (jumlah modul, daftar materi, latihan, paket ujian UTS/UAS, dan simulasi).

## Langkah 5 — Verifikasi Wajib
Jalankan dari root monorepo:
```bash
pnpm typecheck
pnpm --filter @tutor/app-<slug> build
```
Pastikan:
- 0 error TypeScript di seluruh workspace.
- Build produksi selesai bersih tanpa warning broken import.
- Bila diperlukan, jalankan `pnpm --filter @tutor/app-<slug> preview` dan verifikasi tampilan desktop & mobile.

## Langkah 6 — Deploy
- Commit pada feature branch atau push ke `main` sesuai instruksi pengguna.
- Workflow `.github/workflows/deploy-<slug>.yml` otomatis berjalan saat ada perubahan di `apps/<slug>/**`, `packages/ui/**`, atau `packages/core/**`, lalu men-deploy ke `https://<slug>.tutor.adihnursyam.com`.
- Untuk mengaktifkan AI Tutor live di production, set Worker environment variables `OPENAI_API_KEY`, `CLOUDFLARE_AI_GATEWAY_URL`, dan `AI_MODEL` pada Worker `tutor-<slug>` di dashboard Cloudflare (tanpa mengubah kode).

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
Dari root monorepo, jalankan `pnpm install` dahulu jika dependensi checkout belum terpasang. Lalu:
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

Pertahankan entry UI `TutorApp`, worker `createTutorWorker()`, dependensi `workspace:*`, dan CSS bersama dari starter. Generator memeriksa template sebelum menyalinnya. `pnpm validate` memeriksa batas yang sama pada setiap course: layer UI SDK, sumber Tailwind core/UI, rute API, gateway, dan binding setelan katalog. Tambahkan konten dan registrasi simulasi di app; ubah UI, prompt, atau alat Tutor yang berlaku umum di `packages/core` atau `packages/ui`.

## Langkah 3 — Susun Konten & Simulasi
- Ikuti skill `author-course-content` untuk mengisi `apps/<slug>/src/content/` (jika soal banyak, pecah per modul/ujian, misal `src/content/m1-konduksi.ts`, `src/content/m2-konveksi.ts`, lalu gabungkan di `src/content/course.ts`).
- Jika butuh visualisasi khusus (grafik ECharts, Mafs, solver numerik Canvas, 3D R3F/Rapier), ikuti skill `build-course-simulation`.

## Langkah 4 — Perbarui `COURSES.md`
Lengkapi kolom **Ringkasan Konten & Ujian** di `COURSES.md` (jumlah modul, daftar materi, latihan, paket ujian UTS/UAS, dan simulasi).

## Langkah 5 — Verifikasi Wajib
Jalankan dari root monorepo:
```bash
pnpm validate
pnpm typecheck
pnpm test
pnpm --filter @tutor/app-<slug> build
```
Pastikan:
- 0 error TypeScript di seluruh workspace.
- Build produksi selesai bersih tanpa warning broken import.
- Jalankan `pnpm --filter @tutor/app-<slug> preview` dan verifikasi tampilan desktop & mobile, termasuk pembahasan, pilihan teks, dan kontrol simulasi yang ditambahkan.

## Langkah 6 — Deploy
- Commit pada feature branch atau push ke `main` sesuai instruksi pengguna.
- Workflow `.github/workflows/deploy-<slug>.yml` otomatis berjalan saat ada perubahan di `apps/<slug>/**`, `packages/ui/**`, atau `packages/core/**`, lalu men-deploy ke `https://<slug>.tutor.adihnursyam.com`.
- Workflow memakai secret bersama `CF_AIG_TOKEN` untuk gateway BYOK. Starter mewariskan binding `TUTOR_CONFIG` ke `tutor-catalog`; pilih model melalui admin katalog agar semua course memakai setelan yang sama. Variabel model pada starter hanya menjadi nilai cadangan saat setelan pusat tidak tersedia. Ikuti `docs/cloudflare-setup.md` dan `docs/catalog-and-admin.md` untuk infrastruktur bersama.
- Uji generator pada `pnpm test` membuat course sementara, membangun UI aslinya, dan memeriksa worker beserta alat AI melalui provider lokal tiruan. Uji ini tidak menggantikan pemeriksaan domain dan provider setelah deploy.

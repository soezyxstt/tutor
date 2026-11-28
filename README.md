# IPE Study

Situs belajar Instrumentasi, Pengukuran & Eksperimen (MS3105) dalam bahasa Indonesia dan Inggris. Memuat **47 soal dari sembilan ujian UTS 1/UTS 2/UAS 2023 sampai 2025**, pembahasan bertahap, visual interaktif, serta **30 soal pilihan ganda tentang konsep dan alur berpikir**, dengan alasan untuk tiap pilihan.

## Sumber dan batas pembahasan

Soal mengikuti [arsip ujian](https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END). Tahun mengikuti folder arsip, bukan selalu tanggal yang tercetak pada naskah. Materi utama: [Pengukuran Teknik, Bagian 3 (Rev. 2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view).

| Tahun | UTS 1                                                                            | UTS 2                                                                            | UAS                                                                              |
| ----- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 2023  | [5 soal](https://drive.google.com/file/d/1eDoUueNZiaNhQdGI8BYpkTX8k4ltkSGo/view) | [4 soal](https://drive.google.com/file/d/1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7/view) | [5 soal](https://drive.google.com/file/d/1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI/view) |
| 2024  | [6 soal](https://drive.google.com/file/d/1pk9fnP4PEFeyhe6XWGgcr4KcEgtoKHz_/view) | [4 soal](https://drive.google.com/file/d/1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3/view) | [6 soal](https://drive.google.com/file/d/1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX/view) |
| 2025  | [5 soal](https://drive.google.com/file/d/1UGFG8A-0z3kaQUNx1FzbVe0ej3It86jN/view) | [6 soal](https://drive.google.com/file/d/1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0/view) | [6 soal](https://drive.google.com/file/d/1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5/view) |

Setiap soal menyimpan teks asli, tautan dan halaman sumber, terjemahan, langkah hitung, serta asumsi. Pembahasan merupakan materi belajar, **bukan kunci resmi ujian**. Catatan pada tiap soal menjelaskan salah tulis, data yang kurang, dan pilihan model. Nilai ilustrasi pada visual tidak mengganti data atau jawaban soal. Latihan pilihan ganda merupakan soal baru yang menilai pilihan model, asumsi, arah hubungan, galat, dan arti hasil ukur. Jawaban versi lama tidak diterapkan pada latihan baru. Pembahasan seluruh soal memuat alasan tiap langkah dan pemeriksaan hasil. Materi Bagian 3 terutama membahas sensor; pembahasan UTS 1 juga merujuk model dan data dalam naskah serta [NIST TN 1297](https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-appendix-law-propagation-uncertainty) untuk propagasi ketidakpastian.

## Teknologi

- React, TypeScript, dan Vite untuk aplikasi statis.
- Komponen shadcn/ui berbasis Radix, Tailwind CSS, serta kontrol bersama di `src/components/controls.tsx`.
- SVG dan persamaan analitik untuk diagram 2D; React Three Fiber, Three.js, dan drei untuk model 3D.
- Apache ECharts untuk plot, Motion untuk transisi, dan KaTeX untuk rumus.

Aplikasi tidak memakai backend atau akun pengguna. Peramban menyimpan kemajuan, tanda soal, jawaban latihan, dan pilihan bahasa melalui `localStorage`; data ini tidak tersinkron antargawai.

## Menjalankan proyek

Gunakan **Node.js 22** dan npm. Jalankan perintah dari akar repo:

```sh
npm ci
npm run dev
```

Pemeriksaan dan build:

```sh
npm run check
npm run build
npm run preview
```

`check` memeriksa tipe dan konten. `build` menghasilkan situs statis di `dist/`. Workflow `.github/workflows/ci.yml` menjalankan `npm ci`, `npm run check`, dan `npm run build` untuk PR menuju `staging` serta setiap push ke `staging`.

## Cloudflare Pages

Pengaturan proyek:

| Pengaturan      | Nilai                       |
| --------------- | --------------------------- |
| Nama proyek     | `ipe`                       |
| Branch produksi | `staging`                   |
| Direktori akar  | akar repo                   |
| Perintah build  | `npm run build`             |
| Direktori hasil | `dist`                      |
| Variabel build  | `NODE_VERSION=22`           |
| Domain khusus   | `ipe.tutor.adihnursyam.com` |

Cloudflare Pages dapat membangun branch produksi melalui integrasi Git. Aplikasi tidak memerlukan secret atau variabel lingkungan rahasia. Workflow GitHub hanya memvalidasi kode dan tidak melakukan deploy. Buat branch kerja dari `staging`, buka PR, lalu gabungkan setelah pemeriksaan dan ulasan selesai.

## Menambah tahun dan model

1. Buat `src/content/yYYYY.ts` dengan `questionsYYYY` dan `practiceYYYY` yang mengikuti tipe di `src/content/types.ts`. Isi kedua bahasa, semua subsoal, data/tabel, sumber beserta halaman, langkah, jawaban, satuan, dan asumsi. Pertahankan teks sumber saat naskah mengandung salah tulis; jelaskan koreksinya secara terpisah.
2. Gabungkan kedua array di `src/content/index.ts`. Perbarui pilihan tahun di `src/App.tsx` dan daftar sumber dalam `scripts/validate-content.ts`; jumlah soal serta ujian dihitung dari konten. Beri setiap soal ID unik dan hubungkan latihan ke `sourceQuestionId` yang sesuai.
3. Untuk model baru, perluas `VisualSpec.kind`, tambahkan renderer di `src/components/visuals/`, lalu daftarkan di `src/components/visuals/index.tsx`. Pisahkan hitungan yang dapat diuji ke `src/lib/models.ts` bila perlu. Gunakan satu state untuk gambar, plot, dan nilai; tulis satuan parameter serta batas model. Tawarkan 3D hanya jika renderer 3D tersedia.
4. Pakai kontrol bersama dan reset utama. Sertakan kedua bahasa, label akses, cara memakai keyboard, serta penanda nilai ilustrasi. Jalankan `npm run check` dan `npm run build`, lalu tinjau langkah pembahasan, batas slider, tampilan kecil, dan mode 2D/3D yang tersedia sebelum membuka PR.

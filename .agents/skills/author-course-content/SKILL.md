---
name: author-course-content
description: Guidelines and schema for authoring high-quality Materi (MaterialItem), Latihan (PracticeItem), and Pembahasan Soal (ProblemItem) with KaTeX math, ipe.tutor-style progressive steps, and multi-chapter exam metadata in apps/<slug>/src/content/.
---
# Authoring Course Content (`Materi`, `Latihan`, `Pembahasan`)

Gunakan skill ini saat mengubah materi kuliah, diktat, slide, atau naskah soal ujian (PDF, gambar, URL, teks) menjadi konten terstruktur di `apps/<slug>/src/content/`.

> **Prasyarat Struktur, Gaya Bahasa & Pedagogi:**
> - Ikuti **`.agents/skills/pedagogical-structure/SKILL.md`** untuk struktur 4 fase (Exam Hook → Micro-Theory + Decision Check → Worked Example + `checkpoint` & `rationale` → Faded Practice 3 tingkat) dan verifikasi 5 lapis (`pnpm validate`).
> - Muat/ikuti versi terbaru dari skill **`bahasa-ajar`** dan **`instructional-language`** dari repo **`soezyxstt/agent-skills`** untuk gaya bahasa pengajaran.

## 1. Struktur File Konten yang Disarankan
Untuk mata kuliah kecil (≤ 10 item), cukup di `apps/<slug>/src/content/course.ts`.
Untuk mata kuliah besar (> 10 item), pecah per modul agar mudah dirawat:
```
apps/<slug>/src/content/
├── course.ts          # Gabungkan CourseConfig & daftar modules
├── m1-<topik>.ts      # CourseModule 1
├── m2-<topik>.ts      # CourseModule 2
└── ...
```

## 2. Tiga Jenis Konten (`LessonItem`)

### A. Materi (`kind: 'material'`)
Untuk ringkasan konsep, teori, definisi, dan rumus inti per bab.
- `keyFormula`: 1 persamaan paling fundamental (`label`, `latex` tanpa `$$`, `note`).
- `body`: Markdown + GFM table + KaTeX (`$...$` inline, `$$...$$` blok). Tulis ringkas, tajam, mudah dipindai — hindari paragraf terlalu panjang.
- `derivations`: array opsional `{ id, title, content }` yang otomatis dirender sebagai **Accordion** penurunan rumus (agar halaman utama tetap ringan dibaca).
- `checkpoints`: array opsional `string[]` (3–5 butir) yang dirender sebagai **Checkbox** cek penguasaan konsep.
- `simulation`: opsional `SimulationSpec` bila konsep terbantu simulasi langsung.

### B. Latihan (`kind: 'practice'`)
Untuk kuis cek pemahaman interaktif sebelum/sesudah pembahasan soal panjang.
- `questions`: 2–5 soal pilihan ganda (`prompt`, `options`, `correctOptionId`, `hint`, `explanation`).
- Setiap opsi & penjelasan mendukung KaTeX penuh.

### C. Pembahasan Soal (`kind: 'problem'`)
Untuk pembahasan soal UTS, UAS, kuis, atau tutorial lengkap.
- **Metadata Ujian (WAJIB untuk soal ujian)**:
  ```ts
  source: 'UTS 2024 · No. 2',
  exam: { term: 'UTS', year: 2024, number: 2 },
  ```
  Field `exam` membuat soal ini otomatis dikelompokkan di tab **`Per Ujian`** pada sidebar, walaupun satu UTS/UAS terdiri dari soal-soal lintas bab (`M1`, `M2`, dst.)!
- `statement`: Pernyataan soal yang jelas dan akurat sesuai soal asli.
- `given`: Daftar poin data yang diketahui (ringkas, lengkap dengan satuan SI).
- `asked`: Pertanyaan spesifik yang dicari.
- `steps`: Pecah menjadi 3–7 langkah logis (dirender dengan stepper bernomor `1 2 3 ...` gaya `ipe.tutor`):
  - `title`: Kata kerja aktif & singkat (misal `"Susun neraca energi konduksi"`).
  - `hint`: Petunjuk singkat sebelum siswa membaca penurunan penuh (opsional tapi sangat dianjurkan).
  - `content`: Penurunan matematis bertahap dengan KaTeX, penjelasan fisis singkat, dan cek satuan.
- `finalAnswer`: Ringkasan jawaban akhir yang tegas beserta satuan.
- `takeaway`: Catatan penting, intuisi fisis, atau jebakan ujian yang sering terjadi.

## 3. Aturan Penulisan KaTeX & Bahasa
- Di dalam string TypeScript biasa (`'...'` atau `"..."`), escape backslash LaTeX menjadi double backslash (`\\frac`, `\\sqrt`, `\\text{m/s}`). Di dalam template literal multi-baris juga tetap gunakan `\\`.
- Gunakan spasi tipis `\\,` antara angka dan satuan: `$12.0\\,\\text{N/m}$`.
- Gunakan `\\text{...}` untuk satuan dan subskrip kata (`$c_{\\text{kritis}}$`, `$v_{\\text{cm}}$`).
- Jangan biarkan angka tanpa satuan pada hasil fisika/teknik.
- Pastikan tidak ada duplikasi `id` atau `slug` di seluruh modul dalam satu `CourseConfig`.

## 4. Verifikasi Sebelum Selesai
Jalankan `pnpm typecheck` dan `pnpm --filter @tutor/app-<slug> build`, lalu pastikan semua soal ujian tampil rapi di tab `Per Bab` maupun `Per Ujian`.

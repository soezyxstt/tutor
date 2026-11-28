---
name: pedagogical-structure
description: Pedagogical architecture and presentation standard for structuring study materials, worked exam solutions, faded practice (Micro-MCQ -> Guided Essay -> Full Essay with 3-tier hints & 100% rubric), and 5-layer quality verification in the tutor monorepo.
---
# Pedagogical Structure & Presentation Standard

Skill ini melengkapi `bahasa-ajar` & `instructional-language` (gaya bahasa dari `soezyxstt/agent-skills`) dengan **standar struktur penyajian, alur kognitif, dan verifikasi kualitas** agar konten mengatasi *cognitive load gap* dan *blank page syndrome*.

---

## 1. Alur 4 Fase per Subtopik / Modul

Susun setiap modul belajar dalam urutan terkunci berikut:

### Fase 1 — Exam Hook (`MaterialItem.examHook`)
- Mulai dengan 1 kasus/soal tipe ujian nyata + target hasil konkret (*"Setelah sesi ini, kamu dapat menganalisis X dan menentukan Y"*).
- Bangun relevansi dulu sebelum memperkenalkan rumus.

### Fase 2 — Micro-Theory + Decision Check (`MaterialItem.microUnits` / `body`)
- **Anti-Wall-of-Text**: Setiap blok teori maksimal **120–180 kata** (≤ 4 kalimat berturut-turut tanpa jeda poin/tabel/interaksi).
- Format 4 bagian ringkas per unit konsep:
  1. **Intuisi Singkat** (gambaran fisis/logis)
  2. **Formulasi / Prinsip Formal** (KaTeX)
  3. **Syarat Berlaku & Batas Kegagalan** (kapan rumus boleh/tidak boleh dipakai)
  4. **1 Analytical Micro-MCQ** (`decisionCheck`) — **dilarang** soal hafalan definisi; uji keputusan (misal dampak perubahan kondisi batas atau pemilihan model). Setiap distraktor salah wajib punya `misconceptionTag` + `feedback` spesifik.

### Fase 3 — Interactive Worked Example (`ProblemItem.steps`)
- Pecah pembahasan soal menjadi **4–6 langkah atomik** (Identifikasi → Asumsi/Model → Strategi → Eksekusi → Cek Kewajaran/Satuan).
- Pisahkan lapisan **Apa** dan **Kenapa** pada tiap `SolutionStep`:
  - `checkpoint` *(opsional tapi dianjurkan pada langkah kunci)*: pertanyaan keputusan 1 klik (*Self-Explanation Effect*).
  - `content`: inti penurunan yang runtut, tidak melompat seperti "sulap", tidak menumpuk 3 langkah sekaligus.
  - `rationale`: laci lipat *"Kenapa pakai cara ini?"* (tertutup default) berisi `whyThisMethod`, `whyNotAlternative`, dan `commonPitfall`.
- Selalu lengkapi `exam: { term, year, number }` untuk soal ujian agar muncul di tab **`Per Ujian`** lintas bab.

### Fase 4 — Faded Practice 3 Tingkat (`PracticeItem`)
Turunkan bantuan secara bertahap agar siswa tidak langsung menghadapi halaman kosong:
1. **Tingkat 1 (`questions` — Analytical Micro-MCQ)**: 2–3 soal keputusan cepat berbasis skenario + `misconceptionTag` & `feedback` per opsi.
2. **Tingkat 2 (`guidedTasks` — Guided / Partial Essay)**:
   - `spot-the-error`: sajikan solusi yang tampak meyakinkan namun memiliki 1–2 cacat asumsi/logika; siswa menandai letak salahnya.
   - `complete-the-bridge`: kerangka solusi dengan 1 transisi/asumsi dikosongkan.
3. **Tingkat 3 (`essayTasks` — Full Essay Simulasi Ujian)**:
   - **Structured Rubric (`rubric`)**: kriteria alur berpikir dengan **total `weight` tepat 100%**, syarat nilai penuh (`fullCredit`), dan kesalahan parsial umum.
   - **Exact 3-Tier Hints (`hints`)**: `[Hint 1: arah konsep, Hint 2: asumsi/langkah pembuka, Hint 3: kerangka alur tanpa membocorkan angka akhir]`.
   - **Guided Thinking Blocks (`sections`)**: misal `['Asumsi & Model', 'Strategi', 'Eksekusi', 'Kesimpulan']`.

---

## 2. Kontrak Perilaku AI Kontekstual (Inline AI Tutor)

- **Tanpa kotak chat kosong**: AI selalu dipicu inline dari blok/langkah/simulasi spesifik atau lewat *highlight-to-ask*.
- **Socratic Guardrail**: pada giliran awal saat siswa macet di latihan, konfirmasi bagian yang sudah benar dan beri 1 pertanyaan pancingan terarah — jangan langsung membocorkan jawaban akhir.
- **Rubric-Grounded Grading** (evaluasi essay): susun evaluasi dalam 4 bagian — (1) kriteria rubrik terpenuhi, (2) **titik divergensi pertama**, (3) dampak kesalahan ke hasil akhir, (4) arahan revisi spesifik.

---

## 3. Gerbang Verifikasi 5 Lapis (Definition of Done)

Sebelum menyatakan konten mata kuliah selesai:

1. **Lapis 1 — Skema & KaTeX (Build-Time)**: Jalankan `pnpm typecheck` dan `pnpm validate`. Pastikan 0 error TS, 0 sintaks KaTeX tidak seimbang, 0 duplikasi `id`/`slug`, total bobot rubrik = 100%, dan tepat 3 hint pada tiap `essayTask`.
2. **Lapis 2 — Pedagogical Linter**: Pastikan tidak ada blok teori > 180 kata tanpa jeda/interaksi, tidak ada MCQ hafalan definisi, dan setiap langkah tidak terlalu melompat.
3. **Lapis 3 — Verifikasi Akurasi Domain**:
   - Untuk soal STEM/kuantitatif: hitung ulang semua angka & cek konsistensi dimensi/satuan dengan skrip Python/Node sebelum menulis angka ke konten.
   - Untuk soal kualitatif: pastikan setiap kriteria di `rubric` tercermin eksplisit di `verifiedOutline` / `steps`.
4. **Lapis 4 — Verifikasi UI & Responsiveness**: Jalankan `pnpm build`; pastikan tidak ada overflow horizontal pada rumus/tabel di desktop maupun mobile, serta transisi *progressive disclosure* & drawer `Kenapa pakai cara ini?` berjalan halus.
5. **Lapis 5 — AI Eval Sanity Check (Bila Mengubah Prompt/Tool AI)**: Uji 5 skenario pada AI endpoint/fallback: metode alternatif valid, jawaban salah yang meyakinkan, upaya ekstraksi jawaban langsung (anti-leak), input bingung total, dan konsistensi rubrik.

---

## 4. Larangan Keras (Hard Anti-Patterns)
- Dilarang menulis dinding teks teori > 180 kata tanpa jeda visual atau interaksi.
- Dilarang membuat pilihan ganda hafalan definisi.
- Dilarang menaruh kotak chat AI bebas tanpa konteks blok/langkah.
- Dilarang merilis pembahasan kuantitatif tanpa verifikasi ulang perhitungan & satuan.

# AGENTS.md — Tutor Monorepo Operating Manual

Repo ini adalah monorepo untuk platform materi, latihan, dan pembahasan soal interaktif per mata kuliah (`<slug>.tutor.adihnursyam.com`) yang di-host di **Cloudflare Workers (Static Assets + Hono AI API)**.

Jika pengguna hanya menyebut repo ini dan memberikan tautan/berkas materi, soal ujian, atau referensi lalu meminta Anda membuat/memperbarui pembahasan, ikuti panduan ini dari awal sampai akhir tanpa perlu menanyakan ulang arsitektur dasar.

---

## 1. Peta Cepat Repo

- **`apps/catalog`**: Katalog pusat di `tutor.adihnursyam.com`. Build membaca konfigurasi semua mata kuliah secara otomatis. Jangan buat daftar katalog manual.
- **`docs/catalog-and-admin.md`**: Acuan publikasi katalog, terjemahan `id`/`en`, setelan AI bersama, dan login admin.

- **`COURSES.md`** — Indeks resmi seluruh mata kuliah yang sudah ada, domain custom, nama Worker, workflow deploy, dan daftar modul/ujiannya. **Selalu baca file ini lebih dulu** untuk mengecek apakah mata kuliah sudah ada atau perlu dibuat baru.
- **`packages/ui` (`@tutor/ui`)** — Sistem desain, token warna kontras belajar (terang & gelap), primitif Shadcn/Radix, dan animasi `motion/react`.
- **`packages/core` (`@tutor/core`)** — Engine aplikasi bersama: layout & sidebar (`Per Bab` & `Per Ujian`), renderer Markdown + KaTeX, langkah pembahasan, latihan interaktif (`PracticeView`), registry simulasi *lazy-loaded*, **Inline AI Tutor** (+ *highlight-to-ask*), 10 alat pengajaran dan visual, 3 alat UI SDK resmi (`snapshot`, `query`, `act`), dan factory Cloudflare Worker (`createTutorWorker`).
- **`apps/<slug>`** — Deployment per mata kuliah. Setiap app hanya menyimpan konfigurasi mata kuliah, konten (`src/content/`), simulasi khusus (bila perlu), `wrangler.jsonc`, dan entrypoint minimal `<TutorApp course={course} />`.
- **`apps/starter`** — Template bersih yang disalin oleh `pnpm new-course`.
- **`apps/demo`** — Showcase referensi (`FI1101 · Mekanika & Getaran`) + katalog Komponen Core UI (`?view=components`).
- **`scripts/new-course.mjs`** — CLI generator untuk membuat app mata kuliah baru, `wrangler.jsonc`, workflow `.github/workflows/deploy-<slug>.yml`, sekaligus mendaftarkannya ke `COURSES.md`.

---

## 2. Skill Set Bundled di Repo

Baca skill yang relevan di `.agents/skills/` sebelum mengeksekusi tugas:

| Skill | Lokasi | Kapan Digunakan |
| --- | --- | --- |
| **new-course-pipeline** | `.agents/skills/new-course-pipeline/SKILL.md` | Membuat mata kuliah baru dari nol, setup domain `<slug>.tutor.adihnursyam.com`, Cloudflare Workers & GitHub Actions, serta memperbarui `COURSES.md`. |
| **pedagogical-structure** | `.agents/skills/pedagogical-structure/SKILL.md` | Standar struktur pedagogis 4 fase (Exam Hook → Micro-Theory + Decision Check → Worked Example + Rationale → Faded Practice 3 tingkat), Socratic/Rubric AI, dan verifikasi 5 lapis. |
| **author-course-content** | `.agents/skills/author-course-content/SKILL.md` | Mengubah referensi/soal/PDF/URL menjadi `MaterialItem`, `PracticeItem`, dan `ProblemItem` (dengan KaTeX, step-by-step, dan metadata `exam` lintas bab). |
| **build-course-simulation** | `.agents/skills/build-course-simulation/SKILL.md` | Membuat visualisasi/simulasi interaktif *lazy-loaded* (RK4 Canvas, Mafs, ECharts, R3F/Rapier) yang terhubung ke slider & AI tool `updateSimulationParams`. |

### External Skills (Wajib Rujuk Langsung — Jangan Duplikasi)

Saat mengubah kontrol yang dipakai Tutor AI, baca skill resmi UI SDK pada `packages/core/node_modules/@ui-sdk/core/skills/ui-sdk/SKILL.md`, lalu indeks `packages/core/node_modules/@ui-sdk/react/docs/llms.txt`. Baca halaman komponen dan `docs/agents.md` sesuai tugas. Paket `@ui-sdk/core` dan `@ui-sdk/react` memakai versi yang sama; ikuti dokumen versi terpasang. Jangan ubah kebijakan umur rilis agar paket baru bisa dipasang.

Kontrol belajar memakai `AgentButton` dan `AgentSlider`, yang dapat diimpor dari `@tutor/core`, dengan gaya dari `@tutor/ui`. Beri nama yang jelas dan unik pada setiap kontrol. `agent-runtime.ts` membatasi bacaan serta tindakan pada pelajaran aktif. Pertahankan jawaban kuis, centang kemajuan, penanda, dan formulir percakapan sebagai tindakan siswa. Alat pembuat grafik, tampilan 3D, dan simulasi memakai skema data tervalidasi; alat tersebut berbeda dari pustaka UI SDK resmi. Jangan jalankan kode bebas dari model.

Saat menulis narasi materi, pembahasan soal, petunjuk, atau latihan, **selalu gunakan versi terbaru** dari kedua skill berikut yang berada di repository **`soezyxstt/agent-skills`** (via skill terpasang di agent atau baca langsung dari `soezyxstt/agent-skills`):
- **`bahasa-ajar`** (`soezyxstt/agent-skills`) — standar gaya bahasa pengajaran Bahasa Indonesia yang jernih, natural, dan mudah dipahami.
- **`instructional-language`** (`soezyxstt/agent-skills`) — prinsip penyusunan kalimat instruksional dan alur pedagogis agar penjelasan tidak bertele-tele dan efektif untuk belajar.

---

## 3. Alur Kerja Standar (End-to-End Pipeline)

Pada checkout baru, jalankan `pnpm install` sebelum memakai generator atau validasi.

1. **Cek Indeks**: Buka `COURSES.md`.
   - Jika mata kuliah **belum ada** → jalankan:
     ```bash
     pnpm new-course --slug <slug> --name "<Nama Mata Kuliah>" --code <KODE>
     pnpm install
     ```
   - Jika mata kuliah **sudah ada** → langsung edit di `apps/<slug>/src/content/`.
2. **Analisis Sumber Referensi**: Ekstrak konsep inti (untuk `kind: 'material'`), soal cek pemahaman (untuk `kind: 'practice'`), dan soal ujian/tutorial lengkap (untuk `kind: 'problem'`).
3. **Susun Konten**:
   - Ikuti struktur 4 fase & anti-wall-of-text pada skill `pedagogical-structure`, serta gaya bahasa dari `bahasa-ajar` & `instructional-language`.
   - Kelompokkan berdasarkan **Bab / Modul** di `course.modules`.
   - Untuk soal ujian (UTS/UAS/Kuis), **wajib** isi field `exam: { term, year, number }` agar otomatis muncul di tab **`Per Ujian`** pada sidebar meski soal ujian mencakup lintas bab.
   - Pecah pembahasan menjadi langkah-langkah atomik (`steps[]`) dengan KaTeX, `checkpoint` 1-klik, `rationale` (*"Kenapa pakai cara ini?"*), petunjuk (`hint`), `finalAnswer`, dan `takeaway`.
4. **Tambah Simulasi Interaktif (Bila Relevan)**:
   - Jika materi/soal sangat terbantu oleh grafik dinamis, solver numerik, atau visualisasi 3D, buat komponen terpisah dan daftarkan secara *lazy-loaded* via `registerSimulation(type, () => import('./...'))` sebelum render `<TutorApp />`.
5. **Perbarui `COURSES.md`**:
   - Pastikan jumlah modul, daftar ujian, dan status deployment di `COURSES.md` selalu mutakhir.
6. **Verifikasi Wajib Sebelum Selesai**:
   ```bash
   pnpm validate
   pnpm typecheck
   pnpm test
   pnpm build
   ```
   Pastikan lulus validasi skema/pedagogi dan batas UI/worker bersama (`pnpm validate`), tidak ada error TypeScript, tidak ada broken LaTeX, dan chunk simulasi berat terpisah (*lazy-loaded*). Uji generator pada `pnpm test` memeriksa build UI dan worker dari course yang benar-benar dibuat lewat CLI.
7. **Deployment (Cloudflare Workers via GitHub Actions)**:
   - Setiap app di `apps/<slug>` memiliki `wrangler.jsonc` dengan custom domain `<slug>.tutor.adihnursyam.com` dan workflow `.github/workflows/deploy-<slug>.yml` yang menggunakan GitHub Secrets:
     - `CF_ACCOUNT_ID`
     - `CF_DEPLOY_PAGES_TOKEN`
   - Push ke branch `main` (atau jalankan `workflow_dispatch`) akan otomatis mem-build dan men-deploy Worker + Static Assets + endpoint `/api/ai`.

---

## 4. Aturan Desain & Invarian UI (Jangan Dilanggar)

### Bahasa dan publikasi

- Gunakan `sourceLanguage` dan `translations` pada `CourseConfig`. Semua teks UI bersama memakai `useLanguage()` dari `@tutor/core`; jangan menambah teks antarmuka satu bahasa saja.
- Pertahankan ID modul, item, langkah, opsi, dan parameter saat menerjemahkan. Terjemahkan teks saja. Jangan membuat ID baru per bahasa.
- Starter memakai `catalog.status: 'draft'`. Setelah isi selesai dan lolos verifikasi, ubah ke `'published'` sebelum push ke `main`. Workflow katalog membaca data baru secara otomatis.
- App `demo` hanya untuk referensi UI dan pengujian. Jangan masukkan demo ke katalog publik atau gunakan demo untuk mengisi katalog yang masih kosong.
- Katalog menandai terjemahan yang belum lengkap dan menampilkan bahasa sumber sebagai pengganti. Jangan mengklaim terjemahan lengkap jika hanya judul yang diterjemahkan.
- Untuk katalog/admin, gunakan entry point `@tutor/core/catalog` agar halaman tidak memuat engine simulasi dan matematika yang tidak dipakai.
- Login admin hanya tersedia di Worker katalog. Semua Worker mata kuliah membaca pilihan model dari `https://tutor.adihnursyam.com/api/tutor-config`.

- **Satu Sistem UI Bersama**: Jangan membangun ulang sidebar, topbar, layout, atau primitif UI di dalam `apps/<slug>`. Selalu impor dari `@tutor/core` dan `@tutor/ui`.
- **Default Course Baru**: Pertahankan entrypoint, CSS, dan worker starter. `scripts/check-course-runtime.mjs` menjaga pemakaian paket workspace, layer UI SDK, sumber Tailwind, API, serta setelan AI pusat melalui `pnpm validate` dan pemeriksaan generator. Konten dan simulasi khusus tetap berada di app. Perubahan sistem pengajaran bersama masuk ke core agar setiap course mendapat pembaruan pada deploy berikutnya.
- **Hampir 0 Cards**: Hindari membungkus paragraf, soal, atau langkah dalam kotak card/shadow. Gunakan tipografi, spasi lega, garis tipis 1px (`border-border`), dan callout `border-l-2`.
- **Tanpa Eyebrow / Pill Title**: Jangan tambahkan label uppercase kecil di atas judul (seperti `SIMULASI INTERAKTIF` atau pill badge dekoratif).
- **Kontrol Minimalis**:
  - `Select`: tanpa border (hanya teks + chevron).
  - Icon button (`size="icon"`): tanpa border dan tanpa background.
  - Button biasa: padding ringkas (`@tutor/ui` `Button`).
- **Ikon AI**: Jangan gunakan `Sparkles`. Gunakan `BotMessageSquare`.
- **Breadcrumb Tunggal**: Breadcrumb hanya tampil di topbar; jangan duplikasi di header artikel.
- **Animasi Halus**: Semua transisi buka/tutup, perpindahan tab, dan perpindahan langkah wajib mulus tanpa layout shift tiba-tiba (`motion/react` + `CollapsibleMotion` + `AnimatePresence`).
- **Inline AI Tutor**: Interaksi AI selalu bersifat *inline* tepat di bawah bagian/langkah/simulasi atau lewat *highlight-to-ask*, bukan drawer/sheet samping yang menutupi bacaan.

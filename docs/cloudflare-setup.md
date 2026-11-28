# Setup Cloudflare AI Gateway (BYOK) & Layanan Pendukung

Panduan ini menyiapkan satu **Cloudflare AI Gateway** terpusat (dengan **BYOK / Stored Keys**) dan **Cloudflare R2** agar seluruh deployment mata kuliah (`<slug>.tutor.adihnursyam.com`) otomatis terhubung ke **Gemini**, **OpenAI**, dan **Muse AI** tanpa perlu menyimpan API key provider di dalam kode atau tiap Worker.

---

## 1. Buat Cloudflare AI Gateway (`tutor-ai-gateway`)

1. Buka **Cloudflare Dashboard → AI → AI Gateway → Create Gateway**.
2. Isi **Gateway name**: `tutor-ai-gateway` (harus sama dengan `CF_AI_GATEWAY_ID` di `wrangler.jsonc`).
3. Aktifkan pengaturan berikut di tab **Settings**:
   - **Authenticated Gateway**: **ON** (wajib agar BYOK aman dan hanya Worker Anda yang bisa memanggil gateway).
   - **Cache Responses**: **ON** (default TTL `3600` detik sudah dikirim lewat header `cf-aig-cache-ttl`).
   - **Rate Limiting**: **ON** — rekomendasi awal: `30 requests / 1 minute` (Fixed/Sliding) untuk mencegah spam.
   - **Collect Logs**: **ON** (untuk memantau analitik per mata kuliah lewat `cf-aig-metadata`).

---

## 2. Pasang API Key Provider via BYOK (Stored Keys)

Di dalam `tutor-ai-gateway`, buka menu **Provider Keys (BYOK)** lalu tambahkan key masing-masing provider:

| Provider | Nama di AI Gateway | Contoh Model ID (`AI_MODEL` / `AI_FALLBACK_MODELS`) |
| --- | --- | --- |
| **Google Gemini** | **Google AI Studio** (`google-ai-studio`) | `google-ai-studio/gemini-2.5-flash` *(primary default)* atau `google-ai-studio/gemini-2.5-pro` |
| **OpenAI** | **OpenAI** (`openai`) | `openai/gpt-4o-mini` *(fallback default)* atau `openai/gpt-4.1-mini` |
| **Muse AI** | **Custom Provider** (OpenAI-compatible) — slug misal `muse` | `custom-muse/<nama-model-muse>` |

> **Cara kerja di Worker (`@tutor/core/worker`)**:
> Worker memanggil Unified OpenAI-Compatible endpoint `https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/tutor-ai-gateway/compat` dengan header `cf-aig-authorization: Bearer <CF_AIG_TOKEN>` dan **menghapus** header `Authorization` klien agar AI Gateway otomatis menyuntikkan BYOK key yang tersimpan di Cloudflare.
> Jika model utama gagal/rate-limit, Worker otomatis mencoba urutan model di `AI_FALLBACK_MODELS`.

---

## 3. Buat Token AI Gateway & Pasang 1 Secret di GitHub

1. Buka **Cloudflare Dashboard → My Profile → API Tokens → Create Token** (atau tombol *Create Authentication Token* di tab Settings AI Gateway).
2. Pilih permission: **Account → AI Gateway → Run**.
3. Copy token tersebut lalu tambahkan ke **GitHub Repository Secrets** (`soezyxstt/tutor → Settings → Secrets and variables → Actions`):
   - Name: **`CF_AIG_TOKEN`**
   - Value: *(token AI Gateway Run tadi)*

Setelah `CF_AIG_TOKEN` dipasang di GitHub Secrets, setiap workflow `.github/workflows/deploy-<slug>.yml` akan **otomatis** menyuntikkan `CF_ACCOUNT_ID` dan mensinkronkan secret `CF_AIG_TOKEN` ke setiap Worker mata kuliah saat deploy!

### Verifikasi Endpoint AI
Setelah deploy, buka:
```
https://demo.tutor.adihnursyam.com/api/health
```
Jika konfigurasi sudah aktif, responsnya akan menunjukkan `"mode": "byok"` dan `"gatewayConfigured": true`.

---

## 4. (Opsional) Cloudflare R2 untuk Aset Berat (`.glb` 3D & Gambar Resolusi Tinggi)

Hindari menyimpan file `.glb` atau gambar besar di repo Git. Gunakan satu R2 bucket bersama:

```bash
pnpm --filter @tutor/app-demo exec wrangler r2 bucket create tutor-assets
```

Lalu salah satu dari dua opsi berikut:
- **Opsi A (Custom Domain — Paling Cepat)**: Di Dashboard R2 → bucket `tutor-assets` → **Settings → Custom Domains**, hubungkan `assets.tutor.adihnursyam.com` (gratis egress).
- **Opsi B (Binding Worker `/media/*`)**: Uncomment blok `r2_buckets` di `apps/<slug>/wrangler.jsonc` — endpoint `/media/<path>` di `@tutor/core/worker` sudah siap menyajikan objek R2 dengan header cache immutable.

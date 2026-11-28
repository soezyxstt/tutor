---
name: build-course-simulation
description: How to build and lazy-register interactive 2D/3D simulations and charts (RK4 Canvas, Mafs, ECharts, React Three Fiber + Rapier) in @tutor/core so they sync with sliders and AI Tutor updateSimulationParams tool calls.
---
# Building & Registering Lazy-Loaded Course Simulations

Gunakan skill ini saat sebuah soal atau materi membutuhkan simulasi fisika, grafik teknik, atau visualisasi 3D khusus yang belum tersedia di registry bawaan (`damped-oscillator`).

## 1. Pilih Library yang Tepat (Ringan & Sesuai Kebutuhan)
- **Persamaan diferensial / kinematika / osilasi / kontrol 2D**: Solver numerik RK4/Euler dalam TypeScript + HTML5 Canvas (paling ringan, ~2–4 kB gzip, 60fps).
- **Grafik matematika & vektor interaktif**: `mafs`.
- **Plot teknik / Bode plot / respons waktu / distribusi data**: `echarts` atau `uplot`.
- **3D spasial & mekanika benda tegar**: `@react-three/fiber` + `@react-three/drei` (dan `@react-three/rapier` bila butuh physics engine 3D WASM).

## 2. Kontrak Komponen Simulasi
Setiap komponen simulasi harus menerima `SimulationRendererProps` dari `@tutor/core`:
```tsx
import type { SimulationRendererProps } from '@tutor/core';

export default function MyCourseSim({
  params,
  playing,
  resetSignal,
}: SimulationRendererProps) {
  // Baca parameter dari `params.<key>`
  // Hormati `playing` (pause/play) dan `resetSignal` (reset state)
}
```

### Aturan Performa & Tema (Wajib)
1. **Jangan panggil React `setState` di dalam loop 60fps** (`requestAnimationFrame` / `useFrame`). Simpan state animasi di `useRef` dan baca `paramsRef.current` / `playingRef.current`.
2. **Adaptif Terang & Gelap**: Baca warna dari CSS variables pada `document.documentElement` (`--background`, `--surface-subtle`, `--foreground`, `--muted-foreground`, `--primary`, `--border`) — jangan hardcode warna hitam/putih statis.
3. **Responsif Mobile**: Baca `canvas.getBoundingClientRect()` dengan `window.devicePixelRatio`, dan padatkan teks telemetri saat lebar `< 460px` agar tidak terpotong di layar HP.

## 3. Registrasi Lazy-Loaded (Wajib Dynamic Import)
Daftarkan simulasi di `apps/<slug>/src/main.tsx` menggunakan `registerSimulation` sebelum `createRoot(...).render(...)`:
```ts
import { registerSimulation } from '@tutor/core';

registerSimulation('heat-conduction-1d', () => import('./simulations/heat-conduction-1d'));
```
Dengan `React.lazy`, library berat (Three.js, Rapier, ECharts) **hanya diunduh** saat siswa membuka halaman yang memakainya.

## 4. Hubungkan ke Konten & AI Tutor
Pasang spesifikasi `simulation` pada `ProblemItem`, `MaterialItem`, atau `PracticeItem`:
```ts
simulation: {
  id: 'sim-konduksi-1d',
  type: 'heat-conduction-1d',
  title: 'Profil Suhu Konduksi 1D',
  caption: 'Geser konduktivitas termal k untuk mengamati gradien suhu.',
  params: [
    { key: 'k', label: 'Konduktivitas (k)', unit: 'W/m·K', min: 10, max: 400, step: 10, defaultValue: 50 },
  ],
}
```
Otomatis:
- `SimulationStage` merender tombol Play/Pause, Reset, `Uji via AI`, dan slider parameter.
- Parameter tersimpan di `useTutorStore`, sehingga saat siswa meminta **Inline AI Tutor** mengubah parameter (via tool `updateSimulationParams`), slider dan visualisasi langsung berubah secara *real-time*.

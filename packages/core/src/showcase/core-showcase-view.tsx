import * as React from 'react';
import {
  Bookmark,
  BotMessageSquare,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  HelpCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Checkbox,
  CollapsibleMotion,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ToggleGroup,
  ToggleGroupItem,
  cn,
} from '@tutor/ui';
import { Callout } from '../content/callout';
import { MathMarkdown } from '../content/math-markdown';
import { AiToolInvocationView } from '../ai/ui-sdk/tool-renderers';

const paletteTokens = [
  { name: 'Background', varName: '--background', cls: 'bg-background border border-border' },
  { name: 'Surface Subtle', varName: '--surface-subtle', cls: 'bg-surface-subtle border border-border' },
  { name: 'Foreground', varName: '--foreground', cls: 'bg-foreground' },
  { name: 'Muted Ink', varName: '--muted-foreground', cls: 'bg-muted-foreground' },
  { name: 'Primary Ink', varName: '--primary', cls: 'bg-primary' },
  { name: 'Success', varName: '--success', cls: 'bg-success' },
  { name: 'Warning', varName: '--warning', cls: 'bg-warning' },
  { name: 'Destructive', varName: '--destructive', cls: 'bg-destructive' },
];

export function CoreShowcaseView() {
  const [topic, setTopic] = React.useState('mekanika');
  const [difficulty, setDifficulty] = React.useState('menengah');
  const [dampingVal, setDampingVal] = React.useState(0.45);
  const [openMotion, setOpenMotion] = React.useState(true);
  const [focusToggle, setFocusToggle] = React.useState(true);
  const [checkedConcept, setCheckedConcept] = React.useState(true);
  const [radioChoice, setRadioChoice] = React.useState('underdamped');
  const [viewMode, setViewMode] = React.useState('grafik');

  return (
    <article className="space-y-10 pb-16">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-[1.6rem]">
          Sistem Desain, Shadcn Primitives &amp; AI UI-SDK
        </h1>
        <p className="text-[14.5px] leading-relaxed text-muted-foreground">
          Katalog komponen editorial tanpa card untuk halaman materi, latihan,
          pembahasan soal, serta blok Generative UI untuk Asisten Tutor AI.
        </p>
      </header>

      <Separator />

      {/* 1. Color Palette */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          1. Palet Warna (Kontras Belajar)
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
          {paletteTokens.map((t) => (
            <div key={t.name} className="flex items-center gap-2.5">
              <span className={cn('size-6 shrink-0 rounded-sm', t.cls)} />
              <div className="min-w-0">
                <div className="truncate text-xs font-medium text-foreground">
                  {t.name}
                </div>
                <div className="truncate font-mono text-[11px] text-muted-foreground">
                  {t.varName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* 2. Compact Buttons & Borderless Icon Buttons */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          2. Button Ringkas &amp; Icon Button (Tanpa Border / BG)
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="xs">XS Action</Button>
          <Button size="sm">SM Action</Button>
          <Button>Default Compact</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Reset</Button>
          <Button variant="link">Tautan Materi</Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button size="icon" aria-label="Simpan">
            <Bookmark className="size-4" />
          </Button>
          <Button size="icon" aria-label="Selesai" className="text-success">
            <CheckCircle2 className="size-4" />
          </Button>
          <Button size="icon" aria-label="Jalankan">
            <Play className="size-4" />
          </Button>
          <Button size="icon" aria-label="Reset">
            <RotateCcw className="size-4" />
          </Button>
          <Button size="icon" aria-label="Salin">
            <Copy className="size-4" />
          </Button>
          <Button size="icon" aria-label="Petunjuk">
            <HelpCircle className="size-4" />
          </Button>
          <Button size="icon" aria-label="Tanya AI" className="text-primary">
            <BotMessageSquare className="size-4" />
          </Button>
          <Button size="icon" aria-label="Unduh">
            <Download className="size-4" />
          </Button>
        </div>
      </section>

      <Separator />

      {/* 3. Inputs, Borderless Select, Overlays (Dialog, Sheet, Popover) */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          3. Select Tanpa Border, Input, Textarea &amp; Overlays (Dialog / Sheet / Popover)
        </h2>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Topik:</span>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger aria-label="Pilih topik">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mekanika">Mekanika Klasik</SelectItem>
                <SelectItem value="getaran">Getaran &amp; Gelombang</SelectItem>
                <SelectItem value="termodinamika">Termodinamika</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Tingkat:</span>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger aria-label="Pilih tingkat kesulitan">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dasar">Dasar</SelectItem>
                <SelectItem value="menengah">Menengah</SelectItem>
                <SelectItem value="lanjut">Lanjut</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-52">
            <Input placeholder="Cari nomor soal atau rumus…" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                Buka Dialog
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Referensi Konstanta Fisika</DialogTitle>
              <DialogDescription>
                Dialog ringkas berbasis Radix UI untuk pencarian cepat atau tabel konstanta.
              </DialogDescription>
              <div className="mt-3 text-xs text-muted-foreground">
                Gravitasi standar g = 9.81 m/s².
              </div>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="outline">
                Buka Sheet
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-5">
              <SheetTitle>Panel Samping (Sheet)</SheetTitle>
              <SheetDescription className="mt-1">
                Digunakan untuk navigasi mobile dan panel Asisten Tutor AI.
              </SheetDescription>
            </SheetContent>
          </Sheet>

          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline">
                Buka Popover
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="space-y-2 text-xs">
              <div className="font-medium text-foreground">Definisi Simbol</div>
              <p className="text-muted-foreground">
                Popover ringan untuk definisi variabel inline atau pengaturan tampilan.
              </p>
            </PopoverContent>
          </Popover>
        </div>

        <div className="max-w-md pt-1">
          <Textarea
            rows={2}
            placeholder="Catatan pribadi atau pertanyaan untuk Asisten Tutor AI…"
          />
        </div>
      </section>

      <Separator />

      {/* 4. Form Controls, Accordion, Collapsible & Tabs */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          4. Controls (Switch, Checkbox, Radio, ToggleGroup, Slider), Accordion &amp; Tabs
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center justify-between gap-3 text-xs">
              <span>Mode fokus bacaan (Switch)</span>
              <Switch checked={focusToggle} onCheckedChange={setFocusToggle} />
            </label>

            <label className="flex cursor-pointer items-center gap-2.5 text-xs">
              <Checkbox
                checked={checkedConcept}
                onCheckedChange={(v) => setCheckedConcept(v === true)}
              />
              <span>Memahami syarat kritis ζ = 1 (Checkbox)</span>
            </label>

            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="text-xs text-muted-foreground">Tampilan:</span>
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(v) => v && setViewMode(v)}
              >
                <ToggleGroupItem value="grafik">Grafik</ToggleGroupItem>
                <ToggleGroupItem value="fase">Ruang Fase</ToggleGroupItem>
                <ToggleGroupItem value="energi">Energi</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Rasio Redaman (ζ)</span>
                <span className="font-mono font-medium">{dampingVal.toFixed(2)}</span>
              </div>
              <Slider
                value={[dampingVal]}
                min={0}
                max={2}
                step={0.05}
                onValueChange={([v]) => typeof v === 'number' && setDampingVal(v)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs text-muted-foreground">
              RadioGroup (dipakai pada halaman Latihan)
            </div>
            <RadioGroup value={radioChoice} onValueChange={setRadioChoice}>
              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <RadioGroupItem value="underdamped" />
                <span>Underdamped (0 &lt; ζ &lt; 1)</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <RadioGroupItem value="critical" />
                <span>Critically damped (ζ = 1)</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <RadioGroupItem value="overdamped" />
                <span>Overdamped (ζ &gt; 1)</span>
              </label>
            </RadioGroup>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progres Modul &amp; Skeleton</span>
                <span className="font-mono">68%</span>
              </div>
              <Progress value={68} />
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="accordion">
          <TabsList>
            <TabsTrigger value="accordion">Accordion &amp; Collapsible</TabsTrigger>
            <TabsTrigger value="callouts">Callout &amp; Badge</TabsTrigger>
          </TabsList>

          <TabsContent value="accordion" className="space-y-4">
            <Accordion type="single" collapsible className="border-t border-border">
              <AccordionItem value="derivation">
                <AccordionTrigger>Penurunan Persamaan Karakteristik</AccordionTrigger>
                <AccordionContent>
                  <MathMarkdown
                    content="Substitusi $x(t) = e^{rt}$ menghasilkan $r^2 + 2\zeta\omega_n r + \omega_n^2 = 0$."
                    className="text-[13.5px]"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => setOpenMotion((o) => !o)}
                className="flex cursor-pointer items-center gap-2 text-[13.5px] font-medium text-foreground hover:text-primary"
              >
                <ChevronRight
                  className={cn(
                    'size-4 text-muted-foreground transition-transform duration-200',
                    openMotion && 'rotate-90 text-primary'
                  )}
                />
                <span>CollapsibleMotion (Progressive Disclosure)</span>
              </button>
              <CollapsibleMotion open={openMotion}>
                <div className="pl-6 text-[13.5px] text-muted-foreground">
                  Transisi tinggi dan opasitas ditenagai <code>motion/react</code>{' '}
                  dengan dukungan <code>prefers-reduced-motion</code>.
                </div>
              </CollapsibleMotion>
            </div>
          </TabsContent>

          <TabsContent value="callouts" className="space-y-4">
            <Callout tone="formula" label="Persamaan Inti">
              <MathMarkdown content="$$m\ddot{x} + c\dot{x} + kx = 0$$" />
            </Callout>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">Materi</Badge>
              <Badge variant="success">Dasar</Badge>
              <Badge variant="warning">Menengah</Badge>
              <Badge variant="destructive">Lanjut</Badge>
              <Badge variant="tag">RK4 Solver</Badge>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      {/* 5. AI Tutor UI-SDK Blocks */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          5. Blok UI-SDK untuk Penjelasan Inline Asisten Tutor AI
        </h2>
        <p className="text-xs text-muted-foreground">
          7 tool terstruktur yang dipanggil AI Tutor secara inline di bawah paragraf/langkah:
          kontrol simulasi, buka langkah, rincian rumus, penurunan aljabar, perbandingan, cek pemahaman, dan peringatan jebakan.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <AiToolInvocationView
            invocation={{
              toolName: 'showFormulaBreakdown',
              args: {
                title: 'Rasio Redaman Kanonik',
                latex: '\\zeta = \\frac{c}{2\\sqrt{km}}',
                symbols: [
                  { symbol: 'c', meaning: 'Koefisien redaman', unit: 'N·s/m' },
                  { symbol: 'k', meaning: 'Konstanta pegas', unit: 'N/m' },
                  { symbol: 'm', meaning: 'Massa balok', unit: 'kg' },
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'showStepDerivation',
              args: {
                title: 'Penurunan Bentuk Kanonik',
                steps: [
                  {
                    expression: '$m\\ddot{x} + c\\dot{x} + kx = 0$',
                    rule: 'Hukum II Newton',
                  },
                  {
                    expression: '$\\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0$',
                    rule: 'Bagi dengan m',
                  },
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'showComparisonTable',
              args: {
                title: 'Perbandingan Rezim Osilasi',
                columns: ['Rezim', 'Syarat', 'Respon'],
                rows: [
                  ['Underdamped', '$0 < \\zeta < 1$', 'Osilasi meluruh'],
                  ['Critically damped', '$\\zeta = 1$', 'Tercepat tanpa overshoot'],
                  ['Overdamped', '$\\zeta > 1$', 'Meluruh lambat'],
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'renderInteractivePlot',
              args: {
                title: 'Respons Osilator x(t) & Amplop Peluruhan',
                xLabel: 't',
                xDomain: [0, 10],
                curves: [
                  { label: 'x(t)', expression: 'exp(-z * w * t) * cos(w * t)', color: 'primary' },
                  { label: '+amplop', expression: 'exp(-z * w * t)', color: 'warning' },
                ],
                sliders: [
                  { key: 'z', label: 'Redaman (ζ)', min: 0.02, max: 0.6, step: 0.02, defaultValue: 0.12 },
                  { key: 'w', label: 'Frekuensi (ωₙ)', unit: 'rad/s', min: 1, max: 6, step: 0.2, defaultValue: 3.4 },
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'renderInteractive3D',
              args: {
                title: 'Permukaan Gelombang 3D · z(x, y)',
                mode: 'surface',
                domain: [-1.5, 1.5],
                surfaceExpression: 'cos(k * sqrt(x^2 + y^2)) * exp(-a * (x^2 + y^2))',
                sliders: [
                  { key: 'k', label: 'Bilangan gelombang (k)', min: 1.5, max: 6, step: 0.25, defaultValue: 3.5 },
                  { key: 'a', label: 'Peluruhan (a)', min: 0.1, max: 1.2, step: 0.05, defaultValue: 0.45 },
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'showPitfallWarning',
              args: {
                title: 'Kesalahan Umum Ujian',
                misconception: 'Memakai ωₙ sebagai frekuensi osilasi teredam.',
                correction: 'Gunakan $\\omega_d = \\omega_n\\sqrt{1 - \\zeta^2}$.',
              },
            }}
          />
        </div>
      </section>
    </article>
  );
}

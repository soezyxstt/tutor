import { useLanguage } from '../i18n/language-provider';
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
  { name: 'Background', nameId: 'Latar', varName: '--background', cls: 'bg-background border border-border' },
  { name: 'Surface Subtle', nameId: 'Latar halus', varName: '--surface-subtle', cls: 'bg-surface-subtle border border-border' },
  { name: 'Foreground', nameId: 'Teks utama', varName: '--foreground', cls: 'bg-foreground' },
  { name: 'Muted Ink', nameId: 'Teks sekunder', varName: '--muted-foreground', cls: 'bg-muted-foreground' },
  { name: 'Primary Ink', nameId: 'Warna utama', varName: '--primary', cls: 'bg-primary' },
  { name: 'Success', nameId: 'Berhasil', varName: '--success', cls: 'bg-success' },
  { name: 'Warning', nameId: 'Peringatan', varName: '--warning', cls: 'bg-warning' },
  { name: 'Destructive', nameId: 'Tindakan hapus', varName: '--destructive', cls: 'bg-destructive' },
];

export function CoreShowcaseView() {
  const { t } = useLanguage();
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
          {t("Sistem Desain, Shadcn & AI UI-SDK", "Design System, Shadcn & AI UI-SDK")}
        </h1>
        <p className="text-[14.5px] leading-relaxed text-muted-foreground">
          {t('Gunakan komponen bersama ini untuk materi, latihan, pembahasan, dan penjelasan Tutor AI.', 'Use these shared components for lessons, practice, solutions, and AI explanations.')}
        </p>
      </header>

      <Separator />

      {/* 1. Color Palette */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {t("1. Palet warna untuk bacaan", "1. Colors for reading")}
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
          {paletteTokens.map((token) => (
            <div key={token.name} className="flex items-center gap-2.5">
              <span className={cn('size-6 shrink-0 rounded-sm', token.cls)} />
              <div className="min-w-0">
                <div className="truncate text-xs font-medium text-foreground">
                  {t(token.nameId, token.name)}
                </div>
                <div className="truncate font-mono text-[11px] text-muted-foreground">
                  {token.varName}
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
          {t("2. Tombol ringkas dan tombol ikon", "2. Compact buttons and icon buttons")}
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="xs">{t("Tombol XS", "XS action")}</Button>
          <Button size="sm">{t("Tombol SM", "SM action")}</Button>
          <Button>{t("Tombol utama", "Default compact")}</Button>
          <Button variant="secondary">{t("Sekunder", "Secondary")}</Button>
          <Button variant="outline">{t("Garis tepi", "Outline")}</Button>
          <Button variant="ghost">{t("Tanpa latar", "Ghost")}</Button>
          <Button variant="destructive">{t("Mulai ulang", "Reset")}</Button>
          <Button variant="link">{t("Tautan materi", "Lesson link")}</Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button size="icon" aria-label={t("Simpan", "Save")}>
            <Bookmark className="size-4" />
          </Button>
          <Button size="icon" aria-label={t("Selesai", "Complete")} className="text-success">
            <CheckCircle2 className="size-4" />
          </Button>
          <Button size="icon" aria-label={t("Jalankan", "Play")}>
            <Play className="size-4" />
          </Button>
          <Button size="icon" aria-label={t("Reset", "Reset")}>
            <RotateCcw className="size-4" />
          </Button>
          <Button size="icon" aria-label={t("Salin", "Copy")}>
            <Copy className="size-4" />
          </Button>
          <Button size="icon" aria-label={t("Petunjuk", "Hint")}>
            <HelpCircle className="size-4" />
          </Button>
          <Button size="icon" aria-label={t("Tanya AI", "Ask AI")} className="text-primary">
            <BotMessageSquare className="size-4" />
          </Button>
          <Button size="icon" aria-label={t("Unduh", "Download")}>
            <Download className="size-4" />
          </Button>
        </div>
      </section>

      <Separator />

      {/* 3. Inputs, Borderless Select, Overlays (Dialog, Sheet, Popover) */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {t("3. Pilihan, kolom teks, dan panel", "3. Selects, text fields, and overlays")}
        </h2>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{t("Topik:", "Topic:")}</span>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger aria-label={t("Pilih topik", "Choose topic")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mekanika">{t("Mekanika klasik", "Classical mechanics")}</SelectItem>
                <SelectItem value="getaran">{t("Getaran & Gelombang", "Vibrations & Waves")}</SelectItem>
                <SelectItem value="termodinamika">{t("Termodinamika", "Thermodynamics")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{t("Tingkat:", "Level:")}</span>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger aria-label={t("Pilih tingkat kesulitan", "Choose difficulty")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dasar">{t("Dasar", "Basic")}</SelectItem>
                <SelectItem value="menengah">{t("Menengah", "Intermediate")}</SelectItem>
                <SelectItem value="lanjut">{t("Lanjut", "Advanced")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-52">
            <Input placeholder={t("Cari nomor soal atau rumus…", "Search for a problem or formula…")} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                {t("Buka dialog", "Open dialog")}
              </Button>
            </DialogTrigger>
            <DialogContent closeLabel={t('Tutup', 'Close')}>
              <DialogTitle>{t("Konstanta fisika", "Physical constants")}</DialogTitle>
              <DialogDescription>
                {t("Dialog Radix UI memuat pencarian cepat atau tabel konstanta.", "Use a Radix UI dialog for quick search or a table of constants.")}
              </DialogDescription>
              <div className="mt-3 text-xs text-muted-foreground">
                {t("Percepatan gravitasi sekitar g = 9.81 m/s².", "Gravitational acceleration is approximately g = 9.81 m/s².")}
              </div>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="outline">
                {t("Buka panel samping", "Open side panel")}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-5" closeLabel={t('Tutup panel', 'Close panel')}>
              <SheetTitle>{t("Panel samping (Sheet)", "Side panel (Sheet)")}</SheetTitle>
              <SheetDescription className="mt-1">
                {t("Panel ini memuat navigasi pada layar ponsel. Tutor AI tampil langsung di dalam bacaan.", "This panel holds navigation on mobile screens. The AI tutor appears within the lesson.")}
              </SheetDescription>
            </SheetContent>
          </Sheet>

          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline">
                {t("Buka popover", "Open popover")}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="space-y-2 text-xs">
              <div className="font-medium text-foreground">{t("Arti simbol", "Symbol definitions")}</div>
              <p className="text-muted-foreground">
                {t("Popover memuat arti variabel atau pengaturan tampilan di dekat tombolnya.", "Use a popover to show variable definitions or display settings next to a button.")}
              </p>
            </PopoverContent>
          </Popover>
        </div>

        <div className="max-w-md pt-1">
          <Textarea
            rows={2}
            placeholder={t("Catatan pribadi atau pertanyaan untuk Asisten Tutor AI…", "Notes or questions for the AI tutor…")}
          />
        </div>
      </section>

      <Separator />

      {/* 4. Form Controls, Accordion, Collapsible & Tabs */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {t("4. Kontrol, bagian lipat, dan tab", "4. Controls, collapsible sections, and tabs")}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center justify-between gap-3 text-xs">
              <span>{t("Mode fokus bacaan (Switch)", "Reading focus mode (Switch)")}</span>
              <Switch checked={focusToggle} onCheckedChange={setFocusToggle} />
            </label>

            <label className="flex cursor-pointer items-center gap-2.5 text-xs">
              <Checkbox
                checked={checkedConcept}
                onCheckedChange={(v) => setCheckedConcept(v === true)}
              />
              <span>{t("Saya memahami syarat kritis ζ = 1 (Checkbox)", "I understand the critical condition ζ = 1 (Checkbox)")}</span>
            </label>

            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="text-xs text-muted-foreground">{t("Tampilan:", "View:")}</span>
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(v) => v && setViewMode(v)}
              >
                <ToggleGroupItem value="grafik">{t("Grafik", "Plot")}</ToggleGroupItem>
                <ToggleGroupItem value="fase">{t("Ruang fase", "Phase space")}</ToggleGroupItem>
                <ToggleGroupItem value="energi">{t("Energi", "Energy")}</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t("Rasio redaman (ζ)", "Damping ratio (ζ)")}</span>
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
              {t("RadioGroup pada halaman latihan", "RadioGroup on practice pages")}
            </div>
            <RadioGroup value={radioChoice} onValueChange={setRadioChoice}>
              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <RadioGroupItem value="underdamped" />
                <span>{t("Teredam kurang (0 < ζ < 1)", "Underdamped (0 < ζ < 1)")}</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <RadioGroupItem value="critical" />
                <span>{t("Teredam kritis (ζ = 1)", "Critically damped (ζ = 1)")}</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <RadioGroupItem value="overdamped" />
                <span>{t("Teredam lebih (ζ > 1)", "Overdamped (ζ > 1)")}</span>
              </label>
            </RadioGroup>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t("Progres modul & tampilan saat memuat", "Module progress & loading placeholder")}</span>
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
            <TabsTrigger value="accordion">{t("Bagian lipat", "Collapsible sections")}</TabsTrigger>
            <TabsTrigger value="callouts">{t("Catatan & label", "Callouts & badges")}</TabsTrigger>
          </TabsList>

          <TabsContent value="accordion" className="space-y-4">
            <Accordion type="single" collapsible className="border-t border-border">
              <AccordionItem value="derivation">
                <AccordionTrigger>{t("Turunkan persamaan karakteristik", "Derive the characteristic equation")}</AccordionTrigger>
                <AccordionContent>
                  <MathMarkdown
                    content={t(String.raw`Substitusi $x(t) = e^{rt}$ menghasilkan $r^2 + 2\zeta\omega_n r + \omega_n^2 = 0$.`, String.raw`Substitute $x(t) = e^{rt}$ to obtain $r^2 + 2\zeta\omega_n r + \omega_n^2 = 0$.`)}
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
                <span>{t("Buka penjelasan bertahap (CollapsibleMotion)", "Reveal explanations gradually (CollapsibleMotion)")}</span>
              </button>
              <CollapsibleMotion open={openMotion}>
                <div className="pl-6 text-[13.5px] text-muted-foreground">
                  <code>motion/react</code> {t('mengatur transisi tinggi dan opasitas serta mengikuti', 'animates height and opacity and respects')} <code>prefers-reduced-motion</code>.
                </div>
              </CollapsibleMotion>
            </div>
          </TabsContent>

          <TabsContent value="callouts" className="space-y-4">
            <Callout tone="formula" label={t("Persamaan Inti", "Main equation")}>
              <MathMarkdown content="$$m\ddot{x} + c\dot{x} + kx = 0$$" />
            </Callout>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">{t("Materi", "Lesson")}</Badge>
              <Badge variant="success">{t("Dasar", "Basic")}</Badge>
              <Badge variant="warning">{t("Menengah", "Intermediate")}</Badge>
              <Badge variant="destructive">{t("Lanjut", "Advanced")}</Badge>
              <Badge variant="tag">{t("Penyelesai RK4", "RK4 solver")}</Badge>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      {/* 5. AI Tutor UI-SDK Blocks */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {t("5. Blok penjelasan Tutor AI", "5. Explanation blocks for the AI tutor")}
        </h2>
        <p className="text-xs text-muted-foreground">
          {t('Tutor AI dapat mengubah simulasi, membuka langkah, menjelaskan rumus, dan membandingkan konsep. Blok lain memuat cek pemahaman, kesalahan umum, grafik, dan bentuk 3D.', 'The AI tutor can change simulations, open steps, explain formulas, and compare concepts. Other blocks show concept checks, common mistakes, plots, and 3D views.')}
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <AiToolInvocationView
            invocation={{
              toolName: 'showFormulaBreakdown',
              args: {
                title: t("Rasio Redaman Kanonik", "Damping ratio"),
                latex: '\\zeta = \\frac{c}{2\\sqrt{km}}',
                symbols: [
                  { symbol: 'c', meaning: t("Koefisien redaman", "Damping coefficient"), unit: 'N·s/m' },
                  { symbol: 'k', meaning: t("Konstanta pegas", "Spring stiffness"), unit: 'N/m' },
                  { symbol: 'm', meaning: t("Massa balok", "Block mass"), unit: 'kg' },
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'showStepDerivation',
              args: {
                title: t("Penurunan Bentuk Kanonik", "Derive the standard form"),
                steps: [
                  {
                    expression: 'm\\ddot{x} + c\\dot{x} + kx = 0',
                    rule: t("Hukum II Newton", "Newton’s second law"),
                  },
                  {
                    expression: '$\\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0$',
                    rule: t("Bagi dengan $m$", "Divide by $m$"),
                  },
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'showComparisonTable',
              args: {
                title: t("Perbandingan Rezim Osilasi", "Compare damping regimes"),
                columns: [t("Rezim", "Regime"), t("Syarat", "Condition"), t("Respon", "Response")],
                rows: [
                  ['Underdamped', '$0 < \\zeta < 1$', t("Osilasi meluruh", "Decaying oscillation")],
                  ['Critically damped', '$\\zeta = 1$', t("Tercepat tanpa overshoot", "Fastest return without overshoot")],
                  ['Overdamped', '$\\zeta > 1$', t("Meluruh lambat", "Slow decay")],
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'renderInteractivePlot',
              args: {
                title: t("Respons Osilator x(t) & Amplop Peluruhan", "Oscillator response x(t) & decay envelope"),
                xLabel: 't',
                xDomain: [0, 10],
                curves: [
                  { label: 'x(t)', expression: 'exp(-z * w * t) * cos(w * t)', color: 'primary' },
                  { label: t("+amplop", "+envelope"), expression: 'exp(-z * w * t)', color: 'warning' },
                ],
                sliders: [
                  { key: 'z', label: t("Redaman (ζ)", "Damping ratio (ζ)"), min: 0.02, max: 0.6, step: 0.02, defaultValue: 0.12 },
                  { key: 'w', label: t("Frekuensi (ωₙ)", "Frequency (ωₙ)"), unit: 'rad/s', min: 1, max: 6, step: 0.2, defaultValue: 3.4 },
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'renderInteractiveSimulation',
              args: {
                title: t('Respons orde satu terhadap masukan langkah', 'First-order step response'),
                description: t('Masukan naik dari 0 ke 1 pada $t=0$. Model memakai $y(t)=1-e^{-t/\\tau}$ dengan keluaran awal nol. Ubah konstanta waktu, lalu putar animasi untuk melihat laju perubahan respons.', 'The input rises from 0 to 1 at $t=0$. The model uses $y(t)=1-e^{-t/\\tau}$ with zero initial output. Change the time constant, then play the animation to compare response rates.'),
                duration: 8,
                xDomain: [0, 8],
                yDomain: [0, 1.1],
                xLabel: t('Waktu (s)', 'Time (s)'),
                yLabel: t('Respons y', 'Response y'),
                particles: [{ label: 'y(t)', xExpression: 't', yExpression: '1-exp(-t/tau)', trail: true }],
                readouts: [
                  { label: 'y(t)', expression: '1-exp(-t/tau)' },
                  { label: 'dy/dt', expression: 'exp(-t/tau)/tau', unit: 's⁻¹' },
                ],
                sliders: [{ key: 'tau', label: t('Konstanta waktu (τ)', 'Time constant (τ)'), unit: 's', min: 0.2, max: 4, step: 0.2, defaultValue: 1 }],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'renderInteractive3D',
              args: {
                title: t("Permukaan Gelombang 3D · z(x, y)", "3D wave surface · z(x, y)"),
                mode: 'surface',
                domain: [-1.5, 1.5],
                surfaceExpression: 'cos(k * sqrt(x^2 + y^2)) * exp(-a * (x^2 + y^2))',
                sliders: [
                  { key: 'k', label: t("Bilangan gelombang (k)", "Wave number (k)"), min: 1.5, max: 6, step: 0.25, defaultValue: 3.5 },
                  { key: 'a', label: t("Peluruhan (a)", "Decay (a)"), min: 0.1, max: 1.2, step: 0.05, defaultValue: 0.45 },
                ],
              },
            }}
          />

          <AiToolInvocationView
            invocation={{
              toolName: 'showPitfallWarning',
              args: {
                title: t("Kesalahan Umum Ujian", "Common exam mistake"),
                misconception: t("Memakai ωₙ sebagai frekuensi osilasi teredam.", "Using ωₙ as the damped oscillation frequency."),
                correction: t(String.raw`Gunakan $\omega_d = \omega_n\sqrt{1 - \zeta^2}$.`, String.raw`Use $\omega_d = \omega_n\sqrt{1 - \zeta^2}$.`),
              },
            }}
          />
        </div>
      </section>
    </article>
  );
}

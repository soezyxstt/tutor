import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUp, BotMessageSquare, Check, Loader2, LogOut, Plus, RefreshCw, Search, X } from 'lucide-react';
import { CatalogShell, useLanguage } from '@tutor/core/catalog';
import { Button, Checkbox, CollapsibleMotion, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, cn } from '@tutor/ui';

type Provider = 'custom-muse' | 'google-ai-studio' | 'openai';
type Model = {
  id: string;
  provider: Provider;
  label: string;
  inputModalities: string[];
  toolCalling: boolean | null | 'unknown';
  selectable: boolean;
  status: 'available' | 'unverified' | 'retired';
  source: 'provider-api' | 'cached' | 'reference' | 'manual';
  capabilitySource?: string;
};
type Settings = { primaryModel: string; fallbackModels: string[]; updatedAt?: string | null; source?: string };
type Inventory = {
  models: Model[];
  providers: { id: Provider; status: string; error?: string; checkedAt?: string }[];
  updatedAt?: string;
};

const providerNames: Record<Provider, string> = {
  'custom-muse': 'Muse AI',
  'google-ai-studio': 'Gemini AI Studio',
  openai: 'OpenAI',
};
const providers = Object.keys(providerNames) as Provider[];

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...options,
    credentials: 'same-origin',
    cache: 'no-store',
    signal: AbortSignal.timeout(45_000),
    headers: { ...(options?.body ? { 'Content-Type': 'application/json' } : {}), ...options?.headers },
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => ({})) as { error?: string };
    throw new ApiError(response.status, detail.error || `HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export default function AdminPage() {
  const { locale, t } = useLanguage();
  const [session, setSession] = useState<'loading' | 'guest' | 'admin' | 'error'>('loading');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saved, setSaved] = useState<Settings | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('all');
  const [inputFilter, setInputFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(36);
  const [manualOpen, setManualOpen] = useState(false);
  const [manualProvider, setManualProvider] = useState<Provider>('custom-muse');
  const [manualId, setManualId] = useState('');
  const [manualInvalid, setManualInvalid] = useState(false);
  const [allowUnverified, setAllowUnverified] = useState(false);

  useEffect(() => { document.title = t('Setelan tutor AI · Tutor', 'AI tutor settings · Tutor'); }, [t]);

  const describeError = useCallback((reason: unknown) => {
    if (reason instanceof ApiError) {
      if (reason.status === 401) return t('Nama pengguna atau kata sandi tidak cocok. Silakan masuk kembali.', 'The username or password did not match. Please sign in again.');
      if (reason.status === 429) return t('Terlalu banyak percobaan. Tunggu beberapa menit, lalu coba lagi.', 'Too many attempts. Wait a few minutes, then try again.');
      if (reason.status === 403) return t('Permintaan tidak valid. Muat ulang halaman, lalu coba lagi.', 'This request is not valid. Reload the page, then try again.');
      if (reason.status >= 500) return t('Server belum dapat memproses permintaan. Coba lagi sebentar.', 'The server could not process your request. Please try again shortly.');
      return t('Periksa pilihan model. Model harus mendukung percakapan dan alat tutor.', 'Check your model choices. Models must support chat and tutor tools.');
    }
    return t('Koneksi terputus atau respons terlalu lama. Coba lagi.', 'The connection failed or took too long. Please try again.');
  }, [t]);

  // Keep the request callbacks stable when language changes. Refetching here
  // would otherwise overwrite model choices that the admin has not saved yet.
  const describeErrorRef = useRef(describeError);
  describeErrorRef.current = describeError;

  const checkSession = useCallback(async () => {
    setSession('loading'); setError('');
    try {
      const result = await api<{ authenticated: boolean }>('/api/admin/session');
      setSession(result.authenticated ? 'admin' : 'guest');
    } catch (reason) {
      setSession('error'); setError(describeErrorRef.current(reason));
    }
  }, []);

  useEffect(() => { void checkSession(); }, [checkSession]);

  const loadAdminData = useCallback(async () => {
    setLoadingData(true); setError('');
    try {
      const [nextSettings, nextInventory] = await Promise.all([
        api<Settings>('/api/admin/settings'),
        api<Inventory>('/api/admin/models'),
      ]);
      setSaved(nextSettings); setSettings(nextSettings); setInventory(nextInventory);
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) setSession('guest');
      setError(describeErrorRef.current(reason));
    } finally { setLoadingData(false); }
  }, []);

  useEffect(() => { if (session === 'admin') void loadAdminData(); }, [session, loadAdminData]);

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) });
      setSession('admin'); setUsername('');
    } catch (reason) { setError(describeError(reason)); }
    finally { setBusy(false); setPassword(''); }
  }

  async function logout() {
    setBusy(true); setError('');
    try {
      await api('/api/admin/logout', { method: 'POST' });
      setSession('guest'); setSettings(null); setSaved(null); setInventory(null); setNotice('');
    } catch (reason) { setError(describeError(reason)); }
    finally { setBusy(false); }
  }

  async function refreshModels() {
    setRefreshing(true); setError(''); setNotice('');
    try { setInventory(await api<Inventory>('/api/admin/models?refresh=1')); }
    catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) setSession('guest');
      setError(describeError(reason));
    } finally { setRefreshing(false); }
  }

  const modelById = useMemo(() => new Map(inventory?.models.map(model => [model.id, model])), [inventory]);
  const selectedIds = settings ? [settings.primaryModel, ...settings.fallbackModels] : [];
  const unverified = selectedIds.some(id => {
    const model = modelById.get(id);
    return !model || model.status !== 'available' || model.toolCalling === null || model.toolCalling === 'unknown' || model.capabilitySource === 'unknown';
  });
  const dirty = !!settings && !!saved && (settings.primaryModel !== saved.primaryModel || JSON.stringify(settings.fallbackModels) !== JSON.stringify(saved.fallbackModels));

  const filteredModels = useMemo(() => {
    const words = query.trim().toLocaleLowerCase(locale).split(/\s+/).filter(Boolean);
    return (inventory?.models || []).filter(model => {
      if (provider !== 'all' && model.provider !== provider) return false;
      if (inputFilter === 'multimodal' && model.inputModalities.filter(value => value !== 'text').length === 0) return false;
      if (inputFilter === 'unknown' && model.capabilitySource !== 'unknown') return false;
      return words.every(word => `${model.label} ${model.id} ${providerNames[model.provider] || model.provider}`.toLocaleLowerCase(locale).includes(word));
    });
  }, [inventory, query, provider, inputFilter, locale]);

  useEffect(() => { setVisibleCount(36); }, [query, provider, inputFilter]);

  function usePrimary(id: string) {
    if (!settings) return;
    setSettings({ ...settings, primaryModel: id, fallbackModels: settings.fallbackModels.filter(value => value !== id) });
    setNotice(''); setAllowUnverified(false);
  }

  function addFallback(id: string) {
    if (!settings || selectedIds.includes(id) || settings.fallbackModels.length >= 5) return;
    setSettings({ ...settings, fallbackModels: [...settings.fallbackModels, id] });
    setNotice(''); setAllowUnverified(false);
  }

  function moveFallback(index: number, direction: number) {
    if (!settings) return;
    const next = [...settings.fallbackModels];
    [next[index], next[index + direction]] = [next[index + direction], next[index]];
    setSettings({ ...settings, fallbackModels: next }); setNotice('');
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault(); if (!settings) return;
    setBusy(true); setError(''); setNotice('');
    try {
      const result = await api<Settings>('/api/admin/settings', { method: 'PUT', body: JSON.stringify({ primaryModel: settings.primaryModel, fallbackModels: settings.fallbackModels, allowUnverifiedModels: allowUnverified }) });
      setSaved(result); setSettings(result);
      setNotice(t('Setelan tersimpan. Semua mata kuliah akan memakai pilihan ini dalam sekitar 30 detik.', 'Settings saved. All courses will use these choices within about 30 seconds.'));
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401) setSession('guest');
      setError(describeError(reason));
    } finally { setBusy(false); }
  }

  function manualModel(event: FormEvent) {
    event.preventDefault();
    const value = manualId.trim().replace(new RegExp(`^${manualProvider}/`), '');
    const id = `${manualProvider}/${value}`;
    if (!value || id.length > 240 || !/^[a-zA-Z0-9][a-zA-Z0-9._:/-]*$/.test(value) || value.includes('..') || value.endsWith('/')) {
      setManualInvalid(true); return;
    }
    setManualInvalid(false);
    if (!modelById.has(id)) {
      const model: Model = { id, provider: manualProvider, label: value, inputModalities: [], toolCalling: null, selectable: true, status: 'unverified', source: 'manual', capabilitySource: 'unknown' };
      setInventory(current => current ? { ...current, models: [...current.models, model] } : { models: [model], providers: [] });
    }
    setQuery(value); setProvider(manualProvider); setInputFilter('all'); setManualId(''); setManualOpen(false);
  }

  function modalityName(value: string) {
    if (value === 'text') return t('Teks', 'Text');
    if (value === 'image') return t('Gambar', 'Image');
    if (value === 'audio') return 'Audio';
    if (value === 'video') return 'Video';
    if (value === 'pdf' || value === 'document') return t('Dokumen', 'Document');
    return value;
  }

  const statusLabel = (value: string) => value === 'live' ? t('Terhubung', 'Connected') : value === 'cached' ? t('Daftar tersimpan', 'Saved list') : value === 'reference' ? t('Daftar referensi', 'Reference list') : t('Belum terhubung', 'Not connected');

  return (
    <CatalogShell section="admin" actions={session === 'admin' ? <Button size="icon" onClick={() => void logout()} disabled={busy} aria-label={t('Keluar', 'Sign out')} title={t('Keluar', 'Sign out')}><LogOut /></Button> : undefined}>
      {session === 'loading' ? <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground" role="status"><Loader2 className="size-4 animate-spin" />{t('Memeriksa sesi…', 'Checking your session…')}</div> : session === 'error' ? <div className="py-10"><p className="mb-4 text-sm text-destructive" role="alert">{error}</p><Button onClick={() => void checkSession()}>{t('Coba lagi', 'Try again')}</Button></div> : session === 'guest' ? (
        <div className="mx-auto max-w-sm py-8 sm:py-14">
          <h1 className="text-2xl font-semibold tracking-tight">{t('Masuk sebagai admin', 'Admin sign in')}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('Masuk untuk memilih model tutor AI.', 'Sign in to choose the AI tutor models.')}</p>
          <form onSubmit={login} className="mt-8 space-y-5">
            <div><label htmlFor="admin-username" className="mb-2 block text-sm">{t('Nama pengguna', 'Username')}</label><Input id="admin-username" name="username" value={username} onChange={event => setUsername(event.target.value)} autoComplete="username" autoCapitalize="none" spellCheck={false} maxLength={256} required className="h-10 text-base" /></div>
            <div><label htmlFor="admin-password" className="mb-2 block text-sm">{t('Kata sandi', 'Password')}</label><Input id="admin-password" name="password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" maxLength={1024} required className="h-10 text-base" /></div>
            {error && <p role="alert" className="text-sm leading-relaxed text-destructive">{error}</p>}
            <Button type="submit" size="lg" isLoading={busy} disabled={!username || !password} className="h-10 w-full">{t('Masuk', 'Sign in')}</Button>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-3">
            <BotMessageSquare className="mt-1 size-6 shrink-0 text-primary" aria-hidden="true" />
            <div><h1 className="text-[28px] leading-tight font-semibold tracking-tight">{t('Setelan tutor AI', 'AI tutor settings')}</h1><p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{t('Pilih model utama dan model cadangan untuk semua mata kuliah.', 'Choose a primary model and backup models for every course.')}</p></div>
          </div>
          {error && <div className="mt-5 border-l-2 border-destructive pl-3 text-sm leading-relaxed text-destructive" role="alert">{error}</div>}
          {notice && <div className="mt-5 flex items-start gap-2 border-l-2 border-success pl-3 text-sm leading-relaxed text-success" role="status"><Check className="mt-0.5 size-4 shrink-0" />{notice}</div>}
          {loadingData ? <div className="flex items-center gap-2 py-14 text-sm text-muted-foreground" role="status"><Loader2 className="size-4 animate-spin" />{t('Memuat setelan dan daftar model…', 'Loading settings and model lists…')}</div> : !settings || !inventory ? <Button className="mt-5" onClick={() => void loadAdminData()}>{t('Muat ulang setelan', 'Reload settings')}</Button> : <>
            <form onSubmit={saveSettings} className="mt-8 border-y border-border py-6">
              <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <section aria-labelledby="primary-heading">
                  <h2 id="primary-heading" className="text-sm font-semibold">{t('Model utama', 'Primary model')}</h2>
                  <p className="mt-2 break-all font-mono text-[13px] leading-relaxed text-primary" data-testid="primary-model">{settings.primaryModel}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t('Tutor mencoba model ini lebih dulu.', 'The tutor tries this model first.')}</p>
                </section>
                <section aria-labelledby="fallback-heading">
                  <h2 id="fallback-heading" className="text-sm font-semibold">{t('Urutan model cadangan', 'Backup model order')}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t('Tutor mencoba model cadangan jika model sebelumnya gagal memulai jawaban.', 'The tutor tries each backup if the previous model cannot start a response.')}</p>
                  {settings.fallbackModels.length === 0 ? <p className="mt-3 text-xs text-muted-foreground">{t('Belum ada model cadangan.', 'No backup models yet.')}</p> : <ol className="mt-2 divide-y divide-border">
                    {settings.fallbackModels.map((id, index) => <li key={id} className="flex items-center gap-2 py-2">
                      <span className="text-xs text-muted-foreground">{index + 1}.</span><span className="min-w-0 flex-1 break-all font-mono text-xs leading-relaxed">{id}</span>
                      <div className="flex shrink-0 gap-0.5">
                        <Button size="icon-sm" disabled={index === 0} aria-label={t(`Naikkan prioritas ${id}`, `Move ${id} up`)} onClick={() => moveFallback(index, -1)}><ArrowUp /></Button>
                        <Button size="icon-sm" disabled={index === settings.fallbackModels.length - 1} aria-label={t(`Turunkan prioritas ${id}`, `Move ${id} down`)} onClick={() => moveFallback(index, 1)}><ArrowDown /></Button>
                        <Button size="icon-sm" aria-label={t(`Hapus ${id}`, `Remove ${id}`)} onClick={() => { setSettings({ ...settings, fallbackModels: settings.fallbackModels.filter(value => value !== id) }); setNotice(''); }}><X /></Button>
                      </div>
                    </li>)}
                  </ol>}
                </section>
              </div>
              {unverified && <label className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground"><Checkbox checked={allowUnverified} onCheckedChange={value => setAllowUnverified(value === true)} className="mt-0.5" /><span>{t('Saya sudah memeriksa akses model ini. Daftar provider belum memastikan semua kemampuan model pilihan saya.', 'I have checked access to these models. The provider list does not confirm every capability of my selected models.')}</span></label>}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button type="submit" size="lg" isLoading={busy} disabled={!dirty || (unverified && !allowUnverified)}>{t('Simpan setelan', 'Save settings')}</Button>
                {dirty ? <Button variant="ghost" onClick={() => { setSettings(saved); setAllowUnverified(false); setNotice(''); }}>{t('Batalkan perubahan', 'Discard changes')}</Button> : <span className="text-xs text-muted-foreground">{saved?.updatedAt ? t('Perubahan terakhir: ', 'Last saved: ') + new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(saved.updatedAt)) : t('Mengikuti setelan awal.', 'Using the initial settings.')}</span>}
              </div>
            </form>

            <section className="pt-7" aria-labelledby="model-list-heading">
              <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="model-list-heading" className="text-lg font-semibold tracking-tight">{t('Daftar model', 'Model list')}</h2><Button variant="ghost" isLoading={refreshing} onClick={() => void refreshModels()}><RefreshCw />{t('Perbarui daftar', 'Refresh list')}</Button></div>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground">{t('Daftar mencakup model terbaru dan model lama yang masih tersedia. Pilih Teks + media untuk melihat model dengan lebih dari satu jenis masukan.', 'The list includes current and older models that remain available. Choose Text + media to see models with more than one input type.')}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-xs">
                {inventory.providers.map(item => <div key={item.id}><span className="font-medium">{providerNames[item.id] || item.id}</span><span className={cn('ml-2', item.status === 'live' ? 'text-success' : 'text-warning')}>{statusLabel(item.status)}</span></div>)}
              </div>
              {inventory.providers.some(item => item.status !== 'live') && <p className="mt-3 border-l-2 border-warning/50 pl-3 text-xs leading-relaxed text-muted-foreground">{t('Sebagian provider belum mengirim daftar terbaru. Model dari daftar tersimpan atau referensi perlu Anda cek sebelum digunakan.', 'Some providers have not returned a current list. Check access before using models from a saved or reference list.')}</p>}
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-3">
                <div className="flex min-w-48 flex-1 items-center gap-2"><Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /><Input aria-label={t('Cari model', 'Search models')} placeholder={t('Cari nama atau ID model…', 'Search model name or ID…')} value={query} onChange={event => setQuery(event.target.value)} className="h-9 border-0" />{query && <Button size="icon-sm" aria-label={t('Hapus pencarian', 'Clear search')} onClick={() => setQuery('')}><X /></Button>}</div>
                <Select value={provider} onValueChange={setProvider}><SelectTrigger aria-label={t('Provider model', 'Model provider')} className="h-9"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t('Semua provider', 'All providers')}</SelectItem>{providers.map(id => <SelectItem key={id} value={id}>{providerNames[id]}</SelectItem>)}</SelectContent></Select>
                <Select value={inputFilter} onValueChange={setInputFilter}><SelectTrigger aria-label={t('Jenis masukan model', 'Model input types')} className="h-9"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">{t('Semua masukan', 'All inputs')}</SelectItem><SelectItem value="multimodal">{t('Teks + media', 'Text + media')}</SelectItem><SelectItem value="unknown">{t('Belum diketahui', 'Unknown inputs')}</SelectItem></SelectContent></Select>
              </div>
              <p className="py-3 text-xs text-muted-foreground" aria-live="polite">{filteredModels.length} {t('model ditemukan', 'models found')}</p>
              <ul className="divide-y divide-border" aria-label={t('Model yang tersedia', 'Available models')}>
                {filteredModels.slice(0, visibleCount).map(model => {
                  const isPrimary = settings.primaryModel === model.id;
                  const isFallback = settings.fallbackModels.includes(model.id);
                  return <li key={model.id} className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 py-4">
                    <div className="min-w-0 flex-1 basis-52"><h3 className="break-words text-sm font-medium">{model.label}</h3><p className="mt-1 break-all font-mono text-[11px] leading-relaxed text-muted-foreground">{model.id}</p><p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{model.inputModalities.length ? model.inputModalities.map(modalityName).join(' · ') : t('Jenis masukan belum diketahui', 'Input types unknown')}{model.toolCalling === true ? t(' · Alat tutor', ' · Tutor tools') : model.toolCalling === false ? t(' · Tanpa alat tutor', ' · No tutor tools') : t(' · Dukungan alat belum pasti', ' · Tool support unconfirmed')}{model.status !== 'available' && <span className="text-warning">{model.status === 'retired' ? t(' · Tidak didukung', ' · No longer supported') : t(' · Perlu dicek', ' · Check availability')}</span>}</p></div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      {isPrimary ? <span className="inline-flex items-center gap-1 text-xs font-medium text-primary"><Check className="size-3.5" />{t('Utama', 'Primary')}</span> : <Button variant="outline" disabled={!model.selectable || busy} onClick={() => usePrimary(model.id)}>{t('Jadikan utama', 'Set as primary')}</Button>}
                      {!isPrimary && (isFallback ? <span className="text-xs text-muted-foreground">{t('Cadangan', 'Backup')} {settings.fallbackModels.indexOf(model.id) + 1}</span> : <Button variant="ghost" disabled={!model.selectable || busy || settings.fallbackModels.length >= 5} onClick={() => addFallback(model.id)}><Plus />{t('Cadangan', 'Backup')}</Button>)}
                    </div>
                  </li>;
                })}
              </ul>
              {filteredModels.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">{t('Tidak ada model yang cocok. Coba kata lain atau ubah filter.', 'No models match. Try another name or change the filters.')}</p>}
              {visibleCount < filteredModels.length && <Button variant="outline" className="mt-5" onClick={() => setVisibleCount(count => count + 60)}>{t(`Tampilkan berikutnya (${filteredModels.length - visibleCount} tersisa)`, `Show more (${filteredModels.length - visibleCount} remaining)`)}</Button>}
              <div className="mt-6 border-t border-border pt-4">
                <Button variant="ghost" onClick={() => setManualOpen(value => !value)} aria-expanded={manualOpen} aria-controls="manual-model"><Plus />{t('Tambahkan ID model', 'Add a model ID')}</Button>
                <CollapsibleMotion open={manualOpen}><form id="manual-model" onSubmit={manualModel} className="space-y-3 pt-4"><p className="max-w-xl text-xs leading-relaxed text-muted-foreground">{t('Gunakan ID persis dari provider jika model belum tercantum. Model tambahan perlu mendukung percakapan dan alat tutor.', 'Use the exact provider ID if a model is missing. The model must support chat and tutor tools.')}</p><div className="flex flex-wrap items-center gap-3"><Select value={manualProvider} onValueChange={value => setManualProvider(value as Provider)}><SelectTrigger aria-label={t('Provider model tambahan', 'Custom model provider')}><SelectValue /></SelectTrigger><SelectContent>{providers.map(id => <SelectItem key={id} value={id}>{providerNames[id]}</SelectItem>)}</SelectContent></Select><Input aria-label="Model ID" placeholder="Model ID" value={manualId} onChange={event => { setManualId(event.target.value); setManualInvalid(false); }} className="min-w-48 flex-1 font-mono" maxLength={200} required /><Button type="submit" variant="outline">{t('Tambahkan', 'Add model')}</Button></div>{manualInvalid && <p className="text-xs text-destructive" role="alert">{t('Periksa ID model. Gunakan huruf, angka, titik, garis bawah, titik dua, garis miring, atau tanda hubung.', 'Check the model ID. Use letters, numbers, periods, underscores, colons, slashes, or hyphens.')}</p>}</form></CollapsibleMotion>
              </div>
            </section>
          </>}
        </div>
      )}
    </CatalogShell>
  );
}

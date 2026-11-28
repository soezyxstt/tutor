import { Languages } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tutor/ui';
import { useLanguage } from './language-provider';
import { isLanguagePreference } from './language';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, preference, setPreference, t } = useLanguage();
  return (
    <Select value={preference} onValueChange={(value) => { if (isLanguagePreference(value)) setPreference(value); }}>
      <SelectTrigger aria-label={t('Bahasa', 'Language')} title={t('Pilih bahasa', 'Choose language')} className={compact ? 'h-8 gap-1 px-1 text-xs' : 'h-8 gap-1.5 px-1.5 text-xs'}>
        <Languages className="size-3.5 shrink-0" aria-hidden="true" />
        <SelectValue>{compact ? locale.toUpperCase() : preference === 'system' ? t('Sistem', 'System') : locale === 'id' ? 'Indonesia' : 'English'}</SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="system">{t('Ikuti bahasa sistem', 'Use system language')}</SelectItem>
        <SelectItem value="id">Bahasa Indonesia</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}

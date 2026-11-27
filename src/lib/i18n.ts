import type { Locale, Localized, Topic } from "@/content/types";
export const L = (id: string, en: string): Localized => ({ id, en });
export const text = (locale: Locale, id: string, en: string) =>
  locale === "id" ? id : en;
export const topics: Record<Topic, Localized> = {
  flow: L("Aliran", "Flow"),
  temperature: L("Temperatur", "Temperature"),
  strain: L("Regangan", "Strain"),
  position: L("Posisi", "Position"),
  signal: L("Sinyal", "Signals"),
  calibration: L("Kalibrasi", "Calibration"),
  systems: L("Sistem ukur", "Measurement systems"),
  dynamics: L("Respons dinamis", "Dynamic response"),
  statistics: L("Data & galat", "Data & error"),
};
export const examName = (exam: string, locale: Locale) =>
  exam === "uts2"
    ? text(locale, "UTS 2", "Midterm 2")
    : text(locale, "UAS", "Final exam");
export const num = (value: number, locale: Locale, digits = 3) =>
  new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", {
    maximumFractionDigits: digits,
  }).format(value);

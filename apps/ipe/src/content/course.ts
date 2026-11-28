import type { CourseConfig } from '@tutor/core';
import { module as m1, english as en1 } from './m1-systems';
import { module as m2, english as en2 } from './m2-calibration';
import { module as m3, english as en3 } from './m3-statistics';
import { module as m4, english as en4 } from './m4-dynamics';
import { module as m5, english as en5 } from './m5-signal';
import { module as m6, english as en6 } from './m6-flow';
import { module as m7, english as en7 } from './m7-temperature';
import { module as m8, english as en8 } from './m8-position';

export const course: CourseConfig = {
  slug: 'ipe', code: 'MS3105',
  title: 'Instrumentasi, Pengukuran & Eksperimen',
  subtitle: 'Materi, latihan konsep, dan pembahasan UTS 1, UTS 2, serta UAS 2023 sampai 2025.',
  domain: 'ipe.tutor.adihnursyam.com', sourceLanguage: 'id',
  catalog: { status: 'published' },
  modules: [m1, m2, m3, m4, m5, m6, m7, m8],
  translations: { en: {
    title: 'Instrumentation, Measurement & Experiment',
    subtitle: 'Lessons, concept practice, and worked Midterm 1, Midterm 2, and final exams from 2023 to 2025.',
    modules: {
      'ipe-systems': en1,
      'ipe-calibration': en2,
      'ipe-statistics': en3,
      'ipe-dynamics': en4,
      'ipe-signal': en5,
      'ipe-flow': en6,
      'ipe-temperature': en7,
      'ipe-position': en8,
    },
  } },
};

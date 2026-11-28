import type { CourseConfig } from '@tutor/core';

export const course: CourseConfig = {
  slug: 'starter',
  sourceLanguage: 'id',
  catalog: { status: 'draft' },
  code: 'MK1001',
  title: 'Nama Mata Kuliah',
  subtitle: 'Materi & Pembahasan Soal',
  domain: 'starter.tutor.adihnursyam.com',
  semester: 'Semester 1',
  modules: [
    {
      id: 'mod-1',
      code: 'M1',
      title: 'Pendahuluan',
      items: [
        {
          id: 'prob-1',
          kind: 'problem',
          slug: 'contoh-soal-1',
          title: 'Contoh Pembahasan Soal',
          difficulty: 'dasar',
          estimatedMinutes: 5,
          statement:
            'Ganti pernyataan soal ini dengan soal mata kuliah Anda. Mendukung rumus inline $E = mc^2$ dan persamaan blok.',
          given: ['Data awal pertama', 'Data awal kedua'],
          asked: 'Besaran yang dicari.',
          steps: [
            {
              id: 's1',
              title: 'Langkah pertama',
              summary: 'Identifikasi prinsip utama.',
              content: 'Tuliskan penurunan matematis di sini:\n\n$$a + b = c$$',
            },
          ],
          finalAnswer: 'Hasil akhir soal.',
        },
      ],
    },
  ],
};

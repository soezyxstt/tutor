# IPE reference audit

This audit extends the migrated MS3105 IPE course using all three supplied
Pengukuran Teknik reference documents. It maps the references to the existing
47 exam problems and adds selected theory, reasoning checks, and source notes
in Indonesian and English. It does not claim a complete conversion of every
slide topic or exercise into the course.

The original exam baseline remains the IPE app on `staging`, commit
`802aead07004425dce164dd704f5f6a964a142fa`. See the
[migration record](ipe-migration.md) for the app structure and deployment path.

## Source inventory

The supplied [Drive folder](https://drive.google.com/drive/u/0/folders/11H5kvHgCXSnJa5OBRDp5Wea7DdX5wCFc)
contains three distinct reference documents. The following links identify the
versions used by the course. Page numbers in this audit and in the app count
**physical PDF pages from 1**, rather than individual slides or printed slide
numbers.

| Reference | Verified PDF pages | Main scope used in this update | Problems citing it |
| --- | --- | --- | --- |
| [Pengukuran Teknik, Bagian 1 (2022)](https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view) | 17 | Measurement functions, bridges and amplifiers, static calibration, environmental effects, repeatability, and uncertainty | 31 |
| [Pengukuran Teknik, Bagian 2 (2022)](https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view) | 10 | System error, compensation, negative feedback, inverse models, and time and frequency response | 18 |
| [Pengukuran Teknik, Bagian 3 (2022)](https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view) | 26 | Sensor principles and applications: flow, temperature, displacement, strain, speed, and acceleration | 27 |

The citation counts overlap: one problem can use more than one reference.
All 47 problems have page-specific course references after the update.

### Duplicate Part 2 download

Two downloaded Part 2 files have different byte-level SHA-256 hashes:

| Download | SHA-256 |
| --- | --- |
| Canonical Part 2 | `2cc4e64e7c5f401decf4edd90797ff7ab799f353f9786c5c1899bc7cc90e26a7` |
| Second Part 2 copy | `3cc9dd29e2196e93004c62a4231b2b322e90d1f1468c50039c1568524b71bbe6` |

Both contain 10 pages. Their extracted text matches, and comparison of the
full-page pixel renders found no difference on any of the 10 pages. The audit
therefore treats them as one content source and uses the canonical Part 2 link
above. Different download hashes alone do not establish a content difference.
The PDF files and audit renders are not copied into the app or this repository.

## What changed in the eight modules

The course still has eight material lessons. Their short theory units and
matching decision checks increased from **8 to 30**. These 30 material checks
are separate from the **30 original concept questions** in the practice sets.
Each added decision includes feedback for every option and keeps stable IDs
between languages.

| Native module | Theory units and checks, before → after | Problems with new source notes | Source-grounded update |
| --- | --- | --- | --- |
| [M1: Systems](../apps/ipe/src/content/m1-systems.ts) | 1 → 5 | 5 | Four measurement functions; stage units and complete-system gain; direct and inverse calibration; exact feedback gain and its high-gain limit; mean error versus spread |
| [M2: Calibration](../apps/ipe/src/content/m2-calibration.ts) | 1 → 5 | 10 | Range versus span; endpoint reference lines; signed nonlinearity; local sensitivity; environmental slope and zero shifts; hysteresis and resolution |
| [M3: Error and uncertainty](../apps/ipe/src/content/m3-statistics.ts) | 1 → 4 | 4 | Bias and spread; propagation through later stages; related coefficients; sample spread versus uncertainty of a mean |
| [M4: Time and frequency response](../apps/ipe/src/content/m4-dynamics.ts) | 1 → 6 | 7 | Initial conditions between time intervals; static sensitivity versus dynamic attenuation; second-order amplitude and phase; error-based frequency limits; frequency components; compensation limits |
| [M5: Signal circuits](../apps/ipe/src/content/m5-signal.ts) | 1 → 4 | 2 | Bridge nodes and polarity; inverting and non-inverting amplifier connections; the source RC circuit and frequency response; the limits of the illustrative active-filter circuit |
| [M6: Flow](../apps/ipe/src/content/m6-flow.ts) | 1 → 1 | 0 | Retained the existing flow theory and worked steps; moved the six problems to plural references while keeping their relevant Part 3 pages |
| [M7: Temperature](../apps/ipe/src/content/m7-temperature.ts) | 1 → 3 | 7 | Sensor nonlinearity and reference-junction correction; time measured from a temperature change; links between sensor principles and the applicable static or dynamic model |
| [M8: Position, displacement, and strain](../apps/ipe/src/content/m8-position.ts) | 1 → 2 | 6 | Resolution, sensitivity, and accuracy; functional and circuit references that support the existing position and strain problems |
| **Total** | **8 → 30** | **41** | **All eight modules retain their original exam problems and practice sets.** |

The six flow problems keep Part 3 as their course reference. They do not receive
unrelated Part 1 or Part 2 citations merely to make the source lists uniform.

Several existing limits remain explicit. The temperature calibration table that
stops at 90 °C does not establish behavior through its stated 120 °C range. The
conflicting displacement range and table values remain visible. The RC circuit
on Part 2 page 6 and amplifier circuits on Part 1 page 8 support the active-filter
example, but they do not identify the exact laboratory schematic requested by
the 2025 exam. Additional theory sources do not replace missing exam data.

## Verified source errata

The review checked equations against rendered pages as well as extracted text.
Two printed errors need care in future authoring.

| Source | Printed issue | Resolution used in the course |
| --- | --- | --- |
| [Part 1, PDF page 5](https://drive.google.com/file/d/1Jr_rHWlZKSQPUH87TGEL7w8GgDuixE0A/view) | The page writes `V = KT + a` but describes sensitivity with the inverse ratio `K = ΔT/ΔV`. That ratio has the wrong direction and units for the coefficient multiplying temperature in this model. | Use output change per input change: `K = ΔV/ΔT` for this voltage-versus-temperature model. Part 1 page 12 gives `K = ΔO/ΔI`; page 13 gives local sensitivity `dO/dI = K + dN/dI`. |
| [Part 2, PDF page 3](https://drive.google.com/file/d/1VyFbwvvW_N_A9vbipKjYTGkX3CnjXONr/view) | The displayed values `T_M = 116.95 °C` and `T = 117 °C` accompany a printed mean error of `−0.005 °C`. | For the displayed values, `E = T_M − T = 116.95 − 117 = −0.05 °C`. Use the measured-minus-reference definition from Part 2 page 1 and do not copy the inconsistent arithmetic result. |

These errata do not authorize silent changes to historical exam statements.
The update preserves the original papers and worked explanations, and uses
consistent definitions in the added theory and source notes.

## Source display, translation, and AI context

Each problem now uses `sourceDetails.references`, an array of
`{ url, title, pages }`, so it can cite more than one course reference. The
original exam URL, filename, page locator, verbatim text, and original language
remain separate fields in `sourceDetails`. Core retains the older singular
`reference` field only as a fallback for other courses.

The shared [problem view](../packages/core/src/content/problem-view.tsx) exposes
source links and page numbers in the keyboard-operable **Read the original
problem and sources** accordion. Its labels follow the selected language; the
verbatim exam text retains its original language with a `lang` attribute.
References stay identical between locales so switching language cannot change
source identity or page numbers.

The `sourceNotes` added to 41 problems explain how the course material supports
a solution and where its assumptions limit the result. They appear in a labeled **Basis in the
course material** section, with Markdown and mathematics rendered through the
shared reader. English overlays translate the notes, while the source evidence
stays unchanged. The [course type](../packages/core/src/types/course.ts) keeps
this distinction explicit.

`ProblemView` includes the note text plus each reference title, page list, and
URL in the context for problem and simulation AI threads. It also passes that
same context to the solution steps. The tutor therefore receives the curated
source basis and assumptions for the current problem; this does not imply that
it has fetched or read every page of the PDFs.

## Preservation and verification

The immutable [migration baseline](../apps/ipe/tests/migration-baseline.json)
continues to describe the original exam content. The
[content tests](../apps/ipe/tests/content.test.ts) keep that baseline separate
from the expanded course-reference metadata.

| Check | Result for this update |
| --- | --- |
| Original exam problems and source papers | 47 problems across nine papers retained |
| Original detailed explanation steps | All 419 retained in both languages |
| Original practice questions | All 30 retain options, answer keys, explanations, feedback, and related problem IDs |
| Original visuals | All 90 retain placement, fixed source parameters, and both captions |
| Original source evidence | Exam URLs, files, page locators, original language, and verbatim source text retained |
| Original exam solution content | Numbers, equations, tables, assumptions, final answers, and detailed explanation fingerprints retained |
| English coverage | All 63 lessons have complete overlays and stable IDs |
| Runtime mathematics | 3,282 expressions checked through KaTeX and the shared Markdown renderer across both languages |
| Schema and pedagogy | `pnpm validate` passed with 0 errors and 0 warnings; each of the 30 theory units has a decision check |
| TypeScript and targeted content suite | IPE typecheck passed; all nine content tests passed |

These checks confirm content preservation, reference structure, translation
coverage, and math rendering. The source-page review supports the mappings.
The new theory does not cover every topic or exercise in the three source PDFs. App build, shared
runtime tests, browser checks, and deployment review remain part of the broader
[migration workflow](ipe-migration.md#run-and-verify).

## Audited reference map for all 47 problems

A dash means the problem does not cite that part. The following page lists match
the native course records and the reviewed source map.

| Problem ID | Part 1 pages | Part 2 pages | Part 3 pages |
| --- | --- | --- | --- |
| `2025-uas-q1` | 2, 3, 7, 8 | - | 1, 2, 3, 6, 14, 15, 16, 17 |
| `2024-uts1-q3` | 13 | 4, 5 | - |
| `2024-uts2-q2` | 2, 3 | - | 1, 2, 9, 10, 16 |
| `2024-uas-q5` | 15, 17 | 1, 2, 3 | - |
| `2023-uts1-q1` | 2, 3, 7, 8, 16 | - | 6, 17 |
| `2025-uts1-q1` | 11, 12, 13, 14 | - | - |
| `2025-uts1-q4` | 11, 14 | - | - |
| `2025-uts2-q6` | 11, 12, 13, 14, 15 | 6, 7, 8 | 19 |
| `2025-uas-q2` | 11, 12, 13, 14 | - | - |
| `2024-uts1-q2` | 11, 12, 13 | - | - |
| `2024-uts1-q5` | 12, 13, 14, 15 | 4, 5 | - |
| `2024-uts2-q4` | 11, 12, 13 | - | 4, 5, 6 |
| `2024-uas-q1` | 11, 12, 13 | - | - |
| `2023-uts1-q2` | 12, 13, 14, 15 | - | - |
| `2023-uas-q5` | 11, 12, 13, 14 | - | - |
| `2025-uts1-q2` | - | 1, 2, 3 | - |
| `2024-uts1-q6` | 17 | 2, 3 | - |
| `2023-uts1-q3` | 17 | 2 | - |
| `2023-uas-q2` | 16, 17 | - | - |
| `2025-uts1-q3` | - | 7, 8, 10 | - |
| `2025-uas-q6` | - | 8, 10 | 18, 19 |
| `2024-uts1-q4` | - | 6, 7 | - |
| `2024-uas-q3` | - | 7, 8, 10 | - |
| `2023-uts1-q4` | - | 6, 7, 10 | - |
| `2023-uts2-q4` | - | 8, 10 | 17, 18, 19 |
| `2023-uas-q3` | - | 6, 7 | 2, 3 |
| `2025-uts1-q5` | 3, 8 | 6, 7 | - |
| `2023-uts1-q5` | 3, 7 | - | - |
| `2025-uts2-q1` | - | - | 7, 9, 10 |
| `2025-uas-q5` | - | - | 7, 9, 10 |
| `2024-uts2-q3` | - | - | 11 |
| `2024-uas-q4` | - | - | 9, 10 |
| `2023-uts2-q1` | - | - | 7, 9, 10, 12 |
| `2023-uas-q1` | - | - | 8, 9, 10 |
| `2025-uts2-q2` | 12, 13, 14, 16 | - | 4, 5, 24, 25, 26 |
| `2025-uts2-q5` | 2, 3, 12 | - | 2, 3, 5, 19 |
| `2025-uas-q4` | 12, 13, 14, 16 | - | 4, 24, 25, 26 |
| `2024-uts1-q1` | 12, 13 | - | 2, 4, 19, 20 |
| `2024-uts2-q1` | 11, 14 | - | 2, 3, 4, 5, 6, 25, 26 |
| `2024-uas-q2` | 2, 3, 12 | - | 2, 3, 19 |
| `2023-uts2-q2` | - | 6, 7 | 2, 3, 4, 24, 25 |
| `2025-uts2-q3` | 2, 3 | - | 16 |
| `2025-uts2-q4` | 3, 8 | 4 | 15, 16, 17, 20, 21, 23 |
| `2025-uas-q3` | 14 | - | 14, 15, 16, 17 |
| `2024-uas-q6` | 2, 3, 14 | - | 15, 16, 17 |
| `2023-uts2-q3` | 3, 12, 13 | - | 14, 15, 16, 17, 21, 22, 23 |
| `2023-uas-q4` | - | 7, 8, 10 | 15, 16, 18, 19, 23 |

# Tutor interaction and teaching evaluation

Date: 28 November 2026. Branch: `fix/tutor-interactions-and-reading`.

This evaluation covers the IPE reading UI, generated teaching visuals, and changes to those visuals in a later message. It combines an independent Tutor role trial, actual application components, and a separate test through the public PR preview. It is a small regression sample, not a model benchmark or a claim that every possible request succeeds.

## Method

The independent Tutor agent received the exact `buildTutorSystemPrompt` output, public IPE lesson context, and all 13 provider-facing tool schemas captured from the real Worker. It could not inspect application source, validators, expected answers, or evaluator notes. A local driver mounted the real `ProblemView`, `StepDisclosure`, course simulations, generated output components, store, validator, and scoped UI SDK runtime. Tool calls changed those components and returned their actual results. The driver did not supply answers or call an outside model service.

Each user turn allowed four tool rounds followed by a final answer, matching the application's five-step limit. The driver recorded the exact user messages, tool arguments, results, final answers, and rendered output. A separate evaluator checked those records against the source and equations. The independent agent completed five user turns and 15 successful tool calls in baseline cases A–D.

The suggested GPT-5.4 model was not available in this session. An attempted GPT-5.5 override was also unsupported. The role trial used the available independent session model; it must not be reported as a GPT-5.4 or GPT-5.5 test. A role trial with a supplied prompt also differs from running that prompt at the production provider's system-message level. The separate browser test exercises the application's actual configured provider.

The local driver used jsdom with fixed layout dimensions and a native Canvas backend. This verifies validation, tool choices, state, equations, and drawing code, but cannot prove browser layout. The original generated specifications were therefore replayed through the actual React components and IPE styles in a browser, including a 375 px iframe.

## Baseline cases

### A: generate an animation, then change it

Item: `2023-uas-q3`, response of a first-order temperature sensor.

First user message:

> Buat satu animasi baru di jawaban Anda untuk respons tahanan sensor pada soal ini. Saya ingin bisa mengubah konstanta waktu, memutar, dan menjeda animasinya. Tunjukkan juga keadaan sebelum suhu naik.

Follow-up in the same thread:

> Pada simulasi yang barusan dibuat, ubah konstanta waktu menjadi 2 detik dan jeda pada t = 3 detik. Jelaskan singkat apa yang berubah.

The Tutor called `renderInteractiveSimulation` with a new time-dependent resistance visual, a time-constant slider, and these expressions:

```text
x = t
R = 200 + 5.84 * (1 - exp(-max(0, t - 1) / tau))
final resistance = 205.84
```

This preserves the initial 200 Ω state before the temperature step at absolute time 1 s. The follow-up used `snapshot`, `act`, and a further `snapshot` to change the generated visual's own controls. The accepted values were τ = 2 s and t = 3 s; the available Play button confirmed that it remained paused. The resulting resistance is 203.691584 Ω, compared with 205.049642 Ω for τ = 1 s at the same absolute time. Initial and final resistance remain unchanged.

The browser replay confirmed time 3 s, time constant 2 s, and the displayed rounded value 203.7 Ω on desktop and at 375 px. The plot samples the current formula, including after a parameter change; it does not join points computed under old parameters.

### B: explain frequency limits without inventing a calibration curve

Item: `2025-uas-q6`, accelerometer bandwidth and cross-axis sensitivity.

> Buat visualisasi supaya saya paham perbedaan kejadian pada 0,5 Hz, rentang kerja sensor, dan 25.000 Hz. Saya juga masih bingung arti sensitivitas silang.

The Tutor created a comparison table for 0.5 Hz, the 1–10,000 Hz operating band, and 25,000 Hz. It stated that the source does not specify an exact out-of-band sensitivity or resonance frequency. It also created an interactive linear illustration of cross-axis response:

```text
total output, mV = 100 * main_axis_acceleration + 5 * cross_axis_acceleration
```

The Tutor labelled this as an illustrative nominal model, not a frequency calibration. It moved the plot probe to 1 g while the main-axis slider remained at 1 g. Actual readouts showed 105 mV total and 100 mV from the main axis. Its explanation distinguished the 5% sensitivity ratio from a universal 5% measurement error.

The 375 px browser replay confirmed readable plot labels, probe, slider, and readouts. It also exposed a table layout problem: horizontal scrolling hid the explanatory third column. The updated renderer stacks each row into a heading and labelled values on small screens; wider screens retain the comparison table.

The browser recheck confirmed that every comparison value is readable at 375 px without horizontal scrolling. The inner document's measured width and scroll width were both 367 px, after its scrollbar.

### C: change one course parameter and preserve another

Item: `2025-uts1-q3`, second-order sensor frequency response.

> Ubah frekuensi masukan pada simulasi ini menjadi 1.500 Hz. Jangan ubah rasio redamannya. Setelah itu, jelaskan perubahan amplitudo dan fasenya dari keadaan semula.

The Tutor read the controls, sent only `frequency: 1500` to the authored course simulation, and read the UI again. Frequency changed from 600 to 1,500 Hz; damping remained 0.7. Its comparison used the correct second-order model and phase quadrant:

| Quantity | 600 Hz | 1,500 Hz |
| --- | ---: | ---: |
| Damping ratio | 0.7 | 0.7 |
| Amplitude ratio | 0.946943 | 0.409187 |
| Phase | −52.69605° | −120.76272° |

### D: explain a selected passage and the limit of the evidence

Item: `2025-uas-q6`, full selected text of solution step 5.

> Jelaskan bagian yang saya blok dengan lebih pelan. Mengapa 25.000 Hz tidak bisa langsung dibaca pada sumbu ω, dan mengapa kita tetap belum bisa menghitung sensitivitas tepatnya? Beri satu contoh pendek.

The Tutor used the actual selected step and a formula breakdown. It explained that ω = 2πf, so 25,000 Hz corresponds to about 157,080 rad/s. It also explained that converting the horizontal-axis unit does not supply the missing vertical-axis calibration. Its 80 mV/g measurement example was clearly labelled hypothetical, not presented as a value from the source.

## Independent assessment

The evaluator assigned 0, 1, or 2 points for completion, source/model fidelity, treatment of limits, real UI action and readback, numerical correctness, and clarity. It excluded layout and native mobile behavior from this score. The cases received 44/46 points; this is a manual rubric score for this sample, not a percentage accuracy for the model.

| Case | Score | Remaining issue in the baseline |
| --- | ---: | --- |
| A | 12/12 | Initial visual description repeats some of the final explanation. |
| B | 11/12 | The final answer repeats much of the comparison table. |
| C | 11/12 | The final observation instruction mentions waveform peaks although the real UI shows frequency response and gain/phase readouts. |
| D | 10/10 | Formula-card thousands grouping is ambiguous; a snapshot adds no useful evidence to this explanation-only turn. |

The revised prompt addresses repeated explanations, names only elements present in the actual interface when giving an observation task, and uses thin-space thousands grouping inside equations.

## Failure found through the actual application

On the public PR preview, selecting the cross-axis-sensitivity paragraph and choosing **Buat visualisasi** produced a working sinusoidal simulation. Its controls included main-axis amplitude, cross-axis amplitude, example frequency, phase difference, and time. Initial amplitudes were 1 g, frequency 1 Hz, phase zero, and time zero.

The next user request was:

> Pada simulasi yang baru Anda buat, atur amplitudo percepatan sumbu silang menjadi 2 g dan jeda pada t = 0,25 detik. Pertahankan parameter lain. Jelaskan tegangan dari tiap sumbu dan tegangan total pada saat itu.

The actual provider chose `updateSimulationParams`, which only addressed the attached course simulation. That course simulation exposed `frequency`, so the invalid update failed. The Tutor then incorrectly concluded that the requested controls were unavailable. Browser inspection showed that the generated controls still existed and remained at cross-axis amplitude 1 g and time zero. The numerical explanation alone did not satisfy the requested action.

The original prompt contributed to this failure: its final instruction broadly told the Tutor to use `updateSimulationParams` for parameter changes, while the attached parameter list described only the authored course simulation. This conflicted with the instructions for generated UI controls.

## Follow-up trial E: correct routing exposed a time-control bug

After the routing and prompt fixes, the independent Tutor received a fresh request for an accelerometer simulation with sinusoidal motion on both axes, 1 g initial amplitudes, 1 Hz example frequency, and zero initial phase difference. It created a two-second simulation and then received the same follow-up asking for cross-axis amplitude 2 g and time 0.25 s.

This time it chose `snapshot`, `act`, and `snapshot` for the generated visual. The cross-axis amplitude became 2 g, while main-axis amplitude, frequency, and phase remained unchanged. However, the generated time slider used a duration-dependent step of 0.02 s. It rounded the requested 0.25 s to 0.26 s. The action result reported this difference and returned `ok: false`; the Tutor's final answer accurately distinguished the requested model time from the actual displayed time.

The time slider now uses a fixed 0.01 s step, matching its displayed precision. The regression uses a two-second simulation and requires an accepted value of exactly 0.25 s. The expected illustrative voltage contributions at that time are 100 mV from the main axis and 10 mV from the cross axis, for 110 mV total. These are values of the declared nominal example, not an out-of-band calibration of the physical sensor.

## Changes prompted by the trials

- The prompt and tool descriptions now distinguish the attached course simulation from visuals created in the conversation. Generated visual changes use `snapshot`, `query`, and `act`, matched by the visual's title and actual component references.
- Rejected course-simulation updates now return a bounded list of real, scoped controls and recovery guidance. Sliders are queried first, so generated controls can still be found on a long page with more than 100 registered controls. Rejection does not partially change course parameters.
- A regression mounts the real generated simulation, deliberately calls the wrong tool with an invalid ID, key, and value, verifies unchanged course state, then uses the returned references to set amplitude 2 and time 0.25 through `act`.
- The prompt asks for precise readout names, distinguishing instantaneous values, amplitudes, and parameters. It also keeps visual descriptions and follow-up explanations short, avoiding repeated descriptions and unsolicited offers.
- Observation instructions must name an actual visible plot, point, value, or control. Mathematical thousands grouping uses a thin space to avoid decimal ambiguity.
- Moving-point and vector names now use a wrapping legend. They no longer collide when all signals start at the origin.
- `MathMarkdown` now accepts paired TeX `\(...\)` and `\[...\]` delimiters through a Markdown syntax extension. Code, URLs, escaped literals, existing dollar math, and nested lists/quotes retain their meaning.
- Selected complete formulas now copy once from their existing TeX annotation. Paragraph breaks and code are preserved; a partial formula selection does not acquire unselected terms. A real DOM-range regression checks the cross-paragraph case and prevents an equals sign from becoming a Markdown heading.
- Generated simulation time controls use 0.01 s increments, so quarter-second requests work even for short animations.

## Limits and follow-up checks

This is a focused sample of tool use and teaching quality. It does not establish a success rate across models, languages, subjects, or repeated stochastic runs. Native iOS/Android text-selection menus require device testing; a narrow browser iframe verifies layout but does not reproduce those OS menus. Generated simulations use the application's bounded mathematical expression format and supported renderers; this work does not execute arbitrary generated JavaScript.

The role driver bypasses `useChat` streaming, continuation timing, abort/retry, persisted chat replay, and real text selection. Case A checks time seeking and the resulting paused state; it does not alone verify clock progression, pausing during playback, or resetting. Those require the application's browser tests and separate runtime regressions. Saved driver HTML is an inspection aid, not proof of final chat layout.

Selection, lifecycle, and interaction regressions belong to the normal `pnpm test` suite. Course validation, all app typechecks, all builds, and PR preview checks are required before merging. The draft PR preserves the existing IPE question and solution content.

## Repository checks

- `pnpm validate`: 12 course content files, zero errors and warnings.
- `pnpm typecheck`: passed across the workspace.
- `pnpm test`: 132 passed, zero failed or skipped.
- `pnpm build`: all applications passed. Vite still reports large bundle chunks.
- `git diff --check`: passed.

The PR description records deployment checks and the final browser retest of the configured provider. The PR remains a draft; this evaluation does not merge or release it to production.

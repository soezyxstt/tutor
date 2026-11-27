import katex from "katex";
import {
  archiveUrl,
  practice,
  questions,
  reference,
} from "../src/content/index";
import type { ContentTable, Localized, VisualSpec } from "../src/content/types";
import {
  bridgeVoltage,
  capacitanceCoax,
  endpointFit,
  firstOrder,
  flowModel,
  magnitude,
  stats,
  thermocoupleEMF,
} from "../src/lib/models";
import { seismicState } from "../src/components/visuals/dynamics";

// Page counts and question totals were checked against the six original scans.
const sources = {
  "2023-uts2": {
    drive: "1W1pKt1ZgIU5T5oLpV7nOYfv4ofcNyMe7",
    pages: 4,
    questions: 4,
  },
  "2023-uas": {
    drive: "1UbBcAh4T1v4DDmAMg4kIQAG0qp22bAQI",
    pages: 3,
    questions: 5,
  },
  "2024-uts2": {
    drive: "1sB0GcdD36cf5MQ-G5BtzZUJSWgA4Zsv3",
    pages: 4,
    questions: 4,
  },
  "2024-uas": {
    drive: "1Je4tNBBjAyJ5AefzK95kFZW5Bb0wweCX",
    pages: 3,
    questions: 6,
  },
  "2025-uts2": {
    drive: "1tRISSpQUyRHUlKDTYSP6EtmURv4h8GT0",
    pages: 4,
    questions: 6,
  },
  "2025-uas": {
    drive: "1B_rfO3mnIdOr2a_DUd_M8AkJnBR0nCk5",
    pages: 4,
    questions: 6,
  },
} as const;
const topics = new Set([
  "flow",
  "temperature",
  "strain",
  "position",
  "signal",
  "calibration",
  "systems",
  "dynamics",
  "statistics",
]);
const visualKinds = new Set([
  "orifice",
  "venturi",
  "pitot",
  "ultrasonic",
  "thermocouple",
  "strain",
  "bridge",
  "encoder",
  "resolver",
  "lvdt",
  "capacitive",
  "doppler",
  "vibrometer",
  "accelerometer",
  "statistics",
  "calibration",
  "signal",
  "system",
  "dynamics",
  "potentiometer",
  "rtd",
  "none",
]);
const errors: string[] = [];
let assertions = 0;
let mathExpressions = 0;
let localizedFields = 0;
let visualCount = 0;
let oracleCases = 0;

function check(condition: unknown, message: string): asserts condition {
  assertions++;
  if (!condition) errors.push(message);
}
function nonempty(value: unknown, path: string) {
  check(
    typeof value === "string" && value.trim().length > 0,
    `${path}: expected nonempty text`,
  );
}
function localized(value: Localized, path: string) {
  localizedFields++;
  check(
    value != null && typeof value === "object",
    `${path}: expected Indonesian and English text`,
  );
  for (const locale of ["id", "en"] as const)
    nonempty(value?.[locale], `${path}.${locale}`);
}
function table(value: ContentTable, path: string) {
  check(value.headers.length > 0, `${path}: no columns`);
  check(value.rows.length > 0, `${path}: no data rows`);
  value.headers.forEach((h, i) => localized(h, `${path}.headers[${i}]`));
  value.rows.forEach((row, i) => {
    check(
      row.length === value.headers.length,
      `${path}.rows[${i}]: column count differs from header`,
    );
    row.forEach((cell, j) => nonempty(cell, `${path}.rows[${i}][${j}]`));
  });
}
function visual(value: VisualSpec, path: string) {
  visualCount++;
  check(
    visualKinds.has(value.kind),
    `${path}: unsupported visual kind ${value.kind}`,
  );
  localized(value.caption, `${path}.caption`);
  for (const [key, val] of Object.entries(value.params ?? {})) {
    const paramPath = `${path}.params.${key}`;
    if (typeof val === "number")
      check(Number.isFinite(val), `${paramPath}: number is not finite`);
    else if (typeof val === "string") nonempty(val, paramPath);
    else if (Array.isArray(val)) {
      check(val.length > 0, `${paramPath}: empty numeric array`);
      val.forEach((n, i) =>
        check(
          typeof n === "number" && Number.isFinite(n),
          `${paramPath}[${i}]: expected finite number`,
        ),
      );
    } else check(false, `${paramPath}: unsupported parameter type`);
  }
  const p = value.params;
  if (Array.isArray(p?.xs) || Array.isArray(p?.ys)) {
    check(
      Array.isArray(p?.xs) && Array.isArray(p?.ys),
      `${path}: calibration needs both xs and ys`,
    );
    if (Array.isArray(p?.xs) && Array.isArray(p?.ys)) {
      check(
        p.xs.length >= 2 && p.xs.length === p.ys.length,
        `${path}: calibration input/output lengths differ`,
      );
      check(
        p.xs.every((x, i, a) => i === 0 || x > a[i - 1]),
        `${path}: calibration inputs must increase strictly`,
      );
      for (const extra of ["ys2", "ySupply", "yAmbient"]) {
        const ys = p[extra];
        if (Array.isArray(ys))
          check(
            ys.length === p.xs.length,
            `${path}.${extra}: comparison curve has wrong length`,
          );
      }
    }
  }
}
function math(expression: string, path: string, displayMode: boolean) {
  mathExpressions++;
  nonempty(expression, path);
  try {
    katex.renderToString(expression, {
      throwOnError: true,
      strict: "ignore",
      displayMode,
      trust: false,
    });
  } catch (error) {
    check(
      false,
      `${path}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
// Validate exactly the inline/display delimiters used by the application's renderer.
// Raw math/answerMath fields are parsed separately; prose is never passed as math.
function inspectTextAndMath(value: unknown, path: string, key = "") {
  if (typeof value === "string") {
    check(
      !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u.test(value),
      `${path}: unexpected control character (possibly an unescaped LaTeX command)`,
    );
    if (key === "math" || key === "answerMath") {
      math(value, path, true);
    } else {
      const remainder = value.replace(
        /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g,
        (_whole, inline: string | undefined, display: string | undefined) => {
          math(inline ?? display ?? "", path, display !== undefined);
          return "";
        },
      );
      check(!/\\[()[\]]/.test(remainder), `${path}: unmatched math delimiter`);
    }
  } else if (typeof value === "number") {
    check(Number.isFinite(value), `${path}: number is not finite`);
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => inspectTextAndMath(item, `${path}[${i}]`, key));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([k, item]) =>
      inspectTextAndMath(item, `${path}.${k}`, k),
    );
  }
}

check(
  questions.length === 31,
  `Expected 31 exam questions; found ${questions.length}`,
);
check(
  practice.length === 30,
  `Expected 30 practice questions; found ${practice.length}`,
);
const allIds = [...questions, ...practice].map((q) => q.id);
check(
  new Set(allIds).size === allIds.length,
  "Exam/practice question IDs are not globally unique",
);
const questionIds = new Set(questions.map((q) => q.id));
for (const [group, source] of Object.entries(sources)) {
  const members = questions.filter((q) => `${q.year}-${q.exam}` === group);
  check(
    members.length === source.questions,
    `${group}: expected ${source.questions} questions; found ${members.length}`,
  );
  for (let n = 1; n <= source.questions; n++) {
    check(questionIds.has(`${group}-q${n}`), `${group}: missing question ${n}`);
  }
}
check(
  reference.url ===
    "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
  "Reference source URL changed",
);
nonempty(reference.name, "reference.name");
check(
  archiveUrl ===
    "https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END",
  "Archive source URL changed",
);

for (const q of questions) {
  const path = q.id;
  const group = `${q.year}-${q.exam}` as keyof typeof sources;
  const source = sources[group];
  check(Boolean(source), `${path}: unknown year/exam group`);
  check(
    q.id === `${group}-q${q.number}`,
    `${path}: ID does not match year, exam, and question number`,
  );
  check(
    Number.isInteger(q.number) && q.number > 0,
    `${path}: invalid question number`,
  );
  check(topics.has(q.topic), `${path}: invalid topic`);
  localized(q.title, `${path}.title`);
  localized(q.prompt, `${path}.prompt`);
  localized(q.answer, `${path}.answer`);
  nonempty(q.original, `${path}.original`);
  check(
    q.originalLanguage === "id" || q.originalLanguage === "en",
    `${path}: missing original language`,
  );
  check(
    q.source.file === `${group}.pdf`,
    `${path}: original source filename does not match exam`,
  );
  if (source) {
    check(
      q.source.url === `https://drive.google.com/file/d/${source.drive}/view`,
      `${path}: source URL does not match the original exam`,
    );
    check(q.source.pages.length > 0, `${path}: missing source page references`);
    q.source.pages.forEach((p) =>
      check(
        Number.isInteger(p) && p >= 1 && p <= source.pages,
        `${path}: source page ${p} is out of bounds`,
      ),
    );
    check(
      new Set(q.source.pages).size === q.source.pages.length,
      `${path}: duplicate source page references`,
    );
  }
  q.referencePages?.forEach((p) =>
    check(
      Number.isInteger(p) && p >= 1 && p <= 26,
      `${path}: reference page ${p} is out of bounds`,
    ),
  );
  q.givens?.forEach((given, i) => {
    localized(given.label, `${path}.givens[${i}].label`);
    nonempty(given.value, `${path}.givens[${i}].value`);
  });
  check(q.steps.length > 0, `${path}: no worked solution`);
  q.steps.forEach((step, i) => {
    const stepPath = `${path}.steps[${i}]`;
    localized(step.title, `${stepPath}.title`);
    check(step.body.length > 0, `${stepPath}: no explanation`);
    step.body.forEach((paragraph, j) =>
      localized(paragraph, `${stepPath}.body[${j}]`),
    );
    if (step.note) localized(step.note, `${stepPath}.note`);
    if (step.table) table(step.table, `${stepPath}.table`);
    if (step.visual) visual(step.visual, `${stepPath}.visual`);
  });
  q.assumptions?.forEach((a, i) => localized(a, `${path}.assumptions[${i}]`));
  visual(q.visual, `${path}.visual`);
  q.visuals?.forEach((v, i) => visual(v, `${path}.visuals[${i}]`));
  inspectTextAndMath(q, path);
}
for (const q of practice) {
  const path = q.id;
  nonempty(q.id, `${path}.id`);
  check(topics.has(q.topic), `${path}: invalid topic`);
  check(
    ["foundation", "applied", "reasoning"].includes(q.difficulty),
    `${path}: invalid difficulty`,
  );
  localized(q.prompt, `${path}.prompt`);
  localized(q.explanation, `${path}.explanation`);
  check(q.options.length === 4, `${path}: expected exactly four options`);
  q.options.forEach((option, i) => localized(option, `${path}.options[${i}]`));
  for (const locale of ["id", "en"] as const) {
    check(
      new Set(q.options.map((o) => o[locale].trim().replace(/\s+/g, " ")))
        .size === q.options.length,
      `${path}: duplicate ${locale} options`,
    );
  }
  check(
    Number.isInteger(q.correctIndex) &&
      q.correctIndex >= 0 &&
      q.correctIndex < q.options.length,
    `${path}: correctIndex is out of bounds`,
  );
  check(
    typeof q.sourceQuestionId === "string" &&
      questionIds.has(q.sourceQuestionId),
    `${path}: related exam question does not exist`,
  );
  inspectTextAndMath(q, path);
}

// Independent numeric checks: hand/decimal calculations, printed tables, known
// physical limits, and conservation identities. These do not snapshot the model.
function near(
  actual: number,
  expected: number,
  label: string,
  absTolerance = 1e-10,
  relativeTolerance = 1e-9,
) {
  check(
    Number.isFinite(actual) &&
      Math.abs(actual - expected) <=
        absTolerance + relativeTolerance * Math.abs(expected),
    `${label}: expected ${expected}, got ${actual}`,
  );
}
function oracle(name: string, fn: () => void) {
  oracleCases++;
  try {
    fn();
  } catch (error) {
    check(
      false,
      `${name}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
function mustThrow(fn: () => unknown, label: string) {
  let threw = false;
  try {
    fn();
  } catch {
    threw = true;
  }
  check(threw, `${label}: expected invalid input to be rejected`);
}
oracle("Flow: exam values and coefficient conventions", () => {
  const venturi = flowModel(0.08, 0.02, 950, 6204.825, 0.97);
  near(venturi.Q, 0.0011035435156024232, "2023 UAS1 volumetric flow");
  near(venturi.v2, 3.512688108502675, "2023 UAS1 throat speed");
  near(venturi.mass, 1.048366339822302, "2023 UAS1 mass flow");
  const vena = flowModel(0.09, 0.03, 1000, 30000, 0.65, 0.67, true);
  const hole = flowModel(0.09, 0.03, 1000, 30000, 0.65, 0.67, false);
  near(
    vena.ideal,
    0.0036786594947926547,
    "2024 UAS4 vena-referenced ideal flow",
  );
  near(vena.mass, 2.3911286716152254, "2024 UAS4 vena-referenced mass flow");
  near(hole.mass, 3.581120119759934, "2024 UAS4 hole-referenced mass flow");
  for (const model of [venturi, vena, hole]) {
    near(model.A1 * model.v1, model.Q, "Upstream volume conservation");
    near(model.A2 * model.v2, model.Q, "Downstream volume conservation");
  }
});
oracle("Flow: pressure scaling and invalid geometry", () => {
  const initial = flowModel(0.1, 0.03, 1000, 2000, 0.62);
  near(
    flowModel(0.1, 0.03, 1000, 8000, 0.62).Q,
    2 * initial.Q,
    "Fourfold pressure gives twice the flow",
  );
  near(
    flowModel(0.1, 0.03, 1000, 0, 0.62).Q,
    0,
    "Zero pressure gives zero flow",
  );
  mustThrow(
    () => flowModel(0.1, 0.1, 1000, 2000, 0.62),
    "Restriction must be narrower than pipe",
  );
  mustThrow(
    () => flowModel(0.1, 0.03, 0, 2000, 0.62),
    "Density must be positive",
  );
  mustThrow(
    () => flowModel(0.1, 0.03, 1000, -1, 0.62),
    "Pressure difference must not be negative",
  );
});
oracle("First-order response: elapsed time and initial/final limits", () => {
  near(firstOrder(0, 0.5, 100, 100.32), 100, "Initial value");
  near(
    firstOrder(1, 0.5, 100, 100.32),
    100.27669270936428,
    "2023 UTS2: one second after the step",
  );
  near(
    firstOrder(2, 1, 200, 205.84),
    205.04964194589817,
    "2023 UAS3: two seconds after the step",
  );
  near(firstOrder(30, 1, 200, 205.84), 205.84, "Long-time equilibrium");
  near(
    firstOrder(1, 1, 1, 0),
    0.36787944117144233,
    "Cooling at one time constant",
  );
});
oracle("Second-order gain: limiting values and 5% boundary", () => {
  near(magnitude(0, 0.65), 1, "DC gain");
  near(
    magnitude(0.5, 1 / Math.SQRT2),
    0.9701425001453319,
    "Practice half-natural-frequency gain",
  );
  near(
    magnitude(0.7199987397121151, 0.65),
    0.95,
    "2024 UAS3 exact 5% boundary",
  );
  check(
    magnitude(0.7, 0.65) > 0.95 && magnitude(0.74, 0.65) < 0.95,
    "Amplitude boundary must separate allowed and disallowed frequencies",
  );
  check(
    magnitude(1, 0) === Infinity,
    "Undamped resonance must remain a mathematical singularity",
  );
});
oracle("Bridge: exact divider, zero balance, and reversed polarity", () => {
  near(bridgeVoltage(5, 100, 100, 25, 25), 0, "Balanced bridge");
  near(
    bridgeVoltage(5, 25, 34.8125, 100, 100),
    0.410135841170324,
    "2024 UAS2 source bridge orientation",
  );
  near(
    bridgeVoltage(5, 100, 100, 25, 34.8125),
    -0.410135841170324,
    "Reversing output nodes reverses sign",
  );
  near(
    bridgeVoltage(4, 100, 110, 100, 100),
    0.0952380952380953,
    "Practice exact bridge voltage",
  );
});
oracle("Endpoint calibration: retain offset and use output span", () => {
  const fitted = endpointFit(
    [0, 0.5, 1, 1.5, 2, 2.5, 3],
    [0, 16.5, 32, 44, 51.5, 55.5, 58.5],
  );
  near(fitted.K, 19.5, "2023 UAS5 endpoint sensitivity");
  near(fitted.max, 14.75, "2023 UAS5 maximum residual");
  near(
    (fitted.max / fitted.fs) * 100,
    25.213675213675213,
    "2023 UAS5 percent of span",
  );
  const xs = [0, 4, 8, 12, 16];
  const standard = endpointFit(xs, [4, 11, 16, 22.8, 29.6]);
  const supply = endpointFit(xs, [4, 13.2, 21.3, 31.1, 39.2]);
  const ambient = endpointFit(xs, [6, 12.5, 18.1, 25.5, 31.6]);
  near(standard.K, 1.6, "2024 UAS1 standard sensitivity");
  near(standard.a, 4, "2024 UAS1 offset");
  near(
    (standard.max / standard.fs) * 100,
    3.125,
    "2024 UAS1 standard nonlinearity",
  );
  near(
    (supply.max / supply.fs) * 100,
    1.9886363636363635,
    "2024 UAS1 changed-supply nonlinearity",
  );
  near(
    (ambient.max / ambient.fs) * 100,
    2.734375,
    "2024 UAS1 changed-temperature nonlinearity",
  );
});
oracle("Sample statistics: Bessel correction and standard error", () => {
  const simple = stats([9, 10, 11]);
  near(simple.mean, 10, "Symmetric sample mean");
  near(simple.sd, 1, "Sample standard deviation uses n−1");
  near(
    simple.se,
    0.5773502691896258,
    "Standard error divides by square root of n",
  );
  const exam = stats([
    120.1, 120, 120.2, 120, 119.8, 120.3, 120, 119.6, 120, 119.9,
  ]);
  near(exam.mean, 119.99, "2023 UAS2 mean");
  near(exam.sd, 0.1969207398365598, "2023 UAS2 sample standard deviation");
});
oracle("Thermocouples: independent printed tables and supported ranges", () => {
  // NIST ITS-90 table entries in mV, rounded to 0.001 mV in the supplied scans.
  const tableValues: [string, number, number][] = [
    ["K", 100, 4.096],
    ["K", 340, 13.874],
    ["J", 178, 9.559],
    ["J", 179, 9.614],
    ["J", 450, 24.61],
    ["T", 25, 0.992],
    ["T", 200, 9.288],
    ["T", 258, 12.461],
    ["T", 259, 12.518],
  ];
  tableValues.forEach(([type, T, emf]) =>
    near(thermocoupleEMF(T, type), emf, `Type ${type} at ${T}°C`, 0.00051, 0),
  );
  near(
    thermocoupleEMF(340, "K") - thermocoupleEMF(100, "K"),
    9.778,
    "2023 UTS2 differential thermocouple reading",
    0.001,
    0,
  );
  near(thermocoupleEMF(0, "J"), 0, "Type J reference at zero");
  mustThrow(() => thermocoupleEMF(-1, "J"), "Negative-temperature range guard");
  mustThrow(() => thermocoupleEMF(501, "K"), "Type K upper range guard");
  mustThrow(() => thermocoupleEMF(401, "T"), "Type T upper range guard");
});
oracle("Coaxial capacitance: dielectric and partial-fill limits", () => {
  const empty = capacitanceCoax(1, 0, 0.01, 0.02, 4);
  const full = capacitanceCoax(1, 1, 0.01, 0.02, 4);
  near(
    empty,
    8.026073588823923e-11,
    "One-metre air-filled coaxial capacitor",
    1e-15,
    1e-6,
  );
  near(full / empty, 4, "Full dielectric scales by relative permittivity");
  near(
    capacitanceCoax(1, 0.5, 0.01, 0.02, 4) / empty,
    2.5,
    "Half-fill combines axial capacitances in parallel",
  );
  near(
    capacitanceCoax(1, 0.5, 0.02, 0.04, 4),
    capacitanceCoax(1, 0.5, 0.01, 0.02, 4),
    "Fixed radius ratio preserves capacitance",
    1e-15,
  );
});
oracle("Seismic accelerometer: physical force balance and DC response", () => {
  // Source UAS 2023 q4: total moving mass m1+m2 = 0.05 kg.
  const m = 0.05,
    k = 240,
    c = 3.46;
  const dc = seismicState(m, k, c, 9.81, 0, 0);
  near(
    dc.z,
    -0.00204375,
    "Static relative displacement under 9.81 m/s² acceleration",
  );
  const rest = seismicState(m, k, c, 0, 2, 0.4);
  near(rest.z, 0, "No excitation gives no relative displacement");
  near(rest.dz, 0, "No excitation gives no relative velocity");
  for (const acceleration of [9.81, 48]) {
    for (const frequency of [0.1, 2, Math.sqrt(k / m) / (2 * Math.PI), 19.85]) {
      for (const time of [0, 0.073, 0.3]) {
        const state = seismicState(m, k, c, acceleration, frequency, time);
        // Spring and damper oppose relative motion; inertia uses absolute acceleration.
        near(
          -k * state.z - c * state.dz - m * state.absoluteAcceleration,
          0,
          `D’Alembert balance at A=${acceleration}, f=${frequency}, t=${time}`,
          1e-11,
          0,
        );
      }
    }
  }
});

if (errors.length > 0) {
  console.error(
    `Content validation failed (${errors.length} issue${errors.length === 1 ? "" : "s"}):`,
  );
  errors.forEach((error) => console.error(`  • ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Content valid: ${questions.length} exam questions, ${practice.length} practice questions, ${questions.reduce((sum, q) => sum + q.steps.length, 0)} solution steps.`,
  );
  console.log(
    `Checked ${localizedFields} bilingual fields, ${visualCount} visual specifications, ${mathExpressions} KaTeX expressions, all source/related-question references, and ${oracleCases} numeric oracle groups (${assertions} assertions).`,
  );
}

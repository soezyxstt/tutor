import test from 'node:test';
import assert from 'node:assert/strict';
import {
  bridgeVoltage, capacitanceCoax, endpointFit, firstOrder, flowModel,
  magnitude, stats, thermocoupleEMF,
} from '../src/lib/models';
import {
  coefficientUncertainty, frequencyResponse, halfPowerFrequency,
  negativeFeedback, thermalCycle, thermistorModel, uncertaintyChain,
} from '../src/lib/measurement';
import { seismicState } from '../src/lib/seismic';

// Retained from staging 802aead: independent exam/table values and physical
// identities, not snapshots of the implementation under test.
const check: (condition: unknown, message: string) => asserts condition =
  (condition, message) => assert.ok(condition, message);
const mustThrow = (fn: () => unknown, label: string) => assert.throws(fn, undefined, label);
function near(
  actual: number,
  expected: number,
  label: string,
  absTolerance = 1e-10,
  relativeTolerance = 1e-9,
) {
  assert.ok(
    Number.isFinite(actual) &&
      Math.abs(actual - expected) <= absTolerance + relativeTolerance * Math.abs(expected),
    `${label}: expected ${expected}, got ${actual}`,
  );
}

test("Flow: exam values and coefficient conventions", () => {
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
test("Flow: pressure scaling and invalid geometry", () => {
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
test("First-order response: elapsed time and initial/final limits", () => {
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
test("Second-order gain: limiting values and 5% boundary", () => {
  near(magnitude(0, 0.65), 1, "DC gain");
  near(
    magnitude(0.5, 1 / Math.SQRT2),
    0.9701425001453319,
    "Half-natural-frequency normalized gain",
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
test("Bridge: exact divider, zero balance, and reversed polarity", () => {
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
    "Exact unbalanced bridge voltage",
  );
});
test("Endpoint calibration: retain offset and use output span", () => {
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
test("Sample statistics: Bessel correction and standard error", () => {
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
test("Thermocouples: independent printed tables and supported ranges", () => {
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
test("Coaxial capacitance: dielectric and partial-fill limits", () => {
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
test("Seismic accelerometer: physical force balance and DC response", () => {
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

test(
  "UTS1: frequency limits, thermal continuity, and uncertainty sources",
  () => {
    const force = frequencyResponse(2, 600, 1, 1000, 0.7);
    near(
      force.magnitude,
      0.9469425238482128,
      "2025 UTS1 force amplitude ratio",
    );
    near(force.phase, -52.69605172201657, "2025 UTS1 force phase", 1e-5);
    near(
      halfPowerFrequency(2, 1, 1000, 0.7),
      1010.0494938387916,
      "2025 UTS1 bandwidth",
      1e-6,
    );
    near(
      frequencyResponse(1, 1 / (2 * Math.PI * 7), 7, 1, 1).magnitude,
      Math.SQRT1_2,
      "First-order half-power limit",
    );
    const heat = thermalCycle(10, 20, 100, 60, 10, 50);
    near(heat.output, 70.56964470628461, "2024 UTS1 temperature after 10s");
    near(
      thermalCycle(60 - 1e-7, 20, 100, 60, 10, 50).output,
      thermalCycle(60, 20, 100, 60, 10, 50).output,
      "Sensor reading continuous at environment switch",
      1e-6,
    );
    near(
      thermalCycle(60, 20, 100, 60, 10, 50).input,
      20,
      "Environment switches immediately",
    );
    near(
      thermalCycle(60, 20, 100, 60, 10, 50).error,
      79.8016998258667,
      "Reading error jumps with changed reference",
    );
    const chain = uncertaintyChain(
      5000,
      [0.001, 0.05, 1000, 15],
      [0.08, 0.001, 0.5, 5],
    );
    near(chain.mean, 3750, "2025 UTS1 misadjusted recorder mean");
    near(chain.bias, -1250, "2025 UTS1 misadjusted recorder bias");
    near(
      chain.sd,
      36.08439182435161,
      "2025 UTS1 propagated standard deviation",
      1e-5,
    );
    near(
      chain.contributions[0],
      1200,
      "Sensor error amplified by all later stages",
    );
    const linear = coefficientUncertainty(
      100,
      [-0.001, 0.02],
      [0.00015, 0.001],
    );
    near(linear.mean, 1.999, "2023 UTS1 mean");
    near(linear.sd, 0.10000011249993673, "2023 UTS1 standard deviation");
    const polynomial = coefficientUncertainty(
      120,
      [1.2, 0.018, 0.00024],
      [0.01, 0.001, 0],
    );
    near(polynomial.mean, 6.816, "2024 UTS1 polynomial mean");
    near(
      polynomial.sd,
      Math.sqrt(0.0145),
      "2024 UTS1 polynomial standard deviation",
    );
    near(
      polynomial.contributions[2],
      0,
      "Exact coefficient contributes no variance",
    );
    near(
      thermistorModel(0, 273.15, 9000, 373.15, 500).resistance,
      9000,
      "NTC ice calibration",
    );
    near(
      thermistorModel(100, 273.15, 9000, 373.15, 500).resistance,
      500,
      "NTC steam calibration",
    );
    check(
      thermistorModel(25, 273.15, 9000, 373.15, 500).slope < 0,
      "NTC slope must be negative",
    );
    near(
      negativeFeedback(50, 10, 10, 1).output,
      500 / 101,
      "2024 UTS1 feedback output at1V",
    );
    near(
      negativeFeedback(50, 10, 10, 1.5).output,
      750 / 151,
      "2024 UTS1 feedback output at1.5V",
    );
    near(
      bridgeVoltage(10, 675, 500, 500, 500),
      -35 / 47,
      "2023 UTS1 bridge polarity",
    );
    near(
      (10 / 1175) ** 2 * 675,
      0.0488909008601177,
      "2023 UTS1 sensor power",
      1e-8,
    );
  },
);


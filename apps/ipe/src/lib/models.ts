/** Numerical models use SI internally unless explicitly named otherwise. */
export function flowModel(
  D: number,
  d: number,
  rho: number,
  dp: number,
  Cd: number,
  Cc = 1,
  vena = false,
) {
  if (!(
    D > 0 &&
    d > 0 &&
    d < D &&
    rho > 0 &&
    dp >= 0 &&
    Cd >= 0 &&
    Cc > 0 &&
    Cc <= 1
  ))
    throw new Error("Invalid flow parameters");
  const A1 = (Math.PI * D * D) / 4,
    A0 = (Math.PI * d * d) / 4,
    A2 = A0 * (vena ? Cc : 1);
  const ideal = A2 * Math.sqrt((2 * dp) / rho / (1 - (A2 / A1) ** 2));
  const Q = Cd * ideal;
  return {
    A1,
    A0,
    A2,
    ideal,
    Q,
    mass: rho * Q,
    v1: Q / A1,
    v2: Q / A2,
    beta: d / D,
  };
}
export const firstOrder = (
  t: number,
  tau: number,
  start: number,
  end: number,
) => end + (start - end) * Math.exp(-t / tau);
export const magnitude = (r: number, zeta: number) =>
  1 / Math.hypot(1 - r * r, 2 * zeta * r);
export const bridgeVoltage = (
  V: number,
  R1: number,
  R2: number,
  R3: number,
  R4: number,
) => V * (R2 / (R1 + R2) - R4 / (R3 + R4));
export function endpointFit(xs: number[], ys: number[]) {
  const n = xs.length - 1,
    K = (ys[n] - ys[0]) / (xs[n] - xs[0]),
    a = ys[0] - K * xs[0];
  const residuals = ys.map((y, i) => y - (a + K * xs[i]));
  return {
    K,
    a,
    residuals,
    max: Math.max(...residuals.map(Math.abs)),
    fs: Math.abs(ys[n] - ys[0]),
  };
}
export function stats(values: number[]) {
  const mean = values.reduce((s, x) => s + x, 0) / values.length;
  const sd = Math.sqrt(
    values.reduce((s, x) => s + (x - mean) ** 2, 0) / (values.length - 1),
  );
  return { mean, sd, se: sd / Math.sqrt(values.length) };
}
// ITS-90 forward coefficients, NIST Monograph 175. Domains restricted below.
const TC_COEFF: Record<string, number[]> = {
  J: [
    0, 0.50381187815e-1, 0.3047583693e-4, -0.8568106572e-7, 0.13228195295e-9,
    -0.17052958337e-12, 0.20948090697e-15, -0.12538395336e-18,
    0.15631725697e-22,
  ],
  T: [
    0, 0.38748106364e-1, 0.3329222788e-4, 0.20618243404e-6, -0.21882256846e-8,
    0.10996880928e-10, -0.30815758772e-13, 0.4547913529e-16, -0.27512901673e-19,
  ],
  K: [
    -0.17600413686e-1, 0.38921204975e-1, 0.18558770032e-4, -0.99457592874e-7,
    0.31840945719e-9, -0.56072844889e-12, 0.56075059059e-15, -0.32020720003e-18,
    0.97151147152e-22, -0.12104721275e-25,
  ],
};
export function thermocoupleEMF(T: number, type = "J") {
  if (T < 0 || T > (type === "T" ? 400 : 500))
    throw new Error("Thermocouple model outside supported temperature range");
  const coefficients = TC_COEFF[type] ?? TC_COEFF.J;
  let e = coefficients.reduceRight((sum, a) => sum * T + a, 0);
  if (type === "K")
    e += 0.1185976 * Math.exp(-0.1183432e-3 * (T - 126.9686) ** 2);
  return e;
}
export function capacitanceCoax(
  length: number,
  fill: number,
  r1: number,
  r2: number,
  er: number,
) {
  return (
    (2 * Math.PI * 8.8541878128e-12 * (length + (er - 1) * fill)) /
    Math.log(r2 / r1)
  );
}

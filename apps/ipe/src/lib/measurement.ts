export function frequencyResponse(
  order: number,
  f: number,
  tau: number,
  fn: number,
  zeta: number,
) {
  const r = order === 1 ? 2 * Math.PI * f * tau : f / fn;
  const real = order === 1 ? 1 : 1 - r * r;
  const imag = order === 1 ? r : 2 * zeta * r;
  const magnitude = 1 / Math.hypot(real, imag);
  return {
    magnitude,
    phase: (-Math.atan2(imag, real) * 180) / Math.PI,
    db: 20 * Math.log10(magnitude),
  };
}

export function halfPowerFrequency(
  order: number,
  tau: number,
  fn: number,
  zeta: number,
) {
  if (order === 1) return 1 / (2 * Math.PI * tau);
  const a = 1 - 2 * zeta * zeta;
  return fn * Math.sqrt(a + Math.sqrt(a * a + 1));
}

export function thermalCycle(
  t: number,
  cold: number,
  hot: number,
  switchTime: number,
  tauHot: number,
  tauCold: number,
) {
  const atSwitch = hot + (cold - hot) * Math.exp(-switchTime / tauHot);
  const input = t < switchTime ? hot : cold;
  const output =
    t < switchTime
      ? hot + (cold - hot) * Math.exp(-t / tauHot)
      : cold + (atSwitch - cold) * Math.exp(-(t - switchTime) / tauCold);
  return { input, output, error: output - input };
}

export function thermistorModel(
  T: number,
  T1: number,
  R1: number,
  T2: number,
  R2: number,
) {
  const beta = Math.log(R1 / R2) / (1 / T1 - 1 / T2);
  const resistance = R1 * Math.exp(beta * (1 / (T + 273.15) - 1 / T1));
  return { beta, resistance, slope: (-beta * resistance) / (T + 273.15) ** 2 };
}

export function uncertaintyChain(
  input: number,
  gains: number[],
  halfWidths: number[],
) {
  const contributions = halfWidths.map((h, i) => {
    const downstream = gains.slice(i + 1).reduce((v, gain) => v * gain, 1);
    return (downstream * h) ** 2 / 3;
  });
  const mean = input * gains.reduce((v, gain) => v * gain, 1);
  return {
    mean,
    bias: mean - input,
    contributions,
    sd: Math.sqrt(contributions.reduce((a, b) => a + b, 0)),
  };
}

export function coefficientUncertainty(
  input: number,
  means: number[],
  sds: number[],
) {
  const weights = means.map((_, i) => input ** i);
  const mean = means.reduce((sum, m, i) => sum + m * weights[i], 0);
  const contributions = sds.map((sd, i) => (sd * weights[i]) ** 2);
  return {
    mean,
    contributions,
    sd: Math.sqrt(contributions.reduce((a, b) => a + b, 0)),
  };
}

export function negativeFeedback(
  force: number,
  forward: number,
  feedback: number,
  supply: number,
) {
  const A = forward * supply;
  const loopGain = A * feedback;
  const gain = A / (1 + loopGain);
  return {
    output: gain * force,
    gain,
    loopGain,
    supplySensitivity: 1 / (1 + loopGain),
  };
}

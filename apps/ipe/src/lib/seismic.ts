export function seismicState(
  m: number,
  k: number,
  c: number,
  A: number,
  f: number,
  t: number,
) {
  const w = 2 * Math.PI * f,
    real = k - m * w * w,
    imag = c * w,
    den = real * real + imag * imag;
  if (den === 0)
    return {
      a: A,
      z: NaN,
      dz: NaN,
      ddz: NaN,
      absoluteAcceleration: NaN,
      amplitude: Infinity,
    };
  const hr = (-m * real) / den,
    hi = (m * imag) / den,
    co = Math.cos(w * t),
    si = Math.sin(w * t);
  const z = A * (hr * co - hi * si),
    dz = A * w * (-hr * si - hi * co),
    ddz = -w * w * z,
    a = A * co;
  return {
    a,
    z,
    dz,
    ddz,
    absoluteAcceleration: a + ddz,
    amplitude: (A * m) / Math.sqrt(den),
  };
}

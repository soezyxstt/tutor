import type { SimulationParamDef, SimulationSpec } from '@tutor/core';
import type { Locale, VisualSpec } from './types';

const titles: Record<string, [string, string]> = {
  orifice: ['Aliran melalui orifice', 'Flow through an orifice'], venturi: ['Aliran melalui venturi', 'Flow through a venturi'],
  pitot: ['Tabung Pitot', 'Pitot tube'], ultrasonic: ['Sensor ultrasonik', 'Ultrasonic sensor'],
  thermocouple: ['Termokopel', 'Thermocouple'], strain: ['Sensor regangan', 'Strain measurement'],
  bridge: ['Jembatan ukur', 'Measurement bridge'], encoder: ['Encoder sudut', 'Angular encoder'],
  resolver: ['Resolver', 'Resolver'], lvdt: ['LVDT', 'LVDT'], capacitive: ['Sensor kapasitif', 'Capacitive sensor'],
  doppler: ['Pergeseran Doppler', 'Doppler shift'], vibrometer: ['Vibrometer', 'Vibrometer'],
  accelerometer: ['Akselerometer', 'Accelerometer'], statistics: ['Sebaran data ukur', 'Measurement data'],
  calibration: ['Kalibrasi', 'Calibration'], signal: ['Sinyal', 'Signal'], system: ['Sistem ukur', 'Measurement system'],
  dynamics: ['Respons dinamis', 'Dynamic response'], potentiometer: ['Potensiometer', 'Potentiometer'],
  rtd: ['Sensor suhu resistif', 'Resistive temperature sensor'], frequency: ['Respons frekuensi', 'Frequency response'],
  uncertainty: ['Ketidakpastian pengukuran', 'Measurement uncertainty'], hysteresis: ['Histeresis', 'Hysteresis'],
  lowpass: ['Filter lolos rendah', 'Low-pass filter'], 'thermal-cycle': ['Pemanasan dan pendinginan', 'Heating and cooling'],
  thermistor: ['Termistor', 'Thermistor'], feedback: ['Umpan balik', 'Feedback'],
};

/** Pure content factory. Only numeric controls are mutable; source geometry and data stay in `data`. */
export function makeSimulation(visual: VisualSpec, stableId: string, locale: Locale): SimulationSpec {
  const data = { ...visual.params, visualKind: visual.kind };
  const n = (key: string, fallback: number) => typeof visual.params?.[key] === 'number' ? visual.params[key] as number : fallback;
  const s = (key: string, fallback = '') => typeof visual.params?.[key] === 'string' ? visual.params[key] as string : fallback;
  const a = (key: string, fallback: number[]) => Array.isArray(visual.params?.[key]) ? visual.params[key] as number[] : fallback;
  const has = (key: string) => typeof visual.params?.[key] === 'number';
  const params: SimulationParamDef[] = [];
  const add = (key: string, id: string, en: string, min: number, max: number, step: number, value: number, unit?: string) => {
    params.push({ key, label: locale === 'id' ? id : en, min, max: Math.max(min + step, max), step, defaultValue: Math.max(min, Math.min(max, value)), ...(unit ? { unit } : {}) });
  };
  const temp = (value: number, max = 200) => add('temperature', 'Suhu', 'Temperature', 0, max, 1, value, '°C');
  const frequency = (value: number, max: number, min = 0, step = 0.1) => add('frequency', 'Frekuensi masukan', 'Input frequency', min, max, step, value, 'Hz');
  // A fractional cursor stays inside the graph when the student changes its duration.
  const time = (_end: number, _step = 0.01) => add('time', 'Posisi waktu', 'Time position', 0, 100, 0.1, 0, '%');
  const tau = (value: number) => add('tau', 'Konstanta waktu τ', 'Time constant τ', Math.max(0.01, value / 5), Math.max(value * 3, 1), 0.01, value, 's');
  const bridge = () => {
    if (s('mode') === 'capacitive') {
      const cs = n('Cs', 100);
      add('capacitance', 'Kapasitansi sensor', 'Sensor capacitance', Math.max(1, cs / 10), cs * 3, 1, cs, 'pF');
      add('voltage', 'Amplitudo eksitasi AC', 'AC excitation amplitude', 0.1, 5, 0.1, n('excitation', 1), 'V');
    } else {
      const r = n('variableArm', 4) === 1 ? n('R1', 100) : n('R4', 100);
      if (has('R0')) temp(n('T', 100));
      else add('resistance', 'Hambatan sensor', 'Sensor resistance', Math.max(1, r * 0.2), r * 2, 0.1, r, 'Ω');
      add('voltage', 'Tegangan catu', 'Supply voltage', 0, Math.max(10, n('V', 5) * 2), 0.1, n('V', 5), 'V');
    }
  };
  switch (visual.kind) {
    case 'orifice': case 'venturi': {
      const D = n('D', 0.5), rho = n('rho', 1000), rm = n('rhoManometer', n('rhoMan', 13600));
      const manometer = has('h') || s('mode') === 'manometer';
      const pressure = n('dp', manometer ? (rm - rho) * n('g', 9.81) * n('h', 0.1) : 50000);
      add('pressure', 'Beda tekanan Δp', 'Pressure difference Δp', 0, Math.max(pressure * 2 / 1000, 10), Math.max(pressure / 100000, 0.01), pressure / 1000, 'kPa');
      add('diameterRatio', s('convention') === 'vena' ? 'd₀ / D' : 'd / D', s('convention') === 'vena' ? 'd₀ / D' : 'd / D', 0.15, 0.85, 0.01, n('d', D * 0.6) / D);
      add('Cd', 'Koefisien debit Cd', 'Discharge coefficient Cd', 0, 1, 0.001, n('Cd', 1)); break;
    }
    case 'pitot': add('height', 'Beda tinggi h', 'Height difference h', 0, Math.max(n('h', 0.1) * 2, 0.01), 0.0001, n('h', 0.1), 'm'); break;
    case 'thermocouple': {
      const max = Math.min(s('type', 'J') === 'T' ? 400 : 500, n('rangeMax', s('type', 'J') === 'T' ? 400 : 500));
      temp(n('T', 200), max);
      add('referenceTemperature', 'Suhu referensi', 'Reference temperature', 0, max, 1, n('Tref', 20), '°C'); break;
    }
    case 'rtd':
      if (s('mode') === 'compare') temp(25, 100);
      else if (has('tau')) { tau(n('tau', 1)); add('targetTemperature', 'Suhu akhir', 'Final temperature', 0, Math.max(200, n('finalTemperature', 100) * 1.5), 1, n('finalTemperature', 100), '°C'); time(Math.max(n('stepTime', 0) + 18 * n('tau', 1), n('evaluationTime', 0) + n('tau', 1))); }
      else if (visual.params?.topology || has('R1')) bridge();
      else temp(n('T', 100), Math.max(200, n('T', 100) * 1.5));
      break;
    case 'bridge': bridge(); break;
    case 'encoder':
      add('angle', 'Sudut θ', 'Angle θ', 0, 359.9, 0.1, n('theta', n('angle', 45)), '°');
      if (!['quadrature', 'incremental'].includes(s('mode', 'absolute'))) add('bits', 'Jumlah bit', 'Bit depth', 2, 10, 1, n('bits', 8));
      break;
    case 'resolver': add('angle', 'Sudut rotor θ', 'Rotor angle θ', 0, 360, 1, n('theta', n('angle', 30)), '°'); break;
    case 'lvdt': {
      const physical = has('x') || has('range') || has('sensitivity'), range = Math.max(0.0001, n('range', physical ? 10 : 1));
      add('position', 'Simpangan x', 'Displacement x', -range, range, range / 100, n('x', n('position', 0)), physical ? 'mm' : undefined); break;
    }
    case 'potentiometer': { const length = n('length', 100); add('position', 'Posisi kontak x', 'Wiper position x', 0, length, length / 100, n('x', length * 0.4), 'mm'); break; }
    case 'capacitive': { const H = Math.max(0.001, n('height', 1)); add('height', 'Tinggi cairan h', 'Liquid height h', 0, H, H / 100, n('level', H * 0.5), 'm'); add('permittivity', 'Konstanta dielektrik κ', 'Relative permittivity κ', 1, Math.max(10, n('k', 4)), 0.1, n('k', 4)); break; }
    case 'ultrasonic': { const end = Math.max(1e-6, n('tEmpty', 0.2)); add('flightTime', 'Waktu pulang-pergi', 'Round-trip time', 0, end, end / 100, n('t', 0.1), 's'); break; }
    case 'strain': add('strain', 'Regangan A1', 'A1 strain', -1500, 1500, 25, n('strainMicro', 500), 'με'); add('poisson', 'Rasio Poisson ν', 'Poisson ratio ν', 0, 0.49, 0.01, n('nu', 0.3)); break;
    case 'doppler': { const c = n('soundSpeed', 330), v = Math.min(n('sourceSpeed', 100 / 3.6), 0.8 * c); add('speed', 'Kecepatan sumber', 'Source speed', 0, Math.min(0.8 * c, Math.max(v * 2, 50)), 0.1, v, 'm/s'); add('angle', 'Sudut arah gerak θ', 'Motion angle θ', 0, 180, 1, n('angle', 0), '°'); break; }
    case 'dynamics':
      if (has('tau')) { tau(n('tau', 1)); time(n('stepTime', 0) + Math.max(18 * n('tau', 1), 0.5)); }
      else { const fn = n('omegaN', 2 * Math.PI * 20) / (2 * Math.PI); frequency(n('frequency', fn * 0.72), fn * 2, 0, 0.01); add('damping', 'Rasio redaman ζ', 'Damping ratio ζ', 0, 1.5, 0.01, n('damping', 0.65)); } break;
    case 'accelerometer':
      if (s('mode') === 'bandwidth') frequency(n('frequency', 25000), Math.max(30000, n('fMax', 10000) * 3), 0.1, 0.1);
      else { const fn = Math.sqrt(n('k', 240) / n('m', 0.05)) / (2 * Math.PI); frequency(n('frequency', 2), Math.max(fn * 1.8, n('frequency', 2)), 0.1); add('acceleration', 'Amplitudo percepatan', 'Acceleration amplitude', 0, Math.max(n('acceleration', 9.81), (n('k', 240) / n('m', 0.05)) * n('maxTravel', 0.01) * 1.2), 0.1, n('acceleration', 9.81), 'm/s²'); time(40); } break;
    case 'vibrometer': frequency(n('frequency', 10), n('maxFrequency', 2000), n('minFrequency', 10), 1); time(4 / n('minFrequency', 10), 0.0001); break;
    case 'statistics': {
      const values = a('values', [9.8, 10, 10.2, 10.1, 9.9]), low = Math.min(...values), high = Math.max(...values), span = Math.max(high - low, 0.1);
      values.forEach((v, i) => add(`value${i}`, `Pengamatan ${i + 1}`, `Observation ${i + 1}`, low - span, high + span, 0.01, v, s('unit', has('mean') ? 'Ω' : ''))); break;
    }
    case 'calibration': if (!Array.isArray(visual.params?.xs) || !Array.isArray(visual.params?.ys) || a('xs', []).length < 2 || a('xs', []).length !== a('ys', []).length) { add('tau', 'Konstanta waktu τ', 'Time constant τ', 0.2, 3, 0.1, 1, 's'); time(6); } break;
    case 'signal': frequency(n('frequency', 2), 10, 0.5); break;
    case 'system':
      if (['inductive', 'optical'].includes(s('mode'))) add('gap', 'Posisi relatif target', 'Relative target position', 0, 100, 1, 40, '%');
      else if (s('mode') === 'uncertainty') add('input', 'Tekanan masukan', 'Input pressure', 0, 10000, 100, n('input', 5000), 'Pa');
      break;
    case 'frequency': { const order = n('order', 2), valueTau = n('tau', 7), fn = n('fn', 1000); frequency(n('frequency', order === 1 ? 1 / (2 * Math.PI * valueTau) : fn * 0.6), order === 1 ? 4 / (2 * Math.PI * valueTau) : 2.5 * fn, 0, order === 1 ? 0.0001 : 5); if (order !== 1) add('zeta', 'Rasio redaman ζ', 'Damping ratio ζ', 0.1, 1.5, 0.05, n('zeta', 0.7)); break; }
    case 'thermistor': temp(n('T', 25), 100); break;
    case 'thermal-cycle': time(n('switchTime', 60) + 5 * n('tauCold', 50), 1); break;
    case 'uncertainty': {
      const chain = s('mode', 'linear') === 'chain', gains = a('gains', [0.001, 0.05, 1000, 15]);
      add('input', chain ? 'Tekanan masukan' : 'Suhu yang diukur', chain ? 'Input pressure' : 'Measured temperature', 0, chain ? 10000 : 200, chain ? 100 : 1, n('input', 100), chain ? 'Pa' : '°C');
      if (chain) add('lastGain', 'Kepekaan perekam', 'Recorder sensitivity', 10, 25, 0.5, gains[gains.length - 1], 'Pa/mV'); break;
    }
    case 'hysteresis': { const values = a('levels', [0, 24]); add('level', 'Level yang dibandingkan', 'Level to compare', values[0], values[values.length - 1], values[1] - values[0] || 1, n('level', 14), 'cm'); break; }
    case 'feedback': add('supply', 'Tegangan catu', 'Supply voltage', 0.5, 2, 0.05, n('supply', 1), 'V'); break;
    case 'lowpass': { const fc = 1 / (2 * Math.PI * n('R', 10000) * n('C', 1e-7)); frequency(n('frequency', 100), 5 * fc, 0, 5); add('gain', 'Penguatan op-amp', 'Op-amp gain', 1, 5, 0.1, n('gain', 2)); break; }
  }
  const title = titles[visual.kind] ?? [visual.kind, visual.kind];
  return { id: stableId, type: `ipe-${visual.kind}`, title: title[locale === 'id' ? 0 : 1], caption: visual.caption[locale], params, data };
}

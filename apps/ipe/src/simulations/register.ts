import { registerSimulation } from '@tutor/core';
import { bindVisual } from './renderer';
import { thermocoupleContext } from './thermocouple-context';
/** The registry loads only the visual family needed by the current lesson. */
export function registerIpeSimulations() {
  registerSimulation('ipe-orifice', () => import('./flow').then(m => ({ default: bindVisual(m.FlowVisual) })));
  registerSimulation('ipe-venturi', () => import('./flow').then(m => ({ default: bindVisual(m.FlowVisual) })));
  registerSimulation('ipe-pitot', () => import('./flow').then(m => ({ default: bindVisual(m.PitotVisual) })));
  registerSimulation('ipe-thermocouple', () => import('./temperature').then(m => ({ default: bindVisual(m.ThermocoupleVisual) })), thermocoupleContext);
  registerSimulation('ipe-rtd', () => import('./temperature').then(m => ({ default: bindVisual(m.RtdVisual) })));
  registerSimulation('ipe-bridge', () => import('./temperature').then(m => ({ default: bindVisual(m.BridgeVisual) })));
  registerSimulation('ipe-calibration', () => import('./temperature').then(m => ({ default: bindVisual(m.CalibrationVisual) })));
  registerSimulation('ipe-statistics', () => import('./temperature').then(m => ({ default: bindVisual(m.StatisticsVisual) })));
  registerSimulation('ipe-encoder', () => import('./position').then(m => ({ default: bindVisual(m.PositionVisual) })));
  registerSimulation('ipe-resolver', () => import('./position').then(m => ({ default: bindVisual(m.PositionVisual) })));
  registerSimulation('ipe-lvdt', () => import('./position').then(m => ({ default: bindVisual(m.PositionVisual) })));
  registerSimulation('ipe-potentiometer', () => import('./position').then(m => ({ default: bindVisual(m.PositionVisual) })));
  registerSimulation('ipe-capacitive', () => import('./position').then(m => ({ default: bindVisual(m.CapacitiveVisual) })));
  registerSimulation('ipe-ultrasonic', () => import('./position').then(m => ({ default: bindVisual(m.UltrasonicVisual) })));
  registerSimulation('ipe-strain', () => import('./position').then(m => ({ default: bindVisual(m.StrainVisual) })));
  registerSimulation('ipe-doppler', () => import('./position').then(m => ({ default: bindVisual(m.DopplerVisual) })));
  registerSimulation('ipe-dynamics', () => import('./dynamics').then(m => ({ default: bindVisual(m.DynamicsVisual) })));
  registerSimulation('ipe-accelerometer', () => import('./dynamics').then(m => ({ default: bindVisual(m.AccelerometerVisual) })));
  registerSimulation('ipe-vibrometer', () => import('./dynamics').then(m => ({ default: bindVisual(m.VibrometerVisual) })));
  registerSimulation('ipe-system', () => import('./systems').then(m => ({ default: bindVisual(m.SystemVisual) })));
  registerSimulation('ipe-signal', () => import('./systems').then(m => ({ default: bindVisual(m.SignalVisual) })));
  registerSimulation('ipe-frequency', () => import('./measurement').then(m => ({ default: bindVisual(m.FrequencyVisual) })));
  registerSimulation('ipe-thermistor', () => import('./measurement').then(m => ({ default: bindVisual(m.ThermistorVisual) })));
  registerSimulation('ipe-thermal-cycle', () => import('./measurement').then(m => ({ default: bindVisual(m.ThermalCycleVisual) })));
  registerSimulation('ipe-uncertainty', () => import('./measurement').then(m => ({ default: bindVisual(m.UncertaintyVisual) })));
  registerSimulation('ipe-hysteresis', () => import('./measurement').then(m => ({ default: bindVisual(m.HysteresisVisual) })));
  registerSimulation('ipe-feedback', () => import('./measurement').then(m => ({ default: bindVisual(m.FeedbackVisual) })));
  registerSimulation('ipe-lowpass', () => import('./measurement').then(m => ({ default: bindVisual(m.LowPassVisual) })));
}

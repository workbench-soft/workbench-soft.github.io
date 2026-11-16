// The Android apps in closed testing, in the page order. Each description sits under its id in src/testers/i18n/.
export const apps = [
  { id: 'farnear', name: 'Farnear' },
  { id: 'keeppad', name: 'KeepPad' },
  { id: 'tickalot', name: 'Tick-a-Lot' },
  { id: 'memoire', name: 'Memoire' },
  { id: 'shuttrix', name: 'Shuttrix' },
  { id: 'skyaltar', name: 'Sky Altar' },
  { id: 'guitarupscale', name: 'GuitarUp' },
  { id: 'guitartuner', name: 'GuitarUp Tuner' },
  { id: 'games', name: 'Workbench Games' },
  { id: 'tripforge', name: 'Tripforge' },
  { id: 'servohop', name: 'ServoHop' },
  { id: 'spotthecam', name: 'SpotTheCam' },
  { id: 'propertytrends', name: 'Property Trends' },
  { id: 'consdr', name: 'Novated Lease vs Loan vs Cash' },
  { id: 'memories', name: 'Memories' },
  { id: 'lumiere', name: 'Lumiere Player' },
] as const;

export type AppId = (typeof apps)[number]['id'];

export const group = 'https://groups.google.com/g/workbench-soft-testers';
export { email as feedback } from '../data/studio';
const pkg = (id: AppId) => `com.workbenchsoft.${id}`;
export const joinUrl = (id: AppId) => `https://play.google.com/apps/testing/${pkg(id)}`;
export const installUrl = (id: AppId) => `https://play.google.com/store/apps/details?id=${pkg(id)}`;

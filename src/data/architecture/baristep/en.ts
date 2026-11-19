import type { Arch } from '../types';
const arch: Arch = {
  summary: 'Expo shares the screens across Android, iOS and web.',
  parts: [
    { name: 'Expo', role: 'Expo shares the screens across Android, iOS and web.' },
    { name: 'AsyncStorage', role: 'AsyncStorage keeps the step checkmarks on the device.' },
    { name: 'Cloudflare R2', role: 'Pictures and the 2 accepted clips load from Cloudflare R2 through the CDN.' },
    { name: 'expo-video', role: 'Only the current step plays its clip through expo-video.' },
  ],
  flow: [
    'Drink records select the steps for 1 or 2 cups.',
    'Cappuccino with chocolate and latte hearts, tulips and leaves, for 1 or 2 cups. Painted steps, timers and saved ticks guide each drink. Cup angle and jug height appear on pour steps. Circle and heart steps have muted loop videos; the other 33 scenes have pictures.',
    'AsyncStorage keeps the step checkmarks on the device.',
  ],
  links: [
    { to: 'GitHub', text: 'GitHub hosts signed Android APK releases.' },
    { to: 'Cloudflare R2', text: 'Pictures and the 2 accepted clips load from Cloudflare R2 through the CDN.' },
  ],
  design: {
    scale: ['Expo shares the screens across Android, iOS and web.', 'Drink records select the steps for 1 or 2 cups.'],
    data: ['Drink records select the steps for 1 or 2 cups.', 'AsyncStorage keeps the step checkmarks on the device.'],
    interfaces: [
      'Pictures and the 2 accepted clips load from Cloudflare R2 through the CDN.',
      'GitHub hosts signed Android APK releases.',
    ],
    reliability: [
      'AsyncStorage keeps the step checkmarks on the device.',
      'The remaining 33 scenes use pictures while their videos await approval.',
    ],
    security: [
      'The guide needs no account and keeps progress on the device.',
      'GitHub hosts signed Android APK releases.',
    ],
    performance: [
      'Pictures and the 2 accepted clips load from Cloudflare R2 through the CDN.',
      'Only the current step plays its clip through expo-video.',
    ],
    operations: [
      'GitHub hosts signed Android APK releases.',
      'Checks and an emulator launch gate run before an APK publishes.',
    ],
    tradeoffs: [
      'Expo shares the screens across Android, iOS and web.',
      'The remaining 33 scenes use pictures while their videos await approval.',
    ],
  },
  features: {
    'Coffee guide':
      'Cappuccino with chocolate and latte hearts, tulips and leaves, for 1 or 2 cups. Painted steps, timers and saved ticks guide each drink. Cup angle and jug height appear on pour steps. Circle and heart steps have muted loop videos; the other 33 scenes have pictures.',
    'Releases and updates':
      'Android checks for a new GitHub APK at start and on return. The menu checks by hand and shows the version; downloads show progress. iOS and web carry no APK updater.',
  },
};
export default arch;

import type { CapacitorConfig } from '@capacitor/cli';

// The Android and iOS apps: the built pages from dist/, opened from dist/index.html.
const config: CapacitorConfig = {
  appId: 'com.workbenchsoft.games',
  appName: 'Workbench Games',
  webDir: 'dist',
  backgroundColor: '#f6f4ff',
  android: { allowMixedContent: false },
  plugins: {
    AdMob: { initializeForTesting: false },
  },
};

export default config;

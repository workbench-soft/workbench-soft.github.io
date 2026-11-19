import type { Arch } from '../types';
const arch: Arch = {
  summary: 'Expo teilt die Ansichten zwischen Android, iOS und Web.',
  parts: [
    { name: 'Expo', role: 'Expo teilt die Ansichten zwischen Android, iOS und Web.' },
    { name: 'AsyncStorage', role: 'AsyncStorage speichert die Häkchen auf dem Gerät.' },
    { name: 'Cloudflare R2', role: 'Bilder und die 2 freigegebenen Clips kommen über das CDN aus Cloudflare R2.' },
    { name: 'expo-video', role: 'Nur der aktuelle Schritt spielt seinen Clip über expo-video.' },
  ],
  flow: [
    'Getränkedaten wählen die Schritte für 1 oder 2 Tassen.',
    'Cappuccino mit Schokolade und Latte mit Herz, Tulpe oder Blatt für 1 oder 2 Tassen. Gemalte Schritte, Timer und gespeicherte Häkchen führen durch jedes Getränk. Beim Gießen stehen Tassenwinkel und Kannenhöhe dabei. Kreis und Herz haben stumme Videos in Schleife; die anderen 33 Szenen zeigen Bilder.',
    'AsyncStorage speichert die Häkchen auf dem Gerät.',
  ],
  links: [
    { to: 'GitHub', text: 'GitHub stellt signierte Android-APKs bereit.' },
    { to: 'Cloudflare R2', text: 'Bilder und die 2 freigegebenen Clips kommen über das CDN aus Cloudflare R2.' },
  ],
  design: {
    scale: [
      'Expo teilt die Ansichten zwischen Android, iOS und Web.',
      'Getränkedaten wählen die Schritte für 1 oder 2 Tassen.',
    ],
    data: [
      'Getränkedaten wählen die Schritte für 1 oder 2 Tassen.',
      'AsyncStorage speichert die Häkchen auf dem Gerät.',
    ],
    interfaces: [
      'Bilder und die 2 freigegebenen Clips kommen über das CDN aus Cloudflare R2.',
      'GitHub stellt signierte Android-APKs bereit.',
    ],
    reliability: [
      'AsyncStorage speichert die Häkchen auf dem Gerät.',
      'Die übrigen 33 Szenen nutzen Bilder, bis ihre Videos freigegeben sind.',
    ],
    security: [
      'Die Anleitung braucht kein Konto und speichert den Fortschritt auf dem Gerät.',
      'GitHub stellt signierte Android-APKs bereit.',
    ],
    performance: [
      'Bilder und die 2 freigegebenen Clips kommen über das CDN aus Cloudflare R2.',
      'Nur der aktuelle Schritt spielt seinen Clip über expo-video.',
    ],
    operations: [
      'GitHub stellt signierte Android-APKs bereit.',
      'Prüfungen und ein Start im Emulator laufen vor der APK-Veröffentlichung.',
    ],
    tradeoffs: [
      'Expo teilt die Ansichten zwischen Android, iOS und Web.',
      'Die übrigen 33 Szenen nutzen Bilder, bis ihre Videos freigegeben sind.',
    ],
  },
  features: {
    'Coffee guide':
      'Cappuccino mit Schokolade und Latte mit Herz, Tulpe oder Blatt für 1 oder 2 Tassen. Gemalte Schritte, Timer und gespeicherte Häkchen führen durch jedes Getränk. Beim Gießen stehen Tassenwinkel und Kannenhöhe dabei. Kreis und Herz haben stumme Videos in Schleife; die anderen 33 Szenen zeigen Bilder.',
    'Releases and updates':
      'Android sucht beim Start und bei der Rückkehr nach einem neuen GitHub-APK. Das Menü zeigt die Version und prüft manuell; Downloads zeigen den Fortschritt. iOS und Web enthalten keinen APK-Updater.',
  },
};
export default arch;

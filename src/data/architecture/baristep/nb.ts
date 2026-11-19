import type { Arch } from '../types';
const arch: Arch = {
  summary: 'Expo deler skjermene mellom Android, iOS og nett.',
  parts: [
    { name: 'Expo', role: 'Expo deler skjermene mellom Android, iOS og nett.' },
    { name: 'AsyncStorage', role: 'AsyncStorage lagrer avkrysningene på enheten.' },
    { name: 'Cloudflare R2', role: 'Bilder og de 2 godkjente klippene lastes fra Cloudflare R2 via CDN.' },
    { name: 'expo-video', role: 'Bare det aktive steget spiller klippet sitt med expo-video.' },
  ],
  flow: [
    'Drikkedata velger stegene for 1 eller 2 kopper.',
    'Cappuccino med sjokolade og latte med hjerte, tulipan eller blad til 1 eller 2 kopper. Malte steg, tidtakere og lagrede avkrysninger viser veien. Hellesteg viser koppvinkel og kannehøyde. Sirkel og hjerte har lydløse videoløkker; de andre 33 scenene har bilder.',
    'AsyncStorage lagrer avkrysningene på enheten.',
  ],
  links: [
    { to: 'GitHub', text: 'GitHub er vert for signerte Android-APK-er.' },
    { to: 'Cloudflare R2', text: 'Bilder og de 2 godkjente klippene lastes fra Cloudflare R2 via CDN.' },
  ],
  design: {
    scale: ['Expo deler skjermene mellom Android, iOS og nett.', 'Drikkedata velger stegene for 1 eller 2 kopper.'],
    data: ['Drikkedata velger stegene for 1 eller 2 kopper.', 'AsyncStorage lagrer avkrysningene på enheten.'],
    interfaces: [
      'Bilder og de 2 godkjente klippene lastes fra Cloudflare R2 via CDN.',
      'GitHub er vert for signerte Android-APK-er.',
    ],
    reliability: [
      'AsyncStorage lagrer avkrysningene på enheten.',
      'De andre 33 scenene bruker bilder mens videoene venter på godkjenning.',
    ],
    security: [
      'Guiden krever ingen konto og lagrer fremdriften på enheten.',
      'GitHub er vert for signerte Android-APK-er.',
    ],
    performance: [
      'Bilder og de 2 godkjente klippene lastes fra Cloudflare R2 via CDN.',
      'Bare det aktive steget spiller klippet sitt med expo-video.',
    ],
    operations: [
      'GitHub er vert for signerte Android-APK-er.',
      'Kontroller og oppstart i emulator kjøres før en APK publiseres.',
    ],
    tradeoffs: [
      'Expo deler skjermene mellom Android, iOS og nett.',
      'De andre 33 scenene bruker bilder mens videoene venter på godkjenning.',
    ],
  },
  features: {
    'Coffee guide':
      'Cappuccino med sjokolade og latte med hjerte, tulipan eller blad til 1 eller 2 kopper. Malte steg, tidtakere og lagrede avkrysninger viser veien. Hellesteg viser koppvinkel og kannehøyde. Sirkel og hjerte har lydløse videoløkker; de andre 33 scenene har bilder.',
    'Releases and updates':
      'Android ser etter en ny APK på GitHub ved start og når du kommer tilbake. Menyen viser versjonen og lar deg sjekke selv; nedlastingen viser fremdrift. iOS og nett har ingen APK-oppdatering.',
  },
};
export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Sky Altar is one Expo app for Android and the web with no server of its own. Astronomy Engine and star data in the app give the sky, and Skia draws it.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'one code base for the Android app and the website, with the names in the fonts of the phone.',
    },
    { name: 'Skia', role: 'draws the whole sky as one picture per frame on the GPU.' },
    { name: 'Astronomy Engine', role: 'places the Sun, the Moon and the planets and computes the birth charts.' },
    { name: 'd3-celestial data', role: 'the 2851 stars to magnitude 5.5 and the IAU figures with their names.' },
    { name: 'expo-camera', role: 'takes a silent photo every 1.5 seconds for the star match.' },
    { name: 'Media3 ExoPlayer', role: 'a Kotlin module that loops the music on the speaker at a set level.' },
    { name: 'Cloudflare R2', role: 'serves the pictures and the tracks of the paid themes.' },
    { name: 'Google Play Billing and AdMob', role: 'sell Remove ads and Pro and show the ads after consent.' },
  ],
  flow: [
    'The rotation sensor or a finger turns the view of the sky.',
    'Once a second Astronomy Engine turns each star into a horizon position.',
    'Each frame projects the stars and figures onto the screen.',
    'Skia records the art, the lines and the stars as one picture.',
    'React Native writes the names on top, and camera stars glow over it.',
  ],
  links: [
    { to: 'songfactory', text: 'The theme tracks come from Suno through Songfactory, with a style line per theme.' },
    { to: 'tickalot', text: 'The update check is a copy of the one in Tick-a-Lot.' },
    { to: 'app-updater', text: 'WBS Updater installs the same APK from the shared releases.' },
    { to: 'Google Play', text: 'Google Play Billing sells Remove ads and Pro.' },
    {
      to: 'Open-Meteo',
      text: 'The birth city search sends only the typed name and gets back the place and its time zone.',
    },
  ],
  features: {
    'Sky view':
      'The rotation sensor moves the view, and the gyro holds it steady between compass fixes. Skia draws the stars, the bodies and 88 figures from data in the app.',
    Clock:
      'A React Native layer draws the time and date in the font of the theme. One timer fires each minute, and the clock dims with the buttons.',
    'Camera stars':
      'The app takes a silent photo every 1.5 seconds and finds the points of light in JavaScript. Points that match the star catalog flash gold over the sky.',
    'Culture themes':
      'A record per culture sets its colours, line style and font. Each picture pins to 3 stars of its figure, and the paid themes download once from Cloudflare R2.',
    'Ambient music':
      'A Kotlin module on Media3 ExoPlayer loops the track with fades, bundled or from the CDN. A document picker copies your own files or folder into the app.',
    'Ads and Remove ads':
      'AdMob shows banners on the theme sheet and in Settings, plus one full screen ad at most every 30 minutes. Google Play Billing sells Remove ads.',
    'Sky Altar Pro':
      'Google Play Billing sells the Pro product, and one check decides each lock. The web build has no store and opens the Pro parts.',
    'App languages':
      'i18next holds 9 catalogs for the screens. The figure names and the lore files come in each language too.',
    'Updates from GitHub':
      'The update check reads the shared GitHub releases, downloads the APK and hands it to the installer. The Google Play build swaps the check for empty stubs.',
    Astrology:
      'Astronomy Engine places the planets for the birth chart, with whole sign houses. Open-Meteo finds the birth city, and the saved birth data stays on the phone.',
    'Constellation navigation':
      'A virtualized list filters the catalog and turns each label point into a spot on the current sky. A tap eases the view there over 450 ms.',
    'Constellation lore':
      'Each card reads the story of the theme culture from a lore file per language. The star facts come from the Hipparcos data in the ESA Gaia archive.',
  },
};

export default arch;

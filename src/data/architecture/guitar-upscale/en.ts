import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A Next.js app runs in the browser and on Cloudflare Workers. Capacitor packs the same build into the Android and iPhone apps, and the sound engine runs on the device.',
  parts: [
    {
      name: 'Next.js and React',
      role: 'the one page with each feature, rendered by the server once and then run in the browser.',
    },
    { name: 'Sound engine', role: 'the players and recorders outside React, linked by an RxJS event bus.' },
    { name: 'Web Workers', role: 'the beat clock, the chord shapes and the chord detection off the main thread.' },
    { name: 'smplr and Web Audio', role: 'sampled General MIDI instruments with a reverb and delay bus.' },
    { name: 'Redux Toolkit', role: 'the settings and the screen state, saved in browser storage.' },
    { name: 'Konva', role: 'the canvases for the neck, the piano roll and the tab.' },
    { name: 'Capacitor', role: 'packs the static build into the Android apps and the iPhone app with native plugins.' },
    {
      name: 'Cloudflare Workers and KV',
      role: 'host the server build through OpenNext, proxy the song sites and keep the built-in songs.',
    },
  ],
  flow: [
    'A tap, a chord or a loaded song puts notes on the event bus.',
    'A Web Worker clock keeps playback, strumming and the looper on the beat.',
    'The smplr library plays each note through the reverb and delay.',
    'The recorders file each note by tick for the piano roll and MIDI.',
    'Songs and words from outside sites come through the Cloudflare Worker.',
  ],
  links: [
    { to: 'lumiere-player', text: 'Lumiere Player opens the song it plays in Guitar Upscale through a song link.' },
    { to: 'keeppad', text: 'The Hey Guitar phrase uses the same sherpa-onnx keyword model as KeepPad.' },
    { to: 'Songsterr', text: 'Songsterr tabs come in through the Worker proxy and turn into Guitar Pro files.' },
    { to: 'Google Play', text: 'Google Play sells Pro and Remove ads, and AdMob shows the ads.' },
    { to: 'Cloudflare', text: 'Cloudflare Workers host the site, and KV holds the built-in songs.' },
  ],
  features: {
    Fretboard:
      'Konva draws the neck on a canvas from the scale and tuning in the settings store. A tap sends the note on the event bus, and smplr plays it.',
    'Scale, tuning and capo':
      'The scales and tunings are static data inside the app. A pick goes to the Redux store, and the neck and the chord shapes rebuild.',
    Tuner:
      'The pitchy library reads the pitch from the microphone in the browser. The app guesses the tuning from the open strings, and Konva draws the dial.',
    Chords:
      'A pool of up to 4 Web Workers finds the chord shapes for the neck and capo. The panel fills in one chord type at a time.',
    Strumming:
      'Each held chord button runs the picked pattern on the Worker clock. Custom patterns stay in browser storage.',
    'Song list':
      'Built-in songs are Guitar Pro files in Cloudflare KV, turned into JSON at build time. Your songs stay in the browser, and the list tags each song with its scale.',
    'Voice search':
      'The browser speech API hears the words, and the Android app uses the phone speech service. The app then plays the song from the list or searches the song sites.',
    'Hey Guitar':
      'On Android a sherpa-onnx keyword model from KeepPad hears the phrase offline. In the browser the browser speech service listens while the page is open.',
    'MIDI recording':
      'A recorder listens to the event bus and files each note by clock tick. Notes the app plays carry a mark, so the take skips them.',
    Looper:
      'Each of up to 8 channels records from the event bus on the Worker clock. Loops round to whole bars and play in time.',
    Quantize:
      'One length in the settings store sets the piano roll grid. The recorders move each note onto that grid as it comes in.',
    'Piano roll':
      'The piano roll edits the shared note timeline in place, with undo per track. Konva draws the notes, and a worker guesses the song parts when the file has none.',
    'Tab view':
      'A layout module turns the notes of one track into frets on strings. Konva draws the bars and follows the shared playhead.',
    'Chord sheet':
      'The Worker fetches the words from chord and lyrics sites, since they block browser calls. The app moves their chords to the song key and times each line to the song.',
    'Song upload':
      'Readers turn Guitar Pro and MIDI files into notes in the browser. An audio file searches the song sites by name, or ONNX models hear its chords on the device.',
    'Find a song online':
      'The Cloudflare Worker forwards each search to the 4 song sites, which block browser calls. The app turns a Songsterr song into a Guitar Pro file.',
    'Chord and scale detection':
      'A chord detector in a Web Worker matches the tapped notes against the chord shapes. The scale detector runs on the main thread and suggests scales.',
    'Instruments and sound':
      'The smplr library plays General MIDI soundfonts from free sample kits, loaded on the first tap. The lead and the chords each get their own instrument.',
    Effects:
      'Each instrument feeds one Web Audio bus with a convolver reverb and a feedback delay. A slider changes the bus live with no instrument reload.',
    'MIDI export':
      'The midi-writer-js library writes the loaded notes as a MIDI file. A Guitar Pro writer saves the same notes as a Guitar Pro file.',
    'Guitar Upscale Pro':
      'Each build carries every feature. The Android app hides the Pro ones until Google Play Billing on the phone reports the purchase.',
    'Install and offline':
      'A service worker caches the pages, the code and the songs for offline use. The Android app carries the static build and its sounds inside the APK.',
    'iPhone app':
      'Capacitor packs the same static build into an iOS project with Swift plugins. StoreKit sells the purchases, and AdMob shows the ads after the tracking prompt.',
    'Screen layout':
      'React components float over the full screen fretboard canvas. A setting moves the chords to the left or the right side.',
    'Play panel':
      'A player steps through the note timeline on the Worker clock and sends each note to the bus. The chord panel takes its grips from the chord shape workers.',
    'Easy and Pro mode':
      'A filter in the player keeps only the chord events while Easy is on. A song without chords plays whole.',
    'Song links':
      'The menu builds a search address on each site from the song name. The site opens in a new tab or the Android browser.',
    'Built-in songs admin':
      "The admin page and the owner's phone write songs to Cloudflare KV. The phone route checks a developer key, then starts a new deploy through GitHub Actions.",
    Settings:
      'Redux Toolkit holds each setting, and redux-persist saves it to browser storage. The engine reads a plain copy outside React.',
    'Android updates':
      'The GitHub build asks GitHub Releases for a newer APK on start and on return. A native plugin downloads it and opens the installer.',
    Ads: 'AdMob shows the banner and the full screen ad in the phone apps. A Remove ads purchase in Google Play or the developer key on the phone turns them off.',
    Languages:
      'i18next holds the app text in 10 catalogs and follows the phone or browser language. The lesson pages are built per language under their own path.',
  },
};

export default arch;

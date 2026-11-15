import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'KeepPad is one Expo app that builds the Android app, the iPhone app and the website. Notes stay in SQLite on the phone, and only shared notes go to Firebase.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'one code base for Android, iPhone and the website, with expo-router screens.',
    },
    {
      name: 'Kotlin listener service',
      role: 'the Android foreground service that hears Hey Keep, records the note and plays the replies.',
    },
    { name: 'sherpa-onnx', role: 'the small keyword model on the phone that spots the wake phrases.' },
    {
      name: 'Phone speech recognizer',
      role: 'the Android speech service and the Apple recognizer turn speech into text.',
    },
    { name: 'SQLite', role: 'the notes, the record of sent notes and the inbox done list, on the phone.' },
    {
      name: 'Gemini Nano and Apple Foundation Models',
      role: 'the model of the phone picks a better group while the app is open.',
    },
    { name: 'Firebase', role: 'Firestore holds the shared notes, and Hosting serves the website.' },
    { name: 'Google Play', role: 'AdMob ads, and the Remove ads and KeepPad Pro purchases.' },
  ],
  flow: [
    'The listener service hears "Hey Keep" with the app closed.',
    'It records the note and turns the speech into text on the phone.',
    'The service writes the note to a small inbox file.',
    'The app saves the inbox into SQLite and picks a group by words.',
    'The model of the phone may move the note, and the list reloads.',
  ],
  links: [
    {
      to: 'memories',
      text: 'A note that opens with the name of a person goes to their journal on the home NAS over WebDAV.',
    },
    {
      to: 'lumiere-player',
      text: 'Wake Share lets the KeepPad listener hear "Hey Lumi" too and hand it to Lumiere.',
    },
    { to: 'spotthecam', text: 'The same shared microphone hands "Hey Spot" to SpotTheCam.' },
    { to: 'Firebase', text: 'Firestore keeps shared notes live, and Hosting serves the website.' },
    { to: 'Google Play', text: 'AdMob shows the banner, and Play Billing sells Remove ads and KeepPad Pro.' },
  ],
  features: {
    'Hey Keep':
      'A Kotlin foreground service skips quiet sound and runs a sherpa-onnx keyword model on loud frames. Replies play from clips recorded per voice, and tuning sets a threshold per phrase.',
    'Long recording':
      'The listener service writes the sound to a pending file as it records. After a crash the app turns that file into a note and gets the text from the sound.',
    'Stop and continue':
      'The keyword model and the recognizer both listen for "Stop" during a note. After "continue" the service joins the new words and sound to the newest note.',
    'Record by button':
      'expo-speech-recognition streams the words onto the screen as the person talks. The note goes into SQLite, with its sound where the phone allows.',
    Recordings:
      'The app records the sound itself and feeds it to the recognizer. The WAV file stays on the phone beside the note.',
    Groups:
      'A word match on English and Russian stems picks a group at once. Gemini Nano or Apple Foundation Models may pick a better one while the app is open.',
    Languages:
      'The recognizer of the phone hears English and Russian, offline with the language packs. i18next holds the screens in 9 catalogs.',
    'Share by link':
      'The note goes to Firestore, and the link opens it in the app or a browser. A listener keeps both copies live, and the newer edit wins.',
    'Send to other apps':
      'Each linked app gets the new note through its own web API. Obsidian gets a file in a picked folder, and sign in tokens sit in the secure store.',
    Website:
      'Expo exports each route as a static page, and Firebase Hosting serves it. A shared note loads from Firestore in the browser.',
    'In-app update':
      'The GitHub build reads the releases list at start and on return. It downloads the APK and opens the Android installer. The Play build leaves this code out.',
    'Light and dark theme':
      'The theme module follows the color scheme of the phone or a fixed pick. The pick stays on the phone with the other settings.',
    Ads: 'The Google Mobile Ads library shows the AdMob banner on the home screen. The Google consent form asks first in Europe.',
    'Remove ads':
      'expo-iap sells the product through Google Play Billing. Restore purchase reads it back on a new phone with the same account.',
    'Loud sound from the phone speaker':
      'The native module routes each sound to the built-in speaker at full volume. A loudness boost adds 6 dB, and the volume goes back after the sound.',
    'Notes about a person go to Memories':
      'The app matches the first word of a note to a name from Memories. The tidied and dated note goes to that journal over WebDAV.',
    'KeepPad Pro':
      'expo-iap sells Pro through Google Play, and one Pro module checks it before each locked action. A refund turns Pro off on the next start.',
    'Fast scroll':
      'The studio’s fast-scroll package wraps the notes list. The list follows the dragged thumb once per frame, and iOS and the web keep their own scrollbar.',
  },
};

export default arch;

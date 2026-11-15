import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'An Expo app for Android, the iPhone and the web keeps each card in SQLite on the device. The word base ships inside the app, and Firestore syncs a deck once the person pairs devices.',
  parts: [
    { name: 'Expo and React Native', role: 'one code base for Android, the iPhone and the web.' },
    { name: 'SQLite', role: 'the cards, the answers, the known words and the pictures, on each device.' },
    { name: 'ts-fsrs', role: 'the FSRS schedule that sets when each card comes back.' },
    {
      name: 'Word base',
      role: 'English and Russian words in JSON inside the app, built from open word lists and Wiktionary.',
    },
    { name: 'Firestore', role: 'a copy of each synced deck, reached by a pairing code.' },
    {
      name: 'Talk engines',
      role: "Gemini with the person's own key, Qwen 3 on the phone, or Chrome's built in model.",
    },
    { name: 'Speaker module', role: 'a local Kotlin module that plays words from the phone speaker at full volume.' },
    { name: 'Google Play', role: 'AdMob ads, and the Remove ads and Pro purchases through expo-iap.' },
  ],
  flow: [
    'The person types a word or starts a batch.',
    'The lookup checks the word base, then Wiktionary and MyMemory.',
    'The app saves the cards in SQLite on the device.',
    'FSRS picks the due cards, and new words fill the batch.',
    'The card shows the word, its picture and its sound.',
  ],
  links: [
    { to: 'Firebase', text: 'Firestore keeps a copy of each paired deck, behind an anonymous sign in.' },
    {
      to: 'Wiktionary and MyMemory',
      text: 'A typed word missing from the base gets its translations here, with no key.',
    },
    { to: 'Wikipedia', text: "The lead photo of the word's article, with its Commons credit." },
    { to: 'Google Gemini', text: "Talk practice and topic guesses call it with the person's own key." },
    { to: 'Google Play', text: 'AdMob shows the ads, and Play Billing sells Remove ads and Pro.' },
  ],
  design: {
    scale: [
      "One learner per install, with all cards in SQLite on the device. No server of the studio's own runs.",
      'The word base ships in the app as assets/words/en.json and ru.json, built from CEFR-J, Octanove, Wiktionary and OpenRussian.',
      'Free services set the limits: MyMemory gives about 5,000 words a day per device, and the GitHub release list allows 60 calls an hour per address.',
      'The talk model on the phone takes about 1.2 GB of storage and 2 GB of free memory.',
    ],
    data: [
      'Cards, reviews, known words and pictures sit in SQLite through expo-sqlite, on the web too.',
      'A card keeps its FSRS state as JSON in memory, and due is copied to its own column for the index. (lang, term_key) is unique.',
      'A deleted card stays as a flag, and updated_at lets the later edit win in sync.',
      'Settings sit in localStorage. Pictures stay on each device and out of sync.',
    ],
    interfaces: [
      'Sync writes each card to Firestore under decks/{code}/cards/{lang}_{termKey}, and firestore.rules checks the code length and each field.',
      'A typed word goes to the base, then to Wiktionary through kaikki.org, then to the MyMemory API. Wikipedia gives the lead photo.',
      "Gemini is called from the device with the person's own key, and Qwen 3 runs on the phone through react-native-executorch.",
      'A Kotlin module in modules/speaker/ renders speech to a file, and a background handler draws the Android home widget.',
    ],
    reliability: [
      'Each device works alone on its SQLite file, so the app runs offline, and sync is an optional layer on top.',
      'The later edit of a word wins in sync, and a deleted card stays as a flag so the deletion syncs too.',
      'A lookup falls back from the base to Wiktionary to MyMemory. kaikki.org sends no CORS headers, so the web build skips it.',
      'A pure, tested function plans a week of local notifications, so a person who skips the app gets one a day for 7 days.',
    ],
    security: [
      'Firebase anonymous sign in gives one user per device, and a pairing code of 80 random bits shares a deck with no account.',
      'Anyone with the code can read and change that deck. Reviews, settings and known words stay on each device.',
      "Gemini runs on the person's own key, and no message leaves the device apart from the call to the chosen engine.",
      'The Android keystore and its password are CI secrets, with a copy kept outside the repo.',
    ],
    performance: [
      'The batch query reads due cards through the cards_due index, then fills in new words up to the daily quota.',
      'words/complete offers base words by first letters with no network, and the base loads on first use.',
      'expo-image keeps pictures on disk, and an empty picture result is asked again after 30 days.',
      'The release build reuses its kept android/ folder when @expo/fingerprint matches, and rebuilds only the JS.',
    ],
    operations: [
      'Checks run lint, format, types, knip and Vitest twice: as Android and the web, then with Platform.OS set to ios.',
      'A push to main builds the APK on a heavy runner, and release-gate.sh publishes once Checks pass. Failed Checks cancel the build.',
      'With PLAY_TRACK set, a nightly run at 19:00 Sydney time uploads a bundle to Google Play, and only when the app changed.',
      'The GitHub APK checks the release list for a newer memoire-v* tag. The Play and iOS builds leave that code out.',
    ],
    tradeoffs: [
      'Expo with React Native over a native Kotlin app, so one codebase builds Android, iOS and the web, at the cost of some phone only parts.',
      'SQLite on the device over Firestore as the only store, so the app works offline and opens at once, and sync stays optional.',
      'A pairing code over Google sign in, so devices pair with no account, at the cost that anyone with the code can edit the deck.',
      "FSRS state as one JSON column over a column per field, so a ts-fsrs change needs no schema change, but the JSON can't be queried.",
    ],
  },
  features: {
    'Word batches':
      'A batch module takes the due cards from SQLite, then new words from the base up to the daily quota. ts-fsrs sets when each card returns.',
    'Ways to ask':
      "Each card takes a way to ask from the skills picked in Goals. Listening reads the word with the phone's own voice.",
    'Add a word':
      'The lookup tries the built in base, then Wiktionary, then MyMemory. Suggestions come from the base with no network.',
    Pictures:
      "The app asks the Wikipedia API of the learned language for the article's photo, free licences only. expo-image keeps it on disk, outside sync.",
    'Built in words':
      'A build script joins CEFR-J, Octanove, Wiktionary and OpenRussian into 2 JSON files. The app loads them on first use.',
    'Level test':
      'The test mixes base words of each level with made up words. A score per level, less guessing, sets where new words come from.',
    Topics:
      "Each base word carries its topics. A typed word gets them from Wiktionary, or from Gemini or Chrome's model.",
    Reminders:
      'A planner on the phone posts a week of local notifications through expo-notifications. It plans again each time the app opens or closes.',
    'My words': 'The list reads the cards from SQLite on the device. A delete marks the card, so sync can carry it.',
    'Look and language':
      'i18next holds the 9 catalogs, and the theme follows the phone or Settings. Both picks stay on the device.',
    'Talk practice':
      "The scene prompt goes to Gemini with the person's key, Qwen 3 on the phone or Chrome's model. A tap on a word in a reply saves a card.",
    'Sync between devices':
      'Each device signs in to Firebase anonymously and pushes changed cards to the deck of its code. The later edit of a word wins.',
    'Home screen widget':
      'react-native-android-widget draws it from SQLite in the background. It refreshes every 30 minutes and when the app goes to the back.',
    'Ads and Remove ads':
      'AdMob shows the banner and the full screen ad after the consent form. Google Play Billing sells Remove ads through expo-iap.',
    Sound:
      'A local Kotlin module renders each word to a file and plays it from the speaker at full volume. iOS and the web use the system output.',
    'Memoire Pro':
      'Google Play Billing sells Pro through expo-iap. One check reads the purchase and opens each locked item.',
    Updates:
      'The GitHub APK reads the public release list and opens the Android installer. The Play and iPhone builds leave this module out.',
  },
};

export default arch;

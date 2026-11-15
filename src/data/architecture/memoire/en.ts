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

// The English text of the testers page. Each other catalog takes this type, and testers.test.ts checks the keys.
export const en = {
  title: 'Test the Workbench Soft Android apps',
  description:
    'Join the closed tests of 16 Workbench Soft Android apps on Google Play: join the Google Group, then press Join the test and Install for each app.',
  home: 'Workbench Soft',
  language: 'Language',
  why: 'Google Play publishes a new app only after 12 testers keep it installed for 14 days in a row. Your test helps each app reach the store.',
  stepsTitle: 'How to join',
  steps: [
    'Join the Google Group {group}. Press "Join group" with the same Google account as your Play Store.',
    'For each app below, open "Join the test" and press "Become a tester".',
    'Then press "Install" and get the app from Google Play.',
    'Keep the apps installed for 14 days. Opening them now and then helps.',
  ],
  notAvailable: 'A link says "App not available"? Google still reviews that app. Try again in a few days.',
  appsTitle: 'The apps',
  join: 'Join the test',
  install: 'Install',
  feedback: 'Found a bug or have an idea? Write to {email}.',
  apps: {
    farnear: 'Video calls across borders, with a board for shared images and video.',
    keeppad: 'Voice notes you start by saying "Hey Keep".',
    tickalot: 'Shopping, packing and sightseeing lists you share by link.',
    memoire: 'Learn English or Russian words in short batches, right before you forget them.',
    shuttrix: 'A camera with the dials of a DSLR, and a Simple mode with big sliders.',
    skyaltar: 'The night sky through the phone, drawn in the style of old cultures.',
    guitarupscale: 'A guitar you play on the screen, with scales, chords and songs.',
    guitartuner: 'A guitar tuner that listens through the microphone.',
    games: 'Party games: draw, guess and give clues.',
    tripforge: 'A whole trip from a few words: flights, route, hotels and car, priced.',
    servohop: "Australian fuel prices on a map, with each servo's history.",
    spotthecam: 'Speed cameras of Australia and New Zealand on one map.',
    propertytrends: 'Australian suburbs coloured by their median property price, with the history.',
    consdr: 'Lease, loan or cash: what a car costs in Australia.',
    memories: 'On this day photos from your own NAS. Without a home NAS, joining the test still counts.',
    lumiere: 'An Android player with voice control for video, music and books. It also runs on a TV.',
  },
};

export type Text = typeof en;

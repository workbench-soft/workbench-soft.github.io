import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A Kotlin Android app with no server. A foreground service hears the wake word, the phone builds the Shazam fingerprint itself, and the song goes to Spotify and Lumiere.',
  parts: [
    {
      name: 'ListenService',
      role: 'the foreground microphone service: reads 80 ms frames, starts a catch and speaks the result.',
    },
    { name: 'sherpa-onnx', role: 'the keyword spotter that hears "Shazam" from one phrase line, with no training.' },
    {
      name: 'Signature.kt',
      role: 'a Kotlin port of the shazamio fingerprint: an FFT of 16 kHz mono and peaks in 4 bands.',
    },
    { name: 'Shazam', role: 'the recognition service, asked with the fingerprint at 3, 6, 9 and 12 seconds.' },
    { name: 'Spotify.kt', role: 'PKCE login, the track lookup by ISRC and the save to Liked Songs.' },
    {
      name: 'wakeshare',
      role: 'the shared microphone module of this repo, so the other wake apps keep their phrases.',
    },
  ],
  flow: [
    'The keyword spotter hears "Shazam", and the service takes the microphone and beeps.',
    'The catch records and builds the fingerprint while queries go to Shazam in the background.',
    'A match goes to Lumiere by broadcast and to Spotify Liked Songs.',
    'A voice says the result, and the microphone goes back to every wake phrase.',
  ],
  links: [
    { to: 'Shazam', text: 'Takes the fingerprint and answers with the title, artist, album and ISRC.' },
    { to: 'Spotify', text: 'Finds the track by ISRC, then by artist and title, and saves it to Liked Songs.' },
    { to: 'lumiere-player', text: 'Gets each song by the LIKE_CAUGHT_SONG broadcast and adds it to its Liked Songs.' },
    { to: 'keeppad', text: 'Shares the microphone with SongCatcher through wakeshare, with SpotTheCam and ServoHop.' },
  ],
  design: {
    scale: [
      "One owner's phone, a few catches a day.",
      'Shazam answered 429 after about 15 queries in 2 minutes, so a catch sends at most 4.',
    ],
    data: [
      'The last 50 songs with their Spotify state sit in shared preferences.',
      'Fingerprints made offline wait beside them for up to a week. The sound itself is not kept.',
    ],
    interfaces: [
      'An HTTPS POST of the fingerprint to amp.shazam.com, and the Spotify Web API with a bearer token.',
      'An explicit broadcast to com.workbenchsoft.lumiere, and the wakeshare bound service for the other wake apps.',
    ],
    reliability: [
      'No network, a 429 or a 5xx keeps the fingerprint, and the next wake or start sends it.',
      'A song is marked saved only once the Spotify library API confirms it, and a button retries the rest.',
    ],
    security: [
      'Login uses PKCE, so no client secret exists. The refresh token sits encrypted with an Android Keystore key.',
      'Only the fingerprint, a few KB of peaks, leaves the phone. The recording goes once the catch ends.',
    ],
    performance: [
      'Queries run on a second thread, so the recording goes on while Shazam answers in 0.3 to 0.6 seconds.',
      'The first query goes out after 3 seconds of music, and most songs match on it.',
    ],
    operations: [
      'CI runs the unit tests and builds the APK as a songcatcher artifact.',
      'SignatureTest holds the fingerprint to the bytes of shazamio, and CatalogTest the 9 string catalogs.',
    ],
    tradeoffs: [
      'The free Shazam endpoint over AudD, a paid token per query, and ShazamKit, which needs an Apple developer fee. The endpoint is not public and MAY change.',
      'A sherpa phrase line over a trained openWakeWord head, so it ships with no training. The head comes later.',
      'A standalone app over a feature inside Lumiere, so a catch works with Lumiere off. One more APK to install.',
    ],
  },
  features: {
    'Wake by voice':
      'KeywordAudio.kt runs sherpa-onnx on the line of keywords.txt. ListenService.kt holds the shared microphone during the catch and beeps through Voice.kt.',
    'Song recognition':
      'Catch.kt feeds 100 ms frames to Signature.kt and sends the fingerprint at 3, 6, 9 and 12 seconds. Shazam.kt reads the title, artist, album and ISRC.',
    'Liked Songs in Spotify and Lumiere':
      'Lumiere.kt sends the broadcast with the artist, title, album, ISRC and time. Spotify.kt searches by ISRC, then by name, and saves to the library.',
    'Spoken answer':
      'Voice.kt plays the beep and speaks through Android text to speech with the music ducked. The switch on the screen turns the voice off.',
    'Offline catches':
      'History.kt keeps the fingerprint and its length. After each catch and at start the service sends the waiting ones and saves each match quietly.',
    'Caught songs':
      'History.kt keeps the last 50 songs and their Spotify state. retryPending saves the waiting songs and reports how many went in.',
    Lyrics:
      'Lyrics.kt asks LRCLIB for the song by artist, title and album, then searches, and keeps the answer in the cache folder. SongSheet in Compose shows a spinner, the words or a retry.',
    'Find tabs in Guitar Upscale':
      'GuitarTabs.kt sends https://guitar-upscale.com/?song=<artist title> as a VIEW intent to the Guitar Upscale package, the link Lumiere sends. The button shows only when that app takes the link.',
    Languages:
      'Each visible and spoken text sits in res/values strings.xml in 9 languages, and CatalogTest checks the keys match.',
    'Shared microphone':
      'WakeShare links the wake apps through a bound service. The app with the lowest package name holds the microphone and sends WAKE to the app whose phrase it heard.',
    'Wake engine':
      'wakeword runs openWakeWord heads on ONNX Runtime with a per owner verifier. The sherpa spotter covers each phrase without a head, as SongCatcher does today.',
  },
};

export default arch;

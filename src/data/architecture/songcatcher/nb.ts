import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Android app i Kotlin uten server. En forgrunnstjeneste hører vekkeordet, telefonen lager Shazam fingeravtrykket selv, og sangen går til Spotify og Lumiere.',
  parts: [
    {
      name: 'ListenService',
      role: 'mikrofontjenesten i forgrunnen: leser rammer på 80 ms, starter en fangst og sier resultatet.',
    },
    { name: 'sherpa-onnx', role: 'nøkkelordsøkeren som hører «Shazam» fra én fraselinje, uten trening.' },
    {
      name: 'Signature.kt',
      role: 'en Kotlin port av shazamio fingeravtrykket: en FFT av 16 kHz mono og topper i 4 bånd.',
    },
    { name: 'Shazam', role: 'gjenkjenningstjenesten, spurt med fingeravtrykket ved 3, 6, 9 og 12 sekunder.' },
    { name: 'Spotify.kt', role: 'PKCE innlogging, søk etter låten med ISRC og lagring i Likte sanger.' },
    {
      name: 'wakeshare',
      role: 'modulen for delt mikrofon i dette repoet, så de andre vekkeappene beholder frasene sine.',
    },
  ],
  flow: [
    'Nøkkelordsøkeren hører «Shazam», tjenesten tar mikrofonen og piper.',
    'Fangsten tar opp og bygger fingeravtrykket mens spørringene går til Shazam i bakgrunnen.',
    'Et treff går til Lumiere med broadcast og til Likte sanger i Spotify.',
    'En stemme sier resultatet, og mikrofonen lytter igjen etter hvert vekkeord.',
  ],
  links: [
    { to: 'Shazam', text: 'Tar imot fingeravtrykket og svarer med tittel, artist, album og ISRC.' },
    { to: 'Spotify', text: 'Finner låten med ISRC, så med artist og tittel, og lagrer den i Likte sanger.' },
    { to: 'lumiere-player', text: 'Får hver sang med broadcast LIKE_CAUGHT_SONG og legger den i sine Likte sanger.' },
    { to: 'keeppad', text: 'Deler mikrofonen med SongCatcher gjennom wakeshare, sammen med SpotTheCam og ServoHop.' },
  ],
  design: {
    scale: [
      'Telefonen til én eier, noen få fangster om dagen.',
      'Shazam svarte 429 etter rundt 15 spørringer på 2 minutter, så en fangst sender høyst 4.',
    ],
    data: [
      'De siste 50 sangene med Spotify status ligger i shared preferences.',
      'Fingeravtrykk laget uten nett venter ved siden av i opptil en uke. Selve lyden lagres ikke.',
    ],
    interfaces: [
      'En HTTPS POST av fingeravtrykket til amp.shazam.com, og Spotify Web API med et bearer token.',
      'En eksplisitt broadcast til com.workbenchsoft.lumiere, og den bundne wakeshare tjenesten for de andre vekkeappene.',
    ],
    reliability: [
      'Uten nett, ved 429 eller 5xx blir fingeravtrykket liggende, og neste vekking eller oppstart sender det.',
      'En sang regnes som lagret først når Spotify biblioteket bekrefter det, og en knapp prøver resten på nytt.',
    ],
    security: [
      'Innloggingen bruker PKCE, så det finnes ingen klienthemmelighet. Refresh token ligger kryptert med en Android Keystore nøkkel.',
      'Bare fingeravtrykket, noen få KB topper, forlater telefonen. Opptaket forsvinner når fangsten er ferdig.',
    ],
    performance: [
      'Spørringene går på en egen tråd, så opptaket fortsetter mens Shazam svarer på 0,3 til 0,6 sekunder.',
      'Første spørring går etter 3 sekunder musikk, og de fleste sangene treffer på den.',
    ],
    operations: [
      'CI kjører enhetstestene og bygger APK som songcatcher artefakt.',
      'SignatureTest holder fingeravtrykket til bytene fra shazamio, og CatalogTest de 9 tekstkatalogene.',
    ],
    tradeoffs: [
      'Det gratis Shazam endepunktet framfor AudD med betalt token per spørring og ShazamKit med Apple utvikleravgift. Endepunktet er ikke offentlig og kan endres.',
      'En sherpa fraselinje framfor et trent openWakeWord hode, så appen kom uten trening. Hodet kommer senere.',
      'En egen app framfor en funksjon i Lumiere, så en fangst virker med Lumiere av. Én APK mer å installere.',
    ],
  },
  features: {
    'Wake by voice':
      'KeywordAudio.kt kjører sherpa-onnx på linjen i keywords.txt. ListenService.kt holder den delte mikrofonen under fangsten og piper gjennom Voice.kt.',
    'Song recognition':
      'Catch.kt gir rammer på 100 ms til Signature.kt og sender fingeravtrykket ved 3, 6, 9 og 12 sekunder. Shazam.kt leser tittel, artist, album og ISRC.',
    'Liked Songs in Spotify and Lumiere':
      'Lumiere.kt sender broadcast med artist, tittel, album, ISRC og tid. Spotify.kt søker med ISRC, så med navn, og lagrer i biblioteket.',
    'Spoken answer':
      'Voice.kt piper og snakker med talesyntesen i Android mens musikken dempes. Bryteren på skjermen slår av stemmen.',
    'Offline catches':
      'History.kt tar vare på fingeravtrykket og lengden. Etter hver fangst og ved oppstart sender tjenesten de ventende og lagrer hvert treff uten stemme.',
    'Caught songs':
      'History.kt tar vare på de siste 50 sangene og Spotify status. retryPending lagrer de ventende sangene og sier hvor mange som kom inn.',
    Lyrics:
      'Lyrics.kt spør LRCLIB etter artist, tittel og album, søker så, og lagrer svaret i hurtigbufferen. SongSheet i Compose viser en spinner, teksten eller et nytt forsøk.',
    'Find tabs in Guitar Upscale':
      'GuitarTabs.kt sender https://guitar-upscale.com/?song=<artist tittel> som en VIEW intent til pakken til Guitar Upscale, samme lenke som Lumiere. Knappen vises bare når appen tar imot lenken.',
    Languages:
      'Hver tekst som vises eller sies ligger i res/values strings.xml på 9 språk, og CatalogTest sjekker nøklene.',
    'Shared microphone':
      'WakeShare kobler vekkeappene gjennom en bundet tjeneste. Appen med lavest pakkenavn holder mikrofonen og sender WAKE til appen som eier frasen den hørte.',
    'Wake engine':
      'wakeword kjører openWakeWord hoder på ONNX Runtime med en kontroll per eier. sherpa søkeren dekker hver frase uten hode, slik SongCatcher gjør nå.',
  },
};

export default arch;

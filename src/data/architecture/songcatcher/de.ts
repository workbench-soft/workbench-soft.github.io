import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Android App in Kotlin ohne Server. Ein Vordergrunddienst hört das Weckwort, das Handy berechnet den Shazam Fingerabdruck selbst, und der Song geht an Spotify und Lumiere.',
  parts: [
    {
      name: 'ListenService',
      role: 'der Mikrofondienst im Vordergrund: liest Blöcke von 80 ms, startet einen Fang und spricht das Ergebnis.',
    },
    { name: 'sherpa-onnx', role: 'der Keyword Spotter, der „Shazam“ aus einer Phrasenzeile hört, ohne Training.' },
    {
      name: 'Signature.kt',
      role: 'eine Kotlin Portierung des shazamio Fingerabdrucks: eine FFT von 16 kHz Mono und Spitzen in 4 Bändern.',
    },
    { name: 'Shazam', role: 'der Erkennungsdienst, gefragt mit dem Fingerabdruck bei 3, 6, 9 und 12 Sekunden.' },
    {
      name: 'Recognizer.kt',
      role: 'wählt die Erkennung: ShazamKit, wenn der Build sein SDK und ein Entwicklertoken hat, sonst den Shazam Endpunkt.',
    },
    { name: 'Spotify.kt', role: 'PKCE Anmeldung, die Suche per ISRC und das Speichern in den Lieblingssongs.' },
    {
      name: 'wakeshare',
      role: 'das geteilte Mikrofonmodul dieses Repos, damit die anderen Weck Apps ihre Phrasen behalten.',
    },
  ],
  flow: [
    'Der Keyword Spotter hört „Shazam“, der Dienst nimmt das Mikrofon und piept.',
    'Der Fang nimmt auf und baut den Fingerabdruck, während Anfragen im Hintergrund an Shazam gehen.',
    'Ein Treffer geht per Broadcast an Lumiere und in die Spotify Lieblingssongs.',
    'Eine Stimme sagt das Ergebnis, und das Mikrofon hört wieder auf jedes Weckwort.',
  ],
  links: [
    { to: 'Shazam', text: 'Nimmt den Fingerabdruck und antwortet mit Titel, Künstler, Album und ISRC.' },
    {
      to: 'ShazamKit',
      text: 'Der offizielle Katalog von Apple, in einem Build mit SDK und Token. Er berechnet seinen eigenen Fingerabdruck und antwortet mit dem Titel.',
    },
    {
      to: 'Spotify',
      text: 'Findet den Titel per ISRC, dann per Künstler und Titel, und speichert ihn in den Lieblingssongs.',
    },
    {
      to: 'lumiere-player',
      text: 'Bekommt jeden Song per Broadcast LIKE_CAUGHT_SONG und legt ihn in seine Lieblingssongs.',
    },
    { to: 'keeppad', text: 'Teilt das Mikrofon über wakeshare mit SongCatcher, SpotTheCam und ServoHop.' },
  ],
  design: {
    scale: [
      'Das Handy eines Besitzers, ein paar Fänge am Tag.',
      'Shazam antwortete nach etwa 15 Anfragen in 2 Minuten mit 429, daher sendet ein Fang höchstens 4.',
    ],
    data: [
      'Die letzten 50 Songs mit ihrem Spotify Stand liegen in den Shared Preferences.',
      'Offline erstellte Fingerabdrücke warten daneben bis zu einer Woche. Der Ton selbst wird nicht gespeichert.',
    ],
    interfaces: [
      'Ein HTTPS POST des Fingerabdrucks an amp.shazam.com und die Spotify Web API mit Bearer Token.',
      'Ein expliziter Broadcast an com.workbenchsoft.lumiere und der gebundene wakeshare Dienst für die anderen Weck Apps.',
    ],
    reliability: [
      'Kein Netz, ein 429 oder ein 5xx behält den Fingerabdruck, und das nächste Wecken oder der nächste Start sendet ihn.',
      'Ein Song gilt erst als gespeichert, wenn die Spotify Bibliothek es bestätigt. Ein Knopf versucht den Rest erneut.',
    ],
    security: [
      'Die Anmeldung nutzt PKCE, also gibt es kein Client Secret. Das Refresh Token liegt verschlüsselt mit einem Android Keystore Schlüssel.',
      'Nur der Fingerabdruck, ein paar KB Spitzen, verlässt das Handy. Die Aufnahme verschwindet nach dem Fang.',
    ],
    performance: [
      'Anfragen laufen in einem zweiten Thread, so läuft die Aufnahme weiter, während Shazam in 0,3 bis 0,6 Sekunden antwortet.',
      'Die erste Anfrage geht nach 3 Sekunden Musik raus, und die meisten Songs treffen schon damit.',
    ],
    operations: [
      'CI führt die Unit Tests aus und baut das APK als songcatcher Artefakt.',
      'SignatureTest hält den Fingerabdruck an den Bytes von shazamio, CatalogTest die 9 Stringkataloge.',
      'scripts/shazamkit-token.ts signiert das ES256 Entwicklertoken, und mise run songcatcher:kit baut das APK mit ShazamKit. Das AAR bleibt außerhalb von git, da Apple keine Lizenz dafür veröffentlicht.',
    ],
    tradeoffs: [
      'Der kostenlose Shazam Endpunkt statt AudD mit bezahltem Token pro Anfrage und ShazamKit mit Apple Entwicklergebühr. Der Endpunkt ist nicht öffentlich und kann sich ändern.',
      'Eine sherpa Phrasenzeile statt eines trainierten openWakeWord Kopfs, so kam die App ohne Training. Der Kopf folgt später.',
      'Eine eigene App statt einer Funktion in Lumiere, so klappt ein Fang auch ohne Lumiere. Ein APK mehr zu installieren.',
      'ShazamKit wartet auf den Apple Entwicklerschlüssel. Ein Build damit fragt den offiziellen Katalog, der legale Weg zu einer kostenpflichtigen Version bei Google Play. CI Builds bleiben beim Endpunkt.',
    ],
  },
  features: {
    'Wake by voice':
      'KeywordAudio.kt lässt sherpa-onnx auf der Zeile aus keywords.txt laufen. ListenService.kt hält während des Fangs das geteilte Mikrofon und piept über Voice.kt.',
    'Song recognition':
      'Catch.kt gibt Blöcke von 100 ms an Signature.kt und sendet den Fingerabdruck bei 3, 6, 9 und 12 Sekunden. Shazam.kt liest Titel, Künstler, Album und ISRC. Mit dem ShazamKit SDK und einem Token nimmt Recognizer.pick() KitRecognizer.kt und sucht im ShazamKit-Katalog.',
    'Liked Songs in Spotify and Lumiere':
      'Lumiere.kt sendet den Broadcast mit Künstler, Titel, Album, ISRC und Zeit. Spotify.kt sucht per ISRC, dann per Name, und speichert in die Bibliothek.',
    'Spoken answer':
      'Voice.kt spielt den Piepton und spricht über die Android Sprachausgabe bei leiserer Musik. Der Schalter auf dem Bildschirm schaltet die Stimme ab.',
    'Offline catches':
      'History.kt behält den Fingerabdruck und seine Länge. Nach jedem Fang und beim Start sendet der Dienst die wartenden und speichert jeden Treffer leise.',
    'Caught songs':
      'History.kt behält die letzten 50 Songs und ihren Spotify Stand. retryPending speichert die wartenden Songs und meldet, wie viele durchgingen.',
    Lyrics:
      'Lyrics.kt fragt LRCLIB nach Künstler, Titel und Album, sucht danach und legt die Antwort im Cache Ordner ab. SongSheet in Compose zeigt einen Ladekreis, den Text oder einen neuen Versuch.',
    'Find tabs in Guitar Upscale':
      'GuitarTabs.kt schickt https://guitar-upscale.com/?song=<Künstler Titel> als VIEW Intent an das Paket von Guitar Upscale, denselben Link wie Lumiere. Der Knopf erscheint nur, wenn die App den Link annimmt.',
    Languages:
      'Jeder sichtbare und gesprochene Text liegt in res/values strings.xml in 9 Sprachen, und CatalogTest prüft die Schlüssel.',
    'Shared microphone':
      'WakeShare verbindet die Weck Apps über einen gebundenen Dienst. Die App mit dem kleinsten Paketnamen hält das Mikrofon und sendet WAKE an die App, deren Phrase sie hörte.',
    'Wake engine':
      'wakeword lässt openWakeWord Köpfe auf ONNX Runtime laufen, mit einem Prüfer pro Besitzer. Der sherpa Spotter deckt jede Phrase ohne Kopf ab, wie heute bei SongCatcher.',
  },
};

export default arch;

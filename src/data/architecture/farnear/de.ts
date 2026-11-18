import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Farnear ist eine React-Web-App, für Android in Kotlin und für das iPhone in Capacitor verpackt. Ein Rust-Worker bei Cloudflare reicht die versiegelten Raumnachrichten weiter, und der Anruf läuft direkt zwischen den Geräten.',
  parts: [
    { name: 'React und Vite', role: 'die Screens, die Raumseite und die Startseite, vorgerendert in 9 Sprachen.' },
    { name: 'WebRTC', role: 'Ton, Video und die Datenkanäle der Tafel, direkt zwischen bis zu 4 Geräten.' },
    {
      name: 'Rust-Worker und Durable Object',
      role: 'ein Objekt pro Raum reicht die versiegelten Nachrichten weiter und gibt Relay-Daten aus.',
    },
    {
      name: 'TURN-Relays',
      role: 'tragen die verschlüsselten Medien, wenn ein direkter Weg zwischen 2 Netzen scheitert.',
    },
    {
      name: 'Tafel-Module',
      role: 'reines TypeScript hält Linien, gelöschte Linien und die Dateiübertragung außerhalb von React.',
    },
    { name: 'Whisper und MediaPipe', role: 'Sprache zu Text und der Videohintergrund, beide auf dem Gerät.' },
    { name: 'Kotlin-Hülle', role: 'die Android-App um die Live-Website, mit AdMob, Play Billing und dem Klingeln.' },
    { name: 'Capacitor und Swift', role: 'die iPhone-App um dieselbe Website, mit StoreKit und dem Teilen-Menü.' },
  ],
  flow: [
    'Ein Raumlink trägt seinen Schlüssel, und die Seite öffnet sich damit.',
    'Die Seite tritt dem Raum auf dem Worker per WebSocket bei.',
    'Die Geräte tauschen versiegelte Angebote und Netzwege über den Worker.',
    'WebRTC verbindet die Geräte direkt oder über ein Relay.',
    'Video, Ton, Tafellinien und Dateien fließen zwischen den Geräten.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Worker, Durable Object und ein TURN-Relay laufen im kostenlosen Tarif.' },
    { to: 'consdr', text: 'Die Android-Hülle überträgt den AdMob- und Play-Billing-Code von Consdr nach Kotlin.' },
    {
      to: 'Google Play',
      text: 'Play Billing verkauft Werbung entfernen und Farnear Pro, AdMob zeigt die Android-Werbung.',
    },
    { to: 'app-updater', text: 'WBS Updater vergleicht die installierte Version mit dem neuesten GitHub-Release.' },
    { to: 'Hugging Face', text: 'Der Protokollant lädt die Whisper-Gewichte einmal von dort.' },
  ],
  design: {
    scale: [
      'Ein Anruf verbindet bis zu 4 Geräte als Mesh, jedes Gerät sendet sein Video an die anderen 3.',
      'Ein Raumobjekt hält höchstens 6 Sockets, 64 KB pro Nachricht und 20 Nachrichten pro Sekunde, sodass eine Flut in einem Raum bleibt.',
      'Worker, Durable Object und Relay laufen im kostenlosen Tarif, da nur kleine versiegelte Nachrichten hindurchgehen.',
    ],
    data: [
      'Keine Konto-Datenbank. Name, Sprache, gespeicherte Räume und Push-Schlüssel liegen in localStorage unter einem versionierten Präfix.',
      'Das Transkript und die Textnachrichten jedes Raums liegen in IndexedDB auf jedem Gerät.',
      'Das Durable Object hält nur die Relay-Quote und eine gecachte Relay-Antwort für 90 Minuten. KV speichert Verbindungsberichte 14 Tage.',
    ],
    interfaces: [
      'Die Signalisierung läuft über einen WebSocket zum Raumobjekt. Jede Nachricht ist ein AES-GCM-Umschlag mit Version, ID und Folgenummer.',
      'Jedes Geräte-Paar öffnet 3 ausgehandelte Datenkanäle: Live-Punkte, Steuernachrichten und Dateiteile.',
    ],
    reliability: [
      'Nach 3 Sekunden Trennung sendet die niedrigere Peer-ID ein ICE-Restart-Angebot, mit Wartezeiten von 12, 18 und 25 Sekunden.',
      'Eine Prüfung liest jede Spur alle 3 Sekunden. Ein Stillstand von 15 Sekunden startet eine ICE-Reparatur, dann den Neuaufbau des Paars.',
      'Die Umschlag-ID verwirft eine Kopie, die Folgenummer eine Wiederholung und die Angebots-ID eine überholte Antwort.',
    ],
    security: [
      'Der Raumschlüssel steht hinter dem # im Link, daher sieht der Worker Chiffretext ohne Namen, Titel oder Angebote.',
      'Medien laufen über DTLS-SRTP zwischen den Geräten, und ein TURN-Relay trägt nur verschlüsselte Pakete.',
      'Die Raumseite lädt kein Werbeskript und trägt noindex, sodass neben dem Schlüssel kein fremder Code läuft.',
    ],
    performance: [
      'Canvas und WebRTC-Aufrufe laufen in einfachen Modulen, und React liest kleine Stores über useSyncExternalStore.',
      'Der Worker cacht Relay-Einstellungen 90 Minuten pro Raum und holt höchstens 20 pro Raum und Tag beim Anbieter.',
      'Whisper läuft auf WebGPU, wo es vorhanden ist, sonst das kleine Modell auf WebAssembly. Große Dateien warten, bis der Kanal leer ist.',
    ],
    operations: [
      'Checks führen bei jedem Push auf main Lint, Tests und Build aus, danach geht die Seite auf GitHub Pages und der Worker über wrangler live.',
      'Das APK wird nur gebaut, wenn sich android/ änderte, da die App die Live-Seite lädt. Eine Web-Änderung bekommt einen Tag ohne schweren Runner.',
      'Ein nächtlicher Lauf um 19:00 Sydney baut das Play-Bundle, wenn sich android/ änderte. Ein fehlgeschlagener Checks-Lauf bricht den Build ab.',
    ],
    tradeoffs: [
      'Ein Mesh direkter Verbindungen statt eines Medienservers: Kein Video wird gehostet, und es kostet nichts. Der Upload wächst mit jeder Person, daher enden Anrufe bei 4.',
      'Ein Wrapper um die Live-Seite statt nativer Screens: Eine Web-Korrektur erscheint ohne Store-Prüfung. Die App braucht das Netz.',
      'Whisper im Browser statt einer Cloud-Spracherkennung, damit der Ton auf den Geräten bleibt. Die erste Nutzung lädt die Modellgewichte.',
    ],
  },
  features: {
    'Calls through a link':
      'Das Ende des Links trägt den Raumschlüssel, also sieht der Worker nur versiegelte Nachrichten. WebRTC verbindet dann bis zu 4 Geräte im Mesh.',
    'Recover a dropped call':
      'Nach einem Abbruch sendet eine Seite ein ICE-Restart-Angebot, bis zu 3 Mal. Eine Warteschlange pro Gegenstelle verhindert den Sieg einer alten Antwort.',
    'Return to a call':
      'Der Browser merkt sich den offenen Anruf 30 Minuten lang, also tritt der Link von selbst wieder bei. Ein Web Lock pro Raum lässt einen neueren Tab den Anruf übernehmen.',
    'Relay for blocked networks':
      'Der Worker gibt jedem Browser kurzlebige TURN-Daten über seinen Socket. ICE versucht zuerst direkte Wege und fällt dann auf ein Relay zurück.',
    'Share the call link':
      'Das Einladungsfeld baut einen Entwurf für Gmail, WhatsApp oder Telegram in der App-Sprache. Andere Apps öffnet das Teilen-Menü des Systems.',
    'Join with a room code':
      'Der Code ist ein Hash des Raumschlüssels. Ein Gerät im Raum antwortet über einen CPace-Handschlag in einer Nostr-Lobby, so liest ein mithörendes Relay den Link nicht.',
    'Saved rooms':
      'Ein Raumlink liegt unter einem Namen im Browserspeicher, und kein Server führt die Liste. Derselbe Schlüssel öffnet jedes Mal denselben Raum.',
    Board:
      'Reine Module halten Linien und gelöschte Linien als 2 Mengen und senden sie über WebRTC-Datenkanäle. Ein Canvas zeichnet sie außerhalb von React.',
    'Share an image or video':
      'Die Datei geht in Stücken über einen eigenen Datenkanal an jede Person. Abspielen, Pause und Springen der teilenden Person laufen über den Steuerkanal.',
    Lessons:
      'Das Gerät des Besitzers sendet Sperre, Restzeit und Zoom über den Steuerkanal. Die Tafel hält die Linien jeder Seite, und die Folien warten in IndexedDB.',
    'Lesson tasks':
      'Frage und Antworten laufen über den Steuerkanal. Das Heft jedes Schülers ist eine eigene Tafel, die nur die Lehrkraft bekommt, und ein gezogenes Wort oder ein Stempel geht als neuere Kopie hinaus.',
    'Contacts and ringing':
      'Das Klingeln ist ein Web-Push, versiegelt für das andere Gerät und über den Worker gesendet. Die Android-App empfängt ihn über die Google Play-Dienste, ohne Firebase.',
    'Ads and remove ads':
      'AdMob zeigt das Android-Banner und die Werbung nach einem Anruf. Play Billing verkauft das Entfernen, und die Raumseite lädt kein Werbeskript.',
    'Farnear Pro':
      'Play Billing verkauft Pro in der Android-App, und Browser bekommen die Werkzeuge gratis. Ein Gerät mit Pro meldet das in seinem versiegelten Hallo, und der Raum öffnet die Tafel.',
    'Android app':
      'Eine Kotlin-WebView-Hülle lädt die Live-Website und reicht Kamera und Mikrofon durch. CI signiert jede APK und legt sie in ein öffentliches GitHub-Release.',
    'iPhone app':
      'Capacitor lädt die Live-Website, und Swift-Gegenstücke der Kotlin-Teile bringen StoreKit, AdMob und das Teilen-Menü. Der Code wartet auf seinen ersten Build.',
    Languages:
      'i18next hält die 9 Kataloge, und eine Wahl stellt jeden Screen sofort um. Die Wahl bleibt auf dem Gerät.',
    'App icon':
      'Ein SVG ist die Quelle für Favicon, Web-Symbole und die Launcher-Größen von Android. Android bekommt dazu ein adaptives und ein Themen-Symbol.',
    'Call stage':
      'Ein Bühnenmodul wählt die große Kachel und den Streifen aus Anheften und geteiltem Bildschirm. Jedes Gerät misst die Stimmen selbst für den Sprecherring.',
    'Share a screen':
      'Jede Verbindung hält von Anfang an einen freien Videoplatz, also braucht ein geteilter Bildschirm kein neues Angebot. Die Tafel zeichnet darüber.',
    'Take a photo':
      'modern-screenshot hält den sichtbaren Anruf als PNG fest, mit Video und Tafel. Die Android-App speichert es unter Downloads, und kein Server bekommt es.',
    'Your name':
      'Der Name bleibt im Browserspeicher und geht im versiegelten Hallo an die anderen. Eine Änderung zeigt sich ab dem nächsten Anruf.',
    'Video background':
      'MediaPipe findet die Person auf dem Gerät, und ein Canvas zeichnet sie über eine Unschärfe oder ein Bild. Diese Canvas-Spur ersetzt die Kamera vor dem Senden.',
    'Call transcript and summary':
      'Ein Gerät lässt Whisper im Browser laufen, auf WebGPU wo möglich. Die Zeilen gehen über einen Datenkanal an die anderen und bleiben in IndexedDB. Der eingebaute Summarizer von Chrome schreibt die Zusammenfassung.',
    'Recover stalled media':
      'Eine Prüfung liest alle 3 Sekunden die ankommenden Bytes und Frames jeder Spur. Ein Stillstand von 15 Sekunden startet eine ICE-Reparatur, dann einen Neuaufbau dieses Paars.',
    'Shared call titles':
      'Der Titel geht mit einem Versionszähler in der versiegelten Signalisierung. Auf jedem Gerät gewinnt die neueste Version, und der Worker kann ihn nicht lesen.',
    'Shared documents on the board':
      'PDF.js malt eine PDF-Seite und ein PowerPoint-Renderer eine Folie auf dem Gerät. Blättern und Entfernen laufen über den Steuerkanal.',
    'Board text':
      'Ein Text ist eine Board-Linie mit Wörtern und einem Punkt. So wird er wie Tinte synchronisiert, radiert und rückgängig gemacht. Die Schrifthöhe ist ein Anteil der Board-Höhe, also bleibt er bei jedem Zoom an seinem Platz.',
    'Board stamps':
      'Ein Stempel ist eine Tafellinie mit einem Punkt und einer Art, daher synchronisiert, radiert und widerruft er sich wie Tinte. Seine Größe ist ein Anteil der Tafelhöhe.',
    'Board pages':
      'Eine leere Tafel nutzt die Seiten-ID blank, und jede Seitennachricht trägt die höchste Seite, so erfährt ein Nachzügler die Seitenzahl. Linien behalten ihre Seite wie auf Folien.',
    Colouring:
      'Die Bilder sind geschlossene SVG-Pfade, für Farnear gezeichnet. Das Bild jeder Seite und die Farbe jeder Fläche laufen über den Steuerkanal, der letzte Stand gewinnt.',
    'Noughts and crosses':
      'Jeder Zug trägt seine Nummer, so fällt ein Zug außer der Reihe oder auf ein belegtes Feld auf jedem Gerät weg. Der Spielstand geht an jeden, der einen Kanal öffnet.',
    'YouTube together':
      'Die YouTube IFrame Player API lädt erst, wenn jemand einen Link teilt, vom Host ohne Cookies. Abspielen, Pause und Springen gehen als ein Stand raus, der letzte gewinnt.',
    'Contacts and rooms':
      'Kontakte und Räume teilen eine gespeicherte Liste im Browser, jeder Eintrag mit seiner Art. Ein Kontaktname bleibt auf dem Gerät, ein Raumtitel wird abgeglichen.',
    'Search and share preview':
      'Ein Vite-Plugin rendert die Startseite beim Build in jeder der 9 Sprachen vor. Ein anderes schreibt die Sitemap, und jede Seite trägt ihre Vorschau-Tags.',
    'Messages in a call':
      'Eine Zeile geht versiegelt über die Raumsignalisierung, getrennt vom Videoweg. Jedes Gerät hält sie in IndexedDB und tauscht fehlende Zeilen beim nächsten Anruf.',
    'Reactions and raised hands':
      'Jede Reaktion geht als versiegelte Nachricht über die Signalisierung des Raums, höchstens 3 pro Sekunde. Eine gehobene Hand steckt im Teilnehmerstatus, den die Teilnehmerliste alle 5 Sekunden wiederholt, so sehen sie auch Nachzügler. CSS-Keyframes zeichnen das Aufsteigen und die Funken.',
    'Button hints':
      'Ein gemeinsames Modul zeigt die Blase nach einem Hover oder langem Drücken. Langes Drücken zeigt den Namen und löst die Taste nicht aus.',
    'Close Farnear and take back its permissions':
      'Die Seite beendet Anruf und Klingeln und bittet dann die Android-Hülle, ihre Rechte abzugeben und sich zu schließen. Ein Browser bekommt die Schritte zum Zurücksetzen von Hand.',
  },
};

export default arch;

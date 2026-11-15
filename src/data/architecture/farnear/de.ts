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
    'Saved rooms':
      'Ein Raumlink liegt unter einem Namen im Browserspeicher, und kein Server führt die Liste. Derselbe Schlüssel öffnet jedes Mal denselben Raum.',
    Board:
      'Reine Module halten Linien und gelöschte Linien als 2 Mengen und senden sie über WebRTC-Datenkanäle. Ein Canvas zeichnet sie außerhalb von React.',
    'Share an image or video':
      'Die Datei geht in Stücken über einen eigenen Datenkanal an jede Person. Abspielen, Pause und Springen der teilenden Person laufen über den Steuerkanal.',
    'Lessons (planned)':
      'Eine Spezifikation plant Folien, die vor der Stunde auf jedes Gerät gehen, mit den Tafelwerkzeugen auf jeder Folie. Die App hat noch keinen Code für Stunden.',
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
    'Contacts and rooms':
      'Kontakte und Räume teilen eine gespeicherte Liste im Browser, jeder Eintrag mit seiner Art. Ein Kontaktname bleibt auf dem Gerät, ein Raumtitel wird abgeglichen.',
    'Search and share preview':
      'Ein Vite-Plugin rendert die Startseite beim Build in jeder der 9 Sprachen vor. Ein anderes schreibt die Sitemap, und jede Seite trägt ihre Vorschau-Tags.',
    'Messages in a call':
      'Eine Zeile geht versiegelt über die Raumsignalisierung, getrennt vom Videoweg. Jedes Gerät hält sie in IndexedDB und tauscht fehlende Zeilen beim nächsten Anruf.',
    'Button hints':
      'Ein gemeinsames Modul zeigt die Blase nach einem Hover oder langem Drücken. Langes Drücken zeigt den Namen und löst die Taste nicht aus.',
    'Close Farnear and take back its permissions':
      'Die Seite beendet Anruf und Klingeln und bittet dann die Android-Hülle, ihre Rechte abzugeben und sich zu schließen. Ein Browser bekommt die Schritte zum Zurücksetzen von Hand.',
  },
};

export default arch;

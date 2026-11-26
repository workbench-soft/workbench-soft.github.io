import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Kotlin-App für Android-Handys und Google TV spielt Dateien vom Handy, von einem USB-Stick oder einer SMB-Freigabe mit libVLC. Die Bibliotheken und die Stellen bleiben in SQLite auf dem Gerät, und die APK von GitHub bringt Online-Musik dazu.',
  parts: [
    {
      name: 'Kotlin und Android Views',
      role: 'die Bildschirme für die Fernbedienung und für Touch, in einer App für Handy und TV.',
    },
    { name: 'libVLC', role: 'spielt Video und Musik, liest die Tags und durchsucht die SMB-Freigaben.' },
    {
      name: 'SQLite',
      role: 'die Positionen, die Bibliotheken für Musik, Bücher und Videos und die Stelle in jedem Buch.',
    },
    { name: 'Media3', role: 'die Musiksitzung mit Benachrichtigung, Sperrbildschirm und den Bluetooth-Tasten.' },
    { name: 'WorkManager', role: 'durchsucht die Ordner für Musik, Bücher und Videos im Hintergrund.' },
    { name: 'sherpa-onnx', role: 'der Schlüsselwort-Erkenner, der Hey Lumi auf dem Handy hört.' },
    {
      name: 'Chaquopy und yt-dlp',
      role: 'das Online-Modul mit Namen von MusicBrainz und Ton von YouTube, nur in der GitHub-APK.',
    },
    {
      name: 'Google Play Billing und AdMob',
      role: 'die Käufe Pro und Werbung entfernen und das Banner auf dem Handy.',
    },
  ],
  flow: [
    'Die Person fügt einen Handyordner, einen USB-Stick oder eine SMB-Freigabe hinzu.',
    'Ein Scan im Hintergrund schreibt Namen und Tags in SQLite auf dem Gerät.',
    'Der Startbildschirm zeigt die Dateien, die Songs, die Bücher und die Videos.',
    'Ein Tippen, eine Taste der Fernbedienung oder ein Sprachbefehl wählt, was spielt.',
    'libVLC spielt es ab, und die App speichert dabei die Stelle.',
  ],
  links: [
    { to: 'guitar-upscale', text: 'Tabs finden öffnet Guitar Upscale beim laufenden Song, über einen Android-Link.' },
    { to: 'spotthecam', text: 'Hey Lumi teilt das Mikrofon mit Hey Spot, so gehen beide Sätze zugleich.' },
    {
      to: 'keeppad',
      text: 'Hey Lumi nutzt dasselbe Schlüsselwort-Modell wie Hey Keep und teilt das Mikrofon mit ihm.',
    },
    { to: 'GitHub', text: 'Die APK und ihre Updates kommen aus den Releases auf GitHub.' },
    { to: 'Google Play', text: 'Die Play-Version, ihre Updates und die Käufe Pro und Werbung entfernen.' },
  ],
  design: {
    scale: [
      'Ein APK für Android-Handys und Google TV, eine Person pro Installation. Die Bibliotheken werden auf dem Gerät indiziert.',
      'Der Videoscan liest nur Namen, ohne Tags, sodass ein großes Laufwerk ohne Öffnen jeder Datei indiziert wird.',
      'Zwei ABIs werden ausgeliefert, armeabi-v7a und arm64-v8a, damit das APK mit libVLC klein bleibt.',
    ],
    data: [
      'SQLite auf dem Gerät: positions.db, library.db, books.db, book-places.db und videos.db.',
      'positions.db schlüsselt eine Zeile nach der URI ohne NAS-Login, eine USB-Datei zusätzlich nach Name und Größe.',
      'Das Android-Backup behält Positionen und Buchstellen, lässt aber nas.xml und die Datenbanken mit NAS-Login weg.',
    ],
    interfaces: [
      'libVLC liest file://, content:// und smb://. Ein Media3 MediaSessionService liefert die Benachrichtigung, den Sperrbildschirm und die Bluetooth-Tasten.',
      'Sprache nutzt den SpeechRecognizer auf dem Gerät, und sherpa-onnx erkennt die Weckphrase Hey Lumi. Guitar Upscale öffnet sich über einen Android-VIEW-Link.',
      'Das Online-Modul ruft MusicBrainz und Wikidata auf, YouTube über yt-dlp, nur im GitHub-APK.',
    ],
    reliability: [
      'Der Player speichert die Position alle 5 Sekunden, bei Pause, Stopp und Beenden, ein Absturz kostet also Sekunden.',
      'ScanWorker läuft über WorkManager bei einem neuen Ordner, beim Start und täglich im WLAN, die Abfragen laufen langsam in einem Worker-Thread.',
      'Ein Bluetooth-Gerät, das nichts abspielt, schickt den Ton zurück an den Lautsprecher.',
    ],
    security: [
      'Kein Konto und kein eigener Server. Namen und Tags bleiben auf dem Gerät.',
      'Die NAS-Liste mit Passwörtern liegt in nas.xml, die das Android-Backup auslässt.',
      'SponsorBlock bekommt nur ein Hash-Präfix der YouTube-ID. Das Weck-Mikrofon läuft als Vordergrunddienst.',
    ],
    performance: [
      'libVLC spielt jede Datei direkt, und ein Media3-Player umhüllt es für Audio, ein Motor bedient also Video und Musik.',
      'LoudnessGate gibt dem Schlüsselwortmodell nur laute Frames und die halbe Sekunde davor, ein ruhiger Raum überspringt es.',
      'Cover werden in ihrer Größe mit Cache dekodiert, und der Wortindex führt jedes Wort einmal mit seinen Büchern.',
    ],
    operations: [
      'Ein Push auf main startet Checks und Release nebeneinander. Release signiert das APK und veröffentlicht es, sobald Checks bestehen.',
      'Jeder Build-Runner behält seinen Gradle-Zustand, Gradle baut also nur Geändertes neu. Die Release-Liste behält die neuesten 3.',
      'Das APK aktualisiert sich beim Start aus GitHub Releases. Das Play-Bundle lässt den Updater und das Online-Modul weg.',
    ],
    tradeoffs: [
      'Natives Kotlin mit einfachen Views statt Expo, weil der Player eine libVLC-View ist, die Fernbedienungstasten und Fokus steuern.',
      'libVLC unverändert statt Media3 ExoPlayer, für MKV-Spuren, SMB-Browsing und Windows-1251-Untertitel, um den Preis eines LGPL-Hinweises und eines großen APK.',
      'SMB über libVLC statt einer eigenen Bibliothek, also ohne zusätzliche Abhängigkeit, aber ein NAS-Listing liefert keine Dateigröße.',
      'Ein Pro-Kauf statt eines Abos pro App, damit eine Prüfung, Entitled.pro(), jeden Bildschirm schaltet.',
    ],
  },
  features: {
    'Direct folder browsing and playback':
      'USB-Ordner öffnen sich über das Dateisystem von Android, und libVLC durchsucht die SMB-Freigaben. Die gespeicherte NAS-Liste bleibt auf dem Gerät und außerhalb der Android-Sicherung.',
    Resume:
      'Der Player speichert jede Position im Abstand von 5 Sekunden und beim Beenden in SQLite. Die Dateiliste liest dieselbe Tabelle für den Balken unter jeder Datei.',
    'Subtitles and audio':
      'libVLC listet die eingebetteten Spuren und die Untertiteldateien im Ordner. Text-Untertitel gelten als UTF-8 und sonst als Windows-1251.',
    Controls:
      'Der Player steuert in libVLC die Sprünge und das Tempo. Ein Warteschlangen-Modul hält Reihenfolge, Zufall und Wiederholung.',
    Updates:
      'Beim Start liest die APK das neueste Release auf GitHub und lädt eine neuere APK. Der Android-Installer fragt dann nach der Bestätigung.',
    Ads: 'AdMob zeigt das Banner auf dem Handy nach Googles Einwilligungsformular. Eine Prüfung blendet es nach dem Kauf von Werbung entfernen oder Pro aus, und ein TV zeigt keins.',
    Languages:
      'Android-String-Ressourcen halten die 9 Sprachen. Die Sprach-API von AppCompat setzt die Wahl aus den Einstellungen oder die Gerätesprache um.',
    'Touch on a phone':
      'Eine Gestenebene über dem Video macht aus Tippen und Wischen Sprünge, Suchen, Helligkeit und Lautstärke. Die TV-Fernbedienung übergeht diese Ebene.',
    'Panel buttons':
      'Die gewählte Auswahl bleibt in den Player-Einstellungen auf dem Gerät. Der Player baut daraus seine Tastenreihe, und libVLC skaliert das Bild.',
    'Sponsor skip':
      'Der Player liest die SponsorBlock-Kapitel in der Datei oder fragt die SponsorBlock-API über einen Hash der Video-ID. libVLC springt dann über jedes Segment.',
    'Phone speaker':
      'Eine stille Tonspur mit dem eingebauten Lautsprecher als Ziel zieht den Ton von libVLC mit. Eine Prüfung jede Sekunde holt den Ton von stummem Bluetooth zurück.',
    Look: 'Schlichte Android Views aus Code teilen einen Satz aus Farben, Schrift und Fokuspille. Der Schriftzug nutzt Instrument Serif.',
    'Music library':
      'Ein WorkManager-Job geht jeden Ordner durch und liest die Tags über libVLC. Die Songs landen in SQLite auf dem Gerät und außerhalb der Android-Sicherung.',
    'Music player':
      'Eine Media3-Sitzung spielt die Songs über libVLC ohne Video. Sie zeichnet die Benachrichtigung und den Sperrbildschirm, und die Leiste folgt ihr auf jedem Bildschirm.',
    'MusicBrainz and YouTube':
      'MusicBrainz nennt Songs, Künstler und Alben. yt-dlp läuft in Python über Chaquopy und holt den Ton von YouTube, im APK von GitHub.',
    Audiobooks:
      'Ein Scan fasst die Audiodateien zu Büchern zusammen, nach OPF-Datei, Tags und Ordnernamen. Wikidata nennt den Autor, und SQLite hält die Stelle in jedem Buch.',
    'Video library':
      'Der Scan speichert nur den Pfad jedes Videos in SQLite. Ein Parser liest Serie, Staffel und Folge aus den Namen, und Wikidata ergänzt weitere Namen. Das Handy liest und schreibt die Filmdaten des LG-Fernsehers in einer Datei neben den Filmen auf dem NAS, über SMB mit smbj.',
    'Find tabs':
      'Die Player-Leiste schickt einen Android-Link mit Künstler und Titel an Guitar Upscale. Die Taste erscheint nur, wenn Android diese App findet.',
    'Google Play build':
      'Ein zweiter Build-Typ lässt den Selbst-Updater, den vollen Dateizugriff und das Online-Modul weg. Google Play aktualisiert ihn dann.',
    'Voice commands':
      'sherpa-onnx hört Hey Lumi auf dem Handy, und die Spracherkennung von Android nimmt den Befehl. Ein Abgleich findet Song, Buch oder Video, und Sprachausgabe antwortet.',
    'Online music':
      'Das Online-Modul startet yt-dlp in Python über Chaquopy. MusicBrainz nennt die Songs und YouTube liefert den Ton, in der GitHub-APK auf einem 64-Bit-Handy.',
    'Lumiere Pro':
      'Google Play Billing verkauft ein Pro-Produkt, und die App fragt Google Play bei jedem Start. Eine Prüfung in der App öffnet die Sprachfunktionen und blendet das Banner aus.',
    'LG webOS app':
      'Eine Webseite in TypeScript spielt über den Player des Fernsehers. Ein Node-Dienst im selben webOS-Paket liest USB-Sticks und das NAS über WebDAV und streamt die Dateien zur Seite.',
    'Optional library setup and NAS finder':
      'NasFind klopft im /24-Netz des Fernsehers an Port 445 und fragt per NetBIOS nach jedem Namen. Nach der Anmeldung listet libVLC die Freigaben, und die Mediathek-Ordner speichern die Art jedes Ordners in SharedPreferences.',
    'Windows and Mac app':
      'Electron führt die webOS-Seite und ihren Node-Dienst unverändert aus. Die Seite lädt von ihrem eigenen Ursprung lumiere://, und der Dienst zeigt den persönlichen Ordner und die Laufwerke statt USB-Sticks.',
    'Continue Watching':
      'Beide Apps bauen die Zeilen aus den gespeicherten Positionen, die neuesten oben, bis zu 20. Ab 95 % gilt eine Position als gesehen, und nach einer gesehenen Folge kommt die nächste.',
    'Film look':
      'Eine Kornschicht über dem Video belastet den Decoder nicht, daher bleiben HDR und Hardware-Dekodierung. Ab Android 12 gibt der Player die Bildrate des Films an Surface.setFrameRate.',
    'Caught songs':
      'Ein Receiver im GitHub-APK prüft, dass SongCatcher den Fang geschickt hat, und speichert ihn in liked-songs.db. Ein Song aus den Ordnern verweist auf seine Datei, ein anderer behält seine YouTube-Adresse.',
    'Titles of films, series and books':
      'Die Filmsuche holt aus Wikidata den russischen und englischen Titel und das Jahr. Eine Funktion pro App baut die Zeile: Titles.label auf Android, titleLine auf webOS.',
    'Library scan':
      'Jeder Bibliotheksordner ist ein Job mit einer Phase. Eine Funktion rechnet aus den Jobs den fertigen Anteil und die Restzeit: ScanProgress.kt auf Android und scan-progress.ts auf webOS, mit denselben Tests. Ordner werden nach Gerät gruppiert, und 3 Gruppen laufen gleichzeitig.',
  },
};

export default arch;

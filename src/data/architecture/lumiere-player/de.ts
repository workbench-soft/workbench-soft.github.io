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
  features: {
    Sources:
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
      'Der Scan speichert nur den Pfad jedes Videos in SQLite. Ein Parser liest Serie, Staffel und Folge aus den Namen, und Wikidata ergänzt weitere Namen.',
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
  },
};

export default arch;

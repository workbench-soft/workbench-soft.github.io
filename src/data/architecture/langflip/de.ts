import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Langflip ist ein Rust-Programm für Windows und macOS, ohne Server. Ein Kern-Crate entscheidet über jedes Wort, und eine dünne Schicht pro System fängt die Tasten ab und tippt die Korrektur.',
  parts: [
    {
      name: 'langflip-core',
      role: 'das Rust-Crate mit den 2 Layouts, dem Sprachmodell und der Entscheidung über Behalten oder Korrigieren.',
    },
    {
      name: 'Windows-Hooks',
      role: 'Low-Level-Hooks für Tastatur und Maus sehen jede Taste in jeder App und senden die Korrektur als Unicode.',
    },
    { name: 'Event Tap unter macOS', role: 'dieselbe Aufgabe auf dem Mac, mit den Eingabequellen für das Layout.' },
    {
      name: 'Sprachmodell',
      role: 'Werte für Buchstaben-Tripel und ein Wörterbuch pro Sprache, aus wordfreq gebaut und in die exe eingebettet.',
    },
    { name: 'tray-icon', role: 'das Tray-Symbol mit dem aktuellen Layout und sein Menü auf beiden Systemen.' },
    { name: 'rust-i18n', role: 'der Text von Menü und Tooltip in 9 Sprachen, fest im Programm.' },
    {
      name: 'ureq und self-replace',
      role: 'die Update-Prüfung bei GitHub Releases und der Austausch der laufenden exe.',
    },
  ],
  flow: [
    'Ein Low-Level-Hook fängt jede Taste in der App im Vordergrund ab.',
    'Der Hook ordnet die physische Taste einer Position zu, egal welches Layout aktiv ist.',
    'Der Kern bewertet die Buchstaben in beiden Layouts mit dem Modell.',
    'Gewinnt das andere Layout, schluckt der Hook die Taste.',
    'Langflip löscht das Wort, tippt es im anderen Layout und wechselt das Layout.',
  ],
  links: [
    {
      to: 'GitHub Releases',
      text: 'Dort liegt die exe für Windows. Langflip sucht einmal am Tag nach einer neueren und sendet nur seine Version.',
    },
  ],
  design: {
    scale: [
      'Eine Person pro PC oder Mac. Der getippte Text bleibt auf dem Rechner, und die ganze Installation ist eine exe.',
      'Das Modell deckt 2 Sprachen ab, Englisch und Russisch, je mit einem Wörterbuch der 100.000 häufigsten Wörter und einer Tabelle von Buchstabentripeln.',
      'Es gibt nur 2 feste Layouts, US QWERTY und russisch ЙЦУКЕН. Der Hook muss in seinem Callback antworten, daher dauert eine Entscheidung Mikrosekunden.',
    ],
    data: [
      'Einstellungen liegen in settings.toml im App-Datenordner. Die Modelldatei ist in die Binärdatei eingebaut.',
      'Die Modelldatei beginnt mit dem Magic LFM1, dann folgen je Sprache ein Alphabet, Log-Wahrscheinlichkeiten der Buchstabentripel als f32 und ein Wörterbuch.',
      'Das Windows-Log hält Tastenzahlen, App-Namen und Entscheidungen fest, ohne Buchstaben, in 1-MB-Dateien, die zu langflip.old.log wechseln.',
    ],
    interfaces: [
      'Die Kern-Crate nimmt Tastenpositionen und das genutzte Layout und liefert eine Korrektur oder keine. Beide Systemschichten rufen sie auf.',
      'Windows nutzt die Hooks WH_KEYBOARD_LL und WH_MOUSE_LL, SendInput für die Korrektur und WM_INPUTLANGCHANGEREQUEST für das Layout.',
      'macOS nutzt einen Sitzungs-CGEventTap, CGEvent-Posts für die Korrektur und Text Input Sources für das Layout.',
      'Die Update-Prüfung liest einmal am Tag die GitHub-Releases-API nach langflip-v*-Tags und sendet nur ihre Version.',
    ],
    reliability: [
      'Ereignisse der Korrektur tragen ein Langflip-Tag, daher lässt der Hook sie durch. Tasten während einer Korrektur warten und laufen nach einer Endmarke erneut.',
      'Gehaltene Tasten warten bis zu 500 ms, bis das Fenster das neue Layout übernimmt, und eine hängende Korrektur gibt sie nach 1 Sekunde frei.',
      'Rückgängig tippt das Wort wie getippt zurück, und ein zweites Rückgängig nimmt es in die Behalten-Liste auf.',
      'Der Autostart ist ein Run-Key-Eintrag, gestützt durch eine Aufgabe der Aufgabenplanung, falls der Explorer den Run-Key überspringt.',
    ],
    security: [
      'Kein Server und kein Konto. Der einzige Netzaufruf ist die Update-Prüfung, und sie trägt keinen getippten Text.',
      'Passwortfelder und Admin-Fenster werden übersprungen, und die Einstellungsdatei listet weitere Apps zum Überspringen.',
      'Das Log enthält keine Buchstaben. Fenster mit erhöhten Rechten bleiben außer Reichweite, außer Langflip läuft als Admin, und macOS verlangt Zugriff auf Bedienungshilfen und Eingabeüberwachung.',
      'Der Austausch beim Update prüft HTTPS und die Dateigröße, ohne Signatur, und die exe ist nicht signiert.',
    ],
    performance: [
      'Der Kern bewertet ein Wort mit einem Tabellenzugriff in Mikrosekunden, ohne Pause durch einen Garbage Collector im Hook-Callback.',
      'Ab dem 4. Buchstaben prüft die Engine das Wort beim Tippen, daher kommt die Korrektur vor dem Wortende.',
      'Das Modell ist eingebettet, und die sortierte Wortliste lädt in etwa 20 ms. Eine Menge aller Wortanfänge brauchte bei jedem Start 0,4 s und verlor.',
      'caret.rs liest bis zu 40 Zeichen vor dem Cursor über UI Automation, in einem eigenen Thread, 40 ms nach einem Klick.',
    ],
    operations: [
      'mise run lint umfasst rustfmt, clippy, cargo shear, ruff, shellcheck und actionlint, und CI prüft den macOS-Build von Windows aus.',
      'mise run eval misst Fehlkorrekturen und Auslassungen an 10.000 Wörterbuchwörtern und 10.000 selteneren Wörtern je Sprache.',
      'Ein Release-Workflow veröffentlicht langflip.exe auf GitHub Releases mit einer Datumsversion, die in LANGFLIP_VERSION übergeben wird.',
      'Die App prüft auf ein neueres Release, fragt zuerst, und self-replace tauscht die laufende exe aus. mise run install braucht keine Admin-Rechte.',
    ],
    tradeoffs: [
      'Eine Rust-Kern-Crate und eine dünne Schicht je System statt einer gemischten Crate, damit Kerntests auf jedem OS laufen, auf Kosten jeder Korrektur in doppelter Ausführung.',
      'Low-Level-Hooks im eigenen Prozess von Langflip statt einer Hook-DLL, damit kein Code in fremde Apps geladen wird, doch Fenster mit erhöhten Rechten bleiben außer Reichweite.',
      'Buchstabentripel plus Wörterbuch statt nur eines Wörterbuchs, damit unbekannte Wörter erkannt werden, doch ein seltenes Wort kann früh umschalten, und Rückgängig stellt es wieder her.',
      'Statische Tabellen für 2 Layouts statt jedes Layout aus dem System zu lesen, damit Windows und macOS dieselben Buchstaben liefern, doch andere Layouts funktionieren nicht.',
    ],
  },
  features: {
    'Fix the layout of a word':
      'Ab dem 4. Buchstaben vergleicht der Kern die getippten Buchstaben mit denselben Tasten im anderen Layout. Das Modell bewertet beide, und ein klarer Sieger wird neu getippt.',
    'Short words':
      'Bei 1 bis 3 Buchstaben ist ein Wert zu unsicher. Der Kern prüft daher nur das Wörterbuch und wartet auf Leertaste, Enter oder Tab.',
    'Digits kept':
      'Eine Ziffer tippt sich in beiden Layouts gleich, daher hält der Wortpuffer sie an ihrem Platz. Das Wörterbuch kennt Wörter mit Ziffern wie mp3.',
    'Undo a fix':
      'Der Kern merkt sich das letzte Wort so wie getippt. Rückgängig tippt es zurück, und ein zweites Mal setzt das Wort auf die Ausnahmeliste.',
    'Convert by hand':
      'Der Kern hält das aktuelle oder das letzte Wort. Die Tastenkombination setzt es ohne Prüfung ins andere Layout.',
    'Skip apps and fields':
      'Die Systemschicht vergleicht die App im Vordergrund mit der Liste in der Einstellungsdatei. Passwortfelder und Admin-Fenster erkennt sie an Signalen des Systems.',
    'The current layout on the icon':
      'Die Windows-Schicht folgt Fenster- und Fokuswechseln und liest das Layout des Fensters im Vordergrund. tray-icon zeichnet EN oder RU auf das Symbol.',
    'Pause with a click':
      'Ein Klick schaltet die Korrektur aus, und der Hook lässt jede Taste durch. Das Tray zeigt das Symbol grau.',
    'Switch the layout with a double click':
      'Unter Windows holt Langflip das vorige Fenster zurück und bittet es um den Layoutwechsel. Auf dem Mac wechselt es die Eingabequelle.',
    'Start at login':
      'Unter Windows startet ein Eintrag im Run-Schlüssel Langflip, und eine Aufgabe in der Aufgabenplanung sichert ihn ab. Auf dem Mac erledigt das ein Launch Agent.',
    'Settings file':
      'Eine TOML-Datei im App-Datenordner hält den Schalter, die ausgenommenen Apps, die behaltenen Wörter und die Menüsprache. Langflip liest sie beim nächsten Fensterwechsel neu.',
    'Go on with a word':
      'Unter Windows liest UI Automation nach einem Klick oder Feldwechsel das Wort vor dem Cursor. Der Kern wertet neue Buchstaben als Rest dieses Worts.',
    'The app icon':
      'Ein einziges SVG ist die Quelle des Symbols. Der Build schreibt es in die exe, und das Installationsskript setzt es auf die Verknüpfungen.',
    'Install on Windows':
      'Das Skript baut die exe mit Cargo und kopiert sie in den Programmordner des Nutzers. Verknüpfungen und Eintrag in den Einstellungen kommen ohne Adminrechte dazu.',
    'Tray menu':
      'tray-icon zeichnet dasselbe Menü unter Windows und macOS. rust-i18n liefert den Text in 9 Sprachen, nach Systemsprache oder Auswahl.',
    'Decision log':
      'Die Windows-Schicht schreibt jede Entscheidung in eine Logdatei: Tastenzahl, App und Grund. Buchstaben bleiben draußen, und bei 1 MB beginnt eine neue Datei.',
    'Update from GitHub':
      'Ein Thread fragt einmal am Tag über ureq die Release-Liste von GitHub ab. Nach einem Klick prüft er Größe und SHA-256, dann tauscht self-replace die laufende exe.',
    'Welcome on the first start':
      'Beim ersten Start unter Windows zeigt ein Aufgabendialog die Tasten, in einem eigenen Thread, damit die Hooks ihre Nachrichten behalten. Der Tooltip nennt das Layout für Screenreader.',
  },
};

export default arch;

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
  },
};

export default arch;

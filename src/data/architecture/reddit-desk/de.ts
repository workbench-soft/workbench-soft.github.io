import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Tauri-2-App für Windows mit einem Rust-Kern und einem React-Fenster. Der Kern startet Claude Code für Threads und Entwürfe und öffnet Chrome zum Posten.',
  parts: [
    { name: 'Tauri 2', role: 'die Desktop-Hülle, die Fenster und Rust-Kern in einen Installer packt.' },
    { name: 'Rust-Kern', role: 'startet Claude Code und Chrome, hält die JSON-Dateien und die Tempolimits.' },
    { name: 'React und Vite', role: 'das Fenster mit den Tabs Comments und Posts und ihren Karten.' },
    {
      name: 'Claude Code',
      role: 'liest das Repo, holt Threads über einen Reddit-MCP-Server und schreibt die Entwürfe.',
    },
    {
      name: 'chromiumoxide',
      role: 'steuert das eigene Chrome-Fenster der App, wenn die Person Post it for me drückt.',
    },
    { name: 'axum', role: 'liefert dasselbe Fenster über lokales HTTP, damit Archon es einrahmen kann.' },
    { name: 'i18next', role: 'die 9 Sprachkataloge des Fensters.' },
    { name: 'Tauri-Updater-Plugin', role: 'findet einen signierten neuen Build und installiert ihn.' },
  ],
  flow: [
    'Die Person wählt ein Repo und drückt Find.',
    'Der Kern startet Claude Code in diesem Repo mit dem Skill reddit-comments.',
    'Claude liest heiße Threads über den Reddit-Server und schreibt Entwürfe in eine Datei.',
    'Der Kern behält 6 Entwürfe und zeigt sie als Karten.',
    'Die Person öffnet eine Karte, und Chrome bekommt den Thread mit dem Entwurf.',
  ],
  links: [
    { to: 'agent-skills', text: 'Sein Skill reddit-comments wählt die Threads und gibt jedem Kommentar seinen Ton.' },
    { to: 'archon', text: 'Der Reddit-Tab von Archon rahmt das Fenster ein und startet die App, wenn sie zu ist.' },
    { to: 'Reddit', text: 'Claude liest Threads über einen MCP-Server, und die Person postet in Chrome.' },
    {
      to: 'GitHub Releases',
      text: 'Installer und signierte Update-Datei liegen in einem Release des öffentlichen Website-Repos.',
    },
  ],
  design: {
    scale: [
      'Eine Person an einem Windows-PC, und Grenzen halten es klein: 6 Kommentarentwürfe, 3 Beitragsentwürfe und 3 gepostete Kommentare pro Stunde.',
      'Ein Find dauert 1 bis 5 Minuten, weil Claude Code die Threads selbst liest.',
    ],
    data: [
      'Einfache JSON-Dateien im Datenordner der App halten die Einstellungen, die Warteschlange, die Beitragskarten und beide Verläufe.',
      'history.json bewahrt geposte und übersprungene Threads mit Datum auf, und das nächste Find überspringt sie. opens.json hält die Zeit jedes geposteten Kommentars der letzten 24 Stunden.',
    ],
    interfaces: [
      'Der Kern startet claude -p mit stream-json und macht aus jeder Ausgabezeile ein find-log-Ereignis für das Fenster.',
      'Claude erreicht Reddit über einen MCP-Server, der an einen Commit gebunden und mit --strict-mcp-config übergeben wird.',
      'Das Fenster ruft den Kern über Tauri invoke auf, oder über HTTP und Server-Sent Events, wenn Archon es einbettet.',
      'Post it for me steuert Chrome über das DevTools-Protokoll mit chromiumoxide.',
    ],
    reliability: [
      'Ein Find lässt sich abbrechen, und der Kern liest found.json nach dem Lauf und behält 6 Karten.',
      'Post it for me zählt einen Kommentar erst als gepostet, wenn die Seite einen Kommentar des Kontos mit dem Entwurfstext zeigt.',
      'Die App läuft nur einmal. Ein zweiter Start zeigt das offene Fenster, und ein Hintergrundlauf endet 2 Minuten nach dem Schließen des Frames.',
    ],
    security: [
      'Die Reddit-Anmeldung bleibt im Chrome-Profil der Person oder im eigenen Chrome-Ordner der App. Die App speichert kein Passwort.',
      'Der lokale Server antwortet nur auf einen Loopback-Host, und ein POST braucht den Inhaltstyp JSON, sodass keine fremde Seite ihn aufrufen kann.',
      'Ein Claude-Lauf darf Lesewerkzeuge, den Reddit-Server und das Schreiben in seine eigene Ausgabedatei nutzen. Der Updater prüft vor der Installation eine Signatur.',
    ],
    performance: [
      'Claude und Chrome laufen als Kindprozesse ohne Konsolenfenster, und das Fenster bekommt Zeilen als Strom statt erst am Ende.',
      'Der Release-Build schaltet LTO ab und nimmt 16 Codegen-Units, was das Kompilieren von 18 Minuten auf etwa 2 senkte.',
      'Der Runner behält den target-Ordner von cargo zwischen Builds, sodass nur das App-Crate neu kompiliert.',
    ],
    operations: [
      'Checks und Release starten zusammen bei jedem Push auf main, und ein Release-Gate bricht den Build ab, wenn Checks scheitern.',
      'Publish taggt den Commit mit dem Datum und lädt den NSIS-Installer hoch. Eine signierte latest.json steuert den Updater.',
      'Der Tauri-Updater prüft beim Start und alle 24 Stunden und installiert den neuen Build dann still.',
    ],
    tradeoffs: [
      'Claude Code mit einem Skill statt der Reddit-API aus Rust, damit die Thread-Regeln an einem Ort liegen. Ein Find läuft langsamer.',
      'Tauri 2 statt Electron, das ein ganzes Chromium in jede Installation packt. Der Preis sind 2 Sprachen zum Prüfen.',
      'Der eigene Chrome der App mit Debug-Port statt des Chrome der Person, da Chrome 136 einen Debug-Port im Standardprofil verweigert. Es braucht eine weitere Reddit-Anmeldung.',
      'Das alte Reddit-Formular statt des neuen Editors, der seine Eingaben in Shadow Roots versteckt.',
    ],
  },
  features: {
    'Repo picker':
      'Der Rust-Kern listet jeden Git-Ordner unter dem Stammordner aus den Einstellungen. Die Wahl landet in einer JSON-Datei im Datenordner der App.',
    Subreddits:
      'Der Kern startet Claude Code ohne MCP-Server und nur mit Lesewerkzeugen. Claude nennt die Subs anhand des Repos, und die Liste bleibt pro Repo gespeichert.',
    'Find threads':
      'Der Kern startet Claude Code im Repo mit dem Skill reddit-comments und einem Reddit-MCP-Server. Claude schreibt Threads und Entwürfe in eine Datei, und der Kern behält 6.',
    'Steps on top': 'Das React-Fenster hebt den wartenden Schritt hervor, je nach Stand der Suche und der Karten.',
    Cards:
      'Die Karten kommen aus einer Warteschlangendatei, die der Kern schreibt. Änderungen landen dort, wenn das Textfeld den Fokus verliert.',
    'Open in Chrome':
      'Der Kern legt den Entwurf in die Zwischenablage und startet Chrome im gewählten Profil. Ein Limit hält das Tempo bei 3 geposteten Kommentaren pro Stunde.',
    'Post it for me':
      'Der Kern startet ein eigenes Chrome mit Debug-Port und steuert es über chromiumoxide. Er füllt das Formular des alten Reddit, drückt Save und prüft, ob der Kommentar erscheint.',
    'Posts tab':
      'Claude Code liest die angehakten Repos und den Skill marketing und schreibt dann Post-Entwürfe in eine Datei. Der Kern behält 3 und streicht Medien ohne Datei.',
    'Screenshots and videos':
      'Claude wählt bis zu 4 Dateien aus dem Screenshot-Ordner des Repos nach ihren Bildunterschriften. Ein Klick auf eine Datei zeigt sie im Explorer.',
    'Open a post':
      'Der Kern öffnet in Chrome die Einreichseite des alten Reddit mit Titel und Text in der Adresse. Ein Post mit Medien zeigt die erste Datei im Explorer.',
    'Ban risk':
      'Ein Rust-Modul bewertet den nächsten Post anhand der Verlaufsdateien für Posts und Kommentare. Die Regeln stammen aus dem Skill marketing, etwa eine Community pro Tag.',
    'Tester post':
      'Der Kern füllt eine Vorlage aus dem Google-Group-Link und den App-Zeilen im Panel. Ein Lauf von Claude ist nicht nötig.',
    'Inside Archon':
      'Der Kern liefert dasselbe Fenster und dieselben Befehle über lokales HTTP mit axum. Archon rahmt es ein, und die App beendet sich 2 Minuten nach dem Schließen des Tabs.',
    'Info button':
      'Ein Dialog im Fenster nennt, was Find braucht, und die Regeln zum Sperrrisiko. Er zeigt auch die Version und eine Update-Prüfung.',
    Updates:
      'Das Tauri-Updater-Plugin liest beim Start und alle 24 Stunden eine signierte Update-Datei aus einem GitHub-Release. Vor dem Installer prüft es die Signatur.',
    Language:
      'i18next hält die 9 Kataloge im Fenster. Die Wahl steht in der Einstellungsdatei, also teilen sich Tauri-Fenster und Archon-Rahmen sie.',
    'Done list':
      'Gepostete und übersprungene Threads wandern mit Datum in eine Verlaufsdatei. Die nächste Suche gibt sie Claude zum Überspringen mit.',
  },
};

export default arch;

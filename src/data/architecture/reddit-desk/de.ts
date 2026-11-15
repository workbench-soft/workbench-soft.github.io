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

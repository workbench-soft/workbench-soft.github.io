import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine VS-Code-Erweiterung, die jeden Link aus dem lokalen git baut. Sie schickt den Hosts keine Anfragen und öffnet den Link im Browser oder kopiert ihn.',
  parts: [
    { name: 'VS Code API', role: 'registriert die 8 Befehle und die Menüs und liest Einstellungen und Auswahl.' },
    { name: 'git', role: 'liefert Repo-Wurzel, Remote-URL und Branches, mit 10 Sekunden Limit pro Aufruf.' },
    {
      name: 'Link-Bauer',
      role: 'reines TypeScript, das aus einem Remote den Datei-, Blame- und Verlaufslink jedes Hosts macht.',
    },
    {
      name: 'vscode.env',
      role: 'öffnet den Link im Browser oder legt ihn in die Zwischenablage, in lokalen und entfernten Fenstern.',
    },
    { name: 'vscode.l10n', role: 'übersetzt Befehle, Einstellungen und Meldungen in 9 Sprachen.' },
    { name: 'esbuild', role: 'bündelt den Code in eine Datei, so lädt die Erweiterung schnell.' },
    {
      name: 'GitHub Actions',
      role: 'baut die .vsix neben den Prüfungen und veröffentlicht sie, sobald diese durchlaufen.',
    },
  ],
  flow: [
    'Die Person startet einen Befehl aus Palette, Editor oder Explorer.',
    'Die Erweiterung findet mit git die Repo-Wurzel der Datei.',
    'git liefert die Remote-URL und einen Branch mit der Datei.',
    'Der Link-Bauer schreibt die URL für diesen Host mit den markierten Zeilen.',
    'VS Code öffnet sie im Browser oder kopiert sie mit einem Hinweis.',
  ],
  links: [
    { to: 'GitHub', text: 'Hostet den Fork und seine Releases mit der .vsix. GitHub-Links sind der Standard.' },
    { to: 'GitLab and Bitbucket', text: 'Linkziele neben GitHub, gebaut aus der Remote-URL ohne API-Aufruf.' },
    { to: 'Visual Studio Marketplace', text: 'Listet die Erweiterung. Jede Veröffentlichung dort geschieht von Hand.' },
  ],
  features: {
    'Open a file, blame or history link':
      'Der Befehl liest Datei und markierte Zeilen aus dem Editor und den Remote aus git. Ein Host-Modul schreibt den Link, und VS Code öffnet ihn im Browser.',
    'Copy a link':
      'Derselbe Link geht in die Zwischenablage von VS Code, so füllt ein entferntes Fenster die lokale. Ein Hinweis zeigt die URL.',
    'Links from the Explorer':
      'Das Explorer-Menü gibt Datei oder Ordner an denselben Befehl. Der Link trägt keinen Zeilenanker.',
    'Main or master first':
      'git prüft die Einstellung, dann den Remote-HEAD, main und master auf einen Branch mit der Datei. Ohne Treffer nutzt der Link den aktuellen Branch.',
    'Hosts and mapped URLs':
      'Der Host kommt aus einer Einstellung oder aus der Remote-URL. Eine Zuordnung ersetzt die Remote-URL, bevor der Link-Bauer den Link schreibt.',
    Languages:
      'vscode.l10n wählt den Katalog nach der Anzeigesprache von VS Code. Befehlsnamen und Einstellungen kommen aus 9 Paketkatalogen.',
  },
};

export default arch;

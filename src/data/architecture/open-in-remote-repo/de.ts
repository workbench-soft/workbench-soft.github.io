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
  design: {
    scale: [
      'Eine Person pro VS-Code-Fenster, ein Link pro Klick, die Arbeit sind also wenige git-Aufrufe in einem Repo.',
      'Es läuft in lokalen, SSH- und Container-Fenstern, und ein git-Aufruf endet nach 10 Sekunden, damit ein langsamer Remote den Editor nicht hängen lässt.',
    ],
    data: [
      'Die Erweiterung hält keinen Zustand. Jeder Befehl liest Einstellungen, Auswahl und git, baut einen Link und vergisst sie.',
      'Die openInGitHub-Einstellungen und die Remote-URL bestimmen Host, Branch und eine abgebildete Adresse.',
    ],
    interfaces: [
      'Befehle kommen aus der Palette, dem Editor-Menü und dem Explorer-Menü, 8 an der Zahl, und jeder ruft denselben Link-Runner auf.',
      'git liefert über execFile die Repo-Wurzel, die Remote-URL und die Branches, und die Link-Bauer schreiben die URLs für Datei, Blame und Verlauf je Host.',
      'vscode.env.openExternal öffnet den Browser und vscode.env.clipboard kopiert, sodass beides in Remote-Fenstern geht.',
    ],
    reliability: [
      'Die Branch-Prüfung probiert die Einstellung, den Remote-HEAD, main und master und fällt dann auf den aktuellen Branch oder den Commit bei losgelöstem HEAD zurück.',
      'Ein git-Fehler zeigt die eigene Meldung von git, und git fragt in einem Terminal nach keinem Passwort.',
    ],
    security: [
      'Die Erweiterung sendet den Hosts keine Anfragen, braucht also kein Token und keinen Login für GitHub, GitLab oder Bitbucket.',
      'git läuft über execFile ohne Shell, sodass die Einstellung defaultRemote keinen Befehl ausführen kann.',
    ],
    performance: [
      'esbuild bündelt die Quellen in eine Datei, was das Paket kleiner und das Laden schneller machte.',
      'Jeder git-Aufruf ist ein kurzer Prozess über execFile mit 10 Sekunden Limit, ein Klick kostet also wenige kleine Prozesse.',
    ],
    operations: [
      'Checks führen Lint, Typprüfung, Unit-Tests und Build bei jedem Push aus, und der Release-Workflow baut daneben die .vsix.',
      'Ein Gate-Skript veröffentlicht den Build, sobald Checks bestehen, und ein fehlgeschlagener Checks-Lauf bricht ihn ab. Die Marketplace-Veröffentlichung bleibt manuell.',
      'Einfaches TypeScript in git und links läuft in Node unter mise run test, und nur der Editor-Kleber braucht ein VS-Code-Testfenster.',
    ],
    tradeoffs: [
      'Links aus lokalem git statt der REST-API jedes Hosts, also kein Token und kein Netzaufruf pro Klick. Der Link kann nicht bestätigen, dass die Datei auf dem Host existiert.',
      'vscode.env.openExternal statt des Pakets open, das Namen wie users.$id.tsx zerstörte und aus SSH-Fenstern keinen Browser öffnete.',
      'Ein Fork einer bestehenden Erweiterung statt eines Neuschreibens, der den Host-Link-Code und seine Tests behielt. Die neue ID heißt, dass Leute neu installieren.',
    ],
  },
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

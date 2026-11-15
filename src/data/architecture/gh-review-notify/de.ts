import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ein bash-Skript läuft auf dem Mac, alle 3 Minuten von einem launchd-Agenten gestartet. Es liest GitHub über die gh CLI und zeigt jedes neue Ereignis in der Mitteilungszentrale.',
  parts: [
    {
      name: 'launchd-Agent',
      role: 'startet das Skript alle 180 Sekunden und holt verpasste Läufe nach dem Aufwachen nach.',
    },
    {
      name: 'bash-Skript',
      role: 'sucht die PRs, liest Reviews und Kommentare, filtert sie und schickt die Mitteilungen.',
    },
    {
      name: 'GitHub CLI',
      role: 'macht jeden GitHub-Aufruf mit dem Login, den gh schon hält. So speichert das Tool kein Token.',
    },
    { name: 'jq', role: 'liest die JSON-Antworten von GitHub.' },
    {
      name: 'terminal-notifier',
      role: 'zeigt die Mitteilung und öffnet per Klick den Kommentar, mit osascript als Rückfall.',
    },
    {
      name: 'Cache-Dateien',
      role: 'einfache Dateien im Cache-Ordner des Nutzers halten die gesehenen Ereignisse und den letzten Stand jedes PRs.',
    },
  ],
  flow: [
    'launchd startet das Skript, und eine Sperre verhindert einen zweiten Lauf.',
    'gh sucht deine offenen PRs mit Änderungen in den letzten 3 Tagen.',
    'Das Skript liest Reviews und Kommentare nur bei geänderten PRs.',
    'Ereignisse aus der Liste der gesehenen fallen weg.',
    'terminal-notifier zeigt den Rest, und ein Klick öffnet den Kommentar.',
  ],
  links: [
    { to: 'GitHub', text: 'Die Quelle jedes PRs, Reviews und Kommentars, gelesen über die gh CLI.' },
    { to: 'Homebrew', text: 'Installiert jq und terminal-notifier bei der Einrichtung.' },
  ],
  design: {
    scale: [
      'Eine Person an einem Mac. Die Suche umfasst offene PRs, die in den letzten 3 Tagen aktualisiert wurden.',
      'Ein Lauf nach dem ersten dauert unter 10 Sekunden, weil nur PRs mit verändertem updatedAt neu geöffnet werden.',
      'Das Werkzeug ist eine Bash-Datei mit unter 400 Zeilen.',
    ],
    data: [
      'Flache Dateien im Cache-Ordner des Benutzers: seen.txt, pr-updated.tsv, review-requests.tsv und ein Sperrordner.',
      'seen.txt hält die letzten 3000 Ereignisschlüssel. Ein Schlüssel ist die URL des Reviews oder Kommentars.',
      'Der Ordner ist nur für das eigene Konto lesbar, weil er die URLs privater PRs auflistet.',
    ],
    interfaces: [
      'gh search prs und gh api lesen GitHub, und jq liest die JSON-Antworten.',
      'terminal-notifier zeigt jede Meldung und öffnet per Klick den Kommentar, mit osascript als Rückfall.',
      'launchd startet den Agenten alle 180 Sekunden. GH_REVIEW_NOTIFY_INTERVAL und GH_REVIEW_NOTIFY_BOTS ändern Intervall und Bot-Filter.',
    ],
    reliability: [
      'Ein Sperrordner lässt einen zweiten Lauf sofort enden.',
      'Eine fehlgeschlagene PR-Suche stoppt den Lauf, bevor eine Cache-Datei sich ändert, und eine fehlgeschlagene Abfrage der Review-Anfragen bleibt aus dem Cache, der nächste Lauf fragt also erneut.',
      'Ein Ereignis erscheint bis zu 3 Minuten später und nur bei wachem Mac. launchd holt nach dem Aufwachen auf.',
    ],
    security: [
      'Es nutzt den Login von gh auth, das Werkzeug speichert also kein Token.',
      'Die Cache-Dateien bleiben nur für das eigene Konto lesbar.',
      'Es fragt github.com vom Mac aus ab, daher erreichen weder ein Webhook noch eine öffentliche Adresse die Maschine.',
    ],
    performance: [
      'Reviews und Kommentare werden nur für PRs gelesen, deren updatedAt sich bewegt hat, oder bei einem Seed für jeden PR.',
      'Review-Anfragen an Teams entfallen, und mehr als 4 Kommentare zu einem PR werden zu 1 Meldung gefaltet.',
      'grep und awk prüfen jeden Ereignisschlüssel gegen seen.txt, ohne Datenbank.',
    ],
    operations: [
      'install.sh kopiert das Skript in den lokalen bin-Ordner, schreibt die plist und lädt den Agenten. uninstall.sh macht es rückgängig.',
      'tests/run.sh lässt das Skript auf vorbereiteten GitHub-Antworten laufen, mit Stubs für gh, date und terminal-notifier.',
      'Die Prüfungen laufen auf einem macOS-Runner von GitHub, und jeder grüne Push bekommt ein datiertes Release. Die Installation holt das neueste main.',
    ],
    tradeoffs: [
      'Abfrage alle 3 Minuten statt E-Mail, Slack-App oder Webhooks, also ohne Server und öffentliche Adresse, um den Preis einer Verzögerung bis zu 3 Minuten.',
      'Die gh-CLI statt curl mit Token, damit kein Token zu speichern ist. Das Werkzeug stoppt, wenn gh den Login verliert.',
      'Eine Bash-Datei statt TypeScript oder Rust, damit sie ohne Build hineinkopiert wird, und die Tests brauchen Stubs.',
      'Flache Dateien statt SQLite, damit Bash nur grep und awk braucht. Ein neues Format braucht einen neuen Dateinamen.',
    ],
  },
  features: {
    'Review and comment notifications':
      'gh sucht die offenen PRs, die du geschrieben, geprüft oder kommentiert hast. Dann liest es Reviews und Kommentare jedes geänderten PRs, und jedes neue Ereignis wird eine Mitteilung.',
    'Review requests':
      'Eine Abfrage bei GitHub behält die Anfragen mit deinem Namen und verwirft die an ein Team. Eine fehlgeschlagene Abfrage bleibt aus dem Cache, so fragt der nächste Lauf erneut.',
    'Comment bursts':
      'Vor der Mitteilung zählt das Skript die neuen Kommentare pro PR. Mehr als 4 werden 1 Mitteilung mit Anzahl und Namen, und ein Klick öffnet den PR.',
    'Quiet first run':
      'Ohne Cache schreibt das Skript die Ereignisse der letzten 3 Tage in die Liste der gesehenen und zeigt keines. Ein fehlgeschlagener erster Lauf lässt den Cache leer, so beginnt der nächste neu.',
    'Bot filter':
      'Das Skript verwirft Kommentare von Bot-Konten, bevor es Ereignisse vergleicht. Eine Einstellung bei der Installation landet im launchd-Agenten und schaltet sie wieder ein.',
    'Status and test':
      'Ein Flag zeigt den Zustand des Agenten, das Konto, den letzten Lauf und die Einstellungen. Ein anderes schickt eine Testmitteilung über denselben Weg.',
    Releases:
      'Ein GitHub-Actions-Workflow taggt jeden Push auf main mit einer Datumsversion, sobald shellcheck durchläuft. Die Notizen listen die Commits seit dem letzten Release.',
  },
};

export default arch;

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

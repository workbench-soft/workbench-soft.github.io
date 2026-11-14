import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ein Node-Server auf dem PC liefert eine Webseite an ein Edge-App-Fenster. Der Server liest Repos und Läufe und öffnet für jede Aufgabe eine Konsole mit einem Coding-Agenten.',
  parts: [
    { name: 'Node 24', role: 'führt den Server als TypeScript aus, ohne Pakete und ohne Build-Schritt.' },
    { name: 'Webseite', role: 'ein Modul pro Tab, gezeigt in einem Edge-App-Fenster auf dem PC.' },
    { name: 'Coding-Agenten', role: 'Claude Code, Codex oder Kimi Code in einer Konsole pro Aufgabe.' },
    { name: 'adb', role: 'installiert und öffnet die Apps auf einem angeschlossenen Telefon oder TV.' },
    { name: 'JSON-Datendateien', role: 'die Repos, die Apps und die Agentenaufgaben, die Archon listet.' },
    { name: 'Tailscale', role: 'veröffentlicht Archon im Tailnet, damit das Telefon es öffnen kann.' },
    {
      name: 'PowerShell-Skripte',
      role: 'stellen einen PC wieder her und ziehen den Arbeitsordner in einen neuen Ordner um.',
    },
    { name: 'Eingerahmte Seiten', role: 'die CI-Statusseite, Reddit Desk und der Memories-Indexer in Tabs.' },
  ],
  flow: [
    'Die Person hakt Repos an und wählt eine Aufgabe oder spricht einen Befehl.',
    'Die Seite schickt die Wahl an den lokalen Server.',
    'Der Server schreibt eine Batch-Datei und öffnet eine Konsole mit dem Agenten.',
    'Der Agent arbeitet im Repo und schreibt eine Endmarke.',
    'Die Seite fragt alle 5 Sekunden die Läufe ab und zeigt den Fortschritt.',
  ],
  links: [
    { to: 'local-ci', text: 'Der CI-Tab rahmt seine Statusseite ein und startet sie, wenn sie aus ist.' },
    { to: 'reddit-desk', text: 'Der Reddit-Tab rahmt das App-Fenster über lokales HTTP ein.' },
    { to: 'memories', text: 'Der Memories-Tab zeigt den Fortschritt seines Foto-Indexers.' },
    { to: 'songfactory', text: 'Der Songs-Tab startet die Kacheln seiner Pipeline und zeigt jeden Lauf.' },
    {
      to: 'agent-skills-private',
      text: 'Seine Regeln und Skills legen fest, wie jeder von Archon gestartete Agent eine Änderung ausliefert.',
    },
  ],
  features: {
    'Ask Archon':
      'Edge macht aus Sprache Text. Claude Code auf Haiku wählt dann eine Launcher-Aktion, und der Server führt sie aus und öffnet ihren Tab.',
    'Runs strip':
      'Der Server führt ein Register der Läufe und liest die Endmarke jedes Laufs. Die Restzeit ist der Median früherer Läufe derselben Art.',
    Apps: 'Die Karten kommen aus einer JSON-Liste und den neuesten Builds im Release-Repo des Studios. adb installiert und öffnet sie auf Telefon oder TV.',
    'Ads on this phone':
      'Ein Skript schickt jeder Studio-App über adb einen Freischaltlink. Ein passender Schlüssel markiert das Telefon im Speicher der App und setzt den Werbeschalter.',
    'To do':
      'Der Server liest die offenen Punkte jeder TODO.md-Datei. Angehakte Punkte gehen an eine Agentenkonsole in ihrem Repo.',
    Sessions:
      'Der Server liest die Sitzungsdateien der Claude-App und die Sitzungen von Codex und Kimi Code. Fortsetzen öffnet eine Konsole mit dem Agenten der Sitzung.',
    Agents:
      'Die Repos mit ihrem Zweck kommen aus einer JSON-Liste, die Aufgaben aus einer zweiten. Jedes angehakte Repo bekommt eine Konsole mit dem Agenten an der Aufgabe.',
    Docs: 'Der Server liefert das Markdown jedes Repos. Die Seite zeichnet den Text mit marked und die Diagramme mit mermaid.',
    Rules:
      'Der Server liest die gemeinsamen Regeldateien und die AGENTS.md jedes Repos. Er prüft jedes Repo auf die Dateien und Tasks, die die Konventionen fordern.',
    Branches:
      'git listet Branches, Worktrees und Stashes jedes Repos mit ihren PRs. Löschungen laufen in git, und Merges gehen an einen Agenten.',
    Packages:
      'Der Server durchsucht die Paketdateien jedes Repos und fragt npm, crates.io oder PyPI nach der neuesten stabilen Version. Ein Update geht an eine Agentenkonsole pro Repo.',
    'CI, Reddit and Memories':
      'Jeder Tab rahmt eine Seite ein, die ein anderes lokales Programm liefert. Start startet das Programm, solange seine Seite aus ist.',
    Songs:
      'Der Server liest die Themen von songfactory und startet jede Kachel als Kindprozess. Schritte und Log liest er aus dessen Ausgabe.',
    Voices:
      'Der Tab listet die Stimmen von edge-tts und spielt eine ab. Use for the agents startet den Installer des turn-voice-Hooks mit der Wahl neu.',
    Keys: 'Das Skript rotate-secrets listet jedes CI-Secret mit seinem Alter. Eine Erneuerung öffnet eine Konsole, in der Claude Code den Skill rotate-secrets ausführt.',
    'Archon on the phone':
      'Tailscale serve veröffentlicht den lokalen Server im Tailnet. Das Telefon legt die Seite als App auf den Startbildschirm.',
    'Restore a PC':
      'Ein PowerShell-Skript stellt jeden Eintrag wieder her, den eine JSON-Liste nennt. Ein Prüf-Task schlägt fehl, wenn der PC etwas hat, das in der Liste fehlt.',
    'Move the workspace':
      'Ein PowerShell-Skript läuft aus einer temporären Kopie und verschiebt den Ordner. Danach korrigiert es jede Stelle mit dem alten Pfad, von Worktree-Links bis zu geplanten Aufgaben.',
    'Sync the repos':
      'Ein Node-Skript klont jedes Repo aus der JSON-Liste, das im Ordner fehlt. Die übrigen holt es mit git, 8 auf einmal.',
  },
};

export default arch;

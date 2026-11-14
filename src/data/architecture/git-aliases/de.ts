import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Jeder Alias ist ein bash-Skript in einem git-Repo. Ein Include in der git-Konfiguration zeigt auf den Klon, so aktualisiert ein Pull jeden Alias auf dem Rechner.',
  parts: [
    {
      name: 'bash-Skripte',
      role: 'ein Skript pro Alias, ausgeführt von der bash, die git auf macOS, Linux und Windows mitbringt.',
    },
    {
      name: 'Include in der git-Konfiguration',
      role: 'ordnet jedem Aliasnamen sein Skript zu und zeigt git auf den Klon.',
    },
    { name: 'fzf', role: 'das unscharfe Suchmenü für die Wahl von Branches und Worktrees.' },
    {
      name: 'zsh- und PowerShell-Funktionen',
      role: 'machen aus der Ordnerzeile des Branchwechsels einen echten Ordnerwechsel.',
    },
    {
      name: 'Installer',
      role: 'einer für macOS und Linux und einer für Windows. Sie richten die git-Konfiguration, die Shell und den Hook ein.',
    },
    { name: 'shellcheck und shfmt', role: 'prüfen jedes Skript im Commit-Hook und in der CI.' },
    {
      name: 'GitHub Actions',
      role: 'führt Lint und Tests auf Linux und Windows aus und taggt dann jeden grünen Push auf main.',
    },
  ],
  flow: [
    'Die Person tippt einen kurzen Befehl, etwa git co.',
    'Git findet den Alias in der eingebundenen Konfiguration und startet sein Skript.',
    'Das Skript ruft git auf, für eine Auswahl auch fzf.',
    'Eine Shell-Funktion macht aus einer Ordnerzeile einen Ordnerwechsel.',
    'Das Ergebnis erscheint im Terminal, und das Repo ändert sich über git.',
  ],
  links: [
    { to: 'GitHub', text: 'Hostet das Repo, führt die Prüfungen aus und veröffentlicht die datierten Releases.' },
  ],
  features: {
    Aliases:
      'Eine Konfigurationsdatei ordnet jedem Aliasnamen ein bash-Skript im Klon zu. git a liest den Kommentar oben in jedem Skript und gibt die Liste aus.',
    'Switch branch folders':
      'git sb listet die lokalen Branches samt Worktrees in fzf. Das Skript gibt den Pfad aus, und eine zsh- oder PowerShell-Funktion bringt Shell und VS-Code-Fenster dorthin.',
    'Delete branches and worktrees':
      'git db wählt sie in fzf, und git dbm findet Branches ohne Remote-Branch. Ein gemeinsamer Helfer löscht jeden Worktree samt Branch und fragt, bevor er einen mit Änderungen erzwingt.',
    Installer:
      'Ein Shell-Installer für macOS und Linux und einer in PowerShell für Windows schreiben das Include in die git-Konfiguration. Vor jeder Änderung bekommt die Datei eine datierte Kopie.',
    'Lint hook':
      'Der Installer leitet die git-Hooks auf einen Ordner im Repo. Jeder Commit dort startet shellcheck, shfmt und die Repo-Regeln, dann oxfmt und markdownlint auf den gestagten Dateien.',
    'Reset to the default branch':
      'Das Skript liest den Standardbranch aus dem HEAD des Remotes, holt dann und setzt hart darauf zurück. Es fragt vorher, wenn lokale Änderungen oder ungepushte Commits verloren gingen.',
    Releases:
      'Ein GitHub-Actions-Workflow startet, sobald Lint auf main durchläuft. Er wählt die nächste Datumsversion und schreibt die Notizen aus den Commits seit dem letzten Tag.',
  },
};

export default arch;

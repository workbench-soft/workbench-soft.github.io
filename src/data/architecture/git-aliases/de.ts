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
  design: {
    scale: [
      'Ein Entwickler auf wenigen Rechnern, ohne Server. Jeder Alias ist ein Bash-Skript in bin/.',
      'Die Last sind einige git-Aufrufe pro Alias, die Grenzen setzen also git und das Repo, nicht die Skripte.',
    ],
    data: [
      'Die Aliase halten keinen eigenen Zustand. Sie lesen und ändern das Repo über git.',
      'Die Installer schreiben gitaliases.dir und include.path in die Benutzer-Git-Konfiguration und eine Funktion ins zsh- oder PowerShell-Profil.',
      'aliases.gitconfig ordnet jedem Aliasnamen sein Skript im Klon zu.',
    ],
    interfaces: [
      'Git startet einen Alias als Kindprozess, ein Skript bekommt also Argumente und schreibt ins Terminal.',
      'git sb gibt eine __cd__-Zeile mit Pfad auf stdout aus, und eine zsh- oder PowerShell-Funktion macht daraus ein cd.',
      'fzf zeichnet die Auswahl, und die Skripte laden die Helfer _shared.sh und _prune.sh.',
    ],
    reliability: [
      'Jedes Skript läuft mit set -euo pipefail, ein fehlgeschlagener git-Aufruf stoppt den Alias also.',
      'Das Löschen von Branches und Worktrees überspringt den Haupt-Worktree, den aktuellen Ordner und gesperrte Worktrees.',
      'Esc in der Auswahl beendet den Alias, ohne etwas zu löschen.',
    ],
    security: [
      'Der einzige externe Dienst ist das Git-Remote. Die Skripte speichern kein Token und rufen keine API auf.',
      'Die Installer fragen vor jeder Änderung und kopieren jede Datei, die sie ändern, zuerst.',
      'Die Lösch-Aliase listen die Kandidaten und entfernen nur, was die Person wählt.',
    ],
    performance: [
      'Jeder Alias ist ein Bash-Prozess mit wenigen git-Aufrufen, und ein Pull aktualisiert alle.',
      'Die Prune-Listen kommen aus einem for-each-ref-Aufruf und der Worktree-Liste, und one_line nutzt printf -v, weil eine Befehlsersetzung pro Worktree einen fork kostet.',
    ],
    operations: [
      'lint.sh führt shellcheck und shfmt aus und prüft, dass jeder Alias ein Skript, eine Beschreibung und eine README-Zeile hat. test.sh lässt die Aliase auf Testrepos laufen.',
      'Ein pre-commit- und ein pre-push-Hook führen mise run lint aus, und lint.yml tut es auf Linux- und Windows-Runnern.',
      'Jeder grüne Push auf main bekommt ein datiertes Release wie v2026.10.30.1.',
    ],
    tradeoffs: [
      'Ein Bash-Skript pro Alias statt eingebetteter !-Aliase oder Shell-Funktionen, damit shellcheck und Tests es abdecken, um den Preis einer Datei pro Alias.',
      'Bash statt TypeScript oder Rust, weil git auf jedem System Bash mitbringt und kein Rechner Node braucht.',
      'Ein Include, das auf den Klon zeigt, statt kopierter Aliase, damit ein git pull sie aktualisiert. Verschiebt man den Klon, brechen sie.',
      'Zwei Installer statt einem, weil nur PowerShell sein Profil geändert braucht, um den Preis von zwei Kopien, die im Gleichschritt bleiben müssen.',
    ],
  },
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

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ein privates GitHub-Repo mit gemeinsamen Schritten, die jedes Repo der Organisation aus seinen eigenen Workflows aufruft. Eine Composite Action richtet die Werkzeuge ein, und wiederverwendbare Workflows mergen Dependabot-PRs und bauen für den iPhone-Simulator.',
  parts: [
    {
      name: 'Composite Action',
      role: 'der Einrichtungsschritt im Job des Aufrufers, der die gepinnten Werkzeuge und Pakete installiert.',
    },
    { name: 'mise', role: 'installiert jedes Werkzeug in der Version, die das Repo pinnt.' },
    { name: 'pnpm', role: 'installiert die Pakete aus der Lockfile und kopiert sie auf Windows statt Hardlinks.' },
    {
      name: 'Wiederverwendbare Workflows',
      role: 'der Dependabot-Merge und der iOS-Simulator-Build, die jedes App-Repo aufruft.',
    },
    { name: 'Node-Skript', role: 'listet die reinen Android-Teile einer App auf, für die es keinen iOS-Plan gibt.' },
    {
      name: 'macOS-Runner und Maestro',
      role: 'bauen die App für den iPhone-Simulator und spielen ihre Testabläufe durch.',
    },
    {
      name: 'Release-Skripte',
      role: 'Shell-Skripte, die das Datums-Tag wählen und die Notizen aus den Commits schreiben.',
    },
  ],
  flow: [
    'Ein Workflow eines App-Repos ruft einen Schritt von hier auf main auf.',
    'GitHub lädt den Schritt für diesen Lauf aus diesem Repo.',
    'Der Einrichtungsschritt installiert die gepinnten Werkzeuge, dann die Pakete.',
    'Die eigenen Checks des Aufrufers laufen danach im selben Job.',
    'Ein Fix hier erreicht jedes Repo beim nächsten Lauf.',
  ],
  links: [
    {
      to: 'GitHub Actions',
      text: 'Jedes Repo der Organisation ruft die Schritte hier aus seinen eigenen Workflows auf.',
    },
    {
      to: 'local-ci',
      text: 'Auf den PC-Runnern kopiert der Einrichtungsschritt Pakete aus dem gemeinsamen Speicher, damit keine Dateisperren entstehen.',
    },
    { to: 'agent-skills-private', text: 'Die Release-Skripte entsprechen den CI-Vorlagen seines Skills repo-ci.' },
    {
      to: 'Dependabot',
      text: 'Seine PRs mergen über den gemeinsamen Workflow, und ein Major-Update wartet auf einen Menschen.',
    },
  ],
  design: {
    scale: [
      'Ein Besitzer und die Dutzenden App-Repos einer GitHub-Organisation, die alle dieselben wenigen Schritte aus ihren Workflows aufrufen.',
      'Eine Korrektur hier erreicht jeden Aufrufer bei seinem nächsten Lauf, daher kann ein schlechter Merge alle brechen.',
    ],
    data: [
      'Keine Datenbank. Der Zustand ist ein Datums-Tag, ein Format für Commit-Betreffs und die mise.toml, die jedes Tool festlegt.',
      'Der Tag lautet v<yyyy.mm.dd>.<n>, und die Notizen sortieren feat-, fix- und perf-Commits aus Betreffs der Form type(scope)!: text.',
    ],
    interfaces: [
      'Der Setup-Schritt ist eine Composite Action, die ein Aufrufer mit uses startet und die im Job des Aufrufers läuft.',
      'Der Dependabot-Merge und der iOS-Simulator-Build sind wiederverwendbare Workflows, die die Liste der auf main zu startenden Workflows erhalten.',
      'Der Auto-Merge läuft über pull_request_target, und die iOS-Prüfung ist ein Node-Skript mit Bestanden oder Durchgefallen als Ergebnis.',
    ],
    reliability: [
      'Der Merge-Job läuft nur, wenn dependabot[bot] den PR geöffnet und das Ereignis ausgelöst hat, und er stoppt bei einem gemergten oder geschlossenen PR.',
      'Auf den PC-Runnern kopiert pnpm Pakete aus einem gemeinsamen Store, da ein gelöschter Hardlink andere Lesezugriffe mit EBUSY scheitern ließ.',
      'Jeder Job bekommt einen eigenen mise-Shim-Ordner, sodass ein laufender Prozess, der die gemeinsame uvx.exe hält, kein Tool-Update blockiert.',
    ],
    security: [
      'Das Repo ist privat, und sein Actions-Zugriff ist auf die Organisation gesetzt, damit die Aufrufer die Workflows laden können.',
      'pull_request_target läuft von main mit einem Schreib-Token, daher werden nur Dependabots eigene PRs gemergt, und ein Major-Update wartet auf eine Person.',
    ],
    performance: [
      'Tool-Installationen bleiben zwischen Jobs eines Runners geteilt, und nur der kleine Shim-Ordner wird je Job neu gebaut.',
      'pnpm installiert aus der Lockfile ohne Auflösungsschritt, und die iOS-Prüfung läuft zuerst, damit ein schlechter Plan scheitert, bevor die Mac-Minuten beginnen.',
    ],
    operations: [
      'Lint läuft bei jedem Push auf main. Der Release-Workflow startet per workflow_run nach bestandenem Lint und setzt auf den Commit einen Datums-Tag.',
      'Ein Push nur mit Markdown überspringt Lint und bekommt daher kein Release.',
      'mise run test baut ein Wegwerf-Git-Repo und prüft die beiden Release-Skripte, und Vitest deckt ios-check ab.',
    ],
    tradeoffs: [
      'Aufrufer nutzen @main statt eines festen Tags, sodass eine Korrektur überall landet. Ein Repo, das zurückhalten muss, pinnt einen Release-Tag.',
      'Eine Composite Action statt eines wiederverwendbaren Workflows für das Setup, damit die eigenen Prüfungen des Aufrufers im selben Job folgen.',
      'Merge beim Öffnen und Prüfen auf main statt Warten auf PR-Prüfungen, da die Org-Repos keine auf PRs laufen lassen. Ein schlechtes Update erreicht main zuerst.',
      'Ein macOS-Runner für den iPhone-Build, da die PC-Runner Windows sind. Eine macOS-Minute zählt als 10, daher starten Aufrufer ihn von Hand oder beim Release.',
    ],
  },
  features: {
    'Setup step':
      'Eine Composite Action startet mise für die gepinnten Werkzeuge, dann installiert pnpm aus der Lockfile. Sie läuft im Job des Aufrufers, also folgen seine Checks direkt danach.',
    'Dependabot details':
      'Die Metadaten-Action von Dependabot liest die Update-Art jedes PRs. Der Merge-Job hält damit ein Major-Update für einen Menschen zurück.',
    'Dependabot auto merge':
      'Ein wiederverwendbarer Workflow merged einen neuen Dependabot-PR sofort per Squash und startet dann die Checks auf main. So merged nur ein PR, den Dependabot selbst geöffnet und gepusht hat.',
    Releases:
      'Ein Release-Workflow startet, sobald Lint auf einem Push nach main besteht. Zwei Shell-Skripte wählen das Datums-Tag und schreiben die Notizen aus den Commits seit dem letzten Tag.',
    'iOS check and simulator build':
      'Ein Node-Skript sucht in Paketen, nativen Modulen und Gradle-Dateien nach reinen Android-Teilen. Dann baut ein wiederverwendbarer Workflow auf einem macOS-Runner von GitHub, und Maestro macht die Screenshots.',
  },
};

export default arch;

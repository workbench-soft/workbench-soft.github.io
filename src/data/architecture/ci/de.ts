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

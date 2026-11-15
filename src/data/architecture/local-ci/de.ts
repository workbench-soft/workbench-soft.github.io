import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Einrichtungsskripte in PowerShell und POSIX sh bereiten einen Windows-PC oder einen Mac vor und registrieren ihn als GitHub-Actions-Runner. Eine Next.js-Seite auf dem PC zeigt Runner und Läufe, und ihr Server verteilt und bricht Jobs ab.',
  parts: [
    {
      name: 'Installer in PowerShell und sh',
      role: 'richten die Entwicklerwerkzeuge mit winget oder Homebrew und mise ein.',
    },
    {
      name: 'GitHub-Actions-Runner',
      role: 'nimmt die CI-Jobs der Organisation, mehrere pro PC mit einer Spur für schwere Builds.',
    },
    {
      name: 'Windows-Aufgabenplanung',
      role: 'startet Runner und Seite beim Booten und führt alle 5 Minuten das Update aus.',
    },
    { name: 'Next.js', role: 'die lokale Statusseite, deren Server Actions Läufe stoppen und APKs installieren.' },
    { name: 'GitHub REST API', role: 'liefert der Seite Läufe und Releases, abgefragt mit ETags für das Ratenlimit.' },
    { name: 'adb', role: 'installiert ein Release-APK auf dem Telefon am USB-Kabel.' },
    { name: 'Blacksmith und Oracle Cloud', role: 'die kostenlosen Cloud-Runner, die Jobs vor dem PC übernehmen.' },
    { name: 'SVG-Diagramme', role: 'auf dem Server gezeichnet aus 90 Tagen Läufen in einer JSON-Datei.' },
  ],
  flow: [
    'Ein Push in ein Repo der Organisation reiht Jobs auf GitHub ein.',
    'Der Seitenserver lenkt jedes Repo auf einen Cloud-Runner oder diesen PC.',
    'Ein Runner nimmt den Job, der zu seinen Labels passt.',
    'Der Seitenserver liest die Läufe und stoppt die ersetzten.',
    'Die Seite zeigt alle 15 Sekunden Jobs, Releases und Abbruchgründe.',
  ],
  links: [
    {
      to: 'GitHub Actions',
      text: 'Die Rechner registrieren sich als Runner der Organisation, und die Seite liest die API.',
    },
    { to: 'archon', text: 'Der CI-Tab von Archon zeigt die Statusseite in einem Rahmen.' },
    {
      to: 'ci',
      text: 'Jobs mit seinem Einrichtungsschritt kopieren auf diesem PC Pakete aus dem gemeinsamen Speicher.',
    },
    {
      to: 'agent-skills-private',
      text: 'Seine repo-ci-Vorlagen lesen die Runner-Variablen und setzen die Abbruchregeln.',
    },
    { to: 'Blacksmith', text: 'Cloud-Runner für leichte und schwere Jobs, solange die freien Minuten reichen.' },
  ],
  design: {
    scale: [
      'Ein PC und ein Mac bedienen die privaten Repos einer Organisation, mit standardmäßig 4 Runnern auf dem PC.',
      'Das GitHub-Limit von 5000 API-Aufrufen pro Stunde prägte die Abfrage, nachdem die Seite es einmal aufgebraucht hatte.',
      'Blacksmith gibt 3000 freie Minuten im Monat, daher stoppt der Router seine Nutzung bei 2700.',
    ],
    data: [
      'Die Seite hält 90 Tage beendeter Läufe in einer JSON-Datei, und cloud-usage.json zählt die Blacksmith-Minuten.',
      'Die Runner-Zahl steht in einer Datei runner-count im Home-Ordner. Die Route steht in 3 Repo-Variablen: CI_RUNNER, CI_HEAVY_RUNNER und CI_WINDOWS_RUNNER.',
    ],
    interfaces: [
      'Die GitHub-REST-API liefert Runner, Läufe, Jobs, Abrechnung und Releases, und die Seite setzt darüber die Repo-Variablen.',
      'Das runs-on eines Jobs liest eine Repo-Variable, mit den PC-Labels als Rückfall, und ein Runner nimmt den Job mit passenden Labels.',
      'Server-Aktionen führen PowerShell und adb aus, und adb installiert eine Release-APK auf einem per USB angeschlossenen Handy.',
    ],
    reliability: [
      'Ein Watchdog startet eine Runner-Aufgabe neu, deren Runner GitHub länger als 10 Minuten offline zeigt.',
      'Ein Job, der 5 Minuten auf Blacksmith wartet, wird abgebrochen und auf dem nächsten Runner neu gestartet.',
      'Die Variablen behalten ihren letzten Wert, solange der PC aus ist, und eine ungesetzte Variable fällt auf die PC-Labels zurück.',
      'Eine Installationssperre verhindert, dass die Update-Aufgabe und START.cmd gleichzeitig Installer ausführen.',
    ],
    security: [
      'Runner starten als eigene geplante Aufgabe der Person und nicht als Dienst, damit Jobs deren gh-Anmeldung und mise-Einrichtung sehen.',
      'Der Runner-Download wird vor der Registrierung gegen seine SHA256 geprüft.',
      'Dieses Repo ist öffentlich, daher läuft sein eigenes CI auf GitHub-Runnern. Ein Fork-PR auf dem PC-Runner würde seinen Code auf dem PC ausführen.',
    ],
    performance: [
      'Der Server sendet If-None-Match, da ein 304 nichts vom Limit kostet, und teilt jede Antwort 20 Sekunden lang über alle Tabs.',
      'Die ersten 2 Runner tragen das Label heavy, damit Gradle-, Cargo- und Tauri-Jobs nicht kriechen, wenn 8 zugleich laufen.',
      'Das Dashboard baut in den Ordner, den die laufende Seite nicht ausliefert, sodass die Seite nur für den Tausch stoppt.',
    ],
    operations: [
      'Die Update-Aufgabe läuft alle 5 Minuten und bei der Anmeldung, setzt den Checkout auf das neueste Release-Tag und startet nur die Installer neu, deren Dateien sich bewegt haben.',
      'Release startet nach Checks über workflow_run, und fehlgeschlagene Checks brechen den Build ab.',
      'Der Seitenserver stoppt alle 10 Sekunden Läufe, die ein neuerer Commit ersetzt hat, und protokolliert jeweils den Grund.',
    ],
    tradeoffs: [
      'Eigene Runner statt GitHub-gehosteter, damit private Repos 0 Minuten kosten. CI steht, wenn der PC aus ist.',
      'Repo-Variablen statt eines Routen-Jobs je Workflow, der jedem Lauf einen zusätzlichen Job hinzufügen würde.',
      'Eine geplante Aufgabe statt eines Windows-Dienstes, dem mise und die gh-Anmeldung der Person fehlen. Die Seite erkennt einen lebenden Runner an seinen Log-Dateien.',
      'Eine Next.js-Serverseite statt Grafana, mit SVG-Diagrammen aus dem eigenen Verlauf. Sie haben keinen Zoom.',
    ],
  },
  features: {
    'Mac setup':
      'Ein POSIX-sh-Skript installiert Homebrew-Werkzeuge, mise und die Shell. Danach setzt es die Git-Konfiguration und klont die Repos der Organisation. Ein zweiter Lauf überspringt, was schon da ist.',
    'Windows setup':
      'Ein PowerShell-Skript installiert dieselben Werkzeuge über winget und mise, mit Python und einem Rust-Compile-Cache. Es überspringt die reinen Mac-Teile und was schon da ist.',
    'Self-hosted CI runner':
      'Die Runner-Skripte laden den GitHub-Runner, prüfen seine SHA256 und registrieren 4 Runner auf Windows. Die ersten 2 nehmen die Gradle-, Cargo- und Tauri-Jobs.',
    'Start button':
      'Ein Doppelklick bringt den Checkout auf das neueste Release und startet die geänderten Installer neu. Dann startet er die Aufgaben für Runner und Seite und öffnet die Seite.',
    'CI status page':
      'Ein Next.js-Server liest Runner, Läufe und Jobs aus der GitHub-API und den Runner-Ordnern dieses PCs. Die Fortschrittsbalken stammen aus den 10 letzten fertigen Läufen.',
    'Build cancellation':
      'Concurrency im Workflow bricht ältere Läufe auf GitHub ab. Alle 10 Sekunden stoppt der Seitenserver zudem ersetzte Läufe und Releases mit roten Checks und schreibt jeden Grund in eine Datei.',
    'Cloud runners first':
      'Der Seitenserver zählt die freien Minuten bei Blacksmith und GitHub. Er setzt in jedem privaten Repo eine Runner-Variable, und ohne sie fallen Jobs auf die PC-Labels zurück.',
    Releases:
      'Server Actions starten den Release-Workflow einer App oder bauen ihr APK aus main in einem temporären Klon. Danach installiert adb das APK auf dem angeschlossenen Telefon.',
    'Updates by themselves':
      'Eine geplante Aufgabe läuft alle 5 Minuten und bei der Anmeldung. Sie bringt den Checkout auf das neueste Release-Tag und startet nur die Installer neu, deren Dateien sich änderten.',
    Sites:
      'Die Seite liest einmal pro Stunde die Workflows jedes Repos und findet den, der eine Website ausrollt. Der Knopf startet ihn auf main.',
    'CI trends':
      'Der Seitenserver liest alle 10 Minuten die fertigen Läufe und hält 90 Tage in einer JSON-Datei. Die Diagramme zeichnet er als SVG auf dem Server.',
  },
};

export default arch;

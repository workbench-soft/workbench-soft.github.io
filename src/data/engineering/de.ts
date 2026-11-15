import type { Engineering } from './types';

export default {
  title: 'Wie der Code entsteht',
  intro:
    'Alle Repos folgen denselben Regeln für Code, Tests, Specs und Doku. Coding-Agenten tippen das meiste, und die Regeln halten ihre Arbeit klein, geprüft und dokumentiert.',
  numbers: {
    title: 'Der Code heute',
    source: 'Gezählt aus {repos} Repos auf GitHub am {date}. Die Zählung läuft bei jedem Deploy und jede Nacht neu.',
    languages: 'Zeilen nach Sprache',
    other: 'Andere',
    metrics: {
      lines: ['Codezeilen', 'Nicht leere Quelltextzeilen, ohne gebauten oder fremden Code.'],
      files: ['Quelldateien', 'Jede Datei in einer Programmiersprache.'],
      functions: ['Funktionen', 'Benannte Funktionen und Methoden, aus dem Syntaxbaum.'],
      types: ['Typen', 'Klassen, Interfaces, Structs, Enums und Traits.'],
      tests: ['Tests', 'Testfälle in Vitest, Rust, Kotlin, Swift und Python.'],
      modules: ['Module', 'npm-Pakete, Rust-Crates und Gradle-Module.'],
      smallFiles: ['Dateien unter 100 Zeilen', 'Der Anteil der Quelldateien, die zur 100-Zeilen-Regel passen.'],
      medianLines: ['Mediandatei', 'Die Hälfte der Quelldateien ist so lang oder kürzer.'],
      specs: ['Specs', 'Feature-Specs im Ordner specs jedes Repos.'],
      docs: ['Doku-Seiten', 'READMEs und die Seiten im Ordner docs jedes Repos.'],
      commits: ['Commits in 30 Tagen', 'Commits auf dem Hauptbranch jedes Repos.'],
      prs: ['PRs in 30 Tagen gemergt', 'Gemergte Pull Requests in der ganzen Organisation.'],
    },
  },
  topics: [
    {
      id: 'code',
      title: 'Kleiner, schlichter Code',
      lead: 'Code ist beim ersten Lesen klar, und jede Datei hat eine Aufgabe.',
      points: [
        ['Unter 100 Zeilen', 'eine Datei bleibt unter 100 Zeilen. Eine längere wird nach Aufgabe geteilt.'],
        ['Erst wiederverwenden', 'neuer Code beginnt mit einer Suche im Repo und in den gemeinsamen Paketen.'],
        ['Erst eine Bibliothek', 'eine gepflegte Bibliothek schlägt selbst geschriebenen Code.'],
        ['Gemeinsame Pakete', 'Code, den 2 Apps brauchen, zieht in ein Paket um, das beide installieren.'],
        ['Strikt', 'TypeScript läuft im Strict-Modus, und die Linter scheitern schon an einer Warnung.'],
      ],
    },
    {
      id: 'tests',
      title: 'Geprüft auf jeder Stufe',
      lead: 'Eine Änderung durchläuft dieselben Prüfungen am PC, in CI und auf einem echten Handy.',
      points: [
        ['Vor dem Push', 'ein git-Hook führt Lint, Formatprüfung und Typprüfung aus.'],
        [
          'CI bei jedem Push',
          'Prüfungen und Release-Build starten zusammen. Eine fehlgeschlagene Prüfung bricht den Build ab.',
        ],
        ['Unit-Tests', 'Vitest, cargo test und Gradle-Tests laufen in jedem Repo mit mise run test.'],
        [
          'Echte Geräte',
          'gemergte Arbeit wird auf einem echten Handy installiert oder im Browser geöffnet, Ablauf für Ablauf.',
        ],
        ['Katalog-Tests', 'ein Test schlägt fehl, wenn einer Sprache ein Text fehlt, den Englisch hat.'],
      ],
    },
    {
      id: 'specs',
      title: 'Eine Spec je Feature',
      lead: 'Jedes Feature hat eine Spec im Repo, geschrieben vor dem Code.',
      points: [
        ['Erster Commit', 'die Spec oder ihr neuer Eintrag landet vor jedem Code.'],
        ['Kurzfassung oben', 'zuerst eine kurze Zusammenfassung, dann Abläufe, Module, Daten und Grenzen.'],
        ['Verlauf darunter', 'jede Änderung fügt einen Eintrag mit Datum, Grund, Dateien und Schritten hinzu.'],
        ['Bleibt erhalten', 'Specs bleiben nach dem Merge, damit der Grund hinter dem Code bleibt.'],
      ],
    },
    {
      id: 'docs',
      title: 'Doku in derselben Änderung',
      lead: 'Eine Änderung aktualisiert jedes Dokument, das sie veralten lässt, im selben Commit.',
      points: [
        ['Jedes Repo', 'ein README, ein Changelog, eine To-do-Liste und die Specs.'],
        ['Jede App', 'die Architektur mit Diagrammen, die Nutzerabläufe und die Funktionen.'],
        [
          'Geprüft',
          'ein Skript prüft, dass jedes Feature in der Doku seine Spec und seine Zeile auf dieser Seite hat.',
        ],
        ['Einfache Wörter', 'Doku, Commits und PRs folgen einem Schreibleitfaden: erst die Antwort, kurze Sätze.'],
        ['9 Sprachen', 'jeder Text, den ein Mensch sieht, erscheint in derselben Änderung in 9 Sprachen.'],
      ],
    },
    {
      id: 'agents',
      title: 'Coding-Agenten mit Regeln',
      lead: 'Claude Code, Codex und Kimi Code lesen dieselben Regeln und Skills.',
      points: [
        [
          'Regeln als Dateien',
          'jedes Repo hat eine eigene AGENTS.md, und eine gemeinsame Datei legt Stack und Aufbau fest.',
        ],
        [
          'Skills',
          'ein Skill pro Aufgabe: ausliefern, prüfen, testen, veröffentlichen. Die öffentlichen liegen in agent-skills.',
        ],
        [
          'Eine Aufgabe, ein Worktree',
          'jede Sitzung reserviert ihre Dateien, arbeitet im eigenen git worktree und mergt per PR.',
        ],
        ['Archon', 'ein Launcher am PC startet pro Aufgabe eine Sitzung und zeigt, was jede gerade tut.'],
        [
          'Lehren',
          'ein Schritt, der einen Agenten einen Versuch kostete, wird zur Regel, und die nächste Sitzung überspringt ihn.',
        ],
      ],
    },
    {
      id: 'tools',
      title: 'Ein Werkzeug je Aufgabe',
      lead: 'Jedes Repo nutzt dieselben Werkzeuge in denselben Versionen.',
      points: [
        ['Festgelegt', 'mise legt jede Werkzeugversion fest, und die Lockfiles liegen in git.'],
        ['Neueste stabile', 'ein neues Werkzeug startet mit seinem neuesten stabilen Release.'],
        ['Gemeinsam aktualisiert', 'ein Major-Sprung eines gemeinsamen Werkzeugs geht in jedes Repo, das es nutzt.'],
        ['Kostenlos', 'jedes Werkzeug und jeder Dienst ist kostenlos oder bleibt im Gratis-Tarif.'],
      ],
    },
  ],
  stack: {
    title: 'Der Stack',
    head: ['Aufgabe', 'Wahl'],
    rows: [
      ['Handy- und Web-Apps', 'Expo, React Native und react-native-web, eine Codebasis'],
      ['Desktop-Apps', 'Tauri 2, mit einer Vite- und React-Oberfläche über einem Rust-Kern'],
      ['Logik für jede Plattform', 'ein Rust-Crate, gebaut zu wasm fürs Web und über FFI für Handys'],
      ['Backend', 'Rust auf Cloudflare Workers, mit D1 und R2'],
      ['Geteilte Live-Daten', 'Firestore mit Firebase Auth'],
      ['Statische Seiten', 'Astro auf GitHub Pages'],
      ['Nativer Android-Code', 'Kotlin und Jetpack Compose'],
      ['Skripte', 'TypeScript auf Node'],
      ['TypeScript-Prüfungen', 'Vitest, oxlint, oxfmt, knip und tsc'],
      ['Rust-Prüfungen', 'clippy, rustfmt und cargo-shear'],
    ],
  },
} satisfies Engineering;

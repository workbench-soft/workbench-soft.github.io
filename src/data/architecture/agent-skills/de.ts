import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Schlichte Skills in Markdown und ein paar Skripte, ohne Server und ohne Build. Ein Installer verknüpft einen Klon mit jedem Coding-Agenten auf dem Rechner, und CI prüft die Skills vor jedem Release.',
  parts: [
    {
      name: 'Agent-Skills-Format',
      role: 'jeder Skill ist ein Markdown-Ordner, den ein Agent lädt, wenn eine Anfrage passt.',
    },
    {
      name: 'Installer in POSIX Shell',
      role: 'verknüpft den Klon mit Claude Code, Codex, Kimi Code und weiteren Agenten, mit einer PowerShell-Hülle für Windows.',
    },
    { name: 'Git Hooks', role: 'verknüpfen die Skills nach einem Pull, Merge oder Checkout neu.' },
    {
      name: 'Node-Skripte',
      role: 'fügen die Agenten-Hooks in die Einstellungen jedes Agenten ein und kopieren die MCP-Server.',
    },
    {
      name: 'turn-voice-Hook',
      role: 'ein C#-Player für Windows und ein Node-Zwilling für den Mac sprechen das Ende eines Zugs.',
    },
    {
      name: 'Prüfungen in Python und TypeScript',
      role: 'prüfen das Skill-Format, die Schlüsselwörter und die Länge jedes Skills.',
    },
    {
      name: 'GitHub Actions',
      role: 'führt die Prüfungen auf Windows und Linux aus und setzt dann ein datiertes Release.',
    },
  ],
  flow: [
    'Eine Person klont das Repo und startet den Installer.',
    'Der Installer verknüpft jeden Skill-Ordner mit jedem gefundenen Agenten.',
    'Der Agent liest zu Beginn einer Sitzung die Beschreibung jedes Skills.',
    'Eine passende Anfrage lädt den ganzen Skill, und der Agent folgt seinen Schritten.',
    'Am Ende des Zugs spricht der Voice-Hook das Ergebnis.',
  ],
  links: [
    {
      to: 'agent-skills-private',
      text: 'Dort liegen die privaten Regeln und Skills des Inhabers, neben diesen öffentlichen.',
    },
    { to: 'Claude Code', text: 'Der Installer verknüpft die Skills und fügt die Hooks in seine Einstellungen ein.' },
    { to: 'Codex', text: 'Dieselben Skills, die Hooks und eine Kopie der MCP-Server aus Claude Code.' },
    { to: 'GitHub', text: 'Die Prüfungen und die datierten Releases laufen auf GitHub Actions.' },
  ],
  features: {
    'Writing style':
      'Eine kurze Regeldatei lädt bei jedem Zug über die Haupt-Regeldatei des Agenten. Der volle Skill lädt vor dem ersten Text, mit Worttabellen und einer Schlussprüfung.',
    'Code review':
      'Der Skill review liest den PR oder den Diff und prüft jedes Problem am Code. Zurück kommt eine Tabelle mit der Zeile, der Eingabe, die bricht, und dem Fix.',
    'Reviewer lenses':
      'Der Skill reviewer wählt die Blickwinkel für einen Diff oder ein Repo und startet einen Subagenten pro Blickwinkel. Ein Fachblick wie Recht oder SEO lädt seinen eigenen Skill.',
    'Pull requests':
      'Der Skill create-pr schreibt den Text und öffnet oder aktualisiert den PR mit der GitHub CLI. Mermaid-Diagramme zeigen jeden Ablauf vorher und nachher.',
    'Review comments':
      'Der Skill address-comments liest jeden offenen Thread über die GitHub CLI. Jeder Fix wird ein eigener Commit, und die Antwort nennt seinen SHA.',
    'Ticket to merge':
      'Der Skill implement-ticket liest Jira über den MCP-Server von Atlassian oder dessen CLI. Der Plan landet in den Specs des Repos, und jeder Commit trägt den Ticket-Schlüssel.',
    'App audit':
      'Der Skill app-audit startet die Blickwinkel des Reviewers, jeder Agent in seinem eigenen Git-Worktree. Der Haupt-Agent holt die sicheren Fixes auf einen Branch und merged den PR.',
    'Specs first':
      'Der Skill specs hält eine Markdown-Datei pro Feature im Repo. Jede Änderung fügt im ersten Commit einen datierten Eintrag hinzu, vor dem Code.',
    'One-pager':
      'Der Skill one-pager schreibt zuerst den vollen Text. Dann setzt er oben eine Zusammenfassung auf einer Seite, die keine eigenen Fakten hinzufügt.',
    'Commands through mise':
      'Der Skill mise führt jede Aufgabe über mise run aus und jeden anderen Befehl über mise x. Ein neues Tool kommt mit fester Version in die mise-Konfiguration des Repos.',
    Translations:
      'Der Skill translations wählt das i18n-Tool für den Stack und fügt jeden Text in jeden Katalog ein. Ein Test hält die Kataloge auf denselben Schlüsseln.',
    Worktrees:
      'Der Skill git-worktrees legt neben dem Repo einen Ordner mit seinen ignorierten Dateien und Abhängigkeiten an. Nach dem Merge prüft ein Skript den PR und entfernt Ordner und Branches.',
    'Fast JavaScript':
      'Der Skill javascript hält Regeln aus den React Best Practices von Vercel, ohne die React-Teile. Jeder Befund nennt die Regel, die Zeile und ihre Kosten.',
    Architecture:
      'Der Skill architecture schreibt den Entwurf mit Diagrammen und einer Entscheidung pro Wahl in die Doku des Repos. Lint oder CI setzen dann die Schichtregeln durch.',
    Monorepos:
      'Der Skill monorepo wählt den Task-Runner und einen Workspace pro Sprache. Ein API-Schema erzeugt einen Client pro Plattform, und CI baut nur die betroffenen Apps.',
    'History reset':
      'Der Skill reset-history sichert ein Git-Bundle außerhalb des Repos und baut dann einen Commit aus dem Hauptbranch. Er fragt einmal und pusht mit Force und Lease.',
    'Rewrite a repo':
      'Der Skill rewrite-repo hält das Verhalten fest und plant eine Umbenennungsliste für Code und Doku. Am Ende steht ein frischer Commit anstelle der Historie.',
    'Help on a site':
      'Der Skill guide-on-site steuert Ihr eigenes Chrome über Claude in Chrome. Er füllt die bekannten Felder aus und hält bei jedem Schritt, den nur die Person tun kann.',
    'Hung runs':
      'Der Skill hung-process findet unter Windows das Tool, das einen Port oder eine Sperre hält. Er beendet diesen Prozessbaum und wiederholt den Schritt, oder er gibt einen Befehl mit Adminrechten.',
    'Search setup':
      'Der Skill seo-setup findet, wo das DNS liegt, und prüft die Live-Site und das Repo. Dann richtet er Search Console, Bing und Cloudflare Web Analytics im Browser ein.',
    Ads: 'Der Skill ads-setup geht die Dashboards von AdSense und AdMob durch, während die Person angemeldet ist. Er trägt die IDs mit Testwerbung in Debug-Builds in den Code ein.',
    'Google Play release':
      'Der Skill play-release baut ein signiertes Bundle mit neuem Versionscode und hält den Schlüssel außerhalb des Repos. Er rollt es in den internen Test aus und gibt den Testerlink zurück.',
    'Launch in one run':
      'Der Skill launch fragt die gemeinsamen Angaben einmal ab. Dann startet er die Skills für Suche, Werbung und Google Play der Reihe nach und endet mit einer Tabelle der Dienste.',
    Marketing:
      'Der Skill marketing beginnt beim Budget und schreibt die Botschaft und einen Startkalender. Der Plan bleibt in der Doku des Repos, so setzt der nächste Lauf ihn fort.',
    'In-app updates':
      'Der Skill app-update fügt beim Start und beim Zurückkehren eine Prüfung gegen GitHub-Releases ein. Ein Downloadbalken und eine Benachrichtigung folgen, und der Code bleibt aus dem Play-Build.',
    'Names and domains':
      'Ein Skript prüft jeden Namen gegen 3 Domain-Endungen und das australische Unternehmensregister. Es prüft auch die Marken bei IP Australia und braucht keine API-Schlüssel.',
    'Legal risks':
      'Ein Skript prüft die Lizenzen der Abhängigkeiten und die Daten-SDKs im Repo. Der Skill bewertet jedes Risiko in einem Dokument und liefert die sicheren Fixes in einem PR.',
    'App icons':
      'Der Agent zeichnet 10 flache SVG-Icons und zeigt eine Auswahl im Chat. Ein Skript mit resvg exportiert dann die Wahl in jede Größe, die die Plattformen brauchen.',
    'Demo screenshots':
      'Die App läuft mit erfundenen Demodaten, während der Agent Screenshots und kurze Videos aufnimmt. Eine Shot-Liste im Repo lässt den nächsten Lauf dieselben Bilder machen.',
    'Store media':
      'Der Skill store-media nimmt die Screenshots und das Icon aus dem Repo und erstellt jede Größe. Er lädt sie im Browser hoch, während die Person angemeldet ist, und fragt vor einer Prüfung.',
    'End to end walk of a release':
      'Der Skill e2e-walk installiert das neueste Release auf einem Emulator oder Handy und geht jeden Ablauf aus der Doku durch. Er überspringt jedes Löschen und hält die Ablaufliste im Repo.',
    'Hear and pick a voice':
      'Ein Python-Skript holt jede neuronale Stimme von Microsoft über edge-tts und speichert die Clips. Es gibt die ID jeder Stimme aus und macht bei jeder Nummer weiter.',
    'Reddit comments':
      'Der Skill holt beliebte Threads über den Reddit-MCP-Server und behält die, auf die das Repo antworten kann. Playwright tippt den Entwurf in Chrome, und die Person drückt Comment.',
    'Voice at the end of a turn':
      'Ein Hook liest die Markierung in der letzten Zeile und wählt Signal und Satz. edge-tts spricht ihn über einen C#-Player unter Windows und Node auf dem Mac.',
    Install:
      'Ein Installer in POSIX Shell verknüpft einen Klon mit jedem gefundenen Agenten, mit einer PowerShell-Hülle für Windows. Git Hooks im Klon verknüpfen die Skills nach jedem Pull neu.',
    'Agent hooks':
      'Ein Node-Skript fügt die Hook-Gruppen in die Einstellungen von Claude Code und Codex ein. Es kopiert auch die MCP-Server aus Claude Code zu Codex und Kimi Code.',
    Releases:
      'Ein Workflow in GitHub Actions startet, sobald die Prüfungen bei einem Push auf main bestehen. Er setzt einen Tag mit Datumsversion und schreibt die Notizen aus den Commits.',
  },
};

export default arch;

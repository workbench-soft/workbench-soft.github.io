import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Kotlin-App für Android liest die öffentlichen GitHub-Releases des Studios und installiert jede APK über Shizuku. Einen eigenen Server hat sie nicht.',
  parts: [
    {
      name: 'Kotlin und Android Views',
      role: 'ein Bildschirm aus einfachen Views mit einer Karte pro App und Ziehen zum Aktualisieren.',
    },
    { name: 'GitHub Releases API', role: 'die Quelle der neuesten APK jeder App, mit ihren Notizen und Commits.' },
    { name: 'Shizuku', role: 'führt jede Installation als Shell-Nutzer aus, daher zeigt Android keine Rückfrage.' },
    { name: 'Android-Paketmanager', role: 'liefert Name, Paketname und Version jeder installierten App.' },
    { name: 'Update-Lauf', role: 'hält die Warteschlange außerhalb des Bildschirms und lädt jede APK in Stücken.' },
    {
      name: 'Shared Preferences',
      role: 'speichern die letzte Release-Liste und die in einem Lauf gelernten Paketnamen.',
    },
    { name: 'Studio-Katalog', role: 'eine JSON-Datei der Studio-Website mit Name und Plattformen jedes Projekts.' },
  ],
  flow: [
    'Die Person öffnet die App, kehrt zurück oder zieht die Liste nach unten.',
    'Die App liest jede Release-Seite von GitHub oder eine Liste unter 10 Minuten.',
    'Sie ordnet jede APK über Name oder Paketname einer installierten App zu.',
    'Der Studio-Katalog benennt jede Karte und ergänzt Projekte ohne APK.',
    'Ein Tipp lädt die APK, und Shizuku installiert sie ohne Rückfrage.',
    'Der Updater installiert sich zuletzt, und das Handy öffnet ihn neu.',
  ],
  links: [
    {
      to: 'GitHub',
      text: 'Das gemeinsame öffentliche Release-Repo hält die APK jeder App, daher braucht das Handy kein Token.',
    },
    { to: 'Shizuku', text: 'Die Shizuku-App gibt dem Shell-Nutzer das Recht, Apps zu installieren und zu entfernen.' },
    { to: 'Workbench Soft site', text: 'Die Website baut den App-Katalog aus ihrer eigenen Projektliste.' },
    { to: 'archon', text: 'Archon liefert keine APK, daher trägt seine Karte einen Link zum Öffnen.' },
  ],
  design: {
    scale: [
      'Ein Bildschirm auf dem eigenen Handy des Entwicklers, mit einer Karte pro veröffentlichter Studio-App.',
      'Die GitHub-API erlaubt 60 Aufrufe pro Stunde ohne Anmeldung, was den Listen-Cache von 10 Minuten geprägt hat.',
    ],
    data: [
      'Keine Datenbank. Shared Preferences halten die letzte Release-Liste mit Notizen und Namen und die in einem Lauf gelernten Paketnamen.',
      'Ein Asset-Schlüssel ist das Tag-Präfix plus der APK-Name ohne Version und Plattformendung, etwa farnear/farnear.',
      'Die installierten Apps kommen bei jeder Prüfung vom Android-Paketmanager.',
    ],
    interfaces: [
      'Die GitHub-Releases-API des gemeinsamen öffentlichen Release-Repos listet jede APK seitenweise, und die Compare-API liefert Commit-Notizen.',
      'Die Studio-Seite liefert einen Katalog als JSON mit Name, Plattformen und Link jedes Projekts.',
      'Shizuku führt sh -c als Shell-Nutzer aus, mit pm install -r -d -S und pm uninstall.',
    ],
    reliability: [
      'Schlägt die GitHub-Prüfung fehl, erscheint die gespeicherte Liste, und ein Öffnen wartet eine Minute, bevor es neu fragt.',
      'Der Update-Lauf lebt außerhalb der Activity, daher überlebt er eine Drehung, und Abbrechen stoppt vor dem nächsten Block.',
      'Ein blockierender Build wird nur bei einem Signatur- oder Versionskonflikt entfernt, und der Exit-Status zeigt eine fehlgeschlagene Neuinstallation.',
    ],
    security: [
      'Sie liest nur öffentliche Releases und hält weder Token noch Konto.',
      'Das Installationsrecht kommt aus der Shizuku-Freigabe der Person, und die App führt keinen Root-Befehl aus.',
      'Die eigene Installation prüft die Dateigröße der APK vor dem Installieren.',
    ],
    performance: [
      'APKs laden in Blöcken zu 64 KB mit Timeouts und einer Stopp-Prüfung.',
      'Die Release-Liste bleibt 10 Minuten frisch, daher überspringen die meisten Öffnungen die API.',
      'Notizen für Karten ohne sie laden im Hintergrund über die Compare-API, nachdem die Karten erscheinen.',
    ],
    operations: [
      'Checks führen ktlint, shellcheck, shfmt, actionlint, markdownlint, Unit-Tests und den Debug-Build auf einem eigenen Runner aus.',
      'Release baut eine signierte APK neben den Checks, und release-gate.sh veröffentlicht sie, sobald die Checks bestehen.',
      'Der Job setzt ein Datums-Tag und legt ein Updater-Release im öffentlichen Release-Repo an, die letzten 3 bleiben.',
    ],
    tradeoffs: [
      'Shizuku statt des System-Installers, damit Installationen keine Abfrage brauchen, zum Preis eines Starts nach jedem Neustart.',
      'Schlichte Views statt Compose, für einen Bildschirm und die Shizuku-Java-API, zum Preis von handgebautem Layout.',
      'Ein öffentliches Release-Repo statt privater App-Repos, damit das Handy kein Token braucht, zum Preis der Grenze von 60 Aufrufen pro Stunde.',
      'Die eigene APK kommt zuletzt und mit einem Shell-Befehl, da eine Installation den laufenden Prozess beenden kann.',
    ],
  },
  features: {
    'Update all':
      'Der Update-Lauf reiht jede veraltete App ein und lädt sie in Stücken von 64 KB. Shizuku installiert jede als Shell-Nutzer, und Abbrechen stoppt vor dem nächsten Stück.',
    'Self update':
      'Der Updater erscheint in denselben Releases unter eigenem Tag und installiert sich zuletzt. Ein Shell-Befehl über Shizuku installiert ihn und öffnet die App nach dem Ende des alten Prozesses.',
    'Update one app':
      'Der Button Aktualisieren einer Karte startet denselben Download und dieselbe Installation über Shizuku für eine APK. Nach einem Fehler bleibt der Button für einen neuen Versuch.',
    'Install a missing app':
      'Eine APK ohne Treffer unter den installierten Apps bekommt einen Button Installieren. Shizuku installiert sie wie ein Update.',
    'App list':
      'Jede veröffentlichte APK bekommt eine Karte, über Name oder Paketname den installierten Apps zugeordnet. Der Studio-Katalog ergänzt eine Karte mit Link für jedes Projekt ohne APK.',
    'Saved list offline':
      'Shared Preferences halten die letzte Release-Liste mit Notizen und Namen. Scheitert GitHub, zeigt die App diese Liste, und ein Öffnen innerhalb von 10 Minuten spart die API.',
    'Shizuku setup':
      'Ein Setup-Modul findet den fehlenden Shizuku-Schritt und öffnet dafür Google Play oder die Shizuku-App. Das angetippte Update läuft, sobald der Zugriff erteilt ist.',
    'Release notes':
      'Die App bereinigt die Notizen jedes GitHub-Releases. Sind sie leer, liest sie im Hintergrund die Commits aus dem Vergleichslink des Releases.',
  },
};

export default arch;

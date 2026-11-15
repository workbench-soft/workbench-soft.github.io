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

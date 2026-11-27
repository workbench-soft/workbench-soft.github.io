import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Expo-App ist die Website, die Android-App und die iOS-App. Ein Cloudflare Worker in Rust liefert die Website, die Spiele aus R2 und die Admin-API auf einer Domain.',
  parts: [
    { name: 'Expo und React Native', role: 'Katalog, Spielseite, Einstellungen und Admin, in 9 Sprachen.' },
    { name: 'Rust Worker', role: 'liefert den Web-Export, /content/* aus R2 und /api/* für Admin und Premium-Spiele.' },
    { name: 'Cloudflare R2', role: 'hält index.json, eine JSON-Datei pro Spiel und die Bilder als WebP.' },
    { name: 'Workbench-Konto', role: 'prüft das gemeinsame Abo, das Premium-Spiele öffnet und Werbung ausblendet.' },
    { name: 'AdMob und AdSense', role: 'Banner in der App und auf der Website.' },
  ],
  flow: [
    'Die App lädt /content/index.json mit den Listen und Karten.',
    'Suche und Filter laufen auf dem Gerät und stellen keine Anfrage.',
    'Eine Karte öffnet /content/games/<id>.json, ein Premium-Spiel /api/premium/<id> mit dem Google-ID-Token.',
    'Ein Schreibvorgang im Admin baut index.json neu und leert es im Edge-Cache.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers, R2 und der Edge-Cache.' },
    { to: 'account.workbench-soft.com', text: 'Sagt, ob das Google-Konto das Workbench-Abo hat.' },
    { to: 'Google Play', text: 'Verkauft den Workbench-Plan in der Android-App.' },
    { to: 'GitHub', text: 'Hält die signierten APK-Releases auf workbench-soft.github.io.' },
  ],
  design: {
    scale: [
      'Eltern und Fachleute, meist russischsprachig, lesen einige Spiele auf einmal.',
      'Ein Katalog mit Hunderten Spielen passt in eine Indexdatei, die das Gerät filtert.',
    ],
    data: [
      'Jedes Spiel ist eine JSON-Datei mit Alter, Blöcken, Zielen und Abschnitten. Die Listen stehen in index.json.',
      'Ein Premium-Spiel liegt unter premium/ in R2, außerhalb der öffentlichen Pfade.',
    ],
    interfaces: [
      'GET /content/* liefert die R2-Dateien. /api/premium/<id> nimmt ein Google-ID-Token.',
      '/api/admin/* nimmt ein Token aus dem Admin-Passwort und schreibt Spiele, Bilder und Listen.',
    ],
    reliability: [
      'Die App behält eine Kopie des Index und jedes geöffneten Spiels und zeigt sie offline.',
      'Eine Anfrage, die länger als 15 Sekunden wartet, gilt als fehlgeschlagen, und der Bildschirm zeigt den Fehler statt einer Ladezeile.',
    ],
    security: [
      'Admin-Passwort und Sitzungsgeheimnis sind Worker-Secrets und liegen in Bitwarden.',
      'Der Worker liest ein Premium-Spiel erst, wenn account.workbench-soft.com den Plan bestätigt.',
    ],
    performance: [
      'index.json bleibt 60 Sekunden im Browser und 300 im Edge-Cache. Bilder bleiben ein Jahr.',
      'Bilder sind WebP mit einem Hash im Namen, also braucht ein neues Bild kein Leeren des Caches.',
    ],
    operations: [
      'Checks führt Lint und Tests bei jedem Push auf main auf den PC-Runnern aus.',
      'Release baut das signierte APK, öffnet es im Emulator und veröffentlicht es als neurohop-v<version>. Deploy liefert den Worker aus.',
    ],
    tradeoffs: [
      'Eine Expo-App für Website und Telefone statt einer nativen App, damit jede Funktion einmal erscheint.',
      'Filter auf dem Gerät statt einer Such-API, weil der ganze Katalog in eine kleine Datei passt.',
    ],
  },
  features: {
    'Catalog with filters and search':
      'catalog/ filtert index.json auf dem Gerät: Häkchen in einer Gruppe erweitern die Liste, Gruppen engen sie ein. Eine Karte ohne Bild bekommt die Farbe ihres ersten Blocks.',
    'Game page':
      'game/ lädt die Spieldatei über ihre ID und zeichnet jeden Abschnitt. Jedes Spiel hat eine eigene Route, also öffnet ein geteilter Link es.',
    'Premium games':
      'Der Worker fragt account.workbench-soft.com mit dem Google-ID-Token und liest dann premium/<id>.json aus R2.',
    'Free game of the week':
      'pro/free-game.ts wählt das Spiel mit freePick aus @workbench-soft/taste, nach der Woche auf dem Gerät. Der Worker hält dieselbe Regel in Rust und liefert dieses Spiel ohne Token.',
    Ads: 'ads/ zeigt AdMob-Banner in der App und AdSense auf der Website und blendet sie bei aktivem Plan aus.',
    'Settings and the Workbench plan':
      'pro/ hält die Paywall, den Kauf über Google Play und useEntitled(). Website und iOS melden sich an, um einen am Telefon gekauften Plan zu öffnen.',
    Admin:
      'admin/ meldet sich mit dem Passwort an, bearbeitet dann Spiele, lädt Bilder hoch und importiert eine CSV über /api/admin/*. Jeder Schreibvorgang baut index.json neu.',
    'App icon and store listing':
      'Das Symbol entsteht aus einem SVG in design/icons/. store/listing.md hält den Play-Text und die Antworten in der Konsole.',
  },
};

export default arch;

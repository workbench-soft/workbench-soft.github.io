import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Rust-Pipeline macht aus offenen Behördendaten statische JSON- und PMTiles-Dateien. Sie gehen mit dem Web-Build auf GitHub Pages, und eine Expo-App liest sie im Web, auf Android und dem iPhone.',
  parts: [
    {
      name: 'Rust-Pipeline',
      role: 'lädt die Quellen, ordnet jede Zeile einem ABS-Vorortcode zu und rechnet die Mediane mit polars.',
    },
    {
      name: 'PMTiles',
      role: 'die Grenzen von Vororten und Postleitzahlen in einer statischen Kacheldatei, geschnitten von der Pipeline.',
    },
    { name: 'GitHub Pages', role: 'liefert den Web-Build und die Datendateien kostenlos aus.' },
    { name: 'Expo und React Native', role: 'Karte, Filter, Vorortkarte und Diagramm im Web und auf den Handys.' },
    {
      name: 'MapLibre und OpenFreeMap',
      role: 'zeichnet die Vorortgrenzen über die Grundkarte und färbt jeden Vorort nach seinem Median.',
    },
    { name: 'TanStack Query', role: 'lädt die Karten- und Vorortdateien, die die Filter verlangen.' },
    { name: 'ts-rs', role: 'schreibt die TypeScript-Typen der Datendateien aus den Rust-Structs.' },
    { name: 'expo-iap und AdMob', role: 'das Banner, Werbung entfernen und Pro auf den Handys.' },
  ],
  flow: [
    'Ein CI-Lauf jeden Montag lädt die Verkaufs- und Mietdateien der Staaten.',
    'Die Rust-Pipeline ordnet jede Zeile einem Vorort zu und rechnet die Mediane.',
    'Die JSON-Dateien und Kacheln gehen mit dem Web-Build auf GitHub Pages.',
    'Die App lädt eine Kartendatei für die gewählten Filter.',
    'MapLibre färbt jeden Vorort, und ein Tipp öffnet seine Vorortkarte.',
  ],
  links: [
    {
      to: 'realestate.com.au',
      text: 'Die Vorortkarten verlinken dort auf dieselbe Suche. Die App liest keine Seite der Website.',
    },
    {
      to: 'Australian Bureau of Statistics',
      text: 'Die Grenzen von Vororten und Postleitzahlen und die Zahlen des Zensus 2021 auf jeder Vorortkarte.',
    },
    { to: 'Google Play', text: 'Werbung entfernen und Property Trends Pro sind einmalige Käufe auf Android.' },
    { to: 'App Store', text: 'Dieselben Käufe auf dem iPhone, sobald das Entwicklerkonto steht.' },
  ],
  design: {
    scale: [
      'Eine statische Seite bedient alle Besucher, mehr Leser kosten das Studio also nichts.',
      'Die Verkäufe kommen aus VIC, NSW und SA, und die Formdatei schneidet 15.358 ABS-Vororte in eine 53 MB große PMTiles-Datei.',
      'Andere Bundesstaaten bleiben grau, weil sie keine freien Verkaufsdaten veröffentlichen.',
    ],
    data: [
      'Jede Filterkombination hat ihre eigene JSON-Datei, denn Mediane lassen sich nicht über Gruppen addieren. Eine Zelle mit unter 5 Verkäufen bekommt keinen Median.',
      'Die Formen liegen in boundaries.pmtiles, mit dem Vorortcode als Feature-ID und ohne Tags.',
      'Eine Vorortdatei hält jeden Typ und jede Grundstücksgröße als Liste aus Zeitraum, Median und Verkäufen. Zensusdateien ergänzen Zahlen aus Census 2021 und SEIFA.',
    ],
    interfaces: [
      'Die App liest statisches JSON und PMTiles über HTTP-Range-Anfragen, ohne eigene API.',
      'Die Rust-Pipeline liest die VIC- und SA-Listen aus CKAN-APIs, NSW-.DAT-Zips und die ABS-Formen.',
      'ts-rs schreibt die TypeScript-Typen jeder Datendatei aus den Rust-Structs.',
    ],
    reliability: [
      'Ein Lizenzwechsel in einer Quelle stoppt den Pipeline-Lauf, damit keine unlizenzierten Daten erscheinen.',
      'Pages tauscht die ganze Seite auf einmal, sodass ein Besucher eine ganze Version liest.',
      'Noch kein Service Worker, die installierte Web-App braucht also das Netz.',
    ],
    security: [
      'Keine Anmeldung und kein Server. Google Play prüft Käufe auf dem Handy, ein Handy mit Root kann einen Kauf also fälschen.',
      'Nur offene Daten mit gelisteter Lizenz kommen hinein. NSW-Verkäufe erscheinen auf der werbefreien Website, weil ihre Lizenz nicht kommerziell ist.',
      'Ein geplanter Rust-Worker würde jeden API-Schlüssel in einem Worker-Secret halten, außerhalb des Bundles. Er ist nicht gebaut.',
    ],
    performance: [
      'Vorberechnete Dateien heißen, dass ein Filterwechsel eine JSON-Datei lädt und die Web-Karte die Farben über feature-state tauscht.',
      'Auf Handys baut MapLibre aus der Datei einen match-Ausdruck, denn 15.000 feature-state-Aufrufe würden einzeln über die Bridge gehen.',
      'PMTiles speichert gleiche Kacheln einmal, und ein Deploy überspringt die Pipeline, wenn die Eingaben dem letzten Lauf gleichen.',
    ],
    operations: [
      'Checks führt die TypeScript- und Rust-Jobs nebeneinander auf dem PC-Runner aus: Lint, Typen, Tests und die Web- und iOS-Exporte.',
      'Deploy web läuft nach jedem grünen Release und jeden Montag. Es veröffentlicht ein Release des Site-Repos, und Pages entpackt das neueste.',
      'Das Hosting kostet 0 $: GitHub Pages, eine OpenFreeMap-Basiskarte ohne Schlüssel und ein selbst gehosteter Runner.',
    ],
    tradeoffs: [
      'Statische Dateien auf GitHub Pages statt einer Server-Datenbank, damit das Hosting 0 $ kostet. Die Filter bleiben feste Auswahlen.',
      'Offene Behördendaten statt Scraping eines Portals, das dessen Bedingungen verbieten. Der Preis sind fehlende Zimmerzahlen und graue Staaten.',
      'Eine Rust-Pipeline statt eines Node-Skripts, da NSW jeden Verkauf seit 1990 hält und die Formen schwere Arbeit brauchen.',
      'Eine Expo-Codebasis statt einer reinen Web-Seite, damit die Store-Builds keine zweite App sind. Die Karte braucht 2 Bibliotheken.',
    ],
  },
  features: {
    'Price map':
      'Die Rust-Pipeline rechnet einen Median pro Vorort und Typ für jeden Zeitraum. MapLibre färbt jede ABS-Vorortgrenze in 7 Stufen, geschnitten an den Quantilen.',
    Filters:
      'Jede Mischung der Filter hat ihre eigene JSON-Datei, vorab gebaut. Ein Filterwechsel lädt eine Datei, und die URL hält die Wahl.',
    'Listings on realestate.com.au':
      'Die App baut einen Suchlink für realestate.com.au aus Vorort, Postleitzahl und Typ. Sie liest keine Seite der Website.',
    'Suburb card and history chart':
      'Ein Tipp lädt eine Datei pro Vorort mit Median und Verkäufen jedes Zeitraums. react-native-svg und d3 zeichnen das Diagramm auf jeder Plattform.',
    Search:
      'Die Suche liest eine Indexdatei mit Name, Postleitzahl und Rahmen jedes Vororts. Eine Wahl fliegt die Karte zu diesem Rahmen.',
    Languages:
      'i18next hält die 9 Kataloge, und Intl formatiert Preise und Daten für jede Sprache. Der Browser merkt sich die Wahl.',
    Rents:
      'Die Pipeline rechnet eine mittlere Wochenmiete pro Postleitzahl aus den Kautionsdaten der Staaten und dem VIC Rental Report. MapLibre färbt eine eigene Kacheldatei der Postleitzahlen.',
    'Install from the browser':
      'Ein Web-App-Manifest gibt Namen, Symbole und die Farbe der Titelleiste. Einen Service Worker gibt es noch nicht, also braucht sie das Netz.',
    'Ads and Remove ads':
      'react-native-google-mobile-ads zeigt das Banner nach dem Einwilligungsformular von Google. expo-iap prüft den Kauf von Werbung entfernen bei jedem Start, und der Web-Build schaltet Werbung ab.',
    'Property Trends Pro':
      'expo-iap prüft den Pro-Kauf bei jedem Start mit Google Play oder dem App Store. Eine Prüfung in der App öffnet Mieten und den ganzen Verlauf.',
    'iPhone app':
      'Derselbe Expo-Code baut für iOS und stellt die Tracking-Frage, bevor AdMob startet. Vorerst baut ein macOS-Runner oder EAS die App für den Simulator.',
  },
};

export default arch;

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ein Poller auf GitHub Actions schreibt die staatlichen Spritpreisdaten in Cloudflare D1. Pages Functions lesen D1 für die App und die Suchseiten, und eine Expo-App zeichnet die Karte auf Android, dem iPhone und im Web.',
  parts: [
    {
      name: 'Poller auf GitHub Actions',
      role: 'holt jeden Feed nach Zeitplan und schreibt die geänderten Preise in D1.',
    },
    {
      name: 'Preisfeeds der Staaten',
      role: 'NSW FuelCheck, Servo Saver in VIC, Fuel Prices QLD und FuelWatch WA liefern die Preise.',
    },
    {
      name: 'Quellen für Ladesäulen',
      role: 'Open Charge Map, Transport for NSW und OpenStreetMap, so zusammengeführt, dass jede Säule einmal erscheint.',
    },
    { name: 'Cloudflare D1', role: 'die aktuellen Preise und ein Trigger, der den Tagesverlauf führt.' },
    {
      name: 'Cloudflare Pages Functions',
      role: 'beantworten die App über die API und rendern die Suchseiten und Sitemaps.',
    },
    { name: 'Expo und React Native', role: 'eine Codebasis für Android, das iPhone und die Website.' },
    { name: 'MapLibre und OpenFreeMap', role: 'die Karte im Browser und auf den Handys, mit Kacheln ohne Schlüssel.' },
    {
      name: 'Hey-Servo-Modul',
      role: 'ein Expo-Modul in Kotlin mit einem Offline-Weckwortmodell und dem Sprachdienst von Android.',
    },
  ],
  flow: [
    'Der Poller liest die Feeds der Staaten, für NSW, VIC und QLD stündlich.',
    'Nur geänderte Preise kommen in D1, und ein Trigger ergänzt den Tagesverlauf.',
    'Die App fragt eine Pages Function nach den Tankstellen im Kartenausschnitt.',
    'Der Edge-Cache beantwortet Wiederholungen 5 Minuten lang, D1 den Rest.',
    'Die App färbt jede Nadel nach Preis und listet die Tankstellen.',
  ],
  links: [
    {
      to: 'spotthecam',
      text: 'Hey Servo folgt dem Aufbau von Hey Spot. Eine App hält das Mikrofon für jeden Wecksatz.',
    },
    {
      to: 'keeppad',
      text: 'keepPad und Lumiere teilen sich dasselbe Mikrofon über die Bibliothek wakeshare.',
    },
    {
      to: 'Google Maps',
      text: 'Ein Tipp auf die Route oder ein Hey-Servo-Befehl öffnet die Navigation in Google Maps.',
    },
    { to: 'Google Play', text: 'Werbung entfernen und ServoHop Pro sind einmalige Käufe. AdMob zeigt das Banner.' },
    {
      to: 'GitHub Releases',
      text: 'Jedes Release legt dort die APK ab, und der GitHub-Build aktualisiert sich daraus selbst.',
    },
  ],
  design: {
    scale: [
      'Eine Installation pro Handy ohne Konto, die Last besteht also aus dem Lesen öffentlicher Preise durch Fahrer und Suchmaschinen.',
      'Die kostenlosen Tarife gaben die Form vor: 100k Pages-Anfragen, 100k geschriebene D1-Zeilen und 10 ms CPU pro Anfrage am Tag.',
      'Eine Kartenantwort enthält bis zu 400 Tankstellen für den Ausschnitt auf dem Bildschirm.',
    ],
    data: [
      'D1 hält station, price_now, price_daily, price_report, ev_site und ev_price. Die Stations-ID trägt die Quelle, etwa nsw-1234.',
      'price_now hat eine Zeile pro Station und Kraftstoff. Ein Trigger rechnet jede Änderung in price_daily ein, mit Tiefst, Höchst und Anzahl des Tages.',
      'Das Handy speichert nur die Kraftstoffwahl und die Einstellungen. Die Preise liegen in D1.',
    ],
    interfaces: [
      'Die App ruft JSON-Routen unter /api auf: Stationen im Kartenausschnitt, Verlauf einer Station, Meldungen und Ladepunkte.',
      'Dieselben Functions liefern schlichtes HTML unter /fuel und die Sitemaps für Suchmaschinen.',
      'Der Poller liest WA RSS, die APIs von NSW, VIC und QLD, Open Charge Map und OpenStreetMap und schreibt über wrangler d1 execute.',
    ],
    reliability: [
      'Eine Quelle ohne Schlüssel wird übersprungen, der Job bleibt grün und die anderen Staaten aktualisieren sich weiter.',
      'Jedes Upsert endet auf WHERE price_now.cents <> excluded.cents, ein erneuter Lauf schreibt also keine Zeile doppelt.',
      'Die Abfragen ruhen, solange der eigene Runner ausfällt. Ein Preis erscheint bis zu 5 Minuten später, VIC-Preise kommen 24 Stunden später.',
    ],
    security: [
      'Keine Anmeldung und kein Konto. Der Absender einer Meldung ist ein gesalzener Hash der Adresse, nicht die Adresse.',
      'Eine Meldung besteht eine Prüfung des Preisbereichs und ein Limit von 10 pro Stunde und Absender.',
      'Die Schlüssel der Quellen liegen in GitHub-Actions-Secrets, die nur der Poller liest. Die App hat keine.',
    ],
    performance: [
      'API-Antworten tragen s-maxage=300, und die App rundet den Ausschnitt auf 2 Stellen, sodass nahe Kartenverschiebungen eine zwischengespeicherte Antwort teilen.',
      'Suchseiten werden 30 Minuten gecacht, der Verlauf eine Stunde, die Sitemaps 6 Stunden.',
      'Die mehrere MB große NSW-Liste wird auf dem Runner geparst, weil ein kostenloser Worker nur 10 ms CPU bekommt.',
    ],
    operations: [
      'Die Prüfungen laufen bei jedem Push. Release baut APK und Play-Bundle zugleich, und fehlgeschlagene Prüfungen brechen sie ab.',
      'Deploy web wendet db/schema.sql auf die Live-D1 an und veröffentlicht dann Pages. Jede Anweisung des Schemas ist IF NOT EXISTS.',
      'Abfragen laufen per Cron: stündlich für NSW, VIC und QLD, alle 6 Stunden für Tasmanien, täglich für WA und Ladepunkte.',
    ],
    tradeoffs: [
      'Pages Functions und D1 statt Firebase oder eines bezahlten Servers, damit ein Kartenausschnitt eine SQL-Abfrage im Gratistarif bleibt.',
      'Eine Tagesverdichtung statt einer Zeile pro Abfrage, damit stündliche Abfragen unter dem Schreiblimit bleiben. Ein Tag ohne Änderung hat keine Zeile.',
      'Ein Poller auf GitHub Actions statt eines Worker-Crons, weil das Parsen der NSW-Liste länger als 10 ms dauert.',
      'MapLibre mit OpenFreeMap-Kacheln statt Google Maps, also ohne Schlüssel und Rechnung, dafür mit zwei Karten-Builds.',
    ],
  },
  features: {
    'Fuel prices on a map':
      'Eine Pages Function liefert bis zu 400 Tankstellen im Ausschnitt aus D1. Die App teilt die Preise auf dem Bildschirm in Drittel und färbt die Nadeln.',
    'Your place on the map':
      'Auf den Handys liefert expo-location Position und Kompasskurs. Im Web tun das die Ortungs- und Lageereignisse des Browsers.',
    'Station list':
      'Die Liste zeigt dieselben Tankstellen wie die Karte aus derselben Antwort. Die Entfernung ist die Luftlinie vom Handy.',
    'Price history chart':
      'Eine Pages Function liest die Tageszeilen aus D1, und gemeinsamer Diagrammcode trägt den Preis über Tage ohne Änderung. react-native-svg zeichnet Linie und Band.',
    'Driver price reports':
      'Die App schickt die Meldung an eine Pages Function, die den Bereich und das Stundenlimit pro Absender prüft. Der Preis landet in D1.',
    'EV chargers':
      'Der Poller führt täglich die Ladesäulen aus 3 offenen Quellen zusammen. Meldungen der Fahrer halten den Preis pro kWh jedes Netzes in D1.',
    'Search pages':
      'Pages Functions rendern schlichtes HTML für jeden Staat, Vorort und jede Tankstelle, mit dem Diagramm als SVG. Die Edge hält jede Seite 30 Minuten.',
    'Site text and guides':
      'Ein Build-Schritt schreibt den Text der Startseite in das exportierte HTML. Pages Functions liefern die Ratgeber aus Texten im Repo.',
    'Self-update from GitHub':
      'Die App fragt GitHub Releases nach einer neueren APK und gibt sie an den Android-Installer. Der Google-Play-Build ersetzt den Update-Code durch leere Platzhalter.',
    'Remove ads':
      'expo-iap verkauft das Produkt über Google Play. Der Kauf folgt dem Google-Konto, und Wiederherstellen holt ihn auf ein neues Handy.',
    'ServoHop Pro':
      'expo-iap prüft den Pro-Kauf bei jedem Start. Eine Prüfung in der App öffnet das Diagramm über 365 Tage und blendet die Werbung aus.',
    'Area search':
      'Eine Pages Function findet Vorort oder Postleitzahl in der Tankstellentabelle über 2 Indizes. Sie braucht keinen fremden Geocoder und keinen Schlüssel.',
    'Hey Servo':
      'sherpa-onnx hört den Wecksatz auf dem Handy, und der Sprachdienst von Android hört den Befehl. Die Antwort kommt aus der ServoHop-API.',
    'Fuel panel':
      'Die Wahl setzt den Kraftstoff in jedem API-Aufruf, und die App merkt sie sich für den nächsten Start. Eine Ladesäule zählt nach ihrem stärksten Stecker.',
    Ads: 'react-native-google-mobile-ads zeigt das Banner in der App nach dem Einwilligungsformular. Auf der Website und den Suchseiten füllt es AdSense.',
    Languages: 'i18next hält die 9 Kataloge, und expo-localization liest die Sprache von Handy oder Browser.',
    'Links open the app':
      'intentFilters mit autoVerify in app.config.ts beanspruchen servohop.com, servohop.com/.well-known/assetlinks.json bestätigt das, und src/links/site-link.ts ordnet jeder Adresse eine Route zu.',
    'Open source licences':
      'Beim Build liest scripts/licences.ts die package.json und schreibt src/licences/licences.json, die die Einstellungen anzeigen.',
  },
};

export default arch;

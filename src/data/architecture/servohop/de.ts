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
  },
};

export default arch;

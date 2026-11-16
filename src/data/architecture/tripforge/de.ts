import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Expo-App für Android und das Web fragt einen Rust Worker auf Cloudflare. Der Worker macht jeden Aufruf nach außen und hält die Schlüssel, und ein Rust Crate enthält die Reiselogik.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'eine Codebasis für die Android-App und die Website, über react-native-web.',
    },
    {
      name: 'Rust Worker',
      role: 'die Routen für Orte, Flüge, Sehenswürdigkeiten und Geheimtipps, jede hinter dem Workers Cache.',
    },
    {
      name: 'trip-core',
      role: 'das Rust Crate mit den Datumsfenstern, den Preisen für die Gruppe, dem Preiskalender und den Tags der Orte.',
    },
    { name: 'Travelpayouts', role: 'die Flugpreise und die Partnerlinks zu Aviasales.' },
    {
      name: 'Wikivoyage and Wikidata',
      role: 'die Sehenswürdigkeiten, die Geheimtipps und die Klassen, die sie taggen.',
    },
    { name: 'Google Play', role: 'AdMob-Werbung und die Käufe Werbung entfernen und Pro.' },
  ],
  flow: [
    'Die Person tippt die Orte, ein ungefähres Datum, die Nächte und die Gruppe.',
    'Die App fragt den Worker nach den Orten, dann nach den Flügen.',
    'Der Worker liefert Antworten aus dem Cache und holt den Rest bei Travelpayouts, Wikivoyage und Wikidata.',
    'trip-core berechnet die Reise für die Gruppe und baut den Preiskalender.',
    'Die App zeigt die Angebote, den Kalender und die Links. Gespeicherte Reisen bleiben auf dem Handy.',
  ],
  links: [
    {
      to: 'tickalot',
      text: 'Ein Link trägt die Reise in beide Richtungen, ohne gemeinsames Konto. Tick-a-Lot holt seine Sehenswürdigkeiten vom selben Worker.',
    },
  ],
  design: {
    scale: [
      'Eine Person plant ein paar Reisen im Jahr, daher ist die Last klein. Der kostenlose Cloudflare-Workers-Tarif erlaubt 100.000 Anfragen am Tag.',
      'Alle teilen ein Travelpayouts-Token mit einem Limit pro Minute, daher macht ein kostenloses Telefon 10 Suchen am Tag. Pro hebt das auf.',
    ],
    data: [
      'Der Worker hat keine Datenbank. Jede Antwort von außen liegt bis zum Ablauf ihrer Lebensdauer im Workers-Cache.',
      'Das Telefon hält die Sprachwahl, den Suchzähler, gespeicherte Reisen und die Kauf-Flags in localStorage, unter Android über expo-sqlite.',
      'Eine Reise erreicht Tick-a-Lot im Link als JSON mit v, place, start, nights und bis zu 60 Orten. Kein Server speichert sie.',
    ],
    interfaces: [
      'Der Worker hat 4 GET-Routen: /places, /flights, /sights und /spots. Jede nimmt Query-Parameter und antwortet mit JSON.',
      'trip-core nimmt die rohen Preise und liefert Angebote, für die Gruppe berechnet, den Preiskalender und die Links.',
      'Eine Reise geht als base64url-Hash an Tick-a-Lot, und zurück zum Ask-Bildschirm kommt sie als Query-String mit Orten und Nächten.',
    ],
    reliability: [
      'Die Cache-Laufzeiten sind 6 Stunden für Flugpreise, 7 Tage für Orte und Sehenswürdigkeiten und 30 Tage für Wikivoyage-Seiten.',
      'Ein Fehler, der mit 200 gesendet wird, etwa ein maxlag von MediaWiki oder success:false von Travelpayouts, und ein abgeschnittener JSON-Körper gehen ungecacht zurück.',
      '/spots macht höchstens 6 Aufrufe und weicht auf das englische Wikivoyage aus, wenn die lokale Ausgabe unter 3 Einträge hat.',
    ],
    security: [
      'Der Worker besitzt jedes Geheimnis und jeden Aufruf nach außen. Die App importiert kein Crate und hält keinen Schlüssel.',
      'Es gibt keine Konten. Pro- und Werbe-Flags liegen auf dem Telefon und werden über Google Play gekauft, daher setzt das Löschen der App-Daten den Suchzähler zurück.',
      'Der Wikidata-Aufruf nennt die App in seinem User-Agent, wie Wikimedia es verlangt.',
    ],
    performance: [
      'Jeder Aufruf nach außen steht hinter dem Workers-Cache. Gelesene Wikivoyage-Einträge liegen dort 30 Tage, da das Lesen von London etwa 20 ms CPU kostet, aus dem Cache 1 ms.',
      'Eine Wikidata-Abfrage liefert die Sprachzahlen und Klassen einer ganzen Seite von Einträgen, statt eines Aufrufs pro Ort.',
      'Lange Listen werden über FlashList gezeichnet, daher erscheinen nur die Zeilen auf dem Bildschirm.',
    ],
    operations: [
      'Ein Push auf main startet Checks: Lint, Test und Build. Release und Deploy starten über workflow_run, sobald Checks bestehen.',
      'Release reiht sich ein, damit jedes seine Version nach dem Tag davor wählt, und ein neueres Deploy bricht ein älteres ab.',
      'Deploy liefert den Web-Export und den Worker aus und schlägt dann fehl, wenn einer der Hosts nicht antwortet. Die Rust-Version ist festgelegt, und der Worker baut für wasm.',
    ],
    tradeoffs: [
      'Die Planung läuft im Worker statt in wasm in der App, da Hermes kein wasm ausführt. Der Preis ist keine Offline-Planung.',
      'Gecachte Travelpayouts-Preise statt Duffel oder Scraping: kostenlos, und ein Aufruf sagt, welches Datum am günstigsten ist. Der Preis sind 2 bis 7 Tage alte Preise.',
      'Wikidata und Wikivoyage statt eines Anbieters für Sehenswürdigkeiten: kostenlos, und die Zahl der Wikipedia-Sprachen liefert ein Bekanntheitssignal, das Geheimtipps markiert.',
      'Keine Werbung auf dem Flugbildschirm statt mehr Werbefläche, da Fehlklicks neben Provisionslinks eine Sperre riskieren.',
    ],
  },
  features: {
    Ask: 'Das Formular sucht jeden Ort über den Worker. Ein Link aus Tick-a-Lot füllt das Formular aus seiner Adresse.',
    Flights:
      'Der Worker fragt Travelpayouts für jeden Monat des Fensters und hält die Preise 6 Stunden. trip-core rechnet sie für die Gruppe um und fügt die Links hinzu.',
    Places:
      'Der Worker verbindet die Wikidata-Sehenswürdigkeiten nahe der Stadt mit den Einträgen aus Wikivoyage. Wikidata-Klassen taggen jeden Ort, und die Chips filtern nach diesen Tags.',
    'To Tickalot':
      'Die App packt die Orte, den Start und die Nächte direkt in den Tick-a-Lot-Link. Kein Server speichert die Reise.',
    Settings: 'i18next hält die 9 Kataloge. Die Wahl bleibt auf dem Handy, in SQLite über Expo.',
    Ads: 'AdMob zeigt das Banner und die Vollbildwerbung auf Android. Eine Prüfung entscheidet jede Anzeige aus der Einwilligung und den 2 Käufen.',
    'Tripforge Pro':
      'Google Play Billing verkauft das Produkt, und die App speichert das Kennzeichen auf dem Handy. Ein Modul entscheidet jede Sperre, und die Grenzen stehen in einer Datei.',
    'Website pages for search':
      'Expo schreibt beim Build eine HTML-Seite pro Route und Sprache. Ein Skript setzt dann die Seitensprache, schreibt die 404-Seite und baut die Sitemap.',
    'Dark mode':
      'Jede Farbe ist ein Token mit hellem und dunklem Wert. Das Telefon wählt den Satz nach dem Systemdesign, die Website nutzt CSS-Variablen mit prefers-color-scheme.',
  },
};

export default arch;

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
  },
};

export default arch;

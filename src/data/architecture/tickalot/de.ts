import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Expo-App läuft auf Android und im Web und hält jede Liste in SQLite auf dem Gerät. Eine geteilte Liste geht zusätzlich an Firestore, und die App hat keinen eigenen Server.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'eine Codebasis für die Android-App und die Website, die Firebase Hosting ausliefert.',
    },
    { name: 'SQLite', role: 'jede Liste und jeder Eintrag auf dem Gerät über expo-sqlite, im Browser auf wasm.' },
    {
      name: 'Firestore',
      role: 'die geteilten Listen, die Gänge und die Wege durch den Laden, hinter einer anonymen Anmeldung.',
    },
    {
      name: 'Satz-Parser und Emoji-Wörterbuch',
      role: 'Regeln auf dem Handy, die einen Satz in Einträge teilen und Emoji und Bereich wählen.',
    },
    { name: 'OpenStreetMap', role: 'die Ladensuche und der Laden, in dem das Handy gerade steht.' },
    {
      name: 'Wikipedia and Wikidata',
      role: 'die Stadt und ihre Sehenswürdigkeiten, über den Tripforge Worker, wenn er antwortet.',
    },
    { name: 'Coles and Woolworths', role: 'die Grundpreise, gelesen aus der Suche auf der Website jedes Ladens.' },
    { name: 'Google Play', role: 'AdMob-Werbung und die Käufe Werbung entfernen und Pro über expo-iap.' },
  ],
  flow: [
    'Die Person tippt oder diktiert die Einträge, und der Parser teilt sie.',
    'Das Handy speichert jeden Eintrag sofort in SQLite.',
    'Teilen schickt die Liste an Firestore und öffnet einen Link.',
    'Das zweite Handy öffnet den Link und folgt der Liste in Firestore.',
    'Ein Haken auf einem Handy erscheint in 1 bis 2 Sekunden auf dem anderen.',
  ],
  links: [
    {
      to: 'tripforge',
      text: 'Ein Reiselink aus Tripforge legt eine Liste mit Sehenswürdigkeiten und eine Packliste an. Die Sehenswürdigkeiten verlinken zurück, um Flüge zu planen.',
    },
    { to: 'guitar-upscale', text: 'Ein Song aus Songs zum Lernen öffnet sich in Guitar Upscale zum Mitspielen.' },
    { to: 'Firebase', text: 'Firestore synchronisiert die geteilten Listen, und Hosting liefert die Website aus.' },
    {
      to: 'OpenStreetMap',
      text: 'Nominatim findet einen Laden nach Namen, und Overpass findet den Laden in der Nähe.',
    },
    { to: 'Google Play', text: 'AdMob zeigt die Werbung, und Play Billing verkauft Werbung entfernen und Pro.' },
  ],
  features: {
    'Share by link':
      'Firestore hält eine Kopie jeder geteilten Liste, und der Link trägt ihre zufällige ID. Jedes Handy speichert eine Änderung zuerst in SQLite und sendet sie, sobald das Netz zurück ist.',
    'Base list':
      'Eine Liste aus einer Basis kopiert jeden Basiseintrag und merkt sich, welchem sie folgt. Eine Änderung an der Basis erreicht die Kopien, die die Person nicht geändert hat.',
    'Typing and dictating':
      'Ein Parser mit Regeln auf dem Handy teilt den Satz anhand des Emoji-Wörterbuchs und der Zahlen. expo-speech-recognition macht aus Sprache Text, über den Sprachdienst des Handys.',
    Pictures:
      'Ein Wörterbuch in der App ordnet dem Namen ein Emoji und einen Bereich zu, auf Englisch und Russisch. Ein Foto schrumpft zu einem kleinen JPEG, das im Eintrag mitreist.',
    'The store and the walk through it':
      'Overpass und Nominatim aus OpenStreetMap finden den Laden. Die App lernt die Reihenfolge der Bereiche aus den Haken und speichert sie in SQLite.',
    'Shared aisles':
      'Gänge und Wege liegen in Firestore unter der OpenStreetMap-ID des Ladens. Jedes Handy mit diesem Laden liest sie, und ein getippter Gang geht sofort hoch.',
    'Prices at Coles and Woolworths':
      'Das Handy liest die Suche auf der Website jedes Ladens und hält das erste Produkt einen Tag in SQLite. Der günstigere Grundpreis erscheint grün.',
    'Packing for a trip':
      'Eine Packliste ist eine Kopie einer Basis-Packliste in SQLite. Geteilt wird sie über Firestore wie jede Liste.',
    'Things to see':
      'Die Stadt kommt aus Wikipedia, ihre Orte vom Tripforge Worker oder aus Wikidata. Ein k-means-Schritt auf dem Handy verteilt sie auf die Tage.',
    'Lists that are done':
      'Ein Timer auf dem Handy schiebt eine Liste 3 Stunden nach dem letzten Haken ins Archiv, oder nach 2 Wochen ohne Änderung.',
    'Light and dark':
      'Das Design folgt dem Handy über React Native, oder einer Wahl in den Einstellungen, die auf dem Gerät bleibt.',
    Updates:
      'Der GitHub-Build fragt die GitHub-Releases nach einem neueren APK und öffnet den Android-Installer. Der Google-Play-Build lässt dieses Modul weg.',
    Ads: 'AdMob zeigt die Banner und die Vollbildwerbung nach dem Einwilligungsformular von Google. Google Play Billing verkauft den Kauf Werbung entfernen.',
    'Tick-a-Lot Pro':
      'Google Play Billing verkauft Pro über expo-iap, und die App fragt Play bei jedem Start neu. Ein Modul entscheidet jede Sperre.',
    'The weekly shop for two':
      'Ein Handy baut die Liste aus einer Basis und teilt sie über Firestore. Das andere hakt ab, und jeder Haken kommt in Sekunden zurück.',
    'Songs to learn':
      'Ein Song-Parser teilt den Text nur an Kommas. Jeder Song bekommt Suchlinks zu Guitar Upscale und zu Seiten mit Akkorden, Tabs und Videos.',
    'Changing and deleting':
      'Jedes Feld schreibt in SQLite, sobald die Person es verlässt. Löschen markiert nur die Zeile, so klappen Rückgängig und das zweite Handy.',
    Languages:
      'i18next hält die 9 Kataloge, und expo-localization liest die Sprache des Handys. Der Text der Liste bleibt, wie er getippt wurde.',
    'Finding Tick-a-Lot in search':
      'Nach dem Expo-Export schreibt ein Build-Skript die Ratgeber, About und die Sitemap als schlichtes HTML. Die App-Seiten tragen noindex, da sie Listen einer Person zeigen.',
    'Open source licences':
      'Ein Build-Task sammelt den Lizenztext jedes Pakets in eine Datei in der App. Die Einstellungen listen sie aus dieser Datei.',
  },
};

export default arch;

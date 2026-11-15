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
  design: {
    scale: [
      'Eine private Liste bleibt auf einem Telefon, und eine geteilte Liste erreicht über einen Link einen Haushalt oder ein paar Freunde.',
      'Die App hat keinen Server, daher bestimmt der kostenlose Firestore-Tarif mit 50.000 Lese- und 20.000 Schreibvorgängen am Tag das Budget geteilter Listen.',
    ],
    data: [
      'SQLite auf dem Telefon hält Listen, Einträge, Geschäfte, Gänge, Wege, bekannte Namen und Preise. Die Web-Version läuft mit demselben SQLite auf wasm.',
      'Nur geteilte Listen gehen an Firestore, als lists/{id}/items/{itemId}, und die Gänge und Wege eines Geschäfts als stores/{osmId}.',
      'Ein Löschen setzt deleted = 1 und behält die Zeile. dirty = 1 markiert eine Änderung, die Firestore noch nicht hat.',
      'Ein Foto ist ein JPEG mit 360 Pixeln und etwa 30 KB, im Eintrag abgelegt.',
    ],
    interfaces: [
      'Ein Teilen-Link trägt eine zufällige Listen-ID aus 32 Hex-Ziffern, und ein Intent-Filter von Android öffnet ihn in der App.',
      'Ein Reise-Link von Tripforge trägt base64url-JSON mit v, place, start, nights und bis zu 60 Orten.',
      'Preise kommen aus dem JSON hinter der Suche der Seiten von Woolworths und Coles, Geschäfte von Nominatim und Overpass, Sehenswürdigkeiten vom Tripforge-Worker oder von Wikidata.',
    ],
    reliability: [
      'Jede Änderung wird zuerst in SQLite gespeichert, und der Bildschirm zeichnet daraus, daher geht ein Abhaken ohne Netz. Das Senden wird alle 30 Sekunden wiederholt, solange die App offen ist.',
      'Pro Eintrag gewinnt die neuere updated-Zeit, auf dem Telefon und in den Firestore-Regeln. Zwei Offline-Änderungen am selben Eintrag lassen sich nicht mischen, und die spätere nimmt den ganzen Eintrag.',
      'Der Listener läuft eine Minute, nachdem die App in den Hintergrund ging. Eine geschlossene App bekommt keine Hinweise, dafür braucht es einen Push-Server.',
    ],
    security: [
      'Jede Installation meldet sich anonym bei Firebase an, und die zufällige Listen-ID im Link ist das Geheimnis. Firestore verweigert das Auflisten von Listen.',
      'Die Regeln prüfen die 32-stellige Hex-ID, die bekannten Felder, ihre Größen und eine Zeit, die höchstens einen Tag voraus liegt. Ein Foto muss JPEG-Daten oder ein Bild von Wikimedia Commons sein.',
      'Wer den Link hat, kann die Liste lesen, ändern und löschen, und Firebase App Check ist vorerst aus.',
    ],
    performance: [
      'Das Senden wartet eine halbe Sekunde, daher geht eine Folge von Häkchen in einem Schreibvorgang hinaus.',
      'Preise kommen von Woolworths zu je 3 Namen und von Coles einzeln. Sie bleiben einen Tag in SQLite, und nur die Preise werden neu gezeichnet.',
      'Das Telefon liest die Gänge eines Geschäfts höchstens alle 10 Minuten aus Firestore.',
    ],
    operations: [
      'Checks und Release starten bei jedem Push auf main zusammen. Das Release veröffentlicht die signierte APK, sobald Checks bestehen, und ein fehlgeschlagener Lauf bricht den Build ab.',
      'Ein Google-Play-Bundle wird einmal am Tag um 19:00 Sydney gebaut, und nur wenn sich die App geändert hat.',
      'Firebase Hosting liefert die Web-Version aus, und sie wird nach bestandenen Checks mit den Firestore-Regeln ausgerollt. Die APK von GitHub aktualisiert sich selbst, der Play-Build lässt diesen Code weg.',
    ],
    tradeoffs: [
      'Expo statt einer nativen Kotlin-App, damit ein Code-Stand auch die Seite liefert, auf der sich ein geteilter Link öffnet.',
      'Firestore-Zeilen statt eines eigenen Servers oder WebRTC, daher gibt es keinen Server zu betreiben, und ein Häkchen wartet nicht auf ein schlafendes Telefon.',
      'Die neuere Änderung gewinnt pro Eintrag statt eines Feld-Merge: weniger Code, aber eine ältere Offline-Änderung geht verloren.',
      'Firebase Hosting statt GitHub Pages, weil wasm-SQLite die Header COOP und COEP braucht, die Pages nicht setzen kann.',
    ],
  },
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
    'Long lists':
      'Das Studiopaket fast-scroll umhüllt jede lange Liste. Die Liste folgt dem Regler in jedem Frame, und ein versteckter Regler lässt Tipps durch.',
  },
};

export default arch;

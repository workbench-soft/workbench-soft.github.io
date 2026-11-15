import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Expo-App für Android, das iPhone und das Web hält jede Karte in SQLite auf dem Gerät. Die Wortbasis steckt in der App, und Firestore synchronisiert ein Deck, sobald die Person Geräte koppelt.',
  parts: [
    { name: 'Expo and React Native', role: 'eine Codebasis für Android, das iPhone und das Web.' },
    { name: 'SQLite', role: 'die Karten, die Antworten, die bekannten Wörter und die Bilder auf jedem Gerät.' },
    { name: 'ts-fsrs', role: 'der FSRS-Plan, der festlegt, wann jede Karte wiederkommt.' },
    {
      name: 'Wortbasis',
      role: 'englische und russische Wörter als JSON in der App, gebaut aus offenen Wortlisten und Wiktionary.',
    },
    { name: 'Firestore', role: 'eine Kopie jedes synchronisierten Decks, erreichbar über einen Kopplungscode.' },
    {
      name: 'Gesprächs-Engines',
      role: 'Gemini mit dem eigenen Schlüssel der Person, Qwen 3 auf dem Handy oder das eingebaute Modell von Chrome.',
    },
    {
      name: 'Lautsprecher-Modul',
      role: 'ein lokales Kotlin-Modul, das Wörter mit voller Lautstärke aus dem Lautsprecher spielt.',
    },
    { name: 'Google Play', role: 'AdMob-Werbung und die Käufe Werbung entfernen und Pro über expo-iap.' },
  ],
  flow: [
    'Die Person tippt ein Wort oder startet eine Runde.',
    'Die Suche prüft die Wortbasis, dann Wiktionary und MyMemory.',
    'Die App speichert die Karten in SQLite auf dem Gerät.',
    'FSRS wählt die fälligen Karten, und neue Wörter füllen die Runde.',
    'Die Karte zeigt das Wort, sein Bild und seinen Klang.',
  ],
  links: [
    { to: 'Firebase', text: 'Firestore hält eine Kopie jedes gekoppelten Decks, hinter einer anonymen Anmeldung.' },
    {
      to: 'Wiktionary and MyMemory',
      text: 'Ein getipptes Wort, das in der Basis fehlt, bekommt hier seine Übersetzungen, ohne Schlüssel.',
    },
    { to: 'Wikipedia', text: 'Das Hauptfoto des Artikels zum Wort, mit seinem Commons-Nachweis.' },
    { to: 'Google Gemini', text: 'Gesprächsübung und Themenvorschläge rufen es mit dem eigenen Schlüssel der Person.' },
    { to: 'Google Play', text: 'AdMob zeigt die Werbung, und Play Billing verkauft Werbung entfernen und Pro.' },
  ],
  design: {
    scale: [
      'Ein Lernender pro Installation, alle Karten liegen in SQLite auf dem Gerät. Ein eigener Server des Studios läuft nicht.',
      'Die Wortbasis steckt als assets/words/en.json und ru.json in der App, gebaut aus CEFR-J, Octanove, Wiktionary und OpenRussian.',
      'Kostenlose Dienste setzen die Grenzen: MyMemory liefert etwa 5.000 Wörter pro Tag und Gerät, und die GitHub-Releaseliste erlaubt 60 Aufrufe pro Stunde und Adresse.',
      'Das Gesprächsmodell auf dem Handy braucht etwa 1,2 GB Speicher und 2 GB freien Arbeitsspeicher.',
    ],
    data: [
      'Karten, Wiederholungen, bekannte Wörter und Bilder liegen über expo-sqlite in SQLite, auch im Web.',
      'Eine Karte hält ihren FSRS-Zustand als JSON in memory, und due wird für den Index in eine eigene Spalte kopiert. (lang, term_key) ist eindeutig.',
      'Eine gelöschte Karte bleibt als Flag erhalten, und updated_at lässt beim Sync die spätere Änderung gewinnen.',
      'Einstellungen liegen in localStorage. Bilder bleiben auf jedem Gerät und gehen nicht in den Sync.',
    ],
    interfaces: [
      'Der Sync schreibt jede Karte nach Firestore unter decks/{code}/cards/{lang}_{termKey}, und firestore.rules prüft die Codelänge und jedes Feld.',
      'Ein getipptes Wort geht an die Basis, dann an Wiktionary über kaikki.org, dann an die MyMemory-API. Wikipedia liefert das Titelbild.',
      'Gemini wird vom Gerät mit dem eigenen Schlüssel der Person aufgerufen, und Qwen 3 läuft über react-native-executorch auf dem Handy.',
      'Ein Kotlin-Modul in modules/speaker/ rendert Sprache in eine Datei, und ein Hintergrund-Handler zeichnet das Android-Homescreen-Widget.',
    ],
    reliability: [
      'Jedes Gerät arbeitet allein mit seiner SQLite-Datei, daher läuft die App offline, und der Sync ist eine optionale Schicht darüber.',
      'Beim Sync gewinnt die spätere Änderung eines Worts, und eine gelöschte Karte bleibt als Flag, damit auch das Löschen synchronisiert wird.',
      'Eine Suche fällt von der Basis auf Wiktionary und dann auf MyMemory zurück. kaikki.org sendet keine CORS-Header, daher überspringt der Web-Build es.',
      'Eine reine, getestete Funktion plant eine Woche lokaler Benachrichtigungen, so dass wer die App auslässt, 7 Tage lang eine pro Tag bekommt.',
    ],
    security: [
      'Die anonyme Firebase-Anmeldung gibt ein Konto pro Gerät, und ein Kopplungscode aus 80 Zufallsbits teilt ein Deck ohne Benutzerkonto.',
      'Wer den Code hat, kann dieses Deck lesen und ändern. Wiederholungen, Einstellungen und bekannte Wörter bleiben auf jedem Gerät.',
      'Gemini läuft mit dem eigenen Schlüssel der Person, und außer dem Aufruf der gewählten Engine verlässt keine Nachricht das Gerät.',
      'Der Android-Keystore und sein Passwort sind CI-Geheimnisse, eine Kopie liegt außerhalb des Repos.',
    ],
    performance: [
      'Die Batch-Abfrage liest fällige Karten über den Index cards_due und füllt dann neue Wörter bis zum Tageskontingent auf.',
      'words/complete bietet Basiswörter nach den ersten Buchstaben ohne Netz an, und die Basis lädt bei der ersten Nutzung.',
      'expo-image hält Bilder auf der Platte, und ein leeres Bildergebnis wird nach 30 Tagen erneut abgefragt.',
      'Der Release-Build nutzt seinen behaltenen Ordner android/ wieder, wenn @expo/fingerprint passt, und baut nur das JS neu.',
    ],
    operations: [
      'Die Checks führen Lint, Format, Typen, knip und Vitest zweimal aus: als Android und Web, dann mit Platform.OS auf ios.',
      'Ein Push auf main baut die APK auf einem schweren Runner, und release-gate.sh veröffentlicht, sobald die Checks bestehen. Fehlgeschlagene Checks brechen den Build ab.',
      'Mit gesetztem PLAY_TRACK lädt ein nächtlicher Lauf um 19:00 Sydney-Zeit ein Bundle zu Google Play hoch, und nur wenn sich die App geändert hat.',
      'Die GitHub-APK prüft in der Releaseliste auf einen neueren memoire-v*-Tag. Die Play- und iOS-Builds lassen diesen Code weg.',
    ],
    tradeoffs: [
      'Expo mit React Native statt einer nativen Kotlin-App, damit eine Codebasis Android, iOS und Web baut, auf Kosten einiger Teile nur fürs Handy.',
      'SQLite auf dem Gerät statt Firestore als einziger Speicher, damit die App offline läuft und sofort öffnet, und der Sync optional bleibt.',
      'Ein Kopplungscode statt Google-Anmeldung, damit sich Geräte ohne Konto koppeln, auf Kosten davon, dass jeder mit dem Code das Deck ändern kann.',
      'Der FSRS-Zustand in einer JSON-Spalte statt einer Spalte pro Feld, damit eine Änderung bei ts-fsrs kein neues Schema braucht, doch das JSON ist nicht abfragbar.',
    ],
  },
  features: {
    'Word batches':
      'Ein Runden-Modul nimmt die fälligen Karten aus SQLite, dann neue Wörter aus der Basis bis zum Tagesziel. ts-fsrs legt fest, wann jede Karte wiederkommt.',
    'Ways to ask':
      'Jede Karte nimmt eine Frageart aus den Fähigkeiten, die unter Ziele gewählt sind. Hören liest das Wort mit der Stimme des Handys.',
    'Add a word':
      'Die Suche probiert die eingebaute Basis, dann Wiktionary, dann MyMemory. Vorschläge kommen ohne Netz aus der Basis.',
    Pictures:
      'Die App fragt die Wikipedia-API der gelernten Sprache nach dem Foto des Artikels, nur mit freier Lizenz. expo-image hält es auf dem Gerät, außerhalb der Synchronisierung.',
    'Built in words':
      'Ein Build-Skript verbindet CEFR-J, Octanove, Wiktionary und OpenRussian zu 2 JSON-Dateien. Die App lädt sie beim ersten Gebrauch.',
    'Level test':
      'Der Test mischt Basiswörter jeder Stufe mit erfundenen Wörtern. Ein Wert pro Stufe, abzüglich Raten, legt fest, woher neue Wörter kommen.',
    Topics:
      'Jedes Basiswort trägt seine Themen. Ein getipptes Wort bekommt sie aus Wiktionary, von Gemini oder vom Modell in Chrome.',
    Reminders:
      'Ein Planer auf dem Handy stellt über expo-notifications eine Woche lokaler Benachrichtigungen ein. Er plant neu, sobald die App öffnet oder schließt.',
    'My words':
      'Die Liste liest die Karten aus SQLite auf dem Gerät. Löschen markiert die Karte, damit die Synchronisierung sie mitnimmt.',
    'Look and language':
      'i18next hält die 9 Kataloge, und das Design folgt dem Handy oder den Einstellungen. Beide Wahlen bleiben auf dem Gerät.',
    'Talk practice':
      'Die Szene geht an Gemini mit dem Schlüssel der Person, an Qwen 3 auf dem Handy oder an das Modell in Chrome. Ein Tipp auf ein Wort der Antwort speichert eine Karte.',
    'Sync between devices':
      'Jedes Gerät meldet sich anonym bei Firebase an und schickt geänderte Karten an das Deck seines Codes. Die spätere Änderung eines Worts gewinnt.',
    'Home screen widget':
      'react-native-android-widget zeichnet es im Hintergrund aus SQLite. Es lädt im Abstand von 30 Minuten neu und sobald die App in den Hintergrund geht.',
    'Ads and Remove ads':
      'AdMob zeigt das Banner und die Vollbildwerbung nach dem Einwilligungsformular. Google Play Billing verkauft Werbung entfernen über expo-iap.',
    Sound:
      'Ein lokales Kotlin-Modul schreibt jedes Wort in eine Datei und spielt es mit voller Lautstärke aus dem Lautsprecher. iOS und das Web nutzen die Ausgabe des Systems.',
    'Memoire Pro':
      'Google Play Billing verkauft Pro über expo-iap. Eine Prüfung liest den Kauf und öffnet jeden gesperrten Punkt.',
    Updates:
      'Das GitHub-APK liest die öffentliche Release-Liste und öffnet den Android-Installer. Die Builds für Play und das iPhone lassen dieses Modul weg.',
  },
};

export default arch;

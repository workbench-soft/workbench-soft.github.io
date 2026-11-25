import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'KeepPad ist eine Expo-App, aus der die Android-App, die iPhone-App und die Website entstehen. Notizen bleiben in SQLite auf dem Handy, nur geteilte Notizen gehen zu Firebase.',
  parts: [
    {
      name: 'Expo und React Native',
      role: 'eine Codebasis für Android, iPhone und die Website, mit Screens aus expo-router.',
    },
    {
      name: 'Kotlin-Dienst',
      role: 'der Android-Vordergrunddienst hört Hey Keep, nimmt die Notiz auf und spielt die Antworten.',
    },
    { name: 'sherpa-onnx', role: 'das kleine Schlüsselwortmodell auf dem Handy erkennt die Weckphrasen.' },
    {
      name: 'Spracherkennung des Handys',
      role: 'der Sprachdienst von Android und die Erkennung von Apple machen aus Sprache Text.',
    },
    { name: 'SQLite', role: 'die Notizen, die gesendeten Notizen und die erledigten Eingänge, auf dem Handy.' },
    {
      name: 'Gemini Nano und Apple Foundation Models',
      role: 'das Modell des Handys wählt eine bessere Gruppe, solange die App offen ist.',
    },
    { name: 'Firebase', role: 'Firestore hält die geteilten Notizen, Hosting liefert die Website aus.' },
    { name: 'Google Play', role: 'AdMob-Werbung sowie die Käufe Werbung entfernen und KeepPad Pro.' },
  ],
  flow: [
    'Der Dienst hört „Hey Keep“ auch bei geschlossener App.',
    'Er nimmt die Notiz auf und macht daraus Text auf dem Handy.',
    'Der Dienst schreibt die Notiz in eine kleine Eingangsdatei.',
    'Die App übernimmt sie in SQLite und wählt eine Gruppe nach Wörtern.',
    'Das Modell des Handys verschiebt die Notiz eventuell, und die Liste lädt neu.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Eine Notiz, die mit dem Namen einer Person beginnt, geht per WebDAV in deren Tagebuch auf dem Heim-NAS.',
    },
    {
      to: 'lumiere-player',
      text: 'Mit Wake Share hört der KeepPad-Dienst auch „Hey Lumi“ und reicht es an Lumiere weiter.',
    },
    { to: 'spotthecam', text: 'Dasselbe geteilte Mikrofon reicht „Hey Spot“ an SpotTheCam weiter.' },
    { to: 'Firebase', text: 'Firestore hält geteilte Notizen live, Hosting liefert die Website aus.' },
    { to: 'Google Play', text: 'AdMob zeigt das Banner, Play Billing verkauft Werbung entfernen und KeepPad Pro.' },
  ],
  design: {
    scale: [
      'Eine Person pro Installation. Notizen bleiben auf dem Telefon, und nur eine geteilte Notiz erreicht Firestore, als Text mit bis zu 20.000 Zeichen.',
      'Hey Keep läuft den ganzen Tag als Foreground-Dienst von Android, daher prägte der Akku den Entwurf: Ein Lautstärketor überspringt leise Frames.',
    ],
    data: [
      'SQLite keeppad.db hält Notizen, exports (welche App welche Notiz bekam) und applied_inbox. PRAGMA user_version zählt die Migrationsschritte, die ein Telefon lief.',
      'Aufnahmen sind WAV-Dateien in files/audio. Notizen, die Hey Keep bei geschlossener App aufnimmt, sind JSON-Dateien in files/keep-inbox.',
      'Einstellungen liegen in localStorage. Tokens verknüpfter Apps liegen im Android-Keystore oder in der iOS-Keychain über expo-secure-store.',
      'Eine geteilte Notiz in Firestore hält nur text, group und updated.',
    ],
    interfaces: [
      'Der Kotlin-Dienst und die App reichen Notizen über den JSON-Posteingang und ein Watch-Ereignis weiter, da der Dienst SQLite nicht erreicht.',
      'Verknüpfte Apps bekommen jede neue Notiz über ihre eigene Web-API. Obsidian bekommt eine Datei in einem gewählten Ordner, ein Memories-Journal bekommt sie über WebDAV.',
      'expo-speech-recognition macht aus Sprache Text, über den Sprachdienst von Android oder den Erkenner von Apple.',
    ],
    reliability: [
      'Eine lange Aufnahme schreibt laufend eine PCM-Datei und eine JSON-Datei, und nach einem Absturz macht die App daraus eine Notiz.',
      'applied_inbox speichert die Posteingangs-ID in derselben Transaktion wie die Notiz, daher importiert ein Absturz keine Fortsetzungsnotiz doppelt.',
      'Jede lokale Änderung speichert updated = MAX(now, updated + 1), daher gewinnt ein Telefon mit langsamer Uhr in Firestore trotzdem.',
    ],
    security: [
      'Keine Konten und keine Cloud-Spracherkennung. Das Weckwort-Modell läuft auf dem Telefon, daher verlässt kein Ton das Gerät.',
      'Die Firestore-Regeln verlangen eine Notiz-ID aus 32 Hex-Ziffern, verbieten das Auflisten und nehmen nur text, group und updated an. Niemand kann nach IDs suchen.',
      'Tokens verknüpfter Apps liegen im sicheren Speicher, nicht in der Notizdatei.',
    ],
    performance: [
      'In einem ruhigen Raum kostet jeder 100-ms-Frame eine Summe. Das sherpa-onnx-Modell mit 3,3 Mio. Parametern läuft nur bei lauten Frames.',
      'Jeder Schreibvorgang erhöht notesVersion, und die Bildschirme laden neu. Die Notizliste mit FlashList zeichnet nur die sichtbaren Zeilen.',
      'Ein Wortabgleich wählt die Gruppe sofort, und Gemini Nano oder Apple Foundation Models laufen nur bei offener App.',
    ],
    operations: [
      'Checks und Release starten bei jedem Push auf main zusammen. Das Release veröffentlicht die APK, sobald Checks bestehen, und behält die letzten 3 Releases.',
      'Ein Play-Bundle wird mit PLAY=1 einmal am Tag um 19:00 Sydney gebaut, wenn sich die App geändert hat. Die APK von GitHub aktualisiert sich selbst.',
      'Firebase Hosting liefert die Website aus, und sie wird nach bestandenen Checks mit den Firestore-Regeln ausgerollt. Der iPhone-Build läuft nur von Hand auf macOS.',
    ],
    tradeoffs: [
      'Expo mit Kotlin- und Swift-Modulen statt einer nativen Android-App, für das iPhone und das Web, zum Preis nativen Codes neben TypeScript.',
      'Ein Foreground-Dienst mit sherpa-onnx statt eines Weckworts in JavaScript, damit es bei ausgeschaltetem Bildschirm hört. Das Modell kann nur Englisch.',
      'Der eigene Spracherkenner des Telefons statt eines Modells in der APK. Englisch und Russisch hat das Telefon schon, daher liefert die App kein Modell mit.',
      'Eine selbst aktualisierende GitHub-APK plus ein Play-Build mit Stubs statt eines Builds, weil Play Apps ablehnt, die Updates selbst installieren.',
    ],
  },
  features: {
    'Hey Keep':
      'Ein Kotlin-Vordergrunddienst überspringt Stille und lässt ein sherpa-onnx-Modell auf lauten Frames laufen. Antworten kommen aus Clips pro Stimme, und das Anpassen setzt eine Schwelle pro Phrase.',
    'Long recording':
      'Der Dienst schreibt den Ton schon während der Aufnahme in eine Zwischendatei. Nach einem Absturz macht die App daraus eine Notiz und holt den Text aus dem Ton.',
    'Stop and continue':
      'Das Schlüsselwortmodell und die Spracherkennung hören beide auf „Stop“. Nach „continue“ hängt der Dienst die neuen Wörter samt Ton an die neueste Notiz.',
    'Record by button':
      'expo-speech-recognition zeigt die Wörter schon beim Sprechen an. Die Notiz geht in SQLite, mit Ton wo das Handy es erlaubt.',
    Recordings:
      'Die App nimmt den Ton selbst auf und gibt ihn an die Spracherkennung weiter. Die WAV-Datei bleibt neben der Notiz auf dem Handy.',
    Groups:
      'Ein Abgleich mit englischen und russischen Wortstämmen wählt sofort eine Gruppe. Gemini Nano oder Apple Foundation Models wählen eventuell eine bessere, solange die App offen ist.',
    Languages:
      'Die Spracherkennung des Handys versteht Englisch und Russisch, offline mit den Sprachpaketen. i18next hält die Screens in 9 Katalogen.',
    'Share by link':
      'Die Notiz geht zu Firestore, und der Link öffnet sie in der App oder im Browser. Ein Listener hält beide Kopien live, und die neuere Änderung gewinnt.',
    'Send to other apps':
      'Jede verbundene App bekommt die neue Notiz über ihre eigene Web-API. Obsidian bekommt eine Datei im gewählten Ordner, und Anmeldetokens liegen im sicheren Speicher.',
    Website:
      'Expo exportiert jede Route als statische Seite, und Firebase Hosting liefert sie aus. Eine geteilte Notiz lädt im Browser aus Firestore.',
    'In-app update':
      'Der GitHub-Build liest die Release-Liste beim Start und bei der Rückkehr. Er lädt die APK und öffnet den Android-Installer. Der Play-Build enthält diesen Code nicht.',
    'Light and dark theme':
      'Das Theme-Modul folgt dem Farbschema des Handys oder einer festen Wahl. Die Wahl bleibt mit den anderen Einstellungen auf dem Handy.',
    Ads: 'Die Google Mobile Ads Library zeigt das AdMob-Banner auf dem Startbildschirm. In Europa fragt zuerst das Einwilligungsformular von Google.',
    'Remove ads':
      'expo-iap verkauft das Produkt über Google Play Billing. Kauf wiederherstellen holt es auf einem neuen Handy mit demselben Konto zurück.',
    'Loud sound from the phone speaker':
      'Das native Modul schickt jeden Ton mit voller Lautstärke an den eingebauten Lautsprecher. Ein Verstärker legt 6 dB drauf, und danach kehrt die Lautstärke zurück.',
    'Notes about a person go to Memories':
      'Die App gleicht das erste Wort einer Notiz mit den Namen aus Memories ab. Die aufgeräumte Notiz mit Datum geht per WebDAV in dieses Tagebuch.',
    'KeepPad Pro':
      'expo-iap verkauft Pro über Google Play, und ein Pro-Modul prüft es vor jeder gesperrten Aktion. Nach einer Erstattung ist Pro beim nächsten Start aus.',
    'Fast scroll':
      'Das Studiopaket fast-scroll umhüllt die Notizliste. Die Liste folgt dem Regler in jedem Frame. iOS und das Web behalten ihre eigene Scrollleiste.',
    'Notes in the phone backup':
      'Android Auto Backup kopiert die Notizdatenbank und die Einstellungen in Google Drive. Backup-Regeln in der App-Konfiguration lassen Aufnahmen und Anmeldetokens draußen.',
    'Crash reports':
      'React Native Firebase Crashlytics fängt jede nicht abgefangene Ausnahme, auch im Kotlin-Dienst. Ein Bericht enthält Trace, Telefonmodell und Versionen, ohne Notiztext.',
  },
};

export default arch;

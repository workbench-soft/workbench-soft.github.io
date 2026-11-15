import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Sky Altar ist eine Expo-App für Android und das Web ohne eigenen Server. Astronomy Engine und Sterndaten in der App liefern den Himmel, und Skia zeichnet ihn.',
  parts: [
    {
      name: 'Expo und React Native',
      role: 'eine Codebasis für die Android-App und die Website, mit den Namen in den Schriften des Handys.',
    },
    { name: 'Skia', role: 'zeichnet den ganzen Himmel als ein Bild pro Frame auf der GPU.' },
    {
      name: 'Astronomy Engine',
      role: 'setzt Sonne, Mond und Planeten an ihren Ort und berechnet die Geburtshoroskope.',
    },
    { name: 'Daten von d3-celestial', role: 'die 2851 Sterne bis Größe 5,5 und die IAU-Figuren mit ihren Namen.' },
    { name: 'expo-camera', role: 'macht alle 1,5 Sekunden ein stilles Foto für den Sternabgleich.' },
    {
      name: 'Media3 ExoPlayer',
      role: 'ein Kotlin-Modul, das die Musik in Schleife über den Lautsprecher mit fester Lautstärke spielt.',
    },
    { name: 'Cloudflare R2', role: 'liefert die Bilder und Titel der bezahlten Themen.' },
    {
      name: 'Google Play Billing und AdMob',
      role: 'verkaufen Werbung entfernen und Pro und zeigen die Werbung nach der Einwilligung.',
    },
  ],
  flow: [
    'Der Drehsensor oder ein Finger dreht die Ansicht des Himmels.',
    'Einmal pro Sekunde rechnet Astronomy Engine jeden Stern in eine Horizontposition um.',
    'Jeder Frame projiziert Sterne und Figuren auf den Bildschirm.',
    'Skia nimmt Bilder, Linien und Sterne als ein Bild auf.',
    'React Native schreibt die Namen darüber, und Kamerasterne leuchten obenauf.',
  ],
  links: [
    { to: 'songfactory', text: 'Die Themenmusik kommt aus Suno über Songfactory, mit einer Stilzeile pro Thema.' },
    { to: 'tickalot', text: 'Die Update-Prüfung ist eine Kopie der Prüfung aus Tick-a-Lot.' },
    { to: 'app-updater', text: 'WBS Updater installiert dieselbe APK aus den gemeinsamen Releases.' },
    { to: 'Google Play', text: 'Google Play Billing verkauft Werbung entfernen und Pro.' },
    {
      to: 'Open-Meteo',
      text: 'Die Suche nach dem Geburtsort schickt nur den getippten Namen und bekommt Ort und Zeitzone zurück.',
    },
  ],
  design: {
    scale: [
      'Eine Person pro Installation, ohne Konto und ohne eigenen Server.',
      'Der Himmel hat 2851 Sterne, 89 Figuren und 19 Kulturthemen, gezeichnet als etwa 3000 Punkte pro Bild.',
      'Nur die 2 freien Themen stecken in der App, und jedes Bezahlbild ist etwa 30 KB groß und kommt von einem CDN.',
    ],
    data: [
      'Sterne, Figuren und Namen liegen als JSON in der App. Die Geschichten stehen in einer .lore-Datei je Sprache.',
      'Einstellungen und gespeicherte Geburtsdaten liegen in localStorage, auf dem Handy in expo-sqlite.',
      'Heruntergeladene Bilder und Titel liegen im Dokumentenordner der App auf dem Handy.',
    ],
    interfaces: [
      'Eine manifest.json auf dem CDN ordnet jedem Themenbild eine Datei zu, die nach ihrem Inhalts-Hash heißt.',
      'expo-iap liest zwei Google-Play-Produkte. Die Update-Prüfung liest die gemeinsame GitHub-Releases-Liste.',
      'Die Open-Meteo-Geokodierung bekommt einen getippten Ortsnamen und gibt Ort und Zeitzone zurück.',
    ],
    reliability: [
      'Ein einmal geladenes Thema läuft offline, und die freien Themen laufen ab dem ersten Start offline.',
      'Ein Bild, dessen Download scheitert, wird nach einer Minute erneut versucht.',
      'Das Gyroskop bewegt die Ansicht, und der Kompass korrigiert sie nur während einer Drehung, damit der Himmel nicht wandert.',
    ],
    security: [
      'Keine Anmeldung und kein Server. Gespeicherte Geburtsdaten bleiben auf dem Handy.',
      'Open-Meteo bekommt nur den getippten Ortsnamen. Die Kamerafotos werden auf dem Handy gelesen.',
      'Das Google-Einwilligungsformular erscheint im EWR, in Großbritannien und in der Schweiz vor jeder Werbung. Der Signaturschlüssel liegt außerhalb des Repos.',
    ],
    performance: [
      'Ein Horizont-Cache in typisierten Arrays füllt sich einmal pro Sekunde, sodass ein Bild kein Objekt pro Stern anlegt.',
      'Skia zeichnet ein Bild pro Frame direkt in die Ansicht, ohne React-Render. Eine ruhige Ansicht zeichnet etwa 8-mal pro Sekunde neu.',
      'Die Bildunschärfe entsteht einmal beim Laden, und Dateinamen mit Hash erlauben CDN und Handy ein Jahr Cache.',
    ],
    operations: [
      'Checks führt bei jedem Push auf main Lint, Tests und die Android- und Web-Bundles aus, und Release baut daneben die signierte APK.',
      'Publish legt die APK in die gemeinsame Releases-Liste, die je App die letzten 3 Builds behält.',
      'mise run deploy lädt neue Bilder, Titel und das Manifest hoch, daher braucht ein neu gezeichnetes Bild kein App-Release.',
    ],
    tradeoffs: [
      'Skia statt react-native-svg, das für 3000 Punkte pro Bild zu langsam ist. Der Preis ist eine 7-MB-CanvasKit-Datei im Web.',
      'Namen in React Native statt Skia-Absätzen, damit Chinesisch, Japanisch und Koreanisch die Schriften des Handys nutzen.',
      'd3-celestial-Daten statt Stellarium-Himmelskulturen, die Lizenzen mischen und teils unter GPL stehen.',
      'Astronomy Engine statt Swiss Ephemeris, die unter AGPL oder kostenpflichtig ist und je Plattform einen nativen Build braucht.',
    ],
  },
  features: {
    'Sky view':
      'Der Drehsensor bewegt die Ansicht, und das Gyroskop hält sie zwischen Kompasskorrekturen ruhig. Skia zeichnet Sterne, Himmelskörper und 88 Figuren aus Daten in der App.',
    Clock:
      'Eine Ebene in React Native zeichnet Uhrzeit und Datum in der Schrift des Themas. Ein Timer läuft jede Minute, und die Uhr dimmt mit den Buttons.',
    'Camera stars':
      'Die App macht alle 1,5 Sekunden ein stilles Foto und sucht die Lichtpunkte darauf in JavaScript. Punkte, die zum Sternkatalog passen, leuchten golden über dem Himmel.',
    'Culture themes':
      'Ein Datensatz pro Kultur legt Farben, Linienstil und Schrift fest. Jedes Bild hängt an 3 Sternen seiner Figur, und die bezahlten Themen laden einmal aus Cloudflare R2.',
    'Ambient music':
      'Ein Kotlin-Modul auf Media3 ExoPlayer spielt den Titel in Schleife mit Überblendung, aus der App oder dem CDN. Eine Dateiauswahl kopiert eigene Dateien oder einen Ordner in die App.',
    'Ads and Remove ads':
      'AdMob zeigt Banner im Themenblatt und in den Einstellungen, dazu höchstens alle 30 Minuten eine Vollbildanzeige. Google Play Billing verkauft Werbung entfernen.',
    'Sky Altar Pro':
      'Google Play Billing verkauft das Pro-Produkt, und eine Prüfung entscheidet jede Sperre. Der Web-Build hat keinen Store und öffnet die Pro-Teile.',
    'App languages':
      'i18next hält 9 Kataloge für die Bildschirme. Die Figurennamen und die Sagendateien gibt es ebenso in jeder Sprache.',
    'Updates from GitHub':
      'Die Update-Prüfung liest die gemeinsamen GitHub-Releases, lädt die APK und gibt sie an den Installer. Der Build für Google Play tauscht die Prüfung gegen leere Platzhalter.',
    Astrology:
      'Astronomy Engine setzt die Planeten für das Geburtshoroskop, mit ganzen Zeichen als Häuser. Open-Meteo findet den Geburtsort, und die gespeicherten Geburtsdaten bleiben auf dem Handy.',
    'Constellation navigation':
      'Eine virtualisierte Liste filtert den Katalog und rechnet jeden Beschriftungspunkt auf den aktuellen Himmel um. Ein Tipp führt die Ansicht in 450 ms dorthin.',
    'Constellation lore':
      'Jede Karte liest die Geschichte der Themenkultur aus einer Sagendatei pro Sprache. Die Sternfakten stammen aus den Hipparcos-Daten im ESA-Gaia-Archiv.',
    'Long lists':
      'Das Studiopaket fast-scroll umhüllt beide Listen, und jede zeichnet nur die sichtbaren Zeilen. Der Regler nimmt eine gedämpfte Blattfarbe oder die Beschriftungsfarbe des Themas.',
  },
};

export default arch;

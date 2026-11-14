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
  },
};

export default arch;

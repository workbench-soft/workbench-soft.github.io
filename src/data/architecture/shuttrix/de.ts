import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Shuttrix ist eine Expo-App mit Bildschirmen in React Native über einem Kamera-Modul in Kotlin auf CameraX und Camera2. Jedes Foto entsteht und speichert auf dem Handy, ohne Server.',
  parts: [
    {
      name: 'Expo und React Native',
      role: 'Kamerabildschirm, Räder, einfacher Modus, Galerie und Einstellungen in TypeScript.',
    },
    {
      name: 'CameraX und Camera2',
      role: 'CameraX führt Lebenszyklus und Streams, Camera2 liefert die Werte der manuellen Räder.',
    },
    {
      name: 'Kamera-Modul in Kotlin',
      role: 'bindet die Objektive, setzt die Räder und schickt jedes gespeicherte Foto durch die Schritte des Modus.',
    },
    {
      name: 'OpenCV',
      role: 'fügt das Panorama zusammen, richtet den Makro-Fokusstapel aus und rendert die Porträtunschärfe.',
    },
    { name: 'ML Kit', role: 'liest QR-Codes aus der Vorschau und findet das Motiv für das Porträt.' },
    { name: 'ONNX Runtime', role: 'führt auf dem Handy ein Tiefenmodell für die Unschärfe in Porträt und Mini aus.' },
    { name: 'Rust-Crate für Fotos', role: 'entwickelt Rohbilder des Sensors zu einem Foto für den Raw-Schalter.' },
    {
      name: 'MediaStore',
      role: 'speichert jede Aufnahme im Kameraordner, wo Memories und andere Galerien sie finden.',
    },
  ],
  flow: [
    'Die Person wählt einen Modus und dreht ein Rad oder einen Regler.',
    'Der Bildschirm gibt die Werte als Props an die Kotlin-Kameraansicht.',
    'CameraX und Camera2 setzen sie, und die Räder zeigen die Livewerte jedes Bilds.',
    'Ein Druck nimmt das Foto auf, und die Schritte des Modus laufen auf der Datei.',
    'MediaStore legt das Ergebnis im Kameraordner ab, und die Galerie zeigt es.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Shuttrix liegt im Repo von Memories und teilt dessen Fotoeditor, Betrachter und Ortsnamen. Memories liest die Aufnahmen aus dem Kameraordner.',
    },
    { to: 'app-updater', text: 'WBS Updater installiert dieselbe APK aus den gemeinsamen Releases.' },
    { to: 'GitHub', text: 'Der Build außerhalb eines Stores findet seine neue Version in den öffentlichen Releases.' },
    { to: 'Google Play', text: 'Google Play Billing verkauft Plus und Werbung entfernen.' },
    { to: 'Google AdMob', text: 'AdMob zeigt das Banner der Galerie nach dem Einwilligungsformular.' },
  ],
  design: {
    scale: [
      'Eine Person pro Handy, ohne Server: Jedes Foto wird auf dem Handy gebaut und gespeichert.',
      'Ein Porträtfoto kostet etwa 7 s je 12 MP auf der CPU eines Pixel 7 Pro, und das Tiefenmodell ist ein Download von 26 MB.',
      'Ein verschmolzenes Foto hält 5 Bilder in voller Größe von je etwa 18 MB im Speicher.',
    ],
    data: [
      'Die Einstellungen sind ein JSON-Wert in den Android Shared Preferences, beim ersten Rendern gelesen, daher öffnet die Kamera wie zuletzt.',
      'Aufnahmen sind WebP-, JPEG-, PNG- oder MP4-Dateien in DCIM/Camera, über MediaStore-Zeilen der App aufgelistet. RAW fügt eine DNG hinzu.',
      'Ort, Weißabgleich-Kalibrierung und Live-Werte bleiben im Speicher, solange die Kamera offen ist.',
    ],
    interfaces: [
      'React Native reicht die Reglerwerte als Props an die Kotlin-Kameraansicht, und das Modul sendet Live-Werte 4-mal pro Sekunde zurück.',
      'CameraX führt Lebenszyklus und Use Cases, und Camera2-Interop setzt ISO, Verschluss, Fokusdistanz und Weißabgleich-Gains.',
      'Aufnahmen landen in MediaStore unter DCIM/Camera, wo Memories sie liest, und die App beantwortet die Android-Kamera-Intents.',
    ],
    reliability: [
      'Die Regler gehen bei jedem Öffnen aus den gespeicherten Einstellungen zurück auf die Kamera.',
      'Ein Entwurf mit 512 px erscheint in der Galerie, bis die endgültige Datei da ist.',
      'Ein Objektiv ohne die Night-Erweiterung weicht auf eine niedrige Bildrate mit starker Rauschminderung aus, und CameraX nimmt die nächste unterstützte Größe.',
    ],
    security: [
      'Die Fotos bleiben auf dem Handy. Die App hat kein Konto und keinen eigenen Server.',
      'Der Standort wird nur gelesen, solange die Kamera offen ist, und der Ort kommt in die EXIF-Tags der gespeicherten Datei.',
      'AdMob fragt in der Galerie beim ersten Öffnen nach Einwilligung, nicht beim Start, daher verzögert sich ein schneller Schuss nicht.',
    ],
    performance: [
      'Zero Shutter Lag löst beim Antippen aus, daher hält die Aufnahme den Moment des Drucks fest.',
      'Ein einfaches Foto verlangt einen Bereich von 60 Bildern, daher hält die Belichtungsautomatik 1/60 s oder kürzer.',
      'Die Porträt-Unschärfe wird auf einer 2048-px-Ebene gerechnet, und Enhance und Mini laufen als GPU-Durchgänge.',
      'Ein Ring hält die letzten 5 Bilder für das verschmolzene Foto und die letzten 8 Rohbilder für die Rust-Entwicklung.',
    ],
    operations: [
      'Ein Push auf main startet die Kamera-Checks und den Release-Build nebeneinander, und release-gate.sh veröffentlicht nur, wenn die Checks bestehen.',
      'Tags heißen shuttrix-v mit Datum, und die APK geht an ein Release im öffentlichen Site-Repo, wo App und Updater sie finden.',
      'Das Play-Bundle baut einmal am Tag um 19:00 Sydney, wenn sich die Kamera geändert hat, und der Play-Build hält einen Stub für den Updater.',
      'Ein eigener Workflow baut die Bibliotheken ONNX Runtime und OpenCV und veröffentlicht sie als Prerelease.',
    ],
    tradeoffs: [
      'Expo mit einem Kotlin-Modul über CameraX statt react-native-vision-camera, das keine manuelle Fokusdistanz, kein ISO, keinen Verschluss und kein Kelvin hat.',
      'Nacht über die CameraX-Erweiterung statt Bilder in Kotlin zu stapeln, so läuft die Pipeline des Handys selbst und lässt ihr Weißabgleich und EV.',
      'Depth Anything V2 Small statt eines größeren Modells wegen der Apache-Lizenz, bei 26 MB Download und etwa 7 s pro Foto.',
      'Ein Monorepo mit Memories statt eines eigenen Repos, um Editor und Viewer zu teilen, zum Preis pfadbasierter CI.',
    ],
  },
  features: {
    'Simple and Pro':
      'Beide Modi steuern eine Kameraansicht. Einfach überlässt Fokus und Belichtung der Automatik, Pro übergibt sie den Rädern.',
    'Simple mode':
      'React Native zeichnet Objektivsymbole, Zoomleiste und Regler über die Kameraansicht. Ein Einstellungsspeicher hält jeden Wert und macht daraus Props für die Kamera.',
    Night:
      'Das Kotlin-Modul nutzt die Nachterweiterung von CameraX, also die Nachtverarbeitung des Handys selbst. Ein Objektiv ohne sie bekommt eine langsame Bildrate mit starker Rauschminderung.',
    Astro:
      'Das Modul nimmt bis zu 24 Bilder von je einer Viertelsekunde auf und richtet sie an den Sternen aus. Ein Tonschritt nimmt danach das Himmelsleuchten weg und hebt die Sterne.',
    Moon: 'Eine Serie von 2,5 Sekunden behält die 8 schärfsten Bilder um den Mond und mittelt sie. Ein zweiter Schritt schärft nach und setzt die Tonwerte.',
    'Long exposure':
      'Ein Bildstream sammelt 3 Sekunden Bilder aus der Hand und richtet sie aus. Die Mischung nimmt das schärfste Bild, wo die Szene still stand.',
    Portrait:
      'ML Kit findet das Motiv am Fokuspunkt, und ein Tiefenmodell liefert die Abstände. OpenCV rendert dann die Unschärfe nach Tiefe auf dem Handy.',
    Mini: 'Eine GPU-Unschärfe liegt über dem scharfen Foto, getrennt durch eine Verlaufsmaske und mit kräftigeren Farben. Ein GPU-Filter zeigt denselben Look in Vorschau und Video.',
    Macro:
      'Die App wählt das hintere Objektiv mit der kürzesten Naheinstellung und berechnet die Bildbreite. Ein Fokusstapel in OpenCV verbindet 6 bis 10 Bilder zu einem scharfen Foto.',
    Panorama:
      'Der Drehsensor behält ein Bild bei jeder ausreichenden Drehung, bis zu 12. OpenCV legt jedes auf einen Zylinder und fügt die Streifen über passende Merkmale zusammen.',
    'Slow motion':
      'Eine Hochgeschwindigkeitssitzung von CameraX nimmt mit der höchsten festen Rate des Objektivs auf. CameraX schreibt das verlangsamte MP4 selbst.',
    'Time lapse':
      'Ein zweiter Bildstream gibt jede halbe Sekunde ein Bild an einen H.264-Encoder. Jedes Bild bekommt einen festen Zeitstempel, daher bleibt das Tempo bei 15fach.',
    Lenses:
      'Das Modul liest jedes Objektiv und seinen Bereich aus der Kamera, und ein Zoomfaktor wählt das Objektiv. Bei der Selfiekamera bestimmen die erkannten Gesichter den Ausschnitt.',
    Focus:
      'Der Gesichtsdetektor der Kamera findet Gesichter in jedem Bild. Das Modul richtet Fokus und Messung auf das Zielgesicht oder den angetippten Punkt.',
    'White balance':
      'Camera2 setzt die Vorgaben und die Verstärkungen. Für Kelvin misst das Modul jede Vorgabe einmal pro Objektiv und setzt den Wert zwischen die 2 nächsten.',
    Exposure:
      'Camera2 setzt ISO und Verschlusszeit von Hand oder überlässt sie der Automatik. Das Objektiv gibt den Korrekturbereich vor, und die Automatik dunkelt düstere Szenen um bis zu 2 EV ab.',
    'Auto tune':
      'Eine reine Funktion liest das gemessene Licht und die Kelvin des automatischen Weißabgleichs. Sie liefert die Werte für Licht, Wärme und Farbe der Szene.',
    Color:
      'Camera2 hat keine Sättigungsregelung, daher schreibt ein Farbmatrix-Schritt jedes gespeicherte Foto neu. Die Vorschau bekommt dieselbe Matrix als Live-Effekt.',
    'Photo, video and flash':
      'CameraX löst das Foto beim Berühren ohne Auslöseverzögerung aus. Halten bindet die Videostreams, nimmt auf und bindet danach wieder die Fotostreams.',
    'Place and camera tags':
      'Der Standortdienst von Android hält einen frischen Fix, solange die Kamera offen ist. Ein EXIF-Schritt schreibt dann Ort, Räder und Blickrichtung in die Datei.',
    'Photo and video size':
      'Die Einstellungen bieten 3 Fotostufen und 4 Videostufen. CameraX weicht auf die nächste Größe aus, die das Objektiv kann.',
    'Photo format and originals':
      'Ein Dateimodul kodiert jedes Foto als WebP, JPEG oder PNG und kopiert seine EXIF-Tags. Es kann das Kameraoriginal und eine reine Farbkopie behalten, und RAW ergänzt ein DNG.',
    'Multi-frame photo':
      'Ein Ring hält die letzten 5 Bilder in voller Größe, solange die Kamera läuft. Ein Druck verbindet die Bilder vor der Berührung, mit dem neuesten als Referenz.',
    'Enhance photos':
      'Mit Verbessern hebt ein GPU-Shader die Schatten und gibt dem gespeicherten JPEG Farbe und Schärfe. Ohne verlangt Camera2 eine schlichte sRGB-Tonkurve, wo die Kamera es erlaubt.',
    'Raw photo':
      'Eine eigene Camera2-Sitzung hält die letzten 8 Rohbilder des Sensors. Ein Rust-Crate richtet sie aus, verbindet sie und entwickelt das Foto auf dem Handy.',
    'QR codes':
      'Der eingebaute Scanner von ML Kit liest jedes Vorschaubild auf dem Handy. CameraX überträgt den Rahmen jedes Codes für die Klammern auf den Bildschirm.',
    Clock:
      'Eine Ebene in React Native zeichnet die Uhrzeit in den Streifen der versteckten Statusleiste. Ein Timer läuft jede Minute, und Berührungen gehen zur Vorschau durch.',
    Gallery:
      'Die Galerie listet die Aufnahmen, die die App über MediaStore gespeichert hat, und gruppiert die Versionen eines Fotos. Das Teilen-Menü von Android verschickt die gewählten Dateien.',
    Plus: 'Google Play Billing verkauft das Einmalprodukt, und die App prüft es beim ersten Öffnen der Galerie. Ein Zähler auf dem Telefon merkt sich die 3 Gratisaufnahmen jedes Plus-Modus. Ist die dritte Aufnahme gespeichert, öffnet sich das Plus-Fenster mit dem Preis aus Google Play.',
    Ads: 'AdMob zeigt ein Banner unter dem Galerieraster und fragt beim ersten Öffnen nach Einwilligung. Dieselbe Prüfung bei Google Play blendet es nach Werbung entfernen oder Plus aus.',
    'Edit photos':
      'Das gemeinsame Editor-Paket aus dem Repo von Memories läuft in einer Expo-DOM-Komponente. Das Kotlin-Modul speichert das Ergebnis über die Datei oder als neues JPEG, mit Metadaten.',
    'Quick start':
      'Die App beantwortet die Kamera-Intents von Android, daher öffnet ein doppelter Druck auf die Ein-Taste sie. Eine Schnelleinstellungskachel und eine Activity über dem Sperrbildschirm öffnen sie auch gesperrt.',
    Updates:
      'Ein gemeinsames Update-Paket prüft die GitHub-Releases beim Start und bei jeder Rückkehr. Der Build für Google Play tauscht es gegen einen Platzhalter ohne Prüfung.',
    'Bug reports':
      'Ein Kotlin-Handler speichert einen Absturz mit seinen Logcat-Zeilen, und Android merkt sich native Abstürze für den nächsten Start. Die App sendet das Protokoll an einen Rust-Worker, der es 30 Tage in KV hält.',
    Languages:
      'i18next hält einen Katalog pro Sprache, und ein Test prüft jeden Schlüssel. Das Kamera-Modul speichert die Wahl aus den Einstellungen neben den Rädern.',
    'Light, blur and fonts':
      'Der gemeinsame Fotoeditor arbeitet auf den fertigen Pixeln, daher nutzt seine Unschärfe eine Ellipse ohne Tiefendaten. Einstellungen nur für die Aufnahme bleiben draußen.',
    'iPhone app':
      'Ein Swift-Zwilling des Kamera-Moduls läuft auf AVFoundation mit denselben Aufrufen. Core Image rechnet die Fotoschritte, und die gebauten Modi nutzen die Videobilder.',
  },
};

export default arch;

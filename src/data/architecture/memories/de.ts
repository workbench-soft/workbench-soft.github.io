import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Expo-App für Android, das iPhone und den Browser liest Fotos per WebDAV von einem NAS zu Hause und führt einen eigenen SQLite-Index. Optionale Container auf dem NAS indizieren die Fotos, gruppieren Gesichter und liefern Albumlinks aus.',
  parts: [
    {
      name: 'Expo und React Native',
      role: 'eine Codebasis für die Android-App, die iPhone-App und die Browser-Version.',
    },
    { name: 'expo-sqlite', role: 'der Index auf dem Handy, mit Datum, Ort und Gerät jeder Datei.' },
    { name: 'WebDAV', role: 'die einzige Verbindung zum NAS für Listen, Kopfdaten, Uploads und Verschiebungen.' },
    {
      name: 'Crate folder-rules',
      role: 'die Rust-Regeln für Ordner nach Jahr, Ort und Tag, geteilt mit dem Desktop-Sortierer.',
    },
    { name: 'places.db', role: 'ein Auszug aus GeoNames und OpenStreetMap in der App, der Orte ohne Netz benennt.' },
    { name: 'NAS-Container in Node', role: 'der schnelle Indexer, die Albumseiten und die Browser-App auf dem NAS.' },
    {
      name: 'Gesichtserkennung in Rust',
      role: 'führt YuNet und SFace über tract auf dem NAS aus und gruppiert Gesichter nach Person.',
    },
    {
      name: 'Fotoeditor auf Konva',
      role: 'ein Editor in einer Expo-DOM-Komponente, geteilt mit Shuttrix und dem Desktop.',
    },
  ],
  flow: [
    'Eine Hintergrundaufgabe listet im Abstand einiger Stunden die Ordner des NAS.',
    'Sie liest von jeder neuen Datei nur den Kopf für Datum und GPS.',
    'Die Ortsdatenbank ohne Netz benennt den Ort, und SQLite speichert die Zeile.',
    'Die Aufgabe plant die Erinnerungen für die nächsten 7 Tage.',
    'Die Bildschirme fragen den Index ab und streamen die vollen Fotos vom NAS.',
  ],
  links: [
    {
      to: 'media-organizer',
      text: 'Der Desktop-Sortierer bindet dieselben Rust-Ordnerregeln ein und zeigt denselben Editor.',
    },
    { to: 'shuttrix', text: 'Die Kamera teilt den Fotoeditor, die Ortssuche und die Karte der Spots.' },
    {
      to: 'keeppad',
      text: 'Keeppad schreibt Notizen in das Tagebuch einer Person auf dem NAS, über einen Android-Provider.',
    },
    { to: 'memories-demo-webdav', text: 'Die Prüfung bei Google Play meldet sich an diesem Beispiel-NAS an.' },
    { to: 'Tailscale', text: 'Eine zweite Adresse erreicht das NAS unterwegs. Funnel liefert die Albumlinks aus.' },
  ],
  design: {
    scale: [
      'Eine Person pro Installation mit einem NAS zu Hause, bis etwa eine Million Fotos und Videos.',
      'Der erste Sync von einer halben Million Fotos dauert fast einen Tag, da das NAS etwa 10 Header pro Sekunde liefert.',
      'Albumlinks erreichen wenige Personen über Tailscale Funnel, daher bleibt das NAS der einzige Server.',
    ],
    data: [
      'Die Fotos bleiben auf dem NAS. Das Handy führt einen SQLite-Index mit Ordnern, Medien und einer Tabelle days, die Trigger mitzählen.',
      'Eine Dateizeile hält eine Ordner-ID und einen Dateinamen, daher passt eine Million Dateien in etwa 200 MB.',
      'Die Aufnahmezeit ist eine Wanduhr in Sekunden, daher ist An diesem Tag eine einfache Bereichsabfrage.',
      'Das NAS legt neben den Fotos einen Ordner .memories mit index.db, status.json, faces.db und den Albumdateien ab.',
    ],
    interfaces: [
      'Das Handy spricht WebDAV mit dem NAS: PROPFIND je Ordner, GET mit Bereich für Header, PUT, MKCOL und MOVE.',
      'Die NAS-Container veröffentlichen index.db und status.json in .memories, und das Handy führt sie über dieselbe WebDAV-Verbindung zusammen.',
      'Die Rust-Ordnerregeln erreichen die App als uniffi-Bibliothek auf Android und als wasm im Web.',
    ],
    reliability: [
      'Der Sync speichert je 50 Dateien in einer Transaktion, und ein abgebrochener Durchlauf geht im nächsten Lauf weiter.',
      'Die Hintergrundaufgabe hat 8 Minuten Budget und plant die Erinnerungen zuerst, daher kommen sie auch bei einem ausgefallenen NAS.',
      'Ein leeres Galerie-Wurzelverzeichnis stoppt den Durchlauf, daher löscht eine nicht gemountete Freigabe den Index nicht.',
    ],
    security: [
      'Die NAS-Anmeldung liegt im Android-Keystore über expo-secure-store, und die App sendet sie als Basic-Header.',
      'Albumlinks enthalten ein zufälliges Token aus 16 Bytes. Der Albumserver mountet die Galerie nur lesend und antwortet auf jeden anderen Pfad mit 404.',
      'Ortsnamen kommen aus einer Offline-Datenbank in der App, daher verlässt kein GPS-Punkt das Handy.',
      'Einfaches http ist erlaubt, da ein NAS zu Hause selten ein Zertifikat hat.',
    ],
    performance: [
      'FlashList zeichnet die sichtbaren Kacheln und einen Bildschirm voraus. Jede Kachel zeigt das kleine EXIF-Vorschaubild aus den ersten 66 KB.',
      'Lesevorgänge laufen zu 8 gleichzeitig in einer Warteschlange, neueste zuerst, und ein natives Modul hebt OkHttp von 5 auf 32 Anfragen je Host.',
      'Die Tabellen days und geo_cells halten Monatsliste, Reisen und Karte von der Million Dateizeilen fern.',
      'Der NAS-Indexer liest einen Header von der eigenen Platte in Millisekunden, wo WebDAV Sekunden braucht.',
    ],
    operations: [
      'Ein pnpm-Monorepo mit node, pnpm, java und rust in mise.toml festgelegt und einer Lockfile.',
      'Jeder Push auf main, dessen Checks bestehen, veröffentlicht eine signierte APK mit Datumsversion, und release-gate.sh bricht den Build bei fehlgeschlagenen Checks ab.',
      'Die installierte App liest das neueste Release über die GitHub-API. Der Google-Play-Build ersetzt den Updater durch Stubs und baut einmal am Tag.',
      'Die NAS-Container werden per ssh mit einem Deploy-Skript ausgerollt.',
    ],
    tradeoffs: [
      'Schlichtes WebDAV statt eines eigenen Servers, damit jedes NAS geht, zum Preis eines langsamen ersten Syncs.',
      'SQLite auf dem Handy statt einer Serverdatenbank, damit die App offline läuft und nichts fürs Hosting kostet.',
      'Aufnahmezeit als Wanduhr statt UTC, damit An diesem Tag ein einfacher Bereich bleibt, doch Fotos aus zwei Zeitzonen lassen sich nicht exakt ordnen.',
      'Eine Rust-Crate für die Ordnerregeln statt einer Kopie je App, damit Handy und Desktop gleich sortieren, bei 1 bis 2 MB je ABI.',
    ],
  },
  features: {
    'Daily reminder':
      'expo-notifications hält einmalige Erinnerungen für die nächsten 7 Tage, die die Hintergrundaufgabe aus dem Index plant. Eine Reise ins Ausland an dem Tag bestimmt das Jahr.',
    Today:
      'Eine Abfrage über eine Tabelle mit Fotozahlen pro Tag findet jedes Jahr mit Fotos an diesem Datum. Trigger halten die Tabelle aktuell, also bleiben die Dateizeilen ungelesen.',
    Trips:
      'Die App schneidet Folgen von Tagen im Ausland aus den Zahlen pro Tag. Der Reiselink öffnet die Fotos vom ersten bis zum letzten Tag.',
    Photos:
      'FlashList zeichnet die Kacheln auf dem Bildschirm und einen Bildschirm voraus. Jede Kachel zeigt das kleine EXIF-Vorschaubild aus dem Cache des Handys.',
    'Filter by place':
      'Die Ortssuche liest Länder und Orte aus den Zahlen pro Tag. Die Auswahl wird zu einer weiteren Bedingung in jeder Abfrage der Galerie.',
    'Camera and drone shots':
      'Das Modell im EXIF oder der Dateiname entscheidet beim Abgleich über Handy, Kamera oder Drohne. Der Index speichert das pro Datei.',
    'Tile size':
      'Ein Handler für die Pinch-Geste setzt 1 bis 6 Kacheln pro Reihe. Ein gespeicherter Wert steuert jedes Raster.',
    'Send many photos at once':
      'Die App kopiert die Auswahl in ihren Cache, 3 auf einmal. Ein kleines natives Modul gibt sie in einem Zug an das Teilen-Menü des Systems.',
    'Share an album by link':
      'Die App schreibt per WebDAV eine Albumdatei auf das NAS. Ein Node-Server auf dem NAS zeigt sie über Tailscale Funnel, mit Vorschauen von sharp.',
    'Memories in the browser':
      'Ein Node-Server auf dem NAS liefert die Web-Version aus und reicht WebDAV unter derselben Adresse durch. Tailscale Serve hält ihn im Tailnet.',
    Organize:
      'Jede Karte startet eine Aufgabe: das Sortieren der Kamera, den Upload oder das Freigeben. Die Rust-Ordnerregeln planen Ordner und Namen, bevor eine Datei wandert.',
    'Import from Google Photos':
      'Die Picker API von Google Fotos zeigt nur die Einträge, die die Person wählt. Die App lädt sie in den Kameraordner, und der Upload übernimmt sie.',
    'Sort picked photos on the NAS':
      'Die Rust-Ordnerregeln planen für jede Datei einen neuen Ordner und Namen. Ein WebDAV MOVE legt sie dort ab, und der Index auf dem Handy folgt sofort.',
    Viewer:
      'expo-image zeigt das volle Foto über dem Vorschaubild aus dem Cache. expo-video streamt Videos mit Bereichsanfragen vom NAS.',
    'Connect to the NAS':
      'Eine mDNS-Suche listet die Geräte im WLAN, und eine Probe findet den WebDAV-Port. Der Login bleibt im sicheren Speicher des Handys.',
    'Photos away from home':
      'Eine Probe der Heimadresse läuft beim Start und bei jedem Netzwechsel. Ohne Antwort nimmt die App die Tailscale-Adresse.',
    'Sync progress':
      'Das Banner liest den laufenden Stand des Abgleichs auf dem Handy. Der NAS-Teil kommt aus einer Statusdatei, die der Indexer jede Minute schreibt.',
    'Mobile data':
      'Eine Prüfung steht vor jeder NAS-Aufgabe über mobile Daten. Die gespeicherte Antwort lässt sie laufen oder auf WLAN warten.',
    'Index from the NAS':
      'Ein Node-Container auf dem NAS liest die Köpfe von der eigenen Platte und schreibt eine Indexdatei neben die Fotos. Das Handy lädt sie und ergänzt die fehlenden Zeilen.',
    'Move the index to a new phone':
      'SQLite kopiert den NAS-Teil des Index in eine Datei für das Teilen-Menü. Das neue Handy hängt diese Datei an und kopiert ihre Zeilen hinein.',
    Language:
      'i18next hält die 9 Kataloge, und expo-localization liest die Sprache des Handys. Eine Wahl in den Einstellungen geht vor und plant die Erinnerungen neu.',
    Theme:
      'Eine Palette hält einen hellen und einen dunklen Satz Farben. Die Bildschirme lesen sie über einen Hook, der dem Handy oder der gespeicherten Wahl folgt.',
    'Ads and remove ads':
      'Google Mobile Ads zeigt nach der Einwilligung die AdMob-Banner und die Vollbildanzeige. expo-iap verkauft Werbung entfernen über Google Play.',
    'Memories Pro':
      'expo-iap verkauft das Produkt über Google Play und den App Store. Ein Modul prüft den Kauf, bevor eine gesperrte Funktion aufgeht.',
    'Desktop sorter':
      'Eine Tauri-App mit Rust-Backend sortiert einen Ordner auf dem Computer. Sie bindet dasselbe Crate der Ordnerregeln ein wie das Handy.',
    Archive:
      'Die Monatsliste liest die Fotozahlen pro Tag, die Trigger aktuell halten. Ein Tipp fragt die Dateien des Monats nach Aufnahmezeit ab.',
    'Trip list and places map':
      'Die Reiseliste verbindet Auslandsreisen mit Fahrten im Inland aus den Zahlen pro Tag. Leaflet in einem WebView zeichnet die Karte aus Fotozahlen pro kleiner Rasterzelle.',
    People:
      'Eine Rust-Engine auf dem NAS gruppiert Gesichter mit YuNet und SFace. Das Handy lädt das Ergebnis und schreibt Namen und Zusammenführungen zurück auf das NAS.',
    'Journal about a person':
      'Jede Person hat eine JSON-Datei auf dem NAS, geschrieben mit If-Match, damit zwei Apps Notizen hinzufügen können. Gewählte Medien landen daneben, die Fotos des Tages kommen aus den Gesichtergruppen, und ein Cloudflare Worker formuliert Notizen aus dem Google Doc um und schickt Änderungen der App zurück.',
    'Search by what a photo shows':
      'Die Gesichter-Engine auf dem NAS lässt jedes Foto durch CLIP laufen und behält die besten von 362 Labels. Das Handy lädt sie und verbindet sie mit Gesichtern und Orten.',
    'Event folders in any file browser':
      'Ein Node-Container auf dem NAS liest jede Nacht die Tags in den Ordnernamen und legt symbolische Links darauf an. Samba folgt den Links, sodass ein SMB-Client normale Ordner sieht.',
    'Indexing progress page':
      'Die Gesichtserkennung und der Indexer schreiben Statusdateien auf das NAS. Ein Node-Server macht daraus eine Live-Seite mit Server-Sent Events.',
    'Albums about a person':
      'Die Albumdatei hält die Person, das Geburtsdatum und die Notizen. Der Albumserver auf dem NAS ordnet die Fotos nach Lebensjahren.',
    'Turn a photo':
      'Die Gesichtserkennung prüft jedes Foto um 90, 180 und 270 Grad gedreht. Das Handy setzt die EXIF-Ausrichtung und tauscht die Datei auf dem NAS nach einer Prüfung.',
    'Edit a photo':
      'Konva betreibt den Editor in einer Expo-DOM-Komponente. Kopie speichern schreibt ein JPEG auf Handy und NAS, und Speichern ersetzt die Datei nach einem Bytevergleich.',
    'Draw a new picture':
      'Derselbe Konva-Editor öffnet sich auf einem leeren Blatt. Speichern legt die Zeichnung nach den Upload-Regeln auf Handy und NAS ab.',
    'Photos on the phone':
      'Ein lokales Expo-Modul in Kotlin liest den Kameraordner über eine einmalige Freigabe. Seine Dateien kommen in denselben Index wie die NAS-Dateien.',
    Settings:
      'Kleine Werte liegen im Schlüsselspeicher von expo-sqlite und laden beim Start. Das NAS-Passwort liegt im sicheren Speicher.',
    'Duplicates on the NAS':
      'Eine Abfrage im Index gruppiert NAS-Dateien nach Aufnahmezeit und Größe. Ein Bytevergleich per WebDAV belegt jedes Paar, bevor die Kopie in den NAS-Papierkorb geht.',
    Updates:
      'Ein geteiltes Update-Paket liest das neueste GitHub-Release und öffnet den Android-Installer. Die Version für Google Play tauscht es gegen leere Platzhalter.',
    'Light, blur and fonts':
      'Konva-Filter wenden die Farbregler an und danach eine Unschärfe um eine Ellipse oder einen Streifen. Jede Beschriftung behält ihre Schriftfamilie.',
    'On the iPhone':
      'Dateien für iOS tauschen die Android-Module gegen Versionen für die Fotomediathek, URLSession und den App Store. Die Ordnerregeln laufen als Rust-XCFramework über Swift.',
  },
};

export default arch;

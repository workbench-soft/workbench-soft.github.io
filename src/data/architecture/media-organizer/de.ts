import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Desktop-App auf Tauri 2 für Windows und macOS. Ein Rust-Backend scannt, liest Daten, plant und verschiebt die Dateien, und ein React-Webview zeigt die Ereignisse an, die es sendet.',
  parts: [
    { name: 'Tauri 2', role: 'die Desktop-Hülle mit dem Webview des Systems und einem kleinen Installer.' },
    {
      name: 'Rust-Backend',
      role: 'trifft jede Entscheidung über Dateien, vom Scan bis zu Verschiebungen und Verlauf.',
    },
    {
      name: 'React und Vite',
      role: 'die Dateitabelle, die Werkzeugleiste und die Einstellungen aus Backend-Ereignissen.',
    },
    { name: 'ExifTool', role: 'ein mitgelieferter Helfer, der Datum, Kamera und GPS jeder Datei liest.' },
    { name: 'Crate folder-rules', role: 'die Regeln für Ordner nach Jahr, Ort und Tag, geteilt mit Memories.' },
    { name: 'GeoNames und OpenStreetMap', role: 'Ortsnamen und Parkumrisse im Installer für die Suche ohne Netz.' },
    {
      name: 'tauri-plugin-updater',
      role: 'sucht im GitHub-Release nach einer neuen Version und installiert sie beim Neustart.',
    },
  ],
  flow: [
    'Die Person wählt einen Ordner, und der Rust-Durchlauf sendet seine Dateien.',
    'ExifTool-Prozesse lesen Datum und GPS jedes Stapels.',
    'Der Offline-Geocoder benennt einen Ort für jeden GPS-Punkt.',
    'Die Ordnerregeln planen für jede Datei einen neuen Ordner und Namen.',
    'Die Person bestätigt, und das Backend verschiebt jede Datei und protokolliert den Schritt.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Die Handy-App und dieser Sortierer teilen das Crate der Ordnerregeln und den Fotoeditor.',
    },
    {
      to: 'GitHub Releases',
      text: 'Installer und Update-Datei liegen in einem Release des öffentlichen Website-Repos.',
    },
  ],
  design: {
    scale: [
      'Eine Person an einem PC. Die Entwurfsgröße ist ein Ordner mit 100.000 Dateien, daher hält Rust die Datensätze und die Webview bekommt nur IDs.',
      'Die Ortsdaten liegen im Installer als GeoNames-Auszug und Parkumrisse. Ein Neuaufbau lädt etwa 640 MB herunter.',
    ],
    data: [
      'Einstellungen liegen in einer JSON-Datei im App-Datenordner. Der Verlauf liegt in einer JSONL-Datei pro Lauf plus einer index.json.',
      'Datensätze, Daten und Pläne eines Scans bleiben in der Scan-Sitzung des Backends, daher nehmen Befehle Datei-IDs und Pläne.',
      'Ortsdaten sind geodata.tsv.gz (Städte ab 1.000 Einwohnern und Sehenswürdigkeiten) und parks.tsv.gz. Beide laden in ein Gitter von 1 Grad.',
    ],
    interfaces: [
      'Die Webview sendet Tauri-Befehle wie start_scan und start_moves. Das Backend antwortet mit Ereignissen: scan:files, metadata:results, plan:files und move:file.',
      'ts-rs schreibt die TypeScript-Nutzdatentypen aus den Rust-Modellen, daher passen beide Seiten eines Befehls zusammen.',
      'ExifTool bekommt pro Anfrage eine Zeile mit JSON-Ausgabe, Tag-Liste und absoluten Pfaden. Der Updater liest latest.json aus einem Release.',
    ],
    reliability: [
      'Ein Verschieben nutzt ein Umbenennen ohne Ersetzen. Eine Kopie über Laufwerke wird nach Größe und Bytes geprüft, bevor die Quelle verschwindet.',
      'Ein Absturz lässt die Datei an der Quelle, am Ziel oder unter beiden Namen eines Hardlinks, und keine Datei geht verloren.',
      'Ein Lauf schreibt am Ende jedes Schritts eine Protokollzeile, und ein Protokoll, das sich nicht schreiben lässt, stoppt den Lauf. Ein spätes Ereignis eines ersetzten Scans fällt über scan_id weg.',
    ],
    security: [
      'Die Webview hat nur core:default-Rechte, ohne fs- oder Shell-Plugin. Rust macht jede Dateiänderung.',
      'Ein Verschieben startet nur aus einem Ordner, der in dieser Sitzung im nativen Dialog gewählt wurde. Ein Ziel muss im gewählten Stamm liegen und wird vor jedem Verschieben erneut geprüft.',
      'Kein GPS-Punkt verlässt den PC, da Orte offline aufgelöst werden. ExifTool-Pfade werden geprüft, damit ein Dateiname keinen Befehl einschleusen kann.',
    ],
    performance: [
      'Der Scan läuft außerhalb des UI-Threads und liefert Dateien in Stapeln. Die Tabelle puffert sie, daher kostet ein großer Ordner ein paar Neuzeichnungen pro Sekunde.',
      'ExifTool-Worker bleiben offen und laufen mit niedriger Priorität, das spart einen Prozessstart pro Datei.',
      'Eine Ortssuche liest nur die nahen Zellen des Gitters, und Parkumrisse werden über Boxen mit je 64 Kanten geprüft.',
    ],
    operations: [
      'Das Backend liegt in einem eigenen Crate neben dem App-Crate, daher kompiliert ein Release ein winziges Crate statt 18.000 Zeilen.',
      'CI läuft auf einem Windows-PC, daher enthalten Releases einen Windows-Installer und keinen macOS-Build. Ein Mac baut ihn mit pnpm tauri build.',
      'Der Updater liest latest.json beim Start, bei der Rückkehr ins Fenster und auf Anfrage. Er lädt nach Update und installiert bei Restart now.',
    ],
    tradeoffs: [
      'Tauri 2 statt Electron: ein kleinerer Installer auf der System-Webview und Rust als Besitzer der Dateilogik, zum Preis unterschiedlicher WebView2 und WebKit.',
      'Planen in Rust statt in der Webview, der ersten Version, die bei großen Ordnern langsam wurde.',
      'Nur disk/safe_fs ändert Dateien, erzwungen durch clippy.toml, statt std::fs-Aufrufen in jedem Modul, die eine Datei überschreiben könnten.',
      'GeoNames im Installer statt eines Online-Geocoders, daher verlässt kein GPS-Punkt den PC, und es gibt kein Anfragelimit.',
    ],
  },
  features: {
    Scan: 'Ein Rust-Durchlauf läuft neben der Oberfläche und sendet die Dateien in Stapeln. Die Tabelle puffert sie, also kostet ein großer Ordner nur wenige Neuzeichnungen pro Sekunde.',
    'Capture dates':
      'Ein Pool von ExifTool-Prozessen bleibt offen und liest jeden Stapel, sobald der Scan ihn findet. Die Prozesse laufen mit niedriger Priorität auf der Hälfte der Kerne.',
    'Places offline':
      'Ein GeoNames-Auszug und Parkumrisse laden einmal in ein Raster von 1 Grad. Eine Suche liest nur die nahen Zellen, und kein GPS-Punkt verlässt den PC.',
    'Plan first':
      'Das geteilte Crate der Ordnerregeln gibt jeder Datei Ordner und Namen als Probelauf. Die Tabelle zeigt jeden Plan vor der Bestätigung.',
    Moves:
      'Ein einziges Rust-Modul macht jede Dateiänderung, mit Umbenennen ohne Ersetzen oder geprüfter Kopie. Pause hält nach der Datei an, die gerade wandert.',
    'History, undo and redo':
      'Jeder Lauf schreibt ein JSONL-Protokoll in den App-Datenordner, eine Zeile pro Datei. Rückgängig und Wiederholen spielen das Protokoll mit denselben Prüfungen ab.',
    Settings:
      'Das Backend speichert Ziel, Modi und Heimatort in einer JSON-Datei. Die Sprachwahl bleibt im Speicher des Webviews.',
    'File table':
      'React zeichnet eine Zeile pro Datei aus den Backend-Ereignissen. Ein Doppelklick auf einen Ort öffnet Leaflet über OpenStreetMap-Kacheln.',
    'Self-update':
      'tauri-plugin-updater liest die Datei des neuesten Release beim Start und bei der Rückkehr ins Fenster. Der Download startet nach Update, die Installation nach Jetzt neu starten.',
    'One command install':
      'Ein PowerShell-Skript liest die neueste Version aus der Release-Datei. Es lädt den Installer und startet ihn still für den aktuellen Nutzer.',
  },
};

export default arch;

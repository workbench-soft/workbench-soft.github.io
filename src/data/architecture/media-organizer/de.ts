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

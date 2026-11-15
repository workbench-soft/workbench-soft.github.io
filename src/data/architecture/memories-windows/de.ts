import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ein Synchronisierer in .NET lief in Docker auf dem NAS und schrieb das Aufnahmedatum jedes Fotos in einen LiteDB-Index. Eine WPF-App im Infobereich von Windows suchte darin nach Datum und öffnete die Dateien direkt vom NAS.',
  parts: [
    { name: '.NET', role: 'eine Plattform für den Dienst auf dem NAS und die Windows-App.' },
    { name: 'Docker', role: 'betrieb den Synchronisierer auf dem NAS neben dem Fotoarchiv.' },
    { name: 'LiteDB', role: 'der Index der Aufnahmedaten, den die Galerie Tag für Tag las.' },
    { name: 'WPF', role: 'das Symbol im Infobereich, die Galerie und das Fotofenster unter Windows.' },
    { name: 'Quartz', role: 'der Planer, der die tägliche Erinnerung auslöste.' },
  ],
  flow: [
    'Der Synchronisierer auf dem NAS las das EXIF jedes Fotos.',
    'Er schrieb das Aufnahmedatum in den LiteDB-Index.',
    'Einmal am Tag rief eine Windows-Benachrichtigung in die Galerie.',
    'Die Galerie suchte die Fotos des Zeitraums im Index.',
    'Sie öffnete die Dateien direkt aus dem Fotoarchiv.',
  ],
  links: [{ to: 'memories', text: 'Die Handy-App hat sie abgelöst und die Idee von „an diesem Tag“ übernommen.' }],
  design: {
    scale: [
      'Eine Person und ein Windows-PC, die das Fotoarchiv eines NAS zu Hause lesen.',
      'Der Index enthält nur Aufnahmedaten, daher bleibt er neben den Fotos klein.',
    ],
    data: [
      'LiteDB, eine eingebettete Dokumentdatenbank, hält den Index der Aufnahmedaten.',
      'Der Synchronisierer liest die EXIF-Daten jedes Fotos, und die Galerie öffnet den Index für jeden Tag des Zeitraums.',
    ],
    interfaces: [
      'Der Synchronisierer auf dem NAS und die Windows-App treffen sich im LiteDB-Index, der nach Datum gelesen wird.',
      'Die App öffnet die Fotodateien direkt aus dem NAS-Archiv, ohne Server-API dazwischen.',
    ],
    reliability: [
      'Der Synchronisierer lief in Docker neben dem Archiv, daher brauchte die Indizierung den PC nicht.',
      'Die Galerie überspringt Dateien im Papierkorb und lädt den Rest beim Scrollen.',
    ],
    security: [
      'Kein Konto und kein Cloud-Dienst: Fotos und Index blieben auf dem NAS zu Hause und dem PC.',
      'Die App öffnet das Archiv mit dem Dateizugriff, den der PC schon hatte.',
    ],
    performance: [
      'Aufnahmedaten werden einmal auf dem NAS gelesen, daher muss die Galerie die Fotos nicht durchsuchen.',
      'Die Galerie lädt Fotos beim Scrollen, einen Tag des Zeitraums nach dem anderen.',
    ],
    operations: [
      'Der Synchronisierer kam als Docker-Container auf dem NAS, die App als Windows-Programm.',
      'Das Repo ist archiviert, da die Handy-App es ersetzt hat.',
    ],
    tradeoffs: [
      '.NET für beide Teile statt zweier Stacks, so deckte eine Plattform den NAS-Dienst und die Windows-App ab.',
      'Ein auf dem NAS gebauter Index statt eines Scans vom PC, daher lagen die Daten beim Öffnen der Galerie bereit.',
      'Ersetzt durch die Handy-App, die das NAS über WebDAV liest und keinen Windows-PC braucht.',
    ],
  },
  features: {
    Tray: 'Ein WPF-Fenster wohnt im Infobereich. Ein Klick oder das Menü des Symbols öffnet die Galerie.',
    'Daily reminder':
      'Ein Quartz-Job zeigt eine Windows-Benachrichtigung mit einer Schaltfläche. Sie öffnet die Galerie.',
    'Gallery by period':
      'Die Galerie öffnet den LiteDB-Index für jeden Tag des Zeitraums. Sie überspringt Dateien im Papierkorb und lädt den Rest beim Scrollen.',
    'Photo window':
      'Ein WPF-Fenster zeigt ein Foto groß. Eine Taste springt zur nächsten oder vorigen Datei des Zeitraums.',
    'Details and map': 'Die App liest die Kameradaten aus der Fotodatei und zeigt den Ort auf einer Karte.',
    Send: 'Die gewählten Dateien gehen mit einer Aktion an eine andere App.',
  },
};

export default arch;

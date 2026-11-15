import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ein Cloudflare Worker in TypeScript spricht die WebDAV-Methoden, die Memories sendet. Ein Durable Object hält die Dateien im kostenlosen Tarif in seinem SQLite-Speicher.',
  parts: [
    { name: 'Cloudflare Worker', role: 'prüft den Basic-Login und reicht jede WebDAV-Anfrage weiter.' },
    {
      name: 'Durable Object',
      role: 'ein Speicher für den ganzen Baum, mit Dateien in Stücken von 1 MB in seinem SQLite.',
    },
    {
      name: 'Statische Dateien',
      role: 'bringen die Beispielfotos mit dem Worker und füllen den Speicher bei jedem Start.',
    },
    {
      name: 'Python-Skript für Beispiele',
      role: 'zeichnet die 42 künstlichen Fotos und 2 Videos mit EXIF-Datum und GPS.',
    },
    { name: 'Cron-Trigger', role: 'löscht jede Nacht um 03:00 UTC die Schicht der Uploads.' },
  ],
  flow: [
    'Die App sendet eine WebDAV-Anfrage mit Basic-Login.',
    'Der Worker prüft den Login und gibt die Anfrage an das Durable Object.',
    'Ein Lesezugriff schaut zuerst in die Upload-Schicht und dann in die Beispiele.',
    'Die App bekommt eine Ordnerliste oder die Bytes des gewünschten Bereichs.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Der Prüfer von Google Play trägt diesen Server im Verbindungsbildschirm von Memories ein.',
    },
    { to: 'Google Play', text: 'Die Angaben unter App access geben dem Prüfer Adresse und Login.' },
    {
      to: 'Cloudflare',
      text: 'Der kostenlose Workers-Tarif führt ihn aus, und CI liefert ihn nach den Prüfungen aus.',
    },
  ],
  design: {
    scale: [
      'Eine gemeinsame Demo-Bibliothek für die Prüfer von Google Play: 42 Fotos, 2 Videos und ein Login.',
      'Ein Durable Object nimmt alle Anfragen an, daher teilen sich alle Prüfer eine Kopie im kostenlosen Workers-Tarif.',
    ],
    data: [
      'Dateien liegen in 1-MB-Blöcken im SQLite-Speicher des Durable Object, unter der Zeilengrenze von 2 MB.',
      'Muster unter base/ bleiben schreibgeschützt. Uploads und Ordner eines Clients gehen nach Uploads/, mit Markern für Löschen und Verschieben.',
      'Eine JSON-Datei hält das EXIF-Datum jedes Musters, das PROPFIND als Änderungszeit meldet.',
    ],
    interfaces: [
      'WebDAV nur so weit, wie die App es braucht: OPTIONS, PROPFIND mit Tiefe 0 oder 1, GET und HEAD mit Bereich, PUT, MKCOL, MOVE und DELETE.',
      'LOCK antwortet 405, und PROPFIND mit unendlicher Tiefe antwortet 403.',
      'Der Worker leitet jede Anfrage an das Durable Object weiter, das head, get mit Bereich, put, delete und list anbietet.',
    ],
    reliability: [
      'Ein täglicher Cron um 03:00 UTC löscht Uploads/, und die Demo kehrt zu den Mustern zurück.',
      'Bei jedem Start gleicht das Durable Object base/ mit der Musterliste ab, daher heilt ein halb fertiges Befüllen.',
      'Ein PUT hört ab 50 MB auf zu lesen, und ein GET mit Bereich lädt nur seine Blöcke, um in 128 MB Speicher zu bleiben.',
    ],
    security: [
      'Ein Basic-Auth-Nutzer wird gegen ein Worker-Secret geprüft. OPTIONS antwortet ohne Login.',
      'Die Musterdateien liegen als statische Assets hinter dem Worker, daher schützt der Login auch sie.',
      'Die Muster sind synthetisch, daher wird keine echte Person und kein echter Ort preisgegeben.',
    ],
    performance: [
      'Ein GET mit Bereich liest nur die nötigen Blöcke, daher braucht eine 50-MB-Datei keine 100 MB Speicher.',
      'Die Musterdaten kommen aus einer JSON-Datei, daher braucht PROPFIND kein EXIF-Lesen.',
    ],
    operations: [
      'Checks führen bei jedem Push auf main Lint, Typprüfung und Unit-Tests aus, und Deploy startet, sobald sie bestehen.',
      'Deploy baut die Muster, startet das wrangler deploy über mise und markiert den Commit mit einer Datumsversion.',
      'Es stoppt, wenn Musterordner und Datumsliste voneinander abweichen oder das Cloudflare-Token fehlt.',
      'Es läuft ein Deploy zur Zeit, und ein neuerer wartender ersetzt einen älteren.',
    ],
    tradeoffs: [
      'SQLite im Durable Object statt R2, da R2 eine Zahlkarte verlangt und der kostenlose Tarif das Durable Object abdeckt.',
      'Eine Schreibschicht über schreibgeschützten Mustern statt Schreiben in die Muster, daher ist ein Reset ein Löschen nach Präfix.',
      'Synthetische Fotos statt echter, damit ein Fremder keine echten Personen oder Orte sieht.',
      'Ein TypeScript-Worker jetzt statt Rust, um zuerst auszuliefern. Der Org-Stack plant den Umzug auf workers-rs.',
    ],
  },
  features: {
    'Sample library':
      'Ein Python-Skript zeichnet die Fotos mit EXIF-Datum und einigen GPS-Punkten. Sie reisen als statische Dateien mit und füllen beim Start das Durable Object.',
    'Sign in': 'Der Worker prüft einen Basic-Nutzer gegen ein Worker-Secret. OPTIONS antwortet ohne Login.',
    'Uploads and sorting':
      'Uploads und Verschiebungen landen in einer eigenen Schicht über den schreibgeschützten Beispielen. Ein nächtlicher Cron löscht diese Schicht, und die Beispiele kehren zurück.',
  },
};

export default arch;

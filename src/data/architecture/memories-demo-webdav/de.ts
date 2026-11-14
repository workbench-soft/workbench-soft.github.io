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
  features: {
    'Sample library':
      'Ein Python-Skript zeichnet die Fotos mit EXIF-Datum und einigen GPS-Punkten. Sie reisen als statische Dateien mit und füllen beim Start das Durable Object.',
    'Sign in': 'Der Worker prüft einen Basic-Nutzer gegen ein Worker-Secret. OPTIONS antwortet ohne Login.',
    'Uploads and sorting':
      'Uploads und Verschiebungen landen in einer eigenen Schicht über den schreibgeschützten Beispielen. Ein nächtlicher Cron löscht diese Schicht, und die Beispiele kehren zurück.',
  },
};

export default arch;

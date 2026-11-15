import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine Chrome-Erweiterung mit Manifest V3 und ohne Server. Das Pop-up startet das Speichern, der Service Worker führt es aus, und eine versteckte Offscreen-Seite lädt die Dateien und baut das Zip.',
  parts: [
    {
      name: 'Pop-up',
      role: 'zeigt den Host, den Button Herunterladen und den Balken, neu gezeichnet aus dem gespeicherten Zustand.',
    },
    {
      name: 'Service Worker',
      role: 'führt ein Speichern pro Tab aus, schleust das Seitenskript ein und gibt das Zip an die Chrome-Downloads.',
    },
    {
      name: 'Seitenskript',
      role: 'läuft in jedem Frame und liefert das HTML und jede URL, die die Seite geladen hat.',
    },
    {
      name: 'Offscreen-Dokument',
      role: 'findet, lädt und packt die Dateien, da nur eine Seite eine Blob-URL erzeugen kann.',
    },
    { name: 'fflate', role: 'packt das Zip und legt Bilder und Schriften unverändert ab.' },
    {
      name: 'chrome.storage.session',
      role: 'hält den Zustand jedes Speicherns, so sieht ihn ein neu geöffnetes Pop-up.',
    },
    { name: 'chrome.i18n', role: 'liefert den Pop-up-Text und den Namen der Erweiterung in 9 Sprachen.' },
    { name: 'Vite', role: 'bündelt den Service Worker, das Pop-up und die Offscreen-Seite.' },
  ],
  flow: [
    'Die Person drückt Herunterladen im Pop-up.',
    'Der Service Worker schleust ein Skript in jeden Frame des Tabs.',
    'Das Skript liefert das HTML und die URLs, die die Seite geladen hat.',
    'Die Offscreen-Seite findet weitere Dateien über Source Maps und Stylesheets und lädt sie.',
    'Die Zähler erreichen das Pop-up alle 100 ms über den Sitzungsspeicher.',
    'Die Chrome-Downloads speichern das Zip unter Downloads.',
  ],
  links: [],
  features: {
    'Download from the popup':
      'Das Pop-up gibt den Tab an den Service Worker, der das Speichern selbst ausführt. Der Zustand liegt im Sitzungsspeicher, so läuft es nach dem Schließen weiter.',
    'Progress bar':
      'Die Offscreen-Seite findet zuerst die Dateien, so bleibt die Summe fest. Sie schickt alle 100 ms die Zahl der fertigen und fehlgeschlagenen Dateien, und das Pop-up zeichnet danach neu.',
    'One zip':
      'fflate packt das Live-HTML und jede Datei in einen Ordner pro Host, mit den Serverpfaden. Die Chrome-Downloads speichern es mit Host und Uhrzeit im Namen.',
    'Original sources':
      'Die Offscreen-Seite liest die Source Map jedes Skripts und Stylesheets. Jede Originaldatei aus einer Map kommt in einen eigenen Ordner im Zip.',
    Languages:
      'chrome.i18n wählt den Katalog nach der Chrome-Sprache. 9 Kataloge halten den Pop-up-Text, den Namen und die Beschreibung.',
  },
};

export default arch;

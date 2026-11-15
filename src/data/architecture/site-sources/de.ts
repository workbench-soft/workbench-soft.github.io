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
  design: {
    scale: [
      'Eine Person speichert eine offene Seite auf einmal, und zwei Tabs können gleichzeitig speichern.',
      'Die Dateien liegen im Speicher, bis das Zip geschrieben ist, daher kann eine Seite von mehreren hundert Megabyte scheitern.',
    ],
    data: [
      'Ein Speichern ist ein Zip, benannt nach Host und Zeit, mit index.html, einem Ordner pro Host, _sources und _frames.',
      'Der Zustand jedes Speicherns liegt in chrome.storage.session: die Zähler, die fehlgeschlagenen Dateien und die Stufe.',
      'Nach dem Ablegen des Zips in Downloads bleibt nichts gespeichert. Die Erweiterung hat keinen Verlauf und keine Einstellungen.',
    ],
    interfaces: [
      'Popup, Service Worker und Offscreen-Seite sprechen über chrome.runtime-Nachrichten und den Zustand im Session Storage.',
      'Ein mit chrome.scripting eingeschleustes Seitenskript liefert das HTML und die URLs aus performance-Einträgen, src und link href.',
      'Das Zip geht als Blob-URL hinaus, die chrome.downloads in Downloads speichert.',
    ],
    reliability: [
      'Eine vom Server abgelehnte Datei zählt als fehlgeschlagen und bleibt außerhalb des Zips, ohne zweiten Versuch. Ein Abruf endet nach 2 Minuten.',
      'Das Popup kann mitten im Speichern schließen und sich beim Öffnen aus dem Session Storage neu zeichnen, das Speichern läuft weiter.',
      'Ein gemeinsames Promise erzeugt die Offscreen-Seite, sodass ein zweiter Tab die eine nutzt, die Chrome erlaubt.',
    ],
    security: [
      'Die Erweiterung verlangt activeTab, scripting, downloads, storage, offscreen und alle URLs, weil sie von jeder Seite lädt, aus der die Seite Dateien bezieht.',
      'Sie sendet nichts an einen eigenen Server. Die einzigen Anfragen gehen an die Seiten, die die Seite schon nutzt.',
      'Eine Datei hinter einem Login, den die Erweiterung nicht senden kann, zählt als fehlgeschlagen. Chrome-Seiten und der Chrome Web Store lehnen Erweiterungen ab.',
    ],
    performance: [
      'Die Suche ruft Skripte und Stylesheets jeder Runde nebeneinander ab und behält ihre Bytes, sodass das Packen sie nicht noch einmal lädt.',
      'Fortschrittszähler werden zusammengeführt und gehen höchstens alle 100 ms hinaus, ein neuer Zustand sofort.',
      'Bilder, Schriften, Video und andere komprimierte Formate kommen unverändert ins Zip, ohne zweite Kompression.',
    ],
    operations: [
      'Vite bündelt Service Worker, Popup und Offscreen-Seite. fflate packt auch die Erweiterung für jedes Release.',
      'Jeder Push auf main baut das Zip neben den Checks. Ein Gate-Skript veröffentlicht es, sobald die Checks bestehen, und bricht es bei Fehlern ab.',
      'Releases bekommen ein Datums-Tag wie v2026.11.02.1, und das Manifest trägt dieselbe Version. Chrome lädt es entpackt.',
    ],
    tradeoffs: [
      'Eine Offscreen-Seite statt einer Data-URL aus dem Worker, weil nur eine Seite eine Blob-URL erzeugen kann und eine Data-URL ein Drittel größer ist.',
      'zipSync statt des asynchronen Zips, weil die Richtlinie der Erweiterung die Blob-Worker des asynchronen fflate-Zips blockiert, auf Kosten einer Pause bei großen Zips.',
      'Erst die Dateien finden, dann laden, damit die Gesamtzahl feststeht, während der Balken sich füllt, auf Kosten einer Wartezeit vor der ersten Datei bei großen Seiten.',
      'chrome.i18n statt i18next, weil der Manifestname nur aus _locales kommen kann und ein zweiter Katalog nichts bringt.',
    ],
  },
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

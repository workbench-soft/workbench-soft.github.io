import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ein Kommandozeilen-Tool in TypeScript, das Node auf Windows ohne Bundle ausführt. Jeder Befehl baut aus einer privaten Konfiguration einen Plan von Verschiebungen, und ein Modul setzt jeden Plan um.',
  parts: [
    { name: 'Node', role: 'führt die TypeScript-Dateien unverändert aus.' },
    { name: 'zod', role: 'prüft die Konfigurationsdatei mit Ordnern und Regeln vor dem Lauf.' },
    { name: 'Datei-Walker', role: 'listet Dateien mit Größe und Datum, 64 auf einmal, und zählt jeden Pfad einmal.' },
    {
      name: 'Regelmodule',
      role: 'machen aus der Konfiguration Verschiebungen für Kopien, entbehrliche Dateien, Themensortierung und den Monatseingang.',
    },
    {
      name: 'Planprüfungen',
      role: 'stoppen einen Plan mit Konflikt, doppeltem Pfad oder behaltener Kopie vor der ersten Verschiebung.',
    },
    {
      name: 'Mover',
      role: 'legt Ordner an, benennt bei Namensgleichheit um und protokolliert jede Verschiebung vor der nächsten.',
    },
    {
      name: 'CSV-Dateien',
      role: 'der Plan und das Protokoll, mit Byte Order Mark, damit Excel kyrillische Namen liest.',
    },
  ],
  flow: [
    'Die Person startet einen Befehl über mise, oft zuerst als Probelauf.',
    'Das Tool liest und prüft die private Konfiguration.',
    'Es durchläuft die Ordner und baut eine Liste von Verschiebungen.',
    'Der Plan landet in einer CSV, die die Person bearbeiten kann.',
    'Der Mover setzt den Plan um und protokolliert jede Verschiebung für das Rückgängigmachen.',
  ],
  links: [
    {
      to: 'GitHub',
      text: 'Führt die Prüfungen bei jedem Push auf main aus und veröffentlicht ein Release mit Notizen.',
    },
  ],
  features: {
    'Folder report':
      'Der Walker liest Namen, Größen und Daten in den genannten Ordnern. Das Tool schreibt Anzahl, Jahre, Typen und wahrscheinliche Kopien in eine Markdown-Datei.',
    'Duplicates to quarantine':
      'Dateien gleicher Größe bekommen einen Hash ihres ersten 1 MB, dann einen vollen SHA-256. Pfadregeln ordnen jede Kopie, und die bestplatzierte bleibt.',
    'Files safe to drop':
      'Jede Regel prüft Name, Pfad oder Alter und nennt eine Quarantänekategorie. Ein Schutzmuster gewinnt gegen jede Regel.',
    'Sort into topic folders':
      'Ein Sortierauftrag hält Regeln für Ordner und Dateien mit je einem Ziel. Einträge ohne Treffer gehen in einen Auffangordner, etwa einen pro Jahr.',
    'Monthly inbox':
      'Das Tool liest die Daten der Einträge im Eingangsordner. Einträge älter als 30 Tage wandern in einen Ordner, der nach ihrem Monat heißt.',
    'Plans, moves and undo':
      'Jeder Lauf schreibt eine Plan-CSV und ein Protokoll. Der Mover prüft den Plan vor dem ersten Schritt, und Rückgängig liest das Protokoll und stellt die Dateien von hinten zurück.',
  },
};

export default arch;

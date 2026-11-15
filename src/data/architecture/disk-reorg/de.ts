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
  design: {
    scale: [
      'Der PC eines Entwicklers und seine Netzfreigaben, wobei ein Lauf die Ordner einer Konfiguration abdeckt.',
      'Eine große Freigabe hat die Bauweise geprägt. Das Hashen läuft in Stufen, und alle 5 Sekunden erscheint eine Fortschrittszeile mit der Restzeit.',
    ],
    data: [
      'Eine JSON-Konfiguration außerhalb von git hält Ordner und Regeln. Das Repo liefert config.example.json mit erfundenen Pfaden.',
      'Jeder Lauf schreibt eine Plan-CSV mit From, To und einer optionalen Spalte Keep sowie ein Verschiebeprotokoll mit From, To und Time.',
      'Der Befehl inventory schreibt einen Markdown-Bericht mit Zahlen, Größen, Jahren, Dateitypen und wahrscheinlichen Kopien.',
    ],
    interfaces: [
      'Eine Befehlszeile mit inventory, move, undo, dupes, candidates, sort und inbox, gelesen mit node:util parseArgs.',
      'Die Plan-CSV ist der Vertrag zwischen den Befehlen und dem Verschieber, daher kann ein Mensch sie ändern und mit move anwenden.',
      'Jede CSV beginnt mit einer UTF-8-Bytereihenfolge-Marke, damit Excel und PowerShell 5.1 kyrillische Namen richtig lesen.',
    ],
    reliability: [
      'Ein Lauf stoppt, wenn sein Protokoll nicht geschrieben werden kann, damit jede Verschiebung rückgängig bleibt. Die Zeile steht im Protokoll vor der nächsten Verschiebung.',
      'Über Laufwerke hinweg kopiert eine Verschiebung zuerst und entfernt danach, sodass eine fehlgeschlagene Kopie die Quelle heil lässt.',
      'Ein Duplikat, dessen behaltene Kopie fehlt, bleibt liegen, und ein Lauf endet mit 1, wenn danach eine behaltene Kopie fehlt.',
    ],
    security: [
      'Das Werkzeug löscht keine Datei. Ein Entfernen verschiebt sie in die Quarantäne, mit erhaltenem Laufwerk und Pfad.',
      'inventory, candidates, sort und inbox lesen nur Namen, Größen und Daten. dupes liest Inhalt nur zum Hashen.',
      'Es liest die lokale Konfiguration und Dateien, ruft kein Netz auf und speichert kein Token. Echte Pfade bleiben aus git.',
    ],
    performance: [
      'dupes gruppiert nach Größe, hasht das erste 1 MB und liest nur die noch gleichen Dateien vollständig.',
      'Der Läufer liest Dateiinfos 64 auf einmal und zählt jeden Pfad einmal, sodass überlappende Wurzeln billig bleiben.',
      'Das Hashen liest 4 Dateien gleichzeitig und meldet Dateien, Gigabyte, Prozent und Restzeit.',
    ],
    operations: [
      'Node 24 führt die TypeScript-Dateien unverändert aus, ohne Bundle, und mise startet jeden Befehl und jede Aufgabe.',
      'Checks laufen bei jedem Push auf main, und Release veröffentlicht danach ein GitHub-Release, sobald die Checks bestehen. Läufe für Pull Requests sind aus.',
      'Ein husky-Hook vor dem Push startet Lint und Tests. Die Tests bauen temporäre Ordner und lassen echte in Ruhe.',
    ],
    tradeoffs: [
      'Quarantäne statt Löschen oder Papierkorb, damit eine falsche Regel nur eine Rückverschiebung kostet, auf Kosten von Platz, der erst frei wird, wenn der Mensch die Quarantäne leert.',
      'Ein Plan-Modul für alle Befehle statt Prüfungen in jedem Befehl, damit eine behaltene Kopie oder eine kollidierende Verschiebung den Lauf an einer Stelle stoppt.',
      'Eine private Konfiguration außerhalb von git statt Regeln im Repo, damit Ordnernamen auf dem PC bleiben, auf Kosten des manuellen Kopierens auf einen neuen PC.',
      'TypeScript auf Node statt der ersten PowerShell-Skripte, für Tests und Pfade in der Konfiguration.',
    ],
  },
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

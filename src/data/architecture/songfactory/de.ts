import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ein Python-Werkzeug für die Kommandozeile läuft auf dem Windows-PC mit ffmpeg und der lokalen GPU. Es macht aus einem Themenordner ein YouTube-Video, und ein Desktopfenster oder Archon steuert es.',
  parts: [
    { name: 'Python und uv', role: 'der Befehl songfactory und seine Module, gestartet über uv.' },
    { name: 'ffmpeg', role: 'mischt die Songs, wiederholt den Clip und kodiert auf der GPU mit NVENC.' },
    {
      name: 'numpy und Apollo',
      role: 'bauen das obere Band neu auf, das ein verlustbehafteter Encoder abgeschnitten hat.',
    },
    { name: 'Claude CLI', role: 'schreibt Themen, Songtexte und YouTube-Texte über das Claude-Abo.' },
    { name: 'Playwright', role: 'steuert die Suno-Seite in Chromium und lädt die Songs herunter.' },
    { name: 'ComfyUI', role: 'zeichnet den Hintergrundclip aus einem Prompt auf der lokalen GPU.' },
    {
      name: 'YouTube Data API',
      role: 'lädt das Video mit Vorschaubild, KI-Kennzeichen und Veröffentlichungszeit hoch.',
    },
    { name: 'tkinter', role: 'das Desktopfenster, das gewählte Songs in 9 Sprachen reinigt oder verbessert.' },
  ],
  flow: [
    'Die Songs kommen aus einem Themenordner oder aus der Suno-Kachel.',
    'ffmpeg reinigt jeden Song und behält das Original.',
    'ffmpeg verbindet die Songs mit Überblendungen über einem Clip in Schleife.',
    'Der Build schreibt Kapitel, Beschreibung und Vorschaubild.',
    'Die YouTube Data API lädt das Video mit einer Veröffentlichungszeit hoch.',
  ],
  links: [
    {
      to: 'archon',
      text: 'Der Songs-Tab von Archon zeichnet die Kacheln und startet jede über den Befehl songfactory.',
    },
    { to: 'Suno', text: 'Suno macht die Songs, und Playwright lädt sie herunter.' },
    { to: 'YouTube', text: 'Die Videos gehen über die YouTube Data API hoch, etwa 6 am Tag.' },
    { to: 'Claude', text: 'Die Claude CLI schreibt den Text über das Abo ohne API-Konto.' },
  ],
  features: {
    'Audio workbench':
      'Ein Fenster mit tkinter startet den Befehl zum Reinigen oder Verbessern für die gewählten Dateien. Eine Namensprüfung stoppt den Stapel, bevor zwei Ergebnisse kollidieren.',
    'Tile pipeline':
      'Jedes Projekt hält seine 10 Kacheln und deren Einstellungen in einer JSON-Datei. Ein Runner gibt jeder Kachel das Ergebnis der vorigen, und Archon zeichnet die Kacheln.',
    'Per-song videos':
      'Das Clip-Modul nutzt Thema, Reinigung und Encoder für ein Video in Schleife pro Song. Auf Wunsch verbindet ffmpeg sie mit harten Schnitten.',
    'Install and check the setup':
      'Ein PowerShell-Skript installiert mise, die festgelegten Werkzeuge und die Pakete. Ein Prüfmodul testet jede Voraussetzung und nennt die Lösung.',
    'Long video from a playlist':
      'ffmpeg mischt die Songs mit Überblendung und wiederholt den Clip bis zur Länge des Tons. Die Kodierung läuft über NVENC, wenn die GPU es kann.',
    'Cleanup of AI artifacts':
      'Eine Filterkette von ffmpeg setzt eine feste Verstärkung und entfernt Brummen, Rauschen und lauten Schimmer. Die gereinigte Kopie landet als FLAC-Datei neben dem Original.',
    'Enhance a song':
      'numpy baut das obere Band aus dem Band darunter neu auf. Das Apollo-Modell auf der GPU kann die Arbeit übernehmen, und eine Seite zeigt beide Spektrogramme.',
    'Seamless loop':
      'ffmpeg spielt den Clip vorwärts und dann rückwärts vor der Wiederholung. Der Sprung zwischen letztem und erstem Bild verschwindet.',
    'Chapters and thumbnail':
      'Die Kapitelzeiten ergeben sich aus den Songlängen abzüglich der Überblendungen. Pillow schreibt den Titel auf ein Bild des Clips.',
    'Scheduled upload':
      'Die YouTube Data API lädt das Video mit KI-Kennzeichen und Veröffentlichungszeit hoch. Die Windows-Aufgabenplanung startet den täglichen Build um 03:00.',
    'Text from Claude':
      'Die Claude CLI füllt leere Felder für Titel, Beschreibung und Tags aus den Songnamen. Eine Datei im Themenordner bewahrt die Antwort für den nächsten Build.',
    'Background from ComfyUI':
      'Das Werkzeug schickt den Prompt an einen ComfyUI-Workflow auf der lokalen GPU. Der zurückgegebene Clip wird zum Hintergrund in Schleife.',
  },
};

export default arch;

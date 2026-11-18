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
  design: {
    scale: [
      'Ein Ersteller auf einem Windows-PC mit GPU. Der tägliche Lauf lädt höchstens etwa 6 Videos hoch.',
      'Jeder Upload kostet etwa 1.600 der 10.000 täglichen YouTube-Kontingenteinheiten, und dieses Kontingent setzt die Obergrenze.',
      'Die lokale GPU erzeugt pro Lauf etwa 5 s Video in 720p, daher ist jeder Hintergrund ein Schleifenclip.',
    ],
    data: [
      'Der Zustand sind Dateien im Themenordner: theme.toml hält die Einstellungen, out/upload.json markiert ein Thema als erledigt, und out/claude.json bewahrt den von Claude geschriebenen Text.',
      'Ein Projekt hält seine zehn Kacheln in pipeline.json, jede mit kind, enabled und params.',
      'Bereinigte Songs gehen als FLAC nach out/clean/, die Originale bleiben. Geheimnisse liegen in einem Ordner außerhalb des Repos.',
    ],
    interfaces: [
      'Die CLI hat die Befehle bg, clean, build, upload, publish, run, enhance, clips und Kachelbefehle. Der Songs-Tab von Archon liest songfactory project und führt songfactory tile aus.',
      'ffmpeg und ffprobe laufen als Unterprozesse, und ComfyUI bekommt workflows/loop.json per HTTP, mit eingesetztem Prompt und Seed.',
      'upload.py ruft videos.insert und thumbnails.set der YouTube Data API auf, nach einer OAuth-Anmeldung für Desktop-Apps.',
      'progress.py gibt Zeilen step, file i/n und progress NN% aus, die der Launcher in Balken verwandelt.',
    ],
    reliability: [
      'upload.json wird geschrieben, sobald YouTube die Video-ID liefert, daher löst ein fehlgeschlagenes Vorschaubild keinen zweiten Upload aus.',
      'run überspringt Ordner, die mit _ oder einem Punkt beginnen, und macht mit dem nächsten Thema weiter, wenn eines scheitert.',
      'claude.py ist optional. Eine fehlende CLI oder ein fehlgeschlagener Aufruf gibt eine Zeile aus, und das Thema läuft mit dem Ordnernamen als Titel weiter.',
      'Eine abgeschaltete Kachel reicht ihre Eingabe weiter, und eine Audiokachel nimmt die Dateien der nächsten früheren Kachel, die lief.',
    ],
    security: [
      'Das OAuth-Token für YouTube und die anderen Geheimnisse liegen in einem Ordner außerhalb des Repos.',
      'claude -p läuft ohne die API-Key-Variable, daher belastet es das angemeldete Abo und kein API-Konto.',
      'Uploads setzen containsSyntheticMedia und bleiben privat, bis Google das Projekt prüft.',
    ],
    performance: [
      'h264_nvenc kodiert auf der GPU, wenn der PC eine hat, sonst übernimmt libx264.',
      'Der Clip läuft mit -stream_loop und Ping-Pong, daher deckt ein 5-s-Clip ein langes Video ohne langes Rendern ab.',
      'Die Bereinigung ist ein ffmpeg-Aufruf mit festem Gain, highpass, afftdn und einem dynamischen Schnitt bei 7 kHz, ohne neuronales Modell.',
      'Ein Stapel-Enhance läuft durch einen CLI-Prozess, daher entsteht eine compare.html für alle Songs.',
    ],
    operations: [
      'Eine geplante Windows-Aufgabe führt mise run daily um 03:00 auf dem PC aus, der Songs, Token und GPU hält.',
      'checks.yml führt Lint, Tests und uv build auf dem selbst gehosteten Windows-Runner bei jedem Push auf main aus.',
      'release.yml baut Wheel und sdist neben Checks, und release-gate.sh veröffentlicht, sobald Checks bestehen. Ein fehlgeschlagener Checks-Lauf bricht den Build ab.',
      'mise run doctor gibt pro Voraussetzung eine Zeile aus, ok oder MISSING, und als JSON für den Launcher.',
    ],
    tradeoffs: [
      'ffmpeg auf der Kommandozeile statt einer Python-Videobibliothek, damit Mischen, Schleifen und NVENC-Kodierung in einem Werkzeug liegen, doch Filtergraphen sind Strings, und ein Tippfehler zeigt sich erst zur Laufzeit.',
      'Ein kurzer Schleifenclip statt eines Clips so lang wie die Songs, da die GPU pro Lauf etwa 5 s erzeugt.',
      'Einfache Dateien pro Thema statt einer Datenbank, damit eine Datei beantwortet, ob ein Thema hochgeladen wurde, doch ein verschobener Ordner verliert seine Verbindung zum Upload.',
      'Die lokale Aufgabenplanung statt eines CI-Cronjobs, da Songs und Token außerhalb von git liegen, doch der PC muss um 03:00 laufen.',
    ],
  },
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
    'ComfyStack video and robot pictures':
      'songfactory workflows sync drückt in Playwright die Download-Knöpfe von comfystack.online und legt jeden Workflow in workflows/comfystack/ ab, im UI- und im API-Format. comfy_graph.py setzt Bild, Songstück und Prompt nach Knotentyp ein, und pictures.py holt ein Cover vom aspirationstyle-Roboter und wechselt bei 429 oder 502 zur nächsten Seite.',
  },
};

export default arch;

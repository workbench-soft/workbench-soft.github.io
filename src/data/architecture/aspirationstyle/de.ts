import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Eine statische Astro-Seite auf GitHub Pages, gepflegt über einen Git-basierten Admin-Bereich. Ein Rust Worker auf Cloudflare meldet Maria an und zeichnet die KI-Bilder.',
  parts: [
    { name: 'Astro', role: 'baut jede Seite zu statischem HTML und jedes Foto in AVIF- oder WebP-Größen.' },
    {
      name: 'GitHub Pages',
      role: 'liefert die Seite aus einem öffentlichen Build-Repo, kostenlos und schnell in Russland.',
    },
    { name: 'Sveltia CMS', role: 'der Admin-Bereich, der jede Änderung als Commit ins private Quell-Repo speichert.' },
    {
      name: 'Rust Worker',
      role: 'meldet Admins per Code aus einer E-Mail an und prüft ihren Repo-Zugang für die KI-Seite.',
    },
    { name: 'Workers AI', role: 'führt die FLUX.2-Modelle aus, die die Interieurs zeichnen.' },
    { name: 'FormSubmit', role: 'mailt jedes Bestellformular an Maria, ohne Konto und ohne Server.' },
    { name: 'GitHub Actions', role: 'prüft jede Änderung, baut die Seite und pusht sie ins öffentliche Repo.' },
  ],
  flow: [
    'Der Browser eines Besuchers fragt GitHub Pages nach einer Seite.',
    'Pages liefert statisches HTML und Fotos in den Größen des Layouts.',
    'Das Bestellformular geht an FormSubmit, das Maria mailt.',
    'Marias Änderungen werden Commits, und die Seite baut sich in 2 Minuten neu.',
  ],
  links: [
    { to: 'GitHub', text: 'Hält die private Quelle und das öffentliche Build-Repo und liefert die Seiten.' },
    { to: 'Cloudflare', text: 'Betreibt den Worker, Workers AI und die E-Mail mit dem Anmeldecode.' },
    { to: 'FormSubmit', text: 'Mailt jede Bestellung an Maria.' },
    {
      to: 'Yandex',
      text: 'Liest die strukturierten Daten, und eine Yandex-Regel in robots.txt fasst die Filterlinks zu einer Seite zusammen.',
    },
  ],
  design: {
    scale: [
      'Ein Studio-Portfolio für Besucher in Russland, mit 16 Galerien und etwa 270 Fotos.',
      'Wenige Personen bearbeiten es, daher braucht die Seite weder Server noch Datenbank, und jede Änderung ist ein Commit.',
      'Die KI-Seite bleibt im kostenlosen Workers-AI-Kontingent von 10.000 Neuronen am Tag, und ein Bild dauert etwa 3 bis 15 Sekunden.',
    ],
    data: [
      'Jede Galerie ist ein Ordner mit einer index.md und ihren Fotos. Der Kopf enthält Titel, Kategorie, Reihenfolge, Titelbild und Bildunterschriften.',
      'Eine settings.json hält Kontakte, Texte der Startseite und die Schriftwahl. Ein zod-Schema prüft sie und die Galerien beim Build.',
      'Die Anmeldecodes werden nicht gespeichert. Jeder ist ein HMAC aus der E-Mail und einem 10-Minuten-Fenster.',
    ],
    interfaces: [
      'Der Rust-Worker bedient GET /auth, POST /auth/code, POST /auth/verify und POST /generate.',
      'Die Verwaltung schreibt über die GitHub-API als Commits. Das Bestellformular geht an FormSubmit, das es per Mail weiterleitet.',
      '/generate nimmt einen Prompt, ein Modell, eine Größe von 256 bis 1536 in 64er-Schritten und bis zu 2 Referenzfotos als Multipart-Formulardaten.',
    ],
    reliability: [
      'Der Worker nennt im CORS-Header genau einen erlaubten Ursprung, da Browser eine Liste ablehnen. Ein Fehler danach geht als JSON hinaus, den die Verwaltungsseite zeigen kann.',
      'Ein GitHub-Ausfall bekommt einen Hinweis zum Wiederholen und keine Meldung zu fehlendem Zugriff. Ein verbrauchtes KI-Kontingent hat eine eigene Meldung.',
      'Jedes Release baut aus dem Quelltext neu, sodass eine schlechte Änderung ein Commit zum Zurücknehmen ist.',
    ],
    security: [
      'Man meldet sich mit einem 6-stelligen Code aus der E-Mail an, 5 Versuche pro Minute und E-Mail, und der Worker gibt der Verwaltung ein fein abgestuftes Repo-Token.',
      '/generate prüft, ob das Token des Aufrufers ins Repo pushen darf, bevor es das Modell aufruft.',
      'Das Token geht nur an ein Fenster auf den erlaubten Ursprüngen. Admin-E-Mails und Tokens liegen in Worker-Einstellungen und Secrets, nicht auf der Seite.',
    ],
    performance: [
      'Astro schreibt jedes Foto als AVIF oder WebP in den Größen, die das Layout braucht, und GitHub Pages liefert statisches HTML.',
      'Das Release behält den Astro-Bildcache zwischen Läufen, statt alle Fotos neu zu rechnen.',
      'Ein Raumfoto schrumpft im Browser vor dem Hochladen auf 512 px. FLUX.2 klein skizziert in etwa 3 Sekunden, dev braucht etwa 15.',
    ],
    operations: [
      'Jeder Push auf main baut die Seite neben den Checks, wartet auf die Checks desselben Commits und schiebt die Seiten dann in das öffentliche Build-Repo.',
      'Ein Release läuft zur Zeit, und ein neuerer Push bricht das veraltete ab, sodass ein alter Build keinen neuen überschreibt. Commits bekommen Datums-Tags.',
      'Die Änderung erscheint etwa 2 Minuten nach dem Speichern. Der Worker wird mit wrangler ausgerollt, Observability ist an.',
    ],
    tradeoffs: [
      'GitHub Pages aus einem öffentlichen Build-Repo statt Cloudflare Pages, da russische Anbieter Cloudflare bremsen, auf Kosten von zwei Repos und einem Release-Token.',
      'Eine Git-basierte Verwaltung statt eines gehosteten CMS, damit es keinen Server und keine Datenbank gibt, auf Kosten von 2 Minuten Wartezeit pro Änderung.',
      'FormSubmit statt eines Workers mit E-Mail, da es kostenlos ist und kein Konto braucht, auf Kosten eines Dienstes außerhalb Russlands.',
      'Workers AI mit FLUX.2 statt bezahlter Bild-APIs, da es Russisch liest und ins kostenlose Kontingent passt, auf Kosten langsamer Bilder von Cloudflare.',
    ],
  },
  features: {
    Portfolio:
      'Jede Galerie ist ein Ordner mit Markdown und Fotos im Repo. Astro baut die Seiten und die Bildgrößen, und der Filter läuft im Browser.',
    'Order a design':
      'Jedes Formular geht an FormSubmit, das die Anfrage an Maria mailt. Die Seite braucht dafür keinen eigenen Server.',
    Admin:
      'Sveltia CMS läuft auf der Admin-Seite und committet jede Änderung ins Repo. Der Worker mailt Maria einen Anmeldecode und gibt dem Admin-Bereich dann ein Repo-Token.',
    Fonts:
      'Die 10 Schriften kommen aus Fontsource und liegen bei der Seite. Die Wahl steht in der Einstellungsdatei, und das Layout setzt sie beim nächsten Build um.',
    'AI generator':
      'Die Admin-Seite packt Marias russische Anfrage und den Stil in einen englischen Prompt. Der Worker prüft ihren GitHub-Zugang, dann zeichnet FLUX.2 auf Workers AI das Bild.',
    Search:
      'Das Astro-Layout schreibt auf jede Seite Titel, Beschreibung, Teilbild und strukturierte Daten. Der Build schreibt robots.txt, llms.txt und eine Sitemap mit Daten aus git.',
  },
};

export default arch;

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

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Ein Cloudflare Worker in Rust liefert die statischen Astro-Seiten und die API. D1 hält Buchungen und Einstellungen, und R2 hält die Fotos.',
  parts: [
    { name: 'Astro', role: 'baut die statischen Seiten, die Head-Tags und die Sitemap.' },
    {
      name: 'Rust Worker',
      role: 'beantwortet die API für Fotos, Buchungen, Anmeldung, Galerien und den Kalender-Feed.',
    },
    { name: 'booking-core', role: 'das Rust-Crate, das freie Zeiten, Sonnenuntergang und iCal-Text berechnet.' },
    {
      name: 'D1',
      role: 'hält die Fotoliste, die Buchungen, die Galerien, die Einstellungen und die Anmeldesitzungen.',
    },
    { name: 'R2', role: 'hält die verkleinerten Fotos, die Galeriedateien und eine hochgeladene Schrift.' },
    { name: 'Email Routing', role: 'schickt Alina Buchungen und Fragen und den Admins ihre Anmeldelinks.' },
    {
      name: 'Browser-Skripte',
      role: 'verkleinern, bearbeiten und markieren Fotos und bauen das Zip auf dem eigenen Gerät.',
    },
    {
      name: 'Google Kalender',
      role: 'seine private iCal-Adresse markiert belegte Zeiten, und er liest den Buchungs-Feed zurück.',
    },
  ],
  flow: [
    'Ein Kunde öffnet eine Seite, die der Worker als statisches HTML liefert.',
    'Die Seite fragt die Worker-API nach Fotos oder freien Zeiten.',
    'Der Worker liest D1 und Alinas Kalender, und booking-core findet freie Zeiten.',
    'Eine neue Buchung geht in D1 und per E-Mail mit Kalenderdatei an Alina.',
    'Fotos laden aus R2 in 2 Größen.',
  ],
  links: [
    {
      to: 'Google Calendar',
      text: 'Belegte Zeiten kommen als iCal, 5 Minuten zwischengespeichert. Ein privater Feed schickt jede Buchung zurück.',
    },
    { to: 'Cloudflare', text: 'Betreibt Worker, D1, R2, Email Routing und das Ratenlimit der Formulare.' },
    {
      to: 'GitHub',
      text: 'Ein Release spielt die D1-Migrationen ein und deployt, sobald die Prüfungen auf main durchlaufen.',
    },
  ],
  design: {
    scale: [
      'Die Studioseite einer Fotografin: Kunden buchen und öffnen Galerien, und Alina betreibt einen Adminbereich. Der Verkehr ist gering.',
      'Jedes Foto liegt in 2 Größen vor, 2400 px und 800 px, und eine Kameradatei mit 25 MB geht als unter 1 MB hoch.',
      'Eine Worker-Anfrage hat wenige Millisekunden CPU, und der Wasm-Build ist etwa 2,5 MB groß, was schwere Arbeit in den Browser verlagert hat.',
    ],
    data: [
      'D1 hält photos, bookings, settings, sessions, login_links, galleries und gallery_files. Zeiten liegen als UTC-Text vor, daher ist die Textreihenfolge die Zeitreihenfolge.',
      'Zeilen in settings sind JSON ohne Version. Eine Zeile, die nicht mehr lesbar ist, fällt auf den Standard zurück und protokolliert einen Fehler.',
      'R2 hält die Fotos als p/<id>/l.webp und s.webp, eine hochgeladene Schrift und Galeriedateien unter g/<gallery>/ als Vorschau, 160-px-Vorschaubild und Original.',
    ],
    interfaces: [
      'Der Worker liefert JSON unter /api für Tage, Zeitfenster, Buchungen, Fotos, Galerien und Anmeldung sowie einen Kalender-Feed unter /calendar/<token>.ics.',
      'Kalender hinein ist Alinas geheime iCal-Adresse, 5 Minuten zwischengespeichert. Kalender hinaus ist der Buchungs-Feed, und jede Buchungsmail trägt booking.ics.',
      'E-Mail geht über die send_email-Bindung von Email Routing, nur an Alinas verifizierte Adresse.',
      'booking-core ist eine Rust-Crate für Zeitfenster, die Buchungsprüfung, Sonnenuntergang und iCal, mit der Crate rrule für wiederkehrende Termine.',
    ],
    reliability: [
      'Ein Buchungs-POST prüft erneut, ob das Zeitfenster noch frei ist, daher wird ein nach dem Laden der Liste vergebenes Fenster abgelehnt.',
      'Ein abonnierter Kalender-Feed hinkt um Stunden hinterher, daher trägt jede Buchungsmail auch die iCal-Datei.',
      'Abgelaufene Sitzungen und Anmeldelinks werden aus D1 gelöscht, und ein gespeicherter Test hält die heutigen settings-Zeilen lesbar.',
      'Das Release migriert D1 und deployt, und bei Cloudflare-Timeouts bekommen die Migrationen und das Deploy je 3 Versuche.',
    ],
    security: [
      'Die Anmeldung ist ein Link per E-Mail, 15 Minuten gültig. Er öffnet eine Seite, die das Token per POST sendet, da Mail-Scanner GET-Links öffnen.',
      'Eine Sitzung dauert 30 Tage in einem Cookie mit HttpOnly und SameSite Lax, und D1 speichert nur den Hash des Tokens.',
      'Eine Workers-Rate-Limit-Bindung erlaubt 5 Aufrufe pro Minute und IP bei den Formularen für Buchung und E-Mail.',
      'Die Galerie-ID steht im Hash des Links, bleibt also aus Serverlogs und Referrern heraus. Jeder mit dem Link sieht die Galerie.',
    ],
    performance: [
      'Der Browser verkleinert jedes Foto vor dem Upload auf 2 Größen, daher geht eine 25-MB-Datei als unter 1 MB hoch, ohne GPS-Daten.',
      'client-zip baut das Galerie-Zip im Browser, da der Worker Gigabytes nicht innerhalb seines CPU-Limits lesen kann.',
      'Seiten sind statisches Astro-HTML vom Worker, und der Kalendertext ist 5 Minuten zwischengespeichert.',
    ],
    operations: [
      'Ein Worker liefert Seiten und API. worker-build macht aus dem Rust Wasm, und mise pinnt Rust, Node und pnpm.',
      'Das Release startet per workflow_run, sobald Checks auf main bestehen, ein Lauf nach dem anderen: Build, D1-Migrationen, Deploy, Tag.',
      'Migrationen sind nummerierte SQL-Dateien in migrations/. Lint umfasst oxlint, oxfmt, tsc, knip, rustfmt, clippy für den PC und für Wasm sowie cargo shear.',
    ],
    tradeoffs: [
      'Ein Worker für Seiten und API statt GitHub Pages plus Worker, damit das Admin-Cookie auf einem Origin ohne CORS funktioniert.',
      'Anmeldung per E-Mail-Link statt Passwort oder Cloudflare Access, damit Alina kein Passwort vergessen kann und kein Zero-Trust-Setup nötig ist.',
      'iCal hinein und hinaus statt der Google-Kalender-API, damit keine OAuth-App, Prüfung oder Token-Erneuerung nötig ist, doch ein Feed hinkt um Stunden hinterher.',
      'Verkleinern, Wasserzeichen und Zip im Browser statt im Worker, dem die CPU fehlt, auf Kosten davon, dass eine Vorschau ohne ihre Originaldatei nicht neu beschriftet werden kann.',
    ],
  },
  features: {
    Portfolio:
      'Die Seite lädt die Fotoliste vom Worker, der sie aus D1 liest. Jedes Foto kommt aus R2 in 2 WebP-Größen, 800 und 2400 px.',
    Booking:
      'booking-core in Rust berechnet freie Zeiten aus Alinas Stunden, den Buchungen in D1 und ihren belegten Kalenderzeiten. Die goldene Stunde leitet es aus dem Sonnenuntergang ab.',
    Questions:
      'Das Formular geht an den Worker, der Alina über Cloudflare Email Routing schreibt. Sie antwortet dem Kunden direkt aus dieser E-Mail.',
    Admin:
      'Der Worker schickt einen Anmeldelink per E-Mail und hält die Sitzung in D1. Fotos schrumpfen im Browser auf 2400 px und verlieren GPS-Daten, bevor sie nach R2 gehen.',
    'Calendar sync':
      'Der Worker liest die private iCal-Adresse von Alinas Google Kalender und speichert sie 5 Minuten zwischen. Ein privater Feed und eine Datei in jeder Buchungsmail bringen die Buchungen zurück.',
    Fonts:
      'Die 10 Schriften kommen mit der Seite, und eine hochgeladene geht nach R2. Der Worker liefert ein Theme-Stylesheet aus der Wahl in D1, 1 Minute zwischengespeichert.',
    'Client galleries':
      'Der Browser zeichnet das Wasserzeichen vor dem Hochladen auf jeden Probeabzug, und R2 hält Probeabzüge und Originale. Der Browser des Kunden baut das Zip der Originale mit client-zip.',
    Reviews:
      'Der Worker legt jede Bewertung als ausstehend in D1 ab, hinter einem Honeypot und einem Rate Limit, und schreibt Alina. Nur freigegebene Zeilen gehen über die API hinaus, und die Seite ergänzt Review- und AggregateRating-Daten.',
    Search:
      'Astro schreibt beim Build Titel, Beschreibung, Fotokarte und strukturierte Daten in jede Seite. Die Sitemap entsteht aus den gebauten Seiten.',
  },
};

export default arch;

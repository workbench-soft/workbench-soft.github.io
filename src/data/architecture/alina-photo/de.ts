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
    Search:
      'Astro schreibt beim Build Titel, Beschreibung, Fotokarte und strukturierte Daten in jede Seite. Die Sitemap entsteht aus den gebauten Seiten.',
  },
};

export default arch;

import type { Catalog } from './types';

const de: Catalog = {
  ui: {
    meta: {
      title: 'Workbench Soft: Apps für Android, das Web, Windows und macOS',
      description:
        'Workbench Soft entwickelt und veröffentlicht Apps: {names} und Werkzeuge für Entwickler. Jedes Projekt mit jeder seiner Funktionen.',
      org: 'Ein Softwarestudio, das Apps für Android, iPhone, das Web, Windows und macOS baut.',
    },
    nav: {
      services: 'Leistungen',
      projects: 'Projekte',
      process: 'Ablauf',
      contact: 'Kontakt',
      main: 'Hauptmenü',
      search: 'Suche',
      searchLabel: 'Projekte und Funktionen durchsuchen',
      language: 'Sprache',
      skip: 'Zu den Projekten springen',
    },
    hero: {
      status: 'Offen für Kundenprojekte',
      lines: ['Wir entwerfen,', 'bauen und liefern', 'Software.'],
      lead: 'Workbench Soft ist ein unabhängiges Studio. Es baut Apps für Android, iPhone, das Web, Windows und macOS und begleitet jede von der ersten Spezifikation bis in den Store, in die Suchergebnisse und durch die Updates danach.',
      start: 'Projekt starten',
      work: 'Arbeiten ansehen',
      projects: 'Projekte',
      features: 'Funktionen ausgeliefert',
      platforms: 'Plattformen',
      ads: 'Werbung auf dieser Seite',
    },
    services: {
      title: 'Was das Studio für Sie baut',
      intro: 'Das Team hinter den Apps unten baut auch Ihre. Jeder Bereich verlinkt die Projekte, die ihn belegen.',
    },
    projects: {
      title: 'Die Arbeit, Funktion für Funktion',
      intro:
        'Jedes Projekt unten zeigt, was es für die Person tut, die es nutzt. Drücken Sie {key}, um jede Funktion zu finden.',
      filter: 'Projekte filtern',
      all: 'Alle',
      find: 'Funktion finden',
      index: 'Projektübersicht',
      features: 'Funktionen',
      platforms: 'Plattformen',
      stack: 'Technik',
      kinds: { app: 'Apps', tool: 'Entwicklerwerkzeuge', archive: 'Archiv' },
    },
    process: {
      title: 'Von der ersten Spezifikation bis in den Store',
      intro:
        'Jedes Projekt oben ging durch dieselben Schritte. Ein Kundenprojekt geht sie auch, und der Kunde sieht jeden davon.',
    },
    contact: {
      title: 'Eine App im Kopf?',
      intro: 'Schreiben Sie ein paar Zeilen zur Idee, zu den Plattformen und zum Termin.',
      write: 'E-Mail schreiben',
      copy: 'Adresse kopieren',
      copied: 'Kopiert',
      subject: 'Ein Projekt für Workbench Soft',
    },
    palette: {
      results: 'Ergebnisse',
      empty: 'Kein Treffer. Versuchen Sie ein anderes Wort.',
      project: 'Projekt',
      feature: 'Funktion',
    },
    footer: {
      noAds: 'Diese Seite zeigt keine Werbung.',
      releases: 'Releases',
      privacy: 'Datenschutz Memories',
    },
    technologies: 'Technologien',
  },
  services: [
    {
      title: 'Mobile Apps',
      text: 'Apps für Android und iPhone in React Native und Expo. Hintergrunddienste, Aktivierungswörter, Karten, Offline-Daten und In-App-Käufe. Veröffentlicht bei Google Play oder als APK, das sich selbst aktualisiert.',
    },
    {
      title: 'Web-Apps und PWAs',
      text: 'Apps in Next.js, React und Astro, die sich auf dem Startbildschirm installieren und ohne Netz öffnen. Gehostet auf Cloudflare Workers, mit Seiten, die Suchmaschinen indexieren.',
    },
    {
      title: 'Desktop- und Systemwerkzeuge',
      text: 'Native Apps in Rust und Tauri für Windows und macOS. Tastatur-Hooks, Symbole im Infobereich, Dateisortierung mit Rückgängig und Installer, die sich selbst aktualisieren.',
    },
    {
      title: 'Karten, Sprache und Audio',
      text: 'Live-Karten mit Routen Schritt für Schritt. Aktivierungswörter und Spracherkennung offline. Synthesizer, Effekte und MIDI im Browser.',
    },
    {
      title: 'Start und Wachstum',
      text: 'Eintrag und Release bei Google Play, Search Console, Sitemaps und strukturierte Daten. AdMob und AdSense mit Einwilligungsdialog, danach ein Plan für die ersten Nutzer.',
    },
    {
      title: 'Engineering und KI-Werkzeuge',
      text: 'CI auf Ihrer eigenen Hardware, gemeinsame GitHub Actions und Skills, mit denen Coding-Agenten den Regeln eines Teams folgen, vom Ticket bis zum Merge.',
    },
  ],
  steps: [
    {
      title: 'Spezifikation',
      text: 'Jede Funktion beginnt als schriftliche Spezifikation im Repo: was sie für die Person tut, die Abläufe und die Grenzen. Sie lesen und genehmigen dieselbe Datei.',
    },
    {
      title: 'Entwicklung',
      text: 'Die Arbeit läuft auf einem eigenen Branch, mit eigener Datenbank, eigenem Port und Emulator. Jeder Schritt ist ein Commit mit bestandenen Prüfungen.',
    },
    {
      title: 'Review und Auslieferung',
      text: 'Ein Pull Request mit Diagrammen der Nutzerabläufe, dann CI. Grüne Prüfungen führen zum Merge, und die Doku ändert sich im selben PR.',
    },
    {
      title: 'Start und Betrieb',
      text: 'Release im Store, Sucheinrichtung und Updates in der App. README, Architektur und Funktionsdoku bleiben nach jeder Änderung korrekt.',
    },
  ],
  projects: {
    memories: {
      tagline: 'Fotos von diesem Tag, von Ihrem eigenen NAS.',
      lede: 'Memories zeigt diesen Tag in früheren Jahren, aus den Fotos und Videos auf einem NAS zu Hause. Es funktioniert wie die Rückblicke in Google Fotos, und die Fotos bleiben auf Hardware, die zu Hause steht.',
      links: ['Website öffnen'],
      groups: [
        {
          features: [
            [
              'Tägliche Erinnerung',
              'Eine Mitteilung zur gewählten Zeit nennt Jahr und Ort, etwa „Vor 3 Jahren in Japan“. Reisen ins Ausland kommen zuerst.',
            ],
            [
              'Heute',
              'Dieser Monat und Tag in jedem Jahr der Bibliothek. Ein Tipp auf das Datum wählt einen anderen Tag.',
            ],
            [
              'Reisen',
              'Mehrere Tage mit Fotos im Ausland werden zu einer Reise. Ein Link öffnet ihre Fotos vom ersten bis zum letzten Tag.',
            ],
            [
              'Fotos und Archiv',
              'Alle Fotos und Videos, neueste zuerst, mit einer Überschrift pro Tag. Das Archiv listet jedes Jahr und jeden Monat mit Anzahl.',
            ],
            ['Orte', 'Jeder Tag nennt, wo er war. Eine Filterleiste sucht Orte und wählt Geräte.'],
            [
              'Kamera- und Drohnenaufnahmen',
              'Aufnahmen einer Kamera oder Drohne bekommen eine eigene Gruppe neben den Handyfotos.',
            ],
            [
              'Zoom mit zwei Fingern',
              'Eine Fingergeste setzt 1 bis 6 Kacheln pro Zeile, für jedes Raster und über Neustarts hinweg.',
            ],
            [
              'Viele auf einmal senden',
              'Langes Drücken startet die Auswahl. Die gewählten Fotos gehen in einem Teilen an jede App.',
            ],
            [
              'Album-Links',
              'Gewählte Fotos werden zu einem Link. Die andere Person öffnet das Album im Browser, ohne App und ohne Konto.',
            ],
            [
              'Ordnen',
              'Schrittkarten sortieren die Fotos auf dem Handy, verschieben sie in Datumsordner auf dem NAS und machen das Handy frei.',
            ],
            [
              'Auf dem NAS sortieren',
              'Gewählte NAS-Dateien bekommen Datumsnamen und Ordner, auf dem NAS und im Index zugleich.',
            ],
            ['Betrachter', 'Fotos und Videos im Vollbild, mit Wischen zum nächsten. Videos laufen direkt vom NAS.'],
            [
              'Mit dem NAS verbinden',
              'Die App findet das NAS im WLAN. Eine Anmeldung öffnet den Fotoordner über WebDAV.',
            ],
            ['Unterwegs', 'Eine zweite Adresse über Tailscale erreicht das NAS, ohne es ins Internet zu öffnen.'],
            [
              'Sync-Fortschritt',
              'Ein Banner zeigt, was Handy und NAS-Index enthalten, was gerade läuft und was als Nächstes kommt.',
            ],
            [
              'Mobile Daten',
              'Vor dem ersten Sync über mobile Daten fragt die App. Ein Schalter in den Einstellungen ändert die Antwort.',
            ],
            [
              'Index auf dem NAS',
              'Ein Indexer auf dem NAS liest die Fotos von der eigenen Platte, viel schneller als ein Sync über WebDAV.',
            ],
            [
              'Umzug auf ein neues Handy',
              'Das neue Handy übernimmt den Index vom alten, statt eines ersten Syncs, der Stunden dauert.',
            ],
            [
              'Englisch und Russisch',
              'Die App folgt der Sprache des Handys. Ab Android 13 lässt sie sich pro App einstellen.',
            ],
            ['Hell und dunkel', 'Folgt dem Handy oder einer festen Wahl in den Einstellungen.'],
            [
              'Werbung entfernen',
              'Ein einmaliger Kauf bei Google Play blendet die Werbung auf jedem Handy mit demselben Google-Konto aus.',
            ],
          ],
        },
      ],
    },
    spotthecam: {
      tagline: 'Blitzer in Australien und Neuseeland auf einer Karte.',
      lede: 'SpotTheCam zeigt die offiziellen Blitzerstandorte der australischen Bundesstaaten und Neuseelands auf einer Karte. Jede Markierung trägt das Tempolimit, das gerade gilt. Die Android-App bringt Sprachwarnungen, ein Fahrtenbuch und Routen Schritt für Schritt.',
      links: ['spotthecam.com'],
      groups: [
        {
          title: 'Auf der Karte, in jedem Browser',
          features: [
            [
              'Aktuelle Limits',
              'Jeder Blitzer zeigt das Limit in diesem Moment. In einer Schulzone folgt die Zahl dem Zeitplan der Zone.',
            ],
            ['Suche nach Vorort', 'Geben Sie einen Vorort ein, und die Karte fliegt zu seinen Blitzern.'],
            ['Blitzertypen', 'Ein Druck behält nur die Typen, die Sie brauchen. Der Browser merkt sich die Wahl.'],
            [
              'Mir folgen',
              'Die Karte folgt Ihnen und dreht sich in Fahrtrichtung. Straßennamen und Schilder bleiben aufrecht.',
            ],
            [
              'Blitzerdetails',
              'Eine Markierung zeigt Typ, Adresse, aktuelles Limit und einen Link zur offiziellen Quelle.',
            ],
            [
              'Offline nutzbar',
              'Die Blitzerliste und jeder geöffnete Kartenbereich bleiben auf dem Gerät. Sie installiert sich als App.',
            ],
            ['Helle und dunkle Karte', 'Auto passt sich dem Gerät an, oder wählen Sie im Zahnradmenü.'],
          ],
        },
        {
          title: 'In der Android-App',
          features: [
            ['Tempoanzeige', 'Ihr Tempo neben dem Limit der Straße. Darüber wird die Anzeige rot.'],
            [
              'Blitzerwarnungen',
              'Ein Ton etwa 20 Sekunden vorher, dann „Blitzer voraus. Limit 60.“ Auch auf dem Sperrbildschirm.',
            ],
            ['Zu schnell', '„Sie fahren 72. Bitte langsamer.“ Nur nahe Blitzern oder auf jeder Straße.'],
            [
              'Fahrtenbuch',
              'Fahrten und Spaziergänge zeichnen sich selbst auf. Jede Route zeigt Ihr Tempo an jedem Blitzer, grün oder rot.',
            ],
            ['Fahrt teilen', 'Ein Link zeigt die Route in jedem Browser. „Teilen beenden“ löscht sie vom Server.'],
            ['Strecke', 'Große Ziffern zeigen die Kilometer der aktuellen Fahrt und die Summe des Tages.'],
            [
              'Routen Schritt für Schritt',
              'Die schnellste Reihenfolge der Stopps, Abbiegungen bei 500 m und 200 m angesagt, um den heutigen Verkehr herum. Nach falschem Abbiegen gibt es eine neue Route.',
            ],
            [
              'Routenoptionen',
              'Hin und zurück, zu Fuß oder ohne Mautstraßen. Favoriten wie Zuhause kommen mit einem Tipp auf die Route.',
            ],
            [
              'Hey Spot',
              '„Hey Spot, go to Bondi Beach, Manly and back.“ Ein Offline-Modell auf dem Handy hört die Aktivierungswörter.',
            ],
            ['Bildschirm bleibt an', 'Die Karte bleibt am Armaturenbrett hell, solange die App offen ist.'],
            [
              'Selbst-Update',
              'Das APK sucht bei GitHub nach einem neueren Release, mit Größe, Fortschritt und Abbrechen-Knopf.',
            ],
          ],
        },
      ],
    },
    'guitar-upscale': {
      tagline: 'Eine Gitarre, die Sie im Browser spielen.',
      lede: 'Guitar Upscale zeigt Skalen und Akkorde auf einem virtuellen Griffbrett, nimmt Loops auf und speichert sie als MIDI. Es bearbeitet Songs Note für Note, zeigt sie als Tabulatur und installiert sich auf dem Startbildschirm.',
      links: ['guitar-upscale.com'],
      groups: [
        {
          features: [
            [
              'Griffbrett',
              'Das Griffbrett füllt den Bildschirm, markiert die Töne der Skala und spielt jeden Ton, den Sie antippen.',
            ],
            [
              'Skala, Stimmung und Kapodaster',
              'Ein Knopf nennt Tonart und Modus und öffnet die Auswahl für Skala, Stimmung und Kapodaster.',
            ],
            ['Stimmgerät', 'Hört über das Mikrofon, mit einer Skala, die mit dem Fenster wächst.'],
            ['Akkorde der Tonart', 'Ein Akkord pro Skalenton, etwa Em F#dim G Am Bm C D für e-Moll.'],
            ['Anschlag', 'Ein gehaltener Akkord schlägt ein Muster im Takt der Uhr an. Muster lassen sich bearbeiten.'],
            ['Songliste', 'Eingebaute Songs und Ihre eigenen. Songs, die zur aktuellen Skala passen, erscheinen grün.'],
            ['Sprachsuche', 'Sagen Sie einen Songnamen. Die Wörter füllen die Suche, während Sie sprechen.'],
            ['Hey Guitar', '„Hey Guitar, play Metallica One.“ Die App antwortet „Listening“ und spielt ihn.'],
            [
              'MIDI-Aufnahme',
              'Nimmt die Töne und Akkorde auf, die Sie spielen. Töne, die die App selbst abspielt, bleiben aus der Aufnahme.',
            ],
            ['Looper', 'Kurze Loops auf mehreren Kanälen spielen zusammen.'],
            ['Quantisierung', 'Eine Länge von 1/1 bis 1/64 setzt Raster, Aufnahme und Looper, wie in Cubase.'],
            [
              'Piano Roll',
              'Noten zeichnen, verschieben, dehnen, kopieren und löschen. Das Lineal markiert Strophe, Refrain, Bridge und Solo.',
            ],
            [
              'Tab-Ansicht',
              'Eine Spur als Tabulatur im Stil von Guitar Pro, mit einem Abspielkopf, der dem Song folgt.',
            ],
            [
              'Akkordblatt',
              'Akkordnamen in Takten, die mit dem Song aufleuchten. Der Text öffnet sich bei Musixmatch.',
            ],
            ['Songs hochladen', 'Guitar-Pro- und MIDI-Dateien kommen in Ihre Songliste.'],
            [
              'Song online finden',
              'Durchsucht 4 Songseiten auf einmal. Ein Song von Songsterr wird zur Guitar-Pro-Datei.',
            ],
            ['Akkord- und Skalenerkennung', 'Spielen Sie, und die App nennt den Akkord oder die Skala, die sie hört.'],
            ['Instrumente', 'Getrennte Instrumente für Melodie und Akkorde: Sitar, Banjo, Koto, Streicher und mehr.'],
            [
              'Effekte',
              'Hall und Delay, jeweils mit eigenem Schalter und Reglern. Der Klang ändert sich, während ein Regler sich bewegt.',
            ],
            ['MIDI-Export', 'Dateien werden heruntergeladen oder gehen über das Teilen-Menü hinaus.'],
            [
              'Bezahlstufen',
              'Anmeldung über Patreon oder ein Kauf bei Google Play schalten die Werkzeuge Explorer und Composer frei.',
            ],
            [
              'Installation und offline',
              'Eine PWA, die im Querformat als Vollbild öffnet. Das Android-APK aktualisiert sich selbst.',
            ],
          ],
        },
      ],
    },
    tickalot: {
      tagline: 'Einkaufs-, Pack- und Sightseeinglisten, die Sie per Link teilen.',
      lede: 'Die andere Person öffnet den Link und hakt ab, und jeder Haken erscheint sofort auf beiden Handys. Keine Registrierung. Listen bleiben auf dem Handy, und eine geteilte Liste geht auch in die Cloud.',
      links: ['tickalot.web.app'],
      groups: [
        {
          features: [
            [
              'Per Link teilen',
              'Beide Handys sehen jeden Haken live. Offline gemachte Änderungen synchronisieren, sobald das Netz zurück ist.',
            ],
            [
              'Grundliste',
              'Was Sie meist kaufen. Ein paar Tipps machen daraus die Liste dieser Woche, mit Mengen und Notizen.',
            ],
            [
              'Viele Einträge tippen oder sagen',
              '„Croissants 2 Packungen à 3, Bio-Eier“ wird zu 2 Einträgen mit Mengen. Englisch und Russisch.',
            ],
            ['Bilder', 'Die App wählt ein Emoji zum Namen jedes Eintrags. Ein Tipp fügt ein Foto hinzu.'],
            [
              'Gänge im Laden',
              'Wählen Sie den Laden aus OpenStreetMap und tippen Sie einen Gang einmal ein. Die Liste folgt dann Ihrem Weg.',
            ],
            ['Geteilte Gänge', 'Gänge, die ein Käufer eintippt, erscheinen bei jedem, der denselben Laden wählt.'],
            ['Preise bei Coles und Woolworths', 'Ein Grundpreis unter jedem Eintrag, der günstigere Laden in Grün.'],
            ['Packen für eine Reise', 'Jede Reise beginnt als Kopie Ihrer üblichen Packliste.'],
            ['Sehenswertes', 'Orte aus Wikipedia, verteilt auf die Tage der Reise.'],
            ['Erledigte Listen', 'Eine fertige Liste räumt sich selbst weg, ohne Aufräumen von Hand.'],
            ['Hell und dunkel', 'Folgt dem Handy oder einer festen Wahl.'],
            ['Updates', 'Das APK bietet ein neueres Release mit Größe und einem Hinweis bei mobilen Daten an.'],
            [
              'Werbung entfernen',
              'Ein einmaliger Kauf. Menschen in Europa sehen das Einwilligungsformular vor jeder Werbung.',
            ],
          ],
        },
      ],
    },
    keeppad: {
      tagline: 'Sprachnotizen, die Sie mit „Hey Keep“ starten.',
      lede: 'Sagen Sie „Hey Keep“, und die App antwortet „Aufnahme“. Sie schreibt mit, was Sie als Nächstes sagen, und legt die Notiz in die richtige Gruppe, bei geschlossener App und ausgeschaltetem Bildschirm.',
      links: ['keeppad.com'],
      groups: [
        {
          features: [
            ['Hey Keep', 'Ein Aktivierungswort, auf das das Handy im Hintergrund hört. „Эй, Кип“ geht auch.'],
            ['Stopp und weiter', '„Stopp“ beendet die Notiz sofort. „Hey Keep, weiter“ ergänzt die neueste Notiz.'],
            ['Aufnahme per Knopf', 'Die Wörter erscheinen auf dem Bildschirm, während Sie sprechen.'],
            ['Aufnahmen', 'Ab Android 13 und auf dem iPhone behält eine Notiz ihren Ton.'],
            [
              'Gruppen',
              'Zu erledigen, Einkauf, Ideen, Arbeit und mehr. KI auf dem Gerät wählt die Gruppe, wo das Handy sie hat.',
            ],
            [
              'Englisch und Russisch',
              'Eine Notiz nutzt eine der Sprachen oder beide. Unter Android 14 kann sie an einer Pause die Sprache wechseln.',
            ],
            [
              'Per Link teilen',
              'Die andere Person öffnet die Notiz in der App oder im Browser, und beide bearbeiten sie live.',
            ],
            ['An andere Apps senden', 'Neue Notizen gehen an Obsidian, Notion, Todoist, Google Docs oder OneNote.'],
            ['Website', 'Geteilte Notizen öffnen sich im Browser, neben den Anleitungen und Richtlinien.'],
            ['Update in der App', 'Das APK findet ein neueres Release, lädt es und öffnet den Installer.'],
            ['Hell und dunkel', 'Folgt dem Handy oder einer festen Wahl.'],
          ],
        },
      ],
    },
    servohop: {
      tagline: 'Spritpreise in Australien auf einer Karte, mit dem Verlauf jeder Tankstelle.',
      lede: 'ServoHop liest die staatlichen Spritpreisdaten und setzt jede Tankstelle nach Preis gefärbt auf eine Karte. Es speichert den täglichen Verlauf und zeigt auch Ladesäulen. Es ist kostenlos und braucht kein Konto.',
      links: ['servohop.com'],
      groups: [
        {
          features: [
            [
              'Preise auf der Karte',
              'Grüne Pins für das günstigste Drittel, gelbe für die Mitte und rote für das teuerste.',
            ],
            [
              'Tankstellenliste',
              'Die Tankstellen im Bild, günstigste zuerst, mit Marke, Vorort und Zeit der letzten Preisänderung.',
            ],
            ['Preisverlauf', 'Der Tagesdurchschnitt über einem Band vom Tief bis zum Hoch, für 30, 90 oder 365 Tage.'],
            [
              'Meldungen von Fahrern',
              'Wo kein staatlicher Datenstrom existiert, melden Fahrer den Preis von der Anzeigetafel.',
            ],
            [
              'Ladesäulen',
              'Netz, Stecker und Höchstleistung. Fahrer melden den Preis pro kWh, und die App speichert seinen Verlauf.',
            ],
            [
              'Suchseiten',
              'Eine Seite für jeden Bundesstaat, jeden Vorort und jede Tankstelle, mit strukturierten Daten und einer Sitemap.',
            ],
            [
              'Selbst-Update',
              'Das APK prüft GitHub beim Start und bei jeder Rückkehr und zeigt den Download in der Kopfzeile.',
            ],
            [
              'Werbung entfernen',
              'Ein einmaliger Kauf bei Google Play, der auf einem neuen Handy wiederhergestellt wird.',
            ],
          ],
        },
      ],
    },
    consdr: {
      tagline: 'Leasing, Kredit oder bar: was ein Auto in Australien kostet.',
      lede: 'Consdr zeigt die Gesamtkosten desselben Autos über dieselbe Laufzeit als Novated Lease, als Autokredit und als Barkauf. Jede feste Zahl der Rechnung verlinkt ihre Quelle.',
      links: ['consdr.com'],
      groups: [
        {
          features: [
            ['Drei Wege nebeneinander', 'Leasing, Kredit und bar, jeweils als eine Summe für die ganze Laufzeit.'],
            [
              'Wohin das Geld geht',
              'Jede Summe teilt sich in Auto, Finanzierung, laufende Kosten, Steuer und entgangene Zinsen.',
            ],
            ['Leasing- und Kreditwerte', 'Zins, Schlussrate, Gebühren, Sprit über das Leasing und die FBT-Befreiung.'],
            [
              'FBT nach Autotyp',
              'Die Regel für ein Elektroauto, einen Plug-in-Hybrid oder einen Benziner, nach Startdatum und Preis.',
            ],
            [
              'Stempelsteuer nach Bundesstaat',
              'Alle 8 Bundesstaaten und Territorien, aus Preis, Autotyp und Startdatum.',
            ],
            [
              'Zinsen auf dem Konto',
              'Das Geld wächst jeden Monat auf einem Offset-Konto zur Hypothek oder einem Sparkonto, damit der Vergleich fair bleibt.',
            ],
            ['Kredit fürs Eigenheim', 'Wie viel weniger eine Bank leiht, solange das Auto abbezahlt wird.'],
            ['Rechenweg und Quellen', 'Jeder Schritt der Summe, mit einer Quelle für jede feste Zahl.'],
            ['Häufige Fragen', 'Antworten zu Leasing, der E-Auto-Befreiung, Schlussraten und Immobilienkrediten.'],
            [
              'Ratgeber',
              'Einfache Seiten zu Novated Lease, FBT, Schlussraten und Stempelsteuer, mit Zahlen nach denselben Regeln.',
            ],
            ['Gespeicherte Eingaben', 'Ein Neuladen behält Ihre Felder. „Zurücksetzen“ leert sie.'],
            ['Offline', 'Der Rechner öffnet sich nach dem ersten Besuch ohne Netz.'],
            ['Farbschema', 'Auto, Hell oder Dunkel.'],
            ['Werbung entfernen', 'Ein einmaliger Kauf in der Android-App.'],
          ],
        },
      ],
    },
    langflip: {
      tagline: 'Korrigiert Wörter, die im falschen Tastaturlayout getippt wurden.',
      lede: 'Tippen Sie ghbdtn im falschen Layout, und Langflip schreibt stattdessen «привет» und wechselt das Layout. Englisch funktioniert genauso. Es läuft offline und protokolliert nicht, was Sie tippen.',
      links: ['Herunterladen'],
      groups: [
        {
          features: [
            [
              'Korrektur beim Tippen',
              'Ab dem 4. Buchstaben wird ein Wort, das nur im anderen Layout Sinn ergibt, darin neu getippt.',
            ],
            [
              'Kurze Wörter',
              'Wörter unter 4 Buchstaben ändern sich bei Leertaste, Enter oder Tab, nur wenn das andere Layout ein echtes Wort ergibt.',
            ],
            ['Ziffern bleiben', 'ьз3 wird zu mp3.'],
            ['Korrektur zurücknehmen', 'Pause direkt nach einer Korrektur holt das Wort zurück und merkt es sich.'],
            ['Von Hand umwandeln', 'Shift+Pause wandelt das letzte Wort ins andere Layout um.'],
            [
              'Apps und Felder auslassen',
              'Passwortfelder, Admin-Fenster und jede App aus den Einstellungen bleiben unberührt.',
            ],
            ['Layout am Symbol', 'Der Infobereich zeigt EN auf Blau oder RU auf Rot für das Fenster im Vordergrund.'],
            ['Pause per Klick', 'Ein Klick auf das Symbol schaltet die Korrektur aus, und das Symbol wird grau.'],
            [
              'Wechsel per Doppelklick',
              'Ein Doppelklick auf das Symbol wechselt das Layout des Fensters im Vordergrund.',
            ],
            ['Start bei der Anmeldung', 'Schaltet sich beim ersten Start ein, mit einem Schalter im Menü des Symbols.'],
            ['Einstellungsdatei', 'Ausgenommene Apps und Wörter, die bleiben, in einer TOML-Datei.'],
          ],
        },
      ],
    },
    'media-organizer': {
      tagline: 'Sortiert Fotos und Videos nach Datum und Ort in Ordner.',
      lede: 'Eine Desktop-App, die liest, wann und wo jedes Foto entstand, und es in einen Ordner für Jahr, Ort und Tag verschiebt. Sie teilt die Ordnerregeln mit Memories, sodass Handy und Computer gleich sortieren.',
      links: ['Installieren'],
      groups: [
        {
          features: [
            ['Scannen', 'Listet jede Datei des gewählten Ordners, während sie ihn durchgeht.'],
            ['Aufnahmedaten', 'Ein mitgeliefertes ExifTool liest Datum, Kamera und GPS jedes Fotos und Videos.'],
            ['Orte offline', 'GPS wird ohne Netz zu einem Ortsordner.'],
            ['Erst planen', 'Die App zeigt den neuen Ordner und Namen jeder Datei, bevor eine Datei sich bewegt.'],
            ['Verschieben', 'Bestätigte Dateien werden verschoben, mit Pause, Fortsetzen und Aufräumen.'],
            [
              'Verlauf, Rückgängig und Wiederholen',
              'Jeder Lauf kommt ins Protokoll und lässt sich in beide Richtungen abspielen.',
            ],
            ['Einstellungen', 'Zielordner, nur umbenennen, nach Ort gruppieren und der Heimatort.'],
            ['Dateitabelle', 'Zeilen mit Status, Filter, eine Ortskarte und eine Statusleiste.'],
            [
              'Selbst-Update',
              'Prüft beim Start und bei der Rückkehr, zeigt den Download und fragt dann nach einem Neustart.',
            ],
            [
              'Installation mit einem Befehl',
              'Eine PowerShell-Zeile installiert das neueste Release, ohne Adminrechte.',
            ],
          ],
        },
      ],
    },
    'agent-skills': {
      tagline: 'Skills, mit denen ein Coding-Agent wie ein Studio arbeitet.',
      lede: 'Skills für Coding-Agenten: schreiben wie ein Mensch, in einer Spezifikation planen, ein Ticket umsetzen, einen Pull Request öffnen und auf sein Review antworten. Andere Skills prüfen eine ganze App oder bringen eine Seite mit Suche, Werbung und Google Play an den Start.',
      links: [],
      groups: [
        {
          features: [
            ['Klare Sprache', 'Regeln, die den KI-Ton aus Chat, Commits, Doku und UI-Texten entfernen.'],
            ['Spezifikation zuerst', 'Jede Funktion beginnt als Spezifikation im Repo, und die Arbeit folgt ihr.'],
            [
              'Vom Ticket zum Merge',
              'Liest ein Ticket, baut es in einem eigenen Worktree, öffnet den PR und verschiebt das Ticket.',
            ],
            ['Pull Requests', 'Kurze PR-Texte mit Ablaufdiagrammen und ein Commit pro Review-Thread.'],
            ['Code-Review', 'Ein Review nach Checkliste, jeder Befund am Code geprüft.'],
            [
              'App-Audit',
              'Parallele Prüfer je Blickwinkel, etwa Sicherheit und Leistung. Die sicheren Befunde werden behoben.',
            ],
            ['Architektur und Monorepos', 'Pakete in Schichten, gemeinsame API-Verträge und CI pro App.'],
            [
              'Start',
              'Sucheinrichtung, AdMob und AdSense, Release bei Google Play und ein Marketingplan in einem Lauf.',
            ],
            ['Updates in der App', 'Selbst-Update für Apps außerhalb des Stores, im Play-Build weggelassen.'],
            ['Repo-Pflege', 'Worktrees, Repo-Umzüge, Zurücksetzen der Historie und Rotation von Secrets.'],
            ['Namen und Domains', 'Prüft einen Namen gegen Domains, das Unternehmensregister und Marken.'],
            ['Stimmen', 'Spielt jede Text-to-Speech-Stimme ab, damit eine Person eine wählt.'],
          ],
        },
      ],
    },
    'local-ci': {
      tagline: 'Ein Skript richtet einen Entwicklerrechner ein und macht ihn zum CI-Runner.',
      lede: 'local-ci gibt einem Mac oder Windows-PC dieselben Entwicklerwerkzeuge und registriert ihn dann als selbst gehosteten GitHub-Actions-Runner. CI für private Repos baut dann kostenlos auf diesem Rechner.',
      links: [],
      groups: [
        {
          features: [
            ['Mac-Einrichtung', 'Homebrew-Werkzeuge, mise, Shell und Git-Konfiguration in einem Lauf.'],
            ['Windows-Einrichtung', 'Dieselben Werkzeuge über winget. Ein zweiter Lauf überspringt, was schon da ist.'],
            ['Selbst gehosteter Runner', 'Der Rechner baut CI-Jobs für die Repos der Organisation.'],
            ['Startknopf', 'Ein Doppelklick startet die neueste Version der CI.'],
            ['CI-Statusseite', 'Eine lokale Seite zeigt Runner und Jobs auf einen Blick.'],
          ],
        },
      ],
    },
    ci: {
      tagline: 'Gemeinsame GitHub-Actions-Schritte für jedes Repo.',
      lede: 'Eine Korrektur hier erreicht jedes Repo bei seinem nächsten Lauf.',
      links: [],
      groups: [
        {
          features: [
            [
              'Setup-Schritt',
              'Installiert die Werkzeuge, die ein Repo in mise festlegt, dann seine Pakete aus der Lockdatei.',
            ],
            ['Dependabot-Details', 'Speichert die Update-Art jedes Dependabot-PRs für den Merge-Job.'],
            [
              'Auto-Merge',
              'Führt einen Dependabot-PR zusammen, sobald jede Prüfung besteht. Ein Major-Update wartet auf einen Menschen.',
            ],
          ],
        },
      ],
    },
    'git-aliases': {
      tagline: 'Kurze Git-Aliase, bereit für jeden Rechner.',
      lede: 'Jeder Alias ist ein kleines Skript in einem Repo, damit dieselben Befehle auf jedem Rechner laufen.',
      links: [],
      groups: [
        {
          features: [
            ['git a', 'Listet jeden Alias mit dem, was er tut.'],
            ['git sb', 'Wählt einen Branch per unscharfer Suche und wechselt in seinen Worktree.'],
            ['git db', 'Wählt Branches zum Löschen per unscharfer Suche.'],
            ['Sichere Installer', 'Sie fragen vor jeder Änderung und sichern jede Datei, die sie bearbeiten.'],
            ['Lint-Hook', 'Jeder Commit ins Repo startet den Linter.'],
          ],
        },
      ],
    },
    'gh-review-notify': {
      tagline: 'Eine Mac-Mitteilung für jedes Review Ihrer Pull Requests.',
      lede: 'GitHub schickt Reviews per E-Mail, also kann eine Freigabe Stunden warten. Dieses Werkzeug prüft alle 3 Minuten und zeigt eine Mitteilung. Ein Klick öffnet den Kommentar.',
      links: [],
      groups: [
        {
          features: [
            ['Reviews und Kommentare', 'Jedes Review und jeder Kommentar zu Ihren offenen PRs, binnen 3 Minuten.'],
            ['Review-Anfragen', 'Eine Mitteilung, wenn jemand Sie namentlich um ein Review bittet.'],
            ['Kommentarschübe', 'Mehr als 4 neue Kommentare zu einem PR kommen als 1 Mitteilung.'],
            ['Stiller erster Lauf', 'Der erste Lauf merkt sich die letzten 3 Tage und zeigt davon keine an.'],
            ['Bot-Filter', 'Kommentare von Bots bleiben still, bis Sie sie einschalten.'],
            ['Status und Test', 'Ein Schalter druckt den Zustand, ein anderer sendet eine Testmitteilung.'],
          ],
        },
      ],
    },
    'open-in-remote-repo': {
      tagline: 'Eine VS-Code-Erweiterung, die eine Datei auf GitHub, GitLab oder Bitbucket öffnet.',
      lede: 'Ein Fork von Open in GitHub von Stanislav Sysoev. Sie öffnet oder kopiert den Link zur Datei, ihrem Blame oder ihrem Verlauf, mit markierten Zeilen.',
      links: ['Marketplace'],
      groups: [
        {
          features: [
            ['Datei, Blame und Verlauf', 'Öffnet jedes davon auf dem entfernten Host, mit den markierten Zeilen.'],
            ['Link kopieren', 'Dieselben Links gehen in die Zwischenablage, mit einem Hinweis, der die URL zeigt.'],
            ['Aus dem Explorer', 'Ein Rechtsklick auf eine Datei oder einen Ordner öffnet oder kopiert den Link.'],
            ['Main oder master zuerst', 'Links zeigen auf einen Branch, der die Datei schon enthält.'],
            ['Hosts und eigene URLs', 'GitHub, GitHub-Server, GitLab, Bitbucket und Bitbucket Server.'],
          ],
        },
      ],
    },
    'memories-windows': {
      tagline: 'Das erste Memories: eine App im Infobereich mit Sync-Dienst auf dem NAS.',
      lede: 'Ein Dienst in Docker auf dem NAS las das Datum jedes Fotos in eine Datenbank pro Tag. Die Windows-App saß im Infobereich und öffnete die Fotos von diesem Tag. Die Handy-App hat sie abgelöst.',
      links: [],
      groups: [
        {
          features: [
            ['Infobereich', 'Die App wartet im Infobereich. Ein Klick öffnet die Galerie.'],
            ['Tägliche Erinnerung', 'Einmal am Tag ruft eine Mitteilung zu den Fotos dieses Tages.'],
            [
              'Galerie nach Zeitraum',
              'Wählen Sie einen Tag oder eine Spanne von Jahren, und die Fotos laden beim Scrollen.',
            ],
            ['Fotofenster', 'Ein Foto groß, das nächste und das vorige eine Taste entfernt.'],
            ['Details und Karte', 'Die Kameradaten und der Ort auf einer Karte.'],
            ['Senden', 'Gewählte Fotos gehen in einem Schritt hinaus.'],
          ],
        },
      ],
    },
  },
};

export default de;

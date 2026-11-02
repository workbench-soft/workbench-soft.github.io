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
              'Fotos',
              'Alle Fotos und Videos, neueste zuerst, mit einer Überschrift pro Tag. Das Archiv listet jedes Jahr und jeden Monat mit Anzahl.',
            ],
            ['Nach Ort filtern', 'Jeder Tag nennt, wo er war. Eine Filterleiste sucht Orte und wählt Geräte.'],
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
            ['Sprache', 'Die App folgt der Sprache des Handys. Ab Android 13 lässt sie sich pro App einstellen.'],
            ['Hell und dunkel', 'Folgt dem Handy oder einer festen Wahl in den Einstellungen.'],
            [
              'Werbung entfernen',
              'Ein einmaliger Kauf bei Google Play blendet die Werbung auf jedem Handy mit demselben Google-Konto aus.',
            ],
            [
              'Sortierer am Computer',
              'Die Desktop-App sortiert einen Ordner in dieselben Jahr-, Ort- und Tagesordner wie das Telefon.',
            ],
            ['Archiv', 'Jedes Jahr und jeder Monat mit der Zahl der Fotos. Ein Tipp öffnet den ganzen Monat.'],
            ['Personen', 'Das NAS gruppiert die Gesichter auf den Fotos nach Person, benannte zuerst.'],
            [
              'Seite zum Indexfortschritt',
              'Eine Seite auf dem NAS zeigt, wie weit Gesichtserkennung und Indexer sind.',
            ],
            [
              'Alben über eine Person',
              'Ein Album über ein Kind öffnet sich als Sammelbuch, ein Kapitel pro Lebensjahr.',
            ],
            ['Foto drehen', 'Ein liegendes Foto wird in der Datei auf dem NAS aufgerichtet.'],
            ['Foto bearbeiten', 'Der Editor behält das Original und speichert eine bearbeitete Kopie.'],
            ['Neues Bild malen', 'Der Pinsel in Heute öffnet ein leeres Blatt mit allen Werkzeugen.'],
            ['Fotos auf dem Telefon', 'Telefonfotos erscheinen in jedem Raster, und Ordnen lädt sie aufs NAS.'],
            ['Einstellungen', 'Eine Zeile pro Bereich mit seinem Wert: Erinnerungen, Galerie, NAS, Zuhause.'],
            [
              'Duplikate auf dem NAS',
              'Paare mit gleicher Aufnahmezeit und Größe nebeneinander, um die Kopie zu löschen.',
            ],
            ['Updates', 'Der Build außerhalb eines Stores findet, lädt und installiert seine neue Version.'],
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
            ['Sprachen', 'Die Karte und die Android-App in 9 Sprachen.'],
            [
              'Seiten und Werbung',
              'Seiten Über, Wie, Typen, Quellen und Bedingungen, eine Seite pro Kamera, ein Banner unter der Karte.',
            ],
          ],
        },
        {
          title: 'Android-App',
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
            ['Bildschirmaufbau', 'Das Griffbrett füllt den Bildschirm, die Panels schweben über den Ecken.'],
            ['Wiedergabepanel', 'Spielt das Geladene, geht es schrittweise durch, mischt Songs und speichert sie.'],
            ['Easy- und Pro-Modus', 'Easy spielt nur die Akkorde eines Songs, damit Anfänger mitschlagen.'],
            ['Song-Links', 'Ein Menü sucht den offenen Song auf Seiten für Akkorde, Tabs, Videos und Texte.'],
            [
              'Verwaltung der Songs',
              'Der Besitzer fügt eingebaute Songs auf einer Admin-Seite hinzu und entfernt sie.',
            ],
            ['Einstellungen', 'Das Zahnrad öffnet eine Leiste, jeder Wert übersteht ein Neuladen.'],
            ['Android-Updates', 'Die APK von GitHub installiert ihr neueres Release. Play aktualisiert seinen Build.'],
            ['Werbung', 'Werbung, bis Remove ads gekauft ist. Das Telefon des Entwicklers bleibt ohne.'],
            ['Sprachen', 'Die Bildschirme folgen Telefon oder Browser, die Lernseiten gibt es in 10 Sprachen.'],
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
            ['Werbung', 'Ein einmaliger Kauf. Menschen in Europa sehen das Einwilligungsformular vor jeder Werbung.'],
            ['Der Wocheneinkauf zu zweit', 'Eine Person legt die Liste an, die andere hakt sie auf dem Heimweg ab.'],
            ['Songs zum Lernen', 'Eine Liste von Gitarrensongs, die gewünschtesten zuerst.'],
            [
              'Ändern und Löschen',
              'Jedes Feld speichert sich selbst, ein Tipp hakt ab, Löschen lässt sich rückgängig machen.',
            ],
            ['Sprachen', 'Eine geteilte Liste öffnet sich in der Sprache des Telefons, das sie öffnet.'],
            ['Tickalot in der Suche', 'Ratgeber und eine Startseite führen Leute aus der Suche zur App.'],
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
              'Sprachen',
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
            ['Werbung', 'Ein Banner auf dem Startbildschirm, nach Zustimmung in Europa.'],
            ['Werbung entfernen', 'Ein einmaliger Kauf blendet das Banner auf jedem Telefon des Kontos aus.'],
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
            ['Kraftstoffpanel', 'Benzin, Diesel, Gas oder Ladesäulen wählen, langsames AC oder schnelles DC.'],
            ['Werbung', 'Ein Banner unter der Liste: AdMob in der App, AdSense auf der Seite.'],
            ['Sprachen', 'Die Bildschirme gibt es in 9 Sprachen, sie folgen dem Telefon oder Browser.'],
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
            [
              'Welche Leasingdauer am wenigsten kostet',
              'Dasselbe Auto über 1 bis 5 Jahre, die günstigste Dauer markiert.',
            ],
            ['Sprache', 'Der Rechner in 9 Sprachen, Beträge in australischen Dollar.'],
            ['Werbung', 'AdSense-Blöcke auf der Seite und ein AdMob-Banner in der Android-App.'],
            [
              'Keine Werbung auf dem Entwicklertelefon',
              'Jeder Build blendet das Banner auf einem Telefon mit Entwicklerschlüssel aus.',
            ],
          ],
        },
      ],
    },
    games: {
      tagline: 'Partyspiele im Browser: zeichnen, raten, Hinweise geben.',
      lede: 'Workbench Games sind drei Partyspiele für Freunde. Eine Person öffnet einen Raum und schickt den Link, die anderen spielen im Browser mit, ohne Konto.',
      links: ['Jetzt spielen'],
      groups: [
        {
          features: [
            ['Räume per Link', 'Ein Link bringt 2 bis 12 Freunde in denselben Raum.'],
            ['Zeichnung raten', 'Zeichne ein Wort, rate die Zeichnungen der anderen, sammle Punkte.'],
            [
              'Zeichen-Stille-Post',
              'Ein Satz wird zu Zeichnungen und zurück, und das Album zeigt, wie er sich verändert hat.',
            ],
            ['Hinweis-Duell', 'Ein Wortspiel in Teams, bei dem jeder Hinweis offen liegt und Klauen sich lohnt.'],
            ['Zeichenwerkzeuge', 'Stift, Radierer, Füllen, 20 Farben, 4 Größen und Rückgängig.'],
            ['Sprachen', 'Die Seiten und die Räume gibt es auf Englisch und Russisch.'],
            [
              'Werbung',
              'Die Spiele bleiben gratis, mit einem Banner auf den Seiten, in der Lobby und bei den Ergebnissen.',
            ],
            ['Apps für Android und iOS', 'Dieselben Spiele als installierte App.'],
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
            ['Ein Wort fortsetzen', 'Angehängte Buchstaben zählen als Rest des Wortes, in seiner Sprache.'],
            [
              'Das App-Symbol',
              'Ein dunkelblaues А und Я auf Hologrammfolie, an der exe, den Verknüpfungen und in den Einstellungen.',
            ],
            [
              'Installation unter Windows',
              'Ein Doppelklick auf Langflip.cmd baut und installiert es für den Benutzer.',
            ],
            ['Tray-Menü', 'Ein Rechtsklick auf das Symbol öffnet das Menü.'],
            ['Entscheidungsprotokoll', 'Eine Logdatei zeigt, was Langflip für jedes Wort entschied und warum.'],
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
            [
              'Code-Arbeit',
              'Skills, um ein Ticket zu erledigen, einen PR zu öffnen, Reviews zu beantworten und zu reviewen.',
            ],
            [
              'Projekt-Setup',
              'Skills, um eine Architektur zu planen, ein Monorepo aufzusetzen und Befehle über mise zu starten.',
            ],
            ['App-Symbole', '10 Symbole in passenden Stilen, eine Auswahl im Chat, dann jede Größe.'],
            ['Demo-Screenshots und Store-Medien', 'Demodaten, Screenshots und kurze Videos für README und Store.'],
            [
              'End-to-End-Durchgang eines Releases',
              'Installiert das neueste Release, geht jeden Hauptablauf durch und meldet pro Ablauf.',
            ],
            [
              'Stimme am Ende einer Runde',
              'Ein kurzer gesprochener Satz sagt, ob der Agent fertig ist, wartet oder fragt.',
            ],
            ['Installation', 'Ein Klon, in jeden Agenten des Rechners verlinkt. Eine Änderung erreicht alle.'],
            ['Releases', 'Jeder Push auf main, der die Prüfungen besteht, wird ein datiertes Release mit Notizen.'],
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
            [
              'Zuerst Cloud-Runner',
              'Jobs bauen auf kostenlosen Cloud-Runnern, solange die Minuten reichen, dann auf diesem PC.',
            ],
            ['Releases', 'Jeder Push auf main, der die Prüfungen besteht, wird ein datiertes Release mit Notizen.'],
            ['Aktualisiert sich selbst', 'Der PC installiert jedes Release wenige Minuten nach dem Merge.'],
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
            ['Releases', 'Jeder Push auf main, der die Prüfungen besteht, wird ein datiertes Release mit Notizen.'],
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
            [
              'Auf den Standardzweig zurücksetzen',
              'git m holt und setzt hart auf den Standardzweig des Remotes zurück.',
            ],
            ['Releases', 'Jeder Push auf main, der die Prüfungen besteht, wird ein datiertes Release mit Notizen.'],
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
            ['Releases', 'Jeder Push auf main, der die Prüfungen besteht, wird ein datiertes Release mit Notizen.'],
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
            ['Sprachen', 'Befehle, Einstellungen und Meldungen folgen der Anzeigesprache von VS Code.'],
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
    shuttrix: {
      tagline: 'Eine Kamera mit den Rädern einer DSLR und einem einfachen Modus mit großen Reglern.',
      lede: 'Shuttrix ist eine Android-Kamera mit 2 Modi. Der einfache Modus hat große Regler mit Nacht, Langzeitbelichtung und Panorama, Pro legt Objektiv, Fokus, Weißabgleich, ISO und Verschluss auf Räder.',
      links: [],
      groups: [
        {
          features: [
            ['Einfach und Pro', 'Ein Glasschalter oben wählt den Modus. Eine neue Installation startet einfach.'],
            ['Einfacher Modus', 'Objektivknöpfe über einem Zoomregler, dann Regler für Licht, Wärme und Farbe.'],
            ['Nacht', 'Das Telefon baut das Foto aus mehreren Bildern, während ein Balken läuft.'],
            ['Langzeitbelichtung', 'Verwischt Bewegung: seidiges Wasser, Lichtspuren, eine verblassende Menge.'],
            ['Panorama', 'Ein breites Foto aus einer langsamen Drehung, auf dem Telefon zusammengesetzt.'],
            ['Objektive', 'Ein Knopf pro Objektiv des Telefons über einer Zoomskala.'],
            ['Fokus', 'AF-C folgt bewegten Motiven und Gesichtern. Ein Tipp fokussiert einen Punkt.'],
            ['Weißabgleich', 'Auto, Voreinstellungen oder Kelvin auf einem Rad.'],
            ['Belichtung', 'ISO und Verschluss, jeweils auto oder manuell in Drittelstufen.'],
            ['Farbe', 'Ein Sättigungswert für das COLOR-Rad und den Farbregler.'],
            ['Foto, Video und Blitz', 'Das Foto ist das Bild auf dem Schirm im Moment der Berührung. Halten filmt.'],
            ['Ort- und Kameradaten', 'Jede Aufnahme trägt Ort und Einstellungen als EXIF-Tags.'],
            ['Foto- und Videogröße', 'Die Einstellungen wählen die Größe von Foto und Video.'],
            ['Fotos verbessern', 'Tieferes Schwarz, hellere Schatten, lebendigere Farben und etwas Schärfe.'],
            ['QR-Codes', 'Ein Code in der Vorschau bekommt Klammern und einen Knopf zum Öffnen.'],
            ['Galerie', 'Die Aufnahmen im Raster und im Vollbild, mit Zoom per Zwicken und Doppeltipp.'],
            ['Begradigen und drehen', 'EDIT in der Ansicht richtet ein Foto aus und dreht es.'],
            ['Schnellstart', 'Zweimal die Ein-Taste öffnet Shuttrix, auch über dem Sperrbildschirm.'],
            ['Sprachen', 'In 9 Sprachen, nach der Sprache von Telefon oder Browser.'],
          ],
        },
      ],
    },
    farnear: {
      tagline: 'Videoanrufe über eine Grenze, die die üblichen Apps sperrt, mit einer Tafel zum Zeichnen.',
      lede: 'Farnear ruft die Familie über einen Link an, ohne Konto. Das Video geht direkt zwischen den Leuten, und der Anruf probiert mehrere Wege, bis einer durchkommt.',
      links: [],
      groups: [
        {
          features: [
            ['Anrufe per Link', 'Ein Link ist der Raum. Bis zu 4 Leute sehen und hören sich.'],
            ['Gespeicherte Räume', 'Ein Raumlink unter einem Namen wie Mama. Derselbe Link geht jedes Mal.'],
            [
              'Anrufe, die mehrere Wege nach Russland probieren',
              'Erst direkt, dann über Relays, als Letztes ein Einfügen von Hand.',
            ],
            ['Tafel', 'Alle zeichnen auf einer Fläche mit Stift, Marker oder Laser.'],
            [
              'Bildschirm, Bild oder Video teilen',
              'Die Tafel zeigt ein Fenster, ein Bild oder ein Video, alle zeichnen darüber.',
            ],
            ['Foto vom Telefon', 'Die Kamera fotografiert eine Seite und legt sie auf die Tafel.'],
            ['Unterricht', 'Die Lehrkraft geht Folien durch, beide Seiten zeichnen, ein Timer klingelt vor dem Ende.'],
            [
              'Werbung und entfernen',
              'Werbung auf der Startseite und in Ratgebern. Ein Kauf entfernt sie in den Räumen des Käufers.',
            ],
            ['Sprachen', 'In 9 Sprachen, nach der Sprache von Telefon oder Browser.'],
          ],
        },
      ],
    },
    memoire: {
      tagline: 'Englische oder russische Wörter in kurzen Runden lernen, kurz bevor man sie vergisst.',
      lede: 'Memoire bringt Russischsprachigen Englisch und Englischsprachigen Russisch bei. Ein paar Mal am Tag zeigt es kurze Kartenrunden, kurz bevor ein Wort verloren geht.',
      links: [],
      groups: [
        {
          features: [
            ['Wortrunden', 'Kurze Kartenrunden: fällige Wörter zuerst, neue dazwischen.'],
            ['Arten zu fragen', 'Eine Karte fragt nach Bedeutung, Wort, Gehörtem oder Schreibung.'],
            ['Wort hinzufügen', 'Ein Wort eintippen und Karten mit Übersetzungen und Beispielen bekommen.'],
            ['Bilder', 'Eine Karte zeigt das Foto aus dem Wikipedia-Artikel des Wortes.'],
            ['Eingebaute Wörter', 'Etwa 8.000 englische Wörter mit CEFR-Stufen und russischen Übersetzungen.'],
            ['Einstufungstest', 'Bis zu 6 Runden Ja oder Nein zu echten und erfundenen Wörtern setzen das Niveau.'],
            ['Themen', '14 Themen wie IT, Reisen, Essen und Kinderwörter.'],
            ['Erinnerungen', 'Lokale Hinweise zu festen Zeiten, nur wenn Wörter warten.'],
            ['Meine Wörter', 'Eine Kartenliste mit Suche, Sternen und Löschen.'],
            ['Aussehen und Sprache', 'Helles und dunkles Design, die Bildschirme in 9 Sprachen.'],
            ['Gesprächsübung', 'Ein Chat zu einer Szene wie Café oder Vorstellungsgespräch, auf dem eigenen Niveau.'],
            ['Abgleich zwischen Geräten', 'Dieselben Karten auf Telefon, Tablet und Browser, per Code gekoppelt.'],
            ['Widget auf dem Startbildschirm', 'Die Zahl wartender Wörter und ein Wort mit Bedeutung.'],
          ],
        },
      ],
    },
    'lumiere-player': {
      tagline: 'Ein Videoplayer für Google TV, der Dateien vom USB-Stick oder einem NAS abspielt.',
      lede: 'Lumiere Player spielt Dateien vom USB-Stick oder einer SMB-Freigabe mit libVLC, also öffnet er, was VLC öffnet. Jede Datei merkt sich die Stelle, die Fernbedienung springt und wechselt Spuren.',
      links: [],
      groups: [
        {
          features: [
            ['Quellen', 'USB-Sticks und SMB-Freigaben, auf dem Startbildschirm gelistet.'],
            ['Fortsetzen', 'Jede Datei merkt sich die Stelle, die Liste zeigt den Fortschritt.'],
            ['Untertitel und Ton', 'Eingebettete Spuren und Dateien im selben Ordner, auch Kyrillisch.'],
            ['Steuerung', '10 oder 30 Sekunden springen, Tempo ändern, Zufall und Wiederholen.'],
            ['Updates', 'Findet neue Releases auf GitHub beim Start oder unter Updates.'],
            ['Werbung', 'Ein Banner auf dem Startbildschirm, mit einmaliger Freischaltung im Play-Build.'],
            ['Sprachen', 'In 9 Sprachen, nach der Sprache von Telefon oder Browser.'],
          ],
        },
      ],
    },
    'property-trends': {
      tagline: 'Australische Vororte, gefärbt nach dem mittleren Immobilienpreis, mit Verlauf.',
      lede: 'Eine Karte australischer Vororte, jeder nach seinem mittleren Verkaufspreis gefärbt, mit einem Diagramm des Verlaufs. Sie nutzt offene Behördendaten.',
      links: [],
      groups: [
        {
          features: [
            ['Preiskarte', 'Jeder Vorort nach seinem mittleren Verkaufspreis gefärbt.'],
            ['Filter', 'Die Art der Immobilie und der Zeitraum der Karte.'],
            ['Angebote auf realestate.com.au', 'Knöpfe öffnen dieselbe Suche auf realestate.com.au.'],
            ['Vorortkarte und Verlauf', 'Der Median eines Vororts, die Zahl der Verkäufe und ein Diagramm über Jahre.'],
            ['Suche', 'Findet einen Vorort nach Name oder Postleitzahl und fliegt hin.'],
            ['Sprachen', 'In 9 Sprachen, nach der Sprache von Telefon oder Browser.'],
            ['Mieten', 'Jede Postleitzahl in NSW nach der mittleren Wochenmiete neuer Verträge gefärbt.'],
            ['Aus dem Browser installieren', 'Die Web-Version installiert sich als App mit eigenem Symbol.'],
          ],
        },
      ],
    },
    tripforge: {
      tagline: 'Eine ganze Reise aus ein paar Worten: Flüge, Route, Hotels und Auto, mit Preisen.',
      lede: 'Tripforge plant eine Reise aus den Orten, einem groben Datum und der Gruppe. Heraus kommt ein Plan mit Preisen für Flüge, Route, Hotels und Auto, dazu günstigere Daten in der Nähe.',
      links: [],
      groups: [
        {
          features: [
            ['Fragen', 'Orte, ein grobes Datum, die Dauer und wer mitfährt eingeben.'],
            ['Flüge', 'Die günstigsten Hin- und Rückflüge um das Datum, mit günstigeren Daten daneben.'],
            ['Zu Tickalot', 'Ein Tipp macht aus der Reise Tickalot-Listen: Sehenswertes und Packen.'],
            ['Einstellungen', 'Die Sprache: die des Telefons oder eine der 9.'],
          ],
        },
      ],
    },
    'reddit-desk': {
      tagline: 'Entwirft Reddit-Kommentare zu einem Repo und tippt sie in Chrome.',
      lede: 'Eine Windows-App für die Taskleiste. Repo wählen, Finden drücken, und Claude Code entwirft für jeden passenden Thread einen Kommentar. Eine Karte öffnen, und Chrome bekommt den Entwurf zum Posten von Hand.',
      links: [],
      groups: [
        {
          features: [
            ['Repo-Auswahl', 'Eine Liste jedes Git-Ordners unter der Wurzel.'],
            ['Subreddits', 'Claude liest das Repo und trägt passende Subs ein.'],
            ['Threads finden', 'Claude Code findet passende Threads und entwirft einen Kommentar.'],
            ['Karten', 'Jede Karte zeigt Sub, Threadtitel und den Entwurf zum Bearbeiten.'],
            ['In Chrome öffnen', 'Chrome öffnet den Thread mit eingetipptem Kommentar, bereit zum Posten.'],
            ['Beiträge-Tab', 'Entwirft Beiträge über die gewählten Repos in passenden Subs.'],
            ['Screenshots und Videos', 'Jeder Beitrag nennt Medien aus dem Screenshot-Ordner des Repos.'],
            ['Beitrag öffnen', 'Chrome öffnet die Einreichseite des Subs mit ausgefülltem Beitrag.'],
            ['Sperrrisiko', 'Eine Zeile bewertet den nächsten Beitrag, jede Karte ihren Sub.'],
            ['Tester-Beitrag', 'Ein Beitrag, der Tester für eine Android-App aus einer Liste sucht.'],
            ['In Archon', 'Der Reddit-Tab von Archon zeigt dieses Fenster in einem Rahmen.'],
            ['Info-Knopf', 'Der i-Knopf erklärt die Reddit-Einrichtung.'],
            ['Sprache', 'Die Einstellungen haben eine Sprachliste: die des Systems oder eine von 9.'],
            ['Erledigt-Liste', 'Jeder gepostete und übersprungene Thread mit Datum.'],
          ],
        },
      ],
    },
    songfactory: {
      tagline: 'Macht aus einem Songordner ein langes Loop-Video für YouTube und lädt es hoch.',
      lede: 'Songfactory fügt die Songs eines Themas über einem Loop-Hintergrund zusammen, schreibt Kapitel und Vorschaubild und lädt das Video nach Plan hoch. Claude schreibt den Text, ComfyUI kann den Hintergrund malen.',
      links: [],
      groups: [
        {
          features: [
            ['Installieren und prüfen', 'Ein Skript installiert die Werkzeuge, eine Prüfung testet sie.'],
            [
              'Langes Video aus einer Playlist',
              'Die Songs eines Themenordners gehen mit Überblendung über einem Loop-Clip ineinander.',
            ],
            ['Nahtlose Schleife', 'Der Clip läuft vor und zurück, so verschwindet der Sprung am Ende.'],
            [
              'Kapitel und Vorschaubild',
              'Die Beschreibung nennt jeden Song mit Startzeit, und ein Vorschaubild entsteht.',
            ],
            ['Geplanter Upload', 'Ein Befehl lädt mit KI-Kennzeichen und Veröffentlichungszeit hoch.'],
            ['Text von Claude', 'Claude schreibt Titel und Beschreibung für YouTube aus den Songs.'],
            ['Hintergrund aus ComfyUI', 'Ein Prompt in der Themendatei lässt ComfyUI den Hintergrund malen.'],
          ],
        },
      ],
    },
    'speed-camera-location-scraper': {
      tagline: 'Führt die australischen Blitzerlisten in einer CSV zusammen.',
      lede: 'Der Scraper öffnet jede Staatsseite der Listen, speichert jede Kameradatei und führt sie in einer CSV zusammen, eine Zeile pro Kamera mit Staat. SpotTheCam liest daraus seine Kamerastandorte.',
      links: [],
      groups: [
        {
          features: [
            ['Staatsseiten scannen', 'Öffnet jede Staatsseite und speichert jede Kameradatei.'],
            ['Eine CSV der Kameras', 'Eine Zeile pro Kamera mit Staat, für SpotTheCam.'],
            ['Prüfungen und Releases', 'Jeder Push auf main wird geprüft und zum datierten Release.'],
          ],
        },
      ],
    },
  },
};

export default de;

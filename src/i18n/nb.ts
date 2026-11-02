import type { Catalog } from './types';

const nb: Catalog = {
  ui: {
    meta: {
      title: 'Workbench Soft: apper for Android, nettet, Windows og macOS',
      description:
        'Workbench Soft utvikler og lanserer apper: {names} og verktøy for utviklere. Hvert prosjekt med hver av funksjonene sine.',
      org: 'Et programvarestudio som lager apper for Android, iPhone, nettet, Windows og macOS.',
    },
    nav: {
      services: 'Tjenester',
      projects: 'Prosjekter',
      process: 'Prosess',
      contact: 'Kontakt',
      main: 'Hovedmeny',
      search: 'Søk',
      searchLabel: 'Søk i prosjekter og funksjoner',
      language: 'Språk',
      skip: 'Gå til prosjektene',
    },
    hero: {
      status: 'Åpen for kundeprosjekter',
      lines: ['Vi designer,', 'bygger og leverer', 'programvare.'],
      lead: 'Workbench Soft er et uavhengig studio. Det lager apper for Android, iPhone, nettet, Windows og macOS, og tar hver av dem fra første spesifikasjon til butikken, til søkeresultatene og til oppdateringene etterpå.',
      start: 'Start et prosjekt',
      work: 'Se arbeidet',
      projects: 'Prosjekter',
      features: 'Funksjoner levert',
      platforms: 'Plattformer',
      ads: 'Annonser på dette nettstedet',
    },
    services: {
      title: 'Hva studioet bygger for deg',
      intro: 'Teamet som leverte appene nedenfor, kan bygge din. Hvert fagområde lenker til prosjektene som viser det.',
    },
    projects: {
      title: 'Arbeidet, funksjon for funksjon',
      intro:
        'Hvert prosjekt nedenfor viser hva det gjør for personen som bruker det. Trykk {key} for å søke etter en funksjon.',
      filter: 'Filtrer prosjektene',
      all: 'Alle',
      find: 'Finn en funksjon',
      index: 'Prosjektoversikt',
      features: 'Funksjoner',
      platforms: 'Plattformer',
      stack: 'Teknologi',
      shot: 'Skjerm {n} av {name}',
      kinds: {
        app: 'Apper for folk',
        tool: 'Verktøy for utviklere',
        internal: 'Interne verktøy i studioet',
        archive: 'Arkiv',
      },
    },
    process: {
      title: 'Fra første spesifikasjon til butikken',
      intro:
        'Hvert prosjekt ovenfor gikk gjennom de samme trinnene. Et kundeprosjekt går gjennom dem også, og kunden ser hvert av dem.',
    },
    contact: {
      title: 'Har du en app i tankene?',
      intro: 'Skriv noen linjer om ideen, plattformene og fristen.',
      write: 'Skriv en e-post',
      copy: 'Kopier adressen',
      copied: 'Kopiert',
      subject: 'Et prosjekt for Workbench Soft',
    },
    palette: {
      results: 'Resultater',
      empty: 'Ingen treff. Prøv et annet ord.',
      project: 'Prosjekt',
      feature: 'Funksjon',
    },
    footer: {
      noAds: 'Dette nettstedet viser ingen annonser.',
      releases: 'Utgivelser',
      privacy: 'Personvern for Memories',
    },
    technologies: 'Teknologier',
  },
  services: [
    {
      title: 'Mobilapper',
      text: 'Apper for Android og iPhone i React Native og Expo. Bakgrunnstjenester, vekkeord, kart, frakoblede data og kjøp i appen. Lansert på Google Play, eller som en APK som oppdaterer seg selv.',
    },
    {
      title: 'Nettapper og PWA-er',
      text: 'Apper i Next.js, React og Astro som installeres på startskjermen og åpnes uten nett. Driftet på Cloudflare Workers, med sider som søkemotorer kan indeksere.',
    },
    {
      title: 'Skrivebord og systemverktøy',
      text: 'Native apper i Rust og Tauri for Windows og macOS. Tastaturkroker, ikoner i systemfeltet, filsortering med angre og installasjonsprogrammer som oppdaterer seg selv.',
    },
    {
      title: 'Kart, tale og lyd',
      text: 'Levende kart med sving-for-sving-ruter. Vekkeord og tale til tekst uten nett. Synther, effekter og MIDI i nettleseren.',
    },
    {
      title: 'Lansering og vekst',
      text: 'Oppføring og lansering på Google Play, Search Console, nettstedskart og strukturerte data. AdMob og AdSense med samtykkemelding, så en plan for de første brukerne.',
    },
    {
      title: 'Utvikling og KI-verktøy',
      text: 'CI på din egen maskinvare, delte GitHub Actions og ferdigheter som får kodeagenter til å følge teamets regler fra sak til sammenslåing.',
    },
  ],
  steps: [
    {
      title: 'Spesifikasjon',
      text: 'Hver funksjon starter som en skriftlig spesifikasjon i repoet: hva den gjør for personen, flytene og grensene. Du leser og godkjenner den samme filen.',
    },
    {
      title: 'Bygging',
      text: 'Arbeidet skjer på en egen gren, med egen database, port og emulator. Hvert trinn er en commit med beståtte sjekker.',
    },
    {
      title: 'Gjennomgang og levering',
      text: 'En pull request med diagrammer over brukerflytene, så CI. Grønne sjekker slår sammen, og dokumentasjonen endres i samme PR.',
    },
    {
      title: 'Lansering og drift',
      text: 'Lansering i butikken, søkeoppsett og oppdateringer i appen. README, arkitektur og funksjonsdokumentasjon stemmer etter hver endring.',
    },
  ],
  projects: {
    memories: {
      tagline: 'Bilder fra denne dagen, fra din egen NAS.',
      lede: 'Memories viser denne dagen i tidligere år, fra bildene og videoene på en NAS hjemme. Den fungerer som minnene i Google Foto, og bildene blir på maskinvare eieren har hjemme.',
      links: ['Åpne nettstedet'],
      groups: [
        {
          features: [
            [
              'Daglig påminnelse',
              'Et varsel til valgt tid nevner året og stedet, for eksempel «For 3 år siden i Japan». Utenlandsturer kommer først.',
            ],
            ['I dag', 'Denne måneden og dagen i hvert år av biblioteket. Et trykk på datoen velger en annen dag.'],
            [
              'Turer',
              'Flere dager med bilder fra utlandet blir en tur. Én lenke åpner bildene fra første til siste dag.',
            ],
            [
              'Bilder',
              'Hvert bilde og hver video, nyeste først, under en overskrift per dag. Arkivet viser hvert år og hver måned med antall.',
            ],
            ['Filtrer på sted', 'Hver dag viser hvor den var. En filterlinje søker etter steder og velger enheter.'],
            [
              'Kamera- og dronebilder',
              'Bilder fra et kamera eller en drone får sin egen gruppe ved siden av mobilbildene.',
            ],
            [
              'Klyp for å endre størrelse',
              'Et klyp setter 1 til 6 ruter per linje, felles for hvert rutenett og husket mellom oppstarter.',
            ],
            [
              'Send mange samtidig',
              'Et langt trykk starter valget. De valgte bildene går til hvilken som helst app i én deling.',
            ],
            [
              'Albumlenker',
              'Valgte bilder blir en lenke. Den andre personen åpner albumet i en nettleser, uten app eller konto.',
            ],
            [
              'Rydd',
              'Trinnkort sorterer bildene på mobilen, flytter dem til daterte mapper på NAS-en og frigjør plass på mobilen.',
            ],
            ['Sorter på NAS-en', 'Valgte NAS-filer får dato i navn og mappe, på NAS-en og i indeksen samtidig.'],
            ['Visning', 'Bilder og videoer i fullskjerm, med sveip til neste. Videoer spilles rett fra NAS-en.'],
            ['Koble til NAS-en', 'Appen finner NAS-en på Wi-Fi. Én pålogging åpner bildemappen over WebDAV.'],
            ['Borte fra hjemmet', 'En andre adresse gjennom Tailscale når NAS-en uten å åpne den mot internett.'],
            [
              'Synkroniseringsstatus',
              'Et banner viser hva mobilen og NAS-indeksen har, hva som kjører nå og hva som kommer etterpå.',
            ],
            [
              'Mobildata',
              'Den første synkroniseringen over mobildata spør først. En bryter i innstillingene endrer svaret.',
            ],
            [
              'Indeks på NAS-en',
              'En indekserer på NAS-en leser bildene fra sin egen disk, langt raskere enn synkronisering over WebDAV.',
            ],
            [
              'Bytt til ny mobil',
              'Den nye mobilen tar indeksen fra den gamle, i stedet for en første synkronisering som tar timer.',
            ],
            ['Språk', 'Appen følger språket på mobilen. Android 13 og nyere lar deg velge det per app.'],
            ['Lyst og mørkt', 'Følger mobilen, eller et fast valg i innstillingene.'],
            ['Fjern annonser', 'Et engangskjøp på Google Play skjuler annonsene på hver mobil med samme Google-konto.'],
            [
              'Sortering på PC',
              'Skrivebordsappen sorterer en mappe i de samme mappene for år, sted og dager som telefonen.',
            ],
            ['Arkiv', 'Hvert år og hver måned med antall bilder. Et trykk åpner hele måneden.'],
            ['Personer', 'NAS-en grupperer ansiktene i bildene etter person, navngitte først.'],
            ['Side for indeksering', 'En side på NAS-en viser hvor langt ansiktsmotoren og indeksereren har kommet.'],
            ['Album om en person', 'Et album om ett barn åpnes som en utklippsbok, ett kapittel per leveår.'],
            ['Snu et bilde', 'Et bilde som ligger på siden, rettes opp i filen på NAS-en.'],
            ['Rediger et bilde', 'Redigeringen beholder originalen og lagrer en redigert kopi.'],
            ['Tegn et nytt bilde', 'Penselen i I dag åpner et blankt ark med alle verktøyene.'],
            ['Bilder på telefonen', 'Telefonbilder vises i hvert rutenett, og Rydd laster dem opp til NAS-en.'],
            ['Innstillinger', 'Én rad per del med verdien: påminnelser, galleri, NAS, hjem.'],
            [
              'Duplikater på NAS-en',
              'Par med samme opptakstid og størrelse side om side, så den ekstra kopien kan fjernes.',
            ],
            ['Oppdateringer', 'Bygget utenfor en butikk finner, laster ned og installerer sin nye versjon.'],
          ],
        },
      ],
    },
    spotthecam: {
      tagline: 'Fartskameraer i Australia og New Zealand på ett kart.',
      lede: 'SpotTheCam samler de offisielle fartskameraene i de australske delstatene og New Zealand på ett kart. Hver markør viser fartsgrensen som gjelder akkurat nå. Android-appen legger til talevarsler, en kjørelogg og sving-for-sving-ruter.',
      links: ['spotthecam.com'],
      groups: [
        {
          title: 'På kartet, i hvilken som helst nettleser',
          features: [
            [
              'Gjeldende grenser',
              'Hvert kamera viser grensen akkurat nå. I en skolesone følger tallet sonens tidsplan.',
            ],
            ['Søk etter forstad', 'Skriv en forstad, og kartet flyr til kameraene der.'],
            ['Kameratyper', 'Et trykk beholder bare typene du trenger. Nettleseren husker valget.'],
            ['Følg meg', 'Kartet følger deg og snur seg etter kjøreretningen. Gatenavn og skilt står rett.'],
            ['Kameradetaljer', 'En markør viser typen, adressen, grensen nå og en lenke til den offisielle kilden.'],
            [
              'Fungerer uten nett',
              'Kameralisten og hvert kartområde du har åpnet, blir på enheten. Den kan installeres som en app.',
            ],
            ['Lyst og mørkt kart', 'Auto følger enheten, eller velg i tannhjulmenyen.'],
            ['Språk', 'Kartet og Android-appen på 9 språk.'],
            [
              'Sider og reklame',
              'Sidene Om, Hvordan, Typer, Kilder og Vilkår, en side per kamera, et banner under kartet.',
            ],
          ],
        },
        {
          title: 'Android-app',
          features: [
            ['Fartsmerke', 'Farten din ved siden av veiens grense. Merket blir rødt over grensen.'],
            [
              'Kameravarsler',
              'Et pip omtrent 20 sekunder før, så «Fartskamera forut. Grense 60.» Det når også låseskjermen.',
            ],
            ['Over grensen', '«Du kjører i 72. Sett ned farten.» Bare nær kameraer, eller på alle veier.'],
            [
              'Kjørelogg',
              'Kjøreturer og gåturer registreres av seg selv. Hver rute viser farten din ved hvert kamera, grønt eller rødt.',
            ],
            [
              'Del en tur',
              'En lenke viser ruten i hvilken som helst nettleser. Stopp deling fjerner den fra serveren.',
            ],
            ['Distanse', 'Store sifre viser km for turen nå og totalen for dagen.'],
            [
              'Sving-for-sving-ruter',
              'Raskeste rekkefølge gjennom stoppene, svinger varslet ved 500 m og 200 m, rundt dagens trafikk. En feil sving gir en ny rute.',
            ],
            [
              'Rutevalg',
              'Tur-retur, til fots eller utenom bomveier. Favoritter som Hjem legges til ruten med et trykk.',
            ],
            [
              'Hey Spot',
              '«Hey Spot, go to Bondi Beach, Manly and back.» En modell på mobilen hører vekkeordene uten nett.',
            ],
            ['Skjermen holdes på', 'Kartet lyser på dashbordet så lenge appen er åpen.'],
            [
              'Selvoppdatering',
              'APK-en ser etter en nyere utgivelse på GitHub, med størrelse, fremdrift og en avbryt-knapp.',
            ],
          ],
        },
      ],
    },
    'guitar-upscale': {
      tagline: 'En gitar du spiller i nettleseren.',
      lede: 'Guitar Upscale viser skalaer og akkorder på et virtuelt gripebrett, tar opp looper og lagrer dem som MIDI. Den redigerer sanger tone for tone, viser dem som tabulatur og installeres på startskjermen.',
      links: ['guitar-upscale.com'],
      groups: [
        {
          features: [
            [
              'Gripebrett',
              'Gripebrettet fyller skjermen, markerer tonene i skalaen og spiller hver tone du trykker på.',
            ],
            [
              'Skala, stemming og kapo',
              'Én knapp viser toneart og modus, og åpner valgene for skala, stemming og kapo.',
            ],
            ['Stemmeapparat', 'Lytter gjennom mikrofonen, med en skive som vokser med vinduet.'],
            ['Akkorder i tonearten', 'Én akkord per skalatone, for eksempel Em F#dim G Am Bm C D for e-moll.'],
            ['Klimpring', 'En holdt akkord klimprer et mønster i takt med klokken. Mønstrene kan redigeres.'],
            ['Sangliste', 'Innebygde sanger og dine egne. Sanger som passer skalaen nå, vises i grønt.'],
            ['Talesøk', 'Si et sangnavn. Ordene fyller søket mens du snakker.'],
            ['Hey Guitar', '«Hey Guitar, play Metallica One.» Appen svarer «Listening» og spiller den.'],
            ['MIDI-opptak', 'Tar opp tonene og akkordene du spiller. Toner appen spiller av, holdes utenfor opptaket.'],
            ['Looper', 'Korte looper på flere kanaler spiller sammen.'],
            ['Kvantisering', 'Én lengde fra 1/1 til 1/64 setter rutenettet, opptaket og looperen, som i Cubase.'],
            ['Piano roll', 'Tegn, flytt, strekk, kopier og slett toner. Linjalen markerer vers, refreng, bro og solo.'],
            ['Tabulaturvisning', 'Et spor som tabulatur i Guitar Pro-stil, med en spillemarkør som følger sangen.'],
            ['Akkordark', 'Akkordnavn i takter som lyser opp med sangen. Teksten åpnes på Musixmatch.'],
            ['Last opp sanger', 'Guitar Pro- og MIDI-filer legges til i sanglisten.'],
            [
              'Finn en sang på nettet',
              'Søker på 4 sangnettsteder samtidig. En sang fra Songsterr blir til en Guitar Pro-fil.',
            ],
            ['Gjenkjenning av akkorder og skalaer', 'Spill, og appen navngir akkorden eller skalaen den hører.'],
            ['Instrumenter', 'Egne instrumenter for melodi og akkorder: sitar, banjo, koto, strykere og flere.'],
            [
              'Effekter',
              'Romklang og delay, hver med egen bryter og egne glidebrytere. Lyden endres mens en glidebryter beveger seg.',
            ],
            ['MIDI-eksport', 'Filer lastes ned, eller sendes ut gjennom delingsmenyen.'],
            [
              'Betalte nivåer',
              'Pålogging med Patreon eller et kjøp på Google Play låser opp verktøyene Explorer og Composer.',
            ],
            [
              'Installasjon og uten nett',
              'En PWA som åpnes i fullskjerm i liggende format. Android-APK-en oppdaterer seg selv.',
            ],
            ['Skjermoppsett', 'Gripebrettet fyller skjermen, og panelene flyter over hjørnene.'],
            ['Avspillingspanel', 'Spiller det som er lastet, går steg for steg, stokker sanger og lagrer dem.'],
            ['Easy- og Pro-modus', 'Easy spiller bare akkordene, så en nybegynner kan klimpre med.'],
            ['Sanglenker', 'Én meny søker etter den åpne sangen på sider for akkorder, tabs, video og tekst.'],
            ['Admin for sanger', 'Eieren legger til og fjerner de innebygde sangene på en adminside.'],
            ['Innstillinger', 'Tannhjulet åpner en skuff, og hver verdi tåler en omlasting.'],
            ['Android-oppdateringer', 'APK-en fra GitHub installerer den nyere utgivelsen. Play oppdaterer sitt bygg.'],
            ['Reklame', 'Reklame til Remove ads er kjøpt. Utviklerens telefon åpner uten.'],
            ['Språk', 'Skjermene følger telefonen eller nettleseren, og leksjonene finnes på 10 språk.'],
          ],
        },
      ],
    },
    tickalot: {
      tagline: 'Handle-, pakke- og severdighetslister du deler med en lenke.',
      lede: 'Den andre personen åpner lenken og krysser av, og hvert kryss vises på begge mobilene samtidig. Ingen registrering. Listene blir på mobilen, og en delt liste går også til skyen.',
      links: ['tickalot.web.app'],
      groups: [
        {
          features: [
            [
              'Del med lenke',
              'Begge mobilene ser hvert kryss direkte. Endringer gjort uten nett synkroniseres når nettet er tilbake.',
            ],
            ['Basisliste', 'Det du vanligvis kjøper. Noen få trykk gjør den til ukens liste, med mengder og notater.'],
            [
              'Skriv eller si mange varer',
              '«Croissanter 2 pakker à 3, økologiske egg» blir 2 varer med mengder. Engelsk og russisk.',
            ],
            ['Bilder', 'Appen velger en emoji ut fra navnet på hver vare. Ett trykk legger til et bilde.'],
            [
              'Butikkens hyller',
              'Velg butikken fra OpenStreetMap og skriv inn en hylle én gang. Listen følger så runden din.',
            ],
            ['Delte hyller', 'Hyller én kunde skriver inn, fylles ut for alle som velger samme butikk.'],
            ['Priser hos Coles og Woolworths', 'En enhetspris under hver vare, med den billigste butikken i grønt.'],
            ['Pakking til en tur', 'Hver tur starter som en kopi av den vanlige pakkelisten din.'],
            ['Ting å se', 'Steder fra Wikipedia, fordelt på dagene av turen.'],
            ['Ferdige lister', 'En ferdig liste rydder seg bort selv, uten opprydding for hånd.'],
            ['Lyst og mørkt', 'Følger mobilen, eller et fast valg.'],
            ['Oppdateringer', 'APK-en tilbyr en nyere utgivelse med størrelsen og en advarsel ved mobildata.'],
            ['Reklame', 'Et engangskjøp. Folk i Europa ser samtykkeskjemaet før noen annonse.'],
            ['Ukehandelen for to', 'Én lager listen, den andre krysser av på vei hjem.'],
            ['Sanger å lære', 'En liste med sanger på gitar, de mest ønskede først.'],
            ['Endre og slette', 'Hvert felt lagres selv, et trykk krysser av, og sletting kan angres.'],
            ['Språk', 'En delt liste åpnes på språket til telefonen som åpner den.'],
            ['Finn Tickalot i søk', 'Guider og en forside fører folk fra søk til appen.'],
          ],
        },
      ],
    },
    keeppad: {
      tagline: 'Talenotater du starter ved å si «Hey Keep».',
      lede: 'Si «Hey Keep», og appen svarer «Tar opp». Den skriver ned det du sier videre og legger notatet i riktig gruppe, med appen lukket og skjermen av.',
      links: ['keeppad.com'],
      groups: [
        {
          features: [
            ['Hey Keep', 'Et vekkeord mobilen lytter etter i bakgrunnen. «Эй, Кип» fungerer også.'],
            [
              'Stopp og fortsett',
              '«Stopp» avslutter notatet med en gang. «Hey Keep, fortsett» legger til i det nyeste notatet.',
            ],
            ['Opptak med knapp', 'Ordene vises på skjermen mens du snakker.'],
            ['Lydopptak', 'På Android 13 og nyere og på iPhone beholder et notat lyden sin.'],
            [
              'Grupper',
              'Gjøremål, Handling, Ideer, Jobb og flere. KI på enheten velger gruppen på mobiler som har det.',
            ],
            [
              'Språk',
              'Et notat bruker ett av språkene eller begge. På Android 14 kan et notat bytte språk ved en pause.',
            ],
            [
              'Del med lenke',
              'Den andre personen åpner notatet i appen eller en nettleser, og begge redigerer det direkte.',
            ],
            ['Send til andre apper', 'Nye notater går til Obsidian, Notion, Todoist, Google Dokumenter eller OneNote.'],
            ['Nettsted', 'Delte notater åpnes i en nettleser, ved siden av veiledningene og retningslinjene.'],
            [
              'Oppdatering i appen',
              'APK-en finner en nyere utgivelse, laster den ned og åpner installasjonsprogrammet.',
            ],
            ['Lyst og mørkt', 'Følger mobilen, eller et fast valg.'],
            ['Reklame', 'Ett banner på startskjermen, etter samtykke i Europa.'],
            ['Fjern reklame', 'Et engangskjøp skjuler banneret på hver telefon på kontoen.'],
          ],
        },
      ],
    },
    servohop: {
      tagline: 'Drivstoffpriser i Australia på et kart, med historikken til hver stasjon.',
      lede: 'ServoHop leser delstatenes prisdata for drivstoff og setter hver stasjon på et kart, farget etter pris. Den lagrer den daglige historikken og viser også ladere for elbil. Den er gratis og krever ingen konto.',
      links: ['servohop.com'],
      groups: [
        {
          features: [
            [
              'Priser på kartet',
              'Grønne nåler for den billigste tredjedelen, gule for midten og røde for den dyreste.',
            ],
            ['Stasjonsliste', 'Stasjonene i bildet, billigst først, med merke, forstad og når prisen endret seg.'],
            ['Prishistorikk', 'Dagssnittet over et bånd fra laveste til høyeste, for 30, 90 eller 365 dager.'],
            ['Meldinger fra sjåfører', 'Der det ikke finnes data fra delstaten, sender sjåfører prisen fra skiltet.'],
            [
              'Elbilladere',
              'Nettverk, kontakter og høyeste effekt. Sjåfører melder prisen per kWh, og appen lagrer historikken.',
            ],
            ['Søkesider', 'En side for hver delstat, forstad og stasjon, med strukturerte data og et nettstedskart.'],
            [
              'Selvoppdatering',
              'APK-en sjekker GitHub ved oppstart og hver gang du kommer tilbake, og viser nedlastingen i toppfeltet.',
            ],
            ['Fjern annonser', 'Et engangskjøp på Google Play, som gjenopprettes på en ny mobil.'],
            ['Drivstoffpanel', 'Velg bensin, diesel, gass eller ladere, treg AC eller rask DC.'],
            ['Reklame', 'Ett banner under listen: AdMob i appen, AdSense på nettstedet.'],
            ['Språk', 'Skjermene finnes på 9 språk og følger telefonen eller nettleseren.'],
          ],
        },
      ],
    },
    consdr: {
      tagline: 'Leasing, lån eller kontant: hva en bil koster i Australia.',
      lede: 'Consdr viser totalkostnaden for den samme bilen over den samme perioden som novated lease, billån og kontantkjøp. Hvert faste tall i utregningen lenker til kilden sin.',
      links: ['consdr.com'],
      groups: [
        {
          features: [
            ['Tre måter side om side', 'Leasing, lån og kontant, hver som én sum for hele perioden.'],
            ['Hvor pengene går', 'Hver sum deles i bil, finansiering, driftskostnader, skatt og tapte renter.'],
            [
              'Innstillinger for leasing og lån',
              'Rente, restverdi, gebyrer, drivstoff gjennom leasingen og FBT-fritaket.',
            ],
            [
              'FBT etter biltype',
              'Regelen for en elbil, en ladbar hybrid eller en bensinbil, etter startdato og pris.',
            ],
            ['Dokumentavgift per delstat', 'Alle 8 delstater og territorier, ut fra pris, biltype og startdato.'],
            [
              'Renter på kontoen',
              'Pengene vokser hver måned på en offsetkonto for boliglånet eller en sparekonto, så sammenligningen blir rettferdig.',
            ],
            ['Boliglån', 'Hvor mye mindre en bank vil låne ut mens bilen betales ned.'],
            ['Utregning og kilder', 'Hvert trinn i summen, med en kilde for hvert faste tall.'],
            ['Vanlige spørsmål', 'Svar om leasing, elbilfritaket, restverdi og boliglån.'],
            [
              'Veiledninger',
              'Enkle sider om novated lease, FBT, restverdi og dokumentavgift, med tall fra de samme reglene.',
            ],
            ['Lagrede felt', 'En ny innlasting beholder feltene dine. Tilbakestill tømmer dem.'],
            ['Uten nett', 'Kalkulatoren åpnes uten nett etter første besøk.'],
            ['Fargetema', 'Auto, lyst eller mørkt.'],
            ['Fjern annonser', 'Et engangskjøp i Android-appen.'],
            ['Hvilken leieperiode koster minst', 'Samme bil over 1 til 5 år, med den billigste perioden merket.'],
            ['Språk', 'Kalkulatoren på 9 språk, med beløp i australske dollar.'],
            ['Reklame', 'AdSense-blokker på nettstedet og et AdMob-banner i Android-appen.'],
            ['Ingen reklame på utviklerens telefon', 'Hvert bygg skjuler banneret på en telefon med utviklernøkkelen.'],
          ],
        },
      ],
    },
    games: {
      tagline: 'Selskapsspill i nettleseren: tegn, gjett og gi hint.',
      lede: 'Workbench Games er tre selskapsspill for venner. Én lager et rom og sender lenken, og de andre blir med i nettleseren uten konto.',
      links: ['Spill nå'],
      groups: [
        {
          features: [
            ['Rom med lenke', 'Én lenke samler 2 til 12 venner i samme rom.'],
            ['Gjett tegningen', 'Tegn et ord, gjett de andres tegninger, kjemp om poeng.'],
            ['Tegnetelefon', 'En setning blir til tegninger og tilbake, og albumet viser hvordan den endret seg.'],
            ['Hintduell', 'Et ordspill i lag der hvert hint er åpent og det lønner seg å stjele.'],
            ['Tegneverktøy', 'Penn, viskelær, fyll, 20 farger, 4 størrelser og angre.'],
            ['Språk', 'Sidene og rommene fungerer på engelsk og russisk.'],
            ['Reklame', 'Spillene er gratis, med et banner på sidene, i lobbyen og på resultatene.'],
            ['Apper for Android og iOS', 'De samme spillene som en installert app.'],
          ],
        },
      ],
    },
    langflip: {
      tagline: 'Retter ord skrevet med feil tastaturoppsett.',
      lede: 'Skriv ghbdtn med feil oppsett på, og Langflip skriver «привет» i stedet og bytter oppsett. Engelsk fungerer på samme måte. Den kjører uten nett og logger ikke det du skriver.',
      links: ['Last ned'],
      groups: [
        {
          features: [
            [
              'Retting mens du skriver',
              'Fra 4. bokstav blir et ord som bare gir mening i det andre oppsettet, skrevet på nytt i det.',
            ],
            [
              'Korte ord',
              'Ord under 4 bokstaver endres ved mellomrom, Enter eller Tab, bare når det andre oppsettet gir et ekte ord.',
            ],
            ['Sifre beholdes', 'ьз3 blir til mp3.'],
            ['Angre en retting', 'Pause rett etter en retting henter ordet tilbake og husker det.'],
            ['Konverter for hånd', 'Shift+Pause konverterer det siste ordet til det andre oppsettet.'],
            [
              'Hopp over apper og felt',
              'Passordfelt, administratorvinduer og alle apper i innstillingene blir ikke rørt.',
            ],
            ['Oppsett på ikonet', 'Systemfeltet viser EN på blått eller RU på rødt for vinduet i forgrunnen.'],
            ['Pause med et klikk', 'Et klikk på ikonet slår av rettingen, og ikonet blir grått.'],
            ['Bytt med dobbeltklikk', 'Et dobbeltklikk på ikonet bytter oppsettet for vinduet i forgrunnen.'],
            ['Start ved pålogging', 'Slås på ved første oppstart, med en bryter i menyen i systemfeltet.'],
            ['Innstillingsfil', 'Utelatte apper og ord som skal beholdes, i én TOML-fil.'],
            ['Fortsett et ord', 'Bokstaver lagt til et ord teller som resten av ordet, på dets språk.'],
            ['Appikonet', 'En marineblå А og Я på et hologramkort, på exe-filen, snarveiene og i Innstillinger.'],
            ['Installer på Windows', 'Et dobbeltklikk på Langflip.cmd bygger og installerer for brukeren.'],
            ['Systemstatusfeltmeny', 'Et høyreklikk på ikonet åpner menyen.'],
            ['Beslutningslogg', 'En loggfil viser hva Langflip bestemte for hvert ord, og hvorfor.'],
          ],
        },
      ],
    },
    'media-organizer': {
      tagline: 'Sorterer bilder og videoer i mapper etter dato og sted.',
      lede: 'En skrivebordsapp som leser når og hvor hvert bilde ble tatt, og flytter det til en mappe for år, sted og dag. Den deler mappereglene med Memories, så mobilen og datamaskinen sorterer likt.',
      links: ['Installer'],
      groups: [
        {
          features: [
            ['Skanning', 'Viser hver fil i den valgte mappen mens den går gjennom mappen.'],
            ['Opptaksdatoer', 'En medfølgende ExifTool leser dato, kamera og GPS for hvert bilde og hver video.'],
            ['Steder uten nett', 'GPS blir til en stedsmappe uten nett.'],
            ['Plan først', 'Appen viser den nye mappen og navnet for hver fil før noen fil flyttes.'],
            ['Flytting', 'Bekreftede filer flyttes, med pause, fortsett og opprydding.'],
            ['Historikk, angre og gjør om', 'Hver kjøring går i en logg og kan spilles av begge veier.'],
            ['Innstillinger', 'Målmappe, bare gi nytt navn, grupper etter sted og hjemstedet.'],
            ['Filtabell', 'Rader med status, filtre, et stedskart og en statuslinje.'],
            [
              'Selvoppdatering',
              'Sjekker ved oppstart og når du kommer tilbake, viser nedlastingen og spør så om omstart.',
            ],
            [
              'Installasjon med én kommando',
              'Én PowerShell-linje installerer siste utgivelse, uten administratorrettigheter.',
            ],
          ],
        },
      ],
    },
    'agent-skills': {
      tagline: 'Ferdigheter som får en kodeagent til å jobbe som et studio.',
      lede: 'Et sett ferdigheter for kodeagenter: skrive som et menneske, planlegge i en spesifikasjon, løse en sak, åpne en pull request og svare på gjennomgangen. Andre ferdigheter går gjennom en hel app, eller lanserer et nettsted med søk, annonser og Google Play.',
      links: [],
      groups: [
        {
          features: [
            [
              'Enkelt språk',
              'Regler som fjerner KI-tonen fra chat, commits, dokumentasjon og tekster i grensesnittet.',
            ],
            ['Spesifikasjon først', 'Hver funksjon starter som en spesifikasjon i repoet, og arbeidet følger den.'],
            [
              'Fra sak til sammenslåing',
              'Leser en sak, bygger den i sitt eget worktree, åpner PR-en og flytter saken.',
            ],
            ['Pull requests', 'Korte PR-tekster med flytdiagrammer, og én commit per gjennomgangstråd.'],
            ['Kodegjennomgang', 'En gjennomgang etter sjekkliste, med hvert funn sjekket mot koden.'],
            [
              'Appgjennomgang',
              'Parallelle gjennomgåere per vinkel, som sikkerhet og ytelse. De trygge funnene blir rettet.',
            ],
            ['Arkitektur og monorepoer', 'Pakker i lag, delte API-kontrakter og CI per app.'],
            ['Lansering', 'Søkeoppsett, AdMob og AdSense, lansering på Google Play og en markedsplan i én kjøring.'],
            [
              'Oppdateringer i appen',
              'Selvoppdatering for apper installert utenfor butikken, utelatt fra Play-bygget.',
            ],
            [
              'Stell av repoer',
              'Worktrees, flytting av repoer, nullstilling av historikk og rotering av hemmeligheter.',
            ],
            ['Navn og domener', 'Sjekker et navn mot domener, foretaksregisteret og varemerker.'],
            ['Stemmer', 'Spiller hver tekst-til-tale-stemme, så en person kan velge én.'],
            ['Kodearbeid', 'Skills for å gjøre en sak, åpne en PR, svare på gjennomganger og gå gjennom en PR.'],
            [
              'Prosjektoppsett',
              'Skills for å planlegge arkitektur, sette opp et monorepo og kjøre kommandoer via mise.',
            ],
            ['Appikoner', '10 ikoner i stiler som passer appen, et valg i chatten, så alle størrelser.'],
            ['Demoskjermbilder og butikkmedier', 'Demodata, skjermbilder og korte videoer til README og butikken.'],
            [
              'Gjennomgang av en utgivelse',
              'Installerer den nyeste utgivelsen, går gjennom hver hovedflyt og melder per flyt.',
            ],
            ['Stemme ved slutten av en tur', 'En kort setning sier at agenten er ferdig, venter eller spør.'],
            ['Installasjon', 'Én klon lenket inn i hver agent på maskinen. En endring når alle.'],
            ['Utgivelser', 'Hver push til main som består sjekkene, blir en datert utgivelse med notater.'],
          ],
        },
      ],
    },
    'local-ci': {
      tagline: 'Ett skript setter opp en utviklermaskin og gjør den til CI-runner.',
      lede: 'local-ci gir en Mac eller en Windows-PC de samme utviklerverktøyene, og registrerer den så som selvdriftet GitHub Actions-runner. CI for private repoer bygger da på den maskinen uten kostnad.',
      links: [],
      groups: [
        {
          features: [
            ['Oppsett av Mac', 'Homebrew-verktøy, mise, skallet og git-oppsettet i én kjøring.'],
            [
              'Oppsett av Windows',
              'De samme verktøyene gjennom winget. En ny kjøring hopper over det som er på plass.',
            ],
            ['Selvdriftet runner', 'Maskinen bygger CI-jobber for organisasjonens repoer.'],
            ['Startknapp', 'Et dobbeltklikk starter siste versjon av CI-en.'],
            ['CI-statusside', 'En lokal side viser runneren og jobbene med ett blikk.'],
            ['Skyløpere først', 'Jobber bygger på gratis skyløpere så lenge minuttene varer, så på denne PC-en.'],
            ['Utgivelser', 'Hver push til main som består sjekkene, blir en datert utgivelse med notater.'],
            ['Oppdaterer seg selv', 'PC-en installerer hver utgivelse noen minutter etter sammenslåingen.'],
          ],
        },
      ],
    },
    ci: {
      tagline: 'Delte GitHub Actions-trinn for hvert repo.',
      lede: 'Én retting her når hvert repo ved neste kjøring.',
      links: [],
      groups: [
        {
          features: [
            ['Oppsettstrinn', 'Installerer verktøyene et repo låser i mise, så pakkene fra låsefilen.'],
            ['Dependabot-detaljer', 'Lagrer oppdateringstypen for hver Dependabot-PR til sammenslåingsjobben.'],
            [
              'Automatisk sammenslåing',
              'Slår sammen en Dependabot-PR når hver sjekk består. En hovedoppdatering venter på et menneske.',
            ],
            ['Utgivelser', 'Hver push til main som består sjekkene, blir en datert utgivelse med notater.'],
          ],
        },
      ],
    },
    'git-aliases': {
      tagline: 'Korte git-aliaser, klare for alle maskiner.',
      lede: 'Hvert alias er et lite skript i ett repo, så de samme kommandoene virker på hver maskin.',
      links: [],
      groups: [
        {
          features: [
            ['git a', 'Viser hvert alias med hva det gjør.'],
            ['git sb', 'Velger en gren med uskarpt søk og går inn i dens worktree.'],
            ['git db', 'Velger grener som skal slettes, med uskarpt søk.'],
            ['Trygge installasjonsskript', 'De spør før hver endring og tar sikkerhetskopi av hver fil de redigerer.'],
            ['Lint-krok', 'Hver commit til repoet kjører lint.'],
            ['Tilbake til standardgrenen', 'git m henter og tilbakestiller hardt til standardgrenen på remote.'],
            ['Utgivelser', 'Hver push til main som består sjekkene, blir en datert utgivelse med notater.'],
          ],
        },
      ],
    },
    'gh-review-notify': {
      tagline: 'Et Mac-varsel for hver gjennomgang av pull requestene dine.',
      lede: 'GitHub sender gjennomganger på e-post, så en godkjenning kan vente i timevis. Dette verktøyet sjekker hvert 3. minutt og viser et varsel. Et klikk åpner kommentaren.',
      links: [],
      groups: [
        {
          features: [
            ['Gjennomganger og kommentarer', 'Hver gjennomgang og kommentar på de åpne PR-ene dine, innen 3 minutter.'],
            ['Forespørsler om gjennomgang', 'Et varsel når noen ber deg ved navn om å gå gjennom.'],
            ['Mange kommentarer på en gang', 'Mer enn 4 nye kommentarer på én PR kommer som 1 varsel.'],
            ['Stille første kjøring', 'Første kjøring registrerer de siste 3 dagene og viser ingen av dem.'],
            ['Filter for roboter', 'Kommentarer fra roboter holdes stille med mindre du slår dem på.'],
            ['Status og test', 'Ett flagg skriver ut tilstanden, et annet sender et testvarsel.'],
            ['Utgivelser', 'Hver push til main som består sjekkene, blir en datert utgivelse med notater.'],
          ],
        },
      ],
    },
    'open-in-remote-repo': {
      tagline: 'En VS Code-utvidelse som åpner en fil på GitHub, GitLab eller Bitbucket.',
      lede: 'En fork av Open in GitHub av Stanislav Sysoev. Den åpner eller kopierer lenken til filen, blame eller historikken, med de valgte linjene markert.',
      links: ['Marketplace'],
      groups: [
        {
          features: [
            ['Fil, blame og historikk', 'Åpner hver av dem på den eksterne verten, med de valgte linjene.'],
            ['Kopier en lenke', 'De samme lenkene går til utklippstavlen, med et varsel som viser URL-en.'],
            ['Fra utforskeren', 'Et høyreklikk på en fil eller mappe åpner eller kopierer lenken.'],
            ['Main eller master først', 'Lenkene peker på en gren som allerede har filen.'],
            ['Verter og tilordnede URL-er', 'GitHub, GitHub-servere, GitLab, Bitbucket og Bitbucket Server.'],
            ['Språk', 'Kommandoer, innstillinger og meldinger følger visningsspråket i VS Code.'],
          ],
        },
      ],
    },
    archon: {
      tagline: 'Studioets oppstarter som gir arbeid til kodeagenter.',
      lede: 'Archon samler hele arbeidsmappen i ett vindu. Den åpner hver app på telefonen eller PC-en, gir Claude Code oppgaver i en konsoll per repo og viser hva som kjører akkurat nå.',
      links: [],
      groups: [
        {
          title: 'På hver side',
          features: [
            ['Spør Archon', 'En talt eller skrevet kommando velger verktøyet og åpner fanen.'],
            ['Kjørelinje', 'Hver jobb som kjører, med tid brukt og tid igjen.'],
          ],
        },
        {
          title: 'Hver dag',
          features: [
            ['Apper', 'Installer, oppdater og åpne hver app på telefonen, TV-en eller PC-en.'],
            ['Reklame på denne telefonen', 'Skjuler reklamen eller viser testreklame, i alle apper eller én.'],
            ['Gjøremål', 'De åpne punktene i hver TODO.md går til en agent med ett trykk.'],
            ['Økter', 'Agentøkter som stoppet for tidlig, fortsetter med ett kryss.'],
          ],
        },
        {
          title: 'Repoer',
          features: [
            ['Agenter', 'Kryss av repoer, velg en oppgave som en revisjon, og hvert får en konsoll.'],
            ['Dokumenter', 'README, docs og spesifikasjoner for hvert repo, med diagrammene tegnet.'],
            ['Regler', 'Reglene hver agent leser, og hullene i hvert repo.'],
            ['Grener', 'Hver gren og worktree, med behold, flett eller slett.'],
            ['Pakker', 'Hver pakke med nyeste versjon, oppdatert av en agent.'],
          ],
        },
        {
          title: 'Tjenester og innstillinger',
          features: [
            ['CI, Reddit og Memories', 'Sidene til CI, Reddit Desk og NAS-indekseren i faner.'],
            ['Sanger', 'Bygger og publiserer songfactory-videoene, med fremdrift.'],
            ['Stemmer', 'Velger stemmen hver agent snakker med.'],
            ['Nøkler', 'Alderen til hver CI-hemmelighet, og fornyelse gjennom en agent.'],
          ],
        },
      ],
    },
    'agent-skills-private': {
      tagline: 'Organisasjonens regler og ferdigheter oppå Agent Skills.',
      lede: 'Ferdighetene knyttet til organisasjonen workbench-soft. De flytter repoer, setter opp CI, fornyer hemmeligheter og får hver agentøkt til å planlegge, levere og rapportere likt.',
      links: [],
      groups: [
        {
          features: [
            ['Flytt et repo', 'Flytter et repo til organisasjonen og gjør det privat, med gratis CI beholdt.'],
            ['CI og utgivelser for hvert repo', 'Sjekker Checks og Release i hvert repo og legger til de som mangler.'],
            ['Skriv om et repo', 'Nye navn, mapper og dokumenter, med samme oppførsel.'],
            ['Forny hemmeligheter', 'Fornyer CI-hemmeligheter og nøkler, app for app.'],
            ['Arbeidsregler', 'Først en spesifikasjon, flett med en gang, test samlet senere.'],
            ['Utgivelser', 'En datert utgivelse for hver grønne push til main.'],
          ],
        },
      ],
    },
    'memories-demo-webdav': {
      tagline: 'En eksempel-NAS med bilder til Google Play-gjennomgangen.',
      lede: 'En WebDAV-server med eksempelbilder, så en Google Play-kontrollør kan logge inn i Memories uten egen NAS. Den kjører som Cloudflare Worker på gratisplanen.',
      links: [],
      groups: [
        {
          features: [
            ['Eksempelbibliotek', '42 bilder og 2 videoer fra 2015 til 2025, noen med kartnåler.'],
            ['Innlogging', 'Én kontrollørinnlogging, slik en ekte NAS spør etter den.'],
            ['Opplasting og sortering', 'Opplasting og flytting virker, og en nattlig jobb rydder.'],
          ],
        },
      ],
    },
    'memories-windows': {
      tagline: 'Den første Memories: en app i systemfeltet med en synkroniseringstjeneste på NAS-en.',
      lede: 'En tjeneste i Docker på NAS-en leste datoen for hvert bilde inn i en database per dag. Windows-appen ventet i systemfeltet og åpnet bildene tatt på denne dagen. Mobilappen erstattet den.',
      links: [],
      groups: [
        {
          features: [
            ['Systemfeltet', 'Appen venter i systemfeltet. Et klikk åpner galleriet.'],
            ['Daglig påminnelse', 'Én gang om dagen kaller et varsel deg til dagens bilder.'],
            ['Galleri etter periode', 'Velg en dag eller et spenn av år, og bildene lastes mens du blar.'],
            ['Bildevindu', 'Ett bilde stort, med neste og forrige én tast unna.'],
            ['Detaljer og kart', 'Kameradetaljene og stedet på et kart.'],
            ['Send', 'Valgte bilder sendes i én handling.'],
          ],
        },
      ],
    },
    shuttrix: {
      tagline: 'Et kamera med hjulene til et speilrefleks, og en enkel modus med store glidebrytere.',
      lede: 'Shuttrix er et Android-kamera med 2 moduser. Enkel modus har store glidebrytere med Natt, Lang eksponering og Panorama, og Pro legger objektiv, fokus, hvitbalanse, ISO og lukker på hjul.',
      links: [],
      groups: [
        {
          features: [
            ['Enkel og Pro', 'En glassbryter øverst velger modus. En ny installasjon åpner i Enkel.'],
            ['Enkel modus', 'Objektivknapper over en zoomglidebryter, så Lys, Varme og Farge.'],
            ['Natt', 'Telefonen bygger bildet av flere bilder mens en linje fylles.'],
            ['Lang eksponering', 'Gjør bevegelse uskarp: silkevann, lysspor, en folkemengde som blekner.'],
            ['Panorama', 'Et bredt bilde fra en langsom vending, satt sammen på telefonen.'],
            ['Objektiver', 'En knapp per objektiv på telefonen, over én zoomskala.'],
            ['Fokus', 'AF-C følger et motiv i bevegelse og ansikter. Et trykk fokuserer på et punkt.'],
            ['Hvitbalanse', 'Auto, forvalg eller kelvin på et hjul.'],
            ['Eksponering', 'ISO og lukker, hver auto eller manuelt i tredjedels trinn.'],
            ['Farge', 'Én metning for COLOR-hjulet og Farge-glidebryteren.'],
            ['Foto, video og blits', 'Bildet er rammen på skjermen ved berøring. Hold for å filme.'],
            ['Sted og kameradata', 'Hvert bilde bærer hvor og hvordan det ble tatt, som EXIF-tagger.'],
            ['Bilde- og videostørrelse', 'Innstillingene velger størrelsen på bilder og video.'],
            ['Forbedre bilder', 'Dypere svart, lysere skygger, livligere farger og litt skarphet.'],
            ['QR-koder', 'En kode i forhåndsvisningen får klammer og en knapp for å åpne den.'],
            ['Galleri', 'Bildene i rutenett og fullskjerm, med zoom ved klyp og dobbelttrykk.'],
            ['Rett opp og roter', 'EDIT i visningen retter opp og snur et bilde.'],
            ['Hurtigstart', 'To trykk på av/på-knappen åpner Shuttrix, også over låseskjermen.'],
            ['Språk', 'På 9 språk, etter telefonen eller nettleseren.'],
          ],
        },
      ],
    },
    farnear: {
      tagline: 'Videosamtaler over en grense som blokkerer de vanlige appene, med en tavle å tegne på.',
      lede: 'Farnear ringer familien via en lenke, uten konto. Videoen går rett mellom deltakerne, og samtalen prøver flere veier til én kommer gjennom.',
      links: [],
      groups: [
        {
          features: [
            ['Samtaler via lenke', 'En lenke er rommet. Opptil 4 personer ser og hører hverandre.'],
            ['Lagrede rom', 'En romlenke lagret under et navn, som Mamma. Samme lenke virker hver gang.'],
            [
              'Samtaler som prøver flere veier til Russland',
              'Først direkte, så via reléer, og til slutt lim inn for hånd.',
            ],
            ['Tavle', 'Alle tegner på én flate med penn, merkepenn eller laser.'],
            [
              'Del en skjerm, et bilde eller en video',
              'Tavlen viser et vindu, et bilde eller en video, og alle tegner oppå.',
            ],
            ['Bilde fra telefonen', 'Kameraet tar bilde av en side og legger den på tavlen.'],
            ['Timer', 'Læreren blar gjennom lysbilder, begge tegner, og en tidtaker ringer før slutten.'],
            ['Reklame og fjerning', 'Reklame på forsiden og i guidene. Ett kjøp fjerner den i kjøperens rom.'],
            ['Språk', 'På 9 språk, etter telefonen eller nettleseren.'],
          ],
        },
      ],
    },
    memoire: {
      tagline: 'Lær engelske eller russiske ord i korte runder, rett før du glemmer dem.',
      lede: 'Memoire lærer russisktalende engelsk og engelsktalende russisk. Noen ganger om dagen viser den korte runder med kort, rett før et ord glipper.',
      links: [],
      groups: [
        {
          features: [
            ['Ordrunder', 'Korte runder med kort: ord som skal repeteres først, nye imellom.'],
            ['Måter å spørre på', 'Et kort spør om betydningen, ordet, det du hørte eller stavingen.'],
            ['Legg til et ord', 'Skriv et ord og få kort med oversettelser og eksempler.'],
            ['Bilder', 'Et kort viser bildet fra ordets Wikipedia-artikkel.'],
            ['Innebygde ord', 'Rundt 8 000 engelske ord med CEFR-nivå og russiske oversettelser.'],
            ['Nivåtest', 'Opptil 6 runder ja eller nei på ekte og oppdiktede ord setter nivået.'],
            ['Emner', '14 emner som IT, reise, mat og barneord.'],
            ['Påminnelser', 'Lokale varsler til faste tider, bare når ord venter.'],
            ['Mine ord', 'En liste med kort, med søk, stjerner og sletting.'],
            ['Utseende og språk', 'Lyst og mørkt tema, og skjermene på 9 språk.'],
            ['Samtaleøving', 'En chat om en scene som en kafé eller et jobbintervju, på elevens nivå.'],
            ['Synk mellom enheter', 'De samme kortene på telefon, nettbrett og nettleser, koblet med en kode.'],
            ['Widget på startskjermen', 'Antall ventende ord og ett ord med betydningen.'],
          ],
        },
      ],
    },
    'lumiere-player': {
      tagline: 'En videospiller for Google TV som spiller filer fra en USB-pinne eller en NAS.',
      lede: 'Lumiere Player spiller filer fra en USB-pinne eller en SMB-deling med libVLC, så den åpner det VLC åpner. Hver fil husker stedet, og fjernkontrollen hopper og bytter spor.',
      links: [],
      groups: [
        {
          features: [
            ['Kilder', 'USB-pinner og SMB-delinger, listet på startskjermen.'],
            ['Fortsett', 'Hver fil husker posisjonen, og listen viser hvor langt du kom.'],
            ['Undertekster og lyd', 'Innebygde spor og filer i samme mappe, kyrillisk også.'],
            ['Kontroller', 'Hopp 10 eller 30 sekunder, endre fart, tilfeldig og gjenta.'],
            ['Oppdateringer', 'Finner nye utgivelser på GitHub ved oppstart eller under Oppdateringer.'],
            ['Reklame', 'Et banner på startskjermen, med en engangs opplåsing i Play-bygget.'],
            ['Språk', 'På 9 språk, etter telefonen eller nettleseren.'],
          ],
        },
      ],
    },
    'property-trends': {
      tagline: 'Australske forsteder farget etter medianprisen på bolig, med historikk.',
      lede: 'Et kart over australske forsteder, hver farget etter medianprisen, med et diagram over utviklingen. Det bygger på åpne offentlige data.',
      links: ['Åpne kartet'],
      groups: [
        {
          features: [
            ['Priskart', 'Hver forstad farget etter medianprisen.'],
            ['Filtre', 'Boligtypen og perioden kartet viser.'],
            ['Annonser på realestate.com.au', 'Knapper åpner det samme søket på realestate.com.au.'],
            ['Forstadskort og historikk', 'Forstadens median, antall salg og et diagram over år.'],
            ['Søk', 'Finner en forstad etter navn eller postnummer og flyr kartet dit.'],
            ['Språk', 'På 9 språk, etter telefonen eller nettleseren.'],
            ['Leie', 'Hvert postnummer i NSW farget etter medianleien for nye leieavtaler per uke.'],
            ['Installer fra nettleseren', 'Nettversjonen installeres som en app med eget ikon.'],
          ],
        },
      ],
    },
    tripforge: {
      tagline: 'En hel reise fra noen få ord: fly, rute, hotell og bil, med priser.',
      lede: 'Tripforge planlegger en reise ut fra stedene, en omtrentlig dato og gruppen. Svaret er en priset plan med fly, rute, hotell og bil, og billigere datoer rundt.',
      links: [],
      groups: [
        {
          features: [
            ['Spør', 'Skriv stedene, en omtrentlig dato, hvor lenge og hvem som skal.'],
            ['Fly', 'De billigste tur-retur-flyene rundt datoen, med billigere datoer ved siden av.'],
            ['Til Tickalot', 'Ett trykk gjør reisen om til Tickalot-lister: severdigheter og pakking.'],
            ['Innstillinger', 'Språket: telefonens, eller ett av de 9.'],
          ],
        },
      ],
    },
    'reddit-desk': {
      tagline: 'Lager utkast til Reddit-kommentarer om et repo og skriver dem inn i Chrome.',
      lede: 'En Windows-app for oppgavelinjen. Velg et repo, trykk Finn, og Claude Code lager et utkast for hver tråd repoet kan svare på. Åpne et kort, og Chrome får utkastet, klart til å postes for hånd.',
      links: [],
      groups: [
        {
          features: [
            ['Repovelger', 'En nedtrekksliste med hver git-mappe under roten.'],
            ['Subreddits', 'Claude leser repoet og fyller inn passende subs.'],
            ['Finn tråder', 'Claude Code finner tråder repoet kan svare på og lager et utkast.'],
            ['Kort', 'Hvert kort viser sub, trådtittel og utkastet som kan redigeres.'],
            ['Åpne i Chrome', 'Chrome åpner tråden med kommentaren skrevet inn, klar til å postes.'],
            ['Innlegg-fanen', 'Lager utkast til innlegg om valgte repoer i passende subs.'],
            ['Skjermbilder og videoer', 'Hvert innlegg lister medier fra repoets skjermbildemappe.'],
            ['Åpne et innlegg', 'Chrome åpner subens innsendingsside med innlegget fylt ut.'],
            ['Utestengelsesrisiko', 'En linje vurderer neste innlegg, og hvert kort sin sub.'],
            ['Testerinnlegg', 'Et innlegg som søker testere for en Android-app fra en liste.'],
            ['Inne i Archon', 'Reddit-fanen i Archon viser dette vinduet i en ramme.'],
            ['Infoknapp', 'i-knappen forklarer Reddit-oppsettet.'],
            ['Språk', 'Innstillingene har en språkliste: systemets eller ett av 9.'],
            ['Ferdigliste', 'Hver postet og hoppet over tråd med dato.'],
          ],
        },
      ],
    },
    songfactory: {
      tagline: 'Gjør en mappe med sanger til en lang YouTube-video i loop og laster den opp.',
      lede: 'Songfactory setter sammen sangene i ett tema over en bakgrunn i loop, lager kapitler og miniatyrbilde, og laster opp etter plan. Claude skriver teksten, og ComfyUI kan tegne bakgrunnen.',
      links: [],
      groups: [
        {
          features: [
            ['Installer og sjekk', 'Ett skript installerer verktøyene, og en sjekk tester dem.'],
            ['Lang video fra en spilleliste', 'Sangene i en temamappe glir over i hverandre over et klipp i loop.'],
            ['Sømløs loop', 'Klippet spilles forlengs og så baklengs, så hoppet på slutten forsvinner.'],
            ['Kapitler og miniatyrbilde', 'Beskrivelsen lister hver sang med starttid, og et miniatyrbilde lages.'],
            ['Planlagt opplasting', 'Én kommando laster opp med KI-merke og publiseringstid.'],
            ['Tekst fra Claude', 'Claude skriver YouTube-tittel og beskrivelse ut fra sangene.'],
            ['Bakgrunn fra ComfyUI', 'En prompt i temafilen får ComfyUI til å tegne bakgrunnsklippet.'],
          ],
        },
      ],
    },
    'speed-camera-location-scraper': {
      tagline: 'Slår sammen de australske fotoboks-listene til én CSV.',
      lede: 'Skraperen åpner hver delstatsside, lagrer hver kamerafil og slår dem sammen til én CSV, en rad per kamera med delstat. SpotTheCam leser kamerastedene derfra.',
      links: [],
      groups: [
        {
          features: [
            ['Skann delstatssidene', 'Åpner hver delstatsside og lagrer hver kamerafil.'],
            ['Én CSV med kameraer', 'En rad per kamera med delstat, for SpotTheCam.'],
            ['Sjekker og utgivelser', 'Hver push til main sjekkes og blir en datert utgivelse.'],
          ],
        },
      ],
    },
  },
};

export default nb;

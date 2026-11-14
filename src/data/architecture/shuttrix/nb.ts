import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Shuttrix er en Expo-app med skjermer i React Native over en kameramodul i Kotlin på CameraX og Camera2. Hvert bilde lages og lagres på telefonen, uten server.',
  parts: [
    {
      name: 'Expo og React Native',
      role: 'kameraskjermen, hjulene, enkel modus, galleriet og innstillingene i TypeScript.',
    },
    {
      name: 'CameraX og Camera2',
      role: 'CameraX styrer livssyklusen og strømmene, med Camera2-verdier for de manuelle hjulene.',
    },
    {
      name: 'Kameramodul i Kotlin',
      role: 'kobler til objektivene, bruker hjulene og kjører modusens trinn på hvert lagret bilde.',
    },
    {
      name: 'OpenCV',
      role: 'syr sammen panoramaet, retter inn fokusstabelen for makro og tegner portrettuskarpheten.',
    },
    { name: 'ML Kit', role: 'leser QR-koder fra forhåndsvisningen og finner motivet til portrett.' },
    { name: 'ONNX Runtime', role: 'kjører en dybdemodell på telefonen for uskarpheten i Portrett og Mini.' },
    { name: 'Rust-crate for bilder', role: 'fremkaller råbilder fra sensoren til et bilde for Raw-bryteren.' },
    { name: 'MediaStore', role: 'lagrer hvert bilde i kameramappen, der Memories og andre gallerier finner det.' },
  ],
  flow: [
    'Personen velger en modus og drar i et hjul eller en glidebryter.',
    'Skjermen sender verdiene til kameravisningen i Kotlin som props.',
    'CameraX og Camera2 bruker dem, og hjulene viser liveverdiene for hvert bilde.',
    'Et trykk tar bildet, og modusens trinn kjører på den lagrede filen.',
    'MediaStore legger resultatet i kameramappen, og galleriet viser det.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Shuttrix bor i Memories-repoet og deler bilderedigereren, visningen og stedsnavnene. Memories leser bildene fra kameramappen.',
    },
    { to: 'app-updater', text: 'WBS Updater installerer samme APK fra de felles utgivelsene.' },
    { to: 'GitHub', text: 'Bygget utenfor butikk finner ny versjon i de offentlige utgivelsene.' },
    { to: 'Google Play', text: 'Google Play Billing selger Plus og Fjern reklame.' },
    { to: 'Google AdMob', text: 'AdMob viser banneret i galleriet etter samtykkeskjemaet.' },
  ],
  features: {
    'Simple and Pro':
      'Begge modusene styrer én kameravisning. Enkel gir fokus og eksponering til automatikken, og Pro gir dem til hjulene.',
    'Simple mode':
      'React Native tegner objektivikonene, zoomlinjen og glidebryterne over kameravisningen. Et innstillingslager holder hver verdi og gjør den om til kamera-props.',
    Night:
      'Kotlin-modulen bruker nattutvidelsen i CameraX, som er telefonens egen nattbehandling. Et objektiv uten den får lav bildefrekvens med sterk støyreduksjon.',
    Astro:
      'Modulen tar opptil 24 bilder på et kvart sekund og retter dem inn etter stjernene. Et tonetrinn fjerner så himmelglød og løfter stjernene.',
    Moon: 'En serie på 2,5 sekunder beholder de 8 skarpeste bildene rundt månen og tar gjennomsnittet. Et andre trinn skjerper og setter nivåene.',
    'Long exposure':
      'En bildestrøm samler 3 sekunder med bilder tatt på frihånd og retter dem inn. Blandingen bruker det skarpeste bildet der scenen sto stille.',
    Portrait:
      'ML Kit finner motivet i fokuspunktet, og en dybdemodell gir avstandene. OpenCV tegner så uskarpheten etter dybde på telefonen.',
    Mini: 'En GPU-uskarphet ligger over det skarpe bildet gjennom en gradientmaske, med sterkere farger. Ett GPU-filter gir samme utseende i forhåndsvisning og video.',
    Macro:
      'Appen velger bakobjektivet som fokuserer nærmest og regner ut bildebredden. En fokusstabel i OpenCV slår sammen 6 til 10 bilder til ett skarpt bilde.',
    Panorama:
      'Rotasjonssensoren beholder et bilde hver gang telefonen har snudd langt nok, opptil 12. OpenCV legger hvert på en sylinder og syr stripene sammen etter like punkter.',
    'Slow motion':
      'En høyhastighetsøkt i CameraX tar opp med objektivets høyeste faste bildefrekvens. CameraX skriver selv den sakte MP4-filen.',
    'Time lapse':
      'En andre bildestrøm sender et bilde hvert halve sekund til en H.264-koder. Hvert bilde får et fast tidsstempel, så farten holder seg på 15 ganger.',
    Lenses:
      'Modulen leser hvert objektiv og området fra kameraet, og ett zoomforhold velger objektivet. På selfiekameraet styrer ansiktene som blir funnet utsnittet.',
    Focus:
      'Kameraets egen ansiktsdetektor finner ansikter i hvert bilde. Modulen retter fokus og lysmåling mot målansiktet eller punktet du trykket på.',
    'White balance':
      'Camera2 setter forhåndsvalgene og forsterkningene. For kelvin måler modulen hvert forhåndsvalg én gang per objektiv og plasserer verdien mellom de 2 nærmeste.',
    Exposure:
      'Camera2 setter ISO og lukker for hånd eller lar autoeksponeringen styre. Objektivet gir korreksjonsområdet, og auto gjør mørke scener opptil 2 EV mørkere.',
    'Auto tune':
      'En ren funksjon leser det målte lyset og kelvin fra den automatiske hvitbalansen. Den gir verdiene for Lys, Varme og Farge til scenen.',
    Color:
      'Camera2 har ingen metningskontroll, så et fargematrisetrinn skriver om hvert lagret bilde. Forhåndsvisningen får samme matrise som en live effekt.',
    'Photo, video and flash':
      'CameraX tar bildet ved berøring uten lukkerforsinkelse. Et langt trykk kobler til videostrømmene, tar opp og kobler så til bildestrømmene igjen.',
    'Place and camera tags':
      'Androids posisjonstjeneste holder en fersk posisjon mens kameraet er åpent. Et EXIF-trinn skriver så stedet, hjulene og objektivets retning inn i filen.',
    'Photo and video size':
      'Innstillingene har 3 bildetrinn og 4 videotrinn. CameraX faller tilbake til nærmeste størrelse objektivet støtter.',
    'Photo format and originals':
      'En filmodul koder hvert bilde som WebP, JPEG eller PNG og kopierer EXIF-taggene. Den kan beholde kameraoriginalen og en kopi med bare farge, og RAW legger til en DNG.',
    'Multi-frame photo':
      'En ring holder de siste 5 bildene i full størrelse mens kameraet går. Et trykk slår sammen bildene fra før berøringen, med det nyeste som referanse.',
    'Enhance photos':
      'Med Forbedre på løfter en GPU-shader skyggene og gir den lagrede JPEG-en farge og skarphet. Uten den ber Camera2 om en enkel sRGB-tonekurve der kameraet tillater det.',
    'Raw photo (beta)':
      'En egen Camera2-økt holder de siste 8 råbildene fra sensoren. En Rust-crate retter dem inn og slår dem sammen, og fremkaller så bildet på telefonen.',
    'QR codes':
      'Den innebygde ML Kit-skanneren leser hvert bilde i forhåndsvisningen på telefonen. CameraX flytter rammen til hver kode til skjermen for hjørnemerkene.',
    Clock:
      'Et lag i React Native tegner klokken i stripen den skjulte statuslinjen etterlater. En tidtaker går hvert minutt, og trykk går videre til forhåndsvisningen.',
    Gallery:
      'Galleriet viser bildene appen lagret gjennom MediaStore og grupperer versjonene av ett bilde. Delingsmenyen i Android sender filene du valgte.',
    Plus: 'Google Play Billing selger engangskjøpet, og appen sjekker det første gang galleriet åpnes. En låst modus åpner Plus-arket med prisen fra Google Play.',
    Ads: 'AdMob viser ett banner under galleriets rutenett og ber om samtykke første gang. Samme sjekk mot Google Play skjuler det etter Fjern reklame eller Plus.',
    'Edit photos':
      'Den delte redigeringspakken fra Memories-repoet kjører i en Expo DOM-komponent. Kotlin-modulen lagrer resultatet over filen eller som en ny JPEG, med metadata.',
    'Quick start':
      'Appen svarer på kamera-intentene i Android, så et dobbelttrykk på av/på-knappen åpner den. En hurtiginnstillingsflis og en aktivitet over låseskjermen åpner den også låst.',
    Updates:
      'En delt oppdateringspakke sjekker GitHub-utgivelsene ved oppstart og hver gang du kommer tilbake. Google Play-bygget bytter den ut med en erstatning uten sjekk.',
    Languages:
      'i18next holder én katalog per språk, og en test sjekker hver nøkkel. Kameramodulen lagrer valget fra innstillingene ved siden av hjulene.',
    'Light, blur and fonts':
      'Den delte bilderedigereren jobber på ferdige piksler, så uskarpheten følger en ellipse uten dybdedata. Innstillinger som bare gjelder opptak holdes utenfor.',
    'iPhone app':
      'En Swift-tvilling av kameramodulen kjører på AVFoundation med de samme kallene. Core Image tar bildetrinnene, og de bygde modusene bruker videobildene.',
  },
};

export default arch;

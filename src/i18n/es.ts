import type { Catalog } from './types';

const es: Catalog = {
  ui: {
    meta: {
      title: 'Workbench Soft: apps para Android, la web, Windows y macOS',
      description:
        'Workbench Soft crea y publica apps: {names} y herramientas para desarrolladores. Cada proyecto con cada una de sus funciones.',
      org: 'Un estudio de software que crea apps para Android, iPhone, la web, Windows y macOS.',
    },
    nav: {
      services: 'Servicios',
      projects: 'Proyectos',
      process: 'Proceso',
      contact: 'Contacto',
      main: 'Menú principal',
      search: 'Buscar',
      searchLabel: 'Buscar proyectos y funciones',
      language: 'Idioma',
      skip: 'Ir a los proyectos',
    },
    hero: {
      status: 'Abiertos a proyectos de clientes',
      lines: ['Diseñamos,', 'creamos y lanzamos', 'software.'],
      lead: 'Workbench Soft es un estudio independiente. Crea apps para Android, iPhone, la web, Windows y macOS, y lleva cada una desde la primera especificación hasta la tienda, los resultados de búsqueda y las actualizaciones posteriores.',
      start: 'Empezar un proyecto',
      work: 'Ver el trabajo',
      projects: 'Proyectos',
      features: 'Funciones lanzadas',
      platforms: 'Plataformas',
      ads: 'Anuncios en este sitio',
    },
    services: {
      title: 'Lo que el estudio crea para ti',
      intro:
        'El mismo equipo que lanzó las apps de abajo puede crear la tuya. Cada línea de trabajo enlaza a los proyectos que la demuestran.',
    },
    projects: {
      title: 'El trabajo, función a función',
      intro: 'Cada proyecto de abajo muestra lo que hace por quien lo usa. Pulsa {key} para buscar cualquier función.',
      filter: 'Filtrar los proyectos',
      all: 'Todos',
      find: 'Buscar una función',
      index: 'Índice de proyectos',
      features: 'Funciones',
      platforms: 'Plataformas',
      stack: 'Tecnologías',
      kinds: { app: 'Apps', tool: 'Herramientas para desarrolladores', archive: 'Archivo' },
    },
    process: {
      title: 'De la primera especificación a la tienda',
      intro:
        'Cada proyecto de arriba pasó por los mismos pasos. Un proyecto de cliente también pasa por ellos, y el cliente ve cada uno.',
    },
    contact: {
      title: '¿Tienes una app en mente?',
      intro: 'Escribe unas líneas sobre la idea, las plataformas y el plazo.',
      write: 'Escribir un correo',
      copy: 'Copiar la dirección',
      copied: 'Copiada',
      subject: 'Un proyecto para Workbench Soft',
    },
    palette: {
      results: 'Resultados',
      empty: 'Sin resultados. Prueba con otra palabra.',
      project: 'Proyecto',
      feature: 'Función',
    },
    footer: {
      noAds: 'Este sitio no muestra anuncios.',
      releases: 'Versiones',
      privacy: 'Privacidad de Memories',
    },
    technologies: 'Tecnologías',
  },
  services: [
    {
      title: 'Apps móviles',
      text: 'Apps para Android y iPhone en React Native y Expo. Servicios en segundo plano, palabras de activación, mapas, datos sin conexión y compras dentro de la app. Publicadas en Google Play, o como APK que se actualiza solo.',
    },
    {
      title: 'Apps web y PWA',
      text: 'Apps en Next.js, React y Astro que se instalan en la pantalla de inicio y abren sin red. Alojadas en Cloudflare Workers, con páginas que los buscadores pueden indexar.',
    },
    {
      title: 'Escritorio y utilidades del sistema',
      text: 'Apps nativas en Rust y Tauri para Windows y macOS. Hooks de teclado, iconos en la bandeja, orden de archivos con deshacer e instaladores que se actualizan solos.',
    },
    {
      title: 'Mapas, voz y audio',
      text: 'Mapas en vivo con rutas paso a paso. Palabras de activación y dictado sin conexión. Sintetizadores, efectos y MIDI en el navegador.',
    },
    {
      title: 'Lanzamiento y crecimiento',
      text: 'Ficha y lanzamiento en Google Play, Search Console, sitemaps y datos estructurados. AdMob y AdSense con el mensaje de consentimiento, y luego un plan para los primeros usuarios.',
    },
    {
      title: 'Ingeniería y herramientas de IA',
      text: 'CI en tu propio hardware, GitHub Actions compartidas y skills que hacen que los agentes de código sigan las reglas de un equipo, del ticket al merge.',
    },
  ],
  steps: [
    {
      title: 'Especificación',
      text: 'Cada función empieza como una especificación escrita en el repo: qué hace por la persona, los flujos y los límites. Tú lees y apruebas el mismo archivo.',
    },
    {
      title: 'Desarrollo',
      text: 'El trabajo va en su propia rama, con su propia base de datos, puerto y emulador. Cada paso es un commit con las comprobaciones en verde.',
    },
    {
      title: 'Revisión y entrega',
      text: 'Una pull request con diagramas de los flujos, y luego CI. Las comprobaciones en verde hacen el merge, y la documentación cambia en la misma PR.',
    },
    {
      title: 'Lanzamiento y mantenimiento',
      text: 'Publicación en la tienda, configuración de búsqueda y actualizaciones dentro de la app. El README, la arquitectura y la documentación de funciones siguen siendo correctos tras cada cambio.',
    },
  ],
  projects: {
    memories: {
      tagline: 'Fotos de un día como hoy, desde tu propio NAS.',
      lede: 'Memories muestra este día en años anteriores, con las fotos y vídeos de un NAS en casa. Funciona como los recuerdos de Google Fotos, y las fotos se quedan en un equipo que guardas en casa.',
      links: ['Abrir el sitio'],
      groups: [
        {
          features: [
            [
              'Recordatorio diario',
              'Una notificación a la hora elegida dice el año y el lugar, como «Hace 3 años en Japón». Los viajes al extranjero van primero.',
            ],
            ['Hoy', 'Este mes y día en cada año de la biblioteca. Un toque en la fecha elige cualquier otro día.'],
            [
              'Viajes',
              'Varios días seguidos con fotos en el extranjero forman un viaje. Un enlace abre sus fotos del primer al último día.',
            ],
            [
              'Fotos y archivo',
              'Cada foto y vídeo, lo más nuevo primero, bajo un encabezado por día. El archivo lista cada año y mes con un recuento.',
            ],
            ['Lugares', 'Cada día dice dónde fue. Una barra de filtros busca lugares y elige dispositivos.'],
            [
              'Fotos de cámara y dron',
              'Las tomas de una cámara o un dron tienen su propio grupo junto a las del teléfono.',
            ],
            [
              'Pellizcar para cambiar tamaño',
              'Un pellizco fija de 1 a 6 miniaturas por fila, para cada cuadrícula, y se guarda entre aperturas.',
            ],
            [
              'Enviar muchas a la vez',
              'Una pulsación larga empieza la selección. Las fotos elegidas van a cualquier app en un solo envío.',
            ],
            [
              'Enlaces de álbum',
              'Las fotos elegidas se convierten en un enlace. La otra persona abre el álbum en un navegador, sin app ni cuenta.',
            ],
            [
              'Organizar',
              'Tarjetas por pasos ordenan las fotos del teléfono, las mueven a carpetas por fecha en el NAS y liberan el teléfono.',
            ],
            [
              'Ordenar en el NAS',
              'Los archivos elegidos del NAS reciben su nombre y carpeta por fecha, en el NAS y en el índice a la vez.',
            ],
            [
              'Visor',
              'Fotos y vídeos a pantalla completa, con un deslizamiento al siguiente. Los vídeos se reproducen directo desde el NAS.',
            ],
            [
              'Conectar con el NAS',
              'La app encuentra el NAS en el Wi-Fi. Un inicio de sesión abre la carpeta de fotos por WebDAV.',
            ],
            ['Fuera de casa', 'Una segunda dirección por Tailscale llega al NAS sin abrirlo a internet.'],
            [
              'Progreso de sincronización',
              'Un banner dice qué tienen el teléfono y el índice del NAS, qué se ejecuta ahora y qué viene después.',
            ],
            [
              'Datos móviles',
              'La primera sincronización con datos móviles pregunta antes. Un interruptor en Ajustes cambia la respuesta.',
            ],
            [
              'Índice en el NAS',
              'Un indexador en el NAS lee las fotos de su propio disco, mucho más rápido que una sincronización por WebDAV.',
            ],
            [
              'Pasar a un teléfono nuevo',
              'El teléfono nuevo toma el índice del viejo, en lugar de una primera sincronización de horas.',
            ],
            ['Inglés y ruso', 'La app sigue el idioma del teléfono. Android 13 y posteriores lo fijan por app.'],
            ['Claro y oscuro', 'Sigue al teléfono, o una opción fija en Ajustes.'],
            [
              'Quitar anuncios',
              'Una compra única en Google Play oculta los anuncios en cada teléfono con la misma cuenta de Google.',
            ],
          ],
        },
      ],
    },
    spotthecam: {
      tagline: 'Radares de velocidad de Australia y Nueva Zelanda en un solo mapa.',
      lede: 'SpotTheCam pone en un solo mapa los radares oficiales de los estados australianos y de Nueva Zelanda. Cada marcador lleva el límite que rige en este momento. La app de Android añade avisos por voz, un registro de viajes y rutas paso a paso.',
      links: ['spotthecam.com'],
      groups: [
        {
          title: 'En el mapa, en cualquier navegador',
          features: [
            [
              'Límites en vivo',
              'Cada radar muestra el límite de este momento. En una zona escolar el número sigue el horario de la zona.',
            ],
            ['Búsqueda por barrio', 'Escribe un barrio, y el mapa vuela a sus radares.'],
            ['Tipos de radar', 'Una pulsación deja solo los tipos que necesitas. El navegador recuerda la elección.'],
            [
              'Seguirme',
              'El mapa te sigue y gira hacia tu rumbo. Los nombres de calles y las señales se quedan derechos.',
            ],
            [
              'Detalles del radar',
              'Un marcador abre el tipo, la dirección, el límite actual y un enlace a la fuente oficial.',
            ],
            [
              'Funciona sin conexión',
              'La lista de radares y cada zona del mapa que abriste se quedan en el dispositivo. Se instala como app.',
            ],
            ['Mapa claro y oscuro', 'Auto sigue al dispositivo, o elige en el menú del engranaje.'],
          ],
        },
        {
          title: 'En la app de Android',
          features: [
            [
              'Indicador de velocidad',
              'Tu velocidad junto al límite de la vía. El indicador se pone rojo al superarlo.',
            ],
            [
              'Avisos de radar',
              'Un pitido unos 20 segundos antes, luego «Radar adelante. Límite 60». También llega a la pantalla de bloqueo.',
            ],
            ['Por encima del límite', '«Vas a 72. Reduce la velocidad». Solo cerca de radares, o en cualquier vía.'],
            [
              'Registro de viajes',
              'Trayectos en coche y paseos se graban solos. Cada ruta muestra tu velocidad en cada radar, en verde o rojo.',
            ],
            [
              'Compartir un viaje',
              'Un enlace muestra la ruta en cualquier navegador. Dejar de compartir la borra del servidor.',
            ],
            ['Distancia', 'Dígitos grandes dan los km del viaje actual y el total del día.'],
            [
              'Rutas paso a paso',
              'El orden más rápido entre paradas, giros anunciados a 500 m y 200 m, según el tráfico de hoy. Un giro equivocado da una ruta nueva.',
            ],
            [
              'Opciones de ruta',
              'Ida y vuelta, a pie o evitando peajes. Favoritos como Casa entran en la ruta con un toque.',
            ],
            [
              'Hey Spot',
              '«Hey Spot, go to Bondi Beach, Manly and back». Un modelo sin conexión en el teléfono oye las palabras de activación.',
            ],
            ['Pantalla encendida', 'El mapa sigue encendido en el salpicadero mientras la app está abierta.'],
            [
              'Actualización automática',
              'El APK busca en GitHub una versión más nueva, con el tamaño, el progreso y un botón para cancelar.',
            ],
          ],
        },
      ],
    },
    'guitar-upscale': {
      tagline: 'Una guitarra que se toca en el navegador.',
      lede: 'Guitar Upscale muestra escalas y acordes en un mástil virtual, graba loops y los guarda como MIDI. Edita canciones nota a nota, las muestra como tablatura y se instala en la pantalla de inicio.',
      links: ['guitar-upscale.com'],
      groups: [
        {
          features: [
            ['Mástil', 'El mástil llena la pantalla, marca las notas de la escala y toca cada nota que pulsas.'],
            [
              'Escala, afinación y cejilla',
              'Un botón dice la tonalidad y el modo, y abre la elección de escala, afinación y cejilla.',
            ],
            ['Afinador', 'Escucha por el micrófono, con un dial que crece con la ventana.'],
            ['Acordes de la tonalidad', 'Un acorde por nota de la escala, como Em F#dim G Am Bm C D para mi menor.'],
            ['Rasgueo', 'Un acorde mantenido rasguea un patrón al ritmo del reloj. Los patrones se pueden editar.'],
            [
              'Lista de canciones',
              'Canciones incluidas y las tuyas. Las que encajan con la escala actual salen en verde.',
            ],
            ['Búsqueda por voz', 'Di el nombre de una canción. Las palabras llenan la búsqueda mientras hablas.'],
            ['Hey Guitar', '«Hey Guitar, play Metallica One». La app responde «Listening» y la toca.'],
            [
              'Grabación MIDI',
              'Graba las notas y acordes que tocas. Las notas que reproduce la app quedan fuera de la toma.',
            ],
            ['Looper', 'Loops cortos en varios canales suenan a la vez.'],
            ['Cuantización', 'Una duración de 1/1 a 1/64 fija la rejilla, la grabación y el looper, como en Cubase.'],
            [
              'Piano roll',
              'Dibuja, mueve, estira, copia y borra notas. La regla marca estrofa, estribillo, puente y solo.',
            ],
            [
              'Vista de tablatura',
              'Una pista como tablatura al estilo Guitar Pro, con un cursor que sigue la canción.',
            ],
            [
              'Hoja de acordes',
              'Nombres de acordes en compases que se iluminan con la canción. La letra se abre en Musixmatch.',
            ],
            ['Subir canciones', 'Los archivos Guitar Pro y MIDI se suman a tu lista.'],
            [
              'Buscar una canción en línea',
              'Busca en 4 sitios de canciones a la vez. Una canción de Songsterr se convierte en un archivo Guitar Pro.',
            ],
            ['Detección de acordes y escalas', 'Toca, y la app nombra el acorde o la escala que oye.'],
            ['Instrumentos', 'Instrumentos aparte para melodía y acordes: sitar, banjo, koto, cuerdas y más.'],
            [
              'Efectos',
              'Reverb y delay, cada uno con su interruptor y sus deslizadores. El sonido cambia mientras se mueve un deslizador.',
            ],
            ['Exportar MIDI', 'Los archivos se descargan, o salen por el menú de compartir.'],
            [
              'Planes de pago',
              'Iniciar sesión con Patreon o comprar en Google Play desbloquea las herramientas Explorer y Composer.',
            ],
            [
              'Instalación y sin conexión',
              'Una PWA que abre a pantalla completa en horizontal. El APK de Android se actualiza solo.',
            ],
          ],
        },
      ],
    },
    tickalot: {
      tagline: 'Listas de compras, de equipaje y de visitas que compartes por enlace.',
      lede: 'La otra persona abre el enlace y marca elementos, y cada marca aparece al instante en los dos teléfonos. No hace falta registrarse. Las listas se quedan en el teléfono, y una lista compartida también va a la nube.',
      links: ['tickalot.web.app'],
      groups: [
        {
          features: [
            [
              'Compartir por enlace',
              'Los dos teléfonos ven cada marca en vivo. Los cambios hechos sin conexión se sincronizan al volver la red.',
            ],
            [
              'Lista base',
              'Lo que sueles comprar. Unos toques la convierten en la lista de esta semana, con cantidades y notas.',
            ],
            [
              'Escribir o decir varios elementos',
              '«Cruasanes 2 paquetes de 3, huevos ecológicos» se convierte en 2 elementos con cantidades. Inglés y ruso.',
            ],
            ['Imágenes', 'La app elige un emoji según el nombre de cada elemento. Un toque añade una foto.'],
            [
              'Pasillos de la tienda',
              'Elige la tienda en OpenStreetMap y escribe un pasillo una vez. Después la lista sigue tu recorrido.',
            ],
            [
              'Pasillos compartidos',
              'Los pasillos que escribe un comprador aparecen para cada persona que elige la misma tienda.',
            ],
            [
              'Precios de Coles y Woolworths',
              'Un precio por unidad bajo cada elemento, con la tienda más barata en verde.',
            ],
            ['Equipaje para un viaje', 'Cada viaje empieza como copia de tu lista de equipaje habitual.'],
            ['Qué ver', 'Lugares de Wikipedia, repartidos por los días del viaje.'],
            ['Listas terminadas', 'Una lista acabada se recoge sola, sin limpiar a mano.'],
            ['Claro y oscuro', 'Sigue al teléfono, o una opción fija.'],
            ['Actualizaciones', 'El APK ofrece una versión más nueva con su tamaño y un aviso si usas datos móviles.'],
            [
              'Quitar anuncios',
              'Una compra única. Las personas en Europa ven el formulario de consentimiento antes de cualquier anuncio.',
            ],
          ],
        },
      ],
    },
    keeppad: {
      tagline: 'Notas de voz que empiezas diciendo «Hey Keep».',
      lede: 'Di «Hey Keep» y la app responde «Grabando». Escribe lo que dices a continuación y guarda la nota en el grupo correcto, con la app cerrada y la pantalla apagada.',
      links: ['keeppad.com'],
      groups: [
        {
          features: [
            [
              'Hey Keep',
              'Una palabra de activación que el teléfono escucha en segundo plano. «Эй, Кип» también funciona.',
            ],
            ['Parar y seguir', '«Para» termina la nota al instante. «Hey Keep, sigue» añade a la nota más reciente.'],
            ['Grabar con botón', 'Las palabras aparecen en pantalla mientras hablas.'],
            ['Grabaciones', 'En Android 13 y posteriores y en iPhone, una nota guarda su audio.'],
            [
              'Grupos',
              'Pendientes, Compras, Ideas, Trabajo y más. La IA del dispositivo elige el grupo en los teléfonos que la tienen.',
            ],
            [
              'Inglés y ruso',
              'Una nota usa uno de los idiomas o los dos. En Android 14 una nota puede cambiar de idioma en una pausa.',
            ],
            [
              'Compartir por enlace',
              'La otra persona abre la nota en la app o en un navegador, y ambos la editan en vivo.',
            ],
            ['Enviar a otras apps', 'Las notas nuevas van a Obsidian, Notion, Todoist, Google Docs u OneNote.'],
            ['Sitio web', 'Las notas compartidas se abren en un navegador, junto a las guías y las políticas.'],
            ['Actualización en la app', 'El APK encuentra una versión más nueva, la descarga y abre el instalador.'],
            ['Claro y oscuro', 'Sigue al teléfono, o una opción fija.'],
          ],
        },
      ],
    },
    servohop: {
      tagline: 'Precios del combustible en Australia en un mapa, con el historial de cada gasolinera.',
      lede: 'Servo Hop lee los datos de precios de cada estado y pone cada gasolinera en un mapa, coloreada según su precio. Guarda el historial diario y muestra también cargadores para coches eléctricos. Es gratis y no pide cuenta.',
      links: ['servohop.com'],
      groups: [
        {
          features: [
            [
              'Precios en el mapa',
              'Marcadores verdes para el tercio más barato, ámbar para el medio y rojos para el más caro.',
            ],
            [
              'Lista de gasolineras',
              'Las gasolineras a la vista, la más barata primero, con marca, barrio y cuándo cambió el precio.',
            ],
            ['Historial de precios', 'La media diaria sobre una franja del mínimo al máximo, para 30, 90 o 365 días.'],
            ['Avisos de conductores', 'Donde el estado no publica datos, los conductores envían el precio del cartel.'],
            [
              'Cargadores eléctricos',
              'Red, conectores y potencia máxima. Los conductores avisan del precio por kWh, y la app guarda su historial.',
            ],
            [
              'Páginas para buscadores',
              'Una página por estado, barrio y gasolinera, con datos estructurados y un sitemap.',
            ],
            [
              'Actualización automática',
              'El APK revisa GitHub al abrir y en cada regreso, y muestra la descarga en la cabecera.',
            ],
            ['Quitar anuncios', 'Una compra única en Google Play, que se restaura en un teléfono nuevo.'],
          ],
        },
      ],
    },
    consdr: {
      tagline: 'Leasing, préstamo o contado: lo que cuesta un coche en Australia.',
      lede: 'Consdr muestra el coste total del mismo coche en el mismo plazo como novated lease, préstamo de coche y compra al contado. Cada cifra fija del cálculo enlaza a su fuente.',
      links: ['consdr.com'],
      groups: [
        {
          features: [
            ['Tres opciones lado a lado', 'Leasing, préstamo y contado, cada uno como un total para todo el plazo.'],
            [
              'Adónde va el dinero',
              'Cada total se divide en coche, financiación, gastos de uso, impuestos e intereses perdidos.',
            ],
            [
              'Ajustes de leasing y préstamo',
              'Tipo, pago final, comisiones, combustible dentro del leasing y la exención de FBT.',
            ],
            [
              'FBT según el coche',
              'La regla para un eléctrico, un híbrido enchufable o uno de gasolina, según la fecha de inicio y el precio.',
            ],
            [
              'Impuesto de timbre por estado',
              'Los 8 estados y territorios, según el precio, el tipo de coche y la fecha de inicio.',
            ],
            [
              'Intereses de la cuenta',
              'El dinero crece cada mes en una cuenta offset de la hipoteca o en una cuenta de ahorro, para que la comparación sea justa.',
            ],
            ['Préstamo para vivienda', 'Cuánto menos prestaría un banco mientras se paga el coche.'],
            ['Cálculo y fuentes', 'Cada paso de la cuenta, con una fuente para cada cifra fija.'],
            [
              'Preguntas frecuentes',
              'Respuestas sobre leasing, la exención para eléctricos, pagos finales e hipotecas.',
            ],
            [
              'Guías',
              'Páginas sencillas sobre novated lease, FBT, pagos finales e impuesto de timbre, con cifras de las mismas reglas.',
            ],
            ['Datos guardados', 'Al recargar se mantienen tus campos. Restablecer los vacía.'],
            ['Sin conexión', 'La calculadora abre sin red después de la primera visita.'],
            ['Tema de color', 'Auto, claro u oscuro.'],
            ['Quitar anuncios', 'Una compra única en la app de Android.'],
          ],
        },
      ],
    },
    langflip: {
      tagline: 'Corrige palabras escritas con la distribución de teclado equivocada.',
      lede: 'Escribe ghbdtn con la distribución equivocada, y Langflip escribe «привет» en su lugar y cambia la distribución. Con el inglés funciona igual. Va sin conexión y no guarda registro de lo que escribes.',
      links: ['Descargar'],
      groups: [
        {
          features: [
            [
              'Corrección al escribir',
              'Desde la 4.ª letra, una palabra que solo tiene sentido en la otra distribución se vuelve a escribir en ella.',
            ],
            [
              'Palabras cortas',
              'Las palabras de menos de 4 letras cambian con Espacio, Intro o Tab, solo si la otra distribución da una palabra real.',
            ],
            ['Dígitos intactos', 'ьз3 se convierte en mp3.'],
            ['Deshacer una corrección', 'Pausa justo después de una corrección devuelve la palabra y la recuerda.'],
            ['Convertir a mano', 'Mayús+Pausa convierte la última palabra a la otra distribución.'],
            [
              'Omitir apps y campos',
              'Los campos de contraseña, las ventanas de administrador y cualquier app de los ajustes quedan intactos.',
            ],
            ['Distribución en el icono', 'La bandeja muestra EN sobre azul o RU sobre rojo para la ventana activa.'],
            ['Pausa con un clic', 'Un clic en el icono de la bandeja apaga la corrección, y el icono se vuelve gris.'],
            ['Cambiar con doble clic', 'Un doble clic en el icono cambia la distribución de la ventana activa.'],
            ['Inicio al entrar', 'Se activa en el primer arranque, con un interruptor en el menú de la bandeja.'],
            ['Archivo de ajustes', 'Apps excluidas y palabras que se mantienen, en un solo archivo TOML.'],
          ],
        },
      ],
    },
    'media-organizer': {
      tagline: 'Ordena fotos y vídeos en carpetas por fecha y lugar.',
      lede: 'Una app de escritorio que lee cuándo y dónde se tomó cada foto y la mueve a una carpeta de año, lugar y día. Comparte las reglas de carpetas de Memories, así el teléfono y el ordenador ordenan igual.',
      links: ['Instalar'],
      groups: [
        {
          features: [
            ['Escaneo', 'Lista cada archivo de la carpeta elegida mientras la recorre.'],
            ['Fechas de captura', 'Un ExifTool incluido lee la fecha, la cámara y el GPS de cada foto y vídeo.'],
            ['Lugares sin conexión', 'El GPS se convierte en una carpeta de lugar sin red.'],
            ['Primero el plan', 'La app muestra la nueva carpeta y el nombre de cada archivo antes de mover ninguno.'],
            ['Movimientos', 'Los archivos confirmados se mueven, con pausa, reanudación y limpieza.'],
            ['Historial, deshacer y rehacer', 'Cada pasada va a un registro y se repite en ambos sentidos.'],
            ['Ajustes', 'Carpeta de destino, solo renombrar, agrupar por lugar y la ubicación de casa.'],
            ['Tabla de archivos', 'Filas con estados, filtros, un mapa de lugares y una barra de estado.'],
            ['Actualización automática', 'Revisa al abrir y al volver, muestra la descarga y luego pide reiniciar.'],
            [
              'Instalación con un comando',
              'Una línea de PowerShell instala la última versión, sin permisos de administrador.',
            ],
          ],
        },
      ],
    },
    'agent-skills': {
      tagline: 'Skills que hacen que un agente de código trabaje como un estudio.',
      lede: 'Skills para agentes de código: escribir como una persona, planificar en una especificación, hacer un ticket, abrir una pull request y responder a su revisión. Otras auditan una app entera, o lanzan un sitio con búsqueda, anuncios y Google Play.',
      links: [],
      groups: [
        {
          features: [
            [
              'Escritura clara',
              'Reglas que quitan el tono de IA del chat, los commits, la documentación y los textos de la interfaz.',
            ],
            [
              'Primero la especificación',
              'Cada función empieza como una especificación en el repo, y el trabajo la sigue.',
            ],
            ['Del ticket al merge', 'Lee un ticket, lo construye en su propio worktree, abre la PR y mueve el ticket.'],
            ['Pull requests', 'Descripciones de PR cortas con diagramas de flujo, y un commit por hilo de revisión.'],
            ['Revisión de código', 'Una revisión con lista de control, con cada hallazgo comprobado en el código.'],
            [
              'Auditoría de la app',
              'Revisores en paralelo por enfoque, como seguridad y rendimiento. Los hallazgos seguros se corrigen.',
            ],
            ['Arquitectura y monorepos', 'Paquetes por capas, contratos de API compartidos y CI por app.'],
            [
              'Lanzamiento',
              'Configuración de búsqueda, AdMob y AdSense, lanzamiento en Google Play y un plan de marketing en una pasada.',
            ],
            [
              'Actualizaciones en la app',
              'Actualización automática para apps fuera de la tienda, excluida de la compilación de Play.',
            ],
            ['Cuidado del repo', 'Worktrees, traslados de repos, reinicio del historial y rotación de secretos.'],
            ['Nombres y dominios', 'Comprueba un nombre frente a dominios, el registro de empresas y las marcas.'],
            ['Voces', 'Reproduce cada voz de texto a voz, para que una persona elija una.'],
          ],
        },
      ],
    },
    'local-ci': {
      tagline: 'Un script prepara una máquina de desarrollo y la convierte en el runner de CI.',
      lede: 'local-ci da a un Mac o a un PC con Windows las mismas herramientas de desarrollo, y luego lo registra como runner autoalojado de GitHub Actions. La CI de los repos privados se ejecuta entonces en esa máquina, sin coste.',
      links: [],
      groups: [
        {
          features: [
            ['Preparar el Mac', 'Herramientas de Homebrew, mise, el shell y la configuración de git en una pasada.'],
            ['Preparar Windows', 'Las mismas herramientas con winget. Una segunda pasada salta lo que ya está.'],
            ['Runner autoalojado', 'La máquina ejecuta los trabajos de CI de los repos de la organización.'],
            ['Botón de inicio', 'Un doble clic arranca la última versión de la CI.'],
            ['Página de estado de CI', 'Una página local muestra el runner y los trabajos de un vistazo.'],
          ],
        },
      ],
    },
    ci: {
      tagline: 'Pasos compartidos de GitHub Actions para cada repo.',
      lede: 'Un arreglo aquí llega a cada repo en su siguiente ejecución.',
      links: [],
      groups: [
        {
          features: [
            [
              'Paso de preparación',
              'Instala las herramientas que un repo fija en mise, y luego sus paquetes desde el lockfile.',
            ],
            [
              'Detalles de Dependabot',
              'Guarda el tipo de actualización de cada PR de Dependabot para el trabajo de merge.',
            ],
            [
              'Merge automático',
              'Hace merge de una PR de Dependabot cuando pasa cada comprobación. Una actualización mayor espera a una persona.',
            ],
          ],
        },
      ],
    },
    'git-aliases': {
      tagline: 'Alias cortos de git, listos para cualquier máquina.',
      lede: 'Cada alias es un pequeño script en un solo repo, así los mismos comandos funcionan en cada máquina.',
      links: [],
      groups: [
        {
          features: [
            ['git a', 'Lista cada alias con lo que hace.'],
            ['git sb', 'Elige una rama con búsqueda difusa y entra en su worktree.'],
            ['git db', 'Elige ramas para borrar con búsqueda difusa.'],
            ['Instaladores seguros', 'Preguntan antes de cada cambio y hacen copia de cada archivo que editan.'],
            ['Hook de lint', 'Cada commit en el repo ejecuta el lint.'],
          ],
        },
      ],
    },
    'gh-review-notify': {
      tagline: 'Una notificación en el Mac por cada revisión de tus pull requests.',
      lede: 'GitHub envía las revisiones por correo, así que una aprobación puede esperar horas. Esta herramienta revisa cada 3 minutos y muestra una notificación. Un clic abre el comentario.',
      links: [],
      groups: [
        {
          features: [
            ['Revisiones y comentarios', 'Cada revisión y comentario en tus PR abiertas, en menos de 3 minutos.'],
            ['Peticiones de revisión', 'Una notificación cuando alguien te pide por tu nombre que revises.'],
            ['Ráfagas de comentarios', 'Más de 4 comentarios nuevos en una PR llegan como 1 notificación.'],
            ['Primera ejecución silenciosa', 'La primera ejecución guarda los últimos 3 días y no muestra ninguno.'],
            ['Filtro de bots', 'Los comentarios de bots quedan en silencio salvo que los actives.'],
            ['Estado y prueba', 'Una opción imprime el estado, otra envía una notificación de prueba.'],
          ],
        },
      ],
    },
    'open-in-remote-repo': {
      tagline: 'Una extensión de VS Code que abre un archivo en GitHub, GitLab o Bitbucket.',
      lede: 'Un fork de Open in GitHub de Stanislav Sysoev. Abre o copia el enlace al archivo, su blame o su historial, con las líneas seleccionadas marcadas.',
      links: ['Marketplace'],
      groups: [
        {
          features: [
            ['Archivo, blame e historial', 'Abre cada uno en el host remoto, con las líneas seleccionadas.'],
            ['Copiar un enlace', 'Los mismos enlaces van al portapapeles, con un aviso que muestra la URL.'],
            ['Desde el explorador', 'Un clic derecho en un archivo o carpeta abre o copia su enlace.'],
            ['Primero main o master', 'Los enlaces apuntan a una rama que ya tiene el archivo.'],
            ['Hosts y URL propias', 'GitHub, servidores de GitHub, GitLab, Bitbucket y Bitbucket Server.'],
          ],
        },
      ],
    },
    'memories-windows': {
      tagline: 'El primer Memories: una app en la bandeja con un servicio de sincronización en el NAS.',
      lede: 'Un servicio en Docker en el NAS leía la fecha de cada foto en una base de datos por día. La app de Windows esperaba en la bandeja y abría las fotos tomadas un día como hoy. La app del teléfono la sustituyó.',
      links: [],
      groups: [
        {
          features: [
            ['Bandeja', 'La app espera en la bandeja. Un clic abre la galería.'],
            ['Recordatorio diario', 'Una vez al día una notificación te llama a las fotos de ese día.'],
            ['Galería por periodo', 'Elige un día o un rango de años, y las fotos cargan al desplazarte.'],
            ['Ventana de foto', 'Una foto en grande, con la siguiente y la anterior a una tecla.'],
            ['Detalles y mapa', 'Los datos de la cámara y el lugar en un mapa.'],
            ['Enviar', 'Las fotos elegidas salen en una sola acción.'],
          ],
        },
      ],
    },
  },
};

export default es;

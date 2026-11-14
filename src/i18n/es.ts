import type { Catalog } from './types';

const es: Catalog = {
  ui: {
    meta: {
      title: 'Workbench Soft: apps para Android, la web, Windows y macOS',
      description:
        'Workbench Soft crea apps para Android, iPhone, la web, Windows y macOS. Aquí está cada proyecto con sus funciones, de Memories a Sky Altar y Workbench Games.',
      org: 'Un estudio de software que crea apps para Android, iPhone, la web, Windows y macOS.',
    },
    notFound: {
      title: 'Página no encontrada',
      home: 'Ir a la página de inicio',
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
      games: 'Juegos',
      gamesPanel: 'Sobre los juegos',
      sites: 'Sitios',
      clients: 'Nuestros clientes',
    },
    hero: {
      status: 'Abiertos a proyectos de clientes',
      lines: ['Diseñamos,', 'creamos y lanzamos', 'software.'],
      lead: 'Workbench Soft es un estudio independiente. Crea apps para Android, iPhone, la web, Windows y macOS, y lleva cada una desde la primera especificación hasta la tienda, los resultados de búsqueda y las actualizaciones posteriores.',
      start: 'Empezar un proyecto',
      work: 'Ver el trabajo',
      projects: 'Proyectos',
      features: 'Funciones lanzadas',
      code: 'Líneas de código',
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
      shot: 'Pantalla {n} de {name}',
      more: 'Ver los {n}',
      less: 'Ver menos',
      openSource: 'Código abierto',
      source: 'Código fuente',
      kinds: {
        app: 'Apps para personas',
        tool: 'Herramientas para desarrolladores',
        client: 'Desarrollo para clientes',
        internal: 'Herramientas internas del estudio',
        archive: 'Archivo',
      },
    },
    process: {
      title: 'De la primera especificación a la tienda',
      intro:
        'Cada proyecto de arriba pasó por los mismos pasos. Un proyecto de cliente también pasa por ellos, y el cliente ve cada uno.',
    },
    contact: {
      title: '¿Tienes una app en mente?',
      intro: 'Cuéntale al estudio qué construir: la idea, las plataformas y el plazo.',
      order: 'Encargar una app',
      message: 'Qué construir',
      placeholder: 'Una app para…, en Android y la web, para marzo.',
      email: 'Tu email, para la respuesta',
      name: 'Nombre, si quieres',
      send: 'Enviar el encargo',
      sending: 'Enviando…',
      sent: 'Gracias, el encargo llegó al estudio. La respuesta llegará a tu email.',
      failed: 'El encargo no se envió. Escribe a {email}.',
      or: '¿Prefieres tu propio correo? Escribe a {email}',
      copy: 'Copiar',
      copied: 'Copiada',
      subject: 'Un proyecto para Workbench Soft',
    },
    palette: {
      results: 'Resultados',
      empty: 'Sin resultados. Prueba con otra palabra.',
      project: 'Proyecto',
      feature: 'Función',
    },
    footer: { noAds: 'Este sitio no muestra anuncios.', releases: 'Versiones', privacy: 'Privacidad de Memories' },
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
              'Fotos',
              'Cada foto y vídeo, lo más nuevo primero, bajo un encabezado por día. El archivo lista cada año y mes con un recuento.',
            ],
            ['Filtrar por lugar', 'Cada día dice dónde fue. Una barra de filtros busca lugares y elige dispositivos.'],
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
              'Memories en el navegador',
              'El NAS sirve la app a los ordenadores del tailnet, con todas las fotos y el mismo orden y edición que en el móvil.',
            ],
            [
              'Organizar',
              'Tarjetas por pasos ordenan las fotos del teléfono, las mueven a carpetas por fecha en el NAS y liberan el teléfono.',
            ],
            [
              'Importar de Google Fotos',
              'Elige fotos en Google Fotos y la app las descarga en DCIM, desde donde suben al NAS.',
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
            ['Idioma', 'La app sigue el idioma del teléfono. Android 13 y posteriores lo fijan por app.'],
            ['Claro y oscuro', 'Sigue al teléfono, o una opción fija en Ajustes.'],
            [
              'Quitar anuncios',
              'Una compra única en Google Play oculta los anuncios en cada teléfono con la misma cuenta de Google.',
            ],
            [
              'Memories Pro',
              'Una compra de A$7.99 en Android abre las personas, los enlaces de álbum, los duplicados del NAS, Editar y Dibujar, y quita los anuncios.',
            ],
            [
              'Ordenador de escritorio',
              'La app de escritorio ordena una carpeta en las mismas carpetas de año, lugar y días que el teléfono.',
            ],
            ['Archivo', 'Cada año y mes con el número de fotos. Un toque abre el mes entero.'],
            [
              'Lista de viajes y mapa de lugares',
              'El archivo lista los viajes al extranjero y por carretera, y pone cada foto con GPS en un mapa, por año.',
            ],
            [
              'Personas',
              'El NAS agrupa las caras por persona, primero las que tienen nombre. Una persona desconocida se puede unir a una con nombre desde su ficha.',
            ],
            [
              'Página de progreso del índice',
              'Una página en el NAS muestra cuánto llevan la detección de caras y el indexador.',
            ],
            ['Álbumes de una persona', 'El álbum de un niño se abre como un cuaderno, un capítulo por año de edad.'],
            ['Girar una foto', 'Una foto de lado se endereza en el archivo del NAS.'],
            [
              'Editar una foto',
              'Memories y Shuttrix comparten recorte, giro, dibujo y subtítulos. En Android, Guardar reemplaza el JPEG, PNG o WebP; Guardar copia conserva el original. El navegador descarga una copia.',
            ],
            ['Dibujar una imagen', 'El pincel de Hoy abre una hoja en blanco con todas las herramientas.'],
            ['Fotos del teléfono', 'Las fotos del teléfono salen en cada cuadrícula, y Ordenar las sube al NAS.'],
            ['Ajustes', 'Una fila por sección con su valor: recordatorios, galería, NAS, casa.'],
            ['Duplicados en el NAS', 'Pares con la misma hora y tamaño, lado a lado, para quitar la copia.'],
            ['Actualizaciones', 'La versión fuera de la tienda encuentra, baja e instala su versión nueva.'],
            [
              'Luz, desenfoque y fuentes',
              'Exposición de −6 a +6 EV, matiz, sombras y luces. Desenfoque elíptico de fondo y efecto maqueta con zona nítida ajustable. Fuentes con remates, sin remates y monoespaciadas. No ofrece ajustes propios de la captura.',
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
            ['Idiomas', 'El mapa y la app Android en 9 idiomas.'],
            [
              'Páginas y anuncios',
              'Páginas Acerca de, Cómo, Tipos, Fuentes y Términos, una página por cámara, un banner bajo el mapa.',
            ],
          ],
        },
        {
          title: 'App para Android',
          features: [
            [
              'Indicador de velocidad',
              'La velocidad y el límite aparecen al ir en coche. La detección de tren y avión silencia los avisos de carretera. Las vías marcadas en mph usan millas por hora en pantalla y por voz.',
            ],
            [
              'Avisos de radar',
              'Un pitido unos 20 segundos antes, luego «Radar adelante. Límite 60». También llega a la pantalla de bloqueo y avisa de un radar al otro lado de la carretera.',
            ],
            [
              'Avisos siempre listos',
              'Los avisos siguen activos entre viajes y después de que Android reinicie la app.',
            ],
            ['Por encima del límite', '«Vas a 72. Reduce la velocidad». Solo cerca de radares, o en cualquier vía.'],
            ['Zonas escolares', 'El límite sigue el horario de la zona y los trimestres escolares de NSW.'],
            [
              'Avisos fuertes',
              'Volumen máximo por el altavoz del teléfono, también en silencio o con Bluetooth. Cada parte tiene su interruptor.',
            ],
            ['Voz del autor', 'Una voz Pro grabada con la voz del propio creador de la app.'],
            [
              'Registro de viajes',
              'Trayectos en coche y paseos se graban solos. Cada viaje separa los km en coche y los km a pie. Cada ruta muestra tu velocidad en cada radar, en verde o rojo. La velocidad se queda en tu teléfono.',
            ],
            [
              'Línea del viaje según el límite',
              'El color de la línea muestra tu velocidad frente al límite. Un toque muestra la velocidad, el límite y la calle.',
            ],
            [
              'Datos del viaje',
              'Velocidad media y máxima, la parte del viaje por encima del límite y por cuánto, los radares que pasaste rápido y el tiempo perdido en atascos. Un marcador en el mapa muestra cada atasco.',
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
            ['Hey Spot, ¿en qué calle estoy?', 'La app dice la calle y su límite.'],
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
      lede: 'Guitar Upscale muestra escalas y acordes en un mástil virtual, graba loops y los guarda como MIDI. Edita canciones nota a nota, las muestra como tablatura y se instala en la pantalla de inicio. En la pantalla táctil, desliza a la izquierda en el panel de acordes para ir al siguiente acorde, o a la derecha para volver al anterior. Durante la reproducción, un pequeño diagrama sobre cada acorde muestra una postura cómoda según la escala, la afinación, la cejilla y el número de cuerdas elegidos.',
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
              'Nombres de acordes en compases que se iluminan con la canción. Pega letra con acordes y se alinea con la canción.',
            ],
            [
              'Subir canciones',
              'Los archivos Guitar Pro y MIDI se suman a tu lista. Un MP3 encuentra su canción en línea, con los acordes.',
            ],
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
              'Guitar Upscale Pro',
              'Una compra en Google Play desbloquea la grabación, el looper, la carga y búsqueda de canciones y los diseños en Android, y quita los anuncios. En la web están abiertas todas las funciones.',
            ],
            [
              'Instalación y sin conexión',
              'Una PWA que abre a pantalla completa en horizontal. El APK de Android se actualiza solo.',
            ],
            [
              'App para iPhone',
              'La misma app en el iPhone, con compras en el App Store. Llega al App Store cuando exista una cuenta de Apple.',
            ],
            ['Distribución', 'El mástil ocupa toda la pantalla y los paneles flotan en sus esquinas.'],
            [
              'Panel de reproducción',
              'Toca lo cargado, avanza paso a paso, mezcla canciones y las guarda. El panel de acordes muestra un diagrama de digitación sobre cada acorde. Un enlace ?song=, u otra app como Lumiere Player, abre una canción.',
            ],
            ['Modos Easy y Pro', 'Easy toca solo los acordes de la canción para que un principiante rasguee.'],
            ['Enlaces de la canción', 'Un menú busca la canción abierta en sitios de acordes, tabs, vídeo y letras.'],
            ['Admin de canciones', 'El dueño añade y quita las canciones integradas en una página de admin.'],
            ['Ajustes', 'El engranaje abre un panel y cada valor sobrevive a la recarga.'],
            ['Actualizaciones Android', 'El APK de GitHub instala su versión nueva. Play actualiza la suya.'],
            ['Anuncios', 'Anuncios hasta comprar Remove ads. El teléfono del desarrollador abre sin ellos.'],
            ['Idiomas', 'Las pantallas siguen al teléfono o al navegador, y las lecciones están en 10 idiomas.'],
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
              'Anuncios',
              'Una compra única. Las personas en Europa ven el formulario de consentimiento antes de cualquier anuncio.',
            ],
            [
              'Tick-a-Lot Pro',
              'Una compra en Google Play desbloquea Equipaje, Qué ver, el orden de la tienda y los precios, y oculta los anuncios.',
            ],
            ['La compra semanal de dos', 'Uno prepara la lista y el otro la marca de camino a casa.'],
            ['Canciones por aprender', 'Una lista de canciones para la guitarra, las más deseadas primero.'],
            ['Cambiar y borrar', 'Cada campo se guarda solo, un toque marca y un borrado ofrece Deshacer.'],
            ['Idiomas', 'Una lista compartida se abre en el idioma del teléfono que la abre.'],
            ['Tick-a-Lot en la búsqueda', 'Guías y una página de inicio llevan de la búsqueda a la app.'],
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
              'Una palabra de activación que el teléfono escucha en segundo plano. «Эй, Кип» también funciona. Responde con Maisie, voz femenina, masculina o la del autor, y Ajustar a mi voz adapta la palabra de activación a ti.',
            ],
            [
              'Grabación larga',
              'Una nota de Hey Keep sigue pese a las pausas y la pantalla bloqueada hasta que tocas Detener. Una grabación que Android corta se guarda como nota.',
            ],
            ['Parar y seguir', '«Para» termina la nota al instante. «Hey Keep, sigue» añade a la nota más reciente.'],
            ['Grabar con botón', 'Las palabras aparecen en pantalla mientras hablas.'],
            ['Grabaciones', 'En Android 13 y posteriores y en iPhone, una nota guarda su audio.'],
            [
              'Grupos',
              'Pendientes, Compras, Ideas, Trabajo y más. La IA del dispositivo elige el grupo en los teléfonos que la tienen.',
            ],
            [
              'Idiomas',
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
            ['Anuncios', 'Un banner en la pantalla principal, tras el consentimiento en Europa.'],
            ['Quitar anuncios', 'Una compra única oculta el banner en cada teléfono de la cuenta.'],
            [
              'Sonido fuerte por el altavoz',
              'Las respuestas y grabaciones suenan por el altavoz del teléfono a todo volumen. Los ajustes activan Bluetooth o el volumen del teléfono.',
            ],
            [
              'Las notas sobre una persona van a Memories',
              'Una nota que empieza con el nombre de alguien de Memories va a su diario en el NAS de casa.',
            ],
            [
              'KeepPad Pro',
              'Una compra única abre los enlaces nuevos, el envío a otras apps y a Memories, y quita los anuncios.',
            ],
          ],
        },
      ],
    },
    servohop: {
      tagline: 'Precios del combustible en Australia en un mapa, con el historial de cada gasolinera.',
      lede: 'ServoHop lee los datos de precios de cada estado y pone cada gasolinera en un mapa, coloreada según su precio. Guarda el historial diario y muestra también cargadores para coches eléctricos. Es gratis y no pide cuenta.',
      links: ['servohop.com'],
      groups: [
        {
          features: [
            [
              'Precios en el mapa',
              'Marcadores verdes para el tercio más barato, amarillos para el medio y rojos para el más caro. Del precio más bajo salen ondas de colores como un terremoto.',
            ],
            ['Tu lugar en el mapa', 'Un punto azul te marca, con una flecha que gira con la brújula.'],
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
              'Textos y guías del sitio',
              'La portada explica el mapa con palabras, y las guías explican los precios, el sistema de cada estado, los tipos de gasolina y la carga eléctrica.',
            ],
            [
              'Actualización automática',
              'El APK revisa GitHub al abrir y en cada regreso, y muestra la descarga en la cabecera.',
            ],
            ['Quitar anuncios', 'Una compra única en Google Play, que se restaura en un teléfono nuevo.'],
            ['ServoHop Pro', 'Una compra oculta los anuncios y abre el gráfico de precios de 365 días.'],
            [
              'Búsqueda de zona',
              'Busca un barrio o un código postal y el mapa vuela allí. Cada fila muestra la distancia, ordenada por precio, distancia o potencia.',
            ],
            [
              'Hey Servo',
              'Di «Hey Servo, go to the nearest charger» y Google Maps inicia la navegación. Solo Android.',
            ],
            ['Panel de combustible', 'Elige gasolina, diésel, gas o cargadores, AC lento o DC rápido.'],
            ['Anuncios', 'Un banner bajo la lista: AdMob en la app, AdSense en la web.'],
            ['Idiomas', 'Las pantallas vienen en 9 idiomas y siguen al teléfono o al navegador.'],
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
            ['Qué plazo de leasing cuesta menos', 'El mismo coche de 1 a 5 años, con el plazo más barato marcado.'],
            [
              'Si deja su trabajo',
              'Una fecha de salida muestra el importe de cancelación y cuatro salidas del leasing, cada una con lo que paga de su bolsillo y la pérdida.',
            ],
            ['Idioma', 'La calculadora en 9 idiomas, con importes en dólares australianos.'],
            ['Anuncios', 'Bloques de AdSense en la web y un banner de AdMob en la app Android.'],
            [
              'Sin anuncios en el teléfono del desarrollador',
              'Cada versión oculta el banner en un teléfono con la clave del desarrollador.',
            ],
          ],
        },
      ],
    },
    games: {
      tagline: 'Juegos de fiesta en el navegador: dibuja, adivina y da pistas.',
      lede: 'Workbench Games son tres juegos de fiesta para amigos. Una persona crea una sala y envía el enlace, y los demás entran desde el navegador, sin cuenta.',
      links: ['Todos los juegos', 'Adivina el dibujo', 'Teléfono dibujado', 'Duelo de pistas'],
      groups: [
        {
          features: [
            ['Salas por enlace', 'Un enlace reúne de 2 a 12 amigos en la misma sala.'],
            [
              'Modo niños',
              'También juega un niño que no sabe leer: toca un animal para entrar, toca una imagen para adivinar, escucha cada palabra en voz alta.',
            ],
            ['Adivina el dibujo', 'Dibuja una palabra, adivina los dibujos de los demás, suma puntos.'],
            ['Teléfono dibujado', 'Una frase se convierte en dibujos y vuelve, y el álbum muestra cómo cambió.'],
            ['Duelo de pistas', 'Un juego de palabras por equipos donde cada pista es pública y robar da puntos.'],
            [
              'Herramientas de dibujo',
              'Lápiz, goma, relleno, línea, rectángulo, círculo, 20 colores, 4 tamaños y deshacer, con colores grandes para dedos pequeños.',
            ],
            ['Idiomas', 'Las páginas y las salas funcionan en inglés y en ruso.'],
            ['Anuncios', 'Los juegos siguen gratis, con un banner en las páginas, la sala y los resultados.'],
            ['Apps para Android e iOS', 'Los mismos juegos como app instalada.'],
            [
              'Aspecto de fiesta',
              'Brillo de fiesta nocturna, o pasteles de caramelo en modo claro, con un color para cada juego.',
            ],
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
            ['Seguir una palabra', 'Las letras añadidas cuentan como el resto de la palabra, en su idioma.'],
            ['El icono', 'Una А y una Я azul marino sobre una tarjeta holográfica, en el exe, los accesos y Ajustes.'],
            ['Instalar en Windows', 'Un doble clic en Langflip.cmd lo compila e instala para el usuario.'],
            ['Menú de la bandeja', 'Un clic derecho en el icono abre el menú.'],
            ['Registro de decisiones', 'Un archivo de registro dice qué decidió Langflip para cada palabra y por qué.'],
            ['Actualización desde GitHub', 'Busca una versión nueva una vez al día y se actualiza con un clic.'],
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
            ['Estilo de escritura', 'Texto simple y corto en cada respuesta, commit y documento, sin tono de IA.'],
            ['Revisión de código', 'Una revisión con lista de control, con cada hallazgo comprobado en el código.'],
            [
              'Enfoques de revisión',
              'Un subagente por enfoque, como seguridad o rendimiento. Solo vuelven los hallazgos probados.',
            ],
            ['Pull requests', 'Descripciones de PR cortas con diagramas de flujo, y un commit por hilo de revisión.'],
            ['Comentarios de revisión', 'Cada hilo de revisión recibe un commit y una respuesta con su SHA.'],
            ['Del ticket al merge', 'Lee un ticket, lo construye en su propio worktree, abre la PR y mueve el ticket.'],
            [
              'Auditoría de la app',
              'Revisores en paralelo por enfoque, como seguridad y rendimiento. Los hallazgos seguros se corrigen.',
            ],
            [
              'Primero la especificación',
              'Cada función empieza como una especificación en el repo, y el trabajo la sigue.',
            ],
            ['Una página', 'Primero el texto completo, luego un resumen de una pantalla arriba.'],
            ['Comandos con mise', 'Cada comando pasa por mise, con las versiones que fija el repo.'],
            ['Traducciones', 'Cada texto sale en todos los idiomas de la app, en el mismo cambio.'],
            ['Worktrees', 'Cada cambio tiene su propia copia de trabajo, que se limpia tras el merge.'],
            [
              'JavaScript rápido',
              'Menos viajes de ida y vuelta y un bundle más pequeño, con la regla y el coste de cada hallazgo.',
            ],
            ['Arquitectura', 'La forma en capas más pequeña para la app, con sus reglas aplicadas en CI.'],
            ['Monorepos', 'Apps y paquetes en un solo repo, con herramientas fijadas y un único esquema de API.'],
            [
              'Reinicio del historial',
              'Comprime el historial en un commit inicial nuevo y guarda un bundle como copia.',
            ],
            ['Reescribir un repo', 'Nombres, carpetas y docs nuevos, con el mismo comportamiento.'],
            [
              'Ayuda en un sitio',
              'Abre cada pantalla en su Chrome, rellena los campos conocidos y se detiene en el inicio de sesión o el pago.',
            ],
            [
              'Ejecuciones colgadas',
              'Encuentra la herramienta que bloquea un puerto o un archivo, la cierra y repite el paso.',
            ],
            ['Configurar la búsqueda', 'Search Console, Bing, un mapa del sitio y analítica para una web.'],
            [
              'Anuncios',
              'AdSense y AdMob, con anuncios de prueba en los builds de depuración y el aviso de consentimiento.',
            ],
            [
              'Publicar en Google Play',
              'Un bundle firmado con un nuevo código de versión, publicado en pruebas internas.',
            ],
            ['Lanzamiento de una vez', 'Búsqueda, anuncios y publicación en Google Play, en ese orden.'],
            [
              'Marketing',
              'Primeros usuarios según un presupuesto: el mensaje, un calendario de lanzamiento y las publicaciones.',
            ],
            [
              'Actualizaciones en la app',
              'Actualización automática para apps fuera de la tienda, excluida de la compilación de Play.',
            ],
            ['Nombres y dominios', 'Comprueba un nombre frente a dominios, el registro de empresas y las marcas.'],
            [
              'Riesgos legales',
              'Revisa licencias, SDK de datos y normas de las tiendas, y arregla los hallazgos seguros.',
            ],
            ['Iconos de app', '10 iconos en estilos que encajan, un selector en el chat y luego cada tamaño.'],
            ['Capturas de demo', 'Datos de demo, capturas y vídeos cortos para el README.'],
            ['Medios de tienda', 'Las mismas capturas, vídeo e icono en Google Play, la web y los instaladores.'],
            [
              'Recorrido completo de una versión',
              'Instala la última versión, recorre cada flujo principal e informa por flujo.',
            ],
            ['Voces', 'Reproduce cada voz de texto a voz, para que una persona elija una.'],
            [
              'Comentarios en Reddit',
              'Encuentra hilos que el repo puede responder, redacta una respuesta y la escribe en Chrome. La persona pulsa Comentar.',
            ],
            ['Voz al final del turno', 'Una frase corta en voz alta dice que el agente terminó, espera o pregunta.'],
            ['Instalación', 'Un clon enlazado a cada agente de la máquina. Un cambio llega a todos.'],
            [
              'Hooks del agente',
              'La hora en cada mensaje, bloqueos del navegador integrado y del archivado, y los servidores MCP copiados a Codex y Kimi.',
            ],
            ['Versiones', 'Cada push a main que pasa las comprobaciones recibe una versión con fecha y notas.'],
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
            [
              'Página de estado de CI',
              'Una página local muestra el runner y los trabajos de un vistazo, con una barra de progreso por release y el motivo de cada cancelación.',
            ],
            [
              'Cancelación de builds',
              'El servidor de la página detiene una ejecución reemplazada y un release cuyos Checks fallaron. El registro nombra cada causa.',
            ],
            [
              'Primero runners en la nube',
              'Los trabajos van en runners gratis en la nube mientras duran los minutos, luego en este PC.',
            ],
            [
              'Releases',
              'Lanza el release de una app en CI, construye APK de Android desde el último main e instálalos en un teléfono conectado. Install Dev además desbloquea sus ajustes de desarrollador. Una limpieza borra, tras confirmar, artefactos viejos de Actions y releases de APK.',
            ],
            ['Se actualiza solo', 'El PC instala cada versión minutos después del merge.'],
            [
              'Sitios',
              'Deploy site inicia el workflow de despliegue de cada repo de la organización con sitio, en main. La página encuentra el workflow sola.',
            ],
            [
              'Tendencias de CI',
              'Gráficos de ejecuciones por día según el resultado, el tiempo de build, la espera de un runner y los pasos que más fallan. Gratis, desde la API de GitHub.',
            ],
          ],
        },
      ],
    },
    'alina-photo': {
      tagline: 'Portafolio y reservas para una fotógrafa familiar en Sídney.',
      lede: 'Un sitio para Alina, fotógrafa de familias y embarazo. Los clientes ven sus galerías, reservan una sesión en exteriores a una hora libre y reciben sus fotos por un enlace privado.',
      links: [],
      groups: [
        {
          features: [
            ['Portafolio', 'Galerías por tipo de sesión con vista a pantalla completa y deslizamiento.'],
            ['Reservas', 'Elegir una sesión, un día y una hora libre. Las horas doradas llevan un sol.'],
            ['Preguntas', 'Un formulario breve para quien aún no quiere reservar, con respuesta por correo.'],
            [
              'Administración',
              'Acceso con enlace por correo, subir y editar fotos, confirmar reservas, horarios y paquetes.',
            ],
            [
              'Sincronización del calendario',
              'Las horas ocupadas en Google Calendar bloquean reservas, y un feed muestra cada reserva.',
            ],
            [
              'Fuentes',
              'Alina elige las fuentes de títulos, texto y etiquetas entre 10 fuentes libres, o sube las suyas.',
            ],
            [
              'Galerías de clientes',
              'Un enlace privado con pruebas con marca de agua y luego todos los originales en un ZIP.',
            ],
          ],
        },
      ],
    },
    aspirationstyle: {
      tagline: 'Sitio de portafolio y pedidos para una diseñadora de interiores.',
      lede: 'El sitio de Maria Shilova, diseñadora de interiores. Los visitantes ven sus interiores y piden un diseño, y Maria gestiona las galerías y dibuja interiores con IA en su propio panel.',
      links: ['aspirationstyle.ru'],
      groups: [
        {
          features: [
            [
              'Portafolio',
              'Galerías de interiores, objetos, materiales y decoración, con filtro y vista a pantalla completa.',
            ],
            [
              'Pedir un diseño',
              'Un formulario en la portada, cada galería y Contacto envía la solicitud a Maria por correo.',
            ],
            ['Panel', 'Maria entra con un código que recibe por correo y añade galerías, fotos y textos.'],
            ['Fuentes', 'Elige la fuente de títulos y de texto entre 10 fuentes libres con cirílico, o sube la suya.'],
            [
              'Generador con IA',
              'Dibuja un interior a partir de una petición en ruso, un estilo y una foto de la habitación.',
            ],
          ],
        },
      ],
    },
    'app-updater': {
      tagline: 'Actualiza cada app de Workbench Soft del teléfono con un toque.',
      lede: 'Una app de Android lista cada app de Workbench Soft con su versión instalada y la más reciente, y luego instala cada versión nueva con Shizuku sin avisos.',
      links: [],
      groups: [
        {
          features: [
            [
              'Actualizar todo',
              'Un toque actualiza en silencio cada app de Workbench Soft instalada mediante Shizuku, con una barra por app. Cancelar lo detiene.',
            ],
            [
              'Autoactualización',
              'WBS Updater publica sus propias versiones, se instala al final de cada pasada y el teléfono vuelve a abrirlo con la versión nueva.',
            ],
            [
              'Actualizar una app',
              'Un botón Actualizar en cada tarjeta lleva solo esa app a su último release. Una tarjeta que falló conserva el botón para reintentar.',
            ],
            [
              'Instalar una app que falta',
              'Una app publicada que aún no está en el teléfono se instala desde su tarjeta.',
            ],
            [
              'Lista de apps',
              'Una tarjeta por APK publicado, cotejado con las apps instaladas, actualizaciones primero. Un proyecto del estudio sin APK recibe un enlace Abrir.',
            ],
            ['Lista guardada sin conexión', 'La última lista de releases aparece cuando GitHub no responde.'],
            ['Configurar Shizuku', 'Abre Google Play o Shizuku en cada paso que falta y luego lanza la actualización.'],
            ['Notas de versión', 'Cada tarjeta muestra las notas de versión o los commits desde el último release.'],
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
            ['Versiones', 'Cada push a main que pasa las comprobaciones recibe una versión con fecha y notas.'],
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
            ['Volver a la rama principal', 'git m trae y hace un reset duro a la rama principal del remoto.'],
            ['Versiones', 'Cada push a main que pasa las comprobaciones recibe una versión con fecha y notas.'],
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
            ['Versiones', 'Cada push a main que pasa las comprobaciones recibe una versión con fecha y notas.'],
          ],
        },
      ],
    },
    'site-sources': {
      tagline: 'Una extensión de Chrome que guarda las fuentes de cualquier página en un solo zip.',
      lede: 'Pulsa Descargar en su ventana y mira cómo se llena la barra. La página, cada archivo que cargó y el código original de sus source maps van a un zip en Descargas.',
      links: [],
      groups: [
        {
          features: [
            [
              'Descargar desde la ventana',
              'El icono abre una ventana con el sitio y un botón Descargar. Sigue trabajando al cerrarla.',
            ],
            [
              'Barra de progreso',
              'Cuenta los archivos que encuentra y luego se llena con 12 de 40 descargados y los que fallaron.',
            ],
            ['Un solo zip', 'El HTML en vivo y cada script, estilo, imagen y fuente, ordenados como en el servidor.'],
            ['Fuentes originales', 'Cada source map con código devuelve los archivos .ts, .tsx o .vue.'],
            ['Idiomas', 'La ventana sigue el idioma de Chrome.'],
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
            ['Idiomas', 'Comandos, ajustes y mensajes siguen el idioma de VS Code.'],
          ],
        },
      ],
    },
    archon: {
      tagline: 'El lanzador del estudio que reparte el trabajo entre agentes de código.',
      lede: 'Archon reúne toda la carpeta de trabajo en una ventana. Abre cada app en el teléfono o el PC, da tareas a Claude Code en una consola por repo y muestra lo que corre ahora mismo.',
      links: [],
      groups: [
        {
          title: 'En cada página',
          features: [
            ['Pregunta a Archon', 'Una orden dicha o escrita elige la herramienta y abre su pestaña.'],
            ['Barra de tareas', 'Cada tarea en curso, con el tiempo pasado y el que falta.'],
          ],
        },
        {
          title: 'Cada día',
          features: [
            ['Apps', 'Instalar, actualizar y abrir cada app en el teléfono, la TV o el PC.'],
            [
              'Anuncios en este teléfono',
              'Oculta los anuncios o muestra anuncios de prueba, en todas las apps o en una.',
            ],
            ['Pendientes', 'Los puntos abiertos de cada TODO.md van a un agente con un clic.'],
            ['Sesiones', 'Las sesiones de agente que pararon antes de tiempo siguen con una marca.'],
          ],
        },
        {
          title: 'Repos',
          features: [
            ['Agentes', 'Marca repos, elige una tarea como una auditoría y cada uno recibe una consola.'],
            ['Docs', 'El README, docs y specs de cada repo, con los diagramas dibujados.'],
            ['Reglas', 'Las reglas que lee cada agente y lo que le falta a cada repo.'],
            ['Ramas', 'Cada rama y worktree, para conservar, fusionar o borrar.'],
            ['Paquetes', 'Cada paquete con su versión más nueva, actualizado por un agente.'],
          ],
        },
        {
          title: 'Servicios',
          features: [
            ['CI, Reddit y Memories', 'Las páginas de la CI, Reddit Desk y el indexador del NAS en pestañas.'],
            [
              'Canciones',
              'La cadena de songfactory en bloques: actívalos o desactívalos, ajústalos, ejecuta uno solo o crea un vídeo entero a partir de un tema.',
            ],
          ],
        },
        {
          title: 'Ajustes',
          features: [
            ['Voces', 'Elige la voz con la que habla cada agente.'],
            ['Claves', 'La edad de cada secreto de CI y su renovación con un agente.'],
          ],
        },
        {
          title: 'El PC',
          features: [
            ['Archon en el móvil', 'Archon en la tailnet, abierto en el móvil como una app.'],
            [
              'Restaurar un PC',
              'Un script recupera los clones, las reglas, los hooks y las herramientas en un PC nuevo.',
            ],
            [
              'Mover el espacio de trabajo',
              'Mueve cada clon a una carpeta nueva y corrige cada sitio que nombra la anterior.',
            ],
            ['Sincronizar los repos', 'Clona los repos que faltan y actualiza el resto, 8 a la vez.'],
          ],
        },
      ],
    },
    'agent-skills-private': {
      tagline: 'Las reglas y skills de la organización sobre Agent Skills.',
      lede: 'Los skills ligados a la organización workbench-soft. Mueven repos, configuran la CI, renuevan secretos y hacen que cada sesión de agente planifique, publique e informe igual.',
      links: [],
      groups: [
        {
          features: [
            ['Mover un repo', 'Mueve un repo a la organización y lo hace privado, con la CI aún gratis.'],
            [
              'CI y releases para cada repo',
              'Revisa que cada repo tenga Checks y Release, y añade los que faltan. Un release se construye junto a Checks y se publica cuando pasan.',
            ],
            ['Renovar secretos', 'Renueva los secretos de CI y las claves, app por app.'],
            ['Reglas de trabajo', 'Primero una spec, fusión enseguida, prueba en lote después.'],
            [
              'Pasarela MCP',
              'Un servidor pasarela sustituye a los de Google Play, GitHub, AdMob, AdSense y Reddit, y una sesión ve 7 herramientas en lugar de 238.',
            ],
            ['Releases', 'Una release con fecha por cada push verde a main.'],
            [
              'Cola de funciones',
              'Las sesiones de una app se turnan en los archivos compartidos y sale una sola versión.',
            ],
          ],
        },
      ],
    },
    'memories-demo-webdav': {
      tagline: 'Un NAS de ejemplo con fotos para la revisión de Google Play.',
      lede: 'Un servidor WebDAV con fotos de ejemplo, para que un revisor de Google Play entre en Memories sin un NAS propio. Corre como Cloudflare Worker en el plan gratuito.',
      links: [],
      groups: [
        {
          features: [
            ['Biblioteca de ejemplo', '42 fotos y 2 vídeos de 2015 a 2025, algunos con marcas en el mapa.'],
            ['Inicio de sesión', 'Un usuario de revisor, como lo pide un NAS real.'],
            ['Subidas y orden', 'Subir y mover funciona, y una tarea nocturna lo limpia.'],
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
    shuttrix: {
      tagline: 'Una cámara con los diales de una réflex y un modo simple de grandes deslizadores.',
      lede: 'Shuttrix es una cámara Android con 2 modos. El modo simple tiene grandes deslizadores con Noche, Retrato, Exposición larga y Panorama, y Pro pone objetivo, enfoque, balance de blancos, ISO y obturador en diales.',
      links: [],
      groups: [
        {
          features: [
            ['Simple y Pro', 'Un interruptor de cristal arriba elige el modo. Una instalación nueva abre en simple.'],
            [
              'Modo simple',
              'Botones de objetivo sobre un deslizador de zoom, luego Luz, Calidez y Color. Los modos van arriba, y el disparador queda solo bajo el pulgar.',
            ],
            ['Noche', 'El teléfono crea la foto con varios fotogramas mientras avanza una barra.'],
            [
              'Astro',
              'El cielo nocturno a pulso: estrellas nítidas, la Vía Láctea y un cielo oscuro en vez de gris o naranja.',
            ],
            ['Luna', 'Zoom a 10x y exposición para la Luna: se ven sus mares y cráteres, no una mancha blanca.'],
            ['Exposición larga', 'Difumina lo que se mueve: agua sedosa, estelas de luz, una multitud que se borra.'],
            [
              'Retrato',
              'Lo que tocas queda nítido, cerca o a 10 m, persona u objeto. El resto se suaviza y un deslizador ajusta el desenfoque.',
            ],
            ['Mini', 'Un efecto maqueta tilt shift en fotos y vídeos, con el desenfoque ya en la vista previa.'],
            [
              'Macro',
              'Un insecto o una gota a 2 o 3 cm, tan grande como lo permite el teléfono, con el ancho del encuadre en mm.',
            ],
            ['Panorama', 'Una foto ancha de un giro lento, unida en el teléfono.'],
            ['Cámara lenta', 'Un vídeo a 120 o 240 fotogramas por segundo que se reproduce ralentizado.'],
            [
              'Time-lapse',
              'Un fotograma cada medio segundo, reproducido 15 veces más rápido: nubes, atardeceres, multitudes.',
            ],
            [
              'Objetivos',
              'Un botón por cada objetivo del teléfono sobre una escala de zoom. En el selfie, el zoom se ajusta a las personas del encuadre.',
            ],
            [
              'Enfoque',
              'AF-C sigue un sujeto en movimiento y las caras. Un toque enfoca un punto, y la retícula se arrastra.',
            ],
            ['Balance de blancos', 'Auto, preajustes o kelvin en un dial.'],
            [
              'Exposición',
              'ISO y exposición automáticos o manuales. Luz y EV usan todo el rango de compensación de la cámara. Auto oscurece más las escenas oscuras.',
            ],
            [
              'Ajuste automático',
              'Un botón en el modo simple, o un toque en la vista, ajusta Luz, Calidez y Color a la escena.',
            ],
            ['Color', 'Una sola saturación para el dial COLOR y el deslizador Color.'],
            [
              'Foto, vídeo y flash',
              'Foto dispara al tocar sin espera adicional de enfoque ni ráfaga posterior. Flash, RAW y el modo alternativo del hardware pueden capturar más tarde. Mantener graba vídeo.',
            ],
            ['Lugar y cámara', 'Cada toma guarda dónde y cómo se hizo, en etiquetas EXIF.'],
            ['Tamaño de foto y vídeo', 'Los ajustes eligen el tamaño de foto y vídeo.'],
            [
              'Formato de foto y originales',
              'WebP, JPEG, PNG o RAW + JPEG, y si quieres el original de la cámara y una copia solo con Color.',
            ],
            [
              'Foto multifotograma',
              'Una foto normal une 6 fotogramas rápidos en uno, con la mitad de ruido y bordes más nítidos.',
            ],
            [
              'Mejorar fotos',
              'Enhance refuerza color, nitidez y sombras. Al desactivarlo, las cámaras normales compatibles usan una curva sRGB fija. Noche y las demás cámaras conservan su procesamiento.',
            ],
            [
              'Foto raw (beta)',
              'Crea la foto con los fotogramas en bruto del sensor hasta la pulsación, con menos ruido y más detalle. Desactivado por defecto.',
            ],
            ['Códigos QR', 'Un código en la vista previa recibe un marco y un botón para abrirlo.'],
            [
              'Reloj',
              'La hora arriba a la izquierda, donde suele estar el reloj del teléfono, lejos de los controles.',
            ],
            [
              'Galería',
              'Compartir juntas las fotos y vídeos seleccionados. La miniatura de la cámara se actualiza tras borrar en la galería.',
            ],
            [
              'Plus',
              'Una compra abre Astro, Luna, Larga exposición, Macro, Mini, Cámara lenta y Timelapse, y oculta los anuncios.',
            ],
            ['Anuncios', 'Un banner bajo la cuadrícula de la galería. Una compra única lo quita.'],
            [
              'Editar fotos',
              'El editor compartido de Memories y Shuttrix recorta, gira, dibuja y añade textos. Guardar reemplaza el archivo y Guardar copia escribe un JPEG nuevo.',
            ],
            [
              'Inicio rápido',
              'Dos pulsaciones del botón de encendido abren Shuttrix, también sobre la pantalla bloqueada.',
            ],
            ['Actualizaciones', 'Un build fuera de una tienda recibe su nueva versión desde GitHub.'],
            ['Idiomas', 'En 9 idiomas, según el teléfono o el navegador.'],
            [
              'Luz, desenfoque y fuentes',
              'Exposición de −6 a +6 EV, matiz, sombras y luces. Desenfoque elíptico de fondo y efecto maqueta con zona nítida ajustable. Fuentes con remates, sin remates y monoespaciadas. No ofrece ajustes propios de la captura.',
            ],
          ],
        },
      ],
    },
    farnear: {
      tagline: 'Videollamadas entre países, con una pizarra para compartir imágenes y vídeos.',
      lede: 'Farnear conecta a la familia mediante un enlace, sin cuenta. Quien crea la sala entra al momento; las visitas eligen sus dispositivos.',
      links: ['farnear.workbench-soft.com'],
      groups: [
        {
          features: [
            [
              'Llamadas por enlace',
              'Un enlace es la sala. Quien la crea entra al momento. Las visitas eligen micrófono, cámara y altavoz.',
            ],
            ['Recuperar una llamada caída', 'Una llamada caída reintenta 3 veces y luego ofrece Reintentar.'],
            [
              'Volver a la llamada',
              '¿Cambiaste de aplicación? El enlace vuelve a conectar sin botón, y el inicio muestra «Volver a la llamada».',
            ],
            ['Relé para redes bloqueadas', 'Cloudflare TURN entra cuando falla la ruta directa entre las redes.'],
            [
              'Compartir el enlace de la llamada',
              'Copia el enlace o envíalo por Gmail, correo, WhatsApp, Telegram u otra app.',
            ],
            ['Salas guardadas', 'Un enlace guardado con un nombre, como Mamá. El mismo enlace sirve siempre.'],
            [
              'Pizarra',
              'Todos dibujan con bolígrafo, rotulador o láser que se desvanece. Al arrastrar se dibuja una línea, una flecha, un rectángulo o un círculo. También pueden borrar y deshacer sus trazos.',
            ],
            [
              'Compartir una imagen o un vídeo',
              'Una persona carga una imagen o un vídeo de hasta 100 MB. Los demás lo ven y dibujan encima.',
            ],
            ['Clases (previstas)', 'Las salas de clase con diapositivas, dibujo y temporizador están previstas.'],
            [
              'Contactos y timbre',
              'Un toque en una persona hace sonar su teléfono, con Responder y Rechazar. Sin registro. Un mensaje de texto llega como notificación.',
            ],
            [
              'Anuncios y quitarlos',
              'Anuncios alrededor de la llamada, ninguno durante ella. Una compra de A$2.99 los quita en las salas del comprador.',
            ],
            [
              'Farnear Pro',
              'Una compra de A$5.99 en Android abre la pizarra compartida y sus archivos para la sala, y quita los anuncios.',
            ],
            [
              'App de Android',
              'La app web dentro de un contenedor Android, con releases APK y AAB firmados y versiones con fecha.',
            ],
            [
              'App para iPhone',
              'La misma app en el iPhone, con compras por la App Store y el menú Compartir del iPhone. Llegará a la App Store cuando exista una cuenta de Apple.',
            ],
            ['Idiomas', 'En 9 idiomas, según el teléfono o el navegador.'],
            ['Icono de la app', 'Un portal telefónico de neón, en Android y en la web.'],
            [
              'Escenario de la llamada',
              'La llamada llena la ventana. Un mosaico es grande y los demás van en una tira. Un toque fija un mosaico en grande. En los detalles de dispositivos de otro participante se puede cambiar su micrófono o su cámara.',
            ],
            [
              'Compartir pantalla',
              'Una persona comparte una pantalla, una ventana o una pestaña. Los demás la ven en grande y dibujan encima.',
            ],
            [
              'Hacer una foto',
              'Guarda la llamada con la pizarra y la pantalla compartida como PNG en Descargas. La imagen se queda en el dispositivo.',
            ],
            ['Tu nombre', 'El nombre que los demás ven en tu mosaico. Cámbialo en la página de inicio o en Ajustes.'],
            ['Fondo de vídeo', 'Desenfoca la habitación detrás de ti, o pon una escena dibujada o tu propia imagen.'],
            [
              'Transcripción y resumen',
              'Un dispositivo escribe lo que dice cada persona. El texto se queda con la llamada guardada, con un resumen por llamada.',
            ],

            [
              'Recuperar medios bloqueados',
              'El audio y el vídeo entrantes se comprueban por separado. Si se bloquean, la conexión se recupera sin recargar y con intentos limitados.',
            ],
            [
              'Nombres compartidos de llamadas',
              'El nombre de la sala se sincroniza entre participantes y se guarda con el enlace.',
            ],
            [
              'Documentos compartidos en la pizarra',
              'Comparte PDF o diapositivas PowerPoint, cambia de página con los demás y retira el archivo sin borrar los dibujos.',
            ],
            [
              'Contactos y salas',
              'El inicio lista contactos y salas. Un contacto es una persona, una sala es un enlace que abren varias personas.',
            ],
            [
              'Búsqueda y vista previa del enlace',
              'Los buscadores leen el inicio en 9 idiomas. Un enlace compartido muestra el icono y el nombre de Farnear.',
            ],
            ['Mensajes en la llamada', 'Un botón Mensajes envía líneas cortas que llegan aunque el vídeo no conecte.'],
            [
              'Pistas en los botones',
              'Cada botón con icono muestra su nombre al pasar el ratón o con una pulsación larga.',
            ],
            [
              'Cerrar Farnear y retirar sus permisos',
              'Un botón de apagado termina la llamada y el timbre. Desde Android 13, la app también retira sus permisos de cámara, micrófono y notificaciones.',
            ],
          ],
        },
      ],
    },
    skyaltar: {
      tagline: 'El cielo nocturno a través del teléfono, dibujado al estilo de culturas antiguas.',
      lede: 'Levanta el teléfono y Sky Altar muestra las estrellas, la Luna, los planetas y las constelaciones detrás. Cada tema las dibuja como lo habrían hecho Grecia, los vikingos, los mayas o la antigua China, con música ambient lenta.',
      links: ['Guía de astrología'],
      groups: [
        {
          features: [
            [
              'Vista del cielo',
              'Estrellas, Sol, Luna, planetas y 88 constelaciones sobre la cámara, o giradas a mano. Una brújula marca el norte, arriba y abajo.',
            ],
            [
              'Reloj',
              'Un reloj discreto con la fecha en lo alto del cielo, con la letra del tema. Se atenúa con los botones.',
            ],
            [
              'Estrellas de la cámara',
              'La imagen de la cámara queda tenue. Sus estrellas titilan con una estela de chispas y brillan en oro cuando coinciden con el cielo.',
            ],
            [
              'Temas de culturas',
              '19 culturas, de Grecia y Roma a los incas, Sumeria, la Edad de Piedra y el bosque élfico celta. La galería muestra las 28 imágenes de cada una.',
            ],
            [
              'Música ambiental',
              'Cada cultura suena con su propia pista tranquila en sus instrumentos antiguos, y Grecia con la canción «Sky Altar» de Lyrienne. Apaga la música o pon tus propios archivos o una carpeta entera.',
            ],
            ['Anuncios y quitarlos', 'Los anuncios no tapan el cielo. Una compra única de $2.99 los quita.'],
            [
              'Sky Altar Pro',
              'Una compra de A$4.99 desbloquea 11 culturas más, tu propia música, y Hoy y Compatibilidad en Tus estrellas. Oculta los anuncios.',
            ],
            ['Idiomas de la app', 'Las pantallas y los nombres de las constelaciones en 9 idiomas.'],
            [
              'Actualizaciones desde GitHub',
              'La app de Android encuentra una versión nueva y la instala. Ajustes tiene «Buscar actualizaciones».',
            ],
            [
              'Astrología',
              'Desliza desde la izquierda para la carta natal, consejos del día y una puntuación de compatibilidad. El signo del día brilla en el cielo.',
            ],
            ['Ir a una constelación', 'Busca una constelación por su nombre y el cielo gira hacia la que tocas.'],
            [
              'Mitos de las constelaciones',
              'Cada constelación tiene una ficha con el mito de la cultura del tema, qué observar y sus estrellas más brillantes con su distancia. La galería gira el cielo hacia ella.',
            ],
          ],
        },
      ],
    },
    memoire: {
      tagline: 'Aprende palabras en inglés o ruso en tandas cortas, justo antes de olvidarlas.',
      lede: 'Memoire enseña inglés a quienes hablan ruso y ruso a quienes hablan inglés. Varias veces al día muestra tandas cortas de tarjetas, justo antes de que se olvide una palabra.',
      links: [],
      groups: [
        {
          features: [
            ['Tandas de palabras', 'Tandas cortas: primero las que tocan, las nuevas entre ellas.'],
            ['Formas de preguntar', 'Una tarjeta pide el significado, la palabra, lo oído o la escritura.'],
            ['Añadir una palabra', 'Escribe una palabra y recibe tarjetas con traducciones y ejemplos.'],
            ['Imágenes', 'Una tarjeta muestra la foto del artículo de Wikipedia de la palabra.'],
            ['Palabras incluidas', 'Unas 8.000 palabras inglesas con niveles MCER y traducciones al ruso.'],
            ['Prueba de nivel', 'Hasta 6 rondas de sí o no con palabras reales e inventadas fijan el nivel.'],
            ['Temas', '14 temas como informática, viajes, comida y palabras para niños.'],
            ['Recordatorios', 'Avisos locales a horas fijas, solo cuando hay palabras esperando.'],
            ['Mis palabras', 'Una lista de tarjetas con búsqueda, estrellas y borrado.'],
            ['Aspecto e idioma', 'Temas claro y oscuro, y las pantallas en 9 idiomas.'],
            [
              'Práctica de conversación',
              'Un chat sobre una escena como un café o una entrevista, al nivel del alumno.',
            ],
            [
              'Sincronización entre dispositivos',
              'Las mismas tarjetas en teléfono, tableta y navegador, emparejadas con un código.',
            ],
            ['Widget de inicio', 'El número de palabras pendientes y una palabra con su significado.'],
            [
              'Anuncios y quitar anuncios',
              'Un banner y un anuncio a pantalla completa en Android. Una compra única los quita. Encima del banner hay un botón Quitar anuncios.',
            ],
            [
              'Sonido',
              'Las palabras suenan por el altavoz del teléfono a todo volumen. Los ajustes permiten Bluetooth o el volumen del sistema.',
            ],
            [
              'Memoire Pro',
              'Una compra de A$5.99 en Android abre la práctica de conversación, la sincronización, el widget y los 14 temas, y quita los anuncios.',
            ],
            [
              'Actualizaciones',
              'El APK de GitHub avisa cuando sale una nueva versión de Memoire, la descarga y abre el instalador de Android.',
            ],
          ],
        },
      ],
    },
    'lumiere-player': {
      tagline: 'Un reproductor de vídeo para Google TV y móviles Android que reproduce archivos de un USB o un NAS.',
      lede: 'Lumiere Player reproduce archivos de un USB o una carpeta SMB con libVLC, así que abre lo que abre VLC. Cada archivo recuerda su punto y el mando salta y cambia de pista.',
      links: [],
      groups: [
        {
          features: [
            ['Fuentes', 'Memorias USB y carpetas SMB, en la pantalla principal.'],
            ['Reanudar', 'Cada archivo recuerda su posición y la lista muestra cuánto se vio.'],
            ['Subtítulos y audio', 'Pistas incrustadas y archivos de la misma carpeta, cirílico incluido.'],
            ['Controles', 'Saltar 10 o 30 segundos, cambiar velocidad, aleatorio y repetir.'],
            ['Actualizaciones', 'Encuentra versiones nuevas en GitHub al abrir o en Actualizaciones.'],
            ['Anuncios', 'Un banner en el inicio, con un desbloqueo único en la versión de Play.'],
            ['Idiomas', 'En 9 idiomas, según el teléfono o el navegador.'],
            [
              'Táctil en el móvil',
              'Toca para el panel, doble toque en un lado para saltar, arrastra para avanzar, desliza para brillo y volumen, y un bloqueo táctil.',
            ],
            ['Botones del reproductor', 'Elige qué botones muestra el reproductor, también la relación de aspecto.'],
            [
              'Omitir patrocinios',
              'Los vídeos guardados con yt-dlp omiten sus segmentos patrocinados de SponsorBlock.',
            ],
            [
              'Aspecto',
              'Un aspecto oscuro y tranquilo al estilo de Google TV, un foco blanco y un reproductor que cabe en el teléfono.',
            ],
            [
              'Altavoz del teléfono',
              'En el teléfono el vídeo suena por el altavoz al máximo, también con Bluetooth. Bluetooth y el volumen del sistema se activan en Ajustes. Si un Bluetooth no reproduce nada, como un coche con la radio puesta, el sonido vuelve al altavoz del teléfono.',
            ],
            [
              'Biblioteca de música',
              'Carpetas del móvil, USB y NAS en una sola biblioteca, analizada en segundo plano.',
            ],
            [
              'Reproductor de música',
              'Artistas y Canciones están en la pantalla de inicio junto a las unidades. La barra del reproductor sigue en cada pantalla menos el vídeo, con ruta de navegación y orden por artista. Las pistas en directo se omiten, activado por defecto.',
            ],
            [
              'Spotify y YouTube',
              'Hey Lumi pone una canción, un artista o un estilo que no está en las carpetas. Spotify busca las canciones y YouTube las reproduce.',
            ],
            [
              'Audiolibros',
              'Carpetas de libros por autor, cada uno con su portada y su progreso. Un libro sigue donde se quedó, un poco antes tras una pausa.',
            ],
            [
              'Videoteca',
              'Las carpetas de vídeo muestran series, temporadas y episodios, incluso con nombres de archivo torcidos. Di «Hey Lumi, pon dibujos animados» o una serie con su temporada y episodio.',
            ],
            [
              'Buscar tablaturas',
              'Con Guitar Upscale, un botón de guitarra abre las tablaturas de la canción que suena.',
            ],
            [
              'Versión de Google Play',
              'Google Play la actualiza, y los permisos de medios sustituyen el acceso a todos los archivos.',
            ],
            [
              'Comandos de voz',
              'Di Hey Lumi, luego play y una canción, o volume 40, en inglés o ruso, con el teléfono bloqueado. Un pulso muestra que escucha.',
            ],
            [
              'Música en línea',
              'En el APK de GitHub, Hey Lumi reproduce una canción, un artista, un álbum o un estilo que no está en las carpetas, buscado en el catálogo de MusicBrainz.',
            ],
            ['Lumiere Pro', 'Un solo pago desbloquea los comandos de voz y Hey Lumi, y quita los anuncios.'],
          ],
        },
      ],
    },
    'property-trends': {
      tagline: 'Barrios de Australia coloreados por su precio medio de vivienda, con el historial.',
      lede: 'Un mapa de barrios de Australia, cada uno coloreado por su precio medio de venta, con un gráfico de cómo cambió. Usa datos públicos abiertos.',
      links: ['Abrir el mapa'],
      groups: [
        {
          features: [
            ['Mapa de precios', 'Cada barrio coloreado por su precio medio de venta.'],
            ['Filtros', 'El tipo de vivienda y el periodo que muestra el mapa.'],
            ['Anuncios en realestate.com.au', 'Unos botones abren la misma búsqueda en realestate.com.au.'],
            ['Ficha y gráfico', 'La mediana del barrio, el número de ventas y un gráfico por años.'],
            ['Búsqueda', 'Encuentra un barrio por nombre o código postal y lleva el mapa allí.'],
            ['Idiomas', 'En 9 idiomas, según el teléfono o el navegador.'],
            [
              'Alquileres',
              'Cada código postal de NSW, QLD, SA y TAS coloreado por el alquiler semanal medio de los nuevos contratos.',
            ],
            ['Instalar desde el navegador', 'La versión web se instala como app con su propio icono.'],
            [
              'Anuncios y quitar anuncios',
              'Un banner de AdMob bajo el mapa en Android. Una compra única de A$2.99 lo quita. La web no muestra anuncios.',
            ],
            [
              'Property Trends Pro',
              'Una compra de A$5.99 en Android desbloquea los alquileres y todo el historial de precios, y quita los anuncios.',
            ],
            [
              'App para iPhone',
              'El mismo mapa, Pro e idiomas en el iPhone, con el mismo código. Llega al App Store cuando se abra la cuenta de desarrollador.',
            ],
          ],
        },
      ],
    },
    tripforge: {
      tagline: 'Un viaje entero en pocas palabras: vuelos, ruta, hoteles y coche, con precios.',
      lede: 'Tripforge planea un viaje con los lugares, una fecha aproximada y el grupo. La respuesta es un plan con precios de vuelos, ruta, hoteles y coche, y fechas cercanas más baratas.',
      links: ['tripforge.workbench-soft.com'],
      groups: [
        {
          features: [
            [
              'Preguntar',
              'Escribe los lugares, una fecha aproximada, las noches y quién va, o abre un enlace de Tick-a-Lot.',
            ],
            [
              'Vuelos',
              'Los vuelos de ida y vuelta más baratos en torno a la fecha, un calendario de precios y enlaces a Aviasales y Google Flights.',
            ],
            ['Lugares', 'Los imprescindibles y los rincones secretos de cada ciudad, filtrados por intereses.'],
            ['A Tickalot', 'Un toque envía el viaje a Tick-a-Lot como lista de lugares y lista de equipaje.'],
            ['Ajustes', 'El idioma de la app: el del teléfono o uno de los 9.'],
            [
              'Anuncios',
              'Un banner y un anuncio a pantalla completa en Android. Una compra única de Quitar anuncios los oculta.',
            ],
            [
              'Tripforge Pro',
              'Una compra en Android da búsquedas ilimitadas, fechas desplazadas hasta 30 días, hasta 50 viajes guardados y cero anuncios.',
            ],
          ],
        },
      ],
    },
    'reddit-desk': {
      tagline: 'Redacta comentarios de Reddit sobre un repo y los escribe en Chrome.',
      lede: 'Una app de Windows para la barra de tareas. Elige un repo, pulsa Buscar y Claude Code redacta un comentario para cada hilo que el repo puede responder. Abre una tarjeta y Chrome recibe el borrador, listo para publicar a mano.',
      links: [],
      groups: [
        {
          features: [
            ['Selector de repo', 'Una lista de cada carpeta git bajo la raíz.'],
            ['Subreddits', 'Claude lee el repo y rellena los subs que encajan.'],
            ['Buscar hilos', 'Claude Code encuentra hilos que el repo puede responder y redacta un comentario.'],
            ['Pasos arriba', 'Tres pasos arriba dicen quién hace qué, y el que espera se ilumina.'],
            ['Tarjetas', 'Cada tarjeta muestra el sub, el título del hilo y el borrador editable.'],
            ['Abrir en Chrome', 'Chrome abre el hilo con el comentario escrito, listo para publicar.'],
            ['Publicarlo por mí', 'La app escribe el comentario en su propia ventana de Chrome y pulsa Save.'],
            ['Pestaña de posts', 'Redacta posts sobre los repos elegidos en los subs adecuados.'],
            ['Capturas y vídeos', 'Cada post lista medios de la carpeta de capturas del repo.'],
            ['Abrir un post', 'Chrome abre la página de envío del sub con el post relleno.'],
            ['Riesgo de baneo', 'Una línea valora el próximo post y cada tarjeta su sub.'],
            ['Post de testers', 'Un post que pide testers para una app Android de una lista.'],
            ['Dentro de Archon', 'La pestaña Reddit de Archon muestra esta ventana en un marco.'],
            ['Botón de info', 'El botón i explica la configuración de Reddit.'],
            [
              'Actualizaciones',
              'La app se actualiza sola desde GitHub. Al arrancar y una vez al día ofrece Actualizar o Más tarde, y solo instala builds firmados.',
            ],
            ['Idioma', 'Los ajustes tienen una lista: el del sistema o uno de 9.'],
            ['Lista de hechos', 'Cada hilo publicado u omitido, con su fecha.'],
          ],
        },
      ],
    },
    songfactory: {
      tagline: 'Convierte una carpeta de canciones en un vídeo largo en bucle para YouTube y lo sube.',
      lede: 'Songfactory une las canciones de un tema sobre un fondo en bucle, escribe los capítulos y la miniatura, y sube el vídeo según un calendario. Claude escribe el texto y ComfyUI puede dibujar el fondo.',
      links: [],
      groups: [
        {
          features: [
            [
              'Taller de audio',
              'Limpia o mejora canciones en una ventana de escritorio, en 9 idiomas y con protección frente a nombres de salida repetidos.',
            ],
            [
              'Pipeline de bloques',
              'Diez bloques llevan un tema a un vídeo de YouTube: temas, historias, letras, canciones en Suno, limpieza, vídeo y subida. Cada uno se ejecuta solo con sus ajustes.',
            ],
            ['Un vídeo por canción', 'Crea un vídeo en bucle por canción y, si quieres, un vídeo combinado.'],
            ['Instalar y comprobar', 'Un script instala las herramientas y una revisión las comprueba.'],
            ['Vídeo largo de una lista', 'Las canciones de una carpeta se unen con fundido sobre un clip en bucle.'],
            [
              'Limpieza de artefactos de IA',
              'La compilación quita el siseo, el brillo metálico y el zumbido de las canciones y guarda los originales.',
            ],
            [
              'Mejorar una canción',
              'Un comando limpia cualquier canción, devuelve la banda que cortó un códec con pérdida y muestra los dos espectrogramas.',
            ],
            ['Bucle sin cortes', 'El clip va hacia delante y hacia atrás, y el salto del final desaparece.'],
            ['Capítulos y miniatura', 'La descripción lista cada canción con su inicio y se crea una miniatura.'],
            ['Subida programada', 'Un comando sube con la etiqueta de IA y una hora de publicación.'],
            ['Texto de Claude', 'Claude escribe el título y la descripción de YouTube a partir de las canciones.'],
            ['Fondo con ComfyUI', 'Un prompt en el archivo del tema hace que ComfyUI dibuje el fondo.'],
          ],
        },
      ],
    },
    'disk-reorg': {
      tagline: 'Ordena, quita duplicados y archiva carpetas según reglas.',
      lede: 'disk-reorg mueve archivos a una carpeta de cuarentena y deja cada borrado al dueño. Las carpetas, reglas y patrones protegidos quedan en una configuración local, fuera de git.',
      links: [],
      groups: [
        {
          features: [
            [
              'Informe de carpeta',
              'Un informe en Markdown con cantidades, tamaños, años, tipos de archivo y posibles copias.',
            ],
            [
              'Duplicados a cuarentena',
              'Conserva la copia mejor ubicada de cada archivo y mueve el resto a cuarentena.',
            ],
            [
              'Archivos prescindibles',
              'Instaladores, torrents y billetes viejos van a cuarentena por reglas. Los patrones protegidos cuidan los nombres importantes.',
            ],
            [
              'Ordenar por temas',
              'Los archivos van a carpetas por tema según reglas, y el resto a una carpeta de reserva.',
            ],
            ['Bandeja mensual', 'Lo que lleva más de 30 días en Descargas pasa a una carpeta por mes.'],
            [
              'Planes, movimientos y deshacer',
              'Una prueba en seco escribe un plan editable, cada movimiento queda en un registro y deshacer lo devuelve.',
            ],
          ],
        },
      ],
    },
  },
};

export default es;

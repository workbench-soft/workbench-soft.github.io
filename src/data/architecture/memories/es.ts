import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una app de Expo para Android, el iPhone y el navegador lee las fotos de un NAS de casa por WebDAV y lleva su propio índice SQLite. Unos contenedores opcionales en el NAS indexan las fotos, agrupan caras y sirven los enlaces de álbum.',
  parts: [
    {
      name: 'Expo y React Native',
      role: 'un solo código para la app de Android, la del iPhone y la versión de navegador.',
    },
    { name: 'expo-sqlite', role: 'el índice en el móvil, con la fecha, el lugar y el dispositivo de cada archivo.' },
    { name: 'WebDAV', role: 'el único enlace con el NAS para listas, cabeceras, subidas y traslados.' },
    {
      name: 'Crate folder-rules',
      role: 'las reglas en Rust de carpetas por año, lugar y día, compartidas con el organizador de escritorio.',
    },
    { name: 'places.db', role: 'un extracto de GeoNames y OpenStreetMap dentro de la app que nombra lugares sin red.' },
    {
      name: 'Contenedores Node del NAS',
      role: 'el indexador rápido, las páginas de álbum y la app de navegador en el NAS.',
    },
    {
      name: 'Motor de caras en Rust',
      role: 'ejecuta YuNet y SFace con tract en el NAS y agrupa las caras por persona.',
    },
    {
      name: 'Editor de fotos en Konva',
      role: 'un solo editor en un componente Expo DOM, compartido con Shuttrix y el escritorio.',
    },
  ],
  flow: [
    'Una tarea de fondo lista las carpetas del NAS cada pocas horas.',
    'Lee solo la cabecera de cada archivo nuevo para la fecha y el GPS.',
    'La base de lugares sin conexión nombra el sitio, y SQLite guarda la fila.',
    'La tarea planifica los recordatorios de los próximos 7 días.',
    'Las pantallas consultan el índice y traen las fotos completas del NAS.',
  ],
  links: [
    {
      to: 'media-organizer',
      text: 'El organizador de escritorio enlaza las mismas reglas de carpetas en Rust y muestra el mismo editor.',
    },
    { to: 'shuttrix', text: 'La cámara comparte el editor de fotos, la búsqueda de lugares y el mapa de puntos.' },
    { to: 'keeppad', text: 'Keeppad añade notas al diario de una persona en el NAS mediante un proveedor de Android.' },
    { to: 'memories-demo-webdav', text: 'La revisión de Google Play entra en este NAS de muestra.' },
    { to: 'Tailscale', text: 'Una segunda dirección llega al NAS fuera de casa. Funnel sirve los enlaces de álbum.' },
  ],
  features: {
    'Daily reminder':
      'expo-notifications guarda recordatorios sueltos para los próximos 7 días, planificados desde el índice por la tarea de fondo. Un viaje al extranjero ese día elige el año.',
    Today:
      'Una consulta a una tabla de fotos por día encuentra cada año con fotos en esta fecha. Unos disparadores mantienen esa tabla, así no se leen las filas de archivos.',
    Trips:
      'La app recorta las rachas de días en el extranjero a partir de los recuentos por día. El enlace del viaje abre las fotos del primer al último día.',
    Photos:
      'FlashList dibuja las teselas en pantalla y una pantalla más allá. Cada tesela muestra la pequeña miniatura EXIF guardada en el móvil.',
    'Filter by place':
      'La búsqueda de lugares lee países y sitios de los recuentos por día. Lo elegido se vuelve una condición más en cada consulta de la galería.',
    'Camera and drone shots':
      'El modelo EXIF o el nombre del archivo decide durante la sincronización entre móvil, cámara o dron. El índice lo guarda por archivo.',
    'Tile size':
      'Un gestor del pellizco fija de 1 a 6 teselas por fila. Un solo valor guardado controla cada cuadrícula.',
    'Send many photos at once':
      'La app copia lo elegido en su caché, 3 a la vez. Un pequeño módulo nativo lo pasa de una vez al menú de compartir del sistema.',
    'Share an album by link':
      'La app escribe un archivo de álbum en el NAS por WebDAV. Un servidor Node del NAS lo muestra por Tailscale Funnel, con vistas previas hechas por sharp.',
    'Memories in the browser':
      'Un servidor Node del NAS sirve la versión web y pasa WebDAV en la misma dirección. Tailscale Serve lo mantiene dentro del tailnet.',
    Organize:
      'Cada tarjeta lanza una tarea: ordenar la cámara, subir o liberar espacio. Las reglas de carpetas en Rust planean carpeta y nombre antes de mover cada archivo.',
    'Import from Google Photos':
      'La API Picker de Google Fotos muestra solo lo que la persona elige. La app lo descarga en la carpeta de la cámara y la subida lo recoge.',
    'Sort picked photos on the NAS':
      'Las reglas de carpetas en Rust planean una carpeta y un nombre nuevos por archivo. Un MOVE de WebDAV lo deja allí y el índice del móvil lo sigue al momento.',
    Viewer:
      'expo-image muestra la foto completa sobre la miniatura en caché. expo-video transmite los vídeos del NAS con peticiones de rango.',
    'Connect to the NAS':
      'Una búsqueda mDNS lista los equipos del Wi-Fi, y una sonda encuentra el puerto WebDAV. El acceso queda en el almacén seguro del móvil.',
    'Photos away from home':
      'Una sonda a la dirección de casa corre al arrancar y en cada cambio de red. Sin respuesta la app pasa a la dirección de Tailscale.',
    'Sync progress':
      'El aviso lee el estado de la sincronización en vivo en el móvil. La parte del NAS sale de un archivo de estado que el indexador escribe cada minuto.',
    'Mobile data':
      'Una sola comprobación protege cada tarea del NAS con datos móviles. La respuesta guardada la deja correr o la hace esperar al Wi-Fi.',
    'Index from the NAS':
      'Un contenedor Node del NAS lee las cabeceras de su propio disco y escribe un archivo de índice junto a las fotos. El móvil lo descarga y añade las filas que le faltan.',
    'Move the index to a new phone':
      'SQLite copia la parte del NAS del índice en un archivo para el menú de compartir. El móvil nuevo adjunta ese archivo y copia sus filas.',
    Language:
      'i18next guarda los 9 catálogos, y expo-localization lee el idioma del móvil. Una elección en Ajustes manda y vuelve a planificar los recordatorios.',
    Theme:
      'Una paleta guarda un juego de colores claros y otro oscuro. Las pantallas la leen con un hook que sigue al móvil o a la elección guardada.',
    'Ads and remove ads':
      'Google Mobile Ads muestra los banners de AdMob y el anuncio a pantalla completa tras el consentimiento. expo-iap vende Quitar anuncios por Google Play.',
    'Memories Pro':
      'expo-iap vende el producto por Google Play y la App Store. Un solo módulo comprueba la compra antes de abrir cada función bloqueada.',
    'Desktop sorter':
      'Una app de Tauri con backend en Rust ordena una carpeta en el ordenador. Enlaza la misma crate de reglas de carpetas que el móvil.',
    Archive:
      'La lista de meses lee los recuentos de fotos por día, que mantienen los disparadores. Un toque pide los archivos del mes por hora de captura.',
    'Trip list and places map':
      'La lista de viajes une los viajes al extranjero con las escapadas por el país sacadas de los recuentos por día. Leaflet en una WebView dibuja el mapa con recuentos por celda pequeña.',
    People:
      'Un motor en Rust en el NAS agrupa las caras con YuNet y SFace. El móvil descarga el resultado y devuelve al NAS los nombres y las fusiones.',
    'Indexing progress page':
      'El motor de caras y el indexador escriben archivos de estado en el NAS. Un servidor Node los convierte en una página en vivo con eventos del servidor.',
    'Albums about a person':
      'El archivo del álbum guarda a la persona, su fecha de nacimiento y las notas. El servidor de álbumes del NAS ordena las fotos por año de edad.',
    'Turn a photo':
      'El motor de caras prueba cada foto girada 90, 180 y 270 grados. El móvil fija la orientación EXIF y cambia el archivo en el NAS tras una comprobación.',
    'Edit a photo':
      'Konva ejecuta el editor dentro de un componente Expo DOM. Guardar copia escribe un JPEG en el móvil y en el NAS, y Guardar reemplaza el archivo tras comparar los bytes.',
    'Draw a new picture':
      'El mismo editor de Konva se abre en una hoja en blanco. Guardar deja el dibujo en el móvil y en el NAS según las reglas de subida.',
    'Photos on the phone':
      'Un módulo local de Expo en Kotlin lee la carpeta de la cámara con un permiso de una sola vez. Sus archivos entran en el mismo índice que los del NAS.',
    Settings:
      'Los valores pequeños viven en el almacén clave valor de expo-sqlite y se cargan al arrancar. La contraseña del NAS vive en el almacén seguro.',
    'Duplicates on the NAS':
      'Una consulta al índice agrupa los archivos del NAS por hora de captura y tamaño. Una comparación de bytes por WebDAV prueba cada par antes de mandar la copia a la papelera del NAS.',
    Updates:
      'Un paquete de actualización compartido lee la última release de GitHub y abre el instalador de Android. La versión de Google Play lo cambia por módulos vacíos.',
    'Light, blur and fonts':
      'Los filtros de Konva aplican los deslizadores de color y luego un desenfoque alrededor de una elipse o una franja. Cada texto guarda su familia de fuente.',
    'On the iPhone':
      'Unos archivos para iOS cambian los módulos de Android por versiones para la fototeca, URLSession y la App Store. Las reglas de carpetas corren como XCFramework de Rust mediante Swift.',
  },
};

export default arch;

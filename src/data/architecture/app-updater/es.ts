import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una app Kotlin para Android lee las versiones públicas del estudio en GitHub e instala cada APK con Shizuku. No tiene servidor propio.',
  parts: [
    {
      name: 'Kotlin y Android Views',
      role: 'una sola pantalla de Views simples, con una tarjeta por app y deslizar para actualizar.',
    },
    { name: 'GitHub Releases API', role: 'la fuente del APK más nuevo de cada app, con sus notas y sus commits.' },
    { name: 'Shizuku', role: 'ejecuta cada instalación como el usuario shell, así Android no muestra avisos.' },
    { name: 'Gestor de paquetes de Android', role: 'da el nombre, el paquete y la versión de cada app instalada.' },
    { name: 'Ronda de actualización', role: 'guarda la cola fuera de la pantalla y descarga cada APK por partes.' },
    {
      name: 'Shared preferences',
      role: 'guardan la última lista de versiones y los paquetes aprendidos en una ronda.',
    },
    {
      name: 'Catálogo del estudio',
      role: 'un archivo JSON del sitio del estudio con el nombre y las plataformas de cada proyecto.',
    },
  ],
  flow: [
    'La persona abre la app, vuelve a ella o desliza la lista hacia abajo.',
    'La app lee cada página de versiones de GitHub, o una lista de menos de 10 minutos.',
    'Une cada APK con una app instalada por su nombre o su paquete.',
    'El catálogo del estudio nombra cada tarjeta y añade los proyectos sin APK.',
    'Un toque descarga el APK, y Shizuku lo instala sin aviso.',
    'El actualizador se instala el último, y el teléfono lo vuelve a abrir.',
  ],
  links: [
    {
      to: 'GitHub',
      text: 'El repo público común de versiones guarda el APK de cada app, así el teléfono no necesita token.',
    },
    { to: 'Shizuku', text: 'La app Shizuku da acceso al usuario shell que instala y quita las apps.' },
    { to: 'Workbench Soft site', text: 'El sitio crea el catálogo de apps a partir de su propia lista de proyectos.' },
    { to: 'archon', text: 'Archon no publica APK, así que su tarjeta lleva un enlace Abrir.' },
  ],
  design: {
    scale: [
      'Una pantalla en el propio teléfono del desarrollador, con una tarjeta por cada app publicada del estudio.',
      'La API de GitHub permite 60 llamadas por hora sin token, lo que fijó la caché de lista de 10 minutos.',
    ],
    data: [
      'Sin base de datos. Las shared preferences guardan la última lista de versiones, con notas y nombres, y los nombres de paquete aprendidos en una pasada.',
      'Una clave de recurso es el prefijo de la etiqueta más el nombre del APK sin versión ni sufijo de plataforma, como farnear/farnear.',
      'Las apps instaladas salen del gestor de paquetes de Android en cada comprobación.',
    ],
    interfaces: [
      'La API de Releases de GitHub del repositorio público compartido lista cada APK por páginas, y la API compare da las notas de commits.',
      'El sitio del estudio sirve un catálogo JSON con el nombre, las plataformas y el enlace de cada proyecto.',
      'Shizuku ejecuta sh -c como usuario shell, con pm install -r -d -S y pm uninstall.',
    ],
    reliability: [
      'Si falla la comprobación de GitHub se muestra la lista guardada, y una apertura espera un minuto antes de volver a preguntar.',
      'La actualización vive fuera de la activity, así que girar la pantalla no la corta, y Cancelar para antes del siguiente bloque.',
      'Una compilación que estorba solo se quita ante un choque de firma o de versión, y el código de salida delata una reinstalación fallida.',
    ],
    security: [
      'Solo lee versiones públicas y no guarda token ni cuenta.',
      'El permiso para instalar viene de la autorización de Shizuku que da la persona, y la app no ejecuta ningún comando root.',
      'La instalación propia comprueba el tamaño del archivo APK antes de instalar.',
    ],
    performance: [
      'Los APK se descargan en bloques de 64 KB con tiempos de espera y una comprobación de parada.',
      'La lista de versiones queda fresca 10 minutos, así que la mayoría de las aperturas se salta la API.',
      'Las notas de las tarjetas que no las tienen se cargan en segundo plano con la API compare, tras mostrar las tarjetas.',
    ],
    operations: [
      'Checks ejecuta ktlint, shellcheck, shfmt, actionlint, markdownlint, las pruebas unitarias y la compilación de debug en un runner propio.',
      'Release compila un APK firmado junto a Checks, y release-gate.sh lo publica cuando los checks pasan.',
      'La tarea pone una etiqueta con fecha y crea una versión del actualizador en el repositorio público, conservando las últimas 3.',
    ],
    tradeoffs: [
      'Shizuku en vez del instalador del sistema, para instalar sin avisos, a costa de un arranque tras cada reinicio.',
      'Views simples en vez de Compose, por una sola pantalla y la API Java de Shizuku, a costa de un diseño hecho a mano.',
      'Un repositorio público de versiones en vez de repositorios privados de apps, para que el teléfono no necesite token, a costa del límite de 60 llamadas por hora.',
      'El APK propio se instala el último, con un solo comando shell, porque una instalación puede matar el proceso en marcha.',
    ],
  },
  features: {
    'Update all':
      'La ronda pone en cola cada app atrasada y la descarga en partes de 64 KB. Shizuku instala cada una como el usuario shell, y Cancelar para antes de la parte siguiente.',
    'Self update':
      'WBS Updater publica en las mismas versiones con su propia etiqueta y se instala el último. Un comando shell con Shizuku lo instala y reabre la app al terminar el proceso viejo.',
    'Update one app':
      'El botón Actualizar de una tarjeta lanza la misma descarga e instalación con Shizuku para un APK. Tras un fallo, el botón queda para reintentar.',
    'Install a missing app':
      'Un APK sin app instalada que coincida recibe un botón Instalar. Shizuku lo instala igual que una actualización.',
    'App list':
      'Cada APK publicado recibe una tarjeta, unida a las apps instaladas por nombre o paquete. El catálogo del estudio añade una tarjeta con enlace para cada proyecto sin APK.',
    'Saved list offline':
      'Las shared preferences guardan la última lista con sus notas y nombres. Si GitHub falla, la app muestra esa lista, y abrir en menos de 10 minutos evita la API.',
    'Shizuku setup':
      'Un módulo de configuración halla el paso de Shizuku que falta y abre Google Play o la app Shizuku. La actualización tocada arranca en cuanto llega el acceso.',
    'Release notes':
      'La app limpia las notas de cada versión de GitHub. Si están vacías, lee en segundo plano los commits del enlace de comparación.',
  },
};

export default arch;

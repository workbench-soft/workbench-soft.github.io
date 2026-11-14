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

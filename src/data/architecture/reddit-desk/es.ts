import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una app de Tauri 2 para Windows con un núcleo en Rust y una ventana en React. El núcleo ejecuta Claude Code para buscar hilos y escribir borradores, y abre Chrome para publicar.',
  parts: [
    {
      name: 'Tauri 2',
      role: 'la carcasa de escritorio que mete la ventana y el núcleo en Rust en un solo instalador.',
    },
    {
      name: 'Núcleo en Rust',
      role: 'ejecuta Claude Code y Chrome, guarda los archivos JSON y mantiene los límites de ritmo.',
    },
    { name: 'React y Vite', role: 'la ventana con las pestañas Comments y Posts y sus tarjetas.' },
    { name: 'Claude Code', role: 'lee el repo, trae hilos con un servidor MCP de Reddit y escribe los borradores.' },
    {
      name: 'chromiumoxide',
      role: 'maneja la ventana de Chrome propia de la app cuando la persona pulsa Post it for me.',
    },
    { name: 'axum', role: 'sirve la misma ventana por HTTP local para que Archon pueda enmarcarla.' },
    { name: 'i18next', role: 'los 9 catálogos de idioma de la ventana.' },
    { name: 'Plugin de actualización de Tauri', role: 'busca una versión nueva firmada y la instala.' },
  ],
  flow: [
    'La persona elige un repo y pulsa Find.',
    'El núcleo arranca Claude Code en ese repo con el skill reddit-comments.',
    'Claude lee hilos populares con el servidor de Reddit y escribe borradores en un archivo.',
    'El núcleo se queda con 6 borradores y los muestra como tarjetas.',
    'La persona abre una tarjeta, y Chrome recibe el hilo con el borrador.',
  ],
  links: [
    { to: 'agent-skills', text: 'Su skill reddit-comments elige los hilos y fija el tono de cada comentario.' },
    { to: 'archon', text: 'La pestaña Reddit de Archon enmarca la ventana y arranca la app si está cerrada.' },
    { to: 'Reddit', text: 'Claude lee hilos con un servidor MCP, y la persona publica en Chrome.' },
    {
      to: 'GitHub Releases',
      text: 'El instalador y el archivo de actualización firmado están en una release del repo público del sitio.',
    },
  ],
  features: {
    'Repo picker':
      'El núcleo en Rust lista cada carpeta git bajo la carpeta raíz de los ajustes. La elección se guarda en un archivo JSON en la carpeta de datos de la app.',
    Subreddits:
      'El núcleo ejecuta Claude Code sin servidor MCP y solo con herramientas de lectura. Claude nombra los subs a partir del repo, y la lista se guarda por repo.',
    'Find threads':
      'El núcleo ejecuta Claude Code en el repo con el skill reddit-comments y un servidor MCP de Reddit. Claude escribe los hilos y borradores en un archivo, y el núcleo se queda con 6.',
    'Steps on top': 'La ventana de React ilumina el paso que espera según el estado de la búsqueda y de las tarjetas.',
    Cards:
      'Las tarjetas salen de un archivo de cola que escribe el núcleo. Los cambios se guardan ahí cuando el cuadro de texto pierde el foco.',
    'Open in Chrome':
      'El núcleo pone el borrador en el portapapeles y abre Chrome en el perfil elegido. Un límite fija el ritmo en 3 comentarios publicados por hora.',
    'Post it for me':
      'El núcleo abre su propio Chrome con un puerto de depuración y lo maneja con chromiumoxide. Rellena el formulario del Reddit antiguo, pulsa Save y comprueba que el comentario aparece.',
    'Posts tab':
      'Claude Code lee los repos marcados y el skill marketing, y luego escribe borradores de posts en un archivo. El núcleo se queda con 3 y quita los medios sin archivo.',
    'Screenshots and videos':
      'Claude elige hasta 4 archivos de la carpeta de capturas del repo por sus pies de foto. Un clic en un archivo lo abre en el Explorador.',
    'Open a post':
      'El núcleo abre en Chrome la página de envío del Reddit antiguo con el título y el texto en la dirección. Un post con medios abre el primer archivo en el Explorador.',
    'Ban risk':
      'Un módulo en Rust puntúa el próximo post según los archivos de historial de posts y comentarios. Las reglas vienen del skill marketing, como una comunidad al día.',
    'Tester post':
      'El núcleo rellena una plantilla con el enlace del Google Group y las líneas de apps del panel. No hace falta ejecutar Claude.',
    'Inside Archon':
      'El núcleo sirve la misma ventana y los mismos comandos por HTTP local con axum. Archon la enmarca, y la app se cierra 2 minutos después de cerrar la pestaña.',
    'Info button':
      'Un diálogo en la ventana lista lo que necesita Find y las reglas de riesgo de baneo. También muestra la versión y una comprobación de actualizaciones.',
    Updates:
      'El plugin de actualización de Tauri lee un archivo firmado de una release de GitHub al arrancar y cada 24 horas. Comprueba la firma antes de ejecutar el instalador.',
    Language:
      'i18next guarda los 9 catálogos en la ventana. La elección queda en el archivo de ajustes, así que la ventana de Tauri y el marco de Archon la comparten.',
    'Done list':
      'Los hilos publicados y saltados pasan a un archivo de historial con la fecha. La siguiente búsqueda se los pasa a Claude para que los salte.',
  },
};

export default arch;

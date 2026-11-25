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
  design: {
    scale: [
      'Una persona en un PC con Windows, y unos topes lo mantienen pequeño: 6 borradores de comentarios, 3 borradores de publicaciones y 3 comentarios publicados por hora.',
      'Un Find tarda de 1 a 5 minutos, porque Claude Code lee los hilos por sí mismo.',
    ],
    data: [
      'Archivos JSON sencillos en la carpeta de datos de la app guardan los ajustes, la cola, las tarjetas de publicaciones y los dos historiales.',
      'history.json guarda los hilos publicados y omitidos con la fecha, y el siguiente Find los salta. opens.json guarda la hora de cada comentario publicado en el último día.',
    ],
    interfaces: [
      'El núcleo lanza claude -p con stream-json y convierte cada línea de salida en un evento find-log para la ventana.',
      'Claude llega a Reddit por un servidor MCP fijado a un commit y pasado con --strict-mcp-config.',
      'La ventana llama al núcleo con Tauri invoke, o con HTTP y server-sent events cuando Archon la enmarca.',
      'Post it for me maneja Chrome por el protocolo DevTools con chromiumoxide.',
    ],
    reliability: [
      'Un Find se puede cancelar, y el núcleo analiza found.json tras la ejecución y se queda con 6 tarjetas.',
      'Post it for me da un comentario por publicado solo cuando la página muestra un comentario de la cuenta con el texto del borrador.',
      'Solo corre una app a la vez. Un segundo inicio muestra la ventana abierta, y una ejecución en segundo plano sale 2 minutos después de cerrarse el marco.',
    ],
    security: [
      'El inicio de sesión de Reddit queda en el perfil de Chrome de la persona o en la carpeta de Chrome propia de la app. La app no guarda contraseñas.',
      'El servidor local solo responde a un Host de bucle local, y un POST exige el tipo JSON, así que otro sitio no puede llamarlo.',
      'Una ejecución de Claude puede usar herramientas de lectura, el servidor de Reddit y una escritura en su propio archivo de salida. El actualizador comprueba una firma antes de instalar.',
    ],
    performance: [
      'Claude y Chrome corren como procesos hijos sin ventana de consola, y la ventana recibe las líneas en flujo en vez de esperar al final.',
      'La compilación de release desactiva LTO y usa 16 codegen units, lo que bajó la compilación de 18 minutos a unos 2.',
      'El runner conserva la carpeta target de cargo entre compilaciones, así que solo se recompila el crate de la app.',
    ],
    operations: [
      'Checks y Release arrancan juntos en cada push a main, y una release gate cancela la compilación si Checks falla.',
      'Publish etiqueta el commit con la fecha y sube el instalador NSIS. Un latest.json firmado guía al actualizador.',
      'El actualizador de Tauri comprueba al inicio y cada 24 horas, y luego instala la nueva versión en silencio.',
    ],
    tradeoffs: [
      'Claude Code con un skill en vez de la API de Reddit desde Rust, para que las reglas de hilos vivan en un solo sitio. Un Find es más lento.',
      'Tauri 2 en vez de Electron, que lleva un Chromium entero en cada instalación. El coste son 2 lenguajes que comprobar.',
      'El Chrome propio de la app con puerto de depuración en vez del Chrome de la persona, porque Chrome 136 rechaza un puerto de depuración en el perfil por defecto. Pide un inicio de sesión más en Reddit.',
      'El formulario antiguo de Reddit en vez del editor nuevo, que esconde sus campos en shadow roots.',
    ],
  },
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
    Activity:
      'La parte en Rust envía a la ventana como eventos cada paso y cada línea de salida de Claude Code. El panel guarda en memoria las últimas 500.',
  },
};

export default arch;

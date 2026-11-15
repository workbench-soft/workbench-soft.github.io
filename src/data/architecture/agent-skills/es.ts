import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Skills sencillos en Markdown y unos pocos scripts, sin servidor y sin build. Un instalador enlaza un solo clon con cada agente de código del equipo, y la CI revisa los skills antes de cada versión.',
  parts: [
    {
      name: 'Formato Agent Skills',
      role: 'cada skill es una carpeta de Markdown que un agente carga cuando una petición encaja con ella.',
    },
    {
      name: 'Instalador en POSIX shell',
      role: 'enlaza el clon con Claude Code, Codex, Kimi Code y otros agentes, con un envoltorio de PowerShell para Windows.',
    },
    { name: 'Git hooks', role: 'vuelven a enlazar los skills tras un pull, un merge o un checkout.' },
    { name: 'Scripts de Node', role: 'mezclan los hooks en los ajustes de cada agente y copian los servidores MCP.' },
    {
      name: 'Hook turn-voice',
      role: 'un reproductor en C# para Windows y su gemelo en Node para Mac que dicen el final de un turno.',
    },
    {
      name: 'Comprobaciones en Python y TypeScript',
      role: 'revisan el formato del skill, las palabras clave y la longitud de cada skill.',
    },
    {
      name: 'GitHub Actions',
      role: 'ejecuta las comprobaciones en Windows y Linux, y luego crea una versión con fecha.',
    },
  ],
  flow: [
    'Una persona clona el repositorio y ejecuta el instalador.',
    'El instalador enlaza cada carpeta de skill con cada agente que encuentra.',
    'El agente lee la descripción de cada skill al empezar una sesión.',
    'Una petición que encaja carga el skill entero, y el agente sigue sus pasos.',
    'Al final del turno el hook de voz dice el resultado.',
  ],
  links: [
    {
      to: 'agent-skills-private',
      text: 'Allí están las reglas y los skills privados del dueño, junto a estos públicos.',
    },
    { to: 'Claude Code', text: 'El instalador enlaza los skills y mezcla los hooks en sus ajustes.' },
    { to: 'Codex', text: 'Los mismos skills, los hooks y una copia de los servidores MCP de Claude Code.' },
    { to: 'GitHub', text: 'Las comprobaciones y las versiones con fecha corren en GitHub Actions.' },
  ],
  features: {
    'Writing style':
      'Un archivo corto de reglas se carga en cada turno con el archivo de reglas principal del agente. El skill completo se carga antes del primer texto, con sus tablas de palabras y una revisión final.',
    'Code review':
      'El skill review lee la PR o el diff y contrasta cada problema con el código. Devuelve una tabla con la línea, la entrada que lo rompe y el arreglo.',
    'Reviewer lenses':
      'El skill reviewer elige los enfoques para un diff o un repositorio y lanza un subagente por enfoque. Un enfoque de dominio como lo legal o el SEO carga su propio skill.',
    'Pull requests':
      'El skill create-pr escribe la descripción y abre o actualiza la PR con la CLI de GitHub. Los diagramas de Mermaid muestran cada flujo antes y después.',
    'Review comments':
      'El skill address-comments lee cada hilo abierto con la CLI de GitHub. Cada arreglo va en su propio commit, y la respuesta da su SHA.',
    'Ticket to merge':
      'El skill implement-ticket lee Jira con el servidor MCP de Atlassian o su CLI. El plan va a las specs del repositorio, y cada commit lleva la clave del ticket.',
    'App audit':
      'El skill app-audit lanza los enfoques del reviewer con cada agente en su propio worktree de git. El agente principal reúne los arreglos seguros en una rama y fusiona la PR.',
    'Specs first':
      'El skill specs guarda un archivo Markdown por función en el repositorio. Cada cambio añade una entrada con fecha en el primer commit, antes del código.',
    'One-pager':
      'El skill one-pager escribe primero el texto completo. Luego pone arriba un resumen de una pantalla, que no añade datos propios.',
    'Commands through mise':
      'El skill mise ejecuta cada tarea con mise run y los demás comandos con mise x. Una herramienta nueva entra en la config de mise del repositorio con versión fija.',
    Translations:
      'El skill translations elige la herramienta de i18n para la pila y añade cada texto a cada catálogo. Una prueba mantiene los catálogos con las mismas claves.',
    Worktrees:
      'El skill git-worktrees crea una carpeta junto al repositorio con sus archivos ignorados y sus dependencias. Tras la fusión un script revisa la PR y quita la carpeta y las ramas.',
    'Fast JavaScript':
      'El skill javascript recoge reglas de las React best practices de Vercel, sin las partes de React. Cada hallazgo da la regla, la línea y su coste.',
    Architecture:
      'El skill architecture escribe el diseño en la documentación del repositorio con diagramas y una decisión por elección. El lint o la CI hacen cumplir luego las reglas de capas.',
    Monorepos:
      'El skill monorepo elige el ejecutor de tareas y un workspace por lenguaje. Un esquema de API genera un cliente por plataforma, y la CI ejecuta solo las apps afectadas.',
    'History reset':
      'El skill reset-history guarda un bundle de git fuera del repositorio y luego crea un commit desde la rama principal. Pregunta una vez y hace force push con lease.',
    'Rewrite a repo':
      'El skill rewrite-repo anota el comportamiento y prepara una lista de cambios de nombre para el código y la documentación. Termina con un commit nuevo en lugar del historial.',
    'Help on a site':
      'El skill guide-on-site maneja el Chrome de la propia persona con Claude in Chrome. Rellena los campos que conoce y se detiene en cada paso que solo la persona puede dar.',
    'Hung runs':
      'El skill hung-process encuentra en Windows la herramienta que retiene un puerto o un bloqueo. Cierra ese árbol de procesos y repite el paso, o entrega un comando de administrador.',
    'Search setup':
      'El skill seo-setup averigua dónde está el DNS y revisa el sitio en vivo y el repositorio. Luego configura Search Console, Bing y Cloudflare Web Analytics en el navegador.',
    Ads: 'El skill ads-setup recorre los paneles de AdSense y AdMob con la persona conectada. Pone los ID en el código con anuncios de prueba en las builds de depuración.',
    'Google Play release':
      'El skill play-release crea un bundle firmado con un nuevo código de versión y guarda la clave fuera del repositorio. Lo publica en pruebas internas y devuelve el enlace de testers.',
    'Launch in one run':
      'El skill launch pregunta una sola vez los datos comunes. Luego ejecuta en orden los skills de búsqueda, anuncios y Google Play y termina con una tabla de servicios.',
    Marketing:
      'El skill marketing parte del presupuesto y escribe el mensaje y un calendario de lanzamiento. El plan queda en la documentación del repositorio, así la siguiente vez lo retoma.',
    'In-app updates':
      'El skill app-update añade una consulta a las versiones de GitHub al abrir y al volver a la app. Siguen una barra de descarga y una notificación, y el código queda fuera de la build de Play.',
    'Names and domains':
      'Un script revisa cada nombre en 3 extensiones de dominio y en el registro australiano de empresas. También revisa las marcas de IP Australia y no necesita claves de API.',
    'Legal risks':
      'Un script analiza las licencias de las dependencias y los SDK de datos del repositorio. El skill valora cada riesgo en un documento y entrega los arreglos seguros en una PR.',
    'App icons':
      'El agente dibuja 10 iconos SVG planos y muestra un selector en el chat. Luego un script con resvg exporta el elegido a cada tamaño que piden las plataformas.',
    'Demo screenshots':
      'La app corre con datos de demo inventados mientras el agente toma capturas y vídeos cortos. Una lista de tomas en el repositorio deja que la siguiente vez saque las mismas.',
    'Store media':
      'El skill store-media toma las capturas y el icono del repositorio y crea cada tamaño. Los sube en el navegador con la persona conectada y pregunta antes de una revisión.',
    'End to end walk of a release':
      'El skill e2e-walk instala la versión más nueva en un emulador o un móvil y recorre cada flujo de la documentación. Salta cada borrado y guarda la lista de flujos en el repositorio.',
    'Hear and pick a voice':
      'Un script de Python baja cada voz neuronal de Microsoft con edge-tts y guarda los clips en caché. Muestra el ID de cada voz y sigue desde cualquier número.',
    'Reddit comments':
      'El skill trae los hilos populares con el servidor MCP de Reddit y se queda con los que el repositorio puede responder. Playwright escribe el borrador en Chrome, y la persona pulsa Comment.',
    'Voice at the end of a turn':
      'Un hook lee la marca de la última línea y elige el aviso y la frase. edge-tts la dice con un reproductor en C# en Windows y con Node en Mac.',
    Install:
      'Un instalador en POSIX shell enlaza un clon con cada agente que encuentra, con un envoltorio de PowerShell para Windows. Los Git hooks del clon vuelven a enlazar los skills tras cada pull.',
    'Agent hooks':
      'Un script de Node mezcla los grupos de hooks en los ajustes de Claude Code y Codex. También copia los servidores MCP de Claude Code a Codex y Kimi Code.',
    Releases:
      'Un workflow de GitHub Actions arranca cuando las comprobaciones pasan en un push a main. Pone al commit una etiqueta con fecha y escribe las notas a partir de los commits.',
  },
};

export default arch;

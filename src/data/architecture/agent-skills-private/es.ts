import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Skills en Markdown y un archivo de reglas que un instalador de shell enlaza en Claude Code, Codex y Kimi Code. Scripts de apoyo auditan la CI, guardan secretos y montan la pasarela MCP.',
  parts: [
    {
      name: 'Skills en Markdown',
      role: 'los pasos de un trabajo cada uno, cargados cuando una petición nombra ese trabajo.',
    },
    { name: 'Archivo de reglas', role: 'las reglas de trabajo que se cargan en cada turno de cada sesión.' },
    {
      name: 'Instalador de shell',
      role: 'enlaza los skills en cada agente y conecta el archivo de reglas a su configuración.',
    },
    {
      name: 'Plantillas de GitHub Actions',
      role: 'los workflows Checks y Release y la puerta de release que repo-ci copia a un repo.',
    },
    {
      name: 'gh y GraphQL',
      role: 'leen en una llamada los workflows y las listas de secretos de cada repo de la organización.',
    },
    { name: 'Script de PowerShell', role: 'guarda un secreto nuevo en GitHub sin que el agente lo vea.' },
    { name: 'mcpproxy', role: 'un solo servidor pasarela que sustituye a 5 servidores MCP.' },
    {
      name: 'Chequeos en Python y TypeScript',
      role: 'revisan en los skills el frontmatter, los enlaces, las palabras clave y la longitud.',
    },
  ],
  flow: [
    'El instalador enlaza los skills y copia el archivo de reglas en cada agente.',
    'Una sesión carga el archivo de reglas en cada turno.',
    'Una petición que encaja con la descripción de un skill carga ese skill.',
    'El skill maneja gh, scripts y herramientas MCP contra GitHub y las consolas.',
    'El agente entrega el cambio y cierra el turno con una marca de estado.',
  ],
  links: [
    {
      to: 'agent-skills',
      text: 'Los skills públicos se instalan primero, y estos skills toman de ahí las reglas de escritura.',
    },
    { to: 'local-ci', text: 'Las plantillas de repo-ci compilan en los runners que asigna local-ci.' },
    { to: 'ci', text: 'Sus scripts de release siguen las plantillas de repo-ci.' },
    { to: 'Bitwarden', text: 'Cada token va primero a la bóveda y luego a GitHub con el script de rotación.' },
    { to: 'GitHub', text: 'Los skills mueven repos, añaden workflows y guardan secretos con gh.' },
  ],
  design: {
    scale: [
      'Un propietario, 11 skills y las decenas de repositorios de una organización de GitHub que los skills auditan y entregan.',
      'Un archivo de reglas se carga en cada turno de cada sesión, así que es corto y las reglas de cada tarea pasan a skills.',
    ],
    data: [
      'No hay base de datos. Los skills son carpetas Markdown, y el archivo de reglas es un archivo Markdown que el instalador copia en cada agente.',
      'Cada repositorio de app lista sus secretos en .github/secret-rotation.json: el tipo, la página del proveedor y lo que cuesta un valor nuevo.',
    ],
    interfaces: [
      'El script de auditoría lee los archivos de workflow y las listas de secretos de todos los repositorios con una sola llamada gh GraphQL.',
      'El instalador conecta el archivo de reglas a los archivos globales de Claude Code y Codex con un bloque marcado, y Kimi Code lee la misma línea.',
      'Un servidor pasarela sustituye a 5 servidores MCP, así que un agente carga una sola lista de herramientas.',
    ],
    reliability: [
      'El workflow de release compila junto a Checks. Un script de puerta consulta Checks al final, así que un Checks fallido cancela la compilación.',
      'Un Checks posterior inicia la tarea de publicación mediante workflow_run, así que ninguna tarea retiene un runner mientras espera.',
      'Las ejecuciones pasan al PC del propietario cuando se acaban los minutos de la nube, y las tareas esperan en cola mientras está apagado.',
    ],
    security: [
      'El script de rotación lee un valor nuevo de una entrada oculta o de un archivo y lo guarda con gh secret set, así que el agente no lo ve.',
      'Cada token va primero a la bóveda y después a GitHub.',
      'El repositorio es privado, porque nombra las listas de secretos y los runners de la organización. Los skills genéricos están en el repositorio público agent-skills.',
    ],
    performance: [
      'Solo las reglas que necesita cada turno se cargan siempre. Una regla de tarea se carga desde su skill cuando una petición coincide.',
      'La compilación del release guarda sus archivos en caché bajo el id de ejecución, así que la tarea de publicación los reutiliza y ocupa un runner ligero un minuto.',
    ],
    operations: [
      'check.yml y release.yml leen su runner de variables del repositorio, que un enrutador apunta primero a runners en la nube y al PC al final.',
      'Los releases reciben una etiqueta con fecha como v2026.10.30.1 de scripts de shell que las plantillas de repo-ci comparten con el repositorio ci.',
      'mise run test comprueba los skills, el presupuesto de texto, la instalación en un home temporal, la pasarela y los scripts de release.',
    ],
    tradeoffs: [
      'Un repositorio privado junto al público, para que los runners y las listas de secretos de la organización no se publiquen. Cuesta dos clones y dos instaladores.',
      'Reglas de tarea en skills en vez de un archivo de reglas largo, así un turno tranquilo gasta menos tokens. Un skill con descripción débil se omite.',
      'Un manifiesto en cada repositorio de app en vez de una lista central, así un cambio de workflow y su entrada de secreto llegan en una PR. Un repositorio sin manifiesto no tiene rotación.',
    ],
  },
  features: {
    'Move a repo':
      'El skill move-repo hace que el agente encuentre con gh cada enlace a la dirección vieja. Luego transfiere el repo, lo hace privado y pasa la CI al runner propio.',
    'CI and releases for every repo':
      'Un script de shell lee en una llamada GraphQL los workflows de cada repo de la organización. El skill repo-ci añade luego los Checks y Release que faltan desde sus plantillas.',
    'Rotate secrets':
      'Un script de PowerShell lee la lista de secretos de cada repo y guarda cada valor nuevo con gh. La persona copia el valor, así que el agente no lo ve.',
    'Workflow rules':
      'Un archivo de reglas en Markdown se carga en cada turno de Claude Code, Codex y Kimi Code. Nombra el skill que carga cada trabajo.',
    'MCP gateway':
      'mcpproxy corre los 5 servidores detrás de un solo servidor stdio, y cada sesión tiene su propia carpeta de datos. El agente busca una herramienta y luego la llama.',
    Releases:
      'Un workflow de release arranca cuando el workflow check pasa en main. Dos scripts de shell eligen la etiqueta con fecha y escriben las notas.',
    'Feature queue':
      'Cada sesión escribe un archivo de reserva en un tablero en la carpeta personal de este PC. Una sesión cuyos archivos se cruzan espera y vuelve a mirar.',
  },
};

export default arch;

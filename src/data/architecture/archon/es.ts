import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un servidor de Node en el PC sirve una página web a una ventana de app de Edge. El servidor lee los repos y las ejecuciones, y abre una consola con un agente de código para cada tarea.',
  parts: [
    { name: 'Node 24', role: 'corre el servidor en TypeScript, sin paquetes ni paso de compilación.' },
    { name: 'Página web', role: 'un módulo por pestaña, mostrado en una ventana de app de Edge en el PC.' },
    { name: 'Agentes de código', role: 'Claude Code, Codex o Kimi Code, en una consola por tarea.' },
    { name: 'adb', role: 'instala y abre las apps en un teléfono o una TV conectados.' },
    { name: 'Archivos de datos JSON', role: 'los repos, las apps y las tareas de agente que lista Archon.' },
    { name: 'Tailscale', role: 'publica Archon dentro del tailnet para que el teléfono pueda abrirlo.' },
    { name: 'Scripts de PowerShell', role: 'restauran un PC y mueven el espacio de trabajo a otra carpeta.' },
    {
      name: 'Páginas enmarcadas',
      role: 'la página de estado de CI, Reddit Desk y el indexador de Memories en pestañas.',
    },
  ],
  flow: [
    'La persona marca repos y elige una tarea, o dice una orden.',
    'La página envía la elección al servidor local.',
    'El servidor escribe un archivo batch y abre una consola con el agente.',
    'El agente trabaja en el repo y escribe una marca de fin.',
    'Cada 5 segundos la página consulta las ejecuciones y muestra el avance.',
  ],
  links: [
    { to: 'local-ci', text: 'La pestaña CI enmarca su página de estado y la arranca si está apagada.' },
    { to: 'reddit-desk', text: 'La pestaña Reddit enmarca la ventana de la app por HTTP local.' },
    { to: 'memories', text: 'La pestaña Memories muestra el avance de su indexador de fotos.' },
    { to: 'songfactory', text: 'La pestaña Songs lanza las fichas de su cadena y muestra cada ejecución.' },
    {
      to: 'agent-skills-private',
      text: 'Sus reglas y skills fijan cómo entrega un cambio cada agente que lanza Archon.',
    },
  ],
  design: {
    scale: [
      'El PC de un desarrollador, unas decenas de repositorios y de 5 a 10 agentes a la vez.',
      'El registro de ejecuciones guarda las últimas 200, y el resto son listas JSON pequeñas, así que no hace falta una base de datos.',
    ],
    data: [
      'Listas JSON nombran los repositorios, las apps y las tareas de agentes que muestra Archon.',
      'runs.json en la carpeta de datos locales de la app guarda cada ejecución con su inicio, su fin y su resultado.',
      'El TODO.md de cada repositorio y los archivos de sesión de los agentes se leen en su sitio, y Archon no guarda copia.',
    ],
    interfaces: [
      'server.ts asigna cada ruta a una función: las lecturas responden al GET con JSON, y las acciones responden al POST con una línea de texto.',
      'Una ejecución en consola termina con una marca done o failed que lee el registro.',
      'Otras herramientas están tras adb, git, la API de releases de GitHub y los registros de npm, crates.io y PyPI. Algunas pestañas enmarcan páginas locales por HTTP.',
    ],
    reliability: [
      'El servidor sigue activo hasta cerrar sesión, así que las ejecuciones y las actualizaciones continúan con todas las ventanas cerradas.',
      'Un segundo inicio encuentra el puerto ocupado y abre una ventana más en el mismo servidor.',
      'La página arranca con sus propios catálogos, así que los botones de pestaña funcionan sin conexión, y una pestaña que no cargó reintenta en el siguiente clic.',
    ],
    security: [
      'El servidor escucha solo en el bucle local, y el móvil llega a él por Tailscale dentro del tailnet.',
      'Una acción exige el tipo JSON, así que una página de otro sitio no puede hacer un POST sin preflight, que el servidor no responde.',
      'Ask Archon no alcanza el borrado de ramas ni la rotación de claves. La pestaña Keys muestra la antigüedad de cada secreto, no su valor.',
    ],
    performance: [
      'La página consulta las ejecuciones cada 5 segundos en archivos pequeños, así que no hace falta un canal push.',
      'El tiempo restante de una ejecución es la mediana de las ejecuciones terminadas del mismo tipo.',
      'Las sincronizaciones de repositorios y los escaneos de paquetes tratan 8 repositorios a la vez.',
    ],
    operations: [
      'Cada 2 minutos el actualizador trae main e instala las compilaciones de escritorio más nuevas. El código nuevo de Archon reinicia el servidor y recarga la página.',
      'Un acceso directo oculto en la carpeta de inicio arranca el servidor al iniciar sesión, sin ventana.',
      'mise run test comprueba que los catálogos en inglés y ruso tienen las mismas claves y luego lanza el ejecutor de pruebas de Node.',
    ],
    tradeoffs: [
      'Una página web local en vez de Tauri, porque corre solo sobre Node y se abre en el móvil. Necesita Edge para la ventana de la app y la voz.',
      'Sin paquetes ni paso de compilación, así que git pull es todo el despliegue. El enrutado está escrito a mano.',
      'Una consola visible por ejecución de agente en vez de ejecuciones sin interfaz, para que la persona pueda mirar y responder preguntas.',
    ],
  },
  features: {
    'Ask Archon':
      'Edge convierte la voz en texto. Luego Claude Code con Haiku elige una acción del lanzador, y el servidor la ejecuta y abre su pestaña.',
    'Runs strip':
      'El servidor lleva un registro de ejecuciones y lee la marca de fin de cada una. El tiempo restante es la mediana de ejecuciones pasadas del mismo tipo.',
    Apps: 'Las tarjetas salen de una lista JSON y de las últimas compilaciones en el repo de releases del estudio. adb las instala y las abre en el teléfono o la TV.',
    'Ads on this phone':
      'Un script envía por adb un enlace de desbloqueo a cada app del estudio. Una clave que coincide marca el teléfono en el almacenamiento de la app y fija el interruptor de anuncios.',
    'To do':
      'El servidor lee los puntos abiertos de cada archivo TODO.md. Los puntos marcados van a una consola de agente en su repo.',
    Sessions:
      'El servidor lee los archivos de sesión de la app de Claude y las sesiones de Codex y Kimi Code. Reanudar abre una consola con el agente propio de la sesión.',
    Agents:
      'Los repos con su propósito salen de una lista JSON, y las tareas de otra. Cada repo marcado recibe una consola con el agente en la tarea.',
    Docs: 'El servidor sirve el Markdown de cada repo. La página lo dibuja con marked y los diagramas con mermaid.',
    Rules:
      'El servidor lee los archivos de reglas compartidos y el AGENTS.md de cada repo. Revisa en cada repo los archivos y tareas que piden las convenciones.',
    Branches:
      'git lista las ramas, worktrees y stashes de cada repo con sus PR. Los borrados corren en git, y las fusiones van a un agente.',
    Packages:
      'El servidor recorre los archivos de paquetes de cada repo y pide a npm, crates.io o PyPI la versión estable más nueva. Una actualización va a una consola de agente por repo.',
    'CI, Reddit and Memories':
      'Cada pestaña enmarca una página que sirve otro programa local. Start arranca el programa mientras su página está apagada.',
    Songs:
      'El servidor lee los temas de songfactory y corre cada ficha como proceso hijo. Lee los pasos y el registro de la salida de ese proceso.',
    Voices:
      'La pestaña lista las voces de edge-tts y reproduce una. Use for the agents vuelve a correr el instalador del hook turn-voice con lo elegido.',
    Keys: 'El script rotate-secrets lista cada secreto de CI con su edad. Una renovación abre una consola donde Claude Code corre el skill rotate-secrets.',
    'Archon on the phone':
      'Tailscale serve publica el servidor local dentro del tailnet. El teléfono añade la página a su pantalla de inicio como una app.',
    'Restore a PC':
      'Un script de PowerShell devuelve cada elemento que nombra una lista JSON. Una tarea de chequeo falla si el PC tiene algo que la lista no trae.',
    'Move the workspace':
      'Un script de PowerShell corre desde una copia temporal y mueve la carpeta. Luego arregla cada sitio que nombra la ruta vieja, de los enlaces de worktree a las tareas programadas.',
    'Sync the repos':
      'Un script de Node clona cada repo de la lista JSON que falta en la carpeta. Actualiza el resto con git, 8 a la vez.',
  },
};

export default arch;

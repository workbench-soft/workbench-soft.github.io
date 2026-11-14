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

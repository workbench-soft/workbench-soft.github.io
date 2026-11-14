import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Scripts en PowerShell y POSIX sh preparan un PC con Windows o un Mac y lo registran como runners de GitHub Actions. Una página de Next.js en el PC muestra los runners y las ejecuciones, y su servidor reparte y cancela los jobs.',
  parts: [
    {
      name: 'Instaladores en PowerShell y sh',
      role: 'preparan las herramientas de desarrollo con winget o Homebrew y mise.',
    },
    {
      name: 'Runner de GitHub Actions',
      role: 'toma los jobs de CI de la organización, varios por PC con un carril para builds pesados.',
    },
    {
      name: 'Programador de tareas de Windows',
      role: 'arranca los runners y la página al iniciar y lanza la actualización cada 5 minutos.',
    },
    { name: 'Next.js', role: 'la página de estado local, cuyas server actions paran ejecuciones e instalan APK.' },
    {
      name: 'API REST de GitHub',
      role: 'da a la página sus ejecuciones y releases, leídas con ETag para cuidar el límite.',
    },
    { name: 'adb', role: 'instala un APK de release en el teléfono conectado por USB.' },
    { name: 'Blacksmith y Oracle Cloud', role: 'los runners gratis en la nube que toman jobs antes que el PC.' },
    { name: 'Gráficos SVG', role: 'dibujados en el servidor con 90 días de ejecuciones guardados en un archivo JSON.' },
  ],
  flow: [
    'Un push a un repo de la organización pone jobs en cola en GitHub.',
    'El servidor de la página dirige cada repo a un runner en la nube o a este PC.',
    'Un runner toma el job que encaja con sus etiquetas.',
    'El servidor de la página lee las ejecuciones y para las reemplazadas.',
    'Cada 15 segundos la página muestra los jobs, las releases y los motivos de parada.',
  ],
  links: [
    {
      to: 'GitHub Actions',
      text: 'Las máquinas se registran como runners de la organización, y la página lee la API.',
    },
    { to: 'archon', text: 'La pestaña CI de Archon muestra la página de estado en un marco.' },
    {
      to: 'ci',
      text: 'Los jobs que llaman a su paso de preparación en este PC copian paquetes del almacén compartido.',
    },
    {
      to: 'agent-skills-private',
      text: 'Sus plantillas de repo-ci leen las variables de runner y fijan las reglas de cancelación.',
    },
    { to: 'Blacksmith', text: 'Runners en la nube para jobs ligeros y pesados mientras duren los minutos gratis.' },
  ],
  features: {
    'Mac setup':
      'Un script de POSIX sh instala herramientas de Homebrew, mise y la configuración del shell. Luego ajusta git y clona los repos de la organización. Una segunda pasada salta lo que ya está.',
    'Windows setup':
      'Un script de PowerShell instala las mismas herramientas con winget y mise, con Python y una caché de compilación de Rust. Salta las piezas solo para Mac y lo que ya está.',
    'Self-hosted CI runner':
      'Los scripts descargan el runner de GitHub, comprueban su SHA256 y registran 4 runners en Windows. Los 2 primeros toman los jobs de Gradle, Cargo y Tauri.',
    'Start button':
      'Un doble clic lleva la copia a la release más nueva y vuelve a correr los instaladores que cambiaron. Luego arranca las tareas de runners y página y abre la página.',
    'CI status page':
      'Un servidor Next.js lee runners, ejecuciones y jobs de la API de GitHub y de las carpetas de runners del PC. Las barras de progreso salen de las 10 últimas ejecuciones terminadas.',
    'Build cancellation':
      'La concurrency de los workflows cancela ejecuciones viejas en GitHub. Cada 10 segundos el servidor de la página también para una ejecución reemplazada y una release con Checks fallidos, y anota la causa en un archivo.',
    'Cloud runners first':
      'El servidor de la página cuenta los minutos gratis de Blacksmith y GitHub. Fija una variable de runner en cada repo privado, y sin ella los jobs vuelven a las etiquetas del PC.',
    Releases:
      'Las server actions lanzan el workflow de release de una app o compilan su APK desde main en un clon temporal. Luego adb instala el APK en el teléfono conectado.',
    'Updates by themselves':
      'Una tarea programada corre cada 5 minutos y al iniciar sesión. Lleva la copia a la última etiqueta de release y solo vuelve a correr los instaladores cuyos archivos cambiaron.',
    Sites:
      'Una vez por hora la página lee los workflows de cada repo y encuentra el que despliega un sitio. El botón lo lanza en main.',
    'CI trends':
      'Cada 10 minutos el servidor de la página lee las ejecuciones terminadas y guarda 90 días en un archivo JSON. Dibuja los gráficos como SVG en el servidor.',
  },
};

export default arch;

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
  design: {
    scale: [
      'Un PC y un Mac atienden los repositorios privados de una organización, con 4 runners por defecto en el PC.',
      'El límite de GitHub de 5000 llamadas a la API por hora marcó el sondeo, después de que la página lo agotara un día.',
      'Blacksmith da 3000 minutos gratis al mes, así que el enrutador deja de usarlo en 2700.',
    ],
    data: [
      'La página guarda 90 días de ejecuciones terminadas en un archivo JSON, y cloud-usage.json cuenta los minutos de Blacksmith.',
      'El número de runners está en un archivo runner-count en la carpeta personal. La ruta está en 3 variables de repositorio: CI_RUNNER, CI_HEAVY_RUNNER y CI_WINDOWS_RUNNER.',
    ],
    interfaces: [
      'La API REST de GitHub da los runners, las ejecuciones, los jobs, la facturación y los releases, y la página fija con ella las variables de repositorio.',
      'El runs-on de un job lee una variable de repositorio, con las etiquetas del PC como respaldo, y un runner toma el job cuyas etiquetas coinciden.',
      'Las acciones de servidor ejecutan PowerShell y adb, y adb instala un APK de release en un móvil conectado por USB.',
    ],
    reliability: [
      'Un vigilante reinicia una tarea de runner cuyo runner GitHub muestra sin conexión durante más de 10 minutos.',
      'Un job en cola en Blacksmith durante 5 minutos se cancela y se relanza en el siguiente runner.',
      'Las variables conservan su último valor mientras el PC está apagado, y una variable sin definir vuelve a las etiquetas del PC.',
      'Un bloqueo de instalación impide que la tarea de actualización y START.cmd ejecuten instaladores a la vez.',
    ],
    security: [
      'Los runners arrancan como tarea programada de la persona, no como servicio, para que los jobs vean su sesión de gh y su configuración de mise.',
      'La descarga del runner se comprueba contra su SHA256 antes de registrarlo.',
      'Este repositorio es público, así que su propio CI corre en runners de GitHub. Un PR de fork en el runner del PC ejecutaría su código en el PC.',
    ],
    performance: [
      'El servidor envía If-None-Match, porque un 304 no gasta nada del límite, y comparte cada respuesta 20 segundos entre pestañas.',
      'Los 2 primeros runners llevan la etiqueta heavy, para que los jobs de Gradle, Cargo y Tauri no se arrastren cuando corren 8 a la vez.',
      'El panel se compila en la carpeta que la página en marcha no sirve, así que la página solo se detiene para el cambio.',
    ],
    operations: [
      'La tarea de actualización corre cada 5 minutos y al iniciar sesión, mueve el checkout a la etiqueta de release más nueva y repite solo los instaladores cuyos archivos cambiaron.',
      'Release arranca tras Checks mediante workflow_run, y unos Checks fallidos cancelan la compilación.',
      'El servidor de la página detiene cada 10 segundos las ejecuciones que un commit más nuevo reemplazó, y anota la causa de cada una.',
    ],
    tradeoffs: [
      'Runners propios en vez de los de GitHub, para que los repositorios privados cuesten 0 minutos. El CI se para cuando el PC está apagado.',
      'Variables de repositorio en vez de un job de ruta por workflow, que añadiría un job más a cada ejecución.',
      'Una tarea programada en vez de un servicio de Windows, al que le faltan el mise y la sesión de gh de la persona. La página reconoce un runner vivo por sus archivos de registro.',
      'Una página de servidor en Next.js en vez de Grafana, con gráficos SVG de su propio historial. No tienen zoom.',
    ],
  },
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

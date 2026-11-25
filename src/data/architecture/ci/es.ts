import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un repo privado de GitHub con pasos compartidos que cada repo de la organización llama desde sus propios workflows. Una acción compuesta instala las herramientas, y workflows reutilizables fusionan los PR de Dependabot y compilan para el simulador de iPhone.',
  parts: [
    {
      name: 'Acción compuesta',
      role: 'el paso de preparación que corre dentro del job de quien llama e instala las herramientas y paquetes fijados.',
    },
    { name: 'mise', role: 'instala cada herramienta en la versión que fija el repo.' },
    {
      name: 'pnpm',
      role: 'instala los paquetes desde el lockfile y en Windows los copia en lugar de usar enlaces duros.',
    },
    {
      name: 'Workflows reutilizables',
      role: 'la fusión de Dependabot y la compilación para el simulador de iOS que llama cada repo de app.',
    },
    { name: 'Script de Node', role: 'lista las piezas solo para Android de una app que no tienen plan para iOS.' },
    {
      name: 'Runner de macOS y Maestro',
      role: 'compilan la app para el simulador de iPhone y recorren sus flujos de prueba.',
    },
    {
      name: 'Scripts de release',
      role: 'scripts de shell que eligen la etiqueta con fecha y escriben las notas a partir de los commits.',
    },
  ],
  flow: [
    'Un workflow de un repo de app llama a un paso de aquí en main.',
    'GitHub carga el paso desde este repo para esa ejecución.',
    'El paso de preparación instala las herramientas fijadas y luego los paquetes.',
    'Los checks propios de quien llama siguen en el mismo job.',
    'Un arreglo fusionado aquí llega a cada repo en su próxima ejecución.',
  ],
  links: [
    { to: 'GitHub Actions', text: 'Cada repo de la organización llama a estos pasos desde sus propios workflows.' },
    {
      to: 'local-ci',
      text: 'En los runners del PC el paso de preparación copia paquetes del almacén compartido para evitar bloqueos de archivos.',
    },
    { to: 'agent-skills-private', text: 'Los scripts de release siguen las plantillas de CI de su skill repo-ci.' },
    {
      to: 'Dependabot',
      text: 'Sus PR se fusionan con el workflow compartido, y una actualización mayor espera a una persona.',
    },
  ],
  design: {
    scale: [
      'Un propietario y las decenas de repositorios de apps de una organización de GitHub, cada uno llamando a los mismos pocos pasos desde sus workflows.',
      'Un arreglo aquí llega a cada llamador en su próxima ejecución, así que una mala fusión puede romperlos a todos.',
    ],
    data: [
      'No hay base de datos. El estado es una etiqueta con fecha, un formato de asunto de commit y el mise.toml que fija cada herramienta.',
      'La etiqueta es v<yyyy.mm.dd>.<n>, y las notas ordenan los commits feat, fix y perf según asuntos con la forma type(scope)!: text.',
    ],
    interfaces: [
      'El paso de preparación es una acción compuesta que un llamador ejecuta con uses, y corre dentro del job del llamador.',
      'La fusión de Dependabot y la compilación del simulador de iOS son workflows reutilizables que reciben la lista de workflows a lanzar en main.',
      'La fusión automática parte de pull_request_target, y la comprobación de iOS es un script de Node con resultado de aprobado o fallido.',
    ],
    reliability: [
      'El job de fusión solo corre si dependabot[bot] abrió la PR y originó el evento, y se detiene ante una PR ya fusionada o cerrada.',
      'En los runners del PC, pnpm copia los paquetes desde un almacén compartido, porque un enlace duro borrado hacía fallar otras lecturas con EBUSY.',
      'Cada job tiene su propia carpeta de shims de mise, así un proceso en marcha que sujeta el uvx.exe compartido no bloquea la actualización de una herramienta.',
    ],
    security: [
      'El repositorio es privado, y su acceso de Actions está fijado a la organización para que los llamadores carguen los workflows.',
      'pull_request_target corre desde main con un token de escritura, así que solo se fusionan las PR del propio Dependabot, y una actualización mayor espera a una persona.',
    ],
    performance: [
      'Las instalaciones de herramientas se comparten entre los jobs de un runner, y solo se rehace la pequeña carpeta de shims en cada job.',
      'pnpm instala desde el lockfile sin paso de resolución, y la comprobación de iOS va primero, así un mal plan falla antes de que empiecen los minutos de Mac.',
    ],
    operations: [
      'Lint corre en cada push a main. El workflow de release arranca con workflow_run tras un Lint correcto y pone una etiqueta con fecha en el commit.',
      'Un push solo de Markdown omite Lint, así que no tiene release.',
      'mise run test crea un repositorio git desechable y comprueba los dos scripts de release, y Vitest cubre ios-check.',
    ],
    tradeoffs: [
      'Los llamadores usan @main en vez de una etiqueta fija, así un arreglo llega a todas partes. Un repositorio que deba esperar fija una etiqueta de release.',
      'Una acción compuesta en vez de un workflow reutilizable para la preparación, así las comprobaciones del llamador siguen en el mismo job.',
      'Fusionar al abrir y comprobar en main en vez de esperar las comprobaciones de la PR, porque los repositorios de la organización no las ejecutan. Una mala actualización llega antes a main.',
      'Un runner de macOS para la compilación de iPhone, porque los runners del PC son Windows. Un minuto de macOS cuenta como 10, así que los llamadores lo lanzan a mano o en el release.',
    ],
  },
  features: {
    'Setup step':
      'Una acción compuesta ejecuta mise para las herramientas fijadas y luego pnpm instala desde el lockfile. Corre dentro del job de quien llama, así que sus checks van detrás.',
    'Dependabot details':
      'La acción de metadatos de Dependabot lee el tipo de actualización de cada PR. El job de fusión lo usa para dejar una actualización mayor a una persona.',
    'Dependabot auto merge':
      'Un workflow reutilizable fusiona con squash un PR de Dependabot en cuanto se abre y luego lanza los checks en main. Solo se fusiona así un PR que Dependabot abrió y subió.',
    Releases:
      'Un workflow de release arranca cuando Lint pasa en un push a main. Dos scripts de shell eligen la etiqueta con fecha y escriben las notas desde la última etiqueta.',
    'iOS check and simulator build':
      'Un script de Node busca piezas solo para Android en los paquetes, módulos nativos y archivos de Gradle. Luego un workflow reutilizable compila en un runner de macOS de GitHub, y Maestro toma las capturas.',
    'Affected step':
      'Una acción compuesta compara el push con la última ejecución verde en main para las comprobaciones, o con la última etiqueta para una versión. Luego cruza los archivos con las rutas de affected.json.',
  },
};

export default arch;

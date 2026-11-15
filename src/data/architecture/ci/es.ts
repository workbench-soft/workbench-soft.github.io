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
  },
};

export default arch;

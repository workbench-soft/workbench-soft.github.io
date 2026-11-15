import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una herramienta de línea de comandos en TypeScript que Node ejecuta en Windows sin bundle. Cada comando arma un plan de movimientos desde una config privada, y un solo módulo aplica cada plan.',
  parts: [
    { name: 'Node', role: 'ejecuta los archivos TypeScript tal cual.' },
    { name: 'zod', role: 'revisa el archivo de config con carpetas y reglas antes de cada pasada.' },
    {
      name: 'Recorrido de archivos',
      role: 'lista archivos con tamaño y fecha, 64 a la vez, y cuenta cada ruta una sola vez.',
    },
    {
      name: 'Módulos de reglas',
      role: 'convierten la config en movimientos para copias, archivos prescindibles, orden por temas y la bandeja mensual.',
    },
    {
      name: 'Comprobaciones del plan',
      role: 'detienen un plan con un choque, una ruta repetida o una copia guardada antes del primer movimiento.',
    },
    { name: 'Movedor', role: 'crea carpetas, renombra si hay choque y registra cada movimiento antes del siguiente.' },
    { name: 'Archivos CSV', role: 'el plan y el registro, con BOM para que Excel lea nombres en cirílico.' },
  ],
  flow: [
    'La persona lanza un comando con mise, a menudo primero en prueba.',
    'La herramienta lee y revisa la config privada.',
    'Recorre las carpetas y arma una lista de movimientos.',
    'El plan va a un CSV que la persona puede editar.',
    'El movedor aplica el plan y registra cada movimiento para deshacerlo.',
  ],
  links: [{ to: 'GitHub', text: 'Ejecuta las comprobaciones en cada push a main y publica una versión con notas.' }],
  design: {
    scale: [
      'El PC de un desarrollador y sus recursos de red, y cada ejecución abarca las carpetas de una config.',
      'Un recurso grande marcó el diseño. El hash va por etapas, y cada 5 segundos se imprime una línea de progreso con el tiempo restante.',
    ],
    data: [
      'Una config JSON fuera de git guarda las carpetas y las reglas. El repo trae config.example.json con rutas inventadas.',
      'Cada ejecución escribe un CSV de plan con From, To y una columna Keep opcional, y un registro de movimientos con From, To y Time.',
      'El comando inventory escribe un informe Markdown con recuentos, tamaños, años, tipos de archivo y copias probables.',
    ],
    interfaces: [
      'Una línea de comandos con inventory, move, undo, dupes, candidates, sort e inbox, leída con node:util parseArgs.',
      'El CSV de plan es el contrato entre los comandos y el movedor, así que una persona puede editarlo y aplicarlo con move.',
      'Cada CSV empieza con una marca de orden de bytes UTF-8, para que Excel y PowerShell 5.1 lean bien los nombres en cirílico.',
    ],
    reliability: [
      'Una ejecución se detiene si no puede escribir su registro, así cada movimiento sigue siendo reversible. La fila entra en el registro antes del siguiente movimiento.',
      'Entre unidades, un movimiento copia primero y borra después, así que una copia fallida deja el origen intacto.',
      'Un duplicado cuya copia guardada desapareció se queda en su sitio, y la ejecución termina con 1 si falta una copia guardada después.',
    ],
    security: [
      'La herramienta no borra ningún archivo. Un borrado lo mueve a la cuarentena con su unidad y su ruta.',
      'inventory, candidates, sort e inbox solo leen nombres, tamaños y fechas. dupes lee el contenido solo para calcular el hash.',
      'Lee la config local y los archivos, no llama a ninguna red y no guarda ningún token. Las rutas reales quedan fuera de git.',
    ],
    performance: [
      'dupes agrupa por tamaño, calcula el hash del primer 1 MB y lee completos solo los archivos que aún coinciden.',
      'El recorrido lee los datos de archivo de 64 en 64 y cuenta cada ruta una vez, así que las raíces solapadas salen baratas.',
      'El hash lee 4 archivos a la vez e informa de archivos, gigabytes, porcentaje y tiempo restante.',
    ],
    operations: [
      'Node 24 ejecuta los archivos TypeScript tal cual, sin bundle, y mise lanza cada comando y tarea.',
      'Las comprobaciones corren en cada push a main, y Release publica una versión de GitHub cuando pasan. Las ejecuciones en pull request están desactivadas.',
      'Un hook de husky antes del push lanza el lint y las pruebas. Las pruebas crean carpetas temporales y no tocan las reales.',
    ],
    tradeoffs: [
      'Cuarentena en vez de borrar o usar la papelera, para que una regla errónea cueste solo un movimiento de vuelta, a costa de que el espacio se libere cuando la persona vacía la cuarentena.',
      'Un solo módulo de plan para todos los comandos en vez de comprobaciones en cada uno, para que una copia guardada o un movimiento en conflicto detenga la ejecución en un solo lugar.',
      'Una config privada fuera de git en vez de reglas en el repo, para que los nombres de carpetas se queden en el PC, a costa de copiarla a mano a un PC nuevo.',
      'TypeScript sobre Node en vez de los primeros scripts de PowerShell, para tener pruebas y rutas en la config.',
    ],
  },
  features: {
    'Folder report':
      'El recorrido lee nombres, tamaños y fechas de las carpetas listadas. La herramienta escribe los conteos, años, tipos y copias probables en un archivo Markdown.',
    'Duplicates to quarantine':
      'Los archivos del mismo tamaño reciben un hash de su primer 1 MB, luego un SHA-256 completo. Reglas de ruta ordenan cada copia, y queda la mejor situada.',
    'Files safe to drop':
      'Cada regla compara un nombre, una ruta o una edad y nombra una categoría de cuarentena. Un patrón de protección gana a cada regla.',
    'Sort into topic folders':
      'Una tarea de orden tiene reglas para carpetas y archivos con un destino para cada una. Lo que no coincide va a una carpeta de reserva, como una por año.',
    'Monthly inbox':
      'La herramienta lee las fechas de las entradas de la carpeta de entrada. Las de más de 30 días van a una carpeta con el nombre de su mes.',
    'Plans, moves and undo':
      'Cada pasada escribe un CSV del plan y un registro. El movedor revisa el plan antes del primer paso, y deshacer lee el registro y devuelve los archivos desde el final.',
  },
};

export default arch;

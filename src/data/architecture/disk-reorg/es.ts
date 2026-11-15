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

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un Cloudflare Worker en TypeScript habla los métodos WebDAV que envía Memories. Un solo Durable Object guarda los archivos en su almacenamiento SQLite, en el plan gratuito.',
  parts: [
    { name: 'Cloudflare Worker', role: 'comprueba el inicio de sesión Basic y pasa cada petición WebDAV.' },
    {
      name: 'Durable Object',
      role: 'un solo almacén para el árbol entero, con archivos en trozos de 1 MB en su SQLite.',
    },
    {
      name: 'Archivos estáticos',
      role: 'llevan las fotos de muestra con el Worker y llenan el almacén en cada arranque.',
    },
    {
      name: 'Script de muestras en Python',
      role: 'dibuja las 42 fotos sintéticas y los 2 vídeos con fechas EXIF y GPS.',
    },
    { name: 'Disparador cron', role: 'borra la capa de subidas cada noche a las 03:00 UTC.' },
  ],
  flow: [
    'La app envía una petición WebDAV con un inicio de sesión Basic.',
    'El Worker comprueba el acceso y pasa la petición al Durable Object.',
    'Una lectura mira primero en la capa de subidas y luego en las muestras.',
    'La app recibe la lista de la carpeta o los bytes del rango pedido.',
  ],
  links: [
    { to: 'memories', text: 'El revisor de Google Play escribe este servidor en la pantalla de conexión de Memories.' },
    { to: 'Google Play', text: 'Las notas de App access dan al revisor la dirección y el acceso.' },
    {
      to: 'Cloudflare',
      text: 'Lo ejecuta el plan gratuito de Workers, y la CI lo despliega cuando pasan las pruebas.',
    },
  ],
  design: {
    scale: [
      'Una biblioteca de demostración compartida para los revisores de Google Play: 42 fotos, 2 vídeos y un solo acceso.',
      'Un único Durable Object recibe todas las peticiones, así que todos los revisores comparten una copia en el plan gratuito de Workers.',
    ],
    data: [
      'Los archivos van en bloques de 1 MB en el almacenamiento SQLite del Durable Object, por debajo del tope de 2 MB por fila.',
      'Las muestras de base/ quedan de solo lectura. Las subidas y carpetas de un cliente van a Uploads/, con marcas para borrados y movimientos.',
      'Un archivo JSON guarda la fecha EXIF de cada muestra, que PROPFIND da como fecha de modificación.',
    ],
    interfaces: [
      'WebDAV solo en lo que la app necesita: OPTIONS, PROPFIND con profundidad 0 o 1, GET y HEAD por rango, PUT, MKCOL, MOVE y DELETE.',
      'LOCK responde 405 y PROPFIND con profundidad infinita responde 403.',
      'El Worker pasa cada petición al Durable Object, que ofrece llamadas head, get por rango, put, delete y list.',
    ],
    reliability: [
      'Un cron diario a las 03:00 UTC borra Uploads/, y la demo vuelve a las muestras.',
      'En cada arranque el Durable Object ajusta base/ a la lista de muestras, así que una carga a medias se repara sola.',
      'Un PUT deja de leer pasados 50 MB, y un GET por rango carga solo sus bloques, para quedar dentro de 128 MB de memoria.',
    ],
    security: [
      'Un usuario Basic se comprueba contra un secreto del Worker. OPTIONS responde sin acceso.',
      'Los archivos de muestra son recursos estáticos tras el Worker, así que el acceso también los protege.',
      'Las muestras son sintéticas, así que no se expone ninguna persona ni lugar reales.',
    ],
    performance: [
      'Un GET por rango lee solo los bloques que necesita, así que un archivo de 50 MB no ocupa 100 MB de memoria.',
      'Las fechas de las muestras salen de un archivo JSON, así que PROPFIND no lee EXIF.',
    ],
    operations: [
      'Checks ejecuta lint, comprobación de tipos y pruebas unitarias en cada push a main, y Deploy arranca cuando pasan.',
      'Deploy construye las muestras, lanza el despliegue de wrangler con mise y etiqueta el commit con una versión por fecha.',
      'Se detiene si la carpeta de muestras y la lista de fechas no coinciden, o si falta el token de Cloudflare.',
      'Corre un despliegue a la vez, y uno más nuevo en espera reemplaza a uno más viejo.',
    ],
    tradeoffs: [
      'SQLite en un Durable Object en vez de R2, porque R2 pide una tarjeta de pago y el plan gratuito cubre el Durable Object.',
      'Una capa de escritura sobre muestras de solo lectura en vez de escribir en ellas, así que reiniciar es borrar un prefijo.',
      'Fotos sintéticas en vez de reales, para que un extraño no vea personas ni lugares reales.',
      'Un Worker en TypeScript ahora en vez de Rust, para publicar primero. La pila de la org prevé pasar a workers-rs.',
    ],
  },
  features: {
    'Sample library':
      'Un script en Python dibuja las fotos con fechas EXIF y algunos puntos GPS. Viajan como archivos estáticos y llenan el Durable Object al arrancar.',
    'Sign in':
      'El Worker compara un solo usuario Basic con un secreto del Worker. OPTIONS responde sin inicio de sesión.',
    'Uploads and sorting':
      'Las subidas y los traslados van a una capa aparte sobre las muestras de solo lectura. Un cron nocturno borra esa capa y vuelven las muestras.',
  },
};

export default arch;

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

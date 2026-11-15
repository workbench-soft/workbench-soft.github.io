import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un sincronizador en .NET dentro de Docker en el NAS guardaba la fecha de captura de cada foto en un índice LiteDB. Una app WPF en la bandeja de Windows buscaba en ese índice por fecha y abría los archivos desde el NAS.',
  parts: [
    { name: '.NET', role: 'una sola plataforma para el servicio del NAS y la app de Windows.' },
    { name: 'Docker', role: 'ejecutaba el sincronizador en el NAS junto al archivo de fotos.' },
    { name: 'LiteDB', role: 'el índice de fechas de captura, que la galería leía día a día.' },
    { name: 'WPF', role: 'el icono de la bandeja, la galería y la ventana de foto en Windows.' },
    { name: 'Quartz', role: 'el planificador que lanzaba el recordatorio diario.' },
  ],
  flow: [
    'El sincronizador del NAS leía el EXIF de cada foto.',
    'Escribía la fecha de captura en el índice LiteDB.',
    'Una vez al día una notificación de Windows llamaba a la galería.',
    'La galería buscaba en el índice las fotos del periodo.',
    'Abría los archivos directamente desde el archivo de fotos.',
  ],
  links: [{ to: 'memories', text: 'La app del móvil la sustituyó y heredó la idea de «un día como hoy».' }],
  design: {
    scale: [
      'Una persona y un PC con Windows, que leen el archivo de fotos de un NAS en casa.',
      'El índice solo guarda fechas de captura, así que sigue siendo pequeño junto a las fotos.',
    ],
    data: [
      'LiteDB, una base de documentos embebida, guarda el índice de fechas de captura.',
      'El sincronizador lee el EXIF de cada foto, y la galería abre el índice para cada día del periodo.',
    ],
    interfaces: [
      'El sincronizador del NAS y la app de Windows se encuentran en el índice LiteDB, leído por fecha.',
      'La app abre los archivos de foto directamente desde el archivo del NAS, sin API de servidor entre medias.',
    ],
    reliability: [
      'El sincronizador corría en Docker junto al archivo, así que indexar no necesitaba el PC.',
      'La galería salta los archivos de la papelera y carga el resto al desplazarse.',
    ],
    security: [
      'Sin cuenta ni servicio en la nube: fotos e índice se quedaban en el NAS de casa y el PC.',
      'La app abre el archivo con el acceso a archivos que el PC ya tenía.',
    ],
    performance: [
      'Las fechas de captura se leen una vez en el NAS, así que la galería no tiene que recorrer las fotos.',
      'La galería carga las fotos al desplazarse, un día del periodo cada vez.',
    ],
    operations: [
      'El sincronizador se entregaba como contenedor Docker en el NAS, y la app como programa de Windows.',
      'El repositorio está archivado, porque la app del teléfono lo reemplazó.',
    ],
    tradeoffs: [
      '.NET para las dos partes en vez de dos pilas, así una plataforma cubría el servicio del NAS y la app de Windows.',
      'Un índice construido en el NAS en vez de un escaneo desde el PC, así las fechas estaban listas al abrir la galería.',
      'Reemplazado por la app del teléfono, que lee el NAS por WebDAV y no necesita un PC con Windows.',
    ],
  },
  features: {
    Tray: 'Una ventana WPF vive en la bandeja del sistema. Un clic o el menú del icono abre la galería.',
    'Daily reminder': 'Una tarea de Quartz muestra una notificación de Windows con un botón. El botón abre la galería.',
    'Gallery by period':
      'La galería abre el índice LiteDB de cada día del periodo. Salta los archivos de la papelera y carga el resto al desplazarse.',
    'Photo window':
      'Una ventana WPF muestra una foto en grande. Una tecla pasa al archivo siguiente o anterior del periodo.',
    'Details and map': 'La app lee los datos de la cámara del propio archivo y muestra su lugar en un mapa.',
    Send: 'Los archivos elegidos van a otra app en una sola acción.',
  },
};

export default arch;

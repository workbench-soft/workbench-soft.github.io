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

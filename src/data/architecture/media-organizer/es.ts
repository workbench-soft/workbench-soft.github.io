import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una app de escritorio en Tauri 2 para Windows y macOS. Un backend en Rust escanea, lee fechas, planifica y mueve los archivos, y una webview en React muestra los eventos que envía.',
  parts: [
    { name: 'Tauri 2', role: 'la carcasa de escritorio, con la webview del sistema y un instalador pequeño.' },
    { name: 'Backend en Rust', role: 'toma cada decisión sobre archivos, del escaneo a los traslados y el historial.' },
    {
      name: 'React y Vite',
      role: 'la tabla de archivos, la barra de herramientas y los ajustes, a partir de eventos del backend.',
    },
    { name: 'ExifTool', role: 'un ayudante incluido que lee la fecha, la cámara y el GPS de cada archivo.' },
    { name: 'Crate folder-rules', role: 'las reglas de carpetas por año, lugar y día, compartidas con Memories.' },
    {
      name: 'GeoNames y OpenStreetMap',
      role: 'nombres de lugares y contornos de parques en el instalador para buscar sin red.',
    },
    {
      name: 'tauri-plugin-updater',
      role: 'busca una versión nueva en la release de GitHub y la instala al reiniciar.',
    },
  ],
  flow: [
    'La persona elige una carpeta, y el recorrido en Rust envía sus archivos.',
    'Los procesos de ExifTool leen la fecha y el GPS de cada lote.',
    'El geocodificador sin conexión nombra un lugar para cada punto GPS.',
    'Las reglas de carpetas planean una carpeta y un nombre nuevos por archivo.',
    'La persona confirma, y el backend mueve cada archivo y anota el paso.',
  ],
  links: [
    {
      to: 'memories',
      text: 'La app del móvil y este organizador de fotos comparten la crate de reglas de carpetas y el editor.',
    },
    {
      to: 'GitHub Releases',
      text: 'El instalador y el archivo de actualización están en una release del repo público del sitio.',
    },
  ],
  features: {
    Scan: 'Un recorrido en Rust corre fuera del hilo de la interfaz y envía los archivos por lotes. La tabla los acumula, así una carpeta grande cuesta pocos redibujados por segundo.',
    'Capture dates':
      'Un grupo de procesos de ExifTool sigue abierto y lee cada lote en cuanto el escaneo lo encuentra. Corre con prioridad baja en la mitad de los núcleos.',
    'Places offline':
      'Un extracto de GeoNames y contornos de parques se cargan una vez en una rejilla de 1 grado. Una búsqueda lee solo las celdas cercanas y ningún punto GPS sale del PC.',
    'Plan first':
      'La crate compartida de reglas de carpetas da a cada archivo su carpeta y su nombre como ensayo. La tabla muestra cada plan antes de confirmar.',
    Moves:
      'Un solo módulo en Rust hace cada cambio de archivo, con un renombrado sin reemplazo o una copia verificada. Pausa se detiene tras el archivo en curso.',
    'History, undo and redo':
      'Cada pasada escribe un registro JSONL en la carpeta de datos de la app, una línea por archivo. Deshacer y Rehacer reproducen el registro con las mismas comprobaciones.',
    Settings:
      'El backend guarda el destino, los modos y la casa en un archivo JSON. El idioma elegido queda en el almacenamiento de la webview.',
    'File table':
      'React dibuja una fila por archivo a partir de los eventos del backend. Un doble clic en un lugar abre Leaflet sobre teselas de OpenStreetMap.',
    'Self-update':
      'tauri-plugin-updater lee el archivo de la última release al arrancar y al volver a la ventana. La descarga sigue a Actualizar y la instalación a Reiniciar ahora.',
    'One command install':
      'Un script de PowerShell lee la versión más nueva del archivo de release. Descarga el instalador y lo ejecuta en modo silencioso para el usuario actual.',
  },
};

export default arch;

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
  design: {
    scale: [
      'Una persona en un PC. El tamaño de diseño es una carpeta de 100 000 archivos, así que Rust guarda los registros y la webview solo recibe ids.',
      'Los datos de lugares van en el instalador, como un extracto de GeoNames y contornos de parques. Regenerarlos descarga unos 640 MB.',
    ],
    data: [
      'Los ajustes están en un solo archivo JSON en la carpeta de datos de la app. El historial es un archivo JSONL por ejecución, más un index.json.',
      'Los registros, las fechas y los planes de un escaneo quedan en la sesión de escaneo del backend, así que los comandos reciben ids de archivos y planes.',
      'Los datos de lugares son geodata.tsv.gz (ciudades de 1000 habitantes o más y puntos de interés) y parks.tsv.gz. Ambos se cargan en una cuadrícula de 1 grado.',
    ],
    interfaces: [
      'La webview envía comandos de Tauri como start_scan y start_moves. El backend responde con eventos: scan:files, metadata:results, plan:files y move:file.',
      'ts-rs escribe los tipos de carga de TypeScript desde los modelos de Rust, así que los dos lados de un comando coinciden.',
      'ExifTool recibe una línea por petición, con salida json, lista de etiquetas y rutas absolutas. El actualizador lee latest.json de una release.',
    ],
    reliability: [
      'Un movimiento usa un renombrado sin reemplazo. Una copia entre volúmenes se comprueba por tamaño y bytes antes de que desaparezca el origen.',
      'Un fallo deja el archivo en el origen, en el destino o bajo los dos nombres de un enlace físico, y no se pierde ningún archivo.',
      'Una ejecución escribe una línea de registro al terminar cada paso, y un registro que no se puede escribir detiene la ejecución. Un evento tardío de un escaneo reemplazado se descarta por scan_id.',
    ],
    security: [
      'La webview solo tiene permisos core:default, sin plugin de fs ni de shell. Rust hace cada cambio de archivos.',
      'Un movimiento solo parte de una carpeta elegida en el selector nativo durante esta sesión. Un destino debe estar dentro de la raíz elegida, y se revisa de nuevo antes de cada movimiento.',
      'Ningún punto GPS sale del PC, porque los lugares se resuelven sin conexión. Las rutas de ExifTool se comprueban para que un nombre de archivo no inyecte un comando.',
    ],
    performance: [
      'El recorrido del escaneo corre fuera del hilo de la interfaz y envía los archivos por lotes. La tabla los almacena en búfer, así que una carpeta grande cuesta unos pocos redibujados por segundo.',
      'Los procesos de ExifTool se quedan abiertos y corren con prioridad baja, lo que evita arrancar un proceso por archivo.',
      'Una búsqueda de lugar recorre solo las celdas cercanas de la cuadrícula, y los contornos de parques se prueban con cajas de 64 aristas.',
    ],
    operations: [
      'El backend está en su propio crate junto al crate de la app, así que una release compila un crate diminuto en lugar de 18 000 líneas.',
      'La CI corre en un PC con Windows, así que las releases traen un instalador de Windows y ninguna compilación para macOS. Un Mac la compila con pnpm tauri build.',
      'El actualizador lee latest.json al arrancar, al volver a la ventana y a petición. Descarga tras Update e instala con Restart now.',
    ],
    tradeoffs: [
      'Tauri 2 en lugar de Electron: un instalador más pequeño sobre la webview del sistema y Rust dueño de la lógica de archivos, a costa de que WebView2 y WebKit difieran.',
      'Planificar en Rust en lugar de la webview, la primera versión, que se ralentizaba con carpetas grandes.',
      'Solo disk/safe_fs cambia archivos, impuesto por clippy.toml, en lugar de llamadas a std::fs en cada módulo que podrían sobrescribir un archivo.',
      'GeoNames dentro del instalador en lugar de un geocodificador en línea, así que ningún punto GPS sale del PC y no hay límite de peticiones.',
    ],
  },
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

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una herramienta de comandos en Python corre en el PC con Windows con ffmpeg y la GPU local. Convierte una carpeta de tema en un vídeo de YouTube, y la maneja una ventana de escritorio o Archon.',
  parts: [
    { name: 'Python y uv', role: 'el comando songfactory y sus módulos, lanzados con uv.' },
    { name: 'ffmpeg', role: 'mezcla las canciones, repite el clip y codifica en la GPU con NVENC.' },
    { name: 'numpy y Apollo', role: 'rehacen la banda alta que cortó un códec con pérdida.' },
    { name: 'Claude CLI', role: 'escribe los temas, las letras y el texto de YouTube con la suscripción de Claude.' },
    { name: 'Playwright', role: 'maneja el sitio de Suno en Chromium para crear y bajar las canciones.' },
    { name: 'ComfyUI', role: 'dibuja el clip de fondo en la GPU local a partir de un prompt.' },
    { name: 'YouTube Data API', role: 'sube el vídeo con su miniatura, la etiqueta de IA y la hora de publicación.' },
    { name: 'tkinter', role: 'la ventana de escritorio que limpia o mejora las canciones elegidas en 9 idiomas.' },
  ],
  flow: [
    'Las canciones salen de una carpeta de tema o del bloque de Suno.',
    'ffmpeg limpia cada canción y guarda el original.',
    'ffmpeg une las canciones con fundidos sobre un clip en bucle.',
    'La build escribe los capítulos, la descripción y la miniatura.',
    'La YouTube Data API sube el vídeo con una hora de publicación.',
  ],
  links: [
    {
      to: 'archon',
      text: 'La pestaña Songs de Archon dibuja los bloques y lanza cada uno con el comando songfactory.',
    },
    { to: 'Suno', text: 'Suno crea las canciones, y Playwright las baja.' },
    { to: 'YouTube', text: 'Los vídeos suben por la YouTube Data API, unos 6 al día.' },
    { to: 'Claude', text: 'La Claude CLI escribe el texto con la suscripción y sin cuenta de API.' },
  ],
  design: {
    scale: [
      'Un creador en un PC Windows con GPU. La ejecución diaria sube como máximo unos 6 vídeos.',
      'Cada subida cuesta unas 1600 de las 10 000 unidades diarias de cuota de YouTube, y esa cuota marca el techo.',
      'La GPU local hace unos 5 s de vídeo a 720p por ejecución, así que cada fondo es un clip en bucle.',
    ],
    data: [
      'El estado son archivos en la carpeta del tema: theme.toml guarda los ajustes, out/upload.json marca un tema como hecho, y out/claude.json guarda el texto que escribió Claude.',
      'Un proyecto guarda sus diez fichas en pipeline.json, cada una con kind, enabled y params.',
      'Las canciones limpiadas van a out/clean/ como FLAC, y los originales se quedan. Los secretos están en una carpeta fuera del repositorio.',
    ],
    interfaces: [
      'La CLI tiene los comandos bg, clean, build, upload, publish, run, enhance, clips y los de las fichas. La pestaña Songs de Archon lee songfactory project y ejecuta songfactory tile.',
      'ffmpeg y ffprobe corren como subprocesos, y ComfyUI recibe workflows/loop.json por HTTP con el prompt y la semilla rellenados.',
      'upload.py llama a videos.insert y thumbnails.set de la API de YouTube Data tras un inicio de sesión OAuth de aplicación de escritorio.',
      'progress.py imprime líneas step, file i/n y progress NN% que el lanzador convierte en barras.',
    ],
    reliability: [
      'upload.json se escribe en cuanto YouTube devuelve el id del vídeo, así que una miniatura fallida no causa una segunda subida.',
      'run salta las carpetas que empiezan por _ o por un punto, y sigue con el tema siguiente cuando uno falla.',
      'claude.py es opcional. Una CLI ausente o una llamada fallida imprime una línea, y el tema sigue con el nombre de la carpeta como título.',
      'Una ficha desactivada pasa su entrada, y una ficha de audio toma los archivos de la ficha anterior más cercana que se ejecutó.',
    ],
    security: [
      'El token OAuth de YouTube y los demás secretos están en una carpeta fuera del repositorio.',
      'claude -p corre sin la variable de clave de API, así que factura la suscripción con sesión iniciada y ninguna cuenta de API.',
      'Las subidas fijan containsSyntheticMedia y siguen privadas hasta que Google audite el proyecto.',
    ],
    performance: [
      'h264_nvenc codifica en la GPU cuando el PC la tiene, y libx264 toma el relevo si no.',
      'El clip se repite con -stream_loop y ping-pong, así que un clip de 5 s cubre un vídeo largo sin un renderizado largo.',
      'La limpieza es una llamada de ffmpeg con ganancia fija, highpass, afftdn y un corte dinámico a 7 kHz, sin modelo neuronal.',
      'Un enhance por lotes pasa por un solo proceso de la CLI, así que escribe un solo compare.html para todas las canciones.',
    ],
    operations: [
      'Una tarea programada de Windows ejecuta mise run daily a las 03:00 en el PC que guarda las canciones, el token y la GPU.',
      'checks.yml ejecuta lint, pruebas y uv build en el runner Windows autoalojado con cada push a main.',
      'release.yml compila el wheel y el sdist junto a Checks, y release-gate.sh publica cuando Checks pasa. Un Checks fallido cancela la compilación.',
      'mise run doctor imprime una línea por requisito, ok o MISSING, y como JSON para el lanzador.',
    ],
    tradeoffs: [
      'ffmpeg por línea de comandos en lugar de una biblioteca de vídeo de Python, para que la mezcla, el bucle y la codificación NVENC estén en una sola herramienta, pero los grafos de filtros son cadenas y un error de tecleo se ve al ejecutar.',
      'Un clip corto en bucle en lugar de un clip tan largo como las canciones, porque la GPU hace unos 5 s por ejecución.',
      'Archivos simples por tema en lugar de una base de datos, para que un archivo responda si un tema se subió, pero mover una carpeta pierde su vínculo con la subida.',
      'El Programador de tareas local en lugar de un cron de CI, porque las canciones y el token están fuera de git, pero el PC debe estar encendido a las 03:00.',
    ],
  },
  features: {
    'Audio workbench':
      'Una ventana con tkinter lanza el comando de limpieza o mejora sobre los archivos elegidos. Un control de nombres para el lote antes de que dos salidas choquen.',
    'Tile pipeline':
      'Cada proyecto guarda sus 10 bloques y sus ajustes en un archivo JSON. Un ejecutor pasa a cada bloque la salida del anterior, y Archon dibuja los bloques.',
    'Per-song videos':
      'El módulo de clips reutiliza el tema, la limpieza y el códec para un vídeo en bucle por canción. Si se pide ffmpeg los une con cortes secos.',
    'Install and check the setup':
      'Un script de PowerShell instala mise, las herramientas fijadas y los paquetes. Un módulo de revisión comprueba cada requisito y dice qué arreglar.',
    'Long video from a playlist':
      'ffmpeg mezcla las canciones con fundido y repite el clip hasta la duración del audio. La codificación usa NVENC cuando la GPU lo tiene.',
    'Cleanup of AI artifacts':
      'Una cadena de filtros de ffmpeg fija una ganancia constante y quita el zumbido, el siseo y el brillo fuerte. La copia limpia va a un archivo FLAC junto al original.',
    'Enhance a song':
      'numpy rehace la banda alta a partir de la banda de abajo. El modelo Apollo en la GPU puede hacer el trabajo en su lugar, y una página muestra los dos espectrogramas.',
    'Seamless loop':
      'ffmpeg toca el clip hacia delante y luego hacia atrás antes de repetir. El salto entre el último y el primer fotograma desaparece.',
    'Chapters and thumbnail':
      'Los tiempos de los capítulos salen de la duración de las canciones menos los fundidos. Pillow escribe el título sobre un fotograma del clip.',
    'Scheduled upload':
      'La YouTube Data API sube el vídeo con la etiqueta de IA y una hora de publicación. El Programador de tareas de Windows lanza la build diaria a las 03:00.',
    'Text from Claude':
      'La Claude CLI rellena el título, la descripción y las etiquetas vacíos a partir de los nombres de las canciones. Un archivo de la carpeta de tema guarda la respuesta para la siguiente build.',
    'Background from ComfyUI':
      'La herramienta manda el prompt a un flujo de ComfyUI en la GPU local. El clip que vuelve se convierte en el fondo en bucle.',
  },
};

export default arch;

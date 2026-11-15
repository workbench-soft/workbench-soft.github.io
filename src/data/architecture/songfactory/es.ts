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

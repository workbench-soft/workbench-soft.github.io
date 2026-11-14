import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Shuttrix es una app Expo con pantallas en React Native sobre un módulo de cámara en Kotlin, con CameraX y Camera2. Cada foto se arma y se guarda en el teléfono, sin servidor.',
  parts: [
    {
      name: 'Expo y React Native',
      role: 'la pantalla de cámara, los diales, el modo simple, la galería y los ajustes en TypeScript.',
    },
    {
      name: 'CameraX y Camera2',
      role: 'CameraX lleva el ciclo de vida y los flujos, con valores de Camera2 para los diales manuales.',
    },
    {
      name: 'Módulo de cámara en Kotlin',
      role: 'conecta los objetivos, aplica los diales y pasa cada foto guardada por los pasos del modo.',
    },
    {
      name: 'OpenCV',
      role: 'une la panorámica, alinea el apilado de enfoque macro y dibuja el desenfoque del retrato.',
    },
    { name: 'ML Kit', role: 'lee códigos QR de la vista previa y halla el sujeto del retrato.' },
    {
      name: 'ONNX Runtime',
      role: 'ejecuta en el teléfono un modelo de profundidad para el desenfoque de Retrato y Mini.',
    },
    {
      name: 'Crate de Rust para fotos',
      role: 'revela los fotogramas en bruto del sensor como foto para el interruptor Raw.',
    },
    {
      name: 'MediaStore',
      role: 'guarda cada toma en la carpeta de cámara, donde Memories y otras galerías la encuentran.',
    },
  ],
  flow: [
    'La persona elige un modo y mueve un dial o un deslizador.',
    'La pantalla pasa los valores a la vista de cámara en Kotlin como props.',
    'CameraX y Camera2 los aplican, y los diales muestran los valores de cada fotograma.',
    'Un toque captura la foto, y los pasos del modo corren sobre el archivo.',
    'MediaStore guarda el resultado en la carpeta de cámara, y la galería lo muestra.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Shuttrix vive en el repo de Memories y comparte su editor, su visor y sus nombres de lugares. Memories lee las tomas de la carpeta de cámara.',
    },
    { to: 'app-updater', text: 'WBS Updater instala el mismo APK desde las versiones compartidas.' },
    { to: 'GitHub', text: 'La versión fuera de tienda encuentra su actualización en las versiones públicas.' },
    { to: 'Google Play', text: 'Google Play Billing vende Plus y Quitar anuncios.' },
    { to: 'Google AdMob', text: 'AdMob muestra el banner de la galería tras el formulario de consentimiento.' },
  ],
  features: {
    'Simple and Pro':
      'Los 2 modos manejan una sola vista de cámara. Simple deja el enfoque y la exposición en automático, y Pro se los da a los diales.',
    'Simple mode':
      'React Native dibuja los iconos de objetivo, la barra de zoom y los deslizadores sobre la vista de cámara. Un almacén de ajustes guarda cada valor y lo convierte en props de cámara.',
    Night:
      'El módulo Kotlin usa la extensión Noche de CameraX, que es el proceso nocturno del propio teléfono. Un objetivo sin ella recibe una cadencia lenta con fuerte reducción de ruido.',
    Astro:
      'El módulo toma hasta 24 fotogramas de un cuarto de segundo y los alinea con las estrellas. Luego un paso de tono quita el brillo del cielo y realza las estrellas.',
    Moon: 'Una ráfaga de 2,5 segundos guarda los 8 fotogramas más nítidos alrededor de la Luna y los promedia. Un segundo paso aumenta la nitidez y ajusta los niveles.',
    'Long exposure':
      'Un flujo de fotogramas reúne 3 segundos tomados a pulso y los alinea. La mezcla usa el fotograma más nítido donde la escena quedó quieta.',
    Portrait:
      'ML Kit halla el sujeto en el punto de enfoque, y un modelo de profundidad da las distancias. Luego OpenCV dibuja el desenfoque según la profundidad en el teléfono.',
    Mini: 'Un desenfoque por GPU cubre la foto nítida a través de una máscara en degradado, con color más intenso. Un solo filtro GPU da el mismo aspecto a la vista previa y al vídeo.',
    Macro:
      'La app elige el objetivo trasero que enfoca más cerca y calcula el ancho del encuadre. Un apilado de enfoque en OpenCV une de 6 a 10 fotogramas en una foto nítida.',
    Panorama:
      'El sensor de giro guarda un fotograma cada vez que el teléfono gira lo bastante, hasta 12. OpenCV curva cada uno sobre un cilindro y une las franjas por puntos comunes.',
    'Slow motion':
      'Una sesión de alta velocidad de CameraX graba a la cadencia fija más alta del objetivo. CameraX escribe ella misma el MP4 ralentizado.',
    'Time lapse':
      'Un segundo flujo de fotogramas pasa un fotograma cada medio segundo a un codificador H.264. Cada fotograma recibe una marca de tiempo fija, así la velocidad queda en 15 veces.',
    Lenses:
      'El módulo lee cada objetivo y su rango de la cámara, y un solo factor de zoom elige el objetivo. En la cámara frontal las caras detectadas ajustan el encuadre.',
    Focus:
      'El detector de caras de la cámara encuentra caras en cada fotograma. El módulo apunta el enfoque y la medición a la cara elegida o al punto tocado.',
    'White balance':
      'Camera2 fija los preajustes y las ganancias. Para los kelvin el módulo mide cada preajuste una vez por objetivo y sitúa el valor entre los 2 más cercanos.',
    Exposure:
      'Camera2 fija el ISO y la velocidad a mano o los deja a la exposición automática. El objetivo da el rango de compensación, y el modo automático oscurece las escenas oscuras hasta 2 EV.',
    'Auto tune':
      'Una función pura lee la luz medida y los kelvin del balance de blancos automático. Devuelve los valores de Luz, Calidez y Color para la escena.',
    Color:
      'Camera2 no tiene control de saturación, así que una matriz de color reescribe cada foto guardada. La vista previa recibe la misma matriz como efecto en vivo.',
    'Photo, video and flash':
      'CameraX dispara la foto al tocar con retardo de obturador cero. Mantener pulsado conecta los flujos de vídeo, graba y vuelve a los de foto.',
    'Place and camera tags':
      'El servicio de ubicación de Android mantiene un punto reciente mientras la cámara está abierta. Luego un paso EXIF escribe el lugar, los diales y el rumbo del objetivo en el archivo.',
    'Photo and video size':
      'Los ajustes ofrecen 3 niveles de foto y 4 de vídeo. CameraX recurre al tamaño más cercano que admite cada objetivo.',
    'Photo format and originals':
      'Un módulo de archivos codifica cada foto como WebP, JPEG o PNG y copia sus etiquetas EXIF. Puede guardar el original de la cámara y una copia solo con Color, y RAW añade un DNG.',
    'Multi-frame photo':
      'Un anillo guarda los últimos 5 fotogramas a tamaño completo mientras la cámara funciona. Un toque une los fotogramas previos al contacto, con el más reciente como referencia.',
    'Enhance photos':
      'Con Mejorar activo, un shader de GPU aclara las sombras y da color y nitidez al JPEG guardado. Sin él, Camera2 pide una curva sRGB simple donde la cámara lo permite.',
    'Raw photo (beta)':
      'Una sesión de Camera2 propia guarda los últimos 8 fotogramas en bruto del sensor. Un crate de Rust los alinea y los une, y luego revela la foto en el teléfono.',
    'QR codes':
      'El lector integrado de ML Kit lee cada fotograma de la vista previa en el teléfono. CameraX lleva el recuadro de cada código a la pantalla para las esquinas.',
    Clock:
      'Una capa de React Native dibuja la hora en la franja que deja la barra de estado oculta. Un temporizador salta cada minuto, y los toques pasan a la vista previa.',
    Gallery:
      'La galería lista las tomas que la app guardó con MediaStore y agrupa las versiones de una foto. El menú para compartir de Android envía los archivos elegidos.',
    Plus: 'Google Play Billing vende la compra única, y la app la comprueba al abrir la galería por primera vez. Un modo bloqueado abre la hoja de Plus con el precio de Google Play.',
    Ads: 'AdMob muestra un banner bajo la cuadrícula de la galería y pide el consentimiento al abrirla por primera vez. La misma comprobación de Google Play lo oculta tras Quitar anuncios o Plus.',
    'Edit photos':
      'El paquete de editor compartido del repo de Memories corre dentro de un componente Expo DOM. El módulo Kotlin guarda el resultado sobre el archivo o como un JPEG nuevo, con sus metadatos.',
    'Quick start':
      'La app responde a los intents de cámara de Android, así que una doble pulsación del botón de encendido la abre. Un mosaico de ajustes rápidos y una actividad sobre la pantalla de bloqueo la abren también bloqueado.',
    Updates:
      'Un paquete de actualización compartido revisa las versiones de GitHub al abrir y en cada regreso. La versión de Google Play lo cambia por un sustituto sin revisión.',
    Languages:
      'i18next guarda un catálogo por idioma, y una prueba revisa cada clave. El módulo de cámara guarda la elección de los ajustes junto a los diales.',
    'Light, blur and fonts':
      'El editor compartido trabaja sobre los píxeles finales, así que su desenfoque sigue una elipse sin datos de profundidad. Los ajustes propios de la captura quedan fuera.',
    'iPhone app':
      'Un gemelo en Swift del módulo de cámara corre sobre AVFoundation con las mismas llamadas. Core Image hace los pasos de foto, y los modos construidos usan los fotogramas del vídeo.',
  },
};

export default arch;

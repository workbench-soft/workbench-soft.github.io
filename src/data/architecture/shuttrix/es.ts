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
  design: {
    scale: [
      'Una persona por teléfono, sin servidor: cada foto se construye y se guarda en el teléfono.',
      'Una foto Retrato cuesta unos 7 s por 12 MP en la CPU de un Pixel 7 Pro, y el modelo de profundidad es una descarga de 26 MB.',
      'Una foto fusionada guarda en memoria 5 fotogramas a tamaño completo de unos 18 MB cada uno.',
    ],
    data: [
      'Los ajustes son un valor JSON en las shared preferences de Android, leído en el primer render, así que la cámara abre como se dejó.',
      'Las tomas son archivos WebP, JPEG, PNG o MP4 en DCIM/Camera, listados por filas de MediaStore que son de la app. RAW añade un DNG.',
      'El lugar, la calibración del balance de blancos y los valores en vivo se quedan en memoria mientras la cámara está abierta.',
    ],
    interfaces: [
      'React Native pasa los valores de los diales a la vista de cámara en Kotlin como props, y el módulo devuelve los valores en vivo 4 veces por segundo.',
      'CameraX lleva el ciclo de vida y los casos de uso, y la interoperabilidad con Camera2 fija ISO, obturador, distancia de enfoque y ganancias de balance de blancos.',
      'Las tomas llegan a MediaStore bajo DCIM/Camera, donde Memories las lee, y la app responde a los intents de cámara de Android.',
    ],
    reliability: [
      'Los diales vuelven a la cámara cada vez que se abre, desde los ajustes guardados.',
      'Un borrador de 512 px se ve en la galería hasta que llega el archivo final.',
      'Un objetivo sin la extensión Night cae a una tasa de fotogramas lenta con fuerte reducción de ruido, y CameraX toma el tamaño compatible más cercano.',
    ],
    security: [
      'Las fotos se quedan en el teléfono. La app no tiene cuenta ni servidor propio.',
      'La ubicación se lee solo mientras la cámara está abierta, y el lugar va a las etiquetas EXIF del archivo guardado.',
      'AdMob pide el consentimiento en la galería la primera vez que se abre, no al iniciar, así que una toma rápida no se retrasa.',
    ],
    performance: [
      'El retardo cero del obturador dispara al tocar, así que la toma conserva el instante de la pulsación.',
      'Una foto simple pide un rango de 60 fotogramas, así que la exposición automática mantiene 1/60 s o menos.',
      'El desenfoque del Retrato se renderiza en una capa de 2048 px, y Enhance y Mini van como pasadas de GPU.',
      'Un anillo guarda los últimos 5 fotogramas para la foto fusionada y los últimos 8 fotogramas raw para el revelado en Rust.',
    ],
    operations: [
      'Un push a main lanza los checks de la cámara y la compilación de release en paralelo, y release-gate.sh solo publica si los checks pasan.',
      'Las etiquetas son shuttrix-v con fecha, y el APK va a una release del repositorio público del sitio, donde la app y el actualizador lo encuentran.',
      'El bundle de Play se compila una vez al día a las 19:00 de Sídney si la cámara cambió, y la compilación de Play lleva un stub del actualizador.',
      'Un workflow aparte compila las bibliotecas ONNX Runtime y OpenCV y las publica como prerelease.',
    ],
    tradeoffs: [
      'Expo con un módulo Kotlin sobre CameraX en vez de react-native-vision-camera, que no tiene distancia de enfoque manual, ISO, obturador ni kelvin.',
      'Noche con la extensión de CameraX en vez de apilar fotogramas en Kotlin, así corre el pipeline del propio teléfono y le deja el balance de blancos y el EV.',
      'Depth Anything V2 Small en vez de un modelo mayor por su licencia Apache, con una descarga de 26 MB y unos 7 s por foto.',
      'Un monorepo con Memories en vez de un repositorio propio, para compartir el editor y el visor, a costa de una CI por rutas.',
    ],
  },
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
    'Raw photo':
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

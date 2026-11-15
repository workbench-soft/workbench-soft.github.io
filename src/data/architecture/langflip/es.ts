import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Langflip es un solo programa en Rust para Windows y macOS, sin servidor. Un crate central decide cada palabra, y una capa fina por sistema capta las teclas y escribe la corrección.',
  parts: [
    {
      name: 'langflip-core',
      role: 'el crate de Rust con las 2 distribuciones, el modelo de idioma y la decisión de dejar o corregir.',
    },
    {
      name: 'Hooks de Windows',
      role: 'hooks de bajo nivel del teclado y el ratón ven cada tecla en cada app y envían la corrección como Unicode.',
    },
    { name: 'Event tap de macOS', role: 'el mismo trabajo en Mac, con las fuentes de entrada para la distribución.' },
    {
      name: 'Modelo de idioma',
      role: 'puntuaciones de tríos de letras y un diccionario por idioma, hechos con wordfreq y metidos en el exe.',
    },
    { name: 'tray-icon', role: 'el icono de la bandeja con la distribución actual, y su menú en los 2 sistemas.' },
    { name: 'rust-i18n', role: 'el texto del menú y del aviso en 9 idiomas, dentro del programa.' },
    {
      name: 'ureq y self-replace',
      role: 'la búsqueda de actualizaciones en GitHub Releases y el cambio del exe en marcha.',
    },
  ],
  flow: [
    'Un hook de bajo nivel capta cada tecla en la app de delante.',
    'El hook asigna la tecla física a una posición, sea cual sea la distribución.',
    'El núcleo puntúa las letras en las 2 distribuciones con el modelo.',
    'Cuando gana la otra distribución, el hook se traga la tecla.',
    'Langflip borra la palabra, la escribe en la otra distribución y cambia la distribución.',
  ],
  links: [
    {
      to: 'GitHub Releases',
      text: 'Ahí se publica el exe de Windows. Langflip busca una versión nueva una vez al día y solo envía su versión.',
    },
  ],
  design: {
    scale: [
      'Una persona por PC o Mac. El texto escrito se queda en la máquina, y toda la instalación es un exe.',
      'El modelo cubre 2 idiomas, inglés y ruso, cada uno con un diccionario de las 100 000 palabras más comunes y una tabla de tríos de letras.',
      'Solo existen 2 distribuciones fijas, US QWERTY y ruso ЙЦУКЕН. El hook debe responder dentro de su callback, así que una decisión tarda microsegundos.',
    ],
    data: [
      'Los ajustes están en settings.toml, en la carpeta de datos de la app. El archivo del modelo va incluido en el binario.',
      'El archivo del modelo empieza con la marca LFM1, y luego por idioma un alfabeto, las log-probabilidades de los tríos en f32 y un diccionario.',
      'El registro de Windows guarda el número de teclas, los nombres de las apps y las decisiones, sin letras, en archivos de 1 MB que pasan a langflip.old.log.',
    ],
    interfaces: [
      'El crate del núcleo recibe las posiciones de las teclas y la distribución en uso, y devuelve una corrección o ninguna. Ambas capas del sistema lo llaman.',
      'Windows usa los hooks WH_KEYBOARD_LL y WH_MOUSE_LL, SendInput para la corrección y WM_INPUTLANGCHANGEREQUEST para la distribución.',
      'macOS usa un CGEventTap de sesión, envíos CGEvent para la corrección y Text Input Sources para la distribución.',
      'La comprobación de actualizaciones lee la API de releases de GitHub una vez al día en busca de etiquetas langflip-v* y solo envía su versión.',
    ],
    reliability: [
      'Los eventos de la corrección llevan una marca de Langflip, así que el hook los deja pasar. Las teclas pulsadas durante una corrección esperan y se repiten tras un marcador final.',
      'Las teclas retenidas esperan hasta 500 ms a que la ventana tome la nueva distribución, y una corrección atascada las suelta tras 1 segundo.',
      'Deshacer vuelve a escribir la palabra como se tecleó, y un segundo Deshacer la añade a la lista de conservar.',
      'El inicio automático es una entrada de la clave Run respaldada por una tarea del Programador de tareas, por si el Explorador omite la clave Run.',
    ],
    security: [
      'Sin servidor ni cuenta. La única llamada de red es la comprobación de actualizaciones, y no lleva texto escrito.',
      'Los campos de contraseña y las ventanas de administrador se omiten, y el archivo de ajustes lista más apps que omitir.',
      'El registro no contiene letras. Las ventanas elevadas quedan fuera de alcance salvo que Langflip corra como administrador, y macOS pide acceso a Accesibilidad y a Monitorización de entrada.',
      'El reemplazo de la actualización comprueba HTTPS y el tamaño del archivo, sin firma, y el exe no está firmado.',
    ],
    performance: [
      'El núcleo puntúa una palabra con una consulta a una tabla en microsegundos, sin pausa de recolector de basura dentro del callback del hook.',
      'Desde la 4.ª letra el motor revisa la palabra mientras se escribe, así que la corrección llega antes de que acabe.',
      'El modelo va incluido y la lista ordenada de palabras carga en unos 20 ms. Un conjunto de todos los comienzos de palabra tardaba 0,4 s en cada arranque y perdió.',
      'caret.rs lee hasta 40 caracteres antes del cursor con UI Automation, en su propio hilo, 40 ms después de un clic.',
    ],
    operations: [
      'mise run lint cubre rustfmt, clippy, cargo shear, ruff, shellcheck y actionlint, y la CI comprueba la compilación de macOS desde Windows.',
      'mise run eval mide las falsas correcciones y los fallos en 10 000 palabras del diccionario y 10 000 más raras por idioma.',
      'Un workflow de release publica langflip.exe en GitHub Releases con una versión por fecha pasada en LANGFLIP_VERSION.',
      'La app busca una release más nueva, pregunta primero, y self-replace cambia el exe en marcha. mise run install no necesita permisos de administrador.',
    ],
    tradeoffs: [
      'Un crate núcleo en Rust y una capa fina por sistema en lugar de un crate mixto, para que las pruebas del núcleo corran en cualquier sistema, a costa de hacer cada corrección dos veces.',
      'Hooks de bajo nivel en el proceso propio de Langflip en lugar de una DLL de hook, para que ningún código se cargue en otras apps, pero las ventanas elevadas quedan fuera de alcance.',
      'Tríos de letras más un diccionario en lugar de solo un diccionario, para atrapar palabras desconocidas, pero una palabra rara puede cambiar pronto y Deshacer la devuelve.',
      'Tablas estáticas para 2 distribuciones en lugar de leer cualquier distribución del sistema, para que Windows y macOS den las mismas letras, pero otras distribuciones no funcionan.',
    ],
  },
  features: {
    'Fix the layout of a word':
      'Desde la 4.ª letra el núcleo compara las letras escritas con las mismas teclas en la otra distribución. El modelo puntúa ambas, y un claro ganador se escribe de nuevo.',
    'Short words':
      'Con 1 a 3 letras una puntuación es poco fiable, así que el núcleo mira solo el diccionario. La corrección espera a Espacio, Intro o Tab.',
    'Digits kept':
      'Un dígito se escribe igual en las 2 distribuciones, así que el búfer de la palabra lo deja en su sitio. El diccionario tiene palabras con dígitos como mp3.',
    'Undo a fix':
      'El núcleo guarda la última palabra tal como se escribió, y Deshacer la vuelve a escribir. Un 2.º deshacer de la misma palabra la pone en la lista de excepciones.',
    'Convert by hand':
      'El núcleo tiene la palabra en curso o la última. El atajo la pasa a la otra distribución sin comprobación.',
    'Skip apps and fields':
      'La capa del sistema compara la app de delante con la lista del archivo de ajustes. Los campos de contraseña y las ventanas de administrador se detectan por señales del sistema.',
    'The current layout on the icon':
      'La capa de Windows sigue los cambios de ventana y de foco y lee la distribución de la ventana de delante. tray-icon dibuja EN o RU en el icono.',
    'Pause with a click':
      'Un clic apaga la corrección, y el hook deja pasar cada tecla. La bandeja muestra el icono en gris.',
    'Switch the layout with a double click':
      'En Windows Langflip trae de vuelta la ventana que estaba delante y le pide cambiar de distribución. En Mac cambia la fuente de entrada.',
    'Start at login':
      'En Windows una entrada en la clave Run abre Langflip, y una tarea del Programador de tareas la respalda. En Mac lo hace un agente de inicio.',
    'Settings file':
      'Un archivo TOML en la carpeta de datos guarda el interruptor, las apps excluidas, las palabras que se quedan y el idioma del menú. Langflip lo relee al siguiente cambio de ventana.',
    'Go on with a word':
      'En Windows UI Automation lee la palabra antes del cursor tras un clic o un cambio de campo. El núcleo trata las letras nuevas como el resto de esa palabra.',
    'The app icon':
      'Un solo SVG es la fuente del icono. La compilación lo mete en el exe, y el script de instalación lo pone en los accesos directos.',
    'Install on Windows':
      'El script compila el exe con Cargo y lo copia a la carpeta de programas del usuario. Añade los accesos directos y la entrada en Configuración sin permisos de administrador.',
    'Tray menu':
      'tray-icon dibuja el mismo menú en Windows y macOS. rust-i18n da su texto en 9 idiomas, según el idioma del sistema o la elección.',
    'Decision log':
      'La capa de Windows escribe cada decisión en un registro con el número de teclas, la app y el motivo. Las letras se quedan fuera, y a 1 MB el archivo empieza de nuevo.',
    'Update from GitHub':
      'Un hilo consulta la lista de versiones de GitHub una vez al día con ureq. Tras un clic comprueba el tamaño y el SHA-256, y self-replace cambia el exe en marcha.',
    'Welcome on the first start':
      'En el primer inicio en Windows, un diálogo de tareas muestra las teclas en su propio hilo, para que los hooks no pierdan sus mensajes. La descripción emergente nombra la distribución para los lectores de pantalla.',
  },
};

export default arch;

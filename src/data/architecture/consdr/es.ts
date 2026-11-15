import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un sitio estático de React hecho con Vite calcula toda la calculadora en el navegador, y Cloudflare lo sirve. Una app en Java con WebView en Android muestra el sitio en vivo, y una app de Capacitor en el iPhone lleva el sitio dentro.',
  parts: [
    {
      name: 'React and Vite',
      role: 'la página de la calculadora, prerenderizada al compilar con los valores por defecto.',
    },
    {
      name: 'Módulos de reglas y costes',
      role: 'TypeScript simple con las reglas fiscales, sus fuentes y las cuentas de cada opción.',
    },
    { name: 'localStorage', role: 'los campos editados, el tema y el idioma, solo en ese navegador.' },
    {
      name: 'Service worker',
      role: 'una caché de las páginas y archivos, para que las visitas siguientes funcionen sin conexión.',
    },
    { name: 'i18next', role: 'los 9 catálogos, cada uno cargado cuando la persona lo elige.' },
    { name: 'Cloudflare', role: 'sirve los archivos compilados, las redirecciones y Web Analytics.' },
    {
      name: 'Android WebView app',
      role: 'Java alrededor del sitio en vivo, con un banner de AdMob y una compra en Google Play.',
    },
    {
      name: 'Capacitor',
      role: 'la app del iPhone con los archivos del sitio dentro, y Swift para anuncios, StoreKit y compartir.',
    },
  ],
  flow: [
    'Cloudflare envía la página prerenderizada con los valores por defecto.',
    'La página lee los campos guardados de localStorage.',
    'Cada cambio repite la comparación en el navegador y guarda los campos.',
    'La página muestra los 3 totales, sus partes y el cálculo.',
    'El service worker guarda los archivos para la próxima visita sin conexión.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Aloja el sitio y lleva sus redirecciones y Web Analytics.' },
    { to: 'Google AdSense', text: 'Anuncios automáticos en la web. Las apps no cargan AdSense.' },
    { to: 'Google Play', text: 'El banner de AdMob y la compra Quitar anuncios en la app de Android.' },
    { to: 'App Store', text: 'StoreKit vende Quitar anuncios en la app del iPhone cuando esté en el App Store.' },
  ],
  design: {
    scale: [
      'Una persona por navegador, con 23 campos en una sola página de calculadora. La comparación se recalcula en el navegador con cada cambio.',
      'El sitio son archivos estáticos en Cloudflare, así que ningún servidor propio del estudio soporta la carga.',
      'Los tramos de impuestos, el FBT y el impuesto de sellos son números fijos en el código, así que el límite es mantenerlos al día, no la carga.',
    ],
    data: [
      'Sin base de datos ni cuenta. Los cambios están en localStorage como JSON bajo 3 claves: campos (con un campo de versión), tema e idioma.',
      'Solo se guardan los campos editados, así que una fecha de inicio intacta se lee como hoy y un valor por defecto sigue el tipo de coche y las reglas.',
      'Los tramos de impuestos, las constantes del FBT y el impuesto de sellos por estado están como constantes en src/rules, cada una con un enlace a su fuente.',
    ],
    interfaces: [
      'compareOptions recibe un objeto CalcInputs y devuelve un Comparison: coste, evolución de la cuenta y partes del coste por opción.',
      'La página habla con la app de Android por window.ConsdrApp, con los mensajes state, buy, privacy y devAds y respuestas en JSON.',
      'La app de iPhone responde al mismo puente desde Swift, y Capacitor sirve el sitio compilado desde dentro de la app.',
      'La compilación escribe sitemap.xml, llms.txt, ads.txt y el JSON-LD de las preguntas frecuentes.',
    ],
    reliability: [
      'Las páginas van primero a la red y recurren a la copia en caché tras 3 segundos o ante un error del servidor.',
      'Con los datos del sitio bloqueados, leer da null y escribir se omite, y la página sigue funcionando en esa visita.',
      'Un valor guardado de tipo erróneo o un valor de lista desconocido se descarta al cargar. Guardar en una pestaña recarga las demás.',
    ],
    security: [
      'Sin inicio de sesión, y las cifras no van a ningún servidor, así que lo escrito no sale del navegador.',
      'Las cabeceras de respuesta fijan frame-ancestors none, object-src none, nosniff y HSTS, y desactivan cámara, micrófono y ubicación.',
      'La clave de firma de Android es un secreto de CI que se descifra en el runner, y el repositorio no guarda ninguna clave.',
      'La app de Android pide el consentimiento para anuncios mediante el SDK de consentimiento de Google.',
    ],
    performance: [
      'El inglés va en el script principal, y cada uno de los otros 8 catálogos se carga como un trozo aparte al elegirlo.',
      'La compilación prerrenderiza la calculadora con los valores por defecto y precarga las fuentes latinas, para que el contenido aparezca pronto y las cifras no salten.',
      'Los archivos de /assets/ llevan un hash de contenido, reciben una cabecera de caché de un año y el worker los sirve primero desde la caché.',
    ],
    operations: [
      'Un solo trabajo revisa, prueba y compila, y luego wrangler deploy publica dist/ en Cloudflare con cada push a main.',
      'La CI corre en el runner Windows propio del estudio, así que el repositorio privado no gasta minutos de Actions.',
      'Una ejecución nocturna a las 19:00 de Sídney compila el bundle firmado de Android para Google Play, solo si android/ cambió.',
      'El nombre de la caché del service worker aplica un hash a la lista de archivos, el texto de las páginas y el código del worker, así que cada despliegue reemplaza la caché anterior.',
    ],
    tradeoffs: [
      'Cálculo en el navegador en lugar de una API de servidor, para que ningún dato salga del dispositivo y el alojamiento sean archivos estáticos.',
      'En Android, un WebView sobre el sitio en vivo en lugar de pantallas nativas, para que un solo código sirva a la web y a la app, y un despliegue del sitio llegue a la app al instante.',
      'Páginas primero desde la red en lugar de la caché, para que un despliegue se vea al momento, a costa de hasta 3 segundos con conexión lenta.',
      'Reglas fijas en el código con sus fuentes en lugar de una API de tasas, para que cada número se pueda revisar, pero un nuevo año fiscal exige una versión.',
    ],
  },
  features: {
    'Compare a lease, a loan and cash':
      'Una función simple de TypeScript toma los campos y devuelve un total por opción. Corre en el navegador con cada cambio, y ningún servidor ve los números.',
    'Where the money goes':
      'La comparación devuelve las partes de cada total junto al total. Un módulo de notas escribe la línea y la fórmula al lado de cada número.',
    'Lease and loan settings':
      'El módulo del formulario convierte el texto escrito en números y guarda cada cambio en localStorage. Un valor a medio escribir sigue en pantalla.',
    'FBT by car type and start date':
      'Un módulo de reglas elige la tasa de FBT y la exención de los eléctricos según el tipo de coche, la fecha de inicio y el precio. Cada constante cita su fuente.',
    'Stamp duty by state':
      'Una tabla por estado en el módulo de reglas calcula el impuesto con el precio, el tipo de coche y la fecha de inicio.',
    'Account interest':
      'La comparación lleva la cuenta mes a mes a su tasa, para cada opción y para no tener coche. La diferencia da el interés perdido.',
    'Borrowing for another home':
      'La comparación calcula cuánto menos prestaría un banco mientras se paga el coche. Usa el margen de APRA de 3 puntos a 30 años.',
    'Working and sources':
      'Un módulo de notas escribe cada paso y fórmula junto a los números. Un archivo de fuentes enlaza cada número fijo con su página.',
    'Common questions':
      'Un módulo arma las respuestas en el idioma actual con las mismas reglas. La versión en inglés también entra en la página como JSON-LD para los buscadores.',
    'Guides and pages':
      'Un plugin de Vite convierte cada guía en HTML estático al compilar, con números de las mismas reglas. También escribe el sitemap.',
    'Saved inputs and reset':
      'Los campos editados van a localStorage como JSON. Restablecer los borra, y vuelven los valores por defecto.',
    'Offline use':
      'Un service worker escrito al compilar guarda las páginas y archivos en caché. Las páginas prueban primero la red y pasan a la copia en caché a los 3 segundos.',
    'Colour theme':
      'Un pequeño script en la cabecera de la página pone el tema guardado antes del primer pintado. La elección está en localStorage.',
    'Remove ads in the Android app':
      'La página pregunta a la app en Java por un puente, y Google Play Billing vende el producto. La app devuelve el estado sin anuncios.',
    'Which lease term costs least':
      'Una función repite la comparación por cada plazo de 1 a 5 años. Lleva la cuenta hasta el año 5, para que cada plazo cubra los mismos años.',
    'If you leave your job':
      'Un módulo calcula el saldo a pagar en la fecha de salida y el coste de cada salida del leasing frente a seguir. Reutiliza las cifras del leasing de la comparación.',
    Language:
      'i18next con react-i18next carga cada catálogo como archivo aparte al elegirlo. El dinero sigue en dólares australianos.',
    Ads: 'AdSense pone anuncios automáticos en la web. Las apps marcan la página, así AdSense queda apagado ahí y AdMob muestra el banner nativo.',
    "No ads on the developer's phone":
      'La app de Android guarda una clave de desarrollador que el PC envía al teléfono una vez. Con ella, cada versión oculta el banner.',
    'iPhone app':
      'Capacitor sirve el sitio compilado desde dentro de la app, así se abre sin conexión. Código en Swift responde al mismo puente de la página que la app de Android.',
    'Remove ads on the iPhone':
      'StoreKit 2 vende el mismo id de producto que Google Play. Restaurar compra pide al App Store las compras anteriores.',
    'Share the result':
      'La página arma la línea del veredicto con el enlace. La app del iPhone abre la hoja de compartir de iOS, y un navegador de móvil usa Web Share.',
  },
};

export default arch;

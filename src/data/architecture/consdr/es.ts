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

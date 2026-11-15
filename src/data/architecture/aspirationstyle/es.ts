import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un sitio estático de Astro en GitHub Pages, editado desde un panel basado en Git. Un Rust Worker en Cloudflare da acceso a Maria y dibuja las imágenes con IA.',
  parts: [
    { name: 'Astro', role: 'genera cada página como HTML estático y cada foto en tamaños AVIF o WebP.' },
    { name: 'GitHub Pages', role: 'sirve el sitio desde un repo público de build, gratis y rápido en Rusia.' },
    { name: 'Sveltia CMS', role: 'el panel, que guarda cada cambio como un commit en el repo privado de código.' },
    {
      name: 'Rust Worker',
      role: 'da acceso a los admins con un código por email y revisa su acceso al repo para la página de IA.',
    },
    { name: 'Workers AI', role: 'ejecuta los modelos FLUX.2 que dibujan los interiores.' },
    { name: 'FormSubmit', role: 'envía cada formulario de pedido a Maria, sin cuenta ni servidor.' },
    { name: 'GitHub Actions', role: 'revisa cada cambio, genera el sitio y lo sube al repo público.' },
  ],
  flow: [
    'El navegador de un visitante pide una página a GitHub Pages.',
    'Pages envía HTML estático y fotos en los tamaños que pide el diseño.',
    'El formulario de pedido va a FormSubmit, que escribe a Maria.',
    'Los cambios de Maria quedan como commits, y el sitio se regenera en 2 minutos.',
  ],
  links: [
    { to: 'GitHub', text: 'Guarda el código privado y el repo público de build, y sirve las páginas.' },
    { to: 'Cloudflare', text: 'Ejecuta el Worker, Workers AI y el email que lleva el código de acceso.' },
    { to: 'FormSubmit', text: 'Envía cada pedido a Maria.' },
    {
      to: 'Yandex',
      text: 'Lee los datos estructurados, y una regla de Yandex en robots.txt junta los enlaces del filtro en una página.',
    },
  ],
  design: {
    scale: [
      'Un portafolio de estudio para visitantes en Rusia, con 16 galerías y unas 270 fotos.',
      'Lo editan pocas personas, así que el sitio no necesita servidor ni base de datos, y cada cambio es un commit.',
      'La página de IA cabe en el plan gratuito de Workers AI de 10 000 neuronas al día, y una imagen tarda de 3 a 15 segundos.',
    ],
    data: [
      'Cada galería es una carpeta con un index.md y sus fotos. Su cabecera lleva título, categoría, orden, portada y pies de foto.',
      'Un settings.json guarda los contactos, los textos de la portada y la elección de fuentes. Un esquema zod lo revisa junto con las galerías al compilar.',
      'Los códigos de acceso no se guardan. Cada uno es un HMAC del correo y de una ventana de 10 minutos.',
    ],
    interfaces: [
      'El Worker en Rust sirve GET /auth, POST /auth/code, POST /auth/verify y POST /generate.',
      'El administrador escribe por la API de GitHub como commits. El formulario de pedido va a FormSubmit, que lo envía por correo.',
      '/generate recibe un prompt, un modelo, un tamaño de 256 a 1536 en pasos de 64 y hasta 2 fotos de referencia como datos de formulario multipart.',
    ],
    reliability: [
      'El Worker nombra un solo origen permitido en la cabecera CORS, porque los navegadores rechazan una lista. Un error posterior sale como JSON que la página de administración puede mostrar.',
      'Un fallo de GitHub recibe una nota para reintentar y no un mensaje de sin acceso. Una cuota de IA agotada tiene su propio mensaje.',
      'Cada versión se reconstruye desde el código fuente, así que un mal cambio se deshace con un commit.',
    ],
    security: [
      'Se entra con un código de 6 dígitos por correo, 5 intentos por minuto y por correo, y el Worker da al administrador un token de repositorio de permisos finos.',
      '/generate comprueba que el token de quien llama puede hacer push al repositorio antes de llamar al modelo.',
      'El token solo va a una ventana de los orígenes permitidos. Los correos de los administradores y los tokens quedan en los ajustes y secretos del Worker, fuera del sitio.',
    ],
    performance: [
      'Astro escribe cada foto como AVIF o WebP en los tamaños que pide el diseño, y GitHub Pages sirve HTML estático.',
      'La versión conserva la caché de imágenes de Astro entre ejecuciones en vez de redibujar todas las fotos.',
      'Una foto de habitación se reduce a 512 px en el navegador antes de subirla. FLUX.2 klein hace un borrador en unos 3 segundos y dev en unos 15.',
    ],
    operations: [
      'Cada push a main construye el sitio junto a las comprobaciones, espera las del mismo commit y luego empuja las páginas al repositorio de compilación público.',
      'Corre una versión a la vez, y un push más nuevo cancela la anterior, así que una compilación vieja no pisa una nueva. Los commits llevan etiquetas de fecha.',
      'El cambio se ve unos 2 minutos después de guardar. El Worker se despliega con wrangler y la observabilidad está activa.',
    ],
    tradeoffs: [
      'GitHub Pages desde un repositorio de compilación público en vez de Cloudflare Pages, porque los proveedores rusos ralentizan Cloudflare, a costa de dos repositorios y un token de publicación.',
      'Una administración basada en Git en vez de un CMS alojado, para no tener servidor ni base, a costa de 2 minutos de espera por cada cambio.',
      'FormSubmit en vez de un Worker con correo, porque es gratis y sin cuenta, a costa de un servicio fuera de Rusia.',
      'Workers AI con FLUX.2 en vez de APIs de imágenes de pago, porque lee ruso y cabe en el plan gratuito, a costa de imágenes lentas desde Cloudflare.',
    ],
  },
  features: {
    Portfolio:
      'Cada galería es una carpeta de Markdown y fotos en el repo. Astro genera las páginas y los tamaños de imagen, y el filtro corre en el navegador.',
    'Order a design':
      'Cada formulario va a FormSubmit, que envía la solicitud a Maria. El sitio no tiene servidor propio para esto.',
    Admin:
      'Sveltia CMS corre en la página del panel y hace commit de cada cambio en el repo. El Worker envía a Maria un código de acceso y luego da al panel un token del repo.',
    Fonts:
      'Las 10 fuentes vienen de Fontsource y van con el sitio. La elección está en el archivo de ajustes, y el diseño la aplica en la siguiente compilación.',
    'AI generator':
      'La página del panel envuelve la petición en ruso y el estilo de Maria en un prompt en inglés. El Worker revisa su acceso a GitHub, luego FLUX.2 en Workers AI dibuja la imagen.',
    Search:
      'El diseño de Astro escribe en cada página el título, la descripción, la foto para compartir y los datos estructurados. La compilación escribe robots.txt, llms.txt y un mapa del sitio con fechas de git.',
  },
};

export default arch;

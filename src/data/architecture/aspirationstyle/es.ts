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

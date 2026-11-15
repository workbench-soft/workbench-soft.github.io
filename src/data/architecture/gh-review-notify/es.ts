import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un solo script bash corre en el Mac, lanzado cada 3 minutos por un agente de launchd. Lee GitHub con la CLI gh y muestra cada evento nuevo en el Centro de notificaciones.',
  parts: [
    {
      name: 'Agente de launchd',
      role: 'lanza el script cada 180 segundos y recupera lo perdido cuando el Mac despierta.',
    },
    { name: 'Script bash', role: 'busca los PR, lee las revisiones y comentarios, los filtra y envía los avisos.' },
    {
      name: 'GitHub CLI',
      role: 'hace cada llamada a GitHub con la sesión que gh ya guarda. La herramienta no guarda ningún token.',
    },
    { name: 'jq', role: 'lee las respuestas JSON de GitHub.' },
    {
      name: 'terminal-notifier',
      role: 'muestra el aviso y abre el comentario con un clic, con osascript como respaldo.',
    },
    {
      name: 'Archivos de caché',
      role: 'archivos simples en la carpeta de caché del usuario guardan los eventos vistos y la última actualización de cada PR.',
    },
  ],
  flow: [
    'launchd lanza el script, y un bloqueo impide una segunda pasada.',
    'gh busca tus PR abiertos actualizados en los últimos 3 días.',
    'El script lee revisiones y comentarios solo de los PR que cambiaron.',
    'Los eventos que ya están en la lista de vistos se descartan.',
    'terminal-notifier muestra el resto, y un clic abre el comentario.',
  ],
  links: [
    { to: 'GitHub', text: 'La fuente de cada PR, revisión y comentario, leída con la CLI gh.' },
    { to: 'Homebrew', text: 'Instala jq y terminal-notifier al instalar.' },
  ],
  design: {
    scale: [
      'Una persona en un Mac. La búsqueda cubre los PR abiertos actualizados en los últimos 3 días.',
      'Una ejecución tras la primera tarda menos de 10 segundos, porque solo se reabren los PR cuyo updatedAt cambió.',
      'La herramienta es un solo archivo bash de menos de 400 líneas.',
    ],
    data: [
      'Archivos planos en la carpeta de caché del usuario: seen.txt, pr-updated.tsv, review-requests.tsv y una carpeta de bloqueo.',
      'seen.txt guarda las últimas 3000 claves de evento. Una clave es la URL de la revisión o del comentario.',
      'La carpeta solo la lee la cuenta, porque lista las URL de PR privados.',
    ],
    interfaces: [
      'gh search prs y gh api leen GitHub, y jq lee las respuestas JSON.',
      'terminal-notifier muestra cada aviso y abre el comentario al hacer clic, con osascript como respaldo.',
      'launchd arranca el agente cada 180 segundos. GH_REVIEW_NOTIFY_INTERVAL y GH_REVIEW_NOTIFY_BOTS cambian el intervalo y el filtro de bots.',
    ],
    reliability: [
      'Una carpeta de bloqueo hace que una segunda ejecución salga de inmediato.',
      'Una búsqueda de PR fallida detiene la ejecución antes de tocar ningún archivo de caché, y una consulta de solicitudes de revisión fallida queda fuera de la caché, así que la siguiente vuelve a preguntar.',
      'Un evento sale con hasta 3 minutos de retraso, y solo con el Mac despierto. launchd se pone al día al despertar.',
    ],
    security: [
      'Usa el acceso de gh auth, así que la herramienta no guarda ningún token.',
      'Los archivos de caché solo los lee la cuenta.',
      'Consulta github.com desde el Mac, de modo que ni un webhook ni una dirección pública llegan a la máquina.',
    ],
    performance: [
      'Las revisiones y los comentarios solo se leen en los PR cuyo updatedAt cambió, o en todos los PR durante una siembra.',
      'Las solicitudes de revisión a equipos se descartan, y más de 4 comentarios en un PR se pliegan en 1 aviso.',
      'grep y awk comparan cada clave de evento con seen.txt, sin base de datos.',
    ],
    operations: [
      'install.sh copia el script a la carpeta bin local, escribe el plist y carga el agente. uninstall.sh lo deshace.',
      'tests/run.sh ejecuta el script sobre respuestas de GitHub preparadas, con dobles de gh, date y terminal-notifier.',
      'Las comprobaciones corren en un runner macOS de GitHub, y cada push en verde recibe una versión fechada. La instalación toma el último main.',
    ],
    tradeoffs: [
      'Consultar cada 3 minutos en lugar de correo, la app de Slack o webhooks: sin servidor ni dirección pública, a costa de un retraso de hasta 3 minutos.',
      'La CLI gh en lugar de curl con un token, para no guardar ningún token. La herramienta se detiene cuando gh pierde el acceso.',
      'Un solo archivo bash en lugar de TypeScript o Rust, que se copia sin compilar, y las pruebas necesitan dobles.',
      'Archivos planos en lugar de SQLite, para que bash solo necesite grep y awk. Un formato nuevo exige un nombre de archivo nuevo.',
    ],
  },
  features: {
    'Review and comment notifications':
      'gh busca los PR abiertos que escribiste, revisaste o comentaste, luego lee las revisiones y comentarios de cada uno que cambió. Cada evento nuevo se vuelve un aviso.',
    'Review requests':
      'Una consulta a GitHub guarda las solicitudes con tu nombre y descarta las hechas a un equipo. Una consulta fallida queda fuera de la caché, así la siguiente pasada pregunta otra vez.',
    'Comment bursts':
      'Antes de avisar, el script cuenta los comentarios nuevos por PR. Más de 4 se juntan en 1 aviso con la cifra y los nombres, y un clic abre el PR.',
    'Quiet first run':
      'Sin caché, el script escribe los eventos de los últimos 3 días en la lista de vistos y no muestra ninguno. Una primera pasada fallida deja la caché vacía, y la siguiente empieza de nuevo.',
    'Bot filter':
      'El script descarta los comentarios de cuentas de bots antes de comparar eventos. Un ajuste dado al instalar va al agente de launchd y los vuelve a activar.',
    'Status and test':
      'Una opción imprime el estado del agente, la cuenta, la última pasada y los ajustes. Otra envía un aviso de prueba por el mismo camino.',
    Releases:
      'Un workflow de GitHub Actions etiqueta con fecha cada push a main que pasa shellcheck. Las notas listan los commits desde la versión anterior.',
  },
};

export default arch;

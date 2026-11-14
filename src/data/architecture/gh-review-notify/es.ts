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

import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Cada alias es un script bash en un solo repo git. Un include en la config de git apunta al clon, así un pull actualiza cada alias de la máquina.',
  parts: [
    { name: 'Scripts bash', role: 'un script por alias, que ejecuta el bash que trae git en macOS, Linux y Windows.' },
    { name: 'Include en la config de git', role: 'une cada nombre de alias con su script y apunta git al clon.' },
    { name: 'fzf', role: 'el menú de búsqueda difusa para elegir ramas y worktrees.' },
    {
      name: 'Funciones de zsh y PowerShell',
      role: 'convierten la línea de carpeta del cambio de rama en un cambio real de carpeta.',
    },
    { name: 'Instaladores', role: 'uno para macOS y Linux y otro para Windows. Configuran git, el shell y el hook.' },
    { name: 'shellcheck y shfmt', role: 'revisan cada script en el hook de commit y en la CI.' },
    {
      name: 'GitHub Actions',
      role: 'ejecuta el lint y las pruebas en Linux y Windows, luego etiqueta cada push verde a main.',
    },
  ],
  flow: [
    'La persona escribe un comando corto, como git co.',
    'Git encuentra el alias en la config incluida y ejecuta su script.',
    'El script llama a git, y a fzf cuando hay que elegir.',
    'Una función del shell convierte una línea de carpeta en un cambio de carpeta.',
    'El resultado sale en la terminal, y el repo cambia a través de git.',
  ],
  links: [{ to: 'GitHub', text: 'Aloja el repo, ejecuta las comprobaciones y publica las versiones con fecha.' }],
  features: {
    Aliases:
      'Un archivo de config une cada nombre de alias con un script bash del clon. git a lee el comentario al inicio de cada script e imprime la lista.',
    'Switch branch folders':
      'git sb lista las ramas locales en fzf, worktrees incluidos. El script imprime la ruta, y una función de zsh o PowerShell lleva allí el shell y la ventana de VS Code.',
    'Delete branches and worktrees':
      'git db las elige en fzf, y git dbm encuentra las ramas cuya rama remota ya no existe. Un helper común borra cada worktree con su rama y pregunta antes de forzar uno con cambios.',
    Installer:
      'Un instalador de shell para macOS y Linux y otro de PowerShell para Windows escriben el include en la config de git. Cada archivo que tocan recibe antes una copia con fecha.',
    'Lint hook':
      'El instalador apunta los hooks de git a una carpeta del repo. Cada commit allí ejecuta shellcheck, shfmt y las reglas del repo, luego oxfmt y markdownlint en los archivos preparados.',
    'Reset to the default branch':
      'El script lee la rama principal del HEAD del remoto, luego hace fetch y un reset duro a ella. Pregunta antes si se perderían cambios locales o commits sin subir.',
    Releases:
      'Un workflow de GitHub Actions arranca cuando el lint pasa en main. Elige la siguiente versión por fecha y escribe las notas con los commits desde la última etiqueta.',
  },
};

export default arch;

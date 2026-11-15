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
  design: {
    scale: [
      'Un desarrollador en unas pocas máquinas, sin servidor. Cada alias es un script bash en bin/.',
      'La carga son unas pocas llamadas a git por alias, así que git y el repositorio fijan los límites, no los scripts.',
    ],
    data: [
      'Los alias no guardan estado propio. Leen y cambian el repositorio a través de git.',
      'Los instaladores escriben gitaliases.dir e include.path en la config de git del usuario, y una función en el perfil de zsh o PowerShell.',
      'aliases.gitconfig asocia el nombre de cada alias con su script en el clon.',
    ],
    interfaces: [
      'Git ejecuta un alias como proceso hijo, así que un script recibe argumentos e imprime en el terminal.',
      'git sb imprime en stdout una línea __cd__ con una ruta, y una función de zsh o PowerShell la convierte en un cd.',
      'fzf dibuja el selector, y los scripts cargan las ayudas _shared.sh y _prune.sh.',
    ],
    reliability: [
      'Cada script corre con set -euo pipefail, así que una llamada fallida a git detiene el alias.',
      'El borrado de ramas y worktrees salta el worktree principal, la carpeta actual y los worktrees bloqueados.',
      'Esc en el selector termina el alias sin borrar nada.',
    ],
    security: [
      'El único servicio externo es el remoto de git. Los scripts no guardan token y no llaman a ninguna API.',
      'Los instaladores preguntan antes de cada cambio y copian primero cada archivo que editan.',
      'Los alias de borrado listan los candidatos y quitan solo lo que la persona elige.',
    ],
    performance: [
      'Cada alias es un proceso bash con unas pocas llamadas a git, y un pull los actualiza todos.',
      'Las listas de limpieza salen de una llamada a for-each-ref y de la lista de worktrees, y one_line usa printf -v porque una sustitución de comando por worktree cuesta un fork.',
    ],
    operations: [
      'lint.sh ejecuta shellcheck y shfmt y comprueba que cada alias tenga un script, una descripción y una fila en el README. test.sh ejecuta los alias en repositorios de prueba.',
      'Un hook pre-commit y uno pre-push ejecutan mise run lint, y lint.yml lo hace en runners de Linux y Windows.',
      'Cada push en verde a main recibe una versión fechada como v2026.10.30.1.',
    ],
    tradeoffs: [
      'Un script bash por alias en lugar de alias ! en línea o funciones de shell, para que shellcheck y las pruebas los cubran, a costa de un archivo por alias.',
      'Bash en lugar de TypeScript o Rust, porque git trae bash en cada sistema y ninguna máquina necesita Node.',
      'Un include que apunta al clon en lugar de alias copiados, para que un git pull los actualice. Mover el clon los rompe.',
      'Dos instaladores en lugar de uno, porque solo PowerShell necesita editar su perfil, a costa de dos copias que mantener al día.',
    ],
  },
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

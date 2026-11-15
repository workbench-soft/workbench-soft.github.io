import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una extensión de VS Code que arma cada enlace desde el git local. No envía peticiones a los hosts, luego abre el enlace en el navegador o lo copia.',
  parts: [
    { name: 'VS Code API', role: 'registra los 8 comandos y los menús, y lee los ajustes y la selección.' },
    {
      name: 'git',
      role: 'da la raíz del repo, la URL del remoto y las ramas, con un límite de 10 segundos por llamada.',
    },
    {
      name: 'Constructores de enlaces',
      role: 'TypeScript simple que convierte un remoto en el enlace de archivo, blame e historial de cada host.',
    },
    {
      name: 'vscode.env',
      role: 'abre el enlace en el navegador o lo pone en el portapapeles, en ventanas locales y remotas.',
    },
    { name: 'vscode.l10n', role: 'traduce comandos, ajustes y mensajes a 9 idiomas.' },
    { name: 'esbuild', role: 'empaqueta el código en un solo archivo, así la extensión carga rápido.' },
    { name: 'GitHub Actions', role: 'arma el .vsix junto a las comprobaciones y lo publica cuando pasan.' },
  ],
  flow: [
    'La persona lanza un comando desde la paleta, el editor o el explorador.',
    'La extensión encuentra con git la raíz del repo del archivo.',
    'git devuelve la URL del remoto y una rama que tiene el archivo.',
    'El constructor escribe la URL para ese host con las líneas elegidas.',
    'VS Code la abre en el navegador o la copia con un aviso.',
  ],
  links: [
    {
      to: 'GitHub',
      text: 'Aloja el fork y sus versiones con el .vsix. Los enlaces de GitHub son la opción por defecto.',
    },
    {
      to: 'GitLab and Bitbucket',
      text: 'Destinos de enlace junto a GitHub, armados desde la URL del remoto sin llamar a una API.',
    },
    { to: 'Visual Studio Marketplace', text: 'Lista la extensión. Cada publicación allí se hace a mano.' },
  ],
  design: {
    scale: [
      'Una persona por ventana de VS Code, un enlace por clic, así que el trabajo son unas pocas llamadas a git en un repositorio.',
      'Funciona en ventanas locales, SSH y contenedor, y una llamada a git se detiene a los 10 segundos para que un remoto lento no cuelgue el editor.',
    ],
    data: [
      'La extensión no guarda estado. Cada comando lee los ajustes, la selección y git, construye un enlace y los olvida.',
      'Los ajustes openInGitHub y la URL del remoto deciden el host, la rama y una dirección reasignada.',
    ],
    interfaces: [
      'Los comandos salen de la paleta, el menú del editor y el menú del Explorador, son 8, y cada uno llama al mismo ejecutor de enlaces.',
      'git da la raíz del repositorio, la URL del remoto y las ramas mediante execFile, y los constructores de enlaces escriben las URL de archivo, blame e historial de cada host.',
      'vscode.env.openExternal abre el navegador y vscode.env.clipboard copia, así que ambos funcionan en ventanas remotas.',
    ],
    reliability: [
      'La comprobación de rama prueba el ajuste, el HEAD del remoto, main y master, y luego recurre a la rama actual o al commit con HEAD desasociado.',
      'Un fallo de git muestra el mensaje propio de git, y git no pide contraseña en un terminal.',
    ],
    security: [
      'La extensión no envía peticiones a los hosts, así que no necesita token ni inicio de sesión para GitHub, GitLab o Bitbucket.',
      'git corre mediante execFile sin shell, así que el ajuste defaultRemote no puede ejecutar un comando.',
    ],
    performance: [
      'esbuild empaqueta las fuentes en un archivo, lo que redujo el paquete y aceleró la carga.',
      'Cada llamada a git es un proceso corto mediante execFile con un límite de 10 segundos, así que un clic cuesta unos pocos procesos pequeños.',
    ],
    operations: [
      'Checks ejecuta lint, comprobación de tipos, pruebas unitarias y compilación en cada push, y el workflow de release construye el .vsix a su lado.',
      'Un script de puerta publica la compilación cuando Checks pasa, y un Checks fallido la cancela. La publicación en el Marketplace sigue siendo manual.',
      'El TypeScript simple de git y links corre en Node con mise run test, y solo el pegamento del editor necesita una ventana de pruebas de VS Code.',
    ],
    tradeoffs: [
      'Enlaces desde git local en vez de la API REST de cada host, así no hay token ni llamada de red por clic. El enlace no puede confirmar que el archivo existe en el host.',
      'vscode.env.openExternal en vez del paquete open, que rompía nombres como users.$id.tsx y no abría navegador desde ventanas SSH.',
      'Un fork de una extensión existente en vez de reescribir, que conservó el código de enlaces de hosts y sus pruebas. El nuevo id obliga a reinstalar.',
    ],
  },
  features: {
    'Open a file, blame or history link':
      'El comando lee el archivo y sus líneas elegidas del editor, y el remoto de git. Un módulo del host escribe el enlace, y VS Code lo abre en el navegador.',
    'Copy a link':
      'El mismo enlace va al portapapeles de VS Code, así una ventana remota llena el portapapeles local. Un aviso muestra la URL.',
    'Links from the Explorer':
      'El menú del explorador pasa el archivo o la carpeta al mismo comando. El enlace no lleva ancla de línea.',
    'Main or master first':
      'git revisa el ajuste, luego el HEAD del remoto, main y master en busca de una rama con el archivo. Sin coincidencia el enlace usa la rama actual.',
    'Hosts and mapped URLs':
      'El host sale de un ajuste o de la URL del remoto. Un ajuste de mapeo cambia la URL del remoto antes de que se escriba el enlace.',
    Languages:
      'vscode.l10n elige el catálogo según el idioma de VS Code. Los nombres de comandos y ajustes salen de 9 catálogos del paquete.',
  },
};

export default arch;

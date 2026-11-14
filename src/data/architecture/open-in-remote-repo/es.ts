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

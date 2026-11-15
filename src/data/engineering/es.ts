import type { Engineering } from './types';

export default {
  title: 'Cómo se construye el código',
  intro:
    'Cada repo sigue las mismas reglas de código, pruebas, specs y docs. Los agentes de código escriben casi todo, y las reglas mantienen su trabajo corto, comprobado y documentado.',
  numbers: {
    title: 'El código hoy',
    source: 'Contado en {repos} repos de GitHub el {date}. El recuento se repite en cada despliegue y cada noche.',
    languages: 'Líneas por lenguaje',
    other: 'Otros',
    metrics: {
      lines: ['Líneas de código', 'Líneas de fuente no vacías, sin código generado ni código de terceros copiado.'],
      files: ['Archivos fuente', 'Cada archivo en un lenguaje de programación.'],
      functions: ['Funciones', 'Funciones y métodos con nombre, leídos del árbol de sintaxis.'],
      types: ['Tipos', 'Clases, interfaces, structs, enums y traits.'],
      tests: ['Pruebas', 'Casos de prueba en Vitest, Rust, Kotlin, Swift y Python.'],
      modules: ['Módulos', 'Paquetes npm, crates de Rust y módulos de Gradle.'],
      smallFiles: ['Archivos de menos de 100 líneas', 'La parte de archivos fuente que cumple la regla de 100 líneas.'],
      medianLines: ['Archivo mediano', 'La mitad de los archivos fuente tiene este número de líneas o menos.'],
      specs: ['Specs', 'Specs de funciones en la carpeta specs de cada repo.'],
      docs: ['Páginas de docs', 'Los README y las páginas de cada carpeta docs.'],
      commits: ['Commits en 30 días', 'Commits en la rama main de cada repo.'],
      prs: ['PR fusionadas en 30 días', 'Pull requests fusionadas en toda la organización.'],
    },
  },
  topics: [
    {
      id: 'code',
      title: 'Código corto y simple',
      lead: 'El código se entiende a la primera, y cada archivo hace una sola cosa.',
      points: [
        ['Menos de 100 líneas', 'un archivo se queda por debajo de 100 líneas. Uno más largo se divide por función.'],
        ['Reutilizar primero', 'el código nuevo empieza con una búsqueda en el repo y en los paquetes compartidos.'],
        ['Biblioteca primero', 'una biblioteca mantenida gana al código escrito a mano.'],
        ['Paquetes compartidos', 'el código que necesitan 2 apps pasa a un solo paquete que ambas instalan.'],
        ['Estricto', 'TypeScript corre en modo estricto, y los linters fallan ante cualquier aviso.'],
      ],
    },
    {
      id: 'tests',
      title: 'Probado en cada paso',
      lead: 'Un cambio pasa las mismas comprobaciones en el PC, en CI y en un teléfono real.',
      points: [
        ['Antes del push', 'un hook de git ejecuta el lint, la comprobación de formato y la de tipos.'],
        [
          'CI en cada push',
          'las comprobaciones y el build de release empiezan a la vez. Si una falla, se cancela el build.',
        ],
        ['Pruebas unitarias', 'Vitest, cargo test y las pruebas de Gradle corren en cada repo con mise run test.'],
        [
          'Dispositivos reales',
          'el trabajo fusionado se instala en un teléfono real o se abre en un navegador, flujo por flujo.',
        ],
        ['Pruebas de catálogos', 'una prueba falla cuando a un idioma le falta un texto que el inglés sí tiene.'],
      ],
    },
    {
      id: 'specs',
      title: 'Una spec por función',
      lead: 'Cada función tiene una spec en el repo, escrita antes del código.',
      points: [
        ['Primer commit', 'la spec o su nueva entrada llega antes que cualquier código.'],
        [
          'Resumen arriba',
          'un resumen corto abre el texto, y luego van los flujos, los módulos, los datos y los límites.',
        ],
        ['Historial abajo', 'cada cambio añade una entrada con fecha, con el motivo, los archivos y los pasos.'],
        ['Conservada', 'las specs se quedan tras la fusión, así que el motivo del código también.'],
      ],
    },
    {
      id: 'docs',
      title: 'Docs en el mismo cambio',
      lead: 'Un cambio actualiza cada doc que deja obsoleta, en el mismo commit.',
      points: [
        ['Cada repo', 'un README, un changelog, una lista de tareas y las specs.'],
        ['Cada app', 'la arquitectura con diagramas, los flujos de usuario y las funciones.'],
        ['Comprobadas', 'un script comprueba que cada función de los docs tiene su spec y su línea en este sitio.'],
        ['Palabras simples', 'docs, commits y PR siguen una sola guía de estilo: la respuesta primero, frases cortas.'],
        ['9 idiomas', 'cada texto que ve una persona sale en 9 idiomas en el mismo cambio.'],
      ],
    },
    {
      id: 'agents',
      title: 'Agentes de código con reglas',
      lead: 'Claude Code, Codex y Kimi Code leen las mismas reglas y los mismos skills.',
      points: [
        ['Reglas en archivos', 'cada repo tiene su AGENTS.md, y un archivo común fija el stack y la estructura.'],
        ['Skills', 'un skill por tarea: publicar, revisar, probar, lanzar. Los públicos están en agent-skills.'],
        [
          'Una tarea, un worktree',
          'cada sesión reserva sus archivos, trabaja en su propio worktree de git y se fusiona con una PR.',
        ],
        ['Archon', 'un lanzador en el PC inicia una sesión por tarea y muestra qué hace cada una.'],
        [
          'Lecciones',
          'un paso que le costó un reintento a un agente se vuelve regla, y la siguiente sesión se lo ahorra.',
        ],
      ],
    },
    {
      id: 'tools',
      title: 'Una herramienta por tarea',
      lead: 'Cada repo usa las mismas herramientas en las mismas versiones.',
      points: [
        ['Fijadas', 'mise fija la versión de cada herramienta, y los lockfiles están en git.'],
        ['Última estable', 'una herramienta nueva empieza en su última versión estable.'],
        ['Actualizadas a la vez', 'un salto mayor de una herramienta compartida llega a cada repo que la usa.'],
        ['Gratis', 'cada herramienta y servicio es gratis, o se queda en su plan gratuito.'],
      ],
    },
  ],
  stack: {
    title: 'El stack',
    head: ['Tarea', 'Elección'],
    rows: [
      ['Apps móviles y web', 'Expo, React Native y react-native-web, un solo código'],
      ['Apps de escritorio', 'Tauri 2, con una interfaz Vite y React sobre un núcleo Rust'],
      [
        'Lógica de cada plataforma',
        'una crate de Rust, compilada a wasm para la web y enlazada por FFI para los teléfonos',
      ],
      ['Backend', 'Rust en Cloudflare Workers, con D1 y R2'],
      ['Datos compartidos en vivo', 'Firestore con Firebase Auth'],
      ['Sitios estáticos', 'Astro en GitHub Pages'],
      ['Código nativo de Android', 'Kotlin y Jetpack Compose'],
      ['Scripts', 'TypeScript en Node'],
      ['Comprobaciones de TypeScript', 'Vitest, oxlint, oxfmt, knip y tsc'],
      ['Comprobaciones de Rust', 'clippy, rustfmt y cargo-shear'],
    ],
  },
} satisfies Engineering;

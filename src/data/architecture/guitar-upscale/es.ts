import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una app Next.js corre en el navegador y en Cloudflare Workers. Capacitor empaqueta la misma build en las apps de Android y iPhone, y el sonido se genera en el dispositivo.',
  parts: [
    {
      name: 'Next.js y React',
      role: 'la página única con cada función, renderizada una vez por el servidor y luego ejecutada en el navegador.',
    },
    {
      name: 'Motor de sonido',
      role: 'los reproductores y grabadores fuera de React, unidos por un bus de eventos con RxJS.',
    },
    {
      name: 'Web Workers',
      role: 'el reloj del compás, la búsqueda de posiciones y la detección de acordes fuera del hilo principal.',
    },
    { name: 'smplr y Web Audio', role: 'instrumentos General MIDI muestreados con un bus de reverb y delay.' },
    { name: 'Redux Toolkit', role: 'los ajustes y el estado de la pantalla, guardados en el navegador.' },
    { name: 'Konva', role: 'los lienzos del mástil, del piano roll y de la tablatura.' },
    { name: 'Capacitor', role: 'empaqueta la build estática en las apps de Android y de iPhone con plugins nativos.' },
    {
      name: 'Cloudflare Workers y KV',
      role: 'alojan la build de servidor con OpenNext, hacen de proxy a los sitios de canciones y guardan las canciones incluidas.',
    },
  ],
  flow: [
    'Un toque, un acorde o una canción cargada pone notas en el bus.',
    'Un reloj en Web Worker sincroniza reproducción, rasgueo y looper.',
    'La biblioteca smplr toca cada nota a través de la reverb y el delay.',
    'Los grabadores guardan cada nota por tick para el piano roll y el MIDI.',
    'Las canciones y letras de sitios externos llegan por el Worker de Cloudflare.',
  ],
  links: [
    { to: 'lumiere-player', text: 'Lumiere Player abre en Guitar Upscale la canción que suena mediante un enlace.' },
    { to: 'keeppad', text: 'La frase Hey Guitar usa el mismo modelo de palabras clave de sherpa-onnx que KeepPad.' },
    {
      to: 'Songsterr',
      text: 'Las tablaturas de Songsterr llegan por el proxy del Worker y se vuelven archivos Guitar Pro.',
    },
    { to: 'Google Play', text: 'Google Play vende Pro y Remove ads, y AdMob muestra los anuncios.' },
    { to: 'Cloudflare', text: 'Cloudflare Workers aloja el sitio, y KV guarda las canciones incluidas.' },
  ],
  features: {
    Fretboard:
      'Konva dibuja el mástil en un lienzo según la escala y la afinación de los ajustes. Un toque manda la nota al bus de eventos, y smplr la toca.',
    'Scale, tuning and capo':
      'Las escalas y afinaciones son datos fijos dentro de la app. Una elección va a Redux, y el mástil y las posiciones se vuelven a construir.',
    Tuner:
      'La biblioteca pitchy lee la altura del micrófono dentro del navegador. La app adivina la afinación por las cuerdas al aire, y Konva dibuja el dial.',
    Chords:
      'Un grupo de hasta 4 Web Workers busca las posiciones para el mástil y la cejilla. El panel se llena un tipo de acorde a la vez.',
    Strumming:
      'Cada botón de acorde pulsado toca el patrón elegido con el reloj del Worker. Los patrones propios quedan en el navegador.',
    'Song list':
      'Las canciones incluidas son archivos Guitar Pro en Cloudflare KV, pasados a JSON en la build. Tus canciones quedan en el navegador, y la lista marca la escala de cada una.',
    'Voice search':
      'En el navegador oye la Speech API, y en Android el servicio de voz del teléfono. Luego la app toca la canción de la lista o la busca en los sitios.',
    'Hey Guitar':
      'En Android un modelo de palabras clave de sherpa-onnx tomado de KeepPad oye la frase sin conexión. En el navegador escucha el servicio de voz mientras la página sigue abierta.',
    'MIDI recording':
      'Un grabador escucha el bus de eventos y guarda cada nota por tick de reloj. Las notas de la propia app llevan una marca, así que la toma las salta.',
    Looper:
      'Cada uno de los 8 canales graba desde el bus con el reloj del Worker. Los loops se redondean a compases enteros y suenan a tempo.',
    Quantize:
      'Una sola duración en los ajustes fija la rejilla del piano roll. Los grabadores ponen cada nota en esa rejilla al llegar.',
    'Piano roll':
      'El piano roll edita en su sitio la línea de notas común, con deshacer por pista. Konva dibuja las notas, y un worker adivina las partes cuando el archivo no las trae.',
    'Tab view':
      'Un módulo de diseño pasa las notas de una pista a trastes sobre cuerdas. Konva dibuja los compases y sigue el cabezal común.',
    'Chord sheet':
      'El Worker trae las letras de sitios de acordes y de letras, pues bloquean las llamadas del navegador. La app pasa sus acordes al tono de la canción y cuadra cada línea en el tiempo.',
    'Song upload':
      'Unos lectores pasan los archivos Guitar Pro y MIDI a notas en el navegador. Un archivo de audio busca su canción por el nombre, o unos modelos ONNX oyen sus acordes en el dispositivo.',
    'Find a song online':
      'El Worker de Cloudflare reenvía cada búsqueda a los 4 sitios de canciones, que bloquean las llamadas del navegador. La app pasa una canción de Songsterr a un archivo Guitar Pro.',
    'Chord and scale detection':
      'Un detector de acordes en un Web Worker compara las notas tocadas con las posiciones. El detector de escalas corre en el hilo principal y sugiere escalas.',
    'Instruments and sound':
      'La biblioteca smplr toca soundfonts General MIDI de bancos libres y los carga en el primer toque. La melodía y los acordes tienen cada uno su instrumento.',
    Effects:
      'Cada instrumento entra en un bus de Web Audio con reverb de convolución y delay con realimentación. Un deslizador cambia el bus en vivo sin recargar el instrumento.',
    'MIDI export':
      'La biblioteca midi-writer-js escribe las notas cargadas en un archivo MIDI. Un módulo de Guitar Pro guarda las mismas notas en un archivo Guitar Pro.',
    'Guitar Upscale Pro':
      'Cada build lleva cada función. La app de Android oculta las funciones Pro hasta que Google Play Billing en el teléfono confirma la compra.',
    'Install and offline':
      'Un service worker guarda en caché las páginas, el código y las canciones para usar sin conexión. La app de Android lleva la build estática y sus sonidos dentro del APK.',
    'iPhone app':
      'Capacitor empaqueta la misma build estática en un proyecto iOS con plugins en Swift. StoreKit vende las compras, y AdMob muestra anuncios tras el aviso de rastreo.',
    'Screen layout':
      'Los componentes de React flotan sobre el lienzo del mástil a pantalla completa. Un ajuste pone los acordes a la izquierda o a la derecha.',
    'Play panel':
      'Un reproductor recorre la línea de notas con el reloj del Worker y manda cada nota al bus. El panel de acordes toma sus posiciones de los workers de búsqueda.',
    'Easy and Pro mode':
      'Un filtro del reproductor deja solo los acordes mientras Easy está activo. Una canción sin acordes suena entera.',
    'Song links':
      'El menú arma una dirección de búsqueda en cada sitio con el nombre de la canción. El sitio se abre en una pestaña nueva o en el navegador de Android.',
    'Built-in songs admin':
      'La página de admin y el teléfono del dueño escriben canciones en Cloudflare KV. La ruta del teléfono comprueba una clave de desarrollador y lanza un despliegue con GitHub Actions.',
    Settings:
      'Redux Toolkit guarda cada ajuste, y redux-persist lo conserva en el navegador. El motor lee una copia simple fuera de React.',
    'Android updates':
      'La build de GitHub pregunta a GitHub Releases por un APK nuevo al abrir y al volver. Un plugin nativo lo descarga y abre el instalador.',
    Ads: 'AdMob muestra el banner y el anuncio a pantalla completa en las apps. Una compra de Remove ads en Google Play o la clave de desarrollador del teléfono los apaga.',
    Languages:
      'i18next guarda el texto de la app en 10 catálogos y sigue el idioma del teléfono o del navegador. Las páginas de lecciones se construyen por idioma bajo su propia ruta.',
  },
};

export default arch;

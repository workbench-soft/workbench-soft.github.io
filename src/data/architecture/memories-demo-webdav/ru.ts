import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Cloudflare Worker на TypeScript понимает те методы WebDAV, которые шлёт Memories. Один Durable Object хранит файлы в своём SQLite на бесплатном тарифе.',
  parts: [
    { name: 'Cloudflare Worker', role: 'проверяет логин Basic и передаёт каждый запрос WebDAV дальше.' },
    { name: 'Durable Object', role: 'одно хранилище на целое дерево, файлы лежат в его SQLite кусками по 1 МБ.' },
    { name: 'Статические файлы', role: 'везут образцы фото вместе с Worker и заполняют хранилище при каждом старте.' },
    { name: 'Скрипт образцов на Python', role: 'рисует 42 искусственных фото и 2 видео с датами EXIF и GPS.' },
    { name: 'Cron', role: 'каждую ночь в 03:00 UTC удаляет слой загрузок.' },
  ],
  flow: [
    'Приложение шлёт запрос WebDAV с логином Basic.',
    'Worker проверяет логин и передаёт запрос в Durable Object.',
    'Чтение сначала смотрит в слой загрузок, потом в образцы.',
    'Приложение получает список папки или байты нужного диапазона.',
  ],
  links: [
    { to: 'memories', text: 'Проверяющий Google Play вводит этот сервер на экране подключения Memories.' },
    { to: 'Google Play', text: 'В разделе App access проверяющий получает адрес и логин.' },
    { to: 'Cloudflare', text: 'Его запускает бесплатный тариф Workers, а CI выкладывает после проверок.' },
  ],
  features: {
    'Sample library':
      'Скрипт на Python рисует фото с датами EXIF и точками GPS у части снимков. Они едут как статические файлы и заполняют Durable Object при старте.',
    'Sign in': 'Worker сверяет одного пользователя Basic с секретом Worker. OPTIONS отвечает без логина.',
    'Uploads and sorting':
      'Загрузки и переносы попадают в отдельный слой поверх образцов только для чтения. Ночной cron удаляет этот слой, и образцы возвращаются.',
  },
};

export default arch;

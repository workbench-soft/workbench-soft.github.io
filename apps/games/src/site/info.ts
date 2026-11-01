import type { Lang } from '../shared/protocol.ts';

export type InfoKey = 'privacy' | 'about';
type Info = { title: string; description: string; sections: { h?: string; p: string[] }[] };

// Cloudflare Email Routing forwards it once the domain is set up.
const CONTACT = 'workbench.soft@gmail.com';

export const INFO: Record<InfoKey, Record<Lang, Info>> = {
  privacy: {
    en: {
      title: 'Privacy policy',
      description: 'What Workbench Games stores, what the ads use, and how to ask for your data to be removed.',
      sections: [
        { p: ['Last updated: 30 October 2026.'] },
        {
          h: 'What the games store',
          p: [
            'There are no accounts. Your browser keeps the name and the color you pick, and a random key that brings you back to your seat after a reload.',
            'A room keeps the names, the scores, the chat and the drawings of its game while people play. 30 minutes after the last player leaves, the room deletes all of it.',
          ],
        },
        {
          h: 'Ads',
          p: [
            'The site shows ads from Google AdSense, and the Android and iOS apps show ads from Google AdMob. Google may use cookies or device identifiers to pick and measure ads.',
            'In the EU, the UK and Switzerland a consent message asks before personal ads show. Read how Google uses data at <a href="https://policies.google.com/technologies/partner-sites">policies.google.com</a>.',
          ],
        },
        {
          h: 'Hosting',
          p: ['Cloudflare hosts the site and the rooms. Cloudflare keeps short term request logs for security.'],
        },
        { h: 'Children', p: ['The games are for a general audience and do not ask for personal information.'] },
        { h: 'Contact', p: [`Questions or a removal request: <a href="mailto:${CONTACT}">${CONTACT}</a>.`] },
      ],
    },
    ru: {
      title: 'Политика конфиденциальности',
      description: 'Что хранит Workbench Games, какие данные использует реклама и как попросить удалить ваши данные.',
      sections: [
        { p: ['Обновлено: 30 октября 2026.'] },
        {
          h: 'Что хранят игры',
          p: [
            'Аккаунтов нет. Браузер хранит выбранные имя и цвет и случайный ключ, по которому вы возвращаетесь на своё место после перезагрузки.',
            'Комната хранит имена, очки, чат и рисунки своей игры, пока идёт игра. Через 30 минут после ухода последнего игрока комната удаляет всё это.',
          ],
        },
        {
          h: 'Реклама',
          p: [
            'Сайт показывает рекламу Google AdSense, а приложения для Android и iOS показывают рекламу Google AdMob. Google может использовать cookie или идентификаторы устройства, чтобы подбирать и измерять рекламу.',
            'В ЕС, Великобритании и Швейцарии перед персональной рекламой появляется запрос согласия. Как Google использует данные: <a href="https://policies.google.com/technologies/partner-sites">policies.google.com</a>.',
          ],
        },
        {
          h: 'Хостинг',
          p: ['Сайт и комнаты работают на Cloudflare. Cloudflare хранит короткие журналы запросов для защиты.'],
        },
        { h: 'Дети', p: ['Игры рассчитаны на широкую аудиторию и не просят личных данных.'] },
        { h: 'Связь', p: [`Вопросы и просьбы об удалении: <a href="mailto:${CONTACT}">${CONTACT}</a>.`] },
      ],
    },
  },
  about: {
    en: {
      title: 'About Workbench Games',
      description:
        'Workbench Games makes free party games for friends: drawing, guessing and word games that run in the browser.',
      sections: [
        {
          p: [
            'Workbench Games is a small studio of free party games. Each game runs in the browser, so friends join with a link and play on any device.',
            'The games are free for players. Ads in the lobby and on the results screen pay for the servers, and the game screens stay clear.',
          ],
        },
        { h: 'Contact', p: [`Ideas, bugs, or words to add: <a href="mailto:${CONTACT}">${CONTACT}</a>.`] },
      ],
    },
    ru: {
      title: 'О Workbench Games',
      description:
        'Workbench Games делает бесплатные игры для компании: рисовалки, угадайки и игры в слова прямо в браузере.',
      sections: [
        {
          p: [
            'Workbench Games делает бесплатные игры для компании. Каждая игра работает в браузере, поэтому друзья заходят по ссылке и играют с любого устройства.',
            'Игры бесплатны для игроков. Реклама в лобби и на экране итогов оплачивает серверы, а во время игры её нет.',
          ],
        },
        { h: 'Связь', p: [`Идеи, ошибки или слова для игр: <a href="mailto:${CONTACT}">${CONTACT}</a>.`] },
      ],
    },
  },
};

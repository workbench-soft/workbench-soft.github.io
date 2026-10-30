import type { Lang, Mode } from '../shared/protocol.ts';

type Faq = { q: string; a: string };
type GameText = {
  title: string;
  description: string;
  h1: string;
  lead: string;
  players: string;
  time: string;
  rules: string[];
  tips: string[];
  faq: Faq[];
};

type SiteText = {
  brand: string;
  nav: Record<Mode | 'about', string>;
  create: string;
  createFor: string;
  joinCode: string;
  joinCodePlaceholder: string;
  joinGo: string;
  rulesTitle: string;
  tipsTitle: string;
  faqTitle: string;
  playersLabel: string;
  timeLabel: string;
  otherGames: string;
  footer: string;
  privacy: string;
  about: string;
  langOther: string;
  langSuggest: string;
  home: { title: string; description: string; h1: string; lead: string; stepsTitle: string; steps: string[]; faq: Faq[] };
  games: Record<Mode, GameText>;
};

const en: SiteText = {
  brand: 'Workbench Games',
  nav: { guess: 'Guess the drawing', telephone: 'Drawing telephone', duel: 'Clue duel', about: 'About' },
  create: 'Create a room',
  createFor: 'Play {game}',
  joinCode: 'Have a room code?',
  joinCodePlaceholder: 'ABC123',
  joinGo: 'Join',
  rulesTitle: 'How to play',
  tipsTitle: 'Tips',
  faqTitle: 'Questions',
  playersLabel: 'Players',
  timeLabel: 'Game time',
  otherGames: 'More games',
  footer: 'Free party games in the browser. No account, no download.',
  privacy: 'Privacy',
  about: 'About',
  langOther: 'Русский',
  langSuggest: 'Эта страница есть на русском',
  home: {
    title: 'Free online drawing and word games with friends | Workbench Games',
    description:
      'Play guess the drawing, drawing telephone and a team word game with friends online. Free, no sign up, no download. Make a room and send the link.',
    h1: 'Party games for friends, right in the browser',
    lead: 'Make a room, send the link, and play together in a minute. On a phone, a tablet or a computer. Free, with no account.',
    stepsTitle: 'How it works',
    steps: [
      'Press “Create a room”. The room gets its own link.',
      'Send the link to friends in any chat. They open it and type a name.',
      'Pick a game in the lobby and press Start.',
    ],
    faq: [
      { q: 'Is it free?', a: 'Yes. Every game is free. A small banner shows in the lobby and on the results screen, and the game screens stay free of ads.' },
      { q: 'Do I need an account?', a: 'No. Type a name when you open the room. The browser keeps it for next time.' },
      { q: 'How many people can play?', a: 'From 2 to 12 players in a room. The clue duel needs 4 or more, in two teams.' },
      { q: 'Does it work on a phone?', a: 'Yes. The games run in any modern browser on Android, iPhone, tablets and computers. Draw with a finger, a pen or a mouse.' },
    ],
  },
  games: {
    guess: {
      title: 'Guess the drawing online: free draw and guess game | Workbench Games',
      description:
        'One player draws a word, everyone else races to guess it in the chat. Free online drawing and guessing game for 2 to 12 friends. No sign up.',
      h1: 'Guess the drawing',
      lead: 'One player draws, the others guess in the chat. The faster the right guess, the more points it earns.',
      players: '2 to 12',
      time: '10 to 30 minutes',
      rules: [
        'Each round, every player takes one turn as the artist.',
        'The artist picks one of 3 words and draws it. Letters and numbers on the picture are against the spirit of the game.',
        'The others type guesses in the chat. A right guess stays hidden from the players who still guess.',
        'A fast right guess earns up to 500 points. The artist gets 60 points for each player who guessed.',
        'In the second half of the turn the game shows a few letters of the word.',
        'After the last round the player with the most points wins.',
      ],
      tips: [
        'Start with the big shape, then add the details.',
        'Draw the context: a beach around a sandcastle, a road under a car.',
        'Watch the chat. A guess that is almost right gets a “close” note.',
        'The host can add the group’s own words, such as names of friends or inside jokes.',
      ],
      faq: [
        { q: 'Can we use our own words?', a: 'Yes. The host types them in the lobby, comma separated. With 12 words or more the game can use only those.' },
        { q: 'Which languages are the words in?', a: 'English and Russian. The host picks the language in the lobby.' },
        { q: 'What if the artist leaves?', a: 'The turn ends, everyone sees the word, and the next player draws.' },
      ],
    },
    telephone: {
      title: 'Drawing telephone online: free game of telephone with pictures | Workbench Games',
      description:
        'Write a phrase, draw what you get, describe the drawing, and watch the story change around the group. Free online telephone game, no sign up.',
      h1: 'Drawing telephone',
      lead: 'A phrase goes round the group. Each player draws what the last one wrote, or describes what the last one drew. At the end everyone sees how the story changed.',
      players: '2 to 12, best with 4 or more',
      time: '10 to 20 minutes',
      rules: [
        'Everyone writes a short phrase. Stuck? Press “Give me an idea”.',
        'Each phrase goes to the next player, who draws it.',
        'The drawing goes to the next player, who describes it in words, without seeing the phrase.',
        'Steps take turns, drawing and describing, until each story has been round the group.',
        'At the end the host shows each story step by step to the whole room.',
      ],
      tips: [
        'Odd and specific phrases make the best stories: “a shark at the dentist”.',
        'Describe what you see, not what you think the phrase was.',
        'Pick the slow speed for detailed drawings and the fast speed for chaos.',
      ],
      faq: [
        { q: 'Is there a score?', a: 'No. The fun is in the stories at the end.' },
        { q: 'What happens when time runs out?', a: 'The game sends what you have so far. An empty step shows as skipped.' },
        { q: 'Can someone join in the middle?', a: 'They watch the current game and play in the next one.' },
      ],
    },
    duel: {
      title: 'Clue duel: free online team word association game | Workbench Games',
      description:
        'Two teams, one board of 12 words. Give a one word clue for your 2 secret words, but the other team sees it too and can steal them. Free, no sign up.',
      h1: 'Clue duel',
      lead: 'Two teams share one board of 12 words. Each clue giver hides 2 words behind a single word clue. Both clues are public, so the other team can steal your words.',
      players: '4 to 12, in two teams',
      time: '10 to 20 minutes',
      rules: [
        'Players split into the red and the blue team. Each round one player per team is the clue giver.',
        'Each clue giver sees 2 secret words on the board and gives one word that points at both.',
        'A clue must be one word and may not be a word from the board.',
        'Both teams see both clues. Each team picks 2 words and locks them in.',
        'A word of your own team earns 2 points. A word of the other team earns 1 point.',
        'After the last round the team with more points wins.',
      ],
      tips: [
        'A clue only your team gets is the best clue: a shared memory, a joke, a place.',
        'Look at the other team’s clue too. Their words are worth a point.',
        'Talk it over in voice chat before you lock in.',
      ],
      faq: [
        { q: 'How is this different from other word games?', a: 'Both teams play at the same time on one board, and every clue is public. Stealing points makes each clue a bet.' },
        { q: 'What if the teams are uneven?', a: 'The game evens them out at the start, so each team has at least 2 players.' },
        { q: 'Can we use our own words?', a: 'Yes. The host adds them in the lobby. With 12 or more the board can use only those.' },
      ],
    },
  },
};

const ru: SiteText = {
  brand: 'Workbench Games',
  nav: { guess: 'Угадай рисунок', telephone: 'Испорченный телефон', duel: 'Дуэль подсказок', about: 'О сайте' },
  create: 'Создать комнату',
  createFor: 'Играть: {game}',
  joinCode: 'Есть код комнаты?',
  joinCodePlaceholder: 'ABC123',
  joinGo: 'Войти',
  rulesTitle: 'Как играть',
  tipsTitle: 'Советы',
  faqTitle: 'Вопросы',
  playersLabel: 'Игроки',
  timeLabel: 'Длительность',
  otherGames: 'Другие игры',
  footer: 'Бесплатные игры для компании прямо в браузере. Без регистрации и установки.',
  privacy: 'Конфиденциальность',
  about: 'О сайте',
  langOther: 'English',
  langSuggest: 'This page is in English too',
  home: {
    title: 'Бесплатные онлайн игры с друзьями: рисовалки и слова | Workbench Games',
    description:
      'Угадай рисунок, испорченный телефон с рисунками и командная игра в ассоциации. Играйте с друзьями онлайн бесплатно, без регистрации: создайте комнату и отправьте ссылку.',
    h1: 'Игры для компании прямо в браузере',
    lead: 'Создайте комнату, отправьте ссылку и играйте вместе через минуту. На телефоне, планшете или компьютере. Бесплатно и без аккаунта.',
    stepsTitle: 'Как это работает',
    steps: [
      'Нажмите «Создать комнату». У комнаты будет своя ссылка.',
      'Отправьте ссылку друзьям в любом чате. Они откроют её и введут имя.',
      'Выберите игру в лобби и нажмите «Начать».',
    ],
    faq: [
      { q: 'Это бесплатно?', a: 'Да, все игры бесплатные. Небольшой баннер есть в лобби и на экране итогов, а во время игры рекламы нет.' },
      { q: 'Нужна регистрация?', a: 'Нет. Введите имя, когда откроете комнату. Браузер запомнит его.' },
      { q: 'Сколько человек может играть?', a: 'От 2 до 12 в одной комнате. Для дуэли подсказок нужно от 4 игроков в двух командах.' },
      { q: 'Работает на телефоне?', a: 'Да. Игры идут в любом современном браузере на Android, iPhone, планшетах и компьютерах. Рисовать можно пальцем, стилусом или мышкой.' },
    ],
  },
  games: {
    guess: {
      title: 'Угадай рисунок онлайн: бесплатная рисовалка с друзьями | Workbench Games',
      description:
        'Один рисует слово, остальные угадывают в чате. Бесплатная онлайн игра «рисуй и угадывай» для компании от 2 до 12 человек. Без регистрации.',
      h1: 'Угадай рисунок',
      lead: 'Один игрок рисует, остальные угадывают в чате. Чем быстрее верный ответ, тем больше очков.',
      players: 'от 2 до 12',
      time: '10–30 минут',
      rules: [
        'В каждом раунде каждый игрок один раз рисует.',
        'Художник выбирает одно из 3 слов и рисует его. Буквы и цифры на рисунке против духа игры.',
        'Остальные пишут варианты в чат. Верный ответ скрыт от тех, кто ещё угадывает.',
        'Быстрый верный ответ даёт до 500 очков. Художник получает 60 очков за каждого угадавшего.',
        'Во второй половине хода игра открывает несколько букв.',
        'После последнего раунда побеждает игрок с наибольшим счётом.',
      ],
      tips: [
        'Сначала крупная форма, потом детали.',
        'Рисуйте окружение: пляж вокруг замка из песка, дорогу под машиной.',
        'Следите за чатом. Почти верный ответ получает пометку «близко».',
        'Ведущий может добавить свои слова: имена друзей или шутки вашей компании.',
      ],
      faq: [
        { q: 'Можно играть со своими словами?', a: 'Да. Ведущий вводит их в лобби через запятую. Если слов 12 и больше, игра может брать только их.' },
        { q: 'На каких языках слова?', a: 'На русском и английском. Язык выбирает ведущий.' },
        { q: 'Что будет, если художник выйдет?', a: 'Ход закончится, все увидят слово, и рисовать начнёт следующий.' },
      ],
    },
    telephone: {
      title: 'Испорченный телефон с рисунками онлайн, бесплатно | Workbench Games',
      description:
        'Напишите фразу, нарисуйте то, что получили, опишите рисунок и посмотрите, во что превратится история. Бесплатный испорченный телефон онлайн без регистрации.',
      h1: 'Испорченный телефон',
      lead: 'Фраза идёт по кругу. Каждый рисует то, что написал предыдущий, или описывает то, что он нарисовал. В конце все видят, как изменилась история.',
      players: 'от 2 до 12, лучше от 4',
      time: '10–20 минут',
      rules: [
        'Каждый пишет короткую фразу. Нет идей? Нажмите «Подкинь идею».',
        'Фраза уходит следующему игроку, и он её рисует.',
        'Рисунок уходит дальше, и следующий описывает его словами, не видя фразы.',
        'Шаги чередуются, рисунок и описание, пока история не пройдёт весь круг.',
        'В конце ведущий показывает каждую историю по шагам всей комнате.',
      ],
      tips: [
        'Лучшие истории выходят из странных и точных фраз: «акула у зубного врача».',
        'Описывайте то, что видите, а не то, что могло быть в начале.',
        'Медленный темп подходит для подробных рисунков, быстрый для хаоса.',
      ],
      faq: [
        { q: 'Здесь есть очки?', a: 'Нет. Всё веселье в историях в конце.' },
        { q: 'Что будет, если время вышло?', a: 'Игра отправит то, что уже есть. Пустой шаг будет отмечен как пропуск.' },
        { q: 'Можно присоединиться посреди игры?', a: 'Новый игрок смотрит текущую игру и играет в следующей.' },
      ],
    },
    duel: {
      title: 'Дуэль подсказок: командная игра в ассоциации онлайн | Workbench Games',
      description:
        'Две команды и доска из 12 слов. Дайте подсказку в одно слово к 2 тайным словам, но соперники тоже её видят и могут перехватить. Бесплатно, без регистрации.',
      h1: 'Дуэль подсказок',
      lead: 'Две команды играют на одной доске из 12 слов. Каждый подсказывающий прячет 2 слова за одной подсказкой. Обе подсказки видят все, так что соперники могут перехватить ваши слова.',
      players: 'от 4 до 12, две команды',
      time: '10–20 минут',
      rules: [
        'Игроки делятся на красных и синих. В каждом раунде в команде один подсказывающий.',
        'Подсказывающий видит 2 тайных слова на доске и даёт одно слово, которое ведёт к обоим.',
        'Подсказка состоит из одного слова и не может быть словом с доски.',
        'Обе команды видят обе подсказки. Каждая выбирает 2 слова и подтверждает выбор.',
        'Слово своей команды даёт 2 очка. Слово соперников даёт 1 очко.',
        'После последнего раунда побеждает команда с большим счётом.',
      ],
      tips: [
        'Лучшая подсказка та, которую поймёт только ваша команда: общее воспоминание, шутка, место.',
        'Смотрите и на подсказку соперников. Их слова тоже приносят очко.',
        'Обсудите выбор в голосовом чате, прежде чем подтвердить.',
      ],
      faq: [
        { q: 'Чем это отличается от других игр в слова?', a: 'Обе команды играют одновременно на одной доске, и каждая подсказка открыта. Перехват очков превращает подсказку в ставку.' },
        { q: 'Что если команды неравные?', a: 'В начале игра выравнивает команды, так что в каждой будет минимум 2 игрока.' },
        { q: 'Можно играть со своими словами?', a: 'Да. Ведущий добавляет их в лобби. Если слов 12 и больше, доска может брать только их.' },
      ],
    },
  },
};

export const TEXT: Record<Lang, SiteText> = { en, ru };

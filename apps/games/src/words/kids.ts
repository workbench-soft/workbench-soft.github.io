// Words a small child knows and can draw, each with a picture, so a guess is a tap on the picture.
const KIDS: readonly [emoji: string, en: string, ru: string][] = [
  ['🍎', 'apple', 'яблоко'], ['🍌', 'banana', 'банан'], ['🍒', 'cherry', 'вишня'], ['🍇', 'grapes', 'виноград'],
  ['🍋', 'lemon', 'лимон'], ['🍐', 'pear', 'груша'], ['🍓', 'strawberry', 'клубника'], ['🍉', 'watermelon', 'арбуз'],
  ['🥕', 'carrot', 'морковь'], ['🍄', 'mushroom', 'гриб'], ['🎃', 'pumpkin', 'тыква'], ['🧀', 'cheese', 'сыр'],
  ['🍕', 'pizza', 'пицца'], ['🍰', 'cake', 'торт'], ['🍪', 'cookie', 'печенье'], ['🍦', 'ice cream', 'мороженое'],
  ['🥚', 'egg', 'яйцо'], ['🍭', 'lollipop', 'леденец'], ['🐱', 'cat', 'кошка'], ['🐶', 'dog', 'собака'],
  ['🐴', 'horse', 'лошадь'], ['🐮', 'cow', 'корова'], ['🐷', 'pig', 'свинья'], ['🐑', 'sheep', 'овца'],
  ['🐔', 'chicken', 'курица'], ['🦆', 'duck', 'утка'], ['🐰', 'rabbit', 'кролик'], ['🐭', 'mouse', 'мышь'],
  ['🦁', 'lion', 'лев'], ['🐯', 'tiger', 'тигр'], ['🐻', 'bear', 'медведь'], ['🦊', 'fox', 'лиса'],
  ['🐵', 'monkey', 'обезьяна'], ['🐘', 'elephant', 'слон'], ['🦒', 'giraffe', 'жираф'], ['🐼', 'panda', 'панда'],
  ['🐧', 'penguin', 'пингвин'], ['🦉', 'owl', 'сова'], ['🐍', 'snake', 'змея'], ['🐸', 'frog', 'лягушка'],
  ['🐢', 'turtle', 'черепаха'], ['🐟', 'fish', 'рыба'], ['🐳', 'whale', 'кит'], ['🐙', 'octopus', 'осьминог'],
  ['🐌', 'snail', 'улитка'], ['🐝', 'bee', 'пчела'], ['🦋', 'butterfly', 'бабочка'], ['🐞', 'ladybug', 'божья коровка'],
  ['🦕', 'dinosaur', 'динозавр'], ['🤖', 'robot', 'робот'], ['👻', 'ghost', 'привидение'], ['☀️', 'sun', 'солнце'],
  ['🌙', 'moon', 'луна'], ['⭐', 'star', 'звезда'], ['☁️', 'cloud', 'облако'], ['🌈', 'rainbow', 'радуга'],
  ['❄️', 'snowflake', 'снежинка'], ['🌳', 'tree', 'дерево'], ['🌸', 'flower', 'цветок'], ['🏠', 'house', 'дом'],
  ['🚗', 'car', 'машина'], ['🚌', 'bus', 'автобус'], ['🚂', 'train', 'поезд'], ['✈️', 'plane', 'самолёт'],
  ['🚀', 'rocket', 'ракета'], ['⛵', 'boat', 'лодка'], ['🚲', 'bike', 'велосипед'], ['⚽', 'ball', 'мяч'],
  ['🎈', 'balloon', 'шарик'], ['🎁', 'gift', 'подарок'], ['👑', 'crown', 'корона'], ['☂️', 'umbrella', 'зонт'],
  ['👓', 'glasses', 'очки'], ['🔑', 'key', 'ключ'], ['⏰', 'clock', 'часы'], ['📚', 'book', 'книга'],
  ['✏️', 'pencil', 'карандаш'], ['❤️', 'heart', 'сердце'], ['👟', 'shoe', 'ботинок'], ['🎩', 'hat', 'шляпа'],
];

export const KIDS_WORDS = { en: KIDS.map((k) => k[1]), ru: KIDS.map((k) => k[2]) };

const PICTURES = new Map(KIDS.flatMap(([emoji, en, ru]) => [[en, emoji], [ru, emoji]]));

/** The picture of a kids word, or null for a word outside the list. */
export function pictureOf(word: string | null | undefined): string | null {
  return (word && PICTURES.get(word.toLowerCase())) || null;
}

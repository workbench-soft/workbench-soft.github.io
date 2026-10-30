import type { Lang } from '../shared/protocol.ts';

// Starting phrases for drawing telephone. A player who skips the first step gets one of these.
const prompts: Record<Lang, string[]> = {
  en: [
    'A cat driving a bus',
    'A dragon afraid of mice',
    'Grandma on a skateboard',
    'A robot falling in love',
    'Pizza delivered by a rocket',
    'A shark at the dentist',
    'A snowman on the beach',
    'A ghost who loves coffee',
    'A penguin in the desert',
    'A wizard who lost his hat',
    'Dinosaurs having a picnic',
    'A cow jumping over the moon',
    'An alien taking a selfie',
    'A knight riding a giant snail',
    'A banana in a superhero cape',
    'The fridge is full of bees',
    'A pirate who is seasick',
    'Two dogs playing chess',
    'A tree growing money',
    'A vampire at the beach',
  ],
  ru: [
    'Кот за рулём автобуса',
    'Дракон боится мышей',
    'Бабушка на скейтборде',
    'Робот влюбился',
    'Пиццу везёт ракета',
    'Акула у зубного врача',
    'Снеговик на пляже',
    'Привидение пьёт кофе',
    'Пингвин в пустыне',
    'Волшебник потерял шляпу',
    'Динозавры на пикнике',
    'Корова прыгает через луну',
    'Инопланетянин делает селфи',
    'Рыцарь верхом на улитке',
    'Банан в плаще супергероя',
    'В холодильнике живут пчёлы',
    'Пирата укачало',
    'Две собаки играют в шахматы',
    'Дерево, на котором растут деньги',
    'Вампир загорает на пляже',
  ],
};

export function randomPrompt(lang: Lang, random: () => number = Math.random): string {
  const list = prompts[lang];
  return list[Math.floor(random() * list.length)];
}

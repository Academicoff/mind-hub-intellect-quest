export type Discipline = 'spin' | 'cash' | 'mtt';

export interface SelectAnswer {
  label: string;
  to: Discipline | Discipline[];     // массив — если даём сразу два балла
}

export interface SelectQuestion {
  id: number;
  text: string;
  answers: SelectAnswer[];
}

export const selectQuestions: SelectQuestion[] = [
  {
    id: 1,
    text: 'Сколько времени ты готов тратить на одну игровую сессию? Ориентируясь на свой график и усидчивость',
    answers: [
      { label: 'До 20 минут', to: 'spin' },
      { label: '2–4 часа',    to: 'cash' },
      { label: '5+ часов',    to: 'mtt'  },
    ],
  },
  {
    id: 2,
    text: 'Какой формат ты предпочитаешь по количеству игроков за столом?',
    answers: [
      { label: '3-max, чтобы всё быстро',           to: 'spin' },
      { label: '6-max, чтобы был экшен и пространство', to: 'cash' },
      { label: '8-9-max, люблю масштаб и структуру',    to: 'mtt'  },
    ],
  },
  {
    id: 3,
    text: 'Что тебе важнее в игре?',
    answers: [
      { label: 'Адреналин',        to: 'spin' },
      { label: 'Анализ и развитие',to: 'cash' },
      { label: 'Крупные выигрыши', to: 'mtt'  },
    ],
  },
  {
    id: 4,
    text: 'Как тебе идея играть ночью?',
    answers: [
      { label: 'Только если совсем не спится', to: 'spin' },
      { label: 'Иногда — по ситуации',         to: 'cash' },
      { label: 'Нормально, турниры же ночью',  to: 'mtt'  },
    ],
  },
  {
    id: 5,
    text: 'Где ты чувствуешь уверенность?',
    answers: [
      { label: 'В пуш-фолд ситуациях',   to: 'spin' },
      { label: 'В кэш-спотах 100bb',     to: 'cash' },
      { label: 'В глубокой стадии турнира', to: 'mtt' },
    ],
  },
  {
    id: 6,
    text: 'Что ты ценишь в покере?',
    answers: [
      { label: 'Быструю отдачу',                to: 'spin' },
      { label: 'Техничность',                   to: 'cash' },
      { label: 'Потенциал крупных выигрышей',   to: 'mtt'  },
    ],
  },
  {
    id: 7,
    text: 'Какой формат тебе кажется скучным?',
    answers: [
      { label: 'Турниры', to: ['spin','cash'] },   // +1 к spin и cash
      { label: 'Спины',   to: 'mtt' },
      { label: 'Кэш',     to: 'mtt' },
    ],
  },
  {
    id: 8,
    text: 'Сколько ты уже в онлайн-покере?',
    answers: [
      { label: 'До 3 месяцев',             to: 'spin' },
      { label: 'От 3 месяцев до 1 года',   to: 'cash' },
      { label: 'Больше года',              to: 'mtt'  },
    ],
  },
  {
    id: 9,
    text: 'Ты бы поехал на офлайн-серию?',
    answers: [
      { label: 'Нет, мне онлайн подходит',     to: 'spin' },
      { label: 'Возможно, ради опыта',         to: 'cash' },
      { label: 'Мечтаю попасть на WSOP',       to: 'mtt'  },
    ],
  },
  {
    id: 10,
    text: 'Что тебе ближе по духу?',
    answers: [
      { label: 'Скорость',                                   to: 'spin' },
      { label: 'Средняя продолжительность и темп игры',      to: 'cash' },
      { label: 'Марафоны и долгие катки',                    to: 'mtt'  },
    ],
  },
  {
    id: 11,
    text: 'Что думаешь про ICM?',
    answers: [
      { label: 'Звучит как Wi-Fi роутер', to: 'spin' },
      { label: 'Знаю основы',             to: 'cash' },
      { label: 'Учитываю постоянно',      to: 'mtt'  },
    ],
  },
  {
    id: 12,
    text: 'Насколько для вас важны перерывы?',
    answers: [
      { label: 'Нужны длительные перерывы',                                   to: 'spin' },
      { label: 'Перерывы для слабаков, готов играть часами',                  to: 'cash' },
      { label: 'Регулярных пятиминуток достаточно',                           to: 'mtt'  },
    ],
  },
  {
    id: 13,
    text: 'Какие вводные в игре вам нравятся больше?',
    answers: [
      { label: 'Просчитанные решения, минимум креатива',      to: ['spin','cash'] },
      { label: 'Много сложных решений, простор для творчества', to: 'mtt' },
    ],
  },
  {
    id: 14,
    text: 'Как вам больше нравится играть в покер?',
    answers: [
      { label: 'Гибкий график, играю «по настроению»',           to: ['spin','cash'] },
      { label: 'Нужно чёткое расписание и длинные сессии',       to: 'mtt' },
    ],
  },
  {
    id: 15,
    text: 'Что для вас приоритетнее?',
    answers: [
      { label: 'Стабильный ежемесячный доход',  to: ['spin','cash'] },
      { label: 'Редкие, но крупные заносы',     to: 'mtt' },
    ],
  },
  {
    id: 16,
    text: 'Вам нравится дух соревнования и больших побед?',
    answers: [
      { label: 'Да, обожаю',                                        to: 'mtt' },
      { label: 'Главное — стабильный заработок',                    to: ['spin','cash'] },
    ],
  },
];

// questions.ts
import { Question } from "@/types/quiz";

/**
 * 50 покерно-IQ-и логических задач в случайном порядке.
 * type — все text, чтобы не подгружать изображения.
 * correctAnswer — индекс (0-3).
 */

export const questions: Question[] = [
  /* 1  */ { id: 1,  type: "text", question: "У кости три грани красные, три — белые. Какова вероятность, что выпадет красная грань?", options: ["1/3", "2/3", "1/2", "5/6"], correctAnswer: 2 },
  /* 2  */ { id: 2,  type: "text", question: "Что значит «фолд»?", options: ["Поднять ставку", "Сбросить карты", "Посмотреть карты соперника", "Сделать чек"], correctAnswer: 1 },
  /* 3  */ { id: 3,  type: "text", question: "У оппонента три возможных блефа и один натс. Какова вероятность натса?", options: ["25 %", "33 %", "50 %", "75 %"], correctAnswer: 0 },
  /* 4  */ { id: 4,  type: "text", question: "Mary — 16 лет. Она в четыре раза старше брата. Сколько лет будет Mary, когда она станет вдвое старше брата?", options: ["20", "24", "28", "32"], correctAnswer: 1 },
  /* 5  */ { id: 5,  type: "text", question: "Какой HUD-стат лучше всего отражает пост-флоп агрессию?", options: ["VPIP", "WTSD", "AFq", "3-bet %"], correctAnswer: 2 },
  /* 6  */ { id: 6,  type: "text", question: "Какая комбинация старше?", options: ["Стрит", "Флеш", "Сет", "Две пары"], correctAnswer: 1 },
  /* 7  */ { id: 7,  type: "text", question: "Какое число логично продолжит ряд: 2 – 3 – 5 – 8 – ?", options: ["10", "11", "13", "15"], correctAnswer: 2 },
  /* 8  */ { id: 8,  type: "text", question: "Банк 90 фишек, нужно коллить 30. Сколько «чистых» аутов требуется, чтобы колл был +EV?", options: ["5", "6", "7", "9"], correctAnswer: 1 },
  /* 9  */ { id: 9,  type: "text", question: "Укажите лишнее слово: ♥K, ♠Q, ♦J, ♣10", options: ["K", "Q", "J", "10"], correctAnswer: 2 },
  /* 10 */ { id:10,  type: "text", question: "Сколько карт на руках у каждого игрока в техасском холдеме?", options: ["2", "3", "4", "5"], correctAnswer: 0 },

  /* 11 */ { id:11,  type: "text", question: "Вероятность двух случайных карт одной масти равна…", options: ["1 к 4", "1 к 4,9", "1 к 6", "1 к 12"], correctAnswer: 1 },
  /* 12 */ { id:12,  type: "text", question: "J♦ 10♦, флоп A♦ 8♦ 2♠ — что у тебя?", options: ["Флеш", "Флеш-дро", "Стрит", "Ничего"], correctAnswer: 1 },
  /* 13 */ { id:13,  type: "text", question: "Какое число НЕ делится на 3: 7 364 / 7 372 / 7 381 / 7 392?", options: ["7 364", "7 372", "7 381", "7 392"], correctAnswer: 3 },
  /* 14 */ { id:14,  type: "text", question: "Какое число должно стоять вместо «?»: 3, 6, 12, 24, ?", options: ["36", "40", "48", "60"], correctAnswer: 2 },
  /* 15 */ { id:15,  type: "text", question: "Сколько чётных чисел между 1 и 99?", options: ["48", "49", "50", "98"], correctAnswer: 1 },
  /* 16 */ { id:16,  type: "text", question: "Что такое «блайнды»?", options: ["Декор стола", "Принудительные ставки", "Сотрудники казино", "Слепые игроки"], correctAnswer: 1 },
  /* 17 */ { id:17,  type: "text", question: "Банк 240 $, ставка 60 $. Минимальное эквити для колла?", options: ["17 %", "20 %", "25 %", "30 %"], correctAnswer: 1 },
  /* 18 */ { id:18,  type: "text", question: "5 игроков играют 5 раздач за 5 минут. Сколько раздач сыграет 100 игроков за 100 минут?", options: ["100", "500", "2000", "200"], correctAnswer: 2 },
  /* 19 */ { id:19,  type: "text", question: "Продолжите ряд фигур: квадрат, пятиугольник, шестиугольник, …", options: ["Треугольник", "Семиугольник", "Восьмиугольник", "Девятиугольник"], correctAnswer: 1 },
  /* 20 */ { id:20,  type: "text", question: "JJ, доска K♠ Q♦ 5♣ 7♠ 3♣. Это…", options: ["Топ-пара", "Мидл-пара", "Оверпара", "Сет"], correctAnswer: 1 },

  /* 21 */ { id:21,  type: "text", question: "Оверпара — это…", options: ["Пара в руке выше любой карты борда", "Топ-пара", "Нац-стрит", "Две пары"], correctAnswer: 0 },
  /* 22 */ { id:22,  type: "text", question: "«Олл-ин» означает…", options: ["Сбросить карты", "Поставить все фишки", "Закончить игру", "Все в раздаче"], correctAnswer: 1 },
  /* 23 */ { id:23,  type: "text", question: "Банк 100 $, вы ставите 40 $. Пот-оддс для оппонента равны…", options: ["1 к 4", "1 к 3,5", "1 к 2,5", "1 к 2"], correctAnswer: 1 },
  /* 24 */ { id:24,  type: "text", question: "Сколько различных путей из угла A в угол B по сетке 2×2, двигаясь только вправо и вниз?", options: ["4", "5", "6", "8"], correctAnswer: 2 },
  /* 25 */ { id:25,  type: "text", question: "Рукопожатия: 6 игроков за столом жмут руки всем. Сколько рукопожатий?", options: ["12", "15", "18", "21"], correctAnswer: 1 },
  /* 26 */ { id:26,  type: "text", question: "Вероятность поймать один из 9 аутов на ривере ≈ …", options: ["12 %", "18 %", "24 %", "27 %"], correctAnswer: 1 },
  /* 27 */ { id:27,  type: "text", question: "Что значит «флеш-дро»?", options: ["Уже готовый флеш", "Четыре карты масти, не флеш", "Две пары", "Гатшот"], correctAnswer: 1 },
  /* 28 */ { id:28,  type: "text", question: "Колода перемешана. Шанс, что верхняя карта — туз или король?", options: ["1/13", "2/13", "4/13", "1/4"], correctAnswer: 1 },
  /* 29 */ { id:29,  type: "text", question: "Если сегодня пятница, какой день недели будет через 45 дней?", options: ["Воскресенье", "Понедельник", "Вторник", "Среда"], correctAnswer: 1 },
  /* 30 */ { id:30,  type: "text", question: "Какое число лишнее: 11, 13, 17, 19, 23, 27, 29", options: ["13", "19", "23", "27"], correctAnswer: 3 },

  /* 31 */ { id:31,  type: "text", question: "В турнире 256 игроков, половина выбывает каждый тур. Сколько туров до победы?", options: ["7", "8", "9", "10"], correctAnswer: 1 },
  /* 32 */ { id:32,  type: "text", question: "Три игрока играют 10000 раздач за 6 часов. Сколько часов потребуется двум игрокам?", options: ["4", "6", "9", "12"], correctAnswer: 2 },
  /* 33 */ { id:33,  type: "text", question: "Вы делаете ставку на ривере в пустой банк (0$) размером 100$, представляя чистый блеф. Чтобы ваш блеф был безубыточным (EV = 0), как часто оппонент ДОЛЖЕН фолдить?", options: ["25%", "40%", "50%", "66.7%"], correctAnswer: 2 },
  /* 34 */ { id:34,  type: "text", question: "Все гении усердны. Некоторые игроки — гении. Следовательно…", options: ["Некоторые игроки усердны", "Все игроки усердны", "Некоторые гении — игроки", "Ни один игрок не усерден"], correctAnswer: 0 },
  /* 35 */ { id:35,  type: "text", question: "Какой эксплойт выгоден против фолда на 3-бет > 80 %?", options: ["Лимп-рейз", "3-бет/fold лайт", "2,5 bb тайтово", "Коллировать чаще"], correctAnswer: 1 },
  /* 36 */ { id:36,  type: "text", question: "Логика: ряд 1 1 2 3 5 8 ?. Следующее число…", options: ["11", "13", "15", "16"], correctAnswer: 1 },
  /* 37 */ { id:37,  type: "text", question: "Пара восьмёрок: шанс собрать сет на флопе ≈ …", options: ["22 %", "11,8 %", "8 %", "15 %"], correctAnswer: 1 },
  /* 38 */ { id:38,  type: "text", question: "Фишка диаметром 2 см случайно падает на стол, расчерченный параллельными линиями через каждые 4 см. Какова вероятность, что фишка пересечет какую-либо линию?", options: ["25%", "50%", "64%", "75%"], correctAnswer: 2 },
  /* 39 */ { id:39,  type: "text", question: "Что минимизирует дисперсию при том же EV?", options: ["Олл-ин 100 bb", "Контроль банка «бет-чек-чек»", "Всегда олл-ин", "Всегда чек-колл"], correctAnswer: 1 },
  /* 40 */ { id:40,  type: "text", question: "Фишка удваивается каждый раунд. 2 → 128. Сколько раундов?", options: ["5", "6", "7", "8"], correctAnswer: 1 },

  /* 41 */ { id:41,  type: "text", question: "Какое слово ЛИШНЕЕ: ЛИСТ, СТИЛЬ, СИЛА, ТЕСТ?", options: ["ЛИСТ", "СТИЛЬ", "СИЛА", "ТЕСТ"], correctAnswer: 2 },
  /* 42 */ { id:42,  type: "text", question: "Какой угол между стрелками часов в 3:15?", options: ["7,5°", "15°", "30°", "37,5°"], correctAnswer: 0 },
  /* 43 */ { id:43,  type: "text", question: "Если 8 % числа равно 24, то 30 % этого числа равно…", options: ["75", "80", "90", "100"], correctAnswer: 2 },
  /* 44 */ { id:44,  type: "text", question: "Банк 40 bb, вы пушите coin-flip 50 %. EV вашего стека после пуша?", options: ["+20 bb", "0 bb", "−10 bb", "+40 bb"], correctAnswer: 1 },
  /* 45 */ { id:45,  type: "text", question: "ICM-спот: кто пушит шире — чип-лидер или короткий стек?", options: ["Чип-лидер", "Короткий стек", "Одинаково", "Зависит от анте"], correctAnswer: 1 },
  /* 46 */ { id:46,  type: "text", question: "Выберите продолжение ряда квадратов числа: 1, 4, 9, 16, ?", options: ["20", "24", "25", "27"], correctAnswer: 2 },
  /* 47 */ { id:47,  type: "text", question: "Оппонент ставит ½ банка. При 6 натсов и 36 слабых рук колл должен быть как минимум…", options: ["25 %", "40 %", "50 %", "60 %"], correctAnswer: 1 },
  /* 48 */ { id:48,  type: "text", question: "120 покеристов: 48 любят мтт и кеш игры, 72 — мтт, 15 — ни то ни другое. Сколько любят только кеш?", options: ["24", "27", "30", "33"], correctAnswer: 3 },
  /* 49 */ { id:49,  type: "text", question: "Сколько различных вариаций перестановок букв слова «POKER»?", options: ["60", "120", "240", "720"], correctAnswer: 1 },
  /* 50 */ { id:50,  type: "text", question: "Сколько квадратов всех размеров на шахматной доске 8 × 8?", options: ["64", "128", "204", "256"], correctAnswer: 2 }
];

/* расчёт IQ остаётся прежним */
export const calculateIQScore = (correctAnswers: number): { iqScore: number; category: string } => {
  const percentage = (correctAnswers / questions.length) * 100;

  let iqScore: number;
  let category: string;

  if (percentage >= 95) {
    iqScore  = 150 + Math.floor(Math.random() * 11); // 150-160
    category = "GTO/Exploit-БОГ играете «как солвер»";
  } else if (percentage >= 90) {
    iqScore  = 140 + Math.floor(Math.random() * 10); // 140-149
    category = "High-Roller";
  } else if (percentage >= 80) {
    iqScore  = 130 + Math.floor(Math.random() * 10);
    category = "Покерный Профи - устойчивый плюсовый рег";
  } else if (percentage >= 70) {
    iqScore  = 115 + Math.floor(Math.random() * 15);
    category = "Сильный Регуляр - mid-stakes";
  } else if (percentage >= 60) {
    iqScore  = 105 + Math.floor(Math.random() * 10);
    category = "Полу-Рег - плюсуете, но ещё учитесь";
  } else if (percentage >= 50) {
    iqScore  = 95 + Math.floor(Math.random() * 10);
    category = "Хобби-Игрок";
  } else if (percentage >= 40) {
    iqScore  = 85 + Math.floor(Math.random() * 10);
    category = "Новичок - базовые концепты усвоены";
  } else if (percentage >= 15) {
    iqScore  = 65 + Math.floor(Math.random() * 20);
    category = "Фиш - лёгкая мишень за столом";
  } else {
    iqScore  = 50 + Math.floor(Math.random() * 15);
    category = "Донатор - «погружаюсь в атмосферу»";
  }

  return { iqScore, category };
};

// questions.ts
import { Question } from "@/types/quiz";

/**
 * 50 покерно-IQ-и логических задач в случайном порядке.
 * type — все text, чтобы не подгружать изображения.
 * correctAnswer — индекс (0-3).
 */

export const questions: Question[] = [
  /* 1  */ { id: 1,  type: "text", question: "У кости три грани красные, три — белые. Какова вероятность, что выпадет красная грань?", options: ["1/3", "2/3", "1/2", "5/6"], correctAnswer: 2 },
  /* 3  */ { id: 2,  type: "text", question: "У оппонента три возможных блефа и один натс. Какова вероятность натса?", options: ["25 %", "33 %", "50 %", "75 %"], correctAnswer: 0 },
  /* 4  */ { id: 3,  type: "text", question: "Маше — 16 лет. Она в четыре раза старше брата. Сколько лет будет Маше, когда она станет вдвое старше брата?", options: ["20", "24", "28", "32"], correctAnswer: 1 },
  /* 6  */ { id: 4,  type: "text", question: "Какая комбинация старше?", options: ["Стрит", "Флеш", "Сет", "Две пары"], correctAnswer: 1 },
  /* 7  */ { id: 5,  type: "text", question: "Какое число логично продолжит ряд: 2 – 3 – 5 – 8 – ?", options: ["10", "11", "13", "15"], correctAnswer: 2 },
  /* 8  */ { id: 6,  type: "text", question: "Какое число лишнее: 14, 21, 28, 32, 35, 42?", options: ["21", "28", "32", "35"], correctAnswer: 2 },
  /* 11 */ { id: 7,  type: "text", question: "Вероятность двух случайных карт одной масти равна…", options: ["1 к 4", "1 к 4,9", "1 к 6", "1 к 12"], correctAnswer: 1 },
  /* 18 */ { id: 8,  type: "text", question: "5 игроков играют 5 раздач за 5 минут. Сколько раздач сыграет 100 игроков за 100 минут?", options: ["100", "500", "2000", "200"], correctAnswer: 2 },
  /* 25 */ { id: 9,  type: "text", question: "Рукопожатия: 6 игроков за столом жмут руки всем. Сколько рукопожатий?", options: ["12", "15", "18", "21"], correctAnswer: 1 },
  /* 26 */ { id:10,  type: "text", question: "Вероятность поймать один из 9 аутов на ривере ≈ …", options: ["12 %", "18 %", "24 %", "27 %"], correctAnswer: 1 },
  /* 28 */ { id:11,  type: "text", question: "Колода перемешана. Шанс, что верхняя карта — туз или король?", options: ["1/13", "2/13", "4/13", "1/4"], correctAnswer: 1 },
  /* 31 */ { id:12,  type: "text", question: "В турнире 256 игроков, половина выбывает каждый тур. Сколько туров до победы?", options: ["7", "8", "9", "10"], correctAnswer: 1 },
  /* 32 */ { id:13,  type: "text", question: "Три игрока играют 10000 раздач за 6 часов. Сколько часов потребуется двум игрокам?", options: ["4", "6", "9", "12"], correctAnswer: 2 },
  /* 33 */ { id:14,  type: "text", question: "Какова вероятность выбросить хотя бы одну шестёрку двумя кубиками?", options: ["~25-26%", "~30-31%", "~35-36%", "~39-40%"], correctAnswer: 1 },
  /* 44 */ { id:15,  type: "text", question: "[Теория покера] По мере того как размеры стэков увеличиваются (например, со 100 BB до 200 BB), вам следует играть _____ стратегию префлоп.", options: ["более свободную (широкую)", "более тайтовую (узкую)"], correctAnswer: 0 },
  /* 46 */ { id:16,  type: "text", question: "Выберите продолжение ряда квадратов числа: 1, 4, 9, 16, ?", options: ["20", "24", "25", "27"], correctAnswer: 2 },
  /* 47 */ { id:17,  type: "text", question: "100 выключателей сначала выключены. Игроки 1…100 по очереди меняют состояние кратных своих номеров. Сколько горит в конце?", options: ["10", "15", "20", "25"], correctAnswer: 0 },
  /* 48 */ { id:18,  type: "text", question: "120 покеристов: 48 любят мтт и кеш игры, 72 — мтт, 15 — ни то ни другое. Сколько любят только кеш?", options: ["24", "27", "30", "33"], correctAnswer: 3 },
  /* 49 */ { id:19,  type: "text", question: "Сколько различных вариаций перестановок букв слова «POKER»?", options: ["60", "120", "240", "720"], correctAnswer: 1 },
  /* 50 */ { id:20,  type: "text", question: "Сколько квадратов всех размеров на шахматной доске 8 × 8?", options: ["64", "128", "204", "256"], correctAnswer: 2 },
  /* 13 */ { id:21,  type: "text", question: "Какое число делится на 3: 7 364 / 7 372 / 7 381 / 7 392?", options: ["7 364", "7 372", "7 381", "7 392"], correctAnswer: 3 },
  /* 14 */ { id:22,  type: "text", question: "Какое число должно стоять вместо «?»: 3, 6, 12, 24, ?", options: ["36", "40", "48", "60"], correctAnswer: 2 },
  /* 6  */ { id:23,  type: "text", question: "Какая комбинация старше?", options: ["Стрит", "Флеш", "Сет", "Две пары"], correctAnswer: 1 },
  /* 2  */ { id:24,  type: "text", question: "Что значит «фолд»?", options: ["Поднять ставку", "Сбросить карты", "Посмотреть карты соперника", "Сделать чек"], correctAnswer: 1 },
  /* 43 */ { id:25,  type: "text", question: "Если 8 % числа равно 24, то 30 % этого числа равно…", options: ["75", "80", "90", "100"], correctAnswer: 2 },
  
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

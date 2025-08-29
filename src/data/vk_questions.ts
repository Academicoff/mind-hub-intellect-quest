// questions.ts
import { Question } from "@/types/quiz";

/**
 * 50 покерно-IQ-и логических задач в случайном порядке.
 * type — все text, чтобы не подгружать изображения.
 * correctAnswer — индекс (0-3).
 */

export const questions: Question[] = [
  /* 1  */ { id: 1,  type: "text", question: "У вас есть 1000 кнопок и только одна из них запускает нужную программу. После нажатия вы узнаете, сработала кнопка или нет. Какое минимальное количество попыток потребуется в худшем случае, чтобы гарантированно найти нужную?", options: ["999", "500", "10", "1000"], correctAnswer: 0 },
  /* 3  */ { id: 2,  type: "text", question: "Найдите число, которое отличается от других: 121, 144, 169, 196, 221, 256", options: ["144", "196", "221", "256"], correctAnswer: 2 },
  /* 4  */ { id: 3,  type: "text", question: "У вас есть таблица с 10 строками и 10 столбцами. Сколько ячеек в ней?", options: ["10", "20", "100", "1000"], correctAnswer: 2 },
  /* 6  */ { id: 4,  type: "text", question: "Функция вызывает саму себя, уменьшая аргумент на 1, пока аргумент не станет равен 0. Что это за тип функции?", options: ["Итерация", "Рекурсия", "Цикл", "Лямбда-функция"], correctAnswer: 1 },
  /* 7  */ { id: 5,  type: "text", question: "В массиве из 1000 чисел все числа повторяются дважды, кроме одного. Какой минимальный способ найти это число по времени и памяти?", options: ["Сортировка", "Множество (set)", "XOR всех чисел", "Поиск по индексам"], correctAnswer: 2 },
  /* 1  */ { id: 6,  type: "text", question: "У кости три грани красные, три — белые. Какова вероятность, что выпадет красная грань?", options: ["1/3", "2/3", "1/2", "5/6"], correctAnswer: 2 },
/* 4  */ { id: 7,  type: "text", question: "Маше — 16 лет. Она в четыре раза старше брата. Сколько лет будет Маше, когда она станет вдвое старше брата?", options: ["20", "24", "28", "32"], correctAnswer: 1 },
/* 7  */ { id: 8,  type: "text", question: "Какое число логично продолжит ряд: 2 – 3 – 5 – 8 – ?", options: ["10", "11", "13", "15"], correctAnswer: 2 },
/* 11 */ { id: 9,  type: "text", question: "Вероятность двух случайных карт одной масти равна…", options: ["1 к 4", "1 к 4,9", "1 к 6", "1 к 12"], correctAnswer: 1 },
/* 13 */ { id:10,  type: "text", question: "Какое число делится на 3: 7 364 / 7 372 / 7 381 / 7 392?", options: ["7 364", "7 372", "7 381", "7 392"], correctAnswer: 3 },
/* 25 */ { id: 11,  type: "text", question: "Рукопожатия: 6 игроков за столом жмут руки всем. Сколько рукопожатий?", options: ["12", "15", "18", "21"], correctAnswer: 1 },
/* 33 */ { id:12,  type: "text", question: "Какова вероятность выбросить хотя бы одну шестёрку двумя кубиками?", options: ["~25-26%", "~30-31%", "~35-36%", "~39-40%"], correctAnswer: 1 },
  /* 49 */ { id:13,  type: "text", question: "Сколько различных вариаций перестановок букв слова «POKER»?", options: ["60", "120", "240", "720"], correctAnswer: 1 },
  /* 50 */ { id:14,  type: "text", question: "Сколько квадратов всех размеров на шахматной доске 8 × 8?", options: ["64", "128", "204", "256"], correctAnswer: 2 },
  /* 43 */ { id:15,  type: "text", question: "Если 8 % числа равно 24, то 30 % этого числа равно…", options: ["75", "80", "90", "100"], correctAnswer: 2 },
  
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

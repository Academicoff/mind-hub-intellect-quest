import { Question } from '@/types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    type: 'text',
    question: 'Which number comes next in this sequence: 2, 4, 8, 16, ?',
    options: ['24', '32', '30', '28'],
    correctAnswer: 1
  },
  {
    id: 2,
    type: 'text-with-image',
    question: 'Looking at this pattern, what comes next in the logical sequence?',
    image: 'photo-1518770660439-4636190af475',
    options: ['Pattern A', 'Pattern B', 'Pattern C', 'Pattern D'],
    correctAnswer: 2
  },
  {
    id: 3,
    type: 'text',
    question: 'Complete the analogy: Book is to Reading as Fork is to ?',
    options: ['Kitchen', 'Eating', 'Metal', 'Cooking'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'image',
    question: 'Which of these images shows the most efficient workspace setup?',
    images: [
      'photo-1649972904349-6e44c42644a7',
      'photo-1488590528505-98d2b5aba04b',
      'photo-1498050108023-c5249f4df085',
      'photo-1483058712412-4245e9b90334'
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    type: 'text',
    question: 'Which word does NOT belong with the others?',
    options: ['Circle', 'Square', 'Triangle', 'Corner'],
    correctAnswer: 3
  },
  {
    id: 6,
    type: 'text-with-image',
    question: 'Based on this visual pattern, what is the next number in the sequence: 1, 1, 2, 3, 5, 8, ?',
    image: 'photo-1461749280684-dccba630e2f6',
    options: ['11', '13', '15', '16'],
    correctAnswer: 1
  },
  {
    id: 7,
    type: 'image',
    question: 'Which image best represents advanced problem-solving and logical thinking?',
    images: [
      'photo-1526374965328-7f61d4dc18c5',
      'photo-1487058792275-0ad4aaf24ca7',
      'photo-1581091226825-a6a2a5aee158',
      'photo-1605810230434-7631ac76ec81'
    ],
    correctAnswer: 0
  },
  {
    id: 8,
    type: 'text',
    question: 'Mary is 16 years old. She is 4 times older than her brother. How old will Mary be when she is twice as old as her brother?',
    options: ['20 years old', '24 years old', '28 years old', '32 years old'],
    correctAnswer: 1
  },
  {
    id: 9,
    type: 'text-with-image',
    question: 'Analyzing this computer interface, which number should replace the question mark: 3, 7, 11, 15, 19, ?',
    image: 'photo-1487058792275-0ad4aaf24ca7',
    options: ['21', '23', '25', '27'],
    correctAnswer: 1
  },
  {
    id: 10,
    type: 'image',
    question: 'Which workspace setup demonstrates the highest level of technological proficiency?',
    images: [
      'photo-1461749280684-dccba630e2f6',
      'photo-1526374965328-7f61d4dc18c5',
      'photo-1483058712412-4245e9b90334',
      'photo-1488590528505-98d2b5aba04b',
      'photo-1498050108023-c5249f4df085',
      'photo-1605810230434-7631ac76ec81'
    ],
    correctAnswer: 1
  }
];

export const calculateIQScore = (correctAnswers: number): { iqScore: number; category: string } => {
  const percentage = (correctAnswers / questions.length) * 100;
  
  let iqScore: number;
  let category: string;
  
  if (percentage >= 90) {
    iqScore = 140 + Math.floor(Math.random() * 20);
    category = "Genius";
  } else if (percentage >= 80) {
    iqScore = 130 + Math.floor(Math.random() * 10);
    category = "Very Superior";
  } else if (percentage >= 70) {
    iqScore = 115 + Math.floor(Math.random() * 15);
    category = "Above Average";
  } else if (percentage >= 50) {
    iqScore = 100 + Math.floor(Math.random() * 15);
    category = "Average";
  } else if (percentage >= 30) {
    iqScore = 85 + Math.floor(Math.random() * 15);
    category = "Below Average";
  } else {
    iqScore = 70 + Math.floor(Math.random() * 15);
    category = "Lower Range";
  }
  
  return { iqScore, category };
};
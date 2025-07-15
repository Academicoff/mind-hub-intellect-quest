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
    type: 'text',
    question: 'If all Roses are flowers and some flowers fade quickly, which statement is necessarily true?',
    options: [
      'All roses fade quickly',
      'Some roses are flowers', 
      'No roses fade quickly',
      'Some flowers are not roses'
    ],
    correctAnswer: 1
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
    type: 'text',
    question: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
    options: ['$0.10', '$0.05', '$0.15', '$0.20'],
    correctAnswer: 1
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
    type: 'text',
    question: 'What is the next number in this pattern: 1, 1, 2, 3, 5, 8, ?',
    options: ['11', '13', '15', '16'],
    correctAnswer: 1
  },
  {
    id: 7,
    type: 'text',
    question: 'If you rearrange the letters "CIFAIPC" you would have the name of a/an:',
    options: ['City', 'Ocean', 'Animal', 'Country'],
    correctAnswer: 1
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
    type: 'text',
    question: 'Which number should replace the question mark: 3, 7, 11, 15, 19, ?',
    options: ['21', '23', '25', '27'],
    correctAnswer: 1
  },
  {
    id: 10,
    type: 'text',
    question: 'In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?',
    options: ['MFEDJJOE', 'EOJDVFNP', 'NFEJDJOF', 'MEDICINE'],
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
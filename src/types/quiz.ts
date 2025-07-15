export interface TextQuestion {
  id: number;
  type: 'text';
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TextWithImageQuestion {
  id: number;
  type: 'text-with-image';
  question: string;
  image: string;
  options: string[];
  correctAnswer: number;
}

export interface ImageQuestion {
  id: number;
  type: 'image';
  question: string;
  images: string[];
  correctAnswer: number;
}

export type Question = TextQuestion | TextWithImageQuestion | ImageQuestion;

export interface QuizState {
  currentQuestion: number;
  answers: number[];
  score: number;
  isCompleted: boolean;
}

export interface UserResult {
  email: string;
  firstName?: string;
  score: number;
  iqScore: number;
  category: string;
}
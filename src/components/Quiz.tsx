import { useState } from 'react';
import { QuizStart } from './QuizStart';
import { QuizQuestion } from './QuizQuestion';
import { EmailCollection } from './EmailCollection';
import { questions, calculateIQScore } from '@/data/questions';
import { QuizState, UserResult } from '@/types/quiz';

export const Quiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    score: 0,
    isCompleted: false
  });
  
  const [hasStarted, setHasStarted] = useState(false);
  const [showEmailCollection, setShowEmailCollection] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();

  const { iqScore, category } = calculateIQScore(quizState.score);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === undefined) return;

    const currentQuestion = questions[quizState.currentQuestion];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const newAnswers = [...quizState.answers, selectedAnswer];
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        answers: newAnswers,
        score: newScore
      });
      setSelectedAnswer(undefined);
    } else {
      setQuizState({
        ...quizState,
        answers: newAnswers,
        score: newScore,
        isCompleted: true
      });
      setShowEmailCollection(true);
    }
  };

  const handleEmailSubmit = async (email: string, firstName?: string) => {
    const result: UserResult = {
      email,
      firstName,
      score: quizState.score,
      iqScore,
      category
    };

    console.log('Quiz Results:', result);

    // Здесь больше не нужно, т.к. отправим в EmailCollection
  };

  if (!hasStarted) {
    return <QuizStart onStart={handleStart} />;
  }

  if (showEmailCollection) {
    return (
      <EmailCollection
        onSubmit={handleEmailSubmit}
        iqScore={iqScore}
        category={category}
      />
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];

  return (
    <QuizQuestion
      question={currentQuestion}
      questionNumber={quizState.currentQuestion + 1}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
      onNext={handleNext}
      selectedAnswer={selectedAnswer}
    />
  );
};

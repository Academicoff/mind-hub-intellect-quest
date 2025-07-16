import { useState } from "react";
import { QuizStart } from "./QuizStart";
import { QuizQuestion } from "./QuizQuestion";
import { EmailCollection } from "./EmailCollection";
import { questions, calculateIQScore } from "@/data/questions";
import { QuizState, UserResult } from "@/types/quiz";

export const Quiz = () => {
  /* ------------ local state ------------ */
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    score: 0,
    isCompleted: false,
  });

  const [hasStarted, setHasStarted] = useState(false);
  const [showEmailCollection, setShowEmailCollection] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();

  /* ------------ sessionId (once) ------------ */
  const [sessionId] = useState<string>(() => crypto.randomUUID());

  /* ------------ IQ every render ------------ */
  const { iqScore, category } = calculateIQScore(quizState.score);

  /* =========================================
     1. START
  ========================================== */
  const handleStart = async () => {
    // создаём запись на сервере
    await fetch("/api/send-iq.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
    setHasStarted(true);
  };

  /* =========================================
     2. ОТВЕТ ПОЛЬЗОВАТЕЛЯ
  ========================================== */
  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  /* =========================================
     3. NEXT
  ========================================== */
  const handleNext = async () => {
    if (selectedAnswer === undefined) return;

    const current = questions[quizState.currentQuestion];
    const isCorrect = selectedAnswer === current.correctAnswer;

    const newAnswers = [...quizState.answers, selectedAnswer];
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    const nextIndex = quizState.currentQuestion + 1;

    // отправляем прогресс, если это НЕ последний вопрос
    if (nextIndex < questions.length) {
      await fetch("/api/send-iq.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          answersDone: newAnswers.length,
          scoreRaw: newScore,
        }),
      });
    }

    /* ------ обновляем local state ------ */
    if (nextIndex < questions.length) {
      setQuizState({
        ...quizState,
        currentQuestion: nextIndex,
        answers: newAnswers,
        score: newScore,
      });
      setSelectedAnswer(undefined);
    } else {
      // дошли до конца → показываем ввод e-mail
      setQuizState({
        ...quizState,
        answers: newAnswers,
        score: newScore,
        isCompleted: true,
      });
      setShowEmailCollection(true);
    }
  };

  /* =========================================
     4. FINISH  (e-mail + score)
  ========================================== */
  const handleEmailSubmit = async (email: string, firstName?: string) => {
    const result: UserResult = {
      email,
      firstName,
      score: quizState.score,
      iqScore,
      category,
    };

    // отправляем финальный пакет (finished = 1)
    await fetch("/api/send-iq.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        answersDone: questions.length,
        scoreRaw: quizState.score,
        finished: 1,
        email,
        firstName,
        iqScore,
        category,
      }),
    });

    console.log("Quiz Results:", result);
    // здесь можно показать «спасибо» или перейти на страницу результатов
  };

  /* =========================================
     5. RENDER
  ========================================== */
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

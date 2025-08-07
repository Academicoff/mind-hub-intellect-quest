/* -------------------------------------------------
   src/pages/SelectQuizPage.tsx
   (обновлено: путь /select/play)
------------------------------------------------- */
import { selectQuestions as Q } from '@/data/selectQuestions';
import useSelectQuiz from '@/hooks/useSelectQuiz';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

export default function SelectQuizPage() {
  const navigate = useNavigate();
  const { index, pick, result, error } = useSelectQuiz();

  /* ----- финал ----- */
  if (result) {
    navigate('/select/result', { state: result, replace: true });
    return null;
  }

  /* ----- ошибка ----- */
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <p className="text-red-500 text-lg text-center max-w-md">{error}</p>
      </div>
    );
  }

  /* ----- ожидание finish ----- */
  if (index >= Q.length) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Завершаем расчёт результата…</p>
      </div>
    );
  }

  /* ----- вопрос ----- */
  const q = Q[index];
  const progress = (index / Q.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <Progress value={progress} className="h-2" />
        <h1 className="text-xl sm:text-2xl text-center">{q.text}</h1>

        {q.answers.map((a, i) => (
          <Button
            key={i}
            onClick={() => pick(a.to)}
            className="block w-full py-4 rounded-xl"
          >
            {a.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

import { useLocation, Link } from 'react-router-dom';
import SelectBarChart from '@/components/SelectBarChart';

export default function SelectResultPage() {
  const { state } = useLocation() as any;       // получаем из navigate()

  if (!state) return <p className="text-center p-10">Нет данных результата</p>;

  const { best, scores } = state as {
    best: 'spin' | 'cash' | 'mtt';
    scores: { spin: number; cash: number; mtt: number };
  };

  const leadTexts: Record<string, string> = {
    spin:
      'Тебе подойдёт дисциплина Spin & Go — короткие пуш-фолд сессии и мгновенный экшен.',
    cash:
      'Классический кэш-покер — твоя стихия: техничность, гибкий график и стабильный EV.',
    mtt:
      'Ты настоящий турнирный боец! Длинные марафоны ради крупных призовых — именно твоё.',
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">
        Идеальный формат — {best.toUpperCase()}
      </h1>

      <SelectBarChart scores={scores} />

      <p className="mt-8 text-lg">{leadTexts[best]}</p>

      <Link to="/" className="mt-6 inline-block underline">
        На главную
      </Link>
    </div>
  );
}

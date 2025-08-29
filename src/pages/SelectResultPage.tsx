import { useLocation, Link } from 'react-router-dom';
import SelectBarChart from '@/components/SelectBarChart';
import { Button } from '@/components/ui/button';

const BOT_USERNAME = 'pokerhub_robot'; // проверьте имя боевого бота

export default function SelectResultPage() {
  const { state } = useLocation() as any;   // получаем из navigate()
  if (!state) return <p className="text-center p-10">Нет данных результата</p>;

  const { best, scores, encrypted } = state as {
    best: 'spin' | 'cash' | 'mtt';
    scores: { spin: number; cash: number; mtt: number };
    encrypted?: string; // btoa(String(id))
  };

  // старый формат диплинка: ?start=sel_quiz=<base64>
  const param = `sel_quiz=${encrypted ?? ''}`;
  const telegramLink = `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(param)}`;

  const leadTexts: Record<string, string> = {
    spin: 'Тебе подойдёт дисциплина Spin & Go — короткие пуш-фолд сессии и мгновенный экшен.',
    cash: 'Классический кэш-покер — твоя стихия: техничность, гибкий график и стабильный EV.',
    mtt:  'Ты настоящий турнирный боец! Длинные марафоны ради крупных призовых — именно твоё.',
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
      <h1 className="text-3xl font-bold">
        Идеальный формат — {best.toUpperCase()}
      </h1>

      <SelectBarChart scores={scores} />

      <p className="text-lg">{leadTexts[best]}</p>

      <div className="space-y-2">
        <Button asChild size="lg" className="px-10 py-4">
          <a href={telegramLink} target="_blank" rel="noopener noreferrer">
            Получить итоги в Telegram
          </a>
        </Button>
        <div className="text-xs text-muted-foreground">
          Если бот не отвечает, нажмите <b>Start</b> при открытии бота.
        </div>
      </div>

      <Link to="/" className="mt-4 inline-block underline">
        На главную
      </Link>
    </div>
  );
}

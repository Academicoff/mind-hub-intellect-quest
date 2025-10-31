import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BOT_USERNAME = 'pokerhub_robot'; // проверьте имя боевого бота

export default function SpinResultPage() {
  const { state } = useLocation() as any;   // получаем из navigate()
  if (!state) return <p className="text-center p-10">Нет данных результата</p>;

  const { encrypted } = state as {
    encrypted?: string; // btoa(String(id))
  };

  // старый формат диплинка: ?start=sel_quiz=<base64>
  const param = `sel_quiz=${encrypted ?? ''}`;
  const telegramLink = `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(param)}`;

  return (
    <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
      <h1 className="text-3xl font-bold">
        Результаты теста
      </h1>

      <p className="text-lg">Спасибо за прохождение теста! Ваши результаты готовы.</p>

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
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function SelectResultPage() {
  const { state } = useLocation() as any;

  // Отладка
  console.log('State:', state);
  console.log('Encrypted:', state?.encrypted);

  if (!state || !state.encrypted) {
    return <p className="text-center p-10">Нет данных результата</p>;
  }

  const { encrypted } = state;
  const telegramLink = `https://t.me/pokerhub_robot?start=sel_quiz=${encodeURIComponent(encrypted)}`;

  console.log('Telegram Link:', telegramLink); // Отладка

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Результат готов!
        </h1>
        <p className="text-lg text-muted-foreground">
          Узнай свой идеальный формат покера в нашем Telegram-боте.
        </p>
        <Button
          asChild
          size="lg"
          className="px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold pointer-events-auto"
        >
          <a href={telegramLink} target="_blank" rel="noopener noreferrer">
            Перейти в Telegram
          </a>
        </Button>
      </div>
    </div>
  );
}
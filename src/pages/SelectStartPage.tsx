/* -------------------------------------------------
   src/pages/SelectStartPage.tsx
   Лендинг нового Spin / Cash / MTT-квиза
------------------------------------------------- */
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Layers3, Timer, Users, Trophy } from 'lucide-react';

export default function SelectStartPage() {
  const navigate = useNavigate();

  const onStart = () => navigate('/select/play');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-10">
        {/* ——— логотип и слоган ——— */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <Layers3 className="w-20 h-20 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
            Какой формат покера <br className="hidden md:block" />
            идеален для тебя?
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Ответь на&nbsp;16&nbsp;коротких вопросов и&nbsp;узнай, что подойдёт именно тебе —
            Spin&nbsp;&amp;&nbsp;Go, кеш-игры или турниры MTT.
          </p>
        </div>

        {/* ——— три карточки преимуществ ——— */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="iq-card text-center">
            <Timer className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">5 минут</h3>
            <p className="text-sm text-muted-foreground">16 вопросов — и всё понятно</p>
          </div>
          <div className="iq-card text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">3 формата</h3>
            <p className="text-sm text-muted-foreground">Spin / Cash / MTT</p>
          </div>
          <div className="iq-card text-center">
            <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Персональная рекомендация</h3>
            <p className="text-sm text-muted-foreground">Сразу после теста</p>
          </div>
        </div>

        {/* ——— кнопка старта ——— */}
        <div className="space-y-4">
          <Button
            onClick={onStart}
            size="lg"
            className="px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold"
          >
            Начать квиз
          </Button>
          <p className="text-sm text-muted-foreground">
            Бесплатно • Без регистрации • Результат мгновенно
          </p>
        </div>
      </div>
    </div>
  );
}

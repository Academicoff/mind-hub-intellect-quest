import { Button } from '@/components/ui/button';
import { Brain, Clock, Users, Award } from 'lucide-react';

interface QuizStartProps {
  onStart: () => void;
}

export const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Brain className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            PokerHUB тест на IQ
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Проверьте свой интеллект с помощью нашего научно разработанного теста. 
            Получите оценку IQ и подробный анализ в телеграм.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="iq-card text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">10 Минут</h3>
            <p className="text-sm text-muted-foreground">Полная оценка</p>
          </div>
          <div className="iq-card text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">25 вопросов</h3>
            <p className="text-sm text-muted-foreground">Тщательно продуманный тест</p>
          </div>
          <div className="iq-card text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Точные результаты</h3>
            <p className="text-sm text-muted-foreground">Моментальная отправка в telegram</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={onStart}
            size="lg"
            className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Начать тест IQ
          </Button>
          <p className="text-sm text-muted-foreground">
            Бесплатно • Не требует регистрации • Моментальный результат в телеграм
          </p>
        </div>
      </div>
    </div>
  );
};
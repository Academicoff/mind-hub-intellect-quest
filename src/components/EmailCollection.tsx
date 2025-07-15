import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailCollectionProps {
  onSubmit: (email: string, firstName?: string) => void;
  iqScore: number;
  category: string;
}

export const EmailCollection = ({ onSubmit, iqScore, category }: EmailCollectionProps) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/send-iq.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          iqScore,
          category
        })
      });

      onSubmit(email, firstName);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending IQ results:", error);
      toast({
        title: "Error",
        description: "Failed to send your results. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-3xl font-bold text-foreground">
              Результат отправлен!
            </h1>
            <p className="text-lg text-muted-foreground">
              Твой результат IQ теста был отправлен на почту <span className="text-primary font-semibold">{email}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Пожалуйста проверь входящие сообщения (и спам папку) для получения результатов тестирования.
            </p>
          </div>
          
          <div className="iq-card">
            <h3 className="font-semibold mb-3">Что дальше?</h3>
            <div className="text-left space-y-2 text-sm text-muted-foreground">
              <p>• Оставайся подписанным на телеграм, чтобы быть в курсе обновлений</p>
              <p>• В ближайшее время мы запустим Покерный канал и платформу</p>
              <p>• Участвуй в наших активностях и используй наши инструменты</p>
              <p>• Достигай успехов и становись покер-про</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center space-y-4">
          <Mail className="w-12 h-12 text-primary mx-auto" />
          <h1 className="text-3xl font-bold text-foreground">
            Почти готово!
          </h1>
          <p className="text-lg text-muted-foreground">
            Введите свой адрес электронной почты, чтобы получить результаты теста IQ
          </p>
        </div>

        <div className="iq-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Адрес электронной почты *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                Имя или Никнейм (необязательно)
              </Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Введите ваше имя"
                className="bg-secondary border-border"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 py-3"
            >
              {isSubmitting ? 'Отправка результатов...' : 'Получить результаты моего IQ теста'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>✓ Ваши результаты будут отправленны мгновенно</p>
              <p>✓ Никакого спама, только результаты IQ-теста</p>
              <p>✓ Ваши данные защищены и никогда не будут переданы третьим лицам</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

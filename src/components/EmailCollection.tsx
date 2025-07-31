import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CryptoJS from 'crypto-js';

interface EmailCollectionProps {
  onSubmit: (email: string, firstName?: string) => Promise<string>; // Предполагаем, что onSubmit возвращает resultId
  iqScore: number;
  category: string;
}

// Конфигурация Telegram и шифрования
const TELEGRAM_BOT_URL = 'https://t.me/pokerhub_robot';
const ENCRYPTION_KEY = 'jkb342j3b98u32hrh98ewhfroi3u98r0'; // 32 байта для AES-256
const ENCRYPTION_IV = 'sdkjg09843j092jf'; // 16 байт

export const EmailCollection = ({ onSubmit, iqScore, category }: EmailCollectionProps) => {
  const [telegramLink, setTelegramLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const encryptData = (data: string): string => {
    const encrypted = CryptoJS.AES.encrypt(
      data,
      CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(ENCRYPTION_IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex); // Возвращает hex-строку (0-9, a-f)
  };

useEffect(() => {
    const generateLink = async () => {
      setIsLoading(true);
      try {
        // Вызываем onSubmit для отправки данных и получения id
        const id = await onSubmit('no-email@pokerhub.app', ''); // Фиктивные данные
        console.log('Record ID from onSubmit:', id); // Логирование id

        // Шифруем данные
        const dataToEncrypt = JSON.stringify(id);
        const encryptedData = encryptData(dataToEncrypt);
        const link = `${TELEGRAM_BOT_URL}?start=iq=${encryptedData}`;
        setTelegramLink(link);
      } catch (error: any) {
        console.error('Error generating Telegram link:', error);
        toast({
          title: 'Ошибка',
          description: error.message || 'Не удалось сгенерировать ссылку. Попробуйте снова.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateLink();
  }, [onSubmit, iqScore, category]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="space-y-4">
          <CheckCircle className="w-16 h-16 text-primary mx-auto" />
          <h1 className="text-3xl font-bold text-foreground">
            Готово!
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Перейдите в Telegram, чтобы получить результаты теста
          </p>
          <a href={telegramLink} target="_blank" rel="noopener noreferrer">
            <Button
              className="w-full bg-primary hover:bg-primary/90 py-3"
              disabled={isLoading || !telegramLink}
            >
              {isLoading ? 'Генерация ссылки...' : 'Перейти в Telegram'}
            </Button>
          </a>
        </div>

        <div className="iq-card">
          <h3 className="font-semibold mb-3">Что дальше?</h3>
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>✓ Ваши результаты будут отправлены мгновенно</p>
              <p>✓ Никакого спама, только результаты IQ-теста</p>
              <p>✓ Ваши данные защищены и никогда не будут переданы третьим лицам</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
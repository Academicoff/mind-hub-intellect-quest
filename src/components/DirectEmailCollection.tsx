import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CryptoJS from 'crypto-js';

interface EmailCollectionProps {
  onSubmit: (email: string, firstName?: string) => Promise<string>;
  iqScore: number;
  category: string;
}

const TELEGRAM_BOT_URL = 'https://t.me/MindRoyal_bot';
const ENCRYPTION_KEY = 'jkb342j3b98u32hrh98ewhfroi3u98r0';
const ENCRYPTION_IV = 'sdkjg09843j092jf';

export const EmailCollection = ({ onSubmit, iqScore, category }: EmailCollectionProps) => {
  const [telegramLink, setTelegramLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
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
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  };

  useEffect(() => {
    const generateLink = async () => {
      setIsLoading(true);
      try {
        const id = await onSubmit('no-email@pokerhub.app', '');
        console.log('Record ID from onSubmit:', id);
        const dataToEncrypt = JSON.stringify(id);
        const encryptedData = encryptData(dataToEncrypt);
        const link = `${TELEGRAM_BOT_URL}?start=iq_${encryptedData}`;
        console.log('Generated Telegram link:', link); // Логируем ссылку для отладки
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

  const handleLinkClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      toast({
        title: 'Переход в Telegram',
        description: 'Результаты отправлены в Telegram. Пожалуйста, проверьте бота.',
        duration: 5000,
      });
    }
    // Не используем event.preventDefault(), чтобы не блокировать переход
  };

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
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className={`w-full inline-block py-3 px-4 rounded-md text-white font-semibold text-center transition-all duration-200
              ${isLoading || !telegramLink
                ? 'bg-gray-400 cursor-not-allowed'
                : isClicked
                ? 'bg-gray-400 cursor-not-allowed pointer-events-none'
                : 'bg-primary hover:bg-primary/90 cursor-pointer'}
            `}
          >
            {isLoading ? 'Генерация ссылки...' : isClicked ? 'Открыто в Telegram' : 'Перейти в Telegram'}
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
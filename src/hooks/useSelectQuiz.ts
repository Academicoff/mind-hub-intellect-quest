import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Discipline, selectQuestions as Q } from '@/data/selectQuestions';
import { sendStart, sendProgress, sendFinish } from '@/api/sendSelect';
import CryptoJS from 'crypto-js';

export interface Scores { spin: number; cash: number; mtt: number }

// Ключи шифрования (лучше хранить в .env и загружать через vite, например)
const ENCRYPTION_KEY = 'jkb342j3b98u32hrh98ewhfroi3u98r0'; // 32 байта для AES-256
const ENCRYPTION_IV = 'sdkjg09843j092jf'; // 16 байт

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
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex); // Возвращает hex-строку
};

export default function useSelectQuiz() {
  const [sessionId] = useState(() => uuid());
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({ spin: 0, cash: 0, mtt: 0 });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  /* --- 1. START --- */
useEffect(() => {
    // Читаем GET-параметр id из URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id') || null; // null, если не передан

    // Отправляем с userId
    sendStart(sessionId, userId).catch(() =>
      setError('Не удалось создать сессию. Попробуйте позже.')
    );
  }, [sessionId]);

  /* --- 2. PICK --- */
  const pick = async (to: Discipline | Discipline[]) => {
    if (error) return;

    const next = index + 1;
    const upd = { ...scores };
    (Array.isArray(to) ? to : [to]).forEach(d => (upd[d] += 1));

    setScores(upd);

    if (next < Q.length) {
      setIndex(next);
      await sendProgress({
        sessionId,
        answersDone: next,
        spin: upd.spin,
        cash: upd.cash,
        mtt: upd.mtt,
      }).catch(() => setError('Сбой соединения (progress).'));
    }

    if (next === Q.length) finish(upd);
  };

  /* --- 3. FINISH --- */
  const finish = async (s: Scores) => {
    try {
      const { data } = await sendFinish({
        sessionId,
        answersDone: Q.length,
        ...s,
        finished: 1,
      });
      console.log('sendFinish Response:', data); // Отладка
      const encrypted = encryptData(String(data.id));
      console.log('Encrypted ID:', encrypted); // Отладка
      setResult({ ...data, encrypted });
    } catch (e: any) {
      setError('Ошибка сохранения результата.');
      console.error(e?.response?.data || e);
    }
  };

  return { index, scores, result, error, pick };
}
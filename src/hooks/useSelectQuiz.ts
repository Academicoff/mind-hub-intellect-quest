import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Discipline, selectQuestions as Q } from '@/data/selectQuestions';
import { sendStart, sendProgress, sendFinish } from '@/api/sendSelect';

export interface Scores { spin: number; cash: number; mtt: number }

export default function useSelectQuiz() {
  const [sessionId] = useState(() => uuid());
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({ spin: 0, cash: 0, mtt: 0 });
  const [result, setResult] = useState<any>(null);
  const [error, setError]   = useState<string | null>(null);

  /* --- 1. START --- */
  useEffect(() => {
    sendStart(sessionId).catch(() =>
      setError('Не удалось создать сессию. Попробуйте позже.'));
  }, [sessionId]);

  /* --- 2. PICK --- */
    const pick = async (to: Discipline | Discipline[]) => {
    if (error) return;

    const next = index + 1;
    const upd  = { ...scores };
    (Array.isArray(to) ? to : [to]).forEach(d => (upd[d] += 1));

    /* ——— сохраняем счётчики локально ——— */
    setScores(upd);

    /* ——— шлём progress, если ЕЩЁ есть вопросы ——— */
    if (next < Q.length) {
        setIndex(next);                           // <-- двигаем индекс
        await sendProgress({                      //     и шлём прогресс
        sessionId,
        answersDone: next,
        spin: upd.spin,
        cash: upd.cash,
        mtt: upd.mtt,
        }).catch(() => setError('Сбой соединения (progress).'));
    }

    /* ——— финалим, если это был последний ответ ——— */
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
      setResult(data);    // {stage:'finished', …}
    } catch (e: any) {
      setError('Ошибка сохранения результата.');
      console.error(e?.response?.data || e);
    }
  };

  return { index, scores, result, error, pick };
}

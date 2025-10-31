/* -------------------------------------------------
   src/pages/SpinQuizPage.tsx
   Пошаговый квиз: новая сессия, один ответ → сервер, авто-финиш
------------------------------------------------- */
import React, { useEffect, useMemo, useState } from 'react';
import { spinQuestions as Q } from '@/data/spin_questions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/send-spin.php';

export default function SpinQuizPage() {
  const navigate = useNavigate();

  // всегда новая сессия
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [finishing, setFinishing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Telegram WebApp user id (если открыт из Telegram)
  const userId = useMemo<number | null>(() => {
    try {
      const tg = (window as any)?.Telegram?.WebApp;
      return tg?.initDataUnsafe?.user?.id ?? null;
    } catch {
      return null;
    }
  }, []);

  // генерируем новый sid при каждом открытии
  useEffect(() => {
    const anyCrypto = (window as any)?.crypto;
    const sid =
      anyCrypto?.randomUUID?.() ??
      `sid_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    setSessionId(sid);
  }, []);

  // START
  useEffect(() => {
    if (!sessionId) return;
    let aborted = false;

    (async () => {
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, userId })
        });
        if (aborted) return;
      } catch {
        if (aborted) return;
        setError('Не удалось инициализировать сессию. Обновите страницу.');
      }
    })();

    return () => { aborted = true; };
  }, [sessionId, userId]);

  // id вопроса для API
  const getQNo = (i: number): number => {
    const q: any = Q[i] ?? {};
    if (typeof q.id === 'number') return q.id;
    if (typeof q.qNo === 'number') return q.qNo;
    if (q.key === '21.1') return 211;
    return i + 1;
  };

  // отправка одного ответа
  const submitAnswer = async (qIndex: number, optionIndex: number) => {
    if (!sessionId || submitting || qIndex >= Q.length) return;

    setSubmitting(true);
    setError(null);

    const qNo = getQNo(qIndex);
    const letter = String.fromCharCode(65 + optionIndex) as 'A'|'B'|'C'|'D'|'E';

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, q: qNo, a: letter })
      });
      if (!res.ok) {
        if (res.status === 409) {
          setError('Сессия уже завершена. Обновите страницу.');
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data?.stage === 'progress' && Number.isFinite(data.done)) {
        setIndex(Math.min(Number(data.done), Q.length));
      } else {
        setIndex((prev) => Math.min(prev + 1, Q.length));
      }
    } catch {
      setError('Ошибка отправки ответа. Проверьте сеть и попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  // FINISH
  useEffect(() => {
    if (!sessionId) return;
    if (index < Q.length) return;
    if (finishing) return;

    let aborted = false;
    setFinishing(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, finished: 1 })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (aborted) return;

        const best = data?.best ?? null;
        const scores = data?.scores ?? null;
        const id = data?.id ?? null;

        // компактный payload для диплинка на следующем экране
        const encrypted = btoa(String(id ?? ''));

        navigate('/spin/result', {
          state: { encrypted },
          replace: true
        });
      } catch {
        if (aborted) return;
        setError('Не удалось завершить квиз. Попробуйте ещё раз.');
        setFinishing(false);
      }
    })();

    return () => { aborted = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, sessionId]);

  /* ----- UI состояния ----- */
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <p className="text-red-500 text-lg text-center max-w-md">{error}</p>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <p className="text-lg">Инициализация…</p>
      </div>
    );
  }

  if (index >= Q.length) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <p className="text-lg">Завершаем расчёт результата…</p>
      </div>
    );
  }

  /* ----- вопрос ----- */
  const q = Q[index];
  const total = Q.length;
  const progress = (index / total) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 sm:space-y-8">
        <Progress value={progress} className="h-2" />

        <h1 className="text-lg sm:text-xl md:text-2xl text-center leading-snug text-balance">
          {q.text}
        </h1>

        <div className="space-y-3">
          {q.answers.map((a: { label: string }, i: number) => (
            <Button
              key={i}
              onClick={() => submitAnswer(index, i)}
              disabled={submitting}
              className="
                block w-full
                px-3 py-4 md:py-5
                rounded-xl
                h-auto min-h-[52px] md:min-h-[60px]
                text-left justify-start items-start
                whitespace-normal break-words
                leading-snug text-sm sm:text-base md:text-lg
              "
              variant="outline"
            >
              <span className="block text-pretty">{a.label}</span>
            </Button>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Вопрос {index + 1} из {total}
        </div>
      </div>
    </div>
  );
}
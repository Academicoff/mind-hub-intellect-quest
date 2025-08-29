import { useEffect, useMemo, useRef, useState } from 'react';
import { selectQuestions as Q } from '@/data/selectQuestions';

/**
 * useSelectQuiz — обновлённый хук под новую серверную логику Select-квиза.
 *
 * Поток:
 *  1) При маунте гарантируем sessionId (localStorage) и шлём START { sessionId, userId }.
 *  2) На каждый ответ вызываем pick(optionIndex) — отправляем ANSWER { sessionId, q, a }.
 *     - q = текущий вопрос (Q[index].id)
 *     - a = 'A' | 'B' | 'C' | 'D' | 'E' (по индексу 0..4)
 *     - сервер возвращает { stage:'progress', done, left }; index = done.
 *  3) Когда index === Q.length — автоматически FINISH { sessionId, finished:1 }.
 *     - получаем { stage:'finished', id, best, scores }, прокидываем в result.
 *
 * Возвращаемые поля:
 *  - index: номер текущего вопроса (0..Q.length)
 *  - pick(optionIndex): отправить выбранный вариант (0 - A, 1 - B, 2 - C, 3 - D, 4 - E)
 *  - result: null или { id, best: 'spin'|'cash'|'mtt', scores, encrypted }
 *  - error: текст ошибки или null
 */

type Best = 'spin' | 'cash' | 'mtt';

type ResultPayload = {
  id: number;
  best: Best;
  scores: { spin: number; cash: number; mtt: number };
  encrypted: string;
};

const API_URL = '/api/send-select.php';

// Безопасно получаем/создаём sessionId и фиксируем в localStorage.
function ensureSessionId(): string {
  const key = 'select_session_id';
  let sid = localStorage.getItem(key);
  if (!sid) {
    // ts-expect-error
    const anyCrypto = (window as any)?.crypto;
    sid =
      anyCrypto?.randomUUID?.() ??
      `sid_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(key, sid);
  }
  return sid;
}

// 0 -> 'A', 1 -> 'B', 2 -> 'C', 3 -> 'D', 4 -> 'E'
function letterByIndex(i: number): 'A' | 'B' | 'C' | 'D' | 'E' {
  const code = 65 + (Number.isFinite(i) ? i : 0);
  const ch = String.fromCharCode(code);
  if (ch === 'A' || ch === 'B' || ch === 'C' || ch === 'D' || ch === 'E') return ch;
  return 'A';
}

export default function useSelectQuiz() {
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<ResultPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);
  const pickingRef = useRef(false);

  // Telegram WebApp user id (если квиз открыт из Telegram)
  const userId = useMemo<number | null>(() => {
    try {
      // ts-expect-error
      const tg = window?.Telegram?.WebApp;
      // ts-expect-error
      return tg?.initDataUnsafe?.user?.id ?? null;
    } catch {
      return null;
    }
  }, []);

  // Инициализация sessionId + START
  useEffect(() => {
    const sid = ensureSessionId();
    setSessionId(sid);

    let aborted = false;
    (async () => {
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sid, userId })
        });
        if (aborted) return;
      } catch {
        if (!aborted) {
          setError('Не удалось инициализировать сессию. Обновите страницу и попробуйте ещё раз.');
        }
      }
    })();

    return () => { aborted = true; };
  }, [userId]);

  // Авто-FINISH, когда дошли до конца
  useEffect(() => {
    if (!sessionId) return;
    if (index < Q.length) return;
    if (result || finishing) return;

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

        const best = (data?.best ?? '') as Best;
        const scores = (data?.scores ?? { spin: 0, cash: 0, mtt: 0 }) as {
          spin: number; cash: number; mtt: number;
        };
        const id = Number.isFinite(data?.id) ? Number(data.id) : 0;

        const encrypted = btoa(JSON.stringify({ id, best, t: Date.now() }));

        setResult({ id, best, scores, encrypted });
      } catch {
        if (!aborted) {
          setError('Не удалось завершить квиз. Проверьте соединение и попробуйте ещё раз.');
          setFinishing(false);
        }
      }
    })();

    return () => { aborted = true; };
  }, [index, sessionId, result, finishing]);

  // Отправка ответа на текущий вопрос
  const pick = async (optionIndex: number) => {
    if (pickingRef.current) return;
    if (!sessionId) return;
    if (index >= Q.length) return;

    const q = Q[index];
    if (!q) return;

    pickingRef.current = true;
    setError(null);

    try {
      const a = letterByIndex(optionIndex);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, q: q.id, a })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      // Ожидаем {stage:'progress', done, left}
      const done = Number(data?.done);
      if (data?.stage === 'progress' && Number.isFinite(done)) {
        setIndex(Math.min(done, Q.length));
      } else {
        // Фолбэк, если сервер не прислал done (не должен случаться)
        setIndex((prev) => Math.min(prev + 1, Q.length));
      }
    } catch {
      setError('Ошибка отправки ответа. Проверьте сеть и попробуйте ещё раз.');
    } finally {
      pickingRef.current = false;
    }
  };

  return { index, pick, result, error };
}

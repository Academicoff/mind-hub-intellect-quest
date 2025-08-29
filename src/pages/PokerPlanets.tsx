import { useEffect, useMemo, useState } from "react";

type SubmitPayload = {
  email: string;
  poker_login: string;
  telegram_id?: number;
  telegram_username?: string;
  initData?: string;
};

export default function PokerPlanets() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [tgId, setTgId] = useState<number | undefined>();
  const [tgUser, setTgUser] = useState<string | undefined>();
  const [initData, setInitData] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загружаем Telegram WebApp JS, если его нет (работает и в обычном браузере)
  useEffect(() => {
    if (window.Telegram?.WebApp) return;
    const s = document.createElement("script");
    s.src = "https://telegram.org/js/telegram-web-app.js";
    s.async = true;
    s.onload = () => {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready?.();
        tg.expand?.();
        setInitData(tg.initData ?? "");
        const user = tg.initDataUnsafe?.user;
        if (user?.id) setTgId(user.id);
        if (user?.username) setTgUser(user.username);
      }
    };
    document.head.appendChild(s);
    return () => { document.head.removeChild(s); };
  }, []);

  // Если WebApp уже в окружении (открыто внутри Telegram)
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready?.();
      tg.expand?.();
      setInitData(tg.initData ?? "");
      const user = tg.initDataUnsafe?.user;
      if (user?.id) setTgId(user.id);
      if (user?.username) setTgUser(user.username);
    }
  }, []);

  const inTelegram = useMemo(() => Boolean(tgId || tgUser || initData), [tgId, tgUser, initData]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Введите корректный email");
      return;
    }
    if (!login.trim()) {
      setError("Укажите рум-логин");
      return;
    }

    setSubmitting(true);
    const payload: SubmitPayload = {
      email,
      poker_login: login.trim(),
      telegram_id: tgId,
      telegram_username: tgUser,
      initData,
    };

    try {
      const res = await fetch("/api/pokerplanets-submit.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Non-JSON ${res.status}: ${text.slice(0, 200)}`);
      }

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setDone(true);
    } catch (err: any) {
      setError(err.message || "Ошибка отправки");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold">Заявка отправлена! Мы с вами свяжемся</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">PokerPlanets — заявка</h1>
          {/* Был текст про WebApp — заменяем на требуемый */}
          <p className="text-sm text-muted-foreground">Оставьте данные, чтобы мы могли вас наградить</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="
                w-full rounded border px-3 py-2
                bg-white text-neutral-900 placeholder:text-neutral-400 caret-indigo-600
                dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              "
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Рум-логин *</label>
            <input
              type="text"
              value={login}
              required
              onChange={(e) => setLogin(e.target.value)}
              placeholder="your_room_login"
              maxLength={100}
              className="
                w-full rounded border px-3 py-2
                bg-white text-neutral-900 placeholder:text-neutral-400 caret-indigo-600
                dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              "
            />
          </div>

          {/* Поля только для информации (readOnly), но тоже видимые */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Telegram ID</label>
              <input
                value={tgId ?? ""}
                readOnly
                placeholder={inTelegram ? "" : "—"}
                className="
                  w-full rounded border px-3 py-2
                  bg-white text-neutral-900 placeholder:text-neutral-400
                  dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400
                "
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Telegram @username</label>
              <input
                value={tgUser ?? ""}
                readOnly
                placeholder={inTelegram ? "" : "—"}
                className="
                  w-full rounded border px-3 py-2
                  bg-white text-neutral-900 placeholder:text-neutral-400
                  dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400
                "
              />
            </div>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-500 disabled:opacity-60"
          >
            {submitting ? "Отправка…" : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
}

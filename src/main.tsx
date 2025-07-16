// src/main.tsx
import React from 'react';                            //  нужен для JSX
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/* === Yandex Metrika (react-yandex-metrika) === */
import { YMInitializer } from 'react-yandex-metrika';

createRoot(document.getElementById('root')!).render(
  <>
    {/* ваше приложение */}
    <App />

    {/* счётчик Метрики 2.0 */}
    <YMInitializer
      accounts={[103358482]}                    // ← замените на свой ID при необходимости
      options={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true                         // SPA-переходы считаются автоматически
      }}
      version="2"                               // обязательно «2» — код 2.0
    />
  </>
);

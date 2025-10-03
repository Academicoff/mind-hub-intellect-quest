import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './pages/Index';
import DirectIndex from './pages/DirectIndex';
import VkIndex from './pages/VkIndex';
import NotFound from './pages/NotFound';
import LeaderboardPage from './pages/LeaderboardPage';
import PokerPlanets from "./pages/PokerPlanets";
import PokerDom from "./pages/PokerDom";

import SelectStartPage from './pages/SelectStartPage';
import SelectQuizPage from './pages/SelectQuizPage';
import SelectResultPage from './pages/SelectResultPage';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* === Главная и IQ-квиз === */}
          <Route path="/" element={<Index />} />
          {/* === Главная и IQ-квиз я.директ === */}
          <Route path="/direct" element={<DirectIndex />} />
          {/* === Главная и IQ-квиз вк=== */}
          <Route path="/vk" element={<VkIndex />} />

          {/* === Новый Select-квиз === */}
          <Route path="/select" element={<SelectStartPage />} />
          <Route path="/select/play" element={<SelectQuizPage />} />
          <Route path="/select/result" element={<SelectResultPage />} />

          {/* === Сбор данных по аффке === */}
          <Route path="/pokerplanets" element={<PokerPlanets />} />
          <Route path="/pokerdom" element={<PokerDom />} />

          {/* === Лидерборд IQ === */}
          <Route path="/iq-leaderboard" element={<LeaderboardPage />} />

          {/* === Catch-all === */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

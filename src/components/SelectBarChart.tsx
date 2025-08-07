import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface Props { scores: { spin: number; cash: number; mtt: number } }

export default function SelectBarChart({ scores }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: ['Spin', 'Cash', 'MTT'],
        datasets: [{ data: [scores.spin, scores.cash, scores.mtt] }],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
        animation: false,
      },
    });
  }, [scores]);

  return <canvas ref={ref} className="w-full h-64" />;
}

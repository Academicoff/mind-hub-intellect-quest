import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

interface Row {
  rank: number; // rank starts at 1 inside every page (comes from API)
  masked_user: string;
  iq_score: number;
}

const LIMIT = 50;

export default function LeaderboardPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ——— Fetching ——— */
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/leaderboard.php?limit=${LIMIT}&offset=${page * LIMIT}`, {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then(setRows)
      .catch(() => setRows([]))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page]);

  /* ——— Helpers ——— */
  const globalRank = (local: number) => page * LIMIT + local; // 0‑based math but ranks are 1‑based

  const medal = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  /* ——— UI ——— */
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <Card className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="bg-gradient-to-r from-indigo-400 to-fuchsia-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
            📈 Таблица лидеров IQ‑теста
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-200">
              <LoaderCircle className="mb-4 h-10 w-10 animate-spin" />
              Загрузка данных…
            </div>
          ) : (
            <Table className="w-full text-slate-100">
              <TableHeader>
                <TableRow className="backdrop-blur-lg bg-slate-700/60">
                  <TableHead className="w-20 text-center text-lg font-semibold">
                    #
                  </TableHead>
                  <TableHead className="text-lg font-semibold">Участник</TableHead>
                  <TableHead className="text-right text-lg font-semibold">
                    IQ
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const gRank = globalRank(r.rank);
                  return (
                    <TableRow
                      key={gRank}
                      className="transition-colors even:bg-slate-800/60 hover:bg-indigo-600/20"
                    >
                      <TableCell className="w-20 text-center text-xl font-bold">
                        {medal(gRank)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {r.masked_user}
                      </TableCell>
                      <TableCell className="text-right text-lg font-semibold">
                        {r.iq_score}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          {/* Пагинация */}
          <div className="mt-6 flex items-center justify-between">
            <button
              className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600 disabled:opacity-40"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              ← Назад
            </button>
            <button
              className="rounded-lg bg-slate-700 px-4 py-2 hover:bg-slate-600 disabled:opacity-40"
              disabled={rows.length < LIMIT}
              onClick={() => setPage((p) => p + 1)}
            >
              Далее →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

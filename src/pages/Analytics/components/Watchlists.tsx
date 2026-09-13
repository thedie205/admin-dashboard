import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import Card from "../../../components/ui/Card";
import PaginationControls from "../../../pages/Analytics/components/Paginationcontrols";
import { getWatchlist, type WatchlistRange } from "../../../services/analyticsService";
import type { WatchlistPoint } from "../../../types/analytics";

const RANGES: { key: WatchlistRange; label: string }[] = [
    { key: "day", label: "Day" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
];

const PAGE_SIZE = 7;

export default function Watchlists() {
    const [range, setRange] = useState<WatchlistRange>(
        localStorage.getItem("watchlistRange") as WatchlistRange || "day"
    );
    const [points, setPoints] = useState<WatchlistPoint[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // reset to page 1 whenever the range filter changes
    useEffect(() => {
        setPage(1);
    }, [range]);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await getWatchlist(range, page, PAGE_SIZE);
                if (!cancelled) {
                    setPoints(result.data);
                    setTotalPages(result.totalPages);
                    localStorage.setItem("watchlistRange", range);
                }
            } catch {
                if (!cancelled) setError("تعذر تحميل بيانات الـ Watchlist");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [range, page]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.15 }}
        >
            <Card
                title="Watchlists"
                action={
                    <div className="relative flex rounded-lg bg-gray-50 p-0.5 text-xs">
                        {RANGES.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setRange(key)}
                                className={`relative z-10 rounded-md px-2.5 py-1 font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-1 ${range === key ? "text-violet-600" : "text-gray-400"
                                    }`}
                            >
                                {range === key && (
                                    <motion.span
                                        layoutId="watchlist-range-pill"
                                        className="absolute inset-0 -z-10 rounded-md bg-white shadow-sm"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {label}
                            </button>
                        ))}
                    </div>
                }
            >
                {error ? (
                    <p className="text-sm text-red-500">{error}</p>
                ) : (
                    <div className="h-39">
                        {isLoading ? (
                            <div className="h-full w-full animate-pulse rounded-xl bg-gray-100" />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={points}>
                                    <CartesianGrid vertical={false} stroke="#F1F1F5" />
                                    <XAxis
                                        dataKey="day"
                                        tick={{ fontSize: 10, fill: "#9CA3AF" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="green"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        dot={false}
                                        isAnimationActive
                                        animationDuration={2000}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="orange"
                                        stroke="#F59E0B"
                                        strokeWidth={3}
                                        dot={false}
                                        isAnimationActive
                                        animationDuration={2000}
                                        animationBegin={100}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                )}

                <PaginationControls page={page} totalPages={totalPages} onChange={setPage} />
            </Card>
        </motion.div>
    );
}
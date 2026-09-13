import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { item, container } from "../../../animations";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Card from "../../../components/ui/Card";
import PaginationControls from "../../../pages/Analytics/components/Paginationcontrols";
import { getStats } from "../../../services/analyticsService";
import type { StatItem } from "../../../types/analytics";



function StatCard({ label, value, change, trend, sub }: StatItem) {
    const isUp = trend === "up";
    return (
        <motion.div variants={item}
            initial="hidden"
            animate="show"
            className="flex-1 min-w-[200px]">
            <Card>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{label}</span>
                    <span
                        className={`flex items-center gap-0.5 text-xs font-medium ${isUp ? "text-emerald-500" : "text-red-500"
                            }`}
                    >
                        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {change}
                    </span>
                </div>
                <div className="text-2xl font-bold text-violet-700">{value}</div>
                <div className="text-xs text-gray-400 mt-1">{sub}</div>
            </Card>
        </motion.div>
    );
}

function SkeletonCard() {
    return (
        <div className="flex-1 min-w-[200px] animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
            <div className="mb-3 h-3 w-2/3 rounded bg-gray-100" />
            <div className="mb-2 h-6 w-1/2 rounded bg-gray-100" />
            <div className="h-3 w-1/3 rounded bg-gray-100" />
        </div>
    );
}

export default function StatsCards() {
    const [stats, setStats] = useState<StatItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await getStats(page, 4);
                if (!cancelled) {
                    setStats(result.data);
                    setTotalPages(result.totalPages);
                }
            } catch {
                if (!cancelled) setError("تعذر تحميل الإحصائيات");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [page]);

    if (error) {
        return <p className="text-sm text-red-500">{error}</p>;
    }

    return (
        <div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-4"
            >
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                    : stats.map((s) => <StatCard key={s.id} {...s} />)}
            </motion.div>

            <PaginationControls page={page} totalPages={totalPages} onChange={setPage} />
        </div>
    );
}
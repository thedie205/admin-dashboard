import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../../../components/ui/Card";
import PaginationControls from "../../../pages/Analytics/components/Paginationcontrols";
import { getCountries } from "../../../services/analyticsService";
import type { CountryItem } from "../../../types/analytics";

const list = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const row = {
    hidden: { opacity: 0, x: -8 }, show: {
        opacity: 1, x: 0,
    }
};

const PAGE_SIZE = 4;

export default function TopCountries() {
    const [countries, setCountries] = useState<CountryItem[]>([]);
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
                const result = await getCountries(page, PAGE_SIZE);
                if (!cancelled) {
                    setCountries(result.data);
                    setTotalPages(result.totalPages);
                }
            } catch {
                if (!cancelled) setError("Failed to load top countries.");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [page]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
        >
            <Card title="Top Countries">
                {error ? (
                    <p className="text-sm text-red-500">{error}</p>
                ) : isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                            <div key={i} className="h-4 animate-pulse rounded bg-gray-100" />
                        ))}
                    </div>
                ) : (
                    <motion.ul variants={list} initial="hidden" animate="show" className="space-y-4">
                        {countries.map(({ id, label, value, flag }) => (
                            <motion.li key={id} variants={row} className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="text-lg leading-none">{flag}</span>
                                    {label}
                                </span>
                                <span className="text-sm font-semibold text-gray-800">{value}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}

                <PaginationControls page={page} totalPages={totalPages} onChange={setPage} />
            </Card>
        </motion.div>
    );
}
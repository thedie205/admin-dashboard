import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import Card from "../../../components/ui/Card";
import PaginationControls from "../../../pages/Analytics/components/Paginationcontrols";
import { getFunnel } from "../../../services/analyticsService";
import type { FunnelPoint, FunnelRange } from "../../../types/analytics";

type Range = FunnelRange;

const RANGES: { key: Range; label: string }[] = [
    { key: "This Month", label: "This Month" },
    { key: "Last Month", label: "Last Month" },
    { key: "3 Months", label: "3 Months" },
    { key: "6 Months", label: "6 Months" },
    { key: "This Year", label: "This Year" },
    { key: "Last Year", label: "Last Year" },
];

const PAGE_SIZE = 10;

function RangeDropdown({
    value,
    onChange,
}: {
    value: Range;
    onChange: (r: Range) => void;
}) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-1 rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-600 outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-1"
            >
                {value}
                <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 z-20 mt-1.5 w-32 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg"
                    >
                        {RANGES.map(({ key, label }) => (
                            <li key={key}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange(key);
                                        setOpen(false);
                                    }}
                                    className={`w-full px-3 py-1.5 text-left text-xs outline-none transition-colors focus-visible:bg-violet-50 ${value === key
                                        ? "font-semibold text-violet-600"
                                        : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SalesFunnel() {
    const [range, setRange] = useState<Range>(
        localStorage.getItem('funnelRange') as Range || "This Month"
    );
    const [points, setPoints] = useState<FunnelPoint[]>([]);
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
                const result = await getFunnel(range, page, PAGE_SIZE);
                if (!cancelled) {
                    setPoints(result.data);
                    setTotalPages(result.totalPages);
                    localStorage.setItem('funnelRange', range);
                }
            } catch {
                if (!cancelled) setError("Failed to load sales data.");
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
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Card title="Sales Funnel" action={<RangeDropdown value={range} onChange={setRange} />}>
                {error ? (
                    <p className="text-sm text-red-500">{error}</p>
                ) : (
                    <div className="h-30 ">
                        {isLoading ? (
                            <div className="h-full w-full animate-pulse rounded-xl bg-gray-100" />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={points}>
                                    <defs>
                                        <linearGradient id="funnelFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.25} />
                                            <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="#F1F1F5" />
                                    <XAxis
                                        dataKey="day"
                                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}k` : `${v}`)}
                                    />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#7C3AED"
                                        strokeWidth={2}
                                        fill="url(#funnelFill)"
                                        isAnimationActive
                                        animationDuration={2000}
                                        animationEasing="ease-out"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                )}

                <PaginationControls page={page} totalPages={totalPages} onChange={setPage} />
            </Card>
        </motion.div>
    );
}
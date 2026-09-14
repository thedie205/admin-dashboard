import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Monitor, Tablet, Tv } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Card from "../../../components/ui/Card";
import PaginationControls from "../components/Paginationcontrols";
import { getDevices } from "../../../services/analyticsService";
import type { DeviceItem, DeviceIconName } from "../../../types/analytics";

const ICONS: Record<DeviceIconName, LucideIcon> = {
    Smartphone,
    Monitor,
    Tablet,
    Tv,
};

const list = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const row = { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } };

const PAGE_SIZE = 4;

export default function DeviceCategory() {
    const [devices, setDevices] = useState<DeviceItem[]>([]);
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
                const result = await getDevices(page, PAGE_SIZE);
                if (!cancelled) {
                    setDevices(result.data);
                    setTotalPages(result.totalPages);
                }
            } catch {
                if (!cancelled) setError("Failed to load device data.");
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
            transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.15 }}
        >
            <Card title="Device Category">
                {error ? (
                    <p className="text-sm text-red-500">{error}</p>
                ) : isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                            <div key={i} className="h-4 animate-pulse rounded bg-gray-100" />
                        ))}
                    </div>
                ) : (
                    <motion.ul variants={list} initial="hidden" animate="show" className="space-y-7">
                        {devices.map(({ id, label, value, icon }) => {
                            const Icon = ICONS[icon];
                            return (
                                <motion.li key={id} variants={row} className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm text-gray-600">
                                        <Icon size={16} className="text-violet-500" />
                                        {label}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-800">{value}</span>
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                )}

                <PaginationControls page={page} totalPages={totalPages} onChange={setPage} />
            </Card>
        </motion.div>
    );
}
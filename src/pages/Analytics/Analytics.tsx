import { page as pageVariants } from "../../animations";
import { motion } from "framer-motion";
import {
    DeviceCategory,
    SalesFunnel,
    StatsCards,
    TopCountries,
    Watchlists,
} from "./components";

export default function Analytics() {
    return (
        <motion.main
            initial="hidden"
            animate="show"
            variants={pageVariants}
        >
            <div className="min-h-screen space-y-5 bg-gray-50 p-6">
                <StatsCards />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <SalesFunnel />
                    </div>
                    <DeviceCategory />
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Watchlists />
                    </div>
                    <TopCountries />
                </div>
            </div>
        </motion.main>
    );
}
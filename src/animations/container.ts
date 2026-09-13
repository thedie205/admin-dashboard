import type { Variants } from "framer-motion";
export const container: Variants = {
    hidden: {},

    show: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};
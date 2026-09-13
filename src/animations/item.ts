import type { Variants } from "framer-motion";
export const item: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },

    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: "easeOut",
        },
    },
};
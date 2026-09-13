import type { Variants } from "framer-motion";

export const page: Variants = {
    hidden: {
        opacity: 0,
        y: 16,
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
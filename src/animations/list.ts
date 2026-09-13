import type { Variants } from "framer-motion";

export const list: Variants = {
    hidden: {},

    show: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};

export const row: Variants = {
    hidden: {
        opacity: 0,
        x: -8,
    },

    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};
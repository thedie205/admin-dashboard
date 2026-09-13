import type { Variants } from "framer-motion";

export const sidebar: Variants = {
    open: {
        width: 260,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },

    closed: {
        width: 76,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
};
import type { Variants } from "framer-motion";

export const dropdown: Variants = {
    hidden: {
        opacity: 0,
        y: -6,
        scale: 0.98,
    },

    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.18,
            ease: "easeOut",
        },
    },

    exit: {
        opacity: 0,
        y: -4,
        scale: 0.98,
        transition: {
            duration: 0.12,
            ease: "easeIn",
        },
    },
};
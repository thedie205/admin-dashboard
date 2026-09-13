import type { Variants } from "framer-motion";

export const overlay: Variants = {
    hidden: {
        opacity: 0,
    },

    show: {
        opacity: 1,
        transition: {
            duration: 0.2,
        },
    },

    exit: {
        opacity: 0,
        transition: {
            duration: 0.15,
        },
    },
};

export const modal: Variants = {
    hidden: {
        opacity: 0,
        y: 12,
        scale: 0.96,
    },

    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },

    exit: {
        opacity: 0,
        y: 8,
        scale: 0.97,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};
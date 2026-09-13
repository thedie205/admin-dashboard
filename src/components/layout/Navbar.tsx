import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
    const location = useLocation();

    const pathSegments = location.pathname
        .split("/")
        .filter(Boolean);

    const formattedPath = pathSegments.map((segment) =>
        segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
    );

    return (
        <nav className="flex h-16 w-full items-center px-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{
                        opacity: 0,
                        y: 3,
                        filter: "blur(2px)",
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    exit={{
                        opacity: 0,
                        y: -3,
                        filter: "blur(1px)",
                    }}
                    transition={{
                        duration: 0.28,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-2 text-xl font-medium"
                >
                    {formattedPath.length === 0 ? (
                        <span className="text-gray-900">
                            Dashboard
                        </span>
                    ) : (
                        formattedPath.map((segment, index) => (
                            <div
                                key={`${segment}-${index}`}
                                className="flex items-center gap-2"
                            >
                                {index > 0 && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-gray-300"
                                    >
                                        /
                                    </motion.span>
                                )}

                                <motion.span
                                    initial={{
                                        opacity: 0,
                                        y: 2,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                        delay: index * 0.025,
                                        ease: "easeOut",
                                    }}
                                    className={
                                        index === formattedPath.length - 1
                                            ? "font-bold text-[#6E39CB]"
                                            : "text-gray-400"
                                    }
                                >
                                    {segment}
                                </motion.span>
                            </div>
                        ))
                    )}
                </motion.div>
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem as NavItemType } from "../../types/types";
import { Icons } from "../icons";

type NavItemProps = {
    item: NavItemType;
    isOpen: boolean;
    onToggle: (name: string) => void;
    onNavigate?: () => void;
};

const NavItem = ({
    item,
    isOpen,
    onToggle,
    onNavigate,
}: NavItemProps) => {
    const [openChild, setOpenChild] = useState<string | null>(null);

    const hasChildren =
        !!item.children && item.children.length > 0;

    // Toggle current menu
    const handleToggle = () => {
        onToggle(item.name);
    };

    // Toggle child menu
    const handleChildToggle = (name: string) => {
        setOpenChild((prev) => {
            return prev === name ? null : name;
        });
    };

    return (
        <div className="flex flex-col">

            {/* ============================= */}
            {/* Item */}
            {/* ============================= */}

            {hasChildren ? (
                <button
                    type="button"
                    onClick={handleToggle}
                    className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-200 ${isOpen
                        ? "bg-[#6E39CB]/10 text-[#6E39CB]"
                        : "text-gray-700 hover:bg-[#6E39CB]/10 hover:text-[#6E39CB]"
                        }`}
                >
                    {/* Name + Icon */}
                    <span className="flex items-center gap-2">
                        {item.icon && (
                            <item.icon className="h-4 w-4" />
                        )}

                        <span>{item.name}</span>
                    </span>

                    {/* Arrow */}
                    <motion.div
                        animate={{
                            rotate: isOpen ? 180 : 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <Icons.ArrowDown className="h-3 w-3" />
                    </motion.div>
                </button>
            ) : (
                /* ============================= */
                /* Actual Link */
                /* ============================= */

                <NavLink
                    to={item.href ?? "#"}
                    onClick={onNavigate}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-[#6E39CB]/10 hover:text-[#6E39CB]"
                >
                    {item.icon && (
                        <item.icon className="h-4 w-4" />
                    )}

                    <span>{item.name}</span>
                </NavLink>
            )}

            {/* ============================= */}
            {/* Children */}
            {/* ============================= */}

            <AnimatePresence initial={false}>
                {hasChildren && isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        className="ml-6 mt-1 flex flex-col gap-1 overflow-hidden"
                    >
                        {item.children?.map((child) => (
                            <NavItem
                                key={child.name}
                                item={child}
                                isOpen={openChild === child.name}
                                onToggle={handleChildToggle}
                                onNavigate={onNavigate}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NavItem;

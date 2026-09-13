import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../icons";
import { NavLinks } from "../../data/data";
import NavItem from "./NavItem";
import { getCurrentUser, logoutUser } from "../../services/userService";
import LogoutButton from "../auth/LogoutButton";

const OPEN_MENU_KEY = "sidebar-open-menu";

const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(() => {
        return localStorage.getItem(OPEN_MENU_KEY);
    });

    // controls the mobile drawer (closed by default on small screens)
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const user = getCurrentUser();

    const handleMenuToggle = (name: string) => {
        setOpenMenu((prev) => {
            const nextMenu = prev === name ? null : name;

            if (nextMenu) {
                localStorage.setItem(OPEN_MENU_KEY, nextMenu);
            } else {
                localStorage.removeItem(OPEN_MENU_KEY);
            }

            return nextMenu;
        });
    };

    const handleNavigate = () => {
        setOpenMenu(null);
        localStorage.removeItem(OPEN_MENU_KEY);
        setIsMobileOpen(false); // close drawer on navigation (mobile)
    };

    const handleLogout = () => {
        logoutUser();
    };

    // lock body scroll while the mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    return (
        <>
            {/* Mobile top bar with hamburger — hidden on desktop */}
            <div className="fixed left-0 top-0 z-40 flex h-14 w-full items-center justify-between bg-white px-4 shadow-sm lg:hidden">
                <Link to="/dashboard" className="flex items-center">
                    <Icons.Logo className="h-6 w-auto" />
                </Link>
                <button
                    type="button"
                    aria-label="Toggle menu"
                    onClick={() => setIsMobileOpen((prev) => !prev)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                    <span className="relative flex h-4 w-5 flex-col justify-between">
                        <span
                            className={`h-0.5 w-full bg-gray-800 transition-transform duration-200 ${isMobileOpen ? "translate-y-[7px] rotate-45" : ""
                                }`}
                        />
                        <span
                            className={`h-0.5 w-full bg-gray-800 transition-opacity duration-200 ${isMobileOpen ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <span
                            className={`h-0.5 w-full bg-gray-800 transition-transform duration-200 ${isMobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                                }`}
                        />
                    </span>
                </button>
            </div>

            {/* Backdrop — mobile only, shown while drawer is open */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className={`scrollbar-hide fixed left-0 top-0 z-50 flex h-screen w-[210px] flex-col overflow-y-auto bg-white
        lg:translate-x-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
    `}
            >
                {/* Logo — desktop only, mobile already shows it in the top bar */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                    className="hidden lg:block"
                >
                    <Link
                        to="/dashboard"
                        onClick={handleNavigate}
                        className="flex items-center justify-center px-6 py-12"
                    >
                        <Icons.Logo className="h-8 w-auto" />
                    </Link>
                </motion.div>

                {/* Spacer so nav doesn't sit under the mobile top bar */}
                <div className="h-14 lg:hidden" />

                {/* Navigation */}
                <nav className="mb-10 flex flex-1 flex-col gap-4 px-6">
                    {NavLinks.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -35 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.12 + index * 0.035,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <NavItem
                                item={item}
                                isOpen={openMenu === item.name}
                                onToggle={handleMenuToggle}
                                onNavigate={handleNavigate}
                            />
                        </motion.div>
                    ))}
                </nav>

                {/* Account */}
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                    className="px-6 pb-6"
                >
                    {user && (
                        <div className="flex h-12 w-full items-center rounded-lg bg-[#6E39CB] px-3 text-white">
                            <div className="flex w-full items-center justify-between gap-2">
                                <LogoutButton/>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
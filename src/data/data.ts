import { Icons } from "../components/icons";
import type { NavItem } from "../types/types";


export const NavLinks: NavItem[] = [
    // ========================================
    // Home
    // ========================================

    {
        name: "Home",
        icon: Icons.Home,

        children: [
            {
                name: "Dashboard",
                href: "/dashboard",
            },
            {
                name: "Analytics",
                href: "/analytics",
            },
        ],
    },

    // ========================================
    // Pages
    // ========================================

    {
        name: "Pages",
        icon: Icons.Pages,

        children: [
            {
                name: "Profile",
                children: [
                    {
                        name: "Profile Overview",
                        href: "/profile-overview",
                    },
                    {
                        name: "Teams",
                        href: "/teams",
                    },
                    {
                        name: "All Projects",
                        href: "/all-projects",
                    },
                ],
            },

            {
                name: "Users",
                children: [
                    {
                        name: "Reports",
                        href: "/reports",
                    },
                    {
                        name: "New User",
                        href: "/new-user",
                    },
                ],
            },

            {
                name: "Account",
                children: [
                    {
                        name: "Settings",
                        href: "/settings",
                    },
                    {
                        name: "Billing",
                        href: "/billing",
                    },
                    {
                        name: "Invoices",
                        href: "/invoices",
                    },
                    {
                        name: "Security",
                        href: "/security",
                    },
                ],
            },

            {
                name: "Projects",
                children: [
                    {
                        name: "Timeline",
                        href: "/timeline",
                    },
                    {
                        name: "New Project",
                        href: "/new-project",
                    },
                ],
            },

            {
                name: "Pricing Page",
                href: "/pricing-page",
            },

            {
                name: "Charts",
                href: "/charts",
            },

            {
                name: "Notifications",
                href: "/notifications",
            },

            {
                name: "Chat",
                href: "/chat",
            },
        ],
    },

    // ========================================
    // Applications
    // ========================================

    {
        name: "Applications",
        icon: Icons.Applications,

        children: [
            {
                name: "Kanban",
                href: "/kanban",
            },
            {
                name: "Wizard",
                href: "/wizard",
            },
            {
                name: "Data Tables",
                href: "/data-tables",
            },
            {
                name: "Calendar",
                href: "/calendar",
            },
        ],
    },

    // ========================================
    // E-commerce
    // ========================================

    {
        name: "E-commerce",
        icon: Icons.EEcommerce,

        children: [
            {
                name: "Products",
                children: [
                    {
                        name: "New Product",
                        href: "/new-product",
                    },
                    {
                        name: "Edit Product",
                        href: "/edit-product",
                    },
                    {
                        name: "Product List",
                        href: "/product-list",
                    },
                ],
            },

            {
                name: "Orders",
                children: [
                    {
                        name: "Order List",
                        href: "/order-list",
                    },
                    {
                        name: "Order Details",
                        href: "/order-details",
                    },
                ],
            },
        ],
    },

    // ========================================
    // Authentication
    // ========================================

    {
        name: "Authentication",
        icon: Icons.Authentication,

        children: [
            {
                name: "Login",
                href: "/login",
            },
            {
                name: "Register",
                href: "/register",
            },
            {
                name: "Forgot Password",
                href: "/forgot-password",
            },
            {
                name: "Reset Password",
                href: "/reset-password",
            },
            {
                name: "Lock Screen",
                href: "/lock-screen",
            },
            {
                name: "2 Step Verification",
                href: "/2-step-verification",
            },
        ],
    },
];


// ======================================== Analytics


export interface StatItem {
    label: string;
    value: string;
    change: string;
    trend: "up" | "down";
    sub: string;
}

export interface FunnelPoint {
    day: string;
    value: number;
}

export interface WatchlistPoint {
    day: string;
    green: number;
    orange: number;
}

export interface WatchlistData {
    day: WatchlistPoint[];
    week: WatchlistPoint[];
    month: WatchlistPoint[];
}

export type DeviceIconName = "Smartphone" | "Monitor" | "Tablet" | "Tv";

export interface DeviceItem {
    label: string;
    value: string;
    icon: DeviceIconName;
}

export interface CountryItem {
    label: string;
    value: string;
    flag: string;
}

export const STATS: StatItem[] = [
    {
        label: "Available to withdraw",
        value: "$1,567.99",
        change: "10.0%",
        trend: "up",
        sub: "Wed, Jul 20",
    },
    {
        label: "Today Revenue",
        value: "$2,868.99",
        change: "9.6%",
        trend: "down",
        sub: "143 Orders",
    },
    {
        label: "Today Sessions",
        value: "156k",
        change: "0.2%",
        trend: "up",
        sub: "324 Visitors",
    },
    {
        label: "Subscribers",
        value: "3,422",
        change: "8.3%",
        trend: "up",
        sub: "$32.48 Average Order",
    },
];



export const FUNNEL_DATA: FunnelPoint[] = [
    { day: "10", value: 320 },
    { day: "11", value: 280 },
    { day: "12", value: 260 },
    { day: "13", value: 300 },
    { day: "14", value: 260 },
    { day: "15", value: 340 },
    { day: "16", value: 300 },
    { day: "17", value: 600 },
    { day: "18", value: 340 },
    { day: "19", value: 300 },
    { day: "20", value: 360 },
    { day: "21", value: 260 },
    { day: "22", value: 300 },
    { day: "23", value: 260 },
    { day: "24", value: 280 },
];

// Grouped by range so Watchlists.tsx can pick the right dataset for the
// selected filter (Day / Week / Month) instead of showing one fixed series.
export const WATCHLIST_DATA: WatchlistData = {
    day: [
        { day: "9 AM", green: 320, orange: 90 },
        { day: "11 AM", green: 380, orange: 110 },
        { day: "1 PM", green: 450, orange: 130 },
        { day: "3 PM", green: 520, orange: 150 },
        { day: "5 PM", green: 460, orange: 120 },
        { day: "7 PM", green: 360, orange: 100 },
        { day: "9 PM", green: 300, orange: 80 },
    ],
    week: [
        { day: "Mon", green: 340, orange: 100 },
        { day: "Tue", green: 400, orange: 120 },
        { day: "Wed", green: 470, orange: 140 },
        { day: "Thu", green: 540, orange: 160 },
        { day: "Fri", green: 460, orange: 130 },
        { day: "Sat", green: 380, orange: 110 },
        { day: "Sun", green: 330, orange: 95 },
    ],
    month: [
        { day: "Jan", green: 340, orange: 100 },
        { day: "Feb", green: 400, orange: 120 },
        { day: "Mar", green: 470, orange: 140 },
        { day: "Apr", green: 540, orange: 160 },
        { day: "May", green: 600, orange: 180 },
        { day: "Jun", green: 520, orange: 150 },
        { day: "Jul", green: 460, orange: 130 },
        { day: "Aug", green: 400, orange: 115 },
        { day: "Sep", green: 360, orange: 105 },
        { day: "Oct", green: 330, orange: 95 },
        { day: "Nov", green: 400, orange: 115 },
        { day: "Dec", green: 470, orange: 135 },
    ],
};

export const DEVICE_CATEGORY: DeviceItem[] = [
    { label: "Mobile", value: "96.42%", icon: "Smartphone" },
    { label: "Desktop", value: "2.76%", icon: "Monitor" },
    { label: "Tablet", value: "0.82%", icon: "Tablet" },
    { label: "TV", value: "12.3%", icon: "Tv" },
];

export const TOP_COUNTRIES: CountryItem[] = [
    { label: "Pakistan", value: "54%", flag: "🇵🇰" },
    { label: "Germany", value: "32%", flag: "🇩🇪" },
    { label: "United State", value: "37%", flag: "🇺🇸" },
    { label: "Spain", value: "25%", flag: "🇪🇸" },
];
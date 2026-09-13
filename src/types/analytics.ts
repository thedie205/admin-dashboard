export interface StatItem {
    id: number;
    label: string;
    value: string;
    change: string;
    trend: "up" | "down";
    sub: string;
}

export interface FunnelPoint {
    id: number;
    day: string;
    value: number;
}

export type FunnelRange =
    | "This Month"
    | "Last Month"
    | "3 Months"
    | "6 Months"
    | "This Year"
    | "Last Year";

export interface WatchlistPoint {
    id: number;
    day: string;
    green: number;
    orange: number;
}

export type DeviceIconName = "Smartphone" | "Monitor" | "Tablet" | "Tv";

export interface DeviceItem {
    id: number;
    label: string;
    value: string;
    icon: DeviceIconName;
}

export interface CountryItem {
    id: number;
    label: string;
    value: string;
    flag: string;
}
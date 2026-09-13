import { fetchPaginated } from "../lib/pagination";
import type {
    CountryItem,
    DeviceItem,
    StatItem,
    FunnelPoint,
    FunnelRange,
    WatchlistPoint,
} from "../types/analytics";

// ===================== Country =====================
export const getCountries = (page = 1, limit = 4) =>
    fetchPaginated<CountryItem>("countries", page, limit);

// ===================== Device =====================
export const getDevices = (page = 1, limit = 4) =>
    fetchPaginated<DeviceItem>("devices", page, limit);

// ===================== Stats =====================
export const getStats = (page = 1, limit = 4) =>
    fetchPaginated<StatItem>("stats", page, limit);

// ===================== Funnel =====================
const FUNNEL_RESOURCE_BY_RANGE: Record<FunnelRange, string> = {
    "This Month": "funnelThisMonth",
    "Last Month": "funnelLastMonth",
    "3 Months": "funnel3Months",
    "6 Months": "funnel6Months",
    "This Year": "funnelThisYear",
    "Last Year": "funnelLastYear",
};

export const getFunnel = (range: FunnelRange, page = 1, limit = 10) =>
    fetchPaginated<FunnelPoint>(FUNNEL_RESOURCE_BY_RANGE[range], page, limit);

// ===================== Watchlist =====================
export type WatchlistRange = "day" | "week" | "month";

const WATCHLIST_RESOURCE_BY_RANGE: Record<WatchlistRange, string> = {
    day: "watchlistDay",
    week: "watchlistWeek",
    month: "watchlistMonth",
};

export const getWatchlist = (
    range: WatchlistRange,
    page = 1,
    limit = 7
) => fetchPaginated<WatchlistPoint>(WATCHLIST_RESOURCE_BY_RANGE[range], page, limit);
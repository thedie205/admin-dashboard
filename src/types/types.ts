import type { ComponentType } from "react";

export type NavItem = {
    name: string;
    href?: string;
    icon?: ComponentType;
    children?: NavItem[];
};

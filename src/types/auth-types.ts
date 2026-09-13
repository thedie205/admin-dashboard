// src/lib/auth-types.ts

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    isOnline: boolean;
};

export type RegisterFormData = {
    name: string;
    email: string;
    password: string;
};

export type LoginFormData = {
    email: string;
    password: string;
    remember?: boolean;
};

export type CurrentUser = {
    id: string;
    name: string;
    email: string;
};
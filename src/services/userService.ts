import type {
    RegisterFormData,
    LoginFormData,
} from "../lib/auth";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export function getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);

    if (!users) {
        return [];
    }

    return JSON.parse(users);
}

export function registerUser(data: RegisterFormData): User {
    const users = getUsers();

    const existingUser = users.find(
        (user) =>
            user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingUser) {
        throw new Error("Email is already registered");
    }

    const newUser: User = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
    };

    users.push(newUser);

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

    return newUser;
}

export function loginUser(data: LoginFormData): User {
    const users = getUsers();

    const user = users.find(
        (user) =>
            user.email.toLowerCase() ===
            data.email.toLowerCase()
    );

    if (!user || user.password !== data.password) {
        throw new Error("Invalid email or password");
    }

    const currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
    };

    // Remember me
    if (data.remember) {
        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(currentUser)
        );

        // Remove temporary session if it exists
        sessionStorage.removeItem(CURRENT_USER_KEY);
    } else {
        sessionStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(currentUser)
        );

        // Remove persistent session if it exists
        localStorage.removeItem(CURRENT_USER_KEY);
    }

    return user;
}

export function getCurrentUser() {
    const user =
        localStorage.getItem(CURRENT_USER_KEY) ||
        sessionStorage.getItem(CURRENT_USER_KEY);

    if (!user) {
        return null;
    }

    return JSON.parse(user);
}

export function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
}

export function isAuthenticated() {
    return (
        localStorage.getItem(CURRENT_USER_KEY) !== null ||
        sessionStorage.getItem(CURRENT_USER_KEY) !== null
    );
}
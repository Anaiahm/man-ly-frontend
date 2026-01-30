export type user = {
    id: string;
    name: string;
    email: string;
}

export type AuthState = {
    isAuthenticated: boolean;
    user: user | null;
}


export type user = {
    id: string;
    name: string;
    email: string;
    profilePhotoUrl?: string;
}

export type AuthState = {
    isAuthenticated: boolean;
    user: user | null;
}


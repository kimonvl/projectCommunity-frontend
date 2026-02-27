export interface User {
    id: number;
    email: string;
}

export interface AuthError {
    message: string;
    status?: number;
}

export interface SignUpPayload {
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: AuthError | null;
}
import { User } from "../auth/auth.types";

export interface UserError {
    message: string;
    status?: number;
}

export interface UserState {
    searchUsers: User[];
    loading: boolean;
    error: UserError | null;
}
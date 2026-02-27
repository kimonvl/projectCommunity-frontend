import { User } from "../auth/auth.types";

export interface Comment {
    id: number;
    content: string;
    author: User;
    createdAt: string;
}

export interface CommentError {
    message: string;
    status?: number;
}

export interface CommentState {
    selectedIssueComments: Comment[];
    loading: boolean;
    error: CommentError | null;
}
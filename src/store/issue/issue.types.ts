import { User } from "../auth/auth.types";

export interface Issue {
    id: number;
    title: string;
    description: string;
    status: string;
    projejectId: number;
    creator: User;
    assignedUsers: User[];
}

export interface IssueError {
    message: string;
    status?: number;
}

export interface IssueState {
    selectedProjectIssues: Issue[];
    selectedIssue: Issue | null;
    loading: boolean;
    error: IssueError | null;
}
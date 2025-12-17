import { User } from "../auth/auth.types";

export interface IssueCreatedMetadata {

    /** Email of the creator of the issue */
    creatorEmail: string;

    /** Identifier of the project that the created issue belongs to */
    projectId: number;

    /** Identifier of the created issue */
    issueId: number;
}

export interface ProjectInviteMetadata {

    /** Identifier of the target project */
    projectId: number;

    /** Title of the target project */
    projectTitle: string;

    /** Email of the owner of the target project that sent the invitation */
    ownerEmail: string;
}

export interface Notification {
    id: number;
    message: string;
    type: string;
    seen: boolean;
    sender: User;
    createdAt: string;
    metadata: IssueCreatedMetadata | ProjectInviteMetadata | null;
}

export interface NotificationError {
    message: string;
    status?: number;
}

export interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: NotificationError | null;
}
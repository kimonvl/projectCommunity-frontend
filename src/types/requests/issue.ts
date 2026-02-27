export interface CreateIssueRequest {
    /** Title of the issue */
    title: string;
    /** Description of the issue */
    description: string;
    /** Identifier of the target project. */
    projectId: number;
}

export interface AssignUserToIssueRequest {
    /** Identifier of the target issue */
    issueId: number;
    /** Identifier of the user to be assigned */
    userId: number;
}

export interface ChangeIssueStatusRequest {
    /** Identifier of the target issue */
    issueId: number;
    /** New status to be applied */
    status: string;
}

export interface DeleteIssuePayload {
  issueId: number;
  navigate: (path: string) => void;
}

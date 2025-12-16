export interface CreateCommentRequest {
    /** Identifier of the target issue */
    issueId: number;
    /** Content of the comment */
    content: string;
}
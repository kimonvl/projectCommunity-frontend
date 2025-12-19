export interface CreateProjectRequest {
    /** Title of the project */
    title: string;
    /** Description of the project */
    description: string;
    /** Category of the project */
    category: string;
    /** Tags associated with the project */
    tags: string[];
}

export interface ProjectInvitationRequest {
    /** Emails of the users to be invited */
    receiverEmails: string[];
    /** Identifier of the target project */
    projectId: number;
}

export interface AcceptProjectInvitationRequest {
    /** Identifier of the target project */
    projectId: number;
    /** Identifier of the associated invitation notification */
    notificationId: number;
}
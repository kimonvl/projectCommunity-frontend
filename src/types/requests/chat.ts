export interface SendMessageRequest {
    /** Identifier of the target chat */
    chatId: number;
    /** Content of the message */
    content: string;
}
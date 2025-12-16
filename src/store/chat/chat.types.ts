import { User } from "../auth/auth.types";

export interface Message {
    id: number;
    content: string;
    sender: User;
    chatId: number;
    timestamp: string;
}

export interface Chat {
    id: number;
    participants: User[];
    messages: Message[];
}

export interface ChatError {
    message: string;
    status?: number;
}

export interface ChatState {
    activeChat: Chat | null;
    loading: boolean;
    error: ChatError | null;
}
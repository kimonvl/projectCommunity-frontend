import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, ChatError, ChatState, Message } from "./chat.types";
import { SendMessageRequest } from "@/types/requests/chat";

const initialState: ChatState = {
    activeChat: null,
    loading: false,
    error: null,
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        fetchActiveChatStart: (state, _action: PayloadAction<number>) => {
            state.loading = true;
        },
        fetchActiveChatSuccess: (state, action: PayloadAction<Chat>) => {
            state.activeChat = action.payload;
            state.loading = false;
        },
        fetchActiveChatFailure: (state, action: PayloadAction<ChatError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        sendMessageStart: (_state, _action: PayloadAction<SendMessageRequest>) => {
        },
        sendMessageSuccess: () => {
        },
        sendMessageFailure: (state, action: PayloadAction<ChatError>) => {
            state.error = action.payload;
        },
        receiveMessage: (state, action: PayloadAction<Message>) => {
            if (!state.activeChat) return;
            
            state.activeChat.messages = [...state.activeChat.messages, action.payload];
        },
    }
})

export const chatReducer = chatSlice.reducer;
export const {
    fetchActiveChatStart,
    fetchActiveChatSuccess,
    fetchActiveChatFailure,
    sendMessageStart,
    sendMessageSuccess,
    sendMessageFailure,
    receiveMessage,
} = chatSlice.actions;

export default chatReducer;
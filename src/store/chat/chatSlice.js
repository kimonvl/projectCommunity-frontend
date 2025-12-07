import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeChat: null,
    loading: false,
    error: null,
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        fetchActiveChatStart: (state) => {
            state.loading = true;
        },
        fetchActiveChatSuccess: (state, action) => {
            state.activeChat = action.payload;
            state.loading = false;
        },
        fetchActiveChatFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        sendMessageStart: (state) => {
            state.loading = true;
        },
        sendMessageSuccess: (state, action) => {
            state.activeChat.messages = [...state.activeChat.messages, action.payload];
            state.loading = false;
        },
        sendMessageFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
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
} = chatSlice.actions;

export default chatReducer;
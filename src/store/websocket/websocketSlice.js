import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isConnected: false,
};

export const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        connectWebsocketStart: (state) => {
            state.isConnected = false;
        },
        connectWebsocketSuccess: (state) => {
            state.isConnected = true;
        },
        connectWebsocketFailure: (state) => {
            state.isConnected = false;
        },
        subscribeToTopicStart: (state) => { },
        subscribeToTopicSuccess: (state) => { },
        subscribeToTopicFailure: (state) => { },
    }
});

const websocketrReducer = websocketSlice.reducer;

export const {
    connectWebsocketStart,
    connectWebsocketSuccess,
    connectWebsocketFailure,
    subscribeToTopicStart,
    subscribeToTopicSuccess,
    subscribeToTopicFailure,
} = websocketSlice.actions;

export default websocketrReducer
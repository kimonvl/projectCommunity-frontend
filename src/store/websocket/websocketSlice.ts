import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketState } from "./websocket.types";

const initialState: WebsocketState = {
    isConnected: false,
    subscribedTopics: {},
};

export const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        connectWebsocketStart: () => {
        },
        connectWebsocketSuccess: (state) => {            
            state.isConnected = true;
        },
        connectWebsocketFailure: (state) => {
            state.isConnected = false;
            state.subscribedTopics = {};
        },
        subscribeToTopicStart: (_state, _action: PayloadAction<number>) => { },
        subscribeToTopicSuccess: (state, action: PayloadAction<string>) => {
            state.subscribedTopics[action.payload] = true;
        },
        subscribeToTopicFailure: () => { },
        unSubscribeFromTopicStart: (_state, _action: PayloadAction<number>) => { },
        unSubscribeFromTopicSuccess: (state, action) => {
            delete state.subscribedTopics[action.payload];
        },
        unSubscribeFromTopicFailure: () => { },
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
    unSubscribeFromTopicStart,
    unSubscribeFromTopicSuccess,
    unSubscribeFromTopicFailure,
} = websocketSlice.actions;

export default websocketrReducer
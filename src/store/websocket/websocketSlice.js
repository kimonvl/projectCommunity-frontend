import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isConnected: false,
    subscribedTopics: {},
};

export const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        connectWebsocketStart: (state) => {
        },
        connectWebsocketSuccess: (state) => {
            console.log("reducer running");
            
            state.isConnected = true;
        },
        connectWebsocketFailure: (state) => {
            state.isConnected = false;
            state.subscribedTopics = {};
        },
        subscribeToTopicStart: (state) => { },
        subscribeToTopicSuccess: (state, acction) => {
            state.subscribedTopics[acction.payload] = true;
        },
        subscribeToTopicFailure: (state) => { },
        unSubscribeFromTopicStart: (state) => { },
        unSubscribeFromTopicSuccess: (state, action) => {
            delete state.subscribedTopics[action.payload];
        },
        unSubscribeFromTopicFailure: (state) => { },
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
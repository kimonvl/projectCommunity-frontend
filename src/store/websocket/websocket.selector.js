import { createSelector } from "reselect";

const selectWebsocketReducer = (state) => state.websocket;

export const selectWebsocketIsConnected = createSelector(
  [selectWebsocketReducer],
  (websocket) => websocket.isConnected
);

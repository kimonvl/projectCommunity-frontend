import { createSelector } from "reselect";
import { RootState } from "../store";
import { WebsocketState } from "./websocket.types";

const selectWebsocketReducer = (state: RootState): WebsocketState => state.websocket;

export const selectWebsocketIsConnected = createSelector(
  [selectWebsocketReducer],
  (websocket) => websocket.isConnected
);

import { createSelector } from "reselect";
import { RootState } from "../store";
import { ChatState } from "./chat.types";

const selectChatReducer = (state: RootState): ChatState => state.chat;

export const selectActiveChatId = createSelector(
  [selectChatReducer],
  (chatSlice) => chatSlice.activeChat?.id ?? null
);

export const selectActiveChat = createSelector(
  [selectChatReducer],
  (chatSlice) => chatSlice.activeChat
);

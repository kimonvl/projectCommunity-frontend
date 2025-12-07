import { createSelector } from "reselect";

const selectChatReducer = (state) => state.chat;

export const selectActiveChatId = createSelector(
  [selectChatReducer],
  (chat) => chat.activeChat.id
);

export const selectActiveChat = createSelector(
  [selectChatReducer],
  (chat) => chat.activeChat
);

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import authReducer from "./auth/authSlice";
import projectReducer from "./project/projectSlice";
import chatReducer from "./chat/chatSlice";
import notificationReducer from "./notification/notificationSlice";
import userReducer from "./user/userSlice";
import issueReducer from "./issue/issueSlice";
import commentReducer from "./comment/commentSlice";
import websocketReducer from "./websocket/websocketSlice";

import websocketMiddleware from "./websocket/websocketMiddleware";
import { rootSaga } from "./root-saga";

/* =========================
   Persist configurations
   ========================= */

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const persistProjectConfig = {
  key: "project",
  storage,
  whitelist: ["myProjects", "selectedProject"],
};

const persistChatConfig = {
  key: "chat",
  storage,
  whitelist: [],
};

const persistNotificationConfig = {
  key: "notification",
  storage,
  whitelist: ["notifications"],
};

const persistUserConfig = {
  key: "user",
  storage,
  whitelist: [],
};

const persistIssueConfig = {
  key: "issue",
  storage,
  whitelist: ["selectedProjectIssues", "selectedIssue"],
};

const persistCommentConfig = {
  key: "comment",
  storage,
  whitelist: [],
};

const persistWebsocketConfig = {
  key: "websocket",
  storage,
  whitelist: [],
};

/* =========================
   Persisted reducers
   ========================= */

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer),
    project: persistReducer(persistProjectConfig, projectReducer),
    chat: persistReducer(persistChatConfig, chatReducer),
    notification: persistReducer(persistNotificationConfig, notificationReducer),
    user: persistReducer(persistUserConfig, userReducer),
    issue: persistReducer(persistIssueConfig, issueReducer),
    comment: persistReducer(persistCommentConfig, commentReducer),
    websocket: persistReducer(persistWebsocketConfig, websocketReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware, websocketMiddleware, logger),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

/* =========================
   Global store types
   ========================= */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

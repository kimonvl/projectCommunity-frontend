import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import createSagaMiddleware from "redux-saga";
import authReducer from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootSaga } from "./root-saga";
import projectReducer from "./project/projectSlice";
import websocketrReducer from "./websocket/websocketSlice";
import websocketMiddleware from "./websocket/websocketMiddleware";
import chatReducer from "./chat/chatSlice";
import notificationReducer from "./notification/notificationSlice";
import userReducer from "./user/userSlice";
import issueReducer from "./issue/issueSlice";
import commentReducer from "./comment/commentSlice";

const sagaMidleware = createSagaMiddleware();
const middlewares = [sagaMidleware, websocketMiddleware, logger];

const persistAuthConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'isAuthenticated']
};

const persistProjectConfig = {
    key: 'project',
    storage,
    whitelist: ['myProjects', 'selectedProject']
};

const persistChatConfig = {
    key: 'chat',
    storage,
    whitelist: []
};

const persistNotificationConfig = {
    key: 'notification',
    storage,
    whitelist: ['notifications']
};

const persistUserConfig = {
    key: 'user',
    storage,
    whitelist: []
};

const persistIssueConfig = {
    key: 'issue',
    storage,
    whitelist: ['selectedProjectIssues', 'selectedIssue']
};

const persistCommentConfig = {
    key: 'comment',
    storage,
    whitelist: []
};

const persistWebsocketConfig = {
    key: 'websocket',
    storage,
    whitelist: []
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedProjectReducer = persistReducer(persistProjectConfig, projectReducer);
const persistedChatReducer = persistReducer(persistChatConfig, chatReducer);
const persistedNotificationReducer = persistReducer(persistNotificationConfig, notificationReducer);
const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const persistedIssueReducer = persistReducer(persistIssueConfig, issueReducer);
const persistedCommentReducer = persistReducer(persistCommentConfig, commentReducer);
const persistedWebsocketReducer = persistReducer(persistWebsocketConfig, websocketrReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        project: persistedProjectReducer,
        chat: persistedChatReducer,
        notification: persistedNotificationReducer,
        user: persistedUserReducer,
        issue: persistedIssueReducer,
        comment: persistedCommentReducer,
        websocket: persistedWebsocketReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false
        }).concat(middlewares)
});

export const persistor = persistStore(store);

sagaMidleware.run(rootSaga);
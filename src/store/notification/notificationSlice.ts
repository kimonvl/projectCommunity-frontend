import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification, NotificationError, NotificationState } from "./notification.types";

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        receiveNotificationStart: (state) => {
            state.loading = true;
        },
        receiveNotificationSuccess: (state, action: PayloadAction<Notification>) => {
            state.notifications = [...state.notifications, action.payload];
            state.loading = false;
        },
        receiveNotificationFailure: (state, action: PayloadAction<NotificationError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        getUnseenNotificationsStart: (state) => {
            state.loading = true;
        },
        getUnseenNotificationsSuccess: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
            state.loading = false;
        },
        getUnseenNotificationsFailure: (state, action: PayloadAction<NotificationError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        markAsSeenNotificationStart: (state, _action: PayloadAction<number>) => {
            state.loading = true;
        },
        markAsSeenNotificationSuccess: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter((notification) => notification.id != action.payload);
            state.loading = false;
        },
        markAsSeenNotificationFailure: (state, action: PayloadAction<NotificationError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        removeNotification: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter((notification) => notification.id != action.payload);
        },

    }
});

const notificationReducer = notificationSlice.reducer;
export const {
    receiveNotificationStart,
    receiveNotificationSuccess,
    receiveNotificationFailure,
    getUnseenNotificationsStart,
    getUnseenNotificationsSuccess,
    getUnseenNotificationsFailure,
    markAsSeenNotificationStart,
    markAsSeenNotificationSuccess,
    markAsSeenNotificationFailure,
    removeNotification,
} = notificationSlice.actions;

export default notificationReducer;
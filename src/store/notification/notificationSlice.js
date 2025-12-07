import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        receiveNotificationSuccess: (state, action) => {
            state.notifications = [...state.notifications, action.payload];
            state.loading = false;
        },
        receiveNotificationFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getUnseenNotificationsStart: (state) => {
            state.loading = true;
        },
        getUnseenNotificationsSuccess: (state, action) => {
            state.notifications = action.payload;
            state.loading = false;
        },
        getUnseenNotificationsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter((notification) => notification.id != action.payload);
        }
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
    removeNotification,
} = notificationSlice.actions;

export default notificationReducer;
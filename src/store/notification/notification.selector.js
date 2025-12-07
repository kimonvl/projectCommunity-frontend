import { createSelector } from "reselect";

const selectNotificationReducer = (state) => state.notification;

export const selectNotifications = createSelector(
    [selectNotificationReducer],
    (notificationSlice) => notificationSlice.notifications
);

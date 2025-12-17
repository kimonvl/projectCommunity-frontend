import { createSelector } from "reselect";
import { NotificationState } from "./notification.types";
import { RootState } from "../store";

const selectNotificationReducer = (state: RootState): NotificationState => state.notification;

export const selectNotifications = createSelector(
    [selectNotificationReducer],
    (notificationSlice) => notificationSlice.notifications
);

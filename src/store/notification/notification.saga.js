import { all, call, put, takeLatest } from "redux-saga/effects";
import { getUnseenNotificationsFailure, getUnseenNotificationsStart, getUnseenNotificationsSuccess, markAsSeenNotificationFailure, markAsSeenNotificationStart, markAsSeenNotificationSuccess} from "./notificationSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";

export function* getUnseenNotifications(action) {
    try {
        const res = yield call(sendAxiosGet, "notification/getUnseenNotifications");
        console.log(res);
        
        if(res && res.data.success){
            const notifications = res.data.data.map((notification) => {
                notification.metadata = JSON.parse(notification.metadata);
                return notification;
            })
            yield put(getUnseenNotificationsSuccess(notifications));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getUnseenNotificationsFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* markAsSeenNotification(action) {
    try {
        const res = yield call(sendAxiosPostJson, "notification/markAsSeen", action.payload);
        if(res && res.data.success){
            yield put(markAsSeenNotificationSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(markAsSeenNotificationFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}


export function* onGetUnseenNotifications() {
    yield takeLatest(getUnseenNotificationsStart, getUnseenNotifications);
}

export function* onMarkAsSeenNotification() {
    yield takeLatest(markAsSeenNotificationStart, markAsSeenNotification);
}

export function* notificationSaga() {
    yield all([
        call(onGetUnseenNotifications),
        call(onMarkAsSeenNotification),
    ])
}
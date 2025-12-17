import { all, call, put, takeLatest } from "redux-saga/effects";
import { getUnseenNotificationsFailure, getUnseenNotificationsStart, getUnseenNotificationsSuccess, markAsSeenNotificationFailure, markAsSeenNotificationStart, markAsSeenNotificationSuccess} from "./notificationSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";
import { SagaIterator } from "redux-saga";
import { Notification } from "./notification.types";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api";
import { PayloadAction } from "@reduxjs/toolkit";

export function* getUnseenNotifications(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Notification[]>> = yield call(sendAxiosGet<Notification[]>, "notification/getUnseenNotifications");
        
        if(res && res.data.success){
            yield put(getUnseenNotificationsSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getUnseenNotificationsFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* markAsSeenNotification(action: PayloadAction<number>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<number>> = yield call(sendAxiosPostJson<number, number>, "notification/markAsSeen", action.payload);
        if(res && res.data.success){
            yield put(markAsSeenNotificationSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(markAsSeenNotificationFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}


export function* onGetUnseenNotifications(): SagaIterator {
    yield takeLatest(getUnseenNotificationsStart.type, getUnseenNotifications);
}

export function* onMarkAsSeenNotification(): SagaIterator {
    yield takeLatest(markAsSeenNotificationStart.type, markAsSeenNotification);
}

export function* notificationSaga(): SagaIterator {
    yield all([
        call(onGetUnseenNotifications),
        call(onMarkAsSeenNotification),
    ])
}
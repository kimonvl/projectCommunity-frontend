import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { fetchActiveChatFailure, fetchActiveChatStart, fetchActiveChatSuccess, sendMessageFailure, sendMessageStart, sendMessageSuccess } from "./chatSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";
import { selectCurrentUserId } from "../auth/auth.selector";
import { selectActiveChatId } from "./chat.selector";

export function* fetchActiveChat(action) {
    try {
        const res = yield call(sendAxiosGet, `chat/activeChat/${action.payload}`);        
        if(res && res.data.success){
            yield put(fetchActiveChatSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(fetchActiveChatFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* sendMessage(action) {
    try {
        const senderId = yield select(selectCurrentUserId);
        const chatId = 2;//yield select(selectActiveChatId);
        
        const res = yield call(sendAxiosPostJson, `chat/sendMessage`, {...action.payload, senderId, chatId });    
        if(res && res.data.success){
            yield put(sendMessageSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(sendMessageFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onFetchActiveChat() {
    yield takeLatest(fetchActiveChatStart, fetchActiveChat);
}

export function* onSendMessage() {
    yield takeLatest(sendMessageStart, sendMessage);
}

export function* chatSaga() {
    yield all([
        call(onFetchActiveChat),
        call(onSendMessage),
    ])
}
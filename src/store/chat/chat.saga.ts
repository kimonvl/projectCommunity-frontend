import { all, call, put, select, take, takeLatest } from "redux-saga/effects";
import { fetchActiveChatFailure, fetchActiveChatStart, fetchActiveChatSuccess, sendMessageFailure, sendMessageStart, sendMessageSuccess } from "./chatSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";
import { SagaIterator } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api";
import { Chat, Message } from "./chat.types";
import { SendMessageRequest } from "@/types/requests/chat";

export function* fetchActiveChat(action: PayloadAction<number>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Chat>> = yield call(sendAxiosGet<Chat>, `chat/activeChat/${action.payload}`);        
        if(res && res.data.success){
            yield put(fetchActiveChatSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(fetchActiveChatFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* sendMessage(action: PayloadAction<SendMessageRequest>): SagaIterator {
    try {
        // fix the inconcistancy backend sends created message, front end recieves the message from ws from topic
        const res: AxiosResponse<ApiResponse<Message>> = yield call(sendAxiosPostJson<Message, SendMessageRequest>, `chat/sendMessage`, action.payload);    
        if(res && res.data.success){
            yield put(sendMessageSuccess());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(sendMessageFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onFetchActiveChat(): SagaIterator {
    yield takeLatest(fetchActiveChatStart.type, fetchActiveChat);
}

export function* onSendMessage(): SagaIterator {
    yield takeLatest(sendMessageStart.type, sendMessage);
}

export function* chatSaga(): SagaIterator {
    yield all([
        call(onFetchActiveChat),
        call(onSendMessage),
    ])
}
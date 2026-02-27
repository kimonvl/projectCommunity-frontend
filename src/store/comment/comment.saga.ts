import { all, call, put, takeLatest } from "redux-saga/effects";
import { createCommentFailure, createCommentStart, createCommentSuccess, getIssueCommentsFailure, getIssueCommentsStart, getIssueCommentsSuccess } from "./commentSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";
import { SagaIterator } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "./comment.types";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api";
import { CreateCommentRequest } from "@/types/requests/comment";

export function* getIssueComments(action: PayloadAction<number>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Comment[]>> = yield call(sendAxiosGet<Comment[]>, `comment/getIssueComments/${action.payload}`);
        console.log(res);
        
        if(res && res.data.success){
            yield put(getIssueCommentsSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getIssueCommentsFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* createComment(action: PayloadAction<CreateCommentRequest>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Comment>> = yield call(sendAxiosPostJson<Comment, CreateCommentRequest>, "comment/create", action.payload);
        console.log(res);
        if(res && res.data.success){
            yield put(createCommentSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(createCommentFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onGetIssueComments(): SagaIterator {
    yield takeLatest(getIssueCommentsStart.type, getIssueComments);
}

export function* onCreateComment(): SagaIterator {
    yield takeLatest(createCommentStart.type, createComment);
}

export function* commentSaga(): SagaIterator {
    yield all([
        call(onGetIssueComments),
        call(onCreateComment),
    ]);
}
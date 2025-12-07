import { all, call, put, takeLatest } from "redux-saga/effects";
import { createCommentFailure, createCommentStart, createCommentSuccess, getIssueCommentsFailure, getIssueCommentsStart, getIssueCommentsSuccess } from "./commentSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";

export function* getIssueComments(action) {
    try {
        const res = yield call(sendAxiosGet, `comment/getIssueComments/${action.payload}`);
        console.log(res);
        
        if(res && res.data.success){
            yield put(getIssueCommentsSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getIssueCommentsFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* createComment(action) {
    try {
        const res = yield call(sendAxiosPostJson, "comment/create", action.payload);
        console.log(res);
        if(res && res.data.success){
            yield put(createCommentSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(createCommentFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onGetIssueComments() {
    yield takeLatest(getIssueCommentsStart, getIssueComments);
}

export function* onCreateComment() {
    yield takeLatest(createCommentStart, createComment);
}

export function* commentSaga() {
    yield all([
        call(onGetIssueComments),
        call(onCreateComment),
    ]);
}
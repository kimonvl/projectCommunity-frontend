import { all, call, put, takeLatest } from "redux-saga/effects";
import { getSearchUsersFailure, getSearchUsersStart, getSearchUsersSuccess } from "./userSlice";
import { toast } from "sonner";
import { sendAxiosGet } from "@/utils/axios.utils";

export function* getSearchUsers(action) {
    try {
        const res = yield call(sendAxiosGet, `user/search?emailQuery=${action.payload.emailQuery}&projectId=${action.payload.projectId}`);
        if(res && res.data.success){
            yield put(getSearchUsersSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getSearchUsersFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* OnGetSearchUsers() {
    yield takeLatest(getSearchUsersStart, getSearchUsers);
}

export function* userSaga() {
    yield all([
        call(OnGetSearchUsers),
    ]);
}
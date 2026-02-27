import { all, call, put, takeLatest } from "redux-saga/effects";
import { getSearchUsersFailure, getSearchUsersStart, getSearchUsersSuccess } from "./userSlice";
import { toast } from "sonner";
import { sendAxiosGet } from "@/utils/axios.utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { SearchUsersRequest } from "@/types/requests/user";
import { User } from "../auth/auth.types";
import { SagaIterator } from "redux-saga";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api";

export function* getSearchUsers(action: PayloadAction<SearchUsersRequest>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<User[]>> = yield call(sendAxiosGet<User[]>, `user/search?emailQuery=${action.payload.emailQuery}&projectId=${action.payload.projectId}`);
        if(res && res.data.success){
            yield put(getSearchUsersSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getSearchUsersFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* OnGetSearchUsers(): SagaIterator {
    yield takeLatest(getSearchUsersStart.type, getSearchUsers);
}

export function* userSaga(): SagaIterator {
    yield all([
        call(OnGetSearchUsers),
    ]);
}
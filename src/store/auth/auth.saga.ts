import {all, call, put, takeLatest} from "redux-saga/effects";
import { isAuthenticatedFailure, isAuthenticatedStart, isAuthenticatedSuccess, loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, signUpFailure, signUpStart, signUpSuccess } from "./authSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";
import { connectWebsocketStart } from "../websocket/websocketSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, SignUpPayload, User } from "./auth.types";
import { SagaIterator } from "redux-saga";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api";

export function* signUp(action: PayloadAction<SignUpPayload>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<User>> = yield call(sendAxiosPostJson<User, SignUpPayload>, "register", action.payload)
        if(res && res.data.success){
            yield put(signUpSuccess());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(signUpFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* login(action: PayloadAction<LoginPayload>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<User>> = yield call(sendAxiosPostJson<User, LoginPayload>, "login", action.payload)        
        if(res && res.data.success){
            yield put(loginSuccess(res.data.data));
            yield put(connectWebsocketStart());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Login Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "Login failed";
        const errorStatus = error.response?.status || 500;

        yield put(loginFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* logout(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<void>> = yield call(sendAxiosPostJson<void, void>, "log-out")
        if(res && res.data.success){
            yield put(logoutSuccess());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Login Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(logoutFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* isAuthenticated(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<User>> = yield call(sendAxiosGet<User>, "isAuthenticated")
        if(res && res.data.success){
            yield put(isAuthenticatedSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Login Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(isAuthenticatedFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onSignUpStart(): SagaIterator {
    yield takeLatest(signUpStart.type, signUp);
}

export function* onLoginStart(): SagaIterator {
    yield takeLatest(loginStart.type, login);
}

export function* onLogoutStart(): SagaIterator {
    yield takeLatest(logoutStart.type, logout);
}

export function* onIsAuthenticatedStart(): SagaIterator {
    yield takeLatest(isAuthenticatedStart.type, isAuthenticated);
}

export function* authSaga(): SagaIterator {
    yield all([
        call(onSignUpStart),
        call(onLoginStart),
        call(onLogoutStart),
        call(onIsAuthenticatedStart),
    ]);
}
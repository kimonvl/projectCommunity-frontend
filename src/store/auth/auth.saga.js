import {all, call, put, takeLatest} from "redux-saga/effects";
import { isAuthenticatedFailure, isAuthenticatedStart, isAuthenticatedSuccess, loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, signUpFailure, signUpStart, signUpSuccess } from "./authSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";
import { connectWebsocketStart } from "../websocket/websocketSlice";

export function* signUp(action) {
    try {
        const res = yield call(sendAxiosPostJson, "register", action.payload)
        if(res && res.data.success){
            yield put(signUpSuccess());
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(signUpFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* login(action) {
    try {
        const res = yield call(sendAxiosPostJson, "login", action.payload)        
        if(res && res.data.success){
            yield put(loginSuccess(res.data.data));
            yield put(connectWebsocketStart());
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Login Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "Login failed";
        const errorStatus = error.response?.status || 500;

        yield put(loginFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* logout(action) {
    try {
        const res = yield call(sendAxiosPostJson, "log-out", null)
        if(res && res.data.success){
            yield put(logoutSuccess());
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Login Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(logoutFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* isAuthenticated(action) {
    try {
        const res = yield call(sendAxiosGet, "isAuthenticated")
        if(res && res.data.success){
            yield put(isAuthenticatedSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Login Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(isAuthenticatedFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onSignUpStart() {
    yield takeLatest(signUpStart, signUp);
}

export function* onLoginStart() {
    yield takeLatest(loginStart, login);
}

export function* onLogoutStart() {
    yield takeLatest(logoutStart, logout);
}

export function* onIsAuthenticatedStart() {
    yield takeLatest(isAuthenticatedStart, isAuthenticated);
}

export function* authSaga() {
    yield all([
        call(onSignUpStart),
        call(onLoginStart),
        call(onLogoutStart),
        call(onIsAuthenticatedStart),
    ]);
}
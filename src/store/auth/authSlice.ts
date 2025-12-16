import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthError, AuthState, User } from "./auth.types";

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state) => {
            state.loading = false;
        },
        signUpFailure: (state, action: PayloadAction<AuthError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action: PayloadAction<AuthError>) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logoutStart: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        logoutFailure: (state, action: PayloadAction<AuthError>) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        isAuthenticatedStart: (state) => {
            state.loading = true;
        },
        isAuthenticatedSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        isAuthenticatedFailure: (state, action: PayloadAction<AuthError>) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
    }
});

export const {
    signUpStart,
    signUpSuccess,
    signUpFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    isAuthenticatedStart,
    isAuthenticatedSuccess,
    isAuthenticatedFailure,
} = authSlice.actions;

export default authSlice.reducer;
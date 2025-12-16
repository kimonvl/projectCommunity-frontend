import { createSelector } from "reselect";
import { RootState } from "../store";

const selectAuthReducer = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.user
);

export const selectCurrentUserId = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.user?.id ?? null
);
export const selectCurrentUserEmail = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.user?.email ?? null
);

export const selectIsAuthenticated = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.isAuthenticated
);

export const selectLoading = createSelector(
    [selectAuthReducer],
    (authSlice) => authSlice.loading
);

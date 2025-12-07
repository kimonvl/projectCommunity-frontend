import { createSelector } from "reselect";

const selectAuthReducer = (state) => state.auth;

export const selectCurrentUser = createSelector(
    [selectAuthReducer],
    (userSlice) => userSlice.user
);

export const selectCurrentUserId = createSelector(
    [selectAuthReducer],
    (userSlice) => userSlice.user.id
);
export const selectCurrentUserEmail = createSelector(
    [selectAuthReducer],
    (userSlice) => userSlice.user.email
);

export const selectIsAuthenticated = createSelector(
    [selectAuthReducer],
    (userSlice) => userSlice.isAuthenticated
);

export const selectLoading = createSelector(
    [selectAuthReducer],
    (userSlice) => userSlice.loading
);

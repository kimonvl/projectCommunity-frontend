import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectSearchUsers = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.searchUsers
);

export const selectUserLoading = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.loading
);

import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.types";

const selectUserReducer = (state: RootState): UserState => state.user;

export const selectSearchUsers = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.searchUsers
);

export const selectUserLoading = createSelector(
    [selectUserReducer],
    (userSlice) => userSlice.loading
);

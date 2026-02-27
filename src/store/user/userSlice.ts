import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserError, UserState } from "./user.types";
import { User } from "../auth/auth.types";
import { SearchUsersRequest } from "@/types/requests/user";

const initialState: UserState = {
    searchUsers: [],
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getSearchUsersStart: (state, _action: PayloadAction<SearchUsersRequest>) => {
            state.loading = true;
        },
        getSearchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.searchUsers = action.payload;
            state.loading = false;
        },
        getSearchUsersFailure: (state, action: PayloadAction<UserError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearSearchUsers: (state) => {
            state.searchUsers = [];
        },
    }
});

const userReducer = userSlice.reducer;
export const {
    getSearchUsersStart,
    getSearchUsersSuccess,
    getSearchUsersFailure,
    clearSearchUsers,
} = userSlice.actions;

export default userReducer;
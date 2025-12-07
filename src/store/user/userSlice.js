import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchUsers: [],
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getSearchUsersStart: (state) => {
            state.loading = true;
        },
        getSearchUsersSuccess: (state, action) => {
            state.searchUsers = action.payload;
            state.loading = false;
        },
        getSearchUsersFailure: (state, action) => {
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
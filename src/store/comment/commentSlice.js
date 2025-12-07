import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedIssueComments: [],
    loading: false,
    error: null,
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        getIssueCommentsStart: (state) => {
            state.loading = true;
        },
        getIssueCommentsSuccess: (state, action) => {
            state.selectedIssueComments = action.payload;
            state.loading = false;
        },
        getIssueCommentsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        createCommentStart: (state) => {
            state.loading = true;
        },
        createCommentSuccess: (state, action) => {
            state.selectedIssueComments = [...state.selectedIssueComments, action.payload];
            state.loading = false;
        },
        createCommentFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

const commentReducer = commentSlice.reducer;
export const {
    getIssueCommentsStart,
    getIssueCommentsSuccess,
    getIssueCommentsFailure,
    createCommentStart,
    createCommentSuccess,
    createCommentFailure,
} = commentSlice.actions;

export default commentReducer;
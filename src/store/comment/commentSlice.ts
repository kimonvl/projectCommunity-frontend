import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, CommentError, CommentState } from "./comment.types";
import { CreateCommentRequest } from "@/types/requests/comment";

const initialState: CommentState = {
    selectedIssueComments: [],
    loading: false,
    error: null,
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        getIssueCommentsStart: (state, _action: PayloadAction<number>) => {
            state.loading = true;
        },
        getIssueCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
            state.selectedIssueComments = action.payload;
            state.loading = false;
        },
        getIssueCommentsFailure: (state, action: PayloadAction<CommentError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        createCommentStart: (state, _action: PayloadAction<CreateCommentRequest>) => {
            state.loading = true;
        },
        createCommentSuccess: (state, action: PayloadAction<Comment>) => {
            state.selectedIssueComments = [...state.selectedIssueComments, action.payload];
            state.loading = false;
        },
        createCommentFailure: (state, action: PayloadAction<CommentError>) => {
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
import { createSelector } from "reselect";
import { RootState } from "../store";
import { CommentState } from "./comment.types";

const selectCommentReducer = (state: RootState): CommentState => state.comment;

export const selectSelectedIssueComments = createSelector(
    [selectCommentReducer],
    (commentSlice) => commentSlice.selectedIssueComments
);

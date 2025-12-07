import { createSelector } from "reselect";

const selectCommentReducer = (state) => state.comment;

export const selectSelectedIssueComments = createSelector(
    [selectCommentReducer],
    (commentSlice) => commentSlice.selectedIssueComments
);

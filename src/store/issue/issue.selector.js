import { createSelector } from "reselect";

const selectIssueReducer = (state) => state.issue;
const selectProjectIssues = (state) => state.issue.selectedProjectIssues;

export const selectSelectedProjectIssues = createSelector(
    [selectProjectIssues],
    (projectIssues) => {
        return {
            pending: projectIssues?.filter(i => i.status === "PENDING"),
            inProgress: projectIssues?.filter(i => i.status === "IN_PROGRESS"),
            done: projectIssues?.filter(i => i.status === "DONE"),
        }
    }
);

export const selectSelectedIssue = createSelector(
    [selectIssueReducer],
    (issueSlice) => issueSlice.selectedIssue
);

export const selectIssueById = (issueId) =>
    createSelector(
        [selectProjectIssues],
        (issues) => issues?.find(i => i.id === Number(issueId))
    );   
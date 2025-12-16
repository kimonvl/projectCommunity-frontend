import { createSelector } from "reselect";
import { RootState } from "../store";
import { Issue, IssueState } from "./issue.types";

const selectIssueReducer = (state: RootState): IssueState => state.issue;
const selectProjectIssues = (state: RootState): Issue[] => state.issue.selectedProjectIssues;

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

export const selectIssueById = (issueId: number) =>
    createSelector(
        [selectProjectIssues],
        (issues) => issues?.find(i => i.id === Number(issueId))
    );   
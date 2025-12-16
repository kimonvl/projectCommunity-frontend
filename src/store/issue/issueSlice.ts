import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Issue, IssueError, IssueState } from "./issue.types";

const initialState: IssueState = {
    selectedProjectIssues: [],
    selectedIssue: null,
    loading: false,
    error: null,
};

export const issueSlice = createSlice({
    name: 'issue',
    initialState,
    reducers: {
        createIssueStart: (state) => {
            state.loading = true;
        },
        createIssueSuccess: (state, action: PayloadAction<Issue>) => {
            state.selectedProjectIssues = [...state.selectedProjectIssues, action.payload];
            state.loading = false;
        },
        createIssueFailure: (state, action: PayloadAction<IssueError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        getProjectIssuesStart: (state) => {
            state.loading = true;
        },
        getProjectIssuesSuccess: (state, action: PayloadAction<Issue[]>) => {
            state.selectedProjectIssues = action.payload;
            state.loading = false;
        },
        getProjectIssuesFailure: (state, action: PayloadAction<IssueError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        assignUserToIssueStart: (state) => {
            state.loading = true;
        },
        assignUserToIssueSuccess: (state, action: PayloadAction<Issue>) => {
            state.selectedProjectIssues = state.selectedProjectIssues.map((issue) => {
                if (issue.id == action.payload.id) {
                    return action.payload;
                }
                return issue;
            });
            state.loading = false;
        },
        assignUserToIssueFailure: (state, action: PayloadAction<IssueError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        changeIssueStatusStart: (state) => {
            state.loading = true;
        },
        changeIssueStatusSuccess: (state, action: PayloadAction<Issue>) => {
            const updated = action.payload;

            // update list
            state.selectedProjectIssues = state.selectedProjectIssues.map((issue) =>
                issue.id === updated.id ? updated : issue
            );

            // update selectedIssue if it's the same one
            if (state.selectedIssue?.id === updated.id) {
                state.selectedIssue = updated;
            }

            state.loading = false;
        },

        changeIssueStatusFailure: (state, action: PayloadAction<IssueError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        getSelectedIssueStart: (state) => {
            state.loading = true;
        },
        getSelectedIssueSuccess: (state, action: PayloadAction<Issue>) => {
            state.selectedIssue = action.payload;
            state.loading = false;
        },
        getSelectedIssueFailure: (state, action: PayloadAction<IssueError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        getNewCreatedIssueStart: (state) => {
            state.loading = true;
        },
        getNewCreatedIssueSuccess: (state, action: PayloadAction<Issue>) => {
            state.selectedProjectIssues = [...state.selectedProjectIssues, action.payload];
            state.loading = false;
        },
        getNewCreatedIssueFailure: (state, action: PayloadAction<IssueError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteIssueStart: (state) => {
            state.loading = true;
        },
        deleteIssueSuccess: (state, action: PayloadAction<number>) => {
            state.selectedProjectIssues = state.selectedProjectIssues.filter((issue) => issue.id != action.payload);
            state.loading = false;
        },
        deleteIssueFailure: (state, action: PayloadAction<IssueError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearSelectedIssue: (state) => {
            state.selectedIssue = null;
        }
    }
});

const issueReducer = issueSlice.reducer;
export const {
    createIssueStart,
    createIssueSuccess,
    createIssueFailure,
    getProjectIssuesStart,
    getProjectIssuesSuccess,
    getProjectIssuesFailure,
    assignUserToIssueStart,
    assignUserToIssueSuccess,
    assignUserToIssueFailure,
    changeIssueStatusStart,
    changeIssueStatusSuccess,
    changeIssueStatusFailure,
    getSelectedIssueStart,
    getSelectedIssueSuccess,
    getSelectedIssueFailure,
    getNewCreatedIssueStart,
    getNewCreatedIssueSuccess,
    getNewCreatedIssueFailure,
    deleteIssueStart,
    deleteIssueSuccess,
    deleteIssueFailure,
    clearSelectedIssue,
} = issueSlice.actions;

export default issueReducer;
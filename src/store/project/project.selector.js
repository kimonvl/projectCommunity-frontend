import { createSelector } from "reselect";

const selectProjectReducer = (state) => state.project;

export const selectMyProjects = createSelector(
    [selectProjectReducer],
    (projectSlice) => projectSlice.myProjects
);

export const selectSelectedProject = createSelector(
    [selectProjectReducer],
    (projectSlice) => projectSlice.selectedProject
);

export const selectSelectedProjectId = createSelector(
    [selectProjectReducer],
    (projectSlice) => projectSlice.selectedProject.id
);

export const selectProjectLoading = createSelector(
    [selectProjectReducer],
    (projectSlice) => projectSlice.loading
);

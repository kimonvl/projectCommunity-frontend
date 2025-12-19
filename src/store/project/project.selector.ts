import { createSelector } from "reselect";
import { RootState } from "../store";
import { ProjectState } from "./project.types";

const selectProjectReducer = (state: RootState): ProjectState => state.project;

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
    (projectSlice) => projectSlice.selectedProject?.id ?? null
);

export const selectProjectLoading = createSelector(
    [selectProjectReducer],
    (projectSlice) => projectSlice.loading
);

export const selectCreateProjectLoading = createSelector(
    [selectProjectReducer],
    (projectSlice) => projectSlice.createProjectLoading
);

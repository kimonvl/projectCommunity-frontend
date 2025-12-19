import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Project, ProjectError, ProjectState } from "./project.types";

const initialState: ProjectState = {
    myProjects: [],
    selectedProject: null,
    createProjectLoading: false,
    loading: false,
    error: null,
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        createProjectStart: (state) => {
            state.loading = true;
            state.createProjectLoading = true;
        },
        createProjectSuccess: (state, action: PayloadAction<Project>) => {
            state.myProjects = [...state.myProjects, action.payload];
            state.loading = false;
            state.createProjectLoading = false;
        },
        createProjectFailure: (state, action: PayloadAction<ProjectError>) => {
            state.error = action.payload;
            state.loading = false;
            state.createProjectLoading = false;
        },
        getMyProjectsStart: (state) => {
            state.loading = true;
        },
        getMyProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
            state.myProjects = action.payload;
            state.loading = false;
        },
        getMyProjectsFailure: (state, action: PayloadAction<ProjectError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        getSelectedProjectStart: (state) => {
            state.loading = true;
        },
        getSelectedProjectSuccess: (state, action: PayloadAction<Project>) => {
            state.selectedProject = action.payload;
            state.loading = false;
        },
        getSelectedProjectFailure: (state, action: PayloadAction<ProjectError>) => {
            state.error = action.payload;
            state.selectedProject = null;
            state.loading = false;
        },
        sendProjectInvitationStart: (state) => {
            state.loading = true;
        },
        sendProjectInvitationSuccess: (state) => {
            state.loading = false;
        },
        sendProjectInvitationFailure: (state, action: PayloadAction<ProjectError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        acceptProjectInvitationStart: (state) => {
            state.loading = true;
        },
        acceptProjectInvitationSuccess: (state, action: PayloadAction<Project>) => {
            state.myProjects = [...state.myProjects, action.payload];
            state.loading = false;
        },
        acceptProjectInvitationFailure: (state, action: PayloadAction<ProjectError>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearSelectedProject: (state) => {
            state.selectedProject = null;
        }
    }
});

const projectReducer = projectSlice.reducer;
export const {
    createProjectStart,
    createProjectSuccess,
    createProjectFailure,
    getMyProjectsStart,
    getMyProjectsSuccess,
    getMyProjectsFailure,
    getSelectedProjectStart,
    getSelectedProjectSuccess,
    getSelectedProjectFailure,
    sendProjectInvitationStart,
    sendProjectInvitationSuccess,
    sendProjectInvitationFailure,
    acceptProjectInvitationStart,
    acceptProjectInvitationSuccess,
    acceptProjectInvitationFailure,
    clearSelectedProject,
} = projectSlice.actions;

export default projectReducer;
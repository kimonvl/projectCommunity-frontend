import { createSlice } from "@reduxjs/toolkit"
import { authSlice } from "../auth/authSlice";

const initialState = {
    myProjects: [],
    selectedProject: null,
    loading: false,
    error: null,
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        createProjectStart: (state) => {
            state.loading = true;
        },
        createProjectSuccess: (state, action) => {
            state.myProjects = [...state.myProjects, action.payload];
            state.loading = false;
        },
        createProjectFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getMyProjectsStart: (state) => {
            state.loading = true;
        },
        getMyProjectsSuccess: (state, action) => {
            state.myProjects = action.payload;
            state.loading = false;
        },
        getMyProjectsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        getSelectedProjectStart: (state) => {
            state.loading = true;
        },
        getSelectedProjectSuccess: (state, action) => {
            state.selectedProject = action.payload;
            state.loading = false;
        },
        getSelectedProjectFailure: (state, action) => {
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
        sendProjectInvitationFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        acceptProjectInvitationStart: (state) => {
            state.loading = true;
        },
        acceptProjectInvitationSuccess: (state, action) => {
            state.myProjects = [...state.myProjects, action.payload];
            state.loading = false;
        },
        acceptProjectInvitationFailure: (state, action) => {
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
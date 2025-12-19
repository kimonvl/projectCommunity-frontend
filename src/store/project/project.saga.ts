import { all, call, put, takeLatest } from "redux-saga/effects";
import { acceptProjectInvitationFailure, acceptProjectInvitationStart, acceptProjectInvitationSuccess, createProjectFailure, createProjectStart, createProjectSuccess, getMyProjectsFailure, getMyProjectsStart, getMyProjectsSuccess, getSelectedProjectFailure, getSelectedProjectStart, getSelectedProjectSuccess, sendProjectInvitationFailure, sendProjectInvitationStart, sendProjectInvitationSuccess } from "./projectSlice";
import { toast } from "sonner";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { removeNotification } from "../notification/notificationSlice";
import { SagaIterator } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { AcceptProjectInvitationRequest, CreateProjectRequest, ProjectInvitationRequest } from "@/types/requests/project";
import { Project } from "./project.types";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api";

export function* creatProject(action: PayloadAction<CreateProjectRequest>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Project>> = yield call(sendAxiosPostJson<Project, CreateProjectRequest>, "project/create", action.payload);
        if (res && res.data.success) {
            yield put(createProjectSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(createProjectFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getMyProjects(): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Project[]>> = yield call(sendAxiosGet<Project[]>, "project/myProjects");
        if (res && res.data.success) {
            yield put(getMyProjectsSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getMyProjectsFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getSelectedProject(action: PayloadAction<number>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Project>> = yield call(sendAxiosGet<Project>, `project/selectedProject/${action.payload}`);
        if (res && res.data.success) {
            yield put(getSelectedProjectSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getSelectedProjectFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* sendProjectInvitation(action: PayloadAction<ProjectInvitationRequest>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<void>> = yield call(sendAxiosPostJson<void, ProjectInvitationRequest>, "project/sendProjectInvitation", action.payload);        
        if(res && res.data.success){
            yield put(sendProjectInvitationSuccess());
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(sendProjectInvitationFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* acceptProjectInvitation(action: PayloadAction<AcceptProjectInvitationRequest>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Project>> = yield call(sendAxiosPostJson<Project, AcceptProjectInvitationRequest>, `project/acceptInvitation`, action.payload);
        if (res && res.data.success) {
            yield put(acceptProjectInvitationSuccess(res.data.data));
            yield put(removeNotification(action.payload.notificationId));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(acceptProjectInvitationFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onCreateProject(): SagaIterator {
    yield takeLatest(createProjectStart.type, creatProject);
}

export function* onGetMyProjects(): SagaIterator {
    yield takeLatest(getMyProjectsStart.type, getMyProjects);
}

export function* onGetSelectedProject(): SagaIterator {
    yield takeLatest(getSelectedProjectStart.type, getSelectedProject);
}

export function* onSendProjectInvitation(): SagaIterator {
    yield takeLatest(sendProjectInvitationStart.type, sendProjectInvitation);
}

export function* onAcceptProjectInvitation(): SagaIterator {
    yield takeLatest(acceptProjectInvitationStart.type, acceptProjectInvitation);
}

export function* projectSaga(): SagaIterator {
    yield all([
        call(onCreateProject),
        call(onGetMyProjects),
        call(onGetSelectedProject),
        call(onSendProjectInvitation),
        call(onAcceptProjectInvitation),
    ])
}
import { all, call, put, takeLatest } from "redux-saga/effects";
import { acceptProjectInvitationFailure, acceptProjectInvitationStart, acceptProjectInvitationSuccess, createProjectFailure, createProjectStart, createProjectSuccess, getMyProjectsFailure, getMyProjectsStart, getMyProjectsSuccess, getSelectedProjectFailure, getSelectedProjectStart, getSelectedProjectSuccess, sendProjectInvitationFailure, sendProjectInvitationStart, sendProjectInvitationSuccess } from "./projectSlice";
import { toast } from "sonner";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { removeNotification } from "../notification/notificationSlice";

export function* creatProject(action) {
    try {
        const { title, description, category, tags, setOpen } = action.payload;
        const res = yield call(sendAxiosPostJson, "project/create", { title, description, category, tags });
        if (res && res.data.success) {
            yield put(createProjectSuccess(res.data.data));
            toast.success(res.data.message);
            setOpen(false);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(createProjectFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getMyProjects(action) {
    try {
        const res = yield call(sendAxiosGet, "project/myProjects");
        if (res && res.data.success) {
            yield put(getMyProjectsSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getMyProjectsFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getSelectedProject(action) {
    try {
        const res = yield call(sendAxiosGet, `project/selectedProject/${action.payload}`);
        if (res && res.data.success) {
            yield put(getSelectedProjectSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getSelectedProjectFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* sendProjectInvitation(action) {
    try {
        const res = yield call(sendAxiosPostJson, "project/sendProjectInvitation", action.payload);
        console.log(res);
        
        if(res && res.data.success){
            yield put(sendProjectInvitationSuccess());
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(sendProjectInvitationFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* acceptProjectInvitation(action) {
    try {
        const res = yield call(sendAxiosPostJson, `project/acceptInvitation`, action.payload);
        if (res && res.data.success) {
            yield put(acceptProjectInvitationSuccess(res.data.data));
            yield put(removeNotification(action.payload.notificationId));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(acceptProjectInvitationFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onCreateProject() {
    yield takeLatest(createProjectStart, creatProject);
}

export function* onGetMyProjects() {
    yield takeLatest(getMyProjectsStart, getMyProjects);
}

export function* onGetSelectedProject() {
    yield takeLatest(getSelectedProjectStart, getSelectedProject);
}

export function* onSendProjectInvitation() {
    yield takeLatest(sendProjectInvitationStart, sendProjectInvitation);
}

export function* onAcceptProjectInvitation() {
    yield takeLatest(acceptProjectInvitationStart, acceptProjectInvitation);
}

export function* projectSaga() {
    yield all([
        call(onCreateProject),
        call(onGetMyProjects),
        call(onGetSelectedProject),
        call(onSendProjectInvitation),
        call(onAcceptProjectInvitation),
    ])
}
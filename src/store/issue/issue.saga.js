import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { assignUserToIssueFailure, assignUserToIssueStart, assignUserToIssueSuccess, changeIssueStatusFailure, changeIssueStatusStart, changeIssueStatusSuccess, createIssueFailure, createIssueStart, createIssueSuccess, deleteIssueFailure, deleteIssueStart, deleteIssueSuccess, getNewCreatedIssueFailure, getNewCreatedIssueStart, getNewCreatedIssueSuccess, getProjectIssuesFailure, getProjectIssuesStart, getProjectIssuesSuccess, getSelectedIssueFailure, getSelectedIssueStart, getSelectedIssueSuccess } from "./issueSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";
import { selectIssueById, selectSelectedIssue } from "./issue.selector";
import { selectActiveChatId } from "../chat/chat.selector";
import { selectSelectedProjectId } from "../project/project.selector";

export function* createIssue(action) {
    try {
        const res = yield call(sendAxiosPostJson, `issue/create`, action.payload);
        if(res && res.data.success){
            yield put(createIssueSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(createIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getProjectIssues(action) {
    try {
        const res = yield call(sendAxiosGet, `issue/getProjectIssues/${action.payload}`);
        if(res && res.data.success){
            yield put(getProjectIssuesSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getProjectIssuesFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* assignUserToIssue(action) {
    try {
        const res = yield call(sendAxiosPostJson, `issue/assignUser`, action.payload);
        if(res && res.data.success){
            const result = {
                assignedUser: res.data.data,
                issueId: action.payload.issueId,
            }
            yield put(assignUserToIssueSuccess(result));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(assignUserToIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* changeIssueStatus(action) {
    try {
        const res = yield call(sendAxiosPostJson, `issue/changeStatus`, action.payload);
        if(res && res.data.success){
            yield put(changeIssueStatusSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(changeIssueStatusFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getSelectedIssue(action) {
    try {
        const issue = yield select(selectIssueById(action.payload));
        if (issue == null) {
            const res = yield call(sendAxiosGet, `issue/getIssueDetails/${action.payload}`);
            console.log("issue from fetch", res);
            if(res && res.data.success){
                yield put(getSelectedIssueSuccess(res.data.data));
                toast.success(res.data.message);
            }
        }else {
            console.log("issue from state", issue);
            
            yield put(getSelectedIssueSuccess(issue));
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getSelectedIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getNewCreatedIssue(action) {
    try {
        const res = yield call(sendAxiosGet, `issue/getIssueDetails/${action.payload}`, action.payload);
        if(res && res.data.success){
            yield put(getNewCreatedIssueSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getNewCreatedIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* deleteIssue(action) {
    try {
        const res = yield call(sendAxiosPostJson, `issue/delete`, action.payload.issueId);
        if(res && res.data.success){
            const selectedIssue = yield select(selectSelectedIssue);
            action.payload.navigate(`/projectDetails/${selectedIssue.projectId}`);
            yield put(deleteIssueSuccess(res.data.data));
            toast.success(res.data.message);
            ;
        }
    } catch (error) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(deleteIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onCreateIssue() {
    yield takeLatest(createIssueStart, createIssue);
}

export function* onGetProjectIssues() {
    yield takeLatest(getProjectIssuesStart, getProjectIssues);
}

export function* onAssignUserToIssue() {
    yield takeLatest(assignUserToIssueStart, assignUserToIssue);
}

export function* onChangeIssueStatus() {
    yield takeLatest(changeIssueStatusStart, changeIssueStatus);
}

export function* onGetSelectedIssue() {
    yield takeLatest(getSelectedIssueStart, getSelectedIssue);
}

export function* onGetNewCreatedIssue() {
    yield takeLatest(getNewCreatedIssueStart, getNewCreatedIssue);
}

export function* onDeleteIssue() {
    yield takeLatest(deleteIssueStart, deleteIssue);
}

export function* issueSaga() {
    yield all([
        call(onCreateIssue),
        call(onGetProjectIssues),
        call(onAssignUserToIssue),
        call(onChangeIssueStatus),
        call(onGetSelectedIssue),
        call(onGetNewCreatedIssue),
        call(onDeleteIssue),
    ]);
}
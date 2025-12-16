import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { assignUserToIssueFailure, assignUserToIssueStart, assignUserToIssueSuccess, changeIssueStatusFailure, changeIssueStatusStart, changeIssueStatusSuccess, createIssueFailure, createIssueStart, createIssueSuccess, deleteIssueFailure, deleteIssueStart, deleteIssueSuccess, getNewCreatedIssueFailure, getNewCreatedIssueStart, getNewCreatedIssueSuccess, getProjectIssuesFailure, getProjectIssuesStart, getProjectIssuesSuccess, getSelectedIssueFailure, getSelectedIssueStart, getSelectedIssueSuccess } from "./issueSlice";
import { sendAxiosGet, sendAxiosPostJson } from "@/utils/axios.utils";
import { toast } from "sonner";
import { selectIssueById, selectSelectedIssue } from "./issue.selector";
import { SagaIterator } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { AssignUserToIssueRequest, ChangeIssueStatusRequest, CreateIssueRequest, DeleteIssuePayload } from "@/types/requests/issue";
import { Issue } from "./issue.types";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/types/api";

export function* createIssue(action: PayloadAction<CreateIssueRequest>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Issue>> = yield call(sendAxiosPostJson<Issue, CreateIssueRequest>, `issue/create`, action.payload);
        if(res && res.data.success){
            yield put(createIssueSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(createIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getProjectIssues(action: PayloadAction<number>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Issue[]>> = yield call(sendAxiosGet<Issue[]>, `issue/getProjectIssues/${action.payload}`);
        if(res && res.data.success){
            yield put(getProjectIssuesSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getProjectIssuesFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* assignUserToIssue(action: PayloadAction<AssignUserToIssueRequest>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Issue>> = yield call(sendAxiosPostJson<Issue, AssignUserToIssueRequest>, `issue/assignUser`, action.payload);
        if(res && res.data.success){
            yield put(assignUserToIssueSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(assignUserToIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* changeIssueStatus(action: PayloadAction<ChangeIssueStatusRequest>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Issue>> = yield call(sendAxiosPostJson<Issue, ChangeIssueStatusRequest>, `issue/changeStatus`, action.payload);
        if(res && res.data.success){
            yield put(changeIssueStatusSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(changeIssueStatusFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getSelectedIssue(action: PayloadAction<number>): SagaIterator {
    try {
        const issue: Issue = yield select(selectIssueById(action.payload));
        if (issue == null) {
            const res: AxiosResponse<ApiResponse<Issue>> = yield call(sendAxiosGet<Issue>, `issue/getIssueDetails/${action.payload}`);
            console.log("issue from fetch", res);
            if(res && res.data.success){
                yield put(getSelectedIssueSuccess(res.data.data));
                toast.success(res.data.message);
            }
        }else {
            console.log("issue from state", issue);
            
            yield put(getSelectedIssueSuccess(issue));
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getSelectedIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* getNewCreatedIssue(action: PayloadAction<number>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<Issue>> = yield call(sendAxiosGet<Issue>, `issue/getIssueDetails/${action.payload}`);
        if(res && res.data.success){
            yield put(getNewCreatedIssueSuccess(res.data.data));
            toast.success(res.data.message);
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(getNewCreatedIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* deleteIssue(action: PayloadAction<DeleteIssuePayload>): SagaIterator {
    try {
        const res: AxiosResponse<ApiResponse<number>> = yield call(sendAxiosPostJson<number, number>, `issue/delete`, action.payload.issueId);
        if(res && res.data.success){
            const selectedIssue = yield select(selectSelectedIssue);
            action.payload.navigate(`/projectDetails/${selectedIssue.projectId}`);
            yield put(deleteIssueSuccess(res.data.data));
            toast.success(res.data.message);
            ;
        }
    } catch (error: any) {
        console.error("Signup Error:", error); // Debugging log

        const errorMessage = error.response?.data?.message || "An error occurred";
        const errorStatus = error.response?.status || 500;

        yield put(deleteIssueFailure({ message: errorMessage, status: errorStatus }));
        toast.error(errorMessage);
    }
}

export function* onCreateIssue(): SagaIterator {
    yield takeLatest(createIssueStart.type, createIssue);
}

export function* onGetProjectIssues(): SagaIterator {
    yield takeLatest(getProjectIssuesStart.type, getProjectIssues);
}

export function* onAssignUserToIssue(): SagaIterator {
    yield takeLatest(assignUserToIssueStart.type, assignUserToIssue);
}

export function* onChangeIssueStatus(): SagaIterator {
    yield takeLatest(changeIssueStatusStart.type, changeIssueStatus);
}

export function* onGetSelectedIssue(): SagaIterator {
    yield takeLatest(getSelectedIssueStart.type, getSelectedIssue);
}

export function* onGetNewCreatedIssue(): SagaIterator {
    yield takeLatest(getNewCreatedIssueStart.type, getNewCreatedIssue);
}

export function* onDeleteIssue(): SagaIterator {
    yield takeLatest(deleteIssueStart.type, deleteIssue);
}

export function* issueSaga(): SagaIterator {
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
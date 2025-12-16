import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth/auth.saga";
import { projectSaga } from "./project/project.saga";
import { chatSaga } from "./chat/chat.saga";
import { notificationSaga } from "./notification/notification.saga";
import { userSaga } from "./user/user.saga";
import { issueSaga } from "./issue/issue.saga";
import { commentSaga } from "./comment/comment.saga";

export function* rootSaga(): Generator {
    yield all([
        fork(authSaga),
        fork(projectSaga),
        fork(chatSaga),
        fork(notificationSaga),
        fork(userSaga),
        fork(issueSaga),
        fork(commentSaga),
    ]);
}
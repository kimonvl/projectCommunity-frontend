import React from 'react'
import ProjectInviteNotification from './ProjectInviteNotification';
import IssueCreatedNotification from './IssueCreatedNotification';

const Notification = ({notification}) => {
    switch (notification.type) {
        case "PROJECT_INVITE":
            return <ProjectInviteNotification notification={notification}/>
        case "ISSUE_CREATED":
            return <IssueCreatedNotification notification={notification}/>
        default:
            return <></>
    }
}

export default Notification

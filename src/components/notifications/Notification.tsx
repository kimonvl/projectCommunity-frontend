import ProjectInviteNotification from './ProjectInviteNotification';
import IssueCreatedNotification from './IssueCreatedNotification';
import { Notification as NotificationType} from '@/store/notification/notification.types';

interface NotificationProps {
    notification: NotificationType;
}

const Notification = ({notification}: NotificationProps) => {
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

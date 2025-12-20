import { Button } from "@/components/ui/button";
import { Notification } from "@/store/notification/notification.types";
import { acceptProjectInvitationStart } from "@/store/project/projectSlice";
import { useDispatch } from "react-redux";

interface ProjectInviteNotificationProps {
    notification: Notification;
}

export default function ProjectInviteNotification({ notification }: ProjectInviteNotificationProps) {
    const dispatch = useDispatch();

    if (notification.metadata?.type !== "PROJECT_INVITE") {
        return;
    }
    
    const acceptProjectInvitation = () => {
        if (notification.metadata?.type === "PROJECT_INVITE"){
            dispatch(acceptProjectInvitationStart({
                projectId: notification.metadata?.projectId, 
                notificationId: notification.id
            }));
        }
    };

    return (
        <div className="p-3 rounded-md bg-neutral-800 border border-neutral-700 space-y-2">
            {/* Main message */}
            <p className="text-sm font-semibold">
                {notification.message}
            </p>

            {/* Project title */}
            <p className="text-xs text-neutral-400">
                Project: <span className="font-semibold">{notification.metadata?.projectTitle}</span>
            </p>

            {/* Accept / decline buttons */}
            <div className="flex justify-end gap-2 pt-2">
                <Button
                    size="sm"
                    variant="outline"
                    className="text-white border-neutral-600"
                    onClick={() => acceptProjectInvitation()}
                >
                    Accept
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="text-white border-neutral-600"
                    onClick={() => console.log("DECLINE INVITE")}
                >
                    Decline
                </Button>
            </div>
        </div>
    );
}

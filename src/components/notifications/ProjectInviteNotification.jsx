import { Button } from "@/components/ui/button";
import { acceptProjectInvitationStart } from "@/store/project/projectSlice";
import { useDispatch } from "react-redux";

export default function ProjectInviteNotification({ notification }) {
    const dispatch = useDispatch();
    const metadata = notification.metadata
        ? notification.metadata
        : {};

    const acceptProjectInvitation = () => {
        dispatch(acceptProjectInvitationStart({
            projectId: metadata?.projectId, 
            notificationId: notification.id
        }))
    };

    return (
        <div className="p-3 rounded-md bg-neutral-800 border border-neutral-700 space-y-2">
            {/* Main message */}
            <p className="text-sm font-semibold">
                {notification.message}
            </p>

            {/* Project title */}
            <p className="text-xs text-neutral-400">
                Project: <span className="font-semibold">{metadata.projectTitle}</span>
            </p>

            {/* Accept / decline buttons */}
            <div className="flex justify-end gap-2 pt-2">
                <Button
                    size="xs"
                    variant="outline"
                    className="text-white border-neutral-600"
                    onClick={() => acceptProjectInvitation()}
                >
                    Accept
                </Button>
                <Button
                    size="xs"
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

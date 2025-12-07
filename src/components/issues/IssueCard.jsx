import { MoreVertical } from "lucide-react";
import AssignUserDialog from "./AssignUserDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IssueCard({ issue, participants, onAssign }) {
    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);

    const assigned = issue.assignedUsers || [];
    const visible = assigned.slice(0, 2);         // first 2 users
    const moreCount = assigned.length - visible.length;

    const openIssueDetails = () => {
        navigate(`/issueDetails/${issue?.id}`);
    }

    return (
        <>
            <div
                className="border border-neutral-700 rounded-md p-3 cursor-pointer bg-neutral-900"
                onClick={() => openIssueDetails()}
            >
                <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm">{issue.title}</h4>
                    <MoreVertical 
                        onClick={(e) => {
                            console.log("open d");setDialogOpen(true);
                            e.stopPropagation();
                        }}
                        className="w-4 h-4 text-neutral-400" />
                </div>

                {/* Avatars */}
                <div className="flex justify-end mt-3 gap-1">

                    {/* Show first 2 assigned users */}
                    {visible.map((u) => (
                        <div
                            key={u.id}
                            className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center text-xs"
                        >
                            {u.email.charAt(0).toUpperCase()}
                        </div>
                    ))}

                    {/* If more, show +N */}
                    {moreCount > 0 && (
                        <div className="w-7 h-7 rounded-full bg-neutral-700 border border-neutral-500 flex items-center justify-center text-[10px]">
                            +{moreCount}
                        </div>
                    )}
                </div>
            </div>

            {/* Assign user dialog */}
            <AssignUserDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                assignedUsers={issue.assignedUsers}  // <-- updated
                participants={participants}
                onAssign={(user) => onAssign(issue.id, user)}
            />
        </>
    );
}

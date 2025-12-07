import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedProjectStart } from "@/store/project/projectSlice";
import { selectSelectedProject } from "@/store/project/project.selector";
import { Loader2 } from "lucide-react";
import { sendProjectInvitationStart } from "@/store/project/projectSlice";
import { selectWebsocketIsConnected } from "@/store/websocket/websocket.selector";
import ProjectInvite from "./ProjectInvite";
import ChatBox from "@/components/chat-box/ChatBox";
import { fetchActiveChatStart } from "@/store/chat/chatSlice";
import IssueColumn from "@/components/issues/IssueColumn";
import CreateIssue from "./CreateIssue";
import { assignUserToIssueStart, getProjectIssuesStart } from "@/store/issue/issueSlice";
import { selectSelectedProjectIssues } from "@/store/issue/issue.selector";

export default function ProjectDetails() {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const selectedProject = useSelector(selectSelectedProject);
    const selectedProjectIssues = useSelector(selectSelectedProjectIssues);
    const wsIsConnected = useSelector(selectWebsocketIsConnected);
    const [projectInveteIsOpen, setProjectInviteIsOpen] = useState(false);

    useEffect(() => {
        dispatch(getSelectedProjectStart(projectId));
        dispatch(getProjectIssuesStart(projectId));
        dispatch(fetchActiveChatStart(projectId));
    }, [projectId]);

    const onInvite = (selectedUsers) => {
        const emailList = selectedUsers?.map((user) => user.email);
        dispatch(sendProjectInvitationStart({ projectId, receiverEmails: emailList }));
        setProjectInviteIsOpen(false);
    }

    const onAssign = (issueId, user) => {
        dispatch(assignUserToIssueStart({
            issueId,
            userId: user?.id,
        }))
    }

    if (!selectedProject) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
            </div>
        );
    }
    return (
        <>
            <div className="w-full h-full flex gap-6">
                {/* LEFT SIDE */}
                {/* LEFT SIDE */}
                <div className="flex-[3] flex flex-col justify-between">
                    {/* Project Details */}
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold">{selectedProject.title}</h1>
                        <p className="text-neutral-400 text-sm">{selectedProject.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {selectedProject.tags?.map((tag, index) => {
                                const formattedTag = tag.startsWith("#") ? tag : `#${tag}`;
                                return (
                                    <span
                                        key={index}
                                        className="text-sm text-neutral-300 bg-neutral-800 px-2 py-1 rounded-md border border-neutral-700"
                                    >
                                        {formattedTag}
                                    </span>
                                );
                            })}
                        </div>


                        <div className="space-y-5 mt-4">  {/* Increased spacing */}
                            <p><span className="font-semibold">Project Lead :</span> {selectedProject.owner.email}</p>

                            <div className="flex items-center gap-4">
                                <span className="font-semibold">Participants :</span>
                                {selectedProject.participants.map((m, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-600">
                                        {m.email?.charAt(0)}
                                    </div>
                                ))}
                                <Button onClick={() => setProjectInviteIsOpen(true)} size="sm" variant="outline" className="text-white border-neutral-600">
                                    invite +
                                </Button>
                            </div>

                            <p><span className="font-semibold">Category :</span> {selectedProject.category}</p>

                            <div className="flex items-center gap-4">
                                <span className="font-semibold">Status :</span>
                                <Badge className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold">In progress</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Section (Sticky aligned bottom) */}
                    <section className="mt-6">
                        <h2 className="text-xl font-bold mb-4">Tasks</h2>

                        {/* Full width horizontal line perfectly aligned with grid */}
                        <div className="w-full border-b border-neutral-700 mb-6"></div>

                        <div className="grid grid-cols-3 gap-4">
                            <IssueColumn
                                title={"TO DO"}
                                issues={selectedProjectIssues.pending}
                                participants={selectedProject?.participants}
                                onAssign={onAssign}
                                projectId={selectedProject?.id}
                                createActive={true}
                            />
                            <IssueColumn
                                title={"IN PROGRESS"}
                                issues={selectedProjectIssues.inProgress}
                                participants={selectedProject?.participants}
                                projectId={selectedProject?.id}
                                onAssign={onAssign}
                            />
                            <IssueColumn
                                title={"DONE"}
                                issues={selectedProjectIssues.done}
                                participants={selectedProject?.participants}
                                projectId={selectedProject?.id}
                                onAssign={onAssign}
                            />
                        </div>
                    </section>
                </div>


                {/* RIGHT SIDE CHAT BOX */}
                <ChatBox />
            </div>
            <ProjectInvite projectId={projectId} open={projectInveteIsOpen} setOpen={setProjectInviteIsOpen} onInvite={onInvite} />
        </>
    );
}

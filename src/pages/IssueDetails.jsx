import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { selectCurrentUserEmail, selectCurrentUserId } from "@/store/auth/auth.selector";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { selectIssueById, selectSelectedIssue } from "@/store/issue/issue.selector";
import { changeIssueStatusStart, clearSelectedIssue, deleteIssueStart, getSelectedIssueStart } from "@/store/issue/issueSlice";
import { selectSelectedIssueComments } from "@/store/comment/comment.selector";
import { createCommentStart, getIssueCommentsStart } from "@/store/comment/commentSlice";
import { getIssueComments } from "@/store/comment/comment.saga";
import CommentCard from "@/components/comment/CommentCard";

export default function IssueDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { issueId } = useParams();
    const issue = useSelector(selectSelectedIssue);
    const currentUserEmail = useSelector(selectCurrentUserEmail);
    const currentUserId = useSelector(selectCurrentUserId);
    const comments = useSelector(selectSelectedIssueComments);
    const [comment, setComment] = useState("");

    useEffect(() => {
        return () => {
            dispatch(clearSelectedIssue());
        };
    }, [])

    useEffect(() => {
        dispatch(getSelectedIssueStart(issueId))
        dispatch(getIssueCommentsStart(issueId));
    }, [issueId]);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        // avoid dispatching the same status
        if (newStatus !== issue.status) {
            dispatch(changeIssueStatusStart({
                issueId: issue?.id,
                status: newStatus
            }));
        }
    }

    const handleIssueDelete = () => {
        dispatch(deleteIssueStart({issueId, navigate}));
    }

    const handleSendComment = () => {
        dispatch(createCommentStart({
            content: comment,
            issueId
        }));
        setComment("");
    }

    const onCommentDelete = (commentId) => {
        console.log("Comment deleting ", commentId);

    }

    const onCommentEdit = (commentId) => {
        console.log("Comment edit ", commentId);

    }

    if (!issue) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-white" />
            </div>
        );
    }

    return (
        <div className="w-full h-full flex gap-6 text-white">

            {/* LEFT SECTION */}
            <div className="flex-[3] p-6 space-y-6">

                {/* Title */}
                <h1 className="text-2xl font-bold">{issue.title}</h1>

                {/* Description */}
                <div>
                    <p className="text-sm font-semibold text-neutral-300">Description</p>
                    <p className="mt-1 text-neutral-400">{issue.description}</p>
                </div>

                {/* Activity */}
                <div>
                    <p className="text-sm font-semibold text-neutral-300 mb-2">Activity</p>

                    <Tabs defaultValue="comments" className="w-full">
                        <TabsList className="bg-neutral-800">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="comments">Comments</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>

                        {/* Comments Tab */}
                        <TabsContent value="comments" className="mt-4">

                            {/* Add Comment Input */}
                            <div className="flex items-start gap-3 w-1/2">
                                <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center border border-neutral-600">
                                    {currentUserEmail?.charAt(0)?.toUpperCase()}
                                </div>

                                <div className="flex-1 flex flex-col gap-2">
                                    <input
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm outline-none"
                                    />
                                </div>

                                <Button
                                    className="ml-2"
                                    size="sm"
                                    disabled={!comment.trim()}
                                    onClick={handleSendComment}
                                >
                                    Save
                                </Button>
                            </div>


                            {/* Existing Comments */}
                            <div className="mt-4 space-y-4">
                                {comments?.length === 0 && (
                                    <p className="text-neutral-500 text-sm">No comments yet.</p>
                                )}
                                {
                                    comments?.length > 0 && comments.map((comment) => {
                                        return (
                                            <CommentCard comment={comment} currentUserEmail={currentUserEmail} onEdit={onCommentEdit} onDelete={onCommentDelete} />
                                        )
                                    })
                                }
                            </div>

                        </TabsContent>

                        {/* History Tab */}
                        <TabsContent value="history" className="mt-4 text-neutral-500 text-sm">
                            History not implemented yet.
                        </TabsContent>

                    </Tabs>
                </div>

            </div>

            {/* RIGHT SECTION */}
            <div className="flex-[2] p-6 border-l border-neutral-800">

                {/* Status Dropdown */}
                <select
                    className="w-40 bg-neutral-800 text-white border border-neutral-700 rounded px-2 py-1 mb-6"
                    value={issue.status}
                    onChange={handleStatusChange}
                >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>

                {/* Details Card */}
                <div className="border border-neutral-700 rounded-lg p-4 space-y-4">

                    <p className="text-sm font-semibold text-neutral-300">Details</p>

                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Creator</span>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center">
                                {issue.creator.email.charAt(0).toUpperCase()}
                            </div>
                            {issue.creator.email}
                        </div>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Labels</span>
                        <span className="text-neutral-300">None</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Status</span>
                        <span className="text-green-500 font-semibold">{issue?.status}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Release</span>
                        <span className="text-neutral-300">-</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Assigned Users</span>

                        {
                            issue?.assignedUsers?.length > 0 && issue.assignedUsers.map((user) => {
                                return (
                                    <div className="flex items-center gap-2">

                                        {user.email}
                                    </div>
                                )
                            })
                        }


                    </div>

                </div>
                <div className="float-right">
                {
                    issue.creator.id == currentUserId && <Button onClick={handleIssueDelete}>Delete</Button>
                }
                </div>
            </div>

        </div>
    );
}

import CreateIssue from "@/pages/CreateIssue";
import IssueCard from "./IssueCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Issue } from "@/store/issue/issue.types";
import { User } from "@/store/auth/auth.types";

interface IssueColumnProps {
    title: string;
    issues: Issue[];
    participants: User[];
    onAssign: (issueId: number, user: User) => void;
    projectId: number;
    createActive?: boolean;
}

export default function IssueColumn({ title, issues, participants, onAssign, projectId, createActive = false }: IssueColumnProps) {
        const [createIssueIsOpen, setCreateIssueIsOpen] = useState(false);

    return (
        <>
        <div className="border border-neutral-700 rounded-lg p-4 h-[250px] flex flex-col">
            <h3 className="font-semibold mb-2">{title}</h3>

            {/* Scrollable area for issue cards */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {issues?.map((issue) => (
                    <IssueCard
                        key={issue.id}
                        issue={issue}
                        participants={participants}
                        onAssign={onAssign}
                    />
                ))}
            </div>
            {
                createActive &&
                <Button onClick={() => setCreateIssueIsOpen(true)} variant="outline" className="mt-2 text-white border-neutral-600 w-fit">
                    + Create Issue
                </Button>
            }

        </div>
        <CreateIssue open={createIssueIsOpen} setOpen={setCreateIssueIsOpen} projectId={projectId}/>
        </>
    );
}

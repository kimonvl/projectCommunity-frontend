import CommonForm from "@/components/common-form/CommonForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { createIssueFormControlls } from "@/config/CreateIssueFormControlls";
import { createIssueStart } from "@/store/issue/issueSlice";
import { useAppDispatch } from "@/store/hooks";

interface CreateIssueProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    projectId: number;
}

const CreateIssue = ({ open, setOpen, projectId }: CreateIssueProps) => {
    const dispatch = useAppDispatch();

    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
    });

    const handleSubmit = () => {
        dispatch(createIssueStart({
            title: formInput.title,
            description: formInput.description,
            projectId,
        }));
        setFormInput({
            title: "",
            description: "",
        })
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-900 border border-neutral-700 text-white rounded-xl w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Create New Issue
                    </DialogTitle>
                </DialogHeader>

                <div className="text-neutral-400 w-full">

                    {/* Dynamic form controls */}
                    <CommonForm
                        formControls={createIssueFormControlls}
                        formInput={formInput}
                        setFormInput={setFormInput}
                        buttonName="Create Issue"
                        btnDisabled={true}
                    />

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!formInput.title.trim() || !formInput.description.trim()}
                        className="w-full mt-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                        Create Issue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateIssue;

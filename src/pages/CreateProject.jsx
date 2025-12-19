import CommonForm from '@/components/common-form/CommonForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { createProjectFormControls } from '@/config/CreateProjectFormControls'
import { selectCreateProjectLoading } from '@/store/project/project.selector'
import { createProjectStart } from '@/store/project/projectSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CreateProject = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const createProjectLoading = useSelector(selectCreateProjectLoading);
    const [cpFormInput, setCpFormInput] = useState({
        title: "",
        description: "",
        category: "",
        tagInput: "",
        tags: [],
    });

    useEffect(() => {
        if (!createProjectLoading && open) {
            setOpen(false);
            setCpFormInput({
                title: "",
                description: "",
                category: "",
                tagInput: "",
                tags: [],
            });
            console.log("createProjectLoading useEffect");
            
        }

    }, [createProjectLoading])

    const handleSubmit = () => {
        dispatch(createProjectStart({
            title: cpFormInput.title,
            description: cpFormInput.description,
            category: cpFormInput.category,
            tags: cpFormInput.tags,
        }));
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-900 border border-neutral-700 text-white rounded-xl w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Create New Project</DialogTitle>
                </DialogHeader>

                <div className="text-neutral-400 w-full">
                    <CommonForm formControls={createProjectFormControls} formInput={cpFormInput} setFormInput={setCpFormInput} buttonName={"Create Project"} btnDisabled={true} />
                    {cpFormInput.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {cpFormInput.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-neutral-800 border border-neutral-600 text-white px-1 py-1 rounded-full text-sm"
                                >
                                    <span>{tag}</span>
                                    <button
                                        type="button"
                                        className="text-white hover:text-red-400"
                                        onClick={() =>
                                            setCpFormInput({
                                                ...cpFormInput,
                                                tags: cpFormInput.tags.filter((t) => t !== tag),
                                            })
                                        }
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!cpFormInput.title.trim() && !cpFormInput.description.trim() && !cpFormInput.category.trim()}
                        className="w-full mt-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                        Create Project
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateProject

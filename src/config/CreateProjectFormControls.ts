import { FormControl } from "@/types/formConfig/formControl";
import { CreateProjectFormState } from "@/types/formConfig/project/createProjectFormState";

export const projectCategories = ["BACKEND", "FRONTEND", "GAMEDEV", "MOBILE", "AI", "DEVOPS"];

export const createProjectFormControls: FormControl<CreateProjectFormState>[] = [
    {
        name : "title",
        label : "Title",
        type : "text",
        componentType : "input",
    },
    {
        name : "description",
        label : "Description",
        type : "text",
        componentType : "input",
    },
    {
        name : "category",
        label : "Category",
        placeholder : "Select category",
        options : projectCategories,
        componentType : "select",
    },
    {
        name : "tagInput",
        label : "Tags",
        type : "text",
        componentType : "input",
        onKeyDown : (e, formInput, setFormInput) => {
            if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
                setFormInput({...formInput, tags : [...formInput.tags, e.currentTarget.value.trim()], tagInput : ""});
            }
            
        }
    },
]
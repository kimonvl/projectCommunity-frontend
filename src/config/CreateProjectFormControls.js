export const projectCategories = ["BACKEND", "FRONTEND", "GAMEDEV", "MOBILE", "AI", "DEVOPS"];

export const createProjectFormControls = [
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
            if (e.key === "Enter" && e.target.value.trim() !== "") {
                setFormInput({...formInput, tags : [...formInput.tags, e.target.value.trim()], tagInput : ""});
                console.log(formInput);
            }
            
        }
    },
]
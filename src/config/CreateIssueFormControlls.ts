import { FormControl } from "@/types/formConfig/formControl";
import { CreateIssueFormState } from "@/types/formConfig/issue/createIssueFormState";

export const createIssueFormControlls: FormControl<CreateIssueFormState>[] = [
    {
        name: "title",
        label: "Title",
        type: "text",
        componentType: "input",
    },
    {
        name: "description",
        label: "description",
        type: "text",
        componentType: "input",
    },
];
import { LoginFormState, RegisterFormState } from "@/types/formConfig/auth/authFormState";
import { FormControl } from "@/types/formConfig/formControl";

export const signUpFormControls: FormControl<RegisterFormState>[] = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        type : "email",
        componentType : "input",
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        type : "password",
        componentType : "input",
    }
];

export const loginFormControls: FormControl<LoginFormState>[] = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        type : "email",
        componentType : "input",
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        type : "password",
        componentType : "input",
    }
];
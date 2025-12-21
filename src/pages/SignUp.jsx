import CommonForm from '@/components/common-form/CommonForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { signUpFormControls } from '@/config/AuthFormControlls'
import { signUpStart } from '@/store/auth/authSlice'
import { useAppDispatch } from '@/store/hooks'
import { useState } from 'react'

const SignUp = () => {
    const dispatch = useAppDispatch();
    const [signUpInput, setSignUpInput] = useState({
        email : "",
        password : "",
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signUpStart(signUpInput));
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-sm shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <CommonForm formControls={signUpFormControls} formInput={signUpInput} setFormInput={setSignUpInput} handleSubmit={handleSubmit} buttonName={"Sign Up"}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp

import CommonForm from '@/components/common-form/CommonForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signUpFormControls } from '@/config/AuthFormControlls'
import { signUpStart } from '@/store/auth/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const SignUp = () => {
    const dispatch = useDispatch();
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

import CommonForm from '@/components/common-form/CommonForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { loginFormControls, signUpFormControls } from '@/config/AuthFormControlls'
import { loginStart } from '@/store/auth/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch();
    const [loginInput, setLoginInput] = useState({
        email : "",
        password : "",
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginStart(loginInput));
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-sm shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Log In</CardTitle>
                </CardHeader>
                <CardContent>
                    <CommonForm formControls={loginFormControls} formInput={loginInput} setFormInput={setLoginInput} handleSubmit={handleSubmit} buttonName={"Log In"}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login

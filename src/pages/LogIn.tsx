import CommonForm from '@/components/common-form/CommonForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { loginFormControls } from '@/config/AuthFormControlls'
import { loginStart } from '@/store/auth/authSlice'
import { useAppDispatch } from '@/store/hooks'
import { useState } from 'react'

const Login = () => {
    const dispatch = useAppDispatch();
    const [loginInput, setLoginInput] = useState({
        email : "",
        password : "",
    });

    const handleSubmit = (e: React.FormEvent) => {
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

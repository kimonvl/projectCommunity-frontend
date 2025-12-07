import React from 'react'
import FormFields from './FormFields'
import { Button } from '../ui/button'

const CommonForm = ({ formControls, formInput, setFormInput, handleSubmit, buttonName, btnDisabled = false }) => {
    return (
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <FormFields formControls={formControls} formInput={formInput} setFormInput={setFormInput} />
            {
                !btnDisabled &&
                <Button className="w-full mt-2 rounded-2xl" type="submit" >
                    {buttonName}
                </Button>
            }
        </form>
    )
}

export default CommonForm

import { Label } from '@radix-ui/react-label'
import React from 'react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const FormFields = ({ formControls, formInput, setFormInput }) => {
    
    const renderComponentByType = (controlItem) => {
        const itemValue = formInput[controlItem.name];

        const defaultOnchange = (e, controlItem) => setFormInput({ ...formInput, [controlItem.name]: e.target.value })

        switch (controlItem.componentType) {
            case "input":
                return (
                    <Input
                        className="w-full"
                        id={controlItem.name}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        value={itemValue}
                        onChange={(e) => controlItem.onChange ?
                            controlItem.onChange(e, formInput, setFormInput) :
                            defaultOnchange(e, controlItem)
                        }
                        {...(controlItem.onKeyDown && {
                            onKeyDown: (e) => controlItem.onKeyDown(e, formInput, setFormInput)
                        })}
                    />
                );
                break;
            case "select":
                return (
                    <Select
                        value={itemValue}
                        onValueChange={(val) =>
                            setFormInput({ ...formInput, [controlItem.name]: val })
                        }
                    >
                        <SelectTrigger className="w-full bg-neutral-800 border border-neutral-600 text-white">
                            <SelectValue placeholder={controlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 text-white border border-neutral-600">
                            {controlItem.options?.map((opt) => (
                                <SelectItem key={opt} value={opt} className="text-white cursor-pointer">
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            default:
                return (
                    <Input
                        id={controlItem.name}
                        type={controlItem.name}
                        placeholder={controlItem.placeholder}
                        value={itemValue}
                        onChange={(e) => setFormInput({ ...formInput, [controlItem.name]: e.target.value })}
                    />
                )
                break;
        }


    }

    return (
        <div>
            {
                formControls.map((controlItem) => {
                    return (
                        <div className="grid gap-2" key={controlItem.name}>
                            <Label className='float-start mt-1' htmlFor={controlItem.name}>{controlItem.label}</Label>
                            {renderComponentByType(controlItem)}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FormFields

'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface FormCheckboxProps {
    label: string | React.ReactNode
    error?: string
    id?: string
    className?: string
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    [key: string]: any
}

const FormCheckbox1 = ({
    label,
    error,
    id,
    className = '',
    checked,
    onCheckedChange,
    ...props
}: FormCheckboxProps) => {
    const inputId = id || 'checkbox'

    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-start gap-3">
                <Checkbox
                    id={inputId}
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                    className={`${error ? 'border-red-400 focus-visible:ring-red-400' : ''} size-5`}
                    {...props}
                />
                <Label
                    htmlFor={inputId}
                    className="text-sm text-neutral-8 cursor-pointer leading-relaxed"
                >
                    {label}
                </Label>
            </div>
            {error && (
                <p className="text-xs text-red-500 mt-1.5 ml-8">
                    {error}
                </p>
            )}
        </div>
    )
}

export default FormCheckbox1;
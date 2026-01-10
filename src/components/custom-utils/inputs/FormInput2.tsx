'use client'

import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    required?: boolean
}

const FormInput2 = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, required, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                <label className="block text-sm font-medium text-neutral-9 mb-2">
                    {label} {required && <span className="">*</span>}
                </label>
                <input
                    ref={ref}
                    className={`
                        w-full px-4 py-3 text-sm rounded-[6px] h-14 transition-all
                        ${error 
                            ? 'border border-red-400 focus:border-red-500' 
                            : 'border-[1.5px] border-neutral-5 focus:border-[1.5px] focus:border-primary hover:border-neutral-6'
                        }
                        outline-none bg-white text-neutral-9 placeholder:text-neutral-6
                        ${className}
                    `}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-500 mt-1.5 ml-1">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)


export default FormInput2;
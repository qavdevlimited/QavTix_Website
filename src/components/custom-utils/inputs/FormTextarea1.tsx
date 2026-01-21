'use client'

import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
    error?: string
    required?: boolean
}

const FormTextarea1 = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ label, error, required, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                <label className="block text-sm font-medium text-neutral-9 mb-2">
                    {label} {required && <span className="text-neutral-9">*</span>}
                </label>
                <textarea
                    ref={ref}
                    rows={5}
                    className={`
                        w-full px-4 py-3 text-sm rounded-lg transition-all resize-none
                        ${error 
                            ? 'border border-red-400 focus:border-red-500' 
                            : 'border-[1.5px] border-neutral-4 focus:border-[1.5px] focus:border-primary hover:border-neutral-5'
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


export default FormTextarea1;
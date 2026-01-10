'use client'

import { useSignup } from "@/contexts/HostSignupProvider"


export function StepIndicator() {
    const { currentStep } = useSignup()

    const steps = [
        { number: 1, label: 'General Information' },
        { number: 2, label: 'Business Information' },
        { number: 3, label: 'Password Setup' }
    ]

    return (
        <div className="flex justify-between w-full gap-2 my-10">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div className="flex items-center gap-2">
                        <div className={`
                            flex items-center justify-center w-10 aspect-square lg:w-8 rounded-[6.6px] font-semibold text-xl lg:text-sm
                            ${currentStep >= step.number 
                                ? 'bg-primary-6 text-white' 
                                : 'text-neutral-7 border-[1.6px] border-neutral-7'
                            }
                        `}>
                            {step.number}
                        </div>
                        <span className={`
                            text-xs font-medium hidden sm:block
                            ${currentStep >= step.number ? 'text-neutral-9' : 'text-neutral-6'}
                        `}>
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`
                            w-14 md:w-12 h-0.5 mx-2 border-t-[1.4px] border-dashed
                            ${currentStep > step.number ? 'border-primary' : 'border-[#0A0909]/80'}
                        `} />
                    )}
                </div>
            ))}
        </div>
    )
}
'use client'

import { useCheckout } from "@/contexts/CheckoutFlowProvider"


export function CheckoutFormStepIndicator() {
    
    const { currentStep } = useCheckout()

    const steps = [
        { number: 1, label: 'Ticket' },
        { number: 2, label: 'Ticket Information' },
        { number: 3, label: 'Payment Method' }
    ]

    return (
        <div className="flex justify-between w-full gap-2">
            {steps.map((step, index) => (
                <div key={step.number} className="flex group not-last:flex-1 items-center last:justify-end">
                    <div className="flex items-center gap-2 me-2">
                        <div className={`
                            flex items-center justify-center w-10 aspect-square lg:w-8 rounded-[6.6px] font-semibold text-xl lg:text-sm
                            ${currentStep >= step.number 
                                ? 'bg-primary text-white' 
                                : 'text-neutral-7 border-[1.6px] border-neutral-7'
                            }
                        `}>
                            {step.number}
                        </div>
                        <span className={`
                            text-xs font-medium w-fit hidden sm:block md:whitespace-nowrap me-2
                            ${currentStep >= step.number ? 'text-neutral-9' : 'text-neutral-6'}
                        `}>
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`
                            mx-auto w-full h-0.5 border-t-[1.4px] border-dotted
                            ${currentStep > step.number ? 'border-primary' : 'border-neutral-7/80'}
                        `} />
                    )}
                </div>
            ))}
        </div>
    )
}
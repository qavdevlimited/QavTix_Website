'use client'

import { useCheckout } from "@/contexts/CheckoutFlowProvider"
import { CheckoutFormStepIndicator } from "../custom-utils/CheckoutFormStepIndicator"
import TicketPreviewStep from "../forms/checkout-flow-steps/TicketPreviewStep"
import CheckoutSummary from "../forms/checkout-flow-steps/CheckoutSummary"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import TicketCheckoutAttendeeInformationStep from "../forms/checkout-flow-steps/TicketCheckoutAttendeeInformationStep"
import LeaveCheckoutPrompt from "../modals/LeaveCheckoutPrompt"
import CheckoutPageContentWrapper from "../forms/checkout-flow-steps/CheckoutPageContentWrapper"

interface ICheckoutPageContent {
    showCloseLeaveCheckoutPrompt: boolean
    setShowCloseLeaveCheckoutPrompt: Dispatch<SetStateAction<boolean>>
}

export default function CheckoutPageContent({ 
    showCloseLeaveCheckoutPrompt, 
    setShowCloseLeaveCheckoutPrompt 
}: ICheckoutPageContent) {

    const { currentStep, canProceedToCheckout } = useCheckout()
    const [showMobileSummary, setShowMobileSummary] = useState(false)

    useEffect(() => {
        if (!canProceedToCheckout()) return
        
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            e.returnValue = ''
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [canProceedToCheckout])

    useEffect(() => {
        if (!canProceedToCheckout()) return

        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href)
            setShowCloseLeaveCheckoutPrompt(true)
        }

        window.history.pushState(null, '', window.location.href)
        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [canProceedToCheckout, setShowCloseLeaveCheckoutPrompt])

    return (
        <section className="md:flex w-full min-h-screen gap-6 lg:gap-16 items-stretch pb-56 md:pb-24">
            <div className="md:w-[50%] lg:flex-1 lg:w-auto flex flex-col">
                {!showMobileSummary && (
                    <div className="my-10 md:-mt-10">
                        <CheckoutFormStepIndicator />
                    </div>
                )}
                <CheckoutPageContentWrapper showMobileSummary={showMobileSummary}>
                    {currentStep === 1 ? (
                        <TicketPreviewStep />
                    ) : currentStep === 2 ? (
                        <TicketCheckoutAttendeeInformationStep />
                    ) : null}
                </CheckoutPageContentWrapper>
            </div>
            
            <div className="md:w-[40%] flex">
                <CheckoutSummary 
                    showMobileSummary={showMobileSummary} 
                    setShowMobileSummary={setShowMobileSummary} 
                />
            </div>

            <LeaveCheckoutPrompt 
                open={showCloseLeaveCheckoutPrompt} 
                setOpen={setShowCloseLeaveCheckoutPrompt} 
            />
        </section>
    )
}
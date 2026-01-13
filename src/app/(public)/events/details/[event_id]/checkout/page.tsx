"use client"

import CheckoutPageContent from "@/components/checkout/CheckoutPageContent";
import CloseBtn from "@/components/custom-utils/buttons/event-search/CloseBtn";
import EventDetailsPreview from "@/components/forms/checkout-flow-steps/EventDetailsPreview";
import LeaveCheckoutPrompt from "@/components/modals/LeaveCheckoutPrompt";
import { CheckoutAttendeeInfoFormProvider } from "@/contexts/CheckoutAttendeeInfoFormContext";
import { CheckoutFlowProvider } from "@/contexts/CheckoutFlowProvider";
import { space_grotesk } from "@/lib/redux/fonts";
import { useState } from "react";

export default function EventTicketCheckoutPage(){

    const [showcloseLeaveCheckoutPrompt, setShowCloseLeaveCheckoutPrompt] = useState(false)

    return (
        <CheckoutFlowProvider>
            <CheckoutAttendeeInfoFormProvider>
                <main className="py-7 md:pt-10 md:pb-16 global-px max-w-7xl mx-auto">
                    <div className="md:flex justify-between items-start">
                        <div className="flex flex-1 items-center gap-6 justify-between md:max-w-[calc(100%-40%-4rem)]">
                            <h1 className={`${space_grotesk.className} font-medium text-2xl text-secondary-9`}>Ticketing checkout</h1>
                            <CloseBtn action={() => setShowCloseLeaveCheckoutPrompt(true)} />
                        </div>

                        <div className="mt-10 md:mt-0 md:w-[40%]">
                            <EventDetailsPreview />
                        </div>
                    </div>

                    <CheckoutPageContent />
                    <LeaveCheckoutPrompt open={showcloseLeaveCheckoutPrompt} setOpen={setShowCloseLeaveCheckoutPrompt} />
                </main>
            </CheckoutAttendeeInfoFormProvider>
        </CheckoutFlowProvider>
    )
}
import { useCheckout } from "@/contexts/CheckoutFlowProvider";
import { CheckoutFormStepIndicator } from "../custom-utils/CheckoutFormStepIndicator";
import TicketPreviewStep from "../forms/checkout-flow-steps/TicketPreviewStep";
import CheckoutSummary from "../forms/checkout-flow-steps/CheckoutSummary";
import { useState } from "react";
import TicketCheckoutAttendeeInformationStep from "../forms/checkout-flow-steps/TicketCheckoutAttendeeInformationStep";

export default function CheckoutPageContent(){

    const { currentStep } = useCheckout()
    const [showMobileSummary, setShowMobileSummary] = useState(false)

    return (
        <section className="md:flex w-full min-h-screen gap-16 items-stretch pb-52">
            <div className="md:flex-1 flex flex-col">
                {
                    !showMobileSummary &&
                    <div className="my-10 md:-mt-10">
                        <CheckoutFormStepIndicator />
                    </div>
                }
                {
                    currentStep === 1 ?
                    <TicketPreviewStep showMobileSummary={showMobileSummary} />
                    :
                    currentStep === 2 ?
                    <TicketCheckoutAttendeeInformationStep />
                    :
                    null
                }
            </div>
            <div className="md:w-[40%] flex">
                <CheckoutSummary showMobileSummary={showMobileSummary} setShowMobileSummary={setShowMobileSummary} />
            </div>
        </section>
    )
}